# Inspired by Cursor 的 Design System

> Category: Developer Tools
> AI-first code editor。Sleek dark interface，gradient accents。

## 1. Visual Theme & Atmosphere

Cursor 的网站是一场 warm minimalism 与 code-editor elegance 的结合。整个体验建立在 warm off-white canvas（`#f2f1ed`）之上，搭配 dark warm-brown text（`#26251e`）：不是 pure black，也不是 neutral gray，而是带 yellowish undertone 的深暖 near-black，会让人想到旧纸张、墨水和手作感。这种 warmth 渗透每个 surface：backgrounds 偏向 cream（`#e6e5e0`、`#ebeae5`），borders 使用 `oklab` color space 溶入 transparent warm overlays，甚至 error state（`#cf2d56`）也带着温度，而不是 clinical red。结果更像 premium print publication，而不是普通 tech website。

Custom CursorGothic font 是 typographic signature：一种 gothic sans-serif，在 display sizes 上使用 aggressive negative letter-spacing（72px 时 -2.16px），形成 compressed、engineered feel。作为 secondary voice，jjannon serif font（带 OpenType `"cswh"` contextual swash alternates）为 body copy 和 editorial passages 提供文学性的 counterpoint。Monospace voice 来自 berkeleyMono，这是一款精炼的 coding font，把 marketing site 与 Cursor 作为 code editor 的核心身份连起来。这套 three-font system（gothic display、serif body、mono code）让 Cursor 拥有 developer tooling 中最丰富的 typographic palette 之一。

Border system 尤其有辨识度：Cursor 使用 `oklab()` color space 定义 border colors，以多个 alpha levels（0.1、0.2、0.55）施加 warm brown，让 borders 感觉 organic，而不是 mechanical。Signature border color `oklab(0.263084 -0.00230259 0.0124794 / 0.1)` 不是简单 rgba value，而是 perceptually uniform color，可在不同 backgrounds 上保持视觉一致性。

**Key Characteristics:**
- CursorGothic 使用 aggressive negative letter-spacing（72px 时 -2.16px，36px 时 -0.72px），形成 compressed display headings
- jjannon serif 用于 body text，并启用 OpenType `"cswh"`（contextual swash alternates）
- berkeleyMono 用于 code 和 technical labels
- Warm off-white background（`#f2f1ed`）替代 pure white，整个系统都 warm-shifted
- Primary text color `#26251e`，带 yellow undertone 的 warm near-black
- Accent orange `#f54e00` 用于 brand highlight 和 links
- oklab-space borders 使用多个 alpha levels，提供 perceptually uniform edge treatment
- Pill-shaped elements 使用极端 radius（33.5M px，实际等同 full-pill）
- 8px base spacing system，带细粒度 sub-8px increments（1.5px、2px、2.5px、3px、4px、5px、6px）

## 2. Color Palette & Roles

### Primary
- **Cursor Dark** (`#26251e`): Primary text、headings、dark UI surfaces。带明显 yellow-brown undertone 的 warm near-black，是系统的 defining color。
- **Cursor Cream** (`#f2f1ed`): Page background、primary surface。不是白色，而是设置整体 warm tone 的 warm cream。
- **Cursor Light** (`#e6e5e0`): Secondary surface、button backgrounds、card fills。稍暖、稍深的 cream。
- **Pure White** (`#ffffff`): 克制使用，只用于 maximum contrast elements 和特定 surface highlights。
- **True Black** (`#000000`): 使用很少，只在 specific code/console contexts 中出现。

### Accent
- **Cursor Orange** (`#f54e00`): Brand accent、`--color-accent`。用于 primary CTAs、active links 和 brand moments 的 vibrant red-orange。温暖且有紧迫感。
- **Gold** (`#c08532`): Secondary accent，用于 premium 或 highlighted contexts 的 warm gold。

### Semantic
- **Error** (`#cf2d56`): `--color-error`。Warm crimson-rose，而不是冷红色。
- **Success** (`#1f8a65`): `--color-success`。Warm-shifted 的 muted teal-green。

### Timeline / Feature Colors
- **Thinking** (`#dfa88f`): AI timeline 中 “thinking” state 的 warm peach。
- **Grep** (`#9fc9a2`): Search/grep operations 的 soft sage green。
- **Read** (`#9fbbe0`): File reading operations 的 soft blue。
- **Edit** (`#c0a8dd`): Editing operations 的 soft lavender。

