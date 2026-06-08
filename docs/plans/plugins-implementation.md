# Open Design Plugin & Marketplace — Implementation Plan (living)

Source spec: [`docs/plugins-spec.md`](../plugins-spec.md)（zh-CN: [`docs/plugins-spec.zh-CN.md`](../plugins-spec.zh-CN.md)）。

Sibling docs: [`spec.md`](../spec.md) · [`skills-protocol.md`](../skills-protocol.md) · [`architecture.md`](../architecture.md)。

更新协议 — 请先阅读

- 本文件是 **living roadmap**。每个落地 plugin system 一部分内容的 PR，都必须在同一个 PR 中把对应 `[ ]` 翻为 `[x]`；如果新的 module / table / endpoint 变成现实，还要更新 §3 "Architecture state"。
- 除了修正事实漂移，不要在本文件对应的 PR 中编辑 `docs/plugins-spec.md`；spec 是 contract，本文件是 schedule。
- §8 中的 "Definition of done" gates 是**唯一**硬性 sign-off bar；某个 phase 下的空 checkbox 不表示 v1 损坏，只有 §8 下的空 checkbox 才表示。
- 当 `docs/plugins-spec.md` patches 改变 phase numbering 或 atom names 时，请在同一个 PR 中同步这里的变更（按 spec §21.6 / §22.5 / §23.6）。

---

## 1. Invariants（先锁定这些；没有 spec patch 不得违反）

这五条规则决定每一个 downstream design decision。它们高于 phases，并由 reviewers 在每个 plugin-related PR 中检查。

- [x] **I1. `SKILL.md` 是 floor；`open-design.json` 是 sidecar；绝不双向耦合。** `packages/plugin-runtime/adapters/agent-skill.ts` 会从 `SKILL.md` 的 `od:` frontmatter 合成 schema-valid `PluginManifest`（由 `packages/plugin-runtime/tests/adapter-agent-skill.test.ts` 验证）。`apps/daemon/tests/fixtures/plugin-fixtures/sample-plugin/` 下的 bundled e2e fixture 同时提供两半，`apps/daemon/tests/plugins-e2e-fixture.test.ts` 会执行 merger。
- [x] **I2. Apply 是纯函数；side effects 只发生在 `POST /api/projects` / `POST /api/runs` 之后。** `apps/daemon/src/plugins/apply.ts` 不接触 FS 和 DB；snapshot writer（`snapshots.ts`）与 installer 是唯一会 mutate persistent state 的 modules。`apps/daemon/tests/plugins-apply.test.ts` 断言相同 inputs 产生 deterministic snapshots，并拒绝触碰 registry / FS。
- [x] **I3. `AppliedPluginSnapshot` 是 "plugin" 与 "run" 之间的唯一 contract。** `composeSystemPrompt()` 现在接受由 snapshot 通过 `pluginPromptBlock(snapshot)`（`apps/daemon/src/plugins/apply.ts`）派生的 `pluginBlock`；run 通过 snapshot 读取 context。Web API-fallback mode 下的 plugin runs 会在 HTTP layer 被拒绝（Phase 2A 接入 409）；snapshot table 是该 contract 的唯一 writable surface。
- [ ] **I4. CLI 是 canonical agent-facing API；UI 镜像 CLI，而不是反过来。** Phase 1: `od plugin install/list/info/uninstall/apply/doctor` 与匹配的 `/api/plugins/*` HTTP routes 在同一个 PR 中交付。剩余 `od project/run/files/conversation/marketplace` subcommands 会在 Phase 1 / 2C / 3 PRs 中逐步进入。
- [x] **I5. Kernel/userspace boundary（spec §23）从第 1 天起画清楚。** `composeSystemPrompt()` 作为带 content table（DESIGN.md、craft、skill、plugin block、metadata）的 pure assembler 组织；新的 `pluginBlock` parameter 无需重构即可插入。Phase 2A 会把 renderer 提升到 `packages/contracts/src/prompts/plugin-block.ts`（PB1）。

CI guard placement：每个 invariant 都必须至少有一个 automated test，在规则被违反时失败。落地时将 test path 记录在对应 checkbox 旁。

---

## 2. Layered architecture target（每个新文件应该放在哪里）

```text
packages/contracts/src/plugins/      ← pure types + Zod schemas, no runtime deps
  ├── manifest.ts                    ← PluginManifest, GenUISurfaceSpec, PluginPipeline
  ├── context.ts                     ← ContextItem union (spec §5.2)
  ├── apply.ts                       ← ApplyResult, AppliedPluginSnapshot, InputFieldSpec
  ├── marketplace.ts                 ← MarketplaceManifest
  ├── installed.ts                   ← InstalledPluginRecord, TrustTier ('bundled' | 'trusted' | 'restricted')
  └── events.ts                      ← GenUIEvent + pipeline_stage_* variants joined into PersistedAgentEvent

packages/plugin-runtime/             ← pure TS; reusable in web / daemon / CI
  ├── parsers/{manifest,marketplace,frontmatter}.ts
  ├── adapters/{agent-skill,claude-plugin}.ts
  ├── merge.ts                       ← sidecar + adapter merge; open-design.json wins
  ├── resolve.ts                     ← ContextItem ref resolution (pure; no FS reads)
  ├── validate.ts                    ← JSON Schema validation
  └── digest.ts                      ← manifestSourceDigest (frozen algorithm; CI fixtures)

apps/daemon/src/plugins/             ← side-effect concentration zone
  ├── registry.ts                    ← three-tier scan + hot reload (existing skills.ts/design-systems.ts/craft.ts delegate here)
  ├── installer.ts                   ← github tarball / https / local / marketplace
  ├── apply.ts                       ← pure resolver; emits ApplyResult + draft snapshot
  ├── snapshots.ts                   ← §8.2.1 — the **only** writer to applied_plugin_snapshots
  ├── pipeline.ts                    ← §10.1 stage scheduler + §10.2 devloop + until evaluator
  ├── connector-gate.ts              ← §9 capability gate, called by tool-tokens.ts and /api/tools/connectors/execute
  ├── trust.ts                       ← installed_plugins.capabilities_granted writer
  └── doctor.ts                      ← schema + connector catalog + MCP dry-launch + atom refs

apps/daemon/src/genui/               ← spec §10.3
  ├── registry.ts
  ├── events.ts
  └── store.ts                       ← genui_surfaces table writer
```

硬性 layering rules

- `packages/plugin-runtime` 不导入 `node:fs`。它接收 `loader: (relpath) => Promise<string>`。Daemon 注入真实 FS，CI 注入 mocks，web preview sandbox 注入 fetch。
- `apps/daemon/src/plugins/snapshots.ts` 是唯一会对 `applied_plugin_snapshots` 发出 `INSERT/UPDATE` 的文件。CI guard：`rg "applied_plugin_snapshots" --type ts -g '!**/*.test.ts'` 只能在 `snapshots.ts` 内匹配到 `INSERT`。
- `connector-gate.ts` 是 stateless validator（`(snapshotId, connectorId) => allow | deny`）；`tool-tokens.ts` 在签发 token 前调用它，`/api/tools/connectors/execute` 会在每次调用时重新验证，以阻止 token replacement。

---

## 3. Architecture state（modules 落地时更新）

本节跟踪**当前仓库中真实存在的内容**。请在 module 落地的同一个 PR 中更新；不要让它与现实脱节。

### 3.0 Current architecture clarifications (2026-05-13)

这些 notes 捕获了容易在 spec 和 code 之间丢失的 product/implementation answers：

