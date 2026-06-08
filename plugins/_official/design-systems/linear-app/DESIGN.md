# Inspired by Linear 的 Design System

> Category: Productivity & SaaS
> Project management。Ultra-minimal、precise，并以 purple accent 点睛。

## 1. Visual Theme & Atmosphere

Linear 的网站是 dark-mode-first product design 的范本：一个 near-black canvas（`#08090a`），内容像星光一样从黑暗里浮现。整体印象是极致 precision engineering：每个元素都处在精密校准过的 luminance hierarchy 中，从 barely-visible borders（`rgba(255,255,255,0.05)`）到 soft、luminous text（`#f7f8f8`）。这不是把 dark theme 套到 light design 上；darkness 是 native medium，信息密度通过 white opacity 的细微层级管理，而不是靠颜色变化。

Typography system 完全建立在 Inter Variable 之上，并全局启用 OpenType features `"cv01"` 与 `"ss03"`，让 typeface 更干净、更 geometric。Inter 使用了非常丰富的 weight range：从 300（light body）、510（medium，Linear 的 signature weight）到 590（semibold emphasis）。510 特别有辨识度：它介于 regular 与 medium 之间，形成不吵闹的 subtle emphasis。Display sizes（72px、64px、48px）使用 aggressive negative letter-spacing（-1.584px 到 -1.056px），让 headlines 变得 compressed、authoritative，感觉像被工程化而不是被装饰。Berkeley Mono 是 code 与 technical labels 的 monospace companion，fallbacks 为 ui-monospace、SF Mono 和 Menlo。

Color system 几乎完全 achromatic：dark backgrounds 加 white/gray text，只由一个 brand accent 点亮：Linear 标志性的 indigo-violet（background 用 `#5e6ad2`，interactive accents 用 `#7170ff`）。这个 accent color 用得很克制，只出现在 CTAs、active states 和 brand elements 上。Border system 使用 ultra-thin、semi-transparent white borders（`rgba(255,255,255,0.05)` 到 `rgba(255,255,255,0.08)`），像月光里的线框一样建立结构，却不制造 visual noise。

**Key Characteristics:**
- Dark-mode-native：marketing background `#08090a`，panel background `#0f1011`，elevated surfaces `#191a1b`
- Inter Variable 全局启用 `"cv01", "ss03"`，用 geometric alternates 塑造更干净的 aesthetic
- Signature weight 510（介于 regular 与 medium 之间），用于多数 UI text
- Display sizes 使用 aggressive negative letter-spacing（72px 时 -1.584px，48px 时 -1.056px）
- Brand indigo-violet：`#5e6ad2`（bg）/ `#7170ff`（accent）/ `#828fff`（hover），是系统唯一 chromatic color
- 全系统使用 semi-transparent white borders：`rgba(255,255,255,0.05)` 到 `rgba(255,255,255,0.08)`
- Button backgrounds 几乎透明：`rgba(255,255,255,0.02)` 到 `rgba(255,255,255,0.05)`
- Multi-layered shadows 带 inset variants，用于 dark surfaces 上的 depth
- Radix UI primitives 是 component foundation（检测到 6 个 primitives）
- Success green（`#27a644`、`#10b981`）只用于 status indicators

## 2. Color Palette & Roles

### Background Surfaces
- **Marketing Black** (`#010102` / `#08090a`): 最深背景，是 hero sections 和 marketing pages 的 canvas。接近 pure black，带几乎不可察觉的 blue-cool undertone。
- **Panel Dark** (`#0f1011`): Sidebar 与 panel backgrounds，比 marketing black 高一层。
- **Level 3 Surface** (`#191a1b`): Elevated surface areas、card backgrounds、dropdowns。
- **Secondary Surface** (`#28282c`): 最浅的 dark surface；用于 hover states 和略微 elevated 的 components。

### Text & Content
- **Primary Text** (`#f7f8f8`): 带轻微暖意的 near-white。默认 text color；不是 pure white，避免 dark backgrounds 上的 eye strain。
- **Secondary Text** (`#d0d6e0`): Cool silver-gray，用于 body text、descriptions 和 secondary content。
- **Tertiary Text** (`#8a8f98`): Muted gray，用于 placeholders、metadata 和 de-emphasized content。
- **Quaternary Text** (`#62666d`): 最低调的 text；用于 timestamps、disabled states、subtle labels。

