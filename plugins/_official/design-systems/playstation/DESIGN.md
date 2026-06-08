# Inspired by PlayStation 的 Design System

> Category: Media & Consumer
> 游戏主机零售。三 surface channel layout，quiet-authority display type，cyan hover-scale。

## 1. 视觉主题与氛围

PlayStation.com 的姿态像一家高端消费电子品牌的市场部门，只是它恰好销售娱乐。页面被组织成一个 **交替 surface 的垂直 channel**：近黑色 masthead 和 hero，中部一系列 paper-white 编辑面板，以及锚定整个体验的深 cobalt-blue footer。在这些 surface mode 之间，站点强烈依赖摄影和 3D 产品渲染，例如 PS5 console、game cover art、DualSense controllers，让硬件承担情绪工作，而 chrome 保持克制。

签名式字体动作是 **大尺寸 SST Light (weight 300)**。Sony 自定义 SST family 从 22px 到 54px 都使用 weight 300，让 display headline 拥有低声、优雅的质感，比起游戏商店，更接近奢侈腕表广告。这种 "quiet authority" 与 The Verge 的 Manuka shout 或 Wired 的 newsstand density 正好相反：PlayStation 希望字体后退，让产品领先。Body 和 UI 依赖 500-700 weight，但 *display* 声音始终纤细而平静。

克制被打破的唯一地方是 **interaction**。每个 primary button 都有相同的 hover 动作：fill 切换为 electric cyan `#1eaedb`，出现 2px white border，背后绽开 2px PlayStation-blue outer ring，整个 button **scale up 1.2×**。这种 color pop、border、ring 和 lift-scale 的组合，是 Sony 在主要品牌中独有的签名动作：一个微型 "power-on" animation，站点在单页中重复数百次。

**关键特征：**
- 三 surface channel layout：near-black hero、paper-white content、cobalt-blue footer，交替出现，绝不混合
- SST weight 300 在 22-54px display 上使用，形成让产品摄影领先的 "quiet authority" headline
- PlayStation Blue `#0070cc` 作为品牌锚点；cyan `#1eaedb` 只保留给 hover/focus state
- 每个 interactive element hover 时 scale 1.2×，这是 PlayStation 独有的 "power-on" lift
- Pill button 使用完整 999px radius；card art 位于 12-24px rounded rectangle 中
- Commerce-orange `#d53b00` 只用于 PlayStation Store / buy-state CTA
- Breakpoint 覆盖到 2120px，站点一路扩展到 4K-TV 浏览场景

## 2. 色彩 Palette 与角色

### Primary (Brand Anchor)
- **PlayStation Blue** (`#0070cc`): 品牌锚点色。用于 primary footer、inline link、暗色 surface 上的 primary button fill，以及每个 "official" marker。把它视为不可移动；这是消费者记忆中最能联想到该品牌的颜色。
- **Console Black** (`#000000`): 用于 masthead、hero backdrop 和产品展示区的纯黑。PlayStation 使用黑色框住硬件，就像博物馆用黑色框住雕塑。

### Secondary & Accent
- **PlayStation Cyan** (`#1eaedb`): 交互色。只应用于 button 和 link 的 hover、focus、active state。绝不作为默认 background 或静止 text color。Hover 时与 2px `#ffffff` border 和 2px `#0070cc` outer ring 配合，形成完整签名处理。
- **Link Hover Blue** (`#1883fd`): inline text-link hover 使用的更亮变体。它不同于 Cyan：这是 link color，而 Cyan 是 button color。
- **Dark Link Blue** (`#0068bd`): 浅色 surface 上静止状态的 link color，是品牌蓝稍微更饱和的近亲。

