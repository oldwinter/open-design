# 受 Bugatti 启发的 Design System

> Category: Automotive
> Hypercar brand. 电影黑画布、单色克制、纪念碑式 display type。

## 1. Visual Theme & Atmosphere

Bugatti.com 的行为不像一个网站，而像一部长篇汽车电影，只是访客恰好站在电影内部。画布是纯 `#000000`，静止状态下唯一出现的颜色是白色，整个页面由 full-bleed hero video 与摄影承载，顶部只叠加一个排版时刻。这里没有 cards、没有 grids、没有促销模块、没有 newsletter signup，也没有三栏 editorial layout。它是一条连续的 cinema-black 频道，只被车辆本身和少数 pill-shaped calls to action 打断，这些 CTA 会用 ALL CAPS monospace 安静地说出类似 "EXPLORE OUR OPPORTUNITIES" 的话。

整个系统中最鲜明的动作是 **scale**：`Bugatti Display` 字体在 hero 时刻会达到 **288px**。二百八十八像素。这不是笔误；dembrandt sweep 抽取到的 heading style 以 18rem 尺寸渲染，ALL CAPS、line-height 1.0，其阅读方式就像你从展厅另一端阅读 Chiron 前脸上的 brand mark。到了 288px，headline 不再是文本，而是建筑。60px 的 secondary display scale 在它旁边几乎显得微型，36px 的 mid-display 则像细则小字。这套 typographic hierarchy 是本 catalog 中所有量产品牌网站里最极端的一套，也正是它赋予 Bugatti.com 雕塑般的 couture-showroom 气质。

另一个标志是 **monochromatic austerity**。整个首页在静止状态下只使用三种颜色：`#000000`、`#ffffff` 和 `#999999`（用于 disabled/tertiary states 的 mid gray）。没有 accent、没有 brand blue、没有 hazard color、没有 commerce orange，也没有 gradient wash。设计师有意识地决定：Bugatti 的 color system 应当是车漆本身；页面只是黑色天鹅绒展示台，唯一存在的颜色就是当天 hero vehicle 身上那层 blue-on-black lacquer。这种纪律与 PlayStation 的 PlayStation Blue 或 The Verge 的 Jelly Mint 正好相反：Bugatti 拒绝与自己的产品竞争。

**Key Characteristics:**
- 整页使用 cinema-black `#000000` canvas：没有 gradients、没有 tints、没有 accents
- 288px `Bugatti Display` ALL-CAPS headline：本 catalog 中最极端的 display scale
- 三字体 custom family：`Bugatti Display`（雕塑感）、`Bugatti Monospace`（UI labels）、`Bugatti Text Regular`（body）
- 仅单色 palette：black、white，以及一个用于 tertiary/disabled 的 `#999999` mid gray
- Pill buttons 使用 `9999px` radius：透明背景、1px white border、padding `12px 24px`
- Video- 和 photography-first page：chrome 几乎沉默，让产品发声
- 每个 CTA、navigation link 和 caption 都使用 Mono UPPERCASE labels，并带 1.2-1.4px letter-spacing

## 2. Color Palette & Roles

### Primary
- **Velvet Black** (`#000000`)：整个 canvas。不是 near-black，也不是 warm black，而是纯 HTML `#000`。Bugatti 把它当作展示台表面，就像珠宝品牌使用黑色天鹅绒布。
- **Showroom White** (`#ffffff`)：所有文本、所有 borders、所有 CTAs。White 是 chrome 在静止状态下唯一出现的颜色，带有哑光博物馆标签上排印文字的重量。

### Secondary & Accent
- **Silver Mist** (`#999999`)：系统中唯一的灰色。用于 secondary button borders、disabled states，以及最细的 hairline dividers。把它视为 white 的 "75%-volume" 版本；它从来不是一种颜色，只是同一种声音更安静的版本。

### Surface & Background
- **Velvet Black** (`#000000`)：唯一 surface。没有 secondary surface、没有 elevated card、没有 modal backdrop。如果某些东西需要显得“分离”，它仍位于同一个 black 上，并用细 `#999999` border 标记；不改变颜色。

