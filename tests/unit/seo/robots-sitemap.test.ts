import { afterEach, describe, expect, it, vi } from 'vitest';
import { GET } from '@/app/robots.txt/route';
import sitemap from '@/app/sitemap';

function isAllowed(text: string, userAgent: string, pathname: string): boolean {
  const groups: Array<{ agents: string[]; rules: Array<{ allow: boolean; path: string }> }> = [];
  let group: (typeof groups)[number] | undefined;
  for (const line of text.split('\n')) {
    const match = line.match(/^(User-Agent|Allow|Disallow):\s*(.+)$/i);
    if (!match) continue;
    const [, directive, value] = match;
    if (!directive || !value) continue;
    if (directive.toLowerCase() === 'user-agent') {
      if (!group || group.rules.length) {
        group = { agents: [], rules: [] };
        groups.push(group);
      }
      group.agents.push(value.toLowerCase());
    } else {
      group?.rules.push({ allow: directive.toLowerCase() === 'allow', path: value });
    }
  }
  const selected = groups.filter((g) => g.agents.includes(userAgent.toLowerCase()));
  const applicable = selected.length ? selected : groups.filter((g) => g.agents.includes('*'));
  const matches = applicable
    .flatMap((g) => g.rules)
    .filter((rule) => {
      const pattern = rule.path.replace(/[.+?^{}()|[\]\\]/g, '\\$&').replaceAll('*', '.*');
      return new RegExp(`^${pattern}`).test(pathname);
    })
    .sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow));
  return matches[0]?.allow ?? true;
}

describe('Crawler rendering assets', () => {
  it.each(['Googlebot', 'Yeti', 'AdsBot-Google', 'Mediapartners-Google'])(
    '%s can load scripts, CSS and fonts',
    async (bot) => {
      const text = await GET().text();
      for (const path of [
        '/_next/static/chunks/app.js',
        '/_next/static/css/app.css',
        '/_next/static/media/font.woff2',
      ]) {
        expect(isAllowed(text, bot, path), `${bot}: ${path}`).toBe(true);
      }
    },
  );

  it('still blocks private API/WordPress requests while allowing public feed JSON', async () => {
    const text = await GET().text();
    expect(isAllowed(text, 'Googlebot', '/api/private/')).toBe(false);
    expect(isAllowed(text, 'Yeti', '/wp-admin/')).toBe(false);
    expect(isAllowed(text, 'Googlebot', '/feed.json')).toBe(true);
    expect(isAllowed(text, 'Googlebot', '/private.json')).toBe(false);
  });
});

describe('Sitemap dates and stable URLs', () => {
  afterEach(() => vi.useRealTimers());

  it('includes all 32 calculator canonical URLs without build-time lastmod', () => {
    const entries = sitemap();
    const calculators = entries.filter((entry) => entry.url.includes('/calculator/'));
    expect(calculators).toHaveLength(32);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);
    expect(entries.every((entry) => entry.url.endsWith('/'))).toBe(true);
    const dates = entries.map((e) => e.lastModified).filter(Boolean);
    expect(new Set(dates).size).toBeGreaterThan(1);
    // Rebuilding at another time must never manufacture a content update.
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2040-01-01T00:00:00Z'));
    const firstBuild = sitemap();
    vi.setSystemTime(new Date('2041-01-01T00:00:00Z'));
    expect(sitemap()).toEqual(firstBuild);
    expect(
      dates.some((date) => String(date).startsWith('2040-') || String(date).startsWith('2041-')),
    ).toBe(false);
  });
});
