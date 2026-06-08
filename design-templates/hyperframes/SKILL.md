---
name: hyperframes
description: 创建 HyperFrames HTML 视频 composition、动画、title card、overlay、caption、voiceover、音频响应式视觉和场景转场。当用户要求构建任何基于 HTML 的视频内容、添加与音频同步的 captions 或 subtitles、生成 text-to-speech narration、创建音频响应式动画（beat sync、glow、随音乐 pulse）、添加动态文字高亮（marker sweeps、hand-drawn circles、burst lines、scribble、sketchout），或在场景之间添加转场（crossfades、wipes、reveals、shader transitions）时使用。覆盖 composition authoring、timing、media 和完整视频制作流程。CLI 命令（init、lint、preview、render、transcribe、tts）见 hyperframes-cli skill。
triggers:
  - "hyperframes"
  - "html video"
  - "video composition"
  - "interactive video"
  - "captions"
  - "tts video"
  - "kinetic typography"
  - "html in canvas"
  - "drawElementImage"
  - "html shader"
  - "vfx-iphone-device"
  - "vfx-liquid-glass"
  - "vfx-portal"
od:
  mode: video
  surface: video
  scenario: video
  preview:
    type: html
  design_system:
    requires: false
  example_prompt: |
    A 5-second product reveal: a minimal high-end product on a clean cream
    surface, soft side light, slow camera push-in, restrained motion, no
    text overlays.
---

# HyperFrames

HTML 是视频的 source of truth。一个 composition 就是一个 HTML 文件：用 `data-*` 属性表达 timing，用 GSAP timeline 表达动画，用 CSS 表达外观。框架负责 clip 可见性、媒体播放和 timeline 同步。

## Open Design 集成（此 surface 的关键承重部分）

当此 skill 在 Open Design 内运行（即设置了 `$OD_PROJECT_DIR`）时，输出流程是固定的：项目根目录里只应出现渲染后的 `.mp4`。Composition 源文件（`hyperframes.json`、`meta.json`、`index.html`、assets）应放进隐藏 cache 目录，避免污染用户的 FileViewer 或 chat 里的 "produced files" chips。

**OD 内的 render workflow - 快速路径**：

对大多数 OD 请求（"test video"、"5s product reveal"、"demo clip"），不要从零编写 composition HTML。使用 HyperFrames 内置 scaffold，只编辑 prompt 真正要求变化的部分。"author from scratch" 路径会消耗数分钟模型输出和静默 chat-tool 时间；scaffold 路径通常只需数秒。

```bash
# 1. 选择一个隐藏 cache slot。dotfile 前缀会让 OD 的 project file
#    listing 跳过它，因此源文件不会污染 chat。
COMP_REL=".hyperframes-cache/$(date +%s)-$(openssl rand -hex 2)"
COMP="$OD_PROJECT_DIR/$COMP_REL"

# 2. 获取一个可立即 render 的 scaffold（hyperframes.json、
#    meta.json、带 GSAP CDN 且已注册 window.__timelines.main
#    的 index.html）。它在你的 shell 中运行 - 纯文件复制，
#    不启动 Chrome，除 npx cache 外不访问网络。
npx hyperframes init "$COMP" --example blank --skip-skills --non-interactive

# 3. 只编辑 $COMP/index.html - 如果需要非默认长度，修改 root
#    上的 `data-duration`；替换 <style> 中的 placeholder palette；
#    为文字/图像添加 1-3 个 clip <div>；并把匹配的 GSAP tweens
#    追加到既有的
#    `window.__timelines["main"] = gsap.timeline({paused:true})` block.
#    保持改动最小；scaffold 已经是有效 HF。

# 4. 通过 OD daemon 分发 render。不要在此 shell 中运行 `npx hyperframes
#    render` - daemon 会在 unsandboxed process 中替你运行它。
#    （许多 agent CLI，尤其是 Claude Code，会把 Bash 包在 macOS
#    sandbox-exec 中，puppeteer 的 Chrome subprocess 在该环境下常会
#    卡在 frame capture 中途。daemon process 不受 sandbox 限制，
#    因此 render 能可靠完成。）
#
#    dispatcher 会在约 1s 内返回 {taskId}；循环调用
#    `"$OD_NODE_BIN" "$OD_BIN" media wait <taskId>` 推进 render 直到完成。
#    每次调用最多 long-poll 25s（低于 shell tool 默认 30s 上限），
#    并以 0/2/5 退出码表示 done/running/failed。
out=$("$OD_NODE_BIN" "$OD_BIN" media generate \
  --project "$OD_PROJECT_ID" \
  --surface video \
  --model hyperframes-html \
  --output "<descriptive-name>.mp4" \
  --composition-dir "$COMP_REL")
