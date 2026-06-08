# Design System Inspired by Stripe

> Category: Fintech & Crypto
> Payment infrastructure。标志性 purple gradients，weight-300 elegance。

## 1. Visual Theme & Atmosphere

Stripe 的网站是 fintech design 的 gold standard：一个同时具备 technical 与 luxurious、precise 与 warm 气质的系统。页面从干净的 white canvas（`#ffffff`）开始，搭配 deep navy headings（`#061b31`）和 signature purple（`#533afd`）；后者既是 brand anchor，也是 interactive accent。这不是 enterprise software 那种冷峻、临床感的 purple，而是 rich、saturated violet，读起来 confident 且 premium。整体印象像一家 financial institution 被世界级 type foundry 重新设计过。

Custom `sohne-var` variable font 是 Stripe visual identity 的 defining element。每个 text element 都启用 OpenType `"ss01"` stylistic set，修改字符形态，带来明显 geometric、modern 的感觉。在 display sizes（48px-56px）下，sohne-var 使用 weight 300；这对于 headline 来说极轻，却能形成 ethereal、近乎耳语般的 authority。这与 "bold hero headline" convention 正好相反；Stripe 的 headlines 感觉不需要大喊。Negative letter-spacing（56px 时 -1.4px，48px 时 -0.96px）把文字压紧成 dense、engineered blocks。较小字号同样使用 weight 300，并按比例放松 tracking；financial data display 则通过 `"tnum"` 使用 tabular numerals。

真正让 Stripe 与众不同的是它的 shadow system。不同于多数网站的 flat 或 single-layer 方式，Stripe 使用 multi-layer、blue-tinted shadows：标志性的 `rgba(50,50,93,0.25)` 与 `rgba(0,0,0,0.1)` 组合，创造出冷静、近乎 atmospheric 的 depth，像元素漂浮在暮色天空中。Primary shadow color（50,50,93）的 blue-gray undertone 直接连接 navy-purple brand palette，让 elevation 本身也有 on-brand 的感觉。

**Key Characteristics:**
- 所有 text 使用 sohne-var + OpenType `"ss01"`；custom stylistic set 定义品牌 letterforms
- Weight 300 作为 signature headline weight；轻盈、自信、反 convention
- Display sizes 使用 negative letter-spacing（56px 时 -1.4px，并随尺寸递减逐步放松）
- 使用 `rgba(50,50,93,0.25)` 的 blue-tinted multi-layer shadows；elevation 带有品牌色感
- 使用 Deep navy（`#061b31`）headings，而不是 black；温暖、premium、financial-grade
- Conservative border-radius（4px-8px）；没有 pill-shaped，也不生硬
- Ruby（`#ea2261`）和 magenta（`#f96bee`）作为 gradient 与 decorative elements 的 accents
- `SourceCodePro` 作为 code 和 technical labels 的 monospace companion

## 2. Color Palette & Roles

### Primary
- **Stripe Purple** (`#533afd`): Primary brand color、CTA backgrounds、link text、interactive highlights。饱和 blue-violet，锚定整个 system。
- **Deep Navy** (`#061b31`): `--hds-color-heading-solid`。Primary heading color。不是 black，也不是 gray，而是非常深的 blue，为文字增加 warmth 和 depth。
- **Pure White** (`#ffffff`): Page background、card surfaces、dark backgrounds 上的 button text。

### Brand & Dark
- **Brand Dark** (`#1c1e54`): `--hds-color-util-brand-900`。Dark sections、footer backgrounds 和 immersive brand moments 使用的 deep indigo。
- **Dark Navy** (`#0d253d`): `--hds-color-core-neutral-975`。最深 neutral，带 blue undertone 的 almost-black，在不刺眼的前提下提供 maximum depth。