### Neutrals & Text
- **Primary Text** (`#ffffff`)：所有 headlines、body copy、button labels 和 navigation items。
- **Tertiary Text** (`#999999`)：disclaimer text、placeholder labels，以及最轻的 supporting metadata。谨慎使用；Bugatti 更倾向于隐藏 secondary content，而不是把它调暗。

### Semantic & Accent
- **Tailwind Ring Leak** (`rgba(59, 130, 246, 0.5)`)：一个 Tailwind 默认 `--tw-ring-color` 从 build system 抽取出的 tokens 中泄漏出来；这 **不是** Bugatti brand palette 的一部分。忽略它。如果需要真实 focus state，请改用 1px `#ffffff` ring。

### Gradient System
无。Bugatti.com 上没有任何 decorative gradients。页面上唯一的“gradient”是车辆 hero video 中自然光本身形成的 gradient。品牌拒绝给 chrome 添加任何可能与产品摄影氛围光竞争的 gradient。

## 3. Typography Rules

### Font Family
- **Bugatti Display** — fallback: `ui-sans-serif`, `system-ui`。专有 custom display typeface，只在 hero 和 mid-display headlines 的超大尺寸中使用。它被设计为在建筑尺度上阅读；在 288px 时，它的几何形状本身就是视觉元素，而不仅是文本。字体带有一点 20 世纪早期 Grand Prix typography 的气息（Ettore Bugatti 参赛的时代），但从不变得怀旧。
- **Bugatti Monospace** — fallback: `ui-sans-serif`, `system-ui`。custom monospaced face，专用于网站上的每一个 UI label。它承载所有 navigation links、button labels、captions 和 UPPERCASE metadata。严格的 mono tracking（所有用途都带 1.2-1.4px letter-spacing）让 UI 看起来像技术档案或仪表遥测打印件；这很适合一家制造 1600-horsepower hypercars 的公司。
- **Bugatti Text Regular** — fallback: `ui-sans-serif`, `system-ui`。body copy 的主力，只用于稀少的段落和 inline reading text。Weights 与 styles 都很克制；当 display type 在呐喊、monospace 在低语时，这个字体存在的目的就是隐身。

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Hero Display (Monumental) | Bugatti Display | 288px / 18.00rem | 400 | 1.00 | — | ALL CAPS — 本 catalog 中最大的 display scale，具有建筑般存在感 |
| Mid Display (Feature) | Bugatti Display | 60px / 3.75rem | 400 | 1.00 | 1.4px | Feature-panel headlines，ALL CAPS optional |
| Mid Display (Subfeature) | Bugatti Display | 60px / 3.75rem | 400 | 1.00 | — | Secondary feature headlines |
| Section Heading | Bugatti Display | 36px / 2.25rem | 400 | 1.11 | — | Section-level title |
| Monumental Mono Headline | Bugatti Monospace | 60px / 3.75rem | 400 | 1.00 | — | UPPERCASE — reserved for technical/section labels at hero scale |
| Body Small (Display) | Bugatti Display | 16px / 1.00rem | 400 | 1.50 | — | Display face used sparingly at body size for marketing copy |
| Lead Body | Bugatti Text Regular | 20px / 1.25rem | 400 | 1.40 | — | Paragraph lead |
| Body Regular | Bugatti Text Regular | 16px / 1.00rem | 400 | 1.50 | — | Standard reading body |
| Body Compact | Bugatti Text Regular | 14px / 0.88rem | 400 | 1.43 | — | Dense body |
| UI Link (Caps) | Bugatti Monospace | 14px / 0.88rem | 400 | 1.43 | 1.4px | UPPERCASE — primary navigation and primary link style |
| UI Link (Mono Plain) | Bugatti Monospace | 14px / 0.88rem | 400 | 1.43 | — | Plain-case mono link — rare, used for disclaimer links |
| Button Label (CAPS) | Bugatti Monospace | 14px / 0.88rem | 400 | 1.43 | 1.4px | UPPERCASE — primary pill-button label |
| Button Label (Compact) | Bugatti Monospace | 12px / 0.75rem | 400 | 1.33 | 1.2px | UPPERCASE — small pill-button label |
| Button Label (Unstyled) | Bugatti Monospace | 12px / 0.75rem | 400 | 1.33 | — | Plain-case mono — footer microbutton |
| Caption CAPS Wide | Bugatti Monospace | 14px / 0.88rem | 400 | 1.43 | 1.4px | UPPERCASE — section eyebrows and tech-spec labels |
| Caption Plain Wide | Bugatti Monospace | 14px / 0.88rem | 400 | 1.43 | 1.4px | Plain-case with 1.4px tracking — the "mid-formal" register |
| Caption Plain | Bugatti Monospace | 14px / 0.88rem | 400 | 1.43 | — | Plain mono caption |
| Caption Micro (Text) | Bugatti Text Regular | 14px / 0.88rem | 400 | 1.43 | — | Body-face caption |
| Caption Micro (CAPS) | Bugatti Monospace | 12px / 0.75rem | 400 | 1.33 | 1.2px | UPPERCASE — smallest tagging label |
| Caption Micro (Plain) | Bugatti Monospace | 12px / 0.75rem | 400 | 1.33 | — | Smallest plain-case mono |

