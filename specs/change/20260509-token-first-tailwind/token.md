# Token-first Tailwind 的 token 命名

## 决策

Open Design 拥有 Tailwind color、radius、shadow 和 font vocabulary。Tailwind v4 通过 CSS-first `@theme` 配置，用 `--color-*: initial` 清空默认 color namespace，并暴露由 `apps/web/src/index.css` CSS variables 支撑的项目 tokens。

Runtime source of truth 保持在 `:root`、`[data-theme="dark"]` 和 system-mode CSS variable overrides 中。Tailwind utilities 通过这些 variables 解析，因此 light mode、dark mode、system mode 和 custom accent 共用同一条 token path。

## 命名模型

Token names 对核心 surfaces 与 copy 遵循 `index.css` 中当前的产品语言，对 status colors 使用 semantic names。

- Surface tokens 使用 nouns：`bg`、`app`、`panel`、`subtle`、`muted`、`elevated`。
- Text utilities 保留 `text-*` scale：`text-text`、`text-strong`、`text-muted`、`text-soft`、`text-faint`。
- Border tokens 保留 `border-*` scale：`border`、`border-strong`、`border-soft`。
- Accent tokens 保留 `accent-*` scale，因为 user custom accent 会在 runtime 写入同一批 CSS variables。
- Status tokens 在 Tailwind 中使用 semantic names：`success`、`info`、`discovery`、`danger`、`warning`。
- Tailwind utility names 应读起来像项目概念：`bg-panel`、`text-muted`、`border-border-strong`、`text-danger`、`bg-success-surface`、`bg-selection-overlay`、`rounded-card`、`shadow-token-sm` 和 `font-mono`。
- Radius、shadow 和 font utilities 使用由 `--radius*`、`--shadow*`、`--sans`、`--serif` 和 `--mono` 支撑的 project theme aliases；spacing 使用 Tailwind native utilities，例如 `gap-3`。Typography 通常使用 native Tailwind scale；当 visual parity 需要时，为现有 9px、10px、10.5px、11px、11.5px、12.5px、13px 和 13.5px UI 使用精确 project aliases。

## 设计决策：由 token 支撑 color、radius、shadow 和 font

Project-owned tokens 覆盖 colors、radius、shadow 和 font，因为 color 承载 Open Design 的 brand 与 theme behavior，而现有 cards、popovers、modals、inputs、controls、editorial moments 和 code/file-path text 依赖项目 variables 来保持视觉稳定。

Radius、shadow 和 font aliases 会解析到当前 CSS variables，包括 dark-theme shadow overrides 与 custom `--serif` / `--mono` stacks。Spacing 使用 Tailwind native system，让迁移期间 TSX class names 保持熟悉；type 使用 native utilities，并为现有 9px、10px、10.5px、11px、11.5px、12.5px、13px 和 13.5px component copy 提供精确的 `text-ui-9`、`text-ui-10`、`text-ui-10_5`、`text-ui-11`、`text-ui-11_5`、`text-ui-12_5`、`text-ui-13` 和 `text-ui-13_5` aliases：

```tsx
className="rounded-card shadow-token-sm font-mono bg-panel text-text border border-border"
```

`index.css` 中的 global base styles 继续设置 app-level font family、page background 和 text color。Component-level font changes 可以使用 Tailwind font utilities，因为 `font-sans`、`font-serif` 和 `font-mono` 会解析到现有 project stacks。

## 必需的 `index.css` source variables

实现应在使用对应 `@theme` aliases 前添加这些 source variables，让 Tailwind theme values 仍指向 runtime CSS-variable source of truth：

```css
:root {
  --accent-wash: color-mix(in srgb, var(--accent) 12%, transparent);
  --accent-foreground: #fff;
  --warning-border: color-mix(in srgb, var(--amber) 35%, transparent);
  --overlay: rgba(28, 27, 26, 0.42);
  --selection-overlay: rgba(22, 119, 255, 0.18);
  --selection-outline: rgba(22, 119, 255, 0.55);
  --inspect-overlay: rgba(37, 99, 235, 0.12);
}
```

