# BMW M 使用指南

面向 Open Design agents 和 reviewers 的 Design System 2.0 package 使用指南。

## Read Order

1. 先读本文件，理解 package contract。
2. 阅读 `DESIGN.md`，了解 visual intent、constraints 和 anti-patterns。
3. 编写 component CSS 前，将 `tokens.css` 粘贴到第一个 artifact `<style>` block。
4. 使用 `components.manifest.json` 获取 compact component inventory；需要精确 selectors 或 states 时再打开 `components.html`。
5. 需要 visual sanity check 时，检查 `preview/` pages。

## Design Highlights

- 分析到的 editorial 和 marketing pages 使用近纯黑 canvas（`{colors.canvas}` — #000）搭配白色文字。Configurator、account、checkout 和 order-management flows 尚未解析，可能引入 light surfaces。
- 遵循 BMW family system 时，display headlines 使用 UPPERCASE BMW Type Next Latin Light。更重的 uppercase settings 保留给 labels、buttons、card titles 和观察到的 M-specific emphasis。
- M tricolor（`{colors.m-blue-light}` / `{colors.m-blue-dark}` / `{colors.m-red}`）用作 4px brand-stripe dividers、M-wordmark accents 和 motorsport chrome，绝不要用作 buttons 或 fills。
- Photography 以 edge-to-edge 方式填满整段 bands。Cars 始终是 visual subject；UI chrome 后退为叠加在 photography 上的小号白色 labels。

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
