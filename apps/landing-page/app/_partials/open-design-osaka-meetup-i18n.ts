import zhBody from './open-design-osaka-meetup-main.zh.html?raw';
import type { LandingLocaleCode } from '../i18n';

export type OsakaMeetupTranslation = {
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly body: string;
};

const SIMPLIFIED_CHINESE = {
  title: 'Open Design 大阪聚会回顾',
  description:
    '一次温暖的大阪线下聚会：设计师、开发者、教育工作者、创业者和社区组织者，共同探索由 AI 驱动的 PPT 与网站实用工作流。',
  category: '社区',
  body: zhBody,
} as const satisfies OsakaMeetupTranslation;

export function getOsakaMeetupTranslation(
  locale: LandingLocaleCode,
): OsakaMeetupTranslation | undefined {
  return locale === 'zh' ? SIMPLIFIED_CHINESE : undefined;
}
