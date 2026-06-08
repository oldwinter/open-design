# Inspired by Apple 的 Design System

> Category: Media & Consumer
> 消费电子。高级留白、SF Pro、电影感 imagery。

## 1. Visual Theme & Atmosphere

Apple 的 web language 是一个精密的 editorial system，在 gallery-like calm 与 retail-density information blocks 之间交替。视觉语气始终克制：宽阔的 neutral canvases、安静的 chrome，以及承担几乎全部表达重量的 product imagery。界面被设计成会自行消隐，让硬件、材质和 finish options 成为叙事前景。

在分析的五个页面中，节奏一致但并不单一。Marketing surfaces（homepage 和 Environment）使用电影化的 black-and-light chaptering，而 commerce surfaces（Store 和 Shop flows）引入更紧的 spacing、更多 utility controls 和更密集的 card stacks，同时不破坏核心 brand grammar。结果是一套系统拥有两档速度：showcase mode 与 transaction mode。

Typography 是稳定器。SF Pro Display 以 compact line heights 和 controlled tracking 承载 hero 与 merchandising hierarchy；SF Pro Text 处理 product metadata、navigation、filters 和密集 selection UI。Typography 始终低调，但 scale range 足够宽，既能支持 billboard hero messaging，也能支撑 micro utility labels。

**Key Characteristics:**
- 二元 section rhythm：deep black scenes (`#000000`) 与 pale neutral fields (`#f5f5f7`) 交替
- 单一 blue accent family 承担 action 和 link semantics（`#0071e3`, `#0066cc`, `#2997ff`）
- 同一系统内的双 operating modes：cinematic showcase modules 和 dense commerce configurators
- 高度依赖 imagery 和 material finishes；UI chrome 保持视觉上很薄
- Tight headline metrics（SF Pro Display, semibold）搭配 compact body/link typography（SF Pro Text）
- Pill 和 capsule geometry 是 signature action language（`18px` 到 `980px` 以及 circular controls）
- Depth 克制使用；contrast 和 surface separation 承担大部分 layering
- Multi-page color-block rhythm：black hero chapters -> pale neutral merchandising fields -> utility white retail surfaces -> dark micro-surfaces for controls

## 2. Color Palette & Roles

> **Source Pages:** `https://www.apple.com/`, `https://www.apple.com/environment/`, `https://www.apple.com/store`, `https://www.apple.com/shop/buy-iphone/iphone-17-pro`, `https://www.apple.com/shop/accessories/all`

### Primary
- **Absolute Black** (`#000000`): Immersive hero canvases、high-drama product chapters 和 deep UI anchors。
- **Pale Apple Gray** (`#f5f5f7`): Feature bands、comparison blocks 和 editorial transitions 的主要 light surface。
- **Near-Black Ink** (`#1d1d1f`): 浅色画布上的 primary text 和 dark-fill control color。

### Secondary & Accent
- **Apple Action Blue** (`#0071e3`): Primary action fill 和 focus-signaling brand accent。
- **Body Link Blue** (`#0066cc`): 为 long-form readability 优化的 inline link color。
- **High-Luminance Link Blue** (`#2997ff`): 用于较暗 scenes 中需要更强 contrast 的 bright link treatment。

### Surface & Background
- **Pure White Canvas** (`#ffffff`): Retail/product-list backgrounds 和 dense transactional sections。
- **Graphite Surface A** (`#272729`): Dark card 和 media-control context layer。
- **Graphite Surface B** (`#262629`): 用于 control groupings 的稍深 dark utility layer。
- **Graphite Surface C** (`#28282b`): Elevated dark supporting surfaces。
- **Graphite Surface D** (`#2a2a2c`): 用于更丰富 dark scenes 中分隔的最深 elevated step。

### Neutrals & Text
- **Secondary Neutral Gray** (`#6e6e73`): Body secondary copy、helper descriptions 和 tertiary metadata。
- **Soft Border Gray** (`#d2d2d7`): Dividers、subtle outlines 和 muted utility containment。
- **Mid Border Gray** (`#86868b`): Product-configuration 与 filter contexts 中更强的 field outlines。
- **Utility Dark Gray** (`#424245`): Store contexts 中 dark-neutral text/surface crossover。

### Semantic & Accent
- **Selection/Focus Signal** (`#0071e3`): Marketing 和 commerce contexts 共享的 focus 与 selected-state signal。
- **Error/Warning/Success**: 在抽取的 surface set 中没有持续可见的独立 semantic palette。

### Gradient System
- 抽取的页面几乎完全由 solid-surface 驱动。视觉丰富度来自 photography 和 finish rendering，而不是持久 UI gradients。

