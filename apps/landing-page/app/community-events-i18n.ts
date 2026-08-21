import type { LandingLocaleCode } from './i18n';

interface CommunityEventsCopy {
  readonly navLabel: string;
  readonly title: string;
  readonly description: string;
  readonly heroKicker: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly launchImageAlt: string;
  readonly launchPill: string;
  readonly launchTitle: string;
  readonly launchDescription: string;
  readonly launchLink: string;
  readonly latestKicker: string;
  readonly latestTitle: string;
  readonly hongKongImageAlt: string;
  readonly hongKongPill: string;
  readonly hongKongTitle: string;
  readonly hongKongDescription: string;
  readonly osakaImageAlt: string;
  readonly osakaPill: string;
  readonly osakaTitle: string;
  readonly osakaDescription: string;
  readonly readRecap: string;
  readonly moreKicker: string;
  readonly moreTitle: string;
  readonly upcomingKicker: string;
  readonly upcomingTitle: string;
  readonly shanghaiImageAlt: string;
  readonly shanghaiPill: string;
  readonly shanghaiTitle: string;
  readonly shanghaiDescription: string;
  readonly viewDetails: string;
  readonly hubCard: {
    readonly ord: string;
    readonly title: string;
    readonly sub: string;
    readonly body: string;
  };
}

const EN_EVENTS_COPY = {
  navLabel: 'Events',
  title: 'Open Design Events',
  description:
    'Community events, recaps, and upcoming hands-on sessions for people building with Open Design.',
  heroKicker: 'Community · Events',
  heroTitle: 'Events where Open Design becomes hands-on.',
  heroDescription:
    'Recaps from local rooms, plus upcoming sessions where builders, designers, educators, and community organizers make editable AI artifacts together.',
  launchImageAlt: 'Open Design Launch Week Vol.01',
  launchPill: 'Recently wrapped · Aug 10–14',
  launchTitle: 'Launch Week <span>Vol.01</span>',
  launchDescription:
    'Five days, five design jobs, one launch a day — each one aimed at a tool your team already pays for.',
  launchLink: 'See the five releases ->',
  latestKicker: 'Latest recap',
  latestTitle: 'Open Design Hong Kong Workshop',
  hongKongImageAlt: 'Participants at the Open Design Hong Kong workshop',
  hongKongPill: 'Recap · Hong Kong · Aug 16',
  hongKongTitle: 'Open Design Hong Kong Workshop Recap',
  hongKongDescription:
    'A room of builders connected design systems, live data, models, and skills to create interactive, shareable artifacts—and stress-test the full workflow.',
  osakaImageAlt: 'Participants gathered for the Osaka Open Design meetup',
  osakaPill: 'Recap · Osaka · July 6',
  osakaTitle: 'Open Design Osaka Meetup Recap',
  osakaDescription:
    'A warm offline session near Nipponbashi Station: AI-powered PPT workflows, real estate brochures, local website concepts, and the lesson that editable artifacts beat one-off generation.',
  readRecap: 'Read the recap ->',
  moreKicker: 'More recaps',
  moreTitle: 'More from the community.',
  upcomingKicker: 'Coming soon',
  upcomingTitle: 'Upcoming community sessions.',
  shanghaiImageAlt: 'Open Design AI Workshop in Shanghai',
  shanghaiPill: 'Recap · Shanghai · July 25',
  shanghaiTitle: 'Open Design Shanghai Workshop Recap',
  shanghaiDescription:
    'Developers, designers, product managers, students, and creators came together near Fudan University to turn their own ideas into editable artifacts.',
  viewDetails: 'View event details ->',
  hubCard: {
    ord: 'IV',
    title: 'Events',
    sub: 'Local rooms where <em>Open Design</em> becomes practical.',
    body: 'Browse community events: read the Osaka recap, then see upcoming hands-on sessions like the Shanghai AI workshop.',
  },
} as const satisfies CommunityEventsCopy;

