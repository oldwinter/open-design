# apps/landing-page/AGENTS.md

先遵循根 `AGENTS.md` 和 `apps/AGENTS.md`。本文件只记录 `apps/landing-page/` 的 module-level boundaries。

## Purpose

`apps/landing-page` 是一个独立的 static Astro site，以 **Atelier Zero** 风格渲染 Open Design marketing surface，并为 repo root 中的每个 skill、design system、craft principle 和 live-artifact template 发布 per-facet catalog pages。

紧密耦合：

- Design template：`design-templates/open-design-landing/`，包含 agent workflow 和 homepage hero 的 source-of-truth `example.html` known-good rendering。
- Design system：`design-systems/atelier-zero/DESIGN.md`，作为 token spec。
- Image assets：`design-templates/open-design-landing/assets/*.png` 会上传到 Cloudflare R2（`open-design-static`），并通过 `static.open-design.ai` 搭配 Image Resizing（`format=auto`）提供服务。不要把本地 mirrored PNGs commit 到 `apps/landing-page/public/assets/`。

## What it is

- Astro static output。站点有多个 route groups：
  - `/`：Atelier Zero homepage（`app/pages/index.astro`）。
  - `/skills/` + `/skills/<slug>/`：`skills/` 中的每个 `SKILL.md`。
  - `/skills/mode/<slug>/` 和 `/skills/scenario/<slug>/`：通过 `getStaticPaths` 从 frontmatter 生成的 facet pages。
  - `/systems/` + `/systems/<slug>/` + `/systems/category/<slug>/`：`design-systems/` 中的每个 `DESIGN.md`。
  - `/craft/` + `/craft/<slug>/`：`craft/` 中的每个 `*.md`。
  - `/templates/` + `/templates/<slug>/`：`templates/live-artifacts/` 中的 Live Artifacts，加上带 `od.mode: template` 的 skills。
- Content sources **永远不会** mirror 到此 app。Astro content collections（`app/content.config.ts`）会在 build time glob repo root 中的 canonical Markdown bundles。Contributor 添加或编辑 `SKILL.md`/`DESIGN.md` 后，下一次 build 会拾取它；不需要中间的 "register your skill here" step。
- Shaped data layer 位于 `app/_lib/catalog.ts`。Page templates 从那里 import shaped records，并且永远不在 JSX 中重新 parse Markdown。
- React 只在 build time 用于 `app/page.tsx` 和共享 `Header`（`renderToStaticMarkup`）。输出发布 CDN-ready HTML/CSS，加一个小型 inline enhancement script；不会把 React runtime 发到 browsers。
- 所有 styles 分在 `app/globals.css`（homepage，与 `design-templates/open-design-landing/example.html` lockstep）和 `app/sub-pages.css`（catalog/facet/detail pages）。
- 所有 page imagery 都通过 `app/image-assets.ts` 引用；该文件为 R2 originals 构建 Cloudflare Image Resizing URLs。
- Per-skill / per-template thumbnails 由 `scripts/generate-previews.ts`（Playwright）offline 渲染。Output 位于 `public/previews/<bucket>/<slug>.<ext>`，并且 **gitignored**；CI 在每次 deploy 时 regenerate。该 script 保留真实 file extension，方便未来 sharp/webp post-processor 不触碰 data layer 也能工作。

## What it is NOT

- 不是 `apps/web` 的一部分。web app 是 product surface；landing page 是 marketing surface。它们共享 design tokens，但不共享 state、routes 或 runtime。
- 不连接 `apps/daemon`。没有 `/api`、没有 `/artifacts`、没有 `/frames`，也没有 proxy 要设置。
- 不是 CMS。Content authors 在 repo root 的 `skills/`、`design-systems/`、`craft/` 或 `templates/live-artifacts/` 中编辑 Markdown；landing page 会针对这些 globs rebuild，并自动发布到 Cloudflare Pages。

## Boundary constraints

