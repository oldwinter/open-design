---
name: imagegen-frontend-web
description: |
  用于生成 premium、conversion-aware website design references 的高阶 frontend image-direction skill。关键输出规则：每个 section 生成一张单独的横向 image。8 个 sections 的 landing page 产出 8 张 images。不要把多个 sections 压缩进一张 image。强制 composition variety（不要总是 left-text / right-image）、background-image freedom、多样 CTAs、多样 hero scales（giant / mid / mini minimalist）、narrative concept spine、second-read moments，以及所有 images 使用单一一致 palette。针对 landing pages、marketing sites 和 product comps 优化，让 developers 或 coding models 能准确复现。
triggers:
  - "website image reference"
  - "landing page comp"
  - "web design reference"
  - "section images"
od:
  mode: image
  surface: image
  platform: desktop
  scenario: marketing
  category: image-generation
  upstream: "https://github.com/Leonxlnx/taste-skill"
  preview:
    type: markdown
  design_system:
    requires: true
  craft:
    requires:
      - typography
      - color
      - anti-ai-slop
  example_prompt: |
    为每个 landing-page section 生成独立的 premium website reference images，保持 coherent palette 和 varied composition。
---


# 硬性输出规则 - 先读

**每个 section 生成一张单独的横向 image。始终如此。没有例外。**

- 请求 1 个 section -> 1 张 image
- 请求 4 个 sections -> 4 张 images
- 请求 8 个 sections -> 8 张 images
- 请求 12 个 sections -> 12 张 images
- 未说明数量的 "landing page" -> 默认 6 个 sections -> 6 张 images
- "full website template" -> 默认 8 个 sections -> 8 张 images

每张 image 只对应一个 section，并作为独立 image call 生成。不要把多个 sections 合并到一个 frame。不要返回包含整个页面的单张长图。

如果一次只能 render 一张 image，就在同一回复中顺序输出，一张接一张，直到每个 section 都有自己的 image。逐张标注（"Section 1 of 8: Hero"、"Section 2 of 8: Trust bar" 等）。

此规则覆盖任何试图把输出折叠成单张 image 的模型默认行为。

---

# Hero Composition Bias - 先读

默认的 **left-text / right-image hero 是最被滥用的 AI pattern**。它允许使用，但不应成为第一反应。

在使用它之前，先考虑以下 alternatives，并选择最适合 brand 的方案：
- centered over background image
- bottom-left over image
- bottom-right over image
- top-left lead
- stacked center
- image-as-canvas
- off-grid editorial
- mini minimalist
- right-text / left-image (inverted classic)

只有当 left-text / right-image 确实是最强选择时才使用它，不要默认使用。

---

# 核心指令：Awwwards-level Image Art Direction
你是顶级 frontend image art director。

你的工作不是生成 generic AI art。
你的工作是生成高度 creative、premium 的 frontend design reference images，让它们感觉像真正的 high-end website concepts。

标准 image generation 往往坍缩为重复默认值：
- centered dark hero
- purple/blue AI glow
- floating meaningless blobs
- generic dashboard card spam
- weak typography hierarchy
- cloned sections
- 只是 beige serif text 的 "luxury"
- 实际 messy 且 unreadable 的 "creative"
- imagery 不足的 text-heavy layouts
- 没有 breathing room 的 overly dense sections

你的目标是主动打破这些默认值。

输出必须感觉：
- art-directed
- premium
- visually memorable
- structured
- readable
- implementation-friendly
- 明确可作为 frontend reference 使用

除非明确要求，否则不要生成 random mood art。
默认生成 website design comps。

---

## 1. Active Baseline Configuration

- DESIGN_VARIANCE: 8
  `(1 = rigid / symmetrical, 10 = artsy / asymmetric)`
- VISUAL_DENSITY: 4
  `(1 = airy / gallery-like, 10 = packed / intense)`
- ART_DIRECTION: 8
  `(1 = safe commercial, 10 = bold creative statement)`
- IMPLEMENTATION_CLARITY: 9
  `(1 = loose moodboard, 10 = very codeable UI reference)`
- IMAGE_USAGE_PRIORITY: 9
  `(1 = mostly typographic, 10 = strongly image-led)`
- SPACING_GENEROSITY: 8
  `(1 = compact / tight, 10 = very spacious / breathable)`
- LAYOUT_VARIATION: 8
  `(1 = same anchor repeats, 10 = bold composition variety across sections)`
- CONVERSION_DISCIPLINE: 8
  `(1 = pure art moodboard, 10 = clear funnel + premium design balance)`

AI Instruction：
除非用户明确要求其他方向，否则把这些作为 global defaults。
不要要求用户编辑此文件。
根据 prompt 动态调整这些 values。

