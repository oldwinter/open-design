# Open Design Plugin Registry Strategy Plan

**Date:** 2026-05-13
**Related:** [docs/plugins-spec.zh-CN.md](../../docs/plugins-spec.zh-CN.md), [docs/plans/plugins-implementation.md](../../docs/plans/plugins-implementation.md), [specs/current/plugin-authoring-flow-plan.md](plugin-authoring-flow-plan.md), [specs/current/plugin-driven-flow-plan.md](plugin-driven-flow-plan.md)

## 目的

将 Open Design plugins 从“已安装的本地 workflows 加一个轻量 marketplace index”，推进为 registry-shaped ecosystem：

- Open Design 在 main site 上托管 official catalog，并在那里发布 first-party plugins。
- Community authors 通过向 Open Design registry repository 开 GitHub PR 来 publish。
- `od` 仍是 CRUD、search、install、update、trust、pack、doctor 和 publish 的 canonical headless API。
- Third parties 可以 self-host 同样形态的 `open-design-marketplace.json`，作为自己的 plugin source。
- 初始 backend 是通过 `gh` 驱动的 GitHub repository state；daemon 和 CLI 通过 registry interface 交互，该 interface 以后可以由 database 支撑。
- Enterprise deployments 可以在真实 database backend 上运行同一套 registry contract，用于 private catalogs、policy、audit、approvals、SSO 和 commercial entitlements。

目标 product posture 更接近“ClawHub 加 npm registry discipline”，而不是静态 plugin gallery：可发现、可版本化、可审计、可自动化，并能跨 official、community 和 private sources 移植。

## 外部参考要点

ClawHub 建立了一个有用的拆分：

- Runtime installs 保持 host product 原生：OpenClaw 通过 `openclaw` commands 暴露 skill/plugin search、install 和 update。
- Registry-authenticated flows 位于单独的 CLI surface：`clawhub login`、publish、delete/undelete、sync、inspect 和 package publish。
- Public detail pages 在 install 前展示足够状态：semver versions、tags、changelogs、files、downloads、stars 和 security scan summaries。
- Install/update 会持久化 source metadata，后续 updates 继续通过同一个 registry source 解析。
- 当存在 uploaded package artifact 时，package installs 会验证 compatibility metadata 和 archive digest。

skills.sh 提供了低摩擦 public directory pattern：

- one-command install 是核心 CTA。
- GitHub repo identity 是通用 authoring/distribution primitive。
- public site 主要是 searchable directory 和 leaderboard，而不是沉重的 authoring UI。

npm 提供了我们应选择性借鉴的 package-management discipline：

- `name@version` 和 `name@tag` resolution，其中 `latest` 是 default tag。
- lockfile entries 包含 resolved source 和 integrity，以支持 reproducible installs。
- `doctor`、`view/info`、`outdated`、`update`、`publish --tag`，以及 policy-aware install/update flows。

已检查参考：

