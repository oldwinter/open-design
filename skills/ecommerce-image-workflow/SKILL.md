---
name: ecommerce-image-workflow
en_name: "Ecommerce Image Workflow"
description: |
  面向参考商品的电商图片工作流：基于真实商品参考图，生成一组紧凑、
  忠于商品本身的主图、卖点图和生活方式图。V1 要求用户上传商品图片，
  并有意暂缓仅凭 brief 的概念商品生成与按平台批量导出。
triggers:
  - "ecommerce product images"
  - "product image set"
  - "product photography workflow"
  - "product main image"
  - "product feature shot"
  - "reference product commerce images"
  - "lifestyle product image"
  - "amazon product images"
  - "shopify product images"
  - "taobao product images"
od:
  mode: image
  surface: image
  category: image-generation
  scenario: marketing
  preview:
    type: html
    entry: example.html
  design_system:
    requires: false
  example_prompt: |
    Use the Ecommerce Image Workflow to turn my uploaded product reference
    photo into a compact ecommerce image set: one main packshot, one feature
    highlight image, and one lifestyle scene. Preserve the exact product
    identity, color, material, logo placement, structure, and proportions.
---

# Ecommerce Image Workflow

基于真实商品参考图生成一组紧凑的电商图片。这个 V1 skill 刻意收窄范围：只支持 **reference-product mode**。如果用户只描述了商品、没有提供商品照片，请要求用户先上传照片并停止。此版本不要创建仅凭 brief 的概念商品。

## 资源地图

```text
ecommerce-image-workflow/
|-- SKILL.md
|-- example.html
`-- references/
    `-- checklist.md
```

## 这个 skill 会产出什么

默认情况下，为一个商品生成三张电商可用图片：

1. **Main image** - 干净、以商品为主的 packshot，背景为白色或柔和中性色。
2. **Feature image** - 清楚呈现一个卖点，预留可控的标注空间，不依赖图片里很小、难读的文字。
3. **Lifestyle image** - 在可信的使用场景中展示商品，同时保持商品与参考图一致。

同时创建：

- `image-manifest.json`，记录参考输入、slot、prompt、输出、宽高比和保真说明。
- `ecommerce-gallery.html`，作为一个小型预览 gallery，链接生成文件并总结每张图的角色。

## 输入契约

必需：

- 当前项目中至少有一张已上传的商品参考图。

只询问缺失的关键内容：

- 如果商品名称或短标签不明显，再询问。
- 如果无法安全推断 feature image 的主卖点，再询问。
- 只有当用户要求特定平台构图时，才询问目标 marketplace 或宽高比。

不要问宽泛的 discovery 问题。保持工作流继续推进。

## 工作流

### Step 0 - 确认 reference-product mode

规划前，先确认当前项目中包含真实商品参考图。

如果没有商品图，回复：

> Please upload at least one product reference image first. This V1 workflow
> preserves a real product from reference photos; brief-only concept generation
> is deferred to a later version.

然后停止。

### Step 1 - 提取商品身份锚点

检查参考图，并写一段简短的内部 identity lock：

- 商品类别与形态。
- 形状与轮廓。
- 主色与材质。
- Logo、标签、图案、扣件、接口、肩带、把手或其他固定细节。
- 尺度线索与比例。
- 哪些内容绝不能改变。

每个生成 prompt 都要使用这些锚点。

### Step 2 - 制定三 slot 拍摄计划

dispatch 前创建一个紧凑的 shot plan：

| Slot | 默认宽高比 | 目标 |
|---|---:|---|
| main | 1:1 | 白色或柔和中性背景上的商品优先 marketplace 主图 |
| feature | 4:5 | 一个清晰卖点，配近景细节或简单标注空间 |
| lifestyle | 4:5 | 真实使用场景，同时保持商品视觉忠于参考图 |

如果项目 metadata 提供了 `imageAspect`，并且用户希望整组图片使用同一宽高比，就使用它。否则使用上面的 slot 默认值。

### Step 3 - 用 fidelity lock 组合 prompt

每个 prompt 都必须在靠前位置包含这段商品保真指令：

```text
Preserve the exact product identity from the reference image: shape,
silhouette, color, material, logo/label placement, visible construction
details, and proportions. Do not redesign the product. Do not add, remove,
or relocate product features.
```

然后加入各 slot 的专门指令：

#### Main image prompt

- 商品居中且完整可见。
- 白色、米白色或非常浅的灰色背景。
- 柔和棚拍光线，阴影干净。
- 除非用户要求，否则不要加入道具。
- 画面内不要放营销文字。

#### Feature image prompt

