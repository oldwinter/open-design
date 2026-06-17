# Azure Container Instances

本指南将 Docker image 部署到 Azure Container Instances（ACI），并使用 persistent Open Design data。选择或记录任何 daemon data mount 前，请阅读根目录 `AGENTS.md` → **Daemon data directory contract**。该 section 是强制要求，且不得在这里重述。

在这个 topology 中，ACI 是 daemon upstream。Browser-facing app URL 必须由经过认证的 TLS reverse proxy 提供；该 proxy 将 traffic 转发到 ACI，在 `/api/*` requests 上注入 daemon bearer token，并发送 `OD_ALLOWED_ORIGINS` 中列出的 browser origin。

## Before You Start

- 已安装并登录 Azure CLI
- 有权限创建 resource group、storage account、file share 和 container group
- 一个 public Docker image，或 ACI 可拉取的 registry 中的 image

## Step 1: Choose Names

```bash
export RESOURCE_GROUP=open-design-aci
export LOCATION=eastus
export DEPLOYMENT_NAME=open-design-aci
export DNS_LABEL=open-design-$RANDOM
export BROWSER_ORIGIN=https://od.example.com
export OD_API_TOKEN="$(openssl rand -hex 32)"
```

DNS label 在 Azure region 内必须唯一。`BROWSER_ORIGIN` 是 trusted proxy 放在 daemon 前面后，用户会打开的 HTTPS origin。API token 是必需的，因为 daemon 在 container 内 bind 到 `0.0.0.0`；请把这个 token 保存在 proxy 或 deployment secrets 中，不要暴露给 browser code。

## Step 2: Create The Resource Group

```bash
az group create \
  --name "$RESOURCE_GROUP" \
  --location "$LOCATION"
```

## Step 3: Deploy The Bicep Template

从 repository root 运行：

```bash
az deployment group create \
  --name "$DEPLOYMENT_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --template-file deploy/azure/container-instance.bicep \
  --parameters \
    location="$LOCATION" \
    dnsNameLabel="$DNS_LABEL" \
    allowedOrigins="$BROWSER_ORIGIN" \
    odApiToken="$OD_API_TOKEN"
```

Template 会创建：

- Azure Storage account
- 用于 persistent daemon storage 的 Azure Files share。选择或记录其 mount 前，必须先阅读根目录 `AGENTS.md` → **Daemon data directory contract**。
- Linux Azure Container Instances container group
- Public upstream DNS name 和 TCP port `7456`
- 针对 `/api/health` 的 liveness probe

## Step 4: Fetch The ACI Upstream

为 reverse proxy 获取 daemon upstream host：

```bash
export ACI_FQDN="$(az deployment group show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$DEPLOYMENT_NAME" \
  --query "properties.outputs.daemonFqdn.value" \
  --output tsv)"
export ACI_UPSTREAM_URL="http://${ACI_FQDN}:7456"
```

不要直接在 browser 中打开这个 URL。Daemon 对 non-loopback `/api/*` requests 要求 `Authorization: Bearer <OD_API_TOKEN>`，而 web UI 不会把该 secret 放入 browser requests。

## Step 5: Put A Trusted Proxy In Front

用会先认证用户的 TLS reverse proxy 提供 `BROWSER_ORIGIN`，再把 traffic 转发到 ACI upstream。Proxy 必须给 API requests 添加 daemon token：

```nginx
upstream open_design_aci {
  server <aci-fqdn>:7456;
}

server {
  listen 443 ssl;
  server_name od.example.com;

  # Add your organization's authentication layer here before proxying.

  location /api/ {
    proxy_set_header Authorization "Bearer <OD_API_TOKEN>";
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_buffering off;
    proxy_cache off;
    proxy_read_timeout 1h;
    proxy_send_timeout 1h;
    gzip off;
    proxy_pass http://open_design_aci;
  }

  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_pass http://open_design_aci;
  }
}
```

将 `<aci-fqdn>` 替换为 `ACI_FQDN`，将 `<OD_API_TOKEN>` 替换为传给 Bicep deployment 的同一个 secret，并保持 `BROWSER_ORIGIN` 等于 proxy 提供的 origin。保留 `/api/` 的 buffering、gzip、HTTP/1.1 和 timeout directives，避免 streamed generation responses 被 nginx 截断。Proxy 配置完成后，在 browser 中打开 `BROWSER_ORIGIN`。

## Optional Parameters

```bash
az deployment group create \
  --name "$DEPLOYMENT_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --template-file deploy/azure/container-instance.bicep \
  --parameters \
    odApiToken="$OD_API_TOKEN" \
    dnsNameLabel="$DNS_LABEL" \
    allowedOrigins="$BROWSER_ORIGIN" \
    image="ghcr.io/nexu-io/od:latest" \
    cpuCores=1 \
    memoryInGB=1 \
    fileShareQuotaGB=10
```

将 `allowedOrigins` 设置为 trusted proxies 提供的 browser origins，多个值用逗号分隔。不支持直接使用 public ACI browser URL，因为 browser API calls 无法安全携带 daemon token。

## Azure DevOps

可将 `deploy/azure/azure-pipelines.yml` 作为起点。

运行前：

- 创建 Azure Resource Manager service connection。
- 将 `OD_API_TOKEN` 设置为 secret pipeline variable。
- 更新 `resourceGroupName`、`location`、`openDesignImage` 和 `browserOrigin`。
- 将 `<your-azure-service-connection>` 替换为你的 service connection name。

## Operations

查看 logs：

```bash
az container logs \
  --resource-group "$RESOURCE_GROUP" \
  --name open-design
```

重启 container group：

```bash
az container restart \
  --resource-group "$RESOURCE_GROUP" \
  --name open-design
```

删除本指南创建的所有 Azure resources：

```bash
az group delete \
  --name "$RESOURCE_GROUP"
```

## Security Notes

- 不要把 raw ACI endpoint 作为 browser-facing app URL 暴露。请把它作为 trusted proxy 的 upstream，或用于 token-authenticated operational checks。
- 保持 `OD_API_TOKEN` secret。Proxy 可以 upstream 使用它，但 browser clients 不能收到它。通过用新值 redeploy 来 rotate。
- 保持 `allowedOrigins` 与 browser-visible proxy origin 对齐；否则 daemon origin guard 会拒绝 browser API requests。
- Azure Files share 会在 container restarts 和 image updates 后保留 project data。
