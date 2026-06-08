# Inspired by Nike 的 Design System

> Category: E-Commerce & Retail
> Athletic retail。Monochrome UI、massive uppercase type、full-bleed photography。

## 1. Visual Theme & Atmosphere

Nike.com 是一座 kinetic retail cathedral：把运动的爆发性能量导入 digital shopping experience 的网站。设计运行在 radical simplicity 原则上：把一切退回 black、white 和 grey，让 athletic photography 与 product color 在没有竞争的情况下成为主角。结果不像普通网站，更像一本以 luxury magazine 精度排版的 sports editorial。每一寸屏幕空间要么在销售产品，要么在推动用户走向产品。

"Podium CDS"（Nike 内部的 Core Design System）建立了 aggressively monochromatic foundation。UI 消隐在 black（`#111111`）text 与 white surfaces 中，让 hero photography 中的 sweating athletes、mid-air shoes、stadium energy 承载情绪重量。当 UI 中出现 color 时，它几乎总是功能性的：red 表示 errors，blue 表示 links，green 表示 success。产品本身就是 color story。这种克制造成一种视觉悖论：互联网上最 colorful 的页面反而显得最 minimal，因为所有 vibrancy 都来自 merchandise，而不是 interface。

Typography system 是 Nike visual identity 的另一半。Nike Futura ND 中 massive uppercase headlines，这是一款 custom condensed Futura variant，带几乎不可思议的 tight line-height（0.90），像 typographic shockwave 一样穿透 hero imagery。Headlines 下方，workhorse Helvetica Now family 以 Swiss-precision clarity 处理从 navigation 到 product descriptions 的所有内容。这种 expressive display type 与 functional body type 的分工，映射了 Nike 的 brand duality：inspiration meets execution。

**Key Characteristics:**
- Monochromatic UI（black/white/grey），让 product photography 成为唯一 color source
- Massive uppercase display typography（96px，line-height 0.90），能穿透 hero images
- Full-bleed photography，无 border radius；imagery 填满所有可用边缘
- Pill-shaped buttons（30px radius）作为 primary interactive element
- 8px spacing grid 带 athletic discipline；每个 measurement 都贴合系统
- Category-driven shopping architecture，使用大型 navigational image cards
- Shadow-free、border-minimal elevation model；只通过 grey shifts 做 surface differentiation

## 2. Color Palette & Roles

### Primary

- **Nike Black** (`#111111`): foundation；primary text、button backgrounds、nav text、hero overlays。刻意不用 pure black（#000000），创造略微柔和的阅读体验。
- **Nike White** (`#FFFFFF`): Primary page canvas、dark 上的 button text、card surfaces、nav bar background。

### Surface & Background

- **Snow** (`#FAFAFA`): 最浅 surface，near-white subtle differentiation（--podium-cds-color-grey-50）。
- **Light Gray** (`#F5F5F5`): Secondary background、search input fill、image placeholder、loading skeleton（--podium-cds-color-grey-100）。
- **Hover Gray** (`#E5E5E5`): Hover state background、disabled button fill（--podium-cds-color-grey-200）。
- **Dark Surface** (`#28282A`): Dark/inverted sections 上的 primary background（--podium-cds-color-grey-800）。
- **Deep Charcoal** (`#1F1F21`): Inverse primary background，最深的 non-black surface（--podium-cds-color-grey-900）。
- **Dark Hover** (`#39393B`): Dark backgrounds 上的 hover state（--podium-cds-color-grey-700）。

### Neutrals & Text

- **Primary Text** (`#111111`): Main body text、headings、nav links（--podium-cds-color-text-primary）。
- **Secondary Text** (`#707072`): Descriptive copy、metadata、timestamps、price labels（--podium-cds-color-text-secondary）。
- **Disabled Text** (`#9E9EA0`): Inactive elements、unavailable options（--podium-cds-color-text-disabled）。
- **Disabled Inverse** (`#4B4B4D`): Dark backgrounds 上的 disabled text（--podium-cds-color-text-disabled-inverse）。
- **Border Primary** (`#707072`): Standard border color，与 secondary text 匹配。
- **Border Secondary** (`#CACACB`): Subtle borders、input borders、divider lines（--podium-cds-color-grey-300）。
- **Border Disabled** (`#CACACB`): Inactive border state。
- **Border Active** (`#111111`): Active/focused border，与 primary text 匹配。

