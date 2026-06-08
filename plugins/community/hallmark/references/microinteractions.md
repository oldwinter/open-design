# Microinteractions

这是 2026 anti-slop canon 中最大的单一缺口。多数 skills 会纠正 typography 和 colour；很少有 skill 会纠正*那些小而重复的瞬间：界面在这些瞬间要么像被设计过，要么像被生成出来。*本文件就是这项修正。

一个 microinteraction 由四部分组成：trigger → rules → feedback → loops/modes（Saffer）。其中任一部分做错，界面都会显得缺少工艺。四者都做对时，界面会有一种*被制作过*的感觉，即便其他部分并不新奇。

## Principles

- **Motion 有意图，否则删除。**每个 animation 必须澄清、引导或确认。如果你说不出一个 transition 在沟通什么，它就是装饰。装饰就是 slop。
- **Silent success。**成功动作*不*值得一个 “Done!” toast。如果用户看得到结果，就不需要确认。把 toasts 留给失败，以及那些会隐藏自身效果的动作。
- **Optimism with rollback。**用户动作发生后立刻更新 UI。请求放到后台发送。若失败，animate rollback 并提供 Undo。往返延迟是感知杀手。
- **克制，而不是“以克制当人格”。**Hallmark 不是 “no motion”。Hallmark 是*正确位置的正确 motion*。拖拽 handle 在抓取时弹入 focus 是好的。每张卡片 hover 都 pulse 的页面是 slop。
- **Reduced motion 是一等状态，不是事后补丁。**每个 interaction 都明确 reduced-motion 行为。默认是：把空间运动折叠成 opacity crossfade，保持 duration ≤ 150ms，并保留功能性状态变化。
- **Keyboard first, hover second。**每个 hover affordance 都有 focus 等价物。没有任何 interaction 只能 hover。

## When to ship motion by default

本 skill 偏向 motion-cut。但某些 archetypes 没有 motion 会显得**破损**：它们视觉很忙（或高度数字驱动），完全静止会像截图而不是界面。对这些 archetypes，默认自动交付 2–3 个小而有目的的 microinteractions，不必等用户要求。

**Default-on archetypes：**Bento Grid · Stat-Led · Workbench · Marquee Hero · Conversational FAQ

**Default-off archetypes：**Editorial · Manifesto · Letter · Quote-Led · Type Specimen · Long Document · Index-First · Letter

对 default-on，从这个菜单中选择**两个或三个**（每页绝不超过三个 primitives）：

| Microinteraction | When to ship | Recipe |
| --- | --- | --- |
| **Number reveal** | Stat-Led hero、任何地方的 headline numbers | IntersectionObserver 在 viewport entry 时触发；`requestAnimationFrame` 用 `--ease-out` 在 1.2–1.6 s 内从 0 计到目标值。Reduced-motion：跳过动画，直接渲染最终值。 |
| **Pricing card lift** | Pricing tier cards | `translateY(-3px)` + shadow upgrade on `:hover`，180 ms `--ease-out`。Active state：60 ms 回落到 `translateY(0)`（按压）。 |
| **CTA hover lift** | Primary CTA buttons | `translateY(-1.5px)` + background-fade。200 ms `--ease-out`。Active state 60 ms。 |
| **Marquee scroll** | Marquee Hero、customer-logo strip | `@keyframes marquee` 在 40–60 s 内 `translateX(-100%)`，infinite。Hover 时暂停。Reduced-motion：停止滚动，显示前三项。 |
| **Stagger reveal** | Testimonials、feature cards、gallery | IntersectionObserver 对每张 card 触发；100 ms stagger；opacity 0 → 1 + `translateY(8px → 0)`；`--ease-out` 400 ms。**只触发一次，绝不在滚动时反复触发。** |
| **Recommended-tier pulse** | 中间 pricing tier | 一次性 `@keyframes pulse-border` 2 s，在 viewport entry 时运行一次。保持微妙：border 上 opacity 0.4 → 1 → 0.4。不要 loop。 |
| **Caret blink** | *位于* typed command 内部（install code、terminal nav、code mockup），绝不作为 standalone decoration | `@keyframes blink` 1 s steps(2) infinite，作用于 1ch 宽 block，放在 typed command line 末尾，让它读作“你会接着输入”的 affordance。Reduced-motion：实心 block，不闪烁。**硬规则：**caret 必须位于 `<pre class="code">…▮</pre>` 或 N8 Terminal nav line 内部，绝不作为漂浮在 hero 中的 standalone `<span>`。 |
| **Number tick on data update** | Dashboard live values | 见下方 *Number tick* recipe。 |

