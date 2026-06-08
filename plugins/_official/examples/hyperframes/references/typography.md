# Typography

Compiler 会内嵌 supported fonts；只需要在 CSS 中写 `font-family`。

## Banned

每个 LLM 都会下意识选择的 training-data defaults。它们会让不同 composition 呈现同质化。

Inter, Roboto, Open Sans, Noto Sans, Arimo, Lato, Source Sans, PT Sans, Nunito, Poppins, Outfit, Sora, Playfair Display, Cormorant Garamond, Bodoni Moda, EB Garamond, Cinzel, Prata, Syne

**尤其是 Syne**，它是最被滥用的“distinctive” display font。一用就暴露 AI design tell。

## Guardrails

这些规则你都知道，但你还是会违反。停下来。

- **不要搭配两个 sans-serif。** 你经常这样做：一个给 headlines，一个给 body。跨出边界：serif + sans，或 sans + mono。
- **每个 scene 只用一个 expressive font。** 你会挑两个有趣字体，试图让它“更好”。一个负责表演，一个后退。
- **Weight contrast 必须极端。** 你默认使用 400 vs 700。Video 需要 300 vs 900。差异必须在运动中一眼可见。
- **使用 video sizes，而不是 web sizes。** Body: 最小 20px。Headlines: 60px+。Data labels: 16px。你会想用 14px。不要。

## What You Don't Do Without Being Told

- **Tension 应该有意义。** 不要 pattern-match pairings。问清楚为什么这两个字体彼此不一致。Pairing 应体现内容的矛盾：mechanical vs human、public vs private、institutional vs personal。如果你无法说清这个 tension，它就是任意的。
- **Register switching。** 把不同字体分配给不同 communicative modes：一种 voice 用于陈述，一种用于数据，一种用于署名。不是页面 hierarchy，而是对话中的 voices。
- **Tension 可以存在于单一字体内部。** 一个看似熟悉但暗藏怪异的字体，会与 viewer expectations 产生 tension，而不是与另一个字体产生 tension。
- **只改变一个变量 = 戏剧化 contrast。** 相同 letterforms，monospaced vs proportional。同一 family 的不同 optical sizes。只改变 rhythm，其余保持不变。
- **Double personality 可行。** 两个 expressive fonts 可以共存，只要它们共享一种态度（都不羁，或都精确），即使外形完全不同。
- **Time is hierarchy。** 第一个出现的元素最重要。在 video 中，sequence 会替代 position。
- **Motion is typography。** 一个词如何进入画面，和 font 本身一样有意义。0.1s slam 与 2s fade，同一个 font，会产生完全不同的 message。
- **Fixed reading time。** 画面停留 3 秒，就必须能在 2 秒内读完。减少字数，放大 type。
- **Tracking 比 web 更紧。** Display sizes 使用 -0.03em 到 -0.05em。Video encoding 会压缩 letter detail。

## Finding Fonts

不要默认使用你熟悉的字体。如果内容是 luxury，一个 grotesque sans 可能比预期的 Didone serif 更能制造 tension。先决定 register，再搜索。

把这个脚本保存到 `/tmp/fontquery.py`，然后运行 `curl -s 'https://fonts.google.com/metadata/fonts' > /tmp/gfonts.json && python3 /tmp/fontquery.py /tmp/gfonts.json`：

