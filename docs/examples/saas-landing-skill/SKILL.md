---
name: saas-landing
description: |
  带有 hero、features、social proof、pricing 和 CTA 的单页 SaaS landing。
  遵守 active DESIGN.md 中的 color/typography/layout tokens。
  Trigger keywords: "saas landing", "marketing page", "product landing".
triggers:
  - "saas landing"
  - "marketing page"
  - "product landing"
od:
  mode: prototype
  preview:
    type: html
    entry: index.html
    reload: debounce-100
  design_system:
    requires: true
    sections: [color, typography, layout, components]
  inputs:
    - name: product_name
      type: string
      required: true
    - name: tagline
      type: string
      required: true
    - name: has_pricing
      type: boolean
      default: true
    - name: proof_count
      type: integer
      default: 3
      min: 0
      max: 6
  parameters:
    - name: hero_density
      type: spacing
      default: 96
      range: [48, 200]
    - name: accent_strength
      type: opacity
      default: 1.0
      range: [0.5, 1.0]
  outputs:
    primary: index.html
  capabilities_required:
    - file_write
---

# SaaS Landing Skill

生成一个单页 SaaS landing。Agent，请严格遵循此 workflow。

## 1. 读取上下文

在写入任何内容之前：
- 读取当前工作目录中的 `DESIGN.md`。如果缺失，停止并请求提供。
- 识别 color palette、typography tokens 和 layout principles。
- 注意 "Agent Prompt Guide" section；如果发生冲突，它会覆盖此处的任何 instruction。

## 2. 规划 sections

Required sections，按顺序：
1. **Hero** — logo-or-wordmark、headline（tagline input）、subhead（1–2 句）、primary CTA、secondary CTA。将 hero_density parameter 作为 px 单位的 vertical padding。
2. **Features** — 3–6 个 feature tiles。每个包含：icon、短 title、1–2 句 body。
3. **Social proof** — `proof_count` 个 logos 或 testimonials。如果为 0，跳过此 section。
4. **Pricing** — 2–3 个 tiers。仅在 `has_pricing` 为 true 时包含。
5. **Footer CTA** — 大面积 accent-colored band，带一个 call to action button。
6. **Footer** — 极简：links + copyright。

## 3. 应用 design system

- 所有 colors 必须来自 DESIGN.md tokens。不要发明 hex values。
- Typography：headline 使用声明的 display font，其他内容使用 body font。
- Layout：遵守 grid、max-width 和 section spacing rules。
- Components：使用声明的 button/card/input patterns。如果 DESIGN.md 的 Depth & Elevation 要求 minimal，不要添加 shadows。
- Accent：accent color 只在 hero 使用一次、footer CTA 使用一次，并用于所有 links。不要让页面被 accent 淹没。

## 4. 写入文件

输出一个 self-contained 的单文件 `index.html`，包含：
- 所有 CSS 内联在 `<head>` 中的 `<style>` block。
- 如果 DESIGN.md fonts 不能从 Google Fonts 等来源加载，则使用 system font fallbacks。
- 不使用 external JS。
- 使用 semantic HTML（`<header>`、`<main>`、`<section>`、`<footer>`）。
- 每个 editable element 都标记 `data-od-id="<unique-slug>"`，以便 host app 的 comment mode 可以定位它。

## 5. 自检

完成前，验证：
- [ ] 所有文本都有内容意义，不是 lorem ipsum（使用 product_name 和 tagline inputs；为其余内容生成可信且具体的 copy）。
- [ ] 没有 broken color references（每个 CSS color value 都在 DESIGN.md 的 palette 中，或是有效的 alpha/fallback variant）。
- [ ] Responsive breakpoints 与 DESIGN.md 的 Responsive Behavior section 匹配。
- [ ] 页面在 1440w、768w 和 375w 下看起来都好（进行心智模拟）。
- [ ] Accent 总共使用不超过两次。

## 6. 完成

只写入 `index.html`。不要生成单独的 CSS file、JS file 或 README。

---

## 给把本文作为 reference 阅读的 skill authors

这是一个最小但完整的 skill。结构：

```
saas-landing-skill/
├── SKILL.md    ← you are here
└── assets/
    └── base.html    (optional starter template; this skill doesn't use one)
```

注意事项：
- 对于 Claude-Code-only compatibility，`od:` front-matter block 是可选的；但添加它会启用 OD 的 typed inputs、sliders、preview metadata 和 capability gating。
- front-matter 下方的 workflow 是普通 Markdown，agent 会把它作为 system prompt 读取。
- DESIGN.md 被视为 collaborator，而不是 override。这个 skill 允许 agent 在 brief 冲突时覆盖，但绝不允许发明新的 tokens。
- `data-od-id` tagging 是我们把 elements 接入 comment mode 的方式。想兼容 comment-mode 的 skills 必须注释其 output。

完整 protocol 见 [`../../skills-protocol.md`](../../skills-protocol.md)。
