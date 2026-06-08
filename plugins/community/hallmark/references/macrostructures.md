# Macrostructures

二十一个具名 landing-page 形状。**写代码前先选一个。**每个都是完整指纹：heading 放置、body 组合、divider 语言、button 声音、image 处理、reveal pattern，全部作为一个具名选择打包。选择 macrostructure 比从 `structure.md` 独立挑六个轴更快、更少出错，也**必然更有变化**。

Specimen macrostructure（左边距编号标签 + 巨大 serif + 非对称 spans + typographic CTA）只是这二十一个之一。**它不再是默认值。**只有当 brief 明确偏 editorial、foundry-adjacent，或用户点名时才使用它。

## Diversification rule（强制）

选择前，检查目标 codebase 的任意现有 CSS 文件里是否有 `/* Hallmark · macrostructure: <name> · ... */` 注释。如果找到，**你的选择必须是不同的 macrostructure。**同一项目中连续两个 Hallmark 输出不得共享同一个 macrostructure。

当 brief 很含糊（没有 theme、没有 tone）时，先从下面**前十个**里选择，再考虑 11–21。前十个刻意覆盖最强的非 Specimen 形状，能覆盖约 80% 的 briefs。

## Hero polish patterns

Hero macrostructures（Marquee Hero · Stat-Led · Quote-Led · Letter · Photographic · Clipped）允许在基础形状之上叠加一个可选 **polish pattern**：HP1 Vertical-rail · HP2 Marquee-overflow · HP3 Cursor-spotlight · HP4 Decorative-numeral。Polish patterns 是**结构性**的（layout / type / motion），不是装饰；它们与 hero macrostructure 并列存在，而不是替代它。目录与适用条件见 [`hero-enrichment.md`](hero-enrichment.md) § Hero shape polish。

一个 hero 可以带一个 enrichment archetype（E1–E8）和一个 polish pattern（HP1–HP4），但绝不能同时带两个 polish patterns。决策顺序是：macrostructure → enrichment? → polish? → space discipline。

## Nav and footer voice

每个 macrostructure 也隐含一个 **nav archetype**（N1–N9）和一个 **footer archetype**（Ft1–Ft8）。默认值位于 [`component-cookbook.md`](component-cookbook.md) § Navigation 和 § Footers 的 routing tables。不要只交付 hero macrostructure 而不同时选择 nav + footer；它们是页面形状的一部分，不是可选 chrome。

---

## The 21 macrostructures — index

**选一个。然后只读取 `references/macrostructures/` 中对应的那一个文件。**不要加载整个目录。Slugs 稳定；diversification rule 会从 `/* Hallmark · macrostructure: <name> · ... */` stamp 中读取 `<name>`。

