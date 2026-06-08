---
name: pdf
description: |
  提取文本、创建 PDFs 并处理 forms。适合 press releases、品牌化 one-pagers 和可打印 design deliverables。
triggers:
  - "pdf"
  - "create pdf"
  - "pdf form"
  - "branded pdf"
  - "one pager"
od:
  mode: prototype
  category: documents
  upstream: "https://github.com/anthropics/skills/tree/main/skills/pdf"
---

# pdf

> 从 Anthropic 官方 skills repository 精选整理。

## 功能

提取文本、创建 PDFs 并处理 forms。适合 press releases、品牌化 one-pagers 和可打印 design deliverables。

## 来源

- Upstream: https://github.com/anthropics/skills/tree/main/skills/pdf
- Category: `documents`

## 使用方式

这个 catalogue entry 会在 Open Design 中发布该 skill，让 agent 在 planning 阶段发现它。要运行包含原始 assets、scripts 和 references 的完整 upstream workflow，请把 upstream bundle 安装到当前 active agent 的 skills directory：

```bash
# 查看 upstream README 以确认精确路径
open https://github.com/anthropics/skills/tree/main/skills/pdf
```

然后要求 agent 按名称（`pdf`）调用此 skill，或使用本 skill frontmatter 中列出的任一 trigger phrase。
