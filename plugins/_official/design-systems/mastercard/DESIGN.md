# 受 Mastercard 启发的 Design System

> Category: Fintech & Crypto
> Global payments network. 温暖 cream canvas、orbital pill shapes、editorial warmth。

## 1. Visual Theme & Atmosphere

Mastercard 的体验读起来像一本由 soft stone 与 signal orange 构成的温暖 editorial magazine。Canvas 是一种柔和的 putty-cream (`#F3F0EE`)：不是白色，也不是灰色，而是一种像高端年报纸张的颜色。在这层 canvas 上，所有重要元素都被塑造成 stadium、pill 或 perfect circle。主导性的视觉手势是 **oversized radius**：heroes 带 40-point corners，cards 变成完全的 pill shape，service images 被裁成 circular orbits，buttons 要么完成 pill，要么以 20 points 紧密贴合。页面上几乎没有 sharp corners。

第二个手势是 **orbit and trajectory**。Circular image masks 并不静止；它们由细薄、带手绘感的 orange arcs 连接，这些 arcs 横跨整个 viewport 宽度，暗示的是一组服务星座，而不是一个列表。每个 circle 都附着一个小小的 "satellite"：一个白色 micro-CTA，里面有 arrow icon，像月亮一样停靠在圆周边缘。这是 Mastercard 当前 design language 中最有辨识度的部分：即使页面静止，circles 也感觉在运动。

Typography 完全由 **MarkForMC** 渲染，这是 Mastercard 的 proprietary geometric sans。Headlines 使用 medium weight (500) 和紧凑的 negative letter-spacing (-2%)，让它们有自信但不叫喊。Body copy 使用同一 family 中略轻的 weight (450)；这是 web 上少见的 weight，选择它是因为它比 regular 400 更柔和，又不显单薄。整个系统：warm cream surfaces、pill shapes、circular portraits、traced-orange orbits、black CTAs，同时显得 institutional（一个 60-year-old payments network）和 editorial（现代 brand magazine）；这正是 Mastercard 想保持的张力。

**Key Characteristics:**
- Warm cream canvas (`#F3F0EE`) 替代传统 white：每个 surface 都带色调，绝不 sterile
- Extreme border-radius 作为 design language：40px、99px、1000px 占主导；任何 square 都像 cookie-banner third-party
- Circular image portraits 附带 white satellite-CTAs 和 traced-orange orbital paths
- Ghost "watermark" headlines（heading scale 的 cream-on-cream text）叠在 circle portraits 后方
- Body 中 primary CTAs 使用 20px radius 的 black；cookie-banner orange 只留给 consent flows
- Floating pill-shaped navigation 停靠在 viewport top 下方，带 rounded shoulders
- Eyebrow labels 使用 tiny accent dot + uppercase bold tracking，作为 section-category signal
- Dark warm-black footer (`#141413`) 使用四栏 link layout 和大型 conversational headline

## 2. Color Palette & Roles

### Primary
- **Mastercard Red** (`#EB001B`)：Mastercard mark 的左侧圆形；只用于 brand logo，绝不作为 UI color。
- **Mastercard Yellow** (`#F79E1B`)：Mastercard mark 的右侧圆形；只用于 brand logo，绝不作为 UI color。
- **Ink Black** (`#141413`)：用于 primary CTAs、cream 上的 headline text 和 footer surface 的 warm near-black。它略微偏暖（`13` 的 blue value 朝 cream 靠拢），所以在 warm canvas 上不会感觉像 jet-black。

### Secondary & Accent
- **Signal Orange** (`#CF4500`)：用于 consent actions 和 eyebrow dots 的 burnt/rust CTA orange。比 brand yellow 更深，比 ink 更亮；它是页面唯一激进的颜色，必须谨慎使用。
- **Light Signal Orange** (`#F37338`)：更浅的 carroty orange，用于 carousel active indicators 和 decorative orbital arcs。它始终作为 attention cue，绝不作为 body color。
- **Clay Brown** (`#9A3A0A`)：用于 secondary link-style buttons（例如 cookie details）的 deep rust。位于 ink 与 signal orange 之间。

