---
name: dashboard-ui-glass
description: "当用户想要高级 liquid-glassmorphism 会议 / 会议室 dashboard 时使用：双全屏背景视频按主题切换、4x2 玻璃/实色卡片网格、带动画 voice-wave 的参与者指示器和浮动控制栏。用户提到 'glass dashboard'、'conference dashboard'、'meeting room UI' 或 Dashboard UI liquid-glass template 时调用。"
version: 0.3.0
od:
  mode: prototype
  surface: web
  scenario: design
  preview:
    type: html
    entry: example.html
  design_system:
    requires: false
---

# Dashboard UI — Liquid Glass Conference Dashboard

产出一个高级 **Conference Dashboard**，采用 **liquid glassmorphism** 审美。完整渲染好的参考实现就在同目录的 `example.html` 中——**必须从它开始**。复制 `example.html`，然后只调整文案和数据；不要重写 CSS，也不要发明新的视觉语言。Seed 已经编码了下文要求的精确 token、glass 处理、card grid、voice-wave 动画和响应式行为。

这是权威 build brief。严格照做——已命名的颜色、圆角、视频 URL、头像来源和动画都已锁定。

**Avatars（关键）：** `example.html` 已经把每个头像作为 **内联 `data:image/svg+xml;base64,...` URI** 打包好——原样保留。**不要**替换成 `i.pravatar.cc`、`api.dicebear.com` 或任何其他远程头像 URL：外部头像 host 在 sandbox 中可能 rate-limit 或 403，导致图片破裂。复制 seed 时头像会一起带过来；只有用户提供真实图片时才替换头像，并优先使用 data URI 而不是远程 URL。Screen-share 缩略图可以保留 `https://picsum.photos/seed/screen1..4/300/200`。

## Stack

- 默认输出：单个自包含 HTML 文件（`example.html` seed）。它已经把所有内容内联。
- 如果用户明确要求 React + TypeScript + Vite + Tailwind 项目，请忠实移植 seed：相同 token、相同 markup 结构、用 `lucide-react` 放图标、Inter（300-700 字重）来自 Google Fonts。移植时不要改变设计。

## Background

两个循环全屏背景视频（`autoplay muted loop playsInline`、`object-fit: cover`、`position: fixed; inset: 0; z-index: -1`），按明暗主题切换。**不要叠加 overlay。**

- Light mode video: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_103318_2aa26b55-df1a-43a6-903d-941e718c9366.mp4`
- Dark mode video: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_102933_4e8f73b5-775a-4179-b2fb-472f59063dcd.mp4`

## CSS Variables (`:root`) — locked

```
--glass-bg: rgba(255, 255, 255, 0.55);
--glass-border: rgba(255, 255, 255, 0.6);
--glass-blur: 8px;
--text-main: #1a1a1a;
--text-muted: #6b7280;
--accent: #000000;
--card-radius: 40px;
--transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
```

在 `.dark-mode` 中：`--glass-bg: rgba(0,0,0,0.45)`；`--glass-border: rgba(255,255,255,0.08)`；`--text-main:#fff`；`--text-muted:#b0b0b0`；`--accent:#fff`。

Body：Inter 字体，`height:100vh`，`padding:32px 40px`，`display:flex; flex-direction:column; overflow:hidden`，黑色 fallback 背景。

## Top Navigation（grid: `auto auto 1fr auto auto`，gap 16px，mb 40px）

1. **Profile button** - 48×48 圆形头像（复用 `example.html` 中内联的 `seed=current_user` `data:` 头像；绝不要获取远程头像 URL）。
2. **Toggle container** - pill，包含：
   - **Mode switch**（88×48 白色 pill，内部蓝色 track 76×40 `#3b82f6`，右侧白色 32×32 handle；dark mode 下 handle 通过 `transform: translateX(-36px)` 左移；小图标 `☾`/`☀` 通过 `translateX(42px)` 滑动）。
   - **Settings nav-btn** - pill，10px 24px，`rgba(0,0,0,0.04)` 背景带 blur，白色文字。
