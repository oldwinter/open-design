# Design Browser 任务交接

根据 2026-05-30 的这次聊天会话生成。

## 仓库

- Worktree: `/Users/pftom/.superset/worktrees/d3aab1a3-c696-403f-9692-7e5bc2dfa1f3/accidental-bolt`
- Product area: Open Design `Design Files` workspace、embedded browser module、desktop host bridge、browser-harness task entry。

## 用户 Query 顺序记录

1. 初始功能请求：

   > `[Image #1]` 在 design files 那一排支持一个 plus icon, 增加一个类似 `[Image #2]` 的 browser 模块,然后可以打开浏览器, 支持 `[Image #3]` 如图的能力, 包括上一页/下一页/刷新/输入地址栏/支持展示/搜索和选择历史地址打开各种能在浏览器打开的文件如本地文件/各种服务文件/网站 `[Image #4]` 如图也支持一些 clear/open in browser /等截图的能力
   >
   > 参考 https://github.com/superset-sh/superset 代码, 里面已经实现了完整的能力了,直接搬过来,确保在 open-design 里面完美适配和使用, 就像内嵌了一个真实的浏览器, 然后那个地址栏 + 浏览器空白页可以给大量的推荐网址, 方便做设计的参考,做的好看/酷/世界级设计
   >
   > 比如 svg 的 https://thesvg.org/
   > https://unsplash.com/ 图片的
   > https://motionsites.ai/ 各种高级网站参考 https://motion.page/showcase/
   > https://styles.refero.design/ 借鉴设计风格

2. 增加空白页推荐：

   > 浏览器空白页网址继续添加:
   >
   > - https://brandfetch.com/

3. Agent/browser-harness 集成方向：

   > 然后理论上应该结合 agent 的能力 和 https://github.com/browser-use/browser-harness , 以及结合对 browser 的控制和能力, 增加一些快捷的入口或者操作, 能够让用户轻松通过 browser use（browser harness）能够把这些网站的内容搞下来然后应用在用户自己的设计 artifacts 里面, 这样能够极大的增长用户的设计水准

4. 用户提供的 repo instructions：

   > `# AGENTS.md instructions for /Users/pftom/.superset/worktrees/d3aab1a3-c696-403f-9692-7e5bc2dfa1f3/accidental-bolt`
   >
   > 聊天中粘贴了完整 root `AGENTS.md` 内容。给下一个 agent 的重点：触碰这些目录前，遵守真实 repo 的 `AGENTS.md`，以及 `apps/AGENTS.md` 和 `packages/AGENTS.md`。

5. 增加动效站点：

   > 网址增加 https://gsap.com/ 做动效的

6. 增加过渡动画和字体参考：

   > 网址添加 https://transitions.dev/ 过渡动画/ 以及字体:https://fonts.google.com/

7. 增加文字动画参考：

   > 文字动画:https://animography.net/

8. 增加资源集合：

   > 各种集合站和资源:https://toolfolio.io/

9. 增加手绘图像参考：

   > 手绘图像: https://www.whirrls.com/

10. 增加创业公司灵感参考：

    > 各种顶尖的创业公司: https://startups.gallery/

11. 增加点状地图可视化参考：

    > 世界点状图:https://www.worldindots.com/

12. 增加设计资源 URL：

    > 添加 网址: getdesign.md

13. 验证请求：

    > check 一下整体能力真的实现和跑通了吗

14. 交接请求：

    > 吧我这个 task/会话所有的历史的 query 都帮我提取出来放到一个文件里, 我要 handoff 任务给下一个 agent

## 派生验收要求

- Add a `+` icon in the Design Files tab row.
- `+` 打开包含 Browser module 的 module menu。
- Browser module 作为 workspace tab 打开。
- Browser 支持 back、forward、refresh、hard reload、address/search input、history suggestions 和 reference-site suggestions。
- Browser 可以在 embedded runtime 支持的范围内打开 websites 和 local/service URLs。
- Browser menu 支持：
  - Take Screenshot
  - Hard Reload
  - Copy URL
  - Open in Browser
  - Clear Browsing History
  - Clear Cookies
  - Clear All Data
- Blank page 包含精选 design-reference recommendations：
  - https://thesvg.org/
  - https://unsplash.com/
  - https://motionsites.ai/
  - https://motion.page/showcase/
  - https://styles.refero.design/
  - https://brandfetch.com/
  - https://gsap.com/
  - https://transitions.dev/
  - https://fonts.google.com/
  - https://animography.net/
  - https://toolfolio.io/
  - https://www.whirrls.com/
  - https://startups.gallery/
  - https://www.worldindots.com/
  - https://getdesign.md/
- 增加面向 browser-use/browser-harness 的 shortcut/task entry，让用户可以提取页面截图、design language、assets，并应用到 Open Design artifacts。

## 当前实现状态

目前改过的文件：

- `apps/web/src/components/DesignBrowserPanel.tsx`
- `apps/web/src/components/FileWorkspace.tsx`
- `apps/web/src/components/Icon.tsx`
- `apps/web/src/styles/workspace/design-files.css`
- `apps/web/src/styles/workspace/drawer.css`
- `apps/desktop/src/main/index.ts`
- `apps/desktop/src/main/preload.cts`
- `apps/desktop/src/main/runtime.ts`
- `apps/desktop/tests/main/preload-host-boundary.test.ts`
- `apps/packaged/tests/desktop-url-allowlist.test.ts`
- `packages/host/src/index.ts`
- `packages/host/src/testing.ts`
- `packages/host/tests/index.test.ts`

已实现行为：

