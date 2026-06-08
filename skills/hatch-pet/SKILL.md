---
name: hatch-pet
description: 从 character art、screenshots、generated images 或 visual references 创建、修复、验证、预览并打包 Codex-compatible animated pet spritesheets。当用户想孵化 Codex pet、创建 custom animated pet，或构建带 8x9 atlas、透明 unused cells、逐行 animation prompts、QA contact sheets、preview videos 和 pet.json packaging 的 built-in pet asset 时使用。此 skill 组合已安装的 $imagegen system skill 做视觉生成，并使用 bundled scripts 进行确定性的 spritesheet assembly。
triggers:
  - "hatch a pet"
  - "hatch pet"
  - "codex pet"
  - "spritesheet pet"
  - "animated pet"
  - "孵化宠物"
  - "电子宠物"
od:
  mode: image
  surface: image
  scenario: personal
  preview:
    type: image
    entry: final/spritesheet.png
  design_system:
    requires: false
  outputs:
    primary: final/spritesheet.png
    secondary:
      - final/spritesheet.webp
      - pet.json
      - qa/contact-sheet.png
  example_prompt: "Hatch me a tiny pixel-art shiba pet — friendly, sitting upright, with a small pomegranate prop. Use the hatch-pet skill end-to-end."
  upstream: "https://github.com/openai/skills/tree/main/skills/.curated/hatch-pet"
---

# Hatch Pet

> **Open Design integration.** 这是未修改的 Codex `hatch-pet` skill，
> vendored 到 `skills/hatch-pet/` 下，让任何 Open Design agent 都能运行。
> skill 完成 packaging 后，生成的 `spritesheet.webp`（位于
> `${CODEX_HOME:-$HOME/.codex}/pets/<pet-name>/` 下）可以通过
> **Settings → Pets → Import Codex sprite** 导入 floating pet companion。
> import flow 会自动检测 8×9 / `192×208` atlas，并让用户选择要播放的
> animation row（idle、running-right、waving 等）。


## 概览

根据 concept、一个或多个 reference images，或二者组合，创建 Codex-compatible animated pet。此 skill 负责 pet-specific prompt planning、animation rows、frame extraction、atlas geometry、QA、previews 和 packaging。视觉生成委托给 `$imagegen`。

User-facing inputs 都是可选的。如果用户没有提供 pet name，就从 concept 或 reference filenames 推断；如果无法推断，就选择一个简短合适的名称。如果用户没有提供 description，就从 concept 或 references 推断。如果用户没有提供 reference images，先从文本生成 base pet，再把该 base 作为每个 animation row 的 canonical reference。

## Generation Delegation

所有常规 visual generation 都使用 `$imagegen`。

生成 base art、row strips 或 repair rows 前，加载并遵循已安装的 image generation skill：

```text
${CODEX_HOME:-$HOME/.codex}/skills/.system/imagegen/SKILL.md
```

常规路径不要直接调用 Image API。让 `$imagegen` 自行选择 built-in-first path 和它自己的 CLI fallback rules。如果 `$imagegen` 表示某个 fallback 需要确认，继续前先询问用户。

从此 skill 调用 `$imagegen` 时，将生成的 pet prompt 作为权威 visual spec 传入。不要把它包进通用 `$imagegen` shared prompt schema，也不要额外添加 polish、hero-art、photo、product 或 illustration-style augmentation。Pet prompts 应保持简洁、sprite-specific、面向 digital-pet；只添加 input images 的 role labels 和必要 user constraint。

此 skill 的 scripts 只用于 deterministic work：准备 prompts 和 manifests、ingest 选定的 `$imagegen` outputs、extract frames、validate rows、compose final atlas、创建 QA media，以及 packaging。

