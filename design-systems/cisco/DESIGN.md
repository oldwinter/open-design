# Inspired by Cisco 的 Design System

> Category: Backend & Data
> Enterprise infrastructure brand。Dark trust surfaces、Cisco Blue signal、technical clarity。

## 1. Visual Theme & Atmosphere

Cisco 当前的公开 web presence，是以电影化克制呈现的 enterprise infrastructure。画布是深色，但不是 pure black：层叠的 navy-charcoal surfaces 创造深度，同时避免落入 glossy startup gradients。明亮的 Cisco Blue 被用作精确 signal color，而不是铺满页面的色彩 wash。整体印象是“serious global platform”，而不是“friendly SaaS app”：大号高信心 headlines、安静 chrome，以及强调 scale、networking、observability 和 resilience 的 product imagery。

Typography 克制且 corporate。Cisco 的内部与 presentation ecosystem 指向 `CiscoSansTT` 作为首选 brand face，而 web experience 仍兼容现代 grotesk fallbacks。Headings 应该简洁、工程化。Body copy 应该清楚直接，而不是 editorial。几何上，系统偏好用于 calls to action 的 soft pills、rounded-but-not-playful cards，以及漂浮在大型 atmospheric sections 上方的 glass-dark navigation shells。

Cisco 的独特之处在于 **deep infrastructure darkness** 与 **single electric trust signal** 的结合。把 blue 用在真正重要的时刻：primary action、focus、active tab、chart highlight 或 key data edge。其余界面保持克制。

**Key Characteristics:**
- 使用 dark navy-charcoal surfaces，而不是 flat black
- Cisco Blue (`#049fd9`) 作为 primary signal color
- 由 grays 和 pale technical whites 构成的 restrained neutral system
- Enterprise-scale headlines，搭配 compact、factual body copy
- Pill CTAs 和 rounded control shells，但绝不变成玩具感 UI
- Product 和 platform imagery 应暗示 networks、telemetry 和大规模 systems
- Motion 应该 controlled、infrastructural，而不是 playful

## 2. Color Palette & Roles

### Primary
- **Cisco Blue** (`#049fd9`): High-signal accent、outline CTA、active state、key link。
- **Status Blue** (`#64bbe3`): Focus halo、secondary emphasis、lightweight chart signal。
- **Cisco Indigo** (`#005073`): Filled primary CTA、dense accent、deeper data emphasis。
- **Dark Blue** (`#2b5592`): 用于 graphics、charts 和 layered blue compositions 的 secondary brand accent。

### Neutral / Surface
- **Dark Gray 1** (`#39393b`): Mid-dark container surface、panel base、dense modules。
- **Dark Gray 2** (`#58585b`): Borders、separators、secondary shells。
- **Medium Gray 2** (`#9e9ea2`): Muted labels 和 low-emphasis metadata。
- **Pale Gray 1** (`#e8ebf1`): Light text support、cool technical background tint、dark 上的 separators。
- **Core White** (`#ffffff`): Primary inverse text、bright UI foreground、light surface content。

### Support
- **Sage Green** (`#abc233`): Positive outcome 或 infrastructure-health accent。
- **Status Green** (`#6cc04a`): Success state。
- **Status Yellow** (`#ffcc00`): Warning 或 caution state。
- **Status Orange** (`#ff7300`): Alert 或 escalation state。
- **Status Red** (`#cf2030`): Error 或 critical state。

### Recommended Surface Roles
- **Primary canvas**: 基于 `#0f1720` 到 `#1b2530` 的 blue-black 或 charcoal blend，并以 Cisco palette 为锚点。
- **Elevated card**: Dark Gray 1 (`#39393b`) 或稍偏蓝的变体。
- **Border / outline**: Dark Gray 2 (`#58585b`)，需要时带 subtle transparency。
- **Primary text on dark**: Core White (`#ffffff`) 或 Pale Gray 1 (`#e8ebf1`)。

## 3. Typography Rules

