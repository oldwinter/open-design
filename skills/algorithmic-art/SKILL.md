---
name: algorithmic-art
description: |
  使用 p5.js 和 seeded randomness 创作 generative art，让每次 render 都可复现。适合 procedural posters、motion-style stills 和艺术化 frame studies。
triggers:
  - "algorithmic art"
  - "generative art"
  - "p5js"
  - "procedural art"
  - "seeded randomness"
  - "生成艺术"
od:
  mode: image
  category: image-generation
  upstream: "https://github.com/anthropics/skills/tree/main/skills/algorithmic-art"
---

# algorithmic-art

> 从 Anthropic 官方 skills repository 精选整理。

## 功能

使用 p5.js 和 seeded randomness 创作 generative art，让每次 render 都可复现。适合 procedural posters、motion-style stills 和艺术化 frame studies。

## 来源

- Upstream: https://github.com/anthropics/skills/tree/main/skills/algorithmic-art
- Category: `image-generation`

## 使用方式

这个 catalogue entry 会在 Open Design 中发布该 skill，让 agent 在 planning 阶段发现它。要运行包含原始 assets、scripts 和 references 的完整 upstream workflow，请把 upstream bundle 安装到当前 active agent 的 skills directory：

```bash
# 查看 upstream README 以确认精确路径
open https://github.com/anthropics/skills/tree/main/skills/algorithmic-art
```

然后要求 agent 按名称（`algorithmic-art`）调用此 skill，或使用本 skill frontmatter 中列出的任一 trigger phrase。
