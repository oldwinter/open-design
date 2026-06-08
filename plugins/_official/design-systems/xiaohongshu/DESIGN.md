# Inspired by Xiaohongshu 的 Design System

> Category: Media & Consumer
> Lifestyle UGC social platform。单一品牌红、慷慨圆角、content-first。

## 1. 视觉主题与氛围

Xiaohongshu（小红书 / RED）在视觉上是 SaaS console 的反面。打开 app，你看到的不是 "Xiaohongshu"，而是别人的早餐、酒店沙发、第三次才买对的口红。这正是设计意图。整个 UI 试图成为透明相框：白色 surface、低噪声 component、没有与注意力竞争的 shadow stack。一切都让位给用户上传的 image。

Palette 极端克制。Near-white canvas（`#FFFFFF` / `#F5F5F5`）覆盖每个页面的大部分区域。Neutrals 不是由离散 grey step 构成，而是由 translucent overlay（`rgba(48,48,52, 0.05~0.20)`）构成；同一种 fill 可以落在白底上做 hover，落在 card 上做 divider，落在 button 上做 disabled。Brand red `#FF2442` 是系统允许的唯一饱和色，只出现在 tab indicator、heart-active state 和 primary CTA 上。Semantic colors（success green、warning orange、info blue）作为 token 存在，但在 consumer flow 中几乎不可见；danger 不是独立颜色，只是复用 brand red。

Form 是柔软的。Card 圆角为 12-16px。Button 一路圆到 pill（`border-radius: 9999px`）。Shadow 基本不存在；深度来自 spacing 和 rounding，而不是 elevation。签名 layout 是两列（mobile）或五列（PC）的 waterfall masonry，行并不对齐：image height 决定 card height，而这种错位 *就是* 真实感。

Type 全程使用中等字重的 PingFang SC。没有 thin-light hero display，没有 all-caps Latin headline。层级紧凑（`H1: 32/600`、body: `14-16/400`），tracking 为 `0`，数字使用自定义 `RED Number` family，让 like button 上的计数对齐。写作声音与视觉一致：第二人称、对话式、绝不 enterprise。"你的生活兴趣社区" 是 *你的* lifestyle interest community，而不是 "the platform"。

结果读起来像一本略有使用痕迹的生活方式杂志，页间夹着几张手写 Post-it。不是 Apple-store 式冷 minimal，也不是 Lark efficiency-console，更不是任何 SaaS dashboard。Design baseline 是 *daily-ness*；用户不应感觉自己在使用软件，只是在翻看别人的生活。

**关键特征：**
- 单一 brand red（`#FF2442` token，component layer 为 `#FF2E4D`），绝不同时出现两种饱和色
- 使用 translucent neutrals（`rgba(48,48,52, .05/.10/.20)`），而不是离散 grey step
- 到处慷慨圆角：card 12-16px，button 完整 pill，sheet 仅顶部 16px
- 近乎零 shadow；默认 flat
- PingFang SC 只用 400/500/600；没有 thin display weight
- Content（用户照片）是色彩来源；UI 让位
- Mobile 上 secondary action 使用 bottom sheet，绝不默认 modal
- Voice: second person、lifestyle，绝不 SaaS-enterprise

## 2. 色彩 Palette 与角色

以下所有值均采样自 `https://www.xiaohongshu.com/explore` 的 production CSS（`:root, .force-light` 和 `:root[dark], .force-dark` 的 inline `<style>` blocks）。

### Primary Brand
- **Brand Red — Token** (`#FF2442`): `--primary` 和 `--color-red`。Design-system source of truth。用于 accent、active tab、heart、primary CTA。
- **Brand Red — Component** (`#FF2E4D`): 硬编码于 `.reds-button-new.primary`、`.active-bar`、outlined-button border。略偏粉且稍亮；red channel 相同（`FF`），green 从 `24` 抬到 `2E`（+10），blue 从 `42` 抬到 `4D`（+11）。green/blue 抬升会增加整体 lightness，而 blue 的比例提升更大，会让 hue 略微向粉色移动，净效果可能是降低大面积 button fill 的视觉刺痛。这个与 `--primary` 的分歧究竟是有意（accessibility / large-fill ergonomics）还是历史漂移（应最终回并到 token 的 hard-coded override），upstream 未记录。实际输出 button 或 active-bar UI 时使用它；per-surface rule 见 §9 *Brand Red Disambiguation*。
- **Star Yellow** (`#FDBC5F`): bookmark / collect-active icon fill（采样自 `<symbol id="collected">` SVG）。这是 yellow 唯一允许出现的位置。

