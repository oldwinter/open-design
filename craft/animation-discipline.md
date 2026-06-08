# Animation discipline craft rules

关于 motion 何时值得进入 UI，以及用哪些数值约束它的 universal rules。Active `DESIGN.md` 决定 brand-specific motion personality；本文件决定 motion 是否应该运行，以及 duration、easing 和 accessibility floor 应如何设置。

> 基于 primary sources：Tversky/Morrison/Bétrancourt 2002 (IJHCS)、Heer & Robertson TVCG 2007、Harrison/Yeo/Hudson CHI 2010、Doherty & Thadani IBM Systems Journal 1982、Chang & Ungar UIST 1993、Material 3 motion tokens、IBM `@carbon/motion`、Apple SwiftUI Animation API、W3C View Transitions、WCAG 2.2.2 + 2.3.3、WebKit 2017 年 `prefers-reduced-motion` rationale。

## Motion 何时值得存在

Tversky/Morrison/Bétrancourt 2002 年的 meta-analysis（IJHCS 57, pp. 247-262）发现，每个声称 animation 有助于理解的研究都有 broken control：static version 信息更少、procedure 不同，或隐藏了 interactivity。Equalised 后，animation 在教授复杂系统时**并不**优于 static。论文认可的唯一 use case 是 real-time spatial 或 temporal reorientation：page transitions、container morphs、viewpoint changes、progress indicators（p. 257）。

后续还有一个风险：Palmiter & Elkerton 发现，animation-trained users 在训练后一周*退步*，而 text-trained users *进步*（Tversky 2002, p. 255）。Animation 表面的短期持平掩盖了更差的 retention。

所以，只有当用户正在穿越空间、时间或状态时才 animate：navigation、container expansion、progress feedback、gesture follow-through。不要为了教学、装饰、暗示 "premium" 或填补沉默而 animate。

## Duration thresholds

跨 design systems 的收敛点是 **150 ms**：Material 3 `short3`、IBM Carbon `moderate-01`、Shopify Polaris `150`、Tailwind default、SLDS `duration-fast` 都落在这里。把它作为 state-confirmation feedback 的 default duration。

| Duration | Use |
|---|---|
| 50–100 ms | Instant feedback（button press、toggle commit、hover） |
| 150 ms | State-confirmation 的默认值 |
| 200–300 ms | Entering UI（modals、sheets、dropdowns） |
| 300–500 ms | Cross-screen transitions、container morphs |
| > 500 ms | 仅保留给 cross-screen、staged 或 platform-native transitions（例如 M3 `long2`-`extraLong4`、Heer & Robertson 2007 的 per-stage recommendation）。 |

Non-navigation microinteractions，例如 hover、press、toggle、validation、chip selection、row expansion，应保持在 500 ms 以下。超过这个阈值后，用户会注意到 motion 本身，并等待 UI，而不是继续工作。两点补充：频繁 animations（每个 session 中可能看到 50 次的 hover effect）应保持 ≤200 ms；mobile animations 应比 desktop equivalents 短 20–30%，因为 travel distance 更短。

## Curve vs spring

Opacity、color，以及任何在两个已知点之间改变 value 的 property 使用 curve。Position、scale、rotation 和 gesture-driven motion 使用 spring；也就是任何应该感觉物理的东西。

Material 3 standard easing 是 `cubic-bezier(0.2, 0, 0, 1)`，它是 front-loaded；尾部的 zero 让 curve 立即到达 target 并 settle。M2 standard 是对称的 `cubic-bezier(0.4, 0, 0.2, 1)`，在 M3 中以 `legacy` 名称保留。任何仍使用 M2 curve 却称其为 "M3" 的实现都在使用 legacy tokens。M3 `emphasized` 是**two-segment Bézier path**，不是 single cubic-bezier；single-cubic approximations 会静默丢失 front-loaded character。CSS `linear()`（Chrome 113+）是在单个 property 上复制它的唯一方式。

Apple published SwiftUI default spring 是 `(response: 0.5, dampingFraction: 0.825, blendDuration: 0)`。广泛引用的 `.snappy = 0.25 s, .smooth = 0.35 s` 数字是错的；Apple docs 将三个 presets 都分配为 0.5 s base，只在 bounce（0 / 0.15 / 0.3）上不同。

Spring framework defaults 并不一致。motion.dev physics-mode default 是 ζ ≈ 0.5（bouncy）。React Spring 的 `default` 是 ζ = 0.997（critically damped）。同一个词 "default"，感觉相反；React Spring 的 `wobbly` 才是 motion.dev `default` 的实际 feel-equivalent。请有意识地选择。

## Reduced motion

任何 translate、scale、rotate 或 parallax 的 animation 都必须尊重 `@media (prefers-reduced-motion: reduce)`。WebKit 在 2017 年推出它是为了解决 vestibular triggers；W3C MQ5 spec 允许 UA 或 author **完全 strip motion 或替换为 static imagery**，spec 不强制具体方式。

