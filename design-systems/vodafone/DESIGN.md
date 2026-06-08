# Inspired by Vodafone 的 Design System

> Category: Media & Consumer
> 全球电信品牌。纪念碑式大写 display 字体，Vodafone Red 章节色带。

## 1. 视觉主题与氛围

Vodafone 的企业 Web 系统带着全球电信品牌那种自信、广播级的存在感：围绕单一且强势拥有的品牌红构建，并使用克制的编辑式布局，让图像和字体承担情绪重量。每个页面都以同样方式展开：电影感的暗色 hero 图像铺在背后，前景是高耸、紧密字距的大写 display 标题（"EVERYONE. CONNECTED."、"INVESTORS"、"OUR BUSINESS"），随后是一条深红色全宽色带，像章节分隔一样切开页面，再进入利落的白色编辑网格，或进入为机构内容保留的近黑色区块（share ticker、global map、ESG data）。语气是机构化但有人味的：温暖的纪实摄影，例如铺设电缆的团队、珊瑚礁、松林、城市暮色，经过真实感的色彩校正，并放在干净的中性色 surface 上，绝不与内容争夺注意力。

字体系统是它的签名。自定义 Vodafone display 字体一路放大到 144px，以 800 weight 的大写和负字距保持统一声音，贯穿每一种页面模板。正文则保持平静的 16-18px、中等字重节奏。这种双尺度（顶部纪念碑式、底部近乎安静）形成了“企业新闻编辑室”的感觉：每个页面都像一份全国性报纸的头版，只是它的报头恰好是红色。

Surface 处理纪律严明、可预期：三种 surface 依次出现，白色（编辑画布）→ Vodafone red（色带分隔、CTA 按钮、著名的 speech-mark logo）→ 近黑 charcoal（footer、share-ticker panel、global-impact map）。几乎没有装饰性阴影，几乎没有渐变，也几乎没有圆角柔化。边缘很小、很临床（2px 和 6px）；按钮采用双层系统：用于 utility/form 操作的紧凑 2px 矩形，以及用于主要内容 CTA 的全圆 60px pill。这套 design system 相信品牌色足以完成重活，然后在其他地方主动退场。

**关键特征：**
- Vodafone Red (`#e60000`) 是唯一主导 accent：用于 CTA、分隔线、色带区块、speech-mark logo，以及 sustainability map 上旋转的 "IMPACT" 品牌文字
- 纪念碑式大写 display 字体（最高 144px、weight 800、负 letter-spacing），搭配平静的 16-18px 正文
- 通用页面节奏：暗色氛围 hero → 纪念碑式大写标题 → 全宽红色色带 → 白色编辑画布 → 深 charcoal 机构面板 → charcoal footer
- 双层按钮系统：utility 操作用紧凑的 2px-radius 矩形，主要内容 CTA 用完整 pill 形的 60px 按钮（两者同样可以是主按钮，按上下文选择）
- 纪实摄影（人物、基础设施、城市、自然）压过插画；没有 stock-icon 噪音
- 几乎没有阴影和渐变，层级来自字体 weight、色块和间距，而不是 elevation
- Deep charcoal surface (`#25282b`) 同时用于 footer 和机构数据面板（share ticker、world map），为任何正式和数字化内容提供单一材质

## 2. 色彩 palette 与角色

### Primary

- **Vodafone Red** (`#e60000`): 品牌唯一且不可协商的签名色；用于 primary CTA 背景、speech-mark logo、编辑区块之间的全出血色带分隔、tag-pill 轮廓，以及标记 global-impact map 的旋转品牌文字。这个红色绝不能替换或调色；它就是身份本身。

### Secondary & Accent

