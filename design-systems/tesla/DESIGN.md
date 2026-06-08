# Inspired by Tesla 的 Design System

> Category: Automotive
> 电动汽车。极致减法、full-viewport photography、近乎为零的 UI。

## 1. 视觉主题与氛围

Tesla 的网站是一场极致减法练习：一个数字 showroom，产品就是一切，界面几乎什么都不是。页面以 full-viewport hero 打开，电影感汽车摄影填满整个屏幕：三辆车停在抛光混凝土上，背后是朦胧城市天际线，单个 model name 以半透明白色字体悬浮在上方。没有装饰性边框，没有 gradient，没有 pattern，没有 shadow。UI 的存在只为提供刚好足够的导航结构，然后退到一边。每个不是产品图像的像素都是 white space，而这种克制正是 design system 最有力的声明。

色彩哲学近乎苦行：primary calls to action 只用一个蓝色（`#3E6AE1`），文本层级只用三种深灰，其他一切都是白色。全部情绪重量由摄影承担：辽阔 landscape shot、studio-lit vehicle profile、氛围化环境构图，从边到边铺满每个 viewport-height section。UI chrome 融化进图像里。Navigation bar 浮在 hero 上方，没有可见背景、边框或阴影；TESLA wordmark 和五个 navigation label 只是存在于空间中，相信下方内容能提供足够对比。

字体最近从 Gotham 迁移到 Universal Sans，这是一个自定义 family，分为用于 headline 的 "Display" 和用于 body/UI element 的 "Text"，把网站、mobile app 和车载软件统一成单一字体声音。Display variant 以 40px weight 500 渲染 hero title，而 Text variant 负责从 navigation（14px/500）到 body copy（14px/400）的所有内容。这个字体带有几何精度和略带人文感的 terminal，感觉像被工程化而不是被设计出来；这正好契合 Tesla 那种“不需要自我宣告”的技术品牌身份。没有 text shadow，没有 text gradient，没有装饰性字体处理。每个 letterform 都只靠清晰度赢得位置。

**关键特征：**
- Full-viewport hero section（100vh）由电影感汽车摄影主导，只叠加极少 UI
- 近乎零 UI 装饰：页面上没有 shadow、gradient、border 或 pattern
- 单一 accent color：Electric Blue (`#3E6AE1`)，只用于 primary CTA button
- Universal Sans font family（Display + Text）统一 web、app 与车载界面
- Photography-first presentation，产品图像承担全部情绪重量
- Frosted-glass navigation concept，transparent/white nav 浮在 hero content 上方
- 0.33s cubic-bezier transition 作为所有 interactive state change 的通用 timing
- Carousel-driven hero，带 dot indicator 和边缘 arrow navigation，用于多个 vehicle showcase
- "Ask a Question" persistent chatbot bar 固定在 viewport bottom

## 2. 色彩 Palette 与角色

### Primary
- **Electric Blue** (`#3E6AE1`): Primary CTA button background。一种自信、中等饱和的蓝色（rgb 62, 106, 225），作为整个 interface 中唯一 chromatic color 独立存在。只用于 "Order Now" 和其他 primary action button。
- **Pure White** (`#FFFFFF`): 所有 surface、panel、navigation 和 secondary button fill 的主导背景色；这是让摄影呼吸的 canvas。

### Secondary & Accent
- **Promo Blue** (`#3E6AE1`): 蓝色也用于 hero imagery 上方的 promotional text（"0% APR Available"），与 CTA 使用同一色相，在 incentive messaging 与 action 之间建立视觉连接。
- 不存在 secondary accent color。Tesla 有意避免色彩多样性，以维持极端视觉纪律。

### Surface & Background
- **White Canvas** (`#FFFFFF`): Page background、navigation panel、dropdown menu 和所有 surface container。
- **Light Ash** (`#F4F4F4`): 用于 section differentiation 的 subtle alternate surface，与纯白仅有几乎不可察觉的偏移（rgb 244, 244, 244）。
- **Carbon Dark** (`#171A20`): Hero text overlay 和潜在 dark-mode context 的暗色 surface（rgb 23, 26, 32）；一种带蓝色 undertone 的温暖 near-black。
- **Frosted Glass** (`rgba(255, 255, 255, 0.75)`): Scroll 时 navigation backdrop-filter effect 使用的 semi-transparent white。