3. **Meeting alert**（justify-self center）- 白色 pill，`padding 6px 6px 6px 16px`，gap 12，shadow `0 4px 20px rgba(0,0,0,0.08)`。包含：32px host avatar（复用 `example.html` 中内联的 `seed=meeting_host` `data:` 头像；绝不要获取远程头像 URL）、label "Meeting is about to start"、灰色 time-tag pill "-5:23"（`#f0f0f0`，4px 10px），以及一个 32×32 close button，内含 SVG progress ring（灰色 track + 黑色 arc，`stroke-dasharray=88 stroke-dashoffset=25 rotate(-90)`）和居中的 Lucide `X`（12px）。移动端隐藏。
4. **View switcher** - pill，`rgba(0,0,0,0.04)` 背景，4px padding，两个按钮 "Dashboard" 和 "Rooms"；active = 白色背景、黑色文字、shadow `0 4px 12px rgba(0,0,0,0.1)`。默认 active = "Rooms"。
5. **Search button** - 48×48 圆形，Lucide `Search`。

## Dashboard Grid（4 列 × 2 行，24px gap，max-width 1400px，填满可用高度）

Card base：`padding:28px 20px`，flex column，`border-radius:40px`，hover `translateY(-3px) scale(1.01)`。

### Card 1 — Empty / Create Room（glass）
- 半透明深色 glass：light 为 `rgba(0,0,0,0.18)`，dark 为 `rgba(255,255,255,0.08)`。
- 居中 Lucide `Plus`（32px）+ label "Create a room"，白色文字。

### Card 2 — Subscription Growth Experiments（solid white）
- Title: "Subscription Growth Experiments"（1.35rem，weight 400，letter-spacing -0.03em）。
- Subtitle: "Sprint Retrospective"。
- Header icon: Lucide `Zap`（16px，opacity 0.5）。
- Footer：3 个重叠 32px 头像（`seed=1,2,3`，`margin-left:-12px`）+ count badge "9"（38×38 圆，`rgba(0,0,0,0.08)`）。

### Card 3 — Weekly Insights（solid white）
- 只有 title: "Weekly Insights"。
- **Bar chart**（height 60px，`gap:2px`，`align-items:flex-end`）：
  - 前 **24** 条 bar 为蓝色 `#3b82f6`，高度：`35,45,30,55,40,65,50,75,60,85,70,80,65,55,45,70,60,75,55,65,50,75,60,55`。
  - 后 **36** 条 bar 为灰色 `#e5e7eb`，高度：`45,70,60,75,55,65,50,75,60,85,70,55,45,70,60,75,55,65,50,75,60,55,45,70,60,75,55,65,50,75,60,55,45,70,60,75`。
- **Chart markers row**（`justify-content:space-between; padding:0 20px; margin-bottom:24px`）：单个 18px avatar `u=m1`，然后一组两个 `u=m2`（margin-right -8）+ `u=m3`，再一组 `u=m4`（-8）+ `u=m5`。全部有 1.5px 白色 border。
- Footer：两个重叠头像 `u=large1`、`u=large2`，加一个 54×54 白色 play button（`rgba(245,245,245,0.85)`），内含 Lucide `Play`（20px，fill black）。

### Card 4 — Product Strategy 2023（glass，深色半透明）
- Title "Product Strategy 2023" + subtitle "No upcoming meetings"。
- Header icon: Lucide `MoreHorizontal`（16px，opacity 0.5）。
- Footer：单个 32px 头像 `u=6` + count badge "32"。

### Card 5 — User Onboarding Team（solid white）
- Title "User Onboarding Team" + subtitle "Sprint Planning"。
- Header icon: Lucide `BarChart2`。
- Footer：3 个重叠头像 `u=7,8,9` + badge "3"。

### Card 6 — User & Market Research（glass）
- Title "User & Market Research" + subtitle "No upcoming meetings"。
- Icon: `MoreHorizontal`。Footer：avatar `u=10` + badge "6"。

### Card 7 — Core Product Team（solid white）
- Title 和 subtitle 都是 "Core Product Team"。
- Icon: Lucide `Video`。Footer：2 个重叠头像 `u=11,12` + badge "2"。