ec=$?
task_id=$(printf '%s\n' "$out" | tail -1 | jq -r '.taskId // empty')
since=$(printf '%s\n' "$out" | tail -1 | jq -r '.nextSince // 0')
while [ "$ec" -eq 2 ] && [ -n "$task_id" ]; do
  out=$("$OD_NODE_BIN" "$OD_BIN" media wait "$task_id" --since "$since")
  ec=$?
  since=$(printf '%s\n' "$out" | tail -1 | jq -r '.nextSince // '"$since")
done
[ "$ec" -ne 0 ] && { echo "$out" >&2; exit "$ec"; }
```

每次 `generate` 和每次 `wait` 调用最多持续约 25s，因此 agent shell tool 的默认约 30s 上限不会触发。HF 的进度行（`Capturing frame N/M`）会在整个循环中实时 stream 到 stderr。render 完成时，最后一行 stdout 是 `{"file": { "name": "<output>", "size": …, "kind": "video", … }}` - 回复用户时引用 `file.name`，让用户知道产出了什么。

**在 OD 内跳过 Visual Identity Gate。** 下方（"Approach" 下）的 HARD-GATE section 会要求你在写任何 composition 前读取 DESIGN.md / visual-style.md，或停下来询问 3 个 mood 问题。该 gate 面向 standalone HF 项目。**OD projects 已经有自己的 design-system layer** - 用户在创建项目时已经选择了视觉方向。对 OD test render，默认使用：深色 canvas（#0b0b0f）、一个暖色 accent（#ffb76b）、一个冷色 accent（#7da4ff）、克制 motion。只有当用户 prompt 含糊到连 subject 都无法选择时，才询问 stylistic input（这种情况很少）。

什么时候跳过 scaffold 并从零编写：仅当用户明确要求 blank template 明显承载不了的东西时（例如 multi-composition timelines、audio-reactive overlays、与他们已经生成的 TTS track 同步的 captions）。除此之外，init + edit 是默认路径。

这些较轻的 HF subcommands 仍然可以在你自己的 shell 中运行（它们不需要 spawn Chrome）：

- `npx hyperframes lint "$COMP"` - 分发前 validate composition
- `npx hyperframes transcribe <audio>` - 生成 captions
- `npx hyperframes tts <text>` - 生成 narration

将 daemon dispatch 留给 `render`/`inspect`/`preview`（任何 Chrome-bound 的操作）。

**不要**调用 `"$OD_NODE_BIN" "$OD_BIN" media generate --model hyperframes-html` - 该 dispatcher path 会按设计返回 400（`AGENT_RENDERED`）。HyperFrames 应由你通过 npx 直接 render。

**不要**把 `hyperframes.json` / `meta.json` / `index.html` 放在 project root；OD 的 file listing 会递归扫描，用户会在 chat 中看到三个无关文件出现。

对于 `render` 之外的 CLI options（lint、preview、transcribe、tts、inspect、benchmark），当任务需要时从你的 shell tool 直接调用它们（例如先把 TTS audio 生成到 cache，再在 composition 中引用）。

## Approach（方法）

写 HTML 前，先在高层次思考：

1. **What** - 观众应该体验到什么？识别 narrative arc、关键时刻和 emotional beats。
2. **Structure** - 需要多少个 compositions，哪些是 sub-compositions、哪些是 inline，哪些 tracks 承载 video、audio、overlays、captions。
3. **Timing** - 哪些 clips 决定 duration，transitions 落在哪里，节奏如何。
4. **Layout** - 先构建 end-state。见下方 "Layout Before Animation"。
5. **Animate** - 然后按下方规则添加 motion。

对小改动（修颜色、调 timing、加一个元素），直接跳到规则。

### Visual Identity Gate

<HARD-GATE>
在编写任何 composition HTML 之前，必须已经定义 visual identity。不要使用默认或泛化颜色编写 composition。

按此顺序检查：

1. **项目中存在 DESIGN.md？** → 读取它。使用其中精确的 colors、fonts、motion rules，以及 "What NOT to Do" 约束。
2. **存在 visual-style.md？** → 读取它。应用其中的 `style_prompt_full` 和结构化字段。（注意：`visual-style.md` 是项目专属文件。`visual-styles.md` 是包含 8 个 named presets 的 style library - 它们是不同文件。）
3. **用户命名了 style**（例如 "Swiss Pulse"、"dark and techy"、"luxury brand"）？→ 读取 [visual-styles.md](./visual-styles.md) 中的 8 个 named presets。生成一个最小 DESIGN.md，包含：`## Style Prompt`（一段）、`## Colors`（3-5 个带角色说明的 hex values）、`## Typography`（1-2 个 font families）、`## What NOT to Do`（3-5 个 anti-patterns）。
4. **以上都没有？** → 写任何 HTML 前先问 3 个问题：
   - mood 是什么？（explosive / cinematic / fluid / technical / chaotic / warm）
   - 浅色还是深色 canvas？
   - 有特定 brand colors、fonts 或 visual references 吗？
     然后根据答案生成一个最小 DESIGN.md。

