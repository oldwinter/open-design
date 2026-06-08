# Structure

多数 AI 生成 UI 在视觉上不同，但结构上相同：hero → three features → CTA → footer。相同的 heading 位置、相同的列数、相同的组件词汇。**结构雷同才是 AI 指纹，不是视觉雷同。**Hallmark 的职责就是打破它。

本文件目录化列出结构变化的**primitive axes**。对多数构建，不应从本文件逐轴组合 fingerprint；应改从 [`macrostructures.md`](macrostructures.md) 选择具名 whole-page shape，这更快，也能避免 default-attractor sameness。只有当你需要偏离某个 macrostructure 的默认值一两个轴，或审计现有页面并需要命名你看到的结构时，才使用本文件。

下面这些轴仍是 building blocks。每个轴选一个选项，形成一个 *structural fingerprint*。两个页面不应共享同一个 fingerprint。

## The six axes

### 1. Section-heading placement

Section title 在空间里住在哪里？每页选一个。

| Pattern | Description | Real-world reference |
| --- | --- | --- |
| **Left-margin** | ⚠️ **仅 opt-in，绝不默认。** Eyebrow / number / label 位于窄左列，heading + body 在右侧。用于 SaaS / dev-tool / consumer pages 时会读成 templated-editorial AI tell。仅当用户明确要求 editorial / specimen layout，且 heading 未与 eyebrow 并排时允许（label 可放在 body copy 旁；heading 必须独占上方一行）。eyebrow-left / heading-right 变体被 slop-test gate 66 彻底禁止。 | The New York Times Magazine；我们的 Specimen theme，且仅在用户明确要求这种 voice 时。 |
| **Hanging** | Heading 漂浮在 section 上方的负空间里，带慷慨呼吸感。 | David Airey 的 portfolio；minimal modernist。 |
| **Centered display** | Heading 占据中心舞台，对称。正式、友好；如果到处使用会显得静态。 | Apple product pages；Atelier-style runway invitations。 |
| **Bottom-aligned** | Heading 锚在 section 的*底部*，内容从上方流动。反转层级。 | Swiss editorial；Newsprint masthead-below pattern。 |
| **Overlapping image** | Heading 叠在 photography 或 colour block 之上。要求强对比。 | Pentagram project pages；Manifesto posters。 |
| **Sticky / pinned** | Heading 在内容滚动时保持可见，作为 orientation aid。 | GSAP ScrollTrigger docs；Almanac-style references。 |
| **Numbered display** | ⚠️ **仅 opt-in，绝不默认。** “01.” 配 rule line，heading 紧邻其右。程序化、序列化。slop-test gate 66 禁止它用于默认 SaaS / consumer / dev-tool pages（tag-beside-heading pattern 是 templated tell）。仅当用户明确要求 ordinal / chaptered numbering，且 macrostructure 是 Long Document、Manifesto 或 Catalogue numbered 时允许。即便如此，也优先使用 stacked 变体：number 单独一行放在 heading 上方。 | Rauno Freiberg 的 portfolio，且仅当用户明确调用这种 voice 时。 |
| **Inline with body** | 没有 section break，heading 从 paragraph flow 中浮现。对话感。 | Medium articles；long-form essays。 |

### 2. Body composition

Long-form content 如何布局，而不是“65ch 单列”？

| Pattern | When | Reference |
| --- | --- | --- |
| **Single column** | Narrative-first、reading-led。editorial 的默认值。 | Most blogs。 |
| **Two-column asymmetric** | 宽 body + 窄 margin column，用于 metadata、captions、marginalia。 | Semplice；Linen-style。 |
| **Multi-column justified** | Newspaper rhythm；2–3 个窄列、hyphenated、justified。 | The Guardian；FT.com；Newsprint。 |
| **Marginalia** | Sidenotes 位于慷慨 outer margin，与 core text 并行。 | Tufte CSS；scholarly publications。 |
| **Three-column equal** | Encyclopedia / reference / data-density。分块、可扫读。 | Wikipedia；Whole Earth Catalog；Almanac。 |
| **Full-bleed with margin reset** | Body 维持 65ch，但 pull-quotes 或 images bleed 到 full-viewport。通过 scale change 强调。 | Medium pull-quotes；Manifesto sections。 |
| **Asymmetric spans** | Columns 在宽度上变化；通过 CSS Grid 有意使用 2-1-3 ratios。 | Locomotive；portfolio sites。 |