### Semantic & Accent

- **Nike Red** (`#D30005`): Critical errors、sale badges、urgent notifications（--podium-cds-color-red-600）。
- **Bright Red** (`#EE0005`): Red-500，稍浅的 red，用于 emphasis。
- **Nike Orange Badge** (`#D33918`): Badge text、promotional callouts（--podium-cds-color-text-badge）。
- **Orange Flash** (`#FF5000`): Expressive orange accent（--podium-cds-color-orange-400）。
- **Success Green** (`#007D48`): Confirmation、availability、positive states（--podium-cds-color-green-600）。
- **Success Inverse** (`#1EAA52`): Dark backgrounds 上的 success（--podium-cds-color-green-500）。
- **Link Blue** (`#1151FF`): Text links、informational highlights（--podium-cds-color-blue-500）。
- **Info Inverse** (`#1190FF`): Dark backgrounds 上的 links（--podium-cds-color-blue-400）。
- **Warning Yellow** (`#FEDF35`): Warning backgrounds、attention banners（--podium-cds-color-yellow-200）。
- **Focus Ring** (`rgba(39, 93, 197, 1)`): Keyboard focus indicator ring。

### Extended Color Spectrum (Podium CDS)

每条 color ramp 都覆盖 50-900，用于 campaigns 和 product pages 中的 expressive use：

- **Red**: `#FFE5E5` → `#EE0005` → `#530300`
- **Orange**: `#FFE2D6` → `#FF5000` → `#3E1009`
- **Yellow**: `#FEF087` → `#FCA600` → `#99470A`
- **Green**: `#DFFFB9` → `#1EAA52` → `#003C2A`
- **Teal**: `#D4FFFB` → `#008E98` → `#043441`
- **Blue**: `#D6EEFF` → `#1151FF` → `#020664`
- **Purple**: `#E4E1FC` → `#6E0FF6` → `#1C0060`
- **Pink**: `#FFE1F3` → `#ED1AA0` → `#4C012D`

### Gradient System

Nike 避免 UI gradients。当 gradients 出现时，它们是 photographic 的，用在 product hero backgrounds 上（例如 red shoe on a red-to-deeper-red gradient）。Design system 本身只使用 flat-color。

## 3. Typography Rules

### Font Family

**Display:** Nike Futura ND（Nike 专属 custom condensed Futura variant）
- Fallbacks: Helvetica Now Text Medium, Helvetica, Arial
- 只用于 large uppercase display headlines
- 特征是 tight line-height（0.90）和 uppercase transform

**Heading:** Helvetica Now Display Medium
- Fallbacks: Helvetica, Arial
- 用于 24-32px 的 section headings 和 product titles

**Body Medium:** Helvetica Now Text Medium（weight 500）
- Fallbacks: Helvetica, Arial
- 用于 links、buttons、captions、emphasized body text

**Body:** Helvetica Now Text（weight 400）
- Fallbacks: Helvetica, Arial
- 用于 standard body copy、descriptions、metadata

**Arabic:** Neue Frutiger Arabic；locale-specific alternative

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Display | 96px | 500 | 0.90 | — | Nike Futura ND, uppercase, hero headlines |
| Heading 1 | 32px | 500 | 1.20 | — | Helvetica Now Display Medium, section titles |
| Heading 2 | 24px | 500 | 1.20 | — | Helvetica Now Display Medium, subsections |
| Heading 3 | 16px | 500 | 1.50 | — | Helvetica Now Text Medium, card titles |
| Body | 16px | 400 | 1.75 | — | Helvetica Now Text, product descriptions |
| Body Medium | 16px | 500 | 1.75 | — | Helvetica Now Text Medium, emphasized text |
| Link | 16px | 500 | 1.75 | — | Helvetica Now Text Medium, navigation links |
| Link Small | 14px | 500 | 1.86 | — | Helvetica Now Text Medium, footer/utility links |
| Button | 16px | 500 | 1.50 | — | Helvetica Now Text Medium, CTA text |
| Button Small | 14px | 500 | 1.50 | — | Helvetica Now Text Medium, secondary buttons |
| Caption | 14px | 500 | 1.50 | — | Helvetica Now Text Medium, price labels |
| Small | 12px | 500 | 1.50 | — | Helvetica Now Text Medium, timestamps |
| Tiny | 12px | 400 | 1.50 | — | Helvetica Now Text, legal text |

