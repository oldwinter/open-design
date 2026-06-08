---
name: stitch-design-taste
description: |
  面向 Google Stitch 的 Semantic Design System Skill。生成 agent-friendly 的 DESIGN.md 文件，用严格 typography、校准色彩、非对称布局、持续微动效和硬件加速性能来强制执行高级、反 generic 的 UI 标准。
triggers:
  - "stitch design taste"
  - "generate DESIGN.md"
  - "semantic design system"
  - "premium design system"
od:
  mode: design-system
  surface: web
  platform: desktop
  scenario: design
  category: design-systems
  upstream: "https://github.com/Leonxlnx/taste-skill"
  preview:
    type: markdown
  design_system:
    requires: false
  craft:
    requires:
      - typography
      - color
      - anti-ai-slop
  example_prompt: |
    Generate an agent-friendly DESIGN.md for this product with premium anti-generic UI standards, typography, color, layout, motion, and prompt guidance.
---


# Stitch Design Taste — Semantic Design System Skill

## Overview
此 skill 会生成针对 Google Stitch screen generation 优化的 `DESIGN.md` 文件。它把经过实战验证的 anti-slop frontend engineering directives 转译为 Stitch 原生的 semantic design language：描述性的 natural-language rules，配合精确 values，让 Stitch 的 AI agent 能理解并产出高级、非 generic 的界面。

生成的 `DESIGN.md` 是 prompt Stitch 生成新 screens 的 **single source of truth**，确保输出与一套经过策展、high-agency 的 design language 对齐。Stitch 通过 **"Visual Descriptions"** 理解设计，并由具体 color values、typography specs 和 component behaviors 支撑。

