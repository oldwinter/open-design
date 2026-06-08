# Inspired by The Verge 的 Design System

> Category: Media & Consumer
> 科技编辑媒体。Acid-mint 与 ultraviolet accent，Manuka display，rave-flyer 风格 story tile。

## 1. 视觉主题与氛围

The Verge 的 2024 redesign 像是有人把一本 Condé Nast 杂志接到了 chiptune soundboard 上。画布几乎是黑色（`#131313`），标题由极其厚重的 display face（Manuka）构成，最高可达 107px，整个页面点缀着 acid-mint `#3cffd0` 和 ultraviolet `#5200ff`；它们不像普通品牌色，更像 hazard tape。Story tile 不是安静的灰色卡片，而是饱和、full-bleed 的色块（yellow、pink、orange、blue、purple），感觉像贴成时间线的 rave flyer。气氛是“developer console 遇上 club night，再遇上 tech tabloid”：严肃到足以报道国会听证会，也响亮到足以评测一台 synthesizer。

让这套系统一眼可辨的是 **StoryStream** timeline：一个垂直 feed，其中每条 post 都是圆角矩形，通常为 20-40px radius，色彩从边到边铺满，外有细边框，并在左侧 rail 上标出 mono-uppercase timestamp。Story 不漂浮在 grid 上；它们沿一条 dashed vertical rule 堆叠，像 git log 里的 commit。其上方，巨大的 **"The Verge" wordmark** 用 hero scale 的 Manuka 统治 masthead，让读者在任何 headline 加载前就知道这里是编辑领地，不是模板。

Homepage 上没有 "light mode"；暗色画布就是产品本身，palette 只会在单个 story tile 使用 mint 或 yellow 填充时发生反转。深度几乎完全扁平：**hairline 1px borders**（`#ffffff`、`#3cffd0` 或 `#5200ff`）承担了 Material 风格站点里阴影要做的工作。每个 container 要么是带 1px outline 的 `#131313`，要么是完全饱和的 accent block，要么是 slate-gray `#2d2d2d` secondary surface。

**关键特征：**
- Near-black editorial canvas (`#131313`) 作为默认 surface；homepage 没有 light mode
- Acid-mint `#3cffd0` + ultraviolet `#5200ff` 作为 hazard-tape accent，而不是安静背景色
- 最高 107px 的巨大 Manuka display headline；主流科技媒体里最响亮的单一字体动作
- 一切都像 rounded pill-card：20/24/30/40px corner radii，绝不方正
- 暗色页面上使用完全饱和的 color-block story tile（mint、purple、yellow、pink、orange、electric blue）
- Timeline 式 "StoryStream" feed，用 mono uppercase timestamp 替代传统杂志 grid
- 扁平深度；white、mint、purple 的 1px border 负责其他系统里 shadow 的工作

## 2. 色彩 Palette 与角色

### Primary (Brand Hazards)
- **Jelly Mint** (`#3cffd0`): The Verge 标志性的 acid-mint accent。用于 CTA button fill、link underline、active tab border 和高注意力 story-tile background。把它当成 neon safety paint 的视觉等价物，只少量施加在屏幕上最重要的元素上。
- **Verge Ultraviolet** (`#5200ff`): 互补的品牌 hazard。用于 secondary color-block tile、promotional span，以及偶尔出现的 outlined button。常以 0.9 alpha 使用，柔化它的 cathode 强度。

### Secondary & Accent
- **Console Mint Border** (`#309875`): jelly mint 的更深变体，用在 card outline 和 button border 上，避免纯 mint 过度饱和。
- **Deep Link Blue** (`#3860be`): link *hover* color，也是站点中蓝色出现的唯一时刻。它会在所有 link style 的 hover 中替换 mint/white/black。
- **Focus Cyan** (`#1eaedb`): 只保留给 button focus ring。键盘 focus 之外不出现。
- **Purple Rule** (`#3d00bf`): 更深的 ultraviolet 变体，用作 StoryStream `<li>` item 上的 vertical border。

