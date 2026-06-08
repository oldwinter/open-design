# Inspired by Ollama 的 Design System

> Category: AI & LLM
> 本地运行 LLM。Terminal-first、单色、极简。

## 1. Visual Theme & Atmosphere

Ollama 的界面把激进极简主义推到逻辑终点：一片纯白留白，内容悬浮其中，没有装饰、阴影或颜色。它的设计哲学映射了产品本身：剥离所有不必要的东西，直到只剩下必要工具。这像是数字版 Dieter Rams 物件——每个像素都必须有存在理由，而“没有设计感”本身就是设计。

整个页面存在于纯灰度之中。界面里没有任何色彩性颜色——没有品牌蓝、没有强调绿、没有语义红。存在的只有 Pure Black (`#000000`) 与 Pure White (`#ffffff`) 之间的灰阶，形成一个单色环境，让用户对“open models”的心智模型不被品牌态度染色。以简单黑色线稿绘制的 Ollama llama mascot 是唯一插画，而且它同样是单色的。

Ollama 的独特之处在于 SF Pro Rounded（Apple 的圆角系统字体）与完全 pill-shaped 的几何语言（所有交互元素 9999px radius）的组合。圆润字形 + 圆角按钮 + 圆角容器组成一套统一的“softness language”，让开发者 CLI 工具显得亲和友好，而不是令人生畏。这是一种带温度的极简主义——不是冷峻的 Swiss-style grid minimalism，而是连边缘都被字面意义上柔化的那一种。

**Key Characteristics:**
- 纯白画布，没有任何色彩性颜色——完全 grayscale
- SF Pro Rounded 标题带来鲜明的 Apple-like 柔和感
- 二元 border-radius 系统：12px（containers）或 9999px（所有 interactive elements）
- 零阴影——层次完全来自 background color shifts 和 borders
- 所有 interactive elements（buttons、tabs、inputs、tags）都采用 pill-shaped geometry
- Ollama llama 是唯一插画——黑色 line art，无颜色
- 极端克制的内容——homepage 短、聚焦、不拥挤

## 2. Color Palette & Roles

### Primary
- **Pure Black** (`#000000`): 主标题、主链接和最深文本。唯一真正要求注意力的“颜色”。
- **Near Black** (`#262626`): 浅色表面上的按钮文本、次级标题重量。
- **Darkest Surface** (`#090909`): 最深的表面——几乎无法和 Pure Black 区分，用于 footer 或深色容器。

### Surface & Background
- **Pure White** (`#ffffff`): 主要页面背景——不是 off-white、不是 cream，而是 pure white。也用于 secondary actions 的按钮表面。
- **Snow** (`#fafafa`): 与白色之间最细微的表面区分——用于 section backgrounds 和几乎不可察觉的 elevated containers。
- **Light Gray** (`#e5e5e5`): 按钮背景、边框和主要 containment color。最常用的中性工作色。

### Neutrals & Text
- **Stone** (`#737373`): 次级正文、footer links 和弱化内容。主要的 muted tone。
- **Mid Gray** (`#525252`): 强调型次级文本，比 Stone 稍深。
- **Silver** (`#a3a3a3`): 三级文本、placeholders 和极弱化 metadata。
- **Button Text Dark** (`#404040`): 专用于白色表面按钮文本。

### Semantic & Accent
- **Ring Blue** (`#3b82f6` at 50%): 整个系统中唯一非灰色颜色——Tailwind 默认 focus ring，只用于键盘可访问性。正常交互流程中不应可见。
- **Border Light** (`#d4d4d4`): 用于白色表面按钮边框的稍深灰色。

### Gradient System
- **None.** Ollama 完全不使用 gradients。视觉分隔来自平面色块和 single-pixel borders。这是一种刻意、近乎哲学化的设计选择。

## 3. Typography Rules

### Font Family
- **Display**: `SF Pro Rounded`, fallbacks: `system-ui, -apple-system, system-ui`
- **Body / UI**: `ui-sans-serif`, fallbacks: `system-ui, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`
- **Monospace**: `ui-monospace`, fallbacks: `SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New`

