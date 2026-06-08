# RTL and bidirectional craft rules

Right-to-left layout 和 bidirectional text 的 universal rules。Active `DESIGN.md` 决定 brand visual language；本文件决定当 script 从右向左阅读，或同一行中混合方向时，该 visual language 如何表现。

> 基于 primary sources：Unicode UAX #9 revision 51（Sept 2025）+ Unicode 17.0、CSS Logical Properties Level 1、HTML Living Standard（`dir`、`<bdi>`）、Tailwind v4.0/v4.2 changelogs、W3C alreq、Material 3 RTL guidance、Apple HIG internationalization。

## Base direction and language

每个 full-page RTL artifact 都需要 `<html dir="rtl" lang="ar">`（或 Hebrew、Persian、Urdu 对应的 `lang`）。`lang` attribute 驱动 font-stack selection、hyphenation、locale-aware speech synthesis 和 search-engine indexing；只有 `dir` 不够。三个 patterns 覆盖常见场景：

- **Full-page RTL.** `<html dir="rtl" lang="ar">`。内部所有内容继承。
- **Mixed-language subtree.** 当嵌入 block 使用不同 script 时，嵌套 `<section dir="ltr" lang="en">…</section>`（反向也一样）。例如 code samples、English citations、foreign brand names。
- **User-generated content of unknown direction.** 在 paragraph 上使用 `dir="auto"`。Browser 会从 run 中第一个 strong directional character 解析方向。

在 default-LTR page 的 document root 上，只设置 `lang` 而不设置 `dir` 是可以的；English 在那里不需要 `dir="ltr"`，因为 bidi base direction 已经是 LTR。任何 opposite-direction ancestor 内部，`lang` 不会重置 inherited base direction，因此要在 subtree 上同时设置 `lang` 和 `dir`（`<section dir="ltr" lang="en">`）。只设置 `dir` 而不设置 `lang` 很少正确；至少应放入适当 ISO-639 tag。

## Logical properties first

对于任何可能 render RTL 的 layout，hardcoded `left` / `right` 都是 bug。Inline axis 使用 logical properties。Writing-mode 可变时，block axis 也使用 logical properties；否则可使用 physical。

| Logical | LTR resolves to | RTL resolves to |
|---|---|---|
| `margin-inline-start` / `padding-inline-start` / `inset-inline-start` | left | right |
| `margin-inline-end` / `padding-inline-end` / `inset-inline-end` | right | left |
| `border-inline-start` | border-left | border-right |
| `border-start-start-radius` | border-top-left-radius | border-top-right-radius |
| `text-align: start` / `text-align: end` | left / right | right / left |
| `inline-size` / `block-size` | width / height | width / height |

Browser support：core inline-axis logical properties 是 Baseline Widely Available（Chrome 87、Safari 14.1、Firefox 66；截至 2026-05 全球 ≥95%）。

**Tailwind v4 改变了新项目的答案。** v4.0（2025-01-22）将 inline-axis logical utilities 纳入 core（`ms-*`、`me-*`、`ps-*`、`pe-*`、`start-*`、`end-*`）。v4.2（2026-02-18）添加了 block-axis set（`mbs-*`、`mbe-*`、`pbs-*`、`pbe-*`），并重命名 inset utilities：`start-*` / `end-*` 已 deprecated（仍可用），推荐 `inset-s-*` / `inset-e-*`。`tailwindcss-rtl` plugin 已过时。Tailwind v4 中不要为 spacing 写 `[dir="rtl"]:` overrides。

## Bidirectional text

UAX #9 rev 51（Sept 2025）是 Unicode 17.0 的 version stamp。没有 algorithm change；`max_depth = 125` 已永久锁定。

UAX #9 定义了两组不同的 bidi formatting characters，用来解决不同问题：

- **Isolate controls**（modern，优先使用）：U+2066 LRI、U+2067 RLI、U+2068 FSI；都用 U+2069 PDI 关闭。Isolated run 不影响 surrounding paragraph 的 bidi resolution，也不受它影响。Embedded run 的方向预先未知时使用 FSI。
- **Embedding / override controls**（legacy）：U+202A LRE、U+202B RLE、U+202D LRO、U+202E RLO；都用 U+202C PDF 关闭。它们嵌套在 surrounding paragraph 内，而不是与之隔离；LRO/RLO 还会强行给 neutral characters 指定方向。新代码应使用 isolates；只有与会发出它们的系统互操作时才碰 embeddings。

