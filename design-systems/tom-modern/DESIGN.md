# Tom Modern Design

> Category: Starter
> 编辑式技术设计系统。中性画布、单一朱红强调色、锐利直角、Geist 字体、硬偏移阴影、结构化构图。

## 1. Visual Theme & Atmosphere / 视觉主题与氛围

Tom Modern Design 是一种编辑式技术设计风格：结构严谨、锐利、克制、高级、意图明确且拒绝泛化。它呈现为经过深思熟虑的设计，而不是批量生成的初创公司模板。

系统以近白中性画布（`#fafafa`）为基础，搭配深墨色文本（`#27272a`）。唯一的主要强调色朱红（`#ff5a00`）承载所有交互强调。正文使用 Geist Sans，标签、元数据和技术说明使用 Geist Mono。所有转角都保持锐利（0px 圆角）。阴影采用硬偏移，绝不柔化。

页面背景上的细腻 30px 网格、结构线条，以及安静白色区域与密集信息带之间的对比共同塑造氛围。设计避免装饰性噪声：不使用有机团块、不使用渐变，也不使用发光效果。

**关键信号：**
- 高对比深墨色文本搭配中性近白画布
- 单一朱红强调色，仅用于 CTA、链接和高亮
- 全局采用锐利的 0px 转角，矩形轮廓即品牌特征
- 使用硬偏移阴影（`8px 8px 0`）表现层级
- Geist Sans/Mono 字体搭配清晰层级
- 采用非对称构图的编辑式分栏布局
- 眉题和元数据使用大写紧凑标签

**应避免的反模式：**
- 泛化的居中式初创公司主视觉
- 默认使用紫色渐变
- 圆角卡片和按钮
- 米色或奶油色背景
- 有机团块式装饰元素
- 重复且完全相同的卡片网格

## 2. Color Palette & Roles / 色彩与角色

### 主要色

| Token | 十六进制值 | 角色 |
|---|---|---|
| `--accent` | `#ff5a00` | 主要强调色：CTA、链接、交互高亮、强调词 |

### 表面

| Token | 十六进制值 | 角色 |
|---|---|---|
| `--bg` | `#fafafa` | 页面背景：中性近白色，绝不偏暖 |
| `--surface` | `#ffffff` | 卡片和面板表面 |
| `--surface-warm` | `var(--surface)` | 用于章节节奏的替代表面（作为表面别名） |

### 文本

| Token | 十六进制值 | 角色 |
|---|---|---|
| `--fg` | `#27272a` | 主要文本：标题、正文、按钮 |
| `--fg-2` | `#52525b` | 次要文本：描述、导语段落 |
| `--muted` | `#71717a` | 弱化文本：说明文字、标签、元数据 |

### 边框

| Token | 十六进制值 | 角色 |
|---|---|---|
| `--border` | `#969696` | 主要边框：卡片轮廓、结构线 |
| `--border-soft` | `#d4d4d8` | 弱化边框：细微分隔线 |

### 阴影（品牌专属）

| Token | 值 | 角色 |
|---|---|---|
| `--tm-shadow-hard` | `8px 8px 0 rgba(150,150,150,0.12)` | 硬偏移阴影：悬停状态、强调 |
| `--tm-shadow-soft` | `4px 4px 0 rgba(150,150,150,0.1)` | 软偏移阴影：默认卡片状态 |

### 代码窗口（品牌专属）

| Token | 十六进制值 | 角色 |
|---|---|---|
| `--tm-code-bg` | `#111517` | 代码窗口背景 |
| `--tm-code-panel` | `#151a1d` | 代码窗口标题栏 |
| `--tm-code-text` | `#d8dee9` | 代码文本 |

### 背景图案

页面背景使用 30px 网格：
```css
background-image:
    linear-gradient(rgba(150, 150, 150, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 150, 150, 0.04) 1px, transparent 1px);
background-size: 30px 30px;
```

## 3. Typography Rules / 字体规则

### 字体家族

- **主要字体：** Geist Sans：正文、标题、按钮、导航
- **等宽字体：** Geist Mono：标签、元数据、代码、技术说明

### 层级

| Token | 字号 | 字重 | 行高 | 字距 | 用途 |
|---|---|---|---|---|---|
| 展示 | `clamp(2.3rem, 5vw, 4.8rem)` | 700 | 0.96 | -0.04em | 主视觉标题 |
| 章节 | `clamp(21px, 2vw, 25px)` | 700 | 1.15 | -0.03em | 章节标题 |
| 卡片 | 18px | 700 | 1.38 | -0.03em | 卡片标题 |
| 正文 | 14px | 400 | 1.6 | 0 | 正文文本 |
| 说明文字 | 12px | 400 | 1.4 | 0 | 说明文字、细则 |
| 眉题 | 12px | 700 | 1 | 0.14em | 大写标签 |
| 按钮 | 13px | 700 | 1 | 0.08em | 按钮标签 |
| 等宽 | 12px | 700 | 1 | 0.14em | 技术标签 |

