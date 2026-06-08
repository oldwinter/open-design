# Connector Policy Reference

Live artifacts 可以使用 connector 或 local data，但只能持久化紧凑、面向 preview 的 data 和 provenance。绝不要在 live artifact files 中持久化 credentials 或 raw provider envelopes。

## Connector safety model

Connector tools 按 side effect 和 approval requirement 分类：

- `read` + `auto`：可用于 agent preview 和潜在 refresh。
- `write` + `confirm`：不可 refresh；如果后续暴露，必须获得明确 user confirmation。
- `destructive` + `disabled`：永不可 refresh。
- `unknown` + `confirm` 或 `disabled`：在完成分类前 fail closed。

如果 tool name、scope 或 description 暗示 write/create/update/delete/admin/send/post/manage 行为，除非 daemon catalog 明确证明不是，否则按 write-capable 处理。带 destructive hints 的工具必须禁用 refresh。

## Execution boundaries

- 使用 daemon wrapper commands 或 `/api/tools/connectors/*`；当 daemon connector 存在时，不要从 artifact workflow 直接调用 provider APIs。
- Tool endpoints 需要注入的 `OD_TOOL_TOKEN`；不要发明或传递 `projectId`。
- Agent calls 和 refresh-runner calls 必须共享同一个 daemon connector execution service。
- 在 execution time 重新检查 connector status、allowlists、current scopes、tool safety 和 refresh eligibility。
- 对 connector-backed refresh，已保存的 `connectorId`、`accountLabel`、tool name、input shape 和 approval policy 必须仍与当前 connector state 匹配。

## Connector listing

使用 connector-backed data 前先列出 connectors：

```bash
"$OD_NODE_BIN" "$OD_BIN" tools connectors list --format compact
```

Compact result 包含每个 connector 的 `id`、display metadata、`status`、可选 `accountLabel`，以及可调用 tool summaries（含 `name`、`description`、`safety` 和 `inputSchema`）。用这个输出选择 connector 和 tool；不要猜 tool names。

只执行 status 为 `connected` 的 connectors 中的 tools。Local/public connectors 可能已由 daemon 连接；OAuth-backed connectors 必须先由用户通过 UI 连接，agent 才能执行。

如果用户已经点名 connector 或 app，把它视为预期 data source。例如，“create a Notion live artifact” 的意思是：list connectors，找到 `notion`，如果它是 `connected`，就使用它的 read-only tools，而不是追问 Notion data 来自哪里。只有 matching connector 缺失/未连接、多个 connected matches 同样合理，或用户请求中没有可搜索 topic/page/database clue 时，才 ask follow-up。

对于 Notion，优先按此顺序选择：

1. 使用 `notion.notion_search`，query 从用户请求的 artifact/topic 中简洁提取。
2. 只有当用户提供 database id，或 prior search result 指向具体 database 时，才使用 `notion.notion_fetch_database`。
3. 如果用户只说 “Notion live artifact” 而没有 topic，询问要可视化哪个 Notion page/database/topic，或是否 broadly search。

## Connector execution

创建一个 bounded JSON object input file，使其匹配所选 tool 的 `inputSchema`，然后通过 wrapper 执行：

```bash
"$OD_NODE_BIN" "$OD_BIN" tools connectors execute --connector "$CONNECTOR_ID" --tool "$TOOL_NAME" --input input.json
```

Wrapper 读取 `OD_NODE_BIN`、`OD_BIN`、`OD_DAEMON_URL` 和 `OD_TOOL_TOKEN`，把请求发送到 `/api/tools/connectors/execute`，并打印 compact JSON。成功输出包含 `connectorId`、可选 `accountLabel`、`toolName`、`safety`、`outputSummary`、redacted `output` 和 daemon metadata。失败时，修正 input/schema/connection 问题后重试；不要绕过 connector validation 直接调用 provider。

Execution 是 fail-closed：

- connector 和 tool IDs 必须在 daemon catalog allowlist 中；
- connector 必须仍为 connected 且未 disabled；
- 当前 runtime safety 必须是 `read` + `auto`，agent 才能执行；
- input 必须匹配当前 tool schema；
- run rate limits 和 total call limits 会生效；
- output 在 agent 收到前会被 size-bounded 和 redacted。

只把 execution output 当作 intermediate source。将其规范化为 `data.json` 和 provenance，只保留 preview 需要的字段。

## Read-only refresh rules

Connector-backed live artifact refresh 仅允许用于 refresh time 仍保持 read-only 且 refresh-eligible 的 tools。保存的 refresh source 必须包含 non-sensitive connector metadata 和 permission state，例如：

```json
{
  "type": "connector_tool",
  "toolName": "github.public_repo_summary",
  "input": { "owner": "open-design", "repo": "open-design" },
  "connector": {
    "connectorId": "github_public",
    "accountLabel": "public",
    "toolName": "github.public_repo_summary"
  },
  "outputMapping": {
    "dataPaths": [{ "from": "summary", "to": "repository" }],
    "transform": "metric_summary"
  },
  "refreshPermission": "manual_refresh_granted_for_read_only"
}
```

Refresh 期间，daemon 会重新验证 `connectorId`、`accountLabel`、tool name、已保存 input schema 和 allowlist membership。如果任何内容 drift，refresh 会失败，并且不会改变上一次有效 preview。

绝不要把 write、destructive、unknown、confirmation-required、disabled、unconnected 或 schema-drifted connector tools 标记为 refreshable。

## Persistence rules

只持久化：

- `data.json` 中 preview 需要的紧凑 normalized values；
- `provenance.json` 中的 high-level provenance；
- `sourceJson` 中的 connector references 和 refresh metadata。

绝不持久化：

- OAuth tokens、API keys、cookies、headers、authorization values 或 session material；
- raw provider HTTP bodies、envelopes、payloads 或 full responses；
- 其他名称下的 credential-like values；
- `.live-artifacts/` 下的 connector credentials。

Credential storage 由 daemon 控制，位于 project artifact directories 之外。Artifacts 只能包含 connector IDs 和 non-sensitive account labels。

## Credential handling constraints

- 不要在 artifact workflow 中向用户索要 connector secrets。
- 不要要求用户重新指定一个已经命名且 connected 的 data source；先检查 connector catalog。
- 不要把 OAuth material、API keys、cookies、sessions、HTTP request metadata 或 provider auth state 写入 `artifact.json`、`data.json`、`provenance.json`、tile JSON、snapshots、refresh history 或 `.live-artifacts/`。
- 不要在 connector tool inputs 或 source metadata 中包含 secret-like values。如果 connector 需要 credentials，必须由 daemon-owned connector UI/storage 在 project artifacts 之外处理。
- Safe persisted connector references 仅限 catalog IDs、tool names、non-sensitive account labels、selected normalized output fields 和简洁 provenance notes。
- 如果 connector output 包含未 redacted sensitive 或 envelope-like fields，停止并返回 validation/safety error，而不是存储它。

## Output protection

Connector outputs 在返回给 agents 或进入 artifact files 前，必须 bounded 且 redacted。使用 compact summaries 和 selected fields。如果 redaction 无法证明结果安全，就以 validation error 失败，而不是存储它。