### Hard rules for default-on motion

1. 每个 animation 都尊重 `prefers-reduced-motion: reduce`：要么完全跳过，要么以 0.01 s 运行。
2. **每页不超过三个不同 animation primitives。**counter + hover-lift + marquee = 三个。不要添加第四个。“再加一个”的诱惑就是 slop pull。
3. 40 rem 以下 viewport 禁止 scroll-linked animations（沿用 [`component-cookbook.md` § Mobile collapse](component-cookbook.md) 的 mobile rule）。
4. 除连续 loops（marquee、ambient breathing、caret blink）外，没有 animation 超过 2 s。
5. “如果我移除这个 animation，会有人注意到吗？”测试仍然适用；但对 default-on 集合，答案是“会，页面会变得像僵硬截图，品牌也会变薄”。

### What never gets default motion

- Body text reveals on scroll。阅读不是电影体验。
- Background gradient shifts。分散注意力。
- Cursor followers。永远是 slop。
- Section-by-section fade-up-stagger。选择一个 orchestrated entrance，而不是十二个。
- Tab content sliding sideways。只用 crossfade（见 Tab change recipe）。

当页面是 default-off（Editorial、Manifesto 等）时，motion 是 *opt-in*：用户必须要求。静止就是这些页面的品牌。

## The timing canon

从这些 durations 中选择。不要发明新值。

| Bucket | Use for |
| --- | --- |
| **80–120 ms** | 即时反馈（button press tick、checkbox state、keystroke echo）。大脑会把这个窗口里的反馈读作即时。 |
| **150–200 ms** | Hover state transitions、focus rings appearing、single-property fades、tooltip appears（之前有 delay，见下文）。 |
| **250–300 ms** | Modal / dropdown / sheet opens、content fades in、validation icon scales in、tab content crossfade。 |
| **400–500 ms** | Toast slides in、page-load section reveal、complex multi-property transitions、accordion open。 |
| **0 ms** | 意外地经常是正确答案。Focus state、keyboard navigation、error appearance，很多东西根本不该 animate。 |

Exit durations 是对应 entrance 的 60–75%。300ms enter 搭配 200ms exit。绝不反过来。

## The easing canon

三条 curves 覆盖约 90% 的 UI motion。把它们 tokenise，绝不 freestyle。

