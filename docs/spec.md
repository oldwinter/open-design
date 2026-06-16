# Open Design — 产品规格

**状态：** Draft v0.1 · 2026-04-24
**范围：** 产品定义、场景、非目标、高层模块，以及相对 [Anthropic 的 Claude Design][cd] 和现有开源替代方案（[Open CoDesign][ocod]）的定位。

[cd]: https://x.com/claudeai/status/2045156267690213649
[ocod]: https://github.com/OpenCoworkAI/open-codesign
[guizang]: https://github.com/op7418/guizang-ppt-skill
[multica]: https://github.com/multica-ai/multica
[ccsw]: https://github.com/farion1231/cc-switch
[acd]: https://github.com/VoltAgent/awesome-claude-design
[piai]: https://github.com/badlogic/pi-mono/tree/main/packages/ai

其他文档：
- Architecture → [`architecture.md`](architecture.md)
- Skills protocol → [`skills-protocol.md`](skills-protocol.md)
- Agent adapters → [`agent-adapters.md`](agent-adapters.md)
- Modes → [`modes.md`](modes.md)
- Automations self-evolution → [`../specs/current/automation-self-evolution.md`](../specs/current/automation-self-evolution.md)
- Run reliability optimization plan → [`../specs/current/run-reliability-optimization-plan.md`](../specs/current/run-reliability-optimization-plan.md)
- References & credits → [`references.md`](references.md)
- Roadmap → [`roadmap.md`](roadmap.md)

---

## 1. 一句话产品定义

> **一个 Web app：通过编排用户机器上已经安装的 code agent，把自然语言 brief 转成可编辑、可预览的设计 artifact（prototype、deck、template、design system）。**

## 2. 核心判断（以及差异点）

| # | 判断 | [Anthropic Claude Design][cd] | [Open CoDesign][ocod] | OD |
|---|---|---|---|---|
| 1 | 产品在哪里运行 | 仅 claude.ai | 本地 Electron app | **Next.js web app + local daemon + desktop loop** — `pnpm tools-dev`、Vercel web deploy |
| 2 | 谁拥有 agent loop | Anthropic，闭源 | [Open CoDesign][ocod] 自身，通过 [`pi-ai`][piai] | **用户现有的 code agent CLI**（Claude Code、Codex、Devin for Terminal、Cursor Agent、Gemini CLI、OpenCode、OpenClaw）；direct Anthropic API 作为 fallback |
| 3 | “design skills” 是什么 | 专有内部工具 | 编进 app 的 TypeScript modules | **基于文件的 skills**，遵循 Claude Code 的 `SKILL.md` spec — 可 fork、可版本化、可共享、可用 symlink 安装 |
| 4 | design system 如何编写 | 隐含在 prompt 中 | N/A | **`DESIGN.md` 文件**，遵循 [awesome-claude-design][acd] 的 9-section schema |
| 5 | 扩展点 | 仅 Anthropic | 自定义 PR | **把文件夹放入 `skills/`** — 第三方可组合 |

差异化不是“又一个设计生成器”。它是一个 **integration shell，并明确拒绝拥有 agent、model 或 skill catalog** —— 三者都外部化且可插拔。

## 3. 目标用户

- **Indie devs / designers**：已经为某个 coding agent 付费，不想为了设计输出再买第二份 subscription 或第二个 model router。
- **Design system maintainers**：想把自己的系统 codify 成 `DESIGN.md`，并让每个 skill 自动遵守它。
- **Skill authors**：想发布一个 design skill（例如 “SaaS marketing page with glassmorphism”），并让它在任何兼容 agent 中运行，而无需移植。
- **自托管 AI tooling 的团队**：需要 Web deployment，而不是 Electron binary；也需要把 keys 留在自己的基础设施里。

## 4. 用户场景

### S1 — “给我一个 prototype”
用户打开 Web app，输入 *"Airbnb-style search page, use our internal design system"*，OD 选择 `prototype-skill`，解析用户的 `DESIGN.md`，把两个文件和 brief 一起派发给 Claude Code，将 tool calls 流式传入 UI，并在 iframe preview 中渲染生成的 HTML。用户点击一个元素、留下评论，agent 只重写那一块区域。

### S2 — “给我做一个 deck”
用户说 *"8-slide magazine-style pitch deck for my seed round"*。OD 路由到 `deck-skill`（[`guizang-ppt-skill`][guizang] 的 fork）。输出是单文件 HTML deck；preview 就是 deck 本身，支持方向键导航；可导出 PDF/PPTX。