## 3. Typography Rules

### Font Family
- **Display Family:** `SF Pro Display`, fallbacks `SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif`
- **Text Family:** `SF Pro Text`, fallbacks `SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif`
- **Usage Split:** Display family 处理 hero/product headlines 和 merchandising headings；Text family 处理 navigation、controls、labels 和 dense commerce copy。

### Hierarchy
| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Hero Display XL | 80px | 600 | 1.00-1.05 | -1.2px | Environment/store hero scale |
| Hero Display L | 56px | 600 | 1.07 | -0.28px | Homepage hero moments |
| Section Display | 48px | 500-600 | 1.08 | -0.144px | Major chapter headings |
| Product Heading | 40px | 600 | 1.10 | normal | Product and campaign section titles |
| Feature Display | 38px | 600 | 1.21 | 0.152px | Device and merchandising callouts |
| Promo Display | 32px | 300-600 | 1.09-1.13 | 0.128px to 0.352px | Module-level sub-heroes |
| Card/Product Title | 28px | 600 | 1.14 | 0.196px | Tile-level naming and key copy |
| Utility Heading | 24px | 600 | 1.17 | 0.216px / -0.2px | Configurator and grouped content headers |
| Link/Action Heading | 21px | 600 | 1.14-1.38 | 0.231px | Larger promotional links |
| Subhead | 19px | 600 | 1.21 | 0.228px | Compact section intros |
| Body Primary | 17px | 400 | 1.47 | -0.374px | Standard body and retail descriptions |
| Body Emphasis | 17px | 600 | 1.24 | -0.374px | Emphasized labels and key values |
| Control Label | 14px | 400-600 | 1.29-1.47 | -0.224px | Buttons, helper labels, compact nav text |
| Micro UI | 12px | 400-600 | 1.00-1.33 | -0.12px | Fine print, micro labels |
| Legal/Meta | 10px | 400 | 1.30-1.47 | -0.08px | Dense metadata and legal support text |

### Principles
- **Continuity across page types:** 相同 typographic DNA 横跨 cinematic launches 和 product-purchase flows，避免 marketing 与 commerce 出现品牌分裂。
- **Compression at scale:** Display tiers 使用 tight leading 和 controlled tracking，产生 machined、product-first 的质感。
- **Readable density at retail depth:** SF Pro Text 在 compactness 与足够 vertical rhythm 之间取得平衡，适合长 product lists 和 option matrices。
- **Measured weight ladder:** 600 是主导 emphasis weight；700 选择性出现；300 仅在较大行中少量用于对比。

### Note on Font Substitutes
- 最接近的免费替代：text-heavy implementation 用 `Inter`，headings 用 `Inter Tight` 近似 `SF Pro Display-like` metrics。
- 替代时，在 body sizes 上略微增加 line-height（+0.02 到 +0.06），并降低 negative tracking intensity，以保持 readability。

## 4. Component Stylings

### Buttons
- **Primary Fill Action:** `#0071e3` background、`#ffffff` text、8px radius、compact horizontal padding（常见 8px 15px）。用于决定性的 purchase/progression actions。
- **Dark Fill Action:** `#1d1d1f` background、`#ffffff` text、8px radius。用于浅色表面上需要克制 high-contrast primary 的场景。
- **Pill/Capsule Action Family:** 大 capsule actions 使用 `18px`-`56px` radii，极端 pill links 使用 `980px`。建立 Apple 柔和但精确的 call-to-action silhouette。
- **Utility Filter/Button Shells:** Light shells（`#fafafc` 或 translucent white）配 subtle gray borders（`#d2d2d7` / `#86868b`），用于 dense configuration contexts。
- **Pressed Behavior:** Active controls 通常缩小 scale 或轻微移动 fill，表达 physical press confirmation。

### Cards & Containers
- **Editorial/Product Cards:** 位于 `#f5f5f7` 或 white fields 上的 light cards，framing 极少，composition 以 image-first 为主。
- **Dark Utility Cards:** Graphite steps（`#272729` 到 `#2a2a2c`）用于 overlays、media controls 和 dark-context modules。
- **Configurator Panels:** Rounded containers（通常 12px-18px），边框清楚但克制。
- **Carousel/Spotlight Modules:** Featured content lanes 使用更大的 rounded shells（`28px`-`36px`）。

### Inputs & Forms
- **Retail Input Fields:** Translucent 或 white backgrounds、dark text（`#1d1d1f`）、border-led containment（`#86868b`）。
- **Selection Controls:** Circular/toggle-like control geometry 经常出现在 product selection interfaces 中。
- **Density Strategy:** Form fields 保持视觉安静，让 device imagery 和 pricing hierarchy 继续占主导。

