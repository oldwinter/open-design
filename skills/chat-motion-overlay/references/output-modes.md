# 输出模式

使用面向用户的交付选项，由该技能将其映射为具体产物。

## MOV（透明背景，可直接导入剪映 / PR / FCP 叠加）

当片段需要在 Premiere、Final Cut、剪映或 CapCut 等编辑器中叠加使用时，选择此模式。

```bash
npx remotion render src/index.ts ChatMotionOverlay out/chat-motion-overlay.mov --image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444
```

## WebM（透明背景，适合网页 / 浏览器播放）

当片段需要在浏览器或网页合成环境中播放时，选择此模式。

```bash
npx remotion render src/index.ts ChatMotionOverlay out/chat-motion-overlay.webm --image-format=png --pixel-format=yuva420p --codec=vp9
```

## JSON 数据（适合程序处理 / 自定义渲染）

当其他系统需要直接使用场景结构时，选择此模式。

- 运行 `scripts/build_chat_overlay_spec.py`
- 将生成的 JSON 保留为传输产物

## Remotion 工程 / Hyperframe 工程（适合继续编辑和拼装）

当用户希望后续继续合成，而不是直接接收最终视频时，选择此模式。

- 运行 `scripts/prepare_chat_overlay_bundle.py`
- 交付生成的工程包目录

## 视觉规则

- `container: none` 应仅在透明根节点上保留气泡和头像。
- `container: none` 仅支持 `deviceFrame: none`；不要将纯气泡叠加层与 `iphone-dynamic-island` 搭配使用。
- 应用容器应保留自身的屏幕背景，但绝不能在内容区域之外添加全局背景。
- `deviceFrame: iphone-dynamic-island` 会添加手机硬件外框，同时保持外部空间透明。
