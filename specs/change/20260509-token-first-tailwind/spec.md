---
id: 20260509-token-first-tailwind
name: Token First Tailwind
status: designed
created: '2026-05-09'
---

## 概览

### 问题陈述

- 当前 frontend styles 集中在 `index.css`。Contributors 修改 UI 时，经常编辑同一个 global CSS file，增加 code conflicts 的概率。
- 项目已经有 CSS variable token system。它需要成为 Tailwind 的 visual source，让 contributors 主要通过 TSX 中的 Tailwind utilities 表达 styles。
- 这次 refactor 需要保持既有 frontend presentation 稳定，尤其是整体页面风格和 visual tone。

### 目标

- 实现 token-first Tailwind：Tailwind 作为 style authoring 和 composition tool，而 visual tokens 继续来自既有 CSS variables。
- 将现有 TSX 中依赖 global CSS classes 的 component styles 迁移为 token-first Tailwind `className` values，减少日常对 `index.css` edits 的依赖。
- 在 multi-contributor 工作中，降低 global CSS hotspot file 带来的冲突概率。
- 保持既有 page style、light/dark themes、warm paper-like tone 和整体 presentation 稳定。
- 建立可重复的 agent visual comparison validation：每个 development worktree 和 baseline worktree 各自启动 web/daemon pair，配备 agent-browser CLI 和 Chrome DevTools MCP 的 agent 对比两个服务的 frontend presentation。比较以 screenshots 作为 primary evidence，以 component source inspection 作为 supporting context，用来确认 visual consistency，并防止 refactor 前后的 display drift。

### 范围

- 集成 Tailwind，并将现有 design tokens 映射为可用的 Tailwind token classes。
- 在 `index.css` 中保留必须继续 global 管理的 base tokens、global base styles 和 content styles。
- 建立 constraints，引导 contributors 优先使用 project tokens 和 base UI primitives。
- 本次 change 保留既有 component abstraction；将现有 TSX 中可迁移的 global CSS classes 完整替换为 token-first Tailwind classes。
- 分批落地：先处理 toolchain、token mapping 和 constraints，再按 area 迁移现有 TSX classes，同时保留必须 global 管理的 styles。

### 约束

- 迁移期间 frontend presentation 不得漂移，整体 page style 必须保持一致。
- Full migration 以当前 UI 的 visual equivalence 判断，migration slices 按 page/component area 组织。
- Tailwind integration validation 和 migration 在现有 components 内完成；component abstractions 保持不变。
- `index.css` 继续承载 global tokens 和 base styles，visual source 仍是项目 CSS variables。

### 成功标准

- Baseline：migration 开始时记录 `apps/web/src/index.css` 当前约有 16,038 行和 1,415 个 CSS class selectors，`apps/web/src/**/*.tsx` 当前约有 51 个 files 和 2,126 个 `className=` occurrences；final PR 必须在 implementation notes 中刷新这些数字。
- TSX migration target：可迁移的 component-level global classes 按 PR slice 完成，每个 slice 记录完整的 migrated / retained / deferred class lists；最终 slice 后，常规 component UI changes 主要使用 TSX Tailwind utilities。
- `index.css` retention target：结束时只保留 tokens、base、keyframes、loading shell、content-level/third-party boundary styles，以及明确记录的 retained global styles；component-level retained global classes 需要逐项说明 reason 和 follow-up point。
- Guard target：default Tailwind palette utilities 和未注册的 hardcoded app UI colors 会让 `pnpm guard` 失败；每个 allowlist entry 都包含 file scope、pattern scope 和 reason。
- Visual consistency acceptance target：每个 development worktree 和 baseline worktree 启动独立的 web/daemon service pair。Agent 使用 agent-browser CLI 和 Chrome DevTools MCP，在两个服务之间对比相同 pages、相同 viewport、相同 theme/accent state 和相同 fixture data。Screenshot comparison 是 primary validation artifact；当 screenshots 暴露 difference，或 migrated class 需要追踪到 token-first Tailwind replacement 时，component source inspection 作为 supporting evidence。Coverage 包括 Dashboard/app shell、project detail、settings dialog、file viewer/inspect overlay、sketch editor、live artifact card，以及 light、dark、system、custom accent 下的 modal/popover/control states。当 visual effects 一致且 frontend presentation 不漂移时，refactor 才可接受；任何 layout offset、token color drift、radius/shadow difference 或 theme-state difference 都必须修复，或记录为 approved deviation。

## 研究

### 现有系统

- `apps/web` 的 global CSS entry 是 Next root layout 中的 `../src/index.css` import。Source: `apps/web/app/layout.tsx:1-4`
- Product shell 通过 `dynamic(() => import('../../src/App'), { ssr: false })` 作为 client SPA 运行；loading shell 仍依赖 global class `od-loading-shell`。Source: `apps/web/app/[[...slug]]/client-app.tsx:5-13`
- 当前 `apps/web` dependencies 包含 Next、React、React DOM 和 testing tools，但 `dependencies` / `devDependencies` 中没有声明 Tailwind、PostCSS 或 Autoprefixer。Source: `apps/web/package.json:30-50`
- Root package 只保留 repository-level tool scripts 和 TypeScript/tsx dev dependencies，root devDependencies 中没有声明 Tailwind/PostCSS packages。Source: `package.json:12-29`
- 当前 visual source 集中在 `apps/web/src/index.css` 的 CSS variables 中：surface、border、text、accent、semantic colors、shadow、radius 和 font tokens 都定义在 `:root`。Source: `apps/web/src/index.css:6-63`
- Dark theme 通过 `[data-theme="dark"]` 覆盖同一组 token，system mode 通过 `@media (prefers-color-scheme: dark)` 和 `html:not([data-theme])` 覆盖 tokens。Source: `apps/web/src/index.css:65-157`
- Base reset、body font/background/text color 和 loading shell 都在 `index.css` 中 global 定义。Source: `apps/web/src/index.css:160-181`
- `index.css` 还承担 component styling responsibilities，例如 button base、primary 和 ghost variants 的 global selectors。Source: `apps/web/src/index.css:183-219`
- `index.css` 也承载 global animation 和复杂 component-area styles，例如 settings modal keyframes 与 live artifact badge/card styles。Source: `apps/web/src/index.css:1121-1143,6219-6299`
- 现有 TSX 通过大量 semantic global classes 连接到 `index.css`。Full migration 需要按 functional area 将这些 classes 的 visual semantics inline 为 token-first Tailwind utilities，同时在 global CSS 中保留必须跨 trees 生效的 loading shell、keyframes 和 content-level styles。Source: `apps/web/src/index.css:183-219,1121-1143,6219-6299`; `apps/web/src/runtime/markdown.tsx:112-196`; `apps/web/src/components/SketchEditor.tsx:220-339`; `apps/web/src/components/pet/PetRail.tsx:58-170`
- Runtime 支持 user-custom accent color：`applyAppearanceToDocument()` 将 `--accent*` CSS variables 写入 `document.documentElement`，mix ratios 必须与 pre-hydration script 保持一致。Source: `apps/web/src/state/appearance.ts:17-25,28-52`; `apps/web/app/layout.tsx:21-29`
- 本 repository 的 local web runtime 应通过 `pnpm tools-dev run web --namespace <name> --daemon-port <port> --web-port <port>` 启动。Runtime files 和 IPC sockets 按 namespace 隔离，因此 development worktree 与 baseline worktree 需要不同 namespace values，并使用不同 daemon/web ports，以便并发运行独立 service pairs。Source: `AGENTS.md:40-45,82-89,91-104`

