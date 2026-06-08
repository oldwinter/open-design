# Design System Inspired by Webex

> Category: Productivity & SaaS
> 协作平台。Momentum 字体、蓝色 action system、多用户 accent spectrum。

## 1. Visual Theme & Atmosphere

Webex 比 Cisco corporate 更清爽、更友好，也更以产品为中心，同时仍处在同一个以信任为导向的体系中。其品牌语言把明亮白色画布与产品内的深色 surfaces 结合起来，再用来自 Momentum 的一组精准蓝色 action colors 锚定交互。结果是一种协作平台美学：可靠、易读、现代，并且为持续使用而设计，而不是追求一次性的营销戏剧感。

Typography 由 Momentum system 驱动，其主要 font stack 是 `Momentum, Inter, Arial, Helvetica Neue, Helvetica, sans-serif`。这让 Webex 比 Cisco 更广义的 corporate presence 更有软件产品原生节奏。Headings 应该清晰、自信，但不要宏大到像纪念碑。正文应当实用且有人味。不同于 Cisco 的 singular-signal visual system，Webex 可以使用更宽的协作辅助色盘，包括 cobalt、cyan、mint、lime、gold、orange、pink、purple；但它们应该作为团队、头像、presence 或 workspace state 的 **secondary accents** 出现，而不是失控的装饰。

定义 Webex 的是 **blue-guided clarity plus collaborative color**。Action 是蓝色的。Surfaces 是简洁的。辅助色代表人、团队或活动。

**Key Characteristics:**
- Momentum typography stack，形成干净的产品节奏
- 以 `#1170cf`、`#0353a8` 和 `#063a75` 为中心的蓝色 action system
- 白色 marketing/product canvases，可搭配 charcoal dark-mode surfaces
- 用于 actions 和 controls 的柔和 pill geometry
- 谨慎使用 collaboration-spectrum accent colors 表达人和 workspaces
- 以产品优先的清晰度取代装饰性花样
- Motion 应该精致且不打扰

## 2. Color Palette & Roles

### Primary Action
- **Webex Action Blue** (`#1170cf`): Primary buttons、active controls、main links、selected states
- **Action Blue Hover** (`#0353a8`): Hover 和更强的强调
- **Action Blue Pressed** (`#063a75`): Pressed / active interaction state
- **Accent Light Blue** (`#64b4fa`): Focus ring、明亮的 dark-surface link state、辅助 highlight

### Text & Surface
- **Primary Text (Light Theme)** (`#000000f2`): 主要 light-surface text
- **Secondary Text (Light Theme)** (`#000000b3`): Support copy 和 metadata
- **Primary Text (Dark Theme)** (`#fffffff2`): 主要 dark-surface text
- **Secondary Text (Dark Theme)** (`#ffffffb3`): 深色上的 support copy
- **White Canvas** (`#ffffff`): 主要浅色背景
- **Black Canvas** (`#000000`): 完整深色背景
- **Dark Surface 1** (`#1a1a1a`): Dark cards、modals、product chrome
- **Dark Surface 2** (`#262626`): 抬升的深色层级

### Collaboration / Team Spectrum
- **Team Cobalt** (`#5ebff7`)
- **Team Cyan** (`#22c7d6`)
- **Team Mint** (`#30c9b0`)
- **Team Lime** (`#93c437`)
- **Team Gold** (`#d6b220`)
- **Team Orange** (`#fd884e`)
- **Team Pink** (`#fc97aa`)
- **Team Purple** (`#f294f1`)

把这些颜色用作次要协作 accents：avatars、presence markers、workspace labels、chips，或轻量 category signals。

### Semantic
- **Success** (`#3cc29a`)
- **Warning** (`#f2990a`)
- **Danger** (`#fc8b98`)

## 3. Typography Rules

### Font Family
- **Primary**: `Momentum`, fallbacks: `Inter, Arial, Helvetica Neue, Helvetica, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Hero Display | Momentum | 64px | 500 | 1.10 | -1px | Marketing hero headline |
| Section Display | Momentum | 40px | 500 | 1.20 | -0.5px | Section lead |
| Heading | Momentum | 24px | 500 | 1.33 | normal | Card title, feature title |
| Body | Momentum | 16px | 400 | 1.50 | normal | Default product/marketing body |
| Body Small | Momentum | 14px | 400 | 1.43 | normal | Metadata, nav, helper text |
| Label | Momentum | 12px | 500 | 1.33 | normal | Chips, tags, presence labels |
| Button | Momentum | 16px | 500 | 1.25 | normal | CTA label |

### Principles
- Typography 要高度易读，并保持产品导向。
- 使用 medium weight 做结构性强调，不要使用过度粗重的 display theatrics。
- 这个 system 应该显得现代且易于扫读，尤其是在 dashboard 和协作场景中。
- 除非 artifact 明确需要营销式 flourish，否则避免混用装饰字体。

## 4. Component Stylings

### Buttons

**Primary Blue Pill**
- Background: Webex Action Blue (`#1170cf`)
- Text: White (`#ffffff`)
- Radius: pill
- Hover: `#0353a8`
- Active: `#063a75`

**Secondary Outline / Ghost on Light**
- Background: transparent 或 white
- Text: `#1170cf`
- Border: subtle dark 或 blue-tinted alpha border
- Radius: pill
- Purpose: 白色或浅色 product surfaces 上的 secondary CTA

