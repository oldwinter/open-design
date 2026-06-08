# Phase 1 Notes: Foundation PR

## 实现

<!-- Files created/modified; implementation decisions; migration inventory/classification; retained/deferred rationale; problems encountered; deviations from design -->

### Step 1: Tailwind foundations

- `apps/web/package.json` / `pnpm-lock.yaml` - 添加 Tailwind v4 foundation dependencies：`tailwindcss`、`@tailwindcss/postcss` 和 `postcss`。
- `apps/web/postcss.config.mjs` - 添加 web-local PostCSS config，用于加载 `@tailwindcss/postcss`。
- `scripts/guard.ts` - 用 compatibility-format comment allowlist 精确的 PostCSS config path，让 residual JavaScript guard 仍能在出现未规划的 project-owned JavaScript 时失败。
- `apps/web/src/index.css` - 添加 Tailwind theme/utilities layered imports，继续排除 Preflight，添加本地 base-layer border-style reset，并在 component migration 前记录 retained element/reset rules 的 cascade policy。

### Step 2: Open Design Tailwind tokens

- `apps/web/src/index.css` - 添加 CSS-first `@theme` block，清空 Tailwind default colors，并暴露 project-approved color namespace，覆盖 surfaces、borders、text、accent、semantic status、interaction overlays、radius、shadows、fonts，以及精确 compact UI text-size aliases。
- `apps/web/src/index.css` - 添加缺失的 runtime source variables：`--accent-wash`、`--accent-foreground`、`--warning-border`、modal overlay、selection overlays 和 inspect overlays，让 Tailwind utilities 通过与现有 styles 相同的 CSS-variable token path 解析。
- `apps/web/src/index.css` - 在 `@theme` block 旁记录 token utility vocabulary，包括代表性的 border/radius/shadow examples，以及 `border border-border` 的 no-Preflight border reset 预期。
- Token resolution 仍以 CSS-variable-first 为原则：light、dark 和 system modes 通过 `:root`、`[data-theme="dark"]` 与 `html:not([data-theme])` 更新现有 token variables；custom accent 继续通过 pre-hydration script 和 `applyAppearanceToDocument()` 更新 `--accent*` variables。

### Step 3: Base style guardrails

- `scripts/guard.ts` - 为 `apps/web/app/` 和 `apps/web/src/` 下的 app UI files 添加 `style policy` guard check。
- `scripts/guard.ts` - 添加 default Tailwind palette utility rejection，覆盖 `text-red-500`、`bg-white`、`border-zinc-200`、`from-orange-500` 等 classes 及相关 color utility namespaces，确保 app UI 使用 Open Design token utilities。
- `scripts/guard.ts` - 添加 hardcoded UI color detection scaffolding，覆盖 hex、`rgb()` / `rgba()`、`hsl()` / `hsla()` 和 named colors。Phase 1 enforcement 接入 scoped guard fixtures；现有 app hardcoded colors 在相关 migration slices 收紧 enforcement 前仍归类为 migration inventory 或 explicit exceptions。
- `scripts/guard.ts` - 添加结构化 hardcoded-color allowlist，包含 path pattern、value pattern 和 reason fields，用于 global token CSS、brand/accent choices、SVG illustrations、sketch/canvas data、file/inspect/user-authored colors、legacy UI fallback colors，以及 tests/fixtures。
- `scripts/guard.ts` - 按语义豁免 CSS-wide 和 special color keywords：`transparent`、`currentColor` / `currentcolor`、`inherit`、`initial`、`unset` 和 `revert`。

### Step 4: Migration inventory and visual comparison prep

