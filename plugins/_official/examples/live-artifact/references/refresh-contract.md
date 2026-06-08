# Refresh Contract Reference

Refresh 会更新 live artifact data，而不重新设计 presentation。Refresh runner 会更新 `data.json`、provenance 和 audit history；它不允许任意重写 template。

## Refreshable source metadata

Refreshable documents 使用 `sourceJson`：

```json
{
  "type": "connector_tool",
  "toolName": "list_releases",
  "input": {},
  "connector": {
    "connectorId": "github",
    "accountLabel": "example/org",
    "toolName": "list_releases"
  },
  "outputMapping": {
    "dataPaths": [{ "from": "items", "to": "releases" }],
    "transform": "compact_table"
  },
  "refreshPermission": "manual_refresh_granted_for_read_only"
}
```

Supported source types:

- `local_file`
- `daemon_tool`
- `connector_tool`

Supported output transforms:

- `identity`
- `compact_table`
- `metric_summary`

## Source execution model

- `refreshPermission` 为兼容旧 artifacts 而保留，但 refresh runner 不需要单独的 connector approval step。
- 如果存在 safe source descriptor，manual refresh 会通过 daemon-owned local 或 connector wrappers 执行它。
- 不应把 write、destructive、unknown、disabled、unconnected 或 schema-drifted connector tools 编写为 refresh sources。

## Connector-backed refresh

Connector-backed refresh sources 使用与 agent-initiated connector calls 相同的 connector execution service。不要在 refresh logic 或 skill-authored scripts 中直接调用 provider APIs。

创建 connector-backed refresh source 前：

1. 用 `"$OD_NODE_BIN" "$OD_BIN" tools connectors list --format compact` 列出 connectors。
2. 如果用户点名了某个 connector/source 且它已 connected，直接选择该 connector，而不是询问 source 在哪里。然后选择一个 safety 为 `read` + `auto`，且 catalog metadata 标记为 refresh-eligible 的 tool。
3. 用 `"$OD_NODE_BIN" "$OD_BIN" tools connectors execute --connector <id> --tool <name> --input input.json` 执行一次，生成 compact normalized preview data。
4. 只在 `sourceJson` 中存储 non-sensitive connector references、bounded input object、output mapping 和兼容用 `refreshPermission`。

每次 refresh 时，daemon 必须重新检查 connector status、account label、allowlist membership、input schema 和 output protection。如果任何检查失败，或 output protection 拒绝结果，refresh 必须 all-or-nothing 失败，并保留上一个 valid preview。

Persisted connector refresh metadata 可以包含 `connectorId`、`toolName`、non-sensitive `accountLabel`、bounded `input`、`outputMapping` 和兼容用 `refreshPermission`。它不得包含 credentials、auth/session material、raw provider envelopes 或 unbounded provider responses。

## Commit behavior

Refresh 是 all-or-nothing：

1. 每个 artifact 获取一个 active refresh lock。
2. 使用 timeouts 和当前 safety checks 执行每个 refreshable source。
3. 构建 candidate `data.json`、provenance 和 preview。
4. 使用 create/update 相同的 schemas 验证所有 candidates。
5. 只有当每个 refreshable source 都成功时才 commit。
6. 如果任何步骤失败，保留上一个 valid preview。

Refresh IDs 必须 monotonic，避免 stale runs 覆盖较新的 committed data。

## Audit storage

- 将 compact records 追加到 `refreshes.jsonl`。
- Successful refresh snapshots 位于 `snapshots/<refreshId>/` 下，可以包含 `data.json` 和 provenance。
- Failed refreshes 会汇总进 `refreshes.jsonl`，不得泄漏 raw provider output 或 credentials。
- Daemon startup 时，应将 stale running refreshes 标记为 failed 或 timed out，同时保留最后一个 valid preview。