### 原则

- **Geist Sans** 贯穿所有表面：展示文本、正文、UI、按钮
- **Geist Mono** 仅用于标签、元数据、代码和技术微文案
- 展示标题使用 700 字重并搭配紧凑行高（0.96–1.15）
- 正文使用 400 字重并搭配宽松行高（1.6）
- 大写标签使用 0.14em 字距，营造“机械加工”质感
- 每个标题只使用一个强调词：`<span class="title-highlight">word</span>`

### 字体替代方案

如果 Geist 不可用：
- **Inter**，字重 400/500/600/700：略窄；字号增加约 3%
- **Manrope**，字重 400/500/600/700：比例更接近，曲线更柔和
- **IBM Plex Sans**，字重 400/500/600/700：更宽，机械感更强

## 4. Component Stylings / 组件样式

### 按钮

- **主要按钮：** 深色填充（`--fg`）、白色文本、0px 圆角，悬停时显示硬阴影
- **次要按钮：** 透明背景、深色文本、1px 边框，悬停时使用白色填充
- **块级按钮：** 任意按钮的全宽变体

### 卡片

- **框架：** 白色表面、1px 边框、软阴影
- **面板：** 白色表面、1px 边框、硬阴影、强调色顶部边框（4px）
- **功能卡片：** 2 列网格，可选全宽变体
- **三列功能卡片：** 带图标标题的 3 列网格

### 导航

- **页眉：** 吸顶、模糊背景（`rgba(250,250,250,0.88)`）、1px 底部边框
- **导航链接：** Geist Sans、次要文本色
- **CTA 按钮：** 深色填充，与主要按钮一致

### 表单

- **输入框：** 白色背景、1px 边框、44px 高度，聚焦时使用强调色边框
- **文本区域：** 与输入框一致，可调整大小
- **标签：** 等宽字体、大写、弱化色

### 高级组件

- **Token 卡片：** 深色渐变（`#14192B` → `#1B2A3D` → `#11393A`）、全息光泽动画、等宽字体、带圆形切口的打孔线
- **代码窗口：** 深色背景（`#111517`）、macOS 风格交通灯圆点、氛围渐变叠层、7 个语法高亮 token

### 标签页

- **标签页导航：** 水平排列、等宽字体、大写，激活时显示强调色底部边框
- **标签页面板：** 默认隐藏，添加 `.is-active` 类后显示

### 常见问题

- **条目：** 带可展开答案的框架
- **问题：** 全宽按钮、加号/减号图标
- **答案：** 默认隐藏，添加 `.is-open` 后显示

## 5. Layout Principles / 布局原则

### 容器

- 最大宽度：1240px
- 内边距：`min(100% - 40px, 1240px)`
- 使用 `margin: 0 auto` 居中

### 章节

- 垂直内边距：96px
- 交替章节使用 `rgba(255,255,255,0.72)` 背景和 1px 边框

### 网格系统

- **主视觉：** 2 列分栏（0.92fr / 1.08fr），间距 42px
- **功能网格：** 2 列，可选全宽卡片
- **三列功能区：** 带图标标题的 3 列布局
- **更新/痛点：** 3 列网格
- **定价/联系：** 2 列分栏
- **页脚：** 3 列（2fr / 1fr / 1fr）

### 章节节奏

章节在以下两种样式之间交替：
1. 白色背景（`--bg`）
2. 替代表面（带边框的 `rgba(255,255,255,0.72)`）

这能在不改变颜色的情况下形成视觉节奏。

## 6. Depth & Elevation / 深度与层级

| 层级 | 处理方式 | 用途 |
|---|---|---|
| 0 — 平面 | 无阴影、无边框 | 正文文本、章节背景 |
| 1 — 边框 | 1px `--border` 边框 | 卡片、面板、输入框 |
| 2 — 软阴影 | `4px 4px 0 rgba(150,150,150,0.1)` | 默认卡片状态 |
| 3 — 硬阴影 | `8px 8px 0 rgba(150,150,150,0.12)` | 悬停状态、强调 |
| 4 — 代码阴影 | `0 28px 90px rgba(22,22,22,0.14)` | 仅用于代码窗口 |

系统依靠**色彩对比**（表面与背景的对比）而非阴影深度建立层级。阴影仅用于交互反馈和高级组件。

## 7. Do's and Don'ts / 应做与禁忌

### 应做

- 将 `{colors.primary}` 用于 CTA、链接和交互高亮，并保持克制
- 展示标题使用 Geist Sans、700 字重和紧凑行高
- 正文保持 400 字重：粗重展示文本与轻量正文的对比是字体标志
- 默认使用 `{rounded.none}`（0px）：锐利的矩形轮廓就是品牌
- 主要内容带之间的间距与 `{spacing.section}`（96px）对齐
- 将产品摄影放在 `{rounded.xl}` 容器内
- 按钮标签使用大写和 0.08em 字距
- 悬停效果使用硬阴影，默认状态使用软阴影
- 所有按钮标签使用 `{typography.button}`