### Neutrals (translucent overlay system)
- **Surface** (`#FFFFFF`) — `--bg`。Cards、modals。
- **Canvas** (`#F5F5F5`) — `--bg0`。Cards 背后的 page background。
- **Subtle** (`#FAFAFA`) — `--bg0-lighter` / `--color-information-background`。Information backgrounds。
- **Fill 1** (`rgba(48,48,52,0.05)`) — `--fill1`。最轻的 hover、group lines。
- **Fill 2** (`rgba(48,48,52,0.10)`) — `--fill2`。Hover surface、disabled button bg、"following" follow-button state。
- **Fill 3** (`rgba(48,48,52,0.20)`) — `--fill3`。Pressed。
- **Separator** (`rgba(0,0,0,0.08)`) — `--separator`。Hairline border。
- **Separator Strong** (`rgba(0,0,0,0.20)`) — `--separator2`。
- **Opaque Separator** (`#EAEAEA`) — `--opaque-separator`。需要真实 solid border 时使用。

### Text
- **Title / Primary** (`rgba(0,0,0,0.80)`) — `--title`。Headings 和 titles。Soft black，绝不是 pure black。
- **Paragraph / Secondary** (`rgba(0,0,0,0.62)`) — `--paragraph`。Body、secondary text。
- **Description** (`rgba(0,0,0,0.45)`) — `--description`。Auxiliary captions。
- **Disabled / Placeholder** (`rgba(0,0,0,0.27)`) — `--disabled` / `--placeholder`。

### Semantic (token-level only — rarely visible in consumer UI)
- **Success** (`#02B940`) — `--success`。Background variant 为 `#EAF8EF`（`--success2`）。
- **Warning** (`#FF7D03`) — `--warning`。Background variant 为 `#FFF2E6`（`--warning2`）。
- **Info** (`#3D8AF5`) — `--info` / `--color-blue`。Consumer flow 中几乎不出现。
- **Link** (`#133667`) — `--link`。Deep navy，不是典型 link blue。实际中常用 brand red 做强调。
- **Danger / Error**: 没有独立 token；danger 复用 `--primary`（brand red）。给 skill author 的提醒：默认情况下，emitted destructive action 与 emitted primary CTA 会视觉完全一致（"Delete account" button 读起来和 "Follow" button 一样）。这个 snapshot 里无法直接观察 RED production destructive treatment，所以在差异重要时，防御性默认做法是用 outline-style + brand-red text，或 leading destructive icon 来区分 destructive intent。

### Functional Gradients (the only gradients allowed)
Brand red 本身 **绝不用 gradient**。系统中唯一允许的 gradients 都是功能性的：
- **Search Hotspot Hint** (`linear-gradient(90deg, #FF2543 0%, #FF5225 100%)`) — `--search-hotspot-hint`。仅用于 trending-search badge。
- **Video Player Mask** (`linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0) 50%, rgba(0,0,0,0.75))`) — `--mask-video-player-mask`。Video tile 顶部 + 底部 gradient。

### Dark Mode

Dark mode 遵循 `prefers-color-scheme: dark`，并有手动 override；source 同时支持 `:root[dark]` attribute 和 `.force-dark` class。

- **Surface** (`#19191E`) — 带紫调的 near-black，不是纯 `#000`。
- **Canvas** (`#0E0E11`) — 最深层。
- **Title** (`rgba(255,255,255,0.84)`)。
- **Paragraph** (`rgba(255,255,255,0.56)`)。
- **Brand Primary** (`#FF2E4D`) — 相比 light mode（`#FF2442` → `#FF2E4D`）略偏粉，用于降低低光环境下的视觉刺痛。
- **Separator** (`rgba(255,255,255,0.07)`)。

