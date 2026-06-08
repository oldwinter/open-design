# Inspired by Spotify 的 Design System

> Category: Media & Consumer
> Music streaming。深色上的鲜明绿色、bold type、album-art-driven。

## 1. Visual Theme & Atmosphere

Spotify 的 web interface 是一个深色、沉浸式的 music player，用 near-black cocoon（`#121212`, `#181818`, `#1f1f1f`）包裹听众，让 album art 和内容成为主要色彩来源。设计哲学是 "content-first darkness"：UI 退入阴影，让 music、podcasts 和 playlists 发光。每个 surface 都是 charcoal 的某个 shade，形成 theater-like environment，唯一真正的颜色来自标志性的 Spotify Green (`#1ed760`) 和 album artwork 本身。

Typography 使用 SpotifyMixUI 和 SpotifyMixUITitle，它们是 CircularSp family 的 proprietary fonts（Lineto 的 Circular，经 Spotify 定制），带有覆盖 Arabic、Hebrew、Cyrillic、Greek、Devanagari 和 CJK fonts 的 extensive fallback stack，反映 Spotify 的全球覆盖。Type system compact 且 functional：700 (bold) 用于 emphasis 和 navigation，600 (semibold) 用于 secondary emphasis，400 (regular) 用于 body。Buttons 使用 uppercase 加 positive letter-spacing（1.4px-2px），形成系统化、label-like 的语气。

Spotify 的区分点是 pill-and-circle geometry。Primary buttons 使用 500px-9999px radius（full pill），circular play buttons 使用 50% radius，search inputs 是 500px pills。再加上 elevated elements 上的 heavy shadows（`rgba(0,0,0,0.5) 0px 8px 24px`）和独特的 inset border-shadow combo（`rgb(18,18,18) 0px 1px 0px, rgb(124,124,124) 0px 0px 0px 1px inset`），最终界面像一台 premium audio device：触感明确、圆润、为 touch 而生。

**Key Characteristics:**
- Near-black immersive dark theme（`#121212`-`#1f1f1f`），UI 隐入内容背后
- Spotify Green (`#1ed760`) 作为唯一 brand accent，只功能性使用，绝不装饰性使用
- SpotifyMixUI/CircularSp font family，支持 global scripts
- Pill buttons（500px-9999px）和 circular controls（50%），圆润且 touch-optimized
- Uppercase button labels，带宽 letter-spacing（1.4px-2px）
- Elevated elements 使用 heavy shadows（`rgba(0,0,0,0.5) 0px 8px 24px`）
- Semantic colors: negative red (`#f3727f`)、warning orange (`#ffa42b`)、announcement blue (`#539df5`)
- Album art 是主要颜色来源；UI 本身按设计保持 achromatic

## 2. Color Palette & Roles

### Primary Brand
- **Spotify Green** (`#1ed760`): Primary brand accent，用于 play buttons、active states、CTAs
- **Near Black** (`#121212`): 最深 background surface
- **Dark Surface** (`#181818`): Cards、containers、elevated surfaces
- **Mid Dark** (`#1f1f1f`): Button backgrounds、interactive surfaces

### Text
- **White** (`#ffffff`): `--text-base`，primary text
- **Silver** (`#b3b3b3`): Secondary text、muted labels、inactive nav
- **Near White** (`#cbcbcb`): 稍亮的 secondary text
- **Light** (`#fdfdfd`): 用于最高强调的 near-pure white

### Semantic
- **Negative Red** (`#f3727f`): `--text-negative`，error states
- **Warning Orange** (`#ffa42b`): `--text-warning`，warning states
- **Announcement Blue** (`#539df5`): `--text-announcement`，info states

### Surface & Border
- **Dark Card** (`#252525`): Elevated card surface
- **Mid Card** (`#272727`): Alternate card surface
- **Border Gray** (`#4d4d4d`): 深色上的 button borders
- **Light Border** (`#7c7c7c`): Outlined button borders、muted links
- **Separator** (`#b3b3b3`): Divider lines
- **Light Surface** (`#eeeeee`): Light-mode buttons（少见）
- **Spotify Green Border** (`#1db954`): Green accent border variant

### Shadows
- **Heavy** (`rgba(0,0,0,0.5) 0px 8px 24px`): Dialogs、menus、elevated panels
- **Medium** (`rgba(0,0,0,0.3) 0px 8px 8px`): Cards、dropdowns
- **Inset Border** (`rgb(18,18,18) 0px 1px 0px, rgb(124,124,124) 0px 0px 0px 1px inset`): Input border-shadow combo

## 3. Typography Rules

