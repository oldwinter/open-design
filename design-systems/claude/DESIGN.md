# Design System Inspired by Claude (Anthropic)

> Category: AI & LLM
> Anthropic 的 AI assistant。Warm terracotta accent，clean editorial layout。

## 1. Visual Theme & Atmosphere

Claude 的 interface 像被重新想象成 product page 的 literary salon —— 温暖、从容、安静地 intellectual。整个体验建立在 parchment-toned canvas（`#f5f4ed`）上，它有意唤起 high-quality paper 的感觉，而不是 digital surface。多数 AI product pages 倾向 cold、futuristic aesthetics，而 Claude 的 design 散发 human warmth，好像 AI 本身也有很好的 interior design 品味。

标志性动作是 custom Anthropic Serif typeface —— 一种 medium-weight serif，比例 generous，让每个 headline 都有 book title 的庄重感。它与 terracotta（`#c96442`）、black 和 muted green 中 organic、hand-drawn-feeling illustrations 搭配，visual language 传达的是 "thoughtful companion"，而不是 "powerful tool"。Serif headlines 在 tight-but-comfortable line-heights（1.10–1.30）中呼吸，节奏更像读一篇 essay，而不是扫一个 product page。

Claude design 真正独特之处在于 warm neutral palette。每个 gray 都有 yellow-brown undertone（`#5e5d59`、`#87867f`、`#4d4c48`）—— 任何地方都没有 cool blue-grays。Borders 是 cream-tinted（`#f0eee6`、`#e8e6dc`），shadows 使用 warm transparent blacks，甚至最暗的 surfaces（`#141413`、`#30302e`）也带着几乎不可察觉的 olive warmth。这种 chromatic consistency 创造出一个 lived-in、trustworthy 的空间。

**Key Characteristics:**
- Warm parchment canvas（`#f5f4ed`），唤起 premium paper 而不是 screens
- Custom Anthropic type family：Serif 用于 headlines，Sans 用于 UI，Mono 用于 code
- Terracotta brand accent（`#c96442`）—— warm、earthy、deliberately un-tech
- 完全 warm-toned neutrals —— 每个 gray 都有 yellow-brown undertone
- Organic、editorial illustrations 取代典型 tech iconography
- Ring-based shadow system（`0px 0px 0px 1px`），创造 border-like depth 但没有明显 borders
- Magazine-like pacing，带 generous section spacing 和 serif-driven hierarchy

## 2. Color Palette & Roles

### Primary
- **Anthropic Near Black** (`#141413`): Primary text color 和 dark-theme surface —— 不是 pure black，而是温暖、近乎 olive-tinted 的 dark，对眼睛更柔和。它是 major tech brand 中最 warm 的 "black"。
- **Terracotta Brand** (`#c96442`): Core brand color —— burnt orange-brown，用于 primary CTA buttons、brand moments 和 signature accent。刻意 earthy、un-tech。
- **Coral Accent** (`#d97757`): Brand color 的更浅、更 warm 变体，用于 text accents、dark surfaces 上的 links 和 secondary emphasis。

### Secondary & Accent
- **Error Crimson** (`#b53333`): Error states 的 deep、warm red —— serious 但不惊吓。
- **Focus Blue** (`#3898ec`): Input focus rings 的 standard blue —— 整个 system 唯一的 cool color，只为 accessibility 使用。

### Surface & Background
- **Parchment** (`#f5f4ed`): Primary page background —— 带 yellow-green tint 的 warm cream，像 aged paper。整个 design 的 emotional foundation。
- **Ivory** (`#faf9f5`): 最浅 surface —— 用于 Parchment background 上的 cards 和 elevated containers。几乎不可分辨，但创造 subtle layering。
- **Pure White** (`#ffffff`): 只保留给特定 button surfaces 和 maximum-contrast elements。
- **Warm Sand** (`#e8e6dc`): Button backgrounds 和 prominent interactive surfaces —— 明显 warm 的 light gray。
- **Dark Surface** (`#30302e`): Dark-theme containers、nav borders 和 elevated dark elements —— warm charcoal。
- **Deep Dark** (`#141413`): Dark-theme page background 和 primary dark surface。

### Neutrals & Text
- **Charcoal Warm** (`#4d4c48`): Light warm surfaces 上的 button text —— dark-on-light text 的常用选择。
- **Olive Gray** (`#5e5d59`): Secondary body text —— 明显 warm 的 medium-dark gray。
- **Stone Gray** (`#87867f`): Tertiary text、footnotes 和 de-emphasized metadata。
- **Dark Warm** (`#3d3d3a`): Dark text links 和 emphasized secondary text。
- **Warm Silver** (`#b0aea5`): Dark surfaces 上的 text —— warm、parchment-tinted light gray。