### Navigation
- **Global Marketing Nav:** Compact dark translucent bar，使用小字号 links 和克制 iconography。
- **Store/Sub-shop Nav Layers:** 为 category 和 product narrowing 增加 utility bars、chips 和 segmented controls。
- **Link Hierarchy:** Link blues 是主要 interactive signal，neutral text 支撑 dense navigation sets。

### Image Treatment
- **Object-First Photography:** Hardware 和 accessories 位于受控 solid surfaces 前景。
- **High-fidelity finish rendering:** Reflective/material details 是视觉说服力的核心。
- **Mixed framing:** Full-bleed hero scenes 与 rounded retail cards、tightly cropped merchandising thumbnails 共存。

### Other Distinctive Components
- **Product Configurator Matrix:** Option stacks 和 selectors 结合 chips、radio-style controls、contextual pricing/summary blocks。
- **Carousel Control Dots/Arrows:** Gallery progression 使用 muted overlays 上的 circular control vocabulary。
- **Environment Story Panels:** Narrative chapters 结合 editorial typography 与 cinematic product/environment visuals。

## 5. Layout Principles

### Spacing System
- Base unit 实际上是 `8px`，但系统支持 dense micro-steps 来做 precision alignment。
- 页面中频繁复用的 spacing values：`2`, `4`, `6`, `7`, `8`, `9`, `10`, `12`, `14`, `17`, `20` px。
- Marketing 和 retail flows 中都可见的 universal rhythm constants：`8px` unit scaffolding 搭配 `14-20px` utility intervals，用于 component padding 和 list spacing。

### Grid & Container
- **Showcase pages:** 大 central columns，配宽阔 horizontal breathing room 和 full-width color chapters。
- **Commerce pages:** 更紧的 multi-column product/control grids，经常 modular stacking。
- **Container behavior:** Desktop widths 下保持 constrained readable core，并给外侧 generous margins。

### Whitespace Philosophy
- **Scene pacing:** 主要 visual chapters 使用宽阔 top/bottom breathing room。
- **Information compaction where needed:** Retail pages 会刻意压缩 spacing，让每个 viewport 展示更多 actionable information。
- **Contrast-led separation:** Section transitions 更多依赖 surface changes，而不是 decorative separators。

### Border Radius Scale
- **5px:** Tiny utility links/tags 和 minor small shells。
- **8px-12px:** Standard controls 和 compact fields。
- **16px-18px:** Cards、module frames 和 commerce panels。
- **28px-36px:** Larger module 和 spotlight containers。
- **56px / 100px / 980px:** Capsules、large pills 和 signature elongated CTA forms。
- **50%:** Circular media 和 selection controls。

## 6. Depth & Elevation

| Level | Treatment | Use |
|------|-----------|-----|
| Level 0 | Flat neutral surfaces (`#ffffff`, `#f5f5f7`, `#000000`) | Main narrative and product stages |
| Level 1 | Subtle border containment (`#d2d2d7`, `#86868b`) | Filters, input fields, utility cards |
| Level 2 | Soft shadow (`rgba(0,0,0,0.08)` to `rgba(0,0,0,0.22)` where present) | Highlighted cards and elevated merchandise modules |
| Level 3 | Dark-surface stepping (`#272729` -> `#2a2a2c`) | Overlays, media controls, dark utility clusters |
| Accessibility | Blue focus signal (`#0071e3`) | Keyboard and selection emphasis |

Depth 被刻意克制。Apple 更偏好 tonal contrast、surface stepping 和 compositional hierarchy，而不是 heavy shadow stacks。

### Decorative Depth
- Decorative depth 主要由 photographic realism 和 material rendering 创造，而不是 synthetic UI effects。
- Translucent overlays 和 glass-like utility bars 在 navigation 与 controls 中提供轻微 atmospheric layering。

## 7. Do's and Don'ts

### Do
- 使用 neutral triad（`#000000`, `#f5f5f7`, `#ffffff`）作为结构基础。
- 只把 blue accents 留给真正的 action 和 navigation semantics。
- Typography 保持紧凑且有意图，尤其是在 display scales 上。
- Controls 和 key actions 维持 capsule/circle geometry language。
- 让 product imagery 承载视觉戏剧性，chrome 保持低调。
- 在 dense retail contexts 中使用 border-led containment，而不是 heavy card ornamentation。
- 在共享 core tokens 的同时，保持 showcase modules 与 transactional modules 之间的清晰区分。

