# Scene Transitions

Transition 会告诉 viewer 两个 scenes 之间是什么关系。Crossfade 表示 “this continues”。Push slide 表示 “next point”。Blur crossfade 表示 “drift with me”。请选择与内容情绪相匹配的 transitions，而不只是技术上能实现的 transitions。

## Animation Rules for Multi-Scene Compositions

这些规则对每个 multi-scene composition 都不可协商：

1. **Every composition uses transitions.** 没有例外。没有 transitions 的 scenes 会像 jump cuts。
2. **Every scene uses entrance animations.** Elements 通过 `gsap.from()` animate IN，例如 opacity、position、scale 等。任何 scene 都不应完整成型地突然出现在屏幕上。
3. **Exit animations are BANNED**，final scene 除外。不要在 transition 触发前用 `gsap.to()` 把 elements animate out。Transition 本身就是 exit。Transition 开始时，outgoing scene content 必须完全可见；transition 会负责 visual handoff。
4. **Final scene exception:** 最后一个 scene 可以让 elements fade out（例如 composition 结束时 fade to black）。这是唯一允许 exit animations 的 scene。

## Energy → Primary Transition

| Energy | CSS Primary | Shader Primary | Accent | Duration | Easing |
| --- | --- | --- | --- | --- | --- |
| **Calm** (wellness, brand story, luxury) | Blur crossfade, focus pull | Cross-warp morph, thermal distortion | Light leak, circle iris | 0.5-0.8s | `sine.inOut`, `power1` |
| **Medium** (corporate, SaaS, explainer) | Push slide, staggered blocks | Whip pan, cinematic zoom | Squeeze, vertical push | 0.3-0.5s | `power2`, `power3` |
| **High** (promos, sports, music, launch) | Zoom through, overexposure | Ridged burn, glitch, chromatic split | Staggered blocks, gravity drop | 0.15-0.3s | `power4`, `expo` |

选择一个 primary（覆盖 60-70% 的 scene changes）+ 1-2 个 accents。不要每个 scene 都换一种 transition。

## Mood → Transition Type

思考 transition 在 _communicates_ 什么，而不只是它看起来像什么。

| Mood | Transitions | Why it works |
| --- | --- | --- |
| **Warm / inviting** | Light leak, blur crossfade, focus pull, film burn · **Shader:** thermal distortion, light leak, cross-warp morph | Soft edges、warm color washes。没有 sharp 或 mechanical 的感觉。 |
| **Cold / clinical** | Squeeze, zoom out, blinds, shutter, grid dissolve · **Shader:** gravitational lens | Content 以 mechanical 方式 transform：被 compressed、shrunk、sliced、gridded。 |
| **Editorial / magazine** | Push slide, vertical push, diagonal split, shutter · **Shader:** whip pan | 像翻页或切开 layout。Clean directional movement。 |
| **Tech / futuristic** | Grid dissolve, staggered blocks, blinds, chromatic aberration · **Shader:** glitch, chromatic split | Grid dissolve 是核心 “data” transition。Shader glitch 添加 posterization + scan lines。 |
| **Tense / edgy** | Glitch, VHS, chromatic aberration, ripple · **Shader:** ridged burn, glitch, domain warp | Instability、distortion、digital breakdown。Ridged burn 增加 sharp lightning-crack edges。 |
| **Playful / fun** | Elastic push, 3D flip, circle iris, morph circle, clock wipe · **Shader:** ripple waves, swirl vortex | Overshoot、bounce、rotation、expansion。Swirl vortex 添加 organic spiral distortion。 |
| **Dramatic / cinematic** | Zoom through, zoom out, gravity drop, overexposure, color dip to black · **Shader:** cinematic zoom, gravitational lens, domain warp | Scale、weight、light extremes。Shader transitions 添加 per-pixel depth。 |
| **Premium / luxury** | Focus pull, blur crossfade, color dip to black · **Shader:** cross-warp morph, thermal distortion | Restraint。Cross-warp morph 会让两个 scenes organically flow into each other。 |
| **Retro / analog** | Film burn, light leak, VHS, clock wipe · **Shader:** light leak | Organic imperfection。Warm color bleeds、scan line displacement。 |

## Narrative Position

| Position | Use | Why |
| --- | --- | --- |
| **Opening** | 使用最 distinctive 的 transition。匹配 mood。0.4-0.6s | 为整段作品建立 visual language。 |
| **Between related points** | 使用 primary transition。保持一致。0.3s | 不要分散注意力；content 正在继续。 |
| **Topic change** | 使用不同于 primary 的效果。Staggered blocks, shutter, squeeze。 | 发出 “new section” 信号，让 viewer's brain reset。 |
| **Climax / hero reveal** | 使用最 bold 的 accent。最快或最 dramatic。 | 这是 payoff；把最好的 transition 用在这里。 |
| **Wind-down** | 回到 gentle。Blur crossfade, crossfade。0.5-0.7s | Climax 之后让 viewer exhale。 |
| **Outro** | 最慢、最简单。Crossfade, color dip to black。0.6-1.0s | Closure。不要在结尾引入 new energy。 |

