# Slop test — 69 个 gates + pre-emit self-critique

交付任何输出前运行这份清单。每个问题的答案都必须是 **no**。更新 Step 5 preview block 中的 `Slop test` 行，让它反映本次运行的真实结果。

有些 gates 是 **universal**（适用于所有 genre）；有些是 **genre-scoped**（仅在 active genre 为 editorial、atmospheric、modern-minimal 或 playful 时适用）。Genre overrides 会在行内注明。没有 genre note 的 gate，一律视为 universal。

---

## Pre-emit self-critique（六个轴）

先运行这一步，**再**跑 gate list。按每个轴给计划中的输出打 1–5 分。任何一个轴 **< 3 都会触发一轮 revision pass**，然后再进入 gate sweep；不要把已知弱点带进 69-gate review。

两轮 pass 很正常。三轮说明 brief 有问题，而不是 design 有问题；重新读 brief。

| # | Axis | 评分对象 |
|---|---|---|
| **A** | **Philosophy** | 是否有清晰的 *why*，也就是页面正在表达的立场？还是只是一个 layout？ |
| **B** | **Hierarchy** | 读者能否在 2 秒内看出 primary、secondary、tertiary？还是所有东西权重都一样？ |
| **C** | **Execution** | 细节（rule weight、accent footprint、text-wrap、focus rings、contrast）是否全部符合 spec？还是即便骨架正确也有粗糙感？ |
| **D** | **Specificity** | 它看起来是否属于 *this brief*？还是像一个任何人都能用的泛用 "page"？ |
| **E** | **Restraint** | 是否移除了所有没有证明自己价值的东西？Decoration、redundancy、padding-for-padding's-sake？ |
| **F** | **Variety** | 这个输出是否与项目中先前的 Hallmark output 共享 structural fingerprint？按 structural distance 评分，而不是 visual distance；colour-swaps 不算 variety。 |

把六个分数记录在文件顶部的一行 stamp comment 中：`/* Hallmark · pre-emit critique: P5 H4 E5 S4 R5 V5 */`。未来 run 应能找到它，并避免重复同一个弱点。

---

## Visual

1. Display font 是否是 Inter、Roboto、Open Sans、Poppins、Lato 或 system default？
2. 页面任何位置是否有 purple-to-blue（或 cyan-to-magenta）gradient？*Genre note: atmospheric 允许背景上的 radial gradients，但绝不允许用于 text 或 pill buttons。*
3. 是否存在 3-equal-column card grid，且每个 tile 都是 icon-above-heading？
4. 是否有任何 card 嵌套在另一张 card 内？
5. 是否有 `background-clip: text` gradient headline？（Universal；没有任何 genre 允许 gradient text。）
6. 是否有任何 card 使用粗彩色 left/right side-stripe border？
7. Hero 是否是 `min-height: 100vh` 且所有内容居中？*Genre note: 当 canvas 本身就是设计（Suno-style）时，atmospheric 和 playful 允许 centred heroes。*
8. 是否在任何 base colour 中使用 pure `#000` 或 pure `#fff`？*Genre note: modern-minimal 允许 pure `#fff` paper（Stripe / ElevenLabs school）。*

## Structural

9. 页面是否使用了与你上一次构建页面*相同*的 structural fingerprint？（Hero → 3 features → CTA → footer 是 AI structural template；拒绝它。）
10. Sections 是否仅通过等量 whitespace 分隔，没有 rule、ornament、colour shift，导致每个 section 节奏完全一样？

## Microinteractions

