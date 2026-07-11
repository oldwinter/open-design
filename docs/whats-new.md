# 更新后的“What's New”卡片

应用更新到新版本并重新运行后（桌面端完成更新并重启，或 Web 页面重新加载），首页可以在右下角显示一张仅出现一次的卡片，其中包含标题、简短文案、可选图片和“查看新内容”链接。这项界面提示采用尽力而为的策略：如果内容源无法访问或内容为空，卡片便不会显示，首页也不受影响。

## 内容存放位置

卡片内容是专用 R2 存储桶中一份手工维护的 JSON 文档：

```
https://whatsnew.open-design.ai/whats-new.json
```

项目**不提供逐版本发布工具**，内容也**不会**包含在版本的 `metadata.json` 中。要更改用户看到的内容，只需编辑这一份文件。

- daemon 通过 `GET /api/whats-new` 代理该文档（也可使用 `od whats-new [--json]`），因此 Web 界面和 CLI 读取的是完全相同的数据。
- 这张卡片是一项**发布版本功能**：daemon 只会在真正的发布渠道（`beta`、`prerelease`、`preview`、`stable`）上获取该文档。开发构建和 CI 构建不会显示卡片，也绝不会访问网络，因此卡片不会干扰测试或尚未发布的构建。
- `OD_WHATS_NEW_URL` 可以在本地开发和测试中覆盖内容源（例如指向 `tools-serve` 提供的测试 endpoint），并允许任何渠道启用此功能；设置该变量即可在开发构建中预览卡片。

## 仅显示一次的行为

卡片由**内容标识**驱动，而不是由应用版本驱动。文档中带有一个 `id`；客户端会记住上次显示的 `id`，只有当前 `id` 与其不同时才会打开卡片。因此：

- 每当希望卡片再次出现时，请更改 `id`（例如将其设为新发布版本号）。
- 如果 `id` 保持不变，已经看过卡片的用户不会再次看到它。
- 对于从未见过当前 `id` 的全新用户配置文件，卡片会显示一次。该文档经过人工审定，因此向新用户显示一次当前亮点符合预期设计。

要彻底停用卡片，请发布一个空对象（`{}`），或发布一份不含有效 `id`/`title`/`body` 的文档；daemon 随后会将其解析为“无亮点内容”。

## 文档结构

```json
{
  "id": "0.13.0",
  "title": "Design system sync",
  "body": "Import, edit and sync design systems with cleaner release highlights on Home.",
  "imageUrl": "https://whatsnew.open-design.ai/0.13.0.png",
  "linkUrl": "https://github.com/nexu-io/open-design/releases/tag/open-design-v0.13.0",
  "locales": {
    "zh-CN": {
      "title": "设计系统同步",
      "body": "在首页导入、编辑并同步设计系统，发布亮点更清晰。",
      "linkUrl": "https://open-design.ai/zh/blog/0-13-0/"
    }
  }
}
```

字段规则（任何缺失或格式错误都会导致卡片静默不显示，因此请在上传前完成验证）：

- `id` — **必填**，非空字符串；用于判断卡片是否显示过的键。
- `title`、`body` — **必填**，非空字符串。
- `imageUrl` — 可选，必须使用 `https:`；省略时显示纯文本卡片。
- `linkUrl` — 可选，必须使用 `https:`；省略时，操作链接会回退到 GitHub 版本发布索引页。
- `locales` — 可选的按 locale 覆盖项，以应用的 locale id（`en`、`zh-CN`、…）为键；每项都可以覆盖 `title`/`body`/`linkUrl`。优先使用完全匹配的 locale，其次使用不带地区的语言代码（例如为 `zh-TW` 使用 `zh`），最后使用基础字段。

## 更新文件（S3 API）

该存储桶兼容 S3。使用作用域限定为该存储桶的 R2 令牌：

```bash
AWS_ACCESS_KEY_ID=… AWS_SECRET_ACCESS_KEY=… \
aws s3 cp whats-new.json s3://<bucket>/whats-new.json \
  --endpoint-url https://<account>.r2.cloudflarestorage.com \
  --content-type application/json --cache-control 'public, max-age=300'
```

将 `Cache-Control` 保持在较短的时长，以便编辑内容能及时送达用户；daemon 也会将该文档缓存约 10 分钟。
