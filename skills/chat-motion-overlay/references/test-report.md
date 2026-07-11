# 测试报告

日期：2026-07-01

## 范围

对新的 `$chat-motion-overlay` 技能进行了以下验证：

- 聊天记录 → 规格生成
- 配置校验
- 工程包准备
- 预设头像资源复制
- 上传头像资源复制
- 清除生成的工程包中的上传头像路径
- 不会发生冲突的上传头像资源名称
- 群聊参与者级头像分配
- 纯气泡模式下的右侧对齐
- 参与者所在侧一致性校验
- Remotion 模板类型安全
- 代表性静态帧渲染
- 针对信息不完整请求的提问策略文档

## 矩阵结果

- 用例总数：18
- 通过：18
- 失败：0

## 覆盖的用例

1. `default_wechat_phone_preset_hidden`
2. `plain_bubbles_no_frame_first_message`
3. `telegram_no_frame_always`
4. `messenger_phone_hidden`
5. `upload_phone_always`
6. `mixed_wechat_phone_first_message`
7. `json_spec_only`
8. `group_multi_participant_distinct_presets`
9. `invalid_upload_missing_side`
10. `invalid_mixed_without_upload`
11. `invalid_upload_missing_file`
12. `invalid_participant_side_conflict`
13. `upload_slug_collision_unique_assets`

14. `invalid_transcript_avatar_key`
15. `invalid_preset_mode_upload_path`
16. `config_preset_overrides_transcript_avatar_hint`
17. `invalid_force_dangerous_output_dir`
18. `invalid_bubble_only_phone_frame`

## 已发现并修复的问题

1. `chatSpec.ts` 生成的是只读数组，而模板类型预期可变数组。
   - 修复：将模板 `ChatSpec` 类型改为使用 `ReadonlyArray`。

2. 对 `avatarMode=upload` 和 `avatarMode=mixed` 的配置校验过于宽松。
   - 修复：在 `build_chat_overlay_spec.py` 中添加显式校验。
   - 更新：`avatarMode=upload` 现在要求参与者配置提供上传头像路径。

3. 新技能需要让生成的 Remotion 工程包包含可用的预设头像资源。
   - 修复：在 `prepare_chat_overlay_bundle.py` 中添加头像库复制逻辑。

4. 面向用户的输出选项过于技术化。
   - 修复：用 `deliveryFormat` 取代直接选择 `output`，再在内部将其映射到渲染目标和产物模式。

5. 信息不完整的用户请求需要一致的澄清策略。
   - 修复：添加提问策略文档，其中包含默认值、提问数量限制和面向用户的措辞。

6. 工程包准备期间，缺失的上传头像文件可能会静默回退到预设头像。
   - 修复：当配置的上传路径不存在时，让 `prepare_chat_overlay_bundle.py` 快速失败，并为该情况添加工程包阶段的覆盖。

7. 群聊需要参与者级头像，而不只是按所在侧分配的头像。
   - 修复：将按所在侧分配头像替换为支持按参与者分配预设头像和上传头像。

8. 如果聊天记录存在冲突，同一发言者可能会被识别为同时位于两侧。
   - 修复：添加参与者所在侧一致性校验。

9. 不同参与者的姓名可能会标准化为相同的 slug，并覆盖上传头像资源。
   - 修复：生成稳定且唯一的参与者 ID，并添加包含两个上传头像的冲突测试。

10. 纯气泡叠加层需要明确的右侧行对齐。
    - 修复：将行对齐与头像/气泡排序分离，并为纯气泡用例添加样式断言。

11. 聊天记录提供但不在预设库中的头像键可能会静默回退到默认头像。
    - 修复：存储参与者前，根据 `PRESET_KEYS` 校验聊天记录中的头像提示。

12. 包含参与者 `uploadPath` 的 `avatarMode=preset` 配置可能会渲染上传文件，而不是预设头像。
    - 修复：当 `avatarMode` 为 `preset` 时拒绝 `uploadPath`，仅在 `upload` 和 `mixed` 模式下传递上传路径。

13. 聊天记录头像提示优先于显式的参与者配置预设，因此配置无法覆盖从聊天记录或 OCR 得到的提示。
    - 修复：将头像选择顺序改为配置优先（`configured.get("preset") or message["avatar"] or auto...`），与 `references/input-format.md` 保持一致。

14. 当 `--output-dir` 输入错误时，`--force` 可能会递归删除任意现有目录。
    - 修复：预先拒绝危险目标，并且只允许 `--force` 覆盖带有 `.chat-motion-overlay-bundle` 标记、先前生成的工程包目录。

15. 上传头像复制失败后，可能会留下不完整的工程包，其中 `src/chatSpec.ts` 仍包含本地 `uploadPath` 值。
    - 修复：复制前校验上传源，将 `chatSpec.ts` 的写入推迟到清理成功后，并在准备过程中途失败时移除生成的工程包。

16. 文档中的 MOV/WebM 导出命令和随附的软件包脚本遗漏了 `src/index.ts`，因此 Remotion 会将合成项 ID 视为入口文件。
    - 修复：更新软件包脚本和 `references/output-modes.md`，使二者都使用 `remotion render src/index.ts ChatMotionOverlay ...`，并在矩阵中持续检查该路径。

17. `container=none` 仍可与 `deviceFrame=iphone-dynamic-island` 组合，导致 1080x1920 的纯气泡场景被渲染到更小的手机视口中，并裁切右侧内容。
    - 修复：在配置校验期间拒绝这一不受支持的组合，并在配置结构、视觉规则和矩阵中记录该限制。

18. 气泡换行逻辑在基于帧的提前返回之后引入了 `useMemo` 调用，播放跨越消息的 `appearAt` 帧时可能会改变 Hook 调用顺序。
    - 修复：用普通的局部计算替换这些 `useMemo` 调用，并扩展渲染覆盖范围，使其包含第一条消息边界两侧的帧。

## 验证说明

- 具有代表性的工程包已成功渲染为静态图像。
- 无效配置用例因预期的校验错误而失败。
- 无效的上传头像文件路径在工程包准备期间失败，并给出清晰的错误。
- 生成的工程包中，`chatSpec.ts` 只保留参与者的 `uploadAsset` 条目，不会泄露本地 `uploadPath` 值。
- 当参与者显示名称转换为相同的基础 ID 时，上传头像资源仍保持唯一。
- 群聊参与者会解析为各自不同的参与者头像，而不是共享按所在侧分配的头像。
- 纯气泡透明叠加层会明确将右侧行与右边缘对齐。
- 同一参与者的所在侧冲突会因清晰的校验错误而失败。
- 工程包类型检查已通过 `tsc --noEmit`。
- 配置中的参与者预设会正确覆盖聊天记录头像提示。
- 不是有效预设键的聊天记录头像提示会因清晰的校验错误而失败。
- 包含 `uploadPath` 的 `avatarMode=preset` 配置会因清晰的校验错误而失败。
- 危险的 `--force` 输出目标会在发生任何递归删除前被拒绝。
- 上传头像复制失败后，不会留下包含本地上传路径的已生成 `chatSpec.ts`。
- 随附的 Remotion 渲染脚本会将 `src/index.ts` 保持在合成项 ID 之前。
- `container=none + deviceFrame=iphone-dynamic-island` 会在任何工程包准备或渲染步骤前因清晰的校验错误而失败。
- 代表性渲染覆盖现在会跨越消息的 `appearAt` 帧边界，而不只是检查稍后的静态帧。

## 参考

- 测试矩阵：`references/test-matrix.md`
- 测试运行器：`scripts/run_test_matrix.py`
