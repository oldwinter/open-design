# tools/pack

Open Design 的本地 packaging control plane。

Active slice 是 mac-first local packaging 和 smoke lifecycle control：

- `tools-pack mac build --to all`
- `tools-pack mac build --to app|dmg|zip`
- `tools-pack mac build --to all --signed`
- `tools-pack mac build --to all --portable`，用于不得烘入本地 tools-pack runtime paths 的 release artifacts
- `tools-pack mac install`
- `tools-pack mac start`
- `tools-pack mac stop`
- `tools-pack mac logs`
- `tools-pack mac uninstall`
- `tools-pack mac cleanup`

Build artifacts 按 namespace 放在 `.tmp/tools-pack/out/mac/namespaces/<namespace>/` 下。Release artifacts 保持 canonical `Open Design.app` bundle shape；本地 `tools-pack install` 会将其复制为 `Open Design.<namespace>.app`，这样 developer namespaces 可以共存，而不影响 runtime data/log/cache paths。

Packaged runtime state 按 namespace 放在 `.tmp/tools-pack/runtime/mac/namespaces/<namespace>/` 下：

- Packaged daemon storage 只由根目录 `AGENTS.md` section **Daemon data directory contract** 管辖。修改或记录 packaged storage propagation 前，必须先阅读该 section；本 README 不得重述它。
- `logs/` 包含 `desktop`、`web` 和 `daemon` 的 packaged process logs。
- `runtime/` 是 packaged desktop/web/daemon process group 使用的 sidecar runtime base。
- `cache/` 为 namespace-local packaged cache state 保留。
- `user-data/` 是 Electron/Chromium `userData` root，其中 `user-data/session/` 用于 `sessionData`。

Finder/manual launches 无法在 root desktop process 上携带 argv stamps。为了让 process fallback 安全，`apps/packaged` 会写入 `runtime/desktop-root.json`，其中包含 desktop stamp、PID、executable path、app path 和 log path。只有 namespace/stamp/PID/command validation 通过时，`tools-pack mac stop` 才信任该 marker；否则它会报告 unmanaged/not-owned reason，而不是 kill unknown processes。

### `tools-pack mac stop` validation

- 如果 marker 不存在，stop 报告 `not-running`。
- 如果 marker PID 已消失，stop 报告 `not-running` 并清除 stale marker。
- 如果 marker PID 被无关 process 复用，stop 报告 `unmanaged`。
- 如果 marker namespace、stamp、runtime root 或 command 与当前 namespace 不匹配，stop 报告 `unmanaged`。

这可以防止 `stop` kill 当前 namespace 外部的 processes。

Packaged desktop 还会把 main-process lifecycle logs 写到 `logs/desktop/latest.log`，让 Finder/manual launches 可诊断。该 log 有意只覆盖 packaged desktop startup/shutdown/process errors，不捕获 web/renderer console output。

Packaged daemon path contract 只位于根目录 `AGENTS.md` section **Daemon data directory contract**。修改或记录 packaged path propagation 前，必须先阅读该 section；本 README 不得重述它。

Packaged desktop 可以检查 release metadata feed，下载已验证的 mac DMG 或 Windows installer，并通过 desktop IPC 暴露 update actions。这个 runtime updater phase 仍会打开下载的 installer 供手工替换，而不是应用 in-place update。

Electron-builder resources 位于 `tools/pack/resources/mac/`。当前 logo 作为 mac icon/DMG placeholder 暂存在那里，方便未来 design-provided assets 替换 resource files，而无需修改 packaging code。

Local developer artifacts 会烘入 tools-pack namespace runtime root，使 `tools-pack mac start/stop/logs/cleanup` 可以从 repo 管理它们。Release artifacts 使用 `--portable`，让 installed app 从用户的 Electron `userData` root 解析 namespace data/log/runtime/user-data，而不是使用构建机器的 `.tmp` path。

### macOS compatibility notes

- `tools-pack mac build --portable --to zip` 是 Intel Macs 上最安全的 manual-install artifact。该路径已在 macOS 12.7.6 Monterey、2015 Intel iMac 上 smoke-tested，并且 app 可从 `/Applications` 成功启动。
- macOS 上 Finder/manual launches 可能不会继承 shell-managed `PATH`。如果 packaged Open Design 无法检测到 Terminal 中可用的 agent CLIs，请将这些 binaries 暴露给 GUI login environment，或从已经能看到它们的 shell session 启动 packaged app。

## Windows

本地 lifecycle commands：

- `tools-pack win build --to dir`，用于快速 unpacked smoke builds。
- `tools-pack win build --to nsis`，用于 installer builds。
- `tools-pack win build --to all`，用于两个 outputs。
- `tools-pack win install`
- `tools-pack win start`
- `tools-pack win inspect --expr "document.title"`
- `tools-pack win logs`
- `tools-pack win stop`
- `tools-pack win cleanup`
- `tools-pack win list`
- `tools-pack win reset`