### Brand & Accent
- **Brand Indigo** (`#5e6ad2`): Primary brand color；用于 CTA button backgrounds、brand marks 和关键 interactive surfaces。
- **Accent Violet** (`#7170ff`): 更亮的 variant，用于 links、active states、selected items。
- **Accent Hover** (`#828fff`): hover states 上更浅、更 saturated 的 accent variant。
- **Security Lavender** (`#7a7fad`): 专用于 security-related UI elements 的 muted indigo。

### Status Colors
- **Green** (`#27a644`): Primary success/active status，用于 “in progress” indicators。
- **Emerald** (`#10b981`): Secondary success；用于 pill badges、completion states。

### Border & Divider
- **Border Primary** (`#23252a`): 用于 prominent separations 的 solid dark border。
- **Border Secondary** (`#34343a`): 稍亮的 solid border。
- **Border Tertiary** (`#3e3e44`): 最亮的 solid border variant。
- **Border Subtle** (`rgba(255,255,255,0.05)`): Ultra-subtle semi-transparent border；默认使用。
- **Border Standard** (`rgba(255,255,255,0.08)`): Cards、inputs、code blocks 的 standard semi-transparent border。
- **Line Tint** (`#141516`): 几乎不可见的 line，用于最细微 divisions。
- **Line Tertiary** (`#18191a`): 稍微更可见的 divider line。

### Light Mode Neutrals (for light theme contexts)
- **Light Background** (`#f7f8f8`): Light mode 中的 page background。
- **Light Surface** (`#f3f4f5` / `#f5f6f7`): Subtle surface tinting。
- **Light Border** (`#d0d6e0`): Light contexts 中可见的 border。
- **Light Border Alt** (`#e6e6e6`): Alternative lighter border。
- **Pure White** (`#ffffff`): Card surfaces、highlights。

### Overlay
- **Overlay Primary** (`rgba(0,0,0,0.85)`): Modal/dialog backdrop；极暗，用于 focus isolation。

## 3. Typography Rules

### Font Family
- **Primary**: `Inter Variable`, with fallbacks: `SF Pro Display, -apple-system, system-ui, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue`
- **Monospace**: `Berkeley Mono`, with fallbacks: `ui-monospace, SF Mono, Menlo`
- **OpenType Features**: 全局启用 `"cv01", "ss03"`；cv01 提供 alternate lowercase 'a'（single-story），ss03 调整特定 letterforms，让整体更 clean geometric。

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display XL | Inter Variable | 72px (4.50rem) | 510 | 1.00 (tight) | -1.584px | Hero headlines, maximum impact |
| Display Large | Inter Variable | 64px (4.00rem) | 510 | 1.00 (tight) | -1.408px | Secondary hero text |
| Display | Inter Variable | 48px (3.00rem) | 510 | 1.00 (tight) | -1.056px | Section headlines |
| Heading 1 | Inter Variable | 32px (2.00rem) | 400 | 1.13 (tight) | -0.704px | Major section titles |
| Heading 2 | Inter Variable | 24px (1.50rem) | 400 | 1.33 | -0.288px | Sub-section headings |
| Heading 3 | Inter Variable | 20px (1.25rem) | 590 | 1.33 | -0.24px | Feature titles, card headers |
| Body Large | Inter Variable | 18px (1.13rem) | 400 | 1.60 (relaxed) | -0.165px | Introduction text, feature descriptions |
| Body Emphasis | Inter Variable | 17px (1.06rem) | 590 | 1.60 (relaxed) | normal | Emphasized body, sub-headings in content |
| Body | Inter Variable | 16px (1.00rem) | 400 | 1.50 | normal | Standard reading text |
| Body Medium | Inter Variable | 16px (1.00rem) | 510 | 1.50 | normal | Navigation, labels |
| Body Semibold | Inter Variable | 16px (1.00rem) | 590 | 1.50 | normal | Strong emphasis |
| Small | Inter Variable | 15px (0.94rem) | 400 | 1.60 (relaxed) | -0.165px | Secondary body text |
| Small Medium | Inter Variable | 15px (0.94rem) | 510 | 1.60 (relaxed) | -0.165px | Emphasized small text |
| Small Semibold | Inter Variable | 15px (0.94rem) | 590 | 1.60 (relaxed) | -0.165px | Strong small text |
| Small Light | Inter Variable | 15px (0.94rem) | 300 | 1.47 | -0.165px | De-emphasized body |
| Caption Large | Inter Variable | 14px (0.88rem) | 510–590 | 1.50 | -0.182px | Sub-labels, category headers |
| Caption | Inter Variable | 13px (0.81rem) | 400–510 | 1.50 | -0.13px | Metadata, timestamps |
| Label | Inter Variable | 12px (0.75rem) | 400–590 | 1.40 | normal | Button text, small labels |
| Micro | Inter Variable | 11px (0.69rem) | 510 | 1.40 | normal | Tiny labels |
| Tiny | Inter Variable | 10px (0.63rem) | 400–510 | 1.50 | -0.15px | Overline text, sometimes uppercase |
| Link Large | Inter Variable | 16px (1.00rem) | 400 | 1.50 | normal | Standard links |
| Link Medium | Inter Variable | 15px (0.94rem) | 510 | 2.67 | normal | Spaced navigation links |
| Link Small | Inter Variable | 14px (0.88rem) | 510 | 1.50 | normal | Compact links |
| Link Caption | Inter Variable | 13px (0.81rem) | 400–510 | 1.50 | -0.13px | Footer, metadata links |
| Mono Body | Berkeley Mono | 14px (0.88rem) | 400 | 1.50 | normal | Code blocks |
| Mono Caption | Berkeley Mono | 13px (0.81rem) | 400 | 1.50 | normal | Code labels |
| Mono Label | Berkeley Mono | 12px (0.75rem) | 400 | 1.40 | normal | Code metadata, sometimes uppercase |

