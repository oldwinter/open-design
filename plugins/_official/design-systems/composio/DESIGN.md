# Inspired by Composio 的 Design System

> Category: Backend & Data
> 工具集成平台。现代暗色界面，搭配多彩 integration icons。

## 1. 视觉主题与氛围

Composio 的 interface 像一座夜间 command center：密集、面向开发者的黑暗，被 electric cyan 和 deep cobalt signal 点亮。整个体验建立在近乎纯黑的 canvas（`#0f0f0f`）之上，content 漂浮在几乎不可见的 containment border 中，营造出高科技 control panel 的感觉，而不是传统 marketing page。它对生活在 dark terminal 里的开发者低声传递权威。

视觉语言强烈靠近 code editor 和 terminal window 的美学。JetBrains Mono 与 abcDiatype 的几何精度并置，强化了“这是由开发者为开发者构建的工具”这一信息。Decorative elements 克制但有冲击：微妙的 cyan-blue gradient glow 从 card 和 section 中发散，像深海里的 bioluminescent organism；而 select element 上的 hard-offset shadows（`4px 4px`）则加入一种粗粝的 brutalist edge，防止设计变得无菌。

Composio 的独特之处在于极端 minimalism 与策略性色彩爆发之间的张力。站点从不大喊；heading 使用 tight line-heights（0.87），把 text 压缩成密集、权威的 block。Color 像稀缺资源一样配给：primary content 用 white text，secondary 用 semi-transparent white（`rgba(255,255,255,0.5-0.6)`），brand blue（`#0007cd`）或 electric cyan（`#00ffff`）只保留给 interactive moment 和 accent glow。

**关键特征：**
- Pitch-black canvas，带近乎不可见的 white-border containment（4-12% opacity）
- 双字体身份：content 使用 geometric sans-serif（abcDiatype），technical credibility 使用 monospace（JetBrains Mono）
- Ultra-tight heading line-heights（0.87-1.0），创造压缩、有冲击力的 text block
- Bioluminescent accent strategy：cyan 和 blue glow 像从内部发光
- Select interactive element 使用 hard-offset brutalist shadows（`4px 4px`）
- Monochrome hierarchy，color 只用于最高信号时刻
- Developer-terminal aesthetic，在 marketing 与 documentation 之间架桥

## 2. 色彩 Palette 与角色

### Primary
- **Composio Cobalt** (`#0007cd`): 核心品牌色，一种深且饱和的 blue，少量用于高优先级 interactive element 和 brand moment。它以安静强度锚定身份。

### Secondary & Accent
- **Electric Cyan** (`#00ffff`): 抓注意力的 accent；以低 opacity（`rgba(0,255,255,0.12)`）用于 glowing button background 和 card highlight。全饱和时，它是 dark canvas 的能量对位。
- **Signal Blue** (`#0089ff` / `rgb(0,137,255)`): 用于 select button border 和 interactive focus state，桥接 Cobalt 与 Cyan。
- **Ocean Blue** (`#0096ff` / `rgb(0,150,255)`): CTA button 上的 accent border color，比 Signal Blue 略暖。

### Surface & Background
- **Void Black** (`#0f0f0f`): Primary page background。不是 pure black，而是稍暖一点，降低暗色显示上的眼疲劳。
- **Pure Black** (`#000000`): 用于 card interiors 和 deep-nested containers，与 page background 形成 subtle depth distinction。
- **Charcoal** (`#2c2c2c` / `rgb(44,44,44)`): 用于 dark surface 上的 secondary button border 和 divider line。

### Neutrals & Text
- **Pure White** (`#ffffff`): Dark surface 上的 primary heading 和 high-emphasis text color。
- **Muted Smoke** (`#444444`): De-emphasized body text、metadata 和 tertiary content。
- **Ghost White** (`rgba(255,255,255,0.6)`): Secondary body text 和 link label，可见但刻意后退。
- **Whisper White** (`rgba(255,255,255,0.5)`): Tertiary button text 和 placeholder content。
- **Phantom White** (`rgba(255,255,255,0.2)`): Subtle button background 和深度后退的 UI chrome。

