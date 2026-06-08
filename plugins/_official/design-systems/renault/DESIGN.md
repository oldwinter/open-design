# Inspired by Renault 的 Design System

> Category: Automotive
> 法国汽车品牌。鲜活 aurora gradients、NouvelR typography、大胆能量感。

## 1. Visual Theme & Atmosphere

Renault 的网站像一个鲜活的数字 showroom，在法国汽车优雅感与大胆、前倾的能量之间取得平衡，不同于德国或意大利豪华品牌常见的单色克制。页面以 full-screen hero 开场，铺满 viewport 的 sweeping aurora gradient 像色带一样横跨画面，magenta、violet 与 teal 在戏剧化打光的车辆背后交融。这种色彩表达是网站的标志：界面结构很克制（NouvelR typography、black-and-white CTA framework、zero-radius buttons），但内容充满活力，包括 hero slides 上的 gradient washes、饱和车辆摄影，以及 Renault Yellow (`#EFDF00`) 在重点 CTAs 上的点睛使用。最终效果是一座充满能量而非安静肃穆的 showroom。

布局遵循 card-based editorial rhythm。Hero carousel 下方，内容被组织为 PromoCards grid，每张卡都是 full-bleed photographic panel，顶部带 dark gradient overlay（从 `rgba(0,0,0,0.6)` 渐隐到 transparent），确保 vivid imagery 上的白色 heading text 保持可读。这些 cards 在 light 和 dark modes 之间交替：白色 editorial panels 配黑色文本，与黑色 `is-alternative-mode` sections 上的白色文本相邻，形成类似棋盘的视觉节奏。Grid 很宽裕，大尺寸 card formats 占据主导，让每款车型或 campaign 都拥有自己的视觉领地。下方 sections 转入完全深色画布（Absolute Black backgrounds），用于 E-Tech electric 和 technology showcases，形成刻意的情绪切换：电气化生活在暗色中，传统内容生活在亮色中。

Typography 统一采用 NouvelR，这是 Black[Foundry] 为 Renault rebrand 独家设计的 proprietary geometric sans-serif。Typeface 有一个独特的 "radical r"，末端以 28 degrees 切割，以呼应 Renault diamond logo 的角度。它提供从 Light 到 Extrabold 的 6 种 weights，网站主要使用 Bold (700) 做 headings、Regular (400) 做 body。Display headlines 很大，hero titles 使用 56px/0.95 line-height，形成紧密、有冲击力的文本块。该字体支持 Latin、Greek、Cyrillic、Hebrew、Arabic 和 Korean，呼应 Renault 的全球市场覆盖。所有文本渲染都显得精确而工程化，几何比例带来现代感，与 Renault 的 electric-first brand positioning 对齐。

**Key Characteristics:**
- Full-screen hero carousel，在车辆 imagery 背后使用鲜明 aurora gradient backgrounds（magenta/violet/teal）
- NouvelR proprietary typeface，带有匹配 diamond logo geometry 的 28-degree "radical r" 切口
- Renault Yellow (`#EFDF00`) 作为 super-primary accent，只在最高优先级 CTAs 上克制使用
- 所有 buttons 都是 zero border-radius，用锐利矩形表达 precision engineering
- Card-based editorial grid，使用 full-bleed photography 与 dark gradient overlays
- 二元 black/white CTA system：primary（black bg/white text）和 ghost（transparent/white border）
- PromoCard dark-mode alternation 在 light/dark sections 之间形成棋盘节奏
- PrimeReact（21 components）+ Element Plus（19 components）驱动 interactive elements
- Link hover state 使用 Renault Blue (`#1883FD`)——唯一 chromatic interaction color

## 2. Color Palette & Roles

### Primary
- **Renault Yellow** (`#EFDF00`): 品牌 signature Pantone，鲜明饱和的黄色，用于 super-primary CTAs 和最高优先级 action buttons。在 `.is-cta-super-primary` class 上作为 `--CtaLink-background-color` 出现。承载 diamond logo 的能量。
- **Absolute Black** (`#000000`): Primary button background、浅色表面 heading text，以及主导深色 section surface。是整个界面的结构锚点。
- **Pure White** (`#FFFFFF`): Editorial content 的 primary surface、inverted button backgrounds、hero text color，以及主导 light-mode canvas（--rt-color-white）。