蓝色 selection/inspect values 是 preview annotation overlays 的 product interaction tokens。Selection/comment tokens 保留当前 FileViewer `#1677ff` / `rgba(22, 119, 255, …)` family；inspect overlay 保留当前 edit-mode bridge `rgba(37, 99, 235, …)` value。传输 user-authored colors 的 file color conversion helpers 继续作为 allowlisted exceptions。

## `@theme` block

```css
@theme {
  --color-*: initial;

  /* Surfaces */
  --color-bg: var(--bg);
  --color-app: var(--bg-app);
  --color-panel: var(--bg-panel);
  --color-subtle: var(--bg-subtle);
  --color-muted-surface: var(--bg-muted);
  --color-elevated: var(--bg-elevated);

  /* Borders */
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-border-soft: var(--border-soft);

  /* Text */
  --color-text: var(--text);
  --color-strong: var(--text-strong);
  --color-muted: var(--text-muted);
  --color-soft: var(--text-soft);
  --color-faint: var(--text-faint);

  /* Accent */
  --color-accent: var(--accent);
  --color-accent-strong: var(--accent-strong);
  --color-accent-soft: var(--accent-soft);
  --color-accent-tint: var(--accent-tint);
  --color-accent-hover: var(--accent-hover);
  --color-accent-wash: var(--accent-wash);
  --color-accent-foreground: var(--accent-foreground);

  /* Semantic status */
  --color-success: var(--green);
  --color-success-surface: var(--green-bg);
  --color-success-border: var(--green-border);
  --color-info: var(--blue);
  --color-info-surface: var(--blue-bg);
  --color-info-border: var(--blue-border);
  --color-discovery: var(--purple);
  --color-discovery-surface: var(--purple-bg);
  --color-discovery-border: var(--purple-border);
  --color-danger: var(--red);
  --color-danger-surface: var(--red-bg);
  --color-danger-border: var(--red-border);
  --color-danger-foreground: var(--bg-panel);
  --color-warning: var(--amber);
  --color-warning-surface: var(--amber-bg);
  --color-warning-border: var(--warning-border);

  /* Interaction and overlays */
  --color-focus: var(--accent);
  --color-focus-ring: var(--accent-soft);
  --color-overlay: var(--overlay);
  --color-selection-overlay: var(--selection-overlay);
  --color-selection-outline: var(--selection-outline);
  --color-inspect-overlay: var(--inspect-overlay);
  --color-control-hover: var(--bg-subtle);
  --color-control-active: var(--bg-muted);

  /* Radius */
  --radius-control: var(--radius-sm);
  --radius-card: var(--radius);
  --radius-panel: var(--radius-lg);
  --radius-token-pill: var(--radius-pill);

  /* Shadows */
  --shadow-token-xs: var(--shadow-xs);
  --shadow-token-sm: var(--shadow-sm);
  --shadow-token-md: var(--shadow-md);
  --shadow-token-lg: var(--shadow-lg);

  /* Fonts */
  --font-sans: var(--sans);
  --font-serif: var(--serif);
  --font-mono: var(--mono);

  /* Exact existing UI type sizes */
  --text-ui-9: 9px;
  --text-ui-10: 10px;
  --text-ui-10_5: 10.5px;
  --text-ui-11: 11px;
  --text-ui-11_5: 11.5px;
  --text-ui-12_5: 12.5px;
  --text-ui-13: 13px;
  --text-ui-13_5: 13.5px;
}
```

## 现有 CSS variable mapping

### Surfaces

