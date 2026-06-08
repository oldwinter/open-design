# Starbucks Source Evidence

## Source Scope

这个 Design System 2.0 backfill 派生自 curated Open Design bundled fixture。
它不声称重新 crawl 了原始 upstream brand repository 或 website。

## Included Fixture Files

- design-systems/starbucks/DESIGN.md
- design-systems/starbucks/tokens.css
- design-systems/starbucks/components.html

## Token Contract

`source/token-contract.report.json` 会把每个 TOKEN_SCHEMA binding 映射回已提交的 `tokens.css` declaration line。
`design-tokens.json` 和 `tailwind-v4.css` 是 derived outputs，应从 report 和 token stylesheet regenerate，而不是手动编辑。
