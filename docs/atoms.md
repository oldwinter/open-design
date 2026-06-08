# First-party atom catalog

> Open Design 暴露给 plugins 的原子能力。
> Spec：[`docs/plugins-spec.md`](plugins-spec.md) §10。
> 真源：[`apps/daemon/src/plugins/atoms.ts`](../apps/daemon/src/plugins/atoms.ts)。
> Live discovery：`GET /api/atoms`（未来 PR 中也可通过 `od atoms list --json` 访问）。

**Plugin** 会把 atoms 组合成有序 stages（`od.pipeline.stages[].atoms[]`）。
Open Design daemon 负责把每个 atom 解析成 system-prompt fragment、tool gating，以及（如适用）GenUI surface declarations。Plugins
永远不拥有 atom implementations；它们只通过 id 引用 atom。

## 如何阅读本文档

- **id** — 写入 `od.pipeline.stages[*].atoms[]` 与
  `od.context.atoms[]` 的值。跨 daemon versions 保持稳定。
- **status** — `implemented`（v1 中可用）或 `planned`（id 已保留；daemon
  会接受它，但在对应 atom 接线前会发出 doctor warning）。
- **task kinds** — atom 面向四种 product scenarios（`new-generation`、
  `code-migration`、`figma-migration`、`tune-collab`）中的哪些。Plugins 可以在声明范围之外引用 atom，但 doctor
  会把这标记为可疑。

## Implemented atoms（v1）

| id | label | task kinds |
| --- | --- | --- |
| `discovery-question-form` | Discovery question form — 面向模糊 brief 的 turn-1 question form。 | `new-generation`, `tune-collab` |
| `direction-picker` | Direction picker — 最终提交前的 3–5 个方向选择器。 | `new-generation`, `tune-collab` |
| `todo-write` | Todo write — TodoWrite-driven plan。 | all |
| `file-read` / `file-write` / `file-edit` | Project cwd 上的 file ops。 | all |
| `research-search` | Research search — Tavily-backed shallow research。 | `new-generation` |
| `media-image` / `media-video` / `media-audio` | 通过已配置 providers 进行 media generation。 | `new-generation`, `tune-collab` |
| `live-artifact` | 创建 / 刷新 live artifacts。 | `new-generation`, `tune-collab` |
| `connector` | Composio connector tool calls。 | `new-generation`, `tune-collab` |
| `critique-theater` | 5-dimension panel critique；发出驱动 devloop convergence 的 `critique.score` signal。 | all |

## Planned atoms（reserved ids）

这些 ids 已保留，因此按 v1 spec 编写的 plugins 在 daemon 添加对应 capability 时无需改名。正式 promotion 前，daemon 会把引用视为 “doctor warning”，而不是 “unknown atom error”。

| id | label | task kinds |
| --- | --- | --- |
| `code-import` | Clone / read existing repo。 | `code-migration` |
| `design-extract` | 从 source code / Figma / screenshots 中提取 design tokens。 | `code-migration`, `figma-migration` |
| `figma-extract` | 提取 Figma node tree + tokens + assets。 | `figma-migration` |
| `token-map` | 把提取出的 tokens 映射到 active design system。 | `code-migration`, `figma-migration` |
| `rewrite-plan` | Long-running multi-file rewrite plan。 | `code-migration`, `tune-collab` |
| `patch-edit` | Small-step file patches。 | `code-migration`, `tune-collab` |
| `diff-review` | 把 rewrite 渲染成可 review diff。 | `code-migration`, `tune-collab` |
| `handoff` | 把 artifact 推送到 downstream surfaces（cli / cloud / desktop）。 | `tune-collab` |

## Daemon 如何解析 atom

1. Plugin manifest 的 `od.pipeline.stages[*].atoms[]` 会由 `apps/daemon/src/plugins/pipeline.ts`
   解析成 `PipelineStage[]`。
2. 运行时，`apps/daemon/src/plugins/pipeline-runner.ts` 会遍历 stages。
   对每个 stage entry：
   - 发出 `pipeline_stage_started` SSE event，
   - 要求 caller-supplied stage runner 执行 atom（今天还是 stub；Phase 4 的 atom migration 会把它迁移到 `plugins/_official/<atom>/SKILL.md`，让它完全 data-driven），
   - 为 audit 持久化一行到 `run_devloop_iterations`，
   - 带 resulting signals 发出 `pipeline_stage_completed` event。
3. Atom 的 prompt fragment / tool gating 目前 inline 在
   `apps/daemon/src/prompts/system.ts` 中。Phase 4 patch 2（spec §23.3.2）会把每个 fragment
   提升到 `plugins/_official/atoms/<atom>/SKILL.md`，让 prompt 完全 data-driven。

## Atom signals + `until` vocabulary

Spec §10.1 将 v1 `until` vocabulary 锁定为：

- `critique.score` — 由 `critique-theater` 发出。
- `iterations` — 内置 per-stage counter。
- `user.confirmed` — 当 `confirmation` GenUI surface resolve 时发出。
- `preview.ok` — 由 live-artifact preview pipeline 发出。

列表之外的 atoms 通过 `critique.score` 贡献 signals（今天的 `build-test` 形态 community plugins 就用这种方式编码 pass/fail）。Phase 7
（spec §21.4）会扩展 vocabulary，让 atoms 可以通过 `od.atom.untilSignals[]` 声明 named signals；在那之前，closed vocabulary 就是 contract。

## 添加新的 atom

1. 先按 spec §22.5 promotion path，把 atom 作为 out-of-tree plugin 编写。
2. 当 SKILL.md / MCP tool / pipeline shape 稳定后，把对应行追加到 `apps/daemon/src/plugins/atoms.ts` 中的 `FIRST_PARTY_ATOMS`。
3. 在同一个 PR 中更新本文档和 spec §10 / §21 / §23 tables。
4. 该 atom 现在可通过以下方式访问：
   - 任意 plugin 中的 `od.pipeline.stages[*].atoms[]` references，
   - `GET /api/atoms` discovery，
   - `od plugin doctor` validation。