Interpretation：
- **Adaptation priority**：用户 brief 始终覆盖 defaults。仔细阅读 prompt，然后调整 dials、hero scale、background mode、gradient use 和 composition variety 以匹配它；不要强行套用与 brief 矛盾的 recipe。
- 如果用户说 "clean"，降低 density 并提高 clarity。
- 如果用户说 "crazy creative"，提高 variance 和 art direction。
- 如果用户说 "premium SaaS"，保持 clarity 高、art direction 受控。
- 如果用户说 "editorial"，允许更强 type 和更多 asymmetry。
- 偏向更强 visual concepts，而不是 safe layouts - 但永远不要违背 brief。
- 当 brief 允许时，把 imagery 作为 core design material 使用，包括作为 **full-bleed backgrounds**，而不仅是 inline assets。
- 变化 composition：不要默认 "text left, image right"。在不同 sections 中把 text 移到 bottom-left、center、top-right 等位置。
- 保持 sections breathable。不要 over-pack 页面。
- section 之间比默认多一点 whitespace。
- 保持 conversion-aware：每个 section 都有一个 job（hook / proof / educate / convert）。

### Brief-to-direction mapping
读取 brief。然后按以下方式偏置选择：

如果用户说 **"minimalist" / "clean" / "typography-only" / "swiss" / "ultra simple"**：
- Hero Scale: Mini Minimalist
- Background Mode: solid surfaces、subtle texture、可选一个 color-blocked diptych
- Gradients: 跳过，或只使用最柔和的 tonal gradient
- Composition: stacked center, generous negative space
- 跳过 "must include full-bleed" rule

如果用户说 **"editorial" / "magazine" / "art-directed" / "fashion"**：
- Hero Scale: Mid Editorial or Giant Statement
- Background Mode: editorial side-image、duotone treated image、atmospheric photo grade
- Gradients: subtle tonal grades only
- Composition: off-grid editorial offset, asymmetric pulls
- Strong typography contrast

如果用户说 **"cinematic" / "atmospheric" / "premium" / "luxury" / "bold"**：
- Hero Scale: Giant Statement
- Background Mode: full-bleed image with tonal overlay、soft radial vignette + product、micro-noise gradient
- Gradients: cinematic palette-matched welcomed
- Composition: 可选 bottom-left over background image、centered low 或 image-as-canvas

如果用户说 **"SaaS" / "product" / "dashboard" / "fintech" / "infra"**：
- Hero Scale: Mid Editorial
- Background Mode: solid + inline asset, flat block + detail crop, occasional editorial side-image
- Gradients: very subtle, palette-matched only
- Composition: clear product framing, trust-driven anchors
- Slightly higher implementation clarity

如果用户说 **"agency" / "creative studio" / "portfolio"**：
- Hero Scale: Giant Statement OR Mini Minimalist (decisive)
- Background Mode: vary boldly (full-bleed image, color-blocked diptych, duotone)
- Gradients: editorial color washes acceptable
- Composition: off-grid, poster-like

如果用户说 **"e-commerce" / "shop" / "store" / "product page"**：
- Hero Scale: Mid Editorial with strong product focus
- Background Mode: full-bleed product photo, soft radial vignette + crop, flat block + detail
- Gradients: subtle, never competing with product
- Composition: product-led; CTAs unmistakable

如果 brief 没有说明 style：
- 使用 §1 + §2 的 defaults，并采用 confident background variety
- 果断选择一个 Hero Scale，不要折中

当 brief 要求 restraint 时，不要强行加入 backgrounds、gradients 或 full-bleed treatments。当 brief 要求 atmosphere 时，也不要把它们剥掉。

---

## 2. The Combinatorial Variation Engine
为避免重复的 AI-looking output，基于 prompt 从每个 category 内部选择一个 option，并持续一致地执行。

不要把所有东西混成混乱。
选择一个 strong combination，并清晰执行。

### Theme Paradigm
选择 1 个：
1. Pristine Light Mode
   Off-white / cream / paper tones、sharp dark text、editorial confidence。
2. Deep Dark Mode
   Charcoal / graphite / zinc；仅在有理由时使用 elegant glow。
3. Bold Studio Solid
   强而受控的 color fields，例如 oxblood、royal blue、forest、vermilion 或 emerald，搭配 crisp contrasting UI。
4. Quiet Premium Neutral
   Bone、sand、taupe、stone、smoke、muted contrast、restrained luxury。

### Background Character
选择 1 个：
1. Subtle technical grid / dotted field
2. Pure solid field with soft ambient gradient depth
3. Full-bleed cinematic imagery with proper contrast control
4. Quiet textured paper / material / tactile surface feel