- Migration inventory method：对比 `apps/web/src/**/*.tsx` 中引用的 literal class tokens 与 `apps/web/src/index.css` 中定义的 class selectors。当前扫描覆盖 59 个 TSX files、1,492 个 literal class tokens，以及 1,334 个在 `index.css` 中有 matching definitions 的 literal TSX class tokens。剩余 158 个 literal tokens 是 Tailwind-ready local values、data/status words、generated strings，或定义在 `index.css` 之外的 classes；migration slices 必须在 rebase 后重新运行扫描，并在 implementation time 分类任何变更 class。
- Global class migration 的高频 TSX sources：
  | Area / file | Matching `index.css` class count | Representative classes |
  | --- | ---: | --- |
  | Settings dialog and settings sections: `apps/web/src/components/SettingsDialog.tsx`, `McpClientSection.tsx`, `SkillsSection.tsx`, `MemorySection.tsx`, `DesignSystemsSection.tsx`, `PrivacySection.tsx` | 430+ | `modal-backdrop`, `modal`, `modal-settings`, `settings-chrome`, `settings-section`, `section-head`, `hint`, `agent-card`, `library-toolbar`, `filter-pill` |
  | File viewer / inspect / edit surfaces: `apps/web/src/components/FileViewer.tsx`, `ManualEditPanel.tsx`, `FileWorkspace.tsx` | 208+ | `viewer`, `viewer-toolbar`, `viewer-action`, `viewer-body`, `viewer-tab`, `manual-edit-panel-head`, `ws-tabs-shell` |
  | Project creation / project panels / examples / designs: `NewProjectPanel.tsx`, `DesignFilesPanel.tsx`, `ConnectorsBrowser.tsx`, `DesignsTab.tsx`, `ExamplesTab.tsx`, `DesignSystemsTab.tsx`, `PromptTemplatesTab.tsx` | 330+ | `newproj`, `entry`, `df-file-row`, `connector-logo`, `tab-panel-toolbar`, `design-card`, `example-card`, `ds-card` |
  | Shell, chat, composer, common controls: `ProjectView.tsx`, `AppChromeHeader.tsx`, `ChatPane.tsx`, `ChatComposer.tsx`, `AssistantMessage.tsx`, `EntryView.tsx`, `ConversationsMenu.tsx`, `AvatarMenu.tsx`, `QuickSwitcher.tsx` | 230+ | `app`, `app-chrome-header`, `pane`, `chat-log`, `composer-shell`, `msg`, `assistant`, `entry-shell`, `conv-menu`, `avatar-popover`, `qs-palette` |
  | Sketch, runtime, pet, loading, feedback, modals: `SketchEditor.tsx`, `PetRail.tsx`, `PetSettings.tsx`, `PetOverlay.tsx`, `Loading.tsx`, `ToolCard.tsx`, `MessageFeedback.tsx`, `PromptTemplatePreviewModal.tsx`, `QuestionForm.tsx`, `runtime/markdown.tsx` | 190+ | `sketch-editor`, `pet-rail`, `pet-codex-thumb`, `loading-spinner`, `skeleton-shimmer`, `op-card`, `message-feedback`, `prompt-template-modal`, `md-p` |
- Class classification：
  | Classification | Current inventory | Migration action |
  | --- | --- | --- |
  | Component-level migratable styles | 大多数被引用的 global classes，包括 app shell、settings、project panels、viewer chrome、chat/composer、cards、buttons、popovers、modals、pet UI、sketch editor chrome、live artifact cards 和 status surfaces。 | 在所属 phase 中替换为 static token-first Tailwind utility strings，然后从 `index.css` 删除已迁移 selector。按需使用 `token.md` aliases，例如 `bg-panel`、`text-muted`、`border-border`、`rounded-card`、`rounded-panel`、`rounded-token-pill`、`shadow-token-sm`、`shadow-token-md`、`font-mono`，以及精确 `text-ui-*` sizes 以保持 parity。 |
  | Global base styles | `:root` tokens、theme overrides、`*`、`html, body, #root`、`body`、shared `input` / `textarea` / `select` 和 content-neutral `code`。Sources: `apps/web/src/index.css:1-306,367-428`. | 保留为 global/token source，或在受影响 utilities 迁移前移入 `@layer base`。Component slices 可以在这些 base selectors 会覆盖已迁移 utility properties 时删除或限制它们。 |
  | Loading shell | `od-loading-shell`，由 client-only loading path 使用。Sources: `apps/web/app/[[...slug]]/client-app.tsx:5-13`; `apps/web/src/index.css:308-315`. | 保留 global，因为它在 SPA tree 可用前渲染。Token utility migration 发生在已加载的 TSX components 内。 |
  | Keyframes / animation | `skeleton-shimmer`、modal/settings transitions、spinner rules 和 keyframes。Representative source: `apps/web/src/components/Loading.tsx:42`; `apps/web/src/index.css:1121-1143,12049`. | 保留 keyframes 为 global。在动画周围的 element box/color/layout class 可迁移到 Tailwind；animation name 在后续 animation utility strategy 出现前保持 global。 |
  | Content-level / third-party boundary styles | Markdown/runtime/viewer content classes，例如 `markdown-rendered`、`markdown-status`、`prose-block`、`viewer-source`、`viewer-body`、`viewer-empty`、`md-p`、`md-code` 和 file/rendering boundaries。Sources: `apps/web/src/components/FileViewer.tsx:6407-6412`; `apps/web/src/runtime/markdown.tsx:112-196`; `apps/web/src/index.css:9754-9779,10149-10153`. | 保留，或只迁移 boundary 周围的 app chrome。User-authored content、generated HTML、syntax/file previews、iframes 和 external documents 保留在 exception scopes。 |
  | Retained exceptions | Brand icons、SVG illustrations、sketch/canvas user data、user accent controls、file/user-authored colors、test fixtures 和 token definitions。Sources: `scripts/guard.ts:503-534`. | 保持窄 allowlist entry，包含 path pattern、value pattern 和 reason。每个 exception 在所属 migration phase 中重新审视。 |
