# `mocks/` — 面向 OD supported agents 的 replay-based mock CLIs

这里提供真实 agent CLIs 的 drop-in replacement：`claude`、`opencode`、`codex`、`gemini`、`cursor-agent`、`deepseek`、`qwen`、`grok`、ACP family `devin` / `hermes` / `kilo` / `kimi` / `kiro` / `vibe`，以及 AMR `vela` CLI。它会用每个 CLI 的 native protocol 回放预录 sessions：多数使用 stdout streaming，ACP 和 AMR 使用 JSON-RPC over stdio。**零 LLM tokens。**

用途：

- `apps/daemon/tests/` 中的 **E2E tests**：针对已知 agent trace 运行完整 chat-server pipeline，并断言 UI events / artifacts。
- 开发期间的 **local self-tests**：在不消耗 provider budget 的情况下，迭代 `chat-routes.ts`、`claude-stream.ts`、`json-event-stream.ts` parser changes。
- **Demo / onboarding**：离线展示一个带 17 个 tool 的 `claude` editing session 从头到尾是什么样。
- **Regression harness**：在 charter / parser change 前后回放同一 trace；diff daemon 暴露的 events。

Recordings 是 open-design Langfuse project 的 anonymized exports（截至此 commit，共 9 个 agents、5+ 个 skills、179 条 traces）。

---

## tl;dr

```bash
# 首次设置：从 R2 拉取 recording corpus（约 30s，4.5MB）：
bash mocks/scripts/fetch-recordings.sh
# 后续运行命中本地 cache（sha256 verified，几乎即时）。

# 让 mock CLIs 在当前 shell 中覆盖真实 CLIs：
export PATH="$PWD/mocks/bin:$PATH"

# 选择任意 recording 回放（8-char prefix 也可以）：
export OD_MOCKS_TRACE=04097377

# 加速 replay（跳过 inter-event sleeps）：
export OD_MOCKS_NO_DELAY=1

# 现在任何 spawn opencode/claude/codex 的动作都会得到 recording：
echo "any prompt body" | opencode run
echo "any prompt"     | claude -p --output-format=stream-json
echo "any prompt"     | codex exec
```

Mock binaries 是 bash wrappers，会 exec `node mocks/mock-agent.mjs --as <agent>`。传入 stdin 的内容会被 renderer 丢弃，但会被 recording picker 使用（见下方 hash mode）。

## Recordings 位于 R2，不在本 repo

179 条 recording corpus（约 4.5 MB）托管在 Cloudflare R2 的 `open-design-mocks` 中，并且**按需**拉取；`pnpm install` 不会拉取它们，因此 repo 保持小巧。Recordings 只会在以下情况落到 `mocks/recordings/`：

1. 你直接运行 `bash mocks/scripts/fetch-recordings.sh`；或
2. `bash mocks/scripts/smoke-test.sh` 运行且该目录为空（auto-fetch fallback）；或
3. 某个 mock binary spawn 时发现没有数据，它会报错并指向 fetch script（不会静默失败）。

这是有意设计：不触碰 agent code 的 contributors 不需要承担 fetch cost。确实触碰 agent code 的 CI jobs（`apps/daemon/tests/` parser changes 等）会把 fetch 作为快速 pre-step，并在 runs 之间缓存 `mocks/recordings/`。

```bash
# 拉取全部内容（parallel、sha256-verified、idempotent）：
bash mocks/scripts/fetch-recordings.sh

# 拉取子集：
bash mocks/scripts/fetch-recordings.sh --agent claude       # 57 claude traces
bash mocks/scripts/fetch-recordings.sh --outcome failed     # 35 failed-path traces
bash mocks/scripts/fetch-recordings.sh --skill agent-browser

# 覆盖 cache location（例如在多个 OD checkouts 间共享）：
OD_MOCKS_CACHE_DIR=~/.cache/od-mocks bash mocks/scripts/fetch-recordings.sh
```

`mocks/manifest.json` 是已提交的 source of truth。它列出每条 recording 的 `trace_id`、`sha256`、`bytes`、`agent`、`outcome`、`skills`、`multi_turn`，以及 corpus 的 histograms。Tooling 会读取它；你通常不需要手动处理。

### 每条 recording 的 provenance

除了 identity（`trace_id`、`sha256`）之外，每个 manifest entry 都携带 fixture-trust signals，方便 consumers 判断随着真实 CLIs 演进，该 recording 是否仍然有意义：