### Surface Scale
- **Surface 100** (`#f7f7f4`): 最浅的 button/card surface，几乎不可察觉的 tint。
- **Surface 200** (`#f2f1ed`): Primary page background。
- **Surface 300** (`#ebeae5`): Button default background、subtle emphasis。
- **Surface 400** (`#e6e5e0`): Card backgrounds、secondary surfaces。
- **Surface 500** (`#e1e0db`): Tertiary button background、deeper emphasis。

### Border Colors
- **Border Primary** (`oklab(0.263084 -0.00230259 0.0124794 / 0.1)`): Standard border，oklab space 中 10% warm brown。
- **Border Medium** (`oklab(0.263084 -0.00230259 0.0124794 / 0.2)`): Emphasized border，20% warm brown。
- **Border Strong** (`rgba(38, 37, 30, 0.55)`): Strong borders、table rules。
- **Border Solid** (`#26251e`): Full-opacity dark border，用于 maximum contrast。
- **Border Light** (`#f2f1ed`): 与 page background 匹配的 light border。

### Shadows & Depth
- **Card Shadow** (`rgba(0,0,0,0.14) 0px 28px 70px, rgba(0,0,0,0.1) 0px 14px 32px, oklab(0.263084 -0.00230259 0.0124794 / 0.1) 0px 0px 0px 1px`): 带 warm oklab border ring 的 heavy elevated card。
- **Ambient Shadow** (`rgba(0,0,0,0.02) 0px 0px 16px, rgba(0,0,0,0.008) 0px 0px 8px`): Floating elements 的 subtle ambient glow。

## 3. Typography Rules

### Font Family
- **Display/Headlines**: `CursorGothic`, with fallbacks: `CursorGothic Fallback, system-ui, Helvetica Neue, Helvetica, Arial`
- **Body/Editorial**: `jjannon`, with fallbacks: `Iowan Old Style, Palatino Linotype, URW Palladio L, P052, ui-serif, Georgia, Cambria, Times New Roman, Times`
- **Code/Technical**: `berkeleyMono`, with fallbacks: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New`
- **UI/System**: `system-ui`, with fallbacks: `-apple-system, Segoe UI, Helvetica Neue, Arial`
- **Icons**: `CursorIcons16`（14px 和 12px 的 icon font）
- **OpenType Features**: jjannon body text 上使用 `"cswh"`，CursorGothic buttons/captions 上使用 `"ss09"`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | CursorGothic | 72px (4.50rem) | 400 | 1.10 (tight) | -2.16px | Maximum compression, hero statements |
| Section Heading | CursorGothic | 36px (2.25rem) | 400 | 1.20 (tight) | -0.72px | Feature sections, CTA headlines |
| Sub-heading | CursorGothic | 26px (1.63rem) | 400 | 1.25 (tight) | -0.325px | Card headings, sub-sections |
| Title Small | CursorGothic | 22px (1.38rem) | 400 | 1.30 (tight) | -0.11px | Smaller titles, list headings |
| Body Serif | jjannon | 19.2px (1.20rem) | 500 | 1.50 | normal | Editorial body with `"cswh"` |
| Body Serif SM | jjannon | 17.28px (1.08rem) | 400 | 1.35 | normal | Standard body text, descriptions |
| Body Sans | CursorGothic | 16px (1.00rem) | 400 | 1.50 | normal/0.08px | UI body text |
| Button Label | CursorGothic | 14px (0.88rem) | 400 | 1.00 (tight) | normal | Primary button text |
| Button Caption | CursorGothic | 14px (0.88rem) | 400 | 1.50 | 0.14px | Secondary button with `"ss09"` |
| Caption | CursorGothic | 11px (0.69rem) | 400-500 | 1.50 | normal | Small captions, metadata |
| System Heading | system-ui | 20px (1.25rem) | 700 | 1.55 | normal | System UI headings |
| System Caption | system-ui | 13px (0.81rem) | 500-600 | 1.33 | normal | System UI labels |
| System Micro | system-ui | 11px (0.69rem) | 500 | 1.27 (tight) | 0.048px | Uppercase micro labels |
| Mono Body | berkeleyMono | 12px (0.75rem) | 400 | 1.67 (relaxed) | normal | Code blocks |
| Mono Small | berkeleyMono | 11px (0.69rem) | 400 | 1.33 | -0.275px | Inline code, terminal |
| Lato Heading | Lato | 16px (1.00rem) | 600 | 1.33 | normal | Lato section headings |
| Lato Caption | Lato | 14px (0.88rem) | 400-600 | 1.33 | normal | Lato captions |
| Lato Micro | Lato | 12px (0.75rem) | 400-600 | 1.27 (tight) | 0.053px | Lato small labels |

### Principles
- **Gothic compression for impact**: CursorGothic 在 display sizes 上使用 72px 时 -2.16px 的 letter-spacing，并逐步放松：36px 为 -0.72px，26px 为 -0.325px，22px 为 -0.11px，16px 及以下为 normal。这种 tracking 创造 precision engineering 的感觉。
- **Serif for soul**: jjannon 提供 literary warmth。`"cswh"` feature 添加 contextual swash alternates，让 body text 带有 calligraphic quality。
- **Three typographic voices**: Gothic（display/UI）、serif（editorial/body）、mono（code/technical）。每一种都服务于不同 communication purpose。
- **Weight restraint**: CursorGothic 几乎只使用 weight 400，依靠 size 和 tracking 建立 hierarchy，而不是依靠 weight。System-ui components 使用 500-700 来表达 functional emphasis。

## 4. Component Stylings

### Buttons

**Primary (Warm Surface)**
- Background: `#ebeae5` (Surface 300)
- Text: `#26251e` (Cursor Dark)
- Padding: 10px 12px 10px 14px
- Radius: 8px
- Outline: none
- Hover: text 切换到 `var(--color-error)` (`#cf2d56`)
- Focus shadow: `rgba(0,0,0,0.1) 0px 4px 12px`
- Use: Primary actions, main CTAs

