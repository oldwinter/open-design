# `apps/daemon/src/critique/`（Critique Theater，daemon side）

当 agents 需要修改 critique pipeline 中的任何内容时，先进入这份 module map。面向用户的 feature name 是 **Design Jury**；目录保留 **Critique Theater** 这个内部名，这样 product label 可以移动而不造成 code paths churn。

## Layout

| File | Responsibility |
|---|---|
| `config.ts` | `CritiqueConfig` defaults + `OD_CRITIQUE_*` env-var parsing。Thresholds、weights、max-rounds、timeouts 的 single source of truth。 |
| `orchestrator.ts` | State machine。Spawn CLI session，按顺序喂入 panelist prompts，等待每一轮的 SHIP / round_end，并决定继续还是终止。 |
| `parser.ts` + `parsers/v1.ts` | Streaming parser，读取 agent 的 stdout 并 yield `PanelEvent`s。拥有 `<CRITIQUE_RUN>`、`<PANELIST>`、`<SHIP>` envelope。 |
| `errors.ts` | Typed parser failures：`MalformedBlockError`、`OversizeBlockError`、`MissingArtifactError`。每个都会映射到 `DegradedReason`，让 wire-level `critique.degraded` event 携带正确 tag。 |
| `persistence.ts` | 针对 run rows 和 per-round summaries（`critique_runs`、`critique_rounds`）的 SQLite writes。 |
| `artifact-writer.ts` | SHIP artifact body 的 disk persistence。拥有 byte-budget guard（`ArtifactTooLargeError`）和 `O_NOFOLLOW` path-traversal protections。 |
| `artifact-handler.ts` | HTTP read path：`GET /api/projects/:id/critique/:runId/artifact`。 |
| `interrupt-handler.ts` | 解析来自 `POST /api/projects/:id/critique/:runId/interrupt` 的 kill request。 |
| `adapter-degraded.ts` | 带 24h TTL 的 in-memory degraded-adapter registry。Orchestrator + Settings UI 在将 run 路由给 adapter 前会查询 `isDegraded(adapterId)`。 |
| `conformance.ts` | Conformance harness entry point。Nightly cycle 会按 adapter × brief template 调用 `runAdapterConformance`，并统计 `shipped / degraded / failed`。 |
| `__fixtures__/v1/` | Parser tests + conformance harness 消费的 canonical transcripts（happy-3-rounds、malformed-unbalanced、missing-artifact 等）。 |
| `__fixtures__/adapters/` | 发出 v1 fixtures 的 synthetic adapter stubs。Conformance harness 将它们包装为 `AsyncIterable<string>`，这样无需真实 model 也能端到端演练 parser path。 |

## Invariants

- **Parser 通过 async generator 一次 yield 一个 `PanelEvent`。** Orchestrator 驱动 loop；本目录内没有任何东西会 eager 地把 events 收集进 array。
- **Terminal phases（`shipped`、`degraded`、`interrupted`、`failed`）每个 run 只发出一次。** Reducer 将它们视为 sticky；重复 ship events 会在 `parser_warning` 中触发 `duplicate_ship`。
- **Artifact bytes 永不走 wire。** SHIP event 只携带 `artifactRef: { projectId, artifactId }`；byte body 由 `artifact-writer.ts` 写入，并通过 HTTP route 获取。
- **Round bookkeeping 以 round number 为 key**，而不是“永远最后一个”。来自 round 1 的 stray late panelist event 不得污染 round 2 的 bucket。Web reducer 中的并行逻辑见 `withRound`。
- **没有 `apps/daemon/src/agents/registry.ts`。** Plan 历史上提到过该路径；本 repo 中真实 adapter registry 是 `runtimes/registry.ts`。Phase 10 routing extensions 会落在这里的 `adapter-degraded.ts`。
- **Designer weight 在 v2 cast config 落地前冻结为 0.0。** `config.ts` 将 panel weights 暴露为 `CritiqueConfig.weights`，但每个 production deployment 都使用 v1 distribution（designer 0 / critic 0.4 / brand 0.2 / a11y 0.2 / copy 0.2）。V2 work 是 cross-package：daemon 添加由 `SKILL.md` frontmatter 中 `od.critique.cast` 驱动的 per-skill weight overrides（本目录），web Settings surface 添加 per-project weight editor（`apps/web/src/components/Settings/`）。请把 v1 weights 当作 wire-shape invariant，而不是 tuning knob；v1 中途修改它们会破坏 `critique_runs` 中持久化的 `composite` numbers。

## 修改这里时

1. `packages/contracts/src/critique.ts` 中的 contracts 是 `PanelEvent`、`DegradedReason`、`FailedCause`、`ParserWarningKind` 的 single source of truth。修改本目录前先更新它们。
2. Parser 是自然的 schema strictness enforcement 位置；不要在压力下放松它。Web `sseToPanelEvent` 已经运行 defence-in-depth variant validator。
3. 每种新的 failure shape 都要在 `__fixtures__/v1/` 下添加一个 v1 fixture，并添加对应 conformance test case。
4. Wire shape 变化时，在 contracts 中 bump `CRITIQUE_PROTOCOL_VERSION`。Adapter conformance 会在 protocol-version mismatch 时自动标记 `degraded`，所以这里是 load-bearing。

## Related

- Spec: `specs/current/critique-theater.md`
- Plan: `specs/current/critique-theater-plan.md`
- User docs: `docs/critique-theater.md`
- Web counterpart: `apps/web/src/components/Theater/AGENTS.md`