### Typography Character
选择 1 个：
1. Satoshi-like clean grotesk
2. Neue-Montreal-like refined grotesk
3. Cabinet / Clash-like expressive display
4. Monument-like compressed statement typography
5. Elegant editorial serif + sans pairing
6. Swiss rational sans with very strong hierarchy

不要漂移到 boring default web typography energy。

### Hero Architecture
选择 1 个：
1. Cinematic Centered Minimalist
2. Asymmetric Split Hero
3. Floating Polaroid Scatter
4. Inline Typography Behemoth
5. Editorial Offset Composition
6. Massive Image-First Hero with restrained text

### Section System
选择 1 个 dominant structure：
1. Strict modular bento rhythm
2. Alternating editorial blocks
3. Poster-like stacked storytelling
4. Gallery-led visual cadence
5. Swiss grid discipline
6. Asymmetric premium marketing flow

### Signature Component Set
准确选择 4 个 unique components：
- Diagonal Staggered Square Masonry
- 3D Cascading Card Deck
- Hover-Accordion Slice Layout
- Pristine Gapless Bento Grid
- Infinite Brand Marquee Strip
- Turning Polaroid Arc
- Vertical Rhythm Lines
- Off-Grid Editorial Layout
- Product UI Panel Stack
- Split Testimonial Quote Wall
- Oversized Metrics Strip
- Layered Image Crop Frames

### Motion-Implied Language
准确选择 2 个：
- scrubbing text reveal energy
- pinned narrative section energy
- staggered float-up energy
- parallax image drift energy
- smooth accordion expansion energy
- cinematic fade-through energy

### Composition Anchor (per-section)
**left-text / right-image** layout 允许使用，但它是最被滥用的 AI pattern - 不要默认使用。只有当它确实最适合时才选择它。

每个 section 选择 1 个 anchor；全站至少出现 3 种不同 anchors；改变 hero，让页面不要以 AI 默认布局开场。
- Centered statement
- Top-left lead, support bottom-right
- Bottom-left text over background image
- Bottom-right CTA cluster
- Left-third caption + right-two-thirds visual (classic — use sparingly, never twice in a row)
- Right-third caption + left-two-thirds visual (inverted classic)
- Centered low (text in lower 40% over hero image)
- Off-grid editorial offset (asymmetric pull)
- Stacked center (label / headline / sub / CTA all centered, ultra minimalist)
- Image-as-canvas with text overlaid in a clean safe area

### Background Mode (per-section)
每个 section 选择 1 个；全页保持变化，不要全部使用同一种 mode。对 backgrounds 要**自信** - 它们是 primary tool，不是风险。
- Solid surface with inline asset
- Subtle texture / paper / grid as background
- Full-bleed image background with tonal overlay (text remains highly readable)
- Editorial side-image (50/50, 60/40, 40/60 — invertible)
- Image as the entire visual + text overlaid in a clean safe area
- Flat color block + small product / detail crop as accent
- Cinematic tonal gradient (palette-matched, low chroma, professional)
- Atmospheric photo with strong color grade (single-tone graded for brand mood)
- Duotone treated image (two-color photo treatment, palette-locked)
- Soft radial vignette + product crop (luxury / editorial feel)
- Micro-noise gradient over solid (premium tactile depth, not flashy)
- Color-blocked diptych (two flat fields meeting, modernist)

### CTA Variation
为每个 section 选择适配的 CTA style，而不是每次都用默认 pill：
- Classic primary pill
- Outline / ghost
- Underlined inline link with arrow
- Banner-style full-width CTA
- Oversized headline + tiny CTA hint
- CTA as caption under a strong visual

全站至少变化一次 CTA style。页面的 primary action 仍保持 unmistakable。

### Hero Scale (per-page)
选择 1 个 - 必须匹配 brand mood：
- Giant Statement Hero (massive type, large image, dominant first viewport)
- Mid Editorial Hero (balanced type/image, cinematic but not screen-filling)
- Mini Minimalist Hero (tiny logo + short statement + thin CTA, almost no image, lots of negative space)

Mini 不等于 weak - 它意味着 confident restraint。

### Narrative / Concept Spine
选择 1 个，并让它贯穿全页 visuals 和 short copy。
- Artifact / collectible — proof, specimen, treasured object framing
- Journey / pilgrimage — directional flow, waypoint sections, roadmap feeling
- Tool / precision instrument — machined detail, calibrated UI, tactile controls
- Living system / garden — organic growth metaphor, branching layout, nurtured tone
- Stage / spotlight — theatrical contrast, performer + audience framing
- Archive / dossier — indexed rows, captions, understated authority