### 可选方案

- Tailwind CSS v4 的 official Next.js integration path 使用 `tailwindcss`、`@tailwindcss/postcss` 和 `postcss`；PostCSS config 加载 `@tailwindcss/postcss`。App import Tailwind theme 和 utilities layers，同时省略 Preflight。可能与 migrated utilities 冲突的 retained element/reset rules，需要放在更早的 base layer，或在迁移受影响 elements 前移除/约束，因为 unlayered CSS 优先级高于 normal layered utilities。Source: `https://tailwindcss.com/docs/guides/nextjs`; `https://tailwindcss.com/docs/installation/using-postcss`; `https://tailwindcss.com/docs/preflight`; `https://developer.mozilla.org/en-US/docs/Web/CSS/@layer`
- Tailwind CSS v4 支持 CSS-first theme variables，`@theme` 中的 `--color-*` namespace 会生成 `bg-*`、`text-*` 和 `border-*` 等 color utilities。Source: `https://tailwindcss.com/docs/theme`; `https://tailwindcss.com/docs/customizing-colors`
- Tailwind CSS v4 可以用 `--color-*: initial` 清空 default color namespace，然后只声明与 project tokens 对应的 color variables。Source: `https://tailwindcss.com/docs/customizing-colors`
- Tailwind CSS v3 主要通过 `tailwind.config.js` / `theme.colors` 配置 theme colors；v4 official docs 将 theme values 移到 CSS theme variables。Source: `https://v3.tailwindcss.com/docs/theme`; `https://tailwindcss.com/docs/upgrade-guide`
- 现有 repository `guard` mechanism 已经在 TypeScript script 中聚合 checks，并在 failure 时设置 non-zero exit code，因此可以扩展为 token/Tailwind constraint entrypoint。Source: `scripts/guard.ts:6-9,401-422`
- Web tests 位于 `apps/web/tests/`。现有 components、runtime、state 和 providers 的 Vitest coverage 适合为新 helper functions 与 style constraints 添加 lightweight tests。Source: `apps/AGENTS.md:19-24`; `apps/web/package.json:23-29`
- Visual consistency validation 可由具备 browser automation capability 的 agent 执行，对比两个 local service pairs：baseline worktree 运行 pre-migration code，development worktree 运行 current slice。Agent 在相同 scenario、viewport、theme/accent 和 fixture data 下检查 display consistency，以 screenshot comparison 作为 main evidence，以 component source inspection 作为 drift diagnosis 与 migration traceability 的 auxiliary evidence。Source: `AGENTS.md:40-45,82-89,91-104`; `apps/web/src/index.css:65-157`; `apps/web/src/state/appearance.ts:28-52`

### 已考虑的替代方案

- 保留 CSS variables，并增加 CSS Modules 或 component-scoped CSS：这能保留当前 token source 并减少 selector leakage，但多数 UI changes 仍需要单独 stylesheet edit path。选定路径会保留 CSS variables 作为 visual source，并将 component composition 移到 contributors 已经编辑行为的 TSX 中。
- 不使用 Tailwind，改为引入较小的 project utility layer：custom utility layer 可以只暴露 approved tokens，但 team 需要自行维护 naming、variants、responsive states、editor tooling expectations 和 guard behavior。Tailwind v4 提供 utility compiler 和 variant system，同时仍允许项目清空 default color namespace。
- 使用带 JS config 或 compatibility layer 的 Tailwind：JS config 可以集中 theme values，但本 repository 的 TypeScript-first guard 和 Tailwind v4 CSS-first model 更适合将 `@theme` values 与现有 CSS variables colocate。PostCSS `.mjs` entry 仍是窄范围 tool compatibility file，必须显式 allowlist。
- 在 class migration 前提取 shared UI primitives：primitives 能减少重复 class strings，但也会把这个 spec 变成 component architecture migration。本计划保持当前 component boundaries，先迁移 visual expression，并在 token utilities 稳定后再把 primitive extraction 作为后续 refactor。

### 约束与依赖

- Migration 必须遵循 app test directory boundaries：`apps/web` tests 位于 `apps/web/tests/`；本 spec 的 visual consistency validation 由 agent 使用 agent-browser CLI 和 Chrome DevTools MCP 对比两个 local service pairs 完成，并作为 development acceptance workflow 记录在 phase notes 中。Source: `apps/AGENTS.md:19-24`; `AGENTS.md:82-89`
- Dual-worktree comparison 需要为 baseline 和 development worktrees 分配独立 namespace values 与 daemon/web ports；`tools-dev` 支持 `--namespace`、`--daemon-port` 和 `--web-port`。Source: `AGENTS.md:40-45,82-89,91-104`
- Root command boundary 保留 `pnpm guard` 和 `pnpm typecheck` 等 repository-level checks；web validation 使用 package-scoped commands。Source: `AGENTS.md#Root command boundary`; `apps/AGENTS.md:39-51`
- 添加 Tailwind/PostCSS dependencies 或 config changes 会修改 package manifests / build entries，因此必须运行 `pnpm install`，保持 workspace links 和 lockfile 一致。Source: `AGENTS.md#Validation strategy`; `apps/web/package.json:23-29`
- 当前存在合理的 hardcoded color scenarios：Agent brand icons 使用 brand gradients 和 SVG colors；Sketch canvas 使用 user drawing colors 和 canvas drawing colors；FileViewer `rgbToHex()` 转换 user content colors。Source: `apps/web/src/components/AgentIcon.tsx:46-99`; `apps/web/src/components/SketchEditor.tsx:72,144-149`; `apps/web/src/components/FileViewer.tsx:1448-1474`
- 当前也存在可治理的 token deviations：`NewProjectPanel` SVG preview 使用与现有 token values 匹配或接近的 hardcoded colors；`SettingsDialog` local inline styles 使用 legacy token fallbacks。Source: `apps/web/src/components/NewProjectPanel.tsx:797-825`; `apps/web/src/components/SettingsDialog.tsx:3807-3953`
- `index.css` 仍包含使用特定 hex/rgba values 的 component status colors，例如 live artifact refreshing/failed badges 的 blue/red hardcoded colors。迁移这些 styles 前，需要分类 status tokens、brand colors、user content colors 和 one-off illustration colors。Source: `apps/web/src/index.css:6270-6288`