- [ClawHub docs](https://documentation.openclaw.ai/clawhub)
- [openclaw/clawhub README](https://github.com/openclaw/clawhub)
- [skills.sh CLI docs](https://skills.sh/docs/cli)
- [npm dist-tag docs](https://docs.npmjs.com/cli/v11/commands/npm-dist-tag/)
- [npm package-lock docs](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)

## 当前状态

repo 已经具备正确的底层基础：

- `docs/plugins-spec.zh-CN.md` 将 CLI 命名为 canonical API，支持 headless OD，并预留 federated `open-design-marketplace.json`。
- `packages/contracts/src/plugins/marketplace.ts` 有一个 permissive catalog schema，可承载 community-specific fields。
- `apps/daemon/src/plugins/marketplaces.ts` 支持 add/list/info/refresh/remove/trust，并能通过已配置 marketplaces 做 bare-name resolution。
- `apps/daemon/src/cli.ts` 已经暴露 `od marketplace add/list/info/search/refresh/remove/trust`。
- `apps/web/src/components/MarketplaceView.tsx` 和 `PluginDetailView.tsx` 已存在，用于 `/marketplace` 和 `/marketplace/:id`。
- `apps/landing-page` 现在有 static public `/plugins/` registry renderer，以及从 `plugins/registry/*/open-design-marketplace.json` 加 bundled official manifests 生成的 per-plugin detail routes。
- `apps/web/src/components/PluginsView.tsx` 现在有第一版 `Installed / Available / Sources / Team` UI slice：source management 已启用，Available entries 从 cached marketplace manifests 构建。
- `apps/daemon/src/plugins/pack.ts` 可以产出 `.tgz` plugin archives。
- `apps/daemon/src/plugins/publish.ts` 现在会为 external catalogs 和 Open Design registry target 构建 submission links。完整 GitHub fork/branch/PR mutation 仍是未来 backend work。

主要缺口：

- Marketplace provenance 曾是第一个 closure gap，现在已贯穿 install、upgrade、installed records 和 applied snapshots。剩余工作是 exact version/tag resolution 与 lockfiles。
- Trust vocabulary 已统一为 `official | trusted | restricted`；legacy `untrusted` marketplace rows 会 normalize 为 `restricted`。
- Marketplace catalog entries 现在携带 registry-grade optional fields：`versions`、`dist`、`integrity`、`manifestDigest`、`publisher`、`homepage`、`license`、`capabilitiesSummary`、`distTags`、deprecated state 和 yanking metadata。
- UI discovery 已有第一版 slice，但仍需要 backend closure。Plugins page 可以从 cached manifests 显示 Available entries 并管理 Sources，但 large-catalog browsing、provenance-aware `--from` 和更丰富 detail pages 仍待完成。
- Private marketplace support 目前只支持 public HTTPS。还没有 `gh`-backed private GitHub/GitHub Enterprise source flow、refresh policy、allowlist、TLS/private-network guidance 或 offline cache mode。
- npm-grade update semantics 尚未实现。还没有 version range resolver、dist-tag support、lockfile/update policy、publisher verification 或 archive checksum enforcement。

## 产品模型

共有三个 product surfaces，全部由同一套 registry contract 支撑：

1. **Official web registry**
   - 托管在 Open Design main site。
   - 渲染来自 Open Design registry repo 的 official 和 community-approved plugins。
   - 提供 SEO pages、preview screenshots、install commands、`od://` deep links、provenance、trust/risk metadata 和 publish/contribute guidance。

2. **In-app marketplace**
   - 运行在 local daemon 之上。
   - 显示 installed plugins，以及来自 configured sources 的 available catalog entries。
   - 让用户无需离开 OD 就能 add、refresh、trust、restrict、remove、search、inspect、install、upgrade 和 use plugins。

3. **Headless CLI registry**
   - 面向 humans、agents、CI 和 self-hosted deployments 的 canonical API。
   - 必须早于或至少同时于 UI surfaces 达到 feature-complete。
   - 使用 `gh` 作为 v1 backend driver 和 auth provider，不发明 OD account system。

registry 有意采用 source-index-first，而不是 binary-store-first。catalog entry 指向 `github:owner/repo[@ref][/subpath]`、HTTPS archive 或其他 transport source。registry 记录 metadata、trust、version selection 和 integrity。v1 不需要拥有所有 bytes。

### Surface 关系与产品心智模型

在 product copy、CLI help、docs 和 website 中使用同一个 mental model：

```text
Plugin source repo
  Author-owned GitHub repo or enterprise source repo.
  open-design.json must include plugin.repo.
        |
        | od plugin validate / pack / publish
        v
Plugin artifact
  GitHub ref, GitHub Release .tgz, HTTPS archive, or local folder.
        |
        | registry entry generated by publish/CI
        v
Registry backend
  v1: GitHub repo + generated open-design-marketplace.json.
  Later: DatabaseRegistryBackend with the same contract.
        |
        | od marketplace search/install/upgrade
        v
Installed plugin
  Local runnable record with trust, provenance, integrity, and resolved ref.
```

UI layers 不是额外 backends；它们是同一 lifecycle 的不同视图：

- **Home / Official starters** 是 usage shelf，不是 registry。它应展示已安装 bundled/official workflows 的 curated subset，让用户能立刻点击 `Use`。Bundled official plugins 是 `official` registry source 的 preinstalled cache，不是单独的 distribution model。Product copy 应写 `Official starters` 或 `Official installed`，不要暗示这里就是 registry 本身。
- **Plugins / Installed** 是完整 local inventory：bundled official plugins、user-created plugins、local imports、GitHub/URL installs 和 marketplace-installed plugins。
- **Plugins / Available** 是 discovery layer：来自 configured Sources、尚未安装或已有新版可用的 registry entries。
- **Plugins / Sources** 是 registry management layer：official、community、self-hosted 和 enterprise catalog sources；trust tier；refresh；removal；后续 auth/cache status。
- **Plugins / Team** 是未来 enterprise governance layer：private catalogs、organization policy、allowlists、review、audit 和 refresh policy。
- **open-design.ai/plugins** 是 official 与 community registry sources 的 public presentation。它等价于基于 repo-owned catalog data 的 polished static renderer，而不是另一份 source of truth。必要时 `open-design.ai/marketplace` 以后可以保留为 alias。
- **`od` CLI** 仍是 canonical client。每个 UI action 都必须映射到 CLI 也能驱动的 CLI operation 或 daemon API。
- **Open Design GitHub registry repo** 是 v1 storage backend。以后可以替换成 database backend，而不改变 user-facing nouns。

agent consumption boundary 是明确的：

```text
User adds registry source
  -> Sources stores URL/trust and refreshes catalog
  -> Available shows installable or upgradeable entries
  -> Install writes local installed record
  -> Installed becomes part of agent context/runtime consumption

Open Design packaged runtime
  -> official registry entries are bundled as a preinstall cache
  -> startup records them as Installed/bundled with sourceMarketplaceId=official
  -> Home / Official starters exposes a curated quick-use shelf
  -> agent can consume them immediately

Default community registry
  -> community source is configured by default
  -> Available shows restricted community entries
  -> user explicitly installs one
  -> plugin is installed into daemon-managed storage
  -> Installed becomes part of agent context/runtime consumption
```

`Available` entries 是 supply candidates，不是 runnable capabilities。agent 应消费 installed set：bundled official plugins、user-created plugins、direct GitHub/URL/local installs 和 marketplace-installed plugins。未来的 "Use from Available" shortcut 可以先 auto-install，但在 agent 运行之前仍必须产出 installed record。

User-created 和 user-installed plugins 位于 daemon-managed storage。本 plan 不得定义 daemon data paths；记录 storage 前，先阅读根目录 [`AGENTS.md`](../../AGENTS.md) → **Daemon data directory contract**。daemon 在后续 boots 中重新加载这些 installed records 和 folders。Runtime-bundled official plugins 留在 app/repo image 内，并在 boot 时作为 official-source preinstalls 重新注册；后续可以通过从 official registry source refresh/install 来更新它们，而不必等待 app release。

production-side loop 是它的镜像：

```text
Create plugin
  -> agent-assisted authoring flow
  -> od plugin scaffold / validate / local install / pack
  -> od plugin login/whoami through gh
  -> od plugin publish opens GitHub registry PR
  -> merge regenerates open-design-marketplace.json
  -> users refresh Sources, see Available, install into Installed
```

因此 `Create plugin` product entry 应该启动 agent workflow，而不是裸 JSON form。agent 可以收集 intent，生成 `SKILL.md`、`open-design.json`、examples、previews 和 capability metadata，运行 local validation，安装 local test copy，pack，并驱动 `gh`-backed publish flow。

高层架构关系：

```text
                    open-design.ai/plugins
                 public registry pages and docs
                               |
                               v
+--------------------------------------------------+
| Open Design GitHub registry repo                 |
|                                                  |
| plugins/registry/official/open-design-marketplace.json |
| plugins/registry/community/open-design-marketplace.json |
| plugins/community/<vendor>/<plugin-name>/open-design.json |
| generated open-design-marketplace.json           |
+-----------------------------+--------------------+
                              |
                              | GitHub PR, gh auth, CI validation
                              v
+--------------------------------------------------+
| od CLI                                           |
|                                                  |
| plugin login/whoami -> gh                        |
| plugin publish -> PR to registry repo            |
| marketplace search/add/refresh/remove/trust      |
| plugin install/upgrade/doctor/lock               |
+-----------------------------+--------------------+
                              |
                              v
+--------------------------------------------------+
| Local daemon                                     |
|                                                  |
| RegistryBackend resolver                         |
| source cache and trust policy                    |
| provenance/integrity/lock persistence            |
| installed plugin runtime                         |
+-----------------------------+--------------------+
                              |
                              v
+--------------------------------------------------+
| Product UI                                       |
|                                                  |
| Home: Official starters                          |
| Plugins: Installed / Available / Sources / Team  |
| Plugin detail: provenance, risk, commands        |
+--------------------------------------------------+
```

第一阶段 registry scope：

- v1 中，"registry" 可以理解为**包含 source entries 加 generated marketplace index JSON 的 GitHub repo**。
- 生成的 `open-design-marketplace.json` 是 daemon/CLI/UI 获取的 machine-readable artifact。
- per-plugin `community/**/open-design.json` 或 `entry.json` files 是用于 GitHub PR governance 的 human-reviewable source data。
- 如果能降低 setup cost，该 file 初期可以放在 Open Design main repo 中，但 product abstraction 仍应是 `RegistryBackend`，而不是“读取这个 monorepo path”。以后迁移到 `open-design/plugin-registry` 应该是 data relocation，而不是 product rewrite。

## Registry Repository Shape

推荐的 official repository shape：

```text
open-design-plugin-registry/
├── open-design-marketplace.json
├── community/
│   └── official/
│       ├── open-design-marketplace.json
│       └── plugins/
│           └── <vendor>/<plugin-name>/entry.json
├── plugins/
│   └── <vendor>/<plugin-name>/
│       ├── entry.json
│       ├── README.md
│       ├── screenshots/
│       └── examples/
├── publishers/
│   └── <publisher>.json
├── policies/
│   ├── accepted-capabilities.json
│   └── blocked-sources.json
└── tools/
    └── doctor.ts
```

`open-design-marketplace.json` 仍是 third-party hosts 可复制的 portable file。per-plugin `entry.json` files 让 PRs 可审查、减少 merge conflicts，并让 build step 能确定性生成最终 marketplace index。

当前对 repo 友好的 data placement：

- ship 在 OD 内部的 first-party runtime plugins 仍位于 `plugins/_official/**` 下，并以 `bundled` 安装，但它们携带 official marketplace provenance，因此 product/audit 会把它们视为 preinstalled official registry entries。
- Registry presentation data 可以先作为 static catalog data 放在 `plugins/registry/official` 和 `plugins/registry/community` 下；在独立 registry repo 出现前，也可以在其中镜像这个 shape。
- main site 应从 generated catalog artifacts 渲染 official plugins，而不是 import daemon internals 或直接遍历 `plugins/_official`。
- Community submissions 可以作为 plugin source folders 落在 `plugins/community/<vendor-or-plugin>` 下，并由 `plugins/registry/community/open-design-marketplace.json` 引用；trust tier 继续按 source/entry 编码。

Namespace 与 source policy：

- Published registry package ids 始终是 `vendor/plugin-name`。
- `vendor` 是 publisher namespace：GitHub-backed publish 时是 GitHub org/user；database-backed registries 时是 enterprise/org namespace。
- `plugin-name` 是稳定的 lowercase slug。package publish 后，full id 不可变。
- 现有 flat local/bundled ids 为兼容性仍可读取，但 registry publish 必须要求 namespaced form。
- rename 会创建新的 package id，并在旧 id 上创建 alias/deprecation entry；不得重写 historical installs 或 lockfiles。
- source-of-truth repo 在 `open-design.json` 中声明为 `plugin.repo`。Published plugins 可以是“anything that packs”：除了通过 `od plugin validate` 和 `od plugin pack`、ship runnable skill anchor、声明 `plugin.repo` 之外，不要求特殊 repo layout。
- `plugin.repo` 指向 canonical source repository 或 subdirectory，例如 `https://github.com/open-design/plugins/tree/main/make-a-deck`。Registry entries 可以将其镜像为 `sourceRepository` 以便 search 和 review，但不能替代 manifest field。

最小 entry shape：

```json
{
  "name": "open-design/make-a-deck",
  "title": "Make a Deck",
  "version": "1.2.0",
  "distTags": {
    "latest": "1.2.0",
    "beta": "1.3.0-beta.1"
  },
  "source": "github:open-design/plugins@3f4c2d1/make-a-deck",
  "ref": "3f4c2d1",
  "dist": {
    "type": "github",
    "archive": "https://github.com/open-design/plugins/archive/3f4c2d1.tar.gz",
    "integrity": "sha512-...",
    "manifestDigest": "sha256-..."
  },
  "publisher": {
    "id": "open-design",
    "github": "open-design"
  },
  "sourceRepository": "https://github.com/open-design/plugins/tree/main/make-a-deck",
  "homepage": "https://open-design.ai/plugins/open-design/make-a-deck/",
  "license": "MIT",
  "capabilitiesSummary": ["prompt:inject", "fs:read"],
  "tags": ["deck", "presentation", "investor"],
  "trust": "official",
  "yanked": false
}
```

generated marketplace file 中的 `plugins[]` 可以保持 permissive，但 official registry repo 应在 publishing 前验证这个更严格的 shape。

registry publish 所需的 `open-design.json` fields：

```json
{
  "specVersion": "1.0.0",
  "name": "open-design/make-a-deck",
  "version": "1.2.0",
  "plugin": {
    "repo": "https://github.com/open-design/plugins/tree/main/make-a-deck"
  }
}
```

当前 manifest parser 是 passthrough，因此 `plugin.repo` 可以先于 strict schema bump 落地。正式 schema update 仍应在 public publish flow 被视为稳定前完成。

## Backend Architecture

引入一个小的 registry backend interface，让“今天 GitHub，未来 database”不只是一句口号：

```ts
interface PluginRegistryBackend {
  listSources(): Promise<RegistrySource[]>;
  refreshSource(sourceId: string): Promise<RegistryRefreshResult>;
  search(query: RegistrySearchQuery): Promise<RegistrySearchResult[]>;
  resolve(spec: PluginSpec, options?: ResolveOptions): Promise<ResolvedPlugin>;
  publish(request: PublishRequest): Promise<PublishPlan | PublishResult>;
  doctor(sourceId?: string): Promise<RegistryDoctorReport>;
}
```

初始 implementations：

- `LocalMarketplaceJsonBackend`：从 SQLite 读取 cached `open-design-marketplace.json` rows。
- `GitHubRegistryBackend`：通过狭窄的 `GhClient` adapter shell out 到 `gh auth`、`gh api`、`gh repo` 和 `gh pr` operations。它会针对 official registry repo 创建 PRs，从 GitHub contents/raw URLs 读取 entries，并且自身永不持久化 GitHub token。
- `StaticHttpsRegistryBackend`：支持通过 HTTPS self-hosted 的 public JSON。v1 中的 private authenticated catalogs 应是通过 `gh` 访问的 GitHub/GitHub Enterprise sources；bearer/header/basic auth profiles 是 future work。

未来 implementation：

- `DatabaseRegistryBackend`：同一 interface，由 database、object storage 和 first-party auth 支撑。

Implementation boundary：

- Contracts 定义 request/response DTOs。
- Daemon 拥有 cache、integrity verification、install side effects 和 `gh` invocation。GitHub credentials 仍由 `gh` 拥有。
- CLI 是稳定 external surface。
- Web 只调用 daemon APIs，绝不直接调用 GitHub。

## Enterprise 与 Commercial Backend Path

registry contract 必须支持未来 enterprise deployment，其中 storage backend 是真实 database，而不是 GitHub/JSON。这是 toB 的 product requirement，不是 optional refactor。

同一个 `PluginRegistryBackend` interface 应能干净映射到 database-backed service：

- `organizations`: tenant, plan, billing/entitlement status, SSO config.
- `registry_sources`: official, community, team, private, mirrored GitHub, external HTTPS.
- `plugin_packages`: stable package identity, publisher, owner org, visibility.
- `plugin_versions`: semver, dist-tags, changelog, yanked/deprecated state, compatibility.
- `release_artifacts`: archive URL/object key, manifest digest, archive integrity, size, scan status.
- `publishers`: GitHub owner, verified domain, org membership, signing/verifier state.
- `reviews`: approval workflow, policy exceptions, reviewer notes, security scan result.
- `installs`: org/project/user install records, resolved version, lock provenance.
- `policies`: allowlists, blocked capabilities, required approval, source restrictions.
- `audit_events`: publish, approve, yank, install, upgrade, trust, policy decision.

Enterprise self-hosting model：

- 公司可以在自己的 VPC 内部署 OD 加 `DatabaseRegistryBackend`。
- enterprise registry 暴露与 GitHub/static backend 相同的 daemon-facing 和 CLI-facing contract。
- `od marketplace add <enterprise-url>` 与 in-app Sources 继续工作；只有 source backend 改变。
- GitHub Enterprise 可以继续通过 `gh` 作为 identity/source-of-code layer，而 database 存储 registry state、approvals、scans 和 policy decisions。
- fully managed commercial OD 可以使用同一个 database backend，支持 multi-tenant org boundaries、billing entitlements、SSO/SAML/OIDC、后续 SCIM、audit exports 和 private object storage。

Commercial invariant：

- v1 data 可以是 `plugins/registry/official` 中的 static files，但 contracts 不得假设“registry 等于 GitHub repo”。
- UI 必须向 daemon 请求 registry/search/resolve/publish data；绝不能假设 catalog 是 local directory。
- CLI commands 不应暴露 GitHub-specific nouns，除非 source 明确就是 GitHub。`od plugin publish --to open-design` 内部可以使用 `gh`，但 command contract 应能在后续 database backend 下继续成立。
- Trust、provenance、versioning、integrity 和 audit fields 是必需项，因为它们之后会成为 enterprise policy inputs。

## GitHub CLI Dependency And Auth

`gh` 是 registry-backed publishing 和 private GitHub sources 的一等 runtime dependency。

- 安装 `od` CLI 时应确保 `gh` 可用。如果 host 没有 `gh`，installer 应使用该 distribution channel 可用的平台 package path bootstrap 它；如果无法 auto-install，则以精确 remediation 失败。
- `od plugin login` 用 Open Design copy 和 required scopes/host guidance 包装 `gh auth login`。
- `od plugin whoami` 包装 `gh auth status` 加 `gh api user`，并打印 active account、host、scopes，以及它是否能 publish 到 configured registry repo。
- `od plugin logout` 只有在 explicit confirmation 后才可包装 `gh auth logout`，因为它会影响用户的全局 GitHub CLI session。
- Daemon code 绝不能直接读取或存储 GitHub tokens。需要 GitHub data 时，它调用 `GhClient` abstraction，由后者 shell out 到 `gh`，或仅为一次 request 在内存中消费 `gh auth token`。
- GitHub Enterprise 被建模为 `gh` host，而不是独立 auth backend。

## CLI Plan

Keep existing `od marketplace` and `od plugin` naming. Avoid adding a second `registry` noun until there is a real non-marketplace backend exposed to users.

### Marketplace Source Commands

- [ ] `od marketplace add <url> [--trust official|trusted|restricted] [--github-host <host>] [--refresh daily|manual|startup]`
- [x] `od marketplace list [--json]`
- [x] `od marketplace info <id> [--json]`
- [ ] `od marketplace plugins <id> [--query <q>] [--tag <tag>] [--json]`
- [x] `od marketplace search "<query>" [--tag <tag>] [--json]`
- [x] `od marketplace refresh <id>`
- [x] `od marketplace remove <id>`
- [x] `od marketplace trust <id> --trust official|trusted|restricted`
- [ ] `od marketplace login <id>` (delegates to `gh auth login` for the marketplace host)
- [ ] `od marketplace whoami <id>` (delegates to `gh auth status` / `gh api user`)
- [ ] `od marketplace doctor [id] [--strict] [--json]`

### Plugin Consumer Commands

- [x] `od plugin install <source-or-name>`
- [ ] `od plugin install <name>@<version-or-tag> [--from <marketplace-id>] [--save-lock]`
- [ ] `od plugin upgrade [id] [--policy latest|pinned|range] [--dry-run]`
- [ ] `od plugin outdated [--json]`
- [x] `od plugin list/info/search/apply/run/trust/uninstall/doctor`
- [ ] `od plugin view <name> [--from <marketplace-id>] [--versions] [--json]`
- [ ] `od plugin lock write|verify|diff`

### Plugin Author Commands

- [x] `od plugin login [--host <github-host>]`
- [x] `od plugin whoami [--host <github-host>] [--json]`
- [x] `od plugin scaffold`
- [x] `od plugin validate`
- [x] `od plugin pack`
- [ ] `od plugin publish --to open-design [--dry-run]`
- [ ] `od plugin publish --to marketplace-json --catalog <path-or-url> [--branch <name>]`
- [ ] `od plugin publish --to github --repo <owner/repo> [--public|--private]`
- [ ] `od plugin deprecate <name>@<version> --reason <text>`
- [ ] `od plugin yank <name>@<version> --reason <text>`

Publish v1 should use `gh`:

- `od plugin login` wraps `gh auth login`; `od plugin whoami` wraps `gh auth status` and `gh api user`.
- `od plugin publish --to open-design` validates, packs if needed, renders the registry entry, creates a branch, opens a PR, and prints the PR URL.
- `od plugin publish` uses `gh api`, `gh repo fork`, and `gh pr create` through a testable `GhClient`; it does not implement a parallel GitHub OAuth flow.
- The CLI must have `--dry-run --json` for CI and agent workflows.

## Web And Presentation Plan

### Public Site

Main navigation：

- Plugins
- Official
- Community
- Sources
- Publish
- Docs

Listing page：

- 按 name、description、tags、task kind、capabilities、publisher 和 trust 搜索。
- Filters：Official、Trusted community、Restricted community、Works headless、Has preview、Has examples、Requires connectors。
- Cards 显示 title、publisher、version/tag、task kind、trust tier、capability badges、可用时的 install count 或 stars，以及 preview thumbnail。
- Primary CTA：copy install command。
- Secondary CTA：通过 `od://plugins/<name>?source=<source>` 在 desktop 中打开。

Detail page：

- Hero 应是 plugin output 或 preview，而不是 generic marketing art。
- 展示 install command、`od plugin view`、`od plugin run` example、version selector、dist-tags、changelog、source repo、publisher、license、integrity、capabilities、connector requirements、examples 和 security notes。
- 用 plain language 展示 provenance："Indexed from GitHub repo X at commit Y via marketplace Z"。
- 展示 review state：official、trusted、restricted、yanked、deprecated、scan status。

Publish page：

- "Contribute to Open Design registry" flow，包含 required files、checklist、CLI command 和 GitHub PR path。
- "Self-host your own source" flow，包含 static JSON instructions 和 `od marketplace add`。

### In-App UI

替换当前 Plugins tab model：

- `Installed`：installed plugins、upgrade/outdated state、use/uninstall/trust。
- `Available`：来自 configured marketplaces 的 entries、install/use、filters、source badges。
- `Sources`：add URL、refresh、remove、trust tier、GitHub host/auth status、cache status。
- `Team`：private catalogs、org allowlist、default trust、audit 和 refresh policy。

使用当前 `Installed / Available / Sources / Team` model 作为 product baseline。`Available` 是 discovery，`Sources` 是 registry source management，`Team` 是 future enterprise governance。

Available plugin card states：

- Not installed: `Install`
- Installed same version: `Use`
- Installed older version: `Upgrade`
- Restricted capabilities: `Review`
- Yanked/deprecated: disabled install with reason

Detail page additions：

- Marketplace provenance：source marketplace id/name、resolved source、marketplace trust、plugin entry name/version。
- Publisher block：GitHub owner、verified status、homepage、license。
- Version block：selected version/tag、resolved ref、manifest digest、archive digest。
- Risk block：capabilities、connector requirements、install source、trust tier、yanked/deprecated state。
- Commands block：install、run、view、trust、lock。

## Trust And Provenance Rules

所有地方使用同一套 vocabulary：

- Marketplace trust: `official | trusted | restricted`
- Installed plugin trust: `bundled | trusted | restricted`

Mapping：

- `official` marketplace 默认安装为 `trusted`，并通过 provenance 标明 official source。
- `trusted` marketplace 默认安装为 `trusted`。
- `restricted` marketplace 默认安装为 `restricted`。
- direct GitHub、URL 和 local installs 保持 `restricted`，除非用户显式授予 trust/capabilities。
- bundled first-party plugins 保持 `bundled`。

Installed record semantics：

- Keep `sourceKind` as transport: `github | url | local | marketplace | bundled | user | project`.
- Add/keep `sourceMarketplaceId` for discovery provenance.
- Add `sourceMarketplaceEntryName`, `sourceMarketplaceEntryVersion`, `marketplaceTrust`, `resolvedSource`, `resolvedRef`, `manifestDigest`, and `archiveIntegrity`.
- UI grouping should use provenance first, transport second.

bare marketplace names 的 install flow：

1. Resolve `name[@version-or-tag]` across configured marketplaces.
2. Select marketplace by priority or explicit `--from`.
3. Resolve dist-tag/range to an exact version.
4. Resolve transport source and ref.
5. Fetch bytes.
6. Verify manifest digest and archive integrity when present.
7. Persist installed record with marketplace provenance.
8. Write/update lock entry when requested.

Artifact hosting 与 yanking：

- GitHub-backed v1 的 primary tarball hosting 是 source repo 上的 GitHub Releases。
- 允许 tarball hosting fallback：GitHub Releases 不可用时，可以使用任何 HTTPS archive URL，包括 enterprise mirrors 和 object storage，但 `integrity` 必须存在。
- Database-backed enterprise registries 可以将 tarballs 存在 private object storage 中，并通过同一个 `dist.archive` field 暴露 signed/download URLs。
- Versions 永远不会从 registry 中 hard-delete。Yanking 会用 `yanked: true`、`yankedAt` 和 `yankReason` 标记 version。
- New installs 和 upgrades 会拒绝 yanked versions，除非用户显式安装已 locked 的 exact version 并接受 warning。
- 只要 archive 仍可获取且 integrity 匹配，现有 lockfiles 仍保持 reproducible。
- Package-level deprecation 与 version yanking 分离：deprecation 会发出 warning，并可指向 replacement package id；yanking 会阻止该 version 的 new resolution。

## Private And Enterprise Sources

v1 的 private marketplace support 应复用 GitHub auth，而不是引入 token profiles：

- Auth 是 GitHub.com 或 GitHub Enterprise hosts 的 `gh` auth。
- Credentials 存在 `gh` 中，绝不进入 `open-design-marketplace.json`，也绝不进入 daemon database。
- `od marketplace add` 存储 URL、trust tier、GitHub host、refresh policy 和 cache policy。
- Enterprise policy 可以将 install sources 限制到 marketplace ids、GitHub orgs 或 publisher ids 的 allowlist。
- 启用 offline cache 时，应保存 last valid marketplace JSON、entry digests 和 downloaded archives。
- Audit events 应记录 add/remove/refresh/trust/install/upgrade/yank/deprecate decisions。
- bearer/header/basic/mTLS 等 Non-GitHub auth forms 留给未来 database 或 generic HTTPS backend，不属于第一轮 GitHub-backed registry pass。

## 分阶段计划

### P0: 闭合 Contract Loop

Goal：让当前 federated marketplace implementation 可信且可审计。

- [x] Change `MarketplaceTrustSchema` to `official | trusted | restricted`.
- [x] Migrate/accept old `untrusted` rows as `restricted` during read or migration.
- [x] Extend install options with marketplace provenance fields.
- [x] When `/api/plugins/install` resolves a bare marketplace name, pass the full `ResolvedPluginEntry` into `installPlugin()`.
- [x] Persist `sourceMarketplaceId`, entry name/version, marketplace trust, and resolved source/ref on `installed_plugins`.
- [x] Map marketplace trust into installed plugin default trust.
- [x] Extend `AppliedPluginSnapshot` with marketplace entry name/version and resolved source metadata.
- [x] Add tests: marketplace add -> install by name -> installed record contains source marketplace id and inherited trust.
- [x] Add tests: restricted marketplace install stays restricted even when transport is GitHub.

### P1: Registry Entry 与 Version Semantics

Goal：从 "catalog index" 推进到 "registry entry"。

- [ ] Update plugin manifest schema to allow published namespaced ids `vendor/plugin-name` while keeping flat ids readable for legacy local/bundled plugins.
- [ ] Add formal `plugin.repo` schema field to `open-design.json` and require it for registry publish.
- [x] Extend marketplace entry contract and JSON schema with `versions`, `dist`, `integrity`, `manifestDigest`, `publisher`, `homepage`, `license`, `capabilitiesSummary`, `distTags`, `deprecated`, and `yanked`.
- [x] Keep `.passthrough()` for community extensions.
- [x] Add `od marketplace plugins <id>` with pagination/search/filter.
- [x] Add `od plugin install <name>@<version-or-tag>`.
- [x] Add resolver support for exact version, dist-tag, and conservative `^`/`~` ranges.
- [x] Add initial daemon-managed plugin lockfile shape with name, version, source, marketplace id, resolved ref, manifest digest, archive integrity. This plan MUST NOT define daemon data paths.
- [ ] Add `od plugin lock verify`.
- [ ] Add `od plugin outdated`.
- [x] Add yanking metadata and resolver behavior：yanked versions 对 audit 可见，并拒绝 new resolution。Exact locked replay warning 等 lock verify 落地后作为 route-level follow-up 处理。

### P2: GitHub-Backed Publish Flow

Goal：让 Open Design contributions 体验上像 npm publish，但实际打开的是 GitHub PR。

- [ ] Define official registry repo layout and generated index build step.
- [ ] Make `gh` an explicit `od` CLI dependency and installer prerequisite/bootstrap step.
- [x] Add `od plugin login` and `od plugin whoami` as wrappers over `gh auth login/status` and `gh api user`.
- [ ] Add `od plugin publish --to open-design --dry-run --json`.
- [ ] Use `gh auth status`, `gh api`, `gh repo fork`, and `gh pr create` through a narrow `GhClient` adapter.
- [ ] Generate a registry entry from local plugin metadata, `plugin.repo`, current ref, digest, publisher, license, and capability summary.
- [ ] Enforce "anything that packs": publish requires successful `validate` and `pack`, not a special source repository layout.
- [ ] Upload the `.tgz` to GitHub Releases when available, or accept a fallback HTTPS tarball URL with mandatory integrity.
- [ ] Run `od plugin validate`, `pack`, `doctor`, and integrity calculation before PR creation.
- [ ] Add PR template with source, version, capability risk, preview, screenshots, and validation output.
- [ ] Add CI in registry repo：schema validate、source fetch、plugin manifest parse、checksum verify、preview smoke、blocked source scan。
- [x] Add `od plugin publish --to marketplace-json --catalog <path>` for self-hosted static catalogs.

### P3: Product UI And Public Site

Goal：从 "installed plugin gallery" 升级为 "multi-source plugin registry"。

- [x] Replace the Plugins page tabs with `Installed / Available / Sources / Team`.
- [x] Enable source management in-app: add URL, refresh, remove, and trust tier using the existing `/api/marketplaces` endpoints.
- [x] Add an `Available` view from configured marketplace manifests. 当前实现读取 `/api/marketplaces` 返回的 cached manifests；后续应为 large catalogs 将其迁移到 typed paginated `/api/marketplaces/:id/plugins` response。
- [x] Add install/use/upgrade card states for available entries. 当前 install 使用现有 bare-name `od plugin install <name>` path，并且现在会保留 provenance；显式 `--from <marketplace-id>` 仍是 P1 follow-up。
- [x] Rename the Home page official shelf copy to `Official starters` or `Official installed`, and add a lightweight `Browse registry` path to `/plugins` so Home stays a fast-use surface while `/plugins` remains the registry console.
- [x] Make `Create plugin` launch an agent-assisted authoring flow backed by `od plugin scaffold/validate/pack/publish`, including local install/run validation before publish and `gh` login/whoami checks before opening a registry PR. 当前 slice 更新 agent prompt 和 CLI wrapper；完整 GitHub PR mutation 仍在 P2。
- [x] Add public `/plugins/` route on `apps/landing-page` for open-design.ai: searchable official/community registry listing, static plugin detail pages, canonical/OG/Twitter metadata, JSON-LD item/detail data, and homepage/header entry points.
- [ ] Add source filters: Official, Community, My plugins, Team, specific source.
- [x] Add detail provenance, publisher, version, integrity, command, and risk sections to the public website detail route；in-app drawer polish 单独跟踪。
- [ ] Add GitHub host/auth status, cached status, and refresh policy to the source manager.
- [x] Add public plugin detail `od://` deep links and static search JSON。README rendering 和 preview galleries 仍是 content-quality follow-ups。
- [ ] Decide whether `/marketplace` should redirect to `/plugins/` or remain an alias for compatibility.

### P4: Private, Enterprise, And Offline

Goal：让 third-party/self-hosted registries 成为 first-class，同时保持与未来 database backend 兼容。

- [x] Add private GitHub/GitHub Enterprise marketplace auth entry through `od marketplace login <id|url> --host <host>`, delegated to `gh`.
- [x] Keep source management behind `RegistryBackend`, not GitHub-specific API calls.
- [ ] Add enterprise allowlist policy: source ids, publishers, GitHub orgs, capabilities.
- [ ] Add refresh policy and last-known-good cache.
- [ ] Add offline install from cache when enabled.
- [ ] Add audit log/events for source and install decisions.
- [ ] Add Team page for private catalog status, trust defaults, org policy, and audit.
- [x] Document static hosting options: GitHub Pages, private GitHub repos, GitHub Enterprise, S3/R2 public HTTPS, internal HTTPS, and private network caveats.

### P5: Database Backend And Commercial ToB

Goal：让 registry 能作为带真实 database state 的 enterprise service 部署。

- [ ] Define database-backed registry schema：覆盖 orgs、sources、packages、versions、artifacts、publishers、reviews、policies、installs 和 audit events。
- [x] Add `DatabaseRegistryBackend` behind the same resolve/search/publish/doctor interface.
- [ ] Add object-storage abstraction for plugin archives and preview assets.
- [ ] Add org-scoped auth/identity boundary; hosted can use first-party auth, self-host can use enterprise IdP integration later.
- [ ] Add policy engine hooks: source allowlist, capability denylist, required review, yanked/deprecated enforcement, approval exceptions.
- [ ] Add admin APIs and UI for Team/Enterprise registry governance.
- [ ] Add migration/import from static `open-design-marketplace.json` and GitHub registry repo into database rows.
- [ ] Add export back to `open-design-marketplace.json` so enterprises can mirror or air-gap catalogs.
- [x] Add backend parity tests for static/GitHub/database list/search/resolve/publish. Full CLI/UI parity against DB remains an enterprise API follow-up.

### P6: npm-Grade Hardening

Goal：让 updates 足够 reproducible 且安全，可用于 CI/enterprise。

- [x] Add range resolution only after exact/tag resolution is solid.
- [ ] Add update policies: `pinned`, `patch`, `minor`, `latest`.
- [x] Add yanked/deprecated handling in resolver; UI surfacing remains part of detail drawer polish.
- [x] Add publisher verification hooks against GitHub org/user metadata.
- [x] Add signed provenance schema hooks, without blocking v1 on PKI.
- [x] Add `od marketplace doctor` checks: entry naming/source/yank/capability/license/integrity basics, with strict mode for warnings.
- [x] Add daemon smoke coverage: add marketplace -> resolve/search -> install by name -> installed row and lockfile preserve provenance.

## 建议的首批 PR 拆分

1. **Provenance fix**
   - Files: `packages/contracts/src/plugins/*`, `apps/daemon/src/plugins/marketplaces.ts`, `apps/daemon/src/plugins/installer.ts`, `apps/daemon/src/plugins/registry.ts`, `apps/daemon/src/server.ts`, daemon tests.
   - Outcome：marketplace installs 可审计。

2. **Trust vocabulary cleanup**
   - Files: contracts, daemon marketplace persistence/read path, CLI help, web types.
   - Outcome：不再有 `untrusted` vs `restricted` drift。

3. **Available marketplace API**
   - Files: daemon `/api/marketplaces/:id/plugins`, CLI `od marketplace plugins`, contracts response shape.
   - Outcome：UI 可以浏览 not-yet-installed entries，不需要在 client-side scrape cached manifests。

4. **Plugins UI source management**
   - Files: `PluginsView`, marketplace state helpers, CSS, web tests.
   - Outcome：在 app 内 add/refresh/remove/trust source operations。

5. **GitHub publish dry run**
   - Files: `publish.ts`, CLI publish route, tests, docs.
   - Outcome：authors 可以在 mutation 前看到精确 registry PR body/entry。

6. **GitHub CLI auth wrapper**
   - Files: CLI install/bootstrap docs, `apps/daemon/src/cli.ts`, new `GhClient` adapter, tests.
   - Outcome：`od plugin login/whoami` 提供 product auth surface，同时复用用户的 `gh` session。

## Validation Bar

常规 registry work 的最低验证：

```bash
pnpm guard
pnpm typecheck
pnpm --filter @open-design/daemon test
pnpm --filter @open-design/web test
```

按 area 增补验证：

- Contract/schema changes：在 `packages/plugin-runtime/tests` 添加 parser/schema fixtures，并在合适位置添加 contracts tests。
- CLI changes：添加 daemon CLI tests 或匹配现有 harness 的 command-level tests。
- UI changes：添加 web component/state tests；更大的 visual route changes 使用 Browser/Playwright screenshots。
- Publish/GitHub changes：tests 必须通过注入 fake `GhClient` 或 dry-run backend，在无真实网络的情况下运行。
- Enterprise/private source changes：tests 必须 assert GitHub credentials 保持在 `gh` 中，永不序列化到 marketplace manifests 或 daemon SQLite。
- Registry product evaluation cases 跟踪在 `docs/testing/plugin-registry-eval-cases.md`；每当 Sources、Available、Installed、GitHub publish 或 enterprise backend behavior 改变时，都要保持更新。

## Open Questions

- official registry 应放在这个 monorepo 中，还是单独的 `open-design/plugin-registry` repo？单独 repo 对 community PR review 和 static-site generation 更干净。
- `official` marketplace trust 应允许 user-added URLs 使用，还是只允许 Open Design ship 的 built-in source ids？建议：只有 built-in sources 可以是 `official`；user-added sources 可以是 `trusted` 或 `restricted`。
- lockfile 应该是 project-local 还是 user-global？建议：为了 reproducible runs 使用 project-local，并将 user-global cache 作为 implementation detail。本 plan 不得定义 daemon data paths；先阅读根目录 [`AGENTS.md`](../../AGENTS.md) → **Daemon data directory contract**。
- 当 catalog URL 映射到 GitHub 时，`od plugin publish --to marketplace-json` 应直接 mutate local catalog file，还是创建 branch/PR？建议：两者都支持，但检测到 GitHub remote 时默认走 PR。
- telemetry policy 稳定前，official site 应展示多少 popularity/ranking data？建议：只有当 stars/downloads 来自 public GitHub 或 explicit registry events 时才展示；install telemetry 保持 opt-in。

## Resolved Decisions

- Namespace policy：registry package ids 是 `vendor/plugin-name`。
- Source repo shape：接受任何通过 `od plugin validate` 和 `od plugin pack` 的内容。
- Source pointer：registry-published `open-design.json` 必须包含 `plugin.repo`。
- Tarball hosting fallback：可以，但必须有 integrity。
- Yanking：可以；标记 versions yanked，而不是删除它们。
- Plugin ID stability：需要；ids publish 后不可变，rename 会创建新 ids 加 aliases/deprecations。

## Product Judgment

architecture 已经指向正确方向：Open Design 可以在不放弃 local-first/headless operation 的情况下成为 "multi-source plugin registry"。下一步不应该是更大的 gallery，而应该先处理 provenance、trust vocabulary 和 exact resolution；之后 UI 才能安全地从 "official plugins plus import" 升级到 "installed and available plugins across sources"。
