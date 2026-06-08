# 受 xAI 启发的 Design System

> Category: AI & LLM
> Elon Musk's AI lab. 冷峻 monochrome、futuristic minimalism。

## 1. Visual Theme & Atmosphere

xAI 的网站是 dark-first、monospace-driven brutalist minimalism 的范本：一个让人感觉由工程师构建的 design system，而这些工程师明白克制才是 sophistication 的最高形式。整个体验锚定在 almost-black background (`#1f2228`) 和 pure white text (`#ffffff`) 上，形成高对比、受 terminal 启发的 aesthetic，传递深厚的技术可信度。没有 gradients、没有 decorative illustrations，也没有争夺注意力的 color accents。这个网站通过缺席来沟通。

Typographic system 分为两种精心选择的 typefaces。`GeistMono`（Vercel 的 monospace font）负责 display-level headlines，尺寸达到惊人的 320px、weight 300，同时也作为 button typeface，以 uppercase 和 tracked-out letter-spacing (1.4px) 使用。`universalSans` 负责所有 body 和 secondary heading text，呈现干净、几何化的 sans-serif 声音。把 monospace 作为 display font 是 defining aesthetic decision：它把 xAI 定位为 infrastructure，而不是 consumer product；像是由长期生活在 terminals 里的人构建出的东西。

Spacing system 基于 8px base grid，数值集中在小端（4px、8px、24px、48px），反映出 dense、information-focused 的 layout philosophy。Border radius 极小：网站几乎不圆角，保持 sharp、architectural edges。没有 decorative shadows、没有 gradients、没有 layered elevation。Depth 完全通过 contrast 和 whitespace 传达。

**Key Characteristics:**
- Pure dark theme：`#1f2228` background 配 `#ffffff` text，没有 gray middle ground
- GeistMono 使用极端 display sizes（320px、weight 300）：monospace as luxury
- Uppercase monospace buttons，带 1.4px letter-spacing：技术感、命令式
- universalSans 用于 body text（16px/1.5）和 headings（30px/1.2）：形成干净 contrast
- 零 decorative elements：没有 shadows、没有 gradients、没有 colored accents
- 8px spacing grid，scale 稀疏且克制
- Heroicons SVG icon system：minimal、functional
- Tailwind CSS with arbitrary values：utility-first engineering approach

## 2. Color Palette & Roles

### Primary
- **Pure White** (`#ffffff`)：唯一的 text color、link color 和所有 foreground elements。在 xAI 系统中，white 不是 background，而是 voice。
- **Dark Background** (`#1f2228`)：Canvas。带细微 blue undertone 的 warm near-black（不是 pure black，也不是 neutral gray）。这个特定 hue 在保持深暗的同时，避免 `#000000` 带来的刺眼疲劳。

### Interactive
- **White Default** (`#ffffff`)：默认状态下的 link 和 interactive element color。
- **White Muted** (`rgba(255, 255, 255, 0.5)`)：links 的 hover state；是刻意 dimming 而不是 brightening，这一点少见且有辨识度。
- **White Subtle** (`rgba(255, 255, 255, 0.2)`)：Borders、dividers 和 subtle surface treatments。
- **Ring Blue** (`rgb(59, 130, 246) / 0.5`)：Tailwind 的默认 focus ring color（`--tw-ring-color`），用于 keyboard accessibility focus states。

### Surface & Borders
- **Surface Elevated** (`rgba(255, 255, 255, 0.05)`)：Subtle card backgrounds 和 hover surfaces；几乎不可见的 lift。
- **Surface Hover** (`rgba(255, 255, 255, 0.08)`)：Interactive containers 更可见一点的 hover state。
- **Border Default** (`rgba(255, 255, 255, 0.1)`)：Cards、dividers 和 containers 的标准 border。
- **Border Strong** (`rgba(255, 255, 255, 0.2)`)：Active states 和 button outlines 的 emphasized borders。

### Functional
- **Text Primary** (`#ffffff`)：所有 headings、body text、labels。
- **Text Secondary** (`rgba(255, 255, 255, 0.7)`)：Descriptions、captions、supporting text。
- **Text Tertiary** (`rgba(255, 255, 255, 0.5)`)：Muted labels、placeholder text、timestamps。
- **Text Quaternary** (`rgba(255, 255, 255, 0.3)`)：Disabled text、极细微 annotations。

## 3. Typography Rules

