# tools/pack

先遵循根目录 `AGENTS.md` 和 `tools/AGENTS.md`。此工具拥有 repo-external packaged build/start/stop/logs command surface。

## Owns

- Packaged Open Design artifacts 的本地 packaging orchestration。
- mac build/install/start/stop/logs/uninstall/cleanup smoke commands。
- Windows NSIS build/install/start/stop/logs/uninstall/cleanup/list/reset smoke commands。
- Windows registry observation/cleanup 必须通过 `reg.exe`，且范围只限匹配 namespace install/uninstaller paths 的 entries。
- Windows lifecycle logs 除 app runtime logs 外，还必须暴露 NSIS automation logs/markers/timings。
- Linux AppImage build/install/start/stop/logs/uninstall/cleanup smoke commands。
- Linux headless（no-Electron）install/start/stop，通过 `install`、`start` 和 `stop` 上的 `--headless` flag。
- 通过 `electronuserland/builder` Docker image 执行 Linux containerized builds，以获得 distro-agnostic glibc compat。
- 消费来自 `@open-design/sidecar-proto`、`@open-design/sidecar` 和 `@open-design/platform` 的 sidecar/process/path primitives。

## Does not own

- Product business logic。
- Sidecar protocol definitions。
- 第二套 process identity model。
- Product/business update runtime integration。

## Rules

- 不要手工构建 `--od-stamp-*` args；请结合 `OPEN_DESIGN_SIDECAR_CONTRACT` 使用 `createProcessStampArgs`。
- 不要在 data/log/runtime/cache path decisions 中使用 port numbers。Namespace 决定 paths；ports 只是临时 transports。
- Public release artifacts 必须使用 channel-specific app identity：stable 使用 `Open Design`，beta 使用 `Open Design Beta`，preview 使用 `Open Design Preview`。本地 tools-pack installs 仍可只把 namespace-scoped install paths 当作 developer multi-instance validation convention。
- 不要让按 namespace 命名的 `.app` installs 改变 data/log/runtime/cache path conventions。
- Public/release artifacts 使用 `--portable`，避免 packaged config 烘入构建机器上的本地 tools-pack runtime roots。
- Electron-builder 使用的 pack resource files 属于 `tools/pack/resources/`；不要让 pack logic 指向 Downloads、web public assets、docs assets 或其他 app-owned resource paths。
- 对普通 Windows NSIS smoke tests，使用 `rg`、`smoke` 或 `nsis-a` 这类短 namespaces。NSIS 会在 namespace-scoped install directory 下解压深层嵌套的 Next.js standalone files；长 namespaces 即使在 builder `win-unpacked` output 正确时，也可能让 installed paths 超过传统 Windows 260-character limit。Merge regression 期间，namespace `regression-merge-nsis` 产生了 264 characters 的 installed path length，并在 installed directory 中缺失 `next/dist/server/route-matcher-providers/helpers/cached-route-matcher-provider.js`，而同一个 NSIS smoke 使用 namespace `rg` 时通过。只有在有意测试 installer path-length behavior 时才使用长 namespaces。

## Packaged auto-update architecture and harness

修改 packaged auto-update behavior 前请先阅读本节。Updater 跨越 package、desktop、web UI、release-feed 和 installer surfaces，因此 bugs 常藏在 otherwise-green package tests 之间。

### Architecture map

- `apps/desktop/src/main/updater.ts` 拥有 updater state、release metadata parsing、artifact selection、checksum verification、download-store ownership、progress events，以及打开下载好的 installer。它是纯 main-process logic，并在 `apps/desktop/tests/main/updater.test.ts` 下测试。
- `apps/desktop/src/main/runtime.ts` 通过 `od:update:status|check|download|install|quit` 向 renderer 暴露 updater IPC，并发出 `od:update:status-changed`。保持 installer launch 与 process shutdown 分离；quit 是 explicit post-installer action。
- `apps/desktop/src/main/index.ts` 连接 scheduler。Native menu update actions 有意不是 user-facing surface；web updater UI 拥有 discovery 和 action prompts。
- `apps/web/src/lib/updater.ts` 将 host updater snapshots 归一化为 UI-ready state。
- `apps/web/src/components/UpdaterPopup.tsx` 是左侧 rail 中可见的 updater surface。所有 visible copy 必须经过 `apps/web/src/i18n`。
- `apps/packaged/src/index.ts` 将 packaged `appVersion` 和 namespace-scoped `updateRoot` 传入 desktop main。
- `tools/serve` 只拥有 deterministic local updater fixtures。它不得包含 product updater runtime logic。
- `tools/pack` 拥有 packaged build/install/start/inspect/logs/uninstall/cleanup 和 platform installer harness，包括 Windows NSIS registry observation 与 cleanup。

### Release metadata shape

Runtime updater 默认读取 `https://releases.open-design.ai/<channel>/latest/metadata.json`，除非 `OD_UPDATE_METADATA_URL` 覆盖它。对于 package-launcher updates：

- mac 选择 `platforms.mac.artifacts.dmg`。
- Windows 选择 `platforms.win.artifacts.installer`。
- Artifact 必须有 checksum，最好是 `sha256Url`；updater 会先验证 bytes，再暴露 install action。
- `OD_UPDATE_CURRENT_VERSION` 可以为 tests 覆盖 packaged version，但 user-flow package validation 应优先用目标 `--app-version` 构建 package。

### Channel identity rules

Channel identity 必须在 install、update install、shortcuts、registry entries 和 app data 中保持稳定：