### S3 — “从 template 开始”
用户从 gallery 选择 “SaaS landing — Stripe-ish”。Template 是预填好的 artifact bundle 加一个 `DESIGN.md` reference。Agent 只填内容；结构已经存在。这是最快的 mode，适合不想写 prompt 的用户。

### S4 — “建立我们的 design system”
用户上传 screenshot、brand guide PDF 或 Figma link。OD 运行 `design-system-skill`，产出符合 9-section format 的 `DESIGN.md`。之后每次生成都会引用这个文件 —— prototypes、decks、templates 都会继承这些 tokens。

### S5 — “让 design agent 自我演化”
用户连接 GitHub、Notion、Drive、Slack 或本地文件夹等 sources，然后选择 “Ingest into memory tree”、“Extract design system” 或 “Crystallize this run into a skill” 这样的 Automation template。OD canonicalize source，可选压缩，提出 memory / skill / design-system changes，并且只有在配置的 review policy 通过后才 apply。未来的 agent runs 会自动消费这些 accepted nodes。

前四个场景与 [`modes.md`](modes.md) 中的四种 modes 一一对应。
第五个场景是 [`automation-self-evolution.md`](../specs/current/automation-self-evolution.md) 描述的跨产品 loop。

## 5. 高层模块

```text
┌──────────────────────────────────────────────────────────────────┐
│                        Web App (Next.js)                         │
│  chat · artifact tree · iframe preview · comment mode · exports  │
└────────────┬─────────────────────────────────┬───────────────────┘
             │ HTTP + SSE (/api/chat)          │ HTTPS (BYOK direct)
┌────────────▼──────────────────┐     ┌────────▼─────────────────┐
│   Local Daemon (od daemon)   │     │   Anthropic Messages API │
│   · agent detection           │     │   (fallback when no CLI) │
│   · skill registry            │     └──────────────────────────┘
│   · artifact store            │
│   · design-system resolver    │
└────────────┬──────────────────┘
             │ spawn / stdio / SDK
┌────────────▼──────────────────────────────────────────────────┐
│  用户机器上的 Code Agent CLIs（一个或多个）：                 │
│  Claude Code · Codex · Cursor Agent · Gemini CLI · OpenCode   │
└───────────────────────────────────────────────────────────────┘
```

模块职责：

- **Web app** — chat UI、artifact tree、sandboxed iframe preview、comment mode、slider controls、export UI。无状态；所有 state 都在 daemon 中，或在 cloud deploy 的 browser IndexedDB 中。
- **Daemon** — 长驻本地进程。检测 agents、注册 skills、管理磁盘 artifacts、解析 active design system，并代理 REST/SSE requests。
- **Agent adapters** — 每个受支持 CLI 一个 adapter；见 [`agent-adapters.md`](agent-adapters.md)。
- **Skill registry** — 扫描 `~/.claude/skills/`、`./skills/` 和 `./.claude/skills/`；合并并暴露 typed catalog。
- **Artifact store** — daemon-managed storage，用于保存生成文件、version snapshots 和 per-artifact metadata。当前 data-path rules 不在本 draft 中指定；contributors 必须先阅读根目录 `AGENTS.md` → **Daemon data directory contract**，再记录或修改 storage paths。
- **Design-system resolver** — 加载 active `DESIGN.md`，并把它作为 skill context 注入。
- **Automations** — 编排 schedules、connectors、ingestion、memory updates、skill crystallization、design-system extraction、token compression 和 review gates 的 templates；source packets 从 Automations page、`/api/automation-ingestions` 和 `od automation source` 进入，而 evolution proposals 可通过 `/api/automation-proposals` 与 `od automation proposal` review。
- **Memory / evolution store** — Markdown-backed、可编辑的 memory tree，通过 Settings、`/api/memory/tree` 和 `od memory tree` 暴露；accepted tree nodes 会进入未来 daemon 与 BYOK/API-mode agent prompts，accepted proposals 可把已 review 的 memory、skill 和 design-system drafts 写入用户拥有的 runtime roots。
- **Preview renderer** — 对 JSX artifacts 使用带 vendored React + Babel 的 sandboxed iframe；对 HTML 使用普通 iframe；PDF 通过 daemon 的 headless Chrome 生成。
- **Export pipeline** — HTML（inlined）、PDF、PPTX、ZIP、Markdown。

## 6. 非目标

