# Critique Theater

## 命名

- **内部 codename（engineering、code、prompts、env vars、modules、SSE event prefix、telemetry）：** `Critique Theater`。用于 `apps/daemon/src/critique/`、`apps/web/src/components/Theater/`、`OD_CRITIQUE_*`、`critique.*` SSE events。
- **面向用户的 label（UI、settings、docs、README、marketing copy）：** `Design Jury`。该字符串来自单一 i18n key `critiqueTheater.userFacingName`，因此无需触碰 code 就能替换 label。

这种拆分是有意的。工程师需要理解系统；用户则是在聘请一个 jury。

## 目的

Critique Theater 将 Open Design 的单轮 artifact generation 变成一个经过 panel 打磨、可评分、可回放的过程。每个 artifact 都由一个可见的五人 Design Jury（Designer、Critic、Brand、A11y、Copy）在同一个 CLI session 内生成，并通过可配置 score threshold 约束自动收敛的 rounds。默认情况下，低于 8.0/10 的 artifact 不会 ship。

本 spec 是 v1 implementation 与 protocol 的规范来源。prompt template、daemon parser、SSE event schema、SQLite columns、Theater UI components 和 adapter conformance suite 都以它为 source of truth。

## 非目标

- 不是新的 skill protocol。`skills/` 下的现有 skills 保持不变。
- 不是新的 agent runtime。daemon 仍会像今天一样为每个 artifact 启动同一个单一 CLI。
- 不是 parallel-process architecture。每个 artifact lifecycle 中只有一次 CLI invocation。
- 不是新的 transport。现有 project event stream 上的 SSE 承载所有新的 event variant。
- v1 不提供 configurable cast。五个 panelists 固定；cast extension 留给 v2。

### 为什么排除这些非目标

上面的非目标是有意选择，而不是随意排除。未来读者应该能看到每个选择背后的 tradeoff。

- **No parallel processes.** 单个 CLI session 能保持 agent 的完整上下文一致：Designer 的 draft 和后续每个 panelist 的 notes 共享同一个 model context，因此 Critic 能看到 Designer 实际选择的 hierarchy values，Brand panelist 能读取传给 Designer 的同一份 DESIGN.md，Copy panelist 也能挑拣 Designer 写下的 verbs。拆成多个 processes 会需要跨 process 的 artifact handoff，还需要把前面 panelists 的 notes replay 进每个 panelist 的 context；这预计会给 v1 timeline 增加两到三周，并把 debugging session 变成 multi-process trace correlation 问题。
- **No new agent runtime.** Open Design 已经检测到的同一套 on-PATH CLI（Claude Code、Codex、Cursor Agent、Gemini CLI 等）就是这个功能触达用户的方式。构建 runtime 会重复现有 daemon 已经做得很好的工作，会迫使用户使用我们选择的 model 而不是他们注册使用的 model，并且会在每一层丢失 BYOK。
- **No new SSE transport.** SSE 已经贯穿 daemon、web app、Electron shell 和 desktop sidecar IPC。第二套 transport 会迫使每个 consumer 学习第二套 connection lifecycle，这正是会把功能挤出 v1 的 accidental complexity。
- **No configurable cast in v1.** 固定的五人 panelist roster 让 composite formula 和 weight defaults 在每个 artifact 上保持恒定。configurable cast 会增加 UX surface（per-skill picker、override storage、settings sync），并要求 score formula 动态重新分配 weight。等我们有数据知道用户实际会移除或添加哪些 roles 后，再承诺 v2。
- **No new skill protocol.** Critique Theater 叠加在 skill loader 之上；它不改变 skill 的定义。这意味着 31 个现有 skills、129 个 design systems 以及任何未来贡献都能继承 panel，不需要 per-skill migration work。

## 高层架构

```
[ apps/web ]                           [ apps/daemon ]                    [ active CLI ]
  brief form         POST brief          spawnAgent(skill, brief, cfg)      role-plays
  Theater stage   ─────────────────►     compose prompt:                     5 panelists
  score badge                              base skill prompt                 across up to
  transcript                              + design system DESIGN.md          3 rounds in
  replay                                  + panel.ts protocol addendum       one session
                                          + critique config                  emits XML-ish
                  ◄─── SSE events ───────  parse stdout incrementally        tagged stream
  reducer +                                emit panelEvent / roundEvent
  selectors                                / shipEvent / degradedEvent
                                           persist transcript ndjson +
                                           critique columns in SQLite
```

daemon 中正好新增三个 modules：

| Module | Responsibility | Inputs | Outputs |
| --- | --- | --- | --- |
| `apps/daemon/src/critique/parser.ts` | `<PANELIST>`、`<ROUND_END>`、`<SHIP>` blocks 的 streaming tokenizer。处理 partial chunks、malformed input 和 recovery。 | `AsyncIterable<string>` (CLI stdout) | `AsyncIterable<PanelEvent>` |
| `apps/daemon/src/critique/scoreboard.ts` | 纯 state machine。消费 `PanelEvent`s，按 round 缓冲，并使用注入 config 决定 ship vs continue。无 I/O。 | `PanelEvent`, `CritiqueConfig` | `ScoreboardEvent` (delta-driven) |
| `apps/daemon/src/critique/orchestrator.ts` | 将 parser 和 scoreboard 连接到 SSE bus 与 SQLite。负责 interrupt cascade、persistence 和 degraded fallback。 | spawn handle, project id, artifact id | side effects: SSE + DB writes |

