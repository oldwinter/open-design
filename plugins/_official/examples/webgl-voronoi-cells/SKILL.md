---
name: webgl-voronoi-cells
en_name: "Voronoi Cells"
zh_name: "Voronoi 单元"
description: |
  A self-contained WebGL2 hero: a living Voronoi network with drifting feature points, palette-keyed cells and glowing boundaries; move the cursor to push the cells.
en_description: |
  A self-contained WebGL2 hero: a living Voronoi network with drifting feature points, palette-keyed cells and glowing boundaries; move the cursor to push the cells.
zh_description: |
  一个自包含的 WebGL2 主视觉：由漂移特征点、按调色板着色的单元与发光边界
  构成的动态 Voronoi 网络；移动光标即可推挤这些单元。
triggers:
  - "voronoi cells"
  - "webgl hero"
  - "Voronoi 单元"
  - "沃罗诺伊单元"
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

# Voronoi Cells

Produce a single self-contained `index.html` — A self-contained WebGL2 hero: a living Voronoi network with drifting feature points, palette-keyed cells and glowing boundaries; move the cursor to push the cells.

## Why this is a powered artifact

Open Design detects `getContext('webgl2')` / heavy WebGL and renders this file in **powered preview** (a cross-origin-isolated iframe). The full GPU + scroll pipeline runs; no opaque-sandbox workarounds are needed.

## Resource map

```
webgl-voronoi-cells/
├── SKILL.md          ← you're reading this
├── example.html      ← the complete, working artifact (READ FIRST)
└── (assets, if any)
```

## Credits / attribution

- Original, self-contained (no third-party assets).

Keep any bundled LICENSE and on-screen credit intact. Replace imagery only with license-clean assets (original / AI, Lummi.ai, Unsplash/Pexels — never scraped imagery).