const CHINESE_EVENTS_COPY = {
  navLabel: '活动',
  title: 'Open Design 活动',
  description: '面向 Open Design 创作者的社区活动、活动回顾和即将举行的动手实践。',
  heroKicker: '社区 · 活动',
  heroTitle:
    '在活动现场，把 <span class="events-phrase">Open Design</span> <span class="events-phrase">真正用起来。</span>',
  heroDescription:
    '这里有各地线下活动回顾，也有即将举办的实\u2060践场次；开发者、设计师、教\u2060育\u2060工\u2060作\u2060者和社\u2060区\u2060组\u2060织\u2060者会一起制作可编辑的 AI 工件。',
  launchImageAlt: 'Open Design 发布周 Vol.01',
  launchPill: '近期已结束 · 8 月 10–14 日',
  launchTitle: '发布周 <span>Vol.01</span>',
  launchDescription:
    '五天、五项设计任务、每天发布一款成果，每一款都瞄准团队已经在付费使用的工具。',
  launchLink: '查看五项发布成果 →',
  latestKicker: '最新回顾',
  latestTitle: 'Open Design 香港工作坊',
  hongKongImageAlt: 'Open Design 香港工作坊现场参与者',
  hongKongPill: '活动回顾 · 香港 · 8 月 16 日',
  hongKongTitle: 'Open Design <span class="events-phrase">香港工作坊回顾</span>',
  hongKongDescription:
    '现场<span class="events-phrase">创作者</span>把设计系统、实时数据、模型和技能连接起来，制作可交互、可分享的工件，并完整检验了整个工作流。',
  osakaImageAlt: '参与者齐聚 Open Design 大阪 Meetup',
  osakaPill: '活动回顾 · 大阪 · 7 月 6 日',
  osakaTitle: 'Open Design <span class="events-phrase">大阪 Meetup 回顾</span>',
  osakaDescription:
    '在日本桥站附近举行的一场温暖线下活动：从 AI 驱动的 PPT 工作流、<span class="events-phrase">房地产宣传册</span>到本地网站创意，大家共同验证了可编辑工件远胜一次性生成。',
  readRecap: '阅读回顾 →',
  moreKicker: '更多回顾',
  moreTitle: '更多社区活动',
  upcomingKicker: '即将开始',
  upcomingTitle: '即将举行的社区活动',
  shanghaiImageAlt: 'Open Design 上海 AI 工作坊',
  shanghaiPill: '活动回顾 · 上海 · 7 月 25 日',
  shanghaiTitle: 'Open Design <span class="events-phrase">上海工作坊回顾</span>',
  shanghaiDescription:
    '开发者、设计师、产品经理、学生和创作者齐聚复旦大学附近，把各自的想法变成可编辑的工件。',
  viewDetails: '查看活动详情 →',
  hubCard: {
    ord: 'IV',
    title: '活动',
    sub: '让 <em>Open Design</em> 落地实践的本地聚会。',
    body: '浏览社区活动：先读大阪活动回顾，再了解上海 AI 工作坊等即将举行的动手实践。',
  },
} as const satisfies CommunityEventsCopy;

const TRADITIONAL_CHINESE_EVENTS_COPY = {
  navLabel: '活動',
  title: 'Open Design 活動',
  description: '面向 Open Design 創作者的社群活動、活動回顧和即將舉行的動手實作。',
  heroKicker: '社群 · 活動',
  heroTitle:
    '在活動現場，把 <span class="events-phrase">Open Design</span> <span class="events-phrase">真正用起來。</span>',
  heroDescription:
    '這裡有各地線下活動回顧，也有即將舉辦的實作場次；開發者、設計師、教育工作者和社群組織者會一起製作可編輯的 AI 工件。',
  launchImageAlt: 'Open Design 發布週 Vol.01',
  launchPill: '近期已結束 · 8 月 10–14 日',
  launchTitle: '發布週 <span>Vol.01</span>',
  launchDescription:
    '五天、五項設計任務、每天發布一款成果，每一款都瞄準團隊已經在付費使用的工具。',
  launchLink: '查看五項發布成果 →',
  latestKicker: '最新回顧',
  latestTitle: 'Open Design 香港工作坊',
  hongKongImageAlt: 'Open Design 香港工作坊現場參與者',
  hongKongPill: '活動回顧 · 香港 · 8 月 16 日',
  hongKongTitle: 'Open Design <span class="events-phrase">香港工作坊回顧</span>',
  hongKongDescription:
    '現場<span class="events-phrase">創作者</span>把設計系統、即時資料、模型和技能連接起來，製作可互動、可分享的工件，並完整檢驗了整個工作流程。',
  osakaImageAlt: '參與者齊聚 Open Design 大阪 Meetup',
  osakaPill: '活動回顧 · 大阪 · 7 月 6 日',
  osakaTitle: 'Open Design <span class="events-phrase">大阪 Meetup 回顧</span>',
  osakaDescription:
    '在日本橋站附近舉行的一場溫暖線下活動：從 AI 驅動的 PPT 工作流程、<span class="events-phrase">房地產宣傳冊</span>到在地網站創意，大家共同驗證了可編輯工件遠勝一次性生成。',
  readRecap: '閱讀回顧 →',
  moreKicker: '更多回顧',
  moreTitle: '更多社群活動',
  upcomingKicker: '即將開始',
  upcomingTitle: '即將舉行的社群活動',
  shanghaiImageAlt: 'Open Design 上海 AI 工作坊',
  shanghaiPill: '活動回顧 · 上海 · 7 月 25 日',
  shanghaiTitle: 'Open Design <span class="events-phrase">上海工作坊回顧</span>',
  shanghaiDescription:
    '開發者、設計師、產品經理、學生和創作者齊聚復旦大學附近，把各自的想法變成可編輯的工件。',
  viewDetails: '查看活動詳情 →',
  hubCard: {
    ord: 'IV',
    title: '活動',
    sub: '讓 <em>Open Design</em> 落地實作的在地聚會。',
    body: '瀏覽社群活動：先讀大阪活動回顧，再了解上海 AI 工作坊等即將舉行的動手實作。',
  },
} as const satisfies CommunityEventsCopy;

export function getCommunityEventsCopy(locale: LandingLocaleCode): CommunityEventsCopy {
  if (locale === 'zh') return CHINESE_EVENTS_COPY;
  if (locale === 'zh-tw') return TRADITIONAL_CHINESE_EVENTS_COPY;
  return EN_EVENTS_COPY;
}
