# Directory guide

本文件是 agents 进入此仓库时的 single source of truth。先读本文件；进入 `apps/`、`packages/`、`tools/` 或 `e2e/` 后，再读取对应层级的 `AGENTS.md` 获取 module-level details。不要把 module details 复制回根文件；根文件只聚焦 cross-repository boundaries、workflow 和 commands。

## Core documentation index

- Product and onboarding：`README.md`、`docs/i18n/README.zh-CN.md`、`QUICKSTART.md`。
- Contribution and environment：`CONTRIBUTING.md`、`docs/i18n/CONTRIBUTING.zh-CN.md`。
- Architecture and protocols：`docs/spec.md`、`docs/architecture.md`、`docs/skills-protocol.md`、`docs/agent-adapters.md`、`docs/modes.md`。
- Roadmap and references：`docs/roadmap.md`、`docs/references.md`、`docs/code-review-guidelines.md`、`specs/current/maintainability-roadmap.md`。
- Directory-level agent guidance：`.github/AGENTS.md`、`apps/AGENTS.md`、`packages/AGENTS.md`、`tools/AGENTS.md`、`e2e/AGENTS.md`。
- Packaged auto-update architecture 和 high-confidence local harness：在触碰 packaged updater code、release-channel identity、installer behavior 或 updater UI 前，先阅读 `tools/pack/AGENTS.md` 中的 "Packaged auto-update architecture and harness" section。

## Workspace directories

- Workspace packages 来自 `pnpm-workspace.yaml`：`apps/*`、`packages/*`、`tools/*` 和 `e2e`。
- 顶层内容目录：`skills/`（agent 在任务中调用的 functional skills：utilities、briefs、packagers；见 `skills/AGENTS.md`）、`design-templates/`（rendering catalogue：decks、prototypes、image/video/audio templates；见 `design-templates/AGENTS.md` 和 `specs/current/skills-and-design-templates.md`）、`design-systems/`（brand `DESIGN.md` files）、`craft/`（skill 可通过 `od.craft.requires` 选择加入的 universal brand-agnostic craft rules）、`mocks/`（基于 replay 的 mock CLIs，覆盖 `opencode`/`claude`/`codex`/`gemini`/`cursor-agent`/`deepseek`/`qwen`/`grok`、ACP family `devin`/`hermes`/`kilo`/`kimi`/`kiro`/`vibe`，以及 AMR `vela` CLI（login + models + ACP）；由 anonymized Langfuse traces 构建，是 tests 和 self-validation 的 PATH-overlay drop-in；见 `mocks/README.md`）。
- `apps/web` 是 Next.js 16 App Router + React 18 web runtime；不要恢复 `apps/nextjs`。
- `apps/daemon` 是本地 privileged daemon 和 `od` bin。它拥有 `/api/*`、agent spawning、skills、design systems、artifacts 和 static serving。
- `apps/desktop` 是 Electron shell；它通过 sidecar IPC 发现 web URL。
- `apps/packaged` 是很薄的 packaged Electron runtime entry；只负责启动 packaged sidecars 和 `od://` entry glue。
- `packages/contracts` 是纯 TypeScript 的 web/daemon app contract layer。
- `packages/sidecar-proto` 拥有 Open Design sidecar business protocol；`packages/sidecar` 拥有 generic sidecar runtime；`packages/platform` 拥有 generic OS process primitives。
- `tools/dev` 是 local development lifecycle control plane。
- `tools/pack` 是 local packaged build/start/stop/logs control plane、packaged updater harness、installer identity/registry validation surface，以及 mac beta release artifact preparation surface。
- `tools/serve` 是 local fixture-service control plane；第一个 service 是 `tools-serve start updater`，用于 deterministic updater metadata and artifacts。
- `e2e` 拥有 user-level end-to-end smoke tests 和 Playwright UI automation；编辑其 tests 或 commands 前，先读 `e2e/AGENTS.md`。

## Inactive or placeholder directories

- `apps/nextjs` 和 `packages/shared` 已移除；不要重新创建或引用它们。
- 本地 runtime data、`.tmp/`、Playwright reports 和 agent scratch directories 必须留在 git 之外。对于 daemon-managed data paths，阅读并遵循下方 **Daemon data directory contract**；不要在别处重述或即兴发明路径约定。

# Development workflow

## Environment baseline

- Runtime target 是 Node `~24` 和 `pnpm@10.33.2`；使用 Corepack，以便选择 `package.json` 中 pin 的 pnpm 版本。
- 新的 project-owned entrypoints、modules、scripts、tests、reporters 和 configs 默认应使用 TypeScript。
- 残留 JavaScript 仅限 generated output、vendored dependencies、明确记录的 compatibility build artifacts，以及 `scripts/guard.ts` 中的 allowlist。

## Windows native