## 3. 字体规则

所有值均采样自 `https://www.xiaohongshu.com/` 的 production CSS。

### Font Family

**Chinese（display + body，全层级）:**
```
PingFang SC
```
每个 `--Typography-FontFamily-*` variable 都解析为 `PingFang SC`。没有单独 display face。

**Site-wide fallback chain:**
```
-apple-system, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB',
'Microsoft Yahei', Arial
```

**Numbers (custom):**
```
'RED Number' (Regular 400 / Medium 500 / Bold 700)
```
用于 like counts、follower counts、stat displays。解决 PingFang 非 tabular digit 的问题。

**Mobile app embedded:** 方正悠黑 (`FZ YouHei`) 随 iOS / Android app 发布；用户可 fallback 到 system PingFang SC / Noto Sans CJK SC。

### Hierarchy (PC web tokens)

| Token | Size | Weight | Line-height | Role |
|---|---|---|---|---|
| `--h1` | 32px | 600 | 40px (125%) | Page hero title |
| `--h2` | 24px | 600 | 32px (133%) | Section heading |
| `--h3` | 20px | 600 | 28px (140%) | Card heading |
| `--t1` | 18px | 600 | 26px (144%) | Strong label |
| `--t2` | 16px | 500 | 24px (150%) | Medium label |
| `--t3` | 14px | 500 | 20px (143%) | Secondary label |
| `--b1` | 16px | 400 | 24px (150%) | Body large |
| `--b1-loose` | 16px | 400 | 26px (162%) | Long-form body |
| `--b2` | 14px | 400 | 20px (143%) | Body standard |
| `--b2-loose` | 14px | 400 | 22px (157%) | Body long-form |
| `--c1` | 13px | 400 | 20px (154%) | Caption |
| `--c2` | 12px | 400 | 18px (150%) | Small caption |
| `--c3` | 10px | 400 | 14px (140%) | Badge / smallest |

`*-emphasized` variants（例如 `--c1-emphasized`）保持相同 size，但提升到 weight 500。

### Principles

- **紧凑 heading scale。** 最大 display 为 32/600；没有 48px / 64px hero type。Density 胜过视觉跳跃。
- **只有三种 weight。** 400（Regular）、500（Medium）、600（Semibold）。Weight 700 只保留给 `--number-emphasized-font-weight`。没有 thin / light。
- **Tracking 为零。** 每个 `--Typography-Spacing-*` token 都是 `0`。Component-level override（cookie banner、category title）会手调 `-0.3px` 到 `-0.64px`，但 base token 是 flat。
- **Soft black，不用 pure black。** Title text 是 `rgba(0,0,0,0.80)`。Body 或 title text 从不使用 pure `#000`。
- **专用数字字体。** Counts、stats 和 follow-numbers 始终使用 `RED Number` 以获得 tabular alignment。

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#FF2442`（或匹配 live `.reds-button-new.primary` class 时使用 `#FF2E4D`）
- Text: `#FFFFFF`，weight 500，14px
- Radius: **pill — `border-radius: 9999px`**
- Padding: small 为 `8px 20px` / large 为 `12px 32px`
- No shadow

**Secondary (filled)**
- Background: `rgba(48,48,52,0.10)`（`--fill2`），soft grey
- Text: `rgba(0,0,0,0.80)`（`--title`）
- 同样使用 pill radius

**Secondary (outlined)**
- Background: `#FFFFFF`
- Border: `1px solid #FF2E4D`
- Text: `#FF2E4D`
- Pill radius。用于 profile card 上未关注状态的 follow CTA。

**Icon button (like / collect / comment)**
- 纯 icon（24px）叠在 count 上方（12px，`rgba(0,0,0,0.45)`）
- 没有 background plate
- Active state: icon 切到 `#FF2442`（heart）或 `#FDBC5F`（star）；count text 跟随匹配

### Follow Button — three-state（最高识别度 component）

