# GitHub automation guide

这个目录仍然只做了部分标准化。若干历史 workflow 和 helper 位置还没有统一形态。不要盲目复制旧模式。对于新工作、bug 修复和清理，除非 maintainer 明确选择另一条边界，否则以 `ci.yml` + `comment.atom.yml` + `autofix.atom.yml` + `report.atom.yml` + `.github/scripts/handoff.py` 体系作为参考 topology。

## Required reading

修改 GitHub automation 前，阅读当前版本：

- `.github/workflows/ci.yml`
- `.github/workflows/comment.atom.yml`
- `.github/workflows/autofix.atom.yml`
- `.github/workflows/report.atom.yml`
- `.github/scripts/handoff.py`
- `scripts/scopes.ts`
- `e2e/tests/packaged-smoke-workflow.test.ts`
- 触碰 fork PR approval behavior 时，还要读 `scripts/approve-fork-pr-workflows.ts` 和 `scripts/approve-fork-pr-workflows.test.ts`

如果变更影响 cross-workflow behavior，更新 topology tests，不要只依赖 workflow YAML review。

## Architecture

GitHub automation 使用两层架构。

Business layer：

- Business workflows 决定发生了什么，以及下一步应该请求什么。
- `ci.yml` 是主要的 low-privilege PR、merge-queue 和 manual validation gate。
- `ci.yml` 应该运行 validation、决定 scopes，并产出 typed handoff artifacts。
- 当 capability workflow 能完成 trusted writes 时，business workflows 不应直接写 PR comments 或 branches。

Atomic capability layer：

- Capability workflows 从定义清晰的 inputs 执行可复用 trusted operations。
- `comment.atom.yml` 消费 `handoff-comment-*` artifacts，并 upsert 纯文本 PR comments。
- `autofix.atom.yml` 消费 `handoff-autofix-*` artifacts，并应用 same-repository patches。
- `report.atom.yml` 消费 `handoff-report-*` artifacts，处理需要 trusted materialization 的 advanced comments，例如 dependency install、R2 access、artifact processing，或 upsert 前的 report generation。
- `.github/scripts/handoff.py` 拥有 `comment`、`autofix` 和 `report` handoffs 的 artifact names、directory layout、discovery 和 contract validation。

默认规则：在某个 flow 已经针对这些现有 atomic capabilities 测试过之前，不要新增 `foo.comment.atom.yml`、`foo.autofix.atom.yml` 或 `foo.report.atom.yml` 这类 domain-specific follow-on workflow。

## Directory conventions

- `.github/workflows/` 包含 GitHub Actions workflow entrypoints。
- `.github/actions/` 包含 workflow setup steps 用的 reusable composite actions。
- `.github/scripts/` 包含 workflow-owned scripts 和 contracts；它们不是通用 repo developer commands。
- `.github/workflow/scripts/` 当前包含较旧的 release workflow implementation scripts。把它视为现有 release infrastructure，不要把它当成新 CI handoff helpers 的默认位置。
- Root `scripts/` 仍用于 repo-level developer checks、product scripts 和 guard/test logic。不要只为了显得更通用，就把 workflow-only handoff glue 移到那里。

新的 workflow-owned helpers 通常应放在 `.github/scripts/`。Project-owned scripts 通常优先使用 TypeScript，但当 stdlib portability 和低 setup cost 很重要时，小型 GitHub runner glue 可以使用 Python。保持这类例外狭窄，并受 `pnpm guard` policy 覆盖。

## Handoff contract

所有 CI follow-on artifact names 和 paths 都使用 `.github/scripts/handoff.py`。Canonical layout 是：

- `handoff/comment/<id>/metadata.json` 加 `body.md`
- `handoff/autofix/<id>/metadata.json` 加 `patch.diff`
- `handoff/report/<id>/metadata.json`

Artifact names 必须来自 `handoff.py artifact-name <kind> <id>`，download patterns 必须来自 `handoff.py artifact-pattern <kind>`。

`metadata.json` 总是标识目标 PR、head SHA、base SHA、CI run id、handoff kind 和 handoff id。Capability-specific fields 属于对应 capability 的 metadata，并且必须由 `handoff.py` validate。

不要在 workflows 中手写 artifact name prefixes、替代 directory layouts 或一次性 metadata parsers。先扩展 `handoff.py`，再让 producers 和 consumers 使用新 contract。

## Capability rules

### `comment.atom.yml`

`comment.atom.yml` 只用于纯文本 PR comments。

- Input 是已经最终确定的 `body.md`。
- Body 必须包含 stable marker。
- Workflow 在 upsert 前 validate PR state、draft state、head SHA 和 base SHA。
- 它通过 `jq -n --rawfile body ...` 和 `gh api --input` 写入 GitHub API payload。
- 它不得安装 dependencies、访问 R2、执行 report scripts、理解 Nix、理解 visual diffs，或 checkout PR code。

### `autofix.atom.yml`

`autofix.atom.yml` 用于 same-repository patch application。

