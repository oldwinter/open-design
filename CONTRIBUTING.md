# 贡献指南 · Contributing to Open Design

谢谢你愿意参与贡献。OD 有意保持小巧：大部分价值存在于**文件**中（skills、design systems、prompt fragments），而不是框架代码里。这意味着最高杠杆的贡献通常只是一个文件夹、一份 Markdown 文件，或一个 PR 规模的 adapter。

这份指南会明确告诉你：每类贡献该看哪里，以及 PR 合并前必须达到什么标准。

<p align="center"><a href="https://github.com/nexu-io/open-design/blob/main/CONTRIBUTING.md">English</a> · <a href="docs/i18n/CONTRIBUTING.pt-BR.md">Português (Brasil)</a> · <a href="docs/i18n/CONTRIBUTING.de.md">Deutsch</a> · <a href="docs/i18n/CONTRIBUTING.fr.md">Français</a> · <b>简体中文</b> · <a href="docs/i18n/CONTRIBUTING.ja-JP.md">日本語</a></p>

---

## 一个下午就能交付的三件事

| 如果你想…… | 你其实在添加 | 放在哪里 | 交付体量 |
|---|---|---|---|
| 让 OD 渲染一种新的 artifact（一张发票、一个 iOS Settings 页面、一份 one-pager……） | 一个 **Skill** | [`skills/<your-skill>/`](skills/) | 一个文件夹，约 2 个文件 |
| 让 OD 说一种新品牌的视觉语言 | 一个 **Design System** | [`design-systems/<brand>/DESIGN.md`](design-systems/) | 一个 Markdown 文件 |
| 接入一个新的 coding-agent CLI | 一个 **Agent adapter** | [`apps/daemon/src/agents.ts`](apps/daemon/src/agents.ts) | 一个数组里约 10 行 |
| 添加功能、修 bug、从 [`open-codesign`][ocod] 借鉴一个 UX 模式 | 代码 | `apps/web/src/`、`apps/daemon/` | 普通 PR |
| 改进文档、把章节移植到 Français / Deutsch / 中文、修 typo | docs | `README.md`、`docs/i18n/README.fr.md`、`docs/i18n/README.de.md`、`docs/i18n/README.zh-CN.md`、`docs/`、`QUICKSTART.md` | 一个 PR |

