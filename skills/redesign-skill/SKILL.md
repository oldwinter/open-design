---
name: redesign-existing-projects
description: |
  将现有网站和应用升级到 premium quality。审计当前设计，识别通用 AI pattern，并在不破坏功能的前提下应用高端设计标准。适用于任何 CSS framework 或 vanilla CSS。
triggers:
  - "redesign existing project"
  - "improve current UI"
  - "premium redesign"
  - "audit UI"
od:
  mode: prototype
  surface: web
  platform: desktop
  scenario: design
  category: creative-direction
  upstream: "https://github.com/Leonxlnx/taste-skill"
  preview:
    type: html
  design_system:
    requires: true
  craft:
    requires:
      - typography
      - color
      - anti-ai-slop
      - state-coverage
  example_prompt: |
    Audit the existing UI first, then redesign it to premium quality without breaking functionality, preserving useful product structure.
---


# Redesign Skill

## How This Works

应用到现有项目时，按以下顺序执行：

1. **Scan** — 阅读 codebase。识别 framework、styling method（Tailwind、vanilla CSS、styled-components 等）以及当前 design patterns。
2. **Diagnose** — 按下面的 audit 检查。列出发现的每一种 generic pattern、weak point 和 missing state。
3. **Fix** — 基于现有 stack 做 targeted upgrades。不要从零重写。改进已有内容。

## Design Audit

### Typography

检查并修复以下问题：

- **Browser default fonts 或到处都是 Inter。** 换成有性格的 font。好选项包括 `Geist`、`Outfit`、`Cabinet Grotesk`、`Satoshi`。Editorial/creative projects 可用 serif header 搭配 sans-serif body。
- **Headlines 缺少 presence。** 放大 display text、收紧 letter-spacing、降低 line-height。Headlines 应该显得沉稳且 intentional。
- **Body text 太宽。** 将 paragraph width 限制在约 65 characters。增加 line-height 以提升 readability。
- **只使用 Regular（400）和 Bold（700）weights。** 引入 Medium（500）和 SemiBold（600），建立更细腻 hierarchy。
- **Numbers 使用 proportional font。** 对 data-heavy interfaces 使用 monospace font，或启用 tabular figures（`font-variant-numeric: tabular-nums`）。
- **缺少 letter-spacing adjustments。** Large headers 使用 negative tracking；small caps 或 labels 使用 positive tracking。
- **到处都是 all-caps subheaders。** 试试 lowercase italics、sentence case 或 small-caps。
- **Orphaned words。** 最后一行孤零零只剩一个词。用 `text-wrap: balance` 或 `text-wrap: pretty` 修复。

### Color and Surfaces

- **Pure `#000000` background。** 换成 off-black、dark charcoal 或 tinted dark（`#0a0a0a`、`#121212`，或 dark navy）。
- **Accent colors 过饱和。** Saturation 保持在 80% 以下。降低 accents 的饱和度，让它们与 neutrals 融合，而不是尖叫。
- **超过一个 accent color。** 只选一个。移除其他。Consistency beats variety。
- **混用 warm 与 cool grays。** 坚持一个 gray family。用一致 hue 给所有 grays 染色（warm 或 cool，不要两者兼用）。
- **Purple/blue “AI gradient” aesthetic。** 这是最常见的 AI design fingerprint。换成 neutral bases 和一个经过思考的 accent。
- **Generic `box-shadow`。** 让 shadows 的 tint 匹配 background hue。使用 colored shadows（例如 blue background 上用 dark blue shadow），不要用低透明度 pure black。
- **完全 flat design，没有 texture。** 给 backgrounds 添加 subtle noise、grain 或 micro-patterns。Pure flat vectors 会显得 sterile。
- **完美均匀的 gradients。** 用 radial gradients、noise overlays 或 mesh gradients 打破 uniformity，而不是 standard linear 45-degree fades。
- **Lighting direction 不一致。** 审计所有 shadows，确保它们暗示同一个 consistent light source。
- **Light mode page 中随机出现 dark sections（或反过来）。** 单个 dark-background section 打断 otherwise light page，会像 copy-paste accident。要么完整采用 dark mode，要么保持一致 background tone。需要 contrast 时，用同一 palette 中稍深的 shade，而不是在 cream page 中间突然跳到 `#111`。
- **空且平的 sections，没有 visual depth。** 只有文字和 plain background 的 sections 会显得 unfinished。添加 high-quality background imagery（blurred、overlaid 或 masked）、subtle patterns 或 ambient gradients。没有真实 assets 时，可使用可靠 placeholder sources，例如 `https://picsum.photos/seed/{name}/1920/1080`。尝试在 hero sections、feature blocks 或 CTAs 后方放 background images；即使是低 opacity 的 subtle full-width photo，也会增加 presence。

