# Maintainability Roadmap

## 目的

本文档记录当前 `apps/web` + `apps/daemon` 架构中的 maintainability 风险，以及推荐的优化路径。

架构边界保持不变：

- `apps/web`: Next.js frontend 和轻量 BFF/proxy layer。
- `apps/daemon`: SQLite、daemon-managed filesystem state、AI agent CLI processes 和 SSE streaming 的本地 runtime/backend。本 roadmap 不得定义 daemon data paths；记录 storage 前，先阅读根目录 [`AGENTS.md`](../../AGENTS.md) → **Daemon data directory contract**。

第一性 maintainability 目标是：

- **Understandability**：工程师能快速定位行为并推理 data flow。
- **Changeability**：常见变更可以在有边界的 blast radius 内完成。
- **Verifiability**：contracts、tests 和 types 能尽早捕获 regressions。
- **Isolation**：高风险 capabilities 被限制在显式 boundaries 后。
- **Recoverability**：失败会产生可行动的 state、logs 和 cleanup behavior。

## 优先级尺度

| Priority | 含义 |
|---|---|
| P0 | 阻塞安全演进，或制造高风险 runtime/security failure modes。 |
| P1 | 会增加 regression 与 debugging cost 的重大 maintainability 风险。 |
| P2 | 影响 reliability、portability 或 architecture clarity 的中期风险。 |
| P3 | 支撑性的 documentation/process improvement。 |

## 风险清单与优化计划

