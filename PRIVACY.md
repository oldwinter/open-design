# 隐私

本页说明 Open Design 桌面应用和 Web 应用会收集哪些数据、何时收集，以及你如何保持控制权。这里记录的是应用已经发布的行为；对应控制项位于 **Settings → Privacy**。

Open Design 是 **local-first**。你的 project、生成文件和 BYOK API keys 都保留在本机。Telemetry 服务不可用时，本地 project / file 工作流仍可使用；依赖模型的功能仍取决于你选择的 runtime 或 provider。

Open Design 有两类 telemetry：

- **产品分析与质量 trace**默认开启，可在 **Settings → Privacy** 中关闭或缩小范围。
- 在配置了 telemetry 目标的构建中，**安全性与可靠性 telemetry**始终启用。它只发送经过脱敏的有限数据，用来诊断 crash、启动失败、stream 中断以及类似的产品健康问题。通用分析开关不会关闭这个通道。

没有配置 telemetry 目标凭据的 fork 和开发构建，两类数据都不会发送。

## 产品分析采用 opt-out

Usage telemetry 默认**开启**。首次运行时，应用会显示隐私披露横幅，让你在执行其他操作前了解会收集哪些内容。横幅会让你选择 **Share** 或 **Don't share**。选择 **Share** 会保持产品分析与质量 trace 开启；选择 **Don't share** 则会关闭这些可选通道。

可选通道始终由你控制：横幅会指向 **Settings → Privacy**，你可以在那里分别切换下列类别，并随时修改决定。上面说明的安全性/可靠性例外不属于可选的产品分析类别。

## 会收集什么

启用可选分享时，应用可能向 Open Design 团队发送以下内容。Settings 中对应的两个控制项是 **Anonymous metrics** 与 **Conversation and tool content**。

- **匿名指标**：run 次数、token 用量、错误率和耗时。这个通道还包括产品交互事件、页面跳转、Web 性能和经过隐私遮罩的 session replay。Replay 会遮罩每个文本节点和输入值，并阻止嵌入式 iframe，因此 prompt、key、project 文本和生成预览不会被录制为可读的屏幕内容。
- **对话与工具内容**：你的 prompt、assistant response、tool input、tool output、prompt stack context，以及质量检查所需的 attachment / artifact manifest metadata。内容会先截断并脱敏；已知可能携带 artifact 内容的 tool payload 会替换为 redaction marker。只有指标与内容两个控制项都启用时，才会发送这个通道。

无论上述控制项如何设置，**安全性与可靠性 telemetry**都可能发送经过脱敏且有大小限制的诊断信息，用于浏览器/daemon 异常、白屏、长任务、资源或 SSE 失败、run 卡住、生命周期失败，以及打包应用在 daemon 启动前 crash 等情况。典型字段包括产品版本/channel、OS/runtime 信息、失败阶段、错误类型/消息/stack 和耗时。Home directory 路径、URL query string、输入文本及其他已知敏感字段会在发送前脱敏。安全报告采用 best-effort，绝不会阻塞核心工作流或延迟失败进程退出。

## 永远不会收集什么

- 你生成的 artifact 文件内容。
- 你的 BYOK API keys、authentication tokens 或其他已存储凭据。
- 经过隐私遮罩的 session replay 中可读的 prompt、project 或 artifact 文本。
- 内容控制项关闭时的对话与工具内容。

Telemetry event payload 不会有意包含 source IP 字段，free-form 内容的脱敏也会移除 IP address pattern。不过，与任何 HTTPS 请求一样，接收请求的网络服务能够看到连接的 source IP。配置的 PostHog 服务可能用它补充国家等地理信息；不要把“匿名”理解为“传输层无法观察 IP address”。

## Telemetry 如何发送

产品事件、遮罩后的 replay 以及安全性/可靠性事件会发送到配置的 [PostHog](https://posthog.com) ingestion endpoint。浏览器安全事件可能直接发送到 PostHog 的公开 ingestion API，以免正常 analytics client 加载前发生的错误丢失；daemon 和打包应用启动事件也有对应的直接安全通道。

指标与内容分享同时启用时，详细的 run 质量 trace 会通过 Open Design telemetry relay 发送到 [Langfuse](https://langfuse.com)。维护者 smoke test 配置也可能直接使用 Langfuse credentials。公开的 client / relay 配置不会暴露团队的私有 write credentials。

所有传输都采用 best-effort。分析服务不可用时，telemetry 失败不会变成产品失败。

## 你的匿名 ID

对于可选分析，应用会生成一个随机、不透明的 installation ID，用于把相关 event 分组。它不是从你的姓名或邮箱派生的。安全性/可靠性通道会在可用时使用匿名 installation / device identifier；启动早期失败时，也可能使用合成的 process / namespace identifier。

## 删除你的数据

**Settings → Privacy → Delete my data** 会轮换本地匿名 ID，并关闭可选的指标/内容通道。它不会关闭安全性/可靠性例外、撤回已经收到的 event，也不会同步删除 processor 中的历史记录。此前收到的 telemetry 会按适用的 retention policy 自动过期。

## 自带密钥

你为 coding agent 和 model provider 配置的 API keys 会存储在本地，并由本地应用/daemon 直接调用你选择的 provider。它们不是 telemetry 字段，也永远不会发送给 Open Design 团队。

## Open Design AMR

“Open Design AMR”是 Open Design 官方的 first-party model service。由于二者属于同一团队运营的同一产品族，我们可能会在二者之间共享提供、连接和改进组合体验所需的信息，例如识别你来自 Open Design、帮助你完成设置，以及让两个产品协同稳定运行。这种共享发生在我们自己的产品之间，而不是与无关第三方共享；涉及的任何数据仍遵循本页所述控制。

## 本页变更

本文档跟踪已发布应用的数据处理行为。当 telemetry 行为发生变化时，本页会同步更新。如有问题，请打开 [GitHub Discussion](https://github.com/nexu-io/open-design/discussions)。
