# Hero enrichment — when, what, and how much

本文件在 macrostructure pick 之后加载（design flow 的 Step 3），也就是到达 Step 4：“Decide on hero enrichment” 时使用。它告诉你 hero 是否需要 media enrich；如果需要，应选择哪种 archetype，以及如何构建。

**The promise.** Enrichment 是选项，不是默认。Typographic-only hero *永远*是可接受答案。Visual enrichment——demo video、illustration、mockup、animated loop、abstract background、photography——必须*赢得自己的位置*。如果删除 enrichment 后 hero 仍然成立，说明 enrichment 赢得了位置。如果没有 enrichment 时 hero 崩塌，说明你只是用它支撑了薄弱 typography。

**The bar.** 宁可没有，也不要糟糕的东西。一个安静、排版良好的 typographic hero，永远好过 stock illustration、Lottie checkmark、aurora-blob background，或 generic centred demo video block。

---

## Image-need detection — 这个 brief 到底需不需要 imagery？

选择 enrichment tier 前，先判断 brief 是否真的想要 imagery。默认是 **typography-only**。用下表匹配 brief；按*第一条命中*执行：

| Brief signal（任一词 / 意图） | Image strategy |
| --- | --- |
| e-commerce, shop, store, product catalogue, brand, fashion, lookbook | 需要真实 product photos；用户提供前使用 placeholder |
| photography, portfolio, gallery, artist | Imagery *就是*页面；用户提供前使用 placeholder |
| food, restaurant, menu, dish, coffee, wine, recipe | Hero photo + product crops；用户提供前使用 placeholder |
| team, staff, "about us", portraits, hiring, careers | Portrait crops；用户提供前使用 placeholder |
| travel, hotel, destination, real estate, listing, property | Cover photo + tile photos；用户提供前使用 placeholder |
| news, blog, magazine, journal, publication | 每篇 post 一个 feature image；用户提供前使用 placeholder |
| SaaS landing, manifesto, agency, studio, atmospheric, slow-and-editorial | **Kit-led.** 使用 Hallmark imagery kit（washes、transparent abstracts、ornaments）；见 [`assets.md` § Placeholder strategy](assets.md) 和 [`imagery-kit.md`](imagery-kit.md)。 |
| API, docs, changelog, CLI, library, dev-tool, SDK, package | **No imagery.** Typography-only。需要时使用 code blocks。 |
| editorial, essay, letter, foundry, type-specimen, broadside | **No imagery.** Display typography 就是 design。 |
| (all other / vague / unspecified) | **Default: typography-only.** 犹豫时不要 images。 |

Rules：

- 当用户附带 image asset（或 `.hallmark/preflight.json` 缓存了一个）时，使用它。绝不要用 placeholder 覆盖。
- 当 brief 确实在 “needs photos” 行和 “no imagery” 行之间含糊时，问一个简短问题：*"Will you have product photos, or should I leave swappable placeholders?"*
- Placeholder 必须看起来像 placeholder，而不是像自信的最终决策。本 skill 拒绝把 stock photos 编造成最终设计。
- 上方 imagery 行不会覆盖 genre overlays。Modern-minimal genre 仍会抑制 decorative kit imagery（见 `imagery-kit.md` anti-patterns gate）。

下面的 hierarchy 只有在这个 gate 判定确实需要 imagery 后才选择 tier。跳过这个 gate 正是 “blob illustration on every page” 输出的来源，也是 Hallmark 拒绝的 AI default。

---

## The enrichment hierarchy

在 brief 和时间允许的范围内，选择能交付的最高 tier。跳级是新的 tell。

