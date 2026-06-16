# 通过 Agent Skills 实现 Live Artifacts

**Status:** Draft · 2026-04-29  
**Parent:** [`docs/spec.md`](../../docs/spec.md)  
**Siblings:** [`docs/skills-protocol.md`](../../docs/skills-protocol.md) · [`docs/agent-adapters.md`](../../docs/agent-adapters.md) · [`docs/modes.md`](../../docs/modes.md)  
**Reference implementation:** `~/Projects/monet` connectors + live artifacts

本 spec 定义如何把 Monet 的 **connectors** 和 **live artifacts** 思路带入 Open Design，但 agent-facing surface 采用 **file-based agent skills + daemon-owned local tools** 实现，而不是 in-process tool registry 或 MCP-first integration。

---

## 1. 产品目标

Open Design 应该让 agent 创建可 preview 的 artifacts，而且它们不只是一次性 generated files，而是由外部或本地 data sources 支撑的 **live、refreshable、auditable views**。

示例：

- “Create a live GitHub release dashboard.”
- “Make a Notion project status page and let me refresh it tomorrow.”
- “Turn this folder of JSON files into a polished stakeholder report.”
- “Create a design-system coverage artifact that can be refreshed after code changes.”

用户体验应该像现有 OD artifact flow：

1. 用户与选定的 agent 对话。
2. Agent 使用 skill 规划并创建 live artifact。
3. OD 将 artifact 持久化为 project-scoped files 和 metadata。
4. UI 在现有 iframe/file viewer model 中 preview 该 artifact。
5. 用户之后可以 refresh 该 artifact，而不必要求 agent 从零重新设计。

## 2. 关键决策

### 2.1 Use `skill + daemon tool endpoint`, not MCP-first

Monet 通过 controller-owned tool registry 暴露 connectors 和 live artifacts。OD 不应该照搬这种 runtime shape，因为 OD 的核心架构不同：OD 委托给 Claude Code、Codex、Cursor Agent、Gemini CLI、OpenCode 和 Qwen 等 external CLI agents。

因此，agent-facing interface 应该是：

```text
skills/live-artifact/SKILL.md
  ↓ instructs the agent to call
daemon local HTTP endpoints or wrapper CLI commands
  ↓ backed by
daemon-owned connector + artifact services
  ↓ persisted as
project workspace files + metadata
```

以后可以把 MCP 作为同一组 daemon services 上的 wrapper 加进来，但它不应该是第一个或唯一 interface。

原因：

- **Multi-agent compatibility:** 每个受支持 agent 都能读取 skill 并执行 shell commands；MCP support 会随 agent 和 CLI version 变化。
- **Lower migration cost:** 当前 daemon `/api/chat` 不支持 per-run MCP binding。
- **Centralized safety:** daemon endpoints 可以一致地执行 project、path、connector 和 output-size policies。
- **Skill-native product model:** OD 的 extension point 已经是 `skills/` + `SKILL.md`，所以 live artifacts 应该像另一个 OD capability，而不是单独的 agent protocol。

### 2.2 Keep live artifacts distinct, but project-native

Live artifacts 是集成到现有 project UI 中的独立 persisted model。它们不应该在现有 artifact model 中表示为新的 static `ArtifactKind`，因为它们需要 ID-based identity、directory-shaped runtime storage、refresh/provenance history、connector permissions、locking，以及 server-rendered preview behavior。

产品术语：

- **Design / project:** workspace container。
- **Artifact:** design 内的 static generated file。
- **Live artifact:** design 内可 refresh、由 data-backed 的 artifact。
- **Connector:** live artifacts 可用的 external 或 local data source。

实现边界：

- 将专用 live-artifact storage 放在 `.live-artifacts/` 下，使用专用 `/api/live-artifacts/*` endpoints，并在 `packages/contracts` 中放置专用 live-artifact DTOs。
- 复用现有 project scope、workspace tabs、file tree、viewer primitives、chat SSE stream 和 API error envelope，让 live artifacts 体验上保持 native，同时不污染简单 static artifact path。
- 不要通过 generic project file APIs 暴露 `.live-artifacts/`；所有 mutation 都应通过 live-artifact 或 tool endpoints。

## 3. 从 Monet 迁移什么

### 3.1 需要保留的概念

From `~/Projects/monet`:

- Static connector catalog plus dynamic connection status.
- Connector tool safety classification.
- Read-only-first connector policy.
- Live artifact / tile / source / provenance separation.
- HTML document template plus data-binding contract.
- Declarative output mapping from tool output to `data.json` / render models.
- Strict render JSON validation.
- Refresh source validation before re-execution.
- Refresh audit trail with step-level status.
- Failure fallback: invalid refresh output should not blank the artifact.

### 3.2 需要适配的概念

Monet concept | OD adaptation
---|---
Controller `ToolRegistry` | Daemon service endpoints and optional CLI wrappers
Chat tools `create_live_artifact`, `update_live_artifact`, `list_live_artifacts` | Skill instructions that call `od-tools live-artifacts ...` or localhost daemon endpoints
Connector tools dynamically injected into tool registry | Connector catalog exposed through daemon endpoints; skill asks agent to query/use them explicitly
SQLite-first artifact storage | Project-scoped metadata files first; SQLite optional later if indexing becomes necessary
Controller-owned agent loop | External CLI agent loop; OD only injects skills and receives output/events

### 3.3 用作 source material 的 Monet files

- `apps/controller/src/connectors/catalog.ts`
- `apps/controller/src/connectors/service.ts`
- `apps/controller/src/routes/connectors.ts`
- `apps/controller/src/tools/connectors.ts`
- `apps/controller/src/live-artifacts/schema.ts`
- `apps/controller/src/live-artifacts/render.ts`
- `apps/controller/src/live-artifacts/refresh.ts`
- `apps/controller/src/routes/live-artifacts.ts`
- `apps/controller/src/tools/live-artifacts.ts`
- `apps/controller/src/chat-storage.ts`
- `specs/2026-04-27-live-artifacts/spec.md`

