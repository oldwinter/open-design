# 受 Publication 启发的 Design System

> Category: Creative & Artistic
> 面向 books、magazines 和 reports 的 print-inspired visual language，使用 editorial grids 和 expressive typography。

## 1. Visual Theme & Atmosphere

面向 books、magazines 和 reports 的 print-inspired visual language，使用 editorial grids 和 expressive typography。

- **Visual style:** modern, editorial
- **Color stance:** primary, neutral, success, warning, danger
- **Design intent:** 在保留 usability 和 readability 的同时，让输出明确属于这个 style family。

## 2. Color

- **Primary:** `#A855F7` - 来自 style foundations 的 token。
- **Secondary:** `#0A1829` - 来自 style foundations 的 token。
- **Success:** `#16A34A` - 来自 style foundations 的 token。
- **Warning:** `#D97706` - 来自 style foundations 的 token。
- **Danger:** `#DC2626` - 来自 style foundations 的 token。
- **Surface:** `#FFFFFF` - 来自 style foundations 的 token。
- **Text:** `#0A1829` - 来自 style foundations 的 token。
- **Neutral:** `#FFFFFF` - 为兼容 official format，从 surface token 派生。

- CTA emphasis 优先使用 Primary (#A855F7)。
- 大面积 backgrounds 和 cards 使用 Surface (#FFFFFF)。
- Body copy 使用 Text (#0A1829)，确保 legibility。

## 3. Typography

- **Scale:** desktop-first expressive scale
- **Families:** primary=Nunito, display=Oswald, mono=JetBrains Mono
- **Weights:** 100, 200, 300, 400, 500, 600, 700, 800, 900
- Headings 承载 style personality；body text 优化 scanability 和 contrast。

## 4. Spacing & Grid

- **Spacing scale:** 4/8/12/16/24/32
- 在 sections 和 components 间保持一致的 vertical rhythm。
- 将 columns 和 modules 对齐到可预测的 grid；避免 ad-hoc offsets。

## 5. Layout & Composition

- 优先使用 internal padding 一致的清晰 content blocks。
- 保持 hierarchy 清楚：headline -> support text -> primary action。
- 在添加 borders 或 shadows 前，先用 whitespace 分隔 concerns。

## 6. Components

- Buttons：primary action 使用 `#A855F7`；secondary actions 保持 neutral。
- Inputs：强 focus-visible states、清晰 labels 和可预期的 error messaging。
- Cards/sections：全页面使用一致的 radii、spacing 和 elevation strategy。

## 7. Motion & Interaction

- 使用 subtle transitions，将 Primary (#A855F7) 作为 interaction signal。
- 默认使用短而有目的的 transitions（150-250ms），并采用 stable easing。
- 确保 hover、focus-visible、active、disabled 和 loading states 明确。

## 8. Voice & Brand

- Tone 应反映 visual style：concise、confident、product-specific。
- Microcopy 保持 action-oriented，避免 generic filler language。
- Headlines 保留 style identity，同时让 UI labels 直接、清晰。

## 9. Anti-patterns

- 现有 token 能解决问题时，不要引入 off-palette colors。
- 不要给所有文本使用相同 type size/weight，导致 hierarchy 变平。
- 不要添加降低 readability 或 accessibility 的 decorative effects。
- 不要在同一个 interface 中混用无关 visual metaphors。