### Surface & Background
- **Paper White** (`#ffffff`): Masthead 与 footer 之间编辑面板的 primary content canvas。
- **Ice Mist** (`#f5f7fa`): Light section-gradient 的氛围终点。少量用于某些面板后方，让它们从纯白上轻轻抬起。
- **Divider Tint** (`#f3f3f3`): 内容行之间安静的 horizontal-rule color。
- **Masthead Black** (`#000000`): Top nav 和 hero canvas，只保留给 product-forward zone。
- **Shadow Black** (`#121314`): 暗色 section-gradient 的起始锚点，用于需要氛围深度的 panel。
- **Filter Mist** (`rgba(245, 247, 250, 0.3)`): sticky filter bar 背后的半透明背景；这是站点中唯一的 "glassmorphism" 时刻。

### Neutrals & Text
- **Display Ink** (`#000000`): 白色 surface 上的 primary display headline。
- **Deep Charcoal** (`#1f1f1f`): Body headline 和静止状态 link color，比纯黑略软，减少大块文字上的视觉振铃。
- **Body Gray** (`#6b6b6b`): Secondary body text 和 metadata。
- **Mute Gray** (`#cccccc`): Tertiary label、disabled state。
- **Placeholder Ink** (`rgba(0, 0, 0, 0.6)`): Form placeholder text，60% black，而不是单独的灰色值。
- **Inverse White** (`#ffffff`): 暗色和蓝色 surface 上的 primary text。
- **Dark-Link Blue** (`#53b1ff`): 暗色/黑色 surface 上静止状态的 link color，是 PlayStation Blue 的更浅、更轻盈变体，以保证黑底可读性。

### Semantic & Commerce
- **Commerce Orange** (`#d53b00`): 保留给 PlayStation Store buy-state CTA、price callout 和 "on sale" badge。站点中唯一的暖色；少量使用，且绝不脱离 commerce context。
- **Commerce Orange Active** (`#aa2f00`): Commerce button 的 pressed/active state。
- **Warning Red** (`#c81b3a`): Form error 和 destructive-action warning。
- **Shadow Wash 80** (`rgba(0, 0, 0, 0.8)`): Product photography 上 hero text 背后的戏剧性 scrim。
- **Shadow Wash 16** (`rgba(0, 0, 0, 0.16)`): Card 上低权重 elevation ring。
- **Shadow Wash 08** (`rgba(0, 0, 0, 0.08)`): Featherweight card elevation，几乎不可见，但能把白色 panel 与白色背景分开。
- **Shadow Wash 06** (`rgba(0, 0, 0, 0.06)`): 系统中最轻的 shadow。

### Gradient System
PlayStation 只使用 **两种 section gradient**，除此之外没有别的 gradient：
- **Light Section Gradient**: from `#ffffff` → `#f5f7fa`，一种几乎不可察觉的 wash，让 panel 从 canvas 上安静浮起。
- **Dark Section Gradient**: from `#121314` → `#000000`，短促的垂直 wash，为 hero panel 提供微妙 vignette，而不引入 hue shift。

两种 gradient **只作为 section background** 使用，绝不进入 component 内部。没有 gradient button，没有 gradient text，没有 glowing halo。品牌是 blue，不是 blue-to-purple，也不是 blue-to-cyan。

## 3. 字体规则

