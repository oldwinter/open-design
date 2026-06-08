---
name: design-taste-frontend-v1
description: |
  原始 v1 taste-skill，为依赖其精确行为的项目保留。当前默认是 `design-taste-frontend`（v2 experimental），属于大幅重写。只有在需要精确向后兼容时，才使用这个 v1 安装名。
triggers:
  - "design taste v1"
  - "high agency frontend"
  - "anti slop v1"
  - "visual density"
od:
  mode: prototype
  surface: web
  platform: desktop
  scenario: marketing
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
      - animation-discipline
  example_prompt: |
    使用 design-taste-frontend-v1 创建一个精致 marketing page，具备强排版、间距、动效和 anti-slop guardrails。
---


# High-Agency Frontend Skill

## 1. ACTIVE BASELINE CONFIGURATION
* DESIGN_VARIANCE: 8（1=Perfect Symmetry，10=Artsy Chaos）
* MOTION_INTENSITY: 6（1=Static/No movement，10=Cinematic/Magic Physics）
* VISUAL_DENSITY: 4（1=Art Gallery/Airy，10=Pilot Cockpit/Packed Data）

**AI Instruction:** 所有生成的标准 baseline 严格设为这些值（8、6、4）。不要要求用户编辑此文件。除此之外，始终听从用户：根据他们在 chat prompt 中明确提出的要求，动态调整这些值。将这些 baseline（或用户覆盖后的值）作为全局变量，用来驱动第 3 到第 7 节的具体逻辑。

## 2. DEFAULT ARCHITECTURE & CONVENTIONS
除非用户明确指定不同技术栈，否则遵守以下结构约束以保持一致性：

* **DEPENDENCY VERIFICATION [MANDATORY]:** 导入任何 3rd party library（例如 `framer-motion`、`lucide-react`、`zustand`）之前，必须检查 `package.json`。如果 package 缺失，必须先输出安装命令（例如 `npm install package-name`），再提供代码。**绝不要**假设某个 library 已存在。
* **Framework & Interactivity:** React 或 Next.js。默认使用 Server Components（`RSC`）。
    * **RSC SAFETY:** Global state 只在 Client Components 中可用。在 Next.js 中，用 `"use client"` component 包裹 providers。
    * **INTERACTIVITY ISOLATION:** 如果第 4 或第 7 节（Motion/Liquid Glass）处于 active，具体交互 UI component 必须抽成独立 leaf component，并在最顶部加 `'use client'`。Server Components 只能渲染静态 layouts。
* **State Management:** 对隔离 UI 使用本地 `useState`/`useReducer`。Global state 只用于避免深层 prop-drilling。
* **Styling Policy:** 90% styling 使用 Tailwind CSS（v3/v4）。
    * **TAILWIND VERSION LOCK:** 先检查 `package.json`。不要在 v3 项目中使用 v4 syntax。
    * **T4 CONFIG GUARD:** 对 v4，不要在 `postcss.config.js` 中使用 `tailwindcss` plugin。使用 `@tailwindcss/postcss` 或 Vite plugin。
* **ANTI-EMOJI POLICY [CRITICAL]:** 代码、markup、文本内容或 alt text 中绝不要使用 emoji。用高质量 icon（Radix、Phosphor）或干净 SVG primitive 替代符号。Emoji 被禁用。
* **Responsiveness & Spacing:**
  * 标准化 breakpoints（`sm`、`md`、`lg`、`xl`）。
  * 使用 `max-w-[1400px] mx-auto` 或 `max-w-7xl` 约束页面布局。
  * **Viewport Stability [CRITICAL]:** full-height Hero section 绝不要使用 `h-screen`。始终使用 `min-h-[100dvh]`，防止移动浏览器（iOS Safari）发生灾难性布局跳动。
  * **Grid over Flex-Math:** 绝不要使用复杂 flexbox 百分比数学（`w-[calc(33%-1rem)]`）。始终使用 CSS Grid（`grid grid-cols-1 md:grid-cols-3 gap-6`）构建可靠结构。
