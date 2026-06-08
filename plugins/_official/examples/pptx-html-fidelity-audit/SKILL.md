---
name: pptx-html-fidelity-audit
description: 审计 python-pptx export 与其 source HTML deck 的一致性，识别 layout/content drift（footer overflow、cropped content、missing italic/em、lost styling、off-rhythm spacing），并用严格的 footer-rail + cursor-flow layout discipline 重新导出。当用户有一个从 HTML slide deck 生成的 .pptx，并要求 compare/audit/verify/fix 该 export 时使用本 skill，包括 "compare ppt with html"、"fidelity audit"、"fix the pptx"、"ppt is cut off"、"footer overlap"、"italic missing in pptx"、"re-export the deck"、"pptx-html-fidelity-audit" 等说法，或任何 python-pptx → HTML round-trip 需要验证或修复的情况。用户把 deck.html 和 deck.pptx 并排展示并调试 visual differences 时，也触发本 skill。
triggers:
  - "pptx fidelity"
  - "pptx audit"
  - "ppt 跑掉"
  - "字型不對"
  - "footer overlap"
  - "verify pptx"
  - "html to pptx"
od:
  mode: utility
  scenario: engineering
---

# PPTX ↔ HTML Fidelity Audit

这是一个可重复 workflow，用来捕捉 `python-pptx` export 如何悄悄偏离 HTML source，并用一套 layout discipline 修复它，避免下一轮再次出现相同 regressions。

## When this skill applies

用户需要具备：

- 一个 source HTML slide deck（通常是包含 `<section class="slide">` blocks 的 single-file deck）：

  ```html
  <section class="slide light">
    <div class="chrome">2026 · Q2 review</div>
    <span class="kicker">Pillar 03</span>
    <h2 class="h-xl">Shipping <em>velocity</em> doubled</h2>
    <p class="lead">…</p>
    <div class="foot">page 5 / 14</div>
  </section>
  ```

- 一个由该 deck 通过 python-pptx（或类似工具）生成的 PPTX file。
- 一个怀疑或可见证据：PPTX 与 HTML 不一致，例如 text bleeding into the footer、italic words gone flat、hero slides not centered、sections cropped、tag styling lost。

如果用户只有这两个 artifacts 中的一个，本 skill 还不适用；先生成缺失的那一个，或请用户提供它。

## Why this is hard (and why a skill helps)

PPTX 是 fixed-canvas、absolute-positioned medium。HTML 是 fluid、flow-based medium。Naive python-pptx export 会把每个 block 固定在手选的 `(top, left)` coordinates；这对它测试过的第一张 slide 有效，却会在任何 intrinsic height 不同的其他 slide 上静默失败。结果就是最常见的 drift modes：

1. **Footer overflow** — content 的 `top + height` 进入 footer row。
2. **Off-canvas content** — 最后一个 block 的底部超过 `7.5"`（16:9 canvas）。
3. **Italic loss** — HTML 中的 `<em>` 从未得到 `run.font.italic = True`。
4. **Hero slides not centered** — vertical-stack slides 使用 `MARGIN_TOP`，而不是计算居中。
5. **Box bounds intruding** — text 本身 fit，但 *shape's bounding box* 过大，并视觉上跨过 rail。
6. **Tag/styling loss** — colored chrome rows、kicker uppercase tracking、mono-vs-serif assignments 悄悄 fallback 到 defaults。

这些全都是 *layout discipline* 问题，不是 content 问题。一旦采用这套 discipline，它们就会停止出现。

---

## Workflow

Audit 分为五步。不要跳过任何一步；只有 audit 产出真实 issue list 来驱动 re-export，这套 discipline 才有效。不做 audit 直接 fix，通常会留下一半问题。

### Step 1 — Extract ground truth from the PPTX

运行 `scripts/extract_pptx.py <path-to.pptx> > pptx_dump.json`。该脚本会遍历每张 slide 上的每个 shape，并 dump text、position（`top` / `left`）、size（`width` / `height`）以及 per-run typography（font name、size pt、bold、italic、color）。这是 export 的 *actual* state；不要相信 export script 的意图，要相信 dump。

对于 14-slide decks，dump 约 30-60 KB，可人工阅读。

### Step 2 — Walk the HTML structure

读取 source HTML，并枚举 `<section class="slide">` blocks。对每张 slide 记录：

- Slide theme（`light` / `dark` / `hero light` / `hero dark`）。
- `chrome` row text（top metadata）。
- `kicker`（headline 上方的小 uppercase eyebrow）。
- Headline（h-hero / h-xl / 等）以及任何 sub-head。
- Body copy 和任何 structured blocks（pipeline steps、cards、pillars、observation cards）。
- `foot` row（bottom metadata）。
- 任何 `<em>` 或 italic-styled spans；italic 是 silent regression。

将每张 HTML slide 映射到 PPTX slide index。对于遵循 “slide 1 = cover, slide N = closing” 约定的 decks，映射按位置即可。

### Step 3 — Build the audit table

