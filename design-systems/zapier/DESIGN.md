# Design System Inspired by Zapier

> Category: Productivity & SaaS
> Automation platform。温暖 orange，friendly illustration-driven。

## 1. Visual Theme & Atmosphere

Zapier 的网站散发出温暖、亲近且专业的气质。它避开 developer tools 常见的冷调 monochrome minimalism，改用带 cream 色调的 canvas（`#fffefb`），感觉像未漂白的纸张，也就是数字版的井井有条 notebook。Near-black（`#201515`）文字带一点 reddish-brown 暖意，营造出比机械感更有人味的氛围。这是一种被设计成轻松无负担、而非技术门槛很高的 automation。

Typography system 有意让两种鲜明 personality 相互配合。**Degular Display** 这种 geometric、wide-set 的 display face 负责 56-80px hero-scale headlines，使用 medium weight（500）和极紧的 line-height（0.90），让 headline 像 stacked blocks 一样在垂直方向压缩。**Inter** 是其他所有内容的 workhorse，从 section headings 到 body text 和 navigation 都由它承担，并 fallback 到 Helvetica 与 Arial。**GT Alpina** 是优雅的 thin-weight serif，带强烈 negative letter-spacing（-1.6px 到 -1.92px），偶尔用于更柔和的 editorial moments。这个 three-font system 让 Zapier 可以灵活切换语域：从 bold and punchy（Degular），到 clean and functional（Inter），再到 refined and literary（GT Alpina）。

品牌标志性的 orange（`#ff4f00`）非常醒目：这是一种 vivid、saturated 的 red-orange，精确落在 traffic-cone urgency 与 sunset warmth 之间。它使用得克制但果断：primary CTA buttons、active state underlines 和 accent borders。与 warm cream background 搭配时，这个 orange 形成一种 energetic 但不 aggressive 的色彩关系。

**Key Characteristics:**
- Warm cream canvas（`#fffefb`）取代 pure white，带 organic、paper-like warmth
- 带 reddish undertone 的 near-black（`#201515`），让文字有呼吸感而不是压迫感
- Hero headlines 使用 Degular Display，0.90 line-height，compressed、impactful、modern
- Inter 作为所有 functional typography 的 universal UI font
- GT Alpina 用于 editorial accents，thin-weight serif，极强 negative tracking
- Zapier Orange（`#ff4f00`）作为唯一 accent，vivid、warm，并且 sparingly applied
- Warm neutral palette：borders（`#c5c0b1`）、muted text（`#939084`）、surface tints（`#eceae3`）
- 8px base spacing system，CTA 使用 generous padding（20px 24px）
- Border-forward design：用 warm grays 的 `1px solid` borders 定义结构，而不是 shadows

## 2. Color Palette & Roles

### Primary
- **Zapier Black** (`#201515`): Primary text、headings、dark button backgrounds。带 reddish undertones 的 warm near-black，绝不冰冷。
- **Cream White** (`#fffefb`): Page background、card surfaces、light button fills。不是 pure white；偏黄的 warmth 是有意为之。
- **Off-White** (`#fffdf9`): Secondary background surface、subtle alternate tint。几乎与 cream white 难以区分，但能制造 depth。

### Brand Accent
- **Zapier Orange** (`#ff4f00`): Primary CTA buttons、active underline indicators、accent borders。Signature color，vivid 且 warm。

### Neutral Scale
- **Dark Charcoal** (`#36342e`): Secondary text、footer text、strong dividers 的 border color。Warm dark gray-brown，并有 70% opacity variant。
- **Warm Gray** (`#939084`): Tertiary text、muted labels、timestamp-style content。中间调，带 greenish-warm undertone。
- **Sand** (`#c5c0b1`): Primary border color、hover state backgrounds、divider lines。Zapier structural elements 的 backbone。
- **Light Sand** (`#eceae3`): Secondary button backgrounds、light borders、subtle card surfaces。
- **Mid Warm** (`#b5b2aa`): Alternate border tone，用于特定 span elements。