每个 composition 的 palette 和 typography 都必须能追溯到 DESIGN.md、visual-style.md 或用户的明确方向。如果你正在随手使用 `#333`、`#3b82f6` 或 `Roboto`，说明你跳过了此步骤。
</HARD-GATE>

motion defaults、sizing、entrance patterns 和 easing 遵循 [house-style.md](./house-style.md)。house style 负责事物如何运动；DESIGN.md 负责事物看起来是什么样。

## Layout Before Animation

把每个元素放在其**最可见时刻**应该出现的位置 - 即它完全进入、位置正确、尚未退出的那一帧。先把它写成静态 HTML+CSS。此时不要写 GSAP。

**为什么重要：** 如果你把元素放在动画起始状态（offscreen、scaled to 0、opacity 0），再 tween 到你猜测的落点，其实是在猜 final layout。重叠问题要到视频 render 后才会暴露。先构建 end state，就能在添加任何 motion 之前看见并修复 layout 问题。

### 流程

1. **识别每个 scene 的 hero frame** - 即最多元素同时可见的时刻。这就是你要构建的 layout。
2. **为该 frame 编写静态 CSS**。`.scene-content` container 必须用 `width: 100%; height: 100%; padding: Npx;` 填满整个 scene，并设置 `display: flex; flex-direction: column; gap: Npx; box-sizing: border-box`。用 padding 把内容向内推 - 永远不要在 content container 上使用 `position: absolute; top: Npx`。当内容高度超过剩余空间时，绝对定位的 content container 会 overflow。`position: absolute` 只留给装饰元素。
3. **用 `gsap.from()` 添加 entrance** - 从 offscreen/invisible 动画到 CSS 位置。CSS 位置是 ground truth；tween 只描述到达那里的旅程。
4. **用 `gsap.to()` 添加 exit** - 从 CSS 位置动画到 offscreen/invisible。

### 示例

```css
/* scene-content 填满 scene，padding 负责定位 content */
.scene-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 120px 160px;
  gap: 24px;
  box-sizing: border-box;
}
.title {
  font-size: 120px;
}
.subtitle {
  font-size: 42px;
}
/* Container 填满任意 scene 尺寸（1920x1080、1080x1920 等）。
   Padding 定位 content。Flex + gap 负责 spacing。 */
```

**错误 - hardcoded dimensions 和 absolute positioning：**

```css
.scene-content {
  position: absolute;
  top: 200px;
  left: 160px;
  width: 1920px;
  height: 1080px;
  display: flex; /* ... */
}
```

