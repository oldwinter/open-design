# Design System Inspired by WIRED

> Category: Media & Consumer
> 科技杂志。纸白 broadsheet 密度、自定义 serif display、mono kickers、ink-blue links。

## 1. Visual Theme & Atmosphere

WIRED 的 homepage 像一张被接上电源的 printed broadsheet。Grid 密集，rules 纤细，type 声量很大，几乎每个 surface 都是 paper-white 或 pure black；没有 rounded corners，也没有任何不配占位的装饰。Image rectangles 直接贴住 headlines，hairline dividers 像真实杂志里分隔 columns 的 pica rules 一样分隔 stories；除了 photography 自身，所有非 grayscale 颜色都被拒之门外。页面里没有任何 "card with shadow" —— 整个 layout 由 typographic weight、rules 和 whitespace 的纪律撑住，就像 Condé Nast print page 会在 paste-up room 里被组装出来。

标志性动作是 **typographic stack**：主 headline 使用粗暴放大的自定义 serif（WiredDisplay），body 和 decks 使用 humanist serif（BreveText），UI affordances 使用 geometric sans（Apercu），而 kickers、eyebrows 和 timestamps 则使用硬朗的 mono uppercase（WiredMono）。这个 mono kicker 通常是 black caps，letter-spacing 宽到像 Geiger-counter tick；它让 WIRED 页面隔着房间也能一眼认出。

真正重要的 accent color 只有一个：饱和 link blue（`#057dbc`），hover 时的 underlined states 像 CRT scanline 一样亮起。其他一切都由 black、paper white 和两档 gray 构成；这个 design 的自信来自拒绝发明更多颜色。

**Key Characteristics:**
- Newsstand-density editorial grid：rules 和 whitespace，绝不用 cards 或 shadows
- Custom serif display + technical mono kickers —— Condé-Nast-meets-engineering-lab 的 voice
- 每张 image、container 和 ribbon 都严格 square corners（只有 icon buttons 是 circular）
- Buttons 和 links 使用 2px hard black borders —— 像印刷，不像网页
- 每个 story 都有 mono ALL-CAPS eyebrows，wide tracking（0.9–1.2px）
- Links 使用单一 ink-blue accent；其他一切都生活在 pure grayscale 中
- Dark theme = *footer*，不是整页；页面本身坚定选择 paper-white

## 2. Color Palette & Roles

### Primary (Editorial Ink)
- **WIRED Black** (`#000000`): 用于 ribbons、section dividers、button borders、headline rules 的 pure ink —— 页面上最强的手势。
- **Page Ink** (`#1a1a1a`): Headlines 和 body type 使用的 near-black。略微柔化，让 long-form reading 不像盯着电源键。
- **Paper White** (`#ffffff`): 整站 default canvas。像 newsprint stock 一样对待它 —— uninterrupted，never tinted。

### Secondary (Editorial Voice)
- **Link Blue** (`#057dbc`): 唯一 brand accent。用于 inline link hovers、breadcrumbs 和极少数 button —— 不做 backgrounds，不做装饰。把它当作黑白电影里唯一被允许出现的颜色。

### Surface & Background
- **Newsprint** (`#ffffff`): Editorial pages、story grids、hero zones。
- **Footer Ink** (`#1a1a1a`): Homepage 上唯一 inverted region。Paper white type 置于其上。
- **Hairline Tint** (`#e2e8f0`): 只保留给 sections 之间的 `<hr>` elements —— 几乎不可见，像 margin rule。

### Neutrals & Text
- **Headline Black** (`#1a1a1a`): 所有 H1/H2 display type。
- **Body Gray** (`#1a1a1a`): Long-form body text —— 与 headlines 使用同一 ink，保持统一。
- **Caption Gray** (`#757575`): Secondary metadata：bylines、timestamps、photo credits。
- **Disabled Gray** (`#999999`): Inactive links、low-priority labels。
- **Hairline Border** (`#e2e8f0`): 只用于 subtle separators。

### Semantic & Accent
- **Brand Hover Blue** (`#057dbc`): Link rollover state —— 同时承担唯一 "interactive" cue。
- *(WIRED 的 homepage 有意省略 semantic success/error/warning palettes —— 这是 editorial，不是 SaaS dashboard。)*

