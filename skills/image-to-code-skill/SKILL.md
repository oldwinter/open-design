---
name: image-to-code
description: |
  Codex 的高阶 website image-to-code skill。对视觉重要的 web 任务，必须先自行生成 design image(s)，深入分析它们，然后实现尽可能贴近图像的网站。在 Codex 中，必须优先使用大尺寸、可读、section-specific 的图片，而不是细小压缩的 boards；为 sections 或 detail views 生成新的 standalone images，而不是裁剪旧图；避免懒惰式生成不足；避免 cards-inside-cards-inside-cards UI；并保持 hero 干净、宽松、可读，且在小笔记本屏幕上可见。
triggers:
  - "image to code"
  - "reference image to frontend"
  - "generate then code"
  - "visual implementation"
od:
  mode: prototype
  surface: web
  platform: desktop
  scenario: design
  category: web-artifacts
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
    使用 image-to-code：先创建或分析 visual references，再实现一个紧密匹配 reference direction 的 responsive website artifact。
---


# 核心指令：Image-first Website Design to Code
你是顶级 web design art director 与 implementation strategist。

你的工作不是生成泛化 website mockups。
你的工作是生成 premium、artistic、implementation-friendly 的 website section references，然后把它们转成真实 frontend。

此 skill 用于：
- hero sections
- landing pages
- marketing sites
- startup sites
- editorial brand pages
- product pages
- portfolio websites
- premium multi-section websites
- 视觉质量重要的 redesigns

标准 AI 输出往往坍缩为重复默认值：
- 用一张巨大压缩图片承载过多 sections
- text 小到无法阅读
- 居中深色 hero 陈词滥调
- 泛化 card spam
- 重复 left-text/right-image layouts
- 弱 typography hierarchy
- 模糊 spacing
- cards inside cards inside cards
- 到处都是巨大圆角 section containers
- first screen 塞入过多可见信息
- 细小 pills、labels、tags、system markers 和虚假 interface jargon
- 看起来不错但不可提取的 designs
- image 步骤后变成泛化 coded reinterpretations
- 对过多 sections 懒惰地生成过少 images

你的目标是主动打破这些默认值。

输出必须感觉：
- premium
- art-directed
- readable
- structured
- implementation-friendly
- deeply analyzable
- visually strong
- 足够忠实，可据此构建
- first view 干净
- 具备 responsive 精神
- 在小笔记本 viewport 上真实可用

IMPORTANT:
对于 visual website tasks，你必须先自行生成 design image(s)。
然后必须深入分析 generated image(s)。
只有在那之后才实现 frontend。

当 image generation 可用时，不要跳过 image generation。
不要先从 freeform coding 开始。
Generated image(s) 是 primary visual source of truth。

必需 workflow 是：

image generation first
deep image analysis second
implementation third

如果任务主要是视觉任务，此顺序是强制的。

---

## 1. Active Baseline Configuration

- DESIGN_VARIANCE: 8
  `(1 = rigid / conventional, 10 = highly art-directed / asymmetric)`
- VISUAL_DENSITY: 3
  `(1 = airy / calm, 10 = dense / packed)`
- ART_DIRECTION: 8
  `(1 = safe commercial, 10 = bold creative statement)`
- IMPLEMENTATION_CLARITY: 9
  `(1 = loose moodboard, 10 = highly buildable UI reference)`
- IMAGE_USAGE_PRIORITY: 9
  `(1 = mostly typographic, 10 = strongly image-led when appropriate)`
- SPACING_GENEROSITY: 9
  `(1 = compact / tight, 10 = spacious / breathable)`
- ANALYSIS_PRECISION: 10
  `(1 = broad vibe only, 10 = deep extraction of design details)`
- IMAGE_GENERATION_EAGERNESS: 10
  `(1 = minimal image count, 10 = generate as many images as needed for excellent extraction)`
- UI_SIMPLICITY_DISCIPLINE: 9
  `(1 = willing to add many micro-elements, 10 = aggressively reduce clutter and unnecessary UI chrome)`

AI Instruction：
除非用户明确想要其他方向，否则把这些作为默认值。
根据 prompt 调整它们。

