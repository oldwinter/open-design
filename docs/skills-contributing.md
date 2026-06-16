# Contributing a Skill

**父文档：** [`spec.md`](spec.md) · **同级文档：** [`skills-protocol.md`](skills-protocol.md) · [`architecture.md`](architecture.md) · [`modes.md`](modes.md)

> 想直接读 protocol spec？见 [`skills-protocol.md`](skills-protocol.md)。本文是把 skill upstream 的 **how-to**：写什么、如何本地运行、review 时我们会反馈什么。

Skill 是你无需写 framework code 就能给 Open Design 带来最大杠杆的贡献。一个文件夹、一个带 frontmatter 的 Markdown 文件、一个手写 example，picker 就能显示它。本指南带你从 `git clone` 走到 merged PR，并说明 skill PR 的门槛和常见退回模式。

如果你只有十秒钟，记住这张图：

> **把文件夹放到 `skills/` 下，重启 daemon，你的 skill 就会出现在 picker 中。本文剩下的部分都在讲如何让这个文件夹好到可以 merge。**

---

## 1. 30 分钟交付一个 skill — happy path

```bash
# 1. Fork & clone
git clone git@github.com:<your-username>/open-design.git
cd open-design
git checkout -b skill/<your-skill-name>

# 2. Bootstrap (Node 24, pnpm 10.33.x)
corepack enable
pnpm install

# 3. Copy the closest existing skill as a starting point
cp -r skills/dating-web skills/<your-skill-name>
# Edit skills/<your-skill-name>/SKILL.md — change name, description, triggers,
# rewrite the workflow body, replace example.html with your own hand-built sample.

# 4. Run the dev loop and verify the picker
pnpm tools-dev run web
# Open the URL it prints (typically http://127.0.0.1:5173).
# Switch to the mode you set in od.mode — see "Skill modes" below for the
# full list (Prototype / Deck / Template / Design system / Image / Video / Audio).
# Your skill's name should appear in the picker. Click it, send the example_prompt.

# 5. Open a PR
git add skills/<your-skill-name>
git commit -m "skills: add <your-skill-name>"
git push -u origin skill/<your-skill-name>
gh pr create --title "skills: add <your-skill-name>" --body "..."
```

这就是完整 loop。后续 sections 会深入解释每一步，并说明 PR 进入 review 后我们会看什么。

---

## 2. Skill 是什么，不是什么

Skill 是**生成某一种 artifact 的 recipe**。它不是 feature，不是 integration，也不是 marketing page。

**Yes：**
- “6–10 页、editorial typography 的 investor pitch deck” → deck-skill
- “带 stats、charts 和 community ticker 的 single-screen consumer dashboard” → prototype-skill
- “把 brief 填进 PM-spec template 的 populated copy” → template-skill
- “从 Linear 网站 sampled 出来的 `DESIGN.md`” → design-system-skill
- “由 script + b-roll prompts 生成的 9:16 short-form video reel” → video-skill
- “由一句 brief 生成的 square poster” → image-skill
- “由 mood description 生成的 30 秒 jingle” → audio-skill

**No：**
- 第三方 API wrapper（Stripe、Alipay、Slack API、GitHub API）。那是 feature；请走 agent / daemon path 提交，不要做成 skill。
- Model loader、vendor SDK bundle 或 “BYOK for `<provider>`”。OD 的判断是 “your existing CLI is enough”。
- Sponsor 或 product launch 的 brand-promotion bundle。Skills 是 reusable artifact recipes，不是 campaigns。
- 与现有 skill 只有边际差异的 duplicate。提交前先搜索 `skills/`，阅读最接近的 2–3 个 descriptions —— 如果你无法用一句话说清 differentiator，就把工作折叠进现有 skill。
- 唯一输出是 screenshot 或 video 的 skill。Artifact 必须是 agent 根据 prompt 生成的东西，而不是随 `assets/` ship 的 static asset。