### Gradient System
无。WIRED 使用零 gradients。页面上最接近 gradient 的东西，是照片里的 tonal range —— gradients 应该活在 *imagery* 中，而不是 chrome 中。

## 3. Typography Rules

### Font Family
- **WiredDisplay**（custom serif，fallback `helvetica`）— Display headlines 和 feature titles。
- **BreveText**（humanist serif，fallback `helvetica`）— Article body、decks、longer captions。
- **Apercu**（geometric sans，fallback `helvetica`）— UI labels、buttons、navigation、mid-weight headings。
- **WiredMono**（custom monospace，fallback `helvetica`）— Eyebrows、kickers、timestamps、section labels、ALL CAPS。
- **Inter**（sans，system fallback）— 新模块中的 utility UI。
- **ProximaNova**（sans，fallback `helvetica`）— Legacy UI surfaces。
- **WIRED Mono**（custom mono，fallback `Monaco, Courier New, Courier`）— Article-page eyebrows。

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Display Headline (Hero) | WiredDisplay | 64px / 4.00rem | regular | 0.93 | -0.5px | 紧到 descenders 几乎相触 —— newsstand presence |
| Display Headline (Mobile / Mid) | WiredDisplay | 26px / 1.63rem | regular | 1.08 | — | 同一字体，为 grid blocks 缩小 |
| Section Heading | Apercu | 20px / 1.25rem | 700 | 1.20 | -0.28px | Module titles（"Most Popular", "Featured"）使用 bold sans |
| Subheading | Apercu | 17px / 1.06rem | 700 | 1.29 | -0.144px | Feature blocks 中的 story decks |
| Article Deck (Serif) | BreveText | 19px / 1.19rem | regular | 1.47 | 0.108px | Long-form lead paragraphs |
| Article Body (Serif) | BreveText | 16px / 1.00rem | regular | 1.50 | 0.09px | Standard paragraph text |
| UI Heading | Apercu | 16px / 1.00rem | 700 | 1.25 | 0.3px | Inline UI labels、button captions |
| Button Label | Apercu | 16px / 1.00rem | 700 | 1.25 | 0.3px | 根据 placement 可选择 all caps |
| Link (Inline UI) | Apercu | 14px / 0.88rem | regular | 1.29 | 0.4px | Footer links、secondary nav |
| Eyebrow / Kicker | WiredMono | 13px / 0.81rem | regular | 1.23 | 0.92px | UPPERCASE —— headline 上方的 story category |
| Eyebrow Bold | WiredMono | 13px / 0.81rem | 700 | 1.23 | — | UPPERCASE —— featured story marker |
| Section Ribbon | WiredMono | 12px / 0.75rem | 700 | 1.00 | 1.2px | UPPERCASE —— black-bar section labels |
| Photo Caption | BreveText | 12.73px / 0.80rem | 700 | 2.20 (relaxed) | 0.108px | Generous leading —— print-photo treatment |
| Timestamp / Meta | WiredMono | 12px / 0.75rem | regular | 1.33 | 1.1px | UPPERCASE，用于 "X HOURS AGO" markers |
| Tertiary Footer Link | ProximaNova | 11px / 0.69rem | regular | 1.45 | — | Newsletter footer、legal links |
| Inter UI Heading | Inter | 16px / 1.00rem | 600 | 1.23 | 0.108px | Newer module headers |
| Inter UI Caption | Inter | 14px / 0.88rem | 600 | 1.40 | — | Compact UI metadata |

### Principles
- **Four faces, four jobs.** WiredDisplay 用来喊，BreveText 用来读，Apercu 用来点击，WiredMono 用来标记。它们永远不交换职责。这种分工让页面不会变成 typography sample。
- **Tight headlines, generous body.** Display type 的 line-height 可低到 0.93（几乎相触），而 body BreveText 打开到 1.47–1.50。这种反差就是 editorial fingerprint。
- **Mono is always uppercase.** 每次使用 WiredMono 都带 `text-transform: uppercase` 和 0.9–1.2px letter-spacing。Lowercase mono 应视为 broken —— 它不该出现在 WIRED 页面上。
- **Bold is rare.** Apercu 仅在 UI emphasis 中使用 weight 700；editorial layer（Display + BreveText）完全依赖 size 和 ink color，不依赖 bolding。
- **Letter-spacing has two registers**：ALL-CAPS mono 使用 positive（0.9–1.2px），large display serif 使用 negative（-0.144 到 -0.5px）。最大号 type 不要 neutral。

