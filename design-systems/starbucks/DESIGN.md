# Inspired by Starbucks 的 Design System

> Category: E-Commerce & Retail
> Global coffee retail brand。Four-tier green system、warm cream canvas、full-pill buttons。

## 1. Visual Theme & Atmosphere

Starbucks 的 design system 像一个 **warm, confident retail flagship**，把门店围裙上的绿色铺到每个 surface 上。Canvas 在 neutral-warm cream（`#f2f0eb`）和 ceramic off-white（`#edebe9`）之间交替，这些颜色指向真实门店材料：纸巾、café walls、wood finishes；与此同时，标志性的 **Starbucks Green**（`#006241`）在 hero bands、CTAs 和 Rewards experience 中锚定 brand moment。Greens 被校准为四个层级（Starbucks、Accent、House、Uplift），各自映射到特定 surface role；gold（`#cba258`）只出现在 Rewards-status ceremony 附近，而不是通用 accent。

Typography 承载了大部分 brand voice。专有 **SoDoSans** typeface（Starbucks custom）以 tight `-0.16px` letter-spacing 出现在几乎所有 surface 上；它读起来 confident 且 friendly，而不是 fashion-magazine 那样严厉。特别之处在于：Rewards page 会在特定 headline moments 切换到 warm serif（`"Lander Tall", "Iowan Old Style", Georgia`），轻微呼应 coffeehouse chalkboard 的 nostalgia；Careers pages 则为个人 cup-name touches 使用 handwritten script（`"Kalam", "Comic Sans MS", cursive`）。Three typefaces、three contexts；系统对每种字体出现的时机很克制。

Surfaces 通过 rounded geometry 呼吸。每个 button 都是 50px full-pill。Cards 使用 12px rounded-rectangle。"Frap" floating CTA 是 56px circular order button，填充 Green Accent（`#00754A`），也是产品的 signature depth move：它浮在 bottom-right，使用 layered shadow stack（`0 0 6px rgba(0,0,0,0.24)` base + `0 8px 12px rgba(0,0,0,0.14)` ambient），按下时通过 `scale(0.95)` 压缩。其他 elevation 更克制：card shadows 保持在轻声细语般的 `0.14/0.24` alpha，global nav 使用安静的 three-layer shadow stack。整个系统像干净的 café signage：legible、warm，永远不喊叫。

**Key Characteristics:**
- Four-tier green brand system（Starbucks / Accent / House / Uplift），每一层都映射到不同 surface role；不是单一的 "brand green"
- Gold 只保留给 Rewards-status moments；永远不是 general-purpose accent
- Warm-neutral canvas（`#f2f0eb` / `#edebe9`）替代 cold white，引用 café materials
- Custom proprietary typeface（SoDoSans）与 tight `-0.16px` letter-spacing 成为 universal voice
- Context-specific type switches：Rewards 使用 serif（Lander Tall），Careers cup-names 使用 script（Kalam）
- Full-pill buttons（`50px` radius）通用，`scale(0.95)` active press 是 signature micro-interaction
- Floating "Frap" circular CTA（`56px`、Green Accent fill、layered shadow stack）是产品 signature elevation element
- Gift-card surfaces 被设计成 **photographed physical product**；每张卡都是 distinct illustrated photograph，而不是 generated graphic
- 12px card radius + whisper-soft shadows 让 content cards 保持 flat-plus-hint-of-lift
- Rem-based spacing scale 锚定在 1.6rem（约 16px）= `--space-3`，逐步到 6.4rem（约 64px）

**Color-block page rhythm:** Cream hero → White content sections → Dark-green（`#1E3932`）feature band with white text → Cream utility zone → Dark-green（`#1E3932`）footer with gold / white text；用 espresso-dark bookend 包住明亮 body。

## 2. Color Palette & Roles

**Source pages analyzed:** homepage, rewards, gift cards, product detail（Pink Energy Drink）, product nutrition（Cold Brew）。

### Primary

- **Starbucks Green** (`#006241`): 历史 brand green。用于 h1 headings、Rewards page 的 primary section headers，以及任何需要单一 dominant color 的 main brand signal。
- **Green Accent** (`#00754A`): 稍亮、更 luminous 的 green。Primary filled-CTA color（"Explore our afternoon menu", "See the spring menu"），也是 floating Frap circular button 的 fill。
- **House Green** (`#1E3932`): 深 near-black brand green。用于 footer surface、feature-band backgrounds、reward-status dark surfaces，以及 Rewards 中 "Free coffee is just the beginning" hero band 的 headline 区域。
- **Green Uplift** (`#2b5148`): Secondary mid-dark green，少量用于 decorative accents 和 dark-gradient moments。
- **Green Light** (`#d4e9e2`): Pale mint wash，用于 form-valid-state tints 和 light green utility surfaces。

### Secondary & Accent

- **Gold** (`#cba258`): 几乎只保留给 Rewards-status ceremony：Gold-tier callouts、partnership badges（SkyMiles、Bonvoy）和 premium-feeling accents。永远不是 general-purpose brand color。
- **Gold Light** (`#dfc49d`): Gold-tier sections 上的更柔和 gold background washes。
- **Gold Lightest** (`#faf6ee`): Rewards page partnership sections 下的 cream-gold page-surface wash，把 gold accent 拉回 warm neutral system。