### Surface & Background
- **Canvas Cream** (`#F3F0EE`)：页面 canvas。温暖、putty-toned，是默认 body background。所有 editorial sections 都位于其上。
- **Lifted Cream** (`#FCFBFA`)：比 canvas 亮一级；用于希望像纸叠在纸上的 nested "raised" sections。
- **White** (`#FFFFFF`)：保留给 floating navigation pill、modal cards、secondary button fills，以及附着在 image portraits 上的小 satellite-CTA circles。
- **Soft Bone** (`#F4F4F4`)：少数组件子区域内部使用的 cool-gray alternative surface。

### Neutrals & Text
- **Ink Black** (`#141413`)：Primary headline 和 body text color。
- **Charcoal** (`#262627`)：稍柔和的黑色，用于某些 text alternates。
- **Slate Gray** (`#696969`)：Muted secondary text：eyebrow label alternative、disabled states、"Privacy Choices" bottom-row text。
- **Granite** (`#555555`) 和 **Graphite** (`#565656`)：更深的 gray，用于 inline body accents 和 link alternates。
- **Dust Taupe** (`#D1CDC7`)：非常 muted 的 cream-gray，用于 disabled 或 "whisper" text（例如 placeholder-like empty state labels）。在 cream 上 contrast 较低；只用于低调内容。

### Semantic & Accent
- **Link Blue** (`#3860BE`)：一种深而略 dusty 的 blue，用于 inline links 和 informational callouts。饱和度足以让它读作 link，但不 neon。
- **Priceless Red + Yellow**：全彩 Mastercard logo mark 是 brand red 和 yellow 唯一共同出现的位置；它把 identity 固定到页面上，但不作为 UI palette。

### Gradient System
Mastercard 在 core UI 中不使用 programmatic gradients。“gradient”的视觉印象来自两个地方：
- **Circular image portraits**：warm-orange photo subject（card、sunflower、beverage）在边缘处渐隐到 cream canvas
- **Deep card shadows**：elevated content 下方的 `rgba(0,0,0,0.08) 0px 24px 48px`，在 pill-shaped media 下创建柔和 halo

## 3. Typography Rules

### Font Family
- **Primary**: `MarkForMC` — Mastercard 的 proprietary geometric sans。页面上的每个 headline、body paragraph、button、nav link 和 footer link 都使用它。
- **Secondary**: `MarkOffcForMC` — 少数场景使用的 "Official" cut（legal text、部分 forms）。
- **Fallback stack**: `SofiaSans, Arial, sans-serif` — Sofia Sans 是合理的开源替身；Arial 是最终 web-safe fallback。

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| H1 (hero) | 64px | 500 | 64px | -1.28px (-2%) | 设置为 `1:1` line-height，让多行 hero 有非常紧的 vertical rhythm |
| H2 (section) | 36px | 500 | 44px | -0.72px (-2%) | 用于 ghost-watermark headline treatments 和 section titles |
| H3 (card title) | 24px | 500 | 28.8px (1.2) | -0.48px (-2%) | Service/solution cards 内部 titles |
| H4 (subhead) | 14px | 700 | 18.2px (1.3) | normal | Marketing surfaces 中很少使用 |
| Eyebrow (H5) | 14px | 700 | 14px | 0.56px (+4%) | Uppercase，搭配 tiny accent dot（例如 "• SERVICES"） |
| Body paragraph | 16px | 450 | 22.4px (1.4) | normal | 半级 450 weight 是 MarkForMC 的 signature：比 500 更柔和，比 400 更坚定 |
| Nav link / Button label | 16px | 500 | 16px | -0.48px (-3%) | 紧凑，无 text-transform |
| Footer link | 14px | 450 | ~20px | normal | Dark footer 上的 lighter weight 让密度更透气 |
| Footer column header | 12-14px | 700 | 14px | 0.56px (+4%) | Uppercase, muted gray, short tracking |

