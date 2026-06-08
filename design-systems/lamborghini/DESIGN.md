# Design System Inspired by Lamborghini

> Category: Automotive
> Supercar brand。True black surfaces、gold accents、戏剧化 uppercase typography。

## 1. Visual Theme & Atmosphere

Lamborghini 的网站是一座黑暗大教堂：一个 digital stage，jet-black surfaces 无限延展，每个元素都像聚光灯下的机器一样从虚空中浮现。页面几乎全黑。不是 dark gray，不是 near-black，而是真正毫不妥协的 black（`#000000`），它铺满 viewport，拒绝退让。在这片深渊中，white type 和 Lamborghini Gold（`#FFC000`）以外科手术般的精度部署，形成一种 visual language，像走进夜间 motorsport event：除了真正重要的东西，每个 surface 都在吸收光线。

Hero 是 full-viewport video：深色、cinematic、沉浸式，展示 event footage 或 vehicle reveals，上方悬浮着 Lamborghini bull logo。Navigation 极简：中央 bull logo，左侧 "MENU" hamburger，右侧 search/bookmark icons，全部以白色渲染在 black canvas 上。没有 borders、没有可见 nav containers、header 上没有 background color，只有漂浮在黑暗中的 white marks。整体 mood 是 nocturnal luxury：排他、戏剧化，并且刻意带压迫感。每个 section transition 都像在黑暗中滚动进入下一次揭示。

Typography 是这片黑暗的声音。LamboType 是由 Character Type 与 design agency Strichpunkt 为 Lamborghini 打造的 custom Neo-Grotesk typeface，从 120px uppercase display headlines 到 10px micro labels 都使用它。其独特的 12° angled terminals 来自 Lamborghini super sports cars 的 aerodynamic lines，比例从 Normal 到 Ultracompressed width。Headlines 在巨大尺度上以 uppercase SHOUT，配 tight line-heights（120px 时 0.92），形成像钢材冲压出来的 dense blocks of text。这个 typeface 带有 hexagonal geometric DNA，由 hexagons、three-armed stars 和 circles 构成，并在界面的 hexagonal pause button 与 UI icons 中持续回响。戏剧化表层之下，是 Bootstrap grid 与 68 个 Element Plus/UI components 构成的扎实技术基础。

**Key Characteristics:**
- True black（`#000000`）dominant surfaces，white 与 gold 是唯一 relief colors
- LamboType custom Neo-Grotesk font，带 12° angled terminals，灵感来自 aerodynamic car lines
- Lamborghini Gold（`#FFC000`）作为唯一 accent color，只用于 primary CTA buttons
- 极端尺度的 all-uppercase display typography（120px、80px、54px），配 tight line-heights
- Full-viewport video heroes，使用 cinematic event/vehicle content
- Buttons 使用 zero border-radius；锐利、棱角分明、毫不妥协的 rectangles
- UI elements 中的 hexagonal motifs（pause button、icon system）呼应 brand geometry
- 底层使用 Bootstrap grid system + 68 个 Element Plus/UI components
- Transparent ghost buttons，white borders 50% opacity，作为 secondary CTA pattern

## 2. Color Palette & Roles

### Primary
- **Lamborghini Gold** (`#FFC000`): Signature accent color，一种温暖、饱和的 amber-gold（rgb 255, 192, 0），只用于 primary action buttons（"Discover More"、"Tickets"、"Start Configuration"）。它是整个 interface 中唯一的 chromatic color，在 black canvas 上像穿透夜色的 headlight 一样被点燃。
- **Pure White** (`#FFFFFF`): Dark surfaces 上的 primary text color、logo rendering、nav elements，以及 light-mode button fills；这是从黑暗中发声的 voice。

### Secondary & Accent
- **Dark Gold** (`#917300`): Gold buttons 的 hover/pressed state；深 amber（rgb 145, 115, 0），通过让 gold 变暗来传达 interaction。
- **Gold Text** (`#FFCE3E`): 略浅的 gold variant（rgb 255, 206, 62），用于 inline text accents 和 highlighted labels。
- **Cyan Pulse** (`#29ABE2`): Electric blue-cyan（rgb 41, 171, 226），作为 informational accent 和 interactive element highlight 出现。
- **Link Blue** (`#3860BE`): Medium blue（rgb 56, 96, 190），所有 text colors 的 hyperlink hover state 都使用它。

