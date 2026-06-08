# Modes

**父文档：** [`spec.md`](spec.md) · **同级文档：** [`architecture.md`](architecture.md) · [`skills-protocol.md`](skills-protocol.md) · [`agent-adapters.md`](agent-adapters.md)

OD 暴露四种用户可见的 mode。Mode 不是随意划分的；每一种都映射到一种明确的 **skill type**（见 [`skills-protocol.md`](skills-protocol.md) §4）和一种明确的 **workflow shape**。把它们分开，可以让我们按 mode 调整 UI affordance、导出 pipeline 和默认 skill。

| Mode | 你会得到什么 | 首次结果耗时 | Skill type |
|---|---|---|---|
| **Prototype** | 一个可编辑单屏（HTML/JSX） | ~60–120s | `prototype-skill` |
| **Deck** | 多页 HTML presentation | ~90–180s | `deck-skill` |
| **Template** | 一份精选 template 的填充副本 | ~20–40s | `template-skill` |
| **Design System** | 一份 `DESIGN.md` + 示例预览 | ~60–180s | `design-system-skill` |

Mode 可以组合：先运行 Design System，之后其他所有 mode 都读取它。Template 复用是最快路径；Prototype / Deck 是生成路径。

---

## 1. Prototype mode

### 目的

生成一个高保真 screen 或 flow。用户 brief → 在沙箱 iframe 中运行的 HTML/JSX。

### UX flow

```text
[ mode picker: Prototype ]
[ skill picker: saas-landing | dashboard | login-flow | ... ]
[ inputs form (if skill declares od.inputs) ]
[ free-text prompt box ]
[ generate ]
    ↓
[ streaming tool-call feed · artifact tree · preview iframe ]
    ↓
[ comment mode (if adapter supports surgicalEdit) ]
[ parameter sliders (if skill declares od.parameters) ]
[ export: html · pdf · zip ]
```

### Inputs

- Skill selection（默认使用第一个匹配 trigger 的 skill）
- Skill 声明的可选结构化 inputs（例如 `product_name`、`has_pricing`）
- 可选 free-text prompt
- 当前激活的 DESIGN.md（如果 skill 要求，会自动注入）

### Outputs

- `index.html`（主输出）或 `Prototype.jsx`（如果 skill 输出 JSX）
- `assets/`（skill 生成的 images、fonts）
- `artifact.json` metadata

### Preview

- HTML → `<iframe sandbox="allow-scripts" srcdoc>`，写入时 hot reload。
- JSX → 使用 vendored React 18 + Babel standalone 的 iframe。
- 多 frame 切换：desktop / tablet / phone 宽度（借鉴 Open CoDesign）。

### Refinement surfaces

- **Chat：** free-text，例如 “move the CTA above the fold.”
- **Comment mode：** 点击元素 → popover → “make this card glassmorphic.” 仅当 `capabilities.surgicalEdit === true` 时可用。
- **Sliders：** skill 声明的任何 `od.parameters`。移动 slider 只带参数值重新 prompt，不做完整 regeneration。

### Default v1 skills

- `saas-landing`
- `dashboard`
- `login-flow`
- `empty-state-pack`
- `pricing-page`

### Failure modes

- Skill 需要 DESIGN.md 但当前没有设置 → UI 提示创建一个（提供 Design System mode）。
- Agent 在生成中途超时 → 保留 partial artifact；若 adapter 支持则显示 “resume” 按钮，否则显示 “regenerate”。
- Preview iframe 渲染失败（JSX parse error）→ 显示 raw code 并附 error annotation。

---

## 2. Deck mode

### 目的

生成多页 presentation。可以是 sliding、magazine、minimal、dark 等风格，只要 skill 支持即可。

### UX flow

与 Prototype 相同，但有这些差异：

- Skill picker 只显示 `mode: deck` 的 skills。
- Preview 渲染完整 deck，支持 arrow-key navigation（keyboard、scrollwheel、touch），导航由 deck skill 自己负责。
- Export 把 `pptx` 和 `pdf` 作为 first-class 选项。