- **我们不内置 model router。** 如果用户的 agent 支持 20 个 providers，很好；如果只支持 Anthropic，那就是上限。我们不会在别人已有的 provider abstraction 上再叠一层自己的。
- **我们不交付 desktop app。** 没有 Electron，没有 Tauri。“local” story 是 Next.js dev server + Node daemon。如果有人想要 tray icon，那是 [`cc-switch`][ccsw] 的职责，不是我们的。
- **我们不重造 agent loop。** 没有自定义 tool-use harness，没有 bespoke context-manager。一切都走被检测到的 agent 的 native loop。
- **v1 不维护 skill marketplace。** Skills 是 git URLs 和本地 folders。可浏览 UI 是 v2。
- **我们不试图与 Figma 竞争。** 输出是 code（HTML/JSX）和 content（`DESIGN.md`、Markdown、PPTX），不是可编辑 vector canvases。
- **MVP 不实现 auth / billing / orgs。** 单用户、单机器。Multi-user 是 post-v1，并且可选。

## 7. 为什么不直接扩展 [Open CoDesign][ocod]？

我们认真考虑过。具体 blocker 是：

1. **它是 Electron。** 移植到 Web architecture 需要拆掉约 40% 的代码并重写 renderer/main IPC layer。到那一步已经是重写了。
2. **它拥有 agent loop。** [`pi-ai`][piai] 是很好的 provider abstraction，但这意味着每个 skill 都要按 `pi-ai` 的 tool-use format 编写，而不是按 Claude Code、Codex 或 Cursor Agent native 使用的格式。我们无法复用现有 skills，现有 skills 也无法复用我们。
3. **Skill format 是专有的。** 它的 12 个 skills 是编进 app 的 TypeScript modules。用户无法把 [`guizang-ppt-skill`][guizang] 放进去就运行；没有 `SKILL.md` loader。
4. **没有 design system abstraction。** Design tokens 活在 prompts 里，而不是一个可跨项目共享、可版本化的文件里。

我们会保留其中好的部分：comment mode、slider-emitted parameters、multi-frame preview、single-file HTML export、sandboxed iframe rendering。这些 UI 思路都与 agent layer 正交，完全值得借鉴。明确的 borrow list 见 [`references.md`](references.md)。

## 8. 相对 Anthropic 的 [Claude Design][cd] 的定位

我们**不是**要在功能上超过 [Claude Design][cd]。Claude Design 有 Anthropic 的 model team、内部 tooling 和我们无法匹配的 rendering pipeline。我们提供的是：

- **Self-hostable。** 跑在你的 laptop、你的 Vercel、你的 k8s。Secrets 永不离开。
- **BYO-agent。** 如果你已经在为 Cursor 付费，那就是你的 agent。如果公司已经标准化到 Codex，就用 Codex。不强制 Anthropic subscription。
- **Skills as files。** 放进 git。Fork。作为 repo 发给 teammates。不重建产品，也能运行团队自己的 branded deck skill。
- **Design systems as files。** `DESIGN.md` 是可以在 PR 中 review 的 artifact。Claude Design 的 “design system” 活在临时 chat 里。

简言之：Claude Design 是一个产品；OD 是一个 **substrate**。

## 9. v1 成功标准

- 一个开发者可以 `git clone && corepack enable && pnpm install && pnpm tools-dev run web`，指向自己的 Claude Code install，并在 5 分钟内产出一个 prototype。
- 第三方可以在独立 git repo 中编写 skill、发布它，并让用户运行 `od skill add <git-url>` 安装，无需修改 OD source。
- Design system author 可以写一个 `DESIGN.md`，让 OD 指向它，并让风格传播到 prototype / deck / template outputs。
- 部署到 Vercel 并搭配本地 daemon 可以端到端工作（daemon 通过 localhost tunnel 或用户提供的 URL reachable）。
- 将底层 agent 从 Claude Code 换成 Codex 不需要改任何 skill。

## 10. 开放问题（编码前解决）

- **Daemon ↔ Vercel bridge。** 我们要不要提供 reverse-tunnel helper（例如 `cloudflared`），要求用户自行配置，还是先退回到 “run locally for now”？当前倾向：MVP 暂缓，v1 加 helper。
- **Artifact versioning。** Git、SQLite，还是两者都要？[Open CoDesign][ocod] 使用 SQLite；更简单但更难 review。本 draft 不定义当前 daemon data path；根目录 `AGENTS.md` → **Daemon data directory contract** 是强制 source of truth。
- **非 Claude-Code agents 的 comment mode。** Claude Code 通过自己的 tool loop 支持 surgical edits。Codex 和 Gemini CLI 没那么优雅。对于能力较弱的 agents，是否降级为 “regenerate whole file”？倾向：是，在 adapter table 中清楚说明。
- **Skill trust model。** Skills 可以通过 agent shell out。至少应在 install 时警告，可能还要把 agent 的 cwd sandbox 到 project directory。若使用 Claude Code，其 permission mode 会处理；Codex 更宽松。需要 per-adapter note。

这些会作为 Phase 0 discovery items 放入 roadmap。