### Surface & Background
- **Absolute Black** (`#000000`): Dominant surface color，用于 page background、hero sections、header、footer 和大多数 containers。
- **Charcoal** (`#202020`): Elevated dark surface（rgb 32, 32, 32），是位于 black canvas 之上的 cards、panels 和 text containers 的主要 dark gray。
- **Dark Iron** (`#181818`): Subtle surface variant（rgb 24, 24, 24），几乎无法与 black 区分，用于 footer 和 deep sections。
- **Overlay Black** (`rgba(0,0,0,0.7)`): Modals 和 video dimming 的半透明 overlay。
- **Near White** (`#F8F8F8`): 稀有 light surface（rgb 248, 248, 248），用于 white-mode sections 中的 content blocks。
- **Mist** (`#E6E6E6`): Secondary light-mode containers 的 light gray surface。

### Neutrals & Text
- **Pure White** (`#FFFFFF`): Dark backgrounds 上的 primary text，包括 headlines、body、nav labels。
- **Smoke** (`#F5F5F5`): Dark surfaces 上的 secondary text，比 pure white 略柔和。
- **Graphite** (`#494949`): Light surfaces 上的 dark gray text（rgb 73, 73, 73）。
- **Ash** (`#7D7D7D`): Muted text、timestamps 和 metadata 使用的 mid-range gray（rgb 125, 125, 125）。
- **Steel** (`#969696`): Disabled text 和 subtle labels 使用的 lighter gray（rgb 150, 150, 150）。
- **Slate** (`#666666`): Secondary content 的替代 mid-gray。
- **Iron** (`#555555`): Body text variants 使用的 dark mid-gray。
- **Shadow** (`#313131`): Very dark gray，用于 dark surfaces 上 white 过强的 text。

### Semantic & Accent
- **Cyan Pulse** (`#29ABE2`): 用于 informational highlights 和 interactive feedback。
- **Link Blue** (`#3860BE`): 所有 hyperlinks 的 universal hover state。
- **Teal Action** (`#1EAEDB`): Transparent/ghost variants 的 button hover background（rgb 30, 174, 219）。

### Gradient System
- Color palette 中没有 explicit gradients；dark-to-light progression 通过 surface layering 实现：`#000000` -> `#181818` -> `#202020` -> `#494949` -> `#7D7D7D`
- Video heroes 使用 content 自身的 natural atmospheric gradients
- Top-of-page gradient: full-bleed imagery 边缘使用 subtle dark-to-darker fade

## 3. Typography Rules

### Font Family
- **Display & UI**: `LamboType`, Roboto, Helvetica Neue, Arial — Character Type 为 Lamborghini 2024 brand refresh 打造的 custom Neo-Grotesk typeface。宽度从 Normal 到 Ultracompressed，weight 从 Light（300）到 Black。具备来自 aerodynamic car geometry 的 12° angled terminals、hexagonal construction logic，并支持 200+ languages，包括 Latin、Cyrillic 和 Greek。
- **Fallback/UI**: `Open Sans` — 在部分 button/form contexts 中作为 system fallback。
- **No italic variants**：marketing site 上未观察到 italic variants；brand voice 始终 upright。

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Hero Display | 120px (7.50rem) | 400 | 0.92 | normal | LamboType, uppercase, maximum impact |
| Display 2 | 80px (5.00rem) | 400 | 1.13 | normal | LamboType, uppercase, major section titles |
| Section Title | 54px (3.38rem) | 400 | 1.19 | normal | LamboType, uppercase |
| Sub-section | 40px (2.50rem) | 400 | 1.15 | normal | LamboType, uppercase |
| Feature Heading | 27px (1.69rem) | 400 | 1.37 | normal | LamboType, uppercase |
| Card Title | 24px (1.50rem) | 400 | — | normal | LamboType |
| Body Large | 18px (1.13rem) | 400 | 1.56 | normal | LamboType, mixed case and uppercase variants |
| Body / UI | 16px (1.00rem) | 400/700 | 1.50 | normal/0.16px | LamboType, primary body text |
| Button Large | 16px (1.00rem) | 400 | 1.50 | normal | Gold CTA buttons |
| Button Standard | 14.4px (0.90rem) | 300/700 | 1.00 | 0.14-0.2px | LamboType, uppercase, ghost buttons |
| Button Small | 13px (0.81rem) | 300/500 | 1.20 | 0.13-0.2px | LamboType, compact button variant |
| Caption | 14px (0.88rem) | 600/700 | 1.14-1.50 | -0.42px | LamboType, uppercase, negative tracking |
| Label | 12px (0.75rem) | 400/500 | 1.83 | 0.96px | LamboType, uppercase badges and micro labels |
| Micro | 10px (0.63rem) | 400 | 1.00-2.00 | 0.225px | LamboType, uppercase, smallest text |

