# Roadmap

**父文档：** [`spec.md`](spec.md) · **同级文档：** [`architecture.md`](architecture.md) · [`skills-protocol.md`](skills-protocol.md) · [`agent-adapters.md`](agent-adapters.md) · [`modes.md`](modes.md)

从“今天只有 spec”到“可用 MVP”再到“发布 v1”的分阶段计划。所有估算都按一名专注开发者计算；两人乘以 0.6，三人乘以 0.4。

---

## Phase 0 — Spec 收敛（当前，约 3–5 天）

**目标：** 在写实现代码前把 interfaces 定准。所有在纸上便宜、在代码里昂贵的决策都放在这里。

**交付物：**
- [x] `README.md` + `docs/spec.md` + architecture / protocol / adapter / modes / references docs（截至目前，本 repo 内）
- [ ] `docs/schemas/skill-manifest.json` — `od:` front-matter block 的 JSON Schema
- [ ] `docs/schemas/design-system.md` — 9-section `DESIGN.md` 的正式 spec
- [ ] `docs/schemas/protocol.md` — HTTP/SSE API schemas
- [ ] `docs/schemas/adapter.md` — 以 TypeScript 打印出的 adapter interface
- [ ] `docs/examples/DESIGN.sample.md` — 可工作的 example design system
- [ ] `docs/examples/saas-landing-skill/` — 可工作的 example skill（即 `skills-protocol.md` §8 中草拟的那个）
- [ ] 解决每份 spec doc 末尾的四个 “open questions”

**退出标准：** 我们将要实现的每个 interface 都在本 repo 中有已签核 schema。还不写代码。

---

## Phase 1 — MVP（约 6–8 周）

**目标：** 单个开发者可以 clone、install、启动 daemon、指向 Claude Code，并从零产出 prototype 和 deck。即使还不够 polish，也能用于真实工作。

### 范围

**包含：**
- Web app（Next.js 16，App Router）
  - chat pane · artifact tree · sandboxed iframe preview · export menu
  - skill picker · mode picker · design-system picker
  - **暂不包含** comment mode · **暂不包含** sliders · **暂不包含** template gallery UI
- Local daemon（Node）
  - `:7456` 上的 HTTP/SSE API
  - agent detection + cached results
  - skill registry（扫描三个 dirs，hot-reload）
  - artifact store（plain files + `history.jsonl`）
  - design-system resolver
  - export pipeline（仅 HTML + ZIP；PDF/PPTX 放到 Phase 2）
- Agent adapters
  - **`claude-code`** — native skill loading、streaming、surgical edit
  - **`api-fallback`** — direct Anthropic Messages API，minimal tool loop（只含 Read/Write/Edit）
- Repo 内置 skills
  - `saas-landing`（Prototype）
  - `magazine-web-ppt`（Deck，fork 自 guizang-ppt-skill）
- 可用 modes
  - **Prototype**（完整可用）
  - **Deck**（完整可用）
  - **Design System**（基础版：只从 text brief 生成；暂不支持 screenshot input）
  - **Template**（推迟到 Phase 2）
- Topologies
  - **A — fully local**（主路径）
  - **C — Vercel + direct API**（部分支持；无 daemon features）

**MVP 明确不包含：**
- Codex / Cursor / Gemini adapters
- Comment mode + sliders
- Template gallery + template skill
- 从 screenshot（vision）/ PDF / URL 生成 Design System
- PDF / PPTX export
- Topology B（Vercel + tunneled local daemon）
- Docker compose file
- Skill tests（`od skill test`）
- Auth / multi-user

### 按周拆解

| Week | 主题 | 具体交付物 |
|---|---|---|
| 1 | Scaffolding | pnpm workspaces（`apps/web`、`apps/daemon`、`e2e`）；Next.js 16 base；daemon CLI skeleton；CI green |
| 2 | Daemon core | HTTP/SSE API；project/conversation store；skill registry scanning；artifact store；design-system resolver 加载 `DESIGN.md` |
| 3 | Claude Code adapter | detection（PATH + `~/.claude/` probe）；用 `--output-format stream-json` spawn；JSON-lines → `AgentEvent` parser；streaming 到 daemon session；SIGTERM cancel |
| 4 | API-fallback adapter | Anthropic Messages streaming；minimal tool loop（Read/Write/Edit，root 到 artifact cwd）；与 skill prompt injection 集成 |
| 5 | Web UI — chat + file workspace | React state + daemon-backed project store；SSE client；chat pane；file workspace 反映 project files；skill picker |
| 6 | Web UI — preview + export | sandboxed iframe + hot reload；JSX → vendored React/Babel runtime；export ZIP；export self-contained HTML（inline CSS） |
| 7 | Default skills | port `guizang-ppt-skill`（不修改；添加 `od:` extension block）；编写 `saas-landing` skill；编写 1–2 个 DESIGN.md examples；skill author docs |
| 8 | Polish + dogfood | 端到端 dogfooding；performance pass（daemon <500ms cold start，first generation overhead <50ms）；修 bug；首个可发布 alpha |

