---
name: theme-factory
description: |
  将专业 font 和 color themes 应用于 artifacts，包括 slides、docs、reports 和 HTML landing pages。随附 10 个 pre-set themes。
triggers:
  - "theme factory"
  - "apply theme"
  - "design theme"
  - "theme generator"
  - "preset theme"
od:
  mode: design-system
  category: design-systems
  upstream: "https://github.com/anthropics/skills/tree/main/skills/theme-factory"
---

# theme-factory

> 从 Anthropic 官方 skills repository 精选整理。

## 功能

将专业 font 和 color themes 应用于 artifacts，包括 slides、docs、reports 和 HTML landing pages。随附 10 个 pre-set themes。

## 来源

- Upstream: https://github.com/anthropics/skills/tree/main/skills/theme-factory
- Category: `design-systems`

## 使用方式

这个 catalogue entry 会在 Open Design 中发布该 skill，让 agent 在 planning 阶段发现它。要运行包含原始 assets、scripts 和 references 的完整 upstream workflow，请把 upstream bundle 安装到当前 active agent 的 skills directory：

```bash
# 查看 upstream README 以确认精确路径
open https://github.com/anthropics/skills/tree/main/skills/theme-factory
```

然后要求 agent 按名称（`theme-factory`）调用此 skill，或使用本 skill frontmatter 中列出的任一 trigger phrase。