### Principles
- **ALL-CAPS is the default voice**: Display 和 feature headings 普遍 uppercase。这会形成一种 shouting、commanding tone，匹配品牌的 aggression。
- **Extreme scale range**: 从 120px heroes 到 10px micro labels，12:1 的比例制造戏剧化 visual hierarchy。
- **Tight line-heights at scale**: Display sizes 使用 0.92-1.19 line-height，形成 dense、compressed type blocks，感觉更像 stamped，而不是 typeset。
- **Weight 400 dominates**: 不同于许多用 bold 做 emphasis 的 design systems，Lamborghini 的 regular weight 承担 headlines；typeface 本身足够 distinctive，不需要 weight variation。
- **Negative tracking on captions**: 14px captions 上的 -0.42px letter-spacing 创造 compressed、technical aesthetic。
- **Positive tracking on micro text**: 10px 时 +0.225px 确保最小字号的 legibility。
- **Single typeface discipline**: LamboType 覆盖所有内容；12° angled terminals 和 hexagonal geometry 在所有尺寸上提供 visual coherence。

## 4. Component Stylings

### Buttons
所有 buttons 都使用 **zero border-radius**，形成锐利的 angular rectangles，呼应 Lamborghini 车辆的 aggressive lines。

**Gold Accent CTA** — Primary action:
- Default: bg `#FFC000` (Lamborghini Gold), text `#000000`, padding 24px, fontSize 16px, fontWeight 400, borderRadius 0px, no border
- Hover: bg `#917300` (Dark Gold), 明显变暗
- Class: `btn-accent btn-large`
- Used for: "Discover More", "Tickets", "Start Configuration"

**Transparent Ghost** — Dark backgrounds 上的 secondary action:
- Default: bg transparent, text `#FFFFFF`, border 1px solid `#FFFFFF`, padding 16px, opacity 0.5
- Hover: bg `#1EAEDB` (Teal Action), text white, opacity 0.7
- Focus: bg `#1EAEDB`, border 1px solid `#000000`, outline 2px solid `#000000`
- Used for: hero sections 和 dark panels 上的 secondary CTAs

**White Filled** — Light-mode primary:
- Default: bg `#FFFFFF`, text `#202020`, no border
- Used for: gold 不合适的 dark sections 上的 CTAs

**Black Filled** — Dark filled variant:
- Default: bg `#000000`, text `#202020`
- Used for: light sections 上的 inverted CTA

**Gray Neutral** — Subtle action:
- Default: bg `#969696`, text `#202020`
- Used for: secondary/tertiary actions、badge-like buttons

### Cards & Containers
- Background: black canvas 上使用 `#202020`（Charcoal），较浅 sections 上使用 `#000000`
- Border: `0px 1px solid #202020` bottom borders，用于 section dividers
- Border-radius: 0px（完全 sharp corners）
- Shadow: minimal，使用 overlay opacity 表达 depth
- Content: full-bleed photography + white overlaid text

### Inputs & Forms
- Marketing site 上 form presence 极少
- Switch elements: border-radius 20px（唯一 rounded element），border 1px solid `#DDDDDD`
- Cookie banner input style: black 上使用 white text，并配 `#7D7D7D` borders

### Navigation
- **Desktop**: 中央 bull logo，左侧 "MENU" hamburger with icon，右侧 search icon + bookmarks icon
- **Background**: Transparent（继承 black page background）
- **Sticky**: Fixed to top，浮在内容上方
- **No visible borders or shadows**：元素漂浮在黑暗中
- **"MENU" label**: White text，14px weight 400，uppercase，伴随 hamburger icon
- **Hexagonal motifs**: Hero sections 上的 pause button 使用 hexagonal outline shape

### Image Treatment
- **Hero**: Full-viewport video sections（100vh），使用 cinematic event/vehicle footage
- **Event photography**: Lamborghini Arena events 的 full-bleed aerial shots
- **Vehicle imagery**: 深色背景上的 high-contrast studio shots，full-width
- **Aspect ratios**: 主要为 16:9 或更宽，保持 cinematic feel
- **Dark gradient overlays**: Video 顶部/底部边缘进行 subtle darkening，确保 text legibility