11. 是否在任何地方使用 `transition-all`（或 `transition: all`）？（请指定具体 properties。）
12. 是否把 `hover:scale-105`（或任何 uniform hover-scale）应用到多个无关元素上？
13. 是否把 bouncy / overshoot easings（`cubic-bezier(0.34, 1.56, ...)` 等）用于 UI state changes，例如 buttons、modals、tooltips？（Overshoots 只保留给 physical interactions。）
14. 是否有元素同时拥有*超过一个* hover effect（translate + scale + shadow + colour + rotate）？
15. 是否在任何地方动画化 `width`、`height`、`top`、`left`、`margin` 或 `padding`？
16. Focus ring 是否 transition into existence（fade in）？（Focus rings 必须立即出现；keyboard users 需要即时 indicator。）
17. 是否对用户已经能看见效果的 action 弹出 celebratory success toast？（Silent success 是品味；toasts 用于 failures 和 invisible effects。）
18. Tooltip 的 hover-delay 和 focus-delay 是否相同？（Hover 应延迟 800–1000 ms；focus 应为 0 ms。）
19. Auto-rotating content（carousel、banner、stats）是否缺少 pause-on-hover-and-focus？（WCAG 2.2.2。）
20. 是否出现 placeholder name "Jane Doe / John Smith" 或 startup cliché（Acme、Nexus、Seamless、Unleash）？

## Variety

21. CSS 顶部是否缺少 `/* Hallmark · macrostructure: <name> · ... */` stamp？（必须存在。）
22. 我选择的 macrostructure 是否与本项目先前 Hallmark output 的 stamp 相同？（读取 file system；如果已有 stamp，我的选择必须不同。）
23. 当 brief 没有明确要求 editorial / foundry / specimen 气质时，我是否默认使用了 **Specimen** macrostructure（numbered left-margin labels + huge serif + asymmetric spans + typographic-only CTA）？（Specimen fall-through 被禁止。）*Genre note: atmospheric、modern-minimal 和 playful 永远不默认使用 Specimen；只有 editorial 可以，并且只有在 brief 提示它时可以。*

## Implementation gates

24. 是否有任何 neutral / surface colour 使用 `oklch(... 0 ...)`（zero chroma）？纯灰读起来很平。把每个 neutral 都朝 anchor hue 染色，minimum 0.005 chroma。*Genre note: modern-minimal 允许 zero-chroma neutrals（monochrome Stripe / ElevenLabs school）。*
25. Accent colour 是否覆盖了任意单个 viewport 超过约 5% 的面积（按面积计：solid fills、accent 色大标题、full-bleed accent backgrounds）？如果是，后退；accent 用于 emphasis，不用于填充。*Genre note: atmospheric 允许 accent-tinted radial blooms 覆盖约 20% canvas，因为 bloom 本身就是设计。*
26. 是否有任何 padding / gap / margin 不在 named spacing scale（`--space-3xs` … `--space-5xl`，4 px 的倍数）上？随意的 `padding: 17px` 是 tell。
27. 是否有 prose container 的 `max-width` 超出 45–75 ch 范围？Measure 必须可读；低于 45 ch 会断裂，高于 75 ch 会丢失视线。
28. 是否有任何 interactive element 缺少 `:focus-visible`、`:active` 或 `:disabled` styling？（规则是八种状态。Default + hover 只有两种；代码中至少需要 default + hover + focus-visible + active + disabled。）
29. 是否有任何 `transform` / `animation` keyframe 没有被 `@media (prefers-reduced-motion: reduce)` fallback 覆盖？每个 motion 都需要 reduced-motion alternative。

## Hero enrichment gates

（当页面带有 enrichment 时适用；见 [`hero-enrichment.md`](hero-enrichment.md)。）

30. 如果页面有 demo video，它是否 autoplay with sound、缺少 `poster`、缺少 `fetchpriority="high"`，或在 LCP element 上使用 `loading="lazy"`？（LCP-killers 会失败。）
31. 如果页面有 abstract background，它是否超过一种 accent colour、footprint 超过约 5%，或在整页上动画 mesh-gradient？（Aurora blobs 和 mesh-on-everything 会失败。）*Genre note: atmospheric 允许最多两个 warm-toned radial blooms 覆盖约 20–30% canvas，fixed-attached，不动画。*
32. 页面是否混用了两个或更多 icon libraries？（Material + Heroicons + Lucide 同页 = icon-set tell。）
33. 如果页面有 illustration，我是否在 hand-built SVG 或 pure-CSS shape 可以胜任时默认使用了 Lottie library？（Lottie 是最后手段，不是默认。）

## Diversification gates

（存在 `.hallmark/log.json` 时交叉引用它。）

