# Agent CLI 会话复用（codex / opencode / AMR）

设计文档（面向 human/reviewer）。每个 slice 的实现 runbook 会在 build 时单独编写。

状态：proposed · Parent: #3408 · 上游背景：amr-latency-session-reuse-prompt-cache.md

## Why

- **Use case**：后续轮次很慢，而且会消耗余额，因为 daemon 每一轮都会把整段 conversation 作为 cache-cold input 重新付费。对约 24 个 agents 中的约 22 个，daemon 每轮都会把历史展平成一个新的 user message（`buildDaemonTranscript`），并从零启动 agent；agent 会重建自己的结构，上游 prefix cache 也不再匹配上一轮。
- **Pain**：只有带 `resumesSessionViaCli` 的 adapters（今天是 claude / codebuddy，以及通过 `pi-rpc` 的 pi）会跳过重发，让 CLI 保持自己的 session。其他会 recompose、且 CLI/runtime **原生支持 session continuation** 的 agents 没有利用这个能力。我们可以恢复它们，命中仍然温热的 cache，且不需要改上游/provider。
- **本文档范围**：把 native session resume 泛化到我们能通过自身 CLI/runtime 端到端控制的 agents：**codex**（约 23% 用户）、**opencode direct**（约 16%），并协调 **AMR runtime** resume（它自己的 session-reuse 工作在 AMR runtime repo 中）。目标是解决今天即便连续两轮也会出现的 in-window cache miss；上游 cache TTL 是另一个独立 lever。

## Sources · 已验证事实（2026-06-22 实测，真实 CLIs）

- **Recompose default**：`apps/web/src/providers/daemon.ts` 中 `buildDaemonTranscript` 会无条件调用；`server.ts` 只在 `resumesSessionViaCli` 上跳过重发。今天具备 resume 能力的是 claude、codebuddy、pi。
- **codex**（`codex exec`、`json-event-stream`）：第一个 stream event 是 `{"type":"thread.started","thread_id":"<uuid>"}`，这就是 resume handle。`codex exec resume <thread_id> <prompt>` 会继续该 thread；sessions 持久化在 `~/.codex/sessions/<date>/rollout-...-<thread_id>.jsonl` 下，新进程也能 resume。**实测（连续轮次）：** resume 每次调用 cache **96%**，flattened-resend **39%**（uncached **499** vs **7750**），约少 15 倍 recomputed tokens。⚠️ **Accounting gotcha**：codex 的 `turn.completed.usage` 是 *cumulative session* 总量，**不是** per-turn call；要读 per-call 数字（rollout `token_count.last_token_usage`），否则收益看起来像损失。
- **opencode**（`opencode run`）：`-s <session-id>` / `-c` 会继续持久化 session；`--format json` 报告 per-step `tokens.cache.{read,write}`。**实测：** resume turn-2 = `input 162 + cache_read 8192`（约 98% reused）；fresh turn-1 = `cache_read 0`。
- **AMR runtime**：支持 session continuation；runtime 层已验证 cross-process session reload（在 AMR runtime repo 跟踪）。daemon 侧通过与 CLI agents 相同的 resume infra 协调，不走 AMR-specific parallel path。
- **Resume failure 可按 agent 检测**：codex `Error: thread/resume: ... no rollout found for thread id <id>`；opencode HTTP `404 NotFoundError "Session not found"`；AMR runtime 会发出 resume-fallback signal。

## Goals / Non-goals

- **Goals**：让 follow-up turns 恢复 agent 自己的 session（不再 flattened-history resend），使该轮第一笔上游调用复用 warm prefix cache；保留强 fallback，确保缺失 session 永远不会破坏 conversation。
- **Non-goals**：延长上游 cache TTL（独立 lever；deepseek auto-cache TTL 不可设置，所以 multi-minute human gaps 仍可能变冷）；cross-user cache；修复 `buildDaemonTranscript` fidelity（我们无法从 flattened text 重建 agent 的 native cached structure，例如 signed thinking、structured tool rounds；所以修复方式是“让 agent 保持自己的 session”，不是“改进我们的 reassembly”）。

## Proposed design（daemon）

### Capture-style vs specify-style session ids

现有 infra 是 "specify-style"：daemon 生成 `newSessionId`，并通过 claude 的 `--session-id` 传入。codex/opencode/AMR 是 **capture-style**：agent 生成自己的 id，我们必须从 stream 捕获并存储它。增加 capture support，让 agent 报告的 resume handle 持久化到 `agent_sessions`，并在下一轮 replay。

### Per-slice

1. **codex** — 设置 `resumesSessionViaCli`；当存在 stored handle 时，`buildArgs` 发出 `exec resume <id>`，否则发出 `exec`（并从 `thread.started` 捕获 `thread_id`）。注意：`exec resume` **不接受** `--sandbox`；要一致地传 sandbox/config（通过 `-c` 或 bypass flag），让 per-turn context block 与 create turn byte-match，避免破坏 prefix。Resume turns 使用 `skipTranscript`。
2. **opencode direct** — 同样形状：捕获 session id，resume 时使用 `run -s <id>`，并 `skipTranscript`。（AMR-via-runtime 的 opencode path 是独立路径，通过 AMR adapter 协调，不属于这个 CLI path。）
3. **AMR adapter** — 从 session setup 捕获 runtime 的 durable session handle，存储它，并在下一轮通过现有 resume coordination 请求 resume；handle 有效时 `skipTranscript`。

### Session-missing fallback（robustness，关键 safety net）

