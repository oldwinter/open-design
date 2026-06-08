# Design System Inspired by SpaceX

> Category: Media & Consumer
> Space technology。Stark black and white、full-bleed imagery、futuristic。

## 1. Visual Theme & Atmosphere

SpaceX 的网站是一种 full-screen cinematic experience，把 aerospace engineering 当作电影来呈现：每个 section 都是一场 scene，每张 photograph 都是一帧，而 interface 完全消失在 imagery 之后。Design 是 pure black（`#000000`），rockets、space 和 planets 的 photography 占据 100% viewport。Text overlays 直接叠在照片上，没有 background panels、cards 或 containers；只有 image 上的 type，bold 且 unapologetic。

Typography system 使用 D-DIN，这是一种带 DIN heritage（德国工业标准）的 industrial geometric typeface。它的 defining characteristic 是几乎所有文字都 uppercase，并带 positive letter-spacing（0.96px-1.17px），形成 military/aerospace labeling system，让每个 word 都像 stencil 在 spacecraft hull 上。Hero 使用 48px D-DIN-Bold、uppercase 和 0.96px tracking，headline 读起来像 mission briefing title。即使 16px body text，也在较小尺度上保持 uppercase/tracked treatment。

SpaceX 的独特性来自 radical minimalism：no shadows、no borders（除了一个 `rgba(240,240,250,0.35)` 的 ghost button border）、no color（只有 black 和带 spectral 感的 near-white `#f0f0fa`）、no cards、no grids。唯一 visual element 是 photography + text。Ghost button 使用 `rgba(240,240,250,0.1)` background 和 32px radius，是唯一 interactive element；它几乎不可见，像 heads-up display 一样漂浮在 imagery 上。这不是传统意义上的 design system，而是带 type system 和单一 button 的 photographic exhibition。

**Key Characteristics:**
- Pure black canvas 搭配 full-viewport cinematic photography；interface 隐形
- D-DIN / D-DIN-Bold，带 industrial DIN-heritage 的 typeface
- Universal uppercase + positive letter-spacing（0.96px-1.17px），形成 aerospace stencil aesthetic
- Near-white spectral text（`#f0f0fa`），不是 pure white，而是略带 blue-violet tint
- Zero shadows、zero cards、zero containers；只在 image 上放 text
- Single ghost button：`rgba(240,240,250,0.1)` background，配 spectral border
- Full-viewport sections；每个 section 都是 cinematic "scene"
- 无 decorative elements；每个 pixel 都服务 photography

## 2. Color Palette & Roles

### Primary
- **Space Black** (`#000000`): Page background，space 的 void；overlay gradient 使用 50% opacity。
- **Spectral White** (`#f0f0fa`): Text color。不是 pure white，而是略带 blue-violet tint，模拟 starlight。

### Interactive
- **Ghost Surface** (`rgba(240, 240, 250, 0.1)`): Button background，几乎不可见，10% opacity。
- **Ghost Border** (`rgba(240, 240, 250, 0.35)`): Button border，spectral，35% opacity。
- **Hover White** (`var(--white-100)`): Link hover state，full spectral white。

### Gradient
- **Dark Overlay** (`rgba(0, 0, 0, 0.5)`): 照片上的 gradient overlay，用于确保 text legibility。

## 3. Typography Rules

### Font Families
- **Display**: `D-DIN-Bold`，bold industrial geometric
- **Body / UI**: `D-DIN`，fallbacks: `Arial, Verdana`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | D-DIN-Bold | 48px (3.00rem) | 700 | 1.00 (tight) | 0.96px | `text-transform: uppercase` |
| Body | D-DIN | 16px (1.00rem) | 400 | 1.50-1.70 | normal | Standard reading text |
| Nav Link Bold | D-DIN | 13px (0.81rem) | 700 | 0.94 (tight) | 1.17px | `text-transform: uppercase` |
| Nav Link | D-DIN | 12px (0.75rem) | 400 | 2.00 (relaxed) | normal | `text-transform: uppercase` |
| Caption Bold | D-DIN | 13px (0.81rem) | 700 | 0.94 (tight) | 1.17px | `text-transform: uppercase` |
| Caption | D-DIN | 12px (0.75rem) | 400 | 1.00 (tight) | normal | `text-transform: uppercase` |
| Micro | D-DIN | 10px (0.63rem) | 400 | 0.94 (tight) | 1px | `text-transform: uppercase` |