### Surface & Background
- **Canvas Black** (`#131313`): 整个 homepage 的默认暗色 surface。几乎是黑色但不是纯黑，带足够温度，让它像印刷 newsprint 的负片，而不是 OLED 空洞。
- **Surface Slate** (`#2d2d2d`): Secondary card background，在 story tile 不需要成为饱和色块时使用。
- **Image Frame** (`#313131`): 包裹 inline imagery 的 1px border。
- **Hazard White** (`#ffffff`): 用作 story-tile fill、button border 和 primary text。当白色以大色块出现时，那是编辑决策，像把 spotlight 打在该 tile 上。
- **Absolute Black** (`#000000`): 只保留给 mint/yellow/white tile 上的文字；这是它唯一出现的位置。

### Neutrals & Text
- **Primary Text** (`#ffffff`): canvas 上的 headline 和 display text。
- **Secondary Text** (`#949494`): Byline、timestamp、photo credit；锚定 metadata layer 的中灰。
- **Muted Text** (`#e9e9e9`): 暗 slate button 上的 button text。略微偏离纯白，以降低屏幕刺眼感。
- **Inverted Text** (`#131313`): 只用于 accent tile（mint、yellow、white），以保持可读对比。

### Semantic & Accent
- **Focus Ring** (`#1eaedb`): 仅用于 keyboard focus。
- **Overlay Black** (`rgba(0, 0, 0, 0.33)`): 微妙的 1px ring，用作 stacked card 上安静的 shadow 替代。
- **Dim Gray** (`#8c8c8c`): Active/pressed button background，即“按下去”的状态。

### Gradient System
The Verge 使用 **零装饰性 gradient**。唯一类似渐变的处理，是 saturated accent story tile（mint/purple/yellow）与行间 `#131313` canvas 之间的过渡。颜色以实心色块应用，而不是 wash。这是有意选择；如果任何东西柔和淡出，站点的 hazard-tape 视觉身份就会瓦解。

## 3. 字体规则