### Neutrals & Text
- **Carbon Dark** (`#171A20`): Primary heading 和 navigation text；最深的 text value（rgb 23, 26, 32），用于 model name、nav label 和浅色背景上的 hero title。
- **Graphite** (`#393C41`): Body text 和 secondary content（rgb 57, 60, 65）；默认 paragraph color，比纯灰略暖。
- **Pewter** (`#5C5E62`): Tertiary text，用于 sub-link、"Learn" 和 "Order" 这类 secondary navigation link（rgb 92, 94, 98）。
- **Silver Fog** (`#8E8E8E`): Input field placeholder text 和 disabled state（rgb 142, 142, 142）。
- **Cloud Gray** (`#EEEEEE`): Light border 和 divider line（rgb 238, 238, 238）。
- **Pale Silver** (`#D0D1D2`): Subtle UI border 和 delineation（rgb 208, 209, 210）。

### Semantic & Accent
- Tesla 的 marketing site 避免 semantic color coding（没有 green/red/yellow status indicator）。Error、success 和 warning state 在 form context 中遵循标准 browser default。
- 蓝色 CTA（`#3E6AE1`）是唯一 interactive color signal。

### Gradient System
- Interface 中任何地方都不使用 gradient。
- 深度完全通过摄影、whitespace，以及 full-bleed imagery 与干净白色 surface 之间的二元对比实现。
- Navigation 通过 opacity（frosted glass effect）建立层叠，而不是 gradient 或 shadow。

## 3. 字体规则

### Font Family
- **Display**: `Universal Sans Display`, -apple-system, Arial, sans-serif；用于 hero title 和 large model name。一种比例精确工程化的 geometric sans-serif，最近替换 Gotham，以统一 Tesla 的数字生态（website、mobile app、vehicle interface）。
- **Text/UI**: `Universal Sans Text`, -apple-system, Arial, sans-serif；用于 navigation、body copy、button 和所有 UI text。针对小尺寸可读性优化，比例比 Display variant 略宽。
- 未检测到 **OpenType features**；字体完全不加修饰。
- Marketing site 上未观察到 **italic variants**。

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Hero Title | 40px (2.50rem) | 500 | 48px (1.20) | normal | Universal Sans Display，dark hero imagery 上的 white |
| Product Name | 17px (1.06rem) | 500 | 20px (1.18) | normal | Universal Sans Text，nav panel 和 card 中的 model name |
| Nav Item | 14px (0.88rem) | 500 | 16.8px (1.20) | normal | Universal Sans Text，primary navigation label |
| Body Text | 14px (0.88rem) | 400 | 20px (1.43) | normal | Universal Sans Text，paragraph 和 descriptive content |
| Button Label | 14px (0.88rem) | 500 | 16.8px (1.20) | normal | Universal Sans Text，CTA button text |
| Sub-link | 14px (0.88rem) | 400 | 20px (1.43) | normal | Tertiary link（Learn、Order、Experience） |
| Promo Text | 22px (1.38rem) | 400 | 20px (0.91) | normal | Hero 上的 white promotional text（"0% APR Available"） |
| Category Label | 16px (est.) | 500 | — | normal | Category card 上的 white text label（"Sport Sedan"） |

### Principles
- **处处使用 "normal" letter-spacing**：不同于多数现代科技品牌会给 headline 使用 negative tracking，Tesla 在每个层级都使用默认 letter-spacing。这反映了一种哲学：字体应自己说话，不需要操控。
- **字重克制**：只出现两种 weight：500（medium）用于 heading/UI，400（regular）用于 body。没有 bold（700），没有 light（300）。系统避免字体戏剧性。
- **统一字体尺寸**：大多数 UI text 聚集在 14px，只有 hero title（40px）和 promo text（22px）跳出。极端统一带来工程化一致感。
- **Display vs Text split**：双 variant 系统（hero 用 Display、UI 用 Text）提供微妙光学校正，但不会呈现明显风格差异；它们像同一字体在不同尺寸下的表现。
- **No text transforms**：主 navigation 或 CTA 中不出现 uppercase text；lowercase approach 强化 Tesla 的低调自信。

## 4. Component Stylings

### Buttons
所有 button 都使用 barely-rounded rectangle（4px border-radius），形成锐利、技术化的美学，呼应车辆精度。

**Primary CTA** — 主 action button：
- Default: bg `#3E6AE1` (Electric Blue)，text `#FFFFFF`，fontSize 14px，fontWeight 500，padding 4px 并用 inner content centering，borderRadius 4px，minHeight 40px，width 200px
- Border: 3px solid transparent（为 focus/active border animation 预留空间）
- Box Shadow: `rgba(0,0,0,0) 0px 0px 0px 2px inset`（静止时不可见，focus 时动画为可见）
- Transition: `border-color 0.33s, background-color 0.33s, color 0.33s, box-shadow 0.25s`
- Hover: blue background 轻微变暗
- Used for: "Order Now" calls to action

