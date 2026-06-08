# Design System Authoring Guide

**父文档：** [`spec.md`](spec.md) · **同级文档：** [`architecture.md`](architecture.md) · [`skills-protocol.md`](skills-protocol.md) · [`agent-adapters.md`](agent-adapters.md)

本指南覆盖 contributor 提交 design system 并首次 review 就通过所需的一切。如果你要向 `design-systems/<slug>/DESIGN.md` 添加 design system，请在打开 PR 前阅读本文。

---

## 1. 9-Section Schema

每个 `DESIGN.md` 都必须包含以下九个 section headings：

```text
## 1. Visual Theme & Atmosphere
## 2. Color
## 3. Typography
## 4. Spacing
## 5. Layout & Composition
## 6. Components
## 7. Motion & Interaction
## 8. Voice & Brand
## 9. Anti-patterns
```

Schema parser 使用 `## [0-9].*` 提取 headings —— 它匹配 section number prefix，而不是完整文本。你可以在数字后添加上下文（例如 `## 4. Spacing & Grid` 或 `## 4. Spacing and layout`）。只有 `## [digit].` prefix 是必需的。Empty section bodies 可以接受（例如很少使用的 motion tokens），但九个编号 headings 必须存在。

### Header format

第一个 H1 会成为 design-system picker dropdown 中显示的 label。H1 后紧跟的 `> Category:` 行决定 grouping：

```markdown
# Design System Inspired by YourBrand

> Category: Developer Tools
> One-line summary for the picker preview.
```

可用 categories：AI & LLM、Developer Tools、Productivity & SaaS、Backend & Data、Design & Creative、Fintech & Crypto、E-Commerce & Retail、Media & Consumer、Automotive、Editorial & Print、Retro & Nostalgic、Bold & Expressive、Modern & Minimal、Professional & Corporate。如果都不合适，请在 PR comment 中解释原因并引入新 category。

---

## 2. Review Framework：Lens A 和 Lens B

所有 design system PR 都按两个 lens review。提交前理解它们，可以消除大多数来回沟通。

### Lens A — Code Correctness（P1/P2）

文件是否结构有效、机器可处理？Lens A 失败会 block。

**Checks：**
- 9 个 section headings 全部存在且顺序正确
- Color tokens 是真实 hex codes（`#RRGGBB` 或 `#RGB`），不是 `#REPLACE_ME`、`currentColor` 或 CSS variable names
- `design-systems/` 中没有重复 folder names
- CSS variables 包裹在 `:root {}` blocks 中（不要裸露在 document 中）
- 存在用于 catalog extraction 的 font labels（见下方 Section 3）
- `prefers-reduced-motion` 针对具体 elements，而不是全局 `*` selector
- Dark mode tokens 使用 `[data-theme="dark"]` override pattern，而不是重复 token blocks

### Lens B — Reasoning Completeness（P3）

内容是否扎实有用，而不只是 syntactically valid？Lens B 失败会生成 P3 comment，但不是 hard block。

**Checks：**
- Color palette 列出 design system 中使用的所有 roles，而不只是 primary/secondary
- Type scale 至少包含 Display、H1、Body、Caption（最少 4 tiers）
- Components section 有真实 CSS，而不是 Lorem Ipsum 或 placeholder `/* TODO */` blocks
- Anti-patterns 足够具体（例如 “Do not use rounded corners > 4px”，而不是 “Avoid bad design”）
- Dark mode 是真正的 override，token values 不同，而不是 light block 的 copy
- Prior art section 命名真实、具体的 products 或 design systems（不要写 “inspired by good design”）

---

## 3. CSS Variable Structure

### `:root` block（必需）

所有 CSS variables 必须位于 `:root {}` block 内。Section 顶层的裸 CSS variable declarations 无效。

```css
/* Correct */
:root {
  --color-primary: #625DF5;
  --color-bg: #FFFFFF;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Incorrect — outside :root 时不是有效 standalone CSS */
--color-primary: #625DF5;
```

每个 color、spacing、typography 和 shadow token 都属于 `:root`。例外是 component-scoped overrides（例如 `.card { --card-padding: 16px; }`），它们属于 Components。

### Dark mode pattern