### Surface & Background

- **White** (`#ffffff`): Primary card 和 modal surface。也作为 gift-card tiles 的 card fill。
- **Neutral Cool** (`#f9f9f9`): Dropdown menus（"Account" dropdown）、form-card wraps 和 quiet utility containers 中使用的 subtle cool-gray surface。
- **Neutral Warm** (`#f2f0eb`): Rewards utility zones 和 hero bands 的 warm cream **primary page canvas**。
- **Ceramic** (`#edebe9`): 稍暖/稍深的 cream，用于 zone separators、soft page-section washes 和 Rewards partnership band。
- **Black** (`#000000`): Deep ink，只用于 dark top-of-page CTA strip（"Join now"）和 high-contrast top-nav sign-in buttons。

### Neutrals & Text

- **Text Black** (`rgba(0, 0, 0, 0.87)`): Light surfaces 上的 primary heading 和 body text color。不是 pure black；87%-opacity black 读起来更暖。
- **Text Black Soft** (`rgba(0, 0, 0, 0.58)`): Light surfaces 上的 secondary/metadata text。
- **Text White** (`rgba(255, 255, 255, 1)`): Dark green surfaces 上的 primary heading/body text。
- **Text White Soft** (`rgba(255, 255, 255, 0.70)`): Dark-green surfaces 上的 secondary text；footer link descriptions、caption text。
- **Rewards Green** (`#33433d`): 只用于 Rewards-page text blocks 的专用 muted slate-green；比 Text Black 稍 “dustier”，不用完整 Starbucks Green 也能提示 "reward surface"。

### Semantic & Accent

- **Red** (`#c82014`): Error 和 destructive state（form invalid、destructive actions）。
- **Yellow** (`#fbbc05`): Warning state、legacy brand touch。
- **Green Light** (`#d4e9e2` at 33% opacity = `hsl(160 32% 87% / 33%)`): Form valid-field tint background。
- **Red Tint** (`hsl(4 82% 43% / 5%)`): Forms 上的 invalid-field tint。

### Black / White Alpha Ladders

两条并行 translucent scales，用于 overlay 和 secondary-text：
- `rgba(0,0,0,0.06)` 到 `rgba(0,0,0,0.90)`，以 10% steps 递进；用于 light surfaces 上的 dark overlays
- `rgba(255,255,255,0.10)` 到 `rgba(255,255,255,0.90)`，以 10% steps 递进；用于 dark surfaces 上的 light overlays

### Gradient System

没有观察到 structural gradient tokens。Surface hierarchy 全程使用 solid-color-block；系统依赖 five-tier cream/green surface palette，而不是 gradients。

## 3. Typography Rules

### Font Family

- **Primary:** `SoDoSans, "Helvetica Neue", Helvetica, Arial, sans-serif`；Starbucks proprietary corporate typeface，几乎用于所有 surface
- **Loading Fallback:** `"Helvetica Neue", Helvetica, Arial, sans-serif`；SoDoSans 加载前用户看到的字体
- **Rewards Serif:** `"Lander Tall", "Iowan Old Style", Georgia, serif`；用于特定 Rewards-page headline moments，营造 warm editorial feel
- **Careers Script:** `"Kalam", "Comic Sans MS", cursive`；只用于 Careers-page "cup name" decorative touches，引用 Starbucks cups 上手写名字的感觉

没有在 `:root` 显式激活 OpenType stylistic sets。

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Display (text-10) | 5.0rem / 80px | 400–600 | 1.2 | -0.16px | Largest Rewards/hero display |
| Jumbo (text-9) | 3.6rem / 58px | 400–600 | 1.2 | -0.16px | Secondary hero headings |
| Hero Large (text-8) | 2.8rem / 45px | 400–600 | 1.2–1.5 | -0.16px | Landing section headlines |
| H1 | 24px | 600 | 36px | -0.16px | Starbucks-Green primary heading |
| H2 | 24px | 400 | 36px | -0.16px | Regular-weight section title in Text Black |
| Body Large | 19px | 400–600 | 33.25px (~1.75) | -0.16px | Hero intro copy, feature-band body |
| Body (text-3) | 1.6rem / 16px | 400 | 1.5 (24px) | -0.01em | Default body copy |
| Small (text-2) | 1.4rem / ~14px | 400–600 | 1.5 | -0.01em | Button label, metadata, form labels |
| Micro (text-1) | 1.3rem / ~13px | 400 | 1.5 | -0.01em | Active float-label state, caption micro-copy |
| Button Label | 14–16px | 400–600 | 1.2 | -0.01em | All pill-button labels |

**Letter-spacing tokens:**
- `letterSpacingNormal`: `-0.01em`（default；tight 且 characteristic）
- `letterSpacingLoose`: `0.1em`（emphasized caps）
- `letterSpacingLooser`: `0.15em`（uppercase-style labels、extreme emphasis）