```js
// Step 3: Animate INTO those positions
tl.from(".title", { y: 60, opacity: 0, duration: 0.6, ease: "power3.out" }, 0);
tl.from(".subtitle", { y: 40, opacity: 0, duration: 0.5, ease: "power3.out" }, 0.2);
tl.from(".logo", { scale: 0.8, opacity: 0, duration: 0.4, ease: "power2.out" }, 0.3);

// Step 4: Animate OUT from those positions
tl.to(".title", { y: -40, opacity: 0, duration: 0.4, ease: "power2.in" }, 3);
tl.to(".subtitle", { y: -30, opacity: 0, duration: 0.3, ease: "power2.in" }, 3.1);
tl.to(".logo", { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.in" }, 3.2);
```

### 当元素在不同时间共享同一区域

如果元素 A 在同一区域中先退出、元素 B 再进入，那么两者都应在各自 hero frame 中拥有正确 CSS 位置。timeline ordering 保证它们不会视觉共存 - 但如果跳过 layout 步骤，就无法发现它们因 timing error 意外重叠的情况。

### 什么算 intentional overlap

Layered effects（文字背后的 glow、shadow elements、background patterns）和 z-stacked designs（card stacks、depth layers）属于 intentional。layout 步骤要捕捉的是**非预期**重叠 - 例如两个 headlines 叠在一起、某个 stat 盖住 label、content 溢出 frame。

## Data Attributes

### All Clips

| Attribute          | Required                          | Values                                                 |
| ------------------ | --------------------------------- | ------------------------------------------------------ |
| `id`               | Yes                               | 唯一 identifier                                        |
| `data-start`       | Yes                               | 秒数或 clip ID reference（`"el-1"`、`"intro + 2"`）     |
| `data-duration`    | Required for img/div/compositions | 秒数。Video/audio 默认使用 media duration。             |
| `data-track-index` | Yes                               | Integer。同一 track 的 clips 不可重叠。                |
| `data-media-start` | No                                | 源中的 trim offset（秒）                               |
| `data-volume`      | No                                | 0-1（默认 1）                                         |

`data-track-index` **不**影响视觉层级 - 使用 CSS `z-index`。

### Composition Clips

| Attribute                    | Required | Values                                       |
| ---------------------------- | -------- | -------------------------------------------- |
| `data-composition-id`        | Yes      | 唯一 composition ID                          |
| `data-start`                 | Yes      | Start time（root composition 使用 `"0"`）     |
| `data-duration`              | Yes      | 优先于 GSAP timeline duration                |
| `data-width` / `data-height` | Yes      | Pixel dimensions（1920x1080 或 1080x1920）    |
| `data-composition-src`       | No       | 外部 HTML file 路径                          |

## Composition Structure

通过 `data-composition-src` 加载的 sub-compositions 使用 `<template>` wrapper。**Standalone compositions（主 index.html）不要使用 `<template>`** - 它们直接把 `data-composition-id` div 放在 `<body>` 中。在 standalone file 上使用 `<template>` 会让浏览器隐藏所有内容并破坏 rendering。

Sub-composition structure：

```html
<template id="my-comp-template">
  <div data-composition-id="my-comp" data-width="1920" data-height="1080">
    <!-- content -->
    <style>
      [data-composition-id="my-comp"] {
        /* scoped styles */
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      // tweens...
      window.__timelines["my-comp"] = tl;
    </script>
  </div>
</template>
```

在 root 中加载：`<div id="el-1" data-composition-id="my-comp" data-composition-src="compositions/my-comp.html" data-start="0" data-duration="10" data-track-index="1"></div>`

## Video and Audio

Video 必须是 `muted playsinline`。Audio 始终使用单独的 `<audio>` element：

```html
<video
  id="el-v"
  data-start="0"
  data-duration="30"
  data-track-index="0"
  src="video.mp4"
  muted
  playsinline
></video>
<audio
  id="el-a"
  data-start="0"
  data-duration="30"
  data-track-index="2"
  src="video.mp4"
  data-volume="1"
></audio>
```

## Timeline Contract

- 所有 timelines 都以 `{ paused: true }` 开始 - player 控制 playback
- 注册每个 timeline：`window.__timelines["<composition-id>"] = tl`
- Framework 会自动 nest sub-timelines - 不要手动添加它们
- Duration 来自 `data-duration`，而不是 GSAP timeline length
- 不要为了设置 duration 创建 empty tweens

## Rules（不可协商）