- macOS、Linux 和 WSL2 是主要支持路径。Windows native 是 best-effort；如果不可用，请 file an issue。
- 历史 Windows-specific friction 记录在已关闭 issues #10、#96、#100、#203 和 #315 中；提交新报告前，先查看 issue tracker 的当前状态。
- 安装 Node 24。可以使用 `winget install OpenJS.NodeJS.LTS`（当前是 Node 24.x），也可以从 https://nodejs.org 下载。安装后用 `node --version` 验证；WinGet LTS 指针会在 2026 年 10 月滚到下一个 major，因此后续重跑安装命令时要重新验证。不要使用 Node 22；见 FAQ。
- `corepack enable` 在 Windows 上会因 EPERM 失败（无法向 `Program Files` 写入 shims）。改用 `npm install -g pnpm@10.33.2`。
- `better-sqlite3` 没有 win32/Node 24 的 prebuilt binary；`pnpm install` 会通过 node-gyp 从源码编译它（约 2 分钟）。需要 Visual Studio Build Tools 2022 或更新版本。这是预期行为，不是版本不兼容的信号。
- `tools-dev` start/stop/status 用法见下方 "Local lifecycle"。

## Local lifecycle

- 使用 `pnpm tools-dev` 作为唯一的 local development lifecycle 入口。
- 不要添加或恢复 root lifecycle aliases：`pnpm dev`、`pnpm dev:all`、`pnpm daemon`、`pnpm preview` 或 `pnpm start`。
- Ports 由 `tools-dev` flags 管理：`--daemon-port` 和 `--web-port`。
- `tools-dev` 会为 web proxy target 导出 `OD_PORT`，为 web listener 导出 `OD_WEB_PORT`；不要使用 `NEXT_PORT`。

## Daemon data directory contract

This section is the only repository-wide source of truth for daemon-managed
data paths. Every README, guide, deployment note, and operational handoff that
mentions daemon data paths must point here instead of restating the rules.

This boundary is strict. Do not introduce concrete filesystem examples for the
daemon data directory, recommended data directory, shared data directory,
deployment mount, or example data directory. If existing code exposes a legacy
fallback, treat it as implementation detail or a known escape candidate, not as
a documentation pattern to copy. If a change needs a data-path rule that is not
covered here, request a core-maintainer decision in the PR instead of inventing
a new convention.

The daemon has one active data-root truth source:

- On daemon startup, `apps/daemon/src/server.ts` resolves `OD_DATA_DIR` into
  `RUNTIME_DATA_DIR`.
- All daemon-owned data paths must derive from `RUNTIME_DATA_DIR` or from a
  constant derived from it, such as `PROJECTS_DIR` or `ARTIFACTS_DIR`.
- `PROJECTS_DIR` is the managed-project root. Imported-folder projects are the
  explicit exception: they use `metadata.baseDir` for the user-selected
  external workspace.
- `ARTIFACTS_DIR`, SQLite, app config, memory, MCP config/tokens, automation
  state, plugin state, connector credentials, generated files, logs owned by
  sandbox mode, and agent runtime homes are daemon data and must remain under
  the resolved daemon data root unless this file names a specific exception.
- Agent subprocesses receive the resolved daemon data root as `OD_DATA_DIR`.
  They must inherit the daemon's truth source instead of guessing their own
  data path.

Development propagation:

- `tools-dev` owns sidecar runtime/log/ipc namespacing.
- `tools-dev --namespace <name>` does not, by itself, define daemon data
  isolation.
- A development run that needs an isolated daemon data root must pass
  `OD_DATA_DIR` into the daemon process environment. After that, the daemon
  resolves it once and all daemon data paths flow from `RUNTIME_DATA_DIR`.

Packaged propagation:

- `tools-pack` / `apps/packaged` own packaged channel and namespace layout.
- Packaged code resolves the final namespace-scoped daemon data root before
  spawning the daemon.
- The packaged daemon receives that final data root as `OD_DATA_DIR`; daemon
  code must not infer packaged data paths from app names, Electron `userData`,
  ports, channel names, or namespace names.

Sanctioned exceptions:

- `OD_MEDIA_CONFIG_DIR` is a narrow override for `media-config.json` only. It
  is not a second daemon data root.
- `OD_LEGACY_DATA_DIR` is a migration source for legacy data import only. It is
  not an active daemon data root.
- External tool homes such as `CODEX_HOME` are integration inputs, not daemon
  data roots. The daemon must not describe them as Open Design runtime data.
- Agent/project-cwd skill staging aliases are not daemon data roots.
- Manifest metadata keys and CSS identifiers are semantic namespaces, not
  filesystem path conventions.

Known escape candidates that must not be reused:

- Module-level defaults that point at a cwd-relative legacy data directory.
- Helper defaults such as `defaultRegistryRoots()` that recompute a data root
  from `process.env.OD_DATA_DIR` or a cwd fallback instead of receiving
  `RUNTIME_DATA_DIR`.
- `openDatabase(projectRoot)` calls that rely on its fallback instead of
  passing the resolved data root.
- Script help text or examples that suggest concrete legacy data directories.