两个新的 web component groups：

| Component group | Responsibility |
| --- | --- |
| `apps/web/src/components/Theater/` | Live theater stage、collapsed score badge、transcript replay、interrupted state、degraded banner、interrupt button。完全由 SSE event stream 上的 pure reducer 驱动。 |
| `apps/daemon/src/prompts/panel.ts` | 注入每个 artifact-generating prompt 的 protocol addendum。导出 `PROTOCOL_VERSION`。 |

一个新的 contract package extension：

| File | Purpose |
| --- | --- |
| `packages/contracts/src/critique.ts` | `CritiqueConfig` zod schema, `PANELIST_ROLES` constants, `PanelEvent` discriminated union, `CritiqueSseEvent` extension to the existing SSE event union. |

## 配置

所有 thresholds、timeouts 和 policies 都由 config 驱动。business logic 中没有 magic numbers。默认值放在 schema 旁边的单一 `defaults.ts` 中，并可通过现有 daemon env layer 读取的 environment variables 覆盖。

```ts
// packages/contracts/src/critique.ts
export const PANELIST_ROLES = ['designer', 'critic', 'brand', 'a11y', 'copy'] as const;
export type PanelistRole = typeof PANELIST_ROLES[number];

export interface CritiqueConfig {
  enabled: boolean;
  cast: PanelistRole[];
  maxRounds: number;
  scoreThreshold: number;
  scoreScale: number;
  weights: Record<PanelistRole, number>;
  perRoundTimeoutMs: number;
  totalTimeoutMs: number;
  parserMaxBlockBytes: number;
  fallbackPolicy: 'ship_best' | 'ship_last' | 'fail';
  protocolVersion: number;
  maxConcurrentRuns: number;
}
```

| Env var | Default | Notes |
| --- | --- | --- |
| `OD_CRITIQUE_ENABLED` | `false` at M0, `true` from M3 | Master switch。False = legacy generation。 |
| `OD_CRITIQUE_MAX_ROUNDS` | `3` | rounds 的硬上限。 |
| `OD_CRITIQUE_SCORE_THRESHOLD` | `8.0` | Ship gate。Composite 低于该值则继续。 |
| `OD_CRITIQUE_SCORE_SCALE` | `10` | Score range 上限。下限始终是 0。 |
| `OD_CRITIQUE_ROUND_TIMEOUT_MS` | `90000` | Per-round wall clock cap。 |
| `OD_CRITIQUE_TOTAL_TIMEOUT_MS` | `240000` | Total run wall clock cap。 |
| `OD_CRITIQUE_PARSER_MAX_BLOCK_BYTES` | `262144` | 匹配 tags 之间的 bytes 硬上限，防止 unbounded buffering。 |
| `OD_CRITIQUE_FALLBACK_POLICY` | `ship_best` | threshold 始终未达到时保留哪个 round。 |
| `OD_CRITIQUE_MAX_CONCURRENT_RUNS` | `os.cpus().length` | Daemon-wide cap。超额 requests 按 project FIFO 排队。 |

composite score 的默认 weights 是 `{ designer: 0, critic: 0.40, brand: 0.20, a11y: 0.20, copy: 0.20 }`。Designer 不纳入 composite，因为 Designer 负责 draft；Designer 不评分。如果某个 panelist 在某个 round 缺少 score，weight 会按比例重新分配给已出现的 panelists。weights object 是单一 source of truth；formula 只存在于 `scoreboard.ts`。

## Wire protocol (`PROTOCOL_VERSION = 1`)

格式是 XML-ish tagged regions，不是 JSON。Tagged regions 能容忍 streaming、partial chunks 和 model variability，而 JSON 不能。现有 OD prompt files（`directions.ts`、`discovery.ts`）已经使用这种风格。

```
<CRITIQUE_RUN version="1" maxRounds="3" threshold="8.0" scale="10">

  <ROUND n="1">
    <PANELIST role="designer">
      <NOTES>One sentence stating the design intent for v1.</NOTES>
      <ARTIFACT mime="text/html"><![CDATA[
        ... self-contained artifact for round 1 ...
      ]]></ARTIFACT>
    </PANELIST>

    <PANELIST role="critic" score="6.4" must_fix="3">
      <DIM name="hierarchy" score="6">CTA competes with logo at top-left.</DIM>
      <DIM name="type"      score="7">H1 64px reads as poster, not landing.</DIM>
      <DIM name="contrast"  score="4">CTA 3.9:1, fails AA.</DIM>
      <DIM name="rhythm"    score="6">Vertical gaps 12/16/24/40, no system.</DIM>
      <DIM name="space"     score="5">Hero padding asymmetric L vs R.</DIM>
      <MUST_FIX>Push CTA background L by 8% to clear AA.</MUST_FIX>
      <MUST_FIX>Pick a 4px or 8px vertical rhythm.</MUST_FIX>
      <MUST_FIX>Symmetrize hero horizontal padding.</MUST_FIX>
    </PANELIST>

    <PANELIST role="brand" score="7.5"> ... </PANELIST>
    <PANELIST role="a11y" score="5.0"> ... </PANELIST>
    <PANELIST role="copy" score="6.0"> ... </PANELIST>

    <ROUND_END n="1" composite="6.18" must_fix="7" decision="continue">
      <REASON>Composite below threshold 8.0; 7 must-fix open.</REASON>
    </ROUND_END>
  </ROUND>

  <ROUND n="2"> ... </ROUND>
  <ROUND n="3"> ... </ROUND>

  <SHIP round="3" composite="8.62" status="shipped">
    <ARTIFACT mime="text/html"><![CDATA[
      ... final shipped artifact ...
    ]]></ARTIFACT>
    <SUMMARY>One paragraph describing what changed across rounds and why.</SUMMARY>
  </SHIP>

</CRITIQUE_RUN>
```