## 4. 目标架构

```text
┌──────────────────────────────────────────────────────────────────┐
│ Web App                                                          │
│ chat · artifact tree · live artifact list · refresh button        │
│ iframe preview · source/provenance panels                         │
└───────────────┬──────────────────────────────────────────────────┘
                │ HTTP/SSE
┌───────────────▼──────────────────────────────────────────────────┐
│ Local Daemon                                                      │
│                                                                  │
│  Agent session broker                                             │
│  Skill registry                                                   │
│  Built-in tool endpoints                                          │
│    /api/tools/live-artifacts/*                                    │
│    /api/tools/connectors/*                                        │
│    /api/connectors/*                                              │
│  Artifact store                                                   │
│  Connector service                                                │
│  Refresh runner + audit log                                       │
└───────────────┬──────────────────────────────────────────────────┘
                │ spawn / stdio
┌───────────────▼──────────────────────────────────────────────────┐
│ External Agent CLI                                                │
│ Claude Code · Codex · Cursor Agent · Gemini CLI · OpenCode · Qwen │
│                                                                  │
│ Receives SKILL.md instructions and calls daemon tools via shell   │
└──────────────────────────────────────────────────────────────────┘
```

## 5. User-facing skill 形态

新增一个 built-in skill：

```text
skills/live-artifact/
├── SKILL.md
├── references/
│   ├── artifact-schema.md
│   ├── connector-policy.md
│   └── refresh-contract.md
└── assets/
    └── templates/
        ├── dashboard.html
    └── report.html
```

### 5.1 `SKILL.md` frontmatter

```yaml
---
name: live-artifact
description: |
  创建由 connector 或 local data 支撑、可刷新且可审计的 Open Design artifacts。
  当用户请求 live dashboards、refreshable reports、synced views 或 reusable data-backed artifacts 时触发。
triggers:
  - live artifact
  - refreshable dashboard
  - live report
  - synced view
  - 可刷新
  - 实时看板
od:
  mode: prototype
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
```

### 5.2 Skill body responsibilities

该 skill 应指示 agent：

1. 判断用户想要 live artifact，还是普通 static artifact。
2. 查询 available connectors 和 allowed read-only operations。
3. 当存在命名且已连接的 connector/source 时，从它抓取；只有在没有匹配的 connected source、多个候选同样合理，或请求缺少任何可搜索 topic/page/database clue 时，才向用户询问 data source。
4. 创建 safe render model，而不是 raw provider output。
5. 将 `template.html`、`data.json`、`artifact.json` 和 `provenance.json` 写入 live artifact workspace directory；把 `index.html` 视为 derived preview output。
6. 通过 daemon tooling 注册 artifact。
7. 包含 provenance 和 refresh source metadata。
8. 永远不要存储 credentials、raw OAuth responses、headers、cookies 或 tokens。

### 5.3 Agent-callable command surface

在 skill body 中，优先使用小型 `od` wrapper command，而不是 raw `curl`：

```bash
od tools live-artifacts create --input artifact.json
od tools live-artifacts list --format compact
od tools live-artifacts update --artifact-id "$ID" --input artifact.json
od tools live-artifacts refresh --artifact-id "$ID"
od tools connectors list --format compact
od tools connectors execute --connector github --tool list_releases --input input.json
```

Wrapper 应作为 `apps/daemon/src` 下的 TypeScript source 实现，并使用注入的 runtime values 调用 daemon endpoints：

- `OD_DAEMON_URL`
- `OD_TOOL_TOKEN`

Daemon 会在 runtime 将这些值注入 system prompt 或 skill preamble。Agent 不应该选择或覆盖 `projectId`；`/api/tools/*` 从 `OD_TOOL_TOKEN` 派生 project/run scope。如果未来暴露 standalone JavaScript wrappers，它们必须是 TypeScript source 的 generated build output，而不是 project-owned `.js` source files。

Raw HTTP 仅用于 developer debugging，并且必须包含 run-scoped bearer token：

```bash
curl -s -X POST "$OD_DAEMON_URL/api/tools/live-artifacts/create" \
  -H 'content-type: application/json' \
  -H "authorization: Bearer $OD_TOOL_TOKEN" \
  -d @artifact.json
```

## 6. Daemon API 设计

### 6.1 Connector endpoints

```http
GET    /api/connectors
GET    /api/connectors/:connectorId
POST   /api/connectors/:connectorId/connect
DELETE /api/connectors/:connectorId/connection
```

MVP 可以 stub OAuth-backed connectors，并从 local/read-only connectors 开始，但 API 应保留 Monet 对 catalog 与 connection status 的拆分。OAuth callback routes 推迟到 OAuth-backed connectors 实现时再做。

Connector response shape:

```ts
type ConnectorDetail = {
  id: string;
  label: string;
  category: 'code' | 'docs' | 'files' | 'analytics' | 'custom';
  status: 'available' | 'connected' | 'error' | 'disabled';
  accountLabel?: string;
  featuredTools: ConnectorToolSummary[];
  allowedTools: ConnectorToolSummary[];
  minimumApprovalPolicy: 'read_only_auto' | 'confirm_write' | 'disabled';
  errorCode?: string;
};
```

### 6.2 Connector tool endpoints

Agent 和 refresh-runner 的 connector execution 必须使用同一个 daemon-owned execution path：

```http
GET  /api/tools/connectors/list
POST /api/tools/connectors/execute
```

`/api/tools/connectors/list` 返回当前 run token 可用的 connected、allowed、read-only-first tools 的 compact list。

`/api/tools/connectors/execute` request:

```ts
type ConnectorExecuteRequest = {
  connectorId: string;
  toolName: string;
  input: BoundedJsonObject;
  purpose: 'agent_preview' | 'artifact_refresh';
};
```