**Deterministic：** 不要使用 `Math.random()`、`Date.now()` 或基于时间的逻辑。如果需要 pseudo-random values，使用 seeded PRNG（例如 mulberry32）。

**GSAP：** 只 animate visual properties（`opacity`、`x`、`y`、`scale`、`rotation`、`color`、`backgroundColor`、`borderRadius`、transforms）。不要 animate `visibility`、`display`，也不要调用 `video.play()`/`audio.play()`。

**Animation conflicts：** 不要让多个 timelines 同时 animate 同一元素的同一 property。

**No `repeat: -1`：** Infinite-repeat timelines 会破坏 capture engine。根据 composition duration 计算精确 repeat count：`repeat: Math.ceil(duration / cycleDuration) - 1`。

**Synchronous timeline construction：** 不要在 `async`/`await`、`setTimeout` 或 Promises 内构建 timelines。capture engine 会在 page load 后同步读取 `window.__timelines`。Fonts 由 compiler embed，因此会立即可用 - 不需要等待 font loading。

**永远不要：**

1. 忘记注册 `window.__timelines`
2. 用 video 承载 audio - 始终使用 muted video + 单独的 `<audio>`
3. 把 video 嵌套在 timed div 中 - 使用 non-timed wrapper
4. 使用 `data-layer`（应使用 `data-track-index`）或 `data-end`（应使用 `data-duration`）
5. Animate video element dimensions - animate wrapper div
6. 对 media 调用 play/pause/seek - framework 拥有 playback
7. 创建没有 `data-composition-id` 的 top-level container
8. 在任何 timeline 或 tween 上使用 `repeat: -1` - 始终使用 finite repeats
9. 异步构建 timelines（在 `async`、`setTimeout`、`Promise` 内）
10. 对后续 scenes 的 clip elements 使用 `gsap.set()` - 它们在 page load 时还不存在于 DOM 中。改为在 timeline 内、clip 的 `data-start` 时间点或之后使用 `tl.set(selector, vars, timePosition)`。
11. 在 content text 中使用 `<br>` - 强制 line breaks 不会考虑真实 rendered font width。自然换行的 text 加上 `<br>` 会产生额外的不必要断行，导致 overlap。改用 `max-width` 让 text 自然换行。例外：短 display titles，其中每个词都刻意独占一行（例如 130px 的 "THE\nIMMORTAL\nGAME"）。

## Scene Transitions（不可协商）

每个 multi-scene composition 都必须遵守以下全部规则。违反任一条都会得到 broken composition。

1. **始终在 scenes 之间使用 transitions。** 不要 jump cuts。没有例外。
2. **始终在每个 scene 上使用 entrance animations。** 每个元素通过 `gsap.from()` animate IN。没有元素可以完整静态出现。如果一个 scene 有 5 个元素，就需要 5 个 entrance tweens。
3. **除 final scene 外，永远不要使用 exit animations。** 这意味着：transition 触发前，不要用 `gsap.to()` 把 opacity animate 到 0、把 y animate 到 offscreen、把 scale animate 到 0，或执行任何其他 "out" animation。transition 本身就是 exit。transition 开始的那一刻，outgoing scene 的 content 必须完全可见。
4. **仅 final scene：** 最后一个 scene 可以让元素 fade out（例如 fade to black）。这是唯一允许 `gsap.to(..., { opacity: 0 })` 的 scene。

**错误 - transition 前的 exit animation：**

```js
// BANNED - this empties the scene before the transition can use it
tl.to("#s1-title", { opacity: 0, y: -40, duration: 0.4 }, 6.5);
tl.to("#s1-subtitle", { opacity: 0, duration: 0.3 }, 6.7);
// transition fires on empty frame
```

**正确 - 只有 entrance，由 transition 处理 exit：**

```js
// Scene 1 entrance animations
tl.from("#s1-title", { y: 50, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.3);
tl.from("#s1-subtitle", { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, 0.6);
// NO exit tweens - transition at 7.2s handles the scene change
// Scene 2 entrance animations
tl.from("#s2-heading", { x: -40, opacity: 0, duration: 0.6, ease: "expo.out" }, 8.0);
```

## Animation Guardrails

