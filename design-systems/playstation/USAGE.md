# PlayStation 使用指南

面向 Open Design agents 和 reviewers 的 Design System 2.0 package 使用指南。

## Read Order

1. 先读本文件，理解 package contract。
2. 阅读 `DESIGN.md`，了解 visual intent、constraints 和 anti-patterns。
3. 编写 component CSS 前，将 `tokens.css` 粘贴到第一个 artifact `<style>` block。
4. 使用 `components.manifest.json` 获取 compact component inventory；需要精确 selectors 或 states 时再打开 `components.html`。
5. 需要 visual sanity check 时，检查 `preview/` pages。

## Design Highlights

- Three-surface channel layout: near-black hero, paper-white content, cobalt-blue footer — alternating, never blending
- SST weight 300 at 22–54px for display — "quiet authority" headlines that let product photography lead
- PlayStation Blue `#0070cc` as the brand anchor; cyan `#1eaedb` reserved exclusively for hover/focus states
- Every interactive element scales 1.2× on hover — a signature "power-on" lift unique to PlayStation

## Do

- 精确保留 schema token names，确保 cross-brand switching 可靠。
- 将 `--accent` 用于 primary actions、links、focus states 和一个清晰 focal element。
- 发明新 controls 前，先复用 `components.manifest.json` 中的 component groups。
- 将 `source/` files 视为 bundled fixture backfill 的 audit evidence。

## Avoid

- 避免在复制的 `:root` token block 之外使用 raw hex values。
- 避免脱离 `tokens.css` 独立重定义 Tailwind 或 design-token values。
- 避免声称拥有 original upstream source evidence；这个 package 基于 curated bundled fixture。
- 避免添加 `components.html` 或 `DESIGN.md` 中没有体现的新 component recipes。
