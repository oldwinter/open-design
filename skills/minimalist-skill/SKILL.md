---
name: minimalist-ui
description: |
  干净的 editorial-style interfaces。Warm monochrome palette、typographic contrast、flat bento grids、muted pastels。无 gradients、无 heavy shadows。
triggers:
  - "minimalist ui"
  - "editorial product UI"
  - "linear style"
  - "warm monochrome"
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
      - anti-ai-slop
  example_prompt: |
    设计一个 minimalist editorial product interface，包含 warm monochrome color、crisp typography、flat structure，且没有 decorative excess。
---


# Protocol: Premium Utilitarian Minimalism UI Architect

## 1. Protocol Overview
Name: Premium Utilitarian Minimalism & Editorial UI
Description: 用于生成高度 refined、ultra-minimalist、"document-style" web interfaces 的高级 frontend engineering directive，接近 top-tier workspace platforms 的质感。此 protocol 严格强制 high-contrast warm monochrome palette、定制 typographic hierarchies、细致 structural macro-whitespace、bento-grid layouts，以及带有 deliberate muted pastel accents 的 ultra-flat component architecture。它主动拒绝 standard generic SaaS design trends。

## 2. Absolute Negative Constraints (Banned Elements)
AI 必须严格避免以下 generic web development defaults：
- 不要使用 "Inter"、"Roboto" 或 "Open Sans" typefaces。
- 不要使用 "Lucide"、"Feather" 或 standard "Heroicons" 这类 generic、thin-line icon libraries。
- 不要使用 Tailwind 默认 heavy drop shadows（例如 `shadow-md`、`shadow-lg`、`shadow-xl`）。Shadows 必须几乎不存在，或高度自定义为 ultra-diffuse 且低 opacity（< 0.05）。
- 不要为 large elements 或 sections 使用 primary colored backgrounds（例如不要 bright blue、green 或 red hero sections）。
- 不要使用 gradients、neon colors 或 3D glassmorphism（subtle navbar blurs 之外）。
- 不要为 large containers、cards 或 primary buttons 使用 `rounded-full`（pill shapes）。
- 不要在 code、markup、text content、headings 或 alt text 中使用 emojis。改用 proper icons 或 clean SVG primitives。
- 不要使用 "John Doe"、"Acme Corp" 或 "Lorem Ipsum" 这类 generic placeholder names。使用 realistic、contextual content。
- 不要使用 AI copywriting clichés："Elevate"、"Seamless"、"Unleash"、"Next-Gen"、"Game-changer"、"Delve"。写 plain、specific language。

## 3. Typographic Architecture
interface 必须依赖 extreme typographic contrast 和 premium font selection 来建立 editorial feel。
- Primary Sans-Serif（Body、UI、Buttons）：使用 clean、geometric 或 system-native 且有 character 的 fonts。Target: `font-family: 'SF Pro Display', 'Geist Sans', 'Helvetica Neue', 'Switzer', sans-serif`。
- Editorial Serif（Hero Headings & Quotes）：Target: `font-family: 'Lyon Text', 'Newsreader', 'Playfair Display', 'Instrument Serif', serif`。应用 tight tracking（`letter-spacing: -0.02em` 到 `-0.04em`）和 tight line-height（`1.1`）。
- Monospace（Code、Keystrokes、Meta-data）：Target: `font-family: 'Geist Mono', 'SF Mono', 'JetBrains Mono', monospace`。
- Text Colors：Body text 绝不能是 absolute black（`#000000`）。使用 off-black/charcoal（`#111111` 或 `#2F3437`），并使用 generous `line-height` `1.6` 保证 legibility。Secondary text 应为 muted gray（`#787774`）。

## 4. Color Palette (Warm Monochrome + Spot Pastels)
Color 是稀缺资源，只用于 semantic meaning 或 subtle accents。
- Canvas / Background: Pure White `#FFFFFF` 或 Warm Bone/Off-White `#F7F6F3` / `#FBFBFA`。
- Primary Surface (Cards): `#FFFFFF` 或 `#F9F9F8`。
- Structural Borders / Dividers: Ultra-light gray `#EAEAEA` 或 `rgba(0,0,0,0.06)`。
- Accent Colors: 只使用 highly desaturated、washed-out pastels，用于 tags、inline code backgrounds 或 subtle icon backgrounds。
  - Pale Red: `#FDEBEC` (Text: `#9F2F2D`)
  - Pale Blue: `#E1F3FE` (Text: `#1F6C9F`)
  - Pale Green: `#EDF3EC` (Text: `#346538`)
  - Pale Yellow: `#FBF3DB` (Text: `#956400`)

