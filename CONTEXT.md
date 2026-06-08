# Open Design

Open Design 是 local-first design workspace，其中 project 包含生成的 design files 和 agent conversations。本 glossary 只记录 domain language，不记录 implementation details。

## Language

**Project**:
包含 conversations 和 design files 的顶层 design workspace。
_Avoid_: repo, folder, session

**Normal Artifact**:
由 artifact entry file 及其 artifact manifest 表示的 project design output。
_Avoid_: live artifact, generic file upload

**Live Artifact**:
可刷新的 project design output，以包含 source data 和 preview state 的 live-artifact record 存储。
_Avoid_: normal artifact, static artifact

**Artifact Entry File**:
用于打开或渲染 normal artifact 的主要 project file。
_Avoid_: support file, asset, sidecar

**Artifact Manifest**:
用于识别某个 project file 是 normal artifact，并记录其 kind、renderer、exports 和 entry file 的 sidecar metadata。
_Avoid_: live-artifact document, project metadata

**Active Project**:
用户最近在 Open Design UI 中交互过的 project；当未指定 project 时，MCP tools 可以使用它。
_Avoid_: latest project, default project

**Home Composer Media Surface**:
仅用于 Home 的 composer intent，让 prompt card 在 project creation 前暴露 media-specific defaults。当前 media surfaces 是 `image`、`video`、`hyperframes` 和 `audio`；它们在 submit 时映射到既有 project kinds，而不是扩展 backend `ProjectKind` union。
_Avoid_: project kind, backend kind

**Chip Rail**:
Home prompt card 下方的一排 intent chips。用户按 Run 前，chip 会选择 composer surface、default scenario plugin、default option state 和 project kind stamp。
_Avoid_: plugin list, template list

**HyperFrames Composer Surface**:
显示在 Video 和 Audio 之间的独立 Home composer media surface，用于 HTML-based motion generation。它以 `kind: "video"` 和 `videoModel: "hyperframes-html"` 提交，让 persisted projects 保持既有 video backend shape，同时 Home UI 仍为 HyperFrames 提供自己的入口。
_Avoid_: new project kind, separate backend media kind

**Essential Audio Generation**:
Home Audio entry workflow，覆盖 product 在 v1 中能直接尝试的 audio capabilities。它包含 speech 和 sound effects，并在存在 integrated music generation path 前排除 music。
_Avoid_: audio studio, full music workflow

**Audio Source Field**:
Home Audio inline option，提供 generation 的 source content。Speech 使用 Text source，因为内容会被朗读；sound effects 使用 Prompt source，因为内容描述要合成的声音。
_Avoid_: generic subject field, hidden prompt text

**ElevenLabs Fallback Voice**:
当 Home Audio composer 无法加载已配置的 ElevenLabs voices 时显示的 default voice option。它选择 daemon 在未显式提供 voice 时使用的同一个 default voice id，从而保持 ElevenLabs speech 可运行。
_Avoid_: required credential setup, empty voice selector

**AMR Cloud**:
Open Design 官方 model router 的 user-facing cloud runtime option，显示在 onboarding 和 login-oriented product surfaces 中。
_Avoid_: Vela, local CLI label

**AMR CLI**:
用于通过已安装或 packaged native CLI 运行 AMR 的 local command-line runtime adapter。
_Avoid_: AMR Cloud, cloud account

**AMR CLI Distribution Contract**:
单独拥有的 release contract，提供 Open Design 可 package 的 native AMR CLI builds。
_Avoid_: Open Design release channel, package build step, source checkout

**AMR CLI Distribution Slice**:
当前通过 distribution contract 可用的一组 native AMR CLI platforms；slice 之外的平台不 bundle AMR CLI。
_Avoid_: Open Design supported platforms, release channel, future platform promise

**AMR Account Status**:
用户是否已认证使用 AMR Cloud 所需的 account。
_Avoid_: profile badge, environment, CLI version

**AMR Environment Profile**:
packaged runtime 被配置使用的目标 AMR service environment。
_Avoid_: release channel, account status, app identity

**Onboarding Skip**:
允许用户在未完成当前所选 setup option 的情况下离开 onboarding 的显式路径。
_Avoid_: continue, finish setup, passive close

## Relationships

- 一个 **Project** 包含零个或多个 **Normal Artifacts**。
- 一个 **Normal Artifact** 正好有一个 **Artifact Entry File**。
- 一个 **Normal Artifact** 正好有一个 **Artifact Manifest**。
- 一个 **Live Artifact** 属于某个 **Project**，但不同于 **Normal Artifact**。
- 当 caller 省略显式 **Project** 时，**Active Project** 可作为 MCP operations 的目标。
- 一个 **Home Composer Media Surface** 会在 submit 时把 user intent 映射到既有 project kind 和 project metadata。
- **Chip Rail** 是选择 **Home Composer Media Surface** 的可见 Home entry point。
- **Essential Audio Generation** 在创建 audio **Project** 前使用 **Audio Source Field** 加 model options。
- **AMR Cloud** 是 user-facing product choice；**AMR CLI** 是该 capability 后面的 local execution adapter。
- **AMR CLI Distribution Contract** 独立于 Open Design 拥有；Open Design release packaging 消费它，而不是自己定义 native CLI release。
- 第一个 **AMR CLI Distribution Slice** 仅为 mac arm64。
- **AMR Account Status** 描述 **AMR Cloud** 的 account readiness，而不是 environment profile 或 CLI installation state。
- **AMR Environment Profile** 独立于 release channel identity；beta、preview、nightly 或 stable package 在显式配置时都可以指向不同的 AMR service environments。
- **Onboarding Skip** 会绕过属于正常 onboarding continue path 的 setup completion requirements。

## Example dialogue

> **Dev:** "When a coding agent creates a Codex deck through MCP, should it create a live artifact?"
> **Domain expert:** "No. Unless the user asked for refreshable data, create a **Normal Artifact**: write the **Artifact Entry File** and persist its **Artifact Manifest** in the **Active Project**."

## Flagged ambiguities

- "artifact creation" 曾同时表示 **Normal Artifact** creation 和 **Live Artifact** creation；resolved：此 capability 只创建 **Normal Artifacts**。