### 关键参考

- `apps/web/app/layout.tsx:1-44` - web layout、CSS import 和 pre-hydration theme/accent script。
- `apps/web/app/[[...slug]]/client-app.tsx:1-17` - client-only App entry 和 loading shell class。
- `apps/web/src/index.css:1-219,1121-1143,6219-6299` - tokens、base、global component styles、keyframes 和 live artifact styles。
- `apps/web/src/state/appearance.ts:1-52` - runtime theme/accent CSS variable writes。
- `apps/web/package.json:23-50` - web scripts 和 dependency surface。
- `AGENTS.md:40-45,82-89,91-104` - tools-dev local lifecycle、web/daemon ports 和 validation command boundaries。
- `scripts/guard.ts:138-151,205-221,328-350,401-422` - existing guard shape 和 failure behavior。
- `apps/AGENTS.md:19-24,39-51` - app test/layout 和 validation boundaries。
- `specs/change/20260509-token-first-tailwind/token.md` - Tailwind color/radius/shadow/font token vocabulary、existing CSS variable mapping、native spacing/type decision 和 guardrail target。
- `https://tailwindcss.com/docs/guides/nextjs` - Tailwind v4 Next.js setup.
- `https://tailwindcss.com/docs/theme` - Tailwind v4 CSS-first theme variables and namespaces.

## 设计

### Change Scope

- Scope: `apps/web` style toolchain。Impact：在 web package boundary 添加 Tailwind v4/PostCSS dependencies 和 config，因为 `@open-design/web` 拥有 `dev/build/typecheck/test` scripts，且当前没有声明 Tailwind/PostCSS dependencies。Source: `apps/web/package.json:23-50`; `https://tailwindcss.com/docs/guides/nextjs`
- Scope: `apps/web/src/index.css`。Impact：保留 CSS variables、dark/system theme overrides、reset、body styles、loading shell、keyframes 和真正 global 的 content styles；在同一入口添加 Tailwind import/theme/base layers，让既有 `layout.tsx` import 仍是唯一 global CSS entry；将 retained conflicting element/reset rules 移入 `@layer base`，或在受影响 TSX migration 前约束它们，并移除已迁移到 TSX 的 component-level global classes。Source: `apps/web/app/layout.tsx:1-4`; `apps/web/src/index.css:6-181,1121-1143,6219-6299`
- Scope: existing `apps/web/src/**/*.tsx`。Impact：按 page/component area 将可替换的 global CSS classes 迁移为 token-first Tailwind `className` values，同时保持 DOM structure 和 component responsibilities 稳定。Source: `apps/web/src/index.css:183-219`; `apps/web/src/**/*.tsx`
- Scope: token mapping。Impact：将既有 color、radius、shadow 和 font CSS variables 暴露为 Tailwind theme variables，同时保留写入同一组 `--accent*` variables 的 runtime custom accent behavior；spacing 和标准 typography sizes 使用 native Tailwind utilities，只有视觉一致性需要时才提供精确的 `text-ui-*` aliases。Source: `apps/web/src/index.css:6-63`; `apps/web/src/state/appearance.ts:17-52`; `apps/web/app/layout.tsx:21-29`; `specs/change/20260509-token-first-tailwind/token.md`; `https://tailwindcss.com/docs/theme`
- Scope: constraints。Impact：扩展 repository guard，拒绝 default Tailwind palette classes，加入 staged enforcement 的 hardcoded color detection，并维护 brand/user-content scenarios 的 allowlists。Source: `scripts/guard.ts:138-151,205-221`; `apps/web/src/components/AgentIcon.tsx:46-99`; `apps/web/src/components/SketchEditor.tsx:72,144-149`; `apps/web/src/components/FileViewer.tsx:1448-1474`
- Scope: testing and validation。Impact：web-owned tests 位于 `apps/web/tests/`；通过 `pnpm guard`、`pnpm typecheck`、`pnpm --filter @open-design/web test` 和 `pnpm --filter @open-design/web build` 验证。Source: `apps/AGENTS.md:19-24,39-51`; `AGENTS.md#Validation strategy`
- Scope: agent visual consistency validation。Impact：每个 development slice 使用 baseline worktree 和 development worktree，各自运行自己的 web/daemon pair；agent 通过 agent-browser CLI 和 Chrome DevTools MCP 对比两个服务中的相同 scenarios，以 screenshots 作为 primary comparison record，以 component source inspection 作为 auxiliary evidence，用来验证 refactor 前后的 frontend display 一致性。Source: `AGENTS.md:40-45,82-89,91-104`; `apps/web/src/index.css:65-157`; `apps/web/src/state/appearance.ts:28-52`

### Design Decisions