| ID | Priority | Risk | Evidence | Impact | Optimization Plan |
|---|---:|---|---|---|---|
| R1 | P0 | Daemon TypeScript enforcement 需要持续维护。 | `apps/daemon` 现在会对 source 和 tests 做 typecheck，所有 `@ts-nocheck` suppressions 已移除。 | 新的 daemon payload、DB row、agent event 或 task-state changes 如果绕过 shared contracts 或 typed boundaries，可能重新引入 drift。 | 保持 daemon source 和 tests 受 TypeScript enforcement 约束；维持零 `@ts-nocheck`；通过 `packages/contracts` 路由 shared API/SSE/error shapes；为不可信 daemon inputs 添加 runtime validation。 |
| R2 | P0 | Web/daemon API contract 是隐式的。 | `apps/web` 通过 `/api/*` rewrites 调用 daemon；web 有 TypeScript types，daemon 返回手工成形的 JSON。 | Field mismatches 会在 runtime 暴露；API evolution 脆弱。 | 创建 `packages/api-contract` 或等价 shared contract layer，用于 request、response、error 和 SSE event types。 |
| R3 | P0 | Daemon boundary 的 runtime validation 不完整。 | Daemon requests 可触发 local filesystem access、SQLite writes 和 `child_process.spawn()`。 | 单靠 type correctness 无法防护 malformed runtime input、path traversal、invalid agent IDs 或 unsafe args。 | 在 HTTP boundaries 添加 Zod/TypeBox schema validation；集中校验 workspace paths、task IDs、agent IDs、models、reasoning options、uploaded files 和 command arguments。 |
| R4 | P0 | Local capability security boundary 需要显式规则。 | Daemon 拥有 high-permission capabilities：local files、daemon-managed storage、project workspaces、agent CLIs 和 logs。 | Unsafe path handling、过宽 command execution、token leakage 和 unintended workspace access 都可能成为 failure modes。 | 将 daemon 视作 capability server：绑定 localhost，使用 workspace/path allowlists，normalize and jail paths，allowlist agent commands，并 redact sensitive output。 |
| R5 | P0 | Agent process lifecycle 需要一等 manager。 | `/api/chat` 会 spawn 多个 agent runtimes 并把 output stream 到 frontend。 | Zombie processes、cancellation gaps、orphaned tasks、inconsistent exit handling 和 concurrent process conflicts。 | 引入 process/task manager，包含 task state machine、cancellation、timeout、cleanup、exit code capture、signal handling 和 concurrency limits。 |
| R6 | P1 | `server.ts` 过于 monolithic。 | `apps/daemon/src/server.ts` 包含大量 routes，以及 orchestration、filesystem logic、streaming、uploads 和 artifact handling。 | 更难理解、测试和修改；无关 edits 共享同一文件并增加 regression risk。 | 拆分为 thin routes 加 services/adapters：`routes/`、`services/`、`agents/`、`db/`、`fs/`、`streams/`、`artifacts/`。 |
| R7 | P1 | Error handling 不一致。 | Handlers 通常使用局部 `try/catch` 并返回 ad hoc JSON errors。 | UI 收到不一致 failures；logs 丢失 context；task state 可能在 partial failures 后停滞。 | 定义统一 error model，包含 `code`、`message`、`details`、`retryable` 和 `requestId/taskId`；添加 centralized Express error middleware 和 adapter-level error mapping。 |
| R8 | P1 | SSE protocol 规范不足。 | Daemon 手工写入 agent output 和 status 的 `text/event-stream` events。 | Frontend parsing 脆弱；disconnect、heartbeat、terminal events 和 error semantics 可能漂移。 | Version SSE event contract，并定义 canonical events，例如 `task.started`、`task.output`、`task.error`、`task.completed`、`task.cancelled` 和 `heartbeat`。 |
| R9 | P1 | SQLite schema 与 migration lifecycle 需要更强保证。 | `apps/daemon/src/db.ts` 拥有本地 `better-sqlite3` tables 和 migrations。 | Local user data upgrades 可能不可预测地失败；schema drift 难以诊断和恢复。 | 添加显式 migration table、ordered forward migrations、startup migration checks、schema version logging、backup-before-migrate strategy 和 migration tests。 |
| R10 | P1 | Daemon behavior 周围 test coverage 偏薄。 | 现有 daemon tests 主要关注 stream parsing 和 artifact manifest behavior；HTTP/DB/spawn flows 覆盖有限。 | 变更依赖 manual testing 验证；filesystem、SQLite、SSE 或 agent mocks 的 regressions 可能发布出去。 | 构建 layered tests：shared contract tests、route integration tests、service unit tests、SQLite migration tests、SSE parser tests 和 agent mock integration tests。 |
| R11 | P1 | Local runtime debugging 的 logging 与 observability 不足。 | Agent execution 涉及 long-lived tasks、subprocess output、filesystem state 和 frontend SSE consumption。 | 用户问题难以复现；failures 缺少 correlated context。 | 添加 structured logs，包含 `requestId`、`taskId`、`agentId`、`workspace`、exit code 和 duration；将 app logs 与 agent output 分离；redact secrets。 |
| R12 | P2 | Configuration、port 和 health behavior 可能变脆。 | Web proxies `/api/*` 到 daemon；dev startup 协调 Next.js 和 daemon ports。 | Port conflicts、daemon-not-ready states 和 mismatched environment variables 可能破坏 startup 或 distribution。 | 集中 config resolution；暴露 `/health`；添加 daemon readiness checks；让 port selection 和 UI fallback deterministic。 |
| R13 | P2 | Cross-platform behavior 是反复出现的风险。 | Daemon 使用 filesystem paths、SQLite native bindings、shell/process behavior 和 signals。 | macOS、Linux 和 Windows/WSL 在 path normalization、quoting、permissions 和 process termination 上可能不同。 | 一致使用 Node path APIs，避免 shell string composition，隔离 platform-specific process logic，并为 supported platforms 添加 CI coverage。 |
| R14 | P2 | Framework migration 可能分散对核心 maintainability issues 的注意力。 | 当前复杂度集中在 FS/spawn/SSE/SQLite 和 module boundaries。 | Framework rewrite 可能消耗时间，却保留风险最高的 domain logic。 | 目前保留 Express；只有在 TS、contracts、validation、tests 和 modularization 就位，且 Express 明确成为 limiter 后，才重新评估 Fastify。 |
| R15 | P2 | Web/daemon boundary 可能随时间侵蚀。 | Next.js 有 BFF capability，daemon 有 backend capability；未来 edits 可能模糊 ownership。 | High-permission local runtime logic 可能泄漏到 `apps/web`；deployment 和 security assumptions 变得不清晰。 | 记录并执行 ownership：web 处理 UI/BFF/proxy；daemon 拥有 local runtime capabilities；shared code 只包含 contracts 和 pure logic。 |
| R16 | P3 | Operational documentation 不完整。 | Local-first daemon behavior 依赖 ports、daemon-managed storage、agent CLIs、runtime logs 和 recovery flows。 | Onboarding 和 support costs 上升；troubleshooting 依赖口头知识。 | 记录 daemon architecture、API/SSE contract、task lifecycle、storage contract index、agent dependency checks 和 common recovery procedures。 |

## 优化依赖

优化工作应按依赖顺序推进。当前置条件稳定后，一些项目可以并行。

