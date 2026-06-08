---
name: live-artifact
description: |
  创建由 connector 或 local data 支撑、可刷新且可审计的 Open Design artifacts。
  当用户要求 live dashboards、refreshable reports、synced views 或 reusable data-backed artifacts 时触发。
triggers:
  - "live artifact"
  - "live dashboard"
  - "refreshable dashboard"
  - "live report"
  - "refreshable report"
  - "synced view"
  - "可刷新"
  - "实时看板"
od:
  mode: prototype
  scenario: live
  preview:
    type: html
    entry: index.html
    reload: debounce-100
  design_system:
    requires: true
  outputs:
    primary: index.html
    secondary:
      - template.html
      - artifact.json
      - data.json
      - provenance.json
  capabilities_required:
    - shell
    - file_write
---

# Live Artifact Skill

创建一个 Open Design live artifact：它是 project-scoped、可 preview 的 HTML artifact，数据之后可以刷新，而不需要重新设计 presentation。

## Resource map

```
live-artifact/
├── SKILL.md
└── references/
    ├── artifact-schema.md      ← `references/artifact-schema.md`: artifact files, DTO shape, template binding rules
    ├── connector-policy.md     ← `references/connector-policy.md`: connector safety, redaction, credential boundaries
    └── refresh-contract.md     ← `references/refresh-contract.md`: source metadata, refresh execution, snapshots
```

## Current status

本目录中的 references 是 live artifact file contract 的 source of truth。注册或更新 live artifacts 时，优先使用 daemon wrapper commands，而不是 raw HTTP。

## When to use this skill

当用户要求一个 data-backed view，并且它在首次 render 之后仍应保持有用时使用本 skill。例如 live dashboard、refreshable report、synced status page、auditable data view，或以后可以从 local/project data 或 connectors 刷新的 artifact。

创建文件前，先判断用户真正想要的是 live artifact 还是普通 static artifact：

- 当用户提到 refresh、sync、recurring updates、connector-backed data、source/provenance tracking、dashboards、reports 或 reusable data-backed views 时，使用 live artifact。
- 当用户只想要一次性的 HTML/mockup/image/file，并且不需要 refresh、source metadata 或 data/provenance panels 时，使用普通 static artifact。
- 如果意图含糊，只问一个简短问题：“Should this be refreshable/live, or just a static artifact?”

## Workflow

1. **在不阻塞 connected connectors 的前提下确定 scope 和 data source**
   - 识别 preview goal、audience、data freshness expectations，以及之后是否需要支持 refresh。
   - 如果用户明确点名 Notion、GitHub、Slack 或 Google Drive 这类 connector/source，在检查 daemon connector tools 前，不要先问 “where should the data come from?”。
   - 优先使用 local/project sources，或可用的 daemon connector tools。
   - 当 daemon connector/wrapper 存在时，不要直接调用 provider APIs。
   - 如果需要 connector data，先用 `"$OD_NODE_BIN" "$OD_BIN" tools connectors list --format compact` 列出 connectors。如果点名 connector 存在且 `status: "connected"`，从它的 catalog 中选择合适的 read-only `auto` tool，并通过 connector wrapper 执行。
   - 对 Notion 来说，只要存在 connected `notion` connector，且用户 brief 点名 Notion，就足以用从 artifact/topic 请求派生出的 query 启动 `notion.notion_search`。只有当用户提供 database id，或 search result 清楚指向某个 database 时，才使用 `notion.notion_fetch_database`。
   - 只有在没有匹配的 connected connector、多个 connected candidates 同样合适，或请求的 artifact 没有可用于搜索的 topic/query 时，才向用户询问 data-source。如果必须询问，要具体：询问 page/database/topic，或询问是否允许 broad search，而不是问 “where is the Notion data source?”

