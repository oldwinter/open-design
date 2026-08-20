---
name: webgl-horizontal-parallax
en_name: "Horizontal Parallax Gallery"
zh_name: "横向视差画廊"
description: |
  A horizontal-scroll WebGL gallery (Three.js): frames glide sideways with lerp smoothing and each image parallaxes its texture (UV shift) by its position in the viewport.
en_description: |
  A horizontal-scroll WebGL gallery (Three.js): frames glide sideways with lerp smoothing and each image parallaxes its texture (UV shift) by its position in the viewport.
zh_description: |
  一个横向滚动的 WebGL 画廊（Three.js）：各个画框通过 lerp 平滑横向滑动，每张图像的纹理都会根据其在视口中的位置产生视差（UV 偏移）。
triggers:
  - "horizontal parallax gallery"
  - "webgl gallery"
  - "横向视差画廊"
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

# Horizontal Parallax Gallery

Produce a single self-contained `index.html` — A horizontal-scroll WebGL gallery (Three.js): frames glide sideways with lerp smoothing and each image parallaxes its texture (UV shift) by its position in the viewport.

## Why this is a powered artifact

OpenDesign detects `getContext('webgl2')` / heavy WebGL and renders this file in **powered preview** (a cross-origin-isolated iframe). The full GPU + scroll pipeline runs; no opaque-sandbox workarounds are needed.

## Resource map

```
webgl-horizontal-parallax/
├── SKILL.md          ← you're reading this
├── example.html      ← the complete, working artifact (READ FIRST)
└── (assets, if any)
```

## Credits / attribution

- effect: David Faure / Codrops (MIT)
- imagery: Original (AI-generated)

Keep any bundled LICENSE and on-screen credit intact. Replace imagery only with license-clean assets (original / AI, Lummi.ai, Unsplash/Pexels — never scraped imagery).