- **01 · Bento Grid** — 不同尺寸的模块块组成不规则网格。每个块都是一个 feature、一段 quote、一张 image 或一个 stat。视觉节奏来自尺寸变化，而不是卡片统一。 [`macrostructures/01-bento-grid.md`](macrostructures/01-bento-grid.md)
- **02 · Long Document** — 读起来像 memo、letter 或 journal entry。没有 marketing structure。连续 prose 搭配 inline section heads。页面是关于产品的*文学文本*。 [`macrostructures/02-long-document.md`](macrostructures/02-long-document.md)
- **03 · Marquee Hero** — hero 就是首屏页面本身。一个大胆 statement 或 visual 填满 viewport。首屏没有 subhead，没有 CTA。首屏以下页面变成另一种形状（list、grid、prose）。 [`macrostructures/03-marquee-hero.md`](macrostructures/03-marquee-hero.md)
- **04 · Stat-Led** — hero 是巨大数字：metric、count 或 percentage。后续所有内容都支撑或限定它。Data 就是 narrative。 [`macrostructures/04-stat-led.md`](macrostructures/04-stat-led.md)
- **05 · Workbench** — frame 中的产品截图是主要内容。页面是对 app 使用过程的 guided tour。少一点 marketing copy，多一点“你会用它做这些事”。 [`macrostructures/05-workbench.md`](macrostructures/05-workbench.md)
- **06 · Conversational FAQ** — 大胆 questions，简短 answers。页面读起来像产品的一场诚实访谈。通常每组 Q/A 是可折叠 accordion。 [`macrostructures/06-conversational-faq.md`](macrostructures/06-conversational-faq.md)
- **07 · Manifesto** — 论战式大字。Declaration energy。页面先告诉读者该相信什么，再告诉他们该买什么。常带 political-poster aesthetic。 [`macrostructures/07-manifesto.md`](macrostructures/07-manifesto.md)
- **08 · Photographic** — 单张巨大 image 主导每一屏。文字是小注释，不是 headline。设计先说 *look*，再说 *read*。 [`macrostructures/08-photographic.md`](macrostructures/08-photographic.md)
- **09 · Quote-Led** — hero 是带 attribution 的 pull-quote。Headline 借用可信度，而不是品牌自己的声音。页面以 social proof 开场。 [`macrostructures/09-quote-led.md`](macrostructures/09-quote-led.md)
- **10 · Specimen** — 左边距编号标签、巨大 serif display、非对称 column spans、hairline rules、typographic-only CTA、慷慨留白。Editorial / type-foundry energy。 [`macrostructures/10-specimen.md`](macrostructures/10-specimen.md)
- **11 · Catalogue** — 同类事物变体的统一网格：typefaces、colour palettes、product SKUs。页面是 inventory 的 visual index。 [`macrostructures/11-catalogue.md`](macrostructures/11-catalogue.md)
- **12 · Letter** — 第一人称、书面、亲密。以问候开头（“Dear friend,”）。首屏没有按钮。读起来像 founder 的私人便条。 [`macrostructures/12-letter.md`](macrostructures/12-letter.md)
- **13 · Index-First** — 页面本身就是 link list。没有 hero image，没有 narrative flow。纯 navigation 即 design。 [`macrostructures/13-index-first.md`](macrostructures/13-index-first.md)
- **14 · Narrative Workflow** — 用 numbered stages 讲述用户如何随时间使用产品。每个 section 是一个 phase（1.0 → 2.0 → 3.0 → 4.0）。页面是一条 process timeline。 [`macrostructures/14-narrative-workflow.md`](macrostructures/14-narrative-workflow.md)
- **15 · Split Studio** — Diptych。每个主要 content block 都把屏幕分成两半：一边文字，一边 proof。配对方向沿页面交替。 [`macrostructures/15-split-studio.md`](macrostructures/15-split-studio.md)
- **16 · Feature Stack** — Sticky left pane（label / description）+ scroll-synced right pane（截图循环展示相关细节）。Cinematic pacing。 [`macrostructures/16-feature-stack.md`](macrostructures/16-feature-stack.md)
- **17 · Type Specimen** — Typeface 就是 design。适用于 foundry homepage 或把 custom typeface 当作品牌 proof 的 design-system marketing。 [`macrostructures/17-type-specimen.md`](macrostructures/17-type-specimen.md)
- **18 · Portfolio Grid** — 可筛选 project cards。Studio 或 designer homepages，作品本身就是产品。 [`macrostructures/18-portfolio-grid.md`](macrostructures/18-portfolio-grid.md)
- **19 · Map / Diagram** — 一个大型 spatial diagram 组织页面：flowchart、floor plan、network graph、system map。信息以*空间*方式布局，而不是线性方式。 [`macrostructures/19-map-diagram.md`](macrostructures/19-map-diagram.md)
- **20 · Ecosystem Index** — 多种 discovery surfaces：featured / latest / by category / by people。平台价值来自 emergence 与 browsing，而不是 declaration。 [`macrostructures/20-ecosystem-index.md`](macrostructures/20-ecosystem-index.md)
- **21 · Component Playground** — Interactive code-and-preview blocks 是页面主要内容。每个 block 预览一个东西并展示如何 copy-paste。 [`macrostructures/21-component-playground.md`](macrostructures/21-component-playground.md)