### Semantic & Accent
- **Border Cream** (`#f0eee6`): Standard light-theme border —— 几乎不可见的 warm cream，创造最温柔的 containment。
- **Border Warm** (`#e8e6dc`): Light surfaces 上的 prominent borders、section dividers 和 emphasized containment。
- **Border Dark** (`#30302e`): Dark surfaces 上的 standard border —— 保持 warm tone。
- **Ring Warm** (`#d1cfc5`): Button hover/focus states 的 shadow ring color。
- **Ring Subtle** (`#dedc01`): Lighter interactive surfaces 的 secondary ring variant。
- **Ring Deep** (`#c2c0b6`): Active/pressed states 的 deeper ring。

### Gradient System
Claude design 在传统意义上 **gradient-free**。Depth 和 visual richness 来自 warm surface tones、organic illustrations 与 light/dark section alternation 的互动。Warm palette 本身在 eye 经过 cream → sand → stone → charcoal → black sections 时创造出一种 "gradient" effect。

## 3. Typography Rules

### Font Family
- **Headline**: `Anthropic Serif`，fallback: `Georgia`
- **Body / UI**: `Anthropic Sans`，fallback: `Arial`
- **Code**: `Anthropic Mono`，fallback: `Arial`

*Note: 这些是 custom typefaces。外部实现中，Georgia 可作为 serif substitute，system-ui/Inter 可作为 sans substitute。*

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Anthropic Serif | 64px (4rem) | 500 | 1.10 (tight) | normal | Maximum impact，book-title presence |
| Section Heading | Anthropic Serif | 52px (3.25rem) | 500 | 1.20 (tight) | normal | Feature section anchors |
| Sub-heading Large | Anthropic Serif | 36–36.8px (~2.3rem) | 500 | 1.30 | normal | Secondary section markers |
| Sub-heading | Anthropic Serif | 32px (2rem) | 500 | 1.10 (tight) | normal | Card titles、feature names |
| Sub-heading Small | Anthropic Serif | 25–25.6px (~1.6rem) | 500 | 1.20 | normal | Smaller section titles |
| Feature Title | Anthropic Serif | 20.8px (1.3rem) | 500 | 1.20 | normal | Small feature headings |
| Body Serif | Anthropic Serif | 17px (1.06rem) | 400 | 1.60 (relaxed) | normal | Serif body text（editorial passages） |
| Body Large | Anthropic Sans | 20px (1.25rem) | 400 | 1.60 (relaxed) | normal | Intro paragraphs |
| Body / Nav | Anthropic Sans | 17px (1.06rem) | 400–500 | 1.00–1.60 | normal | Navigation links、UI text |
| Body Standard | Anthropic Sans | 16px (1rem) | 400–500 | 1.25–1.60 | normal | Standard body、button text |
| Body Small | Anthropic Sans | 15px (0.94rem) | 400–500 | 1.00–1.60 | normal | Compact body text |
| Caption | Anthropic Sans | 14px (0.88rem) | 400 | 1.43 | normal | Metadata、descriptions |
| Label | Anthropic Sans | 12px (0.75rem) | 400–500 | 1.25–1.60 | 0.12px | Badges、small labels |
| Overline | Anthropic Sans | 10px (0.63rem) | 400 | 1.60 | 0.5px | Uppercase overline labels |
| Micro | Anthropic Sans | 9.6px (0.6rem) | 400 | 1.60 | 0.096px | Smallest text |
| Code | Anthropic Mono | 15px (0.94rem) | 400 | 1.60 | -0.32px | Inline code、terminal |

### Principles
- **Serif for authority, sans for utility**: Anthropic Serif 以 medium weight（500）承载所有 headline content，让每个 heading 都有 published title 的庄重感。Anthropic Sans 以安静效率处理所有 functional UI text —— buttons、labels、navigation。
- **Single weight for serifs**: 所有 Anthropic Serif headings 都使用 weight 500 —— no bold、no light。这让所有 headline sizes 拥有一致 "voice"，仿佛每个 heading 都出自同一位作者。
- **Relaxed body line-height**: 大多数 body text 使用 1.60 line-height —— 明显比典型 tech sites（1.4–1.5）更 generous。它创造接近 book 而不是 dashboard 的 reading experience。
- **Tight-but-not-compressed headings**: Headings 的 1.10–1.30 line-heights 是 tight，但绝不 claustrophobic。Serif letterforms 需要比 sans-serif fonts 更多 breathing room。
- **Micro letter-spacing on labels**: 小号 sans text（12px 及以下）使用有意的 letter-spacing（0.12px–0.5px），在 tiny sizes 保持 readability。

