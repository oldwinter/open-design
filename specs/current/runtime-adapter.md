# Runtime Adapter 当前状态

## 目的

Runtime Adapter 是 daemon 中负责适配本地 AI Agent CLIs 的层。它把 Open Design 的统一生成请求转换成每个 CLI 的实际命令行调用，并把 CLI output 转换成 frontend 可消费的 streaming events。

当前实现集中在：

- `apps/daemon/src/agents.ts`：Agent definitions、detection、model lists、argument construction、model validation。
- `apps/daemon/src/server.ts`：`/api/chat` request orchestration、prompt composition、`spawn()` subprocesses、SSE forwarding。
- `apps/daemon/src/claude-stream.ts`：解析 Claude Code structured JSONL output。
- `apps/daemon/src/json-event-stream.ts`：解析 Codex、Gemini、OpenCode 和 Cursor Agent 的 structured JSON/JSONL output。
- `apps/daemon/src/acp.ts`：ACP JSON-RPC runtime 的 model detection 和 streaming session orchestration。

## 当前支持的 Runtimes

`apps/daemon/src/agents.ts` 中的 `AGENT_DEFS` 定义了 8 个 local runtimes：

| id | Name | CLI | Output format | Model list source |
|---|---|---|---|---|
| `claude` | Claude Code | `claude` | `claude-stream-json` | Static fallback |
| `codex` | Codex CLI | `codex` | `json-event-stream` | Static fallback |
| `gemini` | Gemini CLI | `gemini` | `json-event-stream` | Static fallback |
| `opencode` | OpenCode | `opencode` | `json-event-stream` | `opencode models` + fallback |
| `hermes` | Hermes | `hermes` | `acp-json-rpc` | `session/new` from `hermes acp` + fallback |
| `kimi` | Kimi CLI | `kimi` | `acp-json-rpc` | `session/new` from `kimi acp` + fallback |
| `cursor-agent` | Cursor Agent | `cursor-agent` | `json-event-stream` | `cursor-agent models` + fallback |
| `qwen` | Qwen Code | `qwen` | `plain` | Static fallback |

每个 runtime definition 包含：

- `id` / `name` / `bin`：用于 frontend display 和 process startup。
- `versionArgs`：用于检测 version。
- `fallbackModels`：model selector 的 static fallback options。
- `listModels`：可选的 model discovery command。
- `fetchModels`：可选的 custom model detection logic，适合 ACP 这类在 model list 可用前需要 handshake 的 runtimes。
- `reasoningOptions`：可选的 reasoning effort options，目前由 Codex 使用。
- `buildArgs()`：把统一 input 转换成该 CLI 的 argv；运行时也可以读取 `runtimeContext`，目前用于显式传递 `cwd` 这类 execution context。
- `streamFormat`：告诉 daemon 如何解释 stdout。

## Detection 流程

detection entry point 是 `detectAgents()`。

流程：

1. 遍历 `AGENT_DEFS`。
2. 使用 `resolveOnPath()` 在 `PATH` 中定位 CLI binary。
3. 定位后运行 `versionArgs` 获取 version。
4. 根据 runtime capability，通过 `listModels`、`fetchModels` 或 `fallbackModels` 生成 model list。
5. 将结果返回给 frontend，并刷新该 runtime 的 model validation cache。

detection result 包含：

- `available`：CLI 是否可用。
- `path`：实际 binary path。
- `version`：version string。
- `models`：frontend model menu 使用的 model list。
- `reasoningOptions`：reasoning effort menu。
- `streamFormat`：output format hint。

## Runtime 流程

实际执行发生在 `apps/daemon/src/server.ts` 中的 `POST /api/chat`。

流程：

1. frontend 提交 `agentId`、user message、system prompt、project ID、attachments、model 和 reasoning options。
2. daemon 使用 `getAgentDef(agentId)` 查找 runtime definition。
3. daemon 创建或定位 daemon-managed project working directory。本 spec 不得定义 daemon data paths；先阅读根目录 [`AGENTS.md`](../../AGENTS.md) → **Daemon data directory contract**。
4. daemon 校验 uploaded image paths 和 project attachment paths。
5. daemon 将 system prompt、working directory hint、existing file list、attachment list 和 user request 组合成一个 prompt。
6. daemon 准备额外可读目录：`skills/` 和 `design-systems/`。
7. daemon 校验 model 和 reasoning option。
8. 调用 `def.buildArgs(...)` 生成 CLI arguments；目前也会为需要显式 workspace argument 的 CLIs 传入 `runtimeContext = { cwd }`。
9. 使用 `spawn(def.bin, args, { cwd })` 启动 local runtime；plain / Claude 使用 read-only stdin，ACP runtimes 使用 writable stdin。
10. daemon 通过 SSE 将 runtime output 转发给 frontend。

