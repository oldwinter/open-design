# 测试矩阵

此矩阵覆盖 `$chat-motion-overlay` 的可配置范围。

## 目标

- 验证从聊天记录到规格的生成
- 验证工程包准备与资源复制
- 验证模板类型安全
- 验证各主要场景类型的代表性渲染
- 尽早发现无效的配置组合
- 验证群聊可按参与者分配头像，而不只是按左右侧分配
- 验证参与者 slug 冲突时，上传头像的资源名称仍保持唯一
- 验证纯气泡叠加层中的右侧行始终明确右对齐
- 固化提问策略，确保以一致方式处理信息不完整的请求
- 验证使用聊天记录中的头像提示前，会先根据预设键对其进行检查
- 验证当 `avatarMode` 为 `preset` 时会拒绝 `uploadPath`
- 验证配置中的参与者预设会覆盖聊天记录中的头像提示
- 验证 `--force` 会拒绝危险的输出目录，而不是将其删除
- 在渲染前拒绝不受支持的纯气泡叠加层与手机边框组合
- 验证渲染帧跨越消息的 `appearAt` 边界，而不只是检查稍后的静态帧
## 覆盖维度

- `container`: `none`, `wechat`, `telegram`, `messenger`
- `avatarMode`: `preset`, `upload`, `mixed`
- `deviceFrame`: `none`, `iphone-dynamic-island`
- `nicknameMode`: `hidden`, `first-message-only`, `always`
- `deliveryFormat`: `mov`, `webm`, `json`, `remotion`, `hyperframe`, `preview`

## 测试用例

1. `default_wechat_phone_preset_hidden`
   - 容器：`wechat`
   - 头像模式：`preset`
   - 设备边框：`iphone-dynamic-island`
   - 昵称模式：`hidden`
   - 交付方式：`MOV（透明背景，可直接导入剪映 / PR / FCP 叠加）`
   - 渲染帧：`14`、`15`、`120`，以跨越第一条消息的 `appearAt`

2. `plain_bubbles_no_frame_first_message`
   - 容器：`none`
   - 头像模式：`preset`
   - 设备边框：`none`
   - 昵称模式：`first-message-only`
   - 交付方式：`Remotion 工程（适合继续编辑和拼装）`

3. `telegram_no_frame_always`
   - 容器：`telegram`
   - 头像模式：`preset`
   - 设备边框：`none`
   - 昵称模式：`always`
   - 交付方式：`WebM（透明背景，适合网页 / 浏览器播放）`

4. `messenger_phone_hidden`
   - 容器：`messenger`
   - 头像模式：`preset`
   - 设备边框：`iphone-dynamic-island`
   - 昵称模式：`hidden`
   - 交付方式：`MOV（透明背景，可直接导入剪映 / PR / FCP 叠加）`

5. `upload_phone_always`
   - 容器：`wechat`
   - 头像模式：`upload`
   - 设备边框：`iphone-dynamic-island`
   - 昵称模式：`always`
   - 交付方式：`MOV（透明背景，可直接导入剪映 / PR / FCP 叠加）`

6. `mixed_wechat_phone_first_message`
   - 容器：`wechat`
   - 头像模式：`mixed`
   - 设备边框：`iphone-dynamic-island`
   - 昵称模式：`first-message-only`
   - 交付方式：`Hyperframe 工程（适合作为模块继续复用）`

7. `json_spec_only`
   - 容器：`wechat`
   - 头像模式：`preset`
   - 设备边框：`iphone-dynamic-island`
   - 昵称模式：`hidden`
   - 交付方式：`JSON 数据（适合程序处理 / 自定义渲染）`

8. `group_multi_participant_distinct_presets`
   - 容器：`wechat`
   - 头像模式：`preset`
   - 左右两侧共四名发言者
   - 预期：每名参与者都能解析为不同的头像

9. `invalid_upload_missing_side`
   - 头像模式：`upload`
   - 缺少一个上传路径
   - 预期：因校验错误而失败

10. `invalid_mixed_without_upload`
   - 头像模式：`mixed`
   - 没有上传路径
   - 预期：因校验错误而失败

11. `invalid_upload_missing_file`
   - 头像模式：`upload`
   - 上传路径指向不存在的文件
   - 预期：工程包准备会快速失败并给出清晰的文件缺失错误，且不会留下泄露本地上传路径的已生成 `chatSpec.ts`

12. `invalid_participant_side_conflict`
   - 同一参与者同时出现在左右两侧
   - 预期：因校验错误而失败，并要求该参与者始终位于同一侧

13. `upload_slug_collision_unique_assets`
   - 头像模式：`upload`
   - 两个不同的发言者姓名标准化后得到相同的 slug
   - 预期：生成的参与者 ID 和复制的上传资源保持唯一


14. `invalid_transcript_avatar_key`
   - 聊天记录行包含非预设头像键
   - 预期：因校验错误而失败，而不是静默回退到预设头像

15. `invalid_preset_mode_upload_path`
   - 头像模式为 `preset`，但某个参与者配置包含 `uploadPath`
   - 预期：因校验错误而失败

16. `config_preset_overrides_transcript_avatar_hint`
   - 同一参与者的配置预设与聊天记录头像提示不同
   - 预期：生成的规格使用配置预设，而不是聊天记录提示

17. `invalid_force_dangerous_output_dir`
   - `--force` 指向技能根目录等危险的现有目录
   - 预期：工程包准备在发生任何递归删除前失败

18. `invalid_bubble_only_phone_frame`
   - 容器：`none`
   - 设备边框：`iphone-dynamic-island`
   - 预期：因校验错误而失败，而不是生成内容被裁切的手机边框场景

## 通过标准

- 有效用例成功生成 JSON 规格
- 有效的工程包用例成功准备输出工程包
- 生成的工程包会从 `src/chatSpec.ts` 中清除当前机器的本地上传路径
- 生成的工程包通过 `tsc --noEmit`
- 具有代表性的有效用例成功渲染静态帧
- 群聊用例按参与者分配头像，而不只是按左右侧分配
- 对于 slug 基础值冲突的参与者，上传头像资源仍不会发生冲突
- 纯气泡叠加层在生成的模板中明确使用右侧行对齐
- 参与者所在侧冲突时应失败，而不是将同一人渲染在两侧
- 无效用例因预期的校验错误而失败
- 无效上传路径用例在工程包准备期间失败，而不是静默回退到预设头像

- 聊天记录提供的头像键不在预设库中时，会因清晰的校验错误而失败
- 包含 `uploadPath` 的 `avatarMode=preset` 配置会因清晰的校验错误而失败
- 当配置中的参与者预设和聊天记录头像提示同时存在时，前者优先
- `--force` 会在删除任何内容前拒绝危险的输出目录
- 对外说明的 Remotion 渲染脚本会将 `src/index.ts` 保持在合成项 ID 之前
- `container=none + deviceFrame=iphone-dynamic-island` 会因清晰的校验错误而失败
- 代表性渲染覆盖至少跨越一条消息的 `appearAt` 帧边界
- 提问策略文档包含默认值、触发条件和面向用户的措辞