### Semantic & Accent
- **Border Mist 12** (`rgba(255,255,255,0.12)`): 最高 opacity 的 border treatment，用于 prominent card edge 和 content separator。
- **Border Mist 10** (`rgba(255,255,255,0.10)`): Dark surface 上的 standard container border。
- **Border Mist 08** (`rgba(255,255,255,0.08)`): Subtle section divider 和 secondary card edge。
- **Border Mist 06** (`rgba(255,255,255,0.06)`): Background grouping 上近乎不可见的 containment border。
- **Border Mist 04** (`rgba(255,255,255,0.04)`): 最淡 border，只用于 atmospheric separation。
- **Light Border** (`#e0e0e0` / `rgb(224,224,224)`): 保留给 light-surface context（本站少见）。

### Gradient System
- **Cyan Glow**: 使用 very low opacity `#00ffff` 的 radial gradient，在 card 和 feature section 后方制造 bioluminescent halo。
- **Blue-to-Black Fade**: 从 Composio Cobalt（`#0007cd`）淡入 Void Black（`#0f0f0f`）的 linear gradient，用于 hero background 和 section transition。
- **White Fog**: 页面底部从暗色过渡到 diffused white/gray 的 gradient，在 footer 附近制造 atmospheric "horizon line" effect。

## 3. 字体规则

### Font Family
- **Primary**: `abcDiatype`，fallbacks: `abcDiatype Fallback, ui-sans-serif, system-ui, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`
- **Monospace**: `JetBrains Mono`，fallbacks: `JetBrains Mono Fallback, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New`
- **System Monospace** (fallback): `Menlo`, `monospace`，用于最小 inline code

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | abcDiatype | 64px (4rem) | 400 | 0.87 (ultra-tight) | normal | 巨大、压缩的 heading |
| Section Heading | abcDiatype | 48px (3rem) | 400 | 1.00 (tight) | normal | Major feature section title |
| Sub-heading Large | abcDiatype | 40px (2.5rem) | 400 | 1.00 (tight) | normal | Secondary section marker |
| Sub-heading | abcDiatype | 28px (1.75rem) | 400 | 1.20 (tight) | normal | Card title、feature name |
| Card Title | abcDiatype | 24px (1.5rem) | 500 | 1.20 (tight) | normal | Medium-emphasis card heading |
| Feature Label | abcDiatype | 20px (1.25rem) | 500 | 1.20 (tight) | normal | Smaller card title、label |
| Body Large | abcDiatype | 18px (1.125rem) | 400 | 1.20 (tight) | normal | Intro paragraph |
| Body / Button | abcDiatype | 16px (1rem) | 400 | 1.50 | normal | Standard body text、nav link、button |
| Body Small | abcDiatype | 15px (0.94rem) | 400 | 1.63 (relaxed) | normal | Longer-form body text |
| Caption | abcDiatype | 14px (0.875rem) | 400 | 1.63 (relaxed) | normal | Description、metadata |
| Label | abcDiatype | 13px (0.81rem) | 500 | 1.50 | normal | UI label、badge |
| Tag / Overline | abcDiatype | 12px (0.75rem) | 500 | 1.00 (tight) | 0.3px | Uppercase overline label |
| Micro | abcDiatype | 12px (0.75rem) | 400 | 1.00 (tight) | 0.3px | Smallest sans-serif text |
| Code Body | JetBrains Mono | 16px (1rem) | 400 | 1.50 | -0.32px | Inline code、terminal output |
| Code Small | JetBrains Mono | 14px (0.875rem) | 400 | 1.50 | -0.28px | Code snippet、technical label |
| Code Caption | JetBrains Mono | 12px (0.75rem) | 400 | 1.50 | -0.28px | Small code reference |
| Code Overline | JetBrains Mono | 14px (0.875rem) | 400 | 1.43 | 0.7px | Uppercase technical label |
| Code Micro | JetBrains Mono | 11px (0.69rem) | 400 | 1.33 | 0.55px | Tiny uppercase code tag |
| Code Nano | JetBrains Mono | 9-10px | 400 | 1.33 | 0.45-0.5px | Smallest monospace text |

### Principles
- **Compression creates authority**：Heading line-height 大幅收紧（0.87-1.0），让大字号 text 变得密集、命令式，而不是轻飘装饰。
- **Dual personality**：abcDiatype 承载 marketing voice：几何、精确、友好。JetBrains Mono 承载 technical voice：可信、功能性、开发者熟悉。
- **Weight restraint**：几乎所有 text 都是 weight 400（regular）。Weight 500（medium）只保留给小 label、badge 和 select card title。Weight 700（bold）只出现在 microscopic system-monospace context。
- **Negative letter-spacing on code**：JetBrains Mono 使用 negative letter-spacing（-0.28px 到 -0.98px），让 code block 更密、更紧，像真实 IDE。
- **Uppercase is earned**：`uppercase` + `letter-spacing` 只保留给 tiny overline label 和 technical tag，绝不用于 heading。