工作规则：strip motion-on-an-axis（translate、scale、rotate、parallax）。当 state change 仍需表达时，保留 opacity/color crossfades 作为替代。要显式处理：View Transitions API **不会**自动应用 `prefers-reduced-motion`；author 必须在 pseudo-elements 上添加 query override，或完全跳过 `startViewTransition`。

WCAG calibration：2.2.2（Pause/Stop/Hide）是 Level A，也是 ADA Title II 2024 / EN 301 549 / EAA 下的 legal floor，但它命名的是 cognitive、attentional 和 reading populations，不是 vestibular。Vestibular language 位于 2.3.3，属于 **AAA**。不要混淆两者。为 vestibular users 构建是超过 legal floor 的 craft commitment，不是 WCAG mandate。

**Flashing limits.** WCAG 2.3.1（Level A）只允许在任意一秒内不超过三次 flashes，或 flashing area 低于 general 与 red flash thresholds。WCAG 2.3.2（AAA）无论 area 或 brightness 如何，都禁止一秒内超过三次 flashes。受保护的问题是 photosensitive epilepsy；legal floor 不可协商。对于 gamified UI、onboarding celebrations、sparkles、confetti、level-up bursts 和 shimmer：除非已根据 thresholds 测试，否则避免 rapid flashing，并优先使用 one-shot animations 而不是 loops。

## Repeated and ambient motion

上面的规则面向 one-shot transitions。Looping motion（skeleton shimmer、idle backgrounds、autoplay、reward bursts）有不同 constraints。

- 限制 iteration count：carousels 运行 3-5 cycles 后暂停；skeleton shimmer 只持续到 content 到达，绝不无限运行。
- WCAG 2.2.2（Level A）要求任何运行超过 5 秒的 motion 都有 pause control，包括 moving、blinking 或 scrolling content，不只是 video。
- Route change 时取消 ambient motion。
- Reward animations 是 one-shot。Confetti、sparkles、level-up bursts 触发一次并 dismiss；不要 looping timer。
- Spinners 不得无限运行。升级为 progress/cancel states，并在 60 s 停止 animation，与 `state-coverage.md` 保持一致。

## Cross-platform handoff

Native conventions 会分叉。

- **iOS** 使用带 perceptual `(response, dampingFraction)` parameters 的 spring physics。Apple HIG 记录 principles，不记录 numerical curves；SwiftUI Animation API JSON 是实际数字的来源。网上常见的 UIView curve cubic-beziers 是 reverse-engineered，不是 Apple-published。
- **Android** 通过 M3 motion tokens 使用 cubic-bezier curves（50–1000 ms range，16 个 named durations）。Predictive back 是 *gesture-progress primitive*，不是 transition primitive；`BackEvent.progress` 每帧从 touch stream 采样，destination 在 current surface 背后渲染，同时 current surface 仍在其上。Cancellation 是 first-class lifecycle state。
- **Web** 有 View Transitions API（默认 0.25 s，spec 未指定 easing，会落到 CSS `ease`）。Same-document support 90.94%；cross-document 87.82%。Cross-document 只限 same-origin 且 user-initiated。

"一条 curve 适配所有 platforms" 的方法在每个平台上都会失败。如果 brief 指定 platform fidelity，就遵循 platform；如果指定 brand consistency，就选择一种 motion vocabulary 并全局应用。

## Common mistakes（lint these）

- "Skeleton screens feel 11% faster"：Harrison/Yeo/Hudson CHI 2010 测量的是 *backwards-decelerating ribbed determinate progress bars*（n=16）。Induced-motion mechanism 不会迁移到 skeletons。
- "Heer & Robertson recommend 300–1000 ms eased transitions"：他们只测试了 1.25 s 和 2 s。他们的 recommendation 是 "~1 second per stage"。
- "Doherty Threshold = 400 ms"：1982 年论文不包含 "400"。实际测到的最低 threshold 是 300 ms。
- 将 M2 standard easing `cubic-bezier(0.4, 0, 0.2, 1)` 标为 "Material 3"。M3 standard 是 `cubic-bezier(0.2, 0, 0, 1)`。
- Animations *执行* state change，而不是*确认*已经发生的 state change。Optimistic UI first；motion second。
- 任何 non-cross-screen transition 超过 500 ms。
- Animation 是 state change 的唯一信号。Reduced-motion users 会错过它；始终配对 static affordance（color、position、label）。
- 在 transform-based animations 上忽略 `prefers-reduced-motion`，这是最高成本的 vestibular triggers。
- 对应感觉物理的 `transform: scale()` 使用 curve-based animation。请使用 spring。
- Productivity tools 中的 hero choreography。Motion budget 应放在 product 内部的 functional micro-feedback，而不是 landing-page sequences。
- Productivity tool 的 working canvas 中出现 decorative motion。
