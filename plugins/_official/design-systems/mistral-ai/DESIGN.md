# Inspired by Mistral AI 的 Design System

> Category: AI & LLM
> Open-weight LLM provider。French-engineered minimalism，purple-toned。

## 1. Visual Theme & Atmosphere

Mistral AI 的界面像用代码渲染出的阳光景观：温暖、大胆、毫不遮掩的 European design，用 golden amber、burnt orange 和法国南部午后光线的感觉，取代典型 blue-screen AI aesthetic。每个 surface 都带着暖光：backgrounds 从 pale cream 过渡到 deep amber，shadows 带 golden undertones（`rgba(127, 99, 21, ...)`），品牌标志性的 orange（`#fa520f`）像 signal fire 一样穿透页面。

Design language 在温度上 maximalist，在结构上 minimalist。Huge display headlines（82px）以 aggressive negative tracking（-2.05px）撞入 viewport，形成像 billboard 或 protest poster 的文本块：它们是 declarations，而不是 descriptions。Typography 使用 Arial（可能是 custom font，以 Arial 作为 fallback）并放到极端尺寸，形成 raw、unadorned 的声音，像是在说“we build frontier AI”，无需任何装饰。

Mistral 的独特之处在于彻底承诺 warm color temperature。标志性的 "block" identity 是一套 gradient system，从 bright yellow（`#ffd900`）流向 amber（`#ffa110`）再到 burnt orange（`#fa520f`），形成一眼可识别的视觉身份。就连 shadows 也是温暖的，使用 amber-tinted blacks，而不是 cool grays。再加上 golden tones 的 dramatic landscape photography，整体感觉不像典型科技公司，而像一家恰好构建 language models 的 European luxury brand。

