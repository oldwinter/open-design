---
name: canvas-design
description: |
  运用 design philosophy 和 aesthetic principles，在 PNG 与 PDF documents 中创作精美 visual art，适合 posters、illustrations 和静态作品。
triggers:
  - "canvas design"
  - "visual art"
  - "poster design"
  - "create poster"
  - "illustration"
  - "海报"
  - "插画"
od:
  mode: image
  category: image-generation
  upstream: "https://github.com/anthropics/skills/tree/main/skills/canvas-design"
---

# canvas-design

> 从 Anthropic 官方 skills repository 精选整理。

## 功能

运用 design philosophy 和 aesthetic principles，在 PNG 与 PDF documents 中创作精美 visual art，适合 posters、illustrations 和静态作品。

## 来源

- Upstream: https://github.com/anthropics/skills/tree/main/skills/canvas-design
- Category: `image-generation`

## 使用方式

这个 catalogue entry 会在 Open Design 中发布该 skill，让 agent 在 planning 阶段发现它。要运行包含原始 assets、scripts 和 references 的完整 upstream workflow，请把 upstream bundle 安装到当前 active agent 的 skills directory：

```bash
# 查看 upstream README 以确认精确路径
open https://github.com/anthropics/skills/tree/main/skills/canvas-design
```

然后要求 agent 按名称（`canvas-design`）调用此 skill，或使用本 skill frontmatter 中列出的任一 trigger phrase。