34. 如果我使用了与先前 Hallmark output 相同的 archetype（根据 `.hallmark/log.json` 或最新 macrostructure stamp），是否至少选择了一个不同的 *variation knob*？两个 Bento Grids 如果都是 `tiles=6, spans=irregular, accent=corner-only`，就是同一个 Bento；[`component-cookbook.md`](component-cookbook.md) 中的 within-archetype knobs 正是为了防止这种重复。在 stamp 中说明 knob deltas。
35. 是否有任何 visual-only `<svg>`、custom-art `<div>`、`<canvas>` 或 decorative figure 缺少 `aria-label` 或 `aria-hidden="true"`？Hand-built CSS art 和 SVG illustrations 需要 accessible name，或者明确 hide。跳过它是新的 accessibility tell。

## Layout-safety gates

（页面必须在每个 viewport 下存活。）

36. 页面在 320 px 到 1920 px 之间的任何 viewport 是否会横向滚动？打开 rendered page，把 dev-tools width slider 拖过这个范围。如果任何宽度出现 horizontal scrollbar，则失败。修复是 `html { overflow-x: clip; }` 加 `body { overflow-x: clip; }`，作为 clipped-edge enrichment 推出 viewport 时的 safety net。使用 `overflow-x: clip`（不是 `hidden`）；`clip` 会保留 descendants 上的 `position: sticky` 和 `position: fixed`。（交叉引用：[`layout-and-space.md` § Page-edge clipping](layout-and-space.md)。）
37. 对文本上的每个 decorative effect，例如 highlighter `<mark>` / `<em>` band / accent stroke / underline，我是否视觉确认了位置和尺寸？Highlighter band 必须位于 x-height 后方（`linear-gradient(180deg, transparent ~38%, accent ~38%, accent ~92%, transparent ~92%)`），**不能**在 baseline 上（那会读成粗 underline）。Underlines 必须为 1–2 px，并从 baseline 偏移 1–2 px，绝不能 5+ px。Decorative strokes 不得超过 viewport 的 5%（gate 25）。这个检查是*视觉*检查：想象 rendered output，确认 band 落在正确 vertical zone。
38. Interactive bars（nav、toolbar、command bar、hero CTA row、footer link strip）是否明确垂直居中？默认 flex layouts 继承 `align-items: stretch`，会让 button 比 sibling text 更高，破坏 visual baseline。每个混合不同高度元素的 flex row（button + text、icon + text、mark + body）都必须声明 `align-items: center`，并在 intrinsic height 的 items 上设 `line-height: 1`。从 `html` 继承 `line-height: 1.55` 会对抗该行的 vertical rhythm。

## Typography discipline gates

（三种 face 是上限。见 [`typography.md` § The 2+1 rule](typography.md)。）

39. 页面是否使用**超过三种**不同 `font-family` families？计数：`--font-display`、`--font-body`，以及最多一个 outlier（`--font-outlier`，用于 wordmark / hero stat / pull quote）。页面上的第四种 family，例如 body + display + code blocks 中的 mono + hero 的独立 display，就是 slop。同一 family 的不同 weights 算一种 family。如果 mono 被用于任何非 code context（captions、labels、numerals），它也算一种 family。发现四种时，把其中一种退回 body 或 display face。
40. **Outlier face 是否在页面上超过两个 slots 中使用？** Outlier 是 register，不是第三个 surface。Canonical pair 是 wordmark + hero stat，或 wordmark + masthead，或 hero stat + pull quote。三个 slots = outlier 现在变成第三种 body font；把它折回 body face。

## Input-state gates

（Inputs 是 almost-right UI 失手的地方。见 [`interaction-and-states.md` § Input field states](interaction-and-states.md)。）