| State | Background | Label (Chinese / English) | Text | Shape |
|---|---|---|---|---|
| Not following | `#FF2442` | `+ 关注` (Follow) | white | pill |
| Following | `rgba(48,48,52,0.10)` | `已关注` (Following) | `rgba(0,0,0,0.45)` | pill |
| Mutual | `rgba(48,48,52,0.10)` | `互相关注` (Mutual) | `rgba(0,0,0,0.62)` | pill |

Feed-card variant: `6px 14px` padding，12px text。Profile-page variant: `8px 20px`，14px text。

### Cards (Feed / Note Card)

- Radius **12px**（更大的 feature card 为 16px）
- **默认无 box-shadow。** White card 位于 `#F5F5F5` canvas 上，分隔来自 canvas color，而不是 elevation。
- Structure: image 从顶部 edge-to-edge 填充 → title（1-2 lines，12px padding）→ footer（32px round avatar + nickname + heart + count）
- Image 只裁切 top corners；bottom corners 是方的，因为 image 填满 image region 的底部。
- PC hover: 微妙 `translateY(-2px)` 加 very light shadow（`0 4px 12px rgba(0,0,0,0.08)`）。Mobile: 无 hover state。

### Inputs / Search

- Background: `#F5F5F5`
- Border: none（focus 可添加 `--separator` 的 `1px solid`）
- Radius: pill（或 taller fields 使用 20px）
- Height: 36-40px
- Leading edge 放 inline magnifier icon

### Tabs / Segmented Control

- Text-only tabs，带 **2px underline bar**；绝不使用 pill background，绝不使用 colored chip。
- Active: text color 切到 `rgba(0,0,0,0.80)`，weight 提升到 600；underline bar 使用 `#FF2E4D`，宽度匹配 text width。
- Inactive: text 为 `rgba(0,0,0,0.45)`，weight 400。
- Tab spacing: 约 40px。

### Tags / Topics

- Pill rectangle，`padding: 4px 12px`，`font-size: 12px`
- Default: `rgba(48,48,52,0.10)` bg + `rgba(0,0,0,0.62)` text
- Trending / featured: `#FF2442` bg + white text

### Badges / Counts

- Numeric badge: `#FF2442` bg + white digit，min 16×16，pill
- Pure red dot: 8px diameter，从 icon corner 偏移 `-4px / -4px`
- HOT marker: small pill，`#FF6B35` 或 brand red，10px white text

### Avatars

- 始终 circular（`border-radius: 50%`）
- Feed: 28-32px。Profile hero: 80-96px。
- 无 white stroke。
- Verification badge 位于 lower-right，约为 avatar diameter 的 25-30%：
  - Red V（creator）
  - Blue V（enterprise）

### Bottom Sheet (mobile only — replaces most modals)

- 从 screen bottom 滑出，覆盖在 `rgba(0,0,0,0.5)` scrim 上
- **Top-only radius `16px 16px 0 0`**
- Drag handle: `4px × 36px`，`#E0E0E0`，居中，距 top edge 约 6px
- Dismiss: 向下拖过 threshold，或 tap scrim
- Used for: share、report、more-actions、comment-compose，几乎所有 PC 上会是 modal 的东西

### PC Modal

- 居中，white background，12px radius
- Light shadow（`0 8px 32px rgba(0,0,0,0.12)`），这是唯一 shadow 明显的地方

## 5. 布局原则

### Spacing System (8pt grid)

Base unit 8px。Common stops: `4 / 8 / 12 / 16 / 20 / 24 / 32`。Section gap 跳到 `48 / 64`。

### Responsive Waterfall (PC discover)

标准 desktop 宽度下为 five-column masonry，窄 viewport 上逐级减少。

| Viewport | Columns | Column gap |
|---|---|---|
| ≥ 960px | 5 | 10px |
| 690-960px | 4 | 10px |
| 500-690px | 3 | 10px |
| < 500px | 2 | 10px |

