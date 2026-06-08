# Inspired by Supabase 的 Design System

> Category: Backend & Data
> Open-source Firebase alternative。Dark emerald theme、code-first。

## 1. Visual Theme & Atmosphere

Supabase 的网站是一个 dark-mode-native developer platform，呈现 premium code editor 的审美：deep black backgrounds（`#0f0f0f`, `#171717`）搭配 emerald green accents（`#3ecf8e`, `#00c573`），呼应品牌的 open-source 与 PostgreSQL-green 身份。这个 design system 像是诞生于 terminal window，又演化成高级 marketing surface，但没有丢掉 developer soul。

Typography 基于 "Circular"，这是一种带圆润端点的 geometric sans-serif，会柔化技术气质。Hero text 使用 72px 和 1.00 line-height，把垂直空间压缩到绝对最小，形成密集、有冲击力、毫不浪费的表达。Monospace companion（Source Code Pro）克制地用于 uppercase technical labels，并配 1.2px letter-spacing，形成 "developer console" markers，把 marketing site 与 product experience 连接起来。

Supabase 的独特之处在于精细的 HSL-based color token system。它不是使用平面 hex values，而是几乎每种颜色都通过带 alpha channels 的 HSL 表达（`--colors-crimson4`, `--colors-purple5`, `--colors-slateA12`），从而支持细腻的 layering system，让颜色通过透明度彼此互动。这通过 translucency 创造 depth：`rgba(46, 46, 46)` 的 borders、`rgba(41, 41, 41, 0.84)` 的 surfaces、部分透明的 accents 都与 dark background 混合，用极少颜色材料构建出丰富、有维度的 palette。

Green accent（`#3ecf8e`）选择性出现：Supabase logo、link colors（`#00c573`）以及 border highlights（`rgba(62, 207, 142, 0.3)`）。它始终是“this is Supabase”的信号，而不是 decorative element。Primary CTAs 使用 pill-shaped buttons（9999px radius），与 secondary elements 的标准 6px radius 形成对比，建立清晰的重要性 hierarchy。

**Key Characteristics:**
- Dark-mode-native: near-black backgrounds（`#0f0f0f`, `#171717`），绝不 pure black
- Emerald green brand accent（`#3ecf8e`, `#00c573`）克制地作为 identity marker
- Circular font，带圆润端点的 geometric sans-serif
- Source Code Pro 用于 uppercase technical labels（1.2px letter-spacing）
- HSL-based color token system，带 alpha channels，用于 translucent layering
- Primary CTAs 使用 pill buttons（9999px），secondary 使用 6px radius
- Neutral gray scale 从 `#171717` 经 `#898989` 到 `#fafafa`
- Border system 使用 dark grays（`#2e2e2e`, `#363636`, `#393939`）
- Minimal shadows，depth 通过 border contrast 和 transparency 建立
- Radix color primitives（crimson, purple, violet, indigo, yellow, tomato, orange, slate）

## 2. Color Palette & Roles

### Brand
- **Supabase Green** (`#3ecf8e`): Primary brand color、logo、accent borders
- **Green Link** (`#00c573`): Links 和 actions 的 interactive green
- **Green Border** (`rgba(62, 207, 142, 0.3)`): Subtle green border accent

### Neutral Scale (Dark Mode)
- **Near Black** (`#0f0f0f`): Primary button background、deepest surface
- **Dark** (`#171717`): Page background、primary canvas
- **Dark Border** (`#242424`): Horizontal rule、section dividers
- **Border Dark** (`#2e2e2e`): Card borders、tab borders
- **Mid Border** (`#363636`): Button borders、dividers
- **Border Light** (`#393939`): Secondary borders
- **Charcoal** (`#434343`): Tertiary borders、dark accents
- **Dark Gray** (`#4d4d4d`): Heavy secondary text
- **Mid Gray** (`#898989`): Muted text、link color
- **Light Gray** (`#b4b4b4`): Secondary link text
- **Near White** (`#efefef`): Light border、subtle surface
- **Off White** (`#fafafa`): Primary text、button text

