# AMR 功能测试用例

## 概要

本文档覆盖 `feat/amr-runtime-acp` 分支上 AMR (vela) runtime 的手工功能验证。

它基于当前实现形态编写：

- AMR 以 `agentId = amr` 的 daemon agent 暴露
- AMR 可用性取决于能否解析出可运行的 `vela` binary
- AMR 登录状态来自 `~/.vela/config.json`
- AMR onboarding、settings、inline switcher 和 chat-run 行为都由 daemon 报告的 runtime 与登录状态控制

请把它作为本地开发、QA 或发布前验证中的手工回归清单。

## 测试环境

### Env A: Fake Vela（推荐用于常规 UI 验证）

在不需要真实 AMR backend 的情况下验证入口可见性、登录 UI、onboarding 流程和基础 AMR 选择时使用它。

预期设置：

- `agentCliEnv.amr.VELA_BIN` 指向 `apps/daemon/tests/fixtures/fake-vela.mjs`
- `/api/agents` 返回 `amr.available = true`
- `/api/integrations/vela/status` 可通过 fake login route 驱动到 signed-in / signed-out 状态

### Env B: Real Vela（推荐用于发布验证）

在验证真实 `vela` 安装、实际 AMR 账户登录和真实 chat-run 行为时使用它。

预期设置：

- `vela` 已安装在 PATH 上，或已配置 `VELA_BIN`
- `vela login` 对 active AMR profile 成功
- `~/.vela/config.json` 包含带有 `runtimeKey` 的预期 profile entry

## 覆盖范围

- Runtime 可用性与发现
- AMR sign-in / sign-out 状态
- Onboarding 入口行为
- Settings / execution panel 行为
- Inline switcher 行为
- Chat-run 行为
- Profile 处理（`prod`、`test`、`local`）
- 失败与恢复流程

## 手工测试用例

