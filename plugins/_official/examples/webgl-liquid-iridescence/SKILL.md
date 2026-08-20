---
name: webgl-liquid-iridescence
en_name: "Liquid Iridescence"
zh_name: "液态虹彩"
description: |
  A self-contained WebGL2 hero: a living oil-on-water field brightened into iridescent caustic filaments; move the cursor to bend the flow.
en_description: |
  A self-contained WebGL2 hero: a living oil-on-water field brightened into iridescent caustic filaments; move the cursor to bend the flow.
zh_description: |
  一个自包含的 WebGL2 首屏视觉：鲜活流动的水面油膜场亮起虹彩焦散丝线；移动光标即可改变流动方向。
triggers:
  - "liquid iridescence"
  - "webgl hero"
  - "液态虹彩"
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

# Liquid Iridescence

Produce a single self-contained `index.html` — A self-contained WebGL2 hero: a living oil-on-water field brightened into iridescent caustic filaments; move the cursor to bend the flow.

## Why this is a powered artifact

OpenDesign detects `getContext('webgl2')` / heavy WebGL and renders this file in **powered preview** (a cross-origin-isolated iframe). The full GPU + scroll pipeline runs; no opaque-sandbox workarounds are needed.

## Resource map

```
webgl-liquid-iridescence/
├── SKILL.md          ← you're reading this
├── example.html      ← the complete, working artifact (READ FIRST)
└── (assets, if any)
```

## Credits / attribution

- Original, self-contained (no third-party assets).

Keep any bundled LICENSE and on-screen credit intact. Replace imagery only with license-clean assets (original / AI, Lummi.ai, Unsplash/Pexels — never scraped imagery).