### Layout

- **所有东西都 centered and symmetrical。** 用 offset margins、mixed aspect ratios，或 left-aligned headers over centered content 打破 symmetry。
- **Three equal card columns as feature row。** 这是最 generic 的 AI layout。换成 2-column zig-zag、asymmetric grid、horizontal scroll 或 masonry layout。
- **Full-screen sections 使用 `height: 100vh`。** 换成 `min-height: 100dvh`，避免 mobile browsers 上 layout jumping（iOS Safari viewport bug）。
- **复杂 flexbox percentage math。** 使用 CSS Grid 构建可靠的 multi-column structures。
- **没有 max-width container。** 添加 container constraint（约 1200-1440px）和 auto margins，避免 wide screens 上 content 拉满边到边。
- **用 flexbox 强行让 cards 等高。** 内容长度不同就允许 variable heights，或使用 masonry。
- **所有东西 border-radius 一样。** 变化 radius：inner elements 更紧，containers 更柔。
- **没有 overlap 或 depth。** 元素平铺在彼此旁边。用 negative margins 创造 layering 和 visual depth。
- **Symmetrical vertical padding。** Top 和 bottom padding 总是完全一样。按视觉调整；bottom padding 通常需要稍大。
- **Dashboard 总有 left sidebar。** 试试 top navigation、floating command menu 或 collapsible panel。
- **缺少 whitespace。** 把 spacing 加倍。让设计呼吸。Dense layouts 适合 data dashboards，不适合 marketing pages。
- **Card groups 中 buttons 没有 bottom-aligned。** 当 cards 内容长度不同，CTAs 会落在随机高度。把 buttons 固定到每张 card 底部，让它们不受上方内容影响也能形成干净水平线。
- **Feature lists 从不同 vertical positions 开始。** Pricing tables 或 comparison cards 中，features list 应在所有 columns 中从同一 Y position 开始。使用一致的 list 上方 spacing，或固定高度 title/price blocks。
- **Side-by-side elements 的 vertical rhythm 不一致。** 并排放置 cards、columns 或 panels 时，对齐所有 shared elements（titles、descriptions、prices、buttons）。错位 baselines 会让 layout 看起来 broken。
- **数学上对齐但视觉上不对。** 数学居中不总等于视觉居中。Text 旁的 icons、circle 中的 play buttons、buttons 内的文字，通常需要 1-2px optical adjustments 才舒服。

### Interactivity and States

- **Buttons 没有 hover states。** 添加 background shift、slight scale 或 hover translate。
- **没有 active/pressed feedback。** Press 时添加 subtle `scale(0.98)` 或 `translateY(1px)`，模拟 physical click。
- **Transitions 瞬间完成，duration 为零。** 给所有 interactive elements 添加 smooth transitions（200-300ms）。
- **缺少 focus ring。** 为 keyboard navigation 提供可见 focus indicators。这是 accessibility requirement，不是可选项。
- **没有 loading states。** 用匹配 layout shape 的 skeleton loaders 替换 generic circular spinners。
- **没有 empty states。** 空 dashboard 什么都不显示就是 missed opportunity。设计一个 composed “getting started” view。
- **没有 error states。** 为 forms 添加清晰 inline error messages。不要用 `window.alert()`。
- **Dead links。** 指向 `#` 的 buttons。要么链接到真实 destinations，要么视觉上 disabled。
- **Navigation 没有 current page indication。** 用不同样式标出 active nav link，让用户知道自己在哪里。
- **Scroll jumping。** Anchor clicks 瞬间跳转。添加 `scroll-behavior: smooth`。
- **Animations 使用 `top`、`left`、`width`、`height`。** 改用 `transform` 和 `opacity`，获得 GPU-accelerated smooth animation。