### 3. Divider language

Sections 如何分隔？

- **Hairline rule.** 0.5–1px 线，inset 或 full-bleed。Hallmark 默认；modernist。
- **Ornament.** Fleuron（`❦`）、centered dot、geometric mark。Salon、editorial classic。
- **Negative space.** 完全没有 rule，gap *就是* divider。Apple、Linen、modern minimalism。
- **Bleed-color block.** Section background colour 改变；颜色边界就是 divider。Manifesto、Brutal。
- **Double rule / typographic mark.** 顶部 + 底部紧密双线；在 Newsprint 中表示 masthead。

### 4. Button voice

CTA 如何发生？

- **Outlined.** 边框、无填充。Secondary 或安静 primary。Hallmark 默认。
- **Unstyled link.** 下划线文字，无 box。信任排版。Editorial / craft sites。
- **Oversized solid.** 大块 accent colour，full padding。Manifesto、Sport、statement-CTA。
- **Typographic-only.** 具有特定 weight/size/colour 的词，无 rule、无 box。像一个恰好可点击的 headline。Atelier、Salon。
- **Form-as-CTA.** Button 是 inline form 的一部分；action 就是 fill-this-field。Newsletter signups。

### 5. Image treatment

Imagery 如何进入页面？

- **Full-bleed.** 边到边、viewport width，image 作为 architecture。Manifesto、Sport。
- **Tightly cropped.** 小、刻意、按 grid 定尺寸。Almanac、Atelier still-life。
- **Inline with text.** Image 按 paragraph rhythm 流动，尺寸贴合 measure。Editorial、Newsprint。
- **Margin-aligned.** Image 位于宽 outer margin，body 不被打断。Linen、Tufte。
- **None.** 无 imagery；typography 承担全部。Specimen、Manifesto-as-text-poster、Terminal。

### 6. Reveal pattern

Page-load 和 scroll 时发生什么？

- **Fade-up stagger.** 默认。微妙、广泛安全；用 exponential ease-out 只编排一次。
- **Horizontal sweep.** 元素从一侧滑入；clip-path 或 transform。方向性动量。
- **Type-unmask.** clip-path 在文字上打开。当 type 是 hero 时优雅。
- **Number-tick.** Counter 从 0 到最终值；用于 stats、prices、dates。Almanac、dashboards。
- **Typewriter.** 逐字符；诚实面对媒介。仅 Terminal。**Decorative-graphics constraint：**Terminal output 不得包含独立 scanlines、脱离语境的 blinking cursors 或随机 ASCII art。terminal cursor（`▮`）只允许位于 typed command 内部（install code block、N8 Terminal command nav），并表示诚实的“你会接着输入” affordance。hero 角落里浮着的 cursor 是布景装饰；移除它。见 [`microinteractions.md`](microinteractions.md) Caret blink row。
- **None.** 一切加载后直接存在。有些 sites 不应该动。Pentagram、brutalist sites。

## Picking a fingerprint

Fingerprint = 每个轴一个选择。共有 8 × 7 × 5 × 5 × 5 × 6 = **42,000** 种 fingerprints。永远用不完。

两条规则支配选择：

1. **Coherence.** 一个带 multi-column justified body 的 Newsprint 页面，应使用 typographic CTA，而不是 oversized solid button；它们不属于同一个 *world*。选择同属一个世界的组合。
2. **Anti-repetition.** 同一 session 连续构建的页面，不得在六个轴中共享超过三个。如果上一页用了 left-margin headings + single column + hairline divider + outlined button，这一页至少要在其中三个轴上不同。

## Theme-suggested fingerprints

每个 Hallmark theme 都有默认 structural fingerprint。仅当 brief 指定 theme 时才把它们当 starting points。**多数构建应改从 [`macrostructures.md`](macrostructures.md) 选择 macrostructure**：themes 描述*视觉表面*，macrostructures 描述*页面形状*；后者更能驱动变化。

