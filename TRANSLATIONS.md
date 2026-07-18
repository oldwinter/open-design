# 翻译指南

> **贡献者快速入门：** 本指南帮助你用约 2 小时而不是约 8 小时为 Open Design 添加一种新语言。按清单操作、避开常见错误，然后提交 PR。

通用贡献流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。“本地化维护”一节说明翻译内容与 agent 执行源材料之间的边界。本文件讲解如何在贡献者最常接触的内容中添加和维护 locale：UI 文案、README、核心文档和展示元数据。

> **为什么单独成文？** i18n 贡献者通常只需要这些内容。把 locale 工作流从主贡献指南中分离出来，可以避免 BCP-47、fallback chain、区域术语表等概念干扰更广泛的代码贡献流程。`CONTRIBUTING.md` 会链接到这里。
>
> **中文 fork 说明：** 以下流程描述上游仓库的约定，上游只在根目录保留英文文档。本 fork 额外把根目录 README、Quickstart、Contributing、Privacy 与本指南作为简体中文入口维护。

---

<a id="-quick-start-adding-your-language-in-5-steps"></a>
## 🚀 快速入门：5 步添加您的语言

**翻译贡献新手？** 从这里开始。该清单涵盖了 80% 的情况。

### 第 1 步：选择您的语言代码

选择一个标准代码：
- 大多数语言的两个字母：`de`、`fr`、`sv`、`vi`
- 需要时的区域变体：`pt-BR`、`zh-CN`、`zh-TW`、`es-ES`
- 使用连字符，而不是下划线：`zh-CN` ✅ 而不是 `zh_CN` ❌

### 第 2 步：翻译 README

翻译在 `docs/i18n/` 进行；只有英文 `README.md` 保留在仓库根目录中（GitHub 将根目录 README 呈现为项目主页）。

```bash
# Copy and translate
cp README.md docs/i18n/README.sv.md
# Edit docs/i18n/README.sv.md in your editor
```

**要翻译的内容：**
- ✅ 所有文字、标题、描述
- ✅ 替代文字：`alt="Open Design banner"`
- ✅ 链接文本：`[Quickstart](../../QUICKSTART.md)` → `[Snabbstart](QUICKSTART.sv.md)`（路径相对于 `docs/i18n/`：将翻译后的核心文档链接为同级文件名，或回退到 `../../QUICKSTART.md` 的英文目标）

**不翻译的内容：**
- ❌ 代码片段、命令、文件路径
- ❌ URL、GitHub 用户名、仓库名称
- ❌ 品牌名称：“Open Design”、“Claude Code”
- ❌ 技术术语：CLI、API、BYOK、daemon

<a id="step-3-update-all-language-switchers-critical"></a>
### 第 3 步：更新所有语言切换器（至关重要！）

**这是最常被遗忘的步骤。** 您必须在以下位置更新语言切换器：
1. 您的新 `docs/i18n/README.sv.md`（将你的语言加粗）
2. **每个现有的 README** — 仓库根目录中的英语 `README.md` *和*每个 `docs/i18n/README.*.md`（将您的语言添加为链接）

切换器使用两种链接约定，具体取决于它所在的文件：

- **根目录英文 `README.md`** — 将 `English` 加粗；翻译链接使用 `docs/i18n/` 前缀：
  ```html
  <p align="center"><b>English</b> · <a href="docs/i18n/README.es.md">Español</a> · ... · <a href="docs/i18n/README.sv.md">Svenska</a></p>
  ```
- **翻译为 `docs/i18n/README.xx.md`** — 粗体显示您自己的语言；将英语与 `../../README.md` 和其他翻译链接为同级文件名：
  ```html
  <p align="center"><a href="../../README.md">English</a> · <a href="README.es.md">Español</a> · ... · <b>Svenska</b></p>
  ```

**要更新的文件：** 仓库根目录中的 `README.md` 以及 `git ls-files 'docs/i18n/README.*.md'` 返回的每个文件。不要在此处维护复制的文件名列表； `pnpm i18n:check` 验证每个切换器都有相同的设置。

### 第 4 步：添加 UI 字典（可选但推荐）

复制 `en.ts` 创建 `apps/web/src/i18n/locales/sv.ts`，然后翻译每个 value，并原样保留所有 key 与 placeholder。Locale 字典必须是完整、显式的 `Dict` 实现；不要用 `...en` 掩盖缺失的 key。

> **注意：** `Dict` 类型和 `apps/web/tests/i18n/locales.test.ts` 会强制与 `en.ts` 对齐，包括 placeholder 名称。Runtime 的英文 fallback 只是防御性兼容边界，不代表可以提交不完整字典。