41. 是否有任何 input、textarea 或 select field 在 states 之间改变 `border-width`（default → hover → focus → error）？Default 是 1 px；hover、focus、error 都必须保持 `border-width: 1px`。Border-width 变化会导致 layout shift。State changes 应该作用于 `background-color`、`outline`、`box-shadow` 或 `border-color`，绝不要改 `border-width`。
42. Input focus ring 是否用 `border` 而不是 `outline`？Focus ring 必须是 `outline: 2px solid var(--color-focus)`，并设 `outline-offset: 1px`。在 default state 中预留 `outline: 2px solid transparent` 可避免 activate 时几何变化。用 `border` change 做出的 focus ring 是 tell。
43. Input height 是否与同一 form 中相邻 button 的高度不同？Form inputs 和 submit button 共享同一个 base height（44 px floor）。38 px input + 44 px button 是最常见的 form-tuning slop，读起来像没有设计过。
44. 没有 helper 或 error 时，helper-text container 是否 collapsed？Helper slot 必须保留 `min-height: 1lh`，即使为空也保留，这样 error 出现时不会把页面往下推。Validation 造成 vertical jump 是 tell。
45. Disabled input state 是否*只*用 `opacity: 0.5` 表示？Disabled 需要三个独立 signals：`opacity: 0.55`、`cursor: not-allowed`，以及 `aria-disabled="true"`（或 native `disabled` attribute）。一个通道容易漏看，三个不会。

## Contrast & readability

Universal，适用于每个 genre。这些 gates 捕捉用户指出的真实失败：black-text-on-black-button、dark sections with unreadable text、ink-on-ink slop，也就是 LLM 翻转 surface 后忘了翻转 text colour。

Contrast computation：对页面上的每一组 `(color, background-color)`，运行 **APCA Lc** 或 **WCAG 2.1 ratio**。OKLCH lightness 是快速预检；如果 `|L_text − L_bg| < 50 %`，该组合很可能达不到 4.5:1，需要完整计算确认。

Thresholds:
- Body text（低于 24 px regular 或低于 18 px bold）：**WCAG 4.5:1 / APCA Lc ≥ 60**。
- Large text / icons / focus rings：**WCAG 3:1 / APCA Lc ≥ 45**。

46. 是否有任何 **body text** 与其 computed background 的 contrast ratio 低于 **4.5:1**？把每个 `color` declaration 与其有效 `background-color` 配对并验证。最容易漏的是：card 内文字继承 `color`，但 card 切到 `background: var(--color-paper-2)` 后 text lightness 太接近；muted text（`color: var(--color-muted)`）在 `background: var(--color-paper-3)` 上，两者都是 mid-lightness，会失败。

47. 是否有任何 **large text**（≥ 24 px regular 或 ≥ 18 px bold）、**icon** 或 **`:focus-visible` ring** 与背景的 contrast ratio 低于 **3:1**？同样计算，阈值较宽。尤其检查 focus rings：只有当 `--color-focus` 相对 element 和 page surface 都有 ≥ 3:1 contrast 时，`outline: 2px solid var(--color-focus)` 才通过。

48. 是否有任何 **button** 的 fill 上出现 `color` ≈ `background-color`？Canary check：如果 computed text colour 和 computed background colour 在 OKLCH 中相差 **5% lightness 以内且 0.05 chroma 以内**，则 gate 失败。这能捕捉常见 bug：`color: var(--color-ink)` 放在 `background: var(--color-ink)` 上（black-on-black slop），也就是 LLM 忘了给 text-on-fill 使用 `--color-accent-ink`（或 `--color-paper`）。

49. 当页面任何地方（button、badge、surface）使用 `--color-accent` 作为 fill 时，是否也定义了 `--color-accent-ink`（在 `:root` 或 theme tokens 中），并用它作为该 fill 上文字的 `color`？如果缺少 `--color-accent-ink`，Hallmark output 距离一次粗心的 `color: white` 造成 low-contrast accident 只有一步。这个 token 必须存在，必须验证相对 `--color-accent` 达到 ≥ APCA Lc 60 / WCAG 4.5:1，并且在 accent 填充承载文字的 surface 时应用。

50. 是否有任何 **dark section**（`background-color` 的 OKLCH lightness < 50% 的 section 或 panel）承载了使用 page-default `color: var(--color-ink)` 的文本，也就是 flipped surface 中的 ink-on-ink？切到 dark surface 的 sections 必须同时切换 text colour（通常到 `--color-paper`），并确保 nested children 继承。修复要明确：任何设置 `background: <dark>` 的 class，都必须在同一条 rule 中设置 `color: <light>`，或者被这样的 parent 包裹。最常见失败：`.vs__col:first-child` 被 accent 或 ink colour 涂色，但内部 panels 仍使用 default ink-coloured text。