### Note on Font Substitutes
Hierarchy table 中的 line-height values（尤其是 64px hero 的 0.93）假设使用 **proprietary WiredDisplay and BreveText faces**，它们 metrics 紧、ascenders/descenders 短。如果用 **Playfair Display** 或 **Libre Caslon** 这类 wide-metric open-source fonts 替代，display line-heights 需要大约放松 **+0.10 到 +0.12**，避免 wrapping lines 上 ascender/descender 碰撞（例如 0.93 → 1.05，1.08 → 1.18）。Apercu substitutes（Inter、Work Sans、Manrope）可以按 token values 工作，无需调整。BreveText body substitutes（Lora、Source Serif 4）也无需调整，因为 body leading 已足够 generous。

## 4. Component Stylings

### Buttons

**Primary CTA —— Black Outline ("Subscribe")**
- Background: `#ffffff` (Paper White)
- Text: `#000000` (WIRED Black)，Apercu 16px / 700 / 0.3px tracking
- Border: `2px solid #000000` —— printerly hard rule，不是 1px UI border
- Border radius: `0`（square corners）
- Padding: vertical ≈ 12–14px，horizontal ≈ 24px
- Hover: background 翻转为 `#000000`，text 翻转为 `#ffffff` —— pure inversion，rule 上不加 easing
- Transition: 约 150ms，仅 color/background

**Secondary —— Inverted ("Sign In", in dark zones)**
- Background: `#000000`
- Text: `#ffffff`
- Border: `2px solid #ffffff`
- 同样 square corners，同样 inversion-on-hover behavior

**Tertiary —— Underlined Inline Link**
- 在 nav 中包装成 button 时：text `#1a1a1a`，underline 始终存在，hover 将 color 切到 `#057dbc` 同时保留下划线
- 无 padding、无 border、无 background —— 这是 editorial linking，不是 UI

**Pill / Round Icon Button**
- Border radius: `50%`（站内唯一 circular shape）
- 只用于 header 中的 icon controls（search、account、social）
- Border: 1px solid `#757575`，或根据 placement 无 border
- Size: 约 32–40px square footprint

**Tag / Span Pill**
- Border radius: `1920px`（实际等同 full pill —— 只用于 "BREAKING" 这类 text spans）
- Background: 根据上下文使用 solid black 或 red accent
- Text: white，mono 11–12px caps

### Cards & Containers
- **Cards do not exist.** WIRED 的 homepage 没有 rounded boxes、没有 shadows、没有 surface elevation。
- "Story tile" 只是 image rectangle 叠在 kicker + headline + deck 上方，再用 **1px hairline rules**（`#000000` 或 `#4a5568`）或 raw whitespace 与邻居分隔。
- 最接近 "container" 的东西是 black ribbon section header（例如 "MOST POPULAR"）—— full-bleed black bar，white WiredMono caps，无 padding refinement，无 rounded ends。
- Story tile 的 hover behavior：headline link text 从 `#1a1a1a` 切到 `#057dbc` 并出现 underline。Image 本身不 zoom、不 lift、不加 shadow。

### Inputs & Forms
- **Newsletter input**：rectangular，`2px solid #000000` border，`0` radius，white background，Apercu 16px placeholder。
- **Focus**：border 保持 2px black，无 glow ring，无 color change —— focus 只由 blinking caret 表示。（真正发布时建议为 accessibility 添加 2px outset —— WIRED 自己的实现对 keyboard users 支持不足。）
- **Error**：下方 text label 使用 `#e53e3e`（Fides cookie overlay 借用了这个 red —— 克制使用）。
- **Disabled**：text 降到 `#a0aec0`，border 柔化到 `#757575`。

