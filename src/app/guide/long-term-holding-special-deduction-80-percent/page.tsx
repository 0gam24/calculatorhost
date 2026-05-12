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

const URL = 'https://calculatorhost.com/guide/long-term-holding-special-deduction-80-percent/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '장기보유특별공제 80% 완전 정리 2026 | 1세대1주택 10년 보유·거주',
  description:
    '1세대1주택 장기보유특별공제 최대 80% 조건·보유 40% + 거주 40% 분리 계산·표2 기준·다주택 중과 배제·분양권 미적용·시뮬 3가지·함정 5가지.',
  keywords: [
    '장기보유특별공제',
    '장기보유특별공제 80%',
    '1세대1주택 10년',
    '1주택 양도세 공제',
    '보유 거주 분리 계산',
    '양도세 절세',
    '1세대1주택 조건',
    '장기보유공제 최대',
    '양도소득세 공제',
    '2026 장특공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '장기보유특별공제 80% 완전 정리 2026',
    description: '1세대1주택 80% 공제 조건·보유 4%/거주 4% 연 계산·다주택 배제·분양권 배제.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '장기보유특별공제 80% 완전 정리 2026',
    description: '1세대1주택 10년 보유·10년 거주 = 80% 공제, 다주택 중과 시 배제.',
  },
};

const FAQ_ITEMS = [
  {
    question: '장기보유특별공제 80%는 누구에게만 적용되나요?',
    answer:
      '1세대1주택에만 적용됩니다(소득세법 §95 ②, 시행령 §159의3). 일반인(다주택자·법인)은 표1 기준으로 최대 30%, 1세대1주택자만 표2 기준 최대 80%입니다. 다주택 중과(조정+2주택 이상)를 받는 양도분은 장특공제를 받을 수 없으므로 배제됩니다.',
  },
  {
    question: '보유 기간 4%와 거주 기간 4%는 어떻게 다른가요?',
    answer:
      '보유(소유) 기간과 거주(실제 거주) 기간을 분리 계산합니다. 보유 10년+거주 10년 시 보유분 40%+거주분 40%=80% 공제. 비거주 기간(이사한 기간)은 거주 부분 0%입니다. 예: 보유 12년+거주 6년 → 보유 40%(상한) + 거주 24%(6년×4%) = 64% 공제.',
  },
  {
    question: '조정대상지역과 비조정지역에서 거주 요건이 다른가요?',
    answer:
      '다릅니다. 비조정지역에서 취득한 주택은 거주 의무가 없으므로 보유 기간만 계산합니다(거주 0%). 조정대상지역 취득분은 거주 2년 이상 요건이 있고(2017년 8월 3일 이후), 이를 만족해야만 비과세·공제 적용됩니다(시행령 §154). 지역 확인은 양도 시점 기준 국세청 자료 참조.',
  },
  {
    question: '분양권으로 양도하면 장기보유특별공제를 받을 수 없다는데, 맞나요?',
    answer:
      '네. 장기보유특별공제 적용 자산은 보유 3년 이상의 토지·건물·조합원입주권으로 한정됩니다(소득세법 §95 ①). 분양권은 §94 ① 4호의 권리 양도로 분류되어 장특공제 대상이 아니고, 미등기 양도자산도 배제됩니다. 분양권은 양도세율 70%(1년 미만) 또는 60%(1년 이상)이 직접 적용되며, 분양권 취득자가 완공 후 등기된 건물로 재양도할 때부터 보유 기간을 기산합니다.',
  },
  {
    question: '상속받은 주택도 80% 공제가 적용되나요?',
    answer:
      '네. 상속받은 주택의 보유 기간은 피상속인이 보유한 기간을 합산합니다(소득세법 §95 ④). 예: 아버지가 10년 보유 후 상속받고 2년 더 보유 → 보유 12년으로 계산. 다만 1세대1주택 비과세·공제 적용을 위해서는 상속 후 보유/거주 요건을 충족해야 하고, 다주택 판정도 따로 적용됩니다.',
  },
];

