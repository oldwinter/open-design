# 受 VoltAgent 启发的 Design System

> Category: AI & LLM
> AI agent framework. Void-black canvas、emerald accent、terminal-native。

## 1. Visual Theme & Atmosphere

VoltAgent 的界面是 AI 时代的 deep-space command terminal：一种面向开发者的黑暗体验，建立在 near-pure-black surfaces (`#050507`) 上，唯一的打断来自 emerald green energy 的电流脉冲。整个体验唤起凌晨 2 点盯着高性能 IDE 的感觉：黑暗、专注、带着明确目的而鲜活。这不是友好的 SaaS landing page；它是一个 engineering platform，通过 code snippets、architectural diagrams 和原始的技术自信来宣布自己。

Green accent (`#00d992`) 被以外科手术般精准的方式使用：它从 headlines、borders 和 interactive elements 中发光，像电路板上承载信号的电流。置于 carbon-black canvas 上时，这个 green 读起来像 "power on"：这是 AI agent engineering platform 的刻意视觉隐喻。Supporting palette 完全由 warm-neutral grays（`#3d3a39`、`#8b949e`、`#b8b3b0`）构成，在不引入 color noise 的情况下柔化黑暗，创造出 pure blue-grays 缺少的 cockpit-like warmth。

Typography 在 headings 上依赖 system font stack，以获得最高渲染速度和原生权威感；Inter 则以几何精度承载 body 和 UI text。Code blocks 使用 SFMono-Regular，也就是开发者在 terminals 中看到的同一字体，在每次滚动中强化工具可信度。

**Key Characteristics:**
- Carbon-black canvas (`#050507`) 搭配 warm-gray border containment (`#3d3a39`)：不冰冷，也不 sterile
- Single-accent identity：Emerald Signal Green (`#00d992`) 是唯一 chromatic energy source
- Dual-typography system：system-ui 用于权威 headings，Inter 用于精准 UI/body text，SFMono 用于 code credibility
- Ultra-tight heading line-heights（1.0-1.11），形成 dense、compressed power blocks
- Warm neutral palette（`#3d3a39`、`#8b949e`、`#b8b3b0`），避免 dark theme 显得 clinical
- Developer-terminal aesthetic：code snippets 本身就是 hero content
- Green glow effects（`drop-shadow`、border accents）让 UI elements 像通电一样鲜活

## 2. Color Palette & Roles

### Primary
- **Emerald Signal Green** (`#00d992`)：核心 brand energy；用于 accent borders、glow effects 和最高信号的 interactive moments。这是整个 interface 的 "power-on" indicator。
- **VoltAgent Mint** (`#2fd6a1`)：brand green 的 button-text variant；比 pure Signal Green 略暖、更可读，专用于 dark surfaces 上的 CTA text。
- **Tailwind Emerald** (`#10b981`)：生态标准 green，以低 opacity（30%）用于 subtle background tints 和 link defaults。它将 VoltAgent custom palette 与 Tailwind utility classes 连接起来。

### Secondary & Accent
- **Soft Purple** (`#818cf8`)：cool indigo-violet，谨慎用于 secondary categorization、code syntax highlights 和不与 green 竞争的 visual variety。
- **Cobalt Primary** (`#306cce`)：Docusaurus primary dark；在 documentation contexts 中用于 links 和 interactive focus states。
- **Deep Cobalt** (`#2554a0`)：最深的 primary shade，保留给 documentation UI 中的 pressed/active states。
- **Ring Blue** (`#3b82f6`)：Tailwind 的 ring color，50% opacity；只在 keyboard focus 时可见，用于 accessibility compliance。

### Surface & Background
- **Abyss Black** (`#050507`)：Landing page canvas；带极轻微 warm undertone 的 near-pure black，比多数 "dark themes" 更深，用来与 green accents 形成最大 contrast。
- **Carbon Surface** (`#101010`)：Primary card 和 button background；比 Abyss 亮一档，形成几乎不可察觉的 elevation layer。用于所有 contained surfaces。
- **Warm Charcoal Border** (`#3d3a39`)：Signature containment color；不是 cold gray，而是温暖、几乎带褐色的 dark tone，避免 borders 在 black canvas 上显得刺眼。