Response:

```ts
type ConnectorExecuteResponse =
  | {
      ok: true;
      connectorId: string;
      accountLabel?: string;
      toolName: string;
      safety: ConnectorToolSafety;
      output: BoundedJsonValue;
      outputSummary?: string;
      providerExecutionId?: string;
      metadata?: BoundedJsonObject;
    }
  | ApiErrorResponse;
```

Execution rules:

- 要求有效的 `OD_TOOL_TOKEN`，并绑定到 active run/project。
- 拒绝不在 connector catalog allowlist 中的 tools。
- 在 execution time 重新分类 tool safety；仅有 catalog metadata 不构成 authorization。
- 对 `artifact_refresh` 拒绝 `write`、`destructive` 和 `unknown` tools。
- 返回给 agent 前先限制 output size。
- 返回或持久化任何内容前，redact credentials 和 raw provider envelope fields。
- 为 provenance 记录 `providerExecutionId`、connector/account labels 和 safety policy。

### 6.3 Live artifact endpoints

Agent/tool endpoints:

```http
POST /api/tools/live-artifacts/create
GET  /api/tools/live-artifacts/list
POST /api/tools/live-artifacts/update
POST /api/tools/live-artifacts/refresh
```

UI endpoints:

```http
GET   /api/live-artifacts?projectId=...
POST  /api/live-artifacts
GET   /api/live-artifacts/:artifactId
PATCH /api/live-artifacts/:artifactId
POST  /api/live-artifacts/:artifactId/refresh
GET   /api/live-artifacts/:artifactId/preview
```

`/api/tools/*` endpoints 面向 agent consumption 优化：compact JSON、concise errors，以及明确的 machine-readable validation failures。它们绝不接受任意 `projectId`；project/run scope 来自 `OD_TOOL_TOKEN`。`/api/live-artifacts/*` endpoints 面向 UI state 优化，并使用 web app 的 normal project context。

两组 endpoint families 必须调用同一套 service-layer validation 和 storage code。只有 authentication 和 response verbosity 应该不同；errors 应共享来自 `packages/contracts` 的 `ApiErrorResponse` envelope。

Agent-facing tool endpoints 应复用 `packages/contracts/src/errors.ts` 中的 shared API error envelope，而不是引入 parallel error type：

```ts
type LiveArtifactToolResponse<TSuccess> = TSuccess | ApiErrorResponse;
```

新增 live-artifact 和 connector-specific 的 `ApiErrorCode` values，例如 `TOOL_TOKEN_INVALID`、`TOOL_TOKEN_EXPIRED`、`CONNECTOR_NOT_CONNECTED`、`CONNECTOR_SAFETY_DENIED`、`REFRESH_LOCKED`、`REFRESH_TIMED_OUT`、`OUTPUT_TOO_LARGE`、`TEMPLATE_BINDING_INVALID` 和 `REDACTION_REQUIRED`。Validation details 应放在现有 error `details` field 中，让 web、daemon 和 tests 共享同一个 error model。

## 7. Data model

### 7.1 Storage layout

优先使用 daemon-managed storage 下的 project-scoped files。本历史 spec 不得定义 daemon data paths；记录 storage 前，先阅读根目录 [`AGENTS.md`](../../AGENTS.md) → **Daemon data directory contract**。

```text
project artifact storage
└── live artifact metadata and payloads
        ├── template.html
        ├── index.html
        ├── data.json
        ├── provenance.json
        ├── refreshes.jsonl
        └── snapshots/
            └── <refreshId>/
                ├── data.json
                └── provenance.json
```

带 dot 前缀的 `.live-artifacts/` directory 会把 implementation files 排除在 generic project file tree 之外，同时保留 OD file-first、inspectable-on-disk 的 artifact philosophy。只有在需要 cross-project indexing 或 high-volume refresh history 时，才稍后加入 SQLite。

`index.html` 是 generated preview artifact，不是 refreshable data 的 source of truth。UI 应通过以下 route 加载 live artifacts：

```http
GET /api/live-artifacts/:artifactId/preview
```

Preview route 可以在 static cases 中服务已存储的 `index.html`；但对于 refreshable HTML，它应该 render `template.html + data.json`，并应用 iframe sandbox/CSP headers。除非用户明确打开 refresh history，否则 `snapshots/` 应从 normal artifact tree 中隐藏。

### 7.2 Core types

```ts
type BoundedJsonValue =
  | null
  | boolean
  | number
  | string
  | BoundedJsonValue[]
  | { [key: string]: BoundedJsonValue };

type BoundedJsonObject = { [key: string]: BoundedJsonValue };

type LiveArtifact = {
  schemaVersion: 1;
  id: string;
  projectId: string;
  sessionId?: string;
  createdByRunId?: string;
  title: string;
  slug: string;
  status: 'active' | 'archived' | 'error';
  pinned: boolean;
  preview: {
    type: 'html' | 'jsx' | 'markdown';
    entry: string;
  };
  refreshStatus: 'never' | 'idle' | 'running' | 'succeeded' | 'failed';
  createdAt: string;
  updatedAt: string;
  lastRefreshedAt?: string;
  document?: LiveArtifactDocument;
};

type LiveArtifactDocument = {
  format: 'html_template_v1';
  templatePath: 'template.html';
  generatedPreviewPath: 'index.html';
  dataPath: 'data.json';
  dataJson: BoundedJsonObject;
  dataSchemaJson?: BoundedJsonObject;
  sourceJson?: LiveArtifactSource;
};

type LiveArtifactSource = {
  type: 'local_file' | 'daemon_tool' | 'connector_tool';
  toolName?: string;
  input: BoundedJsonObject;
  connector?: {
    connectorId: string;
    accountLabel?: string;
    toolName: string;
    approvalPolicy: 'read_only_auto' | 'manual_refresh_granted_for_read_only';
  };
  outputMapping?: {
    dataPaths?: Array<{ from: string; to: string }>;
    transform?: 'identity' | 'compact_table' | 'metric_summary';
  };
  refreshPermission: 'none' | 'manual_refresh_granted_for_read_only';
};

type LiveArtifactProvenance = {
  generatedAt: string;
  generatedBy: 'agent' | 'refresh_runner';
  notes?: string;
  sources: Array<{
    label: string;
    type: 'connector' | 'local_file' | 'user_input' | 'derived';
    ref?: string;
  }>;
};
```