### Parser invariants

| Invariant | Enforcement |
| --- | --- |
| Tags well-formed and balanced | Streaming parser。Malformed input 抛出 `MalformedBlockError`。 |
| `role` value is in `PANELIST_ROLES` | Unknown role 会丢弃该 block、发出 warning，并继续 run。 |
| `score` is `0 <= n <= scoreScale` with one decimal | 超出范围会 clamp 到边界并发出 warning。 |
| `composite` matches recomputed mean within ±0.05 | 不匹配时记录 warning；daemon recomputed value 优先。 |
| Each round contains every cast role exactly once | 缺失 role 会让该 role 贡献 score `0`；must-fix counter 继续推进。 |
| Designer round 1 contains exactly one `<ARTIFACT>` | 缺失 artifact 会抛出 `MissingArtifactError` 并触发 degraded fallback。 |
| `<SHIP>` appears exactly once or never | 重复时第一个 wins，其余丢弃并发出 warning。 |
| `decision` is `continue` or `ship` | Unknown 默认成 `continue`（safe）。 |
| Total bytes between matched open and close tags ≤ `parserMaxBlockBytes` | 超限会抛出 `OversizeBlockError` 并触发 degraded fallback。 |
| CDATA appears only inside `<ARTIFACT>` and `<NOTES>` | 由 lexer state machine 强制执行。 |

### Composite score formula

```ts
// Pure function in apps/daemon/src/critique/scoreboard.ts.
// weights come from CritiqueConfig.weights, never hardcoded in business logic.
const present = roles.filter(r => panelistScore[r] != null);
const totalWeight = present.reduce((s, r) => s + weights[r], 0);
const composite = present.reduce((s, r) => s + (weights[r] / totalWeight) * panelistScore[r], 0);
```

### Protocol versioning

- `<CRITIQUE_RUN version="1">` 是 v1 的 canonical 形式。
- Parser dispatch 到 `parsers/v1.ts`。未来 v2 会与 v1 并列落在 `parsers/v2.ts`；daemon 会无限期同时支持两者。
- 每个 artifact row 存储 `critique_protocol_version`。旧 artifacts 会通过其原始 parser replay，而不是新 parser。
- prompt template 将 `PROTOCOL_VERSION` 导出为 TypeScript constant；如果该 constant 被 bump 但没有新的 `parsers/v{n}.ts` file，CI 会失败。

### Disagreement requirement

每个非 final round 必须至少包含两个给出分歧 `MUST_FIX` directives 的 panelists。Critic 以及 {Brand, A11y, Copy} 中至少一个角色都必须各自 emit 至少一个 `MUST_FIX`，且 target subsystem 与其他角色不同。protocol 在 prompt template 中强制这一点；如果 round 关闭时没有 disagreement，parser 会 emit 一个 `WeakDebate` warning，orchestrator 会将其计入 `parser_errors_total{kind="weak_debate"}` 用于 observability，但不会让 run 失败。

### Convergence rule

同时满足以下条件时，round 以 `decision="ship"` 关闭：

- `composite >= scoreThreshold`
- Sum of open `must_fix` counts across panelists is `0`

否则 round 以 `decision="continue"` 关闭，并开始下一个 round。达到 `maxRounds` 后，orchestrator 应用 `fallbackPolicy`：

- `ship_best`：选择 composite 最高的 round。默认值。
- `ship_last`：选择最后完成的 round。
- `fail`：将 run 持久化为 `below_threshold`，不提供 shipped artifact；UI 展示 recovery actions。

### Self-bound budget

Round `n+1` 的 transcript bytes 必须小于 round `n` 的 transcript bytes。最终 shipped artifact 必须 production-ready：没有 `TODO` comments、没有 Lorem Ipsum、没有 broken links。prompt template 负责强制；orchestrator 在持久化 artifact 前运行 final lint pass。

## SSE event protocol

现有 `/api/projects/:id/events` SSE stream 承载新的 event variants。所有 event names 都作为 discriminated union extension 放在 `packages/contracts/src/sse.ts` 中，不能作为 string literals 散落在 handlers 里。

| Event name | Payload fields | Meaning |
| --- | --- | --- |
| `critique.run_started` | `runId`, `protocolVersion`, `cast`, `maxRounds`, `threshold`, `scale` | Theater handshake。UI 从 `cast` 初始化 lanes，并按 `maxRounds` 布局 rounds。 |
| `critique.panelist_open` | `runId`, `round`, `role` | stream 中 tag opened。UI 激活 lane caret。 |
| `critique.panelist_dim` | `runId`, `round`, `role`, `dimName`, `dimScore`, `dimNote` | Per-dim score line。UI animate 对应 bar。 |
| `critique.panelist_must_fix` | `runId`, `round`, `role`, `text` | Must-fix directive。UI append 到对应 lane。 |
| `critique.panelist_close` | `runId`, `round`, `role`, `score` | Tag closed。UI 取消激活 caret 并锁定 score。 |
| `critique.round_end` | `runId`, `round`, `composite`, `mustFix`, `decision`, `reason` | Round closed。UI 推进 ScoreTicker，RoundDivider 递增。 |
| `critique.ship` | `runId`, `round`, `composite`, `status`, `artifactRef`, `summary` | Run shipped。UI 将 theater 折叠为 score badge。 |
| `critique.degraded` | `runId`, `reason`, `adapter` | Parser fallback fired。UI 用 banner 替换 theater。 |
| `critique.interrupted` | `runId`, `bestRound`, `composite` | User interrupt。UI 显示 interrupted state。 |
| `critique.failed` | `runId`, `cause` | Unrecoverable error。UI 显示 failed state 并提供 retry。 |
| `critique.parser_warning` | `runId`, `kind`, `position` | Non-fatal parser recovery。除非 `kind == "weak_debate"`，UI 只暴露到 log，不直接展示给用户。 |

