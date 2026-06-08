---
name: design-taste-frontend
description: |
  面向 landing pages、portfolios 和 redesigns 的 anti-slop frontend skill。Agent 先阅读 brief，推断合适的 design direction，再交付不像模板的 interfaces。适用时使用真实 design systems；redesigns 先 audit；严格执行 pre-flight check。
triggers:
  - "design taste"
  - "anti slop frontend"
  - "premium landing page"
  - "portfolio redesign"
  - "visual taste"
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
    Create a premium landing page that follows design-taste-frontend: infer the design read, set the dials, avoid AI-slop patterns, and output a polished responsive HTML artifact.
---


# tasteskill: Anti-Slop Frontend Skill

> Landing pages、portfolios 和 redesigns。不是 dashboards、data tables，也不是 multi-step product UI。
> 以下所有规则都需要**结合上下文**。没有任何规则会自动触发。先阅读 brief，再只取合适的部分。

---

## 0. BRIEF INFERENCE（先读懂场景）

在写 code 或调整 dials 前，先**推断用户真正想要什么**。多数 LLM design output 差，是因为 model 没有读懂场景就跳到默认 aesthetic。

### 0.A 先读这些信号
1. **Page kind** - landing（SaaS / consumer / agency / event）、portfolio（dev / designer / creative studio）、redesign（preserve vs overhaul）、editorial / blog。
2. **用户使用的 vibe words** - "minimalist"、"calm"、"Linear-style"、"Awwwards"、"brutalist"、"premium consumer"、"Apple-y"、"playful"、"serious B2B"、"editorial"、"agency-y"、"glassy"、"dark tech"。
3. **Reference signals** - 用户贴的 URLs、screenshots、提到的 products、正在竞争的 brands。
4. **Audience** - B2B procurement panel、design-conscious consumer、还是扫 portfolio 的 recruiter。Audience 决定 aesthetic，不是你的 taste。
5. **已有 brand assets** - logo、color、type、photography。对 redesigns 来说，这些是 starting material，不是 optional input（见 Section 11）。
6. **Quiet constraints** - accessibility-first audiences、public-sector、regulated industries、trust-first commerce、kids' products。这些 constraints 优先级高于 aesthetic preference。

### 0.B 生成前输出一行 "Design Read"
在任何 code 前，用一行说明：**"Reading this as: \<page kind> for \<audience>, with a \<vibe> language, leaning toward \<design system or aesthetic family>."**

示例 reads：
- *"Reading this as: B2B SaaS landing for technical buyers, with a Linear-style minimalist language, leaning toward Tailwind utilities + Geist + restrained motion."*
- *"Reading this as: solo designer portfolio for hiring managers, with an editorial / kinetic-type language, leaning toward native CSS + scroll-driven animation + custom typography."*
- *"Reading this as: redesign of a public-sector service site, with a trust-first language, leaning toward GOV.UK Frontend or USWDS."*

### 0.C brief 模糊时，只问一个问题，不要猜
只问**一个**澄清问题，绝不要丢一串问题，并且只在 design read 真的分叉时才问。示例：*"Should this feel closer to Linear-clean or Awwwards-experimental?"*

如果能从上下文自信推断，**不要问**。直接声明 design read 并继续。

### 0.D Anti-Default Discipline
不要默认使用：AI-purple gradients、dark mesh 上的 centered hero、三张等宽 feature cards、到处 generic glassmorphism、无处不在的 infinite-loop micro-animations、Inter + slate-900。这些都是 LLM defaults。根据 design read 有意识地越过它们。

---

## 1. THE THREE DIALS (Core Configuration)

完成 design read 后，设置三个 dials。下面所有 layout、motion 和 density 决策都由它们约束。

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

**Baseline:** `8 / 6 / 4`。除非 design read 覆盖，否则使用这些值。不要要求用户编辑此文件，overrides 通过对话发生。

### 1.A Dial Inference (design read → dial values)
| Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| "minimalist / clean / calm / editorial / Linear-style" | 5-6 | 3-4 | 2-3 |
| "premium consumer / Apple-y / luxury / brand" | 7-8 | 5-7 | 3-4 |
| "playful / wild / Dribbble / Awwwards / experimental / agency" | 9-10 | 8-10 | 3-4 |
| "landing page / portfolio / marketing site (default)" | 7-9 | 6-8 | 3-5 |
| "trust-first / public-sector / regulated / accessibility-critical" | 3-4 | 2-3 | 4-5 |
| "redesign - preserve" | match existing | +1 | match existing |
| "redesign - overhaul" | +2 | +2 | match existing |

### 1.B Use-Case Presets
| Use case | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| Landing (SaaS, mainstream) | 7 | 6 | 4 |
| Landing (Agency / creative) | 9 | 8 | 3 |
| Landing (Premium consumer) | 7 | 6 | 3 |
| Portfolio (Designer / studio) | 8 | 7 | 3 |
| Portfolio (Developer) | 6 | 5 | 4 |
| Editorial / Blog | 6 | 4 | 3 |
| Public-sector service | 3 | 2 | 5 |
| Redesign - preserve | match | match+1 | match |
| Redesign - overhaul | +2 | +2 | match |

### 1.C Dials 如何驱动输出
将这些值（或用户覆盖后的 values）作为 global variables 使用。本文档中的 cross-references 都指这些精确 variable names，不要发明 `LAYOUT_VARIANCE` 或 `ANIM_LEVEL` 这样的 aliases。

---

## 2. BRIEF -> DESIGN SYSTEM MAP

拿到 design read（Section 0）和 dials（Section 1）后，选择正确 foundation。对于已有 official package 的东西，不要手写 CSS。不要把 aesthetic trend 伪装成 official system。

### 2.A 何时使用真实 design system（使用 official packages）
| Brief reads as... | Reach for | 原因 |
|---|---|---|
| Microsoft / enterprise SaaS / dashboards | `@fluentui/react-components` or `@fluentui/web-components` | Official Fluent UI、Microsoft tokens、accessibility done |
| Google-ish UI, Material-flavored product | `@material/web` + Material 3 tokens | Official，可通过 Material Theming 设置 theme |
| IBM-style B2B / enterprise analytics | `@carbon/react` + `@carbon/styles` | Official Carbon，成熟 data-density patterns |
| Shopify app surfaces | `polaris.js` web components / Polaris React | Shopify admin UI 必需 |
| Atlassian / Jira-style product | `@atlaskit/*` + `@atlaskit/tokens` | Official Atlassian DS |
| GitHub-style devtool / community page | `@primer/css` or `@primer/react-brand` | Official Primer；Brand variant 用于 marketing |
| Public-sector UK service | `govuk-frontend` | 法律 / 监管预期 |
| US public-sector / trust-first | `uswds` | Same |
| Fast local-business / agency MVP | Bootstrap 5.3 | Boring、fast、works |
| Modern accessible React foundation | `@radix-ui/themes` | Primitives + polished theme |
| Modern SaaS where you own the components | shadcn/ui (`npx shadcn@latest add ...`) | 你拥有 code，易于 customize；不要 ship default state |
| Tailwind-based modern SaaS / AI marketing | Tailwind v4 utilities + `dark:` variant | Default for indie + small team builds |

**Honesty rule:** 如果 brief 明显属于上面的系统之一，安装并使用 **official** package。不要手工重建它的 CSS。不要 import 某个 system 的 tokens 后又 override 其中 90%。

**每个 project 只用一个 system。** 不要在同一个 tree 中混用 Fluent React 和 Carbon。不要把 shadcn/ui components import 到 Material 3 app 中。

### 2.B brief 是 aesthetic 而不是 system 时
这些方向**没有单一 official package**。用 native CSS + Tailwind + 维护良好的 component library 构建。在 code comments 中诚实说明哪些是 borrowed inspiration，哪些是 official material。

| Aesthetic | 诚实实现方式 |
|---|---|
| Glassmorphism / "frosted glass" | `backdrop-filter`、layered borders、highlight overlays。为 `prefers-reduced-transparency` 提供 solid-fill fallback。 |
| Bento (Apple-style tile grids) | 使用混合 cell sizes 的 CSS Grid。没有单一 library 拥有它。 |
| Brutalism | Native CSS、monospace、raw borders。无 library。 |
| Editorial / magazine | Serif type、asymmetric grid、generous whitespace。无 library。 |
| Dark tech / hacker | Mono + accent neon、terminal motifs。无 library。 |
| Aurora / mesh gradients | SVG 或 layered radial gradients。无 library。 |
| Kinetic typography | Native CSS animations、scroll-driven animations，需要 hijack 时用 GSAP。无 library。 |
| **Apple Liquid Glass** | Apple 只为 Apple platforms 记录此模式。**没有 official `liquid-glass.css`。** Web implementations 是用 `backdrop-filter` + layered borders + highlights 做的 approximations。请清楚标注为 approximation。 |

---

## 3. DEFAULT ARCHITECTURE & CONVENTIONS

除非 design read 选择了真实 design system（Section 2.A），否则默认如下：

### 3.A Stack
* **Framework:** React 或 Next.js。默认使用 Server Components (RSC)。
  * **RSC SAFETY:** Global state 只能在 Client Components 中工作。Next.js 中，将 providers 包在 `"use client"` component 内。
  * **INTERACTIVITY ISOLATION:** 任何使用 Motion、scroll listeners 或 pointer physics 的 component，都必须是顶部带 `'use client'` 的 isolated leaf。Server Components 只渲染 static layouts。
* **Styling:** **Tailwind v4**（默认）。只有既有 project 要求时才用 Tailwind v3。
  * v4：不要在 `postcss.config.js` 中使用 `tailwindcss` plugin。使用 `@tailwindcss/postcss` 或 Vite plugin。
* **Animation:** **Motion**（以前叫 Framer Motion 的 library）。从 `motion/react` import（`import { motion } from "motion/react"`）。`framer-motion` package 仍可作为 legacy alias 使用，新 code 优先 `motion/react`。
* **Fonts:** 始终使用 `next/font`（Next.js），或通过 `@font-face` + `font-display: swap` self-host。Production 中不要通过 `<link>` 链接 Google Fonts。

### 3.B State
* Isolated UI 使用 local `useState` / `useReducer`。
* Global state 只用于避免 deep prop-drilling - Zustand、Jotai 或 React context。
* **绝不要**用 `useState` 跟踪由用户输入驱动的 continuous values（mouse position、scroll progress、pointer physics、magnetic hover）。使用 Motion 的 `useMotionValue` / `useTransform` / `useScroll`。`useState` 每次变化都会 re-render React tree，在 mobile 上会崩。

### 3.C Icons
* **Allowed libraries（优先级顺序）：** `@phosphor-icons/react`、`hugeicons-react`、`@radix-ui/react-icons`、`@tabler/icons-react`。
* **Discouraged:** `lucide-react`。只有用户明确要求，或 project 已经依赖它时才可接受。
* **绝不要手写 SVG icons。** 缺少 glyph 时，安装第二个 library 或用 primitives 组合，不要从零绘制 icon paths。
* **每个 project 一个 family。** 不要在同一个 component tree 混用 Phosphor 和 Lucide。
* **全局统一 `strokeWidth`**（例如 `1.5` 或 `2.0`）。

