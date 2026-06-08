---
name: video-downloader
description: |
  从 YouTube 和其他平台下载 videos，用于离线观看、编辑或归档，并支持多种 formats 和 quality options。
triggers:
  - "download video"
  - "youtube download"
  - "archive video"
  - "offline video"
od:
  mode: video
  category: video-generation
  upstream: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/video-downloader"
---

# video-downloader

> Curated from ComposioHQ awesome-claude-skills。

## 功能

从 YouTube 和其他平台下载 videos，用于离线观看、编辑或归档，并支持多种 formats 和 quality options。

## 来源

- Upstream: https://github.com/ComposioHQ/awesome-claude-skills/tree/master/video-downloader
- Category: `video-generation`

## 使用方法

此 catalogue entry 会在 Open Design 中展示该 skill，让 agent 在 planning 阶段发现它。若要运行包含原始 assets、scripts 和 references 的完整 upstream workflow，请把 upstream bundle 安装到当前 active agent 的 skills directory：

```bash
# 查看 upstream README 以确认准确路径
open https://github.com/ComposioHQ/awesome-claude-skills/tree/master/video-downloader
```

然后让 agent 通过名称（`video-downloader`）或本 skill frontmatter 中列出的 trigger phrases 调用它。