| Existing CSS variable | Tailwind theme token | Utility examples | 用途 |
| --- | --- | --- | --- |
| `--bg` | `--color-bg` | `bg-bg`, `text-bg` | 主 warm paper canvas，以及 dark controls 上的 inverse text。 |
| `--bg-app` | `--color-app` | `bg-app` | App shell background 和 loading shell background。当它等于 `--bg` 时保留为 compatibility alias。 |
| `--bg-panel` | `--color-panel` | `bg-panel`, `text-panel` | Cards、panes、inputs、popovers、modal foreground surfaces。 |
| `--bg-subtle` | `--color-subtle` | `bg-subtle` | 安静 hover fills、sidebars、secondary control fills、code backgrounds。 |
| `--bg-muted` | `--color-muted-surface` | `bg-muted-surface` | 更强的 quiet fill、pressed control states、更密的 neutral chips。 |
| `--bg-elevated` | `--color-elevated` | `bg-elevated` | Modals 和 elevated overlays。 |

### Borders

| Existing CSS variable | Tailwind theme token | Utility examples | 用途 |
| --- | --- | --- | --- |
| `--border` | `--color-border` | `border-border`, `divide-border` | 默认 hairline borders。 |
| `--border-strong` | `--color-border-strong` | `border-border-strong`, `divide-border-strong` | Hover、active、selected 和 focus-adjacent borders。 |
| `--border-soft` | `--color-border-soft` | `border-border-soft`, `divide-border-soft` | Internal dividers 和 low-contrast separators。 |

### Text

| Existing CSS variable | Tailwind theme token | Utility examples | 用途 |
| --- | --- | --- | --- |
| `--text` | `--color-text` | `text-text`, `border-text`, `bg-text` | 默认可读 UI copy；`bg-text` 用于 stop/destructive-neutral buttons。 |
| `--text-strong` | `--color-strong` | `text-strong`, `bg-strong` | Headings、project names、高强调 labels。 |
| `--text-muted` | `--color-muted` | `text-muted`, `border-muted` | Secondary copy、labels、icons、inactive controls。 |
| `--text-soft` | `--color-soft` | `text-soft` | 较低强调的 disabled-adjacent text。 |
| `--text-faint` | `--color-faint` | `text-faint`, `placeholder:text-faint` | Placeholders、timestamps、divider labels、低强调 metadata。 |

### Accent

| Existing CSS variable | Tailwind theme token | Utility examples | 用途 |
| --- | --- | --- | --- |
| `--accent` | `--color-accent` | `bg-accent`, `text-accent`, `border-accent`, `ring-accent` | Primary actions、selected indicators、brand-rust emphasis、active focus edge。 |
| `--accent-strong` | `--color-accent-strong` | `bg-accent-strong`, `text-accent-strong` | Pressed accent、tinted accent surfaces 上更强 labels。 |
| `--accent-soft` | `--color-accent-soft` | `bg-accent-soft`, `ring-accent-soft`, `shadow-[0_0_0_3px_var(--color-accent-soft)]` | Soft halo、input focus ring、active outline glow。 |
| `--accent-tint` | `--color-accent-tint` | `bg-accent-tint` | Warm selected fills、gradient stops、subtle primary surfaces。 |
| `--accent-hover` | `--color-accent-hover` | `bg-accent-hover`, `border-accent-hover` | Primary button hover state。 |
| `--accent-wash` | `--color-accent-wash` | `bg-accent-wash` | 使用 `color-mix(in srgb, var(--accent) 12%, transparent)` 的很安静 active fills。 |
| `--accent-foreground` | `--color-accent-foreground` | `text-accent-foreground` | Solid accent surfaces 上的 text 和 icons。 |

### Semantic status

