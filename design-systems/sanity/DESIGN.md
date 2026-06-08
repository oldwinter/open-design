# Design System Inspired by Sanity

> Category: Backend & Data
> Headless CMS。Red accent，content-first editorial layout。

## 1. Visual Theme & Atmosphere

Sanity 的 website 像一个面向 developer-content platform 的 nocturnal command center —— dark、precise、deeply structured。整个体验坐落在 near-black canvas（`#0b0b0b`）上，它不像一个 "dark mode toggle"，更像为终日生活在 terminals 中的人打造的工具的自然状态。多数 CMS marketing pages 会转向 friendly pastels 和 soft illustration，而 Sanity 选择拥抱自己产品的重力：structured content 应有 structured stage。

标志性的 typographic voice 是 waldenburgNormal —— 一种独特、略带 geometric 的 sans-serif，display sizes 下有紧凑 negative letter-spacing（-0.32px 到 -4.48px），让 headlines 呈现压缩、engineered 的质感。在 112px hero scale 与 -4.48px tracking 下，type 几乎像 machined —— 精密切割的 steel letterforms。它与 IBM Plex Mono 组成搭档，用于 code 和 technical labels，形成 dual-register voice：editorial authority meets developer credibility。

Sanity 的独特性来自 monochromatic dark palette 与 vivid、saturated accent punctuation 的互动。Neutral scale 从 pure black 经由严格控制的 gray ramp（`#0b0b0b` -> `#212121` -> `#353535` -> `#797979` -> `#b9b9b9` -> `#ededed` -> `#ffffff`），没有 warm 或 cool bias —— 只有 pure、achromatic precision。在这种 disciplined backdrop 上，neon green accent（display-p3 green）和 electric blue（`#0052ef`）像 dark control room 中的 signal lights 一样落下。Orange-red CTA（`#f36458`）是这个 otherwise cool system 中唯一的 warm touch。

**Key Characteristics:**
- Near-black canvas（`#0b0b0b`）作为 default、natural environment —— 不是 dark "mode"，而是 primary identity
- waldenburgNormal 在 display sizes 上使用 extreme negative tracking，形成 precision-engineered typographic voice
- Pure achromatic gray scale —— 无 warm/cool undertones，保持 pure neutral discipline
- Vivid accent punctuation：neon green、electric blue（`#0052ef`）和 coral-red（`#f36458`）置于 dark field 上
- Pill-shaped primary buttons（99999px radius）与 secondary actions 的 subtle rounded rectangles（3-6px）形成对比
- IBM Plex Mono 作为 editorial display face 的 technical counterweight
- Full-bleed dark sections，content 收纳在 measured max-width containers 内
- 所有 interactive elements 的 hover states 都切到 electric blue（`#0052ef`）—— 一致的 "activation" signal

## 2. Color Palette & Roles

### Primary Brand
- **Sanity Black** (`#0b0b0b`): Primary canvas 和 dominant surface color。不是 pure black，但足够接近 absolute。整个 visual identity 的 foundation。
- **Pure Black** (`#000000`): 用于 maximum-contrast moments、deep overlays 和某些 border accents。
- **Sanity Red** (`#f36458`): Primary CTA 和 brand accent —— warm coral-red，作为 main call-to-action color。用于 "Get Started" buttons 和 primary conversion points。

### Accent & Interactive
- **Electric Blue** (`#0052ef`): 整个 system 的 universal hover/active state color。Buttons、links 和 interactive elements hover 时都切到这个 blue。也作为 `--color-blue-700` 用于 focus rings 和 active states。
- **Light Blue** (`#55beff` / `#afe3ff`): Secondary blue variants，用于 accent backgrounds、badges 和 dimmed blue surfaces。
- **Neon Green** (`color(display-p3 .270588 1 0)`): Vivid wide-gamut green，作为 `--color-fg-accent-green` 用于 success states 和 premium feature highlights。在 sRGB 中 fallback 为 `#19d600`。
- **Accent Magenta** (`color(display-p3 .960784 0 1)`): Vivid wide-gamut magenta，用于 specialized accent moments。