- Decision：在 `apps/web` 使用 Tailwind CSS v4，配套 `tailwindcss`、`@tailwindcss/postcss` 和 `postcss`，通过 PostCSS 配置，并在既有 global CSS entry 中 import official layered theme/utilities CSS entries：`@layer theme, base, utilities;`、`@import "tailwindcss/theme.css" layer(theme);` 和 `@import "tailwindcss/utilities.css" layer(utilities);`。这让 Tailwind Preflight 不进入 foundation slice，同时把需要与 utilities 共存的 retained base rules 放进 `@layer base`；后续要迁移到 utilities 的 properties 所在的 unlayered element rules，必须在 affected elements 迁移前移除、约束或移入 base layer。在 `@layer base` 内添加来自 Tailwind Preflight contract 的 narrow local border-style reset，让 `border border-*` utilities 在不 import 完整 Preflight reset 的情况下，也能通过后续 utilities layer 渲染 solid borders。Source: `apps/web/package.json:23-50`; `apps/web/app/layout.tsx:1-4`; `apps/web/src/index.css:183-219`; `https://tailwindcss.com/docs/guides/nextjs`; `https://tailwindcss.com/docs/preflight#border-styles-are-reset`; `https://developer.mozilla.org/en-US/docs/Web/CSS/@layer`
- Decision：通过 CSS `@theme` 定义 Tailwind theme values，因为 v4 会把 `--color-*` theme variables 转成 `bg-*`、`text-*`、`border-*` 等 utilities。Source: `https://tailwindcss.com/docs/theme`; `https://tailwindcss.com/docs/customizing-colors`
- Decision：将 Tailwind color tokens 映射到既有 runtime CSS variables，例如 `--color-bg: var(--bg)`、`--color-panel: var(--bg-panel)`、`--color-accent: var(--accent)`、`--color-danger: var(--red)` 和 `--color-success: var(--green)`。Source: `apps/web/src/index.css:6-63`; `apps/web/src/state/appearance.ts:17-52`; `specs/change/20260509-token-first-tailwind/token.md`
- Decision：在声明 project colors 前，用 `--color-*: initial` 清空 Tailwind default color namespace，让 project classes 表达 Open Design token set。Source: `https://tailwindcss.com/docs/customizing-colors`; `apps/web/src/index.css:6-49`
- Decision：保持 theme state 和 custom accent behavior CSS-variable-first；Tailwind utilities 通过 variables 解析，并自动继承 light/dark/system/user accent changes。Source: `apps/web/src/index.css:65-157`; `apps/web/src/state/appearance.ts:28-52`; `apps/web/app/layout.tsx:21-29`
- Decision：`index.css` 继续拥有 token definitions、layered reset/base behavior、loading shell、keyframes 和 cross-content-area styles；本 change 保留既有 component abstractions，并将现有 TSX 中所有可替换 component-level global classes 迁移为 token-first Tailwind classes。任何 retained unlayered selector 都不能覆盖同一 element/property 的 migrated utilities，migration notes 必须说明 global button base declarations 等 conflicts 的解决方式。Source: `apps/web/src/index.css:160-219,1121-1143,6219-6299`; `apps/web/app/[[...slug]]/client-app.tsx:5-13`
- Decision：在 `scripts/guard.ts` 内添加 project-owned style constraint checks，复用既有 guard aggregation model 和 root command boundary。Source: `scripts/guard.ts:138-151,205-221,401-422`; `AGENTS.md#Root command boundary`
- Decision：允许 brand assets、SVG illustrations、canvas/user content colors 和 color conversion helpers 的明确 exceptions；app UI chrome 使用 token classes 或 CSS variables。Source: `apps/web/src/components/AgentIcon.tsx:46-99`; `apps/web/src/components/SketchEditor.tsx:72,144-149`; `apps/web/src/components/FileViewer.tsx:1448-1474`
- Decision：Project custom Tailwind tokens 覆盖 color、radius、shadow 和 font；radius/shadow/font utilities 解析到既有 CSS variables，让 cards、popovers、modals、inputs、buttons、dark-theme shadow overrides、editorial typography 和 code/file-path text 保持当前 visuals；spacing 和 typography scale 使用 native Tailwind utilities，并为当前 9px、10px、10.5px、11px、11.5px、12.5px、13px 和 13.5px UI 提供精确 text-size aliases。Source: `specs/change/20260509-token-first-tailwind/token.md`
- Decision：dependency 或 config 相关 package changes 后，运行 `pnpm install`，再运行 package-scoped web validation 和 repo checks。Source: `AGENTS.md#Validation strategy`; `apps/web/package.json:23-29`
- Decision：Migration acceptance 使用 dual-worktree agent comparison。每个 migration PR 为 baseline 和 development worktrees 运行独立 web/daemon pairs，agent 在两个服务中检查相同 scenarios 的 visual consistency。Screenshot comparison 是必需 primary artifact；component source inspection 支持 diagnosis 和 migrated styles traceability。Display drift 必须修复，或记录为 approved deviation。Source: `AGENTS.md:40-45,82-89,91-104`; `apps/web/src/index.css:65-157`; `apps/web/src/state/appearance.ts:28-52`

### 为什么这样设计

- 既有 CSS variables 继续承载 visual truth，因此 light/dark/system themes 和 custom accent behavior 保持稳定，同时 Tailwind 成为 component-level composition language。
- 现有 TSX 中的 component-level styles 迁移到 Tailwind classes 后，日常 UI changes 大多落在本地 component files，减少 global CSS hotspot conflicts。
- Contributors 得到受约束的 Tailwind vocabulary，直接匹配 product 的 warm paper-like visual language。
- Tailwind foundations 先落地，再通过 guardrails 和 area-by-area migration 完成 TSX class replacement，降低 style refactor risk。
- Dual-worktree agent comparison 将 “visual equivalence” 变成可重复 migration gate，让 human review 聚焦 approved deviations 和 product judgment。

### Test Strategy

- Toolchain：运行 `pnpm install`，然后运行 `pnpm --filter @open-design/web build`，证明 Next/Tailwind/PostCSS integration 能 compile。Source: `apps/web/package.json:23-29`; `AGENTS.md#Validation strategy`
- Type safety：config 和 TS guard changes 后，运行 `pnpm typecheck` 和 `pnpm --filter @open-design/web typecheck`。Source: `AGENTS.md#Validation strategy`; `apps/AGENTS.md:39-51`
- Constraint mechanism：增加/扩展 guard coverage，覆盖 disallowed default palette classes，并在 Phase 1 加入 hardcoded UI color detection 和 allowlist scaffolding。现有 hardcoded UI colors 在 component migration phases 按 area 收紧 enforcement 前，继续分类为 migration inventory 或 explicit exceptions；Phase 6 运行 strict app UI check。Source: `scripts/guard.ts:138-151,205-221,401-422`
- Web tests：添加 style-policy helper logic 时，在 `apps/web/tests/` 下增加 focused Vitest coverage。Source: `apps/AGENTS.md:19-24`; `apps/web/package.json:23-29`
- Agent visual consistency validation：在 baseline worktree 中运行 `pnpm tools-dev run web --namespace baseline --daemon-port <port> --web-port <port>`，在 development worktree 中运行 `pnpm tools-dev run web --namespace candidate --daemon-port <port> --web-port <port>`；agent 使用 agent-browser CLI 和 Chrome DevTools MCP，对两个服务的 major pages/component areas、fixed viewport、light/dark/system themes 和 custom accent 进行 screenshot comparison，并用 component source inspection 解释 differences 和确认 class migration traceability。Source: `AGENTS.md:40-45,82-89,91-104`; `apps/web/src/index.css:65-157`; `apps/web/src/state/appearance.ts:28-52`
- Manual visual review：使用 agent comparison record 检查 Dashboard/app shell、project detail、settings dialog、file viewer/inspect overlay、sketch editor、live artifact card，以及 modal/popover/control states；approved deviations 必须写入 implementation notes。