- **未选择 plugin 不等于裸 agent。** `composeSystemPrompt()` 仍始终叠加 Open Design base designer/discovery prompt、project metadata、active design system/craft，以及 daemon-owned safety/tooling guidance。Plugin context 是 additive：被选中的 plugin 会贡献由 snapshot 派生的 `## Active plugin`、`## Plugin inputs` 和 active-stage atom blocks。Home free-form runs 会路由到 bundled hidden `od-default` scenario，它塑造 task type 后回到正常 design pipeline。
- **Pipeline 是 plugin-assembled，不是固定 wizard。** Reference shorthand 是 `discovery -> plan -> generate -> critique`，但可运行形态来自 applied plugin 或 bundled scenario fallback 上的 `od.pipeline.stages[].atoms[]`。`apps/daemon/src/plugins/pipeline-runner.ts` 发出 stage/GenUI events，`packages/contracts/src/prompts/atom-block.ts` 渲染 active stage body。有些 atoms 仍是 prompt fragments / permissive workers；`diff-review`、`build-test`、`handoff` 等 observable atoms 现在会发出 durable files 或 signals。
- **GenUI 是 controlled rendering。** Agents/plugins 发出 structured surface requests（`form`、`choice`、`confirmation`、`oauth-prompt`），OD 用 product-owned React/CLI components 渲染。Inline `<question-form>` chat UI 遵循同样原则：解析 structured data，通过 `QuestionForm` 渲染，并把 styling 保留在 OD 中。Plugin-bundled custom components 是 `genui:custom-component` 背后的独立 sandboxed path。
- **AG-UI 是 interoperability，而不是 product UI runtime。** `packages/agui-adapter` 和 `GET /api/runs/:runId/agui` 已交付，方便 CopilotKit / AG-UI clients 消费 OD run。内部 web/desktop UI 仍保持 OD-native；只有明确的 external embed/demo/client 需求才足以 justify 添加 CopilotKit 本身。
- **Scenario discovery 仍有一个 product gap。** `apps/web/src/components/home-hero/chips.ts` 是面向高频 scenarios 的 curated Home rail。`apps/web/src/components/plugins-home/facets.ts` 更 data-driven，并从 plugin metadata 派生 category/subcategory facets。理想的下一片是单一 scenario registry / manifest projection，同时供给 Home chips、plugin filters、composer tools 和 `@search`。

### 3.1 Packages

| Path | Status | Notes |
| --- | --- | --- |
| `packages/contracts/src/plugins/manifest.ts` | shipped | Phase 0 — Zod schema + `PluginManifest` type |
| `packages/contracts/src/plugins/context.ts` | shipped | Phase 0 — `ContextItem`, `ResolvedContext` |
| `packages/contracts/src/plugins/apply.ts` | shipped | Phase 0 — `ApplyResult`, `AppliedPluginSnapshot`, `InputFieldSpec` |
| `packages/contracts/src/plugins/marketplace.ts` | shipped | Phase 0 — `MarketplaceManifest`, `TrustTier`, `MarketplaceTrust` |
| `packages/contracts/src/plugins/installed.ts` | shipped | Phase 0 — `InstalledPluginRecord`, `PluginSourceKind` |
| `packages/contracts/src/plugins/events.ts` | shipped | Phase 0/2A — `pipeline_stage_*` and `genui_*` event variants used by daemon SSE / ND-JSON |
| `packages/contracts/src/prompts/plugin-block.ts` | shipped | Phase 2A (PB1); `renderPluginBlock(snapshot)` pure function shared by daemon + contracts composers |
| `packages/plugin-runtime/` | shipped | Phase 1 — pure TS package: parsers, adapters, merge, resolve, validate, digest |

### 3.2 Daemon modules

| Path | Status | Notes |
| --- | --- | --- |
| `apps/daemon/src/skills.ts` | exists | Phase 1: independent loader; Phase 2A folds into `plugins/registry.ts` |
| `apps/daemon/src/design-systems.ts` | exists | same as above |
| `apps/daemon/src/craft.ts` | exists | same as above |
| `apps/daemon/src/connectors/` | exists | reused as-is by `connector-gate.ts` |
| `apps/daemon/src/tool-tokens.ts` | exists | Phase 2A: wire to `connector-gate.ts` |
| `apps/daemon/src/prompts/system.ts` | shipped | Phase 1 — `composeSystemPrompt()` accepts `pluginBlock` derived from snapshot |
| `apps/daemon/src/server.ts` | shipped | Phase 1 — `/api/plugins/*`, `/api/atoms`, `/api/applied-plugins/:snapshotId` mounted |
| `apps/daemon/src/cli.ts` | shipped | Phase 1 — `od plugin list/info/install/uninstall/apply/doctor` |
| `apps/daemon/src/plugins/registry.ts` | shipped | Phase 1 — install root scan, manifest parse, SQLite reader/writer |
| `apps/daemon/src/plugins/installer.ts` | shipped | Phase 1 — local-folder install only; symlink + traversal + size guards |
| `apps/daemon/src/plugins/apply.ts` | shipped | Phase 1 — pure resolver; emits `ApplyResult` + draft snapshot |
| `apps/daemon/src/plugins/snapshots.ts` | shipped | Phase 1 — sole writer of `applied_plugin_snapshots`; PB2 expires_at stamping |
| `apps/daemon/src/plugins/atoms.ts` | shipped | Phase 1 — first-party atom catalog (spec §10) |
| `apps/daemon/src/plugins/connector-gate.ts` | shipped | Phase 2A — apply path connector resolution + token-issuance gate |
| `apps/daemon/src/plugins/pipeline.ts` | shipped | Phase 2A — devloop scheduler + `until` evaluator + `OD_MAX_DEVLOOP_ITERATIONS` |
| `apps/daemon/src/plugins/pipeline-runner.ts` | shipped | Phase 2A — runs pipeline against a live run, emits stage + GenUI events |
| `apps/daemon/src/plugins/resolve-snapshot.ts` | shipped | Phase 2A — snapshot resolver wired into `POST /api/projects` + `/api/runs` |
| `apps/daemon/src/plugins/marketplaces.ts` | shipped | Phase 3 — add / list / refresh / remove / trust + `resolvePluginInMarketplaces` |
| `apps/daemon/src/plugins/gc.ts` | shipped | Phase 5 (early) — snapshot GC worker + boot sweep |
| `apps/daemon/src/plugins/scaffold.ts` | shipped | Phase 4 — `od plugin scaffold` starter generator |
| `apps/daemon/src/plugins/export.ts` | shipped | Phase 4 — `od plugin export <projectId> --as …` |
| `apps/daemon/src/plugins/publish.ts` | shipped | Phase 4 — `od plugin publish --to <catalog>` URL builder |
| `apps/daemon/src/plugins/bundled.ts` | shipped | Phase 4 (§23.3.5 entry slice) — boot walker for `plugins/_official/**` |
| `apps/daemon/src/plugins/atom-bodies.ts` | shipped | Phase 4 (§23.3.2 entry slice) — bundled-atom SKILL.md body loader |
| `apps/daemon/src/plugins/atoms/build-test.ts` | shipped | Phase 7 — typecheck + test shell-out runner; emits build.passing + tests.passing signals |
| `apps/daemon/src/plugins/atoms/code-import.ts` | shipped | Phase 7 — repo walker writing normalised `<cwd>/code/index.json` |
| `apps/daemon/src/plugins/atoms/design-extract.ts` | shipped | Phase 6/7 — token bag extractor reading code/index.json + writing code/tokens.json |
| `apps/daemon/src/plugins/atoms/figma-extract.ts` | shipped | Phase 6 — Figma REST shell-out → figma/{tree,tokens,meta}.json |
| `apps/daemon/src/plugins/atoms/token-map.ts` | shipped | Phase 6/7 — exact + normalised-hex + fuzzy-name crosswalk against the active design system |
| `apps/daemon/src/plugins/atoms/rewrite-plan.ts` | shipped | Phase 7 — heuristic ownership classifier + per-leaf step generator |
| `apps/daemon/src/plugins/atoms/patch-edit.ts` | shipped | Phase 7 — unified-diff applier with shell-tier safety gate + per-step receipts + atomic file writes |
| `apps/daemon/src/plugins/atoms/diff-review.ts` | shipped | Phase 7-8 — review/{diff.patch,summary.md,decision.json,meta.json} from receipts |
| `apps/daemon/src/plugins/atoms/auto-surfaces.ts` | shipped | Phase 8 — auto-derives `__auto_diff_review_<stageId>` choice surface for each stage that lists `diff-review` |
| `apps/daemon/src/plugins/atoms/diff-review-genui-bridge.ts` | shipped | Phase 8 — POST /api/runs/:id/genui/:surfaceId/respond \u2192 runDiffReview() decision update |
| `apps/daemon/src/plugins/atoms/handoff.ts` | shipped | Phase 8 — recordHandoff + isDeployableAppEligible + runHandoffAtom (pipeline-driven promotion ladder) + runAndPersistHandoff (`<cwd>/handoff/manifest.json` round-trip) |
| `apps/daemon/src/plugins/validate.ts` | shipped | Phase 4 — `od plugin validate <folder>` author-side lint helper |
| `apps/daemon/src/plugins/pack.ts` | shipped | Phase 4 — `od plugin pack <folder>` distribution archive helper |
| `apps/daemon/src/plugins/search.ts` | shipped | Phase 4 — `searchInstalledPlugins` helper backing `od plugin list/search` filters |
| `apps/daemon/src/plugins/diff.ts` | shipped | Phase 4 — `diffPlugins` helper backing `od plugin diff <a> <b>` |
| `apps/daemon/src/plugins/snapshot-diff.ts` | shipped | Phase 4 — `diffSnapshots` helper backing `od plugin snapshots diff <a> <b>` |
| `apps/daemon/src/plugins/stats.ts` | shipped | Phase 4 — `pluginInventoryStats` / `snapshotInventoryStats` helpers backing `od plugin stats` |
| `apps/daemon/src/plugins/simulate.ts` | shipped | Phase 4 — `simulatePipeline` / `parseSignalKv` helpers backing `od plugin simulate` |
| `apps/daemon/src/plugins/verify.ts` | shipped | Phase 4 — `verifyPlugin` orchestrator backing `od plugin verify` (CI meta-command) |
| `apps/daemon/src/storage/db-inspect.ts` | shipped | Phase 5 — `inspectSqliteDatabase` helper backing `od daemon db status` |
| `apps/daemon/src/plugins/events.ts` | shipped | Phase 4 — in-memory plugin event ring buffer + SSE feed backing `od plugin events tail` |
| `packages/plugin-runtime/src/pipeline-fallback.ts` | shipped | spec §23.3.3 — resolveAppliedPipeline falls back to a bundled scenario when od.pipeline is absent |
| `plugins/_official/atoms/<atom>/{SKILL.md,open-design.json}` | shipped | Phase 4 / 6 / 7 / 8 — 13 first-party atom plugins (4 implemented + 9 reserved fragments) |
| `plugins/_official/scenarios/<id>/{SKILL.md,open-design.json}` | shipped | Phase 4 (§23.3.3) — bundled scenario/router/export plugins, including the four taskKind defaults plus `od-default` Home free-form routing |
| `packages/agui-adapter/` | shipped | Phase 4 — pure-TS AG-UI canonical event encoder |
| `packages/contracts/src/prompts/atom-block.ts` | shipped | Phase 4 — `renderActiveStageBlock(stageId, bodies)` pure renderer |
| `tools/pack/docker-compose.yml` | shipped | Phase 5 — hosted-mode reference manifest |
| `tools/pack/helm/open-design/templates/**` | shipped | Phase 5 — Deployment / Service / Secret / ConfigMap / PVCs / Ingress / NOTES |
| `tools/pack/helm/open-design/values-{aws,gcp,azure,aliyun,tencent,huawei,self}.yaml` | shipped | Phase 5 — per-cloud overrides (volume + ingress diffs) |
| `deploy/Dockerfile` plugins/_official COPY | shipped | Phase 5 — bundled atoms travel with the image |
| `.github/workflows/docker-image.yml` | shipped | Phase 5 — multi-arch ghcr.io push (:edge / :version) |
| `apps/daemon/src/storage/project-storage.ts` | shipped | Phase 5 — ProjectStorage interface + Local impl + S3 stub |
| `apps/daemon/src/storage/daemon-db.ts` | shipped | Phase 5 — DaemonDb config resolver (sqlite default, postgres stub) |
| `GET /api/plugins/:id/asset/*` | shipped | Phase 4 — sandboxed plugin asset endpoint (§9.2 CSP) |
| `apps/daemon/src/plugins/trust.ts` | shipped | Phase 1 + Phase 2A — `validateCapabilityList`, `grantCapabilities`, `revokeCapabilities` |
| `apps/daemon/src/plugins/doctor.ts` | shipped | Phase 1 (manifest + atom + ref checks) → expanded Phase 3 |
| `apps/daemon/src/genui/registry.ts` | shipped | Phase 2A — F8 cross-conversation cache + lifecycle |
| `apps/daemon/src/genui/events.ts` | shipped | Phase 2A — `genui_*` + `pipeline_stage_*` event payload helpers |
| `apps/daemon/src/genui/store.ts` | shipped | Phase 2A — sole writer of `genui_surfaces`, prefill / lookup / revoke |