**Secondary Pill**
- Background: `#e6e5e0` (Surface 400)
- Text: `oklab(0.263 / 0.6)` (60% warm brown)
- Padding: 3px 8px
- Radius: full pill (33.5M px)
- Hover: text 切换到 `var(--color-error)`
- Use: Tags, filters, secondary actions

**Tertiary Pill**
- Background: `#e1e0db` (Surface 500)
- Text: `oklab(0.263 / 0.6)` (60% warm brown)
- Radius: full pill
- Use: Active filter state, selected tags

**Ghost (Transparent)**
- Background: `rgba(38, 37, 30, 0.06)` (6% warm brown)
- Text: `rgba(38, 37, 30, 0.55)` (55% warm brown)
- Padding: 6px 12px
- Use: Tertiary actions, dismiss buttons

**Light Surface**
- Background: `#f7f7f4` (Surface 100) 或 `#f2f1ed` (Surface 200)
- Text: `#26251e` 或 `oklab(0.263 / 0.9)` (90%)
- Padding: 0px 8px 1px 12px
- Use: Dropdown triggers, subtle interactive elements

### Cards & Containers
- Background: `#e6e5e0` 或 `#f2f1ed`
- Border: `1px solid oklab(0.263 / 0.1)`（10% warm brown）
- Radius: 8px（standard）、4px（compact）、10px（featured）
- Shadow: elevated cards 使用 `rgba(0,0,0,0.14) 0px 28px 70px, rgba(0,0,0,0.1) 0px 14px 32px`
- Hover: shadow intensification

### Inputs & Forms
- Background: transparent 或 surface
- Text: `#26251e`
- Padding: 8px 8px 6px（textarea）
- Border: `1px solid oklab(0.263 / 0.1)`
- Focus: border 切换到 `oklab(0.263 / 0.2)` 或 accent orange

### Navigation
- Warm cream background 上的 clean horizontal nav
- Cursor logotype left-aligned（约 96x24px）
- Links: 14px CursorGothic 或 system-ui，weight 500
- CTA button: warm surface with Cursor Dark text
- Tab navigation: bottom border `1px solid oklab(0.263 / 0.1)`，active tab 有 differentiation

### Image Treatment
- Code editor screenshots 带 `1px solid oklab(0.263 / 0.1)` border
- Rounded corners: 8px standard
- AI chat/timeline screenshots 主导 feature sections
- Hero images 背后使用 warm gradient 或 solid cream backgrounds

### Distinctive Components

**AI Timeline**
- Vertical timeline 展示 AI operations：thinking（peach）、grep（sage）、read（blue）、edit（lavender）
- 每一步都使用对应 semantic color 与 matching text
- 使用 vertical lines 连接
- Cursor AI-first coding experience 的核心 visual metaphor

