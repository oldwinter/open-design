# Docker deployment

这个部署方式把 Open Design 作为单个 Alpine-based runtime image 发布。daemon 同时提供 API 和构建后的 Next.js static export，因此没有单独的 nginx container。

## Local compose

开始前：

1. 复制环境模板：

   ```bash
   cp .env.example .env
   ```

2. 生成安全 token（推荐方式；除非你的 reverse proxy 会认证每个请求，并同时设置 `OPEN_DESIGN_DISABLE_API_AUTH=1`）：

   ```bash
   openssl rand -hex 32
   ```

3. 用编辑器打开 `.env`，选择一种 auth mode：
   - 默认：把 token 粘贴到 `OD_API_TOKEN=`
   - 已认证每个请求的 trusted reverse proxy：让 `OD_API_TOKEN=` 保持为空，并设置 `OPEN_DESIGN_DISABLE_API_AUTH=1`

然后拉取并启动服务：

```bash
OPEN_DESIGN_IMAGE=ghcr.io/nexu-io/od:latest docker compose pull
OPEN_DESIGN_IMAGE=ghcr.io/nexu-io/od:latest docker compose up -d --no-build
```

使用 `ghcr.io/nexu-io/od:latest` 获取最新 stable image，或用 `ghcr.io/nexu-io/od:<version>` 固定到某个 supported release。

发布到 `ghcr.io/nexu-io/od` 的软件包必须设为公开，匿名 `docker pull`、Docker Compose 和 Dokploy 安装才能正常工作。如果从 GHCR 拉取这个镜像时返回 `authentication required` 或 `pull access denied`，组织维护者必须打开 GitHub -> Packages -> `od` -> Package settings，将可见性改为 Public。GitHub 将容器软件包的可见性修改视为单向操作，因此切换前请确认该软件包应长期保持公开。

默认值：

- Host port：`127.0.0.1:7456`（`OPEN_DESIGN_PORT=8080` 会发布到 `127.0.0.1:8080`）
- Runtime data：在记录、修改或选择 persistent daemon storage 前，必须阅读 root [`AGENTS.md`](../AGENTS.md) → **Daemon data directory contract**。本 README 不得重述它。
- Node heap cap: `--max-old-space-size=192`
- Compose memory cap: `384m` (`OPEN_DESIGN_MEM_LIMIT=256m` to override)

不要把 daemon 直接发布到 public 或 shared LAN interface。API 对 non-browser clients 不做认证，因此 remote deployments 应让 Compose 绑定到 localhost，并在前面放 authenticated reverse proxy、SSH tunnel 或 VPN。

当通过 authenticated public IP、domain 或 reverse proxy 暴露服务时，将 `OPEN_DESIGN_ALLOWED_ORIGINS` 设置为允许调用 `/api` 的精确 browser origins：

```bash
OPEN_DESIGN_ALLOWED_ORIGINS=https://od.example.com,http://203.0.113.10:7456 docker compose up -d --no-build
```

如果 reverse proxy 已经认证每个请求，而你不希望它向 upstream 注入 `Authorization: Bearer <OD_API_TOKEN>`，设置：

```bash
OPEN_DESIGN_DISABLE_API_AUTH=1
```

仅在 daemon 只能通过该 authenticated proxy 访问的 trusted deployments 中使用它。它会对所有 `/api/*` requests 关闭 daemon-side bearer enforcement，因此必须继续阻断对 daemon 的直接访问。这个 Compose variable 会映射到 daemon env `OD_DISABLE_API_AUTH`。

使用 digest 固定到具体 published image，而不是 mutable `latest` tag：

```bash
OPEN_DESIGN_IMAGE=ghcr.io/nexu-io/od@sha256:<digest> docker compose up -d --no-build
```
这个 image 有意不捆绑 Claude/Codex/Gemini CLI binaries。请把它们放在 image 外部；如果 server deployment 需要在 container 中安装本地 code-agent CLIs，请构建单独的 private runtime layer。

## Linux：挂载宿主机 agent CLI

在 Linux 上，可以把宿主机已安装的 agent CLI（Claude Code、opencode、Codex 等）挂载进 container，而无需重新构建 image。Linux 上 `install.sh` 已经会自动加载 override 文件 `docker-compose.linux.yml`；它会切换到 `network_mode: host` 并添加 CLI mounts。

**1. 构建本地 image**（会加入 `libc6-compat`，让链接 glibc 的 CLI 能在 Alpine 上运行）：

