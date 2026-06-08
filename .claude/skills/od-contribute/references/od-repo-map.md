# OD repo map — what goes where

镜像 `nexu-io/open-design` 的 `CONTRIBUTING.md`，这样 skill 不需要每次运行都重新抓取它。**如果这里和 upstream `CONTRIBUTING.md` 漂移，以 upstream 为准**；有疑问时重新读取 live file。

## 三个高杠杆贡献面（来自 OD 的 `CONTRIBUTING.md`）

| If you want to… | You're really adding | Where it lives | Ship size |
|---|---|---|---|
| 让 OD 渲染一种新的 artifact | 一个 **Skill** | `skills/<your-skill>/` | 一个文件夹，约 2 个文件 |
| 让 OD 说一种新品牌的视觉语言 | 一个 **Design System** | `design-systems/<brand>/DESIGN.md` | 一个 Markdown 文件 |
| 接入新的 coding-agent CLI | 一个 **Agent adapter** | `apps/daemon/src/agents.ts` | 约 10 行（代码，不在本 skill 范围内） |
| 改进 docs、把某段移植到 fr / de / zh-CN、修 typo | docs | `README.md`、`docs/i18n/README.fr.md`、`docs/i18n/README.de.md`、`docs/i18n/README.zh-CN.md`、`docs/`、`QUICKSTART.md` | 一个 PR |

## 已知 localized doc files

| Doc family | English source | Translations seen on disk (as of plan time) |
|---|---|---|
| README | `README.md` | ar, de, es, fr, ja-JP, ko, pt-BR, ru, tr, uk, zh-CN, zh-TW |
| QUICKSTART | `QUICKSTART.md` | de, fr, ja-JP, pt-BR, zh-CN, zh-TW |
| CONTRIBUTING | `CONTRIBUTING.md` | de, fr, ja-JP, pt-BR, zh-CN |
| MAINTAINERS | `MAINTAINERS.md` | de, fr, ja-JP, pt-BR, zh-CN |

`discover-i18n-gaps.sh` skill **不会** 信任这张表；它会在 runtime 扫描 workspace。只有在没有 workspace、但需要给 `AskUserQuestion` card 预置选项时，才使用这份列表。

## Issue templates

- `bug-report.yml` — required fields：description、steps to reproduce、expected、version、platform。
- `feature-request.yml` — 不在本 skill 范围内（feature requests 应来自 product，而不是 auto-routed）。
- `preview-v0.8.0-feedback.yml` — branch-specific。

## 不在本 skill 范围内的 surfaces

- `apps/daemon/src/` — daemon code。需要真实 review。
- `apps/web/src/` — web app code。需要真实 review。
- `packages/`、`plugins/`、`tools/` — internal libs。
- `e2e/` — Playwright-driven；authoring 成本不低。

如果用户要求贡献这些 surfaces，请建议使用原始的 `auto-github-contributor` skill（TDD pipeline）。
