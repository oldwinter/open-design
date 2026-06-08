---
name: design-brief
description: |
  将以 I-Lang protocol format 编写的 structured design brief 解析为
  具体 design spec。通过要求明确给出 palette、typography、layout、
  mood、density 和 constraints 等 dimensions，消除 "make it professional"
  这类模糊请求中的歧义。
  Trigger keywords: "design brief", "create a design brief", "ilang brief", "structured brief".
triggers:
  - "design brief"
  - "create a design brief"
  - "ilang brief"
  - "structured brief"
od:
  mode: design-system
  platform: desktop
  scenario: planning
  preview:
    type: html
    entry: brief-preview.html
    reload: debounce-100
  design_system:
    requires: false
    generates: true
    sections: [visual-theme, color-palette, typography, component-stylings, layout, depth-elevation, dos-and-donts, responsive, agent-prompt-guide]
  inputs:
    - name: brief
      type: string
      required: true
      description: "I-Lang formatted design brief or natural language description"
  outputs:
    primary: DESIGN.md
    secondary: brief-preview.html
  capabilities_required:
    - file_write
---

# Design Brief Skill

将 structured design brief 解析为具体 DESIGN.md 和可选 visual preview。Agent，严格遵循此 workflow。

## Background

此 skill 的 8 个 dimensions 来自对 Open Design 捆绑的 71 个 design systems 的分析。`design-systems/` 中的每个 DESIGN.md 至少都会解析出：color palette、accent、typography、display font、layout model 和 component style。我们将它们提炼为 8 个 orthogonal dimensions，覆盖 designer 在放置任何 pixel 前需要做出的决策。Mood 和 density 被加入，是因为它们是 natural language briefs 中最常见的两类歧义来源（"make it clean" 对不同人意味着不同东西）。

刻意排除在 brief level 之外的 dimensions：animation timing、responsive strategy 和 accessibility contrast。这些由各个 skills 在 template level 强制执行（例如 `saas-landing` 处理自己的 responsive logic），不过生成的 DESIGN.md 会包含合理的 breakpoint defaults 供下游消费。

## 1. Accept input

用户以两种格式之一提供 design brief：

### Option A: I-Lang structured brief

```
[PLAN:@DESIGN|type=saas_landing]
  |palette=navy_and_white|accent=coral
  |typography=inter|display=space_grotesk
  |layout=single_column|max_width=1200px
  |mood=professional_minimal
  |density=spacious|section_gap=96px
  |hero=headline+subhead+cta
  |sections=features,pricing,testimonials,footer
  |exclude=animations,parallax,gradients
  |responsive=mobile_first
```

### Option B: Natural language

> "我需要一个面向 developer tool 的 landing page。干净、极简、dark mode。Inter font。不要花哨动画。"

如果用户提供 Option B，使用下方 mapping table 将其转换为 structured format，然后继续。识别每个明确声明的 dimension，并标记未指定的 dimensions。

### Natural language → I-Lang mapping

对 natural language input 中的每句话，识别 dimension keywords，并映射到最接近的 structured value：

| Natural language phrase | Dimension | I-Lang value |
|------------------------|-----------|-------------|
| "dark mode", "dark theme" | palette | `monochrome_dark` |
| "light", "white background" | palette | `light_clean` |
| "earthy", "warm tones" | palette | `earth_tones` |
| "pop of color", "vibrant" | accent | `electric_blue` (default) or `coral` |
| "subtle accent" | accent | `muted_sage` (default) or `slate` |
| "clean", "minimal", "simple" | mood | `professional_minimal` |
| "playful", "fun", "friendly" | mood | `playful` |
| "bold", "brutalist", "raw" | mood | `brutalist` |
| "editorial", "magazine-like" | mood | `editorial` |
| "spacious", "lots of whitespace" | density | `spacious` |
| "compact", "dense", "information-rich" | density | `compact` |
| "Inter", "system font" | typography | `inter` (default) or `system_ui` |
| "serif", "traditional" | typography | `georgia` (default) or `playfair` |
| "monospace", "code-like" | typography | `jetbrains_mono` |
| "no animations", "static" | exclude | `animations` |
| "no gradients" | exclude | `gradients` |
| "no stock photos" | exclude | `stock_photos` |
| "single page" | layout | `single_column` |
| "two columns", "sidebar" | layout | `two_column` |
| "mobile first" | responsive | `mobile_first` |

当一个 phrase 映射到多个 dimensions（例如 "clean dark landing page" → mood=professional_minimal + palette=monochrome_dark + layout=single_column）时，独立解析每个 dimension。当单个 mapping 列出多个 values 时，第一个是 default；只有 surrounding context 强烈支持时，agent 才可选择替代项。

