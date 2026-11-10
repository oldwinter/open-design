# 更新后的“What's New”卡片

应用更新到新版本并重新运行后（桌面端完成更新并重启，或 Web 页面重新加载），首页可以在右下角显示一张仅出现一次的卡片，其中包含标题、简短文案、可选图片和“查看新内容”链接。这项界面提示采用尽力而为的策略：如果内容源无法访问或内容为空，卡片便不会显示，首页也不受影响。

## 内容存放位置

卡片内容是专用 R2 存储桶中一份手工维护的 JSON 文档，保存在本仓库的：

```
docs/whats-new.json
```

`.github/workflows/whats-new-publish.yml` 会把该文件发布到 daemon 读取的对象：

```
https://whatsnew.open-design.ai/whats-new.json
```

因此，修改卡片就是一次普通的 pull request——不需要本地 Cloudflare 凭据，不需要
wrangler，也没有个人瓶颈。内容**不会**包含在版本的 `metadata.json` 中，项目也
**不提供逐版本发布工具**：只需在这一份文件里修改文案。

- daemon 通过 `GET /api/whats-new` 代理该文档（也可使用 `od whats-new [--json]`），因此 Web 界面和 CLI 读取的是完全相同的数据。
- 这张卡片是一项**发布版本功能**：daemon 只会在真正的发布渠道（`beta`、`prerelease`、`preview`、`stable`）上获取该文档。开发构建和 CI 构建不会显示卡片，也绝不会访问网络，因此卡片不会干扰测试或尚未发布的构建。
- `OD_WHATS_NEW_URL` 可以在本地开发和测试中覆盖内容源（例如指向 `tools-serve` 提供的测试 endpoint），并允许任何渠道启用此功能；设置该变量即可在开发构建中预览卡片。

## 仅显示一次的行为

卡片由**内容标识**驱动，而不是由应用版本驱动。文档中带有一个 `id`；客户端会记住上次显示的 `id`，只有当前 `id` 与其不同时才会打开卡片。因此：

- 每当希望卡片再次出现时，请更改 `id`（例如将其设为新发布版本号）。
- 如果 `id` 保持不变，已经看过卡片的用户不会再次看到它。
- 对于从未见过当前 `id` 的全新用户配置文件，卡片会显示一次。该文档经过人工审定，因此向新用户显示一次当前亮点符合预期设计。

要彻底停用卡片，请发布一个空对象（`{}`）；daemon 随后会将其解析为“无亮点内容”。
其他任何不完整文档也会解析为“无亮点内容”，但那属于意外情况，而不是预期行为——
guard 只接受完整亮点或空文档，因此下线卡片是一个明确动作，不会因为一个拼写错误
而意外发生。

## 文档结构

```json
{
  "id": "0.13.0",
  "title": "Design system sync",
  "body": "Import, edit and sync design systems with cleaner release highlights on Home.",
  "imageUrl": "https://whatsnew.open-design.ai/0.13.0.png",
  "linkUrl": "https://github.com/nexu-io/open-design/releases/tag/open-design-v0.13.0",
  "ctaLabel": "View release notes",
  "locales": {
    "zh-CN": {
      "title": "设计系统同步",
      "body": "在首页导入、编辑并同步设计系统，发布亮点更清晰。",
      "linkUrl": "https://open-design.ai/zh/blog/0-13-0/",
      "ctaLabel": "查看更新说明"
    }
  }
}
```

字段规则（任何缺失或格式错误都会导致卡片静默不显示，因此 `pnpm guard` 会用实际
发布解析器校验仓库中的文档，而不是只依赖评审）：

- `id` — **必填**，非空字符串；用于判断卡片是否显示过的键。
- `title`、`body` — **必填**，非空字符串。
- `imageUrl` — 可选，必须使用 `https:`；省略时显示纯文本卡片。
- `linkUrl` — 可选，必须使用 `https:`；省略时，操作链接会回退到 GitHub 版本发布索引页。
- `ctaLabel` — 可选，非空纯文本按钮标签。省略时使用客户端本地化的 release notes 标签。早于该字段的客户端会忽略它并保留内置标签；要支持它需要更新客户端。
- `locales` — 可选的按 locale 覆盖项，以应用的 locale id（`en`、`zh-CN`、…）为键；每项都可以覆盖 `title`/`body`/`linkUrl`/`ctaLabel`。优先使用完全匹配的 locale，其次使用不带地区的语言代码（例如为 `zh-TW` 使用 `zh`），最后使用基础字段。

## 更新卡片

