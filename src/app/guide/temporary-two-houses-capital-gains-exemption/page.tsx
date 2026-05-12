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
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/temporary-two-houses-capital-gains-exemption/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '일시적 2주택 양도세 비과세 3년 완벽 정리 2026 | 신규 구매 후 매도',
  description:
    '일시적 2주택 비과세 조건 3가지(신규 1년 후 취득, 종전 3년 내 양도, 2년 보유)를 정확히 정리. 12억 한도 적용·2023년 양도 기한 통일·거주 의무·함정 5가지·신고 절차·소득세법 §89·시행령 §155.',
  keywords: [
    '일시적 2주택 양도세',
    '일시적 2주택 3년',
    '2주택 양도세 비과세',
    '신규 주택 취득 후 양도',
    '일시적 2주택 12억',
    '일시적 2주택 거주',
    '2주택 양도 기한',
    '일시적 2주택 신고',
    '2026 2주택',
    '소득세법 89',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '일시적 2주택 양도세 비과세 3년 완벽 정리 2026',
    description: '신규 구매 후 종전 주택 3년 내 매도 시 비과세 조건·12억 한도·함정 5가지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '일시적 2주택 양도세 비과세 3년 완벽 정리 2026',
    description: '3년 기한·12억 한도·신규 1년 후 취득 조건.',
  },
};

const FAQ_ITEMS = [
  {
    question: '일시적 2주택 비과세는 "2주택 동시 보유"를 의미하나요?',
    answer:
      '네. 1세대가 새로운 주택을 취득한 후, 기존 주택을 계속 보유하면서 함께 소유하는 기간을 말합니다. 신규 주택 취득 후 종전 주택을 3년 이내에 양도해야 비과세 적용(시행령 §155). 단, 종전 주택 취득일로부터 1년 이상 경과한 후에 신규 주택을 취득해야 합니다.',
  },
  {
    question: '2023년에 양도 기한이 2년 → 3년으로 통일되었다고 하는데, 지역별로 다른가요?',
    answer:
      '2023년 1월 12일 이전에는 조정대상지역 2년, 비조정지역 1년으로 나뉘었으나, 2023년 1월 12일 시행령 개정으로 모든 지역 3년으로 통일되었습니다(시행령 §155). 따라서 2023년 1월 이후 신규 주택을 취득한 경우 모두 3년이 기한입니다. 이전에 취득한 경우는 개정 전 기한이 적용되므로 세무사 확인 필수.',
  },
  {
    question: '12억 비과세 한도는 일시적 2주택에도 그대로 적용되나요?',
    answer:
      '네. 일시적 2주택도 1세대1주택과 동일하게 양도가액 12억 원 이하면 전액 비과세(소득세법 §89 ① 3호)입니다. 12억 초과분은 비례 과세(12억 초과액 비율만 과세)되며, 장기보유공제 30%도 적용됩니다. 예: 양도가 15억 → 초과 3억 비율인 20%만 과세 대상.',
  },
  {
    question: '거주 의무가 있나요? 2017년 이후 조정지역 취득분만인가요?',
    answer:
      '일시적 2주택도 1세대1주택과 동일한 거주 규칙 적용(시행령 §154). 비조정대상지역 취득분은 거주 의무 없음. 조정대상지역 취득분은 보유 2년 + 거주 2년 의무(2017년 8월 3일 이후 취득분). 종전 주택은 1세대1주택과 동일하게 거주 기간을 입증해야 합니다(주민등록·공과금 명세).',
  },
  {
    question: '신규 주택을 취득한 지 1년 이내에 종전 주택을 양도하면 비과세 안 된다는데, 정확한가요?',
    answer:
      '네. 일시적 2주택 비과세는 종전 주택 취득 후 1년 이상 경과하여 신규 주택을 취득해야 한다는 조건이 있습니다(시행령 §155 ① 1호). 예: 2024년 1월 1일 종전 주택 취득 → 2025년 1월 1일 이후 신규 주택 취득 가능. 만약 신규 취득을 1년 미만에 했다면 일시적 2주택 비과세 적용 불가능.',
  },
];