## 4. Component Stylings

### Buttons

**Primary CTA (White Fill)**
- Background: Pure White (`#ffffff`)
- Text: Near Black (`oklch(0.145 0 0)`)
- Padding: comfortable（8px 24px）
- Border: none
- Radius: subtly rounded（基于 token scale 推测为 4px）
- Hover: 可能是 subtle opacity reduction 或轻微 gray shift

**Cyan Accent CTA**
- Background: 12% opacity 的 Electric Cyan（`rgba(0,255,255,0.12)`）
- Text: Near Black (`oklch(0.145 0 0)`)
- Padding: comfortable（8px 24px）
- Border: thin solid Ocean Blue（`1px solid rgb(0,150,255)`）
- Radius: subtly rounded（4px）
- 在 dark background 上制造 "glowing from within" effect

**Ghost / Outline (Signal Blue)**
- Background: transparent
- Text: Near Black (`oklch(0.145 0 0)`)
- Padding: balanced（10px）
- Border: thin solid Signal Blue（`1px solid rgb(0,137,255)`）
- Hover: 可能 fill 或 border color shift

**Ghost / Outline (Charcoal)**
- Background: transparent
- Text: Near Black (`oklch(0.145 0 0)`)
- Padding: balanced（10px）
- Border: thin solid Charcoal（`1px solid rgb(44,44,44)`）
- 用于 dark surface 上的 secondary/tertiary action

**Phantom Button**
- Background: Phantom White（`rgba(255,255,255,0.2)`）
- Text: Whisper White（`rgba(255,255,255,0.5)`）
- 无 visible border
- 用于深度弱化的 action

### Cards & Containers
- Background: Pure Black (`#000000`) 或 transparent
- Border: white 低 opacity，根据 prominence 从 Border Mist 04（`rgba(255,255,255,0.04)`）到 Border Mist 12（`rgba(255,255,255,0.12)`）变化
- Radius: barely rounded corners（inline element 为 2px，content card 为 4px）
- Shadow: select card 使用 hard-offset brutalist shadow（`rgba(0,0,0,0.15) 4px 4px 0px 0px`），这是一种增加 raw depth 的独特设计选择
- Elevation shadow: 更深 container 使用 soft diffuse shadow（`rgba(0,0,0,0.5) 0px 8px 32px`）
- Hover behavior: 可能是 subtle border opacity increase 或 faint glow effect

### Inputs & Forms
- 未提取到显式 input token data；input 可能遵循 dark-surface pattern：
  - Background: transparent 或 Pure Black
  - Border: Border Mist 10（`rgba(255,255,255,0.10)`）
  - Focus: border 切到 Signal Blue（`#0089ff`）或 Electric Cyan
  - Text: Pure White，placeholder 为 Ghost White

### Navigation
- Dark/black background 上的 sticky top nav bar
- Logo（white SVG）：左侧 Composio wordmark
- Nav links: Pure White（`#ffffff`），standard body size（16px，abcDiatype）
- Nav 中的 CTA button: White Fill Primary style
- Mobile: 折叠为 hamburger menu，single-column layout
- Nav 下方 subtle bottom border（Border Mist 06-08）

### Image Treatment
- Dark-themed product screenshots 和 UI mockups 占主导
- Image 位于符合 card system 的 bordered container 内
- Feature image 背后或下方使用 blue/cyan gradient glow
- 除 container rounding（4px）外，image 没有明显 border-radius
- 在 card container 内 full-bleed

### Distinctive Components

**Stats/Metrics Display**
- Large monospace numbers（JetBrains Mono），例如 "10k+"
- 紧凑 layout，下方有 subtle label text

**Code Blocks / Terminal Previews**
- Dark container，使用 JetBrains Mono
- Syntax-highlighted content
- Subtle bordered containers（Border Mist 10）

**Integration/Partner Logos Grid**
- Dark surface 上的 tool logos grid layout
- 包含在 bordered card 内
- 展示 ecosystem breadth

**"COMPOSIO" Brand Display**
- Oversized brand typography，可能是页面上最大的 text
- 用作 section divider/brand statement
- Stark white on black