| Workstream | Status | Optimization | Covers | Depends on | Output |
|---|---|---|---|---|---|
| W1 | Completed | 确认 architecture 和 capability boundaries | R4, R15 | — | Web、daemon、shared contracts 和 dangerous local capabilities 的书面 ownership rules。见 `specs/current/architecture-boundaries.md`。 |
| W2 | Completed | 定义 API、SSE 和 error contracts | R2, R7, R8 | W1 | `packages/contracts` 现在提供 shared request/response types、SSE event unions 和 error model helpers，供 web 与 daemon 消费。 |
| W3 | Partial | 将 project-owned code 迁移到 TypeScript | R1 | W2 for highest-value shared types | Daemon source 和 tests 已移除大多数 `@ts-nocheck` suppressions。为避免阻塞 parallel PRs，高冲突 daemon core files 延后到 follow-up：`apps/daemon/src/server.ts`、`apps/daemon/src/agents.ts`、`apps/daemon/src/projects.ts`、`apps/daemon/src/runs.ts` 和 `apps/daemon/src/cli.ts`。剩余工作是迁移这些文件、恢复完整 daemon typecheck coverage，并重新运行 `pnpm --filter @open-design/daemon typecheck`、`pnpm typecheck` 和 `pnpm guard`。 |
| W4 | Planned | 在 daemon boundaries 添加 runtime validation | R3, R4 | W2 | HTTP requests、paths、agents、models、uploads、task IDs 和 command args 的 schemas。 |
| W5 | Planned | Modularize `server.ts` | R6 | W2, W3, W4 | Thin route handlers 加 agents、DB、FS、streams 和 artifacts 的 services/adapters。 |
| W6 | Partial | 引入 agent process/task manager | R5, R8, R11 | W2, W5 | `apps/daemon/src/runs.ts` 现在提供 in-memory chat run service，包含 run states、event replay、SSE streaming、cancellation、waiting、terminal cleanup 和 exit metadata；critique 也有用于 interrupts 的 in-process run registry。剩余工作是统一 agent process manager，带显式 concurrency limits、更强 timeout/cleanup policy，以及跨 agent surfaces 的一致 lifecycle ownership。 |
| W7 | Planned | 强化 SQLite migrations | R9 | W5 或清晰 DB adapter boundary | Migration table、ordered migrations、startup checks、backup strategy、migration tests。 |
| W8 | Partial | 构建 daemon test pyramid | R10 | W2, W4, W5 | Daemon 现在在 `apps/daemon/tests/` 下有较广 Vitest coverage，包括 route、agent、DB、SSE、critique、live-artifact、connector、config 和 filesystem behavior。剩余工作是让层次显式化：shared contract tests、route integration suites、service unit tests、migration tests、canonical SSE protocol tests 和 mocked agent-process lifecycle tests。 |
| W9 | Planned | 添加 structured logs 和 observability | R11 | W2, W6 | Correlated request/task logs、sanitized agent output、durations、exit status 和 diagnostic context。 |
| W10 | Partial | Harden config、port 和 readiness behavior | R12 | W1 | Daemon 暴露 `GET /api/health`，包含基本 `{ ok, version }` health data。剩余工作是 centralized config resolution、更丰富 readiness checks、deterministic port behavior 和 UI-visible daemon-not-ready handling。 |
| W11 | Partial | Harden cross-platform behavior | R13 | W4, W6, W5 | 已有部分 process 与 path hardening，包括 shared platform command invocation 和 agent CLIs 的 Windows command-line budget checks。剩余工作是 formalize platform-specific process handling、path normalization rules 和 supported-platform CI coverage。 |
| W12 | Planned | 重新评估 HTTP framework choice | R14 | W2, W3, W4, W5, W8 | 基于证据决策 Express 是否仍合适，或 Fastify 是否提供明确净收益。 |
| W13 | Partial | 完成 operational documentation | R16 | W1 through W11 as sections stabilize | Boundary 与 ownership documentation 已存在于 `AGENTS.md`、`apps/AGENTS.md`、`packages/AGENTS.md` 和 `specs/current/architecture-boundaries.md`。剩余工作是 current-state daemon docs、API/SSE lifecycle docs、runbooks、troubleshooting guides 和 recovery procedures。 |

## 推荐执行顺序

```text
Phase 1: W1 -> W2 -> W3 -> W4
Phase 2: W5 -> W6 -> W7 -> W8
Phase 3: W9 -> W10 -> W11 -> W13
Phase 4: W12
```

核心原则是先降低风险，再改变 framework foundations：先建立 contracts、types、validation 和 module boundaries；然后再评估 Express 是否仍是合适的 transport layer。
