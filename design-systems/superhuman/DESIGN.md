# Design System Inspired by Superhuman

> Category: Developer Tools
> Fast email client。Premium dark UI，keyboard-first，purple glow。

## 1. Visual Theme & Atmosphere

Superhuman 的网站像打开一只 luxury envelope：以 white 为主，极其干净，并用一次戏剧性的 color gesture 抓住注意力。Hero section 是 cinematic purple gradient，一层深 twilight 的 `#1b1938`，让人联想到黎明前一刻；其上叠加 confident white typography。这个戏剧化入口之后，网站其余部分几乎完全是 white canvas 与 dark charcoal text，形成 stark 但 refined 的阅读体验。

Typography 才是真正的 signature：Super Sans VF 是 custom variable font，使用非常规 weight stops（460、540、600、700），落在传统 font weight categories 之间。Weight 460 略重于 regular、轻于 medium，是整个系统的 workhorse；它让文字比常规 400-weight 更 confident，但从不 aggressive。Display text 的 tight line-heights（0.96）把 headlines 压成 dense、powerful blocks，而 body text 的 generous 1.50 line-height 提供 airy readability。Compressed power 与 breathing room 之间的张力，定义了 Superhuman 的 typographic voice。

Design philosophy 是用最少 decoration 取得最大 confidence。Buttons 使用 warm cream（`#e9e5dd`）而不是 bright CTAs；borders 和 shadows 几乎缺席；lavender purple（`#cbb7fb`）是唯一 accent color。这是一个 productivity tool，却像 luxury brand 一样推销自己：每个 pixel 都必须有存在理由，没有任何东西只是 decoration。Brand naming convention 也延伸到颜色：primary purple 被称为 "Mysteria"，在 blue 与 purple 之间保持刻意的 ambiguous。

**Key Characteristics:**
- Deep purple gradient hero（`#1b1938`），与 predominantly white content body 形成对比
- Super Sans VF variable font，带 non-standard weight stops（460、540、600、700），位于 conventional weight categories 之间
- Ultra-tight display line-height（0.96），制造 compressed、powerful headlines
- Warm Cream（`#e9e5dd`）buttons 取代 bright/saturated CTAs，呈现 understated luxury
- Lavender Purple（`#cbb7fb`）作为 singular accent color，soft 且 approachable
- Minimal border-radius scale：只有 8px 和 16px，没有 micro-rounding，也没有 pill shapes
- Product screenshots 主导内容；UI 本身用极少 surrounding decoration 完成销售

## 2. Color Palette & Roles

### Primary
- **Mysteria Purple** (`#1b1938`): Hero gradient background。深 purple，横跨 blue-purple，是 brand 最暗的表达。
- **Lavender Glow** (`#cbb7fb`): Primary accent and highlight color。Soft purple，用于 emphasis、decorative elements 和 interactive highlights。
- **Charcoal Ink** (`#292827`): Light surfaces 上的 primary text 和 heading color。Warm near-black，带很淡 brown undertone。

### Secondary & Accent
- **Amethyst Link** (`#714cb6`): Underlined link text。Mid-range purple，连接 brand palette，同时提示 interactivity。
- **Translucent White** (`color(srgb 1 1 1 / 0.95)`): Hero overlay text。95% opacity 的 near-white，用于 dark surfaces 上的 depth layering。
- **Misted White** (`color(srgb 1 1 1 / 0.8)`): Dark surfaces 上的 secondary text。80% opacity white，用于 hero gradient 上的 hierarchy。

### Surface & Background
- **Pure White** (`#ffffff`): Primary page background。所有 content sections 的 dominant canvas color。
- **Warm Cream** (`#e9e5dd`): Button background。Warm、neutral cream，避免 pure gray 的冷感。
- **Parchment Border** (`#dcd7d3`): Card 和 divider borders。Warm light gray，带轻微 pink undertone。