**HTML 中使用 `<bdi>`；plain text 中，根据你对 run 的了解选择 isolate。** UAX #9 §2.7：*"where available, markup should be used instead of the explicit formatting characters."* `<bdi>` 自 2020 年 1 月起已 Baseline Widely Available。只有在 plain-text contexts（logs、plain-text emails、terminal output）中才使用 control characters。使用时：

- 对 known-LTR runs（Arabic paragraph 中的 English name、code-style identifiers、phone numbers）使用 **LRI U+2066 + PDI U+2069**。
- 对 known-RTL runs（English paragraph 中的 Arabic name）使用 **RLI U+2067 + PDI U+2069**。
- 对 unknown direction（author 和 language 可变的 UGC）使用 **FSI U+2068 + PDI U+2069**。

不要默认使用 FSI。它会从第一个 strong character 自动检测；当你已经知道 run 应是什么方向时，这是错误选择。

Paragraph 或 `<bdi>` 上的 `dir="auto"` 让 browser 从第一个 strong directional character 检测方向。最适合 author time 不知道方向的 user-generated content。

## 什么需要镜像，什么不需要

Mirroring 并非 universal。下面规则在 Material 3 RTL guidance 和 Apple HIG internationalization 中是一致的。

**必须镜像：**

- Directional arrows（back / forward / next / previous）、navigation rail position、tab order、calendar-grid weekday order。
- Slider fill direction 和 **non-media** progress-bar fill（download progress bar、form-completion bar、upload status）。Media scrubbers 保持 LTR，见下方 Media 行。
- Checkbox-and-label position。LTR 中 label 在右侧，RTL 中 label 在左侧。
- 当 surrounding paragraph 是 RTL，但 value 本身是 LTR 时，phone-number 和 IBAN affordances 需要把 value 包在 `<bdi dir="ltr">`（或 `<span dir="ltr">`）中，避免 digits reflow。Bare `<bdi>` 不够：phone numbers 和 account numbers 大多是 weak / neutral characters，因此 first-strong direction detection 不可靠。必须显式 force LTR。

**不得镜像：**

- Clock faces。Clockwise 是 universal。
- Circular refresh / sync / reload icons。同理。
- Media playback controls（play / pause / fast-forward / rewind）**以及 media scrubber / progress timeline**。它们代表 tape direction，不代表 reading direction。
- Charts and graphs。X-axis 保持 mathematical，不是 linguistic。
- Photographs、brand logos、physical-object icons（camera、keyboard、headphones）。Identity over direction。

**Numerals 不是 mirroring decision。** 它们跟随 locale，而不是 paragraph direction。Arabic-Indic digits 携带 bidi class **AN**，不是 EN；这影响它们在 mixed-direction lines 中的位置，但不会翻转它们。

**平台之间唯一的 live conflict：** search icon。SF Symbols 提供 RTL `magnifyingglass` variant（Apple 会翻转它）。Material 3 说不要翻转 magnifying glass（handle 保持 bottom-right）。按 platform 决定；不要合成一条单一规则。

## Anchored here 的 typography rules

两个 RTL-coupled typography rules 放在本文件中，因为它们会在 layout level 造成破坏。完整 Arabic / Hebrew typography guide（font picks、harakat line-height、OpenType shaping、mixed-script fallback chains）属于未来的 `craft/arabic-hebrew-typography.md`。

- **绝不要对 Arabic runs 应用 CSS `letter-spacing`。** alreq 将 letter-spacing 视为 boundary concept，而不是 uniform tracking value。Applying tracking 会破坏该 script 依赖的 cursive joining。
- **Arabic runs 的 body type 约 14-18 px，line-height 1.5-1.75**，为 harakat（diacritics）留出空间。Latin defaults 太紧。

## Native mobile RTL parity

Web RTL handling 不会自动迁移到 mobile。每个平台都有自己的 direction primitive。只 emit web artifacts 的 skills 可以略读本节；它是 ship to mobile 的 skills（mobile-onboarding、mobile-app 等）的入口。

