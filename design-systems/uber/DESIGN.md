# Design System Inspired by Uber

> Category: Media & Consumer
> Mobility platform。大胆黑白、紧凑 type、urban energy。

## 1. Visual Theme & Atmosphere

Uber 的 design language 是 confident minimalism 的范例：一个 black-and-white universe，每个 pixel 都有目的，任何装饰都必须配得上它的位置。整个体验建立在鲜明二元性上：jet black（`#000000`）和 pure white（`#ffffff`），几乎没有 mid-tone grays 来稀释信息。这不是还没设计完的 startup 那种 sterile minimalism，而是一个成熟品牌有底气低声说话时的 deliberate restraint。

标志性字体 UberMove 是 proprietary geometric sans-serif，带有明确的 square、engineered 气质。52px 的 UberMove Bold headlines 有 billboard 的重量 —— 权威、直接、毫不道歉。配套字体 UberMoveText 负责 body copy 和 buttons，在 medium weight（500）下更柔和、更易读。它们共同构成一个像 transit map 一样的 typographic system：清晰、高效、适合高速扫读。

真正让 Uber design 与众不同的是 full-bleed photography / illustration 与 pill-shaped interactive elements（999px border-radius）的组合。Navigation chips、CTA buttons、category selectors 都共享这种 capsule shape，形成触感明确、拇指友好的 interface language，一眼就是 Uber。Illustrations —— drivers、riders 和 cityscapes 的温暖、轻微风格化场景 —— 为原本可能冷峻的 monochrome system 注入人味。站点在 white content sections 与 full-black footer 之间切换；card-based layouts 使用尽可能轻的 shadows（rgba(0,0,0,0.12-0.16)）制造 subtle lift，同时不破坏 flat aesthetic。

**Key Characteristics:**
- Pure black-and-white foundation，UI chrome 几乎没有 mid-tone grays
- UberMove（headlines）+ UberMoveText（body/UI）—— proprietary geometric sans-serif family
- 一切 pill-shaped：buttons、chips、nav items 都使用 999px border-radius
- 温暖、具有人味的 illustrations，与 stark monochrome interface 形成对比
- Card-based layout 使用 whisper-soft shadows（0.12-0.16 opacity）
- 8px spacing grid，layout 紧凑且 information-dense
- Bold photography 作为 full-bleed hero backgrounds 集成
- Black footer 以 dark、high-contrast environment 锚定页面

## 2. Color Palette & Roles

### Primary
- **Uber Black** (`#000000`): 定义品牌的颜色 —— 用于 primary buttons、headlines、navigation text 和 footer。不是 "near-black" 或 "off-black"，而是真正不妥协的 black。
- **Pure White** (`#ffffff`): Primary surface color 和 inverse text。用于 page backgrounds、card surfaces 以及 black elements 上的 text。

### Interactive & Button States
- **Hover Gray** (`#e2e2e2`): White button hover state —— 干净、偏冷的 light gray，提供清晰反馈但不带 warmth。
- **Hover Light** (`#f3f3f3`): Elevated white buttons 的 subtle hover —— 几乎不可察的 gray，用于温和 interaction feedback。
- **Chip Gray** (`#efefef`): Secondary/filter buttons 和 navigation chips 的 background —— neutral、ultra-light gray。

### Text & Content
- **Body Gray** (`#4b4b4b`): Secondary text 和 footer links —— 真正的 mid-gray，不偏 warm 或 cool。
- **Muted Gray** (`#afafaf`): Tertiary text、de-emphasized footer links 和 placeholder content。

### Borders & Separation
- **Border Black** (`#000000`): Structural containment 的 thin 1px borders —— 谨慎用于 dividers 和 form containers。

### Shadows & Depth
- **Shadow Light** (`rgba(0, 0, 0, 0.12)`): Standard card elevation —— content cards 的 featherweight lift。
- **Shadow Medium** (`rgba(0, 0, 0, 0.16)`): Floating action buttons 和 overlays 的稍强 elevation。
- **Button Press** (`rgba(0, 0, 0, 0.08)`): Secondary buttons active/pressed states 的 inset shadow。