| Tier | What | When |
| --- | --- | --- |
| **0 · Typography only** | 无 enrichment。Display、lede、可选 CTA。 | 永远可接受。最强 fail-state。 |
| **A · Custom-built CSS art** | Pure-CSS shapes、gradients、clip-paths，无 asset、零依赖。 | Geometric shapes、gradient compositions、glyph-style decoration。 |
| **B · Hand-built SVG** | 在 Figma 中设计、优化，并用声明式方式 animate。 | 比 CSS 能干净处理更复杂的 illustrations，例如 loaf、mascot、workflow diagram。 |
| **C · Generated illustration** | Nanobanana / Recraft V4 / Midjourney，带 provenance + post-processing。 | 角色或具体场景，手工构建在经济上不划算。始终 post-processed。 |
| **D · Library illustration** | Storyset / Humaaans / unDraw，用品牌颜色定制。 | 当 budget 和 timeline 迫使走捷径时；即便如此，也绝不原样使用。 |
| **E · Lottie animation** | LAST RESORT。仅当复杂角色 motion 无法手工构建时。 | Articulated figures、multi-frame mascot loops。绝不用于 “spinning logo” 或 “checkmark draw”，那些属于 CSS。 |

**The discipline.** 如果 tier A 能做到，就用 tier A。A 做不到，再试 B。只有角色要求时才降到 C。只有 brief 明确要求 “fast and cheap” 时才用 D。只有 E 确实是唯一选择时才用 E。因为熟悉就伸手拿 E——许多 AI tools 都这么做——是模板化页面的签名。

Tier A 和 B 的构建方法见 [`custom-craft.md`](custom-craft.md)。Tier C、D、E 的来源目录见 [`assets.md`](assets.md)。

---

## Eyeball or ask — decision protocol

选择 enrichment 有两条路径：

```
If the brief contains explicit visual cues, pick from this map:

  • "demo", "show how it works", "product tour"           → E1 / E2 demo video
  • "platform", "tool", "infra", "dashboard", "developer" → E3 / E4 mockup
  • "shop", "store", "menu", "products", "items"          → E8 photography (or F6 product grid)
  • "bakery", "kitchen", "café", "atelier" + craft brief  → E5 custom illustration (Tier B SVG)
  • "agency", "studio", "portfolio"                       → E8 photography or no enrichment
  • "manifesto", "essay", "book", "letter"                → no enrichment (typography only)
  • Quiet theme picked                                    → no enrichment (the theme IS restraint)

Else if the brief is genuinely ambiguous, ask one question:
  "Want me to add a demo video, an illustration, or keep it
   typography-only? I default to typography-only because it's
   the strongest fail-state."

Else default to no enrichment. State the inference in one sentence
in your reply, alongside the macrostructure inference.
```

犹豫时：不要 enrich。Hero 会没问题。多数优秀 landing pages 都是 typographic。

---

## Eight enrichment archetypes

每个 archetype 都包含一句定义、use when、avoid when、简短 code sketch，以及 2–3 个 archetype 内部 variation knobs（与 [`component-cookbook.md`](component-cookbook.md) 保持一致）。

### E1 · Demo Video — Clipped-by-viewport-edge

左侧 display headline，右侧 demo video，视频最右侧约 10–20% 超出 viewport 并被刻意裁掉。Clip *本身就是* design：它暗示“产品比这个屏幕能装下的更多”。由 Linear 开创，Vercel、Resend、Cursor 进一步打磨。

*Use when:* brief 是 SaaS / dev tool / dashboard / platform，且你有产品真实 footage。
*Avoid when:* 没有真实 footage。一个裁边的 stock-footage city skyline video 会读成 filler。

**Knobs:**
- Clip side（right · left · both）
- Aspect ratio（16/10 · 16/9 · 4/3）
- Frame treatment（hairline 1 px frame · browser chrome · none）

**Example.** Tracejam（SaaS observability；见 [`site/_tests/05-tracejam-saas/`](../../../site/_tests/05-tracejam-saas/)）。左侧 display headline（“Distributed tracing that explains itself.”）；右侧 hand-built CSS-art trace waterfall，倾斜 -0.4°，向 viewport 右侧延伸 12 vw。Aspect 16/10。Hairline frame。**不是真视频**，mockup 是 Tier A 的 custom-built CSS（percentage grid 上的矩形模拟 flame chart）。Mobile（< 60 rem）：移除 clip，改为垂直 stack。

