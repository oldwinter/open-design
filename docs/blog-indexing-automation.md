# Blog indexing automation

Open Design landing page 自动化了 Google 官方支持的普通 blog 内容搜索引擎索引环节。它不会假装通过不受支持的 API 或 browser automation 为 blog posts 执行 "submit" 或 "request indexing"。

本文是运行手册。定义规则的 skill 位于 `~/.codex/skills/blog-indexing-automation/SKILL.md`；本文档是它在 `nexu-io/open-design` 中的具体实现。

## 自动化内容

| Trigger | Job | Outcome |
|---|---|---|
| `landing-page-ci` | `lint-blog-seo.ts` + `check-blog-url-changes.ts` | Changed posts 在可 merge 前会检查 frontmatter、internal/external links、渲染后的 canonical/JSON-LD/OG metadata，以及 slug 删除/重命名 redirects。 |
| `landing-page-production` promotion 成功完成 | `blog-indexing-on-deploy.yml` | 检测 new blog URLs、验证 ready、提交到 IndexNow、重新向 GSC 提交 sitemap-index、捕获 baseline URL Inspection，并查询 baseline Search Analytics。Staging deploys（`landing-page-staging`）绝不会触发它。 |
| Daily `cron: 0 2 * * *` | `blog-indexing-monitor.yml` | 重新检查 T+1 / T+3 / T+7 / T+14 window 中的每篇 blog post；刷新 GSC Search Analytics；需要时打开/刷新 stall 和 low-traffic issues。 |
| Daily `cron: 0 2 * * *`（Asia/Shanghai 10:00） | `blog-3day-report.yml` | 通过 `automation/blog-traffic-digest` PR 将 T-3 cohort + 30-day rolling cohort traffic digest 写入 `docs/blog-traffic-digest.md`，并可选推送到 Feishu group。对 GSC 只读。 |
| Manual `workflow_dispatch` | `blog-indexing-monitor.yml` | Maintainers 可以 dry-run，或显式发布受 token gate 保护的 dev.to/Hashnode cross-post，其 canonical URL 指回 Open Design。 |

Monitor 和 3-day digest workflows 会通过 `open-design-bot` GitHub App 把 durable outputs 提交回仓库。Monitor 会打开或刷新 `automation/blog-indexing-status` PR；traffic digest 会打开或刷新 `automation/blog-traffic-digest` PR。人类可读的 indexing view 是 `docs/blog-indexing-status.md`；canonical indexing state 是 sidecar `docs/blog-indexing-status.json`。人类可读的 traffic view 是 `docs/blog-traffic-digest.md`。

每次 run 渲染新 report 前，如果 pending 的 `automation/blog-indexing-status` branch 存在，会先从中恢复最新文件。这样即使上一次 status PR 尚未 merge，也能保持 inspection history 连续。如果该 branch 存在但 status files 无法恢复，workflow 会失败，并在 job summary 中记录 restore failure，而不是静默从 stale state 开始。

## 有意不自动化的内容

按照 `blog-indexing-automation` skill：

- 我们不调用 Google 的 Indexing API。它官方仅支持 Job Postings 和 Livestreams；将它用于 blog posts 有 policy flags 风险，而且没有真实收益。
- 我们不自动点击 Search Console UI 来执行 "Request Indexing"。该 skill 将这种做法标记为脆弱的最后手段。
- 我们不 ping 旧版 `https://www.google.com/ping?sitemap=` endpoint。Google 已在 2023 年弃用它。
- 我们不尝试每天检查站点上的每个 URL。我们只检查 deploy 后 changed URLs，以及 T+1/T+3/T+7/T+14 window 中的 posts。
- 我们不自动发布 cross-posts。Cross-post scaffold 默认是 dry-run，并且要求同时具备 platform tokens 和 `publish_crosspost=true`。

当 automation 无法解决 indexing 问题时（例如 Google 已有 URL 但拒绝索引），monitor 会打开 GitHub issue，描述可能的 failure mode，便于人类修复底层 content / SEO issue。

## Architecture

由于 production 是手工 promotion，可能一次包含多篇已 merge 的 posts，`detect-changed-urls` 会从 `blog-indexed-prod` git tag（该 workflow 上一次成功索引的 commit）开始 diff，而不是从 `HEAD^` 开始。成功 run 结束时，该 tag 会被 force-advance 到已部署 commit，因此下一次 promotion 会精确拾取两者之间 merge 的 posts。首次 run 时该 tag 尚不存在，workflow 会从 `HEAD^` bootstrap；如果需要初始 multi-commit backfill，请手动创建 tag（`git tag blog-indexed-prod <sha>; git push origin blog-indexed-prod`）。