1. 在对应的 `release/vX.Y.Z` 分支上编辑 `docs/whats-new.json`，请 release maintainer 评审并把文案落到该分支。主文案仍支持通过 `main` pull request 更新。
2. `pnpm guard` 会在每个 PR 上校验该文档（`scripts/check-whats-new-document.ts`）。它会让文档通过 daemon 自己的解析器，并在卡片不会显示、可选字段会被静默丢弃或字段名拼错时失败。这一点很重要，因为 runtime 采用 fail-safe：格式错误的文档不会报错，只会让卡片消失。
3. 合并到 `main` 后，`whats-new-publish.yml` 会先上传文件（`application/json`、`cache-control: public, max-age=300`），再绕过 edge cache 从 `https://whatsnew.open-design.ai/whats-new.json` 读回。只有返回的字节与上传的字节一致时任务才通过——上传命令的退出码本身不能作为证明。

要发布 release 文案，请针对对应的 `release/vX.Y.Z` 分支手动运行 **whats-new-publish**（`workflow_dispatch`）：

```bash
gh workflow run whats-new-publish.yml --repo nexu-io/open-design \
  --ref release/v0.22.0 -f dry_run=true
# After reviewing the proposed document and id:
gh workflow run whats-new-publish.yml --repo nexu-io/open-design \
  --ref release/v0.22.0 -f dry_run=false
```

所选分支必须包含该 workflow、它的 publisher 与 validation 脚本以及
`docs/whats-new.json`。两个 job 都会 checkout 本次 run 固定的 `github.sha`，
因此即使分支移动，validation 和 upload 仍使用同一 commit。新的 dispatch 会取
分支当前 commit；如果 dry run 后 commit 有变化，请重新检查并重新确认文案。只有
`main` 和精确的 `release/vX.Y.Z` 分支可以发布；tag 和任意 feature 分支都不行。
dry run 不需要凭据，并且只要分支包含该 workflow 就能运行。仍然支持针对 `main`
手动发布。

向 release 分支 push 不会自动触发这个 publisher。该 workflow 只上传托管的 JSON，
不会构建应用。向 `release/**` 落地 commit 可能会独立触发仓库的 prerelease
workflow。该对象由所有 release channel 共享：发布前请比较线上与拟发布的 `id`，
因为发布旧分支会替换所有客户端看到的同一张卡片，而不是创建带版本的副本。

传播最多需要约 15 分钟：对象自身的 `max-age=300` 加上 daemon 约 10 分钟的进程内缓存。

### 凭据与信任边界

卡片一旦发布，所有已安装客户端都会立即看到，因此“已发布”必须意味着“已评审”。
保证这一点的控制项是 **`whats-new-publish` GitHub environment**：

- 它的 deployment-branch policy 允许 **`main` 和 `release/v*` 分支**，因此声明该 environment 的 job 无法在这些分支之外启动；请确保这些受信分支上的 workflow 和源码改动都经过评审。workflow 还要求精确的 `release/vX.Y.Z` 名称（版本段不能带后缀或前导零），因为 environment 使用的是更宽泛的 glob；
- R2 凭据是该 environment 上的 **environment secrets**——`CLOUDFLARE_R2_WHATS_NEW_AK`、`CLOUDFLARE_R2_WHATS_NEW_SK`、`CLOUDFLARE_R2_WHATS_NEW_URL`、`CLOUDFLARE_R2_WHATS_NEW_BUCKET`。

两部分都不可或缺。`workflow_dispatch` 会运行被 dispatch 的那个 ref 上的 workflow
文件，因此 workflow 内的所有检查（包括分支名断言）都能被触发者修改。无法修改的是
secret 的存放位置：为了绕过 branch policy 而删除 `environment:` 声明，也会同时
失去 secret 访问权，publisher 随后会因缺少变量而失败。

**不要把这些凭据添加为 repository secrets。** repository secrets 可被任意分支上的
任意 job 读取，这会让任何有写权限的人从自己的分支 dispatch 修改过的 workflow，
发布未经评审的内容。

该结构由 `pnpm guard` 的 `what's new publish workflow` 检查固定
（`scripts/check-whats-new-publish-workflow.ts`）：持有凭据的 job 必须声明
environment，必须在 `validate` 通过后才能启动，其他 job 不得持有 environment
或读取 secret。该检查从 CI 的无条件 preflight job 运行，而不是走按路径路由的
test lane，因为仅修改 workflow 不会选中任何测试工作负载——按 lane 路由的断言
恰好会在这个它要守护的改动上被跳过。

它通过 YAML parser 读取 workflow，而不是匹配文本；并在任意 `${{ … }}` 表达式中
查找 `secrets` **context identifier**，而不是匹配特定访问形式。这两个选择都
不可或缺：`secrets['NAME']`、`toJSON(secrets)` 和裸 `secrets` 都是 secret 读取，
而双引号 YAML scalar 可以通过反斜杠续行拆开 `secrets`，让原始文本完全看不到它。

仓库级的 `CLOUDFLARE_API_TOKEN` 是 Pages 范围的 token，根本无法访问 R2；不要让
这次发布走它。