### Surface & Background
- **Near Black** (`#0b0b0b`): Default page background 和 primary surface。
- **Dark Gray** (`#212121`): Cards、secondary containers、input backgrounds 的 elevated surface color，以及 base canvas 上的 subtle layering。
- **Medium Dark** (`#353535`): Tertiary surface 和 border color，用于 dark layers 之间建立 depth。
- **Pure White** (`#ffffff`): 用于 inverted sections、light-on-dark text 和特定 button surfaces。
- **Light Gray** (`#ededed`): Inverted/light sections 与 subtle background tints 的 light surface。

### Neutrals & Text
- **White** (`#ffffff`): Dark surfaces 上的 primary text color，最大 legibility。
- **Silver** (`#b9b9b9`): Secondary text、dark surfaces 上的 body copy、muted descriptions 和 placeholder text。
- **Medium Gray** (`#797979`): Tertiary text、metadata、timestamps 和 de-emphasized content。
- **Charcoal** (`#212121`): Light/inverted surfaces 上的 text。
- **Near Black Text** (`#0b0b0b`): White/light button surfaces 上的 primary text。

### Semantic
- **Error Red** (`#dd0000`): Destructive actions、validation errors 和 critical warnings —— pure、high-saturation red。
- **GPC Green** (`#37cd84`): Privacy/compliance indicator green。
- **Focus Ring Blue** (`#0052ef`): Accessibility focus ring color，与 interactive blue 一致。

### Border System
- **Dark Border** (`#0b0b0b`): Dark containers 上的 primary border —— 几乎不可见，保持 minimal containment。
- **Subtle Border** (`#212121`): Dark surfaces 上 inputs、textareas 和 card edges 的 standard border。
- **Medium Border** (`#353535`): 更可见的 borders，用于 emphasized containment 和 dividers。
- **Light Border** (`#ffffff`): Inverted/light elements 或需要 contrast separation 的 buttons 上的 border。
- **Orange Border** (`color(display-p3 1 0.3333 0)`): Highlighted/featured elements 的 special accent border。

## 3. Typography Rules

### Font Family
- **Display / Headline**: `waldenburgNormal`，fallback: `waldenburgNormal Fallback, ui-sans-serif, system-ui`
- **Body / UI**: `waldenburgNormal`，fallback: `waldenburgNormal Fallback, ui-sans-serif, system-ui`
- **Code / Technical**: `IBM Plex Mono`，fallback: `ibmPlexMono Fallback, ui-monospace`
- **Fallback / CJK**: `Helvetica`，fallback: `Arial, Hiragino Sans GB, STXihei, Microsoft YaHei, WenQuanYi Micro Hei`