### Font Family
- **SST** / **Playstation SST**（Sony，专有）：fallback 为 `Arial`、`Helvetica`。Sony 自定义全球字体，由 Toshi Omagari 和 Akira Kobayashi 设计。Homepage 覆盖 300 / 500 / 600 / 700 weights。**22-54px 的 weight 300** 是 PlayStation 的字体签名。
- **SST (condensed / alternate)**：fallback 为 `helvetica`、`arial`。一种压缩变体，用于少数宽度敏感的 UI module。
- **Arial**：少数 button variant 渲染为 system sans 时使用的 utility fallback。

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Hero Display (XL) | SST | 54px / 3.38rem | 300 | 1.25 | -0.1px | 页面上最大的 SST 时刻，quiet-weight luxury headline |
| Hero Display (L) | SST | 44px / 2.75rem | 300 | 1.25 | 0.1px | Secondary hero headline |
| Large Display | SST | 35px / 2.20rem | 300 | 1.25 | — | Feature panel headline |
| Mid Display | SST | 28px / 1.75rem | 300 | 1.25 | 0.1px | Section heading |
| Compact Display | SST | 22px / 1.38rem | 300 | 1.25 | 0.1px | Module title，仍使用 light weight 300 |
| Playstation SST Sub | Playstation SST | 22.5px / 1.41rem | 400 | 1.30 | — | Promotional sub-heading |
| UI Heading Small | SST | 18px / 1.13rem | 600 | 1.00 | — | Tight UI heading |
| Button / CTA | SST | 18px / 1.13rem | 500 | 1.25 | 0.4px | Primary button label |
| Button / Emphasized | SST | 18px / 1.13rem | 700 | 1.25 | 0.45px | Higher-emphasis CTA（buy、subscribe） |
| Button Serif | SST | 18px / 1.13rem | 600 | 1.50 | — | Secondary button label |
| Body Relaxed | SST | 18px / 1.13rem | 400 | 1.50 | 0.1px | Standard reading body |
| Link Body | SST | 18px / 1.13rem | 400 | 1.50 | — | Inline link text |
| Compact Button | SST | 14px / 0.88rem | 700 | 1.25 | 0.324px | Card 中的 mini CTA |
| Utility Caption | SST | 14px / 0.88rem | 500 | 1.50 | — | Caption、tag label |
| Caption Body | SST | 14px / 0.88rem | 400 | 1.50 | — | Standard metadata |
| Playstation Caption Bold | Playstation SST | 14px / 0.88rem | 700 | 1.40 | — | Emphasized caption |
| Playstation Caption Mid | Playstation SST | 14px / 0.88rem | 600 | 1.40 | — | Semi-bold caption |
| Playstation Button | Playstation SST | 14.4px / 0.90rem | 700 | 1.00 | 0.144px | Tight leading 的 UI button |
| Playstation Tab | Playstation SST | 14px / 0.88rem | 400 | 1.10 | 0.14px | Tab/pill label |
| Playstation Compact Caption | Playstation SST | 12.8px / 0.80rem | 400 | 1.10 | — | 最小 UI caption |
| Micro Caption | SST | 12px / 0.75rem | 500 | 1.50 | — | Footer microcopy、legal text |
| Compact Caption Bold | SST | 12.06px / 0.75rem | 700 | 1.50 | — | Emphasized micro text |

### Principles
- **大尺寸 weight 300 就是声音。** PlayStation 是唯一用 light-weight display 做 hero headline 的主要主机品牌。抵抗把 display type “升级”到 500 或 700 的冲动；这种安静就是个性。
- **UI layer 出现 weight jump。** 18px 以下，系统切到 500-700 以保证可读性。从 300（display）→ 400（body）→ 500（caption）→ 700（button）的 weight gradient 构成层级。
- **Letter-spacing 近乎不可察觉。** 大多数值为 0.1-0.45px，可能为正，也可能略微为负。54px hero 上的 `-0.1px` 刚好收紧 display type，让它读起来“被设计过”，但不成为字体声明。
- **两种 SST casing。** "SST" 和 "Playstation SST" 功能上是同一 family，但 metric set 稍有不同（Playstation SST 在小尺寸上更紧）。在 Sony 内部授权之外的用途里，可把它们视为可互换。
- **不用 all-caps。** 不同于 The Verge 或 Wired，PlayStation 很少使用 UPPERCASE label。Kicker 和 tag 保持 title case 或 sentence case，这是另一种 "quiet authority" 动作。
- **完全没有 serif。** 整个系统都是 sans。没有 print-voice counterpoint。

## 4. Component Stylings

### Buttons

**Primary — PlayStation Blue Pill**
- Background: `#0070cc` (PlayStation Blue)
- Text: `#ffffff`，SST 18px / 500 / 0.4px tracking
- Border: 静止时 none
- Border radius: `999px`，full pill
- Padding: 约 `12px 24px`（随 size class 变化）
- Outline: 静止时 `rgb(255, 255, 255) none 0px`
- **Hover（签名动作）**:
  - Background fill 变为 `#1eaedb` (PlayStation Cyan)
  - Text 保持 `#ffffff`
  - 出现 2px `#ffffff` border
  - 2px `#0070cc` outer ring shadow 绽开（`0 0 0 2px #0070cc`）
  - `transform: scale(1.2)`，button 真的增长 20%