### Navigation
- **Top utility bar**：black（`#000000`）full-bleed strip，高约 32–40px，mono caps links 由 hairline dividers 分隔，`#ffffff` text，hover → `#057dbc`。
- **Main nav**：bug logo 下方的 paper-white（`#ffffff`）row，Apercu 14–16px / regular，hover → `#057dbc` underline。
- **Logo**：WIRED bug，约 209×42px，centered 或 left-aligned，绝不 recolor，始终 pure black on white。
- **Mobile**：nav collapse 为 bug logo 左侧的 hamburger。Section nav 变为 mono caps links 的 slide-down drawer。
- **Transition**：hover color swaps 即时或约 120ms；不要 bouncy easing —— editorial restraint。

### Image Treatment
- **Aspect ratios**：hero images 主要 16:9，grid story tiles 4:3，较小的 "Most Popular" thumbnails 1:1。
- **Corners**：永远 0 radius。Square。唯一 rounded image 是 circular author avatar（50%）。
- **Full-bleed**：hero photographs 在所在 column 内 edge-to-edge；无 inset，无 border。
- **Captions**：BreveText 12.73px / 700，relaxed 2.20 line-height —— 直接放在 image 下方，部分 templates 中 italicized。
- **Hover**：无 zoom、无 opacity dip —— 只有 image 下方 headline 有响应。
- **Lazy loading**：fold 以下所有 imagery 使用标准 `loading="lazy"`。

### Editorial Ribbons & Section Markers
- Black bar（`#000000`）full-bleed，内部 white WiredMono uppercase label（例如 "MOST POPULAR", "BACKCHANNEL", "GEAR"）。
- 高约 32–40px，无 padding refinement，无 rounded ends。
- 有时会在正上方或正下方放一条 thin 2px black rule，形成 double-frame。

### Numbered Lists ("Most Popular")
- Stories 的 vertical list 前置 WiredDisplay numerals（01、02、03…），约 40–48px，紧贴所标记的 headline。
- 每个 item 之间使用 hairline rule，无其他装饰。

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px。
- **Scale**: 1px（hairline）、4px、8px、12px、14.11px、15px、16px、24px、25.46px、29.66px、32px、40px、48px、64px。
- **Section padding**: major editorial blocks 之间通常 32–48px vertical。
- **Card padding**: 没有 cards；story tiles 之间 horizontal gutter 为 24–32px，vertical 为 16–24px。
- **Inline spacing**: kickers 位于 headlines 上方约 4–8px；decks 位于 headlines 下方约 8–12px；bylines/timestamps 再向下 8–12px。

### Grid & Container
- **Max width**: desktop 约 1280–1600px（dembrandt sweep 检测到最高 1600px breakpoints），居中并带 generous outer margins。
- **Column patterns**: 12-column grid，根据 module 解析成 2/3/4 column story arrangements —— feature blocks 常用 "1 large + 2 small" pattern，并用 hairline rules 分隔。
- **Column gutters**: 约 24–32px；当 editorial logic 需要 "page-fold" feel 时，用 `#000000` 或 `#4a5568` 的 1px rules 分隔。

### Whitespace Philosophy
WIRED 对待 whitespace 的方式像 magazine art director 对待 margin：它是 type 周围的 silence，不是 styling choice。页面从不过度呼吸（这不是 Stripe 或 Apple）；它以 *editorial* 的方式呼吸 —— 足以避免相邻 stories 争吵，但绝不会多到暗示页面没内容。如果一块 empty area 看起来还能塞下另一个 headline，那这块 empty area 正在做好它的工作。

### Border Radius Scale
- `0` —— every container、every image、every button、every input。Default。
- `1920px` —— 只用于需要像 full pill 的 text spans（"BREAKING", "LIVE"）。
- `50%` —— 只用于 round icon buttons 和 circular author avatars。