*Note: SF Pro Rounded 是 Apple 的系统字体——在 macOS/iOS 上会渲染出圆润端点，在其他平台回退到 system sans-serif。*

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | SF Pro Rounded | 48px (3rem) | 500 | 1.00 (tight) | normal | 最大冲击力，圆润字形 |
| Section Heading | SF Pro Rounded | 36px (2.25rem) | 500 | 1.11 (tight) | normal | Feature section titles |
| Sub-heading | SF Pro Rounded / ui-sans-serif | 30px (1.88rem) | 400-500 | 1.20 (tight) | normal | Card headings, feature names |
| Card Title | ui-sans-serif | 24px (1.5rem) | 400 | 1.33 | normal | Medium emphasis headings |
| Body Large | ui-sans-serif | 18px (1.13rem) | 400-500 | 1.56 | normal | Hero descriptions, button text |
| Body / Link | ui-sans-serif | 16px (1rem) | 400-500 | 1.50 | normal | Standard body text, navigation |
| Caption | ui-sans-serif | 14px (0.88rem) | 400 | 1.43 | normal | Metadata, descriptions |
| Small | ui-sans-serif | 12px (0.75rem) | 400 | 1.33 | normal | Smallest sans-serif text |
| Code Body | ui-monospace | 16px (1rem) | 400 | 1.50 | normal | Inline code, commands |
| Code Caption | ui-monospace | 14px (0.88rem) | 400 | 1.43 | normal | Code snippets, secondary |
| Code Small | ui-monospace | 12px (0.75rem) | 400-700 | 1.63 | normal | Tags, labels |

### Principles
- **Rounded display, standard body**: SF Pro Rounded 承载 display headlines，靠独特的圆润端点表达品牌；标准 system sans 负责全部 body text。圆角字体本身就是品牌表达。
- **Weight restraint**: 只使用两个核心字重——400 (regular) 用于 body，500 (medium) 用于 headings。没有 bold、没有 light、没有 black weight。这种极端克制强化了 minimal philosophy。
- **Tight display, comfortable body**: 标题压缩到 1.0 line-height，body text 放松到 1.43-1.56。不依赖字重对比也能建立清晰层级。
- **Monospace for developer identity**: Code blocks 和 terminal commands 作为主要内容频繁出现，使用 system monospace stack。

## 4. Component Stylings

### Buttons

**Gray Pill (Primary)**
- Background: Light Gray (`#e5e5e5`)
- Text: Near Black (`#262626`)
- Padding: 10px 24px
- Border: thin solid Light Gray (`1px solid #e5e5e5`)
- Radius: pill-shaped (9999px)
- Primary action button——低调、grayscale，始终 pill-shaped

**White Pill (Secondary)**
- Background: Pure White (`#ffffff`)
- Text: Button Text Dark (`#404040`)
- Padding: 10px 24px
- Border: thin solid Border Light (`1px solid #d4d4d4`)
- Radius: pill-shaped (9999px)
- Secondary action——视觉重量比 Gray Pill 更轻

**Black Pill (CTA)**
- Background: Pure Black (`#000000`)
- Text: Pure White (`#ffffff`)
- Radius: pill-shaped (9999px)
- 从 "Create account" 和 "Explore" buttons 推断
- 最高强调级别——白底上的黑色按钮

### Cards & Containers
- Background: Pure White 或 Snow (`#fafafa`)
- Border: 需要时使用 thin solid Light Gray (`1px solid #e5e5e5`)
- Radius: 舒适圆角 (12px)——系统中唯一非 pill radius
- Shadow: **none**——任何元素都没有阴影
- Hover: 可能是细微 background shift 或 border darkening

### Inputs & Forms
- Background: Pure White
- Border: `1px solid #e5e5e5`
- Radius: pill-shaped (9999px)——search inputs 和 form fields 都是 pill-shaped
- Focus: Ring Blue (`#3b82f6` at 50%) ring
- Placeholder: Silver (`#a3a3a3`)