- Active: `opacity: 0.6`，用快速变暗表示 press
- Focus: 与 hover 相同，但 ring 变为 `rgb(0, 114, 206) 0px 0px 0px 2px` focus shadow
- Transition: background、transform 和 shadow 约 180ms ease

**Secondary — White Outline on Dark**
- Background: `#ffffff`
- Text: `#0172ce` (PlayStation Blue variant)
- Border: `2px outset #000000`，真正的 `outset` border，在现代 CSS 中极少见
- Radius: 可变（常为 `999px` 或 `36px`）
- Padding: `16px 20px`
- Hover: 同样使用签名 cyan fill + scale(1.2) + ring treatment
- Focus: 同样使用 ring treatment

**Commerce Orange**
- Background: `#d53b00` (Commerce Orange)
- Text: `#ffffff`，SST 18px / 700 / 0.45px tracking
- Border radius: `999px`，pill
- 只用于 PS Store / Buy / Subscribe Plus CTA
- Active: background 加深到 `#aa2f00`
- Hover: 与所有其他 button 一样遵循 cyan-invert rule（不是 orange-specific hover）

**Transparent Ghost**
- Background: transparent
- Text: `#1f1f1f` (Deep Charcoal)
- Border: `1px solid #dedede`
- Padding: `0 10px`（紧凑，针对 nav 优化）
- Hover: cyan fill、white text、2px white border、scale(1.2)
- Active: text 切到 `#0072ce`，opacity 0.6

**Icon Circle**
- Background: 摄影上为 `rgba(0, 0, 0, 0.2)`；浅色 surface 上为 `#ffffff`
- Border radius: `100%`，完美圆形
- 用于 carousel prev/next arrow 和 share button
- Hover: 变亮到 `var(--color-role-backgrounds-primary-link-hover)`（浅色上约 `#e5e5e5`）

**Mini CTA (In-card)**
- SST 14px / 700 / 0.324px tracking
- Padding 约 8px 16px
- Radius: `999px`
- 用于 game card 内的 "Buy Now" / "Add to Cart" mini CTA

### Cards & Containers

**Hero Card (Game Feature)**
- Background: photography/render，通常由黑色锚定
- Border radius: feature card 为 `24px` 或 `19px`
- Padding: 内部 32-48px
- Shadow: `rgba(0, 0, 0, 0.8) 0px 5px 9px 0px`，只在 card 与 hero photography 重叠时使用的戏剧性 drop-shadow
- Hover: subtle scale transform，primary CTA 上出现 cyan outline

**Game Cover Tile**
- Background: game cover art，无 padding
- Border radius: `12px` 或 `13px`（image）/ `19px`（card frame）
- Shadow: `rgba(0, 0, 0, 0.08) 0px 5px 9px 0px`，feather-weight elevation
- Hover: card 的 primary CTA 点亮为 cyan，card 自身可能 scale 1.02×
- Transition: transform 200ms ease

**Content Panel (White)**
- Background: `#ffffff` 或 light section gradient `#ffffff → #f5f7fa`
- Border: 通常 none；通过间距和 subtle shadow 与邻近元素分离
- Radius: `12px`-`24px`，随 panel hierarchy 变化
- Shadow: `rgba(0, 0, 0, 0.06) 0px 5px 9px 0px`，系统中最轻

**Dark Card on Dark**
- Background: 摄影上叠加 `rgba(0, 0, 0, 0.2)`
- Border radius: `6px`（compact）或 `24px`（feature）
- 用于 hero video 上的 "press kit" 或 "stat block" inlay