### Secondary & Accent
- **Soft Yellow** (`#F8EB4C`): Renault Yellow 更浅、更暖的变体，用于 yellow CTAs 的 hover/pressed states 和次级 accent 语境。
- **Renault Blue** (`#1883FD`): 所有 link variants 的 link hover color，明亮自信，传达 interactivity，同时不与黄色 brand accent 竞争。
- **Warm Gray** (`#D9D9D6`): 细微的暖中性色，用于 disabled states、inactive UI elements 和 soft borders，带一点温度，区别于冷灰。

### Surface & Background
- **Pure White** (`#FFFFFF`): Page background、light editorial sections、navigation bar 和 footer。
- **Absolute Black** (`#000000`): Hero backgrounds、PromoCard dark-mode sections（`is-alternative-mode`）和 E-Tech showcase areas。
- **Charcoal** (`#222222`): Text-heavy dark sections 和 footer sub-regions 的次级深色表面（--rt-color-dark）。
- **Pale Silver** (`#F2F2F2`): 用于 section differentiation 和 card borders 的细微 alternate light surface。

### Neutrals & Text
- **Absolute Black** (`#000000`): 浅色表面上的 primary heading 和 body text，Renault 使用 true black 而不是 near-black。
- **Pure White** (`#FFFFFF`): 深色表面上的 primary text，包括 hero headlines、dark-section headings 和 inverted button labels。
- **Warm Gray** (`#D9D9D6`): Tertiary text、metadata 和 subdued labels。
- **Border Gray** (`#D1D1D1`): Input field borders 和 subtle separators。

### Semantic & Accent
- **Success Green** (`#8DC572`): Positive status indicators 和 confirmation messages（--rt-color-success）。
- **Error Rose** (`#BE6464`): Form validation errors 和 warning states（--rt-color-error）。
- **Warning Amber** (`#F0AD4E`): Cautionary alerts 和 attention-requiring states（--rt-color-warning）。
- **Info Blue** (`#337AB7`): Informational callouts 和 neutral status messaging（--rt-color-info）。

### Gradient System
- **Hero Aurora**: Sweeping multi-color gradients（magenta -> violet -> teal）应用于 hero slide backgrounds，是网站最具识别度的视觉元素。这些是 photographic/composited，而不是 CSS gradients。
- **PromoCard Overlay**: `linear-gradient(rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%)`，应用于 card tops，确保 photography 上的 heading text 可读。
- 不在 surfaces 上使用 flat CSS gradients；depth 来自 photographic treatment 和 black/white alternation。

## 3. Typography Rules

### Font Family
- **NouvelR**: 唯一 typeface。Black[Foundry] 为 Renault 2021+ rebrand 设计的 proprietary geometric sans-serif。拥有独特 "radical r"，末端以 28-degree 切割，匹配 diamond logo angle。提供 6 种 weights（Light to Extrabold），支持 6 个 writing systems。Fallback: `sans-serif`。CSS 中声明为 `"NouvelR, sans-serif"`。
- **No secondary typeface**: 不同于 Ferrari（FerrariSans + Body-Font）或 Lamborghini（LamboType + Open Sans），Renault 在所有文本上使用单一 font family，包括 headings、body、buttons、captions 和 navigation。

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Hero Title | 56px (3.50rem) | 700 | 0.95 (53.2px) | normal | NouvelR, white on dark hero, all-caps model names |
| Section Heading | 40px (2.50rem) | 700 | 0.95 (38px) | normal | NouvelR, PromoCard headings on dark/light sections |
| Card Heading | 32px (2.00rem) | 700 | 0.95 | normal | NouvelR, medium-scale card headings |
| Subheading | 24px (1.50rem) | 700 | 0.95 | normal | NouvelR, section sub-titles |
| Module Title | 21.92px (1.37rem) | 600 | 1.20 | normal | NouvelR, component headings |
| Content Title | 20px (1.25rem) | 700 | 0.95 | normal | NouvelR, smaller section titles |
| UI Heading | 19.2px (1.20rem) | 600 | 1.30 | normal | NouvelR, card UI headings |
| Emphasis | 18px (1.13rem) | 700 | 1.00 | normal | NouvelR, emphasized inline text and links |
| Body Heading | 16px (1.00rem) | 700 | 1.40 | normal | NouvelR, paragraph-level headings |
| Body Text | 14px (0.88rem) | 400 | 1.40 | normal | NouvelR, paragraph and descriptive content |
| Body Bold | 14px (0.88rem) | 700 | 1.57 | normal | NouvelR, emphasized body text |
| Button Label | 14.4px (0.90rem) | 700 | 1.00 | 0.144px | NouvelR, primary button text |
| Nav Link | 13px (0.81rem) | 700 | 1.50 | normal | NouvelR, navigation and footer links |
| Caption | 12.8px (0.80rem) | 400 | 1.10 | normal | NouvelR, small descriptive text |
| Small Label | 12px (0.75rem) | 700 | 1.00 | normal | NouvelR, labels and tags |
| Micro Text | 10px (0.63rem) | 700 | 1.45 | normal | NouvelR, smallest UI text, legal fine print |
| Micro Caption | 8.5px (0.53rem) | 400 | normal | normal | NouvelR, absolute smallest text (legal) |

