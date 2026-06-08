# Anti-patterns — 命名化的破绽

`hallmark audit` verb 会按名称标记这些问题。每一项都是 AI-generated UI 的典型签名。看到一个就是问题；同一视图里看到两个，就是确认。

每个条目包含：破绽本身、为什么会读起来像 AI-generated，以及修复方式。

---

## Critical（发布即 slop）

### The purple-gradient hero

Hero section 使用从紫到蓝或紫到粉的背景渐变，通常配白色居中文本。这是最容易被识别的 AI 美学。

**Fix.** 选择一个锚定色。一个 accent。Hero 不要使用渐变背景。如果需要温暖感，给 neutrals 加一点色相。

### Inter-everywhere

Inter（或 Roboto、Open Sans）同时用于 display 和 body，且没有搭配字体。单字体页面就是模板页面。

**Fix.** 把有辨识度的 display face 与精致的 body face 配对。见 [`typography.md`](typography.md)。

### The 3-column feature grid

三个等宽列，每列都是图标在上、两行标题、三行正文。通常全宽展开，间距 24px。每个 LLM 都会产出这种结构。

**Fix.** 打破网格。改变列宽。混合卡片高度。移除一张卡片并使用负空间。把图标移到行内，而不是放在上方。或者彻底去掉卡片，用排版节奏承载内容。

### Card-in-card

带边框的容器里还有卡片。或者：一张卡片包含另一张卡片，里面又有一个小 "micro-card"。没有语义理由的视觉嵌套。

**Fix.** 只保留一层 containment。通常错的是外层。

### The gradient headline

标题使用 `background-clip: text` 并填充线性渐变（通常是紫到粉或蓝到青）。它几乎比任何东西都更快地暴露 "AI generated"。

**Fix.** 使用纯色墨色。如果想让标题有生命力，用字重、italic 或 display face，而不是渐变填充。

### The side-stripe card

卡片一侧有粗彩色边框（通常在左侧，4–6px，紫色或绿色）。非常容易识别，也非常 2018-SaaS-AI。

**Fix.** 使用四周 hairline border，或者没有边框，或者在标题旁放一个小 accent square。不要用不对称的粗条。

### Full-viewport centred hero

`min-height: 100vh`（或 `100dvh`），所有内容居中，一句短文案，一个大 CTA。默认 LLM landing page。

**Fix.** 让 hero 高度由内容决定。偏左或偏右。里面放的不只一句话。

### Pure black, pure white

`#000000` 背景或 `#ffffff` surface。两者都会显得平、合成感重。

**Fix.** 朝你的锚定色轻微染色。见 [`color.md`](color.md)。

### Default-attractor sameness

同一项目里连续两个 Hallmark 输出使用同一种 macrostructure。第一个输出 left-margin numbered labels + huge serif + asymmetric spans（Specimen）；第二个也完全一样。页面看起来像重新设计，只是因为文案变了。

**Why it fails.** Hallmark 的核心就是让两个 brief 对应的两个页面感觉像*不同的网站*，而不是同一模板换色。跨输出重复 macrostructure 是模板化的结构指纹，也正是 Hallmark 要击败的 AI tell。

**Fix.** 写代码前，先在项目 CSS 里寻找 `/* Hallmark · macrostructure: <name> · ... */` stamp。如果存在，你必须选择另一个 macrostructure，并且尽可能选择类别上不同的结构（例如一个 serif-led editorial macrostructure 搭配一个 sans-led grid，而不是两个 editorial 变体）。二十一个命名选项见 [`macrostructures.md`](macrostructures.md)。

### Specimen fall-through

在 brief 没有明确要求 editorial / foundry / specimen 气质时，却产出 Specimen macrostructure（像 `01 — HELLO.` 这样的左侧编号标签 + 巨大的 serif display + asymmetric spans + hairline rules + 纯排版 CTA + 有时还有 hand-drawn SVG accent）。这是 Hallmark 最常重复的输出，也是这个 skill 一度显得只有一种形状的原因。

**Why it fails.** 当 brief 是 editorial 时，Specimen 是漂亮的模式。把它套到 SaaS pricing page、developer tool、e-commerce site 或 personal app 上，就像 AI 默认套模板，因为事实也是如此。