### 3.D Emoji Policy
默认不建议在 code、markup 和 visible text 中使用 emoji。用 icon-library glyphs 替代符号。**Override:** 只有用户明确要求 playful / chat-style / social-native vibe 时才允许 emoji，即便如此也要克制、有意图地使用。

### 3.E Responsiveness & Layout Mechanics
* 统一 breakpoints（`sm 640`、`md 768`、`lg 1024`、`xl 1280`、`2xl 1536`）。
* 使用 `max-w-[1400px] mx-auto` 或 `max-w-7xl` 约束 page layouts。
* **Viewport Stability:** full-height Hero sections 绝不要用 `h-screen`。始终使用 `min-h-[100dvh]`，防止 mobile（iOS Safari address bar）上的 layout jumping。
* **Grid over Flex-Math:** 绝不要使用复杂 flexbox percentage math（`w-[calc(33%-1rem)]`）。始终使用 CSS Grid（`grid grid-cols-1 md:grid-cols-3 gap-6`）。

### 3.F Dependency Verification (mandatory)
Import 任何 3rd-party library 前，检查 `package.json`。如果 package 缺失，先输出 install command。**绝不要**假设 library 已存在。

---

## 4. DESIGN ENGINEERING DIRECTIVES（Bias Correction）

LLMs 默认会走向 clichés。要主动覆盖这些 defaults。每条规则都有 context-aware override path。

### 4.1 Typography
* **Display / Headlines:** 默认 `text-4xl md:text-6xl tracking-tighter leading-none`。
* **Body / Paragraphs:** 默认 `text-base text-gray-600 leading-relaxed max-w-[65ch]`。
* **Sans font choice:**
  * **不建议作为默认：** `Inter`。优先选择 `Geist`、`Outfit`、`Cabinet Grotesk`、`Satoshi` 或 brand-appropriate serif。
  * **Override:** 当用户明确要求 neutral / standard / Linear-style feel，或 brief 是 public-sector / accessibility-first site 时，Inter 可以接受。
* **需要知道的 pairings:** `Geist` + `Geist Mono`、`Satoshi` + `JetBrains Mono`、`Cabinet Grotesk` + `Inter Tight`、`GT America` + `IBM Plex Mono`。

* **SERIF DISCIPLINE (VERY DISCOURAGED AS DEFAULT):**
  * 非常不建议把 Serif 作为任何 project 的 default font。"It feels creative / premium / editorial" 不是使用 serif 的理由。Agent 默认认为 "creative brief = serif" 是 production rounds 中最常见的 AI tell 之一。
  * **只有以下任一条件明确成立时，Serif 才可接受：**
    - Brand brief 直接点名 serif font，或
    - Aesthetic family 确实是 editorial / luxury / publication / manuscript / heritage / vintage，并且你能说明为什么这个 specific serif 适合这个 specific brand
  * 其他所有情况（creative agency、design studio、modern brand、premium consumer、portfolio、lifestyle）都默认使用 **sans-serif display**（Geist Display、ABC Diatype、Söhne Breit、Cabinet Grotesk Display、Migra Sans、GT Walsheim、Inter Display、PP Neue Montreal）。Sans display fonts 并不 "boring"，它们成为默认的理由就像黑色在时尚中成为默认一样。
  * **EMPHASIS RULE（相关）：** 当你想在 headline 中强调一个词（例如 kinetic "and `spatial` design" 这种 type move），使用**同一 font 的 italic 或 bold**。不要为了制造 visual interest，把 random serif word 塞进 sans headline（反过来也一样）。Mixed-family emphasis 很业余。同 family 的 italic/bold emphasis 才是正确做法。
  * **默认明确禁用：** `Fraunces` 和 `Instrument_Serif`（两个 LLM-favorite display serifs）。
  * **如果 serif 有正当理由**（按上面规则很少见），从这个 pool 轮换，不要连续 projects 重复使用同一个 serif：PP Editorial New, GT Sectra Display, Cardinal Grotesque, Reckless Neue, Tiempos Headline, Recoleta, Cormorant Garamond, Playfair Display, EB Garamond, IvyPresto, Migra, Editorial Old, Saol Display, Söhne Breit Kursiv, Domaine Display, Canela, Schnyder, Tobias, NB Architekt, ITC Galliard.

* **ITALIC DESCENDER CLEARANCE（mandatory）：** 当 display type 使用 italic 且单词包含 descender letter（`y g j p q`）时，`leading-[1]` 或 `leading-none` 会裁掉 descender。最少使用 `leading-[1.1]`，并在 wrapping element 上加 `pb-1` 或 `mb-1` 预留。Shipping 前 audit display headlines 中每个 italic word。

### 4.2 Color Calibration
* 最多 1 个 accent color。默认 Saturation < 80%。
* **THE LILA RULE:** 不建议默认使用 "AI Purple / Blue glow" aesthetic。不要自动 purple button glows，不要 random neon gradients。使用 neutral bases（Zinc / Slate / Stone）搭配 high-contrast singular accents（Emerald、Electric Blue、Deep Rose、Burnt Orange 等）。
* **Override:** 如果 brand 或 brief 明确要求 purple / violet / lila，就拥抱它。但要有意图地执行：consistent palette、harmonised neutrals、restrained gradients。不要 generic AI gradient slop。
* **每个 project 一个 palette。** 不要在同一个 project 中 warm grays 和 cool grays 来回漂移。
* **COLOR CONSISTENCY LOCK（mandatory）：** 一旦为 page 选定 accent color，就在**整个** page 上使用它。Warm-grey site 不应在 section 7 突然出现 blue CTA。Rose-accented site 不应在 footer 出现 teal status badge。选择一个 accent，锁定它，shipping 前 audit 每个 component。

* **PREMIUM-CONSUMER PALETTE BAN (mandatory, second-most-recurring AI-tell):**
  * 对 premium-consumer briefs（cookware、wellness、artisan、luxury、heritage craft、DTC home goods 等），LLM default 是 **warm beige/cream + brass/clay/oxblood/ochre + espresso/ink dark text**。以下 hex families 禁止作为 default backgrounds 和 accents：
    - Backgrounds: `#f5f1ea`, `#f7f5f1`, `#fbf8f1`, `#efeae0`, `#ece6db`, `#faf7f1`, `#e8dfcb` (all "warm paper / cream / chalk / bone")
    - Accents: `#b08947`, `#b6553a`, `#9a2436`, `#9c6e2a`, `#bc7c3a`, `#7d5621` (all "brass / clay / oxblood / ochre")
    - Text: `#1a1714`, `#1a1814`, `#1b1814` (all "espresso / warm near-black")
  * 此 palette 禁止作为 premium-consumer briefs 的默认选择。你曾经 ship 的每个 premium-consumer site 都使用过这套 palette，brand 会因此消失。
  * **Default alternatives（轮换，不要重复）：**
    - **Cold Luxury:** silver-grey + chrome + smoke (think Tesla, Apple Watch Hermes-without-the-leather)
    - **Forest:** deep green + bone + amber accent (think Filson, Patagonia premium)
    - **Black and Tan:** true off-black + warm tan, sharp contrast, no beige
    - **Cobalt + Cream:** saturated blue against a single neutral, no brass
    - **Terracotta + Slate:** warm rust against cool grey, no brass
    - **Olive + Brick + Paper:** muted olive plus brick-red accent
    - **Pure monochrome + single saturated pop:** off-white + off-black + one bright accent (electric blue, emerald, hot pink, etc.)
  * **Palette-rotation rule:** 如果你生成的上一个 premium-consumer project 使用了 beige+brass family，这一个必须使用不同 family。不要连续两次 ship 同一个 warm-craft palette。
  * **Override:** 只有 brand brief 明确点名这些 colors，或 brand identity 确实是 vintage / artisan / warm-craft 且你能说明为什么此 specific palette 适合此 specific brand 时，beige+brass+espresso palette 才可接受。因为 "this is a cookware brief" 就默认选它是禁止的。

### 4.3 Layout Diversification
* **ANTI-CENTER BIAS:** 当 `DESIGN_VARIANCE > 4` 时，避免 Centered Hero / H1 sections。强制考虑 "Split Screen" (50/50)、"Left-aligned content / right-aligned asset"、"Asymmetric white-space" 或 scroll-pinned structures。
* **Override:** 对 editorial / manifesto / launch-announcement briefs，如果 message 本身就是 design，centered hero 可以接受。

### 4.4 Materiality, Shadows, Cards
* 只有 elevation 传达真实 hierarchy 时才使用 cards。否则用 `border-t`、`divide-y` 或 negative space 分组。
* 使用 shadow 时，让它 tint 到 background hue。Light backgrounds 上不要 pure-black drop shadows。
* 对 `VISUAL_DENSITY > 7`：禁止 generic card containers。Data metrics 应在 plain layout 中呼吸。
* **SHAPE CONSISTENCY LOCK（mandatory）：** 为 page 选择一种 corner-radius scale 并坚持使用。选项：all-sharp（radius 0）、all-soft（radius 12-16px）、all-pill（interactive full radius）。Mixed systems 只有在有 documented rule（例如 "buttons are full-pill, cards are 16px, inputs are 8px"）且处处遵守时才允许。Square layout 里出现 round buttons，或 pill-button page 上出现 square cards，都是 broken design。

### 4.5 Interactive UI States
LLMs 默认只做 "static successful state only"。始终实现完整 cycles：
* **Loading:** Skeletal loaders 要匹配最终 layout 的 shape。避免 generic circular spinners。
* **Empty States:** 构图精致，并说明如何填充。
* **Error States:** 清晰、inline（forms）或 contextual（toasts 只用于 transient）。
* **Tactile Feedback:** 在 `:active` 上使用 `-translate-y-[1px]` 或 `scale-[0.98]` 模拟 physical push。
* **BUTTON CONTRAST CHECK（mandatory, a11y）：** Shipping 任何 button 前，验证 button text 相对 button background 可读。White button + white text、`bg-white` CTA 搭配 `text-white` label、没有 border 的 transparent button 放在 page background 上，全部禁止。Audit 每个 CTA：contrast ratio 至少满足 WCAG AA（body 4.5:1，18px+ large text 3:1）。同样规则适用于 photographic backgrounds 上的 ghost buttons（使用 backdrop、scrim 或 stroke）。
* **CTA BUTTON WRAP BAN（mandatory）：** Button text 在 desktop 必须单行显示。如果 "VIEW SELECTED WORK" 这样的 label wrap 到 2 或 3 行，button 就坏了。修复方式：缩短 label（primary CTAs 最多 3 个词，理想 1-2 个），或加宽 button（不要人为限制 CTA 的 `max-width`）。Desktop 下 wrapped CTAs 是 Pre-Flight Fail。
* **NO DUPLICATE CTA INTENT（mandatory）：** 同一 page 上两个 CTAs 拥有相同 intent 是 Pre-Flight Fail。相同 intent 示例："Get in touch" + "Contact us" + "Let's talk" + "Start a project" + "Start something" + "Reach out" 全都是 "contact" intent -> 选择一个 label，并在 page 的 nav、hero、footer 全部使用它。"Try free" + "Get started" + "Sign up free"（都是 "signup" intent）和 "View work" + "See selected work" + "Browse projects"（都是 "portfolio" intent）同理。每个 intent 只用一个 label。
* **FORM CONTRAST CHECK（mandatory, a11y）：** Form inputs、placeholder text、focus rings、helper text 和 error text 相对 section background 都必须通过 WCAG AA contrast。Near-white form 上的 light placeholders、white page section 上的 white form、低于 4.5:1 contrast 的 form labels 全部禁止。Shipping 前 audit 每个 form。

