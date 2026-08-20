---
name: webgl-holographic-foil
en_name: "Holographic Foil"
zh_name: "全息箔片"
description: |
  A self-contained WebGL2 hero: thin-film interference over a crushed-foil surface whose palette shifts with the viewing angle; move the cursor to tilt the film.
en_description: |
  A self-contained WebGL2 hero: thin-film interference over a crushed-foil surface whose palette shifts with the viewing angle; move the cursor to tilt the film.
zh_description: |
  一个自包含的 WebGL2 首屏视觉：薄膜干涉覆于褶皱箔片表面，色彩随视角变化；移动光标即可倾斜薄膜。
triggers:
  - "holographic foil"
  - "webgl hero"
  - "全息箔片"
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

# Holographic Foil

Produce a single self-contained `index.html` — A self-contained WebGL2 hero: thin-film interference over a crushed-foil surface whose palette shifts with the viewing angle; move the cursor to tilt the film.

## Why this is a powered artifact

OpenDesign detects `getContext('webgl2')` / heavy WebGL and renders this file in **powered preview** (a cross-origin-isolated iframe). The full GPU + scroll pipeline runs; no opaque-sandbox workarounds are needed.

## Resource map

```
webgl-holographic-foil/
├── SKILL.md          ← you're reading this
├── example.html      ← the complete, working artifact (READ FIRST)
└── (assets, if any)
```

## Credits / attribution

- Original, self-contained (no third-party assets).

Keep any bundled LICENSE and on-screen credit intact. Replace imagery only with license-clean assets (original / AI, Lummi.ai, Unsplash/Pexels — never scraped imagery).