* **Icons:** import path 必须精确使用 `@phosphor-icons/react` 或 `@radix-ui/react-icons`（检查已安装版本）。全局标准化 `strokeWidth`（例如只使用 `1.5` 或 `2.0`）。


## 3. DESIGN ENGINEERING DIRECTIVES（Bias Correction）
LLM 对特定 UI cliché patterns 有统计偏置。使用以下工程化规则，主动构建高级界面：

**Rule 1: Deterministic Typography**
* **Display/Headlines:** 默认使用 `text-4xl md:text-6xl tracking-tighter leading-none`。
    * **ANTI-SLOP:** 对 “Premium” 或 “Creative” vibe，不鼓励使用 `Inter`。强制用 `Geist`、`Outfit`、`Cabinet Grotesk` 或 `Satoshi` 打造独特性格。
    * **TECHNICAL UI RULE:** Dashboard/Software UI 严格禁用 Serif fonts。在这些上下文中，只使用高端 Sans-Serif pairing（`Geist` + `Geist Mono` 或 `Satoshi` + `JetBrains Mono`）。
* **Body/Paragraphs:** 默认使用 `text-base text-gray-600 leading-relaxed max-w-[65ch]`。

**Rule 2: Color Calibration**
* **Constraint:** 最多 1 个 Accent Color。Saturation < 80%。
* **THE LILA BAN:** 严格禁用 “AI Purple/Blue” aesthetic。不要紫色按钮光晕，不要 neon gradient。使用绝对 neutral base（Zinc/Slate），配高对比的单一 accent（例如 Emerald、Electric Blue 或 Deep Rose）。
* **COLOR CONSISTENCY:** 整个输出坚持一个 palette。不要在同一项目里来回切换暖灰和冷灰。

**Rule 3: Layout Diversification**
* **ANTI-CENTER BIAS:** 当 `LAYOUT_VARIANCE > 4` 时，严格禁用居中的 Hero/H1 section。强制使用 “Split Screen”（50/50）、“Left Aligned content/Right Aligned asset” 或 “Asymmetric White-space” 结构。

**Rule 4: Materiality, Shadows, and "Anti-Card Overuse"**
* **DASHBOARD HARDENING:** 对 `VISUAL_DENSITY > 7`，严格禁用泛用 card container。通过 `border-t`、`divide-y` 或纯 negative space 进行逻辑分组。除非功能上需要 elevation（z-index），否则 data metrics 应该不被盒子框住并保持呼吸感。
* **Execution:** 只有当 elevation 能传达层级时才使用 cards。使用 shadow 时，让它带有背景色调。

**Rule 5: Interactive UI States**
* **Mandatory Generation:** LLM 天然倾向生成“静态”的成功状态。你必须实现完整交互周期：
  * **Loading:** 与布局尺寸匹配的 skeleton loaders（避免泛用圆形 spinner）。
  * **Empty States:** 构图漂亮的 empty states，说明如何填充数据。
  * **Error States:** 清晰的 inline error reporting（例如 forms）。
  * **Tactile Feedback:** 在 `:active` 上使用 `-translate-y-[1px]` 或 `scale-[0.98]`，模拟表示成功/动作的实体按压。

**Rule 6: Data & Form Patterns**
* **Forms:** Label 必须位于 input 上方。Helper text 可选但应存在于 markup 中。Error text 位于 input 下方。Input block 使用标准 `gap-2`。

