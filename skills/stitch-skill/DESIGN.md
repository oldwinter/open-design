# Design System: Taste Standard
**Skill:** stitch-design-taste

---

## Configuration — Set Your Style
使用此 design system 前，先调整这些拨盘。它们控制输出的创意度、密度和动效强度。选择适合你项目的 level。

| Dial | Level | Description |
|------|-------|-------------|
| **Creativity** | `8` | `1` = 极简、Swiss、安静、monochrome。`5` = 平衡、干净但有个性。`10` = Expressive、editorial、大胆 typography experiments、headline 中使用 inline images、强非对称。Default: `8` |
| **Density** | `4` | `1` = Gallery-airy, massive whitespace. `5` = Balanced sections. `10` = Cockpit-dense, data-heavy. Default: `4` |
| **Variance** | `8` | `1` = Predictable, symmetric grids. `5` = Subtle offsets. `10` = Artsy chaotic, no two sections alike. Default: `8` |
| **Motion Intent** | `6` | `1` = Static, no animation noted. `5` = Subtle hover/entrance cues. `10` = Cinematic orchestration noted in every component. Default: `6` |

> **How to use:** 把上面的数字改成匹配项目气质的值。当 **Creativity 1-3** 时，系统会生成干净、安静、类似 Notion 的界面。当 **Creativity 7-10** 时，可以预期 inline image typography、戏剧化尺度对比和强烈 editorial layouts。下面其余规则会随你选择的 levels 自适应。

---

## 1. Visual Theme & Atmosphere
克制、gallery-airy 的界面，带自信的非对称 layouts 和流动的 spring-physics motion。气氛临床般精确却温暖，像一间采光良好的建筑工作室，每个元素都因功能而获得位置。Density 保持平衡（Level 4），variance 较高（Level 8），避免对称带来的乏味；motion 流畅但绝不戏剧化（Level 6）。整体印象：昂贵、刻意、鲜活。