### Don't
- 不要引入会与 Apple blue 竞争的大面积 secondary accent palettes。
- 不要在 core UI chrome 中过度使用 shadows、glow effects 或 decorative gradients。
- 不要混用无关 font families，也不要随意放松 tracking。
- 不要把所有 corners 压平成同一个 radius；Apple 使用有目的的 radius tiers。
- 不要让 commerce modules 充满 thick borders 或 loud visual effects。
- 不要移除 dark 与 light chapters 之间的 neutral contrast cadence。
- 不要把 marketing 和 purchase flows 当成两套独立 design systems。

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Small Mobile | 374px and below | Tightened retail controls, single-column product stacks |
| Mobile | 375px-640px | One-column modules, compact action rows, condensed selectors |
| Tablet | 641px-833px | Expanded cards and mixed 1-2 column transitions |
| Tablet Wide | 834px-1023px | More stable multi-column merchandising, larger text blocks |
| Desktop | 1024px-1240px | Full retail layouts and product comparison structures |
| Desktop Wide | 1241px-1440px | Marketing hero expansion and broader section spacing |
| Large Desktop | 1441px+ | Maximum chapter breathing room and wide editorial composition |

### Touch Targets
- Primary 和 secondary actions 通常以 tap-friendly pill/button geometries 呈现。
- Circular media 和 selection controls 在 mobile contexts 中对齐 minimum touchable intent。
- Dense commerce UI 使用 compact labels，但通过 surrounding shape padding 保持清晰 hit regions。

### Collapsing Strategy
- Marketing hero typography 按 discrete tiers 缩小，同时保留 hierarchy contrast。
- Product 和 commerce grids 从 multi-column 折叠为 stacked cards，并保持 selector visibility。
- Utility navigation 压缩为更简单的 link/control groupings，同时保留 key actions。
- Option/configuration clusters 变成纵向顺序，保证小屏上的 purchase flow 线性推进。

### Image Behavior
- Product imagery 在 breakpoints 间保持 aspect 和 centrality。
- Hero visuals 在 mobile 上仍保持主导，text 围绕 media priority 重新定位。
- Retail thumbnails 通过 tighter crop logic 和 denser card stacking 保持可读。
- 随着 layout density 增加，image-led modules 继续锚定整体节奏。

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary action blue: **Apple Action Blue** (`#0071e3`)
- Inline link blue: **Body Link Blue** (`#0066cc`)
- Dark chapter canvas: **Absolute Black** (`#000000`)
- Light chapter canvas: **Pale Apple Gray** (`#f5f5f7`)
- Primary text on light: **Near-Black Ink** (`#1d1d1f`)
- Secondary text: **Secondary Neutral Gray** (`#6e6e73`)
- Retail border soft: **Soft Border Gray** (`#d2d2d7`)
- Retail border strong: **Mid Border Gray** (`#86868b`)

### Example Component Prompts
- "Design an Apple-style product hero on a black canvas (`#000000`) with SF Pro Display semibold headline (48-56px), concise supporting copy, and two capsule CTAs using `#0071e3` and `#1d1d1f`."
- "Create a commerce configuration panel on white (`#ffffff`) with 18px rounded cards, `#86868b` border fields, SF Pro Text 17px body copy, and compact option selectors."
- "Build a merchandising card grid alternating `#f5f5f7` and white surfaces, with image-first cards, restrained shadows, and 14-17px SF Pro Text metadata."
- "Generate a carousel control cluster using circular buttons (50% radius), muted gray overlays, and clear active feedback for gallery navigation."
- "Compose a mixed marketing + retail page rhythm: dark showcase chapter -> light feature chapter -> dense product list module while keeping blue accents only for actions and links."

### Iteration Guide
1. 先锁定 neutral foundation（`#000000`, `#f5f5f7`, `#ffffff`），再调整 accents。
2. Blue accents 要稀少且有目的；如果一切都是 blue，hierarchy 会崩塌。
3. Typography 调整顺序：display scale、body readability，然后是 micro labels。
4. Radius 按 component class（field、card、capsule、circle）匹配，而不是 one-size-fits-all rounding。
5. 从 showcase sections 进入 commerce sections 时，逐步增加 density。
6. 每次 revision 后确认 product imagery 仍是最强的 visual layer。

### Known Gaps
- 在抽取的 page set 中没有持续可见的独立 semantic status colors（error/warning/success）。
- 部分 interaction micro-states 随 module 变化，并不代表 universal system tokens。
- 少数 retail modules 暴露了 context-specific typography overrides，并未出现在全部五个页面中。