## 5. 布局原则

### Spacing System
- Base unit: 8px
- Scale: 1px, 2px, 4px, 6px, 8px, 10px, 12px, 14px, 16px, 18px, 20px, 24px, 30px, 32px, 40px
- Component padding: 通常从 10px（button）到 24px（CTA button horizontal）
- Section padding: major section 之间有慷慨 vertical spacing（估计 80-120px）
- Card internal padding: 约 24-32px

### Grid & Container
- Max container width: 约 1200px，居中
- Content section 使用 single-column 或 2-3 column grid 放 feature card
- Hero: 居中的 single-column，最大化冲击
- Feature sections: 非对称 layout，混合 text block 与 product screenshot

### Whitespace Philosophy
- **Breathing room between sections**: 大 vertical gap 在页面滚动中创造清晰“章节”。
- **Dense within components**: Card 和 text block 内部紧凑（tight line-heights、minimal internal padding），形成聚焦的信息节点。
- **Contrast-driven separation**: Composio 不只依赖 whitespace，还使用 border opacity difference 和 subtle background shift 来勾勒 content zone。

### Border Radius Scale
- Nearly squared（2px）: Inline code span、small tag、pre block；最锐利的处理，传达 technical precision
- Subtly rounded（4px）: Content card、image、standard container；主力 radius
- Pill-shaped（37px）: Select button 和 badge；为 key CTA 带来更柔和、更亲近的感觉
- Full round（9999px+）: Circular element、avatar-like container、decorative dot

## 6. 深度与 Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no border | Page background、inline text |
| Contained (Level 1) | Border Mist 04-08，无 shadow | Background grouping、subtle section |
| Card (Level 2) | Border Mist 10-12，无 shadow | Standard content card、code block |
| Brutalist (Level 3) | Hard offset shadow（`4px 4px`，15% black） | Select interactive card、distinctive feature highlight |
| Floating (Level 4) | Soft diffuse shadow（`0px 8px 32px`，50% black） | Modal、overlay、深度 elevated content |

**Shadow Philosophy**: Composio 少量且有意地使用 shadow。Hard-offset brutalist shadow 是签名动作；它用 raw、近似 retro-computing 的感觉打破 sleek darkness。Soft diffuse shadow 只保留给真正 floating 的 element。大多数深度通过 border opacity gradation 表达，而不是 shadow。

### Decorative Depth
- **Cyan Glow Halos**: 在 feature card 和 image 背后使用低 opacity Electric Cyan 的 radial gradient halo。制造一种 UI element 正在发光的 "screen glow" effect。
- **Blue-Black Gradient Washes**: Section background 使用从 Composio Cobalt 到 Void Black 的 linear gradient，加入 subtle color temperature shift。
- **White Fog Horizon**: 页面底部从暗色过渡到 diffused white/gray 的 gradient，在 footer 前创造 atmospheric "dawn" effect。

## 7. Do's and Don'ts

### Do
- 使用 Void Black (`#0f0f0f`) 作为 primary page background；main surface 绝不使用 pure white
- Heading line-height 保持 ultra-tight（0.87-1.0），形成 compressed、authoritative text block
- 使用 white-opacity borders（4-12%）做 containment；这里它们比 shadow 更重要
- 只在 high-signal moment 使用 Electric Cyan (`#00ffff`)：CTA、glow、interactive accent
- 将 abcDiatype 与 JetBrains Mono 配对，强化 developer-tool identity
- 在 select element 上有意使用 hard-offset shadow（`4px 4px`），注入 brutalist personality
- 即使在最暗背景上，也保持 button text 为 dark（`oklch(0.145 0 0)`）；button 自带 surface
- 通过 opacity-based borders 叠出 subtle depth，而不是依靠 shadow
- Uppercase + letter-spacing 只用于 tiny overline label（12px 或更小）

### Don't
- 不要把 bright background 或 light surface 用作 primary container
- 不要到处使用 heavy shadows；深度来自 border opacity，而不是 box-shadow
- 不要把 Composio Cobalt (`#0007cd`) 用作 text color；它在暗底上太暗，在亮底上又太饱和
- 不要把 heading line-height 提高到 1.2 以上；compressed feel 是身份核心
- 不要在 body 或 heading text 上使用 bold（700）weight；400-500 是上限
- 不要混入 warm colors；palette 严格保持 cool（blue、cyan、white、black）
- Content card 上不要使用大于 4px 的 border-radius；near-square corner 的精度是有意的
- 不要在大 surface 上 full opacity 使用 Electric Cyan；它是 accent，background 中最多 12%
- 不要使用 decorative serif 或 handwritten fonts；整个身份是 geometric sans + monospace
- Technical content 不要跳过 monospace font；JetBrains Mono 不是装饰，而是 credibility signal