### File Structure

- `apps/web/package.json` - 在 web package boundary 添加 Tailwind/PostCSS dependencies。
- `apps/web/postcss.config.mjs` - 配置 Tailwind v4 PostCSS plugin；因为 PostCSS config loader 会消费 `.mjs` config entry，所以这个文件需要在 residual JavaScript guard 中加入精确路径 allowlist entry。
- `apps/web/src/index.css` - 保留 global tokens/base styles，添加 Tailwind import/theme aliases，添加省略 Preflight 时 Tailwind border utilities 所需的窄范围 local border-style reset，并在迁移后的 utilities 依赖覆盖同类 properties 前，对保留的 element/reset selectors 进行 layer 处理或约束。
- `specs/change/20260509-token-first-tailwind/token.md` - 记录 Tailwind color/radius/shadow/font token naming、到现有 CSS variables 的 mapping，以及 spacing/type 使用 native Tailwind utilities 的 design decision。
- `apps/web/src/**/*.tsx` - 用 token-first Tailwind classes 完整替换可迁移的 global CSS classes。
- `scripts/guard.ts` - 将 PostCSS config residual JavaScript allowlist 和 style policy checks 加入现有 repo guard。
- `apps/web/tests/` - 在抽取 style policy helpers 时添加 focused tests。
- `phase*-notes.md` - 每个 PR slice 记录 commands/results、screenshot artifact links 或 paths、精确 dual-worktree startup parameters 或完整 commands、service URLs、namespace names、agent comparison coverage scenarios、发现的 visual drift 和 approved deviations。

### Edge Cases

- Custom accent color 会更新 Tailwind-derived accent utilities，因为这些 utilities 通过 `var(--accent*)` resolve。
- Dark/system mode 会继续工作，因为 token values 仍来自 `[data-theme="dark"]` 和 `html:not([data-theme])` media overrides。
- Brand icons、user sketch colors、canvas drawing colors 和 file color conversion helpers 需要显式 allowlist 处理。
- Loading shell 保持 global，因为它会在 client SPA component tree 可用之前渲染。
- 现有 long-tail global CSS 需要分类：component-level styles 迁移到 TSX，而 loading shell、keyframes、third-party/content rendering boundaries 和真正 cross-tree 的 styles 保持 global。

### Guardrail Rules

Guard 需要覆盖三类规则，并为每个 exception 记录 file scope、match pattern 和 reason。

1. Default Tailwind palette class check：拒绝 app UI files 中的 default palette utilities，例如 `text-red-500`、`bg-white`、`border-zinc-200`、`from-orange-500` 和 `ring-blue-400`。允许的 color utilities 来自 `token.md` 中通过 `@theme` 暴露的 project tokens。
2. Hardcoded UI color check：Phase 1 添加 detection、keyword exemptions、allowlist structure 和 fixture/temp-sample validation，同时现有 hardcoded UI colors 保持分类为 migration inventory 或 explicit exceptions。后续 component migration phases 会在被迁移区域拒绝未注册的 `#hex`、`rgb()`、`rgba()`、`hsl()`、`hsla()` 和真实 named colors。Phase 6 会在已迁移 colors 清理后，把约束收紧到剩余 app UI surface。`transparent`、`currentColor` / `currentcolor`、`inherit`、`initial`、`unset` 和 `revert` 等 CSS-wide/special keywords 表达 transparency、inheritance 或 reset semantics，因此 guard 应显式 exempt 它们，或按 property semantics 处理。发现真实未注册 colors 时，优先迁移为 Tailwind token classes 或 CSS variables；任何重复出现的 arbitrary color 都应提升为 named token。
3. Explicit allowlist check：允许 brand assets、SVG illustrations、user accent input、canvas/sketch user colors、user-authored file/inspect color conversion、external document/iframe/popup runtime HTML 和 test fixtures。Allowlist 应尽可能窄，并按 file、function 或 pattern 标注 reasons，避免 path-level exemptions 覆盖普通 UI chrome。

### Open Questions

| Question | Resolution point |
| --- | --- |
| Initial style guard allowlist structure 和 fixture/temp-sample scopes | Phase 1，在 guard scaffolding 落地前 |
| Final strict hardcoded-color allowlist 和 app UI path/pattern scopes | Phase 6，在 strict enforcement 落地前 |
| 精确的 dual-worktree port assignments、scenario matrix 和 agent comparison note format | Phase 1，在 Phase 2 merge 前 |
| Final retained global CSS inventory | Phase 6 |
| 每个 migrated component 的 dynamic class handling policy | 每个 phase 中，在替换 dynamic class composition 前 |
| 将重复 arbitrary colors 提升为 named tokens 的 threshold | Phase 1；default policy 是第二次真实 app UI 使用后提升 |
| Deferred component areas | Phase 6 前 |

## 计划

每个 phase 对应一个 PR。每个 PR 都必须能够独立 review、保持 business logic 稳定，并为其 slice 包含 migrated / retained / deferred class inventory。Rollback 通过 revert 对应 PR 处理。

### Phase 1: Foundation PR

Goal：添加 Tailwind v4 infrastructure，将 Open Design tokens 暴露为 Tailwind utilities，并落地第一版 style guard scaffolding。

