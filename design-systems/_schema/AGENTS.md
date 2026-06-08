# `_schema/` — design-system contracts

此目录 codifies design systems 的 structural contracts。`tokens.schema.ts` re-export 每个 `design-systems/<brand>/` 下 tokenized brand 都必须满足的 token contract。Canonical runtime copy 位于 `packages/contracts/src/design-systems/token-schema.ts`，这样 daemon importers 和 repo guards 会消费同一个 schema。`manifest.schema.ts` 是通过添加 `manifest.json` opt into Design System Project shape 的 folders 所用的 project contract；legacy `DESIGN.md`-only folders 在迁移前仍然有效。

```
_schema/
├── manifest.schema.ts ← project manifest schema (TS, machine-enforced when present)
├── tokens.schema.ts   ← token schema re-export (TS, machine-enforced)
├── defaults.css       ← A2 fallback values (CSS, human reference)
└── AGENTS.md          ← this file
```

TypeScript schemas 是 source of truth。`defaults.css` 是 token schema 中 A2 `fallback` fields 的 human-readable mirror；它存在的目的是让 reviewers 不用 parse TS array 也能扫描真实 CSS。两者之间的 drift 由 `design-system: A2 defaults parity` guard 强制检查。对于任何存在的 `design-systems/<brand>/manifest.json`，Manifest shape 由 `scripts/check-design-system-manifests.ts` 强制检查。

## Project manifest contract

Design System Project folders 使用固定 v1 file names：

- `manifest.json`：machine-readable project entry。
- `DESIGN.md`：canonical design prose。
- `tokens.css`：canonical compiled tokens。
- `design-tokens.json`：可选 Design Tokens JSON，从 `tokens.css` + `source/token-contract.report.json` 派生。
- `tailwind-v4.css`：可选 Tailwind v4 `@theme` CSS，从 `tokens.css` 派生；它不得独立重新定义 source values。
- `components.html`：可选 standalone component fixture。
- `assets/`：可选 brand assets。
- `preview/`：可选 static preview pages。
- `USAGE.md`：可选 agent-facing package guide。
- `components.manifest.json`：可选 rebuildable cache，从 `components.html` 和 `tokens.css` 派生。
- `fonts/`：可选 webfont files。
- `source/`：可选 importer evidence（`scanned-files.json`、`evidence.md`、`tokens.source.json`、`token-contract.report.json` 和 `snippets/INDEX.json`）。

Manifest guard 只验证带有 `manifest.json` 的 folders；它不要求 bundled catalog 一次性全部迁移。Rich import fields 在 PR0 中是 structural：声明时 paths 必须 safe 且存在，JSON indexes 必须能 parse，committed `components.manifest.json` files 必须匹配从 `components.html` 加 `tokens.css` freshly derivation 的结果。Runtime prompt composition 和 picker behavior 在后续 PRs 消费这些 fields 前保持不变。

## Four layers, two questions

每个 shared token 回答两个问题：

1. **谁决定 value？** 是 brand author（Layer A），还是 schema author（Layer B-slot，当 brand 没有观点时）。
2. **brand 省略它时会发生什么？** required、fallback 或 alias。

这四层由这些答案自然导出：

| Layer | Who decides | If omitted | Examples |
| --- | --- | --- | --- |
| **A1-identity** | brand | guard fails | `--bg`, `--fg`, `--accent`, `--font-display` |
| **A1-structure** | brand | guard fails | type scale, `--container-max`, `--section-y-*` |
| **A2** | brand (with fallback) | 目前 guard fails；明天 derive script fills | `--motion-fast`, `--success`, `--space-4`, `--font-mono` |
| **B-slot** | brand or schema-suggested alias | guard fails；brand 必须声明，形式可以是 `var(--sibling)`（collapsed）或 independent value（richer） | `--fg-2 → var(--fg)`, `--surface-warm → var(--surface)` |

落在 shared schema 之外的 brand-specific tokens 会作为 **C-extensions** 记录在 `BRAND_EXTENSIONS`（per-brand allowlist）或 `BRAND_EXTENSION_PREFIXES`（用于整个 families 的 global prefix allowlist，例如 `--tag-bg-*`）中。

## Why A2 fails the guard today (and might not later)

概念上，A2 意味着“optional with fallback”；但 artifacts 是由 agents 把某个 brand 的 `:root` block paste 到单个 `<style>` 中生成的。没有 global stylesheet 与该 brand 一起加载，所以缺失的 `--motion-fast` 会在 artifact 内 resolve to nothing，任何 `transition: var(--motion-fast)` rule 都会静默破坏。

在 derive script（PR-B）落地、并把 `defaults.css` values inline 到每个 brand 的 `tokens.css` 之前，唯一安全的 contract 是“每个 brand 必须声明每个 A2 token”。`design-system: A2 required tokens` guard 会严格执行这一点。

derive script 发布后，brand authors 只需要写 A1 tokens（以及任何想 override 的 A2）；script 会从 `defaults.css` 填充 A2 slots。Guard contract 不变：每个最终 `tokens.css` 仍包含每个 A2 token；只是工作从 human author 转移到 script。

## Why B-slot is required (and what the alias is for)