**Line-height tokens:**
- `lineHeightNormal`: `1.5`（body）
- `lineHeightCompact`: `1.2`（display/buttons）

### Principles

- **Tight negative tracking（`-0.01em`）** 几乎全局应用；整个产品读起来略微 compressed，给 SoDoSans 带来 confident presence，却不显拥挤。
- **Hierarchy 由 weight shifts 承载，而不是 size shifts。** H1 和 H2 共用 24px/36px，只通过 weight（600 vs 400）与 color（Starbucks-Green vs Text Black）区分。
- **Size tokens 使用 rem，锚定 `1rem = 10px`**（通过 `font-size: 62.5%` root trick）。因此 `1.6rem` = 16px，`2.4rem` = 24px。Scale 是 semantic（textSize-1 到 textSize-10），不是随意 pixel values。
- **Context-specific typeface swaps**，例如 Rewards 上的 serif、Careers 上的 script，都是有意且局部化的。不要在同一个 surface 中与 primary sans 混用。
- **Body text 永远不使用 pure black**；它停留在 `rgba(0,0,0,0.87)`，以匹配 warm-neutral canvas temperature。

### Note on Font Substitutes

SoDoSans 是 Starbucks 的 proprietary typeface（由 House Industries 授权，不公开可用）。合理的 open-source substitutes：
- **Inter**（Google Fonts）；相近的人文几何比例，weight range 很宽
- **Manrope**；稍圆润，类似 confident feel
- **Nunito Sans**；更温暖，适合 “café” brand substitute

替换时，确认 tight `-0.01em` / `-0.16px` tracking 仍然易读；有些 open-source fonts 需要改成 `-0.005em`。

Lander Tall（Rewards serif）是 custom；open-source substitutes 可用 **Iowan Old Style**（已在 fallback 中）、**Lora** 或 **Source Serif Pro**。Kalam（Careers script）可直接从 Google Fonts 获得。

## 4. Component Stylings

### Buttons

**1. Primary Filled — "Explore our afternoon menu / Sign up for free"**
- Background: `#00754A` (Green Accent)
- Text: `#ffffff`
- Border: `1px solid #00754A`
- Radius: `50px` (full pill)
- Padding: `7px 16px`
- Font: SoDoSans, 16px, weight 600, letter-spacing `-0.01em`
- Active state: `transform: scale(0.95)` via `--buttonActiveScale`
- Transition: `all 0.2s ease`

**2. Primary Outlined — "Give them a try / Start an order"**
- Background: transparent
- Text: `#00754A` (Green Accent)
- Border: `1px solid #00754A`
- Same radius/padding/active/transition as Primary Filled

**3. Black Filled — "Join now"**
- Background: `#000000`
- Text: `#ffffff`
- Border: `1px solid #000000`
- Radius: `50px`, Padding: `7px 16px`
- Font: 14px, weight 600
- 用于 top-of-page join strip 和类似 conversion moments

**4. Dark Outlined — "Sign in"**
- Background: transparent
- Text: `rgba(0, 0, 0, 0.87)` (Text Black)
- Border: `1px solid rgba(0, 0, 0, 0.87)`
- Radius: `50px`, Padding: `7px 16px`
- Font: 14px, weight 600

**5. Green-on-Green Inverted — "See the spring menu"**
- Background: `#ffffff`
- Text: `#00754A`
- Border: `1px solid #ffffff`
- 当 button 背后的 surface 是 dark green House Green band 时使用；在 green bg 上用 white button + green text，而不是 filled green pill

**6. Outlined on Dark — "Learn more / Order now"**
- Background: transparent
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- 用于 dark-green feature bands，通常与 white filled CTA 搭配作为 secondary action

**7. Consent Agree (dark-green variant)**
- Background: `rgb(0, 130, 72)`（cookie-consent module 中使用的 specific variant green）
- Text: `#ffffff`
- No border, `50px` radius, `7px 16px` padding, 14px / weight 400
- 略亮于 Green Accent；只保留给 consent-banner Agree action

**8. Frap — Floating Circular Order Button**
- Background: `#00754A` (Green Accent)
- Icon: `#ffffff`
- Size: `5.6rem / 56px` (standard), `4rem / 40px` (mini variant)
- Radius: `50%` (full circle)
- Fixed bottom-right，`-0.8rem` touch offset 提供额外 tap comfort
- Shadow stack: base `0 0 6px rgba(0,0,0,0.24)` + ambient `0 8px 12px rgba(0,0,0,0.14)`
- Active state: ambient shadow fades to `0 8px 12px rgba(0,0,0,0)`
- 这是产品 signature elevation element；它浮在每个 scrolled surface 之上

**9. Full-width Feedback Tab — "Provide feedback"**
- Background: `#00754A`
- Text: `#ffffff`
- Radius: `12px 12px 0px 0px`（top-rounded only）
- Padding: `8px 16px`
- Font: 14px, weight 400
- Positioned fixed bottom-right-inside，贴在 viewport edge 上

### Cards & Containers