- Input 是 `patch.diff` 加 metadata，其中包括 `allowed_paths` 和 `commit_message`。
- Fork PRs 必须 skip，而不是 fail。
- Closed、draft、stale head 和 stale base cases 必须 skip，而不是 fail。
- 只有在 validate live PR state 后，才 apply patches。
- Verify resulting changed files 正好匹配 `allowed_paths`。
- 优先使用配置好的 bot app token push，这样 follow-up CI 会按预期触发。
- 不要把这个 workflow 用于 arbitrary commands、generated scripts 或 PR-head code execution。

### `report.atom.yml`

`report.atom.yml` 用于 advanced comments，也就是 comment body 不是纯文本 input 的场景。

例如需要：

- 下载并合并 artifacts，
- 安装 dependencies，
- 访问 R2 或其他 trusted secrets，
- 渲染 media 或 diffs，
- 从 trusted base code 生成 rich markdown body。

`report.atom.yml` 是 trusted writer 和 materializer。它可以直接 upsert comments，因为这是 advanced comment capability 的一部分，但必须使用与 `comment.atom.yml` 相同的 file-backed payload hygiene。

规则：

- 将所有 PR-produced artifacts 视为 untrusted data。
- 不要在 `report.atom.yml` 中 checkout 或执行 PR-head code。
- 运行 repository scripts 前 checkout trusted base/default code。
- 在 secret use 前 validate PR state、draft state、head SHA 和 base SHA；实际可行时，在 comment upsert 前再次 validate。
- 保持 report type dispatch 显式。如果多个 report types 增长，添加清晰的 handler boundary，不要把 branching 埋在 shell fragments 里。

## Fork PR approval

`fork-pr-workflow-approval.yml` 和 `scripts/approve-fork-pr-workflows.ts` 是独立 security boundary。它们可以 approve low-risk fork PR `pull_request` runs，但不得 approve trusted `workflow_run` capability workflows。

除非 maintainer 明确扩展 allowlist，否则让 `.github/workflows/ci.yml` 保持唯一 approved workflow path。`comment.atom.yml`、`autofix.atom.yml`、`report.atom.yml`、release workflows、deployment workflows，以及任何带 trusted secrets 或 write permissions 的 workflow，都必须保持在 fork auto-approval 之外。

## Common iteration flow

1. Classify the change。
   - Validation 或 business decision：从 `ci.yml` 开始。
   - Pure text PR comment：产出 `handoff/comment`，让 `comment.atom.yml` 消费。
   - Same-repo patch：产出 `handoff/autofix`，让 `autofix.atom.yml` 消费。
   - Rich/generated comment：产出 `handoff/report`，让 `report.atom.yml` materialize 并 upsert。
   - New naming、paths 或 metadata：更新 `.github/scripts/handoff.py`。
2. 当某个 workflow/script 应触发 validation lane 时，更新 `scripts/scopes.ts` 中的 scope routing。
3. 更新 `e2e/tests/packaged-smoke-workflow.test.ts` 或相关 script test 中的 topology coverage。
4. 运行 focused checks：
   - `python3 .github/scripts/handoff.py self-check`
   - `actionlint -color`
   - `pnpm --filter @open-design/e2e test tests/packaged-smoke-workflow.test.ts`
5. 交付前运行 repo-level checks：
   - `pnpm guard`
   - `pnpm typecheck`

完成 workflow edits 前使用 `git diff --check`。

## FAQ

### Should I add a new `*.comment.atom.yml` workflow?

通常不要。如果 body 已经是 final markdown，产出 `handoff/comment` 并使用 `comment.atom.yml`。如果 body 必须从 artifacts、secrets 或 report code 生成，产出 `handoff/report` 并使用 `report.atom.yml`。

### Why not put rich visual report generation in `comment.atom.yml`?

因为 `comment.atom.yml` 是 pure text comment shell。安装 dependencies、使用 R2 secrets、下载 screenshots 和生成 diffs 都属于 advanced comment materialization，应放在 `report.atom.yml`。

### Why can `report.atom.yml` upsert comments directly?

`report.atom.yml` 不是 pure producer。它是 auditable advanced comment capability：materialize 一个 non-pure text comment 并发布。关键边界在于这份权力集中在一个 workflow 中，并具备 trusted inputs、stale checks 和 file-backed payload hygiene。

### Why does `autofix.atom.yml` skip fork PRs?

Fork PR branches 在同一 trust model 下不可由 base repository 写入，向 forks push generated changes 需要不同的 permission 和 ownership design。Skip fork PRs，并用 comments 或 report output 提供 contributor guidance。

### Can trusted `workflow_run` workflows checkout PR code?

默认不可以。它们可以把 PR artifacts 作为 data 下载，但不得执行 PR-provided code 或 scripts。运行 repository scripts 前 checkout trusted base/default code。

### Why centralize handoff names in `handoff.py`?

GitHub artifact behavior 很容易 drift：artifact names 在每次 upload 中必须唯一，consumers 也需要 stable patterns。集中 names、paths 和 validation 可以让 producers 与 consumers 对齐，并让 topology tests 有意义。

### Where should tests live?

当 tests 观察 repository-level behavior 时，cross-workflow topology tests 属于 `e2e/tests/`。Script-specific behavior 可以留在现有 script tests 附近。不要只是因为存在 workflow helper 就新增一次性的 `*.test.ts` 文件；当现有 topology coverage 和 helper self-checks 足够时，优先使用它们。