### Principles
- **Single-family discipline**: NouvelR 承担从 56px hero headlines 到 8.5px legal captions 的全部文本。字体的几何精确性让它能跨越极端尺寸而不丢失性格。
- **Bold-default headings**: Weight 700 主导 heading hierarchy。不同于使用 medium (500) 做 headings 的品牌，Renault 的 Bold weight 创造出更果断、更有能量的阅读体验。
- **Ultra-tight display line-heights**: Hero 和 section headings 使用 0.95 line-height，行距几乎相撞，形成压缩、有力、现代的 typographic texture。
- **28-degree radical r**: Typeface 的标志细节，小写 "r" 的末端精确以 28 degrees 切割，镜像 Renault diamond logo 的角度，把品牌身份嵌入每个词。
- **Capitalize transform on captions**: 部分 caption text 使用 `text-transform: capitalize` 做 editorial labeling，而 micro text 使用 `lowercase`，这是用于层级信号的刻意反转。

## 4. Component Stylings

### Buttons
Renault 的 buttons 是 sharp-edged rectangles，zero border-radius，就像冲压金属车身面板的工业精度。

**Super Primary (Yellow)** - 最高强调级 CTA:
- Default: bg `#EFDF00` (Renault Yellow), text `#000000`, borderRadius 0px, padding 10px 15px, border 1px solid `#EFDF00`
- Inverted: bg `#EFDF00`, text `#000000`，在深色背景上使用相同 yellow
- fontSize 16px (NouvelR), fontWeight 700, minHeight 46px, minWidth 46px
- Used for: Primary conversion actions（configure, buy now）

**Primary (Black)** - 默认 action button:
- Default: bg `#000000`, text `#FFFFFF`, borderRadius 0px, padding 10px 15px, border 1px solid `#000000`
- Inverted: bg `#FFFFFF`, text `#000000`, border 1px solid `#FFFFFF`，深色背景上的 white fill
- fontSize 16px (NouvelR), fontWeight 700
- Used for: "keshfedin" (explore), secondary conversion actions

**Ghost** - Transparent outline button:
- Default (on dark): bg transparent, text `#FFFFFF`, border 1px solid `#FFFFFF`, borderRadius 0px, padding 10px 15px
- Default (on light): bg transparent, text `#000000`, border 1px solid `#000000`
- fontSize 16px (NouvelR), fontWeight 700
- Used for: "ilk sen ogren" (be the first to know), "satin alin" (buy), secondary actions

**Text Link** - Inline navigation:
- Default (light): text `#000000`, no border, no background
- Default (dark): text `#FFFFFF`
- Hover: color shifts to `#1883FD` (Renault Blue), text-decoration none
- 所有 link variants hover 到同一种 blue，提供一致的 interactive feedback

### Cards & Containers

**PromoCard (Light)** - Editorial content card:
- Background: white 或 transparent
- Full-bleed photography，顶部 dark gradient overlay: `linear-gradient(rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%)`
- Heading: NouvelR 40px/700，white text，位于 gradient 上方
- Border-radius: 0px，锐利矩形 containers
- No shadow, no visible border

**PromoCard (Dark / `is-alternative-mode`)** - Cinematic card:
- Background: `#000000` (Absolute Black)
- 使用同样的 gradient overlay treatment
- Heading: white NouvelR text
- CTA buttons: inverted primary（white bg）或 ghost（white border）