### Interactive
- **Orange CTA** (`#ff4f00`): Primary action buttons 和 active tab underlines。
- **Dark CTA** (`#201515`): Secondary dark buttons，hover state 使用 sand。
- **Light CTA** (`#eceae3`): Tertiary/ghost buttons，hover 使用 sand。
- **Link Default** (`#201515`): Standard link color，与 body text 保持一致。
- **Hover Underline**: Links 在 hover 时移除 `text-decoration: underline`（inverse pattern）。

### Overlay & Surface
- **Semi-transparent Dark** (`rgba(45, 45, 46, 0.5)`): Overlay button variant、backdrop-like elements。
- **Pill Surface** (`#fffefb`): 带 sand borders 的 white pill buttons。

### Shadows & Depth
- **Inset Underline** (`rgb(255, 79, 0) 0px -4px 0px 0px inset`): Active tab indicator，使用 inset box-shadow 的 orange underline。
- **Hover Underline** (`rgb(197, 192, 177) 0px -4px 0px 0px inset`): Inactive tab hover，sand-colored underline。

## 3. Typography Rules

### Font Families
- **Display**: `Degular Display`，用于 hero headlines 的 wide geometric display face
- **Primary**: `Inter`，fallback: `Helvetica, Arial`
- **Editorial**: `GT Alpina`，用于 editorial moments 的 thin-weight serif
- **System**: `Arial`，用于 form elements 和 system UI 的 fallback

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero XL | Degular Display | 80px (5.00rem) | 500 | 0.90 (tight) | normal | Maximum impact, compressed block |
| Display Hero | Degular Display | 56px (3.50rem) | 500 | 0.90-1.10 (tight) | 0-1.12px | Primary hero headlines |
| Display Hero SM | Degular Display | 40px (2.50rem) | 500 | 0.90 (tight) | normal | Smaller hero variant |
| Display Button | Degular Display | 24px (1.50rem) | 600 | 1.00 (tight) | 1px | Large CTA button text |
| Section Heading | Inter | 48px (3.00rem) | 500 | 1.04 (tight) | normal | Major section titles |
| Editorial Heading | GT Alpina | 48px (3.00rem) | 250 | normal | -1.92px | Thin editorial headlines |
| Editorial Sub | GT Alpina | 40px (2.50rem) | 300 | 1.08 (tight) | -1.6px | Editorial subheadings |
| Sub-heading LG | Inter | 36px (2.25rem) | 500 | normal | -1px | Large sub-sections |
| Sub-heading | Inter | 32px (2.00rem) | 400 | 1.25 (tight) | normal | Standard sub-sections |
| Sub-heading MD | Inter | 28px (1.75rem) | 500 | normal | normal | Medium sub-headings |
| Card Title | Inter | 24px (1.50rem) | 600 | normal | -0.48px | Card headings |
| Body Large | Inter | 20px (1.25rem) | 400-500 | 1.00-1.20 (tight) | -0.2px | Feature descriptions |
| Body Emphasis | Inter | 18px (1.13rem) | 600 | 1.00 (tight) | normal | Emphasized body text |
| Body | Inter | 16px (1.00rem) | 400-500 | 1.20-1.25 | -0.16px | Standard reading text |
| Body Semibold | Inter | 16px (1.00rem) | 600 | 1.16 (tight) | normal | Strong labels |
| Button | Inter | 16px (1.00rem) | 600 | normal | normal | Standard buttons |
| Button SM | Inter | 14px (0.88rem) | 600 | normal | normal | Small buttons |
| Caption | Inter | 14px (0.88rem) | 500 | 1.25-1.43 | normal | Labels, metadata |
| Caption Upper | Inter | 14px (0.88rem) | 600 | normal | 0.5px | Uppercase section labels |
| Micro | Inter | 12px (0.75rem) | 600 | 0.90-1.33 | 0.5px | Tiny labels, often uppercase |
| Micro SM | Inter | 13px (0.81rem) | 500 | 1.00-1.54 | normal | Small metadata text |