### MVP 退出标准

1. `corepack enable && pnpm install && pnpm tools-dev run web` 可在干净 macOS 和 Linux + Node 24 上运行。
2. 安装 Claude Code 后：prototype + deck generation 端到端可用。
3. 未安装 Claude Code 时：API-fallback 可产出 prototypes（不产出 decks —— guizang-ppt-skill 需要 native skill loading）。
4. 用户可把 DESIGN.md 放到 project root，后续 generations 会遵守它。
5. 第三方可发布 skill repo；`od skill add <url>` 安装后可运行。
6. Artifacts 是 plain files；`git add ./.od/artifacts/` 和 `git log` 能讲出合理的故事。
7. Repo 中没有 Electron、Tauri 或 desktop packaging。

---

## Phase 2 — v1（MVP 后约 8 周）

**目标：** 达到 Open CoDesign 中 “UI-polish-heavy” 部分的功能对等 + multi-agent support + 完整四种 modes。

### 范围

**Agent adapters：**
- `codex`（P1）
- `cursor-agent`（P1）
- capability-driven UI gating（按 adapter 禁用 features）
- agent fallback chain

**UI：**
- **Comment mode**（点击元素 → surgical edit；仅当 `capabilities.surgicalEdit` 时启用）
- **Slider parameters**（live-tweak `od.parameters`）
- **Multi-frame preview**（desktop / tablet / phone）
- **Template gallery** UI with thumbnails
- **Design System editor**（split view：markdown ↔ sample-components preview）

**Skills：**
- Template skills：`stripe-ish-landing`、`linear-ish-docs`、`notion-ish-workspace`、`vercel-ish-pricing`
- 更多 Prototype skills：`dashboard`、`login-flow`、`empty-state-pack`、`pricing-page`
- 更多 Deck skills：`pitch-deck`、`product-demo-deck`
- Design System skills：`design-system-from-screenshot`、`design-system-refine`

**Modes：**
- **Template mode** 完整交付
- **Design System mode** 扩展：screenshot input、URL input

**Export：**
- PDF（Puppeteer）
- PPTX（pptxgenjs，由 `slides.json` 驱动）

**Deployment：**
- Docker compose file
- Topology B：Vercel web + tunneled local daemon
  - 提供 helper subcommand：`od daemon --expose`，使用 `cloudflared`（opt-in，有文档）

**Dev experience：**
- `od skill test` with cheap-model runs
- Skill author starter template：`od skill scaffold`

### v1 退出标准

1. 四种 modes 全部可用。
2. 三个 adapters 可用（Claude Code、Codex、Cursor Agent）；交付 fallback chain。
3. PDF + PPTX export 对至少 `magazine-web-ppt` + `pitch-deck` skills 可用。
4. `demo.open-design.dev` 上有 deployed example（Topology C）。
5. Skill author docs 已发布；至少一个 third-party skill 已提交。
6. Documentation site 从这些 spec docs 重建完成。

---

## Phase 3 — v2（v1 后约 12 周）

**目标：** ecosystem + robustness。

**范围草案（非绑定）：**
- Skill marketplace UI — searchable、categorized、一键安装
- Skill signing / checksums
- Gemini CLI + OpenCode + OpenClaw adapters（P2 tier）
- Windows support
- Collaborative mode（单 daemon 上的 multi-user session）
- “Freeze prototype as design system” action
- Figma export（沿 Open CoDesign post-1.0 线；他们交付后借鉴其方法）
- Telemetry（opt-in、self-hosted，绝不向中心服务 phoning home）
- Hosted SaaS offering（可选；full-local 仍是主路径）

v2 不作承诺。它是 v1 成立后的方向。

## Self-evolution track

较新的 Automations 方向在
[`specs/current/automation-self-evolution.md`](../specs/current/automation-self-evolution.md)
中跟踪。它把 routines、scheduled connector digests、live-artifact refreshes、Orbit、
memory extraction、skill creation、token compression 和 design-system
extraction 折叠进同一个 Automation template model。

Milestones：

