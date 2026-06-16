# Open Design AWS 部署

本目录包含一个 AWS CloudFormation template（`template.yaml`），用于通过 Amazon Elastic Container Service (ECS) 与 AWS Fargate 将 Open Design 部署到你的 AWS 环境中。

## 架构概览

这个 template 会为 Open Design 配置稳健、容错且安全的架构：

*   **Networking:** 新建一个 Virtual Private Cloud (VPC)，跨两个 Availability Zones，并包含 Public 与 Private subnets。两个独立 NAT Gateways（每个 AZ 一个）提供高可用的出站 internet access。
*   **Load Balancing:** 一个 internet-facing Application Load Balancer (ALB) 路由入站流量。如果提供 custom domain 和 ACM certificate，也可选支持 HTTPS。
*   **Compute:** AWS ECS 在 private subnets 中运行 serverless Fargate instances。为保护基于文件的 SQLite database 免受并发 network write corruption，服务硬编码为单实例 baseline（DesiredCount: 1）。不过它仍使用 multi-AZ networking primitives 实现 Active-Passive fault tolerance：如果某个 task 或 zone 失败，ECS 会自动把 container 重新调度到健康 AZ。Task definition 包含：
    *   **Open Design** app container。
    *   **Nginx Auth Proxy** sidecar container，用于安全地把 Open Design API Token 附加到入站 `/api/` requests。
*   **Storage:** Amazon Elastic File System (EFS) 会挂载到 Fargate containers，用于 persistent daemon storage。记录或修改该 mount 前，必须先阅读根目录 [`AGENTS.md`](../../AGENTS.md) → **Daemon data directory contract**；本 README 不得重述该契约。EFS 配置了 deletion protection（`Retain`），以防意外数据丢失。
*   **Security:**
    *   **Secrets Manager:** 安全存储 Open Design API Token，避免明文暴露。
    *   **Security Groups:** 限制流量流向。ALB 要求显式配置 CIDR；请确保它是你的 VPN 或公司网段，避免意外公网暴露。Fargate 只接受来自 ALB 的流量；EFS 只接受来自 Fargate 的流量。
*   **Logging:** Amazon CloudWatch Log Group 捕获 container logs，方便调试。

## Prerequisites

*   一个 AWS Account。
*   已安装并配置合适权限的 [AWS CLI](https://aws.amazon.com/cli/)。
*   （可选）如果要使用带 HTTPS 的 custom domain，需要 ACM Certificate ARN。

## Parameters

部署 CloudFormation stack 时，可以自定义以下参数：

| Parameter | Description | Default |
| :--- | :--- | :--- |
| `AllowedSourceIp` | **（Required）** 允许访问 Load Balancer 的具体 IPv4 CIDR block。ALB 要求显式配置 CIDR；请确保它是你的 VPN 或公司网段，避免意外公网暴露。接受任何有效 IPv4 range，subnet mask 在 /16 到 /32 之间。 | *None* |
| `ApiToken` | **（Required）** 用于认证 Open Design backend requests 的安全 API token。它会安全存储在 AWS Secrets Manager 中。 |  |
| `DockerImage` | **（Required）** Open Design Docker image 的完整 repository URI 和 tag。必须提供显式 image，因为 public Docker Hub baseline 当前未维护。 | *None* |
| `VpcCidr` | VPC 的 CIDR block。 | `10.42.0.0/16` |
| `PublicSubnet1Cidr` | Public Subnet 1 (AZ1) 的 CIDR block。 | `10.42.1.0/24` |
| `PublicSubnet2Cidr` | Public Subnet 2 (AZ2) 的 CIDR block。 | `10.42.3.0/24` |
| `PrivateSubnet1Cidr` | Private Subnet 1 (AZ1) 的 CIDR block。 | `10.42.2.0/24` |
| `PrivateSubnet2Cidr` | Private Subnet 2 (AZ2) 的 CIDR block。 | `10.42.4.0/24` |
| `TaskSize` | Open Design application 的 compute size。允许值：`small`（256 CPU, 1024 MiB）、`medium`（512 CPU, 2048 MiB）、`large`（1024 CPU, 4096 MiB）。 | `small` |
| `TaskCpuArchitecture` | ECS task 的 CPU architecture。必须与你的 Docker image 架构匹配。允许值（以下拉菜单提供）：`X86_64`、`ARM64`。 | `X86_64` |
| `CustomDomainName` | *（Optional）* 你的 custom domain name（例如 `design.yourcompany.com`）。如果提供，部署后必须手动创建 DNS CNAME/Alias record 指向 ALB。如果留空，则使用默认 ALB DNS name，通过 HTTP 访问。 | *None* |
| `AcmCertificateArn` | *（Optional）* 你的 AWS Certificate Manager (ACM) certificate ARN。如果提供 `CustomDomainName`，则**必填**。 | *None* |
| `ProxyPort` | Nginx proxy 使用并暴露给 Load Balancer 的 dynamic port。必须 >= 1024（unprivileged container）。 | `8080` |
| `AppStoragePath` | Persistent daemon storage path。设置或记录它之前，必须先阅读根目录 [`AGENTS.md`](../../AGENTS.md) → **Daemon data directory contract**。 | 见根目录契约 |

## Deployment

可以通过 AWS Management Console 或 AWS CLI 部署这个 stack。

### 使用 AWS Management Console

1.  登录 AWS Management Console，进入 **CloudFormation** 服务。
2.  点击 **Create stack**，选择 **With new resources (standard)**。
3.  在 **Prerequisite - Prepare template** 下选择 **Template is ready**。
4.  在 **Specify template** 下选择 **Upload a template file**，点击 **Choose file**，并选择本目录中的 `template.yaml`。
5.  点击 **Next**。
6.  输入 **Stack name**（例如 `open-design-stack`）。
7.  按需填写 **Parameters**。注意 `ApiToken`、`AllowedSourceIp` 和 `DockerImage` 为必填。
8.  点击 **Next**。如有需要配置 stack options，然后再次点击 **Next**。
9.  滚动到 review 页面底部，勾选 **I acknowledge that AWS CloudFormation might create IAM resources**，然后点击 **Submit**。

### 使用 AWS CLI

1.  打开 terminal，进入本目录。
2.  运行 `aws cloudformation deploy` 命令，并传入必需参数（`ApiToken`、`AllowedSourceIp` 和 `DockerImage`）：

```bash
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name open-design-stack \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    ApiToken="YOUR_SECURE_API_TOKEN" \
    AllowedSourceIp="YOUR_IP_ADDRESS/32" \
    DockerImage="your-registry/open-design:latest"
```

*Note: 如果想使用带 HTTPS 的 custom domain，请在 `--parameter-overrides` 列表中包含 `CustomDomainName` 和 `AcmCertificateArn` 参数。*

## 访问应用

CloudFormation stack 创建完成后，到 AWS CloudFormation Console 中该 stack 的 **Outputs** tab，查找 `AlbDnsName` 和 `AppUrl`。

**如果没有使用 custom domain：**
直接使用 `AppUrl` 中提供的 HTTP URL 访问 Open Design。

**如果使用了 Custom Domain (HTTPS)：**
你必须创建 DNS record，将流量路由到新的 load balancer。到你的 DNS provider（例如 AWS Route53、Cloudflare）创建 CNAME 或 Alias (A) record，让你的 `CustomDomainName` 指向 `AlbDnsName` output value。DNS 生效后，即可通过自定义 HTTPS domain 安全访问 Open Design。