export default function TemporaryTwoHousesCapitalGainsExemptionGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '일시적 2주택 양도세 비과세 3년 완벽 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '일시적 2주택 양도세 비과세 3년 완벽 정리 2026',
    description:
      '일시적 2주택 비과세 조건 3가지(신규 1년 후 취득, 종전 3년 내 양도, 2년 보유)·12억 한도·거주 의무·함정 5가지·신고 절차.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['일시적 2주택', '양도세', '비과세', '3년', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '일시적 2주택 양도세 비과세 3년 완벽 정리 2026',
    description: '신규 구매 후 종전 주택 3년 내 매도 시 비과세 조건·12억 한도·거주 의무·함정 5가지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

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
                    { name: '일시적 2주택 양도세 비과세 3년 완벽 정리' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  일시적 2주택 양도세 비과세 3년 완벽 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  집을 바꿀 때마다 무조건 양도세를 내야 할까? 새 집을 사면서 기존 집을 팔 때 적용되는
                  <strong>일시적 2주택 특례</strong>를 정확히 정리합니다. 신규 주택 취득 후 종전 주택을 3년
                  이내에 양도하면 1세대1주택과 동일하게 양도가액 12억 이하는 비과세(소득세법 §89, 시행령 §155).
                  단, 3가지 조건과 5가지 함정을 놓치면 과세됩니다.
                </p>
              </header>

              <AdSlot slot="guide-temp2house-top" format="horizontal" />

              {/* 1. 일시적 2주택 정의 */}
              <section aria-label="일시적 2주택 정의" className="card">
                <h2 className="mb-4 text-2xl font-semibold">일시적 2주택이란?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  일시적 2주택은 1세대가 주택을 새로 구매한 후, 기존 주택을 계속 소유하면서 두 주택을 함께 보유하는
                  상태를 말합니다. 이는 집을 옮길 때 자연스럽게 발생하는 상황으로, 새 집 계약 후 기존 집 계약이
                  완료될 때까지 2주택 상태가 되는 것입니다. 비과세가 적용되려면 이 기간이 3년 이내여야 합니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">타임라인 예시</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>2022년 1월 1일: 종전 주택 취득 (잔금 청산)</li>
                    <li>2023년 1월 2일 이후: 신규 주택 취득 가능 (1년 경과)</li>
                    <li>2023년 6월 1일: 신규 주택 매매 계약</li>
                    <li>2023년 7월 15일: 신규 주택 잔금 청산 (2주택 보유 시작)</li>
                    <li>2026년 7월 14일: 종전 주택 양도 마감 (3년 이내) ✅ 비과세</li>
                    <li>2026년 7월 15일: 종전 주택 양도 (3년 초과) ❌ 과세</li>
                  </ul>
                </div>
              </section>

              {/* 2. 비과세 3대 요건 */}
              <section aria-label="비과세 3대 요건" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">일시적 2주택 비과세 3대 필수 조건</h2>
                <ol className="list-inside list-decimal space-y-4 text-text-secondary" data-speakable>
                  <li>
                    <strong>① 신규 주택 취득까지 1년 경과</strong> — 종전 주택 취득(잔금 청산)으로부터 1년 이상
                    경과한 후에 신규 주택을 취득해야 합니다(시행령 §155 ① 1호). 1년 미만에 신규 주택을 사면 비과세
                    불가능. 취득일은 계약일이 아닌 잔금 청산일 기준입니다.
                  </li>
                  <li>
                    <strong>② 종전 주택 양도는 3년 이내</strong> — 신규 주택 취득(잔금 청산)으로부터 3년 이내에
                    종전 주택을 양도해야 합니다(시행령 §155 ① 2호). 2023년 1월 12일 시행령 개정 이전에는
                    조정대상지역 2년, 비조정지역 1년이었으나, 개정 후 모든 지역 3년으로 통일되었습니다.
                  </li>
                  <li>
                    <strong>③ 종전 주택 보유 2년 이상</strong> — 종전 주택을 취득한 후 양도할 때까지 2년 이상
                    보유해야 합니다(시행령 §154). 만약 조정대상지역에서 취득한 주택이면 보유 2년 + 거주 2년
                    의무(단, 2017년 8월 3일 이후 취득분만).
                  </li>
                </ol>
              </section>

              {/* 3. 양도 기한 변천사 */}
              <section aria-label="양도 기한 변천사" className="card">
                <h2 className="mb-4 text-2xl font-semibold">일시적 2주택 양도 기한 — 2023년 통일 정리</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">일시적 2주택 양도 기한 변천</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">시기</th>
                        <th className="py-2 pr-4 font-semibold">조정대상지역</th>
                        <th className="py-2 font-semibold">비조정지역</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">2023년 1월 11일 이전 신규 취득</td>
                        <td className="py-2 pr-4">2년</td>
                        <td className="py-2">1년</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">2023년 1월 12일 이후 신규 취득</td>
                        <td className="py-2 pr-4">3년 (통일)</td>
                        <td className="py-2">3년 (통일)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  2023년 1월 12일 시행령 개정으로 모든 지역이 3년으로 통일되었습니다. 2023년 1월 이전에 신규
                  주택을 취득한 경우는 기한이 더 짧을 수 있으므로 세무사 확인이 필수입니다.
                </p>
              </section>

              {/* 4. 12억 한도 적용법 */}
              <section aria-label="12억 한도 적용법" className="card">
                <h2 className="mb-4 text-2xl font-semibold">12억 비과세 한도 — 비례 과세 공식</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  일시적 2주택도 1세대1주택과 동일하게 양도가액 12억 원 이하면 비과세입니다(소득세법 §89 ① 3호).
                  12억을 초과하면 초과분만 비례 과세되며, 초과분에 대해 누진세율과 장기보유공제 30%가 적용됩니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 font-mono text-sm" data-speakable>
                  과세 양도차익 = 양도차익 × (양도가 − 12억) ÷ 양도가
                </div>
                <div className="mt-4 space-y-3 text-text-secondary">
                  <p>
                    <strong>사례 1: 양도가 15억</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1 pl-2">
                    <li>12억 초과액: 15억 − 12억 = 3억 (비율 20%)</li>
                    <li>과세 비율: 20%</li>
                    <li>양도차익 7억 × 20% = 1.4억 과세</li>
                  </ul>
                  <p className="mt-3">
                    <strong>사례 2: 양도가 20억</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1 pl-2">
                    <li>12억 초과액: 20억 − 12억 = 8억 (비율 40%)</li>
                    <li>과세 비율: 40%</li>
                    <li>양도차익 10억 × 40% = 4억 과세</li>
                  </ul>
                </div>
              </section>

              <AdSlot slot="guide-temp2house-mid" format="rectangle" />

              {/* 5. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 6. 거주 의무 — 2017년 이후 조정지역만 */}
              <section aria-label="거주 의무" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  거주 의무 — 2017년 8월 3일 이후 조정대상지역 취득분만
                </h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  일시적 2주택도 1세대1주택 거주 규칙을 그대로 적용합니다. 비조정대상지역에서 종전 주택을 취득한
                  경우 거주 의무가 없으며, 보유 2년만 만족하면 비과세 가능합니다. 하지만 조정대상지역에서 취득한
                  주택은 보유 2년 + 거주 2년을 동시에 만족해야 합니다(시행령 §154, 단 2017년 8월 3일 이후
                  취득분).
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">거주 입증 자료</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>주민등록등본(취득 후 이전하여 같은 주소 거주 기간 증명)</li>
                    <li>공과금 명세(전기·가스·수도 요금 납부)</li>
                    <li>고정자산세 납세 증명</li>
                    <li>자동차 등록증(같은 주소 거주 증명)</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  거주 기간 단절: 이사 후 재입주하면 거주 기간이 초기화됩니다. 거주 2년을 위반하면 비과세 불가능.
                </p>
              </section>

              {/* 7. 함정 5가지 */}
              <section aria-label="함정 5가지" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 일시적 2주택 비과세 함정 5가지</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 1: 1년 경과 기준은 "계약일"이 아닌 "잔금 청산일"</strong>
                    </p>
                    <p className="text-sm">
                      종전 주택 계약 후 1년이 아니라, 잔금을 낸 날부터 1년입니다. 계약일이 2022년 1월인데
                      잔금이 2022년 3월이면, 1년은 2023년 3월부터 계산됩니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 2: 3년 기한도 마찬가지로 "신규 주택 잔금 청산일" 기준</strong>
                    </p>
                    <p className="text-sm">
                      신규 주택 계약이 2023년 6월이어도 잔금이 2023년 9월이면, 종전 주택 양도 기한은 2026년 9월
                      24시까지입니다. 기한을 하루라도 넘기면 비과세 불가능.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 3: 신규 주택을 임차인이 아닌 본인이 취득해야 함</strong>
                    </p>
                    <p className="text-sm">
                      배우자 이름으로 신규 주택을 취득하고 본인이 종전 주택을 양도해도, 1세대 합산이므로 일시적
                      2주택 적용 가능합니다. 하지만 다른 사람 이름으로 신규 주택을 취득하면 안 됩니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 4: 종전 주택 보유 2년은 "양도가 기준" 아님</strong>
                    </p>
                    <p className="text-sm">
                      보유 2년은 취득일(잔금)부터 양도일(거래 완료일)까지입니다. 계약이 되었어도 아직 인수도 전이면
                      아직 보유 중이 아닙니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">
                        함정 5: 신규 주택을 분양권·입주권으로 취득한 경우 1년 경과 기산점 주의
                      </strong>
                    </p>
                    <p className="text-sm">
                      종전 주택을 보유한 상태에서 분양권을 청약 당첨받은 경우, "1년 경과" 기산점은 분양권 취득일이
                      아니라 신규 주택의 잔금 청산일(완공·등기 시점)입니다(시행령 §155). 분양권 보유 중에는 신규
                      주택을 "취득"한 것으로 보지 않으므로, 종전 주택 취득 후 1년이 지나지 않은 시점에 분양권을
                      받았더라도 잔금 청산이 1년 이후라면 비과세 가능합니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. 신고 절차 */}
              <section aria-label="신고 절차" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도세 신고 절차</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  일시적 2주택 비과세를 받으려면 반드시 신고를 해야 합니다. 비과세라도 신고 의무가 있으며, 신고
                  기한을 놓치면 가산세와 이자가 부과됩니다(소득세법 §105 예정신고).
                </p>
                <ol className="list-inside list-decimal space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>신고 기한</strong>: 양도한 달의 말일부터 2개월 이내 (예: 6월 양도 → 8월 31일까지)
                  </li>
                  <li>
                    <strong>신고 장소</strong>: 관할 세무서 또는 홈택스(hometax.go.kr) 인터넷 신고
                  </li>
                  <li>
                    <strong>제출 서류</strong>: 양도소득세 신고서 + 거주 입증 자료(주민등록등본, 공과금 명세 등)
                  </li>
                  <li>
                    <strong>기한 후 신고</strong>: 기한을 놓쳤다면, 납부 전에 신고하면 가산세 50% 감경. 납부 후
                    신고하면 가산세 50% 추가.
                  </li>
                </ol>
              </section>

              {/* 9. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    → <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 일시적 2주택·12억 한도 시뮬
                  </li>
                  <li>
                    → <Link href="/guide/one-household-12-billion-exemption/" className="text-primary-600 underline dark:text-primary-500">1세대1주택 12억 한도 완전 정리</Link> — 비례 과세·거주 요건·장기보유공제 80%
                  </li>
                  <li>
                    → <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">양도세 절세 7가지</Link> — 장기보유·1세대1주택·분리 신고 전략
                  </li>
                  <li>
                    → <Link href="/guide/august-capital-gains-tax-review/" className="text-primary-600 underline dark:text-primary-500">8월 양도세 검토 가이드</Link> — 일시적 2주택 D-day·기한 확인
                  </li>
                  <li>
                    → <Link href="/guide/december-capital-gains-tax-deadline/" className="text-primary-600 underline dark:text-primary-500">12월 양도세 마감 가이드</Link> — 연말 매도 결정·신고 기한
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="일시적 2주택 양도세 비과세 3년 완벽 정리 2026"
                url={URL}
                description="신규 구매 후 종전 주택 3년 내 매도 시 비과세 조건·12억 한도·함정 5가지."
              />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §89 (1세대1주택 비과세) · §94 (양도소득) · §95 (장기보유특별
                  공제) · §98 (양도시기) · §103 (양도소득 기본공제) · §104 (양도세율) · §105 (예정신고) · §110
                  (확정신고) · 시행령 §154 (1세대1주택 범위·보유·거주 요건) · §155 ① (일시적 2주택 특례 — 1년 경과 ·
                  3년 양도 기한). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    홈택스
                  </a>
                  , <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청
                  </a>
                  , <a
                    href="https://www.law.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    법령정보센터
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다.
                  상속·증여, 기한 단절, 세대 분리, 법인 거래 등 개별 사정에 따라 적용이 달라지므로 반드시 세무사
                  또는 국세청 상담을 통해 확정하시기 바랍니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵). 본 가이드는
                  AI 보조 작성 후 운영자 검수 발행되었습니다.
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
