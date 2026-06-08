# Custom theme — protocol

仅当用户在 Design flow 的 Step 1 中选择 **custom** theme route 时加载。Custom 会生成一套**针对本 brief 调优的完整 OKLCH palette + free-font pairing**；它是一次性 theme，直接内联写入页面 `:root`，不是永久 catalog entry。

**自由在于组合，不在于规则。**[`color.md`](color.md)、[`typography.md`](typography.md) 和 [`anti-patterns.md`](anti-patterns.md) 中的每条约束仍然适用。65 个 slop-test gates 原样触发。Step 5 preview block 会在任何 code 输出前，用 plain text 展示 palette + pairing，方便用户重定向。

## Two words, plain English

- **catalog** — named-theme catalogue。Hallmark 的 22 个 themes（Specimen、Atelier、Brutal、Salon、Newsprint、Linen、Studio、Manifesto、Terminal、Midnight、Almanac、Garden、Quiet、Riso、Sport、Bloom、Coral、Violet、Aurora、Halo、Plume、Editorial）。每个都是 paper-band、display-style 和 accent-hue 的固定组合。Rotation rule 会循环它们，让连续两次运行读起来不同。**这是默认值。**多数 briefs 使用它。
- **custom** — made-to-measure。为单个 brief 专门构建的一次性 palette + font pairing。Skill 会构建 OKLCH values、选择 fonts 并 stamp 页面，但**不会**把 catalog 扩展出一个新 theme。Catalog 背后的规则（paper L bands、accent chroma caps、font ban list、slop-test gates）仍全部适用；只有*组合*是 per-brief。

## When to surface this fork — Step 1 trigger signals

Hallmark **不得**在每个 prompt 上都提供 catalog-vs-custom。这是摩擦，不是纪律。只有当 brief 带有以下信号之一时，才暴露这个 fork：

1. **Explicit ask** — 用户输入 `custom`、"custom theme"、"tailored to our brand"、"make it ours"、"something unique"、"play around with the colors and fonts"、"I want my own palette"。
2. **Named brand colour** — 用户给出明确 anchor colour，形式可以是 hex / OKLCH / brand name。例如："use our terracotta"、"the brand red is hex #c0392b"、"anchor on sea-blue"。
3. **Catalog 承载不了的 multi-attribute aesthetic** — 三个或更多 vibe words 指向具体且 off-catalog 的感觉。例如："moss, lichen, soft pink, herbal" / "sun-drenched, market-day, carbon-black" / "late-night, neon, brutalist deli"。与 22 个 catalog themes 对照；如果没有单个 catalog theme 在 vibe 的一个 axis-step 内，就触发 fork。**单个 adjective（"warm"、"technical"、"playful"）不是信号；那只是 tone，catalog 已经能承载。**
4. **Brand-mood reference attached** — 用户附带 colour swatch、moodboard、Pantone chip。（如果附的是*页面* screenshot，route 到 `study`；custom 用于 brand colour / mood，study 用于 design DNA。）

如果任一信号触发，选 theme 前先问一个简短 follow-up：

> *"This brief reads like a custom palette would fit better than the 22 named themes. Want me to construct a custom OKLCH palette + free-font pairing tuned to <one-line summary of the vibe>, or stay on the catalog for variety + speed?"*

等待用户回答。如果用户说 custom（或 yes / go）→ 从 § A 继续本协议。如果用户说 catalog（或 no / stay catalog）→ 放弃 fork，继续 catalog route。**默认 catalog**：沉默 route 到 catalog，不是 custom。

如果**没有**信号触发，完全不要提 fork。静默继续 catalog flow。

---

## § A · The one follow-up question

一旦用户把 `custom` 命名为 theme route，只问**一个**问题，用**一条**消息：

> *"Custom needs one input — describe the brand's vibe in 4–8 words. Examples: 'archival warmth, hand-set, no varnish' · 'industrial precision, cool, technical' · 'moss, lichen, soft pink, herbal' · 'sun-drenched, market-day, carbon black' · 'late-night, neon, brutalist deli'.*
>
> *Optional second input: an anchor colour — hex, OKLCH, or a name like 'terracotta', 'sea-blue', 'forest-green', 'dusty-pink'. If you skip it, I'll pick one from the vibe."*

**不要再问其他任何问题。**Audience / use / tone（Step 1）加上 brand vibe 已经足够。让用户指定 paper lightness 或 font weights 不是 model 该做的事，那是 model 的工作。

