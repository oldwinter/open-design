---
name: chat-motion-overlay
description: 从聊天记录或截图生成可配置的聊天动效叠加层，包括纯气泡场景、应用风格聊天容器、可选设备边框、预设或上传头像、昵称显示规则，以及适合输出透明视频的 Remotion 工程包。当 Codex 需要为抖音、演示视频、故事重演、社交消息举证场景，或 Hyperframe 和 Remotion 工作流创建可嵌入、带透明通道的可复用聊天短片时使用。
triggers:
  - "chat motion overlay"
  - "animated chat"
  - "chat bubbles"
  - "message overlay"
  - "transparent chat video"
  - "微信聊天动效"
  - "聊天气泡动效"
  - "透明聊天视频"
od:
  mode: utility
  category: animation-motion
  design_system:
    requires: false
---

# 聊天动效叠加层

将聊天内容转换为可配置的动效叠加片段，而不是单一、硬编码的微信聊天仿真界面。

## 工作流程

1. 规范化聊天输入。
   - 如果用户提供截图，将可见消息提取为 `references/input-format.md` 中定义的聊天记录格式。
   - 如果用户提供纯文本，每个动画节拍只保留一条消息；真实性很重要时，保持原文措辞不变。
   - 对于截图，可将可见头像作为判断参与者数量和消息分组的线索，但默认不要裁剪或重建头像图片。先推断参与者及其所在侧；除非用户提供头像文件或明确要求使用截图中的头像，否则使用预设头像渲染。

2. 选择场景配置。
   - 阅读 `references/config-schema.md`。
   - 生成工程包前，确定容器样式、头像模式、设备边框、昵称模式和交付格式。
   - 当用户提供的信息不足时，遵循 `references/question-strategy.md` 中的提问策略。

3. 构建场景规格。
   - 使用聊天记录和可选配置 JSON 运行 `scripts/build_chat_overlay_spec.py`。
   - 该脚本会输出一个可由 Remotion 直接渲染的 JSON 场景规格。

4. 准备可渲染的工程包。
   - 运行 `scripts/prepare_chat_overlay_bundle.py`。
   - 该脚本会复制 Remotion 模板、注入 `src/chatSpec.ts`，并将所有上传的头像文件复制到 `public/`。

5. 渲染目标输出。
   - 使用 `references/output-modes.md` 中的确切导出命令。
   - 剪辑时优先选择 `MOV（透明背景，可直接导入剪映 / PR / FCP 叠加）`，浏览器用途优先选择 `WebM（透明背景，适合网页 / 浏览器播放）`；如果用户希望在后续流程中继续编排，则选择可编辑的工程输出。

## 支持的维度

- `container`: `none`, `wechat`, `telegram`, `messenger`
- `avatarMode`: `preset`, `upload`, `mixed`
- `deviceFrame`: `none`, `iphone-dynamic-island`
- `nicknameMode`: `hidden`, `first-message-only`, `always`
- `deliveryFormat`:
  - `mov`: `MOV（透明背景，可直接导入剪映 / PR / FCP 叠加）`
  - `webm`: `WebM（透明背景，适合网页 / 浏览器播放）`
  - `remotion`: `Remotion 工程（适合继续编辑和拼装）`
  - `hyperframe`: `Hyperframe 工程（适合作为模块继续复用）`
  - `json`: `JSON 数据（适合程序处理 / 自定义渲染）`
  - `preview`: `预览图 / 预览工程（适合先确认效果）`

## 输出规则

- 叠加层输出应保持合成根节点透明。
- 不需要应用外壳、只显示独立气泡动效时，使用 `container: none`。
- 当平台界面框架也是叙事内容的一部分时，使用 `container: wechat|telegram|messenger`。
- 将上传的头像视为内容资源，并复制到渲染工程包的 `public/` 中。
- 用户未指定头像文件时，优先使用预设头像。截图头像可以帮助识别参与者，但在尝试从截图裁剪或重建头像前，应先建议用户提供头像文件。
- 明确呈现由配置驱动的行为；不要暗中切换样式体系。

## 提问策略

- 优先推断，其次提问。
- 如果用户提供的信息足以采用合理默认值，则继续执行，并清楚说明所作假设。
- 只询问缺失且影响较大的选择。
- 将问题数量控制在 1-3 个。
- 优先使用面向用户的表述，而不是技术术语。
- 询问 `deliveryFormat` 时使用 `格式（场景描述）` 标签，不要使用内部渲染术语。
- 如果用户表示不在意，则使用默认值继续执行，并在结果中注明。

## 资源

- 聊天记录格式：`references/input-format.md`
- 配置字段和示例：`references/config-schema.md`
- 提问策略：`references/question-strategy.md`
- 输出命令和目标：`references/output-modes.md`
- 将聊天记录和配置转换为规格：`scripts/build_chat_overlay_spec.py`
- 准备 Remotion 工程包：`scripts/prepare_chat_overlay_bundle.py`
- Remotion 渲染模板：`assets/remotion-template/`