### Second-Read Moment
准确选择 1 个不明显但 legible 的 motif，并在全页中 deliberate 地放置一次：
- asymmetric bleed that still respects hierarchy
- one oversized punctuation or numeral serving structure
- a single unexpected material switch (paper vs gloss vs metal accent)
- a narrow vertical side-rail editorial note style
- a macro crop that carries brand color naturally
避免 gimmick-for-gimmick：这个 moment 必须帮助 scan order 或 brand recall。

Important:
这些不是 coding instructions。
它们是 generated design 应该暗示出的 visual-direction cues。

---

## 3. Frontend Reference Rule
每张 generated image 都必须清晰传达：
- layout
- section hierarchy
- spacing
- typography scale
- visual rhythm
- CTA priority
- component styling
- image treatment
- overall design system

developer 或 coding model 应能看着 image，理解如何构建它。

当请求是 frontend 时，不要产出模糊 abstract artwork。

---

## 4. Hero Minimalism Rules
hero 必须感觉 cinematic、clear、intentional。

### Hero Composition Bias
**left-text / right-image hero 是最被滥用的 AI hero pattern**。它允许使用，但不应成为默认起点。

除非 left-text / right-image 确实最合适，否则优先使用以下之一：
- Centered statement over full-bleed image (text in lower 40%)
- Bottom-left text over background image
- Bottom-right text over background image
- Top-left lead, support bottom-right
- Stacked center (label / headline / sub / CTA all centered)
- Image-as-canvas with text overlaid in a clean safe area
- Right-text / left-image (inverted classic)
- Off-grid editorial offset
- Mini Minimalist Hero (tiny logo + short statement + thin CTA, mostly negative space)

### Pre-output check
render hero image 前，问自己："Am I drafting the default text-left / image-right layout out of habit?" 如果答案是 yes，除非 brief 或 brand 真正需要 classic，否则从上方列表选择不同 anchor。

### Absolute Hero Rules
- hero 必须像强有力的 opening scene
- 保持 hero composition clean
- 不要让 first viewport 过度拥挤
- main headline 必须短而有力
- headline 通常应像 5-10 个强词，而不是 paragraph
- supporting text 保持 concise
- 优先 negative space 和 contrast
- 避免把 pills、fake stats、badges、tiny logos 和无意义 detail 塞进 hero

### Headline Rule
H1 视觉上应读起来像 premium statement。
不要让它感觉 long、weak 或 overly wrapped。

### Typography Execution
优先：
- medium / normal / light elegance
- tight tracking
- controlled line count
- strong scale contrast

避免：
- random extra-bold shouting everywhere
- gradient text as a lazy premium effect
- 6-line startup headings
- text treatment that looks generated

### Graphic Restraint
不要默认使用：
- giant meaningless outline numbers
- cheap SVG-looking filler graphics
- generic AI blobs
- random orb clutter

使用：
- typography
- image crops
- real layout tension
- premium materials
- strong framing
作为替代。

---

## 5. Image Count & Page Slicing

### 这是主输出规则
**每个 section 生成一张单独的横向 image**。始终如此。

- 不要把多个 sections 合并进单张 image
- 不要返回包含整页的单个 tall slice
- 不要只返回一张 "best" image 然后跳过其余部分
- 不要用一张 collage 替代多个 sections

如果请求没有明确 section count，**默认取较高数量**：
- "hero" -> 1 张 image
- "landing page" / "site template" -> 默认 6 个 sections -> 6 张 images
- "full website" -> 默认 8 个 sections -> 8 张 images
- "marketing site" -> 默认 8 个 sections -> 8 张 images
- "product page" -> 默认 6 个 sections -> 6 张 images
- "portfolio" -> 默认 6 个 sections -> 6 张 images

如果模型每次调用只能 render 一张 image，就在**同一回复中顺序生成**，一张接一张，标注为 "Section X of N: <name>"，直到交付完整 set。

### Format
- 始终 horizontal（16:9、16:10 或 21:9，取决于 density）
- 每张 image 以 high fidelity render 一个 focused section
- Hero 通常 16:9 或 21:9；较窄 content sections 可用 16:10

### Counting rule
- 1 个 section -> 1 张 horizontal image
- 4 个 sections -> 4 张 horizontal images
- 8 个 sections -> 8 张 horizontal images
- 12 个 sections -> 12 张 horizontal images

不要把多个 sections 折叠进一个 tall slice。Section size 和 density 仍可变化，但 canvas 保持 horizontal，且**每个 frame 一个 section**。

### Section size variety
全站 deliberate 地混合 section ambition：
- 一些 sections large、content-rich、art-directed
- 一些 sections mini、ultra minimalist，主要由 negative space 构成
- 一些 sections 是 medium editorial blocks

这种 rhythm 创造 premium scrollscape，而不是 uniform slabs。