| Existing CSS variable | Tailwind theme token | Utility examples | 用途 |
| --- | --- | --- | --- |
| `--green` | `--color-success` | `text-success`, `bg-success` | Successful status、saved state、positive confirmations。 |
| `--green-bg` | `--color-success-surface` | `bg-success-surface` | Success notification 和 pill surfaces。 |
| `--green-border` | `--color-success-border` | `border-success-border` | Success notification 和 pill borders。 |
| `--blue` | `--color-info` | `text-info`, `bg-info` | Informational status 和 non-primary active state。 |
| `--blue-bg` | `--color-info-surface` | `bg-info-surface` | Informational status surfaces。 |
| `--blue-border` | `--color-info-border` | `border-info-border` | Informational status borders。 |
| `--purple` | `--color-discovery` | `text-discovery`, `bg-discovery` | Tool、agent、discovery 或 creative status emphasis。 |
| `--purple-bg` | `--color-discovery-surface` | `bg-discovery-surface` | Discovery/tool status surfaces。 |
| `--purple-border` | `--color-discovery-border` | `border-discovery-border` | Discovery/tool status borders。 |
| `--red` | `--color-danger` | `text-danger`, `bg-danger`, `border-danger` | Errors、failed states、destructive actions。 |
| `--red-bg` | `--color-danger-surface` | `bg-danger-surface` | Error 和 destructive confirmation surfaces。 |
| `--red-border` | `--color-danger-border` | `border-danger-border` | Error 和 destructive confirmation borders。 |
| `--bg-panel` on solid danger | `--color-danger-foreground` | `text-danger-foreground` | Solid danger surfaces 上的 text/icons。 |
| `--amber` | `--color-warning` | `text-warning`, `bg-warning` | Warning 和 caution status。 |
| `--amber-bg` | `--color-warning-surface` | `bg-warning-surface` | Warning status surface。 |
| `--warning-border` | `--color-warning-border` | `border-warning-border` | Warning status border。若 warnings 需要手调 contrast，之后再添加真实 `--amber-border`。 |

### Interaction and overlay

| Source in `index.css` | Tailwind theme token | Utility examples | 用途 |
| --- | --- | --- | --- |
| `--accent` | `--color-focus` | `outline-focus`, `ring-focus` | Focus-visible outlines 和 direct focus borders。 |
| `--accent-soft` | `--color-focus-ring` | `ring-focus-ring` | Input 和 composer halo states。 |
| `--overlay` | `--color-overlay` | `bg-overlay` | Modal scrim/backdrop。 |
| `--selection-overlay` | `--color-selection-overlay` | `bg-selection-overlay` | Selected preview/comment overlays。 |
| `--selection-outline` | `--color-selection-outline` | `border-selection-outline`, `ring-selection-outline` | Selected preview/comment overlay outlines。 |
| `--inspect-overlay` | `--color-inspect-overlay` | `bg-inspect-overlay` | Inspect hover overlays 和 annotation hints。 |
| `--bg-subtle` | `--color-control-hover` | `bg-control-hover` | Controls 的默认 neutral hover fill。 |
| `--bg-muted` | `--color-control-active` | `bg-control-active` | Controls 的 neutral pressed/active fill。 |

### Radius and shadow

| Existing CSS variable | Tailwind behavior | Utility examples | 用途 |
| --- | --- | --- | --- |
| `--radius-sm` | 暴露为 `--radius-control`。 | `rounded-control` | Buttons、compact inputs、小控件。 |
| `--radius` | 暴露为 `--radius-card`。 | `rounded-card` | Cards、list rows、standard panels。 |
| `--radius-lg` | 暴露为 `--radius-panel`。 | `rounded-panel` | Popovers、modals、elevated panels。 |
| `--radius-pill` | 暴露为 `--radius-token-pill`。 | `rounded-token-pill` | Pills、badges、segmented controls。 |
| `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg` | 暴露为 `--shadow-token-xs`、`--shadow-token-sm`、`--shadow-token-md` 和 `--shadow-token-lg`。 | `shadow-token-xs`, `shadow-token-sm`, `shadow-token-md`, `shadow-token-lg` | Subtle controls、selected cards、popovers、modals，包括 dark-theme overrides。 |

### Font and native Tailwind primitives

| Existing CSS variable | Tailwind behavior | Utility examples | 用途 |
| --- | --- | --- | --- |
| `--sans`, `--serif`, `--mono` | 暴露为 Tailwind font theme aliases，同时为 base/global CSS 保留相同 CSS variables。 | `font-sans`, `font-serif`, `font-mono` | UI text、editorial moments、code/file paths。 |
| Existing 9px / 10px / 10.5px / 11px / 11.5px / 12.5px / 13px / 13.5px component text | 当 native `text-xs` 或 `text-sm` 会产生 visible drift 时，使用精确 project text-size aliases。 | `text-ui-9`, `text-ui-10`, `text-ui-10_5`, `text-ui-11`, `text-ui-11_5`, `text-ui-12_5`, `text-ui-13`, `text-ui-13_5` | 当前在 `index.css` 中大小为 9px、10px、10.5px、11px、11.5px、12.5px、13px 或 13.5px 的 compact badges、labels、metadata 和 controls。 |