## 4. CREATIVE PROACTIVITY（Anti-Slop Implementation）
为了主动对抗泛泛的 AI design，将以下高端 coding concepts 系统化作为 baseline：
* **“Liquid Glass” Refraction:** 需要 glassmorphism 时，不要停留在 `backdrop-blur`。加入 1px inner border（`border-white/10`）和细微 inner shadow（`shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`），模拟实体边缘折射。
* **Magnetic Micro-physics（If MOTION_INTENSITY > 5）:** 实现会轻微朝鼠标 cursor 拉近的按钮。**CRITICAL:** 绝不要用 React `useState` 实现 magnetic hover 或连续动画。只在 React render cycle 外使用 Framer Motion 的 `useMotionValue` 和 `useTransform`，防止移动端性能崩溃。
* **Perpetual Micro-Interactions:** 当 `MOTION_INTENSITY > 5` 时，在标准组件（avatars、status dots、backgrounds）中嵌入连续、无限的 micro-animation（Pulse、Typewriter、Float、Shimmer、Carousel）。所有交互元素都应用高级 Spring Physics（`type: "spring", stiffness: 100, damping: 20`），不要 linear easing。
* **Layout Transitions:** 始终使用 Framer Motion 的 `layout` 和 `layoutId` props，在状态变化中实现平滑重排、resize 和 shared element transitions。
* **Staggered Orchestration:** 不要瞬时 mount lists 或 grids。使用 `staggerChildren`（Framer）或 CSS cascade（`animation-delay: calc(var(--index) * 100ms)`）创建顺序 waterfall reveal。**CRITICAL:** 对 `staggerChildren`，Parent（`variants`）和 Children 必须位于同一个 Client Component tree。如果数据异步获取，把数据作为 props 传入集中式 Parent Motion wrapper。

## 5. PERFORMANCE GUARDRAILS
* **DOM Cost:** Grain/noise filter 只应用在 fixed、pointer-event-none pseudo-elements 上（例如 `fixed inset-0 z-50 pointer-events-none`），绝不要应用到滚动容器，以防持续 GPU repaint 和移动端性能退化。
* **Hardware Acceleration:** 绝不要动画化 `top`、`left`、`width` 或 `height`。只通过 `transform` 和 `opacity` 做动画。
* **Z-Index Restraint:** 未被要求时，绝不要滥用任意 `z-50` 或 `z-10`。z-index 只用于系统层上下文（Sticky Navbars、Modals、Overlays）。

## 6. TECHNICAL REFERENCE（Dial Definitions）

### DESIGN_VARIANCE（Level 1-10）
* **1-3 (Predictable):** Flexbox `justify-center`、严格 12-column 对称 grids、相等 paddings。
* **4-7 (Offset):** 使用 `margin-top: -2rem` 重叠、变化的 image aspect ratios（例如 4:3 旁边放 16:9）、左对齐 headers 配居中 data。
* **8-10 (Asymmetric):** Masonry layouts、带 fractional units 的 CSS Grid（例如 `grid-template-columns: 2fr 1fr 1fr`）、巨大空白区（`padding-left: 20vw`）。
* **MOBILE OVERRIDE:** 对 4-10 级，任何 `md:` 以上的非对称布局，在 `< 768px` viewport 上都必须强力回退为严格单列布局（`w-full`、`px-4`、`py-8`），避免水平滚动和布局破裂。

### MOTION_INTENSITY（Level 1-10）
* **1-3 (Static):** 无自动动画。只使用 CSS `:hover` 和 `:active` states。
* **4-7 (Fluid CSS):** 使用 `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`。用 `animation-delay` cascade 做 load-in。严格聚焦 `transform` 和 `opacity`。谨慎使用 `will-change: transform`。
* **8-10 (Advanced Choreography):** 复杂 scroll-triggered reveal 或 parallax。使用 Framer Motion hooks。绝不要用 `window.addEventListener('scroll')`。

### VISUAL_DENSITY（Level 1-10）
* **1-3 (Art Gallery Mode):** 大量留白。巨大 section gaps。一切都显得非常昂贵、干净。
* **4-7 (Daily App Mode):** 标准 web app 的正常间距。
* **8-10 (Cockpit Mode):** 很小 paddings。不要 card boxes；只用 1px lines 分隔数据。一切都很紧凑。**Mandatory:** 所有数字使用 Monospace（`font-mono`）。

## 7. AI TELLS（Forbidden Patterns）
为保证输出高级且不泛化，除非明确要求，否则必须严格避免以下常见 AI design signatures：

