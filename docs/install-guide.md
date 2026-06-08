# One-Click Install Guide

**父文档：** [`spec.md`](spec.md) · **同级文档：** [`self-hosting.md`](self-hosting.md) · [`network-security.md`](network-security.md)

用一条命令在 Linux 或 macOS 上部署 Open Design。Installer 封装了现有 Docker Compose stack，不需要 build step。

## Quick reference

Clone repository 并运行 installer：

```bash
git clone https://github.com/nexu-io/open-design.git
cd open-design
bash deploy/scripts/install.sh
```

## Prerequisites

唯一要求是安装带 Compose plugin 的 Docker。

| Platform | Minimum version | Install |
|----------|----------------|---------|
| Docker Engine | 24.0 | [docs.docker.com/engine/install](https://docs.docker.com/engine/install/) |
| Docker Compose plugin | 2.20 | Docker Desktop 自带；Linux 上可 `apt install docker-compose-plugin` |
| Docker Desktop (macOS/Windows) | 4.25 | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) |

Installer 会检查 Docker，并可在 Ubuntu/Debian、Fedora 和 macOS（通过 Homebrew）上自动安装。使用 `--skip-docker-install` 可跳过此步骤。

> **MCP note:** Docker/Compose 安装会在 container 内运行 daemon。Settings 中显示的 MCP client snippets 目前基于 stdio/local-path，需要 local/source install。Container-friendly MCP transport 会在后续补上。

## Interactive install walkthrough

不带 flags 运行 installer 会启动交互式 wizard：

```text
  ╔══════════════════════════════════════╗
  ║         O P E N   D E S I G N        ║
  ║          One-Click Installer         ║
  ╚══════════════════════════════════════╝

[open-design] OS: Linux ubuntu 24.04 (x86_64)
[open-design] Docker: Docker version 26.1.3, build b72abbb
[open-design] Compose: Docker Compose version v2.27.1

Docker image [docker.io/vanjayak/open-design:latest]:
Port [7456]:
Allowed origins (CORS, comma-separated, or empty) []:
Memory limit [384m]:

[open-design] Pulling image: docker.io/vanjayak/open-design:latest
[open-design] Starting Open Design...
[open-design] Waiting for health check (up to 60s)...
[open-design] Daemon is healthy (200 OK)
```

### 每个 prompt 的含义

| Prompt | Default | Notes |
|--------|---------|-------|
| **Docker image** | `docker.io/vanjayak/open-design:latest` | 可 pin digest 以保证可复现：`docker.io/vanjayak/open-design@sha256:<digest>` |
| **Port** | `7456` | Daemon 监听的端口。必须未被占用。 |
| **Allowed origins** | _(empty)_ | Reverse-proxy setups 的 CORS origins。见 [`network-security.md`](network-security.md)。Localhost-only 使用时留空。 |
| **Memory limit** | `384m` | Container memory cap。大规模 concurrent agent runs 可调高。 |

确认后，installer 会：

1. 写入 `deploy/.env` 文件（若已有则备份）。
2. 运行 `docker compose pull` 拉取 image。
3. 运行 `docker compose up -d --no-build` 启动 container。
4. 轮询 `/api/health` 最多 60 秒，确认 daemon ready。
5. 在 Linux 上：安装 `systemd --user` unit，让 service 在 login 时启动。

## Non-interactive install

用于 CI、headless servers 和 automated provisioning：

```bash
bash deploy/scripts/install.sh --non-interactive [--port 7456] [--image <ref>] [--no-systemd]
```

所有 prompts 都会跳过并使用 defaults。如果未安装 Docker，script 会报错退出，而不是尝试安装。

### All flags

**`install.sh`**

| Flag | Description |
|------|-------------|
| `--non-interactive` | 跳过所有 prompts |
| `--port <n>` | Host port（默认：`7456`） |
| `--image <ref>` | Docker image reference |
| `--skip-docker-install` | 永不尝试安装 Docker |
| `--no-systemd` | 跳过 systemd unit creation |

## Service management

### Linux (systemd)

Installer 会创建一个封装 Docker Compose 的 `systemd --user` unit。不需要 `sudo`。

```bash
# Check status
systemctl --user status open-design

# Start / stop / restart
systemctl --user start open-design
systemctl --user stop open-design
systemctl --user restart open-design

# View logs
journalctl --user -u open-design -f

# Disable auto-start
systemctl --user disable open-design

# Re-enable auto-start
systemctl --user enable open-design
```

