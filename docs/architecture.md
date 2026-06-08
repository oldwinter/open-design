# 架构

**父文档：** [`spec.md`](spec.md) · **同级文档：** [`skills-protocol.md`](skills-protocol.md) · [`agent-adapters.md`](agent-adapters.md) · [`modes.md`](modes.md)

本文档描述系统 topology、runtime modes、data flow 和 file layout。设计理由见 [`spec.md`](spec.md)；skills 与 agent adapters 的协议细节分别放在各自文档中。

[ocod]: https://github.com/OpenCoworkAI/open-codesign
[acd]: https://github.com/VoltAgent/awesome-claude-design
[piai]: https://github.com/badlogic/pi-mono/tree/main/packages/ai
[guizang]: https://github.com/op7418/guizang-ppt-skill

---

## 1. 三种部署拓扑

OD 是一个 Web app 加一个本地 daemon。这个拆分让同一套 UI 可以用三种形态运行：

### Topology A — Fully local（默认）

```text
┌────────────────── 用户机器 ──────────────────┐
│                                                    │
│   browser ──► Next.js dev server (localhost:3000)  │
│                       │                            │
│                       │ http://localhost:7456      │
│                       ▼                            │
│            od daemon (Node，长驻进程)              │
│                       │                            │
│                       ▼                            │
│            启动: claude / codex / cursor / …       │
└────────────────────────────────────────────────────┘
```

一条 `pnpm tools-dev run web` 会同时启动 Next.js app 和 daemon。`pnpm tools-dev` 额外启动 desktop shell。零配置，无需账号。

### Topology B — Web on Vercel + daemon on user's machine

```text
browser ──► od.yourdomain.com (Vercel)
              │
              │ ws(s):// user-provided URL (e.g. cloudflared tunnel)
              ▼
        od daemon on user's laptop
              │
              ▼
        spawns: claude / codex / …
```

用户运行 `od daemon --expose`，它会打印一个 tunnel URL；用户把该 URL 粘贴到部署版 Web app 的 “Connect daemon” 页面。Daemon 持有 secrets；Vercel 不持有敏感信息。

### Topology C — Web on Vercel + direct API（无 daemon）

```text
browser ──► od.yourdomain.com (Vercel serverless)
                       │
                       ▼
              Anthropic Messages API (BYOK stored in browser)
```

无本地 CLI、无 daemon。体验降级：没有 Claude Code skills，没有 filesystem artifacts（存入 IndexedDB），没有 PPTX export。但这是 “just try it” 路径。Keys 存在 `localStorage`，并显示明确 warning。

三种 topology 共享同一个 Web bundle；差别只是启用哪些 transports。

## 2. 组件图（逻辑视图）

```text
┌─────────────────────────────── Web App ─────────────────────────────┐
│                                                                     │
│  ┌──────────┐  ┌─────────────┐  ┌───────────┐  ┌────────────────┐  │
│  │ chat 面板│  │ artifact    │  │ preview   │  │ comment /      │  │
│  │          │  │ tree        │  │ iframe    │  │ slider overlay │  │
│  └────┬─────┘  └──────┬──────┘  └─────┬─────┘  └────────┬───────┘  │
│       │               │               │                  │           │
│       └─────────── session bus（内存中）──────────────┘              │
│                        │                                             │
│                        ▼                                             │
│              Transport layer（daemon SSE | api-direct | browser）     │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
  ┌───────────────────────┴────────────────────────────────┐
  │                                                        │
  ▼ (topology A/B)                                         ▼ (topology C)
┌─────────────────────── Daemon ───────────────────────┐  ┌────────────┐
│                                                      │  │ browser-   │
│  session manager      skill registry                 │  │ only       │
│  agent adapter pool   design-system resolver         │  │ runtime    │
│  artifact store       preview compile pipeline       │  │ (limited)  │
│  export pipeline      detection service              │  └────────────┘
│                                                      │
└─┬────────────────────────────────────────────────┬───┘
  │                                                │
  ▼                                                ▼
┌─ agent CLIs ─┐                           ┌─ filesystem ─┐
│ claude       │                           │ ./.od/      │
│ codex        │                           │ ~/.od/      │
│ cursor-agent │                           │ skills/      │
│ gemini       │                           │ DESIGN.md    │
│ opencode     │                           └──────────────┘
│ qwen         │
└──────────────┘
```