### Font Family
- **Manuka** (Klim Type Foundry)：fallback 为 Impact、Helvetica。The Verge wordmark 和 feature headline 的签名 display face。这是一款 heavy-weight (900) industrial sans-serif，姿态压缩且近似运动感。Homepage 上运行在 60-107px，绝不更小。
- **PolySans** (PanGram Pangram / Nikolas Wrobel)：fallback 为 Helvetica、Arial。UI 与 secondary headline 的主力字体。覆盖系统中的 300 / 500 / 700 weights，从 kicker caption 到 body deck 都由它承担。
- **PolySans Mono**：fallback 为 Courier New、Courier。Monospaced sibling，专用于 ALL-CAPS label：kicker、timestamp、category tag、button label。这种 mono-uppercase 用法是继 Manuka 之后第二可识别的 Verge 细节。
- **FK Roman Standard** (Florian Karsten)：fallback 为 Georgia。只少量用于特定 body/caption 处理（article excerpt、某些 review pull）。它为 PolySans stack 提供“印刷杂志”式对位。
- **Roboto**：fallback 为 `-apple-system`、`system-ui`。用于 widget 和 legacy module 的 utility UI font。

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Hero Wordmark / Display | Manuka | 107px / 6.69rem | 900 | 0.80 | 1.07px | 页面顶部 "The Verge" logo 与 feature headline |
| Secondary Display | Manuka | 90px / 5.63rem | 900 | 0.80 | — | Section-level feature headline |
| Tertiary Display | Manuka | 60px / 3.75rem | 900 | 0.80 | — | Inline feature callout |
| Large Headline | PolySans | 34px / 2.13rem | 700 | 1.00 | — | Section 和 module headline |
| Heading Wide | PolySans | 32px / 2.00rem | 400 | 1.10 | 0.32px | Sub-hero、promotional unit |
| Heading Medium | PolySans | 24px / 1.50rem | 700 | 1.00 | — | Main feed 中的 story tile headline |
| Heading Small | PolySans | 20px / 1.25rem | 700 | 1.00 | — | Compact tile headline |
| Light Capitalized Label | PolySans | 19px / 1.19rem | 300 | 1.20 | 1.9px | 细字重 capitalized eyebrow，Verge 的独特动作 |
| All-Caps Label XL | PolySans | 18px / 1.13rem | 400 | 1.10 | 1.8px | UPPERCASE section kicker |
| Bold Body | PolySans | 16px / 1.00rem | 700 | 1.00 | — | Deck 内的强调 |
| Body Relaxed | PolySans | 16px / 1.00rem | 500 | 1.60 | — | Long-form reading body |
| Inline Label | PolySans | 15px / 0.94rem | 400 | 1.20 | 0.15px | UI label 和 secondary headline |
| Body Compact | PolySans | 13px / 0.81rem | 400 | 1.60 | — | Secondary caption 和 deck |
| Eyebrow All-Caps | PolySans | 12px / 0.75rem | 400 | 1.30 | 1.8px | Tile headline 上方的 UPPERCASE kicker |
| Tag Label | PolySans | 12px / 0.75rem | 400 | 1.20 | 0.72px | UPPERCASE category tag |
| Caption Micro | PolySans | 11px / 0.69rem | 400 | 1.20 | 1.1px | UPPERCASE byline |
| Meta Nano | PolySans | 10px / 0.63rem | 500 | 1.40 | 1.5px | UPPERCASE timestamp microtext |
| Mono Button Label | PolySans Mono | 12px / 0.75rem | 600 | 2.00 | 1.5px | UPPERCASE button text，leading 很开 |
| Mono Timestamp | PolySans Mono | 11px / 0.69rem | 500/600 | 1.20 | 1.1-1.8px | UPPERCASE StoryStream timestamp |
| Serif Body | FK Roman Standard | 16px / 1.00rem | 400 | 1.30 | -0.16px | Review deck、print-voice excerpt |
| Serif Caption | FK Roman Standard | 20px / 1.25rem | 400 | 1.20 | — | Magazine-style pull quote |

### Principles
- **Manuka 永远是 hero，不是 UI。** 如果你在 60px 以下看到 Manuka，那就是 bug。它存在是为了 *喊出品牌*，不是标记 button。
- **PolySans 是主力，PolySans Mono 是穿制服的 sibling。** Mono 只用于 UPPERCASE label、timestamp、tag 和某些 button。这个系统里不存在 lowercase mono。
- **Thin-weight (300) capitalized headlines** 是 Verge 的签名动作。19-20px、weight 300、1.9px tracking 形成一种“fashion magazine whisper”，与上方 107px Manuka 的喊声形成对比。这种 whisper-vs-shout 对比就是字体指纹。
- **Letter-spacing 有两个档位**：ALL-CAPS mono 和 sans label 使用 positive（0.72-1.9px），少量 serif 出现时使用 negative（`-0.16px`），巨大 display 使用 barely-positive（0.32px、1.07px）。Plain 0 letter-spacing 很少见。
- **FK Roman Standard 是编辑例外，不是规则。** 只保留给 long-form print-voice 时刻，例如 review、critic pull、masthead essay。绝不用于 UI。
- **Line height 很紧**：display 和 label 全部是 0.80-1.30，只有 reading body 和 mono button label 放松到 1.60-2.00。leading 的跳跃是有意的，它给页面带来“telegraph ticker”节奏。

### 关于字体替代
Manuka display（107px、90px、60px）的 0.80 line-height 假设使用 **Klim Type Foundry 的专有 Manuka 字体**，其 vertical metrics 非常紧，专为大尺寸下的 athletic stance 设计。如果替换为 **Anton**、**Oswald**、**Bebas Neue** 或 **Archivo Black** 这类 wide-metric open-source condensed display，请将 display line-height 大约放松 **+0.10 到 +0.15**，避免 ascender/descender 碰撞（例如 0.80 → 0.95）。PolySans 替代字体（Space Grotesk、DM Sans、Hanken Grotesk）可直接使用 token 值；它们的 metrics 足够接近。PolySans Mono 替代（Space Mono、JetBrains Mono）和 FK Roman 替代（Newsreader、Literata）也无需调整。