- Stable: `Open Design`，namespace `default` 或 stable release namespace。
- Beta Windows: `Open Design Beta`，namespace `release-beta-win`，uninstall key `Open Design-release-beta-win`。
- Preview Windows: `Open Design Preview`，namespace `release-preview-win`，uninstall key `Open Design-release-preview-win`。
- `beta-local-flow` 这类 beta-like ad hoc namespaces 是 test namespaces，不是 beta channel。它们不得用于 user-flow beta validation，因为它们会创建不同 registry key，却共享令人困惑的 display name/path。

如果本地 beta package 预期由真实 beta feed 更新，请用 `--namespace release-beta-win` 和较旧 beta `--app-version` 构建。否则已安装 beta.5 package 和下载的 beta.6 package 可能显示为独立 registry entries，即使它们目标是同一个 display name。

### Deterministic fixture harness

当 network release state 不是被测对象时，用 `tools-serve start updater` 做快速、deterministic tests 和 e2e automation。Fixture flow：

```bash
pnpm tools-serve start updater --json --channel beta --version 99.0.0-beta.1 --platform win
```

然后用以下环境启动 packaged desktop：

```bash
OD_UPDATE_ENABLED=1
OD_UPDATE_METADATA_URL=<fixture metadataUrl>
OD_UPDATE_CURRENT_VERSION=99.0.0-beta.0
OD_UPDATE_OPEN_DRY_RUN=1
OD_UPDATE_AUTO_CHECK=1
```

该 harness 适合断言 IPC、popup rendering、progress、checksum/download-store behavior 和 dry-run installer opening。它不是完整 user-view validation，因为它替换了 public release feed，并使用 synthetic artifact bytes。

### High-confidence local user-flow acceptance

在把 Windows beta build 交给人类 tester 前，用它验证 release-channel behavior。该路径有意避开 mock services，并演练真实 public beta feed。

1. 先确认最新 beta metadata：

```bash
curl.exe --ssl-no-revoke -fsSL https://releases.open-design.ai/beta/latest/metadata.json
```

2. 使用真实 beta namespace 和低于 latest 的 version 构建 non-portable Windows beta package：

```bash
pnpm tools-pack win build --dir C:\odtp-beta-release-fixed --namespace release-beta-win --to nsis --app-version 0.8.0-beta.5 --json
```

3. 将生成的 installer 给 tester：

```text
C:\odtp-beta-release-fixed\out\win\namespaces\release-beta-win\builder\Open Design-release-beta-win-setup.exe
```

4. 预期 user flow：

- User 通过 NSIS UI 安装 `0.8.0-beta.5`。
- User 启动 `Open Design Beta`。
- App 自动检查真实 beta feed，下载最新 `platforms.win.artifacts.installer`，验证 sha256，并显示 web updater popup。
- Native File menu 不得暴露 update actions。
- Updater popup 使用 i18n strings，download progress 不得在真实 bytes 到达前闪到 100%。
- 点击 `Open installer` 会打开真实下载的 beta installer。安装它应覆盖同一个 `Open Design-release-beta-win` registry key，而不是创建第二个 beta key。

5. beta.6 安装后的 registry sanity check：

```powershell
Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*' -ErrorAction SilentlyContinue |
  Where-Object { $_.DisplayName -like 'Open Design*' } |
  Select-Object PSChildName,DisplayName,DisplayVersion,InstallLocation
```

干净的 beta channel 结果应只有一个 beta entry，`PSChildName` 为 `Open Design-release-beta-win`，且 `DisplayVersion` 为 latest。
Windows Settings > Apps 可能在当前 view 内缓存 uninstall metadata。如果 registry query 正确后 Settings 仍显示之前的 beta version，请切换离开 Apps view 再回来，或重开 Settings，再把它视为 installer failure。上面的 registry query 是该 harness 的 source of truth。

6. 避免留下 validation residue。先停止正在运行的 app processes，然后对 tool-managed namespaces 使用 tools-pack uninstall/cleanup。只有在验证 resolved path 确实是预期目录后，才删除 explicit temp roots。

```bash
pnpm tools-pack win stop --dir C:\odtp-beta-release-fixed --namespace release-beta-win --json
pnpm tools-pack win uninstall --dir C:\odtp-beta-release-fixed --namespace release-beta-win --remove-product-user-data --remove-data --remove-logs --remove-sidecars --json
pnpm tools-pack win cleanup --dir C:\odtp-beta-release-fixed --namespace release-beta-win --remove-product-user-data --remove-data --remove-logs --remove-sidecars --json
```

### Validation matrix for updater changes

运行与所触及 surface 匹配的窄 tests，然后运行 repo checks：

```bash
pnpm --filter @open-design/desktop test -- tests/main/updater.test.ts tests/main/updater-host-boundary.test.ts tests/main/preload-host-boundary.test.ts
pnpm --filter @open-design/web test -- tests/components/UpdaterPopup.test.tsx tests/lib/updater.test.ts
pnpm --filter @open-design/tools-serve test
pnpm --filter @open-design/tools-pack test -- tests/win-identity.test.ts tests/win-app.test.ts tests/win-builder.test.ts
pnpm --filter @open-design/desktop typecheck
pnpm --filter @open-design/web typecheck
pnpm --filter @open-design/tools-pack typecheck
pnpm --filter @open-design/tools-serve typecheck
git diff --check
pnpm guard
pnpm typecheck
```

当变更触及真实 release feed selection、channel identity、Windows registry/install behavior、installer opening 或 visible updater UI behavior 时，请运行 high-confidence local user-flow acceptance。