### Principles
- **Three-font system, clear roles**: Degular Display 只在 hero scale 吸引注意力。Inter 处理所有 functional 内容。GT Alpina 少量加入 editorial warmth。
- **Compressed display**: Degular 的 0.90 line-height 会制造垂直压缩的 headline blocks，感觉 modern 且 architectural。
- **Weight as hierarchy signal**: Inter 使用 400（reading）、500（navigation/emphasis）、600（headings/CTAs）。Degular 使用 500（display）和 600（buttons）。
- **Uppercase for labels**: Section labels（例如 "01 / Colors"）和小型分类使用 `text-transform: uppercase`，并配 0.5px letter-spacing。
- **Negative tracking for elegance**: GT Alpina 在 thin-weight editorial headlines 中使用 -1.6px 到 -1.92px letter-spacing。

## 4. Component Stylings

### Buttons

**Primary Orange**
- Background: `#ff4f00`
- Text: `#fffefb`
- Padding: 8px 16px
- Radius: 4px
- Border: `1px solid #ff4f00`
- Use: Primary CTA（"Start free with email", "Sign up free"）

**Primary Dark**
- Background: `#201515`
- Text: `#fffefb`
- Padding: 20px 24px
- Radius: 8px
- Border: `1px solid #201515`
- Hover: background shifts to `#c5c0b1`, text to `#201515`
- Use: Large secondary CTA buttons

**Light / Ghost**
- Background: `#eceae3`
- Text: `#36342e`
- Padding: 20px 24px
- Radius: 8px
- Border: `1px solid #c5c0b1`
- Hover: background shifts to `#c5c0b1`, text to `#201515`
- Use: Tertiary actions、filter buttons

**Pill Button**
- Background: `#fffefb`
- Text: `#36342e`
- Padding: 0px 16px
- Radius: 20px
- Border: `1px solid #c5c0b1`
- Use: Tag-like selections、filter pills

**Overlay Semi-transparent**
- Background: `rgba(45, 45, 46, 0.5)`
- Text: `#fffefb`
- Radius: 20px
- Hover: background becomes fully opaque `#2d2d2e`
- Use: Video play buttons、floating actions

**Tab / Navigation (Inset Shadow)**
- Background: transparent
- Text: `#201515`
- Padding: 12px 16px
- Shadow: `rgb(255, 79, 0) 0px -4px 0px 0px inset`（active orange underline）
- Hover shadow: `rgb(197, 192, 177) 0px -4px 0px 0px inset`（sand underline）
- Use: Horizontal tab navigation

### Cards & Containers
- Background: `#fffefb`
- Border: `1px solid #c5c0b1`（warm sand border）
- Radius: 5px（standard）、8px（featured）
- 默认没有 shadow elevation；由 borders 定义 containment
- Hover: 轻微强化 border color

### Inputs & Forms
- Background: `#fffefb`
- Text: `#201515`
- Border: `1px solid #c5c0b1`
- Radius: 5px
- Focus: border color shifts to `#ff4f00`（orange）
- Placeholder: `#939084`

### Navigation
- Cream background 上的 clean horizontal nav
- Zapier logotype left-aligned，104x28px
- Links: Inter 16px weight 500，`#201515` text
- CTA: Orange button（"Start free with email"）
- Tab navigation 使用 inset box-shadow underline technique
- Mobile: hamburger collapse

### Image Treatment
- Product screenshots 使用 `1px solid #c5c0b1` border
- Rounded corners: 5-8px
- Dashboard/workflow screenshots 在 feature sections 中保持 prominent
- Hero content 背后使用 light gradient backgrounds

### Distinctive Components

**Workflow Integration Cards**
- 成对展示 connected app icons
- Apps 之间放 arrow 或 connection indicator
- 使用 sand border containment
- App names 使用 Inter weight 500

**Stat Counter**
- Large display number 使用 Inter 48px weight 500
- 下方 description 使用 muted `#36342e`
- 用于 social proof metrics

**Social Proof Icons**
- Circular icon buttons: 14px radius
- Sand border: `1px solid #c5c0b1`
- 用于 footer 中的 social media follow links

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1px, 4px, 6px, 8px, 10px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 56px, 64px, 72px
- CTA buttons 使用 generous padding：large 为 20px 24px，standard 为 8px 16px
- Section padding: 64px-80px vertical