```html
<section class="hero hero--clipped">
  <div class="hero__copy">
    <h1>Plan, build, ship.</h1>
    <p>The project tracker your engineering team won't ignore.</p>
    <a class="btn" href="/signup">Try it free</a>
  </div>
  <figure class="hero__media">
    <video autoplay muted loop playsinline preload="metadata"
           poster="/hero-poster.webp" fetchpriority="high"
           aria-label="Tour of the dashboard interface">
      <source src="/hero.av1.mp4"  type='video/mp4; codecs="av01.0.05M.08"'>
      <source src="/hero.vp9.webm" type="video/webm">
      <source src="/hero.h264.mp4" type="video/mp4">
    </video>
  </figure>
</section>
```

```css
.hero--clipped {
  display: grid;
  grid-template-columns: minmax(20rem, 1fr) 1.4fr;
  gap: var(--space-2xl);
  align-items: center;
  overflow: visible;        /* let the media spill past the page edge */
}
.hero__media {
  width: calc(100% + 12vw); /* the 12 % of viewport that sits beyond the right edge */
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  border: var(--rule-hair) solid var(--color-rule);
  overflow: hidden;
}
.hero__media video { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 60rem) {
  .hero--clipped { grid-template-columns: 1fr; }
  .hero__media { width: 100%; }    /* don't try to clip on mobile — reads as broken */
}

@media (prefers-reduced-motion: reduce) {
  .hero__media video { display: none; }
  .hero__media { background: url('/hero-poster.webp') center/cover; }
}
```

**Critical:** hero video 上绝不要 `loading="lazy"`，这会杀死 LCP。使用 `preload="metadata"` 和 `fetchpriority="high"`。始终包含 `poster=""` 和用于 accessibility 的 `<track kind="captions">`。

### E2 · Demo Video — Full-bleed muted loop with ghost overlay

Video 填满 fold，通过 `mix-blend-mode: multiply` 在 paper-coloured overlay 上做 ghost tint，让 type 保持可读。Video 是 wallpaper，不是主体。

*Use when:* 产品的*感受*就是 message（mood、tactility、atmosphere）。
*Avoid when:* 产品需要被清楚*看见*，此时用 E1 或 E3。

**Knobs:**
- Ghost opacity（0.3 / 0.5 / 0.7）
- Text alignment（left-bias / centred）
- Pause behaviour（always-loop · pause-on-hover · pause-when-out-of-viewport）

**Example.** 小型 fashion brand 的 spring lookbook。8 秒 muted loop，内容是 studio 中垂落的织物。`mix-blend-mode: multiply` 叠在 0.5 opacity 的 warm-cream overlay 上，让 italic display headline（“Spring · 2026 · Lookbook 04”）在动态 footage 上清晰可读。Hover 时暂停，方便用户不受干扰地阅读 lede。Caption track（VTT）为 accessibility 描述 footage。

### E3 · Mock App Screenshot — Browser-framed split