**VehicleRangeCard** - Vehicle showcase:
- Background: transparent
- Vehicle image 在上方，model name 和 price/spec 在下方
- No shadow, no border，干净 flat treatment
- Cards 之间通过 grid gap 留白

### Inputs & Forms

**Search/Text Input:**
- Background: `#FFFFFF`
- Text: `#000000`
- Border: 1px solid `#D1D1D1` (Border Gray)
- Border-radius: 50px（pill-shaped，是对 zero-radius button system 的少见偏离）
- Padding: 6px 35px 6px 15px（为 search icon 增加右侧 padding）
- Font: NouvelR, 12.8px
- Focus: standard browser focus ring

### Navigation
- **Desktop**: Renault diamond logo 居中/靠左，horizontal nav links，sticky positioning
- **Background**: white，静止状态无 shadow
- **Links**: NouvelR, 13px, weight 700, black text
- **Hover**: color shifts to `#1883FD` (Renault Blue)
- **Mobile**: Hamburger collapse to full-screen navigation drawer
- **CTA in nav**: 主要 conversion action 使用 Primary black button

### Image Treatment
- **Hero**: Full-viewport carousel，使用 dramatic aurora-gradient backgrounds 和 art-directed vehicle photography，edge-to-edge、无 padding
- **PromoCards**: Card bounds 内的 full-bleed photography，顶部 dark gradient overlay 提升文本可读性
- **Vehicle images**: Neutral/gradient backgrounds 上的 transparent-background renders
- **Aspect ratios**: 混合使用，从 square 到 wide panoramic；hero 约为 16:9 viewport
- **Lazy loading**: Below-fold sections 使用 lazy loading（framework-handled）

### Carousel Component
- 带 auto-advancing slides 的 full-screen hero carousel
- 每个 slide: background gradient/photo + vehicle image + headline + CTA buttons
- Dot indicators 表示 slide position
- Navigation arrows 位于 edges

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px（检测到的 system base）
- **Scale**: 1px, 4px, 5px, 6px, 6.25px, 8px, 10px, 12px, 13px, 15px, 16px, 20px, 24px, 32px, 40px
- **Button padding**: 10px 15px，所有 button variants 保持一致
- **Section padding**: Major content blocks 之间使用宽裕 vertical spacing（40-80px）
- **Card gaps**: Grid items 之间 16-24px
- **Minimum interactive size**: 46px（所有 buttons 的 minWidth 和 minHeight）

### Grid & Container
- **Max width**: 1440px（最大 defined breakpoint）
- **Hero**: Full-bleed、edge-to-edge、viewport-height
- **PromoCard grid**: 2-up 和 3-up layouts，混合 card sizes
- **Vehicle range**: Horizontal scrollable card row 或 grid
- **Footer**: 白色背景上的 multi-column layout

### Whitespace Philosophy
Renault 对 whitespace 的使用适中，比 Ferrari 更宽松，但不如 Tesla 那样极端。Card-based layout 让内容被组织进明确 containers，而不是漂浮在虚空中。视觉呼吸感主要来自大尺寸 card formats 和 full-bleed hero carousel，让每款车都有自己的 cinematic moment。Sections 之间 spacing 一致（32-40px），形成有节奏的滚动体验。Light 和 dark sections 的交替也会制造感知上的 whitespace，因为 mode switch 本身就是视觉分隔。

### Border Radius Scale
| Value | Context |
|-------|---------|
| 0px | All buttons, PromoCards, most containers，zero-radius default |
| 2px | Small UI elements (region controls) |
| 3px | Content panels (div, tabpanel) |
| 4px | Labels and tag elements |
| 46px | Pill-shaped elements (search input, filter chips) |
| 50px | Full pill for search/input fields |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 (Flat) | No shadow | Default for PromoCards, buttons, most containers |
| Level 1 (Soft) | `rgba(0,0,0,0.2) 0px 4px 8px` | Card hover states, subtle lift effect |
| Level 2 (Medium) | `rgba(0,0,0,0.2) 0px 0px 18px` | Floating UI elements, dropdown menus |
| Level 3 (Layered) | `rgba(0,0,0,0) 0px 2px 4px, rgba(50,50,93,0.1) 0px 7px 14px` | Compound shadow for elevated cards and modals |
| Level 4 (Deep) | `rgba(0,0,0,0.15) 0px 40px 80px` | Large floating panels, configurator overlays |
| Level 5 (Directional) | `rgba(0,0,0,0.2) 5px 5px 8px` | Offset directional shadow for specific components |
| Level 6 (Ambient) | `rgb(199,197,199) 0px 0px 12px 2px` | Ambient glow effect for highlighted elements |