## Output Stream 处理

当前有四种 output formats：

### Claude Code：Structured JSONL

Claude Code 使用：

```bash
claude -p <prompt> --output-format stream-json --verbose --include-partial-messages
```

daemon 通过 `createClaudeStreamHandler()` 解析 stdout，并将 Claude Code JSONL events 转换成 UI events：

- `status`
- `text_delta`
- `thinking_delta`
- `thinking_start`
- `tool_use`
- `tool_result`
- `usage`

这些 events 会通过 SSE `agent` event 发送给 frontend。

### Codex / Gemini / OpenCode / Cursor Agent：Structured JSON Event Stream

这四个 runtimes 目前使用统一的 `json-event-stream` output format，stdout 由 `apps/daemon/src/json-event-stream.ts` 解析。

#### Codex

Codex 目前使用：

```bash
codex exec --json --skip-git-repo-check --sandbox workspace-write -c sandbox_workspace_write.network_access=true -C <cwd>
```

当前集成通过 `exec --json` 使用轻量 structured path。与原来的 plain-text `codex exec` 相比，这条路径增加了：

- `--json`：structured event output
- `--skip-git-repo-check`：允许在 temporary working directory 中运行
- `--sandbox workspace-write`：允许 Codex 在 project workspace 内编辑，而不使用已废弃的 `--full-auto` shortcut
- `-c sandbox_workspace_write.network_access=true`：在 workspace-write sandbox 内保持 network access enabled
- `-C <cwd>`：显式 working directory

daemon 当前映射：

- `thread.started` → `status(initializing)`
- `turn.started` → `status(running)`
- `item.completed(agent_message)` → `text_delta`
- `turn.completed.usage` → `usage`

#### Gemini

Gemini 目前使用：

```bash
GEMINI_CLI_TRUST_WORKSPACE=true gemini --output-format stream-json --yolo
```

daemon 通过 stdin 而不是 argv 传递 prompt。当前映射：

- `init` → `status(initializing)`
- `message(role=assistant)` → `text_delta`
- `result.stats` → `usage`

Gemini 运行时仍可能在 stderr 输出一些 workspace scan warnings；主流程不受影响。

#### OpenCode

OpenCode 目前使用：

```bash
opencode run --format json --dangerously-skip-permissions <prompt>
```

当用户选择 model 时，会追加 `--model <id>`。

daemon 当前映射：

- `step_start` → `status(running)`
- `text` → `text_delta`
- `tool_use` → `tool_use`
- Completed `tool_use.state` → `tool_result`
- `step_finish.part.tokens` → `usage`

#### Cursor Agent

Cursor Agent 目前使用：

```bash
cursor-agent --print --output-format stream-json --stream-partial-output --force --trust --workspace <cwd> -p <prompt>
```

当用户选择 model 时，会追加 `--model <id>`。

daemon 当前映射：

- `system(subtype=init)` → `status(initializing)`
- `assistant` partial chunks with `timestamp_ms` → `text_delta`
- `result.usage` → `usage`

Cursor 同时输出 partial assistant chunks 和最终聚合的 assistant message。daemon 目前优先使用 partial chunks；一旦 partial chunks 已出现，就忽略最终聚合文本，以避免重复渲染。

#### Qoder

Qoder 目前使用：

```bash
qodercli -p --output-format stream-json --permission-mode bypass_permissions
```

daemon 通过 stdin 而不是 argv 传递 composed prompt。当 runtime context 可用时，会追加 `--cwd <cwd>`。当用户选择 model 时，会追加 `--model <id>`。额外可读目录以重复的 `--add-dir <dir>` pairs 传入。

已校验的 uploaded image paths 会以重复的 `--attachment <path>` pairs 传入，因此 Qoder 除了文本型 `@path` prompt hint 外，也能收到原始 multimodal context。

daemon 通过 `apps/daemon/src/qoder-stream.ts` 解析 Qoder stream-json output，当前映射：

- `system(subtype=init)` → `status(initializing)`
- assistant text content blocks → `text_delta`
- thinking content blocks → `thinking_start` / `thinking_delta`
- assistant error records → `error`
- result usage metadata → `usage`

### Qwen：Plain Text Pass-through

Qwen 目前仍使用 `plain` output format。

daemon 直接通过 SSE `stdout` event 将 stdout chunks 转发给 frontend，并通过 `stderr` event 转发 stderr chunks。

### Hermes / Kimi：ACP JSON-RPC

Hermes 使用：

```bash
hermes acp --accept-hooks
```

Kimi 使用：

```bash
kimi acp
```

daemon 通过 `apps/daemon/src/acp.ts` 在 stdio 上启动 ACP session：