左侧 display headline，右侧 browser-frame mockup，mockup window 轻微倾斜（1–3°）以产生生命感。Frames 来自 [Browserframe](https://browserframe.com) 或手工构建（1-px hairline + 三个 macOS dots）。

*Use when:* 你在销售一个 web app，并且有干净、光线良好的 screenshot。
*Avoid when:* screenshot 忙乱或模糊；frame 会把注意力引向混乱。

**Knobs:**
- Frame style（browser chrome · macOS toolbar · minimal hairline · none）
- Tilt angle（0° · 1.5° · 3°）
- Screenshot count（1 · stack-of-3 · orbit-of-3）

**Example.** Linear-style SaaS landing，用于 project tracker。左侧 headline（“Plan, build, ship.”），右侧 browser-frame screenshot 展示 kanban view，顺时针倾斜 1.5°。三条 numbered annotations（1 · assigns automatically · 2 · real-time presence · 3 · keyboard-first），每条有一个小编号 pin 和 margin-aligned caption，绝不要 arrows-and-labels。单张 screenshot，不做 stack；更少 assets、更清晰阅读。

### E4 · Mock App Screenshot — Floating no-frame

与 E3 相同构图，但没有 browser chrome：screenshot 带 soft shadow 和 12 px corner radius 悬浮。更干净；但由于没有 chrome 可遮丑，对 screenshot 质量要求更高。

*Use when:* screenshot 本身足够漂亮，可以独立站立。
*Avoid when:* 产品需要 chrome 提供“这是一个真实 web app”的线索。

**Knobs:**
- Shadow depth（subtle / medium / dramatic）
- Corner radius（0 · 8 px · 16 px）
- Background reveal（gradient / solid / none）

**Example.** 一个 code-formatting CLI marketing page。左侧 headline（“Format anything, in eight lines.”），右侧单张 floating screenshot 展示并排的 `before` / `after` code。12 px corner radius，-10 px offset 的 soft 24 px shadow，放在几乎不可察的 tinted gradient surface 上。**No browser chrome**——screenshot 本身构图足够好，可以独立站立。只有 screenshot 异常高质量时才用它；否则切回 E3（chrome 能包容更凌乱的 captures）。

### E5 · Custom Illustration Centerpiece

一个 hand-built SVG（默认 Tier B）或 generated raster（Tier C，角色需求时），作为单个 illustrative element 放在 hero 上：bakery loaf、studio mascot，或 workflow 如何流动的 diagram。

*Use when:* 品牌有一个 story 或 thing-it-makes，值得被画出来。
*Avoid when:* 品牌只是 generic “modern professional team”；画这个就是新模板。

**Knobs:**
- Build method（Tier A pure-CSS / Tier B hand-SVG / Tier C generated / Tier D library）
- Animation（none · loop · scroll-linked）
- Scale（small accent · dominant）

**Example.** Maple Street Bread（bakery；见 [`site/_tests/03-maple-bakery/`](../../../site/_tests/03-maple-bakery/)）。左侧 letter-style hero copy（“Saturday, 6:14 a.m. The dough went in at midnight.”），右侧 60 行 hand-built SVG loaf，3 条 paths（body、shade、score-marks）。用 `@property --rise` 做微妙 4 px breathing-loop，6 s 交替；score-marks 首次 paint 时用 `stroke-dasharray` 自绘。Tier B、dominant scale、animation: loop。Reduced-motion fallback 是 static keyframe。

如何用 60 行 SVG 构建 hand-drawn loaf，并用 `@property` animate 呼吸，见 [`custom-craft.md`](custom-craft.md)；那里有完整 bakery worked example，以及另外四个 recipes（workflow diagram、mascot、architectural diagram、botanical accent）。

### E6 · Animated Loop — pure CSS / SVG / Motion

一个小型 custom-built loop：orbiting dot、breathing rectangle、animated gradient stop、type-mask reveal。重点是*小*、custom，并且*只在 reduced-motion 关闭时* loop。

*Use when:* 页面其他部分很静，一个小 animated element 能给它生命。
*Avoid when:* 页面已经有 movement；再加会显得焦虑。

**Knobs:**
- Medium（CSS keyframes · SVG SMIL/CSS · Motion）
- Placement（margin · inline-with-headline · corner-accent）
- Loop duration（≤ 4s；更长就拖沓）

**Example.** 一个 collaborative whiteboard app。Headline 旁边一个 2 秒 pure-CSS loop：单个 dot 绕着慢 ellipse 运行，暗示 “real-time collaboration”，不用 Lottie。用 `@property --angle` 在 `transform: rotate()` 上插值 0deg → 360deg。Margin-placed，约 64 × 64 px，低 chroma accent colour。**Not a Lottie**；pure CSS 让 bundle 零字节，并优雅尊重 reduced-motion（media query 中 `animation: none`）。

### E7 · Abstract Background — subtle gradient + grain

低 chroma 的双色 CSS gradient，叠加 opacity < 0.1 的 SVG `<feTurbulence>` grain。*不是* aurora；*不是* purple-to-cyan mesh；*不是* floating orbs。重点是*几乎看不见的 texture*：paper-quality，而不是 decoration。

*Use when:* 页面用平面 surface 会显得合成感太强。
*Avoid when:* theme 已经有 paper feel（Specimen、Linen、Riso）。重复 grain 会变浑浊。

**Knobs:**
- Gradient direction（45° / 135° / radial）
- Grain amount（off · subtle · textured）
- Animation（none · slow drift · scroll-linked parallax）

**Example.** 一个小型 podcast site（当主持人想要比 Tide 的 typography-only quote 更强的视觉热度）。仅在 *hero* 上使用 135° 两段 CSS gradient（warm-cream → barely-orange，二者 chroma 都 < 0.04），绝不 page-wide。SVG `<feTurbulence>` grain overlay，opacity 0.06，`mix-blend-mode: multiply`。无 animation。抵抗所有 aurora-blob 诱惑。

```html
<section class="hero hero--bg">
  <div class="hero__bg" aria-hidden="true">
    <svg width="0" height="0" style="position: absolute;">
      <filter id="grain"><feTurbulence baseFrequency="0.9" numOctaves="2"/></filter>
    </svg>
  </div>
  <div class="hero__copy"> ... </div>
</section>
```
```css
.hero { position: relative; isolation: isolate; }
.hero__bg {
  position: absolute; inset: 0; z-index: -1;
  background:
    linear-gradient(135deg,
      color-mix(in oklch, var(--color-paper) 100%, var(--color-accent) 4%),
      color-mix(in oklch, var(--color-paper) 100%, var(--color-paper-2) 50%));
}
.hero__bg::after {
  content: ""; position: absolute; inset: 0;
  filter: url(#grain);
  opacity: 0.06;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

### E8 · Hero Photography — single tightly-cropped image

Cookbook 中已有的 H6 archetype。这里交叉引用以保持完整性。Variation knobs 见 [`component-cookbook.md`](component-cookbook.md)。

**Example.** 一个小型 Lisbon café。一张黎明 espresso machine 的 tightly-cropped photograph，4/3 ratio，不 full-bleed。Caption 以 mono small-caps 放在 lower-left，margin-aligned（“Plate 04 · 6:42 a.m.”）。照片相对原片 desaturate 8%，以贴合页面 warm-paper tone。Photography 始终要搭配 tone-matched typography pairing（见 [`typography.md`](typography.md)）；luxury-tone photo 放在 brutalist page 上会刺眼。

---

## Hero shape polish — patterns beyond enrichment

上方八个 enrichment archetypes（E1–E8）决定 *headline 旁边放什么*。下面四个 polish patterns 决定 *headline 自身如何落位*：它们影响 layout、type、motion，不是在上面加 decoration。它们可叠加在任意 hero macrostructure（Marquee Hero、Stat-Led、Quote-Led、Letter、Photographic、Clipped）上。当 hero 感觉 shape-flat——只靠颜色、对称、可预测——时选择一个 polish pattern。

可以交付一个同时带一个 polish pattern *和*一个 enrichment archetype 的 hero，但绝不能同时带两个 polish patterns。Hero 是高风险 surface；一个结构选择就足够承载它。

### HP1 · Vertical-rail title

Wordmark 或 pull-label *垂直*沿 centered body 一侧运行。CSS：rail 上使用 `writing-mode: vertical-rl; text-orientation: mixed;`；body 以 normal flow 放在旁边。读作 studio · atelier · editorial：Japanese-print rhythm、hand-set page furniture。

*Use when:* hero 其他部分是 centered 或 marquee-shaped，页面需要一个不是 rule 或 numeral 的 structural anchor。
*Avoid when:* body title 本身已经巨大且 centered；巨大 horizontal display 旁再放 vertical rail 会变成互相竞争的 axes。二选一。

```html
<header class="hero hero--rail">
  <p class="hero__rail" aria-hidden="true">STUDIO · 2026 · WORK · LETTERS</p>
  <div class="hero__body">
    <h1 class="hero__display">A working archive.</h1>
    <p class="hero__lede">Twelve years. Selected projects, in their own time.</p>
  </div>
</header>
```
```css
.hero--rail { display: grid; grid-template-columns: auto 1fr; gap: var(--space-2xl); padding: var(--space-2xl) var(--page-gutter); align-items: end; }
.hero__rail { writing-mode: vertical-rl; text-orientation: mixed; font-family: var(--font-display); font-size: var(--text-sm); letter-spacing: 0.18em; color: var(--color-ink-2); margin: 0; }
@media (max-width: 60rem) { .hero--rail { grid-template-columns: 1fr; } .hero__rail { writing-mode: horizontal-tb; font-size: var(--text-xs); } }
```

*Anti-pattern:* vertical text 和 horizontal display title 以相同 scale 竞争。选择一个方向；rail 是 supporting voice。

### HP2 · Marquee-overflow

H1 刻意大于 viewport：hero container 使用 `overflow-x: clip`；title 向右边缘外 bleed。读作 manifesto · brutal · sport：headline 大声到页面装不下。

*Use when:* genre 是 playful（Brutal、Manifesto、Sport），且 title *很短*（≤ 6 words）。长标题 + overflow = 噪音。
*Avoid when:* title 承载必须完整可读的法律信息（privacy notice、terms page）。

```html
<header class="hero hero--overflow">
  <h1 class="hero__display hero__display--xxl">STOP MAKING UI THAT LOOKS LIKE EVERYONE ELSE'S UI.</h1>
  <p class="hero__lede">Hallmark. A design skill that refuses defaults.</p>
</header>
```
```css
.hero--overflow { overflow-x: clip; padding: var(--space-2xl) var(--page-gutter); }
.hero__display--xxl { font-family: var(--font-display); font-weight: 800; font-size: clamp(4rem, 14vw, 14rem); line-height: 0.92; letter-spacing: -0.04em; margin: 0; white-space: nowrap; }
@media (max-width: 60rem) { .hero__display--xxl { white-space: normal; font-size: clamp(2.5rem, 10vw, 5rem); } }
```

*Anti-pattern:* 在这个 hero 同时给 `<html>` 或 `<body>` 设置 `overflow-x: hidden`；clip 会破坏 descendants 的 horizontal scroll 行为。只在 hero container 上 scoped 使用 `overflow-x: clip`。

### HP3 · Cursor-spotlight

一个跟随 `mousemove` 的 radial-gradient background，只 scoped 到 hero。读作 atmospheric · modern-minimal SaaS：Linear、Tailwind Labs、Raycast。

*Use when:* 页面是 atmospheric / dark-paper / SaaS marketing，hero 有可在文字下方玩的 empty surface，品牌 voice 能承载 “tactile, alive”。
*Avoid when:* cursor 会在 content（text、buttons）上方追踪，抢走阅读焦点。把 spotlight scoped 到文字下方的 backdrop layer，绝不要覆盖文字。

```html
<header class="hero hero--spotlight">
  <div class="hero__spotlight" aria-hidden="true"></div>
  <div class="hero__body">
    <h1 class="hero__display">Distributed tracing that explains itself.</h1>
    <p class="hero__lede">Open one trace. See the whole story.</p>
  </div>
</header>
```
```css
.hero--spotlight { position: relative; isolation: isolate; padding: var(--space-2xl) var(--page-gutter); overflow: hidden; }
.hero__spotlight { position: absolute; inset: 0; z-index: -1; background: radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), color-mix(in oklch, var(--color-accent) 22%, transparent), transparent 60%); transition: background 200ms var(--ease-out); }
@media (prefers-reduced-motion: reduce) { .hero__spotlight { transition: none; --mx: 50%; --my: 30%; } }
```
```js
// Scope to hero only — never page-wide.
const hero = document.querySelector('.hero--spotlight');
hero?.addEventListener('pointermove', (e) => {
  const r = hero.getBoundingClientRect();
  hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
  hero.style.setProperty('--my', `${e.clientY - r.top}px`);
});
```

*Anti-pattern:* 在*整个页面*追踪 cursor；这会令人眩晕并抢焦点。只 scoped 到 hero。Reduced-motion fallback 必须把 gradient 固定在合理静态位置（50% / 30%），而不是只禁用 effect（那会留下 flat surface）。

### HP4 · Decorative-numeral

一个巨大的 edition number / year / chapter glyph，以 display-italic 放在 hero 一角。Numeral *必须有含义*：issue 22、year 2026、chapter 03、version 0.8。读作 editorial · salon · newsprint · almanac。

*Use when:* 页面确实有 edition / issue / chapter / version semantic：magazines、journals、archived work、dated essays。
*Avoid when:* numeral 没有 semantic anchor。角落里随机的 “42” 会读成 decoration，也就是 slop（见 slop-test gate 55）。

```html
<header class="hero hero--num">
  <p class="hero__eyebrow">Studio · Spring 2026</p>
  <h1 class="hero__display">A working archive.</h1>
  <p class="hero__lede">Twelve years. Selected projects, in their own time.</p>
  <span class="hero__num" aria-hidden="true">22</span>