```
landing-page-production ──success──▶ blog-indexing-on-deploy
                                        │
                       detect-changed-urls (base = blog-indexed-prod tag)
                                        │
                       verify-readiness (200 / canonical / sitemap)
                                        │
                       submit-indexnow
                                        │
                       submit-sitemap (one PUT)
                                        │
                       inspect-urls (baseline)
                                        │
                       query-search-analytics
                                        │
                       render-status ──▶ docs/blog-indexing-status.md
                                        │
                                   bot PR

cron 02:00 UTC ──▶ blog-indexing-monitor
                          │
            scheduled-window (T+1/T+3/T+7/T+14 today)
                          │
                  inspect-urls
                          │
                  query-search-analytics
                          │
            render-status ──▶ docs/blog-indexing-status.md
                          │
            escalate-stalls ──▶ open / refresh / close stall issue
                          │
            escalate-low-traffic ──▶ open / refresh / close traffic issue
                          │
                     bot PR

cron 02:00 UTC ──▶ blog-3day-report
                          │
            report-3day (T-3 cohort + 30-day rolling cohort)
                          │
                  querySearchAnalytics (windowDays=3)
                          │
                  inspectUrl (T-3 cohort only)
                          │
            upsert ──▶ docs/blog-traffic-digest.md
                          │
                  post-feishu-digest (optional webhook)
                          │
                     bot PR (automation/blog-traffic-digest)
```

所有 scripts 都位于 `apps/landing-page/scripts/blog-indexing/`，并直接在 `tsx` 下运行，不需要 compile step。大多数 scripts 只依赖 Node 24 built-ins（`crypto`、`fetch`、`child_process`）。RSS 使用 `@astrojs/rss`。

## 一次性设置

每个环境由 maintainer 执行一次即可。重复执行没有坏处，但没有必要。

### 1. 配置 Google Search Console auth

首选路径：OAuth user refresh token。这可以避开 Google Search Console UI 中新创建 service account email 有时会因 `email not found` 失败的 bug。

1. 前往 <https://console.cloud.google.com/projectcreate>，创建名为 `open-design-blog-indexing` 的 project（或复用团队已有 project）。
2. 在 <https://console.cloud.google.com/apis/library/searchconsole.googleapis.com> 下启用 **Search Console API**。
3. 在
   <https://console.cloud.google.com/apis/credentials>:
   - Application type: **Desktop app**
   - Name: `open-design-gsc-local`
   创建 OAuth client。
4. 在 OAuth consent screen 中，让 app 保持 Testing，并在 **Audience → Test users** 下添加每个可能授予访问权限的 Google account。
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

如果这些 secrets 尚不存在，workflows 不会让 main deploy path 失败。它们会在 job summary 中记录缺失配置，发出 GitHub Actions warning，并在 secrets 添加前跳过 GSC / bot-write steps。

### 3. 可选 platform secrets

这些不是 indexing 必需项。

- `DEVTO_API_KEY` — 仅当 maintainer 希望 `blog-indexing-monitor.yml` 发布 dev.to cross-post 时需要。
- `HASHNODE_TOKEN` 和 `HASHNODE_PUBLICATION_ID` — 仅 Hashnode cross-posts 需要。
- `FEISHU_BLOG_DIGEST_WEBHOOK` — 每日 `blog-3day-report.yml` digest push 的可选 Feishu custom bot webhook。缺少这个 secret 不会让 workflow 失败；digest 仍会落到 `docs/blog-traffic-digest.md`，并作为 Actions artifact 保存。
- `CLOUDFLARE_ZONE_ID` — 如果未来选择直接 purge cache，可作为可选优化。当前 automation 会 polling live sitemap 直到 new URLs 出现，因此不需要这个 secret。

IndexNow 不需要 secret。Public verification key 已提交在 `apps/landing-page/public/96b0928121e24fd7b4ef85ae0f8bf1d8.txt`。

### 4. Smoke test

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

