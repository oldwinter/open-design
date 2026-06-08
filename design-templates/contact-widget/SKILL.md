---
name: "contact-widget"
description: "自包含的浮动聊天组件，包含欢迎屏、社交链接、预约按钮和消息输入。单个 HTML 文件，零依赖。"
triggers:
  - "contact widget"
  - "chat widget"
  - "floating chat"
  - "live chat widget"

od:
  mode: "prototype"
  platform: "desktop"
  scenario: "engineering"
  preview:
    type: "html"
    entry: "example.html"
    width: 420
    height: 640
    reload: "debounce-300"
  design_system:
    requires: false
  inputs:
    - name: primary_color
      type: string
      default: "#4F7CFF"
    - name: agent_name
      type: string
      default: "Assistant"
    - name: greeting
      type: string
      default: "Hello! How can I help you today?"
    - name: is_available
      type: boolean
      default: true
    - name: social_telegram
      type: string
      default: ""
    - name: social_whatsapp
      type: string
      default: ""
    - name: social_instagram
      type: string
      default: ""
    - name: meeting_url
      type: string
      default: ""
    - name: offline_message
      type: string
      default: "We're currently offline. Leave a message and we'll get back to you!"
  outputs:
    primary: example.html
  example_prompt: "Create a contact widget for my portfolio site. Primary color #4F7CFF, agent name 'Alex', greeting 'Hey! How can I help you today?', show Telegram and WhatsApp links."
---

# Contact Widget

## 这个 skill 会产出什么

一个自包含的 HTML 文件，内含浮动聊天组件：

1. **Chat bubble** - 固定在右下角的圆形按钮，用于打开/关闭面板。
2. **Welcome home screen** - Agent 头像、名称、在线状态和问候语。
3. **Message input** - 带 emoji/send 图标的输入框（仅 UI；需要用户自行接后端）。
4. **Social links** - 一排圆形图标（Telegram、WhatsApp、Instagram、Messenger、Discord、Slack；只显示用户提供的链接）。
5. **Meeting card** - 可选的 "Book a meeting" 入口，带日历图标，链接到用户提供的 URL（Calendly、Cal.com、Lark 等）。
6. **Offline form** - 当 `is_available=false` 时显示的备用联系表单（name、email、message）。
7. **Mobile responsive** - 小视口下全宽显示。

输出是**纯前端**。没有 tracking、没有 phone-home、没有必需的外部服务。加载后可离线工作。

## 设计方向

干净、极简的 SaaS 审美。它应该像真实产品组件，而不是玩具 demo：

- **Typography:** Inter (Google Fonts)，14px 基准字号，标题 semi-bold。
- **Colors:** 用户选择的单一 `primary_color` 驱动 bubble、avatar、send button 和 accent。其他颜色使用中性 slate palette（`#1e293b` / `#64748b` / `#f1f5f9`）。**不要紫色渐变，不要 glassmorphism，不要 AI 风格彩虹 accent。**
- **Radius:** 卡片 16px；bubble 和头像全圆。
- **Shadows:** widget panel 使用细腻的 `0 8px 32px rgba(0,0,0,0.12)`，bubble 使用 `0 4px 12px`。
- **Spacing:** 内边距 16px，元素间距 12px。
- **States:** Hover 时按钮变暗约 5%，active 时 bubble 缩放到 0.95。

## Inputs

这个 skill 接受用户提供的以下参数：

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `primary_color` | color | `#4F7CFF` | 驱动 bubble、header、send button 和 accent |
| `agent_name` | string | `Assistant` | 显示在 header 问候区 |
| `greeting` | string | `Hello! How can I help you today?` | Header 中的副标题 |
| `is_available` | boolean | `true` | 在线状态；`false` 时显示 offline form |
| `social_telegram` | string | _(empty)_ | Telegram 链接；为空时省略 |
| `social_whatsapp` | string | _(empty)_ | WhatsApp 链接；为空时省略 |
| `social_instagram` | string | _(empty)_ | Instagram 链接；为空时省略 |
| `meeting_url` | string | _(empty)_ | 预约 URL（Calendly、Cal.com 等）；为空时省略 |
| `offline_message` | string | `We're currently offline. Leave a message and we'll get back to you!` | `is_available=false` 时显示 |

## 工作流

1. 向用户询问：primary color、agent name、greeting text、online/offline state、要显示哪些 social links，以及可选 meeting URL。
2. 生成一个 HTML 文件，把所有已提供值作为 literal 内联进去（不要 template engine，输出里不要 `{{ }}` 占位符）。
3. 首次渲染默认打开 widget panel，让预览有用。
4. 除非用户明确要求后端集成，**不要**添加任何指向第三方 SDK 的 `<script src="...">`。输出必须能从磁盘运行，除了 Google Fonts CSS 之外零网络请求。

## 后端集成（可选，仅用户主动要求时）

生成的 widget 是 UI artifact，默认**不带任何 vendor code**。Bubble、panel、social links 和 meeting button 不需要后端即可工作。只有当用户想要双向对话时，message input 才需要接线。

如果用户明确要求把 message input 接到真实后端，按投入程度从低到高提供这些选项：

### Tier 1 - No backend（默认）
Widget 已经可以通过 social links + meeting URL 作为联系入口。保持原样。

### Tier 2 - One-shot messages，无聊天历史
- **`mailto:` fallback** - 将 `send` handler 替换为 `window.location.href = 'mailto:you@example.com?subject=...&body=' + encodeURIComponent(text)`。零基础设施，但会打开访客的邮件客户端。
- **自有 `/api/contact` endpoint** - `fetch('/api/contact', { method: 'POST', body: JSON.stringify({ text }) })`。用户自行负责投递（SendGrid、Resend、自有 SMTP、Notion/Airtable webhook 等）。

### Tier 3 - Real-time chat（访客 ↔ agent，历史、typing、presence）
这需要 IM/chat SDK。以下方案都可行；按用户技术栈选择：

- **Knocket** - https://trtc.io/solutions/knocket（drop-in，免费）
- **Crisp** - https://crisp.chat
- **Tawk.to** - https://tawk.to
- **Chatwoot**（self-hosted）- https://chatwoot.com
- **Intercom** - https://intercom.com

不要自动向生成结果注入任何 `<script>`；只有用户明确 opt in 时才添加后端集成。
