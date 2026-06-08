# Plugin Directory Guide

此目录拥有 Open Design plugin content 和 plugin authoring material。

## Boundaries

- `plugins/_official/` 包含 bundled first-party plugins。daemon boot walker 只扫描这个 subtree，并把它注册为 `source_kind='bundled'`。
- `plugins/spec/` 是 portable plugin specification 和 authoring kit。它是 documentation、starter material，以及 contributors 和 external agents 使用的 example source；不得把它当作已安装的 first-party catalog。
- 保持 runnable plugin examples 可移植：每个 example 都应有 `SKILL.md`；只有作为 OD sidecar 时才添加 `open-design.json`。
- 保持 `SKILL.md` body 不含 OD-only marketplace metadata。把 OD display、inputs、preview、pipeline、capabilities 和 source information 放进 `open-design.json`。
- 不要从 plugin content import app-private code。Plugin 可以通过 manifest 引用 OD atoms、design systems、craft docs、assets、scripts、MCP servers 或 connectors。

## Authoring Rules

- 新 spec examples 属于 `plugins/spec/examples/<plugin-id>/`。
- 只有当 product 应在 daemon startup 时 auto-register plugin，新的 first-party bundled plugins 才属于 `plugins/_official/<tier>/<plugin-id>/`。
- 使用 `docs/schemas/open-design.plugin.v1.json` 中的 v1 JSON schema。
- 面向贡献者的 spec docs 是双语的。编辑 `plugins/spec/` 下的 `README.md`、`SPEC.md`、`CONTRIBUTING.md`、`AGENT-DEVELOPMENT.md` 或 example README files 时，同步更新对应的 `*.zh-CN.md` mirror。
- Project-owned scripts 优先使用 TypeScript。除非是 generated、vendored，或被 `scripts/guard.ts` 明确 allowlist，否则避免新增 `.js`、`.mjs` 或 `.cjs` 文件。
- 保持 example plugins 简洁且 agent-readable。把长 reference material 移到 `references/`，并告诉 agent 何时加载它。

## Validation

Plugin content changes 后运行：

```bash
pnpm guard
pnpm --filter @open-design/plugin-runtime typecheck
```

当 daemon CLI 已 build 且可用时，还要用以下命令验证 runnable plugin folders：

```bash
od plugin validate ./plugins/spec/examples/<plugin-id>
```