### Inputs & Forms
- **Default**: `#ffffff` background，`1px solid #cccccc` border，`3px` border radius（比系统其他部分更紧；input 是 PlayStation 真正 compact 的地方），SST 16px text 为 `#1f1f1f`，placeholder 为 `rgba(0, 0, 0, 0.6)`。
- **Focus**: 通过 `box-shadow: 0 0 0 2px #0070cc` 形成 2px `#0070cc` focus ring。No border-color change，ring 负责全部工作。
- **Error**: border 和 text 切换为 `#c81b3a` (Warning Red)，下方 inline error text 使用同样红色。
- **Transition**: border 和 shadow 约 180ms ease。

### Navigation

- **Top nav**: 黑色（`#000000`）full-bleed strip，PlayStation logo（white）左对齐，category link 居中，使用 SST 14-16px / 500，右侧是小型 "Sign In" CTA。
- **Hover on nav link**: color 从 `#ffffff` 过渡到 `#1883fd` (Link Hover Blue)，无 underline。
- **Active section**: 以 `#0070cc` 的 subtle 2px underline 标记。
- **Mobile**: nav 折叠为 hamburger drawer。Drawer 内 link 垂直堆叠，16px gap，20px horizontal padding。
- **Sticky behavior**: nav 滚动时固定在顶部；进入 light-surface zone 时 **不会反转**，全程保持 black-backed。

### Image Treatment

- **Aspect ratios**: hero video/photography 为 16:9，console render 为 1:1，game cover art 为 3:4，lifestyle imagery 为 4:3。
- **Corners**: 根据 card context 圆到 `12px`、`13px` 或 `24px`。Game cover 为 `6-12px`，hero image 为 `24px`。
- **Full-bleed**: 只用于 masthead hero 和 footer promotional banner。其他所有内容都位于带 padding 的 content column 内。
- **Shadow**: hero 上使用戏剧性 `rgba(0, 0, 0, 0.8) 0 5px 9px 0` drop；grid tile 上使用 feather `rgba(0, 0, 0, 0.06) 0 5px 9px 0`。
- **Hover**: image 保持静态，card frame 和 primary CTA 响应。
- **Lazy loading**: fold 以下全部使用 `loading="lazy"`，masthead hero 使用 `eager`。

### Game Store Pill (Distinctive)
- Background: `#ffffff`
- Text: `#000000`，SST 14px / 500
- Padding: `14px 18px`
- Radius: `9999px`，full pill
- 位于 game cover 旁、用于标记 platform（"PS5"、"PS4"、"PSVR2"）的中性 pill tag。White-on-dark contrast。

## 5. 布局原则

### Spacing System
- **Base unit**: 8px。
- **Scale**: 1, 2, 3, 4.5, 5, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21px。
- **Section padding**: major panel 之间垂直 48-96px。Hero-to-content transition 使用较大端。
- **Card padding**: 内部 20-32px。Feature hero card 可扩展到 48px。
- **Inline spacing**: headline 和 deck 之间 8-12px，deck 和 CTA 之间 12-16px。
- **Micro-scale**: 1/2/3/4.5/5/9/10/12 值用于 pill padding、caption spacing 和 border offset，而不是编辑节奏。

### Grid & Container
- **Max width**: 约 1920px（dembrandt 检测到最高 2120px 的 breakpoint）。Container cap 通常约为 `1280-1920px`，取决于 panel。
- **Column patterns**: 12-column responsive grid，根据层级解析为 3/4/6-column game tile row。Hero zone 通常跨 12 columns；featured tile 使用 6+3+3 或 4+4+4 配置。
- **Outer padding**: mobile 16px → tablet 48px → desktop 64-96px。
- **Gutters**: column 之间 16-24px，tile cluster 内更紧（8-12px）。

### Whitespace Philosophy
PlayStation 对待 whitespace 的方式，像奢侈品牌对待店内照明：它是一种高级信号。Module 之间的垂直 breathing room 明显多于其他主要零售站点，白色编辑面板常常只在 hero-scale padding 中容纳一个 headline + 一个 image + 一个 CTA。效果是一种 "gallery pace"：每个产品都有自己的房间，而不是在 thumbnail grid 中竞争。