**Fix.** Specimen macrostructure 是 [`macrostructures.md`](macrostructures.md) 中二十一个选项之一，不是默认值。如果 brief 含糊，从该文件前十个里选（Bento Grid、Long Document、Marquee Hero、Stat-Led、Workbench、Conversational FAQ、Manifesto、Photographic、Quote-Led，然后才是 Specimen）。只有当 brief 明确说 "editorial"、"specimen sheet"、"type foundry"，或点名 Specimen theme 时，才使用 Specimen。

### The AI nav

Wordmark 紧贴左侧，4–5 个行内文本链接（`Features · Pricing · Docs · Blog · About`）居中或靠右分组，一个 CTA button 紧贴右侧，全 viewport 宽，滚动时 sticky，白色背景，1px hairline border-bottom。这是最容易识别的 AI nav 指纹。每个 LLM 都会产出它，因为训练数据里每个 SaaS site 都这么发过。

**Why it fails.** 这种形状对类型失明：它落在婚礼摄影师作品集、面包店、B2B SaaS 和 manifesto 上都一模一样。当 nav 无法告诉你正在浏览什么类型的网站，页面就是模板化的。

**Fix.** 从 [`component-cookbook.md`](component-cookbook.md) § Navigation 的 routing table 中选择。Genre 会路由到 N5–N9 之一：Floating pill（modern-minimal / atmospheric）、Newspaper masthead（editorial）、Brutal slab（playful）、Terminal command（CLI）、Edge-aligned minimal（luxury / quiet）。只有当页面确实只有 2 个 destination 且 routing table 允许时，才使用 N1。用一行注释说明理由。

### The AI footer

4 列链接（Product · Company · Resources · Legal），下方一排 social icons，最底部 copyright line，淡淡的 1px top-border，中性灰背景。标准 SaaS footer，在成千上万个页面里一模一样。

**Why it fails.** 与 AI nav 一样，这种形状对类型失明。面包店不会有 "Resources" 列。Editorial page 不会有四个链接的 "Legal"。Footer 应该*收束页面*，而不是给不存在的 sitemap 做目录。

**Fix.** 从 [`component-cookbook.md`](component-cookbook.md) § Footers 的 routing table 中选择。默认用 Ft1 Mast-headed、Ft2 Inline single line、Ft4 Dense colophon、Ft5 Statement、Ft6 Letter close、Ft7 Newsletter-first 或 Ft8 Marquee scroll。只有真正的 hub 或 docs root 且有真实 sitemap 时，才使用 Ft3 Index columns；即便如此，也不要搭配 social-icon row + tiny copyright tail。

### Aurora-blob background

紫到粉到青的流动有机 mesh blobs，叠在 hero text 背后。第一次看像 "premium"，直到你发现它从 2022 年起出现在每张 Dribbble 图上。

**Why it fails.** 这是 2022–2023 generated-design 默认样式。受众几毫秒内就会模式匹配：AI template。

**Fix.** 使用纯色 surface。或者 subtle two-stop CSS gradient + SVG `<feTurbulence>` grain，opacity 小于 0.1。配方见 [`hero-enrichment.md`](hero-enrichment.md) E7。

### Floating-orb decoration

泛用的 ambient 3D 球体或模糊彩色圆形在 hero 背后漂浮，通常被加上去 "for depth"。它们没有语义作用。

**Why it fails.** 泛用 3D 氛围就是新的 corporate-stock-photo。它暗示 "这里需要点什么，所以我就放了点什么"。

**Fix.** 删掉。Hero 不需要 depth；它需要一个强有力的 typographic anchor。

### Sound-on autoplay

Hero video 自动播放且带声音。浏览器反正会阻止它，但意图很重要：一个没有 `muted` 就发出的 video element，就是想冲用户大喊的视频。

**Why it fails.** 对受众有敌意。Accessibility fail。SEO penalty。Browser blocked。

**Fix.** `<video autoplay muted loop playsinline>`，四个属性永远都要有。如果声音真的有用，再单独提供 audio toggle button。

### Lazy-loaded LCP

在 hero image 或 hero video，也就是 LCP element 上使用 `loading="lazy"`。页面会等用户滚到那里才开始下载，但用户已经在看它了，于是页面只会空在那里。

**Why it fails.** 直接拖垮 Largest Contentful Paint。真实数据：lazy-loaded LCP images 的 p75 是 720ms，而 preloaded 是 364ms，慢 2 倍，"poor" experiences 多 4 倍。

**Fix.** 在 LCP element 上使用 `fetchpriority="high"` 和 `preload="metadata"`。只对 below-the-fold media 做 lazy-load。