### Link States
- **Default Link Blue** (`#0000ee`): 带 underline 的 standard browser blue，用于 body content。
- **Link White** (`#ffffff`): Dark surfaces 上的 links —— 用于 footer 和 dark sections。
- **Link Black** (`#000000`): Light surfaces 上带 underline decoration 的 links。

### Gradient System
Uber 的 design **完全 gradient-free**。Black/white duality 和 flat color blocks 构成全部 visual hierarchy。System 中任何地方都不出现 gradients —— 每个 surface 都是 solid color，每个 transition 都是 hard edge 或 shadow。

## 3. Typography Rules

### Font Family
- **Headline / Display**: `UberMove`，fallbacks: `UberMoveText, system-ui, Helvetica Neue, Helvetica, Arial, sans-serif`
- **Body / UI**: `UberMoveText`，fallbacks: `system-ui, Helvetica Neue, Helvetica, Arial, sans-serif`

*Note: UberMove 和 UberMoveText 是 proprietary typefaces。外部实现可使用 `system-ui` 或 Inter 作为最接近的可用替代。UberMove 的 geometric、square-proportioned character 可用 Inter 或 DM Sans 近似。*

### Hierarchy

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| Display / Hero | UberMove | 52px (3.25rem) | 700 | 1.23 (tight) | Maximum impact，billboard presence |
| Section Heading | UberMove | 36px (2.25rem) | 700 | 1.22 (tight) | Major section anchors |
| Card Title | UberMove | 32px (2rem) | 700 | 1.25 (tight) | Card 和 feature headings |
| Sub-heading | UberMove | 24px (1.5rem) | 700 | 1.33 | Secondary section headers |
| Small Heading | UberMove | 20px (1.25rem) | 700 | 1.40 | Compact headings、list titles |
| Nav / UI Large | UberMoveText | 18px (1.13rem) | 500 | 1.33 | Navigation links、prominent UI text |
| Body / Button | UberMoveText | 16px (1rem) | 400-500 | 1.25-1.50 | Standard body text、button labels |
| Caption | UberMoveText | 14px (0.88rem) | 400-500 | 1.14-1.43 | Metadata、descriptions、small links |
| Micro | UberMoveText | 12px (0.75rem) | 400 | 1.67 (relaxed) | Fine print、legal text |

### Principles
- **Bold headlines, medium body**: UberMove headings 只使用 weight 700（bold）—— 每个 headline 都有 billboard 级冲击力。UberMoveText body 和 UI text 使用 400-500，通过 weight contrast 建立清晰 visual hierarchy。
- **Tight heading line-heights**: 所有 headlines 使用 1.22-1.40 的 line-heights —— compact and punchy，为扫读而不是长读设计。
- **Functional typography**: 任何地方都没有 decorative type treatment。No letter-spacing、no text-transform、no ornamental sizing。每个 text element 都服务直接沟通目的。
- **Two fonts, strict roles**: UberMove 只用于 headings。UberMoveText 只用于 body、buttons、links 和 UI。边界永不跨越。

## 4. Component Stylings

### Buttons

**Primary Black (CTA)**
- Background: Uber Black (`#000000`)
- Text: Pure White (`#ffffff`)
- Padding: 10px 12px
- Radius: 999px（full pill）
- Outline: none
- Focus: inset ring `rgb(255,255,255) 0px 0px 0px 2px`
- Primary action button —— bold、high-contrast、unmissable

**Secondary White**
- Background: Pure White (`#ffffff`)
- Text: Uber Black (`#000000`)
- Padding: 10px 12px
- Radius: 999px（full pill）
- Hover: background 切到 Hover Gray（`#e2e2e2`）
- Focus: background 切到 Hover Gray，并出现 inset ring
- 用于 dark surfaces，或作为 Primary Black 旁边的 secondary action

