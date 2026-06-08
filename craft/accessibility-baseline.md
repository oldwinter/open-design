# Accessibility baseline craft rules

Accessibility legal floor 以及超越它的 craft commitments 的 universal rules。Active `DESIGN.md` 决定 brand appearance；本文件决定 artifact ship 前必须跨过哪些规则。

> 基于 primary sources：WCAG 2.2 Understanding pages、ISO/IEC 40500:2025、ADA Title II 2024 + 2026 IFR、EN 301 549 v3.2.1、WAI-ARIA 1.3 + AccName 1.2 + Core AAM 1.2、WebAIM Million 2026（February 2026 crawl）、A11yn（arXiv 2510.13914）、APCA W3C silver branch。

## Prior art and scope

面向 AI agents 的既有 OSS a11y guidance（`fecarrico/A11Y.md`、`awesome-copilot agents/accessibility.agent.md`、`Community-Access/accessibility-agents`）通常内联一份 WCAG SC checklist，却不 version legal floor，也不说明哪些 constraints 能在 iOS / Android / Flutter 上存活。本文件 scope 更窄：OD artifact 必须跨过的 compliance floor，附 jurisdiction notes 和 native-mobile parity。Heuristic rules 和 linter-checked items 位于 sibling craft files（`anti-ai-slop.md`、`state-coverage.md`）；WCAG SC numbers 映射到下面的具体 rules，而不是重新罗列。

## Legal floor 会随 jurisdiction 改变

- **EU（EAA，enforcement live 2025-06-28）：** EN 301 549 v3.2.1 是 OJ-cited harmonised standard；它引用 **WCAG 2.1 AA**。EN 301 549 v4.1.1（包含 WCAG 2.2 九个新 SCs）预计 2026 年底 / 2027 年进入 OJ citation target。在那之前，EAA 引用 WCAG 2.1。Web Accessibility Directive（WAD, EU 2016/2102）单独覆盖 public-sector bodies，也指向 EN 301 549。
- **US public sector — ADA Title II 2024 final rule：** **WCAG 2.1 AA**。2026-04-20 IFR 推迟了 deadlines：人口 ≥ 50,000 的 jurisdictions 为 2027-04-26；sub-50,000 和 special districts 为 2028-04-26。
- **US federal procurement — Section 508（Revised 508 Standards）：** 与 EN 301 549 harmonised，当前 published rev 引用 **WCAG 2.0 AA**。Access Board 正在推进 WCAG 2.x updates；在它们发布前，federal IT procurement floor 是 WCAG 2.0。
- **US private sector — ADA Title III：** 没有 federal regulation 指定 technical standard。Settlements 和 DOJ guidance 经常把 **WCAG 2.1 AA** 作为 de-facto target，但 legal mechanism 是 case-by-case，不是 rule-based。
- **ISO/IEC 40500:2025**（October 2025）逐字 ratified WCAG 2.2。它本身不会改变 EU 或 US legal floors。

**Craft 的 practical rule：** 将 **WCAG 2.2 AA** 作为 working ceiling。它跨过两个 jurisdictions 中的 WCAG 2.1 AA legal floor，并为 v4.1.1 做准备。低于 2.2 AA 的内容都是 craft debt。

## Color contrast

| Pair | WCAG 2.x AA minimum |
|---|---|
| 低于 18 pt regular / 14 pt bold 的 normal text（覆盖大多数 body 和 UI text） | 4.5:1 |
| Large text（≥18 *pt* regular ≈24 px，或 ≥14 *pt* bold ≈18.5 px） | 3:1 |
| Non-text UI components 和 graphical objects | 3:1 |
| Focus indicator vs adjacent and unfocused state | 3:1 |

Thresholds 是**包含边界**的：正好 4.5:1 或 3:1 通过。不要 round up：2.999:1 失败，因为 rounding 不是允许机制。

"Large text" 指 **18 pt** regular，不是 18 px。18 px regular 需要 4.5:1；14 pt bold（≈18.5 px）符合 3:1，14 px bold 不符合。

**APCA as a parallel design check.** APCA 的 Lc value 可以捕获 WCAG 2.x luminance ratios 漏掉的 font-weight 和 stem-thickness effects。Body copy Lc ≥60 是合理 parallel pass；APCA 实际 lookup table 与 size 和 weight 相关（大尺寸 heavier weights 可用更低 Lc，小号 thin text 需要 Lc ≥75+）。截至 2026-05，APCA 不属于 WCAG、EN 301 549、ADA 或 Section 508 compliance；保持 WCAG 2.2 AA 作为 compliance floor，将 APCA 仅当 design-review 使用。如果 ship APCA tooling，请使用 `apca-w3` package；SAPC repo 是 non-commercial。

## Touch targets

| Bar | SC | Size |
|---|---|---|
| AA（legal floor） | 2.5.8 Target Size (Minimum) | **24×24 CSS px** |
| AAA（craft commitment） | 2.5.5 Target Size (Enhanced) | 44×44 CSS px |
| iOS HIG | — | 44×44 pt |
| Material 3 | — | 48×48 dp |

