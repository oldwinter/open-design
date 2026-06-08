# Design System Inspired by Runway

> Category: AI & LLM
> AI 视频生成。电影感 dark UI，media-rich layout。

## 1. Visual Theme & Atmosphere

Runway 的界面像一卷被做成网站的 cinematic reel：深色、editorial、film-production-grade 的设计，full-bleed photography 和 video 才是 primary UI elements。这不是典型 tech product page，而是一份关于 AI-powered creativity 的视觉宣言。每个 section 都像电影中的一帧：戏剧性光线、开阔 landscape，以及由高质量 imagery 捕捉的亲密人物瞬间主导整个 viewport。

Design language 建立在单一 typeface 之上：abcNormal。它是干净的 geometric sans-serif，能覆盖从 48px display headlines 到 11px uppercase labels 的全部文本角色。这种 single-font commitment 会创造极端统一的 typography，让视觉内容比文字更响亮。Headlines 使用紧 line-heights（1.0）和 negative letter-spacing（-0.9px 到 -1.2px），形成压缩的 text blocks，读起来像 film titles，而不是 marketing copy。

Runway 的独特之处在于它完全承诺把 visual content 当作 design。它不是用 icons 或 diagrams 说明功能，而是展示真实 AI-generated 和 AI-enhanced imagery：穿越电影感 landscape 的汽车、艺术 portraits、建筑 renders。界面本身退到近乎不可见：minimal borders、zero shadows、细微 cool-gray text，以及让 photography 获得最大焦点的 dark palette。

**Key Characteristics:**
- Cinematic full-bleed photography 和 video 作为 primary UI elements
- Single typeface system：abcNormal 覆盖从 display 到 micro labels 的所有文本
- 以深色为主的 palette，配 cool-toned neutrals（#767d88, #7d848e）
- Zero shadows、minimal borders；interface 有意保持不可见
- Tight display typography（line-height 1.0），配 negative tracking（-0.9px 到 -1.2px）
- Uppercase labels 搭配 positive letter-spacing，承担 navigation structure
- 小号 uppercase text 使用不常见的 weight 450，体现 precision craft
- Editorial magazine layout，混合不同尺寸的 image grids

## 2. Color Palette & Roles

### Primary
- **Runway Black** (`#000000`): 主要 page background 和最高强调 text。
- **Deep Black** (`#030303`): 用于 layered dark surfaces 的近乎不可察觉变体。
- **Dark Surface** (`#1a1a1a`): Card backgrounds 和抬升的深色 containers。
- **Pure White** (`#ffffff`): 深色 surfaces 上的 primary text，以及浅色 section backgrounds。

### Surface & Background
- **Near White** (`#fefefe`): 最浅 surface，几乎无法与 pure white 区分。
- **Cool Cloud** (`#e9ecf2`): 带 cool blue-gray tint 的浅色 section backgrounds。
- **Border Dark** (`#27272a`): 唯一的 dark-mode border color，只提供几乎不可见的 containment。

### Neutrals & Text
- **Charcoal** (`#404040`): 浅色 surfaces 上的 primary body text 和 secondary text。
- **Near Charcoal** (`#3f3f3f`): 深色 section secondary text 的略浅变体。
- **Cool Slate** (`#767d88`): Secondary body text，一种明显偏蓝灰的 cool neutral。
- **Mid Slate** (`#7d848e`): Tertiary text、metadata descriptions。
- **Muted Gray** (`#a7a7a7`): De-emphasized content、timestamps。
- **Cool Silver** (`#c9ccd1`): Light borders 和 dividers。
- **Light Silver** (`#d0d4d4`): 最浅 border/divider 变体。
- **Tailwind Gray** (`#6b7280`): 用于 supplementary text 的标准 Tailwind neutral。
- **Dark Link** (`#0c0c0c`): 最深 link text，近乎黑色。
- **Footer Gray** (`#999999`): Footer links 和深度弱化内容。

### Gradient System
- **界面中不用 gradient。** 视觉丰富度完全来自 photographic content；AI-generated 和 enhanced imagery 提供设计所需的全部颜色和 gradient。Interface 本身刻意保持无色。

## 3. Typography Rules

### Font Family
- **Universal**: `abcNormal`, with fallback: `abcNormal Fallback`

