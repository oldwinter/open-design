# Inspired by Expo 的 Design System

> Category: Developer Tools
> React Native platform。Dark theme、tight letter-spacing、code-centric。

## 1. Visual Theme & Atmosphere

Expo 的界面是一个明亮、散发信心的 developer platform，建立在这样的前提上：用于构建 apps 的工具，也应该和这些 apps 本身一样 polished。整个体验位于明亮、通透的画布上——带冷色调的 off-white (`#f0f0f3`)，给页面一点技术感的凉意，又不会像 pure white 那样生硬。这是一个会呼吸的网站：sections 之间巨大的 vertical spacing 创造出 gallery-like pace，让每个 feature 都拥有自己的“房间”。

Design language 明确偏向 monochromatic：pure black (`#000000`) headlines 位于最浅背景上，cool blue-grays（`#60646c`, `#b0b4ba`, `#555860`）负责所有次级沟通。界面本身几乎没有颜色；当颜色出现时，它被保留给 product screenshots、app icons 和 React universe illustration，让实际内容在 neutral canvas 上爆发出生命力。

Expo 的独特之处在于 pill-shaped geometry。Buttons、tabs、video containers，甚至 images 都使用宽厚圆角或完全 pill-shaped corners（24px-9999px），形成一种有机、亲近的感觉，反过来抵消了典型 developer tool 的锐利边缘气质。再加上巨大 headlines 上的 tight letter-spacing（64px 时 -1.6px 到 -3px），最终形成一种既 premium 又 friendly 的设计，就像为开发者重新想象的 Apple product page。

**Key Characteristics:**
- 明亮 cool-white canvas (`#f0f0f3`)，配 gallery-like vertical spacing
- 严格 monochromatic：pure black headlines、cool blue-gray body text，没有 decorative color
- Pill-shaped geometry 无处不在：buttons、tabs、containers、images（24px-9999px radius）
- Massive display headlines（64px）带极端 negative letter-spacing（-1.6px 到 -3px）
- Inter 作为唯一 typeface，使用 400-900 weights 覆盖完整表达范围
- Whisper-soft shadows，几乎只是把 elements 从 surface 上轻轻托起
- Product screenshots 是界面中唯一的颜色来源

## 2. Color Palette & Roles

### Primary
- **Expo Black** (`#000000`): 绝对锚点，用于 primary headlines、CTA buttons 和 brand identity。Pure black 在 cool white 上形成最大 contrast，但不显攻击性。
- **Near Black** (`#1c2024`): Body content 的 primary text color，是一种几乎不可察觉的 blue-black，比 pure #000 更适合长时间阅读。

### Secondary & Accent
- **Link Cobalt** (`#0d74ce`): 标准 link color，可信、饱和的蓝色，传达 interactivity，同时不与 monochrome hierarchy 竞争。
- **Legal Blue** (`#476cff`): 用于 legal/footer links 的更亮、更饱和蓝色，比 Link Cobalt 更吸引注意。
- **Widget Sky** (`#47c2ff`): 用于 widget branding elements 的轻盈友好 cyan-blue，是系统中最亮的 accent。
- **Preview Purple** (`#8145b5`): 用于 "preview" 或 beta feature indicators 的浓郁 violet，与标准内容形成清晰区分。

### Surface & Background
- **Cloud Gray** (`#f0f0f3`): Primary page background，带极轻微 blue-violet tint 的 cool off-white。不是温暖，也不冷酷，而是精确的技术感。
- **Pure White** (`#ffffff`): Card surfaces、button backgrounds 和 elevated content containers。与 Cloud Gray 形成清晰的“抬起”区分。
- **Widget Dark** (`#1a1a1a`): Dark-theme widgets 和 overlay elements 的深色表面。
- **Banner Dark** (`#171717`): 最深的 surface variant，用于 promotional banners 和 high-contrast containers。

### Neutrals & Text
- **Slate Gray** (`#60646c`): 最常用的 secondary text color（305 instances）。冷调 blue-gray，权威但不沉重。
- **Mid Slate** (`#555860`): 比 Slate 稍深，用于 emphasized secondary text。
- **Silver** (`#b0b4ba`): Tertiary text、placeholders 和弱化 metadata。读得清，但明显后退。
- **Pewter** (`#999999`): Accordion icons 和深色语境中极弱化的 UI elements。
- **Light Silver** (`#cccccc`): 深色语境中的 arrow icons 和 decorative elements。
- **Dark Slate** (`#363a3f`): Dark surfaces 上的 borders、switch tracks 和 emphasized containment。
- **Charcoal** (`#333333`): Dark mode switch backgrounds 和 deep secondary surfaces。