### Font Family
- **Primary**: `CiscoSansTT`, fallbacks: `Inter, Arial, Helvetica Neue, Helvetica, sans-serif`
- **Mono / Technical**: 如需支持 metrics 和 IDs 的 mono face，使用 `IBM Plex Mono`、`SF Mono` 或 `ui-monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Hero Display | CiscoSansTT | 72px | 500 | 1.05 | -1.6px | Large launch/positioning headline |
| Section Display | CiscoSansTT | 56px | 500 | 1.08 | -1.1px | Major section statement |
| Heading | CiscoSansTT | 32px | 500 | 1.20 | -0.4px | Feature title, card header |
| Subheading | CiscoSansTT | 24px | 500 | 1.30 | -0.2px | Supporting header |
| Body | CiscoSansTT | 16px | 400 | 1.55 | normal | Default body copy |
| Body Small | CiscoSansTT | 14px | 400 | 1.50 | normal | Metadata, nav, helper text |
| Label / Eyebrow | CiscoSansTT | 12px | 700 | 1.30 | 0.24px | Tags, overlines, section labels |
| Button | CiscoSansTT | 16px | 500 | 1.20 | normal | CTA labels |

### Principles
- Display typography 要 decisive 且 compressed，但不要 ultra-light 或 editorial。
- Body copy 应 practical 且高度 legible，不使用 clever type effects。
- Bold weight 主要用于 short labels、status tags 和 compact emphasis。
- 相比炫技式 font mixing，更偏好 one-family coherence。

## 4. Component Stylings

### Buttons

**Primary Action Pill**
- Background: Cisco Indigo (`#005073`)
- Text: White (`#ffffff`)
- Radius: full pill
- Padding: generous horizontal padding, medium vertical height
- Hover: Dark Blue (`#2b5592`)
- Active: 接近 `#00364d` 的 darker indigo tone
- Focus ring: Status Blue (`#64bbe3`) 2px outer halo，深色 surfaces 上再配 1px white inner keyline
- Use case: dark Cisco surfaces 上的 high-priority submit、deploy 或 "learn more" action

**Signal Outline Pill**
- Background: transparent
- Text: 深色 surfaces 上使用 Cisco Blue (`#049fd9`)，浅色 surfaces 上使用 Cisco Indigo (`#005073`)
- Border: 1.5px Cisco Blue (`#049fd9`)
- Radius: full pill
- Hover: blue-tinted surface fill，同时保留 text color
- Focus ring: 与 primary button 相同的可见 halo pairing
- Use case: Brand-forward secondary action，让 Cisco Blue 保持突出，同时不牺牲 contrast

**Secondary Dark Pill**
- Background: transparent 或 dark surface
- Text: White 或 Pale Gray 1
- Border: Dark Gray 2 (`#58585b`)
- Radius: full pill
- Purpose: low-noise secondary CTA

### Cards & Containers
- Background: 基于 `#39393b` 或更冷 navy-charcoal adaptation 的 layered dark surface
- Border: 使用 `#58585b` 的 1px subtle border
- Radius: 16px 到 20px
- Shadow: minimal；depth 主要来自 surface contrast 和 spacing

### Navigation
- Dark hero 上方的 dark glass-like masthead 或 shell
- Text: White / Pale Gray 1
- Active state: Cisco Blue underline、chip 或 glow
- Navigation 应该像 product chrome，而不是 marketing candy

### Data / Product Modules
- Charts 和 diagrams 应把 Cisco Blue 作为 primary highlight，并让 supporting colors 保持最少
- Green/yellow/red 只用于真实 operational meaning
- Dense technical blocks 仍要保留 breathing room 和 hierarchy

### Brand-Specific Recipes

**Network Telemetry Card**
- Anatomy: eyebrow label、large metric、delta chip、12-24h sparkline、quiet footer metadata
- Density: compact 但不拥挤；16px-24px padding，并清楚对齐 chart axes
- States: normal、selected、degraded、critical、loading skeleton
- Brand behavior: Cisco Blue 用于 selected edge 或 sparkline，semantic colors 只用于 health state

