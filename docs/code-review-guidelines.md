# Code review guidelines

用 code review 保护 repository boundaries，让 changes 易维护，并在 regressions 到达用户前抓住它们。Review 应直接、具体，并基于当前 repository rules。

## 如何使用本文档

- **Authors**：请求 review 前，先按本文档 self-review。确认 PR 通过 [Product relevance test](#1-product-relevance-test)，说明你拥有的 boundary，并运行该 boundary 期望的 validation。
- **Reviewers**：自上而下走本文档 —— relevance test → forbidden surfaces → ownership/scope → matching lane → checklist → comments → approval bar。
- **Maintainers**：只有 maintainers 应该[关闭 PR 而不是 request changes](#close-instead-of-request-changes-maintainer-only)。

权威规则位于 `AGENTS.md` 和目录级 `AGENTS.md` 文件；本文档是在其上的 operational guide。当两者不一致时，`AGENTS.md` 优先，本文档应更新。

## Terminology

- **Reject** — 关闭 PR；当前 branch 上的 change 不可挽救（见 [Close instead of request changes](#close-instead-of-request-changes-maintainer-only)）。
- **Block** — request changes，必须解决后才能 approve。
- **Split** — 要求 author 把 PR 拆成独立、聚焦的 PRs。

`tools/dev` 和 `tools/pack` 是目录名；`pnpm tools-dev` 和 `pnpm tools-pack` 是对应 command surfaces。

## `pnpm guard` 已经检查什么

Reviewers 不需要手工检查 `pnpm guard` 已覆盖的规则。Guard 能抓什么以 `scripts/guard.ts` 的实现为准；下面列表反映撰写时脚本状态，可能漂移 —— 不确定时请读脚本。

- Project-owned entrypoints、modules、scripts、tests、reporters 和 configs 的 TypeScript-first rule。
- Documented allowlist（generated output、vendored deps、explicit compatibility build artifacts）之外新增的 `.js`、`.mjs` 或 `.cjs` 文件。

这些交给 guard。Review attention 放到其他地方。

## 1. Product relevance test

在 review implementation details 之前先运行这个 test。只有当 changed behavior 可见于、必需于，或直接验证 Open Design-owned surface 时，PR 才通过。

当**全部**条件成立时，PR 通过 relevance test：

- PR description 明确指出被修改的 Open Design feature、command、protocol、package、resource format 或 runtime path。
- Tests 通过 public seams 运行现有 Open Design flows：通过 documented daemon APIs 做 artifact generation/rendering、daemon HTTP/SSE endpoints、已发布 routes 上的 web UI、desktop/packaged launch behavior、sidecar status/IPC、`tools-dev`/`tools-pack` lifecycle commands、skills/design-system/craft resource loading，或 documented cross-boundary smoke behavior。通过 generic primitive 渲染 domain content **不算**。
- Tests 指向本 repository 中真实存在的 routes、DOM、APIs、commands、fixtures 和 user flows。
- Tests 使用 repository 现有 harness、base URL 和 lifecycle conventions —— 不使用 hard-coded standalone app URLs。
- Test assertions 提供真实 signal。Tautological assertions（例如 `expect(x + y).toBeGreaterThanOrEqual(0)`）不是 coverage。
- New sample content 是 Open Design capability 的 maintained fixture，足够 minimal 以支持 test，并按 [first-party fixture rule](#first-party-fixture-rule) 存放。
- New scripts 使用 documented `pnpm tools-dev` 或 `pnpm tools-pack` control plane，并属于现有 owned package/tool。Hard-code local paths 或假设 user-specific tools 的 ad hoc launchers 不在 scope。

Domain-specific UI 或 content（customer vertical、marketing experiment、unrelated rendering demo、arbitrary product page）不在 scope，除非它明确是 first-party Open Design fixture，并且 PR 说明它验证哪项 Open Design capability。

### Repository governance documentation

Governance documents —— `AGENTS.md` files、contribution guides、review guidelines、validation strategy、repository workflow rules 以及类似 meta-documentation —— 在它们澄清 repository 已有运行方式且不冲突 authoritative `AGENTS.md` chain 时，属于 scope。它们通过命名自己记录的现有 repository surface（boundary、command、lifecycle rule、validation expectation 或 workflow）满足 relevance test，而不是指向 feature/command/protocol/runtime path。引入新 repository rules 的 governance PR —— 而不是描述现有规则 —— 必须先更新 authoritative `AGENTS.md`，并按该 lane review。

### First-party fixture rule

Fixture 只有在**三个条件全部为真**时才算 first-party：

1. 它位于 `skills/`、`design-systems/`、`craft/`、owning package 的 `tests/` 目录，或 `e2e/resources/`。
2. 它被 maintained test 或 runtime path 引用。
3. PR description 命名该 consumer。

### Close instead of request changes（maintainer-only）

Maintainer（不是任意 reviewer）可以在以下**任一**情况成立且 core change 无法在现有 branch 上挽救时，关闭 PR 而不是 request changes：

- Target product 错误（PR 构建了 separate app、demo 或 customer vertical）。
- Test harness 属于另一个 app。
- DOM/API assumptions 在本 repo 中不存在。
- Scripts 与 repository lifecycle rules 冲突，必须从头重建 change。

大体合理的方向（例如 “add Arabic/RTL coverage”）**不足以**让不可挽救的 PR 保持 open。关闭时 comment 应说明命中哪个条件，并要求 fresh PR 使用真实 Open Design app 和 harness。如果 contributor 对关闭有异议，请 escalate 给另一个 maintainer，而不是单方面 reopen。

## 2. Forbidden surfaces

这是 canonical list。在 surface 被移除前，任何重新创建这些 surface 的 PR 都 out of scope：

- 已移除的 app 和 package boundaries：`apps/nextjs`、`packages/shared`。
- Root lifecycle aliases：`pnpm dev`、`pnpm dev:all`、`pnpm daemon`、`pnpm preview`、`pnpm start`。
- Root aggregate aliases：`pnpm test`、`pnpm build`。
- Root e2e aliases（e2e commands 属于 `e2e/` package —— 见 `e2e/AGENTS.md`）。
- Cross-app private imports —— 例如 `apps/web/**` import `apps/daemon/src/**`。
- Shared web/daemon API shapes 放在 `packages/contracts` 之外。
- 向 `packages/contracts` 添加 Next.js、Express、Node filesystem/process APIs、browser APIs、SQLite、daemon internals 或 sidecar control-plane dependencies。
- App business logic 依赖 sidecar concepts（runtime mode、namespace、IPC、source、stamp flags、sidecar packages、control-plane protocols）。
- Generic `packages/sidecar` 或 `packages/platform` code 中 hard-code Open Design app/mode/source/stamp details。
- Orchestration layers 中手写 sidecar stamp flags、process-scan regexes、runtime tokens 或 namespace/source arguments（必须使用 package primitives）。
- 用 daemon 或 web ports 决定 packaged data、log、runtime、cache 或 namespace-scoped paths。

## 3. Ownership and scope

把 scope 当成 approval gate。本 repository 用于 Open Design 自身：local web/daemon/desktop product、sidecar 与 packaging infrastructure、shared contracts、development/release tools、这些 surfaces 的 e2e coverage，以及该产品消费的 first-party skills/design-system/craft resources。

只有当 PR boundary 清晰、change 属于这里的原因清晰，并且 validation 证明 touched boundary 仍能工作时，才 accept。

### In scope

PR 通过 [Product relevance test](#1-product-relevance-test) 且匹配以下模式之一时，在 scope 内：

**Single primary ownership area：**

- `apps/web` — Next.js App Router UI、browser runtime behavior、web-local provider integration。
- `apps/landing-page` — first-party marketing site workspace package，拥有自己的 documented boundaries 和 commands。
- `apps/daemon` — local privileged daemon APIs、SSE、agent spawning、SQLite persistence、skills/design-system/resource serving、artifacts、credentials storage、static serving、daemon CLI。
- `apps/desktop` — 通过 sidecar IPC 发现 runtime state 的 Electron shell。
- `apps/packaged` — packaged Electron entry、packaged sidecar startup、runtime integration、`od://` entry glue。
- `packages/contracts` — pure TypeScript web/daemon DTOs、request/response shapes、SSE event unions、task shapes、errors、example payloads。
- `packages/sidecar-proto` — Open Design sidecar business protocol；app/mode/source constants、namespace validation、stamp fields/flags、IPC message schema、status shapes、error semantics。
- `packages/sidecar` — generic sidecar bootstrap、IPC transport、path/runtime resolution、launch environment、JSON runtime-file primitives。
- `packages/platform` — generic OS process primitives、stamp serialization、command parsing、process matching/search。
- `tools/dev` — local development lifecycle control plane。
- `tools/pack` — packaged build、install、start、stop、logs、release-artifact control plane。
- `e2e` — user-level smoke tests、cross-app/cross-runtime checks、Playwright UI automation。
- `skills/`、`design-systems/`、`craft/` — 在各自 documented responsibilities 内的 project resource 和 content updates。

**Multi-area changes** 在跨越 public seam 时属于 scope：HTTP API、shared contract DTO、sidecar protocol、package primitive、command surface、persisted format 或 resource format。Owning contract/protocol/primitive 必须先改，再把 app-specific behavior 接到它上面。

每个 in-scope PR 还必须：

- 保持 source/test placement、TypeScript-first rules、runtime path conventions 和 command boundaries 不变。
- 包含与 changed boundary 成比例的 validation（见 [Approval bar](#7-approval-bar)）。

### Out of scope

PR 做以下任意事情时 out of scope —— block 或要求 split：

- 把 unrelated cleanup、formatting、dependency churn、migrations 或 feature work 搭到 focused fix 上。
- 为不 exercise 现有 Open Design feature 的 separate product/domain 添加 tests、fixtures、scripts 或 UI。
- 重新创建 [Forbidden surfaces](#2-forbidden-surfaces) 中任何内容。
- 在 `src/` 下添加 tests，把 package/app tests 放到 package-level `tests/` 之外，把 Playwright UI tests 放到 `e2e/ui/` 之外，或把 app-owned component coverage 移到 e2e。
- 把 feature-depth scenarios 加到 `e2e/specs/` 而不是 `e2e/tests/`（test-pyramid rules 见 `e2e/AGENTS.md`）。
- 以需要新 runtime semantics 的方式修改 skills、design systems 或 craft content，却不更新 daemon/resource contract 和 validation。
- 在没有当前 product need 和 explicit ownership 的情况下引入 speculative abstractions、新 packages、新 lifecycle entrypoints、broad architecture rewrites 或 cross-cutting migrations。
- 修改 generated output、vendored files 或 compatibility JavaScript，却没有 `AGENTS.md` 要求的 documented reason。

## 4. Review lanes

Relevance test 通过后，应用与 PR 匹配的 lane。跨多个 lanes 的 PR 必须满足每个 relevant lane，同时仍应有一个清晰 primary owner。

### 4.1 Default（code、tests、command surfaces）

适用于 TypeScript source、package/tool/app behavior、tests、command surfaces、runtime paths、packaging 和 e2e automation。

**Accept when：**

- Change 属于现有 ownership area，或更新连接它们的 public seam。
- Shared behavior 位于 owning package，而不是复制到 app internals 之间。
- Tests 放在 owning layer：package/app/tool tests 在 sibling `tests/`，Playwright UI automation 在 `e2e/ui/`，cross-boundary checks 在 `e2e/tests/`，PR/release smoke 在 `e2e/specs/`。
- Validation 覆盖 changed surface（见 [Approval bar](#7-approval-bar)）。

**Block when：**

- Unrelated refactors、dependency churn、formatting sweeps 或 broad migrations 掩盖了实际 product change。
- PR 绕过 contracts/protocols/package primitives 或 documented lifecycle tools 来跨 boundary 访问。
- 新 runtime 或 command entrypoints duplicate `tools-dev`、`tools-pack`、package-scoped commands 或 documented e2e commands。

### 4.2 Contract and protocol changes

适用于 `packages/contracts`、`packages/sidecar-proto`、persisted SQLite schema 或其他 public seams（HTTP routes、SSE event unions、IPC message shapes、on-disk resource formats）的任何 change。

**Accept when：**

- Contract/protocol/schema change 在 consumers 接入之前落地（或在同一个 PR 中两边一起更新）。
- Changes backwards-compatible，或有 explicit migration plan：schema migration script、backfill strategy，或一版 release 的 compatible reads window。
- `packages/contracts` 仍不依赖 Next.js、Express、Node filesystem/process APIs、browser APIs、SQLite、daemon internals 和 sidecar control-plane dependencies。
- Sidecar process stamps 仍恰好有五个 fields：`app`、`mode`、`namespace`、`ipc`、`source`。
- Producers 和 consumers 都有新 shape 的 type/test coverage。

**Block when：**

- Web 和 daemon 接入了 divergent shapes，却没有先更新 `packages/contracts`。
- Breaking persisted-format change 没有 migration，也没有 compatibility window。
- SSE event shapes、error shapes 或 task shapes 在 app code 中改变，而不是在 `packages/contracts` 中改变。

### 4.3 Design-system additions（`design-systems/`）

**Accept when：**

- Entry 是包含 `DESIGN.md` 的 folder；不需要 code changes、custom loaders 或 special runtime handling，refresh 后就能出现。
- 第一个 H1 是 picker title；下一行在需要 grouping 时使用 documented metadata shape：`> Category: <Group>`，后面跟 short summary。
- Category 是 `design-systems/README.md` 中的现有 dropdown group，或是有清晰原因的 deliberate new group。
- Brand-inspired systems 使用 normalized ASCII slugs（`linear.app` → `linear-app`，`x.ai` → `x-ai`）。
- Content 覆盖现有 systems 使用的 comparable `DESIGN.md` concerns（visual theme、color、typography、spacing/layout、component tone、interaction guidance、accessibility expectations）。
- Imported/bundled sets 保持 normalized shape（例如 sourced design skills 的 9-section `DESIGN.md`）。
- Brand-inspired systems 被表述为 aesthetic inspirations，而不是 official assets 或 endorsements。
- Content 从 upstream adaptation 时，记录 source、license 和 attribution。
- New assets minimal、license-safe、有意命名，并按 [first-party fixture rule](#first-party-fixture-rule) 引用。

**Block when：**

- “design system” 实际是 customer/product page、marketing experiment 或 unrelated visual collection。
- 缺少 `DESIGN.md`、metadata malformed、slug 未 normalized，或无法干净出现在 picker 中。
- 偏离 existing entries shape，却没有更新 documented resource contract、importer flow、README 和 validation。
- 需要 runtime behavior、custom loaders 或不属于 design-system resource model 的 app-specific assumptions。
- 引入 official/proprietary brand assets、license 不明材料，或 large unreferenced assets。

### 4.4 Skill additions（`skills/`）

**Accept when：**

- Skill 支持 Open Design 中的 design work —— artifact generation、visual design、layout、branding、design-system application、interaction design、accessibility review、design critique。
- 遵循 existing first-party skills 的 structure 和 metadata conventions，包括 skills protocol front-matter（例如相关时使用 `od.craft.requires`）。
- Instructions 对 Open Design workflows 足够 general-purpose，而不是单个 unrelated external service 或 business process。
- Examples 和 fixtures minimal、design-relevant，并满足 [first-party fixture rule](#first-party-fixture-rule)。
- Runtime expectations 匹配现有 skills protocol 和 daemon resource-loading behavior。

**Block when：**

- Skill 与 design 或 artifact creation/review 无关，即使它本身有用。
- 它主要自动化 non-design workflow（finance、sales、CRM、generic productivity、unrelated API administration、domain-specific content processing）。
- 需要新 daemon/runtime semantics，却没有更新 skills protocol、resource contract 和 validation。
- 添加 broad external integrations 或 credentials，但它们不是 design-focused Open Design workflow 所必需。

### 4.5 Craft additions（`craft/`）

适用于 `craft/` 下新增或修改 brand-agnostic craft references。

**Accept when：**

- Reference 是 **universal** craft knowledge —— 不依赖 brand 或 design system 也成立（typography rules、color discipline、anti-AI-slop、motion principles）。
- 它是一个围绕单一 craft dimension 的密集 rulebook，规模类似现有 entries（`typography.md`、`color.md`、`animation-discipline.md`）。
- Slug 短且稳定，足以让 skills 通过 `od.craft.requires` 引用。
- 至少一个 shipping skill 通过 `od.craft.requires` opt in，或 PR 解释为什么 reference 会在 follow-up 中 opt in，并列出 candidate skills。
- Content 不编码应属于 `design-systems/` 的 brand-specific tokens、colors 或 typography choices。

**Block when：**

- Reference 是 brand-specific 或 design-system-specific（应放入 `design-systems/`）。
- 它是 artifact-shape advice（应放入 `skills/`）。
- 它 duplicate 现有 craft reference，而不是扩展它。
- 没有 skill 引用它，也没有命名 follow-up consumer。

## 5. Review priorities and checklist

留下 comments 前，先快速建立 touched ownership area 的 map：changed files、public seams、callers/consumers、相关 `AGENTS.md` files，以及证明 change 的 validation loop。对 bug fixes，先确认 reproduction 或 regression signal，再判断 fix。这个 zoom-out step 对 multi-area PRs、contract/protocol changes 和 sidecar/runtime changes 尤其重要 —— 跳过它，line comments 很容易错过真正的 boundary issue。

按以下顺序 review。每个 priority 都列出具体 checks。

### 5.1 Correctness and user impact

- 确认 change 解决 stated problem 且不引入 regressions。
- 先读 issue、task 或 PR description；检查 diff 前先识别 intended behavior。
- 对 bug fixes，确认 author 在 fix 前建立了 feedback loop：是否 reproduce failure、minimize、在正确 seam 添加 regression test（或解释为什么没有合适 test seam）、并重新运行原 failing scenario？没有 reproduction 或 regression signal 的 bugfix 可能需要 blocking review。
- 对 UI changes，检查 accessibility、loading/error/empty states、keyboard behavior 和 responsive layout。

### 5.2 Repository boundaries

- Review `apps/`、`packages/`、`tools/` 或 `e2e/` 下代码前，先检查最近的 `AGENTS.md`。
- 确认 app internals 保持 private，shared DTOs 位于 `packages/contracts`，sidecar concerns 不进入 app business logic。
- 确认 source/test placement：source-only `src/`，package/app/tool tests 在 sibling `tests/`，Playwright UI 在 `e2e/ui/`，cross-app/cross-runtime checks 在 `e2e/tests/`，PR/release smoke 在 `e2e/specs/`。
- 查找对 [Forbidden surfaces](#2-forbidden-surfaces) 中任何内容的 stale references。

### 5.3 Contracts and compatibility

- 验证 shared request/response shapes、sidecar protocol changes、persisted data 和 public commands 仍兼容，或有 explicit migrations。
- 对 SSE/IPC changes，确认 producer 和 consumer 都匹配 contract。
- 确认 sidecar stamps 仍有五个 required fields。

### 5.4 Security, secrets, and runtime data

- 不提交 secrets、API keys 或 `media-config.json` content。没有 explicit need 时，不扩大 credential storage scope。
- Logs 不泄漏 credentials、tokens 或完整 prompt payloads。
- Runtime files 保持在 documented paths 下：`<project-root>/.tmp/<source>/<namespace>/...`，POSIX IPC sockets 在 `/tmp/open-design/ipc/<namespace>/<app>.sock`。
- 对 daemon、desktop、sidecar、path、log 或 namespace changes，按 `AGENTS.md` 验证 runtime isolation（concurrent namespaces、log paths under `.tmp/tools-dev/<namespace>/...`、每个 namespace 运行 `inspect eval` 和 `inspect screenshot`）。

### 5.5 Performance and operational risk

- 对 web changes，注意 bundle-size regressions、render paths 中的 blocking work，或对 unshipped routes 的新 runtime dependencies。
- 对 daemon/sidecar changes，注意新增 startup latency、IPC chattiness 或 new unbounded resources。
- 对 packaging changes，确认 packaged data、log、runtime、cache 和 namespace paths 仍独立于 daemon/web ports。

### 5.6 Maintainability

- 偏好 small、cohesive changes，命名清楚、coupling 有限、没有不必要 abstractions。
- 拒绝没有当前 product need 的 speculative abstractions 和 broad rewrites。
- 对 command、package、workspace 或 generated-entry changes，确认需要时已运行 `pnpm install`。

## 6. Commenting standards

- Blocking comments 只用于 correctness、security、data integrity、boundary violations、missing required validation 或 high-risk maintainability issues。
- 每条 comment 都要 actionable：说明问题、为什么重要，以及最小可接受 fix。
- Localized issues 优先用 line comments；cross-cutting concerns 用短 summary。
- 避免复述 diff、表达个人偏好，或要求与 change 无关的 broad rewrites。
- Optional suggestions 要清楚标为 non-blocking。

## 7. Approval bar

只有**全部**条件成立时才 approve：

- Change 满足 requested behavior，并遵守 repository boundaries。
- 已运行 `pnpm guard` 和 `pnpm typecheck`。
- 已运行与 changed files 匹配的 package-scoped tests/builds（`pnpm --filter <package> test`/`build`，相关时包括 `e2e/specs/...`）。Stamp/namespace changes 已验证两个 concurrent namespaces，并为每个 namespace 运行 desktop `inspect eval` 和 `inspect screenshot`。Path/log changes 已运行 `pnpm tools-dev logs --namespace <name> --json`，并确认 log paths 位于 `.tmp/tools-dev/<namespace>/...` 下。
- PR 中显式说明任何 skipped validation。
- New risk 与 change 成比例，并由 tests、types、guards 或清晰记录的 manual validation 覆盖。
- Follow-up work 对 correctness 非必要，或已在 review 外显式跟踪。

### Documentation-only review additions

纯 documentation changes 仍需要 `AGENTS.md` 的 baseline validation：approval 前运行 `pnpm guard` 和 `pnpm typecheck`。

对 documentation-heavy PRs，reviewers 还应检查：

- Internal link checks 和 reference integrity。
- 与 `AGENTS.md` 及相关 directory-level `AGENTS.md` files 保持一致。
- Reviewer inspection 确认文档不冲突 directory-level rules。

## Appendix：failed product-relevance reviews 示例

以下是应该按 [Close instead of request changes](#close-instead-of-request-changes-maintainer-only) 关闭的 PR 具体示例。Tag references 应指回它们违反的 [Product relevance test](#1-product-relevance-test) rules。

- **Domain-specific app smuggled in as tests。** PR 为 “Quranic Arabic Learning App” 添加 tests，selectors 如 `#dashboard`、`#exercise`、`.vocabulary-item`、`.arabic-word`，但这些 surfaces 不是 Open Design 的一部分 —— 违反 “tests target real routes/DOM/APIs” rule。
- **Standalone-app E2E URLs。** Playwright tests hard-code `http://localhost:17573/index.html`，而不是使用 configured Open Design app flow —— 违反 “use the existing harness, base URL, and lifecycle conventions” rule。
- **Tautological assertions。** `expect(count + exerciseCount).toBeGreaterThanOrEqual(0)` —— 违反 “test assertions provide real signal” rule。
- **Ad hoc launcher script。** 新 root script hard-code `~/projects/open-design`，假设 user-specific tool（例如 `fnm`），或绕过 `pnpm tools-dev` —— 违反 “scripts use the documented control plane” rule，并重新创建 [Forbidden surface](#2-forbidden-surfaces)。

合理的底层意图（例如 “we need RTL or Arabic coverage”）不能成为保留这类 PR 的理由。请要求 fresh PR 通过现有 harness exercise 真实 Open Design app。
