# Translation Guide

> **贡献者快速开始：** 本指南帮助你用约 2 小时而不是约 8 小时为 Open Design 添加新语言翻译。按 checklist 操作，避开常见错误，自信提交 PR。

通用贡献流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。其中的 "Localization maintenance" section 记录了 translated surfaces 与 agent-facing source material 之间的边界。本文件说明**如何**在贡献者最常触碰的 surfaces 上添加和维护 locale：UI chrome、root READMEs、core docs 和 display metadata。

> **为什么单独成文？** i18n contributors 通常只需要这个 surface；把 locale workflow 从主贡献指南中分离出来，可以避免 BCP-47、fallback chains、regional glossaries 等术语干扰更广泛的 code-workflow audience。`CONTRIBUTING.md` 会 cross-link 到这里，方便发现。

---

## 🚀 Quick Start: Adding Your Language in 5 Steps

**第一次贡献翻译？** 从这里开始。这个 checklist 覆盖 80% 的常见情况。

### Step 1: Choose Your Language Code

选择标准 code：
- 多数语言使用 two-letter code：`de`、`fr`、`it`、`sv`
- 需要时使用 regional variants：`pt-BR`、`zh-CN`、`zh-TW`、`es-ES`
- 使用 hyphens，不用 underscores：`zh-CN` ✅，不是 `zh_CN` ❌

### Step 2: Translate the README

翻译文件位于 `docs/i18n/`；只有英文 `README.md` 留在 repo root（GitHub 会把根目录 README 渲染为项目主页）。

```bash
# 复制并翻译
cp README.md docs/i18n/README.it.md
# 在编辑器中编辑 docs/i18n/README.it.md
```

**需要翻译：**
- ✅ 所有文本、headings、descriptions
- ✅ Alt text：`alt="Open Design banner"`
- ✅ Link text：`[Quickstart](../../QUICKSTART.md)` → `[Guida rapida](QUICKSTART.it.md)`（路径相对于 `docs/i18n/`：有翻译版 core doc 时链接 sibling filename；否则 fallback 到英文目标 `../../QUICKSTART.md`）

**不要翻译：**
- ❌ Code snippets、commands、file paths
- ❌ URLs、GitHub usernames、repo names
- ❌ Brand names："Open Design"、"Claude Code"
- ❌ Technical terms：CLI、API、BYOK、daemon

### Step 3: Update ALL Language Switchers (Critical!)

**这是最常被忘记的一步。** 你必须更新以下位置的 language switcher：
1. 新增的 `docs/i18n/README.it.md`（把你的语言加粗）
2. **每个现有 README**：repo root 中的英文 `README.md`，以及每个 `docs/i18n/README.*.md`（把你的语言作为 link 加进去）

Switcher 会根据所在文件使用两种 link conventions：

- **英文根目录 `README.md`**：加粗 `English`；翻译文件链接带 `docs/i18n/` prefix：
  ```html
  <p align="center"><b>English</b> · <a href="docs/i18n/README.es.md">Español</a> · ... · <a href="docs/i18n/README.it.md">Italiano</a></p>
  ```
- **翻译版 `docs/i18n/README.xx.md`**：加粗自己的语言；英文链接用 `../../README.md`，其他翻译用 sibling filenames：
  ```html
  <p align="center"><a href="../../README.md">English</a> · <a href="README.es.md">Español</a> · ... · <b>Italiano</b></p>
  ```

**需要更新的文件：** `README.md`（root）、`docs/i18n/README.ar.md`、`docs/i18n/README.de.md`、`docs/i18n/README.es.md`、`docs/i18n/README.fr.md`、`docs/i18n/README.ja-JP.md`、`docs/i18n/README.ko.md`、`docs/i18n/README.pt-BR.md`、`docs/i18n/README.ru.md`、`docs/i18n/README.tr.md`、`docs/i18n/README.uk.md`、`docs/i18n/README.zh-CN.md`、`docs/i18n/README.zh-TW.md`

### Step 4: Add UI Dictionary (Optional but Recommended)

创建 `apps/web/src/i18n/locales/it.ts`：

```typescript
import type { Dict } from '../types';
import { en } from './en';

export const it: Dict = {
  ...en, // Fallback to English for missing keys
  // Translate these UI strings
  'common.create': 'Crea',
  'common.cancel': 'Annulla',
  'settings.language': 'Lingua',
  'entry.tabDesigns': 'Design',
  'entry.tabTemplates': 'Modelli',
  // ... see en.ts for full list
};
```

> **Note:** `Dict` type 会强制所有 keys 与 `en.ts` 中的 keys 匹配。像 `'nav.home'` 这样 invented keys 会导致 TypeScript compilation 失败。