| Field | Meaning |
|---|---|
| `captured_at` | 原始 session 的 ISO 8601 timestamp；当前 179 个 entries 都已填充 |
| `cli_version` | 捕获 trace 时对应的 CLI version（例如 `"claude-code 1.0.65"`）；仅 harvester 写入的 traces 有值，否则为 null |
| `protocol_version` | Stream-format version（`"claude-stream-json/v1"`、`"opencode/json-event-stream"`）；由 harvester 填充 |
| `anonymization_version` | 哪个 anonymizer pass 清洗了 recording；由 harvester 填充 |

目前既有 179 条中，大多数这些字段仍为 null；下一步需要教 [nexu-io/agent-pr-explore][harvester] 中的 harvester 写入它们。一旦某条 recording 的 `cli_version` 落后实际 CLI 超过一个 minor version，就把它视为 re-harvest candidate。

### Golden daemon-event snapshots

`mocks/golden/<trace>.events.json` 保存 OD daemon 在输入每个（mock CLI → handler）pipeline 时发出的精确 event sequence。每次运行 `pnpm --filter @open-design/daemon test` 时，`apps/daemon/tests/mocks-golden.test.ts` 都会 diff 它。

任何语义改变 events 的 parser refactor（删除字段、重命名 `sessionId`、停止发出 `turn_end`）都会让 diff 明确失败。有意的 parser change 之后，请 regenerate：

```bash
MOCKS_GOLDEN_UPDATE=1 pnpm --filter @open-design/daemon test mocks-golden
git diff mocks/golden/    # 人工检查 new shapes
git add mocks/golden/ && git commit -m "mocks: refresh goldens for <parser change>"
```

Per-spawn volatile fields（目前只有 claude 生成的 `sessionId`）会被剥离为 `"<normalized>"`，以保持 snapshot 稳定。Coverage rationale 见 `mocks/golden/README.md`。

### Real-CLI contract check

Mocks 可以捕获相对于 recordings 的 parser regressions；但它们**不能**捕获 recordings 本身与 live agent CLIs 漂移的问题。为此，`mocks/scripts/contract-check.sh` 会用固定 prompt 同时 spawn 真实 CLI 和 mock，并打印并排 event-type distribution。

这是 human-driven 的，并且会消耗真实 LLM tokens；请在 real-CLI release 或 parser refactor 前运行，不要放在 cron 上。完整文档：
[`docs/MOCKS-CONTRACT-CHECK.md`](../docs/MOCKS-CONTRACT-CHECK.md).

---

## 会发出什么

每个 renderer 都匹配 OD daemon 预期的**精确** event shapes，并已与 `apps/daemon/src/` 中的 parsers 逐行核对：

| CLI | OD streamFormat | Parser source |
|---|---|---|
| `opencode`        | `json-event-stream` (opencode kind)     | `json-event-stream.ts:handleOpenCodeEvent`   |
| `codex`           | `json-event-stream` (codex kind)        | `json-event-stream.ts:handleCodexEvent`      |
| `claude`          | `claude-stream-json`                    | `claude-stream.ts:createClaudeStreamHandler` |
| `gemini`          | `json-event-stream` (gemini kind)       | `json-event-stream.ts:handleGeminiEvent`     |
| `cursor-agent`    | `json-event-stream` (cursor-agent kind) | `json-event-stream.ts:handleCursorEvent`     |
| `deepseek` `qwen` `grok` | `plain`                          | `server.ts` (raw stdout = final assistant text) |
| `kimi`            | `json-event-stream` (kimi kind)         | `json-event-stream.ts:handleKimiEvent`         |
| `devin` `hermes` `kilo` `kiro` `vibe` | `acp-json-rpc` | `acp.ts:attachAcpSession`                       |
| `vela` (AMR) | `acp-json-rpc` + `login` / `models` subcommands | `runtimes/defs/amr.ts` + `apps/daemon/tests/fixtures/fake-vela.mjs` (sibling stub) |

> **关于 `cursor-agent` 的说明**：OD 的 parser 不识别 tool-call events，只识别 init / assistant text / usage。因此 renderer 只会发出包在预期 init/text/usage envelope 中的最终 assistant text。Source recording 中存在的 tool calls 会被静默丢弃。`gemini` 可以识别当前 Gemini CLI `stream-json` 的 tool_use / tool_result frames，并通过该 envelope 回放 recorded tool calls。