### 7.3 Validation rules

迁移 Monet 的 strict validation posture：

- 对每个 persisted 或 agent-supplied 的 `BoundedJsonValue` / `BoundedJsonObject` 应用 `packages/contracts` 中的 shared bounded JSON constraints。
- 拒绝 `raw`、`rawResponse`、`payload`、`body`、`headers`、`cookie`、`authorization`、`token`、`secret`、`credential`、`password` 等 keys。
- 持久化前 redact 可疑 source inputs。
- Redaction 后仍包含 credential-like values 的 source inputs 必须拒绝。
- HTML preview files 必须从 document contract 生成；refresh 更新 `data.json`，而不是 arbitrary script。

#### 7.3.1 Shared bounded JSON constraints

Shared live-artifact JSON envelope 被刻意限制得足够小，以便同步验证、存储到 project files、在 UI 中展示，并包含在 agent-facing error details 中，同时不泄露 raw provider payloads。

在 `packages/contracts` 中定义并导出这些 constants，命名为 `LIVE_ARTIFACT_BOUNDED_JSON_CONSTRAINTS`：

| Constraint | Value | Applies to |
| --- | ---: | --- |
| Maximum object/array depth | `8` | Any `BoundedJsonValue`; count the root object or array as depth `1`. |
| Maximum object keys | `100` | Any single object. |
| Maximum array length | `500` | Any single array. |
| Maximum string length | `16 KiB` | Any single string value, measured in UTF-16 code units before persistence. |
| Maximum serialized payload size | `256 KiB` | Any complete bounded JSON document, measured as UTF-8 bytes of canonical `JSON.stringify` output. |

当 value 超过任何 limit 时，validation 必须 fail closed。Persisted files 与 create/update inputs 必须使用同一组 limits，确保有效的 agent input 在 storage round-trips 后仍然有效。未来 connector-specific limits 可以更严格，但对持久化到 live artifact files 的 values，不得超过这个 shared envelope。

### 7.4 HTML document model

MVP live HTML artifacts 应使用 `html_template_v1`：

```text
template.html + data.json → daemon render step → index.html / preview response
```

规则：

- `template.html` 由 agent 在 create/update 期间 author。
- Refreshable values 必须来自 `data.json`，不能只 hardcode 在 HTML 中。
- `html_template_v1` 支持 **Mustache-style escaped interpolation + 最小 `data-od-repeat` structural directive**。它不支持 arbitrary JavaScript、expression evaluation、helper functions、filters、partials 或 raw HTML injection。
- Refresh 会更新 `data.json` 和 snapshots。它不允许 connector output 重写 arbitrary HTML。
- 如果需要 presentation redesign，用户应该要求 agent update artifact；refresh 只用于 data changes。
- `index.html` 可以在 successful refresh 后 regenerate，但它是 derived output。
- Preview route 必须在 sandboxed iframe context 中服务 document，并应用 restrictive CSP。MVP 中除非 vendored 且 allowlisted，否则禁止 external scripts。

#### 7.4.1 `html_template_v1` binding contract

MVP binding syntax 刻意保持小而 deterministic：

- **Escaped interpolation:** `{{data.path.to.value}}` 从 `data.json` 插入 scalar value。
  - Paths 必须以 `data` 开头，并使用 dot-separated object keys，例如 `{{data.summary.title}}`。
  - Numeric array indexes 只能作为 path segments，例如 `{{data.metrics.0.value}}`。
  - Keys 必须匹配 `/^[A-Za-z_][A-Za-z0-9_-]*$/`；bracket notation、computed paths、wildcards、function calls 和 expressions 都无效。
  - Values 以 strings 渲染。`null` 和 missing values 渲染为空字符串。除 supported repeat context 内部以外，objects 和 arrays 都是无效 interpolation targets。
- **Repeat directive:** `data-od-repeat="item in data.items"` 会对 array 中每个 object 重复 annotated element 一次。
  - Left side 是匹配 `/^[A-Za-z_][A-Za-z0-9_]*$/` 的 local alias。
  - Right side 必须是解析为 array 的 `data.*` path。
  - 在 repeated element 内，interpolation 可以引用 local alias，例如 `{{item.name}}`，并使用相同 path grammar。
  - MVP 禁止 nested `data-od-repeat` directives。
  - `data-od-repeat` 会从 generated output 中移除。
- **Conditional directives:** MVP 中没有。Optional sections 应通过 empty strings、zero-length arrays，或 update 时独立的 agent-authored template variants 表示。
- **Attribute bindings:** interpolation 可以出现在 text nodes 和普通 HTML attribute values 中，但不能出现在 attribute names、tag names、comments、`<script>`、`<style>`、`<iframe srcdoc>`、`onclick` 等 event-handler attributes，或 URL validation 失败的 URL-bearing attributes 中。

所有 interpolation 默认进行 HTML-escaped：

- Text-node interpolation 会 escape `&`、`<`、`>`、`"` 和 `'`。
- Attribute interpolation 会 escape 相同字符，并且不得允许其 break out of containing attribute。
- `href` 和 `src` 等 URL-bearing attributes 必须解析为允许的 `http:` 或 `https:` URLs、root-relative paths、same-artifact relative asset paths 或 fragments；`javascript:`、`data:`、`blob:` 和其他 unsupported schemes 会被拒绝。

MVP 明确禁止 raw / unescaped interpolation：