### 3.3 SQLite tables

| Table | Status | Phase |
| --- | --- | --- |
| `installed_plugins` | shipped | Phase 1 — `source_kind` enum permissive (`bundled` allowed) per F3 |
| `plugin_marketplaces` | shipped | Phase 1 — schema only; populated in Phase 3 |
| `applied_plugin_snapshots` | shipped | Phase 1 — full §11.4 shape with `expires_at`; GC worker lands Phase 5 |
| `runs.applied_plugin_snapshot_id` ALTER | n/a | runs are in-memory in `apps/daemon/src/runs.ts`; the in-memory run carries the snapshot id until runs become a SQL table |
| `conversations.applied_plugin_snapshot_id` ALTER | shipped | Phase 1 — column added by `migratePlugins()` |
| `projects.applied_plugin_snapshot_id` ALTER | shipped | Phase 1 — column added by `migratePlugins()` |
| `run_devloop_iterations` | shipped | Phase 2A |
| `genui_surfaces` | shipped | Phase 2A — three indexes per §11.4 |

### 3.4 HTTP endpoints

| Endpoint | Status | Phase |
| --- | --- | --- |
| `GET /api/plugins` | shipped | Phase 1 |
| `GET /api/plugins/:id` | shipped | Phase 1 |
| `POST /api/plugins/install` (SSE) | shipped | Phase 1 — local-folder source only; tarball lands Phase 2A |
| `POST /api/plugins/:id/uninstall` | shipped | Phase 1 |
| `POST /api/plugins/:id/apply` | shipped | Phase 1 — emits `ApplyResult` + manifest digest (no run side-effects) |
| `POST /api/plugins/:id/doctor` | shipped | Phase 1 — manifest lint + atom + ref check |
| `GET /api/atoms` | shipped | Phase 1 — first-party atom catalog |
| `GET /api/applied-plugins/:snapshotId` | shipped | Phase 1 — used by run replay tooling |
| `POST /api/runs/:runId/replay` | shipped | Phase 2A |
| `GET /api/plugins/:id/preview` | shipped | Phase 2B — sandboxed iframe entry; resolves `od.preview.entry` with sensible fallbacks |
| `GET /api/plugins/:id/example/:name` | shipped | Phase 2B — matches against folder name / basename / declared title in `od.useCase.exampleOutputs[]` |
| `POST /api/plugins/:id/trust` | shipped | Phase 2A — capability grant / revoke against §5.3 vocabulary |
| `GET / POST /api/marketplaces` | shipped | Phase 3 entry slice |
| `POST /api/marketplaces/:id/trust` | shipped | Phase 3 entry slice |
| `GET /api/marketplaces/:id/plugins` | shipped | Phase 3 entry slice |
| `GET /api/runs/:runId/devloop-iterations` | shipped | Phase 2A |
| `GET /api/runs/:runId/genui` | shipped | Phase 2A |
| `GET /api/projects/:projectId/genui` | shipped | Phase 2A |
| `POST /api/runs/:runId/genui/:surfaceId/respond` | shipped | Phase 2A |
| `POST /api/projects/:projectId/genui/:surfaceId/revoke` | shipped | Phase 2A |
| `POST /api/projects/:projectId/genui/prefill` | shipped | Phase 2A |
| `GET /api/applied-plugins` | shipped | Phase 5 (early) — audit list |
| `GET /api/projects/:projectId/applied-plugins` | shipped | Phase 5 (early) |
| `POST /api/applied-plugins/prune` | shipped | Phase 5 (early) — operator escape hatch |
| `GET /api/daemon/status` | shipped | Phase 1.5 |
| `POST /api/daemon/shutdown` | shipped | Phase 1.5 — loopback-only |
| `GET /api/runs/:runId/agui` | shipped | Phase 4 — pipes events through `@open-design/agui-adapter` |

### 3.5 CLI subcommands

