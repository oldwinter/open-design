import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

import { getCommunityEventsCopy } from '../app/community-events-i18n.ts';

test('community events provides complete Simplified Chinese index copy', async () => {
  const copy = getCommunityEventsCopy('zh');
  const page = await readFile(
    new URL('../app/pages/community/events/index.astro', import.meta.url),
    'utf8',
  );

  assert.equal(copy.heroKicker, '社区 · 活动');
  assert.equal(copy.launchLink, '查看五项发布成果 →');
  assert.match(copy.hongKongTitle, /香港工作坊回顾/);
  assert.equal(copy.shanghaiPill, '活动回顾 · 上海 · 7 月 25 日');
  assert.equal(copy.moreTitle, '更多社区活动');
  assert.match(page, /getCommunityEventsCopy\(locale\)/);
  assert.doesNotMatch(page, />Events where OpenDesign becomes hands-on\.</);
  assert.doesNotMatch(page, />More from the community\.</);
});