- 聚焦用户提供或可安全推断的一个 feature。
- 使用近景构图、cutaway 风格裁切，或为后续设计师添加标签预留干净留白。
- 让商品在画面中保持视觉平衡。如果没有生成明确的 callout 结构，就让商品居中。如果需要标签空间，只能轻微偏移商品，并让空白空间显得有意为之。
- 不要编造认证、性能数字、材质或声明。
- 避免渲染很小的文字；改为预留标签空间。

#### Lifestyle image prompt

- 使用匹配商品类别的真实环境。
- 保持商品为视觉焦点。
- 只有当人物交互有助于解释用途且不会遮挡商品时，才展示人物交互。
- 保持商品尺度与结构。

### Step 4 - 通过 media contract dispatch

使用统一的 Open Design media dispatcher。不要直接调用 provider API 或自定义 model 命令。

每个 slot 都运行标准的 generate/wait 循环：

```bash
# POSIX bash. Do not call provider APIs directly.
out=$("$OD_NODE_BIN" "$OD_BIN" media generate \
  --project "$OD_PROJECT_ID" \
  --surface image \
  --model "<imageModel from metadata>" \
  --aspect "<slot aspect or imageAspect from metadata>" \
  --image "<project-relative product reference image>" \
  --output "<product-slug>-<slot>.png" \
  --prompt "<full slot prompt>")
ec=$?
if [ "$ec" -ne 0 ]; then echo "$out" >&2; exit "$ec"; fi

last=$(printf '%s\n' "$out" | tail -1)
task_id=$(printf '%s\n' "$last" |
  python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('taskId',''))" 2>/dev/null)
since=$(printf '%s\n' "$last" |
  python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('nextSince',0))" 2>/dev/null)
since="${since:-0}"

while [ -n "$task_id" ]; do
  out=$("$OD_NODE_BIN" "$OD_BIN" media wait "$task_id" --since "$since")
  ec=$?
  last=$(printf '%s\n' "$out" | tail -1)
  since=$(printf '%s\n' "$last" |
    python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('nextSince',0))" 2>/dev/null)
  since="${since:-0}"
  if [ "$ec" -eq 0 ]; then
    task_id=""
  elif [ "$ec" -ne 2 ]; then
    echo "$out" >&2
    exit "$ec"
  fi
done

printf '%s\n' "$last"
```

最后一行必须是包含 `{"file": {"name": "...", ...}}` 的 JSON。把每次最终返回的文件名记录到 `image-manifest.json`。

如果当前 image model 或 provider 不能使用 `--image`，请停止并告诉用户：为了保证商品保真，这个工作流需要支持参考图的图片生成路径。

### Step 5 - 写入 `image-manifest.json`

生成完成后，在项目中创建 `image-manifest.json`：

```json
{
  "workflow": "ecommerce-image-workflow",
  "mode": "reference-product",
  "productName": "Example product",
  "referenceImages": ["reference-product.png"],
  "fidelityNotes": [
    "保持商品身份、颜色、材质、结构和比例。",
    "不要在未经人工 review 的情况下，把这些输出视为平台合规证明。"
  ],
  "slots": [
    {
      "id": "main",
      "role": "marketplace packshot",
      "aspect": "1:1",
      "output": "example-product-main.png",
      "promptSummary": "Centered product-first packshot on a clean neutral background."
    },
    {
      "id": "feature",
      "role": "single feature highlight",
      "aspect": "4:5",
      "output": "example-product-feature.png",
      "promptSummary": "Close-up or negative-space composition for one verified selling point."
    },
    {
      "id": "lifestyle",
      "role": "usage context",
      "aspect": "4:5",
      "output": "example-product-lifestyle.png",
      "promptSummary": "Realistic scene with the product as the focal point."
    }
  ]
}
```

manifest 必须诚实。如果某个细节未知，写 `null` 或一句简短说明，不要编造声明。

### Step 6 - 写入 `ecommerce-gallery.html`

创建一个简单的单文件 HTML gallery：

- 首先展示参考图。
- 展示三张生成 slot，并标出各自角色。
- 列出商品保真说明。
- 链接到 `image-manifest.json`。
- 只使用系统字体和项目本地文件；不要引入 CDN。

### Step 7 - 交付

回复中包含：

- 生成的文件名。
- 一句话总结使用的 fidelity lock。
- 提醒用户：marketplace 特定合规、最终文字叠加、声明/法律审查仍需要人工 review。

不要输出 `<artifact>` 标签。

## 硬性规则

- V1 要求真实商品参考图。不要生成仅凭 brief 的概念商品。
- 每次运行只处理一个商品。
- 默认精确生成三个 slot：main、feature、lifestyle。
- 保留商品本体；不要 redesign。
- 不要编造声明、认证、测量值、成分或性能数据。
- 使用 `"$OD_NODE_BIN" "$OD_BIN" media generate`；不要直接调用 provider API。
- 生成后始终创建 `image-manifest.json`。
- 交付前运行 `references/checklist.md`。