## 4. Component Stylings

### Buttons

**Warm Sand (Secondary)**
- Background: Warm Sand (`#e8e6dc`)
- Text: Charcoal Warm (`#4d4c48`)
- Padding: 0px 12px 0px 8px（asymmetric —— icon-first layout）
- Radius: comfortably rounded（8px）
- Shadow: ring-based（`#e8e6dc 0px 0px 0px 0px, #d1cfc5 0px 0px 0px 1px`）
- Workhorse button —— warm、unassuming、clearly interactive

**White Surface**
- Background: Pure White (`#ffffff`)
- Text: Anthropic Near Black (`#141413`)
- Padding: 8px 16px 8px 12px
- Radius: generously rounded（12px）
- Hover: 切到 secondary background color
- Light surfaces 上 clean、elevated button

**Dark Charcoal**
- Background: Dark Surface (`#30302e`)
- Text: Ivory (`#faf9f5`)
- Padding: 0px 12px 0px 8px
- Radius: comfortably rounded（8px）
- Shadow: ring-based（`#30302e 0px 0px 0px 0px, ring 0px 0px 0px 1px`）
- Dark-on-light emphasis 的 inverted variant

**Brand Terracotta**
- Background: Terracotta Brand (`#c96442`)
- Text: Ivory (`#faf9f5`)
- Radius: 8–12px
- Shadow: ring-based（`#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px`）
- Primary CTA —— 唯一带 chromatic color 的 button

**Dark Primary**
- Background: Anthropic Near Black (`#141413`)
- Text: Warm Silver (`#b0aea5`)
- Padding: 9.6px 16.8px
- Radius: generously rounded（12px）
- Border: thin solid Dark Surface（`1px solid #30302e`）
- 用于 dark theme surfaces

### Cards & Containers
- Background: light surfaces 上使用 Ivory（`#faf9f5`）或 Pure White（`#ffffff`）；dark 上使用 Dark Surface（`#30302e`）
- Border: light 上 thin solid Border Cream（`1px solid #f0eee6`）；dark 上 `1px solid #30302e`
- Radius: standard cards 使用 comfortably rounded（8px）；featured 使用 generously rounded（16px）；hero containers 和 embedded media 使用 very rounded（32px）
- Shadow: elevated content 使用 whisper-soft（`rgba(0,0,0,0.05) 0px 4px 24px`）
- Ring shadow: interactive card states 使用 `0px 0px 0px 1px` patterns
- Section borders: list item separators 使用 `1px 0px 0px`（top-only）

### Inputs & Forms
- Text: Anthropic Near Black (`#141413`)
- Padding: 1.6px 12px（非常 compact vertical）
- Border: standard warm borders
- Focus: ring 使用 Focus Blue（`#3898ec`）border-color —— 唯一 cool color moment
- Radius: generously rounded（12px）

### Navigation
- Sticky top nav，warm background
- Logo: Claude wordmark，Anthropic Near Black
- Links: 混合使用 Near Black（`#141413`）、Olive Gray（`#5e5d59`）和 Dark Warm（`#3d3d3a`）
- Nav border: dark 为 `1px solid #30302e`，light 为 `1px solid #f0eee6`
- CTA: Terracotta Brand button 或 White Surface button
- Hover: text 切到 foreground-primary，无 decoration

### Image Treatment
- Product screenshots 展示 Claude chat interface
- Media 使用 generous border-radius（16–32px）
- Embedded video players 带 rounded corners
- Dark UI screenshots 与 warm light canvas 形成对比
- Conceptual sections 使用 organic、hand-drawn illustrations

### Distinctive Components

**Model Comparison Cards**
- Opus 4.5、Sonnet 4.5、Haiku 4.5 以 clean card grid 呈现
- 每个 model 有 bordered card，包含 name、description 和 capability badges
- Items 之间使用 Border Warm（`#e8e6dc`）分隔

**Organic Illustrations**
- Hand-drawn-feeling vector illustrations，使用 terracotta、black 和 muted green
- Abstract、conceptual，而不是 literal product diagrams
- Primary visual personality —— 没有其他 AI company 使用这种 style