*Note: waldenburgNormal 是 custom typeface。外部实现可使用 Inter 或 Space Grotesk 作为 sans substitute（geometric、slightly condensed feel）。IBM Plex Mono 可在 Google Fonts 获取。*

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | waldenburgNormal | 112px (7rem) | 400 | 1.00 (tight) | -4.48px | Maximum impact，compressed tracking |
| Hero Secondary | waldenburgNormal | 72px (4.5rem) | 400 | 1.05 (tight) | -2.88px | Large section headers |
| Section Heading | waldenburgNormal | 48px (3rem) | 400 | 1.08 (tight) | -1.68px | Primary section anchors |
| Heading Large | waldenburgNormal | 38px (2.38rem) | 400 | 1.10 (tight) | -1.14px | Feature section titles |
| Heading Medium | waldenburgNormal | 32px (2rem) | 425 | 1.24 (tight) | -0.32px | Card titles、subsection headers |
| Heading Small | waldenburgNormal | 24px (1.5rem) | 425 | 1.24 (tight) | -0.24px | Smaller feature headings |
| Subheading | waldenburgNormal | 20px (1.25rem) | 425 | 1.13 (tight) | -0.2px | Sub-section markers |
| Body Large | waldenburgNormal | 18px (1.13rem) | 400 | 1.50 | -0.18px | Intro paragraphs、descriptions |
| Body | waldenburgNormal | 16px (1rem) | 400 | 1.50 | normal | Standard body text |
| Body Small | waldenburgNormal | 15px (0.94rem) | 400 | 1.50 | -0.15px | Compact body text |
| Caption | waldenburgNormal | 13px (0.81rem) | 400-500 | 1.30-1.50 | -0.13px | Metadata、descriptions、tags |
| Small Caption | waldenburgNormal | 12px (0.75rem) | 400 | 1.50 | -0.12px | Footnotes、timestamps |
| Micro / Label | waldenburgNormal | 11px (0.69rem) | 500-600 | 1.00-1.50 | normal | Uppercase labels、tiny badges |
| Code Body | IBM Plex Mono | 15px (0.94rem) | 400 | 1.50 | normal | Code blocks、technical content |
| Code Caption | IBM Plex Mono | 13px (0.81rem) | 400-500 | 1.30-1.50 | normal | Inline code、small technical labels |
| Code Micro | IBM Plex Mono | 10-12px | 400 | 1.30-1.50 | normal | Tiny code labels、uppercase tags |

### Principles
- **Extreme negative tracking at scale**: 72px+ display headings 使用 aggressive negative letter-spacing（-2.88px 到 -4.48px），形成 tight、engineered quality，使 Sanity 区别于更松散的 editorial typography。
- **Single font, multiple registers**: waldenburgNormal 同时处理 editorial display 和 functional UI text。Weight range 很窄（大多数 400-425，500-600 只用于 tiny labels），保持 voice 一致。
- **OpenType feature control**: Typography 有意使用 feature settings，包括 display sizes 的 `"cv01", "cv11", "cv12", "cv13", "ss07"`，以及 body text 的 `"calt" 0`，为不同上下文微调 character alternates。
- **Tight headings, relaxed body**: Headings 使用 1.00-1.24 line-height（非常 tight），body text 以 1.50 呼吸。这种对比建立清晰 visual hierarchy。
- **Uppercase for technical labels**: IBM Plex Mono captions 和 small labels 经常使用 `text-transform: uppercase` 与 tight line-heights，形成 technical metadata 的 "system readout" aesthetic。

## 4. Component Stylings

### Buttons

**Primary CTA (Pill)**
- Background: Sanity Red (`#f36458`)
- Text: White (`#ffffff`)
- Padding: 8px 16px
- Border Radius: 99999px（full pill）
- Border: none
- Hover: Electric Blue (`#0052ef`) background，white text
- Font: 16px waldenburgNormal，weight 400

**Secondary (Dark Pill)**
- Background: Near Black (`#0b0b0b`)
- Text: Silver (`#b9b9b9`)
- Padding: 8px 12px
- Border Radius: 99999px（full pill）
- Border: none
- Hover: Electric Blue (`#0052ef`) background，white text

**Outlined (Light Pill)**
- Background: White (`#ffffff`)
- Text: Near Black (`#0b0b0b`)
- Padding: 8px
- Border Radius: 99999px（full pill）
- Border: 1px solid `#0b0b0b`
- Hover: Electric Blue (`#0052ef`) background，white text

**Ghost / Subtle**
- Background: Dark Gray (`#212121`)
- Text: Silver (`#b9b9b9`)
- Padding: 0px 12px
- Border Radius: 5px
- Border: 1px solid `#212121`
- Hover: Electric Blue (`#0052ef`) background，white text

**Uppercase Label Button**
- Font: 11px waldenburgNormal，weight 600，uppercase
- Background: transparent 或 `#212121`
- Text: Silver (`#b9b9b9`)
- Letter-spacing: normal
- 用于 tab-like navigation 和 filter controls

### Cards