### Neutrals & Text
- **Snow White** (`#f2f2f2`)：Dark surfaces 上的 primary text color；不是 pure white (`#ffffff`)，而是柔化、护眼的 off-white。站点最常用的颜色（1008 instances）。
- **Pure White** (`#ffffff`)：保留给最高强调时刻：ghost button text 和最大 contrast headings。也以低 opacity（5%）用于 subtle overlay effects。
- **Warm Parchment** (`#b8b3b0`)：Secondary body text；带轻微 pinkish undertone 的 warm light gray，在 dark canvas 上读起来像 "paper"。
- **Steel Slate** (`#8b949e`)：Tertiary text、metadata、timestamps 和 de-emphasized content。它是 cool blue-gray，在 Warm Parchment 下方提供清晰 hierarchy。
- **Fog Gray** (`#bdbdbd`)：Footer links 和 supporting navigation text；hover 时变亮为 Pure White。
- **Mist Gray** (`#dcdcdc`)：比 Fog 略亮，用于 secondary link text，并在 hover 时过渡到 bright green。
- **Near White** (`#eeeeee`)：最高 contrast 的 secondary text，比 Snow White 低一级。

### Semantic & Accent
- **Success Emerald** (`#008b00`)：Documentation contexts 中用于 success states 和 positive confirmations 的 deep green。
- **Success Light** (`#80d280`)：用于 success backgrounds 和 subtle positive indicators 的 soft pastel green。
- **Warning Amber** (`#ffba00`)：用于 warning alerts 和 caution states 的 bright amber。
- **Warning Pale** (`#ffdd80`)：用于 warning background fills 的 softened amber。
- **Danger Coral** (`#fb565b`)：用于 error states 和 destructive action warnings 的 vivid red。
- **Danger Rose** (`#fd9c9f`)：用于 error backgrounds 的 softened coral-pink。
- **Info Teal** (`#4cb3d4`)：用于 informational callouts 和 tip admonitions 的 cool teal-blue。
- **Dashed Border Slate** (`#4f5d75` at 40%)：muted blue-gray，专用于 workflow diagrams 中的 decorative dashed borders。

### Gradient System
- **Green Signal Glow**: `drop-shadow(0 0 2px #00d992)` 动画到 `drop-shadow(0 0 8px #00d992)`；在 VoltAgent bolt logo 和 interactive elements 上制造 pulsing "electric charge" effect。Glow 像心跳一样扩张和收缩。
- **Warm Ambient Haze**: `rgba(92, 88, 85, 0.2) 0px 0px 15px`；warm-toned diffused shadow，在 elevated cards 周围制造 soft atmospheric glow，边缘可见但没有 sharp boundaries。
- **Deep Dramatic Elevation**: `rgba(0, 0, 0, 0.7) 0px 20px 60px` 搭配 `rgba(148, 163, 184, 0.1) 0px 0px 0px 1px inset`；heavy、dramatic downward shadow，配合 faint inset slate ring，用于最 prominent floating elements。

## 3. Typography Rules