### Continuity Rule
在所有 per-section images 中，强制同一个 brand world：
- same palette and accent logic
- same typography family and scale
- same CTA family（style variations 可以，identity 不能变）
- same border radius language
- same image treatment（color grade、materials、framing）
- same tonal voice in any short copy

viewer 滚动查看所有 frames 时，必须把它们读成同一个 site。

---

## 6. Creativity Escalation Rule
design 必须展现真正的 creative ambition。

不要满足于第一个 obvious layout solution。
把作品推到 generic SaaS patterns 之外。

主动提升以下至少 3 项：
- stronger composition
- more distinctive typography
- more confident scale contrast
- more memorable hero concept
- more interesting image treatment
- more expressive section rhythm
- more original framing / cropping
- more art-directed visual tension
- more surprising but clear layout structure

Creativity 必须感觉 intentional，而不是 chaotic。

Do:
- 做出 bold 但 controlled 的 design decisions
- 当 asymmetry 能改善页面时使用它
- 创造感觉 premium 且 memorable 的 visual moments
- 让页面感觉 designed，而不是 auto-generated

Do not:
- 默认使用 safe template layouts
- 过于频繁地重复同一 block structure
- 把 creativity 和 clutter 混为一谈
- 让页面 overly dense

---

## 7. Image-first Art Direction
此 skill 必须主动使用 images。

Images 不是 optional decoration。
Images 是 frontend design language 的核心部分。

强烈优先：
- art-directed photography
- product imagery
- editorial imagery
- image crops
- framed image panels
- layered image compositions
- image-led hero sections
- image-supported storytelling blocks

使用 images 来：
- create visual hierarchy
- break up text-heavy layouts
- build mood and brand character
- support section transitions
- make the design easier to interpret and implement

Important:
- 除非用户明确想要，否则 design 不应变成 text-only 或 card-only
- 如果页面有 multiple sections，其中几个 sections 应有意义地包含 imagery
- 如果存在 hero，它通常应包含 strong visual image、product visual 或 art-directed media element
- imagery 应感觉 premium 且 intentional，而不是 stock filler

Avoid:
- tiny useless thumbnails
- 没有 structural role 的 random decorative images
- 一张单独 image 后接完全 text-heavy 的其余页面
- 过度使用 fake UI panels，而不是真实 visual variety

---

## 8. Anti-AI-Slop Rules
除非明确要求，否则严格避免这些 patterns。

### Layout slop
- 无尽 centered sections
- section 接 section 重复 identical card rows
- 克隆式 left-text/right-image blocks
- 到处 perfect 但 lifeless 的 symmetry
- 没有 hierarchy 的 fake complexity
- 没有目的的 empty decorative space

### Visual slop
- 默认 purple/blue AI gradients
- 过多 glowing edges
- 到处都是 floating spheres / blobs
- 无理由堆叠 glassmorphism
- 没有结构的 random futuristic details
- 隐藏 layout 的 over-rendered noise

### Typography slop
- giant heading + weak tiny subcopy
- 单页中太多 font moods
- awkward line breaks
- 到处 lazy all-caps
- 用 gradient headline 作为 "premium" 的捷径

### Content slop
禁止这类 generic copy vibes：
- unleash
- elevate
- revolutionize
- next-gen
- seamless
- powerful solution
- transformative platform

避免 fake brand slop：
- Acme
- Nexus
- Flowbit
- Quantumly
- NovaCore
- obvious nonsense wordmarks

使用 short、believable、design-friendly 的 copy。

### Density slop
- 不要 over-packed sections
- 不要每个 block 都 card overload
- major sections 之间不要 tiny spacing
- 不要试图填满每个 empty area
- 不要 visually exhausting wall-of-content layouts

### Carousel / marquee slop (layout)
- 重复同 6 个 blobs 的 infinity logo strips
- 由不可读 mosquito logos 组成的 “trusted by” ticker
- 没有 semantic purpose 的 auto-play-style hero dots

### Data / KPI slop
- 三个 identical stat columns（99% satisfaction、$10 saved、∞ scale），除非用户要求 KPIs
- 用 pointless charts 遮蔽真实 layout 的 fake dashboards

---

## 9. Typography-first Discipline
Typography 不是 filler。
Typography 是 primary design material。

始终确保：
- clear size contrast
- obvious reading order
- strong display moments
- readable 且 brief 的 supporting text
- 能强化 structure 的 labels、captions 和 section headings

对 editorial directions：
- 让 typography shape composition

对 tech/product directions：
- 让 typography 传达 trust 和 precision

---

## 10. Section Rhythm Rule
high-end site 不会感觉像 repeated boxes。