**Secondary CTA** — 替代 action button：
- Default: bg `#FFFFFF`，text `#393C41` (Graphite)，尺寸和 border pattern 与 primary 相同
- Transition: 与 primary 相同的 timing（0.33s）
- Used for: 与 primary CTA 并列的 "View Inventory"

**Nav Button** — 顶部 navigation item：
- Default: bg transparent，text `#171A20` (Carbon Dark)，fontSize 14px，fontWeight 500，borderRadius 4px，padding 4px 16px，minHeight 32px
- Transition: `color 0.33s, background-color 0.33s`
- Active/expanded: subtle background highlight
- Used for: "Vehicles"、"Energy"、"Charging"、"Discover"、"Shop"

**Text Link** — Content 内 action：
- Default: text `#5C5E62` (Pewter)，fontSize 14px，fontWeight 400，无 background、无 border
- Hover: underline decoration，并带 box-shadow transition
- Transition: `box-shadow 0.33s cubic-bezier(0.5, 0, 0, 0.75), color 0.33s`
- Used for: Dropdown panel 中的 "Learn"、"Order"、"Experience"、"New"、"Pre-Owned" links

### Cards & Containers

**Vehicle Card**（Navigation panel）:
- Background: transparent（继承 panel white）
- Border: none
- Shadow: none
- Content: vehicle image（transparent PNG）+ 下方居中的 model name + 两个 text links
- Layout: dropdown panel 内的 3-column grid
- Card 本身没有 hover animation，交互通过下方 text link 完成

**Category Card**（Homepage lower section）:
- Background: full-bleed landscape photography
- Border radius: 约 12px（微妙圆角）
- Overflow: hidden（将 image 裁切到 rounded corners）
- Text: top-left corner 的 white label（"Sport Sedan"、"Midsize SUV"）
- Size: 大格式，约 2:1 aspect ratio
- No shadow, no border, no overlay gradient；text 依赖 image darkness 获得对比

### Inputs & Forms
- Background: transparent
- Text color: `#171A20` (Carbon Dark)
- Placeholder color: `#8E8E8E` (Silver Fog)
- Border: minimal，继承 browser default
- Font: Universal Sans Text，14px
- "Ask a Question" chatbot input bar 位于 viewport bottom，使用干净 white background 和 subtle border

### Navigation
- **Desktop**: 居中的 horizontal nav，左侧是 TESLA wordmark（spaced uppercase letters），中间五个 category button，右侧三个 icon button（help、globe/language、account）
- **Background**: White（通过 class toggle `tds-site-header--white-background` 从暗色 hero 上的 transparent 过渡到 scroll 时 opaque white）
- **Dropdown panel**: Full-width white panel，包含 3-column vehicle grid + right sidebar text links；no shadow, no border，无缝出现在 nav 下方
- **Sticky behavior**: `sticky-without-slide` class，固定在顶部，没有 slide-in animation
- **Mobile**: Hamburger collapse pattern
- Nav 与 content 之间 **没有可见 separator**，nav 与 hero 融合

### Image Treatment
- **Hero**: Full-viewport（100vh）section，使用电影感摄影，edge-to-edge，无 padding、无 margin
- **Vehicle images**: Dropdown panel 中白色背景上的 transparent PNG render，studio-quality 3/4 angle shot
- **Category cards**: Landscape photography，约 2:1 ratio，rounded corners（12px）
- **Carousel**: Auto-advancing，带 dot indicators（3 dots）和边缘 left/right arrow navigation
- **Lazy loading**: Below-fold section 使用 lazy loading，滚入视口前渲染为空白 white

### Persistent Chat Bar
- 固定在 viewport bottom，跨所有 section 可见
- White background，带 subtle border
- Contains: chat icon + "Ask a Question" label + placeholder text（"What's Dog Mode?"）+ send icon + "Schedule a Drive Today" secondary CTA
- Schedule CTA 带 teal/blue icon accent

## 5. 布局原则

### Spacing System
- **Base unit**: 8px
- **Common values**: 8px (0.5rem), 16px (1rem), 21.44px (1.34rem)
- **Button padding**: 4px（最小 outer），content centering 通过 flexbox 实现；nav item 为 4px 16px
- **Section padding**: Full-viewport section，content 垂直居中
- **Card gap**: category card 之间约 16px

