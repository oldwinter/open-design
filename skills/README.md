# Skills

Skill 是 Open Design 中设计能力的原子单元：一个文件夹、一份 `SKILL.md`，可选附带 `assets/` 与 `references/`。Daemon 启动时会扫描此目录；放入一个文件夹、重启，picker 就会显示它。

## 添加新 skill

→ **[`docs/skills-contributing.md`](../docs/skills-contributing.md)**：贡献者指南。包含 quick start、结构说明、本地开发循环、合并标准、PR template 和常见拒绝模式。

→ **[`docs/skills-protocol.md`](../docs/skills-protocol.md)**：协议 spec。包含 frontmatter 语法、发现规则、mode 语义。

最快路径是复制一个最接近你想法的现有 skill，编辑 `SKILL.md` 和 `example.html`，并在打开 PR 前阅读贡献者指南。我们对 skill 很挑剔，因为它们是用户直接看到的 surface；合并标准是真实存在的，贡献者指南会把它写清楚。

## 已随仓库发布的 skills

每个 skill 的 `SKILL.md` 中的 `mode` 和 `featured` 标记决定它在 picker 中出现的位置。下面的列表只是快速定位；如果想找“从零开始时照着抄”的精选示例，请看 [`docs/skills-contributing.md`](../docs/skills-contributing.md) 中的 **References** 章节。

```bash
# 从 CLI 浏览 registry：
ls skills/
# 54+ 个 skill，覆盖 prototype、deck、template、design-system、image、video、audio 等模式
```

## License

除非各自的 `LICENSE` 另有说明，本目录中的 skills 均为 Apache-2.0。最重要的例外是 [`skills/guizang-ppt/`](guizang-ppt/)，它从 [op7418/guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) 原样打包，使用 MIT license。