</header>
```
```css
.hero--num { position: relative; padding: var(--space-2xl) var(--page-gutter) var(--space-3xl); overflow: hidden; }
.hero__num { position: absolute; right: var(--page-gutter); bottom: -0.15em; font-family: var(--font-display); font-style: italic; font-weight: 600; font-size: clamp(8rem, 22vw, 18rem); line-height: 1; color: color-mix(in oklch, var(--color-ink) 8%, transparent); pointer-events: none; user-select: none; }
@media (max-width: 60rem) { .hero__num { font-size: clamp(5rem, 26vw, 9rem); right: -0.1em; } }
```

*Anti-pattern:* 无意义 numerals。Numeral 必须承载信息：issue、year、version、chapter、plate。如果你说不出数字*是什么*，就删除它。

---

## Hero space discipline

每个 hero——无论 enriched 与否、polished 与否——都遵守这些规则。

- **Footprint.** Hero 占据首个 viewport 高度的 70–90%，不多不少。`min-height: 100vh / 100dvh` 是 AI fingerprint（gate 7）；只占 viewport 20% 的 hero 像 header。目标是 `min-height: clamp(60vh, 75dvh, 88dvh)`，让内容自然落位。
- **Asymmetric padding.** `padding-block-end` ≥ 1.3× `padding-block-start`。Hero 坐*进*页面里；对称 padding 会漂浮。Slop-test gate 54 会 enforce。
- **Never centre everything.** Eyebrow + title + lede + CTA 全部 stacked centred 是 AI fingerprint。最多选择*两个* centred elements；其他要打破对齐。Gate 53 会 enforce。Centred-narrow heroes 只有在 genre 是 editorial / salon / atelier，且 eyebrow 或 CTA 打破 alignment 时才允许。
- **Entrance animation.** 每个元素从 {fade, sweep, none} 中选一个；绝不要同一元素同时 fade *and* sweep。Duration ≤ 220 ms。在 `prefers-reduced-motion: reduce` 下禁用。交叉参考下方 “One orchestrated reveal per page” rule。
- **Headline typography.** 相比默认 0，更偏好一个 display weight + tight tracking（-0.02em 到 -0.04em）；display line-height 0.95–1.05，绝不要 1.2（那是继承 body line-height，会读成未设置的 type）。避免同一 headline 使用两个 display weights（title 里的 `<strong>` 用不同 weight 是 AI 对 “emphasis” 的想象；选一个 weight，让词本身承载）。
- **One polish pattern, max.** HP1–HP4 在单个 hero 中互斥。一个 hero 上同时有 vertical rail、marquee-overflow、cursor spotlight 和 decorative numeral 是惊慌失措。选一个。

决策顺序：

1. 选择 hero macrostructure（Marquee Hero、Stat-Led、Quote-Led、Letter、Photographic、Clipped）；见 [`macrostructures.md`](macrostructures.md)。
2. 选择零或一个 **enrichment archetype**（上方 E1–E8）。
3. 选择零或一个 **polish pattern**（上方 HP1–HP4）。
4. 应用 space discipline rules。
5. 将选择写入 macrostructure stamp。

---

## Animation discipline（hero 专属）

交叉引用 [`motion.md`](motion.md)、[`microinteractions.md`](microinteractions.md) 和 [`custom-craft.md`](custom-craft.md)。Hero 是页面上风险最高的 animation surface；这里的规则比其他位置更严格。

**One orchestrated reveal per page.** 不是八个。不是 “everything fades in on scroll”。只有一个：hero 在 0.4–0.8 s 内用单个协调 motion 稳定下来，然后停止。

**Banned for hero entrances:**
- Bouncy elastic easing（`cubic-bezier(0.34, 1.56, ...)`），读成 2016 Framer demo
- Scroll-fade-everything（每个 section 进入 viewport 就 fade in）
- Mouse-follow gradients on SaaS landing pages（只允许在 portfolio / creative / agency work 中使用）
- Parallax-on-mouse（motion sickness，gimmicky）
- Particle / starfield backgrounds（2010s nostalgia，分散注意）
- Auto-rotating hero carousels（违反 WCAG 2.2.2，除非实现 paused-on-hover-and-focus）

**Allowed:**
- Headline 落位后约 0.6 s，再用约 0.4 s 做单次 image-fade-in-late
- Headline 上的 type-unmask（`clip-path` 在文字上打开）
- 用于 state changes（theme switch、route change）的 View Transitions API
- Stat-led hero 上的 number-tick（counter 从 0 到最终值，≤ 1.2 s）
- 一个 subtle Lottie / CSS loop ≤ 4 s，并带 `prefers-reduced-motion` fallback

**Reduced-motion is the default in 2026.** 每个 animation 都有 `@media (prefers-reduced-motion: reduce)` block，要么禁用 motion，要么替换为 static keyframe。这不可协商；slop test 会抓到。

---

## Quality bar — eight pre-flight questions

Enrichment 交付前，每个问题都必须回答 *yes*。若任何答案是 *no*，改交付 typographic-only hero。

1. Enrichment 是否**传达**了 typography 无法传达的东西？
2. 总体是否低于 **2 MB**（video poster + first segment、illustration + animation JSON、image + grain）？
3. 是否有 **`prefers-reduced-motion` fallback**？
4. 如果是 video：是否 muted、looped、`playsinline`，并带 poster + `fetchpriority="high"` + caption track？
5. 如果是 illustration：是否带意图地 built 或 generated？**不是为了走捷径从 Lottie library 里挑的？**
6. 如果是 background：是否低于一个 accent colour 且 footprint < 5%？（Aurora 和 mesh-gradients 不通过。）
7. 它被删除后 hero 还能成立吗？（如果 hero 没它仍然成立，说明它赢得了位置；如果 hero 没它就崩塌，说明你只是用它支撑薄弱 typography。）
8. 它的 tone 是否匹配页面 tone？（Risograph illustration 放在 Brutal page 上 = 错。Hand-drawn doodle 放在 Workbench developer-tool page 上 = 错。Three.js bloom 放在 Quiet page 上 = 错。）

Slop test（[`SKILL.md`](../SKILL.md) §5）有四个 binary gates 与这些问题对应；audit verb 会运行它们。

---

## Output stamp

交付 enrichment 时，macrostructure stamp 记录选择：

```css
/* Hallmark · macrostructure: Marquee Hero · H1 hero knobs: size=xxl, alignment=left-bias
 * enrichment: E1 Clipped-Edge Video · clip=right, aspect=16/10, frame=hairline
 * polish: HP3 Cursor-spotlight (scoped to hero, reduced-motion fallback pinned at 50%/30%)
 * nav: N5 Floating pill · footer: Ft5 Statement
 * craft: tier-A CSS art (no real video — pure custom-built mockup)
 * theme: Linen · accent: steel-blue ~3% · studied: no
 */