- **Pure White** (`#ffffff`): 主导性的编辑画布；用于页面背景、卡片背景、暗色或红色 surface 上的反白文字，以及圆形 icon-button 填充。
- **Signal Blue** (`#3860be`): 只保留给静止状态的 inline text link（带下划线），提供一种平静、可访问的蓝色，在白色和暗色 surface 上都清楚可读。
- **Deep Brand Red Shade** (`#ac1811`): 一种更深的红色，用于安静的 label chip（尤其在 sustainability 页面上）；只少量用于低显著性的 tag 元素，让它拥有红色身份但不抢主注意力。

### Surface & Background

- **Canvas White** (`#ffffff`): 主要页面和卡片 surface。所有编辑模块都放在这张画布上。
- **Light Neutral** (`#f2f2f2`): 用于填充式中性 pill-badge 背景，以及在纯白会消失于画布时使用的安静 UI chrome。
- **Charcoal Institutional Panel** (`#25282b`): 与文本同色的值被复用为全宽暗色 surface，用于 footer、share-ticker panel 和 global-impact map 区块。它把页面切换到“data mode”环境。
- **Translucent White Overlay** (`rgba(255,255,255,0.1)`): 轻柔的玻璃色调，用于叠在暗色 hero 图像上的 pill button，让照片透过按钮继续呼吸。

### Neutrals & Text

- **Charcoal Headline** (`#25282b`): 浅色 surface 上的所有标题文字，也作为 charcoal surface 颜色本身；这是一种带微弱冷调的近黑色，绝不是纯黑。
- **Secondary Body Grey** (`#7e7e7e`): 正文、meta text 和次级 label；一种真正的中灰，看起来不强调但仍清晰可读。
- **Form Text Grey** (`#333333`): input-style ghost button 的边框和其内部文字颜色。
- **Disabled Grey** (`#bebebe`): subtle ghost-style control 上的非活动 chip 文字。
- **Translucent White Divider** (`rgba(255,255,255,0.25)`): 暗色机构面板上的 hairline 列分隔线（footer columns、map legend rows）。

### Semantic & Accent

- **Surface Red Band** (`#e60000`): 同一个品牌红以全宽色带形式放在编辑区块之间；它同时是章节分隔器和品牌视觉放大器。每一种页面模板都会出现。
- **Tag Pill Red Border** (`#e60000`): 浅色 tag pill 上的 1px 轮廓，让品牌色能接触小型 UI，而不淹没卡片内容。

### Gradient System

Vodafone 的设计有意避开渐变。唯一的色调变化来自 hero 图像上轻微的摄影暗角（昏暗珊瑚礁、松林、铺设电缆的团队、城市暮色）；色调坡度由图像本身提供，而不是 CSS gradient。按钮、卡片或 surface 上不使用 linear gradient。

## 3. 字体规则

### Font Family