使用 `[data-theme="dark"]` 覆盖 dark mode tokens：

```css
:root {
  --color-primary: #625DF5;
  --color-bg: #FFFFFF;
}

[data-theme="dark"] {
  --color-primary: #7B75FF;
  --color-bg: #0D0D0D;
}
```

不要在不使用 `[data-theme="dark"]` selector 的情况下为 light 和 dark 创建独立 CSS blocks —— 这会破坏 semantic token system。

### Font labels for catalog extraction

在 Typography section 中包含此 block，供 daemon parser regexes 使用：

```text
Font labels for catalog extraction:

Display: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
Body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
Mono: "JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace
```

Labels 必须是带冒号的 `Display:`、`Body:`、`Mono:`，后面跟完整 font stack。Daemon 读取这些字段来填充 design-system catalog。

---

## 4. Accessibility Requirements

### WCAG AA contrast ratios

所有 text 和 data colors 相对其 background 必须通过 **4.5:1 minimum** contrast ratio（普通文本 4.5:1，18px+ 或 14px+ bold 的大文本 3:1）。

**如何验证：**
- 使用 contrast checker tool（例如 WebAIM Contrast Checker，或测试 `#B37A00` on `#FFFFFF`）
- 对每个 foreground token 测试其 paired background token —— 不要默认只测白底

**常见错误：**
- 没有测试就声称 WCAG compliance —— review 会抓出来
- 使用在 white 上 “looks fine” 但在实际 dark surface 上失败的颜色
- Warning/caution colors 如 `#B37A00`（白底 3.05:1，在 `#FFF3CD` 上 5.35:1）—— 请针对正确 background context 验证

Dark surfaces 上的 **tertiary text tokens**（timestamps、metadata、grid labels）仍必须通过 4.5:1。不要在 `#0A0A0A` 上使用 `#4A6080` —— 那是 2.1:1。改用 `#808086` on `#0A0A0A`（4.54:1）。

### Focus states

每个 interactive component（buttons、links、input fields、带 click handlers 的 cards）必须有 `:focus-visible` style：

```css
.button-primary:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

这是 Lens A accessibility requirement。没有它，keyboard-only users 得不到 visual feedback。

---

## 5. Component Section Best Practices

Components section 是 design system 最常被拒绝的部分。常见 failure：

**不要在 component CSS 中使用 hardcoded colors。** 每个 color 都必须引用 semantic token：

```css
/* Correct */
.button-primary {
  background: var(--color-primary);
  color: var(--color-text);
}

/* Incorrect — hardcoded white breaks dark mode */
.button-primary {
  background: var(--color-primary);
  color: #ffffff;
}
```

**为 states 使用 semantic names。** 在 component CSS 中直接使用 `#00D26A` 之前，优先使用 `--color-state-success`。

**Example component structure：**

```css
/* Status Badge */
.badge {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border-radius: 2px;
}

.badge-success {
  background: rgba(38, 222, 129, 0.15);
  color: var(--color-success);
  border: 1px solid rgba(38, 222, 129, 0.3);
}

.badge-warning {
  background: rgba(255, 159, 67, 0.15);
  color: var(--color-warning);
  border: 1px solid rgba(255, 159, 67, 0.3);
}

.badge-critical {
  background: rgba(255, 71, 87, 0.15);
  color: var(--color-critical);
  border: 1px solid rgba(255, 71, 87, 0.3);
}
```

---

## 6. Motion & Interaction

### `prefers-reduced-motion`

针对具体 properties，而不是全局所有 elements：

