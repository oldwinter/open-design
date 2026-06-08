---
name: frontend-design
description: |
  创建具有鲜明视觉方向、精致排版、周到布局，并包含可运行 HTML/CSS/JS 或框架代码的生产级前端界面。适用于网站、landing page、仪表盘、React 组件、应用界面和 UI 美化。
triggers:
  - "frontend design"
  - "ui design"
  - "ux design"
  - "web design"
  - "production ui"
  - "landing page"
  - "dashboard design"
  - "react component design"
license: Complete terms in LICENSE.txt
od:
  mode: prototype
  category: web-artifacts
  craft:
    requires: [typography, color, anti-ai-slop]
  design_system:
    requires: true
    sections: [color, typography, layout, components]
  example_prompt: "为财务团队设计并构建一个生产级 SaaS 分析仪表盘，包含真实交互状态、精致排版和鲜明视觉方向。"
  upstream: "https://github.com/anthropics/skills/tree/main/skills/frontend-design"
---

# frontend-design

> 为 Open Design 改编自 Anthropic 官方 `frontend-design` skill。

当用户要求构建或改进前端界面时使用本 skill：网站、landing page、仪表盘、应用界面、HTML/CSS artifact、React/Vue/Svelte 组件，或对现有 UI 做视觉重设计。

目标不只是“变好看”。目标是交付可运行的前端代码：它要有清晰的设计观点、扎实的工艺，并包含足够的产品细节，让结果像是为用户的真实语境专门设计的。

## Workflow

1. 先理解 brief，再选择视觉方向。
   - 识别受众、主要任务、领域和情绪基调。
   - 记录技术约束：框架、现有样式、可访问性、性能、导出目标或响应式要求。
   - 如果 repo 已有 design tokens、组件、截图或 `DESIGN.md`，将其作为 source of truth。

2. 明确承诺一个具体的美学方向。
   - 选择适合产品的方向：强烈极简、editorial、luxury、playful、industrial、retro-futuristic、dense operational、calm enterprise、artful consumer，或其他精确方向。
   - 通过排版、间距、颜色、层级、动效和组件形状把方向落具体。
   - 避免通用 AI 默认值：紫蓝渐变、含糊的 glass cards、可互换的 SaaS 布局、过圆卡片、库存图标行，以及不服务界面的装饰性斑块。

3. 设计真实界面，而不是占位海报。
   - 包含真实用户会期待的控件、empty/loading/error 状态、表格、筛选、导航和响应式行为。
   - 使用诚实内容。如果数据未知，标记为 sample、pending 或 unavailable，不要编造主张。
   - 让目标用户的 workflow 保持高效。仪表盘和工具应便于扫读，并具备足够信息密度以支持重复使用；marketing page 可以更具表达性。

4. 构建生产级前端代码。
   - 优先沿用仓库现有框架、组件约定、图标、tokens 和样式方案。
   - 对 standalone artifacts，除非用户要求框架，否则创建自包含 HTML/CSS/JS。
   - 使用语义化 markup、键盘可访问控件、可见 focus 状态、合理对比度和响应式布局约束。
   - 对重复使用的颜色、间距、阴影和字号层级使用 CSS variables。

5. 打磨视觉工艺。
   - Typography：选择有表达力但可读的字体组合。除非方向本身刻意偏 utilitarian，否则不要把默认系统字体栈当作主要视觉想法。
   - Color：创建角色清晰、平衡的 palette。谨慎且有意地使用 accent color。
   - Layout：有意识地使用对齐、节奏、密度和留白。不要让卡片、面板或标签漂移。
   - Motion：为状态变化、揭示和反馈添加有目的的 transition。出于性能考虑，优先使用 transform 和 opacity。
   - Details：只有在支持概念时才使用纹理、边框、阴影、分隔线、媒体和图标。

6. 最终交付前自查。
   - 界面在 mobile 和 desktop 宽度下都可用。
   - 文本适配容器，不与相邻 UI 重叠。
   - 交互元素具备 hover/focus/active/disabled 状态。
   - 设计避开明显的 AI 生成视觉套路。
   - 结果至少有一个用户关掉页面后仍能描述出来的记忆点。

## Open Design Integration

当 Open Design 提供 active design system 时，把它视为产品的品牌契约。优先使用注入的颜色、排版、布局和组件指导；当 design system 没有覆盖时，再应用本 skill 的前端工艺规则。

当 Open Design 注入 `typography`、`color`、`anti-ai-slop` 等 craft references 时，在完成前应用这些检查。如果用户的品牌指导与通用 craft rule 冲突，以用户品牌指导为准。

## Source

- Upstream: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- Category: `web-artifacts`

## License

本 skill 改编自 Anthropic 官方 skills 仓库。上游 Apache-2.0 license terms 见本文件夹中的 `LICENSE.txt`。
