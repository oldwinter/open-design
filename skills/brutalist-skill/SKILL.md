---
name: industrial-brutalist-ui
description: |
  将 Swiss typographic print 与 military terminal aesthetics 融合的粗粝机械界面。Rigid grids、极端 type scale contrast、utilitarian color、analog degradation effects。适用于需要呈现 declassified blueprints 气质的 data-heavy dashboards、portfolios 或 editorial sites。
triggers:
  - "industrial brutalist UI"
  - "tactical telemetry"
  - "swiss industrial"
  - "brutalist interface"
od:
  mode: prototype
  surface: web
  platform: desktop
  scenario: design
  category: creative-direction
  upstream: "https://github.com/Leonxlnx/taste-skill"
  preview:
    type: html
  design_system:
    requires: true
  craft:
    requires:
      - typography
      - color
  example_prompt: |
    创建一个 industrial-brutalist interface，包含 rigid grids、tactical telemetry motifs、strong typography 和 mechanical precision。
---


# Skill: Industrial Brutalism & Tactical Telemetry UI

## 1. Skill Meta
**Name:** Industrial Brutalism & Tactical Telemetry Interface Engineering
**Description:** 用于架构 web interfaces 的高级能力：融合 mid-century Swiss Typographic design、industrial manufacturing manuals，以及 retro-futuristic aerospace/military terminal interfaces。此风格要求完全掌握 rigid modular grids、极端 typographic scale contrast、纯 utilitarian color palettes，以及 analog degradation（halftones、CRT scanlines、bitmap dithering）的程序化模拟。目标是构建能投射 raw functionality、mechanical precision 和 high data density 的 digital environments，并刻意舍弃 conventional consumer UI patterns。

## 2. Visual Archetypes
design system 通过合并两个不同但高度兼容的 visual paradigms 运作。**每个 project 选择一种，并坚持到底。不要在同一 interface 中交替或混合两种 modes。**

### 2.1 Swiss Industrial Print
源自 1960s corporate identity systems 和 heavy machinery blueprints。
*   **Characteristics:** 高对比 light modes（newsprint/off-white substrates）。依赖 monolithic、heavy sans-serif typography。用 visible dividing lines 勾勒 unforgiving structural grids。aggressive、asymmetric 地使用 negative space，并用 oversized、viewport-bleeding numerals 或 letterforms 打断。大量使用 primary red 作为 alert/accent color。

### 2.2 Tactical Telemetry & CRT Terminal
源自 classified military databases、legacy mainframes 和 aerospace Heads-Up Displays（HUDs）。
*   **Characteristics:** 只使用 dark mode。High-density tabular data presentation。monospaced typography 绝对主导。整合 technical framing devices（ASCII brackets、crosshairs）。应用 simulated hardware limitations（phosphor glow、scanlines、low bit-depth rendering）。

## 3. Typographic Architecture
Typography 是主要 structural 和 decorative infrastructure。Imagery 是次要的。系统要求 scale、weight 和 spacing 有极端 variance。

### 3.1 Macro-Typography (Structural Headers)
*   **Classification:** Neo-Grotesque / Heavy Sans-Serif.
*   **Optimal Web Fonts:** Neue Haas Grotesk (Black), Inter (Extra Bold/Black), Archivo Black, Roboto Flex (Heavy), Monument Extended.
*   **Implementation Parameters:**
    *   **Scale:** 使用 fluid typography 以 massive scales 部署（例如 `clamp(4rem, 10vw, 15rem)`）。
    *   **Tracking (Letter-spacing):** 极紧，常为负值（`-0.03em` 到 `-0.06em`），迫使 glyphs 形成 solid architectural blocks。
    *   **Leading (Line-height):** 高度压缩（`0.85` 到 `0.95`）。
    *   **Casing:** 为了 structural impact，只使用 uppercase。

### 3.2 Micro-Typography (Data & Telemetry)
*   **Classification:** Monospace / Technical Sans.
*   **Optimal Web Fonts:** JetBrains Mono, IBM Plex Mono, Space Mono, VT323, Courier Prime.
*   **Implementation Parameters:**
    *   **Scale:** 固定且小（`10px` 到 `14px` / `0.7rem` 到 `0.875rem`）。
    *   **Tracking:** 宽松（`0.05em` 到 `0.1em`），模拟 mechanical typewriter spacing 或 terminal matrices。
    *   **Leading:** 标准到紧凑（`1.2` 到 `1.4`）。
    *   **Casing:** 只使用 uppercase。用于所有 metadata、navigation、unit IDs 和 coordinates。