### Shadow Philosophy
Renault 使用比 Ferrari 或 Tesla 更丰富的 shadow system，七个 distinct shadow tokens 反映出更 layered、dimensional 的界面。Shadows 从细微 4px hover lifts 递进到戏剧性的 80px deep panels。Compound shadow（Level 3）尤其精致，采用双层方式（tight dark shadow 加更宽的 purple-tinted `rgba(50,50,93,0.1)`），创造 photorealistic floating effect。Warm gray 的 ambient glow（Level 6）带来独特点缀，也连接到 Renault 更温暖的色彩性格。

### Decorative Depth
- **Hero aurora gradients**: 主要 decorative depth element，鲜明 color gradients 在车辆 imagery 背后制造 atmospheric depth
- **PromoCard overlays**: `linear-gradient(rgba(0,0,0,0.6) -> transparent)` 通过透明度在 cards 内创造 depth
- UI elements 上 **No blur effects**，depth 通过 shadow 和 color contrast 传达

## 7. Do's and Don'ts

### Do
- 只把 Renault Yellow (`#EFDF00`) 用于 super-primary CTAs，它承载 diamond logo identity 的全部重量
- 所有 buttons 保持 zero border-radius，sharp edges 在 Renault system 中不可协商
- 默认 heading weight 使用 NouvelR Bold (700)，这种果断 weight 是品牌 energetic personality 的核心
- 在 PromoCards 上应用 dark gradient overlay（`rgba(0,0,0,0.6) -> transparent`），确保 photography 上的文本可读
- Display text 保持 ultra-tight line-heights (0.95)，压缩质感显得紧迫而现代
- 在 black 与 white sections 之间交替，形成 signature chessboard rhythm
- 所有 link hover states 一致使用 `#1883FD` (Renault Blue)，只保留一个 interactive color signal
- 所有 buttons 的 minimum interactive size 设为 46x46px，把 accessibility 内建进 component spec
- Pill-shaped radius（46-50px）只保留给 search inputs 和 filter elements，不要用于 buttons
- 每张带有 text over photography 的 card 都使用 PromoCard gradient overlay

### Don't
- 不要把 Renault Yellow 用作 sections 或 surfaces 的 background color；它是 CTA signal，不是 atmosphere color
- 不要给 buttons 添加 border-radius；zero-radius rectangle 是核心 brand marker
- 不要使用 NouvelR 以外的任何 typeface；single-family discipline 是品牌支柱
- 不要在同一 section 混用多个 chromatic accent colors；palette 是 monochrome-plus-yellow
- 不要把 heading weights 放软到 400 或 500；NouvelR Bold 是 brand voice，较轻 weights 会显得 off-brand
- 不要给 PromoCards 或 content containers 添加 decorative borders；分隔来自 background color alternation
- 不要把 semantic colors（Success Green、Error Rose）用于装饰目的；它们只保留给 form states
- 不要把 56px hero size 用到 below the fold；hero typography scale 只属于 carousel
- 不要创建 rounded-pill buttons；pill shapes 只属于 inputs，绝不属于 action elements
- 不要在 UI surfaces 上使用 flat CSS gradients；唯一 gradients 应是 photographic hero auroras 和 text-legibility overlays

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | <=425px | Single-column, full-width cards, hero text scales to ~32px, stacked CTAs, hamburger nav |
| Mobile | 426-640px | Single-column, slightly larger cards, hero text at 32-40px |
| Tablet Small | 641-768px | 2-column PromoCard grid begins, hero maintains full-width |
| Tablet | 769-896px | Full 2-column layout, vehicle range shows 2-3 cards |
| Desktop Small | 897-1024px | Navigation fully expanded, hero at 56px, 2-up card grid |
| Desktop | 1025-1280px | Full layout, 3-up card grid, generous whitespace |
| Large Desktop | 1281-1440px | Maximum content width, centered container, hero at full cinematic scale |

