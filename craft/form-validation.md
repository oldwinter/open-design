# Form validation craft rules

面向表单验证生命周期、超出 accessibility baseline 的错误连线，以及 schema-as-contract 层的一组通用规则，用来让同一套验证在 server 和 client 上都成立。当前 `DESIGN.md` 决定字段长什么样；本文件决定字段在*什么时候*告诉用户它错了、错误*如何*到达 assistive tech，以及规则*应该放在哪里*。

> 基于 primary sources：WHATWG HTML Living Standard（“Form control infrastructure” 下的 Constraint Validation section）、CSS Selectors L4（`:user-invalid`）、WCAG 2.2 SC 3.3.x Understanding pages、ARIA APG forms patterns、Standard Schema spec（`@standard-schema/spec`）、Baymard 2024 inline-validation research checkout-UX benchmark、WebAIM Million 2026 forms findings。

## Prior art and scope

现有 OSS forms guidance for AI agents 往往一次只钉住一层：`szilu/ux-designer-skill` 属于 UX-opinion grade，但没有 spec anchors；`Community-Access/accessibility-agents/forms-specialist` 以 WCAG 为锚点，但只覆盖 AT，没有触达 platform validity layer 或 schema contract。本文件把真实表单跨越的四层连起来：**WHATWG Constraint Validation 作为 platform floor，validation timing 作为输入状态机，WCAG 3.3.x 作为 announcement and recovery contract，schema 作为 cross-stack truth。** A11y 连线放在相邻的 `accessibility-baseline.md` 中（label + describedby + invalid + inline errors 的 `role="alert"`）；本文件从那里继续。

## The input state machine

每个输入都会经过这些状态。名称沿用 web 上 RHF / Formik 的 vocabulary；但这个*形状*适用于任何 stack。错误样式应该由状态驱动，而不是直接由原始 `:invalid` 或 focus/blur 布尔值驱动。

| State | Meaning | UI |
|---|---|---|
| `pristine` | 用户还没有交互 | 不显示错误样式，也不显示绿色勾 |
| `dirty` | 用户已输入但尚未提交该字段（仍聚焦） | 暂不显示错误样式 |
| `touched` | 用户编辑后至少 blur 过一次 | 运行字段级 constraint |
| `invalid-after-touched` | blur 后 constraint 失败 | 显示错误，并通过 `aria-describedby` 连接 |
| `invalid-after-submit` | 已尝试提交，但字段仍无效 | 同上，并把 focus 管理到 summary 或第一个 invalid field |
| `recovering` | 用户正在编辑一个已经 invalid 的字段 | 在 `input` 上重新验证，而不是等下一次 blur |
| `submitting` | action 正在进行 | 禁用 submit，并通过 polite live region announce status |
| `server-error` | server 返回该字段的错误 | 使用 server 的 message text；按 `invalid-after-submit` 处理 |

折叠 validation-timing 争论的决策规则：错误只在进入 `invalid-after-touched` 时出现，在离开任意 invalid state 时清除，并且永远不从 `pristine` 或普通 `dirty` 状态出现。CSS `:user-invalid` 可以免费匹配 `invalid-after-touched` / `invalid-after-submit` 状态。

## Validation timing

Baymard 的 checkout-UX benchmark（2024-01-09 inline-validation article）：**31% 的站点没有 inline validation，剩下的大多数又触发得太早。** 研究中最能说明问题的 participant quote 是：*"Why are you telling me my email address is wrong, I haven't had a chance to fill it all out yet?"* 过早触发是这个领域最刺耳的 UX failure。

四条规则：

1. **编辑后的第一次 blur** 运行字段级 constraint。不要在 focus 时、第一次按键时或每次按键时运行。
2. **字段一旦 invalid，就切换到 `input` event 重新验证**，这样输入变为 valid 的瞬间错误就能清除。不要让用户再次 blur 才能消掉错误。
3. **提交时**，运行 schema parse。把 focus 移到表单顶部的 error summary（一个 heading-led container，带 `tabindex="-1"`，不带 `role="alert"`；见 wiring section），或者在没有 summary 时移到第一个 invalid field。不要在每次按键时移动 focus。
4. **Async checks** 分成两条路径。*Background preflight*（输入过程中的唯一性检查、地址 lookup）使用 250-500 ms debounce，通过 polite live region announce，并且永远不 gate typing，也不让 submit button 无限期 disabled。*提交时的权威 server validation* 是另一回事：submit path 必须等待 server response，并展示 server 返回的 field errors，因为 server 才是真相。不要混淆二者：规则是“不要让缓慢的 background check 冻住表单”，不是“永远不要等 server”。