### Grid & Container
- **Max width**: 约 1383px（大多数 content 使用完整 viewport width）
- **Hero**: Full-bleed、edge-to-edge、100vh section
- **Navigation panel**: Vehicle card 使用 3-column grid，右侧 text sidebar（约 70/30 split）
- **Category cards**: 2-up horizontal layout（large left card + smaller right card）

### Whitespace Philosophy
Tesla 把 whitespace 用作奢侈信号。Section 之间慷慨的垂直间距（每个 section 都是完整 viewport 高度）意味着你一次只能看到一个“message”：一辆车、一个 model name、一组 CTA。它创造出类似 gallery 的浏览体验，每次滚动都是有意的 transition，而不是连续 feed。White space 不是空的；它是把每辆车提升到艺术品地位的 frame。

### Border Radius Scale
| Value | Context |
|-------|---------|
| 0px | 大多数元素；sharp edge 是默认 |
| 4px | Button（primary、secondary、nav item），几乎不可察觉的圆角 |
| ~12px | Category card，大 surface 上明显但克制的圆角 |
| 50% | Carousel dot indicator，完美圆形 |

## 6. 深度与 Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 (Flat) | No shadow, no border | 所有元素的默认状态：card、panel、button at rest |
| Level 1 (Frost) | `rgba(255,255,255,0.75)` backdrop | Scroll 时的 navigation bar，frosted glass transparency |
| Level 2 (Overlay) | `rgba(128,128,128,0.65)` | Modal overlay 和 region/cookie popup |
| Level 3 (Subtle) | `rgba(0,0,0,0.05)` | 少数 hover state 上的 minimal shadow hint |

### Shadow Philosophy
Tesla 的 elevation 方法本质上是“没有”。站点在 primary interface 中完全避免 box-shadow。深度通过三种替代策略传达：
1. **Z-index layering**: Sticky navigation 通过 positioning 位于 hero content 上方，而不是依靠 shadow
2. **Opacity-based transparency**: Frosted glass nav 和 overlay modal 使用 background-color opacity 表示层叠，而不是 shadow
3. **Photography-as-depth**: Full-bleed image 通过透视、光照和构图创造自己的视觉深度，使 UI shadow 变得多余

### Decorative Depth
- UI element 上没有 gradient、glow 或 atmospheric effect
- Hero imagery 本身提供全部视觉丰富度：sunset sky、车身反射光、studio lighting 形成的 ground shadow
- Carousel arrow button 使用 semi-transparent white background 浮在 hero imagery 上方，而不打断它

## 7. Do's and Don'ts

### Do
- 让 photography 主导每个 screen；product IS the design
- 只将 Electric Blue (`#3E6AE1`) 用于 primary CTA，绝不用于装饰目的
- 为 major content block 保持 viewport-height section；one message per screen
- 将 typography 保持在 weight 400-500；不要 bold、不要 light、不要极端
- 所有 interactive element 使用 4px border-radius；精度优先于玩味
- 相信 whitespace 是奢侈信号；不要因为空间空着就填满
- 所有 transition 保持 0.33s；motion 一致性和 color 一致性同样重要
- 在白色背景上使用 transparent PNG vehicle imagery 做 product showcase
- 将 CTA 水平居中放在 model name 下方；垂直节奏是 model → subtitle → buttons
- 保持 Display/Text font split；Display 只用于 hero-scale text，其他一切用 Text

### Don't
- 不要给任何 element 添加 shadow；通过 shadow 做 elevation 会违背 flat gallery aesthetic
- 除蓝色 CTA 外，不要使用超过一个 chromatic color；palette 有意是 monochrome-plus-one
- 不要给 surface 应用 gradient、pattern 或 decorative background；white 和 photography 是唯一 background
- Web 上不要使用超过 40px 的 text；即使在 hero scale，typography 也刻意克制
- 不要给 card 或 container 添加 border；分隔通过 spacing 实现，而不是 line
- 不要使用 uppercase text transform；Tesla 的自信通过 lowercase calm 表达
- 不要引入 rounded-pill button 或大 border-radius；4px radius 是有意且精确的
- 不要用其他 typeface 覆盖 Universal Sans family；跨平台一致性是核心品牌价值
- 不要添加 scale/translate hover animation；Tesla 的 interaction 只改变 color（background 和 border transition）
- 不要让 viewport 里塞满多个 CTA；每个 screen 最多应有两个 action button

