# QA Rubric

所有检查通过之前，不要接受 atlas。

## Geometry

- 尺寸必须精确为 `1536x1872`。
- 8 columns x 9 rows。
- 每一帧都必须位于自己的 `192x208` cell 内。
- 未使用的 cells 必须透明。
- `qa/review.json` 不能包含 errors。
- `frames/frames-manifest.json` 必须记录 production rows 的 component extraction，除非 slot extraction 已在 visual inspection 后被有意接受。

## Character Consistency

- 每一 row 的 silhouette 和 proportions 保持一致。
- Face 与 expression language 保持一致。
- Material、palette、lighting 和 prop design 保持一致。
- 任何 frame 都不能引入非预期的新 character 或 object。

## Sprite Style

- Art 应读作 Codex digital pet sprite，而不是 polished illustration 或 glossy app icon。
- Silhouette 必须 compact、chunky，足以在 `192x208` cell 内清晰可读。
- Outlines 应 dark 且 simple，并带 visible stepped/pixel-style edges。
- Palette 保持有限，使用 flat cel shading，并且 highlights 或 shadow steps 最少。
- 不要出现 painterly texture、realistic fur/material detail、soft gradients、high-detail antialiasing，或在 pet size 下会消失的 tiny accessories。

## Animation Completeness

- 每一 row 都使用准确的 expected number of frames。
- 第一帧和最后一帧可以 loop，且没有明显 pop。
- Directional rows 必须读作预期方向。
- State-specific actions 在 pet size 下必须可识别。
- Poses 必须是 generated animation variants，而不是同一 source image 的重复 copies。

## App Fitness

- 第一张 idle frame 可作为 static reduced-motion pet。
- 没有重要细节小到不可读。
- 任何 frame 都不能被 cell 裁切。
- Failed/review/waiting states 必须不同于普通 idle。
- Contact sheets 必须在 cells 内展示完整 sprite poses，而不是来自较大 reference image 的 cropped tiles。
- 如果每个 used frame 都只是 reference image 加小幅 geometric transforms，则不得接受该 contact sheet。
- Used cells 不得有 white 或 opaque rectangular backgrounds，除非 pet 有意填满整个 cell，且用户接受这个 tradeoff。
- Chroma key 必须在 character 上视觉不可见。如果 extraction 移除了 character regions，请选择不同 key，并 regenerate 受影响的 base/rows。
- Contact sheets 不得在 cells 内展示 edge slivers 或相邻 sprites 的局部。
- Contact sheets 不得把 chroma key 的更深/更浅版本显示为 shadows、dust、smears、glows、landing marks 或 motion effects。这些都是 background extraction failures，应该触发 row repair。
- 如果 `qa/review.json` 报告 edge pixels、sparse frames、size outliers 或 slot-extraction fallback，请 visual inspect 该 row，并在问题可见时修复。
- 如果 `qa/review.json` 报告 chroma-adjacent non-transparent pixels，除非这些 pixels 是 intentional character color 且 selected key 已被手动接受，否则请修复该 row。

## Repair Policy

先修复最小 failing scope：

1. 单个 bad frame。
2. 一 row。
3. 只有当 identity 或 layout 大范围损坏时，才 full atlas regeneration。

Normal production path 应为 failing rows 排队 targeted repair jobs。Manual repair 应保留同一 run directory，并且只 regenerate 受影响的 row prompt/image，除非 base character 是错误的。
