/**
 * RSS 2.0 피드 — 가이드·계산기 신규/업데이트 알림
 * 구독자가 RSS 리더로 새 콘텐츠 받아볼 수 있도록.
 *
 * 정적 export 호환 (force-static).
 */

export const dynamic = 'force-static';

const SITE_URL = 'https://calculatorhost.com';
const SITE_TITLE = 'calculatorhost — 한국 금융·세금·부동산 계산기';
const SITE_DESCRIPTION =
  '2026년 최신 세율·금리 반영 한국 생활 계산기 31종 + 가이드 + 용어사전. 운영자 김준혁(스마트데이터샵).';

interface FeedItem {
  title: string;
  description: string;
  url: string;
  /** ISO 8601 (예: '2026-05-03') */
  pubDate: string;
  category?: string;
}

// 최신 발행순 (위가 가장 신상)
const ITEMS: FeedItem[] = [
  // 가이드 5개 (최신 콘텐츠)
  {
    title: '프리랜서 vs 일반직 실수령액 비교 — 4대보험·세금 차이',
    description:
      '같은 연 5,000만 원이라도 프리랜서(사업소득)와 일반직(근로소득)의 실수령액 차이. 시뮬레이션 3가지 (3000만/5000만/1억).',
    url: `${SITE_URL}/guide/freelancer-salary-comparison/`,
    pubDate: '2026-05-03',
    category: '근로',
  },
  {
    title: '비규제·조정·투기과열 DSR·LTV 규제 완전 정리 (2026)',
    description:
      '같은 주택이라도 위치에 따라 대출 한도가 1억 원 이상 차이. 스트레스 DSR + 생애최초 우대 + 다주택 중과 종합.',
    url: `${SITE_URL}/guide/dsr-regulation-zones/`,
    pubDate: '2026-05-03',
    category: '금융',
  },
  {
    title: '양도소득세 절세 7가지 방법 (2026)',
    description:
      '1세대1주택 비과세, 장기보유공제 80%, 일시적 2주택 3년 특례, 자경 농지 100% 감면 등 양도세 절세 핵심.',
    url: `${SITE_URL}/guide/capital-gains-tax-tips/`,
    pubDate: '2026-05-03',
    category: '세금',
  },
  {
    title: '물타기 vs 손절 vs 비중조절 — 언제 무엇을 선택해야 하나',
    description:
      '하락 종목 대응 3가지 전략의 의사결정 기준. 의사결정 플로우차트 + 시뮬레이션.',
    url: `${SITE_URL}/guide/averaging-down-vs-loss-cut/`,
    pubDate: '2026-05-03',
    category: '투자',
  },
  {
    title: 'DSR 대출한도를 늘리는 5가지 실전 방법 (2026)',
    description:
      '스트레스 DSR 1.5%p 풀 적용 환경에서 같은 소득으로 대출한도를 더 받는 5가지 방법.',
    url: `${SITE_URL}/guide/dsr-loan-limit-tips/`,
    pubDate: '2026-05-03',
    category: '금융',
  },
  // 신규 계산기 4개
  {
    title: '부가가치세(VAT) 계산기 — 일반·간이·환산 3 모드',
    description:
      '한국 부가세 10% 일반과세자 / 간이과세자 / VAT 포함↔공급가액 환산 모두 지원.',
    url: `${SITE_URL}/calculator/vat/`,
    pubDate: '2026-05-03',
    category: '세금',
  },
  {
    title: '분할매도 계산기 (주식·코인) — 차수별 실현손익',
    description:
      '평단·보유 수량과 차수별 매도가·수량으로 실현손익(수수료·거래세 차감) 즉시 계산.',
    url: `${SITE_URL}/calculator/split-sell/`,
    pubDate: '2026-05-03',
    category: '투자',
  },
  {
    title: '분할매수 계산기 (주식·코인) — 가중평균·BEP·균등분할',
    description:
      '차수별 단가·수량으로 가중평균 평단가, 수수료 포함 실효 평단가, 손익분기점(BEP) 계산.',
    url: `${SITE_URL}/calculator/split-buy/`,
    pubDate: '2026-05-03',
    category: '투자',
  },
  {
    title: '용어사전 — 금융·세금·투자 핵심 용어 28개',
    description:
      'DSR·LTV·DTI·평단·BEP·양도차익·장기보유공제·1세대1주택·환산보증금 등 핵심 용어 정의 + 법조항.',
    url: `${SITE_URL}/glossary/`,
    pubDate: '2026-05-03',
    category: '용어사전',
  },
];

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildRss(): string {
  const lastBuildDate = new Date().toUTCString();
  const itemsXml = ITEMS.map((item) => {
    const pubDate = new Date(item.pubDate).toUTCString();
    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${pubDate}</pubDate>
      ${item.category ? `<category>${escapeXml(item.category)}</category>` : ''}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko-KR</language>
    <copyright>© ${new Date().getFullYear()} 스마트데이터샵 (대표 김준혁)</copyright>
    <managingEditor>smartdatashop@gmail.com (김준혁)</managingEditor>
    <webMaster>smartdatashop@gmail.com (김준혁)</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Next.js (calculatorhost)</generator>
${itemsXml}
  </channel>
</rss>
`;
}

export function GET() {
  return new Response(buildRss(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