### Touch Targets
- All buttons: minimum 46x46px (`minWidth: 46px, minHeight: 46px`)，超过 WCAG AAA 44x44px requirement
- Search input pill: 充足 touch target，50px border-radius 创造大面积可点击区域
- Navigation links: NouvelR 13px，items 之间有足够 spacing
- Carousel navigation: viewport edges 上的大 arrow targets

### Collapsing Strategy
- **Navigation**: Full horizontal nav 在移动端折叠为 Renault diamond logo + hamburger menu
- **Hero carousel**: 所有 breakpoints 都保持 full-width，headline 从 56px（desktop）缩放到约 32px（mobile）
- **PromoCard grid**: 随 viewport 变窄从 3-up -> 2-up -> single-column
- **Vehicle range**: 所有 sizes 保持 horizontal scroll，可见 cards 数量减少
- **CTA pairs**: 移动端 side-by-side buttons 垂直堆叠
- **Footer**: Multi-column 在移动端折叠为 single-column accordion

### Image Behavior
- Hero images: 所有 breakpoints 使用 full-bleed，并设置 `object-fit: cover`
- PromoCard images: 在 card containers 内 responsive，gradient overlay 按比例缩放
- Vehicle images: Transparent-background renders 在 grid cells 中按比例缩放
- Art direction: 移动端可能裁切为更紧的车辆视图，减少 environmental context

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA (Super): "Renault Yellow (#EFDF00)"
- Primary CTA (Default): "Absolute Black (#000000)"
- Background Light: "Pure White (#FFFFFF)"
- Background Dark: "Absolute Black (#000000)"
- Secondary Dark: "Charcoal (#222222)"
- Heading text (light bg): "Absolute Black (#000000)"
- Body text: "Absolute Black (#000000)"
- Link Hover: "Renault Blue (#1883FD)"
- Border: "Pale Silver (#F2F2F2)"
- Semantic Error: "Error Rose (#BE6464)"

### Example Component Prompts
- "Create a hero section with a full-viewport aurora gradient background (magenta to violet to teal), a centered vehicle image, a NouvelR Bold headline at 56px with 0.95 line-height in white, and two buttons: a Primary (white bg, black text, 0px radius) 'Explore' and a Ghost (transparent bg, white border, white text, 0px radius) 'Learn More'"
- "Design a PromoCard with a full-bleed photography background, a dark gradient overlay (rgba(0,0,0,0.6) top to transparent at 40%), a NouvelR Bold 40px white heading, a 14px body text line in white, and a Primary inverted button (white bg, black text, 0px radius, 10px 15px padding)"
- "Build a vehicle range grid with 3 columns on white background, each card showing a transparent-background car render above a NouvelR Bold 24px model name in black, a 14px price caption, and a ghost button (black border, black text, 0px radius) labeled 'Configure'"
- "Create a dark E-Tech section on Absolute Black (#000000) with a NouvelR Bold 40px white heading 'E-Tech electric powertrain', a 14px subtitle in white, and a Renault Yellow (#EFDF00) super-primary button with black text, 0px radius, and 10px 15px padding"
- "Design a search input as a pill-shaped field (50px border-radius) with white background, 1px solid #D1D1D1 border, NouvelR 12.8px text, 6px 35px 6px 15px padding, and a search icon positioned inside the right padding area"

### Iteration Guide
When refining existing screens generated with this design system:
1. 一次只聚焦 ONE component；Renault 的系统有清晰的 component boundaries（PromoCard、VehicleRangeCard、CTA variants）
2. 引用具体 color names 和 hex codes；palette 很小，但每种颜色都有精确功能
3. 使用自然语言描述，而不是 CSS values；"sharp zero-radius rectangle" 比 "border-radius: 0" 更能传达意图
4. 在具体 measurements 之外也描述期望的 feel；"assertive automotive energy" 比 "font-weight: 700" 更能传达 NouvelR Bold heading personality
5. 始终检查 section 应该是 light 还是 dark；chessboard alternation 是核心 pattern
6. 每屏只为 ONE button 保留 Renault Yellow；如果黄色出现在多个 CTA 上，层级就会崩塌