**Chip / Filter**
- Background: Chip Gray (`#efefef`)
- Text: Uber Black (`#000000`)
- Padding: 14px 16px
- Radius: 999px（full pill）
- Active: inset shadow `rgba(0,0,0,0.08)`
- Navigation chips、category selectors、filter toggles

**Floating Action**
- Background: Pure White (`#ffffff`)
- Text: Uber Black (`#000000`)
- Padding: 14px
- Radius: 999px（full pill）
- Shadow: `rgba(0,0,0,0.16) 0px 2px 8px 0px`
- Transform: `translateY(2px)` slight offset
- Hover: background 切到 `#f3f3f3`
- Map controls、scroll-to-top、floating CTAs

### Cards & Containers
- Background: white pages 上使用 Pure White（`#ffffff`）；不做明显 card background differentiation
- Border: 默认 none —— cards 由 shadow 定义，而非 stroke
- Radius: standard content cards 使用 8px；featured/promoted cards 使用 12px
- Shadow: standard lift 使用 `rgba(0,0,0,0.12) 0px 4px 16px 0px`
- Cards content-dense，internal padding 极少
- Image-led cards 使用 full-bleed imagery，text 可 overlay 或置于下方

### Inputs & Forms
- Text: Uber Black (`#000000`)
- Background: Pure White (`#ffffff`)
- Border: 1px solid Black (`#000000`) —— visible borders 明显出现的唯一位置
- Radius: 8px
- Padding: standard comfortable spacing
- Focus: 无自定义提取 focus state —— 依赖 standard browser focus ring

### Navigation
- Sticky top navigation，white background
- Logo: Uber wordmark/icon，24x24px，black
- Links: UberMoveText 14-18px、weight 500、Uber Black
- Category navigation（"Ride", "Drive", "Business", "Uber Eats"）使用 Chip Gray（`#efefef`）background 的 pill-shaped nav chips
- Menu toggle: 50% border-radius 的 circular button
- Mobile: hamburger menu pattern

### Image Treatment
- 温暖、手绘感 scenes（feature sections 不用 photographs）
- Illustration style: 轻微风格化的人物、illustrations 内的 warm color palette、contemporary vibe
- Hero sections 使用 bold photography 或 illustration 作为 full-width backgrounds
- App download CTAs 使用 QR codes
- Contained cards 中所有 imagery 使用标准 8px 或 12px border-radius

### Distinctive Components

**Category Pill Navigation**
- Top-level navigation（"Ride", "Drive", "Business", "Uber Eats", "About"）使用 horizontal row of pill-shaped buttons
- 每个 pill: Chip Gray background、black text、999px radius
- Active state 通过 black background + white text（inversion）表达

**Hero with Dual Action**
- Split hero: text/CTA on left，map/illustration on right
- Pickup/destination 两个 input fields side by side
- "See prices" CTA button 使用 black pill

**Plan-Ahead Cards**
- 推广 "Uber Reserve" 和 trip planning 等 features 的 cards
- Illustration-heavy，强调 warm、human-centric imagery
- 底部使用 black CTA buttons with white text

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4px、6px、8px、10px、12px、14px、16px、18px、20px、24px、32px
- Button padding: 10px 12px（compact）或 14px 16px（comfortable）
- Card internal padding: 约 24-32px
- Section vertical spacing: generous but efficient —— major sections 之间约 64-96px

### Grid & Container
- Max container width: 约 1136px，centered
- Hero: split layout，text left、visual right
- Feature sections: 2-column card grids 或 full-width single-column
- Footer: black background 上的 multi-column link grid
- Full-width sections 延伸到 viewport edges

### Whitespace Philosophy
- **Efficient, not airy**: Uber 的 whitespace 是 functional —— 足以分隔，绝不空旷。这是 transit-system spacing：compact、clear、purpose-driven。
- **Content-dense cards**: Cards 紧凑承载信息，internal spacing 极少，依赖 shadow 和 radius 定义边界。
- **Section breathing room**: Major sections 有 generous vertical spacing，但 sections 内部 elements 紧密分组。