下表按 theme 字母顺序排列，以中和“第一行 = 默认”的吸引力。没有任何 theme 是默认值。**Nav** 与 **Footer** 列命名 [`component-cookbook.md`](component-cookbook.md) 中的默认 archetype；该文件的 routing tables 列出了可接受替代项。

| Theme | Heading | Body | Divider | Button | Image | Reveal | Nav | Footer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Almanac | Sticky | Three-column equal | Hairline | Outlined | Inline | Number-tick | N3 Side-rail | Ft3 Index columns |
| Atelier | Centered | Single column | Negative space | Typographic-only | Tightly cropped | Type-unmask | N9 Edge-min | Ft6 Letter close |
| Aurora | Hanging | Single column | Negative space | Typographic-only | None | Fade-up | N5 Floating pill | Ft5 Statement |
| Bloom | Centered | Single column | Negative space | Typographic-only | None | Fade-up | N5 Floating pill | Ft5 Statement |
| Brutal | Overlapping image | Full-bleed reset | Bleed-colour | Oversized solid | Full-bleed | Horizontal sweep | N7 Brutal slab | Ft8 Marquee scroll |
| Coral | Centered | Single column | Negative space | Outlined | Margin-aligned | Fade-up | N5 Floating pill | Ft1 Mast-headed |
| Garden | Hanging | Marginalia | Negative space | Unstyled link | Margin-aligned | None | N9 Edge-min | Ft6 Letter close |
| Halo | Centered | Single column | Negative space | Outlined | None | Fade-up | N5 Floating pill | Ft5 Statement |
| Linen | Hanging | Two-column asymmetric | Negative space | Unstyled link | Margin-aligned | Fade-up | N6 Masthead | Ft1 Mast-headed |
| Manifesto | Overlapping image | Full-bleed reset | Bleed-colour | Oversized solid | Full-bleed | Horizontal sweep | N7 Brutal slab | Ft5 Statement |
| Midnight | Numbered display | Single column | Hairline | Typographic-only | None | Typewriter | N5 Floating pill | Ft2 Inline single line |
| Newsprint | Bottom-aligned | Multi-column justified | Double rule | Outlined | Inline | None | N6 Masthead | Ft4 Dense colophon |
| Plume | Hanging | Single column | Bleed-colour band | Outlined | Margin-aligned | Fade-up | N9 Edge-min | Ft1 Mast-headed |
| Editorial | Hanging | 2-col asym hero / single below | Hairline | Outlined | Tightly cropped or generated (Tier C) | Fade-up | N6 Masthead | Ft1 Mast-headed |
| Quiet | Centered | Single column narrow | Negative space | Outlined pill | None | None | N9 Edge-min | Ft2 Inline single line |
| Riso | Centered | Single column | Negative space | Outlined | Inline | None | N7 Brutal slab | Ft8 Marquee scroll |
| Salon | Centered | Single column narrow | Ornament (fleuron) | Outlined | Tightly cropped | None | N6 Masthead | Ft1 Mast-headed |
| Specimen | Left-margin | Asymmetric spans | Hairline | Outlined | None | Fade-up | N5 Floating pill | Ft2 Inline single line |
| Sport | Numbered display | Asymmetric spans | Bleed-colour | Oversized solid | Full-bleed | Horizontal sweep | N7 Brutal slab | Ft8 Marquee scroll |
| Studio | Centered | Asymmetric spans | Negative space | Typographic-only | Tightly cropped | Fade-up | N7 Brutal slab | Ft3 Index columns |
| Terminal | Inline (with `>` prompt) | Single column | Negative space | Typographic-only `[ go ]` | None | Typewriter | N8 Terminal command | Ft4 Dense colophon |
| Violet | Hanging | Single column | Negative space | Outlined | None | Fade-up | N5 Floating pill | Ft2 Inline single line |

## Anti-patterns of structural sameness

拒绝这些 structural fingerprints。它们是 AI-template fingerprint。

