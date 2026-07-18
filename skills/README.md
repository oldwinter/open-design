# Skills

本目录存放**功能型 skill**：agent 在处理用户输入时调用的能力，例如 brief、audit、utility 和 asset packager。每个文件夹都包含一份 `SKILL.md`，并可按需附带 `assets/` 或 `references/`。

用于渲染 prototype、deck、document、image、video 和 audio 的形态属于 [`design-templates/`](../design-templates/)，不放在这里。分类规则与迁移历史见 [`specs/current/skills-and-design-templates.md`](../specs/current/skills-and-design-templates.md)。

## 添加 skill

先阅读 [`docs/skills-protocol.md`](../docs/skills-protocol.md)，了解 frontmatter、discovery、precedence 和 mode semantics。复制最接近需求的功能型 skill，保持文件夹自包含，并为处理用户输入的工作设置合适、明确的 `od.mode`。

如果要添加渲染 template，请改为遵循 [`docs/skills-contributing.md`](../docs/skills-contributing.md) 与 [`design-templates/AGENTS.md`](../design-templates/AGENTS.md)。

## License

除非各自的 `LICENSE` 另有说明，本目录中的 skill 均采用 Apache-2.0。[`web-clone/`](web-clone/) 改编自 [Jane-xiaoer/claude-skill-web-clone](https://github.com/Jane-xiaoer/claude-skill-web-clone)。采用 MIT 许可证的 `guizang-ppt` 渲染 template 位于 [`design-templates/guizang-ppt/`](../design-templates/guizang-ppt/)。
