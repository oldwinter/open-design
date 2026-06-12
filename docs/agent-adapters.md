# Agent Adapters

**父文档：** [`spec.md`](spec.md) · **同级文档：** [`architecture.md`](architecture.md) · [`skills-protocol.md`](skills-protocol.md) · [`new-agent-runtime-acp.md`](new-agent-runtime-acp.md) · [`modes.md`](modes.md)

Adapter layer 是 OD 最承重的设计决策。我们把**整个 agent loop** 交给用户已有的 code agent CLI：model calls、tool use、context management、permission handling、resume、cancel 都由它负责。OD 的职责是检测它、喂给它 skill + prompt + working directory，并把输出流式送回 Web UI。

如果你要添加新的 ACP-backed runtime，请先读 [`new-agent-runtime-acp.md`](new-agent-runtime-acp.md)，了解预期的 stdio transport、JSON-RPC message flow 和 process lifecycle contract。

> **核心论点：** code agent 生态已经收敛出几种强实现（Claude Code、Codex、Devin for Terminal、Cursor Agent、Gemini CLI、OpenCode、OpenClaw、Qoder CLI）。再重写一个不如直接和它们都通信。
>
> **灵感来源：** [multica](https://github.com/multica-ai/multica)（PATH-scan detection + daemon architecture）和 [cc-switch](https://github.com/farion1231/cc-switch)（per-agent config format knowledge + symlink-based skill distribution）。

---

## 1. Adapter interface (TypeScript)

每个 adapter 都实现这个 interface。当前 adapter 实现在 [`apps/daemon/src/agents.ts`](../apps/daemon/src/agents.ts)。

```ts
interface AgentAdapter {
  readonly id: string;                      // "claude-code" | "codex" | …
  readonly displayName: string;

  // -- discovery --------------------------------------------------
  detect(): Promise<AgentDetection | null>; // null if not installed

  // -- capability negotiation ------------------------------------
  capabilities(): AgentCapabilities;

  // -- execution -------------------------------------------------
  run(params: AgentRunParams): AsyncIterable<AgentEvent>;
  cancel(runId: string): Promise<void>;
  resume?(runId: string, message: string): AsyncIterable<AgentEvent>;
}

interface AgentDetection {
  executablePath: string;                   // absolute path to CLI
  version: string;
  configDir?: string;                       // e.g. ~/.claude
  skillsDir?: string;                       // e.g. ~/.claude/skills
  authState: "ok" | "missing" | "expired";
}

interface AgentCapabilities {
  surgicalEdit: boolean;                    // can edit a targeted region without rewriting file
  nativeSkillLoading: boolean;              // picks up ~/.<agent>/skills/ automatically
  streaming: boolean;                       // emits tool calls in real time
  resume: boolean;                          // can continue an interrupted run
  permissionMode: "strict" | "permissive" | "none";
  contextWindowHint?: number;               // in tokens
}

interface AgentRunParams {
  runId: string;
  cwd: string;                              // absolute path — artifact dir
  systemPrompt: string;                     // skill's SKILL.md body + DESIGN.md excerpt
  userPrompt: string;
  skillDir?: string;                        // if set, adapter should make skill files available
  allowedTools?: string[];                  // for agents that support it
  timeoutMs?: number;
}

type AgentEvent =
  | { type: "thinking"; text: string }
  | { type: "tool_call"; name: string; input: unknown; id: string }
  | { type: "tool_result"; id: string; output: unknown }
  | { type: "text_delta"; text: string }
  | { type: "file_write"; path: string }   // synthesized by adapter if agent doesn't emit natively
  | { type: "error"; error: string }
  | { type: "done"; reason: "completed" | "cancelled" | "error" };
```

## 2. Detection strategy

Daemon 启动时并行运行所有 adapter 的 `detect()`，然后把结果缓存在 `~/.open-design/agents.json`，TTL 为 24 小时。Daemon 收到 `SIGHUP` 时重新检测。

每个 adapter 使用**两类信号**：

1. **PATH scan。** 对每个已知 executable name 运行 `which <binary>`。很快（<10ms）。
2. **Config-dir probe。** 检查 `~/.claude/`、`~/.codex/`、`~/.cursor/` 等目录。这能覆盖 CLI 通过 npm global 安装到 shell-specific PATH 的场景。

如果两个信号一致，检测结果为高置信度。如果只有一个信号命中，则标记 `authState: "missing"`，并提示用户运行该 CLI 的 auth flow。

## 3. Adapter catalog (v1 target)

| Adapter | CLI command | Config dir | Skills dir | Native skill loading | Surgical edit | Streaming | Priority |
|---|---|---|---|---|---|---|---|
| **claude-code** | `claude` | `~/.claude/` | `~/.claude/skills/` | ✅ | ✅ | ✅ | P0 (MVP) |
| **amp** | `amp` | `~/.config/amp/` | n/a (via `amp skill add`) | ❌ (prompt-injected) | ✅ | ✅ (`-x --stream-json`, Claude-compatible) | P2 |
| **api-fallback** | *(direct Anthropic API)* | — | — | ❌ (prompt-injected) | 〜 | ✅ | P0 (MVP) |
| **codex** | `codex` | `~/.codex/` | `~/.codex/skills/` | 〜 (varies by version) | 〜 (regenerate w/ scoping) | ✅ | P1 |
| **devin** | `devin` | `~/.config/devin/` | `~/.config/devin/skills/` | ✅ | ✅ | ✅ (`acp-json-rpc`) | P1 |
| **cursor-agent** | `cursor-agent` | `~/.cursor/` | n/a (via project `.cursorrules`) | ❌ (prompt-injected) | ✅ | ✅ | P1 |
| **gemini-cli** | `gemini` | `~/.config/gemini/` | ❌ | ❌ (prompt-injected) | ❌ (regenerate) | ✅ | P2 |
| **opencode** | `opencode` | `~/.opencode/` | 〜 | 〜 | ✅ | P2 |
| **openclaw** | `openclaw` | `~/.openclaw/` | 〜 | 〜 | 〜 | P2 |
| **copilot** | `copilot` | `~/.copilot/` | ❌ | ✅ (`edit` tool) | ✅ (`--output-format json` JSONL) | P2 |
| **kiro** | `kiro-cli` | `~/.kiro/` | ❌ | ✅ | ✅ (`acp-json-rpc`) | P2 |
| **kilo** | `kilo` | — | ❌ | ✅ | ✅ (`acp-json-rpc`) | P2 |
| **vibe** | `vibe-acp` | `~/.vibe/` | ❌ | ✅ | ✅ (`acp-json-rpc`) | P2 |
| **trae-cli** | `traecli` | Trae CLI config | Trae CLI managed | ❌ (prompt-injected) | ✅ | ✅ (`acp-json-rpc`) | P2 |
| **deepseek** | `deepseek` | `~/.deepseek/` | `~/.deepseek/skills/` | ❌ (prompt-injected) | ✅ | ✅ (plain text) | P2 |
| **qoder** | `qodercli` | Qoder CLI config | Qoder CLI managed | ❌ (prompt-injected) | ✅ | ✅ (`stream-json`) | P2 |
| **pi** | `pi` | `~/.pi/agent/` | `~/.pi/agent/skills/` | ❌ (prompt-injected) | ✅ | ✅ (`pi-rpc` JSON-RPC) | P2 |

“P0/P1/P2” 对应 [`roadmap.md`](roadmap.md) 中的 roadmap phases。

## 4. Skill injection per adapter

Skill 通过以下三种策略之一进入 agent，按优先级排序：

### 4.1 Native skill loading（首选）

Agent 启动时扫描自己的 `~/.<agent>/skills/`。我们把 OD 的 skill symlink 到该目录（见 [`skills-protocol.md`](skills-protocol.md) §3），让 agent 原生加载它。没有 prompt token 开销。

- **适用：** Claude Code。Codex（取决于版本）。OpenCode。

### 4.2 Prompt injection（fallback）

我们读取 skill 的 `SKILL.md` body 和它拥有的任何 `references/*.md` 文件，把它们拼接进 system prompt，并把 `assets/` 文件复制进 cwd。Agent 不知道“skills”概念，但能得到指令。

- **适用：** 所有 adapter。API fallback、Cursor Agent、Gemini CLI 默认使用它。
- **成本：** 每次 run 消耗更多 tokens。缓解方式：把 `references/` 裁到 skill body 真正提到的文件。

### 4.3 File-placed workflow（hybrid）

对于支持 `AGENTS.md` / `.cursorrules` / 类似 project-level instruction files 的 agent（Cursor Agent、OpenCode），我们会在 artifact cwd 中写入 project-scoped instruction file，然后再运行 agent。Agent 会自动读取它。

- **适用：** Cursor Agent（`.cursorrules`）、部分 OpenCode 配置。

Adapter 通过 `capabilities().nativeSkillLoading` 和私有 `skillInjectionStrategy` 字段声明采用哪种策略。

## 5. Per-adapter notes

### 5.1 Claude Code（reference implementation）

- Invocation: `claude --print --output-format stream-json --cwd <artifact-dir> "<prompt>"`.
- Streaming format: stdout 上的 JSON Lines；每行都是一个 event，可直接映射到 `AgentEvent`。
- Skill loading: native。只需确保 skill 已 symlink 到 `~/.claude/skills/`。
- Surgical edits: 使用 `Edit` tool；Claude Code 自己的 loop 会处理。
- Permission: 设置 `--allowed-tools "Read,Edit,Write"`，限制 blast radius。
- Cancel: 发送 `SIGTERM`；Claude Code flush 后退出。
- **Gotchas:** Claude Code 的 JSON stream schema 有版本；固定已知版本，mismatch 时 warning。

### 5.2 API fallback（无 CLI）

- Invocation: 直接调用 Anthropic Messages API，`stream: true`。
- Skill loading: 仅 prompt injection，读取 skill dir 并全部 inline。
- Tool use: 我们注册 `Read/Write/Edit` tools，在 daemon 中基于 artifact cwd 实现它们，并自己运行 loop。这是 OD 唯一拥有 loop 的地方，因为用户没有任何 agent。请保持它尽量 dumb。
- Surgical edits: 通过在 prompt 中写 “only change X” 并重新生成整个目标文件来近似实现。
- Model: 默认 Claude Sonnet 4.6；Opus 4.7 behind a flag。
- **为什么还要发布这个？** Topology C 需要它（pure-Vercel deploy 中没有 daemon）。另外，没有安装 CLI 的首次体验用户也能得到可工作的路径。

### 5.3 Codex

- Invocation: `codex exec --cwd <dir> "<prompt>"`.
- Streaming: line-based；用 regex-based state machine 解析。比 Claude Code 的 JSON stream 信息少。
- Skill loading: 取决于版本。新版 Codex 读取 `~/.codex/skills/`；旧版不读取。根据 version string 检测；fallback 到 prompt injection。
- Surgical edits: Codex 有 edit tool，但 tool-call schema 差异较大，v1 中选择 regenerate files。v2 再重看。
- **Gotcha:** Codex CLI auth state 可能是“authenticated to wrong org”。Detect 时运行 `codex whoami` 来识别。

### 5.4 Devin for Terminal

- Invocation: `devin --permission-mode dangerous --respect-workspace-trust false acp`.
- Install/update: macOS/Linux/WSL 用户可用 `curl -fsSL https://cli.devin.ai/install.sh | bash` 安装；已有安装运行 `devin update`。
- Version requirement: 需要包含 `devin acp` subcommand 的 Devin CLI build（已用 `devin 2026.5.1-1` 验证）。用 `devin acp --help` 检查；如果 subcommand 缺失，请 update 或 reinstall Devin for Terminal。
- Streaming: Agent Client Protocol JSON-RPC over stdio，由 daemon 共享的 `acp-json-rpc` transport 处理。
- Skill loading: Devin 支持 `.devin/skills/` 与 `~/.config/devin/skills/`；OD 当前 daemon 也会把选中的 skill body prompt-inject 进 composed prompt，因此生成时不要求 per-project skill install。
- Surgical edits: Devin 自己的 edit/write tools 会处理 targeted changes。
- Permission: `--permission-mode dangerous` 避免 Web UI 中出现 headless approval prompts；`--respect-workspace-trust false` 确保 Devin 不会因为新建 project dirs 的 trust prompt 卡住。Devin 内部仍遵守 org/team-level policies。

### 5.5 Cursor Agent

- Invocation: `cursor-agent --workspace <dir> "<prompt>"`（粗略；实现时需和 CLI docs 核对）。
- Streaming: 支持 JSON lines。
- Skill loading: 没有 native skill 概念。运行前把 `.cursorrules` 写入 artifact dir。Rules file 包含 skill 的 `SKILL.md` body（去掉 front-matter）。
- Surgical edits: Cursor 的 inline edit tool 很强；把我们的 `refine` call 映射到它的 edit protocol。
- **Gotcha:** Cursor Agent 操作 workspace，而不是单文件。把 workspace 限定为 artifact dir，避免过宽修改。

### 5.6 Gemini CLI

- Invocation: `gemini`，composed prompt 通过 **stdin** 传入（没有 `-p` flag）。当 stdin 是 pipe 且不提供 `-p` flag 时，Gemini CLI 会自动进入 headless mode，已用 `gemini@0.1.x` 验证。
- Trust: spawned process 中设置 `GEMINI_CLI_TRUST_WORKSPACE=true`，不传 `--skip-trust`，因为后者在 Gemini CLI 各版本间较脆。
- Streaming: 支持，`--output-format stream-json` 到 stdout。
- Skill loading: 仅 prompt injection。
- Surgical edits: regenerate whole file。
- **Gotcha — Windows 上的 `spawn ENAMETOOLONG`:** 把完整 composed prompt 作为 `-p <string>` CLI argument 会撞到 Windows `CreateProcess` 对整条命令行约 32 KB 的硬限制。修复方式是在 agent definition 中设置 `promptViaStdin: true`，spawn 后把 prompt 写入 `child.stdin`。Daemon 的 `/api/chat` handler 会检查这个 flag，把 stdin 打开为 pipe，而不是 `'ignore'`。
- **Gotcha:** Gemini 的 tool-use format 不同；当实现该能力时，我们会把自己的 file-write tool 转成它的 `file_tool` 等价物。

### 5.7 OpenCode / OpenClaw

这些 CLI 成熟度较低，目标 P2。预计会有颠簸；adapter implementation 很可能是最薄的一层：“shell out, parse output, synthesize events”。

### 5.8 GitHub Copilot CLI

- Invocation: `copilot -p "<prompt>" --allow-all-tools --output-format json --add-dir <skills> --add-dir <design-systems>`。非交互模式必须带 `--allow-all-tools`，否则 CLI 每次 tool call 都会阻塞等待人工 approval。与 Codex（`exec` 是专用 headless subcommand，内置 auto-approve）或 Claude Code（permission policy 继承 `~/.claude/settings.json`）不同，Copilot 的 `-p` mode 默认总会提示，必须显式传入此 flag。`--add-dir` 可重复，用来扩大 path-level sandbox，让 Copilot 读取项目 cwd 外的 skill seeds 和 design-system specs。
- Streaming: `--output-format json` 输出 JSONL，形态和 Claude Code 的 stream-json 一样有表现力（`assistant.reasoning_delta`、`assistant.message_delta`、`tool.execution_start/complete`、`result`）。`apps/daemon/src/copilot-stream.ts` 把它们映射到与 `claude-stream.ts` 相同的 UI events。
- Skill loading: 仅 prompt injection。Github Copilot 的 tool catalog 中有 `skill` tool，native format 值得以后 reverse-engineer。
- Surgical edits: 专用 `edit` tool。
- Detection 假设 Copilot 已认证，路径包括：`copilot login`（subcommand，OAuth device flow），或无 args 启动 `copilot` 后使用交互式 `/login` slash command。

### 5.9 Qoder CLI

- Invocation: `qodercli -p --output-format stream-json --permission-mode bypass_permissions --cwd <dir> [--model <id>] --add-dir <absolute-skills-dir> --add-dir <absolute-design-systems-dir>`，composed prompt 通过 stdin 传入。Print mode 在 turn 后退出，符合 daemon 的 one-request chat lifecycle。OD 中 Qoder 当前是 text-only；`_imagePaths` 有意忽略，因为 Qoder CLI 还没有为这条 adapter path 暴露受支持的 multimodal flag。
- Streaming: `--output-format stream-json` 输出 JSONL records，例如 `system/init`、`assistant`、`result`。`apps/daemon/src/qoder-stream.ts` 把 assistant content blocks 映射到 text deltas，把没有 text 的 assistant errors 映射到 typed error events，并把 result usage、model usage、cost、duration、stop reason 和 unknown records 保留为 raw events。
- Models: 提供 `default`、`lite`、`efficient`、`auto`、`performance`、`ultimate` 的 fallback hints。选择 `default` 时省略 `--model`，让 Qoder 自己的 CLI configuration 继续作为权威。
- Skills: v1 仅 prompt injection。`--add-dir` 可重复，因此 Qoder 可以读取 active project cwd 外的 absolute skill 和 design-system roots；daemon 不转发 relative extra directory entries。
- Permission: `--permission-mode bypass_permissions` 避免 Web UI 中的 headless approval prompts。用户应把它理解为在所选 project directory 中直接用同一 flag 运行 Qoder 的 trust posture。
- **Gotcha:** Detection 只证明 `qodercli --version` 能运行。Qoder authentication 和 account scope 归 Qoder CLI 自己管理，credentials 从 Qoder 的 `~/.qoder/config.json` 读取；daemon 不运行 login，也不编辑 Qoder config，而是把 spawned run 的 stderr/stdout failures 透出。

### 5.10 Trae CLI

- Invocation: `traecli acp serve --yolo`，使用 daemon 共享的 ACP JSON-RPC transport。Adapter 遵循 Trae CLI 公开 ACP entrypoint，文档位于 https://www.volcengine.com/docs/86677/2227861?lang=zh。
- Streaming: `acp-json-rpc`；daemon 使用与其他 ACP-backed adapters 相同的 ACP event path。
- Models: 通过 ACP handshake 动态发现。如果 model discovery 失败，picker 回退到 CLI 的默认配置，不要求 CI 或 startup detection 登录 Trae CLI。
- Skills: v1 仅 prompt injection。External MCP servers 可以通过已有 `acp-merge` path 转发进 ACP launch descriptor。
- Permission: `--yolo` 避免 Web UI 中的 headless approval prompts。这遵循 adapter catalog 中针对 Devin、Copilot、Qoder、DeepSeek 等 CLI 的既有非交互 permission posture：daemon 运行 agent CLI 时没有 TTY，因此不能依赖交互式 tool-approval prompt 推进。
- **Gotcha:** Detection 只证明当前环境能运行 `traecli --version` 和 model discovery。Trae CLI 自己管理 login、account scope 和 model entitlement；daemon 不运行 login flows，也不编辑 Trae CLI configuration。

### 5.11 Pi

- Invocation: `pi --mode rpc [--model <id>] [--thinking <level>] [--append-system-prompt <dir> …]`，composed prompt 通过 JSON-RPC over stdin 传入。Daemon 发送一个 `prompt` command（multimodal input 可选带 `images`），pi 流式返回 typed events 直到 `agent_end`。Pi 的 RPC process 在 `agent_end` 后仍保持存活（为 multi-prompt sessions 设计）；由于 `/api/chat` 是 single-shot，daemon 会关闭 stdin，并在 grace period 后 SIGTERM。
- Streaming: `pi-rpc` JSON-RPC over stdio。Events 包括 `agent_start`、`turn_start/end`、`message_update`（text deltas、thinking deltas、tool calls）、`tool_execution_start/end`、`compaction_start`、`auto_retry_start/end`、`extension_error`。`apps/daemon/src/pi-rpc.ts` 把它们映射到与 `claude-stream.js` / `copilot-stream.js` / `acp.js` 相同的 UI event set。来自 `extension_error` 和耗尽的 `auto_retry_end` 的 error events 会走 `sendAgentEvent`，因此 daemon 的 empty-output guard 和 `agentStreamError` flag 会生效（与 issue #691 后的 qoder-stream-json 和 json-event-stream 相同路径）。
- Models: 动态发现；`pi --list-models` 会向 stderr 打印 TSV table，daemon 解析为 provider/model picker entries。List command 超时时提供最常见 providers/models 的 fallback hints。
- Images: pi 的 RPC `prompt` command 支持 `images` 字段（base64-encoded `ImageContent` objects）。Daemon 在 session attach 时读取通过验证的 `imagePaths`，并把它们放入 prompt command。不可读图片会跳过，而不是让 run 失败。
- Skills: v1 使用 prompt injection。`extraAllowedDirs`（skill seed 和 design-system 目录）会作为可重复 `--append-system-prompt` flags 转发，让 agent 知道这些目录存在、可读取其中的文件。pi 没有 `--add-dir` sandbox flag，它使用 OS cwd，因此 system-prompt hints 是唯一可用机制。**重要：** `--append-system-prompt` 只是在 system prompt 中提示路径；它不会授予 sandbox 或 filesystem access。pi 的 Read tool 通常可以打开 cwd 外的 absolute paths，但当 absolute reads 失败时（sandboxed environments、restricted permissions），可靠 fallback 是在 run 前把需要的文件复制进 project cwd。今天没有更强的 pi flag 能做到这一点。
- Thinking: daemon 在 Settings model picker 中暴露 pi 的 `--thinking` levels（`off`、`minimal`、`low`、`medium`、`high`、`xhigh`）。
- Extension UI: 自动解析。pi 的 RPC protocol 可以请求用户 dialogs（`select`、`confirm`、`input`、`editor`）和 fire-and-forget notifications（`setStatus`、`setWidget`、`notify`、`setTitle`、`set_editor_text`）。Dialog methods 会自动 approve（confirm → true，select → first option），fire-and-forget methods 会静默消费，因为 Web UI 没有对应 surface。
- **Gotcha:** pi 的 RPC `prompt` response 是异步的，`success: true` 只表示 prompt 已被接受，不表示 agent 已完成。接受后的 agent failures 会通过正常 event stream 暴露（`extension_error`、`success: false` 的 `auto_retry_end`）并触发 empty-output guard。

### 5.12 DeepSeek TUI

- Invocation: `deepseek exec --auto [--model <id>] "<prompt>"`。`deepseek` dispatcher 拥有 `exec` / `--auto` subcommands，并在 exec 时委托给同级 `deepseek-tui` runtime binary；upstream 文档说明两个 binary 都需要（npm 和 cargo 路径会一起安装）。我们只 probe dispatcher；`deepseek-tui` 自身不接受这组 argv，因此把它作为 fallback 宣告可用会导致第一轮 chat run 失败。未来版本可以让 resolution + buildArgs 知道实际选中的 binary，并发出经过验证的 `deepseek-tui` invocation，同时加 regression test 覆盖这条路径。
- Streaming: non-`--json` mode 下 stdout 输出 plain text deltas（tool-call notifications 走 stderr）。跳过 `--json` 是有意的：`deepseek exec --json` 会把整轮 run batch 成最后一个 summary object，而不是 streaming；这会让 chat UI 卡到 end-of-turn。
- Auto-approval: `--auto` 启用 agentic mode，采用 YOLO permission posture。Daemon 运行所有 CLI 时都没有 TTY，否则 interactive approval prompt 会挂住 run。
- Skills: v1 仅 prompt injection。DeepSeek TUI 会按 first-wins 顺序扫描 `.agents/skills`、`skills`、`.opencode/skills`、`.claude/skills`、`~/.deepseek/skills`，未来版本可以像 Claude Code 一样切到 file-placed skill loading。
- Prompt delivery: positional argv（没有 stdin sentinel；clap 声明 `prompt: String` 为 required field）。这意味着非常大的 composed prompt 可能撞到 Windows 约 32 KB 的 `CreateProcess` 限制；典型 chat prompts 通常没问题。如果 upstream 支持 `-` stdin sentinel，我们就能像其他 adapters 一样把它切到 `promptViaStdin: true`。为避免 oversized prompt 只暴露为泛泛的 `spawn ENAMETOOLONG` / `E2BIG`，adapter 声明 `maxPromptArgBytes`（当前 30,000），`/api/chat` 通过三个互补 guards 强制执行：快速的 pre-bin-resolution `checkPromptArgvBudget` 检查 raw composed prompt bytes；post-`buildArgs` 的 `checkWindowsCmdShimCommandLineBudget` 在 resolved binary 是 Windows `.cmd` / `.bat` shim 时，按 platform layer 在 Windows 上相同的 per-arg quote-doubling 规则重算即将传给 `cmd.exe /d /s /c "<inner>"` 的 command line；以及 sibling `checkWindowsDirectExeCommandLineBudget`，在 resolved binary 是非 shim Windows install（例如 cargo-built `deepseek.exe`）时，用 libuv 的 `quote_cmd_arg` 规则（每个 `"` 变成 `\"`，quote 附近的 backslashes 加倍）重算同一命令行。在一次 resolution 中两个 Windows guards 互斥：cmd-shim guard 负责 `.cmd`/`.bat`，direct-exe guard 负责其他路径。三者合起来可以抓住 quote-heavy prompts（code blocks、JSON-shaped skill seeds），这些 prompt 可能低于 raw byte budget，但在任一安装路径上扩展后超过 CreateProcess 的 32_767-char `lpCommandLine` 上限。三个 guards 都发出同样可操作的 `AGENT_PROMPT_TOO_LARGE` SSE error，提示用户减少 skills/design-system context、缩短 conversation，或选择支持 stdin 的 adapter；三者都有 unit tests（oversized + short-prompt branches、两个 Windows paths 的 quote-heavy regressions，以及 mutual-exclusivity check），避免 guard 静默退化。
- Models: 提供 `deepseek-v4-pro` 与 `deepseek-v4-flash` 作为 fallback hints（1M-token context windows、native thinking-mode streaming）。用户可在 Settings dialog 的 custom-model input 中粘贴任意其他 id（例如 `nvidia-nim/deepseek-v4-pro`、`fireworks/deepseek-v4-flash`）。
- **Gotcha — auth state is not auto-detected.** DeepSeek TUI 从 `~/.deepseek/config.toml` 或 `DEEPSEEK_API_KEY` 读取 API key。如果用户未运行 `deepseek auth set --provider deepseek`（或设置 env var），第一次 run 会报一个不可操作的错误。当前 detection 只根据 binary 在 PATH 上报告 `available: true`；后续可通过 `deepseek doctor --json` 暴露 auth state。

## 6. Capability-driven UI

Web UI 读取 `agents.capabilities()`，并禁用 active adapter 不支持的功能：

| UI feature | Requires | If missing |
|---|---|---|
| Comment mode（点击 refine） | `surgicalEdit: true` | 隐藏，并用 tooltip 解释原因 |
| Streaming tool-call feed | `streaming: true` | 仅显示 spinner |
| Resume interrupted run | `resume: true` | 只能 “Cancel + restart” |
| Skill picker shows skill with `od.capabilities_required` | all listed caps | Skill 置灰并显示原因 |

这就是我们避免 “works on my Claude Code, breaks on your Gemini” 的方式：检测、降级、记录。

## 7. Agent switching

用户可以按 session 切换 active agent：

```text
POST agents.setActive { agentId: "codex" }
→ capabilities() reported
→ web UI refreshes feature gates
→ next generation runs on Codex
```

不允许 mid-run 切换（先 cancel）。Artifact 与 agent 无关；只有 generation process 不同。

## 8. Fallback chain

如果用户偏好的 agent 失败（crash、auth、timeout），OD 会按以下顺序提供 one-click fallback：

1. 用户偏好的 agent（例如 Cursor Agent）
2. 任何其他已检测到的 agent（如果安装了 Claude Code，就用它）
3. API fallback（direct Anthropic，需要 key）

Fallback 需要用户显式 opt in；我们不会静默切换，因为某个 skill 可能是为特定 agent capabilities 编写的。

## 9. Detection UX

首次运行：

```text
$ pnpm tools-dev run web
[od] daemon starting on :7456
[od] detecting agents…
[od]   ✓ claude-code v0.6.3 (auth: ok, skills dir linked)
[od]   ✓ codex v0.8.1 (auth: ok)
[od]   ✗ cursor-agent (not installed)
[od]   ✗ gemini-cli (installed but not authenticated; run `gemini auth login`)
[od]   ✓ api-fallback (ANTHROPIC_API_KEY found)
[od] daemon ready; 3 agents available
```

Web UI 会在 agent-selector dropdown 中镜像这些信息；未认证 agent 会置灰，并显示修复 tooltip。

## 10. Authorization boundaries

我们继承底层 agent 的 permission model，而不是自己再造一套。这意味着：

- **Claude Code** 尊重自己的 `--allowed-tools` 和 `--permission-mode` flags。OD 透传用户偏好。
- **Codex / Cursor** 按 workspace sandbox；OD 总是把 cwd 设置为 artifact dir，因此默认不可见外部内容。
- **Qoder CLI** 为非交互 Web execution 使用 `--permission-mode bypass_permissions`，并由 daemon 的 cwd 加显式 absolute `--add-dir` entries 限定 scope。
- **API fallback** 是唯一由我们拥有的场景。我们实现 whitelist：只有 `Read`、`Write`、`Edit` tools，全部 root 在 artifact cwd。

Daemon 绝不会为了“方便”给 agent 比它自己原本更多的权限。我们不在 privileged mode 下运行 agent。

## 11. Adapter source layout

```text
apps/daemon/
├── base.ts                 # shared interface + utility helpers
├── claude-code/
│   ├── adapter.ts
│   ├── stream-parser.ts    # JSON-lines → AgentEvent
│   └── detect.ts
├── api-fallback/
│   ├── adapter.ts
│   ├── tool-loop.ts        # the minimal tool-use loop
│   └── tools.ts            # Read/Write/Edit implementations
├── codex/                  # Phase 1
├── cursor-agent/           # Phase 1
├── gemini-cli/             # Phase 2
├── opencode/               # Phase 2
└── openclaw/               # Phase 2
```

每个 adapter 都是独立 module，这样社区贡献者可以添加新 adapter，而不必改 core daemon code。

## 12. Open questions

- **Nested agents。** 如果 Claude Code 的 agent 自己 spawn subagent 怎么办？我们只能收到外层 process 的 events。v1 policy：只展示 top-level events；把 subagent activity 总结为 “sub-task” placeholder。
- **Billing awareness。** 有些 agents 按 message 计费，有些按 token。OD 在 MVP 中不追踪 cost；v1 会为暴露 usage 的 adapters 添加可选 “usage” event。
- **Windows support。** Windows 上 PATH scanning 和 `spawn` 语义不同。v1 目标是 macOS 和 Linux；Windows best-effort。已修复的已知问题：Windows 上运行 Gemini CLI（以及其他 plain-text agents）时的 `spawn ENAMETOOLONG`，通过把 composed prompt 走 stdin 而不是 CLI argument 解决（见 §5.5）。
- **Docker-contained agents。** 有些用户在 container 里运行 Claude Code。Adapter 需要 “remote” mode，可能还是同一 interface，但通过 SSH 通信。Phase 2+。
