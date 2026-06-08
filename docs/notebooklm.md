# NotebookLM：从 Open Design 导出 issues/PRs

Open Design 通过 GitHub Issues + PRs 收到大量反馈。如果你希望 NotebookLM 协助：

- support answers（带 citations）
- 用户场景的 clustering + taxonomy
- backlog extraction
- evaluation datasets / benchmark prompts

……可以先把 repo snapshot 导出成单个 Markdown 文件，并作为 source 上传到 NotebookLM。

## 将 issues + PRs 导出为 Markdown

Prereqs：
- 已安装并认证 `gh`（GitHub CLI）
- Node + pnpm（用于 `tsx`）

从 repo root 运行：

```bash
pnpm exec tsx scripts/notebooklm-export-github.ts \
  --repo nexu-io/open-design \
  --issues open \
  --prs open \
  --limit 50
```

默认输出到：

```text
notebooklm/<owner>__<repo>.md
```

你可以覆盖输出路径：

```bash
pnpm exec tsx scripts/notebooklm-export-github.ts \
  --repo nexu-io/open-design \
  --out notebooklm/open-design-snapshot.md
```

### Flags

- `--repo owner/name`（必填）
- `--out <path>`（可选）
- `--issues open|closed|all|none`（默认：`open`）
- `--prs open|closed|merged|all`（默认：`open`）
- `--limit <n>`（默认：`50`）— **issues + PRs 的总 item budget**。如果选择多个 states（例如 `--issues all --prs all`），exporter 会在写入总数达到 `n` 后停止。

## 上传到 NotebookLM

1. 打开 NotebookLM
2. 创建新的 notebook
3. Add a source → 上传生成的 `.md`
4. 提问，例如：
   - “Summarize the top recurring user problems this week, with links.”
   - “Group issues into a taxonomy (installation, provider auth, UI bugs, exports).”
   - “Suggest 10 high-confidence ‘good first issues’ with rationale.”

## Notes

- Exporter 会截断过长 body，避免文件失控。
- 它刻意保持 read-only：不会修改 issues 或 PRs。
