---
name: slack-gif-creator
description: |
  创建为 Slack 优化的 animated GIFs，内置 size constraints validators 和可组合 animation primitives。
triggers:
  - "slack gif"
  - "animated gif"
  - "reaction gif"
  - "tiny gif"
od:
  mode: image
  category: image-generation
  upstream: "https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator"
---

# slack-gif-creator

> 从 Anthropic 官方 skills repository 精选整理。

## 功能

创建为 Slack 优化的 animated GIFs，内置 size constraints validators 和可组合 animation primitives。

## 来源

- Upstream: https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator
- Category: `image-generation`

## 使用方式

这个 catalogue entry 会在 Open Design 中发布该 skill，让 agent 在 planning 阶段发现它。要运行包含原始 assets、scripts 和 references 的完整 upstream workflow，请把 upstream bundle 安装到当前 active agent 的 skills directory：

```bash
# 查看 upstream README 以确认精确路径
open https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator
```

然后要求 agent 按名称（`slack-gif-creator`）调用此 skill，或使用本 skill frontmatter 中列出的任一 trigger phrase。
