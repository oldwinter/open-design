# tools/serve

先遵循根 `AGENTS.md` 和 `tools/AGENTS.md`。此 tool 拥有小型 local-development service entrypoints。

## Owns

- `tools-serve` CLI。
- 用于 desktop update IPC 和 packaged-runtime debugging 的 local static updater fixtures。
- `collab-cloud` fixture —— 一个自包含、内存中的 C-lane 跨 daemon 协作 hub 替代实现（comment sync + member directory；见下文）。

## Rules

- 保持 services self-contained 且 local-first。
- 不要把 product update runtime logic 放在这里；此 tool 只服务 deterministic fixtures。
- 新 services 应使用 `tools-serve start <service>` 下的显式 subcommands。

## collab-cloud fixture（临时）

一个无需基础设施、内存中的本地后端，用于 C-lane 跨 daemon 协作 hub（spec §D4）。它承载 daemon 让共享项目在成员机器之间协作所需的两样东西：每个项目 APPEND-ONLY 的 comment stream（带单调递增的 `seq` cursor）和轻量 member directory（`memberId → {displayName, role}`），以便客户端渲染作者姓名与角色。它是 relay 而非 validator——comments 以不透明方式存储，只有 `seq` 归 hub 所有；没有 edit/delete 传播，也没有 presence。

运行它，然后把两个 daemon 都指向它（相同的 URL + token）：

```
pnpm tools-serve start collab-cloud            # defaults to :18096
# then, for each daemon:
export OD_COLLAB_CLOUD_URL=http://127.0.0.1:18096
export OD_COLLAB_CLOUD_TOKEN=dev-internal-token
```

- **Bearer auth**：每个请求都必须携带 `Authorization: Bearer <token>`；缺失或不匹配 → 401。token 是本地 stub principal；真实 hub 会校验 B 的签名 token（§D4.4）。Teams 通过 `:teamId` path 隔离。
- **Endpoints**：`PUT /teams/:teamId/members/:memberId`（upsert directory entry）、`GET /teams/:teamId/members`、`POST /teams/:teamId/projects/:projectId/comments`（append，返回 `{seq}`，按 comment id 幂等）、`GET /teams/:teamId/projects/:projectId/comments?sinceSeq=N`（增量拉取，ETag/`If-None-Match` → 304）。
- **这是可丢弃的。** 一旦 vela `services/collab` 上线，删除 `src/collab-cloud-fixture.ts`（以及 `src/index.ts` 中的 wiring），并把 `OD_COLLAB_CLOUD_URL` 指向真实服务。daemon 无需任何代码变更。`tests/collab-cloud-fixture.test.ts` 锁定 fixture 侧的一半契约。