Do not extend these escape patterns. When a fix is obvious, route the path
through `RUNTIME_DATA_DIR` or an explicit data-root argument. When it is not
obvious, block the PR and request core-maintainer guidance.

## Root command boundary

- root scripts 只保留给真正的 repo-level checks 和 tools control-plane entrypoints：`pnpm guard`、`pnpm typecheck`、`pnpm tools-dev`、`pnpm tools-pack` 和 `pnpm tools-serve`。
- 不要添加 root aggregate `pnpm build` 或 `pnpm test` aliases。Build/test commands 必须保持 package-scoped（`pnpm --filter <package> ...`）或 tool-scoped（`pnpm tools-pack ...`）。
- 不要添加 root e2e aliases；e2e package commands 和 ownership rules 位于 `e2e/AGENTS.md`。

## GitHub automation boundary

编辑 `.github/workflows/`、`.github/scripts/`、`.github/actions/`、PR follow-on automation、`workflow_run` trusted writes、CI handoff artifacts，或守护这些 surface 的 workflow topology checks 前，先阅读 `.github/AGENTS.md`。

CI 相关 GitHub automation 使用两层架构：

- Business layer workflows 负责 product 或 validation decisions。`ci.yml` 是主要的 low-privilege PR、merge-queue 和 manual validation workflow。它检测 scope、运行 checks，并产出 typed handoff artifacts。
- Atomic capability workflows 负责可复用的 trusted operations。`comment.atom.yml` 发布纯文本 PR comments，`autofix.atom.yml` 应用 same-repository patches，`report.atom.yml` 则 materialize 需要 trusted dependencies、secrets 或 report generation 后才能 upsert 的 advanced comments。

不要在未先尝试把 flow 表达为 `ci.yml` producer + 现有 `comment`、`autofix` 或 `report` capability 的情况下，新增类似 `foo.comment.atom.yml` 或 `bar.autofix.atom.yml` 的 business-named follow-on workflow。Artifact naming、storage layout 和 parser behavior 必须集中在 `.github/scripts/handoff.py`；不要让单个 workflow 发明平行的 handoff conventions。

## Release channel model

- `beta` 是日常 R&D/development validation channel。它为快速开发反馈优化，不属于 stable promotion gate。
- `prerelease` 是 stable delivery 的内部 validation channel。Stable releases 仍由已验证的 prerelease artifacts gate。
- `preview` 是独立的 early-access channel，具备 stable-like release rigor。它应使用 `X.Y.Z-preview.N` 这类 preview versions，发布到 `preview` R2 channel，在 `preview/latest` 下发布 updater feeds，并遵循 stable 的 platform policy，包括现有 optional Linux enablement。
- `stable` 是正式 delivery channel。不要让 stable promotion 依赖 preview；stable 继续只依赖 prerelease。
- Public packaged app identity 必须保持 channel-distinct：stable 使用 `Open Design`，beta 使用 `Open Design Beta`，prerelease 使用 `Open Design Prerelease`，preview 使用 `Open Design Preview`。不要发布 drag-install app bundle 是 `Open Design.app` 的 beta、prerelease 或 preview mac DMGs。
- Windows beta updater validation 必须使用真实 beta namespace `release-beta-win`；否则 local beta-like namespace 可能创建单独的 uninstall registry key，同时看起来仍像同一个 `Open Design Beta` app。Architecture map 和 high-confidence acceptance harness 见 `tools/pack/AGENTS.md`。

## Boundary constraints

- `apps/`、`packages/` 和 `tools/` 下的 tests 位于与 `src/` 同级的 package/app/tool-level `tests/` 目录；保持 `src/` source-only，不要在 `src/` 下新增 `*.test.ts` 或 `*.test.tsx`。Playwright UI automation 属于 `e2e/ui/`，不属于 app packages。
- App packages 不得把另一个 app 的 private `src/` 或 `tests/` implementation 当 shared helper import。尤其是 `apps/web/**` 不得 import `apps/daemon/src/**`；web/daemon integration 应位于 HTTP APIs、`packages/contracts` 和 app-local provider boundaries 之后。
- 当 cross-app、cross-runtime 或 repository-resource consistency checks 需要观察多个 app/package boundary 时，它们属于 `e2e/tests/`；应把可复用逻辑提升到 pure package，而不是借用另一个 app 的 private source。
- Shared API DTOs、SSE event unions、error shapes、task shapes 和 example payloads 放在 `packages/contracts`；在接入互相分叉的 web/daemon request 或 response shapes 前，先更新 contracts。
- 保持 `packages/contracts` 为 pure TypeScript，不依赖 Next.js、Express、Node filesystem/process APIs、browser APIs、SQLite、daemon internals 和 sidecar control-plane dependencies。
- 保持 project-owned entrypoints、modules、scripts、tests、reporters 和 configs TypeScript-first；generated `dist/*.js` 是 runtime output，source edits 属于 `.ts` 文件。
- 新的 `.js`、`.mjs` 或 `.cjs` 文件需要明确的 generated/vendor/compatibility reason，并且必须通过 `pnpm guard`。
- App business logic 不应知道 sidecar/control-plane concepts。把 sidecar awareness 保持在 `apps/<app>/sidecar` 或 desktop sidecar entry wrapper 中。
- Shared web/daemon app contracts 属于 `packages/contracts`；该 package 不得依赖 Next.js、Express、Node filesystem/process APIs、browser APIs、SQLite、daemon internals 或 sidecar control-plane protocol。
- Sidecar process stamps 必须正好有五个字段：`app`、`mode`、`namespace`、`ipc` 和 `source`。
- Orchestration layers（`tools-dev`、`tools-pack`、packaged launchers）必须调用 package primitives；不要手写 `--od-stamp-*` args 或 process-scan regexes。
- Packaged runtime paths 必须 namespace-scoped，并与 daemon/web ports 独立；ports 只是 transient transport details。
- 默认 runtime files 位于 `<project-root>/.tmp/<source>/<namespace>/...`；POSIX IPC sockets 固定在 `/tmp/open-design/ipc/<namespace>/<app>.sock`。

