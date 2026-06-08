# Inspired by Ferrari 的 Design System

> Category: Automotive
> 豪华汽车。Chiaroscuro editorial，Ferrari Red accent，cinematic black。

## 1. 视觉主题与氛围

Ferrari 的网站是一份数字 editorial：一本经过策展的杂志，以艺术机构的庄重和意大利 coachwork 的精度呈现 Prancing Horse 品牌。页面打开是一片 absolute black，只被标志性的 Prancing Horse emblem 打破；它独自漂浮在自己的氛围中。下方内容在 inky-dark cinematic section 与 crisp white editorial panel 之间戏剧性交替展开。这种 chiaroscuro rhythm（黑暗让位给光，机械让位给人的故事）更像翻阅一本 Ferrari yearbook，而不是滚动一个商业网站。每个 section 都是一段经过策展的 vignette：从阴影中溶出的 concept car、以雕塑般静止姿态并列的两位 F1 driver、像宝石色 parade 一样排列的量产车型。

对于一个建立在速度和情绪上的品牌来说，色彩语言近乎修道院式克制。Ferrari Red (`#DA291C`) 以近乎外科手术般稀少的方式出现，只保留给 Subscribe CTA 和需要立即占领注意力的 accent moment。Interface 的绝大多数都生活在黑、白和精心校准的灰阶中（从 `#303030` dark surface，到 `#8F8F8F` mid-tone，再到 `#D2D2D2` light border）。两个黄色（Racing Yellow `#FFF200` 和更深的 Modena Yellow `#F6E500`）作为 heritage accent 存在于 token system 中，用于特殊 context，以致敬 Ferrari 的 racing provenance。这种克制意味着当 red 出现时，它承载着整个品牌的重量。

Typography 依赖 FerrariSans：一套专有 sans-serif family，heading 采用 medium-weight（500-700）和紧凑比例。Display text 在 section title 上运行于 24-26px，而 UI chrome 在 12-16px、regular 到 bold 的 weight 范围内工作。Secondary "Body-Font" custom typeface 负责 caption 和 utility text，常以 uppercase 和宽 letter-spacing（1px）渲染，制造 label-like editorial quality。这套双字体系统（FerrariSans 负责叙事权威，Body-Font 负责结构标注）让站点拥有 print-magazine hierarchy。没有任何 text decoration 是随意的。Headline 的 letter-spacing 紧凑，label 则刻意放宽，形成一种在紧迫与沉着之间交替的视觉节奏。

**关键特征：**
- Chiaroscuro layout，在 deep black section 与 clean white editorial panel 之间交替
- Ferrari Red (`#DA291C`) 极度克制地使用，是 accent，不是 atmosphere
- Prancing Horse emblem 作为 void-black field 上孤立的 hero element
- FerrariSans 专有字体，紧凑比例和 medium weights
- Photo-journalism imagery：concept render、driver portrait、lineup parade，每个 section 都是一个 story
- Uppercase Body-Font label 使用宽 letter-spacing（1px）做 editorial annotation
- 几乎为零的 border-radius（默认 2px），反映 precision engineering aesthetic
- Dual-framework architecture（PrimeReact + Element Plus）驱动 32+ interactive components
- Carousel-driven hero，带 editorial slide 和 arrow/dot navigation

## 2. 色彩 Palette 与角色

### Primary
- **Ferrari Red** (`#DA291C`): 标志性的 Rosso Corsa；primary accent 和 CTA color。用于 Subscribe button、key action trigger，以及需要最大视觉权威的品牌时刻。系统中最重要的单一颜色（--f-color-accent-100）。
- **Pure White** (`#FFFFFF`): Editorial content panel 的 primary surface、暗色背景上的 navigation text，以及 button fill。它是 dark cinematic section 之间提供 breathing room 的 canvas（--f-color-ui-0）。

### Secondary & Accent
- **Dark Red** (`#B01E0A`): Ferrari Red 的更深变体，用于 hover/pressed state 和 high-contrast context；在不引入新 hue 的情况下为品牌色增加维度（--f-color-accent-90）。
- **Deep Red** (`#9D2211`): 最饱和的 dark red，用于 active state，以及 Dark Red 仍需更多重量的额外强调（--f-color-accent-80）。
- **Racing Yellow** (`#FFF200`): 来自 Ferrari racing livery 的 heritage accent，只保留给 special highlight 和 motorsport-related context（--f-color-yellow-hypersail）。
- **Modena Yellow** (`#F6E500`): 比 Racing Yellow 略暖、更金色，用于 secondary heritage accent 和 category marker（--f-color-yellow）。