```css
:root {
  /* Entering elements — decelerate into place */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* Exiting elements — accelerate away */
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);

  /* State toggles — symmetrical */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* Material 3 standard alternative — slightly less aggressive */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Spring physics 只替代**物理** interactions 的 eases：drag-and-drop release、swipe-to-dismiss、picker wheel snap、令人满足的 button press scale-bounce。其他情况：用 ease。

| Spring config | Feel | Use for |
| --- | --- | --- |
| `stiffness: 50, damping: 20` | 温和、无 overshoot | Calm reveals；几乎像 ease |
| `stiffness: 180, damping: 22` | 利落、轻微 overshoot | Drag release；toggle handle |
| `stiffness: 280, damping: 26` | 硬朗、最小 bounce | Picker snap；类似 haptic 的 button press |
| `stiffness: 400, damping: 40` | 很硬、无 bounce | Position corrections；严格说不算 spring |

**Banned curves：**`ease`（浏览器默认，平且没有工艺）、除 progress bars 和 infinite loaders 外的 `linear`、任何 overshoot 超过约 110% 的曲线（`cubic-bezier(0.34, 1.56, 0.64, 1)` 及同类）。Bounce 已过时，会暴露模板感。

## Recipes

每个 recipe 包含：trigger、what changes、duration、easing、accessibility note。如果这里没有某个 recipe，回到 principles 并从中推导。

### Button press

Trigger：pointer down。Changes：按下时 `transform: scale(0.98)`，释放时回到 base styling。Duration：in 100ms，out 150ms。Easing：in `--ease-in`，out `--ease-out`。A11y：focus ring 保持可见；绝不 animate focus ring 是否存在。

```css
.btn {
  transition: background-color var(--dur-short) var(--ease-out),
              transform 100ms var(--ease-out);
}
.btn:hover { background: var(--color-ink); color: var(--color-paper); }
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
```

### Input focus + label float

Trigger：focus event。Changes：border-bottom colour、label 上滑并缩小、可选的 subtle background tint。Duration：200ms。Easing：`--ease-out`。**关键：**变化发生在用户输入*之前*，Stripe / Linear 用它确认字段是活的。A11y：只用 `:focus-visible`，不用 `:focus`；尊重 reduced-motion，移除 slide，只保留 colour change。

### Form validation

Trigger：字段第一次被 touched 后的 blur（“touched” pattern），随后每次 input 重新 validate。绝不要从一开始就每次 keystroke validate，这很敌意。Changes：icon scales in（200ms `--ease-out`）、border tint、helper text 替换。三段式 error message：哪里坏了、为什么、如何修。

### Toast notification

Trigger：action 完成（或失败）。Stack 在 viewport 一角；新 toasts 向一个方向推开现有 toasts；已有 toasts 在新 toast 到达时**不要**重新定位。Duration：400ms slide-in `--ease-out`、停留 4–6s、300ms slide-out `--ease-in`。Hover/focus 时暂停 auto-dismiss。**少用：**如果 action 的效果可见（一行被删除；用户看得到它消失），不需要 toast。错误*总是*需要带 retry/undo 的 toast。

### Modal open / close

Trigger：显式用户动作（click、key shortcut）。Backdrop fades 300ms `--ease-out`。Content scale 0.96 → 1.0 + opacity 0 → 1，300ms `--ease-out`。Close：220ms `--ease-in`，scale 1.0 → 0.98，opacity → 0。使用原生 `<dialog>` 元素，它免费处理 focus trap 和 `::backdrop`。背景设 `inert`。初始 focus 给第一个 interactive element，而不是 close button。Reduced motion：opacity-only crossfade，150ms。

### Dropdown / menu

Trigger：click 或 key shortcut。Open：180ms `--ease-out`；如果 items ≤ 8，可选 30ms-stagger items。Close：140ms `--ease-in`。Outside click 和 Escape light-dismiss。可用时使用 Popover API。Anchor positioning：距离 viewport edge 16px 内时 flip。

### Tooltip

Trigger：mouse hover（带 **800–1000ms delay**，防止随便移动时闪现）或 keyboard focus（**0ms delay**，键盘用户是有意抵达，绝不延迟）。Animation：150ms `--ease-out` opacity。WCAG 1.4.13：tooltip 必须 hoverable（指针能移到上面而不消失）、persistent（不会因意外移动消失）、dismissible（Escape）。

### Tab change

Trigger：click 或 arrow-key。Underline 使用 `transform: translateX()` + width transition，250ms `--ease-out`。Outgoing content fades 100ms `--ease-in`，incoming fades 150ms `--ease-out`，带 50ms delay。**绝不 animate tab content 的 height**；如果 tabs 高度变化，animate `grid-template-rows: 0fr → 1fr`。

### Number tick

Trigger：data loaded。Counter 用 `--ease-out` 作用于*数值*本身，在 400ms 内从 0 增至 value，而不是 animate 元素。用 `Intl.NumberFormat` 实现 locale-correct separators。A11y：用 `aria-live="polite"` announce 最终值，*不要* announce 每一 tick。Reduced motion：跳过 tick，显示最终值。

### Copy-to-clipboard

Trigger：click。Changes：button label 换成带 check icon 的 “Copied”；2.5s 后恢复。**不要 toast。**label change *就是* feedback。如果用户更早移开，`mouseleave` 时恢复。

```js
btn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(value);
  btn.dataset.state = "copied";
  setTimeout(() => delete btn.dataset.state, 2500);
});
```

```css
.copy-btn[data-state="copied"] .copy-btn__label::after { content: "  ✓  Copied"; }
.copy-btn[data-state="copied"] .copy-btn__label > * { opacity: 0; }
```

### Drag handle

Trigger：hover（带 **1–2s delay**，Notion pattern）。Changes：handle 通过 opacity transition reveal，cursor 切换为 `grab`。抓取时：cursor `grabbing`，50% opacity 的 ghost element 跟随 pointer，drop indicator（1px line、accent colour）追踪最近 valid drop target。释放 snap 使用 spring stiffness 280 / damping 26。A11y：row focus 时用 arrow-key reorder；用 `aria-live` announce drag state。

### Optimistic update with rollback

Trigger：任何有已知正确 local prediction 的动作（toggle、like、archive、reorder）。Changes：state 立即 mutate；row 明显更新。Async request 发送。成功时：什么也不发生，silent success 是品味标记。失败时：200ms colour rollback animation + 带一个 Undo button 的 toast。只要用户可能还需要它，toast 就不要 auto-dismiss。

```js
const prevState = item.completed;
item.completed = !prevState; render();
try {
  await api.update(item);
} catch {
  item.completed = prevState; render();
  toast({ tone: "error", message: "Couldn't save.", action: { label: "Try again", run: retry } });
}
```

### Search-as-you-type

Trigger：input event。请求前 debounce 250ms；debouncing 时显示 subtle indicator（border opacity 或 label colour shift）。用 `<mark>` 高亮结果匹配。A11y：debounce settle 后用 `aria-live="polite"` announce result count，绝不逐 keystroke announce。

### Command palette navigation

Trigger：⌘K 或 `/`。Open：即时，无 animation。Arrow-keys 移动 selection，**indicator transitions** 在 rows 间移动（highlight 的 `transform: translateY()` 用 120ms `--ease-out`），但 items 本身不动。Enter 选择。Escape 关闭。Items 只在第一次打开时 stagger-fade in，filter change 时绝不这样做。Text input 始终保持 focus。这是 Linear / Raycast / Vercel pattern。

### Page-load reveals

一次 orchestrated entrance。按 DOM index stagger，总时长 capped at ~500ms。使用 `IntersectionObserver`，绝不用 scroll listeners。首次 reveal 后，不再做 on-scroll animations；让页面就那样*存在*。Theme-specific themes（Atelier、Salon、Newsprint）完全跳过 reveals；这是正确行为，不是 bug。

## The named tells（AI defaults 会产生什么）

这些是 generated code 的 microinteraction signatures。[`SKILL.md`](../SKILL.md) 中的 slop test 会检查它们；任何一个都应视为 critical finding。

1. **`transition-all`。**每个属性都在 animate，包括本应即时的属性（visibility、display、focus rings）。始终指定属性。Hallmark output 禁止该 class。
2. **Universal `hover:scale-105`。**每张卡片 hover 都 lift，无 shadow change、无指定 easing、无目的。这是 AI 反射式的“make it interactive”手势。
3. **Bouncy overshoot easings。**UI 元素上使用 `cubic-bezier(0.34, 1.56, 0.64, 1)` 及同类。缺乏品味的 2018 复古。把 overshoots 留给真实物理 interactions（drag release）。
4. **Multiple simultaneous hover effects。**一张卡片 hover 时同时 translate、scale、shadow、colour-shift、rotate。只选*一个*信号。
5. **Animated gradient backgrounds on hover。**Gradient 在 colour space 中滑动。分散注意力、昂贵、什么也没表达。
6. **Glow halos on text。**为了 “neon” 使用重 `text-shadow`，会破坏 contrast、伤害 legibility。
7. **Cursor-follower dots。**一个滞后于 pointer 的尾随点。没有价值，还会触发 vestibular issues。
8. **Custom cursors on every interactive element。**与 OS conventions 冲突；用户学不到什么可点击。
9. **Auto-rotating carousels with no controls。**违反 WCAG 2.2.2。永远如此。
10. **Parallax on scroll。**不同 layers 以不同速度移动。Vestibular trigger；很少服务内容。
11. **`transition` applied to layout properties。**Animate `width`、`height`、`padding`、`margin`、`top`、`left`。每帧触发 reflow。使用 `transform` 或 `grid-template-rows: 0fr → 1fr`。
12. **Universal scroll-triggered fade-up-stagger。**每个 section 在 intersection 时 fade in。页面永远安定不下来。选择*一个* orchestrated entrance。
13. **Celebratory success toasts。**用户刚保存了一个他们看得到已保存的东西，却出现 “Done!”。Silent success 才是 taste。
14. **Confirmation dialogs for reversible actions。**“Are you sure you want to delete this?” 改为 optimistic delete + Undo toast。
15. **Spinners with no minimum visible time。**动作 80ms 完成时 spinner 闪一下。要么延迟显示（150ms），要么设置最短可见时长（300ms）。
16. **Tooltips with the same delay on hover and focus。**Hover 应延迟 800–1000ms；focus 应立刻出现。它们意图不同。
17. **Focus rings that animate in。**Ring 用 200ms fade in，导致键盘用户在 transition 开始时没有 indicator。Focus rings 必须立刻出现。永远如此。
18. **Color-only state change。**字段出错只变红，没有 icon、没有 text、没有 border style change。违反 WCAG 1.4.1，且约 8% 男性用户难以读取。
19. **Toasts that move existing content。**新 toast 把页面向下推；dismissed toast 又让页面弹回。Stack toasts；不要移动 layout。
20. **Hover delays on touch。**`:hover` state 是 touch 用户永远触达不到的状态，因为没有等价 focus / tap 行为。

## Theme-aware microinteractions

Microinteractions 会随 theme 调整。同一个 button press 在 Brutal 中比在 Atelier 中更响。按 theme 应用 multiplier：

| Theme | Duration scale | Easing flavour | Notes |
| --- | --- | --- | --- |
| Specimen | 1.0× | `--ease-out` | Default。克制。 |
| Midnight | 0.9× | `--ease-out` | 利落、technical。 |
| Brutal | 0.75× | `--ease-out` (sharper) | 快速、果断。No spring。 |
| Garden | 1.2× | `--ease-out` | 平静。Springs welcome。 |
| Atelier | 1.3× | `--ease-out` (very gentle) | 慷慨；几乎没有 movement。 |
| Newsprint | 0× | none | Static。Print metaphor。 |
| Terminal | 0× | none, except caret blink *inside* a typed command (N8 nav, install code) | Print + monospace metaphor。**No standalone blinking cursor**，见上方 Caret blink 行。Caret 只在用户会输入的位置闪烁。 |
| Manifesto | 0.7× | `--ease-out` (sharp) | Snap into place。 |
| Salon | 1.4× | `--ease-out` (very gentle) | 最柔和。 |
| Linen | 1.2× | `--ease-out` | 平静。 |
| Almanac | 0.85× | `--ease-out` | 功能性，像 reference book。 |
| Sport | 0.7× | `--ease-out` (sharp) | 快，带 italic-energy。 |