## 2. Validate dimensions

每个 design brief 都必须解析出这 8 个 dimensions。如果输入缺失任何 dimension，使用 Section 2.2 中的规则选择 sensible defaults。

下方列出的 values 构成 closed vocabulary。只有此表中的 values 在 Section 2.1 中有 concrete token mappings。如果用户提供了此处未列出的 value，agent 必须请求澄清，而不是猜测。

| # | Dimension | Key | Example values |
|---|-----------|-----|---------------|
| 1 | Color palette | `palette` | navy_and_white, earth_tones, monochrome_dark, light_clean |
| 2 | Accent color | `accent` | coral, electric_blue, emerald, muted_sage |
| 3 | Body typography | `typography` | inter, system_ui, dm_sans, georgia |
| 4 | Display typography | `display` | space_grotesk, clash_display, same_as_body, playfair |
| 5 | Layout model | `layout` | single_column, two_column, asymmetric |
| 6 | Mood | `mood` | professional_minimal, playful, brutalist, editorial |
| 7 | Density | `density` | compact, balanced, spacious |
| 8 | Constraints | `exclude` | animations, gradients, stock_photos, carousel |

### 2.1 Symbolic → concrete token resolution

每个 symbolic value 都映射到 concrete design tokens。agent 写入 DESIGN.md 前必须先解析这些 tokens：

| Symbolic value | Concrete tokens |
|---------------|----------------|
| `palette=navy_and_white` | Background: #0F172A, Surface: #1E293B, Text: #F8FAFC, Secondary: #94A3B8 |
| `palette=monochrome_dark` | Background: #09090B, Surface: #18181B, Text: #FAFAFA, Secondary: #A1A1AA |
| `palette=light_clean` | Background: #FFFFFF, Surface: #F8FAFC, Text: #0F172A, Secondary: #64748B |
| `palette=earth_tones` | Background: #FFFBEB, Surface: #FEF3C7, Text: #451A03, Secondary: #92400E |
| `accent=coral` | Accent: #F97316, Hover: #EA580C |
| `accent=electric_blue` | Accent: #3B82F6, Hover: #2563EB |
| `accent=emerald` | Accent: #10B981, Hover: #059669 |
| `accent=muted_sage` | Accent: #84A98C, Hover: #6B8F73 |
| `accent=slate` | Accent: #64748B, Hover: #475569 |
| `typography=inter` | Body: Inter, 400, 1rem/1.6 |
| `typography=system_ui` | Body: system-ui, 400, 1rem/1.6 |
| `typography=dm_sans` | Body: DM Sans, 400, 1rem/1.6 |
| `typography=georgia` | Body: Georgia, 400, 1.125rem/1.7 |
| `display=space_grotesk` | Display: Space Grotesk, 700, clamp(2rem, 5vw, 3.5rem) |
| `display=clash_display` | Display: Clash Display, 700, clamp(2rem, 5vw, 3.5rem) |
| `display=playfair` | Display: Playfair Display, 700, clamp(2rem, 5vw, 3.5rem) |
| `display=same_as_body` | Display inherits body font family, weight 600 |
| `density=compact` | Section spacing: 48px, Content padding: 16px/24px |
| `density=balanced` | Section spacing: 72px, Content padding: 24px/40px |
| `density=spacious` | Section spacing: 96px, Content padding: 24px/48px |

不在此表中的 symbolic values 无效。如果用户提供未识别的 value（例如 `palette=ocean_blue`），agent 必须请求澄清："I don't recognize `palette=ocean_blue`. Did you mean `navy_and_white`, `monochrome_dark`, `light_clean`, or `earth_tones`?"

### 2.2 Default resolution rules

当某个 dimension 未指定时，根据 mood compatibility 选择 defaults：

| Unspecified dimension | Default rule |
|----------------------|-------------|
| `palette` | If mood=editorial → `light_clean`. If mood=brutalist → `monochrome_dark`. Otherwise → `light_clean`. |
| `accent` | If palette is dark → `coral`. If palette is light → `electric_blue`. |
| `typography` | Always → `inter` (highest cross-platform legibility). |
| `display` | If mood=editorial → `playfair`. If mood=brutalist → `space_grotesk`. Otherwise → `same_as_body`. |
| `layout` | Always → `single_column` (safest responsive default). |
| `mood` | Always → `professional_minimal` (least opinionated). |
| `density` | Always → `balanced`. |
| `exclude` | Always → none (no constraints unless specified). |

