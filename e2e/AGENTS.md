# e2e/AGENTS.md

先遵循根目录 `AGENTS.md`。本 package 只负责 user-level end-to-end smoke tests 和 Playwright UI automation。

当前 coverage posture、近期 hardening work、grouped-run 状态和已知 intentional gaps，见 [docs/testing/e2e-coverage/status.md](/Users/mac/open-design/open-design/docs/testing/e2e-coverage/status.md)。

## 目录布局

- `specs/`: 最高 ROI、长时间运行的 core business capability regressions，适合 PR 或 release gating。每个 spec 应描述一条几乎正交的 product capability chain，例如 main dialog generation、Pet、Orbit 或 packaged runtime。保持这一层很小，只在 core capability 值得 always-on signal 时扩展。
- `tests/`: 更广的 user-level end-to-end coverage 和 local hotspot checks，故意跨越 app/package/resource 边界。当重复或高风险 local capability 自然来自 core spec 时，优先在这里添加 tests。不要在 core spec 需要之前构建 speculative coverage matrix。
- `tests/scripts/`: root operational scripts 的 behavior-contract coverage，这些脚本的回归会影响 install、CI 或 release flows。Fixtures 必须 hermetic，并能通过 e2e Vitest 运行；不要把 `*.test.ts` siblings 直接放在 root `scripts/` 下。
- `ui/`: 只放 flat Playwright UI automation test files。不要把 helpers、resources 或非 Playwright harnesses 放进这个目录。
- `resources/`: e2e suites 的 declarative resources，例如 Playwright UI scenario lists。
- `lib/fake-agents.ts`: UI 和 pure-inspect daemon specs 共用的 fake local agent CLI harness。
- `lib/timeouts.ts`: 按 CI 缩放的 timeout constants（`T.short`、`T.medium`、`T.long`、`T.xlong`）。从 `@/timeouts` 导入 `{ T }`。UI tests 中请使用它们，不要硬编码 millisecond values。
- `lib/tools-dev/`: framework-neutral tools-dev runtime lifecycle。它拥有 namespace/path construction、port reservation、`tools-dev ... --json` execution、status/log/check reads、URL construction 和 start/stop semantics。它不得 import Vitest 或 Playwright。
- `lib/playwright/suite.ts`: Playwright-only suite assembly。它提供 worker-scoped tools-dev fixture、dynamic `baseURL` 和 failure attachments。UI tests 从 `@/playwright/suite` 导入 `test`/`expect`。
- `lib/vitest/suite.ts`: Vitest-only suite assembly。它组合 neutral tools-dev runtime、report creation、scratch preservation 和非 UI smoke suites 的 Vitest assertions。
- `lib/playwright/mock-factory.ts`: 共享 Playwright mock helpers。`applyStandardMocks(page)` 会 seed localStorage，并用标准 daemon/mock-agent fixtures 拦截 `/api/agents` 和 `/api/app-config`。不需要 custom agent 或 protocol setup 的 tests，请在 `beforeEach` 中使用。
- `lib/vitest/`: 仅 Vitest-specific atomic helpers。Helpers 描述 mock servers、HTTP calls 和 reports 等动作；tools-dev lifecycle 属于 `lib/tools-dev/`，并且只通过 `lib/vitest/suite.ts` 组合。
- `lib/vitest/report.ts`: report boundary。Specs 通过 `report.save(<relpath>, <blob>)` 或 `report.json(<relpath>, value)` 保存 curated output；release workflows 只应消费最终 report path，而不是其内部文件布局。
- `createSmokeSuite(...).with.*`: 来自 `@/vitest/suite` 的 suite-owned lifecycle composition。对 `suite.with.toolsDev(...)` 这类 namespace-bound resources，优先使用这种形态，让 specs 把 business workflow code 放在前景。
- 临时 e2e Vitest env/PATH mutations、AMR fake endpoint URLs 和 packaged smoke default namespaces 必须放在 `@/vitest/suite` helpers 后面，例如 `suite.with.env(...)`、`suite.with.pathEntry(...)`、`suite.amr` 和 `resolvePackagedSmokeNamespace(...)`。不要在单个 specs 中手写 save/restore blocks 或固定 localhost ports。
- `lib/playwright/`: Playwright-specific fixtures、resource accessors、route helpers 和 UI actions。
- `scripts/playwright.ts`: Playwright auxiliary subcommands，例如 artifact cleanup；它不得包装 `playwright test`。