### 3.3 Textural Contrast (Artistic Disruption)
*   **Classification:** High-Contrast Serif.
*   **Optimal Web Fonts:** Playfair Display, EB Garamond, Times New Roman.
*   **Implementation Parameters:** 极少使用。必须经过 heavy post-processing（halftone filters、1-bit dithering），以 degrade vector perfection，并与 clean sans-serifs 形成 textural juxtaposition。

## 4. Color System
color architecture 是 uncompromising 的。严格禁止 gradients、soft drop shadows 和 modern translucency。Colors 模拟 physical media 或 primitive emissive displays。

**CRITICAL: 每个 project 选择一个 substrate palette，并一致使用。不要在同一 interface 内混合 light 和 dark substrates。**

### If Swiss Industrial Print (Light):
*   **Background:** `#F4F4F0` or `#EAE8E3` (Matte, unbleached documentation paper).
*   **Foreground:** `#050505` to `#111111` (Carbon Ink).
*   **Accent:** `#E61919` or `#FF2A2A` (Aviation/Hazard Red)。这是唯一 accent color。用于 strike-throughs、thick structural dividing lines 或 vital data highlights。

### If Tactical Telemetry (Dark):
*   **Background:** `#0A0A0A` or `#121212` (Deactivated CRT. Avoid pure `#000000`).
*   **Foreground:** `#EAEAEA` (White phosphor). This is the primary text color.
*   **Accent:** `#E61919` or `#FF2A2A` (Aviation/Hazard Red). Same red, same rules.
*   **Terminal Green (`#4AF626`):** 可选。只用于一个特定 UI element（例如一个 status indicator 或一个 data readout）- 不要作为 general text color。如果它没有 clear purpose，就完全省略。

## 5. Layout and Spatial Engineering
layout 必须呈现 mathematically engineered 的感觉。它拒绝 conventional web padding，转而使用 visible compartmentalization。

*   **The Blueprint Grid:** 严格遵循 CSS Grid architectures。Elements 不 float；它们被精确锚定到 grid tracks 和 intersections。
*   **Visible Compartmentalization:** 大量使用 solid borders（`1px` 或 `2px solid`）划分 distinct zones of information。Horizontal rules（`<hr>`）经常横跨整个 container width，以分隔 operational units。
*   **Bimodal Density:** Layouts 在 extreme data density（紧密聚集的 monospace metadata）和大面积 calculated negative space 之间摆动，后者用于框住 macro-typography。
*   **Geometry:** 绝对拒绝 `border-radius`。所有 corners 必须精确为 90 degrees，以强化 mechanical rigidity。

## 6. UI Components and Symbology
Standard web UI conventions 被 utilitarian、industrial graphic elements 取代。

*   **Syntax Decoration:** 使用 ASCII characters 框住 data points。
    *   *Framing:* `[ DELIVERY SYSTEMS ]`, `< RE-IND >`
    *   *Directional:* `>>>`, `///`, `\\\\`
*   **Industrial Markers:** 显著整合 registration（`®`）、copyright（`©`）和 trademark（`™`）symbols，使其作为 structural geometric elements，而不是 legal text。
*   **Technical Assets:** 在 grid intersections 整合 crosshairs（`+`）、repeating vertical lines（barcodes）、thick horizontal warning stripes 和 randomized string data（例如 `REV 2.6`、`UNIT / D-01`），以模拟 active mechanical processes。

## 7. Textural and Post-Processing Effects
为了避免 design 显得 purely digital，通过 CSS 和 SVG filters 将 simulated analog degradation 工程化进 frontend。

*   **Halftone and 1-Bit Dithering:** 将 continuous-tone images 或 large serif typography 转换为 dot-matrix patterns。可通过 pre-processing，或结合 SVG radial dot patterns 的 CSS `mix-blend-mode: multiply` overlays 实现。
*   **CRT Scanlines:** 对 terminal interfaces，将 `repeating-linear-gradient` 应用于 background，以模拟 horizontal electron beam sweeps（例如 `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`）。
*   **Mechanical Noise:** 将 global、low-opacity SVG static/noise filter 应用于 DOM root，在 dark 和 light modes 中引入统一 physical grain。

## 8. Web Engineering Directives
1.  **Grid Determinism:** 使用 `display: grid; gap: 1px;`，配合 parent/child 背景色对比，在不使用复杂 border declarations 的情况下生成 mathematically perfect、razor-thin dividing lines。
2.  **Semantic Rigidity:** 使用精确 semantic tags（`<data>`、`<samp>`、`<kbd>`、`<output>`、`<dl>`）构建 DOM，准确反映 telemetry 的 technical nature。
3.  **Typography Clamping:** 仅对 macro-typography 实现 CSS `clamp()` functions，确保 massive text aggressive 地缩放，同时在各 viewport 中保持 structural integrity。
