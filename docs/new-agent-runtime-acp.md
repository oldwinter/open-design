# 新 agent runtime 预期：ACP over stdio

本文记录新的 Open Design agent runtime 推荐采用的集成形态。

## Recommendation

新的 agent runtimes 应暴露一个 **ACP over stdio** CLI mode。

实践中，Open Design 预期启动一个本地 executable，并通过 child process streams 使用 JSON-RPC 通信：

```text
Open Design daemon
  └─ spawn your-agent acp
       ├─ stdin  <- ACP JSON-RPC requests/responses
       ├─ stdout -> ACP JSON-RPC responses/notifications
       └─ stderr -> 仅 logs 与 diagnostics
```

如果 runtime 的真实实现是本地或远程 server，请把这个细节藏在薄 CLI wrapper 后面：

```text
your-agent acp
  └─ connects to your runtime server / SDK / model backend
```

这个 wrapper 让 Open Design 保持在标准 ACP subprocess transport 上，也避免 daemon 侧需要额外 network transport adapter。

## 为什么是 stdio，而不是 ACP server？

ACP protocol 使用 JSON-RPC，但 transport 很重要。

ACP transport documentation 将 **stdio** 定义为通过 standard input 和 standard output 通信。在这种 transport 中，client 把 agent 作为 subprocess 启动，agent 从 `stdin` 读取，向 `stdout` 写 protocol messages，并把 logs 写到 `stderr`。

ACP 的 remote HTTP/WebSocket transport 仍被描述为 draft/proposal，而不是既定 compatibility path。因此 Open Design 已实现的 ACP adapters 今天使用 stdio subprocesses。

## Open Design 发送的 messages

对于 `streamFormat: 'acp-json-rpc'`，Open Design 当前用这些 JSON-RPC methods 驱动 session：

1. `initialize`
   - 最先发送。
   - 包含 Open Design client metadata 和 `clientCapabilities`。
2. `session/new`
   - 创建 working session。
   - 包含 project working directory。
   - 当 runtime 允许使用 Open Design-provided tools 时，可能包含 MCP server descriptors。
3. `session/set_config_option` 或 `session/set_model`（可选）
   - 当用户选择非默认 model 时发送。
   - 如果 `session/new` 报告了 model config option，Open Design 优先使用 `session/set_config_option`；否则 fallback 到 `session/set_model`。
4. `session/prompt`
   - 以 text content 发送 composed user/system prompt。
   - 成功响应表示 prompt 已完成。
5. `session/cancel`
   - 当 session 存在且 stdin 仍 writable 时，在用户 cancellation 时发送。

## Open Design 期望 agent 返回的 messages

Runtime 应支持对应的 JSON-RPC responses 和 notifications：

1. 对 `initialize` 的 response。
2. 对 `session/new` 的 response。
   - 必须包含可用的 `sessionId`。
   - 如果可用，应报告 current model。
   - 如果通过 config options 支持 model selection，应报告 model config options。
3. 使用 `session/update` 的 notifications。
   - Open Design 当前会映射：
     - `agent_thought_chunk` 到 thinking output。
     - `agent_message_chunk` 到 assistant text output。
4. 可选的 `session/request_permission` requests。
   - Open Design 会在可用时自动选择 approve/allow 风格 option。
   - 如果没有可接受 option，turn 会 fast fail。
5. 对 `session/prompt` 的 response。
   - 如果可用，应包含 usage metadata。
   - 这个 response 告诉 Open Design 当前 turn 已结束。

## Process lifecycle expectations

- `stdout` 上的 protocol messages 必须保持 parseable JSON-RPC lines。
- Human-readable logs 和 diagnostics 写到 `stderr`。
- Protocol failures 返回清晰 JSON-RPC errors。
- `session/prompt` 完成后，要么在 stdin 关闭时干净退出，要么容忍 Open Design 在短 grace period 后发送 `SIGTERM`。
- 尽可能实现 `session/cancel`。当 transport 不再可用时，Open Design 会 fallback 到 process termination。
- 避免 interactive terminal prompts。如果需要 permission，请使用 ACP permission requests。

## Open Design adapter shape

Open Design 中的 ACP runtime definition 刻意保持很小：

```ts
export const myAgentDef = {
  id: 'my-agent',
  name: 'My Agent',
  bin: 'my-agent',
  versionArgs: ['--version'],
  fallbackModels: [{ id: 'default', label: 'default' }],
  buildArgs: () => ['acp'],
  streamFormat: 'acp-json-rpc',
} satisfies RuntimeAgentDef;
```

现有示例包括 `apps/daemon/src/runtimes/defs/` 下的 Devin、Hermes、Kimi、Kiro、Kilo 和 Vibe runtime definitions。

## Fact sources

- ACP transport documentation: <https://agentclientprotocol.com/protocol/transports>
  - ACP 使用 JSON-RPC。
  - Stdio transport 使用 standard input 和 standard output。
  - 在 stdio mode 中，client 将 agent 作为 subprocess 启动。
  - Agent 从 `stdin` 读取，向 `stdout` 写 protocol messages，并用 `stderr` 输出 logs。
- ACP remote transport RFD: <https://agentclientprotocol.com/rfds/streamable-http-websocket-transport>
  - 将 Streamable HTTP / WebSocket 描述为 proposed remote transport direction。
  - 说明 ACP 的 standard transport 历史上一直是 stdio，且 standard remote transport 仍在定义中。
- Open Design implementation：
  - `apps/daemon/src/acp.ts` 实现 ACP JSON-RPC session lifecycle。
  - `apps/daemon/src/server.ts` 以 child processes + piped stdio 方式启动 ACP runtimes。
  - `apps/daemon/src/runtimes/defs/*.ts` 包含使用 `streamFormat: 'acp-json-rpc'` 的现有 ACP runtime definitions。