### Principles
- **Bugatti Display 是雕塑，不是普通字体。** 如果你发现自己用 Bugatti Display 排 body copy 或 button，那就是用错工具。这个 face 只保留给 **36px minimum** 的 headlines，理想情况下为 60px+，并且每页至少一次使用 200px+ 来制造品牌围绕其建立的纪念碑效果。
- **Bugatti Monospace 掌管 UI。** 每个 navigation link、每个 button、每个 caption、每个 eyebrow 都使用 Bugatti Monospace，通常是带 1.2-1.4px tracking 的 UPPERCASE。正是这种 mono-caps discipline，让 UI 读起来像 Grand Prix telemetry panel，而不是 luxury shopping cart。
- **Bugatti Text Regular 是隐形的。** 它只出现在短段落和 inline reading copy 中，通常为 14-20px。它绝不用作 labels、buttons 或 display。
- **没有 bold。** 抽取 tokens 中的每个 weight 都是 regular (400)。Bugatti 不用 weight 建立层级，而用 scale。需要强调时，把字做大，而不是做重。
- **Tracking 有两个 register。** Mono caps 始终带 1.2-1.4px letter-spacing。60px+ display type 在 hero scale 有时带 1.4px tracking。Body type 没有 tracking。
- **Display 的 line-height 极其紧。** 每个 Bugatti Display 用法都运行在 line-height 1.00 或 1.11。Headlines 换行时会彼此贴近；这就是设计。不要放松 leading。

### Note on Font Substitutes
1.00 line-height 和 288px display scale 都假设使用 **proprietary Bugatti Display face**，该字体采用紧凑 vertical metrics，专为建筑尺度绘制。如果用 **Unbounded**、**Big Shoulders Display** 或 **Archivo Black** 这类开源 extended geometric display 替代，请做两处调整：(1) **将 line-height 放宽到约 1.05-1.10**，避免 ascender collisions；(2) 在大多数 viewport 上 **将最大 display size 限制在约 104-128px**。这些替代字体的 horizontal metrics 比 Bugatti Display 更宽，因此 288px 的 monumental headline 会换成 4+ 行并压垮布局。200px+ scale 只保留给单词式 monumental moments（例如单独的 "BUGATTI"）。Bugatti Monospace 的替代字体（Space Mono、JetBrains Mono）和 Bugatti Text Regular 的替代字体（Inter、DM Sans）可以直接使用 token values，无需调整。

## 4. Component Stylings

### Buttons