### Radix Color Tokens (HSL-based)
- **Slate Scale**: `--colors-slate5` through `--colors-slateA12`，neutral progression
- **Purple**: `--colors-purple4`, `--colors-purple5`, `--colors-purpleA7`，accent spectrum
- **Violet**: `--colors-violet10` (`hsl(251, 63.2%, 63.2%)`)，vibrant accent
- **Crimson**: `--colors-crimson4`, `--colors-crimsonA9`，warm accent / alert
- **Indigo**: `--colors-indigoA2`，subtle blue wash
- **Yellow**: `--colors-yellowA7`，attention/warning
- **Tomato**: `--colors-tomatoA4`，error accent
- **Orange**: `--colors-orange6`，warm accent

### Surface & Overlay
- **Glass Dark** (`rgba(41, 41, 41, 0.84)`): Translucent dark overlay
- **Slate Alpha** (`hsla(210, 87.8%, 16.1%, 0.031)`): Ultra-subtle blue wash
- **Fixed Scale Alpha** (`hsla(200, 90.3%, 93.4%, 0.109)`): Light frost overlay

### Shadows
- Supabase 在 dark theme 中 **几乎不使用 shadows**。Depth 通过 border contrast 和 surface color differences 建立，而不是 box-shadows。Focus states 使用 `rgba(0, 0, 0, 0.1) 0px 4px 12px`，minimal 且 functional。

## 3. Typography Rules

### Font Families
- **Primary**: `Circular`, fallbacks: `custom-font, Helvetica Neue, Helvetica, Arial`
- **Monospace**: `Source Code Pro`, fallbacks: `Office Code Pro, Menlo`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | Circular | 72px (4.50rem) | 400 | 1.00 (tight) | normal | Maximum density, zero waste |
| Section Heading | Circular | 36px (2.25rem) | 400 | 1.25 (tight) | normal | Feature section titles |
| Card Title | Circular | 24px (1.50rem) | 400 | 1.33 | -0.16px | Slight negative tracking |
| Sub-heading | Circular | 18px (1.13rem) | 400 | 1.56 | normal | Secondary headings |
| Body | Circular | 16px (1.00rem) | 400 | 1.50 | normal | Standard body text |
| Nav Link | Circular | 14px (0.88rem) | 500 | 1.00-1.43 | normal | Navigation items |
| Button | Circular | 14px (0.88rem) | 500 | 1.14 (tight) | normal | Button labels |
| Caption | Circular | 14px (0.88rem) | 400-500 | 1.43 | normal | Metadata, tags |
| Small | Circular | 12px (0.75rem) | 400 | 1.33 | normal | Fine print, footer links |
| Code Label | Source Code Pro | 12px (0.75rem) | 400 | 1.33 | 1.2px | `text-transform: uppercase` |

### Principles
- **Weight restraint**: 几乎所有文本都使用 weight 400（regular/book）。Weight 500 只用于 navigation links 和 button labels。检测到的系统中没有 bold (700)，hierarchy 通过 size 而不是 weight 建立。
- **1.00 hero line-height**: Hero text 被压缩到零 leading。这是定义性的 typographic gesture，像 terminal command 一样 dense、efficient、没有浪费的垂直空间。
- **Negative tracking on cards**: Card titles 使用 -0.16px letter-spacing，细微收紧，使它们与 body text 区分开，但不显眼。
- **Monospace as ritual**: Source Code Pro uppercase 加 1.2px letter-spacing 是 "developer console" voice，克制用于连接 product experience 的 technical labels。
- **Geometric personality**: Circular 的圆润端点为本可能冰冷的技术界面带来温度。Font 是 humanizing element。

## 4. Component Stylings

### Buttons