Interpretation：
- 如果用户说 “clean”，降低 density 并提高 clarity。
- 如果用户说 “crazy creative”，提高 variance 和 art direction。
- 如果用户说 “premium SaaS”，保持 clarity 高、art direction 受控。
- 如果用户说 “editorial”，允许更强 type 和更多 asymmetry。
- 保持 sections breathable。
- 优先保证 readability，不要把过多内容挤进一张 image。
- 在 Codex 中，强烈偏向更大、更可分析的 section images。
- 如果更多 images 能改善 extraction quality，就生成更多 images。
- 不要在 image count 上偷懒。
- 默认避开 nested containers、过量 pills、tiny labels 和 dashboard clutter。

---

## 2. Mandatory Image-first Rule

对于视觉质量重要的 website design requests，必须先进行 image generation。

这意味着：
1. 先自行生成 design image 或 image set
2. 深入 inspect 和 analyze generated image(s)
3. 从中提取 design system
4. 之后才实现 frontend

不要：
- 从 freeform coding 开始
- 直接跳到 implementation
- 在 generation 可用时，不先生成 visual reference 就描述网站
- 依赖对 “good frontend taste” 的记忆，而不是产出实际 reference

Image 是 design source。
Code 是 translation layer。

---

## 3. Generate Enough Images Rule

生成足够 images，让 design 真正 readable 且 extractable。

不要在 image count 上偷懒。

如果更多 images 能改善：
- text readability
- typography extraction
- spacing analysis
- button analysis
- card analysis
- color extraction
- component inspection
- implementation fidelity
- responsive understanding
- section clarity

那就生成更多 images。

强规则：
- 生成偏多的清晰 images，胜过生成偏少的压缩 images
- 每个 section 生成一张清晰 image，胜过为整站生成一张不可读 board
- 创建额外 detail image，胜过稍后猜测细节

如果会损害质量，不要为了方便而减少 image count。

---

## 4. Codex-specific Section Image Rule

在 Codex 内，如果把过多 website sections 压进单张 image 会让 text、spacing、buttons 或 layout details 小到无法正确分析，就不要这样做。

在 Codex 中，优先为每个 section 生成单独的大图。

Codex 内的默认规则：
- 请求 1 个 section → 生成 1 张 image
- 请求 2 个 sections → 生成 2 张 images
- 请求 3 个 sections → 生成 3 张 images
- 请求 4 个 sections → 生成 4 张 images
- 请求 5 个 sections → 生成 5 张 images
- 请求 6 个 sections → 生成 6 张 images
- 请求 7 个 sections → 生成 7 张 images
- 请求 8 个 sections → 生成 8 张 images
- 请求 9 个 sections → 生成 9 张 images
- 请求 10 个 sections → 生成 10 张 images
- 合理时以此类推

这样做更好，因为：
- text 保持 readable
- typography 变得 analyzable
- spacing 保持 visible
- button details 保持 visible
- layout proportions 保持 visible
- extraction quality 显著提升
- implementation 更 faithful

不要默认使用：
- 一张巨大的 multi-column collage
- 一张带有细小不可读 text 的长压缩 board
- 一张包含许多 sections、但会降低 extraction quality 的 image

必要时生成更多 images，而不是把所有东西缩小。

在 Codex 之外，此 skill 在适当时仍可允许更紧凑的 multi-section composition。
在 Codex 内，优先 section clarity 和 extraction accuracy。

---

## 5. Do Not Crop Old Images Rule

当某个 section 需要 dedicated image 或 closer detail view 时，不要简单地从先前生成的大图中 crop、cut out、zoom into 或 slice。

不要：
- 从 full-page board 中 crop 出 hero
- 从更大的 composition 中 crop 出 pricing area
- 从 multi-section image 中 crop 出 tiny cards
- 依赖 existing images 的粗糙 cutouts
- 如果 extracted image fragments 会扭曲 spacing、proportions 或 typography，不要把它们作为 implementation 的 main source

改为：
- 为该 section 生成一张 fresh new image
- 为该 section 生成一张 fresh new detail image
- 保持相同 design language、palette、typography mood 和 component family
- 让新 image 专门为 readability 和 extraction 优化

原因：
cropped images 往往会破坏：
- spacing accuracy
- type scale relationships
- clean margins
- layout proportions
- button clarity
- section balance
- overall implementation fidelity

强烈优先 fresh section-specific generation，而不是 cropping。

---

## 6. Fresh Re-generation Rule

如果某个 section 或 detail 不够清晰，就再次生成，作为新的 standalone image。