## Capability exposure (UI/CLI dual-track)

每个 user-facing capability 都必须同时能通过 web UI **和** `od` CLI（`apps/daemon/src/cli.ts`）访问。只带其中一个 surface 发布 feature 属于 regression。

- CLI 是 embeddability contract。External agents（hermes-agent、openclaw、自定义 Slack/Discord bots、从另一个 shell 调用的 packaged runtimes）通过 `od` subcommands 驱动 Open Design；它们不会渲染 web UI。如果 capability 只存在于 UI，就无法被这些 external agents compose。
- 两个 surfaces 必须调用同一套 `/api/*` endpoints；不要让 CLI 使用一种 shape，而 UI 使用另一种。daemon HTTP layer 是 single source of truth，`packages/contracts` 承载 shared DTOs。
- CLI 形式必须支持 `--json` 作为 machine-readable output，并通过 `--prompt-file <path|->` 接受 long-form prompts，这样通过 `xargs`、`jq` 和 `<heredoc` pipe 的 jobs 才能保持干净。
- 添加新 capability 是一个三步 closure：`apps/daemon/src/*-routes.ts` 中的 HTTP endpoint（并在 `packages/contracts/src/api/` 中有 contract type）、`apps/web/src/` 中的 UI surface，以及 `apps/daemon/src/cli.ts` 中通过 `SUBCOMMAND_MAP` 注册的 `od <capability>` subcommand。三者要在同一个 PR 中落地；不要拆到多个 PR。
- PR template 的 Surface area checklist 必须反映 *两个* surfaces。如果勾了 UI，也要勾 CLI，反之亦然；或者在 PR body 中说明为什么缺失 surface 真实不适用（例如 internal-only daemon health probe）。"I'll do the CLI later" 不是有效理由。
- 现有参考点：`od automation …` 将 Automations tab 映射到 `/api/routines`；`od plugin …`、`od ui …`、`od project …`、`od media …`、`od mcp …`、`od research …` 遵循同一形状。新增 capabilities 时复制该 pattern。

## Git commit policy

- Git commits 不得包含 `Co-authored-by` trailers 或任何其他 co-author metadata。

## Pull request expectations

- Opening a PR 使用 `.github/pull_request_template.md`；填写每个 section，而不只是 title。
- "Why" 必须回答作者的 use case（是什么让你写这个 PR）和正在解决的 pain（user problem、technical debt、prod issue 或 unblocker），而不只是用一行复述 title。
- "What users will see" 从用户视角描述变化：他们点击什么、出现什么新东西、默认行为有什么变化；不要从代码视角描述。
- Surface area checklist 必须反映实际 touched surfaces；勾选所有适用项，包括 extension points（`skills/`、`design-systems/`、`design-templates/`、`craft/`）、CLI flags、env vars、i18n keys，以及新的 root `package.json` dependencies。
- 如果勾选了任何 UI surface，请附上展示 entry point 的 screenshots，也就是用户在哪里发现该变化；不要只展示孤立 feature。行为变化最好提供 before/after。
- 对 bug-fix PRs，按上方 `Bug follow-up workflow` section，链接复现 bug 的 red-spec test，并确认它在 `main` 上 red、在 branch 上 green。
- `CONTRIBUTING.md` 覆盖 PR scope、title format、dependency policy，以及 non-trivial features 的 issue-first rule；`docs/code-review-guidelines.md` 是 reviewer-facing complement。

## Code review guide