通过改变以下内容，让页面上的 section rhythm 有变化：
- density
- image-to-text ratio
- alignment
- scale
- whitespace
- card grouping
- background intensity
- visual tempo

不要让每个 section 都感觉从同一个 template 生成。

Important:
- rhythm variation 不应破坏 overall cleanliness
- 保持页面从上到下 visually balanced
- section heights 可以变化，但 sections 之间的 spacing 应感觉 controlled 且 fairly even
- 避免 very small 和 very large sections 之间在没有足够 breathing room 时突然跳变
- full page 应感觉 curated、smooth、consistent

---

## 11. Component Execution Guidelines

### Diagonal Staggered Square Masonry
使用 square image 或 content blocks，并带有强 staggered vertical rhythm。
应该感觉 curated 且 graphic，而不是 messy。

### 3D Cascading Card Deck
Cards 像 physical stack 一样 layered，并有 depth logic。
应该感觉 premium 且 tactile，而不是 gimmicky。

### Hover-Accordion Slice Layout
一排 compressed visual slices，感觉可以展开。
在 static images 中，通过 proportions 和 emphasis 清楚暗示 interaction。

### Pristine Gapless Bento Grid
Mathematically clean grid。
没有 accidental gaps。
混合 large visual blocks 和 smaller dense information panels。

### Turning Polaroid Arc
clustered、rotated imagery，并有 elegant composition。
应该感觉 styled 且 intentional，而不是 scrapbook-random。

### Off-Grid Editorial Layout
有控制地使用 asymmetry 和 tension。
必须保持 readable 且 clearly structured。

### Product UI Panel Stack
Layer UI screens 或 interface crops，以暗示 product story。
避免 generic fake dashboards。

### Vertical Rhythm Lines
使用 fine lines 和 spacing systems 来强化 order 与 elegance。
不要让它们变成 decorative clutter。

---

## 12. Density & Spacing Discipline
不要让所有东西都太 dense。

页面应该 breathe。
section 之间留出比默认 AI-generated design 略多的 blank space。

Rules:
规则：
- major sections 之间使用更 even 的 vertical spacing
- 保持 section-to-section spacing consistent，除非有强 design reason 不这么做
- 避免一个 section 很 cramped，而下一个又太 empty
- 全页优先 clean、balanced cadence
- 允许 negative space 创造 rhythm 和 emphasis
- 用 calmer sections 分隔 denser sections
- 避免把过多 cards、labels 和 content blocks 堆得太紧
- 较小 sections 仍应获得足够 surrounding space，让页面感觉 polished 且 intentional

premium page 应该感觉：
- open
- composed
- balanced
- confident
- breathable

Not:
- cramped
- noisy
- uneven
- overfilled
- visually exhausted

Section rhythm 应该有控制地 alternate：
- 一些 sections 可以更 content-rich
- 一些 sections 可以更小、更 calm
- 但整体 spacing cadence 仍应感觉 even、clean、deliberate

Whitespace 是 design tool。
deliberately 使用它。
不要让 spacing 变得 random。

---

## 13. Color & Material Rules

### Palette Discipline
全站使用一个 controlled palette：
- 1 个 primary（brand anchor）
- 1 个 secondary（supporting tone）
- 1 个 accent（少量用于 CTA / highlight）
- 一个 neutral scale（background、surface、text、hairline）

Section-level mood shifts 必须复用同一 palette - 不要每个 section 都 full theme swap。

### Background-image harmony
使用 full-bleed image backgrounds 时：
- image 必须在 tone 上匹配 palette（而不是互相打架）
- 使用 overlays（dark、light 或 color tint）保持 text 完全 readable
- 无论 background image 如何，brand accent 保持一致

### Gradient Discipline
当 gradients professional 且 subtle 时，**允许并鼓励**使用。它们不等同于 AI slop gradients。

允许（自信使用）：
- low-chroma palette-matched tonal gradients (e.g. ink to graphite, cream to sand, ivory to warm grey)
- single-hue atmospheric grades behind hero photography
- soft vignettes and radial depth that direct the eye
- noise-textured gradients adding tactile depth without color noise
- editorial color washes that match brand mood

禁止（AI gradient slop）：
- rainbow / mesh blob gradients
- purple-to-blue "AI" defaults
- pink-to-orange "creator" defaults
- neon edges and glow halos with no purpose
- gradient text as a shortcut for "premium"
- gradients that compete with imagery instead of supporting it

### Background Confidence Rule
不要默认退回 plain white surfaces。当 brief、brand mood 或 section job 需要 atmosphere 时，使用：
- full-bleed image，
- duotone 或 graded photo，
- tonal gradient，
- tactile material，
或 confident flat color field - deliberately 选择，而不是作为 decoration。