## 5. Component Specifications
- Bento Box Feature Grids:
  - 使用 asymmetrical CSS Grid layouts。
  - Cards 必须精确使用 `border: 1px solid #EAEAEA`。
  - Border-radius 必须 crisp：最大 `8px` 或 `12px`。
  - Internal padding 必须 generous（例如 `24px` 到 `40px`）。
- Primary Call-To-Action (Buttons):
  - Solid background `#111111`，text `#FFFFFF`。
  - 轻微 border-radius（`4px` 到 `6px`）。无 box-shadow。
  - Hover state 应是向 `#333333` 的 subtle color shift，或 micro-scale `transform: scale(0.98)`。
- Tags & Status Badges:
  - Pill-shaped（`border-radius: 9999px`）、very small typography（`text-xs`）、uppercase 且 wide tracking（`letter-spacing: 0.05em`）。
  - Background 必须使用定义好的 Muted Pastels。
- Accordions (FAQ):
  - 移除所有 container boxes。items 只用 `border-bottom: 1px solid #EAEAEA` 分隔。
  - toggle state 使用 clean、sharp 的 `+` 和 `-` icon。
- Keystroke Micro-UIs:
  - 使用 `<kbd>` tags 将 shortcuts render 成 physical keys：`border: 1px solid #EAEAEA`、`border-radius: 4px`、`background: #F7F6F3`，并使用 Monospace font。
- Faux-OS Window Chrome:
  - mockup software 时，用 minimalist container 包裹它，并带一个 white top bar，其中包含三个 small、light gray circles（复刻 macOS window controls）。

## 6. Iconography & Imagery Directives
- System Icons: 使用 "Phosphor Icons (Bold or Fill weights)" 或 "Radix UI Icons"，获得 technical、稍厚 stroke 的 aesthetic。所有 icons 统一 stroke width。
- Illustrations: 白色背景上的 monochromatic、rough continuous-line ink sketches，并包含一个填充 muted pastel color 的 offset geometric shape。
- Photography: 使用高质量、desaturated 且 warm tone 的 images。应用 subtle overlays（`opacity: 0.04` warm grain），将 photos 融入 monochrome palette。不要使用 oversaturated stock photos。真实 assets 不可用时，使用可靠 placeholders，例如 `https://picsum.photos/seed/{context}/1200/800`。
- Hero & Section Backgrounds: Sections 不应感觉 empty 且 flat。使用极低 opacity 的 subtle full-width background imagery、soft radial light spots（带 warm tones 且 `opacity: 0.03` 的 `radial-gradient`），或 minimal geometric line patterns，在不破坏 clean aesthetic 的情况下增加 depth。

## 7. Subtle Motion & Micro-Animations
Motion 应感觉 invisible - 存在但不 distracting。目标是 quiet sophistication，而不是 spectacle。
- Scroll Entry: Elements 进入 viewport 时 gentle fade in。使用 `translateY(12px)` + `opacity: 0`，在 `600ms` 内通过 `cubic-bezier(0.16, 1, 0.3, 1)` 解析完成。使用 `IntersectionObserver`，不要使用 `window.addEventListener('scroll')`。
- Hover States: Cards 通过 ultra-subtle shadow shift 抬起（`box-shadow` 在 `200ms` 内从 `0 0 0` 过渡到 `0 2px 8px rgba(0,0,0,0.04)`）。Buttons 在 `:active` 时用 `scale(0.98)` 响应。
- Staggered Reveals: Lists 和 grid items 使用 cascade delay（`animation-delay: calc(var(--index) * 80ms)`）进入。不要一次 mount 所有元素。
- Background Ambient Motion: 可选。一个非常 slow-moving 的 radial gradient blob（`animation-duration: 20s+`、`opacity: 0.02-0.04`）在 hero sections 后方 drift。必须应用到 `position: fixed; pointer-events: none` layer。不要用在 scrolling containers 上。
- Performance: 只通过 `transform` 和 `opacity` animate。不要使用 layout-triggering properties（`top`、`left`、`width`、`height`）。谨慎使用 `will-change: transform`，且仅用于正在 active animating 的元素。

## 8. Execution Protocol
当任务是编写 frontend code（HTML、React、Tailwind、Vue）或设计 layout 时：
1. 先建立 macro-whitespace。在 sections 之间使用 massive vertical padding（例如 Tailwind 中的 `py-24` 或 `py-32`）。
2. 将 main typography content width 限制为 `max-w-4xl` 或 `max-w-5xl`。
3. 立即应用 custom typographic hierarchy 和 monochromatic color variables。
4. 确保每个 card、divider 和 border 都严格遵循 `1px solid #EAEAEA` rule。
5. 为所有 major content blocks 添加 scroll-entry animations。
6. 确保 sections 通过 imagery、ambient gradients 或 subtle textures 具备 visual depth - 不要 empty flat backgrounds。
7. 提供原生体现这种 high-end、uncluttered、editorial aesthetic 的 code，不需要手动调整。