如果用户只给两三个词（"sun-drenched"），继续执行；下面的 recipe 能提取足够信息。如果用户给一段话，接受它，但在 stamp 中压缩为 4–8 words。

---

## § B · Palette construction

按以下顺序构建 palette。每一步都在遵守对应规则；不要复述规则，只应用规则。

### B.1 · Anchor accent first

- 将用户命名或 hex anchor 转为 OKLCH。
- 按 [`color.md`](color.md) § "Accent — the discipline"，将 chroma clamp 到 **0.12–0.20**。
- 如果用户跳过：从 vibe 推导 hue：*warmth* → 30–60°；*technical/industrial* → 220–250°；*botanical/moss* → 130–160°；*late-night/neon* → 280–320°；*sun-drenched/market* → 60–80° amber。保持 chroma 0.12–0.16（中等饱和；saturation 来自与 neutral 的对比，而不是 chroma 本身）。

### B.2 · Paper

- 从 vibe 推导 paper L：
  - bright/airy/breakfast/hand-set → **L 95–98 %**（warm-tinted）
  - archival/editorial/restrained → **L 92–95 %**（warm-tinted）
  - technical/clinical/spec-sheet → **L 98–100 % near-white**（cool-tinted；可等于 #fff，但下游 neutrals 要 tinted）
  - dark/restless/late-night/manifesto → **L 12–18 %**（anchor-tinted）
- 按 [`color.md`](color.md) § "Neutral tinting"，**始终让 paper 朝 anchor hue tint，chroma 0.005–0.020**。只有当 ink + accent + greys 承载 chroma 时，pure-white #fff 才允许；paper 本身不能在*两个方向*都 chroma 0。
- Paper-2（一个 elevation step）：从 paper 起按 ±2–4 % L 调整。
- Paper-3（可选第二 step）：从 paper 起按 ±5–7 % L 调整。Minimal palettes 可跳过。

### B.3 · Ink

- 如果 paper L < 50：ink L **88–96 %**。
- 如果 paper L ≥ 50：ink L **16–24 %**。
- Ink chroma **0.005–0.014**，朝 anchor tint（更暗或更亮的一阶，绝不 neutral）。
- Ink-2（secondary text）：从 ink 起向 paper 方向移动 4–8 % L。同一 hue family。

### B.4 · Supporting greys

在 paper 和 ink 之间按约 6–10 % L 步进，全部朝 anchor tint，chroma 0.005–0.018：

- `--color-rule` — dividers；light paper 上 L 约 70–82 %，dark paper 上 L 约 26–34 %。
- `--color-rule-2` — secondary dividers；比 rule 更靠近 paper 4–6 % L。
- `--color-muted` — de-emphasised text；L 约 38–56 %。
- `--color-neutral` — mid-grey equivalent；L 约 30–56 %。

这些不是任意值。L-step 让 palette 具备**typographic depth**，而不是依赖 accent。

### B.5 · Focus

- 与 accent 相同 hue，chroma 略高（0.18–0.22），以保证可见。
- L 与 accent 相同 ±5 %。
- 只用于 `:focus-visible`；按 [`microinteractions.md`](microinteractions.md) § "Focus is a first-class state"，必须立刻显示。

### B.6 · Accent-ink（accent 上的 overlay text colour）

- 如果 accent L > 50：用 ink（accent fill 上的深色文字）。
- 如果 accent L ≤ 50：用 paper（accent fill 上的浅色文字）。
- 按 [`color.md`](color.md) 验证 body **APCA contrast ≥ 7:1**，large text ≥ 3:1。

### B.7 · Verification

- **Gate 8**（no pure #000 / #fff base）：paper 和 ink 都 chroma > 0。Pass。
- **Gate 24**（no zero-chroma neutrals）：每个 grey 都 chroma ≥ 0.005。Pass。
- **Gate 25**（accent ≤ 5 % footprint）：规划 accent 在页面中的角色（active state、一个 wordmark dot、一个 CTA fill）。不要把整个 section 铺满 accent。

---

## § C · Font pairing

Custom 从 [`typography.md`](typography.md) 中的七组 tone-pairings 抽取：Editorial、Technical、Brutalist、Soft、Luxury、Playful、Austere、Workshop。每个 tone 都有一个 **free baseline** 和一个 **paid upgrade**。

### C.1 · The freedom

Catalog 会把 Display-from-tone-X 与 Body-from-tone-X 配对。**Custom 可以混合 tones**，这正是它的意义：