```python
import json, sys, random
from collections import OrderedDict

random.seed()  # true random each run

with open(sys.argv[1]) as f:
    data = json.load(f)
fonts = data.get("familyMetadataList", [])

ban = {"Inter","Roboto","Open Sans","Noto Sans","Lato","Poppins","Source Sans 3",
       "PT Sans","Nunito","Outfit","Sora","Playfair Display","Cormorant Garamond",
       "Bodoni Moda","EB Garamond","Cinzel","Prata","Arimo","Source Sans Pro","Syne"}
skip_pfx = ("Roboto","Noto ","Google Sans","Bpmf","Playwrite","Anek","BIZ ",
            "Nanum","Shippori","Sawarabi","Zen ","Kaisei","Kiwi ","Yuji ","Radio ")

def ok(f):
    if f["family"] in ban: return False
    if any(f["family"].startswith(b) for b in skip_pfx): return False
    if "latin" not in (f.get("subsets") or []): return False
    return True

seen = set()
R = OrderedDict()

# Trending Sans — recent (2022+), popular (<300)
R["Trending Sans"] = []
for f in fonts:
    if not ok(f) or f["family"] in seen: continue
    if f.get("category") in ("Sans Serif","Display") and f.get("dateAdded","") >= "2022-01-01" and f.get("popularity",9999) < 300:
        R["Trending Sans"].append(f); seen.add(f["family"])

# Trending Serif — recent (2018+), popular (<600)
R["Trending Serif"] = []
for f in fonts:
    if not ok(f) or f["family"] in seen: continue
    if f.get("category") == "Serif" and f.get("dateAdded","") >= "2018-01-01" and f.get("popularity",9999) < 600:
        R["Trending Serif"].append(f); seen.add(f["family"])

# Monospace — recent (2018+), popular (<600)
R["Monospace"] = []
for f in fonts:
    if not ok(f) or f["family"] in seen: continue
    if f.get("category") == "Monospace" and f.get("dateAdded","") >= "2018-01-01" and f.get("popularity",9999) < 600:
        R["Monospace"].append(f); seen.add(f["family"])

# Impact & Condensed — heavy display fonts with 800+ weight
R["Impact & Condensed"] = []
for f in fonts:
    if not ok(f) or f["family"] in seen: continue
    has_heavy = any(k in list(f.get("fonts",{}).keys()) for k in ("800","900"))
    is_display = f.get("category") in ("Sans Serif","Display")
    if has_heavy and is_display and f.get("popularity",9999) < 400:
        R["Impact & Condensed"].append(f); seen.add(f["family"])

# Script & Handwriting — popular (<300)
R["Script & Handwriting"] = []
for f in fonts:
    if not ok(f) or f["family"] in seen: continue
    if f.get("category") == "Handwriting" and f.get("popularity",9999) < 300:
        R["Script & Handwriting"].append(f); seen.add(f["family"])


# Randomize the top 5 in each category so the LLM doesn't always pick the same first result
for cat in R:
    R[cat].sort(key=lambda x: x.get("popularity",9999))
    top5 = R[cat][:5]
    rest = R[cat][5:]
    random.shuffle(top5)
    R[cat] = top5 + rest
limits = {"Trending Sans":15,"Trending Serif":12,"Monospace":8,
          "Impact & Condensed":12,"Script & Handwriting":10}
for cat in R:
    items = R[cat][:limits.get(cat,10)]
    if not items: continue
    print(f"--- {cat} ({len(items)}) ---")
    for ff in items:
        var = "VAR" if ff.get("axes") else "   "
        print(f'  {ff.get("popularity"):4d} | {var} | {ff["family"]}')
    print()
```

五个分类：trending sans、trending serif、monospace、impact/condensed、script/handwriting。全部从 Google Fonts metadata 动态筛选；没有 hardcoded font names。配对时要跨越 classification boundaries。

## Selection Thinking

不要按 category reflex 选字体（editorial -> serif、tech -> mono、modern -> geometric sans）。那是 pattern matching，不是设计。

1. **Name the register。** 内容在用什么 voice 说话？Institutional authority？Personal confession？Technical precision？Casual irreverence？Register 比 category 更能收窄范围。
2. **Think physically。** 把字体想象成品牌可以交付的实体物件：museum exhibit caption、hand-painted shop sign、1970s mainframe terminal manual、大衣里的 fabric label、印在廉价 newsprint 上的 children's book、tax form。哪个实体物件匹配 register，就指向正确的 typeface _kind_。
3. **Reject your first instinct。** 第一个感觉正确的 font，通常是你对这个 register 的 training-data default。如果你上次也选了它，就换一个。
4. **Cross-check the assumption。** Editorial brief 不一定需要 serif。Technical brief 不一定需要 sans。Children's product 不一定需要 rounded display font。最有辨识度的选择常常会违背 category expectation。

## Similar-Font Pairing

绝不要搭配两个相似但不完全相同的 fonts：两个 geometric sans-serifs、两个 transitional serifs、两个 humanist sans。它们会制造没有清晰 hierarchy 的视觉摩擦。Viewer 会感觉哪里“不对”，却说不出来。要么用同一 font 的两个 weights，要么搭配在多个 axes 上形成 contrast 的 fonts：serif + sans、condensed + wide、geometric + humanist。

## Dark Backgrounds

深色背景上的浅色文字会产生两种需要补偿的 optical illusions：

- **Increased apparent weight。** Light-on-dark 在相同 `font-weight` 下会比 dark-on-light 显得更重。Body text 用 350 替代 400。Headlines 因为 size 已经补偿，受影响较小。
- **Tighter apparent spacing。** Letterforms 周围的浅色 halo 会减少感知间距。`line-height` 比浅色背景值增加 0.05-0.1。Display sizes 额外加 0.01em `letter-spacing` 抵消。

## OpenType Features for Data

大多数字体都有默认关闭的 OpenType features。Data compositions 中要打开它们：

```css
/* Tabular numbers — digits align vertically in columns */
.stat-value,
.timer,
.data-column {
  font-variant-numeric: tabular-nums;
}

/* Diagonal fractions — renders 1/2 as ½ */
.recipe-amount,
.ratio {
  font-variant-numeric: diagonal-fractions;
}

/* Small caps for abbreviations — less visual shouting */
.abbreviation,
.unit {
  font-variant-caps: all-small-caps;
}

/* Disable ligatures in code — fi, fl, ffi should stay separate */
code,
.code {
  font-variant-ligatures: none;
}
```

只要数字纵向堆叠，`tabular-nums` 就必不可少：stat callouts、timers、scoreboards、data tables 都是如此。没有它，数字宽度会按比例变化，列就对不齐。