1. `initialize`
2. `session/new`
3. Optional `session/set_model`
4. `session/prompt`

当 ACP runtime 主动发出 `session/request_permission` 时，daemon 优先使用 `approve_for_session`，它支持 Kimi 这类在 tool calls 前需要 approval 的 CLIs 做 headless automatic approval。

`session/new` response 返回 `sessionId`、`models.availableModels` 和 `models.currentModelId`。daemon 复用这些信息做 model detection 和 runtime status reporting。

随后它将 Hermes / Kimi 的 `session/update` events 转换成 frontend 可消费的 `agent` events：

- `agent_thought_chunk` → `thinking_start` / `thinking_delta`
- `agent_message_chunk` → `text_delta`
- Final usage from `session/prompt` → `usage`

运行时会添加两个额外的 status events：

- 在 `session/new` 返回 default model 后发出 `status(model)`。
- 在第一个 text token 到达时发出 `status(streaming)`，并包含 `ttftMs`。

Model detection 也复用 ACP：detection 期间，daemon 从 `session/new` response 读取 `models.availableModels` 和 `models.currentModelId`。

当前 Kimi MVP integration 直接复用 Hermes ACP orchestrator。shared ACP layer 已加入 automatic permission approval。`multica` 也包含 Kimi-specific tool title normalization 和 provider error sniffing；本仓库目前保留较轻量的实现。

## Prompt Injection 方法

Local CLIs 目前使用统一方法：把 system prompt 折叠进 user message。

原因是大多数 local code-agent CLI command-line entry points 缺少独立 system channel。daemon 将以下内容组合成单个 input：

- `systemPrompt`: base output contract + skill content + design system content.
- `cwdHint`: current working directory and file writing rules.
- `filesListBlock`: existing file list in the project directory.
- `attachmentHint`: attachments uploaded or selected by the user.
- `message`: original user request.
- `safeImages`: temporary uploaded image paths appended in `@path` form.

Claude Code 还通过 `--add-dir` 暴露 `skills/` 和 `design-systems/`，让 Agent 更容易读取 skill seeds、templates 和 design system files。

## 安全与校验

现有保护包括：

- Process startup 使用 `spawn()` argument arrays，避免 shell string concatenation。
- Model IDs 会先与最近一次 `/api/agents` response 暴露的 model list 比较。
- Custom model IDs 通过 `sanitizeCustomModel()` 校验，限制长度、字符集和起始字符。
- Reasoning options 必须存在于 runtime definition 的 `reasoningOptions` 中。
- Image paths 必须位于 daemon temporary upload directory 内。
- Attachment paths 必须位于 project working directory 内。
- Agent working directories 被约束到 daemon-managed project storage。
- ACP runtimes 对 initialize、session/new、session/set_model 和 session/prompt 阶段有 timeout protection。
- ACP runtimes 监听 `stdin` errors，并在 model detection 完成后主动清理 detection processes。
- SSE connection 关闭时，daemon 会向 subprocess 发送 `SIGTERM`。

## 当前 Capability 边界

当前 runtime adapter 是轻量 adaptation layer，已经覆盖 discovery、startup、argument construction、model selection 和 streaming forwarding。

主要边界：

- adapter 仍是 declarative object array，尚未拆分成独立 adapter classes 或 directories。
- capability model 仍较薄，目前主要暴露 models、reasoning 和 output format。
- Claude Code、Codex、Gemini、OpenCode、Cursor Agent、Hermes 和 Kimi 已有 structured event parsing。
- Qwen 目前仍使用 plain text pass-through。
- Skill injection 主要依赖 prompt composition；只有 Claude Code 使用 `--add-dir` 支持读取外部目录。
- Hermes 目前只集成 core ACP text session path，尚未把更多 `session/update` types 映射为 unified UI events。
- Cancellation 由 HTTP connection closure 和 `SIGTERM` 触发；还没有显式 runId / cancel API。
- Resume、auth state、permission modes 和 capability gating 尚未形成统一 interface。
- API fallback 属于 frontend provider path，目前位于 daemon runtime adapter layer 之外。

## 与目标架构的差距

`docs/agent-adapters.md` 描述了更完整的目标形态：每个 Agent adapter 都有 `detect()`、`capabilities()`、`run()`、`cancel()` 和 `resume()` 等 interfaces，并输出 unified `AgentEvent`s。

当前实现已经具备目标架构的核心轮廓：

- `detectAgents()` 对应 `detect()`。
- `AGENT_DEFS` 对应 adapter registry。
- `buildArgs()` 对应 runtime-specific invocation。
- `streamFormat` + `claude-stream.ts` + `json-event-stream.ts` + `acp.ts` 对应 stream normalization。
- `/api/chat` 对应 unified run orchestration。