### 禁忌

- 不要引入检测到的调色板之外的强调色：这个系统有意保持封闭
- 不要加粗正文：正文保持 400 字重
- 不要添加柔和投影或氛围渐变：品牌使用硬边框和平面填充
- 按钮圆角不要超过 `{rounded.sm}`：柔软的按钮会呈现为另一个品牌
- 不要使用米色或奶油色背景：画布必须保持中性（`#fafafa`）
- 不要到处使用装饰性动效：动画必须有明确目的
- 不要通过降低深墨色文本的不透明度建立层级：切换表面或改用 `{colors.muted}`
- 一个标题中不要使用多个强调词：每个章节最多一个

## 8. Responsive Behavior / 响应式行为

### 断点

| 名称 | 宽度 | 主要变化 |
|---|---|---|
| Mobile | < 560px | 单列、紧凑内边距（24px）、较小字号 |
| Tablet | 560–980px | 2 列网格、主视觉堆叠 |
| Desktop | > 980px | 完整布局、最大宽度 1240px |

### 触摸目标

- 所有交互元素的最小尺寸为 44×44px
- 按钮：44px 高度 + 24px 水平内边距
- 导航链接：将点击区域扩展到整行高度

### 折叠策略

- **主视觉：** 低于 980px 时堆叠为单列
- **功能网格：** 低于 980px 时从 2 列变为 1 列
- **三列网格：** 3 列 → 2 列 → 1 列
- **页脚：** 3 列 → 2 列 → 1 列
- **导航：** 移动端使用汉堡菜单（CSS 中未包含，请按项目实现）

### 图像行为

- 主视觉摄影占满全部宽度
- 产品缩略图保持宽高比
- 生活方式摄影在移动端使用横向裁剪

## 9. Agent Prompt Guide / 智能体提示指南

### 快速色彩参考

```
背景：      #fafafa（中性近白色）
表面：      #ffffff（纯白色）
文本：      #27272a（近黑色）
次要文本：  #52525b
弱化文本：  #71717a
强调色：    #ff5a00（朱红）
边框：      #969696
弱化边框：  #d4d4d8
```

### 可直接使用的提示词

```
使用 Tom Modern Design 风格创建一个落地页：

- 背景：#fafafa，叠加 30px 网格
- 字体：正文使用 Geist Sans，标签使用 Geist Mono
- 颜色：文本使用 #27272a，强调色使用 #ff5a00，表面使用 #ffffff
- 转角：0px（锐利，绝不使用圆角）
- 阴影：悬停时使用 8px 8px 0 rgba(150,150,150,0.12)
- 布局：分栏主视觉、2 列功能网格、结构化章节
- 按钮：大写、0.08em 字距、主要按钮使用深色填充
- 卡片：白色表面、1px 边框、软阴影
- 章节：在白色与 rgba(255,255,255,0.72) 之间交替
- 每个标题使用一个强调词，并用 <span class="title-highlight"> 包裹
- 眉题：章节标题上方使用大写等宽标签
```

### 必需的字体加载

使用 Tom Modern 生成 HTML 时，必须显式加载 Geist。`tokens.css`
声明了 `Geist Sans` 和 `Geist Mono` 字体家族名称，但生成的
artifact 不会自动继承 `@font-face` block；该 block 位于 `components.html` 中。

在任何引用 `--font-display`、`--font-body` 或 `--font-mono` 的生成 CSS 之前使用以下加载器：

```css
@font-face {
    font-family: 'Geist Sans';
    src: url('https://cdn.jsdelivr.net/npm/geist@1.7.2/dist/fonts/geist-sans/Geist-Variable.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
}

@font-face {
    font-family: 'Geist Mono';
    src: url('https://cdn.jsdelivr.net/npm/geist@1.7.2/dist/fonts/geist-mono/GeistMono-Variable.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
}
```

如果宿主项目能够自行提供字体，优先将等效的本地
woff2 文件打包到 `fonts/` 下，同时保持字体家族名称不变。

### 组件类

```css
/* Layout */
.container          /* max-width 1240px, centered */
.section            /* 96px vertical padding */
.section-alt        /* alternate background */
.frame              /* card with border + shadow */

/* Typography */
.eyebrow            /* uppercase mono label */
.title-highlight    /* accent-colored text */
.section-head       /* section header */

/* Buttons */
.button             /* base button */
.button-primary     /* dark filled */
.button-secondary   /* transparent outlined */
.button-block       /* full-width */

/* Hero */
.hero-grid          /* 2-col layout */
.hero-lead          /* lead paragraph */
.hero-actions       /* button group */

/* Features */
.feature-grid       /* 2-col with wide cards */
.feature-3col       /* 3-col with icons */

/* Interactive */
.tab-shell          /* tab container */
.faq-item           /* accordion item */

/* Premium */
.key-card           /* dark gradient with sheen */
.tm-code-window     /* code editor display */
```