如果你不确定自己的想法属于哪一类，请[先开 discussion / issue](https://github.com/nexu-io/open-design/issues/new)，我们会帮你指向正确 surface。

---

## 本地设置

完整的一页式设置说明在 [`QUICKSTART.md`](QUICKSTART.md)。给贡献者的 TL;DR：

```bash
git clone https://github.com/nexu-io/open-design.git
cd open-design
corepack enable           # 选择 packageManager 固定的 pnpm
pnpm install
pnpm tools-dev run web    # daemon + web 前台循环
pnpm typecheck            # tsc -b --noEmit
pnpm --filter @open-design/web build  # 需要时构建 web package
```

需要 Node `~24` 和 pnpm `10.33.x`。`nvm` / `fnm` 是可选工具；如果你喜欢用它们管理 Node，可运行 `nvm install 24 && nvm use 24` 或 `fnm install 24 && fnm use 24`。macOS、Linux、WSL2 是主要路径。Windows 原生也受支持；常见设置问题请参阅 [`docs/windows-troubleshooting.md`](docs/windows-troubleshooting.md)。

## Docker 设置

无需安装 Node.js 或 pnpm，也可以运行 Open Design。

### 前置条件

确保已安装带 Compose v2 的 Docker Desktop：

```bash
docker compose version
```

### 启动 Open Design

```bash
cd deploy
docker compose up -d
```

在浏览器中打开：

```text
http://localhost:7456
```

### 常用命令

```bash
# 查看日志
docker compose logs -f

# 重启容器
docker compose restart

# 停止容器
docker compose down

# 拉取最新镜像
docker compose pull
docker compose up -d
```

### 可选环境覆盖

创建 `deploy/.env` 文件：

```env
OPEN_DESIGN_PORT=7456
OPEN_DESIGN_MEM_LIMIT=384m
OPEN_DESIGN_ALLOWED_ORIGINS=https://yourdomain.com
OPEN_DESIGN_IMAGE=docker.io/vanjayak/open-design:latest
```

> 项目和数据库数据会使用 Docker volume 自动持久化。

完整 Docker 指南和高级配置请参阅 `QUICKSTART.md`。

---

## 添加一个新 Skill

Skill 是 [`skills/`](skills/) 下的一个文件夹，根目录包含 `SKILL.md`，遵循 Claude Code 的 [`SKILL.md` convention][skill]，再加上我们可选的 `od:` 扩展。**无需注册步骤。** 放入文件夹、重启 daemon，picker 就会显示它。

### → 完整指南见 [`docs/skills-contributing.md`](docs/skills-contributing.md)

那份文档会带你走完：

- **Quick start**：clone → 复制最接近的现有 skill → 运行 `pnpm tools-dev run web` → 在 picker 中看到它 → 打开 PR。
- **What a skill IS / IS NOT**：如果你的想法其实是 feature 或 vendor integration，这一节能帮你省下一周。
- **Skill anatomy**：最小文件夹布局和 `SKILL.md` frontmatter 速查。
- **Running locally**：真正重要的四条命令。
- **Merge bar**：reviewer 会检查的所有事项，可直接复制粘贴成 checklist。
- **PR description template**：粘到 PR body 里填空即可。
- **Common rejection patterns**：近期 close 过的原因，附具体例子。

协议 spec（完整 frontmatter 语法：typed inputs、slider parameters、craft references、testing primitives）单独放在 [`docs/skills-protocol.md`](docs/skills-protocol.md)。

---

## 添加一个新 Design System

Design system 是 `design-systems/<slug>/` 下的一个 [`DESIGN.md`](design-systems/README.md) 文件。**一个文件，无需代码。** 放进去、重启 daemon，picker 就会按 category 显示它。

### Design system 文件夹布局

```text
design-systems/your-brand/
└── DESIGN.md
```

### `DESIGN.md` 形态

```markdown
# Design System Inspired by YourBrand

> Category: Developer Tools
> One-line summary that shows in the picker preview.

## 1. Visual Theme & Atmosphere
…

## 2. Color
- Primary: `#hex` / `oklch(...)`
- …

## 3. Typography
…

## 4. Spacing & Grid
## 5. Layout & Composition
## 6. Components
## 7. Motion & Interaction
## 8. Voice & Brand
## 9. Anti-patterns
```

9-section schema 是固定的，因为 skill body 会 grep 这些内容。第一个 H1 会成为 picker label（`Design System Inspired by` 前缀会自动剥离），`> Category: …` 行决定它归入哪一组。现有 category 列在 [`design-systems/README.md`](design-systems/README.md)；如果你的品牌真的放不进现有类别，可以新增一个，但**优先尝试现有 category**。

### 合并新 design system 的标准

1. **9 个 section 都必须存在。** 对难以查到的数据（例如 motion token），空 section body 可以接受，但 heading 必须存在，否则 prompt grep 会断。
2. **Hex code 必须真实。** 直接从品牌网站或产品取样，不要凭记忆或 AI 猜。README 中的 “brand-spec extraction” 5-step protocol 对 maintainer 也适用。
3. **Accent color 提供 OKLch 值是加分项。** 这能让 palette 在 light/dark 之间可预测地 lerp。
4. **不要营销废话。** 品牌 tagline 不是 design token。删掉。
5. **Slug 使用 ASCII**：`linear.app` 写成 `linear-app`，`x.ai` 写成 `x-ai`。已导入的 69 套系统都遵循这个约定，请照做。

我们内置的 69 套产品系统来自 [`VoltAgent/awesome-design-md`][acd2]，通过 [`scripts/sync-design-systems.ts`](scripts/sync-design-systems.ts) 导入。如果你的品牌更适合进 upstream，**请先把 PR 发到那里**，我们会在下一次 sync 时自动带过来。`design-systems/` 文件夹用于放不适合 upstream 的系统，以及两套手写 starter。

---

## 添加一个新的 coding-agent CLI

接入新 agent（例如某个新团队的 `foo-coder` CLI）只是在 [`apps/daemon/src/agents.ts`](apps/daemon/src/agents.ts) 中加一项：

```javascript
{
  id: 'foo',
  name: 'Foo Coder',
  bin: 'foo',
  versionArgs: ['--version'],
  buildArgs: (prompt) => ['exec', '-p', prompt],
  streamFormat: 'plain',           // or 'claude-stream-json' if it speaks that
}
```

就是这样。Daemon 会在 `PATH` 上检测到它，picker 会显示它，chat path 也会工作。如果该 CLI 会输出**类型化事件**（类似 Claude Code 的 `--output-format stream-json`），请在 [`apps/daemon/src/claude-stream.ts`](apps/daemon/src/claude-stream.ts) 中接入 parser，并把 `streamFormat` 设为 `'claude-stream-json'`。

合并标准：

1. **新 agent 真实端到端跑通一次**：把 daemon log 粘到 PR 描述里，证明它流式输出了 artifact。
2. **更新 `docs/agent-adapters.md`**：写清 CLI 的 quirks（是否需要 key file？是否支持 image input？非交互 flag 是什么？）。
3. **README 的 “Supported coding agents” 表增加一行。**

---

## 更新 model `max_tokens` 元数据

API-mode chat 每次请求都会向 upstream provider 发送 `max_tokens`。Web client 会通过 [`apps/web/src/state/maxTokens.ts`](apps/web/src/state/maxTokens.ts) 中的三层 lookup 选择该数字：

1. 如果用户在 Settings 中显式设置了 override，则使用它。
2. 否则使用 [`apps/web/src/state/litellm-models.json`](apps/web/src/state/litellm-models.json) 中的 per-model default；这是 [BerriAI/litellm][litellm] 的 `model_prices_and_context_window.json`（MIT）的一份 vendored slice，覆盖约 2k 个 chat model，横跨 Anthropic、OpenAI、DeepSeek、Groq、Together、Mistral、Gemini、Bedrock、Vertex、OpenRouter 等。
3. 否则使用 `FALLBACK_MAX_TOKENS = 8192`。

如需接入新发布的 model，请重新生成 vendored JSON：

```bash
node --experimental-strip-types scripts/sync-litellm-models.ts
```

该脚本会抓取 LiteLLM catalog，筛选 `mode: 'chat'` 条目，将每条投影到 `max_output_tokens`（或 fallback 到 `max_tokens`），并写入排序后的 snapshot。请把重新生成的 `litellm-models.json` 与触发刷新需求的 PR 一起提交。

`maxTokens.ts` 中的 OVERRIDES table 只用于 LiteLLM 缺失或错误的少数 model id，例如 `mimo-v2.5-pro`（LiteLLM 只通过 `openrouter/xiaomi/...` 和 `novita/xiaomimimo/...` alias 提供 MiMo，而它们不匹配小米 direct API 使用的 canonical id）。保持这张表很小；凡是 LiteLLM 已经正确覆盖的内容，都应该回到 upstream。

[litellm]: https://github.com/BerriAI/litellm

---

## Localization maintenance

德语使用正式的 `Sie`，因为 OD 面向 solo creators、agencies 和 engineering teams 的混合受众；除非项目反馈证明非正式 `du` 更合适，否则正式德语是最不意外的默认选择。Locale PR 应翻译 UI chrome、核心 docs，以及 `apps/web/src/i18n/content.ts` 中仅用于展示的 gallery metadata，但不应翻译 agents 会执行的 `skills/`、`design-systems/` 或 prompt bodies。这些 source prompts 作为 workflow inputs 维护，保持单一源语言可以避免在多个 locale 中重复 prompt QA。新增或重命名 skill、design system 或 prompt template 时，请更新 German display metadata 并运行 `pnpm --filter @open-design/web test`；如果 German display coverage 漂移，`content.test.ts` 会失败。Daemon errors、export filenames、agent-generated artifact text 是已知限制，除非某个 PR 明确把它们纳入 scope。

添加新 locale 的分步说明（UI dictionary、README、language switcher、regional terminology）见 [`TRANSLATIONS.md`](TRANSLATIONS.md)。

---

## 代码风格

我们不在格式上吹毛求疵（保存时跑 Prettier 没问题），但有两条不能违反，因为它们会出现在 prompt stack 和 user-facing API 中：

1. **JS/TS 使用单引号。** 字符串使用单引号，除非转义会很难看。代码库已经保持一致，请匹配现有风格。
2. **代码注释使用英文。** 即便 PR 是把某些内容翻译成 Deutsch 或中文，代码注释也保持英文，这样才能维护一套可 grep 的引用。

除此之外：

- **不要叙述式注释。** 不要写 `// import the module`，也不要写 `// loop through items`。如果代码本身已经清楚，注释就是噪音。把注释留给非显而易见的意图，或代码无法表达的约束。
- **`apps/web/src/` 使用 TypeScript。** Daemon（`apps/daemon/`）是 plain ESM JavaScript，类型重要时使用 JSDoc，请保持这个方向。
- **不要随意添加新的 top-level dependency**，除非 PR 描述中有一段说明：我们得到了什么，以及多发了多少 bytes。[`package.json`](package.json) 的依赖列表有意保持很小。
- **push 前运行 `pnpm typecheck`。** CI 会运行它；失败会收到 “please fix” comment。

---

## Commits & pull requests

- **一个 PR 只做一件事。** 添加 skill、重构 parser、升级 dependency 是三个 PR。
- **标题使用祈使语气 + scope。** `add dating-web skill`、`fix daemon SSE backpressure when CLI hangs`、`docs: clarify .od layout`。
- **使用 PR template。** 填完 [`.github/pull_request_template.md`](.github/pull_request_template.md) 的每个 section：Why、What users will see、Surface area、Screenshots（如涉及 UI）、Bug fix verification（如为 bug fix）、Validation。空 section 会收到 “please fill in” 回复。
- **正文解释 why。** “这做了什么”通常从 diff 很明显；“为什么需要它”很少明显。
- **如果有 issue，请引用。** 如果没有且 PR 非平凡，请先开 issue，让大家先确认这个改动值得做。
- **Review 期间不要 squash。** Push fixup；我们会在 merge 时 squash。
- **不要 force-push 到共享分支**，除非 reviewer 要求。

我们不强制 CLA。Apache-2.0 已覆盖；你的贡献按同一 license 授权。

---

## 报告 bug

开 issue 时请提供：

- 你运行了什么（精确的 `pnpm tools-dev ...` 调用）。
- 选择了哪个 agent CLI（或是否走 BYOK path）。
- 触发问题的 skill + design system 组合。
- 相关的 **daemon stderr tail**：大多数 “artifact never rendered” 报告，只要看到 `spawn ENOENT` 或 CLI 的真实错误，30 秒就能定位。
- 如果是 UI 问题，请提供截图。

对于 prompt-stack bug（例如 “agent emitted a purple gradient hero, the slop blacklist was supposed to forbid that”），请包含**完整 assistant message**，这样我们才能判断违规来自 model 还是 prompt。

---

## 提问

- 架构问题、设计问题、“这是 bug 还是误用” → [GitHub Discussions](https://github.com/nexu-io/open-design/discussions)（首选，后面的人能搜到）。
- “我该如何写一个能做 X 的 skill” → 开 discussion。我们会回答；如果那是缺失 pattern，会把答案补进 [`docs/skills-protocol.md`](docs/skills-protocol.md)。

---

## 我们不接受什么

为了保持项目聚焦，请不要打开以下 PR：

- **Vendor 一个 model runtime。** OD 的核心判断是“你现有的 CLI 已经足够”。我们不打包 `pi-ai`、OpenAI keys 或 model loaders。
- **未经讨论把 frontend 重写到当前 stack 之外。** Next.js 16 App Router + React 18 + TS 是边界。除非 maintainer 明确想迁移，否则不要重写到 Astro、Solid、Svelte 或其他框架。
- **用 serverless function 替换 daemon。** Daemon 的价值就是拥有真实 `cwd` 并 spawn 真实 CLI。SPA 部署到 Vercel 没问题，daemon 仍然是 daemon。
- **添加 telemetry / analytics / phone-home。** OD 是 local-first。唯一 outbound call 是用户明确配置的 provider。
- **打包 binary**，但旁边没有 license 文件和 authorship attribution。

如果不确定想法是否合适，请先开 discussion，再写代码。

---

## Becoming a Maintainer

如果你一直在贡献，并想了解成为 Maintainer 的路径，规则在 **[`MAINTAINERS.md`](MAINTAINERS.md)**。简版如下：

- Maintainer 可以 review、approve、关闭 issue。Merge button 仍属于 Core Team；你的 approval 仍然计为 merge 所需 approval。
- 门槛是 **≥ 20 个 merged PR**，再加一项公开的 account-quality check（防 bot、防 sock-puppet），以及 Core Team 对贡献质量的判断。没有申请表；Core Team 会内部提出候选人并主动联系。
- **没有 quotas、没有 SLAs、没有固定任期。** 退出很容易且可逆（Emeritus → 生活稳定后回归）。
- 完整 thresholds、nomination flow、step-down rules 和 early-project waiver 都在 [`MAINTAINERS.md`](MAINTAINERS.md)。如果上面任何一点让你感兴趣，请读那份文档。

tl;dr：持续提交好 PR、认真 review、在 [Discussions][discussions] / [Discord][discord] 参与交流，剩下的会自然发生。

[discussions]: https://github.com/nexu-io/open-design/discussions
[discord]: https://discord.gg/qhbcCH8Am4

---

## License

By contributing, you agree your contribution is licensed under the [Apache-2.0 License](LICENSE) of this repository, with the exception of files inside [`skills/guizang-ppt/`](skills/guizang-ppt/), which retain their original MIT license and authorship attribution to [op7418](https://github.com/op7418).

[skill]: https://docs.anthropic.com/en/docs/claude-code/skills
[guizang]: https://github.com/op7418/guizang-ppt-skill
[acd2]: https://github.com/VoltAgent/awesome-design-md
[ocod]: https://github.com/OpenCoworkAI/open-codesign