- No triple braces such as `{{{data.html}}}`.
- No ampersand form such as `{{& data.html}}`.
- No `data-od-html`, `data-od-raw`, `data-od-bind-html`, or equivalent raw insertion attributes.
- No opt-out flag in artifact metadata or tool input.

Daemon 必须在 persistence 前验证 `template.html`，并在 preview rendering 前再次验证。Validation failures 必须使用 shared API error envelope，并在 `details` 中提供 field/path details。

## 8. Runtime flows

### 8.1 Create flow

```text
User asks for a live dashboard
  ↓
OD selects/injects live-artifact skill
  ↓
Agent queries connectors or local sources through daemon wrapper
  ↓
Agent writes template.html + artifact.json + data.json + provenance.json
  ↓
Agent calls live-artifacts create endpoint
  ↓
Daemon validates schemas, source metadata, file paths, and template binding
  ↓
Daemon stores artifact metadata and returns compact summary
  ↓
Web UI opens /api/live-artifacts/:artifactId/preview
```

### 8.2 Refresh flow

```text
User clicks Refresh
  ↓
UI POST /api/live-artifacts/:id/refresh
  ↓
Daemon loads artifact.json and the refreshable document source
  ↓
For the document source:
  - verify refreshPermission
  - verify connector still connected
  - verify tool is still read-only
  - verify accountLabel/connectorId did not drift
  - verify saved input matches current schema
  - execute source
  - map output through declarative outputMapping.dataPaths
  - update candidate dataJson
  - validate sanitized data
  ↓
Write refresh step to refreshes.jsonl
  ↓
If the refreshable source succeeds, commit data.json, snapshot, and regenerated preview
If it fails, keep previous data/preview, write failed refresh record, and surface the error
```

MVP refresh 是 **artifact-level all-or-nothing**。

Refresh runner requirements：

- 获取 per-artifact refresh lock。拒绝或排队 concurrent refreshes。
- 分配 monotonic `refreshId`；stale refreshes 不能覆盖更新的 committed data。
- 执行 per-source 和 total refresh timeouts。
- 将每一步持久化到 `refreshes.jsonl`，包含 status、duration、connector metadata 和 compact error。
- Daemon restart 后，将超过 timeout 仍卡在 `running` 的 refreshes 恢复为 `failed`，并保留最后一个 valid preview。
- 仅在 validation 成功后写 snapshots；或者将 failed attempts 写入单独的 `snapshots/<refreshId>/failed/` directory，且不用于 preview。

### 8.3 Update flow

Agent 或 UI 可以 update title、pinned status、archive status、preview entry 或 non-source presentation fields。更新 `sourceJson` 需要与 create 相同的 validation。

## 9. Connector strategy

### 9.1 Read-only v1

MVP 只应把 read-only connector tools 暴露给 automatic 或 refresh execution。

Write actions 可以稍后存在，但必须要求 explicit user confirmation，并且不应 refreshable。

Safety classification:

```ts
type ConnectorToolSafety = {
  sideEffect: 'read' | 'write' | 'destructive' | 'unknown';
  approval: 'auto' | 'confirm' | 'disabled';
  reason: string;
};
```

规则：

- 包含 `write`、`create`、`update`、`delete`、`admin`、`send`、`post`、`manage` 的 OAuth scopes 或 names 暗示 write/confirm。
- Destructive hints 对 refresh 暗示 destructive/disabled。
- 明确 read-only hints 可以是 read/auto。
- Unknown 默认是 write/confirm，而不是 read/auto。

### 9.2 Execute-time enforcement

Connector policy 必须在 execution 和 refresh time 执行，而不只是 catalog 构建时执行：

- Catalog classification 是 metadata，不是 authorization。
- `/api/tools/connectors/execute` 重新检查 allowlist、current scopes、tool safety 和 connector status。
- Saved artifact policy 本身不能授予新 permission。
- `unknown`、`write` 和 `destructive` tools 永远不可 refreshable。
- 如果曾经 read-only 的 tool 因 scopes 或 provider metadata 改变而后来显示为 write-capable，refresh 必须 fail closed。
- 未来可以通过 explicit confirmation 支持 write action，但它不得被存储为 refreshable source。
- Agent calls 与 refresh-runner calls 必须共享同一个 connector execution service，确保 audit 和 safety behavior 不会 drift。

### 9.3 Credential storage

默认决策：

- OAuth connection state 和 credentials 位于 project artifacts 之外，放在 daemon-controlled storage 或 app database 中。本 spec 不得定义 daemon data paths。
- Project artifacts 只存储 stable references：`connectorId`、`accountLabel`、provider tool id/name、minimized input 和 provenance。
- Access tokens、refresh tokens、headers、cookies、OAuth state 和 raw provider responses 永远不能写入 project artifact storage。
- Refresh 在 execution time 通过 daemon connector service 解析 credentials。
- UI 必须显示 connector/account label，让用户理解哪个 global connection 支撑 project artifact。

### 9.4 Initial connector candidates

MVP 可以先交付 local daemon tools，避免 OAuth complexity：

- `project_files.search`
- `project_files.read_json`
- `git.summary`
- `github.public_repo_summary` using unauthenticated public API or user-provided token later

Artifact pipeline 稳定后，OAuth-backed providers 可以遵循 Monet pattern：

- GitHub
- Notion
- Google Drive
- Linear

## 10. UI changes

### 10.1 Entry header connector tab

在 entry-header navigation 中添加 `Connectors` tab。选中后，它应该显示 available external 和 local connectors 的 cards。

随着数据可用，connector cards 应包含：

- connector name 和 provider/category
- connection status
- connected account label（当已连接时）
- connect、disconnect 或 configure action
- available read-only tools/capabilities（有用时）

这个 tab 是 workspace-level connector management surface，不是单独的 project type。Phase 1B 可以显示 stubbed 或 local-only connector card data；完整 external connector status、connect/disconnect actions 和 OAuth-backed flows 属于 connector phase。