- [x] Step 1: Install Tailwind foundations
  - [x] Substep 1.1 Implement：向 `apps/web/package.json` 添加 Tailwind v4/PostCSS dependencies。
  - [x] Substep 1.2 Implement：为 `@tailwindcss/postcss` 添加 web-local PostCSS config。
  - [x] Substep 1.3 Implement：将 `apps/web/postcss.config.mjs` 加入 `scripts/guard.ts` 中精确的 residual JavaScript allowlist，并用 comment 说明 PostCSS/Tailwind config entry 需要 `.mjs` compatibility format，同时保持 `pnpm guard` 对 planned config files 的 coverage。
  - [x] Substep 1.4 Implement：在 `apps/web/src/index.css` 中通过 `@layer theme, base, utilities;`、`@import "tailwindcss/theme.css" layer(theme);` 和 `@import "tailwindcss/utilities.css" layer(utilities);` 导入 Tailwind theme 和 utilities layers，同时保留现有 global entry behavior，并在 foundation slice 中排除 Preflight。在 base layer 中添加窄范围 local border-style reset：`@layer base { *, ::before, ::after, ::backdrop, ::file-selector-button { border: 0 solid; } }`，让后续 utilities layer 中的 Tailwind `border` width utilities 能与 project `border-*` color utilities 组合，而不要求每个 migrated element 都写 `border-solid`。记录 cascade policy：可能与 migrated utilities 冲突的 retained element/reset rules，也必须位于 `@layer base`，或被约束到 non-migrated scopes，或在 affected elements 迁移前移除。
  - [x] Substep 1.5 Verify：运行 `pnpm install`。
  - [x] Substep 1.6 Verify：运行 `pnpm guard` 并确认 PostCSS config allowlist 生效。
  - [x] Substep 1.7 Verify：运行 `pnpm --filter @open-design/web build`。
- [x] Step 2: Expose Open Design tokens as Tailwind utilities
  - [x] Substep 2.1 Implement：为 colors、core semantic status、selection/inspect overlays、radius、shadow、font tokens 和精确的现有 UI text-size aliases 添加 CSS-first `@theme` aliases；spacing 和 standard typography scale 使用 native Tailwind utilities。确认省略 Preflight 时，`border border-border` 等 token border examples 能依托 local border-style reset 正确渲染。
  - [x] Substep 2.2 Implement：清空 default Tailwind colors，并声明 project-approved color namespace。
  - [x] Substep 2.3 Implement：在 theme block 附近记录 token class vocabulary。
  - [x] Substep 2.4 Verify：确认 light、dark、system 和 custom accent modes 都通过同一组 CSS variables resolve。
  - [x] Substep 2.5 Verify：运行 `pnpm --filter @open-design/web build`。
- [x] Step 3: Add base style guardrails
  - [x] Substep 3.1 Implement：在 `scripts/guard.ts` 中为 app UI code 添加 default Tailwind palette class check。
  - [x] Substep 3.2 Implement：添加 hardcoded UI color check scaffolding，覆盖 `#hex`、`rgb()`、`rgba()`、`hsl()`、`hsla()` 和 named colors。在 Phase 1 中，现有 hardcoded UI colors 保持分类为 migration inventory 或 explicit exceptions，并通过 focused fixtures 或 temporary scoped samples 验证 checker，让 `pnpm guard` 在 component migration phases 收紧 enforcement 前保持 green。
  - [x] Substep 3.2a Implement：在 named-color check 中 exempt `transparent`、`currentColor` / `currentcolor`、`inherit`、`initial`、`unset` 和 `revert` 等 CSS-wide/special keywords，让 ghost buttons、SVG current-color 和 inherit/reset states 按 semantics 通过。
  - [x] Substep 3.3 Implement：添加 explicit allowlist mechanism，覆盖 brand assets、SVG illustrations、user accent input、canvas/sketch user colors、user-authored file/inspect colors、external runtime documents 和 tests/fixtures。
  - [x] Substep 3.4 Implement：如果需要抽取 helpers，就在 `apps/web/tests/` 下添加 focused tests；test fixtures 必须覆盖 `transparent`、`currentColor` / `currentcolor`、`inherit`、`initial`、`unset` 和 `revert` passing，以及真实未注册 named colors failing。
  - [x] Substep 3.5 Verify：运行 `pnpm guard`，确认 hardcoded-color scaffolding 不会让已知 migration inventory items 失败，例如 legacy `SettingsDialog` fallbacks 或仍计划在后续 phases 处理的 component colors。
  - [x] Substep 3.6 Verify：在 TSX file 中临时写入 default Tailwind native color class，例如 `text-red-500`，确认 `pnpm guard` 能检测并失败，然后移除临时代码。
  - [x] Substep 3.7 Verify：在 guard fixture 或 temporary scoped sample 中临时写入 unallowlisted hardcoded color，例如 `style={{ color: '#ff0000' }}`，确认 `pnpm guard` 能检测并失败，然后移除临时代码。
  - [x] Substep 3.8 Verify：运行 `pnpm --filter @open-design/web test`。
- [x] Step 4: Build migration inventory and agent visual comparison prep
  - [x] Substep 4.1 Implement：生成 `apps/web/src/**/*.tsx` 引用的 global CSS classes inventory，并映射到 `apps/web/src/index.css` 中的 definitions。
  - [x] Substep 4.2 Implement：将 classes 分类为 component-level migratable styles、global base styles、loading shell、keyframes/animation、content-level/third-party boundary styles 和 retained exceptions；识别设置计划由 Tailwind utilities 接管的 properties 的 unlayered element selectors，例如 global `button` base rules，并在 affected TSX migration slice 前为每个 selector 指定 remove、constrain 或 move-to-`@layer base` resolution。
  - [x] Substep 4.3 Implement：为每个 component-level class 记录对应的 token-first Tailwind utility combination 或 migration note。
  - [x] Substep 4.4 Implement：定义 style guard allowlist entries、path/pattern scopes 和 repeated arbitrary color promotion threshold。
  - [x] Substep 4.5 Verify：确认 migration inventory 覆盖所有 TSX 引用的 global classes；migration inventory 是 implementation reference，实际 migration scope 和 classification 按 implementation time 的当前代码决定，并对 rebase 后新增或变更的 classes 做现场判断。
  - [x] Substep 4.6 Verify：运行 `pnpm guard`、`pnpm typecheck`、`pnpm --filter @open-design/web test` 和 `pnpm --filter @open-design/web build`。