如果 mood 也未指定，所有 defaults 回退到 safe neutral set：`palette=light_clean`、`accent=electric_blue`、`typography=inter`、`display=same_as_body`、`layout=single_column`、`mood=professional_minimal`、`density=balanced`、`exclude=none`。

## 3. Generate DESIGN.md

此 skill 基于已解析的 brief dimensions 从零生成新的 DESIGN.md。如果 working directory 中已存在 DESIGN.md，agent 应询问用户是 overwrite 还是 skip。

按 Open Design 的 9-section convention 产出 DESIGN.md。所有 color hex values、font stacks 和 spacing values 都必须来自 Section 2.1 中解析出的 tokens - 不要发明 resolution table 之外的 values。

```markdown
# [Project Name] Design System

## Visual Theme & Atmosphere
- Mood: [resolved from mood]
- Feel: [derived from mood — e.g., professional_minimal → "Clean, confident, restrained"]
- References: [if mood=editorial → "Magazine layouts, Monocle, Cereal"; if mood=brutalist → "Exposed structure, raw typography"]

## Color Palette & Roles
- Background: [resolved from palette]
- Surface: [resolved from palette]
- Text primary: [resolved from palette]
- Text secondary: [resolved from palette]
- Accent: [resolved from accent]
- Accent hover: [resolved from accent]

## Typography Rules
- Display: [resolved from display], 700, clamp(2rem, 5vw, 3.5rem)
- Body: [resolved from typography], 400, 1rem/1.6
- Mono: JetBrains Mono, 400, 0.875rem

## Component Stylings
- Buttons: [if mood=playful → "rounded-full", otherwise → "rounded-md"], accent bg, contrast text
- Cards: surface bg, subtle border, 12px radius
- Inputs: [if mood=brutalist → "thick border", otherwise → "transparent bg, bottom border"]

## Layout Principles
- Max width: 1200px
- Grid: [resolved from layout]
- Section spacing: [resolved from density]
- Content padding: [resolved from density]

## Depth & Elevation
- Shadows: [if mood=brutalist → "hard 4px offset", if mood=professional_minimal → "none", otherwise → "subtle sm"]
- Borders: 1px solid [derived from palette, 8% opacity of text color]

## Do's and Don'ts
- DO use the declared color tokens exclusively.
- DO maintain consistent section spacing.
- DO ensure all text meets WCAG AA contrast ratio.
- DON'T invent colors outside the palette.
- DON'T add decorative shadows unless Depth & Elevation allows them.
- DON'T use more than 2 display/body typefaces (monospace is a utility face for code and data — it does not count toward this limit).

## Responsive Behavior
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Mobile: single column, stack all sections vertically
- Tablet: allow 2-column feature grids
- Desktop: full layout with max-width constraint
- Images: fluid, max-width 100%, maintain aspect ratio

## Agent Prompt Guide
- Do NOT invent colors outside this palette.
- Do NOT add box-shadows unless specified above.
- Accent color appears maximum 3 times per viewport.
- All interactive elements need :focus-visible outline.
- [if exclude contains items → list each as "Do NOT use {item}."]
```

## 4. Generate brief-preview.html

创建一个 HTML 文件，以视觉方式 render 解析后的 design tokens。preview 必须按顺序包含以下 4 个 sections：

1. **Color palette swatches** - 一排横向 rectangles，每个显示 Color section 中的一种 color。用 role（Background、Surface、Text、Accent）和 hex code 标注。
2. **Typography specimens** - 三个 text blocks，以声明尺寸展示 Display、Body 和 Mono fonts。每个使用 sample sentence（"The quick brown fox..."）。
3. **Spacing ruler** - 用 visual ruler 或 stacked bars 展示 section spacing 和 content padding values，并标注 px values。
4. **Component preview** - 使用解析后的 tokens render 2-3 个 live components（primary button、带 title/body 的 card、text input）。它们应是 functional HTML/CSS，而不是 screenshots。

preview 自身也使用解析后的 design system tokens（background color、font、spacing）进行 styling。preview 应该看起来像 design system documentation page。

## 5. Report unspecified dimensions

在输出末尾，列出用户未指定的 dimensions 和已应用的 defaults，包括选择每个 default 的规则：

```
Dimensions resolved from defaults:
- display: set to "same_as_body" (rule: mood=professional_minimal → same_as_body)
- density: set to "balanced" (rule: static fallback, no spacing preference given)
- exclude: set to "none" (rule: no constraints unless specified)
```

这种透明度可以防止 silent assumptions 传播到 final design 中。