**Content Card (default)**
- Background: `#ffffff` (`--cardBackgroundColor`)
- Radius: `12px` (`--cardBorderRadius`)
- Shadow: `0px 0px .5px 0px rgba(0,0,0,0.14), 0px 1px 1px 0px rgba(0,0,0,0.24)` (`--cardBoxShadow`)
- Used for: feature cards, menu-item tiles, reward-status panels

**Gift Card Tile**
- Background: illustrated photography fills the card（no solid bg）
- Radius: 接近 cards（约 `12px`，corners 稍紧）
- Shadow: 比 default card 更轻；这些卡被当作铺在 canvas 上的 physical cards
- Card grid 上方按 category 标注（春季、感谢、生日、庆祝、母亲节、致谢、鼓励、里程碑、随时可用）

**Rewards Status Cards (Rewards page signature)**
- Three-column grid: Bronze / Gold / Silver-ish；每个都是 dark-green（`#1E3932`）panel，包含：
  - Colored gradient/color header ring
  - Numbered "Level" badge
  - Large SoDoSans weight 600 的 status title
  - White/translucent-white text 中的 stars / benefits list
  - 底部 "As you earn more stars…" progression caption

**Partnership Card (Rewards)**
- Background: `#faf6ee` (Gold Lightest) warm-cream surface
- Content: partner logos（"SkyMiles", "Bonvoy"）居中，下方放 descriptive text
- Radius 和 shadow 遵循 default card spec

**Dropdown Menu (Account dropdown, top-nav)**
- Background: `#f9f9f9` (Neutral Cool)
- Menu items 使用 `24px / weight 400` Text Black
- No border；只通过与 white nav 相比的 background surface shift 区分

**Modal**
- Padding: `2.4rem` (`--modalPadding`)
- Top padding: `8.8rem` (`--modalTopPadding`)；为 close button / header 留空间
- Combined vertical padding: `11.2rem`
- Radius 继承 card spec（`12px`）

### Inputs & Forms

**Floating Label Input**
- Focused/filled 时 label 浮到 input border 上方
- Desktop label font size: 默认 `1.9rem`，active 时动画到 `1.4rem`
- Mobile label font size: 默认 `1.6rem`，active 时动画到 `1.3rem`
- Label horizontal offset: 距 left `12px`
- Active label translate: 上移到 `-12px`，并带 `-50%` Y translation
- Field padding: `12px`
- Form horizontal padding: `1.6rem`
- Validation: valid-field 得到 `rgba(green-light, 0.33)` tint；invalid-field 得到 `rgba(red, 0.05)` tint
- Transition: checked-input 使用 `0.3s option-label-marker-expansion cubic-bezier(0.32, 2.32, 0.61, 0.27)`

**Option Icon (checkbox/radio)**
- Padding: `3px` inner
- 使用上面的 checked-input cubic-bezier animation（略带 “springy” 2.32 overshoot curve）

### Navigation

**Global Nav (top bar)**
- Fixed position，heights 逐级变化：`64px` xs → `72px` mobile → `83px` tablet → `99px` desktop
- Shadow stack: `0 1px 3px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.06), 0 0 2px rgba(0,0,0,0.07)`；three-layer soft lift
- Left: Starbucks wordmark logo，距 left edge `99px`（md）/ `131px`（lg）
- Primary links inline in SoDoSans weight 400–600: Menu · Rewards · Gift Cards
- Right: Find a store link + Sign in（outlined）+ Join now（black filled）

**Sub-nav (second bar, e.g., Rewards internal)**
- Height: `53px`（global subnav）/ `48px`（internal subnav）
- 通常是 global nav 下方的 horizontal tab group

**Mobile Nav**
- Tablet breakpoint 以下折叠为 hamburger drawer
- Frap floating button 无论 nav state 如何都持续位于 bottom-right

### Image Treatment

- **Hero photography**: Product photos（clear glass 中的 beverages，带 coral、sage、warm amber backgrounds）占 split-hero layout 的约 40vw；text 占另外 60vw（`--headerCrateProportion: 40vw` / `--contentCrateProportion: 60vw`）
- **Gift card illustrations**: 每张 card 都是 distinct illustrated photograph（painted-feel、hand-drawn-looking、warm color palette）。永远不要用 generic generated graphics。
- **Rewards ceremony imagery**: 手持 Starbucks Rewards App screens 的照片，angled compositions；product-in-context photography。
- **Menu thumbnails**: Square 或 4:3 product photography，搭配 clean white/cream backdrops，glass 周围有 slight soft drop-shadow。
- **Image fade-in**: image load 时使用 `opacity 0.3s ease-in` transition（`--imageFadeTransition`）。

### Feature Band (dark-green hero strip)

Full-width `#1E3932`（House Green）band，包含：
- Left: white headline + subhead + CTA row
- Right: product photography 或 illustration
- Split ratio 根据 section 为约 40/60 或 50/50
- 全部使用 white text，secondary copy 使用 `rgba(255,255,255,0.70)`
- CTAs 遵循 Green-on-Green Inverted（white filled）+ Outlined on Dark（white outline）配对

### Expander / Accordion

