/**
 * 피드 빌더 — RSS 2.0 / Atom 1.0 / JSON Feed 1.1 공통 순수 함수.
 *
 * 라우트 핸들러(feed.xml·atom.xml·feed.json)와 /feeds 허브가 공유.
 * 아이템 출처는 가이드 SSoT(`GUIDES`) → 신규 가이드 발행 시 피드 자동 최신화
 * (이전엔 하드코딩 목록이 2026-05 시점에 고정되어 신규 120여 편이 누락됨).
 *
 * 결정성(determinism): 채널 날짜는 wall-clock(new Date()) 대신 최신 아이템
 * 발행일에서 파생 → 단위 테스트에서 안정적으로 검증 가능.
 */

export const SITE_URL = 'https://calculatorhost.com';
export const SITE_TITLE = 'calculatorhost — 한국 금융·세금·부동산 계산기';
export const SITE_DESCRIPTION =
  '2026년 최신 세율·금리 반영 한국 생활 계산기 31종 + 가이드 + 용어사전. 운영자 김준혁(스마트데이터샵).';
const AUTHOR_NAME = '김준혁';
const AUTHOR_EMAIL = 'smartdatashop@gmail.com';

export interface FeedItem {
  title: string;
  description: string;
  url: string;
  /** ISO 8601 date (예: '2026-06-29') */
  pubDate: string;
  category?: string;
}

/** GUIDES 항목이 만족하는 최소 형태(가이드 SSoT와 결합도 최소화). */
interface GuideLike {
  slug: string;
  title: string;
  description: string;
  category?: string;
  publishedAt: string;
}

/** GUIDES(SSoT) → 피드 아이템. 최신 발행순 정렬 후 limit 개로 제한. */
export function guidesToFeedItems(guides: GuideLike[], limit = 40): FeedItem[] {
  return [...guides]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0))
    .slice(0, limit)
    .map((g) => ({
      title: g.title,
      description: g.description,
      url: `${SITE_URL}/guide/${g.slug}/`,
      pubDate: g.publishedAt,
      category: g.category,
    }));
}

export function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** 최신 아이템 발행일(결정적). 빈 배열이면 epoch. */
function newestDate(items: FeedItem[]): Date {
  const newest = items.reduce(
    (acc, it) => (it.pubDate > acc ? it.pubDate : acc),
    items[0]?.pubDate ?? '1970-01-01',
  );
  return new Date(newest);
}

export function buildRss(items: FeedItem[]): string {
  const channelDate = newestDate(items).toUTCString();
  const year = newestDate(items).getUTCFullYear();
  const itemsXml = items
    .map((item) => {
      const pubDate = new Date(item.pubDate).toUTCString();
      const category = item.category ? `\n      <category>${escapeXml(item.category)}</category>` : '';
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${pubDate}</pubDate>${category}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko-KR</language>
    <copyright>© ${year} 스마트데이터샵 (대표 ${AUTHOR_NAME})</copyright>
    <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${AUTHOR_NAME})</webMaster>
    <lastBuildDate>${channelDate}</lastBuildDate>
    <generator>Next.js (calculatorhost)</generator>
${itemsXml}
  </channel>
</rss>
`;
}

export function buildAtom(items: FeedItem[]): string {
  const updated = newestDate(items).toISOString();
  const entries = items
    .map((item) => {
      const at = new Date(item.pubDate).toISOString();
      const category = item.category ? `\n    <category term="${escapeXml(item.category)}" />` : '';
      return `  <entry>
    <title>${escapeXml(item.title)}</title>
    <link href="${escapeXml(item.url)}" />
    <id>${escapeXml(item.url)}</id>
    <updated>${at}</updated>
    <published>${at}</published>
    <summary>${escapeXml(item.description)}</summary>${category}
  </entry>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ko-KR">
  <title>${escapeXml(SITE_TITLE)}</title>
  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
  <link href="${SITE_URL}/atom.xml" rel="self" type="application/atom+xml" />
  <link href="${SITE_URL}/" />
  <id>${SITE_URL}/</id>
  <updated>${updated}</updated>
  <author>
    <name>${AUTHOR_NAME}</name>
    <email>${AUTHOR_EMAIL}</email>
  </author>
${entries}
</feed>
`;
}

export function buildJsonFeed(items: FeedItem[]): string {
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: SITE_TITLE,
    home_page_url: `${SITE_URL}/`,
    feed_url: `${SITE_URL}/feed.json`,
    description: SITE_DESCRIPTION,
    language: 'ko-KR',
    authors: [{ name: AUTHOR_NAME, url: `${SITE_URL}/about/` }],
    items: items.map((item) => ({
      id: item.url,
      url: item.url,
      title: item.title,
      content_text: item.description,
      summary: item.description,
      date_published: new Date(item.pubDate).toISOString(),
      ...(item.category ? { tags: [item.category] } : {}),
    })),
  };
  return JSON.stringify(feed, null, 2);
}
