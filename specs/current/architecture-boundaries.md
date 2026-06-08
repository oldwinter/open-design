# Architecture Boundaries

## Purpose

本文定义本地 Open Design app 的架构边界。这些边界是架构约束；部分 enforcement 细节可以之后通过相关 roadmap workstreams 实现。

## Product Shape

Open Design 是 local-first 应用。近期的 Electron 版本是在同一套 `apps/web` 与 `apps/daemon` 架构外包一层 shell。

Electron 不引入独立的 privileged application layer。web layer 与 daemon 在 browser 和 Electron 模式下保持相同职责。

## Web Boundary

`apps/web` 拥有 UI、presentation state，以及轻量 BFF/proxy 行为。

`apps/web` 不得直接访问本地 privileged capabilities：

- `.od` state
- SQLite storage
- workspace filesystem reads or writes
- agent CLI processes
- task process lifecycle
- local logs and artifacts

web layer 通过 API DTOs 和 streaming events 与 daemon-owned capabilities 通信。

## Daemon Boundary

`apps/daemon` 是唯一的 local capability server。它拥有 privileged local runtime 行为：

- `.od` state
- SQLite storage, schema, migrations, and storage layout
- workspace filesystem access
- agent CLI invocation
- task lifecycle and process cleanup
- logs, artifacts, and diagnostic state

Daemon capabilities 应隔离在 `db`、`fs`、`agents`、`tasks`、`logs`、`artifacts` 等 internal modules 之后。

## Shared Boundary

Shared code 必须是可同时运行在 web 和 daemon contexts 中的纯 JavaScript 或 TypeScript。

Shared code 可以包含：

- API DTO types
- runtime schemas such as Zod or TypeBox schemas
- domain constants
- task states
- SSE event names
- error codes
- pure helper functions
- path-related logical string helpers

Shared code 不得依赖 framework 或 environment-specific APIs，例如 Next.js、Express、Node filesystem/process APIs、browser-only APIs、SQLite 或 daemon internals。

## API DTO Boundary

web layer 应理解 API DTOs，而不是 daemon implementation details。

API DTOs 应优先使用 workspace-scoped logical paths 或 relative paths。机器绝对路径应保持 daemon-internal。Enforcement 可以之后通过 workspace path resolver 和 runtime validation layer 实现。

SQLite schema names、table structure、migration details 和 storage layout 都是 daemon-private。web layer 只看到用于展示和交互的 API DTOs。

## Workspace Boundary

当前架构可以假设只有一个 active workspace。Workspace root selection 应来自明确的用户选择或明确的 startup parameter。

Daemon filesystem access 应限定在 active workspace root 内。Path normalization 和 root containment checks 应在 daemon path resolver 与 validation layer 中实现。

Workspace enforcement 的精确实现优先级可以延后，但边界方向是固定的：web 不构造 privileged filesystem paths，daemon 拥有 path resolution。

## Agent Command Boundary

用户不能提供让 daemon 执行的 free-form shell commands。

Agent invocations 应使用受控 command templates 和 argument construction。用户提供的内容可以进入 prompts、files 或 configuration fields，但 command structure 必须保持 daemon-controlled。

Plugin 或 custom-agent command extension 不在当前 scope 内。

## Security Baseline

App 是 local-first。Daemon 应只在本地绑定，local API authentication 可以延后。

Daemon output 默认应 redact sensitive values，包括 tokens、API keys、environment secrets 和类似 Authorization 的 headers。

## Task Lifecycle Boundary

Daemon 拥有完整 task lifecycle。web layer 可以通过 API DTOs 和 events 创建、订阅、查询任务，并请求取消任务。

Tasks 属于某个 workspace 和某个 agent。Terminal states 包括：

- `succeeded`
- `failed`
- `cancelled`
- `interrupted`

web layer 请求取消；daemon 决定最终 task state 并拥有 cleanup。详细的 concurrency、timeout、scheduling 和 recovery policies 可以在 process manager workstream 中定义。

## Deferred Policy Details

以下 policy details 可以在后续 workstreams 中定稿：

- multiple workspace support
- workspace registry location
- artifact, cache, and log directory layout
- Electron workspace picker behavior
- task concurrency limits
- timeout defaults
- queueing strategy
- restart recovery behavior
- process-tree cleanup strategy

这些延后选择应保留本文档中的边界。