同样的 artifact-paste constraint 也适用于 B-slot tokens。Shared components 通过 `var(--fg-2)`、`var(--meta)`、`var(--surface-warm)`、`var(--border-soft)` 引用 richer tiers；如果 brand 省略 slot，这些引用会 resolve to nothing，artifact 会静默破坏。

每个 B-slot entry 上的 `aliasTo` field 是 **schema-suggested default**，不是 runtime fallback。对 richer tier 没有观点的 brand 会把 alias 原样复制到自己的 `:root`：

```
--fg-2: var(--fg);                /* default brand: 2-level fg */
--surface-warm: var(--surface);   /* default brand: 2-level surface */
```

确实拥有 richer tier 的 brand 会绑定 independent value：

```
--fg-2: #3d3d3a;                  /* kami brand: dark warm */
--surface-warm: #e8e6dc;          /* kami brand: warm sand */
```

任一形式都满足 `design-system: B-slot required tokens` guard。Pre-derive-script contract 与 A2 完全相同：每个 brand 的 `:root` 都声明每个 shared slot。

## C → B-slot → A2 promotion path

Brand-specific tokens 从 `BRAND_EXTENSIONS[brand]` 开始。当第二个 brand 需要同名 token 时，它们获得 promotion 资格：

```
C-extension                    B-slot                       A2
(one brand declares it)        (multiple brands declare,    (every brand declares
                                some alias to a sibling)     with a sensible default)

kami: --leading-display    →   schema: --leading-display    →   schema: --leading-display
                               aliasTo: var(--leading-tight)    fallback: 1.1
```

具体 promotion rules：

1. **C → B-slot**：当 **≥2 brands** 声明同名 token，*且* 对缺少 richer tier 的 brands 存在一个有意义的 sibling 可 alias 时。把 entry 从 `BRAND_EXTENSIONS` 移到 `TOKEN_SCHEMA`，设置 `layer: "B-slot"` 和 `aliasTo: "var(--sibling)"`。
2. **C → A2**：当 **≥2 brands** 声明同名 token，*且* 存在 defensible cross-brand fallback（不需要 aliasing）时。移到 `TOKEN_SCHEMA`，设置 `layer: "A2"` 和 `fallback`，然后在 `defaults.css` 中 mirror 该 value。
3. **B-slot → A2**：当某个 B-slot 开始被 ≥2 brands independent bound（而不是 aliasing）时。用 `fallback` 替换 `aliasTo`，并添加 defaults.css declaration。
4. **A2 → A1** 很少见。它发生在之前可 default 的 value 变成 brand-determining 时。例如，如果未来某个 brand 把 `--motion-base` 从 200ms 重新定义为 50ms，因为它的 identity 是 "instant"，且这个变化会有意义地影响 brand voice。此时 drop `fallback` 并 reclassify。

目前不支持 Demotion（A → B → C）。如果 token 真的不再需要，应先在 schema 中标记 `@deprecated` 一个 release，然后在同一个 PR 中从每个 brand 的 `tokens.css` 删除。

## When **not** to add a token

Schema growth 有成本：derive script 下次运行时，每个新 entry 都会迫使 138 个 brands 声明或 alias 新 name。应抵制添加以下 tokens：

- **Component-internal**：例如没有其他 component 会读取的 `.btn-primary` background offset。把 value inline 到 component rule 中。
- **One-off**：单个 layout 的 hero crop ratio。不是 token。
- **Speculative**："we might want a `--motion-slow` someday." 等真实 interaction 第一次需要时再添加，不要提前加。
- **Already expressible**：例如可 resolve 为 `color-mix(in oklab, var(--accent), transparent 50%)` 的 `--accent-tint-50`。在 ≥2 components 需要相同 tint 和相同 alpha 前，先 inline `color-mix(...)` call；然后再 promote 为 token。

## Editing this directory

更改 token schema 时：

- 运行 `pnpm guard`，并确认 `default` 和 `kami` 仍通过每个 design-system sub-check。
- 如果添加了 A2 entry：同时用匹配的 declaration 更新 `defaults.css`，并与 `fallback` field byte-equivalent。
- 如果重命名 token：在同一个 commit 中 bump 每个 brand 的 `tokens.css` 和对应 `components.html` `:root` paste。否则 drift guard 会失败。
- 如果从 `TOKEN_SCHEMA` 移除了某个 token，而同名 token 现在只出现在一个 brand 中：把它添加到该 brand 的 `BRAND_EXTENSIONS` entry，避免 unknown-token guard 失败。

## Open questions deferred to PR-B

此 PR codifies schema，并在 hand-authored brands 上强制执行。以下问题有意不在这里回答：

- **derive script 如何从 `DESIGN.md` source A1 values？** 有些 sections（color palette、type scale）很好 parse；其他 sections（visual atmosphere、do's and don'ts）不行。很可能会出现 frontmatter 或 fenced-block convention。
- **当 brand 的 `DESIGN.md` 自相矛盾时怎么办？** 例如 accents 同时列为 cobalt 和 indigo。derive script 需要 deterministic resolution（last-wins、manual override flag 或 hard fail）。
- **A2 fallback formulas 在 re-derived 时是否稳定？** Script output 必须 bit-for-bit reproducible，这样在相同 input 上运行两次不会 churn 138 个文件。

这些问题会在引入 `scripts/derive-tokens-css.ts` 的 PR 中处理。