硬边界：不要用 local Python/Pillow scripts、SVG、canvas、HTML/CSS 或其他 code-native art 来 create、draw、tile、warp、mirror 或 synthesize pet visuals，以替代 `$imagegen`。常规 pet run 最多预计 10 个 visual generation jobs：1 个 base pet 加 9 个 row-strip jobs。唯一例外是 `running-left`：只有在 `running-right` 已生成、已视觉检查，并明确确认 safe to mirror 后，才可通过镜像 `running-right` 派生。如果 mirroring 不合适，就把 `running-left` 作为常规 grounded `$imagegen` row 生成。如果这些调用过贵、被阻塞或不可用，就停止并说明 blocker，不要在本地伪造 row strips。

不要通过编辑 `imagegen-jobs.json`、把文件复制到 `decoded/`，或编写 helper scripts 填充 row outputs 来标记 visual jobs complete。对选定的 built-in `$imagegen` outputs 使用 `record_imagegen_result.py`；只有 documented secondary fallback 才使用 `generate_pet_images.py`。Deterministic scripts 只能处理已经生成的 visual outputs。

只有 base job 可以是 prompt-only。每个通过 `$imagegen` 生成的 row-strip job 都必须使用 `imagegen-jobs.json` 中列出的 input images，包括 base job 记录后创建的 canonical base reference。任何没有 attached grounding images 的 row generation 都视为 invalid。

## Codex Digital Pet Style

默认 pet art 应匹配 Codex app 的 built-in digital pets：小型 pixel-art-adjacent mascots，具有 compact chibi proportions、chunky readable silhouettes、粗 dark 1-2 px outlines、可见 stepped/pixel edges、limited palettes、flat cel shading、简单 expressive faces 和 tiny limbs。即使 reference art 更细致、复杂或写实，生成的 pet 也应简化为这种风格。

不要生成 polished illustration、painterly rendering、anime key art、3D rendering、glossy app-icon treatment、realistic fur 或 material texture、soft gradients、high-detail antialiasing，以及复杂 tiny accessories。比这更细致的 references 应在 row generation 前简化为 house style。

## Transparency And Effects

Pet rows 会被处理成透明的 192x208 cells，因此每个 generated pixel 要么属于 pet sprite，要么是可以干净移除的 chroma-key background。优先使用 pose、expression 和 silhouette changes，而不是 decorative effects。

Allowed effects 必须满足以下全部条件：

- Effect 与状态相关，并有助于解释 animation。
- Effect 在物理上附着、接触或重叠 pet silhouette，而不是漂浮在附近。
- Effect 位于 pet 的同一个 frame slot 内，不创建单独的 sprite component。
- Effect 是 opaque、hard-edged、pixel-style，并使用 non-chroma-key colors。
- Effect 足够小，在 192x208 下仍清晰可读且不杂乱。

Allowed effects 示例：接触脸部的 tear、接触 box 或 head 的 small smoke puff，或 failed/dizzy reaction 中与 pet 重叠的 tiny stars。

默认避免以下内容，因为它们通常会破坏 transparent-background cleanup 或 component extraction：

- wave marks、motion arcs、speed lines、action streaks、afterimages、blur 或 smears
- detached stars、loose sparkles、floating punctuation、floating icons、falling tear drops、separated smoke clouds 或 loose dust
- cast shadows、contact shadows、drop shadows、oval floor shadows、floor patches、landing marks、impact bursts、glow、halo、aura 或 soft transparent effects
- text、labels、frame numbers、visible grids、guide marks、speech bubbles、thought bubbles、UI panels、code snippets、checkerboard transparency、white backgrounds、black backgrounds 或 scenery
- pet、prop、effects、highlights 或 shadows 中的 chroma-key-adjacent colors
- stray pixels、disconnected outline bits、speckle/noise、cropped body parts、overlapping poses，或任何跨入 neighboring frame slot 的 pose

State-specific guidance：

- `waving`：只通过 paw pose 表现 wave。不要在 paw 周围绘制 wave marks、motion arcs、lines、sparkles 或 symbols。
- `jumping`：只通过 body position 表现 vertical motion。不要绘制 shadows、dust、landing marks、impact bursts、bounce pads 或 floor cues。
- `failed`：如果遵守 allowed-effects rules，可以使用 tears、attached smoke puffs 或 attached stars；不要使用 red X marks、floating symbols、detached smoke、detached stars 或 separate tear droplets。
- `review`：通过 lean、blink、eyes、head tilt 或 paw position 表现 focus。除非该 prop 已存在于 base pet identity 中，否则不要添加 magnifying glasses、papers、code、UI、punctuation 或 symbols。
- `running-right`、`running-left` 和 `running`：只通过 body、limb 和 prop movement 表现 locomotion。不要绘制 speed lines、dust clouds、floor shadows 或 motion trails。

