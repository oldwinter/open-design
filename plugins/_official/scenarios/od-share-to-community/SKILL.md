---
name: od-share-to-community
description: 将用户刚完成的作品打包成 Open Design plugin，不询问项目文件已经能回答的字段，然后展示已有的 Add-to-My-plugins / Open-Design-PR 按钮。
od:
  scenario: plugin-sharing
  mode: scenario
---

# od-share-to-community (scenario)

由完成后 Discord prompt 旁边的 "Share to Open Design" 按钮触发。用户刚在这个项目里完成一件作品，并希望把它作为 plugin 发布。他们还没有被问过任何问题。

## 必需结果

在当前项目 workspace 中生成名为 `generated-plugin/` 的文件夹。至少包含：

- `SKILL.md`，带 frontmatter 和清晰的 agent instructions。
- `open-design.json`，包含有效 plugin metadata：`specVersion`、`name`、`version`、`description`、mode、task kind、inputs，以及工作流需要的 pipeline / context references。
- 脚手架阶段 `plugin.repo` 是可选的，但不要静默省略：先检查 `gh --version` 和 `gh auth status`，优先使用 auth status 打印的本地账号 login。只有当 auth status 没有暴露 login 时，才用 `gh api user --jq .login` 作为 fallback。如果 `gh` 缺失、未登录、被 rate-limit，或无法解析真实 owner，则省略 `plugin.repo`，不要编造 owner，并明确报告 auth 问题，同时给出 `gh auth refresh -h github.com -s repo,workflow`、`gh auth login -h github.com -s repo,workflow` 或 `od plugin publish-repo generated-plugin --owner <github-login-or-org>` 作为恢复命令。绝不要把 `open-design-user`、`<vendor>`、`example-user`、`your-org`、`your-username` 这类占位 owner 写入最终 manifest。
- 可选的 `examples/` 和 `assets/` 仅在有助于 review 或复用时创建。

## 从项目自动推导，不要询问文件已经能回答的字段

Agent 的 CWD 是用户的 OD 项目根目录。生成任何东西之前，**先读取已有文件**并从中推断 plugin。把项目文件视为事实来源；用户不需要重新输入你已经能看到的内容。

按以下顺序读取，并从中提取对应信息：

1. 项目根目录的 `*.artifact.json`（或 `artifact.json`）- task kind、mode、用户实际运行的 prompt、agent 产出的文件。它驱动 `od.taskKind`、`od.mode`、默认 `useCase.query` 和 example output path。
2. 如果存在 `brand-spec.md` / `DESIGN.md` - voice、brand name、audience。并入 plugin description 和 tags。
3. 项目 workspace 中生成的 artifact 列表（本次 session 中 agent 写入的 `*.html`、`*.tsx`、`*.svg` 等）- 复制到 `generated-plugin/examples/` 后，选择最新/最大的一个作为 `useCase.exampleOutputs[0].path`。
4. 如果 runtime 暴露了本轮对话的用户第一条 prompt - 用户想要什么的自然语言描述。并入 `description` 和默认 `useCase.query`。

从推导出的内容选择稳定的 plugin id：小写字母、数字、短横线、下划线、点号。优先使用 brand-spec 或 artifact metadata 暗示的名称，不要凭空发明。

如果某个字段真的无法推导（例如没有 artifact.json、没有 brand-spec、项目太空），才询问用户，并且只发起**一次**合并的 `AskUserQuestion`，不要逐字段追问。把已经推导出的信息作为默认答案，让用户可以一路确认。

## 报告前先本地验证 plugin

先对文件夹运行 `od plugin validate`，再运行 `od plugin pack` 生成 tarball，最后运行 `od plugin install --source <absolute-folder-path>` 确认安装路径可用。

## 上述工作完成后

写一条总结，说明：创建了哪些文件、`od plugin validate` 状态、本地 install / run 状态，以及 `od plugin pack` 输出。然后停止。

## 不要自行串起 publish-repo / Open-Design-PR 流程

不要建议后续 CLI 命令，例如 `od plugin publish`、`od plugin publish --to open-design`、`gh repo create`、`git init` / `git remote add` / `git push`，或任何其他 publish / repo wiring。Design Files 里的 plugin-folder card 已经暴露三个按钮，对应 prompt 会用内置的 auth gates、fallback 和 retry rules 端到端驱动这些流程：

- **Add to My plugins** - 已由本轮 `od plugin install --source` 步骤满足。
- **Publish repo** - 通过精确的 gh + git 序列创建/更新作者的 `plugin.repo` GitHub repo。
- **Open Design PR** - 向 `nexu-io/open-design` 的 community catalog 打开 draft PR。

告诉用户他们下一步可以点击对应按钮；不要在 summary 中用自由文本重造这些流程。重造流程会偏离按钮 prompt 的保证，也是关闭 #2332 的 bug 来源。

## 不要假设 `jq` 在 PATH 上

不要假设 standalone `jq` binary 已安装（它不是 OD agent runtime baseline 的一部分，在默认 macOS / Windows shell 中也缺失）。需要读取 manifest 时，优先使用内置文件读取工具；其次用 `cat generated-plugin/open-design.json` 后手动解析 JSON；再其次用 `node -e 'console.log(JSON.parse(require("fs").readFileSync("generated-plugin/open-design.json","utf8")))'`。`gh ... --jq` flag 可以使用，因为 gh 自带嵌入库；brew 安装的 standalone `jq` 不可假设存在。

## 语言

任何 `AskUserQuestion` 标签、状态更新和错误说明都要镜像用户的聊天语言。生成的 artifact（manifest 字段、SKILL.md body、PR / commit messages、branch names）必须保持英文，无论聊天语言是什么；这是 OD plugins-spec 约定，也与 `plugins/_official/scenarios/` 下已有 scenario 保持一致。

## 建议文件夹形态

```text
generated-plugin/
  SKILL.md
  open-design.json
  examples/
    <copied-from-the-project>
  assets/
    <if-needed>
```

## Spec references

- `docs/plugins-spec.md`
- `docs/schemas/open-design.plugin.v1.json`
- 同级的 `plugins/_official/scenarios/od-plugin-authoring/SKILL.md`，作为从零 authoring 的对应流程。