**第三条路径：作为 external skill bundle 发布。** 如果你的 workflow 确实是 recipe（不是 daemon feature），但过于 vendor-specific 或 audience-narrow，不适合进 tree，skills protocol 支持通过 `~/.claude/skills/` 使用 user-global skills（见 [`skills-protocol.md` §3](skills-protocol.md#3-skill-discovery--precedence)）。把 bundle 作为 standalone repo 发布，用户就可以 `git clone` 或 `od skill add` 安装，而不需要我们承担 maintenance surface。这适合 payment-provider workflows、regional marketplace integrations、in-house design systems 等 —— 不是拒绝，只是不同的 distribution channel。

如果不确定 idea 是否合适，**先开 discussion**（[github.com/nexu-io/open-design/discussions](https://github.com/nexu-io/open-design/discussions)）—— 我们宁愿花 5 分钟 redirect，也不希望你花一周构建错误的东西。

---

## 3. Skill anatomy — 最小结构

```text
skills/<your-skill>/
├── SKILL.md                    # required — frontmatter + workflow
├── example.html                # required if od.preview.type is html or jsx — the hand-built sample
├── assets/                     # optional but typical — seed files the skill copies into the artifact
│   └── template.html
└── references/                 # optional — knowledge files the agent reads during planning
    ├── checklist.md            # required for merge — P0 gates the agent must pass
    ├── layouts.md
    └── components.md
```

### `SKILL.md` frontmatter cheat sheet

前三个 keys（`name`、`description`、`triggers`）来自 [Claude Code base spec](https://docs.anthropic.com/en/docs/claude-code/skills) —— 只靠这些，你的 skill 就能在 plain Claude Code 中工作。`od:` 下的所有字段都是 OD-specific 且可选，但 **`od.mode`** 决定 skill 出现在哪个分组下。

```yaml
---
name: your-skill
description: |
  One paragraph. The agent reads this verbatim to decide if the user's
  brief matches. Be concrete: surface, audience, what's in the artifact,
  what's not.
triggers:
  - "your trigger phrase"
  - "another phrase"
  - "中文触发词"

od:
  mode: prototype           # prototype | deck | template | design-system | image | video | audio
  platform: desktop         # desktop | mobile
  scenario: marketing       # free-form tag for grouping in the picker
  featured: 1               # any positive integer surfaces under "Showcase examples"
  preview:
    type: html              # html | jsx | pptx | markdown
    entry: index.html
  design_system:
    requires: true          # does the skill read the active DESIGN.md?
    sections: [color, typography, layout, components]
  example_prompt: "A copy-pastable prompt that nicely shows what this skill does."
---

# Your Skill

Free-form Markdown describing the workflow the agent should follow.
Numbered steps work well. Lift the format from skills/dating-web/SKILL.md
or skills/guizang-ppt/SKILL.md.
```

完整 grammar —— typed inputs、slider parameters（`od.parameters`）、capability gating（`od.capabilities_required`）、用于 cross-brand craft references 的 `od.craft.requires` —— 位于 [`skills-protocol.md`](skills-protocol.md)。交付 v1 不需要这些。

---

## 4. 本地运行

Tree 设置好后，只需要四条命令。

```bash
# 1. Bootstrap (only the first time, or after pulling main with manifest changes)
corepack enable
pnpm install

# 2. Run the daemon + web
pnpm tools-dev run web
# Note the URL it prints — usually http://127.0.0.1:5173 for web,
# http://127.0.0.1:7456 for daemon.

# 3. After editing SKILL.md, refresh the picker — the daemon re-scans skills/
#    on every /api/skills request, so reopening the picker (or refreshing the
#    web tab) picks up your edit without a restart. If frontmatter parsing
#    fails or the new skill never shows up, restart pnpm tools-dev run web
#    and check the daemon stderr for the parse error.

# 4. Verify your skill end-to-end:
#    - Switch to the mode you set in od.mode (Prototype / Deck / Template /
#      Design system / Image / Video / Audio)
#    - Find your skill in the picker
#    - Click it, paste the example_prompt
#    - Watch the artifact stream in the UI. This guide MUST NOT define daemon
#      data paths; read the root AGENTS.md section "Daemon data directory
#      contract" before changing or documenting artifact storage.
#    - Verify preview iframe renders correctly
#    - Verify export (PPTX / PDF) works if the mode supports it
```

如果 picker 没显示你的 skill，请检查 daemon stderr —— 最常见原因是 frontmatter 中的 YAML syntax error。Daemon log 会带 offending line。

开发 skill 不要求任何 agent CLI 在你的 `PATH` 上 —— daemon 会 fallback 到 **Anthropic API · BYOK** 路径，这也是最快的 dev loop。在 Settings 中设置一次 key，即可复用。

---

## 5. Merge bar — 打开 PR 前的 checklist

Skill PR 的门槛比 feature PR 更高，因为 skills 是 user-facing surface。下面每一项 reviewer 都会检查；先自查可以省掉来回沟通。

### Content

- [ ] **`example.html` 是手写的。** 能直接从磁盘打开，看起来像 designer 真的会交付的东西。没有 lorem ipsum，没有 `<svg><rect/></svg>` placeholder hero。如果你自己都构建不出 example，这个 skill 可能还没 ready。
- [ ] **Example 中没有 AI slop。** 没有 purple gradients、generic emoji icons（📊 💡 🚀）、带 left-border accent 的 rounded card、作为 *display* face 的 Inter、虚构 stats（“10× faster”、“users save 4 hours/week”）。完整清单见 README 的 **Anti-AI-slop machinery** section。
- [ ] **Honest placeholders。** 当 agent 没有真实数字时，skill body 应指示它写 `—` 或带 label 的 grey block，而不是编造。
- [ ] **存在 `references/checklist.md`**，且至少包含 P0 gates（agent 发出 `<artifact>` 前必须通过的规则）。可参考 [`skills/guizang-ppt/references/checklist.md`](../skills/guizang-ppt/references/checklist.md) 或 [`skills/web-prototype/references/checklist.md`](../skills/web-prototype/references/checklist.md)。
- [ ] **`example_prompt` 确实能运行。** 提交前本地端到端运行。如果你不愿意把这个 prompt 粘给陌生人 demo skill，就重写它。
- [ ] **Triggers 具体。** “design something cool” 不是 trigger。“investor pitch deck”、“saas landing page”、“约会应用” 才是。

### Shape

- [ ] **单个 self-contained folder + discoverable English display copy。** Skill 所需的一切都在 `skills/<your-skill>/` 下。该 folder 的 `SKILL.md` 必须包含 picker 消费的 English display fields —— 见下方 “i18n coverage”。同一个 PR 不要改 `apps/daemon/`、`packages/`、`tools/` 等。
- [ ] **No CDN imports**，除非其他 skills 已经使用。如果需要新的 font CDN、GSAP、three.js 等，请在 PR description 中提出。
- [ ] **没有大于约 250 KB 的 images。** 如果 example 真的需要 hero photo，先用 optimizer。不要提交 raw PNG screenshots。
- [ ] **没有未授权 fonts。** System font stack 永远安全；Google Fonts 和 Adobe Fonts free tier 也安全；其他字体需要在 `references/` 中附 license file。
- [ ] **Slug 是 ASCII、kebab-case。** `your-skill-name`，不是 `YourSkillName`、`your_skill_name` 或 `你的技能`。

### i18n coverage（每个 skill，而不只是 featured）

`e2e/tests/localized-content.test.ts` 会强制每个包含 `SKILL.md` 的 `skills/` 子目录可 discover，并能在 de / ru / fr 中 display。Locales 有 translated copy 时使用翻译；否则从 `SKILL.md` 中的 English source fields 派生 runtime fallback。

对 non-featured skill，便宜路径是保持 source metadata 完整：

- [ ] **确保 `SKILL.md` 有完整 English display copy**：title/name、description、example prompt，以及 skill schema 需要的任何 picker metadata。Localized runtime 使用这些字段作为 fallback display path。
- [ ] **有用时使用 optional localized display fields**：`en_name` / `zh_name`、`en_description` / `zh_description`、以及 `od.example_prompt_i18n.<locale>`。保持 `description` 与 `od.example_prompt` 为 English，因为它们是所有没有 localized copy 的 locale fallback fields。
- [ ] **本地运行 `pnpm --filter @open-design/web test` 和 `pnpm --filter @open-design/e2e test tests/localized-content.test.ts`** 后再 push。这些 suites 会捕获无法 display 的 discovered resources，并验证 localized fallback behavior。

### Featured skills（可选路径）

如果设置 `od.featured: 1`，还要：

- [ ] **添加 screenshot** 到 `docs/screenshots/skills/<skill>.png`。PNG，约 1024×640 retina，从真实 `example.html` 在 zoomed-out browser scale 下 capture。
- [ ] **可选地在 `content.ts`（DE）、`content.fr.ts`（FR）、`content.ru.ts`（RU）中添加完整 localized display copy** —— title、summary、scenario tag。Picker 中的 featured row 会在存在时使用这些 copy；默认 fallback path 会在所有地方渲染 English。

### Forking

如果 fork 现有 skill（例如从 `dating-web` remix 成 `recruiting-web`），请在 `references/` 中保留原 LICENSE 和 authorship，并在 PR description 中说明。

---

## 6. PR description template

把这段复制到 PR body 并填好。Reviewers 第一次看 PR 时，80% 时间都在检查这个 template。

```markdown
## Skill: <name>

**Mode:** prototype | deck | template | design-system | image | video | audio
**Platform:** desktop | mobile
**Surface:** one sentence on what artifact this produces

## What it produces
- Brief description of the artifact shape (sections, layout, expected content density)
- Link to the `example.html` rendered output (if you've put it on a gist or pages)

## Triggers
List the trigger phrases. Pick ones you'd actually expect a user to type.

## Why this isn't covered by an existing skill
Search `skills/` first. Name the closest 2 and explain in one sentence each why
they don't cover this case. If you can't, fold into the existing skill instead.

## Validation
- [ ] Ran `pnpm tools-dev run web` and verified the skill appears in the picker
- [ ] Sent the `example_prompt` end-to-end and confirmed the artifact rendered
- [ ] Verified export works (PPTX / PDF / etc.) if the mode supports it
- [ ] Ran `pnpm typecheck`
- [ ] Verified `SKILL.md` has complete English display copy for localized fallback — **required for every skill**
- [ ] Ran `pnpm --filter @open-design/web test` and `pnpm --filter @open-design/e2e test tests/localized-content.test.ts`; localized-content coverage is green

## Screenshot
(Required if `od.featured` is set. Otherwise nice-to-have.)

## Forked from
(Only if applicable. Name the source skill and the LICENSE you preserved.)
```

---

## 7. 我们关闭 skill PR 的常见原因

这能帮你少浪费一周。下面每种模式都曾是近期 PR 的 close reason —— 写下来是为了让下一个人不用撞同一堵墙。

- **Sponsor / promo / brand-campaign content。** 一个名为 “Phantom Motion V8.0 Engine” 的 skill，`assets/` 里带 `sponsor-qrcode.png`，README 里放 marketing copy —— 那是广告，不是贡献。我们会直接关闭。
- **Vendor API integration packaged as a skill。** Payment provider integration、marketplace API、vendor SDK wrappers —— 即使 workflow 真实存在，这也是 feature，不是 skill。请作为 daemon PR 打开，并在 `packages/contracts` 中做 proper API contract changes。
- **与现有 skill 只有边际差异的 duplicate。** “Add Trading Terminal X” 但 “Trading Terminal Y” 已存在时，这是 fork-or-fold-in decision，不是新 skill PR。请在 description 中明确 differentiator。
- **同一个 PR 中有更宽的 repo edits。** 一个 skill PR 同时 bump `package.json`、修改 `types.ts`、regenerate locale files 或 touch `apps/daemon/`，至少应拆成两个 PR。Skill PR 快速合并是因为它们小 —— 请保持小。
- **Stale rebase artefacts。** 如果你只是加 Turkish，`types.ts` 却增长 1000+ 行，那是 rebase 出错，不是 i18n addition。请从 main reset 该文件，只保留有意改动。
- **`example.html` 中有 Lorem ipsum。** Example 是 skill 的 marketing material。有 placeholder text 说明 skill 还没 ready。
- **AI-slop visuals。** Purple-to-pink gradients、三条彩色 squiggles 的 hero、card 中 64px 的 `Inter`、`border-l-4 border-violet-500` accent —— README 的 anti-slop list 是有原因的。第一轮就会退回。
- **不会触发的 triggers。** “creative project”、“modern design”、“beautiful page” 无法 disambiguate；它们什么都能匹配。Triggers 应具体到 planner 知道什么时候**不**该选你的 skill。

---

## 8. References

### 值得模仿的 Skills

挑与你 idea 最接近的一个，先读它的 `SKILL.md` body，再写自己的。

- **Visual showcase, single-screen prototype:** [`skills/dating-web/`](../skills/dating-web/), [`skills/digital-eguide/`](../skills/digital-eguide/)
- **Multi-frame mobile flow:** [`skills/mobile-onboarding/`](../skills/mobile-onboarding/), [`skills/gamified-app/`](../skills/gamified-app/)
- **Document / template (no design system required):** [`skills/pm-spec/`](../skills/pm-spec/), [`skills/weekly-update/`](../skills/weekly-update/)
- **Deck mode:** [`skills/guizang-ppt/`](../skills/guizang-ppt/)（从 [op7418/guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) 原样 bundled）和 [`skills/simple-deck/`](../skills/simple-deck/)
- **Media skills (image / video / audio):** [`skills/image-poster/`](../skills/image-poster/), [`skills/video-shortform/`](../skills/video-shortform/), [`skills/audio-jingle/`](../skills/audio-jingle/)

### Spec & supporting docs

- [`skills-protocol.md`](skills-protocol.md) — 完整 frontmatter grammar、discovery & precedence rules、mode semantics、craft references、testing primitives
- [`architecture.md`](architecture.md) — daemon ↔ web ↔ skill registry data flow
- [`modes.md`](modes.md) — Prototype / Deck / Template / Design system 对 runtime 的实际含义
- [`../CONTRIBUTING.md`](../CONTRIBUTING.md) — broader project 的 code style、commit conventions、“what we don't accept”

### Upstream

- [Claude Code `SKILL.md` convention](https://docs.anthropic.com/en/docs/claude-code/skills) — base format
- [`VoltAgent/awesome-design-md`](https://github.com/VoltAgent/awesome-design-md) — product design systems 的 upstream registry（大多数 `design-systems/` PR 应投到那里，而不是这里）
- [Anti-AI-slop checklist](../README.md) — main README 中的 section；请把规则 lift 到你的 `references/checklist.md`

---

## License

贡献 skill 即表示你同意你的贡献按本 repository 的 [Apache-2.0 License](../LICENSE) 授权；[`skills/guizang-ppt/`](../skills/guizang-ppt/) 内的文件例外，它们保留原 MIT license 以及 [op7418](https://github.com/op7418) 的 authorship attribution。