- Duration: `300ms` (`--expanderDuration`)
- Timing curve: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`；measured ease-out
- 用于 Rewards 和 gift page 的 FAQ sections

### Cookie Consent Module

页面顶部的 dark-green modal card，包含 "Agree"（green-filled）和 "Manage preferences"（outlined）buttons。首次访问时出现；可 dismiss。

### Product Detail Components (PDP signature cluster)

Menu product pages（例如 `/menu/product/40498/iced` drink detail、`/menu/product/.../nutrition` nutrition facts）使用的一组重复 component cluster。这些扩展 component inventory，但不改变 tokens。

**Size Options Selector**
- 4 个 cup-icon buttons 的 horizontal row（Tall / Grande / Venti / Trenta）
- 每项：上方 cup silhouette icon，下方 size name（Starbucks-Green 中 16/700），fluid-ounce caption（13/400 Text Black Soft）
- Active state: selected cup icon 外有 green circular ring outline（`2px solid #00754A`）
- Inactive: no ring，typography 相同
- Full-width row，equal spacing
- Container radius: `12px` 或 flat；individual icons 为 `50%` circular
- Padding: `16px 24px` internal

**Add-in / Milk Select (outlined rectangle)**
- Background: `#ffffff`
- Border: `1px solid #d6dbde` (Input Border)
- Radius: `4px`
- 在 column 中 full-width
- Top border 上方的 floating label: "Add-ins" / "Milk" / "Add-ins"；13/700 Text Black uppercase，`0.325px` letter-spacing
- Value 居中显示（例如 "Ice", "Coconut", "Strawberry Fruit Inclusions scoop"）：16/400 Text Black
- 右侧 chevron-down icon 使用 Text Black Soft
- Focus: border 切换到 Green Accent（`#00754A`）

**Numeric Stepper**
- 当需要 quantity 时嵌入 Add-in row（例如 Strawberry Fruit Inclusions scoop）
- `−` minus button + count number + `+` plus button，均 inline 放在 label 右侧
- Buttons: circular `32×32px`，带 `1px solid #d6dbde` border，neutral gray icon
- Count number: 16/700 Text Black 居中

**Customize Button**
- Background: `#ffffff`
- Text: `#00754A` (Green Accent)
- Border: `1.5px solid #00754A`
- Radius: `50px` (full pill)
- Padding: `14px 40px`（比 default pills 更 generous；这是 secondary primary action）
- Label: "Customize"，左侧嵌入 gold sparkle ✨ icon
- Used for: size/milk selection 之后进入 drink-customization flow

**Add to Order Button (PDP)**
- Background: `#00754A` (Green Accent)
- Text: `#ffffff`
- Radius: `50px`
- Padding: `14px 32px`
- 固定在 product card top-right 和/或 store-availability band 内右对齐
- 与其他 primary CTAs 使用相同 `scale(0.95)` active behavior

**Rewards Cost Pill — "200★ item"**
- Background: transparent
- Border: `1px solid #cba258` (Gold)
- Text: `#cba258` (Gold)
- Radius: `50px` (full pill)
- Padding: `4px 12px`
- Content: "200★ item"，其中 `★` 是小型 filled star glyph；表示兑换该 item 所需 Rewards Stars
- Font: Proxima Nova 13/700，`0.5px` letter-spacing
- 只用于可用 Rewards redeem 的 products

**Product Description Band**
- Full-width dark-green band（`#1E3932` House Green）
- 从上到下包含：
  1. Rewards Cost Pill（gold），如适用
  2. White 中的 product description body copy（16/400/1.5）
  3. Nutritional summary inline（"140 calories, 25g sugar, 2.5g fat"），带 info-icon tooltip；14/700 white
  4. "Full nutrition & ingredients list" outlined-white-on-green pill button
- Padding: `32px` vertical
- 出现在 primary product header band 下方

**Ingredients / Nutrition Table**
- Nutrition page 上的 two-column layout
- Left column: "Ingredients" header + list，或 "Not available for this item" placeholder text block，附 Text Black Soft 14/400 explanatory paragraph
- Right column: "Nutrition" header + label/value rows
- 每行：nutrient label（Proxima Nova 14/400）在左，value（例如 "140 calories", "25g", "205 mg**"）在右，下方用 `1px solid #e7e7e7` hairline 分隔
- 底部使用 13/400 Text Black Soft 显示 caffeine/asterisk markers 的 footnote
- 可复用于 nutrition facts regulation-compliant tables

**Store Availability Selector**
- 出现在 size-options row 上方的 dark-green feature band
- Full-width rounded rectangle，transparent-white interior
- Text: "For item availability, choose a store"，white，14/400
- 右侧：chevron-down affordance + white outline shopping-bag SVG icon
- Radius: `4px`
- Height: ~48px

**PDP Breadcrumb**
- Product title 上方的 "Menu / Refreshers / Pink Energy Drink" trail
- Separator: Text Black Soft 中的 `/` slash character
- Current page unlinked，prior pages 是 underlined green-accent links
- Font: 14/400 Proxima Nova
- 出现在所有 PDP pages

**Back Chevron Link (PDP nutrition / detail sub-pages)**
- Nutrition page section headings 上方的 "← Back" text link
- Text 使用 Green Accent（`#00754A`）14/700 Proxima Nova
- Left chevron `<` 同样使用 green
- 作为 deep sub-pages 上 full breadcrumb 的替代