## Utility vocabulary

TSX migrations 使用这套 vocabulary。

### Color utilities

- Surfaces: `bg-bg`, `bg-app`, `bg-panel`, `bg-subtle`, `bg-muted-surface`, `bg-elevated`.
- Borders: `border-border`, `border-border-strong`, `border-border-soft`, `divide-border`, `divide-border-soft`.
- Text: `text-text`, `text-strong`, `text-muted`, `text-soft`, `text-faint`, `placeholder:text-faint`.
- Accent: `bg-accent`, `text-accent`, `border-accent`, `bg-accent-hover`, `text-accent-strong`, `bg-accent-tint`, `bg-accent-soft`, `text-accent-foreground`.
- Status: `text-success`, `bg-success-surface`, `border-success-border`, `text-info`, `bg-info-surface`, `border-info-border`, `text-discovery`, `bg-discovery-surface`, `border-discovery-border`, `text-danger`, `bg-danger-surface`, `border-danger-border`, `text-warning`, `bg-warning-surface`, `border-warning-border`.
- Interaction: `outline-focus`, `ring-focus`, `ring-focus-ring`, `bg-overlay`, `bg-selection-overlay`, `border-selection-outline`, `ring-selection-outline`, `bg-inspect-overlay`, `bg-control-hover`, `bg-control-active`.

### Radius, shadow, and font utilities

- Radius: `rounded-control`, `rounded-card`, `rounded-panel`, `rounded-token-pill`.
- Shadows: `shadow-token-xs`, `shadow-token-sm`, `shadow-token-md`, `shadow-token-lg`.
- Fonts: `font-sans`, `font-serif`, `font-mono` 会解析到 `--sans`、`--serif` 和 `--mono`。

### Utility examples

- Radius: `rounded-control`, `rounded-card`, `rounded-panel`, `rounded-token-pill`.
- Shadows: `shadow-token-xs`, `shadow-token-sm`, `shadow-token-md`, `shadow-token-lg`.
- Fonts: `font-sans`, `font-serif`, `font-mono` 用于 project-backed sans、serif 和 monospace stacks。
- Type: 标准尺寸使用 native Tailwind type utilities；当需要精确匹配现有 9px、10px、10.5px、11px、11.5px、12.5px、13px 或 13.5px UI 时，使用 `text-ui-9`、`text-ui-10`、`text-ui-10_5`、`text-ui-11`、`text-ui-11_5`、`text-ui-12_5`、`text-ui-13` 和 `text-ui-13_5`。

## 迁移规则