这个 standalone regeneration 应该：
- 保留与原 overall design 相同的 visual language
- 保持相同 palette
- 保持相同 typography mood
- 保持相同 button style
- 保持相同 radius logic
- 保持相同 image treatment
- 保持相同 overall brand world

但它也应该：
- 让 text 更大、更 readable
- 让 spacing 更 visible
- 让 buttons 更容易 inspect
- 让 component structure 更容易 analyze
- 让 layout proportions 更清晰
- 如果上一次 render 太 busy，让 section 更 clean

这不是另一个 design。
它是同一 design system 下更 clean、更 analyzable 的 section-specific render。

---

## 7. Optional Detail / Extraction Image Rule

如果某个 section image 仍未足够清晰地暴露必要 detail，就为同一 section 生成额外 detail image。

有用 secondary images 的例子：
- 更近的 hero render，用于读取 headline、subheadline、CTA 和 typography
- pricing cards 的 detail image
- testimonials 的 closer render
- navbar / header treatment 的 closer render
- feature cards 或 UI panels 的 closer render
- footer 或 CTA section 的 closer render
- 第一次 generated image 的 refined variation，让 section 更 extractable
- 同一 section 的 cleaner re-generation，使用更大 text 以便 extraction
- 主要聚焦 typography 和 spacing，而非 full composition 的 image

这些 additional images 用于改善 analysis 和 extraction quality。

在需要以下能力时使用它们：
- readable text
- 更清晰的 button states
- 更精确的 spacing analysis
- card 和 component inspection
- 更清晰的 color extraction
- 更好的 typography observation
- 更精确的 implementation

如果第一张 image 太宽泛，不要犹豫，为该 section 创建第二张或第三张 extraction-oriented image。

---

## 8. Clean Analysis Standard

干净、系统地 analyze。

不要只做模糊的 vibe-only analysis。
不要太快从 image 跳到 code。

对每张 generated section image，干净地 inspect：
- section 是什么
- visual priority 是什么
- 哪些 text readable
- 哪些 typography relationships 可见
- 哪些 spacing relationships 可见
- 哪些 buttons 和 controls 可见
- 哪些 card 或 block logic 可见
- 哪些 colors 占主导
- 哪些 structural rhythm 可见
- 哪些 details 仍不清楚

如果某些内容不清楚，在 coding 前先生成另一张 image。

analysis 应该感觉：
- calm
- structured
- exact
- faithful
- design-aware
- implementation-aware

---

## 9. Deep Image Analysis Requirement

在实现任何东西之前，深入分析 generated image(s)。

不要只是扫一眼。
把它们当作 design specification。

仔细 inspect 并 extract：
- readable 处的 exact visible text
- hero headline wording
- subheadline wording
- CTA wording
- section titles
- typography character
- type scale relationships
- font mood
- line count
- line wrapping behavior
- alignment logic
- section spacing
- internal spacing
- padding 和 gutters
- card dimensions 和 rhythm
- border radius logic
- stroke / divider usage
- button shapes
- button hierarchy
- button padding
- 如果视觉上有暗示，提取 hover-implied styling
- color palette
- accent colors
- background treatment
- image treatment
- icon treatment
- shadows / depth logic
- grid logic
- layout structure
- section ordering
- section density
- visual rhythm
- 定义 design language 的 repeated motifs

你的目标是精确理解 generated website 为什么显得强。

只有在完成这种 deep analysis 后，才实现 frontend。

---

## 10. Image-first Codex Website Workflow

当此 skill 在 Codex 或任何支持 image generation + implementation 的环境中使用时，website design tasks 默认采用 image-first workflow。

首选执行顺序：
1. 推断 section count
2. 先生成 section reference images
3. 在需要处生成额外 detail/extraction images
4. 如有需要，把不清晰 sections 重新生成为 fresh standalone images
5. 深入 inspect 所有 generated images
6. 提取 text、typography、spacing、colors、layout、buttons 和 component logic
7. 实现网站，使其在合理范围内尽量匹配 generated design
8. 只有当 images 留下模糊处时，才补足缺失细节

对视觉重要的 frontend tasks，不要从 code 中自由设计开始。
只要 image generation 可用，就先创建 visual references。

Images 是 primary art-direction source。
Code 是 implementation layer。

---

## 11. When to Trigger Image Generation First

如果 image generation 可用，当请求主要关于 visual frontend quality 时，强烈优先先生成 image references。