## 8. 响应式行为

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <768px | Single column，hamburger nav，full-width cards，减少 section padding，hero text 缩到约 28-40px |
| Tablet | 768-1024px | Card 使用 2-column grid，condensed nav，hero text 略微减小 |
| Desktop | 1024-1440px | Full multi-column layout，expanded nav 显示所有 links，大 hero typography（64px） |
| Large Desktop | >1440px | Max-width container 居中，慷慨 horizontal margins |

### Touch Targets
- 所有 interactive element 最小 touch target 为 44x44px
- Button 使用 comfortable padding（最小 8px 24px），保证足够触摸面积
- Nav link 间距足够，适合 thumb navigation

### Collapsing Strategy
- **Navigation**: Desktop 上 full horizontal nav，mobile 上折叠为 hamburger
- **Feature grids**: 3-column → 2-column → single-column stacking
- **Hero text**: 64px → 40px → 28px progressive scaling
- **Section padding**: 按比例减少，但保持慷慨 vertical rhythm
- **Cards**: Mobile 上垂直堆叠，full-width treatment
- **Code blocks**: 小 viewport 上 horizontal scroll，而不是 wrapping

### Image Behavior
- Product screenshot 在 container 内按比例缩放
- Dark-themed image 在所有尺寸上保持暗色背景上的对比
- Gradient glow effect 随 container size 缩放
- Breakpoint 之间没有明显 art direction change：same crops、proportional scaling

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: "Pure White (#ffffff)"
- Page Background: "Void Black (#0f0f0f)"
- Brand Accent: "Composio Cobalt (#0007cd)"
- Glow Accent: "Electric Cyan (#00ffff)"
- Heading Text: "Pure White (#ffffff)"
- Body Text: "Ghost White (rgba(255,255,255,0.6))"
- Card Border: "Border Mist 10 (rgba(255,255,255,0.10))"
- Button Border: "Signal Blue (#0089ff)"

### Example Component Prompts
- "创建 feature card：near-black background (#000000)，几乎不可见的 10% opacity white border，subtly rounded corners（4px），以及 hard-offset shadow（右移 4px、下移 4px、15% black）。Title 使用 Pure White、abcDiatype 24px weight 500；description 使用 Ghost White（60% opacity）、16px。"
- "设计 primary CTA button：solid white background、near-black text、comfortable padding（8px vertical、24px horizontal）和 subtly rounded corners。旁边放一个 secondary button，transparent background、Signal Blue border，并保持 matching padding。"
- "构建 hero section：Void Black (#0f0f0f)，使用 64px、line-height 0.87 的 abcDiatype massive heading。Text 居中。Content 背后加入 subtle blue-to-black gradient glow。下方包含 white CTA button 和 cyan-accented secondary button。"
- "创建 code snippet display：使用 JetBrains Mono 14px、-0.28px letter-spacing，黑色背景。添加 Border Mist 10 border（rgba(255,255,255,0.10)）和 4px radius。用 white 和 cyan text 展示 syntax-highlighted content。"
- "设计 navigation bar：Void Black 上左侧为 white Composio wordmark，4-5 个 nav links 使用 white abcDiatype 16px，右侧为 white-fill CTA button。添加 Border Mist 06 bottom border。"

### Iteration Guide
在细化用此 design system 生成的现有 screen 时：
1. 一次只关注一个 component
2. 引用本文档中的具体 color name 和 hex code；写 "use Ghost White (rgba(255,255,255,0.6))"，不要只写 "make it lighter"
3. 使用自然语言描述；"make the border barely visible" = Border Mist 04-06
4. 把期望的“feel”和具体 measurement 放在一起描述，例如 "compressed and authoritative heading at 48px with line-height 1.0"
5. 对 glow effect，明确写 "Electric Cyan at 12% opacity as a radial gradient behind the element"
6. 始终指定 font：marketing 使用 abcDiatype，technical/code content 使用 JetBrains Mono