## 4. Component Stylings

### Buttons

**Primary — Jelly Mint Pill**
- Background: `#3cffd0` (Jelly Mint)
- Text: `#000000` (Absolute Black)，PolySans 16px / 700 或 PolySans Mono 12px / 600 UPPERCASE
- Border: none（纯 fill）
- Border radius: `24px`，完整 rounded pill
- Padding: `10px 24px`
- Outline: 静止时 `none`
- Hover: background 切换为 `rgba(255, 255, 255, 0.2)`（translucent white），text 保持 black，并增加 1px `#c2c2c2` ring shadow
- Active: background `rgba(140, 140, 140, 0.87)`，opacity `0.5`，ring shadow `#8c8c8c`
- Focus: background `#1eaedb`，white text，1px solid `#0500ff` border，translucent white focus ring
- Transition: background 和 shadow 约 180ms ease

**Secondary — Dark Slate Pill**
- Background: `#2d2d2d` (Surface Slate)
- Text: `#e9e9e9` (Muted Text)，PolySans 16px / 400
- Border: none
- Border radius: `24px`
- Padding: `10px 24px`
- Outline: `rgb(233, 233, 233) none 0px`
- Hover: 与 primary 相同的 translucent white invert：`rgba(255, 255, 255, 0.2)` bg、black text、1px `#c2c2c2` ring
- Focus: 与 primary 相同的 cyan focus treatment

**Tertiary — Outlined Mint**
- Background: transparent
- Text: `#3cffd0`，PolySans Mono 12px / 600 UPPERCASE，1.5px tracking
- Border: `1px solid #3cffd0`
- Border radius: `40px`，用于 secondary outline style 的更大 pill
- Padding: 约 `10px 20px`
- Hover: 反转为 mint fill、black text
- Transition: 150ms ease

**Outlined Ultraviolet (Promotional)**
- Background: transparent
- Text: `#5200ff` 或 `#ffffff`
- Border: `1px solid #5200ff`
- Border radius: `30px`
- 用于 "Subscribe" 或 "Join the Stream" 风格的 promotional callout

**Pill Tag (Non-interactive)**
- Background: saturated accent（`#3cffd0`、`#5200ff`、yellow 等）
- Text: 根据 background luminance 选择 black 或 white
- Border radius: `20px`（比 button 更紧；这是 *text pill*）
- Font: PolySans Mono 11px / 600 UPPERCASE，1.8px tracking
- Padding: 约 `4px 10px`

### Cards & Containers

**StoryStream Tile**
- Background: `#131313` + 1px white border，或 saturated accent fill（mint、purple、yellow、pink、orange、white）
- Border radius: `20px`（标准）或 `24px`（feature）
- Border: 暗色上为 `1px solid #ffffff`，mint 上为 `0px 0px 1px solid #3cffd0`，饱和 fill 上可无边框
- Padding: 内部约 24-32px
- Hover: no lift、no scale；headline text color 从 white 过渡到 `#3860be`（deep link blue）
- Transition: 仅 color 150ms ease

**Feature Card (Top Story)**
- Background: 带 1px hairline border 的 `#131313`，或 full-bleed color accent
- Border radius: `24px`
- Padding: 32px+
- Image inside: 裁切以匹配 outer radius（嵌套时 inner radius 为 `3px` 或 `4px`）
- Hover: 只移动 text color；image 保持静态

**StoryStream Rail (Timeline)**
- 一条 vertical dashed 或 solid rule（1px `#3d00bf` 或 `#ffffff`）沿每个 item 左边缘运行，标记 timeline spine
- Timestamp 位于 left rail，使用 PolySans Mono 11px / 500 / UPPERCASE / 1.1px tracking
- 每条 entry 都是 pill-cornered rectangle，相邻项之间有 12-16px vertical gap

