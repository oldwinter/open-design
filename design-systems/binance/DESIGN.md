# Inspired by Binance.US 的 Design System

> Category: Fintech & Crypto
> Crypto exchange。粗粝的 yellow accent、monochrome 基底，以及 trading-floor urgency。

## 1. Visual Theme & Atmosphere

Binance.US 散发出 digital trading floor 的精炼紧迫感：一个资金流动、决策在数秒内发生的空间。设计采用 two-tone composition，在 stark white trading surfaces 与 deep near-black panels（`#222126`）之间交替，创造出一种视觉节奏，呼应 crypto markets 的 bull-and-bear duality。Binance Yellow（`#F0B90B`）像钢桌上的金锭一样切入这套 monochrome foundation：明确、自信，并被设计成把所有视线导向下一步行动。

界面说的是 fintech trust 的语言。Custom BinancePlex typography 为每一个 headline 和 data point 带来 proprietary gravitas，而充足 whitespace 与克制装饰让焦点始终停留在 numbers、charts 和 call-to-action buttons 上。设计为了 operational clarity 而避免视觉复杂度：每个元素都必须用于告知或转化。Mobile trading app 的产品截图占据中部 sections，在 golden gradients 上以 floating device mockups 呈现，强化这是一个可以随身携带的平台。

Binance.US 的独特性来自 warmth 与 precision 之间的张力。金黄色品牌色温暖、乐观，甚至带一点庆典感，却生活在 cold、clinical grey text 与 razor-sharp borders 构成的系统中。它不是 Robinhood 那样 playful fintech，也不是 Fidelity 那样 corporate fortress；它是 crypto-native platform，用 established finance 的视觉语言包裹 cutting-edge trading technology。

**Key Characteristics:**
- Two-tone light/dark section alternation：white surfaces 表示 trust，dark panels 表示 depth
- Binance Yellow（`#F0B90B`）作为唯一 accent color，驱动所有 primary actions
- BinancePlex custom typeface 在每个 text level 提供 proprietary brand identity
- Pill-shaped CTA buttons（50px radius），强烈吸引注意
- Golden gradients 上的 floating device mockups，用于 product showcasing
- Crypto price tickers prominently displayed，展示 real-time data
- Shadow-light elevation，card shadows 使用 subtle 5% opacity

## 2. Color Palette & Roles

### Primary

- **Binance Yellow** (`#F0B90B`): signature color；primary CTA backgrounds、brand accent、active states、link color。系统中最重要的单一颜色。
- **Binance Gold** (`#FFD000`): 更浅的 gold variant，用于 pill button borders、secondary CTA fills 和 golden gradient highlights。
- **Light Gold** (`#F8D12F`): 用于 gradient endpoints 和 hover-adjacent states 的 soft gold。

### Secondary & Accent

- **Active Yellow** (`#D0980B`): 用于 active/pressed button states 的 darkened yellow，也就是“clicked” gold。
- **Focus Blue** (`#1EAEDB`): Accessibility focus state；所有 interactive elements 在 hover 和 focus 时出现。

### Surface & Background

- **Pure White** (`#FFFFFF`): Primary page canvas、card surfaces、light section backgrounds。
- **Snow** (`#F5F5F5`): subtle surface differentiation、input backgrounds、alternating row fills。
- **Binance Dark** (`#222126`): Dark section backgrounds、footer canvas、“Trusted by millions” panel；带轻微 purple undertone 的 near-black。
- **Dark Card** (`#2B2F36`): Dark sections 中的 card surfaces 和 elevated dark containers。
- **Ink** (`#1E2026`): Yellow backgrounds 上的 button text，以及 light surfaces 上最深的 text color。

### Neutrals & Text

- **Primary Text** (`#1E2026`): Light backgrounds 上的 main body text 和 headings；带轻微暖意的 near-black。
- **Secondary Text** (`#32313A`): Navigation links、light surfaces 上的 descriptive copy。
- **Slate** (`#848E9C`): Tertiary text、metadata、timestamps、footer links；系统里的主力 grey。
- **Steel** (`#686A6C`): Disabled-adjacent text、subtle labels。
- **Muted** (`#777E90`): Secondary navigation links 和不那么突出的 footer text。
- **Hover Dark** (`#1A1A1A`): Universal link hover color；hover 时文字变深。

