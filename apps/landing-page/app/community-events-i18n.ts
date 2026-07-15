import type { LandingLocaleCode } from './i18n';

interface CommunityEventsCopy {
  readonly navLabel: string;
  readonly title: string;
  readonly description: string;
  readonly heroKicker: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly latestKicker: string;
  readonly latestTitle: string;
  readonly osakaImageAlt: string;
  readonly osakaPill: string;
  readonly osakaTitle: string;
  readonly osakaDescription: string;
  readonly readRecap: string;
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
  latestKicker: 'Latest recap',
  latestTitle: 'Open Design Osaka Workshop',
  osakaImageAlt: 'Participants gathered for the Osaka Open Design meetup',
  osakaPill: 'Recap · Osaka · July 6',
  osakaTitle: 'Open Design Osaka Meetup Recap',
  osakaDescription:
    'A warm offline session near Nipponbashi Station: AI-powered PPT workflows, real estate brochures, local website concepts, and the lesson that editable artifacts beat one-off generation.',
  readRecap: 'Read the recap ->',
  upcomingKicker: 'Coming soon',
  upcomingTitle: 'Upcoming community sessions.',
  shanghaiImageAlt: 'Open Design AI Workshop in Shanghai',
  shanghaiPill: 'Upcoming · Shanghai · July 25',
  shanghaiTitle: 'Open Design AI Workshop is coming to Shanghai',
  shanghaiDescription:
    'A hands-on workshop for students, developers, designers, and AI tool builders to turn prompts and references into real AI artifacts.',
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
  heroTitle: '在活动现场，把 Open Design 真正用起来。',
  heroDescription:
    '这里有各地线下活动回顾，也有即将举办的实践场次；开发者、设计师、教育工作者和社区组织者会一起制作可编辑的 AI 工件。',
  latestKicker: '最新回顾',
  latestTitle: 'Open Design 大阪工作坊',
  osakaImageAlt: '参与者齐聚 Open Design 大阪 Meetup',
  osakaPill: '活动回顾 · 大阪 · 7 月 6 日',
  osakaTitle: 'Open Design 大阪 Meetup 回顾',
  osakaDescription:
    '在日本桥站附近举行的一场温暖线下活动：从 AI 驱动的 PPT 工作流、房地产宣传册到本地网站创意，大家共同验证了可编辑工件远胜一次性生成。',
  readRecap: '阅读回顾 →',
  upcomingKicker: '即将开始',
  upcomingTitle: '即将举行的社区活动',
  shanghaiImageAlt: 'Open Design 上海 AI 工作坊',
  shanghaiPill: '即将举行 · 上海 · 7 月 25 日',
  shanghaiTitle: 'Open Design AI 工作坊即将来到上海',
  shanghaiDescription:
    '面向学生、开发者、设计师和 AI 工具创作者的动手工作坊，一起把提示词与参考资料变成真正可用的 AI 工件。',
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
  heroTitle: '在活動現場，把 Open Design 真正用起來。',
  heroDescription:
    '這裡有各地線下活動回顧，也有即將舉辦的實作場次；開發者、設計師、教育工作者和社群組織者會一起製作可編輯的 AI 工件。',
  latestKicker: '最新回顧',
  latestTitle: 'Open Design 大阪工作坊',
  osakaImageAlt: '參與者齊聚 Open Design 大阪 Meetup',
  osakaPill: '活動回顧 · 大阪 · 7 月 6 日',
  osakaTitle: 'Open Design 大阪 Meetup 回顧',
  osakaDescription:
    '在日本橋站附近舉行的一場溫暖線下活動：從 AI 驅動的 PPT 工作流程、房地產宣傳冊到在地網站創意，大家共同驗證了可編輯工件遠勝一次性生成。',
  readRecap: '閱讀回顧 →',
  upcomingKicker: '即將開始',
  upcomingTitle: '即將舉行的社群活動',
  shanghaiImageAlt: 'Open Design 上海 AI 工作坊',
  shanghaiPill: '即將舉行 · 上海 · 7 月 25 日',
  shanghaiTitle: 'Open Design AI 工作坊即將來到上海',
  shanghaiDescription:
    '面向學生、開發者、設計師和 AI 工具創作者的動手工作坊，一起把提示詞與參考資料變成真正可用的 AI 工件。',
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