### Font Family
- **Primary (Headings)**: `system-ui`, with fallbacks: `-apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`
- **Secondary (Body/UI)**: `Inter`, fallbacks 继承自 system-ui stack。OpenType features: `"calt", "rlig"`（contextual alternates and required ligatures）
- **Monospace (Code)**: `SFMono-Regular`, with fallbacks: `Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | system-ui | 60px (3.75rem) | 400 | 1.00 (tight) | -0.65px | Maximum impact, compressed blocks |
| Section Heading | system-ui | 36px (2.25rem) | 400 | 1.11 (tight) | -0.9px | 系统中最紧的 letter-spacing |
| Sub-heading | system-ui | 24px (1.50rem) | 700 | 1.33 | -0.6px | 此尺寸下用 bold weight 强调 |
| Sub-heading Light | system-ui / Inter | 24px (1.50rem) | 300-400 | 1.33 | -0.6px | 更柔和 hierarchy 的 light weight variant |
| Overline | system-ui | 20px (1.25rem) | 600 | 1.40 | 0.5px | Uppercase transform, positive letter-spacing |
| Feature Title | Inter | 20px (1.25rem) | 500-600 | 1.40 | normal | Card headings, feature names |
| Overline Small | Inter | 18px (1.13rem) | 600 | 1.56 | 0.45px | Uppercase section labels |
| Body / Button | Inter | 16px (1.00rem) | 400-600 | 1.50-1.65 | normal | Standard text, nav links, buttons |
| Nav Link | Inter | 14.45px (0.90rem) | 500 | 1.65 | normal | Navigation-specific sizing |
| Caption / Label | Inter | 14px (0.88rem) | 400-600 | 1.43-1.65 | normal | Descriptions, metadata, badge text |
| Tag / Overline Tiny | system-ui | 14px (0.88rem) | 600 | 1.43 | 2.52px | 最宽 letter-spacing，保留给 uppercase tags |
| Micro | Inter | 12px (0.75rem) | 400-500 | 1.33 | normal | Smallest sans-serif text |
| Code Body | SFMono-Regular | 13-14px | 400-686 | 1.23-1.43 | normal | Inline code, terminal output, syntax 用 variable weight |
| Code Small | SFMono-Regular | 11-12px | 400 | 1.33-1.45 | normal | Tiny code references, line numbers |
| Code Button | monospace | 13px (0.81rem) | 700 | 1.65 | normal | Copy-to-clipboard button labels |

### Principles
- **System-native authority**：Display headings 使用 system-ui 而不是 custom web font；这意味着最大文本能即时渲染（无 FOIT/FOUT），并继承操作系统的原生性格。在 macOS 上是 SF Pro，在 Windows 上是 Segoe UI。设计把这种可变性视为 feature，而不是 bug。
- **Tight compression creates density**：Hero line-heights 极度压缩（1.0），并带 negative letter-spacing（-0.65px 到 -0.9px），形成像 dense technical specifications 而非 airy marketing copy 的 text blocks。
- **Weight gradient, not weight contrast**：系统使用柔和的 300->400->500->600->700 weight progression。Bold (700) 保留给 sub-headings 和 code-button emphasis。大多数 body text 位于 400-500，形成 subtle 而非 dramatic 的 hierarchy。
- **Uppercase is earned and wide**：出现 uppercase 时，总是搭配 generous letter-spacing（0.45px-2.52px），将密集词语转化为 spaced-out overline labels。这种处理绝不用于 headings。
- **OpenType by default**：system-ui 和 Inter 都启用 `"calt"` 与 `"rlig"` features，确保全文有 contextual character adjustments 和 ligature rendering。

## 4. Component Stylings

### Buttons

**Ghost / Outline (Standard)**
- Background: transparent
- Text: Pure White (`#ffffff`)
- Padding: comfortable (12px 16px)
- Border: thin solid Warm Charcoal (`1px solid #3d3a39`)
- Radius: comfortably rounded (6px)
- Hover: background darkens to `rgba(0, 0, 0, 0.2)`, opacity drops to 0.4
- Outline: subtle green tint (`rgba(33, 196, 93, 0.5)`)
- 默认 interactive element：低调但清晰可点击

**Primary Green CTA**
- Background: Carbon Surface (`#101010`)
- Text: VoltAgent Mint (`#2fd6a1`)
- Padding: comfortable (12px 16px)
- Border: none visible（基于 outline 的 focus indicator）
- Outline: VoltAgent Mint (`rgb(47, 214, 161)`)
- Hover: 与 Ghost 相同的 darkening behavior
- "powered on" button：dark surface 上的 green text 读起来像 active terminal command