## Spec 和 test 模型

- 从 `specs/` 开始：先定义正交的 long-form core capabilities，再让 supporting `tests/` 和 `lib/` 从这些 chains 中生长。
- `specs/` 应读起来像 business/system workflows，例如 `dialog/main.spec.ts`、`orbit/run.spec.ts` 或 `pet/main.spec.ts`。
- `tests/` 应固定可复用的 local hotspots，例如 `tools-dev/inspect.test.ts`、provider mocks、report lifecycle、artifact file shape 或 namespace cleanup。
- 高置信 infrastructure checks 可以在完整 core spec 存在前加入 `tests/`，但大多数 tests 应只在某个 spec 证明 local hotspot 重要后再抽取。
- 将 `tests/` 视为可维护的 support material，而不是永久 coverage inventory。随着 product capabilities 演进，合并、拆分、缩小或删除 tests。
- 新的非 UI e2e smoke chains 默认保持 pure inspect。不要在这些 chains 中使用 Playwright；使用 daemon/web APIs、sidecar IPC、tools-dev/tools-pack inspect、logs、reports，以及可用时的 screenshots。
- 外部服务依赖必须使用临时 server-level mocks。Core e2e smoke 不要依赖真实 API keys、真实 provider accounts 或 UI-level route patching。
- 每个 atomic suite 必须运行在 isolated namespace 中。成功的 suites 应只保留 curated reports 和高价值 artifacts，然后清理 process/runtime scratch。失败的 suites 应保留 runtime scratch、logs、mock requests、screenshots 和 report pointers 以便诊断。

## 命名和工具

- `specs/` files 必须是 `*.spec.ts`；`tests/` files 必须是 `*.test.ts`。
- 优先使用目录层级，而不是很长的文件名。Basename 通常应不超过三个词，例如 `main.spec.ts`、`run.spec.ts`、`inspect.test.ts` 或 `report.test.ts`。
- `ui/` files 必须是 flat `*.test.ts` Playwright tests。不要在 `ui/` 下添加 subdirectories、TSX、Vitest、jsdom、Testing Library 或 React harness tests。
- `ui/` tests 必须从 `@/playwright/suite` 导入 runtime-bound `test`/`expect`；只有 type imports 或不拥有 test lifecycle 的低层 helper modules 才能使用 `@playwright/test`。
- E2E Vitest tests 使用 Node APIs；不要在 `specs/` 或 `tests/` 下添加 JSX/TSX、jsdom 或 browser-component tests。
- Web component/runtime tests 属于 `apps/web/tests/`，不属于 `e2e/ui/`。
- E2E tests 可以验证 cross-app/resource consistency，但不得把某个 app 的 private implementation 当作另一个 app 的 shared helper。Test-only helpers 保持在 `e2e/lib/` 本地，或提升到 `packages/contracts` 这类 pure package。
- E2E imports 可以用 `@/*` 指向 `lib/*`；保持该 alias 仅限 e2e package。

## Commands

从本目录运行命令：

```bash
pnpm test specs/mac.spec.ts
pnpm test tests/tools-dev/inspect.test.ts
pnpm test specs
pnpm test tests
pnpm test:p0
pnpm test:p0p1
pnpm test:ui:p0
pnpm test:ui:p0p1
pnpm typecheck
pnpm exec tsx scripts/playwright.ts clean
pnpm exec playwright test -c playwright.config.ts --list
pnpm exec playwright test -c playwright.config.ts
```

验证单个 case 时使用具体 file path。不要添加 root e2e aliases，或为单个 cases 增加额外 package scripts。

Case-level priority tags 使用 test-name prefixes：`[P0]`、`[P1]`、`[P2]`。

Playwright UI runs 为每个 Playwright worker 使用一个 tools-dev daemon/web/data root。Single-worker fallback 是 `--workers=1`（或 `OD_PLAYWRIGHT_WORKERS=1`）；不要重新引入 shared daemon/web runtime mode。