*Note: abcNormal 是 custom geometric sans-serif。外部实现时，Inter 或 DM Sans 可以作为接近替代。*

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | abcNormal | 48px (3rem) | 400 | 1.00 (tight) | -1.2px | Maximum size, film-title presence |
| Section Heading | abcNormal | 40px (2.5rem) | 400 | 1.00-1.10 | -1px to 0px | Feature section titles |
| Sub-heading | abcNormal | 36px (2.25rem) | 400 | 1.00 (tight) | -0.9px | Secondary section markers |
| Card Title | abcNormal | 24px (1.5rem) | 400 | 1.00 (tight) | normal | Article and card headings |
| Feature Title | abcNormal | 20px (1.25rem) | 400 | 1.00 (tight) | normal | Small headings |
| Body / Button | abcNormal | 16px (1rem) | 400-600 | 1.30-1.50 | -0.16px to normal | Standard body, nav links |
| Caption / Label | abcNormal | 14px (0.88rem) | 500-600 | 1.25-1.43 | 0.35px (uppercase) | Metadata, section labels |
| Small | abcNormal | 13px (0.81rem) | 400 | 1.30 (tight) | -0.16px to -0.26px | Compact descriptions |
| Micro / Tag | abcNormal | 11px (0.69rem) | 450 | 1.30 (tight) | normal | Uppercase tags, tiny labels |

### Principles
- **One typeface, complete expression**: abcNormal 处理每个 text role。系统通过 size、weight、case 和 letter-spacing 获得变化，而不是切换 font-family。
- **Tight everywhere**: 几乎所有字号都使用 line-height 1.0-1.30；即使 body text 也相对压缩。这会制造密集的 editorial feel。
- **Weight 450 — the precision detail**: 一些小号 uppercase labels 使用 weight 450，也就是介于 regular（400）和 medium（500）之间的不常见中间值。这个 micro-craft 传达 typography sophistication。
- **Negative tracking as default**: 即便 body text 也使用 -0.16px 到 -0.26px letter-spacing，让一切都比默认略紧。
- **Uppercase as structure**: 14px 和 11px labels 使用 `text-transform: uppercase` 与 positive letter-spacing（0.35px），创建与紧密 lowercase text 形成对比的 navigational signposts。

## 4. Component Stylings

### Buttons
- Text: weight 600，14px abcNormal
- Background: 可能是 transparent 或 dark，配 minimal border
- Radius: 小号（4px），用于 button-like links
- Button design 极度克制；没有 heavy fills 或 borders
- Interactive elements 融入 editorial flow

### Cards & Containers
- Background: transparent 或 Dark Surface (`#1a1a1a`)
- Border: `1px solid #27272a`（dark mode），只提供几乎不可见的 containment
- Radius: 功能元素使用小号（4-8px）；alert-style containers 使用 16px
- Shadow: zero；任何元素都不使用 shadows
- Cards 主要是 photographic；image 本身就是 card

### Navigation
- Minimal horizontal nav，透明叠在 hero content 上
- Logo: Runway wordmark，白色/黑色
- Links: abcNormal，16px，weight 400-600
- Hover: text 转为 white 或更高 opacity
- 极其细微，设计目标是不与 visual content 竞争

### Image Treatment
- Full-bleed cinematic photography 和 video 占据主导
- AI-generated content 以大尺寸展示，作为 primary visual elements
- Mixed-size image grids 创造 editorial magazine layouts
- Hero images 使用 dark overlays 保证文字可读性
- Product screenshots 带细微 rounded corners（8px）

### Distinctive Components

**Cinematic Hero**
- Full-viewport image 或 video，带 text overlay
- Headline 使用 48px abcNormal，深色 imagery 上用 white
- Image 必须始终是 cinematic quality，也就是 film-grade composition

**Research Article Cards**
- Photographic thumbnails 搭配 article titles
- Mixed-size grid layout（large feature + smaller supporting）
- 干净 text overlay 或 below-image caption style

**Trust Bar**
- Company logos（跨行业 leading organizations）
- 干净、monochrome treatment
- Horizontal layout，spacing 慷慨

**Mission Statement**
- "We are building AI to simulate the world through imagination, art and aesthetics"
- 深色 background 上使用 white text
- 情绪性的结尾，兼具艺术性和哲学感

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4px, 6px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 48px, 64px, 78px
- Section vertical spacing: 慷慨（48-78px）
- Component gaps: 16-24px

### Grid & Container
- Max container width: up to 1600px（cinema-wide）
- Hero: full-viewport, edge-to-edge
- Content sections: 居中并留有慷慨 margins
- Image grids: asymmetric、magazine-style mixed sizes
- Footer: full-width dark section

### Whitespace Philosophy
- **Cinema-grade breathing**: Sections 之间的大 vertical gaps 让滚动体验像观看 scenes 切换。
- **Images replace whitespace**: 其他网站用 empty space 的地方，Runway 用 photography 填充。Visual content 本身就是 breathing room。
- **Editorial grid asymmetry**: Image grid 使用刻意变化的尺寸，大 hero images 与 smaller supporting images 配对，形成视觉 rhythm。