### Navigation
- 干净的 horizontal nav，元素极少
- Logo: Ollama llama icon + 黑色 wordmark
- Links: "Models", "Docs", "Pricing"，黑色，16px，weight 400
- Search bar: 带 placeholder text 的 pill-shaped 输入框
- Right side: "Sign in" link + "Download" black pill CTA
- 无 borders、无 background——白色页面上的透明 nav

### Image Treatment
- Ollama llama mascot 是唯一插画——白底黑色 line art
- Code screenshots/terminal outputs 放在带边框的容器中（12px radius）
- Integration logos 以简单 icons 的形式展示在 grid 中
- 无 photographs、无 gradients、无 decorative imagery

### Distinctive Components

**Tab Pills**
- Pill-shaped tab selectors（例如 "Coding" | "OpenClaw"）
- Active: Light Gray bg；Inactive: transparent
- 全部 pill-shaped (9999px)

**Model Tags**
- 小型 pill-shaped tags（例如 "ollama", "launch", "claude"）
- Light Gray background，dark text
- 浏览 models 的主要方式

**Terminal Command Block**
- 展示 `ollama run` commands 的 monospace code
- 极简样式——只有一个带边框的 12px-radius container
- 集成 copy button

**Integration Grid**
- Integration logos grid（Codex、Claude Code、OpenCode、LangChain 等）
- 每项位于带边框的 pill 或 card 中，包含 icon + name
- 按 category 分 tabs（Coding、Documents & RAG、Automation、Chat）

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4px, 6px, 8px, 9px, 10px, 12px, 14px, 16px, 20px, 24px, 32px, 40px, 48px, 88px, 112px
- Button padding: 10px 24px（所有 buttons 保持一致）
- Card internal padding: 约 24-32px
- Section vertical spacing: 非常宽松（88px-112px）

### Grid & Container
- Max container width: 约 1024-1280px，居中
- Hero: 带 llama illustration 的 centered single-column
- Feature sections: 2-column layout（text left, code right）
- Integration grid: responsive multi-column
- Footer: 干净的 single-row

### Whitespace Philosophy
- **Emptiness as luxury**: 页面异常短且稀疏——没有任何 feature section 逗留太久。每个概念只获得最少但足够的空间。
- **Content density is low by design**: 其他 AI 公司会堆满一个又一个 feature，Ollama 只呈现三个想法（run models、use with apps、integrations）然后停下。
- **The white space IS the brand**: 纯白留白加零装饰传达“这个工具不会挡你的路”。

### Border Radius Scale
- 舒适圆角 (12px): 唯一 container radius——code blocks、cards、panels
- Pill-shaped (9999px): 所有 interactive elements——buttons、tabs、inputs、tags、badges

*这个二元系统极端而鲜明。没有 4px、没有 8px、没有连续的圆角梯度。元素要么是 containers (12px)，要么是 interactive (pill)。*

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no border | Page background, most content |
| Bordered (Level 1) | `1px solid #e5e5e5` | Cards, code blocks, buttons |

**Shadow Philosophy**: Ollama 使用 **zero shadows**。这不是疏忽，而是刻意的设计决定。几乎所有其他主流 AI 产品站点都会至少使用细微阴影；Ollama 的 flat、shadowless 方法创造出纸张般的体验，元素只通过 background color 和 single-pixel borders 区分。层次通过 **content hierarchy and typography weight** 传达，而不是视觉堆叠。

## 7. Do's and Don'ts

### Do
- 使用 pure white (`#ffffff`) 作为页面背景——不要使用 off-white 或 cream
- 所有 interactive elements 使用 pill-shaped (9999px) radius——buttons、tabs、inputs、tags
- 所有 non-interactive containers 使用 12px radius——code blocks、cards、panels
- 严格保持 grayscale palette——除 blue focus ring 外没有色彩性颜色
- Display headings 使用 SF Pro Rounded weight 500——圆润端点就是品牌表达
- 保持 zero shadows——层次只来自 borders 和 background shifts
- 保持低内容密度——每个 section 只呈现一个清晰想法
- Terminal commands 和 code 使用 monospace——它是主要内容，不是装饰
- 所有 buttons 保持 10px 24px padding 与 pill shape——一致性是绝对要求