## 5. Layout Principles

### Spacing System

Rem-based semantic scale（锚定 `1rem = 10px`）：

| Token | Rem | Pixels | Typical Use |
|-------|-----|--------|-------------|
| `--space-1` | `0.4rem` | 4px | Tightest inline padding |
| `--space-2` | `0.8rem` | 8px | Small gap, button vertical padding |
| `--space-3` | `1.6rem` | 16px | Default — card padding, outer gutter xs |
| `--space-4` | `2.4rem` | 24px | Section inner spacing, outer gutter md |
| `--space-5` | `3.2rem` | 32px | Major between-section spacing |
| `--space-6` | `4rem` | 40px | Large gaps, outer gutter lg, header crate |
| `--space-7` | `4.8rem` | 48px | Section-to-section spacing |
| `--space-8` | `5.6rem` | 56px | Very large breathing — Frap height |
| `--space-9` | `6.4rem` | 64px | Widest section padding |

**Gutter tokens:**
- `--outerGutter: 1.6rem`（16px，default / mobile）
- `--outerGutterMedium: 2.4rem`（24px，tablet）
- `--outerGutterLarge: 4.0rem`（40px，desktop）

**Universal rhythm constant:** `1.6rem`（16px）在每个 page 中反复出现，作为 default outer gutter、card padding baseline 和 text size 3 body；它是系统最常见 spacing unit。

### Grid & Container

- Column width scale: `--columnWidthSmall: 343px` / `Medium: 500px` / `Large: 720px` / `XLarge: 1440px`
- Gift-card grid 使用 3-5-up responsive grid，tile 约 `343px`
- Rewards status section: `lg+` breakpoints 下为 3-up dark-green panels
- Hero: 通过 `--headerCrateProportion` / `--contentCrateProportion` 实现 asymmetric split 40%（image）/ 60%（content）

### Whitespace Philosophy

Whitespace 承载 “plenty of space in the café” 的感觉。Section padding 偏 generous（40-64px）。Content blocks 通过 whitespace 而不是 dividers 分隔。Cream canvas（`#f2f0eb`）本身就是 white cards 与 green feature bands 之间的 visual breath。

### Border Radius Scale

| Value | Use |
|-------|-----|
| `12px` | Cards, modals, menu-item tiles (`--cardBorderRadius`) |
| `12px 12px 0 0` | Full-width feedback tab (top-rounded only) |
| `50px` | All buttons — full-pill radius (`--buttonBorderRadius`) |
| `50%` | Circular icons, Frap floating button, avatar thumbnails |
| Specialty | `3.3333%/5.298%` elliptical for Starbucks-Visa-Card mockups (`--svcRoundedCorners`) |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Card | `0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)` | Default content cards — a whisper-soft dual-shadow |
| Global Nav | `0 1px 3px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.06), 0 0 2px rgba(0,0,0,0.07)` | Triple-layer soft lift on the fixed top bar |
| Frap Base | `0 0 6px rgba(0,0,0,0.24)` | Base halo around the floating circular CTA |
| Frap Ambient | `0 8px 12px rgba(0,0,0,0.14)` | Stacked directional ambient — floats the Frap forward |
| Gift Card | Light drop shadow around illustrated photograph | Physical-card feel for gift tiles |
| Starbucks Card (SVC) | `drop-shadow(0 4px 1px rgba(0,0,0,0.11)) drop-shadow(0 0 2px rgba(0,0,0,0.24))` | Stacked SVG drop shadows for Starbucks Card visuals |

**Shadow philosophy:** Whisper-soft、layered over solid；系统永远不会使用单个 heavy drop shadow，而是堆叠 2-3 个不同 offset 的 low-alpha shadows，模拟真实世界 ambient + direct lighting。Frap button 是任何 page 上 elevation 最高的元素。

### Decorative Depth

- **No gradient system**；surfaces 都是 solid color-block
- **Color-block banding** 承载 perceived depth（dark-green bands 在 cream/white body sections 之间读作 “recessed feature zones”）
- **SVG filter shadows** 让 Starbucks-Card visuals 获得轻微 3D physicality，同时不用 box-shadow

## 7. Do's and Don'ts

### Do
- 使用 Neutral Warm（`#f2f0eb`）或 Ceramic（`#edebe9`）作为 page canvas，而不是 pure white；warm cream 是 signature
- 把 green tiers 映射到预定 surface role：Starbucks Green 用于 headings，Green Accent 用于 CTAs，House Green 用于 deep bands，Uplift 用于 decorative
- SoDoSans 在整个系统中保持 tight tracking：`-0.01em` / `-0.16px`
- 每个 button 无例外使用 50px full-pill radius
- 把 `transform: scale(0.95)` 作为 universal button active state
- Gold 只保留给 Rewards-status ceremony moments
- 几乎所有地方使用 SoDoSans；Lander Tall serif 只用于 Rewards editorial headlines；Kalam script 只用于 Careers "cup name" moments
- Elevation 使用 2-3 层 low-alpha shadows，而不是一个更重的 drop shadow
- 在每个 shopping surface 上用 Frap circular CTA 作为 persistent floating order entry
- 让 cream canvas 在 content cards 之间呼吸；用 whitespace，不用 dividers