| Platform | Direction primitive | Spacing |
|---|---|---|
| iOS UIKit | `semanticContentAttribute = .forceRightToLeft` | `NSDirectionalEdgeInsets` |
| iOS SwiftUI | `.environment(\.layoutDirection, .rightToLeft)` | `EdgeInsets` with `leading` / `trailing` |
| Android Compose | `CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl)` | `PaddingValues` accepts start / end |
| Flutter | `Directionality(textDirection: TextDirection.rtl)` | `EdgeInsetsDirectional.fromSTEB(...)` |
| React Native | `I18nManager.forceRTL(true)`（requires native reload；无 `forceLTR` parity，无 `react-native-web` support） | `marginStart` / `marginEnd` |

跨平台规则：优先使用 directional primitive，而不是 absolute one。Flutter 的 `EdgeInsets.left/right`、Android 的 `paddingLeft` / `paddingRight`、iOS 的 leading-vs-trailing 都是在等待 Arabic deployment 的 bugs。

## Forms in RTL

Form fields 经常混合 scripts。三条规则覆盖大多数情况。

- 对任何 value 方向不确定的 field（search boxes、comment fields、free-text inputs），使用 **`<input dir="auto">`**。Browser 会从第一个 strong directional character 检测。
- 即使位于 RTL paragraph 内，对 intrinsically-LTR fields 也要 force LTR：email、URL、phone、IBAN、credit-card。`<input type="email" dir="ltr">`。
- 显示 mixed-script content 时（paragraph 中的 username、description 中的 model number），用 **`<bdi>` 包住 rendered values**。这会阻止 surrounding direction 重排 embedded value。对于方向固定且 weak-character-heavy 的 values（phone、IBAN、card number），使用 `<bdi dir="ltr">` 而不是 bare `<bdi>`，避免 first-strong detection 误判。

## Common mistakes（lint these）

Mechanically lintable items 可以仅从 CSS / source 标记。Script-aware items 需要检测 rendered text 中的 Arabic / Hebrew runs，并允许 legitimate exceptions（chart axes、physical icons、platform-specific placement）。

**Mechanically lintable:**

- 新 CSS 中 hardcoded `left` / `right` / `text-align: left`：任何可能 render RTL 的 layout 都会出 bug。Exceptions：chart x-axes、physical-object icons、platform-pinned UI（如 status-bar clock）。用 allow-list lint，而不是 blanket ban。
- "Tailwind v4.2 logical-utility rename is `inline-s-*` / `inline-e-*`"：错误 family。那些是 size utilities。Inset rename 是 `inset-s-*` / `inset-e-*`。
- "WebKit doesn't support U+2066-U+2069"：错误，它们在现代 browsers 中 interoperable。所谓 "still missing" 来自陈旧的 2015 W3C test snapshot。
- 设置 `dir="rtl"` 但没有 `lang="ar"`（或匹配语言）。一起 lint；只有 `dir` 会漏掉 font-stack 和 locale path。
- 需要 render RTL 的 Flutter code 中使用 `EdgeInsets.left/right`。使用 `EdgeInsetsDirectional.start/end`。

**Needs script detection（否则会 false-positive）：**

- "Use `text-justify: kashida` for Arabic"：没有 browser 实现。CSS `text-align: justify` 会添加 inter-word spacing，在 Arabic 中不自然；kashida elongation 是正确形式，但今天在 web 上不可 ship。
- Arabic 或 Hebrew text 使用 italics。两个 script 都没有 italic tradition。
- 对 Arabic 应用 CSS `letter-spacing`。破坏 cursive joining（alreq 将其视为 boundary concept，而非 uniform tracking value）。
- RTL prototyping 使用 Lorem Ipsum。Arabic word lengths、connection behaviors 和 vertical extents 不同；使用真实 Arabic / Hebrew text。

**HTML semantics:**

- 当 `<bdi>` 或带 `dir` 的 element 可以完成任务时，为 inline runs 使用 CSS bidi controls（`unicode-bidi: isolate` / `plaintext` / `embed`）。Inline content 优先使用 HTML 中的 semantic isolation；`unicode-bidi: plaintext` 作用于不同 surface（它改变 block 中每个 plaintext paragraph 的 base direction 判断方式），只应在明确需要并测试过该 block-level paragraph behavior 时使用。两者不是 drop-in equivalents；不要把一个 lint 成另一个的 replacement。
- RTL paragraph 中 phone / IBAN / card numbers 外只包 bare `<bdi>`。Weak/neutral characters 上的 first-strong detection 不可靠；显式 force `dir="ltr"`。
