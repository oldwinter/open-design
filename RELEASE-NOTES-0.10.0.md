🎨 **`141 PRs` · `50 contributors` · `2 days`** — **一体化 Agentic 设计工作区。** 0.9.0 把 AI 引擎交到每个人手里；0.10.0 让 Open Design 成为设计师唯一需要打开的窗口。完整创作流程现在都在一个地方：从模糊想法出发，发现参考、收集原始素材、交互式编辑、排队记录评论、打磨 motion 与 animation，并把结果交给 editor 或 Code Agent 进入生产，**全程无需离开应用。** 你还可以把评论投进队列、同时跑多个 session、并行收集素材，于是它不再像一个 assistant，而更像是**一整支本地设计团队在为你工作。** 🚀

## 🔥 Highlights

- 🎨 **设计工作区：整个创作流程只需一个窗口。** 0.10.0 的核心是一轮庞大的整合（211 个文件，+36k 行），把 project view 变成真正的一体化 studio。**Lexical-powered composer** 让 `@mentions` 变成原子 pill，并提供锚定 caret 的 mention/slash popover；**interactive terminals** 在 chat 旁边直接运行 session；**comments 支持拖拽图片和 note attachment**；带 page capture 的**浏览器式 reference board** 可把外部参考直接拉进 project；你还可以从任意 message **fork conversation**。发现、收集、编辑、review，无需切换工具。#3516，感谢 `@pftom`。
- 💬 **以思考速度评论，并进入队列。** Run 仍在进行时也可以发送 preview comments；评论会排队，deck markers 固定在原位，不再被上一轮未完成阻塞。#3314、#3347，感谢 `@CtriXin`、`@zoeforfun`。
- 🗂️ **自带 model，并行收集素材。** 完整 BYOK 流程落地：在字段内验证 API key、保存前做 draft validation、优先使用从账号实时拉取的 models，并追踪配置结果；跨 provider 支持多个 session 同时拉取素材。#3506、#3484、#3510、#3505、#3564，感谢 `@zoeforfun`。
- 🧭 **从 idea 到 discovery，问题不再挡路。** Discovery questions 移到右侧专用 Questions tab；对未修改的 example prompts 完全跳过；generation 现在流式输出 **staged preview feedback**，你能看着设计成形，而不是等待一个黑盒。#3355、#3257、#3227，感谢 `@elihahah666`、`@zoeforfun`。
- ✏️ **稳定停留的交互式编辑。** Manual-edit inspector 改为固定显示，不再 hover flicker；edit canvas 填满全高；composer caret 终于与 mention overlay 对齐。#3438、#3398、#3392，感谢 `@zoeforfun`、`@daltonnyx`、`@portseif`。
- 🎞️ **全产品的打磨与 motion。** 产品级 UI animation 用有意图的 motion 取代生硬跳变；chat surface 获得完整视觉翻新，并加入 live-streaming code card。#3294、#3382，感谢 `@elihahah666`。
- 🤝 **交给 editor 或 Code Agent 进入生产。** Sandbox runtime foundation、run-scoped MCP tool bundles、project export manifest 和 contained project preview URLs，为把设计带出 studio、进入真实业务生产打下基础；editor hand-off 现在会真实 reveal，而不是走到死胡同。#3242、#3244、#3245、#3246、#2494，感谢 `@dredozubov`、`@leessju`。
- 🩺 **Run 出错时，你能看到原因。** 可识别的 generation-failure cause 与上下文恢复、带 Langfuse correlation 的 run-failure classification、prompt-stack diagnostics、safe-retry policy contracts，把神秘失败变成可以追踪的问题。#3397、#3412、#3557、#3569，感谢 `@zoeforfun`、`@yinjialu`、`@Siri-Ray`。
- 🧩 **给团队和社区一个前门。** Community page 拆分为 hub 与 Contributors / Ambassadors / Moderators，homepage hero 刷新，并新增可自动反映最新 release 的 `/download` 页面。#3491、#3444、#3538，感谢 `@leilei926524-tech`、`@LeonWang-52`、`@522700967-wq`。
- ⚡ **更轻、更快的 landing。** Hero decoration 走 Image Resizing，payload 缩小约 92%。#3523，感谢 `@lefarcen`。
- 🔒 **Security。** 修复了易受攻击的 `tmp` 传递依赖。#3379，感谢 `@gateway`。

> 📥 **Download:** `open-design-v0.10.0` 的 assets 由 nightly pipeline 构建，并在构建完成后发布到 GitHub Releases 和 `releases.open-design.ai`，包括 macOS arm64/Intel `.dmg` 与 Windows x64 installer。

## ✨ Added