---

## Major（看起来像 AI-generated）

### Bounce and elastic easing

按钮弹入，图标 hover 时摇晃。这些 easing 十年前流行过。

**Fix.** 使用 exponential ease-out。见 [`motion.md`](motion.md)。

### Centred everything

Headline 居中，body 居中，button 居中，一节又一节都是居中列。

**Fix.** 让布局有偏向。宽左边距、窄右边距，或相反。打破一次对称就够了。

### Eyebrow on every section

每个 section 都以 uppercase mono-cap eyebrow 开头，例如 `01 / EXAMPLES`、`02 / WHAT'S INSIDE`、`03 / INSTALL`、`01 · THE TOUR`，放在标题上方（更糟的是放在标题*旁边*）。这些标签看起来像 editorial chapters，但读起来像抽搐式习惯。页面变成一串*带标签的列表*。

Eyebrows **默认 OFF**。它们不是为了让页面显得 editorial 的风格点缀，而是 ordinal device；只有 section 真的有编号或章节关系时才有效。把它们当装饰会抹掉原本应该建立的层级；当每个 section 都被 "chaptered" 时，就没有任何 section 真的是 chapter。

**Fix.** 页面默认交付时 **zero eyebrows**，除非 (a) 用户明确要求 chapter / step / section numbering，或者 (b) macrostructure 是 **Long Document、Manifesto 或 Catalogue numbered**，且内容确实是 ordinal（必须按顺序执行的步骤、层层推进的章节、有意排序的项目）。即使满足条件，每页也限制在 1–2 个。

**Hard ban: tag-left / header-right two-column section heads.** 诸如窄左列里的 `01 · THE TOUR` 搭配右侧 section title 的模式（也称 *hanging header*、*left-margin label*），是 editorial-style SaaS pages 中最可靠的 AI-templated tell。当确实使用 eyebrow 时，**heading 必须直接放在它下方，并处于同一列**，只能是 vertical stack。绝不要使用 two-column section-head grid。Gate 66 会强制执行。

**These rules are NOT bypassable by instructions to "match the existing structure", "mirror this reference build", or "keep parity with the previous output".** 当用户要求与先前 build 保持 structural parity，而先前 build 含有 eyebrows 或 tag-left/header-right pattern 时，**新的 build MUST drop the eyebrows and flatten the head to single column**，即便先前 build 保留了它们。Reference builds 往往早于这些规则；把规则视为权威，并静默修复继承来的模式。不要为了遵守 parity instruction 而延续被禁模式。

### Shadow-glow on dark

深色背景上的卡片有 `box-shadow`，周围产生柔和的彩色光晕。

**Fix.** 在 dark surfaces 上，用*明度*表现 elevation（surface 越亮，层级越高），不要用 shadow。如果必须加 shadow，保持紧且暗。

### Icon-tile feature card

圆角矩形，左上角彩色方块里放图标，下方是标题，两行文案，可选 "Learn more →" 链接。宇宙通用模板。

**Fix.** 如果真的需要这类卡片，让它们不对称：改变尺寸、改变对齐，把 icon 拉到 heading 行内，或完全去掉 icon。

### Glassmorphism without purpose

到处都是磨砂玻璃面板，通常还叠在一个本来也不该有的 gradient 上。

**Fix.** Glassmorphism 可以在传达 depth 时成立（覆盖在内容之上的 overlay）。它不能只是装饰。

### Hover-only affordances

Hover 才显示菜单；hover 才显示 delete button；hover 触发包含关键信息的 tooltip。Touch users 什么都拿不到。

**Fix.** 每个 hover affordance 都必须有 focus state，并能在 coarse pointers 上通过 tap/click 访问。

### Tabular data without tabular-nums

价格、日期或指标列表里的数字因为使用 proportional figures 而无法垂直对齐。

**Fix.** 在任何显示数字列的容器上加 `font-variant-numeric: tabular-nums;`。

### Animate-on-scroll on everything

每个 section 进入 viewport 时都 fade in。每个列表都 stagger。页面永远安定不下来。

**Fix.** 只选择一个 orchestrated entrance。其余内容就让它们*在那里*。

### Mismatched icon sets

Navbar 用 Material Icons，feature cards 用 Heroicons，footer 用 Lucide，hero badge 里还有一个 emoji "✨"。每个 library 都有自己的 stroke voice；混用就是 icon-set tell。

