# apps/daemon/AGENTS.md

先遵循根目录 `AGENTS.md` 和 `apps/AGENTS.md`。本文件记录 daemon 专属的代码组织和编辑规则。

## 角色

`apps/daemon` 是本地 Express + SQLite daemon，负责：

- `/api/*` HTTP routes 和 SSE streams。
- `src/cli.ts` 中的 `od` CLI entrypoint。
- Project persistence、generated files、artifacts、media、skills、design systems、plugins、MCP、connector credentials、automation state、agent spawning 和 static serving。
- `sidecar/` 下的 daemon sidecar entry。

Daemon 不是 web app 的 shared library。不要从 `apps/web` import daemon 私有 `src/` modules；web/daemon 共享 contracts 属于 `packages/contracts`。

## Source Layout（源码布局）

- `src/server.ts` 是 composition root：创建 process-wide services、构建 dependency objects、安装 middleware，并注册 route modules。除非 route 真正属于 bootstrap-wide，否则不要把 request/domain logic 放进 `server.ts`。
- `src/cli.ts` 是 CLI composition root：解析 top-level commands、dispatch subcommands，并格式化 process output。实质性的 command implementation 应放在 domain modules 或聚焦的 `*-cli.ts` helpers 中。
- `src/server-context.ts`、`src/route-context-contract.ts`、`src/route-registration-guard.ts`，以及小型 root constants/startup helpers 可以保留在顶层，因为它们描述 daemon-wide wiring。
- `src/routes/` 包含从 `server.ts` 拆出的 domain route registrars。新的 daemon domain endpoints 通常应落在这里。
- 仍位于 `src/*-routes.ts` 的 legacy route files 可以保留到被触碰为止。对其中某个文件做 meaningful changes 时，如果移动很小且机械上安全，优先把它移到 `src/routes/<domain>.ts`。
- `src/http/` 拥有 shared HTTP helpers、error/result adapters、origin checks 和 route mounting utilities。
- `src/services/` 拥有不绑定到 Express request/response objects 的 reusable daemon services。
- `src/runtimes/` 拥有 agent runtime definitions、spawning、parser integration、executable discovery 和 runtime environment shaping。Agent argument definitions 属于 `src/runtimes/defs/`。
- `src/prompts/` 拥有 daemon-side prompt construction。当同一文本暴露到 daemon 外部时，保持 `packages/contracts/src/prompts/` 中镜像的 BYOK/API wording 同步。
- `src/plugins/`、`src/connectors/`、`src/registry/`、`src/research/`、`src/media-adapters/`、`src/live-artifacts/`、`src/storage/` 和 `src/critique/` 拥有各自命名的 domains。创建新的 top-level folder 前，优先把代码加到现有 domain folder 内。
- `tests/` 包含 daemon tests。有帮助时，让 test paths 大致平行于 `src/`。

不要编辑 generated `dist/` output。

## 顶层 `src/` Hygiene

不要继续把无关文件直接加到 `src/` 下。顶层目前已经拥挤，因此新代码和被触碰的 legacy files 遵循这些规则：

- 新的 domain code 属于 domain folder，而不是 `src/<feature>.ts`；除非它是 daemon-wide primitive。
- 新的 route code 属于 `src/routes/` 或现有 route subfolder，例如 `src/routes/plugins/`。
- 新的 runtime 或 stream-parser code 属于 `src/runtimes/`，runtime definitions 放在 `src/runtimes/defs/`。
- 新的 provider/integration client code：如果已有对应 domain folder，就放在那里；否则 provider-specific glue 放在 `src/integrations/<provider>.ts`。
- 新的 persistence/storage abstractions 属于 `src/storage/`，除非它们与 `src/db.ts` 中的 legacy SQLite facade 紧密耦合。
- 新的 prompt construction 属于 `src/prompts/`。
- 新的 plugin、connector、registry、research、media adapter、live-artifact、critique、metrics、logging、QA 或 GenUI code 属于匹配的现有 folder。
- 避免新增 general-purpose helpers。如果 helper 有真实 owner，就放到 owner 所在处。如果它是 daemon-wide infrastructure，使用聚焦 folder，例如 `src/http/`、`src/services/`、`src/storage/` 或 `src/runtimes/`，而不是再创建一个顶层 utility file。

触碰 legacy top-level file 时：

- 当 imports 直接且 change 已经围绕该 domain 时，优先做一个小而安全的移动，把文件移入现有 domain folder。
- 不要把大范围 mechanical move 与 behavior changes 混在一起，除非该移动是理解 behavior change 的必要条件。
- 如果拆分文件，尽可能保持 call sites 处的 public function names 稳定，并把 tests 随其覆盖的 behavior 一起移动。
- 只有在能显著减少 churn 时才使用临时 root-level compatibility exports；如果 diff 仍然小，在同一个 PR 中移除它们。

常见 legacy top-level families 的建议 ownership：