### Surface & Background
- **Absolute Black** (`#000000`): Hero section、cinematic background 和主导 dark surface；这个 void 让 imagery 和 Prancing Horse emblem 像漂浮一样出现。
- **Dark Surface** (`#303030`): Footer region、newsletter section 和 layered dark panel 的 secondary dark surface；比纯黑略抬起，用于 depth differentiation（--f-color-ui-90）。
- **Light Gray Surface** (`#D2D2D2`): White panel 上 divider 和 border treatment 的 subtle alternate surface（--f-color-ui-20）。
- **Overlay Dark** (`hsla(0, 0%, 7%, 0.8)`): Modal overlay 和 image caption background 使用的 semi-transparent near-black（--f-color-overlay-darker）。

### Neutrals & Text
- **Near Black** (`#181818`): 浅色 surface 上的 primary body text，比 absolute black 略软，以提升可读性（link default color）。
- **Dark Gray** (`#666666`): Secondary text 和 subdued UI label；用于需要从 primary hierarchy 中后退的文字（--f-color-black-60）。
- **Mid Gray** (`#8F8F8F`): Metadata、timestamp 和 supportive content 的 tertiary text（--f-color-black-50）。
- **Silver Gray** (`#969696`): Placeholder text 和 disabled state indicator（--f-color-black-55）。

### Semantic & Accent
- **Warning Red** (`#F13A2C`): Accessible warning state；比 Ferrari Red 更亮、更偏橙，用于区分 semantic alert 与 brand expression（--f-color-accessible-warning）。
- **Success Green** (`#03904A`): Confirmation 和 positive status indicator（--f-color-accessible-success）。
- **Info Blue** (`#4C98B9`): Informational callout、tooltip 和 neutral status messaging（--f-color-accessible-info）。
- **Link Hover Blue** (`#3860BE`): Text link 的 interactive hover state；一种庄重的 navy-blue，传达交互性但不与 Ferrari Red 竞争。

### Gradient System
- Token system 中没有显式 gradient。
- 深度通过摄影，以及 black 与 white surface 之间的二元对比实现。
- Overlay darker color（`hsla(0, 0%, 7%, 0.8)`）通过覆盖 imagery 的透明层叠创造深度。
- 偶发的 photographic gradients（studio shot 中的光线衰减）在 image content 内提供氛围深度。

## 3. 字体规则

### Font Family
- **FerrariSans**: Heading、navigation、button 和 editorial content 的 primary typeface。一套专有 sans-serif，默认 medium weight（500），compact x-height，并可精确控制 letter-spacing。Fallbacks: Arial, Helvetica, sans-serif。
- **Body-Font**: Caption、label 和 utility text 的 secondary typeface。常以 uppercase 和 expanded letter-spacing（1px）渲染，形成 editorial label aesthetic。用于 category tag 和小型 annotation text。
- **Arial / Helvetica**: Cookie consent modal、form element 和第三方 component framework 中使用的 system fallback font。

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Section Title | 26px (1.63rem) | 500 | 1.20 | normal | FerrariSans，white background 上的 primary editorial heading |
| Card Heading | 24px (1.50rem) | 400 | normal | normal | FerrariSans，content card title |
| Subheading | 18px (1.13rem) | 700 | 1.20 (tight) | normal | FerrariSans，bold subsection label |
| UI Heading | 16px (1.00rem) | 500 | 1.40 | 0.08px | FerrariSans，component heading 和 nav item |
| Body Bold | 16px (1.00rem) | 700 | 1.30 (tight) | normal | FerrariSans，emphasized inline text |
| Button Label | 16px (1.00rem) | 400 | normal | 1.28px | FerrariSans，带宽 tracking 的 primary button text |
| Small Button | 14.4px (0.90rem) | 700 | 1.00 (tight) | normal | FerrariSans，compact action button |
| Nav Link | 13px (0.81rem) | 600 | 1.20 (tight) | 0.13px | FerrariSans，navigation 和 footer link |
| Caption | 13px (0.81rem) | 400 | 1.50 | 0.195px | FerrariSans/Body-Font，metadata 和 description |
| Micro Button | 12px (0.75rem) | 700 | 1.00 (tight) | 0.96px | FerrariSans，带宽 tracking 的 small CTA |
| Label Upper | 12px (0.75rem) | 400 | 1.27 (tight) | 1px | Body-Font，uppercase label 和 category tag |
| Micro Label | 11px (0.69rem) | 400 | 1.27 (tight) | 1px | Body-Font，uppercase smallest annotation text |
| Cookie Text | 45px (2.81rem) | 400 | 1.50 | 0.195px | Arial，consent dialog oversized button text |