## 2. Color Palette & Roles
- **Canvas White** (#F9FAFB) — 主要 background surface。温暖中性色，绝不是临床感蓝白
- **Pure Surface** (#FFFFFF) — Card 和 container fill。配 whisper shadow 表达 elevation
- **Charcoal Ink** (#18181B) — Primary text。Zinc-950 深度，绝不用纯黑
- **Steel Secondary** (#71717A) — Body text、descriptions、metadata。带 Zinc-500 的温度
- **Muted Slate** (#94A3B8) — Tertiary text、timestamps、disabled states
- **Whisper Border** (rgba(226,232,240,0.5)) — Card borders、结构性 1px lines。半透明以制造深度
- **Diffused Shadow** (rgba(0,0,0,0.05)) — Card elevation。宽扩散、40px blur、-15px offset。绝不生硬

### Accent Selection (Pick ONE per project)
- **Emerald Signal** (#10B981) — 用于增长、成功、正向数据 dashboards
- **Electric Blue** (#3B82F6) — 用于 productivity、SaaS、developer tools
- **Deep Rose** (#E11D48) — 用于 creative、editorial、fashion-adjacent projects
- **Amber Warmth** (#F59E0B) — 用于 community、social、暖色产品

### Banned Colors
- Purple/Violet neon gradients — “AI Purple” 美学
- Pure Black (#000000) — 始终使用 Off-Black 或 Zinc-950
- 饱和度超过 80% 的过饱和 accents
- 在同一个项目里混用 warm/cool gray systems

## 3. Typography Rules
- **Display:** `Geist`、`Satoshi`、`Cabinet Grotesk` 或 `Outfit` — Track-tight (`-0.025em`)、受控 fluid scale、由 weight 驱动 hierarchy（700-900）。不要吼叫。Leading 压缩（`1.1`）。必须选择有辨识度的替代字体；`Inter` 在 premium contexts 中被禁用
- **Body:** 同一 font family，weight 400 — Relaxed leading (`1.65`)、65ch max-width、Steel Secondary color (#71717A)
- **Mono:** `Geist Mono` 或 `JetBrains Mono` — 用于 code blocks、metadata、timestamps。当 density 超过 Level 7，所有数字切换到 monospace
- **Scale:** Display 使用 `clamp(2.25rem, 5vw, 3.75rem)`。Body 使用 `1rem/1.125rem`。Mono metadata 使用 `0.8125rem`

### Banned Fonts
- `Inter` — premium/creative contexts 中全面禁用
- Generic serif fonts（`Times New Roman`、`Georgia`、`Garamond`、`Palatino`）— BANNED。如果 editorial/creative 场景需要 serif，只能使用 `Fraunces`、`Gambarino`、`Editorial New` 或 `Instrument Serif` 这类有辨识度的现代 serif。绝不要使用默认浏览器 serif stacks。Dashboard 或 software UI 中一律禁用 serif

## 4. Component Stylings
* **Buttons:** Flat surface，无 outer glow。Primary: accent fill + white text。Secondary: ghost/outline。Active state: `-1px translateY` 或 `scale(0.98)`，制造触觉按压。Hover: subtle background shift，绝不用 glow
* **Cards/Containers:** 大圆角（`2.5rem`）。Pure white fill。Whisper border（`1px`，半透明）。Diffused shadow（`0 20px 40px -15px rgba(0,0,0,0.05)`）。Internal padding `2rem-2.5rem`。只有当 elevation 传达 hierarchy 时才使用；高密度 layouts 用 `border-top` dividers 或 negative space 代替 cards
* **Inputs/Forms:** Label 位于 input 上方。Helper text 可选。Error text 位于下方，使用 Deep Rose。Focus ring 使用 accent color，`2px` offset。无 floating labels。label-input-error stack 之间使用标准 `0.5rem` gap
* **Navigation:** 利落、sticky。Icons 在 hover 时 scale（Dock Magnification 可选）。Desktop 上不使用 hamburger。干净水平排列，间距充足
* **Loaders:** Skeletal shimmer，匹配精确 layout dimensions 和 rounded corners。Light reflection 在 placeholder shapes 上移动。绝不用 circular spinners
* **Empty States:** 使用组合式 illustration 或 icon composition，并配指导文本。绝不要只有 “No data found”
* **Error States:** Inline、contextual。红色 accent underline 或 border。提供清楚 recovery action

## 5. Hero Section
Hero 是第一印象，必须醒目、有创意，绝不 generic。
- **Inline Image Typography:** 在 headline 的词与词或字母之间直接嵌入小型、上下文相关的照片或视觉元素。示例："We build [photo of hands typing] digital [photo of screen] products" — 图片以 type-height 贴合 inline，带圆角，作为词间的视觉标点。这是标志性创意技法
- **No Overlapping Elements:** Text 绝不能与 images 或其他 text 重叠。每个元素都有自己的清晰空间区域。不要用 z-index stacking 叠内容层，不要把 headline absolute-position 到图片上。始终保持干净分离
- **No Filler Text:** "Scroll to explore"、"Swipe down"、scroll arrow icons、bouncing chevrons 以及任何 instructional UI chrome 都是 BANNED。用户知道如何滚动。让内容自然吸引他们继续
- **Asymmetric Structure:** 在当前 variance level 下禁用 centered Hero layouts。使用 Split Screen（50/50）、Left-Aligned text / Right visual，或带大面积 empty zones 的 Asymmetric Whitespace
- **CTA Restraint:** 最多一个 primary CTA button。不要 secondary "Learn more" links。不要在 headline 下方放冗余 micro-copy

## 6. Layout Principles
- **Grid-First:** 所有结构性 layouts 使用 CSS Grid。绝不要使用 flexbox percentage math（`calc(33% - 1rem)` 是 BANNED）
- **No Overlapping:** 元素绝不能彼此重叠。不要用 absolute-positioned layers 把内容叠在内容上。每个元素都占据自己的 grid cell 或 flow position。空间区域干净、分离
- **Feature Sections:** 禁用 “3 equal cards in a row” pattern。使用 2-column Zig-Zag、asymmetric Bento grids（2fr 1fr 1fr），或 horizontal scroll galleries
- **Containment:** 所有内容在 `max-width: 1400px` 内居中。慷慨 horizontal padding（`1rem` mobile、`2rem` tablet、`4rem` desktop）
- **Full-Height:** 使用 `min-height: 100dvh`，绝不要用 `height: 100vh`（会触发 iOS Safari address bar jump）
- **Bento Architecture:** Feature grids 使用 Row 1: 3 columns | Row 2: 2 columns（70/30 split）。每个 tile 包含 perpetual micro-animation

## 7. Responsive Rules
每个屏幕都必须在所有 viewports 下完美工作。**Responsive 不是可选项，而是硬性要求。每个元素都必须在 375px、768px 和 1440px 测试。**
- **Mobile-First Collapse (< 768px):** 所有 multi-column layouts 严格折叠为单列。`width: 100%`、`padding: 1rem`、`gap: 1.5rem`。没有例外
- **No Horizontal Scroll:** Mobile 上出现 horizontal overflow 是严重失败。所有元素必须适配 viewport width。任何元素造成横向滚动，设计就是坏的
- **Typography Scaling:** Headlines 通过 `clamp()` 优雅缩小。Body text 最小保持 `1rem`。绝不要把 body 缩到 `14px` 以下。Headlines 在 375px 屏幕上仍必须可读
- **Touch Targets:** 所有 interactive elements 至少 `44px` tap target。Clickable items 之间留足间距。Mobile 上 buttons 必须 full-width
- **Image Behavior:** Hero 和 inline images 按比例缩放。Inline typography images（词间照片）在 mobile 上放到 headline 下方，而不是继续 inline
- **Navigation:** Desktop horizontal nav 折叠为干净的 mobile menu（slide-in 或 full-screen overlay）。不要使用没有 labels 的微小 hamburger icons
- **Cards & Grids:** Bento grids 和 asymmetric layouts 回退为堆叠的单列 full-width cards。保持 internal padding（`1rem`）
- **Spacing Consistency:** Mobile 上 vertical section gaps 按比例缩小（`clamp(3rem, 8vw, 6rem)`）。不拥挤，也不过度空旷
- **Testing Viewports:** Designs 必须在这些尺寸验证：`375px`（iPhone SE）、`390px`（iPhone 14）、`768px`（iPad）、`1024px`（small laptop）、`1440px`（desktop）

## 8. Motion & Interaction (Code-Phase Intent)
> **Note:** Stitch 生成静态 screens，不会生成动画。本节记录 **intended motion behavior**，让 coding agent（Antigravity、Cursor 等）在把导出的设计构建为 live product 时，准确知道如何实现动画。

- **Physics Engine:** 只使用 spring-based。`stiffness: 100, damping: 20`。任何地方都不要 linear easing。所有 interactive elements 都要有 premium、带重量的手感
- **Perpetual Micro-Loops:** 每个 active dashboard component 都有 infinite-loop state：status dots 上的 Pulse、search bars 上的 Typewriter、feature icons 上的 Float、loading states 上的 Shimmer
- **Staggered Orchestration:** Lists 和 grids mount 时使用级联 delays（`animation-delay: calc(var(--index) * 100ms)`）。Waterfall reveals，绝不 instant mount
- **Layout Transitions:** 通过 shared element IDs 做平滑 re-ordering。Items 用 physics 交换位置，模拟 real-time intelligence
- **Hardware Rules:** 只动画化 `transform` 和 `opacity`。绝不要动画化 `top`、`left`、`width`、`height`。Grain/noise filters 只放在 fixed、pointer-events-none pseudo-elements 上
- **Performance:** CPU-heavy perpetual animations 隔离在极小的 leaf components 中。绝不要触发 parent re-renders。目标至少 60fps

## 9. Anti-Patterns (Banned)
- UI、code 或 alt text 中任何地方都不要 emojis
- 不要使用 `Inter` font；使用 `Geist`、`Outfit`、`Cabinet Grotesk`、`Satoshi`
- 不要使用 generic serif fonts（`Times New Roman`、`Georgia`、`Garamond`）；如果需要 serif，只用 distinctive modern serifs（`Fraunces`、`Instrument Serif`）
- 不要使用 pure black（`#000000`）；只用 Off-Black 或 Zinc-950
- 不要使用 neon outer glows 或 default box-shadow glows
- 不要使用饱和度超过 80% 的过饱和 accent colors
- 不要在大标题中过度使用 gradient text
- 不要使用 custom mouse cursors
- 不要让元素重叠；text 绝不与 images 或其他内容重叠。始终保持干净空间分离
- 不要使用 3-column equal card layouts 做 features
- 不要使用 centered Hero sections（在当前 variance level 下）
- 不要使用 filler UI text："Scroll to explore"、"Swipe down"、"Discover more below"、scroll arrows、bouncing chevrons 全部 BANNED
- 不要使用 generic names："John Doe"、"Sarah Chan"、"Acme"、"Nexus"、"SmartFlow"
- 不要使用假的 round numbers：`99.99%`、`50%`、`1234567`；使用 organic data：`47.2%`、`+1 (312) 847-1928`
- 不要使用 AI copywriting clichés："Elevate"、"Seamless"、"Unleash"、"Next-Gen"、"Revolutionize"
- 不要使用 broken Unsplash links；使用 `picsum.photos/seed/{id}/800/600` 或 SVG UI Avatars
- 不要保留 generic `shadcn/ui` defaults；自定义 radii、colors、shadows，使其匹配此 system
- 不要滥用 `z-index`；只用于 Navbar、Modal、Overlay layer contexts
- 不要使用 `h-screen`；始终使用 `min-h-[100dvh]`
- 不要使用 circular loading spinners；只用 skeletal shimmer
