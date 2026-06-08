---
id: 20260511-issue-564-claude-diagnostics
name: Issue 564 Claude Diagnostics
status: planned
created: '2026-05-11'
---

## 概览

### 问题陈述

Issue #564 报告了这样一种情况：Claude Code 在 Open Design 中看起来已安装且可选择，但 run 会立即退出，并只显示通用消息 `Agent exited with code 1`。PR #604 通过添加可配置的 per-agent CLI environment（包括 `CLAUDE_CONFIG_DIR`）解决了一个已确认变体，但该 issue 中仍有其他 failure modes 没有被很好地解释给用户。

剩余的范围内问题是 diagnostic：Claude local auth/config/model failures 都坍缩成同一个通用 exit message，让用户不知道应该重新认证、设置 `CLAUDE_CONFIG_DIR`，还是修复 custom endpoint/proxy setup。

### 目标

- 将常见 Claude Code auth、config、endpoint 和 model-access failures 分类成可行动的 user-facing errors。
- 在有助于诊断 multi-profile 或 stale-auth cases 时，暴露 effective Claude CLI configuration path。
- 记录 `/login`、`CLAUDE_CONFIG_DIR`、custom `ANTHROPIC_BASE_URL`、proxy 和 model availability problems 的已知 recovery paths。

### 非目标

- 不持久化或注入 Claude auth tokens。
- 不编辑 Claude Code credentials 或 platform credential stores。
- 不移除 custom `ANTHROPIC_BASE_URL` 支持；只让 failures 更清晰。
- 本 change 不实现新的 image-generation provider。
- 本 change 不实现 API/BYOK image-mode capability validation。该行为与同一 issue thread 相关，但会延后到单独 media-capability follow-up，让此 change 聚焦 Claude CLI diagnostics。

## 调研

### 当前状态

- Claude Code runs 由 daemon 以 `claude -p --output-format stream-json --verbose ... --permission-mode bypassPermissions` 方式 spawn，prompt 通过 stdin 传入。
- `spawnEnvForAgent('claude', ...)` 将 inherited daemon environment 与 configured agent CLI env 合并；当设置 `ANTHROPIC_BASE_URL` 时保留 custom endpoint env；并在正常 Claude Code runs 中移除 `ANTHROPIC_API_KEY`，让 Claude login/subscription auth 优先。
- Settings 已允许设置 `CLAUDE_CONFIG_DIR`，这解决了 #564 中报告的 multiple-Claude-profile 变体，并由 PR #604 实现。
- Daemon 会通过 SSE 转发 child stderr，但 web client 最终会把 non-zero exits 报告为 `agent exited with code <n>`，可用时再附一个 short stderr tail。
- Connection-test path 有更丰富的 stderr tail，并返回 `agent_spawn_failed`，但还没有把 Claude-specific auth/config/model failures 分类为稳定 remediation messages。
- API/BYOK mode 使用 plain stream path。近期工作添加了一条 prompt rule，在 plain API mode 中抑制 `tool_calls`。Image-generation capability validation 仍然需要，但有意从本 spec 延后。

### #564 中的已知失败变体

- Custom endpoint 或 proxy 拒绝 Claude Code 选择的 model，导致 upstream 产生 model/plan/region error。
- 多个 Claude config directories 导致 Open Design spawn 的 Claude process 使用的状态不同于用户 terminal session。
- Stale、expired 或 corrupted Claude auth state 会让非交互式 `claude -p` run 失败，即使基本 terminal checks 看起来健康。
- 在 Windows 上，native PowerShell 和 WSL 可能使用不同 Claude installs 与不同 credential stores。
- 某些环境中，幽灵 `ANTHROPIC_API_KEY` 或 `ANTHROPIC_AUTH_TOKEN` 可能干扰预期的 OAuth/subscription auth。

## 设计

### Claude Failure Classification

添加一个 Claude-specific diagnostic helper，供 chat-run failure handling 和 agent connection test 共用。该 helper 应接受 agent id、exit code/signal、stderr tail、可用时的 stdout tail，以及 effective configured env。它返回 typed actionable error，或返回 `null` 以保留 generic fallback。

第一版应分类这些情况：