> **关于 ACP agents 的说明**（`devin` / `hermes` / `kilo` / `kiro` / `vibe`）：它们不 stream stdout，而是通过 stdio 说 JSON-RPC v2。OD daemon 发送 `initialize` → `session/new` →（可选 `session/set_model`）→ `session/prompt`；mock 会按顺序响应，通过携带 `agent_message_chunk` parts 的 `session/update` notifications stream text，然后用 usage stats 响应 prompt request。Tool calls 不是这条路径上的 ACP protocol 一部分（tools 通过 MCP 或其他 side channels 暴露），因此会从 playback 中丢弃。

> **关于 `kimi` 的说明**：现代 Kimi CLI 在 Open Design 中不是 ACP stdio adapter。Runtime 会以 prompt mode 启动它（`kimi -p ... --output-format stream-json`），因此 mock 会 replay Kimi-flavored JSON-event-stream frames，而不是 JSON-RPC。

> **关于 `vela` (AMR) 的说明**：vela 是 OD 的 AMR runtime spawn 的 bin。它用 `initialize` / `session/new` 中的 `agentCapabilities` + `models` blocks 扩展 generic ACP shape，并增加一个 **strict set_model gate**：在当前 sessionId 调用 `session/set_model`（或 `session/set_config_option`）前，`session/prompt` 会以 -32602 被拒绝，以镜像真实 vela 0.0.1 contract。
>
> vela 还有两个 non-ACP subcommands：
>
> - `vela login` → 写入带 fake profile 的 `~/.amr/config.json`，使 OD 的 daemon login route + `AmrLoginPill` poller 看到与 production 相同的 on-disk projection。
> - `vela models` → 打印 production-shaped `public_model_*    vela` catalog。
>
> Error injection envs（与 `apps/daemon/tests/fixtures/fake-vela.mjs` 保持同步）：
> `FAKE_VELA_SESSION_NEW_ERROR` / `FAKE_VELA_SET_MODEL_ERROR` /
> `FAKE_VELA_PROMPT_ERROR` / `FAKE_VELA_LOGIN_FAIL` /
> `FAKE_VELA_REQUIRE_SET_MODEL=0`.

Recording 中的每个 tool call 都会使用原始 input arguments 和 tool output 渲染。Agents 的 assistant text 会作为 final message 渲染。

---

## Recording selection

由 env vars 驱动，按优先级排序：

| Env | Behavior |
|---|---|
| `OD_MOCKS_TRACE=<id>` | 始终播放这条 trace。8-char prefix 可以使用。 |
| `OD_MOCKS_BY_PROMPT_HASH=1` + stdin prompt | 通过 `sha256(prompt) % len(all)` 确定性选择。同一 prompt → 同一 trace。适合 "stable answer per question" tests。 |
| `OD_MOCKS_POOL=<tag>` | 在 tag pool 中随机选择。示例：`agent:claude`、`skill:agent-browser`、`outcome:failed`。 |
| `OD_MOCKS_SEED=<str>` | 让 "random" picks 在多次运行间可复现。 |
| `OD_MOCKS_NO_DELAY=1` | 跳过 inter-event waits。 |
| `OD_MOCKS_RECORDINGS_DIR=<path>` | 覆盖 recordings dir。 |

如果都没有设置，每次 invocation 都会播放一条均匀随机的 recording。

Mock binary 会在 stderr 上告知选中的 trace id：

```
[mock-opencode] picked 04097377… via fixed
```

这一行对 OD 的 stdout parser 不可见，但对 “等等，为什么我的 test 拿到了 FAQ-fix trace？” 这类 debugging 很有用。

---

## Recording catalog

Recordings 位于 `recordings/` 下，每条 Langfuse trace 对应一个 JSONL 文件。每个文件都以携带以下内容的 `meta` event 开头：

```json
{
  "type": "meta",
  "source": {"provider": "langfuse", "trace_id": "...", "project_id": "..."},
  "agent": "claude" | "codex" | "opencode" | "gemini" | "cursor-agent" | "qwen" | "copilot" | "deepseek" | "antigravity",
  "model": "...",
  "outcome": "succeeded" | "failed" | "errored" | "interrupted",
  "duration_ms": 33620,
  "tool_call_count": 17,
  "error_count": 0,
  "total_tokens": 12345,
  "tags": ["agent:claude", "skill:agent-browser", "open-design", ...],
  "user_input": "...",
  "session_id": "..."
}
```

后续 events 是 `tool_call`、`tool_result` 和 `report`（final assistant text）。

### Indexed metadata

`mocks/manifest.json` 是 flat manifest，每条 recording 一个 entry，并包含所有 recordings 的 histograms，已提交到 repo。它也会和 .jsonl files 一起 mirror 到 R2，因此 consumers 可以不用 clone 就 fetch 当前 catalog。使用 `jq` 查询：