| Command | Status | Phase |
| --- | --- | --- |
| `od plugin install/list/info/uninstall/apply/doctor` | shipped | Phase 1 + Phase 2A — install accepts local / `github:` / `https://*.tar.gz` / **bare plugin name** (Phase 3 resolution) |
| `od plugin run` apply→start shorthand | shipped | Phase 2A — `--inputs`, `--input k=v`, `--grant-caps`, `--follow` |
| `od plugin trust` (with `connector:<id>` form) + `--revoke` | shipped | Phase 2A — backed by `POST /api/plugins/:id/trust` |
| `od plugin snapshots list / prune` | shipped | Phase 5 (early) — operator escape hatch |
| `od plugin replay` | shipped | Phase 2A |
| `od ui list/show/respond/revoke/prefill` | shipped | Phase 2A |
| `od marketplace add/list/info/refresh/remove/trust` | shipped | Phase 3 entry slice |
| `od project create/list/info/delete` | shipped | Phase 1 follow-up — accepts `--plugin/--inputs/--grant-caps` |
| `od run start/watch/cancel/list/info` (with `--follow`, ND-JSON) | shipped | Phase 1 follow-up |
| `od files list/read/write/upload/delete` | shipped | Phase 1 follow-up + Phase 2C |
| `od daemon start --headless / --serve-web / status / stop` | shipped | Phase 1.5 |
| `od conversation list/info` | shipped | Phase 2C entry slice |
| `od files diff` | absent | Phase 2C |
| `od project import` (CLI wrapper of `/api/import/folder`) | absent | Phase 2C |
| `od conversation new` | absent | Phase 2C |
| `od plugin scaffold` (interactive starter) | shipped | Phase 4 — `apps/daemon/src/plugins/scaffold.ts` + `od plugin scaffold --id <id>` |
| `od plugin export <projectId> --as od\|claude-plugin\|agent-skill` | shipped | Phase 4 — `apps/daemon/src/plugins/export.ts` + `POST /api/applied-plugins/export` |
| `od plugin publish --to anthropics-skills\|awesome-agent-skills\|clawhub\|skills-sh` | shipped | Phase 4 — `apps/daemon/src/plugins/publish.ts` + `--open` browser launch |
| `od atoms list / show` | shipped | Phase 4 — wraps `GET /api/atoms` |
| `od skills list / show` | shipped | Phase 4 — wraps `GET /api/skills{,/:id}` |
| `od design-systems list / show` | shipped | Phase 4 — wraps `GET /api/design-systems{,/:id}` |
| `od craft list / show` | shipped | Phase 4 — new `GET /api/craft{,/:id}` |
| `od status / od version` | shipped | Phase 4 |
| `od marketplace search "<query>" [--tag <t>]` | shipped | Phase 3 — substring search over every configured catalog |
| `od skills/design-systems/craft/atoms list/show` | absent | Phase 4 |
| `od status/doctor/version/config` | partial | Phase 4 (some pieces exist; audit) |

### 3.6 Web components

| Component | Status | Phase |
| --- | --- | --- |
| `apps/web/src/components/InlinePluginsRail.tsx` | shipped | Phase 2A |
| `apps/web/src/components/ContextChipStrip.tsx` | shipped | Phase 2A |
| `apps/web/src/components/PluginInputsForm.tsx` | shipped | Phase 2A |
| `apps/web/src/components/PluginsSection.tsx` | shipped | Phase 2B — composable host-agnostic widget |
| `applyPlugin()` helper in `apps/web/src/state/projects.ts` | shipped | Phase 2A — also exports `renderPluginBriefTemplate` |
| `apps/web/src/components/GenUISurfaceRenderer.tsx` | shipped | Phase 2A (confirmation/oauth-prompt first-class; form/choice fall back to JSON Schema preview until Phase 2A.5) |
| `apps/web/src/components/GenUIInbox.tsx` | shipped | Phase 2A |
| `NewProjectPanel` plugin rail mount | shipped | Phase 2B (entry slice) — `PluginsSection` mounted under the project-name input |
| `ChatComposer` plugin rail mount | shipped | Phase 2B — `PluginsSection variant='strip'` rendered above the composer input when a `projectId` is bound |
| `apps/web/src/components/MarketplaceView.tsx` | shipped | Phase 2B — catalog grid + trust filters + configured-catalogs panel; routes `/marketplace`. |
| `apps/web/src/components/PluginDetailView.tsx` | shipped | Phase 2B — `/marketplace/:id` (alias `/plugins/:id`); 'Use this plugin' calls applyPlugin → Home. |
| `apps/web/src/components/HomeHero.tsx` + `home-hero/chips.ts` | shipped | Current product entrypoint — curated scenario chip rail; transitional until a unified scenario registry drives Home + filters + composer tools |
| `apps/web/src/components/PluginsHomeSection.tsx` + `plugins-home/facets.ts` | shipped | Data-derived community filters from manifest/taskKind/scenario/tags/pipeline metadata plus curated category taxonomy |

---

## 4. Dependency topology (drives phase ordering)

```text
                  ┌─ contracts/plugins/* ─┐
                  │                       │
         plugin-runtime (parsers + merge + resolve + validate + digest)
                  │
       ┌──────────┼─────────────────────────┐
       │          │                         │
   registry   installer                  apply (pure)
       │          │                         │
       └────┬─────┘                         │
            │                          snapshots ───── connector-gate
            │                               │              │
       composeSystemPrompt(snapshotId)       │         tool-tokens
            │                               │              │
            └─────────── runs ──────────────┘              │
                          │                                │
                  pipeline + devloop + genui ──────────────┘
                          │
                     SSE/ND-JSON events
                          │
            ┌─────────────┴─────────────┐
       CLI (plugin/run/files/ui)   Web (rail/strip/inputs/genui)
```

Three reads from the graph (drove the §6 phase reorder)

- `snapshots.ts` is the keystone. It must land in Phase 1 week 1, before pipeline / genui / connector-gate.
- `pipeline.ts` and `genui/*` are co-required for the first marketable plugin (`make-a-deck` needs `direction-picker` + `oauth-prompt`); they must land in the same phase.
- CLI and Web parallelize cleanly once `ApplyResult` JSON is stable; the only sync point is the ND-JSON event schema in `packages/contracts/src/plugins/events.ts`.

---

## 5. Foundations (early bedrock — invest in Phase 0–1 to avoid Phase 3+ rework)

- [x] **F1. Freeze `manifestSourceDigest` algorithm in Phase 0.** Implementation in `packages/plugin-runtime/src/digest.ts`; input `{manifest, inputs, resolvedContextRefs}` → sha256 hex. `packages/plugin-runtime/tests/digest.test.ts` pins 2 known-good digests + canonical-key-order invariant; daemon upgrades cannot change them.
- [x] **F2. Define `PersistedAgentEvent` plugin variants in Phase 1, even if they fire later.** Variants live in `packages/contracts/src/plugins/events.ts` (`pipeline_stage_*`, `genui_surface_*`); pipeline / genui emitters land Phase 2A.
- [x] **F3. `installed_plugins.source_kind` accepts `'bundled'` from Phase 1.** `PluginSourceKindSchema` permissive: `bundled / user / project / marketplace / github / url / local`.
- [x] **F4. `PluginAssetRef.stageAt` defaults to `'run-start'`, never `'project-create'`.** Default baked into `packages/contracts/src/plugins/apply.ts`.
- [ ] **F5. `--json` output uses contracts types; no inline reshape in `cli.ts`.** Phase 1 CLI ships `--json` for `list/info/apply/doctor` returning the daemon JSON verbatim; the next CLI rev imports `ApplyResult` etc. from contracts to satisfy the compile-time guarantee.
- [x] **F6. `OD_MAX_DEVLOOP_ITERATIONS` lives in `apps/daemon/src/app-config.ts`, default 10, override via env.** Read via `readPluginEnvKnobs()`; consumed by Phase 2A `pipeline.ts`.
- [ ] **F7. `od plugin doctor` validates `od.connectors.required[]` against `connectorService.listAll()` from Phase 1.** Phase 1 doctor validates manifest schema, atoms, and resolved skill / DS / craft refs; the connector lookup wires in once `connectorService` is exposed to the doctor module (Phase 1 cleanup PR).
- [x] **F8. Cross-conversation cache (`genui_surfaces` lookup) goes live with the table — i.e. Phase 2A — and a daemon test asserts the second `oauth-prompt` does not broadcast.** Covered by `apps/daemon/tests/plugins-pipeline-runner.test.ts` (`reuses a project-tier surface answer across conversations`).
- [x] **F9. Snapshot lifecycle env vars (PB2)** live in `apps/daemon/src/app-config.ts` from Phase 1: `OD_SNAPSHOT_UNREFERENCED_TTL_DAYS` (default `30`, set to `0` to disable), `OD_SNAPSHOT_RETENTION_DAYS` (default unset, opt-in), `OD_SNAPSHOT_GC_INTERVAL_MS` (default `6 * 60 * 60 * 1000`). All three live in `readPluginEnvKnobs()`; `applied_plugin_snapshots.expires_at` is stamped on insert; the GC worker lands Phase 5.