### 🎨 Studio, editing & canvas
- **产品级 UI animations。** #3294，感谢 `@elihahah666`。
- **重做 chat UI，并加入 live-streaming code card。** #3382，感谢 `@elihahah666`。
- **设计工作区**（211 个文件，+36k 行）：包含原子 `@mention` pills 的 Lexical composer、chat 旁的 interactive terminals、拖拽 comment attachments、带 page capture 的 browser reference board、conversation forking 和共享 tooltip system；背后由新的 `terminals` / `community` / `social-share` contracts 与 SQLite migrations 支撑。#3516，感谢 `@pftom`。
- **Generation 期间的 staged preview feedback。** #3227，感谢 `@zoeforfun`。
- **Pinned manual-edit inspector**，替代 hover-switching。#3438，感谢 `@zoeforfun`。

### 🔑 BYOK, models & media
- **字段内 BYOK API-key validation**、**draft validation**、**fetched account models** 和 **configuration-outcome tracking**。#3506、#3484、#3510、#3505，感谢 `@zoeforfun`。
- CLI 中的 **MMS redesign workflow**。#3311，感谢 `@CtriXin`。

### 🧠 Agents, runtimes & sandbox
- **Sandbox runtime foundation**、**run-scoped MCP tool bundles**、**project export manifest** 和 **contained project preview URLs**。#3242、#3244、#3245、#3246，感谢 `@dredozubov`。
- 面向用户保存模板的 **`od templates` CLI subcommand**。#2428，感谢 `@YOMXXX`。
- **Reference design contract** skill 和新的 **Hallmark** community skill。#3321、#3479，感谢 `@CtriXin`、`@Tuola-waj`。

### 🏠 Home, projects & landing
- Desktop 上的 **Help menu Contact / Report / Discord links**。#3284，感谢 `@lefarcen`。
- **平台感知 direct-download CTAs**、自动反映最新 release 的 **`/download` page**，以及带新 logo 和 statue collage 的**刷新版 homepage hero**。#3402、#3538、#3444，感谢 `@elihahah666`、`@522700967-wq`、`@LeonWang-52`。
- Landing 上的 **AMR header entry**。#3385，感谢 `@jinmeihong0201-gif`。
- 带 Contributors / Ambassadors / Moderators 子页面的 **Community hub**。#3491，感谢 `@leilei926524-tech`。
- **Configurable project locations。** #2041，感谢 `@coconilu`。

### 📊 Diagnostics & reliability
- **可识别的 generation-failure cause 与 contextual recovery。** #3397，感谢 `@zoeforfun`。
- **Run-failure classification with Langfuse correlation**、**prompt-stack diagnostics** 和 **safe-retry policy contracts**。#3412、#3557、#3569，感谢 `@yinjialu`、`@Siri-Ray`。
- **Launch-review regression coverage** 和扩展后的 **project + onboarding coverage**。#3300、#3513，感谢 `@AmyShang-alt`。

### ☁️ Deployment & docs
- **Production-ready CloudFormation template**、**Azure Container Instances guide** 和 **Alibaba Cloud (阿里云) deployment guide**，并把 Docker section 同步到所有翻译 README。#3011、#3163、#3275、#3228，感谢 `@shaarron`、`@shivam2931120`、`@crimsondhaks`、`@RoverKai`。

## 🔁 Changed

- **简化 BYOK settings flow**，并抽出 BYOK settings fields。#3564、#3480，感谢 `@zoeforfun`。
- **对未修改的 example prompts 跳过 discovery questions。** #3257，感谢 `@elihahah666`。
- **Refactors:** 共享 web UI primitives #2879，以及 project chrome header 合并进 workspace rows #3447。感谢 `@mrcfps`、`@elihahah666`。
- **修整 Studio share-menu hierarchy。** #3266，感谢 `@zoeforfun`。
- **AMR engine** 升级到 vela-cli 0.0.10。#3577，感谢 `@alchemistklk`。
- **通过 Codex 做 editor polish:** 为 hex output 添加 inline color swatches、降低 composer input lag、居中 home wordmark、隐藏 placeholder cost values，并让 workspace tabs 与 shell edge 对齐。#3467、#3466、#3472、#3498、#3501，感谢 `@Sid-Qin`。

## 🐛 Fixed

### 🎨 Editing, preview & comments
- **Run 期间 queue preview comments**，并在 busy 时固定 deck markers。#3314、#3347，感谢 `@CtriXin`、`@zoeforfun`。
- **跨 tools 保留 preview scroll**、**cross-origin-safe draw scroll** 和 **full-height manual-edit canvas**。#3313、#3312、#3398，感谢 `@CtriXin`、`@daltonnyx`。
- **Composer caret 与 mention overlay 对齐**、tools-menu mousedown 时**不重置 caret**，并**保持 pet composer menu 展开**。#3392、#3368、#3336，感谢 `@portseif`、`@estelledc`、`@ramarivera`。
- **用 chips 移除 design-file mentions**、chip strip 清空时**修剪 draft tokens**，以及**从 tools panel 插入 skill references**。#3204、#3356、#3220，感谢 `@mturac`、`@estelledc`、`@xxiaoxiong`。
- **IME Enter key** 优先信任 `compositionEnd` 而不是 `isComposing`，并让**已 dismiss 的 todo-card 状态跨 tab 切换保持**。#3432、#3515，感谢 `@xxiaoxiong`。
- **加固 image export downloads**，并**向 Anthropic proxy 发送 image attachments**。#3318、#3273，感谢 `@RyanCheng77`。