**Dark/Light Section Alternation**
- 页面在 Parchment light 与 Near Black dark sections 之间交替
- 创造像 book chapters 一样的 reading rhythm
- 每个 section 都像一个 distinct environment

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 3px、4px、6px、8px、10px、12px、16px、20px、24px、30px
- Button padding: asymmetric（0px 12px 0px 8px）或 balanced（8px 16px）
- Card internal padding: 约 24–32px
- Section vertical spacing: generous（major sections 之间估计 80–120px）

### Grid & Container
- Max container width: 约 1200px，centered
- Hero: centered with editorial layout
- Feature sections: single-column 或 2–3 column card grids
- Model comparison: clean 3-column grid
- Full-width dark sections 打破 container 以增强 emphasis

### Whitespace Philosophy
- **Editorial pacing**: 每个 section 像 magazine spread 一样呼吸 —— generous top/bottom margins 创造自然 reading pauses。
- **Serif-driven rhythm**: Serif headings 建立 literary cadence，需要比 sans-serif designs 更多 whitespace。
- **Content island approach**: Sections 在 light 和 dark environments 之间交替，为每条 message 创造 distinct "rooms"。

### Border Radius Scale
- Sharp (4px): Minimal inline elements
- Subtly rounded (6–7.5px): Small buttons、secondary interactive elements
- Comfortably rounded (8–8.5px): Standard buttons、cards、containers
- Generously rounded (12px): Primary buttons、input fields、nav elements
- Very rounded (16px): Featured containers、video players、tab lists
- Highly rounded (24px): Tag-like elements、highlighted containers
- Maximum rounded (32px): Hero containers、embedded media、large cards

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no border | Parchment background、inline text |
| Contained (Level 1) | `1px solid #f0eee6` (light) 或 `1px solid #30302e` (dark) | Standard cards、sections |
| Ring (Level 2) | 使用 warm grays 的 `0px 0px 0px 1px` ring shadows | Interactive cards、buttons、hover states |
| Whisper (Level 3) | `rgba(0,0,0,0.05) 0px 4px 24px` | Elevated feature cards、product screenshots |
| Inset (Level 4) | `inset 0px 0px 0px 1px` at 15% opacity | Active/pressed button states |

**Shadow Philosophy**: Claude 通过 **warm-toned ring shadows** 而不是 traditional drop shadows 传达 depth。标志性的 `0px 0px 0px 1px` pattern 创造出比真实 border 更柔和的 border-like halo —— 它像 pretending to be a border 的 shadow，或者 technically a shadow 的 border。Drop shadows 出现时也极其柔和（0.05 opacity、24px blur）—— 几乎不可见的 lifts，暗示 floating 而不是 casting。

### Decorative Depth
- **Light/Dark alternation**: 最 dramatic 的 depth effect 来自 Parchment（`#f5f4ed`）和 Near Black（`#141413`）sections 的交替 —— 整个 section 通过 ambient light level 的变化改变 elevation。
- **Warm ring halos**: Button 和 card interactions 使用匹配 warm palette 的 ring shadows —— 从不使用 cool-toned 或 generic gray。

## 7. Do's and Don'ts

### Do
- 使用 Parchment（`#f5f4ed`）作为 primary light background —— warm cream tone 就是 Claude personality
- 所有 headlines 使用 Anthropic Serif weight 500 —— single-weight consistency 是刻意选择
- 只在 primary CTAs 和最高 signal 的 brand moments 中使用 Terracotta Brand（`#c96442`）
- 保持所有 neutrals warm-toned —— 每个 gray 都应有 yellow-brown undertone
- Interactive element states 使用 ring shadows（`0px 0px 0px 1px`），不要用 drop shadows
- 保持 editorial serif/sans hierarchy —— serif 用于 content headlines，sans 用于 UI
- Body 使用 generous line-height（1.60），营造 literary reading experience
- 在 light 和 dark sections 间交替，创造 chapter-like page rhythm
- 使用 generous border-radius（12–32px），带来 soft、approachable feel

