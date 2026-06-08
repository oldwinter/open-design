# tools/serve

先遵循根 `AGENTS.md` 和 `tools/AGENTS.md`。此 tool 拥有小型 local-development service entrypoints。

## Owns

- `tools-serve` CLI。
- 用于 desktop update IPC 和 packaged-runtime debugging 的 local static updater fixtures。

## Rules

- 保持 services self-contained 且 local-first。
- 不要把 product update runtime logic 放在这里；此 tool 只服务 deterministic fixtures。
- 新 services 应使用 `tools-serve start <service>` 下的显式 subcommands。