1. App UI chrome 和 component styling 使用 Open Design color token utilities。
2. 在 `index.css` 中保留 raw CSS variables 作为视觉 source；Tailwind `@theme` tokens 应为 theme-sensitive values 引用 `var(--*)`。
3. 在 TSX 中使用 status names。例如：`text-danger`、`bg-success-surface`、`border-info-border`。
4. 对当前依赖 `--radius*` 或 `--shadow*` 的 migrated components，使用 project-backed radius 和 shadow utilities；例如 `rounded-card`、`rounded-panel`、`shadow-token-sm` 和 `shadow-token-md`。
5. 依赖 Tailwind no-Preflight setup 的本地 `index.css` border-style reset，让 `border border-border`、`border-border-strong` 及相关 token utilities 渲染 solid borders。只有无法继承该 reset 的 isolated scopes 才添加显式 `border-solid`。
6. 对 `index.css` 中当前定义为 9px、10px、10.5px、11px、11.5px、12.5px、13px 或 13.5px 的 migrated component text，使用精确 type aliases `text-ui-9`、`text-ui-10`、`text-ui-10_5`、`text-ui-11`、`text-ui-11_5`、`text-ui-12_5`、`text-ui-13` 和 `text-ui-13_5`，或在 parent 已提供当前精确尺寸时继承 type size。
7. 在给某个 element 应用 token utilities 前，移除、约束或移动到 `@layer base` 任何会设置同一 CSS properties 的 retained global element/reset selector。Unlayered retained CSS 不能覆盖同一 element 上已迁移的 token utilities，例如 `bg-accent`、`rounded-card`、`border-border`、`px-*` 或 `font-*`。
8. 只有在 Tailwind font theme aliases 指向 `var(--sans)`、`var(--serif)` 和 `var(--mono)` 后，才使用 `font-sans`、`font-serif` 和 `font-mono`；已迁移的 editorial 与 code/file-path text 必须保留当前 project stacks。
9. 对 dynamic variants 使用完整 static class maps。避免 `bg-${status}-surface` 这类 fragment interpolation；优先使用 `{ success: 'bg-success-surface text-success', danger: 'bg-danger-surface text-danger' }` 这种 maps。只有 runtime-generated classes 确实必需时才添加显式 safelist。
10. App UI 和 edit-mode integration 中的 preview annotation overlays 使用 `selection`/`inspect` tokens。File color conversion helpers 只有在传输 user-authored colors 时才保留 allowlist。
11. Brand assets、SVG illustration colors、sketch/canvas user colors 和 file color conversion helpers 保持为 documented exceptions。
12. 同一个 arbitrary color value 在多个 components 中重复出现前，先添加一个 color token。
13. 迁移期间只有当 complex one-off gradients 和 `color-mix()` expressions 编码 component-specific art direction 时，才保持 local；重复模式应提升到上方 interaction/status tokens。
14. 将 `transparent`、`currentColor` / `currentcolor`、`inherit`、`initial`、`unset` 和 `revert` 等 CSS-wide/special keywords 视为 transparent fills、SVG/current-color inheritance 与 reset/inherit states 的 non-token color semantics。Guard 应豁免这些 keywords，同时继续拒绝 app UI chrome 中真实未批准的 named colors。
15. 为 keyword exemptions 和至少一个被拒绝的真实 named color 添加 style guard fixtures，让 guard 能区分 CSS semantics 与未批准 palette names。

## 现有冲突与例外处理

当前 codebase 有一小组 color sources，需要在 guard 变 strict 前迁移到 tokens，或显式 allowlist。

### 迁移到 tokens

- `apps/web/src/components/SettingsDialog.tsx:4244,4255,4358,4369-4370` 使用 legacy variable names 和 fallback colors，例如 `var(--danger-fg, #f88)`、`var(--warning-fg, #fbbf24)`、`var(--fg-2, #9aa0a6)`、`var(--surface-2, #11141a)` 和 `var(--fg-1, #e6e6e6)`。将这些替换为当前 tokens 或 Tailwind utilities，例如 `text-danger`、`border-warning-border`、`text-muted`、`bg-subtle` 和 `text-text`。
- `apps/web/src/index.css:200,202,449,454,1303-1311,6492-6500,8130-8133` 包含 component-level hardcoded foregrounds、shadows、status fallbacks 和 live artifact badge colors。将这些替换为 `--accent*`、`--info*`、`--danger*`、`--success*`、`--warning*`、`--color-accent-foreground`，或已迁移的 Tailwind token utilities。
- `apps/web/src/components/FileViewer.tsx:2350-2352` 和 `apps/web/src/edit-mode/bridge.ts:200-202` 使用蓝色 inspect/comment overlay colors。将这些替换为 `selection`/`inspect` tokens，因为 preview annotation overlays 是重复的 product interaction concept。

### 作为 intentional exceptions 加入 allowlist