### Neutrals & Text
- **Charcoal Ink** (`#292827`): White surfaces 上的 primary heading 和 body text。
- **Amethyst Link** (`#714cb6`): Content links，带 underline decoration。
- **Translucent White 95%** (`color(srgb 1 1 1 / 0.95)`): Dark/purple surfaces 上的 primary text。
- **Translucent White 80%** (`color(srgb 1 1 1 / 0.8)`): Dark/purple surfaces 上的 secondary text。

### Semantic & Accent
- Superhuman 极度克制地使用 color；Lavender Glow（`#cbb7fb`）是唯一真正 accent。
- Interactive states 通过 opacity shifts 和 underline decorations 表达，而不是通过 color changes。
- Warm cream button palette 避免 saturated semantic colors；marketing 中看不到 red errors 或 green success。

### Gradient System
- **Hero Gradient**: Deep purple gradient 从 `#1b1938` 开始，在 hero section 中过渡到 purple-to-twilight tones；这是整个站点最 dramatic 的 visual element。
- **Content Transition**: Gradient 溶解进 white content area，用户 scroll 时形成 cinematic curtain-lift effect。
- Marketing site 上没有其他 gradients；hero gradient 是唯一 dramatic gesture。

## 3. Typography Rules

### Font Family
- **Display & Body**: `Super Sans VF`，custom variable font，带 non-standard weight axis。
  Fallbacks: `system-ui, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue`
- **Product UI**（brand 中提及）: Luzi Type 的 `Messina Sans` / `Messina Serif` / `Messina Mono`，用于 product 本身的 sans-serif-to-serif transitions。

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | Super Sans VF | 64px | 540 | 0.96 | 0px | Maximum compression, powerful block headlines |
| Section Display | Super Sans VF | 48px | 460 | 0.96 | -1.32px | Lighter weight for section introductions |
| Section Heading | Super Sans VF | 48px | 460 | 0.96 | 0px | Alternate section heading without tracking |
| Feature Title | Super Sans VF | 28px | 540 | 1.14 | -0.63px | Feature block headlines, tighter |
| Sub-heading Large | Super Sans VF | 26px | 460 | 1.30 | 0px | Content sub-sections |
| Card Heading | Super Sans VF | 22px | 460 | 0.76 | -0.315px | Card title with extreme compression |
| Body Heading | Super Sans VF | 20px | 460 | 1.20 | 0px | Bold content intros |
| Body Heading Alt | Super Sans VF | 20px | 460 | 1.10 | -0.55px | Tighter variant for emphasis |
| Body Heading Relaxed | Super Sans VF | 20px | 460 | 1.25 | -0.4px | More breathing room variant |
| Emphasis Body | Super Sans VF | 18px | 540 | 1.50 | -0.135px | Medium-weight body for callouts |
| Body | Super Sans VF | 16px | 460 | 1.50 | 0px | Standard reading text, generous line-height |
| Button / UI Bold | Super Sans VF | 16px | 700 | 1.00 | 0px | Bold UI elements |
| Button / UI Semi | Super Sans VF | 16px | 600 | 1.00 | 0px | Semi-bold navigation and labels |
| Nav Link | Super Sans VF | 16px | 460 | 1.20 | 0px | Navigation items |
| Caption | Super Sans VF | 14px | 500 | 1.20 | -0.315px | Small labels, metadata |
| Caption Semi | Super Sans VF | 14px | 600 | 1.29 | 0px | Emphasized small text |
| Caption Body | Super Sans VF | 14px | 460 | 1.50 | 0px | Small body text |
| Micro Label | Super Sans VF | 12px | 700 | 1.50 | 0px | Smallest text, badges, tags |