Build artifacts 按 namespace 放在 `.tmp/tools-pack/out/win/namespaces/<namespace>/` 下。Packaged runtime state 按 namespace 放在 `.tmp/tools-pack/runtime/win/namespaces/<namespace>/` 下。`--to dir` 可以让 `built-app.json` 指向不可变 cached `win-unpacked` executable，同时把 namespace-local config 和 runtime paths 保持在该 cache entry 外部。

## Linux

本地 lifecycle commands：

- `tools-pack linux build --to all`（默认；生成 AppImage）
- `tools-pack linux build --to appimage`（显式 AppImage）
- `tools-pack linux build --to dir`（用于快速迭代的 unpacked output）
- `tools-pack linux build --containerized`（在 `electronuserland/builder:base` Docker 内运行 electron-builder，以获得更广 glibc compatibility target；需要 Docker）
- `tools-pack linux build --to all --portable`（不得烘入本地 tools-pack runtime paths 的 release artifacts）
- `tools-pack linux install`
- `tools-pack linux install --headless`（安装 headless launcher script，而不是 AppImage）
- `tools-pack linux start`
- `tools-pack linux start --headless`（启动 headless entry：daemon + web，无 Electron）
- `tools-pack linux stop`
- `tools-pack linux stop --headless`（停止正在运行的 headless process）
- `tools-pack linux inspect`（AppImage mode 下的 desktop status、eval 和 screenshot）
- `tools-pack linux inspect --headless`（仅 status）
- `tools-pack linux logs`
- `tools-pack linux uninstall`
- `tools-pack linux uninstall --headless`
- `tools-pack linux cleanup`
- `tools-pack linux cleanup --headless`

Build artifacts 按 namespace 放在 `.tmp/tools-pack/out/linux/namespaces/<namespace>/` 下。Packaged runtime state 按 namespace 放在 `.tmp/tools-pack/runtime/linux/namespaces/<namespace>/{data,logs,runtime,cache,user-data}/` 下。Containerized build cache 位于 `.tmp/tools-pack/.docker-cache/{electron,electron-builder}/`。

本地 installs 使用 XDG paths：

- AppImage: `~/.local/bin/Open-Design.<namespace>.AppImage`
- Menu entry: `~/.local/share/applications/open-design-<namespace>.desktop`
- Icon: `~/.local/share/icons/hicolor/512x512/apps/open-design-<namespace>.png`

`<namespace>` suffix 无条件添加，所以多个 developer namespaces 可以在同一 desktop 上共存。`.desktop` file 通过 `MimeType=x-scheme-handler/od;` 注册 `od://` scheme，并在 `Exec=` line 上预设 `OD_PACKAGED_NAMESPACE`，让 menu launches 识别正确 namespace。

### Headless mode (`--headless`)

Headless mode 面向没有 display 的环境（WSL2、headless servers、CI），这些环境无法运行 Electron。如果你有 desktop，请使用 AppImage；如果你通过 SSH 进入机器，或在 WSL 中，请使用 headless。

`--headless` 会让 `install`、`start`、`stop`、`uninstall` 和 `cleanup` 操作 headless entry（`@open-design/packaged/dist/headless.mjs`），而不是 AppImage。Headless mode 会运行 daemon + web，但不运行 Electron。

- `install --headless` 在 `~/.local/bin/open-design-headless-<namespace>` 写入 shell launcher，其中烘入 namespace 和 resource paths。Launcher 是 self-contained，但这些 paths 指向的 assembled app directory 必须保持原位；安装后不要移动它。
- `start --headless` 直接 spawn headless process，将 stdout/stderr 重定向到 `logs/desktop/latest.log`，并在返回前最多等待 95s（identity marker 35s + web URL 60s）。
- `stop --headless` 读取与 AppImage path 相同的 `runtime/desktop-root.json` identity marker，验证 `stamp.source === PACKAGED`，通过 IPC 发送 graceful SHUTDOWN，然后终止 process tree。它不执行 AppImage-specific process-command check。
- `inspect --headless` 只返回 status。Eval 和 screenshot 需要 AppImage mode，因为 headless mode 中没有 Electron renderer。
- `uninstall --headless` 在 safe stop 后移除 headless launcher。
- `cleanup --headless` 在移除 namespace output/runtime roots 前停止 headless process。

`logs` 无论 mode 如何都读取 `logs/desktop/latest.log`，因此 headless output 可通过 `tools-pack linux logs` 查看。

### AppImage launch mode（FUSE caveat）