---

## 6. Phase plan（按依赖而不是 user-visible feature 从 spec §16 重排）

Spec §16 的顺序面向读者；这里是 build order。每个 phase 都有明确的 deliverables、validation steps 和 exit criterion。落地每项内容的 PR 需要翻转对应 checkbox。

### Phase 0 — Spec freeze + contracts skeleton (1–2 d)

Deliverables

- [x] `docs/schemas/open-design.plugin.v1.json` — JSON Schema v1.
- [x] `docs/schemas/open-design.marketplace.v1.json` — JSON Schema v1.
- [x] `packages/contracts/src/plugins/{manifest,context,apply,marketplace,installed,events}.ts` (types + Zod schemas; no logic).
- [x] Re-export from `packages/contracts/src/index.ts`.
- [x] `packages/plugin-runtime/src/digest.ts` with frozen sha256 algorithm + fixture cases (`packages/plugin-runtime/tests/digest.test.ts`).

Validation

- [x] `pnpm --filter @open-design/plugin-runtime test`
- [x] `pnpm guard && pnpm typecheck`
- [x] CI digest stability: re-running `digest()` on the fixtures matches the pinned hex.

Exit criterion

- 从 daemon 和 web 导入 `import type { ApplyResult, AppliedPluginSnapshot } from '@open-design/contracts'` 可用。已验证。

### Phase 1 — Loader + installer + apply + snapshot + headless CLI loop (5–7 d)

为何与 spec 中的 "headless MVP CLI loop" 合并：见 I4。Spec 的 Phase 1 明确将它前移；本计划保持这一点。

Deliverables（week 1: data layer）

- [x] 为 `installed_plugins`、`plugin_marketplaces`、`applied_plugin_snapshots` 添加 SQLite migration（按 PB2 包含 `expires_at INTEGER`）。`runs` table 目前在 `apps/daemon/src/runs.ts` 中是 in-memory；in-memory run 携带 snapshot id。`projects` 和 `conversations` 在 `migratePlugins()` 中获得 `applied_plugin_snapshot_id` ALTER。
- [x] `apps/daemon/src/app-config.ts` 在 `readPluginEnvKnobs()` 下定义 `OD_SNAPSHOT_UNREFERENCED_TTL_DAYS`（默认 `30`）、`OD_SNAPSHOT_RETENTION_DAYS`（默认 unset）、`OD_SNAPSHOT_GC_INTERVAL_MS` 和 `OD_MAX_DEVLOOP_ITERATIONS`（F6）。Apply path 在 insert 时 stamp `expires_at`；GC worker 在 Phase 5 落地。
- [x] `packages/plugin-runtime` parsers / adapters / merger / resolver / validator + digest.
- [x] `apps/daemon/src/plugins/registry.ts` — install-root scan, sidecar + adapter merge, SQLite reader/writer. (Hot reload + project tier scan land Phase 2A.)
- [x] `apps/daemon/src/plugins/installer.ts` — local folder install with path-traversal guard, 50 MiB size cap, symlink rejection. GitHub tarball / HTTPS sources land Phase 2A.
- [x] `apps/daemon/src/plugins/apply.ts` — pure; emits `ApplyResult` with draft snapshot.
- [x] `apps/daemon/src/plugins/snapshots.ts` — sole writer of `applied_plugin_snapshots`. (Repo-level `rg` guard wiring in `scripts/guard.ts` lands in the Phase 2A polish PR.)
- [ ] 将 `apps/daemon/src/{skills,design-systems,craft}.ts` refactor 为委托给 `registry.ts`。Phase 1 保持现有 loaders 独立，以确保 `/api/skills`、`/api/design-systems`、`/api/craft` endpoints byte-for-byte 稳定；Phase 2A 再把它们折叠进 plugin registry。

Deliverables（week 2: surface layer）

- [x] HTTP: `GET /api/plugins`、`GET /api/plugins/:id`、`POST /api/plugins/install`（SSE）、`POST /api/plugins/:id/uninstall`、`POST /api/plugins/:id/apply`、`POST /api/plugins/:id/doctor`、`GET /api/atoms`、`GET /api/applied-plugins/:snapshotId`。`POST /api/projects` / `POST /api/runs` 继续接受现有 payloads；显式 `pluginId` / `appliedPluginSnapshotId` plumbing 会在 `runs` SQL migration 就位后，作为 follow-up Phase 1 PR 落地。
- [x] `apps/daemon/src/prompts/system.ts` 中的 `composeSystemPrompt()` 接受通过 `pluginPromptBlock(snapshot)` 从 snapshot 渲染出的 `pluginBlock`，并发出 `## Active plugin` + `## Plugin inputs` sections。Shape：pure assembler + content table（按 I5）。
- [x] CLI: `od plugin install/list/info/uninstall/apply/doctor`. `od project / run / files` subcommands stay scheduled for the Phase 1 follow-up PR.
- [ ] Phase 1 `od plugin doctor` 覆盖：schema validation、SKILL.md parse、atom id existence check、resolved-context ref check、digest drift detection。MCP dry-launch 和 connector existence（F7）在 Phase 1 cleanup PR 中落地。

Validation

- [x] `pnpm --filter @open-design/plugin-runtime test` covers: digest stability, `parseManifest` + `parseMarketplace`, SKILL frontmatter adapter, sidecar+adapter merge precedence, `validateSafe` cross-field rules.
- [x] `apps/daemon/tests/plugins-{apply,snapshots,installer,e2e-fixture}.test.ts` cover apply purity, snapshot writer, installer guards, and the closed-loop install→apply→snapshot→doctor walk.
- [x] **e2e-1 closed loop** — `apps/daemon/tests/plugins-e2e-fixture.test.ts` runs the §12.5 walk against the bundled `apps/daemon/tests/fixtures/plugin-fixtures/sample-plugin/` fixture without spinning the HTTP server.
- [ ] **e2e-2 pure apply across runs** — Phase 1 follow-up: drive `applyPlugin` through `POST /api/plugins/:id/apply` against a running daemon and assert two consecutive applies share the same `manifestSourceDigest`.
- [ ] **e2e-3 headless run** — needs `od daemon start --headless` (Phase 1.5) and the `od run start --plugin <id>` plumbing (Phase 1 follow-up).

Exit criterion

- Phase 1 daemon-only walkthrough 通过：`od plugin install --source <fixture>` → `od plugin list` → `od plugin apply <id>` 会产生稳定的 `AppliedPluginSnapshot`。§12.5 web-driven walkthrough 需要 Phase 1 follow-up PR + Phase 1.5 headless flag。

### Phase 1.5 — Headless daemon lifecycle subset (1 d)

从 spec §16 Phase 5 中抽出，因为 Phase 1 e2e 需要它。避免出现 "Phase 1 looks green on macOS desktop, breaks on Linux CI" 这类 false positives。

Deliverables

- [x] `od daemon start --headless` flag (no electron, no web bundle).
- [x] `od daemon start --serve-web` flag (web UI without electron). Today this is an alias of `--headless` because the v1 daemon serves both API and web UI from the same Express app; the flag is reserved so packaged callers can branch on it.
- [x] Honor `OD_BIND_HOST` and `OD_PORT` in headless mode (the flags forward into the env so the existing daemon code path picks them up unchanged).
- [x] `od daemon stop`, `od daemon status --json`.

Validation

- [x] `apps/daemon/tests/daemon-lifecycle.test.ts` covers the `/api/daemon/status` shape and the loopback-only enforcement on `/api/daemon/shutdown`.
- [ ] `apps/daemon/tests/plugins-headless-run.test.ts` covers e2e-3's HTTP-level walkthrough; the full Docker re-run is deferred to the Phase 5 cloud-deployment PR.

### Phase 2A — Pipeline + devloop + GenUI(confirmation/oauth-prompt) + connector-gate + Web inline rail (4–6 d)