实现方式是 JavaScript-positioned（`translate3d` + ResizeObserver），而不是 CSS Grid，因为 card height 要等 image load 后才知道。这也早于 CSS Masonry 的广泛支持（截至 2026 年，大多数浏览器仍在 flag 后）；JS 方案用 layout-shift risk 换取 cross-browser consistency。Masonry 刻意不对齐行；variable image height *就是* 真实感。

### Mobile Two-Column

- 两列，每列约占 viewport width 的 48.2%
- Row gap 约 7px
- 外侧 side margin 每边 `12rpx`（≈ 6px @ 375px）

### Note Detail (PC)

- Two-pane: 左侧约 500px image carousel / 右侧约 500px metadata + comments，总宽约 1100px
- Image aspect 由 upload time 决定：vertical 3:4 / square 1:1 / horizontal 4:3
- Carousel 是主视觉；comments 在右侧独立滚动

### Profile

- 顶部 16:9 banner image
- Circular avatar（80-96px）与 banner / content edge 重叠
- Three-stat horizontal row（following / followers / likes-and-collects）
- 下方 tab strip: Notes / Saved / Liked（笔记 / 收藏 / 赞过）

### Creator / Ad Console (B2B)

标准 left-nav console：200-240px sidebar + 约 1000-1100px content area。Content 顶部是一行 stat cards（impressions、likes、follower delta），下方是 list 或 chart region。**Card 上没有 left-border accent。** Surface 是白色，通过 spacing 分隔。

### Whitespace

- Discover grid 很密集；*content* density 是 value proposition。
- Section padding 位于 feeds *之间*，而不是 feed 内部。
- Card 在 image 上方没有 internal vertical padding；image 与 card 顶部 flush。

## 6. 深度与 Elevation

三个层级，且少量使用。

| Level | Treatment | Use |
|---|---|---|
| Flat (0) | No shadow | Default：feed cards、tags、buttons（both modes） |
| Subtle (1) | `0 4px 12px rgba(0,0,0,0.08)` | PC card hover（light mode only） |
| Modal (2) | `0 8px 32px rgba(0,0,0,0.12)` | PC 上的 centered modal（light mode only） |
| Dark mode | Drop shadows 或替换为 `1px` hairline（`rgba(255,255,255,0.07)`） | `rgba(0,0,0,*)` shadow 在 `#19191E` canvas 上不可见；仅 scrim 就能提供 modal separation，PC card-hover 的 `translateY(-2px)` 也完全取消（motion + shadow 在 dark surface 上都像 no-op） |

**Shadow 是例外，不是规则。** 深度来自：
1. Background color contrast（`#F5F5F5` canvas 位于 `#FFFFFF` cards 下方）
2. Generous radius（card 因圆角而视觉上浮起）
3. 元素之间的 whitespace

没有 neumorphism。没有 glassmorphism。没有 coloured shadows。Bottom sheet 完全没有 shadow；scrim 提供分隔。在 dark mode 中，移除 PC card-hover effect（`translateY(-2px)` + alpha-on-black shadow）；motion 和 shadow 在 dark canvas 上都读成 no-op。

## 7. Do's and Don'ts

### Do
- 将 brand red 视为单一色。每个 screen 一个 CTA accent，不要让第二个饱和色竞争。
- 使用 translucent fill overlays（`rgba(48,48,52,0.05/.10/.20)`）处理 hover / disabled / pressed，而不是单独 grey shade。
- 慷慨圆角：card 12-16px，button full pill。
- Body text 中 title 用 `rgba(0,0,0,0.80)`，paragraph 用 `rgba(0,0,0,0.62)`；始终 soft black。
- Stats 和 counts 使用 `RED Number`（或任何 tabular-numerals stack）。
- 让用户上传的 image 承载色彩叙事。UI 是 picture frame。
- Mobile 上 secondary action 默认使用 bottom-sheet；centered modal 只保留给 PC 和 confirmation。
- Tabs 永远是 text + 2px underline。
- 以第二人称、对话式说话。"what you just scrolled past" 比 "Discover trending content" 更 RED。