`artifactRef` payload 是 logical reference（`{ projectId, artifactId }`），不是 artifact body。UI 通过现有 artifact endpoint 获取 body，并在现有 sandboxed iframe 中渲染。

## 持久化

新的 SQLite migration 会向现有 `artifacts` table 添加 critique columns。该 migration 是 additive 且可逆的。

```sql
-- 00XX_critique_rounds.up.sql
ALTER TABLE artifacts ADD COLUMN critique_score REAL;
ALTER TABLE artifacts ADD COLUMN critique_rounds_json TEXT;
ALTER TABLE artifacts ADD COLUMN critique_transcript_path TEXT;
ALTER TABLE artifacts ADD COLUMN critique_status TEXT
  CHECK (critique_status IN ('shipped','below_threshold','timed_out','interrupted','degraded','failed','legacy'));
ALTER TABLE artifacts ADD COLUMN critique_protocol_version INTEGER;
CREATE INDEX IF NOT EXISTS idx_artifacts_critique_status ON artifacts(critique_status);
```

```sql
-- 00XX_critique_rounds.down.sql
DROP INDEX IF EXISTS idx_artifacts_critique_status;
ALTER TABLE artifacts DROP COLUMN critique_protocol_version;
ALTER TABLE artifacts DROP COLUMN critique_status;
ALTER TABLE artifacts DROP COLUMN critique_transcript_path;
ALTER TABLE artifacts DROP COLUMN critique_rounds_json;
ALTER TABLE artifacts DROP COLUMN critique_score;
```

| Column | Format | Notes |
| --- | --- | --- |
| `critique_score` | `REAL` | Final composite。legacy artifacts 为 `NULL`。 |
| `critique_rounds_json` | `TEXT` | 每个 round 的紧凑 summary：`[{n, composite, mustFix, decision}]`。有界；完整 transcript 在磁盘上。 |
| `critique_transcript_path` | `TEXT` | `.od/artifacts/<artifactId>/` 下的 relative path。存储值是 relative path；absolute resolution 只在 daemon 侧完成。 |
| `critique_status` | `TEXT` | 受 `CHECK` clause 约束。`legacy` 标记 feature shipped 之前产出的 artifacts。 |
| `critique_protocol_version` | `INTEGER` | 固定 replay 要使用哪个 `parsers/v{n}.ts`。 |

Transcripts 写入 `.od/artifacts/<artifactId>/transcript.ndjson`（每行一个 `PanelEvent`）。大于 256 KiB 的 files 会 gzip 成 `transcript.ndjson.gz`。orchestrator 在写入时选择格式；replay path 通过 extension 检测格式。

## UI surface

所有 Theater components 都位于 `apps/web/src/components/Theater/`。每个 file 少于 200 行。

```
Theater/
  index.ts
  TheaterStage.tsx
  PanelistLane.tsx
  ScoreTicker.tsx
  RoundDivider.tsx
  TheaterCollapsed.tsx
  TheaterTranscript.tsx
  TheaterDegraded.tsx
  InterruptButton.tsx
  hooks/
    useCritiqueStream.ts
    useCritiqueReplay.ts
  state/
    reducer.ts
    selectors.ts
  __tests__/
    reducer.test.ts
    TheaterStage.test.tsx
```

### State machine

```ts
type CritiqueState =
  | { phase: 'idle' }
  | { phase: 'running'; runId: string; rounds: Round[]; activeRound: number; activePanelist: PanelistRole | null }
  | { phase: 'shipped'; runId: string; rounds: Round[]; final: ShipPayload }
  | { phase: 'degraded'; reason: DegradedReason }
  | { phase: 'interrupted'; runId: string; rounds: Round[]; bestRound: number }
  | { phase: 'failed'; runId: string; cause: FailedCause };
```

reducer 是纯函数。每个 transition 都由一个 vitest case 覆盖，并由 adapter conformance suite 的 golden-file SSE replays 支撑。除 UI-only ephemera（lane scroll position、badge expanded vs collapsed）外，没有 state 存在于 reducer 之外。

### 视觉规格

- Lanes 在 right rail 内垂直堆叠，使用 `gap: 12px`。当 viewport width 低于 720 px 时，rail 本身变为 full-width drawer。
- Per-dim scores 渲染为 horizontal bars，其 width 从 0 animate 到 `(score / scaleMax) * 100%`，使用 `transition: width 600ms cubic-bezier(.2,.8,.2,1)`。
- Animation 遵守 `prefers-reduced-motion: reduce`；bars 直接跳到最终 width，score-ticker 停止 easing。
- Lane colors 来自按 role keyed 的 CSS custom properties。五个 role inks 会根据 active design system 的 OKLch token palette 设定主题。TSX 中不允许 hex literals。
- collapsed mode 下的 score badge 渲染四个 colored dots，label 分别为 `C` `B` `A` `W`（Critic、Brand、A11y、copy/Word），再加 composite number。

