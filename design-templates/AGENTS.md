# design-templates

此目录存放 **design templates**：agent 会渲染成 project artifact 的 packaged "shapes"（decks、prototypes、image/video/audio templates 等）。每个 entry 是一个文件夹，包含 `SKILL.md`（与 functional skills 同形状）以及 rendering side files（`example.html`、`assets/`、`references/` 等）。

如果 entry 主要是对用户输入*执行工作*（utilities、briefs、asset packagers、fidelity audits），它应放在 `../skills/` 下。完整拆分见 `specs/current/skills-and-design-templates.md`。

## Daemon plumbing

- 列在 `/api/design-templates` 下。该 shape mirror `/api/skills`（相同的 `SkillSummary`/`SkillDetail` types），因此 web client 可以为两个 surfaces 复用同一个 `SkillSummary[]` consumer。
- Asset 和 example routes（`/api/skills/:id/example`、`/api/skills/:id/assets/*`）有意跨两个 registries：无论哪个 root 拥有 folder，example HTML 都会 rewrite 到 `/api/skills/<id>/...`，因此拆分后 URLs 仍可解析。
- 在 EntryView Templates tab 和 New-project panel 中作为 rendering catalogue 展示。

## Adding a design template

1. 创建 `design-templates/<my-template>/SKILL.md`，包含 `name`、`description`、`triggers`，以及显式 `od.mode`（`prototype`、`deck`、`template`、`image`、`video`、`audio` 之一）。
2. 随附 baked `example.html`（以及任何 side files），让 EntryView gallery 有内容可 preview。
3. 可选地把额外 baked samples 放到 `examples/<key>.html` 下，将它们展示为 derived `<parent>:<key>` cards。

## Deck preview navigation contract

任何带 `od.mode: deck` 的 template 都必须让其 baked `example.html` 在 gallery iframe 内可用，而不能依赖 host app 添加 navigation。有 shared deck runtime 时使用它；否则随附一个具备相同最低行为的 tiny local runtime。

- **Keyboard:** `ArrowRight` / `ArrowDown` / `PageDown` / `Space` 移到下一页 slide；`ArrowLeft` / `ArrowUp` / `PageUp` 移到上一页 slide；`Home` 和 `End` 跳到第一页和最后一页。忽略来自 inputs、selects、textareas 和 editable regions 的 events。
- **Wheel / trackpad:** 累积的 `deltaX + deltaY` 超过小阈值后，正好移动一页 slide，然后快速 reset，避免单次 gesture overshoot。
- **Touch:** 约 50px 或以上、且大于 vertical movement 的 horizontal swipe 移动 previous / next。
- **Dots:** 每页 slide 渲染一个 clickable button，在每条 navigation path 上更新 active dot，并用 `aria-current="true"` 标记它。
- **Active slide state:** 保持 visible slide 带有 `.slide.active`；添加 `.is-active` 作为 compatibility alias 也可以。Open Design 的 preview bridge 会读取该 state 来显示 host slide counter，因此它必须与 keyboard、wheel、touch 和 dot navigation 保持同步。
- **Iframe safety:** 在 load / pointer interaction 时 focus deck，让 gallery preview 出现后 keyboard navigation 可用。避免 `scrollIntoView()`，因为它可能移动 parent page 而不是 deck。
- **Fallbacks:** no-script 和 print output 仍应暴露每一页 slide。只在 runtime boot 后隐藏 non-active slides。