### Principles
- **专有身份**：FerrariSans 是 Ferrari 专属；替换它会损失品牌识别度。字体紧凑比例和 medium weight default（500）传达工程精度。
- **Two-register system**：FerrariSans 负责 narrative voice（heading、content、button），Body-Font 负责 structural annotation（label、tag、micro-caption），这呼应印刷杂志中的 editorial text 与 technical label 分工。
- **Uppercase 作为强调工具**：Body-Font caption 使用 `text-transform: uppercase` 和 expanded letter-spacing（1px），形成视觉上独立的 label layer，读起来像 "informational overlay" 而不是 primary content。
- **Compact line-heights**：Headline 使用 tight line-height（1.00-1.30），形成密集、有冲击力的 text block；body text 打开到 1.50 以舒适阅读。压缩 header 与放松 body 的对比创造视觉张力。
- **Weight range 400-700**：系统中活跃四种 weight（400、500、600、700），比 Tesla 更宽但仍受控。500 是默认“声音”，700 用于强调，400 用于 body，600 用于 navigation。

## 4. Component Stylings

### Buttons
Ferrari 的 button 是极简白色矩形，几乎没有 radius；CTA 哲学是“architecture, not decoration”。

**Primary CTA (White)** — 默认 action button:
- Default: bg `#FFFFFF`，text `#000000`，fontSize 16px（FerrariSans），letterSpacing 1.28px，padding 12px 10px，borderRadius 2px，border 1px solid `#000000`
- Hover: bg `#1EAEDB` (Teal)，text `#FFFFFF`，opacity 0.9
- Focus: bg `#1EAEDB`，text `#FFFFFF`，border 1px solid `#FFFFFF`，outline 2px solid `#000000`，opacity 0.9
- Used for: "Configure" actions，浅色背景上的 secondary calls to action

**Subscribe CTA (Red)** — 高强调 action button:
- Default: bg `#DA291C` (Ferrari Red)，text `#FFFFFF`，borderRadius 2px，padding 12px 10px
- Used for: Newsletter subscribe、暗色背景上的 primary conversion actions
- 唯一使用 Ferrari Red 的 button；只保留给最高视觉优先级

**Ghost Button (White Border)** — 用于暗色背景:
- Default: bg transparent，text `#FFFFFF`，border 1px solid `#FFFFFF`，borderRadius 2px，padding 12px 10px
- Hover: bg `#1EAEDB` (Teal)，text `#FFFFFF`，opacity 0.9
- Focus: 与 Primary CTA focus state 相同
- Used for: 叠在 dark imagery 和 cinematic section 上的 action

**Text Link** — Inline navigation:
- Default: 浅色 surface 上 text 为 `#181818`，暗色 surface 上为 `#FFFFFF`，无 border、无 background
- Hover: color 切到 `#3860BE` (Link Hover Blue)，decoration 移除 underline
- 暗色 surface 上的 white variant 默认使用 underline decoration
- 根据 context 使用 FerrariSans 或 Body-Font（uppercase label link 使用 Body-Font）

### Cards & Containers

**Editorial Card**（Content sections）:
- Background: white
- Border: none
- Shadow: none
- Layout: image above，heading + caption below
- Image treatment: card 内 full-width，image 无 rounded corner
- Text: FerrariSans heading（16-24px）+ Body-Font caption（12-13px uppercase）

**Dark Cinematic Card**（Hero/feature sections）:
- Background: `#000000` (Absolute Black)
- Full-bleed imagery with text overlay
- No border, no shadow；darkness IS the container
- Text: white，以精心留出的 negative space 定位

**Vehicle Lineup**（Model carousel）:
- Horizontal scrollable row of vehicle thumbnails
- 每辆车位于 neutral/white background 上
- Navigation: arrow buttons + dot indicators
- Background 切换以展示 selected model 的 color context

### Inputs & Forms