- **Primary**: `Vodafone`（自定义企业 sans-serif）
- **Fallback stack**: `Vodafone, "Helvetica Neue", Arial, sans-serif`
- **Icon font**: `icomoon`：以 18px/24px/48px 固定尺寸承载 pictograph glyph
- **Rendering**: 全局使用 `font-smoothing: antialiased`；OpenType features 没有被激进使用，设计依靠 weight 和 tracking，而不是 stylistic alternates

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Display / Hero XL | 144px | 800 | 0.79 | -1px | 大写；标志性的 "EVERYONE. CONNECTED." 处理 |
| Display / Hero L | 126px | 800 | 0.90 | -1px | 大写；用于较长的 hero headline |
| Display / Hero M | 90px | 800 | 0.93 | — | 大写；secondary hero 或 full-bleed section head |
| Display / Impact | 70px | 800 | 1.17 | -1px | Sustainability 区块的数字 / callout 尺度 |
| H1 — Light | 48px | 300 | 1.08 | — | 以轻字重设置 section headline，获得编辑式平静 |
| H1 — Bold | 48px | 800 | 1.00 | -1px | 机构数据标题（charcoal panel 上的 share price） |
| H2 — Light | 40px | 300 | 1.10 | — | Sub-section header |
| H2 — Bold | 40px | 700 | 1.10 | — | 更密集的 sub-section header |
| H3 — Bold | 32px | 700 | 1.25 | — | Card cluster title 和 feature intro |
| H4 — Bold | 24px | 700 | 1.00 | — | Card title（news、feature、article module） |
| H4 — Light | 24px | 300 | 1.42 | — | Investor / sustainability 页面上的 intro paragraph |
| H5 — Bold | 20px | 700 | 1.30 | — | Compact module title 和 side callout |
| Lead Body | 20px | 400 | 1.40 | — | 大标题下的 introductory paragraph |
| Body Large | 18px | 400 | 1.56 | — | Long-form article body 和 prominent copy |
| Body Bold | 18px | 600 | 1.56 | — | 强调性的 inline phrase |
| Body Base | 16px | 400 | 1.38 | — | 默认段落尺寸 |
| Label Uppercase | 16px | 800 | 1.50 | — | 大写 navigational label |
| Eyebrow / Date | 14px | 400/700 | 1.43 | — | Article date stamp 和 meta（14 APR 2026） |
| Tag Pill | 14px | 700 | 1.50 | — | 红色描边 pill 内的 badge text |
| Caption Uppercase | 14px | 400 | 1.14 | — | 大写 meta label |
| Caption | 12px | 500 | 2.00 | — | Footer meta、legal line |
| Micro Label | 12px | 600 | 1.33 | — | Badge 和 counter 上的大写 tiny label |
| Button Primary | 14.4px | 700 | 1.00 | 0.144px | Primary filled button label |
| Button Compact | 12px | 700 | 1.00 | 0.12px | Compact button label |

### Principles

- **双尺度戏剧性**：系统刻意从 144px 拉到 8.5px，中段不炫耀。结果是清楚的企业层级：品牌时刻纪念碑化，阅读时保持平静。
- **大写 display，混合大小写 body**：所有最大的 display size 都使用大写和负 tracking，而 48px 及以下保持 sentence case 与正常 tracking。
- **字重分布**：真正工作的只有三种 weight：800（display）、700（bold body、button、tag）和 400（阅读正文）。当需要更平静的声音时，40px/48px 的编辑式标题会使用较轻的 300 weight。
- **不使用 italic，不给 body 做装饰性 letterspacing**：正文系统刻意中性，让 display 可以大声说话。
- **旋转品牌文字**：在 sustainability 区块中，"IMPACT" 以品牌红和大 display size 设置，并旋转 90° 沿暗色 world-map panel 的边缘垂直排布；这是模板用于标记机构数据 surface 的独特字体点缀。

### 关于字体替代

Vodafone 企业字体是专有字体。在开放系统中复现这种观感时，可用 **Inter** 的 400/600/800 weight 替代，或在可用时使用 **Neue Haas Grotesk**。Inter 在 display size（80px+）下需要将 letter-spacing 大约收紧 1-2%，以接近 Vodafone 字体的紧密 tracking；其 line-height 应在大写 display 层级中设置为 0.85-0.95。

## 4. Component Stylings

### Buttons

Vodafone 采用真正的双层 primary button 系统。两个层级都可以作为 primary call to action 使用；区别是上下文（form/chrome 与 editorial/content），而不是层级高低。

**Primary Red Rectangle**（utility / form CTA："Accept All Cookies"、"Subscribe"）
- Background: Vodafone Red (`#e60000`)
- Text: Pure White (`#ffffff`)，14.4px，weight 700，letter-spacing 0.144px
- Padding: 12px vertical，10px horizontal
- Border: 1px solid Vodafone Red (`#e60000`)
- Border radius: 2px，刻意保持锐利边角
- Default state: 实心红色填充，清脆 2px 边角
- Active state: 按下时短暂降至 `0.9` opacity

