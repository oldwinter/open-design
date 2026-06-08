# tools/AGENTS.md

先遵循根目录 `AGENTS.md`。本文件只记录 `tools/` 的 module-level boundaries。

## Active tools

- `tools/dev` 提供 `@open-design/tools-dev` 和 `tools-dev` bin。它是当前唯一 active 的本地 development lifecycle control plane。
- `pnpm tools-dev` 管理 daemon -> web -> desktop。
- `pnpm tools-dev run web` 为 Playwright webServer flow 运行 foreground daemon + web。
- `pnpm tools-dev inspect desktop ...` 通过 sidecar IPC 检查 desktop runtime。
- `tools/pack` 提供 `@open-design/tools-pack` 和 `tools-pack` bin。Active slice 包括 packaged artifact build/install/start/stop/logs/uninstall/cleanup/list/reset，mac 和 Windows lanes 的 beta release artifact preparation，以及带可选 containerized builds 的 Linux AppImage lane。
- `tools/serve` 提供 `@open-design/tools-serve` 和 `tools-serve` bin。它拥有本地 fixture services，例如 `tools-serve start updater`。

## Retired tools

- `tools/pr` / `@open-design/tools-pr` / `pnpm tools-pr` 已从本仓库退役。Maintainer PR-duty workflows 现在位于 product workspace 外部的 `PerishCode/duty`；没有新的明确 maintainer decision，不要恢复 Open Design-local PR-duty tool。

## Packaging scope

- 让 `tools-pack` 专注于 packaging/runtime control 和 release artifact preparation。Runtime updater product integration 仍属于后续 phase。
- Pack-specific Electron builder resources 属于 `tools/pack/resources/`；不要从 pack logic 直接引用 app/docs/download assets。
- Namespace 控制 packaged data/log/runtime/cache paths。Ports 是临时 transport details，不得参与 path decisions。
- 没有 root `pnpm build` aggregate。Source packages 使用 package-scoped builds；packaged artifact build/install/release flows 使用 `pnpm tools-pack ...`。

## Orchestration boundary

- Tool tests 位于每个 tool 的 `tests/` 目录，与 `src/` 同级；保持 `src/` 只放 source，不要在 `src/` 下添加新的 `*.test.ts` 或 `*.test.tsx`。
- Orchestration layers 必须消费来自 `@open-design/sidecar-proto`、`@open-design/sidecar` 和 `@open-design/platform` 的 primitives。
- 不要在 `tools/dev`、未来的 `tools/pack` 或 packaged launchers 中手工构建 `--od-stamp-*` args、process-scan regexes、runtime tokens、process roles，或重复 namespace/source args。
- Port flags 是 authoritative inputs：`--daemon-port` 和 `--web-port`。内部 env vars 是 `OD_PORT` 和 `OD_WEB_PORT`；不要引入 `NEXT_PORT`。

## Common tools commands

```bash
pnpm --filter @open-design/tools-dev typecheck
pnpm --filter @open-design/tools-dev build
pnpm --filter @open-design/tools-pack typecheck
pnpm --filter @open-design/tools-pack build
pnpm --filter @open-design/tools-serve typecheck
pnpm --filter @open-design/tools-serve build
pnpm tools-dev status --json
pnpm tools-dev logs --json
pnpm tools-dev check
pnpm tools-pack mac build --to all
pnpm tools-pack mac install
pnpm tools-pack mac cleanup
pnpm tools-pack win build --to nsis
pnpm tools-pack win install
pnpm tools-pack win inspect --expr "document.title"
pnpm tools-pack win cleanup
pnpm tools-pack linux build --to appimage
pnpm tools-pack linux install
pnpm tools-pack linux install --headless
pnpm tools-pack linux start --headless
pnpm tools-pack linux stop --headless
pnpm tools-pack linux build --containerized
pnpm tools-serve start updater
```