### Inputs

- Slide count（skill 通常声明 `od.inputs.slide_count`）
- Topic / outline（free text 或 structured）
- Theme preset（skill-defined enum，例如 `editorial | minimal | brutalist`）
- DESIGN.md（可选；许多 deck skill 有自己的 theme system，因此不需要）

### Outputs

- `index.html`：单文件、自包含 deck
- `slides.json`：可选的 machine-readable outline，供 PPTX export 使用
- `assets/`：images、fonts

### Preview

就是一个加载 `index.html` 的 iframe。Navigation 由 skill 自己负责。我们只加一个包含 slide count 和 keyboard hints 的最小 overlay。

### Refinement

- **Chat：** “add a slide about pricing between 4 and 5.”
- **Per-slide comment：** 点击 slide → popover → “make this more data-heavy.” 转换为对该 slide section 的 surgical edit。
- **Theme slider：** 如果 skill 暴露 theme parameters（例如 `accent_hue`），生成后也可调节。

### Default v1 skills

- `magazine-web-ppt`（[guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) 的 fork）
- `pitch-deck`（minimal，面向 investor）
- `product-demo-deck`（screenshot-heavy）

### Failure modes

- Agent 生成的 deck 缺少 `slides.json` → PPTX export 回退到 page-capture（输出更粗糙）。按 skill 记录说明。
- Slides 过多 → 小 context agents 会爆上下文。Skill 在 front-matter 声明 `max_slides`；生成前给出 warning。

---

## 3. Template mode

### 目的

完全跳过 generation。使用审美已经验证过的精选 templates，Agent 只个性化内容。这是最快路径，也提供最高下限，适合不想写 prompt 的用户。

### UX flow

```text
[ template gallery: cards showing thumbnail + name + inferred design system ]
[ pick one ]
[ inputs form: what to personalize (brand name, content blocks, links) ]
[ generate ]
    ↓
[ preview with populated content ]
[ optional: "restyle to match my DESIGN.md" button ]
[ export ]
```

### Inputs

- Template selection（来自内置 gallery + 用户添加的 templates）
- Structured content inputs（template 声明需要填充哪些 slots）
- 可选：re-skin 到目标 DESIGN.md

### Outputs

与 Prototype mode 形态相同；template 只是更高质量的 starting artifact。

### How it differs from Prototype

- **Agent 不做 design decisions。** Layout、spacing、typography 都已经预先决定。
- **更快。** 通常 20–40s，因为 agent 只填文本。
- **上限更低。** 想跳出脚本之外，就要回退到 Prototype mode。

### Template format

Template 是一种特殊 skill（`mode: template`），布局如下：

```text
<template-root>/
├── SKILL.md                   # declares inputs; workflow says "copy and fill"
├── preview.png                # gallery thumbnail
├── assets/
│   └── base.html              # the template HTML with {{ handlebars }} slots
└── references/
    └── DESIGN.md              # template's own inferred design system (for re-skin)
```

### Default v1 templates

- `stripe-ish-landing`
- `linear-ish-docs`
- `notion-ish-workspace`
- `vercel-ish-pricing`
- （名称只是向灵感来源致意，不是复制；我们不发布侵权 clones。）

### Failure modes

- 用户提供的内容违反 template constraints（例如 heading 太长）→ agent 自动截断，并在 artifact metadata 中给 warning。
- Re-skin 到 DESIGN.md 后效果变差 → 保留原件；re-skin 是 non-destructive。

---

## 4. Design System mode

### 目的

产出 `DESIGN.md` 文件。这是 *meta* mode：输出会成为其他 mode 的输入。

### UX flow