**Primary Red Pill**（editorial / content CTA："Link to Our approach to ESG"、"EXPLORE CONNECTING PEOPLE"）
- Background: Vodafone Red (`#e60000`)
- Text: Pure White (`#ffffff`)，14.4px，weight 700，letter-spacing 0.144px
- Padding: 16px uniform
- Border radius: 60px，完整 pill 形
- Default state: 实心红色填充，两端圆润
- Active state: 按下时短暂降至 `0.9` opacity

**Ghost White Rectangle**（secondary form action）
- Background: Pure White (`#ffffff`)
- Text: Form Text Grey (`#333333`)，14.4px，weight 700
- Padding: 12px vertical，10px horizontal
- Border: 1px solid Form Text Grey (`#333333`)
- Border radius: 2px
- Default state: 白色填充，charcoal 轮廓
- Active state: 按下时 opacity `0.9`

**Glass Pill**（放在暗色 hero 图像上，secondary content CTA）
- Background: 10% opacity 的 Pure White (`rgba(255,255,255,0.1)`)
- Text: Pure White (`#ffffff`)，weight 700
- Padding: 8px vertical，16px horizontal
- Border radius: 24px，完整 pill 形
- Default state: 柔和的半透明 pill，让照片透过按钮继续呼吸

**Content Ghost Pill**（编辑卡片内的 inline 低强调 content CTA）
- Background: 5% opacity 的 Black (`rgba(0,0,0,0.05)`)
- Text: Vodafone Red (`#e60000`)，14.4px，weight 700
- Padding: 15px uniform
- Border radius: 60px，完整 pill 形
- Default state: 近乎透明的 pill，红色文字

**Icon Control Button**（video play/pause、carousel arrows、close）
- Background: Pure White (`#ffffff`)
- Icon color: Charcoal Headline (`#25282b`)
- Border radius: 50%，完美圆形
- Outline: 1px solid white，用于 focus indication
- Size: 通常为 32-40px diameter

### Cards & Containers

**News / Editorial Card**（homepage article tile）
- Background: Pure White (`#ffffff`)
- Border radius: 6px（应用在 image corner 和 card container 上）
- Shadow: none；卡片依靠间距和图像 aspect ratio 分隔
- Internal layout: 顶部 16:9 image → 12px gap → eyebrow row（date + tag pill）→ 8px gap → H4 Bold title → 左右和底部 16px card padding
- Card image 使用 `object-fit: cover`，顶部圆角为 6px（top-left/top-right）

**Asymmetric Corner Card**（featured homepage cards）
- Background: Pure White (`#ffffff`)
- Border radius: `0px 6px 0px 0px`，刻意只让单个角变圆，呼应 Vodafone speech-mark logo 的弧形几何
- No shadow, no border；非对称 radius 本身就是视觉签名

**Circular Portrait / Pictogram Container**（sustainability page）
- Background: Pure White (`#ffffff`)
- Border radius: 100%，完美圆形
- 用于机构内容区里的 ESG pictogram 和 executive portrait

### Inputs & Forms

Vodafone 企业站首页没有暴露很多 inline form control，但 button-style input 遵循这些规则：

- Background: Pure White (`#ffffff`)
- Text: Form Text Grey (`#333333`)，16px，weight 400
- Border: 1px solid Form Text Grey (`#333333`)
- Border radius: 2px
- Padding: 12px 10px
- Error state（出现时）：1px border 切换为 Vodafone Red (`#e60000`)，error message text 继承同样红色，12px weight 600

### Navigation

**Top bar**
- Background: hero 图像上透明；滚动或内页时为 solid white (`#ffffff`)
- Height: desktop 约 64px，mobile 约 56px
- Logo: Vodafone speech-mark，40×40px red circle，内含白色 "speech-mark" cut-out，左对齐
- Nav links: 在白底上为 16px weight 400 Charcoal Headline (`#25282b`)；位于暗色 hero 图像上时反白
- Right-side utility: 小型 icon link（search、locale、menu），渲染为 24px icomoon glyph
- 在内页（Investors、Sustainable Business）上，top bar 会显示额外 secondary-nav row："Vodafone Business / Vodafone Foundation / Our site" label，右对齐