### Inputs & Forms
- **Default**: `#131313` background，1px solid `#ffffff` 或 `#949494` border，`2px` border radius（紧凑的 newspaper-form 感），PolySans 15px text 为 `#ffffff`，placeholder 为 `#949494`。
- **Focus**: border 过渡到 `#3cffd0`（jelly mint），deep focus 时可选 `1px solid #5200ff` inner ring。No glow。
- **Error**: border 变为 `#5200ff`（ultraviolet；这里作为 error/alert accent，而不是常见红色）。
- **Transition**: border-color 约 150ms ease。

### Navigation

- **Top nav**: 纤薄的 `#131313` bar，左侧是 Verge wordmark（Manuka），右侧有 search icon、几个 UPPERCASE mono category links（12-14px、PolySans Mono、1.5-1.8px tracking），以及固定在最右的单个 mint-pill CTA（通常是 "Subscribe"）。
- **Wordmark**: 首屏滚动时极大；homepage 把 "The Verge" logo 当作 hero element，而不是 32px corner logo。
- **Hover**: 每个 link 都从 `#ffffff` 过渡到 `#3860be`（deep link blue）。无 underline；只用颜色响应。
- **Active section**: 以 1px mint underline 标记（inset box-shadow `0px -1px 0px 0px inset #3cffd0`）
- **Mobile**: wordmark 缩小，category nav 折叠为 hamburger drawer。Drawer 内的 link 是 mono-uppercase，并以 16-20px gap 堆叠。

### Image Treatment

- **Aspect ratios**: hero 和 feature image 以 16:9 为主，mid-feed 为 4:3，thumbnail 和 author avatar 为 1:1。
- **Corners**: 始终圆角以匹配 parent card；`3px`、`4px`，或继承 tile 的 `20px` / `24px`。
- **Frame**: 摄影外有 1px `#313131` 或 `#ffffff` hairline，带来“contained Polaroid”感。
- **Full-bleed**: 只出现在 color-block tile 内，image 延伸到 accent fill 的 padded edge。
- **Hover**: 静态；no zoom、no scale、no opacity shift。唯一交互响应是下方 headline。
- **Lazy loading**: first fold 以下全部使用 `loading="lazy"`；只有 masthead hero 使用 eager。

### StoryStream Timeline Item (Distinctive)

- Vertical rail line（`#131313` 上的 1px `#3d00bf` 或 `#ffffff`）
- 左侧 PolySans Mono 11px / UPPERCASE 的 mono timestamp
- Pill-cornered body card（20px radius），包含 kicker、headline 和可选 deck
- 以 12-16px gap 垂直堆叠，rail 在它们之间继续延伸
- 常与 full-bleed accent tile 交错出现，用于“打破”timeline rhythm 并加强重点

## 5. 布局原则

### Spacing System
- **Base unit**: 8px。
- **Scale**: 1, 2, 4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 20, 24, 25px。
- **Section padding**: major feed section 之间垂直 32-64px。StoryStream item 本身更紧，gap 为 12-16px。
- **Card padding**: 内部 20-32px。Feature card 扩展到 40-48px。
- **Inline spacing**: kicker 位于 headline 上方约 6-10px；headline 位于 deck 上方约 10-14px；timestamp 位于 deck 下方约 6-8px。
- **Micro-scale**: 2/4/5/6/9/10px 值用于 button、pill 和紧凑 label cluster 内部，而不是编辑 grid。

### Grid & Container
- **Max width**: 约 1280-1300px（dembrandt 检测到 1200/1280/1300 breakpoint）。
- **Column patterns**: 底层为 12-column grid，解析为 3-column hero + 1-column StoryStream rail + feature panel。Homepage 感觉自由，是因为 color-block tile 经常随性跨 2-3 column。
- **Container padding**: mobile 外边缘 24px / desktop 外边缘 48px。
- **Gutters**: column 之间 16-24px，StoryStream item 内更紧（8-12px）。

