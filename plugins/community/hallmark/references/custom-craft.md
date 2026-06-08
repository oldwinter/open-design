# Custom craft — 如何手工构建 hero artwork

只有当某个 enrichment archetype 需要 construction（[`hero-enrichment.md`](hero-enrichment.md) 中的 Tier A 或 B）时，才加载此文件。它告诉你在*哪个 complexity tier* 应该选择*哪种 technique*，以及做得好的结果应该是什么样。

**原则。** Custom-built artwork 就是 design。Library-picked artwork 是 shortcut，好的受众会一眼看出来。这个 skill 的职责，是让 custom-build 成为阻力最小的路径：知道什么时候 CSS alone 足够、什么时候 SVG 合适、什么时候 JS-driven animation 值得它的 bundle cost，以及什么时候（很少）Three.js 才有正当理由。

2026 canon 由 Lynn Fisher（*A Single Div*）、Diana Smith（*Pure CSS Francine* / *Lace*）、Rauno Freiberg、Paco Coursey、Jhey Tompkins 和 Adam Argyle 共同设定。共同线索是：constraint-driven、hand-crafted、performance-respecting、accessibility-embedded。使用 platform；不要和它对抗。

---

## Tier A · Pure CSS art

**何时使用。** Geometric forms、gradient compositions、glyph-style decoration。Bars、dots、badges、icons、simple loaves、sliced spheres、abstract logos。任何本质上是 *shapes plus colour* 的东西。

**投入:** high（掌握 `clip-path` + `conic-gradient` 需要练习）。
**收益:** very high（zero bytes、browser-native、infinitely scalable）。
**Bundle 成本:** zero。

### The CSS-art toolkit (2026)

| Feature | Use for | Browser support |
| --- | --- | --- |
| `clip-path: polygon(…)` | Multi-sided shapes（chevrons、hexagons、custom blobs） | 96 %+ |
| `clip-path: path("M …")` | 来自 SVG path 的 curved hand-drawn outlines | 88 %+（使用 feature query 做 fallback） |
| `conic-gradient()` | Pie segments、radial dividers、mandalas、rotating colour wheels | 96 %+ |
| `radial-gradient()` | Spheres、glow points、sun-burst centres | 100 % |
| `linear-gradient()` (multi-stop) | 通过 stacked stops 构成 composite shapes | 100 % |
| `mask-image: url(…)` | Layered transparency、morphing shapes、text-clip effects | 95 %+ |
| `mix-blend-mode` | Compositional depth（multiply、overlay、screen） | 95 %+ |
| `filter` (drop-shadow, blur, hue-rotate) | Irregular shapes 上的 soft shadows（使用 alpha channel） | 100 % |
| `@property` | Smoothly-interpolated custom properties（colour、length、angle） | 88 %+ |
| `animation-timeline: scroll() / view()` | Declarative scroll-linked motion，hardware-composited | Baseline 2025 (88 %) |

### Worked example — 单个 div 做 bakery loaf

```html
<div class="loaf" aria-label="A loaf of bread"></div>
```

```css
@property --rise {
  syntax: "<length>";
  initial-value: 0px;
  inherits: false;
}

.loaf {
  width: 12rem;
  height: 7rem;
  background:
    /* crust ridges */
    radial-gradient(ellipse at 30% 70%, transparent 1.2rem, var(--color-ink-2) 1.21rem 1.3rem, transparent 1.31rem),
    radial-gradient(ellipse at 50% 70%, transparent 1.2rem, var(--color-ink-2) 1.21rem 1.3rem, transparent 1.31rem),
    radial-gradient(ellipse at 70% 70%, transparent 1.2rem, var(--color-ink-2) 1.21rem 1.3rem, transparent 1.31rem),
    /* loaf body */
    linear-gradient(180deg, oklch(78% 0.12 60), oklch(64% 0.16 50));
  border-radius: 50% 50% 14% 14% / 70% 70% 30% 30%;
  transform: translateY(var(--rise));
  animation: rise 6s ease-in-out infinite alternate;
  box-shadow: 0 1.2rem 1.5rem -0.8rem oklch(20% 0.02 60 / 0.18);
}

@keyframes rise {
  to { --rise: -4px; }   /* the breath: 4px over 6s, the loaf is alive */
}

@media (prefers-reduced-motion: reduce) {
  .loaf { animation: none; --rise: 0px; }
}
```

这就是一个 hand-built bakery centerpiece：约 25 行、无 asset、带 animation、accessible。Hallmark 下次遇到 bakery brief 时，会得到一个*不同*的 loaf，因为 variation knobs 会变化（rise distance、loaf curvature、crust-ridge spacing、colour stop）。