### Principles
- **Weight 450 承重。** 大多数品牌使用 400/500/700；Mastercard 为 body copy 使用 450，制造出异常柔和的阅读 tone。换成 400 会抹平 identity。
- **Headlines 上的 tight negative tracking** (-2%) 赋予 display text editorial density：词语彼此锁紧，而不是散开呼吸。
- **Uppercase tracking 只用于 eyebrow scale**（14px / 700 / +4% tracking）。别在其他地方使用 uppercase；不要有 shouty section titles。
- **One-font system。** 抵抗为 contrast 添加第二种 typeface 的冲动。Contrast 来自 scale、weight 和 letter-spacing，而不是 serif 或 display accent。
- **Line-height ratio 随 size 下降。** H1 是 1:1，H3 是 1.2，body 是 1.4。Display 紧凑，阅读舒适。

### Note on Font Substitutes
MarkForMC 是 proprietary 且 licensed。没有原字体访问权限时，要重建相近 aesthetic：
- **Sofia Sans**（Google Fonts）是最接近的开源匹配；它已经在 Mastercard 声明的 fallback stack 中。
- **Inter** 使用 weights 450/500/700 可作为通用替身；预期 x-height 略高，letter shapes 更松。
- **Neue Haas Grotesk** 或 **Geist** 可为商业项目近似 geometric feel。
- 无论使用哪种 substitute，都要保留 **headlines 上的 -2% letter-spacing** 和 **450 body weight**（variable fonts 可用 `font-weight: 450`；或用 `font-weight: 400` 并将 letter-spacing 额外收紧约 -0.5% 来补偿）。

## 4. Component Stylings

### Buttons

**Primary — Ink Pill**
- Background: Ink Black (`#141413`)
- Text: Canvas Cream (`#F3F0EE`) — 不是 pure white
- Border: 1.5px solid Ink Black（与 bg 相同，形成清晰 edge）
- Radius: 20px
- Padding: 6px 24px
- Font: MarkForMC 16px / weight 500 / letter-spacing -0.32px
- Default: 如上；cream canvas 上的 solid warm-black pill
- Active / pressed: subtle inward-shrink 或 2px offset（不是 hover variant）
- Use for: 页面 body 中所有 marketing CTAs（"Learn more"、"Explore"、"Discover"）

**Secondary — Outlined Pill**
- Background: White (`#FFFFFF`)
- Text: Ink Black (`#141413`)
- Border: 1.5px solid Ink Black
- Radius: 20px
- Padding: 6px 24px
- Font: MarkForMC 16px / weight 450 / line-height 20.8px
- Default: cream 上的 white-on-cream pill，带清晰 ink outline
- Active / pressed: subtle compression
- Use for: 与 primary 搭配的 secondary actions，或 standalone utility CTAs

**Consent / Signal — Orange Pill**
- Background: Signal Orange (`#CF4500`)
- Text: White (`#FFFFFF`)
- Border: 0
- Radius: 24px
- Padding: 1px 30px（vertical 很紧、horizontal 很宽）
- Font: MarkForMC 13px / weight 400 / letter-spacing 0.13px
- Default: 如上；bright rust pill，white text
- Use for: cookie consent、privacy preference 以及其他 legally-distinct confirmations。**不要** 把这个 orange 用作 marketing CTAs；它读起来是 compliance color。

**Satellite — Circular Micro-CTA**
- Background: White (`#FFFFFF`)
- Icon: Ink Black arrow (`→`) at ~20px
- Border: none
- Radius: 50%（perfect circle）
- Size: ~50-60px diameter
- Shadow: none 或 very subtle（portrait 的 shadow 承载 elevation）
- Default: 停靠在 circular portrait 的 bottom-right edge，部分突出到 portrait circle 外
- Use for: service/solution cards 的 primary entry point；始终与 circular portrait 搭配

**Icon-Only Circle Button (carousel, play/pause)**
- Background: transparent or white
- Icon: 10-20px centered
- Border: 1px solid Ink Black（在 cream 上）或 none（在 media 上）
- Radius: 50%
- Size: carousel controls 至少 40px diameter；hero video play 为 80px
- Use for: carousel pagination/play-pause、hero video play、search toggle

### Cards & Containers