### Principles

Nike 的 typography 是一套 tension study。Display layer 中，96px、0.90 line-height 的 Nike Futura ND 被设计得像 stadium scoreboard：massive、condensed、uppercase，让人无法忽视。它把 headlines 变成 battle cries。在 display layer 下方，Helvetica Now 提供 clinical counterpoint：Swiss-precision legibility 加 generous 1.75 line-height，让 product browsing 更舒适。Weight 500（Medium）贯穿 body text，让 Nike 的 prose 带轻微 assertiveness，却没有 bold 的沉重感；每句话都像 confident recommendation，而不是 shout。

## 4. Component Stylings

### Buttons

**Primary**
- Background: Nike Black (`#111111`)
- Text: White (`#FFFFFF`), 16px/500, Helvetica Now Text Medium
- Border: none
- Border radius: fully rounded pill (30px)
- Padding: ~12px 24px
- Hover: background 切换到 Grey-500 (`#707072`)，text hover color
- Active: scale(0) ripple effect with opacity 0.5
- Focus: 2px box-shadow ring in `rgba(39, 93, 197, 1)`
- Transition: background 200ms ease

**Primary on Dark**
- Background: White (`#FFFFFF`)
- Text: Black (`#111111`)
- Hover: background 切换到 Grey-300 (`#CACACB`)

**Secondary (Outlined)**
- Background: transparent
- Text: Nike Black (`#111111`)
- Border: 1.5px solid `#CACACB` (grey-300)
- Border radius: 30px
- Hover: border 加深到 `#707072`，background 到 grey-200

**Disabled**
- Background: Grey-200 (`#E5E5E5`)
- Text: Grey-400 (`#9E9EA0`)
- Cursor: not-allowed

**Icon Button**
- Background: Grey-100 (`#F5F5F5`)
- Shape: 30px radius（或 50% circular）
- Padding: 6px
- Hover: Grey-500 background

### Cards & Containers

- Background: White (`#FFFFFF`)；大多数情况下没有 visible card boundary
- Border radius: product image cards 为 0px（edge-to-edge imagery），interactive containers 为 20px
- Shadow: none；Nike 完全不使用 card shadows
- Hover: product cards 没有 lift effect；cards 内 text links 使用 underline
- Product cards: image on top（no radius），下方 text metadata，间距 12px
- Category cards: full-bleed photography，叠加 text overlay on dark gradient
- Transition: hover image swap 使用 opacity 200ms ease

### Inputs & Forms

- Background: Grey-100 (`#F5F5F5`)
- Border: 可见时为 1px solid `#CACACB`，search 中可以 borderless
- Border radius: search inputs 为 24px，form inputs 为 8px
- Font: Helvetica Now Text, 16px
- Focus: border 切换到 `#111111`（border-active），2px focus ring in `rgba(39, 93, 197, 1)`
- Error: border `#D30005` (critical)
- Placeholder: Grey-500 (`#707072`)
- Transition: border-color 200ms ease

### Navigation

- Background: White (`#FFFFFF`), sticky
- Height: desktop 约 60px
- Left: Nike Swoosh logo（24x24px SVG）
- Center: Category links（New & Featured、Men、Women、Kids、Sale），16px/500 Helvetica Now Text Medium
- Right: Search（24px radius input）、Favorites、Cart icons
- Hover: text color 切换到 Grey-500 (`#707072`)
- Mobile: hamburger menu, full-screen overlay
- Top banner: dark background（#111111）和 white text 的 promotional message bar

### Image Treatment

- Hero images: full-bleed、no border radius、edge-to-edge
- Product grid: square（1:1）或 4:3 aspect ratio，无 border radius
- Category cards: 16:9 或 4:3，full-bleed with text overlay
- Image placeholder: Grey-100 (`#F5F5F5`) solid background
- Lazy loading: native loading="lazy"，skeleton uses #F5F5F5 bg
- Product hover: secondary image swap（front → side view）

### Promotional Banners

