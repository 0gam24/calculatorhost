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
  // ─── 1~4월 시기성 가이드 (월별 캘린더 시리즈) ───
  {
    title: '2026 세금 캘린더 — 1월부터 12월까지 한눈에',
    description: '2026년 모든 세금·신고 일정 월별 정리 + 페르소나별(직장인·사업자·다주택자) 핵심 일정.',
    url: `${SITE_URL}/guide/tax-calendar-2026/`,
    pubDate: '2026-05-03',
    category: '세금',
  },
  {
    title: '연말정산 완벽 가이드 (2026) — "13월의 월급" 받는 법',
    description: '신용카드·의료비·교육비·기부금·연금저축 공제 + 환급 추적 + 추가 납부 회피.',
    url: `${SITE_URL}/guide/year-end-tax-settlement/`,
    pubDate: '2026-05-03',
    category: '세금',
  },
  {
    title: '자동차세 연납 6.4% 할인 가이드 (2026) — 1월 16~31일 신청',
    description: '1월 신청 시 약 6.4% 할인. cc별 절감액 + 위택스 신청법.',
    url: `${SITE_URL}/guide/january-vehicle-tax-prepayment/`,
    pubDate: '2026-05-03',
    category: '세금·자동차',
  },
  {
    title: '2월 연말정산 환급 추적 + 5월 종합소득세 사전 준비',
    description: '환급 결과 확인 + 누락 공제 정정 + 경정청구 + 5월 종소세 준비 체크리스트.',
    url: `${SITE_URL}/guide/february-tax-refund-tracking/`,
    pubDate: '2026-05-03',
    category: '세금·근로',
  },
  {
    title: '법인세 신고 가이드 (2026) — 3월 31일 마감',
    description: '12월 결산 법인 법인세 세율 + R&D·고용증대 세액공제 + 분납 + 홈택스 전자신고.',
    url: `${SITE_URL}/guide/march-corporate-tax/`,
    pubDate: '2026-05-03',
    category: '세금·법인',
  },
  {
    title: '4월 부가세 1기 예정신고 가이드 (2026) — 4월 1~25일',
    description: '일반과세자 부가세 신고. 매출세액·매입세액공제·홈택스 단계별 신고법.',
    url: `${SITE_URL}/guide/april-vat-preliminary-q1/`,
    pubDate: '2026-05-03',
    category: '세금·사업자',
  },
  {
    title: '4월 종합부동산세 합산배제·과세특례 신청 (2026)',
    description: '임대주택·일시적 2주택·고령자·장기보유 등 우대 신청. 4월 1~30일 마감.',
    url: `${SITE_URL}/guide/april-comprehensive-property-tax-exclusion/`,
    pubDate: '2026-05-03',
    category: '세금·부동산',
  },
  // 시기성 가이드 — 6월 재산세 시즌 (가장 신상)
  {
    title: '재산세 완벽 가이드 (2026) — 6월 부과·7월 납부·공정시장가액 60%',
    description:
      '재산세 과세 기준일·납부 기한·계산식·1세대1주택 특례·세부담 상한·분할 납부까지 한 페이지. 7월 납부 시즌 직전 필독.',
    url: `${SITE_URL}/guide/june-property-tax/`,
    pubDate: '2026-05-03',
    category: '세금·부동산',
  },
  // 시기성 가이드 — 5월 종소세 시즌
  {
    title: '5월 종합소득세 신고 완벽 가이드 (2026) — 프리랜서·사업자·N잡러 필독',
    description:
      '2026년 5월 1~31일 종합소득세 신고 시즌 가이드. 신고 대상·기한·홈택스 단계별 신고법·단순경비율 vs 기준경비율·절세 5가지·환급 받는 법.',
    url: `${SITE_URL}/guide/may-comprehensive-income-tax/`,
    pubDate: '2026-05-03',
    category: '세금',
  },
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
