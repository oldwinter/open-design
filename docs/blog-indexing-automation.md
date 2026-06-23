# Blog indexing automation

Open Design landing page 自动化了与 production promotion 绑定的搜索引擎索引环节。它不会通过不受支持的 Google API 或 browser automation 请求索引。

本文是 `nexu-io/open-design` 当前实现的运行手册。

## 自动化内容

| Trigger | Job | Outcome |
|---|---|---|
| `landing-page-ci` | `lint-blog-seo.ts` + `check-blog-url-changes.ts` | Changed posts 在可 merge 前会检查 frontmatter、internal/external links、渲染后的 canonical/JSON-LD/OG metadata，以及 slug 删除/重命名 redirects。 |
| `landing-page-production` promotion 成功完成 | `blog-indexing-on-deploy.yml` | 检测 new blog URLs、验证 ready、提交到 IndexNow、重新向 GSC 提交 sitemap-index、捕获 baseline URL Inspection，并查询 baseline Search Analytics。Staging deploys（`landing-page-staging`）绝不会触发它。 |

`blog-indexing-on-deploy.yml` 会通过 `open-design-bot` GitHub App 打开或刷新 `automation/blog-indexing-status` PR。人类可读的 indexing view 是 `docs/blog-indexing-status.md`；canonical indexing state 是 sidecar `docs/blog-indexing-status.json`。

每次 run 渲染新 report 前，如果 pending 的 `automation/blog-indexing-status` branch 存在，会先从中恢复最新文件。这样即使上一次 status PR 尚未 merge，也能保持 inspection history 连续。如果该 branch 存在但 status files 无法恢复，workflow 会失败，并在 job summary 中记录 restore failure，而不是静默从 stale state 开始。

## 有意不自动化的内容

- 我们不调用 Google 的 Indexing API。它官方仅支持 Job Postings 和 Livestreams；将它用于 blog posts 有 policy flags 风险，而且没有真实收益。
- 我们不自动点击 Search Console UI 来执行 "Request Indexing"。
- 我们不 ping 旧版 `https://www.google.com/ping?sitemap=` endpoint。Google 已在 2023 年弃用它。
- 我们不从本仓库运行每日 Search Console monitoring 或 traffic digest。此前零运行的 scheduled workflows 已移除；只有在有当前 owner 和 run-history acceptance plan 时才恢复。

## Architecture

由于 production 是手工 promotion，可能一次包含多篇已 merge 的 posts，`detect-changed-urls` 会从 `blog-indexed-prod` git tag（该 workflow 上一次成功索引的 commit）开始 diff，而不是从 `HEAD^` 开始。成功 run 结束时，该 tag 会被 force-advance 到已部署 commit，因此下一次 promotion 会精确拾取两者之间 merge 的 posts。首次 run 时该 tag 尚不存在，workflow 会从 `HEAD^` bootstrap。

```text
landing-page-production --success--> blog-indexing-on-deploy
                                        |
                       detect-changed-urls (base = blog-indexed-prod tag)
                                        |
                       verify-readiness (200 / canonical / sitemap)
                                        |
                       submit-indexnow
                                        |
                       submit-sitemap (one PUT)
                                        |
                       inspect-urls (baseline)
                                        |
                       query-search-analytics
                                        |
                       render-status --> docs/blog-indexing-status.md
                                        |
                                   bot PR
```

所有 scripts 都位于 `apps/landing-page/scripts/blog-indexing/`，并直接在 `tsx` 下运行，不需要 compile step。大多数 scripts 只依赖 Node 24 built-ins（`crypto`、`fetch`、`child_process`）。

## 一次性设置

每个环境由 maintainer 执行一次即可。重复执行没有坏处，但没有必要。

### 1. 配置 Google Search Console auth

首选路径：OAuth user refresh token。这可以避开 Google Search Console UI 中新创建 service account email 有时会因 `email not found` 失败的 bug。

1. 前往 <https://console.cloud.google.com/projectcreate>，创建名为 `open-design-blog-indexing` 的 project（或复用团队已有 project）。
2. 在 <https://console.cloud.google.com/apis/library/searchconsole.googleapis.com> 下启用 **Search Console API**。
3. 在 <https://console.cloud.google.com/apis/credentials> 创建 OAuth client：
   - Application type: **Desktop app**
   - Name: `open-design-gsc-local`
4. 在 OAuth consent screen 中，让 app 保持 Testing，并在 **Audience -> Test users** 下添加每个可能授予访问权限的 Google account。
5. 运行本地 helper：

   ```bash
   GSC_OAUTH_CLIENT_ID='<client-id>' \
   GSC_OAUTH_CLIENT_SECRET='<client-secret>' \
   pnpm --filter @open-design/landing-page exec tsx \
     scripts/blog-indexing/authorize-gsc-oauth.ts \
     --out /tmp/open-design-gsc-refresh-token.txt
   ```