### Semantic & Accent

- **Crypto Green** (`#0ECB81`): Positive price movement、success states、“up” indicators。
- **Crypto Red** (`#F6465D`): Negative price movement、error states、“down” indicators。
- **Border Light** (`#E6E8EA`): Light backgrounds 上的 standard card 和 section borders。
- **Border Gold** (`#FFD000`): Active/selected state borders、pill button outlines。

### Gradient System

- **Golden Glow**: 从 `#F0B90B` center 到 `#F8D12F` edge 的 radial gradient；用于 product mockup screenshots 背后。
- **Dark Fade**: 从 `#222126` 到 transparent 的 linear gradient；用于 dark section transitions。
- **Hero Shimmer**: Hero section accents 上 subtle animated gold gradient。

## 3. Typography Rules

### Font Family

**Primary:** BinancePlex（Binance 设计的 custom proprietary typeface）
- Fallbacks: Arial, sans-serif
- 取代 DIN Next，用于解决 multi-language spacing issues
- Available in weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

**System:** 用于 cookie banners 和 third-party UI 的 system-ui stack
- Fallbacks: Segoe UI, Roboto, Helvetica, Arial

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Display Hero | 60px | 700 | 1.08 | — | Hero headlines, maximum impact |
| Display Secondary | 34px | 700 | 1.00 | — | Section titles on dark backgrounds |
| Heading 1 | 28px | 500 | 1.00 | — | Major section headings |
| Heading 2 | 24px | 700 | 1.00 | — | Feature headings, card titles |
| Heading 3 | 24px | 600 | 1.00 | — | Subsection headings |
| Heading 4 | 20px | 600 | 1.25 | — | Card headings, feature labels |
| Body Large | 20px | 500 | 1.50 | — | Hero subtitle, lead paragraphs |
| Body | 16px | 500 | 1.50 | — | Standard body text |
| Body SemiBold | 16px | 600 | 1.30 | — | Emphasized body, nav links |
| Body Bold | 16px | 700 | 1.50 | — | Strong emphasis text |
| Button | 16px | 600 | 1.25 | 0.16px | Primary button text |
| Button Small | 14.4px | 600 | 1.60 | 0.72px | Secondary buttons, wider tracking |
| Caption | 14px | 500 | 1.43 | — | Metadata, labels, prices |
| Caption SemiBold | 14px | 600 | 1.50 | — | Emphasized captions |
| Small | 12px | 600 | 1.00 | — | Tags, badges, fine print |
| Tiny | 11px | 500 | 1.00 | — | Micro-labels, chart annotations |

### Principles

BinancePlex 面向 data-dense interfaces 而设计，在这些界面里 numbers 与 text 必须在多种尺度上共存。Typeface 默认带 tabular numerals，这对 price columns 和 portfolio values 至关重要，因为它们需要完美 vertical alignment。Weights 偏重（500-700），让界面拥有 financial platform 所必需的 authority 和 confidence。Headings 上 tight line-heights（1.00-1.25）创造出 stacked、compressed feel，呼应 trading dashboards 的密度；body text 则放松到 1.50，方便阅读 educational 与 marketing content。

## 4. Component Stylings

### Buttons

**Primary (Yellow Fill)**
- Background: Binance Yellow (`#F0B90B`)
- Text: Ink (`#1E2026`), 16px/600, BinancePlex
- Border: none
- Border radius: slightly rounded (6px)
- Padding: 6px 32px
- Hover: 切换到 Focus Blue (`#1EAEDB`) 并使用 white text
- Active: 变深为 Active Yellow (`#D0980B`)
- Focus: Focus Blue (`#1EAEDB`) bg, 1px black border, 2px black outline, opacity 0.9
- Transition: background 200ms ease