**Why it fails.** Icons 是 typography。你不会发布一个有三种 body fonts 的页面，也不要发布一个有三种 icon strokes 的页面。

**Fix.** 每个项目只选一个 library。SaaS 默认用 Lucide；需要 weight variants 时用 Phosphor；Tailwind/shadcn projects 用 Heroicons。Canon 见 [`assets.md`](assets.md)。

### AI-illustration look

没有关节 articulation 的 smooth-mesh-blob characters、2010 年代中期 "modern flat" stock poses、带对称默认打光的明显 Midjourney compositions。Hand-drawn SVG humans（那个 "doodle person with one eye larger than the other"）也算在内；corporate-doodle 是 2010 年代末 Slack/Figma marketing template，受众会立刻读成 AI。

**Why it fails.** 几毫秒内就读起来像 AI。2026 年的受众会比任何其他 tell 更快地模式匹配它。

**Fix.** 用 pure CSS 或 SVG 手工构建 illustration（[`hero-enrichment.md`](hero-enrichment.md) 中的 Tier A 或 B）。如果必须生成，使用 Nanobanana 2 或 Recraft V4，提供 reference images、asymmetric crop，并做 grain post-processing，绝不要直接用 raw output。见 [`custom-craft.md`](custom-craft.md) Tier E。

### Invented metrics

Stat-led layout、comparison row 或 proof bar 上出现用户从未提供的数字，例如 "10× faster"、"saves 5 hours per week"、"trusted by 50,000+ teams"、"99.9 % uptime"、"+47 % conversion"。Model 为了填满 stat slot 伸手拿了一个 stat，并且编造了它。

**Why it fails.** 受众识别虚构 stats 的速度，与识别虚构 testimonials 一样快。一个 proof bar 撒谎的页面，在其他 claims 上也无法被信任；AI tell 也毫不含糊：每个编造数字都读作 "this was generated, not written"。

**Fix.** 三个选项，按优先级排序：(1) 用 `—` 替换数字，并加一个灰色标注块（"metric to confirm" 或 "stat pending"）；(2) 向用户询问真实数字并暂停 run；(3) 在没有 proof slot 的情况下重建该 section。没有真实 stats 的 stat-led macrostructure 是错误 macrostructure。数字形状的空洞是诚实；编造数字是 slop。*(Slop-test gate 56.)*

### Generic emoji as feature icon

Feature card、value prop、step number 或 pricing tier 使用 `✨` `🚀` `⚡` `🔥` `🎯` `✅` 作为主 icon。带 `✨` glyph 的 "sparkle hero" badge 放在 eyebrow 旁边。Emoji 替代 icon library，因为 model 没有选择一个。

**Why it fails.** Emoji 也算一种 typography，但它们不是页面 typographic system 的一部分。它们由 OS 渲染，在每台设备上都不同；它们破坏 icon 的 stroke voice（现在你把 Phosphor-style line icon 和 Twemoji blob 混在一起了）；而且这个选择就是可识别的 AI 默认值。Sparkle-emoji-as-AI-shortcut 是 2024–2025 时代的陈词滥调。

**Fix.** 选择单一 icon library 并交付它（[assets.md](assets.md) 列出了 canon）。或者构建 custom SVG mark。或者完全省略 icon，改用 typography 作为主导。多数 feature lists 不需要 icons。*(Slop-test gate 60.)*

### Re-drawn UI chrome

用 fake browser bar（URL pill + traffic-light dots）包住 screenshot。用 fake phone frame（rounded rectangle + notch + speaker slit）包住 mobile mockup。用 fake code-block window（mock title bar + close/minimise dots）包住 `<pre>`。用 fake IDE chrome（file tabs + activity bar）包住 editor screenshot。全部手写在 HTML/CSS 或 SVG 里。

**Why it fails.** 用户已经有 chrome：他们的浏览器、手机、IDE 本身就是 chrome。在页面里重画它，就像把相框照片印进真实相框里。伪造也很差：URL 不对，dots 不是 macOS dots，notch 形状也不对。受众一眼就会把 re-drawn chrome 模式匹配为 "AI invented a UI that already exists"。

**Fix.** 使用真实 screenshot，并放在 `<figure>` 中（最多加 hairline border）。Phone mockups 用 vendor 的 transparent-PNG device frame 或真实产品照片，不要用 CSS 画。Code blocks 使用 system `<pre>` 加 typographic frame（top rule + label + bottom rule），不要假装 window-chrome。页面的职责是展示内容，不是模仿 OS。*(Slop-test gate 57.)*