CSS 可以免费覆盖 timing rule 1 的大部分：用 `:user-invalid` 做样式，而不是 `:invalid`。`:user-invalid` selector 是 Baseline Newly available 2023（Chrome 119、Firefox 88、Safari 16.5；Firefox 很早以前就发了 prefixed `:-moz-ui-invalid`，v88 发了 unprefixed），只会在用户提交表单或用坏输入 blur 字段之后匹配。

## Constraint Validation API as the platform floor

Native HTML constraints 不是 JS validation 的替代品；它们是其余层运行的基底。它们能在 JS failure 后幸存，能和 autofill 集成，也是 `reportValidity()` 与 screen-reader native announcements 依赖的东西。

```html
<input type="email" name="email" required>
```

对每个具备声明式 constraint 的字段都使用它们：`required`、`type`（email、url、number、tel）、`pattern`、`min`/`max`、`minlength`/`maxlength`、`step`。Cross-field rules 和 dynamic constraints 通过 `setCustomValidity()` 放到 `input` 和 `change` events 上；autofill flows 历史上在某些 browser 中只触发其中一个，所以两个都监听是低成本防线。

API 规则：

- **空字符串会清除 `setCustomValidity`。** 不是 `null`，也不是无参数调用。
- **`form.requestSubmit()` 尊重 validation；`form.submit()` 会跳过它。** 永远不要调用后者。
- `disabled` controls 会被排除出 validation，也不会提交。HTML spec 说 `readonly` 同样被排除，但 `readonly` 只在 `<input>` 和 `<textarea>` 上有定义好的行为；`<select readonly>` 和 `<button readonly>` 的实现存在分歧（[whatwg/html#11841](https://github.com/whatwg/html/issues/11841)）。对于值仍需提交的非 input controls，安全模式是 `disabled` 加一个同名 hidden `<input>` 承载值，或渲染不可编辑文本并配一个 hidden `<input>`。单独使用 `aria-readonly` 不够：带 `aria-readonly="true"` 的 `<select>` 或 custom widget 仍可交互，所以 visible control 可能漂移，而 hidden input 提交 stale 或不同的值。如果确实使用 `aria-readonly`，还必须阻止交互，或保持两份值同步。
- `inputmode` 是 virtual-keyboard hint，**不是** validation。`<input type="text" inputmode="numeric" pattern="[0-9]*">` 是 Baymard 推荐给 ZIPs / OTPs / card numbers 的形状；`pattern="[0-9]*"` 是历史上在 `inputmode` 之外触发 iOS-Safari numeric keypad 的方式。`type="number"` 会加 spinners、去掉 leading zeros、应用 locale-decimal handling，并且在不同 browser 中改变 field width；对这些场景都不合适。

## Error wiring beyond the baseline

`accessibility-baseline.md` 中的默认 error pattern（`<label>` + `aria-describedby` + `aria-invalid` + `role="alert"`）覆盖 WCAG 3.3.1 / 3.3.2。真实表单还需要三个补充：

**Adaptive error messages.** Baymard 2023：98% 的 audited sites 使用 generic catch-all errors（"Provide a valid phone number"），而不是触发的具体 subrule（"Phone number is too short"）。后端本来就知道 subrule；把它暴露出来能减少重新提交次数。对高流量复杂字段（email、phone、card、postal code）提供 4-7 条不同 message。这个问题的规模也和 WebAIM Million 2026 一致：missing form-input labels 出现在 **51% 的 top 1M home pages** 上（input-level rate 是采样的全部 6.9M inputs 中的 **33.1%**）；在整体 a11y errors 下降时，labels 和 error messages 却是横盘甚至变差的类别。

**Error summary at the top, on submit only.** 长表单适合在提交时展示一个 summary list，里面是指向 invalid fields 的 in-page anchor links，并把 focus 移过去：

```html
<div id="form-errors" tabindex="-1">
  <h2>2 problems</h2>
  <ul>
    <li><a href="#email">Email is required</a></li>
    <li><a href="#dob">Date of birth must be in the past</a></li>
  </ul>
</div>
```

container 用 heading-led 结构并带 `tabindex="-1"`，这样 JS 可以在提交时把 focus 移过去（先把 summary render 到 DOM，*然后* `.focus()`；`hidden` element 不能获得 focus）。它**不**带 `role="alert"`，因为把 moved-focus target 和 alert role 组合会导致 double-announcement：插入时 alert 触发一次，focus 又读一次 accessible name + role。把 `role="alert"` 留给那些没有移动 focus、但会动态出现的 inline per-field errors；这是 `accessibility-baseline.md` 里的 canonical baseline pattern。WCAG technique G139 覆盖 summary；它不是必需项，但对长表单价值很高。

**Preserve user input on error.** Baymard 2024：34% 的 audited checkouts 会在不相关错误导致页面 reload 时清空 credit-card field。这会直接造成 abandon。要么先对 non-sensitive fields 做字段级验证，要么拆分 payment step。从 PCI 角度看，通过 tokenized hosted iframes 在 error reload 之间保留 card values 是可以的；永远不要把 raw PAN 存在自己的 session 里。

## Schema as the cross-stack contract

Validation 只表达一次，处处消费。2026 年的 React 形状是最常被引用的具体实例：`useActionState` + Server Actions + Conform（在 v1.x line 中加入 Standard Schema support）+ 一个 Zod 4 / Valibot / ArkType schema。一个 schema，server-authoritative，并通过 `~standard` interface 让 validator 可以热插拔。同样架构也适用于 TanStack Form、oRPC、Hono validator middleware、Nuxt UForm，以及任何读取 `~standard` 的 consumer。

```ts
const Signup = z.object({
  email: z.email(),                  // Zod 4 top-level form
  password: z.string().min(12),
});
// Same schema parses on the Server Action and on the Conform client.
```

跨 stack 都成立的三条规则：

- **Server is the truth, client is the optimization.** 同一套 schema 在两边运行。从 action 返回 `{ errors }`（而不是 throw）才能喂回 `useActionState` 的 state slot；throw 会走到 Error Boundary，并丢失表单数据。
- **Standard Schema is the contract, not Zod.** 一个还在发布 per-validator resolver shims（`zodResolver`、`valibotResolver` 等）的 form library 是昨天的 stack。接受任何符合 `~standard` 的 validator。
- **`<form>` 上的 `novalidate` 不等于“跳过 validation”。** 它的意思是“让 form library 重绘错误，而不是使用 browser bubble”。但 trade-off 真实存在：字面意义上的 server-rendered `<form novalidate>` 会禁用 browser 的 submit-blocking 和 native validation UI，**即便 JS 不可用**，从而失去 no-JS constraint-validation floor。二选一。**A：** server-side 渲染不带 `novalidate` 的 `<form>`，并让 form library 在 hydration 后设置 `form.noValidate = true`；no-JS user 保留 browser native validation，JS user 得到 library chrome。**B：** 只有当 submit path 在没有 JS 时也会抵达 server validation（Server Action、classic POST handler）时，才一开始就带 `novalidate`，这样 no-JS user 仍由 server 保护。无论哪种，都保留 `required` / `pattern` / `type` attributes；它们能在 JS failure 后幸存，并与 autofill 集成。（HTML attribute 是小写 `novalidate`；form element 上的 IDL property 是 `noValidate`。）

## WCAG 3.3.x beyond Error Identification

`accessibility-baseline.md` 覆盖 3.3.1（Error ID）、3.3.2（Labels）和 3.3.7（Redundant Entry）。3.3 的其余部分对 transactional forms 约束更强：

- **3.3.3 Error Suggestion (AA)：** 当修复方式可以确定时，用文本建议修复方式。Adaptive errors 满足这一点。"Date must be MM/DD/YYYY. You entered 5-3-26. Did you mean 05/03/2026?"
- **3.3.4 Error Prevention — Legal, Financial, Data (AA)：** 对任何具有法律、财务或数据修改后果的提交，提供以下任一项：可逆性、server-side check + correction step，或 commit 前的 confirm-summary screen。
- **3.3.8 Accessible Authentication (AA, WCAG 2.2)：** auth steps 不能要求 cognitive function test（记住密码、抄写 code、识别图片），除非提供 alternative。CAPTCHAs 是该 SC 限制的 canonical 对象；只有 object-recognition 或 personal-content variants 能通过狭窄例外，并非所有 CAPTCHAs 都可以。实用底线：永远不要阻止 password / verification-code fields 粘贴，支持 password managers，接受从 clipboard 粘贴 verification-code。
- **3.3.9 Accessible Authentication, No Exception (AAA)：** 连 object-recognition / personal-content exceptions 也移除。它是 aspirational；如果项目承诺它，需要明确标注。

## Native mobile parity

Web validation primitives 不会自动迁移。每个平台都有自己的 validity machinery 和 AT path。只输出 web-only artifacts 的 skills 可以略读本节；它是会交付到 mobile 的 skills（mobile-onboarding、mobile-app 等）的入口。

| Platform | Validity primitive | Error announcement |
|---|---|---|
| iOS UIKit | 在 view controller 上手写 state；`UITextField` 没有内建 invalid flag | `UIAccessibility.post(notification: .announcement, argument: "Email is required")` |
| iOS SwiftUI | `TextField` + `@State` 驱动 validation；截至 iOS 18，没有内建 `Form`-level validity API | `AccessibilityNotification.Announcement("…").post()` (iOS 17+) |
| Android Compose | `OutlinedTextField(isError = true, supportingText = { Text("…") })`；`isError` 会为你连上 AT error semantic | 在 supporting-text node 上使用 `Modifier.semantics { liveRegion = LiveRegionMode.Polite }`，或 `LocalView.current.announceForAccessibility(message)` |
| Flutter | `Form` 中的 `TextFormField(validator: (v) => …)`，`formKey.currentState!.validate()` | `SemanticsService.announce(message, Directionality.of(context))`；不要 hardcode `TextDirection.ltr`，从 ambient direction 读取，这样 Arabic / Hebrew / Persian flows 才能正确 announce |
| React Native | 每个字段手写；没有 platform validity flag | error node 上用 `accessibilityLiveRegion="polite"`（Android）+ `AccessibilityInfo.announceForAccessibility(...)`（iOS） |

抓住大多数 AI-generated mobile forms 的两个 parity rules：

- **使用平台 native validation flag，并在存在平台 error-message semantic 时配套使用。** 在 Compose 中，`isError = true` 是 field visuals 和 AT error-state cue 的正确 boolean state，但它*不会*携带 localized error message。把它和 `Modifier.semantics { error(message) }` 配对，让 accessibility services 得到真实文本，也就是你在 `supportingText` 中渲染的同一个字符串。陷阱是 duplication：手写的 `Modifier.semantics { error("Email is required") }` 如果和另一个 supporting-text string 并排，就会 desync。让 `error()` 和 `supportingText` 来自同一个 state field，保持同步。
- **不要把 web ARIA 镜像到 mobile semantics。** SwiftUI `TextField` 上的 `aria-describedby` 是 no-op。对需要传达给 screen reader 的 state-change events，使用平台 announcement primitive（SwiftUI 上的 `AccessibilityNotification.Announcement`、UIKit 上的 `UIAccessibility.post`、Android 上的 `announceForAccessibility`、Flutter 上的 `SemanticsService.announce`）。

## Common mistakes (lint these)

- 基于 `input:invalid` 而不是 `input:user-invalid` 做样式。页面加载时出现红边框，是“这个 validation 没测过”的最响亮信号。
- 每次 keystroke 都验证。敌意很强；用户还没输完就触发。
- 后端已经知道哪个 subrule 触发，却使用 generic catch-all error messages（"Invalid input"）。Baymard 2023 发现 98% 的 audited sites 都这么做；这是其 corpus 中最常被引用的可避免 validation failure。
- 在 Server Action validation failure 时 throw。它会走到 Error Boundary，并丢失 form data。改为返回 `{ errors }`。
- 在 focus 会移动到的 error-summary container 上放 `role="alert"`。会 double-announce。把 `role="alert"` 留给那些没有移动 focus、但会出现的 inline per-field errors。
- 提交期间在 submit button 上使用 `aria-busy="true"`。`aria-busy` 用于 stale containers；button 应使用 `disabled` 加 polite live-region status message。
- Email-confirm fields（“重新输入 email”）。3.3.7 redundant entry；例外是 essential / security / no-longer-valid，而不是“我们想抓 typo”。允许 paste，并验证单个字段。
- 2026 stack 上还用 per-validator resolver shims（`zodResolver`、`valibotResolver`）。接受 Standard Schema 的 `~standard` interface，让 validator 可替换。
- 不相关字段报错时清空 credit-card field。Baymard 2024：34% 的 audited e-commerce sites 有这个问题；它会直接导致 abandon。
- 用 `setCustomValidity(null)` 清除错误。传空字符串；`null` 不会清除。
- 把 web ARIA 镜像到 SwiftUI / Compose / Flutter。每个平台都有自己的 validity API；`aria-*` attributes 不会到达 mobile AT path。