### Don't
- 不要把 purple、deep blue 或 black-gold 当 primary color。Tech / fintech / luxury vocabulary 是错误 genre；RED 是 lifestyle。
- 不要给 brand red 本身做 gradient。唯一 gradients 是功能性（search-hotspot badge、video mask）。
- 不要用 brand-color background 填满整个 hero。Brand red 只作 accent；红色边框 hero 读起来像 sale poster，不像 feed。
- 不要在 artifact output 中伪造 `小红书` wordmark 或 RED logotype。Tokens 不受保护；wordmark 才是有实际 IP risk 的品牌身份部分。需要 logo placeholder 时，输出 labelled grey block（例如一个空 pill，内部用 `rgba(0,0,0,0.45)` 写 `LOGO`），让用户放入授权 asset。
- 不要使用 Inter、Helvetica 或 Roboto 作为中文 display face。PingFang SC 是系统；Latin fallback chain 首先使用 `-apple-system`。
- 不要在 generated CSS 中单独引用 `RED Number` family。终端用户没有安装它；如果没有 PingFang fallback chain，它会静默 fallback 到 OS 自选字体，破坏 digit alignment。始终把它放在 stack 中输出，例如 `font-family: 'RED Number', PingFang SC, -apple-system, 'Helvetica Neue', Arial, sans-serif;`。
- 不要在 body size 上使用 light / thin weights。Notes 承载密集中文文本；light weights 会破坏 mobile legibility。
- 不要给 card 添加 left-border colored accent stripe（SaaS / dashboard tell）。Card 通过 canvas color 和 radius 分隔，而不是 colored chrome。
- 不要使用 heavy shadows。具体阈值：避免比 `rgba(0,0,0,0.15)` 更深的 alpha，或超过 `16px` 的 spread。如果手机上隔一臂距离还能明显看到 shadow，那对这个系统来说太重。
- 不要堆叠 glassmorphism、neumorphism 或 2020-era trend effects。视觉时代参考是 "lifestyle magazine"，不是 "tech demo"。
- 不要写 "Trusted by 10,000+ teams" 这种 enterprise social-proof block。UGC trust 来自真实的人，不是 logo wall。
- 不要用 all-caps Latin 写 hero CTA。中文 sentence-case，Latin sentence-case，没有例外。
- 不要使用 stock business photography（handshake、laptop close-up、conference room）。使用真实生活的 UGC-style imagery。
- 不要使用 3D isometric / blob / abstract-network illustration。它们是 SaaS-marketing tell。RED 使用 real photos 或 hand-drawn editorial illustrations。
- 不要用第三人称写 copy（"the platform provides…"）。始终用第二人称（"what you want to see"）。
- 不要展示不可验证的 stat claims（"10× faster"、"save N hours"）。RED 的 brand voice 是 emotional resonance，不是 metric promises。
- 不要用 orange / yellow 作为 Toast emphasis color。这个系统里的 emphasis 就是 brand red，仅此而已。
- 不要把每张 card 硬固定为同一高度。Column 之间 variable card height 就是真实感；不要“修复”它。

## 8. 响应式行为

### Breakpoints

| Name | Width | Discover columns | Notes |
|---|---|---|---|
| Mobile | < 500px | 2 | App-like density，edge-to-edge waterfall |
| Tablet | 500-690px | 3 | Padding 放松，tap target 保持 44px+ |
| Small Desktop | 690-960px | 4 | Standard reading width |
| Desktop | ≥ 960px | 5 | Full waterfall，sidebar visible |

### Collapsing Strategy

- **Discover**: 5 → 4 → 3 → 2 columns；column gap 全程保持 10px。
- **Note detail**: PC two-pane layout 在 mobile 上折叠为 single-column stack（image carousel 在上，body + comments 在下）。
- **Profile**: Stat row 到 mobile 仍保持 horizontal 3 columns；tab strip 保持 horizontal，并允许 overflow scroll。
- **Console (creator / ad)**: Sidebar 在约 768px 以下折叠为 hamburger drawer；stat-card row wrap 到 2-up。

### Touch Targets

- Mobile 上最小 tap target 为 44×44px。Icon button 渲染为 44×44 hit zone 内的 24px icon。
- Pill button 在 mobile 上保持 36-40px height，不必增大 radius 也能满足这一点。