Deliverables (daemon)

- [x] `apps/daemon/src/plugins/pipeline.ts` — stage scheduler; `until` evaluator; devloop with `OD_MAX_DEVLOOP_ITERATIONS` ceiling.
- [x] `apps/daemon/src/plugins/pipeline-runner.ts` — bridges the scheduler onto a live run's SSE stream + GenUI cache.
- [x] SQLite migration: `run_devloop_iterations`, `genui_surfaces` (3 indexes), `connectors_required_json` / `connectors_resolved_json` / `mcp_servers_json` columns on `applied_plugin_snapshots`.
- [x] `apps/daemon/src/genui/{registry,events,store}.ts` — confirmation, oauth-prompt, form, choice surfaces; reuse the existing `apps/daemon/src/connectors/` flow for `oauth.route='connector'`.
- [x] Cross-conversation cache (F8) — `lookupResolved` + emit `genui_surface_response { respondedBy: 'cache' }`.
- [x] `apps/daemon/src/plugins/connector-gate.ts` — apply path connector resolution + token-issuance gate. `/api/tools/connectors/execute` re-validates per call (`CONNECTOR_NOT_GRANTED`).
- [x] HTTP: `GET /api/runs/:runId/genui`, `GET /api/projects/:projectId/genui`, `POST /api/runs/:runId/genui/:surfaceId/respond`, `POST /api/projects/:projectId/genui/:surfaceId/revoke`, `POST /api/projects/:projectId/genui/prefill`, `POST /api/runs/:runId/replay`, `GET /api/runs/:runId/devloop-iterations`.
- [x] SSE / ND-JSON streams emit `pipeline_stage_started/completed`, `genui_surface_request/response/timeout`, `genui_state_synced` per F2.
- [x] API-fallback rejection: `/api/proxy/*` returns `409 PLUGIN_REQUIRES_DAEMON` (e2e-7).
- [x] **PB1 — `renderPluginBlock(snapshot)` lives in `packages/contracts/src/prompts/plugin-block.ts`.** Both composers import it; v1 fallback still 409s.

Deliverables (CLI)

- [x] `od plugin trust <id> --capabilities …` (with `connector:<id>` form) + `--revoke`.
- [x] `od plugin apply --grant-caps a,b` + `--input k=v` (repeated).
- [x] `od plugin replay <runId>`.
- [x] `od ui list/show/respond/revoke/prefill`.
- [x] CLI structured error envelope for §12.4 exit codes (64–73).
- [x] `od plugin run <id>` apply→start shorthand (full ND-JSON streaming via `od run watch` lands as part of the Phase 1 follow-up).
- [x] `od plugin snapshots list / prune` (operator escape hatch).

Deliverables (web)

- [x] `applyPlugin(pluginId, projectId?)` helper in `apps/web/src/state/projects.ts`.
- [x] `InlinePluginsRail`, `ContextChipStrip`, `PluginInputsForm`.
- [x] `GenUISurfaceRenderer` for `confirmation` + `oauth-prompt` (cards / modal); `form` / `choice` ship a fallback JSON-Schema preview + textarea until Phase 2A.5.
- [x] `GenUIInbox` drawer.
- [x] Mount the trio in `NewProjectPanel` and `ChatComposer` — `PluginsSection` wraps `InlinePluginsRail`/`ContextChipStrip`/`PluginInputsForm` and is mounted under the project-name input in `NewProjectPanel.tsx:467` and above the composer input in `ChatComposer.tsx:701` (variant='strip').

Validation

- [x] **e2e-4 replay invariance** — `apps/daemon/tests/plugins-dod-e2e.test.ts`.
- [x] **e2e-5 GenUI cross-conversation** — `apps/daemon/tests/plugins-pipeline-runner.test.ts`.
- [x] **e2e-6 connector gate** — `apps/daemon/tests/plugins-dod-e2e.test.ts` + `plugins-tool-token-gate.test.ts`.
- [x] **e2e-7 api-fallback rejection** — `apps/daemon/tests/proxy-routes.test.ts`.
- [x] Daemon unit test: pipeline stage scheduler converges on a critique signal in ≤3 iterations — `apps/daemon/tests/plugins-pipeline-runner.test.ts`.
- [x] Daemon unit test: F8 cache hit does not broadcast — `apps/daemon/tests/plugins-pipeline-runner.test.ts`.

### Phase 2A.5 — GenUI form + choice + JSON Schema renderer (2–3 d)

Deliverables

- [x] `GenUISurfaceRenderer` extended for `form` and `choice`; JSON Schema → React form bridge (small, in-tree; no external dep added). Strict subset: `type:object` properties whose leaves are scalars (`string` / `number` / `integer` / `boolean`) or single-level enums; nested objects/arrays fall back to the JSON textarea. `defaultValue` is honoured so cross-conversation re-asks pre-fill. (`apps/web/src/components/GenUISurfaceRenderer.tsx` `JsonSchemaFormSurface` + `readObjectSchemaFields`).
- [x] CLI parity: `GET /api/runs/:runId/genui/:surfaceId` enriches the response with the snapshot's surface spec (incl. JSON Schema). `od ui show --schema` prints just the schema for headless agents (`apps/daemon/src/cli.ts:UI_BOOLEAN_FLAGS` + the `--schema` shortcut in `runUiShow`).

Validation

- [x] Web test: `apps/web/tests/components/GenUISurfaceRenderer.schema-form.test.tsx` 覆盖 structured form path（string + select + integer + boolean）、default-value seeding、通过现有 button-group renderer 路由 single-enum choice，以及 unsupported leaves 的 JSON-textarea fallback。
- [x] Daemon test: `apps/daemon/tests/plugins-genui-spec-enrichment.test.ts` boots the daemon, installs a fixture plugin with a form surface, creates a project + snapshot, drops a `genui_surfaces` row, and asserts the `GET /api/runs/:runId/genui/:surfaceId` response carries `spec.schema` exactly as declared in the manifest.
- [ ] Daemon test (deferred): a `form` surface answered via `od ui respond --value-json '...'` and a UI answer both emit `genui_surface_response` with `respondedBy: 'user'` — kept open for the dedicated CLI ↔ UI parity sweep in Phase 4 e2e-9.

### Phase 2B — Marketplace deep UI + ChatComposer apply + preview sandbox (4–6 d)

Deliverables

- [x] Routes `/marketplace`, `/marketplace/:id` (alias `/plugins/:id`) in `apps/web/src/router.ts:33`.
- [x] `MarketplaceView`, `PluginDetailView` (`apps/web/src/components/MarketplaceView.tsx`, `apps/web/src/components/PluginDetailView.tsx`).
- [x] `ChatComposer` integrates `PluginsSection` (which composes `InlinePluginsRail` + `ContextChipStrip` + `PluginInputsForm`) at `ChatComposer.tsx:701`; `applyPlugin()` accepts the bound `projectId` (`apps/web/src/state/projects.ts`).
- [x] `GET /api/plugins/:id/preview` and `/api/plugins/:id/example/:name` with the §9.2 sandbox CSP (`default-src 'none'; connect-src 'none'; ...`), `X-Content-Type-Options: nosniff`, and the same envelope as `/asset/*`. The preview entry follows `od.preview.entry` with `preview/index.html` + `index.html` fallbacks; the example endpoint matches against folder name / basename / declared title in `od.useCase.exampleOutputs[]`. (`apps/daemon/src/server.ts:servePluginSandboxedHtml`.)
- [x] Preview path traversal / symlink / size guards — the helper rejects `..` segments, refuses to follow symlinks via `lstat`, and caps payloads at 5 MiB.

Validation

- [ ] Browser test: a malicious-fixture preview cannot fetch `/api/*` (CSP `connect-src 'none'`).
- [ ] e2e: install local plugin → marketplace → detail preview → "Use" → Home or ChatComposer prefilled → run produces design.

### Phase 2C — Advanced CLI: files write/upload/delete/diff, project import, run logs (2–3 d)

Deliverables

- [ ] `od files write/upload/delete/diff`.
- [ ] `od project delete/import`, `od run list/logs --since`.
- [ ] `od conversation list/new/info` (basic).

Validation

- [ ] Extend the §12.5 walk-through: `od project import` an external folder → `od plugin apply` → `od plugin replay <runId>` reruns on top.