- 第一个 animation 偏移 0.1-0.3s（不要 t=0）
- entrance tweens 的 eases 要有变化 - 每个 scene 至少使用 3 种不同 eases
- 不要在同一 scene 内重复同一种 entrance pattern
- 避免在深色背景上使用 full-screen linear gradients（会产生 H.264 banding - 改用 radial 或 solid + localized glow）
- rendered video 使用 60px+ headlines、20px+ body、16px+ data labels
- number columns 使用 `font-variant-numeric: tabular-nums`

当未提供 `visual-style.md` 或 animation direction 时，按 [house-style.md](./house-style.md) 使用 aesthetic defaults。

## Typography and Assets

- **Fonts：** 直接在 CSS 中写所需 `font-family` - compiler 会自动 embed 支持的 fonts。如果某个 font 不受支持，compiler 会警告。
- 为 external media 添加 `crossorigin="anonymous"`
- 对 dynamic text overflow 使用 `window.__hyperframes.fitTextFontSize(text, { maxWidth, fontFamily, fontWeight })`
- 所有文件都与 `index.html` 一起位于 project root；sub-compositions 使用 `../`

## Editing Existing Compositions

- 先读取完整 composition - 匹配现有 fonts、colors、animation patterns
- 只修改用户要求的内容
- 保留无关 clips 的 timing

## Output Checklist

- [ ] `npx hyperframes lint` 和 `npx hyperframes validate` 都通过
- [ ] `npx hyperframes inspect` 通过，或每个 reported overflow 都已标记为 intentional
- [ ] Contrast warnings 已处理（见下方 Quality Checks）
- [ ] Layout issues 已处理（见下方 Quality Checks）
- [ ] Animation choreography 已验证（见下方 Quality Checks）

## Quality Checks

### Visual Inspect

`hyperframes inspect` 会在 headless Chrome 中运行 composition，沿 timeline seek，并用 timestamps、selectors、bounding boxes 和 fix hints 映射 visual layout issues。在 `lint` 和 `validate` 后运行它：

```bash
npx hyperframes inspect
npx hyperframes inspect --json
```

Failures 通常意味着 text 溢出了 bubble/card、fixed-size label 裁掉了 dynamic copy，或 text 移出了 canvas。通过增大 container size 或 padding、降低 font size 或 letter spacing、添加真正的 `max-width` 让 text 在 container 内换行，或对 dynamic copy 使用 `window.__hyperframes.fitTextFontSize(...)` 来修复。

对 dense videos 使用 `--samples 15`，对特定 hero frames 使用 `--at 1.5,4,7.25`。Repeated static issues 默认会折叠，避免淹没 agent context。如果 overflow 是 entrance/exit animation 的刻意效果，用 `data-layout-allow-overflow` 标记该元素或其祖先。如果某个 decorative element 永远不应被 audit，用 `data-layout-ignore` 标记。

`hyperframes layout` 是同一检查的 compatibility alias。

### Contrast

`hyperframes validate` 默认运行 WCAG contrast audit。它会 seek 到 5 个 timestamps，截取页面截图，采样每个 text element 背后的 background pixels，并计算 contrast ratios。Failures 会以 warnings 形式出现：

```
⚠ WCAG AA contrast warnings (3):
  · .subtitle "secondary text" — 2.67:1 (need 4.5:1, t=5.3s)
```

如果出现 warnings：

- 深色背景：调亮失败颜色，直到达到 4.5:1（normal text）或 3:1（large text，24px+ 或 19px+ bold）
- 浅色背景：调暗它
- 留在 palette family 内 - 不要发明新颜色，调整现有颜色
- 重新运行 `hyperframes validate` 直到干净

如果正在快速迭代且稍后会检查，可用 `--no-contrast` 跳过。

### Animation Map

完成 animations 后，运行 animation map 验证 choreography：

```bash
node skills/hyperframes/scripts/animation-map.mjs <composition-dir> \
  --out <composition-dir>/.hyperframes/anim-map
```

输出单个 `animation-map.json`，包含：