### Type at Mobile

- Body size 不缩到 14px 以下。Small caption 保持 12px，在保留密度的同时避免中文字符不可读。

## 9. Agent Prompt Guide

### Brand Red Disambiguation

Live system 中有两个 red。它们按 **surface** 分工，而不是按 mood 分工；错误 surface choice 是这个 design system 最常见的 artifact-level slop，所以规则必须明确：

- **Default — emit `#FF2442`**（`--primary` / `--color-red`）：用于所有 *不是* 现有 component 像素级复刻的东西：new CTAs、hearts、accent fills、tag-on-trending、page-token references。
- **Pixel-replica — emit `#FF2E4D`**：*只* 在复现 live `.reds-button-new.primary` button fill、`.active-bar` tab indicator 或 outlined follow-button border 时使用。把它当作 production-fidelity value；不要泛化到其他 component。
- **Never mix the two on one component.** 同一个 element 上 `background: #FF2442` 旁边再写 `border: 1px solid #FF2E4D`，正是这条规则要防止的 failure mode；选择一个 surface category，然后保持一致。

下方 Component One-Liners block 是有意的：primary CTA 使用 `#FF2442`（token red，default），tab indicator 使用 `#FF2E4D`（component red，pixel-replica）。它们是不同 surface，所以使用不同 red。

### Quick Color Reference

- Brand: `#FF2442`（token，default）/ `#FF2E4D`（component layer，仅 pixel-replica；见上方 disambiguation）
- Star (collect): `#FDBC5F`
- Surface: `#FFFFFF`
- Canvas: `#F5F5F5`
- Title text: `rgba(0,0,0,0.80)`
- Paragraph: `rgba(0,0,0,0.62)`
- Description: `rgba(0,0,0,0.45)`
- Hover / disabled fill: `rgba(48,48,52,0.10)`
- Hairline: `rgba(0,0,0,0.08)`

### Quick Type Reference

- Family: `PingFang SC, -apple-system, 'Helvetica Neue', 'Hiragino Sans GB', 'Microsoft Yahei', Arial`
- Stat / digit family: `RED Number`
- Heading: 20-32px，weight 600，line-height 125-140%
- Body: 14-16px，weight 400，line-height 143-150%
- Tracking: 0

### Component One-Liners

- Primary CTA: `background: #FF2442; color: #FFF; border-radius: 9999px; padding: 8px 20px; font-weight: 500;`
- Follow button (idle): same as primary CTA，label `+ 关注` (Follow)
- Follow button (following): `background: rgba(48,48,52,0.10); color: rgba(0,0,0,0.45); border-radius: 9999px;` label `已关注` (Following)
- Feed card: `background: #FFF; border-radius: 12px; box-shadow: none;` image flush to top
- Tab indicator: 2px underline `#FF2E4D` matched to text width；active text `rgba(0,0,0,0.80)` weight 600
- Search input: `background: #F5F5F5; border-radius: 9999px; padding: 8px 16px; height: 36-40px; border: none;`
- Bottom sheet: `border-radius: 16px 16px 0 0; background: #FFF;` 4×36px drag handle `#E0E0E0` centered

### Iteration Guide

1. **Start from the picture, not the chrome.** 先放一个慷慨 photographic hero 或 pin grid；围绕它安静地搭 UI。
2. **One accent.** 如果一个 screen 已经用过一次 `#FF2442`，就已经够了。
3. **Translucent neutrals.** 先用 `rgba(48,48,52, .10)`，再考虑新的 grey hex。
4. **Pill everything that's tappable.** 如果它看起来像 square button，那就是错的。
5. **No shadow until a hover or modal demands it.** 默认 elevation 是 flat。
6. **Second person Chinese voice.** 即使是 Latin copy，也应像朋友说话，而不是 vendor pitching。
7. **Variable card heights.** 3:4 image 挨着 4:5 image 才是这个 look；不要把两者 padding 成同高。
8. **Mobile-first density.** Two-column waterfall 是 canonical layout；其他一切都是对更宽 viewport 的响应。
