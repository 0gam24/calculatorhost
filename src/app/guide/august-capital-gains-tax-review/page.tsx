import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/august-capital-gains-tax-review/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '8월 양도소득세 절세 검토 가이드 2026 | 일시적2주택·장기보유 80%',
  description:
    '2026년 8월 부동산 양도 검토 중인 1주택자·일시적2주택자 필독. 일시적2주택 3년 만료·장기보유공제 80% 도달·단기 1년/2년 경계·양도 시점 vs 귀속연도·절세 5가지를 한 페이지에 정리.',
  keywords: [
    '양도소득세 검토',
    '8월 양도세',
    '일시적2주택 만료',
    '장기보유공제 80%',
    '양도세 절세',
    '양도세 계산',
    '부동산 양도',
    '1세대1주택 비과세',
    '단기 보유 양도세',
    '양도 시점',
    '2026 양도소득세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '8월 양도소득세 절세 검토 가이드 2026',
    description: '일시적2주택 3년 만료·장기보유공제 80%·단기 1년/2년 경계·절세 5가지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '8월 양도소득세 절세 검토 가이드 2026',
    description: '부동산 양도 직전 8월 절세 체크리스트 5가지.',
  },
};

const FAQ_ITEMS = [
  {
    question: '일시적 2주택 3년 만료가 정말 절세되나요?',
    answer:
      '조정대상지역에서 2주택 이상 보유 시 양도세 기본세율에 +20%p(2주택) 또는 +30%p(3주택) 중과(소득세법 §104의3)가 적용됩니다. 일시적 2주택 비과세 특례(시행령 §155)는 신규 취득일로부터 3년 내 종전 주택을 양도하면 1세대1주택 비과세를 그대로 인정합니다. 3년 1일 초과 양도 시 중과 적용 → 양도가 5억 기준 수천만~수억 원 차이 발생 가능.',
  },
  {
    question: '장기보유공제 80%는 어떻게 도달하나요?',
    answer:
      '1세대1주택 비과세 12억 초과분에 적용되는 장기보유특별공제(소득세법 §95)는 보유 기간 + 거주 기간 각 연 4%, 최대 각 40% = 합 80%까지입니다. 보유 10년 + 거주 10년 동시 충족이 80% 도달 조건. 일반 주택은 연 2%·최대 30%(시행령 §159의3). 보유는 10년인데 거주가 8년이면 보유 40% + 거주 32% = 72%로 차감.',
  },
  {
    question: '단기 1년/2년 보유 양도세율 차이는?',
    answer:
      '주택 양도 시 보유 1년 미만은 70%, 1년 이상 2년 미만은 60% 단일세율(소득세법 §104①2호 가목). 2년 이상은 누진세율(6~45%) 적용. 양도차익 2억 기준 1년 미만은 약 1.4억(70%) 세금, 2년 이상이면 누진 38% − 누진공제 적용으로 약 6,200만 원 → 1년 한 달 차이로 절세 효과 큼.',
  },
  {
    question: '양도 시기의 귀속 연도는 무엇으로 결정되나요?',
    answer:
      '양도일은 원칙적으로 잔금 청산일(소득세법 §98) 기준입니다. 잔금 청산이 등기 접수보다 늦으면 등기 접수일이 양도일. 8월 양도(잔금)면 2026년 귀속 → 신고 기한은 양도일이 속한 달의 말일부터 2개월 이내(§118). 9월 이후 잔금이면 동일하게 2026년 귀속, 다음 해 1월 이후라야 2027년 귀속.',
  },
  {
    question: '양도소득세 신고를 안 하면 어떻게 되나요?',
    answer:
      '무신고 가산세 20%(부정행위 40%) + 납부지연가산세 일 0.022%가 부과됩니다(국세기본법 §47의2·§47의4). 양도차익이 0이거나 비과세더라도 신고 의무가 있습니다. 부동산 거래 신고가 자동으로 국세청에 통보되므로 기한 내 자진 신고 필수. 기한 후 자진 신고 시 가산세 50% 경감 가능.',
  },
];