```text
[ choose input source ]
  → option A: screenshot upload
  → option B: brand guide PDF upload
  → option C: public URL ("analyze airbnb.com")
  → option D: free-text brief ("warm editorial, terracotta accent...")
[ skill picker: design-system-from-screenshot | ... ]
[ generate ]
    ↓
[ preview: rendered DESIGN.md + sample components demo ]
[ edit the DESIGN.md inline or via chat ]
    ↓
[ "Set as active design system" button → writes to ./DESIGN.md ]
```

### Inputs

- 截图、PDF、URL、free-text brief 之一
- 可选：用于 refine 的现有 DESIGN.md

### Outputs

- `DESIGN.md`：canonical 9-section format
- `preview.html`：用新 design system 渲染的 sample components page（hero、buttons、card、form、table）
- `tokens.json`：可选，color / typography tokens 的 machine-readable 版本，供想导入代码的 dev 使用

### Preview

Split view：

- 左侧：Markdown editor 中可编辑的 DESIGN.md
- 右侧：渲染 sample components 的 `preview.html`

### 9-section DESIGN.md format（来自 [awesome-claude-design](https://github.com/VoltAgent/awesome-claude-design)）

1. Visual Theme & Atmosphere
2. Color Palette & Roles
3. Typography Rules
4. Component Stylings
5. Layout Principles
6. Depth & Elevation
7. Do's and Don'ts
8. Responsive Behavior
9. Agent Prompt Guide

这个格式不是我们发明的。我们采用它，是因为 awesome-claude-design 已经发布了 68 份，能立即获得生态兼容性。

### Default v1 skills

- `design-system-from-screenshot`（需要 vision-capable agent）
- `design-system-from-brief`（text-only）
- `design-system-refine`（输入现有 DESIGN.md + notes）

### Failure modes

- 上传 screenshot，但当前 agent 没有 vision（例如较旧的 Codex）→ 建议切换 agent，或回退到 “describe the screenshot in text.”
- 设置为 active 时 DESIGN.md parse errors → validator 标出哪个 section malformed；用户编辑后重试。

---

## 5. Mode selection & heuristics

### Explicit

用户从顶层导航选择 mode。每个 mode 只显示兼容的 skills。

### Inferred（chat-first flow）

如果用户没有选择 mode，只是直接输入 prompt：

```text
prompt contains "slide" | "deck" | "ppt" | "presentation" → Deck
prompt contains "design system" | "tokens" | "brand"     → Design System
prompt contains "template" + named template              → Template
else                                                      → Prototype
```

Inference 只是 hint；用户可以在 artifact page 的 mode picker 中覆盖它。

## 6. Cross-mode composition examples

- **Design System → Prototype：** 先运行一次 Design System mode；之后每次 Prototype / Deck / Template run 都从 `./DESIGN.md` 读取它。
- **Template → Prototype：** 选一个 template，导出为 starting artifact，再在 Prototype mode 中重新打开做 free-form edits。
- **Prototype → Design System：** 如果生成的 prototype 有很好的审美方向，我们计划在 v1.5 加一个 “freeze as design system” action。MVP 不包含。

## 7. Keyboard & UI affordances（cross-mode）

| Action | Shortcut | Available in |
|---|---|---|
| Generate | ⌘/Ctrl+Enter | all |
| Cancel run | Esc | all |
| Toggle comment mode | ⌘/Ctrl+; | Prototype, Deck |
| Cycle preview frame | ⌘/Ctrl+\ | Prototype |
| Export | ⌘/Ctrl+E | all |
| Set active design system | n/a (button) | Design System |

## 8. What mode ≠

Modes 是 **workflow containers**，不是 product subscriptions 或 pricing tiers。它们都运行在同一套基础设施、同一套 skills protocol、同一套 agent adapters 上。用户可以在 mode 之间自由切换，零额外成本。

## 9. Out of scope for MVP

- Hybrid modes（例如 “deck with a prototype-screen embedded”）
- Auto-mode-switching mid-session
- Collaborative multi-user mode
- Mode 自身的 mobile-first layout（MVP 中 Web UI 仅面向 desktop）