### Mid-render token improvisation

Run 开头选择了一个 theme，但 artifact 里出现 inline colour values（`#5b6cff`、`oklch(74% 0.18 245)`、`rgb(...)`），或不是来自 token block 的 `font-family` declarations。或者：artifact 带着 theme 的 token set，外加一个塞进 hover state、focus ring 或单条 border 里的额外 hex。Model 选了 theme，然后漂移了。

**Why it fails.** Token discipline 是系统与 freestyle 的区别。一旦 theme 锁定，文件里的每一种颜色和每一种字体都必须引用 named token（`var(--color-accent)`、`font-family: var(--font-display)`）。Inline values 会侵蚀 cohesion；到第三轮 edit pass 时，页面已有八种颜色而不是三种，原本让 theme 成立的 editorial restraint 也消失了。受众看不到 inline value，但能感到松散。

**Fix.** Artifact 中的每一种颜色和每一种字体都必须来自 `var(--token-name)`。如果需要一个 token 中不存在的值，先把它加入 token block（`--color-accent-warm: oklch(...)`），再引用它。Mid-render 的 inline OKLCH 或一次性 hex values 不允许出现。*(Slop-test gate 58. See also [SKILL.md § Locked tokens](../SKILL.md).)*

### Wrap-to-two-lines clickable text

Button label、nav link、footer link、breadcrumb 或 CTA 因为 viewport 变窄、label 太长而换成两行。视觉上，这个 affordance 现在像坏掉了；读者无法判断换行是否有意。最糟糕时，第二行只有一个词（"free"、"more"、"started"），看起来像 styling error。

**Why it fails.** 可点击 affordances 是单行对象。读者扫一眼 label，决定是否点击，然后继续。两行 label 会放慢扫描，打断这一行的 vertical rhythm（button height 增长，sibling buttons 保持原样），并发出 "this page wasn't tested at this width" 的信号。这是 responsive-discipline tell。

**Fix.** 按优先级：(1) 缩短 label，例如 *"Get started free" → "Start free"*；*"Read the documentation" → "Read docs"*。多数 CTA labels 都太长。(2) 在 affordance 上设置 `white-space: nowrap`，让 parent flex container 重排。(3) 在窄宽度下通过 `hidden=until-found` 或 `display: none` 移除非必要 nav item。(4) 到达阈值后把 nav 折叠成 sheet/menu。*Never* let a primary CTA or nav link wrap。*(Slop-test gate 59. See [responsive.md § Clickable text — never wraps](responsive.md).)*

### Lottie shortcut

在 pure CSS 或 hand-built SVG 可以做得更强、更轻时，却伸手拿 LottieFiles community animation，例如 spinning logo、checkmark draw、loading spinner、"loading dots" loop。

**Why it fails.** 2023–2024 年间，Lottie pulls 是 AI-tool shortcut；现在受众会这样解读它。50–500 KB JSON file 加 runtime cost，是对 CSS 零字节就能完成的任务征税。

**Fix.** Custom build。Spinning logo → CSS `@keyframes rotate`。Checkmark → SVG `stroke-dasharray` animated。Loading dots → CSS `@property` + `animation-delay`。Lottie 在 enrichment hierarchy 中是 Tier F，也就是最后手段，只用于真正有关节化的 character motion。

### Three.js for a still object

WebGL hero 里的 3D 没有通过 interactive 证明自己的存在价值。一个静止旋转、用户不能触碰、不能重新定向、不能 customize 的东西，只是因为有人想要 "3D" 而旋转的 model。

**Why it fails.** 100–300 KB 的 Three.js bundle、model、textures、GPU work，全都用在一个本可以是静态照片或 SVG 的东西上。

**Fix.** 如果用户不能操控它，就不值得用 Three.js。使用 still photograph 或 hand-built SVG。

---

## Microinteraction tells

这些是 AI-generated *motion* 的命名化破绽。完整目录和配方见 [`microinteractions.md`](microinteractions.md)。

### `transition-all`

每个属性都在动画，包括本应立即变化的属性（visibility、focus rings）。

**Fix.** 指定具体属性。`transition: background-color var(--dur-short) var(--ease-out), transform 100ms var(--ease-out)`。

### Universal `hover:scale-105`

每张 card hover 时都 lift，没有 shadow change，没有指定 easing，也没有目的。

