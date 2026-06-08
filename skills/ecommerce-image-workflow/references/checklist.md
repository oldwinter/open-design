# Ecommerce Image Workflow Checklist

交付前运行本 checklist。P0 项必须通过，输出才可用。

## P0 - must pass

- [ ] **存在参考图。** 工作流至少使用了一张真实上传的商品图片。如果没有图片，运行已停止并要求用户上传。
- [ ] **仅 reference-product mode。** 输出不是仅凭 brief 生成的概念商品；任何 brief-only 请求都已暂缓。
- [ ] **一个商品。** 本次运行面向一个商品，而不是 SKU 系列或混合 catalog。
- [ ] **每个 prompt 都包含商品 fidelity lock。** 每个生成 slot 的 prompt 都保留形状、轮廓、颜色、材质、logo/标签位置、可见结构细节和比例。
- [ ] **没有 redesign。** Prompt 没有增加、删除、移动、改色或重塑商品特征。会改变商品本身的商品编辑请求超出此 V1 工作流范围，应推迟到后续工作流。
- [ ] **三 slot 范围。** 除非用户明确要求更少，否则图片集仅限 main、feature、lifestyle。
- [ ] **只使用 media dispatcher。** 生成使用 `"$OD_NODE_BIN" "$OD_BIN" media generate`；没有直接调用 provider API 或自定义 model 命令。
- [ ] **参考图传入生成命令。** 当 model 支持参考图时，每条 media 命令都包含 `--image <project-relative product reference image>`。如果不支持，工作流已停止，而不是假装商品保真可保证。
- [ ] **没有编造声明。** Feature image 没有编造认证、测量值、材质、成分、性能数字、奖项或合规承诺。
- [ ] **不依赖很小的渲染文字。** Prompt 不依赖图片内小字来表达卖点；需要后续加文案时，预留干净标签空间。
- [ ] **存在 manifest。** `image-manifest.json` 记录 workflow 名称、mode、商品名/标签、参考图、slot id、输出文件名、宽高比和 prompt 摘要。
- [ ] **存在 gallery。** `ecommerce-gallery.html` 先展示参考图，再展示生成的 main、feature、lifestyle slot。

## P1 - should pass

- [ ] **Slot 角色视觉上可区分。** Main 是干净 packshot，feature 聚焦细节/卖点，lifestyle 有上下文。
- [ ] **背景适合电商用途。** Main image 使用白色/米白/浅灰背景；feature 和 lifestyle 避免会遮蔽商品细节的嘈杂背景。
- [ ] **尺度可信。** 商品尺寸和比例在所有 slot 中保持可信。
- [ ] **人物交互受控。** 手部/模特不会遮挡商品，也不会改变商品结构。
- [ ] **文件名可预测。** 输出使用 `<product-slug>-main.png`、`<product-slug>-feature.png`、`<product-slug>-lifestyle.png` 或类似可读名称。

## P2 - nice to have

- [ ] **包含 marketplace 说明。** 交付中说明平台特定裁切、背景、文字规则仍是后续事项或人工 review 步骤。
- [ ] **变体路径清晰。** 交付建议下一个有用变体，例如不同 lifestyle 场景或第二个 feature focus。