### 4.6 Data & Form Patterns
* Label 放在 input 上方。Helper text 可选但 markup 中应存在。Error text 放在 input 下方。Input blocks 使用标准 `gap-2`。
* 永远不要 placeholder-as-label。

### 4.7 Layout Discipline（硬规则。任何一条失败都等于 shipping broken work）

* **Hero 必须适配初始 viewport。** Desktop 上 headline 最多 2 行，subtext 最多 **20 words** 且最多 3-4 行，CTAs 无需 scroll 即可看到。如果 copy 太长：降低 font scale 或删减 copy。如果无法用 20 words 的 subtext 说明 value-prop，说明 value-prop 不清楚，而不是规则太严。不要让 hero overflow，迫使用户 scroll 才能找到 CTA。
* **Hero font-scale discipline。** Font size 和 image size 要一起规划。如果 hero asset 很大且 headline 超过 6 个词，不要从 `text-7xl/text-8xl` 起步。多数 heroes 的默认合理范围是 `text-4xl md:text-5xl lg:text-6xl`；只有 headline 为 3-5 个词时才用 `text-6xl md:text-7xl`。4 行 hero headline 永远是 font-size error，不是 copy-length error。
* **HERO TOP PADDING CAP（mandatory）：** Desktop 上 hero top padding 最大 `pt-24`（约 6rem）。超过这个值，hero content 会像浮在 viewport 中段，是 layout bug，不是 intentional space。如果 hero 需要更多 breathing room，增加 font scale 或 asset size，不要增加 top padding。
* **HERO STACK DISCIPLINE（最多 4 个 text elements）。** Hero 是一个 single moment，不是 feature list。允许的 text elements 总计最多 4 个：
  1. Eyebrow（small uppercase label）或 brand strip 或都不用 - 三选零/一
  2. Headline（最多 2 行，见上文）
  3. Subtext（最多 20 words，最多 4 行）
  4. CTAs（1 primary + 最多 1 secondary）
  - **Hero 中禁止：** CTAs 下方的 tiny tagline（"Works with GitHub, GitLab, and self-hosted Git"）、trust micro-strip（"Used by engineering teams at..."）、pricing teaser（"Free for solo, $10/user for teams"）、feature bullet list、social-proof avatar row。它们都移到 hero 正下方的 dedicated sections。
  - 如果同一个 hero 里既有 eyebrow 又有 CTAs 下方 tagline，删除 tagline。如果既有 brand strip 又有 tagline，也删除 tagline。每个 hero 最多一个 small text element。
* **"Used by" / "Trusted by" logo wall 应放在 hero 下方，绝不放进 hero。** Hero 用于 value prop 和 primary CTA。Logo wall 是正下方的独立 section。不要把 trust logos 塞进 hero copy 的同一 flex row。
* **Navigation 在 desktop 必须单行渲染。** 如果 items 在 `lg`（1024px）放不下，压缩 labels、删除 secondary items，或移到 hamburger。Desktop 上两行 nav 是 broken design。
* **Navigation height cap：desktop 最多 80px，默认 64-72px。** 不要用占掉 15% viewport 的巨大 "agency" nav bars。
* **Bento grids 必须有 rhythm，而不是单边重复。** 不要堆 6 行 left-image / right-text。变化 composition：交替 full-width feature rows、asymmetric tile sizes、vertical breaks。
* **BENTO CELL COUNT RULE（mandatory）：** Bento grid 的 cell 数必须精确匹配 content 数。3 items -> 3 cells（1+2 split、2+1 或 asymmetric trio）。5 items -> 5 cells（2+3、3+2、hero+4 等）。如果 grid 中间或末尾有 empty cell，说明规划错了。重塑 grid，不要贴 blank tile。
* **Section-Layout-Repetition Ban。** 一旦某个 section 使用了某个 layout family（例如 3-column-image-cards、full-width-quote、split-text-image），这个 family 在整页最多出现一次。"Selected commissions" 不能看起来像 "What we do."。8 sections 的 landing page 至少要使用 4 种不同 layout families。
* **ZIGZAG ALTERNATION CAP（mandatory）。** 交替 "left-image + right-text" 然后 "left-text + right-image" 的 zigzag layout 很平庸。此 image+text-split pattern 最多连续 2 个 sections。第 3 个连续 image+text split 是 Pre-Flight Fail。用 full-width section、vertical-stack section、bento grid、marquee 或不同 layout family 打破 pattern。
* **EYEBROW RESTRAINT（mandatory，production tests 中最常被违反的规则）。** "Eyebrow" 是 section headline 上方的小号 uppercase wide-tracking label（例如 `FOUR COLORWAYS`、`SELECTED WORK`、`THE HARDWARE`、`Git-native task management`）。典型 CSS signature：`text-[11px] uppercase tracking-[0.18em]`、`font-mono text-[10.5px] uppercase tracking-[0.22em]`。每个 AI-built site 都在每个 section header 上放 eyebrow，产生同样的 templated rhythm。硬规则：
  - **每 3 个 sections 最多 1 个 eyebrow。** Hero 计为 1。所以 9 sections 的页面最多 3 个 eyebrows。
  - 如果 section A 有 eyebrow，接下来 2 个 sections 不能有。
  - **Pre-Flight Check 是机械的：** 统计所有 section components 中的 `uppercase tracking`（或 headlines 上方类似 small-caps mono labels）实例。如果 count > ceil(sectionCount / 3)，output 失败。
  - **替代 eyebrow 的做法：** 直接删除。Headline 本身已经足够。如果需要给 section 分类，section 在 page 中的位置已经完成分类；不需要 label。
* **SPLIT-HEADER BAN（mandatory）。** 把 "left big headline + right small explainer paragraph" 作为 section header 的模式（left col-span-7/8，right col-span-4/5，右列浮一个小 body paragraph）**默认禁用**。Sections 应该只有一个 focused message。如果确实同时需要 headline 和 explainer paragraph，垂直堆叠（headline 在上，body 在下，max-width 65ch）。只有存在真实 compositional reason 时才使用 split-header pattern（例如右列承载 visual 或 interactive element，而不是 filler text）。
* **Bento Background Diversity（mandatory）。** Bento 和 feature-grid sections 不能是 6 张白底白卡片加文字。任何 multi-cell grid 至少 2-3 个 cells 需要真实 visual variation：real image、brand-appropriate gradient（不是 AI-purple）、pattern、tinted background。只有 typography 的 cream-on-cream bento 会显得像无聊 AI default，即便页面其他部分不错。
* **Mobile collapse 必须逐 section 明确声明。** 每个 multi-column layout 都要在同一个 component 中声明 `< 768px` fallback。不要假设 "it'll work, Tailwind handles it"。

### 4.8 Image & Visual Asset Strategy

Landing pages 和 portfolios 是**视觉产品**。只有文本、再加 fake-screenshot divs 的页面是 slop。

**Visual assets 优先级：**
1. **优先使用 image-generation tool。** 如果环境中有任何 image-gen tool（`generate_image`、MCP image tool、IDE-integrated gen、OpenAI image tools 等），你必须用它创建 section-specific assets：hero photography、product shots、texture backgrounds、mood images。按 section 所需 aspect ratio 生成。不要因为手写 CSS 感觉更快就跳过此步骤。
2. **其次使用 real web images。** 没有 gen tool 时，使用真实 photography sources。可接受 defaults：
   * `https://picsum.photos/seed/{descriptive-seed}/{w}/{h}` for placeholder photography (seed should describe the section, e.g. `marrow-cookware-kitchen`)
   * Actual stock or brand URLs when the brief provides them
   * Open-license sources (Unsplash via direct URL, Pexels) if explicitly allowed
3. **最后才告诉用户。** 如果两者都不可行，不要用 hand-rolled SVG illustrations 或 div-based "fake screenshots" 填满页面。改为留下清晰标注的 placeholder slots（`<!-- TODO: hero product photo, 1600x1200 -->`），并在回复结尾说明：*"This page needs real images at: \[list of placements\]. Please generate or provide them."*

**即使 minimalist sites 也需要 real images。** 纯文本页面不是 minimalism，而是不完整。即使 editorial Linear-style site 也至少需要 2-3 张 real images（hero、一个 product/lifestyle shot、一个 supporting image）。如果 brief 很克制，可以生成 B&W minimalist photography；不要因为 dial 低就完全跳过 images。

**Social proof 使用真实 company logos。** 当 brief 需要 "Trusted by / Used by / Customers" logo wall 时，不要默认使用 plain text wordmarks（`<span>Acme Co</span>` 排成一行）。使用真实 SVG logos：
* **Source: Simple Icons** (`https://cdn.simpleicons.org/{slug}/ffffff` for any color, or `simple-icons` npm package). Covers most known brands.
* **Alternative: devicon** for tech-stack logos (`@svgr/cli` or CDN).
* **如果编造 brand name，也要编造 SVG mark。** 生成 simple monogram（圆中的一个字母、双字母 ligature、abstract glyph），作为匹配 page style 的 inline `<svg>` 渲染。Invented brand names 的 plain text wordmarks 会显得 generic。
* **始终**确保 logos 在 light 和 dark mode 下都能渲染（white-on-dark、black-on-light，或 single-color theme variable）。
* **LOGO-ONLY rule（mandatory）：** logo wall = logos and nothing else。不要在每个 logo 下打印 industry / category labels（不要 `Vercel` + `hosting`，不要 `Stripe` + `payments`，不要 `Cloudflare` + `infra`）。Logo 本身就是 credibility，label 不会增加用户不知道的信息。可选：为 screen readers 提供 brand name alt-text，可选链接到 brand site。仅此而已。

**Hand-rolled illustrations:**
* 来自 libraries 的 SVG icons：可以（见 Section 3.C）。
* Hand-rolled decorative SVGs（custom illustrations、logos、marks）：**强烈不建议**，绝不作为默认。只有以下情况才可接受：
  - Brief 明确要求（"draw me an SVG logo"）
  - 它是单个 simple geometric mark（square、circle、display type wordmark）
  - 你对 output quality 有把握

**Div-based fake screenshots 禁止。** 用 `<div>` rectangles、fake task lists、fake dashboards、fake terminal windows 渲染的 "hand-built product preview" 是 Tell。如果需要展示 product：
* Use a real screenshot URL if one exists
* Generate one via image tool
* Use a real component preview (an actual mini-version of the UI inside the page)
* Or skip the preview entirely and use editorial photography

**Hero 需要真实 visual。** Text + gradient blob 不是 hero，而是 placeholder。

### 4.9 Content Density

Landing pages 靠**第一印象**生存，不靠完整阅读。要狠心删减。

* **每个 section 的默认 content shape：** short headline（≤ 8 words）+ short sub-paragraph（≤ 25 words）+ 一个 visual asset 或一个 CTA。更多内容必须由 section 的任务证明合理。
* **不要 data-dump sections。** Marketing page 上的 20-row publication table、30-row award list、巨大 pricing matrix = wrong layout。使用：
  - Top 3-5 highlights + "View full list" link
  - Marquee / carousel 表达 breadth
  - 如果 data 就是 product，另建页面