对每张 slide，遍历 dump 中的 shapes，并按 expected layout rules 检查。使用这个精确表格格式；severity column 会驱动修复优先级：

```
| Slide | Issue | Severity |
|---|---|---|
| 1 cover | meta-row 底端 6.95" 蓋過 footer (6.7") | 🔴 |
| 5 checklist | row B 步驟描述底端 7.2" 切到 footer | 🔴 |
| 8 3E | 收束段落直接坐在 footer 起點 | 🔴 |
| 9 on-day | step 描述底端剛好碰 footer，無安全距 | 🟠 |
| 多處 | em (Playfair italic) 未保留 | 🟡 |
```

Severity rubric:

- 🔴 **critical** — content cropped、text invisible、footer overlap、off-canvas。必须修复。
- 🟠 **high** — content 可见，但 visual hierarchy 破坏、没有 breathing room、hero 未居中。应修复。
- 🟡 **medium** — italic/em missing、font fallback wrong、color drift。本轮修复。
- 🟢 **low** — minor spacing/alignment、sub-pixel offsets。记录但不阻塞。

表格之后，写一个简短 root-cause section：90% 的问题通常来自 2-3 个 systemic causes（例如 “no footer rail enforced”、“hero stacks pinned to MARGIN_TOP instead of centered”、“italic never propagated”）。命名 systemic causes 会让 re-export script 更小且更正确。

### Step 4 — Re-export with footer-rail + cursor-flow layout discipline

这是 load-bearing technique。完整规则见 `references/layout-discipline.md`；摘要如下：

**先为整套 deck 一次性定义 rails：**

```python
from pptx.util import Inches

CANVAS_W       = Inches(13.333)   # 16:9
CANVAS_H       = Inches(7.5)
MARGIN_X       = Inches(0.6)
MARGIN_TOP     = Inches(0.5)
CONTENT_MAX_Y  = Inches(6.70)     # NOTHING in content area may cross this
FOOTER_TOP     = Inches(6.85)     # footer row pinned here, edge-to-edge
```

> **Customizing the rails.** 上述 defaults 适合带 slim footer 的 16:9 canvas。如果你的 design system 使用更宽 footer 或 4:3 canvas，请在 export script 中 override 这些 constants，并通过 `--content-max-y` / `--canvas-h` / `--canvas-w` 把相同值传给 `verify_layout.py`。完整 constant table 见 `references/layout-discipline.md` §1。


**对 content blocks 使用 cursor，而不是把每个 block 固定到 absolute y：**

```python
class Cursor:
    """Advances down the slide; refuses to cross the footer rail."""
    def __init__(self, y_start, cap=CONTENT_MAX_Y):
        self.y = y_start
        self.cap = cap
    def take(self, h, gap=Inches(0.12)):  # ~1 line of whitespace at 14pt; tighten/loosen per design system
        top = self.y
        self.y = top + h + gap
        if self.y > self.cap:
            raise OverflowError(
                f"cursor at {self.y} exceeds footer rail {self.cap}; "
                f"reduce block height or split slide"
            )
        return top
```

对每张 slide，实例化 `Cursor(MARGIN_TOP)`，并按 reading order 对每个 block 调用 `take(height)`。如果任何 block 会越过 rail，该 slide 就拒绝 render，于是 overflows 会变成 loud build errors，而不是 silent visual bugs。

**Hero（vertically-centered）slides 使用 budget，而不是 cursor：**

```python
def hero_layout(blocks):
    """blocks = list of (height, gap_after) tuples in reading order."""
    total = sum(h + g for h, g in blocks)
    y_start = (CANVAS_H - total) / 2
    return Cursor(y_start)
```

这个单一改动会消灭 “hero slide content sticks to top”，也就是最常见的 hero defect。

**收紧 box height，让它适配 text + minimal padding。** PowerPoint 会在 shapes overlap 时暴露 shape bounds（selection halos、Z-order conflicts），而 oversized box 即使内部文字没越界，也会视觉上跨过 footer rail。请用 text metrics + 约 0.05" pad 计算 box height，不要套 generous wrappers。

**明确保留 italic / em：**

```python
def add_run(p, text, font, size_pt, italic=False, bold=False, color=None):
    r = p.add_run()
    r.text = text
    r.font.name = font
    r.font.size = Pt(size_pt)
    r.font.italic = italic
    r.font.bold = bold
    if color:
        r.font.color.rgb = color
    return r
```

遍历 HTML 时，检测 `<em>` / `<i>` / inline style `font-style: italic`，并传入 `italic=True`。Italic display copy 使用 EN serif face（Playfair Display、Source Serif 或 fallback Georgia）；CJK serif 通常没有 italic，强行 italicize 会显得坏掉。

对于 layout rails 无法捕捉的更深 font issues，例如 variable-font traps 让 PowerPoint 悄悄换成 Calibri / Microsoft JhengHei、缺失 `<a:ea>` slot 导致 CJK runs fallback、Han characters 上的 fake-italic，请阅读 `references/font-discipline.md`。其中五层覆盖了 `verify_layout.py` 看不到的内容。