### Font Families
- **Title**: `SpotifyMixUITitle`, fallbacks: `CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl, CircularSp-Grek, CircularSp-Deva, Helvetica Neue, helvetica, arial, Hiragino Sans, Hiragino Kaku Gothic ProN, Meiryo, MS Gothic`
- **UI / Body**: `SpotifyMixUI`，使用同一 fallback stack

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Section Title | SpotifyMixUITitle | 24px (1.50rem) | 700 | normal | normal | Bold title weight |
| Feature Heading | SpotifyMixUI | 18px (1.13rem) | 600 | 1.30 (tight) | normal | Semibold section heads |
| Body Bold | SpotifyMixUI | 16px (1.00rem) | 700 | normal | normal | Emphasized text |
| Body | SpotifyMixUI | 16px (1.00rem) | 400 | normal | normal | Standard body |
| Button Uppercase | SpotifyMixUI | 14px (0.88rem) | 600-700 | 1.00 (tight) | 1.4px-2px | `text-transform: uppercase` |
| Button | SpotifyMixUI | 14px (0.88rem) | 700 | normal | 0.14px | Standard button |
| Nav Link Bold | SpotifyMixUI | 14px (0.88rem) | 700 | normal | normal | Navigation |
| Nav Link | SpotifyMixUI | 14px (0.88rem) | 400 | normal | normal | Inactive nav |
| Caption Bold | SpotifyMixUI | 14px (0.88rem) | 700 | 1.50-1.54 | normal | Bold metadata |
| Caption | SpotifyMixUI | 14px (0.88rem) | 400 | normal | normal | Metadata |
| Small Bold | SpotifyMixUI | 12px (0.75rem) | 700 | 1.50 | normal | Tags, counts |
| Small | SpotifyMixUI | 12px (0.75rem) | 400 | normal | normal | Fine print |
| Badge | SpotifyMixUI | 10.5px (0.66rem) | 600 | 1.33 | normal | `text-transform: capitalize` |
| Micro | SpotifyMixUI | 10px (0.63rem) | 400 | normal | normal | Smallest text |

### Principles
- **Bold/regular binary**: 大多数文本要么是 700 (bold)，要么是 400 (regular)，600 只少量使用。Hierarchy 主要通过 weight contrast，而不是 size variation 建立。
- **Uppercase buttons as system**: Button labels 使用 uppercase + wide letter-spacing（1.4px-2px），形成区别于 content text 的系统化 "label" voice。
- **Compact sizing**: 范围是 10px-24px，比多数系统更窄。Spotify 的 type compact 且 functional，为扫描 playlists 而设计，不是为阅读文章而设计。
- **Global script support**: Extensive fallback stack（Arabic、Hebrew、Cyrillic、Greek、Devanagari、CJK）反映 Spotify 覆盖 180+ markets。

## 4. Component Stylings

### Buttons

**Dark Pill**
- Background: `#1f1f1f`
- Text: `#ffffff` 或 `#b3b3b3`
- Padding: 8px 16px
- Radius: 9999px (full pill)
- Use: Navigation pills、secondary actions

**Dark Large Pill**
- Background: `#181818`
- Text: `#ffffff`
- Padding: 0px 43px
- Radius: 500px
- Use: Primary app navigation buttons

**Light Pill**
- Background: `#eeeeee`
- Text: `#181818`
- Radius: 500px
- Use: Light-mode CTAs（cookie consent、marketing）

**Outlined Pill**
- Background: transparent
- Text: `#ffffff`
- Border: `1px solid #7c7c7c`
- Padding: 4px 16px 4px 36px（为 icon 非对称留白）
- Radius: 9999px
- Use: Follow buttons、secondary actions

**Circular Play**
- Background: `#1f1f1f`
- Text: `#ffffff`
- Padding: 12px
- Radius: 50% (circle)
- Use: Play/pause controls

### Cards & Containers
- Background: `#181818` 或 `#1f1f1f`
- Radius: 6px-8px
- 大多数 cards 无 visible borders
- Hover: background 略微变亮
- Shadow: elevated 时使用 `rgba(0,0,0,0.3) 0px 8px 8px`

### Inputs
- Search input: `#1f1f1f` background、`#ffffff` text
- Radius: 500px (pill)
- Padding: 12px 96px 12px 48px（icon-aware）
- Focus: border 变为 `#000000`，outline `1px solid`

### Navigation
- Dark sidebar，active 使用 SpotifyMixUI 14px weight 700，inactive 使用 400
- Inactive items 使用 `#b3b3b3` muted color，active 使用 `#ffffff`
- Circular icon buttons（50% radius）
- Spotify logo 位于 top-left，使用 green

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1px, 2px, 3px, 4px, 5px, 6px, 8px, 10px, 12px, 14px, 15px, 16px, 20px

### Grid & Container
- Sidebar（fixed）+ main content area
- 基于 grid 的 album/playlist cards
- 底部 full-width now-playing bar
- Responsive content area 填充剩余空间

### Whitespace Philosophy
- **Dark compression**: Spotify 会密集打包内容：playlist grids、track lists 和 navigation 都保持紧凑。Dark background 自身提供视觉休息，不需要大间距。
- **Content density over breathing room**: 这是 app，不是 marketing site。每个像素都服务于 listening experience。