## Pet Naming

当用户没有提供 pet name，且对话自然允许时，询问用户 pet name。如果询问会拖慢直接执行请求，就从 pet concept、reference image 或 personality 中选择一个简短合适的名称，然后一致地把该名称用作 display name 和 package folder slug 的来源。

好的 built-in style examples：

- Codex - 原始 Codex companion。
- Dewey - 适合 calm workspace days 的 tidy duck。
- Fireball - 适合 fast iteration 的 hot path energy。
- Rocky - diff 变大时依然 steady 的 rock。
- Seedy - 代表 new ideas 的 small green shoots。
- Stacky - 适合 deep work 的 balanced stack。
- BSOD - tiny blue-screen gremlin。
- Null Signal - 来自 void 的 quiet signal。

## Visible Progress Plan

每次 pet run 都要维护一个 visible checklist，让用户看到工作进展。开始前创建 checklist，一次只保持一个 active step，并在每个 step 完成时更新。

创建 checklist 前，尽可能先确定 pet name。有用户提供的名称就使用它；否则从 concept 或 references 推断一个简短合适的名称。如果名称太长、尚未确定，或不适合友好的 checklist，就改用 `your pet`。

常规 pet run 使用以下 checklist，将 `<Pet>` 替换为 pet 名称或 `your pet`：

1. Getting `<Pet>` ready.
2. Imagining `<Pet>`'s main look.
3. Picturing `<Pet>`'s poses.
4. Hatching `<Pet>`.

每个 step 的含义：

- `Getting <Pet> ready.` 选择或确认 pet name、description、source images 和 working folder。
- `Imagining <Pet>'s main look.` 生成 pet 的 main reference image。新 pets 必须执行此步，即使用户没有提供 image，因为它会成为 visual source of truth。
- `Picturing <Pet>'s poses.` 创建 pose rows，从 `idle` 和 `running-right` 开始，以确认 pet 仍保持一致。只有当 `running-right` 翻转后明显可用时，才 mirror `running-left`。
- `Hatching <Pet>.` 将 approved poses 转成 final pet files，检查 contact sheet、previews 和 validation results，修复 broken parts，将 `pet.json` 和 `spritesheet.webp` 保存到 pet folder，然后告知用户 pet 和 QA files 保存位置。

只有当真实 file、image 或 decision 已存在时，才将 step 标为 complete。如果只是 repair run，就从第一个相关 step 开始，而不是重启整个 checklist。

## Default Workflow

1. 准备 pet run folder 和 imagegen job manifest：

```bash
SKILL_DIR="${CODEX_HOME:-$HOME/.codex}/skills/hatch-pet"
python "$SKILL_DIR/scripts/prepare_pet_run.py" \
  --pet-name "<Name>" \
  --description "<one sentence>" \
  --reference /absolute/path/to/reference.png \
  --output-dir /absolute/path/to/run \
  --pet-notes "<stable pet description>" \
  --style-notes "<style notes>" \
  --force
```

除表达 user constraints 所需的 flags 外，上述所有 arguments 都是可选的。对 text-only requests，通过 `--pet-notes` 传入 concept，并省略 `--reference`；`prepare_pet_run.py` 会按需推断 name、description、chroma key 和 output directory。

2. 检查下一批 ready 的 `$imagegen` jobs：

```bash
python "$SKILL_DIR/scripts/pet_job_status.py" --run-dir /absolute/path/to/run
```

3. 对每个 ready job，用以下内容调用 `$imagegen`：

- `imagegen-jobs.json` 中列出的 prompt file
- 该 job 列出的每个 input image，并带上它的 role label
- 默认 built-in `image_gen` path，除非 `$imagegen` 自行路由到其他路径