**Newsletter Input**（Footer section）:
- Background: 暗色 surface 上 transparent
- Text: white
- Border: 1px solid `#CCCCCC`
- Placeholder: `#969696` (Silver Gray)
- Focus: border color transition（standard browser focus ring）
- Label: Body-Font uppercase，12px，1px letter-spacing

**Cookie Consent**（Modal）:
- Background: white
- Border radius: 8px（dialog）
- Shadow: `rgb(153, 153, 153) 1px 1px 1px 0px`
- Buttons: oversized（45px Arial），white bg with black border
- 使用标准 PrimeReact/Element Plus modal framework

### Navigation
- **Desktop**: Prancing Horse logo 位于页面顶部居中，primary navigation 在其下方；这不是传统 horizontal nav bar，而是黑色背景上的 full-width header block
- **Logo**: Absolute black 上居中的 Prancing Horse emblem（44×42px），是最突出的单一 UI element
- **Links**: FerrariSans，13px，weight 600，dark background 上 white text
- **Mobile**: Hamburger collapse 到 vertical navigation drawer
- **Footer**: `#303030` (Dark Surface) 上的 multi-column layout，category link 使用 Body-Font uppercase
- 未观察到 **sticky nav behavior**；页面自然滚动，header 会移出屏幕

### Image Treatment
- **Hero**: 黑色背景上的 full-width editorial photography；concept car 置于氛围化 studio lighting 中，editorial portrait 采用 cinematic composition
- **Aspect ratios**: Mixed；hero section 使用 landscape（16:9），portrait/driver imagery 接近 square，vehicle lineup 使用 wide panoramic
- **Full-bleed vs padded**: Hero image 是 full-bleed edge-to-edge；editorial content image 位于 white container 内并带 padding
- **Lazy loading**: Below-fold section 使用 progressive loading（由 PrimeReact framework 处理）
- **Image quality**: 高分辨率、studio lighting 摄影；没有 user-generated 或 lifestyle imagery。每张图都经过 art-directed

### Carousel Component
- Editorial carousel，包含多个 slide
- Dot indicator 表示 slide position
- Slide edge 上有 arrow navigation（left/right）
- Auto-advancing，并允许 manual override
- Content: mixed editorial，包括 event recap、model launch、racing highlight

## 5. 布局原则

### Spacing System
- **Base unit**: 8px（检测到的 system base）
- **Scale**: 1px, 2px, 4px, 5px, 6px, 9px, 10px, 11.2px, 12px, 13px, 15px, 16px, 19px, 20px, 25px
- **Button padding**: 12px vertical，10px horizontal；紧凑且精确
- **Section padding**: Major content block 之间有慷慨 vertical spacing（估计 40-80px）
- **Card gaps**: Grid item 之间 16-20px
- **Footer padding**: Dark footer block 内横向 section 为 25px

### Grid & Container
- **Max width**: 1920px（最大 breakpoint），更窄宽度下 content 受约束
- **Hero**: 黑底 full-bleed，content 居中
- **Editorial sections**: 2-column layout，image + text，左右交替
- **Vehicle lineup**: Horizontal scroll/carousel，desktop 宽度下可见 5-6 个 model
- **Footer**: Link category 使用 4-column grid

### Whitespace Philosophy
Ferrari 把 white space 视为 gallery wall。每个 section，无论是黑色 void 上的 concept car render，还是中性灰上的一对 F1 driver，都被给予自己的 breathing space “房间”。黑/白 section 的交替创造 pacing rhythm：dark = immersive moment，white = editorial content，dark = immersive moment。这种 cadence 让滚动感觉像在翻阅一本 luxury publication。Editorial card 之间的 white space 适中（不像 Tesla 那样极端），因为 Ferrari 在讲故事，而不是展示单个物件。

### Border Radius Scale
| Value | Context |
|-------|---------|
| 1px | Small inline element（span）的 subtle softening |
| 2px | Button、input 和 interactive element 的默认值；几乎不可察觉，razor-precision |
| 8px | Modal dialog 和 overlay container，是“最软”的结构 radius |
| 50% | Circular element：carousel dot、avatar thumbnail、slider handle |

## 6. 深度与 Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 (Flat) | No shadow, no border | 所有 content section 和 card 的默认状态 |
| Level 1 (Subtle) | `rgb(153, 153, 153) 1px 1px 1px 0px` | 少量使用于 cookie consent dialog 和 dropdown menu |
| Level 2 (Overlay) | `hsla(0, 0%, 7%, 0.8)` backdrop | Modal overlay 和 image caption background |
| Level 3 (Border) | `1px solid #CCCCCC` | Input field、form container；通过 delineation 而不是 shadow 表达深度 |