### Border Radius Scale
- Minimal (2px): Badges、explicit tags
- Subtle (4px): Inputs、小型 elements
- Standard (6px): Album art containers、cards
- Comfortable (8px): Sections、dialogs
- Medium (10px-20px): Panels、overlay elements
- Large (100px): Large pill buttons
- Pill (500px): Primary buttons、search input
- Full Pill (9999px): Navigation pills、search
- Circle (50%): Play buttons、avatars、icons

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Base (Level 0) | `#121212` background | Deepest layer, page background |
| Surface (Level 1) | `#181818` or `#1f1f1f` | Cards, sidebar, containers |
| Elevated (Level 2) | `rgba(0,0,0,0.3) 0px 8px 8px` | Dropdown menus, hover cards |
| Dialog (Level 3) | `rgba(0,0,0,0.5) 0px 8px 24px` | Modals, overlays, menus |
| Inset (Border) | `rgb(18,18,18) 0px 1px 0px, rgb(124,124,124) 0px 0px 0px 1px inset` | Input borders |

**Shadow Philosophy**: 对一个 dark-themed app 来说，Spotify 使用的 shadows 相当重。24px blur、0.5 opacity 的 shadow 为 dialogs 和 menus 创造戏剧性的“floating in darkness”效果；8px blur、0.3 opacity 则为 cards 提供更细微的 lift。Inputs 上独特的 inset border-shadow combination 创造 recessed、tactile 的质感。

## 7. Do's and Don'ts

### Do
- 使用 near-black backgrounds（`#121212`-`#1f1f1f`），通过 shade variation 建立 depth
- Spotify Green (`#1ed760`) 只用于 play controls、active states 和 primary CTAs
- 所有 buttons 使用 pill shape（500px-9999px），play controls 使用 circular（50%）
- Button labels 应用 uppercase + wide letter-spacing（1.4px-2px）
- Typography 保持 compact（10px-24px range）；这是 app，不是 magazine
- 深色背景上的 elevated elements 使用 heavy shadows（`0.3-0.5 opacity`）
- 让 album art 提供颜色；UI 本身保持 achromatic

### Don't
- 不要装饰性使用 Spotify Green，也不要把它用作 backgrounds；它只承担功能
- 不要把 light backgrounds 用于 primary surfaces；dark immersion 是核心
- 不要跳过 buttons 上的 pill/circle geometry；square buttons 会破坏身份
- 不要使用 thin/subtle shadows；深色背景上 shadows 必须更重才可见
- 不要添加额外 brand colors；green + achromatic grays 就是完整 palette
- 不要使用 relaxed line-heights；Spotify typography compact 且 dense
- 不要暴露 raw gray borders；改用 shadow-based 或 inset borders

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | <425px | Compact mobile layout |
| Mobile | 425-576px | Standard mobile |
| Tablet | 576-768px | 2-column grid |
| Tablet Large | 768-896px | Expanded layout |
| Desktop Small | 896-1024px | Sidebar visible |
| Desktop | 1024-1280px | Full desktop layout |
| Large Desktop | >1280px | Expanded grid |

### Collapsing Strategy
- Sidebar: full -> collapsed -> hidden
- Album grid: 5 columns -> 3 -> 2 -> 1
- Now-playing bar: 所有 sizes 保持
- Search: 保持 pill input，width 调整
- Navigation: mobile 上 sidebar -> bottom bar

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: Near Black (`#121212`)
- Surface: Dark Card (`#181818`)
- Text: White (`#ffffff`)
- Secondary text: Silver (`#b3b3b3`)
- Accent: Spotify Green (`#1ed760`)
- Border: `#4d4d4d`
- Error: Negative Red (`#f3727f`)

### Example Component Prompts
- "Create a dark card: #181818 background, 8px radius. Title at 16px SpotifyMixUI weight 700, white text. Subtitle at 14px weight 400, #b3b3b3. Shadow rgba(0,0,0,0.3) 0px 8px 8px on hover."
- "Design a pill button: #1f1f1f background, white text, 9999px radius, 8px 16px padding. 14px SpotifyMixUI weight 700, uppercase, letter-spacing 1.4px."
- "Build a circular play button: Spotify Green (#1ed760) background, #000000 icon, 50% radius, 12px padding."
- "Create search input: #1f1f1f background, white text, 500px radius, 12px 48px padding. Inset border: rgb(124,124,124) 0px 0px 0px 1px inset."
- "Design navigation sidebar: #121212 background. Active items: 14px weight 700, white. Inactive: 14px weight 400, #b3b3b3."

### Iteration Guide
1. 从 #121212 开始；一切都生活在 near-black darkness 中
2. Spotify Green 只用于 functional highlights（play、active、CTA）
3. 一切都 pill 化：large 用 500px，small 用 9999px，circular 用 50%
4. Buttons 使用 uppercase + wide tracking，形成 systematic label voice
5. Elevation 使用 heavy shadows（0.3-0.5 opacity）；light shadows 在 dark 上不可见
6. Album art 提供全部颜色；UI 保持 achromatic