### Border Radius Scale
- **2px**：cookie banner button 和小型 admin UI
- **3px**：form input、tab panel（比其他部分更紧，是刻意的 "functional UI" cue）
- **6px**：compact button 和 inline image
- **12px**：standard game cover image 和 content image
- **13px**：某些 figure wrapper（相对 12px 有 1px nesting offset）
- **19px**：feature card
- **20px**：inline tag span
- **24px**：hero card、primary feature frame
- **36px**：full-pill nav 和 secondary button variant
- **48px**：large feature button
- **999px / 100%**：full pill primary button 和 circular icon button

十一个离散 radius 值，是本目录中最丰富的 radius system 之一。这个范围存在的原因是 PlayStation 有意为不同 *hierarchy* 使用不同 radius：utility 用 3px，media 用 12px，feature 用 24px，CTA 用 999px。

## 6. 深度与 Elevation

| Level | Treatment | Use |
|---|---|---|
| 0 | No shadow | `#ffffff` 上的 default content |
| 1 | `rgba(0, 0, 0, 0.06) 0 5px 9px 0` | Feather-light editorial panel lift |
| 2 | `rgba(0, 0, 0, 0.08) 0 5px 9px 0` | Standard grid tile elevation |
| 3 | `rgba(0, 0, 0, 0.16) 0 5px 9px 0` | Emphasized card（hover 或 active） |
| 4 | `rgba(0, 0, 0, 0.8) 0 5px 9px 0` | Hero overlay shadow，覆盖 photography 的 dramatic drop |
| 5 | `0 0 0 2px #0070cc` (focus ring) | Primary button focus state |
| 6 | `0 0 0 2px #000000` (hover ring) | Secondary button hover ring |
| 7 | Section gradient `#121314 → #000000` | 暗色 hero panel 上的 atmospheric depth |

PlayStation 的深度哲学是 **layered but restrained**。正常状态的 shadow scale 从 0.06 到 0.16，然后在 hero drop 上跳到 0.8；没有 0.2、0.3、0.4 的中间地带。效果是页面大多数地方近乎扁平，但当 hero card 需要浮在 photography 上时，它真的会 *float*。Elevation 要么低声，要么高声，绝不含糊。

### Decorative Depth
- **Section gradients**（上文描述的 dark 和 light），只用作 section background
- **Focus/hover rings** 为 2px，根据 state 始终为 blue 或 cyan
- 除两种 section gradient 外，**No glows, blurs, or atmospheric effects**
- **No gradient buttons or text**；除了 section transition，视觉系统处处是 solid color block

## 7. Do's and Don'ts

### Do
- **Do** 使用 PlayStation Blue (`#0070cc`) 作为 primary CTA fill 和 footer anchor。它是品牌锚点色。
- **Do** 为每个 22px 及以上 display headline 使用 SST weight 300。Quiet-weight headline 就是声音。
- **Do** 给每个 primary button 应用完整 hover signature：cyan fill + 2px white border + 2px blue outer ring + `scale(1.2)`。
- **Do** 在 primary 和 commerce button 上使用 full-pill radius (`999px`)。
- **Do** 将 PlayStation Cyan (`#1eaedb`) 只保留给 hover、focus 和 active state；绝不作为 resting background。
- **Do** 只在 PlayStation Store / purchase CTA 和 price callout 上使用 Commerce Orange (`#d53b00`)。
- **Do** 让 dark hero panel 与 white content panel 交替，并用 deep blue footer 锚定；三 surface channel layout 是页面节奏。
- **Do** 当 card 与 product photography 重叠时，使用戏剧性的 `rgba(0, 0, 0, 0.8)` hero drop shadow。
- **Do** 在所有 scroll position 上保持 top nav 为黑色；它不会在 light panel 上反转为白色。

