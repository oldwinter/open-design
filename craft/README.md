# Craft references

Brand-agnostic craft knowledge。每个文件都是围绕 professional UI craft 某一维度（typography、color、motion 等）的小而密的 rulebook。Skills 会 opt into 自己需要的 references；daemon 只会把被请求的内容注入到 active skill body 上方的 system prompt。

## 为什么在 `skills/` 和 `design-systems/` 旁边需要第三条轴

| Axis | Scope | Example |
|---|---|---|
| `skills/` | Artifact shape | `saas-landing`, `dashboard`, `pricing-page` |
| `design-systems/` | Brand visual language（9-section `DESIGN.md`） | `linear-app`, `apple`, `notion` |
| `craft/` | **Universal** craft knowledge，不随 brand 改变 | letter-spacing rules, accent-overuse caps, anti-AI-slop |

`DESIGN.md` 告诉 agent 某个 brand 使用哪些 colors 和 fonts。`craft/` 告诉 agent 有能力的 designer 会叠加的 universal rules。例如 ALL CAPS 无论 brand 如何都需要 ≥0.06em tracking。

## Skill 如何 opt in

在 skill front-matter 中添加 `od.craft.requires` array。只注入列出的 sections，因此只需要 typography 的 skill 不会为 color/motion 内容支付 token cost。

```yaml
od:
  craft:
    requires: [typography, color, anti-ai-slop]
```

对于需要 authored hierarchy 和持续阅读行为的 editorial skills，使用 layered stack：

```yaml
od:
  craft:
    requires: [typography, typography-hierarchy, typography-hierarchy-editorial]
```

Allowed values 与本目录中的文件名一致，但去掉 `.md` extension。Unknown values 会被静默忽略（forward-compatible）。

添加或修改 `od.craft.requires` 后，请运行 `pnpm lint:craft`。Repository guard 会带上 manifest paths 报告无法解析的 slugs，因此 typo 不会静默地从 runtime prompt 中丢掉 craft section。如果某个 slug 是有意的 forward reference，请先把它列入 `craft/FUTURE_SECTIONS.md`，直到对应的 `craft/<slug>.md` 文件发布。

### 为什么 silent fallback 而不是 fail-fast？

挑剔的读者会问：“如果 skill 请求了 planned-but-not-yet-vendored section，而对应文件还不存在，难道不应该警告用户吗？”我们选择 forward-compatibility，而不是 fail-fast：今天编写的 skill 可以列出 planned slug，并在后续 PR vendored 对应 `craft/<slug>.md` 的那一刻自动受益，无需修改 skill。Missing reference 的代价只是 system prompt 少了一段，而不是 broken skill；因此 loud failure mode 不值得增加摩擦。

给从旧 guidance 过来的 skill authors 的说明：早期草稿曾用 `motion` 作为 future-slug placeholder。今天 shipped equivalent 是 `animation-discipline`。如果你的 skill 会 emit motion，请使用它。

### Enforcement levels

Craft files 混合 auto-checked rules 和 guidance。

- **Auto-checked.** 接入 `apps/daemon/src/lint-artifact.ts` 的 rules，目前是 `anti-ai-slop.md` 中的 P0 list（Tailwind-indigo accent、two-stop hero gradients、emoji-as-icons 等）。Linter 会将这些作为 findings 回传给 UI（用于 P0/P1 badges）和 agent（作为 self-correction 的 system reminder）。Artifact persistence 目前不会因 P0 hits 被 hard-block。
- **Guidance.** 其余内容。Agent 读取规则，reviewers 应用规则，linter 不检查它们。

纯 behavioral craft file（state-coverage、animation-discipline）默认是 guidance，除非后续将某条具体 rule 提升到 `lint-artifact.ts`。

## Files

| File | Section name | When to require |
|---|---|---|
| `typography.md` | `typography` | 任何 emit typed content 的 skill（约等于所有 skills） |
| `typography-hierarchy.md` | `typography-hierarchy` | 任何 emit typed content 且 hierarchy 必须像被创作而非拼装出来的 skill，尤其是有强 entry point、多层级或有意 rhythm 的 surfaces。与 `typography` 组合使用。 |
| `typography-hierarchy-editorial.md` | `typography-hierarchy-editorial` | Primary artifact 是持续阅读 surface 的 skills：`blog-post`、`docs-page`、`digital-eguide`。需要 `typography` + `typography-hierarchy`。 |
| `color.md` | `color` | 任何 emit styled output 的 skill（约等于所有 skills） |
| `anti-ai-slop.md` | `anti-ai-slop` | Marketing pages、landing pages、decks |
| `state-coverage.md` | `state-coverage` | 任何带 stateful UI 的 skill（dashboards、mobile apps、forms、list/table views） |
| `animation-discipline.md` | `animation-discipline` | 任何 ship motion 的 skill：mobile apps、multi-screen flows、gamified UI、transitions、microinteractions |
| `accessibility-baseline.md` | `accessibility-baseline` | 任何 ship interactive UI 的 skill：dashboards、forms、mobile flows、任何带 focus/labels/keyboard paths 的内容 |
| `rtl-and-bidi.md` | `rtl-and-bidi` | 任何 ship localized text 或 layout 的 skill：blogs、docs、financial tables、mobile apps，以及任何可能渲染 Arabic / Hebrew / Persian 的内容 |
| `form-validation.md` | `form-validation` | Primary artifact 包含 interactive form 的任何 skill：lead capture、sign-in、signup、settings、multi-step intake |
| `laws-of-ux.md` | `laws-of-ux` | Composition decisions 命中 named cognitive limits 的任何 skill：pricing pages（Hick's、Choice Overload、Von Restorff）、dashboards（Pareto、Selective Attention、Working Memory）、onboarding（Goal-Gradient、Zeigarnik、Peak-End）、modals（Fitts's、Tesler's）。它是上述 rendering-rule files 的 sibling axis，覆盖“组合什么”，而不是“如何渲染”。 |

**Partial-stateful skills.** 大部分静态但包含 embedded form、data table 或 query surface 的 skill 应 opt in。State-coverage rules 作用于 stateful component，而不是整个页面。

后续 PR 会在我们接入 linter side 时添加更多 sections（`icons`、`craft-details`）。

## Attribution

Craft content 改编自 MIT-licensed [refero_skill](https://github.com/referodesign/refero_skill) project（© Refero Design），并经过调整，以适配 Open Design 的 house style，并链接回 OD 的 design tokens（`var(--accent)` 等），而不是 generic Tailwind hex values。
