---
name: live-artifact
en_name: "Live Artifact"
zh_name: "实时工件"
description: |
  Create refreshable, auditable Open Design artifacts backed by connector or local data.
  Trigger when the user asks for live dashboards, refreshable reports, synced views, or reusable data-backed artifacts.
en_description: |
  Create refreshable, auditable Open Design artifacts backed by connector or local data.
  Trigger when the user asks for live dashboards, refreshable reports, synced views, or reusable data-backed artifacts.
zh_description: |
  创建由连接器或本地数据支撑、可刷新且可审计的 Open Design 工件。
  当用户需要实时仪表盘、可刷新报告、同步视图或可复用的数据支撑型工件时触发。
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

# 实时工件技能

创建一个 Open Design 实时工件：它是项目范围内可预览的 HTML 工件，之后可以刷新数据，而无需重新设计呈现方式。

## 资源地图

```
live-artifact/
├── SKILL.md
└── references/
    ├── artifact-schema.md      ← `references/artifact-schema.md`：工件文件、DTO 结构、模板绑定规则
    ├── connector-policy.md     ← `references/connector-policy.md`：连接器安全、脱敏、凭据边界
    └── refresh-contract.md     ← `references/refresh-contract.md`：来源元数据、刷新执行、快照
```

## 当前状态

本目录中的参考文档是实时工件文件契约的唯一事实来源。注册或更新实时工件时，优先使用 daemon 封装命令，不要直接使用原始 HTTP 请求。

## 何时使用此技能

当用户需要一个由数据支撑、首次渲染后仍能持续使用的视图时，请使用此技能。例如实时仪表盘、可刷新报告、同步状态页、可审计的数据视图，或之后能从本地数据、项目数据或连接器刷新的工件。

创建文件前，先判断用户真正想要的是实时工件还是普通静态工件：

- 当用户提到刷新、同步、定期更新、连接器数据、来源或溯源跟踪、仪表盘、报告或可复用的数据视图时，使用实时工件。
- 当用户只需要一次性的 HTML、模型图、图片或文件，并且不需要刷新、来源元数据或数据与溯源面板时，使用普通静态工件。
- 如果意图不明确，只问一个简短问题：“它需要支持刷新或实时更新，还是只要一个静态工件？”

## 工作流程

1. **确定范围和数据来源，不要因已连接的连接器而阻塞**
   - 明确预览目标、受众、数据时效要求，以及之后是否需要支持刷新。
   - 如果用户明确点名 Notion、GitHub、Slack 或 Google Drive 等连接器或来源，在检查 daemon connector tools 前，不要先问 “where should the data come from?”。
   - 如果可用，优先使用本地或项目来源以及 daemon 连接器工具。
   - 如果已有 daemon 连接器或封装工具，不要直接调用服务提供商的 API。
   - 如果需要连接器数据，先用 `"$OD_NODE_BIN" "$OD_BIN" tools connectors list --format compact` 列出连接器。如果其中存在用户点名的连接器，且其 `status` 为 `"connected"`，请从工具目录中选择合适的只读 `auto` 工具，并通过连接器封装执行。
   - 对 Notion 而言，只要存在 connected `notion` connector，且用户 brief 点名 Notion，就足以用从 artifact/topic 请求派生出的 query 启动 `notion.notion_search`。只有当用户提供了数据库 ID，或搜索结果明确指向某个数据库时，才使用 `notion.notion_fetch_database`。
   - 只有在没有匹配的已连接连接器、多个已连接候选项同样合适，或用户请求中没有可用于搜索的主题或查询时，才询问数据来源。如果必须询问，请具体询问页面、数据库、主题，或是否允许广泛搜索，不要问“Notion 数据源在哪里？”