### Don't
- 不要在任何地方使用 cool blue-grays —— palette 完全 warm-toned
- 不要在 Anthropic Serif 上使用 bold（700+）weight —— serifs 的上限是 weight 500
- 不要引入 Terracotta 之外的 saturated colors —— palette 刻意 muted
- Buttons 或 cards 不要使用 sharp corners（< 6px radius）—— softness 是 identity 核心
- 不要应用 heavy drop shadows —— depth 来自 ring shadows 和 background color shifts
- 不要把 pure white（`#ffffff`）作为 page background —— Parchment（`#f5f4ed`）或 Ivory（`#faf9f5`）始终更 warm
- 不要使用 geometric/tech-style illustrations —— Claude 的 illustrations 是 organic、hand-drawn-feeling
- 不要把 body line-height 降到 1.40 以下 —— generous spacing 支撑 editorial personality
- 不要把 monospace fonts 用于 non-code content —— Anthropic Mono 严格用于 code
- 不要把 sans-serif 混入 headlines —— serif/sans split 是 typographic identity

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Small Mobile | <479px | Minimum layout，everything stacked，compact typography |
| Mobile | 479–640px | Single column，hamburger nav，reduced heading sizes |
| Large Mobile | 640–767px | Slightly wider content area |
| Tablet | 768–991px | 2-column grids begin，condensed nav |
| Desktop | 992px+ | Full multi-column layout，expanded nav，maximum hero typography（64px） |

### Touch Targets
- Buttons 使用 generous padding（8–16px vertical minimum）
- Navigation links spacing 足以 thumb navigation
- Card surfaces 作为 large touch targets
- Recommended minimum: 44x44px

### Collapsing Strategy
- **Navigation**: Mobile 上 full horizontal nav collapse 为 hamburger
- **Feature sections**: Multi-column → stacked single column
- **Hero text**: 64px → 36px → ~25px progressive scaling
- **Model cards**: 3-column → stacked vertical
- **Section padding**: 按比例降低，但保持 editorial rhythm
- **Illustrations**: Proportional scale，保持 aspect ratios

### Image Behavior
- Product screenshots 在 rounded containers 内 proportional scale
- Illustrations 在所有尺寸保持质量
- Video embeds 保持 16:9 aspect ratio 和 rounded corners
- Breakpoints 之间不做 art direction changes

## 9. Agent Prompt Guide

### Quick Color Reference
- Brand CTA: "Terracotta Brand (#c96442)"
- Page Background: "Parchment (#f5f4ed)"
- Card Surface: "Ivory (#faf9f5)"
- Primary Text: "Anthropic Near Black (#141413)"
- Secondary Text: "Olive Gray (#5e5d59)"
- Tertiary Text: "Stone Gray (#87867f)"
- Borders (light): "Border Cream (#f0eee6)"
- Dark Surface: "Dark Surface (#30302e)"

### Example Component Prompts
- "创建一个 hero section，背景为 Parchment (#f5f4ed)，headline 使用 64px Anthropic Serif weight 500、line-height 1.10。Text 使用 Anthropic Near Black (#141413)。添加 subtitle：Olive Gray (#5e5d59)，20px Anthropic Sans，1.60 line-height。放置 Terracotta Brand (#c96442) CTA button，Ivory text，12px radius。"
- "设计 feature card：Ivory (#faf9f5) surface，1px solid Border Cream (#f0eee6) border，comfortably rounded corners (8px)。Title 使用 Anthropic Serif 25px weight 500，description 使用 Olive Gray (#5e5d59) 16px Anthropic Sans。添加 whisper shadow (rgba(0,0,0,0.05) 0px 4px 24px)。"
- "构建 dark section：Anthropic Near Black (#141413) 背景，Ivory (#faf9f5) headline text，Anthropic Serif 52px weight 500。Body text 使用 Warm Silver (#b0aea5)。Borders 使用 Dark Surface (#30302e)。"
- "创建 Warm Sand (#e8e6dc) button，Charcoal Warm (#4d4c48) text，8px radius，并使用 ring shadow (0px 0px 0px 1px #d1cfc5)。Padding: 0px 12px 0px 8px。"
- "设计 model comparison grid，包含三个 Ivory surfaces cards。每个 card 使用 Border Warm (#e8e6dc) top border，model name 使用 Anthropic Serif 25px，description 使用 Olive Gray 15px Anthropic Sans。"

### Iteration Guide
1. 一次专注 ONE component
2. 引用具体 color names —— 说 "use Olive Gray (#5e5d59)"，不要说 "make it gray"
3. 始终指定 warm-toned variants —— 不要 cool grays
4. 明确描述 serif vs sans usage —— "Anthropic Serif for the heading, Anthropic Sans for the label"
5. Shadows 使用 "ring shadow (0px 0px 0px 1px)" 或 "whisper shadow" —— 永远不要 generic "drop shadow"
6. 指定 warm background —— "on Parchment (#f5f4ed)" 或 "on Near Black (#141413)"
7. 保持 illustrations organic and conceptual —— 描述 "hand-drawn-feeling" style
