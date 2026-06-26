---
name: od-web-effect-extractor
description: Extract visual effects, animation systems, Canvas/WebGL/Shader behavior, and interaction details from a reference website, then rebuild them as an editable Open Design web artifact.
od:
  scenario: web-effect-extraction
  mode: scenario
---

# Web Effect Extractor

当用户提供网站 URL，并希望 Open Design 复刻、改造或学习其中的视觉特效时，使用这个插件。它特别适合 hero 背景、WebGL 场景、Canvas 动画、shader 效果、光标轨迹、滚动驱动动效、动态字体，以及仅靠截图很难理解的交互模式。

这个工作流受 `lixiaolin94/skills` 中 MIT 许可的 `web-shader-extractor` skill 启发，并针对 Open Design 的网站复刻和可编辑 artifact 工作流做了适配。

## 范围

目标是产出一个忠实且可编辑的 Open Design artifact：保留参考网站的视觉特效与交互逻辑，同时替换私有内容、商标、追踪代码和非必要的应用逻辑。

只提取理解和复刻视觉行为所必需的信息：

- 布局结构、视口行为、断点和构图节奏
- 色彩、字体、混合模式、渐变、纹理、光照和后处理
- 动效时序、缓动、滚动触发、指针响应和空闲动画循环
- Canvas、WebGL、Three.js、shader、粒子和 framebuffer 管线细节
- 为达到视觉一致性所需的公开静态资产，并记录来源

不要复制私有产品文案、隐藏应用状态、用户数据、analytics、认证流程或无关业务逻辑。

## 工作流

### 1. 准备捕获

从用户提供的 URL 开始，明确要复刻的具体效果。如果用户描述模糊，先检查首屏，并推断最可能的目标效果。

在提取运行时细节前，优先使用可执行页面脚本并检查 Canvas/WebGL 状态的浏览器上下文。如果 Chrome DevTools MCP 可用，用它做运行时拦截；如果不可用，则使用当前最强的浏览器自动化能力继续，并明确说明 shader/运行时捕获可能不完整。

记录：

- URL 和捕获时间戳
- 要测试的视口尺寸，通常包含桌面和移动端
- 主要效果目标和 fallback 效果目标
- 从 HTML、网络请求、全局变量和包特征中发现的框架线索

### 2. 运行时检查

先捕获运行时证据，再做任何简化。

检查：

- DOM 树、computed styles、字体、CSS variables、custom properties 和 animation names
- Canvas 元素、WebGL contexts、renderer attributes、supported extensions 和 resolution scaling
- 全局框架标记，例如 `THREE`、`BABYLON`、`__NEXT_DATA__`、`__NUXT__`、`vite`、GSAP、Lenis、Framer Motion 或自定义 scene globals
- 通过网络加载的 JS bundles、图片、视频、字体、LUT、textures、HDRI 和数据文件

当页面存在 WebGL，且工具允许在页面加载前注入代码时，拦截：

- `gl.shaderSource()`，获取 vertex 和 fragment source
- `gl.uniform*()`，获取名称和观测到的值
- `gl.bindFramebuffer()`，理解 multipass render order
- `gl.drawArrays()` 和 `gl.drawElements()`，理解 draw-call order
- 影响最终视觉的 texture 和 buffer setup

当页面存在 2D Canvas 时，检查 render loop、绘制 primitives、图片来源、compositing operations 和 device-pixel-ratio 处理。

### 3. 提取视觉模型

把原始捕获整理成紧凑的视觉模型：

- Scene graph 或 layer stack
- Asset list，包含 source、dimensions 和 role
- Shader/material list，包含 uniforms 和 dependencies
- Motion map，包含 trigger、duration、easing、repeat behavior 和 responsive differences
- Interaction map，覆盖 pointer、keyboard、scroll、resize 和 reduced-motion handling
- 已知不确定项，例如 minified bundle 分支或无法观测到的运行时值

优先使用证据，不要猜测。如果某个效果无法直接观测，请标记为推断。

### 4. 在 Open Design 中重建

创建一个可检查、可编辑的 standalone web artifact。

选择能保留效果的最简单实现：

- 只涉及布局的参考页面使用静态 DOM/CSS
- 简单动效使用 CSS animation 或 WAAPI
- 序列化或滚动联动动效使用 GSAP
- 2D 程序化效果使用 Canvas 2D
- 紧凑的全屏 shader 效果使用原生 WebGL2
- 当参考页面使用 3D、camera、material、texture、post-processing 或 GPGPU 模式时使用 Three.js

除非依赖能实质性降低复杂度，否则保持重建结果自包含。如果使用依赖，以透明、可审查的方式加载。

重要重建规则：

- 保留 color management 和 output color space。
- 保留参考页面的 time base，例如 seconds、elapsed milliseconds、frame count 或 scroll progress。
- 保留 shader 效果的 multipass ordering。
- 不要调随机值来掩盖根因不匹配；修正模型本身。
- 为强烈动效添加 `prefers-reduced-motion` fallback。
- 替换受版权保护或带特定品牌的内容，除非用户明确拥有该内容或要求保留。

### 5. 验证视觉一致性

在相同视口尺寸下打开参考页面和重建 artifact。比较：

- 首屏 framing
- 色彩、亮度、对比度和 blending
- 动效节奏和循环连续性
- 指针和滚动响应
- 移动端行为和性能
- Canvas/WebGL 是否非空渲染

对于 WebGL 和 Canvas 工作，验证 canvas 不是空白，并确认动画会随时间推进。如果可能，在至少两个时间点比较截图或像素样本。

### 6. 交付

最后提供：

- 重建 artifact 的路径或预览 URL
- 简短提取摘要
- 仍然存在的视觉差异
- 资产来源以及被替换的资产说明
- 用户接下来可以安全编辑的内容

如果用户要求提取报告，创建 `EXTRACTION-REPORT.md`，包含 source URL、capture method、visual model、implementation choices、validation notes 和 remaining gaps。

## 质量标准

- artifact 必须能脱离源网站独立运行。
- 主要视觉效果无需解释即可被识别。
- 实现必须足够清晰，便于设计师或工程师继续编辑。
- 工作流必须避免复制无关应用代码。
- 回复必须区分已捕获事实和推断性的重建选择。