### Principles
- **510 is the signature weight**: Linear 使用 Inter Variable 的 510 weight（介于 regular 400 与 medium 500 之间）作为默认 emphasis weight。它产生 subtle bolded feel，却没有传统 medium 或 semibold 的厚重。
- **Compression at scale**: Display sizes 使用逐步收紧的 letter-spacing：72px 为 -1.584px，64px 为 -1.408px，48px 为 -1.056px，32px 为 -0.704px。24px 以下逐渐回到 normal。
- **OpenType as identity**: `"cv01", "ss03"` 不是装饰；它们把 Inter 转化为 Linear 独特的 typeface，让它更 geometric、更 purposeful。
- **Three-tier weight system**: 400（reading）、510（emphasis/UI）、590（strong emphasis）。300 weight 只出现在刻意 de-emphasized 的上下文中。

## 4. Component Stylings

### Buttons

**Ghost Button (Default)**
- Background: `rgba(255,255,255,0.02)`
- Text: `#e2e4e7` (near-white)
- Padding: comfortable
- Radius: 6px
- Border: `1px solid rgb(36, 40, 44)`
- Outline: none
- Focus shadow: `rgba(0,0,0,0.1) 0px 4px 12px`
- Use: Standard actions, secondary CTAs

**Subtle Button**
- Background: `rgba(255,255,255,0.04)`
- Text: `#d0d6e0` (silver-gray)
- Padding: 0px 6px
- Radius: 6px
- Use: Toolbar actions, contextual buttons

**Primary Brand Button (Inferred)**
- Background: `#5e6ad2` (brand indigo)
- Text: `#ffffff`
- Padding: 8px 16px
- Radius: 6px
- Hover: shift 到 `#828fff`
- Use: Primary CTAs ("Start building", "Sign up")

**Icon Button (Circle)**
- Background: `rgba(255,255,255,0.03)` 或 `rgba(255,255,255,0.05)`
- Text: `#f7f8f8` 或 `#ffffff`
- Radius: 50%
- Border: `1px solid rgba(255,255,255,0.08)`
- Use: Close, menu toggle, icon-only actions

**Pill Button**
- Background: transparent
- Text: `#d0d6e0`
- Padding: 0px 10px 0px 5px
- Radius: 9999px
- Border: `1px solid rgb(35, 37, 42)`
- Use: Filter chips, tags, status indicators

**Small Toolbar Button**
- Background: `rgba(255,255,255,0.05)`
- Text: `#62666d` (muted)
- Radius: 2px
- Border: `1px solid rgba(255,255,255,0.05)`
- Shadow: `rgba(0,0,0,0.03) 0px 1.2px 0px 0px`
- Font: 12px weight 510
- Use: Toolbar actions, quick-access controls