**Code Editor Previews**
- Dark code editor screenshots，带 warm cream border frame
- Code text 使用 berkeleyMono
- Syntax highlighting 使用 timeline colors

**Pricing Cards**
- Warm surface backgrounds，带 bordered containers
- Feature lists 使用 jjannon serif 提升 readability
- CTA buttons 使用 accent orange 或 primary dark styling

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Fine scale: 1.5px, 2px, 2.5px, 3px, 4px, 5px, 6px（用于 micro-adjustments 的 sub-8px）
- Standard scale: 8px, 10px, 12px, 14px（derived from extraction）
- Extended scale（inferred）: 16px, 24px, 32px, 48px, 64px, 96px
- Notable: 细粒度 sub-8px increments 用于 precise icon/text alignment

### Grid & Container
- Max content width: approximately 1200px
- Hero: centered single-column，带 generous top padding（80-120px）
- Feature sections: cards 和 features 使用 2-3 column grids
- Full-width sections 使用 warm cream 或稍深 backgrounds
- Documentation 和 settings pages 使用 sidebar layouts

### Whitespace Philosophy
- **Warm negative space**: Cream background 意味着 whitespace 带有 warmth 和 texture，不像 cold white minimalism。大片空白感觉 cozy，而不是 clinical。
- **Compressed text, open layout**: CursorGothic headlines 上 aggressive negative letter-spacing，与 generous surrounding margins 平衡。Text 很 dense；它周围的 space 会呼吸。
- **Section variation**: Surface tones 交替（cream → lighter cream → cream），在没有 hard boundaries 的情况下创造 subtle section differentiation。

### Border Radius Scale
- Micro (1.5px): Fine detail elements
- Small (2px): Inline elements, code spans
- Medium (3px): Small containers, inline badges
- Standard (4px): Cards, images, compact buttons
- Comfortable (8px): Primary buttons, cards, menus
- Featured (10px): Larger containers, featured cards
- Full Pill (33.5M px / 9999px): Pill buttons, tags, badges

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Page background, text blocks |
| Border Ring (Level 1) | `oklab(0.263 / 0.1) 0px 0px 0px 1px` | Standard card/container border (warm oklab) |
| Border Medium (Level 1b) | `oklab(0.263 / 0.2) 0px 0px 0px 1px` | Emphasized borders, active states |
| Ambient (Level 2) | `rgba(0,0,0,0.02) 0px 0px 16px, rgba(0,0,0,0.008) 0px 0px 8px` | Floating elements, subtle glow |
| Elevated Card (Level 3) | `rgba(0,0,0,0.14) 0px 28px 70px, rgba(0,0,0,0.1) 0px 14px 32px, oklab ring` | Modals, popovers, elevated cards |
| Focus | `rgba(0,0,0,0.1) 0px 4px 12px` on button focus | Interactive focus feedback |

**Shadow Philosophy**: Cursor 的 depth system 建立在两个想法上。第一，borders 使用 perceptually uniform oklab color space，而不是 rgba，确保 warm brown borders 在不同 background tones 上保持一致。第二，elevation shadows 使用非常大的 blur values（28px、70px）和适中的 opacity（0.14、0.1），创造 diffused、atmospheric lift，而不是 hard-edged drop shadows。Cards 不像漂浮在 page 之上，而像 page 轻轻为它们打开了一块空间。

### Decorative Depth
- Warm cream surface variations 在没有 shadows 的情况下创造 subtle tonal depth
- 10% 和 20% 的 oklab borders 创造 edge definition spectrum
- 没有 harsh divider lines；section separation 通过 background tone shifts 和 spacing 完成

## 7. Interaction & Motion

### Hover States
- Buttons: hover 时 text color 切换到 `--color-error` (`#cf2d56`)，这是一种 distinctive warm crimson，用来提示 interactivity
- Links: color 切换到 accent orange（`#f54e00`），或使用 `rgba(38, 37, 30, 0.4)` underline decoration
- Cards: hover 时 shadow intensification（ambient → elevated）

### Focus States
- Shadow-based focus: `rgba(0,0,0,0.1) 0px 4px 12px`，用 depth 表达 focus indication
- Border focus: input/form focus 使用 `oklab(0.263 / 0.2)`（20% border）
- 所有 focus states 保持一致的 warm tone；没有 cold blue focus rings

