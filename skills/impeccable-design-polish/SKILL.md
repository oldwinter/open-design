---
name: impeccable-design-polish
description: |
  受 Impeccable 启发的后续 design polish skill。用于已有 web 或 HTML artifact 之后，执行 audit、critique、polish、animate、harden，并为 live/share pass 准备页面。
triggers:
  - "impeccable"
  - "design polish"
  - "polish page"
  - "anti ai polish"
  - "critique design"
  - "animate page"
  - "harden ui"
  - "live review"
  - "反 AI 味"
od:
  mode: prototype
  surface: web
  platform: desktop
  category: creative-direction
  upstream: "https://github.com/pbakaus/impeccable"
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
      - accessibility-baseline
  example_prompt: |
    Use impeccable-design-polish on the current HTML artifact: audit visual hierarchy, remove AI tells, tighten copy, add restrained motion, and harden responsive/accessibility issues.
---

# Impeccable Design Polish

把这个 skill 用作既有 design 的 post-generation pass。它不应该从头重启项目，而是让当前 artifact 更锋利、更可用、更接近 designer 会交付的状态。

## Follow-Up Modes

- **Audit**：识别 hierarchy、spacing、color、type、interaction states、responsiveness 和 accessibility 中影响最大的 issues。
- **Critique**：说明哪些地方显得 generic、overdesigned、underdesigned 或 inconsistent。
- **Polish**：在保留用户 intent 的前提下，直接编辑 artifact 改善最重要的问题。
- **Animate**：只在能改善 feedback 或 storytelling 的地方加入克制、有用的 motion。
- **Harden**：修复 mobile overflow、text clipping、contrast problems、missing states、broken links 和脆弱的 layout assumptions。
- **Live**：为 presentation 或 sharing 准备 artifact，包括最终 visual QA 和清晰的 next actions。

## Operating Rules

1. 编辑前先检查当前 HTML/page。不要只根据 prompt 猜。
2. 除非用户明确要求改变，否则保留既有 content、brand 和 scenario。
3. 优先做少数关键修复，而不是大范围 cosmetic churn。
4. 移除常见 AI 味：
   - 没有 product reason 的 purple-blue glow gradients
   - generic 3-card feature rows
   - 到处都是 oversized rounded cards
   - 空泛的 marketing adjectives
   - 不一致的 spacing 和 type scale
   - 不支持理解的 decorative effects
5. 保留 accessibility：focus states、contrast、semantic controls、readable text 和 reduced-motion fallbacks。
6. 结束时让 artifact 处于更好的可运行状态，而不只是输出 critique list。

## Best Pairings

- 与 `design-taste-frontend` 或 `gpt-taste` 搭配，用于更强的 anti-slop redesign work。
- 与 `emilkowalski-motion` 或 GSAP skills 搭配，用于 motion-specific polish。
- 当 artifact 需要真实 visual assets 而不是纯 CSS decoration 时，与 image/video skills 搭配。