**Dark Content Card**
- Background: `#212121`
- Border: 1px solid `#353535` 或 `#212121`
- Border Radius: 6px
- Padding: 24px
- Text: titles 使用 White（`#ffffff`），body 使用 Silver（`#b9b9b9`）
- Hover: subtle border color shift 或 elevation change

**Feature Card (Full-bleed)**
- Background: `#0b0b0b` 或 full-bleed image/gradient
- Border: none 或 1px solid `#212121`
- Border Radius: 12px
- Padding: 32-48px
- 包含 large imagery with overlaid text

### Inputs

**Text Input / Textarea**
- Background: Near Black (`#0b0b0b`)
- Text: Silver (`#b9b9b9`)
- Border: 1px solid `#212121`
- Padding: 8px 12px
- Border Radius: 3px
- Focus: 使用 `var(--focus-ring-color)`（blue）的 2px solid outline
- Focus background: 切到 deep cyan（`#072227`）

**Search Input**
- Background: `#0b0b0b`
- Text: Silver (`#b9b9b9`)
- Padding: 0px 12px
- Border Radius: 3px
- Placeholder: Medium Gray (`#797979`)

### Navigation

**Top Navigation**
- Background: Near Black (`#0b0b0b`) with backdrop blur
- Height: auto，compact padding
- Logo: left-aligned，Sanity wordmark
- Links: waldenburgNormal 16px，Silver（`#b9b9b9`）
- Link Hover: 通过 `--color-fg-accent-blue` 切到 Electric Blue
- CTA Button: right-aligned Sanity Red pill button
- Separator: 1px border-bottom `#212121`

**Footer**
- Background: Near Black (`#0b0b0b`)
- Multi-column link layout
- Links: Silver（`#b9b9b9`），hover 到 blue
- Section headers: White（`#ffffff`），13px uppercase IBM Plex Mono

### Badges / Pills

**Neutral Subtle**
- Background: White (`#ffffff`)
- Text: Near Black (`#0b0b0b`)
- Padding: 8px
- Font: 13px
- Border Radius: 99999px

**Neutral Filled**
- Background: Near Black (`#0b0b0b`)
- Text: White (`#ffffff`)
- Padding: 8px
- Font: 13px
- Border Radius: 99999px

## 5. Layout Principles

### Spacing System
Base unit: **8px**

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 1px | Hairline gaps、border-like spacing |
| space-2 | 2px | Minimal internal padding |
| space-3 | 4px | Tight component internal spacing |
| space-4 | 6px | Small element gaps |
| space-5 | 8px | Base unit —— button padding、input padding、badge padding |
| space-6 | 12px | Standard component gap、button horizontal padding |
| space-7 | 16px | Section internal padding、card spacing |
| space-8 | 24px | Large component padding、card internal spacing |
| space-9 | 32px | Section padding、container gutters |
| space-10 | 48px | Large section vertical spacing |
| space-11 | 64px | Major section breaks |
| space-12 | 96-120px | Hero vertical padding、maximum section spacing |

### Grid & Container
- Max content width: 约 1440px（从 breakpoints 推断）
- Page gutter: desktop 32px，mobile 16px
- Content sections 使用 full-bleed backgrounds，内部 content centered 且 max-width
- Multi-column layouts: desktop 上 2-3 columns，mobile 上 single column
- Card grids: CSS Grid，gaps 一致（16-24px）

### Whitespace Philosophy
Sanity 在 sections 之间使用 aggressive vertical spacing（64-120px），让 dark canvas 上有 breathing room。Sections 内部 spacing 更紧（16-32px），形成 dense information clusters，并由 generous voids 分隔。这种 rhythm 让页面具有 "slides" quality —— 每个 section 都像自己的 focused frame。

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| radius-xs | 3px | Inputs、textareas、subtle rounding |
| radius-sm | 4-5px | Secondary buttons、small cards、tags |
| radius-md | 6px | Standard cards、containers |
| radius-lg | 12px | Large cards、feature containers、forms |
| radius-pill | 99999px | Primary buttons、badges、nav pills |