- Full-width dark (`#111111`) background with white text
- Tight padding（8-12px vertical）
- Centered text，12px/500 Helvetica Now Text Medium
- 用于 shipping promotions、member benefits、sale announcements

## 5. Layout Principles

### Spacing System

Base unit: 4px（primary grid 是 8px multiples）

| Token | Value | Use |
|-------|-------|-----|
| space-1 | 4px | Tight icon gaps, inline spacing |
| space-2 | 8px | Base unit, button icon gaps |
| space-3 | 12px | Card internal padding, tight margins |
| space-4 | 16px | Standard padding, nav spacing |
| space-5 | 20px | Product card gaps |
| space-6 | 24px | Section internal padding, grid gaps |
| space-7 | 32px | Section breaks |
| space-8 | 48px | Major section padding |
| space-9 | 64px | Hero section padding |
| space-10 | 80px | Large section spacing |

### Grid & Container

- Max container width: 1920px
- Standard content width: ~1440px with horizontal padding
- Product grid: desktop 3-column，tablet 2-column，mobile 1-column
- Category grid: 3-column with full-bleed images
- Grid gap: product cards 之间 4-12px（刻意 tight）
- Horizontal padding: desktop 48px，tablet 24px，mobile 16px

### Whitespace Philosophy

Nike 的 whitespace strategy 刻意 aggressive；不是 fashion brand 那种奢侈、呼吸感强的方式，而是 compressed、high-density，把每个 pixel 都填入 content 或 intentional absence。Product grids 使用 minimal gaps（4-12px）创造 abundance 和 choice 的感觉。Section breaks 则 generous（48-80px），用来分隔 shopping contexts。整体效果像一家 well-organized athletic superstore：产品很满，但仍然 navigable。

### Border Radius Scale

| Value | Context |
|-------|---------|
| 0px | Product images, hero photography (sharp edges) |
| 8px | Form inputs (non-search) |
| 18px | Small interactive elements |
| 20px | Containers, cards with UI content |
| 24px | Search inputs, medium pills |
| 30px | Buttons, tags, filters (full pill) |
| 50% | Circular icon buttons, avatar placeholders |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, no border | Default state for everything |
| Divider | `0px -1px 0px 0px #E5E5E5 inset` | Subtle inset line between sections |
| Focus | `0 0 0 2px rgba(39, 93, 197, 1)` | Keyboard focus ring |
| Overlay | Dark scrim over photography | Text-on-image legibility |

Nike 的 elevation philosophy 极度 flat。没有 card shadows、没有 hover lifts、没有 floating elements。Depth 完全通过 color 传达：dark sections 后退，light sections 前进，grey shifts 表示 state changes。这种 flatness 强化 athletic、no-nonsense 的 brand personality：没有 visual frills，只有直接沟通。整个系统中唯一的 “shadow” 是 1px inset divider line 和 accessibility-required focus ring。

### Decorative Depth

- **Hero photography overlays**: Full-bleed photography 上的 dark gradient scrims，用于 text readability
- **Product background gradients**: Hero product shots 背后的 colored backgrounds（例如 red shoe on red gradient）
- **Banner bars**: Page top 的 solid dark（#111111）promotional strips

## 7. Do's and Don'ts

### Do