**Primary — White Outlined Pill**
- Background: transparent
- Text: `#ffffff`, Bugatti Monospace 14px / 400 / 1.4px tracking, UPPERCASE
- Border: `1px solid #ffffff`
- Border radius: `9999px` — full pill
- Padding: `12px 24px`
- Outline: `rgb(255, 255, 255) none 0px` at rest
- Hover: 可能填充 background 为 `#ffffff` 并使用 black text，或做轻微 opacity dim（抽取出的 token set 没有捕获 bespoke hover；把这视为 safe assumption，因为 Bugatti 的默认 interaction 是 restraint）
- Active: opacity drop to ~0.7
- Focus: 使用 1px `#ffffff` outer ring，通过 `box-shadow: 0 0 0 1px #ffffff, 0 0 0 2px #000000` 保证 contrast
- Transition: background/color 使用 200-300ms ease；安静，绝不弹跳

**Secondary — Gray Rounded Button**
- Background: transparent
- Text: `#ffffff`, Bugatti Monospace 12px / 400 / 1.2px tracking, UPPERCASE
- Border: `1px solid #999999` (Silver Mist)
- Border radius: `6px` — subtle corner，系统中唯一的 non-pill non-zero radius
- Padding: `6px 12px`
- Hover: border transitions to `#ffffff`, text stays white
- Active: opacity 0.7
- 用于 compact utility buttons（menu toggles、closed-dialog buttons）

**Ghost — Unbordered Link Button**
- Background: transparent
- Text: `#ffffff`, Bugatti Monospace 12px / 400 — plain or UPPERCASE
- No border, no padding beyond inline
- 用于 footer 和 tertiary nav

### Cards & Containers
- **没有 cards。** Bugatti.com 没有 card component。整个页面是一串 full-bleed media blocks，上面叠加 headline 和 optional CTA；它更像电影章节，而不是 card grid。
- 最接近“container”的东西，是少见的 bordered section：`1px solid #999999` frame、`6px` border radius、`#000000` interior。这些只保留给 cookie-consent notices 和 modal-style dialogues，而不是 editorial content。
- Media blocks 的 hover state：无。视频播放，CTA 可点击，这就是全部 interaction vocabulary。

### Inputs & Forms
- 抽取出的 tokens 捕获了 **zero input styles**（`⚠ Inputs: 0 styles`）。这是因为 Bugatti.com 首页几乎没有 forms：没有 newsletter signup、没有 search bar、没有 contact form、没有 email capture。当 forms 出现在更深页面时，使用以下与系统一致的默认值：
  - **Default**: `#000000` background, `1px solid #999999` border, `6px` radius, `#ffffff` text in Bugatti Text Regular 16px, placeholder `#999999`.
  - **Focus**: border transitions to `#ffffff`, no glow；border change 本身就是 focus signal。
  - **Error**: border stays white；在下方添加 `#999999` inline message。Bugatti 不使用 red error colors；它保持在 monochrome palette 中。
  - **Transition**: border-color 使用约 250ms ease。

### Navigation

- **Top nav**: black (`#000000`) thin strip，中间是 Bugatti "EB" monogram 或完整 "BUGATTI" wordmark，左侧是 hamburger "MENU" link，右侧是 "STORE" link。两个 nav links 都是 Bugatti Monospace 14px UPPERCASE，带 1.4px tracking。
- **Logo**: desktop scale 下为 128x29px，小于本 catalog 中几乎所有其他品牌。Bugatti 不需要大声喊出自己的名字。
- **Hover on nav links**: color stays `#ffffff`；hover signal 是 subtle text-decoration underline 或 opacity shift to ~0.75。没有 color change。
- **Mobile**: 完整 nav 折叠为三个元素："MENU"、wordmark、"STORE"；基本就是去掉 separator spacing 的 desktop layout。
- **Sticky behavior**: nav 固定在顶部，滚动时保持 black-on-black。当它覆盖 dark video 时几乎不可见，这是刻意设计。

### Image & Video Treatment
- **Aspect ratios**: hero video 使用 16:9 和 21:9，mid-feature photography 使用 4:3，少见 portrait shots 使用 1:1。
- **Corners**: 少见；大多数 media 都是 full-bleed 且 zero border radius。出现 radius 时为 `6px`。
- **Full-bleed**: yes, always。Hero video 填满 viewport。Secondary feature video 填满 section width 的 100%。
- **Captions**: Bugatti Monospace 12px UPPERCASE，`#ffffff`，约 1.2px tracking，置于 media 下方或左下角。
- **Hover**: no zoom, no scale, no scrim。视频播放，这就是 hover state。
- **Lazy loading**: fold 下方每张图片使用 `loading="lazy"`；hero video 预加载。