Step 6 的 CSS stamp 应记录结果：如果五个 gates 全通过，写 `· contrast: pass (46–50)`；如有未关闭项，写 `· contrast: FAIL gates <list>`。发布前必须修复。

## Nav · footer · hero structural slop

Universal，适用于每个 genre。这些 gates 捕捉 nav、footer 和 hero shape 中最容易识别的 AI fingerprints。它们与 structural-fingerprint gate（gate 9）并列：gate 9 捕捉*页面* fingerprint；51–55 捕捉覆盖在其上的 *chrome* fingerprints。

51. **Nav fingerprint.** 页面 `<nav>`（或带 role="banner" 的顶部 `<header>`）是否是 AI default：wordmark-left + 4–5 inline text links centred-or-right + button-right at full viewport width + 1 px hairline border-bottom + white background？如果是，则失败，除非 brief 明确证明 N1 合理（页面只有 2 个 destinations，且该 genre 的 routing table 允许 N1）。Hallmark output 应在 [`component-cookbook.md`](component-cookbook.md) § Navigation 中的 N1、N3、N4、N5、N6、N7、N8、N9 之间轮换。

52. **Footer fingerprint.** `<footer>` 是否是 AI default：4 columns of links（Product / Company / Resources / Legal）+ social-icon row + tiny copyright at the very bottom + 1 px hairline top-border + neutral grey background？如果是，则失败，除非页面是真正的 docs root 或 hub。默认从 [`component-cookbook.md`](component-cookbook.md) § Footers 中选择 Ft1、Ft2、Ft4、Ft5、Ft6、Ft7 或 Ft8。

53. **Hero centred-everything.** Eyebrow、title、lede 和 CTA 是否都沿同一 vertical axis 居中堆叠？自动失败。最多选择两个 centered elements；其余打破对齐。Centred-narrow heroes 只在 editorial / salon / atelier voice 中可接受，即便如此 eyebrow 或 CTA 也应 off-axis（margin-aligned、right-flush 或 numeral-anchored）。

54. **Hero padding asymmetry.** Hero container 的 `padding-block-end` 是否 ≥ `padding-block-start` 的 1.3 倍？如果 hero padding 对称（或 top 更多），它会漂在页面之外。Hero 必须坐*进*页面：更重的 bottom padding 会把它拉入下一 section 的节奏。在 rendered output 的 hero element 上计算。

55. **Decorative-without-purpose.** Hero 是否包含没有 content semantic anchor 的 decorative element（cursor、scanline、gradient blob、abstract shape、ornament、badge、sticker）？失败。Decoration 必须有动机：typed command 中的 cursor（表示 "you'd type next"）、命名 issue / year / version / chapter 的 numeral、响应 interaction 的 gradient（HP3 cursor-spotlight）、命名 authorship 或 date 的 stamp。Random ornaments，例如角落里没有 edition meaning 的 "42"、hero 旁漂浮的 cursor、没有 colour rationale 的 Pantone chip，都是 slop。

Step 6 的 CSS stamp 应把结果与 contrast 放在一起记录：`· nav: N# · footer: Ft# · slop: pass (51–55)`。如果 51–55 任一失败，发布前必须修复。

## Honest copy · no fabricated content

Universal，适用于每个 genre。页面不能编造关于用户产品、团队或市场的事实。

56. **Invented metric.** 页面是否包含用户没有提供、没有来源、且 model 为了填充 stat-led layout、comparison row 或 proof bar 而编造的任何 quantitative claim，例如 "10× faster"、"saves 5 hours per week"、"trusted by 50,000+ teams"、"99.9 % uptime"、"+47 % conversion"？如果是，则失败。修复方式之一：用 `—` 和带 label 的灰色 block 替换数字；换成给用户的问题（"metric to confirm"）；或重建该 section，不使用 proof slot。Stat-led macrostructures 一旦 stats 变成 decoration，就是 slop。*(See [anti-patterns.md § Invented metrics](anti-patterns.md).)*

## Re-drawn UI chrome

