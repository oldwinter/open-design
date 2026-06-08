# Docker 部署

这个部署方式把 Open Design 打包为一个基于 Alpine 的单一 runtime image。daemon 同时提供 API 和构建后的 Next.js static export，因此不需要单独的 nginx 容器。

## 本地 compose

启动前：

1. 复制环境配置模板：

   ```bash
   cp .env.example .env
   ```

2. 生成安全 token：

   ```bash
   openssl rand -hex 32
   ```

3. 用编辑器打开 `.env`，找到 `OD_API_TOKEN=`，把生成的 token 粘贴进去。

然后拉取并启动服务：

```bash
OPEN_DESIGN_IMAGE=docker.io/vanjayak/open-design:latest docker compose pull
OPEN_DESIGN_IMAGE=docker.io/vanjayak/open-design:latest docker compose up -d --no-build
```

默认值：

- Host port：`127.0.0.1:7456`（设置 `OPEN_DESIGN_PORT=8080` 可发布到 `127.0.0.1:8080`）
- Runtime data volume：`open_design_data`，挂载到 `/app/.od`
- Node heap cap：`--max-old-space-size=192`
- Compose memory cap：`384m`（设置 `OPEN_DESIGN_MEM_LIMIT=256m` 可覆盖）

不要把 daemon 直接发布到公网或共享 LAN interface。API 对非浏览器客户端没有认证，因此远程部署应让 Compose 绑定 localhost，并在前面放置带认证的 reverse proxy、SSH tunnel 或 VPN。

如果通过带认证的 public IP、domain 或 reverse proxy 暴露服务，请将 `OPEN_DESIGN_ALLOWED_ORIGINS` 设置为允许调用 `/api` 的浏览器 origins：

```bash
OPEN_DESIGN_ALLOWED_ORIGINS=https://od.example.com,http://203.0.113.10:7456 docker compose up -d --no-build
```

如需固定特定已发布 image，请使用 digest 而不是可变的 `latest` tag：

```bash
OPEN_DESIGN_IMAGE=docker.io/vanjayak/open-design@sha256:<digest> docker compose up -d --no-build
```

这个 image 有意不打包 Claude/Codex/Gemini CLI binaries。请把这些 CLI 放在 image 外部；如果服务端部署需要在容器内安装本地 code-agent CLIs，请构建单独的 private runtime layer。

如果你在非特权 Linux 容器内安装 Codex，并且它在创建 `workspace-write` sandbox 时失败，可以为该部署中的所有 Codex runs opt in 到 Codex full-access mode：

```bash
OD_CODEX_SANDBOX=danger-full-access docker compose up -d --no-build
```

只支持精确值 `danger-full-access`；未知值会被忽略。仅在受信任的单用户部署中使用它。它允许 Codex 在没有 workspace-write sandbox 的情况下运行，这在容器 host 阻止 unprivileged user namespaces 时有用，但会让 Codex 进程在容器内拥有更宽的 filesystem access。

## 发布到 Docker Hub

```bash
deploy/scripts/publish-images.sh --image_tag latest
```

常用覆盖项：

```bash
IMAGE_NAMESPACE=your-dockerhub-user deploy/scripts/publish-images.sh --arch arm64
deploy/scripts/publish-images.sh --image docker.io/your-user/open-design:0.1.0
```

脚本默认使用：

- `docker.io/vanjayak/open-design:<tag>`
- `linux/amd64,linux/arm64`
- `skopeo` push strategy，并从 `~/.docker/config.json` 读取 Docker credentials
- 通过 `skopeo` 预加载 base images，减少 Docker Hub pull 抖动

如果 `127.0.0.1:7890` 可用且尚未设置 proxy，脚本会用它访问 registry，并把 `host.docker.internal:7890` 传入 Docker builds。只有需要这个本地 proxy mapping 的 builds 才会添加 host-gateway alias。

### Apple Silicon 的 Colima swap helper

`deploy/scripts/prepare-colima-build-swap.sh` 用于在 Apple Silicon macOS host 上手动发布 Docker image，且 Docker VM 使用 Colima 的场景。这个 helper 刻意只面向 Apple Silicon，因为它覆盖的 failure mode 是：本地 arm64 Colima builds 在准备 multi-arch images 时耗尽较小 Linux VM 的内存。非 macOS 或非 Apple-Silicon host 上，它会在触碰 Colima 前退出。

低内存 Colima VM 在 multi-arch image builds 期间可能耗尽 RAM。Helper 会检查 VM memory 和 swap 状态，仅当 VM 没有 swap 且 RAM 小于 4 GiB 时，才创建并启用临时 swap file。4 GiB threshold 是小 Colima profiles 上短时手动发布的保守默认值；如果更大的 builds 仍然 OOM，可提高 `COLIMA_BUILD_SWAP_MEMORY_THRESHOLD_KIB`；如果你只想给非常小的 VM 开 swap，也可以降低它。

如果你想要一台长期构建机器，优先提高 Colima VM memory（`colima start --memory <GiB>` 或 profile config）。当你只需要一次临时、可逆的内存补强，而不想 resize 或重建 VM 时，再使用这个 helper。

如果 Docker builds 因 out-of-memory 失败，或 `status` 显示一个小 Colima VM 没有 swap，请在手动发布前运行它。Swap 会保持 active 直到 cleanup 或 VM restart，因此一次性 session 建议配合 shell trap：

```bash
deploy/scripts/prepare-colima-build-swap.sh status
deploy/scripts/prepare-colima-build-swap.sh
trap 'deploy/scripts/prepare-colima-build-swap.sh cleanup' EXIT
deploy/scripts/publish-images.sh --image_tag latest
```

常用覆盖项：

```bash
COLIMA_BUILD_SWAP_SIZE=6G deploy/scripts/prepare-colima-build-swap.sh
COLIMA_BUILD_SWAP_MEMORY_THRESHOLD_KIB=6291456 deploy/scripts/prepare-colima-build-swap.sh
COLIMA_BIN=/opt/homebrew/bin/colima deploy/scripts/prepare-colima-build-swap.sh status
COLIMA_BUILD_SWAP_CLEANUP_FORCE=1 COLIMA_BUILD_SWAPFILE=/custom-swapfile deploy/scripts/prepare-colima-build-swap.sh cleanup
```

`cleanup` 会移除默认 helper path 和旧 helper path。如果你设置了自定义 `COLIMA_BUILD_SWAPFILE`，除非同时设置 `COLIMA_BUILD_SWAP_CLEANUP_FORCE=1`，否则 cleanup 会拒绝移除它。

### macOS 上的 Docker Desktop

在 macOS 上运行 Docker Compose 且启用 `OD_API_TOKEN` 时，Docker Desktop bridge networking 可能让 daemon 看到来自非 loopback peer 的 API requests。在这种情况下，Web UI 可能失败并显示：

`Authorization: Bearer <OD_API_TOKEN> required`

解决方法：

1. 在 Docker Desktop 中启用 host networking：
   `Docker Desktop → Settings → Resources → Network → Enable host networking → Apply and restart`

2. 使用 docker-compose.yml 的本地 override：

   ```yaml
   services:
     open-design:
       network_mode: host
       ports: []
   ```

3. 重新创建容器：

   ```bash
   docker compose down
   docker compose up -d --force-recreate
   ```

4. 验证：

   ```bash
   docker inspect open-design --format '{{.HostConfig.NetworkMode}}'
   # host
   ```
