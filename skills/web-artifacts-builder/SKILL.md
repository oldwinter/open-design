---
name: web-artifacts-builder
description: |
  使用 React 和 Tailwind 构建复杂的 claude.ai HTML artifacts。Anthropic 用于交付丰富、可嵌入 artifacts 的参考 workflow。
triggers:
  - "web artifacts"
  - "tailwind artifact"
  - "react artifact"
  - "anthropic artifact"
od:
  mode: prototype
  category: web-artifacts
  upstream: "https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder"
---

# web-artifacts-builder

> Curated from Anthropic 的官方 skills repository。

## 功能

使用 React 和 Tailwind 构建复杂的 claude.ai HTML artifacts。Anthropic 用于交付丰富、可嵌入 artifacts 的参考 workflow。

## 来源

- Upstream: https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder
- Category: `web-artifacts`

## 使用方法

此 catalogue entry 会在 Open Design 中展示该 skill，让 agent 在 planning 阶段发现它。若要运行包含原始 assets、scripts 和 references 的完整 upstream workflow，请把 upstream bundle 安装到当前 active agent 的 skills directory：

```bash
# 查看 upstream README 以确认准确路径
open https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder
```

然后让 agent 通过名称（`web-artifacts-builder`）或本 skill frontmatter 中列出的 trigger phrases 调用它。