## 6. Depth & Elevation

### Shadow System

| Level | Value | Usage |
|-------|-------|-------|
| Level 0 (Flat) | none | 大多数元素的 default state —— dark surfaces 仅通过 color 创造 depth |
| Level 1 (Subtle) | 0px 0px 0px 1px `#212121` | Border-like shadow，用于 minimal containment 且不显示明显 borders |
| Level 2 (Focus) | 0 0 0 2px `var(--color-blue-500)` | Inputs 和 interactive elements 的 focus ring |
| Level 3 (Overlay) | Backdrop blur + semi-transparent dark | Navigation overlay、modal backgrounds |

### Depth Philosophy
Sanity 的 depth system 几乎完全是 **colorimetric**，而不是 shadow-based。Elevation 通过 surface color shifts 传达：`#0b0b0b`（ground）-> `#212121`（elevated）-> `#353535`（prominent）-> `#ffffff`（inverted/highest）。这种方法天然适合 dark interfaces，因为传统 drop shadows 几乎不可见。少数存在的 shadows 是 ring-based（0px 0px 0px Npx）或 blur-based（backdrop-filter），而非 offset shadows，从而保持 flat、precision-engineered aesthetic。

Border-based containment（1px solid `#212121` 或 `#353535`）是主要 spatial separator，border darkness 被校准到可见但不主导。System 避免 "floating card" aesthetics —— 一切都像安装在 surface 上，而不是悬浮其上。

## 7. Do's and Don'ts

### Do
- 使用 achromatic gray scale 作为 foundation —— 保持 pure neutral discipline，不加入 warm/cool tinting
- 将 Electric Blue（`#0052ef`）一致用作所有 interactive elements 的 universal hover/active state
- 48px 及以上 display headings 使用 extreme negative letter-spacing（-2px 到 -4.48px）
- Primary CTAs 保持 full-pill shapes（99999px radius）并使用 coral-red（`#f36458`）
- Technical labels、tags 和 system metadata 使用 IBM Plex Mono uppercase
- 通过 surface color（dark-to-light）而不是 shadows 传达 depth
- 在 dark canvas 上保持 generous vertical section spacing（64-120px）
- Display typography 使用 `"cv01", "cv11", "cv12", "cv13", "ss07"` OpenType features

### Don't
- 不要向 neutral scale 引入 warm 或 cool color tints —— Sanity 的 grays 是 pure achromatic
- 不要使用 drop shadows 做 elevation —— dark interfaces 需要 colorimetric depth
- 不要使用介于 13px 与 99998px 之间的 border-radius —— system 从 12px（large card）直接跳到 pill（99999px）
- 不要在同一元素中混用 coral-red CTA 和 electric blue interactive color
- 不要使用 heavy font weights（700+）—— system 最高到 600，且只用于 11px uppercase labels
- 不要在未检查 gray-on-gray contrast ratio 的情况下，把 light text 放到 light surfaces 或 dark text 放到 dark surfaces
- 不要使用 traditional offset box-shadows —— 只用 ring shadows（0 0 0 Npx）或 border-based containment
- 不要破坏 headings 的 tight line-height —— 范围是 1.00-1.24，display text 永远不要到 1.5+

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Desktop XL | >= 1640px | Full layout，maximum content width |
| Desktop | >= 1440px | Standard desktop layout |
| Desktop Compact | >= 1200px | Slightly condensed desktop |
| Laptop | >= 1100px | Reduced column widths |
| Tablet Landscape | >= 960px | 2-column layouts 开始 collapse |
| Tablet | >= 768px | Transition zone，部分元素 stack |
| Mobile Large | >= 720px | Near-tablet layout |
| Mobile | >= 480px | Single-column、stacked layout |
| Mobile Small | >= 376px | Minimum supported width |