### Atmospheric Overlay
当 type 叠在可能威胁可读性的 photography 或 video 上时，Bugatti 使用 subtle `rgba(0, 0, 0, 0.4)` linear gradient，从底部（40% black）到顶部（transparent）；这是系统中唯一类似“shadow”的效果。它是 vignette，不是 drop shadow。

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px.
- **Scale**（来自 tokens）: 4, 6, 12, 36, 48, 64px。六个值。**只有六个。** 这是所有 major brand site 中最小的 spacing scales 之一；Bugatti 使用少数离散 gaps，并拒绝发明中间值。
- **Section padding**: 通常为 48-64px vertical。Hero panels 是 full-viewport-height，完全绕过 scale。
- **Button padding**: 6px 12px（compact）或 12px 24px（primary）。没有别的。
- **Inline spacing**: stacked labels 之间为 4-12px；36/48/64 的大跳跃发生在 content blocks 之间。

### Grid & Container
- **Max width**: 1720px（dembrandt 检测到 breakpoints up to 1720）。网站会扩展到 ultra-wide，适配 luxury showroom displays 和 wide cinema monitors。
- **Column patterns**: 首页基本没有 multi-column grid；它是一组 single full-width blocks 的堆叠。当 deeper pages 需要 columns（configurator、atelier、technical specs）时，会使用 12-column Tailwind-based grid。
- **Outer padding**: 极少。大多数 sections bleed 到 viewport edge，只对 overlaid text 和 CTA block 施加 padding（通常距 bottom-center 48-64px）。

### Whitespace Philosophy
Bugatti 的 whitespace philosophy 是 **cinematic negative space**：即便存在内容，页面也有 90% 是空的，因为内容通常是一段单车视频或照片。节奏是：full-bleed media -> monumental headline -> single pill CTA -> scroll -> next full-bleed media。这里没有任何 "information density"。页面像博物馆一样呼吸，每件展品都有自己的安静房间。

### Border Radius Scale
- **0** — all media and the hero canvas 的默认值
- **6px** — secondary rounded buttons、bordered frames、small utility containers
- **9999px** — primary pill buttons

三个值。没有 `12px`、没有 `24px`、没有 `20px`。Bugatti 的 radius system 是本 catalog 中最克制的一套；品牌主动认定“slightly rounded rectangle”是一种粗俗形状，并承诺要么是真正的 rectangle，要么是真正的 pill。

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| 0 | No shadow, no border | Default text and media on `#000000` |
| 1 | `1px solid #999999` | Secondary containers, cookie-style dialogs |
| 2 | `1px solid #ffffff` | Primary button outline, active state indicators |
| 3 | Bottom-to-top `rgba(0, 0, 0, 0.4) -> transparent` vignette | Text-legibility gradient when type sits over video |

**这就是完整 depth system。** 抽取出的 token set 中有 1 个 shadows（零个有意义的 `box-shadow` values，只是 placeholder）。Bugatti 不使用 drop shadows，不使用 elevation rings，也不使用 glowing focus states。Depth 只由 1px hairline border 或 vignette gradient 的存在暗示，仅此而已。

### Decorative Depth
无。零 gradients（除了 subtle text-legibility vignette）、零 blurs、零 glows、零 atmospheric effects。Bugatti 网站的 decorative depth 完全来自产品摄影中已经烘焙进去的 lighting。Chrome 不与其竞争。

## 7. Do's and Don'ts

