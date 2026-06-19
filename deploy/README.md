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

If you install Codex inside an unprivileged Linux container and it fails while
creating its `workspace-write` sandbox, opt into Codex's full-access mode for
all Codex runs in that deployment:

```bash
OD_CODEX_SANDBOX=danger-full-access docker compose up -d --no-build
```

Only the exact value `danger-full-access` is supported; unknown values are
ignored. Use this only for trusted, single-user deployments. It lets Codex run
without the workspace-write sandbox, which is useful when the container host
blocks unprivileged user namespaces, but it gives the Codex process broader
filesystem access inside the container.

## Manual image publish override

```bash
deploy/scripts/publish-images.sh --image_tag latest
```

Useful overrides:

```bash
IMAGE_NAMESPACE=your-ghcr-org deploy/scripts/publish-images.sh --arch arm64
deploy/scripts/publish-images.sh --image ghcr.io/your-org/od:0.1.0
```

The script defaults to:

- `ghcr.io/nexu-io/od:<tag>`
- `linux/amd64,linux/arm64`
- `skopeo` push strategy with registry credentials read from `~/.docker/config.json`
- preloading base images through `skopeo` to reduce Docker Hub pull flakiness

If `127.0.0.1:7890` is available and no proxy is already set, the script uses it
for registry access and passes `host.docker.internal:7890` into Docker builds. The
host-gateway alias is only added for builds that need this local proxy mapping.

### Colima swap helper for Apple Silicon

`deploy/scripts/prepare-colima-build-swap.sh` is for manual Docker image
publishing from an Apple Silicon macOS host that uses Colima as the Docker VM.
The helper is intentionally Apple Silicon-only because the failure mode it covers
is local arm64 Colima builds exhausting a small Linux VM while preparing
multi-arch images. It exits before touching Colima on non-macOS or
non-Apple-Silicon hosts.

Low-memory Colima VMs can run out of RAM during multi-arch image builds. The
helper checks the VM memory and swap status, then creates and enables a temporary
swap file only when the VM has no swap and less than 4 GiB of RAM. The 4 GiB
threshold is a conservative default for short-lived manual publishes on small
Colima profiles; raise `COLIMA_BUILD_SWAP_MEMORY_THRESHOLD_KIB` if larger builds
still OOM, or lower it if you only want swap for very small VMs.

Prefer increasing the Colima VM memory (`colima start --memory <GiB>` or the
profile config) when you want a persistent build machine. Use this helper when
you need a temporary, reversible boost for one manual publish without resizing
or recreating the VM.

Run it before a manual publish if Docker builds fail with out-of-memory errors,
or if `status` shows a small Colima VM with no swap. The swap remains active
until cleanup or VM restart, so use a shell trap for one-off sessions:

```bash
deploy/scripts/prepare-colima-build-swap.sh status
deploy/scripts/prepare-colima-build-swap.sh
trap 'deploy/scripts/prepare-colima-build-swap.sh cleanup' EXIT
deploy/scripts/publish-images.sh --image_tag latest
```

Useful overrides:

```bash
COLIMA_BUILD_SWAP_SIZE=6G deploy/scripts/prepare-colima-build-swap.sh
COLIMA_BUILD_SWAP_MEMORY_THRESHOLD_KIB=6291456 deploy/scripts/prepare-colima-build-swap.sh
COLIMA_BIN=/opt/homebrew/bin/colima deploy/scripts/prepare-colima-build-swap.sh status
COLIMA_BUILD_SWAP_CLEANUP_FORCE=1 COLIMA_BUILD_SWAPFILE=/custom-swapfile deploy/scripts/prepare-colima-build-swap.sh cleanup
```

`cleanup` removes the default helper path and the old helper path. If you set a
custom `COLIMA_BUILD_SWAPFILE`, cleanup refuses to remove it unless
`COLIMA_BUILD_SWAP_CLEANUP_FORCE=1` is also set.

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

3. Recreate the container:

   ```bash
   docker compose down
   docker compose up -d --force-recreate
   ```

4. Verify:

   ```bash
   docker inspect open-design --format '{{.HostConfig.NetworkMode}}'
   # host
   ```