**Hero Media Frame (Stadium)**
- Background: Dark video 或 full-bleed imagery（video 背后通常是 black `#000000` 或 `#2B2B2B`）
- Radius: 40px all corners（在 wide viewports 上形成 stadium shape）
- Width: 约 full viewport minus 每侧 ~48px gutter
- Height: 约 viewport 的 60-70%
- Shadow: none（直接位于 canvas 上）
- Corners: media element 上极端的 40px radius 是最 iconic 的 Mastercard gesture；不要减少 rounding

**Service / Solution Portrait Card**
- Shape: Perfect circle (radius 50%) 或 ellipse (radius 999px / 1000px)
- Diameter: desktop 260-340px；mobile 约 220px
- Image crop: square source, cropped to circle
- Attached element: White satellite circular CTA（见上）停靠在 bottom-right，约 40% 位于 portrait 外侧
- Eyebrow below: accent dot + uppercase label（例如 "• SERVICES", "• SOLUTIONS"）
- Title below: H3（24px / weight 500 / -2% tracking），最多 1-2 行
- Decorative orbit: 细约 1px 的 Light Signal Orange curved line 从这张 card 向下一张延伸，暗示 connection

**Pill Carousel Card**
- Radius: 1000px（full pill）或 40px corners（rounded stadium）
- Width: 约 viewport 的 40-60%
- Height: 约 380-420px（portrait-pill orientation）
- Content: full-bleed photography，叠加 small chip labels
- Chip inside: White pill（约 999px radius），Ink Black text，padding 8px 20px，用于 "Story" 等 category tags
- Large inline CTA inside: Ink Pill button，oversized（padding 16px 40px，radius 40px）

**Ghost Watermark Text Block**
- Font: MarkForMC 72-128px / weight 500 / tight -2% tracking
- Color: Canvas Cream 稍微变暗（`#E8E2DA` 或类似 cream-on-cream）
- Position: layered behind portrait circles, bleeding off viewport edge
- Purpose: 设置 section theme，但不与 foreground copy 竞争

### Inputs & Forms
Marketing page 上 form surface 很少。Nav header 中的 search input 是：
- Initial state: 48px circular button with magnifier icon
- Expanded state: horizontal input field, border `1px solid` Ink Black at ~50% opacity, radius 999px, padding 12px 24px, white background

**Country/language selector (footer)**
- Background: Ink Black（与 footer 相同）
- Text: White
- Border: 1px solid `rgba(255,255,255,0.4)`
- Radius: 999px（full pill）
- Icon: 右侧 downward chevron

### Navigation

**Floating Nav Pill (desktop)**
- Container: white-to-translucent-white pill，漂浮在 viewport 最顶部下方，top margin 约 24px
- Radius: 999px / 1000px（full pill）
- Padding: 内部约 16px 40px
- Shadow: very soft (`rgba(0, 0, 0, 0.04) 0px 4px 24px 0px`)；只够让它从 cream canvas 上轻轻浮起
- Content: Mastercard logo 左侧，primary link group 居中（"For you", "For business", "For the world", "For innovators", "News and trends"），search icon 右侧
- Link spacing: primary links 之间约 48-56px gap
- Link style: Ink Black, weight 500, 16px, no underline, active 前没有 pill surround

**Mobile Nav**
- 同样的 pill shape，但折叠为：logo + hamburger menu button + search icon only
- Menu 打开为 full-screen overlay，primary links 垂直堆叠

### Image Treatment

- **Aspect ratios used**: 1:1（所有 service portraits：cropped to circle）、约 3:4 或 4:5（carousel pill cards）、16:9 或更宽（hero video frame）
- **Full-bleed vs padded**: Hero 带 gutters 且接近 viewport-wide；service portraits 始终居中于其 column，并有充足 whitespace；footer imagery 很少
- **Masking**: Aggressive circular masking 是 defining treatment：square source images 被裁成直径匹配的 perfect circles。不要使用 rectangular service imagery。
- **Lazy loading**: 标准 `loading="lazy"`，从 cream-tinted placeholder 开始做 soft blur-up transition，在加载期间保持 warm palette

### Decorative Orbital Lines