整站只有三种 radii，其中两种留给非矩形 shapes。这是所有 major editorial property 中**最严格**的 corner discipline。

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| 0 | No shadow, no border | Default editorial surface —— text on paper |
| 1 | 1px solid `#e2e8f0` hairline `<hr>` | Quiet section divider，几乎不可见 |
| 2 | 1px solid `#000000` hairline rule | Editorial column divider —— printerly、structural |
| 3 | 2px solid `#000000` border | Buttons、inputs、ribbons —— interactive emphasis |
| 4 | Black ribbon bar（`#000000` fill） | Section labels —— 页面上最 "elevated" 的 surface |
| 5 | Inverted footer block | Dark `#1a1a1a` zone with white type —— 唯一 inversion |

WIRED 的 depth philosophy 是**近乎信仰的 flat**。整站只有一个 shadow token（默认 `0 0 0 transparent` placeholder），story tiles、headers、modals 或 cards 都不应用 `box-shadow`。Depth 通过 **rule weight** 传达（1px hairline → 2px hard rule → solid black ribbon），而不是 simulated lighting。

### Decorative Depth
无。No gradients、no glow、no halos、no scrim overlays，标准 photo caption gradient 之外也不做覆盖。WIRED 的视觉兴趣来自 photography 和 typographic contrast，不来自 chrome。

## 7. Do's and Don'ts

### Do
- **Do** 在每个 primary button 上使用 2px hard black borders —— 不要 1px softness，不要 rounded edges。
- **Do** 在每个 story headline 上方放 WiredMono ALL-CAPS kicker（上方 4–8px，0.9–1.2px tracking）。
- **Do** 任何超过两行的 paragraph 都使用 BreveText —— Apercu 是给 UI 的，不是给阅读的。
- **Do** 保持 images square-cornered、edge-to-edge，并让 caption 贴近 bottom edge。
- **Do** 用 hairline rules 或 whitespace 分隔 story tiles，绝不用 cards 或 shadows。
- **Do** 只在 footers、ribbons 和 utility nav strip 中 invert（black background、white type）。
- **Do** 只把 `#057dbc` link blue 用于 hover states —— 永远不要作为 background 或 button fill。
- **Do** 激进缩放 headlines：hero 64px，grid blocks 26px，不要选择 32px 这种 "safe middle ground"。

### Don't
- **Don't** 给任何东西加 `box-shadow`。永远不要。WIRED 不发布 shadows。
- **Don't** 给 rectangular containers 做 rounded corners —— `border-radius: 0` 是 law。
- **Don't** 在一个 role 内混用 typefaces：WiredDisplay 不设置 body，BreveText 不设置 buttons。
- **Don't** 使用 grayscale + `#057dbc` 之外的颜色。不要 orange CTAs，不要 green success pills。
- **Don't** 用 Apercu lowercase 做 kickers —— 那是 WiredMono 的职责，而且必须 UPPERCASE。
- **Don't** 使用 gradients、blurs、glassmorphism 或 atmospheric effects —— 它们会破坏 printerly contract。
- **Don't** 依赖 hover lift effects。WIRED 的 hover 只是 text color swap，没有别的。
- **Don't** 发明新的 pill shapes。Round = icons only。Pill = inline text spans only。其他一切都是 square。

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Small Mobile | <375px | Single column，hamburger nav，所有 hero modules collapse 为 stacked image-headline-deck |
| Mobile | 375–767px | Single column，story grid 变成 vertical scroll，"Most Popular" numbers 缩到 32px |
| Tablet | 768–1023px | 2-column story grid，sidebar collapse 到 main feed 下方，nav 变 condensed |
| Desktop | 1024–1599px | 完整 editorial 3–4 column grid，sidebar 恢复，max headline scale 启用 |
| Large Desktop | ≥1600px | 页面 cap 在约 1600px container，margins 中 whitespace 扩张，不再继续 scale |

dembrandt sweep 检测到一组不寻常的 intermediate breakpoints（1280、1025、1024、1023、768、767、667、599、570、569、480、425、375、320、319）—— Wired 的 grid 几乎在每个常见 viewport 上都会 micro-tune，尤其是 iPad portrait/landscape boundary 附近。

### Touch Targets
- Primary button: 约 44x44px minimum（16px text + 12–14px vertical padding 满足 WCAG AAA）。
- Utility bar 中的 mono caps links 较小（约 32px tall）—— WIRED 自己的实现这里低于 WCAG。**Derivative work 应把 mono nav links padding 到 44px。**
- Header 中的 round icon buttons 约 40px circles，适合触控。