### 🧠 Agents, runtimes & daemon
- **约束 sandbox project roots 与 host discovery**，并**加固 sandbox orchestration chokepoints**。#3243、#3420，感谢 `@dredozubov`。
- **暴露 OpenCode usage-limit / provider failures** 而不是裸 timeout，**通过 stdin 交付 OpenCode memory extraction**，并**把 OpenCode model-list timeout 提高到 15s**。#3316、#3238、#3394，感谢 `@whoughton`、`@Felipe2077`。
- **Normalize cumulative ACP message chunks**、**容忍 multiline ACP startup**、**dedupe Claude stream wrappers**，并**暴露 Pi turn errors**。#3333、#3363、#3334、#3349，感谢 `@ramarivera`、`@mturac`、`@RyanCheng77`。
- **Finalize canceled daemon runs**、**用 runtime source-of-truth 验证 `skillId`**，并**允许 Codex sandbox override**。#3364、#3293、#3288，感谢 `@alucero270`、`@YOMXXX`、`@YUHAO-corn`。
- **处理 Gemini stream-json tool events**、**捕获 Antigravity diagnostic logs**，并**加固 local CLI prompt routing**。#3457、#3395、#3452，感谢 `@YOMXXX`、`@AriaShishegaran`。
- **检测并终止所有 agent path 中伪造的 role markers。** #3303，感谢 `@JasonBroderick`。

### 🏠 Web, landing & platform
- **保留 newly created project routes**、**跨导航持久化 design-files view state**，并**保留 bulk-edit file paths**。#2159、#2303、#3475，感谢 `@bulai0408`、`@neogenix`、`@PerishCode`。
- **移除 card variants 和 HomeHero example card 上的 stray overlay icons**、**截断长文件名 / project names**，并**为 home-hero select menu 套主题**。#3453、#3369、#3370、#3317、#3309，感谢 `@israad1`、`@estelledc`、`@YOMXXX`、`@CtriXin`。
- 没有 editors 时的**真实 hand-off reveal**，以及更严格的 **Comment-scope constraint**。#2494、#2796，感谢 `@leessju`。
- **搜索 mise shim dirs**，让 mise 安装的 CLIs 可被检测；在 WSL 上通过 explorer.exe 路由 `shell:open-path`；**发现 tools-dev daemon URL**；fresh install 后**链接 `od` bin**。#3319、#3298、#2807、#2069，感谢 `@ramarivera`、`@YOMXXX`、`@VIVAAN-DHAWAN`、`@bulai0408`。
- **本地化 scheduled-routine empty-output errors**、**显示累计 conversation duration**，并**在 AMR wallet 上保留 auth redirects**。#3022、#3354、#3449，感谢 `@leno23`、`@Lanzhou3`、`@lefarcen`。
- **保护 BYOK provider model-cache keys**、**隐藏 OpenAI OAuth-only image credentials**，并**解释 Composio custom-auth requirement**。#3286、#3308、#3464，感谢 `@YUHAO-corn`、`@CtriXin`、`@bulai0408`。
- **Self-contained Dockerfile**（stage-2 asset copies 移入 build stage）和 design-system tool routes 的 **bound DB param**。#3350、#3418，感谢 `@chasekafei`、`@justasdev`。
- **对齐 homepage footer 的 Plugins column 与 nav**，并将旧 `/skills` `/systems` `/templates` **301 到 `/plugins`**。#3437、#3352、#3386，感谢 `@522700967-wq`。

## 🙏 感谢所有参与 0.10.0 的贡献者

`@2YoungKim` · `@522700967-wq` · `@AmyShang-alt` · `@AriaShishegaran` · `@CtriXin` · `@Felipe2077` · `@JasonBroderick` · `@Lanzhou3` · `@LeonWang-52` · `@PerishCode` · `@RoverKai` · `@RyanCheng77` · `@Sid-Qin` · `@Siri-Ray` · `@Tuola-waj` · `@VIVAAN-DHAWAN` · `@YOMXXX` · `@YUHAO-corn` · `@alchemistklk` · `@alucero270` · `@bulai0408` · `@chasekafei` · `@coconilu` · `@crimsondhaks` · `@daltonnyx` · `@dredozubov` · `@elihahah666` · `@estelledc` · `@gateway` · `@israad1` · `@jinmeihong0201-gif` · `@justasdev` · `@leessju` · `@lefarcen` · `@leilei926524-tech` · `@leno23` · `@mrcfps` · `@mturac` · `@neogenix` · `@nettee` · `@pftom` · `@portseif` · `@ramarivera` · `@sdanpo` · `@shaarron` · `@shivam2931120` · `@whoughton` · `@xxiaoxiong` · `@yinjialu` · `@zoeforfun`

_以及在后台运行的 0.9.0 release tooling、contributor-wall 和 metrics automation。_