### Shadow Philosophy
Ferrari 的 elevation 方法几乎和 Tesla 一样扁平，但理由不同。Tesla 为极简主义避免 shadow，而 Ferrari 避免 shadow，是因为 editorial photography 已提供全部视觉深度。唯一的 shadow token（`rgb(153, 153, 153) 1px 1px 1px 0px`）极其微妙，是 1-pixel whisper，只用于 consent dialog 这类 utility context。站点通过三种策略传达层级：
1. **Surface color contrast**: Black section 与 white section 创造明确层叠
2. **Overlay transparency**: 80% opacity 的 `--f-color-overlay-darker` 不依靠 shadow 也能创造深度
3. **Photographic depth**: Studio-lit car imagery 中的反射、ground shadow 和 atmospheric haze 提供全部视觉维度

### Decorative Depth
- UI gradient、glow 或 interface element blur effect 都不存在
- 黑底 Prancing Horse logo 通过纯对比制造 "floating in void" effect；不需要 glow 或 shadow
- Dark-to-light section transition 是 hard cut，不是 gradient blend；强化 editorial page-turn metaphor

## 7. Do's and Don'ts

### Do
- 克制使用 Ferrari Red (`#DA291C`)；只用于 primary CTA 和 brand-critical moment。它的力量来自 restraint
- 在 black cinematic section 与 white editorial section 之间交替，创造签名 chiaroscuro rhythm
- 使用 FerrariSans weight 500 作为默认 heading voice；它是 typography 里的 engine note
- 为所有 label、category tag 和 structural annotation 使用 uppercase、1px letter-spacing 的 Body-Font
- 所有 interactive element 保持 2px border-radius；razor precision，而不是 rounded friendliness
- 让 photography 承载情绪重量；每张 image 都应达到 art-directed studio quality
- 将 Prancing Horse emblem 作为黑底 standalone hero element；不要让相邻 content 拥挤它
- 保持 12px/10px button padding ratio；紧凑、有目的、无多余
- Body text 使用 `#181818` (Near Black)，而不是 pure `#000000`；微妙暖度提升可读性
- 将 yellow accents（`#FFF200`、`#F6E500`）严格保留给 motorsport 和 racing heritage context

### Don't
- 不要把 Ferrari Red 分散到 interface 各处作为装饰；它是 CTA signal，不是 theme color
- 不要使用 rounded-pill button 或大 border-radii；2px precision 不可协商
- 不要给 card 或 content container 添加 box-shadow；深度来自 surface color contrast 和 photography
- 不要在同一 text block 内混用 FerrariSans 和 Body-Font；它们服务于不同 hierarchy function
- 不要为 section 使用彩色背景（blue、green 等）；palette 仅限 black/white/gray，并辅以 red 和 yellow accent
- 不要给 FerrariSans heading 应用 text transform；uppercase 只保留给 Body-Font label
- 不要展示低质量或 user-generated imagery；每张照片都必须满足 editorial standard
- 不要把 Link Hover Blue (`#3860BE`) 用于 interactive hover state 以外的用途；它不是 brand color
- 不要创建多个 focal point 互相竞争的繁忙 layout；每个 section 应只有一个清楚 story
- 不要用品牌色覆盖 semantic color system（warning、success、info）；`#F13A2C` warning 有意不同于 `#DA291C` brand red

## 8. 响应式行为

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | ≤375px | Single-column，minimal padding（12px），stacked navigation，hero text 缩到约 18px，full-width CTA |
| Mobile | 376-600px | Single-column，padding 略增（16px），hamburger nav，body text 为 13px |
| Tablet Small | 601-768px | 2-column editorial grid 开始出现，hero image 保持 full-width，footer 切到 2-column |
| Tablet | 769-960px | Full 2-column layout，carousel 显示 3 辆车，padding 增至 20px |
| Desktop | 961-1280px | Full navigation，2-column editorial 与更大 imagery，vehicle lineup 显示 5 个 model |
| Large Desktop | 1281-1920px | Maximum content width，慷慨 whitespace，hero photography 达到 full cinematic scale |