- Migration 前的 unlayered selector resolution：
  | Selector | Source | Resolution |
  | --- | --- | --- |
  | `button`, `button.primary`, `button.primary-ghost`, `button.ghost`, `button.subtle`, `button.icon-btn`, `button:disabled` | `apps/web/src/index.css:317-365` | Phase 2 将 button variants 迁移到 token utilities。把 `font: inherit`、focus outline、disabled opacity/cursor 等 shared reset-only behavior 移入 `@layer base` 或 constrained primitive scope；TSX callers 迁移后从 global CSS 移除 variant visuals。 |
  | `input`, `textarea`, `select`, placeholder/focus/select chevron rules | `apps/web/src/index.css:367-419` | Phase 2 迁移 component chrome 中的 controls。在 utility-driven inputs 依赖自身 borders、radius、padding 和 focus rings 前，将 native select chevron/base reset 保留在 `@layer base` 或按 form scope 约束。 |
  | `code` | `apps/web/src/index.css:421-428` | 作为 content/base code styling 处理；component-local code chips 迁移到 Tailwind utilities，只为 rich-text/content boundaries 保留 global `code`。 |
- Component classes 的 token-first migration note patterns：
  | 现有视觉模式 | 推荐的 utility 组合 |
  | --- | --- |
  | 带 border、radius 和 shadow 的 panel/card surfaces | `bg-panel border border-border rounded-card shadow-token-sm text-text`，overlays 使用 `bg-elevated rounded-panel shadow-token-md` |
  | Muted copy、labels、metadata、hints | `text-muted`、`text-soft`、`text-faint`，并根据 measured parity 搭配 `text-ui-11`、`text-ui-12_5` 或 `text-xs` |
  | Primary/accent 操作 | `bg-accent text-accent-foreground border border-accent hover:bg-accent-hover rounded-control` |
  | Ghost/subtle 控件 | `bg-transparent text-text border border-border hover:bg-control-hover hover:border-border-strong rounded-control` 或 `bg-subtle hover:bg-control-active` |
  | Status pills 和 banners | `bg-success-surface text-success border-success-border`、`bg-info-surface text-info border-info-border`、`bg-danger-surface text-danger border-danger-border`、`bg-warning-surface text-warning border-warning-border` |
  | Inspect/comment overlays | `bg-selection-overlay border-selection-outline ring-selection-outline` 和 `bg-inspect-overlay` |
  | Popovers/modals | `bg-elevated text-text border border-border rounded-panel shadow-token-lg`，scrims 搭配 `bg-overlay` |
  | Code/file path text | `font-mono text-ui-12_5 bg-subtle text-text rounded-control`，除非 content boundary 需要保留 global rich-text CSS |