- Design Files tab strip 现在有 `+` button。
- `+` menu 可以打开本地 `Browser` tab。
- Browser panel 具备 address input、suggestions、history persistence、back/forward/reload controls、menu actions、reference cards、screenshot saving、page brief saving 和 browser-harness task saving。
- Desktop runtime 只为 main window 启用 Electron `webviewTag`，并验证 embedded browser startup URLs。
- Desktop host bridge 为专用 browser partition 暴露 browser data clearing。
- Host package 提供 helper `clearHostBrowserData`。

## 验证状态

已通过：

- `pnpm --filter @open-design/web typecheck`
- `pnpm --filter @open-design/desktop typecheck`
- `pnpm --filter @open-design/host typecheck`
- `pnpm --filter @open-design/host test`
- `pnpm --filter @open-design/packaged test -- desktop-url-allowlist`
- 来自 `apps/web` 的直接 targeted web tests：
  - `pnpm exec vitest run -c vitest.config.ts tests/components/FileWorkspace.test.tsx tests/components/FileWorkspace.design-system.test.tsx`
  - 结果：2 个文件通过，38 个 tests 通过。
- Root `pnpm typecheck` 成功完成。它输出了既有 landing-page warnings/hints，但没有 errors。

未完全验证：

- `pnpm guard` 没有在这个 sandbox 中跑起来，因为 `tsx` 创建 IPC pipe 时遇到 `EPERM`。
- `pnpm tools-dev run web --daemon-port 17456 --web-port 17573` 因为同样的 `tsx` IPC pipe `EPERM` 没能在这个 sandbox 中启动。
- 由于 local runtime startup 被 sandbox 阻塞，未完成最终 visual/browser verification。

观察到的无关 test friction：

- 运行 `pnpm --filter @open-design/web test -- FileWorkspace` 或通过 package script 传入 paths 时，意外触发了完整 web test set。它命中了 `SettingsDialog.execution.test.tsx` 或 `ExamplesTab.test.tsx` 中的无关 failures/timeouts。
- 直接从 `apps/web` 运行 `pnpm exec vitest ...` 能正确限定到 FileWorkspace，并且通过。

## 下一个 Agent 建议检查

- 在这个 sandbox 外，或在 `tsx` 可以创建本地 IPC pipe 的环境中运行 `pnpm guard`。
- 启动 `pnpm tools-dev run web --daemon-port <free> --web-port <free>` 并做 visual check：
  - Design Files row shows the `+` icon.
  - `+` opens Browser.
  - Blank browser page shows all requested URLs.
  - Address input navigates to at least one external site and one local/service URL.
  - History suggestions appear after navigation.
  - Browser menu actions render and enabled/disabled states make sense.
  - In desktop runtime, webview loads and screenshot/page brief/task save into Design Files.

## Completion Pass - Workflow + Runtime Verification（2026-05-30，follow-up agent）

### 静态审计（multi-agent workflow）

围绕所有 acceptance requirements 跑了 5-phase audit/verify/implement workflow。结果：静态分析中 **42/45 requirements met, 0 defects**；剩余 3 项是 partial/judgment（i18n debt、交互式 render surface 的 CLI dual-track N/A、CSS global-vs-module precedent）。该 workflow 新增了 `apps/web/tests/components/DesignBrowserPanel.test.tsx`（覆盖 pure helpers 的 34 个 cases：`normalizeBrowserAddress` 每个分支、history round-trip、harness/brief markdown 等），并将这些 helpers 改为 named exports。

### 真实 runtime 验证（computer-use against live Electron desktop app）

通过 `pnpm tools-dev inspect desktop eval/screenshot` 驱动运行中的 desktop runtime。在真实 app 中确认：`+` -> add-menu -> **Browser** tab -> `DesignBrowserPanel` renders；MOTION/ASSETS/SYSTEMS 下全部 **15** 个 reference URLs；`webviewTag` 已启用（`WebViewElement`）；host bridge `__od__` 暴露 `browser.clearData`；navigation 会 commit；embedded `<webview>` 可以加载并**绘制**真实页面（`example.com` -> `<h1>Example Domain</h1>`，487x117 layout）；`webview.capturePage()` 返回真实 51 KB PNG（"Take Screenshot" action 可用）。

### 发现并修复的 3 个 runtime-only bugs（static/JSDOM checks 看不到）

全部位于 `apps/web/src/components/DesignBrowserPanel.tsx`：

1. **`allowpopups` React warning** - webview branch mount 时，bare boolean JSX attr 触发 "Received `true` for a non-boolean attribute"。修复方式是在 ref callback 中 imperative 设置 `allowpopups`。
2. **`dom-ready` crash** - webview attach 前，`updateNavigationState`（以及 reload button）调用 `canGoBack()`/`canGoForward()`/`isLoading()`/`reload()`，抛出 "The WebView must be attached..."。已用 try/catch guard（匹配既有 `safeGetWebviewUrl/Title` pattern）。
3. **`ERR_ABORTED (-3)` blank page（critical / 导致功能不可用）** - `src={currentUrl}` 加上会把 committed（trailing-slash）URL 写回 `currentUrl` 的 `did-navigate` handler，导致 Electron 在 load 中途 re-navigate 并 abort，留下空白 pane。修复方式是将 state 拆成 `loadUrl`（驱动 `src`，仅在用户导航时变化）和 `currentUrl`（address bar/history，从 webview events 同步）。由 red->green regression test 覆盖：`apps/web/tests/components/DesignBrowserPanel.webview.test.tsx`。

### 最终验证（修复后全部 green）

`pnpm guard` 33、web `typecheck` clean、desktop `typecheck` clean、web tests **74**（34 pure + 2 webview regression + FileWorkspace + design-system）、desktop **73**、host **14**、packaged **111**。在修复后的 code 上重新驱动 runtime：page paints，没有 error overlays。