**Primary Pill (Dark)**
- Background: `#0f0f0f`
- Text: `#fafafa`
- Padding: 8px 32px
- Radius: 9999px (full pill)
- Border: `1px solid #fafafa`（深色上的 white border）
- Focus shadow: `rgba(0, 0, 0, 0.1) 0px 4px 12px`
- Use: Primary CTA（"Start your project"）

**Secondary Pill (Dark, Muted)**
- Background: `#0f0f0f`
- Text: `#fafafa`
- Padding: 8px 32px
- Radius: 9999px
- Border: `1px solid #2e2e2e`（dark border）
- Opacity: 0.8
- Use: Primary 旁边的 secondary CTA

**Ghost Button**
- Background: transparent
- Text: `#fafafa`
- Padding: 8px
- Radius: 6px
- Border: `1px solid transparent`
- Use: Tertiary actions、icon buttons

### Cards & Containers
- Background: dark surfaces（`#171717` 或略浅）
- Border: `1px solid #2e2e2e` 或 `#363636`
- Radius: 8px-16px
- No visible shadows，edges 由 borders 定义
- Internal padding: 16px-24px

### Tabs
- Border: `1px solid #2e2e2e`
- Radius: 9999px（pill tabs）
- Active: green accent 或 lighter surface
- Inactive: dark, muted

### Links
- **Green**: `#00c573`，Supabase-branded links
- **Primary Light**: `#fafafa`，dark 上的 standard links
- **Secondary**: `#b4b4b4`，muted links
- **Muted**: `#898989`，tertiary links、footer

### Navigation
- Dark background，与 page (`#171717`) 匹配
- Supabase logo 带 green icon
- Nav links 使用 Circular 14px weight 500
- 干净 horizontal layout，带 product dropdown
- Green "Start your project" CTA pill button
- Sticky header behavior

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1px, 4px, 6px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 90px, 96px, 128px
- Notable large jumps: 48px -> 90px -> 96px -> 128px，用于 major section spacing

### Grid & Container
- Centered content，带 generous max-width
- Full-width dark sections，内部 content 受约束
- Feature grids: 基于 icon 的 grids，card sizes 一致
- Logo grids 用于 "Trusted by" sections
- Footer: dark background 上的 multi-column

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <600px | Single column, stacked layout |
| Desktop | >600px | Multi-column grids, expanded layout |

*Note: Supabase 使用非常 minimal 的 breakpoint system，主要只有一个 600px breakpoint，暗示 mobile-first approach 与 progressive enhancement。*

### Whitespace Philosophy
- **Dramatic section spacing**: Major sections 之间 90px-128px 的 spacing 创造 cinematic pacing，每个 section 都像 dark void 中自己的 scene。
- **Dense content blocks**: Sections 内部 spacing 较紧（16px-24px），形成集中的 information clusters。
- **Border-defined space**: Supabase 不用 whitespace + shadows 做分隔，而是在 dark backgrounds 上使用 thin borders，通过线条而非 gap 建立 separation。

### Border Radius Scale
- Standard (6px): Ghost buttons、小元素
- Comfortable (8px): Cards、containers
- Medium (11px-12px): Mid-size panels
- Large (16px): Feature cards、major containers
- Pill (9999px): Primary buttons、tab indicators

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, border `#2e2e2e` | Default state, most surfaces |
| Subtle Border (Level 1) | Border `#363636` or `#393939` | Interactive elements, hover |
| Focus (Level 2) | `rgba(0, 0, 0, 0.1) 0px 4px 12px` | Focus states only |
| Green Accent (Level 3) | Border `rgba(62, 207, 142, 0.3)` | Brand-highlighted elements |

**Shadow Philosophy**: Supabase 刻意避免 shadows。在 dark-mode-native design 中，shadows 几乎不可见，也没有实际作用。Depth 改由精细 border hierarchy 传达：从 `#242424`（几乎不可见）到 `#2e2e2e`（standard）再到 `#393939`（prominent）。30% opacity 的 green accent border（`rgba(62, 207, 142, 0.3)`）就是 "elevated" state，brand color 本身成为 depth signal。