### Font Family
- **Display / Buttons**: `GeistMono`, with fallback: `ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New`
- **Body / Headings**: `universalSans`, with fallback: `universalSans Fallback`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Transform | Notes |
|------|------|------|--------|-------------|----------------|-----------|-------|
| Display Hero | GeistMono | 320px (20rem) | 300 | 1.50 | normal | none | Extreme scale, monospace luxury |
| Section Heading | universalSans | 30px (1.88rem) | 400 | 1.20 (tight) | normal | none | Clean sans-serif contrast |
| Body | universalSans | 16px (1rem) | 400 | 1.50 | normal | none | Standard reading text |
| Button | GeistMono | 14px (0.88rem) | 400 | 1.43 | 1.4px | uppercase | Tracked monospace, commanding |
| Label / Caption | universalSans | 14px (0.88rem) | 400 | 1.50 | normal | none | Supporting text |
| Small / Meta | universalSans | 12px (0.75rem) | 400 | 1.50 | normal | none | Timestamps, footnotes |

### Principles
- **Monospace as display**：320px 的 GeistMono 不是 gimmick，而是 brand statement。极端尺度下的 fixed-width characters 形成 rhythmic、architectural quality，这是 proportional font 无法实现的。
- **Light weight at scale**：320px headline 使用 weight 300，避免 monospace 在极端尺寸下显得沉重或粗暴。它读起来精准，而不是压迫。
- **Uppercase buttons**：所有 button text 都是 uppercase GeistMono，带 1.4px letter-spacing。这让 interactive elements 呈现明显技术化、近似 command-line 的 aesthetic。
- **Sans-serif for reading**：16px/1.5 的 universalSans 为 body content 提供出色可读性，并与 monospace display elements 形成干净 contrast。
- **Two-font clarity**：系统只使用两种 typefaces，且角色清楚：monospace 用于 impact 和 interaction，sans-serif 用于 information 和 reading。没有重叠，没有歧义。

## 4. Component Stylings

### Buttons

**Primary (White on Dark)**
- Background: `#ffffff`
- Text: `#1f2228`
- Padding: 12px 24px
- Radius: 0px（sharp corners）
- Font: GeistMono 14px weight 400, uppercase, letter-spacing 1.4px
- Hover: `rgba(255, 255, 255, 0.9)` background
- Use: Primary CTA（"TRY GROK", "GET STARTED"）

**Ghost / Outlined**
- Background: transparent
- Text: `#ffffff`
- Padding: 12px 24px
- Radius: 0px
- Border: `1px solid rgba(255, 255, 255, 0.2)`
- Font: GeistMono 14px weight 400, uppercase, letter-spacing 1.4px
- Hover: `rgba(255, 255, 255, 0.05)` background
- Use: Secondary actions（"LEARN MORE", "VIEW API"）

**Text Link**
- Background: none
- Text: `#ffffff`
- Font: universalSans 16px weight 400
- Hover: `rgba(255, 255, 255, 0.5)`；hover 时 dim
- Use: Inline links, navigation items

### Cards & Containers
- Background: `rgba(255, 255, 255, 0.03)` or transparent
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Radius: 0px（sharp）或 4px（subtle）
- Shadow: none；xAI 不使用 box shadows
- Hover: border shifts to `rgba(255, 255, 255, 0.2)`

### Navigation
- Dark background matching page (`#1f2228`)
- Brand logotype: white text, left-aligned
- Links: universalSans 14px weight 400, `#ffffff` text
- Hover: `rgba(255, 255, 255, 0.5)` text color
- CTA: white primary button, right-aligned
- Mobile: hamburger toggle

### Badges / Tags
**Monospace Tag**
- Background: transparent
- Text: `#ffffff`
- Padding: 4px 8px
- Border: `1px solid rgba(255, 255, 255, 0.2)`
- Radius: 0px
- Font: GeistMono 12px uppercase, letter-spacing 1px

### Inputs & Forms
- Background: transparent or `rgba(255, 255, 255, 0.05)`
- Border: `1px solid rgba(255, 255, 255, 0.2)`
- Radius: 0px
- Focus: ring with `rgb(59, 130, 246) / 0.5`
- Text: `#ffffff`
- Placeholder: `rgba(255, 255, 255, 0.3)`
- Label: `rgba(255, 255, 255, 0.7)`, universalSans 14px

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4px, 8px, 24px, 48px
- Scale 刻意稀疏；xAI 避免细碎的 spacing distinctions，更偏好通过大跳跃，仅靠 whitespace 建立清晰 visual hierarchy