### Semantic & Accent
- **Warning Amber** (`#ab6400`): 温暖深 amber，用于 warning states；刻意不是亮 yellow，传达 seriousness。
- **Destructive Rose** (`#eb8e90`): 柔和 pink-coral，用于 disabled destructive actions，比典型 red 更温和，减少 alarm fatigue。
- **Border Lavender** (`#e0e1e6`): 标准 card/container borders，冷调 lavender-gray，可见但不沉重。
- **Input Border** (`#d9d9e0`): Button 和 form element borders，比 card borders 略暖/略深，适合 interactive elements。
- **Dark Focus Ring** (`#2547d0`): Dark theme contexts 中的 keyboard focus indicators，深蓝色。

### Gradient System
- Interface layer 明显 **gradient-free**。视觉丰富度来自 product screenshots、React universe illustration 和细致 shadow layering，而不是 color gradients。这种缺席本身就是设计决定；gradients 会削弱 clinical precision。

## 3. Typography Rules

### Font Family
- **Primary**: `Inter`, fallbacks: `-apple-system, system-ui`
- **Monospace**: `JetBrains Mono`, fallback: `ui-monospace`
- **System Fallback**: `system-ui, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Inter | 64px (4rem) | 700-900 | 1.10 (tight) | -1.6px to -3px | Maximum impact, extreme tracking |
| Section Heading | Inter | 48px (3rem) | 600 | 1.10 (tight) | -2px | Feature section anchors |
| Sub-heading | Inter | 20px (1.25rem) | 600 | 1.20 (tight) | -0.25px | Card titles, feature names |
| Body Large | Inter | 18px (1.13rem) | 400-500 | 1.40 | normal | Intro paragraphs, section descriptions |
| Body / Button | Inter | 16px (1rem) | 400-700 | 1.25-1.40 | normal | Standard text, nav links, buttons |
| Caption / Label | Inter | 14px (0.88rem) | 400-600 | 1.00-1.40 | normal | Descriptions, metadata, badge text |
| Tag / Small | Inter | 12px (0.75rem) | 500 | 1.00-1.60 | normal | Smallest sans-serif text, badges |
| Code Body | JetBrains Mono | 16px (1rem) | 400-600 | 1.40 | normal | Inline code, terminal commands |
| Code Caption | JetBrains Mono | 14px (0.88rem) | 400-600 | 1.40 | normal | Code snippets, technical labels |
| Code Small | JetBrains Mono | 12px (0.75rem) | 400 | 1.60 | normal | Uppercase tech tags |

### Principles
- **One typeface, full expression**: Inter 是唯一 sans-serif，从 weight 400 (regular) 到 900 (black) 都会使用。这让设计拥有统一声音，同时还能在 whisper-light body text 与 thundering display headlines 之间形成戏剧性对比。
- **Extreme negative tracking at scale**: 64px headlines 使用 -1.6px 到 -3px letter-spacing，形成极密的文本块，像 logotypes 一样。这种 aggressive compression 是标志性的 typographic move。
- **Weight as hierarchy**: Display 用 700-900，headings 用 600，emphasis 用 500，body 用 400。层级跳变果断，没有暧昧的中间 weight。
- **Consistent 1.40 body line-height**: 几乎所有 body 和 UI text 都共享 1.40 line-height，创造有节奏的 vertical consistency。

## 4. Component Stylings

### Buttons

**Primary (White on border)**
- Background: Pure White (`#ffffff`)
- Text: Near Black (`#1c2024`)
- Padding: 0px 12px（compact，height 由 content 驱动）
- Border: thin solid Input Border (`1px solid #d9d9e0`)
- Radius: subtly rounded (6px)
- Shadow: hover 时使用 subtle combined shadow
- 低调默认款，干净、专业、不抢戏

**Primary Pill**
- 与 Primary 相同，但使用 pill-shaped radius (9999px)
- 用于 hero CTAs 和 high-emphasis actions
- 额外圆润度传达 "start here"

**Dark Primary**
- Background: Expo Black (`#000000`)
- Text: Pure White (`#ffffff`)
- Pill-shaped (9999px) 或 generously rounded (32-36px)
- No border（black 本身就是 border）
- 最高强调级 CTA，只保留给 primary conversion actions

### Cards & Containers
- Background: Pure White (`#ffffff`)，从 Cloud Gray 页面上清晰抬起
- Border: 标准 cards 使用 thin solid Border Lavender (`1px solid #e0e1e6`)
- Radius: 标准 cards 使用舒适圆角 (8px)；featured containers 使用更宽裕圆角 (16-24px)
- Shadow Level 1: Whisper (`rgba(0,0,0,0.08) 0px 3px 6px, rgba(0,0,0,0.07) 0px 2px 4px`)，几乎不可察觉的 lift
- Shadow Level 2: Standard (`rgba(0,0,0,0.1) 0px 10px 20px, rgba(0,0,0,0.05) 0px 3px 6px`)，明确的 floating elevation
- Hover: 可能是轻微 shadow deepening 或 background shift