- [x] Step 5: Establish the dual-worktree agent visual comparison workflow
  - [x] Substep 5.1 Implement：定义 agent comparison scenario list、viewport、theme/accent matrix、fixture data、dual-worktree namespace values 和 port assignments、screenshot artifact requirements、component source inspection guidance，以及 phase notes format。
  - [x] Substep 5.2 Implement：准备 baseline 和 development worktrees 的 startup instructions：在 baseline worktree 中运行 `pnpm tools-dev run web --namespace baseline --daemon-port <baseline-daemon-port> --web-port <baseline-web-port>`，在 development worktree 中运行 `pnpm tools-dev run web --namespace candidate --daemon-port <candidate-daemon-port> --web-port <candidate-web-port>`，让每组 web/daemon pair 都拥有独立 runtime files 和 IPC sockets。
  - [x] Substep 5.3 Verify：在 Phase 1 中，让配备 agent-browser CLI 和 Chrome DevTools MCP 的 agent 针对 Dashboard/app shell baseline-vs-development run smoke-compare workflow definition，证明 dual-worktree process、screenshot artifact shape 和 comparison notes format 端到端可用。
  - [ ] Substep 5.4 Verify：后续 slices 的 full migration gate 仍是完整 scenario 和 theme matrix：Dashboard/app shell、project detail、settings dialog、file viewer/inspect overlay、sketch editor、live artifact card，以及 light、dark、system 和 custom accent 下的 modal/popover/control states。出现 layout offset、token color drift、radius/shadow differences 或 theme-state differences 时，修复 styles，或记录 approved deviation。
  - [x] Substep 5.5 Implement：在 `phase1-notes.md` 中记录 foundation changes、migration inventory、dual-worktree service URLs、agent comparison coverage scenarios、发现的问题和 approved deviations。

### Phase 2: Shell and common controls PR

Goal：使用 token-backed colors/radius/shadows 迁移 app shell、buttons、inputs、cards、popovers 和 modals。

- [ ] Step 6: Migrate shell and common controls
  - [ ] Substep 6.1 Implement：根据 migration inventory 和 `token.md` migration rules，将 app shell、buttons、inputs、cards、popovers 和 modals 的 component-level global classes 替换为 token-first Tailwind classes，包括 font aliases、精确 text-size aliases，以及在对 affected elements 应用 utilities 前完成 retained element/reset selector resolution。
  - [ ] Substep 6.2 Implement：对于依赖 `--radius*` 和 `--shadow*` 的 common UI，使用 variable-backed Tailwind utilities，例如 `rounded-card`、`rounded-panel`、`rounded-token-pill`、`shadow-token-sm` 和 `shadow-token-md`。
  - [ ] Substep 6.3 Implement：保留必要 dynamic class composition 时，使用完整 static class map；需要 runtime-generated classes 的情况必须有 explicit safelist 和 guard/test coverage。
  - [ ] Substep 6.4 Implement：从 `index.css` 中移除本 phase 已迁移的 component-level class definitions，同时保留 global boundaries 仍需使用的 styles。
  - [ ] Substep 6.5 Verify：确认 shell/common controls 在 light、dark、system 和 custom accent modes 下通过 CSS variables 保持视觉稳定。
  - [ ] Substep 6.6 Verify：运行 `pnpm guard`、`pnpm typecheck`、`pnpm --filter @open-design/web test` 和 `pnpm --filter @open-design/web build`。
- [ ] Step 7: Agent-validate shell and common controls visual equivalence
  - [ ] Substep 7.1 Verify：在 baseline worktree 和 development worktree 中分别启动一组 web/daemon pair，使用不同 `--namespace`、`--daemon-port` 和 `--web-port` values；让 agent 使用 agent-browser CLI 和 Chrome DevTools MCP 对比 shell/common controls screenshots，并将 component source inspection 作为任何 drift 的 supporting context。
  - [ ] Substep 7.2 Implement：在 `phase2-notes.md` 中记录本 phase 的 migrated / retained / deferred class list、dual-worktree service URLs、agent comparison results 和 approved deviations。

### Phase 3: Settings and project panels PR

Goal：迁移 settings dialogs、project creation、project detail panels 和 status surfaces。

- [ ] Step 8: Migrate settings and project panel areas
  - [ ] Substep 8.1 Implement：根据 `token.md` migration rules，将 settings dialog、project creation、project detail panels 和 status surfaces 的 component-level global classes 替换为 token-first Tailwind classes，包括 font aliases、精确 text-size aliases，以及在对 affected elements 应用 utilities 前完成 retained element/reset selector resolution。
  - [ ] Substep 8.2 Implement：将 `SettingsDialog` 中的 legacy token fallbacks 和 project panels 中可治理的 hardcoded colors 迁移到 current tokens 或 Tailwind utilities。
  - [ ] Substep 8.3 Implement：为 status surfaces 使用 `success`、`info`、`discovery`、`danger` 和 `warning` 等 semantic token utilities。
  - [ ] Substep 8.4 Implement：从 `index.css` 中移除本 phase 已迁移的 component-level class definitions，同时保留显式记录的 retained styles。
  - [ ] Substep 8.5 Verify：覆盖 light/dark/system/custom accent 下 settings dialog、project creation、project detail 和 status surfaces 的 visual checks。
  - [ ] Substep 8.6 Verify：运行 `pnpm guard`、`pnpm typecheck`、`pnpm --filter @open-design/web test` 和 `pnpm --filter @open-design/web build`。
- [ ] Step 9: Agent-validate settings and project panel visual equivalence
  - [ ] Substep 9.1 Verify：在 baseline worktree 和 development worktree 中分别启动一组 web/daemon pair，使用不同 `--namespace`、`--daemon-port` 和 `--web-port` values；让 agent 使用 agent-browser CLI 和 Chrome DevTools MCP 对比 settings/project panel screenshots，并将 component source inspection 作为任何 drift 的 supporting context。
  - [ ] Substep 9.2 Implement：在 `phase3-notes.md` 中记录本 phase 的 migrated / retained / deferred class list、dual-worktree service URLs、agent comparison results 和 approved deviations。

### Phase 4: File viewer, inspect, and edit-mode PR

Goal：将 file viewer chrome、inspect/comment overlays 和 edit-mode integration 迁移到 token-first utilities，同时保留 user-authored file color conversion helpers 的 allowlist。

- [ ] Step 10: Migrate file viewer and inspect/edit-mode overlays
  - [ ] Substep 10.1 Implement：根据 `token.md` migration rules，将 file viewer app chrome 的 component-level global classes 替换为 token-first Tailwind classes，包括 font aliases、精确 text-size aliases，以及在对 affected elements 应用 utilities 前完成 retained element/reset selector resolution。
  - [ ] Substep 10.2 Implement：将 inspect/comment overlays 迁移到 `selection`/`inspect` tokens，例如 `bg-selection-overlay`、`border-selection-outline`、`ring-selection-outline` 和 `bg-inspect-overlay`。
  - [ ] Substep 10.3 Implement：将 file color conversion helpers 和 user-authored content colors 保持在窄范围 allowlist 中，并标注 runtime/user-content reason。
  - [ ] Substep 10.4 Implement：从 `index.css` 中移除本 phase 已迁移的 component-level class definitions，同时保留 file/user-content boundary styles。
  - [ ] Substep 10.5 Verify：覆盖 light/dark/system/custom accent 下 file viewer、inspect overlay、comment/selection overlay 和 edit-mode integration 的 visual checks。
  - [ ] Substep 10.6 Verify：运行 `pnpm guard`、`pnpm typecheck`、`pnpm --filter @open-design/web test` 和 `pnpm --filter @open-design/web build`。