| ID | 区域 | 前置条件 | 步骤 | 预期结果 |
| --- | --- | --- | --- | --- |
| AMR-001 | Runtime discovery | PATH 上没有 `vela`，且未配置 `VELA_BIN` | 打开 app，获取 `/api/agents`，检查 execution UI | `amr` 存在于 agent list，但 `available=false`；AMR 不会作为 active selectable runtime entry 展示 |
| AMR-002 | Runtime discovery | `VELA_BIN` 指向可运行的 fake 或真实 `vela` | 打开 app，获取 `/api/agents` | `amr.available=true`；AMR model list 存在；agent path 解析到配置的 binary |
| AMR-003 | Runtime discovery | `VELA_BIN` 指向缺失文件 | 重启 daemon 或刷新 agents | `amr.available=false`；app 不崩溃；runtime 被安全隐藏/降级 |
| AMR-004 | Login status | `~/.vela/config.json` 中没有 AMR profile | 调用 `/api/integrations/vela/status` | 返回 `loggedIn=false`、正确的 `profile`、`user=null` |
| AMR-005 | Login status | Profile 存在但缺少 `runtimeKey` | 调用 `/api/integrations/vela/status` | 返回 `loggedIn=false`；缺少 `runtimeKey` 不算已登录 |
| AMR-006 | Login status | 有效 AMR profile 存在且带有 `runtimeKey` | 调用 `/api/integrations/vela/status` | 返回 `loggedIn=true`；投射出 user info；不暴露 secrets |
| AMR-007 | Login action | AMR available、signed out | 从 Settings 或 onboarding 触发 AMR login | Backend 返回 accepted login response；UI 进入 signing-in 状态 |
| AMR-008 | Login completion | Fake 或真实 login 成功 | 等待 polling 完成 | UI 无需手动刷新，从 `Signing in…` 切换为 signed-in 状态 |
| AMR-009 | Login error | 强制 `vela login` 立即失败 | 触发 login | UI 退出 signing-in 状态，并显示带 AMR 标识的错误反馈 |
| AMR-010 | Login concurrency | 已有一个 AMR login 正在进行 | 快速触发两次 login | 实际只有一个 login request 处于 active；重复 login 被阻止或安全忽略 |
| AMR-011 | Logout | Signed-in AMR profile 存在 | 触发 sign-out | 当前 AMR profile 被移除；下一次 status 读取返回 `loggedIn=false`；其他 profiles 不受影响 |
| AMR-012 | Settings visibility | AMR available，onboarding 已完成 | 打开 Settings → Execution | AMR 在 execution UI 中显示为 selectable runtime/agent path |
| AMR-013 | Settings visibility | AMR unavailable | 打开 Settings → Execution | AMR 不会被提升为可用项；不显示损坏入口或不可用 CTA |
| AMR-014 | Login pill signed-out | AMR available、signed out | 打开 Settings | AMR login pill 显示 signed-out 状态和 Sign in action |
| AMR-015 | Login pill signed-in | AMR available、signed in | 打开 Settings | AMR login pill 显示 signed-in 状态、user email 和 Sign out action |
| AMR-016 | Login pill profile badge | Active AMR profile 是 `test` | 打开 Settings | `TEST` badge 可见 |
| AMR-017 | Login pill profile badge | Active AMR profile 是 `local` | 打开 Settings | `LOCAL` badge 可见 |
| AMR-018 | Login pill profile badge | Active AMR profile 是 `prod` | 打开 Settings | 不显示 debug 风格的 profile badge |
| AMR-019 | Login pill event isolation | AMR card 渲染在 settings agent card 内部 | 点击 Sign in / Sign out | Login pill action 不会意外触发父级 card selection click handler |
| AMR-020 | Login recovery | AMR login polling 遇到瞬时 `/status` 失败 | 触发 login，并模拟一次 status fetch 失败 | UI 保持可恢复，并在后续 polling 成功时切换为 signed-in |
| AMR-021 | Onboarding default recommendation | AMR available | 在 fresh config 上打开 onboarding | AMR Cloud 是被重点推荐的默认 runtime choice |
| AMR-022 | Onboarding signed-out flow | AMR available、signed out | 打开 onboarding 并保持选择 AMR Cloud | 用户看到继续前的 sign-in requirement |
| AMR-023 | Onboarding signed-in flow | AMR available、signed in | 打开 onboarding 并继续 | 用户可以通过 onboarding，不会被 AMR login blocker 阻止 |
| AMR-024 | Onboarding login completion | AMR available、signed out | 从 onboarding 启动 login 并等待 polling | Login completion 后 onboarding 继续推进 |
| AMR-025 | Onboarding skip | AMR available、signed out | 点击 Skip | Onboarding 干净退出，且不强制 AMR login |
| AMR-026 | Onboarding fallback | AMR unavailable | 打开 onboarding | AMR Cloud 不会被选为可用路径；Local CLI 保持可用且不损坏 |
| AMR-027 | Local CLI segregation | AMR available | 在 onboarding 中切换到 Local coding agent view | AMR 不出现在 Local CLI agent list 中 |
| AMR-028 | Inline switcher visibility | AMR available | 打开 inline model switcher | AMR 作为标记为 `AMR` 的 runtime row 出现，而不是 `AMR (vela)` |
| AMR-029 | Inline switcher signed-out state | AMR available、signed out | 打开 inline model switcher | Row 显示简洁 sign-in 状态，不泄漏完整账户元数据 |
| AMR-030 | Inline switcher signed-in state | AMR available、signed in | 打开 inline model switcher | Row 显示简洁 signed-in status 图标/标签；不残留 stale signed-out copy |
| AMR-031 | Inline switcher model list | AMR available | 打开 inline switcher 并检查 AMR model selector | AMR model options 来自 AMR runtime model list；labels 稳定 |
| AMR-032 | Chat-run happy path | AMR available 且 signed in；真实或 fake vela 可运行 | 选择 AMR 并发送一个 prompt | Assistant message 成功完成；run 不挂起 |
| AMR-033 | Default model substitution | 已选择 AMR；config model 为 `default` | 发送一个 prompt | Backend 在 `session/prompt` 前替换为具体 AMR fallback model；run 成功 |
| AMR-034 | Explicit AMR model | 已选择 AMR；选择一个具体 AMR model | 发送一个 prompt | 选中的 AMR model 被遵守；run 成功 |
| AMR-035 | Prompt-before-model regression | 强制 backend 跳过 model selection，或使用拒绝 prompt-before-model 的 stub | 发送一个 prompt | Run 以可执行错误失败；不会静默成功 |
| AMR-036 | Session/new failure | 使用强制 `session/new` error 的 stub 或环境 | 发送一个 prompt | 出现用户可见的 run failure；daemon 不挂起 |
| AMR-037 | Session/set_model failure | 使用强制 `session/set_model` error 的 stub 或环境 | 发送一个 prompt | 出现用户可见的 run failure；不会部分成功 |
| AMR-038 | Session/prompt failure | 使用强制 `session/prompt` error 的 stub 或环境 | 发送一个 prompt | 出现用户可见的 run failure；run 干净结束 |
| AMR-039 | Silent child timeout | 使用接受 spawn 但永不响应的 stub | 发送一个 prompt | Run 因 timeout 失败，而不是无限挂起 |
| AMR-040 | Profile precedence | 设置 `OPEN_DESIGN_AMR_PROFILE=test` 和 `VELA_PROFILE=local` | 检查 status 和 login | AMR 解析为 `test`；低优先级 `VELA_PROFILE` 不会胜出 |
| AMR-041 | Profile isolation | `~/.vela/config.json` 中存在多个 profiles | 对一个 profile 执行 login、status、logout | Actions 只影响解析到的 profile；无关 profiles 保持完整 |
| AMR-042 | Packaged env propagation | Packaged build 配置了 AMR profile | 启动 packaged app 并检查 daemon env 行为 | `OPEN_DESIGN_AMR_PROFILE` 被转发到 daemon spawn env |
| AMR-043 | Vela bundling | Beta mac arm64 packaging path | 在 strict mode 下构建 package | Vela binary 被打包进 packaged resources；所需 binary 不可用时构建明确失败 |
| AMR-044 | Non-strict packaging | Non-strict platform 或 build path | 在没有可用 Vela binary 时构建 package | 构建不会仅因缺少 Vela binary 而失败 |