```bash
docker build -t open-design-local -f deploy/Dockerfile.local .
```

**2. 让 `.env` 指向本地 image：**

```bash
OPEN_DESIGN_IMAGE=open-design-local
```

**3. 编辑 `docker-compose.linux.yml`**，让其中路径匹配你的 CLI 安装位置，然后启动：

```bash
docker compose -f docker-compose.yml -f docker-compose.linux.yml up -d --no-build
```

常见安装路径：

| CLI | 安装 / 默认路径 |
|-----|------------------|
| Claude Code | `~/.local/bin/claude`（symlink）+ `~/.local/share/claude`（binaries） |
| opencode | `~/.opencode/bin/opencode` |
| Codex | `~/.local/bin/codex` |
| Vela / AMR | npm package `@powerformer/vela-cli`; [Open Design AMR](https://open-design.ai/amr) is the browser account/wallet page |

Vela 以 `@powerformer/vela-cli` npm 包发布。上面的 Open Design AMR URL 不是
shell installer。在 Linux Docker 中，请把 Vela 安装到独立 prefix，以便同时
挂载它的 launcher 和 platform package：

```bash
VELA_PREFIX="$HOME/.local/share/vela"
npm install --global --prefix "$VELA_PREFIX" @powerformer/vela-cli
export PATH="$VELA_PREFIX/bin:$PATH"
which vela
vela --version
```

把完整的 prefix 挂载进 container，再通过 `PATH` 暴露它的 `bin` 目录（或把
`VELA_BIN` 指向 container 内可见的 launcher）：

```yaml
environment:
  PATH: /mnt/host-vela/bin:/mnt/host-local-bin:/mnt/host-opencode:/usr/local/bin:/usr/bin:/bin
  VELA_BIN: /mnt/host-vela/bin/vela
volumes:
  - ${HOME}/.local/share/vela:/mnt/host-vela:ro
```

container 启动后，检查 `PATH` 自动发现结果和显式 Vela override：

```bash
docker compose exec open-design sh -lc 'which vela; echo "$VELA_BIN"'
```

可以二选一：使用能在 `PATH` 中找到的 `vela` launcher，或使用 container 内
真实存在的 `VELA_BIN` 路径。`vela` 能在 `PATH` 中找到时，`VELA_BIN` 可以省略。

daemon 会在启动时自动检测 `PATH` 中可见的 CLI，不需要额外配置。如果某个 CLI
安装在非标准路径，请以只读方式挂载它完整的安装 prefix，并把其 binary 目录放到
`docker-compose.linux.yml` 中 `PATH` 的最前面，然后重启。launcher 是 symlink 时，
只挂载 symlink 所在目录可能会遗漏它的目标。

```bash
docker compose -f docker-compose.yml -f docker-compose.linux.yml up -d --no-build
```

如果即使有 `libc6-compat`，某个 CLI 仍因为 `symbol not found` 或 relocation errors 失败，compose 文件会以 read-only 方式从宿主机挂载 `/lib/x86_64-linux-gnu` 和 `/lib64`，为要求更高的 binaries 提供完整 glibc。这些路径**仅适用于 amd64**；在 arm64 上请替换为 `/lib/aarch64-linux-gnu:/lib/aarch64-linux-gnu:ro`。

**从旧安装升级：**如果你之前用另一个 user 运行 container（例如 `node`，uid 1000），daemon 写入 data volume 前可能需要修正 ownership：

```bash
docker run --rm -v open-design_open_design_data:/data alpine chown -R 1001:1001 /data
```

通过 `.env` 传入 provider API keys：

```bash
DEEPSEEK_API_KEY=sk-…
ANTHROPIC_API_KEY=sk-ant-…
OPENAI_API_KEY=sk-…
```

如果你在非特权 Linux container 中安装 Codex，而它在创建 `workspace-write`
sandbox 时失败，可以为该部署中的所有 Codex run 启用 Codex 的 full-access 模式：

```bash
OD_CODEX_SANDBOX=danger-full-access docker compose up -d --no-build
```

只支持精确值 `danger-full-access`，其他值会被忽略。仅用于可信的单用户部署。
它让 Codex 在没有 workspace-write sandbox 的情况下运行，适用于 container host
阻止非特权 user namespace 的场景，但同时会让 Codex 进程在 container 内获得更广的
filesystem 访问权限。

## 手动发布 image

```bash
deploy/scripts/publish-images.sh --image_tag latest
```

常用 override：

```bash
IMAGE_NAMESPACE=your-ghcr-org deploy/scripts/publish-images.sh --arch arm64
deploy/scripts/publish-images.sh --image ghcr.io/your-org/od:0.1.0
```

脚本默认使用：

- `ghcr.io/nexu-io/od:<tag>`
- `linux/amd64,linux/arm64`
- `skopeo` push strategy with registry credentials read from `~/.docker/config.json`
- 通过 `skopeo` 预加载 base image，减少 Docker Hub 拉取不稳定

如果 `127.0.0.1:7890` 可用且尚未设置 proxy，脚本会用它访问 registry，并把
`host.docker.internal:7890` 传给 Docker build。只有需要这个本地 proxy 映射的
build 才会添加 host-gateway alias。

### Apple Silicon 的 Colima swap helper

`deploy/scripts/prepare-colima-build-swap.sh` 用于从以 Colima 作为 Docker VM 的
Apple Silicon macOS 主机手动发布 Docker image。该 helper 有意只支持 Apple
Silicon，因为它覆盖的故障场景是本地 arm64 Colima build 在准备 multi-arch image
时耗尽小型 Linux VM。在非 macOS 或非 Apple Silicon 主机上，它会在操作 Colima
之前退出。

低内存 Colima VM 在 multi-arch image build 期间可能耗尽 RAM。helper 会检查 VM
内存与 swap 状态，仅在 VM 没有 swap 且 RAM 小于 4 GiB 时创建并启用临时 swap
文件。4 GiB 阈值是小型 Colima profile 上短时手动发布的保守默认值；更大的 build
仍然 OOM 时，提高 `COLIMA_BUILD_SWAP_MEMORY_THRESHOLD_KIB`；如果只想为非常小的
VM 启用 swap，则调低它。

如果希望长期用作 build machine，优先增加 Colima VM 内存（`colima start
--memory <GiB>` 或 profile config）。只有在需要为一次手动发布临时、可回退地
增加资源，又不想调整或重建 VM 时，才使用这个 helper。

如果 Docker build 因 out-of-memory 失败，或 `status` 显示一个小型 Colima VM
且没有 swap，请在手动发布前运行它。swap 会一直生效，直到 cleanup 或 VM 重启，
因此一次性会话建议使用 shell trap：

```bash
deploy/scripts/prepare-colima-build-swap.sh status
deploy/scripts/prepare-colima-build-swap.sh
trap 'deploy/scripts/prepare-colima-build-swap.sh cleanup' EXIT
deploy/scripts/publish-images.sh --image_tag latest
```

常用 override：

```bash
COLIMA_BUILD_SWAP_SIZE=6G deploy/scripts/prepare-colima-build-swap.sh
COLIMA_BUILD_SWAP_MEMORY_THRESHOLD_KIB=6291456 deploy/scripts/prepare-colima-build-swap.sh
COLIMA_BIN=/opt/homebrew/bin/colima deploy/scripts/prepare-colima-build-swap.sh status
COLIMA_BUILD_SWAP_CLEANUP_FORCE=1 COLIMA_BUILD_SWAPFILE=/custom-swapfile deploy/scripts/prepare-colima-build-swap.sh cleanup
```

`cleanup` 会删除默认 helper path 和旧 helper path。如果你设置了自定义
`COLIMA_BUILD_SWAPFILE`，除非同时设置 `COLIMA_BUILD_SWAP_CLEANUP_FORCE=1`，
否则 cleanup 会拒绝删除它。

### Docker Desktop on macOS

在 macOS 上运行 Docker Compose 且启用 `OD_API_TOKEN` 时，Docker Desktop bridge networking 可能让 daemon 把 API requests 识别为 non-loopback peers。此时 Web UI 可能失败并显示：

`Authorization: Bearer <OD_API_TOKEN> required`

解决办法：

1. 在 Docker Desktop 中启用 host networking：
   `Docker Desktop → Settings → Resources → Network → Enable host networking → Apply and restart`

2. 对 `docker-compose.yml` 使用 local override：

   ```yaml
   services:
     open-design:
       network_mode: host
       ports: []
   ```

3. 重建 container：

   ```bash
   docker compose down
   docker compose up -d --force-recreate
   ```

4. 验证：

   ```bash
   docker inspect open-design --format '{{.HostConfig.NetworkMode}}'
   # host
   ```