### Visual & CSS
* **NO Neon/Outer Glows:** 不要使用默认 `box-shadow` glow 或 auto-glow。使用 inner borders 或细微 tinted shadows。
* **NO Pure Black:** 绝不要使用 `#000000`。使用 Off-Black、Zinc-950 或 Charcoal。
* **NO Oversaturated Accents:** 降低 accent 饱和度，让它优雅融入 neutrals。
* **NO Excessive Gradient Text:** 大标题不要使用 text-fill gradient。
* **NO Custom Mouse Cursors:** 它们已经过时，并且会破坏性能/可访问性。

### Typography
* **NO Inter Font:** 禁用。使用 `Geist`、`Outfit`、`Cabinet Grotesk` 或 `Satoshi`。
* **NO Oversized H1s:** 第一个 heading 不应该尖叫。用 weight 和 color 控制层级，而不是只靠巨大尺寸。
* **Serif Constraints:** 仅在 creative/editorial design 中使用 Serif fonts。**绝不要**在 clean Dashboards 中使用 Serif。

### Layout & Spacing
* **Align & Space Perfectly:** 确保 padding 和 margins 在数学上精确。避免带尴尬间隙的 floating elements。
* **NO 3-Column Card Layouts:** 禁用泛用的“3 个等宽横向 cards”feature row。改用 2-column Zig-Zag、asymmetric grid 或 horizontal scrolling approach。

### Content & Data (The "Jane Doe" Effect)
* **NO Generic Names:** 禁用 “John Doe”、“Sarah Chan” 或 “Jack Su”。使用高度有创意、听起来真实的名字。
* **NO Generic Avatars:** 不要用标准 SVG “egg” 或 Lucide user icons 做 avatar。使用有创意、可信的 photo placeholders 或具体 styling。
* **NO Fake Numbers:** 避免 `99.99%`、`50%` 或基础电话号码（`1234567`）这类可预测输出。使用有机、略 messy 的数据（`47.2%`、`+1 (312) 847-1928`）。
* **NO Startup Slop Names:** 避免 “Acme”、“Nexus”、“SmartFlow”。发明高级、贴合上下文的 brand names。
* **NO Filler Words:** 避免 “Elevate”、“Seamless”、“Unleash” 或 “Next-Gen” 这类 AI copywriting cliché。使用具体动词。

### External Resources & Components
* **NO Broken Unsplash Links:** 不要使用 Unsplash。使用绝对、可靠的 placeholders，例如 `https://picsum.photos/seed/{random_string}/800/600` 或 SVG UI Avatars。
* **shadcn/ui Customization:** 可以使用 `shadcn/ui`，但绝不能保持泛用默认状态。必须自定义 radii、colors 和 shadows，以匹配高端项目审美。
* **Production-Ready Cleanliness:** 代码必须极其干净、视觉强烈、令人记住，并在每个细节上精心打磨。

## 8. THE CREATIVE ARSENAL（High-End Inspiration）
不要默认生成泛用 UI。从这个 advanced concepts library 中取材，确保输出视觉强烈且令人记住。合适时，用 **GSAP (ScrollTrigger/Parallax)** 做复杂 scrolltelling，或用 **ThreeJS/WebGL** 做 3D/Canvas animations，而不是基础 CSS motion。**CRITICAL:** 绝不要在同一 component tree 中混用 GSAP/ThreeJS 和 Framer Motion。UI/Bento interactions 默认使用 Framer Motion。GSAP/ThreeJS 只用于隔离的 full-page scrolltelling 或 canvas backgrounds，并包在严格的 useEffect cleanup blocks 中。

### The Standard Hero Paradigm
* 停止在深色图片上叠居中文本。尝试非对称 Hero sections：文字干净地左对齐或右对齐。背景应使用高质量、相关的图片，并带细腻风格化 fade（根据 Light 或 Dark mode，优雅地暗入或亮入背景色）。