### Do
- **Do** 保持整个 canvas 为 `#000000`。不要 off-black、不要 near-black、不要 warm black。Bugatti 是 pure black。
- **Do** 以建筑尺度使用 Bugatti Display：minimum 36px，理想为 60px+，并且每页落下一个 200px+ 的 monumental headline。
- **Do** 对每个 button、link、nav item 和 caption 使用带 1.2-1.4px tracking 的 Bugatti Monospace UPPERCASE。
- **Do** 静止状态下只使用 white text。`#999999` 只用于 disabled、tertiary 和 thin borders。
- **Do** primary buttons 使用 9999px border radius：full pill、thin 1px white outline、transparent fill。
- **Do** 每个 hero section 都使用 full-bleed video 和 photography。产品就是 UI。
- **Do** display headlines 保持 line-height 1.00-1.11。Tight leading 就是建筑。
- **Do** 像 cinematic negative space 一样对待 whitespace：给每个 block 自己的安静房间。

### Don't
- **Don't** 引入 accent colors。不要 blue、不要 red、不要 commerce orange、不要 hover cyan、不要 warning red。Palette 是 black、white 和一个 gray。
- **Don't** 用 bold weights 建立层级。Scale 是唯一的层级手段；让它更大，而不是更重。
- **Don't** 在任何元素上使用 drop shadows。Bugatti 的 chrome 中没有 `box-shadow`。
- **Don't** 使用 cards 或 elevated surfaces。Bugatti 没有 card component。
- **Don't** 使用介于 6px 和 9999px 之间的 rounded rectangles。Radius system 是 rectangle、slightly-rounded utility 或 full pill；中间什么都没有。
- **Don't** 将 Bugatti Display 用于 body、buttons 或 UI labels。它只保留给 36px+ headlines。
- **Don't** 在 primary UI 中使用 lowercase 的 Bugatti Monospace。Buttons 和 nav links 永远是 ALL CAPS。
- **Don't** 在任何地方添加 gradients、glows、blurs 或 glassmorphism。Chrome 是沉默的。
- **Don't** 如果可读性有风险，不要在 photography 上直接放文字；应加上 `rgba(0, 0, 0, 0.4)` bottom-up vignette。

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | <640px | Single column, hamburger "MENU", hero video locked to 9:16 or 16:9, hero headline scales to ~48-72px |
| Small Tablet | 640-767px | Still single column, padding opens slightly, typography scales up |
| Tablet | 768-1023px | Still single column for content, nav expands to include wordmark, headline scales to ~120px |
| Small Desktop | 1024-1279px | Full desktop nav, headline scales to ~200px |
| Desktop | 1280-1535px | Full layout, headline at 240-260px |
| Large Desktop | 1536-1719px | Max headline scale (288px), ultra-wide hero video |
| Ultra-Wide | >=1720px | Container caps, hero video locks at 21:9 or wider, everything else stays proportional |

dembrandt sweep 检测到 6 个 breakpoints（1720 -> 1536 -> 1280 -> 1024 -> 768 -> 640）。这比 PlayStation 的 30 个更窄；Bugatti 针对六个干净 thresholds 调整，而不是对每个 device boundary 做 micro-adjust。品牌假设访客要么使用 high-end laptop、desktop monitor，要么使用 phone，网站不需要在所有中间设备上反复折腾。

### Touch Targets
- Primary pill buttons 的 padding 为 `12px 24px`，text 为 14px；高度约 38-42px。**这略低于 WCAG AAA 44px recommendations**。做 derivative work 时，将 vertical padding 提升到 14-16px，以达到 44px+。
- Secondary buttons 的 `6px 12px` padding 约为 28-32px 高，明确低于 touch-target minimums。只在 desktop pointer contexts 中使用。
- Navigation links 没有 explicit padding；tap area 就是 text box，对 14px 来说过小。Mobile 上添加 `12-14px` vertical padding，让它们可触控。

### Collapsing Strategy
- **Nav**: desktop 显示 `MENU / BUGATTI wordmark / STORE`。Mobile 保持同样 layout；没有 drawer，因为只有三个 items。
- **Grid**: 没有需要 collapse 的 grid。页面在所有 breakpoint 上已经是 single-column。
- **Spacing**: viewport 变窄时，section padding 从 64 -> 48 -> 36 -> 12px 收紧。
- **Type**: viewport 变窄时，Bugatti Display 从 288px -> 200px -> 120px -> 60px -> 48px 缩放。Scale curve 很激进；从 max 到 mobile hero 会损失 240px。
- **Video**: 在 21:9 desktop 和 16:9 或 9:16 mobile hero cuts 之间做 art-direction swap。