Universal。Hallmark 必须复用用户已有的 chrome（browser、OS、IDE），而不是重画它。

57. **Re-drawn chrome.** Hallmark 是否用 HTML/CSS 或 SVG 手工构建了 fake browser bar（URL pill + traffic-light dots）、fake phone frame（rounded rectangle + notch + speaker slit）、fake code-block frame（mock window-chrome around a `<pre>`）、fake terminal frame，或 fake IDE chrome（file tabs + activity bar + sidebar）？如果是，则失败。Re-drawn chrome 是最强烈的 "looks AI-generated" tells 之一：model 发明了一个用户环境里已经存在的 UI。修复：使用包含真实 screenshot 的 `<picture>` 或 `<figure>`，或者省略 chrome，让内容自己站住。*(See [anti-patterns.md § Re-drawn UI chrome](anti-patterns.md).)*

## Token discipline

Universal。Theme 在 run 开头选择 palette 和 font stack；run 的其余部分消费 tokens，绝不发明它们。

58. **Mid-render token improvisation.** Hallmark 是否在 `:root` / `[data-theme="..."]` 中定义的 design tokens 之外引入任何 colour value（`#hex`、`oklch(...)`、`rgb(...)`、`hsl(...)`）或 `font-family` declaration？如果是，则失败。Artifact 中的每种颜色和每种字体都必须引用 named token（`var(--color-accent)`、`font-family: var(--font-display)`）。Inline OKLCH 或一次性 hexes 是 mid-render improvisation：model 选了 theme，然后忘掉它并 freestyle。修复：把该值提升到 token block，命名为新变量，或替换为既有 token。*(See [SKILL.md § Locked tokens](../SKILL.md) and [anti-patterns.md § Mid-render token improvisation](anti-patterns.md).)*

## Responsive — clickable affordances

Universal。Viewport 变窄时，buttons、links 和 nav items 必须保持作为 single-line affordances 的可读性。

59. **Two-line clickable text.** 在 320 px 到 1920 px 的任何 viewport，是否有任何 button label、primary nav link、footer link、tab label、breadcrumb 或 CTA text 换成两行或更多？如果是，则失败。Clickable text 读成两行看起来像坏掉；访客会把它理解为 styling error，而不是有意设计。修复方式之一：缩短 label（最佳修复；"Get started free" → "Start free"）；在 affordance 上设置 `white-space: nowrap` 并让 parent reflow；通过 `hidden=until-found` 在窄宽度下移除非必要 nav item；或把 nav 折叠成 sheet/menu。绝不要让 CTA 或 nav link wrap。*(See [responsive.md § Clickable text — never wraps](responsive.md).)*

60. **Emoji-as-feature-icon.** 是否有任何 feature card、value prop、step number 或 pricing tier 使用 emoji glyph（✨ 🚀 ⚡ 🔥 🎯 ✅）作为 primary icon？如果是，则失败。Emoji-as-icon 是最强烈的 "AI-default" tells 之一：model 伸手拿 Unicode glyph，而不是选择 icon library、构建 custom mark 或完全省略 icon。修复：选择单一 icon library（Lucide / Phosphor / Heroicons；见 [assets.md](assets.md)）、构建 custom SVG，或去掉 icon 并用 typography 主导。

Step 6 的 CSS stamp 应记录结果：`· honest: pass (56) · chrome: pass (57) · tokens: pass (58) · responsive: pass (59) · icons: pass (60)`。任何失败都必须在发布前修复。

## Mobile-responsiveness — non-negotiables

Universal。每个 emitted page 都必须在 320 px、375 px、414 px 和 768 px CSS-pixel widths 下完美渲染。Gates 36（no horizontal scroll）和 59（no two-line clickable text）已经覆盖 headline cases；下面的 61–65 codify 了 marketing-site responsiveness pass 暴露出的模式。标记输出完成前，逐个 viewport 目测。