## 7. Do's and Don'ts

### Do
- 使用 near-black backgrounds（`#0f0f0f`, `#171717`），depth 来自 gray border hierarchy
- Supabase green（`#3ecf8e`, `#00c573`）要克制使用；它是 identity marker，不是装饰
- 几乎所有内容使用 Circular weight 400，500 只用于 buttons 和 nav
- Hero text 设置为 1.00 line-height；zero-leading 是 typographic signature
- 通过 border color differences（`#242424` -> `#2e2e2e` -> `#363636`）创造 depth
- Pill shape (9999px) 只用于 primary CTAs 和 tabs
- 使用带 alpha 的 HSL-based colors 实现 translucent layering effects
- Developer-context markers 使用 Source Code Pro uppercase labels

### Don't
- 不要添加 box-shadows；它们在 dark backgrounds 上不可见，也会破坏 border-defined depth system
- 不要使用 bold (700) text weight；系统只使用 400 和 500
- 不要把 green 应用于 backgrounds 或 large surfaces；它用于 borders、links 和 small accents
- 不要把 warm colors（crimson, orange）作为 primary design elements；它们是 states 的 semantic tokens
- 不要把 hero line-height 增加到 1.00 以上；density 是刻意设计
- 不要在 buttons 上使用大 border radius（16px+）；要么 pills (9999px)，要么 standard (6px)，没有中间项
- 不要把 primary surfaces 的 background 提亮到 `#171717` 以上；darkness 是结构性的
- 不要忘记 translucent borders；`rgba` border colors 是 layering mechanism

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <600px | Single column, stacked features, condensed nav |
| Desktop | >600px | Multi-column grids, full nav, expanded sections |

### Collapsing Strategy
- Hero: 72px -> 按比例缩小
- Feature grids: multi-column -> single column stacked
- Logo row: horizontal -> wrapped grid
- Navigation: full -> hamburger
- Section spacing: 90-128px -> 48-64px
- Buttons: inline -> full-width stacked

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: `#0f0f0f` (button), `#171717` (page)
- Text: `#fafafa` (primary), `#b4b4b4` (secondary), `#898989` (muted)
- Brand green: `#3ecf8e` (brand), `#00c573` (links)
- Borders: `#242424` (subtle), `#2e2e2e` (standard), `#363636` (prominent)
- Green border: `rgba(62, 207, 142, 0.3)` (accent)

### Example Component Prompts
- "Create a hero section on #171717 background. Headline at 72px Circular weight 400, line-height 1.00, #fafafa text. Sub-text at 16px Circular weight 400, line-height 1.50, #b4b4b4. Pill CTA button (#0f0f0f bg, #fafafa text, 9999px radius, 8px 32px padding, 1px solid #fafafa border)."
- "Design a feature card: #171717 background, 1px solid #2e2e2e border, 16px radius. Title at 24px Circular weight 400, letter-spacing -0.16px. Body at 14px weight 400, #898989 text."
- "Build navigation bar: #171717 background. Circular 14px weight 500 for links, #fafafa text. Supabase logo with green icon left-aligned. Green pill CTA 'Start your project' right-aligned."
- "Create a technical label: Source Code Pro 12px, uppercase, letter-spacing 1.2px, #898989 text."
- "Design a framework logo grid: 6-column layout on dark, grayscale logos at 60% opacity, 1px solid #2e2e2e border between sections."

### Iteration Guide
1. 从 #171717 background 开始；一切都是 dark-mode-native
2. Green 是 brand identity marker，只用于 links、logo 和 accent borders
3. Depth 来自 borders（#242424 -> #2e2e2e -> #363636），不是 shadows
4. Weight 400 是默认，500 只用于 interactive elements
5. Hero line-height 1.00 是 signature typographic move
6. Primary actions 用 pill (9999px)，secondary 用 6px，cards 用 8-16px
7. 带 alpha channels 的 HSL 创造 sophisticated translucent layering