- `401`、`apiKeySource: "none"`、missing/invalid token 或 authentication failure：提示用户运行 `claude`，使用 `/login`，然后重试同一个 Open Design run。
- 存在 `ANTHROPIC_BASE_URL` 且 stderr/stdout 含有 model/plan/region unavailable 文本：说明 custom endpoint 或 proxy 未暴露所选 Claude Code model，并建议更换 model、修复 endpoint，或临时移除 custom endpoint。
- 存在 `CLAUDE_CONFIG_DIR`：在 diagnostic detail 中包含 effective expanded path，便于用户与 Claude 可正常工作的 terminal 对比。
- 未设置 `CLAUDE_CONFIG_DIR`，但症状匹配 config-state failure：建议在使用多个 Claude profiles 时在 Settings 中设置它。
- Windows credential 或 WSL/native mismatch indicators：建议在 Open Design 使用的同一 shell/environment 中重新认证，并在适用时检查 Windows Credential Manager。

Helper 返回 details 前应 redact secrets。它绝不能回显 token values、完整 API keys 或 authorization headers。

### User-Facing Surfaces

- 当可获得 Claude-specific diagnosis 时，Chat run failures 应显示分类后的 message，而不是只显示 `agent exited with code 1`。
- Settings connection test 应通过现有 failure-result shape 返回相同的 classified remediation，让用户能在开始 project run 前验证修复。
- Raw stderr tail 仍保留在 logs 中供 maintainers 使用，但 UI messages 应简短且可行动。

### 文档

在主要 setup/troubleshooting doc 中添加 `Claude Code exits with code 1` troubleshooting section。包含：

- `claude --version`
- `claude auth status --text`
- `printf 'hello' | claude -p --output-format stream-json --verbose --permission-mode bypassPermissions`
- `claude` then `/login`
- 在 multi-profile setups 中于 Settings 设置 `CLAUDE_CONFIG_DIR`。
- 当 selected model 不可用时，检查/移除 custom `ANTHROPIC_BASE_URL` 和 proxy settings。
- Windows-specific note：WSL 和 native Windows Claude credentials 是分开的。

### Deferred: API/BYOK Image Capability Handling

对 API/BYOK mode 中的 image/media surfaces，后续 follow-up 应在把 run 视为成功前，验证 request 可被路由。

- 如果 configured daemon media provider 可满足 selected image model，则通过现有 media-generation path 路由。
- 如果没有可用 media provider/tool route，则以 typed error 失败，说明 API chat mode 无法执行 image-generation tools，并提示用户配置 Settings -> Media，或使用具备能力的 local CLI agent。
- 不依赖 model 自行报告 unsupported tool usage；app 应在 run start 前或 run start 时做 capability decision。

## 实现计划

1. 在 daemon-owned code 中添加 shared Claude diagnostic helper，并用代表性 stderr/stdout tails 做 unit test。
2. 在 Claude runs 的 `/api/chat` child close handling 中接入该 helper，再 fallback 到 generic non-zero exit message。
3. 将同一 helper 接入 agent connection-test result path。
4. 为已知 #564 recovery paths 添加 troubleshooting documentation。
5. 保持 PR #604 behavior 不变：configured `CLAUDE_CONFIG_DIR` 仍是受支持的 Settings field，并传入 detection、connection tests 和 chat runs。

## 成功标准

- Claude auth failure 会生成提到 `/login` 的 remediation，而不是只有 `exit code 1`。
- Custom endpoint/model-access failure 会生成提到 `ANTHROPIC_BASE_URL` 或 endpoint/model availability 的 remediation。
- Multi-profile failure path 可通过在 Settings 中设置 `CLAUDE_CONFIG_DIR` 解决。
- 现有 non-Claude agent failure behavior 保持不变，除非原本就会走同一个 generic fallback。

## 测试计划

- Claude diagnostic classification 的 daemon unit tests：
  - 401 / `apiKeySource: "none"`。
  - selected model unavailable / plan or region text。
  - custom `ANTHROPIC_BASE_URL` present。
  - configured `CLAUDE_CONFIG_DIR` present。
  - unrelated stderr falls back to generic behavior。
- Connection-test tests：Claude-specific failures 返回可行动的 `agent_spawn_failed` detail。
- Chat-run tests：non-zero Claude exits 在可能时 emit classified SSE error。
- 运行 `pnpm guard`、`pnpm typecheck`，以及 implementation 触碰的 package-scoped daemon/web tests。