### Don't
- 不要把 pure white 用作 page canvas；warm cream temperature 是 load-bearing
- 不要只选 “one brand green”；four-green system 是有意设计，所有地方都用 `#006241` 会压平品牌
- 不要把 Gold 当成 general-purpose accent；它只表示 Rewards signal
- 不要把 buttons 的 corners 做方；50px pill 是 universal
- 不要引入 gradient fills；系统全程是 color-block
- 不要用 size 区分 h1 与 h2；hierarchy 来自 weight + color（600 Starbucks-Green vs 400 Text Black）
- Body text 不要用 pure black；`rgba(0,0,0,0.87)` 与 warm canvas 匹配
- 不要跳过 buttons 上的 `scale(0.95)` active feedback；这是 signature micro-interaction
- 不要堆单个 heavy shadow；始终使用 2-3 个 low-alpha shadows
- 不要把 serifs 或 scripts 引入 main shopping flow；它们分别属于 Rewards 和 Careers contexts

## 8. Responsive Behavior

### Breakpoints

根据 component width tokens 和 progressive nav heights 推断：

| Name | Width | Key Changes |
|------|-------|-------------|
| xs | < 480px | Global nav 64px; hamburger menu; single-column layouts; pill buttons full-width |
| Mobile | 480–767px | Global nav 72px; gift-card grid 2-up; card padding tightens |
| Tablet | 768–1023px | Global nav 83px; gift-card grid 3-up; hero split begins to appear |
| Desktop | 1024–1439px | Global nav 99px; gift-card grid 4-up; full asymmetric hero 40/60 |
| XLarge | 1440px+ | Content caps at `--columnWidthXLarge`; gift-card grid 5-up; extra cream margin |

### Touch Targets

- `7px 16px` padding 的 pill buttons 约 32px 高，低于 touch-only surfaces 的 44px WCAG AAA minimum。Mobile 上 button padding 可以视觉上扩展以满足 minimum。
- Frap floating circular button 为 `56px`，明显高于 minimum。
- Frap 使用 `--frapTouchOffset: calc(-1 * .8rem)`，把 tap area 扩展到视觉边缘外 8px。
- Form float-label inputs 在 mobile 上增大 label font size（1.6rem base vs 1.9rem desktop），便于 arm's-length 情况下点击和阅读。

### Collapsing Strategy

- **Global nav height scales progressively**: across breakpoints 从 64 → 72 → 83 → 99px，而不是单一值
- **Hero split collapses**: 40/60 asymmetric split → mobile 上 stacked（image top, content below）
- **Gift-card grid**: 5-up → 4-up → 3-up → 2-up → 1-up，随 breakpoints 调整 card widths
- **Feature bands**: 保持 full-width，但 text + imagery 在 mobile 上 vertical stack
- **Outer gutter scales**: viewport 增长时从 16px → 24px → 40px
- **Rewards 3-column status panels**: Mobile 上 stack to single column

### Image Behavior

- Hero product photography 在 mobile 上 vertical crop 更紧；content 成为 visual anchor
- Gift-card illustrations 保持 aspect ratio；card grid reflows
- Image load 使用 `opacity 0.3s ease-in` fade-in transition（避免 jarring pop-in）
- Rewards app-in-hand photography 按比例缩放，永不 stretch

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA: "Green Accent (`#00754A`)"
- Primary CTA text: "White (`#ffffff`)"
- Brand heading: "Starbucks Green (`#006241`)"
- Feature band / footer: "House Green (`#1E3932`)"
- Page canvas: "Neutral Warm (`#f2f0eb`)"
- Card canvas: "White (`#ffffff`)"
- Heading text on light: "Text Black (`rgba(0,0,0,0.87)`)"
- Body text on light: "Text Black Soft (`rgba(0,0,0,0.58)`)"
- Body text on dark-green: "Text White Soft (`rgba(255,255,255,0.70)`)"
- Rewards accent: "Gold (`#cba258`)"
- Rewards text: "Rewards Green (`#33433d`)"
- Destructive: "Red (`#c82014`)"

### Example Component Prompts

1. "Create a primary Starbucks CTA pill button with Green Accent (`#00754A`) background, white text 'Explore our afternoon menu', SoDoSans font at 16px weight 600 with `-0.01em` letter-spacing, `50px` border-radius (full pill), `7px 16px` padding. Apply `transform: scale(0.95)` as the active state with a `0.2s ease` transition."

2. "Design a content card with White (`#ffffff`) background at `12px` border-radius, layered shadow `0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)`. Pad contents `16–24px` (`--space-3` to `--space-4`). Place on a Neutral Warm (`#f2f0eb`) page canvas with `16px` gap to siblings."

3. "Build the Frap floating circular order button — `56px` diameter, Green Accent (`#00754A`) fill, white shopping-bag icon centered. Layered shadow: `0 0 6px rgba(0,0,0,0.24)` + `0 8px 12px rgba(0,0,0,0.14)`. Fixed position bottom-right with `-0.8rem` touch offset. Active state collapses the ambient shadow to `0 8px 12px rgba(0,0,0,0)` with `scale(0.95)`."