### Cards & Containers
- Background: `rgba(255,255,255,0.02)` 到 `rgba(255,255,255,0.05)`（从不 solid；始终 translucent）
- Border: standard 为 `1px solid rgba(255,255,255,0.08)`，subtle 为 `1px solid rgba(255,255,255,0.05)`
- Radius: 8px（standard）、12px（featured）、22px（large panels）
- Shadow: `rgba(0,0,0,0.2) 0px 0px 0px 1px` 或 layered multi-shadow stacks
- Hover: subtle background opacity increase

### Inputs & Forms

**Text Area**
- Background: `rgba(255,255,255,0.02)`
- Text: `#d0d6e0`
- Border: `1px solid rgba(255,255,255,0.08)`
- Padding: 12px 14px
- Radius: 6px

**Search Input**
- Background: transparent
- Text: `#f7f8f8`
- Padding: 1px 32px（icon-aware）

**Button-style Input**
- Text: `#8a8f98`
- Padding: 1px 6px
- Radius: 5px
- Focus shadow: multi-layer stack

### Badges & Pills

**Success Pill**
- Background: `#10b981`
- Text: `#f7f8f8`
- Radius: 50% (circular)
- Font: 10px weight 510
- Use: Status dots, completion indicators

**Neutral Pill**
- Background: transparent
- Text: `#d0d6e0`
- Padding: 0px 10px 0px 5px
- Radius: 9999px
- Border: `1px solid rgb(35, 37, 42)`
- Font: 12px weight 510
- Use: Tags, filter chips, category labels

**Subtle Badge**
- Background: `rgba(255,255,255,0.05)`
- Text: `#f7f8f8`
- Padding: 0px 8px 0px 2px
- Radius: 2px
- Border: `1px solid rgba(255,255,255,0.05)`
- Font: 10px weight 510
- Use: Inline labels, version tags

### Navigation
- Near-black background 上的 dark sticky header
- Linear logomark left-aligned（SVG icon）
- Links: Inter Variable 13–14px weight 510，`#d0d6e0` text
- Active/hover: text 变亮为 `#f7f8f8`
- CTA: Brand indigo button 或 ghost button
- Mobile: hamburger collapse
- Search: command palette trigger（`/` 或 `Cmd+K`）

### Image Treatment
- Product screenshots 放在 dark backgrounds 上，带 subtle border（`rgba(255,255,255,0.08)`）
- Top-rounded images: `12px 12px 0px 0px` radius
- Dashboard/issue previews 主导 feature sections
- Screenshots 下方有 subtle shadow：`rgba(0,0,0,0.4) 0px 2px 4px`

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1px, 4px, 7px, 8px, 11px, 12px, 16px, 19px, 20px, 22px, 24px, 28px, 32px, 35px
- 7px 和 11px values 暗示用于 optical alignment 的 micro-adjustments
- Primary rhythm: 8px, 16px, 24px, 32px（standard 8px grid）

### Grid & Container
- Max content width: approximately 1200px
- Hero: centered single-column，带 generous vertical padding
- Feature sections: feature cards 使用 2–3 column grids
- Full-width dark sections，内部受 max-width constraints 限制
- Changelog: single-column timeline layout

### Whitespace Philosophy
- **Darkness as space**: 在 Linear 的 dark canvas 上，empty space 不是 white，而是 absence。Near-black background 本身就是 whitespace，content 从其中浮现。
- **Compressed headlines, expanded surroundings**: 72px、-1.584px tracking 的 display text 很 dense、compressed，但它坐落在 vast dark padding 中。Typographic density 与 spatial generosity 的对比创造张力。
- **Section isolation**: 每个 feature section 都用 generous vertical padding（80px+）分隔，没有 visible dividers；dark background 提供自然分离。