### Inputs & Forms
- Background: Pure White (`#ffffff`)
- Text: Near Black (`#1c2024`)
- Border: thin solid Input Border (`1px solid #d9d9e0`)
- Padding: 0px 12px（与 button sizing 对齐）
- Radius: subtly rounded (6px)
- Focus: 通过 CSS custom property 生成 blue ring shadow

### Navigation
- Sticky top nav，使用 transparent/blurred background
- Logo: 黑色 Expo wordmark
- Links: Near Black (`#1c2024`) 或 Slate Gray (`#60646c`)，14-16px Inter weight 500
- CTA: 右侧 black pill button（"Sign Up"）
- GitHub star badge 作为 social proof
- Status indicator（"All Systems Operational"）配 green dot

### Image Treatment
- Product screenshots 和 device mockups 是视觉主角
- Video 和 image containers 使用宽裕圆角（24px）
- Screenshots 展示在 realistic device frames 中
- Dark UI screenshots 与浅色 canvas 形成 contrast
- Rounded containers 内部 full-bleed

### Distinctive Components

**Universe React Logo**
- Animated/illustrated React logo 作为视觉中心
- 将 Expo 身份连接到 React ecosystem
- 是 otherwise photographic page 上唯一 illustrative element

**Device Preview Grid**
- 同时展示多种 device types（phone、tablet、web）
- 以视觉方式展示 cross-platform capability
- 每个 device 使用 realistic device chrome

**Status Badge**
- Nav 中的 "All Systems Operational" pill
- Green dot + text，compact trust signal
- Pill-shaped (36px radius)

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1px, 2px, 4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 144px
- Button padding: 0px 12px（不寻常地 compact，height 由 line-height 驱动）
- Card internal padding: 约 24-32px
- Section vertical spacing: 巨大（major sections 之间估计 96-144px）
- Component gap: sibling elements 之间 16-24px

### Grid & Container
- Max container width: 约 1200-1400px，居中
- Hero: 居中的 single-column，带 massive breathing room
- Feature sections: Alternating layouts（image left/right, full-width showcases）
- Card grids: Feature highlights 使用 2-3 column
- Full-width sections，内部 content 受容器约束

### Whitespace Philosophy
- **Gallery-like pacing**: 每个 section 都像独立展品，被大量空白包围。这创造出高级、不匆忙的浏览体验。
- **Breathing room is the design**: 宽裕 whitespace 是主要设计元素，传达 confidence、quality，以及每个 feature 都值得被单独关注。
- **Content islands**: Sections 像孤立的“岛”漂浮在 white space 中，由 scrolling 而非视觉延续连接。

### Border Radius Scale
- Nearly squared (4px): Small inline elements, tags
- Subtly rounded (6px): Buttons, form inputs, combo boxes，functional interactive radius
- Comfortably rounded (8px): Standard content cards, containers
- Generously rounded (16px): Feature tabs, content panels
- Very rounded (24px): Buttons, video/image containers, tabpanels，signature softness
- Highly rounded (32-36px): Hero CTAs, status badges, nav buttons
- Pill-shaped (9999px): Primary action buttons, tags, avatars，maximum friendliness

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Cloud Gray page background, inline text |
| Surface (Level 1) | White bg, no shadow | Standard white cards on Cloud Gray |
| Whisper (Level 2) | `rgba(0,0,0,0.08) 0px 3px 6px` + `rgba(0,0,0,0.07) 0px 2px 4px` | Subtle card lift, hover states |
| Elevated (Level 3) | `rgba(0,0,0,0.1) 0px 10px 20px` + `rgba(0,0,0,0.05) 0px 3px 6px` | Feature showcases, product screenshots |
| Modal (Level 4) | Dark overlay (`--dialog-overlay-background-color`) + heavy shadow | Dialogs, overlays |

**Shadow Philosophy**: Expo 使用 shadows 时像轻声低语，而不是建筑式声明。主要 depth mechanism 是 **background color contrast**，也就是 white cards floating on Cloud Gray，而不是投射阴影。当 shadows 出现时，它们柔和、扩散、方向向下，像纸张悬停在桌面上方几毫米。

## 7. Do's and Don'ts

### Do
- 使用 Cloud Gray (`#f0f0f3`) 作为 page background，Pure White (`#ffffff`) 作为 elevated cards；two-tone light system 是关键
- Display headlines 保持 extreme negative letter-spacing（64px 时 -1.6px 到 -3px），形成 signature compressed look
- Primary CTA buttons 使用 pill-shaped (9999px) radius；organic shape 是身份核心
- 把 black (`#000000`) 保留给 headlines 和 primary CTAs；它在 light canvas 上承载最高权威感
- Secondary text 使用 Slate Gray (`#60646c`)；它在 readable 和 receded 之间取得精确平衡
- Major sections 之间保持巨大 vertical spacing（96px+）；gallery pacing 定义了 premium feel
- 使用 product screenshots 作为主要 visual content；interface 保持 monochrome，由 products 带来颜色
- Inter 使用完整 weight range（400-900）；weight contrast 就是 hierarchy