61. **Image-bearing grid track without `minmax(0, 1fr)`.** 是否有任何包含 `1fr` track 的 `grid-template-columns`（或 `grid-template-rows`），且其中一个 track 内渲染了 `<img>` / `<picture>` / image-bearing element？如果是，该 track 必须改为 `minmax(0, 1fr)`。Plain `1fr` 会解析为 `minmax(auto, 1fr)`，其中 `auto` minimum 是最大内容的 intrinsic width；对 1024 + px native image 来说，就是 1024 + px minimum，会在手机上把布局推出 viewport。修复每个 track 只需一个改动：`1fr` → `minmax(0, 1fr)`。

62. **Root missing `overflow-x: clip`.** Artifact 是否缺少同时作用于 `html` 和 `body` 的 `overflow-x: clip`？如果是，则失败。`clip`（不是 `hidden`）可以防止 horizontal scroll 且不创建 scroll context，因此 `position: sticky` descendants 仍然工作。这是每个 emitted page 的硬要求。加到 base reset：`html, body { overflow-x: clip; }`。

63. **Display headers without long-word wrap.** 是否有任何渲染 display-size text 的元素（`h1`、`.hero__display`、`.section__title`、`.skill-row__title`、hero-equivalent classes）缺少 `overflow-wrap: anywhere; min-width: 0`？如果是，则失败。Long hyphenated words（"AI-generated"、uppercase compound brand names）会溢出 viewport，因为唯一断点在 hyphen；`overflow-wrap: anywhere` 让引擎在最后手段下可以在词内断行。

64. **Per-theme section-head override without mobile collapse.** 当 theme 或 variant 把 `.section__head { grid-template-columns: ... }` 覆盖为 `1fr` 以外的值时，它是否也包含 mobile-collapse rule，或者是否存在一个 specificity 匹配的 global `[data-theme] .section__head { grid-template-columns: 1fr }` 位于 `@media (max-width: 48rem)`？如果两者都没有，则失败。Theme-specific 2-column heads 会在 mobile 上保留 template，让 title 包到 section label 上，页面读起来坏掉（Sport 上最明显：italic Anton title 与 "02 / EXAMPLES" 重叠）。

65. **CSS-only radio tab pattern that scroll-jumps.** 当通过 `<input type="radio">` siblings + `:checked` selectors 实现 tab toggles 时，artifact 是否 (a) 让 radios 保持在 normal document flow 中，zero size + opacity 0（没有 `position: absolute; top: 0`），或者 (b) 提供 JS handler 拦截 label clicks、调用 `e.preventDefault()`、手动设置 `radio.checked = true`、dispatch `change`，并用 `{ preventScroll: true }` focus？如果 radios 是 `position: absolute; top: 0` 且没有 JS guard，则失败。Default-position radios 会让每次 tab click 都把页面跳到 section top；所有 viewport 都可见，mobile 上尤其打断。

66. **Section eyebrow / tag beside the heading (tag-left, header-right).** 是否有任何 section 把 eyebrow / number / mono-cap label（`01 · THE TOUR`、`02 / FEATURES`、`Chapter Three`）放在与 section heading 同一水平行的左列或右列中？自动失败。这个 pattern 会在几秒内读成 templated editorial-SaaS tell。只要使用 eyebrow（见 [`anti-patterns.md § Eyebrow on every section`](anti-patterns.md)，默认 OFF），heading 就必须**直接位于它下方的同一列**，只能是 vertical stack。具体来说：**任何 `<header>`、`<div>` 或 `<section>` wrapper，不论 class name 是什么（`.section__head`、`.workbench__head`、`.pricing__head`、`.catches__head`、`.foo__intro`，或任何 macrostructure-/section-specific 名称）**，只要同时包含 eyebrow / label / number / kicker element 和 heading element，就必须解析为 single-column layout：`display: block`、`display: flex; flex-direction: column`，或 `display: grid; grid-template-columns: 1fr`（或 `minmax(0, 1fr)`）。这类 wrapper 上的任何 multi-column grid（`grid-template-columns: 1fr 2fr`、`minmax(0, 0.4fr) minmax(0, 1fr)`、`auto 1fr` 等）都被禁止。**规则绑定在 *content shape* 上，也就是同一 wrapper 里 eyebrow + heading，而不是绑定在某个 class-name allowlist 上。** 对任何带 eyebrow 的 head，它都覆盖 [`structure.md`](structure.md) 中的 "Left-margin" axis 和 [`layout-and-space.md`](layout-and-space.md) 中的 "Hanging headers" pattern。**NOT bypassable by "preserve structural parity" / "mirror this reference" / "match the prior build" instructions**；如果 reference build 带有被禁 pattern（多数 pre-rule-66 builds 都有），新 build 中静默 flatten。规则优先于 parity。Reference builds 可能早于此 gate；此 gate 是权威。