### Phase 3 — Federated marketplaces + tiered trust + bundle plugins (3–5 d)

Deliverables

- [x] `od marketplace add/list/info/refresh/remove/trust` — Phase 3 entry slice.
- [x] `GET / POST /api/marketplaces`, `POST /api/marketplaces/:id/trust`, `GET /api/marketplaces/:id/plugins`.
- [x] `od plugin install <name>` resolves through configured marketplaces (`resolvePluginInMarketplaces` + `POST /api/plugins/install` bare-name detection). Marketplace trust does NOT auto-propagate — see spec §9.
- [ ] Trust UI on `PluginDetailView` (capability checklist + Grant action).
- [ ] Apply pipeline gates by `trust` + `capabilities_granted` (already partly in Phase 2A; this phase wires UI + marketplace).
- [ ] Bundle plugin installer (multiple skills + DS + craft → registry under namespaced ids).
- [ ] `od plugin doctor <id>` runs full validation including bundle expansion.

Validation

- [ ] e2e: install plugin from a local mock `marketplace.json`, rotate ref, uninstall.
- [ ] e2e: restricted plugin cannot start MCP server until Grant clicked; check `applied_plugin_snapshots.capabilities_granted` updates.

### Phase 4 — Atoms exposure, publish-back, AG-UI adapter, full CLI parity (1–2 wk; splittable)

Deliverables

- [x] `docs/atoms.md`; `GET /api/atoms` returns implemented + reserved (with `(planned)` marker). Source of truth: `apps/daemon/src/plugins/atoms.ts`.
- [x] `od plugin export <projectId> --as od|claude-plugin|agent-skill` — `apps/daemon/src/plugins/export.ts` + `POST /api/applied-plugins/export`.
- [x] `od plugin run <id> --input k=v --follow` (apply + run start wrapper) — landed in §3.B3 (Phase 2A). Full ND-JSON streaming via `od run watch` is also shipped (Phase 1 follow-up §3.F1).
- [x] `od plugin scaffold` interactive starter — `apps/daemon/src/plugins/scaffold.ts`.
- [x] `od plugin publish --to anthropics-skills|awesome-agent-skills|clawhub|skills-sh` (PR template launcher) — `apps/daemon/src/plugins/publish.ts`.
- [x] CLI parity remainder: `od skills/design-systems/craft/atoms list/show`, `od status`, `od version`, `od marketplace search`, `od doctor`, `od config get/set/list/unset`.
- [x] Optional `plugins/_official/atoms/<atom>/SKILL.md` extraction (spec §23.3.2 patch 2) — entry slice ships four atom SKILL.md fragments + the bundled boot walker; the system.ts → SKILL.md prompt-composer rewiring stays open.
- [x] `@open-design/agui-adapter` package; `GET /api/runs/:runId/agui` SSE endpoint emits AG-UI canonical events.
- [x] Plugin manifest upgrade: `od.genui.surfaces[].component` (capability gate `genui:custom-component`) — schema accepts the field; doctor flags missing-capability + path-traversal; web sandbox loader stays scheduled.

Validation

- [ ] **e2e-9 UI ↔ CLI parity**: pick 5 desktop UI workflows; replay each through `od …` only; produced artifacts byte-for-byte equal.
- [ ] AG-UI smoke: a CopilotKit React client subscribes to `/api/runs/:runId/agui` and renders surfaces unmodified. This is an external-interop smoke, not a blocker for OD-native web/desktop rendering.

### Phase 5 — Cloud deployment (parallel; can start after Phase 1.5)

Deliverables

- [x] `linux/amd64` + `linux/arm64` Dockerfile per spec §15.1 (`deploy/Dockerfile`; entry-slice base is `node:24-alpine` with `NODE_IMAGE` build-arg override → `node:24-bookworm-slim`; bundled atom plugins ship inside the image).
- [x] CI pushes `:edge` on main, `:<version>` on tag — `.github/workflows/docker-image.yml`.
- [x] `tools/pack/docker-compose.yml`, `tools/pack/helm/` — chart templates (Deployment / Service / Secret / ConfigMap / PVCs / Ingress / NOTES) shipped, per-cloud `values-<cloud>.yaml` overrides shipped (AWS / GCP / Azure / Aliyun / Tencent / Huawei / self-hosted).
- [x] Bound-API-token guard: daemon refuses to bind `OD_BIND_HOST=<non-loopback>` without `OD_API_TOKEN`; bearer middleware on `/api/*` skipped only on loopback peers and on the open probes (`/api/health`, `/api/version`, `/api/daemon/status`).
- [x] `ProjectStorage` adapter substrate — `LocalProjectStorage` (v1 default) wired + tested; `S3ProjectStorage` interface-locked stub; `resolveProjectStorage` reads `OD_PROJECT_STORAGE`. AWS SDK wiring stays as the next Phase 5 PR.
- [x] `DaemonDb` adapter substrate — `resolveDaemonDbConfig` reads `OD_DAEMON_DB` + `OD_PG_*`; the SQLite path is the only reachable backend until the postgres adapter lands.
- [x] **Snapshot retention enforcement job (PB2).** Landed early (§3.A5): periodic worker (`OD_SNAPSHOT_GC_INTERVAL_MS`, default 6 h) deletes expired rows. Referenced-row TTL via `OD_SNAPSHOT_RETENTION_DAYS` stays opt-in. CLI escape hatch: `od plugin snapshots prune --before <ts>`.

Validation

- [ ] `docker run` smoke: image starts, web UI renders, `od plugin install` works inside container.
- [ ] Multi-cloud smoke: deploy compose to AWS Fargate, GCP Cloud Run, Azure Container Apps; produce a fixed plugin's artifact byte-for-byte equal across clouds.
- [ ] Pluggable storage smoke: same plugin alternated between local-disk + SQLite and S3 + Postgres; artifacts identical.

### Phase 6 / 7 / 8 — Post-v1 native scenario coverage (per spec §21.4)

These are tracked but **not part of v1 sign-off**. Listed here so spec patches that promote `(planned)` atoms have a place to update.

- [x] **Phase 6 — figma-migration native**: implement `figma-extract` + `token-map`; ship official `figma-migration` plugin. **All atom impls + asset pass landed (plan §3.M3 / §3.N4 / §3.O2 / §3.P1 / §3.P2 / §3.Q2): `figma-extract` walks the Figma REST API into `<cwd>/figma/{tree,tokens,meta}.json` AND honours `offlineAssets:false` to download per-leaf-node assets via `GET /v1/images` (50-id chunks, per-id failure isolation, configurable size cap, `assets/<id>.<ext>` layout). `token-map` crosswalks any source bag against the active design system. Bundled scenario plugin `od-figma-migration` ships the canonical pipeline.**
- [x] **Phase 7 — code-migration native** (§20.3 §21.3.2): `code-import`, `design-extract`, `rewrite-plan`, `patch-edit`, `diff-review`, `build-test`. **All six atom impls landed (plan §3.N1 / §3.N2 / §3.O2 / §3.O3 / §3.O4 / §3.O5). Bundled scenario plugin `od-code-migration` ships the canonical pipeline (`code-import` → `design-extract` + `token-map` → `rewrite-plan` → `patch-edit ↔ build-test` devloop → `diff-review` → `handoff`). Live HTTP wiring for the per-stage runner keeps to scheduled.**
- [x] **Phase 8 — production code delivery native**: repo-aware multi-file patch orchestration; native review-and-apply surface; promote `handoffKind: 'deployable-app'` from reservation to implementation. **End-to-end wiring landed (plan §3.N3 / §3.O4 / §3.O5 / §3.P3 / §3.Q1 / §3.R1): `patch-edit` enforces shell-tier safety + writes per-step receipts; `diff-review` emits review/{diff.patch,summary.md,decision.json,meta.json}; the daemon auto-derives a `__auto_diff_review_<stageId>` choice surface for every diff-review stage; the web composer's `GenUISurfaceRenderer` renders the diff-review surface natively (Accept all / Reject all / Partial… per-file checklist) plus a generic single-enum-property choice fallback; `POST /api/runs/:runId/genui/:surfaceId/respond` now bridges the diff-review choice surface response into `runDiffReview()` so the user's decision lands on `review/decision.json` immediately. `recordHandoff()` enforces append-only export/deploy targets; `isDeployableAppEligible()` centralises the §11.5.1 promotion rule. `ArtifactManifest` carries the full reserved provenance surface.**