- Editorial display + Technical body（italic Fraunces wordmark + Geist body）— 适用于 academic-tone SaaS。
- Brutalist display + Editorial body（Anton + Newsreader italic）— 适用于 left-leaning manifesto magazine。
- Playful display + Austere body（Bricolage Grotesque + Inter Tight）— 适用于 creator-tool brand。
- Luxury display + Technical body（Cormorant Garamond + JetBrains Mono）— 适用于 hand-crafted dev-tool。

从任意 tone 的 columns 中选择**一个 display face** 和**一个 body face**。如果页面包含 code 或 tabular data，可选 mono。

### C.2 · The discipline

- 除非用户确认已有 paid licences，否则**只用 free baseline**。按 [`typography.md`](typography.md) § "The discipline"："Never name a paid font in code without confirming the user is licensed."
- 按 [`typography.md`](typography.md) § "Banned defaults"，**banned defaults 仍然 banned**：Inter / Roboto / Open Sans / Poppins / Lato / Work Sans / DM Sans / Montserrat / system-ui 作为 display 都会触发 Gate 1。
- 可用时**优先 variable fonts**（Fraunces、Bricolage Grotesque、Newsreader、Geist、EB Garamond、Inter Tight），它们支持 optical-size 和 weight axes，可做更紧的 typographic control。

### C.3 · The pair must read

选出 display + body 后，在脑中渲染页面：

- Display face 是否按 [`typography.md`](typography.md) § "Commit to extremes" 具备足够 weight contrast（200/400 旁边是 700/900）？
- Body face 在所选 body size（≥ 14 px floor；默认 1 rem）和所选 measure（45–75 ch）下是否可读？
- 如果 display 是 mono 且 body 也是 mono，只有当页面本身*就是* design choice（Terminal-aesthetic、真正 single-font specimen）时才允许。见 [`typography.md`](typography.md) line 7。

如果任何答案为 no，重定向：选择不同 body face，或调整 display weight。

---

## § D · Custom-axis computation

Custom theme 必须明确声明三个 diversification-rule axis values，这样 [`SKILL.md`](../SKILL.md) § "Theme-diversification rule" 能像 catalog themes 一样触发。

### D.1 · Paper band

- **dark** — paper L < 30 %
- **mid** — paper L 30–85 %
- **light** — paper L > 85 %

### D.2 · Display style

基于所选 display face 选择一个：

- **italic-serif** — Fraunces italic、Newsreader italic、EB Garamond italic、Cormorant italic
- **roman-serif** — Source Serif 4、Newsreader、Crimson Pro、Bitter、Cardo
- **geometric-sans** — Geist、Bricolage Grotesque、Inter Tight、Manrope、Sora
- **mono** — Geist Mono、JetBrains Mono、IBM Plex Mono、Space Mono
- **display-condensed-italic** — Migra italic、Tobias italic
- **display-condensed-bold** — Anton、Bebas Neue、Oswald、Barlow Condensed
- **display-heavy** — Inter Tight 900、Bricolage 800、Druk-class
- **slab-serif** — Roboto Slab、Bitter heavy、Zilla Slab
- **system-native** — system-ui、Inter Tight 400（austere）
- **risograph-bold** — bold sans with hand-crafted feel
- **handwritten** — Caveat、Sacramento、Patrick Hand（少见；仅当 brand 需要）

### D.3 · Accent hue band

- **warm** — hue 10–60°（red、orange、amber）
- **cool** — hue 200–300°（blue、indigo、cyan）
- **neutral** — 无 chromatic accent（austere；chroma < 0.05）
- **chromatic-other** — warm/cool/neutral 之外的任何颜色。加上具体 anchor sub-tag：`chromatic-green ~145°` · `chromatic-sage ~120°` · `chromatic-phosphor ~150°` · `chromatic-terracotta ~30°` · `chromatic-dusty-pink ~350°` · `chromatic-moss ~140°` · `chromatic-amber ~75°`。

### D.4 · Where these go

把三者全部写入 macrostructure stamp（§ E）和 `.hallmark/log.json` entry（§ F）。它们是 durable record。下一次运行会读取它们。

---

## § E · Stamp format

生成 stylesheet 顶部的 CSS 注释（按 [`SKILL.md`](../SKILL.md) Step 6 § "Stamp the output"）：

```css
/* Hallmark · macrostructure: <name> · <hero archetype + knobs>
 * theme: custom · vibe: "<4–8 words>" · paper: oklch(<L>% <C> <H>) · accent: oklch(<L>% <C> <H>)
 * display: <font name> · body: <font name> · axes: <paper-band> / <display-style> / <accent-hue>
 * studied: no · context: <user-provided | inferred> · v0.6.x
 */
```