### Lane density（默认紧凑，按需展开）

right rail 天然信息密集（5 个 panelists、每人多个 dims、must-fix lists、round dividers）。为了让普通用户读得清，同时不损失 power users 需要的细节，panel 提供三个明确 modes，可通过 lanes 上方的 segmented control 切换。

| Mode | Default? | Behavior |
| --- | --- | --- |
| `Smart` | yes | active panelist（当前正在 streaming 的 lane，或 ship 后 score 最低的 panelist）会展开。其他全部 collapsed：只显示 head + 1-line summary。 |
| `Active only` | no | 只渲染 active panelist；其他仅显示 head、无 summary，用于最紧凑视图（例如嵌入小 workspace tile）。 |
| `Expand all` | no | 每个 lane 都完全展开。适合想一次看到每个 dim 和每个 must-fix 的 power users。用户显式选择后作为 per-user preference 持久化。 |

Lane heads 可点击，用于切换单个 lane 的 collapsed state，且独立于 segmented control。segmented control 是批量操作；lane head 是 per-lane override。

collapsed-lane summary 是**派生**出来的，而不是手写：它取该 panelist 上最重要的 must-fix；如果没有 must-fixes（panelist 已经满意），则回退到影响最高的 dim note。文本截断为一行并加 ellipsis。Selectors 是纯函数并有 unit tests。

### "Why this matters" explainer

composite score card 正下方用一条 rule line 以直白语言说明 ship contract：

> Ships when composite score ≥ `scoreThreshold` and open must-fix == 0. Otherwise refine, up to `maxRounds` rounds.

三个 rendering variants：

| Phase | Variant |
| --- | --- |
| `running` | "Ships when composite score &ge; 8.0 and open must-fix == 0. Otherwise refine, up to 3 rounds." |
| `shipped` | "Shipped: composite 8.6 &ge; threshold 8.0 with 0 open must-fix. Consensus N of 5 panelists." |
| `interrupted` | "Did not meet ship rule (8.0 + 0 must-fix), but you stopped early. Best-of-N was kept, transcript stays available." |

Numeric values 来自 `CritiqueConfig`，绝不 hardcode。rule line 使用轻柔 dashed border，让它读起来像 explanatory chrome，而不是 actionable UI。

### Label sizing（production，不是 mockup）

| Element | Production size | Notes |
| --- | --- | --- |
| Composite score (big) | 36px / mono / 700 | the headline number |
| Per-panelist score | 14px / mono / 700 | colored to match lane ink |
| Dim names | 13px / mono | left column, secondary fg color |
| Dim numeric scores | 13px / mono / 600 | right column, primary fg color |
| Dim notes (sentence) | 13px / sans / 1.55 line-height | sentence-level explanation |
| Must-fix body | 13px / sans / 1.5 line-height | red ink on tinted background |
| Lane summary (collapsed) | 12px / sans / 1.4 line-height | derived single line, ellipsis at width |
| Lane name | 14px / sans / 600 | role label inside the head |
| Role tag | 11px / mono / uppercase | colored badge, fixed-width pill |
| Round divider | 11px / mono / uppercase / letter-spacing 0.1em | thin separator |
| Ship rule explainer | 12px / mono / 1.55 line-height | dashed-border explanatory block |

Label sizes ≤ 11px 只保留给 tags、badges 和 uppercase chrome。**production 中 body text 绝不低于 12px。** 这条规则由 CI lint 强制：任何新的 `font-size: <= 11px` rule 如果不在明确的 chrome class allowlist（`role-tag`、`dim-dot`、`round-divider`、`meta-pill`）中，grep 会失败。

### Demo-only chrome（不得 ship）

visual companion mockup 包含一些 **不属于产品** 的 affordances：

- rail 顶部的 "demo states" tab strip。
- 任何标记为 "demo · click tabs to walk every state" 的 footer pill。
- 用于 state-walking 的 keyboard shortcut。

这些元素纯粹用于让 reviewers 在一个页面中遍历每个 state。production Theater 每次只渲染一个 phase，并由 SSE stream 驱动。如果 production bundles 中出现任何匹配 `data-demo` 的字符串或 `demo-tabs` class，CI 会失败。mockup HTML 位于 `.superpowers/brainstorm/`（gitignored），永不 ship。

### Accessibility

- 每个 lane 都有 `role="region"`，并通过 `aria-labelledby` 引用自身 title。
- 单个 offscreen status node 携带 `aria-live="polite"`。它只 announce `round_end` 和 `ship` events，绝不 announce per-dim。
- Keyboard map：`Tab` 循环 lanes，`Enter` 切换 dim detail，`Esc` 触发带 confirm 的 Interrupt，`[` / `]` 在 collapsed 和 replay mode 中逐个切换 rounds。
- Color 永远不是唯一信号：must-fix counts 同时使用 color 和 numeric badge；dim bars 同时携带 color 和 width；scores 始终以 text 显示。
- Theater UI 自身由 CI test 审计，该测试会把 rendered DOM 送入 A11y panelist 使用的同一套 WCAG AA rule set。

### Performance budget