2. **编写 source files**
   - 将 `template.html` 写成人工设计的 HTML template。
   - 将 `data.json` 写成 `{{data.path}}` bindings 使用的 canonical preview data。
   - 写入 `artifact.json`，包含 live artifact metadata、preview declaration、document declaration 和 safe source descriptors。
   - 写入 `provenance.json`，包含简洁的 source notes、timestamps、non-sensitive connector references 和 transformation notes。
   - 不要把 `index.html` 当 source 编写。Daemon 会从 `template.html` 和 `data.json` 派生 `index.html`。

3. **保持 data compact 且面向 preview**
   - 只存储 preview 需要的 normalized values。
   - 在写入 `data.json` 前，先 summarize large lists、provider responses 或 logs。
   - 遵守 `references/artifact-schema.md` 中的 bounded JSON rules。

4. **注册前应用 safety rules**
   - 绝不要把 credentials、OAuth tokens、API keys、cookies、auth headers、raw provider responses、HTTP envelopes、full payloads 或 secret-like fields 存进 `artifact.json`、`data.json`、`provenance.json` 或 source metadata。
   - 避免在 persisted JSON 的任何位置使用 forbidden key names，例如 `raw`、`rawResponse`、`payload`、`body`、`headers`、`cookie`、`authorization`、`token`、`secret`、`credential` 和 `password`。
   - 只能使用 escaped `html_template_v1` interpolation。不允许 raw/unescaped HTML interpolation。

5. **通过 daemon wrappers 注册或更新**
   - 使用 `"$OD_NODE_BIN" "$OD_BIN"` 调用 Open Design daemon wrapper commands，而不是 raw `curl`、bare `node` 或 bare `od`：

     ```bash
     "$OD_NODE_BIN" "$OD_BIN" tools live-artifacts create --input artifact.json
     "$OD_NODE_BIN" "$OD_BIN" tools live-artifacts list --format compact
     "$OD_NODE_BIN" "$OD_BIN" tools live-artifacts update --artifact-id "$ARTIFACT_ID" --input artifact.json
     ```

   - Wrapper 会读取注入的 `OD_NODE_BIN`、`OD_BIN`、`OD_DAEMON_URL` 和 `OD_TOOL_TOKEN`；不要 print、persist 或 override token values。
   - 不要包含或发明 `projectId`；daemon 会从 token 推导 project/run scope。
   - 只有在用户明确要求 daemon development/debugging 时，才使用 raw HTTP。

6. **使用 connector wrappers 获取 connector data**
   - Discover 可用的 connectors 和 tools：

     ```bash
     "$OD_NODE_BIN" "$OD_BIN" tools connectors list --format compact
     ```

   - 用 JSON object input file 执行 read-only connector tool：

     ```bash
     "$OD_NODE_BIN" "$OD_BIN" tools connectors execute --connector "$CONNECTOR_ID" --tool "$TOOL_NAME" --input input.json
     ```

   - 只持久化 preview 需要的 compact normalized fields，以及 non-sensitive connector references（`connectorId`、`toolName`、`accountLabel`）。绝不要持久化 connector credentials、transport metadata 或 raw provider output。
   - 不要询问 connector secrets，也不要重复 setup。如果 `status` 是 `connected`，就使用列出的 tools；如果未 connected，告诉用户在 UI 中连接它。
   - Listing/execution 与 credential boundaries 见 `references/connector-policy.md`；read-only refresh source metadata 见 `references/refresh-contract.md`。

7. **报告简洁结果**
   - 成功时，返回 artifact ID/title，并说明 `index.html` 是 daemon-derived。
   - Validation failure 时，修复 source files，然后通过 wrapper 重试。不要绕过 validation。

## Required files

每个 live artifact creation flow 在注册前都必须生成这些 source files：

- `template.html` — 声明的 skill output，也是 preview 的 source template。
- `data.json` — compact、canonical preview data。
- `artifact.json` — daemon validation 的 create/update input。
- `provenance.json` — safe source 与 transformation summary。

`index.html` 是 frontmatter 中声明的 primary preview entry，但它是 derived daemon output，而不是 agent-authored source。