```bash
# All multi-turn claude sessions about HTML editing
jq '.entries[] | select(.agent=="claude" and .multi_turn==true)' \
  mocks/manifest.json | head -50

# Failed codex traces (negative-path tests)
jq '.entries[] | select(.agent=="codex" and .outcome=="failed") | .trace_id' \
  mocks/manifest.json

# Agent-browser skill, sorted by tool count desc
jq '[.entries[] | select(.skills | index("agent-browser"))] | sort_by(-.tool_count)' \
  mocks/manifest.json
```

### Headline stats (current dataset)

| Dimension | Distribution |
|---|---|
| Agents | claude 57 · opencode 41 · codex 38 · gemini 25 · cursor-agent 11 · qwen/copilot/deepseek 2 each · antigravity 1 |
| Outcomes | succeeded 144 · failed 35 |
| Skills | default 71 · ad-creative 50 · algorithmic-art 30 · agent-browser 22 · video-hyperframes 2 · magazine-web-ppt / brainstorming / data-report / penpot-flutter 1 each |
| Multi-turn | 124 traces tied to a session with ≥2 turns |
| Artifact | 18 traces produce `<artifact>` output |

---

## Anonymization

User-specific data has been scrubbed from every recording:

- `/Users/<name>/…`, `/home/<name>/…`, `C:\Users\<name>\…`
  → `${HOME}/…` / `%USERPROFILE%\…`
- Project UUIDs → stable `proj-001`, `proj-002`, … per recording
- meta tag `project:<uuid>` rewritten too

The anonymizer is idempotent. Tool input/output payloads (HTML, code,
etc.) are preserved verbatim — they're templated UI without cell-level
PII; if a future audit finds otherwise, add specific scrubs in the
harvester repo (see "Adding more recordings" below) and re-run.

---

## Adding more recordings

Local maintainer flow — the .jsonl never enters the repo. Only the
manifest delta (≈200 B per entry) gets committed.

### Step 1 — produce an anonymized .jsonl

The harvester that produced the current 179-trace set lives in a
separate repo, [nexu-io/agent-pr-explore][harvester]. See its README
for how to authenticate against your trace store, filter by skill /
agent / outcome, and anonymize the result. Output is one
`<trace-id>.jsonl` file per recording.

[harvester]: https://github.com/nexu-io/agent-pr-explore

### Step 2 — one-shot upload + manifest update

```bash
# prereq, once: wrangler login (OAuth, no token to manage)
bash mocks/scripts/upload-recording.sh /path/to/<trace-id>.jsonl
```

The script validates the file, prints the manifest entry it will add,
uploads the .jsonl to R2, rewrites `mocks/manifest.json` locally, then
uploads the updated manifest to R2 too (so consumers see the new entry
without waiting for the next git push).

### Step 3 — commit the manifest delta

```bash
git add mocks/manifest.json
git commit -m "mocks: add recording <trace-id>"
git push     # or open a PR — your call
```

The only thing in the commit is a ~200-byte JSON edit listing the new
entry's `trace_id`, `sha256`, `bytes`, `agent`, `outcome`, `skills`,
etc. The .jsonl itself stays in R2.

### Trust model

- **R2 write is wrangler-OAuth gated.** Maintainers do `wrangler login`
  once. The bucket is on the powerformer Cloudflare account (pinned in
  the script). No long-lived tokens in repo secrets, no Action to
  hijack — just account access.
- **Repo stays small forever.** No .jsonl files ever land in git; the
  manifest grows by ~200 B per recording.