export default function LongTermHoldingSpecialDeduction80Guide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '장기보유특별공제 80% 완전 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '장기보유특별공제 80% 완전 정리 2026',
    description:
      '1세대1주택 장기보유특별공제 최대 80% 적용 조건·보유/거주 분리 계산법·표2 기준·다주택 배제·분양권 미적용·시뮬 사례 3개·함정 5가지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['장기보유특별공제', '1세대1주택', '80%', '보유', '거주'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '장기보유특별공제 80% 완전 정리 2026',
    description: '1세대1주택 80% 공제 조건·보유 4%/거주 4% 연 계산·표2·다주택/분양권 배제.',
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
                    { name: '장기보유특별공제 80% 완전 정리' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  장기보유특별공제 80% 완전 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  오랫동안 보유한 주택을 팔 때 양도세를 얼마나 줄일 수 있을까? 1세대가 보유한 주택이라면
                  <strong>장기보유특별공제</strong>로 최대 80%까지 과세 이익을 절감할 수 있습니다. 보유 기간과
                  거주 기간을 분리하여 각각 4%씩 누적되는 표2 계산법, 다주택 중과 시 배제 규칙, 분양권 미적용
                  조건을 정확히 정리합니다(소득세법 §95 ②, 시행령 §159의3).
                </p>
              </header>

              <AdSlot slot="guide-ltsd-top" format="horizontal" />

              {/* 1. 정의 */}
              <section aria-label="정의" className="card">
                <h2 className="mb-4 text-2xl font-semibold">장기보유특별공제란?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  장기보유특별공제는 주택을 오랫동안 보유한 소유자에게 양도소득세 계산 시 공제를 주는 제도입니다.
                  보유 기간이 길수록, 거주 기간이 길수록 공제율이 높아집니다. 1세대1주택자는 일반인보다 훨씬
                  유리한 조건(표2)을 받으며, 보유 10년 + 거주 10년 시 합계 80% 공제가 가능합니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">공제 원리</strong>
                  </p>
                  <p>
                    양도차익(양도가 − 취득가 − 경비) × (1 − 공제율) = 과세 양도소득. 예를 들어 양도차익 5억에
                    80% 공제 적용 시 과세 대상은 1억만 남습니다.
                  </p>
                </div>
              </section>

              {/* 2. 표1 일반 vs 표2 1세대1주택 */}
              <section aria-label="표1 일반 vs 표2 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">표1 (일반)과 표2 (1세대1주택) 비교</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  장기보유특별공제는 신분(1세대1주택 여부)과 자산 종류에 따라 두 가지 표를 적용합니다. 가장 큰
                  차이는 공제 한도: 일반은 최대 30%, 1세대1주택은 최대 80%입니다(소득세법 §95 ②, 시행령 §159의3).
                </p>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">장기보유특별공제 표1 표2 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">구분</th>
                        <th className="py-2 pr-4 font-semibold">표1 (일반)</th>
                        <th className="py-2 font-semibold">표2 (1세대1주택)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">대상</td>
                        <td className="py-2 pr-4">다주택자, 법인</td>
                        <td className="py-2">1세대가 1개 주택만 보유</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">연 공제율</td>
                        <td className="py-2 pr-4">2% (보유만)</td>
                        <td className="py-2">4% (보유) + 4% (거주)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">최소 적용</td>
                        <td className="py-2 pr-4">3년 이상 보유</td>
                        <td className="py-2">기한 없음 (1년도 적용)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">최대 공제</td>
                        <td className="py-2 pr-4">30% (15년)</td>
                        <td className="py-2">80% (보유 10년+거주 10년)</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold">다주택 중과 시</td>
                        <td className="py-2 pr-4">—</td>
                        <td className="py-2">공제 배제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. 표2 상세 — 보유·거주 분리 */}
              <section aria-label="표2 보유 거주 분리" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">표2 (1세대1주택) — 보유·거주 분리 계산</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  1세대1주택의 장특공제는 <strong>보유 기간</strong>과 <strong>거주 기간</strong>을 별도로 계산합니다.
                  보유는 주택을 소유한 전체 기간이고, 거주는 실제로 살던 기간만 인정됩니다(시행령 §159의3 표2).
                </p>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">표2 1세대1주택 장기보유특별공제 기준</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">보유 기간</th>
                        <th className="py-2 pr-4 font-semibold">공제율</th>
                        <th className="py-2 font-semibold">거주 기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">3년 이상</td>
                        <td className="py-2 pr-4">12%</td>
                        <td className="py-2">3년 이상</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">4년 이상</td>
                        <td className="py-2 pr-4">16%</td>
                        <td className="py-2">4년 이상</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">5년 이상</td>
                        <td className="py-2 pr-4">20%</td>
                        <td className="py-2">5년 이상</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">⋮</td>
                        <td className="py-2 pr-4">⋮</td>
                        <td className="py-2">⋮</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">10년 이상</td>
                        <td className="py-2 pr-4">40% (상한)</td>
                        <td className="py-2">10년 이상</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold">합계 최대</td>
                        <td className="py-2 pr-4 font-semibold text-primary-600">80%</td>
                        <td className="py-2 font-semibold text-primary-600">40% (상한)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-text-tertiary">
                  주의: 보유분과 거주분은 각각 10년이 상한입니다. 보유 12년이어도 40% (10년×4%), 거주 8년이면
                  32% (8년×4%) 적용됩니다. 합계는 최대 80%입니다.
                </p>
              </section>

              {/* 4. 거주 입증 */}
              <section aria-label="거주 입증" className="card">
                <h2 className="mb-4 text-2xl font-semibold">거주 기간 인증 — 주의할 점</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  거주 기간은 주민등록등본, 공과금 납부 기록, 자동차 등록증 등으로 입증합니다. 단순히 "살았다"는
                  말만으로는 인정되지 않습니다. 또한 조정대상지역에서 취득한 주택은 거주 2년 이상이 필수 요건입니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">거주 입증 자료</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>주민등록등본 (취득 후 해당 주소로 이전, 이전일 기록)</li>
                    <li>공과금 명세 (전기·가스·수도·난방 요금 명세서, 기간 2년 이상)</li>
                    <li>고정자산세 납세 증명 (여러 해 누적 기록)</li>
                    <li>자동차 등록증 (같은 주소 거주 증명)</li>
                    <li>금융기관 통지서 (거주지로 발송된 기록)</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  거주 기간 단절: 이사 후 재입주하면 이전 거주 기간이 분단됩니다. 예: 2년 살다가 이사 후 3년 더
                  살면 거주 5년이 아니라 3년 (마지막 거주 기간)으로만 계산될 수 있으므로 세무사 확인 필수.
                </p>
              </section>

              <AdSlot slot="guide-ltsd-mid" format="rectangle" />

              {/* 5. 시뮬레이션 3가지 */}
              <section aria-label="시뮬레이션 3가지" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실제 사례 — 공제액 계산 3가지</h2>

                <div className="mb-6 rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-semibold text-text-primary">사례 1: 최대 공제 (1세대1주택, 보유 12년+거주 10년)</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>양도가 15억 / 취득가 8억 / 경비 2,000만 = 양도차익 6.8억</li>
                    <li>보유 12년 → 40% (상한) 공제</li>
                    <li>거주 10년 → 40% (상한) 공제</li>
                    <li>합계 공제: 80%</li>
                    <li className="font-semibold text-primary-600">과세 대상 양도차익 = 6.8억 × 20% = 1.36억</li>
                  </ul>
                </div>

                <div className="mb-6 rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-semibold text-text-primary">사례 2: 부분 공제 (1세대1주택, 보유 6년+거주 4년)</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>양도가 12억 / 취득가 6억 / 경비 1,500만 = 양도차익 5.15억</li>
                    <li>보유 6년 → 24% (6년×4%) 공제</li>
                    <li>거주 4년 → 16% (4년×4%) 공제</li>
                    <li>합계 공제: 40%</li>
                    <li className="font-semibold text-primary-600">과세 대상 양도차익 = 5.15억 × 60% = 3.09억</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-semibold text-text-primary">사례 3: 다주택 중과 배제 (조정지역, 2주택)</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>양도가 10억 / 취득가 5억 / 경비 1,000만 = 양도차익 4.9억</li>
                    <li>조정+2주택 중과: 기본 누진세율 + 20%p 추가 적용</li>
                    <li>
                      <strong>장기보유특별공제 불가능</strong> (소득세법 §95 ② 단서)
                    </li>
                    <li className="font-semibold text-danger-500">과세 대상 양도차익 = 4.9억 (공제 0%)</li>
                  </ul>
                </div>
              </section>

              {/* 6. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 7. 함정 5가지 */}
              <section aria-label="함정 5가지" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 장기보유특별공제 함정 5가지</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 1: 거주 기간이 0이 되는 경우</strong>
                    </p>
                    <p className="text-sm">
                      주택을 보유하기만 했고 한 번도 거주하지 않은 경우, 거주 기간은 0% 공제입니다. 예: 12년 보유
                      + 거주 0년 → 보유 40% (상한) + 거주 0% = 40% 공제만 적용. 80% 공제는 불가능합니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 2: 비조정지역은 거주 의무 없음</strong>
                    </p>
                    <p className="text-sm">
                      비조정대상지역에서 취득한 주택은 거주 의무가 없습니다. 보유 12년만 해도 보유 40% 공제가
                      적용되나, 거주 부분(40%)은 실제 거주 기간에만 반영됩니다. 보유만으로 80% 공제는 불가능.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 3: 조정지역 2년 거주 미충족</strong>
                    </p>
                    <p className="text-sm">
                      조정대상지역에서 2017년 8월 3일 이후 취득한 주택은 보유 2년 + 거주 2년이 필수 요건입니다.
                      이를 충족하지 않으면 1세대1주택 비과세도 장특공제도 불가능합니다(시행령 §154).
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 4: 분양권 양도는 공제 배제</strong>
                    </p>
                    <p className="text-sm">
                      분양권 양도 시 장기보유특별공제를 받을 수 없습니다. 장특공제 적용 자산은 보유 3년 이상의
                      토지·건물·조합원입주권으로 한정되기 때문입니다(소득세법 §95 ①). 분양권은 양도세율 60~70%
                      직접 적용. 미등기 양도자산도 배제됩니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 5: 다주택 중과 중인 양도분 (배제)</strong>
                    </p>
                    <p className="text-sm">
                      조정+2주택 이상을 소유한 상태에서 양도하면 다주택 중과세(누진율 +20~30%p)를 받으며, 동시에
                      장특공제가 완전히 배제됩니다(소득세법 §95 ② 단서). 예: 조정+3주택 중 1채 양도 → 공제 0%.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. 다주택 중과 규칙 */}
              <section aria-label="다주택 중과" className="card">
                <h2 className="mb-4 text-2xl font-semibold">다주택 중과 적용 시 장특공제 배제</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  조정대상지역에서 2주택 이상을 소유한 상태에서 양도하는 경우, 다주택 중과세율(소득세법 §104 ⑦)
                  이 적용되며 장기보유특별공제는 배제됩니다(소득세법 §95 ② 단서). 단, 정부의 한시적 중과 배제
                  조치가 빈번하므로 양도 시점의 시행령·고시를 별도 확인하시기 바랍니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">다주택 중과 판정</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>조정대상지역: 2주택 이상 소유 → 중과 적용</li>
                    <li>비조정지역: 다주택 중과 불적용</li>
                    <li>중과 적용 시: 누진세율 + 20%p (2주택) 또는 +30%p (3주택 이상)</li>
                    <li>장특공제: 100% 배제 (0% 적용)</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  예: 조정지역 2주택자가 보유 12년 주택을 양도 시, 보유 40%+거주 40%=80% 공제를 받을 수 없고,
                  누진세율에 +20%p가 더 붙습니다.
                </p>
              </section>

              {/* 9. 신고·입력 방법 */}
              <section aria-label="신고 입력 방법" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도소득세 신고 시 장특공제 입력법</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  장기보유특별공제를 적용하려면 양도소득세 신고서(홈택스 또는 세무서)에서 올바르게 입력해야 합니다.
                  공제 기간과 공제액을 정확히 기재하지 않으면 과세청이 인정하지 않을 수 있습니다.
                </p>
                <ol className="list-inside list-decimal space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>홈택스 양도소득세 신고</strong>: 양도 달의 말일부터 2개월 이내에
                    <a
                      href="https://www.hometax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="ml-1 text-primary-600 underline dark:text-primary-500"
                    >
                      홈택스
                    </a>
                    에서 신고
                  </li>
                  <li>
                    <strong>보유 기간 입력</strong>: 취득일(잔금 청산일)부터 양도일(거래 완료일)까지의 기간을
                    연도로 환산 (소수점 1자리)
                  </li>
                  <li>
                    <strong>거주 기간 입력</strong>: 실제 거주한 기간만 (주민등록등본·공과금 기준). 비거주 기간
                    제외
                  </li>
                  <li>
                    <strong>공제율 선택</strong>: 1세대1주택(표2)을 선택. 보유·거주 기간 입력 시 공제율이 자동
                    계산됨
                  </li>
                  <li>
                    <strong>다주택 중과 여부 확인</strong>: 조정대상지역에서 2주택 이상이면 장특공제가 불가능함을
                    명시
                  </li>
                  <li>
                    <strong>첨부 자료</strong>: 거주 입증 자료(주민등록등본, 공과금 명세) 첨부. 부족하면 과세청이
                    요청
                  </li>
                </ol>
              </section>

              {/* 10. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    → <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 1세대1주택·다주택·일시적2주택 시뮬
                  </li>
                  <li>
                    → <Link href="/guide/one-household-12-billion-exemption/" className="text-primary-600 underline dark:text-primary-500">1세대1주택 12억 한도 완전 정리</Link> — 비과세 조건·비례 과세
                  </li>
                  <li>
                    → <Link href="/guide/temporary-two-houses-capital-gains-exemption/" className="text-primary-600 underline dark:text-primary-500">일시적 2주택 양도세 비과세 3년 완벽 정리</Link> — 1년 경과·3년 기한·함정 5가지
                  </li>
                  <li>
                    → <Link href="/guide/august-capital-gains-tax-review/" className="text-primary-600 underline dark:text-primary-500">8월 양도세 검토 가이드</Link> — 연간 D-day·공제 계산 리뷰
                  </li>
                  <li>
                    → <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">양도세 절세 7가지</Link> — 장기보유·기본공제·필요경비 전략
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="장기보유특별공제 80% 완전 정리 2026"
                url={URL}
                description="1세대1주택 80% 공제 조건·보유 4%/거주 4% 연 계산·표2·다주택/분양권 배제."
              />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §94 (양도소득 범위) · §95 ① (장특공제 적용 자산) · §95 ②
                  (1세대1주택 표2 기준) · §95 ④ (상속·증여 보유 기간 합산) · §98 (양도시기) · §103 (양도소득
                  기본공제 250만 원) · §104 (양도세율) · §104 ⑦ (다주택 중과세율) · §105 (예정신고) · §110
                  (확정신고) · 시행령 §154 (1세대1주택 범위·보유·거주) · §159의3 (장기보유특별공제 기준 표1·표2).
                  참고:{' '}
                  <a
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
                  , <a
                    href="https://www.hometax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    홈택스
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 상속,
                  기한 단절, 세대 분리, 다주택 판정, 조정지역 변경 등 개별 사정에 따라 적용이 달라질 수 있으므로
                  반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다.
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