### Don't
- **Don't** 加粗 display headline。22-54px 的 weight 300 是 PlayStation 声音。Weight 700 display type 会读成“另一个游戏零售商”。
- **Don't** 使用 ALL-CAPS label 或 kicker。PlayStation 很少使用 uppercase，它是 quiet-authority brand，不是 hazard-tape brand。
- **Don't** 在两种声明的 section gradient 之外使用 gradient button、text 或 background。
- **Don't** 在 Commerce Orange 之外引入暖色。不要 red CTA、yellow highlight 或 green success pill。
- **Don't** 在 button 或 media 上使用 square corner。系统有十一个 radii；选一个，但绝不要 `0`。
- **Don't** 跳过 primary button 上的 `scale(1.2)` hover move。Lift-scale 是品牌交互签名。
- **Don't** 使用 serif type。系统是 100% SST sans。
- **Don't** 让 cyan `#1eaedb` 在静止状态下作为 text 或 background color 出现。它只存在于 motion 中。
- **Don't** 设计互相抢注意力的 panel。PlayStation 的 whitespace rhythm 给每个 module 自己的 "gallery room"。

## 8. 响应式行为

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Small Mobile | <400px | Single column，nav 折叠为 hamburger，SST hero 缩到约 28px |
| Mobile | 400-599px | Single column，tile full-width 堆叠，padding 打开到 16px |
| Large Mobile | 600-767px | 仍为 single column，但部分 module 可使用 2-column tile option |
| Tablet Portrait | 768-1023px | 2-column game grid，nav 仍压缩 |
| Tablet Landscape | 1024-1279px | 3-4 column grid，full nav 恢复 |
| Desktop | 1280-1599px | Full editorial grid，最大 hero display scale（44-54px） |
| Large Desktop | 1600-1919px | Container cap 到 1600px，margin 扩展 |
| 4K / Big-Screen | ≥1920px | Container 扩展到 1920px max，hero content 放大以匹配 TV viewing distance |
| Ultra-Wide | ≥2120px | Extreme breakpoint，页面保持锚定，outer margin 吸收额外宽度 |

dembrandt sweep 在 320px 到 2120px 之间检测到 30 个 breakpoint，这是一段异常宽的 responsive range。PlayStation 专门针对 **big-screen contexts**（1920-2120px）调校，因为 PS5 owner 经常通过 console browser 在 TV 上浏览站点，或从手机 cast-to-TV。大多数零售站点在 1440px 停止调校；PlayStation 一直调到 4K。

### Touch Targets
- Primary pill button 约 48-56px 高（SST 18px text + 约 12-16px vertical padding），舒适满足 WCAG AAA。
- Desktop 上 nav link 较小（约 32-40px 高）；mobile drawer 内 padding 到 48px+。
- Icon circle button 为 40-48px，touch-friendly。

### Collapsing Strategy
- **Nav**: full nav → condensed → hamburger drawer，随 viewport 变窄依次切换。Logo 固定左侧，CTA 固定右侧。
- **Grid**: 6-col → 4-col → 3-col → 2-col → 1-col。Game tile card reflow 时不会裁切 cover art。
- **Spacing**: viewport 变窄时，section padding 从 96px → 64px → 48px → 32px → 24px 收紧。
- **Type**: SST hero 从 54px → 44px → 35px → 28px → 22px 缩放。Light weight 300 在每个尺寸上都保留。
- **Hero photography**: art-direction swap，desktop 使用宽 16:9 crop，mobile 使用 4:3 或 1:1 crop，并让产品居中。

### Image Behavior
- Responsive raster（`srcset` + 带 art-direction 的 `<picture>`），每个 breakpoint 保持 aspect ratio。
- 4K-ready：站点在 1920px+ 提供 high-density imagery，避免 TV 浏览时 upscaling。
- Fold 以下全部 `loading="lazy"`；hero 为 `eager` 并带 preload hint。

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA**: "PlayStation Blue (`#0070cc`)"
- **Hover / Focus Accent**: "PlayStation Cyan (`#1eaedb`)"
- **Background (White Surface)**: "Paper White (`#ffffff`)"
- **Background (Dark Surface)**: "Console Black (`#000000`)"
- **Heading Text on White**: "Display Ink (`#000000`)"
- **Body Text on White**: "Deep Charcoal (`#1f1f1f`)"
- **Body Text on Black**: "Inverse White (`#ffffff`)"
- **Commerce / Buy Accent**: "Commerce Orange (`#d53b00`)"
- **Footer Anchor**: "PlayStation Blue (`#0070cc`)"