### Navigation & Menüs
* **Mac OS Dock Magnification:** Nav-bar 位于边缘；icons 在 hover 时流畅缩放。
* **Magnetic Button:** 按钮像实体一样朝 cursor 轻微吸附。
* **Gooey Menu:** Sub-items 像黏性液体一样从主按钮脱离。
* **Dynamic Island:** Pill-shaped UI component 变形展示 status/alerts。
* **Contextual Radial Menu:** 圆形菜单精确从点击坐标展开。
* **Floating Speed Dial:** FAB 以弹簧感展开成弧线排列的 secondary actions。
* **Mega Menu Reveal:** Full-screen dropdown 以 stagger-fade 展开复杂内容。

### Layout & Grids
* **Bento Grid:** 非对称、tile-based grouping（例如 Apple Control Center）。
* **Masonry Layout:** 无固定 row height 的错落 grid（例如 Pinterest）。
* **Chroma Grid:** Grid borders 或 tiles 展示细微、持续动画的 color gradients。
* **Split Screen Scroll:** 两个 screen halves 在 scroll 时朝相反方向滑动。
* **Curtain Reveal:** Hero section 在 scroll 时像幕布一样从中间打开。

### Cards & Containers
* **Parallax Tilt Card:** 跟随鼠标坐标的 3D tilting card。
* **Spotlight Border Card:** Card border 在 cursor 下动态发光。
* **Glassmorphism Panel:** 带 inner refraction borders 的真实 frosted glass。
* **Holographic Foil Card:** Hover 时流动的虹彩反光。
* **Tinder Swipe Stack:** 用户可滑走的实体感 cards stack。
* **Morphing Modal:** 按钮无缝扩展成自己的 full-screen dialog container。

### Scroll-Animations
* **Sticky Scroll Stack:** Cards 吸附到顶部并像实体一样彼此堆叠。
* **Horizontal Scroll Hijack:** 垂直 scroll 转换为平滑 horizontal gallery pan。
* **Locomotive Scroll Sequence:** Video/3D sequence 的 framerate 与 scrollbar 直接绑定。
* **Zoom Parallax:** 中央背景图片随 scroll 无缝放大/缩小。
* **Scroll Progress Path:** SVG vector lines 或 routes 随用户 scroll 自行绘制。
* **Liquid Swipe Transition:** 像黏性液体一样擦过屏幕的 page transition。

### Galleries & Media
* **Dome Gallery:** 像全景 dome 的 3D gallery。
* **Coverflow Carousel:** 中心聚焦、两侧向后倾斜的 3D carousel。
* **Drag-to-Pan Grid:** 可向任意方向自由拖动的无边界 grid。
* **Accordion Image Slider:** 细窄纵向/横向 image strips，在 hover 时完全展开。
* **Hover Image Trail:** 鼠标后方留下弹出/淡出的 image trail。
* **Glitch Effect Image:** Hover 时短暂 RGB-channel shifting 的数字失真。

### Typography & Text
* **Kinetic Marquee:** 无尽 text bands，在 scroll 时反向或加速。
* **Text Mask Reveal:** 巨大 typography 作为通向 video background 的透明窗口。
* **Text Scramble Effect:** Load 或 hover 时 Matrix-style character decoding。
* **Circular Text Path:** 文字沿旋转圆形路径弯曲排列。
* **Gradient Stroke Animation:** 描边文字中有 gradient 沿 stroke 持续流动。
* **Kinetic Typography Grid:** 字母 grid 躲避 cursor 或从 cursor 处旋转离开。

### Micro-Interactions & Effects
* **Particle Explosion Button:** 成功时碎裂成 particles 的 CTA。
* **Liquid Pull-to-Refresh:** Mobile reload indicator 像脱离的水滴。
* **Skeleton Shimmer:** 光反射在 placeholder boxes 上移动。
* **Directional Hover Aware Button:** Hover fill 从鼠标进入的精确方向进入。
* **Ripple Click Effect:** Visual waves 从点击坐标精确扩散。
* **Animated SVG Line Drawing:** Vector 实时绘制自己的轮廓。
* **Mesh Gradient Background:** 有机、像 lava-lamp 的 animated color blobs。
* **Lens Blur Depth:** 动态 focus blur 背景 UI layers，以突出 foreground action。