- 必须保持 static Astro output。
- 不得从 `@open-design/web`、`@open-design/daemon`、`@open-design/desktop`、`@open-design/sidecar*` 或 `@open-design/contracts` import。这些属于 product runtime concerns。
- 不得引入 `src/` shell；所有 source 保持在 `app/` 下。Component bundles 位于 `app/_components/<name>.{tsx,astro}`。
- 不得依赖任何 non-Google web font。
- 可见的 "X skills" / "Y systems" claims 必须读取 `getCatalogCounts()`，绝不能 hardcode。Hero、capabilities cards、labs pills、selected-work fractions、footer Library 和 `<meta name="description">` 都从同一个 call 派生，这样新 content edit 永远不会发布相互矛盾的 totals。
- 当 canonical `design-templates/open-design-landing/example.html` 改变时，`app/page.tsx` 中对应的 section JSX 和 `app/globals.css` 中的 rules 必须同步更新。这两个文件保持 lockstep；其余 landing-page sources 不需要。
- `app/content.config.ts` 中的 content-collection schemas 保持 loose（`passthrough()`）。Validation 在 render time 执行，这样 vendored upstream Markdown（例如 `guizang-ppt`）在 author 使用稍有不同的 `od:` key 时不会破坏 build。

## Deploy contract (staging → manual production)

Deploys 拆分到 **两个 Cloudflare Pages projects**，因此 merge 到 `main` 本身永远不会发布到 live site：

- Production project `open-design-landing` → `open-design.ai`。
- Staging project `open-design-landing-staging` → `staging.open-design.ai`。

Safety gate 是 project separation：只有 manual production workflow 会命名 production project。

- `.github/workflows/landing-page-staging.yml` 在 push 到 `main` 时运行，并 deploy 到 **staging project**（`open-design-landing-staging`、`staging.open-design.ai`）。
- `.github/workflows/landing-page-production.yml` 是 **manual**（`workflow_dispatch`），也是唯一命名 production project（`open-design-landing`、`open-design.ai`）的 workflow。用 GitHub `production` environment 的 required reviewers gate 它。
- `.github/workflows/landing-page-ci.yml` 在 PRs 上运行：它验证 build，并且对 same-repo branches，把 per-PR preview deploy 到 staging project（`--branch=pr-<number>` → `pr-<number>.open-design-landing-staging.pages.dev`），然后 comment URL。

当 **任意** 下列内容变化时，staging workflow 会触发：

- `apps/landing-page/**`
- `design-templates/open-design-landing/**`
- `skills/**`
- `design-systems/**`
- `craft/**`
- `templates/**`
- `package.json`、`pnpm-lock.yaml`、`pnpm-workspace.yaml`
- workflow files 本身

只编辑 SKILL.md 的 push **必须** 触发 staging workflow。如果没有触发，说明 `paths:` filter 已经偏离 content-collection glob，staged site 会静默落后。把这视为 regression，而不是 feature。

## Common commands

```bash
pnpm --filter @open-design/landing-page dev          # http://127.0.0.1:17574
pnpm --filter @open-design/landing-page typecheck
pnpm --filter @open-design/landing-page previews     # render thumbnails
pnpm --filter @open-design/landing-page build        # static export → out/
```

## When to update this app

- 在 repo root 添加/编辑 `SKILL.md`、`DESIGN.md`、craft `*.md` 或 live-artifact template：不需要 landing-page edit；CI 会在下一次 push 到 `main` 时 rebuild 并 re-render thumbnails。
- 添加新的 top-level route group（例如 `/playbooks/`）：在 `app/pages/` 下添加 Astro page directory，在 `app/content.config.ts` 中添加 content collection，在 `app/_lib/catalog.ts` 中添加 shaping function，并添加与既有 index/detail/facet pattern 匹配的 route entries。
- 向 canonical landing page 添加新 section：把它 port 到 `app/page.tsx` 和 `app/globals.css`，并与 `design-templates/open-design-landing/example.html` 保持 lockstep。
- 为非 Open Design tenant 做 brand re-keying：fork 该 app，更新 copy，替换 PNGs。不要为 multi-tenancy parameterize 此 app。