**Fix.** 每个元素只选一个 signal。1px translate、一次 colour shift 或 underline thickening，绝不要四个全上。

### Bouncy overshoot easings on UI

`cubic-bezier(0.34, 1.56, 0.64, 1)` 之类用在 buttons、modals、tooltips 上。没品位的复古。

**Fix.** 只把 overshoots 留给真正的物理交互（drag-and-drop release）。UI state 使用 `motion.md` 中的 `--ease-out`。

### Animated hover gradients

Background gradient 在 hover 时穿过 colour space 滑动。

**Fix.** 删掉。或者只选择一次 colour shift，并且即时完成。

### Cursor follower dots

一个拖尾 dot 滞后跟随 pointer。

**Fix.** 删掉。

### Auto-rotating carousels with no pause

WCAG 2.2.2 failure。

**Fix.** 只允许手动前进，或支持 pause-on-hover-and-focus，或默认禁用 autoplay。

### Celebratory success toasts

用户刚保存了一个自己能看见已保存的东西，却弹出 "Done!"。

**Fix.** 成功时保持安静。Toasts 只用于失败、效果不可见的 async actions，以及用户之后需要用到的明确确认。

### Confirmation dialogs for reversible actions

删除一行这种可逆操作前弹出 "Are you sure you want to delete this?"。

**Fix.** Optimistic delete + 5–10s Undo toast。Modal 留给不可逆 destructive actions，即便如此也用 type-the-name confirmation，而不是 click-OK。

### Tooltips with the same delay on hover and focus

Hover 和 focus 都延迟 800ms。

**Fix.** Hover delay 800–1000ms。Focus delay 0ms。不同 intent，不同 timing。

### Focus rings that animate in

Ring 用 200ms fade in；keyboard users 在 transition 开始时没有任何 indicator。

**Fix.** Focus rings 必须立即出现。永远如此。元素获得 focus 时，不要 transition `outline` 或 `box-shadow`。

### Toasts that shift layout

新 toast 把内容往下推；dismissed toast 又让内容弹回去。

**Fix.** 固定定位堆叠在 viewport corner。新 toast 到来时，existing toasts 不要移动。

### Universal scroll-triggered fade-up

每个 section 都在 intersection 时 fade in。页面永远安定不下来。

**Fix.** 首次加载时只做一个 orchestrated entrance。之后，内容就在那里。

### Spinners that flash

快速动作完成时，spinner 闪现 50ms。

**Fix.** 要么 delay-show spinner（显示前等待 150ms），要么强制最小可见时长（显示后至少 300ms）。当 layout 已知时，用 skeletons 替代 spinners。

---

## Minor（小品味问题）

### Straight quotes

Rendered text 中出现 `"Hello"` 和 `'word'`。说明没有 proof-read。

**Fix.** Curly quotes：`"Hello"`、`'word'`。

### Double-hyphen dashes

Body copy 中用 `--` 表示本该使用 em-dash 的位置。

**Fix.** `—` (U+2014)。

### Three periods instead of ellipsis

Body copy 中出现 `...`。

**Fix.** `…` (U+2026)。

### Placeholder names

"Jane Doe"、"John Smith"、"Example User"。

**Fix.** 使用反映受众的可信 placeholder names，或从 seeded faker 抽取。例如 "Maya Okonkwo"、"Sam Tan"、"Elena Ruiz"。

### Startup-cliché product names

"Acme"、"Nexus"、"Pulse"、"Unleash"、"Seamless"、"Supercharge"。

**Fix.** 具体命名这个东西。如果是 demo，用 domain-specific placeholder，例如 "Maple Weekly"、"Ridgeline Inventory"，不要用抽象 startup bingo。

### `z-index: 9999`

随意的大 z-values。

**Fix.** 使用六级命名 scale。见 [`layout-and-space.md`](layout-and-space.md)。

### Every section padded the same

每个 section 的 top padding、bottom padding、horizontal padding 全都一样。

**Fix.** 做出变化。收紧一个，放大另一个。

### 100vw widths

任何东西上使用 `width: 100vw`。在 scrollbar-visible desktops 上会破坏布局。

**Fix.** 使用带 container padding 的 `width: 100%`。

---

## `hallmark audit` 应如何报告

对每个 finding：

```
[severity] Tell name — file:line
  why it's a tell (one line)
  → fix (one line)
```

然后：

```
Summary — N critical · M major · K minor
Verdict — [ships as slop | reads as AI-generated | close, fix the minors]
```