**Secondary Outline / Ghost on Dark**
- Background: transparent 或 `#1a1a1a`
- Text: `#64b4fa`，最强强调时可用 white
- Border: 1px white-alpha 或 Accent Light Blue (`#64b4fa`)，取决于强调程度
- Radius: pill
- Hover: 柔和 blue-tinted dark fill，并保留 text color
- Focus ring: 2px Accent Light Blue halo
- Purpose: 深色 surface 上的 secondary CTA，同时不低于 contrast targets

### Cards & Containers
- Light cards: white fill，带 subtle outline
- Dark cards: `#1a1a1a` fill，配 bright text 和 light outline
- Radius: 16px
- Interiors 保持通透；默认不要过度压缩密度

### Inputs & Controls
- Light surfaces: subtle outline、blue focus
- Dark surfaces: bright text、soft white-alpha outline、blue focus signal
- Toggles、tabs 和 nav 应该精确且有产品原生感，而不是装饰化

### Collaboration Tokens
- 用 team-spectrum colors 表达 presence chips、avatar backgrounds、workspace badges 或轻量分类
- 不要把它们分配给所有 primary buttons 或所有大面积 surfaces

### Brand-Specific Recipes

**Meeting Card**
- Anatomy: title、time block、participant count、host avatar、device 或 room status、primary join action
- States: upcoming、live、ended、recording、muted-device warning
- Brand behavior: primary action 保持蓝色；meeting state 使用 subtle chips，而不是 full-surface color fills

**Presence Chip**
- Anatomy: avatar 或 initials、user name、compact status dot/chip、可选 location/device label
- Sizes: 24px compact、32px default、40px prominent
- States: available、presenting、in meeting、away、do-not-disturb
- Color rule: 将 collaboration colors 作为辅助身份 accents，而不是替代 semantic status

**Workspace Sidebar**
- Anatomy: workspace switcher、search、primary nav groups、badge counts、pinned spaces、footer utilities
- Behavior: 保持 hierarchy 明显，并让 badge counts 或 unread state 可以一眼读出
- States: selected item、unread、hovered、collapsed narrow mode

**Roster Row**
- Anatomy: avatar、display name、role label、mute/video state、hand-raise 或 reaction slot、overflow actions
- States: speaking、muted、hand raised、spotlighted、disconnected
- Density: 同时支持 meeting roster density 和更宽松的 messaging/contact density

## 5. Layout Principles

### Spacing & Grid
- Base rhythm: 8px
- Common scale: 8px, 12px, 16px, 24px, 32px, 48px, 64px, 88px
- 使用干净的 marketing bands 和 product-story sections
- 偏好简单 grid，并保持清晰的扫描顺序
- Breakpoints: mobile up to 767px, tablet 768px-1199px, desktop 1200px and above

### Composition
- White space 很重要；UI 不应显得拥挤
- Marketing layouts 应在清晰度和产品聚焦之间取得平衡
- Collaboration/product pages 可以把白色 sections 与嵌入式深色 product surfaces 混合使用
- Blue 应该引导视线；collaboration colors 应该辅助，而不是竞争
- 在 tablet 上，将多面板协作 layouts 缩减为两个 primary regions，并保留清楚的 action rail
- 在 mobile 上，将 sidebars 堆叠到 main header 下方，把 meeting side-panels 折叠成 drawers，并让 call controls 居中放在一行拇指可达区域内
- Navigation 在小屏上应转为 compact app bar 加 drawer，而不是一路缩小 labels 直到换行

### Accessibility & Responsiveness
- Minimum touch target: buttons、tabs、roster actions 和 call controls 至少 44px by 44px
- 在浅色和深色 surfaces 上都用 Accent Light Blue halo 保持可见 keyboard focus
- 任何通过 hover 显示的 affordance，也必须能在 focus 和 touch 上出现
- 尊重 reduced-motion users：用即时 layout 加轻微 opacity changes 取代 staggered entrance motion

## 6. Motion & Interaction

- Motion 应该精致、平静、实用
- 使用 160ms-280ms 范围内的 fade、slide 和 soft stagger
- Hover 和 focus 可以使用柔和蓝色 glow 或 highlight
- 避免夸张 spring physics 或过度 flourish
- 在 `prefers-reduced-motion` 下，移除 stagger choreography 和大幅 panel slides；只保留 120ms 以内的 opacity 或 outline state feedback

## 7. Voice & Brand

- Webex voice 实用、清晰、有人味
- Headlines 应强调用途、结果和协作能力
- 品牌应像一个可信赖的 workspace platform，服务于 meetings、messaging、devices 和 shared work
- 它应该比 Cisco corporate 更温暖，但仍然克制

## 8. Anti-patterns

- 不要把 Webex 做成 rainbow-heavy 的 consumer social product
- 不要把 collaboration colors 当作 primary CTA colors
- 不要过度使用 gradients 作为核心品牌语言
- 当 artifact 需要协作且可访问的气质时，不要把 system 做得过于 corporate-dark
- 不要使用损害 scannability 的 decorative typography

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary action: `#1170cf`
- Hover: `#0353a8`
- Pressed: `#063a75`
- Focus / bright dark-surface accent: `#64b4fa`
- Success: `#3cc29a`
- Warning: `#f2990a`
- Danger: `#fc8b98`

### Example Component Prompts
- "Create a Webex-style product landing page with white canvases, Momentum typography, and blue pill CTAs using #1170cf."
- "Design a collaboration dashboard with clean white cards, one embedded dark product panel, and secondary team-color chips for presence."
- "Build a settings or admin surface that uses calm spacing, blue action states, and restrained multi-user color accents."
