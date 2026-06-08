# References

**父文档：** [`spec.md`](spec.md)

本 spec 依赖的外部项目清单。每个条目回答三个问题：它是什么、我们借鉴什么、我们刻意不采用什么。

---

## Primary references

### [Anthropic Claude Design][cd]
- **URL:** [claude.ai/design][cd] · [release announcement](https://www.infoq.cn/article/TH0QVHpvVGZ7VP3hAEmm) · [ifanr review](https://www.ifanr.com/1662860)

[cd]: https://x.com/claudeai/status/2045156267690213649
- **它是什么：** Anthropic 的闭源 AI design product。2026-04-17 发布。由 Opus 4.7 驱动。仅 Web（claude.ai）。可生成 prototypes、wireframes、decks、marketing pages，以及带 voice/video/3D/shaders 的复杂 prototypes。
- **为什么重要：** 它定义了这个 category。它的 viral moment（第一周约 6000 万 X impressions）证明了市场需求。
- **我们借鉴什么：** 高层 value prop —— “natural language → editable visual design”。Modes（prototype、deck、marketing）的功能灵感。围绕 inline editing 和 custom sliders 的 UI 思路。
- **我们不采用什么：** 闭源、Anthropic-only models、不可 self-hosting、仅付费 tiers（Pro/Max/Team/Enterprise）。我们不试图成为 drop-in clone；我们是同一 category 的 **open substrate**。

### [Open CoDesign][ocod] (OpenCoworkAI)
- **Repo:** [github.com/OpenCoworkAI/open-codesign][ocod]
- **Site:** [opencoworkai.github.io/open-codesign](https://opencoworkai.github.io/open-codesign/)
- **它是什么：** 主要的开源 Claude Design 替代品。MIT license。Electron desktop app。React 19 + Vite + Tailwind v4。用 [`@mariozechner/pi-ai`][piai] 做 multi-provider。SQLite 保存 version history。12 个内置 design skill modules。HTML/JSX sandboxed iframe preview。可导出 HTML/PDF/PPTX/ZIP/MD。15 个 templates。Comment mode + slider controls + multi-frame preview。

[ocod]: https://github.com/OpenCoworkAI/open-codesign
[piai]: https://github.com/badlogic/pi-mono/tree/main/packages/ai
- **为什么重要：** 直接竞争者；与我们要构建的东西重叠最多。
- **我们借鉴什么：**
  - UI concepts：**comment mode**（click-to-pin element edits）、**tweak sliders**（agent-emitted parameters）、**multi-frame preview**（desktop/tablet/phone）。
  - Sandboxed iframe preview（`<iframe sandbox="allow-scripts">`，JSX 使用 vendored React 18 + Babel standalone）。
  - Export pipeline shape（HTML/PDF/PPTX/ZIP/MD）。
- **我们不采用什么：**
  - **Electron** — 我们改走 Next.js web app（可本地运行，也可 deploy 到 Vercel）。
  - **Bundled agent on `pi-ai`** — 我们委托给用户已有 CLI。
  - **Proprietary skill format**（编进 app 的 TypeScript modules）— 我们使用 Claude Code 的 `SKILL.md`，第三方 skills 可直接放入。
  - **SQLite for artifacts** — 使用 plain files + `.jsonl` history，让 git 自然追踪。
  - **只聚焦 UI panels** — 我们加入 Design System mode，并把 `DESIGN.md` 作为 first-class。

### [multica][multica] (multica-ai)
- **Repo:** [github.com/multica-ai/multica][multica]
- **Docs:** [multica.ai/docs/skills](https://multica.ai/docs/skills)

[multica]: https://github.com/multica-ai/multica
- **它是什么：** 开源 “managed agents platform”。Frontend：Next.js 16。Backend：Go + Chi + WebSocket。DB：PostgreSQL + pgvector。**Local daemon 会自动检测 PATH 上的 CLIs：Claude Code、Codex、OpenClaw、OpenCode、Hermes、Gemini、Pi、Cursor Agent。** 通过 web board view 分配工作；agents 执行；WebSocket stream progress。
- **为什么重要：** 他们已经解决了 “detect and wrap local code agents” 问题。
- **我们借鉴什么：**
  - **PATH-scan + config-dir probe detection** 策略。
  - **Local daemon + WebSocket** topology（daemon 在用户机器上，web client 很薄）。
  - Agent catalog（我们的 P0–P2 清单与它们非常接近）。
  - Workspace/local skill import 与 agent-scoped skill attachment model。
- **我们不采用什么：**
  - Go backend + PostgreSQL — 对我们的范围过重；Node daemon + filesystem 足够。
  - Team / board / issue-assignment model — 不是我们的 domain。
  - pgvector — MVP 不做 embedding。

### [OpenHuman][openhuman] (tinyhumansai)
- **Repo:** [github.com/tinyhumansai/openhuman][openhuman]

[openhuman]: https://github.com/tinyhumansai/openhuman
- **它是什么：** 开源 personal AI assistant，带大量 integrations、自动抓取到 memory tree、本地可编辑 knowledge，以及 LLM 使用前的 TokenJuice 风格 compression layer。
- **为什么重要：** 它是 “connect sources once, then the agent wakes up with compressed context already available” 最清晰的 reference。
- **我们借鉴什么：**
  - Connector-driven ingestion 是 first-class loop，而不是用户每次重写的 prompt。
  - Editable local memory tree，而不是 opaque vector-only recall。
  - Token compression 作为 agent context injection 前的可选 stage。
- **我们不采用什么：**
  - General personal-assistant scope、messaging/voice/meeting participation，以及 bundled subscription/model routing。

### [Hermes Agent][hermes] (Nous Research)
- **Repo:** [github.com/nousresearch/hermes-agent][hermes]
- **Docs:** [hermes-agent.nousresearch.com/docs/skills](https://hermes-agent.nousresearch.com/docs/skills)

[hermes]: https://github.com/nousresearch/hermes-agent
- **它是什么：** Self-improving agent，具备 persistent memory、从 experience 创建 skills、使用中改进 skill、scheduled automations，以及大型 skill hub。
- **为什么重要：** 它把 “agent learns from work” 变成 product loop，而不是副作用。
- **我们借鉴什么：**
  - Closed learning loop：experience -> memory or skill proposal -> future run。
  - 可跨 surfaces delivery 的 scheduled automations。
  - 显式 compression 与 usage inspection controls。
- **我们不采用什么：**
  - 拥有用户的整个 agent runtime、messaging gateway 或 model/provider layer。

### [GenericAgent][genericagent] (lsdefine)
- **Repo:** [github.com/lsdefine/GenericAgent][genericagent]

[genericagent]: https://github.com/lsdefine/GenericAgent
- **它是什么：** Minimal self-evolving autonomous agent framework，会把已解决任务 crystallize 成可直接复用的 personal skill tree。
- **为什么重要：** 它命名了 OD 在设计工作中需要的核心 loop：solve once、verify、save the execution path，然后下次用更少 context recall。
- **我们借鉴什么：**
  - 从 successful tasks 中 skill crystallization。
  - Layered memory 与 direct recall，用于减少 prompt size。
  - 偏好小型 composable primitives，而不是 heavy agent framework。
- **我们不采用什么：**
  - 宽泛且不可控的 desktop authority。OD 会让 daemon、connector、filesystem 和 review gates 保持显式。

### [cc-switch][ccsw] (farion1231)
- **Repo:** [github.com/farion1231/cc-switch][ccsw]

[ccsw]: https://github.com/farion1231/cc-switch
- **它是什么：** 用于管理五个 CLI tools（Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw）的 Tauri desktop app。Provider management、MCP server config、skills install、session browsing。SQLite 位于 `~/.cc-switch/cc-switch.db`。**Skills dir 位于 `~/.cc-switch/skills/`，并 symlink 到各 agent 的 config dir。** 50+ provider presets。
- **为什么重要：** 它准确展示了如何与多个 code-agent CLIs 共存而不踩它们的 config。
- **我们借鉴什么：**
  - **Symlink-based skill distribution。** Canonical skill location + symlinks to each agent's skills dir。
  - Per-agent config dir locations（`~/.claude/`、`~/.codex/` 等）。
  - “Provider presets” 思路 —— 交付一份 curated list，让用户不用手填 OpenAI-compatible relays 的 endpoint URLs。
- **我们不采用什么：**
  - Tauri / desktop app — 不是我们的形态。
  - Provider-switching as core feature — 交给底层 agent。如果用户想在 Claude Code 内切换 providers，就用 Claude Code 的 config，而不是我们。
  - Tray icon / system integration — out of scope。

### [awesome-claude-design][acd] (VoltAgent)
- **Repo:** [github.com/VoltAgent/awesome-claude-design][acd]

[acd]: https://github.com/VoltAgent/awesome-claude-design
- **Ecosystem:** 68 个面向具名品牌的 DESIGN.md 文件。Referenced schema 有 **9 个标准 sections**：Visual Theme & Atmosphere、Color Palette & Roles、Typography Rules、Component Stylings、Layout Principles、Depth & Elevation、Do's and Don'ts、Responsive Behavior、Agent Prompt Guide。
- **相关 URLs:** claude.ai/design、getdesign.md、Discord community
- **为什么重要：** 它定义了 AI agents 的事实可移植 design-system format。
- **我们借鉴什么：**
  - **完整 `DESIGN.md` format，保持不变。** 我们采用它们的 9-section schema 作为 OD 的 canonical design-system format。
  - Ecosystem compatibility：它们的 68 个 DESIGN.md 文件都可以作为 OD active design system 开箱使用。
- **我们不采用什么：**
  - 它们 curated list 本身 — 我们不 fork 这 68 个文件；只 reference upstream。
  - 它们的 Discord / community layer — 不是我们的产品。

### [guizang-ppt-skill][guizang] (op7418)
- **Repo:** [github.com/op7418/guizang-ppt-skill][guizang]

[guizang]: https://github.com/op7418/guizang-ppt-skill
- **它是什么：** 一个 Claude Code skill，用于生成 magazine-style、horizontal-swipe web decks。结构：`SKILL.md` + `assets/template.html` + `references/{components,layouts,themes,checklist}.md`。6-step workflow。输出带 embedded CSS/WebGL 的 single-file HTML。支持 keyboard/scroll/touch navigation。
- **为什么重要：** 高质量 Claude skill 的 reference implementation，也是我们的 default deck skill。
- **我们借鉴什么：**
  - **整个 skill，保持不改。** 它是我们的默认 v1 `deck-skill`。用户运行 `od skill add https://github.com/op7418/guizang-ppt-skill` 后即可使用。
  - Skill directory convention（`assets/` + `references/` + `SKILL.md`）作为我们为 skill authors 记录的 pattern。
  - “6-step workflow + quality-checklist rubric” pattern，用于编写新 skills。
- **我们不采用什么：** 没有 —— 这是纯复用。只有在想暴露 theme sliders 时，我们才给它的 front-matter 添加 `od:` block；没有这个 block，skill 也能运行。

---

## Secondary references（format / protocol / UI ideas）

| Project | Relevance |
|---|---|
| [Claude Code skills docs](https://docs.anthropic.com/) | 我们采用的 `SKILL.md` format 来源 |
| [Cursor .cursorrules](https://docs.cursor.com/) | 为 Cursor Agent adapter 如何注入 skill context 提供参考 |
| [Reveal.js](https://revealjs.com/) / [Marp](https://marp.app/) | Deck HTML navigation patterns 的参考 |
| [Shadcn/ui](https://ui.shadcn.com/) | Web UI shell 可能采用的 component library |
| [Vercel AI SDK](https://sdk.vercel.ai/) | API-fallback adapter 的 streaming primitives |
| [Puppeteer](https://pptr.dev/) | PDF export engine |
| [pptxgenjs](https://gitbrent.github.io/PptxGenJS/) | PPTX export engine |
| [chokidar](https://github.com/paulmillr/chokidar) | Skill / artifact hot-reload 的 filesystem watching |

---

## Compatibility & differentiation matrix

| Dimension | [Claude Design][cd] | [Open CoDesign][ocod] | [multica][multica] | [cc-switch][ccsw] | **OD** |
|---|---|---|---|---|---|
| Open source | ❌ | ✅ | ✅ | ✅ | ✅ |
| Primary form factor | Web（hosted） | Electron | Web + Go daemon | Tauri | **Next.js web + Node daemon** |
| Vercel-deployable | ❌ | ❌ | ❌ | ❌ | **✅** |
| Runs local-only | ❌ | ✅ | ✅ | ✅ | **✅** |
| Generates design artifacts | ✅ | ✅ | ❌（general coding） | ❌ | **✅** |
| Uses existing code agent | —（owns it） | ❌ | ✅ | ✅ | **✅** |
| Supports Claude Code skills (`SKILL.md`) | — | ❌ | ✅ | ✅ | **✅** |
| `DESIGN.md` as first-class | ❌ | ❌ | — | — | **✅** |
| Deck mode / PPTX export | ✅ | ✅ | ❌ | ❌ | **✅（via skill）** |
| Template gallery | ✅ | ✅（15） | ❌ | ❌ | **✅** |
| Design-system authoring mode | ❌ | ❌ | ❌ | ❌ | **✅** |

OD 点亮而其他项目没有点亮的两个交叉点是：**Vercel-deployable + design-system authoring**，以及 **uses existing code agent + first-class DESIGN.md**。这就是 niche。

---

## 我们明确不借鉴什么（以及原因）

- **Desktop packaging**（Electron / Tauri）。花在 code-signing 上的每一分钟，都是没花在 skills 上的一分钟。如果用户想要 tray icon，[`cc-switch`][ccsw] 已经解决了 —— 两者都装即可。
- **SQLite for artifacts**（来自 [Open CoDesign][ocod] 和 [cc-switch][ccsw]）。Plain files + JSONL history 可在 git 中 review，极易 portable，也匹配 “skills are files” 的 ethos。
- **Bundled model router**（[Open CoDesign][ocod] 的 [`pi-ai`][piai]）。用户的 code agent 已经负责 routing。两个 routers 比一个更糟。
- **PostgreSQL + pgvector**（来自 [multica][multica]）。MVP 不做 embedding。以后要做时，单用户规模下 SQLite + `sqlite-vec` 也足够。
- **Board / issue model**（来自 [multica][multica]）。不符合 design tool 的品牌定位。

这些 “don'ts” 让 MVP 能在 6–8 周内实现。

---

## Living references

本文档会持续维护。新增 adapter 或从新的 upstream 借鉴 pattern 时，请按相同的三问格式添加到这里。当 upstream license 或方向发生实质变化时，也在这里标记，并从 [`spec.md`](spec.md) cross-link。