### Step 5 — Verify post-export

写出新的 `.pptx` 后，运行 `scripts/verify_layout.py <path-to.pptx>`。该脚本会：

- 遍历每张 slide 上的每个 shape。
- 对 content shapes 断言 `top + height ≤ CONTENT_MAX_Y`（footer/page-number shapes 允许位于 rail 下方）。
- 对所有 shapes 断言 `top + height ≤ CANVAS_H`（无 off-canvas）。
- 断言 `left + width ≤ CANVAS_W` 且 `left ≥ 0`。
- 把 violations 汇报成单个 block：slide index、shape name、observed bottom、rail。

Zero violations 是 “this re-export is shippable” 的 gate。不要在没跑 verifier 的情况下声称 audit 已修复；人眼在 zoom-out 时会漏掉 1-2 mm overflow，脚本不会。

---

## Output to the user

Step 5 通过后，报告：

1. **Audit table** — Step 3 的表格。
2. **Root causes** — 1 段 systemic explanation。
3. **Fix list** — 简洁列出改了什么和为什么（例如 “hero slides switched to budget centering”、“all content blocks routed through Cursor”、“em runs explicitly italic”）。
4. **Verification** — “0 rail violations across N slides, file size X KB”。
5. **Path** — re-exported `.pptx` 的 absolute path。

用户读这份报告有两个目的：确认可见 bugs 已修复，以及相信 systemic fix 是正确的。两者都要覆盖。

---

## Bundled resources

- `scripts/extract_pptx.py` — 将每张 slide 上的每个 shape dump 为 JSON。Audit 前运行。**Important:** 也要在 *original* export 上运行以便比较，并在 *re-exported* 文件上运行以确认。
- `scripts/verify_layout.py` — post-export rail checker。发现 violations 时返回非零 exit code，因此需要时可以放进 CI pipeline。
- `references/layout-discipline.md` — 完整 footer-rail + cursor-flow rule set，并包含常见 slide type（hero、content、pipeline、two-column、observation grid）的 code snippets。
- `references/font-discipline.md` — 五层 font audit：mapping、presence、variable-vs-static traps、三个 XML language slots（`latin` / `ea` / `cs`）、CJK + Latin italic interaction。
- `references/audit-table-template.md` — 可直接复制的 table template，带 severity legend。

在这些情况下阅读 references：

- Deck 有 SKILL.md 未覆盖的 slide types（multi-column dashboards、embedded images、charts）→ `layout-discipline.md`。
- Audit 显示 🟡 typography issues，例如 italic missing、CJK falling back、XML 中出现意外 `Calibri` / `Microsoft JhengHei` → `font-discipline.md`。
- 想把 audit table 直接放进 report 或 markdown deliverable → `audit-table-template.md`。

---

## Anti-patterns to avoid

- **Patching individual slides without naming the systemic cause.** 如果你只是把 slide 5 的 block 下移 0.2"，接下来还会回来修 slide 9、11 和 14。找出导致四个问题的规则。
- **Trusting the original export script's intent.** 始终对实际文件运行 extractor。Intent 与 reality 的 drift 才是 bug。
- **Skipping verification because "it looked fine in PowerPoint preview".** Preview anti-aliasing 会隐藏 1-2 mm overflows。脚本不会。
- **Italicizing scripts that have no italic tradition.** CJK、Arabic、Hebrew、Devanagari、Thai 和 Khmer 在强制 `italic=True` 时都会生成 synthetic slant，看起来像机械变形。只 italicize primary script 支持 italic 的 runs，例如 Latin、Cyrillic、Greek。Implementation pattern 见 `references/font-discipline.md` Layer 5。
- **Using `MARGIN_TOP` for hero slides.** Hero slides 需要 *budget centering*，不是 top-anchored。这是最常见、也最便宜可修的 hero defect。

---

## Why geometry-based verification, not visual diff

这个 skill 的早期版本依赖 visual diffing：通过 Keynote → PDF → PNG render `.pptx`，通过 Chrome headless screenshot HTML，再用 `magick` 把它们 side-by-side stitch。它能工作，但有三个明显问题：

- **Platform lock-in.** Keynote AppleScript 仅限 macOS；`magick` 和 font-discovery commands 在各 OS 上不同；Linux 上的 CI pipelines 无法复现这条链路。
- **Imprecision.** 1-2 mm overflow 会在 PNG preview 中被 anti-aliased 掉。人眼会漏掉；脚本会把它捕捉为 hard numeric violation。
- **Setup cost.** 每个 contributor 都需要安装完整 graphics toolchain 才能 audit。Geometry checks 只需要 `python-pptx`。

Geometry-based verification 放弃了 visual diff 擅长的一件事：shape positions 正确但 rendered glyph 看起来不对的情况（font fallback、kerning bugs、missing weight）。遇到这种情况时，回退到 manual screenshot review；`references/font-discipline.md` 中的 five-layer audit 覆盖了大多数底层原因。