- Brand and product assets：`apps/web/src/components/AgentIcon.tsx` brand fills 和 brand gradients。
- One-off SVG illustrations and previews：`apps/web/src/components/NewProjectPanel.tsx:888-912` preview artwork 和 `apps/web/src/components/NewProjectPanel.tsx:1674-1677` generated HSL artwork。可行时优先使用 CSS variables，但当 fixed SVG/art colors 编码的是 illustration 本身时允许保留。
- User-controlled color input and persisted accent defaults：`apps/web/src/state/config.ts`、`apps/web/src/state/appearance.ts`、`apps/web/src/components/SettingsDialog.tsx:4486-4495` accent palette，以及 `apps/web/src/components/pet/PetSettings.tsx:41-48` pet accent settings。这些 values 是 token system 或 user content 的输入。
- Canvas and sketch colors：`apps/web/src/components/SketchEditor.tsx` brush colors 和 canvas drawing colors。Canvas 周围的 UI controls 使用 tokens；user drawing data 保持为 user content。当 eraser/background color 表示 app canvas background 时，可使用 `var(--bg)`。
- File/content color conversion and inspect overrides：`apps/web/src/components/FileViewer.tsx` helpers 和相关 tests，只有在操作 user-authored HTML/CSS 或 browser computed colors 时才保留 raw values。Preview annotation overlays 使用上方 `selection`/`inspect` tokens。
- Manual edit user input examples：`apps/web/src/components/ManualEditPanel.tsx:309` placeholder colors 是 user-authored CSS values 示例，不是 app chrome styling。
- External document、iframe、popup 和 generated runtime HTML styles：`apps/web/src/runtime/exports.ts`、`apps/web/src/runtime/react-component.ts`、`apps/web/src/providers/registry.ts:423-488` 和 `apps/web/src/edit-mode/bridge.ts`。这些 documents 可能在 app CSS/Tailwind context 外运行，因此 scoped and documented inline values 可接受。
- `apps/web/tests/` 下的 tests 和 fixtures：当 colors 是 user content、accent normalization 或 override parsing 的 test data 时可保留。

### 通用决策框架

出现新 color 时，先分类再添加 allowlist entry：

1. App UI chrome 或 reusable component styling 必须使用 Tailwind token utilities，或使用本文件中的 CSS variables。
2. Repeated arbitrary colors 在第二次真实使用后应变成 named token。
3. Runtime theme、custom accent 和 appearance code 可以写入 CSS variable values，因为它们是 token sources。
4. User-authored content、canvas drawing data、imported files、inspect overrides 和 color conversion helpers 可保留 raw color values，因为 app 只是在传输 user data。
5. Brand assets、icons 和 one-off SVG illustrations 可在 color 属于 asset artwork 时保留 fixed colors。
6. 无法访问 app CSS 的 external documents 可保留 scoped inline colors，并加 comment 或 allowlist reason 标明 runtime boundary。
7. 每个 allowlist entry 都应包含 file scope、pattern scope 和 reason。广泛 path-wide allowlists 只应保留给完全由 generated、fixture 或 user-content code 组成的 directories。

## Guardrail target

这套 token 落地后，style guard 应拒绝 app UI files 中的 default Tailwind palette utilities。应拒绝的示例包括 `text-red-500`、`bg-white`、`border-zinc-200`、`from-orange-500`、`ring-blue-400` 和类似 default palette classes。

Hardcoded UI color detection 在 Phase 1 作为 scaffolding 落地，包含 keyword exemptions、allowlist structure 和 fixture/temp-sample validation。现有 hardcoded UI colors 在 component migration phases 按 area 收紧 enforcement 前，保持分类为 migration inventory 或 explicit exceptions。Phase 6 为剩余 app UI surface 启用 strict enforcement。

允许的 color sources：

- 由本文件 `@theme` tokens 生成的 Tailwind utilities。
- `index.css` 和 runtime appearance code 中的现有 CSS variables。
- 当表达 transparent、inherited 或 reset behavior 时，允许 CSS-wide/special keywords，例如 `transparent`、`currentColor` / `currentcolor`、`inherit`、`initial`、`unset` 和 `revert`。
- 显式 documented exceptions：brand assets、SVG illustrations、canvas/sketch user colors、user-authored content、external runtime documents、tests/fixtures 和 color conversion helpers。