### Don't
- 不要向 interface chrome 引入 decorative colors；monochromatic palette 是有意为之
- 不要在 interactive elements 上使用 sharp corners（border-radius < 6px）；pill/rounded geometry 是 signature
- 不要把 section spacing 降到 64px 以下；breathing room 就是设计
- 不要使用 heavy drop shadows；depth 来自 background contrast 和 whisper-soft shadows
- 不要混入额外 typefaces；Inter 覆盖从 display 到 caption 的全部文本
- 不要在 body text 上使用宽于 -0.25px 的 letter-spacing；extreme tracking 只属于 display
- 不要使用超过 2px 的 borders；containment 通过 background color 和 gentle borders 细腻实现
- 不要向 interface 添加 gradients；视觉丰富度来自内容，而不是装饰
- 不要在 semantic contexts 之外使用 saturated colors；palette 严格是 grayscale + functional blue

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, hamburger nav, stacked cards, hero text scales to ~36px |
| Tablet | 640-1024px | 2-column grids, condensed nav, medium hero text |
| Desktop | >1024px | Full multi-column layout, expanded nav, massive hero (64px) |

*Only one explicit breakpoint detected (640px)，说明它更像 fluid、container-query 或 min()/clamp()-based responsive system，而不是固定 breakpoint snapping。*

### Touch Targets
- Buttons 使用 generous radius（24-36px），形成大而适合手指的 surfaces
- Navigation links 有足够 gap
- Status badge 尺寸适合 touch（36px radius）
- Minimum recommended: 44x44px

### Collapsing Strategy
- **Navigation**: 带 CTA 的 full horizontal nav 在 mobile 上折叠为 hamburger
- **Feature sections**: Multi-column -> stacked single column
- **Hero text**: 64px -> ~36px progressive scaling
- **Device previews**: Grid -> stacked/carousel
- **Cards**: Side-by-side -> vertical stacking
- **Spacing**: 按比例减少，但仍保持 generous rhythm

### Image Behavior
- Product screenshots 按比例缩放
- Device mockups 在 mobile 上可能简化或展示更少 devices
- Rounded corners 在所有尺寸下保持
- Below-fold content 使用 lazy loading

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA / Headlines: "Expo Black (#000000)"
- Page Background: "Cloud Gray (#f0f0f3)"
- Card Surface: "Pure White (#ffffff)"
- Body Text: "Near Black (#1c2024)"
- Secondary Text: "Slate Gray (#60646c)"
- Borders: "Border Lavender (#e0e1e6)"
- Links: "Link Cobalt (#0d74ce)"
- Tertiary Text: "Silver (#b0b4ba)"

### Example Component Prompts
- "Create a hero section on Cloud Gray (#f0f0f3) with a massive headline at 64px Inter weight 700, line-height 1.10, letter-spacing -3px. Text in Expo Black (#000000). Below, add a subtitle in Slate Gray (#60646c) at 18px. Place a black pill-shaped CTA button (9999px radius) beneath."
- "Design a feature card on Pure White (#ffffff) with a 1px solid Border Lavender (#e0e1e6) border and comfortably rounded corners (8px). Title in Near Black (#1c2024) at 20px Inter weight 600, description in Slate Gray (#60646c) at 16px. Add a whisper shadow (rgba(0,0,0,0.08) 0px 3px 6px)."
- "Build a navigation bar with Expo logo on the left, text links in Near Black (#1c2024) at 14px Inter weight 500, and a black pill CTA button on the right. Background: transparent with blur backdrop. Bottom border: 1px solid Border Lavender (#e0e1e6)."
- "Create a code block using JetBrains Mono at 14px on a Pure White surface with Border Lavender border and 8px radius. Code in Near Black, keywords in Link Cobalt (#0d74ce)."
- "Design a status badge pill (9999px radius) with a green dot and 'All Systems Operational' text in Inter 12px weight 500. Background: Pure White, border: 1px solid Input Border (#d9d9e0)."

### Iteration Guide
1. 一次只聚焦 ONE component
2. 引用具体 color names 和 hex codes；写 "use Slate Gray (#60646c)"，不要写 "make it gray"
3. 有意使用 radius values：buttons 6px、cards 8px、images 24px、pills 9999px
4. 在 measurements 旁描述 "feel"，例如 "enormous breathing room with 96px section spacing"
5. 始终指定 Inter 和准确 weight；weight contrast 就是 hierarchy
6. Shadows 使用 elevation table 中的 "whisper shadow" 或 "standard elevation"
7. Interface 保持 monochrome，让 product content 成为颜色来源