### Principles
- **Non-standard weight axis**: 460 和 540 有意落在 conventional Regular（400）与 Medium（500）之间，形成一种 subtly "off" 但 confident 的 typographic texture：比预期略重，却不接近 bold。
- **Extreme display compression**: Display headlines 使用 0.96 line-height，让行距几乎相互贴近，形成 dense、architectural 的 typographic blocks。
- **Body generosity**: 与之相反，body text 使用 1.50 line-height，非常 spacious，确保 dense headline impact 之后仍能舒适阅读。
- **Selective negative tracking**: Letter-spacing 被 surgical 地应用：48px headings 使用 -1.32px，28px features 使用 -0.63px，而 body text 保持 0px。文字越大，tracking 越紧。
- **Variable font efficiency**: 单个 font file 承载所有 weight variations（460-700），支持 smooth weight transitions 和 micro-adjustments。

## 4. Component Stylings

### Buttons
- **Warm Cream Primary**: `#e9e5dd` background，Charcoal Ink（`#292827`）text，subtle rounded corners（8px radius），无 visible border。这是 signature CTA，warm、muted、luxurious，而非 aggressive。
- **Dark Primary**（light sections 上）: `#292827` background with white text，8px radius；用于 contrast sections，是 warm cream 的 inverse。
- **Ghost / Text Link**: 无 background，underline decoration；根据上下文使用 Amethyst Link（`#714cb6`）或 Charcoal Ink。
- **Hero CTA**: Dark purple gradient 上使用 Warm Cream；cream color 在 `#1b1938` 上形成 dramatic pop。
- **Hover**: Subtle opacity 或 brightness shift；没有 dramatic color transformations。

### Cards & Containers
- **Content Card**: White background，Parchment Border（`#dcd7d3`）1px border，16px border-radius，clean 且 minimal。
- **Dark Surface Card**: Dark sections 上使用 `#292827` border，保持 warm-neutral tone。
- **Hero Surface**: Purple gradient 上使用 semi-transparent white border（`rgba(255, 255, 255, 0.2)`），形成 ghostly containment。
- **Product Screenshot Cards**: 大尺寸 product UI images，clean edges、minimal framing；product 本身就是 visual。
- **Hover**: Minimal state changes；以 consistency 和 calm 优先，而非 flashy interactions。

### Inputs & Forms
- Marketing site 上 form presence 很少；Superhuman 会直接把用户引向 signup。
- Inputs 使用 dark-bordered treatment，Charcoal Ink borders 和 warm-toned placeholder text。
- Focus: 增强 border emphasis，可能从 Parchment Border 切换到 Charcoal Ink。

### Navigation
- **Top nav**: Content sections 上使用 clean white background，hero gradient 上使用 transparent。
- **Nav links**: Super Sans VF，16px，weight 460/600 用于 hierarchy。
- **CTA button**: Nav 中的 Warm Cream（`#e9e5dd`）pill；subtle，不抢注意力。
- **Sticky behavior**: Nav 在 scroll 时保持 fixed，并带 background transition。
- **Mobile**: Collapse 到 hamburger menu，layout 简化。

### Image Treatment
- **Product screenshots**: 大而 dominant 的 product UI images，展示 email interface；product 就是 hero。
- **Lifestyle photography**: Hero area 中一张 dramatic image（purple/red gradient 前的 silhouette），cinematic 且 editorial。
- **Full-width presentation**: Screenshots 横跨 full container width，使用 subtle shadow 或无 border。
- **Aspect ratios**: Product screenshots 使用 wide landscape ratios（约 16:9）。
- **Color integration**: Screenshots 经过谨慎 color-graded，与 purple-to-white page flow 协调。

### Testimonial / Social Proof
- "Your Superhuman suite" section 使用 product feature grid。
- Feature descriptions 与 product screenshots 配对，通过 demonstration 而不是 quotes 证明价值。
- Clean grid layout，card sizing 保持一致。

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px
- **Scale**: 2px, 4px, 6px, 8px, 12px, 16px, 18px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 56px
- **Section padding**: Major sections 之间使用 48px-80px vertical
- **Card padding**: 16px-32px internal spacing
- **Component gaps**: Related elements 之间 8px-16px