| Milestone | Deliverable |
|---|---|
| SE0 | Source packets、automation templates、evolution proposals、memory tree nodes 和 compression reports 的 contracts。 |
| SE1 | Agents 会通过 daemon 和 BYOK/API-mode prompt resolver 实际消费的 editable memory tree。 |
| SE2 | 同时暴露在 web UI 和 `od automation` 中的 Automation template registry。 |
| SE3 | 带 review gates 的 design-system extraction 与 skill crystallization proposals。 |
| SE4 | Connector-driven ingestion into memory/design-system/skill proposals with provenance。 |
| SE5 | Optional token compression，带 before/after token reports 和 rollback-safe stored originals。 |

SE1 从现有 Markdown memory store 开始：`/api/memory/tree` 与
`od memory tree list/view/edit/move` 暴露派生的 editable tree，同时相同的 selected entries
继续喂给 daemon 与 BYOK/API-mode prompts。

SE2 还包含第一道 review gate：`/api/automation-proposals` 加
`od automation proposal list/get/apply/reject`，可以 review memory-node、skill
和 design-system proposals。Accepted memory proposals 写入 memory
tree；accepted skill 和 design-system proposals 会把已 review drafts 写入
用户拥有的 runtime roots。

SE3/SE4 通过 `/api/automation-ingestions`、
`/api/automation-source-packets` 和 `od automation source ingest/list/get`
开始闭合 source loop。Automations page 现在有 source-ingestion panel，可把粘贴的
connector/repo/artifact/chat context 转成 stored source packets，以及可 review 的
memory、skill 和 design-system proposals。每次 ingestion 可选择
off/balanced/aggressive compression，并记录 before/after token counts，同时保留原始 packet。

退出标准：一个 connected 或 uploaded source 能变成可 review 的 memory、skill 和
design-system proposals；accepted proposals 在 tree 中可见，并且无需额外 prompting
即可被后续 agent run 消费。

---

## Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Claude Code JSON stream format changes between versions | adapter breaks | pin version range；写 compatibility test；为每个 major release 保留 parser |
| Third-party agent CLIs don't expose enough to stream tool calls | UX degrades silently | capability flags + feature gates；在产品内记录 per-adapter limitations |
| `@mariozechner/pi-ai` 或类似 abstraction 变流行，contributors 要求支持 | scope creep | defer；如果需求真实存在，就作为 `api-fallback` 旁边的 another adapter 添加 |
| Vercel deploy（Topology B）因 tunnel setup 不稳定 | users can't try the cloud path | 把 Topology C（direct API）作为 always-works path；把 Topology B 文档化为 advanced |
| `guizang-ppt-skill` 或类似 upstream skill 改格式 | default deck skill breaks | 在默认安装中 pin git SHA；monitor upstream |
| DESIGN.md format 在 awesome-claude-design 中演化 | incompatibility | 跟踪 upstream；采纳变化；resolver 容忍缺失 sections |
| Anthropic 发布开源 Claude Design | differentiation collapses | moat 是 “uses user's existing agent”；Anthropic 不太可能交付这一点 |
| Skill security（malicious skill via `od skill add`） | user machine compromise | install-time warning；依赖 agent 自身 permission model；document best practices |

---

## Decision log（轻量）

随着推进，每个 material decision 记一行。示例 entries：

- 2026-04-24 — Use plain files + `history.jsonl` over SQLite for artifacts. *Why:* git-reviewable, no driver dependency, matches "skills are files" ethos.
- 2026-04-24 — Adopt `DESIGN.md` (awesome-claude-design) verbatim rather than inventing a new format. *Why:* 68 existing files are immediately compatible.
- 2026-04-24 — Do not ship an Electron / Tauri wrapper. *Why:* every minute on code-signing is a minute not on skills; `cc-switch` already solves the tray-icon use case.
- 2026-04-24 — Delegate the entire agent loop to the user's CLI. *Why:* reimplementing is worse than integrating; ecosystem compatibility beats control.

Decisions 会互相 supersede；保持 log append-only，并为每条记录日期。

---

## 读完本文后该做什么

如果你是 implementer：

1. 从头到尾阅读 [`spec.md`](spec.md)。
2. 快速浏览 [`architecture.md`](architecture.md)、[`skills-protocol.md`](skills-protocol.md)、[`agent-adapters.md`](agent-adapters.md)。
3. 挑战四个 “open questions” sections 中任何不合理之处；提交一行 decisions。
4. 补齐缺失的 Phase 0 deliverables（`docs/schemas/` 与 `docs/examples/` 文件）。
5. Scaffold monorepo 并开始 Week 1。

如果你在评估这个 concept：

1. 阅读 [`README.md`](../README.md) + [`spec.md`](spec.md) §1–3。
2. 查看 [`references.md`](references.md) 中的 comparison matrix。
3. 看 [`skills-protocol.md`](skills-protocol.md) §7 里的 worked example —— 那就是端到端体验。