### Whitespace Philosophy
The Verge 对待 whitespace 的方式像 club DJ 对待 silence：它是响亮时刻之间的戏剧性重置。画布足够暗，accent 足够饱和，以至于两个 tile 之间 32px 的空 `#131313` 也像 palette cleanser。页面不像 Apple 或 Stripe 那样 airy；它是 **paced** 的，用响亮的 hazard-color block 打断近黑色的连续段落。Whitespace 承载的是节奏，而不是优雅。

### Border Radius Scale
- **2px**：input、小 badge（像 typewriter tag）
- **3px**：inline image（刚好缓和 canvas 上的锐度）
- **4px**：nested card image 和小型 button variant
- **20px**：standard pill card 和 color-block tile
- **24px**：feature tile radius 和 primary button pill
- **30px**：large promotional button
- **40px**：outlined CTA pill（系统里最响亮的 pill）
- **50%**：avatar circle、icon button 和某些 round badge

八个离散 radius 值，对单个站点来说非常多。这是有意的：2px typewriter tag、20px pill card 和 40px outlined button 之间的节奏创造了一种“nested scale”感，每个 component 都通过 corner 宣告自己的层级。

## 6. 深度与 Elevation

| Level | Treatment | Use |
|---|---|---|
| 0 | No border, no shadow | 默认 `#131313` canvas text |
| 1 | `rgba(0,0,0,0) 0px 0px 0px 0px inset` (placeholder) | Interactive element 的 reset state |
| 2 | `1px solid #ffffff` 或 `#313131` hairline | Image frame 和安静 card outline |
| 3 | `1px solid #3cffd0` hairline | Active button outline、focused story tile |
| 4 | `1px solid #5200ff` hairline | Promotional/alternate state outline |
| 5 | `rgba(0, 0, 0, 0.33) 0px 0px 0px 1px` | 唯一“atmospheric” ring，用于 layered card |
| 6 | `0px -1px 0px 0px inset`（mint/black/white） | Active tab underline，Verge 的签名动作 |
| 7 | Saturated accent fill（`#3cffd0`、`#5200ff`、white、yellow、pink） | 通过 color 而不是 shadow 实现 story-tile elevation |

The Verge 的深度哲学是 **color-as-elevation**。当某个东西需要突出时，它不会获得 shadow，而是获得 mint fill 或 1px hazard-color border。提取出的 token 中有 14 个 shadow entry，但它们全都是 inset underline（0px -1px inset）或近透明 1px ring，没有传统 elevation shadow。`#131313` canvas 始终完全扁平，层级由色彩饱和度承载。

### Decorative Depth
- Active tab/nav link 上的 **1px inset underline**（根据上下文为 mint、black 或 white）
- Stacked card 上微妙的 **`rgba(0, 0, 0, 0.33)` 1px ring**，这是唯一略像 shadow 的效果
- 全站 **No gradients, no glows, no atmospheric blurs**。如果任何东西柔和淡出，hazard-tape aesthetic 就会破裂。

## 7. Do's and Don'ts

### Do
- **Do** 在每个 view 中使用 `#131313` 作为 canvas。没有 light mode。
- **Do** 将 Jelly Mint (`#3cffd0`) 和 Verge Ultraviolet (`#5200ff`) 用作 hazard accent：button、border、active state 和 saturated color-block tile。
- **Do** 只在 60px+ 的 hero headline 中使用 Manuka。任何更小的用法都视为 bug。
- **Do** 让所有东西圆起来：card 用 20px，feature card 用 24px，pill button 用 30-40px。
- **Do** 将 PolySans Mono 用于 UPPERCASE label、timestamp、kicker 和 button text。这里不存在 lowercase mono。
- **Do** 给每个 ALL-CAPS label 应用 1.5-1.9px letter-spacing；这是 Verge 签名。
- **Do** 使用 saturated color-block tile（mint、purple、yellow、pink、orange、white）提升 story；绝不用 drop shadow。
- **Do** 在每个 link hover 上使用 `#3860be`（deep link blue），无论 base color 是什么。
- **Do** 在 feed view 中应用 StoryStream timeline rail（1px dashed/solid `#3d00bf` 或 white）。
- **Do** 使用 19-20px、1.9px tracking 的 thin-weight (300) PolySans 作为 "fashion-whisper" capitalized eyebrow；它与 107px Manuka shout 的对比就是完整声音。