**Tertiary / Emphasized Container Button**
- Background: Carbon Surface (`#101010`)
- Text: Snow White (`#f2f2f2`)
- Padding: generous (20px all sides)
- Border: thick solid Warm Charcoal (`3px solid #3d3a39`)
- Radius: comfortably rounded (8px)
- 大型 interactive surfaces（code copy blocks、feature CTAs）的 card-like button treatment

### Cards & Containers
- Background: Carbon Surface (`#101010`)：比 page canvas 亮一档
- Border: standard containment 使用 `1px solid #3d3a39` (Warm Charcoal)；highlighted/active cards 使用 `2px solid #00d992`
- Radius: content cards 使用 comfortably rounded (8px)；smaller inline containers 使用 subtly rounded (4-6px)
- Shadow Level 1: standard elevation 使用 Warm Ambient Haze (`rgba(92, 88, 85, 0.2) 0px 0px 15px`)
- Shadow Level 2: hero/feature showcase cards 使用 Deep Dramatic (`rgba(0, 0, 0, 0.7) 0px 20px 60px` + `rgba(148, 163, 184, 0.1) 0px 0px 0px 1px inset`)
- Hover behavior: 可能将 border color 向 green accent 偏移，或略微提高 opacity
- Dashed variant: workflow/diagram containers 使用 `1px dashed rgba(79, 93, 117, 0.4)`；与 solid-border content cards 视觉上区分开

### Inputs & Forms
- 未抽取到 explicit input token data；站点偏 landing-page，form UI 很少
- npm install command（`npm create voltagent-app@latest`）以 code block 展示，而不是 input field
- 推断样式：Carbon Surface background、Warm Charcoal border、VoltAgent Mint focus ring、Snow White text

### Navigation
- Sticky top nav bar 位于 Abyss Black canvas 上
- Logo: VoltAgent bolt icon，带 animated green glow（`drop-shadow` 在 2px-8px 之间循环）
- Nav structure: Logo -> Product dropdown -> Use Cases dropdown -> Resources dropdown -> GitHub stars badge -> Docs CTA
- Link text: Snow White (`#f2f2f2`)，14-16px Inter，weight 500
- Hover: links transition to green variants（`#00c182` 或 `#00ffaa`）
- GitHub badge: social proof element，直接集成在 nav 中
- Mobile: collapse 为 hamburger menu，single-column vertical layout

### Image Treatment
- Dark-themed product screenshots 和 architectural diagrams 占主导
- Code blocks 被作为 primary visual content：使用 SFMono-Regular 做 syntax-highlighted
- Agent workflow visualizations 以 interactive node graphs 呈现，带 green connection lines
- Decorative dot-pattern backgrounds 出现在 hero sections 后方
- Card containers 内 full-bleed，并遵守 8px radius rounding

### Distinctive Components

**npm Install Command Block**
- 突出的 code snippet（`npm create voltagent-app@latest`），作为 copyable command
- Carbon Surface 上的 SFMono-Regular，并配 copy-to-clipboard button
- 作为 primary CTA：体现“install first, read later”的 developer psychology

**Company Logo Marquee**
- Developer/company logos 的水平滚动条
- Infinite animation（`scrollLeft`/`scrollRight`，25-80s durations）
- Hover 时暂停，也为 reduced-motion preferences 用户暂停
- 展示 ecosystem adoption，同时不弄乱 layout

**Feature Section Cards**
- 组合 code examples 与 descriptive text 的 large cards
- Left: code snippet with syntax highlighting; Right: feature description
- Highlighted/active features 使用 green accent border（`2px solid #00d992`）
- Internal padding: generous（估计 24-32px）

**Agent Flow Diagrams**
- 展示 agent coordination 的 interactive node-graph visualizations
- Connection lines 使用 VoltAgent green variants
- Nodes 被设计为 Warm Charcoal border system 内的 mini-cards