一个 signature motif：Light Signal Orange (`#F37338`) 中细薄（约 1-1.5px）的 single-weight curved lines，在 circular portraits 之间描出 arcs。这些 lines：
- 暗示 service cards 之间的 connection，而不是 literal arrows
- 宽度从约 200px 到 full-viewport arcs
- 感觉是 hand-drawn（轻微 irregularity），而不是完美 CSS curves
- 只出现在包含 circular portrait content 的 sections；绝不出现在 pill sections，也不出现在 footer

### Footer

- Background: Ink Black (`#141413`)
- Text: White
- Padding: 48px horizontal 100px / bottom 148px（bottom space 很高）
- Structure: 大型 conversational H2（"We're always here when you need us"）左对齐，下方是 4-column link grid
- Column headers: uppercase, muted, weight 700, letter-spacing +4%
- Link rows: white, weight 450, 14px；"NEED HELP?" column 的条目前缀 small icon（support bubble、card、map pin、question mark）
- External link marker: link text 后的小 upper-right arrow (`↗`)
- Bottom row（位于 1px white-at-opacity divider 下方）: copyright + privacy small-print + country-language pill dropdown + 四个 social icons（LinkedIn、Facebook、X、YouTube）

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px（由 dembrandt extraction 和 computed styles 确认）
- **Scale**: 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128（powers of 8）
- **Section vertical padding**: desktop 上 major sections 之间约 96-128px；mobile 上约 48-64px
- **Card internal padding**: desktop 32-40px，mobile 约 24px
- **Nav top margin**: 距 viewport top 约 24px（pill 漂浮，不贴边）

### Grid & Container
- **Max content width**: 居中约 1200-1280px，带约 48-100px horizontal gutter
- **Column pattern**: 隐含 12-column，但实际 layouts 使用 2-up asymmetric（large headline left, supporting text right）、1-up full-bleed（hero, video），或 staggered single-portrait placement（service cards 位于不同 grid positions，形成 "constellation" feel）
- **Footer grid**: desktop 上 4 equal columns，mobile 上折叠为 single column accordion

### Whitespace Philosophy
Mastercard 将 whitespace 视为结构，而不是缺席。典型 service section 包含：
- 一个 ghost headline，占据 section 顶部约 40%（大部分是 empty cream）
- 一个 single circular portrait，位于约 60% 深处，左右不对称
- portrait 与下一 section 之间约 300-500px 的 blank canvas
这种刻意的空白告诉眼睛：“慢下来，一次只读一件事”；这与 dense dashboard UIs 正好相反。

### Border Radius Scale

| Radius | Use |
|--------|-----|
| 3-6px | Tiny decorative elements, cookie banner micro-chips |
| 20px | Primary and secondary body CTAs（signature button radius） |
| 24px | Consent/orange pill buttons, modal inner chips |
| 40px | Hero media frames, large section container corners, H2 pill labels |
| 50% | Circular portraits, icon-only buttons, satellite CTAs |
| 99px / 999px / 1000px | Full pill shapes — navigation, carousel cards, footer country selector, primary inline chips |

这个 scale 很不寻常：大多数系统使用 4/8/12/16。Mastercard 跳过这些，承诺 **要么 small (≤6)，要么 medium-large (20-40)，要么 full-pill (99+)**。8-12 的中间地带不存在，因此 UI 要么感觉“precise and utility”，要么感觉“soft and editorial”，没有中间态。

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 | No shadow | Default：95% surfaces 直接位于 cream canvas 上 |
| 1 | `rgba(0, 0, 0, 0.04) 0px 4px 24px 0px` | Floating nav pill：几乎不可见的 lift |
| 2 | `rgba(0, 0, 0, 0.08) 0px 24px 48px 0px` | Hero media frames, elevated cards：soft large-radius halo，而不是 hard drop |
| 3 | `rgba(0, 0, 0, 0.25) 0px 70px 110px 0px` | 少见；feature tile 上的 dramatic elevation |

### Shadow Philosophy
Mastercard 使用 shadows 作为 **atmospheric cushioning**，不是 directional light。Level 2 shadow 有 48px spread 且只有 8% opacity；它几乎不作为 dark pixels 存在，却创造出“card 正在 canvas 上方呼吸”的感觉。系统中几乎没有 hard-edged、tight shadows。功能性分隔（form inputs、footer divider）更偏好 border lines 而不是 shadows。