6. 打开打印出的 Google URL，并使用 `open-design.ai` Search Console property 的 Owner 账户授权。

Fallback path：service account。创建 `gsc-indexing-bot`，下载 JSON key，然后尝试在 Search Console 中把 `client_email` 添加为 Owner。如果 Search Console 显示 `email not found`，改用 OAuth。

### 2. 将 auth secrets 添加到 GitHub

1. 打开 <https://github.com/nexu-io/open-design/settings/secrets/actions>。
2. 首选 OAuth secrets：
   - `GSC_OAUTH_CLIENT_ID`
   - `GSC_OAUTH_CLIENT_SECRET`
   - `GSC_OAUTH_REFRESH_TOKEN`
3. 可选 service-account fallback：
   - `GSC_SERVICE_ACCOUNT_KEY`
4. 确认现有 `BOT_APP_ID` 和 `BOT_APP_PRIVATE_KEY` secrets 已存在；它们复用自 `refresh-contributors-wall` automation。该 bot 需要对 `nexu-io/open-design` 拥有 `contents:write`、`pull-requests:write` 和 `issues:write`（已配置）。

如果这些 secrets 尚不存在，workflow 不会让 main deploy path 失败。它们会在 job summary 中记录缺失配置，发出 GitHub Actions warning，并在 secrets 添加前跳过 GSC / bot-write steps。

### 3. Smoke test

用任意最近添加 blog post 的 commit SHA 手动触发 `blog-indexing-on-deploy.yml`：

```bash
gh workflow run blog-indexing-on-deploy.yml \
  -R nexu-io/open-design \
  -f head_sha=<sha>
```

成功 run 会产生：

- workflow 上的绿色 check
- 刷新后的 `automation/blog-indexing-status` PR，其中 `docs/blog-indexing-status.md` 有新 rows
- 包含 raw JSON outputs 的 `blog-indexing-<run-id>` artifact
- 带有 IndexNow submission result 的 `indexnow.json` artifact

如果 run 在 **Submit sitemap** step 以 403 失败，说明 service account 尚未成为 GSC property 的 Owner（Step 2）。

## 日常运行

预期 steady state：

- PR opens -> `landing-page-ci` 运行 SEO lint 和 URL-change guards。如果 post 删除/重命名 live slug 但没有明确 redirect，或渲染后的 HTML 丢失 canonical/JSON-LD/OG metadata，则不能 merge。
- Renames 会同时被处理为 old slug 的 redirect requirement，以及 destination slug 的 newly deployed URL，因此新页面会进入 post-deploy readiness 和 baseline inspection flow。
- New post ships -> `landing-page-production` promotion 运行 -> `blog-indexing-on-deploy` 运行 -> 调用 IndexNow、提交 GSC sitemap，并由 bot PR 打开 baseline verdict 以及任何可用的 7d/28d traffic metrics。

Status PR 有意 **不** auto-merge。Maintainer 会 review 每次 refresh，让 daily diff 成为团队了解 search-side health 的一部分。

## 文件

- `apps/landing-page/scripts/blog-indexing/lib.ts` - GSC auth、URL Inspection helper、Search Analytics helper、sitemap helper、retry wrapper、type defs。
- `apps/landing-page/scripts/blog-indexing/detect-changed-urls.ts` - 基于 deploy commit 与 indexed-prod tag 找出 added / modified blog files。
- `apps/landing-page/scripts/blog-indexing/verify-readiness.ts` - HTTP、canonical、noindex 和 sitemap presence checks；poll 直到 Cloudflare propagation 完成。
- `apps/landing-page/scripts/blog-indexing/lint-blog-seo.ts` - CI 中针对 changed posts 的 source/rendered SEO lint。
- `apps/landing-page/scripts/blog-indexing/check-blog-url-changes.ts` - 防止没有 redirects 的 slug 删除/重命名。
- `apps/landing-page/scripts/blog-indexing/submit-indexnow.ts` - 将 changed blog URLs 提交给 IndexNow-compatible engines。
- `apps/landing-page/scripts/blog-indexing/submit-sitemap.ts` - 将 sitemap PUT 到 Search Console（每次 deploy 一次调用）。
- `apps/landing-page/scripts/blog-indexing/inspect-urls.ts` - 对每个 URL 调用 URL Inspection API；发出 `InspectionRecord[]`。
- `apps/landing-page/scripts/blog-indexing/query-search-analytics.ts` - 查询 URL-level 7d/28d impressions、clicks、CTR 和 position。
- `apps/landing-page/scripts/blog-indexing/render-status.ts` - 从 JSON sidecar 重写 `docs/blog-indexing-status.md`。
- `.github/workflows/blog-indexing-on-deploy.yml`
- `docs/blog-indexing-status.md` - human view
- `docs/blog-indexing-status.json` - canonical state

JSON state 会把 `firstInspectedAt` 记录为 automation 首次成功为某个 URL 捕获 inspection 的时间。它不是 Google 的 first-discovery time。