### Grid & Container
- **Max width**: 约 1200px content container，centered
- **Column patterns**: Full-width hero、key messaging 使用 centered single-column、feature cards 使用 2-3 column grid
- **Feature grid**: "Your Superhuman suite" product showcase 使用均匀 column distribution

### Whitespace Philosophy
- **Confident emptiness**: Sections 之间 generous whitespace 传达 premium positioning；每个 element 都有 breathing room。
- **Product as content**: 大型 product screenshots 占据空间，而低级网站通常会用 marketing copy 填充这些区域。
- **Progressive density**: Hero spacious 且 cinematic；content sections 通过 feature grids 变 dense，然后再为 CTAs 打开空间。

### Border Radius Scale
- **8px**: Buttons、inline elements（`span`、`button`、`div`），universal small radius。
- **16px**: Cards、links、larger containers（`a`、card elements），universal large radius。
- 整个系统只有两个 radii，属于 radical simplicity。没有 micro-rounding（2px），没有 pill shapes（50px+）。

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 (Flat) | No shadow, white background | Primary page canvas, most content surfaces |
| Level 1 (Border) | `1px solid #dcd7d3` (Parchment Border) | Card containment, section dividers |
| Level 2 (Dark Border) | `1px solid #292827` | Header elements, dark section separators |
| Level 3 (Glow) | Subtle shadow (from 6 shadow definitions detected) | Product screenshot containers, elevated cards |
| Level 4 (Hero Depth) | `rgba(255, 255, 255, 0.2)` transparent border | Elements on the dark purple gradient hero |

### Shadow Philosophy
Superhuman 的 marketing site 上，elevation system 极其克制。Depth 主要通过以下方式表达：

- **Border containment**: Warm-toned borders（`#dcd7d3`）以 1px 提供 gentle separation。
- **Color contrast**: Hero gradient 通过 color shift，而不是 shadows，创造巨大 depth。
- **Product screenshots**: Screenshots 自身通过 flat page 中的 layered UI 制造 depth。
- **Opacity layering**: Hero gradient 上的 semi-transparent whites 形成 atmospheric depth layers。

### Decorative Depth
- **Hero gradient**: `#1b1938` → white gradient transition 是 primary depth device，像 cinematic curtain effect。
- **Lavender accents**: `#cbb7fb` Lavender Glow elements 漂浮在 dark gradient 上，形成 stellar/atmospheric effect。
- **No glassmorphism**: 虽然有 translucent borders，但没有 blur/frosted-glass effects。
- **Photography depth**: Hero silhouette image 通过 natural atmospheric depth 生效，不依赖 artificial CSS。

## 7. Do's and Don'ts

### Do
- 默认使用 weight 460 的 Super Sans VF；它略重于 regular，是 brand 的 typographic signature
- Display headlines 保持 0.96 line-height；这种 compression 是有意且 powerful 的
- Primary buttons 使用 Warm Cream（`#e9e5dd`）；不是 white，不是 gray，而是明确的 warm cream
- Border-radius 限制为 8px（small）和 16px（large）；binary radius system 是刻意设计
- 只在 headlines 上使用 negative letter-spacing（-0.63px 到 -1.32px）；body text 保持 0px
- Lavender Glow（`#cbb7fb`）是唯一 accent color；它是 neutral palette 之外唯一的 color departure
- 让 product screenshots 成为 primary visual content；UI 会自己完成销售
- 保持 dramatic hero gradient 作为 singular gesture；其余页面保持 white