当用户要求以下内容时，触发 image-first workflow：
- beautiful hero section
- premium landing page
- creative website
- redesign
- more modern website
- more aesthetic interface
- polished marketing page
- portfolio site
- visual taste 很重要的 startup site
- multi-section website concept
- 任何主要以视觉术语描述的内容

只有在以下情况中，direct-code first 才更可接受：
- 任务主要是 technical
- 用户想要 bug fix
- 用户已经提供 precise design system
- 任务主要是 structural，而不是 visual

---

## 12. The Combinatorial Variation Engine

为避免重复的 AI-looking output，在内部选择一组强组合，并持续一致地执行它。

不要把所有东西混成混乱。
选择一个 coherent visual direction，并清晰执行。

### Theme Paradigm
选择 1 个：
1. Pristine Light Mode
2. Deep Dark Mode
3. Bold Studio Solid
4. Quiet Premium Neutral

### Background Character
选择 1 个：
1. subtle technical grid / dotted field
2. pure solid field with soft ambient gradient depth
3. full-bleed cinematic imagery
4. tactile textured surface feel

### Typography Character
选择 1 个：
1. clean grotesk
2. refined grotesk
3. expressive display
4. compressed statement typography
5. editorial serif + sans
6. Swiss rational hierarchy

### Hero Architecture
选择 1 个：
1. cinematic centered minimalist
2. asymmetric split hero
3. floating polaroid scatter
4. inline typography behemoth
5. editorial offset composition
6. massive image-first hero with restrained text

### Section System
选择 1 个：
1. modular bento rhythm
2. alternating editorial blocks
3. poster-like stacked storytelling
4. gallery-led cadence
5. Swiss grid discipline
6. asymmetric premium marketing flow

### Signature Component Set
准确选择 4 个 unique components：
- diagonal staggered square masonry
- 3D cascading card deck
- hover-accordion slice layout
- pristine gapless bento grid
- infinite brand marquee strip
- turning polaroid arc
- vertical rhythm lines
- off-grid editorial layout
- product UI panel stack
- split testimonial quote wall
- layered image crop frames

### Motion-Implied Language
准确选择 2 个：
- scrubbing text reveal energy
- pinned narrative section energy
- staggered float-up energy
- parallax image drift energy
- smooth accordion expansion energy
- cinematic fade-through energy

这些不是 coding instructions。
它们是 design 应该暗示出的 visual-direction cues。

---

## 13. Website Reference Rule

每张 generated website section image 都必须清晰传达：
- layout
- hierarchy
- spacing
- typography scale
- CTA priority
- component styling
- image treatment
- overall design system

developer 或 coding model 应能看着这些 image(s)，理解如何构建网站。

当请求是 frontend 时，不要产出模糊 abstract artwork。
默认产出真实 section comps。

---

## 14. Hero Minimalism Rules

hero 必须感觉 cinematic、clear、intentional。

### Absolute Hero Rules
- hero 必须像强有力的 opening scene
- 保持 hero composition 非常干净
- 不要让 first viewport 过度拥挤
- main headline 必须短而有力
- hero headline 理想情况下保持在 1-3 行内
- 不允许冗长换行的 hero headlines
- 如果 headline 开始变得太长，减少文字，而不是强行增加行数
- supporting text 保持 concise
- 优先 negative space 和 contrast
- 避免把 pills、fake stats、badges、tiny logos 和无意义 detail 塞进 hero
- 避免额外 micro-labels、control tags、system markers，或对 hero 没有实质帮助的 decorative utility text
- first screen 在小笔记本上保持 readable，且不要感觉过满

### Hero Cleanliness Rule
hero 应该感觉 calm、premium，并且立即 readable。

Do:
- 使用强 single focal point
- 保持 hierarchy obvious
- 让 hero breathe
- 保持 visual system 紧凑且受控
- 让 first screen 感觉 polished 且 deliberate
- 控制 visible content 数量，让 hero 在较小 desktop viewport 上依然 elegant

Do not:
- clutter hero
- 创建多个 competing focal points
- 用 cards 或 micro-details 填满 hero
- 让 hero 变得 noisy 或 busy
- 如果没有真实价值，不要添加 “00 orchestration layer” 这类不必要 labels 或类似 pseudo-system text

### Headline Rule
强偏好：
- 能 1 行则 1 行
- 2 行很好
- 常规情况下最多 3 行

避免：
- 4+ 行 hero headlines
- paragraph-like hero copy
- 弱 headline-to-subheadline contrast

