# skills

此目录存放 **functional skills**：agent 在任务中调用、对用户输入执行工作的 capabilities。每个 skill 是一个包含 `SKILL.md`（frontmatter + body）和 workflow 所需 side files（`assets/`、`references/`、scripts 等）的文件夹。

如果 entry 主要是*渲染* design artifact（deck、prototype、image/video/audio template），它应放在 `../design-templates/` 下。完整拆分见 `specs/current/skills-and-design-templates.md`。

## Daemon plumbing

- 列在 `/api/skills` 下（仅 functional）。User-imported skills 会 shadow 具有相同 frontmatter `name` 的 built-in entries。
- Asset routes（`/api/skills/:id/example`、`/api/skills/:id/assets/*`）同时覆盖 functional skills 和 design templates，因此既有 `srcdoc`-rewritten URLs 在拆分后仍能解析。
- Settings → Skills panel 只展示此目录；EntryView Templates tab 改读 design-templates registry。

## Adding a skill

1. 创建 `skills/<my-skill>/SKILL.md`，包含 `name`、`description`、`triggers` 和 `od.mode: utility`（或 `design-system`）frontmatter。
2. 把任何 side files 放在旁边；在 body 中使用 daemon 在 skill preamble 中公布的 relative-from-skill-root paths 引用它们。
3. daemon 的 lazy scanner 会在下一次 `/api/skills` request 时拾取该 entry；local dev 期间不需要 rebuild。

## Curated design / creative catalogue

此目录还附带一个 curated catalogue，包含从 `VoltAgent/awesome-agent-skills` 和 `ComposioHQ/awesome-claude-skills` 手工挑选的 design/creative skills。每个 entry 都是 lightweight stub：frontmatter 加一个指向 upstream repo 的短 body；这样 Settings → Skills tab 开箱即可展示丰富、可筛选的列表，而不用 vendor 每个 upstream workflow。

- 这些 stubs 上的 `od.category` 驱动 Settings → Skills 中新的 category filter row（例如 `image-generation`、`video-generation`、`audio-music`、`slides`、`documents`、`design-systems`、`figma`、`animation-motion`、`3d-shaders`、`diagrams`、`creative-direction`、`marketing-creative`、`screenshots`、`web-artifacts`）。
- Seed script 位于 `scripts/seed-curated-design-skills.ts`，且是 **idempotent**：再次运行只会创建尚不存在的 folders，因此不会覆盖手工编辑过的 stub。要刷新某个 entry，删除 `skills/` 下对应 folder 后重新运行脚本。
- Stubs 有意不 vendor upstream assets。若要用原始 scripts 和 references 运行 upstream workflow，请把 upstream folder 复制到 active agent 的 skills directory（Claude Code、Codex、Cursor 等）；每个 stub 的 body 都说明了做法。
