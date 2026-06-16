# Skills Protocol

**父文档：** [`spec.md`](spec.md) · **同级文档：** [`skills-contributing.md`](skills-contributing.md) · [`architecture.md`](architecture.md) · [`agent-adapters.md`](agent-adapters.md) · [`modes.md`](modes.md)

> 想把一个 skill 发到 upstream，而不是阅读协议 spec？请看 [`skills-contributing.md`](skills-contributing.md)：quick start、merge bar、PR template、common rejections 都在那里。本文档定义 **what**（frontmatter 语法、发现规则、mode 语义）；那份文档说明 **how**（从 clone 到 merged PR）。

**Skill** 是 OD 中设计能力的原子单元。我们原样采用 Claude Code 的 `SKILL.md` 约定作为基础格式，然后增加一些可选字段，用于设计相关能力（preview type、input schema、slider parameters）。为纯 Claude Code 编写的 skill 可以在 OD 中运行。不使用 OD 扩展的 OD skill 也可以在纯 Claude Code 中运行。

> **兼容性承诺：** 像 [`guizang-ppt-skill`](https://github.com/op7418/guizang-ppt-skill) 这样的 skill 可以在 OD 中**无需修改**地工作。只要放进 `~/.claude/skills/`，OD 就会发现它。

---

## 1. Base format（与 Claude Code 保持一致）

每个 skill 至少是一个包含 `SKILL.md` 的目录：

```text
<skill-root>/
├── SKILL.md              # manifest + workflow instructions
├── assets/               # templates, images, boilerplate the skill writes
│   └── …
└── references/           # knowledge files the skill reads during planning
    ├── components.md
    ├── layouts.md
    └── …
```

`SKILL.md` front-matter（YAML）：

```yaml
---
name: magazine-web-ppt
zh_name: "杂志风网页 PPT"
en_name: "Magazine Web PPT"
description: |
  Magazine-style horizontal-swipe web deck.
  Trigger keywords: 杂志风 PPT, magazine deck, swipe slides.
zh_description: "杂志风横向翻页网页 PPT。"
en_description: |
  Magazine-style horizontal-swipe web deck.
  Trigger keywords: 杂志风 PPT, magazine deck, swipe slides.
triggers:
  - "magazine deck"
  - "杂志风 PPT"
  - "horizontal swipe presentation"
---
```

正文是自由 Markdown，描述 agent 应遵循的 workflow，通常是带原则说明的编号步骤列表。[guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) 就是这种形态。

**OD 会原样读取所有这些内容。** 不需要任何改动。

## 2. OD extensions（可选）

Skills 可以声明额外 front-matter 字段，以解锁 OD 专属 UI。所有字段都是可选的；缺失时回退到合理默认值。

```yaml
---
name: magazine-web-ppt
description: …
triggers: […]

# --- OD extensions below this line ---

od:
  mode: deck                        # one of: prototype | deck | template | design-system
  preview:
    type: html                      # html | jsx | pptx | markdown
    entry: index.html               # relative path produced by the skill
    reload: debounce-100            # how the preview refreshes
  example_prompt: "Create a magazine-style web deck from my content."
  example_prompt_i18n:
    zh-CN: "用杂志风网页 PPT 模板把我的内容做成横向翻页 deck。"
  design_system:
    requires: true                  # this skill reads the active DESIGN.md
    sections: [color, typography]   # which sections it actually uses (for prompt pruning)
  craft:                            # universal, brand-agnostic craft references
    requires: [typography, color, anti-ai-slop]
  inputs:                           # typed inputs the user can fill in the UI
    - name: title
      type: string
      required: true
    - name: slide_count
      type: integer
      default: 8
      min: 4
      max: 20
    - name: theme
      type: enum
      values: [editorial, minimal, brutalist, dark-glass, warm]
      default: editorial
  parameters:                       # live-tweakable sliders after first generation
    - name: accent_hue
      type: hue                     # hue | spacing | font-scale | opacity
      default: 18
      range: [0, 360]
    - name: section_spacing
      type: spacing
      default: 48
      range: [16, 128]
  outputs:
    primary: index.html
    secondary: [slides.json]        # for PPTX export
  capabilities_required:
    - surgical_edit                 # comment mode needs this
    - file_write
---
```

### 2.1 OD 如何使用每个字段

| Field | Used by |
|---|---|
| `zh_name` / `en_name` | 本地化 picker title；fallback 到 `name` |
| `zh_description` / `en_description` | 本地化 picker description；fallback 到 `description` |
| `od.mode` | routing（skill 出现在哪个 mode picker 下） |
| `od.preview.type` | 选择正确 iframe renderer |
| `od.example_prompt` | picker CTA 使用的英文 fallback starter prompt |
| `od.example_prompt_i18n` | 本地化 starter prompt map（例如 `zh-CN`） |
| `od.design_system.requires` | 是否注入 `DESIGN.md` |
| `od.design_system.sections` | 只注入相关 DESIGN.md sections（节省 tokens） |
| `od.craft.requires` | 要注入哪些 brand-agnostic `craft/<slug>.md` references（例如 `typography`、`color`、`anti-ai-slop`）；注入位置在 DESIGN.md 与 skill body 之间 |
| `od.inputs` | 在 sidebar 渲染 typed form，而不是只有 free-text |
| `od.parameters` | 渲染 live sliders，变化时重新 prompt |
| `od.outputs.primary` | iframe 加载哪个文件 |
| `od.outputs.secondary` | export pipelines 读取哪些文件（例如 PPTX 读取 `slides.json`） |
| `od.capabilities_required` | gating：如果 active agent 缺少 surgical edit，则该 skill 的 comment mode 被禁用 |

### 2.2 如果 skill 完全省略 `od:`

默认值：

- `mode`：根据 name/description 推断（best-effort keyword match），否则为 `prototype`
- `preview.type`：嗅探 `*.html` → html、`*.jsx` → jsx，否则为 `markdown`
- `preview.entry`：第一个匹配嗅探类型的文件
- `design_system.requires`：如果 skill body 提到 “design system” 或 “DESIGN.md”，则为 true
- `inputs`、`parameters`：无（只使用 free-text prompt）

目标是：现有 Claude Code skills **zero-config compatibility**。

## 3. Skill discovery & precedence

Daemon 的 skill registry 扫描三个位置：

| Location | Priority | Purpose |
|---|---|---|
| `./.claude/skills/` | 1（最高） | project-private skills，不提交 |
| `./skills/` | 2 | project-committed skills |
| `~/.claude/skills/` | 3 | user-global skills |

同名 `name` 冲突时，高优先级位置胜出。开发模式下用 `chokidar` watch 所有位置，生产模式下收到 `SIGHUP` 时重新扫描。

### Symlink strategy（借鉴 [cc-switch](https://github.com/farion1231/cc-switch)）

`cc-switch` 维护一个 central skill dir，并 symlink 到每个 agent 预期的位置（`~/.claude/skills/`、`~/.codex/skills/` 等）。OD 可以选择采用同一模型，但本协议不得定义 Open Design daemon data paths。修改或记录任何 Open Design-owned storage location 前，先阅读根目录 `AGENTS.md` 的 **Daemon data directory contract** section。

一次安装 → 每个 agent 都能看到该 skill。这是可选机制；只使用一个 agent 的用户不需要它。

## 4. Skill types（按 mode）

每种 mode 期待的 skill shape 略有不同。必需 outputs 和预期 workflow 也不同。

### 4.1 `prototype-skill`

- **Purpose:** 单屏交互式 prototype。
- **Preview:** `html` 或 `jsx`。
- **Primary output:** `index.html` 或 `Prototype.jsx`。
- **Typical workflow:** clarify brief → resolve design tokens → write component tree → write file。
- **Example skills:** `saas-landing`、`dashboard`、`login-flow`、`empty-states`。

### 4.2 `deck-skill`

- **Purpose:** 多页 presentation。
- **Preview:** `html`（带页面内导航的单文件 deck）。
- **Primary output:** `index.html`。
- **Secondary output:** `slides.json`（用于 PPTX export）。
- **Typical workflow:** clarify topic + slide count → pick theme → populate slides from layout catalog → self-check against quality rubric。
- **Reference implementation:** [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)，v1 可基于它 fork。

### 4.3 `template-skill`

- **Purpose:** 从预构建 artifact 开始；agent 只个性化内容，不从零设计。
- **Preview:** 继承 template bundle（通常为 `html`）。
- **Primary output:** 填充后的 template 副本。
- **Typical workflow:** copy `assets/template/` to artifact dir → replace content placeholders → optionally tweak tokens to match design system。
- **Why separate from `prototype-skill`:** 更快（不做 design decisions），质量下限更高，但上限更低。

### 4.4 `design-system-skill`

- **Purpose:** 根据 inputs（brand brief、screenshot、URL）生成 `DESIGN.md`。
- **Preview:** `markdown`（渲染生成的 DESIGN.md，并带 sample-components preview）。
- **Primary output:** `DESIGN.md`。
- **Typical workflow:** analyze input → draft 9 sections per awesome-claude-design schema → generate sample component preview → finalize。
- **Post-run:** OD 提示用户把这份 DESIGN.md 设置为 project 的 active design system。

## 5. DESIGN.md 作为 skill context

所有非 design-system skill（mode 1–3）都可以消费 active `DESIGN.md`。OD 会这样注入它：

1. **System-prompt prefix**（按 `od.design_system.sections` 只注入必需 sections）。
2. **CWD 中可用文件**，命名为 `DESIGN.md`，skills 可通过自己的 agent 直接 `Read` 它。
3. **Template variable** `{{ design_system }}`，如果 skill body 用 Mustache-style 引用它。

9-section DESIGN.md format **不是 OD 发明的**；它来自 [awesome-claude-design](https://github.com/VoltAgent/awesome-claude-design) 约定。为方便阅读，复制如下：

```markdown
# <Brand Name>

## Visual Theme & Atmosphere
## Color Palette & Roles
## Typography Rules
## Component Stylings
## Layout Principles
## Depth & Elevation
## Do's and Don'ts
## Responsive Behavior
## Agent Prompt Guide
```

示例：[`docs/examples/DESIGN.sample.md`](examples/DESIGN.sample.md)。

## 5.5 Craft references (`craft/`)

一些 craft knowledge 是**通用的**，与品牌无关。ALL CAPS 总是需要 ≥0.06em letter-spacing；`var(--accent)` 每屏最多出现 2 次；`#6366f1` 总是 AI-default tell。这些规则不属于任何单一 `DESIGN.md`，因为它们横跨所有品牌。

OD 把它们作为第三个轴发布在 `<projectRoot>/craft/`：

```text
craft/
├── README.md
├── typography.md
├── color.md
└── anti-ai-slop.md
```

Skill 通过列出所需 slugs 来 opt in：

```yaml
od:
  craft:
    requires: [typography, color, anti-ai-slop]
```

Compose 时的解析流程：

1. `apps/daemon/src/skills.ts` 从 front-matter 读取 `od.craft.requires`，并把它暴露在 skill record 上。
2. `apps/daemon/src/craft.ts` 从 `CRAFT_DIR` 读取每个 `<slug>.md`。缺失文件会静默丢弃；skill 可以在我们正式发布 `craft/motion.md` 前 forward-reference 它。Canonical slug list 和静默 fallback 的理由见 [`craft/README.md`](../craft/README.md)。
3. `apps/daemon/src/prompts/system.ts` 把拼接后的 craft body 注入到 active DESIGN.md 与 skill body **之间**。冲突时 DESIGN.md 中的 brand tokens 优先；craft rules 覆盖 DESIGN.md 未覆盖的部分。

这种拆分让 DESIGN.md 作者不必重复 universal craft，也让 craft 作者不被 brand-specific drift 干扰。

## 6. Skill installation

```sh
od skill add https://github.com/op7418/guizang-ppt-skill
# → installs into daemon-managed storage; read root AGENTS.md -> "Daemon data directory contract" before documenting paths
# → symlinks into ~/.claude/skills/ (and any other active agent dirs)
# → re-indexes registry

od skill add ./path/to/my-skill
# → symlinks local dir (no copy) into skills registry

od skill list
# → table: name, mode, source, agent compatibility

od skill remove <name>
# → unlinks; does not delete the source
```

## 7. Worked example：在 OD 中运行 `guizang-ppt-skill`

该 skill 保持不变。完整路径如下：

1. User: `od skill add https://github.com/op7418/guizang-ppt-skill`
2. Registry 为它建立索引。Front-matter 中没有 `od:` block → 应用默认值：
   - `mode`：从 body 中提到 “PPT” 推断为 `deck`。
   - `preview.type`：从 `assets/template.html` 嗅探为 `html`。
   - `preview.entry`：`index.html`（约定）。
   - `design_system.requires`：false（skill body 没提到 DESIGN.md）。
3. 用户在 Web UI 中切换到 `deck` mode；该 skill 出现在 skill picker 中。
4. 用户输入：“给我做一份杂志风 8 页投资人 PPT”。
5. Daemon dispatch 到 active agent（Claude Code），附带：
   - system message: skill 的 `SKILL.md` body
   - cwd: daemon-managed artifact workspace。本协议不得定义 daemon data paths；修改或记录 artifact storage 前，先阅读根目录 `AGENTS.md` -> **Daemon data directory contract**。
   - 已放入 cwd 的文件：`template.html`（来自 skill 的 `assets/`）
6. Agent 运行自己的 6-step workflow（clarify → copy template → populate → self-check → preview → refine）。
7. OD 把 agent 的 tool calls 流式转换为 UI events；artifact dir 持续增长。
8. Agent signal done；daemon 把 preview iframe 设置为 `index.html`。
9. 用户点击 “Export PPTX”：export pipeline 发现该 skill 没有 `slides.json` output（upstream skill 不生成它）。OD fallback 到 “print to PDF then page-to-slide PPTX”，效果更粗糙但可用。这是按 skill 记录的已知限制。

## 8. Writing a new skill：最小示例

```text
saas-landing-skill/
├── SKILL.md
└── assets/
    └── base.html
```

```markdown
---
name: saas-landing
description: |
  Produce a single-page SaaS landing with hero, features, social proof, pricing, CTA.
  Trigger: "saas landing", "marketing page", "product landing".
triggers:
  - "saas landing"
  - "marketing page"
od:
  mode: prototype
  preview:
    type: html
    entry: index.html
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
  parameters:
    - name: hero_density
      type: spacing
      default: 96
      range: [48, 200]
---

# Workflow

1. Read DESIGN.md from cwd. Adopt its color/typography/layout rules.
2. Copy `assets/base.html` to `index.html` in cwd.
3. Fill sections: hero, features (3–6), social proof, pricing (if `has_pricing`), CTA, footer.
4. Inline all CSS. Use system font stack as fallback if DESIGN.md typography fails to load.
5. Respect `hero_density` parameter as the hero section's vertical padding in px.
6. Write `index.html`. Done.
```

## 9. Testing skills

Skill 可以附带可选 test inputs，供 OD 在 CI 中使用：

```text
<skill-root>/
└── tests/
    ├── basic.prompt
    ├── basic.expected.manifest.json   # assertions: files produced, preview.type, etc.
    └── basic.expected.regex.txt       # text regex assertions against the primary output
```

`od skill test <name>` 会用便宜 model（例如 Haiku 4.5）针对每个 case 运行该 skill，并对 manifest + regex 做断言。保真度不高，但能抓结构性 regressions。

## 10. Open questions

- **Skill signing。** 能否验证 skill 在 publish 与 install 之间未被篡改？最简单答案：`od skill add` 记录 git commit SHA；reinstall-on-update 在 signature 变化时 warning。推迟到 v1。
- **Skill composition。** `prototype-skill` 能不能调用 `deck-skill` 生成 sub-artifact？v1 不支持；skills 是 leaf-level。Composition 需要 meta-skill 概念，目前仍属 speculative。
- **Parameter stability。** Slider 变化时，agent 应该 re-plan 还是只 re-render？倾向：re-render（fast path），并为较大变化提供 “also re-plan” 按钮。