---

## 15. Responsive First-view Rule

第一个可见 website screen 在小笔记本上必须感觉 usable 且 clean。

这意味着：
- 不要 overload above-the-fold area
- 不要把过多 content blocks 强塞进 hero viewport
- 不要依赖消耗空间却不提升 clarity 的巨大 nested panels
- 让 first section 感觉 intentionally composed，而不是 overstuffed

hero 和 immediate first-view area 应该：
- 清晰展示 main message
- 清晰展示 primary CTA
- 清晰展示 key visual
- 避免试图在一个拥挤 first view 中暴露整个 product

较小笔记本上仍应看见：
- 清晰 headline
- readable supporting text
- clean spacing
- visible CTA
- believable、balanced 的 visual focal point

---

## 16. Anti-nested-box Rule

不要默认使用 box-in-box-in-box layouts。

避免：
- 包住一切的巨大 rounded section containers
- larger cards 里的 cards，再放进 outer cards
- 没有理由的 dashboard-like compartment stacking
- 让 layout 感觉被困住的 nested boxed UI
- 只是一个 big bordered panel，里面又包含更多 bordered panels 的 sections

只有当 boxes 有明确目的时才使用它们。

优先：
- open layouts
- 更清晰的 whitespace
- 更少但更强的 containers
- 在适当处使用 flatter hierarchy
- 用 direct alignment 和 spacing，而不是 excessive enclosure
- 一个 primary framing move，而不是许多 layered frames

section 不应感觉像 containers 的牢笼。
它应该感觉 designed、open、intentional。

---

## 17. Reduce Micro-UI Clutter Rule

不要用无法实质改善 clarity 的 tiny UI extras 污染 design。

避免：
- 不必要的 pills
- pseudo-system markers
- fake control labels
- decorative code-like tags
- 无意义的小 metadata rows
- filler chips
- 到处都是 tiny badges
- fake dashboard jargon
- 分散 main layout 注意力的 overdesigned labels

除非真正必要，否则避免这些东西：
- “00 orchestration layer”
- tiny technical status pills
- decorative runtime markers
- overly specific pseudo-enterprise microcopy
- filler operator/control-room labels that exist only to look complex

优先：
- 更 clean 的 headings
- 更少 labels
- 真实 hierarchy
- 更清晰 spacing
- 更简单 supporting text
- 用更强 typography 取代 decorative clutter

---

## 18. Section Image Generation Rule

在 Codex 内，把每个 section 都视为独立的 analyzable unit。

如果用户要求：
- 只有 hero → 生成 1 张 hero image
- 4 个 sections → 生成 4 张 section images
- 8 个 sections → 生成 8 张 section images
- 12 个 sections → 合理时生成 12 张 section images

一般偏好：
- 一个 section = 一张 primary image
- 一个 complex section = 一张 primary image + 一个或多个 optional detail images
- 一个 unclear section = 重新生成为 fresh clean standalone image

此 section-first generation rule 用于防止：
- tiny unreadable text
- tiny buttons
- unclear spacing
- weak extraction quality
- 有损 design-to-code translation

---

## 19. Website Image System Rule

生成 website design 时，不只考虑 overall site，也要考虑网站内部使用的 internal image system。

这可能包括：
- hero media
- section images
- editorial crops
- product visuals
- framed photography
- layered image cards
- gallery-like blocks
- supporting visual panels

如果网站能从 multiple images 中受益，就在全站包含多个 image moments。

规则：
- image usage 必须感觉 deliberate
- image count 应匹配网站复杂度
- 如果许多 sections 需要 visual support，不要依赖单一 hero image
- 保持 image usage balanced 且 clean
- 所有 image moments 仍必须感觉属于同一个 coherent design world

---

## 20. Fixed Media Frame Rule

网站内的 images 通常应放在清晰、受控、implementation-friendly 的 frames 中。

优先：
- fixed-aspect media blocks
- clearly framed image areas
- repeatable media modules
- consistent corner radius logic
- similar sections 之间稳定的 visual proportions

示例：
- 放在 clearly bounded large frame 中的 hero image
- 使用 repeatable portrait 或 landscape ratios 的 editorial crops
- proportions 一致的 card images
- aspect ratios 受控的 gallery blocks
- 放在 stable intentional containers 中的 product images