### Accent Colors
- **Ruby** (`#ea2261`): `--hds-color-accentColorMode-ruby-icon-solid`。用于 icons、alerts 和 accent elements 的 warm red-pink。
- **Magenta** (`#f96bee`): `--hds-color-accentColorMode-magenta-icon-gradientMiddle`。用于 gradients 和 decorative highlights 的 vivid pink-purple。
- **Magenta Light** (`#ffd7ef`): `--hds-color-util-accent-magenta-100`。用于 magenta-themed cards 和 badges 的 tinted surface。

### Interactive
- **Primary Purple** (`#533afd`): Primary link color、active states、selected elements。
- **Purple Hover** (`#4434d4`): Primary elements hover states 上更深的 purple。
- **Purple Deep** (`#2e2b8c`): `--hds-color-button-ui-iconHover`。Icon hover states 的 dark purple。
- **Purple Light** (`#b9b9f9`): `--hds-color-action-bg-subduedHover`。Subdued hover backgrounds 的 soft lavender。
- **Purple Mid** (`#665efd`): `--hds-color-input-selector-text-range`。Range selector 和 input highlight color。

### Neutral Scale
- **Heading** (`#061b31`): Primary headings、nav text、strong labels。
- **Label** (`#273951`): `--hds-color-input-text-label`。Form labels、secondary headings。
- **Body** (`#64748d`): Secondary text、descriptions、captions。
- **Success Green** (`#15be53`): Status badges、success indicators（backgrounds/borders 使用 0.2-0.4 alpha）。
- **Success Text** (`#108c3d`): Success badge text color。
- **Lemon** (`#9b6829`): `--hds-color-core-lemon-500`。Warning 和 highlight accent。

### Surface & Borders
- **Border Default** (`#e5edf5`): Cards、dividers 和 containers 的 standard border color。
- **Border Purple** (`#b9b9f9`): Buttons 和 inputs 上 active/selected state borders。
- **Border Soft Purple** (`#d6d9fc`): Secondary elements 的 subtle purple-tinted borders。
- **Border Magenta** (`#ffd7ef`): Magenta-themed elements 的 pink-tinted borders。
- **Border Dashed** (`#362baa`): Drop zones 和 placeholder elements 的 dashed borders。

### Shadow Colors
- **Shadow Blue** (`rgba(50,50,93,0.25)`): Signature blue-tinted primary shadow color。
- **Shadow Dark Blue** (`rgba(3,3,39,0.25)`): Elevated elements 的更深 blue shadow。
- **Shadow Black** (`rgba(0,0,0,0.1)`): 用于 depth reinforcement 的 secondary shadow layer。
- **Shadow Ambient** (`rgba(23,23,23,0.08)`): Subtle elevation 的 soft ambient shadow。
- **Shadow Soft** (`rgba(23,23,23,0.06)`): Light lift 的 minimal ambient shadow。

## 3. Typography Rules