Concrete example：

```css
/* Hallmark · macrostructure: Long Document · H5 hero knobs: salutation=time-stamp, body=2 paragraphs, signoff=initials
 * theme: custom · vibe: "archival warmth, hand-set, no varnish" · paper: oklch(94% 0.020 65) · accent: oklch(58% 0.16 35)
 * display: Fraunces italic · body: Source Serif 4 · axes: light / italic-serif / chromatic-terracotta
 * studied: no · context: explicit · v0.8.0
 */
```

Stamp 是 durable record。`audit` 会读取它。下一次运行会读取它。用户也会读取它。

---

## § F · `.hallmark/log.json` entry shape

Custom runs 在现有 schema 上增加 `theme_axes` 字段和可选 `vibe` 字段：

```json
{ "date": "2026-05-01",
  "macrostructure": "Stat-Led",
  "theme": "custom",
  "theme_axes": "light / italic-serif / chromatic-terracotta",
  "vibe": "archival warmth, hand-set, no varnish",
  "enrichment": "none",
  "brief": "Coffeebox · subscription" }
```

Catalog entries 继续记录 `theme: <name>`，并跳过 `theme_axes`（catalog axes 从 [`tokens.css`](../../../site/css/tokens.css) 查表）。Step 2.5 logic 对二者使用相同 diversification check：对 catalog entries，从 tokens.css 读取 axes；对 custom entries，从 entry 读取 axes。

Rotation 时，**如果 custom run 跟在另一个 custom run 后面，必须与上一个 custom 至少有一个 axis 不同**，与 catalog-vs-catalog 规则相同。如果 custom run 跟在 catalog run 后面，必须与 catalog axes 至少有一个 axis 不同。Diversification rule 不关心 theme route。

---

## § G · Three worked examples

用于让 model imitation 有具体种子的生成示例。每个示例展示 brief、用户 vibe answer、构建出的 palette、所选 pairing 和 stamp。

### G.1 · Archival café — "Coffeebox"

**Brief:** *"Build me a landing page for Coffeebox — a small-batch coffee subscription. Roast on Sunday, ship on Monday, drink Tuesday. Audience: people who already buy good coffee and want fewer trips to the shop. Tone: warm, hand-set, editorial — like a small café's chalkboard. Theme route: custom."*

**Vibe answer:** *"archival warmth, hand-set, no varnish."*  **Anchor:** *"terracotta."*

**Palette:**
- paper `oklch(94% 0.020 65)` — warm-cream，hue 65（amber-warm）
- paper-2 `oklch(91% 0.022 65)` — 一个 elevation step
- ink `oklch(22% 0.014 60)` — warm dark brown-black
- ink-2 `oklch(40% 0.014 60)` — warm secondary
- rule `oklch(78% 0.018 65)` — warm hairline
- muted `oklch(54% 0.014 60)` — warm grey
- accent `oklch(58% 0.16 35)` — terracotta（hue 35，chroma 0.16）
- accent-ink `oklch(96% 0.014 65)` — accent 上文字用 paper
- focus `oklch(56% 0.20 35)` — 更高 chroma 的 accent

**Pair:** display **Fraunces italic**（Editorial，free）· body **Source Serif 4**（Editorial，free）· mono **JetBrains Mono**（Technical，free）。

**Axes:** **light / italic-serif / chromatic-terracotta**。

**Stamp:**
```css
/* Hallmark · macrostructure: Long Document · H5 hero knobs: salutation=time-stamp, body=2 paragraphs, signoff=initials
 * theme: custom · vibe: "archival warmth, hand-set, no varnish" · paper: oklch(94% 0.020 65) · accent: oklch(58% 0.16 35)
 * display: Fraunces italic · body: Source Serif 4 · axes: light / italic-serif / chromatic-terracotta
 * studied: no · context: explicit · v0.8.0
 */
```

### G.2 · Industrial fintech — "Loop"

**Brief:** *"Loop is a real-time payment-rail observability platform for fintechs. Audience: platform engineers. Use case: try it / contact sales. Tone: industrial, cool, technical. Theme route: custom."*

**Vibe answer:** *"industrial precision, cool, technical."*  **Anchor:** *"sea-blue."*