### Collapsing Strategy
- **Nav**: utility bar 在 768px 以下 drop；main nav collapse 成 hamburger drawer。Bug logo 在 mobile 重新居中。
- **Grid**: viewport 变窄时 4-col → 3-col → 2-col → 1-col。Hairline rules 在任何 column count 下都保留，所以 collapse 后仍有 printerly feel。
- **Spacing**: mobile 上 modules 之间的 vertical rhythm 从 48px → 32px → 24px 收紧。Horizontal page padding 从 64px → 24px → 16px。
- **Type**: WiredDisplay hero 从 64px 缩到 mobile 上约 36–42px，headlines 从 26px 缩到约 22px，kickers 锁定 12–13px（mono caps 不能再缩，否则不可读）。

### Image Behavior
- 所有 images 都是 responsive raster（`srcset`-driven），保留 aspect ratios：16:9 hero、4:3 mid、1:1 thumbnails。
- 无 art-direction swaps —— 同一 crop 跨 breakpoints scale。
- Fold 以下所有 imagery 使用 `loading="lazy"`，只有 hero 使用 `eager`。

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary Ink (text + ribbons)**: "WIRED Black (`#000000`)"
- **Page Canvas**: "Paper White (`#ffffff`)"
- **Headline / Body Text**: "Page Ink (`#1a1a1a`)"
- **Caption / Metadata**: "Caption Gray (`#757575`)"
- **Hairline / Quiet Border**: "Hairline Tint (`#e2e8f0`)"
- **Link Hover Accent (the only color)**: "Link Blue (`#057dbc`)"

### Example Component Prompts
1. *"创建一个 editorial story tile：16:9 image（square corners），在 26px WiredDisplay headline 上方放一个 `#1a1a1a` 的 UPPERCASE WiredMono kicker。用 1px black hairline rule 将 tile 与相邻元素分隔。No card, no shadow, no border-radius."*
2. *"设计一个 primary subscribe button：2px solid `#000000` border，square corners，`#ffffff` background，Apercu 16px / 700 / 0.3px tracking text in `#000000`。Hover state 在 150ms 内 invert 为 black background with white text."*
3. *"构建一个 'Most Popular' module：full-bleed black ribbon header，white WiredMono uppercase label，下面是 numbered list（01–05），使用 40px WiredDisplay numerals 和 17px Apercu 700 headlines，并以 hairline rules 分隔。"*
4. *"创建 newsletter signup form：2px solid black input border，无 radius，Apercu 16px placeholder in `#757575`，旁边放 inverted black submit button."*
5. *"设计 `#1a1a1a` footer，包含 paper-white tertiary navigation in ProximaNova 11px，hover color `#057dbc`，并在 block 顶部居中放置 WIRED bug logo."*

### Iteration Guide
使用此 design system refine 已生成 screens 时：
1. **先 audit corners。** 如果看到 `0`、`50%`（icons/avatars）或 `1920px`（text pills）之外的任何 `border-radius`，flatten it。Round corners 是最常见错误。
2. **Audit shadows。** 移除每个 `box-shadow`。如果 tile 需要 "lifted" 感，用 2px black border 或 hairline rule 代替。
3. **Audit typeface roles。** 确保 WiredDisplay 只设置 headlines，BreveText 只设置 reading body，Apercu 只设置 UI，WiredMono 只设置 ALL-CAPS labels。角色互换会立刻破坏 voice。
4. **Audit color sprawl。** 如果 chrome（非 photography）中出现 `#000`、`#1a1a1a`、`#757575`、`#e2e8f0`、`#ffffff`、`#057dbc` 之外的颜色，移除它。WIRED 的克制不可谈判。
5. **Audit kickers。** 每个 story 都应该有 UPPERCASE mono kicker。没有它，页面会像 generic blog，而不是 WIRED。
6. **Audit rules。** 当两个 stories 或 modules 相遇却没有清晰 visual break 时，添加 hairline `1px solid #000` dividers。Rules 是 connective tissue。