### Font Family
- **Primary**: `sohne-var`, with fallback: `SF Pro Display`
- **Monospace**: `SourceCodePro`, with fallback: `SFMono-Regular`
- **OpenType Features**: 所有 sohne-var text 全局启用 `"ss01"`；financial data 和 captions 上的 tabular numbers 使用 `"tnum"`。

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Features | Notes |
|------|------|------|--------|-------------|----------------|----------|-------|
| Display Hero | sohne-var | 56px (3.50rem) | 300 | 1.03 (tight) | -1.4px | ss01 | Maximum size, whisper-weight authority |
| Display Large | sohne-var | 48px (3.00rem) | 300 | 1.15 (tight) | -0.96px | ss01 | Secondary hero headlines |
| Section Heading | sohne-var | 32px (2.00rem) | 300 | 1.10 (tight) | -0.64px | ss01 | Feature section titles |
| Sub-heading Large | sohne-var | 26px (1.63rem) | 300 | 1.12 (tight) | -0.26px | ss01 | Card headings, sub-sections |
| Sub-heading | sohne-var | 22px (1.38rem) | 300 | 1.10 (tight) | -0.22px | ss01 | Smaller section heads |
| Body Large | sohne-var | 18px (1.13rem) | 300 | 1.40 | normal | ss01 | Feature descriptions, intro text |
| Body | sohne-var | 16px (1.00rem) | 300-400 | 1.40 | normal | ss01 | Standard reading text |
| Button | sohne-var | 16px (1.00rem) | 400 | 1.00 (tight) | normal | ss01 | Primary button text |
| Button Small | sohne-var | 14px (0.88rem) | 400 | 1.00 (tight) | normal | ss01 | Secondary/compact buttons |
| Link | sohne-var | 14px (0.88rem) | 400 | 1.00 (tight) | normal | ss01 | Navigation links |
| Caption | sohne-var | 13px (0.81rem) | 400 | normal | normal | ss01 | Small labels, metadata |
| Caption Small | sohne-var | 12px (0.75rem) | 300-400 | 1.33-1.45 | normal | ss01 | Fine print, timestamps |
| Caption Tabular | sohne-var | 12px (0.75rem) | 300-400 | 1.33 | -0.36px | tnum | Financial data, numbers |
| Micro | sohne-var | 10px (0.63rem) | 300 | 1.15 (tight) | 0.1px | ss01 | Tiny labels, axis markers |
| Micro Tabular | sohne-var | 10px (0.63rem) | 300 | 1.15 (tight) | -0.3px | tnum | Chart data, small numbers |
| Nano | sohne-var | 8px (0.50rem) | 300 | 1.07 (tight) | normal | ss01 | Smallest labels |
| Code Body | SourceCodePro | 12px (0.75rem) | 500 | 2.00 (relaxed) | normal | -- | Code blocks, syntax |
| Code Bold | SourceCodePro | 12px (0.75rem) | 700 | 2.00 (relaxed) | normal | -- | Bold code, keywords |
| Code Label | SourceCodePro | 12px (0.75rem) | 500 | 2.00 (relaxed) | normal | uppercase | Technical labels |
| Code Micro | SourceCodePro | 9px (0.56rem) | 500 | 1.00 (tight) | normal | ss01 | Tiny code annotations |

### Principles
- **Light weight as signature**: Display sizes 使用 weight 300，是 Stripe 最 distinctive 的 typographic choice。别人用 600-700 吸引注意时，Stripe 用 lightness 作为 luxury；文字自信到不需要 weight 来获得 authority。
- **ss01 everywhere**: `"ss01"` stylistic set 不可协商。它修改特定 glyphs（可能是 alternate `a`、`g`、`l` forms），让所有 sohne-var text 更 geometric、更 contemporary。
- **Two OpenType modes**: Display/body text 使用 `"ss01"`，financial data 中的 tabular numerals 使用 `"tnum"`。两者永不重叠；paragraph 中的数字用 ss01，data table 中的数字用 tnum。
- **Progressive tracking**: Letter-spacing 随 size 按比例收紧：56px 时 -1.4px、48px 时 -0.96px、32px 时 -0.64px、26px 时 -0.26px，16px 及以下 normal。
- **Two-weight simplicity**: 主要使用 300（body 和 headings）与 400（UI/buttons）。Primary font 不使用 bold（700）；SourceCodePro 用 500/700 提供 code contrast。

## 4. Component Stylings

### Buttons

**Primary Purple**
- Background: `#533afd`
- Text: `#ffffff`
- Padding: 8px 16px
- Radius: 4px
- Font: 16px sohne-var weight 400, `"ss01"`
- Hover: `#4434d4` background
- Use: Primary CTA（"Start now", "Contact sales"）

**Ghost / Outlined**
- Background: transparent
- Text: `#533afd`
- Padding: 8px 16px
- Radius: 4px
- Border: `1px solid #b9b9f9`
- Font: 16px sohne-var weight 400, `"ss01"`
- Hover: background shifts to `rgba(83,58,253,0.05)`
- Use: Secondary actions