- 使用 `docs/code-review-guidelines.md` 作为 repository-wide review standard。该文档是 operational guide；两者冲突时，本 `AGENTS.md` 是 source of truth。
- 按 `docs/code-review-guidelines.md` 自上而下走 review：Product relevance test → forbidden surfaces → ownership/scope → matching lane → checklist → comments → approval bar。
- 选择匹配的 review lane：default code/tests、contract and protocol changes、design-system additions、skill additions 或 craft additions。
- review `apps/`、`packages/`、`tools/` 或 `e2e/` 下的 changes 前，先读该目录的 `AGENTS.md`，并应用它的 local boundaries。
- Blocking review feedback 应聚焦 correctness、security/secrets、data integrity、repository boundary violations、contract/migration breakage、missing required validation 或 high-risk maintainability issues。
- 只有 maintainers 可以 close PR 而不是 request changes，且仅限现有 branch 上无法挽救的 change（target product 错误、foreign test harness、此 repo 不存在的 DOM/API assumptions，或与 lifecycle rules 冲突的 scripts）。

## PR-duty tooling

此仓库不再提供 maintainer PR-duty control plane。原先的 `pnpm tools-pr` workflow 已迁移到独立的 `PerishCode/duty` project，避免个人 review-lane automation 变成 product workspace maintenance surface。没有新的明确 maintainer decision 时，不要重建 `tools/pr`、`@open-design/tools-pr` 或 root `pnpm tools-pr` script。

## Agent runtime conventions

- `RuntimeAgentDef.promptInputFormat` 选择 daemon 如何把 prompt 写入 child 的 stdin。默认 `'text'` 会写入 composed prompt 并立刻结束 stdin。`'stream-json'` 会把 prompt 包成一条 JSONL `user` message，并保持 stdin 打开，让 daemon 可以在 mid-turn 把后续 user messages stream 回去。Claude（`apps/daemon/src/runtimes/defs/claude.ts`）随 `'stream-json'` 一起使用 `--input-format stream-json` 作为通用 mid-turn input 基础设施；daemon 会在 turn 干净结束后关闭 stdin。其他所有 agent 保持 `'text'`。
- `apps/daemon/src/server.ts` 在 run object 上跟踪 `run.stdinOpen`。当带有非 `tool_use` `stop_reason` 的 `turn_end`（或 `usage`）event 到达时，`applyClaudeStreamJsonRunBookkeeping` 会关闭 stdin（并记录 `turnCompletedCleanly`）。`tool_use` stop reason 表示 model 在 mid tool 暂停（等待 claude-code 内部 runner）；此时关闭 stdin 会截断后续响应。
- `claude-stream.ts` 在遍历 assistant message 的 content blocks **之后** 才发出 `turn_end` event，而不是之前，这样 daemon 会先看到该 turn 的最终 `stop_reason` 和每个 `tool_use`，再决定是否关闭 stdin。
- Host 通过 `<question-form>` artifact 询问用户澄清问题（见下方 "Asking the user questions"），**不是**通过 stdin 注入的 `tool_result`。这里没有 `AskUserQuestion` tool wiring，没有 `/api/runs/:id/tool-result` endpoint，也没有 host-answer 回传路径；保留 stream-json input skeleton 只是为了通用基础设施。

## Asking the user questions

- 澄清用户意图只有一个机制：model inline 产出的 `<question-form>` markdown artifact。Chat 通过 `QuestionsBanner` entry point（`AssistantMessage.tsx`）展示入口；表单本身在右侧 Questions tab（`QuestionsPanel` + `QuestionFormView`）渲染；答案作为下一条用户消息回流（`apps/web/src/artifacts/question-form.ts` 中的 `formatFormAnswers` -> `POST /api/chat`）。没有 inline interactive tool card。
- `<question-form>` 在任何 turn 都有效，不只限于 turn-1 discovery。它既用于 turn-1 discovery briefs，也用于对话中途澄清（例如模糊 annotation）。System-prompt guidance 位于 `apps/daemon/src/prompts/system.ts` 和 `discovery.ts`；API/BYOK 模式文案通过 `packages/contracts/src/prompts/system.ts` mirrored。
- `run-artifacts.ts:runAskedUserQuestion` 通过扫描 run 流式文本中的 `<question-form` marker（跨 `text_delta` chunks 重组）来驱动 `run_finished.asked_user_question` analytics signal，而不是检测任何 tool call。

## Chat UI conventions