**Primary Pill (Gold)**
- Background: Binance Gold (`#FFD000`)
- Text: White (`#FFFFFF`)
- Border: 1px solid `#FFD000`
- Border radius: full pill (50px)
- Padding: 10px horizontal
- Shadow: `rgb(153,153,153) 0px 2px 10px -3px`
- Hover: 切换到 Focus Blue (`#1EAEDB`) 并使用 white text

**Secondary (White Outlined)**
- Background: White (`#FFFFFF`)
- Text: Binance Yellow (`#F0B90B`)
- Border: 1px solid `#F0B90B`
- Border radius: full pill (50px)
- Padding: 10px horizontal
- Shadow: `rgb(153,153,153) 0px 2px 10px -3px`
- Hover: 切换到 Focus Blue bg，white text

**Disabled**
- Background: `#E6E8EA`
- Text: `#848E9C`
- Cursor: not-allowed

### Cards & Containers

- Background: Light sections 上为 White (`#FFFFFF`)，dark sections 上为 Dark Card (`#2B2F36`)
- Border: light cards 使用 1px solid `#E6E8EA`
- Border radius: content cards 使用 medium rounded (12px)，data cards 使用 tight (8px)
- Shadow: `rgba(32, 32, 37, 0.05) 0px 3px 5px 0px`，几乎不可见，用于建立 trust
- Hover: shadow 增强为 `rgba(8, 8, 8, 0.05) 0px 3px 5px 5px`
- Transition: box-shadow 200ms ease

### Inputs & Forms

- Background: White (`#FFFFFF`) 或 Snow (`#F5F5F5`)
- Text: Ink (`#1E2026`)
- Border: 1px solid `#E6E8EA`
- Border radius: 8px
- Padding: 0px 12px（为 trading context 保持 compact）
- Focus: border 切换到 black (`#000000`)，1px outline
- Placeholder: Slate (`#848E9C`)
- Transition: border-color 200ms ease

### Navigation

- Background: White (`#FFFFFF`), sticky
- Height: ~64px
- Left: Binance logo（SVG，yellow mark + dark wordmark）
- Center/Right: navigation links 使用 14px/600 BinancePlex，color `#32313A`
- CTA: nav right 中的 Yellow pill button “Get Started”
- Hover: links 加深到 `#1A1A1A`
- Mobile: hamburger menu, full-height overlay
- Top: optional promotional banner bar

### Image Treatment

- Product mockups: device frames 放在 golden gradient backgrounds 上，floating with subtle shadow
- Hero images: full-width，放在带 rounded corners（24px）的 card-like areas 内
- Video sections: 24px radius，带 embedded player controls
- App screenshots: dark-themed trading UI，置于 phone/tablet bezels 内
- Crypto icons: 48px circular，使用 brand colors

### Trust Indicators

- Real-time crypto price ticker（BTC、BNB、SOL，带 green/red price change）
- Dark background 上的 “Trusted by millions” statistics section
- Security badges 与 regulatory compliance mentions
- Footer 中的 QR code，便于 direct app download

## 5. Layout Principles

### Spacing System

Base unit: 8px

| Token | Value | Use |
|-------|-------|-----|
| space-1 | 4px | Tight inline gaps, icon padding |
| space-2 | 8px | Base unit, button icon gaps, tight margins |
| space-3 | 12px | Card internal padding, input padding |
| space-4 | 16px | Standard padding, section margins |
| space-5 | 20px | Card gaps, medium padding |
| space-6 | 24px | Section internal padding |
| space-7 | 32px | Section breaks, large padding |
| space-8 | 48px | Major section padding |
| space-9 | 64px | Hero section padding |
| space-10 | 80px | Large section spacing |

### Grid & Container

- Max container width: 1200px (centered)
- Hero area: 1024px 以上为 single column with side-by-side text + image
- Feature grid: desktop 3-column，mobile single column
- Product showcase: 2-column（text + device mockup）
- Horizontal padding: desktop 32px，mobile 16px
- Grid gap: feature cards 之间 24px

### Whitespace Philosophy

