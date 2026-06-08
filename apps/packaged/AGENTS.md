# apps/packaged

先遵循根 `AGENTS.md` 和 `apps/AGENTS.md`。此 app 只拥有 packaged Electron runtime assembly entry。

## Owns

- Packaged Electron entry glue。
- Packaged config loading。
- 在 desktop main 前启动 daemon/web sidecars 的 runtime startup。
- 指向 internal web runtime 的 `od://` packaged entry routing。

## Does not own

- Product/business logic。
- Web、daemon 或 desktop implementation details。
- Sidecar protocol definitions 或 process stamp semantics。

## Rules

- 消费 `@open-design/sidecar-proto`、`@open-design/sidecar` 和 `@open-design/platform` primitives；不要手写 stamp flags 或 process matching logic。
- 保持 data/log/runtime/cache paths 为 namespace-scoped，并独立于 daemon/web ports。
- 保持 Next.js packaged runtime 归 SSR/web-sidecar 拥有；不要把 Next output 放到 `OD_RESOURCE_ROOT` 下。
- `OD_RESOURCE_ROOT` 只用于 daemon non-Next read-only resources：`skills/`、`design-systems/` 和 `frames/`。