**Community / GitHub Section**
- Large GitHub icon 作为 visual anchor
- Star count 和 contributor metrics 醒目展示
- Warm social proof：footer 中的 Discord、X、Reddit、LinkedIn、YouTube links

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 2px, 4px, 5px, 6px, 6.4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 48px, 64px
- Button padding: 12px 16px（standard），20px（container-button）
- Card internal padding: approximately 24-32px
- Section vertical spacing: generous（major sections 之间估计 64-96px）
- Component gap: sibling cards/elements 之间 16-24px

### Grid & Container
- Max container width: approximately 1280-1440px, centered
- Hero: centered single-column with maximum breathing room
- Feature sections: alternating asymmetric layouts（code left / text right，然后反向）
- Logo marquee: full-width horizontal scroll，打破 container constraint
- Card grids: feature showcases 使用 2-3 column
- Integration grid: partner/integration icons 使用 responsive multi-column

### Whitespace Philosophy
- **Cinematic breathing room between sections**：巨大的 vertical gaps 创造 "scroll-through-chapters" experience；每个 section 都像新场景。
- **Dense within components**：Cards 和 code blocks 内部紧凑，line-heights 紧、padding 受控。信息是浓缩的，不是稀疏摊开。
- **Border-defined separation**：VoltAgent 不只依赖 whitespace，而是用 Warm Charcoal border system (`#3d3a39`) 划定 content zones。Border 本身就是 whitespace signal。
- **Hero-first hierarchy**：页面顶部占据最大空间；在第一个 content section 出现前，"AI Agent Engineering Platform" headline 和 npm command 获得最大 vertical runway。

### Border Radius Scale
- Nearly squared (4px): Small inline elements、SVG containers、code spans；最 sharp 的 treatment，传达 technical precision
- Subtly rounded (6px): Buttons、links、clipboard actions；interactive elements 的 workhorse radius
- Code-specific (6.4px): Code blocks、`pre` elements、clipboard copy targets；与标准 6px 的刻意微差
- Comfortably rounded (8px): Content cards、feature containers、emphasized buttons；标准 containment radius
- Pill-shaped (9999px): Tags、badges、status indicators、pill-shaped navigation elements；小型 categorical labels 的最圆 treatment

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no border | Page background (`#050507`), inline text |
| Contained (Level 1) | `1px solid #3d3a39`, no shadow | Standard cards, nav bar, code blocks |
| Emphasized (Level 2) | `3px solid #3d3a39`, no shadow | Large interactive buttons, emphasized containers |
| Accent (Level 3) | `2px solid #00d992`, no shadow | Active/highlighted feature cards, selected states |
| Ambient Glow (Level 4) | `rgba(92, 88, 85, 0.2) 0px 0px 15px` | Elevated cards, hover states, soft atmospheric lift |
| Dramatic Float (Level 5) | `rgba(0, 0, 0, 0.7) 0px 20px 60px` + `rgba(148, 163, 184, 0.1) 1px inset` | Hero feature showcase, modals, maximum-elevation content |

**Shadow Philosophy**：VoltAgent 主要通过 **border weight and color**，而不是 shadows，来传达 depth。标准 `1px solid #3d3a39` border 本身就是 elevation；增加 `3px` border weight 或切换到 green (`#00d992`) 比添加 shadow 更能传达重要性。Shadows 出现时，要么 warm and diffused（Level 4），要么 cinematic and dramatic（Level 5）；绝不 medium 或 generic。

### Decorative Depth
- **Green Signal Glow**：VoltAgent bolt logo 以 `drop-shadow` animation 在 Emerald Signal Green 中的 2px 和 8px blur radius 之间脉冲。这是最有辨识度的 decorative element，让 logo 感觉像 "powered on"。
- **Warm Charcoal Containment Lines**：`#3d3a39` borders 的 warm tone 在 cool black 上制造 subtle visual warmth，仿佛 cards 从内部微微发热。
- **Dashed Workflow Lines**：`1px dashed rgba(79, 93, 117, 0.4)` 为 architecture diagrams 创造 blueprint-like aesthetic，并与 solid content borders 明确区分。

## 7. Do's and Don'ts