**Transparent Info**
- Background: transparent
- Text: `#2874ad`
- Padding: 8px 16px
- Radius: 4px
- Border: `1px solid rgba(43,145,223,0.2)`
- Use: Tertiary/info-level actions

**Neutral Ghost**
- Background: transparent (`rgba(255,255,255,0)`)
- Text: `rgba(16,16,16,0.3)`
- Padding: 8px 16px
- Radius: 4px
- Outline: `1px solid rgb(212,222,233)`
- Use: Disabled or muted actions

### Cards & Containers
- Background: `#ffffff`
- Border: `1px solid #e5edf5`（standard）或 `1px solid #061b31`（dark accent）
- Radius: 4px（tight）、5px（standard）、6px（comfortable）、8px（featured）
- Shadow (standard): `rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px`
- Shadow (ambient): `rgba(23,23,23,0.08) 0px 15px 35px 0px`
- Hover: shadow 增强，通常会加入 blue-tinted layer

### Badges / Tags / Pills
**Neutral Pill**
- Background: `#ffffff`
- Text: `#000000`
- Padding: 0px 6px
- Radius: 4px
- Border: `1px solid #f6f9fc`
- Font: 11px weight 400

**Success Badge**
- Background: `rgba(21,190,83,0.2)`
- Text: `#108c3d`
- Padding: 1px 6px
- Radius: 4px
- Border: `1px solid rgba(21,190,83,0.4)`
- Font: 10px weight 300

### Inputs & Forms
- Border: `1px solid #e5edf5`
- Radius: 4px
- Focus: `1px solid #533afd` 或 purple ring
- Label: `#273951`, 14px sohne-var
- Text: `#061b31`
- Placeholder: `#64748d`

### Navigation
- White 上的 clean horizontal nav，sticky，带 blur backdrop
- Brand logotype left-aligned
- Links: sohne-var 14px weight 400，`#061b31` text with `"ss01"`
- Radius: nav container 上 6px
- CTA: 右侧 purple button（"Sign in", "Start now"）
- Mobile: hamburger toggle，6px radius

### Decorative Elements
**Dashed Borders**
- `1px dashed #362baa`（purple），用于 placeholder/drop zones
- `1px dashed #ffd7ef`（magenta），用于 magenta-themed decorative borders

**Gradient Accents**
- Ruby-to-magenta gradients（`#ea2261` to `#f96bee`）用于 hero decorations
- Brand dark sections 使用 `#1c1e54` backgrounds 和 white text

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1px, 2px, 4px, 6px, 8px, 10px, 11px, 12px, 14px, 16px, 18px, 20px
- Notable: 小尺寸端的 scale 很密（4-12 每 2px 一档），反映 Stripe 面向 financial data 的 precision-oriented UI

### Grid & Container
- Max content width: 约 1080px
- Hero: centered single-column，padding 慷慨，headlines 轻盈
- Feature sections: feature cards 使用 2-3 column grids
- Full-width dark sections 使用 `#1c1e54` background，营造 brand immersion
- Code/dashboard previews 作为 contained cards，并配 blue-tinted shadows

### Whitespace Philosophy
- **Precision spacing**: 不同于 minimalist systems 的巨大空白，Stripe 使用 measured、purposeful whitespace。每个 gap 都是有意的 typographic choice。
- **Dense data, generous chrome**: Financial data displays（tables、charts）紧凑排列，但周围 UI chrome 间距慷慨。这会形成 controlled density，像装在漂亮框架里的 well-organized spreadsheet。
- **Section rhythm**: White sections 与 dark brand sections（`#1c1e54`）交替，形成戏剧性的 light/dark cadence，在不引入任意颜色的情况下避免单调。