- **The SaaS hero.** Centered display heading、centered subhead、centered pill CTA、full-viewport hero、fade-up。最容易被认出的 AI structural fingerprint。
- **The 3-feature row.** 三个等宽列，icon-above-heading-above-two-line-body，24px gap，相同 card padding。
- **The benefits-then-CTA.** 一列 feature bullets 后接一个 “Sign up” button block。节奏可预测。
- **The everything-fades-in.** 每个 section 都拿同一个 scroll-triggered fade-up animation。页面像 presentation。
- **The carbon-copy footer.** Logo、四列 links、social row、copyright。你见过的所有站点都长这样。

## When you don't know

如果 brief 没有暗示 fingerprint，用户也没有选择 theme，**不要默认**。从 brief 中读 domain word（audio、commerce、docs、agency、restaurant、fashion、fintech、personal 等），并给用户提供**三个来自截然不同类别、且适配该 domain 的 macrostructures**。然后让用户选择。

三选项的意义是形成对比：grid-led shape、document-led shape、poster-led shape。来自截然不同类别的选择会制造变化；提供三个近亲选项，就是这个 skill 要消灭的 AI tell。

### Domain → trio（提供这三个；绝不默认）

如果无法推断 domain，问一个问题：“what does this thing do?”，然后再映射。

| Domain words in the brief | Trio to offer |
| --- | --- |
| **podcast, audio, music, playlist, listening** | **Photographic** · **Quote-Led** · **Letter** |
| **shop, store, product, merch, commerce, ecom** | **Catalogue** · **Photographic** · **Bento Grid** |
| **docs, CLI, SDK, API, library, open source, developer reference** | **Workbench** · **Long Document** · **Component Playground** |
| **platform, infra, observability, dashboard SaaS, B2B tool, try-or-talk-to-sales** | **Bento Grid** · **Workbench** · **Stat-Led** |
| **agency, studio (work-led), case studies, multi-project portfolio, freelance creative** | **Portfolio Grid** · **Split Studio** · **Index-First** |
| **personal one-pager, individual, about-me, resume (no case studies)** | **Long Document** · **Letter** · **Index-First** |
| **restaurant, café, bar, food, kitchen, menu** | **Photographic** · **Long Document** · **Catalogue** |
| **fashion, apparel, beauty, lookbook** | **Photographic** · **Catalogue** · **Marquee Hero** |
| **fintech, banking, payments, invest, trading** | **Stat-Led** · **Workbench** · **Long Document** |
| **manifesto, campaign, cause, advocacy, political** | **Manifesto** · **Quote-Led** · **Stat-Led** |
| **editorial, foundry, magazine, type, specimen** | **Specimen** · **Long Document** · **Type Specimen** |
| **product launch, SaaS marketing, B2B** | **Bento Grid** · **Workbench** · **Stat-Led** |
| **conference, event, speaker, keynote** | **Marquee Hero** · **Manifesto** · **Photographic** |
| **fallback (genuinely no signal)** | **Bento Grid** · **Long Document** · **Manifesto** |

**关于 splits 的说明。**某些 domain 需要按 intent 拆分。*Developer-tool docs* 和 *developer-tool marketing* 都包含 “developer”，但 docs page 需要 Workbench walkthrough；marketing page 需要 Bento Grid + Stat-Led，让 SRE 能在 30 秒内读懂 value prop。*Personal* 也是如此：one-pager about-me 和多项目 case studies portfolio 是*不同 briefs*；前者需要 prose（Long Doc / Letter），后者需要 Portfolio Grid / Split Studio。如果 brief 含糊，**先问一个问题**澄清（“docs walkthrough or marketing landing?”、“one-pager or case studies?”），再选择 trio。

如果用户耸肩说“你选”，读取项目 CSS 中的 `/* Hallmark · macrostructure: ... */` stamp；在 trio 里，与 stamped family 类别距离最远的就是正确选择。连续两次输出绝不能来自同一 family：绝不连续两个 editorial macrostructures，绝不连续两个 grid-led macrostructures。

如果用户只回答一个含糊 tone word（“modern”、“clean”、“professional”），那不算 feeling。用 domain trio 重新询问。

表格底部 fallback 行是*最后*手段：只有当没有任何 domain words，且用户确实无法选择时才使用。实践中几乎每个 brief 都包含 domain word；使用 fallback 通常说明你没有读仔细。