然后在 `apps/web/src/i18n/index.tsx` 和 `apps/web/src/i18n/types.ts` 中注册它（参见[下面的详细步骤](#adding-a-new-locale)）。

**不要忘记更新测试 fixture：** 把 locale code 加入 `apps/web/tests/i18n/locales.test.ts` 的 `EXPECTED_LOCALES`，并增加 `LOCALE_LABEL` 断言（例如 `expect(LOCALE_LABEL.sv).toBe('Svenska');`）。运行 `pnpm --filter @open-design/web test` 验证。

### 第 5 步：测试并提交

```bash
# Type check
pnpm typecheck

# Run i18n checks
pnpm i18n:check

# Visual check: open your docs/i18n/README.sv.md in GitHub preview
# Verify all links work, images load, language switcher displays correctly
```

**PR 标题：** `feat(i18n): add Swedish translation`

**PR 清单：**
- [ ] README 翻译
- [ ] 所有现有 READMEs 中更新了语言切换器
- [ ] 添加 UI 字典（如果适用）
- [ ] 所有已测试链接
- [ ] `pnpm i18n:check` 通过

---

## 📋 支持的语言

Open Design 目前在不同内容入口中支持 **19 种语言**：

| 语言                 | 代码    | README | UI 字典 | 核心文档 | 状态 |
| -------------------- | ------- | ------ | ------- | --------- | ------ |
| English              | `en`    | ✅     | ✅      | ✅        | 源语言 |
| العربية (Arabic)     | `ar`    | ✅     | ✅      | —         | 活跃 |
| Deutsch              | `de`    | ✅     | ✅      | ✅        | 活跃 |
| Español              | `es-ES` | ✅     | ✅      | —         | 活跃 |
| فارسی (Persian)      | `fa`    | —      | ✅      | —         | 活跃 |
| Français             | `fr`    | ✅     | ✅      | ✅        | 活跃 |
| Magyar (Hungarian)   | `hu`    | —      | ✅      | —         | 活跃 |
| Bahasa Indonesia     | `id`    | —      | ✅      | —         | 活跃 |
| Italiano             | `it`    | —      | ✅      | —         | 活跃 |
| 日本語 (Japanese)    | `ja`    | ✅     | ✅      | ✅        | 活跃 |
| 한국어 (Korean)      | `ko`    | ✅     | ✅      | ✅        | 活跃 |
| Polski (Polish)      | `pl`    | —      | ✅      | —         | 活跃 |
| Português (Brasil)   | `pt-BR` | ✅     | ✅      | ✅        | 活跃 |
| Русский (Russian)    | `ru`    | ✅     | ✅      | —         | 活跃 |
| ภาษาไทย (Thai)       | `th`    | ✅     | ✅      | ✅        | 活跃 |
| Türkçe (Turkish)     | `tr`    | ✅     | ✅      | —         | 活跃 |
| Українська           | `uk`    | ✅     | ✅      | —         | 活跃 |
| 简体中文             | `zh-CN` | ✅     | ✅      | ✅        | 活跃 |
| 繁體中文             | `zh-TW` | ✅     | ✅      | —         | 活跃 |

**翻译内容：**
- **README**：项目 README，翻译到 `docs/i18n/README.{lang}.md`（英文源位于根目录 `README.md`）
- **UI Dict**：Web 界面字符串（`apps/web/src/i18n/locales/{lang}.ts`）
- **核心文档**：`docs/i18n/QUICKSTART.{lang}.md`、`docs/i18n/CONTRIBUTING.{lang}.md`（英文源位于根 `QUICKSTART.md`、`CONTRIBUTING.md`）

> **注意：** 这些内容可以分批贡献。先从 README（影响最大）开始，有余力时再添加 UI 字典和核心文档。

### 文件位置

- **UI dictionaries**：[`apps/web/src/i18n/locales/`](apps/web/src/i18n/locales/)
- **英文来源**： [`README.md`](README.md)、[`QUICKSTART.md`](QUICKSTART.md)、[`CONTRIBUTING.md`](CONTRIBUTING.md)、[`MAINTAINERS.md`](MAINTAINERS.md) 保留在项目根目录中
- **翻译文档**：[`docs/i18n/`](docs/i18n/) 包含每个 `README.{lang}.md`、`QUICKSTART.{lang}.md`、`CONTRIBUTING.{lang}.md` 和 `MAINTAINERS.{lang}.md`
- **显示元数据**：`apps/web/src/i18n/content*.ts`（可选，用于图库/示例）

[`apps/web/src/i18n/types.ts`](apps/web/src/i18n/types.ts)中的`LOCALES`数组是UI dictionaries的权威列表。 README语言切换器涵盖了每个在`docs/i18n/`中有README翻译的locale；该集合可能与 `LOCALES` 不同。

---

## 📖 详细指南

<a id="adding-a-new-locale"></a>
### 添加新的 locale

**对于 UI 词典 + README 翻译：**

1. **选择 BCP-47 代码。** 当变体很重要时，请使用区域形式（`pt-BR`、`es-ES`、`zh-TW`）；如果没有，则使用裸代码（`fr`、`ru`、`it`）。 `pt-BR` 和假设的 `pt-PT` 将作为单独的 locales 共存 - 如果贡献者想要同时维护两者，则相同的先例适用于 `en-US` / `en-GB`。

2. **更新[`apps/web/src/i18n/types.ts`](apps/web/src/i18n/types.ts)：**
   - 使用您的代码扩展 `Locale` 联合
   - 将代码附加到 `LOCALES` 数组
   - 添加 `LOCALE_LABEL[<code>]` 条目 - 使用该语言的**本地名称**（`Svenska`、`日本語`，而不是 `sv`、`ja`）

   ```typescript
   export type Locale = 'en' | 'de' | 'fr' | 'sv' | /* ... */;
   
   export const LOCALES: Locale[] = ['en', 'de', 'fr', 'sv', /* ... */];
   
   export const LOCALE_LABEL: Record<Locale, string> = {
     en: 'English',
     de: 'Deutsch',
     fr: 'Français',
     sv: 'Svenska',
     // ...
   };
   ```

   **然后更新测试 fixture：** 在 [`apps/web/tests/i18n/locales.test.ts`](apps/web/tests/i18n/locales.test.ts) 中，将 locale 添加到 `EXPECTED_LOCALES` 数组并添加 `LOCALE_LABEL` 断言：
   
   ```typescript
   const EXPECTED_LOCALES = ['en', 'id', 'de', /* ... */, 'sv', /* ... */];
   
   // In the test body:
   expect(LOCALE_LABEL.sv).toBe('Svenska');
   ```

   **如果您的 locale 是 RTL（阿拉伯语、希伯来语、波斯语、乌尔都语等）：** 还将您的代码附加到 [`apps/web/src/i18n/index.tsx`](apps/web/src/i18n/index.tsx) 中的 `RTL_LOCALES`。该数组控制 runtime 处 `<html>` 上的 `dir="rtl"` 属性 — 没有它，无论语言如何，Web UI 都会呈现 LTR。当前的列表是：

   ```typescript
   const RTL_LOCALES: Locale[] = ['ar', 'fa'];
   ```

3. **在 `apps/web/src/i18n/locales/<code>.ts` 创建字典**：
   - 从 `en.ts` 复制并转换值
   - 显式声明每个 key； keys 和 placeholder 名称必须与 `en.ts` 完全匹配
   - 不要将 `en` 扩展为部分 locale。 Typecheck 和 locale 测试旨在在审核时暴露遗漏
   - 译者仍然有一个英文fallback作为防御性runtime边界，但维护的dictionaries不得依赖它

4. **在 [`apps/web/src/i18n/index.tsx`](apps/web/src/i18n/index.tsx) 中注册您的字典**：

   ```typescript
   import { sv } from './locales/sv';
   // ...
   const DICTS: Record<Locale, Dict> = {
     en,
     de,
     fr,
     sv, // Add your locale here
     // ...
   };
   ```

5. **翻译README：**
   - 将 `README.md` 复制到 `docs/i18n/README.<code>.md` （翻译位于 `docs/i18n/` 下；英文 `README.md` 是仓库根目录中唯一的翻译）
   - 当 UI 字典代码是熟悉的文档文件名时，仓库先例可能会使用与 UI 字典代码不同的文档区域代码，例如 `README.ja-JP.md` 与 UI locale `ja` 或 `README.es.md` 与 UI locale `es-ES`
   - 翻译所有正文、标题、替代文本和链接文本
   - 保留英文代码片段、URL 和品牌名称
   - 修复新位置的相对路径：指向 repo-root 资源（`apps/`、`docs/`、`LICENSE`、英文 `README.md` 等）的链接需要 `../../` 前缀；指向同级翻译核心文档的链接保留为裸文件名。示例：`[Quickstart](../../QUICKSTART.md)` → `[Snabbstart](QUICKSTART.sv.md)`（如果该翻译存在），否则 `[Snabbstart](../../QUICKSTART.md)`

6. **更新每个 README 中的语言切换器** — 根 `README.md` 和每个 `docs/i18n/README.*.md`（每行 ~25 行）：
   - 匹配英文README中使用的顺序
   - 到处都包含相同的集合
   - 将当前语言加粗：`<b>Svenska</b>`
   - 链接形式因文件位置而异（见下文）

   **根目录英文 `README.md`** — 粗体 `English`，用 `docs/i18n/` 前缀链接翻译。从 `README.md` 复制当前切换器，附加新的 `docs/i18n/README.<code>.md` 链接，并保持英文粗体。签入的切换器是要复制的源；不要复制本指南中的硬编码语言列表。

   **翻译的 `docs/i18n/README.<code>.md`** — 将英语与 `../../README.md` 链接，其他翻译作为同级文件名，将您自己的翻译加粗。复制当前翻译的切换器，添加新的 locale，并将新语言加粗。 `pnpm i18n:check` 验证结果。

7. **（可选）翻译核心文档：**
   - 复制 `QUICKSTART.md` → `docs/i18n/QUICKSTART.<code>.md`
   - 复制 `CONTRIBUTING.md` → `docs/i18n/CONTRIBUTING.<code>.md`
   - 遵循现有示例：`docs/i18n/QUICKSTART.fr.md`、`docs/i18n/CONTRIBUTING.pt-BR.md`、`docs/i18n/CONTRIBUTING.ja-JP.md`
   - 应用相同的 `../../`-for-root-resources 规则； `docs/i18n/` 中翻译文档之间的链接保持为裸同级文件名
   - 更新从翻译的 README 到翻译的核心文档的链接

8. **（可选）翻译 `apps/web/src/i18n/content*.ts` 中的显示元数据**：
   - 将此保留为仅显示元数据，例如示例、图库卡和本地化内容镶边
   - Agent 执行的 prompts、skill 指令、design systems 和 prompt 主体保留其源语言，因此 prompt QA 保持集中化

9. **运行检查：**
   ```bash
   pnpm typecheck  # Confirms locale union and DICTS map agree
   pnpm i18n:check  # Enforces UI locale registration and README switcher consistency
   pnpm --filter @open-design/web test  # Covers locale/content drift tests
   ```

### 翻译最佳实践

**要翻译的内容：**
- ✅ 所有正文文本、标题、描述
- ✅ 图像中的替代文本：`alt="Open Design banner"` → `alt="Banner di Open Design"`
- ✅ 适当的徽章标签：`discord-join` → `discord-unisciti`
- ✅ 示例中的代码注释（如果有指导意义）
- ✅ 链接文本：`[Quickstart](../../QUICKSTART.md)` → `[Snabbstart](QUICKSTART.sv.md)`（`docs/i18n/` 中的同级翻译（如果存在）；否则保留英文目标 `../../QUICKSTART.md`）

**不翻译的内容：**
- ❌ 代码片段（命令、文件路径、变量名）
- ❌ URL 和域名
- ❌ GitHub 用户名和仓库名称
- ❌ 品牌名称：“Open Design”、“Claude Code”、“Anthropic”、“Vercel”
- ❌ 无标准翻译的技术术语：CLI、API、SDK、BYOK、daemon、sidecar、monorepo、artifact、iframe
- ❌ 命令输出（保持终端输出为英文，与实际软件中显示的一样）

**术语指南：**
- 如果不存在标准翻译，则首次使用时请使用英文术语并在括号中进行简要说明：
  ```
  Open Design è un'alternativa open-source (codice aperto) a Claude Design.
  ```
- 对于区域变体（zh-CN 与 zh-TW、pt-BR 与 pt-PT），请为您的目标受众选择最广泛理解的变体
- 有关特定术语表，请参阅[区域术语](#regional-terminology) 部分

### 徽章翻译

README 中的某些徽章可以通过更改徽章 URL 进行本地化：

```markdown
<!-- English -->
<a href="https://discord.gg/mHAjSMV6gz"><img alt="Discord" src="https://img.shields.io/badge/discord-join-5865F2?style=flat-square&logo=discord&logoColor=white" /></a>

<!-- Italian -->
<a href="https://discord.gg/mHAjSMV6gz"><img alt="Discord" src="https://img.shields.io/badge/discord-unisciti-5865F2?style=flat-square&logo=discord&logoColor=white" /></a>
```

**翻译这些徽章标签：**
- 下载按钮：`download` → 您的语言
- Quickstart 徽章：`quickstart` → 您的语言
- Discord：`join` → 你的语言

**保留这些徽章的英文版本：**
- GitHub 统计信息（星星、分叉、问题、PR、贡献者、提交）
- 版本号和发布信息
- 执照
- 技术计数（agents、skills、design systems）

---

<a id="regional-terminology"></a>
## 🌍 地区术语

### 一般准则

翻译遵循目标地区技术写作社区的惯例。维护者相信贡献者会做出惯用的选择，并且不会对风格进行把关。

**要保留英文的技术术语：**
- Open Design、Claude Code、Claude Design
- Skills、Design Systems
- BYOK（自带Key）
- CLI、API、SDK
- Daemon、sidecar
- Monorepo、workspace
- Artifact、iframe
- git，GitHub，Vercel

**标准存在时要翻译的术语：**
- “local-first” → 您语言的等效项
- “开源” → 您的语言的等效项
- “安装” → 您语言的等效项
- “quickstart” → 您语言的等效项
- “设置” → 您的语言的等效项

### 法语 (`fr`) 词汇表

法文版 UI 应该适合技术产品受众自然阅读，而无需
将 Product/runtime 术语转换为模糊的法语近似值。保留这些
规则在 `apps/web/src/i18n/locales/fr.ts`、法语核心文档和
法语显示元数据。

#### 保留英文

保留名称、协议、命令、环境的准确英文/令牌形式
变量、代码标识符、包名称、文件扩展名和技术信息
runtime 英语中更清晰的名词：

| English source | French usage |
| -------------- | ------------ |
| Open Design | Open Design |
| Claude Code, Codex, Cursor, Gemini, OpenCode | Claude Code, Codex, Cursor, Gemini, OpenCode |
| CLI, API, SDK, MCP, HTTP, REST, SSE, JSONL | CLI, API, SDK, MCP, HTTP, REST, SSE, JSONL |
| BYOK | BYOK |
| runtime | runtime |
| daemon | daemon |
| sidecar | sidecar |
| headless | headless |
| plugin | plugin |
| prompt | prompt |
| token | token |
| iframe | iframe |
| monorepo, workspace | monorepo, workspace |
| `od`, `pnpm`, `pnpm tools-dev` | `od`, `pnpm`, `pnpm tools-dev` |
| `OD_DATA_DIR`, `OD_WEB_PORT`, `{provider}` | `OD_DATA_DIR`, `OD_WEB_PORT`, `{provider}` |
| `.zip`, `.html`, `.md`, `.json` | `.zip`, `.html`, `.md`, `.json` |

在保留术语周围使用法语语法：

- `le daemon local`、`un runtime`、`des plugins`、`les prompts`
- `l’API`、`un endpoint REST`、`un flux SSE`
- `la CLI locale`、`un serveur MCP`

#### 标准时翻译

翻译普通 UI 术语、工作流程标签和非标识符产品副本
当存在自然法语对应词时：

| English source | French |
| -------------- | ------ |
| Settings | Paramètres |
| Save | Enregistrer |
| Cancel | Annuler |
| Delete | Supprimer |
| Folder | Dossier |
| File | Fichier |
| Download | Télécharger |
| Upload | Téléverser |
| Search | Rechercher |
| Preview | Aperçu |
| Project | Projet |
| Conversation | Conversation |
| Dashboard | Tableau de bord |
| Schedule | Planification |
| Automation | Automatisation |
| Artifact | Artefact |
| Live artifact | Artefact dynamique |
| Design files | Fichiers de design |
| Slide deck | Présentation |
| Engineering handoff | Transmission aux ingénieurs |
| Shipped (product/software status) | Livré |

#### 上下文相关的选择

- `Skill` 指 Open Design / Claude skill 格式时保留英文；只有泛指“能力”或“功能”时才译为 `capacité`。
- `fork` 指 Open Design 的对话分叉功能或对应产品/CLI 文案时保留英文。Git branch 可译为 `branche`，但不要把产品动作改写成 branch。
- `Design System` 指产品 registry / object 名称时可以保留英文；解释性正文中也可使用 `système de design`，以自然易读为准。
- `Craft` 指仓库的 `craft/` extension point 或对应 UI label 时保留英文，不要把这个功能名译成普通的润色或收尾过程。
- `SOTA Harness` 与 `Harness` 指 Open Design 的产品/runtime 概念或对应营销 label 时保留英文。
- `motion`、`timing`、`easing`、`fallback`、`timeline` 等动效设计术语，在紧凑 UI label 或 agent workflow prompt 中可以保留英文。
- `runtime` 作为名词时保留英文；“execution mode”等 label 仍可译为 `mode d’exécution`。
- `source` 用作 provenance label 时可以保留；普通的“data source”译为 `source de données`。
- 不要翻译用户应在 terminal 中原样看到的 command output 或示例。
- 不要翻译 UI 输入提示里可直接复制粘贴的 parser token 或 operator。用户可能把 `kind`、`limit`、`scale`、`selector`、`columns`、`maxWidth`、`gap` 直接粘贴到输入框，因此必须保持原样。

### zh-CN ↔ zh-TW 术语表

在简体中文和繁体中文之间进行转换时，更喜欢使用 zh-TW 中的台湾特定措辞，而不是仅进行字符转换。该列表源自 [PR #194](https://github.com/nexu-io/open-design/pull/194)，旨在作为起点，而不是规则手册。

**工具：** [OpenCC](https://github.com/BYVoid/OpenCC) 与 `s2twp.json` 自动处理大多数核心术语。下面的惯用表是人工审核的回报所在。

#### 核心术语（由 OpenCC 自动化）

| English      | zh-CN  | zh-TW   |
| ------------ | ------ | ------- |
| screen       | 屏幕   | 螢幕    |
| stack        | 栈     | 堆疊    |
| project      | 项目   | 專案    |
| software     | 软件   | 軟體    |
| video        | 视频   | 影片    |
| file         | 文件   | 檔案    |
| document     | 文档   | 文件    |
| message      | 信息   | 訊息    |
| network      | 网络   | 網路    |
| database     | 数据库 | 資料庫  |
| user         | 用户   | 使用者  |
| default      | 默认   | 預設    |
| real-time    | 实时   | 即時    |
| install      | 安装   | 安裝    |
| settings     | 设置   | 設定    |
| menu         | 菜单   | 選單    |
| compatible   | 兼容   | 相容    |
| bind         | 绑定   | 綁定    |
| desktop      | 桌面端 | 桌面版  |
| mobile       | 移动端 | 行動版  |

#### 惯用/特定领域（需要人类判断）

这些映射在 #194 中需要人工判断 - OpenCC 不会捕获它们，并且它们是**最有用的记录**，因为下一个翻译器将做出相同的选择：

| English / context        | zh-CN     | zh-TW     |
| ------------------------ | --------- | --------- |
| fallback / safety net    | 兜底      | 備援      |
| bundle / package up      | 捆绑      | 納入      |
| live, dynamic            | 活的      | 動態的    |
| plan (noun)              | 计划      | 計畫      |
| color palette            | 色板      | 色票      |
| spec doc                 | 规范文件  | 規格文件  |
| course-correction        | 介入纠偏  | 介入修正  |
| crash, screw up (slang)  | 翻车      | 出包      |
| go viral (slang)         | 出圈      | 爆紅      |

### 葡萄牙语：pt-BR vs pt-PT

**巴西葡萄牙语 (`pt-BR`)** 与欧洲葡萄牙语差异显著：

| English    | pt-BR      | pt-PT (avoid) |
| ---------- | ---------- | ------------- |
| app        | aplicativo | aplicação     |
| screen     | tela       | ecrã          |
| download   | baixar     | descarregar   |
| mouse      | mouse      | rato          |
| to click   | clicar     | clicar        |

使用巴西葡萄牙语进行 `pt-BR` 翻译。如果贡献者想要添加欧洲葡萄牙语，请使用代码 `pt-PT`。

### 西班牙语：`es-ES`（西班牙）

当前发布的 UI locale 是 **`es-ES`**，label 为 `Español (España)`，因此 dictionary 和根目录 README 都面向欧洲西班牙语。README 文件名 `README.es.md` 沿用文档侧的既有 code，与 UI code 不同（参见记录此模式的[添加新 locale](#adding-a-new-locale)步骤）；两处内容描述的是同一个西班牙（欧洲）locale。

| English    | es-ES (use)  | Avoid (Latin American) |
| ---------- | ------------ | ---------------------- |
| computer   | ordenador    | computadora (LatAm)    |
| app        | aplicación   | app (anglicism)        |
| to download| descargar    | bajar (informal)       |
| file       | archivo      | fichero (dated Spain)  |
| mobile     | móvil        | celular (LatAm)        |

如果贡献者想要中性或拉丁美洲西班牙语，请在后续 PR 中提出单独的 locale（例如 `es-419`） - 不要将 `es-ES` 转向不同的区域变体，因为现有的 `Español (España)` 标签设定了读者的期望。

### 阿拉伯语：RTL 和技术术语

**阿拉伯语 (`ar`)** 使用所有阿拉伯语地区都能理解的现代标准阿拉伯语 (MSA)：

- 使用从右到左 (RTL) 文本方向 — **Markdown 会自动为 `README.*.md` 文件处理此问题**
- **web UI 需要手动注册**：将您的 locale 代码附加到 [`apps/web/src/i18n/index.tsx`](apps/web/src/i18n/index.tsx)（当前为 `['ar', 'fa']`）中的 `RTL_LOCALES`，否则 `<html dir="rtl">` 永远不会设置，并且 UI 呈现 LTR
- 技术术语通常以英语保存，并附有阿拉伯语解释
- 数字和日期可以使用西方阿拉伯数字（0-9）作为技术内容
- 保持代码块和 URL 从左到右

**例子：**
```markdown
Open Design هو البديل مفتوح المصدر لـ Claude Design
```

### 其他语言

随着 locales 的成熟，其他 CJK/RTL 术语表可以扩展本节。不要先发制人地填充空表——当贡献者遇到未来 PR 将面临的真正术语选择时添加一行。

---

## ✅ 测试您的翻译

在提交您的 PR 之前，请验证：

### 1.目视检查

在 GitHub 的预览或本地 Markdown 查看器中打开翻译后的 README：
- ✅ 语言切换器显示正确
- ✅ 所有链接均有效（无 404）
- ✅ 图片加载
- ✅ 代码块正确渲染
- ✅ 表格对齐
- ✅ 徽章展示
- ✅ RTL 文本正确流动（阿拉伯语、波斯语等）

### 2. 链接验证

检查所有指向现有文件的内部链接：

```bash
# Example: verify Swedish links (translations live in docs/i18n/)
grep -o 'README\.[a-z-]*\.md' docs/i18n/README.sv.md | sort -u
grep -o 'QUICKSTART\.[a-z-]*\.md' docs/i18n/README.sv.md | sort -u
grep -o 'CONTRIBUTING\.[a-z-]*\.md' docs/i18n/README.sv.md | sort -u
```

所有链接的文件都应该存在于仓库中。同级翻译相对于 `docs/i18n/` 进行解析；英文源通过 `../../` 前缀解析。如果翻译文件尚不存在，请链接至 `../../` 的英文版本。

### 3. 语言切换器审核

验证新文件中的语言切换器：
- ✅ 列出所有支持的语言
- ✅ 当前语言加粗：`<b>Svenska</b>`
- ✅ 所有其他语言都是链接（来自 `docs/i18n/` 文件的同级 `<a href="README.es.md">`；来自根 `README.md` 的 `docs/i18n/` 前缀）
- ✅ 链接使用正确的文件名（例如，`README.ja-JP.md` 而不是 `README.ja.md`）
- ✅ 订单符合标准订单

### 4. 一致性检查

与英文版结构对比：
- ✅ 相同数量的部分
- ✅ 相同的标题层次结构（H1、H2、H3）
- ✅ 相同的代码示例（未翻译）
- ✅ 相同的图像和徽章（带有翻译后的替代文本）
- ✅ 没有遗漏或多余的内容

### 5. 运行自动检查

```bash
# Type check (if you added UI dictionary)
pnpm typecheck

# i18n structural checks
pnpm i18n:check

# Web package tests (if you added UI dictionary)
pnpm --filter @open-design/web test
```

在提交您的 PR 之前，所有检查都必须通过。

---

## 📤 提交您的翻译

### PR 标题格式

```
feat(i18n): add [Language] translation
```

**示例：**
- `feat(i18n): add Swedish translation`
- `feat(i18n): add Vietnamese translation`

### PR 描述模板

```markdown
## Summary
Adds [Language] translation for Open Design documentation.

## Translation Scope
- [x] docs/i18n/README.[lang].md
- [ ] docs/i18n/QUICKSTART.[lang].md (optional)
- [ ] docs/i18n/CONTRIBUTING.[lang].md (optional)
- [x] UI dictionary (`apps/web/src/i18n/locales/[lang].ts`)
- [x] Language switcher updated in all existing READMEs

## Files Modified
Updated language switcher in:
- [x] README.md (root)
- [x] Every existing translation returned by `git ls-files 'docs/i18n/README.*.md'`

## Translation Notes
[Any regional choices, terminology decisions, or context for reviewers]

Example:
- Used neutral Spanish terminology to be understood across all regions
- Kept technical terms like "CLI", "API", "BYOK" in English as they're widely recognized
- Translated "open-source" as "código abierto" (standard term in Spanish tech community)

## Checklist
- [ ] All prose text translated
- [ ] Code snippets kept in English
- [ ] Internal links updated to point to translated files (or English if not available)
- [ ] Language switcher added to new files
- [ ] Language switcher updated in ALL existing README files
- [ ] Badges localized where appropriate
- [ ] Visual preview looks correct
- [ ] All links tested (no 404s)
- [ ] `pnpm typecheck` passes (if UI dictionary added)
- [ ] `pnpm i18n:check` passes
```

### 审核流程

**强烈推荐母语人士审核，但不会阻止。** 如果没有母语人士在约 7 天内进行审核并且 CI 通过，维护者可以将 locale PR 与 `nit` 标签合并。欢迎将后续修复作为单独的 PR。

> 7天的窗口期是一个起点，而不是硬性政策。根据您的 locale 贡献者的可用性和更改的大小进行调整。

## 🔄 维护现有翻译

### 当英语内容发生变化时

当英文源发生变化时，翻译**不会自动更新**。这是有意为之的——与机器翻译的翻译相比，我们更喜欢稍微过时的翻译。

**如果您发现过时的内容：**
1. 查看英文版最近的提交
2. 更新已更改的翻译部分
3. 提交标题为 PR 的 `fix(i18n): update [Language] translation`

**您不需要：**
- 持续监控英语变化
- 立即更新翻译
- 翻译每一个细微的编辑

### 维护工作流程

当 PR 更改英文文案时，先确认变更属于哪类内容，再明确更新对应翻译：

- **UI chrome：** 首先更新 `apps/web/src/i18n/locales/en.ts`，然后将相同的显式 keys 和匹配的 placeholders 添加到每个 locale 字典中。不要使用 `...en` 使不完整的字典显得完整。
- **README：** 保持根 `README.md` 和每个 `docs/i18n/README.*.md` 之间的语言切换器同步。在刷新期间检查徽章计数、Quickstart 链接、支持的 agent 列表以及针对英文 `README.md` 的发布/下载链接。
- **核心文档：** 当 locale 拥有这些文档时，保持翻译后的 `docs/i18n/QUICKSTART.*.md` 和 `docs/i18n/CONTRIBUTING.*.md` 与其英文源（`QUICKSTART.md`、`CONTRIBUTING.md` 在根中）保持一致。
- **显示元数据：** 当 locale 维护显示元数据时，与 `content.ts` 一起更新 `apps/web/src/i18n/content*.ts`。

### 自动检查

**P0 检查（CI 中的硬故障）：**
```bash
pnpm i18n:check
```

这强制执行：
- UI locale 注册
- 根目录 README切换器一致性
- 根 README 链接到翻译的核心文档

这些是合并前必须解决的结构性问题。

locale 测试验证每个注册词典中 key 和 placeholder 的精确一致性。具体译文仍需人工语言审校；结构对等并不能证明翻译质量。

---

## 📋 回补策略

当英文版 README 新增章节时，locale 维护者可能会在有针对性的后续更新中更新正文。 UI 字典 keys 是不同的：每个注册的 locale 必须在同一更改中添加每个新的 key，以便 typecheck 和 `apps/web/tests/i18n/locales.test.ts` 继续通过。 runtime fallback 是防御边界，而不是维护策略。

**保持刷新 PR 的重点：每个 locale 一个 PR，没有混合功能工作。**

### 漂移处理

- 缺失或额外的 UI、keys 和 placeholder 不匹配是硬故障，而不是过时状态阈值。
- 意外复制到 locale 中的英文 value 属于语义翻译缺陷。发现后应修复；对高风险 UI 文案可酌情增加针对性 assertion。
- README 和核心文档正文仍然可以独立漂移，因为这些文档是手动维护的。将 locale 与其英文源进行比较，并在更改技术声明之前使用代码/历史证据。

### 部分翻译

最初只翻译 README 是可以的。稍后当您有时间时添加 QUICKSTART 和 CONTRIBUTING。

**在您的 PR 中标记部分翻译：**
```markdown
## Translation Status
- [x] docs/i18n/README.sv.md (complete)
- [ ] docs/i18n/QUICKSTART.sv.md (planned)
- [ ] docs/i18n/CONTRIBUTING.sv.md (planned)
```

---

## ❓ 常见问题解答

### 问：我应该先翻译哪个文件？

**答：** 始终以 `README.md` 开头。这是用户首先看到的东西，并且影响最大。然后添加 UI 字典，然后添加 QUICKSTART，然后添加 CONTRIBUTING。

### Q：示例中的代码注释需要翻译吗？

**答：** 是的，如果它们具有指导意义的话。不，如果它们是实际代码输出的一部分。

```bash
# English
pnpm tools-dev  # Start the development server

# Italian
pnpm tools-dev  # Avvia il server di sviluppo
```

### 问：我应该翻译命令输出吗？

**答：** 否。请保留实际软件中显示的英文终端输出。

```bash
# Keep this in English
$ pnpm tools-dev
Starting daemon on port 17456...
Web server running at http://localhost:17573
```

### 问：如果我的语言中没有“开源”一词怎么办？

**答：** 首次使用时使用英文术语，并在括号中附上简短解释：

```markdown
Open Design è un'alternativa open-source (codice aperto) a Claude Design.
```

第一次使用后，您可以只使用英文术语。

### 问：如何处理从右到左 (RTL) 的语言，例如阿拉伯语？

**README：** Markdown 和 GitHub 自动处理 RTL 文本方向 - 只需用您的语言自然地编写并保持代码块/URL 从左到右即可。

**UI locale：** Web 应用程序自动检测支持的操作系统/浏览器语言并保留明确的用户选择。方向性单独注册：将新的 RTL locale 附加到 [`apps/web/src/i18n/index.tsx`](apps/web/src/i18n/index.tsx)（当前为 `['ar', 'fa']`）中的 `RTL_LOCALES`，以便设置 `<html dir="rtl">`。请参阅步骤 2 下的[详细步骤](#adding-a-new-locale)。

```markdown
<!-- README: Arabic text flows RTL automatically -->
Open Design هو البديل مفتوح المصدر لـ Claude Design

<!-- Code blocks stay LTR -->
```bash
pnpm tools-dev
```
```

### 问：我可以使用机器翻译吗？

**答：** 可以用机器翻译打底，但**必须**仔细审校。目标是达到母语写作水准。Reviewer 会检查以下机器翻译痕迹：
- 不自然的措辞
- 技术术语不正确
- 缺少上下文
- 直译没有意义

### 问：如果我发现英文版本有错误怎么办？

**答：** 首先在单独的 PR 中修复英文版本，然后更新翻译。不要传播错误。

### 问：我应该翻译变更日志吗？

**答：** 不。CHANGELOG 仅保留英文版本。这是维护人员的技术文档。

### 问：如何处理版本号和日期？

**答：** 保留英文格式的版本号 (`v1.0.0`)。日期可以本地化：
- 英语: `2026-05-12` 或 `May 12, 2026`
- 意大利语: `12 maggio 2026`
- 日语：`2026年5月12日`
- 西班牙语: `12 de mayo de 2026`

### 问：语言切换顺序如何？

**答：** 请遵循[步骤 3](#step-3-update-all-language-switchers-critical) 中所示的标准顺序。新语言放在最后。

### 问：我可以添加列表中没有的语言吗？

**答：** 是的！按照本指南并提交 PR。我们欢迎所有语言。

### 问：谁审查翻译 PR？

**答：** 最好是母语人士或流利的审阅者。如果没有可用的本地审阅者，维护人员将在大约 7 天后根据社区反馈检查结构和合并。

### 问：如果我只想翻译 README，而不是 UI 词典怎么办？

**答：** 完全没问题。只翻译 README 也有价值；UI 字典可以以后再补，也可以由其他贡献者完成。

### 问：我如何知道我的翻译是否足够好？

**答：** 问问自己：
- 母语人士会自然地理解这一点吗？
- 听起来像是用这种语言写的，而不是翻译的吗？
- 技术术语的使用是否正确？
- 我愿意将其展示给我的同事吗？

如果四项答案都是肯定的，质量就足够提交 review。

### 问：我可以更新有错误的现有翻译吗？

**答：** 是的！提交标题为 `fix(i18n): improve [Language] translation` 的 PR 并解释您在描述中修复的内容。

---

## 🆘 寻求帮助

- **有问题吗？** 打开 [GitHub 讨论](https://github.com/nexu-io/open-design/discussions)
- **发现问题？** 打开 [GitHub 问题](https://github.com/nexu-io/open-design/issues)
- **想聊天吗？** 加入我们的 [Discord](https://discord.gg/mHAjSMV6gz)
- **需要审核？** 在您的 PR 中标记 `@nexu-io/maintainers`

---

## 🎯 待讨论问题

以下问题确实尚未决定，列在这里是为了让贡献者知道这些讨论仍在进行：

- **README 新鲜度信号。** 每个 `README.<code>.md` 上的小徽章或头条时间戳可以帮助读者判断翻译的最新程度。
- **母语人士审阅窗口。** `~7 days` 对于较小的语言社区来说是否太短 - 如果实际数据显示相反，请进行调整。

如果您对上述任何内容有意见，请在 [#195](https://github.com/nexu-io/open-design/issues/195) 上提出问题或发表评论。

---

## 🚧 推迟的决定

尽管仓库现在已经包含 19 个 UI locale，以下决定仍然维持推迟状态。超过旧的 locale 数量阈值并不等于自动采用某种工具或生成 contract；任何一项变更都需要维护者明确决定：

- **翻译记忆工具**（Crowdin / Weblate / Lingui）。
- **README 模板驱动生成**（例如 [NRG](https://github.com/nanolaba/readme-generator)、自定义 `.src.md` 构建脚本、所有贡献者风格的工具）。 [#195](https://github.com/nexu-io/open-design/issues/195) 中的讨论体现了切换器维护和 locale 特定结构之间的权衡。

---

## 🙏 致谢

感谢我们所有的翻译贡献者！ 🌍

每一次翻译都让全球更多开发者能够接触到 Open Design。

**当前贡献者：**
- 完整列表请参见[贡献者](https://github.com/nexu-io/open-design/graphs/contributors)

---

**准备好贡献了吗？** 选择一种语言，按照[快速入门](#-quick-start-adding-your-language-in-5-steps) 操作，然后提交您的 PR。我们迫不及待地想看到您语言版本的 Open Design！ 🚀