- `project-routes.ts`、`import-export-routes.ts`、`mcp-routes.ts` -> `src/routes/`。（已经拆出的 route modules，例如 `routes/chat.ts`、`routes/terminal.ts` 和 `routes/social-share.ts` 已完成；不要在这里列出。）
- `copilot-stream.ts`、`acp.ts`、`agents.ts`、`run-*`、`agent-*`、`*-diagnostics.ts` -> 通常是 `src/runtimes/` 或未来的 `src/runs/` folder，取决于 ownership。（`claude-stream.ts`、`qoder-stream.ts`、`json-event-stream.ts` 和 `runs.ts` 已经位于 `src/runtimes/`。）
- `design-systems-cli-help.ts`、`tools-design-systems-cli.ts`、`claude-design-import.ts` 在仅由 design systems 使用时 -> `src/design-systems/`。（Core design-system modules、design tokens、`swift-colors.ts` 和 `frontmatter.ts` 已在 `src/design-systems/` 下。）
- `inline-assets.ts`、`lint-artifact.ts`、`pdf-export.ts`、`document-preview.ts`、`static-spa.ts` -> `src/artifacts/` 或现有 artifact owner。（`artifact-*` family 已经移到 `src/artifacts/`。）
- `memory*.ts`、`orbit*.ts`、`automation-*.ts`、`routines.ts`、`prompt-*`、`handoff-*`、`finalize-design.ts` -> 与其 domain 保持在一起；当触碰多个相关文件时再引入 folders。

`media-*` family 已经移入 `src/media/`；顶层不再保留 media modules。

这些是 migration targets，不是允许做大型 cleanup PR。只移动能帮助当前 change 或移除 active ambiguity 的内容。

## Route Structure（路由结构）

Route modules 应遵循这个形状：

```ts
import type { Express } from 'express';
import type { RouteDeps } from '../server-context.js';

export interface RegisterExampleRoutesDeps extends RouteDeps<'http' | 'paths'> {
  example: ExampleService;
}

export function registerExampleRoutes(app: Express, ctx: RegisterExampleRoutesDeps): void {
  // app.get/post/patch/delete(...)
}
```

Guidelines（指导原则）：

- 每个 domain 保持一个 exported registrar，除非现有文件已经有一组小而紧密相关的 registrars。
- 声明窄的 `Register*RoutesDeps` type。只选择 route 使用的 `ServerContext` keys，并为 domain-specific dependencies 添加 explicit service interfaces。
- 当 registrar dependency type 应被 server context assertion 覆盖时，把它添加到 `src/route-context-contract.ts`。
- 从 `src/server.ts` 中匹配的 semantic section 注册 route。
- 适用时使用 `src/http/` 中的现有 route helpers。如果已有 contract，不要发明另一个 error envelope。
- 把 parsing/validation 保持在 route boundary 附近，并把 reusable behavior 推入 named helpers 或 services。
- 除非是 health/version 这类 bootstrap-wide process metadata，不要把新 route handlers 直接加到 `server.ts`。

## Dependency Boundaries（依赖边界）

- `src/server-context.ts` 是 route dependency map。如果某个 route 需要新的 cross-route dependency，要有意地加到这里，并保持其 type 狭窄。
- 在 route files 中优先使用 explicit domain service interfaces，而不是 `any` 或 `unknown`。
- 使用 implementation module 或 `packages/contracts` 中的 types，不要手写重复 response shapes。
- 保持 `packages/contracts` 纯净。不要把 daemon-only Node、SQLite、Express、filesystem 或 process types 移到 contracts 中。
- Daemon data paths 必须遵循根目录 **Daemon data directory contract**。所有 daemon-owned data 都应经由 `RUNTIME_DATA_DIR` 或其派生 constants 路由。

## CLI and Surface Parity（CLI 与 Surface 对齐）

User-facing capabilities 必须同时可通过以下 surface 访问：

- daemon 中的 Web/API routes。
- `src/cli.ts` 中的 `od` CLI subcommands。

添加 user-facing capability 时，在一个 change 中闭环：contract type、daemon route、适用时的 web surface，以及 CLI command；长 prompt 相关场景需支持 `--json` 加 `--prompt-file <path|->`。

## Runtime and Agent Changes（Runtime 与 Agent 变更）

- Parser changes 属于匹配的 runtime stream helper 旁边，并应包含 focused parser tests。
- Runtime definition changes 属于 `src/runtimes/defs/`。
- 对 agent-stream/parser changes，实际可行时 replay `mocks/` 中的 mock CLI trace，而不是消耗 provider budget。
- 保留 `src/runtimes/claude-stream.ts` 和 `src/server.ts` 中的 Claude stream-json bookkeeping；不要在 `tool_use` stop reasons 时关闭 stdin。

## Tests

- Tests 属于 `apps/daemon/tests/`，不属于 `src/`。
- 使用能观察行为的最低成本层级：pure helper test、带 `startServer` 的 route-level Vitest，然后只在必要时使用更宽的 integration。
- 对 bug fixes，优先写一个修复前失败的 red spec。
- 如果 test 依赖 `better-sqlite3` 等 native modules，在怪罪代码前，先确认 local dependencies 是为 active Node version 构建的。

## Commands

常用 daemon checks：

```bash
pnpm --filter @open-design/daemon typecheck
pnpm --filter @open-design/daemon test
pnpm --filter @open-design/daemon build
```

从 `apps/daemon` 运行 focused tests：

```bash
pnpm exec vitest run -c vitest.config.ts tests/<file>.test.ts
```

做 local runtime validation 时，通过 repo control plane 启动，不要使用 daemon package lifecycle aliases：

```bash
pnpm tools-dev run web --daemon-port <port> --web-port <port>
```

## Review Checklist（审查清单）

交接 daemon changes 前，检查：

- Route logic 位于 route module 中，而不是新嵌入 `server.ts`。
- New route deps 是 explicit 的，并在适当时由 `route-context-contract.ts` 覆盖。
- 当 web 或 CLI 消费 shared DTOs 或 error shapes 时，它们位于 `packages/contracts`。
- CLI parity 已处理，或已明确不适用。
- Daemon data paths 派生自 resolved daemon data root。
- Tests 位于 `tests/` 下，并且已运行相关 checks。