### Decorative Depth
- **Orbital arcs**（Light Signal Orange, ~1px）：跨 sections 描出 connective paths
- **Ghost watermark headlines**：cream-on-cream text 让 sections 具有近似 pressed-paper 的质感
- **Circle-image fade**：circular portraits 边缘的 warm-toned photography 溶入 canvas，暗示 soft atmospheric depth

## 7. Do's and Don'ts

### Do
- 使用 Canvas Cream (`#F3F0EE`) 作为默认 body background；绝不用 pure white
- 将 service/feature imagery mask 为 perfect circles，而不是 rectangles 或 rounded rectangles
- 在每个 circular portrait 的 bottom-right 附着一个 white satellite CTA
- Headlines 使用 MarkForMC weight 500 和 -2% letter-spacing
- Body paragraphs 使用 weight 450（不是 400）
- Primary CTAs 保持为 Ink Black pills（20px radius）和 cream text
- Signal Orange 只用于 consent、legal 或 compliance actions
- 将 nav 做成 rounded white pill，漂浮在 viewport top 下方，而不是贴在 y=0
- 用三种 surface tones 构建页面节奏：canvas cream -> lifted cream -> ink footer
- 在 service cards 之间使用细 Light Signal Orange arcs 来暗示 connection

### Don't
- 不要使用 pure white 作为 page background；它会破坏 warm editorial tone
- 不要把 image frames 圆角设为 8-16px；Mastercard 要么使用 full-pill、40px，要么 full-circle。中间 radii 会显得 generic
- 不要将 Signal Orange 用于 marketing CTAs；它读起来像 cookie-consent orange，并会稀释 legal color signal
- 不要混用 typefaces：不要 serif accent、不要 script、不要 secondary display font
- 不要在 nav 中塞入超过六个 top-level links；pill 应该感觉 airy
- 不要使用 hard shadows；所有 elevation 都应使用 48px+ spread 和 ≤10% opacity
- 不要对大于 14px eyebrow label 的任何内容使用 uppercase
- 不要省略 eyebrow labels 前的 tiny accent dot；它是 identity
- 不要把 circular portraits 放在 grid 上；它们的 magic 来自 asymmetric placement

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <= 767px | Nav pill shows logo + menu + search only; primary links hide behind hamburger; service portraits stack single-column centered; hero headline drops from 64px to ~40px; footer columns collapse into a vertical accordion |
| Tablet | 768-1023px | Nav pill shows 2-3 primary links truncated; service portraits arrange 2-up; hero headline ~48px |
| Desktop | >= 1024px | Full nav with 5 primary links centered; service portraits asymmetrically placed with decorative orbital lines; hero headline 64px |
| Wide | >= 1440px | Content max-width caps at ~1280px; gutters grow symmetrically; orbital lines extend further |

### Touch Targets
所有 interactive elements 都舒适地超过 44x44px。Satellite CTA（circle + arrow）约 50-60px。Nav pill buttons 约 48px 高。Mobile hamburger 和 search 是 48x48px。任何 breakpoint 下都没有低于 40px 的 link 或 button。

### Collapsing Strategy
- **Nav**: full pill -> compact pill with hamburger。Pill shape 在所有 breakpoints 中保留：始终 rounded、始终 floating。
- **Service grid**: asymmetric constellation -> 2-up -> 1-up stack。Mobile 上移除 orbital arcs（它们只适用于 asymmetric placement）。
- **Spacing**: mobile 上 section vertical padding 从 128px 压缩到 48px。
- **Content**: two-column hero（headline left / supporting text right）变为 stacked（headline on top, supporting text below）。
- **Footer**: 4 columns -> 1 column accordion，每个 section 带 chevron toggles。