### Don't
- 不要使用 conventional font weights（400、500、600）；Superhuman 的 460 和 540 有意位于 standard stops 之间
- 不要添加 bright 或 saturated CTA colors（blue、green、red）；buttons 有意使用 muted Warm Cream 或 Charcoal
- 不要在 Lavender Glow 之外引入额外 accent colors；palette 被刻意限制为一个 accent
- 不要大量使用 shadows；depth 来自 borders、color contrast 和 photography，而不是 box-shadows
- 不要给 body text 使用 tight line-height；display 是 compressed（0.96），但 body 是 generous（1.50）
- 不要添加 decorative elements、icons 或 illustrations；Superhuman 依赖 product UI 和 minimal typography
- 不要创建 pill-shaped buttons；系统使用 8px radius，而不是 rounded pills
- 不要用 pure black（`#000000`）做 text；Charcoal Ink（`#292827`）更 warm、更 soft

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <768px | Single column, hero text reduces to ~36px, stacked feature cards, hamburger nav |
| Tablet | 768px-1024px | 2-column feature grid begins, hero text ~48px, nav partially visible |
| Desktop | 1024px-1440px | Full layout, 64px hero display, multi-column feature grid, full nav |
| Large Desktop | >1440px | Max-width container centered, generous side margins |

### Touch Targets
- Buttons: 8px radius，padding 舒适，满足 touch target guidelines
- Nav links: 16px text，并有足够 surrounding padding
- Mobile CTAs: Full-width Warm Cream buttons，便于 thumb reach
- Links: Underline decoration 提供明确 tap affordance

### Collapsing Strategy
- **Navigation**: Full horizontal nav → mobile 上 hamburger menu
- **Hero text**: 64px display → 48px → ~36px，随 breakpoints 递减
- **Feature grid**: Multi-column product showcase → 2-column → single stacked column
- **Product screenshots**: 在 containers 内缩放，同时保持 landscape ratios
- **Section spacing**: 按比例收缩；generous desktop margins 在 mobile 上压缩

### Image Behavior
- Product screenshots responsive scale，并保持 aspect ratios
- Hero silhouette image 进行 crop 或 scale，同时保持 dramatic composition
- 无 art direction changes；所有 breakpoints 使用相同 compositions
- Below-fold product screenshots 可能 lazy loading

## 9. Agent Prompt Guide

### Quick Color Reference
- Hero Background: Mysteria Purple (`#1b1938`)
- Primary Text (light bg): Charcoal Ink (`#292827`)
- Primary Text (dark bg): Translucent White (`color(srgb 1 1 1 / 0.95)`，使用 `rgba(255,255,255,0.95)`)
- Accent: Lavender Glow (`#cbb7fb`)
- Button Background: Warm Cream (`#e9e5dd`)
- Border: Parchment Border (`#dcd7d3`)
- Link: Amethyst Link (`#714cb6`)
- Page Background: Pure White (`#ffffff`)

### Example Component Prompts
- "Create a hero section with deep purple gradient background (#1b1938), 64px Super Sans heading at weight 540, line-height 0.96, white text at 95% opacity, and a warm cream button (#e9e5dd, 8px radius, #292827 text)"
- "Design a feature card with white background, 1px #dcd7d3 border, 16px radius, 20px Super Sans heading at weight 460, and 16px body text at weight 460 with 1.50 line-height in #292827"
- "Build a navigation bar with white background, Super Sans links at 16px weight 460, a warm cream CTA button (#e9e5dd, 8px radius), sticky positioning"
- "Create a product showcase section with centered 48px heading (weight 460, -1.32px letter-spacing, #292827), a large product screenshot below, on white background"
- "Design an accent badge using Lavender Glow (#cbb7fb) background, 8px radius, 12px bold text (weight 700), for category labels"

### Iteration Guide
Refine 使用此 design system 生成的现有 screens 时：

1. 验证 body 使用 font weight 460（不是 400 或 500），display 使用 540；non-standard weights 至关重要
2. 检查 display line-height 是 0.96；如果 headlines 看起来过松，就是错的
3. 确保 buttons 使用 Warm Cream（#e9e5dd），不是 pure white 或 gray；这种 warmth 很 subtle 但关键
4. 确认唯一 accent color 是 Lavender Glow（#cbb7fb）；不应出现其他 hues
5. 整体 tone 应像 luxury product presentation：minimal、confident，并且 hero 中只有一个 dramatic color gesture