## 9. “MOTION-ENGINE” BENTO PARADIGM
生成现代 SaaS dashboards 或 feature sections 时，必须使用以下 “Bento 2.0” architecture 和 motion philosophy。它超越静态 cards，并强制形成高度依赖 perpetual physics 的 “Vercel-core meets Dribbble-clean” aesthetic。

### A. Core Design Philosophy
* **Aesthetic:** 高端、极简、功能明确。
* **Palette:** Background 使用 `#f9fafb`。Cards 是纯白（`#ffffff`），带 1px `border-slate-200/50` border。
* **Surfaces:** 所有主要 containers 使用 `rounded-[2.5rem]`。应用 “diffusion shadow”（很轻、扩散范围大的阴影，例如 `shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`），在不制造杂乱的情况下形成深度。
* **Typography:** 严格使用 `Geist`、`Satoshi` 或 `Cabinet Grotesk` font stack。Headers 使用细微 tracking（`tracking-tight`）。
* **Labels:** Titles 和 descriptions 必须放在 cards **外部且下方**，保持干净的 gallery-style presentation。
* **Pixel-Perfection:** Cards 内部使用宽裕 `p-8` 或 `p-10` padding。

### B. The Animation Engine Specs (Perpetual Motion)
所有 cards 都必须包含 **“Perpetual Micro-Interactions”**。使用以下 Framer Motion principles：
* **Spring Physics:** 不要 linear easing。使用 `type: "spring", stiffness: 100, damping: 20`，获得高级、有重量的手感。
* **Layout Transitions:** 大量使用 `layout` 和 `layoutId` props，确保平滑重排、resize 和 shared element state transitions。
* **Infinite Loops:** 每张 card 必须有无限循环的 “Active State”（Pulse、Typewriter、Float 或 Carousel），确保 dashboard 感觉“活着”。
* **Performance:** 用 `<AnimatePresence>` 包裹 dynamic lists，并优化到 60fps。**PERFORMANCE CRITICAL:** 任何 perpetual motion 或 infinite loop 都必须 memoized（React.memo），并完全隔离在自己的微型 Client Component 中。绝不要触发 parent layout re-renders。

### C. The 5-Card Archetypes (Micro-Animation Specs)
构建 Bento grids 时实现这些特定 micro-animations（例如 Row 1: 3 cols | Row 2: 2 cols split 70/30）：
1. **The Intelligent List:** 带无限 auto-sorting loop 的垂直 items stack。Items 使用 `layoutId` 交换位置，模拟 AI 实时给任务排序。
2. **The Command Input:** 带 multi-step Typewriter Effect 的 search/AI bar。它循环展示复杂 prompts，包括 blinking cursor 和带 shimmering loading gradient 的 “processing” state。
3. **The Live Status:** 带“呼吸”状态指示器的 scheduling interface。加入一个 pop-up notification badge，用 “Overshoot” spring effect 出现，停留 3 秒后消失。
4. **The Wide Data Stream:** Data cards 或 metrics 的水平 “Infinite Carousel”。确保 loop 无缝（使用 `x: ["0%", "-100%"]`），速度显得轻松。
5. **The Contextual UI (Focus Mode):** Document view 先对 text block 做 staggered highlight 动画，然后让带 micro-icons 的 floating action toolbar “Float-in”。

## 10. FINAL PRE-FLIGHT CHECK
输出前按此矩阵评估代码。这是应用到逻辑上的**最后**过滤器。
- [ ] Global state 是否恰当地用于避免深层 prop-drilling，而不是随意使用？
- [ ] 高 variance design 是否保证 mobile layout collapse（`w-full`、`px-4`、`max-w-7xl mx-auto`）？
- [ ] Full-height section 是否安全使用 `min-h-[100dvh]`，而不是有 bug 的 `h-screen`？
- [ ] `useEffect` animations 是否包含严格 cleanup functions？
- [ ] 是否提供 empty、loading 和 error states？
- [ ] 能用 spacing 表达时，是否省略 cards？
- [ ] 是否严格把 CPU-heavy perpetual animations 隔离在自己的 Client Components 中？