### Example Component Prompts
1. *"创建 primary CTA button：使用 `#0070cc` PlayStation Blue fill，white text，SST 18px / 500 / 0.4px tracking，999px border radius，12px × 24px padding。Hover 时 background 过渡到 `#1eaedb` PlayStation Cyan，出现 2px `#ffffff` border，通过 box-shadow 绽开 2px `#0070cc` outer ring，整个 button scale 1.2×，全部使用 180ms ease transition。"*
2. *"在 `#000000` Console Black canvas 上设计 hero panel：使用 54px SST weight 300 headline，颜色 `#ffffff`，-0.1px letter-spacing 和 1.25 line-height。下方放一个使用标准 PlayStation hover treatment 的 primary CTA。任何地方都不要 ALL-CAPS labels。"*
3. *"构建 game cover tile：3:4 aspect ratio image，12px border radius，feather-weight `rgba(0, 0, 0, 0.08) 0 5px 9px 0` drop shadow，下方是 14px SST 700 title、12px SST 500 platform tag，以及一个 14px / 700 / 0.324px tracking、PlayStation Blue 的 mini primary CTA。"*
4. *"为 PlayStation Store purchase 创建 commerce pill button：`#d53b00` Commerce Orange fill，`#ffffff` text，SST 18px / 700 / 0.45px tracking，999px radius，12px × 28px padding。Active state 加深到 `#aa2f00`。Hover 遵循标准 cyan-invert，并 scale 1.2×。"*
5. *"在暗色 hero section 之间设计 white content panel：`#ffffff` background，使用 subtle `#ffffff → #f5f7fa` light section gradient，24px border radius，48px interior padding，feather-weight `rgba(0, 0, 0, 0.06) 0 5px 9px 0` elevation，一个 35px SST 300 headline，一个 18px body paragraph，以及一个 primary CTA。"*

### Iteration Guide
在细化用此 design system 生成的现有 screen 时：
1. **Audit display weight.** 每个 22px 及以上 headline 都应为 SST weight 300。如果在 hero scale 看到 weight 500 或 700，就丢失了 PlayStation 声音。
2. **Audit the hover treatment.** 每个 primary button hover 时都必须以 cyan-fill + white-border + blue-ring 组合 scale 1.2×。四者缺一，interaction signature 就会断裂。
3. **Audit corners.** 每个 container 和 button 都应落在 2、3、6、12、13、19、20、24、36、48 或 999px / 100%。Square corner 会破坏声音。
4. **Audit color sprawl.** Chrome 中只能出现 PlayStation Blue (`#0070cc`)、Cyan (`#1eaedb`)、Commerce Orange (`#d53b00`) 以及声明过的 grays/blacks/whites。如果看到其他 hue，请修正。
5. **Audit surface alternation.** 页面应按 dark hero → white content → dark hero → white content → blue footer 交替。如果两个相同 surface panel 相邻，插入 transition。
6. **Audit casing.** 只使用 sentence case 和 title case。不要 ALL-CAPS label、button 或 kicker。如果看到 uppercase，请转换。
7. **Audit shadow weight.** Shadow opacity 应落在 0.06 / 0.08 / 0.16 / 0.8；不要有中间值。如果看到 0.1、0.2、0.3、0.5 drop shadow，请修正到最近声明层级。
8. **Audit whitespace.** 如果两个 module 感觉在“抢注意力”，增加 48-96px 垂直 breathing room。PlayStation 的 gallery-pace rhythm 不可协商。