* **Long lists 需要不同 UI component，不是更长 list。** 默认 `<ul>` bullets / `divide-y` rows 是 lazy choice。如果超过 5 items，改用以下之一：
  - 2-column split with grouped items
  - Card grid with image + label per item
  - Tabs / accordion if items are categorisable
  - Horizontal scroll-snap pills
  - Carousel for breadth-heavy lists (testimonials, logos, capabilities)
  - Marquee for "lots-of-things-that-don't-need-individual-attention"
  10 rows 且每行都有 hairline 的 spec sheet 是最差 default。要么把 rows 分成 2-3 个 chunks 并用 sparse dividers，要么改成 card-per-spec layout。
* **Spec sheets specifically（Marrow-cookware pattern）。** 每行 `border-b` 的 long product specification table 是 cookware / hardware / apparel / artisan-goods briefs 的 AI default。禁止。具体替代：
  - **2-col card grid:** 每个 spec 拥有自己的 card，包含 spec name、value（large display number）和一行 "why it matters" body。Desktop 2-col，mobile 1-col。
  - **Scroll-snap horizontal pills:** 每个 spec 是一个 pill，用户可以横向滑动。
  - **Grouped chunks:** 把 10 specs 分成 3 个 logical clusters（例如 "Materials"、"Cooking"、"Warranty"），每个 cluster 只有一个 soft divider 和一个 cluster heading。
  - **Featured-vs-rest:** 3-4 个 hero specs 以 large display tiles 可视化，其余折叠到 "View full specifications" disclosure 下。

* **COPY SELF-AUDIT（ship 前 mandatory）：** 宣布任何 task 完成前，重新阅读 page 上每个 visible string（headlines、subheads、eyebrows、button labels、body copy、captions、alt text、footer text、error messages）。标记任何符合以下情况的 string：
  - **语法破碎**（"free on its past"、"two plans but one is honest"、"to put it on the table" 脱离上下文）
  - **指代不清**（没有前文的 "we plan to stay that way"）
  - **听起来像 AI hallucination**（cute-but-wrong wordplay、对不上的 forced metaphors、"elegant nothing" phrases）
  - **像 LLM 试图显得 thoughtful**（passive-aggressive humility、fake-craftsman labels、mock-poetic micro-meta）
  重写每个 flagged string。如果不确定某个 string 是否合理，用 plain functional sentence 替换。AI-generated cute copy 比 boring copy 更糟。
* **Fake-precise numbers 会被标记。** `92%`、`4.1x`、`48k`、`5.8 mm`、`13.4 lb` 这样的数字必须满足：
  - 来自 real data（brief、brand guidelines、public metrics）- 可以
  - 明确标为 mock（`<!-- mock -->`、"example"、"sample data"）- 可以
  - AI-invented spec aesthetics - 禁止。不要伪造 brand 没有声明的 engineering precision。
* **每个 page 一个 copy register。** 除非 brand voice 明确要求，否则不要在同一个 composition 中混合 technical mono（"47 tasks · 0.6 ctx-switches/day"）、editorial prose 和 marketing punch。

### 4.10 Quotes & Testimonials

* Quote body **最多 3 行**。不要 6 行。原 quote 更长时就删减。Landing-page quote 是 snippet，不是 full review。
* 对非常小的 font sizes（例如 footer-style testimonials），line cap 可略微放宽。精神是："fits in a glance."
* **Quote text 中不要用 em-dashes** 作为 design flourish（长停顿、kinetic em-dashes、em-dash-bullets）。见 Section 9.G - em-dash 完全禁用。
* Attribution：name + role +（可选）company。不要只有 name（"- Sarah"）。
* Quote marks：使用真实 typographic quotes（" "）或完全不用。不要 straight ASCII（"）。

### 4.11 Page Theme Lock (Light / Dark Mode Consistency)

Page 只有一个 theme。Sections 不要反转。

* 如果 page 是 dark mode，所有 sections 都是 dark mode。不要在 dark sections 中间夹一个 light-mode-warm-paper section（反过来也一样）。用户不应在 mid-scroll 时感觉走进另一个网站。
* 例外：如果 brief 明确要求 "Color Block Story" 或 "Theme Switch on Scroll" device，且这是 deliberate composition（一次完整 theme switch 和强 transition，而不是 random alternation），则每页允许一次。
* 默认行为：在 page level 选择 light、dark 或 auto（`prefers-color-scheme`）并锁定。同 theme family 内的 section-level background tints 可以（`bg-zinc-950` 旁边 `bg-zinc-900`）；在 `bg-zinc-950` 页面中途翻到 `bg-amber-50` 是 broken。
* 使用带 built-in theming 的 design system（Radix Themes、带 `<Theme>` 的 shadcn/ui）时，在 `layout.tsx` 或 page root 设置一次 theme。不要让 individual sections override。

---

## 5. CONTEXT-AWARE PROACTIVITY

这些是 tools，不是 defaults。只有 design read 需要时才用。**它们不会自动触发。**

* **Liquid Glass / Glassmorphism:** 适合 premium consumer、Apple-adjacent、luxury brand 或 media-overlay vibes。不适合 dashboards、public-sector 或 "boring B2B"。使用时，不要只停留在 `backdrop-blur`：增加 1px inner border（`border-white/10`）和 subtle inner shadow（`shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`），模拟 physical edge refraction。在 `prefers-reduced-transparency` 下提供 solid-fill fallback。
* **Magnetic Micro-physics:** 当 `MOTION_INTENSITY > 5` 且 brief 读起来是 premium / playful / agency 时使用。只能用 Motion 的 `useMotionValue` / `useTransform` 在 React render cycle 外实现。不要用 `useState`。见 Section 3.B。
* **Perpetual Micro-Interactions**（Pulse、Typewriter、Float、Shimmer、Carousel）：当 `MOTION_INTENSITY > 5` 且 section 主动受益于 motion（status indicators、live feeds、AI-feel）时使用。**不是每张 card 都需要 infinite loop。** 如果 section 是 informational，就保持静止。使用 Spring Physics（`type: "spring", stiffness: 100, damping: 20`），不要 linear easing。
* **"Motion claimed, motion shown."** 如果 `MOTION_INTENSITY > 4`，page 必须真的动起来：至少 hero entry transitions、key sections scroll-reveal、CTAs hover physics。声称 `MOTION_INTENSITY: 7` 的 static page 是 broken。反过来，如果可用 scope 内无法 ship working motion，把 dial 降到 3，ship clean static page。不要 half-build 会坏的 motion（cut-off ScrollTriggers、jumpy enters、missing cleanups）。
* **MOTION MUST BE MOTIVATED（mandatory）。** 添加任何 animation 前，问："what does this animation communicate?" 有效答案：hierarchy（把注意力引到正确位置）、storytelling（按 narrative 顺序 reveal content）、feedback（确认用户 action）、state transition（展示变化）。无效答案："it looked cool"。因为 GSAP 可用就到处 GSAP 很业余。每个 ScrollTrigger、每个 marquee、每个 pinned section 都需要理由。如果不能用一句话说明理由，删除 animation。
* **MARQUEE MAX-ONE-PER-PAGE（mandatory）。** Horizontal scrolling text marquees（"logos endlessly scrolling"、"manifesto scrolling sideways"、"kinetic word strip"）每页最多适合一次。同页两个或更多 marquees 会像 lazy filler。选择一个 marquee 真正服务 content 的 section；其他 sections 使用不同 layout。
* **GSAP Sticky-Stack Pattern（使用 scroll-stack 时）。** "card stack on scroll" 必须是真正 sticky-stack，不是 sequential reveal list。Canonical code skeleton 见下方 Section 5.A。常见 failure：trigger 在 scroll 中途触发，而不是 pinning at viewport top。修复：`start: "top top"`，不是 `start: "top center"` 或 `"top 80%"`。
* **GSAP Horizontal-Pan Pattern（使用 horizontal scroll-hijack 时）。** Canonical skeleton 见下方 Section 5.B。常见 failure：section pin 之前 animation 就开始，导致用户看到半张 slide。同样修复：`start: "top top"`，pin wrapper，scrub inner track。

### 5.A Sticky-Stack - Canonical Skeleton

```tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function StickyStack({ cards }: { cards: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",                              // pin at viewport top
          endTrigger: cardEls[cardEls.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={ref} className="relative">
      {cards.map((card, i) => (
        <div
          key={i}
          className="stack-card sticky top-0 min-h-[100dvh] flex items-center justify-center"
        >
          {card}
        </div>
      ))}
    </div>
  );
}
```

关键点：`start: "top top"`、`pin: true`、除最后一张外每张 card 都 pinned，scale/opacity transform 由下一张 card 的 scroll trigger 驱动（这样 previous card 会在 next one 到来时缩小）。

### 5.B Horizontal-Pan - Canonical Skeleton

```tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalPan({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",                              // pin starts when section top hits viewport top
          end: () => `+=${distance}`,                    // scroll distance = track width minus viewport
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={wrap} className="relative overflow-hidden">
      <div ref={track} className="flex h-[100dvh] items-center">
        {children}
      </div>
    </section>
  );
}
```

关键点：`start: "top top"`、`pin: true`、`end: "+=${distance}"`（scroll length = 所需 horizontal travel）、`scrub: 1`。Wrapper pinned，用户 vertical scroll 时 inner track horizontal slide。

### 5.C Scroll-Reveal Stagger - Canonical Skeleton (lighter alternative)