### Distinctive Components
- **Hexagonal Pause Button**: Video control 使用 hexagonal outline（匹配 typeface 的 brand geometric DNA），位于 hero sections 的 bottom-right
- **Progress Bar**: Hero sections 底部用 thin white line 指示 video/slide progress
- **Badge/Tag**: bg `#969696`, text white, padding 8px, fontSize 10px, borderRadius 2px，像 tiny metallic pills

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px
- **Full scale**: 2px, 4px, 5px, 8px, 10px, 12px, 15px, 16px, 20px, 24px, 32px, 40px, 48px, 56px
- **Button padding**: 16px（ghost），24px（gold accent）
- **Section padding**: 48-56px vertical，40px horizontal
- **Small spacing**: 2-5px 用于 fine adjustments（badge padding、border spacing）

### Grid & Container
- **Framework**: Bootstrap grid system（container + row + col）
- **Max width**: 1440px（largest breakpoint）
- **Columns**: Standard 12-column Bootstrap grid
- **Full-bleed**: Hero sections 脱离 grid，edge-to-edge 填满 viewport
- **Content areas**: 在 1200px max-width containers 内居中

### Whitespace Philosophy
Lamborghini 把 darkness 当作 whitespace。Content blocks 之间慷慨的 black expanses，与浅色设计中的 white space 扮演同样功能：创造 breathing room，让每个元素都获得 exhibit 的地位。一个漂浮在 black viewport 中央的 model name，拥有与白墙上 gallery piece 相同的 visual weight。Absence of color 本身就是 design。

### Border Radius Scale
| Value | Context |
|-------|---------|
| 0px | Default for everything — buttons, cards, containers, images |
| 1px | Subtle span elements |
| 2px | Badges, close buttons, cookie elements — barely perceptible |
| 20px | Toggle switches only — the sole rounded element |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 (Abyss) | `#000000` flat | Page background, deepest layer |
| Level 1 (Surface) | `#181818` or `#202020` | Cards, content panels, elevated sections |
| Level 2 (Overlay) | `rgba(0,0,0,0.7)` | Modal backdrops, video dimming |
| Level 3 (Fog) | `rgba(0,0,0,0.5)` | Lighter overlays, hover states |
| Level 4 (Mist) | `rgba(0,0,0,0.25)` | Subtle depth hints |

### Shadow Philosophy
Lamborghini 通过 surface color layering 而不是 shadows 获得 depth。在 black canvas 上，传统 drop shadows 不可见；因此系统通过从 absolute black 逐步切换到更浅的 dark grays 来创造 elevation：`#000000` -> `#181818` -> `#202020` -> `#494949`。这种 "darkness gradient" 方法意味着 elevated elements 字面上比周围更亮，反转了传统 shadow model。

### Decorative Depth
- Full-bleed video 通过 cinematic lighting 提供 atmospheric depth
- Hexagonal pause button 以 thin white outline stroke 漂浮
- Hero section 底部的 progress bars 创造细微 horizon line
- UI elements 不使用 gradients、glows 或 blur effects；photography 提供全部 visual richness

## 7. Do's and Don'ts

### Do
- 使用 absolute black（`#000000`）作为 primary background；绝不要用 dark gray 替代
- Lamborghini Gold（`#FFC000`）只用于 primary CTA buttons；绝不用于装饰
- 所有 display headings 使用 LamboType uppercase；brand voice 始终在 SHOUTING
- Buttons 和 cards 使用 zero border-radius；sharp angles 不可协商
- Display type 保持 tight line-heights（0.92-1.19），创造 dense、architectural text blocks
- 在 dark backgrounds 上使用 transparent ghost button（white border、50% opacity）作为 secondary CTA
- 让 full-viewport video/photography 承载情绪重量；UI 是 infrastructure，不是 decoration
- 将 hexagonal geometry 保留给 UI icons 和 video control button
- Headlines 使用 weight 400（regular）；typeface 足够 distinctive，不需要 bold emphasis
- Gray palette 保持 achromatic；所有 neutrals 都是无 color tinting 的 pure gray