**Mobile collapse**
- 约 768px 时，水平 nav 折叠为 hamburger
- Mobile menu 以全宽 overlay 打开，白色 surface，18px weight 400 link row，每行 16px vertical padding

### Image Treatment

- **Hero images**: full-bleed 暗色氛围摄影（珊瑚礁、松林、电缆团队、城市暮色），带自然暗角或冷调 color grade；不需要 CSS overlay，因为图像本身已经预先分级
- **Card thumbnails**: 16:9 aspect ratio，6px 顶部 corner radius，与 card 匹配
- **Square editorial images**: feature module 中使用 1:1 ratio，始终为 6px corner radius
- **Round portraits**: executive headshot 和 ESG pictogram 使用 100%（完美圆形）
- **Loading**: scroll 时触发 lazy-loading；图像进入 viewport 后约 ~200ms 内稳定
- **No decorative borders on images**：card radius 已完成全部 framing

### Tag Pills / Badges

出现两种不同 pill 样式：

**Outlined Red Pill**（用于 article card metadata 的 inline 元素，例如 "EMPOWERING PEOPLE"）
- Background: 80% opacity 的 Pure White (`rgba(255,255,255,0.8)`)
- Text: 80% opacity 的 Near-black (`rgba(0,0,0,0.8)`)，12px，weight 600，大写
- Border: 1px solid Vodafone Red (`#e60000`)
- Padding: 6px
- Border radius: small-rounded（约 2px）

**Filled Neutral Pill**（更安静的 tag）
- Background: Light Neutral (`#f2f2f2`)
- Text: Charcoal Headline (`#25282b`)，14px，weight 700
- Padding: 4px 12px
- Border radius: 32px，完整 pill 形

### Red Divider Band

这是每个页面模板都会出现的签名可复用组件：一条全宽 Vodafone Red (`#e60000`) 色带横贯页面，将纪念碑式 hero 与下方编辑正文分开。它不承载文字，也没有控件；它只是品牌说出“new chapter”的方式。典型高度：40-80px。

### Share Ticker Panel（Investor pages）

锚定 investor template 的独特机构组件：
- Background: Charcoal Institutional Panel (`#25282b`)
- Large numeric display: share price 使用 48px weight 800 white type，并带负 letter-spacing（例如 "116.05 GBX"）
- Metadata row: delay notice（例如 "15-min delayed"）和 timestamp，使用 14px weight 400 secondary grey text
- Layout: 作为水平条位于 footer 上方，横跨完整 content width
- Hairline dividers (`rgba(255,255,255,0.25)`) 将 ticker 与 footer column 分隔

### Global Impact Map Panel（Sustainability pages）

锚定 sustainability template 的签名可复用组件：
- Background: Charcoal Institutional Panel (`#25282b`)
- 略浅灰色的暗色 minimal world-map illustration
- 红色 circular markers (`#e60000`) 标在品牌运营的地理位置上
- 垂直旋转的品牌词 "IMPACT" 使用 Vodafone Red、large display size（weight 800、大写、旋转 90°）沿面板一侧排布；这是模板的签名字体动作
- Small legend 位于 top-left，包含 red markers 和 white uppercase labels

### Footer

所有页面模板通用的组件：
- Background: Charcoal Institutional Panel (`#25282b`)
- Layout: 4-column link grid（Our company / Investors / Vodafone websites / Share price），后接 "Connect with us" social row 和 legal/privacy line
- Logo: 红色 speech-mark 在 bottom-right 以 32-40px 重复出现
- Column header type: 16px weight 800 uppercase white
- Column link type: 14px weight 400 white，纵向堆叠，12px row spacing
- Divider hairlines: `rgba(255,255,255,0.25)` 位于 column group 与 legal row 之间