- **Per-tween summaries**：`"#card1 animates opacity+y over 0.50s. moves 23px up. fades in. ends at (120, 200)"`
- **ASCII timeline**：覆盖 composition duration 中所有 tweens 的 Gantt chart
- **Stagger detection**：报告实际 intervals（`"3 elements stagger at 120ms"`）
- **Dead zones**：超过 1s 没有 animation 的时段 - 是 intentional hold，还是 missing entrance？
- **Element lifecycles**：first/last animation time、final visibility
- **Scene snapshots**：5 个关键 timestamps 下的 visible element state
- **Flags**：`offscreen`、`collision`、`invisible`、`paced-fast`（低于 0.2s）、`paced-slow`（超过 2s）

读取 JSON。扫描 summaries，寻找任何意外内容。检查每个 flag - 修复或说明理由。确认 timeline 呈现了预期的 choreography rhythm。修复后重新运行。

小改动（修颜色、调整一个 duration）可跳过。新 compositions 和重要 animation changes 必须运行。

---

## References（按需加载）

- **[references/captions.md](references/captions.md)** - Captions、subtitles、lyrics、与音频同步的 karaoke。Tone-adaptive style detection、per-word styling、text overflow prevention、caption exit guarantees、word grouping。添加任何与 audio timing 同步的 text 时读取。
- **[references/tts.md](references/tts.md)** - 使用 Kokoro-82M 的 text-to-speech。Voice selection、speed tuning、TTS+captions workflow。生成 narration 或 voiceover 时读取。
- **[references/audio-reactive.md](references/audio-reactive.md)** - Audio-reactive animation：把 frequency bands 和 amplitude 映射到 GSAP properties。当 visuals 需要响应 music、voice 或 sound 时读取。
- **[references/css-patterns.md](references/css-patterns.md)** - CSS+GSAP marker highlighting：highlight、circle、burst、scribble、sketchout。Deterministic、fully seekable。为 text 添加 visual emphasis 时读取。
- **[references/typography.md](references/typography.md)** - Typography：font pairing、OpenType features、dark-background adjustments、font discovery script。**始终读取** - 每个 composition 都有 text。
- **[references/motion-principles.md](references/motion-principles.md)** - Motion design principles：easing as emotion、timing as weight、choreography as hierarchy、scene pacing、ambient motion、anti-patterns。编排 GSAP animations 时读取。
- **[visual-styles.md](visual-styles.md)** - 8 个 named visual styles（Swiss Pulse、Velvet Standard、Deconstructed、Maximalist Type、Data Drift、Soft Signal、Folk Frequency、Shadow Cut），包含 hex palettes、GSAP easing signatures 和 shader pairings。用户命名 style 或生成 DESIGN.md 时读取。
- **[house-style.md](house-style.md)** - 未指定 style 时使用的 default motion、sizing 和 color palettes。
- **[patterns.md](patterns.md)** - PiP、title cards、slide show patterns。
- **[data-in-motion.md](data-in-motion.md)** - Data、stats 和 infographic patterns。
- **[references/transcript-guide.md](references/transcript-guide.md)** - Transcription commands、whisper models、external APIs、troubleshooting。
- **[references/dynamic-techniques.md](references/dynamic-techniques.md)** - Dynamic caption animation techniques（karaoke、clip-path、slam、scatter、elastic、3D）。

- **[references/transitions.md](references/transitions.md)** - Scene transitions：crossfades、wipes、reveals、shader transitions。Energy/mood selection、CSS vs WebGL guidance。**multi-scene compositions 始终读取** - 没有 transitions 的 scenes 会像 jump cuts。
  - [transitions/catalog.md](references/transitions/catalog.md) - Hard rules、scene template，以及到各类型 implementation code 的 routing。
  - Shader transitions 位于 `@hyperframes/shader-transitions`（`packages/shader-transitions/`）- 读取 package source，不要读 skill files。
- **[references/html-in-canvas.md](references/html-in-canvas.md)** - HTML-in-Canvas（`drawElementImage`），用于把 live DOM render 为 WebGL textures：3D device mockups、shader-warped UIs、liquid glass、portals。当用户要求 `vfx-iphone-device`、`vfx-liquid-glass`、`vfx-portal`，或任何 "HTML mapped onto 3D / shader" effect 时读取。render path 会自动启用 Chrome flag，但 animated content 的 texture 必须每帧重新 capture - 这是 "the screen renders dead" output 最常见原因。

GSAP patterns 和 effects 位于 `/gsap` skill。
