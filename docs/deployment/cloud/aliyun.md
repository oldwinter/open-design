# Alibaba Cloud (阿里云) Deployment

本指南面向中国大陆和更广泛亚太地区的用户，说明如何在 Alibaba Cloud 上 self-host Open Design。它记录受支持的部署路径、image-pull optimisations，以及面向公网实例的 ICP filing considerations。

> **Status:** 这是 docs-only guide。下面的流程遵循 Alibaba Cloud 已发布的产品行为，以及现有 [`docs/deployment/docker.md`](../docker.md) 和 [`docs/install-guide.md`](../../install-guide.md) container model。Live ROS templates、one-click scripts 和 verification screenshots 会在 issue #1025 下作为 follow-up 跟踪；欢迎有活跃 Alibaba Cloud 账号的 operators 贡献。

## 为什么选择 Alibaba Cloud？

对中国大陆用户，把 Open Design 部署到 Alibaba Cloud（阿里云）而不是海外 provider，可以获得：

- **更低 latency**：面向中国电信、中国联通、中国移动网络用户。
- **Image acceleration**：通过 Alibaba Cloud Container Registry（容器镜像服务 ACR）加速。大陆直连 Docker Hub 不稳定；ACR mirrors 可以解决。
- **合规公网托管**：面向 `.cn` domain 或指向中国大陆 IP 的 domain，internet-facing service 都需要 ICP filing（备案）。

如果你的用户在中国大陆之外，AWS、GCP 或 Azure 通常更简单。本指南面向大陆使用场景。

## Deployment paths

| Path | Best for | Complexity | Cost shape |
|------|----------|------------|------------|
| **A. ECS（云服务器 ECS）** | Single-machine self-host、小团队、评估 | Low | Pay-as-you-go 或 subscription，按 VM 固定计费 |
| **B. ACK（容器服务 ACK）** | Multi-tenant teams、autoscaling、HA | Medium-High | Cluster + node pool + load balancer |
| **C. ROS（资源编排 ROS）** | Repeatable infra-as-code provisioning | Medium | 与底层 ECS/ACK resources 相同 |

大多数首次部署应从 **Path A（ECS）** 开始。

## Prerequisites