- 两层防护，对应 user-facing requirement：
  - **消除我们侧的 reuse-breakers**（我们能控制的事）：agent 的 session store directory 必须在同一 conversation 的 daemon spawns 间保持**稳定**。不要在不同轮次间移动 `CODEX_HOME` / runtime data dir（sandbox toggle、namespace、packaged-vs-dev），也不要每轮删除。目录变化会让 session 找不到。
  - **DB transcript fallback**（我们不能控制的事：用户删除、corruption、换机器）：检测 agent 的 session-not-found signal → 清除 `agent_sessions` 中的 stale handle → 启动 fresh session，并**重新 seed 完整 flattened transcript**（`skipTranscript=false`）。我们已经存储完整 transcript（`messages.content` + `events_json`），所以 worst case 是**带完整 context 的一次 cold turn**，而不是 broken/amnesiac conversation。这与现有 claude `isClaudeResumeFailure` fallback 字节级一致，只是泛化了。
- 净效果：**only-upside**。session 存在且 warm 时命中 cache；session 缺失时，对那一轮退化到今天的行为。

### Resume identity & invalidation tuple

存储的 `agent_sessions` row 按 `(conversation_id, agent_id)` key，在此工作之前只包含 `session_id` + `stable_prompt_hash`。这**不足以**判断 resume 是否安全：它没有编码 model、cwd，也没有记录 session 上次运行时 conversation 已推进到哪里。所以 model/cwd 切换，或另一个 agent（或 edit）新增了 upstream session 没见过的 turns 时，仍会继续 resume stale session，并静默丢掉可见 state。`skipTranscript` 路径必须显式基于 **resume identity** gating，而不是“有 row 就行”。

Session row 除 `session_id`、`stable_prompt_hash` 外，还要存：

- `model` — 创建 upstream session 时使用的 model。
- `cwd` — resolved working directory（workspace identity）。
- `last_message_id` — session 上一轮产出的 assistant message（conversation cursor）。

Resolve 时，session 可 resume **当且仅当**以下全部成立；否则 `isResuming = false`，带 `invalidationReason`，daemon 重新 seed 完整 transcript：

| Guard | Resumable when | mismatch 时的 `invalidationReason` |
| --- | --- | --- |
| model | stored `model` == current run model | `model_changed` |
| cwd | stored `cwd` == current run cwd | `cwd_changed` |
| conversation cursor | 最新 completed assistant message（排除**本次** run 的 in-flight placeholder）== stored `last_message_id` | `conversation_advanced` |
| cursor present | stored `last_message_id` 非 null | `missing_cursor`（legacy row → reseed once） |

每次 successful create **和** resume turn 都推进 cursor（因此连续同一 agent 轮次会继续 resume）。`tool-contract` / `prompt-hash` / `memory` changes 已由 `stable_prompt_hash` 吸收（hash 变化会在 resumed session 上重发 stable block）；只有会让 upstream session *错误地继续* 的变化才强制 fresh session。Cancellation 不得留下 dangling session；resume 不得重新引入 #3380 lost-edit-state failure（当 handle 有效时，resumed session 是 authoritative；我们不会同时 replay flattened history）。

> Status：**implementation PR 已对 codex/opencode 实现**。Acceptance tests：`resolveAgentResumeContext` invalidation matrix（in-sync resume、current-placeholder-excluded follow-up、`model_changed`、`cwd_changed`、`conversation_advanced`、`missing_cursor`）以及端到端 `codex -> other agent -> codex` spec，断言第二次 codex turn 会启动 fresh session（no resume），而不是丢掉中间 turn。AMR runtime 使用相同 caller-side contract。
>
> Related：issue #744（"Alternative path: use native CLI resume/continue plus sessionMap instead of full transcript reinjection"）描述了本 spec formalize 的同一 approach。

### Complementary：cacheable-prefix stabilization（给不可 resume 的 agents）

没有 native resume 的 agents 仍走 flattened-resend，但**静态 `[system+tools]` prefix** 仍应缓存：把 volatile blocks（run context / memory / MCP）移到 stable prefix 之后，并添加 prompt-stack fingerprint invariant（当只有 volatile inputs 变化时，cacheable prefix byte-identical；新增未分类 section 会让 tests fail）。无论是否 resume，这都能帮助 explicit-cache upstreams。

## Validation · Acceptance

- 用真实 production text/usage 为每个 agent 写 red spec；**measure turn-2+ 的第一笔 model call**，不要用 within-turn / cumulative-session aggregate。
- 可证伪：同一个 `conversationId` 中连续两轮，断言 turn-2 first-call uncached input 远低于 turn-1（history 没有重新付费）；并且在 cache window 内，进程重启后 resume 仍然存活。
- Fallback：在两轮之间删除/移动 agent 的 session store，断言 conversation 通过 re-seed 正确继续，并且走了 resume-fallback path。
- 可行时，通过现有 `run-failure-telemetry-smoke` real-daemon harness pattern 做端到端验证。

## Risks & mitigations

- **Session store instability（我们的 bug）**：非确定性的 per-turn data dir 会静默破坏 reuse → pin per-conversation dir；用 test 断言两轮共享 store 并 resume。
- **Accounting misread**：per-call vs cumulative usage（codex gotcha）→ measurement helpers 必须读取 per-call。
- **Lost edit state (#3380)**：resume 必须保持正确 → 除 cache metrics 外还要有 state-continuity acceptance；复用 daemon 的 resume keying。
- **codex/opencode 不需要 upstream/provider change**；AMR runtime change 在自己的 repo 中跟踪。