```

如果没有使用 polish pattern，省略 `polish:` 行；不要假装有。Enrichment 同理。

这会向未来的 Hallmark runs（以及 audit verb）说明选择了什么、如何选择。它也让用户在一个地方看到推断，并在任何不对时重定向。

---

## Common mistakes — and the fixes

- **每个 brief 都默认 E5 illustration。**多数 heroes 不想要 illustration。先考虑 E0（typography only）；当有一个*东西*可展示时再考虑 E1–E4；只有 illustration 真正匹配 tone 时才用 E5。
- **把 stock Lottie checkmark 当 hero animation。**这是用 tier E 跳过 A–D。用 pure CSS 构建 checkmark（`stroke-dasharray` animate 画出 tick）；只需 8 行。
- **到处加 grain background。**Grain 是 treatment，不是默认值。已有一半 themes 自带 texture（Riso、Linen、Specimen）。不要叠两层。
- **把 abstract background 当 hero。**它不是。Headline 才是。Background 是 paper。
- **交付未修改的 Storyset SVG。**这是未落地的 tier D：library look。至少把颜色定制到 anchor hue；能重构就重构。
- **Mobile 上使用 clipped-edge video。**在 375-px viewport 上 clip 会读成 broken。始终在 < 60 rem 时 collapse to stacked。