### Border Radius Scale
- Micro (2px): Inline badges, toolbar buttons, subtle tags
- Standard (4px): Small containers, list items
- Comfortable (6px): Buttons, inputs, functional elements
- Card (8px): Cards, dropdowns, popovers
- Panel (12px): Panels, featured cards, section containers
- Large (22px): Large panel elements
- Full Pill (9999px): Chips, filter pills, status tags
- Circle (50%): Icon buttons, avatars, status dots

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, `#010102` bg | Page background, deepest canvas |
| Subtle (Level 1) | `rgba(0,0,0,0.03) 0px 1.2px 0px` | Toolbar buttons, micro-elevation |
| Surface (Level 2) | `rgba(255,255,255,0.05)` bg + `1px solid rgba(255,255,255,0.08)` border | Cards, input fields, containers |
| Inset (Level 2b) | `rgba(0,0,0,0.2) 0px 0px 12px 0px inset` | Recessed panels, inner shadows |
| Ring (Level 3) | `rgba(0,0,0,0.2) 0px 0px 0px 1px` | Border-as-shadow technique |
| Elevated (Level 4) | `rgba(0,0,0,0.4) 0px 2px 4px` | Floating elements, dropdowns |
| Dialog (Level 5) | Multi-layer stack: `rgba(0,0,0,0) 0px 8px 2px, rgba(0,0,0,0.01) 0px 5px 2px, rgba(0,0,0,0.04) 0px 3px 2px, rgba(0,0,0,0.07) 0px 1px 1px, rgba(0,0,0,0.08) 0px 0px 1px` | Popovers, command palette, modals |
| Focus | `rgba(0,0,0,0.1) 0px 4px 12px` + additional layers | Keyboard focus on interactive elements |

**Shadow Philosophy**: 在 dark surfaces 上，traditional shadows（dark on dark）几乎不可见。Linear 通过 semi-transparent white borders 作为 primary depth indicator 来解决这个问题。Elevation 不是通过 shadow darkness 传达，而是通过 background luminance steps：每一层 surface background 的 white opacity 稍微增加（`0.02` → `0.04` → `0.05`），形成 subtle stacking effect。Inset shadow technique（`rgba(0,0,0,0.2) 0px 0px 12px 0px inset`）为 recessed panels 创造独特的 “sunken” effect，补足 traditional dark themes 缺少的 dimensional depth。

## 7. Do's and Don'ts

### Do
- 所有 text 都使用带 `"cv01", "ss03"` 的 Inter Variable；这些 features 是 Linear typeface identity 的基础
- 默认 emphasis weight 使用 510；这是 Linear 标志性的 between-weight
- Display sizes 使用 aggressive negative letter-spacing（72px 时 -1.584px，48px 时 -1.056px）
- 建立在 near-black backgrounds 上：marketing 用 `#08090a`，panels 用 `#0f1011`，elevated surfaces 用 `#191a1b`
- 使用 semi-transparent white borders（`rgba(255,255,255,0.05)` 到 `rgba(255,255,255,0.08)`），不要使用 solid dark borders
- Button backgrounds 保持近乎透明：`rgba(255,255,255,0.02)` 到 `rgba(255,255,255,0.05)`
- Brand indigo（`#5e6ad2` / `#7170ff`）只保留给 primary CTAs 和 interactive accents
- Primary text 使用 `#f7f8f8`；不要用过于刺眼的 pure `#ffffff`
- 应用 luminance stacking model：deeper = darker bg，elevated = slightly lighter bg

### Don't
- 不要把 pure white（`#ffffff`）作为 primary text；`#f7f8f8` 能防止 eye strain
- 不要给 buttons 使用 solid colored backgrounds；transparency 才是系统（rgba white at 0.02–0.05）
- 不要装饰性地使用 brand indigo；它只属于 interactive/CTA elements
- Display text 不要使用 positive letter-spacing；大尺寸 Inter 始终使用 negative
- Dark backgrounds 上不要用 visible/opaque borders；borders 应该 whisper-thin、semi-transparent white
- 不要跳过 OpenType features（`"cv01", "ss03"`）；没有它们就是 generic Inter，而不是 Linear 的 Inter
- 不要使用 weight 700 (bold)；Linear 最大 weight 是 590，510 是 workhorse
- UI chrome 中不要引入 warm colors；palette 是 cool gray 加 blue-violet accent
- Dark surfaces 上不要用 drop shadows 表达 elevation；改用 background luminance stepping

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | <600px | Single column, compact padding |
| Mobile | 600–640px | Standard mobile layout |
| Tablet | 640–768px | Two-column grids begin |
| Desktop Small | 768–1024px | Full card grids, expanded padding |
| Desktop | 1024–1280px | Standard desktop, full navigation |
| Large Desktop | >1280px | Full layout, generous margins |

