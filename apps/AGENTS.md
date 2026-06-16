# apps/AGENTS.md

先遵循根目录 `AGENTS.md`。本文件只记录 `apps/` 的 module-level boundaries。

## Active apps

- `apps/web`: Next.js 16 App Router + React 18 web runtime。Entrypoints 位于 `apps/web/app/`；main client shell 是 `apps/web/src/App.tsx`。本地 `tools-dev` web runs 期间，`apps/web/next.config.ts` 会将 `/api/*`、`/artifacts/*` 和 `/frames/*` rewrite 到 `OD_PORT`。
- `apps/daemon`: Express + SQLite local daemon 和 `od` bin。它拥有 REST/SSE APIs、agent CLI spawning、skills、design systems、artifact persistence、static serving，以及 daemon-managed data。描述或修改 daemon data paths 前，先阅读根目录 `AGENTS.md` 的 **Daemon data directory contract** section；这是强制要求，且不要在这里重述。
- `apps/desktop`: Electron shell。Desktop 不猜测 web port；它通过 sidecar IPC 读取 runtime status，并打开报告的 web URL。
- `apps/packaged`: 薄 packaged Electron runtime entry。它启动 packaged daemon/web sidecars，注册 `od://` entry protocol，并将 desktop host behavior 委托给 `apps/desktop`。

## Daemon layout

- `apps/daemon/src/` 只包含 daemon app source。
- `apps/daemon/tests/` 包含 daemon tests。
- `apps/daemon/sidecar/` 包含 daemon sidecar entry。
- CLI/agent argument definition changes 属于 `apps/daemon/src/runtimes/defs/`；stdout parser changes 属于对应 runtime helpers 和 parser tests。

### Router layout

- 现有 daemon domain endpoints 属于匹配的 daemon route file；除非 route 是 bootstrap-wide 或没有明确 domain owner，否则避免直接向 `apps/daemon/src/server.ts` 添加 route handlers。
- New route registrars 应接入 `server.ts` 中匹配的 semantic section；保持 sections 宽泛，并在添加新 section 前复用现有 sections。
- Bootstrap-wide routes 描述每个 domain 共享的 daemon availability 或 startup metadata。`/api/health` 和 `/api/version` 保留在 `server.ts`，因为它们只报告 process-level status。
- Domain routes 描述 product capability 或 data model。`/api/active` 属于 `apps/daemon/src/routes/active-context.ts`，因为 transient UI focus 是自己的 domain；chat routes 拥有 persistent conversation 和 run state。
- 当 endpoints 共享同一个 domain language 和 dependency set 时，把它们添加到现有 route file。只有 endpoint 引入 distinct domain 或与现有 route modules 几乎没有 dependency overlap 时，才在 `apps/daemon/src/routes/` 下拆出新 module。

## Test layout

- App tests 位于每个 app 的 `tests/` 目录，与 `src/` 同级；有用时保留 `tests/` 内的 source-relative subpaths。
- 保持 app `src/` directories 只放 source；不要在 `src/` 下添加新的 `*.test.ts` 或 `*.test.tsx` files。
- `apps/web/tests/` 包含 web-owned Vitest tests，并使用 `*.test.ts` / `*.test.tsx`。
- Playwright UI automation 属于 `e2e/ui/`；不要在 `apps/web` 下添加 Playwright suites 或 UI automation helper scripts。

## Sidecar awareness

- App business layers 不得导入 sidecar packages，也不得基于 `runtime.mode`、`namespace`、`ipc` 或 `source` 分支。
- 将 sidecar awareness 保留在 `apps/<app>/sidecar` 或 desktop sidecar entry wrapper 中。

## Packaged runtime

- `apps/nextjs` 已移除；不要恢复它。
- Packaged web 通过 web sidecar 使用 Next.js SSR；不要把 Next output 放到 daemon `OD_RESOURCE_ROOT` 下。
- Packaged `OD_RESOURCE_ROOT` 只用于 daemon non-Next read-only resources：`skills/`、`design-systems/` 和 `frames/`。
- Packaged data/log/runtime/cache paths 必须按 namespace scoped，且不得依赖 daemon 或 web ports。
- Daemon↔web packaged traffic 仍使用 HTTP origin/port，因为 Next.js dev server 和 SSR proxy paths 假设 HTTP origins；切换到 Unix sockets 需要 patch Next internals。不变量是 data/log/runtime/cache paths 绝不嵌入 ports。

## Common app commands

```bash
pnpm --filter @open-design/web typecheck
pnpm --filter @open-design/web test
pnpm --filter @open-design/daemon typecheck
pnpm --filter @open-design/daemon test
pnpm --filter @open-design/daemon build
pnpm --filter @open-design/desktop typecheck
pnpm --filter @open-design/desktop build
pnpm --filter @open-design/packaged typecheck
pnpm --filter @open-design/packaged build
```