### Grid & Container
- Max content width: 约 1200px
- Hero: centered single-column，并使用 large top padding
- Feature sections: integration cards 使用 2-3 column grids
- Sections 之间使用 full-width sand-bordered dividers
- Footer: multi-column dark background（`#201515`）

### Whitespace Philosophy
- **Warm breathing room**: Sections 之间使用 generous vertical spacing（64px-80px），但 content areas 相对 dense；Zapier 在 cream canvas 内高效承载信息。
- **Architectural compression**: Degular Display headlines 以 0.90 line-height 垂直压缩，与周围 open spacing 形成对比。
- **Section rhythm**: Cream background 贯穿全页，sections 通过 sand-colored borders 分隔，而不是改变 background color。

### Border Radius Scale
- Tight (3px): Small inline spans
- Standard (4px): Buttons（orange CTA）、tags、小元素
- Content (5px): Cards、links、general containers
- Comfortable (8px): Featured cards、large buttons、tabs
- Social (14px): Social icon buttons、pill-like elements
- Pill (20px): Play buttons、large pill buttons、floating actions

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Page background, text blocks |
| Bordered (Level 1) | `1px solid #c5c0b1` | Standard cards, containers, inputs |
| Strong Border (Level 1b) | `1px solid #36342e` | Dark dividers, emphasized sections |
| Active Tab (Level 2) | `rgb(255, 79, 0) 0px -4px 0px 0px inset` | Active tab underline (orange) |
| Hover Tab (Level 2b) | `rgb(197, 192, 177) 0px -4px 0px 0px inset` | Hover tab underline (sand) |
| Focus (Accessibility) | `1px solid #ff4f00` outline | Focus ring on interactive elements |

**Shadow Philosophy**: Zapier 有意避开传统 shadow-based elevation。结构几乎完全通过 borders 定义：standard containment 使用 warm sand（`#c5c0b1`）borders，emphasis 使用 dark charcoal（`#36342e`）borders。唯一类似 shadow 的 technique 是 tab underlines 使用 inset box-shadow，其中 `0px -4px 0px 0px inset` shadow 形成 bottom-bar indicator。这种 border-first approach 让设计保持 grounded、tangible，而不是 floating。

### Decorative Depth
- Active tabs 上的 orange inset underline 在元素底部制造视觉 "weight"
- Sand hover underlines 提供不会造成 layout shifts 的 preview states
- Main content 中不使用 background gradients；cream canvas 保持一致
- Footer 使用完整 dark background（`#201515`）来反转 contrast

## 7. Do's and Don'ts

### Do
- 只把 Degular Display 用于 hero-scale headlines（40px+），并以 0.90 line-height 形成 compressed impact
- 所有 functional UI 使用 Inter：navigation、body text、buttons、labels
- 使用 warm cream（`#fffefb`）作为 background，绝不使用 pure white
- 文字使用 `#201515`，不要用 pure black；reddish warmth 很重要
- 让 Zapier Orange（`#ff4f00`）只服务于 primary CTAs 和 active state indicators
- 使用 sand（`#c5c0b1`）borders 作为主要 structural element，而不是 shadows
- Large CTAs 使用 generous button padding（20px 24px），匹配 Zapier 的 spacious button style
- Tab navigation 使用 inset box-shadow underlines，而不是 border-bottom
- Section labels 和 micro-categorization 使用 uppercase 与 0.5px letter-spacing

### Don't
- 不要把 Degular Display 用于 body text 或 UI elements；它只用于 display
- 不要使用 pure white（`#ffffff`）或 pure black（`#000000`）；Zapier palette 是 warm-shifted
- 不要给 cards 使用 box-shadow elevation；改用 borders
- 不要在整个 UI 中到处散布 Zapier Orange；它只保留给 CTAs 和 active states
- 不要让 large CTA buttons padding 过紧；Zapier buttons 是有意 spacious
- 不要忽略 warm neutral system；borders 应该是 `#c5c0b1`，而不是 gray
- 不要把 GT Alpina 用于 functional UI；它只是 thin weights 下的 editorial accent
- 不要给 GT Alpina 使用 positive letter-spacing；它使用 aggressive negative tracking（-1.6px 到 -1.92px）
- 不要给 primary buttons 使用 rounded pill shapes（9999px）；pills 用于 tags 和 social icons

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | <450px | Tight single column, reduced hero text |
| Mobile | 450-600px | Standard mobile, stacked layout |
| Mobile Large | 600-640px | Slight horizontal breathing room |
| Tablet Small | 640-680px | 2-column grids begin |
| Tablet | 680-768px | Card grids expand |
| Tablet Large | 768-991px | Full card grids, expanded padding |
| Desktop Small | 991-1024px | Desktop layout initiates |
| Desktop | 1024-1280px | Full layout, maximum content width |
| Large Desktop | >1280px | Centered with generous margins |

