---
name: webgl-depth-gallery
en_name: "Depth Gallery"
zh_name: "纵深画廊"
description: |
  A scroll-reactive 3D image gallery in Three.js: Z-stacked images crossfade over per-image mood backgrounds with velocity breath, a glowing cursor trail and an editorial CMYK/RGB/HEX/PMS color card.
en_description: |
  A scroll-reactive 3D image gallery in Three.js: Z-stacked images crossfade over per-image mood backgrounds with velocity breath, a glowing cursor trail and an editorial CMYK/RGB/HEX/PMS color card.
zh_description: |
  一个随滚动响应的 Three.js 3D 图像画廊：沿 Z 轴层叠的图像在各自的氛围背景上交叉渐变，并随滚动速度产生呼吸感，配有发光光标轨迹和编辑风格的 CMYK/RGB/HEX/PMS 色彩卡。
triggers:
  - "depth gallery"
  - "webgl gallery"
  - "纵深画廊"
od:
  mode: prototype
  platform: web
  scenario: design
  preview:
    type: html
    entry: index.html
    reload: debounce-100
  design_system:
    requires: false
  craft:
    requires: [animation-discipline]
---

# Depth Gallery

Produce a single self-contained `index.html` — A scroll-reactive 3D image gallery in Three.js: Z-stacked images crossfade over per-image mood backgrounds with velocity breath, a glowing cursor trail and an editorial CMYK/RGB/HEX/PMS color card.

## Why this is a powered artifact

OpenDesign detects `getContext('webgl2')` / heavy WebGL and renders this file in **powered preview** (a cross-origin-isolated iframe). The full GPU + scroll pipeline runs; no opaque-sandbox workarounds are needed.

## Resource map

```
webgl-depth-gallery/
├── SKILL.md          ← you're reading this
├── example.html      ← the complete, working artifact (READ FIRST)
└── (assets, if any)
```

## Credits / attribution

- effect: Houmahani Kane / Codrops (MIT)
- imagery: Lummi.ai

Keep any bundled LICENSE and on-screen credit intact. Replace imagery only with license-clean assets (original / AI, Lummi.ai, Unsplash/Pexels — never scraped imagery).