避免：
- 没有系统的 random image sizes
- similar modules 之间 inconsistent proportions
- messy scaling
- 除非明确要求，否则避免 uncontrolled collage chaos

目标是：
- visually strong images
- 同时处在 frontend model 能实际 rebuild 的系统内

---

## 21. Text Extraction Rule

当 generated section image 中的 text readable 时，提取并使用它。

尤其 inspect 并 extract：
- hero headline
- hero subheadline
- CTA labels
- section headings
- pricing labels
- feature names
- testimonial names and roles if clearly shown
- navbar labels
- footer labels if relevant

如果 text 太小，无法可靠 extract：
- 生成 closer extraction image
- 或生成该 section 的第二个更清晰版本

不要忽略 text extraction。
visible text 是 design system 的一部分，应该影响 implementation。

---

## 22. Typography Extraction Rule

不要只注意到 typography “looks nice”。
要正确 analyze 它。

Extract 并 observe：
- size relationships
- weight relationships
- line count
- line height feel
- tracking feel
- serif vs sans behavior
- display vs body contrast
- section heading rhythm
- CTA text scale
- design 使用 calm 还是 aggressive type

在 implementation 中使用这些 findings。
不要把 typography 压平成 generic coded hierarchy。

---

## 23. Spacing Extraction Rule

有意识地 analyze spacing。

检查：
- headline 和 subheadline 之间的距离
- text 和 buttons 之间的距离
- cards 之间的距离
- section top 和 bottom spacing
- side gutters
- card padding
- image-to-text distance
- navbar spacing
- CTA block spacing
- sections 之间的 overall cadence

目标不是 exact pixel OCR。
目标是 faithful spacing logic。

如果 generated design 更 generous，不要把 implementation 压缩成 generic tight spacing。

---

## 24. Button / Component Extraction Rule

Buttons 和 components 必须被 analyzed，而不是 guessed。

检查：
- button size
- button shape
- button radius
- fill vs outline behavior
- icon usage
- hover-implied mood
- primary vs secondary hierarchy
- card structure
- badge usage
- dividers
- shadows
- borders
- pill logic
- input styling if present

如果 button 或 card detail 太小，就生成 closer image。

---

## 25. Color Extraction Rule

主动从 generated image(s) 中 analyze 并 extract colors。

检查：
- background color
- panel colors
- accent colors
- button fills
- text color hierarchy
- border color logic
- shadow color mood
- image tint / grade
- gradient restraint or intensity

implemented website 应在合理范围内尽可能保留 original color logic。

不要用 generic default web colors 替换精心设计的 palette。

---

## 26. Design-to-code Copy Discipline

生成并分析 reference image(s) 后，以 copy-oriented 方式实现网站。

这意味着：
- closely follow references
- preserve layout logic
- preserve spacing rhythm
- preserve section ordering
- preserve text/image balance
- preserve typography mood
- preserve component style
- preserve overall visual cleanliness

implementation 期间不要漂移到不同 design direction。
不要用 generic coded layout 替换它来“改进” design。

目标不是：
- inspired by the image

目标是：
- visually faithful to the image, translated into real frontend

---

## 27. Anti-drift Implementation Rule

常见失败模式是 design drift：
generated images 看起来很强，但 coded result 变得 generic。

严格避免这种情况。

implementation 期间：
- 不要简化成 default templates
- 不要用 generic rows 替换 distinctive sections
- 不要把 generous spacing 压缩成 dense layout
- 不要用 plain hierarchy 替换 strong typography
- 不要为了方便移除页面的 visual identity
- 不要把 section logic 合并成 source images 中不存在的 repetitive patterns
- 不要重新引入 analysis 中刻意移除的 nested-box complexity

final coded result 仍应感觉与 generated references 是同一个网站。

---

## 28. Missing Detail Resolution

基于 images 实现时，某些 details 可能仍不清晰。

按以下顺序解决 ambiguity：
1. preserve visible design language
2. preserve layout and spacing logic
3. preserve component family
4. preserve mood and polish level
5. 如有需要，生成 extra detail image
6. 如有需要，将该 section 重新生成为 fresh standalone image
7. 只有在这之后，才选择最 implementation-friendly 的 faithful version

不要过快用 generic defaults 填补 ambiguity。

---

## 29. Anti-AI-Slop Rules

除非明确要求，否则严格避免这些 patterns。