- `apps/web/src/components/file-viewer-render-mode.ts` 决定 HTML previews 使用 URL-load 还是 srcDoc。Bridges（deck、comment/inspect selection、palette、edit、tweaks）**只能**通过 srcDoc path 注入。任何 feature 需要 srcDoc-only bridge 时，都要给 `UrlLoadDecision` 添加新的 disqualifier；适当时基于 source-content heuristic 从 `FileViewer.tsx` 传入（例如 `hasTweaksTemplate`）。Host 会同时保持两个 iframes mounted，并交换 CSS visibility，因此切换 render mode 不会造成 iframe reload flash；`iframeRef.current` 通过 `useEffect` 与 active iframe 保持一致。Receive filters 用 `isOurIframe(ev.source)` 接受来自任一 iframe 的 messages，但那些**只能**来自 active iframe 的 signals（例如 `od:tweaks-available`）会再次检查 `ev.source === iframeRef.current?.contentWindow`。
- TodoWrite UI 通过 `ChatPane.tsx` 中的 `PinnedTodoSlot` 把一个 canonical task list pin 在 chat composer 上方。该 slot 通过 `latestTodoWriteInputFromMessages`（`apps/web/src/runtime/todos.ts`）读取 conversation 中最新的 TodoWrite snapshot。`AssistantMessage.stripTodoToolGroups` 会从 per message rendering 中移除所有 TodoWrite tool groups，让屏幕上正好只有一个 TodoCard。Progress count 同时包含 `completed` 和 `in_progress` items（1/4 表示 "one underway"，不是 "zero finished"）。Done button dismissal 以 snapshot 的 JSON 为 key，因此 agent 发出的 fresh TodoWrite 会自动重新显示 card。`PinnedTodoSlot` 位于 `.chat-log` scroll container **外部**，所以 auto-scroll 需要显式覆盖：`ChatPane` 的 `ResizeObserver` 从 `PinnedTodoSlot` 接受 `containerRef` 并直接 observe 该元素，pane-level `MutationObserver`（chat pane ancestor 上的 `childList: true`）会在新 TodoWrite snapshots 使 slot mount/unmount 时重新同步该 observation。
- 澄清问题通过 `<question-form>` artifact 和 Questions tab 渲染，而不是 inline tool card。见上方 "Asking the user questions"。
- Tool group rendering 使用 `dedupeSnapshotToolRetries` 折叠 `TodoWrite` snapshots（只保留最近一次 call，因为每次 call 都是 state replace）。`SNAPSHOT_TOOL_NAMES` 列出 snapshot-style tools；non-snapshot tools 原样通过。

## Web CSS ownership

- `apps/web/src/index.css` 是 import-only cascade entrypoint。不要在那里添加 selectors 或 declarations；只有在确实需要 global stylesheet 时才添加 imports，并保持 import order 有意图。
- Shared global styles 属于 `apps/web/src/styles/`：design tokens、base/reset rules、primitives、app-shell layout，以及暂时无法安全 scope 的 legacy cross-component selectors。把 domain-level global files 按 owner 分组（例如 `styles/viewer/` 和 `styles/workspace/`），不要直接在 `styles/` 下继续添加大型文件。
- 新的 component-owned UI styles 默认应使用组件旁边的 CSS Modules（`Component.module.css`），而不是扩大全局 stylesheets。对 isolated components、panels、menus、drawers、toolbars、cards 和 form sections 来说，这是首选。
- 触碰已有组件且附近有 global styles 时，如果迁移很小且可测试，优先把该组件的 local selectors 迁移到 CSS Module。不要在同一个 patch 中混合大规模机械迁移和 behavior/styling changes。
- 只为有意的 shared contracts 保留 global class names：reusable primitives、theme hooks、third-party/content styling、cross-component layout，或依赖 global cascade/specificity 的 selectors。任何新的 global selector group 都要记录其 owning feature。
- CSS refactors 必须保持 cascade semantics。机械拆分时，验证展开后的 import content/order 与之前 stylesheet 匹配；CSS Module migrations 时，用 `pnpm --filter @open-design/web typecheck` 和 focused build/test 或可行的 visual check 验证受影响 UI path。

## Web component reuse

- 新的 `apps/web` UI 在存在对应 shared primitives 时，应复用 `@open-design/components`，而不是直接 styling plain HTML elements。例如 app buttons 使用 `Button`，screen-reader-only text/status content 使用 `VisuallyHidden`。
- 新 UI 不要添加新的 raw primitive classes，例如 `primary`、`primary-ghost`、`ghost`、`subtle`、`icon-btn` 或 `sr-only`。这些 classes 是既有 markup 迁移前的 legacy compatibility surface。
- 如果缺少所需 primitive，优先在 `packages/components` 添加小而聚焦的 primitive，使用 colocated CSS Modules，然后在 app 中消费。Product-specific layout 和 workflow styling 留在 app，不要放进 `packages/components`。
- 当内容 markup 或 specialized control 尚未被 shared package 建模时，保留 semantic plain HTML；不要强行迁移，以免隐藏 native behavior 或让 custom widget 更难推理。
- `apps/web` 在 dev 期间会从 source transpile `@open-design/components`，因此 component 和 CSS Module edits 应能通过普通 web dev loop 生效，不需要 rebuild package。

## i18n keys

- `apps/web/src/i18n/types.ts` 是 typed `Dict`；每个 key 必须在 `apps/web/src/i18n/locales/*.ts` 下的全部 18 个 locale files 中定义（`ar`、`de`、`en`、`es-ES`、`fa`、`fr`、`hu`、`id`、`ja`、`ko`、`pl`、`pt-BR`、`ru`、`th`、`tr`、`uk`、`zh-CN`、`zh-TW`）。先把 key 加到 `types.ts`；缺失翻译会产生 typecheck error。

## UI animation philosophy