67. **All-caps display heads with line-height < 1.0 → cap-collision on wrap.** 是否有任何 display-size element（`.hero__display`、`.section__title`、`h1`、`h2`，或任何 `≥ --text-2xl` 的元素）同时声明 `text-transform: uppercase` 和低于 `1.0` 的 `line-height`（或 `--lh-tight`）？如果是，则失败。Uppercase glyphs 没有 descenders，其 cap-tops 位于 line box 顶部；在 `line-height: 0.94`（旧 Manifesto / Sport / Brutal default）时，title wrap 后第 N+1 行的 cap-tops 会明显与第 N 行的 baseline 或 commas 碰撞。Condensed display faces（Anton、Inter Tight 900、Bebas Neue）会放大问题。**All-caps display heads 的 floor 是 `line-height: 1.0`；推荐 `1.02–1.08`。** 要么把 theme 的 `--lh-tight` 提到 ≥ 1.0，要么在 display element 上取消 `text-transform: uppercase`。最明显场景：两行 `.section__title` 第一行以 comma 结尾（"SAME PROMPT, TWO / DIFFERENT OUTPUTS."），comma + cap-D 会糊成一个 glyph blob。

68. **Sticky element at `top: 0` below a sticky page-level nav → bleed.** 当页面也存在 sticky `<header>` / `<nav>` / `.banner` 且位于 `top: 0` 时，artifact 是否在页面顶级 nav / banner / header 以外的任何元素上声明 `position: sticky; top: 0;`（即页面上存在两个 sticky-at-top-0 elements）？自动失败。两者在滚动时都会粘到 viewport top 并重叠；DOM 更深的元素会绘制在 nav 上方（可见为 "section header bleeding into the nav bar" glitch）。修复：定义 `--banner-height` token（根据 nav design 约 44–64 px），并把每个 secondary sticky offset 到 `top: var(--banner-height)`，让它 dock 在 nav **下方**。同时给 nav 比 in-page sticky elements 更高的 z-index：拆分 `--z-sticky`（in-page，例如 200）和 `--z-sticky-nav`（top nav，例如 300），保证 sticky boxes 瞬时重叠时 nav 始终绘制在上。这个 gate 只在页面确实有 sticky elements 时触发（S3 sticky-pinned section heads、F2 sticky-scroll feature stacks、sticky tables-of-contents）；没有 sticky behaviour 的页面 trivially pass。

69. **Studied DNA discarded for a catalog theme.** 对话前面是否已经 emit 过 `study` diagnosis，而 build 的 CSS stamp 的 `theme:` field 命名的是 catalog theme（Specimen、Atelier、Brutal、Salon、Newsprint、Linen、Studio、Manifesto、Terminal、Midnight、Almanac、Garden、Quiet、Riso、Sport、Bloom、Coral、Violet、Aurora、Halo、Plume、Editorial），而不是 `studied-DNA (source: ...)`，且用户没有明确 pivot（"use Linen instead"、"ignore the DNA"、"rotate to a different theme"）？自动失败。Studied DNA 本来应该成为系统（SKILL.md § 2.6 Condition 0）；默认回 catalog 是 attractor pull。修复：直接使用 studied DNA 的 tokens（paper OKLCH、accent OKLCH、named candidate fonts、macrostructure、archetypes）重新 emit，并把 stamp 更新为 `theme: studied-DNA (source: <URL or image>)`，带上 inline values。当 conversation scope 中没有 recent study 时，这个 gate trivially pass。

Step 6 的 CSS stamp 记录 mobile pass 和 contrast：`· mobile: pass (36, 59, 61–69)`。

---

如果任何答案是 **yes**，修复它。不要交付 slop。
