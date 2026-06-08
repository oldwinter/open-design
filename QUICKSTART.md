# 快速上手 · Quickstart

<p align="center"><a href="https://github.com/nexu-io/open-design/blob/main/QUICKSTART.md">English</a> · <a href="docs/i18n/QUICKSTART.pt-BR.md">Português (Brasil)</a> · <a href="docs/i18n/QUICKSTART.de.md">Deutsch</a> · <a href="docs/i18n/QUICKSTART.fr.md">Français</a> · <a href="docs/i18n/QUICKSTART.ja-JP.md">日本語</a> · <b>简体中文</b> · <a href="docs/i18n/QUICKSTART.zh-TW.md">繁體中文</a></p>

在本地运行完整产品。

## 环境要求

- **Node.js：** `~24`（Node 24.x）。仓库通过 `package.json#engines` 强制要求该版本。
- **pnpm：** `10.33.x`。仓库通过 `packageManager` 固定 `pnpm@10.33.2`；请使用 Corepack，让固定版本自动生效。
- **操作系统：** macOS、Linux、WSL2 是主要路径。Windows 原生也受支持；常见安装问题请参阅 [`docs/windows-troubleshooting.md`](docs/windows-troubleshooting.md)。
- **可选本地 agent CLI：** Claude Code、Codex、Devin for Terminal、Gemini CLI、OpenCode、Cursor Agent、Qwen、Qoder CLI、GitHub Copilot CLI 等。如果没有安装任何 CLI，可在 Settings 中使用 BYOK API 模式。

### 本地 agent CLI 与 PATH

Daemon 会扫描你的 **`PATH`**（另加常见用户工具链目录）。如果你通过 **`npm install -g`** 或 **Homebrew** 安装了 CLI，但 Open Design 仍显示 *not installed*，GUI 进程可能使用了精简 `PATH`，其中不包含全局 npm 或 Homebrew 的 `bin` 目录。这在 macOS 上很常见，尤其是应用并非从完整 login shell 启动时。请确保运行 daemon 的进程能在 `PATH` 上看到该可执行文件所在目录，然后在 **Settings → Execution mode** 中点击 **Rescan**。