### Touch Targets
- Large CTA buttons: 20px 24px padding（comfortable 60px+ height）
- Standard buttons: 8px 16px padding
- Navigation links: 16px weight 500，spacing 充足
- Social icons: 14px radius circular buttons
- Tab items: 12px 16px padding

### Collapsing Strategy
- Hero: Degular 80px display 在较小屏幕缩放到 40-56px
- Navigation: horizontal links + CTA collapse to hamburger menu
- Feature cards: 3-column grid 到 2-column，再到 single-column stacked
- Integration workflow illustrations: 保持 aspect ratio，必要时可简化
- Footer: multi-column dark section collapse to stacked
- Section spacing: 64-80px 在 mobile 上降到 40-48px

### Image Behavior
- Product screenshots 在所有尺寸保持 sand border treatment
- Integration app icons 在 responsive containers 内保持 fixed sizes
- Hero illustrations 按比例缩放
- Full-width sections 保持 edge-to-edge treatment

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: Zapier Orange (`#ff4f00`)
- Background: Cream White (`#fffefb`)
- Heading text: Zapier Black (`#201515`)
- Body text: Dark Charcoal (`#36342e`)
- Border: Sand (`#c5c0b1`)
- Secondary surface: Light Sand (`#eceae3`)
- Muted text: Warm Gray (`#939084`)

### Example Component Prompts
- "Create a hero section on cream background (`#fffefb`). Headline at 56px Degular Display weight 500, line-height 0.90, color `#201515`. Subtitle at 20px Inter weight 400, line-height 1.20, color `#36342e`. Orange CTA button (`#ff4f00`, 4px radius, 8px 16px padding, white text) and dark button (`#201515`, 8px radius, 20px 24px padding, white text)."
- "Design a card: cream background (`#fffefb`), `1px solid #c5c0b1` border, 5px radius. Title at 24px Inter weight 600, letter-spacing -0.48px, `#201515`. Body at 16px weight 400, `#36342e`. No box-shadow."
- "Build a tab navigation: transparent background. Inter 16px weight 500, `#201515` text. Active tab: `box-shadow: rgb(255, 79, 0) 0px -4px 0px 0px inset`. Hover: `box-shadow: rgb(197, 192, 177) 0px -4px 0px 0px inset`. Padding 12px 16px."
- "Create navigation: cream sticky header (`#fffefb`). Inter 16px weight 500 for links, `#201515` text. Orange pill CTA 'Start free with email' right-aligned (`#ff4f00`, 4px radius, 8px 16px padding)."
- "Design a footer with dark background (`#201515`). Text `#fffefb`. Links in `#c5c0b1` with hover to `#fffefb`. Multi-column layout. Social icons as 14px-radius circles with sand borders."

### Iteration Guide
1. 始终使用 warm cream（`#fffefb`）background，绝不使用 pure white；这种 warmth 定义了 Zapier
2. Borders（`1px solid #c5c0b1`）是 structural backbone；避免 shadow elevation
3. Zapier Orange（`#ff4f00`）是唯一 accent color；其他全部使用 warm neutrals
4. Three fonts，strict roles：Degular Display（hero）、Inter（UI）、GT Alpina（editorial）
5. Large CTA buttons 需要 generous padding（20px 24px）；Zapier buttons 要显得 spacious
6. Tab navigation 使用 inset box-shadow underlines，而不是 border-bottom
7. Text 始终是 warm：dark 使用 `#201515`，body 使用 `#36342e`，muted 使用 `#939084`
8. Section categorization 使用 12-14px uppercase labels，并配 0.5px letter-spacing