### 10.2 New project live artifact entry

在 new project tabs 中添加 `New live artifact`。选中后，应以 live-artifact intent 启动 normal project creation flow，并预选或强提示 `live-artifact` skill path。

这会创建一个 normal project/design，其第一个 output 预期是 live artifact。除非 product model 后续改变，否则不应创建单独的 top-level project type。

Live artifacts 也应列在现有 `Designs` tab 中。`Designs` tab 应继续显示 normal designs/projects，同时额外把 live artifacts 作为与 parent project/design 关联的一等 selectable entries 暴露出来。Live artifact entries 应通过 `Live` / `Refreshable` status 在视觉上可区分，并直接打开到 project workspace，选中对应 live artifact。Parent design cards 也可以显示小型 live-artifact count 或 status summary。

### 10.3 Artifact tree

在现有 artifact tree 中将 live artifacts 显示为 first-class virtual group，而不是 raw nested files。Tree 应为每个 live artifact 显示一个 node，并默认隐藏 `snapshots/` 等 implementation files。

`ProjectView.tsx` 应在现有 project file fetch 旁边获取 `GET /api/live-artifacts?projectId=...`，然后把 live artifacts 作为 discriminated item（例如 `kind: 'live-artifact'`）merge 到 workspace state 中。使用 `live:<artifactId>` 这样的 namespaced tab IDs，避免 live artifacts 与 file paths 冲突。`FileWorkspace.tsx` 应在 virtual group 中渲染这些 items，并把 open/select actions 路由到 live artifact viewer，而不是把 artifact IDs 当作 normal project file paths。

Badges:

- `Live`
- `Refreshable`
- `Refreshing...`
- `Refresh failed`
- `Archived`

### 10.4 Preview panel

尽可能复用现有 iframe/file viewer：

- 在 iframe 中加载 `GET /api/live-artifacts/:artifactId/preview`，而不是直接打开 nested files。
- 使用现有 `FileViewer.tsx` / `HtmlViewer` tab pattern 添加 read-only viewer toolbar tabs：`Preview`、`Source`、`Data`、`Provenance`、`Refresh history`。Phase 1B 不要求新的 split-pane side panel。
- 只有至少一个 tile 可 refresh 时才显示 refresh button。当 `refreshStatus` 为 `running` 时，button 应 disabled 并显示 loading state，防止 duplicate refreshes。

Viewer tabs 的 data sources：

- `Source`: `artifact.json` `sourceJson` fields with credentials redacted.
- `Data`: current `data.json` and tile render summaries.
- `Provenance`: `provenance.json` and connector/account labels.
- `Refresh history`: parsed `refreshes.jsonl`, newest first.

### 10.5 Chat integration

当 agent 创建或更新 live artifact 时，daemon 应 emit 一个类似 produced files 的 agent/UI event，让 UI 可以自动打开它。MVP 中扩展 `packages/contracts/src/sse/chat.ts` 中现有 chat SSE stream，而不是创建第二条 live-artifact SSE connection。`apps/web/src/providers/daemon.ts` 应把 SSE payload 转换为 UI `AgentEvent`，例如 `kind: 'live_artifact_update'`；`ProjectView.tsx` 应使用该 event refresh live artifact list，并通过 produced files 使用的同一个 open-request flow 自动打开 artifact。

建议 event：

```ts
type LiveArtifactEvent = {
  type: 'live_artifact_created' | 'live_artifact_updated' | 'live_artifact_refresh_completed';
  artifactId: string;
  title: string;
  previewUrl?: string;
  status: string;
};
```

## 11. Implementation plan

### Phase 0 — Contracts first

- 添加本 spec。
- 在 `packages/contracts` 下添加 shared TypeScript DTOs，并保持该 package 为 pure TypeScript，且不依赖 Next.js、Express、filesystem/process APIs、browser APIs、SQLite、daemon internals 或 sidecar control-plane dependencies。
- 为 `LiveArtifact`、`LiveArtifactSource` 和 connector catalog entries 添加 shared contract DTOs。Runtime validation schemas 属于 daemon source，尤其是 `apps/daemon/src/live-artifacts/schema.ts`，并应 consume 或 mirror shared contract types，而不把 daemon internals 加入 `packages/contracts`。
- 添加或更新 contract files，例如：
  - `packages/contracts/src/api/live-artifacts.ts`
  - `packages/contracts/src/api/connectors.ts`
  - `packages/contracts/src/sse/chat.ts`
  - `packages/contracts/src/examples.ts`
  - `packages/contracts/src/index.ts`
- 在 `specs/2026-04-29-live-artifacts/examples/` 下添加 fixture artifacts。
- 扩展 `packages/contracts/src/errors.ts`，加入 live artifact / connector error codes，而不是定义第二套 error envelope。
- 定义 `html_template_v1` binding grammar 和示例 `template.html + data.json`。

Exit criteria:

- Schemas 拒绝 raw provider response fields 和 credential-like values。
- Example artifact 可以通过 preview contract 从 `template.html + data.json` render。

### Phase 1A — Register static local live artifacts

- 实现 daemon live artifact service。
- 在 `<RUNTIME_DATA_DIR>/projects/<projectId>/.live-artifacts` 下实现 project-scoped file storage。
- 添加 `/api/tools/live-artifacts/create` 和 `list`。
- 添加 `GET /api/live-artifacts?projectId=...` 和 `GET /api/live-artifacts/:artifactId`。
- 为 tool endpoints 添加 run-scoped `OD_TOOL_TOKEN`。

Exit criteria:

- 一个 static `html_template_v1` artifact 可以在没有 connectors 或 refresh 的情况下注册。
- Daemon 拒绝 invalid paths、raw provider fields 和 credential-like values。

### Phase 1B — UI preview integration