- [ ] Step 11: Agent-validate file viewer and inspect/edit-mode overlays visual equivalence
  - [ ] Substep 11.1 Verify：在 baseline worktree 和 development worktree 中分别启动一组 web/daemon pair，使用不同 `--namespace`、`--daemon-port` 和 `--web-port` values；让 agent 使用 agent-browser CLI 和 Chrome DevTools MCP 对比 file viewer/inspect/edit-mode screenshots，并将 component source inspection 作为任何 drift 的 supporting context。
  - [ ] Substep 11.2 Implement：在 `phase4-notes.md` 中记录本 phase 的 migrated / retained / deferred class list、dual-worktree service URLs、agent comparison results 和 approved deviations。

### Phase 5: Sketch, runtime content, and external document PR

Goal：迁移 sketch canvases 和 runtime surfaces 周围的 app chrome，同时将 user content、iframe、popup、generated runtime HTML 和 fixtures 保持在 explicit exceptions 下。

- [ ] Step 12: Migrate sketch and runtime content boundaries
  - [ ] Substep 12.1 Implement：根据 `token.md` migration rules，将 sketch editor app chrome、runtime surfaces、live artifact card 和 related controls 的 component-level global classes 替换为 token-first Tailwind classes，包括 font aliases、精确 text-size aliases，以及在对 affected elements 应用 utilities 前完成 retained element/reset selector resolution。
  - [ ] Substep 12.2 Implement：将 sketch/canvas user drawing colors、external document、iframe、popup、generated runtime HTML 和 fixtures 保持在 explicit allowlist 中，并标注 boundary reasons。
  - [ ] Substep 12.3 Implement：canvas-adjacent UI 使用 app token utilities；canvas data 和 user content 保持 data semantics。
  - [ ] Substep 12.4 Implement：从 `index.css` 中移除本 phase 已迁移的 component-level class definitions，同时保留 content-wide、iframe/runtime 和 fixture boundary styles。
  - [ ] Substep 12.5 Verify：覆盖 light/dark/system/custom accent 下 sketch editor、runtime content surface、live artifact card、iframe/popup boundary 和 generated runtime HTML 的 visual checks。
  - [ ] Substep 12.6 Verify：确认 `index.css` 中的 global loading shell、base styles、keyframes 和 content-wide CSS 继续工作。
  - [ ] Substep 12.7 Verify：运行 `pnpm guard`、`pnpm typecheck`、`pnpm --filter @open-design/web test` 和 `pnpm --filter @open-design/web build`。
- [ ] Step 13: Agent-validate sketch and runtime content boundary visual equivalence
  - [ ] Substep 13.1 Verify：在 baseline worktree 和 development worktree 中分别启动一组 web/daemon pair，使用不同 `--namespace`、`--daemon-port` 和 `--web-port` values；让 agent 使用 agent-browser CLI 和 Chrome DevTools MCP 对比 sketch/runtime/live artifact screenshots，并将 component source inspection 作为任何 drift 的 supporting context。
  - [ ] Substep 13.2 Implement：在 `phase5-notes.md` 中记录本 phase 的 migrated / retained / deferred class list、dual-worktree service URLs、agent comparison results 和 approved deviations。

### Phase 6: Cleanup and enforcement PR

Goal：移除已迁移的 component-level selectors，收紧 guard allowlists，刷新 baseline counts，并记录 retained/deferred globals。

- [ ] Step 14: Final cleanup and strict enforcement
  - [ ] Substep 14.1 Implement：整合所有 phases 的 migrated / retained / deferred class lists，并确认 retained global CSS inventory、reasons 和 follow-up points。
  - [ ] Substep 14.2 Implement：删除剩余 migrated component-level selectors，并将 style guard allowlist 收紧到实际 file scopes、pattern scopes 和 reasons。
  - [ ] Substep 14.2a Implement：在 migrated colors 已移除或显式分类后，对剩余 app UI surface 启用 strict hardcoded UI color enforcement。
  - [ ] Substep 14.3 Implement：刷新 `apps/web/src/index.css` 的 line count、CSS class selector count、`apps/web/src/**/*.tsx` file count 和 `className=` occurrence baseline。
  - [ ] Substep 14.4 Implement：在 `phase6-notes.md` 中记录 final implementation notes、migration inventory results 和任何 approved deviations。
  - [ ] Substep 14.5 Verify：运行 `pnpm guard`。
  - [ ] Substep 14.6 Verify：运行 `pnpm typecheck`。
  - [ ] Substep 14.7 Verify：运行 `pnpm --filter @open-design/web test`。
  - [ ] Substep 14.8 Verify：运行 `pnpm --filter @open-design/web build`。
- [ ] Step 15: Agent-validate final visual equivalence
  - [ ] Substep 15.1 Verify：在 baseline worktree 和 development worktree 中分别启动一组 web/daemon pair，使用不同 `--namespace`、`--daemon-port` 和 `--web-port` values；让 agent 使用 agent-browser CLI 和 Chrome DevTools MCP 运行完整 screenshot scenario matrix，使用 component source inspection 作为 supporting context，并确认 refactor 前后 visuals 一致，或 deviations 已获 approved。
  - [ ] Substep 15.2 Implement：在 `phase6-notes.md` 中记录 final dual-worktree service URLs、agent comparison results 和任何 approved deviations。

## Notes

Phase notes 按 PR phase 拆分，这样每个 implementation slice 都可以更新自己的 notes file：

- `phase1-notes.md` - Foundation PR notes、migration inventory 和 agent visual comparison setup。
- `phase2-notes.md` - Shell/common controls migration notes 和 agent visual comparison results。
- `phase3-notes.md` - Settings/project panels migration notes 和 agent visual comparison results。
- `phase4-notes.md` - File viewer/inspect/edit-mode migration notes 和 agent visual comparison results。
- `phase5-notes.md` - Sketch/runtime content migration notes 和 agent visual comparison results。
- `phase6-notes.md` - Cleanup/enforcement notes、final retained global CSS inventory、final agent visual comparison results 和 approved deviations。