4. "Build a dark-green feature band — full-width section with House Green (`#1E3932`) background. Left column: white SoDoSans h2 at 24px weight 600, followed by a Text White Soft (`rgba(255,255,255,0.70)`) body paragraph and a CTA row with two buttons (White-filled with Green Accent text for primary, Outlined-on-Dark white border for secondary). Right column: product photography. Split ratio 40/60, stacked vertically below `768px`."

5. "Create a Rewards status card — House Green (`#1E3932`) panel with `12px` border-radius, colored gradient top stripe (Bronze/Silver/Gold tier). Title in SoDoSans 24px weight 600 in white. Benefits list as white bullets with `rgba(255,255,255,0.70)` secondary captions. Bottom progression text in Text White Soft. Stack 3 panels in a grid at `lg+`, single column on mobile."

6. "Design a gift-card tile — card radius matches `12px`, fills with an illustrated photograph (hand-drawn watercolor-painted feel) as the entire surface. Subtle drop shadow makes it feel like a physical card on the cream canvas. Group under a category label ('Spring', 'Thank You', 'Birthday') in SoDoSans 24px weight 400 above the grid."

7. "Create a Starbucks product-detail header — House Green (`#1E3932`) band with breadcrumb 'Menu / Refreshers / Pink Energy Drink' in 14/400 white above the product title in SoDoSans 32/700 uppercase white. Product photograph centered below title. Below photo: a 4-up size selector row — each cup-icon button shows a vertical cup silhouette, size name ('Tall' / 'Grande' / 'Venti' / 'Trenta') in 16/700 white, and fluid-ounce in 13/400 Text White Soft. Selected size wraps the cup icon in a `2px solid #00754A` circular ring."

8. "Build a Starbucks customize flow — under the size selector, 3 stacked outlined-rectangle input rows (white bg, `1px solid #d6dbde` border, `4px` radius). Each has a floating label ('Add-ins', 'Milk', 'Add-ins') above the top border in 13/700 Text Black uppercase. Value centered (e.g., 'Ice', 'Coconut'). Right side: chevron-down in Text Black Soft. For the scoop row, embed a numeric stepper (`−` `1` `+` with circular `32px` outlined buttons). Below all three fields: outlined green 'Customize' pill with gold sparkle icon, `50px` radius, `14px 40px` padding. Pair with a Green Accent filled 'Add to Order' pill in the same row."

9. "Design a Starbucks product description band — full-width House Green (`#1E3932`) below product header. Top: a gold-outlined '200★ item' Rewards Cost Pill (`50px` radius, `4px 12px` padding, gold `#cba258` border and text). Below: product description in white 16/400/1.5. Nutritional inline summary in white 14/700 ('140 calories, 25g sugar, 2.5g fat') with info-icon tooltip. Outlined-white-on-green pill button 'Full nutrition &amp; ingredients list'. 32px vertical padding."

10. "Create a Starbucks nutrition facts table — two-column layout inside a White card. Left column: 'Ingredients' header (24/400 Text Black), followed by ingredient list or 'Not available for this item' placeholder paragraph in 14/400 Text Black Soft. Right column: 'Nutrition' header, then label/value rows (nutrient name left, value right) separated by `1px solid #e7e7e7` hairlines. Typography: labels in 14/400 Text Black, values in 14/700 Text Black right-aligned. Footnote asterisk markers in 13/400 Text Black Soft at the bottom."

### Iteration Guide

使用此 design system 细化已生成 screens 时：
1. 一次只聚焦一个 component
2. 引用本文档中的 specific color names 和 hex codes
3. 在 exact values 旁使用 natural language descriptions（"warm cream canvas," "four-tier green system"）
4. 全局保留 50px pill + `scale(0.95)` active state
5. 检查 greens 是否映射到正确 role（Green Accent for CTA、Starbucks Green for heading、House Green for band）
6. 不要引入 gradients；系统是 color-block
7. SoDoSans tracking 全局保持 `-0.01em` / `-0.16px`

### Known Gaps

- SoDoSans 是 proprietary typeface，Google Fonts 上不可用；公开实现时使用 Inter 或 Manrope 作为 substitute，并记录替换
- Lander Tall（Rewards serif）也是 custom；可用 Iowan Old Style、Lora 或 Source Serif Pro 替代
- 除少数已记录 timing（`--duration: 0.4s`、`--iconTransition: all ease-out 0.2s`、`--expanderDuration: 300ms`）外，specific per-component animation timings 并未覆盖每个 interactive surface
- Form error-state 的完整 styling（red border weight、icon placement）能从 tint token 看出，但没有 exhaustively extracted
- Careers-page specific components（cup-name card、search radio grid）在 token names 中被引用，但本次 extraction 未覆盖
- Starbucks Visa Card / Starbucks-Card（SVC）detailed mockup specs 由 `--svcRoundedCorners` 和 `--svcShadowFilter` tokens 暗示，但未完整记录