### Do
- 使用 Abyss Black (`#050507`) 作为 landing page background，Carbon Surface (`#101010`) 用于所有 contained elements；two-shade dark system 是 essential
- Emerald Signal Green (`#00d992`) 只保留给 high-signal moments：active borders、glow effects 和最重要的 interactive accents
- Dark surfaces 上的 button text 使用 VoltAgent Mint (`#2fd6a1`)；它比 pure Signal Green 更可读
- Heading line-heights 保持 compressed（1.0-1.11），并用 negative letter-spacing 形成 dense、authoritative text blocks
- Borders 和 secondary text 使用 warm gray palette（`#3d3a39`、`#8b949e`、`#b8b3b0`）；warmth 避免 dark theme 变得 sterile
- 将 code snippets 作为 primary content 呈现；它们是 hero elements，不是 supporting illustrations
- 使用 border weight（1px -> 2px -> 3px）和 color shifts（`#3d3a39` -> `#00d992`）来传达 depth 和 importance，而不是依赖 shadows
- Headings 使用 system-ui、body text 使用 Inter：native fonts 的 speed/authority 配合 geometric sans 的 precision
- 所有 code content 使用 SFMono-Regular；这是 developer credibility signal
- 在所有 text 上应用 `"calt"` 和 `"rlig"` OpenType features

### Don't
- 不要使用 bright 或 light backgrounds 作为 primary surfaces；整个 identity 都生活在 near-black 上
- 不要引入 warm colors（orange、red、yellow）作为 decorative accents；palette 严格是 black 上的 green + warm neutrals。Warm colors 只保留给 semantic states（warning、error）
- 不要把 Emerald Signal Green (`#00d992`) 用在 large surfaces 或 background fills 上；它是 accent，绝不是 surface
- 不要把 heading line-heights 提高到 1.33 以上；compressed density 是 engineering-platform identity 的核心
- 不要大量使用 heavy shadows；depth 来自 border treatment，而不是 box-shadow。Shadows 只保留给 Level 4-5 elevation
- 不要把 pure white (`#ffffff`) 用作默认 body text；Snow White (`#f2f2f2`) 才是标准。Pure white 保留给 maximum-emphasis headings 和 button text
- 不要混入 serif 或 decorative fonts；整个系统是 geometric sans + monospace
- Content cards 上不要使用大于 8px 的 border-radius；9999px（pill）只用于 small tags 和 badges
- 不要跳过 warm-gray border system；没有 `#3d3a39` borders 的 cards 会失去 containment，在 dark canvas 上漂浮得含糊
- 不要激进动画；animations 应慢且 subtle（marquee 为 25-100s durations，glow pulses 轻柔）。快速运动会违背 "engineering precision" atmosphere

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Small Mobile | <420px | Minimum layout, stacked everything, reduced hero text to ~24px |
| Mobile | 420-767px | Single column, hamburger nav, full-width cards, hero text ~36px |
| Tablet | 768-1024px | 2-column grids begin, condensed nav, medium hero text |
| Desktop | 1025-1440px | Full multi-column layout, expanded nav with dropdowns, large hero (60px) |
| Large Desktop | >1440px | Max-width container centered (est. 1280-1440px), generous horizontal margins |

*共检测到 23 个 breakpoints，范围从 360px 到 1992px；这说明它是 fluid、heavily responsive grid system，而不是固定 breakpoint snapping。*

### Touch Targets
- Buttons 使用 comfortable padding（minimum 12px 16px），保证足够 touch area
- Navigation links 有足够 gap，适合 thumb navigation
- Interactive card surfaces 足够大，可作为完整 touch targets
- Minimum recommended touch target: 44x44px