**Palette:**
- paper `oklch(13% 0.012 220)` — dark cool
- paper-2 `oklch(17% 0.014 220)` — one step up
- paper-3 `oklch(22% 0.014 220)` — two steps up（panels）
- ink `oklch(94% 0.010 220)` — cool light
- ink-2 `oklch(72% 0.010 220)`
- rule `oklch(30% 0.012 220)`
- muted `oklch(58% 0.012 220)`
- accent `oklch(72% 0.16 220)` — sea-blue（cool）
- focus `oklch(78% 0.20 220)`

**Pair:** display **Geist Mono 500**（Technical，free）· body **Geist**（Technical，free）· mono **Geist Mono**（Technical，free）。

Note：这是一个 single-family page（Geist + Geist Mono 是同一 family 的不同 widths）。[`typography.md`](typography.md) line 7 允许这种情况："single-font pages are allowed only when the single font IS the design choice." 对 industrial-precision fintech 来说，这就是 design choice。

**Axes:** **dark / mono / cool**。

**Stamp:**
```css
/* Hallmark · macrostructure: Workbench · F2 sticky-scroll knobs: pinned=right, content=trace-panel, steps=3
 * theme: custom · vibe: "industrial precision, cool, technical" · paper: oklch(13% 0.012 220) · accent: oklch(72% 0.16 220)
 * display: Geist Mono 500 · body: Geist · axes: dark / mono / cool
 * studied: no · context: explicit · v0.8.0
 */
```

### G.3 · Botanical apothecary — "Mossroot"

**Brief:** *"Mossroot is a small herbal apothecary in Porto. We make tinctures, salves, and tea blends. Audience: locals + visitors. Use: see what we make + visit. Tone: quiet, herbal, hand-poured. Theme route: custom."*

**Vibe answer:** *"moss, lichen, soft pink, herbal."*  **Anchor:** *（skipped — pick from vibe）*。

Vibe 命名了两个 hues：*moss*（偏 green，约 140°）和 *soft pink*（warm，约 350°）。选择 **soft pink 作为 accent**（单 anchor，custom 严格单 accent），并把 moss-green 用作 *paper tint*（chroma 0.018 朝 145°）。这样无需拆分 accent，也能承载双重 vibe。

**Palette:**
- paper `oklch(96% 0.018 145)` — moss-tinted near-white
- paper-2 `oklch(93% 0.020 145)`
- ink `oklch(22% 0.014 140)` — moss-tinted dark
- ink-2 `oklch(42% 0.014 140)`
- rule `oklch(82% 0.018 145)`
- muted `oklch(56% 0.014 140)`
- accent `oklch(72% 0.13 350)` — dusty-pink（chromatic-other）
- focus `oklch(70% 0.18 350)`

**Pair:** display **Cormorant Garamond**（Luxury，free）· body **EB Garamond**（Luxury，free）· mono **Geist Mono**（本页少见；只用于 ingredient lists）。

**Axes:** **light / roman-serif / chromatic-other (dusty-pink)**。

**Stamp:**
```css
/* Hallmark · macrostructure: Catalogue · F1 catalogue knobs: tiles=8, columns=2, rule=hairline-between
 * theme: custom · vibe: "moss, lichen, soft pink, herbal" · paper: oklch(96% 0.018 145) · accent: oklch(72% 0.13 350)
 * display: Cormorant Garamond · body: EB Garamond · axes: light / roman-serif / chromatic-other (dusty-pink)
 * studied: no · context: explicit · v0.8.0
 */
```

---

## What custom does **not** do（值得重申）

1. **不会发明无视规则的 themes。**每个 paper L band、accent chroma cap、neutral-tinting requirement、font ban 和 slop-test gate 都继续生效。自由在于*组合*，不是规则。
2. **不会保存 themes 供复用。**Custom run 是 per-output。Skill 不会写回 [`tokens.css`](../../../site/css/tokens.css)。如果用户想要永久 theme，他们可以自己把 custom palette 粘进 tokens.css 并命名。
3. **不会问多个 follow-up questions。**一个 vibe answer（+ optional anchor）足够。Step 1 的 audience/use/tone，加上 brief 和 macrostructure pick，已经给 model 80% 信号。
4. **不会放松 diversification rule。**Custom entries 与 catalog entries 一样声明三个 axes；rotation rule 对二者都触发，theme-route-blind。
5. **不会绕过 Step 5 preview。**Custom palette + pairing 会在任何 code 输出前以 plain text 展示，方便用户早期重定向。

如果这五条中任何一条被折弯，custom output 就是 over-invented。Audit it；redirect。