- UI transitions 的默认 ease-out：`cubic-bezier(0.23, 1, 0.32, 1)`。内建 `ease` 太弱；UI elements 禁用 `ease-in`，因为它感觉迟缓。
- Asymmetric durations：enter 约 200ms，exit 约 140ms。Exit 会显得果断，因为用户已经选择 dismiss。
- Accordion expand/collapse 使用 `grid-template-rows: 0fr -> 1fr`（modern auto height pattern）。配合 opacity fade 和上面的 easing。共享的 `.accordion-collapsible` + `.accordion-collapsible-inner` class pair（定义于 `apps/web/src/index.css`）是 canonical implementation；新的 disclosure UI 复用它。
- 永远不要从 `transform: scale(0)` 开始动画。从 `scale(0.9)` 或更高、配合 `opacity: 0` 开始。
- 对 conditionally show 的元素，保持 mounted 并切换 CSS class（例如 `.chat-jump-btn-active`）。React unmounts 会完全跳过 exit transition。

## Validation strategy

- package、workspace 或 command-entry changes 后，运行 `pnpm install`，让 workspace links 和 generated dist entries 保持新鲜。
- 对 agent-stream / parser changes（`apps/daemon/src/claude-stream.ts`、`json-event-stream.ts`、`qoder-stream.ts` 等），通过 `mocks/` 中的 mock CLIs replay 一条 recorded session，以验证 event shapes round-trip，同时不消耗 provider budget。PATH-overlay activation：`export PATH="$PWD/mocks/bin:$PATH" OD_MOCKS_TRACE=<8-char-id> OD_MOCKS_NO_DELAY=1`。Trace catalog 和 selection knobs 见 `mocks/README.md`。
- 每个 `pnpm-lock.yaml` change 都视为需要 Nix pnpm deps hash refresh check。`nix/pnpm-deps.nix` 是 generated lock artifact；仅在有意维护 Nix packaging 时使用 `pnpm nix:update-hash`，随后重新运行 `nix flake check --print-build-logs --keep-going`。没有 Nix 的 contributors 可依赖 PR `Validate workspace` gate；该 gate 现在会在可能时上传或自动应用 generated hash-only fix。过期的 Nix hash 在 `pull_request` 上只是 advisory，不会阻塞 PR；`nix_validation` job 会通过 autofix 刷新 hash，同时保持 PR check 为 green，只有 merge time（`merge_group` 和手动 full runs）才把 hash 作为 hard gate fail closed。
- 标记常规工作 ready 前，至少运行 `pnpm guard` 和 `pnpm typecheck`，再加上匹配已改文件的 package-scoped tests/builds。不要使用或添加 root `pnpm test`/`pnpm build` aliases。
- local web runtime loops 优先使用 `pnpm tools-dev run web --daemon-port <port> --web-port <port>`。
- 需要 tools-dev daemon/web runtime 的 e2e tests 必须使用 `e2e/lib/tools-dev/` 下的共享 tools-dev harness 和 framework suite adapters（`e2e/lib/playwright/suite.ts`、`e2e/lib/vitest/suite.ts`）。不要在 test case 中手动 spawn `tools-dev`，也不要在 framework-specific folders 下复制 lifecycle helpers。
- Playwright UI tests 必须从 `@/playwright/suite` 导入 `test`/`expect`，不要直接从 `@playwright/test` 导入；仅 type-only imports 仍可来自 `@playwright/test`。该 suite 为每个 Playwright worker 拥有一个隔离的 tools-dev daemon/web/data root。不要添加 shared-runtime fallback；资源受限时把 Playwright workers 设为 `1`。
- Playwright suite code 不负责 workspace prebuild policy。CI 和调用方保留现有 prebuild steps；`tools-dev` daemon freshness checks 只是 fallback guard。
- 在 GUI-capable machine 上，通过运行 `pnpm tools-dev`，再运行 `pnpm tools-dev inspect desktop status` 验证 desktop。
- Stamp/namespace changes 必须验证两个 concurrent namespaces，并对每个 namespace 运行 desktop `inspect eval` 和 `inspect screenshot`。
- Path/log changes 必须运行 `pnpm tools-dev logs --namespace <name> --json`，并确认 log paths 位于 `.tmp/tools-dev/<namespace>/...` 下。

## Bug follow-up workflow

以下是 routine bug follow-ups 的工作 playbook，来自近期实践提炼。把它当作默认 action shape，而不是 contract；production reality 总有这些 bullets 无法预料的边角，所以当情况不完全匹配时要使用判断力。