### Grid & Container
- Max content width: approximately 1200px
- Hero: full-viewport height with massive centered monospace headline
- Feature sections: simple vertical stacking with generous section padding (48px-96px)
- Desktop 上 feature descriptions 使用 two-column layouts
- Full-width dark sections 始终维持单一 dark background

### Whitespace Philosophy
- **Extreme generosity**：xAI 使用大量 whitespace。320px headline 和周围 48px+ padding 制造出一种空旷感，而这种空旷本身就是 design statement：内容如此重要，所以需要呼吸空间。
- **Vertical rhythm over horizontal density**：Content 垂直堆叠，sections 之间有大间距，而不是横向拥挤排列。这创造出一种 deliberate、cinematic 的 scroll-driven experience。
- **No visual noise**：没有 decorative elements、没有 sections 之间的 borders、也没有颜色变化，这意味着 whitespace 是主要 structural tool。

### Breakpoints
- 2000px, 1536px, 1280px, 1024px, 1000px, 768px, 640px
- Tailwind responsive modifiers 驱动 breakpoint behavior

### Border Radius Scale
- Sharp (0px): Buttons、cards、inputs 的 primary treatment，也是默认值
- Subtle (4px): Secondary containers 上偶尔的 softening
- Near-zero radius philosophy 是品牌 brutalist identity 的核心

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no border | Page background, body content |
| Surface (Level 1) | `rgba(255,255,255,0.03)` background | Subtle card surfaces |
| Bordered (Level 2) | `1px solid rgba(255,255,255,0.1)` border | Cards, containers, dividers |
| Active (Level 3) | `1px solid rgba(255,255,255,0.2)` border | Hover states, active elements |
| Focus (Accessibility) | `ring` with `rgb(59,130,246)/0.5` | Keyboard focus indicator |

**Elevation Philosophy**：xAI 完全拒绝传统 shadow-based elevation system。网站上没有任何 box-shadows。Depth 改由三种机制传达：(1) opacity-based borders 在 interaction 时变亮，产生元素“激活”而不是抬升的感觉；(2) 极其微妙的 background opacity shifts（`0.03` 到 `0.08`）制造几乎不可察觉的 surface differentiation；(3) 320px display type 与 16px body text 之间的巨大 scale contrast，形成 typographic depth。这是通过 contrast 和 opacity 实现的 elevation，而不是通过模拟光影。

## 7. Do's and Don'ts

### Do
- 使用 `#1f2228` 作为 universal background；绝不使用 pure black `#000000`
- 所有 display headlines 和 button text 使用 GeistMono；monospace 就是品牌
- 所有 button labels 应用 uppercase + 1.4px letter-spacing
- Massive display headline (320px) 使用 weight 300
- Borders 保持 `rgba(255, 255, 255, 0.1)`：几乎不可见，但不是不存在
- Interactive elements hover 时 dim 到 `rgba(255, 255, 255, 0.5)`；这是常规做法的反面
- 默认保持 sharp corners（0px radius）：brutalist precision
- 所有 body 和 reading text 使用 universalSans，16px/1.5

### Don't
- 不要使用 box-shadows；xAI 没有 shadow elevation
- 不要引入 white 和 dark background 之外的 color accents；monochromatic palette 是 sacred
- 不要使用 large border-radius（8px+、pill shapes）；sharp edge 是有意为之
- 不要给 headlines 使用 bold weights（600-700）；只用 weight 300-400
- 不要在 hover 时让元素变亮；xAI 改为 dim 到 `0.5` opacity
- 不要添加 decorative gradients、illustrations 或 color blocks
- 不要给 buttons 使用 proportional fonts；GeistMono uppercase 是 mandatory
- 除非功能上绝对必要，不要使用 colored status indicators；让一切都保持在 white/dark spectrum 中

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, hero headline scales dramatically down |
| Small Tablet | 640-768px | Slight increase in padding |
| Tablet | 768-1024px | Two-column layouts begin, heading sizes increase |
| Desktop | 1024-1280px | Full layout, generous whitespace |
| Large | 1280-1536px | Wider containers, more breathing room |
| Extra Large | 1536-2000px | Maximum content width, centered |
| Ultra | >2000px | Content stays centered, extreme margins |