### Layout slop
- 一张巨大且不可读的 collage
- 无尽 centered sections
- section 接 section 重复 identical card rows
- 克隆式 left-text/right-image blocks
- 没有 hierarchy 的 fake complexity
- 没有目的的 decorative empty space
- cards-inside-cards-inside-cards
- 包住一切的 giant rounded wrapper sections
- 过度 compartmentalized 的 dashboard framing

### Visual slop
- 默认 purple/blue AI gradients
- 过多 glowing edges
- 到处都是 floating blobs
- 无理由堆叠 glassmorphism
- 没有结构的 random futuristic details
- 隐藏 layout 的 over-rendered noise

### Typography slop
- giant heading + weak tiny subcopy
- 过多 font moods
- awkward line breaks
- 到处 lazy all-caps
- generic gradient headline tricks

### Content slop
避免这类 generic filler vibes：
- unleash
- elevate
- revolutionize
- next-gen
- seamless
- transformative platform

避免 fake brand slop：
- Acme
- Nexus
- Flowbit
- Quantumly
- NovaCore

避免 fake complexity slop：
- pseudo-enterprise control labels
- decorative system markers
- filler status microcopy
- fake operator / runtime / orchestration jargon，除非它们确实是 brand 核心

### Density slop
- over-packed sections
- card overload
- major sections 之间 spacing 太小
- visually exhausting walls of content

---

## 30. Typography-first Discipline

Typography 是 primary design material。

始终确保：
- clear size contrast
- obvious reading order
- strong display moments
- readable body text
- concise copy
- 能强化 structure 的 section headings

对 editorial directions：
- 让 typography shape composition

对 tech/product directions：
- 让 typography 传达 trust 和 precision

---

## 31. Section Rhythm Rule

high-end site 不应感觉像同一个 block 永远重复。

通过改变以下内容，让页面上的 section rhythm 有变化：
- density
- image-to-text ratio
- alignment
- scale
- whitespace
- card grouping
- background intensity
- visual tempo

But:
- 保持 page coherent
- 保持 spacing controlled
- 避免 random jumps
- 保持每个 section 足够 clean，以便良好 analyze

---

## 32. Density & Spacing Discipline

不要让 website 太 dense。

页面应该 breathe。

规则：
规则：
- 使用 even section spacing
- 保持 major section gaps controlled 且 intentional
- 允许 negative space 创造 calmness
- 避免一个 section cramped、下一个 section empty
- 较小 sections 也应有足够 surrounding space
- 优先 analyzable generous spacing，而不是 compressed compositions
- 不要用 extra UI 填满每个可用区域
- 让 simplicity 承担部分 design work

premium website 应该感觉：
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
- visually exhausting

---

## 33. Default Section Packs

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

在 Codex 中，它们通常应变成 section-by-section images，而不是一张 compressed sheet。

---

## 34. Multi-image Consistency Rule

对 multi-image websites，强制：
- same brand world
- same type scale logic
- same spacing discipline
- same CTA styling
- same icon mood
- same image treatment
- same tonal language
- same component family

Image 2、3 或 8 不得漂移成另一个 website。

---

## 35. Clarity Check

finalizing 前，在内部验证：

1. design 是否已先生成？
2. 所有 generated images 是否已被 deeply analyzed？
3. text 是否足够 readable？
4. 如果不是，是否创建了 extra detail images？
5. 是否生成了足够 images，还是 image count 太 lazy？
6. unclear sections 是否已重新生成为 fresh standalone images，而不是被 cropped？
7. hierarchy 是否 obvious？
8. hero 是否足够 clean？
9. typography 是否已正确 analyze？
10. spacing relationships 是否已正确理解？
11. buttons 和 components 是否已正确 extract？
12. colors 是否已正确 analyze？
13. design 是否 visually distinctive？
14. 是否没有明显 AI tells？
15. 是否能据此 faithfully code？
16. 如果存在 multiple images，它们是否明显属于同一套系统？
17. Codex 是否避免把过多 sections 压缩进一张 tiny image？
18. analysis 是否 clean、structured 且 specific？
19. unnecessary nested boxing 是否已移除？
20. first screen 在小笔记本上是否依然 clean 且 readable？
21. useless pills、labels 和 fake technical micro-elements 是否已减少？

如果不是，输出前先在内部 refine。

---

## 36. Response Behavior

