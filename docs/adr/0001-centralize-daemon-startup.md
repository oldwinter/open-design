# 0001. Centralize daemon startup

## Status

Accepted

## Context

`od` CLI 有两个不同角色：它可以启动 local daemon，也可以作为 `od media generate` 等 commands 的 thin client。Client commands 应该与 already-running daemon 通信，不应 evaluate daemon startup code。

此前，`apps/daemon/src/cli.ts` 静态 import 了 `server.ts`。由于 ES modules 会在 import 时执行 top-level code，client-only commands 也会 evaluate daemon startup globals，包括 daemon data directory resolution。错误的 runtime data directory 可能因此在 CLI 发送 HTTP request 之前就让 media generation 失败。当前 daemon data-path rules 只位于根目录 [`AGENTS.md`](../../AGENTS.md) → **Daemon data directory contract**；本 ADR 不得重述它们。

Daemon sidecar 也会直接启动 server，因此 startup behavior 被拆在 human CLI path 和 sidecar path 两边。

## Decision

引入 shared daemon startup orchestrator，由 human CLI daemon mode 和 daemon sidecar startup 共用。

`server.ts` 仍然是 low-level server construction primitive。Startup orchestrator 拥有 product startup concerns，例如解析 daemon CLI options、调用 `startServer({ returnServer: true })`、shared HTTP shutdown、optional browser opening，以及 CLI daemon mode 的 signal handling。

Client-only CLI commands 不得 import `server.ts`。

## Alternatives considered

- CLI-only lazy import：能修复眼前 media failure，但 daemon startup behavior 仍在 CLI 和 sidecar paths 间重复。
- 保持 sidecar 直接调用 `startServer`：保留旧的 split ownership，让未来 startup changes 更容易不一致地应用。
- 从 `server.ts` 提取所有 server runtime context：这是更强的 boundary，但超出当前 bug 所需；如果以后更多 top-level startup side effects 泄漏，可以再做。

## Consequences

Client commands 只会因自身 client concerns 或 daemon responses 失败，而不会因 daemon startup filesystem checks 失败。CLI 和 sidecar startup 现在共享同一套 server start/stop mechanics，同时 route tests 仍可直接使用 `startServer`。