### Border Radius Scale
- Sharp (4px): Buttons、小型 interactive elements
- Subtle (6px): Links、小型 containers
- Comfortable (8px): Standard containers、image cards
- Generous (16px): Alert-style containers、featured elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no border | Everything — the dominant state |
| Bordered (Level 1) | `1px solid #27272a` | Alert containers only |
| Dark Section (Level 2) | Dark bg (#000000 / #1a1a1a) with light text | Hero, features, footer |
| Light Section (Level 3) | White/Cool Cloud bg with dark text | Content sections, research |

**Shadow Philosophy**: Runway 使用 **zero shadows**。这是 film-production design decision：在 cinema 中，depth 来自 lighting、focus 和 composition，而不是 drop shadows。Interface 也映射这一哲学：depth 通过 dark/light section alternation、photographic depth-of-field 和 overlay transparency 传达，绝不通过 CSS box-shadow。

## 7. Do's and Don'ts

### Do
- 使用 full-bleed cinematic photography 作为 primary visual element
- 所有文本使用 abcNormal，保持 single-typeface commitment
- Display line-heights 保持 1.0，并用 negative letter-spacing 形成 film-title density
- Secondary text 使用 cool-gray neutral palette（#767d88, #7d848e）
- 保持 zero shadows；depth 来自 photography 和 section backgrounds
- Navigation labels 使用 uppercase + letter-spacing（14px, 0.35px spacing）
- 使用小号 border-radius（4-8px）；设计不是 pill-shaped
- 让 visual content（photos、videos）占主导；UI 应该近乎不可见
- Micro labels 使用 weight 450；precision 很重要

### Don't
- 不要向 interface 添加装饰色；唯一颜色来自 photography
- 不要使用 heavy borders 或 shadows；interface 必须近乎不可见
- 不要使用 pill-shaped radius；Runway geometry 是细微圆角，不是圆形
- 不要使用 bold（700+）weight；400-600 是完整范围，450 是 precision tool
- 不要与 visual content 竞争；text overlays 应该 minimal 且 restrained
- 不要在 interface 中使用 gradient backgrounds；gradients 只存在于 photography 中
- 不要使用超过一个 typeface；abcNormal 覆盖一切
- 不要让 body line-height 超过 1.50；tight editorial feel 是核心
- 不要降低 image quality；cinematic photography 就是 design

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, stacked images, reduced hero text |
| Tablet | 640-768px | 2-column image grids begin |
| Small Desktop | 768-1024px | Standard layout |
| Desktop | 1024-1280px | Full layout, expanded hero |
| Large Desktop | 1280-1600px | Maximum cinema-width container |

### Touch Targets
- Navigation links 使用舒适的 16px
- Article cards 作为大型 touch targets
- Buttons 使用 14px weight 600，并提供足够 padding

### Collapsing Strategy
- **Navigation**: Mobile 上折叠为 hamburger
- **Hero**: 保持 full-bleed，同时缩小 text
- **Image grids**: Multi-column -> 2-column -> single column
- **Research articles**: Feature-size cards -> stacked full-width
- **Trust logos**: Horizontal scroll 或 reduced grid

### Image Behavior
- Cinematic images 按比例缩放
- Full-bleed hero 在所有尺寸上保持
- Image grids 重排为更少 columns
- Video content 保持 aspect ratio

## 9. Agent Prompt Guide

### Quick Color Reference
- Background Dark: "Runway Black (#000000)"
- Background Light: "Pure White (#ffffff)"
- Primary Text Dark: "Charcoal (#404040)"
- Secondary Text: "Cool Slate (#767d88)"
- Muted Text: "Muted Gray (#a7a7a7)"
- Light Border: "Cool Silver (#c9ccd1)"
- Dark Border: "Border Dark (#27272a)"
- Card Surface: "Dark Surface (#1a1a1a)"

### Example Component Prompts
- "Create a cinematic hero section: full-bleed dark background with a cinematic image overlay. Headline at 48px abcNormal weight 400, line-height 1.0, letter-spacing -1.2px in white. Minimal text below in Cool Slate (#767d88) at 16px."
- "Design a research article grid: one large card (50% width) with a cinematic image and 24px title, next to two smaller cards stacked. All images with 8px border-radius. Titles in white (dark bg) or Charcoal (#404040, light bg)."
- "Build a section label: 14px abcNormal weight 500, uppercase, letter-spacing 0.35px in Cool Slate (#767d88). No border, no background."
- "Create a trust bar: company logos in monochrome, horizontal layout with generous spacing. On dark background with white/gray logo treatments."
- "Design a mission statement section: Runway Black background, white text at 36px abcNormal, line-height 1.0, letter-spacing -0.9px. Centered, with generous vertical padding."

### Iteration Guide
1. Visual content first：始终包含 cinematic photography
2. 所有内容使用 abcNormal；指定 size 和 weight，永远不要换 font
3. 保持 interface invisible：不要 heavy borders，不要 shadows，不要 bright colors
4. Secondary text 使用 cool slate grays（#767d88, #7d848e），不要 warm grays
5. Uppercase labels 需要 letter-spacing（0.35px），绝不要 tight uppercase
6. Dark sections 应真正深色（#000000 或 #1a1a1a），不要用 medium grays 当 surfaces