## Blur Intensity by Energy

| Energy | Blur | Duration | Hold at peak |
| --- | --- | --- | --- |
| **Calm** | 20-30px | 0.8-1.2s | 0.3-0.5s |
| **Medium** | 8-15px | 0.4-0.6s | 0.1-0.2s |
| **High** | 3-6px | 0.2-0.3s | 0s |

## Presets

| Preset | Duration | Easing |
| --- | --- | --- |
| `snappy` | 0.2s | `power4.inOut` |
| `smooth` | 0.4s | `power2.inOut` |
| `gentle` | 0.6s | `sine.inOut` |
| `dramatic` | 0.5s | `power3.in` → out |
| `instant` | 0.15s | `expo.inOut` |
| `luxe` | 0.7s | `power1.inOut` |

## Implementation

阅读 [transitions/catalog.md](transitions/catalog.md)，获取每种 transition type 的 GSAP code 和 hard rules。

| Category | CSS | Shader (WebGL) |
| --- | --- | --- |
| Push/slide | Push slide, vertical push, elastic push, squeeze | Whip pan |
| Scale/zoom | Zoom through, zoom out, gravity drop, 3D flip | Cinematic zoom, gravitational lens |
| Reveal/mask | Circle iris, diamond iris, diagonal split, clock wipe, shutter | SDF iris |
| Dissolve | Crossfade, blur crossfade, focus pull, color dip | Cross-warp morph, domain warp |
| Cover | Staggered blocks, horizontal blinds, vertical blinds | — |
| Light | Light leak, overexposure burn, film burn | Light leak (shader), thermal distortion |
| Distortion | Glitch, chromatic aberration, ripple, VHS tape | Glitch (shader), chromatic split, ridged burn, ripple waves, swirl vortex |
| Pattern | Grid dissolve, morph circle | — |

## Transitions That Don't Work in CSS

Avoid: star iris、tilt-shift、lens flare、hinge/door。原因见 catalog.md。

## CSS vs Shader

CSS transitions 通过 opacity、transforms、clip-path 和 filters animate scene containers。Shader transitions 在 WebGL canvas 上逐像素 composite 两个 scene textures；它们可以用 CSS 做不到的方式 warp、dissolve 和 morph。

**Both are first-class options.** Shaders 由 `@hyperframes/shader-transitions` package 提供；请从 package import，而不是手写 raw GLSL。CSS transitions 设置更简单。根据你想要的 effect 选择，而不是根据哪个更容易选择。

当 composition 使用 shader transitions 时，该 composition 中的全部 transitions 都应基于 shader（WebGL canvas 会取代 DOM-based scene switching）。不要在同一个 composition 中混用 CSS 和 shader transitions。

## Shader-Compatible CSS Rules

Shader transitions 会通过 html2canvas 把 DOM scenes 捕获为 WebGL textures。Canvas 2D rendering pipeline 与 CSS 并不完全一致。遵守这些规则，避免 transition boundaries 出现 visible artifacts：

1. **Gradients 中不要使用 `transparent` keyword。** Canvas 会把 `transparent` 插值为 `rgba(0,0,0,0)`（zero alpha 的 black），造成 dark fringes。始终使用 alpha 为 0 的目标颜色：用 `rgba(200,117,51,0)`，不要用 `transparent`。
2. **厚度小于 4px 的 elements 不要使用 gradient backgrounds。** Canvas 无法在 1-2px elements 上匹配 CSS gradient rendering。Thin accent lines 使用 solid `background-color`。
3. **Capture 期间可见的 elements 不要使用 CSS variables（`var()`）。** html2canvas 不能可靠解析 custom properties。Inline styles 中使用 literal color values。
4. **用 `data-no-capture` 标记不可捕获的 decorative elements。** Capture function 会跳过这些元素。它们存在于 live DOM，但不会出现在 shader texture 中。用于无法遵守上述规则的 elements。
5. **Gradient opacity 不要低于 0.15。** 低于 10% opacity 的 gradient elements 在 canvas 与 CSS 中渲染不同。提高到 0.15+，或使用等效亮度的 solid color。
6. **每个 `.scene` div 都必须有明确的 `background-color`，并在 `init()` config 中传入相同颜色作为 `bgColor`。** Package 会通过 html2canvas 捕获 scene elements。`.scene` 上的 CSS `background-color` 和 `bgColor` config 必须一致。缺少任一项时，texture 会渲染为 black。

这些规则只适用于 shader transition compositions。CSS-only compositions 没有限制。

## Visual Pattern Warning

避免会制造可见重复 geometric patterns 的 transitions：tile grids、hexagonal cells、uniform dot arrays、evenly-spaced blob circles。无论背后的 math 多好，这些都会显得 cheap 且 artificial。Organic noise（FBM、domain warping）是好的，因为它不规则。Geometric repetition 是坏的，因为眼睛会立刻看出 grid。