### CSS art 的 anti-patterns

- **Recalculating `clip-path` on every scroll.** 会拖垮 framerate。改为动画化 `transform`，或使用 `animation-timeline`（off-thread composite）。
- **Over-nested wrapper divs.** Pure-CSS illustration 应该控制在一到三个元素。八层 nested wrappers 读起来像 "I gave up structuring this"。
- **No reduced-motion fallback.** 每个 animation 都必须有 `@media (prefers-reduced-motion: reduce)` block。
- **Random gradient noise.** 如果 gradient 看起来像 generated 而不是 designed，重做。任何单个 gradient layer 最多三个 stops。

---

## Tier B · Hand-built SVG illustration

**何时使用。** CSS 无法干净表达的复杂 illustrations：characters、articulated figures、organic curves、multi-element scenes。Bakery 的完整 storefront、studio mascot、带七条 labelled paths 的 workflow diagram。

**投入:** medium（在 Figma 设计 + 清理 export）。
**收益:** very high（无限缩放、压缩到 < 10 KB、可动画）。
**Bundle 成本:** SVG 的文件体积，inline 通常 4–15 KB。

### 流程

1. **Design in Figma.** 使用 component system（constraints、variants）。保持 paths 为 paths，不要 rasterise。命名 layers；export 会保留它们。
2. **Export as SVG.** Figma 的 export 足够可用。只有当需要 stroke-as-fill animation 时才设置 "Outline strokes"，否则保留 strokes。
3. **Run through [SVGOMG](https://jakearchibald.github.io/svgomg/)**，移除 Figma metadata、不必要的 `<defs>`、冗余 transforms。通常能减少 30–60% 体积。
4. **Inline the result in HTML** 以便 animation；或者保存为 `static.svg`，通过 `<img>` 或 CSS `background-image` 引用以便 caching。
5. **Animate declaratively**：在 `<path d="">` 上用 CSS keyframes（Chrome、Edge、Safari 支持 `d` property）、`@property`-driven attribute interpolation，或用 [Motion](https://motion.dev) 处理 orchestrated sequences。

### Hand-built SVG with declarative animation

```html
<svg viewBox="0 0 200 100" class="loaf-svg" aria-label="A loaf of bread">
  <path class="loaf-body" d="M 20 70 Q 100 10 180 70 L 180 90 L 20 90 Z" />
  <path class="loaf-score" d="M 60 50 L 90 30 M 100 45 L 130 25 M 140 50 L 165 35" />
</svg>
```

```css
@property --bake {
  syntax: "<percentage>";
  initial-value: 0%;
  inherits: false;
}

.loaf-body {
  fill: oklch(72% 0.14 50);
  filter: drop-shadow(0 4px 8px oklch(20% 0.02 60 / 0.16));
  transform-origin: 100px 90px;
  animation: bake 6s ease-in-out infinite alternate;
}

.loaf-score {
  stroke: oklch(38% 0.1 35);
  stroke-width: 2;
  stroke-linecap: round;
  fill: none;
  stroke-dasharray: 0 200;
  animation: score 1.6s 0.8s var(--ease-out) forwards;
}

@keyframes bake  { to { transform: scaleY(calc(1 + var(--bake) * 0.005)); --bake: 1%; } }
@keyframes score { to { stroke-dasharray: 200 200; } }

@media (prefers-reduced-motion: reduce) {
  .loaf-body, .loaf-score { animation: none; }
  .loaf-score { stroke-dasharray: 200 200; }
}
```

Breath 来自 `@property --bake` 对 percentage 的 interpolation；score-marks 通过 `stroke-dasharray` 在 load 时自己画出来。没有 JS。18 行 CSS。Reduced-motion-safe。

### Animation choices for SVG in 2026

| Method | 适用场景 | 结论 |
| --- | --- | --- |
| **CSS keyframes on `<path d>`** | Shapes anchor counts 匹配时的 path-morphing | 使用它。可与其余 CSS 组合，GPU-friendly。 |
| **`@property` + animated CSS variables** | Smoothly interpolated colour、length、angle、percentage | 使用它。Declarative、predictable。 |
| **CSS keyframes on `transform` / `opacity`** | Position、rotation、fade | 永远优先。Hardware-accelerated，无 layout thrash。 |
| **`stroke-dasharray` draw-on** | 会自我构建的 hand-drawn line illustrations | 可以。便宜且有效。 |
| **SMIL `<animate>`** | Legacy SVG-only attribute animation | 2026 年可接受但降级选择；CSS 可组合，SMIL 不行。只有 CSS 表达不了时才用。 |
| **JS via Motion / GSAP** | Multi-element orchestrated entrances、scroll-scrubbing、complex timelines | CSS 不够时使用，见下方 Tier C。 |

### Hand-built SVG 的 anti-patterns

- **Shipping the raw Figma export.** 永远先跑 SVGOMG。未处理的 exports 带着数百字节 metadata、unused `<defs>`、doubled transforms。
- **A 300-KB SVG.** 超过 30 KB 就可疑。多数优秀 illustrations 在 4–15 KB。如果你的有 100 KB+，里面可能藏了 raster embeds 或成千上万条不必要 path commands。
- **`viewBox` cruft.** Icon 用 `viewBox="0 0 24 24"` 可以，但 hero illustration 用 `viewBox="0 0 1920 1080"` 很可疑。让 box 匹配 design bounds，不要 padding，不要多余空间。
- **Animation with linear easing on everything.** 加 ease-out（或指定到两位小数的 cubic-bezier）；这就是 "moving" 和 "alive" 的差别。
- **Path morphing between shapes with mismatched anchor counts.** 浏览器会 interpolate，但结果会抖。要么匹配 anchor counts，要么改用 `clip-path`。

---

## Tier C · Declarative animation（CSS-first，JS-when-needed）

2026 declarative animation canon。先使用 platform；只有当 platform 表达不了 orchestration 时才伸手拿 JS。

### CSS keyframes + `@property`

`@property`（Baseline 2024，到 2026 年约 88% 支持）允许定义 typed custom properties：`<color>`、`<length>`、`<angle>`、`<number>`、`<percentage>`，让浏览器知道如何平滑 interpolate。没有 `@property` 时，动画化 custom property 会从起点直接跳到终点，没有中间值。

```css
@property --hue {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-hue { to { --hue: 360deg; } }

.gradient-loop {
  background: conic-gradient(from var(--hue),
    oklch(70% 0.2 var(--hue)),
    oklch(70% 0.2 calc(var(--hue) + 120deg)),
    oklch(70% 0.2 calc(var(--hue) + 240deg)));
  animation: spin-hue 8s linear infinite;
}
```

这是一个平滑 hue-rotating conic gradient。没有 JS，没有 library，GPU-composited。

### Scroll-driven animations

`animation-timeline: scroll()` 和 `view()` 已在 **Baseline October 2025** 达到 production-ready：Chromium、Edge、Safari Tech Preview 可用，Firefox behind a flag。规则是 progressive enhancement。

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: fade-up linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

如果浏览器支持，element 进入 viewport 时会动画。如果不支持，element 就直接在那里：没有 JavaScript、没有 library、没有 IntersectionObserver。CSS Scroll-Driven Animations community 是 canonical reference：[scroll-driven-animations.style](https://scroll-driven-animations.style/)。

### View Transitions API

2026 年 production-ready（same-document 为 Baseline October 2025；Chromium 126+、Safari 18.2+ 支持 cross-document）。Hallmark landing page 已用它做 theme transitions：

```js
function applyTheme(theme) {
  const apply = () => { /* mutate the DOM */ };
  if (!reduced && document.startViewTransition) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}
```

Browser 负责 cross-fade。State changes 不需要 animation libraries。

### Motion / GSAP / friends — 什么时候值得付 bundle

| Library | 适用场景 | Bundle | 结论 |
| --- | --- | --- | --- |
| **[Motion](https://motion.dev)** (`motion/react`, `motion`) | React 中 orchestrated multi-element entrances（variants、`AnimatePresence`、viewport hooks）。2026 年 React heroes 的默认选择。 | 4 KB base + 2 KB React = 6 KB。基于 Web Animations API。 | React 中首选。 |
| **[GSAP](https://gsap.com)**（Webflow partnership 后免费） | Ambitious timelines、scrub-on-scroll、跨 mismatched anchors 的 SVG path-morphing。20+ elements 的 hero sequences、多步叙事。 | ~50 KB core；带 plugins（ScrollTrigger、Draggable）时 100 KB+。 | Timelines 是核心时值得。Fade-in 时过度。 |
| **AutoAnimate** | React 中 trivial layout transitions（list reflows、element appears）。 | 2 KB。 | 做它该做的事时可以。 |
| **Anime.js v4** | Lightweight stagger、simple animations、vanilla JS。 | ~15 KB。 | 可接受；2026 年不如 Motion 常见。 |
| **Theatre.js** | Visual editor + code API，用于 ambitious orchestration。小众但强大。 | Heavy（~80 KB+）。 | 仅限 single-page interactive art。 |

**决策规则:**

```
Single element, simple motion           → CSS keyframes / @property
Multiple elements, orchestrated entrance → Motion (React) or GSAP (vanilla / complex)
Scroll-progress-linked                   → animation-timeline (CSS) — or GSAP ScrollTrigger if complex
State change between two layouts         → View Transitions API
A list reflows in React                  → AutoAnimate
A complex hero narrative with scrubbing   → GSAP timeline + ScrollTrigger
```

为了单个 fade-in 使用 Motion（4 KB 什么都没换来）是 bundle-bloat tell。为了 list reflow 使用 GSAP（50 KB 什么都没换来）也是同一种 tell，只是更响。

### Declarative animation 的 anti-patterns

- **Animating `width`, `height`, `top`, `left`, `margin`, or `padding`**（导致 layout thrash）。只动画化 `transform` 和 `opacity`；它们在 GPU 上 composite。
- **Linear easing on UI**（没有细腻度，读起来像 "demo from a tutorial"）。
- **Bouncy elastic on hero entrances**（`cubic-bezier(0.34, 1.56, …)` 等），只留给 drag-release 这类真正 physical interactions。
- **Importing Motion or GSAP for one fade-in.** 为 `transition: opacity 400ms var(--ease-out)` 零字节就能做的事付 50 KB。
- **Scroll-fade-everything.** 每个 section 都在 scroll 时 fade in。页面永远安定不下来。首次加载只选一个 orchestrated entrance，其余内容就让它*在那里*。
- **Reveal animations with no `prefers-reduced-motion` fallback.** 每个 transform / animation 都必须 guard。

---

## Tier D · Three.js / WebGL / shaders

**何时有正当理由。** 3D *本身*就是 hero value：用户能交互的 rotating product、interactive 3D playground、generative art piece。示例：Apple 带 interactive bottles / iPhones 的 product pages、Bruno Simon 的 portfolio、Vercel 的 WebGL hero galleries。

**何时不该使用。** 用户无法交互的静态旋转物。一个 bloom-overdosed、只会 "looks premium" 的 shader background。Marketing page 上 eager-loaded 的 5-MB model。

**Performance budget.**
- < 100 draw calls
- < 2 MB JS + assets total
- < 6 s load time
- 60 fps target on mid-range mobile

**Stack.**
- React projects 使用 React Three Fiber (R3F)：ergonomic，在 Three.js 之上约 30 KB
- 其他情况使用 Vanilla [Three.js](https://threejs.org)：约 100–300 KB，取决于 features
- Models: glTF 2.0 with Draco compression（减少 20–50% 体积）
- Textures: KTX2 / Basis（比 PNG/JPEG 小很多）

**始终包含 non-WebGL fallback。** 如果 canvas 初始化失败（no WebGL2、GPU blacklisted、low-power mode），显示 static poster image，让页面仍能渲染。

### Three.js / WebGL 的 anti-patterns

- **Three.js for a stationary product.** 没有 interaction = 没有正当理由。用 SVG 或 still photograph。
- **Bloom + glow overdose.** 三四层 post-processing passes 只会让一切变糊。选一个 effect，把它调到 "barely visible"。
- **5-MB models loaded eagerly.** 永远 lazy-load geometry，streaming 时显示 poster。
- **No fallback.** WebGL 会在约 5% 设备上失败；如果页面因此不可用，就是 accessibility 失败。
- **Generic procedural-noise shaders.** 看起来像互联网上所有其他 Three.js demo。Custom shaders 要证明自己的位置；现成 Perlin noise 很少值得。

---

## Tier E · Generated stills（Nanobanana / Recraft V4 / Midjourney）

当需要 characters 或 specific scenes，且 hand-build 不经济时使用（brief 要一个五种姿势的小 mascot；agency 在卖一个需要 evocative atmospheric still 的东西）。

| Model | Cost | Best for | Output |
| --- | --- | --- | --- |
| **[Nanobanana 2 / Gemini 2.5 Flash Image](https://ai.google.dev/gemini-api/docs/image-generation)** | $0.039 / image | 多 panel 中的 character consistency、快速迭代、通过 reference images 遵循 brand-style、带文字的信息图 | PNG（支持 transparent）；无 SVG，无 animation |
| **[Recraft V4](https://www.recraft.ai/)** | ~$0.04 / image | **唯一拥有 production-grade SVG output 的 mainstream model。** Logos、icons、需要进入 code 并可缩放的 illustrations。 | SVG + PNG |
| **[Midjourney v8](https://www.midjourney.com)** | ~$0.14 / image | Aesthetic beauty、artistic direction、atmospheric stills | PNG |
| **[Flux 2](https://blackforestlabs.ai/)** | ~$0.03 / image | Photorealism、skin / fabric / product detail | PNG |

### 生成时的纪律

- **Always post-process.** 加 grain、asymmetric crop、hand-drawn overlays、colour grading。Raw model output 100% 会读成 AI。Post-process 才让它变成我们的东西。
- **Use reference images** 保持 brand consistency。Nanobanana 的 character-consistency feature 是它相对 Midjourney 的差异点；把 existing brand assets 喂给它，让 generations 保持 on-style。
- **Stamp the model in the macrostructure comment**（`generated: nanobanana-2 · post-processed`）。未来 audits 需要知道 provenance。
- **Verify the SynthID watermark** 存在（Google 的 invisible AI-provenance marker）。
- **Multi-frame animation isn't supported** by any of these models。不要尝试把 keyframes 拼成 Lottie loop；那是 Tier F 的领域，而且几乎总是比单张 still 更差。

### Generated stills 的 anti-patterns

- **Symmetrical compositions.** Algorithmic，读起来像 AI。做 asymmetric crop。
- **Smooth-mesh-blob faces.** 2024 年的 "generic AI character" look。如果无法摆脱它，避免 character-led stills；或者使用 Nanobanana 的 character-consistency feature 搭配 reference images，并在 prompt 中强力要求 asymmetry / imperfection。
- **Default lighting + blue-tinted backgrounds.** 泛用 AI tell。在 prompt 中指定 brand-anchored colour 和 unusual lighting。
- **Six fingers, doubled furniture, impossible rooms.** 比 2023 年少见，但仍然潜伏着。永远检查。

---

## Tier F · Library illustrations + Lottie（last resort）

当 budget 和 timeline 强制 shortcut 时使用。Catalogue 在 [`assets.md`](assets.md)：Storyset、Humaaans、unDraw、IRA Design、LottieFiles。即便在这个 tier：

- **Customise.** Colour-swap 到 brand anchor hue。Crop 或 recompose。不要交付未修改的 library look。
- **Avoid the giveaway poses.** 每个团队都看过 "guy on laptop with floating speech bubble" 一百遍。任何大喊 "stock illustration" 的东西都会输。

### Lottie specifically — last resort

**只有在以下情况使用 Lottie：**
- Motion 是 character-articulated（五帧 mascot wave、多关节 walking cycle），且 CSS / SVG 无法合理表达
- 你有 custom-commissioned Lottie，且匹配 brand
- 文件 < 2 MB
- 已接好 pause / resume support
- `prefers-reduced-motion` fallback 是 static keyframe

**不要用 Lottie 做：**
- Spinning logo loops：用 CSS `@keyframes rotate`
- Checkmark-draw confirmations：用 SVG `stroke-dasharray`
- Loading spinners：用 CSS conic-gradient + rotate
- Hover micro-interactions：用 CSS transitions
- 可以 hand-built 的 hero centerpieces：用 Tier A 或 B

The Lottie Tell, version 2026：一个 generic LottieFiles pull，而 pure CSS 本可以做得更强更轻。Audit verb 会抓它。

---

## Bakery worked example, end-to-end

**Brief:** "Build a landing page for a small bakery in Lisbon."

**Step 2 (macrostructure):** Long Document — bakery 是 story-led brand，不是 SaaS product。
**Step 3 (theme):** Linen — warm-paper、prose-led、intimate。
**Step 4 (enrichment):** E5 Custom Illustration Centerpiece。Tier B（hand-built SVG）。

**输出:**

一个 60 行 SVG 的 single loaf，三条 paths（crust + crumb + scoring marks），放在 headline 右侧，宽度占 40% column。Animation：`@property --rise` 在 6 s 内 interpolate 一个 4 px vertical lift，ease-in-out，alternate。Score-marks 在 first paint 时通过 `stroke-dasharray` 自己画出来。Reduced-motion：static loaf，无 animation。

```css
/* Hallmark · macrostructure: Long Document
 * H5 hero: Letter (intimate salutation + 2-paragraph body)
 * enrichment: E5 Custom Illustration · craft: tier-B SVG (60 lines)
 * animation: @property --rise (6s, alternate) + stroke-dasharray draw-on
 * theme: Linen · accent: warm-amber ~3% · studied: no
 */
```

Hallmark 下次遇到 bakery brief 时，会得到一个*不同*的 loaf：不同 curvature、不同 rise distance、不同 score pattern，也可能完全换成另一种 illustration（sourdough boule vs. baguette vs. flatbread）。[`hero-enrichment.md`](hero-enrichment.md) 中的 variation knobs 会保证这一点。

---

## Recipe library

上面的 bakery loaf 是一个 worked example。这个 library 还收录四个 recipe，每个都是 Tier A 或 Tier B 中小而完整、可复制粘贴的 recipe。Brief 需要对应 subject 时使用；否则把它们当作 *technique references*（workflow diagram 的 `stroke-dashoffset` flow 可复用；mascot 的 blink-loop 可复用，等等）。

每个 recipe 都包含：一句话描述、完整代码、"use when / avoid when" note、`prefers-reduced-motion` fallback block，以及 real-world inspiration line。

### Recipe 1 · Workflow / process diagram

三个 labelled boxes，由 curved arrows 连接。轻微不对称旋转（box one 为 -1°，box three 为 +0.5°）制造 hand-drawn feel。其中一条 arrow 有 animated `stroke-dashoffset` flow，暗示 data movement。Use case：展示 data flow、decision tree 或 user journey steps 的 feature page。

```html
<svg class="flow" viewBox="0 0 720 200" role="img" aria-label="Data flow: input, process, output">
  <defs>
    <marker id="flow-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6" fill="currentColor" />
    </marker>
  </defs>

  <g class="flow__step flow__step--a">
    <rect class="flow__box" x="20"  y="55" width="160" height="90" rx="0" />
    <text class="flow__label" x="100" y="105" text-anchor="middle">Input</text>
  </g>

  <path class="flow__arrow flow__arrow--live" d="M 180 100 Q 220 80 260 100" marker-end="url(#flow-arrow)" />

  <g class="flow__step">
    <rect class="flow__box" x="260" y="55" width="200" height="90" rx="0" />
    <text class="flow__label" x="360" y="100" text-anchor="middle">Parse + Filter</text>
    <text class="flow__sub"   x="360" y="118" text-anchor="middle">small predicate language</text>
  </g>

  <path class="flow__arrow" d="M 460 100 Q 500 120 540 100" marker-end="url(#flow-arrow)" />

  <g class="flow__step flow__step--c">
    <rect class="flow__box" x="540" y="55" width="160" height="90" rx="0" />
    <text class="flow__label" x="620" y="105" text-anchor="middle">Output</text>
  </g>
</svg>
```

```css
@property --flow-dash {
  syntax: "<length>";
  initial-value: 0px;
  inherits: false;
}

.flow { width: 100%; max-width: 48rem; height: auto; display: block; margin: 0 auto; color: var(--color-ink); }
.flow__box   { fill: none; stroke: currentColor; stroke-width: 1.5; }
.flow__label { font-family: var(--font-display); font-size: 16px; fill: var(--color-ink); }
.flow__sub   { font-family: var(--font-mono); font-size: 11px; fill: var(--color-muted); }
.flow__step--a { transform: rotate(-1deg); transform-origin: 100px 100px; }
.flow__step--c { transform: rotate(0.5deg); transform-origin: 620px 100px; }
.flow__arrow { fill: none; stroke: var(--color-muted); stroke-width: 1.5; stroke-linecap: round; }
.flow__arrow--live {
  stroke: var(--color-accent);
  stroke-dasharray: 6 6;
  animation: flow 2.4s linear infinite;
}
@keyframes flow { to { stroke-dashoffset: -24; } }

@media (prefers-reduced-motion: reduce) {
  .flow__arrow--live { animation: none; stroke-dasharray: 0; }
}
```

**适用场景**：brief 是 "show the user how data flows"：feature page、docs landing、technical-narrative section。**避免场景**：diagram 超过五个 nodes（使用 Mermaid 或真实 graph layout），或 relationships 是 non-linear（这个 recipe 假设 left-to-right flow）。

*灵感来源:* Lynn Fisher 在 `lynnandtonic.com` 上的 `<rect>` rotation experiments；Rauno Freiberg 在 rauno.me 上的 `stroke-dashoffset` flows。

### Recipe 2 · Minimal-line mascot

一个小 SVG character，只做 face，约 120 × 120 px；有 personality，但不冒 anthropomorphic uncanny-valley 风险。两个 ellipse eyes（带 `@keyframes blink` 3s loop）、一条 quadratic-curve mouth、两个 stem accents（hair / hat / horns / antennae）。适合贴在 text 旁边。

```html
<figure class="mascot" aria-label="The Hallmark mascot — a face with two eyes and a small smile">
  <svg viewBox="0 0 120 130" class="mascot__svg">
    <circle class="mascot__head" cx="60" cy="60" r="42" />

    <ellipse class="mascot__eye mascot__eye--l" cx="46" cy="56" rx="4" ry="6" />
    <ellipse class="mascot__eye mascot__eye--r" cx="74" cy="56" rx="4" ry="6" />

    <path class="mascot__mouth" d="M 50 76 Q 60 84 70 76" />

    <path class="mascot__accent" d="M 32 22 Q 40 12 52 18" />
    <path class="mascot__accent" d="M 88 22 Q 80 12 68 18" />
  </svg>
</figure>
```

```css
.mascot { display: inline-block; width: 80px; height: 86px; margin: 0; vertical-align: -8px; }
.mascot__svg { width: 100%; height: 100%; color: var(--color-ink); }
.mascot__head { fill: color-mix(in oklch, var(--color-paper-2) 100%, var(--color-accent) 6%); stroke: var(--color-ink); stroke-width: 2; }
.mascot__eye  { fill: var(--color-ink); animation: blink 5s ease-in-out infinite; }
.mascot__eye--r { animation-delay: 80ms; }   /* one eye lags slightly — feels organic */
@keyframes blink {
  0%, 8%, 92%, 100% { ry: 6px; }
  12%, 14%          { ry: 0.8px; }
}
.mascot__mouth { fill: none; stroke: var(--color-ink); stroke-width: 1.6; stroke-linecap: round; }
.mascot__accent { fill: none; stroke: var(--color-accent); stroke-width: 1.2; opacity: 0.6; stroke-linecap: round; }

@media (hover: hover) and (pointer: fine) {
  .mascot:hover .mascot__head { fill: color-mix(in oklch, var(--color-paper-2) 100%, var(--color-accent) 12%); transition: fill 240ms cubic-bezier(0.16, 1, 0.3, 1); }
}

@media (prefers-reduced-motion: reduce) {
  .mascot__eye { animation: none; }
}
```

**适用场景**：小产品 / studio / indie brand 需要 personality，但不想承担 generated character 的 uncanny-valley 风险。**避免场景**：mascot 需要跨很多 states 表达情绪（改用 Rive；`@property` 路线适合 simple loops，不适合 articulated emotion）。

*灵感来源:* Are.na 的 reductive-aesthetic site mark；Mailchimp Freddie family（single-colour confidence）；Diana Smith 的 CSS-art portrait constraints。

### Recipe 3 · Three-tier architectural diagram

Browser → API → Database，按约 16/9 绘制，三个 labelled boxes，并用 `@property --flow-offset` 驱动 animated `stroke-dasharray` flow lines。Data-flow lines 会 pulse，暗示 live traffic。Use case：developer-tool landing page，展示 product 在 stack 中的位置。

```html
<svg class="arch" viewBox="0 0 320 180" role="img" aria-label="Three-tier architecture: browser, API, database">
  <g class="arch__tier">
    <rect x="14"  y="50" width="76" height="80" />
    <text x="52"  y="86" text-anchor="middle" class="arch__name">Browser</text>
    <text x="52"  y="104" text-anchor="middle" class="arch__sub">React / Next</text>
  </g>

  <line class="arch__flow" x1="90"  y1="90" x2="120" y2="90" />
  <text class="arch__hop"  x="105"  y="80" text-anchor="middle">HTTPS · OTLP</text>

  <g class="arch__tier arch__tier--mid">
    <rect x="120" y="50" width="80" height="80" />
    <text x="160" y="86" text-anchor="middle" class="arch__name">API</text>
    <text x="160" y="104" text-anchor="middle" class="arch__sub">Edge runtime</text>
  </g>

  <line class="arch__flow arch__flow--reverse" x1="200" y1="90" x2="230" y2="90" />
  <text class="arch__hop"  x="215"  y="80" text-anchor="middle">SQL · gRPC</text>

  <g class="arch__tier">
    <rect x="230" y="50" width="76" height="80" />
    <text x="268" y="86" text-anchor="middle" class="arch__name">Database</text>
    <text x="268" y="104" text-anchor="middle" class="arch__sub">Postgres + vec</text>
  </g>
</svg>
```

```css
@property --flow-offset {
  syntax: "<number>";
  initial-value: 0;
  inherits: false;
}

.arch { width: 100%; max-width: 48rem; height: auto; color: var(--color-ink); display: block; margin: 0 auto; }

.arch__tier rect {
  fill: var(--color-paper-2);
  stroke: var(--color-ink);
  stroke-width: 1.5;
}
.arch__tier--mid rect {
  fill: color-mix(in oklch, var(--color-paper-2) 100%, var(--color-accent) 8%);
  stroke: color-mix(in oklch, var(--color-accent) 60%, var(--color-ink));
}

.arch__name { font-family: var(--font-display); font-size: 11px; font-weight: 500; fill: var(--color-ink); }
.arch__sub  { font-family: var(--font-mono);    font-size: 8px;  fill: var(--color-muted); }
.arch__hop  { font-family: var(--font-mono);    font-size: 7px;  fill: var(--color-muted); letter-spacing: 0.04em; }

.arch__flow {
  stroke: var(--color-accent);
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-dasharray: 4 4;
  animation: arch-flow 1.6s linear infinite;
}
.arch__flow--reverse { animation-direction: reverse; }
@keyframes arch-flow { to { stroke-dashoffset: -8; } }

@media (prefers-reduced-motion: reduce) {
  .arch__flow { animation: none; stroke-dasharray: 0; }
}
```

**适用场景**：brief 是 developer-facing product，需要展示它在 stack 中的位置，例如 observability tools、edge functions、ORMs、ingestion services。**避免场景**：architecture 超过五层或 topology 是 non-linear（这个 recipe 只适合 "three-box flow" model；graph-like topologies 应使用真实 diagram tool 并 embed SVG export）。

*灵感来源:* Vercel 的 network/edge diagrams；Diana Smith 在放置 geometry 时的 structural precision。

### Recipe 4 · Botanical leaf flourish

一个小型（约 40 × 80 px）hand-drawn sprig，带两片不对称叶子，旋转 +25° 和 -30°。Leaf veins opacity 0.6。尺寸适合贴在 headline 旁作为 inline accent。Pure SVG，默认无 animation（设计价值就在 stillness）。

```html
<svg class="sprig" viewBox="0 0 40 80" aria-hidden="true">
  <path class="sprig__stem" d="M 20 76 Q 18 56 21 36 Q 22 22 20 8" />

  <g transform="translate(8 38) rotate(-25)">
    <ellipse class="sprig__leaf"  cx="0" cy="0" rx="6" ry="11" />
    <path     class="sprig__vein" d="M 0 -10 Q 1 0 0 10" />
  </g>

  <g transform="translate(28 52) rotate(30)">
    <ellipse class="sprig__leaf"  cx="0" cy="0" rx="6" ry="11" />
    <path     class="sprig__vein" d="M 0 -10 Q -1 0 0 10" />
  </g>

  <path class="sprig__stem" d="M 20 22 Q 16 19 13 22" />
</svg>
```

```css
.sprig {
  width: 32px;
  height: 64px;
  display: inline-block;
  vertical-align: -0.6em;
  margin-inline-end: 0.4em;
  color: var(--color-accent);
}

.sprig__stem  { fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; }
.sprig__leaf  { fill: none; stroke: currentColor; stroke-width: 1.4; }
.sprig__vein  { fill: none; stroke: currentColor; stroke-width: 0.9; opacity: 0.6; stroke-linecap: round; }

/* Use beside a headline */
h1.has-flourish { display: flex; align-items: baseline; gap: 0.4em; }
```

**适用场景**：brief 是 bakery、restaurant、café、boutique、herbalist、florist、atelier，任何 hand-drawn signal of *care* 适合 brand 的场景。**避免场景**：brand 是 technical、brutalist 或 quietly austere（sprig 会添加 warmth，而页面可能需要 restraint）。

*灵感来源:* 旧 broadsheet papers 中的 hand-drawn botanical assets；Lisbon 和 Tokyo 的 restaurant menus；Lynn Fisher 的 constraint-driven simplicity（这个 recipe 本可以用更巧妙的 clip-path 做成 *A Single Div*，但 SVG 在小尺寸下更易读）。

---

### 跨 recipe techniques

四个 recipes 的共同点，也是 2026 年 hand-built CSS/SVG illustration 的四个习惯：

1. **`@property` for declarative interpolation.** 动画化 typed custom property（`<length>`、`<number>`、`<angle>`、`<color>`）可以用 zero JS 获得 GPU-composited animation。Bakery loaf、workflow flow line、architectural data-flow、mascot blink 都用了它。
2. **Asymmetric `transform: rotate()` for hand-drawn feel.** Workflow boxes 旋转 ±1°；mascot 双眼之间有 80 ms delay；sprig leaves 旋转 +25° / -30°。Symmetry 读起来像 algorithmic；controlled asymmetry 读起来像 drawn。
3. **Opacity layering for pencil/secondary detail.** Workflow 的 reverse arrow 是 `var(--color-muted)`；architectural sub-labels 是 60% opacity；sprig veins 是 0.6 opacity。Opacity hierarchy 就是 attention hierarchy。
4. **Mono labels grounding decorative work in function.** Architectural diagram 的 `arch__sub` text 使用 8 px 的 `var(--font-mono)`。Workflow 的 "small predicate language" 使用 mono。Decorative work 通过 legible 和 accurate 证明自己的位置；mono 表示这一点。

当它们适配 brief 时原样使用这些 recipes；否则拆出 technique 去服务不同 brief。重点是：*Hallmark page 上的每个 illustration 都是 built，不是 picked。*

- **Reaching for Lottie when CSS would do.** 新 tell。用 pure CSS 或 hand-built SVG 构建 loaf；Lottie 是会让你付出代价的 shortcut。