2. **编写源文件**
   - 将 `template.html` 编写为人工设计的 HTML 模板。Daemon 会按照 `html_template_v1` 绑定契约，用 `data.json` 为模板填充数据。请严格遵守该契约，否则填充会失败，发布的原始模板中还会显示 `{{…}}` 标记：
     - 标量：使用 `{{data.path.to.value}}`。路径以 `data` 开头，以英文句点分隔；可以使用数字数组索引（`{{data.kpis.0.value}}`）。每个绑定都必须解析为单个字符串或数字，不能是对象或数组。
     - 列表：用 `data-od-repeat="item in data.items"` 重复一个元素，再在其中以 `{{item.label}}` 绑定循环范围内的字段；如果是标量数组，则使用 `{{item}}`。仅支持一层循环；循环内部仍可用 `data.*` 访问全局数据。
     - 不要在 `<script>` 中手动编写循环，因为预览会移除脚本；如果没有匹配的 `data-od-repeat` 作用域，也不要引用 `{{metric.value}}` 这样的独立循环变量，否则无法解析该绑定。不支持嵌套循环、条件、过滤器、辅助函数以及原始或三花括号插值。
   - 将 `data.json` 编写为上述绑定使用的规范预览数据，必须使用真实值，不能使用占位符。
   - 在 `artifact.json` 中写入实时工件元数据、预览声明、文档声明和安全的来源描述信息。
   - 在 `provenance.json` 中写入简明的来源说明、时间戳、非敏感连接器引用和转换说明。
   - 不要把 `index.html` 当作源文件编写。Daemon 会从 `template.html` 和 `data.json` 派生 `index.html`。

3. **保持数据精简并面向预览**
   - 只存储预览所需的规范化值。
   - 将大型列表、服务提供商响应或日志写入 `data.json` 前，先进行摘要处理。
   - 遵守 `references/artifact-schema.md` 中对 JSON 大小和结构的限制。

4. **注册前应用安全规则**
   - 绝不能在 `artifact.json`、`data.json`、`provenance.json` 或来源元数据中存储凭据、OAuth 令牌、API 密钥、Cookie、认证请求头、服务提供商原始响应、HTTP 信封、完整载荷或类似机密的字段。
   - 持久化的 JSON 中不得出现禁用键名，例如 `raw`、`rawResponse`、`payload`、`body`、`headers`、`cookie`、`authorization`、`token`、`secret`、`credential` 和 `password`。
   - 只能使用经过转义的 `html_template_v1` 插值，不允许使用原始或未转义的 HTML 插值。

5. **通过 daemon 封装注册或更新**
   - 通过 `"$OD_NODE_BIN" "$OD_BIN"` 使用 Open Design daemon 封装命令，不要直接使用 `curl`、`node` 或 `od`：

     ```bash
     "$OD_NODE_BIN" "$OD_BIN" tools live-artifacts create --input artifact.json
     "$OD_NODE_BIN" "$OD_BIN" tools live-artifacts list --format compact
     "$OD_NODE_BIN" "$OD_BIN" tools live-artifacts update --artifact-id "$ARTIFACT_ID" --input artifact.json
     ```

   - Wrapper 会读取注入的 `OD_NODE_BIN`、`OD_BIN`、`OD_DAEMON_URL` 和 `OD_TOOL_TOKEN`；不要打印、持久化或覆盖令牌值。
   - 不要包含或发明 `projectId`；daemon 会从 token 推导 project/run scope。
   - 只有在用户明确要求开发或调试 daemon 时，才使用原始 HTTP 请求。

6. **通过连接器封装获取连接器数据**
   - 查询可用的连接器和工具：

     ```bash
     "$OD_NODE_BIN" "$OD_BIN" tools connectors list --format compact
     ```

   - 使用 JSON 对象输入文件执行只读连接器工具：

     ```bash
     "$OD_NODE_BIN" "$OD_BIN" tools connectors execute --connector "$CONNECTOR_ID" --tool "$TOOL_NAME" --input input.json
     ```

   - 只持久化预览所需的精简规范化字段，以及非敏感连接器引用（`connectorId`、`toolName`、`accountLabel`）。绝不能持久化连接器凭据、传输元数据或服务提供商的原始输出。
   - 不要询问连接器机密，也不要要求重复配置。如果 `status` 为 `connected`，直接使用列出的工具；如果尚未连接，告知用户在界面中完成连接。
   - 有关工具查询、执行和凭据边界，请参阅 `references/connector-policy.md`；有关只读刷新来源元数据，请参阅 `references/refresh-contract.md`。

7. **简洁报告结果**
   - 成功后，返回工件 ID 和标题，并说明 `index.html` 由 daemon 派生。
   - 验证失败时，修复源文件并通过封装工具重试，不要绕过验证。

## 必需文件

每个实时工件创建流程都必须在注册前生成以下源文件：

- `template.html`：技能声明的输出，也是预览的源模板。
- `data.json`：精简、规范的预览数据。
- `artifact.json`：供 daemon 验证的创建或更新输入。
- `provenance.json`：安全的来源与转换摘要。

`index.html` 是 frontmatter 中声明的主要预览入口，但它是 daemon 派生的输出，而不是由智能体编写的源文件。