### Touch Targets
- Buttons 使用 12px 24px padding，保证 comfortable touch
- Navigation links 使用 24px gaps
- Minimum tap target: 44px height
- Mobile: full-width buttons，方便 thumb reach

### Collapsing Strategy
- Hero: 320px monospace headline dramatic 缩小（mobile 上约 48px-64px）
- Navigation: horizontal links collapse to hamburger menu
- Feature sections: two-column to single-column stacking
- Section padding: 96px -> 48px -> 24px across breakpoints
- Massive display type 是首先 resize 的部分；它必须保持 impact，但不能 overflow

### Image Behavior
- Minimal imagery；网站依赖 typography 和 whitespace
- 任何 product screenshots 都保持 sharp corners
- Full-width media 按 viewport 比例缩放

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: Dark (`#1f2228`)
- Text Primary: White (`#ffffff`)
- Text Secondary: White 70% (`rgba(255, 255, 255, 0.7)`)
- Text Muted: White 50% (`rgba(255, 255, 255, 0.5)`)
- Text Disabled: White 30% (`rgba(255, 255, 255, 0.3)`)
- Border Default: White 10% (`rgba(255, 255, 255, 0.1)`)
- Border Strong: White 20% (`rgba(255, 255, 255, 0.2)`)
- Surface Subtle: White 3% (`rgba(255, 255, 255, 0.03)`)
- Surface Hover: White 8% (`rgba(255, 255, 255, 0.08)`)
- Focus Ring: Blue (`rgb(59, 130, 246)` at 50% opacity)
- Button Primary BG: White (`#ffffff`), text Dark (`#1f2228`)

### Example Component Prompts
- "在 #1f2228 background 上创建一个 hero section。Headline 使用 GeistMono，72px weight 300，color #ffffff，居中。Subtitle 使用 universalSans 18px weight 400，rgba(255,255,255,0.7)，max-width 600px，居中。两个 buttons：primary（white bg、#1f2228 text、0px radius、GeistMono 14px uppercase、1.4px letter-spacing、12px 24px padding）和 ghost（transparent bg、1px solid rgba(255,255,255,0.2)、white text、同样的 font treatment）。"
- "设计一个 card：transparent 或 rgba(255,255,255,0.03) background，1px solid rgba(255,255,255,0.1) border，0px radius，24px padding。No shadow。Title 使用 universalSans 22px weight 400、#ffffff。Body 使用 universalSans 16px weight 400、rgba(255,255,255,0.7)、line-height 1.5。Hover：border changes to rgba(255,255,255,0.2)。"
- "构建 navigation：#1f2228 background，full-width。Brand text left（GeistMono 14px uppercase）。Links 使用 universalSans 14px #ffffff，并在 hover 时变为 rgba(255,255,255,0.5)。右侧对齐 white primary button（GeistMono 14px uppercase、1.4px letter-spacing）。"
- "创建一个 form：dark background #1f2228。Label 使用 universalSans 14px rgba(255,255,255,0.7)。Input 使用 transparent bg、1px solid rgba(255,255,255,0.2) border、0px radius、white text 16px universalSans。Focus：blue ring rgb(59,130,246)/0.5。Placeholder：rgba(255,255,255,0.3)。"
- "设计一个 monospace tag/badge：transparent bg、1px solid rgba(255,255,255,0.2)、0px radius、GeistMono 12px uppercase、1px letter-spacing、white text、4px 8px padding。"

### Iteration Guide
1. 始终从 `#1f2228` background 开始；绝不使用 pure black 或 gray backgrounds
2. GeistMono 用于 display 和 buttons，universalSans 用于其他一切；绝不混用这些角色
3. 所有 buttons 必须是 GeistMono uppercase 并带 1.4px letter-spacing；这是 non-negotiable
4. 永远不要 shadows；depth 只来自 border opacity 和 background opacity
5. Borders 始终是低 opacity white（默认 0.1，强调时 0.2）
6. Hover behavior 是 dim to 0.5 opacity，而不是 brightening；这与多数系统相反
7. 默认 sharp corners（0px）；只在特定 secondary containers 上使用 4px
8. Body text 使用 16px universalSans 和 1.5 line-height，保证 comfortable reading
9. Generous section padding（48px-96px）；让 content 在 darkness 中呼吸
10. Monochromatic white-on-dark palette 是 absolute；除非 function critical，否则抵抗添加 color 的冲动