---

## 7. Spec decisions (locked)

These were originally spec §18 open questions; they are now resolved and propagated into both this plan and `docs/plugins-spec.md` proper. Future spec patches that revisit them must update both files in the same PR.

- **PB1. Lift `## Active plugin` block into `packages/contracts/src/prompts/plugin-block.ts` in Phase 2A** (was Phase 4). **Decision: accepted as proposed.** Both `composeSystemPrompt()` implementations (daemon + contracts) import the same renderer. Spec §11.8 patched to drop the "Phase 4 lifts the block" bullet and the CI byte-equality cross-check fixture; spec §18 patched to mark the open question resolved. Plan §6 Phase 2A gains the deliverable; Phase 4 loses it.
- **PB2. `AppliedPluginSnapshot` unreferenced-row TTL.** **Decision: accepted with one modification** to preserve spec §8.2.1's reproducibility-first stance. Final shape:
  - `applied_plugin_snapshots.expires_at INTEGER` column lands in Phase 1 (NULL allowed).
  - Snapshots referenced by any `runs.applied_plugin_snapshot_id` / `conversations.applied_plugin_snapshot_id` / `projects.applied_plugin_snapshot_id` keep `expires_at = NULL` (pinned forever; reproducibility unchanged).
  - Unreferenced snapshots receive `expires_at = applied_at + OD_SNAPSHOT_UNREFERENCED_TTL_DAYS` (default **30 d**, set to `0` to disable). This is the apply-then-cancel garbage-growth defense.
  - The "expire even referenced" knob `OD_SNAPSHOT_RETENTION_DAYS` is **operator-opt-in only**, default unset; when set, a referenced row may expire if `applied_at` is older than the window AND the referencing row is itself terminal (run finished, conversation archived, project deleted).
  - Both env vars live in `apps/daemon/src/app-config.ts` (per F6 pattern). Phase 1 ships the column + config wiring; Phase 5 ships the periodic enforcement job.
  - Spec §11.4 patched to add the `expires_at` column; spec §18 patched to mark the open question resolved.

---

## 8. Definition of done (the hard sign-off bar for v1)

v1 ships when **all** of the following pass on a clean Linux CI container without electron. Each row links to the daemon / e2e test path that asserts it.

- [x] **e2e-1 cold install** — `od plugin install ./fixtures/sample-plugin` →
  - `<OD_DATA_DIR>/plugins/sample-plugin/` exists.
  - `installed_plugins` has one row with `trust='restricted'`, `source_kind='local'`.
  - Test path: `apps/daemon/tests/plugins-e2e-fixture.test.ts`
- [x] **e2e-2 pure apply** — two consecutive applies share `manifestSourceDigest`; the project cwd byte size is unchanged; `applied_plugin_snapshots` is not written by `applyPlugin()` itself (the resolver is the writer).
  - Test path: `apps/daemon/tests/plugins-dod-e2e.test.ts` (`e2e-2 pure apply across runs`).
- [x] **e2e-3 headless run (full §8 contract).** Install → project create → run start → status → snapshot fetch all walked at the HTTP layer; the run's first SSE event is `pipeline_stage_started` (asserted via the live SSE stream) and the snapshot id is pinned through every step. `firePipelineForRun()` runs synchronously inside `POST /api/runs` before `design.runs.start()` schedules the agent.
  - Test path: `apps/daemon/tests/plugins-headless-run.test.ts` (both `walks install → project create → run start → status with snapshot pinned` and `first SSE event on a plugin run with od.pipeline is pipeline_stage_started`).
- [x] **e2e-4 replay invariance** — after a same-id plugin upgrade, `renderPluginBlock(snapshot)` returns the byte-equal prompt block; the live applyPlugin against the upgraded plugin produces a different `manifestSourceDigest`.
  - Test path: `apps/daemon/tests/plugins-dod-e2e.test.ts` (`e2e-4 replay invariance`).
- [x] **e2e-5 GenUI cross-conversation** — second conversation in the same project does not broadcast a fresh `genui_surface_request`; it emits `genui_surface_response { respondedBy: 'cache' }` instead.
  - Test path: `apps/daemon/tests/plugins-pipeline-runner.test.ts` (`reuses a project-tier surface answer across conversations`).
- [x] **e2e-6 connector trust gate** — `resolvePluginSnapshot` rejects with HTTP 409 / exit 66 / `capabilities-required` when the snapshot is restricted and `connector:<id>` is missing. Independently, `checkConnectorAccess` rejects the same call so a leaked tool token cannot bypass §5.3.
  - Test path: `apps/daemon/tests/plugins-dod-e2e.test.ts` (`e2e-6 connector trust gate`) + `apps/daemon/tests/plugins-tool-token-gate.test.ts`.
- [x] **e2e-7 api-fallback rejection** — every `/api/proxy/*` entry returns `409 PLUGIN_REQUIRES_DAEMON` when a body smuggles `pluginId` or `appliedPluginSnapshotId`.
  - Test path: `apps/daemon/tests/proxy-routes.test.ts` (`API fallback rejects plugin runs`).
- [x] **e2e-8 apply purity regression** — 100 applies grow the snapshot count by 100, leave the project cwd byte size unchanged, and emit no `.mcp.json`.
  - Test path: `apps/daemon/tests/plugins-dod-e2e.test.ts` (`e2e-8 apply purity regression`).

Plus repo-wide gates

- [x] `pnpm guard` clean.
- [x] `pnpm typecheck` clean.
- [x] `pnpm --filter @open-design/contracts test` clean.
- [x] `pnpm --filter @open-design/plugin-runtime test` clean.
- [x] `pnpm --filter @open-design/daemon test` — all 56 `plugins-*.test.ts` (391 tests) green. Three unrelated pre-existing failures remain (`finalize-design.test.ts` resolveCurrentArtifact path normalization, `chat-route.test.ts` stalled-json-stream timeout, `connection-test.test.ts` hard-cancel timeout). They were inherited from PR #832 and the chat/connection timeout test refactors and do not block the plugin loop; tracked separately.
- [x] `pnpm --filter @open-design/web test` clean.

---

## 9. Status snapshot (the always-live cell)

| Field | Value |
| --- | --- |
| Current phase | Phase 2A + 1 + 1.5 + 2B + 2C entry slice + 3 (full) + 4 (full incl. OD_BUNDLED_ATOM_PROMPTS default ON) + 5 (full incl. live S3 impl; postgres adapter still stubbed) + 6 (full incl. asset rasterisation) + 7 (all six atom impls) + 8 (full incl. GenUI \u2192 decision bridge) + scenarios bundle + bundled-scenario fallback resolver |
| Next planned PR | (a) Phase 2C — `od files write/upload/delete/diff` + `od project import` + `od conversation new`. (b) Phase 3 — Trust UI on `PluginDetailView` + bundle plugin installer. (c) Phase 4 e2e-9 — UI ↔ CLI parity walkthrough (5 workflows). (d) postgres adapter wiring inside the DaemonDb resolver. (e) Scenario registry convergence so Home chips, plugin filters, composer tools, and `@search` project from the same manifest/scenario taxonomy. |
| Open spec push-backs | none — PB1 / PB2 resolved (see §7) |
| Last sync against `docs/plugins-spec.md` | 2026-05-13（澄清 default/no-plugin behavior、`od-default` routing、daemon system-prompt layering、plugin-assembled pipeline stages、OD-native controlled GenUI rendering、AG-UI adapter 仅作 interoperability，以及当前 Home rail 与 PluginsHome facet convergence gap） |

Update this table on every plugin-system PR merge. When the value of "Current phase" advances, also flip the matching deliverables in §6 and the modules in §3.

---

## 10. References

- Spec: [`docs/plugins-spec.md`](../plugins-spec.md) · [`docs/plugins-spec.zh-CN.md`](../plugins-spec.zh-CN.md)
- Skills protocol: [`docs/skills-protocol.md`](../skills-protocol.md)
- Architecture overview: [`docs/architecture.md`](../architecture.md)
- Repository conventions: [`AGENTS.md`](../../AGENTS.md), [`apps/AGENTS.md`](../../apps/AGENTS.md), [`packages/AGENTS.md`](../../packages/AGENTS.md)
- Adjacent active plan: [`docs/plans/manual-edit-mode-implementation.md`](manual-edit-mode-implementation.md)