**Topology / Product Diagram Module**
- Anatomy: title、system canvas、node chips、connection lines、side legend
- Visual rule: dark field first、blue path highlight second，其他 nodes 在 active 前保持 muted
- States: idle overview、hovered path、selected node、degraded route

**Dense Control Panel**
- Anatomy: left nav rail、filter bar、split metric region、log/event table、contextual right rail
- Control sizing: desktop 上 compact 36px inputs 可以接受，但 action buttons 仍保持 44px minimum height
- States: quiet default、blue active filter、clear warning/error escalation

## 5. Layout Principles

### Spacing & Grid
- Base rhythm: 8px
- Common scale: 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
- 偏好 wide desktop containers 和 large sectional spacing
- 12-column desktop layout 加 generous gutters 很适合这个品牌
- Breakpoints: mobile up to 767px、tablet 768px-1199px、desktop 1200px and above

### Composition
- 在 expansive hero/outcome sections 与 denser information bands 之间交替
- 当 asymmetry 服务于 product imagery 或 system diagrams 时使用它
- Large dark fields 加一个 blue focal point，比许多小而彩色的 fragments 更符合品牌
- Tablet 上把 wide split layouts 降为 2-column modules，并让 telemetry cards 成对展示
- Mobile 上把 hero side-by-sides 折叠为 single column，data panels 垂直堆叠，并把 dense control rows 转为 progressive disclosure panels
- Navigation 在 tablet/mobile 上应从 full masthead 折叠为 compact menu button + 一个 primary CTA

### Accessibility & Responsiveness
- 任何 tappable control 的 minimum touch target: 44px by 44px
- Keyboard focus 必须在每个 interactive element 上保持可见，使用 blue outer halo + white inner keyline pairing
- 不要依赖 hover-only disclosure；在 focus 和 touch 上也展示 essential state 与 actions
- Desktop 上保持 readable line lengths；tablet 不超过每行 3 cards，小手机每行 1 card

## 6. Motion & Interaction

- Motion 应 controlled、smooth、systems-like
- 使用 fade、rise、subtle slide 和 restrained glow
- Interaction timing: control response 约 160ms-260ms，大型 section reveals 约 320ms-500ms
- 避免 bouncy springs、elastic easing 或 playful overshoot
- 尊重 `prefers-reduced-motion`：移除 parallax 和 staged reveals，只保留 instant state swaps 或 120ms 以下的短 opacity transitions

## 7. Voice & Brand

- Voice confident、technical、outcome-oriented
- Headlines 应听起来像 platform positioning 或 systems value，而不是 consumer lifestyle copy
- 使用暗示 trust、resilience、infrastructure、AI readiness 和 operational scale 的语言
- Brand 应感觉 global、mission-critical，并且在压力下保持 composed

## 8. Anti-patterns

- 不要把 Cisco 做成 generic gradient startup site
- 不要用许多同样响亮的 accent colors 淹没页面
- 不要使用 pastel palettes 或 lifestyle-illustration aesthetics
- 不要使用过度圆润、bubbly 的 controls
- 不要只依赖 pure black；改用 layered charcoals 和 deep blue-blacks
- 不要让 body copy 显得 whimsical、editorial 或 ironic

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary signal: Cisco Blue (`#049fd9`)
- Hover / secondary signal: Status Blue (`#64bbe3`)
- Deep accent: Cisco Indigo (`#005073`)
- Mid-dark surface: Dark Gray 1 (`#39393b`)
- Border: Dark Gray 2 (`#58585b`)
- Inverse text: White (`#ffffff`) or Pale Gray 1 (`#e8ebf1`)

### Example Component Prompts
- "Create a Cisco-style dark enterprise landing page with layered navy-charcoal surfaces, a bright Cisco Blue primary CTA, and a 72px high-confidence hero headline."
- "Design a technical dashboard card on a dark surface with a subtle gray border, white text, and Cisco Blue chart highlights."
- "Build a dark glass navigation bar with restrained white labels and one Cisco Blue active indicator."