### Touch Targets
- Primary CTA button: 最小 44px height，12px vertical padding（满足 WCAG AAA 44×44px target）
- Navigation link: 13px text，1.50 line-height，item 之间有充足 spacing
- Carousel arrow: viewport edge 上 44px+ touch target
- Footer link: 以 16-20px 的充分 vertical spacing 分组，保证触摸准确性

### Collapsing Strategy
- **Navigation**: Full horizontal nav 在 mobile 上折叠为居中的 Prancing Horse logo + hamburger menu
- **Editorial sections**: 2-column image+text layout 折叠为 single-column，image 堆叠在 text 上方
- **Vehicle lineup**: Horizontal carousel 保持 scroll behavior，但可见 model 从 5 个降到 2-3 个
- **Footer**: 4-column link grid 在 tablet 折叠到 2-column，在 mobile 折叠为 single-column accordion
- **Hero carousel**: 所有 breakpoint 上保持 full-width，dot indicator 和 arrow 按比例缩放
- **Spacing reduction**: Section padding 从 desktop 的 40-80px 降到 mobile 的 20-40px，同时保持成比例 breathing room

### Image Behavior
- Hero image: 所有 breakpoint 上 full-bleed，并使用 `object-fit: cover` 保持 cinematic composition
- Editorial image: 在 container 内响应式缩放，并保持 aspect ratio
- Vehicle lineup: Thumbnail size 缩放，但保持一致的 car-to-frame proportion
- Art direction: Mobile crop 可能收紧到 vehicle subject，减少 environmental context
- Lazy loading: PrimeReact 为 below-fold content 处理 progressive image loading

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: "Ferrari Red (#DA291C)"
- Background Light: "Pure White (#FFFFFF)"
- Background Dark: "Absolute Black (#000000)"
- Secondary Dark Surface: "Dark Surface (#303030)"
- Heading text (light bg): "Near Black (#181818)"
- Body text: "Dark Gray (#666666)"
- Tertiary text: "Mid Gray (#8F8F8F)"
- Border: "Border Gray (#CCCCCC)"
- Button Hover: "Teal (#1EAEDB)"
- Link Hover: "Link Blue (#3860BE)"

### Example Component Prompts
- "创建 hero section：Absolute Black (#000000) background，顶部居中 logo emblem，慷慨 vertical spacing（80px+），一个 FerrariSans 26px weight 500 white 的 editorial headline，下方是 Silver Gray (#969696) 的小型 Body-Font uppercase caption（12px，1px letter-spacing）"
- "设计 Subscribe section：Dark Surface (#303030)，左对齐 white FerrariSans headline（24px/500），Mid Gray (#8F8F8F, 13px) subtitle，transparent background 且 1px #CCCCCC border 的 email input，以及 Ferrari Red (#DA291C) Subscribe button，white text、2px border-radius、12px 10px padding"
- "构建 editorial card：white background，上方 full-width image（16:9 ratio），下方 FerrariSans heading（16px/700，Near Black #181818），并用 Body-Font uppercase label（11px，1px letter-spacing，Mid Gray #8F8F8F）作为 category tag；no border, no shadow, no border-radius"
- "创建 vehicle lineup carousel：white background 上展示 5 个 car thumbnails 的 horizontal scroll，带 left/right arrow navigation、下方 dot indicators，以及每辆车下方的 FerrariSans model name（16px/500）"
- "设计 dark cinematic section：Absolute Black 上的 full-bleed studio photography，主题为 concept car；将 white FerrariSans headline（26px/500）以慷慨 padding（40px）放在 lower-left，并使用 Ghost Button（transparent bg、1px white border、white text、2px radius）作为 CTA"

### Iteration Guide
在细化用此 design system 生成的现有 screen 时：
1. 一次只关注一个 component；Ferrari 的 editorial rhythm 意味着每个 section 都是自洽的 vignette
2. 引用本文档中的具体 color name 和 hex code；palette 很小，但每个颜色都有精确角色
3. 使用自然语言描述，而不是 CSS 值；"razor-sharp 2px corners" 比 "border-radius: 2px" 更能传达意图
4. 把期望的“feel”和具体 measurement 放在一起描述；"editorial magazine page-turn between sections" 比 "margin-bottom: 80px" 更能传达 layout philosophy
5. 始终保持 chiaroscuro contrast；如果某个 section 感觉 flat，检查它是否需要放在 black 或 white 上以维持交替 rhythm
6. 每个 screen 只为一个 element 保留 Ferrari Red；如果 red 出现在多个地方，就会失去权威
