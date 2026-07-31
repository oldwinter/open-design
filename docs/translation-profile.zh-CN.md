# Open Design 中文本地化档案

同步上游后，先读本档案，再处理新增或变更的中文内容。

## 项目定位

- 上游项目：`nexu-io/open-design`
- 中文 fork：`oldwinter/open-design`
- Runtime：桌面应用、Web 应用、daemon、CLI、MCP server，以及应用内可发现的 skills、design systems 和 templates
- 主要中文入口：根目录中文文档、`docs/i18n/*zh-CN*`、`apps/web/src/i18n/locales/zh-CN.ts`、landing page 中文 locale，以及已有中文 runtime skill
- 当前同步上游 commit：`517f39acd`

## 本地化目标

本 fork 为中文用户提供可直接阅读和使用的 Open Design，同时保持上游功能、协议、生成行为与验证结果不变。翻译应优先覆盖用户直接看到的 UI、安装与贡献文档、公开操作说明，以及已经以中文作为 runtime 入口的 skill。

## 翻译范围

- 根目录已中文化的文档继续以简体中文维护；上游新增段落应同步补译。
- `zh-CN` / `zh-TW` locale 必须与英文 locale 的 key、插值参数和 HTML 结构保持一致，不能用英文占位代替新增文案。
- 已经中文化的 `skills/**/SKILL.md` 是中文 runtime，后续上游变更需要同步翻译。
- Template 和官方 example 若正文是 canonical executable prompt，默认保留英文正文，并通过 `en_name`、`zh_name`、`en_description`、`zh_description` 和中文 trigger 提供双语发现信息。
- 新增的 design system 可以翻译人类可读规则，但必须保留 section schema、tokens、代码、色值、字体名和精确约束。
- 长篇 RFC、历史 spec、handoff 和内部架构说明默认保留上游英文；只有它们成为当前用户操作入口时才单独翻译。

## 语气与术语

- 面向设计师和开发者使用自然、直接的中文，不逐词硬译。
- Open Design、skill、agent、runtime、artifact、design system、template、prompt、daemon、CLI、MCP、BYOK、WebGL 等项目术语可保留英文。
- Project、artifact 等领域词遵循根目录 `CONTEXT.md`，不要用其中列出的 avoid terms 替换。
- 操作说明先写动作和结果，再解释原因；安全、隐私和权限语义必须与上游等强度。

## 不翻译清单

- 命令、flags、文件路径、URL、Git ref、package 名、环境变量、API endpoint。
- TypeScript/JavaScript/Python 标识符，JSON/YAML key，schema field，enum value，event name 和 analytics payload。
- 测试 fixture、snapshot、golden string、精确错误消息、正则和解析器依赖的字符串。
- 代码注释；仓库规则要求代码注释保持英文。
- Canonical executable prompt contract。需要中文说明时，优先增加双语 metadata 或旁注，不改变会被 agent 执行和测试锁定的正文。

## 同步后检查

- `git diff --check`
- `rg -n '^(<<<<<<< .+|=======|>>>>>>> .+)$' .`
- `pnpm install`
- `pnpm guard`
- `pnpm typecheck`
- 对变更 surface 运行 package-scoped tests；i18n 变更至少运行 Web 与 landing page 的相关检查。
- 涉及可见 UI 时，通过 `pnpm tools-dev run web` 启动真实应用，并在 mobile、tablet、desktop 视口检查中文换行、截断、重叠与 fallback。
- 检查 `zh-CN` / `zh-TW` locale 的 key 和插值变量与英文一致。

## 发布边界

Open Design 是应用发行，不是单一 skill/plugin 安装目标。控制仓库和 README 可以链接中文 fork、中文文档和 release，但不能把上游英文 release 描述成已打包的中文版，也不能声称存在未经验证的一键安装 runtime。