### Principles
- **Universal uppercase**: 几乎每个 text element 都使用 `text-transform: uppercase`。这会形成 systematic military/aerospace voice，让所有 communication 都像 official documentation。
- **Positive letter-spacing as identity**: Display 使用 0.96px，nav 使用 1.17px；wide tracking 形成 stenciled、industrial feel，并连接到 DIN 作为 German engineering standard 的 heritage。
- **Two weights, strict hierarchy**: D-DIN-Bold（700）用于 headlines 和 nav emphasis，D-DIN（400）用于 body。系统中没有 medium 或 semibold weights。
- **Tight line-heights**: 多数 text 使用 0.94-1.00，compressed、efficient，像 mission-critical communication。

## 4. Component Stylings

### Buttons

**Ghost Button**
- Background: `rgba(240, 240, 250, 0.1)`（barely visible）
- Text: Spectral White (`#f0f0fa`)
- Padding: 18px
- Radius: 32px
- Border: `1px solid rgba(240, 240, 250, 0.35)`
- Hover: background brightens, text to `var(--white-100)`
- Use: 唯一 button variant；photography 上的 "LEARN MORE" CTAs

### Cards & Containers
- **None.** SpaceX 不使用 cards、panels 或 containers。所有 content 都是直接放在 full-viewport photographs 上的 text。Absence of containers 本身就是 design。

### Inputs & Forms
- Homepage 上不存在。Site 是 purely presentational。

### Navigation
- Photography 上的 transparent overlay nav
- D-DIN 13px weight 700，uppercase，1.17px tracking
- Dark imagery 上使用 spectral white text
- Logo: SpaceX wordmark，147x19px
- Mobile: hamburger collapse

### Image Treatment
- Full-viewport（100vh）photography sections
- Professional aerospace photography：rockets、Mars、space
- Dark gradient overlays（`rgba(0,0,0,0.5)`）用于 text legibility
- 每个 section = 一张 full-screen photograph + text overlay
- 没有 border radius，没有 frames；edge-to-edge imagery

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 3px, 5px, 12px, 15px, 18px, 20px, 24px, 30px
- Minimal scale；spacing 不是组织原则，photography 才是

### Grid & Container
- 没有 traditional grid；每个 section 都是 full-viewport cinematic frame
- Text 通过 absolute positioning 或 generous padding 放在 imagery 上
- Photography backgrounds 上使用 left-aligned text blocks
- 没有 max-width container；content bleed 到 viewport edges

### Whitespace Philosophy
- **Photography IS the whitespace**: Design 中的 empty space 从不真正为空；它被 space 的 dark expanse、planet 的 curve 或 rocket engine 的 flame 填满。Traditional whitespace concepts 不适用。
- **Vertical pacing through viewport**: 每个 section 正好一屏高，创造 rhythmic scroll；每一 “page” 都揭示新的 scene。

### Border Radius Scale
- Sharp (4px): Small dividers、utility elements
- Button (32px): Ghost buttons，唯一 rounded element

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Photography (Level 0) | Full-viewport imagery | Background layer, always present |
| Overlay (Level 1) | `rgba(0, 0, 0, 0.5)` gradient | Text legibility layer over photography |
| Text (Level 2) | Spectral white text, no shadow | Content layer, text floats directly on image |
| Ghost (Level 3) | `rgba(240, 240, 250, 0.1)` surface | Barely-visible interactive layer |

**Shadow Philosophy**: SpaceX 使用 ZERO shadows。在一个完全建立于 photography 之上的 design 中，shadows 没有意义；每个 surface 本来就是带 natural lighting 的 photograph。Depth 来自 photographic content 本身：Earth 的 receding curvature、rocket 的 diminishing trail、Mars 周围的 atmospheric haze。