然后在 `apps/web/src/i18n/index.tsx` 和 `apps/web/src/i18n/types.ts` 中注册它（见下方 [detailed steps](#adding-a-new-locale)）。

**不要忘记更新 test fixtures：** 把你的 locale code 加到 `apps/web/tests/i18n/locales.test.ts` 中的 `EXPECTED_LOCALES`，并添加 `LOCALE_LABEL` assertion（例如 `expect(LOCALE_LABEL.it).toBe('Italiano');`）。运行 `pnpm --filter @open-design/web test` 验证。

### Step 5: Test and Submit

```bash
# Type check
pnpm typecheck

# Run i18n checks
pnpm i18n:check

# 视觉检查：在 GitHub preview 中打开 docs/i18n/README.it.md
# 确认所有 links 可用、images 能加载、language switcher 显示正确
```

**PR title:** `feat(i18n): add Italian translation`

**PR checklist:**
- [ ] README translated
- [ ] Language switcher updated in ALL existing READMEs
- [ ] UI dictionary added (if applicable)
- [ ] All links tested
- [ ] `pnpm i18n:check` passes

---

## 📋 Supported Languages

Open Design 当前在不同 surfaces 上支持 **19 种语言**：

| Language             | Code    | README | UI Dict | Core Docs | Status |
| -------------------- | ------- | ------ | ------- | --------- | ------ |
| English              | `en`    | ✅     | ✅      | ✅        | source |
| العربية (Arabic)     | `ar`    | ✅     | ✅      | —         | active |
| Deutsch              | `de`    | ✅     | ✅      | ✅        | active |
| Español              | `es-ES` | ✅     | ✅      | —         | active |
| فارسی (Persian)      | `fa`    | —      | ✅      | —         | active |
| Français             | `fr`    | ✅     | ✅      | ✅        | active |
| Magyar (Hungarian)   | `hu`    | —      | ✅      | —         | active |
| Bahasa Indonesia     | `id`    | —      | ✅      | —         | active |
| Italiano             | `it`    | —      | ✅      | —         | active |
| 日本語 (Japanese)    | `ja`    | ✅     | ✅      | ✅        | active |
| 한국어 (Korean)      | `ko`    | ✅     | ✅      | ✅        | active |
| Polski (Polish)      | `pl`    | —      | ✅      | —         | active |
| Português (Brasil)   | `pt-BR` | ✅     | ✅      | ✅        | active |
| Русский (Russian)    | `ru`    | ✅     | ✅      | —         | active |
| ภาษาไทย (Thai)       | `th`    | —      | ✅      | —         | active |
| Türkçe (Turkish)     | `tr`    | ✅     | ✅      | —         | active |
| Українська           | `uk`    | ✅     | ✅      | —         | active |
| 简体中文             | `zh-CN` | ✅     | ✅      | ✅        | active |
| 繁體中文             | `zh-TW` | ✅     | ✅      | —         | active |

**Translation surfaces:**
- **README**：项目 README，翻译到 `docs/i18n/README.{lang}.md`（英文 source 留在 root `README.md`）
- **UI Dict**：Web interface strings（`apps/web/src/i18n/locales/{lang}.ts`）
- **Core Docs**：`docs/i18n/QUICKSTART.{lang}.md`、`docs/i18n/CONTRIBUTING.{lang}.md`（英文 sources 留在 root `QUICKSTART.md`、`CONTRIBUTING.md`）

> **Note:** 可以贡献这些 surfaces 的任意子集。先从 README 开始（影响最大），有时间再添加 UI dictionary 和 core docs。

### File Locations

- **UI dictionaries**：[`apps/web/src/i18n/locales/`](apps/web/src/i18n/locales/)
- **English sources**：[`README.md`](README.md)、[`QUICKSTART.md`](QUICKSTART.md)、[`CONTRIBUTING.md`](CONTRIBUTING.md)、[`MAINTAINERS.md`](MAINTAINERS.md) 留在 project root
- **Translated docs**：[`docs/i18n/`](docs/i18n/) 存放所有 `README.{lang}.md`、`QUICKSTART.{lang}.md`、`CONTRIBUTING.{lang}.md` 和 `MAINTAINERS.{lang}.md`
- **Display metadata**：`apps/web/src/i18n/content*.ts`（可选，用于 gallery/examples）

[`apps/web/src/i18n/types.ts`](apps/web/src/i18n/types.ts) 中的 `LOCALES` array 是 UI dictionaries 的权威列表。README language switchers 覆盖所有在 `docs/i18n/` 中拥有 README translation 的 locale；这个集合可以和 `LOCALES` 不同。

---

## 📖 Detailed Guide

### Adding a new locale

**适用于 UI dictionary + README translation：**

1. **选择 BCP-47 code。** 当 variant 重要时使用 regional form（`pt-BR`、`es-ES`、`zh-TW`）；不重要时使用 bare code（`fr`、`ru`、`it`）。`pt-BR` 和假设中的 `pt-PT` 会作为 separate locales 共存；如果 contributor 想维护 `en-US` / `en-GB`，也遵循同样 precedent。

2. **更新 [`apps/web/src/i18n/types.ts`](apps/web/src/i18n/types.ts)：**
   - 用你的 code 扩展 `Locale` union
   - 把你的 code append 到 `LOCALES` array
   - 添加 `LOCALE_LABEL[<code>]` entry，使用该语言的 **native name**（`Italiano`、`日本語`，不是 `it`、`ja`）

   ```typescript
   export type Locale = 'en' | 'de' | 'fr' | 'it' | /* ... */;
   
   export const LOCALES: Locale[] = ['en', 'de', 'fr', 'it', /* ... */];
   
   export const LOCALE_LABEL: Record<Locale, string> = {
     en: 'English',
     de: 'Deutsch',
     fr: 'Français',
     it: 'Italiano',
     // ...
   };
   ```

   **然后更新 test fixtures：** 在 [`apps/web/tests/i18n/locales.test.ts`](apps/web/tests/i18n/locales.test.ts) 中，把你的 locale 加到 `EXPECTED_LOCALES` array，并添加 `LOCALE_LABEL` assertion：
   
   ```typescript
   const EXPECTED_LOCALES = ['en', 'id', 'de', /* ... */, 'it', /* ... */];
   
   // In the test body:
   expect(LOCALE_LABEL.it).toBe('Italiano');
   ```

   **如果你的 locale 是 RTL（Arabic、Hebrew、Persian、Urdu 等）：** 还要把 code append 到 [`apps/web/src/i18n/index.tsx`](apps/web/src/i18n/index.tsx) 中的 `RTL_LOCALES`。这个 array 控制 runtime 上 `<html>` 的 `dir="rtl"` attribute；没有它，web UI 无论语言如何都会按 LTR 渲染。当前列表是：

   ```typescript
   const RTL_LOCALES: Locale[] = ['ar', 'fa'];
   ```

3. **在 `apps/web/src/i18n/locales/<code>.ts` 创建 dictionary：**
   - 从 `en.ts` copy 并翻译 values
   - Keys 必须与 `en.ts` 精确匹配
   - Missing keys 会在 runtime fallback 到 English
   - Partial translations 使用 `...en` spread

   ```typescript
   import type { Dict } from '../types';
   import { en } from './en';

  export const it: Dict = {
    ...en, // Fallback for untranslated keys
    'common.create': 'Crea',
    'common.cancel': 'Annulla',
    'common.save': 'Salva',
    'settings.language': 'Lingua',
    'entry.tabDesigns': 'Design',
    'entry.tabTemplates': 'Modelli',
    // ... translate all keys from en.ts
  };
   ```

4. **在 [`apps/web/src/i18n/index.tsx`](apps/web/src/i18n/index.tsx) 注册 dictionary：**

   ```typescript
   import { it } from './locales/it';
   // ...
   const DICTS: Record<Locale, Dict> = {
     en,
     de,
     fr,
     it, // Add your locale here
     // ...
   };
   ```

5. **翻译 README：**
   - 将 `README.md` 复制到 `docs/i18n/README.<code>.md`（translations 位于 `docs/i18n/`；英文 `README.md` 是 repo root 中唯一的 README）
   - Repo precedent 可能使用与 UI dict code 不同的 documentation-region code，例如 `README.ja-JP.md` 对应 UI locale `ja`，或 `README.es.md` 对应 UI locale `es-ES`
   - 翻译所有 prose、headings、alt text 和 link text
   - 保留 code snippets、URLs 和 brand names 的英文
   - 修正新位置下的 relative paths：指向 repo-root resources（`apps/`、`docs/`、`LICENSE`、英文 `README.md` 等）的 links 需要 `../../` prefix；指向 sibling translated core doc 的 links 保持 bare filename。示例：如果存在对应翻译，则 `[Quickstart](../../QUICKSTART.md)` → `[Guida rapida](QUICKSTART.it.md)`，否则用 `[Guida rapida](../../QUICKSTART.md)`

6. **更新每个 README 中的 language switcher**：root `README.md` 以及每个 `docs/i18n/README.*.md`（每个文件约第 25 行）：
   - 匹配 English README 使用的顺序
   - 到处包含同一组语言
   - 当前语言加粗：`<b>Italiano</b>`
   - link 形式会因文件位置不同而不同（见下方）

   **英文 root `README.md`**：加粗 `English`，翻译 links 使用 `docs/i18n/` prefix：
   ```html
   <p align="center"><b>English</b> · <a href="docs/i18n/README.es.md">Español</a> · <a href="docs/i18n/README.pt-BR.md">Português</a> · <a href="docs/i18n/README.de.md">Deutsch</a> · <a href="docs/i18n/README.fr.md">Français</a> · <a href="docs/i18n/README.zh-CN.md">简体中文</a> · <a href="docs/i18n/README.zh-TW.md">繁體中文</a> · <a href="docs/i18n/README.ko.md">한국어</a> · <a href="docs/i18n/README.ja-JP.md">日本語</a> · <a href="docs/i18n/README.ar.md">العربية</a> · <a href="docs/i18n/README.ru.md">Русский</a> · <a href="docs/i18n/README.uk.md">Українська</a> · <a href="docs/i18n/README.tr.md">Türkçe</a> · <a href="docs/i18n/README.it.md">Italiano</a></p>
   ```

   **翻译版 `docs/i18n/README.<code>.md`**：英文用 `../../README.md` 链接，其他翻译用 sibling filenames，并加粗自己的语言：
   ```html
   <p align="center"><a href="../../README.md">English</a> · <a href="README.es.md">Español</a> · <a href="README.pt-BR.md">Português</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.zh-TW.md">繁體中文</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja-JP.md">日本語</a> · <a href="README.ar.md">العربية</a> · <a href="README.ru.md">Русский</a> · <a href="README.uk.md">Українська</a> · <a href="README.tr.md">Türkçe</a> · <b>Italiano</b></p>
   ```

7. **（可选）翻译 core docs：**
   - Copy `QUICKSTART.md` → `docs/i18n/QUICKSTART.<code>.md`
   - Copy `CONTRIBUTING.md` → `docs/i18n/CONTRIBUTING.<code>.md`
   - 参考既有 examples：`docs/i18n/QUICKSTART.fr.md`、`docs/i18n/CONTRIBUTING.pt-BR.md`、`docs/i18n/CONTRIBUTING.ja-JP.md`
   - 应用同样的 `../../`-for-root-resources 规则；`docs/i18n/` 中 translated docs 之间的 links 保持 bare sibling filenames
   - 更新 translated README 中指向 translated core docs 的 links

8. **（可选）翻译 `apps/web/src/i18n/content*.ts` 中的 display metadata：**
   - 仅限 examples、gallery cards 和 localized content chrome 的 display-only metadata
   - Agent-executed prompts、skill instructions、design systems 和 prompt bodies 保持 source language，以便 prompt QA 集中维护

9. **运行 checks：**
   ```bash
   pnpm typecheck  # Confirms locale union and DICTS map agree
   pnpm i18n:check  # Enforces UI locale registration and README switcher consistency
   pnpm --filter @open-design/web test  # Covers locale/content drift tests
   ```

### Translation Best Practices

**需要翻译：**
- ✅ 所有 prose text、headings、descriptions
- ✅ 图片 alt text：`alt="Open Design banner"` → `alt="Banner di Open Design"`
- ✅ 适当时翻译 badge labels：`discord-join` → `discord-unisciti`
- ✅ examples 中有教学意义的 code comments
- ✅ Link text：`[Quickstart](../../QUICKSTART.md)` → `[Guida rapida](QUICKSTART.it.md)`（如果 `docs/i18n/` 中存在 sibling translation 就指向它；否则保留英文目标 `../../QUICKSTART.md`）

**不要翻译：**
- ❌ Code snippets（commands、file paths、variable names）
- ❌ URLs 和 domain names
- ❌ GitHub usernames 和 repository names
- ❌ Brand names："Open Design"、"Claude Code"、"Anthropic"、"Vercel"
- ❌ 没有标准译法的 technical terms：CLI、API、SDK、BYOK、daemon、sidecar、monorepo、artifact、iframe
- ❌ Command output（保持 terminal output 与实际软件中的英文一致）

**Terminology guidelines：**
- 如果没有标准译法，首次使用时用英文术语并在括号里简短解释：
  ```
  Open Design è un'alternativa open-source (codice aperto) a Claude Design.
  ```
- 对 regional variants（zh-CN vs zh-TW、pt-BR vs pt-PT），选择目标受众最能理解的变体
- 具体 glossaries 见 [Regional terminology](#regional-terminology) section

### Badge Translation

README 中的一些 badges 可以通过修改 badge URL 来本地化：

```markdown
<!-- English -->
<a href="https://discord.gg/mHAjSMV6gz"><img alt="Discord" src="https://img.shields.io/badge/discord-join-5865F2?style=flat-square&logo=discord&logoColor=white" /></a>

<!-- Italian -->
<a href="https://discord.gg/mHAjSMV6gz"><img alt="Discord" src="https://img.shields.io/badge/discord-unisciti-5865F2?style=flat-square&logo=discord&logoColor=white" /></a>
```

**翻译这些 badge labels：**
- Download button：`download` → 你的语言
- Quickstart badge：`quickstart` → 你的语言
- Discord：`join` → 你的语言

**这些 badges 保持英文：**
- GitHub stats（stars、forks、issues、PRs、contributors、commits）
- Version numbers 和 release info
- License
- Technical counts（agents、skills、design systems）

---

## 🌍 Regional Terminology

### General Guidelines

Translations 应遵循目标地区 tech writing community 的惯例。Maintainers 信任 contributors 做出 idiomatic choices，不会在 style 上 gate-keep。

**保持英文的 technical terms：**
- Open Design、Claude Code、Claude Design
- Skills、Design Systems
- BYOK (Bring Your Own Key)
- CLI、API、SDK
- Daemon、sidecar
- Monorepo、workspace
- Artifact、iframe
- Git、GitHub、Vercel

**有标准译法时翻译：**
- "local-first" → 对应语言的等价说法
- "open-source" → 对应语言的等价说法
- "installation" → 对应语言的等价说法
- "quickstart" → 对应语言的等价说法
- "settings" → 对应语言的等价说法

### French (`fr`) Glossary

French UI copy 应让 technical product audience 自然阅读，同时不要把 product/runtime terms 翻成模糊的法语近似。以下规则在 `apps/web/src/i18n/locales/fr.ts`、French core docs 和 French display metadata 中保持稳定。

#### Keep in English

Names、protocols、commands、environment variables、code identifiers、package names、file extensions，以及用英文更清晰的 technical runtime nouns 保持 exact English/token form：

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

在保留术语周围使用 French grammar：

- `le daemon local`, `un runtime`, `des plugins`, `les prompts`
- `l’API`, `un endpoint REST`, `un flux SSE`
- `la CLI locale`, `un serveur MCP`

#### Translate When Standard

当存在自然 French equivalent 时，翻译普通 UI terms、workflow labels 和非 identifier 的 product copy：

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

#### Context-Sensitive Choices

- 当 `Skill` 指 Open Design/Claude skill format 时保持 `Skill`。只有 "ability" 或 "capability" 这类泛义 prose 才翻译为 `capacité`。
- 当 `fork` 指 Open Design conversation-fork feature 或相关 product/CLI 文案时保持 `fork`。Git branches 翻译为 `branche`，但不要把 product action 改写成 branch。
- 当 `Design System` 指 product registry/object name 时可以保持 `Design System`。在解释性 prose 中，如果能提升可读性，也可用 `système de design`。
- 当 `Craft` 指 repository 的 `craft/` extension point 或匹配的 UI label 时保持 `Craft`。不要把这个 feature name 翻成 generic polish/finishing pass。
- 当 `SOTA Harness` 和 `Harness` 指 Open Design product/runtime harness concept 或匹配的 marketing label 时保持英文。
- Motion-design jargon，例如 `motion`、`timing`、`easing`、`fallback` 和 `timeline`，在 compact UI labels 或 agent-workflow prompts 中可保持英文，因为这些术语是 design-domain vocabulary。
- `runtime` 作为 noun 时保持 `runtime`。像 "execution mode" 这样的 labels 仍可用 `mode d’exécution`。
- Provenance labels 中的 `source` 可保持 `source`，但普通 "data source" 翻译为 `source de données`。
- 不要翻译 command output 或用户应在 terminal 中精确看到的 examples。
- 不要翻译 UI input hints 中 copy-paste-safe 的 parser tokens 或 operators。当用户可能把 `kind`、`limit`、`scale`、`selector`、`columns`、`maxWidth` 和 `gap` 这类 literals 粘贴进字段时，保持原样。

### zh-CN ↔ zh-TW Glossary

在 Simplified 和 Traditional Chinese 之间转换时，zh-TW 优先使用台湾特定说法，而不是只做字符转换。此列表来自 [PR #194](https://github.com/nexu-io/open-design/pull/194)，是起点而非硬性 rulebook。

**Tooling:** [OpenCC](https://github.com/BYVoid/OpenCC) 搭配 `s2twp.json` 能自动处理多数核心术语。下面的 idiomatic table 是需要 human review 的部分。

#### Core terms (automated by OpenCC)

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

#### Idiomatic / domain-specific (requires human judgment)

这些 mappings 在 #194 中需要 human judgment；OpenCC 不会捕捉它们。它们**最值得记录**，因为下一个 translator 会遇到同样选择：

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

### Portuguese: pt-BR vs pt-PT

**Brazilian Portuguese (`pt-BR`)** 与 European Portuguese 差异很大：

| English    | pt-BR      | pt-PT (avoid) |
| ---------- | ---------- | ------------- |
| app        | aplicativo | aplicação     |
| screen     | tela       | ecrã          |
| download   | baixar     | descarregar   |
| mouse      | mouse      | rato          |
| to click   | clicar     | clicar        |

`pt-BR` translations 使用 Brazilian Portuguese。如果 contributor 想添加 European Portuguese，使用 code `pt-PT`。

### Spanish: `es-ES` (Spain)

已发布 UI locale 是 **`es-ES`**，label 为 `Español (España)`，因此 dictionary 和 root README 面向 European Spanish。README filename `README.es.md` 是 docs-precedent code，与 UI code 不同（见 [adding a new locale](#adding-a-new-locale) step 对该 pattern 的说明）；两个 surfaces 描述的都是同一个 Spain Spanish locale。

| English    | es-ES (use)  | Avoid (Latin American) |
| ---------- | ------------ | ---------------------- |
| computer   | ordenador    | computadora (LatAm)    |
| app        | aplicación   | app (anglicism)        |
| to download| descargar    | bajar (informal)       |
| file       | archivo      | fichero (dated Spain)  |
| mobile     | móvil        | celular (LatAm)        |

如果 contributor 想添加 neutral 或 Latin American Spanish，请在 follow-up PR 中提出 separate locale（例如 `es-419`）。不要让 `es-ES` drift 到另一个 regional variant；既有 `Español (España)` label 已经设定 reader expectations。

### Arabic: RTL and Technical Terms

**Arabic (`ar`)** 使用所有 Arabic-speaking regions 都能理解的 Modern Standard Arabic (MSA)：

- 使用 right-to-left (RTL) text direction；**Markdown 会自动处理 `README.*.md` files**
- **web UI 需要手动注册**：把 locale code append 到 [`apps/web/src/i18n/index.tsx`](apps/web/src/i18n/index.tsx) 中的 `RTL_LOCALES`（当前为 `['ar', 'fa']`），否则 `<html dir="rtl">` 永远不会设置，UI 会按 LTR 渲染
- Technical terms 通常保留英文并附 Arabic explanation
- Technical content 中 numbers 和 dates 可以使用 Western Arabic numerals（0-9）
- Code blocks 和 URLs 保持 left-to-right

**Example:**
```markdown
Open Design هو البديل مفتوح المصدر لـ Claude Design
```

### Other Languages

其他 CJK / RTL glossaries 可随着 locales 成熟扩展本 section。不要预先填空表；当 contributor 真的遇到未来 PRs 也会遇到的 terminology choice 时，再添加一行。

---

## ✅ Testing Your Translation

提交 PR 前，先验证：

### 1. Visual Check

在 GitHub preview 或本地 Markdown viewer 中打开 translated README：
- ✅ Language switcher 显示正确
- ✅ 所有 links 可用（无 404）
- ✅ Images 能加载
- ✅ Code blocks 正常渲染
- ✅ Tables 对齐
- ✅ Badges 显示
- ✅ RTL text 正确流动（Arabic、Persian 等）

### 2. Link Validation

检查所有 internal links 指向存在的文件：

```bash
# Example: verify Italian links (translations live in docs/i18n/)
grep -o 'README\.[a-z-]*\.md' docs/i18n/README.it.md | sort -u
grep -o 'QUICKSTART\.[a-z-]*\.md' docs/i18n/README.it.md | sort -u
grep -o 'CONTRIBUTING\.[a-z-]*\.md' docs/i18n/README.it.md | sort -u
```

所有 linked files 都应存在于 repository 中。Sibling translations 相对于 `docs/i18n/` 解析；English sources 通过 `../../` prefix 解析。如果 translated file 尚不存在，就链接到 `../../` 下的 English version。

### 3. Language Switcher Audit

验证新文件中的 language switcher：
- ✅ 列出所有 supported languages
- ✅ 当前语言加粗：`<b>Italiano</b>`
- ✅ 其他所有语言都是 links（从 `docs/i18n/` 文件指向 sibling `<a href="README.es.md">`；从 root `README.md` 指向带 `docs/i18n/` prefix 的路径）
- ✅ Links 使用正确 file names（例如 `README.ja-JP.md`，不是 `README.ja.md`）
- ✅ 顺序匹配 standard order

### 4. Consistency Check

与 English version 比较结构：
- ✅ section 数量相同
- ✅ heading hierarchy 相同（H1、H2、H3）
- ✅ code examples 相同（不翻译）
- ✅ images 和 badges 相同（alt text 已翻译）
- ✅ 没有缺失或额外内容

### 5. Run Automated Checks

```bash
# Type check (if you added UI dictionary)
pnpm typecheck

# i18n structural checks
pnpm i18n:check

# Web package tests (if you added UI dictionary)
pnpm --filter @open-design/web test
```

提交 PR 前，所有 checks 必须通过。

---

## 📤 Submitting Your Translation

### PR Title Format

```
feat(i18n): add [Language] translation
```

**Examples:**
- `feat(i18n): add Italian translation`
- `feat(i18n): add Swedish translation`
- `feat(i18n): add Vietnamese translation`

### PR Description Template

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
- [x] docs/i18n/README.ar.md
- [x] docs/i18n/README.de.md
- [x] docs/i18n/README.es.md
- [x] docs/i18n/README.fr.md
- [x] docs/i18n/README.ja-JP.md
- [x] docs/i18n/README.ko.md
- [x] docs/i18n/README.pt-BR.md
- [x] docs/i18n/README.ru.md
- [x] docs/i18n/README.tr.md
- [x] docs/i18n/README.uk.md
- [x] docs/i18n/README.zh-CN.md
- [x] docs/i18n/README.zh-TW.md

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

### Review Process

**强烈偏好 native-speaker review，但它不是 blocking。** 如果约 7 天内没有 native speaker review，且 CI passes，maintainers 可以带 `nit` label merge locale PR。后续修正欢迎作为 separate PR 提交。

> 7-day window 只是起点，不是硬 policy。请根据 locale contributor availability 和 change size 调整。

## 🔄 Maintaining Existing Translations

### When English Content Changes

English source 改变时，translations **不会自动更新**。这是有意设计；我们宁愿保留稍微过时的翻译，也不想接受 machine-translated 内容。

**如果发现 outdated content：**
1. 检查 English version 的 recent commits
2. 更新 changed translated sections
3. 提交 PR，title 为：`fix(i18n): update [Language] translation`

**你不需要：**
- 持续监控 English changes
- 立刻更新 translations
- 翻译每个 minor edit

### Maintenance Workflow

当 PR 改动 English copy 时，检查哪个 surface 变化了，并有意识地更新匹配的 translated surfaces：

- **UI chrome:** 先更新 `apps/web/src/i18n/locales/en.ts`，然后在该 PR 拥有此次 refresh 时，把 translated values 加到 active locale dictionaries。Partial dictionaries 可以通过 `...en` 继承 English。
- **README:** 保持 root `README.md` 和每个 `docs/i18n/README.*.md` 中的 language switchers 同步。Refresh 时，对照 English `README.md` 检查 badge counts、Quickstart links、supported agent lists 和 release/download links。
- **Core docs:** 当 locale 维护这些 docs 时，让 translated `docs/i18n/QUICKSTART.*.md` 和 `docs/i18n/CONTRIBUTING.*.md` 与 English source（root 中的 `QUICKSTART.md`、`CONTRIBUTING.md`）保持一致。
- **Display metadata:** 当 locale 维护 display metadata 时，随着 `content.ts` 一起更新 `apps/web/src/i18n/content*.ts`。

### Automated Checks

**P0 check（CI 中 hard-fail）：**
```bash
pnpm i18n:check
```

它会强制检查：
- UI locale registration
- Root README switcher consistency
- Root README links to translated core docs

这些是 structural issues，merge 前必须修复。

### Known Drift

若干 translated READMEs 当前在以下方面落后 English：
- Badge counts
- Supported agent lists
- Quickstart/download links

这些会在 focused PRs 中清理。见下方 [Backport policy](#backport-policy)。

---

## 📋 Backport Policy

当 English README 或 UI dict 获得新 sections/keys 时，contributors **不要求** backport。Runtime 中 English fallback 会覆盖 missing keys。Locale maintainers（volunteers，通常是最初作者）建议在 follow-up PR 中 refresh。

**保持 refresh PRs 聚焦：每个 PR 一个 locale，不混入 feature work。**

### Drift Threshold

当满足以下任一条件时，locale 被视为 drifted：

- 与 `en.ts` 相比有 **≥20 untranslated UI keys**（目前用 key-diff 手动检查；CI warning 作为 follow-up 跟踪，见 [Open questions](#open-questions)），**或**
- English README 或 dict 已改变，但 **6+ months 没有 refresh PR**

这些是把 locale 移到 **stale** status（见下方）的 tripwires；它们不是 auto-rejection rules。

### Stale Locales

我们不删除 locales。当 locale 触发上述 drift tripwire：

1. 在 [Supported Languages](#-supported-languages) table 中该行添加 `⚠️ Stale (last refreshed YYYY-MM)` cell。
2. 在该 locale 的 `.ts` file 顶部加 frontmatter comment：

   ```typescript
   // ⚠️ Stale: last refreshed 2025-09. See TRANSLATIONS.md.
   export const fr: Dict = { ... };
   ```

3. Locale 继续 compile 和 render；读者仍能得到部分翻译 UI，这比移除它更好。

新的 contributor 可以通过提交 refresh PR 接手；当 drift threshold 回到可控范围内时，markers 移除。

### Partial Translations

一开始只翻译 README 也可以。之后有时间再添加 QUICKSTART 和 CONTRIBUTING。

**在 PR 中标记 partial translations：**
```markdown
## Translation Status
- [x] docs/i18n/README.it.md (complete)
- [ ] docs/i18n/QUICKSTART.it.md (planned)
- [ ] docs/i18n/CONTRIBUTING.it.md (planned)
```

---

## ❓ FAQ

### Q: Which file should I translate first?

**A:** 永远从 `README.md` 开始。它是用户首先看到的文件，影响最大。然后添加 UI dictionary，再添加 QUICKSTART，最后添加 CONTRIBUTING。

### Q: Do I need to translate code comments in examples?

**A:** 如果它们是 instructional，就需要；如果它们是实际 code output 的一部分，就不需要。

```bash
# English
pnpm tools-dev  # Start the development server

# Italian
pnpm tools-dev  # Avvia il server di sviluppo
```

### Q: Should I translate command output?

**A:** 不要。Command output 保持与实际软件中显示的一样，即英文。

```bash
# Keep this in English
$ pnpm tools-dev
Starting daemon on port 17456...
Web server running at http://localhost:17573
```

### Q: What if my language doesn't have a word for "open-source"?

**A:** 首次使用时保留英文并在括号里简短解释：

```markdown
Open Design è un'alternativa open-source (codice aperto) a Claude Design.
```

首次之后，可以只使用英文术语。

### Q: How do I handle right-to-left (RTL) languages like Arabic?

**README:** Markdown 和 GitHub 会自动处理 RTL text direction；自然使用你的语言书写，并保持 code blocks / URLs left-to-right。

**UI locale:** web app 不会 auto-detect。你必须把 locale code append 到 [`apps/web/src/i18n/index.tsx`](apps/web/src/i18n/index.tsx) 中的 `RTL_LOCALES`（当前为 `['ar', 'fa']`）。没有这一步，`<html dir="rtl">` attribute 永远不会设置，UI 会按 LTR 渲染。见 [detailed steps](#adding-a-new-locale) step 2。

```markdown
<!-- README: Arabic text flows RTL automatically -->
Open Design هو البديل مفتوح المصدر لـ Claude Design

<!-- Code blocks stay LTR -->
```bash
pnpm tools-dev
```
```

### Q: Can I use machine translation?

**A:** Machine translation 可以作为起点，但你**必须**仔细 review 和 edit。目标是 native-quality translation。Reviewers 会检查 machine-translation artifacts，例如：
- 不自然的 phrasing
- 错误 technical terms
- 缺少 context
- 不通顺的 literal translations

### Q: What if I find an error in the English version?

**A:** 先在 separate PR 中修复 English version，再更新 translations。不要传播错误。

### Q: Should I translate the CHANGELOG?

**A:** 不要。CHANGELOG 只保持英文。它是面向 maintainers 的 technical document。

### Q: How do I handle version numbers and dates?

**A:** Version numbers 保持英文格式（`v1.0.0`）。Dates 可以本地化：
- English：`2026-05-12` 或 `May 12, 2026`
- Italian：`12 maggio 2026`
- Japanese：`2026年5月12日`
- Spanish：`12 de mayo de 2026`

### Q: What about the language switcher order?

**A:** 遵循 [Step 3](#step-3-update-all-language-switchers-critical) 中显示的 standard order。新语言放到末尾。

### Q: Can I add a language that's not on the list?

**A:** 可以。按本指南操作并提交 PR。我们欢迎所有语言。

### Q: Who reviews translation PRs?

**A:** 理想情况下由 native speaker 或 fluent reviewer review。如果没有 native reviewer，maintainers 会检查结构，并在约 7 天后根据 community feedback merge。

### Q: What if I only want to translate the README, not the UI dictionary?

**A:** 完全可以。README-only translations 也很有价值。你可以稍后添加 UI dictionary，也可以由其他 contributor 添加。

### Q: How do I know if my translation is good enough?

**A:** 问自己：
- Native speaker 能自然理解吗？
- 它听起来像是用这种语言写成的，而不是翻译腔吗？
- Technical terms 使用正确吗？
- 我愿意把它展示给同事看吗？

如果这些答案都是 yes，就足够好了。

### Q: Can I update an existing translation that has errors?

**A:** 可以。提交 title 为 `fix(i18n): improve [Language] translation` 的 PR，并在 description 中说明修复了什么。

---

## 🆘 Getting Help

- **有问题？** 开一个 [GitHub Discussion](https://github.com/nexu-io/open-design/discussions)
- **发现 issue？** 开一个 [GitHub Issue](https://github.com/nexu-io/open-design/issues)
- **想聊天？** 加入我们的 [Discord](https://discord.gg/mHAjSMV6gz)
- **需要 review？** 在 PR 中 tag `@nexu-io/maintainers`

---

## 🎯 Open Questions

真正尚未决定的问题；列在这里是为了让 contributors 知道它们仍是 live design discussions：

- **Source-of-truth drift CI.** 一个 `pnpm i18n:diff` script，对比每个 locale 的 keys 和 `en.ts`，当 locale 超过 20-key drift threshold 时 warn（不 fail）。此 doc 落地后作为 follow-up 跟踪。
- **README freshness signal.** 在每个 `README.<code>.md` 上添加小 badge 或 front-matter timestamp，可能帮助读者判断翻译的新鲜程度。
- **Native-speaker review window.** `~7 days` 对较小语言社区来说是否太短；如果真实数据表明需要调整，就调整。

如果你对上述任一问题有意见，请 open an issue，或在 [#195](https://github.com/nexu-io/open-design/issues/195) comment。

---

## 🚧 Deferred Decisions

这些事项已**决定 defer**；团队同意现在不采取行动，并列出大致 revisiting triggers：

- **Translation memory tooling**（Crowdin / Weblate / Lingui）。当 project 达到约 12-15 个 active locales，**或** contributors 开始明显在 PRs 之间重复劳动时，重新评估。
- **README template-driven generation**（例如 [NRG](https://github.com/nanolaba/readme-generator)、custom `.src.md` build scripts、All Contributors-style tooling）。当 project 达到 ≥15 locales，**或** README structural edits 比每月一次更频繁时，重新评估。[#195](https://github.com/nexu-io/open-design/issues/195) 中的讨论：template-driven generation 能解决“在 10 个 README variants 中更新第 27 行”的脆弱性，但会强制共享结构，而今天的 locale variants 有意存在差异（例如 `README.zh-TW.md` 的 "上手體驗" section，以及 pt-BR / pt-PT 在 content-level 而不只是 translation-level 上存在差异的 precedent）。等 locale voice 更稳定，或手动更新成本更高时，值得重新讨论。

---

## 🙏 Credits

感谢所有 translation contributors！🌍

每一份翻译都让 Open Design 能被全球更多 developers 使用。

**当前 contributors：**
- 完整列表见 [Contributors](https://github.com/nexu-io/open-design/graphs/contributors)

---

**准备贡献了吗？** 选择一种语言，按 [Quick Start](#-quick-start-adding-your-language-in-5-steps) 操作，然后提交 PR。我们很期待看到你的语言版本的 Open Design！🚀