Base job 必须先完成。如果存在 user references，base job 使用它们。如果没有 references，base job 可以是 prompt-only。记录 base 后，`record_imagegen_result.py` 会写入 `decoded/base.png` 和 `references/canonical-base.png`；所有 row jobs 都使用原始 references（如果存在）加上这些 canonical base images。

`prepare_pet_run.py` 还会在 `references/layout-guides/` 下创建 9 张 row-specific layout guide images，每个 animation state 一张。Row jobs 会把匹配的 guide 作为 layout-only input 附上，让 model 遵循正确的 frame count、spacing、centering 和 safe padding。把这些 guides 当作不可见 construction references：generated row strip 不能包含 visible boxes、borders、center marks、labels、guide colors 或 guide background。

生成 row strips 时，row prompt 中的 identity lock 是权威：不要 redesign pet，并保持相同 head shape、face、markings、palette、prop、outline weight、body proportions 和 silhouette。即使 deterministic geometry QA 通过，看起来像相关但不同 pet 的 row 也视为 failed。

先生成并记录 `running-right`，再决定如何完成 `running-left`。对照 base 和 references 检查 `running-right`。如果 pet 在视觉上足够对称，水平 mirror 能保留 identity、prop placement、handedness、markings、lighting、text-free details 和 direction semantics，就用以下命令派生 `running-left`：

```bash
python "$SKILL_DIR/scripts/derive_running_left_from_running_right.py" \
  --run-dir /absolute/path/to/run \
  --confirm-appropriate-mirror \
  --decision-note "<why mirroring preserves this pet's identity>"
```

如果存在任何 asymmetric side-specific marking、readable text、non-mirrored logo、handed prop、one-sided accessory、lighting cue，或翻转后会出错的 direction-specific pose，就不要 mirror。使用 `$imagegen` 按该 row prompt 和所有列出的 grounding images 生成 `running-left`，其中包括作为 gait reference 的 `decoded/running-right.png`。

对 built-in path，从 `$CODEX_HOME/generated_images/.../ig_*.png` 记录选定的 source image。不要把 run directory、`tmp/`、hand-made fixtures、deterministic row folders 或 post-processed copies 中的文件记录为 visual job sources。

4. 为某个 job 选择 generated output 后，ingest 它：

```bash
python "$SKILL_DIR/scripts/record_imagegen_result.py" \
  --run-dir /absolute/path/to/run \
  --job-id <job-id> \
  --source /absolute/path/to/generated-output.png
```

这会把 image 复制到 deterministic pipeline 期望的精确 decoded path，并在 `imagegen-jobs.json` 中记录 source metadata。

5. 所有 jobs 完成后，finalize：

```bash
python "$SKILL_DIR/scripts/finalize_pet_run.py" \
  --run-dir /absolute/path/to/run
```

预期 output：

```text
run/
  pet_request.json
  imagegen-jobs.json
  prompts/
  decoded/
  frames/frames-manifest.json
  final/spritesheet.png
  final/spritesheet.webp
  final/validation.json
  qa/contact-sheet.png
  qa/review.json
  qa/run-summary.json
  qa/videos/*.mp4
```

Package output 默认写到 run directory 外部。如果设置了 `CODEX_HOME`，就使用它；否则使用 `$HOME/.codex`。

```text
${CODEX_HOME:-$HOME/.codex}/pets/<pet-name>/
  pet.json
  spritesheet.webp
```

接受 pet 前，检查 `qa/contact-sheet.png`、`qa/review.json`、`final/validation.json` 和 `qa/videos/`。

Deterministic validation 是必要但不充分的。宣布 pet done 前，目视检查 contact sheet 的 identity consistency。如果任何 row 改变 species/body type、face、markings、palette、prop design、prop side（非预期）或 overall silhouette，就阻止 acceptance。

## Subagent Row Generation