```css
/* Correct — 只针对会动的 elements */
@keyframes pulse-glow {
  0%, 100% { text-shadow: 0 0 8px currentColor; }
  50% { text-shadow: 0 0 20px currentColor; }
}

@media (prefers-reduced-motion: reduce) {
  .alert-banner { animation-duration: 0.01ms !important; }
  .countdown { animation: none; }
}

/* Incorrect — global * selector disables transitions everywhere */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

### Timing conventions

```css
--transition-fast:   100ms ease-in;
--transition-base:   150ms ease-out;
--transition-slow:   300ms ease-out;
```

让 easing 匹配用途：`ease-in` 用于 entering，`ease-out` 用于 leaving，`linear` 用于 continuous motion（scrolling、data updates）。

---

## 7. Locale Coverage Requirements

新增 design system 时，在 `design-systems/<id>/DESIGN.md` 中包含完整 English catalog metadata。Locales 有 translated summaries 时使用翻译；否则从 English source fields 派生 runtime fallback。

### 哪些 localized dictionaries 需要更新？

用这个 decision tree 判断是否添加 dictionary copy：

**这个 design system 是否已经存在 localized summary？**
- **Yes** → 添加到对应的 `*_DESIGN_SYSTEM_SUMMARIES` dictionary。
- **No**（暂无翻译）→ 保持 `DESIGN.md` 中 English `summary` 和 `category` metadata 完整；localized runtime 通过 default fallback path 渲染这些字段。

| Locale | File to update | Array |
|--------|---------------|-------|
| German | `apps/web/src/i18n/content.ts` | 存在 localized copy 时更新 `DE_DESIGN_SYSTEM_SUMMARIES` |
| French | `apps/web/src/i18n/content.fr.ts` | 存在 localized copy 时更新 `FR_DESIGN_SYSTEM_SUMMARIES` |
| Russian | `apps/web/src/i18n/content.ru.ts` | 存在 localized copy 时更新 `RU_DESIGN_SYSTEM_SUMMARIES` |

Default English fallback path 是自动的。只有在已有 translated copy 时才添加 localized summary dictionaries。

### Test behavior

`e2e/tests/localized-content.test.ts` 会验证磁盘上的每个 `design-systems/*/DESIGN.md` 都可 discover，并能通过 translated dictionary copy 或 English fallback fields 渲染非空 localized summary。

---

## 8. Anti-patterns Section

Anti-patterns section 是 reviewers 检查你是否理解 design system **不是什么**的地方。好的 anti-patterns 具体且有边界：

```markdown
## 9. Anti-patterns

- Do not use decorative colors in data displays — every hue must convey operational meaning
- Do not use rounded corners greater than 4px — this aesthetic is functional, not friendly
- Do not use proportional fonts for telemetry values — monospace exclusively for data
- Do not animate non-alert elements — motion is reserved for signals that matter
- Do not use light mode — low-light environments are the only context
```

坏的 anti-patterns 很模糊：
- ❌ "Avoid bad design"
- ❌ "Don't overcomplicate things"
- ❌ "Use good colors"

---

## 9. Pre-submission Checklist

打开 PR 前，请验证：

- [ ] 9 个 section headings 全部存在且顺序正确
- [ ] 没有 `#REPLACE_ME` 或 placeholder hex codes
- [ ] 所有 CSS variables 都包裹在 `:root {}`
- [ ] Font labels block 存在（Display / Body / Mono）
- [ ] `[data-theme="dark"]` block 覆盖 light tokens，而不是复制它们
- [ ] Interactive components 有 `:focus-visible` styles
- [ ] 所有 color tokens 相对 paired background 已验证 4.5:1+ contrast
- [ ] Component CSS 中没有 hardcoded colors（例如 `#ffffff`）—— 使用 semantic tokens
- [ ] `prefers-reduced-motion` 针对具体 elements，而不是 `*`
- [ ] Anti-patterns 具体且有边界，不是模糊散文
- [ ] 如果是 dark-only，Dark mode section 明确说明 design intent
- [ ] 没有重复 CSS block definitions（检查 `.panel` 是否出现两次）
- [ ] Category choice 已对照现有 category list 确认

---

## 10. Design System Size Guide

文档完善的 design system 通常是 300–600 行。太短（低于 100 行）会触发 Lens B review，要求补充实质内容。内容泛泛时，写得长也没帮助。

**Focus areas：**
- Color：30–50 行（palette tables + CSS blocks）
- Components：100–200 行（3–6 个 components，完整 specified）
- Visual Theme：30–40 行（atmosphere + use cases + prior art）
- Anti-patterns：8–15 行（每个关键错误一条）

Mission-control design system（`design-systems/mission-control/DESIGN.md`）是很好的参考 —— scope 紧凑（3 个 primary colors、dark only、6 个 components）。