WCAG 2.5.8 列出五个 24×24 minimum 不适用的 exceptions：**Spacing**（target 周围 24-CSS-px exclusion circle 不与相邻 circles 相交）、**Equivalent**（有足够尺寸的 alternative control 达成同一 function）、**Inline**（target 位于句子内，例如 body copy links）、**User agent control**（browser default，例如 native scrollbar）、**Essential**（更小尺寸是传达信息所必需，例如 map pin）。Spacing exception 是 icon-button toolbars 依赖的例外；其他例外比表面看起来窄，不应用来 justify undersized primary actions。

## Focus visibility

通过 CSS 移除 focus outline 是**三重失败**：1.4.11 Non-text Contrast、2.4.7 Focus Visible 和 2.4.13 Focus Appearance（AAA）。对 keyboard users 使用 `:focus-visible`；只有存在 alternative non-color affordance 时，才为 mouse clicks 抑制 outline。

对于 AAA（2.4.13）：indicator area 必须至少等于 component 的 2 CSS px perimeter，focused 与 unfocused states 之间 contrast ≥3:1。1-px outline 即使 3:1 也不合格。

## Form input labels

WebAIM Million 2026（使用 WAVE，不是 axe-core）：**Top 1M home pages 中 51% 至少有一个 missing form-input label；所有 6.9M sampled inputs 中 33.1% 无 label**。Page-level rate 从 48.2%（2025）升至 51%（2026）；missing-label prevalence 是 WebAIM 明确指出 2026 年上升的少数类别之一，而整体 errors-per-page count 是 56.1。

Default form-error wiring（WCAG 2.2 + ARIA APG）：

```html
<label for="email">Email</label>
<input id="email" type="email" required
       aria-describedby="email-hint email-error"
       aria-invalid="true">
<span id="email-hint">Used for receipts only.</span>
<span id="email-error" role="alert">Email must include @ and a domain.</span>
```

`aria-describedby` 是 production default；截至 2026-05，`aria-errormessage` 的 screen-reader support 不完整（NVDA 完整，JAWS / VoiceOver / TalkBack 部分支持），请将其视作 progressive enhancement。

WCAG 3.3.7 Redundant Entry 是 **Level A**（legal floor）。重新询问用户已在 "same process" 输入过的数据会失败，除非站点 auto-populates 或提供 selectable shortcut。Browser autofill 不满足它。

## Keyboard operability and semantic structure

如果 keyboard 或 screen-reader user 无法到达 control 或解析页面，visual contrast 和 labelled inputs 就没有意义。下面 bullets 是 Level A / AA WCAG essentials 加上一小组 OD 视为 craft commitments 的 structural conventions。每项都标注 WCAG level。

- **Tab reachability**（2.1.1 Keyboard, Level A）：每个 interactive element 都必须 keyboard reachable 且 operable。`tabindex="-1"` 会从 tab order 移除；`tabindex` values >0 会破坏 document order，不应使用。（2.1.3 No Exception 通过移除 underlying-function exception，将 2.1.1 扩展到 AAA。）
- **Activation keys**（2.1.1, Level A）：`<button>` 用 Enter 和 Space 激活；`<a href="…">` 用 Enter 激活。没有 `href` 的 bare `<a>` 不是 link、不可 focus、不可 keyboard-operable；navigation 使用 `<a href="…">`，actions 使用 `<button>`，绝不要用 placeholder anchor。Custom controls 必须实现匹配的 key handlers 和 `role`。
- **No keyboard trap**（2.1.2, Level A）：focus 必须能用进入 component 的同一组 standard keys 离开它。Modal dialogs *by design* 是 focus-trap，不是 violation；它们 trap 到 Escape 或 close button dismiss 为止。
- **Focus order**（2.4.3, Level A）：tab order 必须跟随 meaningful reading order。不要依靠 positive `tabindex` 修复 DOM 顺序错误；修复 DOM。
- **Native control first**（craft convention，锚定 4.1.2 Name/Role/Value Level A）：`<button>` 天然 keyboard-operable、focusable、name-resolvable，并被所有 AT 免费宣布为 button。`<div role="button" tabindex="0">` 要求你重新实现这一切，而大多数重实现会漏掉 `aria-pressed`、disabled state 或 Space-on-keyup。只有没有 native element 适配时才使用 ARIA。
- **Document language**（3.1.1, Level A）：必须有 `<html lang="...">`。Sub-tree language switches 在 inner element 上使用 `lang`。
- **Heading hierarchy**（1.3.1 Info and Relationships Level A；2.4.6 Headings and Labels Level AA）：WCAG 要求 programmatically-determined structure 和 descriptive headings，不要求特定 outline shape。OD craft convention 叠加要求：优先每页一个 `<h1>`，不要跳级（`<h1>` → `<h3>` 而没有 `<h2>`）。Visual size 和 heading level 独立。
- **Landmarks**（1.3.1, 2.4.1 Bypass Blocks Level A）：使用 `<header>` `<nav>` `<main>` `<aside>` `<footer>`，而不是 `<div role="banner">` 等。AT users 通过 landmark navigation；没有 landmarks 的页面就是一堵 div 墙。
- **Text alternatives**（1.1.1 Non-text Content, Level A）：content images 用 `<img alt="...">`，decorative 用 `alt=""`；icon-only buttons 用 `aria-label`；charts 和 SVG data viz 提供 long-form description。没有 text alternative 的 chart 对 screen reader 不可读。