### Don't
- 不要引入任何色彩性颜色——没有 brand blue、accent green 或 warm tones
- 不要使用 12px 和 9999px 之间的 border-radius——系统是二元的
- 不要给任何元素添加 shadows——flat aesthetic 是有意为之
- 不要使用 500 以上的 font weights——没有 bold、没有 black weight
- 不要在 llama mascot 之外添加 decorative illustrations
- 不要在任何地方使用 gradients——只使用 flat blocks 和 borders
- 不要让 layout 复杂化——最多两栏，不要 complex grids
- 不要使用超过 1px 的 borders——containment 永远是最轻触的
- 不要添加 hover animations 或 transitions——交互应当即时、直接

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, stacked everything, hamburger nav |
| Small Tablet | 640-768px | Spacing 的小幅调整 |
| Tablet | 768-850px | 2-column layouts 开始出现 |
| Desktop | 850-1024px | Standard layout, expanded features |
| Large Desktop | 1024-1280px | Maximum content width |

### Touch Targets
- 所有 buttons 都是 pill-shaped，并有宽松 padding（10px 24px）
- Navigation links 使用舒适的 16px size
- Minimum touch area 轻松超过 44x44px

### Collapsing Strategy
- **Navigation**: 移动端折叠为 hamburger menu
- **Feature sections**: 2-column -> stacked single column
- **Hero text**: 48px -> 36px -> 30px progressive scaling
- **Integration grid**: Multi-column -> 2-column -> single column
- **Code blocks**: 保持 horizontal scroll

### Image Behavior
- Llama mascot 按比例缩放
- Code blocks 保持 monospace formatting
- Integration icons 重排为更少列
- 无 art direction changes

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary Text: "Pure Black (#000000)"
- Page Background: "Pure White (#ffffff)"
- Secondary Text: "Stone (#737373)"
- Button Background: "Light Gray (#e5e5e5)"
- Borders: "Light Gray (#e5e5e5)"
- Muted Text: "Silver (#a3a3a3)"
- Dark Text: "Near Black (#262626)"
- Subtle Surface: "Snow (#fafafa)"

### Example Component Prompts
- "Create a hero section on pure white (#ffffff) with an illustration centered above a headline at 48px SF Pro Rounded weight 500, line-height 1.0. Use Pure Black (#000000) text. Below, add a black pill-shaped CTA button (9999px radius, 10px 24px padding) and a gray pill button."
- "Design a code block with a 12px border-radius, 1px solid Light Gray (#e5e5e5) border on white background. Use ui-monospace at 16px for the terminal command. No shadow."
- "Build a tab bar with pill-shaped tabs (9999px radius). Active tab: Light Gray (#e5e5e5) background, Near Black (#262626) text. Inactive: transparent background, Stone (#737373) text."
- "Create an integration card grid. Each card is a bordered pill (9999px radius) or a 12px-radius card with 1px solid #e5e5e5 border. Icon + name inside. Grid of 4 columns on desktop."
- "Design a navigation bar: transparent background, no border. Ollama logo on the left, 3 text links (Pure Black, 16px, weight 400), pill search input in the center, 'Sign in' text link and black pill 'Download' button on the right."

### Iteration Guide
1. 一次只聚焦 ONE component
2. 所有值保持 grayscale——写 "Stone (#737373)"，不要写 "use a light color"
3. 始终指定 pill (9999px) 或 container (12px) radius——不存在中间值
4. Shadows 永远为 zero——绝不添加
5. Weight 永远是 400 或 500——绝不 bold
6. 如果某个东西感觉装饰过多，就移除它——对 Ollama 来说，less is always more
