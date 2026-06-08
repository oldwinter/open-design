# Design System Inspired by BMW M

> Category: Automotive
> Motorsport performance sub-brand。近黑 cockpit surfaces、BMW M tricolor accents、锐利工程几何。

## 1. Visual Theme & Atmosphere
BMW M 已分析的 editorial 与 marketing pages 依赖近乎纯黑的 canvas（`{colors.canvas}` - #000），承载白色 BMW Type Next Latin headline，并以**自信的 UPPERCASE** 呈现。这个系统自身没有装饰性电压；品牌能量来自 **full-bleed automotive photography**，例如高速过弯的车辆、carbon-fiber 轮圈细节、驾驶舱镜头、motorsport pit lanes。这些图片作为 edge-to-edge 内容填满整个 band。Photography 周围的 UI chrome 保持极简：细 sans-serif 文案、1px hairline divider（`{colors.hairline}`），以及 hover 前无填充的 all-caps button labels。

**M tricolor stripe**，即 `{colors.m-blue-light}` (#0066b1) -> `{colors.m-blue-dark}` (#1c69d4) -> `{colors.m-red}` (#e22718)，作为品牌 signature accent 克制出现，用于 M wordmark、motorsport chrome、vehicle-tech callouts 和 model badges。它绝不是 CTA color，也绝不用作 background fill。Tricolor 只作为 brand-identity marker。

Type voice 应与更广义的 BMW family system 对齐：BMW Type Next Latin Light 承载大型 editorial display voice，BMW Type Next Latin regular 承载 body 和 UI text。BMW M 可以在 buttons、labels、cards 和 emphasis 上使用更重的 uppercase weights，但 agent 不应在没有具体页面证据时，把 700/300 split 当成 BMW M 的通用规则。

**Key Characteristics:**
- 已分析的 editorial 与 marketing pages 使用近纯黑 canvas（`{colors.canvas}` - #000）配白色字体。Configurator、account、checkout 和 order-management flows 尚未解析，可能引入 light surfaces。
- 遵循 BMW family system 时，Display headlines 使用 UPPERCASE BMW Type Next Latin Light。更重 uppercase 设置仅保留给 labels、buttons、card titles 和已观察到的 M-specific emphasis。
- M tricolor（`{colors.m-blue-light}` / `{colors.m-blue-dark}` / `{colors.m-red}`）用于 4px brand-stripe dividers、M-wordmark accents 和 motorsport chrome，绝不用作 buttons 或 fills。
- Photography 填满整个 band，edge-to-edge 展开。车辆始终是视觉主体；UI chrome 后退为叠在图片上的小型白色 labels。
- Buttons 扁平、0px 圆角，并使用 uppercase letterspaced labels。“Industrial precision” 矩形轮廓就是这个品牌。
- Border radius 在系统中大多为零。少数例外是 carousel arrows 等 circular icon buttons，以及任何已确认的小型 toggle pills。
- Spacing 宽裕且 grid-aligned：主要 bands 之间使用 `{spacing.section}` (96px)；hero photo bands 内部使用 `{spacing.xxl}` (64px)；content cards 内部使用 `{spacing.xl}` (40px)。

## 2. Color Palette & Roles
### Brand & Accent
- **Primary** (#ffffff): `{colors.primary}`。系统的 primary type 与 CTA color。用于 h1/h2/h3 display、dark 上的 body text，以及 primary button labels（按钮自身是 transparent 或 canvas-colored，white text + outline 才是按钮）。
- **M Blue Light** (#0066b1): `{colors.m-blue-light}`。M tricolor stripe 的第一段。用于 M-badge accents 和 motorsport chrome。
- **M Blue Dark** (#1c69d4): `{colors.m-blue-dark}`。中间段，也是 BMW heritage blue value，被复用为 M stripe 的中间 band。
- **M Red** (#e22718): `{colors.m-red}`。第三段。Signature M-power red，用于 stripe 和 motorsport-pace callouts。
- **Electric Blue** (#0653b6): `{colors.electric-blue}`。用于 M xDrive electric model pages 的独立 electric-vehicle accent。它与 heritage blue 不同，感觉更冷、更数字化。

### Surface
- **Canvas** (#000000): `{colors.canvas}`。已分析 editorial 与 marketing surfaces 的默认 page floor。True black。
- **Surface Soft** (#0d0d0d): `{colors.surface-soft}`。几乎与黑色无差别，用于 spec table cells 和 footer-adjacent strips。
- **Surface Card** (#1a1a1a): `{colors.surface-card}`。Cards、secondary buttons、icon-button backgrounds。
- **Surface Elevated** (#262626): `{colors.surface-elevated}`。更亮一档，用于 dark bands 内的 nested cards。
- **Carbon Gray** (#2b2b2b): `{colors.carbon-gray}`。Carbon-fiber-inspired surface tone，用于 technical-spec cards。

### Hairlines & Borders
- **Hairline** (#3c3c3c): `{colors.hairline}`。Dark surfaces 上的 1px divider tone。用于 body sections 之间、table rows 之间、card outlines 周围。
- **Hairline Strong** (#262626): `{colors.hairline-strong}`。与 `{colors.surface-elevated}` 相同 hex；borders 感觉像 one-step elevations，而不是墨线。

### Text
- **Ink / On Dark** (#ffffff): `{colors.on-dark}`。Dark canvas 上所有 headline 和 primary text。
- **Body** (#bbbbbb): `{colors.body}`。默认 running-text color，比纯白稍冷。用于 body paragraphs 和 secondary metadata。
- **Body Strong** (#e6e6e6): `{colors.body-strong}`。Emphasized body / lead paragraph。
- **Muted** (#7e7e7e): `{colors.muted}`。Footer links、breadcrumbs、captions。

### Semantic
- **Warning** (#f4b400): `{colors.warning}`。极少用于 technical-warning callouts。
- **Success** (#0fa336): `{colors.success}`。Order-confirmation states，marketing surfaces 中很少出现。

## 3. Typography Rules
### Font Family
**BMW Type Next Latin** 是 BMW 授权的 display + body typeface。Fallback guidance 与现有 BMW design system 对齐：可用时 display 使用 `BMWTypeNextLatin Light`，body/UI 使用 `BMWTypeNextLatin`，再回退到 `Helvetica, Arial, Hiragino Kaku Gothic ProN, Hiragino Sans, Meiryo, sans-serif`。

已观察到的 BMW M 示例可以让 uppercase labels、buttons 和 card titles 呈现更重的 motorsport “stamped” voice，但 family baseline 仍是：
- Display：大型 h1/h2 editorial headlines 使用 Light (300)，除非捕获到的 M 页面明确使用更重的 static cut
- Body/UI：paragraphs、descriptive copy 和 persistent navigation 使用 regular (400)
- Emphasis：buttons、category labels 和 card titles 使用 700；只有在明确观察到 navigation emphasis 时才使用 900

重要模式是对比和克制，而不是硬性的 700/300 split。避免 medium-weight mush：大型 display 使用 Light，阅读文本使用 regular，更重字重只用于短 UI labels 或 M-specific emphasis。

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 80px | 300 Light | 1.0 | 0 | Hero h1 ("THE ULTIMATE", "MORE BMW M.") |
| `{typography.display-lg}` | 56px | 300 Light | 1.05 | 0 | Section heads ("MORE FROM BMW M MAGAZINE.") |
| `{typography.display-md}` | 40px | 300 Light / 400 | 1.1 | 0 | Sub-section heads, model names |
| `{typography.display-sm}` | 32px | 400 | 1.15 | 0 | CTA-band heads, category page titles |
| `{typography.title-lg}` | 24px | 700 | 1.3 | 0 | Card titles in 3-up grids |
| `{typography.title-md}` | 20px | 400 | 1.4 | 0 | Card sub-titles, lead paragraphs |
| `{typography.title-sm}` | 18px | 400 | 1.4 | 0 | Spec callouts, intro paragraphs |
| `{typography.label-uppercase}` | 14px | 700 | 1.3 | 1.5px | Category tabs, "VIEW MORE" inline labels |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default body - BMW Type Next Latin regular |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0 | Footer body, cookie consent, fine print |
| `{typography.caption}` | 12px | 400 | 1.4 | 0.5px | Photo captions, image-credit lines |
| `{typography.button}` | 14px | 700 | 1.0 | 1.5px | All button labels - uppercase, letterspaced |
| `{typography.nav-link}` | 14px | 400 | 1.4 | 0.5px | Top-nav menu items |

### Principles
系统用轻盈、建筑感的 display type 对比清晰 regular body text，然后只在短 labels 和 action chrome 上使用更重字重。Letter-spacing 不是可有可无：button labels 和 category labels 带 1.5px tracking，让它们感觉像 “machined” 而不是 “typed”。Display headlines 保持 0 letter-spacing，BMW Type 的自然 cap-height 会处理大字号 spacing。

UPPERCASE display 是 h1/h2 的默认声音；sentence case 出现在 body 和 intro paragraphs 中，但很少出现在 headlines 中。All-caps 处理是 brand-voice signal，不是单纯风格选择。

### Note on Font Substitutes
如果 BMW Type Next Latin 不可用，**Inter** (variable) 的 300/400/700 是最接近的开源替代。除非所选 fallback 在大字号时显得松散，否则 display tracking 保持 0。若想要稍微更压缩的感觉，**Saira Condensed** 可作为短 motorsport labels 的替代。

## 4. Component Stylings
### Top Navigation

**`top-nav`** - 固定在每页顶部的黑色 nav bar。高度 64px，背景 `{colors.canvas}`。左侧承载 BMW M logo（M tricolor + BMW roundel + "M" wordmark）、primary horizontal menu（Models、Topics、Magazine、Configurator、Fastlane），右侧 cluster 包含 language selector、search icon、account icon。Menu items 使用 `{typography.nav-link}` 和 sentence-case labels。

### Buttons

**`button-primary`** - Signature primary CTA。背景 `{colors.canvas}`（或在 photography 上 transparent），文字 `{colors.on-dark}`（white），1px white border outline，0px radius，padding 16px x 32px，高 48px。Type 为 `{typography.button}`，uppercase 14px / 700 / 1.5px tracking。矩形轮廓和 uppercase letterspaced label 就是 brand button。

**`button-primary-outline`** - 与 primary 形状相同，但只有 transparent background 和 white outline。用于 photography 上，因为 filled button 会与图像冲突。

**`button-on-light`** - 未解析 light-surface contexts（如 configurator、account、checkout 或 order dialogs）的 tentative pattern。背景 `{colors.canvas}`，文字 `{colors.on-dark}`，即黑色按钮配白字，从 dark-canvas default 反转而来。将其视为 canonical 之前，需要针对具体 flow 确认。

**`button-icon`** - Circular icon buttons（carousel controls、share、favorite）。48 x 48px，背景 `{colors.surface-card}`，白色 icon 居中，full-circle radius。系统中唯一的非矩形按钮形状。

**`carousel-arrow`** - Photo carousels 中使用的特定 48 x 48 circular arrow。形状与 `button-icon` 相同，使用 chevron glyph。

**`text-link`** - Inline uppercase letterspaced links（"VIEW ALL MODELS", "READ MORE"）。`{typography.label-uppercase}`，dark 上白色，无 underline。大多数 link label 旁出现 chevron arrow -> glyph。

### Cards & Containers

**`hero-photo-band`** - Full-width 黑色 band，full-bleed automotive photography 填满大部分 frame。h1 使用 `{typography.display-xl}` 并左对齐叠在照片上，下方常有 `{typography.body-md}` 的小 subtitle。Vertical padding `{spacing.xxl}` (64px)。没有 card frame，photo 本身就是 band。

**`feature-photo-card`** - 用于 “MORE FROM BMW M MAGAZINE” 等 editorial sections 的 3-up grids。背景 `{colors.surface-card}`，0px radius，内部 padding `{spacing.lg}` (24px)。卡片上半部分是 16:9 photo（在 card 内 full-bleed）；照片下方是 `{typography.label-uppercase}` category tag、`{typography.title-lg}` title 和短 body description。

**`model-card`** - 用于 “MORE NEW M MODELS” 3-up grid。背景 `{colors.canvas}`（无 card surface，只是在黑色上放照片），0px radius。顶部是 model 的 16:10 hero shot。下方是 `{typography.display-md}` model name、`{typography.body-sm}` short specs line，以及 `text-link`（"EXPLORE THIS MODEL"）。

**`magazine-article-card`** - Magazine overview page 上更偏文本的 card variant。背景 `{colors.canvas}`，带 hairline border，0px radius。顶部有小 thumbnail、`{typography.label-uppercase}` category label、`{typography.title-lg}` headline 和 body excerpt。

**`spec-cell`** - Model-detail pages 中的 technical specification cells（engine specs、weight、top speed、0-100 time）。背景 `{colors.surface-soft}` (#0d0d0d)，0px radius，padding `{spacing.lg}` (24px)。每个 cell 顶部放 `{typography.display-sm}` value，下方放 `{typography.label-uppercase}` label。

**`motorsport-photo-card`** - Racing-team / motorsport sections 中使用的 edge-to-edge photo cards。没有 card surface，只是 full-bleed photograph，左下角叠一个白色小 overlay caption。Photography 就是这里的品牌。

**`chatbot-launcher`** - Homepage 上右侧的 card-style entry point（"BMW M CHATBOT"）。背景 `{colors.surface-card}`，0px radius，padding `{spacing.lg}` (24px)。包含 h3 title、短 prompt 和用于 launch 的 `button-primary`。

**`category-tab`** + **`category-tab-active`** - Magazine 和 topics pages 上使用的 category selector tabs（例如 "ALL . MAGAZINE . MODELS . LIFESTYLE . MOTORSPORT"）。Tabs 以 `{typography.label-uppercase}` 渲染为 text-only labels。Active state 将 text color 从 `{colors.body}` 变为 `{colors.on-dark}`，并在 label 下方加 2px white underline。无 background fill，无 rounded corners。

### Inputs & Forms

**`text-input`** - Dark surfaces 上的标准 text input。背景 `{colors.surface-card}`，文字 `{colors.on-dark}`，type `{typography.body-md}`，0px radius，padding 12px x 16px，高 48px。1px hairline border。Focus state 将 border 加粗为 white。

**`cookie-consent-card`** - Homepage 上可见的右侧 cookie-banner card。背景 `{colors.canvas}`，带 1px hairline，0px radius，padding `{spacing.lg}` (24px)。Body text 使用 `{typography.body-sm}`。底部堆叠两个 buttons：primary outline + text-link。

### Signature Components

**`m-stripe-divider`** - 承载 M tricolor（`{colors.m-blue-light}` -> `{colors.m-blue-dark}` -> `{colors.m-red}`）的 4px horizontal stripe。用于 motorsport chrome 上的 divider、brand-identity sections 之间，以及 category tabs 的 hover-state indicator。它是系统中最有辨识度的非排版元素。

**`cta-band-photo`** - Pre-footer 的 “Drive an M” CTA band，承载一张汽车在赛道过弯的 full-bleed photography，中间有 `{typography.display-md}` headline，下方放 `button-primary-outline`。Vertical padding 80px。CTA 不是靠 chrome，而是通过 full-bleed photography 继承页面其余部分的 editorial gravity。

### Footer

**`footer`** - 已分析 marketing pages 中观察到的黑色 footer。背景 `{colors.canvas}`，文字 `{colors.body}`。Desktop 下有 4-column link list，覆盖 BMW M Models / BMW M Lifestyle / Owners / Company。Vertical padding 64px。底部 row 承载 `{typography.caption}` 的 BMW corporate disclaimer 和 language selector。将 black footer 行为视为 editorial/marketing pages 已确认，不要扩展到尚未解析的 account 或 checkout flows。

## 5. Layout Principles
### Spacing System
- **Base unit:** 4px。
- **Tokens:** `{spacing.xxs}` 4px . `{spacing.xs}` 8px . `{spacing.sm}` 12px . `{spacing.md}` 16px . `{spacing.lg}` 24px . `{spacing.xl}` 40px . `{spacing.xxl}` 64px . `{spacing.section}` 96px。
- **Section padding (vertical):** 主要 editorial bands 之间使用 `{spacing.section}` (96px)。
- **Hero photo bands:** Hero h1 + sub-headline pair 周围使用 `{spacing.xxl}` (64px) 内部 vertical padding。
- **Card internal padding:** Content 和 model cards 使用 `{spacing.lg}` (24px)；spec-cell tables 使用 `{spacing.xl}` (40px)。
- **Gutters:** 3-up grids 中 cards 之间使用 `{spacing.lg}` (24px)；footer columns 内部使用 `{spacing.md}` (16px)。

### Grid & Container
- **Max content width:** Marketing pages 上约 1440px 居中，比典型 SaaS 更宽，让 photography 有呼吸空间。
- **Editorial body:** 单一 12-column grid；photo bands full-bleed（无 max-width）。
- **Card grids:** Desktop 3-up，tablet 2-up，mobile 1-up。
- **Footer:** Desktop 为 4-column link list，tablet 2-up，mobile 1-up。

### Whitespace Philosophy
BMW M 信任 photography 来完成视觉工作。Photography 周围的 whitespace 很克制：车辆填满画面，copy 位于下方或旁侧并紧密对齐。Whitespace 出现的地方（body sections 之间、CTAs 周围）始终统一为 `{spacing.section}` (96px)。系统应避免装饰性 atmospheric backdrops 和 ornamental gradients；当 photo crop 会导致 white text 对比失败时，允许使用功能性 contrast scrims。

## 6. Depth & Elevation
| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body sections, top nav, footer, photo bands |
| Soft hairline | 1px `{colors.hairline}` border | Section dividers, card outlines, table rows |
| Card surface | `{colors.surface-card}` background over canvas, no shadow | Feature photo cards, magazine cards, chatbot launcher |
| Photographic depth | Full-bleed photography with edge-to-edge crop | Hero bands, motorsport features, depth via subject matter rather than chrome |

系统不使用 drop shadows，也不使用 layered chrome。Depth 完全来自 photography（subject + lens + lighting），以及 black canvas 与略微 elevated 的 `{colors.surface-card}` 之间的对比。

### Decorative Depth
- **M Stripe Divider** (`m-stripe-divider`): 4px-tall horizontal divider，承载 M tricolor（`{colors.m-blue-light}` -> `{colors.m-blue-dark}` -> `{colors.m-red}`）。用于 motorsport chrome、model-detail headers 和 brand-identity moments。Stripe 是系统唯一真正的“decorative”元素，只能克制使用来标记重要性。
- **Carbon-fiber surfaces**: Technical-spec page 使用 `{colors.carbon-gray}` (#2b2b2b) cells，并带细微 texture overlay。这是单页处理，不是系统级 pattern。
- **Photographic depth**: Full-bleed cars 就是 depth。Photography 中的 lighting（track lights、sunset rim-light）承担 SaaS system 中 drop shadows 会承担的 elevation 工作。

## 7. Do's and Don'ts
### Do
- 每一页都用 full-bleed automotive photography 锚定。Cars 是品牌电压，chrome 要后退。
- 使用 `{typography.display-xl}` 或 `{typography.display-lg}` 的 UPPERCASE display headlines。Sentence-case display 会显得 off-brand。
- 保持 typography disciplined：Light display、regular body text；更重字重只用于短 labels、buttons、card titles 或已观察到的 M-specific emphasis。
- 将 M tricolor stripe 保留给 brand-identity moments，例如 wordmark accents、motorsport chrome、model badges。绝不用作 button fill 或 surface。
- 默认使用 0px radius。Full-circle geometry 只保留给 circular icon buttons。
- All-caps labels 使用 1.5px letter-spacing。“Machined” 手感不可协商。
- 主要 editorial bands 之间使用 `{spacing.section}` (96px)，形成 grid-aligned vertical rhythm。

### Don't
- 不要引入 M tricolor（`{colors.m-blue-light}` / `{colors.m-blue-dark}` / `{colors.m-red}`）和已记录 electric-blue accent 之外的 brand color。
- 如果 readability 受损，不要强行让 body type 使用 Light。Body 通常应保持 regular 400；Light 留给大型 display 和 secondary editorial moments。
- 不要使用 rounded buttons。矩形轮廓就是品牌。Rounded corners 会读成 consumer-tech，而不是 motorsport。
- 不要在 hero type 背后放装饰性 gradient backdrops。如果 crop 让文本对比失败，添加功能性 black scrim、重新定位 crop，或把文本移进 solid black panel。
- 不要连续两个 bands 重复同一种 surface mode。节奏应为：photo band -> spec table -> photo band -> magazine grid -> photo band。连续两个 text-only bands 会读成 corporate site。
- 不要把 M stripe 用作 button fill。Stripe 是 divider / accent，绝不是 action surface。
- Button labels 上的 bold uppercase tracking 不要低于 1.5px，spacing 正是让它们感觉 “machined” 的原因。

## 8. Responsive Behavior
### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Hamburger nav; hero h1 scales 80->48px; demo grid 1-up; photo cards stack full-width; footer 4 cols -> 1 |
| Tablet | 768-1024px | Top nav stays horizontal but tightens; 2-up card grids; spec tables 2-up |
| Desktop | 1024-1440px | Full top-nav; 3-up card grids; spec tables 4-up |
| Wide | > 1440px | Same as desktop with more breathing room; max content 1440px |

### Touch Targets
- `button-primary` 尽可能渲染为最小 48 x 48px；pointer target 绝不要低于 44 x 44px。
- `button-icon` 和 `carousel-arrow` 精确为 48 x 48px，舒服地高于 44 x 44px minimum。
- `text-input` 高度为 48px。
- Category tabs 渲染为 text-only labels，至少有 12px vertical padding 和足够 horizontal spacing，以形成 44px minimum effective tap area。

### Text Over Photography & Focus
- Photography 上的 white body text 必须至少达到 4.5:1 contrast；大型 display text 和 icon strokes 至少达到 3:1。
- 第一选择是 crop discipline：把文本放在 dark track、shadow、cockpit 或 black bodywork regions 上。避免把文本放在 sky、headlights、white paint、concrete 或 reflective highlights 上。
- 如果 crop discipline 不够，在 text area 背后使用功能性 black scrim（`rgba(0,0,0,0.45)` 到 `rgba(0,0,0,0.70)`）。Left-to-right scrim 只可作为 accessibility layer，不可作为 decoration。
- 如果 scrim 仍然无法满足 contrast，把 copy 移入 solid `{colors.canvas}` panel，padding 最少 24px。
- 在黑色或 photo backgrounds 上，focus visibility 必须使用 2px white outline 加 2px offset ring，ring 色为 `{colors.electric-blue}`。在尚未解析的 light surfaces 上，反转为 2px `{colors.electric-blue}` outline，并带 visible offset。

### Collapsing Strategy
- Top nav 在 < 768px 折叠为 hamburger sheet；menu 打开为 full-screen black overlay，顶部带 M tricolor stripe。
- Photography 在所有 breakpoint 都保持 full-bleed，绝不折叠到带 margin 的 container。
- Card grids 通过减少 columns 来适配，而不是缩小 cards；photography 保持原生 aspect ratio。
- Spec tables 从 4-up 折叠到 2-up 再到 1-up；无论 column count 如何，spec values 都保持 `{typography.display-sm}`。
- M-stripe divider 在所有 breakpoint 上都保持 4px height。

### Image Behavior
- Hero photography 响应式裁切，desktop 使用更宽 crop，mobile 使用 vertical crop。
- Lifestyle 和 motorsport photos 保持原生 aspect ratios；系统绝不 letterbox 或 pillarbox。
- M wordmark + tricolor logo 随 viewport width 等比缩放。

## 9. Agent Prompt Guide
1. 一次聚焦 ONE component。引用组件名（`hero-photo-band`、`spec-cell`）。
2. New components 默认 0px radius。Full-circle geometry 只用于 circular icon buttons。
3. Variants（`-active`、`-disabled`）作为独立 prose entries 放在 component name 旁边。
4. 到处使用 `{token.refs}`，绝不要 inline hex。
5. 绝不要记录 hover states。只记录 Default 和 Active/Pressed。
6. Display headlines 默认保持 UPPERCASE、light/architectural；body 保持 sentence-case regular。700 只用于短 emphasis 和 UI labels。
7. M tricolor 只用于 brand-identity，绝不要扩展到 “primary action” system tokens。
8. White-on-photo text 每次都需要 contrast strategy：先 crop，再 scrim，需要时用 solid panel。
9. 拿不准 emphasis 时：先放大 photography，再放大 type。

### Known Gaps
- Dembrandt frequency analyzer 捕获到 white text（count 955）作为最高频 token。Black canvas 是从 screenshot 推断的，dembrandt 的 body-background sampling 没有把它作为 top palette entry 暴露出来，但页面明确是 black-on-white-text。
- 精确 M tricolor stops 来自公开 BMW brand guidelines；screenshots 显示 stripe 是小元素，但在这个 resolution 下 pixel-sampling 不能可靠区分 #0066b1 与 #1c69d4。基于 BMW Design Works 发布的 brand spec，将已记录 stops 视为 canonical。
- BMW Type Next Latin weight evidence 不完整。更广义的 BMW design system 记录了 Light (300) display 和 regular (400) body/UI；BMW M-specific 的更重 label 用法应视为 observed emphasis，而不是替代 BMW family typography 的全局规则。
- Animation 和 transition timings（photo carousel transitions、hover-reveal effects、configurator interactions）不在 scope 内。
- `text-input` defaults 之外的 form validation states 未提取，error / success input variants 需要 configurator 或 order flow 来确认。
- Configurator surface（带 color / wheel / interior pickers 的 vehicle build pages）不在已分析 URL set 中，因此其 swatch grid、comparison panels 和 price-summary card 未在此记录。
- Cookie consent overlay 遮挡了捕获 screenshot 中 homepage hero 的一部分；secondary hero treatments（不同 car models 轮播进入 hero band）可能有未捕获的变体。