### Border Radius Scale
- Sharp (0px): Interactive elements 中不使用 square corners
- Standard (8px): Content cards、input fields、listboxes
- Comfortable (12px): Featured cards、larger containers、link cards
- Full Pill (999px): 所有 buttons、chips、navigation items、pills
- Circle (50%): Avatar images、icon containers、circular controls

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, solid background | Page background、inline content、text sections |
| Subtle (Level 1) | `rgba(0,0,0,0.12) 0px 4px 16px` | Standard content cards、feature blocks |
| Medium (Level 2) | `rgba(0,0,0,0.16) 0px 4px 16px` | Elevated cards、overlay elements |
| Floating (Level 3) | `rgba(0,0,0,0.16) 0px 2px 8px` + translateY(2px) | Floating action buttons、map controls |
| Pressed (Level 4) | `rgba(0,0,0,0.08) inset` (999px spread) | Active/pressed button states |
| Focus Ring | `rgb(255,255,255) 0px 0px 0px 2px inset` | Keyboard focus indicators |

**Shadow Philosophy**: Uber 只把 shadow 当作 structural tool，绝不用作 decoration。Shadows 始终是极低 opacity（0.08-0.16）的 black，提供分隔 content layers 所需的最低限度 lift。Blur radii 适中（8-16px）—— 足够自然，但绝不 dramatic。没有 colored shadows，没有 layered shadow stacks，也没有 ambient glow effects。Depth 更多通过 black/white section contrast，而不是 shadow elevation 传达。

## 7. Do's and Don'ts

### Do
- 使用 true black（`#000000`）和 pure white（`#ffffff`）作为 primary palette —— stark contrast 本身就是 Uber
- 所有 buttons、chips 和 pill-shaped navigation elements 都使用 999px border-radius
- 所有 headings 保持 UberMove Bold（700），制造 billboard-level impact
- Card elevation 使用 whisper-soft shadows（0.12-0.16 opacity）—— barely visible
- 保持 compact、information-dense layout style —— Uber 优先 efficiency，而不是 airiness
- 使用 warm、human-centric illustrations 柔化 monochrome interface
- Content cards 使用 8px radius，featured containers 使用 12px
- Navigation 和 prominent UI text 使用 UberMoveText weight 500
- Dual-action layouts 中将 black primary buttons 与 white secondary buttons 配对

### Don't
- 不要向 UI chrome 引入颜色 —— Uber interface 严格限制为 black、white 和 gray
- Buttons 不要使用小于 999px 的 rounded corners —— full-pill shape 是 core identity element
- 不要使用 heavy shadows 或 high opacity drop shadows —— depth 应 whisper-subtle
- 不要在任何地方使用 serif fonts —— Uber typography 完全是 geometric sans-serif
- 不要创建 excessive whitespace 的 airy、spacious layouts —— Uber 的 density 是刻意的
- 不要使用 gradients 或 color overlays —— 每个 surface 都是 flat、solid color
- 不要把 UberMove 混入 body text，也不要把 UberMoveText 混入 headlines —— hierarchy 很严格
- 不要使用 decorative borders —— borders 要么 functional（inputs、dividers），要么完全 absent
- 不要用 off-whites 或 near-blacks 柔化 black/white contrast —— 这种 duality 是 deliberate

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | 320px | Minimum layout，single column，stacked inputs，compact typography |
| Mobile | 600px | Standard mobile，stacked layout，hamburger nav |
| Tablet Small | 768px | Two-column grids 开始，expanded card layouts |
| Tablet | 1119px | Full tablet layout，side-by-side hero content |
| Desktop Small | 1120px | Desktop grid 启用，horizontal nav pills |
| Desktop | 1136px | Full desktop layout，maximum container width，split hero |