### Collapsing Strategy
- **Navigation**: Horizontal links 在 768px 以下 collapse 为 hamburger menu
- **Hero typography**: 在 breakpoints 间从 112px -> 72px -> 48px -> 38px scale，同时保持 tight letter-spacing ratios
- **Grid layouts**: 约 960px 时 3-column -> 2-column，768px 以下 single-column
- **Card grids**: Mobile 上使用 horizontal scrolling 而不是 wrapping（保留 card aspect ratios）
- **Section spacing**: Mobile 上 vertical padding 减少约 40%（120px -> 64px -> 48px）
- **Button sizing**: CTA pills 保持 padding 但降低 font size；ghost buttons 保持固定
- **Code blocks**: Horizontal scroll，保留 monospace formatting

### Mobile-Specific Adjustments
- Full-bleed sections edge-to-edge，并使用 16px internal gutters
- Touch targets: 所有 interactive elements 最小 44px
- Mobile sizes 上 heading letter-spacing 略微放松（negative tracking 不那么激进）
- Image containers 从 fixed aspect ratios 切到 full-width with auto height

## 9. Agent Prompt Guide

### Quick Color Reference
```
Background:      #0b0b0b (near-black canvas)
Surface:         #212121 (elevated cards/containers)
Border:          #353535 (visible) / #212121 (subtle)
Text Primary:    #ffffff (white on dark)
Text Secondary:  #b9b9b9 (silver on dark)
Text Tertiary:   #797979 (medium gray)
CTA:             #f36458 (coral-red)
Interactive:     #0052ef (electric blue, all hovers)
Success:         #19d600 (green, sRGB fallback)
Error:           #dd0000 (pure red)
Light Surface:   #ededed / #ffffff (inverted sections)
```

### Example Prompts

**Landing page section:**
"创建一个 feature section，background 使用 near-black (#0b0b0b)。Heading 使用 48px Inter，-1.68px letter-spacing，white text。下方 body text 使用 16px #b9b9b9，1.50 line-height。包含一个 coral-red (#f36458) pill button with white text，以及一个 secondary dark (#0b0b0b) pill button with #b9b9b9 text。两个 buttons hover 都切到 #0052ef blue。"

**Card grid:**
"在 #0b0b0b background 上构建 3-column card grid。每个 card 使用 #212121 surface、1px solid #353535 border、6px border-radius 和 24px padding。Card titles 为 24px white，-0.24px letter-spacing。Body text 为 13px #b9b9b9。在每个 card 顶部添加 13px IBM Plex Mono uppercase tag，颜色 #797979。"

**Form section:**
"在 #0b0b0b background 上设计 contact form。Inputs 使用 #0b0b0b background、1px solid #212121 border、3px border-radius、8px 12px padding，以及 #b9b9b9 placeholder text。Focus state 显示 2px blue (#0052ef) ring。Submit button 是 full-width coral-red (#f36458) pill。每个 field 下方包含 13px #797979 helper text。"

**Navigation bar:**
"创建 sticky top navigation，背景 #0b0b0b，并带 backdrop blur。Left：15px white brand text。Center/right：16px #b9b9b9 nav links，hover 到 blue。Far right：coral-red (#f36458) pill CTA button。Bottom border：1px solid #212121。"

### Iteration Guide
1. **Start dark**: 从 `#0b0b0b` background、`#ffffff` primary text、`#b9b9b9` secondary text 开始
2. **Add structure**: 使用 `#212121` surfaces 和 `#353535` borders 做 containment —— 不用 shadows
3. **Apply typography**: Inter（或 Space Grotesk）headings 使用 tight letter-spacing，body 使用 1.50 line-height
4. **Color punctuation**: CTAs 使用 `#f36458`，所有 hover/interactive states 使用 `#0052ef`
5. **Refine spacing**: 8px base unit，sections 内 24-32px，sections 间 64-120px
6. **Technical details**: Tags 和 metadata 使用 IBM Plex Mono uppercase labels
7. **Polish**: 确保所有 interactive elements hover 到 `#0052ef`，所有 buttons 是 pills 或 subtle 5px radius，borders 是 hairline（1px）
