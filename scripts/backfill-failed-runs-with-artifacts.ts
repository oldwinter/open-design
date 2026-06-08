#!/usr/bin/env node
// 一次性 backfill：修复已经在磁盘上产出 artifact、却因为 agent
// process 在 deliverable 落盘后的 teardown 阶段以非零状态退出而被误记为
// `failed` (run_status='failed') 的 project run。参见
// apps/daemon/src/server.ts 中的 classifyChatRunCloseStatus；后续 daemon 会把
// 这类 run 归类为 `succeeded`，本脚本用于修复该修复之前写入的 rows。
//
// 只有当 failed message 自身记录了 produced file
// (messages.produced_files_json)，且对应的 `*.artifact.json` sidecar 仍存在于
// <dataDir>/projects/<id>/ 下时，才会修复该 row。这样修复会关联到产出
// artifact 的具体 message/run，而不是 project 级别是否存在 artifact。Project
// directory 生命周期很长，会累积许多无关 conversation/run 的 sidecar；如果只凭某个
// 无关 artifact 就翻转 project 中所有 failed row，会把真实失败重新归类
// （不可逆的数据完整性 bug）。这与 daemon 的 `artifactProducedThisRun` 例外一致：
// artifact 必须属于 THIS run。
//
// Usage:
//   node --experimental-strip-types scripts/backfill-failed-runs-with-artifacts.ts --dry-run
//   node --experimental-strip-types scripts/backfill-failed-runs-with-artifacts.ts --data-dir /path/to/.od --dry-run
//   node --experimental-strip-types scripts/backfill-failed-runs-with-artifacts.ts --data-dir /path/to/.od
//
// 先停止 daemon，确保 WAL 已 flush，避免与写入竞争。--dry-run 只打印将要翻转的
// rows，不写入。重复运行是幂等的（只触碰仍为 'failed' 的 rows）。

import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '..');

interface BackfillDatabase {
  prepare: (sql: string) => {
    all: (...args: unknown[]) => unknown[];
    run: (...args: unknown[]) => { changes: number };
  };
  transaction: <T>(fn: (arg: T) => number) => (arg: T) => number;
  close: () => void;
}

// better-sqlite3 是 daemon workspace 拥有的 native module；从那里解析
// （与 scripts/seed-test-projects.ts 保持一致），不要从 root 解析。
function loadBetterSqlite(): new (filename: string) => BackfillDatabase {
  const daemonRequire = createRequire(path.join(REPO_ROOT, 'apps', 'daemon', 'package.json'));
  return daemonRequire('better-sqlite3') as new (filename: string) => BackfillDatabase;
}

function parseArgs(argv: string[]): { dataDir: string; dryRun: boolean } {
  let dataDir = process.env.OD_DATA_DIR?.trim() || './.od';
  let dryRun = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === undefined) continue;
    if (arg === '--dry-run') dryRun = true;
    else if (arg === '--data-dir') {
      const next = argv[i + 1];
      if (!next) throw new Error('--data-dir requires a path');
      dataDir = next;
      i++;
    } else if (arg.startsWith('--data-dir=')) {
      dataDir = arg.slice('--data-dir='.length);
    }
  }
  return { dataDir: path.resolve(dataDir), dryRun };
}

// messages.produced_files_json 中持久化的 ProjectFile entry。定位 sidecar
// 只需要 name/path；其他字段忽略。
interface ProducedFileRef {
  name?: unknown;
  path?: unknown;
}

function parseProducedFiles(raw: unknown): ProducedFileRef[] {
  if (typeof raw !== 'string' || !raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ProducedFileRef[]) : [];
  } catch {
    return []; // malformed JSON — 视为“没有 produced files”，不是 fatal
  }
}

// 当 THIS message 记录的 produced file 仍在磁盘上有对应 `<name>.artifact.json`
// sidecar 时返回 true。每个文件都相对 project dir 解析，因此同一 project 中
// 无关 run 的 sidecar 不会计入。
function messageProducedArtifact(
  projectsRoot: string,
  projectId: string,
  producedFilesJson: unknown,
): boolean {
  const files = parseProducedFiles(producedFilesJson);
  if (files.length === 0) return false;
  const dir = path.join(projectsRoot, projectId);
  for (const file of files) {
    const rel = typeof file.path === 'string' && file.path
      ? file.path
      : typeof file.name === 'string'
        ? file.name
        : undefined;
    if (!rel) continue;
    // 拒绝 path traversal / absolute path；sidecar 必须位于 project dir 内，
    // 与 produced file 相邻。
    const resolved = path.resolve(dir, `${rel}.artifact.json`);
    const dirWithSep = dir.endsWith(path.sep) ? dir : dir + path.sep;
    if (resolved !== dir && !resolved.startsWith(dirWithSep)) continue;
    try {
      if (fs.statSync(resolved).isFile()) return true;
    } catch {
      // sidecar 不存在；继续检查该 message 的其他 produced files
    }
  }
  return false;
}

function main() {
  const { dataDir, dryRun } = parseArgs(process.argv.slice(2));
  const dbPath = path.join(dataDir, 'app.sqlite');
  const projectsRoot = path.join(dataDir, 'projects');

  if (!fs.existsSync(dbPath)) {
    throw new Error(`在 ${dbPath} 未找到 sqlite db（--data-dir 是否正确？）`);
  }

  const Database = loadBetterSqlite();
  const db = new Database(dbPath);
  try {
    const rows = db
      .prepare(
        `SELECT m.id AS messageId,
                c.project_id AS projectId,
                m.produced_files_json AS producedFilesJson
           FROM messages m
           JOIN conversations c ON c.id = m.conversation_id
          WHERE m.run_status = 'failed'`,
      )
      .all() as Array<{ messageId: string; projectId: string; producedFilesJson: unknown }>;

    const toFlip = rows.filter((row) =>
      messageProducedArtifact(projectsRoot, row.projectId, row.producedFilesJson),
    );

    console.log(
      `找到 ${rows.length} 个 failed run row；其中 ${toFlip.length} 个记录了 produced file，且磁盘上存在 artifact sidecar。`,
    );
    const byProject = new Map<string, number>();
    for (const row of toFlip) {
      byProject.set(row.projectId, (byProject.get(row.projectId) ?? 0) + 1);
    }
    for (const [projectId, count] of byProject) {
      console.log(`  ${projectId}  (${count} 个 row)`);
    }

    if (toFlip.length === 0) {
      console.log('没有需要修复的内容。');
      return;
    }

    if (dryRun) {
      console.log('\n--dry-run：未写入任何变更。去掉 --dry-run 后重新运行即可应用。');
      return;
    }

    const update = db.prepare(
      `UPDATE messages SET run_status = 'succeeded' WHERE id = ? AND run_status = 'failed'`,
    );
    const flip = db.transaction((items: Array<{ messageId: string }>) => {
      let changed = 0;
      for (const item of items) {
        changed += update.run(item.messageId).changes;
      }
      return changed;
    });
    const changed = flip(toFlip);
    console.log(`\n已修复 ${changed} 个 row：run_status failed -> succeeded。`);
  } finally {
    db.close();
  }
}

main();