Base job 已记录且 `references/canonical-base.png` 存在后，row-strip visual generation 必须使用 subagents，除非用户明确表示本 session 不使用 subagents。Row generation 前，说明正在使用 subagents，以及委托了哪些 row jobs。如果当前 environment 或 tool policy 阻止生成 subagents，就在 row-strip generation 前停止，说明 blocker，并在继续 sequentially 前请求明确 user direction。

Parent agent 必须拥有 manifest 和 package writes。

Default flow：

1. Parent 运行 `prepare_pet_run.py`。
2. Parent 生成并记录 `base`。
3. Parent 运行 `pet_job_status.py`。
4. Parent 先为 `idle` 和 `running-right` 生成 subagents，作为 identity 和 gait checks。
5. Parent 记录 subagents 返回的选定 `idle` 和 `running-right` results。
6. Parent 判断 `running-left` 是否可安全通过 mirror 派生；如果不能，就将其作为常规 grounded row job 委托给 subagent。
7. Parent 为每个剩余 non-derived row image-generation job 生成 subagents。
8. 每个 subagent 接收 row prompt 和每个列出的 input image path，调用 `$imagegen`，并且只返回选定的 `$CODEX_HOME/generated_images/.../ig_*.png` source path。
9. 只有 Parent 运行 `record_imagegen_result.py`、`derive_running_left_from_running_right.py`、repair queueing、finalization、QA 和 packaging。

Subagent write boundary：不要让 subagents 编辑 `imagegen-jobs.json`、复制文件到 `decoded/`、运行 `record_imagegen_result.py`、运行 `derive_running_left_from_running_right.py`、运行 `finalize_pet_run.py` 或 package pet。这能避免 manifest races，并让 provenance checks 保持集中。

Subagent handoff contract：

- 除非有意 batching 相邻 simple rows，否则每个 subagent 只给一个 row job。
- 包含 row id、absolute prompt file path、完整 prompt text 或读取该精确 prompt file 的指令，以及 `imagegen-jobs.json` 中每个 input image path 和它的 role label。
- 明确提醒 subagent：prompt 中的 transparency 和 effects rules 是强制的：无 detached effects，`waving` 无 wave marks，running rows 无 speed lines 或 dust；只有 state prompt 允许时，才可使用 attached opaque sprite-like tears/smoke/stars。
- 要求 subagent 返回前检查 generated candidate 的 frame count、identity consistency、clean flat chroma-key background、safe spacing 和 forbidden detached effects。
- 要求 subagent 只返回选定的原始 `$CODEX_HOME/generated_images/.../ig_*.png` source path 加一句 QA note。是否 record 或 repair 由 parent 决定。

每个 subagent 使用此 template：

```text
为本次 hatch-pet run 生成 `<row-id>` row。

Run dir: <absolute run dir>
Prompt file: <absolute prompt file>
Input images:
- <absolute path> — <role>
- <absolute path> — <role>

精确读取并遵循 row prompt，包括 Transparency 和 artifact rules。只使用 `$imagegen`；不要使用 local scripts 来 draw、tile、edit 或 synthesize sprites。

返回前，目视检查：
- 精确 requested frame count
- 与 canonical base 相同的 pet identity
- 干净平整的 chroma-key background
- 完整、分离、未裁切的 poses
- 没有 forbidden detached effects 或 slot-crossing artifacts

不要 edit manifests、copy into decoded、record results、mirror rows、finalize、repair 或 package。只返回：
selected_source=/absolute/path/to/$CODEX_HOME/generated_images/.../ig_*.png
qa_note=<one sentence>
```

禁止 silent sequential fallback：如果 row-strip visual generation 无法使用 subagents，就停止并请求明确 user direction，之后才能在不使用 subagents 的情况下继续。只有 "do not use subagents" 或 "run this sequentially" 这类明确 user instruction，才授权常规 sequential row-generation path。Final answer 必须报告哪些 row jobs 委托给了 subagents，以及哪些（如果有）由 parent mirror 或 repair。

## Repair Workflow

如果 finalization 因 row QA failed 而停止，就 queue targeted repair jobs：

```bash
python "$SKILL_DIR/scripts/queue_pet_repairs.py" \
  --run-dir /absolute/path/to/run
```