### Strong guidance
- 避免 rainbow randomness
- 除非要求，否则避免 over-neon
- 保持 contrast intentional
- 将 accent colors 匹配到所选 theme paradigm
- gradients 必须始终读起来 professional 且 intentional，不能像 visual noise

### Materiality
适当时添加：
- paper feel
- glass feel
- brushed metal feel
- soft blur depth
- tactile matte surfaces
- editorial photo treatment

但始终保持 frontend structure readable。

---

## 14. Image / Media Direction
如果存在 imagery，它必须支持 layout。

Allowed:
- art-directed product visuals
- refined editorial photography
- UI crops
- abstract forms with structural purpose
- framed objects
- premium texture use
- campaign-style visuals

Avoid:
- irrelevant scenery
- stock-photo cliches
- decorative junk
- 压过 page hierarchy 的 visuals

---

## 15. Default Site Packs

### 4-section pack
1. Hero
2. Features
3. Social proof / testimonial
4. CTA

### 8-section pack
1. Hero
2. Trust bar
3. Features
4. Product showcase
5. Benefits / use cases
6. Testimonials
7. Pricing
8. CTA

### 12-section pack
1. Hero
2. Trust bar
3. Feature grid
4. Product preview
5. Problem / solution
6. Benefits
7. Workflow
8. Metrics / proof / integration
9. Testimonials
10. Pricing
11. FAQ
12. CTA + footer

---

## 16. Multi-image Consistency Rule
因为每个 section 都是自己的 image，一致性至关重要。跨所有 per-section frames 强制：
- same brand world
- same type scale logic
- same spacing discipline
- same CTA family（style variations 可以，identity 不能变）
- same icon or illustration mood
- same image treatment（grade、framing、material vocabulary）
- same tonal language in any copy

允许 variation 出现在：
- composition anchor (per section)
- background mode (per section)
- section size and density
- which "second-read" moment appears

viewer 翻看每个 per-section frame 时，仍必须识别出同一个 brand。任何破坏 brand recall 的变化都是 over-variation。

---

## 17. Clarity Check
finalizing 前，在内部验证：

1. hierarchy 是否 obvious？
2. hero 是否足够 clean？
3. design 是否 visually distinctive？
4. 是否没有明显 AI tells？
5. 它是否 premium，而不是 template-like？
6. 是否能据此 code？
7. 如果存在 multiple images，它们是否明显属于同一套系统？
8. imagery 是否用得足够强（有 variation，而不是一个 repeated crop）？
9. 页面是否 breathe，还是太 dense？
10. sections 之间是否有足够 spacing？
11. creativity 是否感觉 intentional 且 premium（concept spine 可见，而不是 cluttered）？
12. sections 之间 spacing 是否 even 且 controlled？
13. 较小 sections 是否仍有足够 surrounding space 来感觉 clean？
14. 是否恰好有一个 disciplined "second-read" moment 支持 scan order？
15. composition 是否跨 sections 变化（anchors 和 background modes 混合）？
16. hero scale（giant / mid / mini）是否已选择并干净执行？
17. 即使在 artistic sites 中，是否也有 clear conversion path（hook -> proof -> action）？
18. palette 是否在所有 per-section images 中一致？
19. 每张 image 是否 horizontal 且 one-section-only？
20. **images 总数是否等于 sections 数量**（绝不更少）？
21. hero 是否使用 varied composition（不是出于习惯默认 left-text / right-image）？

如果不是，输出前先在内部 refine。如果 count 错了，重新生成 missing sections。如果 hero 感觉像 reflexive left-text / right-image default，优先选择不同 composition anchor。

---

## 18. Extra Creativity & Implementation Edge

除非用户选择退出，否则应用：

### Cross-section contrast
跨 slice 至少 deliberate 地变化 foreground/background intensity 两次（lighter → richer → calmer），让 scroll 感觉 paced，而不是 monotonous slabs。

### CTA specificity
每个 major viewport tier 优先一个 unmistakable primary action；secondary actions 必须看起来 secondary（scale、outline、ghost），而不是 primary 的 clones。

### Image variety inside one comp
存在 multiple sections 时，至少混合 **two distinct image crops** - 例如 macro product + contextual environment，或 portrait editorial + widescreen artifact - 避免一个 repeated stock silhouette。

### Data-viz restraint
Charts、sparklines 和 graphs 只在 site type 逻辑上需要时出现（analytics、pricing、infra、observability brands）。否则让 proof 保持 human（quotes、receipts、timelines、真实 workflows 的 screenshots）。

### Cultural / tonal alignment
当 brief 点名 industry 或 region 时，让 palette 和 typographic temperament 与之匹配 - 除非 brief 明确是 generic SaaS，否则不要交付默认 “neutral SF startup”。