### Border Radius Scale
- Micro (1px): Fine-grained elements、subtle rounding
- Standard (4px): Buttons、inputs、badges、cards；workhorse
- Comfortable (5px): Standard card containers
- Relaxed (6px): Navigation、较大的 interactive elements
- Large (8px): Featured cards、hero elements
- Compound: `0px 0px 6px 6px`，用于 bottom-rounded containers（tab panels、dropdown footers）

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Page background, inline text |
| Ambient (Level 1) | `rgba(23,23,23,0.06) 0px 3px 6px` | Subtle card lift, hover hints |
| Standard (Level 2) | `rgba(23,23,23,0.08) 0px 15px 35px` | Standard cards, content panels |
| Elevated (Level 3) | `rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px` | Featured cards, dropdowns, popovers |
| Deep (Level 4) | `rgba(3,3,39,0.25) 0px 14px 21px -14px, rgba(0,0,0,0.1) 0px 8px 17px -8px` | Modals, floating panels |
| Ring (Accessibility) | `2px solid #533afd` outline | Keyboard focus ring |

**Shadow Philosophy**: Stripe 的 shadow system 建立在 chromatic depth 原则上。多数 design systems 使用 neutral gray 或 black shadows，而 Stripe 的 primary shadow color（`rgba(50,50,93,0.25)`）是一种呼应 brand navy palette 的 deep blue-gray。这让 shadows 不只是增加 depth，也增加 brand atmosphere。Multi-layer 方式把这个 blue-tinted shadow 与一个 pure black secondary layer（`rgba(0,0,0,0.1)`）以不同 offset 组合，形成类似 parallax 的 depth：branded shadow 离元素更远，neutral shadow 更近。Negative spread values（-30px、-18px）保证 shadows 不会在水平方向超出 element footprint，让 elevation 保持 vertical 且 controlled。

### Decorative Depth
- Dark brand sections（`#1c1e54`）通过 background color contrast 创造 immersive depth
- Hero decorations 使用 ruby-to-magenta transitions 的 gradient overlays
- Sticky elements 顶部 edge shadows 使用 shadow color `rgba(0,55,112,0.08)`（`--hds-color-shadow-sm-top`）

## 7. Do's and Don'ts

### Do
- 每个 text element 都使用 sohne-var + `"ss01"`；这个 stylistic set 就是 brand
- 所有 headlines 和 body text 使用 weight 300；lightness 是 signature
- 所有 elevated elements 使用 blue-tinted shadows（`rgba(50,50,93,0.25)`）
- Headings 使用 `#061b31`（deep navy），而不是 `#000000`；warmth 很重要
- Border-radius 保持在 4px-8px；conservative rounding 是有意为之
- 任何 tabular/financial number display 都使用 `"tnum"`
- Layer shadows: blue-tinted far + neutral close，形成 depth parallax
- 使用 `#533afd` purple 作为 primary interactive/CTA color

### Don't
- 不要在 sohne-var headlines 上使用 weight 600-700；weight 300 是 brand voice
- 不要在 cards 或 buttons 上使用大 border-radius（12px+、pill shapes）；Stripe 是 conservative
- 不要使用 neutral gray shadows；始终用 blue tint（`rgba(50,50,93,...)`）
- 不要跳过任何 sohne-var text 上的 `"ss01"`；alternate glyphs 定义 personality
- 不要给 headings 使用 pure black（`#000000`）；始终使用 `#061b31` deep navy
- 不要把 warm accent colors（orange、yellow）用于 interactive elements；purple 才是 primary
- 不要在 display sizes 使用 positive letter-spacing；Stripe tracks tight
- 不要把 magenta/ruby accents 用于 buttons 或 links；它们只用于 decorative/gradient

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, reduced heading sizes, stacked cards |
| Tablet | 640-1024px | 2-column grids, moderate padding |
| Desktop | 1024-1280px | Full layout, 3-column feature grids |
| Large Desktop | >1280px | Centered content with generous margins |

### Touch Targets
- Buttons 使用舒适 padding（8px-16px vertical）
- Navigation links 使用 14px，spacing 充足
- Badges 至少 6px horizontal padding，保证 tap targets
- Mobile nav toggle 使用 6px radius button