对于简单的 "items appear as they enter viewport"（不 pinning），优先使用 Motion 的 `whileInView` 而不是 GSAP：更轻，不需要 ScrollTrigger。

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function RevealStagger({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <ul className="grid gap-6">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
```

适用：feature lists、testimonial grids、logo walls，以及任何只需要 "enter on scroll" 的内容。把 GSAP 留给真正的 pin/scrub work。

### 5.D Forbidden Animation Patterns

* **`window.addEventListener("scroll", ...)`** 禁止。它每个 scroll frame 都运行，容易 jank，没有 batching。使用 Motion 的 `useScroll()`、GSAP 的 `ScrollTrigger`、IntersectionObserver 或 CSS `scroll-driven animations`（`animation-timeline: view()`）。
* **在 React state 中用 `window.scrollY` 自定义 scroll progress calculations。** 同样原因。每帧 re-render。
* **会触碰 React state 的 `requestAnimationFrame` loops。** 改用 motion values（`useMotionValue` + `useTransform`）。
* **Layout Transitions:** 对 visible state changes（re-ordering lists、expanding modals、routes 间 shared elements）使用 Motion 的 `layout` 和 `layoutId` props。不要为了 "safety" 给 static content 包 `layout` props，它会带来 measurement work。
* **Staggered Orchestration:** 对 sequence matters 的 reveal moments，使用 `staggerChildren`（Motion）或 CSS cascade（`animation-delay: calc(var(--index) * 100ms)`）。使用 `staggerChildren` 时，parent（`variants`）和 children 必须共享同一个 Client Component tree。

---

## 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS

### 6.A Hardware Acceleration
* 只 animate `transform` 和 `opacity`。不要 animate `top`、`left`、`width`、`height`。
* 克制使用 `will-change: transform`，只给真正会 animate 的 elements。

### 6.B Reduced Motion (mandatory)
* **任何高于 `MOTION_INTENSITY > 3` 的 motion 都必须尊重 `prefers-reduced-motion`。** 这不可协商。
* Motion 中：用 `useReducedMotion()` 包裹，并 degrade to static。
* CSS 中：把 animations 放在 `@media (prefers-reduced-motion: no-preference)` 后，或在 `@media (prefers-reduced-motion: reduce)` 下提供禁用的 override block。
* Infinite loops、parallax、scroll-hijack 和 magnetic physics 在 reduced motion 下必须 collapse to static / instant。

### 6.C Dark Mode (mandatory for any consumer-facing page)
* 从一开始就为 **both modes** 设计。没有用户明确指示，不要 ship light-only 或 dark-only。
* 使用 Tailwind `dark:` variant 或 CSS variables for tokens。每个 project 选择一种 strategy。
* **这里不规定具体 dark-mode colors。** 由 brief 决定。两个 modes 都要保持 visual hierarchy、brand identity 和 WCAG AA contrast（body 目标 AAA）。
* 尊重 `prefers-color-scheme: dark`。除非 brand 坚持某个 mode，否则默认使用 system preference。

### 6.D Core Web Vitals Targets
* **LCP** < 2.5s。Hero image 必须使用 `next/image priority` 或 preload。
* **INP** < 200ms。Heavy work 放到 main thread 外。
* **CLS** < 0.1。为 images、fonts、embeds 预留空间。
* 宣布 page done 前运行 Lighthouse。

### 6.E DOM Cost
* Grain / noise filters 只能应用到 fixed、`pointer-events-none` pseudo-elements（例如 `fixed inset-0 z-[60] pointer-events-none`）。不要用于 scrolling containers，continuous GPU repaints 会毁掉 mobile FPS。
* 注意 bundle size。Motion 不小。Three.js 很大。非 above-the-fold 内容都 lazy-load。

### 6.F Z-Index Restraint
不要滥用 arbitrary `z-50` 或 `z-10`。Z-index 只用于 systemic layer contexts（sticky navbars、modals、overlays、grain）。在 project constants file 中记录 z-index scale。

---

## 7. DIAL DEFINITIONS (Technical Reference)

### DESIGN_VARIANCE (Level 1-10)
* **1-3 (Predictable):** Symmetrical CSS Grid（12-col、equal fr-units）、equal paddings、centered alignment。
* **4-7 (Offset):** `margin-top: -2rem` overlaps、varied image aspect ratios（4:3 next to 16:9）、left-aligned headers over center-aligned data。
* **8-10 (Asymmetric):** Masonry layouts、fractional units 的 CSS Grid（`grid-template-columns: 2fr 1fr 1fr`）、massive empty zones（`padding-left: 20vw`）。
* **MOBILE OVERRIDE:** 对 levels 4-10，`md:` 以上的 asymmetric layouts 在 `< 768px` viewports 上必须 collapse to strict single-column（`w-full`、`px-4`、`py-8`）。

### MOTION_INTENSITY (Level 1-10)
* **1-3 (Static):** 没有 automatic animations。只有 CSS `:hover` 和 `:active` states。反正 `prefers-reduced-motion` 是默认模式。
* **4-7 (Fluid CSS):** `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`。`animation-delay` cascades 用于 load-ins。聚焦 `transform` 和 `opacity`。
* **8-10 (Advanced Choreography):** 复杂 scroll-triggered reveals、parallax、scroll-driven animation（CSS `animation-timeline` 或 GSAP ScrollTrigger）。使用 Motion hooks。**绝不要用 `window.addEventListener('scroll')`**，这是 hard ban，不是 "prefer-not"。允许替代方案见 Section 5.D。

### VISUAL_DENSITY (Level 1-10)
* **1-3 (Art Gallery):** 大量 white space。巨大 section gaps（`py-32` 到 `py-48`）。Expensive、clean。
* **4-7 (Daily App):** 标准 web app spacing（`py-16` 到 `py-24`）。
* **8-10 (Cockpit):** Tight paddings。不要 card boxes；用 1px lines 分隔 data。Mandatory：所有 numbers 使用 `font-mono`。

---

## 8. DARK MODE PROTOCOL

默认 dual-mode。除非 brief 是 print-emulating editorial，否则不要假设 light-only。

### 8.A Token Strategy (pick one, stick to it)
* **Tailwind `dark:` variant**（utility-first projects 的默认）：每个 color utility 都搭配 dark variant（`bg-white dark:bg-zinc-950`、`text-gray-900 dark:text-gray-100`）。
* **CSS variables**（用于 shadcn/ui、Radix Themes 或带 theming 的 component libraries）：定义 semantic tokens（`--surface`、`--surface-elevated`、`--text-primary`、`--accent`），并在 `[data-theme="dark"]` 或 `@media (prefers-color-scheme: dark)` 下切换 values。

### 8.B Do Not Prescribe Specific Colors Here
由 brief 和 brand 决定。本 skill 只强制：
* **Contrast** - body text 至少 WCAG AA，hero copy 目标 AAA。
* **Hierarchy parity** - light 中有效的 visual hierarchy 在 dark 中也必须有效。如果 CTA 在 light 中突出，在 dark 中也要突出。
* **Brand fidelity** - primary brand color 保持可识别。不要把 brand desaturate 到 dark mode 里。
* **不要 pure `#000000` 和 pure `#ffffff`** - 使用 off-black（zinc-950、near-black warm gray）和 off-white。Pure values 会杀掉 depth。

### 8.C Default Mode
除非 brand 坚持，否则尊重 `prefers-color-scheme`。如果任一 mode 会丢失关键 brand expression，添加 manual toggle。

### 8.D Test in Both Modes Before Finishing
开发期间在两种 modes 中都打开 page。不要 ship 只看过一个 mode 的 page。

---

## 9. AI TELLS（Forbidden Patterns）

除非 brief 明确要求，否则避免这些 signatures。

### 9.A Visual & CSS
* 默认**不要 neon / outer glows**。使用 inner borders 或 subtle tinted shadows。
* **不要 pure black (`#000000`)。** 使用 off-black、zinc-950 或 charcoal。
* **不要 oversaturated accents。** Desaturate，让它与 neutrals 融合。
* 大标题**不要 excessive gradient text**。
* **不要 custom mouse cursors。** 过时、accessibility-hostile、perf-hostile。

### 9.B Typography
* **避免默认 Inter。** 见 Section 4.1。存在 override path。
* **不要只会喊叫的 oversized H1s。** 用 weight + color 控制 hierarchy，不要只靠 raw scale。
* **Serif constraints:** Serif 用于 editorial / luxury / publication，不用于 dashboards。

### 9.C Layout & Spacing
* Padding 和 margins 要**数学上精确**。不要有 awkward gaps 的 floating elements。
* **不要 3-column equal feature cards。** Generic "three identical cards horizontally" feature row 禁止。使用 2-column zig-zag、asymmetric grid、scroll-pinned 或 horizontal-scroll alternative。

### 9.D Content & Data ("Jane Doe" Effect)
* **不要 generic names。** "John Doe"、"Sarah Chan"、"Jack Su" -> 使用 creative、realistic、locale-appropriate names。
* **不要 generic avatars。** 不要 SVG "egg" 或 Lucide user icons -> 使用 believable photo placeholders 或 specific styling。
* **不要 fake-perfect numbers。** 避免 `99.99%`、`50%`、`1234567`。使用 organic、messy data（`47.2%`、`+1 (312) 847-1928`）。
* **不要 startup-slop brand names。** "Acme"、"Nexus"、"SmartFlow"、"Cloudly" -> 发明 contextual、premium、听起来真实的 names。
* **不要 filler verbs。** "Elevate"、"Seamless"、"Unleash"、"Next-Gen"、"Revolutionize" -> 只用 concrete verbs。

### 9.E External Resources & Components
* **不要 hand-rolled SVG icons。** 使用 Phosphor / HugeIcons / Radix / Tabler。Lucide 只在 explicit request 时使用。
* 默认**强烈不建议 hand-rolled decorative SVGs**（见 Section 4.8）。
* **不要 div-based fake screenshots。** 绝不要用 `<div>` rectangles 搭出 fake product UI 来模拟 screenshot。使用 real images、generated images，或跳过 preview。
* **不要 broken Unsplash links。** 使用 `https://picsum.photos/seed/{descriptive-string}/{w}/{h}`、generated photo placeholders 或 actual assets。
* **shadcn/ui customization:** 可以，但绝不要 default state。根据 project aesthetic 定制 radii、colors、shadows、typography。
* **Production-Ready Cleanliness:** Code 视觉上 clean、memorable、meticulously refined。

### 9.F Production-Test Tells (banned outright)

这些 patterns 来自真实 LLM-generated landing-page tests。它们是 model 试图 "look designed" 时会默认使用的 signatures。除非 brief 明确要求，否则视为 hard bans。

**Hero & top-of-page**
* **Hero 中不要 version labels。** `V0.6`、`v2.0`、`BETA`、`INVITE-ONLY PREVIEW`、`EARLY ACCESS`、`ALPHA` 禁止作为 default eyebrows。只有 brief 明确关于 product launch / preview status 时才可接受。
* **不要 "Brand · No. 01" 风格 sub-eyebrows。** "Marrow · No. 01 · The 6-quart" 这种 micro-meta lines。跳过它们。

**Section numbering & micro-labels**
* **不要 section-number eyebrows。** `00 / INDEX`、`001 · Capabilities`、`002 · Featured commission`、`06 · how it works`、`05 · The honest table` 禁止。Eyebrows 应用 plain language 命名 topic，而不是编号。
* **Images 或 bento tiles 上不要 `01 / 4` 风格 pagination。** 用户会数的话就不需要 label。
* **不要 `Scroll · 001 Capabilities` 风格 scroll cues。** 简单 arrow 或 "Scroll" 足够；不要 section-number prefix。
* **不要 "Index of Work, 2018 - 2026" 风格 range labels** 作为 eyebrows。直接说 section 是什么。

**Separators & dots**
* **Middle-dot (`·`) 要限量。** Metadata strips 中每行最多 1 个。不要把它作为所有东西的 default separator（"foo · bar · baz · qux · quux"）。如果需要 separator family，优先用 line breaks、hairlines 或 columns。
* **不要在每个 list/nav/badge 上放 decorative colored status dots。** 在 "ONE Q4 SLOT OPEN" 前、每个 nav link 前或每个 task row 前放 colored dot，默认禁止。只有 dot 传达真实 semantic state（server status、availability flag）且克制使用时才可接受。

**Em-dashes & typography flourishes**
* **不要把 em-dash (`—`) 作为 design element，也不要在任何地方使用。** 完整且不可协商的禁令见 Section 9.G。Em-dash character 禁用于 headlines、eyebrows、pills、body copy、quotes、attribution、captions、button text 和 alt text。使用 regular hyphen（`-`）。
* **不要默认使用 `<br>`-broken-and-italicized headlines** 作为 "design move"。例如 "for thirty\<br\>*years.*" 这种 split。Headlines 首先要自然可读，只有 brief 需要时才 clever。
* **不要 vertical rotated text**（"INDEX OF WORK, 2018 - 2026" 旋转 90 度）。这是 agency-portfolio cliché。只有 brief 明确是 agency / Awwwards / experimental，且它服务真实 composition purpose 时才使用。
* **不要把 crosshair / hairline grid lines 当 decoration。** 只是为了让 page "feel designed" 而画的 vertical/horizontal lines 禁止。只有它们组织真实 content 时才使用。

**Fake product previews**
* **Hero 中不要 div-based fake product UI**（fake task list、fake terminal、styled divs 搭的 fake dashboard）。这是 #1 LLM-design Tell。使用 real screenshot、generated image、real component preview，或完全不用。
* Fake screenshots 中**不要 fake version footers**（"v0.6.2-rc.1"、"last sync 4s ago · main"）。没有价值，AI 味很重。

**Marketing-copy Tells**
* Social-proof headers **不要 "Quietly in use at" / "Quietly trusted by"**。使用自然语言："Trusted by"、"Used at"、"Customers include"，如果 logos 自己会说话，也可以完全跳过 heading。
* Quote、blog 或 sidebar sections 上**不要 "From the field" / "Field notes" / "Currently on the bench" / "On our desks" / "Loose plates" 风格 poetic labels**。读起来像 performative-craftsman。使用 plain functional labels（"Testimonials"、"Latest writing"、"Now working on"）或跳过 label。
* Body copy 中**不要 "We respect the French ones" 风格** mock-humble industry-references。Cute 且 AI-y。
* Headers/footers 中**不要 weather / locale strips**（"LIS 14:23 · 18°C"），除非 brief 明确关于某个 place / time-zone-distributed studio。
* **Eyebrows 下不要 micro-meta-sentences。** Section heading 下方出现 *"Each of these is a feature we ship today, not a roadmap promise. The list will stay short on purpose."* 这样的句子是 clutter。Eyebrow + Headline + Body 足够。
* **不要 generic step labels。** "Stage 1 / Stage 2 / Stage 3"、"Step 1 / Step 2 / Step 3"、"Phase 01 / Phase 02 / Phase 03"、"Pass One / Pass Two / Pass Three"。禁止。实际 step content 就是 label。如果必须展示 progression，直接使用 verb-noun（"Install"、"Configure"、"Ship"），不要 "Stage 1: Install"。

**Pills, labels and version stamps**
* **不要在 images 上 overlay pills/labels/tags。** 不要给 photos 叠 `<span>`，写 `Brand · 02`、`PLATE · BRAND`、`Field notes - journal` 这类 tags。要么让 image 独自表达，要么在 image 正下方（image 外部）加 caption。
* **不要把 photo-credit captions 当 decoration。** Stock/picsum images 下方的 `Field study no. 12 · Ines Caetano`、`Plate 03 · House archive`、`Frame XII · 35mm` 很做作。只有确实在为真实 photo 的真实 photographer credit（且有 permission）时才允许 photo credit。否则跳过 caption，或使用一行 functional caption（"The 6-quart, in Sage."）。
* **Marketing pages 上不要 version footers。** `v1.4.2`、`Build 0048`、`last sync 4s ago · main` 这类 footer strings 是 CLI / devtool fixtures，不是 landing-page content。Marketing/landing/portfolio pages 禁止。
* **不要把 "Reservation 412 of 800" 风格 live-stock counters 当 decoration。** 只有 brief 明确是带真实数据的 limited-run waitlist 时才可用。

**Decoration text strips**
* **Hero bottom 不要 decoration text strip。** `BRAND. MOTION. SPATIAL.`、`TYPE / FORM / MOTION`、`DESIGN · BUILD · SHIP`、`ESTD. 2018 · LISBON · BRAND. MOTION. SPATIAL.` 这类在 hero bottom 横跨一条 small mono-caps strip，是 agency-portfolio cliché。默认禁止。只有 strip 承载真实可导航 links（sticky bottom nav）或真实 status info（cookie banner、docs site 上的 build info）时才可接受。
* **Section headings 中不要 floating top-right sub-text。** Pattern：section 有 giant left-aligned headline；同一个 section header 右上角浮一个 small explainer paragraph，且与其他内容没有清晰 alignment。那个 floater 就是 Tell。要么把 sub-text 直接放在 headline 下方，要么构建 clean 2-column header（left: headline, right: aligned body），不要 tiny corner paragraph。

**Lists, dividers and scoring**
* **Long list / spec table 的每一行不要同时 `border-t` + `border-b`。** 二选一（rows 间 bottom-border 或 group 上方 top-border），并克制使用。每行下方都有 hairline 的 10-row spec table 是最懒的 layout，替代 UI components 见 Section 4.9。
* Comparison visuals **不要使用带 filled background tracks 的 scoring/progress bars**。如果需要展示 "X out of Y" comparisons，优先用 number + small icon，或没有 background track 的 tiny inline bar。带 partial fill 的巨大 `bg-zinc-200` tracks 是 landing page 上的 dashboard-UI clutter。

**Locale, time, scroll cues**
* **99% 的 briefs 都禁止 locale / city-name / time / weather strips。** Hero 中的 "Lisbon, working with founders"，footer 中的 "1200-690 Lisbon, Portugal"，nav 中的 "Lisbon 14:23 · 18°C" 都是 agency-portfolio decoration tells。只有以下情况允许：brief 明确描述 globally-distributed studio 且 timezone-relevant，或 travel-focused brand，或 real-world physical venue。Footer 中单次 contact-address mention 可以；atmospheric locale strip 不可以。
* **Scroll cues 禁止。** `Scroll`、`↓ scroll`、`Scroll to explore`、`Scroll to walk through it`、animated mouse-wheel icons。用户还没 scroll 时正在看 hero，他们知道什么是 scroll。Viewport 底部不需要 label。
* **默认零 decorative status dots。** Nav items、list rows、badges、status labels 前的 colored dot 是 Tell。只有传达真实 semantic state（actual server status 的 live indicator、live availability flag）且每个 page section 限一个时才可接受。

### 9.G EM-DASH BAN (the single most-violated Tell)

**Em-dash (`—`) 完全禁止。** 它是 LLM 的 signature stylistic crutch，也是 production tests 中 #1 visual Tell。没有 "limited use" 许可，没有 "natural language frequency" 许可，也没有 "in body copy is fine" 许可。完全没有。

* **Headlines 中禁止。** 使用句号或逗号。
* **Eyebrows / labels / pills / button text / image captions / nav items 中禁止。** 用 line breaks、columns 或 hairlines 替代。
* **Body copy 中禁止。** 重构句子：用句号拆成两句，或使用逗号、括号、冒号。
* **Quote attribution 中禁止。** 使用带空格的 normal hyphen（` - `）或 line break + smaller-weight name。
* **作为 separator 使用的 en-dash (`–`) 也禁止。** Date ranges（`2018-2026`）用 hyphen。Number ranges（`€40-80k`）用 hyphen。

Page 上唯一允许的 dash characters：
* Regular hyphen `-`（compound words、ranges、markup 中的 line dividers）
* Math 中的 minus sign（`-5°C`）

如果 output 在任何用户可见位置包含一个 `—` 或 `–`，output 就未通过 Pre-Flight Check，必须重写。

这条规则不可协商。历史上，当规则写成 "use sparingly" 时，agent 总会忽略 em-dash limits。这里的表述是二元的：zero em-dashes。

---

## 10. REFERENCE VOCABULARY（Agent 应知道的 Pattern Names）

这是 vocabulary，不是 library。Agent 应该知道这些 pattern names，用它们沟通、围绕它们设计，并在 design read 需要时调用它们。**Implementations 和 code sketches 位于 Block Library（Section 12），并会迭代补充。**

### Hero Paradigms
* **Asymmetric Split Hero** - Text on one side, asset on the other, generous white space.
* **Editorial Manifesto Hero** - Large type, no asset, almost-poster.
* **Video / Media Mask Hero** - Type cut out as mask over video background.
* **Kinetic-Type Hero** - Animated typography as the primary visual.
* **Curtain-Reveal Hero** - Hero parts on scroll like a curtain.
* **Scroll-Pinned Hero** - Hero stays pinned while content scrolls behind.

### Navigation & Menus
* **Mac OS Dock Magnification** - Edge nav, icons scale fluidly on hover.
* **Magnetic Button** - Pulls toward cursor.
* **Gooey Menu** - Sub-items detach like viscous liquid.
* **Dynamic Island** - Morphing pill for status / alerts.
* **Contextual Radial Menu** - Circular menu expanding at click point.
* **Floating Speed Dial** - FAB springing into curved secondary actions.
* **Mega Menu Reveal** - Full-screen dropdown, stagger-fade content.

### Layout & Grids
* **Bento Grid** - Asymmetric tile grouping (Apple Control Center).
* **Masonry Layout** - Staggered grid, no fixed row height.
* **Chroma Grid** - Borders / tiles with subtle animating gradients.
* **Split-Screen Scroll** - Two halves sliding in opposite directions.
* **Sticky-Stack Sections** - Sections that pin and stack on scroll.

### Cards & Containers
* **Parallax Tilt Card** - 3D tilt tracking mouse coordinates.
* **Spotlight Border Card** - Borders illuminate under cursor.
* **Glassmorphism Panel** - Frosted glass with inner refraction.
* **Holographic Foil Card** - Iridescent rainbow shift on hover.
* **Tinder Swipe Stack** - Physical card stack, swipe-away.
* **Morphing Modal** - Button expands into its own dialog.

### Scroll Animations
* **Sticky Scroll Stack** - Cards stick and physically stack.
* **Horizontal Scroll Hijack** - Vertical scroll → horizontal pan.
* **Locomotive / Sequence Scroll** - Video / 3D sequence tied to scrollbar.
* **Zoom Parallax** - Central background image zooming on scroll.
* **Scroll Progress Path** - SVG line drawing along scroll.
* **Liquid Swipe Transition** - Page transition like viscous liquid.

### Galleries & Media
* **Dome Gallery** - 3D panoramic gallery.
* **Coverflow Carousel** - 3D carousel with angled edges.
* **Drag-to-Pan Grid** - Boundless draggable canvas.
* **Accordion Image Slider** - Narrow strips expanding on hover.
* **Hover Image Trail** - Mouse leaves popping image trail.
* **Glitch Effect Image** - RGB-channel shift on hover.

### Typography & Text
* **Kinetic Marquee** - Endless text bands reversing on scroll.
* **Text Mask Reveal** - Massive type as transparent window to video.
* **Text Scramble Effect** - Matrix-style decoding on load / hover.
* **Circular Text Path** - Text curving along spinning circle.
* **Gradient Stroke Animation** - Outlined text with running gradient.
* **Kinetic Typography Grid** - Letters dodging the cursor.

### Micro-Interactions & Effects
* **Particle Explosion Button** - CTA shatters into particles on success.
* **Liquid Pull-to-Refresh** - Reload indicator like detaching droplets.
* **Skeleton Shimmer** - Shifting light reflection across placeholders.
* **Directional Hover-Aware Button** - Fill enters from cursor's exact side.
* **Ripple Click Effect** - Wave from click coordinates.
* **Animated SVG Line Drawing** - Vectors drawing themselves in real time.
* **Mesh Gradient Background** - Organic lava-lamp blobs.
* **Lens Blur Depth** - Background UI blurred to focus foreground action.

### Animation Library Choice
* **Motion (`motion/react`)** - default for UI / Bento / state-change motion.
* **GSAP + ScrollTrigger** - 用于 full-page scrolltelling 和 scroll hijacks。隔离在 dedicated leaf components 中，并用 `useEffect` cleanup。
* **Three.js / WebGL** - for canvas backgrounds and 3D scenes. Same isolation rule.
* **绝不要在同一个 component tree 中混用 GSAP / Three.js 与 Motion。** 它们会争抢同一批 frames。

---

## 11. REDESIGN PROTOCOL

此 skill 同时处理 **greenfield builds 和 redesigns**。误判 mode 是 bad redesign output 的最大来源。

### 11.A 检测 Mode（第一个动作）
* **Greenfield** - 没有 existing site，或 full overhaul 已批准。使用 Section 1 的 dial baseline。
* **Redesign - Preserve** - 在不破坏 brand 的前提下 modernise。先 audit，提取 brand tokens，逐步演进。
* **Redesign - Overhaul** - 在 existing content 上建立新 visual language。视觉上按 greenfield 处理；保留 content 和 IA。

如果模糊，只问**一次**：*"Should this redesign preserve the existing brand, or are we starting visually from scratch?"*

### 11.B 触碰前先 Audit
提出 changes 前，记录 current state：
* **Brand tokens** - primary / accent colors、type stack、logo treatment、radii。
* **Information architecture** - page tree、primary nav、key conversion paths。
* **Content blocks** - 已有什么、什么在发挥作用、什么是 filler。
* **Patterns to preserve** - signature interactions、recognisable hero、copy voice。
* **Patterns to retire** - AI-slop tells、broken layouts、dead links、generic stock imagery、perf traps。
* **Dial reading of the existing site** - 推断当前 `DESIGN_VARIANCE` / `MOTION_INTENSITY` / `VISUAL_DENSITY`。这是起点，不是 baseline。
* **SEO baseline** - 当前 ranking pages、meta titles、structured data、OG cards。**SEO migration 是 #1 redesign risk。**

### 11.C Preservation Rules
* 除非用户要求，**不要改变 information architecture**。保持 page slugs、anchor IDs、primary nav labels 稳定，保护 SEO 和 muscle memory。
* **应用 Section 4.2 前先提取 brand colors。** 已经是 purple 的 brand 继续 purple，应用 LILA RULE 的 override。
* 除非要求 rewrite，**保留 copy voice**。Visual modernisation 不等于 content rewrite。
* **尊重 existing accessibility wins。** 不要 regression focus states、alt text、keyboard nav、contrast。
* **尊重 existing analytics events。** 不要重命名 downstream tracking 依赖的 buttons、form fields、section IDs。

### 11.D Modernisation Levers (priority order)
按顺序应用，brief 满足后停止：
1. **Typography refresh** - 每单位 risk 带来最大 visual lift。
2. **Spacing & rhythm** - 增加 section padding，修复 vertical rhythm。
3. **Color recalibration** - desaturate、统一 neutrals、保留 brand accent。
4. **Motion layer** - 给 existing components 添加适合 `MOTION_INTENSITY` 的 micro-interactions。
5. **Hero & key-section recomposition** - 使用 Section 10 vocabulary 重组 top-of-funnel。
6. **Full block replacement** - 仅当 existing block 无法挽救时使用。

### 11.E Decision Tree: Targeted Evolution vs Full Redesign
* IA、content 和 SEO 健康 -> **targeted evolution**（Levers 1-4）。约 40% risk 获得约 70% value。
* Visual debt 是 structural（broken IA、no design system、broken mobile）-> **full redesign**，但严格保留 content。
* Brand 本身在变化 -> **greenfield**。

### 11.F What Never Changes Silently
没有用户明确批准，绝不要修改：
* URL structure / route slugs.
* Primary nav labels.
* Form field names or order (breaks analytics + autofill).
* Brand logo or wordmark.
* Existing legal / consent / cookie copy.

---

## 12. THE BLOCK LIBRARY（Contract - Implementations Land Here Iteratively）

Reference Vocabulary（Section 10）命名 patterns。Block Library 用 real props、real motion specs 和 real code sketches 实现它们。

**Status:** schema 在此定义。Blocks 会迭代添加。不要在不遵循此 schema 的情况下自由发挥新增 blocks。

### 12.A File Location
```
skills/taste-skill/blocks/
  hero/
    asymmetric-split.md
    editorial-manifesto.md
    kinetic-type.md
    ...
  feature/
    bento-grid.md
    sticky-scroll-stack.md
    zig-zag.md
    ...
  social-proof/
  pricing/
  cta/
  footer/
  navigation/
  portfolio/
  transition/
```

### 12.B Required Frontmatter
```yaml
---
name: asymmetric-split-hero
category: hero
dial_compatibility:
  variance: [6, 10]
  motion: [3, 10]
  density: [2, 5]
when_to_use: "Landing pages with one strong asset and one strong message. Default hero for SaaS, agency, premium consumer."
not_for: "Editorial / manifesto launches where the message IS the design."
stack: ["react", "next", "tailwind", "motion"]
---
```

### 12.C Required Body Sections
1. **Visual sketch** - layout 的简短 ASCII 或描述。
2. **Props API** - component interface。
3. **Code sketch** - minimal working implementation（默认 Server Component，motion 使用 Client island）。
4. **Mobile fallback** - `< 768px` 的明确 collapse rules。
5. **Motion variants** - 每个 `MOTION_INTENSITY` band（1-3、4-7、8-10）一个 variant。Reduced-motion fallback 必须明确。
6. **Dark-mode notes** - 该 block 专属 token strategy。
7. **Anti-patterns** - 这个 block 常见出错方式。
8. **References** - 指向 production 中真实 examples 的 links。

### 12.D Block-Library Discipline
* 每个 file 一个 block。不要 multi-block files。
* 每个 block 必须 standalone 工作（放进 page 就能 render）。
* 每个 block 必须通过 Pre-Flight Check（Section 14）。
* 依赖 Section 2.A 中 design system 的 blocks 放在 `blocks/<category>/<name>--<system>.md` 下（例如 `feature/bento-grid--material.md`）。

---

## 13. OUT OF SCOPE

此 skill 不适用于：
* Dashboards / dense product UI / admin panels (use Fluent, Carbon, Atlassian, or Polaris from Section 2.A).
* Data tables (use TanStack Table or AG Grid).
* Multi-step forms / wizards (use Form-specific patterns; this skill won't make them better).
* Code editors (use Monaco / CodeMirror with their official skinning).
* Native mobile (use Apple HIG / Material directly).
* Realtime collab UIs (presence, cursors, OT-aware - different problem class).

如果 brief 属于上述情况，**明确说明**，指向正确 tool，并且只在适用的 surfaces 上应用本 skill 的 marketing-page / about-page / landing-page 部分。

---

## 14. FINAL PRE-FLIGHT CHECK

输出 code 前运行这个 matrix。这是最后一道 filter。

**这不是可选项。每个 box 都要跑。如果任一 box 失败，output 就未完成。**

- [ ] 是否声明了 **Brief inference**（Section 0.B one-liner）？
- [ ] **Dial values** 是否明确，且由 brief 推导，而不是静默使用 baseline？
- [ ] 如适用，是否从 Section 2 选择了 **Design system**，或诚实标注了 aesthetic？
- [ ] 是否检测 **Redesign mode** 并完成 audit（如适用，Section 11）？
- [ ] Page 上是否**零 em-dashes (`—`)**？Headlines、eyebrows、pills、body、quotes、attribution、captions、buttons、alt text。零。（Section 9.G - non-negotiable）
- [ ] **Page Theme Lock**：整页是否只有一个 theme（light、dark 或 auto）？是否没有 section 在 mid-page 翻到 inverted mode（Section 4.11）？
- [ ] **Color Consistency Lock**：是否所有 sections 一致使用一个 accent color（Section 4.2）？
- [ ] **Shape Consistency Lock**：是否一致应用一个 corner-radius system（Section 4.4）？
- [ ] **Button Contrast Check**：每个 CTA text 相对 background 是否可读（无 white-on-white，WCAG AA 4.5:1）？
- [ ] **CTA Button Wrap**：desktop 下是否没有 CTA label wrap 到 2+ 行？
- [ ] **Form Contrast Check**：form inputs、placeholders、focus rings、labels 是否都相对 section background 通过 WCAG AA？
- [ ] **Serif discipline**：若使用 serif，是否不是 Fraunces 或 Instrument_Serif（或虽是但有明确 brand justification）？是否不同于上一个 project 的 serif？
- [ ] **Premium-consumer palette check**：若 brief 是 premium-consumer（cookware / wellness / artisan / luxury），palette 是否不是 AI-default beige+brass+oxblood+espresso family？是否不同于上一个 premium-consumer project？
- [ ] **Italic descender clearance**：每个包含 `y g j p q` 的 italic word 是否至少有 `leading-[1.1]` + `pb-1` reserve？
- [ ] **Hero fits the viewport**：headline ≤ 2 行，subtext ≤ 20 words 且 ≤ 4 行，CTA 无需 scroll 可见，font scale 是否围绕 image 规划？
- [ ] **Hero top padding**：desktop 最大 `pt-24`，hero content 是否没有漂到 viewport 中段？
- [ ] **Hero stack discipline**：hero 中最多 4 个 text elements（eyebrow 或 brand strip、headline、subtext、CTAs）？是否没有 CTAs 下方 tiny tagline，hero 中没有 trust micro-strip？
- [ ] **EYEBROW COUNT（mechanical）**：统计所有 components 中 section headlines 上方 `uppercase tracking` micro-labels。Count 是否 ≤ ceil(sectionCount / 3)？Hero 计为 1。
- [ ] **Split-Header Ban**：是否没有 "left big headline + right small explainer paragraph" 作为 section header（改用 vertical stack）？
- [ ] **Zigzag Alternation Cap**：是否没有 3+ 个 consecutive sections 使用同样 image+text-split layout？
- [ ] **No Duplicate CTA Intent**：是否没有两个 CTAs 具有相同 intent（同页 "Get in touch" + "Let's talk" = Fail）？
- [ ] **Logo wall = logo only**：logos 下方是否没有 industry / category labels？
- [ ] **Bento Background Diversity**：是否至少 2-3 个 bento cells 有真实 visual variation（image、gradient、pattern），而不是全部 white-on-white text cards？
- [ ] **"Used by / Trusted by" logo wall** 是否在 hero 下方而不是内部，使用 REAL SVG logos（Simple Icons / devicon）或 generated SVG marks，而不是 plain text wordmarks？
- [ ] **Copy Self-Audit**：是否重读每个 visible string，没有 ship 语法破碎或 AI-hallucinated phrases（"free on its past" 这类）？
- [ ] **Motion motivated**：每个 animation 是否能用一句话说明理由（hierarchy / storytelling / feedback / state transition），没有 GSAP-for-show？
- [ ] **Marquee max-one-per-page**：同一 page 是否没有两个 horizontal marquees？
- [ ] Desktop 上 **Navigation 是否单行**，height ≤ 80px？
- [ ] **Section-Layout-Repetition** check：是否没有两个 sections 共享同一 layout family（8 sections 至少 4 个不同 families）？
- [ ] **Bento 是否有 rhythm 且 exact cell count**（N items -> N cells，中间或末尾无 empty cells）？
- [ ] **Long lists 是否使用正确 UI component**（> 5 items 时不是默认 `<ul>` + `divide-y`，见 Section 4.9 alternatives）？
- [ ] **是否使用 real images**（gen-tool first，然后 Picsum-seed，再 explicit placeholder slots）- 不要 div-based fake screenshots，不要 hand-rolled decorative SVGs，不要 pure-text minimalism？
- [ ] **Images 上是否没有 overlaid pills/labels**（无 `Plate · Brand`、无 `Field notes - journal`）？
- [ ] **是否没有把 photo-credit captions 当 decoration**（`Field study no. 12 · Ines Caetano`）？
- [ ] Marketing pages 上**是否没有 version footers**（`v1.4.2`、`Build 0048`）？
- [ ] Eyebrows 下**是否没有 micro-meta-sentences**（"Each of these is a feature we ship today..."）？
- [ ] Hero bottom **是否没有 decoration text strip**（`BRAND. MOTION. SPATIAL.`）？
- [ ] Section headings 中**是否没有 floating top-right sub-text**？
- [ ] 是否没有把**带 filled background tracks 的 scoring/progress bars** 作为 comparison visuals？
- [ ] 除非 brief 确实是 globally-distributed 或 place-focused，是否没有 locale / city-name / time / weather strips？
- [ ] 是否没有 scroll cues（`Scroll`、`↓ scroll`、`Scroll to explore`）？
- [ ] 除非 brief 是 launch，hero 中是否没有 version labels（V0.6、BETA、INVITE-ONLY）？
- [ ] 是否没有 section-numbering eyebrows（`00 / INDEX`、`001 · Capabilities`、`06 · how it works`）？
- [ ] 是否没有 decorative dots（默认零个，只用于真实 semantic state）？
- [ ] Long lists / spec tables 的每一行是否没有同时使用 `border-t` + `border-b`？
- [ ] **Content density** 是否合理：没有 20-row data tables，没有无依据 fake-precise specs，默认 sub-paragraphs ≤ 25 words？
- [ ] Quote body 是否 ≤ 3 行，attribution 是否 clean（无 em-dash）？
- [ ] **Motion claimed = motion shown**：如果 `MOTION_INTENSITY > 4`，page 是否真的有 animation，而不只是声称？
- [ ] **GSAP sticky-stack / horizontal-pan** 是否按 Section 5.A / 5.B canonical skeleton 实现（`start: "top top"`、`pin: true`、correct scrub）？
- [ ] 是否没有 `window.addEventListener('scroll')`，只使用 Motion `useScroll()` / ScrollTrigger / IntersectionObserver / CSS scroll-driven animations？
- [ ] 对所有 `MOTION_INTENSITY > 3` 的内容，是否包好了 **Reduced motion**？
- [ ] **Dark mode** tokens 是否已定义，并在 both modes 测试？
- [ ] High-variance layouts 的 **Mobile collapse** 是否明确（`w-full`、`px-4`、`max-w-7xl mx-auto`）？
- [ ] **Viewport stability**：是否使用 `min-h-[100dvh]`，从不使用 `h-screen`？
- [ ] **`useEffect` animations** 是否有严格 cleanup functions？
- [ ] 是否提供 **Empty / loading / error** states？
- [ ] 能用 spacing 解决时，是否省略了 **Cards**？
- [ ] **Icons** 是否只来自 allowed library（Phosphor / HugeIcons / Radix / Tabler），没有 hand-rolled SVG paths？
- [ ] **Motion** 是否隔离在顶部带 `'use client'` 的 client-leaf components，并已 memoized？
- [ ] 是否没有 Section 9 中的 **AI Tells**（默认 Inter、AI-purple、three-equal cards、Jane Doe、Acme、"Quietly in use at"）？
- [ ] **Core Web Vitals** 是否看起来能达标（LCP < 2.5s、INP < 200ms、CLS < 0.1）？
- [ ] 每个 project 是否只用 **One design system**（没有 Material + shadcn 混用）？

如果任何一个 checkbox 不能诚实勾选，page 就没完成。交付前先修好。

---

# APPENDICES - Real Source-Backed Reference Material

以下 sections 是 vendored reference content。它们为 Section 2 中命名的每个 design system 提供真实 install commands、真实 canonical doc links 和真实 working starter snippets。用它们把决策锚定在 production reality，而不是 training-data fiction。

## Appendix A - Install Commands per Design System

```bash
# Material Web (Material 3)
npm install @material/web

# Fluent UI React (v9)
npm install @fluentui/react-components

# Fluent UI Web Components (framework-free)
npm install @fluentui/web-components @fluentui/tokens

# IBM Carbon
npm install @carbon/react @carbon/styles

# Radix Themes
npm install @radix-ui/themes

# shadcn/ui (open code, owned components)
npx shadcn@latest init
npx shadcn@latest add button card badge separator input

# Primer CSS (GitHub product/devtool UI)
npm install --save @primer/css

# Primer Brand (GitHub marketing UI)
npm install @primer/react-brand

# GOV.UK Frontend
npm install govuk-frontend

# USWDS (US Web Design System)
npm install uswds

# Atlassian Design System (Atlaskit)
yarn add @atlaskit/css-reset @atlaskit/tokens @atlaskit/button @atlaskit/badge @atlaskit/section-message @atlaskit/card

# Bootstrap 5.3
npm install bootstrap

# Shopify Polaris Web Components (Shopify apps only)
# Add this to your app HTML head:
#   <meta name="shopify-api-key" content="%SHOPIFY_API_KEY%" />
#   <script src="https://cdn.shopify.com/shopifycloud/polaris.js"></script>
```

## Appendix B - Canonical Sources (read these before reinventing)

### Material Web
- https://github.com/material-components/material-web
- https://material-web.dev/theming/material-theming/
- https://m3.material.io/develop/web

### Fluent UI
- https://fluent2.microsoft.design/get-started/develop
- https://fluent2.microsoft.design/components/web/react/
- https://github.com/microsoft/fluentui
- https://learn.microsoft.com/en-us/fluent-ui/web-components/

### Carbon
- https://carbondesignsystem.com/
- https://github.com/carbon-design-system/carbon
- https://carbondesignsystem.com/developing/react-tutorial/overview/
- https://carbondesignsystem.com/developing/web-components-tutorial/overview/

### Shopify Polaris
- https://shopify.dev/docs/api/app-home/web-components
- https://github.com/Shopify/polaris-react
- https://polaris-react.shopify.com/components

### Atlassian
- https://atlassian.design/get-started/develop
- https://atlassian.design/components/button/examples
- https://atlaskit.atlassian.com/packages/design-system/button/example/disabled
- https://atlassian.design/tokens/design-tokens

### Primer
- https://primer.style/
- https://github.com/primer/css
- https://github.com/primer/brand

### GOV.UK
- https://design-system.service.gov.uk/components/button/
- https://design-system.service.gov.uk/styles/layout/
- https://github.com/alphagov/govuk-frontend

### USWDS
- https://designsystem.digital.gov/documentation/developers/
- https://designsystem.digital.gov/components/button/
- https://designsystem.digital.gov/components/card/
- https://github.com/uswds/uswds

### Bootstrap
- https://getbootstrap.com/docs/5.3/layout/grid/
- https://getbootstrap.com/docs/5.3/components/card/

### Tailwind
- https://tailwindcss.com/docs/dark-mode
- https://tailwindcss.com/blog/tailwindcss-v4

### Radix
- https://www.radix-ui.com/themes/docs/components/theme
- https://www.radix-ui.com/themes/docs/components/card
- https://github.com/radix-ui/themes

### shadcn/ui
- https://ui.shadcn.com/docs
- https://ui.shadcn.com/docs/components/card
- https://github.com/shadcn-ui/ui

### Native CSS / W3C standards
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
- https://drafts.csswg.org/scroll-animations-1/

### Apple Liquid Glass (Apple platforms only)
- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass
- https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass
- https://developer.apple.com/documentation/SwiftUI/Material

---

## Appendix C - Apple Liquid Glass: Honest Web Approximation

不要把 random CSS snippets 当作 official Apple Liquid Glass。

### What is official
Apple 在 Human Interface Guidelines 和 Developer Documentation 中为 **Apple platforms** 记录 Liquid Glass。它是 Apple platform UI 中使用的 dynamic material。Apple 的 native implementation 属于 Apple platform APIs 和 system components，**不是 public web CSS package**。

相关 official docs：
- Apple Human Interface Guidelines → Materials
- Apple Developer Documentation → Liquid Glass
- Apple Developer Documentation → Adopting Liquid Glass
- SwiftUI → Material

### What is NOT official
Apple 没有给普通 websites 提供 `liquid-glass.css`。

Web approximation 可以使用：
- `backdrop-filter`
- transparent backgrounds
- layered borders
- highlight overlays
- gradients
- motion
- strong contrast fallbacks

但这只是 **web glassmorphism / frosted-glass approximation**，不是 official Apple Liquid Glass。请在 comments 中这样标注。

### 更安全的 web approximation skeleton

```css
.liquid-glass-web-approx {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid rgb(255 255 255 / .32);
  background:
    linear-gradient(135deg, rgb(255 255 255 / .30), rgb(255 255 255 / .08)),
    rgb(255 255 255 / .12);
  backdrop-filter: blur(24px) saturate(180%) contrast(1.05);
  -webkit-backdrop-filter: blur(24px) saturate(180%) contrast(1.05);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / .48),
    inset 0 -1px 0 rgb(255 255 255 / .12),
    0 18px 60px rgb(0 0 0 / .18);
}

.liquid-glass-web-approx::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background:
    radial-gradient(circle at 20% 0%, rgb(255 255 255 / .55), transparent 34%),
    linear-gradient(90deg, rgb(255 255 255 / .18), transparent 42%, rgb(255 255 255 / .14));
  pointer-events: none;
}

.liquid-glass-web-approx::after {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  border: 1px solid rgb(255 255 255 / .14);
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  .liquid-glass-web-approx {
    border-color: rgb(255 255 255 / .18);
    background:
      linear-gradient(135deg, rgb(255 255 255 / .16), rgb(255 255 255 / .04)),
      rgb(15 23 42 / .42);
    box-shadow:
      inset 0 1px 0 rgb(255 255 255 / .22),
      0 18px 60px rgb(0 0 0 / .42);
  }
}

@media (prefers-reduced-transparency: reduce) {
  .liquid-glass-web-approx {
    background: rgb(255 255 255 / .96);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
```

**Important:** `prefers-reduced-transparency` 的 browser support 不均匀；要测试。即使没有 blur，也要始终提供足够 contrast。

---

**End of appendices.** 上面的 install commands 是 reality anchors。Apple Liquid Glass skeleton 是明确标注的 approximation，不是 Apple 发布的 package。各 design system 的 canonical docs 请查阅对应 official docs（Section 2 links 加 Appendix B）。