- PR opens → `landing-page-ci` 运行 SEO lint 和 URL-change guards。如果 post 删除/重命名 live slug 但没有明确 redirect，或渲染后的 HTML 丢失 canonical/JSON-LD/OG metadata，则不能 merge。
- Renames 会同时被处理为 old slug 的 redirect requirement，以及 destination slug 的 newly deployed URL，因此新页面会进入 post-deploy readiness 和 baseline inspection flow。
- New post ships → `landing-page-production` promotion 运行 → `blog-indexing-on-deploy` 运行 → 调用 IndexNow、提交 GSC sitemap，并由 bot PR 打开 baseline verdict 以及任何可用的 7d/28d traffic metrics。
- Daily monitor runs → T+1 时 post 通常移动到 `Crawled - currently not indexed`。到 T+3–T+7，健康的 post 应为 `Submitted and indexed`。Status table 会反映这个状态。
- 如果 T+7 已过而 post 仍未 indexed，monitor 会打开 `Blog indexing — URLs stalled in Search Console` issue，列出受影响 URLs，重新提交到 IndexNow，并在每次 refresh 时记录 history comment。如果 issue 持续打开，请使用 URL Inspection live test 手工 triage。
- 如果 T+14 已过，post 已 indexed，而 GSC 仍报告零 impressions，monitor 会打开 `Blog traffic — indexed posts with zero impressions`。请把它视为 distribution/query-fit issue，而不是 indexing issue。
- Daily traffic digest 在 Asia/Shanghai 10:00 运行。它写入 `docs/blog-traffic-digest.md`，上传 Markdown 和 compact JSON summary 作为 artifact，可选发送 compact Feishu card，并打开或刷新 `automation/blog-traffic-digest`。Feishu card 只用于投递；Markdown file 和 bot PR 仍是 source of truth。

Status PR 有意 **不** auto-merge。Maintainer 会 review 每次 refresh，让 daily diff 成为团队了解 search-side health 的一部分。

## 文件

- `apps/landing-page/scripts/blog-indexing/lib.ts` — GSC auth、URL Inspection helper、Search Analytics helper、sitemap helper、retry wrapper、type defs。
- `apps/landing-page/scripts/blog-indexing/detect-changed-urls.ts` — 将 deploy commit 与其 parent 做 diff，找出 added / modified blog files。
- `apps/landing-page/scripts/blog-indexing/verify-readiness.ts` — HTTP、canonical、noindex 和 sitemap presence checks；poll 直到 Cloudflare propagation 完成。
- `apps/landing-page/scripts/blog-indexing/lint-blog-seo.ts` — CI 中针对 changed posts 的 source/rendered SEO lint。
- `apps/landing-page/scripts/blog-indexing/check-blog-url-changes.ts` — 防止没有 redirects 的 slug 删除/重命名。
- `apps/landing-page/scripts/blog-indexing/submit-indexnow.ts` — 将 changed/stalled blog URLs 提交给 IndexNow-compatible engines。
- `apps/landing-page/scripts/blog-indexing/submit-sitemap.ts` — 将 sitemap PUT 到 Search Console（每次 deploy 一次调用）。
- `apps/landing-page/scripts/blog-indexing/inspect-urls.ts` — 对每个 URL 调用 URL Inspection API；发出 `InspectionRecord[]`。
- `apps/landing-page/scripts/blog-indexing/query-search-analytics.ts` — 查询 URL-level 7d/28d impressions、clicks、CTR 和 position。
- `apps/landing-page/scripts/blog-indexing/render-status.ts` — 从 JSON sidecar 重写 `docs/blog-indexing-status.md`。
- `apps/landing-page/scripts/blog-indexing/scheduled-window.ts` — 发出今天 T+1 / T+3 / T+7 / T+14 buckets 中的 URLs。
- `apps/landing-page/scripts/blog-indexing/escalate-stalls.ts` — 判断 stall issue 是否需要 open / refresh / close。
- `apps/landing-page/scripts/blog-indexing/escalate-low-traffic.ts` — 判断 indexed-but-zero-impression posts 是否需要 traffic issue。
- `apps/landing-page/scripts/blog-indexing/crosspost.ts` — dry-run/token-gated dev.to 或 Hashnode cross-post scaffold。
- `apps/landing-page/scripts/blog-indexing/report-3day.ts` — 每日 T-3 cohort + 30-day rolling cohort digest，写入 `docs/blog-traffic-digest.md`。
- `apps/landing-page/scripts/blog-indexing/post-feishu-digest.ts` — 将 compact 3-day digest summary 发送到可选 Feishu custom bot webhook。
- `apps/landing-page/app/pages/rss.xml.ts`
- `apps/landing-page/public/llms.txt`
- `apps/landing-page/public/_redirects`
- `.github/workflows/blog-indexing-on-deploy.yml`
- `.github/workflows/blog-indexing-monitor.yml`
- `.github/workflows/blog-3day-report.yml`
- `docs/blog-indexing-status.md` — human view（auto-generated）
- `docs/blog-indexing-status.json` — canonical state（auto-generated）
- `docs/blog-traffic-digest.md` — daily traffic digest（auto-generated）

JSON state 会把 `firstInspectedAt` 记录为 automation 首次成功为某个 URL 捕获 inspection 的时间。它不是 Google 的 first-discovery time；escalation scripts 在计算 age windows 时优先使用 post frontmatter date，只把该 inspection timestamp 作为 fallback。
