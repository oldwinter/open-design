---
name: clone-audit-mrlv3nl4
description: 审计 clone 或重实现的网站，查找还原度差距、跟踪脚本、来源品牌与语言残留、占位内容和高风险外部依赖。在交付或部署前使用，或在用户要求检查网站 clone 的清理情况与就绪状态时使用。
---

# Clone 审计

审计用户指定的网站 clone workspace，并产出基于证据的部署就绪报告。只检查当前目标；
绝不能复用早期项目或早期 run 的 finding。

## 明确范围

1. 确认目标 root 和预期输出语言。
2. 识别用户提供的 source site、截图、design token 或其他 fidelity reference。如果没有可用
   reference，就把视觉还原度标为“未检查”，不要猜测。
3. 盘点相关 HTML、CSS、JavaScript 或 TypeScript、asset、metadata、configuration 和
   dependency manifest。遵守明确的排除项。
4. 优先做静态检查。未经用户授权，不得执行不受信任的项目代码、安装 package 或发起网络请求。

只把 `references/source-1-CLONE_AUDIT.md` 当作历史 provenance。除非当前目标独立确认，
否则不要把其中的 path、count 或 finding 复制到新审计中。

## 执行检查

检查每个类别，并记录使用的证据：

1. **还原度相关 asset 与 style** — 与用户提供的 reference 对比，查找缺失或被替换的 font
   和 image、损坏的 asset path、错误 color，以及实质不同的 layout 或 style。
2. **跟踪脚本与 pixel** — 查找 analytics、tag manager、advertising pixel、telemetry beacon
   和意外的第三方脚本。
3. **来源品牌残留** — 查找本应替换的来源品牌名、domain、metadata、social link、asset path、
   comment 和 copy。
4. **语言残留** — 查找目标 locale 之外的非预期文本；code identifier 和合理的专有名词除外。
5. **TODO 与 placeholder** — 查找 TODO/FIXME marker、lorem ipsum、template copy、dummy link、
   test credential 和未完成状态。
6. **外部依赖与链接风险** — 检查 remote URL、CDN、localhost 或开发 endpoint、外部 font 和
   media、package download，以及可能失败、泄露数据或违反部署约束的 dependency。

报告 match 前先打开周边上下文。同一 root cause 的重复实例要去重，但必须列出每个受影响文件
或有意义的位置。

## 归类证据

每个 finding 都必须包含：

- severity：`blocker`、`high`、`medium` 或 `low`；
- 可用时提供 repository-relative `file:line`；
- 匹配到的 identifier，或简短且不敏感的 excerpt；
- 影响原因；
- 具体的 recommended action。

必须区分以下状态：

- **已确认 finding** — 有已检查证据直接支持。
- **已检查，未发现问题** — 已检查该类别，未发现问题。
- **未检查 / 无法验证** — 缺少必要的上下文、reference material 或访问权限。

绝不能把未验证的怀疑写成已确认 finding。报告中不得暴露本机 absolute path、secret、
token 或个人数据。

## 生成报告

使用以下结构：

```markdown
# Clone 审计

## 范围与覆盖
- 目标：<可移植的项目标签或仓库相对路径>
- 还原度 reference：<已提供、未提供或不可用>
- 排除项或限制：<具体项目或无>

## Finding
### <类别>
| Severity | 证据 | 影响 | 建议操作 |
| --- | --- | --- | --- |
| <级别> | `<relative/file:line>` — <identifier> | <影响> | <操作> |

## 已检查，未发现问题
- <类别>

## 未检查 / 无法验证
- <类别>：<原因>

## 部署就绪状态
<已就绪、需跟进后就绪或未就绪> — <基于证据的简短原因>
```

若已确认但未解决的 finding 可能破坏部署体验、意外暴露跟踪或敏感数据，或留下实质性的
来源品牌/placeholder 内容，就使用**未就绪**。否则列出跟进项，并说明它们为什么会或不会
阻止部署。