| Metric | Budget | Enforcement |
| --- | --- | --- |
| Stage component bundle | ≤ 18 KiB gzipped | `size-limit` in CI |
| Reducer hot path | p99 ≤ 2 ms per event | vitest bench in CI |
| First lane visible from first SSE event | ≤ 200 ms | Playwright trace in `e2e/critique-theater.spec.ts` |
| Transcript scrub at 1 MiB transcript | 60 fps, no dropped frames | Playwright `Page.metrics` |

### Interrupt semantics

当 `phase === 'running'` 时按下 Interrupt button 或 `Esc`：

1. Reducer 乐观 transition 到临时 interrupting state。button disabled，并把 label 设为 "Interrupting…"。
2. Web posts `POST /api/projects/:id/critique/:runId/interrupt`。
3. Daemon 将 `SIGTERM` cascade 到 spawned CLI。Orchestrator drain parser、flush scoreboard、对目前已完成 rounds 应用 `fallbackPolicy`、persist，然后 emit `critique.interrupted`。
4. Reducer 推进到 `phase: 'interrupted'`。UI 显示 best-completed round 的 artifact，并显示一个 tag 指明 shipped 的 round 和 score。

如果 interrupt 在任何 round 关闭前触发，daemon 不 ship 任何内容，并将 artifact row 持久化为 `interrupted`，且没有 `final`。UI 显示 empty state，并提供用原始 brief 一键 retry 的操作。

### Replay

重新打开 artifact 时，会从 SQLite columns 加载 badge。点击 expand 会触发 `useCritiqueReplay`，逐行将 `transcript.ndjson`（或 `.gz`）stream 进同一个 reducer。同一条 component code path 同时渲染 live 和 replay。Replay 支持 1×、4× 和 instant playback speeds，以及 click-to-scrub timeline。

## Failure modes

| Failure | Detection | Behavior |
| --- | --- | --- |
| Model emits malformed block | parser 看到 opening tag 后到 `parserMaxBlockBytes` 仍无 close，或在 close tag 前异常 | parser 抛出 `MalformedBlockError`，orchestrator 对本次 run 回退到 `legacy_generation` mode，并带 reason emit `critique.degraded`。Artifact 仍通过 legacy path ship。 |
| Score never crosses threshold | scoreboard 到达 `maxRounds` 仍未 consensus | 应用 `fallbackPolicy`。Score badge 标记为 `below_threshold`。 |
| Per-round timeout | round wall clock 超过 `perRoundTimeoutMs` | abort 当前 round，scoreboard ship best-so-far，badge 标记为 `timed_out`。 |
| Total timeout | total wall clock 超过 `totalTimeoutMs` | `SIGTERM` CLI，ship best-so-far，transcript 标记为 partial。 |
| User Interrupt | `POST /api/projects/:id/critique/:runId/interrupt` | cascade `SIGTERM`，persist partial state；如果已有 round closed 则 ship best-so-far，否则标记为 `interrupted` 且无 final。 |
| CLI process crash | spawn handle 在 `<SHIP>` 前 non-zero exit | persist partial transcript，用 `rounds_json.cause` 标记 `failed`，emit `critique.failed`，绝不 silent retry。 |
| Daemon restart mid-run | 下次 boot 扫描 SQLite 中 state 为 `running` 且早于 `totalTimeoutMs` 的 rows | 用 `rounds_json.recoveryReason = "daemon_restart"` 标记为 `interrupted`。绝不 auto-resume。 |
| Adapter unsupported | adapter 在 nightly CI 中 conformance test 失败 | adapter 在 adapter registry 中标记 `critique:degraded`，TTL 24h。UI 每个 session 每个 adapter 只显示一次 degraded banner。 |

### Failure-mode rate targets and recovery

上面的每个 failure mode 都有 empirical rate target、deterministic recovery path 和 Prometheus signal，让 Phase 12 dashboard 与 Phase 11 e2e suite 都能固定合理 thresholds。Targets 是初始值；我们会用前 1000 次 production runs 进行调优。

| Failure | Target rate | Recovery | Prometheus signal | Alert threshold |
| --- | --- | --- | --- | --- |
| `malformed_block` | < 0.5% of runs per adapter | emit `critique.degraded`, fall through to legacy single-pass generation. No retry. | `open_design_critique_degraded_total{reason="malformed_block",adapter="..."}` | sustained > 2% over 1h on any single adapter |
| `oversize_block` | < 0.1% of runs | same as `malformed_block` plus the parser's position is logged for postmortem | `open_design_critique_degraded_total{reason="oversize_block"}` | any non-zero sustained rate is treated as a model regression and pages |
| `missing_artifact` | < 0.2% of runs | degraded fallback, prompt template flagged for review (it should make this impossible) | `open_design_critique_degraded_total{reason="missing_artifact"}` | > 1% over 24h |
| Score never crosses threshold | < 5% of runs at M3 default | apply `fallbackPolicy` (default `ship_best`); badge tagged `below_threshold`; user can re-run | `open_design_critique_runs_total{status="below_threshold"}` | > 15% sustained over 24h is a quality regression |
| Per-round timeout | < 1% of runs | abort current round, ship best-so-far, badge tagged `timed_out` | `open_design_critique_runs_total{status="timed_out"}` | > 3% over 1h on any adapter |
| Total timeout | < 0.5% of runs | `SIGTERM` CLI, ship best-so-far, transcript marked partial | same series, distinguished by lifecycle attribute | shares the per-round timeout alert |
| User Interrupt | not an error; signal of latency or unwanted direction | preserve transcript, ship best-so-far if any round closed | `open_design_critique_interrupted_total{adapter="..."}` | > 10% over 24h is a UX problem worth investigating |
| CLI process crash | < 0.05% of runs | fail loud with `critique.failed`, no silent retry, daemon process surfaces the cause | `open_design_critique_runs_total{status="failed",cause="cli_exit_nonzero"}` | any non-zero sustained rate pages |
| Daemon restart mid-run | unbounded (depends on operator action) | persist `interrupted` with `recoveryReason="daemon_restart"`, never auto-resume | `open_design_critique_runs_total{status="interrupted",cause="daemon_restart"}` | informational, no alert |
| Adapter unsupported | adapter-specific; surfaces during conformance | adapter marked `critique:degraded` in registry with 24h TTL; degraded banner once per session | `open_design_critique_degraded_total{reason="adapter_unsupported",adapter="..."}` | one alert per adapter on first hit, suppressed during TTL |

