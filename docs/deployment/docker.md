# Docker and Docker Compose

这是适合初学者的最简单 self-hosting 路径。

## Before You Start

- Docker Desktop 已安装并正在运行
- Internet connection（首次运行会下载 image）

## Step 1: Open the Deploy Folder

```bash
git clone https://github.com/nexu-io/open-design.git
cd open-design/deploy
```

这会：
- 下载项目
- 进入包含 `docker-compose.yml` 的文件夹

## Step 2: Create `.env` and choose an API auth mode

从 tracked template 创建 `deploy/.env`：

```bash
cp .env.example .env
```

如果想使用默认 protected mode，生成一个 token：

```bash
openssl rand -hex 32
```

然后在首次启动前编辑 `.env`，配置其中一种：

- 推荐默认值：把生成的 token 粘贴到 `OD_API_TOKEN=`
- 仅适用于 trusted authenticated reverse proxy：让 `OD_API_TOKEN=` 保持为空，并设置 `OPEN_DESIGN_DISABLE_API_AUTH=1`

如果通过 reverse proxy 暴露 Open Design，还要设置：

```bash
OPEN_DESIGN_ALLOWED_ORIGINS=https://yourdomain.com
```

## Step 3: Start Open Design

```bash
docker-compose up -d
```

预期现象：
- 首次运行 Docker 拉取 image 时可能需要 1-2 分钟
- 应看到 container creation 和 startup messages

## Step 4: Confirm Container Health

```bash
docker-compose ps
```

成功状态类似：
- 列出了 `open-design` container
- `STATUS` 显示 `Up`，最终变为 `healthy`
- Port mapping 包含 `127.0.0.1:7456->7456/tcp`

![Docker Desktop container running](../screenshots/deployment/docker/02-docker-desktop-container-running.png)
![docker-compose ps healthy output (sanitized)](../screenshots/deployment/docker/04-docker-compose-ps-healthy.png)

## Step 5: Verify HTTP Response

```bash
curl -i http://127.0.0.1:7456/
```

成功状态类似：
- HTTP status `200 OK`

![curl HTTP 200 output (sanitized)](../screenshots/deployment/docker/05-curl-http-200-proof.png)

## Step 6: Open Open Design in Your Browser

打开：
- `http://localhost:7456/`

你应该能看到 Open Design 界面。

![Open Design home (desktop)](../screenshots/deployment/docker/01-open-design-home.png)
![Open Design home (mobile)](../screenshots/deployment/docker/03-open-design-mobile.png)

## Common Issues

- `failed to connect to the docker API`：Docker Desktop 尚未运行
- `address already in use`：Port `7456` 被其他进程占用
- `curl: (7) Failed to connect`：container 仍在启动；等待 10-20 秒后重试
- reverse proxy + `OD_API_TOKEN`：要么在 proxy 注入 `Authorization: Bearer <OD_API_TOKEN>`，要么仅当该 proxy 已认证每个请求且 daemon 没有被直接暴露时，设置 `OPEN_DESIGN_DISABLE_API_AUTH=1`。
- macOS 上的 `Authorization: Bearer <OD_API_TOKEN> required`：Docker Desktop bridge networking 会让 daemon 把请求识别为 non-loopback。Host networking 解决办法见 [Docker Desktop on macOS](../../deploy/README.md#docker-desktop-on-macos)。