## 5. 布局原则

### Spacing System

基础单位：**8px**。这套尺度同时容纳紧凑 UI（1px、2px、4px）和宽松的编辑节奏（16px、20px、24px、32px）。两个数值（`32px` 和 `38px`）在分析中的每个页面都出现，使它们成为模板的通用节奏常量。

| Token | Value | Typical Use |
|-------|-------|-------------|
| 2xs | 2px | Hairline separator |
| xs | 4px | 紧凑 control 中的 icon-to-text gap |
| sm | 8px | 基础节奏单位 |
| md | 12px | Card internal padding、eyebrow-to-title gap |
| base | 16px | Paragraph rhythm、card padding、pill button padding |
| lg | 20px | Section-internal spacing |
| xl | 24px | Card-to-card spacing、column gutter |
| 2xl | 32px | Section intro-to-content break，通用常量 |
| 3xl | 38px | Band-to-next-section vertical push，通用常量 |
| section | 64-96px | 主要编辑模块之间的垂直节奏 |

### Grid & Container

- **Max content width**: 超大屏约 1440px；article 和 hero module 通常位于 1200px
- **Column pattern on cards**: desktop（1200-1440px）为 3-up 或 4-up card grid，tablet（768-1024px）为 2-up，mobile（<768px）堆叠为 1-up
- **Horizontal padding**: desktop edge 32px，tablet 20px，mobile 16px
- **Gutters between cards**: desktop 24px，mobile 16px
- **Institutional panel（share ticker、world map、footer）**: 在每个 breakpoint 都始终 full-bleed、edge-to-edge

### Whitespace Philosophy

Vodafone 的编辑画布倾向宽松：空白被用作视觉调色板清洁剂，放在纪念碑式标题与随后的卡片网格或数据面板之间。区块以较高的垂直节奏（64-96px）分隔，偶尔加入红色色带，同时作为分隔符和品牌信号。卡片内部的间距紧凑高效（12-16px），让摄影成为舞台主角。

### Border Radius Scale

| Token | Value | Typical Use |
|-------|-------|-------------|
| hairline | 1px | Inline text wrap、小 badge |
| button-tight | 2px | Primary 和 secondary rectangle button corner，品牌的 utility-form 观感 |
| card | 6px | News card、image、input field |
| asymmetric | `0px 6px 0px 0px` | Featured card（仅 top-right corner） |
| glass-pill | 24px | 位于暗色 hero 图像上的 translucent white pill |
| badge-pill | 32px | Filled neutral pill badge |
| cta-pill | 60px | Primary red content CTA，品牌的编辑式按钮观感 |
| circle | 50% | Icon button、carousel arrow、close control |
| portrait | 100% | Circular portrait 和 ESG pictogram |

## 6. 深度与 Elevation

Vodafone 的系统刻意保持扁平。UI 中几乎没有传统 box-shadow。层级由色彩（red band、charcoal institutional panel）、字体 weight（800 vs 400）和间距承载。

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 — Surface | No shadow, no border | Default card、default section |
| 1 — Outline | 低 opacity 的 1px solid border | Ghost button、outlined pill |
| 2 — Inset Highlight | focus 时使用 `inset 0 0 0 1px` | Pressed / focused control |
| 3 — Photographic depth | 由摄影本身承载深度 | Hero imagery |
| 4 — Surface shift | 白色编辑画布下方切到 charcoal institutional panel | Share ticker / world map / footer |

阴影哲学：Vodafone 认为 drop shadow 会分散品牌清晰度。少数提取出的 shadow token 仅保留给 inset focus ring。系统中主导性的“elevation”不是脱离 surface 的投影，而是 **color surface shift**：从白色编辑画布切换到 charcoal institutional panel。

### Decorative Depth

唯一的装饰性深度线索是：
- 带有自身电影感色调深度的暗色氛围 hero 摄影（不需要 CSS overlay）
- Sustainability map 上旋转垂直的 "IMPACT" wordmark，它在 map panel 边缘制造了第四面墙的错觉

