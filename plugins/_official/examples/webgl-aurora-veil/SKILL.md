---
name: webgl-aurora-veil
en_name: "Aurora Veil"
zh_name: "极光帷幕"
description: |
  A self-contained WebGL2 hero: layered aurora light curtains warped over a night sky scattered with stars; move the cursor to sway the veil.
en_description: |
  A self-contained WebGL2 hero: layered aurora light curtains warped over a night sky scattered with stars; move the cursor to sway the veil.
zh_description: |
  一个自包含的 WebGL2 首屏视觉：层叠的极光光幕在繁星夜空中扭曲流动；移动光标即可让帷幕随之摇曳。
triggers:
  - "aurora veil"
  - "webgl hero"
  - "极光帷幕"
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

# Aurora Veil

Produce a single self-contained `index.html` — A self-contained WebGL2 hero: layered aurora light curtains warped over a night sky scattered with stars; move the cursor to sway the veil.

## Why this is a powered artifact

Open Design detects `getContext('webgl2')` / heavy WebGL and renders this file in **powered preview** (a cross-origin-isolated iframe). The full GPU + scroll pipeline runs; no opaque-sandbox workarounds are needed.

## Resource map

```
webgl-aurora-veil/
├── SKILL.md          ← you're reading this
├── example.html      ← the complete, working artifact (READ FIRST)
└── (assets, if any)
```

## Credits / attribution

- Original, self-contained (no third-party assets).

Keep any bundled LICENSE and on-screen credit intact. Replace imagery only with license-clean assets (original / AI, Lummi.ai, Unsplash/Pexels — never scraped imagery).