### Touch Targets
- All pill buttons: minimum 44px height（10-14px vertical padding + line-height）
- Navigation chips: 14px 16px generous padding，方便 thumb tapping
- Circular controls（menu、close）: 50% radius 确保 targets 大且易点
- Mobile 上 card surfaces 作为 full-area touch targets

### Collapsing Strategy
- **Navigation**: Horizontal pill nav collapse 为带 circular toggle 的 hamburger menu
- **Hero**: Split layout（text + map/visual）stack 为 single column —— text above，visual below
- **Input fields**: Side-by-side pickup/destination inputs 垂直堆叠
- **Feature cards**: 2-column grid collapse 为 full-width stacked cards
- **Headings**: 52px display 逐级缩小到 36px、32px、24px、20px
- **Footer**: Multi-column link grid collapse 为 accordion 或 stacked single column
- **Category pills**: 小屏上使用 horizontal scroll with overflow

### Image Behavior
- Illustrations 在 containers 内 proportional scale
- Hero imagery 保持 aspect ratio，小屏可能 crop
- QR code sections 在 mobile 上隐藏（app download 转为 direct store links）
- Card imagery 在所有尺寸上保持 8-12px border radius

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary Button: "Uber Black (#000000)"
- Page Background: "Pure White (#ffffff)"
- Button Text (on black): "Pure White (#ffffff)"
- Button Text (on white): "Uber Black (#000000)"
- Secondary Text: "Body Gray (#4b4b4b)"
- Tertiary Text: "Muted Gray (#afafaf)"
- Chip Background: "Chip Gray (#efefef)"
- Hover State: "Hover Gray (#e2e2e2)"
- Card Shadow: "rgba(0,0,0,0.12) 0px 4px 16px"
- Footer Background: "Uber Black (#000000)"

### Example Component Prompts
- "创建一个 hero section，使用 Pure White (#ffffff) 背景，headline 为 52px UberMove Bold (700)、line-height 1.23。Text 使用 Uber Black (#000000)。添加 subtitle：Body Gray (#4b4b4b)，16px UberMoveText weight 400，1.50 line-height。放置 Uber Black (#000000) pill CTA button，Pure White text，999px radius，padding 10px 12px。"
- "设计 category navigation bar，使用 horizontal pill buttons。每个 pill：Chip Gray (#efefef) background、Uber Black (#000000) text、14px 16px padding、999px border-radius。Active pill invert 为 Uber Black background with Pure White text。使用 UberMoveText 14px weight 500。"
- "构建 feature card：Pure White (#ffffff)，8px border-radius，shadow rgba(0,0,0,0.12) 0px 4px 16px。Title 使用 UberMove 24px weight 700，description 使用 Body Gray (#4b4b4b) 16px UberMoveText。底部添加 black pill CTA button。"
- "创建 dark footer：Uber Black (#000000) 背景，Pure White (#ffffff) heading text 使用 UberMove 20px weight 700。Footer links 使用 Muted Gray (#afafaf) 14px UberMoveText。Links hover 到 Pure White。Multi-column grid layout。"
- "设计 floating action button：Pure White (#ffffff) background，999px radius，14px padding，shadow rgba(0,0,0,0.16) 0px 2px 8px。Hover 切到 #f3f3f3。用于 scroll-to-top 或 map controls。"

### Iteration Guide
1. 一次专注 ONE component
2. 引用严格 black/white palette —— 说 "use Uber Black (#000000)"，不要说 "make it dark"
3. 始终为 buttons 和 pills 指定 999px radius —— 这是 Uber identity 的 non-negotiable
4. 明确描述 font family —— "UberMove Bold for the heading, UberMoveText Medium for the label"
5. Shadows 使用 "whisper shadow (rgba(0,0,0,0.12) 0px 4px 16px)" —— 永远不要 heavy drop shadows
6. 保持 layout compact 且 information-dense —— Uber 是 efficient，不是 airy
7. Illustrations 应 warm and human —— 描述 "stylized people in warm tones"，不要 abstract shapes
8. 在 dual-action layouts 中将 black CTAs 与 white secondaries 配对