### Card 8 — Screen Share（solid card-alt；gradient `linear-gradient(to bottom,#f4f4f4 0%, #ffffff 50%, #ffffff 100%)`）
- Header row 两个 pill chip（justify start，gap 8）："Screen Share"（蓝色文字 `#3b82f6`）和 "0:30"（黑色文字）。二者均为白色 pill，`padding:6px 14px; font-size:0.75rem; box-shadow:0 2px 8px rgba(0,0,0,0.06)`。
- 横向滚动行（`overflow-x:auto; gap:12px; margin: 20px -20px 0; padding:0 20px 16px; hide scrollbar; cursor:grab; drag-to-scroll`）：
  - 4 张 160×100 缩略图，`border-radius:16px`，背景为 `https://picsum.photos/seed/screen1..4/300/200`。
  - 第 #2 张缩略图右下角浮动标签：24px avatar `u=alice_av` + 橙色 `#e05e36` pill，label "Alice"（白色文字 0.65rem，2px 8px，radius 100）。
- Footer：2 个头像 `u=13,14` + badge "8"（背景 `#F3F3F3`）。

## Indicators（grid 下方）

三个 12×12 dot，白色，gap 16，`margin: 24px 0 120px`。第一个 dot active（opacity 1）；其他 opacity 0.3。

## Bottom Bar（fixed，居中，glass pill）

`bottom:32px; left:50%; translateX(-50%); padding:10px 16px; border-radius:100px`。
Active-participants row：
- **Active speaker** 44×44 圆形 `u=speaker`，带 **voice indicator** badge（top-right -2/-2）：白色 18×18 圆，有 shadow，里面是 **3 条 wave bars**（2px 宽，灰色 `#4b5563`，通过 `@keyframes voice-wave` 在 4px 与 10px 高度之间动画，1s ease-in-out infinite，delays 0/0.2s/0.4s）。
- 40×40 participant `u=p1`（opacity 0.7）。
- 40×40 participant `u=p2`，带另一个 voice indicator。
- 40×40 participant `u=p3`。
- "+17" 40×40 圆 chip，`rgba(255,255,255,0.25)`，白色 bold。

## Components button（fixed bottom-left，离边缘 32px）

44×44 rounded-rect（radius 14，`rgba(0,0,0,0.04)` blur），2×2 网格放 4 个小头像 `u=c1..c4`。

## Floating Controls（fixed bottom-right，32px）

Pill `rgba(0,0,0,0.04)`，padding 10px 14px，gap 12。两个 44×44 圆形按钮：
- Video toggle: Lucide `Video` ↔ `VideoOff`。关闭时 bg `#ff4545`，白色 icon。
- Mic toggle: Lucide `Mic` ↔ `MicOff`。muted 时 bg `#ff4545`。
Hover: `scale(1.08)`。

## Glass Utility

```
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(8px) saturate(1.8);
  border-radius: 40px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5);
}
.glass::after { content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; filter:url(#noise-filter); opacity:0.06; mix-blend-mode:overlay; }
```

内联一个 SVG `<filter id="noise-filter">`，使用 `feTurbulence baseFrequency=0.65 numOctaves=3 stitchTiles=stitch` + `feComposite operator=in in2=SourceGraphic` 来生成 grain texture。

## Solid Card

`background:#fff; box-shadow:0 4px 20px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.01)`。Dark 中：`rgba(26,26,26,0.98)`，白色文字。

## Animations / Transitions

- 所有 interactive elements: `transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1)`。
- Card hover: `translateY(-3px) scale(1.01)` + 更大的 shadow。
- Theme-switch handle: `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)`。
- Voice waves: `voice-wave` keyframes（height 4px -> 10px -> 4px），3 条 staggered bars。
- Pulse-red keyframe 可用于 emergency（红色 ring expand-fade）。

## State / Interactions

- `isDark` 切换 `body.dark-mode` 并替换背景 `<video>`（替换时强制 reload）。
- View switcher 切换 active button。
- Mic/video buttons 切换 `muted`/`off` class，并替换 icon。
- Screen-share strip 支持鼠标拖拽滚动（mousedown/move/up/leave）。

## Responsive

- <=1200px：grid -> 2 columns，rows 280px，body 变为可滚动。
- <=768px：grid -> 1 column，padding 16px，隐藏 meeting alert，view-switcher 在第二行 full-width，bottom bar 接近 full width，floating controls + components button 上移到 bottom 80px。

## Color Rules — hard

完全避免 purple/indigo。Palette：蓝色 accent `#3b82f6`，中性 whites/blacks/greys，alert red `#ff4545`，orange tag `#e05e36`。所有文字在两个主题中都必须 contrast-safe。**不要替换成其他 accent hue（不要 teal/green/indigo）；蓝色 `#3b82f6` 已锁定。**