如果要跳过 systemd unit creation，给 installer 传 `--no-systemd`。

### macOS (Docker Desktop)

Docker Desktop 管理 container lifecycle。使用 Docker Desktop dashboard 启动、停止或重启 `open-design` container，也可以使用 CLI：

```bash
# Using docker compose directly
docker compose -f deploy/docker-compose.yml start
docker compose -f deploy/docker-compose.yml stop
docker compose -f deploy/docker-compose.yml logs -f
```

## Update

用一条命令拉取最新 image 并重启：

```bash
bash deploy/scripts/update.sh
```

更新到指定 image：

```bash
bash deploy/scripts/update.sh --image=docker.io/vanjayak/open-design@sha256:<digest>
```

Update script 会：
1. 拉取新 image。
2. 用 `docker compose up -d --no-build` 重启 container。
3. 等待 `/api/health` 返回 200。
4. Prune dangling old images。

## Uninstall

```bash
# Remove containers and data
bash deploy/scripts/uninstall.sh

# Remove containers but keep data volume
bash deploy/scripts/uninstall.sh --keep-data
```

Uninstaller 会：
1. 停止并移除 containers（`docker compose down`），然后单独移除 data volume。
2. 在 Linux 上：disable 并移除 systemd unit。
3. 移除 `deploy/.env`。

> **Data:** 默认也会删除 `open_design_data` volume（projects、artifacts、config）。传 `--keep-data` 可保留。之后可手动移除 volume：`docker volume rm open_design_data`。

## Configuration

所有设置都在 `deploy/.env` 中。可以直接编辑，或重新运行 installer 生成。

| Variable | Default | Description |
|----------|---------|-------------|
| `OPEN_DESIGN_IMAGE` | `docker.io/vanjayak/open-design:latest` | 完整 image reference |
| `OPEN_DESIGN_PORT` | `7456` | Host-side port（bound to `127.0.0.1`） |
| `OPEN_DESIGN_ALLOWED_ORIGINS` | _(empty)_ | Reverse-proxy setups 的 CORS origins |
| `OPEN_DESIGN_MEM_LIMIT` | `384m` | Container memory cap |
| `NODE_OPTIONS` | `--max-old-space-size=192` | Container 内的 Node.js heap cap |

Container 始终绑定 `127.0.0.1:<port>:7456` —— daemon 永远不会直接暴露到网络。若要允许 remote access，请在前面放置经过认证的 reverse proxy。见 [`network-security.md`](network-security.md)。

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|-------------|-----|
| `Docker is not installed` | Docker 不在 PATH 上 | 安装 Docker Desktop 或 Docker Engine |
| `Docker daemon is not running` | Docker Desktop 未启动 | 打开 Docker Desktop，或运行 `sudo systemctl start docker` |
| `Port 7456 is already in use` | 该端口上已有其他 service | 用 `--port 8080` 重新运行 |
| Health check times out | Image pull 慢或 daemon 启动慢 | 等待并查看 `docker compose -f deploy/docker-compose.yml logs` |
| `Permission denied` on install.sh | Script 不可执行 | 运行 `chmod +x deploy/scripts/install.sh` |
| systemd unit not created | 找不到 `systemd` | 如果 systemd 可用，不要传 `--no-systemd`；否则用 Docker CLI 管理 |
| `.env` has wrong port after re-install | 旧 backup 未恢复 | 直接编辑 `deploy/.env`，或删除后重新运行 |
| Container exits immediately | Image incompatibility | 查看 `docker compose -f deploy/docker-compose.yml logs` 中的 errors |
| `Authorization: Bearer <OD_API_TOKEN> required` on macOS | Docker Desktop bridge networking | 启用 host networking — 见 [Docker Desktop on macOS](../deploy/README.md#docker-desktop-on-macos) |

## References

- Docker Compose config: [`deploy/docker-compose.yml`](../deploy/docker-compose.yml)
- Environment template: [`deploy/.env.example`](../deploy/.env.example)
- Self-hosting topologies（PM2、systemd native）: [`docs/self-hosting.md`](self-hosting.md)
- Network security and remote access: [`docs/network-security.md`](network-security.md)