## 3. 关键组件

### 3.1 Web app (Next.js 16, App Router)

- **为什么是 Next.js，而不是 Vite SPA？** 我们需要 marketing landing page 的 SSR、Topology C direct-API path 的 serverless routes，以及一等 Vercel deployment。SPA 要做到这些会需要单独 server。
- **State:** UI config 使用 React/browser state；projects/conversations/files 从 daemon APIs hydrate。
- **Iframe preview:** JSX artifacts 使用 vendored React 18 + Babel standalone，沿用 [Open CoDesign][ocod] 的方式。HTML artifacts 直接加载 raw HTML。见 [§5](#5-preview-renderer)。
- **Comment mode:** 点击 preview DOM 上的 `[data-od-id]`，打开 popover，把 `{artifact_id, element_id, note}` 发送给 daemon → agent 获得 surgical edit instruction。
- **Slider UI:** 当 agent 发出 “tweak parameter” tool call（见 [`skills-protocol.md`](skills-protocol.md) §4.2）时，Web app 渲染一个 live-update control，用参数化 prompts 重新发送，不绕 chat。

### 3.2 Local daemon (`od daemon`)

通过 `pkg` 打成单 binary，或通过 npm 分发一层很薄的 Node script。职责：

- 默认监听 `http://localhost:7456`。接受 `/api/*` 下的 REST/SSE routes。
- 为每个 Web tab 维护一个 **session**。Session 持有：active agent、active skill、active artifact、in-flight tool calls、design-system reference。
- 运行 **agent adapter pool**：一个检测到的 CLI = 一个 adapter instance，可跨 sessions 复用。
- 启动时和 FS-watch events 时，扫描并索引来自 `~/.claude/skills/`、`./skills/`、`./.claude/skills/` 的 **skills**。
- 拥有 **artifact store**：把文件写入磁盘，不写入内存。
- 运行 **preview compile pipeline**（JSX 的 Babel transform、HTML exports 的 CSS inliner）。
- 为 HTML/PDF/ZIP 和 skill-defined deck outputs 提供 export hooks。

### 3.3 Agent adapter pool

完整 interface 见 [`agent-adapters.md`](agent-adapters.md)。每个 adapter：

1. **检测**目标 CLI（PATH lookup + config-dir probe）。
2. **启动** CLI，并传入标准 wrapper prompt + skill context + design-system context + CWD（设置为 project artifact root）。
3. **流式转换** stdout/stderr 为 structured events（如果 CLI 支持 JSON Lines 就用它，否则用 line-based parser）。
4. **报告 capabilities**：是否支持 multi-turn？Surgical edits？Native skill loading？Tool use？

### 3.4 Skill registry

见 [`skills-protocol.md`](skills-protocol.md)。扫描三个位置并合并：

| 来源 | 优先级 | 用途 |
|---|---|---|
| `./.claude/skills/` | 最高 | project-private skills |
| `./skills/` | 中 | project-declared skills |
| `~/.claude/skills/` | 最低 | user-global skills |

冲突按 priority 解决（高者胜出）。每个 skill 只解析一次；dev 模式下 watch changes。

### 3.5 Design-system resolver

- 优先查找 `./DESIGN.md`，其次 `./design-system/DESIGN.md`，再查用户配置路径。
- 解析 9-section format（见 [awesome-claude-design][acd] schema）。
- 在每次 agent run 中作为 prepended system message 注入，同时作为 skills 可引用的 `{{ design_system }}` template variable。
- Dev 模式下文件变化时 hot reload。

### 3.6 Artifact store

磁盘上的普通文件。每个 project 使用约定布局：

```text
./.od/
├── config.json                  # project-level daemon config
├── artifacts/
│   ├── 2026-04-24T10-03-12-landing/
│   │   ├── artifact.json        # metadata（skill、mode、prompt、parent）
│   │   ├── index.html           # 主输出（或 .jsx、.md、.pptx.json）
│   │   └── assets/              # skill 生成的图片、字体等
│   └── …
├── history.jsonl                # append-only action log（generations、edits、comments）
└── sessions/
    └── <session-id>.json        # 临时状态；24 小时后垃圾回收
```

理由：

- **Plain files** → 用户可以 `git add ./.od/artifacts/`，并在 PR 中 review designs。
- **`artifact.json` metadata** → OD 无需 DB 也能重建 artifact tree。
- **`history.jsonl` 而非 SQLite** → append-only、git-friendly、可 grep。[Open CoDesign][ocod] 使用 SQLite；我们有意不用。
- **Sessions 与 artifacts 分开** → sessions 是 ephemeral UI state；artifacts 是 durable。

### 3.7 Export pipeline

| 格式 | 实现方式 |
|---|---|
| HTML（自包含） | 内联所有 CSS，并把 asset URL 改写为 data: URIs |
| PDF | `puppeteer` → 对渲染后的 HTML 调用 `page.pdf()` |
| PPTX | `deck-skill` 输出 JSON 中间格式（`slides.json`）；`pptxgenjs` 生成 `.pptx` |
| ZIP | 对 `artifacts/<id>/` 运行 `archiver` |
| Markdown | 如果 artifact 是 `.md` 则直接复制；否则使用 skill-defined render |

## 4. 数据流 — 一次典型的 “generate prototype” turn

```text
1. 用户在 Web chat 中输入 prompt。
2. Web 通过 WS 向 daemon 发送 { method: "session.generate", params: {
        sessionId, prompt, modeHint: "prototype"
   }}。

3. Daemon:
     a. 选择 active skill（prototype-skill）
     b. 加载 design-system（DESIGN.md）
     c. 在 ./.od/artifacts/<slug>/ 下 materialize 新 artifact dir
     d. 调用 agent adapter，传入：
          - system: skill 的 SKILL.md 内容 + DESIGN.md
          - user: 原始 prompt
          - cwd: 新 artifact dir
     e. 随 agent events 到达，stream 回 web：
          - "tool_call" (edit file, write file, read file)
          - "text_delta"
          - "thinking" (if supported)

4. Web 展示：
     - side panel 中持续更新的 tool-call feed
     - 文件 materialize 时更新 artifact tree
     - agent 发出 "done" 后，preview iframe 加载主输出文件
     - preview 加载后激活 slider/comment overlay

5. 完成后，daemon 追加：
     { ts, sessionId, artifactId, action: "generate", skill, promptHash }
   到 history.jsonl。

6. 用户评论某个元素 → web 发送 { method: "session.refine", params: {
        sessionId, artifactId, elementId, note }}

7. Daemon 带着 surgical-edit instruction + note 重新调用 agent。
   Adapter 根据 capabilities 转换：
     - Claude Code → native tool loop，只编辑该区域
     - Codex → 带 "only change element X" constraint 重新生成文件
     - API fallback → 与 Codex path 相同
```

## 5. Preview renderer

**约束：**

- 必须隔离 artifact code 与 host app（不能访问 window、cookies、parent DOM）。
- 必须在 agent 流式写入时 hot-reload。
- 必须同时支持 static HTML 和 JSX artifacts。

**设计：**

- 始终使用 `<iframe sandbox="allow-scripts">`，不加 `allow-same-origin`。
- Static HTML：把 inlined artifact 作为 `srcdoc` 加载。
- JSX：注入小 bootstrap，引入 vendored React 18 + Babel standalone，然后把 JSX 经 Babel transform 后动态 eval。（这就是 [Open CoDesign][ocod] 的做法，而且可行；没有必要重造。）
- Agent 写文件触发 debounced rebuild + iframe `srcdoc` replace。每次 full reload；在这个 scope 下 React state loss 可以接受。

## 6. 配置文件

| 文件 | 用途 |
|---|---|
| `~/.open-design/config.toml` | daemon-global：默认 agent preference、keys（可选，BYOK）、telemetry opt-in（默认 off） |
| `~/.open-design/agents.json` | cached agent detection results |
| `./.od/config.json` | project-local：active design system、preferred skills、preferred mode |
| `./skills/<skill>/SKILL.md` | skill manifest（standard Claude Code format） |
| `./DESIGN.md` | active design system（[awesome-claude-design][acd] format） |

所有 config 都是 plain text / TOML / JSON；没有 binary formats，没有 sqlite。可以在 PR 中 review。

## 7. Web 与 daemon 之间的协议

已发布的 daemon 使用 HTTP routes 加 Server-Sent Events 来 stream chat output。这让浏览器在 dev 和 production 中都使用同一套 `/api/*` surface，同时仍能接收增量 agent output。

代表性 API surface：

```text
GET  /api/health
GET  /api/agents
GET  /api/skills
GET  /api/design-systems
GET  /api/projects
POST /api/projects
POST /api/import/folder                    # 见 Folder import
GET  /api/projects/:id/files
POST /api/projects/:id/upload
POST /api/chat              -> text/event-stream
POST /api/artifacts/save
```

### Folder import

`POST /api/import/folder` 会创建一个 project，其 root 是已有本地文件夹，而不是默认的 `.od/projects/<id>/`。提交的 `baseDir` 存在 `metadata.baseDir`，OD 直接在其中读写；没有 copy，也没有 shadow tree。用户拥有该 workspace，并负责自己的 version control（git、Time Machine 等），这和 Cursor / Claude Code / Aider 的行为一致。

安全性：

- 提交的 `baseDir` 在存储前会通过 `realpath()` canonicalize，因此用户控制的 symlink 无法重定向后续写入。
- 每次写入仍应用标准 `resolveSafe` / `sanitizePath` checks；`metadata.baseDir` 只改变 project root，不改变 bounds check。
- Symlink resolution 后位于 `RUNTIME_DATA_DIR`（daemon 自己的数据目录）内部的 imports 会被拒绝。
- File panel 会隐藏约定 build / install dirs（`node_modules .git dist build .next .nuxt .turbo .cache .output out coverage __pycache__ .venv vendor target .od .tmp`），让 listing 聚焦在 design content。

Request / response types: `@open-design/contracts` 中的 `ImportFolderRequest`、`ImportFolderResponse`。

#### Desktop folder-import auth (PR #974)

Desktop build 添加了 privileged `shell.openPath` IPC bridge，让 “Continue in CLI” / “Finalize design package” 按钮可以在 Finder/Explorer 中 reveal project working directory。为了防止 compromised renderer 通过 project-creation laundering 滥用该 bridge 打开任意本地路径，当 daemon 与 desktop 配对时，`POST /api/import/folder` 前面会加一道 HMAC gate：

- **Trust handshake.** Desktop main-process 启动时，在创建 `BrowserWindow` 之前生成新的 32-byte secret（`randomBytes(32)`），并通过 daemon 的 sidecar IPC（`SIDECAR_MESSAGES.REGISTER_DESKTOP_AUTH`）注册给 daemon。
- **Token shape.** 用户通过 `dialog:pick-and-import` IPC 选择 folder 时，desktop main process 生成 HMAC token `${nonce}~${expISO}~${signatureB64url}`，其中 `signature = HMAC-SHA256(secret, baseDir + "\n" + nonce + "\n" + exp)`。Token 随 `POST /api/import/folder` body 一起放入 `X-OD-Desktop-Import-Token`。字段分隔符是 `~`（不是 `.`），因为 ISO 8601 expiries 自带 `.`，否则会把 token 拆成四段。
- **TTL & replay.** Tokens 是 single-use：daemon 拒绝已消费的 nonces，并在过期时 prune。TTL 为 60s；超过 2× TTL 的 expiries 也会被拒绝，避免 compromised desktop 针对小 TTL contract 生成 long-lived tokens。
- **Fail-closed.** 两个协调机制避免 desktop registration in-flight 或丢失时（daemon restart mid-session、IPC startup race）gate 静默放松：
  - **Sticky in-process flag**：一旦某个 secret 曾注册到此 daemon process，gate 在该 process 剩余生命周期中保持 active（tests 调用 `setDesktopAuthSecret(null)` 不会放松它）。
  - **Orchestrator-pinned mode**：通过 `OD_REQUIRE_DESKTOP_AUTH=1` env var，由 `tools-dev` / `tools-pack` / `apps/packaged` 在 desktop-bundled flow 中 spawn daemon 时设置。设置 env 后，gate 从 request 0 开始 active；renderer 如果抢在 desktop 注册前调用 `/api/import/folder`，会得到 503 `DESKTOP_AUTH_PENDING`（transient，可 retry）。
- **Web-only deployments are unaffected.** 当两个机制都未触发时（standalone daemon spawn、无 env var、从未 paired desktop），gate 保持 dormant，`/api/import/folder` 行为如前。Browser-only builds 没有 `shell.openPath` surface，因此 renderer-named path 无法升级权限。
- **Trusted-picker marker on `openPath`.** 每个通过 HMAC gate 的 import 都会写上 `metadata.fromTrustedPicker: true`。Desktop main process 的 `shell:open-path` IPC 会拒绝缺少此 marker 的 folder-imported projects；即便未来某条 codepath 意外在 trusted flow 外设置了 `metadata.baseDir`，open-path surface 仍保持关闭。`POST /api/projects` 和 `PATCH /api/projects/:id` 拒绝任何 client-supplied `fromTrustedPicker`，因此 marker 不能被 smuggle 或 strip。
- **Legacy migration.** 此 gate 落地前创建的 folder-imported projects 没有 `fromTrustedPicker` flag。这些 project 的 “Continue in CLI” 按钮会返回 error toast；用户需要通过 picker 重新 import 同一 folder，以恢复按钮。
- **Daemon restart edge.** 如果 daemon 在 desktop 仍运行时重启，新 daemon process 会处于 `OD_REQUIRE_DESKTOP_AUTH` mode（orchestrator env 在 restart 后仍存在），但尚未注册 secret，因此 restart 后的第一次 import 返回 `503 DESKTOP_AUTH_PENDING`。Desktop runtime 在 `dialog:pick-and-import` 中捕获该响应，重新触发 registration callback，与新 daemon re-handshake，生成 fresh token（new nonce + new exp，replay protection 仍有效），并 retry 一次。持续失败（daemon 真 down、IPC socket missing）会显示 renderer toast，而不是静默丢弃。不需要重启 desktop。
- **Headless packaged mode.** Headless entrypoint（`apps/packaged/src/headless.ts`）只启动 daemon + web；没有 Electron，没有 `shell.openPath` surface，也没有 desktop main process 可注册 secret。它调用 `startPackagedSidecars(...)` 时传 `requireDesktopAuth: false`，因此该 deployment 中 daemon gate 保持 dormant。Electron entry（`apps/packaged/src/index.ts`）传 `true`，因为它会和 daemon 一起启动 desktop main。
- **tools-dev split-start hardening.** `tools-dev start desktop` 在启动 desktop main 前，会通过 IPC introspect 正在运行的 daemon 的 STATUS。Split-start dev sequence `tools-dev start daemon` → `tools-dev start desktop` 否则会让 daemon 在没有 `OD_REQUIRE_DESKTOP_AUTH=1` 的情况下运行（该 env var 只在 daemon 和 desktop 于同一 orchestrator invocation 中 spawn，或 daemon spawn 时 desktop 已经 alive 时注入）。当 `start desktop` 发现 ungated daemon（新 STATUS field 上 `desktopAuthGateActive: false`）时，tools-dev 会停止 daemon（以及运行中的 web），带 env var 重新 spawn daemon，重启 web，然后才启动 desktop main。用户只会看到一行 `[tools-dev] daemon is running without desktop-auth gate; restarting daemon (and web, if running) before desktop start`；in-flight daemon work 会被中断，但 BrowserWindow 加载前 gate 必定已 armed。Bundled-targets path（`pnpm tools-dev`）不受影响，因为 daemon 已经由 same-invocation trigger 以 gated 方式 spawn，所以 helper 只是一次 STATUS roundtrip，无副作用。Packaged Electron 和 packaged headless modes 不受影响，因为它们的 gate state 在 packaged-runtime startup 时就固定。

共享 API contract types 位于 [`packages/contracts/src`](../packages/contracts/src)。

## 8. 部署

### 本地

```sh
pnpm install
pnpm tools-dev run web       # 启动 daemon + web 前台循环
```

如果 daemon 前面有 reverse proxy，`/api/*` 包含 SSE streams，必须保持 unbuffered。Daemon 会发送 `Cache-Control: no-cache, no-transform` 和 `X-Accel-Buffering: no`，也会发送 SSE comment keepalives；但如果 nginx 启用了 gzip，仍可能破坏 chunked streams。对 nginx，请在 API location 上设置 `proxy_buffering off;`、`gzip off;`，以及较长的 `proxy_read_timeout` / `proxy_send_timeout`。否则长时间 generation 时，浏览器可能报 `net::ERR_INCOMPLETE_CHUNKED_ENCODING 200 (OK)`。

### Docker

```yaml
# docker-compose.yml
services:
  daemon:
    image: openclaudedesign/daemon
    volumes: [ "~/.open-design:/root/.open-design", "./:/workspace" ]
    ports: ["7456:7456"]
  web:
    image: openclaudedesign/web
    ports: ["3000:3000"]
    environment: [ "OD_DAEMON_URL=http://daemon:7456" ]
```

### Vercel + local daemon (Topology B)

```sh
vercel deploy                     # 仅 web
od daemon --expose               # 用户本地运行；打印 tunnel URL
# 用户把 URL 粘贴到 /connect UI
```

### Vercel direct (Topology C)

```sh
vercel deploy                     # 同一个 bundle
# 切换 VERCEL env flag OD_MODE=direct，隐藏 daemon-connect UI
```

## 9. 安全模型

| Surface | 威胁 | 缓解措施 |
|---|---|---|
| Daemon HTTP/SSE API | 任意本地进程与 daemon 通信 | 默认 bind 到 localhost；暴露到机器外前增加 auth/tunnel hardening |
| Artifact code in preview | 从 host 窃取 XSS/cookie | `<iframe sandbox="allow-scripts">`，不加 `allow-same-origin` |
| Agent running on user's machine | Agent 读写 project 外部内容 | Adapter 把 `cwd` 设为 artifact dir；依赖 agent 自己的 permission system（Claude Code 的 `--allowed-tools` 等） |
| User secrets | 泄漏到 cloud | BYOK 只存在 daemon 的 `config.toml`（mode 0600）或 Topology C 中的 browser `localStorage`，绝不发送到 OD 自己的 servers（我们没有） |
| Skill from untrusted source | `~/.claude/skills/` 中有恶意 skill | Install-time warning；skills 在 agent 的 permission model 下运行，不在 OD 自己的权限模型下 |
| Vercel web bundle | 构建被攻破 | 标准 Vercel integrity；bundle 零 secrets |

我们有意继承 agent 的 permission model，而不是发明自己的 sandbox，因为 Claude Code 的 `--permission-mode`、Codex 的 sandboxing、Cursor 的 containment 已经存在并有人维护。

## 10. 性能说明

- Daemon startup: < 500 ms（lazy adapter init）。
- Agent detection: < 200 ms（parallel PATH probes）。
- First generation latency: 主要由 agent model time 决定；OD overhead 应 < 50 ms。
- Preview reload: 对 artifact file writes debounce 100 ms。
- Skill index: 约 50 个 skills 时 cold scan < 100 ms；用 `chokidar` watch。

## 11. MVP 明确不包含的范围

- Multi-user / RBAC / orgs
- Hosted skill marketplace（v1 只支持 git URLs）
- Figma export（post-1.0，与 [Open CoDesign][ocod] 相同）
- Collaborative editing
- Mobile web support（MVP 只支持 desktop）
- Offline mode（除了 “agent is local” 之外，我们不 cache model responses）