### Don't
- **Don't** 使用浅色背景。暗色画布就是产品。
- **Don't** 为 elevation 添加 `box-shadow`。改用 1px border 或 saturated accent fill。
- **Don't** 使用方角。每个 interactive 和 content container 都是圆角。
- **Don't** 将 Manuka 用于 UI、button 或 body copy。它严格用于 display。
- **Don't** 使用 lowercase mono。PolySans Mono 永远是 UPPERCASE。
- **Don't** 让 mint 和 ultraviolet 作为 background wash 出现；它们是 hazard accent，不是 canvas tint。
- **Don't** 在任何地方使用 gradient。系统只使用 solid color block。
- **Don't** 在声明的 mint / purple / yellow / pink / orange tile palette 之外引入新 accent color。
- **Don't** 在同一个 headline cluster 中将 Manuka 与 FK Roman Standard 搭配；Manuka 是唯一 display shout，serif pull 保留给 body moment。
- **Don't** 在低于 16px 时把 `#3cffd0` text 放在 `#131313` background 上；小尺寸下对比会振动。

## 8. 响应式行为

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Small Mobile | <400px | Single column，Manuka hero 缩到约 48-54px，StoryStream rail 折叠为 inline timestamp |
| Mobile | 400-549px | Single column，color-block tile full-width 堆叠，nav 是 hamburger drawer |
| Large Mobile | 550-767px | 仍为 single column，但 padding 打开，tile radii 保持 20px |
| Tablet | 768-1023px | 2-column StoryStream，feature card 跨列，wordmark 缩小约 50% |
| Small Desktop | 1024-1179px | 完整 3-4 column editorial grid，mint pill CTA 恢复到 nav |
| Desktop | 1180-1299px | 最大 padding，Manuka wordmark 达到完整 hero scale |
| Large Desktop | ≥1300px | Container cap 约 1280-1300px，边缘 whitespace 扩展，不再继续缩放 |

dembrandt sweep 检测到 26 个 intermediate breakpoint（1300 → 1280 → 1200 → 1181 → 1180 → 1179 → 1024 → 1023 → 901 → 900 → 897 → 896 → 890 → 769 → 768 → 620 → 605 → 600 → 550 → 549 → 530 → 426 → 425 → 400 → 320）。The Verge 几乎在每个主要设备边界都调校 grid，这是一种异常激进的 responsive strategy。

### Touch Targets
- Primary pill button 最小高度约 44px（10px vertical padding + 16px text + 2px border），满足 WCAG AA。
- Mono uppercase nav link 较小（约 28-32px 高）；在 derivative work 中，mobile 上应 padding 到 44px。
- Circle icon button 为 40-44px circle，touch-friendly。

### Collapsing Strategy
- **Nav**: wordmark 从 hero（Manuka 60-107px）缩到 mobile 上约 24-32px。Category link 在 900px 以下折叠为 hamburger drawer。
- **Grid**: 4-col → 3-col → 2-col → 1-col。Desktop 上跨 2 column 的 feature card 在 mobile 上 reflow 为 full-width single-column。
- **Spacing**: section padding 从 64px → 32px → 20px 收紧。Tile interior padding 从 32px → 20px 收紧。
- **Type**: Manuka hero 从 107px 缩到 mobile 上约 48-54px。PolySans headline 从 34px → 24px。Mono label 固定在 11-12px（它们不会继续缩小，否则不可读）。
- **Color tiles**: accent story block 在 mobile 上绝不降低饱和度，只是 reflow 为 full width。