Binance.US 把 whitespace 当作 trust signal。Hero section 周围和 content blocks 之间的 generous padding 创造出 spaciousness，抵消 crypto exchanges 常见的信息密度。Light sections 会呼吸：headlines 周围有宽阔 margins，cards 之间有充足 spacing；dark sections 则压缩，把 features 装入更紧的 grids，以传达 capability 和 depth。整体节奏在 “inviting entry”（light, spacious）与 “deep functionality”（dark, dense）之间交替。

### Border Radius Scale

| Value | Context |
|-------|---------|
| 1px | Subtle edge softening, fine UI elements |
| 2px | Close buttons, micro-interactive elements |
| 6px | Primary buttons (non-pill), small cards |
| 8px | Form inputs, data cards, image containers |
| 10px | Navigation pills, tag containers |
| 12px | Content cards, feature containers |
| 24px | Video containers, hero imagery, large cards |
| 50px | Pill buttons (CTA), search inputs, full-round elements |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, solid background | Default for inline elements |
| Subtle | `rgba(32, 32, 37, 0.05) 0px 3px 5px` | Content cards, resting state |
| Medium | `rgba(8, 8, 8, 0.05) 0px 3px 5px 5px` | Hovered cards, elevated containers |
| Pill Shadow | `rgb(153,153,153) 0px 2px 10px -3px` | Pill CTA buttons, floating actions |
| Heavy | `rgba(0,0,0) 0px 32px 37px` | Modal overlays, dropdown menus |

Binance.US 使用 whisper-light shadow system。Card shadows 在 5% opacity 下几乎不可察觉；它们存在不是为了 dramatic depth，而是作为 subtle ground cues，避免 cards 像被贴在 surface 上。Pill button shadow 是例外：略微更明显，让 CTAs 有一种邀请点击的 “floating” quality。其哲学很务实：在 financial context 中，heavy shadows 显得轻浮；完全没有 shadows 又显得平面且不够可信。5% 的 sweet spot 传达 professionalism。

### Decorative Depth

- **Golden gradient backgrounds**: Device mockup sections 背后，以 product 为中心的 radial golden glow
- **Dark-to-light section transitions**: White 与 `#222126` sections 之间 hard cut（无 gradient blend）
- **Price ticker strip**: Flat、borderless，读起来像 data bar，而不是 decorative element

## 7. Do's and Don'ts

### Do

- 只把 Binance Yellow (`#F0B90B`) 用于 primary CTAs 和 brand accents；它是唯一色彩焦点
- 保持 light 与 dark sections 严格交替，形成 visual rhythm
- 所有 interactive elements 使用 weight 500+ 的 BinancePlex；这是 confidence-forward design
- 所有 primary CTA pill buttons 使用 50px radius；这是 signature interactive shape
- Content cards 保持 12px radius，精致但不过度圆润
- 突出展示 real-time data（prices、percentages、stats）；numbers build trust
- 所有 secondary/metadata text 使用 Slate (`#848E9C`)；这是 universal quiet voice
- Shadows 保持 5% opacity 或更低；几乎不可见但仍存在

### Don't

- 不要引入额外 brand colors；Binance Yellow 是唯一 accent，其他颜色都应 data-driven（green up、red down）
- Content cards 上不要使用超过 12px 的 rounded corners；只有 CTAs 和 video containers 可以更高
- 不要添加 heavy shadows 或 hover lift effects；这是 restrained financial platform
- Headings 不要使用低于 weight 500 的 BinancePlex；lighter weights 会削弱 authority
- 不要把 yellow text 放在 yellow backgrounds 上；始终确保 high contrast pairing
- 同一行里不要混用 pill（50px）和 square（6px）button styles
- 不要柔化 dark sections；`#222126` 应该感觉 authoritative，而不是 grey
- 不要使用 decorative illustrations；imagery 应该是 product screenshots 或 data visualizations
- 不要添加超过 subtle transitions（200ms ease）的 animation；financial platforms 需要 stability
- Cards 中的 semantic states 不要使用 colored backgrounds；cards 保持 white 或 dark，用 text color 表达 semantic meaning

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <425px | Single column, stacked hero, hamburger nav, 16px padding |
| Small Mobile | 425-599px | Wider mobile layout, price ticker wraps |
| Tablet Small | 600-768px | 2-column feature grid begins |
| Tablet | 769-896px | Hero side-by-side layout begins |
| Desktop Small | 897-1024px | Full nav expands, 3-column features |
| Desktop | 1024-1280px | Full layout, max content width |
| Large Desktop | 1280-1440px | Increased margins, centered container |
| XL Desktop | >1440px | Max-width container (1200px) with expanded margins |

