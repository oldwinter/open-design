---
name: web-prototype-taste-soft
description: Apple 级柔和 web prototype。银灰/奶油色 canvas、double-bezel cards、button-in-button CTAs、宽裕 squircle radii、spring motion 和 ambient mesh。基于 Leonxlnx/taste-skill 的 `soft-skill` 以及 `taste-skill` 第 4-8 节提炼。
---

# Web Prototype — Soft Premium

用于要求 “Apple-like”、“Linear-tier”、“premium consumer”、“calm SaaS” 或 “$150k agency” 完成度的 brief。整体审美柔和、有分量，并极度关注 nested architecture。

## Source

基于 [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) 提炼：`skills/soft-skill/SKILL.md`（“Vanguard UI Architect”）中的 haptic micro-aesthetics、double-bezel architecture 和 motion choreography rules。本目录的 `example.html` 提供完整实现模板。

## Hard rules

- **Canvas:** 银灰或暖奶油色（`#F2F2F0` 或 `#FDFBF7`）。不要纯白。
- **Type pairing:** display 使用 Geist / Plus Jakarta Sans / Cabinet Grotesk 的重字重；body 使用同一字族；monospace meta 使用 Geist Mono。
- **Display:** `clamp(48px, 7vw, 96px)`、`letter-spacing: -0.035em`、`line-height: 0.96`。重字重（700+）。
- **Squircle radii:** 主要 surface 使用 `border-radius: 28px–40px`（`rounded-[2rem]` 到 `rounded-[2.5rem]`）。
- **Double-bezel mandatory:** 每个重要 card 都是 wrapper（`p-1.5`、hairline border、soft outer shadow），内部包含拥有独立背景和 *同心更小 radius* 的 inner core（例如 outer `2rem`、inner `calc(2rem - 0.375rem)`）。
- **CTA = button-in-button:** 主要 CTA 是 full pill（`rounded-full px-6 py-3`）；尾部箭头放在自己的圆形 wrapper 内，并 flush-right。
- **Ambient depth:** hero 后方放一个缓慢漂移的 radial mesh blob，`opacity ≤ 0.18`、`pointer-events: none`、fixed。
- **Eyebrow tag:** 每个 section header 上方都有 pill、uppercase mono、`letter-spacing: 0.2em`、`text-[10px]`。

## Banned

- Inter, Roboto, Helvetica, Open Sans.
- 泛用 1px 实线灰色边框（使用 `border-black/5` / `ring-1 ring-black/5`）。
- `shadow-md`、`shadow-lg`、硬投影。只使用扩散、宽范围、低透明度投影（`0 20px 40px -15px rgba(0,0,0,0.05)`）。
- 顶部贴边、横跨全宽的 sticky navbar。使用悬浮玻璃 pill（`mt-6 mx-auto w-max rounded-full`）。
- Linear 或 `ease-in-out` transition。使用 `cubic-bezier(0.32, 0.72, 0, 1)` 或 spring physics。
- `h-screen`（使用 `min-h-[100dvh]`）。
- 动画化 `width` / `height` / `top` / `left`。只使用 `transform` 和 `opacity`。
- 纯黑 `#000`。使用 Zinc-950 / Off-Black。

## Required components

- 带 backdrop-blur-2xl 的 floating-pill navbar。
- 非对称 hero：巨大 heavy display、eyebrow tag、body lede `max-w-[52ch]`、两个 CTA（primary pill + button-in-button arrow，以及 ghost）。
- 使用 **double-bezel** pattern 的 Bento grid；至少一个 wide card 和一个 tall card。
- 带 **z-axis cascade** 或 split image module 的 feature row。
- Customer logos 的 marquee strip，缓慢无限平移（`-100% / 20s`），hover 时暂停。
- 柔和反色 surface 上的 closing band（deep zinc / espresso）。
- Footer：monospace meta，上方 hairline。

## Motion

- 所有 transition：最低 `transition: transform 700ms cubic-bezier(0.32,0.72,0,1)`。
- CTA hover：outer pill 在 `:active` 时缩放到 `0.98`；内部 trailing-icon circle 平移 `(+1px, -1px)` 并 `scale(1.05)`。
- Scroll entry：`translateY(16px) blur(8px) opacity(0)` → `translateY(0) blur(0) opacity(1)`。只用 `IntersectionObserver`。
- Marquee：在 duplicated track 上以 `30s linear` 无限执行 `transform: translateX(-50%)`。
- Hero mesh blob：24s+ keyframe drift，只用 opacity 或 transform。

## Pre-flight

- [ ] Floating pill nav 带 `backdrop-blur` + hairline ring
- [ ] 至少一个 card 使用 double-bezel（outer shell + inner core，同心 radii）
- [ ] Primary CTA 使用 button-in-button trailing icon
- [ ] Section padding ≥ `py-24`
- [ ] 没有 banned fonts；display weight ≥ 700
- [ ] Hero 使用 `min-h-[100dvh]`，绝不使用 `100vh`
- [ ] 所有 transition 使用自定义 cubic-bezier 或 spring；没有 `linear` / `ease-in-out`
- [ ] Mobile：768px 以下布局折叠为单列，所有 rotation + overlap 都移除
