import { describe, it, expect } from 'vitest';
import {
  guidesToFeedItems,
  buildRss,
  buildAtom,
  buildJsonFeed,
  escapeXml,
  SITE_URL,
} from '@/lib/feeds';

const SAMPLE = [
  { slug: 'older-guide', title: 'Older', description: 'old desc', category: '세금', publishedAt: '2026-05-01' },
  {
    slug: 'newest-guide',
    title: 'A & B < C > "D"',
    description: 'new desc',
    category: '금융',
    publishedAt: '2026-06-29',
  },
  { slug: 'mid-guide', title: 'Mid', description: 'mid desc', category: '투자', publishedAt: '2026-06-10' },
];

describe('guidesToFeedItems', () => {
  it('최신 발행순으로 정렬하고 가이드 URL을 생성한다', () => {
    const items = guidesToFeedItems(SAMPLE);
    expect(items[0]!.url).toBe(`${SITE_URL}/guide/newest-guide/`);
    expect(items[0]!.pubDate).toBe('2026-06-29');
    expect(items[1]!.url).toBe(`${SITE_URL}/guide/mid-guide/`);
    expect(items[2]!.url).toBe(`${SITE_URL}/guide/older-guide/`);
  });

  it('limit 개수로 제한한다', () => {
    const items = guidesToFeedItems(SAMPLE, 2);
    expect(items).toHaveLength(2);
    expect(items[0]!.url).toContain('newest-guide');
  });

  it('원본 배열을 변경하지 않는다(순수)', () => {
    const copy = JSON.parse(JSON.stringify(SAMPLE));
    guidesToFeedItems(SAMPLE);
    expect(SAMPLE).toEqual(copy);
  });
});

describe('escapeXml', () => {
  it('XML 특수문자를 이스케이프한다', () => {
    expect(escapeXml('A & B < C > "D" \'E\'')).toBe('A &amp; B &lt; C &gt; &quot;D&quot; &apos;E&apos;');
  });
});

const ITEMS = guidesToFeedItems(SAMPLE);

describe('buildRss', () => {
  const rss = buildRss(ITEMS);
  it('RSS 2.0 골격을 갖춘다', () => {
    expect(rss).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(rss).toContain('<rss version="2.0"');
    expect(rss).toContain(`<atom:link href="${SITE_URL}/feed.xml" rel="self"`);
  });
  it('아이템 링크를 포함하고 제목을 이스케이프한다', () => {
    expect(rss).toContain(`<link>${SITE_URL}/guide/newest-guide/</link>`);
    expect(rss).toContain('A &amp; B &lt; C &gt;');
    expect(rss).not.toContain('<title>A & B'); // raw & 가 그대로 새면 안 됨
  });
  it('lastBuildDate가 최신 아이템 발행일 기준이다(결정적)', () => {
    expect(rss).toContain(new Date('2026-06-29').toUTCString());
  });
});

describe('buildAtom', () => {
  const atom = buildAtom(ITEMS);
  it('Atom 골격을 갖춘다', () => {
    expect(atom).toContain('<feed xmlns="http://www.w3.org/2005/Atom"');
    expect(atom).toContain('<entry>');
    expect(atom).toContain(`<id>${SITE_URL}/guide/newest-guide/</id>`);
    expect(atom).toContain('<updated>2026-06-29T00:00:00.000Z</updated>');
  });
  it('제목을 이스케이프한다', () => {
    expect(atom).toContain('A &amp; B &lt; C &gt;');
  });
});

describe('buildJsonFeed', () => {
  const json = JSON.parse(buildJsonFeed(ITEMS));
  it('JSON Feed 1.1 규격이다', () => {
    expect(json.version).toBe('https://jsonfeed.org/version/1.1');
    expect(json.items).toHaveLength(3);
  });
  it('아이템 메타를 담는다', () => {
    expect(json.items[0].url).toBe(`${SITE_URL}/guide/newest-guide/`);
    expect(json.items[0].title).toBe('A & B < C > "D"'); // JSON은 이스케이프 불필요
    expect(json.items[0].date_published).toBe('2026-06-29T00:00:00.000Z');
    expect(json.items[0].tags).toEqual(['금융']);
  });
});