### Touch Targets

- Minimum touch target: 44x44px (WCAG AAA)
- Pill CTA buttons: 48px height minimum
- Nav links: 44px touch area
- Crypto ticker items: mobile 上为 full-width tappable rows
- App download buttons: large tap zones（50px+）

### Collapsing Strategy

- **Navigation**: 897px 以下从 full horizontal links → hamburger menu；logo 和 “Get Started” CTA 保持可见
- **Hero section**: 768px 时从 side-by-side（text left, image right）→ stacked（text top, image below）
- **Feature grid**: 768px 时 3-col → 2-col；600px 时 → 1-col
- **Price ticker**: 600px 时从 horizontal row → wrapping 或 scrollable
- **Section padding**: 随 viewport 变窄从 64px → 48px → 32px → 16px
- **Device mockups**: 按比例缩小，保持 centered positioning
- **Footer**: Multi-column → mobile 上的 stacked accordion sections

### Image Behavior

- Device mockups: 使用 CSS 按 max-width constraints 缩放，保持 aspect ratio
- Hero imagery: 包含在 rounded containers（24px）内，按比例缩放
- App screenshots: responsive width with fixed aspect ratio
- QR code: 固定 120px square，mobile 上隐藏（替换为 direct app store links）

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA: Binance Yellow (`#F0B90B`)
- Secondary CTA: Binance Gold (`#FFD000`)
- Background Light: Pure White (`#FFFFFF`)
- Background Dark: Binance Dark (`#222126`)
- Heading text: Ink (`#1E2026`)
- Body text: Slate (`#848E9C`)
- Border: Border Light (`#E6E8EA`)
- Positive: Crypto Green (`#0ECB81`)
- Negative: Crypto Red (`#F6465D`)

### Example Component Prompts

- "Create a hero section with white background, a 60px/700 bold headline in Ink (#1E2026), a 20px/500 subtitle in Slate (#848E9C), and a Binance Yellow (#F0B90B) pill button (50px radius) with dark text (#1E2026)"
- "Design a crypto price ticker strip showing BTC, BNB, SOL prices in 14px/600 Ink (#1E2026) with green (#0ECB81) or red (#F6465D) percentage changes, on a white background with #E6E8EA bottom border"
- "Build a feature card grid (3-column, 24px gap) with 12px radius white cards, subtle shadow (rgba(32,32,37,0.05) 0px 3px 5px), each containing a yellow (#F0B90B) icon, 20px/600 heading, and 14px/500 #848E9C description"
- "Create a dark section (#222126) with a 34px/700 white headline centered, and a 3-column feature grid using dark cards (#2B2F36) with 12px radius and yellow (#F0B90B) accent icons"
- "Design a sticky navigation bar with white background, Binance logo left, 14px/600 #32313A nav links center, and a yellow (#F0B90B) pill button (50px radius, 6px padding 32px) labeled 'Get Started' right"

### Iteration Guide

使用此 design system 细化已生成 screens 时：
1. 一次只聚焦一个 component
2. 引用本文档中的 specific color names 和 hex codes
3. 记住：Binance Yellow (#F0B90B) 是唯一 accent color；其他一切都是 grey/dark/white
4. 使用 dark/light section alternation 控制 visual pacing
5. Numbers 和 data 应该 prominent；这是 financial platform
6. CTAs 使用 pill buttons（50px radius），form actions 使用 regular buttons（6px radius）
7. Shadows 保持几乎不可见（5% opacity）；trust 来自 clarity，而不是 depth
8. 任何需要显得 authoritative 的 text 都使用 600+ weight 的 BinancePlex
