# Warm Editorial

> 展示 9-section 格式的 DESIGN.md 示例。用作 reference / test fixture。
> 被 [`../spec.md`](../spec.md)、[`../skills-protocol.md`](../skills-protocol.md)、[`../modes.md`](../modes.md) 引用。

## Visual Theme & Atmosphere
温暖、不急促、像杂志。想象「线上版 New Yorker 访谈专栏」。留白慷慨、适合长文阅读、chrome 克制。有玩心，但绝不猎奇。

## Color Palette & Roles
- **Background:** `#FAF7F2`（温暖的米白纸张）
- **Foreground:** `#1C1A17`（近黑，略带暖调）
- **Accent (primary):** `#C0512F`（terracotta）— 用于 links、primary CTAs，每页最多 1 个 hero element
- **Accent (secondary):** `#2F5B4F`（forest）— section dividers、tags
- **Muted:** `#8A817A`（中等暖灰）— timestamps、metadata
- **Surface:** `#FFFFFF` — 仅用于 elevated cards
任何 user-facing 位置都不要使用纯黑或纯白。

## Typography Rules
- **Display / headings:** "GT Sectra" 或 fallback serif（`'GT Sectra', 'Times New Roman', serif`）
- **Body:** "Söhne" 或 fallback sans（`'Söhne', -apple-system, system-ui, sans-serif`）
- **Mono:** `'JetBrains Mono', ui-monospace, monospace`，仅用于 code
- Scale (px): 12 · 14 · 16 · 20 · 28 · 40 · 56 · 80
- Line-height: body 为 1.6，display 为 1.2
- Letter-spacing: 40px 以上 display sizes 使用 -0.02em；其他位置使用默认值

## Component Stylings
- **Buttons:** flat fill，12px radius，14px padding-block，20px padding-inline。Primary = terracotta fill、off-white label。Secondary = 1px foreground outline、transparent fill。
- **Cards:** off-white background，1px forest-at-8%-opacity border，16px radius，24–32px internal padding。除 hover 外无 shadow（y+2px、blur 16、foreground-at-6%）。
- **Inputs:** 仅 underline（无 box），1px muted baseline，focus 时 terracotta baseline，16px vertical padding。
- **Links:** terracotta，1px terracotta-at-40% underline，hover 时无 underline（改为 terracotta-at-8% background）。

## Layout Principles
- 12-column grid，1200px max-width，24px gutters。
- Hero sections: 最小 72vh，最大 120vh。Content 偏上，绝不垂直居中。
- Body sections: desktop 上下 spacing 80px；tablet 48px；phone 32px。
- 每屏只使用一种 accent color。如果页面有 terracotta hero，secondary CTAs 只用 foreground，不用 forest。

## Depth & Elevation
极简。只有两个 elevation levels：
- **Flat (0):** 默认所有元素。
- **Raised (1):** cards on hover、dropdown menus、floating CTAs。2px y-offset，16px blur，foreground 6% opacity。
Inputs 不加 shadows。Hero 不加 shadows。不要 neumorphism，不要 glassmorphism。

## Do's and Don'ts
- 让留白呼吸。短 headline 占据 50% viewport height 是正确的。
- 重要数字（pricing、stats）使用 serif。
- 每页只绘制一个 accent element；其余都用 foreground。
- 不要 gradients。
- Product copy 中不要 emojis。
- Headings 不要全用 sentence-case；H1/H2 使用 title case，H3 及以下使用 sentence case。
- 不要使用超过 24px 的 border-radius；不要使用低于 8px 的 border-radius。

## Responsive Behavior
- **Desktop ≥ 1024px:** 12-col grid，完整 hero heights，并排 columns。
- **Tablet 640–1023px:** 8-col grid；hero 降到 60vh；3+ columns 时堆叠。
- **Phone < 640px:** 4-col grid；single-column layout；hero 降到 50vh；所有 padding -33%。

## Agent Prompt Guide
针对这个 design system 生成 artifacts 时：
- 以 typography 和 whitespace 为先；chrome（borders、shadows）应做减法。
- 如果一屏需要超过一个 accent element，说明做得太多了，删掉一个。
- 当请求是 "professional" 或 "serious" 时，更依赖 serif + whitespace。当请求是 "modern" 时，这套 system 并不合适；请选择另一个 DESIGN.md。
- Color tokens 不可协商。不要发明新的 hex values。如果请求需要 palette 之外的颜色，在 artifact 中生成 warning comment，并使用最接近的现有 token。
- 相比 1 个 hero + 8+ sections，优先 1 个 hero + 3–5 个 body sections。Editorial 意味着克制。
