# 隐私

本页说明 Open Design 桌面应用和 Web 应用会收集哪些数据、何时收集，以及你如何保持控制权。这里记录的是已随应用发布的行为；同样的控制项位于 **Settings → Privacy**。

Open Design 是 **local-first**。你的项目、生成文件和 BYOK API keys 都保留在本机，应用也可以完全离线工作。Usage telemetry（见下文）是应用可能发送的一类数据；它默认**开启**，你可以随时在 **Settings → Privacy** 中关闭。

## Telemetry 是 opt-out

Usage telemetry 默认**开启**。首次运行时，应用会显示隐私披露横幅，让你在执行其他操作前了解会收集哪些内容。它是带有单个 **I get it** 确认按钮的知情披露提示，而不是 opt-in gate；由于 telemetry 已启用，应用可能会从首次启动开始发送 events（例如 onboarding 和 UI-interaction events）。

你仍然保持控制权：横幅 footer 会说明 sharing 已开启，并指向 **Settings → Privacy**，你可以在那里关闭 telemetry，并单独切换下列每个类别；也可以随时修改决定。

## 会收集什么

当 telemetry 启用时，应用可能向 Open Design 团队发送以下内容。每个类别都可在 Settings 中单独控制。

- **匿名指标** - run 次数、token 用量、错误率和耗时。不包含 prompts，也不包含项目数据。
- **对话与工具内容** - 你的 prompts、assistant responses、tool inputs 和 tool outputs（发送前会截断）。API keys、tokens、JWTs、emails、IP addresses 和 credit-card numbers 会在任何内容离开本机前自动移除。
- **项目 artifacts manifest** - 生成文件的文件名、类型和大小。绝不会发送这些文件的**内容**。

## 永远不会收集什么

- 你生成的 artifact 文件内容。
- 你的 BYOK API keys、tokens 或其他 secrets；这些内容在发送前会被 redact，且永远不是 telemetry 的一部分。
- Telemetry 关闭时的任何内容。

## Telemetry 如何发送

Redacted telemetry batches 会发送到 Open Design 团队运营的 Cloudflare Worker relay，再由 relay 转发到 [Langfuse](https://langfuse.com) 进行分析。Relay 在 server-side 持有 Langfuse write credentials，因此打包客户端只会携带公开 relay URL，不会携带 secret keys。如果 relay 不可用，应用会安静重试并继续工作；telemetry 永远不会阻塞你的工作流。

## 你的匿名 ID

启用 telemetry 后，应用会生成一个随机、不透明的 installation ID，用于把相关 events 分组。它不绑定你的姓名、邮箱或账号，也不携带个人信息。

## 删除你的数据

**Settings → Privacy → Delete my data** 会轮换你的匿名 ID 并停止发送。已经收到的 telemetry 会按团队 retention policy 自动过期。

## 自带密钥

Open Design 在每一层都是 BYOK。你为 coding agents 和 model providers 配置的 API keys 都存储在本地，只用于直接调用对应 provider。它们永远不会发送给 Open Design 团队。

## Open Design AMR

“Open Design AMR” 是 Open Design 官方的 first-party model service。由于二者属于同一团队运营的同一产品族，我们可能会在二者之间共享必要信息，用于提供、连接并改进组合体验，例如识别你来自 Open Design、帮助你完成设置，以及让两个产品协同稳定运行。这种共享发生在我们自己的产品之间，而不是与无关第三方共享；涉及的任何数据仍遵循本页所述控制。

## 本页变更

本文档跟踪已发布应用的数据处理行为。当 telemetry 行为发生变化时，本页会同步更新。如有问题，请打开 [GitHub Discussion](https://github.com/nexu-io/open-design/discussions)。