### Image & Video Behavior
- Hero video 使用 adaptive bitrate streaming 和 `poster=` fallback。
- Below-the-fold media 使用 `loading="lazy"` 和 `srcset` art direction。
- Bugatti 通过 `imgix` 提供 high-density imagery；你会看到带 transformation parameters 的 `bugatti.imgix.net` URLs。

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary Canvas**: "Velvet Black (`#000000`)"
- **Primary Text**: "Showroom White (`#ffffff`)"
- **Secondary Text / Disabled / Hairline Border**: "Silver Mist (`#999999`)"
- **Accent**: None. Do not add one.
- **Hover Signal**: Opacity shift or border-color shift — no color change

### Example Component Prompts
1. *"Create a monumental hero headline using Bugatti Display at 288px, ALL CAPS, `#ffffff` text on a pure `#000000` canvas, line-height 1.0, no letter-spacing. Place a full-bleed 21:9 hero video behind it with a `rgba(0, 0, 0, 0.4) -> transparent` bottom-up vignette for legibility."*
2. *"Design a primary pill CTA button: transparent background, 1px solid `#ffffff` border, `9999px` border radius, 12px x 24px padding, Bugatti Monospace 14px / 400 / 1.4px letter-spacing UPPERCASE label in `#ffffff`. Hover state fills the background white with black text, 250ms ease."*
3. *"Build a navigation bar: pure `#000000` background, `MENU` link left, centered `BUGATTI` wordmark (128x29px), `STORE` link right. All links in Bugatti Monospace 14px UPPERCASE with 1.4px letter-spacing in `#ffffff`. No dividers, no hover color — just a slight opacity dim on hover."*
4. *"Create a mid-feature section heading: Bugatti Display 60px ALL CAPS in `#ffffff`, line-height 1.0, centered over a full-bleed photograph. Place a single primary pill CTA 48-64px below the headline."*
5. *"Design a secondary utility button for a cookie dialog: transparent background, 1px solid `#999999` border, 6px border radius, 6px x 12px padding, Bugatti Monospace 12px / 400 / 1.2px tracking UPPERCASE label in `#ffffff`."*

### Iteration Guide
使用此 design system 优化已有生成 screens 时：
1. **Audit the canvas.** 如果 background 不是纯 `#000000`，改掉它。Bugatti 不容忍 off-black。
2. **Audit the palette.** 任何不是 `#000000`、`#ffffff` 或 `#999999` 的颜色都是 drift。移除它；这包括所有 accent colors，也包括 `#0070cc` Tailwind blue 这类常见默认值。
3. **Audit display scale.** 如果页面上最大的 headline 小于 60px，就是 under-scaled。Bugatti 的 minimum "monumental moment" 是 60px；maximum 是 288px。目标应落在上半区间。
4. **Audit mono-caps discipline.** 每个 button、每个 nav link、每个 caption、每个 CTA 都应使用带 1.2-1.4px letter-spacing 的 Bugatti Monospace UPPERCASE。如果在 button 上看到 sentence case 或 mixed case，那就是 drift。
5. **Audit shadows and gradients.** 移除每个 `box-shadow`。移除所有 gradient，只保留 video 上方用于可读性的那一个 vignette。Bugatti 的 chrome 是沉默的。
6. **Audit radius.** 每个 container 都应落在 `0`、`6px` 或 `9999px`。如果看到 `12px`、`16px`、`20px`、`24px`，改成最近的 Bugatti value（几乎总是 `6px` 或 `9999px`）。
7. **Audit type weight.** 所有 weights 都应为 400。如果任何地方出现 `bold` 或 `700`，改掉。层级靠 scale，不靠 weight。
8. **Audit whitespace.** 如果 section 显得拥挤，增加 48-64px。如果它显得通透，就保留；Bugatti 的 negative space 是 feature。
9. **Audit product presence.** 每个 hero section 都应该有 vehicle：video 或 photograph，作为 primary visual。Chrome 应该像是在框住车，而不是与它竞争。