- 一个已验证 payment method 的 Alibaba Cloud account。
- 对中国大陆 regions（例如 `cn-hangzhou`、`cn-shanghai`、`cn-beijing`）：已实名认证的账号。
- 对从中国大陆 region 提供服务的 public domains：该 domain 已完成 [ICP filing](#icp-filing-备案)。
- 如果计划 script provisioning，本地安装 [Alibaba Cloud CLI (`aliyun`)](https://www.alibabacloud.com/help/en/cli)。

## Path A — Deploy to ECS

这条路径会把 Open Design 放在单台 ECS instance 上，使用 [`docs/deployment/docker.md`](../docker.md) 记录的同一套 Docker Compose stack。

### Step 1: Create the ECS instance

使用 Alibaba Cloud console 或 CLI。评估时可以从以下配置开始：

| Setting | Recommended value | Notes |
|---------|------------------|-------|
| Instance type | `ecs.t6-c1m2.large`（2 vCPU / 4 GiB） | 轻量；production 可升级到 `ecs.c7` |
| Image | Ubuntu 24.04 LTS 64-bit | Open Design 的 Docker image 是 `linux/amd64` 和 `linux/arm64` |
| Storage | 40 GiB ESSD | 足够容纳 image、agent CWDs 和 SQLite |
| Network | 带 public IP 或 EIP 的 VPC | 用户需要直接访问 instance 时必需 |
| Security group | Inbound `22/tcp`（仅你的 IP），outbound all | 只在 reverse proxy 后添加 `443/tcp` —— 见 [Network exposure](#network-exposure) |

CLI equivalent（替换 placeholders）：

```bash
aliyun ecs RunInstances \
  --RegionId cn-hangzhou \
  --ImageId ubuntu_24_04_x64_20G_alibase \
  --InstanceType ecs.t6-c1m2.large \
  --SecurityGroupId sg-xxxxxxxx \
  --VSwitchId vsw-xxxxxxxx \
  --InstanceChargeType PostPaid \
  --SystemDisk.Category cloud_essd \
  --SystemDisk.Size 40
```

### Step 2: Install Docker

SSH 进入 instance，安装 Docker Engine 和 Compose plugin：

```bash
# Aliyun's mirrored Docker install script (faster from mainland China than get.docker.com)
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```

登出再登录，使 group change 生效。

### Step 3: Configure image acceleration（镜像加速）

在中国大陆直接从 `docker.io` pull 很慢且间歇失败。配置 ACR 免费 public mirror：

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "registry-mirrors": [
    "https://<your-acr-prefix>.mirror.aliyuncs.com"
  ]
}
EOF
sudo systemctl restart docker
```

在 Alibaba Cloud console 的 **Container Registry → Image Tools → Image Accelerator**（容器镜像服务 → 镜像工具 → 镜像加速器）中获取你的 personal mirror prefix。

### Step 4: Run Open Design

从这里开始，流程与 [`docs/install-guide.md`](../../install-guide.md) 一致：

```bash
git clone https://github.com/nexu-io/open-design.git
cd open-design
bash deploy/scripts/install.sh --non-interactive --port 7456
```

### Step 5: Put a reverse proxy in front

Open Design 按设计 bind 到 `127.0.0.1:7456` —— daemon 永远不会直接暴露到网络。公网访问应在 Nginx 或 Alibaba Cloud SLB / ALB 上终止 TLS，并转发到 `127.0.0.1:7456`。不要在 security group 中直接暴露 port 7456。完整 rationale 见 [`docs/install-guide.md`](../../install-guide.md) 的 network section。

最小 Nginx block：

```nginx
server {
  listen 443 ssl http2;
  server_name design.example.cn;

  ssl_certificate     /etc/letsencrypt/live/design.example.cn/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/design.example.cn/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:7456;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # Forward the bearer token to the daemon. The Compose stack always
    # generates an OD_API_TOKEN and binds the daemon to 0.0.0.0 inside
    # the container, so every /api/* call coming through Nginx must
    # carry Authorization: Bearer <token>. Only /api/health,
    # /api/version, and /api/daemon/status are exempt. The loopback
    # short-circuit in the daemon checks the TCP peer address, not the
    # X-Forwarded-For header, so reverse-proxy traffic never gets the
    # localhost bypass.
    proxy_set_header Authorization "Bearer <OD_API_TOKEN from deploy/.env>";
  }
}
```

将 `deploy/.env` 中的 `OPEN_DESIGN_ALLOWED_ORIGINS` 设置为 public URL，确保 CORS 允许 proxy。上面 Nginx block 引用的 `OD_API_TOKEN` 由 `deploy/scripts/install.sh` 自动生成并写入 `deploy/.env`；复制该值（或把 `proxy_set_header Authorization` 接到 secrets manager），让 proxy 在每个 request 上完成认证。

## Path B — Deploy to ACK

当你需要以下能力时，[Container Service for Kubernetes（容器服务 ACK）](https://www.alibabacloud.com/product/kubernetes) 是正确选择：

- 横向扩展超过单台 VM。
- 跨 availability zones 的 high availability。
- 用于 ops 的标准 Kubernetes tooling（`kubectl`、Helm）。

Open Design 目前还没有 official Helm chart。下面的 minimal manifest 是起点 —— production users 应加固它（resource limits、PodDisruptionBudget、NetworkPolicy、persistent storage class）。

> **Required env for Kubernetes:** daemon 默认 `OD_BIND_HOST=127.0.0.1`，这会让 readiness probe（以及 Service）无法到达 container。要让 Pod 在 cluster 内可达，必须设置 `OD_BIND_HOST=0.0.0.0`；daemon 的 bound-API-token guard 会要求凡是 bind 到 non-loopback interface 时都设置 `OD_API_TOKEN`。下面 manifest 已体现两个 env vars。
>
> 另请注意，daemon 直接读取 `OD_ALLOWED_ORIGINS`。`deploy/.env.example` 中记录的 `OPEN_DESIGN_ALLOWED_ORIGINS` 是 Compose-only alias，由 `deploy/docker-compose.yml` 映射；direct-container ACK path 必须改设 `OD_ALLOWED_ORIGINS`。

先创建 API-token secret：

```bash
# Generate a random token and store it in the cluster
kubectl create secret generic open-design-secrets \
  --from-literal=api-token="$(openssl rand -hex 32)"
```

然后 apply manifest：

```yaml
# open-design.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: open-design
spec:
  replicas: 1  # Open Design uses local SQLite; multi-replica needs shared storage
  selector:
    matchLabels: { app: open-design }
  template:
    metadata:
      labels: { app: open-design }
    spec:
      containers:
        - name: open-design
          image: registry.cn-hangzhou.aliyuncs.com/<your-namespace>/open-design:latest
          ports:
            - containerPort: 7456
          env:
            # Storage env vars are intentionally omitted here.
            # Before setting them, you MUST read root AGENTS.md -> Daemon data directory contract.
            - name: OD_BIND_HOST
              value: "0.0.0.0"            # required so the readinessProbe and Service can reach the daemon
            - name: OD_API_TOKEN
              valueFrom:
                secretKeyRef:
                  name: open-design-secrets
                  key: api-token            # required whenever OD_BIND_HOST is non-loopback
            - name: OD_ALLOWED_ORIGINS
              value: "https://design.example.cn"  # set when fronting with an Ingress; daemon reads OD_*, not OPEN_DESIGN_*
          # Storage volume mounts are intentionally omitted here.
          # Before adding them, you MUST read root AGENTS.md -> Daemon data directory contract.
          readinessProbe:
            httpGet: { path: /api/health, port: 7456 }
            initialDelaySeconds: 10
          resources:
            requests: { cpu: 250m, memory: 384Mi }
            limits:   { cpu: "1",   memory: 768Mi }
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: open-design-data
---
apiVersion: v1
kind: Service
metadata:
  name: open-design
spec:
  type: ClusterIP
  selector: { app: open-design }
  ports:
    - port: 80
      targetPort: 7456
```

用 `kubectl apply -f open-design.yaml` apply。用 Ingress（ACK Pro 预装 NGINX Ingress Controller）和 ACM-issued certificate 放在 Service 前面。设置 `OD_API_TOKEN` 后，来自 non-loopback origins 的每个 `/api/*` request 都必须携带 `Authorization: Bearer <token>` header —— 请把它接入你的 Ingress / proxy auth layer。

> **Note on `replicas: 1`:** 修改 storage paths 或 shared persistent storage 前，必须先阅读根目录 [`AGENTS.md`](../../../AGENTS.md) → **Daemon data directory contract**。没有 shared persistent daemon storage 就运行多个 replicas 会导致 state 分叉。Multi-replica ACK topology 需要 external database；这超出本指南 scope。

## Path C — ROS templates

Resource Orchestration Service（资源编排 ROS）可以 declaratively provision 相同 resources。目前还没有 Open Design first-party ROS template。欢迎有 Alibaba Cloud access 的 operators 作为本指南 follow-up 贡献；自然位置是 `deploy/aliyun/ros/`。

Template 落地前，请把 ROS 视为 advanced infra-as-code，并使用上面的 Path A 或 Path B。

## Image acceleration（镜像加速）

如果你在 ECS setup 阶段还没有配置，请配置 Docker image mirror，让来自 `docker.io` 的 image pulls 走 Alibaba Cloud mirror：

1. 登录 Alibaba Cloud console。
2. 打开 **Container Registry → Image Tools → Image Accelerator**（容器镜像服务 → 镜像工具 → 镜像加速器）。
3. 复制你的 personal accelerator URL（形如 `https://<prefix>.mirror.aliyuncs.com`）。
4. 将其加入 `/etc/docker/daemon.json` 的 `registry-mirrors`，并重启 Docker。

对于 ACK，image acceleration 默认在 cluster node pool 上启用 —— 不需要 per-node config。

## ICP filing（备案）

任何服务只要使用指向中国大陆 IP 的 domain，或提供 `.cn` domain，都必须通过 Ministry of Industry and Information Technology（工信部）完成 ICP filing。跳过它是 hard block —— Alibaba Cloud 会 firewall 未备案 domains 的 HTTP/HTTPS。

| Item | Detail |
|------|--------|
| Who files | Domain owner（个人 or 企业） |
| Where | Alibaba Cloud 的 ICP filing console（备案系统） |
| What you need | Real-name verified Alibaba Cloud account，中国大陆 region 中已购买 ≥ 3 个月的 hosting，有效中国身份证或 business licence，通过 Aliyun ICP app 拍摄的蓝/白背景照片 |
| How long | 通常 7–20 个工作日 |
| Result | 一个必须显示在站点 footer 的 备案号（ICP filing number），例如 `京ICP备XXXXXXX号` |

以下情况**不需要** ICP filing：

- 部署到 Hong Kong、Singapore 或其他非中国大陆 Alibaba Cloud region（这些 regions 的 HTTP/HTTPS 不会被这样 firewall）。
- Service 是 internal（没有 public domain，只通过 VPN 或 private IP 访问）。

很多团队的实用模式：先部署到 **Hong Kong (`cn-hongkong`)** 跳过 ICP，等备案完成且大陆用户 latency 比 time-to-launch 更重要时，再迁移到 mainland region。

## Network exposure

Open Design 的 daemon bind 到 `127.0.0.1:7456`，永远不直接暴露。Public access 必须通过：

1. 终止 TLS 的 reverse proxy（Nginx、Caddy、Alibaba Cloud SLB/ALB）。
2. ICP-filed domain（mainland regions）。
3. 通过 `OPEN_DESIGN_ALLOWED_ORIGINS`（Compose / `deploy/.env` path）或 `OD_ALLOWED_ORIGINS`（direct-container / Kubernetes path）设置 CORS allowlist。

完整 topology 和 reverse-proxy guidance 见 [`docs/install-guide.md`](../../install-guide.md)。

## Common pitfalls

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `docker pull` hangs or times out | 未配置 image acceleration；直接从 `docker.io` pull | 在 `/etc/docker/daemon.json` 中配置 ACR mirror |
| HTTP/HTTPS to your domain is blocked | Mainland region 的 domain 未备案 | 完成 ICP filing，或迁移到非 mainland region（HK/SG） |
| `aliyun ecs RunInstances` fails with "Real-name authentication required" | Account 未实名认证 | 在 account console 中完成 real-name verification |
| ACK pods stuck in `ImagePullBackOff` from a private ACR repo | Cluster 缺少该 namespace 的 pull credentials | 创建 `aliyun-acr-credential-helper` secret，或使用 cluster 的 ACR plugin |
| 200 from `/api/health` but UI fails to load | CORS 拒绝 proxied origin，**或** reverse proxy 未转发 bearer token（Compose 总会生成 `OD_API_TOKEN`；只有 `/api/health`、`/api/version`、`/api/daemon/status` 跳过 auth） | 将 `OPEN_DESIGN_ALLOWED_ORIGINS`（Compose / `deploy/.env`）或 `OD_ALLOWED_ORIGINS`（direct container / ACK）设为 public URL，**并**向 Nginx / SLB upstream config 添加 `proxy_set_header Authorization "Bearer <OD_API_TOKEN>"` |
| ACK Pod stuck in `NotReady`, readiness probe fails | Daemon 默认 `OD_BIND_HOST=127.0.0.1`，kubelet 无法到达 | 在 Pod env 中设置 `OD_BIND_HOST=0.0.0.0` 和 `OD_API_TOKEN`（daemon 拒绝无 token 的 non-loopback binds） |
| SLB health check fails | SLB hit `7456`，但 security group 阻止 intra-VPC | 在 security group 中允许 SLB backend CIDR 访问 `7456/tcp` |

## Follow-up work

本指南刻意保持 docs-only。#1025 下跟踪，欢迎贡献：

- 用于 one-click ECS provisioning 的 first-party ROS template。
- 面向 ACK 的 official Helm chart，带 multi-replica safety（external DB 或 shared volume topology）。
- 等价于 `deploy/scripts/install.sh`、但通过 `aliyun` CLI 指向 ECS 的 end-to-end one-click script。
- English content 稳定后，在 `docs/deployment/cloud/aliyun.zh-CN.md` 添加本文件的 Chinese-language sibling。
- `docs/screenshots/deployment/aliyun/` 下的 verification screenshots，对齐 Docker layout。

## References

- Open Design Docker deployment: [`docs/deployment/docker.md`](../docker.md)
- Open Design one-click installer: [`docs/install-guide.md`](../../install-guide.md)
- Alibaba Cloud ECS docs: <https://www.alibabacloud.com/help/en/ecs>
- Alibaba Cloud ACK docs: <https://www.alibabacloud.com/help/en/ack>
- Alibaba Cloud Container Registry docs: <https://www.alibabacloud.com/help/en/acr>
- ICP filing overview (English): <https://www.alibabacloud.com/help/en/icp-filing>
- ICP filing console (Chinese): <https://beian.aliyun.com>