---

## SaaS page sequence

当 macrostructure 是 **Bento Grid · Stat-Led · Workbench · Marquee Hero**，且 brief 是 B2B SaaS marketing page 时，大致按以下顺序交付 sections。没有一项是强制的，但跳过超过两项会显得“页面不完整”：

1. **Hero** — macrostructure-specific（Bento、Stat、Workbench、Marquee）。两个 CTAs（primary action + secondary “Talk to sales”）。
2. **Social proof / logo wall** — 6–8 个 monochrome customer logos。（见 [`assets.md` § Logo walls](assets.md)。）
3. **Features** — 3–6 张 feature cards，随 macrostructure 变化（Bento 内联放入网格；Stat-Led 通常放在 supporting-stats grid 之后）。
4. **Testimonials** — 2–4 张 quote cards。Pull-quote + name + role + company。Photo 可选。避免 “We use [product] every day” 这类语言；quote 应具体到 use case（“Foundry got us SOC2 in five weeks. We wrote zero policies ourselves.”）。
5. **Pricing** — 2–3 个 tiers，放在 comparison table 中。每 tier 有 feature checklist。Middle tier 有 recommended-tier badge。展示实际价格；每个 tier 都写 “Contact sales for pricing” 是品牌不信任买家的信号。
6. **FAQ** — 5–10 个 questions。Conversational FAQ archetype 在这里适用（见 Macrostructure 9）。
7. **Final CTA strip** — 单个 button + 一句 prompt。
8. **Footer** — index-style 或 tabular，并与 theme 匹配。

每个 section transition 使用 theme-appropriate vertical spacing，主要 sections 之间至少 `--space-3xl`。不要把 sections 再拆成带 sub-rules 的“rows”；section break 本身就是视觉节奏。

**SaaS sections 的 voice rules：**

- **Pricing：**展示实际价格。每个 tier 都 sales-led pricing（“Contact us”）表示品牌不信任买家。
- **Testimonials：**包含被引用者的 role *和* company。抽象的 “Engineering Manager” testimonials 是 slop。如果 brief 是真实产品，用真实姓名；如果 brief 是 placeholder，用可信的姓名，绝不要用 “Jane Doe” / “John Smith”（gate 20）。
- **FAQ：**像真人一样回答，而不是 sales doc。“Yes — Stripe and Adyen are both supported out of the box” 胜过 “Our platform integrates with leading payment providers.”
- **CTA strip：**一个 button。不是两个。重复本身就是 call to action。

这个 sequence **不是**拿来硬套的 template，而是一份“应出现什么”的 recipe。Macrostructure 决定每个 section *如何*呈现。Bento Grid 页面把 features 和 proof 交织在网格里；Stat-Led 页面把它们自上而下排序；Marquee Hero 页面让 marquee 承担 social-proof 工作。

对非 SaaS work（Editorial、Manifesto、Letter、Long Document、Quote-Led），这个 sequence **不适用**。Bakery 不需要 pricing tier comparison。

---

## How to pick

1. **阅读 brief。**记下强烈指向某个 macrostructure 的词（“data heavy”、“tell a story”、“a list of links”、“many small features”、“personal note”）。
2. **检查 codebase** 是否已有 `/* Hallmark · macrostructure: <name> · ... */` stamp。如果有，从候选中排除该 name。
3. **用 “Reach for it” lines** 将 brief energy 匹配到 macrostructure。多数 briefs 会匹配 2–4 种 patterns；选择一个与该用户过去输出在类别上距离最远的。
4. **写代码前用 plain text 声明选择：**“Macrostructure: Bento Grid.” 然后写代码，并在 CSS 开头放置 required stamp。
5. 如果真的难以取舍，给用户三个来自*不同类别*的选择（例如 Bento + Long Document + Manifesto），让用户选。

目标不是为了新奇而新奇。目标是 Hallmark 为两个不同 briefs 构建的两个页面，看起来像不同 sites，而不是同一个 template 的不同 colour-swaps。