## 8. 响应式行为

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <768px | Single-column layout，hamburger nav 替代 horizontal label，hero text 缩到约 28px，CTA button 垂直堆叠，category card 变为 full-width |
| Tablet | 768-1024px | 2-column nav panel，hero 保持 full-viewport height，CTA 保持 side-by-side，horizontal padding 减少 |
| Desktop | 1024-1440px | Full horizontal nav，dropdown 中 3-column vehicle grid，hero 为 40px，side-by-side CTA 宽度为 200px/160px |
| Large Desktop | >1440px | Content 保持居中，hero photography 缩放以填满更宽 viewport，nav panel content 使用 max-width container |

### Touch Targets
- Primary CTA button: 最小 200px × 40px（远高于 44×44px WCAG requirement）
- Nav button: 最小 32px height，4px 16px padding，足够作为 touch target
- Carousel arrow: viewport edge 上约 44px square 的 white semi-transparent button
- Text link（"Learn"、"Order"）: 14px text，line-height spacing 足够触摸

### Collapsing Strategy
- **Navigation**: Horizontal category button（Vehicles、Energy、Charging、Discover、Shop）在 mobile 上折叠为 hamburger/drawer menu
- **Hero CTA pair**: Desktop 上 side-by-side button，在 mobile 上垂直堆叠
- **Category cards**: 2-up horizontal layout 在 mobile 上折叠为 single-column full-width
- **Vehicle grid**: Desktop nav panel 中的 3-column grid 在 tablet 变为 2-column，在 mobile 变为 single-column
- **Spacing**: Section vertical padding 保持慷慨（viewport-height sections），但 horizontal padding 减少

### Image Behavior
- Hero image 在每个 breakpoint 都完全响应式并填满整个 viewport
- Vehicle carousel image 使用 `object-fit: cover`，跨宽度保持电影感构图
- Nav panel 中的 transparent PNG vehicle image 在 grid cell 内按比例缩放
- Category card image 保持 landscape ratio，并通过带 border-radius 的 `overflow: hidden` 裁切

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: "Electric Blue (#3E6AE1)"
- Background: "Pure White (#FFFFFF)"
- Heading text: "Carbon Dark (#171A20)"
- Body text: "Graphite (#393C41)"
- Tertiary text: "Pewter (#5C5E62)"
- Placeholder: "Silver Fog (#8E8E8E)"
- Alternate surface: "Light Ash (#F4F4F4)"
- Dark surface: "Carbon Dark (#171A20)"

### Example Component Prompts
- "创建 hero section：full-viewport background image，居中的 'Model Y' title 使用 Universal Sans Display 40px weight 500、white，下方一行 subtitle，以及两个 side by side button：primary Electric Blue (#3E6AE1) 'Order Now' button 和 secondary white 'View Inventory' button，两者均为 4px border-radius、40px height"
- "设计 navigation bar：左侧 spaced-letter wordmark，中间五个 text button（14px、weight 500、Carbon Dark #171A20），右侧三个 icon button，全部位于 white background 上，无 shadow、无 border"
- "构建 vehicle card grid：3 columns，每张 card 在 model name（17px、weight 500、Carbon Dark）上方显示 transparent-background car image，并有两个 text link（14px、weight 400、Pewter #5C5E62），标签为 'Learn' 和 'Order'，位于 pure white surface 上，无 border 或 shadow"
- "创建 category card：full-bleed landscape photography，12px border-radius，overflow hidden，并将 white text label（'Sport Sedan'）放在 top-left corner，不使用 overlay gradient"
- "设计 persistent bottom bar：chat input（'Ask a Question' placeholder）、send icon，以及带 teal icon 的 secondary CTA（'Schedule a Drive Today'），固定在 viewport bottom，使用 white background"

### Iteration Guide
在细化用此 design system 生成的现有 screen 时：
1. 一次只关注一个 component；Tesla 的系统极简，每个 element 都必须 pixel-perfect
2. 引用本文档中的具体 color name 和 hex code；整个系统只有 6-7 种颜色
3. 使用自然语言描述，而不是 CSS 值；写 "barely rounded corners"，不要只写 "border-radius: 4px"
4. 把期望的“feel”和具体 measurement 放在一起描述；"gallery-like silence between sections" 比 "margin-bottom: 100vh" 更能传达 whitespace philosophy
5. 始终验证 photography 是否在承担情绪重活；如果 UI 本身感觉“被设计过”，那就太多了