`tools-pack linux start` 总是带 `--appimage-extract-and-run` spawn AppImage。在 Ubuntu 24.04 和 Arch Linux 上的 smoke testing 显示，直接 FUSE-mounted AppImage launches 会让 Node module loads（Express、better-sqlite3 等）慢到 daemon sidecar 持续无法在 `apps/packaged` 的 35-second startup timeout 内完成。Extract-and-run 会将 AppImage 解包到 `/tmp/appimage_extracted_<hex>/`，然后从那里 exec 内部 Electron，绕过 FUSE，并让 daemon 在 5 秒内启动，约提升一个数量级。

**对 end-users 的影响：** 如果手动启动已安装 AppImage（不是通过 `tools-pack linux start`），请自行传入 `--appimage-extract-and-run`，或依赖会自动处理 extract-and-run 的 desktop launcher / `appimage-launcher` daemon。

### Optional system tools

`tools-pack linux install` 和 `tools-pack linux uninstall` 会以 best-effort post-hooks 调用 `update-desktop-database` 和 `gtk-update-icon-cache`。任一工具缺失（output 中 `iconCache: "missing"`）都无害；icon 和 menu entry 仍可工作，只是 cache 不会刷新。通过你的 distro 安装：

- Arch / CachyOS: `sudo pacman -S desktop-file-utils gtk-update-icon-cache`
- Debian / Ubuntu: `sudo apt install desktop-file-utils gtk-update-icon-cache`
- Fedora: `sudo dnf install desktop-file-utils gtk-update-icon-cache`

FUSE-mounted AppImage launch 需要 `libfuse2`（在不带 `--appimage-extract-and-run` 直接运行 AppImage 时的默认模式）。`tools-pack linux start` 总是使用 extract-and-run，并完全绕过 FUSE，因此不需要 `libfuse2`。大多数现代 distros 默认提供 `libfuse2`；较旧 Ubuntu LTS hosts 可能需要 `sudo apt install libfuse2t64`（24.04 前使用 `libfuse2`）。

### Sandbox / chrome-sandbox

Linux 上的 Electron 41 需要 `kernel.unprivileged_userns_clone=1`（Arch、Ubuntu 24+、Debian 12+ 默认如此），或使用 AppImage 的 `--no-sandbox` fallback。大多数现代 distros 不需要额外设置。

### Distro compatibility target

在 rolling distro（例如 Arch / CachyOS）上原生构建的 AppImages 会链接较新的 glibc，可能无法在 stable distros（Ubuntu 22.04、Debian 12）上运行。使用 `--containerized` 针对 `electronuserland/builder:base` baseline（Ubuntu 18.04 / glibc 2.27）构建；这是 release AppImages 的 compatibility target，而不是对每个 Linux distribution 的保证。

本仓库当前 verified smoke coverage 包括：

- PR lane: Ubuntu GitHub-hosted runner，headless Linux runtime。
- Release lane: Ubuntu GitHub-hosted runner；启用 Linux release lane 时，运行 containerized AppImage build 加 Xvfb AppImage runtime smoke。
- 用来选择 `--appimage-extract-and-run` 的 manual AppImage behavior：Ubuntu 24.04 和 Arch Linux。

### Format choice: why AppImage first

该领域的 Linux desktop apps 分布在不同格式中：VS Code 发布 `.deb` + `.rpm` + Snap；Discord 发布 AppImage + `.deb`；Slack 发布 `.deb` + `.rpm`；Cursor 和 Obsidian 发布 AppImage。我们从 AppImage 开始，因为一个 artifact 可以覆盖最广的 glibc-compatible target，不需要 distro repositories、store packaging、signing infrastructure 或 per-format install scripts，并且能与 namespace-scoped install layout 干净集成。`.deb` / `.rpm` / Snap / Flatpak 可以在 user demand 足以 justify 额外 release ownership 时增量落地。

### Out of scope（later phases）

- AppImage signing（`--signed`）— 等待 GPG key infrastructure decision 和 user-facing verification flow design，暂缓（无 ETA）。
- AppImage auto-update feed（`latest-linux.yml`）— linux electron-builder config 没有接入 `publish` block，因此生成的 feed 会指向一个永远不更新的 feed。与 signing 一起跟踪。
- Additional package formats: `.deb`、`.rpm`、Snap、Flatpak — 延后，直到存在需求，并有 owner 负责 per-distro metadata、signing/store/repository plumbing、install/remove hooks 和 release validation。
- Full Linux AppImage PR smoke 仍只在 release-lane 中运行；PR validation 运行 Linux headless packaged smoke，因为它不需要 display server。

`--to dmg` 只是 manual-install DMG output。任何 builder-generated updater metadata，例如 `latest-mac.yml` 或 `.blockmap` files，都视作 scratch 并从 builder directory 清理；release-beta 会在 release asset preparation 阶段生成 authoritative `latest-mac.yml` feed，并指向 update ZIP。