然后对每个 reopened row job 重复 `$imagegen` generation 和 `record_imagegen_result.py` ingest loop。Regenerate 最小 failing scope：失败 row，而不是整张 sheet。

对 identity repairs，使用 canonical base image、original references、contact sheet 和精确 row failure note 作为 grounding context。只 repair 失败 row，同时保留 canonical pet identity。

## Secondary Image Generation Fallback

`scripts/generate_pet_images.py` 是此 skill 的 secondary fallback。

只有在已安装的 `$imagegen` system skill 不可用，或无法在当前 environment 中调用时，才使用它。常规 pet creation 应将 visual generation 委托给 `$imagegen`，因为 `$imagegen` 拥有 built-in-first image generation policy 和自己的 CLI fallback behavior。

只有在解释 `$imagegen` 为何无法使用后，才运行 secondary fallback：

```bash
python "$SKILL_DIR/scripts/generate_pet_images.py" \
  --run-dir /absolute/path/to/run \
  --model gpt-image-2 \
  --states all
```

Secondary fallback 需要 `OPENAI_API_KEY`。

## Rules

- 保持 `$imagegen` 作为 primary generation layer。
- 只要所选 path 支持 references，就为 `$imagegen` 保持 reference images attached/visible。
- 给每个 row-strip job 附上该 row 的 `references/layout-guides/<state>.png` image 作为 layout-only guide，并且不要接受复制了 guide pixels 的 outputs。
- Parent 记录 base image 后，row-strip visual generation 使用 subagents。Parent 可以生成 base，但 row-strip jobs 属于 subagents，除非用户明确表示本 session 不使用 subagents。
- 每个 normal visual job 都用 `$imagegen` 生成：base 加所有未明确批准通过 `running-left` mirror derivations 得到的 row strips。
- 只有 base job 有资格 prompt-only generation；每个 row job 都必须 attach 其列出的 grounding images。
- 先委托 `running-right`，并且只有 visual inspection 确认 mirror 能保留 identity 和 semantics 时，才 mirror `running-left`；否则把 `running-left` 作为常规 grounded `$imagegen` row 委托。
- 绝不要用 locally drawn、tiled、transformed 或 code-generated row strips 替代缺失的 `$imagegen` outputs。
- 绝不要手动修改 `imagegen-jobs.json` 来声称 visual job 已完成。
- 不要依赖 generated images 提供精确 atlas geometry；使用此 skill 的 deterministic scripts。
- 使用 `pet_request.json` 中存储的 chroma key；不要强制固定 green screen。
- 在所有 rows 中保持 pet 的 silhouette、face、materials、palette 和 props 一致。
- 在每个 base、row 和 repair prompt 中执行上面的 transparency 和 effects rules。
- 即使 `qa/review.json` 和 `final/validation.json` 没有 errors，也要把 visual identity drift 视为 blocker。
- 如果 contact sheet 显示 cropped references、repeated tiles、white cell backgrounds 或 non-sprite fragments，就视为 failed。
- 将 forbidden detached effects、chroma-key-adjacent artifacts、shadows、glows、smears、dust、landing marks、wave marks、speed lines 或 motion trails 视为 failed rows。
- 将 `qa/review.json` errors 视为 blockers。Warnings 需要 visual review。

## Acceptance Criteria

- Final atlas 是 PNG 或 WebP，`1536x1872`，transparent-capable，并基于 `192x208` cells。
- Used cells 非空，unused cells 完全透明。
- Atlas 遵循 `references/animation-rows.md` 中的 row/frame counts。
- 除非明确 skipped，否则已生成 contact sheet 和 preview videos。
- `qa/review.json` 没有 errors。
- Row-by-row review 确认 animation cycles 对 Codex app 来说足够完整。
- 对 custom pets，`${CODEX_HOME:-$HOME/.codex}/pets/<pet-name>/pet.json` 和 `${CODEX_HOME:-$HOME/.codex}/pets/<pet-name>/spritesheet.webp` 已一起 staged。