## 7. Do's and Don'ts

### Do

- 将 Vodafone Red (`#e60000`) 作为任何屏幕上最响亮的单一元素：每个 fold 一个 primary CTA，每个编辑分隔一个 red band
- 将 display headline 设置为大写、800 weight、紧密负 tracking；在 desktop 上让它达到 90-144px
- 将纪念碑式 display type 与平静的 16-18px 正文配对；这个尺度跳跃就是系统本身
- 按上下文切换按钮 radius：form 和 utility action 用 2px rectangle，editorial content CTA 用 60px pill
- 让纪实摄影以 16:9 或 1:1、6px radius 呼吸；不要装饰性边框，不要沉重 overlay
- 将 red band 用作每个 hero 与其下内容之间的 full-width chapter divider
- 用 charcoal institutional surface (`#25282b`) 锚定每个页面：footer 始终使用；在 investor/sustainability 页面上，同一颜色向上延展以包含 share ticker 或 global-impact map
- 尊重通用页面节奏：dark hero → red band → white editorial → charcoal institutional → charcoal footer

### Don't

- 不要引入第二个品牌 hue 与 Vodafone Red 竞争；不要 teal、purple 或 orange accent
- 不要把 rectangle button corner 柔化到超过 2px，也不要把 pill button corner 缩到低于 60px；这两种形状都承载系统身份
- 不要给 card 或 button 添加 drop shadow；系统有意保持扁平，并用 surface color 承载 elevation
- 不要在 background、button 或 text 上使用 gradient
- 不要在 body text 上混用 uppercase tracking；uppercase 只保留给 display、label 和 micro-label
- 不要用 italic 强调；改用 weight 600/700
- 不要用彩色 underline 或 highlight 装饰 headline；字体本身完成工作
- 不要在 text 或 surface 上使用 pure black (`#000000`)；始终使用 Charcoal Headline (`#25282b`)

## 8. 响应式行为

### Breakpoints

在三个模板中观察到的实际层级：

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | ≤ 600px | Nav 折叠为 hamburger；hero display 降至约 56-72px；card 堆叠为 1-up |
| Mobile Large | 601-767px | Hero display 约 72-90px；card 仍堆叠为 1-up |
| Tablet | 768-1023px | Nav 重新展开；card grid 为 2-up；hero display 约 90-120px |
| Laptop | 1024-1199px | Full nav；card 为 3-up；hero display 约 120-144px |
| Desktop | 1200-1439px | 标准编辑布局；card 为 3-up 或 4-up |
| Wide | ≥ 1440px | Content cap 为 1440px；outer canvas padding 增加 |

### Touch Targets

所有交互 control 在 mobile 上满足 44×44px 最小尺寸。Icon button 使用 40×40px 圆形 hit area，并在触摸设备上以 4px invisible padding 扩展。Primary CTA button 在 mobile 上约为 48×48px（pill 为 16px top/bottom + text line；rectangle 为 12px + text line）。

### Collapsing Strategy

- **Nav**: 768px 时水平 link 折叠为 hamburger；logo 在所有宽度上保持左对齐
- **Card grid**: 4-up → 1200px 时 3-up → 768px 时 2-up → 600px 时 1-up，gutter 从 24px 缩到 16px
- **Hero display type**: 随 viewport 缩小按 144 → 126 → 90 → 72 → 56px 逐级降低
- **Section padding**: desktop 垂直 96px，tablet 64px，mobile 48px
- **Red divider bands**: 每个 breakpoint 都保持 full-width；垂直高度从 desktop 约 80px 压缩到 mobile 约 40px
- **Institutional panels（share ticker / world map）**: 在 mobile 上，多列内容重新堆叠为单列垂直流，但 charcoal surface 仍保持 edge-to-edge
- **垂直旋转的 "IMPACT" wordmark**: 在 mobile 上转为 horizontal label，或在垂直空间有限时完全移除