### Image Behavior
- 通过 `srcset` 使用 responsive raster，并保持 aspect ratio。
- 无 art-direction swap；同一 crop 跨所有 viewport 缩放。
- Fold 以下全部使用 `loading="lazy"`，masthead hero 使用 `eager`。
- Color-block tile 内的 image 继承 tile 的 inner radius（4px 或嵌套的 20px）。

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA**: "Jelly Mint (`#3cffd0`)"
- **Background (Canvas)**: "Canvas Black (`#131313`)"
- **Accent (Secondary Hazard)**: "Verge Ultraviolet (`#5200ff`)"
- **Heading Text**: "Hazard White (`#ffffff`)"
- **Body Text**: "Hazard White (`#ffffff`)"（primary）或 "Muted Text (`#e9e9e9`)"
- **Secondary Text / Metadata**: "Secondary Text (`#949494`)"
- **Card Border**: 暗色上的 "Hazard White (`#ffffff`)" hairline，mint variant 上的 "Console Mint Border (`#309875`)"
- **Link Hover**: "Deep Link Blue (`#3860be`)"

### Example Component Prompts
1. *"在 `#131313` canvas 上创建 StoryStream timeline item：一个 20px-radius rectangle，带 1px solid `#ffffff` border；左侧 rail 上放 PolySans Mono 11px / 600 / UPPERCASE / 1.1px tracking timestamp；上方是 mint (`#3cffd0`) 的 12px PolySans UPPERCASE kicker，下方是 white 的 24px / 700 PolySans headline。No shadow, no lift；hover 只将 headline color 切换为 `#3860be`。"*
2. *"设计 primary subscribe button：Jelly Mint (`#3cffd0`) fill，black text，使用 PolySans Mono 12px / 600 / UPPERCASE / 1.5px tracking，24px border radius，10px × 24px padding。Hover state 切换为 `rgba(255, 255, 255, 0.2)` background，并带 1px `#c2c2c2` ring shadow，180ms ease。"*
3. *"构建 feature hero：107px Manuka 900 headline，white，1.07px letter-spacing 和 0.80 line-height；上方是 thin-weight 300 PolySans 20px capitalized kicker，1.9px tracking；放在带 64px vertical padding 的 `#131313` canvas 上。"*
4. *"创建 color-block accent tile：填充 Verge Ultraviolet (`#5200ff`) at 0.9 alpha，24px border radius，white text，顶部是 PolySans Mono 11px UPPERCASE category label，1.5px tracking，下方是 32px PolySans 400 capitalized headline，0.32px tracking。"*
5. *"设计 dark slate secondary button：`#2d2d2d` background，`#e9e9e9` PolySans 16px text，24px radius pill shape，10px × 24px padding。Hover 与 primary button 一致，即 translucent white `rgba(255, 255, 255, 0.2)` bg 加 black text。"*

### Iteration Guide
在细化用此 design system 生成的现有 screen 时：
1. **Audit the canvas.** 如果 homepage 上任何地方出现浅色背景，把它压平成 `#131313`。没有 light mode。
2. **Audit corners.** 每个 rectangle 都应落在 2/3/4/20/24/30/40px 或 50%。Square corner 会破坏声音。
3. **Audit shadows.** 移除所有不是 1px inset underline 或 1px hazard-color border 的 `box-shadow`。The Verge 用 color 做 elevation，不用 shadow。
4. **Audit type roles.** Manuka 只用于 ≥60px。PolySans Mono 只用 UPPERCASE。19-20px 的 PolySans 300 应带 1.9px tracking。FK Roman 只用于 body/magazine moment，绝不用在 UI。
5. **Audit accent usage.** Mint 和 ultraviolet 应作为 hazard accent 出现：button、1px border、active underline、saturated tile fill。如果它们作为 background wash 或 gradient fade 出现，请改为 solid block。
6. **Audit labels.** 每个 kicker、timestamp、category tag 和 button label 都应为 ALL CAPS，并带 1.1-1.9px letter-spacing。缺 tracking 就缺了声音。
7. **Audit link hover.** 每个 link 无论 base color 如何，都应 hover 到 `#3860be` deep link blue，且无 underline。任何其他 hover color 都是 drift。