A run 可以满足多个 labels（例如一个 `timed_out` run 同时也 `below_threshold`）。`status` label 是 orchestrator 在 run end 推导出的单一 canonical value；下游 histograms 会把 `cause` 和 `decision` 作为 separate labels 附加。

Phase 11 e2e suite 会针对 stub adapter 合成上表每一行，并 assert recovery 实际触发。Phase 12 会把 alert thresholds 导入提交到 `tools/dev/dashboards/critique.json` 的 Grafana dashboard JSON，这样 operator 不需要猜测。

## Concurrency and scalability

- Orchestrator instances 是 per-project。Daemon-wide concurrency cap 通过 `OD_CRITIQUE_MAX_CONCURRENT_RUNS` 控制。超额 requests 使用 project-level FIFO 排队。
- Streaming backpressure：parser 基于 `AsyncIterable`。当 SSE consumer 变慢时，daemon 的 bounded mailbox（256 events）对 parser 施加 backpressure，parser 再通过现有 sidecar transport 作用到 CLI stdout。任何位置都没有 unbounded buffers。
- 大于 1 MiB 的 transcripts 只 stream 到磁盘；SQLite row 存储 path，绝不存 blob。
- Cross-skill reuse：每个现有 skill 都免费获得 panel；不需要 per-skill code change。
- Adapter neutrality：panel prompt 是纯文本，不含 CLI-specific tokens。每个 adapter 都通过 conformance harness 测试。

## Skills protocol extension

Skills opt out via a new optional frontmatter field in `SKILL.md`:

```yaml
od:
  critique:
    policy: always | on-demand | off
```

一旦 M3 将 `OD_CRITIQUE_ENABLED` 全局打开，默认值就是 `always`。Per-skill overrides 会与 M2 在同一个 PR 中 ship。

## Adapter conformance

对 12 个 CLI adapters 和 BYOK proxy 中的每一个，conformance suite 会以 `temperature=0`（支持时）运行 deterministic mini-brief，并 assert：

- parser 消费 stream 时不出现 `MalformedBlockError`。
- 所有 required tags 以 canonical order 出现。
- Composite score 与 recomputed mean 的差异在 ±0.05 以内。
- `<SHIP>` artifact body 可解析为 well-formed HTML。

失败的 adapters 会在 adapter registry 中标记为 `critique:degraded`。daemon 对该 adapter 回退到 legacy generation，并在每个 session 只显示一次 degraded banner。我们绝不假装不存在的 feature parity。

## Observability

| Metric | Type | Labels | Purpose |
| --- | --- | --- | --- |
| `open_design_critique_runs_total` | counter | `status`, `adapter`, `skill` | Run volume by terminal state. |
| `open_design_critique_rounds_total` | counter | `adapter`, `skill` | Average rounds per artifact. |
| `open_design_critique_round_duration_ms` | histogram | `quantile`, `adapter`, `skill`, `round` | Round latency distribution. |
| `open_design_critique_composite_score` | histogram | `quantile`, `adapter`, `skill` | Output quality distribution. |
| `open_design_critique_must_fix_total` | counter | `panelist`, `dim`, `adapter`, `skill` | Where the panel finds problems most often. |
| `open_design_critique_degraded_total` | counter | `reason`, `adapter` | Adapter health proxy. |
| `open_design_critique_interrupted_total` | counter | `adapter` | User abandonment signal. |
| `open_design_critique_parser_errors_total` | counter | `kind`, `adapter` | Parser robustness. |
| `open_design_critique_protocol_version` | gauge | `version` | Active protocol versions in use. |

Structured logs 使用现有 daemon logger，并使用 namespace `critique`。Required events：`run_started`、`round_closed`、`run_shipped`、`degraded`、`parser_recover`、`run_failed`。OpenTelemetry traces 会用 spans `critique.run`、`critique.round.<n>`、`critique.parse_chunk`、`critique.scoreboard_eval`、`critique.persist_round`、`critique.ship.persist` 包裹每个 run。

Grafana dashboard 位于 `tools/dev/dashboards/critique.json`，包含三个 default views：fleet quality（每个 adapter 的 composite p50/p90/p99 over time）、adapter health（degraded ratio 加 parser-error rate）和 brief throughput（runs per hour、rounds per run、time-to-ship）。

## Security