### Collapsing Strategy
- Hero: 56px display -> mobile 上 32px，保持 weight 300
- Navigation: horizontal links + CTAs -> hamburger toggle
- Feature cards: 3-column -> 2-column -> single column stacked
- Dark brand sections: 保持 full-width treatment，降低 internal padding
- Financial data tables: mobile 上 horizontal scroll
- Section spacing: 64px+ -> mobile 上 40px
- Typography scale compresses: hero sizes 在 breakpoints 间从 56px -> 48px -> 32px

### Image Behavior
- Dashboard/product screenshots 在所有尺寸保持 blue-tinted shadow
- Hero gradient decorations 在 mobile 上简化
- Code blocks 保持 `SourceCodePro` treatment，可 horizontal scroll
- Card images 保持一致 4px-6px border-radius

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: Stripe Purple (`#533afd`)
- CTA Hover: Purple Dark (`#4434d4`)
- Background: Pure White (`#ffffff`)
- Heading text: Deep Navy (`#061b31`)
- Body text: Slate (`#64748d`)
- Label text: Dark Slate (`#273951`)
- Border: Soft Blue (`#e5edf5`)
- Link: Stripe Purple (`#533afd`)
- Dark section: Brand Dark (`#1c1e54`)
- Success: Green (`#15be53`)
- Accent decorative: Ruby (`#ea2261`), Magenta (`#f96bee`)

### Example Component Prompts
- "Create a hero section on white background. Headline at 48px sohne-var weight 300, line-height 1.15, letter-spacing -0.96px, color #061b31, font-feature-settings 'ss01'. Subtitle at 18px weight 300, line-height 1.40, color #64748d. Purple CTA button (#533afd, 4px radius, 8px 16px padding, white text) and ghost button (transparent, 1px solid #b9b9f9, #533afd text, 4px radius)."
- "Design a card: white background, 1px solid #e5edf5 border, 6px radius. Shadow: rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px. Title at 22px sohne-var weight 300, letter-spacing -0.22px, color #061b31, 'ss01'. Body at 16px weight 300, #64748d."
- "Build a success badge: rgba(21,190,83,0.2) background, #108c3d text, 4px radius, 1px 6px padding, 10px sohne-var weight 300, border 1px solid rgba(21,190,83,0.4)."
- "Create navigation: white sticky header with backdrop-filter blur(12px). sohne-var 14px weight 400 for links, #061b31 text, 'ss01'. Purple CTA 'Start now' right-aligned (#533afd bg, white text, 4px radius). Nav container 6px radius."
- "Design a dark brand section: #1c1e54 background, white text. Headline 32px sohne-var weight 300, letter-spacing -0.64px, 'ss01'. Body 16px weight 300, rgba(255,255,255,0.7). Cards inside use rgba(255,255,255,0.1) border with 6px radius."

### Iteration Guide
1. 始终在 sohne-var text 上启用 `font-feature-settings: "ss01"`；这是品牌的 typographic DNA
2. Weight 300 是默认；只有 buttons/links/navigation 使用 400
3. Shadow formula: `rgba(50,50,93,0.25) 0px Y1 B1 -S1, rgba(0,0,0,0.1) 0px Y2 B2 -S2`，其中 Y1/B1 更大（far shadow），Y2/B2 更小（near shadow）
4. Heading color 是 `#061b31`（deep navy），body 是 `#64748d`（slate），labels 是 `#273951`（dark slate）
5. Border-radius 保持在 4px-8px 范围；绝不要使用 pill shapes 或大圆角
6. Tables、charts 或 financial displays 中的任何 numbers 都使用 `"tnum"`
7. Dark sections 使用 `#1c1e54`；不是 black、不是 gray，而是 deep branded indigo
8. SourceCodePro 用于 code，12px/500，2.00 line-height（非常 generous，保证 readability）