- Style guard allowlist and promotion policy：
  | Scope | Pattern | Reason / follow-up |
  | --- | --- | --- |
  | `apps/web/src/index.css` | Hex, RGB(A), HSL(A) | CSS variable token definitions、shadows、overlays 和 retained migration inventory 会在 cleanup 前保持 source of truth。 |
  | `AgentIcon`, `PaletteTweaks`, `PetSettings`, `SettingsDialog` | Hex, RGB(A), HSL(A) | Brand accents、user accent choices 和 legacy token fallbacks；每个 owning phase 必须迁移到 tokens，或保留更窄 exception。 |
  | `SketchEditor`, `SketchPreview`, `NewProjectPanel` | Hex, RGB(A), HSL(A), `none`, `currentColor`, `transparent` | Sketch/canvas user data 和 SVG illustrations；迁移 app chrome colors，保留 user/illustration data colors。 |
  | `FileViewer`, `ManualEditPanel` | Hex, RGB(A), HSL(A) | User-authored file、inspect、editable style 和 runtime content colors；app chrome 在 Phase 4 迁移。 |
  | `MemorySection`, `MemoryModelInline`, `MemoryToast` | Hex, RGB(A), HSL(A) | Legacy memory UI fallback colors；在 settings/project phases 中迁移或收窄。 |
  | `apps/web/tests/` | Any | Tests 和 fixtures 可以显式断言被拒绝的 colors。 |
  | Repeated arbitrary app UI colors | 第二次真实 app UI 使用后的任意未注册 hardcoded color | 迁移前提升为命名 Open Design token。一次性 brand/user-content/illustration data 保留带理由的 allowlist entry。 |
- Inventory verification：Step 4 scan 通过交叉检查 TSX references 与 `index.css` class selector definitions，为 literal class tokens 生成完整 coverage。Migration slices 仍负责 dynamic class maps 和 rebase 后变化的 classes。

### Step 5: Dual-worktree agent visual comparison workflow

- Baseline worktree：`/Users/william/projects/open-design` on `main`；candidate worktree：`/Users/william/projects/open-design-wt-tailwind-phase-1` on `tailwind-phase-1`。
- Phase 1 和后续 migration slices 的固定 service assignments：
  | Role | Namespace | Daemon port | Web port | URL |
  | --- | --- | ---: | ---: | --- |
  | Baseline | `tailwind-baseline` | `18110` | `18111` | `http://127.0.0.1:18111` |
  | Candidate | `tailwind-candidate` | `18120` | `18121` | `http://127.0.0.1:18121` |
- Startup commands：
  ```bash
  # In /Users/william/projects/open-design
  pnpm tools-dev run web --namespace tailwind-baseline --daemon-port 18110 --web-port 18111

  # In /Users/william/projects/open-design-wt-tailwind-phase-1
  pnpm tools-dev run web --namespace tailwind-candidate --daemon-port 18120 --web-port 18121
  ```
- Agent comparison record 的 scenario list：
  | Scenario | Route / state | Required evidence |
  | --- | --- | --- |
  | Dashboard / app shell | 两个 worktrees 都在相同 local data state 下访问 `/` | Full-viewport screenshots，并记录 shell spacing、page background、nav/header controls、text color 和 accent buttons。 |
  | Project detail | 通过 production HTTP/UI flow 在两个 services 中 seed 或选择同一个 project | Project header、chat pane、composer、side panels、status surfaces 和 shared controls 的 screenshots。 |
  | Settings dialog | 在两个 services 中通过 app UI 打开 settings | Modal scrim、modal radius/shadow、settings chrome、sections、buttons、form controls、pills 和 disabled states 的 screenshots。 |
  | File viewer / inspect overlay | 在两个 services 中打开同一 file 或 artifact，并在可用时启用 inspect/edit overlay state | Viewer toolbar/body、tabs、overlays、selection/comment affordances、code/file text 和任意 source preview boundaries 的 screenshots。 |
  | Sketch editor | 在两个 services 中打开同一 sketch surface 或 fixture project | Editor chrome、canvas-adjacent controls、toolbar buttons、popovers 和 user-content color boundaries 的 screenshots。 |
  | Live artifact card | 在两个 services 中打开同一 artifact/runtime surface | Card shell、iframe/runtime boundary、refreshing/failed/success status badges 和 action controls 的 screenshots。 |
  | Modal / popover / control states | 在可行时触发代表性的 menus、quick switcher/avatar/conversation menus、confirmation/question modals、hover/focus/disabled states | Paired screenshots，并记录 overlay elevation、radius、border color、focus ring 和 hover state 的 drift notes。 |