### Content

- **Generic names，例如 “John Doe” 或 “Jane Smith”。** 使用多样、真实感强的 names。
- **假的整数数据，例如 `99.99%`、`50%`、`$100.00`。** 使用 organic、messy data：`47.2%`、`$99.00`、`+1 (312) 847-1928`。
- **Placeholder company names，例如 “Acme Corp”、“Nexus”、“SmartFlow”。** 创造 contextual、believable brand names。
- **AI copywriting cliches。** 永远不要使用 “Elevate”、“Seamless”、“Unleash”、“Next-Gen”、“Game-changer”、“Delve”、“Tapestry” 或 “In the world of...”。写 plain、specific language。
- **Success messages 中有 exclamation marks。** 移除。要 confident，不要 loud。
- **“Oops!” error messages。** 直接表达：“Connection failed. Please try again.”
- **Passive voice。** 使用 active voice：“We couldn't save your changes”，而不是 “Mistakes were made.”
- **所有 blog post dates 一样。** Randomize dates，让它们看起来真实。
- **多个 users 使用同一 avatar image。** 每个 distinct person 使用 unique assets。
- **Lorem Ipsum。** 永远不要用 placeholder latin text。写 real draft copy。
- **Every Header 都是 Title Case。** 改用 sentence case。

### Component Patterns

- **Generic card look（border + shadow + white background）。** 移除 border，或只用 background color，或只用 spacing。Cards 只有在 elevation 传达 hierarchy 时才应该存在。
- **总是一个 filled button + 一个 ghost button。** 加入 text links 或 tertiary styles，降低 visual noise。
- **Pill-shaped “New” 和 “Beta” badges。** 尝试 square badges、flags 或 plain text labels。
- **Accordion FAQ sections。** 改成 side-by-side list、searchable help 或 inline progressive disclosure。
- **3-card carousel testimonials with dots。** 换成 masonry wall、embedded social posts 或单个 rotating quote。
- **Pricing table with 3 towers。** 用 color 和 emphasis 突出 recommended tier，而不只是额外高度。
- **Everything 都用 modals。** 简单 actions 用 inline editing、slide-over panels 或 expandable sections，而不是 popups。
- **只使用 avatar circles。** 尝试 squircles 或 rounded squares，减少 generic feel。
- **Light/dark toggle 总是 sun/moon switch。** 使用 dropdown、system preference detection，或整合到 settings。
- **Footer link farm with 4 columns。** 简化。聚焦 main navigational paths 和 legally required links。

### Iconography

- **只用 Lucide 或 Feather icons。** 这些是 “default” AI icon choice。用 Phosphor、Heroicons 或 custom set 做 differentiation。
- **Rocketship 表示 “Launch”，shield 表示 “Security”。** 用不那么明显的 icons 替换 cliché metaphors（bolt、fingerprint、spark、vault）。
- **Icons stroke widths 不一致。** 审计所有 icons，并统一为一种 stroke weight。
- **缺少 favicon。** 始终包含 branded favicon。
- **Stock “diverse team” photos。** 使用 real team photos、candid shots 或 consistent illustration style，避免 uncanny stock imagery。

### Code Quality