export default function AugustCgtGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '8월 양도세 절세 검토 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '8월 양도소득세 절세 검토 가이드 2026',
    description:
      '8월 부동산 양도 검토 시 점검할 5가지: 일시적2주택 3년 만료, 장기보유공제 80% 도달, 단기 1년/2년 경계, 양도 시점 vs 귀속연도, 절세 5가지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['양도소득세', '일시적2주택', '장기보유공제', '8월', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '8월 양도소득세 절세 검토 가이드 2026',
    description:
      '8월 부동산 양도 직전 점검할 양도세 절세 5가지 시나리오. 일시적2주택·장기보유공제·단기 보유·양도 시점·신고.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '8월 양도세 절세 검토 5단계',
    description: '부동산 양도 직전 8월에 검토할 절세 시나리오 5단계',
    steps: [
      {
        name: '일시적 2주택 3년 D-day 계산',
        text: '신규 취득일(잔금 청산일)에 +3년 = 만료일. 만료 전 양도하면 비과세 특례 적용(시행령 §155).',
      },
      {
        name: '장기보유공제 80% 도달 계산',
        text: '1세대1주택 12억 초과분: 보유 10년+거주 10년이면 공제 80%. 1개월 차이로 수천만 원 차이.',
      },
      {
        name: '단기 1년/2년 경계 점검',
        text: '취득 후 1년 미만 70% / 1~2년 60% / 2년 이상 누진. 한 달 차이로 절세액 큼.',
      },
      {
        name: '양도 시점 vs 귀속연도 결정',
        text: '잔금 청산일 기준 양도일 결정(§98). 8월 양도면 2026 귀속, 2027년 5월 신고.',
      },
      {
        name: '신고 기한 + 가산세 회피',
        text: '양도일이 속한 달의 말일부터 2개월 이내 신고(§118). 무신고 시 20% 가산세.',
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '8월 양도세 절세 검토' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  8월 양도소득세 절세 검토 가이드 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  2026년 8월은 부동산 양도를 검토 중인 1주택자·일시적 2주택자가 양도세 시뮬레이션을 재점검해야 하는 시기입니다.
                  보유 기간에 따라 세율이 70% → 60% → 누진(6~45%)으로 극단적으로 달라지고, 일시적 2주택 3년 만료·장기보유공제
                  80% 도달이 8월 즈음 임박한 경우가 많기 때문입니다(소득세법 §94·§95·§104, 시행령 §155).
                </p>
              </header>

              <AdSlot slot="guide-aug-cgt-top" format="horizontal" />

              {/* 1. 5가지 핵심 */}
              <section aria-label="5가지 검토 핵심" className="card">
                <h2 className="mb-4 text-2xl font-semibold">8월에 반드시 점검할 5가지</h2>
                <ol className="list-inside list-decimal space-y-3 text-text-secondary" data-speakable>
                  <li><strong>일시적 2주택 3년 만료 D-day</strong> — 신규 취득 잔금일 +3년이 만료점(시행령 §155). 1일 초과 양도 시 비과세 특례 상실.</li>
                  <li><strong>장기보유공제 80% 도달</strong> — 1세대1주택 12억 초과분, 보유 10년+거주 10년 동시(소득세법 §95).</li>
                  <li><strong>단기 1년/2년 경계</strong> — 1년 미만 70% / 1~2년 60% / 2년 이상 누진(§104①2호 가목).</li>
                  <li><strong>양도 시점 vs 귀속연도</strong> — 잔금 청산일 기준(§98). 8월 양도 = 2026 귀속, 2027년 5월 신고.</li>
                  <li><strong>세법 개정안 모니터링</strong> — 정부 하반기 개정 발표 시 2027 귀속분부터 적용 가능 → 8월 양도가 보수적.</li>
                </ol>
              </section>

              {/* 2. 일시적 2주택 3년 */}
              <section aria-label="일시적 2주택 3년 만료" className="card">
                <h2 className="mb-4 text-2xl font-semibold">일시적 2주택 3년 만료 D-day 계산</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  일시적 2주택 비과세 특례(시행령 §155 제1항)는 종전 주택을 보유한 상태에서 신규 주택을 취득한 후
                  <strong> 신규 취득일로부터 3년 이내에 종전 주택을 양도</strong>하면 1세대1주택 비과세를 그대로 인정합니다.
                  취득일 기준은 잔금 청산일(소득세법 §98).
                </p>
                <div className="rounded-lg bg-bg-card p-3 text-sm text-text-secondary">
                  <p className="mb-2"><strong className="text-text-primary">사례</strong>: 2023-08-15 신규 주택 잔금 청산</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>2026-08-14 양도 → 비과세 특례 적용 (3년 이내)</li>
                    <li>2026-08-16 양도 → 특례 상실, 조정대상지역이면 +20~30%p 중과(§104의3) → 양도가 5억 기준 수천만~수억 원 차이</li>
                  </ul>
                  <p className="mt-2 text-text-tertiary">조정대상지역 여부는 국토교통부 공고 확인 필수. 2026년 일부 지역 해제 진행 중.</p>
                </div>
              </section>

              {/* 3. 장기보유공제 80% */}
              <section aria-label="장기보유공제 80%" className="card">
                <h2 className="mb-4 text-2xl font-semibold">장기보유공제 80% 도달 — 보유 10년 + 거주 10년</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  장기보유특별공제(소득세법 §95)는 1세대1주택 비과세 12억 초과분에 적용. 보유 기간 연 4% + 거주 기간 연 4%,
                  각 최대 40% = 합 80%. 보유 10년 + 거주 10년 동시 충족이 80% 도달 조건.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="sr-only">1세대1주택 장기보유공제 단계</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">조건</th>
                        <th className="py-2 font-semibold">공제율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">3년 보유</td><td className="py-2">12% (보유) + 12% (거주) = 24%</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">5년 보유 + 5년 거주</td><td className="py-2">20% + 20% = 40%</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">10년 보유 + 8년 거주</td><td className="py-2">40% + 32% = 72%</td></tr>
                      <tr><td className="py-2 pr-4">10년 보유 + 10년 거주</td><td className="py-2 font-semibold">40% + 40% = 80% (최대)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  거주 기간은 주민등록등본 이력 기준. 일반 주택(비-1세대1주택)은 연 2%·최대 30%(시행령 §159의3).
                </p>
              </section>

              <AdSlot slot="guide-aug-cgt-mid" format="rectangle" />

              {/* 4. 단기 1년/2년 */}
              <section aria-label="단기 보유 1년/2년 경계" className="card">
                <h2 className="mb-4 text-2xl font-semibold">단기 1년/2년 경계 — 한 달 차이가 수백만 원</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="sr-only">주택 양도세 단기 보유 세율</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">보유 기간</th>
                        <th className="py-2 pr-4 font-semibold">세율</th>
                        <th className="py-2 font-semibold">2억 차익 세액 (지방세 별도)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1년 미만</td><td className="py-2 pr-4">70% 단일세율</td><td className="py-2">약 1.4억</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1년 ~ 2년 미만</td><td className="py-2 pr-4">60% 단일세율</td><td className="py-2">약 1.2억</td></tr>
                      <tr><td className="py-2 pr-4">2년 이상</td><td className="py-2 pr-4">누진 6~45%</td><td className="py-2">약 6,200만 (38% 구간 − 누진공제)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  근거: 소득세법 §104①2호 가목. 분양권은 별도(1년 미만 70% / 1년 이상 60% 고정).
                </p>
              </section>

              {/* 5. FAQ (중간 배치 — GEO) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 6. 양도 시점 vs 귀속 */}
              <section aria-label="양도 시점 vs 귀속연도" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도 시점 vs 귀속연도 결정 원칙</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  양도일 = 잔금 청산일이 원칙(소득세법 §98). 잔금 청산일이 등기 접수일보다 늦으면 등기 접수일.
                  8월 양도(잔금 청산) → 2026년 귀속 → 신고 기한 = 8월 말일부터 2개월 = 2026-10-31(§118).
                </p>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>2026-08-20 잔금 → 2026 귀속 → 2026-10-31까지 신고·납부</li>
                  <li>2026-12-25 잔금 → 2026 귀속 → 2027-02-28까지 신고·납부</li>
                  <li>2027-01-05 잔금 → 2027 귀속 → 2027-03-31까지 신고·납부</li>
                </ul>
                <p className="mt-3 text-sm text-text-tertiary">
                  세법 개정안이 2027 귀속분부터 적용되면 2026 귀속(8월 양도)이 보수적 선택.
                </p>
              </section>

              {/* 7. 절세 5가지 */}
              <section aria-label="절세 5가지" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도세 절세 5가지</h2>
                <div className="space-y-3 text-text-secondary">
                  <div><strong className="text-text-primary">① 기한 내 신고</strong> — 양도일 속한 달 말일부터 2개월 이내. 무신고 가산세 20%(국세기본법 §47의2).</div>
                  <div><strong className="text-text-primary">② 1세대1주택 비과세 재확인</strong> — 보유 2년 + 거주 요건 + 12억 이하(§89). 12억 초과분만 과세.</div>
                  <div><strong className="text-text-primary">③ 장기보유공제 최대 활용</strong> — 거주 기간 단절 주의. 보유 10년+거주 10년이면 80%(§95).</div>
                  <div><strong className="text-text-primary">④ 부부 공동명의</strong> — 양도소득금액 분할로 누진세율 상위 구간 회피.</div>
                  <div><strong className="text-text-primary">⑤ 일시적 2주택 3년 D-day</strong> — 1일 초과 시 비과세 특례 상실. 잔금일 정확히 기록.</div>
                </div>
              </section>

              {/* 8. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>잔금 청산일과 등기 접수일 중 빠른 날이 양도일 — 양도 직전 점검 필수.</li>
                  <li>거주 기간은 주민등록 이력 기준 — 이사 후 재입주는 단절로 처리.</li>
                  <li>조정대상지역 여부는 국토부 공고 확인 — 2026년 일부 해제 진행 중.</li>
                  <li>다주택·상속·증여 병행 케이스는 세무사 상담 권장 — 본 가이드는 일반론.</li>
                </ul>
              </section>

              {/* 9. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 본 가이드 시나리오 즉시 시뮬</li>
                  <li>→ <Link href="/guide/temporary-two-houses-capital-gains-exemption/" className="text-primary-600 underline dark:text-primary-500">일시적 2주택 비과세 3년</Link> — 신규 1년 후·종전 3년 내</li>
                  <li>→ <Link href="/guide/long-term-holding-special-deduction-80-percent/" className="text-primary-600 underline dark:text-primary-500">장기보유특별공제 80%</Link> — 1세대1주택 보유 4% × 거주 4%</li>
                  <li>→ <Link href="/guide/one-household-12-billion-exemption/" className="text-primary-600 underline dark:text-primary-500">1세대1주택 12억 비과세 한도</Link> — 비례 과세 공식</li>
                  <li>→ <Link href="/guide/joint-ownership-couple-capital-gains-tax-savings/" className="text-primary-600 underline dark:text-primary-500">부부 공동명의 양도세 절세</Link> — 누진세 분산</li>
                  <li>→ <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">양도세 절세 7가지 팁</Link> — 종합 절세 전략 hub</li>
                </ul>
              </section>

              <ShareButtons title="8월 양도세 절세 검토 가이드 2026" url={URL} description="일시적2주택·장기보유공제 80%·단기 경계·절세 5가지." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §89 (1세대1주택 비과세) · §94 (양도소득) · §95 (장기보유특별공제) · §98 (양도일) · §104 (양도세율) · §104의3 (다주택 중과) · §118 (예정신고) · 시행령 §154 (1세대1주택 비과세) · §155 (일시적 2주택) · §159의3 (장기보유공제 — 일반) · 국세기본법 §47의2·§47의4 (가산세). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 다주택, 상속·증여 병행, 해외 거주, 임대 등 개별 사정은 반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵). 본 가이드는 AI 보조 작성 후 운영자 검수 발행되었습니다.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