- **Read stays public.** Anyone can fetch via the r2.dev URL — see
  [Recordings live on R2, not in this repo](#recordings-live-on-r2-not-in-this-repo).

### 移除 recording

```bash
# 1. 从 R2 删除
export CLOUDFLARE_ACCOUNT_ID=64ad4569ffd912432d6b86d5656484c4
wrangler r2 object delete open-design-mocks/recordings/v1/<trace-id>.jsonl --remote
# 2. 从 manifest.json 删除 entry（手工编辑，或使用 `jq`）
# 3. 重新上传 manifest
wrangler r2 object put open-design-mocks/recordings/v1/manifest.json \
  --file mocks/manifest.json --remote
# 4. git add mocks/manifest.json && git commit && git push
```

删除没有 automation，因为（a）它很少发生，（b）需要有人判断移除某条 recording 是否会让通过 `OD_MOCKS_TRACE=<id>` 固定它的 test fixtures 失效。

---

## 在 OD test code 中使用

### 在 test 中使用（Vitest / Jest）

```ts
import { spawn } from 'node:child_process';
import { join } from 'node:path';

const MOCK_BIN = join(__dirname, '../../mocks/bin');

it('parses an opencode session with 4 tool calls into 4 UI events', async () => {
  const child = spawn('opencode', ['run'], {
    env: {
      ...process.env,
      PATH: `${MOCK_BIN}:${process.env.PATH}`,
      OD_MOCKS_TRACE: '06a9324a',   // 4-tool claude session
      OD_MOCKS_NO_DELAY: '1',
    },
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  child.stdin.write('test prompt');
  child.stdin.end();
  // ... assert events parsed from child.stdout
});
```

### 手动 playback

```bash
# 查看 claude 的 17-tool "delete v2" session 会向 OD 发出什么：
export PATH=$(git rev-parse --show-toplevel)/mocks/bin:$PATH
export OD_MOCKS_TRACE=04097377
export OD_MOCKS_NO_DELAY=1
echo "anything" | claude -p --output-format=stream-json | jq .type | uniq -c
```

---

## Files

```
mocks/
├── README.md                 ← you are here
├── mock-agent.mjs                ← entry; routes --as <agent> to format renderer
├── lib/
│   ├── recording-picker.mjs      ← env-driven trace selection
│   ├── format-opencode.mjs       ← matches handleOpenCodeEvent
│   ├── format-codex.mjs          ← matches handleCodexEvent
│   ├── format-claude.mjs         ← matches createClaudeStreamHandler
│   ├── format-gemini.mjs         ← matches handleGeminiEvent
│   ├── format-cursor-agent.mjs   ← matches handleCursorEvent
│   ├── format-acp.mjs            ← JSON-RPC server matching attachAcpSession
│   ├── format-kimi.mjs           ← kimi stream-json renderer
│   ├── format-vela.mjs           ← AMR vela: ACP + models block + set_model gate
│   ├── vela-subcommands.mjs      ← `vela login` + `vela models` handlers
│   └── format-plain.mjs          ← raw stdout (deepseek/qwen/grok)
├── bin/
│   ├── opencode  claude  codex
│   ├── gemini    cursor-agent
│   ├── deepseek  qwen    grok
│   ├── devin hermes kilo kimi kiro vibe
│   └── vela                       ← 15 bash wrappers, PATH-overlay
├── manifest.json                 ← committed: 179 entries' metadata + sha256 + provenance + R2 storage hints
├── golden/                       ← committed: daemon-event regression snapshots
│   ├── README.md
│   └── *.events.json             ← 3 representative traces (claude/codex/opencode)
├── scripts/
│   ├── smoke-test.sh             ← 21 checks; auto-fetches recordings if empty
│   ├── fetch-recordings.sh       ← pull from R2 (parallel, sha256-verified, idempotent)
│   ├── upload-recording.sh       ← maintainer-local: validate + wrangler put + manifest update
│   ├── contract-check.sh         ← real-CLI vs mock protocol drift check (manual)
│   └── lib/
│       └── manifest-utils.mjs    ← shared sha256 / meta-parse / manifest-rebuild logic
└── recordings/                   ← populated at runtime, gitignored .jsonl
    └── .gitignore                ← recordings come via fetch
```

没有外部依赖。纯 node:`fs`/`crypto`/`child_process`。可在任何 Node ≥18 下工作。

---

## Limitations

- `copilot`、`qoder`、`pi`（较少见的 `copilot-stream-json` / `qoder-stream-json` / `pi-rpc` formats）已有 recordings，但尚未按它们的 native protocols 渲染；目前会 fallback 到 plain renderer。如果需要它们，请按 `format-codex.mjs` 的模式添加 `format-<agent>.mjs`；parsers 位于 `apps/daemon/src/{copilot-stream,qoder-stream}.ts`，pi-rpc handler 位于 `apps/daemon/src/server.ts`。
- mock 不会遵守会改变语义的 CLI flags（`--model`、`--permission-mode`、`--allowed-tools`）。它们会被静默忽略。

---

## Provenance / safety

所有 recordings 都来自 open-design 自己的 Langfuse project（`powerformer` org 下的 `open-design` project）。用户安装 desktop client 时已 opt into telemetry。Anonymizer 在 check in 前移除了 user-identifying paths 和 project UUIDs。

如果发现某条 recording 包含应该 redact 的内容，请按上方 [移除 recording](#移除-recording) 流程处理。