## ARIA discipline

WebAIM Million 2026 显示，ARIA pages 平均 **59.1 errors**，non-ARIA pages 平均 **42**，ARIA 侧约多 17 个 errors。2025 年差距是 30（57 vs 27），2024 年是 15；YoY direction 有噪音，但 ARIA usage 上升（2026 年 home pages 82.7%，2025 年 79.4%），而 correctness 滞后。ARIA deployment 跑得比 ARIA correctness 快。

按 ARIA APG，decision order：

1. 语义正确的 Native HTML element。
2. 如果需要 restyling，用 custom visuals 包住 native element。
3. 如果前两者都不适合，逐字使用 APG pattern。
4. Closest APG pattern + documented deviation。Last resort。

绝不要发明 ARIA。

## Reduced motion and flashing

完整规则见 `animation-discipline.md`。这里锚定的不可协商点是：WCAG 2.3.1（Level A）规定，一秒内超过三次 flashes 不 conformant，除非 flash area 保持在 general 和 red flash thresholds 以下。受保护的问题是 photosensitive epilepsy。

## Native mobile parity

Web ARIA 不会自动迁移。每个平台都有自己的 labelling API。

| Platform | Label | Role |
|---|---|---|
| iOS UIKit | `accessibilityLabel` | `accessibilityTraits` |
| iOS SwiftUI | `.accessibilityLabel(…)` | `.accessibilityAddTraits(.isButton)` |
| Android Compose | `Modifier.semantics { contentDescription = … }` | `Modifier.semantics { role = Role.Button }` |
| Flutter | `Semantics(label: …)` | `Semantics(button: true, …)` |
| React Native | `accessibilityLabel` | `accessibilityRole` |

对每个 target 使用对应 platform API。AI-generated mobile UI 如果逐字镜像 web ARIA，通常会漏掉 platform-native screen reader path。

## Common mistakes（lint these）

- 将 "Target Size 44×44" 引为 AA bar。44×44 是 **AAA**（2.5.5）。AA 是 **24×24**（2.5.8）。
- "18 px = large text"：错。Threshold 是 18 *pt* regular（约 24 px）或 14 pt bold（约 18.5 px）。
- "EAA = WCAG 2.2 AA"：错。EN 301 549 v3.2.1 锚定 WCAG 2.1。
- "Section 508 = WCAG 2.1 AA"：截至 2026-05 错。Revised 508 仍引用 WCAG 2.0 AA；Access Board update 正在推进，尚未发布。
- "Tabindex fixes focus order"：`tabindex` >0 会逆 DOM reorder，几乎总是让问题更糟。修复 DOM。
- "Modal traps focus → keyboard trap"：混淆 2.1.2。Modal 在 Escape / close 前 trapping focus 是正确 behavior，不是 violation。
- "Heading size = heading level"：visual hierarchy 和 `<h1>`/`<h2>`/`<h3>` 是独立的。按语义选择 level，再 styling。
- "WebAIM Million uses axe-core"：它使用 WAVE。
- "WCAG 3 will use APCA"：APCA 已在 2023 年 7 月从 WCAG 3 中移除。
- "Adding ARIA improves accessibility"：经验上相反。WebAIM Million 2026：ARIA pages 平均 59.1 errors，non-ARIA pages 42。
- "Bare `<a>` with click handler is a link"：错。没有 `href` 的 `<a>` 不可 focus、不可 keyboard-operable，也不是 link。Navigation 用 `<a href="…">`，actions 用 `<button>`。
- 通过 `outline: none` 移除 focus outline 且没有 replacement。三重失败：1.4.11、2.4.7、2.4.13。
- Placeholder text 是 form input 的唯一 label。失败于 1.3.1 和 3.3.2；placeholder 会在输入后消失。
- 在 `role="row"` 上把 `aria-description` 作为唯一 state-carrier。JAWS 2025/2026 会静默丢弃它（[FreedomScientific standards-support #927](https://github.com/FreedomScientific/standards-support/issues/927)）。
- 将 native HTML `<button>` 重实现为没有 keyboard handling、focus 或 `aria-pressed` 的 `<div role="button">`。
- 把 a11y 当成 web-only。Flutter / iOS / Android 有自己的 labelling APIs，web ARIA 到不了那里。