**Key Characteristics:**
- Golden-amber color universe：从 pale cream (#fffaeb) 到 burnt orange (#fa520f)
- Massive display typography（82px），带 aggressive negative letter-spacing（-2.05px）
- Warm golden shadow system，使用 amber-tinted rgba values
- Mistral "M" block identity：从 yellow 到 orange 的 gradient
- Dramatic landscape photography，使用 warm golden tones
- Uppercase typography 战略性用于 section labels 和 CTAs
- Near-zero border-radius，sharp architectural geometry
- French-European confidence：bold、warm、declarative

## 2. Color Palette & Roles

### Primary
- **Mistral Orange** (`#fa520f`): 核心 brand color，鲜明饱和的 orange-red，锚定整个 identity。用于 primary emphasis、brand block 和最高信号时刻。
- **Mistral Flame** (`#fb6424`): Brand orange 稍暖、稍亮的变体，用于 secondary brand moments 和 hover states。
- **Block Orange** (`#ff8105`): 用于 gradient block system 的 pure orange，比 Mistral Orange 更暖、更少红色。

### Secondary & Accent
- **Sunshine 900** (`#ff8a00`): Deep golden amber，最深的 sunshine tone，用于强 accent moments。
- **Sunshine 700** (`#ffa110`): Warm amber-gold，backgrounds 和 interactive elements 的核心 sunshine accent。
- **Sunshine 500** (`#ffb83e`): Medium golden，用于 mid-level emphasis 的平衡暖色。
- **Sunshine 300** (`#ffd06a`): Light golden，用于 subtle warm tints 和 secondary backgrounds。
- **Block Gold** (`#ffe295`): Pale gold，用于 soft background accents 和 gentle warmth。
- **Bright Yellow** (`#ffd900`): Gradient 中最亮的 tone，用在 block identity 的“顶部”。

### Surface & Background
- **Warm Ivory** (`#fffaeb`): 最浅 page background，带几乎不可察觉的暖色，是基础 canvas。
- **Cream** (`#fff0c2`): Primary warm surface 和 secondary button background，明显带 golden 感。
- **Pure White** (`#ffffff`): 用于 maximum contrast elements 和 popover surfaces。
- **Mistral Black** (`#1f1f1f`): Buttons、text 和 dark sections 的 primary dark surface。
- **Accent Orange**（定义为 `hsl(17, 96%, 52%)`）: Interactive states 的 functional accent color。

### Neutrals & Text
- **Mistral Black** (`#1f1f1f`): Primary text color 和 dark button backgrounds，是比 pure #000 更暖的 near-black。
- **Black Tint**（定义为 `hsl(0, 0%, 24%)`）: 浅色背景上的 secondary text，中等深灰。
- **Pure White** (`#ffffff`): 深色 surfaces 上的 text 和 CTA labels。

### Semantic & Accent
- **Input Border**（定义为 `hsl(240, 5.9%, 90%)`）: 用于 form borders 的 cool-tinted light gray，是系统中少数 cool tones 之一。
- **White Overlay** (`oklab(1, 0, 0 / 0.088-0.1)`): 用于 frosted glass effects 和 button overlays 的 semi-transparent white。

### Gradient System
- **Mistral Block Gradient**: 标志性身份，多段 gradient 流经 Yellow (`#ffd900`) -> Gold (`#ffe295`) -> Amber (`#ffa110`) -> Orange (`#ff8105`) -> Flame (`#fb6424`) -> Mistral Orange (`#fa520f`)。它出现在 logo blocks、section backgrounds 和 decorative elements 中。
- **Golden Landscape Wash**: Photography 和 backgrounds 使用 warm amber overlays，让整个页面保持一致的 golden temperature。
- **Warm Shadow Cascade**: Multi-layered golden shadows，通过 amber-tinted transparency 而不是 gray 建立 depth。

## 3. Typography Rules

### Font Family
- **Primary**: 可能是 custom font（检测到 Font Source），以 `Arial` 为 fallback，并带扩展 stack：`ui-sans-serif, system-ui, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Arial (custom) | 82px (5.13rem) | 400 | 1.00 (tight) | -2.05px | Maximum impact, billboard scale |
| Section Heading | Arial (custom) | 56px (3.5rem) | 400 | 0.95 (ultra-tight) | normal | Feature section anchors |
| Sub-heading Large | Arial (custom) | 48px (3rem) | 400 | 0.95 (ultra-tight) | normal | Secondary section titles |
| Sub-heading | Arial (custom) | 32px (2rem) | 400 | 1.15 (tight) | normal | Card headings, feature names |
| Card Title | Arial (custom) | 30px (1.88rem) | 400 | 1.20 (tight) | normal | Mid-level headings |
| Feature Title | Arial (custom) | 24px (1.5rem) | 400 | 1.33 | normal | Small headings |
| Body / Button | Arial (custom) | 16px (1rem) | 400 | 1.50 | normal | Standard body, button text |
| Button Uppercase | Arial (custom) | 16px (1rem) | 400 | 1.50 | normal | Uppercase CTA labels |
| Caption / Link | Arial (custom) | 14px (0.88rem) | 400 | 1.43 | normal | Metadata, secondary links |

### Principles
- **Single weight, maximum impact**: 整个系统使用 weight 400（regular），即使在 82px 也是如此。这创造出意外优雅的效果：权威感由 size 本身承载，不需要 bold weight。
- **Ultra-tight at scale**: Display sizes 使用 0.95-1.00 的 line-heights，让 ascenders 几乎接触上一行的 descenders，形成 dense、poster-like composition。
- **Aggressive tracking on display**: 82px 时 -2.05px letter-spacing 把 hero text 压成 monolithic block。
- **Uppercase as emphasis**: Button labels 和 section markers 上战略性使用 `text-transform: uppercase`，带来正式的 European signage quality。
- **No weight variation**: 不同于多数使用 300-700 weight range 的系统，Mistral 到处使用 400。Hierarchy 来自 size 和 color，而不是 weight。

## 4. Component Stylings

### Buttons

**Cream Surface**
- Background: Cream (`#fff0c2`)
- Text: Mistral Black (`#1f1f1f`)
- No visible border
- 温暖、邀请感的 secondary CTA

**Dark Solid**
- Background: Mistral Black (`#1f1f1f`)
- Text: Pure White (`#ffffff`)
- Padding: 12px（四边）
- No visible border
- Primary action button，warm 上的 dark

**Ghost / Transparent**
- Background: transparent，带 slight dark overlay（`oklab(0, 0, 0 / 0.1)`）
- Text: Mistral Black (`#1f1f1f`)
- Opacity: 0.4
- 用于 secondary/de-emphasized actions

**Text / Underline**
- Background: transparent
- Text: Mistral Black (`#1f1f1f`)
- Padding: 8px 0px 0px（只在 top）
- Minimal styling，以 text link 作为 button
- 用于 tertiary navigation actions

### Cards & Containers
- Background: Warm Ivory (`#fffaeb`)、Cream (`#fff0c2`) 或 Pure White
- Border: minimal to none，containers 由 background color 定义
- Radius: near-zero，sharp architectural corners
- Shadow: warm golden multi-layer（`rgba(127, 99, 21, 0.12) -8px 16px 39px, rgba(127, 99, 21, 0.1) -33px 64px 72px, rgba(127, 99, 21, 0.06) -73px 144px 97px, ...`），dramatic cascading warm shadow
- Distinctive: Golden shadow 创造 "golden hour" lighting effect

### Inputs & Forms
- Border: `hsl(240, 5.9%, 90%)`，唯一 cool-toned element
- Focus: accent color ring
- Minimal styling，与 sparse aesthetic 保持一致

### Navigation
- Transparent nav 覆盖在 warm hero 上
- Logo: Mistral "M" wordmark
- Links: Dark text（深色 sections 上为 white）
- CTA: Dark solid button 或 cream surface button
- Minimal、wide-spaced layout

### Image Treatment
- Warm golden tones 的 dramatic landscape photography
- 穿过 golden hills 的 winding road，是反复出现的 visual motif
- Mistral "M" 在 golden backgrounds 上以大尺度渲染
- 所有 photography 使用 warm color grading
- Full-bleed sections with photography

### Distinctive Components

**Mistral Block Identity**
- 一排 colored blocks 形成 gradient：yellow -> amber -> orange -> burnt orange
- 每个 block 逐渐更 orange/red
- 品牌的 visual DNA，任何尺寸都可识别

**Golden Shadow Cards**
- Cards 通过 warm amber multi-layered shadows 被抬起
- 5 层 shadow，从 16px 到 400px offset
- 创造 Mistral 独有的 "floating in golden light" 效果

**Dark Footer Gradient**
- Footer 通过 dramatic gradient 从 warm amber 过渡到 dark
- 页面结束时形成 "sunset" effect

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 2px, 4px, 8px, 10px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 98px, 100px
- Button padding: 12px 或 8px 0px（compact）
- Section vertical spacing: 非常宽裕（80px-100px）

### Grid & Container
- Max container width: 约 1280px，居中
- Hero: Full-width，massive typography 覆盖 warm backgrounds
- Feature sections: 带 dramatic imagery 的 wide-format layouts
- Card grids: 2-3 column layouts

### Whitespace Philosophy
- **Bold declarations**: 巨大 headlines 被 generous whitespace 包围，创造 billboard-like impact；每句话都有自己的 breathing space。
- **Warm void**: 因为 backgrounds 是 tinted ivory/cream，而不是 pure white，所以空白本身也有温度。
- **Photography as space-filler**: 大型 landscape images 同时作为内容和 decorative whitespace。

### Border Radius Scale
- Near-zero: Dominant radius，大多数 elements 使用 sharp architectural corners
- 这种极端锐利与温暖颜色形成对比，制造 soft color 与 hard geometry 之间的张力。

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Page backgrounds, text blocks |
| Golden Float (Level 1) | Multi-layer warm shadow (5 layers, 12%->0% opacity, amber-tinted) | Feature cards, product showcases, elevated content |

**Shadow Philosophy**: Mistral 使用单一但极其复杂的 shadow：**five cascading layers** 的 amber-tinted shadow（`rgba(127, 99, 21, ...)`），从近处 16px offset 一直延展到远处 400px offset。结果是一种丰富、温暖的 "golden hour" lighting effect，让 elevated elements 看起来像沐浴在午后阳光中。这是主要 AI 品牌中最有辨识度的 shadow system。

## 7. Do's and Don'ts

### Do
- 只使用 warm color spectrum：ivory、cream、amber、gold、orange
- Hero sections 的 display typography 保持 82px+ 和 -2.05px letter-spacing
- Brand moments 使用 Mistral block gradient（yellow -> amber -> orange）
- Elevated elements 使用 warm golden shadows（amber-tinted rgba）
- Text 使用 Mistral Black (#1f1f1f)，绝不使用 pure #000000
- 全部 font weight 保持 400，让 size 和 color 承载 hierarchy
- 使用 sharp architectural corners，near-zero border-radius
- Button labels 和 section markers 使用 uppercase，带 European formality
- 使用 warm landscape photography，并做 golden color grading

### Don't
- 不要引入 cool colors（blue、green、purple）；palette 只属于 warm spectrum
- 不要使用 bold (700+) weight；400 是唯一 weight
- 不要圆角化 corners；sharp geometry 是刻意的
- 不要使用 cool-toned shadows；shadows 必须带 amber warmth
- 不要用 pure white 作为 page background；始终使用 warm-tinted（最低 #fffaeb）
- 不要在 desktop 上把 hero text 降到 48px 以下；billboard scale 是核心
- 不要使用超过 2 个 font weights；size variation 替代 weight variation
- 不要在 warm spectrum 之外添加 gradients；没有 blue-to-purple，也没有 cool transitions
- 不要为 text 使用 generic gray；即使 neutrals 也应该 warm-tinted

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, stacked everything, hero text reduces to ~32px |
| Tablet | 640-768px | Minor layout adjustments |
| Small Desktop | 768-1024px | 2-column layouts begin |
| Desktop | 1024-1280px | Full layout with maximum typography scale |

### Touch Targets
- Buttons 使用 generous padding（至少 12px）
- Navigation elements 之间 spacing 充足
- Cards 可作为 large touch targets

### Collapsing Strategy
- **Navigation**: 移动端折叠为 hamburger
- **Hero text**: 82px -> 56px -> 48px -> 32px progressive scaling
- **Feature sections**: Multi-column -> stacked
- **Photography**: 按比例缩放，mobile 上可能裁切
- **Block identity**: 按比例缩小

### Image Behavior
- Landscape photography 按比例缩放
- Warm color grading 在所有 sizes 保持
- Block gradient elements 流式缩放
- No art direction changes，所有尺寸保持同一种 warm composition

## 9. Agent Prompt Guide

### Quick Color Reference
- Brand Orange: "Mistral Orange (#fa520f)"
- Page Background: "Warm Ivory (#fffaeb)"
- Warm Surface: "Cream (#fff0c2)"
- Primary Text: "Mistral Black (#1f1f1f)"
- Sunshine Amber: "Sunshine 700 (#ffa110)"
- Bright Gold: "Bright Yellow (#ffd900)"
- Text on Dark: "Pure White (#ffffff)"

### Example Component Prompts
- "Create a hero section on Warm Ivory (#fffaeb) with a massive headline at 82px Arial weight 400, line-height 1.0, letter-spacing -2.05px. Mistral Black (#1f1f1f) text. Add a dark solid CTA button (#1f1f1f bg, white text, 12px padding, sharp corners) and a cream secondary button (#fff0c2 bg)."
- "Design a feature card on Cream (#fff0c2) with sharp corners (no border-radius). Apply the golden shadow system: rgba(127, 99, 21, 0.12) -8px 16px 39px as the primary layer. Title at 32px weight 400, body at 16px."
- "Build the Mistral block identity: a row of colored blocks from Bright Yellow (#ffd900) through Sunshine 700 (#ffa110) to Mistral Orange (#fa520f). Sharp corners, no gaps."
- "Create a dark footer section on Mistral Black (#1f1f1f) with Pure White (#ffffff) text. Footer links at 14px. Add a warm gradient from Sunshine 700 (#ffa110) at the top fading to Mistral Black."

### Iteration Guide
1. 保持 warm temperature：说 "shift toward amber"，不要说 "shift toward gray"
2. 用 size 建立 hierarchy：82px -> 56px -> 48px -> 32px -> 24px -> 16px
3. 绝不添加 border-radius，只使用 sharp corners
4. Shadows 永远是 warm："golden shadow with amber tones"
5. Font weight 永远是 400，通过 size 和 color 描述 emphasis