- Viewport and browser state：使用 `1440x1000` viewport、device scale factor `1`；比较相同 scroll position 和同一批已打开 dialogs/popovers；避免 baseline 和 candidate sessions 之间混入不同 zoom 或残留 browser state。
- Theme/accent matrix：
  | Mode | Required state |
  | --- | --- |
  | Light | `data-theme="light"`，default accent。 |
  | Dark | `data-theme="dark"`，default accent。 |
  | System | 清除显式 `data-theme`；使用已记录的 OS/browser color-scheme setting 运行。 |
  | Custom accent | Capture 前通过真实 settings UI，或同一套已记录 localStorage/document-token setup，在两个 services 中应用相同 custom accent。 |
- Fixture data policy：只通过 product UI 或 production HTTP APIs seed；在 phase note 记录 project/artifact/file IDs 或 fixture creation steps。不要为 visual acceptance fixtures 使用 source-level test backdoors。
- Screenshot artifact requirements：在 candidate worktree 的 `.tmp/visual-comparison/<phase>/<scenario>/<theme>/` 下保存 captures，并使用 `baseline-dashboard-light.png` 与 `candidate-dashboard-light.png` 这类 paired names；annotated screenshots 只作为 supporting artifacts。Phase note 必须列出 artifact paths、service URLs、viewport、theme/accent state、fixture identifiers、drift decisions 和 approved deviations。
- Component source inspection guidance：screenshots 是 primary acceptance artifact。只有当 screenshot 显示 drift，或迁移的 global class 需要追溯到 token-first utility replacement 时，才检查 component source；引用 component path/class 或 selector，并记录是否已修复或批准偏差。
- Drift handling：layout offsets、token color changes、radius/shadow changes、focus/hover changes 或 theme/accent state mismatches 必须在 migration slice 中修复，或列为 approved deviation 并附 owner/reason。缺少 fixture data 是 comparison setup failed，应停止并 seed shared data，而不是接受 empty screenshots。
- 每个 visual slice 的 phase notes format：
  ```markdown
  ### Agent visual comparison
  - Baseline: <worktree>, namespace `<name>`, URL `<url>`, command `<command>`
  - Candidate: <worktree>, namespace `<name>`, URL `<url>`, command `<command>`
  - Viewport: 1440x1000 @1x
  - Fixture data: <project/artifact/file IDs or setup steps>
  - Matrix covered: <scenarios × themes/accent states>
  - Screenshot artifacts: <paths>
  - Component source inspected: <paths/selectors and reason>
  - Drift found: <items>
  - Fixes made / approved deviations: <items>
  ```

### Implementation requirements

- Tailwind no-Preflight setup 必须在 `apps/web/src/index.css` 中使用官方 layered CSS imports：
  ```css
  @layer theme, base, utilities;
  @import "tailwindcss/theme.css" layer(theme);
  @import "tailwindcss/utilities.css" layer(utilities);

  @layer base {
    *, ::before, ::after, ::backdrop, ::file-selector-button {
      border: 0 solid;
    }
  }
  ```
- Phase 1 保持 Preflight excluded，并在 base layer 中保留来自 Tailwind Preflight contract 的 project-owned border reset，让后续 utilities layer 中的 `border border-*` token utilities 渲染 solid borders。
- 记录 retained `index.css` element/reset rules 的 cascade-layer policy：任何可能覆盖 migrated Tailwind utilities 的 rule，都必须在受影响 component migration 落地前移入 `@layer base`、约束到 non-migrated scopes，或被移除。

## 验证

<!-- Commands run and results; screenshot artifact links/paths; exact baseline/development startup parameters or full commands; baseline/development service URLs; baseline/development namespace names; agent comparison scenario coverage; theme/accent matrix covered; observed drift; approved deviations -->