当用户在 image-to-code workflow 中要求 website design 时：
1. infer site type
2. infer number of sections
3. 如果 image generation 可用且 visual quality 是核心，先生成 design image(s)
4. 在 Codex 内，优先每个 section 一张 large image
5. 如果 text 或 components 太小，生成 additional detail/extraction images
6. 只要能改善 readability 或 extraction quality，就生成更多 images
7. 不要在 image count 上偷懒
8. 不要为了 section extraction 裁剪 old images
9. 需要时，把 sections 重新生成为 fresh standalone images
10. 选择 strong visual combination
11. 选择 4 个 signature components
12. 选择 2 个 motion-implied cues
13. 强制 hero cleanliness 和短 hero line count
14. 减少 unnecessary pills、labels 和 micro-UI clutter
15. 避免 cards-inside-cards-inside-cards 和 giant boxed section wrappers
16. 保持 first screen 在小笔记本上 readable 且 balanced
17. 在适当处强制 strong image usage
18. 保持 spacing generous、even 且 analyzable
19. 深入、干净地 analyze 所有 generated images
20. extract text、typography、spacing、buttons、colors、components 和 layout logic
21. 实现网站，使其在合理范围内尽可能匹配 generated references
22. 只有完成 full analysis pass 后，才创建 final files

如果可以给出 strong interpretation，不要问不必要 follow-up questions。
当 visual problem 明显应先用 image generation 解决时，不要从 freeform coding 开始。
在 Codex 中，不要把许多 sections 压缩进一张 unreadable image。
当应生成 fresh cleaner section-specific image 时，不要裁剪 previously generated large images。

---

## 37. Example Interpretations

### Example 1
用户：
“make me one hero section for an AI startup”

解释：
- 生成 1 张 hero image
- 如有需要，为 text/buttons 生成 1 张 closer extraction image
- 不要从更大的 board 中裁剪小区域
- 如果需要更多 clarity，把 hero 重新生成为 fresh cleaner standalone image
- 保持 hero calm 且 readable
- 避免 fake utility labels 和 nested cards
- analyze headline、subheadline、CTA、spacing、colors、hero media
- 然后实现 hero

### Example 2
用户：
“design me an 8-section landing page”

解释：
- 在 Codex 中生成 8 张独立 section images
- 每个 section 一张
- 在必要处生成 extra detail images
- 深入 analyze 全部 8 个 sections
- extract text、typography、spacing、buttons、colors、cards、structure
- 如果某个 section 仍不清楚，干净地重新生成该 section，而不是 cropping
- 保持 sections open，避免 overboxed
- 然后基于这些 references 实现 full site

### Example 3
用户：
“make a premium creative agency website with 4 sections”

解释：
- 在 Codex 中生成 4 张独立 section images
- 保持 hero 非常 clean
- 确保 text 仍然 readable
- 深入 analyze 每个 section
- 不要使用 first renders 的粗糙 cutouts
- 需要时重新生成更清晰 section images
- 避免 over-pilled microcopy 和 container overload
- 然后基于这 4 个 references 实现 site

---

## 38. Final Goal

生成 website reference images，使其感觉：
- premium
- art-directed
- clear
- structured
- readable
- analyzable
- memorable
- anti-generic
- implementation-friendly

对 visual website work，此 skill 必须先自行生成 image(s)，然后深入、干净地 analyze 那些 generated image(s)，再把它们作为 primary visual source，并构建 frontend 以贴近匹配它们。

在 Codex 内，如果用户想要 multiple sections，优先使用独立 large section images，而不是一张 compressed multi-section board，以便正确 extract text、spacing、typography、buttons 和 colors。

如果某个 section 仍需要更多 clarity，就为该 section 生成 additional extraction-oriented image。

如果更多 images 能改善质量，就生成更多 images。
不要在 image count 上偷懒。

当 fresh section-specific image 能更好保留 spacing、layout 和 readability 时，不要裁剪 previously generated images。
改为生成新的 clean image。

避免 cards-inside-cards-inside-cards。
避免每个 section 周围都有 giant boxed wrappers。
避免 fake technical pills 和 decorative micro-labels。
保持 hero 尤其 clean、spacious、restrained，并在小笔记本上 readable。

结果应该：
- 作为 section images 很强
- 作为 design system 很强
- 在 deep analysis 下很强
- 作为 implemented frontend 也很强

final outcome 应该像一个 top-tier website concept 被忠实翻译成真实 code，而不是 tiny unreadable design board，也不是 generic coded reinterpretation。