## Prerequisites
- 通过 [labs.google.com/stitch](https://labs.google.com/stitch) 访问 Google Stitch
- 可选：用于和 Cursor、Antigravity 或 Gemini CLI 做 programmatic integration 的 Stitch MCP Server

## The Goal
生成一个 `DESIGN.md` 文件，编码以下内容：
1. **Visual atmosphere** — 气质、density 和 design philosophy
2. **Color calibration** — neutrals、accents，以及带 hex codes 的 banned patterns
3. **Typographic architecture** — font stacks、scale hierarchy 和 anti-patterns
4. **Component behaviors** — buttons、cards、inputs 及其 interaction states
5. **Layout principles** — grid systems、spacing philosophy、responsive strategy
6. **Motion philosophy** — animation engine specs、spring physics、perpetual micro-interactions
7. **Anti-patterns** — 明确列出被禁止的 AI design clichés

## Analysis & Synthesis Instructions

### 1. Define the Atmosphere
评估目标项目意图。使用 taste spectrum 中有表现力的 adjectives：
- **Density:** "Art Gallery Airy" (1-3) -> "Daily App Balanced" (4-7) -> "Cockpit Dense" (8-10)
- **Variance:** "Predictable Symmetric" (1-3) -> "Offset Asymmetric" (4-7) -> "Artsy Chaotic" (8-10)
- **Motion:** "Static Restrained" (1-3) -> "Fluid CSS" (4-7) -> "Cinematic Choreography" (8-10)

默认 baseline：Variance 8、Motion 6、Density 4。根据用户描述的 vibe 动态调整。

### 2. Map the Color Palette
每个 color 都提供：**Descriptive Name** + **Hex Code** + **Functional Role**。

**Mandatory constraints:**
- 最多 1 个 accent color。Saturation 低于 80%
- 严格禁用 "AI Purple/Blue Neon" 美学：不要 purple button glows，不要 neon gradients
- 使用绝对 neutral bases（Zinc/Slate），配高对比单一 accent
- 整个输出只使用一套 palette；不要 warm/cool gray 来回波动
- 绝不使用 pure black（`#000000`）；改用 Off-Black、Zinc-950 或 Charcoal

### 3. Establish Typography Rules
- **Display/Headlines:** Track-tight、受控 scale。不要吼叫。Hierarchy 通过 weight 和 color 建立，而不是只靠巨大尺寸
- **Body:** Relaxed leading，每行最多 65 characters
- **Font Selection:** `Inter` 在 premium/creative contexts 中被禁用。强制使用有独特气质的字体：`Geist`、`Outfit`、`Cabinet Grotesk` 或 `Satoshi`
- **Serif Ban:** Generic serif fonts（`Times New Roman`、`Georgia`、`Garamond`、`Palatino`）被禁用。如果 editorial/creative contexts 需要 serif，只能使用 distinctive modern serifs：`Fraunces`、`Gambarino`、`Editorial New` 或 `Instrument Serif`。Dashboard 或 software UIs 中一律禁用 serif
- **Dashboard Constraint:** 只使用 Sans-Serif pairings（`Geist` + `Geist Mono` 或 `Satoshi` + `JetBrains Mono`）
- **High-Density Override:** 当 density 超过 7，所有数字必须使用 Monospace

### 4. Define the Hero Section
Hero 是第一印象，必须有创意、醒目，绝不 generic：
- **Inline Image Typography:** 在 headline 的词与词或字母之间直接嵌入小型、上下文相关的照片或视觉元素。图片以 type-height inline 放置，带圆角，作为视觉标点。这是标志性创意技法
- **No Overlapping:** Text 绝不能与 images 或其他 text 重叠。每个元素占据自己的干净空间区域
- **No Filler Text:** "Scroll to explore"、"Swipe down"、scroll arrow icons、bouncing chevrons 都是 BANNED。内容应该自然吸引用户继续
- **Asymmetric Structure:** 当 variance 超过 4 时，Centered Hero layouts 被禁用
- **CTA Restraint:** 最多一个 primary CTA。不要 secondary "Learn more" links

### 5. Describe Component Stylings
对每类 component，描述 shape、color、shadow depth 和 interaction behavior：
- **Buttons:** Active state 有 tactile push feedback。不要 neon outer glows。不要 custom mouse cursors
- **Cards:** 只有当 elevation 传达 hierarchy 时才使用。Shadows 应 tint 到 background hue。高密度 layouts 中，用 border-top dividers 或 negative space 代替 cards
- **Inputs/Forms:** Label 在 input 上方，helper text 可选，error text 在下方。保持标准 gap spacing
- **Loading States:** Skeletal loaders 匹配 layout dimensions；不要 generic circular spinners
- **Empty States:** 用组合式 compositions 指示如何填充数据
- **Error States:** 清晰、inline 的 error reporting

### 6. Define Layout Principles
- 不要让元素重叠；每个元素占据自己的清晰空间区域。不要用 absolute-positioned content stacking
- 当 variance 超过 4 时，Centered Hero sections 被禁用；强制 Split Screen、Left-Aligned 或 Asymmetric Whitespace
- 禁用 generic "3 equal cards horizontally" feature row；使用 2-column Zig-Zag、asymmetric grid 或 horizontal scroll
- CSS Grid 优先于 Flexbox math；绝不要使用 `calc()` percentage hacks
- 使用 max-width constraints 约束 layouts（例如 1400px centered）
- Full-height sections 必须使用 `min-h-[100dvh]`；绝不要 `h-screen`（iOS Safari 会灾难性跳动）

### 7. Define Responsive Rules
每个 design 都必须适配所有 viewports：
- **Mobile-First Collapse (< 768px):** 所有 multi-column layouts 折叠为单列。没有例外
- **No Horizontal Scroll:** Mobile 上的 horizontal overflow 是严重失败
- **Typography Scaling:** Headlines 通过 `clamp()` 缩放。Body text 最小 `1rem`/`14px`
- **Touch Targets:** 所有 interactive elements 至少 `44px` tap target
- **Image Behavior:** Inline typography images（词间照片）在 mobile 上堆叠到 headline 下方
- **Navigation:** Desktop horizontal nav 折叠为干净的 mobile menu
- **Spacing:** Vertical section gaps 按比例缩小（`clamp(3rem, 8vw, 6rem)`）

### 8. Encode Motion Philosophy
- **Spring Physics default:** `stiffness: 100, damping: 20`，提供 premium、带重量的手感。不要 linear easing
- **Perpetual Micro-Interactions:** 每个 active component 都应该有 infinite loop state（Pulse、Typewriter、Float、Shimmer）
- **Staggered Orchestration:** Lists 绝不要 instant mount；用 cascade delays 做 waterfall reveals
- **Performance:** 只通过 `transform` 和 `opacity` 动画化。绝不要动画化 `top`、`left`、`width`、`height`。Grain/noise filters 只放在 fixed pseudo-elements 上

### 9. List Anti-Patterns (AI Tells)
在 DESIGN.md 中把这些编码为明确的 "NEVER DO" rules：
- No emojis anywhere
- No `Inter` font
- No generic serif fonts（`Times New Roman`、`Georgia`、`Garamond`）；只有在需要时才使用 distinctive modern serifs
- No pure black（`#000000`）
- No neon/outer glow shadows
- No oversaturated accents
- No excessive gradient text on large headers
- No custom mouse cursors
- No overlapping elements；始终保持 clean spatial separation
- No 3-column equal card layouts
- No generic names（"John Doe"、"Acme"、"Nexus"）
- No fake round numbers（`99.99%`、`50%`）
- No AI copywriting clichés（"Elevate"、"Seamless"、"Unleash"、"Next-Gen"）
- No filler UI text："Scroll to explore"、"Swipe down"、scroll arrows、bouncing chevrons
- No broken Unsplash links；使用 `picsum.photos` 或 SVG avatars
- No centered Hero sections（for high-variance projects）

## Output Format (DESIGN.md Structure)

```markdown
# Design System: [Project Title]

## 1. Visual Theme & Atmosphere
(Evocative description of the mood, density, variance, and motion intensity.
Example: "A restrained, gallery-airy interface with confident asymmetric layouts
and fluid spring-physics motion. The atmosphere is clinical yet warm — like a
well-lit architecture studio.")

## 2. Color Palette & Roles
- **Canvas White** (#F9FAFB) — Primary background surface
- **Pure Surface** (#FFFFFF) — Card and container fill
- **Charcoal Ink** (#18181B) — Primary text, Zinc-950 depth
- **Muted Steel** (#71717A) — Secondary text, descriptions, metadata
- **Whisper Border** (rgba(226,232,240,0.5)) — Card borders, 1px structural lines
- **[Accent Name]** (#XXXXXX) — Single accent for CTAs, active states, focus rings
(Max 1 accent. Saturation < 80%. No purple/neon.)

## 3. Typography Rules
- **Display:** [Font Name] — Track-tight, controlled scale, weight-driven hierarchy
- **Body:** [Font Name] — Relaxed leading, 65ch max-width, neutral secondary color
- **Mono:** [Font Name] — For code, metadata, timestamps, high-density numbers
- **Banned:** Inter, generic system fonts for premium contexts. Serif fonts banned in dashboards.

## 4. Component Stylings
* **Buttons:** Flat, no outer glow. Tactile -1px translate on active. Accent fill for primary, ghost/outline for secondary.
* **Cards:** Generously rounded corners (2.5rem). Diffused whisper shadow. Used only when elevation serves hierarchy. High-density: replace with border-top dividers.
* **Inputs:** Label above, error below. Focus ring in accent color. No floating labels.
* **Loaders:** Skeletal shimmer matching exact layout dimensions. No circular spinners.
* **Empty States:** Composed, illustrated compositions — not just "No data" text.

## 5. Layout Principles
(Grid-first responsive architecture. Asymmetric splits for Hero sections.
Strict single-column collapse below 768px. Max-width containment.
No flexbox percentage math. Generous internal padding.)

## 6. Motion & Interaction
(Spring physics for all interactive elements. Staggered cascade reveals.
Perpetual micro-loops on active dashboard components. Hardware-accelerated
transforms only. Isolated Client Components for CPU-heavy animations.)

## 7. Anti-Patterns (Banned)
(Explicit list of forbidden patterns: no emojis, no Inter, no pure black,
no neon glows, no 3-column equal grids, no AI copywriting clichés,
no generic placeholder names, no broken image links.)
```

## Best Practices
- **Be Descriptive:** 写 "Deep Charcoal Ink (#18181B)"，不要只写 "dark text"
- **Be Functional:** 说明每个元素的用途
- **Be Consistent:** 整篇文档使用同一套术语
- **Be Precise:** 包含精确 hex codes、rem values、pixel values，并用 parentheses 标出
- **Be Opinionated:** 这不是 neutral template；它强制执行一套具体的 premium aesthetic

## Tips for Success
1. 先从 atmosphere 开始；在细化 tokens 前理解 vibe
2. 寻找 patterns；识别一致的 spacing、sizing 和 styling
3. 语义化思考；按用途命名颜色，而不只是按外观命名
4. 考虑 hierarchy；记录 visual weight 如何传达重要性
5. 编码 bans；anti-patterns 和正向规则一样重要

## Common Pitfalls to Avoid
- 使用未翻译的技术术语（例如写 "rounded-xl"，而不是 "generously rounded corners"）
- 省略 hex codes，或只使用描述性名称
- 忘记 design elements 的 functional roles
- Atmosphere 描述过于含糊
- 忽略 anti-pattern list；这些禁令正是让输出高级的关键
- 默认生成 generic "safe" designs，而不是强制执行策展过的 aesthetic