- 添加 `GET /api/live-artifacts/:artifactId/preview`。
- 将 `template.html + data.json` render 成 sandboxed iframe response。
- 与 project files 一起 fetch live artifacts，并在 artifact tree 中显示为 virtual nodes。
- 在 `FileViewer.tsx` 中添加 `LiveArtifactViewer` path，复用现有 HTML viewer toolbar/iframe patterns。
- 添加 read-only `Preview`、`Source`、`Data`、`Provenance` 和 `Refresh history` viewer tabs。

Exit criteria:

- UI 可以 list 和 preview 一个已注册 live artifact。
- Preview 不要求把 `snapshots/` 或 implementation files 暴露为 normal project files。

### Phase 1C — Built-in skill and wrapper command

- 添加 built-in `skills/live-artifact/SKILL.md`。
- 从 `apps/daemon/src` 下的 TypeScript source 添加 `od tools live-artifacts ...` 和 connector command handlers。
- 向 skill preamble 注入 daemon URL 和 short-lived tool token。

Exit criteria:

- Agent 可以用 local data 创建 live artifact。
- UI 可以 list 并 preview 它。
- 不需要 MCP configuration。

### Phase 2 — Refresh runner

- 添加 `refreshes.jsonl` audit log。
- 为 local daemon tools 实现 manual refresh。
- 实现 per-artifact refresh lock、timeout、stale-write protection 和 crash recovery。
- Validation failure 时保留 previous render。
- Emit chat-stream UI refresh events，并更新 viewer refresh loading/failure state。

Exit criteria:

- 用户可以点击 Refresh 并看到 updated data。
- Failed refresh 会保留 old preview，并显示 actionable error。

### Phase 3 — Connector catalog and read-only connector tools

- 移植 Monet connector catalog/service shape。
- 添加 connector endpoints。
- 添加 `/api/tools/connectors/list` 和 `/api/tools/connectors/execute`。
- 添加 read-only tool classification。
- 添加第一个真实 read-only connector。
- 用 connector usage instructions 扩展 `live-artifact` skill references。

Exit criteria:

- Agent 可以 query available connectors。
- Agent 可以从 read-only connector 创建 refreshable artifact。
- Refresh 会重新验证 connector、account、tool 和 approval policy。

### Phase 4 — Optional MCP wrapper

- 在 skill + wrapper path 确认后：MCP 不是 MVP correctness 的必要条件，因为所有受支持 agents 都可以使用 `SKILL.md` 加 `od tools ...` wrappers，而 Phase 1C/Phase 3 command surfaces 已覆盖 live artifact create、list、update、refresh、connector list 和 read-only connector execution。MCP 只有作为成熟 MCP support agents 的 additive compatibility layer 才值得添加，并且不得替换、削弱或 fork daemon-owned service/policy path。
- 将 daemon 现有 live artifact 和 connector services 包装为 MCP server，供 MCP 支持良好的 agents 使用。
- 不要让 MCP 成为必需。
- 不要自动 mutate global user MCP config。

#### 11.5.1 Optional MCP server design

如果添加 MCP integration，它应该是 **existing daemon tool endpoints 上的 thin stdio adapter**，而不是第二套 tool implementation。MCP process 只应为明确支持 MCP 的 agent run 启动，并接收与 wrapper CLI 相同的 injected runtime environment：

```text
MCP-capable agent
  ⇄ stdio MCP protocol
od mcp live-artifacts          # TypeScript source under apps/daemon/src, built into the od bin
  ⇄ local HTTP with Authorization: Bearer $OD_TOOL_TOKEN
/api/tools/live-artifacts/* and /api/tools/connectors/*
  ⇄ daemon live artifact, refresh, connector, auth, validation, and policy services
```

Design constraints:

- **Single policy path:** MCP server 必须使用 `OD_DAEMON_URL` 和 `OD_TOOL_TOKEN` 调用现有 `/api/tools/*` endpoints。它不得 import store/service modules 来绕过 token scoping、connector policy、output redaction、rate limits 或 route validation。
- **Run scoped:** 一个 MCP server instance 通过 bearer token 绑定到一个 agent run 和一个 project。Stdio 关闭时它退出；daemon token expiry/revocation 仍然 authoritative。
- **Equivalent tools only:** 只暴露 mirror CLI/API surface 的 MCP tools，使用相同 schemas 和 compact results：
  - `od_live_artifacts_create` → `POST /api/tools/live-artifacts/create`
  - `od_live_artifacts_list` → `GET /api/tools/live-artifacts/list`
  - `od_live_artifacts_update` → `POST /api/tools/live-artifacts/update`
  - `od_live_artifacts_refresh` → `POST /api/tools/live-artifacts/refresh`
  - `od_connectors_list` → `GET /api/tools/connectors/list`
  - `od_connectors_execute` → `POST /api/tools/connectors/execute`
- **No project overrides:** tool input schemas 不得接受 `projectId`；project/run scope 始终由 daemon routes 从 `OD_TOOL_TOKEN` 派生。
- **No global config mutation:** OD 可以为兼容 agents 显示或生成 ephemeral MCP launch descriptor，但不得自动编辑 user-level MCP config files。
- **No primary-path dependency:** 当 MCP disabled 或 unsupported 时，`SKILL.md`、`od tools ...` 和 raw-token debugging 保持不变并继续工作。
- **Typed implementation:** project-owned MCP code 应该是 `apps/daemon/src` 下的 TypeScript source（例如 `apps/daemon/src/mcp/live-artifacts-server.ts` 加 `apps/daemon/src/cli.ts` 中的小型 CLI dispatch）。任何 JavaScript entrypoint 都必须是 generated build output 或明确记录的 compatibility artifact。

MCP tool errors 应将 daemon `ApiErrorResponse` values 转换为 MCP tool errors，且不得扩展 secret-bearing details。只有当 validation field details 已经可以安全地从对应 `/api/tools/*` route 返回时，才可包含它们。

Exit criteria:

- Claude Code 或另一个 MCP-capable agent 可以通过 MCP discover equivalent tools。
- Skill + CLI path 仍保持不变。

## 12. File-level landing plan

可能新增文件：

```text
packages/contracts/src/api/live-artifacts.ts
packages/contracts/src/api/connectors.ts
packages/contracts/src/examples.ts
apps/daemon/src/live-artifacts/schema.ts
apps/daemon/src/live-artifacts/store.ts
apps/daemon/src/live-artifacts/render.ts
apps/daemon/src/live-artifacts/refresh.ts
apps/daemon/src/live-artifacts/routes.ts
apps/daemon/src/connectors/catalog.ts
apps/daemon/src/connectors/service.ts
apps/daemon/src/connectors/routes.ts
apps/daemon/src/tools/live-artifacts.ts
apps/daemon/src/tools/connectors.ts
skills/live-artifact/SKILL.md
skills/live-artifact/references/artifact-schema.md
skills/live-artifact/references/connector-policy.md
skills/live-artifact/references/refresh-contract.md
```

可能触碰文件：

```text
packages/contracts/src/errors.ts
packages/contracts/src/index.ts
packages/contracts/src/sse/chat.ts
apps/daemon/src/server.ts
apps/daemon/src/skills.ts
apps/daemon/src/cli.ts
apps/web/src/providers/daemon.ts
apps/web/src/providers/registry.ts
apps/web/src/components/EntryView.tsx
apps/web/src/components/NewProjectPanel.tsx
apps/web/src/components/ProjectView.tsx
apps/web/src/components/DesignsTab.tsx
apps/web/src/components/FileWorkspace.tsx
apps/web/src/components/FileViewer.tsx
apps/web/src/components/PreviewModal.tsx
apps/web/src/types.ts
apps/daemon/src/prompts/system.ts
```

保持第一版实现足够小：当前 daemon route handlers 位于 `apps/daemon/src/server.ts`，所以可以先在那里 mount live artifact routes，或者添加由 `server.ts` import 的小型 TypeScript route modules。不要添加 project-owned `.js` source files；JavaScript 只能是 generated build output 或明确记录的 compatibility artifact。

## 13. Security and trust model

### 13.1 Daemon must enforce

- `/api/tools/*` 要求 short-lived bearer `OD_TOOL_TOKEN`。
- Tool tokens 按 agent run mint，并绑定 `runId`、`projectId`、allowed endpoints、allowed operations 和 expiry。
- `/api/tools/*` 从 token 派生 project/run scope，并拒绝 request-supplied project overrides。
- Local daemon tool endpoints 的 CORS 默认关闭；UI endpoints 使用 web app 的 normal origin/session checks。
- 防御 localhost endpoints 上的 CSRF 和 DNS rebinding。
- Project ID 存在并映射到 active workspace。
- 所有 file paths 都留在 project workspace 内。
- Tool output size 有界。
- Snapshot/history size 和 retention 有界。
- Refresh execution 具备 timeout 和 cancellation。
- Connector credentials 永远不会进入 agent output 或 artifact files。
- Source input 被 minimized 和 redacted。
- Read-only refreshes 不能 drift 到 write-capable tools。
- Preview responses 使用 iframe sandboxing 和 restrictive CSP。

### 13.2 Skill must instruct

- 不要把 raw connector responses 粘贴进 `artifact.json`。
- 不要存储 tokens、headers、cookies 或 credentials。
- 优先使用 summaries、normalized rows 和 derived metrics。
- 保持 `data.json` compact 且 preview-oriented。
- 使用 daemon tool endpoints 处理 registration 和 refresh metadata。
- 除 debugging 外，使用 wrapper commands，而不是构造 raw HTTP。

### 13.3 UI must communicate

- 哪个 connector/account 支撑 artifact。
- 上次 refresh 时间。
- Refresh 是否 manual only。
- Refresh 失败原因。

## 14. Non-goals

- No MCP-first implementation in MVP.
- No arbitrary write-capable connector refresh.
- No raw provider response storage.
- No multi-user auth model.
- No cloud-hosted connector broker in v1.
- No new canvas abstraction separate from OD's existing artifact/preview model.

## 15. Open questions

1. `od tools ...` 是否应该是唯一 wrapper surface，还是也应提供 generated per-project wrappers 以便 agent 更容易访问？
2. How should agent adapters advertise `shell` availability for skill gating?
3. How much refresh history should be retained before compaction?
4. Failed refresh attempt payloads 是否应保留在 hidden failed snapshot directory 中，还是只汇总到 `refreshes.jsonl`？

## 16. Acceptance criteria

- Built-in `live-artifact` skill 可以被现有 skill registry discover。
- Agent 可以在没有 MCP 的情况下创建 live artifact。
- Daemon 会 validate 并 persist live artifact metadata。
- UI 可以 list 和 preview artifact。
- Manual refresh 至少可用于一个 local read-only source。
- Refresh failures 会被 audited，且不会破坏 last valid preview。
- Connector-backed refresh 是 read-only，并在每次 run 前重新验证。
- `/api/tools/*` calls 要求 run-scoped auth，且不能覆盖 project scope。
- 没有 persisted artifact fixture 包含 raw credentials、headers、cookies 或 full provider payloads。

## 17. Recommended first slice

实现最小但有用的 vertical slice：

1. `skills/live-artifact/SKILL.md`
2. `packages/contracts/src/api/live-artifacts.ts`
3. `apps/daemon/src/live-artifacts/schema.ts`
4. `apps/daemon/src/live-artifacts/store.ts`
5. `POST /api/tools/live-artifacts/create`
6. `GET /api/live-artifacts?projectId=...`
7. `GET /api/live-artifacts/:artifactId/preview`
8. UI list + virtual live-artifact node + sandboxed preview

这会在添加 connectors、OAuth、refresh runner complexity 或 MCP wrappers 之前，先证明 skill-based interface 和 storage model。