- 所有 primary text 使用 Nike Black (#111111)；不要用 pure #000000
- Buttons 保持 pill-shaped（30px radius），并限制为 primary/secondary variants
- Hero sections 使用 full-bleed、edge-to-edge photography；images 不要 border radius
- 让 product photography 提供所有 color vibrancy；UI 保持 monochromatic
- Uppercase Nike Futura ND 只用于 display headlines（96px+）
- Product grid gaps 保持 tight（4-12px），制造 dense、abundant feel
- 所有 input 和 placeholder backgrounds 使用 Grey-100 (#F5F5F5)
- Color 只保留给 semantic meaning（red=error、green=success、blue=link）
- 所有 interactive text elements 使用 weight 500（Medium）

### Don't

- 不要给 cards 添加 shadows；Nike 的 elevation model 完全 flat
- Product imagery 不要使用 border radius；只有 UI elements 才有 rounded corners
- UI elements 不要引入 grey scale 之外的 brand colors
- Nike Futura ND 不要用于 24px 以下；它只属于 display face
- 不要添加 hover lift effects；Nike cards 不在 hover 时做动画 lift
- Buttons 或 links 不要使用 regular weight（400）；始终使用 500
- UI elements 背后不要放 colored backgrounds；color 只保留给 product contexts
- 每张 card 不要使用超过两个 text hierarchy levels（title + body）
- 不要添加 decorative dividers；1px inset 是唯一 divider pattern
- 不要柔化 contrast；Nike design 有意把 black-on-white 推到 maximum

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, hamburger nav, display text scales down, tight 16px padding |
| Small Tablet | 640-768px | 2-column product grid begins, nav still collapsed |
| Tablet | 768-960px | 2-column grids, category cards scale, horizontal padding 24px |
| Small Desktop | 960-1024px | Nav expands to full horizontal, 3-column product grid |
| Desktop | 1024-1440px | Full layout, expanded nav, 3-column grids, 48px padding |
| Large Desktop | >1440px | Max-width container centered, increased margins, hero images full-bleed |

### Touch Targets

- Minimum touch target: 44x44px (WCAG AAA)
- Mobile nav icons: 48x48px touch area
- Product cards: full surface is tappable
- Filter pills: minimum 36px height with 12px padding

### Collapsing Strategy

- **Navigation**: 960px 以下从 full category links → hamburger menu；search、favorites、cart icons 保持可见
- **Product grids**: 960px 时 3-col → 2-col，640px 时 → 1-col
- **Hero sections**: Display text 从 96px → 64px → 48px 缩放；hero images 在所有尺寸保持 full-bleed
- **Category cards**: 3-col → 2-col → 1-col，并保持 full-bleed imagery
- **Section padding**: 随 viewport 变窄从 80px → 48px → 32px → 24px
- **Promotional banner**: text wraps 或 truncates，同时保持 dark background

### Image Behavior

- 通过 Nike CDN（`c.static-nike.com`）与 width parameters 提供 responsive images
- Product images: srcset 包含多个 resolutions（w_320、w_640、w_960、w_1920）
- Hero images: 所有 breakpoints 下 full-bleed，aspect ratio 会变化（desktop 16:9 → mobile 4:3）
- Lazy loading: native loading="lazy"，加载期间使用 grey-100 placeholder
- Art direction: desktop 与 mobile compositions 之间 hero crops 会变化

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary CTA: Nike Black (`#111111`)
- Background: White (`#FFFFFF`)
- Secondary surface: Light Gray (`#F5F5F5`)
- Heading text: Nike Black (`#111111`)
- Body text / hover: Secondary Text (`#707072`)
- Border: Border Secondary (`#CACACB`)
- Error: Nike Red (`#D30005`)
- Link: Link Blue (`#1151FF`)

### Example Component Prompts

- "Create a product hero section with full-bleed edge-to-edge photography, no border radius, a dark gradient overlay for text, and a massive uppercase 96px/500 headline in Nike Futura style with 0.90 line-height and a Nike Black (#111111) pill button (30px radius)"
- "Design a 3-column product card grid with square images (no border radius), 4px gap between cards, product name in 16px/500 Nike Black (#111111), price in 14px/500, and secondary text in Grey-500 (#707072)"
- "Build a sticky white navigation bar with a left-aligned logo, centered category links in 16px/500 (#111111) with hover color #707072, and right-aligned search (24px radius, #F5F5F5 background), favorites, and cart icons"
- "Create a promotional banner strip with #111111 background, white 12px/500 centered text, and 8px vertical padding — full width, no border radius"
- "Design a secondary outlined button with transparent background, 1.5px #CACACB border, 30px pill radius, 16px/500 #111111 text, hover border darkening to #707072"

### Iteration Guide

使用此 design system 细化已生成 screens 时：
1. 一次只聚焦一个 component
2. 引用本文档中的 specific color names 和 hex codes
3. 记住：product photography 才是 color；UI 保持 monochromatic
4. 使用 grey scale 表达 state changes：#F5F5F5 → #E5E5E5 → #CACACB → #707072
5. 如果 UI 中某个东西感觉太 colorful，它大概率确实太 colorful；Nike 让 UI 保持 greyscale
6. Display type（Nike Futura）必须始终 uppercase，且永远不要低于 24px
7. Body type（Helvetica Now）在 interactive elements 中几乎总是 weight 500