### Transitions
- Color transitions: text/background color changes 使用 150ms ease
- Shadow transitions: elevation changes 使用 200ms ease
- Transform: interactive feedback 使用 subtle scale 或 translate

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <600px | Single column, reduced padding, stacked navigation |
| Tablet Small | 600-768px | 2-column grids begin |
| Tablet | 768-900px | Expanded card grids, sidebar appears |
| Desktop Small | 900-1279px | Full layout forming |
| Desktop | >1279px | Full layout, maximum content width |

### Touch Targets
- Buttons 使用 comfortable padding（vertical 6px-14px，horizontal 8px-14px）
- Pill buttons 通过 3px-10px padding 保持 tap-friendly sizing
- Navigation links 为 14px，并有 adequate spacing for touch

### Collapsing Strategy
- Hero: 72px CursorGothic → 36px → 26px，较小 screens 上仍保持 proportional letter-spacing
- Navigation: horizontal links → mobile 上 hamburger menu
- Feature cards: 3-column → 2-column → single column stacked
- Code editor screenshots: 保持 aspect ratio，缩小时保留 border treatment
- Timeline visualization: horizontal → vertical stacking
- Section spacing: 80px+ → 48px → mobile 上 32px

### Image Behavior
- Editor screenshots 在所有尺寸保持 warm border treatment
- AI timeline 从 horizontal layout 适配为 vertical layout
- Product screenshots 使用 responsive images，并保持 consistent border radius
- Full-width hero images 按比例缩放

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA background: `#ebeae5` (warm cream button)
- Page background: `#f2f1ed` (warm off-white)
- Text color: `#26251e` (warm near-black)
- Secondary text: `rgba(38, 37, 30, 0.55)` (55% warm brown)
- Accent: `#f54e00` (orange)
- Error/hover: `#cf2d56` (warm crimson)
- Success: `#1f8a65` (muted teal)
- Border: `oklab(0.263084 -0.00230259 0.0124794 / 0.1)` or `rgba(38, 37, 30, 0.1)` as fallback

### Example Component Prompts
- "Create a hero section on `#f2f1ed` warm cream background. Headline at 72px CursorGothic weight 400, line-height 1.10, letter-spacing -2.16px, color `#26251e`. Subtitle at 17.28px jjannon weight 400, line-height 1.35, color `rgba(38,37,30,0.55)`. Primary CTA button (`#ebeae5` bg, 8px radius, 10px 14px padding) with hover text shift to `#cf2d56`."
- "Design a card: `#e6e5e0` background, border `1px solid rgba(38,37,30,0.1)`. Radius 8px. Title at 22px CursorGothic weight 400, letter-spacing -0.11px. Body at 17.28px jjannon weight 400, color `rgba(38,37,30,0.55)`. Use `#f54e00` for link accents."
- "Build a pill tag: `#e6e5e0` background, `rgba(38,37,30,0.6)` text, full-pill radius (9999px), 3px 8px padding, 14px CursorGothic weight 400."
- "Create navigation: sticky `#f2f1ed` background with backdrop-filter blur. 14px system-ui weight 500 for links, `#26251e` text. CTA button right-aligned with `#ebeae5` bg and 8px radius. Bottom border `1px solid rgba(38,37,30,0.1)`."
- "Design an AI timeline showing four steps: Thinking (`#dfa88f`), Grep (`#9fc9a2`), Read (`#9fbbe0`), Edit (`#c0a8dd`). Each step: 14px system-ui label + 16px CursorGothic description + vertical connecting line in `rgba(38,37,30,0.1)`."

### Iteration Guide
1. 始终使用 warm tones：`#f2f1ed` background、`#26251e` text，primary surfaces 不要使用 pure white/black
2. CursorGothic 的 letter-spacing 随 font size 缩放：72px 为 -2.16px，36px 为 -0.72px，26px 为 -0.325px，16px 为 normal
3. 用 `rgba(38, 37, 30, alpha)` 作为 oklab borders 的 CSS-compatible fallback
4. Three fonts, three voices：CursorGothic（display/UI）、jjannon（editorial）、berkeleyMono（code）
5. Tags 和 filters 使用 pill shapes（9999px radius）；primary buttons 和 cards 使用 8px radius
6. Hover states 使用 `#cf2d56` text color；warm crimson shift 是 signature interaction
7. Shadows 使用 large blur values（28px、70px）形成 diffused atmospheric depth
8. Sub-8px spacing scale（1.5、2、2.5、3、4、5、6px）对 icon/text micro-alignment 至关重要