### Image Behavior
Circular portraits 按比例缩放（在每个 size 下保持 perfect circle）。Hero video frames 在每个 breakpoint 保持 40px radius，但 frame 本身随 viewport 缩小。Lazy loading 标准化，使用 cream-tinted blur-up placeholder，在加载期间保持 palette。

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: "Ink Black (`#141413`) — the warm near-black used for primary pill buttons and footer"
- Background: "Canvas Cream (`#F3F0EE`) — warm putty body canvas, never pure white"
- Lifted surface: "Lifted Cream (`#FCFBFA`) — one step lighter than canvas for nested sections"
- Heading text: "Ink Black (`#141413`)"
- Body text: "Ink Black (`#141413`) at weight 450"
- Muted text: "Slate Gray (`#696969`)"
- Signal / Consent: "Signal Orange (`#CF4500`) — reserve for cookie consent and legal actions"
- Accent arc: "Light Signal Orange (`#F37338`) — orbital decorative lines only"
- Border / Outline: "Ink Black at 1.5px for pill buttons; 1px at low opacity elsewhere"
- Footer: "Ink Black (`#141413`) with White text"

### Example Component Prompts
- "创建一个直径 300px 的 circular portrait card，将一张 square photograph 裁成 perfect circle。在 bottom-right 附着一个 56px white satellite button，内含 dark arrow icon，并让它约 40% 突出到 portrait 外侧。Portrait 下方添加一个 eyebrow label，包含 Light Signal Orange dot 和 uppercase 'SERVICES' text，使用 MarkForMC weight 700、14px。Eyebrow 下方设置一个 24px / weight 500 的 Ink Black title。"
- "设计一个 primary CTA button：Ink Black (`#141413`) background、Canvas Cream (`#F3F0EE`) text、20px border-radius、6px vertical 和 24px horizontal padding，MarkForMC font，16px weight 500，带 -2% letter-spacing。"
- "构建一个 floating navigation pill：white background，带 `rgba(0, 0, 0, 0.04) 0px 4px 24px 0px` shadow、999px border-radius、约 16px vertical 和 40px horizontal internal padding。将它居中定位在 viewport top 下方 24px，左侧放 Mastercard logo，中间放五个 primary links 且 gap 为 48px，右侧放一个 48px circular search button。"
- "创建一个 hero media frame：所有 corners 使用 40px border-radius，宽度为 full viewport width minus 48px gutters，高度约为 viewport height 的 60%，video content 使用 dark background。将它直接放在 cream canvas 上，不加 shadow。"
- "设计一个 footer：Ink Black (`#141413`) background、white text、4-column link grid，column headers 为 uppercase muted，14px weight 700，带 +4% tracking。Grid 上方包含一个大型 conversational H2，下方包含一条 1px white-at-30%-opacity horizontal divider，bottom row 包含 copyright、legal small-print links、pill-shaped country selector 和四个 social icons。"

### Iteration Guide
使用此 design system 优化已有生成 screens 时：
1. 一次只关注 ONE component；不要并行 redesign 多个 surfaces
2. 引用本文档中的 specific color names AND hex codes
3. 在 technical values 旁配合使用 natural language（"warm putty cream"、"stadium pill"、"circular portrait with satellite CTA"）
4. 在 specific measurements 旁描述期望的 "feel"（editorial、soft、institutional）
5. 拿不准时，从三个 radii 中选择：20px（buttons）、40px（hero/stadium）或 999px（pill/nav）
6. Default backgrounds 使用 Canvas Cream (`#F3F0EE`)，而不是 white；这一处改变会把整体 mood 推向 Mastercard

### Known Gaps
- Live page 使用 MarkForMC，一种 proprietary licensed typeface。Sofia Sans 是最接近的开源替代，并列在 Mastercard 自己的 fallback stack 中。
- Tablet breakpoint specifics（768-1023px）是从 desktop 和 mobile captures 推断的；intermediate layouts 可能因 section 而异。
- Circular portraits 后方 ghost-watermark headlines 使用的精确 "whisper" cream tone 在 captures 中读起来介于 `#E8E2DA` 与 `#D1CDC7` 之间；不同 section 的 precise value 会变化。
- Third-party consent orange (`#CF4500`) 是 Mastercard 记录在案的 consent signal，不应与任何 marketing CTA color 混淆。
- Mastercard logo mark（red `#EB001B` + yellow `#F79E1B`）是 brand asset，而不是 UI palette entry。