### Don't
- 不要引入 gold 之外的额外 accent colors；monochrome-plus-gold system 是 sacred
- 不要给 buttons 或 cards 添加 border-radius；curved edges 会违背 angular vehicle aesthetic
- 不要把 LamboType 用作 italic 或 decorative styles；brand 始终 upright 且 direct
- 不要给 buttons 或 surfaces 添加 gradients；depth 来自 surface layering，不是 blending
- 不要把 light backgrounds 当作 primary canvas；darkness 是 default state，light 是 exception
- 不要在 display headings 中混入 lowercase；uppercase convention 传达 authority 和 power
- 不要添加 scale 或 translate hover animations；interaction 应只改变 color（background/opacity shifts）
- 不要把 Open Sans 用于 display text；所有可见 typography 必须由 LamboType 处理
- 不要创建包含许多小元素的 busy layouts；Lamborghini design 追求 singular、bold statements
- 不要给元素添加 shadows；在 black canvas 上 shadows 没意义，改用 surface color shifts

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | <425px | Single column, reduced type scale, stacked buttons |
| Mobile | 425-576px | Single column, hamburger nav, hero text ~40px |
| Tablet Small | 576-768px | 2-column grid begins, padding adjusts |
| Tablet | 768-1024px | 2-column layout, expanded hero, vehicle cards side-by-side |
| Desktop | 1024-1280px | Full navigation, 3+ column grids, display text at 80px |
| Desktop Large | 1280-1440px | Full layout, hero at 120px display, max-width containers |
| Wide | >1440px | Content centered, margins expand, hero fills viewport |

### Touch Targets
- Gold CTA buttons: 最小高度 48px+，padding 24px（超过 WCAG 44x44px）
- Ghost buttons: 48px+，padding 16px
- Hamburger menu: 大 touch target（约 48px square）
- Hexagonal pause button: 约 48px diameter

### Collapsing Strategy
- **Navigation**: 始终基于 hamburger（"MENU" + icon），任何 breakpoint 都不展开为 horizontal nav
- **Hero video**: 所有 breakpoints 都保持 full-viewport height，并调整 object-fit
- **Display type**: 从 120px（desktop）缩放到 80px（tablet），再到 54px/40px（mobile）
- **Button layout**: Desktop 上 side-by-side，mobile 上 vertical stack
- **Grid columns**: 3-column -> 2-column -> 1-column progression
- **Section spacing**: Vertical padding 从 56px -> 40px -> 24px 递减

### Image Behavior
- Hero videos 使用 `object-fit: cover`，在所有尺寸保持 cinematic framing
- Vehicle images 在 containers 内按比例缩放并保持 aspect ratios
- Event photography 在窄屏上裁切到 viewport width
- Background images 在边缘变暗，以便在所有 viewports 上保持 text contrast

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: "Lamborghini Gold (#FFC000)"
- Background: "Absolute Black (#000000)"
- Surface: "Charcoal (#202020)"
- Heading text: "Pure White (#FFFFFF)"
- Body text: "Ash (#7D7D7D)"
- Link hover: "Link Blue (#3860BE)"
- Accent: "Cyan Pulse (#29ABE2)"
- Border: "Pure White (#FFFFFF) at 50% opacity"

### Example Component Prompts
- "Create a hero section with a full-viewport black background, the model name 'TEMERARIO' in LamboType at 120px uppercase weight 400 white text with 0.92 line-height, centered vertically, with a Lamborghini Gold (#FFC000) 'Discover More' button below — sharp corners, 0px radius, 24px padding, black text"
- "Design a transparent ghost button with 1px solid white border at 50% opacity, white text at 14.4px uppercase with 0.2px letter-spacing, padding 16px, on a black background — hover state changes to Teal Action (#1EAEDB) background with 70% opacity"
- "Build a navigation bar with zero visible background on absolute black, a centered bull logo, 'MENU' text label with hamburger icon on the left, and search + bookmark icons on the right — all in white, sticky position"
- "Create a news card grid on charcoal (#202020) background with white headlines at 27px uppercase, body text in #7D7D7D at 16px, and a white underlined 'Read More' link that turns #3860BE on hover"
- "Design a section divider using a 1px solid bottom border in #202020 on a black canvas — the elevation difference is purely through surface color shift, not shadow"

### Iteration Guide
使用此 design system 细化既有 screens 时：
1. 一次只聚焦 ONE component；Lamborghini 的 system 很极端，每个元素都必须有 aggressive 的感觉
2. 引用本文中的 specific color names 和 hex codes；palette 只有大约 5 个 active colors
3. 使用 natural language descriptions，而不是 CSS values；写 "sharp-cut golden rectangle"，不要写 "border-radius: 0px; background: #FFC000"
4. 在具体 measurements 之外描述 desired "feel"；"floating in total darkness" 比 "background: #000000" 更能传达 black canvas
5. 记住 UPPERCASE IS THE DEFAULT；display sizes 中的 text 如果不是 uppercase，大概率就应该改成 uppercase