[`nvm`](https://github.com/nvm-sh/nvm) / [`fnm`](https://github.com/Schniz/fnm) 是可选便捷工具，不是项目必要依赖。如果使用其中之一，请先安装并选择 Node 24，再运行 pnpm：

```bash
# nvm
nvm install 24
nvm use 24

# fnm
fnm install 24
fnm use 24
```

然后启用 Corepack，并让仓库选择 pnpm：

```bash
corepack enable
corepack pnpm --version   # 应输出 10.33.2
```

## Docker 设置

在完全容器化的环境中运行 Open Design，无需在本机安装 Node.js 或 pnpm。

### 要求

* Docker Desktop
* Docker Compose v2

验证 Docker 是否安装正确：

```bash
docker compose version
```

---

## 启动 Open Design

从仓库根目录开始：

1. 进入 deploy 目录并复制环境模板：

   ```bash
   cd deploy
   cp .env.example .env
   ```

2. 生成安全令牌：

   ```bash
   openssl rand -hex 32
   ```

3. 用编辑器打开 `.env`，找到 `OD_API_TOKEN=`，把生成的令牌粘贴进去。

然后启动服务：

```bash
docker compose up -d
```

在浏览器中打开应用：

```text
http://localhost:7456
```

首次启动可能需要几秒钟，因为 Docker 会拉取最新镜像。

---

## 常用 Docker 命令

### 查看日志

```bash
docker compose logs -f
```

### 重启容器

```bash
docker compose restart
```

### 停止容器

```bash
docker compose down
```

### 拉取最新镜像

```bash
docker compose pull
docker compose up -d
```

### 删除全部本地应用数据

```bash
docker compose down -v
```

---

## 环境配置

创建 `deploy/.env` 文件来覆盖默认配置。可从提供的示例开始：

```bash
cp deploy/.env.example deploy/.env
```

编辑 `deploy/.env`，设置自己的令牌并按需调整其他值：

```env
# Port exposed on the host
OPEN_DESIGN_PORT=7456

# Container memory limit
OPEN_DESIGN_MEM_LIMIT=384m

# Allowed CORS origins
OPEN_DESIGN_ALLOWED_ORIGINS=https://yourdomain.com

# Docker image tag
OPEN_DESIGN_IMAGE=docker.io/vanjayak/open-design:latest

# Required API token for daemon security
# Generate one with: openssl rand -hex 32
OD_API_TOKEN=
```

---

## 持久化存储

Open Design 会把项目和 SQLite 数据存储在 Docker volume 中：

```text
open_design_data
```

该 volume 挂载到：

```text
/app/.od
```

数据会在容器重启和镜像更新后继续保留。

查看 volume：

```bash
docker volume inspect open-design_open_design_data
```

---

## 注意事项

* Docker 模式适合不想在本机安装 Node.js 或 pnpm 的贡献者。
* 容器会直接在端口 `7456` 暴露生产 daemon 构建。
* 开发工作流和高级本地设置请继续阅读本 Quickstart 的后续内容。

---

## 一条命令（dev 模式）

```bash
corepack enable
pnpm install
pnpm tools-dev run web # 在前台启动 daemon + web
# 打开 tools-dev 输出的 web URL
```

如需在后台运行 desktop shell 和所有托管 sidecar：

```bash
pnpm tools-dev # 在后台启动 daemon + web + desktop
```

首次加载时，应用会检测已安装的 code-agent CLI（Claude Code / Codex / Devin for Terminal / Gemini / OpenCode / Cursor Agent / Qwen / Qoder CLI），自动选择一个，并默认使用 `web-prototype` skill + `Neutral Modern` design system。输入 prompt 并点击 **Send**。Agent 会流式输出到左侧面板；`<artifact>` 标签会被解析出来，HTML 会在右侧实时渲染。运行完成后，点击 **Save to disk**，artifact 会保存到 `./.od/artifacts/<timestamp>-<slug>/index.html`。

**Design system** 下拉框内置 71 套系统：2 套手写 starter（Neutral Modern、Warm Editorial）和 69 套从 [`awesome-design-md`](https://github.com/VoltAgent/awesome-design-md) 导入的产品系统，按 category 分组（AI & LLM、Developer Tools、Productivity、Backend、Design Tools、Fintech、E-Commerce、Media、Automotive）。选择其中一套，即可用该品牌的审美为每个原型换肤；另外还有 57 个来自 [`awesome-design-skills`](https://github.com/bergside/awesome-design-skills) 的 design skill。

**Skill** 下拉框按 mode 分组（Prototype / Deck / Template / Design system），并用 `· default` 后缀标出每个 mode 的默认 skill。内置 skill：

- **Prototype**：`web-prototype`（通用）、`saas-landing`、`dashboard`、`pricing-page`、`docs-page`、`blog-post`、`mobile-app`。
- **Deck / PPT**：`simple-deck`（单文件横向滑动）和 `magazine-web-ppt`（来自 [`op7418/guizang-ppt-skill`](https://github.com/op7418/guizang-ppt-skill) 的 `guizang-ppt` bundle，是 deck mode 默认项，自带 assets/template + 4 份 references）。带 side file 的 skill 会自动获得一段 "Skill root (absolute)" 前言，让 agent 能基于真实磁盘路径解析 `assets/template.html` 和 `references/*.md`，而不是依赖自身 CWD。

把 skill 与 design system 配对后，只需一句 prompt，就能生成符合布局场景、并采用所选视觉语言的原型或 deck。

## 其他脚本

```bash
pnpm tools-dev                 # daemon + web + desktop 在后台运行
pnpm tools-dev start web       # daemon + web 在后台运行
pnpm tools-dev run web         # daemon + web 在前台运行（e2e/dev server）
pnpm tools-dev restart         # 重启 daemon + web + desktop
pnpm tools-dev restart --daemon-port 7457 --web-port 5175
pnpm tools-dev status          # 检查托管 runtime
pnpm tools-dev logs            # 查看 daemon/web/desktop 日志
pnpm tools-dev check           # status + 最近日志 + 常见诊断
pnpm tools-dev stop            # 停止托管 runtime
pnpm --filter @open-design/daemon build  # 构建供 `od` 使用的 apps/daemon/dist/cli.js
pnpm --filter @open-design/web build     # 需要时构建 web package
pnpm typecheck                 # workspace typecheck
```

`pnpm tools-dev` 是唯一的本地生命周期入口。不要使用已移除的旧根别名：`pnpm dev`、`pnpm dev:all`、`pnpm daemon`、`pnpm preview`、`pnpm start`。

本地开发时，`tools-dev` 会先启动 daemon，将其端口传给 `apps/web`；`apps/web/next.config.ts` 会把 `/api/*`、`/artifacts/*`、`/frames/*` 重写到该 daemon 端口，让 App Router 应用无需 CORS 设置即可与相邻的 Express 进程通信。

## 媒体生成 / agent dispatcher 检查

Image、video、audio 和 HyperFrames skill 会通过 daemon 注入的环境变量调用本地 `od` CLI：

- `OD_BIN`：`apps/daemon/dist/cli.js` 的绝对路径。
- `OD_DAEMON_URL`：正在运行的 daemon URL。
- `OD_PROJECT_ID`：当前 project id。
- `OD_PROJECT_DIR`：当前 project 的文件目录。

如果媒体生成报错 `OD_BIN: parameter not set`、`apps/daemon/dist/cli.js` 缺失，或 `failed to reach daemon at http://127.0.0.1:0`，请重建 daemon CLI 并重启托管 runtime：

```bash
pnpm --filter @open-design/daemon build
pnpm tools-dev restart --daemon-port 7457 --web-port 5175
ls -la apps/daemon/dist/cli.js
curl -s http://127.0.0.1:7457/api/health
```

然后从 Open Design 应用重新打开 project，不要继续使用旧的 terminal agent 会话。由 daemon 启动的 agent 应该能看到类似值：

```bash
echo "OD_BIN=$OD_BIN"
echo "OD_PROJECT_ID=$OD_PROJECT_ID"
echo "OD_PROJECT_DIR=$OD_PROJECT_DIR"
echo "OD_DAEMON_URL=$OD_DAEMON_URL"
ls -la "$OD_BIN"
```

`OD_DAEMON_URL` 必须是真实 daemon 端口，例如 `http://127.0.0.1:7457`，不能是 `http://127.0.0.1:0`。`:0` 只是在启动时表示“选择空闲端口”的内部提示，不应泄露到 agent 会话。

在 daemon-only 生产模式下，daemon 会直接在 `http://localhost:7456` 提供静态 Next.js export，因此不涉及反向代理。

如果你在 daemon 前面放 nginx，请让 SSE 路由保持无缓冲、无压缩。常见故障是浏览器控制台在 80-90 秒后显示 `net::ERR_INCOMPLETE_CHUNKED_ENCODING 200 (OK)`，原因是 nginx 的 `gzip on` 会缓冲分块 SSE 响应，即便 daemon 已发送 `X-Accel-Buffering: no`。

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:7456;

    proxy_buffering off;
    gzip off;

    proxy_read_timeout 86400s;
    proxy_send_timeout 86400s;
    proxy_http_version 1.1;
    proxy_set_header Connection "";

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 两种执行模式

| 模式 | Picker 值 | 请求如何流转 |
|---|---|---|
| **Local CLI**（daemon 检测到 agent 时的默认模式） | "Local CLI" | Frontend → daemon `/api/chat` → `spawn(<agent>, ...)` → stdout → SSE → artifact parser → preview |
| **API mode**（fallback / 无 CLI） | "Anthropic API" / "OpenAI API" / "Azure OpenAI" / "Google Gemini" | Frontend → daemon `/api/proxy/{provider}/stream` → provider SSE 归一化为 `delta/end/error` → artifact parser → preview |

两种模式都会进入**同一个** `<artifact>` parser 和**同一个**沙箱 iframe。差别只在 transport 和 system-prompt 传递方式：本地 CLI 没有独立 system channel，所以组合后的 prompt 会折入 user message。

## Prompt 组合

每次发送时，应用会从三层构建 system prompt 并发送给 provider：

```
BASE_SYSTEM_PROMPT   （输出契约：用 <artifact> 包裹，不使用 code fences）
   + active design system body  （DESIGN.md，palette/type/layout）
   + active skill body          （SKILL.md，workflow and output rules）
```

在顶部 bar 切换 skill 或 design system 后，下一次发送会使用新的 stack。正文会按 session 缓存在内存中，所以每次选择只需要向 daemon 获取一次。

## 文件结构

```text
open-design/
├── apps/
│   ├── daemon/                # Node/Express，启动本地 agent + 提供 API
│   │   └── src/
│   │       ├── cli.ts             # `od` bin 入口
│   │       ├── server.ts          # /api/* + 静态服务
│   │       ├── agents.ts          # 扫描 PATH 中的 claude/codex/devin/gemini/opencode/cursor-agent/qwen/qoder/copilot
│   │       ├── skills.ts          # SKILL.md loader（frontmatter parser）
│   │       └── design-systems.ts  # DESIGN.md loader
│   │   ├── sidecar/           # tools-dev daemon sidecar wrapper
│   │   └── tests/             # daemon package tests
│   ├── web/                   # Next.js 16 App Router + React client
│       ├── app/               # App Router entrypoints
│       ├── src/               # React + TypeScript client/runtime modules
│       │   ├── App.tsx        # 调度 mode / skill / DS pickers + send
│       │   ├── providers/     # daemon + BYOK API transports
│       │   ├── prompts/       # system、discovery、directions、deck framework
│       │   ├── artifacts/     # streaming <artifact> parser + manifests
│       │   ├── runtime/       # iframe srcdoc、markdown、export helpers
│       │   └── state/         # localStorage + daemon-backed project state
│       ├── sidecar/           # tools-dev web sidecar wrapper
│       └── next.config.ts     # tools-dev rewrites + prod apps/web/out export config
│   └── desktop/               # Electron runtime，由 tools-dev 启动/检查
├── packages/
│   ├── contracts/             # 共享 web/daemon app contracts
│   ├── sidecar-proto/         # Open Design sidecar protocol contract
│   ├── sidecar/               # 通用 sidecar runtime primitives
│   └── platform/              # 通用 process/platform primitives
├── tools/dev/                 # `pnpm tools-dev` lifecycle 和 inspect CLI
├── e2e/                       # Playwright UI + external integration/Vitest harness
├── skills/                    # SKILL.md，来自任意 Claude Code skill repo 的 drop-in
│   ├── web-prototype/         # 通用单屏 prototype（prototype mode 默认）
│   ├── saas-landing/          # marketing page（hero / features / pricing / CTA）
│   ├── dashboard/             # admin / analytics dashboard
│   ├── pricing-page/          # standalone pricing + comparison
│   ├── docs-page/             # 3-column documentation layout
│   ├── blog-post/             # editorial long-form
│   ├── mobile-app/            # phone-frame single screen
│   ├── simple-deck/           # minimal horizontal-swipe deck
│   └── guizang-ppt/           # magazine-web-ppt，bundled deck/PPT default
│       ├── SKILL.md
│       ├── assets/template.html
│       └── references/{themes,layouts,components,checklist}.md
├── design-systems/            # DESIGN.md，9-section schema（awesome-claude-design）
│   ├── default/               # Neutral Modern（starter）
│   ├── warm-editorial/        # Warm Editorial（starter）
│   ├── README.md              # catalog overview
│   └── ...129 systems         # 2 starters · 70 product systems · 57 design skills
├── scripts/sync-design-systems.ts    # 从 upstream getdesign tarball 重新导入
├── docs/                      # product vision + spec
├── .od/                       # runtime data（gitignored，自动创建）
│   ├── app.sqlite              #   projects / conversations / messages / tabs
│   ├── artifacts/              #   one-off "Save to disk" renders
│   └── projects/<id>/          #   per-project working dir + agent cwd
├── pnpm-workspace.yaml        # apps/* + packages/* + tools/* + e2e
└── package.json               # root quality scripts + `od` bin
```

## Troubleshooting

- **`better-sqlite3` 在 Node.js 版本变化后加载失败 / ABI mismatch**：`pnpm install` 会自动重新运行 `postinstall`，并为当前 Node.js 重建 native addon。手动重建或验证修复可运行：`pnpm --filter @open-design/daemon rebuild better-sqlite3`，然后运行 `pnpm --filter @open-design/daemon exec node -e "require('better-sqlite3')"`。需要构建工具：`python3`、`make`、`g++`（或 `clang++`）。如果你的 `.npmrc` 中有 `ignore-scripts=true`，请在 `pnpm install` 后运行 `node scripts/postinstall.mjs`。
- **"no agents found on PATH"**：安装以下任一 CLI：`claude`、`codex`、`devin`、`gemini`、`opencode`、`cursor-agent`、`qwen`、`qodercli`、`copilot`。或者在 Settings 中切换到 API mode 并粘贴 provider key。
- **Claude Code 以 code 1 退出**：Open Design 能启动 `claude`，但非交互 run 在产生响应前失败。请在启动 Open Design 的同一个 shell 或 app 环境中检查：
  ```bash
  claude --version
  claude auth status --text
  printf 'hello' | claude -p --output-format stream-json --verbose --permission-mode bypassPermissions
  ```
  如果 smoke test 报 `401`、`apiKeySource: "none"`，或在无自定义 endpoint 时出现其他 auth 错误，请运行 `claude`、使用 `/login`、退出 Claude 后重试 Open Design。如果你使用多个 Claude profile，请把 **Settings -> Execution mode -> Claude Code config directory** 设为对应 profile 路径，例如 `~/.claude-2`。如果设置了 `ANTHROPIC_BASE_URL` 或代理，请检查 endpoint URL、代理凭据、endpoint auth 环境和 model access；只有在想回到标准 Claude Code auth 时才移除自定义 endpoint。在 Windows 上，原生 PowerShell 与 WSL 使用不同 Claude 安装和 credential store；请在 Open Design 实际使用的同一环境中重新认证，若 `/login` 无法修复 Windows 原生凭据，请检查 Windows Credential Manager。
- **daemon 在 /api/chat 上返回 500**：查看 daemon 终端的 stderr 末尾。通常是 CLI 拒绝了参数。不同 CLI 的 argv 形状不同；需要调整时请看 `apps/daemon/src/agents.ts` 中的 `buildArgs`。
- **media generation 提示 `OD_BIN` 缺失或 daemon URL 是 `:0`**：运行上面的 media dispatcher 检查。不要继续旧 CLI 会话；从 Open Design 应用重新打开 project，让 daemon 注入新的 `OD_*` 变量。
- **Codex 加载过多 plugin context**：用 `OD_CODEX_DISABLE_PLUGINS=1 pnpm tools-dev` 启动 Open Design，让 daemon-spawned Codex 进程带上 `--disable plugins`。
- **artifact 始终不渲染**：模型输出了文本，但没有用 `<artifact>` 包裹。确认 system prompt 已传入（检查 daemon log），并考虑切换到能力更强的 model 或更严格的 skill。
- **macOS 上要求 `Authorization: Bearer <OD_API_TOKEN>`**：Docker Desktop bridge networking 会让 daemon 看到非 loopback 请求。请在 Docker Desktop 中启用 host networking，并使用 `network_mode: host`。参见 [`deploy/README.md` 的 Docker Desktop on macOS 小节](deploy/README.md#docker-desktop-on-macos)。

## 回到产品愿景

本 Quickstart 是 [`docs/`](docs/) 中 spec 的可运行种子。Spec 描述了它的后续演进方向（见 [`docs/roadmap.md`](docs/roadmap.md)）。要点：

- `docs/architecture.md` 描述已交付 stack：前端是 Next.js 16 App Router，本地 daemon 在后方，开发时通过 `apps/web/next.config.ts` rewrite 保持浏览器始终访问同一套 `/api` surface。
- `docs/skills-protocol.md` 描述完整 `od:` frontmatter（typed inputs、sliders、capability gating）。当前 MVP 只读取 `name` / `description` / `triggers` / `od.mode` / `od.design_system.requires`；如需添加其余字段，请扩展 `apps/daemon/src/skills.ts`。
- `docs/agent-adapters.md` 展望更丰富的 dispatch（capability detection、streaming tool-calls）。当前 `apps/daemon/src/agents.ts` 是最小 dispatcher，足以验证链路。
- `docs/modes.md` 列出四种 mode：prototype / deck / template / design-system。我们已为前两种提供 skill；picker 已经按 `mode` 过滤。