### Image Behavior

- Hero imagery: mobile 使用 art-directed variant（更紧的裁切），desktop 使用宽幅氛围画面
- Card thumbnails: 无论 viewport 如何，始终保持 16:9；`loading="lazy"` 是标准做法
- Circular portraits: desktop 固定在 80-120px diameter，mobile 缩到 64-80px
- Logo: 所有 breakpoint 固定为 40×40px（保持一致的 brand mark size）

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA: "Vodafone Red (`#e60000`)"
- Background: "Canvas White (`#ffffff`)"
- Heading text: "Charcoal Headline (`#25282b`)"
- Body text: "Secondary Body Grey (`#7e7e7e`)"
- Institutional surface: "Charcoal Institutional Panel (`#25282b`)"
- Inline link: "Signal Blue (`#3860be`)"
- Quiet pill background: "Light Neutral (`#f2f2f2`)"

### Example Component Prompts

- "创建 primary red rectangle button：Vodafone Red (`#e60000`) background、pure white 14.4px weight 700 text、2px border radius（sharp corners）、12px vertical × 10px horizontal padding。用于 form 和 utility actions。No shadow, no gradient."
- "创建 primary red pill CTA：Vodafone Red (`#e60000`) background、pure white 14.4px weight 700 text、60px border radius（fully pill-shaped）、16px uniform padding。用于 editorial content calls-to-action."
- "设计 editorial news card：white background、6px border radius、顶部 16:9 image、12px eyebrow row，其中包含 date 和 red-outlined uppercase tag pill，随后是 24px weight 700 Charcoal title。No shadow；只用 spacing 分隔 card."
- "构建 hero section：dark atmospheric photo 作为 full-bleed background，monumental uppercase headline 为 144px weight 800、-1px letter-spacing，下方放一个 Vodafone Red pill CTA，不使用 overlay gradient."
- "创建 red divider band：full-width strip of Vodafone Red (`#e60000`)，desktop 高 64px、mobile 高 40px，没有文字、没有 control；它只作为 editorial section 之间的 visual chapter break."
- "设计 institutional data panel：full-bleed Charcoal Institutional Panel (`#25282b`) background，大型 numeric display 为 48px weight 800 white 并带 negative letter-spacing，下方是 14px weight 400 grey meta row。用于 share ticker 或 stats callout."
- "设计 global impact map：Charcoal Institutional Panel (`#25282b`) background、minimal grey world-map illustration，在运营地点放置 red Vodafone-red circular markers，将品牌词 'IMPACT' 设置为 large display size、brand red，并旋转 90° 沿一侧垂直排布."

### Iteration Guide

在细化用此 design system 生成的现有 screen 时：

1. 一次只关注一个 component；系统的活动部件很少，所以小改动会叠加出明显效果
2. 描述修改时，引用本文档中的具体 color name 和 hex code
3. 将自然语言（"sharper corners"、"more generous vertical rhythm"）与具体 measurement 搭配使用
4. 对 radius 拿不准时请记住：form/utility button 用 2px，editorial pill 用 60px，card 用 6px，icon 和 portrait circle 用 50%/100%
5. 保持品牌规则绝对：任何给定 fold 中只应有一个 Vodafone Red 元素占据主导

### Known Gaps

- Form input style（text fields、dropdowns、toggles）没有在这些页面模板中暴露；其规格由 ghost-button pattern 推断，设计真实表单时可能需要细化
- Vodafone 企业字体是专有字体，无法在开放系统中完全复现；在 display size 收紧 tracking 的 Inter 是最接近的开放替代方案
- Animation 和 transition timing 有意未记录；站点很少使用它们，且无法从静态分析中提取这些值
- Share ticker 的准确数字样式（separator、currency glyph）来自 investor-page screenshot；其他地区变体可能显示不同