| Surface | Threat | Mitigation |
| --- | --- | --- |
| `<ARTIFACT>` body | XSS in shipped HTML | Existing sandboxed iframe pattern with `sandbox` and CSP headers. No new surface. |
| Transcript on disk | Path traversal via stored path | The SQLite column stores a relative path; the daemon resolves under `.od/artifacts/<artifactId>/`; no user-supplied component reaches the resolver. |
| Brand `DESIGN.md` content in prompt | Prompt injection from a malicious system | DESIGN.md 会包裹在 `<BRAND_SOURCE>` block 中，其 framing 指示 agent 将其视为 data。与现有 skill loader 使用同一防御。 |
| Score and must-fix from agent stdout | Log injection (newlines, ANSI) | Parser strips ANSI; logs JSON-encode every value; UI renders as text only. |
| Pathological agent output | DoS via unbounded buffers | `parserMaxBlockBytes`, `perRoundTimeoutMs`, `totalTimeoutMs` are bounded and config-driven. Orchestrator enforces hard kill. |
| BYOK proxy invocation | SSRF / internal-IP exfil | Existing `/api/proxy/stream` blocks internal IPs at the daemon edge. Unchanged. |

merge 前会通过 `code-reviewer` agent 单独运行 security review pass。

## Testing

| Layer | Tool | Gate |
| --- | --- | --- |
| Pure unit | vitest | 95% line and 100% branch on `critique/parser.ts`, `scoreboard.ts`, `reducer.ts`. |
| Golden-file fixtures | vitest with `__fixtures__/critique/v1/*.txt` | Each adapter has at least one happy and two malformed transcripts on disk. |
| Component | RTL + jsdom | Every reducer phase rendered at least once. |
| Integration | vitest + sqlite memory + http mock | End-to-end happy path plus five failure modes. |
| Adapter conformance | nightly e2e against live adapters | Each of 12 CLIs plus BYOK proxy must pass canonical brief. |
| Playwright e2e | `e2e/critique-theater.spec.ts` | Theater renders within 200 ms, Esc triggers Interrupt, replay scrub at 60 fps. |
| Visual regression | Playwright `toHaveScreenshot()` | Each Theater state captured at 375 / 768 / 1280 viewports. |
| A11y self-test | axe-playwright | Theater UI passes WCAG AA. |
| Performance | size-limit + vitest bench | Bundle ≤ 18 KiB gz; reducer p99 ≤ 2 ms. |
| Dead-code | `ts-prune` scoped to `critique/` and `Theater/` | Zero unreferenced exports. |
| i18n | existing duplicate-key check plus new missing-key check | All 6 locales present for every Theater string. |
| Coverage walker | new `pnpm check:critique-coverage` | Each `CritiqueConfig` field, `PanelEvent` variant, SSE event, SQLite column, protocol grammar element, and i18n key has at least one production reference and one test. |

## Rollout

| Milestone | Scope | Default | Reversibility |
| --- | --- | --- | --- |
| M0 | Code 落在 `OD_CRITIQUE_ENABLED=false` 后面。运行所有 tests。没有 user-visible change。 | off | flip env var |
| M1 | Settings UI toggle "Critique Theater (beta)"。Adapter conformance grades 发布到 README。degraded markings 使用 24h TTL。 | off | flip toggle |
| M2 | 对最受益的 skills 默认开启：`magazine-poster`、`saas-landing`、`dashboard`、`finance-report`、`hr-onboarding`、`kanban-board`。Lightweight skills（`weekly-update`、`simple-deck`）保持 opt-in。在 `SKILL.md` 中引入 per-skill `od.critique.policy`。 | per-skill | per-skill flag |
| M3 | fleet 连续 14 天达到 ≥ 90% adapter conformance 后，将 global default 翻为 true。Opt-out 仍保留在 per-run 和 per-skill。 | on | env var or per-skill |

任一 milestone 的 rollback 都只需翻转 master env var。SQLite columns 是 additive，reads 永远不强依赖它们。现有 artifacts 保留 badge；新 artifacts 走 legacy generation。任一方向都不需要 data migration。

## Documentation deliverables

每一项都是 CI gate。缺少 documentation 会让 build 失败。

- `docs/critique-theater.md`，面向用户的 how-it-works，包含五种 states 的 screenshots 和 adapter compatibility table。
- `docs/spec.md`，添加 "Critique Theater protocol v1" section，并包含完整 wire grammar。
- `docs/architecture.md`，添加 `apps/daemon/src/critique/` module diagram。
- `docs/skills-protocol.md`，添加 `od.critique.policy` field documentation 和 extension points。
- `docs/agent-adapters.md`，添加每个 adapter 必须满足的 conformance test contract。
- `docs/roadmap.md`，将未来 panelist extensions（Perf、i18n、Motion、Cost）作为 future work 添加，而不是 committed scope。
- `apps/daemon/src/critique/AGENTS.md`，按照现有 `AGENTS.md` convention 提供 module-level guide。
- `apps/web/src/components/Theater/AGENTS.md`，同上。
- `README.md`，在 "What you get" table 中增加一行：Critique Theater，每个 artifact 都经过 panel 打磨、评分且可回放。
- 所有六个 locales（DE、JA、KO、zh-CN、zh-TW、EN）在同一 PR 中获得新 strings。现有 duplicate-key i18n CI gate 覆盖一致性。

## Open questions

无。所有 foundational decisions 都已在本 spec 中锁定。Future work 留给 v2（configurable cast、additional panelist roles、multi-CLI parallel debate、score-driven prompt-stack feedback loop），不属于 v1 scope。