### Touch Targets
- Buttons 使用 comfortable padding，radius minimum 为 6px
- Navigation links 为 13–14px，并保留 adequate spacing
- Pill tags 有 10px horizontal padding，以保证 touch accessibility
- Icon buttons 使用 50% radius，形成 circular、easy-to-tap targets
- Search trigger 位置醒目，并有 generous hit area

### Collapsing Strategy
- Hero: 72px → 48px → 32px display text，tracking 按比例调整
- Navigation: horizontal links + CTAs → 768px 时 hamburger menu
- Feature cards: 3-column → 2-column → single column stacked
- Product screenshots: 保持 aspect ratio，padding 可减少
- Changelog: timeline 在所有尺寸保持 single-column
- Footer: multi-column → stacked single column
- Section spacing: 80px+ → mobile 上 48px

### Image Behavior
- Dashboard screenshots 在所有尺寸保持 border treatment
- Hero visuals 在 mobile 上简化（减少 floating UI elements）
- Product screenshots 使用 responsive sizing，并保持 consistent radius
- Dark background 确保 screenshots 在任何 viewport 中自然融合

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: Brand Indigo (`#5e6ad2`)
- Page Background: Marketing Black (`#08090a`)
- Panel Background: Panel Dark (`#0f1011`)
- Surface: Level 3 (`#191a1b`)
- Heading text: Primary White (`#f7f8f8`)
- Body text: Silver Gray (`#d0d6e0`)
- Muted text: Tertiary Gray (`#8a8f98`)
- Subtle text: Quaternary Gray (`#62666d`)
- Accent: Violet (`#7170ff`)
- Accent Hover: Light Violet (`#828fff`)
- Border (default): `rgba(255,255,255,0.08)`
- Border (subtle): `rgba(255,255,255,0.05)`
- Focus ring: Multi-layer shadow stack

### Example Component Prompts
- "Create a hero section on `#08090a` background. Headline at 48px Inter Variable weight 510, line-height 1.00, letter-spacing -1.056px, color `#f7f8f8`, font-feature-settings `'cv01', 'ss03'`. Subtitle at 18px weight 400, line-height 1.60, color `#8a8f98`. Brand CTA button (`#5e6ad2`, 6px radius, 8px 16px padding) and ghost button (`rgba(255,255,255,0.02)` bg, `1px solid rgba(255,255,255,0.08)` border, 6px radius)."
- "Design a card on dark background: `rgba(255,255,255,0.02)` background, `1px solid rgba(255,255,255,0.08)` border, 8px radius. Title at 20px Inter Variable weight 590, letter-spacing -0.24px, color `#f7f8f8`. Body at 15px weight 400, color `#8a8f98`, letter-spacing -0.165px."
- "Build a pill badge: transparent background, `#d0d6e0` text, 9999px radius, 0px 10px padding, `1px solid #23252a` border, 12px Inter Variable weight 510."
- "Create navigation: dark sticky header on `#0f1011`. Inter Variable 13px weight 510 for links, `#d0d6e0` text. Brand indigo CTA `#5e6ad2` right-aligned with 6px radius. Bottom border: `1px solid rgba(255,255,255,0.05)`."
- "Design a command palette: `#191a1b` background, `1px solid rgba(255,255,255,0.08)` border, 12px radius, multi-layer shadow stack. Input at 16px Inter Variable weight 400, `#f7f8f8` text. Results list with 13px weight 510 labels in `#d0d6e0` and 12px metadata in `#62666d`."

### Iteration Guide
1. 始终在所有 Inter text 上设置 font-feature-settings `"cv01", "ss03"`；这是 Linear look 的硬要求
2. Letter-spacing 随 font size 缩放：72px 为 -1.584px，48px 为 -1.056px，32px 为 -0.704px，16px 以下为 normal
3. 三个 weights：400（read）、510（emphasize/navigate）、590（announce）
4. Surface elevation 通过 background opacity 表达：`rgba(255,255,255, 0.02 → 0.04 → 0.05)`；dark 上永远不要用 solid backgrounds
5. Brand indigo（`#5e6ad2` / `#7170ff`）是唯一 chromatic color；其他一切都是 grayscale
6. Borders 始终是 semi-transparent white；dark backgrounds 上不要使用 solid dark colors
7. 任何 code 或 technical content 使用 Berkeley Mono，其余全部使用 Inter Variable