- **Lead with a red spec.** 默认把 bug 编码成一个 falsifiable test：它在任何 source change 前变 red，这样 fix 锚定在可观察行为，而不是 source-code intuition 上。如果 red spec 无法低成本写出，通常说明需要先澄清 scope，而不是基于猜测继续推进。
- **Try the cheapest layer first.** 优先使用仍能看见 symptom 的最轻 test layer（daemon HTTP boundary 上的 e2e Vitest → app-local Vitest → Playwright UI → platform-native harnesses）；只有当更轻层看不见时，才往下走。
- **Hold the spec's scope.** 在 bug 描述边界之外发现的 defects 属于 follow-up：它们需要自己的 red spec、自己的 PR，而不是塞进本 fix。在 PR body 的 "Adjacent issues" section 中列出它们和 rationale，然后继续。
- **Let the fix read as an invariant.** 相比带着道歉式历史 comments 的附加 `if` guard，更偏好一个具名 helper，并用 docblock 描述必须成立的条件。Call site 应该读起来像意图。
- **Diff against the baseline.** 当相邻 suites 存在 pre-existing failures 时，在声称 "no new failures" 前先 stash 或 checkout upstream。
- **Link the issue from the PR body.** 使用 `Fixes #N` / `Closes #N` / `Resolves #N`，让 issue 在 merge 时自动关闭，并让 release-time reverse lookup（`gh issue view N --json closedByPullRequestsReferences` → `git tag --contains <merge sha>`）真正有链路可循。Repo 的 PR template 会提示这一点；如果 PR 确实不关闭任何 issue，删除该提示也可以。
- **Stage human verification for visible bugs.** 当 symptom 需要人眼确认时（UI、platform-native behavior、animations、unit test 看不见的 race conditions），只有 green specs 不足以作为 acceptance。搭起一个 reviewer 可以自行操作的 buggy-vs-fix comparison（典型形状：两个 namespaced runtimes，一个在 `main`，一个在 fix branch），并且只通过 production HTTP APIs seed 所需数据；source-level test backdoors 会让 verification 失效，因为它们证明的是 fake flow，而不是真实流程。

一个完整 loop（red e2e spec → fix → green）的 worked example 见 `e2e/tests/dialog/stop-reconciles-message.test.ts`（issue #135）。

# Common commands

```bash
pnpm install
pnpm nix:update-hash
pnpm tools-dev
pnpm tools-serve start updater
pnpm tools-dev start web
pnpm tools-dev run web --daemon-port 17456 --web-port 17573
pnpm tools-dev status --json
pnpm tools-dev logs --json
pnpm tools-dev inspect desktop status --json
pnpm tools-dev inspect desktop screenshot --path /tmp/open-design.png
pnpm tools-dev stop
pnpm tools-dev check
```

```bash
pnpm guard
pnpm typecheck
```

```bash
pnpm --filter @open-design/web typecheck
pnpm --filter @open-design/web test
pnpm --filter @open-design/web build
pnpm --filter @open-design/daemon test
pnpm --filter @open-design/daemon build
pnpm --filter @open-design/desktop build
pnpm --filter @open-design/tools-dev build
pnpm --filter @open-design/tools-pack build
pnpm --filter @open-design/tools-serve build
```

```bash
pnpm tools-pack mac build --to all
pnpm tools-pack mac install
pnpm tools-pack mac cleanup
pnpm tools-pack win build --to nsis
pnpm tools-pack win install
pnpm tools-pack win cleanup
pnpm tools-pack linux build --to appimage
pnpm tools-pack linux install
pnpm tools-pack linux build --containerized
```

# FAQ

## Why is there no root `pnpm dev` / `pnpm start`?

为了避免通过不一致的 env、port、namespace 或 log paths 启动 daemon、web 和 desktop。所有 local lifecycle flows 都必须通过 `pnpm tools-dev`。

## Why should `apps/nextjs` not be restored?

当前 web runtime 是 `apps/web`。历史 `apps/nextjs` layout 已从 active repo shape 中移除；恢复它会重新引入重复 app boundaries 和 stale scripts。

## How does desktop discover the web URL?

Desktop 通过 sidecar IPC 查询 runtime status。Web URL 来自 `tools-dev` launch status，而不是 desktop 猜测 ports 或读取 web internals。

## How are sidecar-proto, sidecar, and platform split?

`@open-design/sidecar-proto` 拥有 Open Design app/mode/source constants、namespace validation、stamp fields/flags、IPC message schema、status shapes 和 error semantics。`@open-design/sidecar` 只提供 generic bootstrap、IPC transport、path/runtime resolution、launch env 和 JSON runtime files。`@open-design/platform` 只提供 generic OS process stamp serialization、command parsing 和 process matching/search primitives，并消费 proto descriptor。

## When is `pnpm install` required?

更改 package manifests、workspace layout、command entrypoints、bin/link-related content，或添加/移除 workspace packages 后，运行 `pnpm install`。

## Can I use Node 22 instead of Node 24?

不可以。`package.json#engines` 指定 `node: "~24"`，这是唯一支持的 runtime。当前 lockfile pin 了 `better-sqlite3@11.10.0`；在 Windows 上它没有 Node 24 的 prebuilt binary，会通过 node-gyp 从源码构建（见 Windows native section）。更旧的 Node versions 没有测试，可能遇到 lockfile 或 dependency incompatibilities。
