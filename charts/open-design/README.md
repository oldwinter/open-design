<!--- app-name: Open Design -->

## Introduction

此 chart 使用 [Helm](https://helm.sh) package manager，在 [Kubernetes](https://kubernetes.io) cluster 上 bootstrap 一个 [Open Design](https://github.com/nexu-io/open-design) deployment。

## Prerequisites

- Kubernetes 1.23+
- Helm 3.8.0+
- 底层基础设施支持 PV provisioner（如果启用 persistence）

## Installing the Chart

使用 release name `my-release` 安装 chart：

```console
helm install my-release ./charts/open-design
```

这些命令会用默认配置在 Kubernetes cluster 上部署一个 Open Design application。

> **Tip**: 使用 `helm list` 列出所有 releases

### Architecture and Configuration Notes

#### SQLite State & Concurrency Limitations

当前 Open Design runtime 将 state 存储在 `/app/.od` 下的本地文件和 SQLite 中。由于 SQLite 不支持来自多个 network replicas 的并发写入，**此 chart 严格限制为 1 个 replica**。

Horizontal Pod Autoscaling (HPA) 默认禁用。除非你已经修改 application，将 state 外置到 standalone database，否则不要启用 HPA，也不要把 deployment 扩展到 `replicas: 1` 以上。

#### Server-Sent Events (SSE) and Ingress

Open Design 依赖 Server-Sent Events (SSE) 实现 real-time streaming。如果启用 Ingress resource，必须禁用 reverse-proxy buffering。如果你使用 NGINX Ingress Controller，此 chart 默认自动应用所需 annotations：

```yaml
nginx.ingress.kubernetes.io/proxy-buffering: "off"
nginx.ingress.kubernetes.io/proxy-read-timeout: "600"
nginx.ingress.kubernetes.io/proxy-send-timeout: "600"
```

**Path Constraints**: Proxy routing stack 明确**不支持**非 root ingress path prefixes（sub-paths）。Ingress paths 必须配置为 `/`。

#### Authentication Proxy

引入 authentication proxy (NGINX) 作为 application 前置代理。该 proxy 作为 mandatory sidecar container 与 main application 一起运行。Kubernetes Service 将流量路由到 proxy；proxy 负责 API 和 health checks 的 authentication，并将有效请求代理到 application。

#### Security Context

此 chart 遵守严格 security defaults：

- 以 non-root user `1001` 运行。
- 丢弃所有 kernel capabilities（`ALL`）。
- 强制 `readOnlyRootFilesystem`。
- 阻止 privilege escalation。

## Parameters

### 全局与镜像参数

| 名称               | 说明                                      | 默认值                       |
| ------------------ | ----------------------------------------- | ---------------------------- |
| `commonLabels`     | 注入所有 resources 的 custom labels       | `{app.kubernetes.io/environment: production}`  |
| `image.repository` | Open Design image repository              | `vanjayak/open-design`       |
| `image.pullPolicy` | Image pull policy                         | `IfNotPresent`               |
| `image.tag`        | Image tag（覆盖 AppVersion）              | `latest`                     |

### Application 配置

| 名称                   | 说明                                                                                                          | 默认值                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `config.nodeEnv`       | Node.js environment（`production` 或 `development`）                                                           | `production`                         |
| `config.allowedOrigins`| CORS allowed origins。如果 service.type 是 LoadBalancer 或 NodePort，为防止 403 render failures，该项必填。   | `""`                                 |
| `config.publicBaseUrl` | Application 使用的 public base URL（为空时动态派生）                                                          | `""`                                 |
| `config.nodeOptions`   | V8 engine memory 优化                                                                                         | `--max-old-space-size=192`           |
| `config.webPort`       | Web server 监听 port                                                                                          | `7456`                               |
| `config.bindHost`      | Web server 绑定的 host                                                                                        | `"127.0.0.1"`                        |
| `config.apiToken`      | API authentication token（必须从默认值改掉）                                                                  | `"secure-default-token-change-me"`   |

### Auth Proxy 参数

| 名称                                   | 说明                                             | 默认值                                           |
| -------------------------------------- | ------------------------------------------------- | ------------------------------------------------ |
| `authProxy.image`                      | NGINX proxy image                                 | `nginxinc/nginx-unprivileged:1.25-alpine-slim`   |
| `authProxy.port`                       | Container 内部的 proxy server port                | `8080`                                           |
| `authProxy.securityContext`            | Proxy container 的 security context               | `{...}`                                          |

### Health Check 参数

| 名称                                        | 说明                                             | 默认值 |
| ------------------------------------------- | -------------------------------------------------- | ------ |
| `livenessProbe.enabled`                     | 启用 liveness probe                               | `true` |
| `livenessProbe.initialDelaySeconds`         | Liveness probe 的 initial delay seconds           | `20`   |
| `livenessProbe.periodSeconds`               | Liveness probe 的 period seconds                  | `30`   |
| `livenessProbe.timeoutSeconds`              | Liveness probe 的 timeout seconds                 | `5`    |
| `livenessProbe.failureThreshold`            | Liveness probe 的 failure threshold               | `3`    |
| `readinessProbe.enabled`                    | 启用 readiness probe                              | `true` |
| `readinessProbe.initialDelaySeconds`        | Readiness probe 的 initial delay seconds          | `5`    |
| `readinessProbe.periodSeconds`              | Readiness probe 的 period seconds                 | `10`   |
| `readinessProbe.timeoutSeconds`             | Readiness probe 的 timeout seconds                | `5`    |
| `readinessProbe.failureThreshold`           | Readiness probe 的 failure threshold              | `3`    |

### Network 与 Ingress 参数

| 名称                                    | 说明                                                         | 默认值                     |
| --------------------------------------- | ------------------------------------------------------------ | -------------------------- |
| `service.type`                          | Kubernetes Service type                                      | `ClusterIP`                |
| `service.port`                          | Service HTTP port                                            | `80`                       |
| `ingress.enabled`                       | 启用 ingress record generation                               | `false`                    |
| `ingress.className`                     | Ingress class name                                           | `nginx`                    |
| `ingress.annotations`                   | Ingress 的 additional custom annotations（例如 SSE fixes）   | `{...}`                    |
| `ingress.hosts[0].host`                 | Ingress record 的 hostname                                   | `open-design.local`        |
| `ingress.tls`                           | Ingress records 的 TLS configuration                        | `[]`                       |

### Persistence 参数

| 名称                       | 说明                                                         | 默认值          |
| -------------------------- | ------------------------------------------------------------ | --------------- |
| `persistence.enabled`      | 为 SQLite 和 file state 启用 PVC                             | `true`          |
| `persistence.storageClass` | Storage class（留空则使用 cluster default）                  | `""`            |
| `persistence.accessMode`   | PVC Access Mode                                              | `ReadWriteOnce` |
| `persistence.size`         | PVC Storage Request                                          | `10Gi`          |

### Resources 与 Autoscaling 参数

| 名称                                | 说明                                                            | 默认值    |
| ----------------------------------- | --------------------------------------------------------------- | --------- |
| `replicaCount`                      | Application replicas 数量                                       | `1`       |
| `resources.limits.cpu`              | Container 的 CPU limits                                         | `1000m`   |
| `resources.limits.memory`           | Container 的 memory limits                                      | `1024Mi`  |
| `resources.requests.cpu`            | Container 的 CPU requests                                       | `200m`    |
| `resources.requests.memory`         | Container 的 memory requests                                    | `256Mi`   |
| `hpa.enabled`                       | 启用 Horizontal Pod Autoscaler（WARNING: 会破坏 SQLite）       | `false`   |

### Security 与 Scheduling 参数

| 名称                                                              | 说明                                            | 默认值             |
| ----------------------------------------------------------------- | ----------------------------------------------- | ------------------ |
| `podSecurityContext.fsGroupChangePolicy`                          | 设置 filesystem group change policy              | `Always`           |
| `podSecurityContext.sysctls`                                      | 使用 sysctl interface 设置 kernel settings       | `[]`               |
| `podSecurityContext.supplementalGroups`                           | 设置 filesystem extra groups                     | `[]`               |
| `podSecurityContext.fsGroup`                                      | Persistent volume 的 group ID                    | `1001`             |
| `containerSecurityContext.seLinuxOptions`                         | 设置 container 中的 SELinux options                | `{}`               |
| `containerSecurityContext.runAsUser`                              | 以该 UID 运行 application                        | `1001`             |
| `containerSecurityContext.runAsGroup`                             | 以该 GID 运行 application                        | `1001`             |
| `containerSecurityContext.runAsNonRoot`                           | 设置 container 的 Security Context runAsNonRoot   | `true`             |
| `containerSecurityContext.privileged`                             | 设置 container 的 Security Context privileged     | `false`            |
| `containerSecurityContext.readOnlyRootFilesystem`                 | 强制 read-only root FS                            | `true`             |
| `containerSecurityContext.allowPrivilegeEscalation`               | 设置 container 的 Security Context allowPrivilegeEscalation | `false`            |
| `containerSecurityContext.capabilities.drop`                      | 要 drop 的 capabilities 列表                      | `["ALL"]`          |
| `containerSecurityContext.seccompProfile.type`                    | 设置 container 的 Security Context seccomp profile| `"RuntimeDefault"` |
| `nodeSelector`                                                    | Pod assignment 使用的 node labels                  | `{}`               |
| `tolerations`                                                     | Pod assignment 使用的 tolerations                  | `[]`               |
| `affinity`                                                        | Pod assignment 使用的 affinity rules               | `{}`               |
| `initContainers`                                                  | 添加到 pod 的 additional init containers          | `[]`               |
| `sidecars`                                                        | 添加到 pod 的 additional sidecar containers       | `[]`               |

使用 `helm install` 的 `--set key=value[,key=value]` 参数指定每个 parameter。例如：

```console
helm install my-release --set config.nodeEnv=development ./charts/open-design
```

上面的命令会将 Open Design node environment 设置为 `development`。

也可以在安装 chart 时提供一个指定参数值的 YAML 文件。例如：

```console
helm install my-release -f values.yaml ./charts/open-design
```

> **Tip**: 可以使用默认 [values.yaml](values.yaml)