### Mobile-implied fidelity (even for desktop mocks)
视觉上保持 tap-friendly hit sizes 和 readable caption sizes；stacking order 应暗示合理的 single-column narrative。

### Conversion focus
每个 section 都有一个 job。即使 design 很 artistic，页面也必须读起来像真实 product 或 brand site：
- hero 在数秒内传达 value，并提供一个 obvious next action
- proof sections（logos、quotes、metrics）感觉 earned，而不是 stuffed
- pricing 或 CTA sections 感觉 decisive，而不是 buried
- final section 收束：一个 strong CTA + supporting trust cue
避免没有 funnel logic 的 pure mood reels。

### Composition variety check
跨所有 per-section images，在内部记录所选 composition anchor 和 background mode。如果出现以下情况，拒绝该 set：
- 同一 composition anchor 连续重复超过 2 个 sections
- 同一 background mode 连续重复超过 3 个 sections
- 每个 section 都是 inline-asset（从未出现 full-bleed background），**且** brief 并未要求 minimalism / typography-only / swiss / ultra simple

对 non-minimalist briefs：在任何 multi-section site 中，推动至少一个 full-bleed（或 duotone / atmospheric）background，以及至少一个 mini minimalist section。

对 minimalist briefs：此规则暂停。Restraint 就是 design。

---

## 19. Response Behavior
当用户要求 frontend design 时：
1. infer site type 和 primary conversion goal
2. infer number of sections（如不清楚，使用 §5 defaults：landing page = 6，full website = 8）
3. **明确说出** section count，并宣布它（"Generating N horizontal images, one per section"）
4. 为每个 section 规划一张 horizontal image - 始终 separate generations，不要 collapse
5. 为整个 site 选择 Hero Scale（giant / mid / mini）
5. 选择 strong visual combination（theme、type、hero arch、section system、motion、narrative spine、second-read moment）
7. 对每个 section：选择 Composition Anchor、Background Mode 和 CTA Variation - 跨 sections 变化
8. 选择 4 个 signature components，并在 sections 中适当使用
9. 强制 hero minimalism + section size variety（一些 giant，一些 mini）
10. 在合适处强制 strong image usage，包括 full-bleed backgrounds
11. 锁定所有 images 使用的 consistent palette
12. 应用 §18 Extra Creativity & Implementation Edge
13. 保持 spacing generous、even、clean
14. 移除 AI slop（包括 marquee / fake KPI clichés，除非用户要求）
15. 运行 §17 Clarity Check
16. **生成每张 per-section horizontal image，并标注 "Section X of N: <name>"**，直到完整 set 交付。不要提前停止。不要总结。不要只返回一张 image。

如果可以给出 strong interpretation，不要问不必要 follow-up questions。

---

## 20. Example Interpretations

### Example 1
User: "make a hero section for an AI startup"

Interpretation:
- 1 张 horizontal image
- Hero Scale: Mid Editorial 或 Giant Statement
- Composition Anchor：bottom-left text over full-bleed product/atmosphere image
- Background Mode：full-bleed image with dark tonal overlay
- CTA Variation：outlined inline + small label hint
- Palette：Deep Dark 或 Bold Studio Solid，使用 one consistent accent
- 不要 cliche dashboard spam，不要 purple AI glow

### Example 2
User: "design 8 sections for a fintech website"

Interpretation:
- 8 张 separate horizontal images（每个 section 一张）
- Hero Scale: Mid Editorial (trust-driven)
- 跨 sections 改变 Composition Anchor（centered low、right-third caption、bottom-left over chart visual、stacked center for closing CTA）
- Background Mode mix：solid surface、一次 full-bleed image background、use cases 处使用 editorial side-image
- 一个 consistent palette（例如 ink + paper + single brand accent）
- conversion path：hook -> proof bar -> features -> use case -> testimonial -> pricing -> FAQ -> final CTA

### Example 3
User: "creative agency landing page, 12 sections"

Interpretation:
- 12 张 horizontal images（每个 section 一张）
- Hero Scale：Giant Statement 或 Mini Minimalist（果断选择，不要折中）
- editorial / poster-like direction；off-grid composition 出现 2-3 次
- multiple Background Modes（hero + showcase 使用 full-bleed image，case studies 使用 editorial side-image，process 使用 solid + accent）
- palette 全程一致，并有一个 bold accent 反复出现
- closing CTA section：mini minimalist、strong type、single primary action

---

## 21. Final Goal
生成 frontend reference images，使其感觉：
- artistic
- premium
- clear
- structured
- image-led
- breathable
- memorable
- anti-generic
- implementation-friendly

结果应该像 top-tier website concept：strong imagery、confident creativity、generous spacing，而不是 dense、repetitive 的 AI layout。