- **Div soup。** 使用 semantic HTML：`<nav>`、`<main>`、`<article>`、`<aside>`、`<section>`。
- **Inline styles 与 CSS classes 混用。** 把所有 styling 移到项目的 styling system。
- **Hardcoded pixel widths。** 使用 relative units（`%`、`rem`、`em`、`max-width`）构建 flexible layouts。
- **Images 缺少 alt text。** 为 screen readers 描述 image content。Meaningful images 不要留 `alt=""` 或 `alt="image"`。
- **任意 z-index 值，例如 `9999`。** 在 theme/variables 中建立 clean z-index scale。
- **Commented-out dead code。** Shipping 前移除所有 debug artifacts。
- **Import hallucinations。** 确认每个 import 都真实存在于 `package.json` 或 project dependencies。
- **缺少 meta tags。** 添加正确的 `<title>`、`description`、`og:image` 和 social sharing meta tags。

### Strategic Omissions (What AI Typically Forgets)

- **没有 legal links。** 在 footer 中添加 privacy policy 和 terms of service links。
- **没有 “back” navigation。** User flows 中出现 dead ends。每个 page 都需要返回路径。
- **没有 custom 404 page。** 设计有帮助且 branded 的 “page not found” experience。
- **没有 form validation。** 为 emails、required fields 和 format checks 添加 client-side validation。
- **没有 “skip to content” link。** 这对 keyboard users 必不可少。添加 hidden skip-link。
- **没有 cookie consent。** 如果 jurisdiction 要求，添加 compliant consent banner。

## Upgrade Techniques

升级项目时，从这些 high-impact techniques 中取用，替代 generic patterns：

### Typography Upgrades
- **Variable font animation。** 在 scroll 或 hover 时插值 weight 或 width，让 text 感觉 alive。
- **Outlined-to-fill transitions。** Text 初始为 stroke outline，并在 scroll entry 或 interaction 中填充 color。
- **Text mask reveals。** Large typography 作为窗口，露出背后 video 或 animated imagery。

### Layout Upgrades
- **Broken grid / asymmetry。** 元素有意忽略 column structure：overlapping、bleeding off-screen，或用 calculated randomness offset。
- **Whitespace maximization。** 激进使用 negative space，把焦点强制放到单个元素上。
- **Parallax card stacks。** Sections 在 scroll 中 sticky，并像实体一样彼此堆叠。
- **Split-screen scroll。** 屏幕两半向相反方向滑动。

### Motion Upgrades
- **Smooth scroll with inertia。** 脱离 browser defaults，创造更重、更 cinematic 的滚动感。
- **Staggered entry。** Elements 带 slight delays 级联进入，结合 Y-axis translation 与 opacity fade。不要让所有东西同时 mount。
- **Spring physics。** 用 spring-based motion 替代 linear easing，让所有 interactive elements 更 natural、更有 weight。
- **Scroll-driven reveals。** Content 通过 expanding masks、wipes 或 draw-on SVG paths 进入，并绑定 scroll progress。

### Surface Upgrades
- **True glassmorphism。** 不止 `backdrop-filter: blur`。添加 1px inner border 和 subtle inner shadow，模拟 edge refraction。
- **Spotlight borders。** Card borders 在 cursor 下动态照亮。
- **Grain and noise overlays。** 使用 fixed、pointer-events-none 的 subtle noise overlay，打破 digital flatness。
- **Colored, tinted shadows。** Shadows 带 background hue，而不是 generic black。

## Fix Priority

按以下顺序应用 changes，以最小风险获得最大 visual impact：

1. **Font swap** — 最大的即时提升，风险最低
2. **Color palette cleanup** — 移除冲突或过饱和 colors
3. **Hover and active states** — 让 interface 感觉 alive
4. **Layout and spacing** — 正确 grid、max-width、一致 padding
5. **Replace generic components** — 用 modern alternatives 替换 cliché patterns
6. **Add loading, empty, and error states** — 让产品感觉 finished
7. **Polish typography scale and spacing** — premium final touch

## Rules

- 与现有 tech stack 协作。不要迁移 frameworks 或 styling libraries。
- 不要破坏现有 functionality。每次 change 后测试。
- 导入任何 new library 前，先检查项目 dependency file。
- 如果项目使用 Tailwind，修改 config 前先检查版本（v3 vs v4）。
- 如果项目没有 framework，使用 vanilla CSS。
- 保持 changes reviewable 且 focused。小而精准的 improvements 优于大规模 rewrites。
