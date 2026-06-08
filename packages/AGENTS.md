# packages/AGENTS.md

先遵循根目录 `AGENTS.md`。本文件只记录 `packages/` 的 module-level boundaries。

## Package responsibilities

- `packages/contracts`: web/daemon app contract layer。保持 pure TypeScript；它不得依赖 Next.js、Express、Node filesystem/process APIs、browser APIs、SQLite、daemon internals 或 sidecar control-plane protocol。
- `packages/components`: 共享 React UI primitives 和 primitive CSS。它只能依赖 React types/runtime；product workflows 和 app-specific layout/styling 保留在 apps 中。
- `packages/host`: web/desktop host bridge contract。它建模 renderer-facing host capabilities 和 helpers，同时让 `window.__od__` access 不进入 app UI code。
- `packages/metatool`: repo-local tool build outputs 的内部 metadata helpers。将可复用 hash/check/write mechanics 保持在这里；每个具体 tool 拥有自己的 `meta.json`。
- `packages/sidecar-proto`: Open Design sidecar business protocol。拥有 app/mode/source constants、namespace validation、stamp descriptor/fields/flags、IPC message schema、status shapes、error semantics 和 default product path constants。
- `packages/sidecar`: generic sidecar runtime primitives。包括 bootstrap、IPC transport、path/runtime resolution、launch env 和 JSON runtime file helpers；它不得 hard-code Open Design app keys 或 IPC business messages。
- `packages/platform`: generic OS process primitives。包括 stamp serialization、command parsing、process matching/search 和 well-known user-toolchain bin discovery；它必须消费 `sidecar-proto` descriptor，且不得 hard-code `--od-stamp-*` details。Toolchain helper 是 daemon agent resolver（`apps/daemon/src/agents.ts`）和 packaged sidecar PATH builder（`apps/packaged/src/sidecars.ts`）共享的 single source of truth，避免两层 search list 漂移。

## Removed directories

- `packages/shared` 已移除；不要恢复它。
- 对新的 shared types，先选择 boundary：web/daemon app DTOs 放在 `contracts`；sidecar control-plane protocol 放在 `sidecar-proto`；generic runtime code 放在 `sidecar`；generic OS/process code 放在 `platform`。

## Boundary checklist

- Package tests 位于每个 package 的 `tests/` 目录，与 `src/` 同级；保持 `src/` 只放 source，不要在 `src/` 下添加新的 `*.test.ts` 或 `*.test.tsx` files。
- 不要过早把 runtime validation/schema enforcement 移到 `contracts`；当前 contracts 只定义 typed target shape。
- 不要让 app packages 直接依赖 sidecar control-plane details。
- 不要在 `sidecar` 或 `platform` 中 hard-code Open Design app/source/mode constants。
- Stamp fields 限定为五个：`app`、`mode`、`namespace`、`ipc` 和 `source`。

## Common package commands

```bash
pnpm --filter @open-design/contracts typecheck
pnpm --filter @open-design/host typecheck
pnpm --filter @open-design/host test
pnpm --filter @open-design/metatool typecheck
pnpm --filter @open-design/metatool test
pnpm --filter @open-design/sidecar-proto typecheck
pnpm --filter @open-design/sidecar-proto test
pnpm --filter @open-design/sidecar typecheck
pnpm --filter @open-design/sidecar test
pnpm --filter @open-design/platform typecheck
pnpm --filter @open-design/platform test
```