- `pnpm install` - 通过；pnpm 对 install 期间缺失 daemon dist CLI 的 workspace bin/link 发出既有 warnings。
- `pnpm guard` - 通过；residual JavaScript allowlist 接受 `apps/web/postcss.config.mjs`。
- `pnpm --filter @open-design/web build` - 通过，使用 Next.js 16/Turbopack。
- `pnpm --filter @open-design/web build` - 添加 Open Design `@theme` token aliases 和 source variables 后通过。
- `pnpm guard` - 添加 style policy check 后通过；已知 Phase 1 hardcoded color migration inventory 保持分类状态，不会让 guard 失败。
- 临时 sample `apps/web/src/__guard_tailwind_palette_sample.tsx`（包含 `className="text-red-500"`）加临时 sample `scripts/guard-style-policy-fixtures/hardcoded-color-sample.tsx`（包含 `color: "#ff0000"`）会让 `pnpm guard` 按预期因两个 style policy violations 失败；该 sample 还包含 `transparent`、`currentColor`、`currentcolor`、`inherit`、`initial`、`unset` 和 `revert`，它们保持 exempt。临时 samples 已移除。
- 临时 sample `scripts/guard-style-policy-fixtures/named-color-sample.tsx`（包含 `color: "red"`）会让 `pnpm guard` 按预期因 unregistered named color violation 失败，同时同一 fixture 中的 CSS-wide/special keywords 保持 exempt。临时 sample 已移除。
- `pnpm guard` - 移除临时 style policy samples 后通过。
- `pnpm --filter @open-design/web test` - 通过；99 files / 925 tests。
- `pnpm typecheck` - 通过。
- `pnpm guard` - 添加 Step 4 migration inventory 和 guard allowlist policy notes 后通过。
- `pnpm typecheck` - 添加 Step 4 documentation 后通过。
- `pnpm --filter @open-design/web test` - 通过；99 files / 925 tests。
- `pnpm --filter @open-design/web build` - 通过，使用 Next.js 16/Turbopack。
- Phase 1 workflow smoke run 的 dual-worktree services 成功启动：
  - Baseline: `/Users/william/projects/open-design`, namespace `tailwind-baseline`, daemon `http://127.0.0.1:18110`, web `http://127.0.0.1:18111`, command `pnpm tools-dev run web --namespace tailwind-baseline --daemon-port 18110 --web-port 18111`.
  - Candidate: `/Users/william/projects/open-design-wt-tailwind-phase-1`, namespace `tailwind-candidate`, daemon `http://127.0.0.1:18120`, web `http://127.0.0.1:18121`, command `pnpm tools-dev run web --namespace tailwind-candidate --daemon-port 18120 --web-port 18121`.
- `pnpm tools-dev status --namespace tailwind-baseline --json` 和 `pnpm tools-dev status --namespace tailwind-candidate --json` - 两者均报告 daemon/web running；desktop 保持 idle，这符合 web-only comparison 预期。
- Agent visual comparison smoke run：
  - Tooling: agent-browser CLI 在 isolated sessions 中打开两个 web URLs 并捕获 paired Dashboard/app shell screenshots；Chrome DevTools MCP 以 1440x1000 viewport 捕获 candidate accessibility snapshot 和 paired Dashboard/app shell screenshots。
  - Phase 1 smoke run 覆盖的 scenario/theme：Dashboard/app shell、light/default accent、两个 worktrees 都使用 empty local data state。
  - agent-browser artifacts：`.tmp/visual-comparison/phase1/dashboard/light/baseline-dashboard-light.png` 和 `.tmp/visual-comparison/phase1/dashboard/light/candidate-dashboard-light.png`。
  - Chrome DevTools MCP artifacts：`.tmp/visual-comparison/phase1/dashboard/light/baseline-dashboard-light-devtools-1440x1000.png`、`.tmp/visual-comparison/phase1/dashboard/light/candidate-dashboard-light-devtools-1440x1000.png` 和 `.tmp/visual-comparison/phase1/dashboard/light/candidate-devtools-snapshot.txt`。
  - `sips -g pixelWidth -g pixelHeight ... && cmp -s ...` - 对 agent-browser screenshots 和 Chrome DevTools MCP screenshots 通过；Phase 1 smoke run 中 captured Dashboard/app shell images 的 dimensions 匹配且 byte-identical。
  - Drift found: none in the covered smoke scenario.
  - Approved deviations: none.
- Full scenario/theme/accent coverage 现在定义为 migration slices 的 required gate。Phase 1 已记录 startup parameters、artifact contract、fixture policy、scenario matrix、theme/accent matrix 和 notes format；后续 phases 必须在检查 project detail、settings、file viewer/inspect、sketch editor、live artifact、modal/popover、dark/system 和 custom-accent states 前，在两个 services 中 seed 同一份 project/artifact/file data。
- `pnpm guard` - 记录 dual-worktree visual comparison workflow 后通过。
- `pnpm typecheck` - 记录 dual-worktree visual comparison workflow 后通过。