## 7. Do's and Don'ts

### Do
- 使用 full-viewport photography 作为 primary design element；每个 section 都是一场 scene
- 所有 text 使用 uppercase + positive letter-spacing；这是 aerospace stencil voice
- 只使用 D-DIN；系统中不存在其他 fonts
- Color palette 只保留 black + spectral white（`#f0f0fa`）
- 使用 ghost buttons（`rgba(240,240,250,0.1)`）作为唯一 interactive element
- 为 photographs 添加 dark gradient overlays，以保证 text legibility
- 让 photography 承载 emotional weight；type system 是 functional，不是 expressive

### Don't
- 不要添加 cards、panels 或 containers；text 直接放在 photography 上
- 不要使用 shadows；它们在 photographic context 中没有意义
- 不要引入 colors；palette 严格是带 spectral tint 的 achromatic
- 不要使用 sentence case；所有内容都 uppercase
- 不要使用 negative letter-spacing；所有 tracking 都是 positive（0.96px-1.17px）
- 不要把 photography 缩成 thumbnails；每张 image 都是 full-viewport
- 不要添加 decorative elements（icons、badges、dividers）；design = photography + type + one button

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <600px | Stacked, reduced padding, smaller type |
| Tablet Small | 600-960px | Adjusted layout |
| Tablet | 960-1280px | Standard scaling |
| Desktop | 1280-1350px | Full layout |
| Large Desktop | 1350-1500px | Expanded |
| Ultra-wide | >1500px | Maximum viewport |

### Touch Targets
- Ghost buttons: 18px padding 提供足够 touch area
- Navigation links: uppercase 与 generous letter-spacing 提升 readability

### Collapsing Strategy
- Photography: 所有尺寸保持 full-viewport，content reposition
- Hero text: 48px → 按比例缩小
- Navigation: horizontal → hamburger
- Text blocks: reposition，但保持 overlay-on-photography pattern
- Mobile 上仍保持 full-viewport sections

### Image Behavior
- 所有 viewport sizes 使用 edge-to-edge photography
- Background-size: cover，center focus
- Dark overlay gradients 根据 content position 调整
- 无 art direction changes；同一 photographs，responsive positioning

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: Space Black (`#000000`)
- Text: Spectral White (`#f0f0fa`)
- Button background: Ghost (`rgba(240, 240, 250, 0.1)`)
- Button border: Ghost Border (`rgba(240, 240, 250, 0.35)`)
- Overlay: `rgba(0, 0, 0, 0.5)`

### Example Component Prompts
- "Create a full-viewport hero: background-image covering 100vh, dark gradient overlay rgba(0,0,0,0.5). Headline at 48px D-DIN-Bold, uppercase, letter-spacing 0.96px, spectral white (#f0f0fa) text. Ghost CTA button: rgba(240,240,250,0.1) bg, 1px solid rgba(240,240,250,0.35) border, 32px radius, 18px padding."
- "Design a navigation: transparent over photography. D-DIN 13px weight 700, uppercase, letter-spacing 1.17px, spectral white text. SpaceX wordmark left-aligned."
- "Build a content section: full-viewport height, background photography with dark overlay. Left-aligned text block with 48px D-DIN-Bold uppercase heading, 16px D-DIN body text, and ghost button below."
- "Create a micro label: D-DIN 10px, uppercase, letter-spacing 1px, spectral white, line-height 0.94."

### Iteration Guide
1. 从 photography 开始；image 本身就是 design
2. 所有 text 都 uppercase，并带 positive letter-spacing；没有例外
3. 只有两种 colors：black 和 spectral white（#f0f0fa）
4. Ghost buttons 是唯一 interactive element：transparent、spectral-bordered
5. Zero shadows、zero cards、zero decorative elements
6. 每个 section 都是 full-viewport（100vh），形成 cinematic pacing