## 聚焦 Smoke Runs

在活跃开发期间使用这些较小的 smoke pass。

### Smoke A: Entry + Login UI

- 验证 `amr.available=true`
- 打开 Settings
- 确认 AMR login pill 可见
- 触发 login
- 确认状态切换为 signed in
- 确认 sign-out 可用

### Smoke B: Onboarding

- 重置 config，使 onboarding 可见
- 确认 AMR available 时突出展示 AMR Cloud
- 确认 signed-out 状态会阻止 Continue，但不会阻止 Skip
- 完成 login，并验证 onboarding 可以继续

### Smoke C: Chat Run

- 选择 AMR 作为 active agent
- 保持 model 为 `default`
- 发送一个 prompt
- 确认 assistant reply 完成
- 确认没有 `session/set_model must be called before session/prompt` 回归

## 值得手工关注的失败场景

- 预期存在 binary，但 `amr.available=false`
- login 已 accepted，但 status 始终不切换为 signed in
- UI 卡在 `Signing in…`
- signed-in 状态显示了错误的 profile badge
- AMR unavailable 时 onboarding 仍优先选择 AMR
- AMR 出现在 Local CLI list 内部
- 提交 prompt 后 AMR run 挂起
- `model=default` 时 AMR run 静默失败
- packaged build 成功，但 runtime 找不到 bundled `vela`

## 建议捕获的证据

提交 bug 时请捕获：

- `/api/agents` response
- `/api/integrations/vela/status` response
- 当前 `agentCliEnv.amr` config
- 相关 daemon log lines
- 相关 desktop 或 renderer log lines
- active `OPEN_DESIGN_AMR_PROFILE` value
- 使用的是 fake 还是 real `vela`

## 备注

- Automated tests 已覆盖许多 contract-level cases。本文档用于手工功能验证，尤其是 UI 状态、环境设置以及 packaged/runtime 行为。
- Onboarding 可见性取决于 config 状态。如果 `onboardingCompleted=true`，在重置 onboarding 前不会看到 AMR onboarding entry 行为。
- Runtime 可用性取决于 binary resolution。如果 UI 中缺少 AMR，在假设是 front-end rendering bug 之前，务必先检查 `/api/agents`。