### Collapsing Strategy
- **Navigation**: Full horizontal nav with dropdowns collapses to hamburger menu on mobile
- **Feature grids**: 3-column -> 2-column -> single-column vertical stacking
- **Hero text**: 60px -> 36px -> 24px progressive scaling，并保持 compression ratios
- **Logo marquee**: 调整 scroll speed 和 item sizing，同时保持 infinite loop
- **Code blocks**: 小 viewport 上 horizontal scroll 而不是 wrapping，以保持 code readability
- **Section padding**: 按比例减少，但保留 chapters 之间 generous vertical rhythm
- **Cards**: Mobile 上垂直堆叠，full-width treatment，并保持 internal padding

### Image Behavior
- Dark-themed screenshots 和 diagrams 在 containers 内按比例缩放
- Agent flow diagrams 在 narrow viewports 上简化或 horizontal scroll
- Dot-pattern decorative backgrounds 随 viewport 缩放
- Breakpoints 之间没有可见 art direction changes：同样 crops，按比例缩放
- Below-fold images 使用 lazy loading（Docusaurus default behavior）

## 9. Agent Prompt Guide

### Quick Color Reference
- Brand Accent: "Emerald Signal Green (#00d992)"
- Button Text: "VoltAgent Mint (#2fd6a1)"
- Page Background: "Abyss Black (#050507)"
- Card Surface: "Carbon Surface (#101010)"
- Border / Containment: "Warm Charcoal (#3d3a39)"
- Primary Text: "Snow White (#f2f2f2)"
- Secondary Text: "Warm Parchment (#b8b3b0)"
- Tertiary Text: "Steel Slate (#8b949e)"

### Example Component Prompts
- "创建一个 feature card：使用 Carbon Surface (#101010)，1px solid Warm Charcoal (#3d3a39) border，comfortably rounded corners (8px)。Title 使用 Snow White (#f2f2f2)、system-ui、24px weight 700；description 使用 Warm Parchment (#b8b3b0)、Inter、16px。添加 subtle Warm Ambient shadow（rgba(92, 88, 85, 0.2) 0px 0px 15px）。"
- "设计一个 ghost button：transparent background，Snow White (#f2f2f2) text，Inter 16px，1px solid Warm Charcoal (#3d3a39) border，subtly rounded corners (6px)。Padding: 12px vertical、16px horizontal。Hover 时 background shifts to rgba(0, 0, 0, 0.2)。"
- "构建一个 hero section：Abyss Black (#050507) 上放置 massive heading，60px system-ui、line-height 1.0、letter-spacing -0.65px。单词 'Platform' 应使用 Emerald Signal Green (#00d992)。Heading 下方放置 code block，展示 'npm create voltagent-app@latest'，使用 SFMono-Regular 14px，位于 Carbon Surface (#101010) 上，并带 copy button。"
- "创建一个 highlighted feature card：使用 2px solid Emerald Signal Green (#00d992) border，而不是标准 Warm Charcoal。保持 Carbon Surface background、comfortably rounded corners (8px)，并在左侧包含 code snippet、右侧包含 feature description text。"
- "设计一个 navigation bar：Abyss Black (#050507) 上，左侧是 VoltAgent logo（带 animated green glow 的 bolt icon），nav links 使用 Inter 14px weight 500、Snow White，右侧是 green CTA button（Carbon Surface bg、VoltAgent Mint text）。添加 1px solid Warm Charcoal bottom border。"

### Iteration Guide
使用此 design system 优化已有生成 screens 时：
1. 一次只关注 ONE component
2. 引用 specific color names and hex codes：写 "use Warm Parchment (#b8b3b0)"，不要只写 "make it lighter"
3. 用 border treatment 传达 elevation：强调时写 "change the border to 2px solid Emerald Signal Green (#00d992)"
4. 在 measurements 旁描述期望的 "feel"：例如 "compressed and authoritative heading at 36px with line-height 1.11 and -0.9px letter-spacing"
5. Glow effects 要明确写 "Emerald Signal Green (#00d992) as a drop-shadow with 2-8px blur radius"
6. 始终指定 font：headings 用 system-ui，body/UI 用 Inter，code 用 SFMono-Regular
7. 动画保持 slow and subtle：marquee scrolls at 25-80s，glow pulses gently
