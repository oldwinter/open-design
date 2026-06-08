---
name: docx
description: |
  创建、编辑和分析带 tracked changes、comments 与 formatting 的 Word documents。适合 design briefs、copy docs 和可直接 review 的 deliverables。
triggers:
  - "docx"
  - "word document"
  - "tracked changes"
  - "design brief doc"
  - "copy doc"
od:
  mode: prototype
  category: documents
  upstream: "https://github.com/anthropics/skills/tree/main/skills/docx"
---

# docx

> 从 Anthropic 官方 skills repository 精选整理。

## 功能

创建、编辑和分析带 tracked changes、comments 与 formatting 的 Word documents。适合 design briefs、copy docs 和可直接 review 的 deliverables。

## 来源

- Upstream: https://github.com/anthropics/skills/tree/main/skills/docx
- Category: `documents`

## 使用方式

这个 catalogue entry 会在 Open Design 中发布该 skill，让 agent 在 planning 阶段发现它。要运行包含原始 assets、scripts 和 references 的完整 upstream workflow，请把 upstream bundle 安装到当前 active agent 的 skills directory：

```bash
# 查看 upstream README 以确认精确路径
open https://github.com/anthropics/skills/tree/main/skills/docx
```

然后要求 agent 按名称（`docx`）调用此 skill，或使用本 skill frontmatter 中列出的任一 trigger phrase。
