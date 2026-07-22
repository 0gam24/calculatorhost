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

const URL = 'https://calculatorhost.com/guide/inheritance-vs-gift-tax-comparison-2026/';
const DATE_PUBLISHED = '2026-06-22';
const DATE_MODIFIED = '2026-06-22';

export const metadata: Metadata = {
  title: '상속세 vs 증여세 2026 | 어느 쪽이 유리한가? 비교 완벽 가이드 | calculatorhost',
  description:
    '상속세와 증여세 어느 것이 절세에 유리할까? 공제 차이·세율·시점·사전증여 합산까지 명확하게 비교. 재산 상황별 의사결정 가이드.',
  keywords: [
    '상속세 vs 증여세',
    '상속 증여 비교',
    '상속세 절세',
    '증여세 절세',
    '상속공제 증여공제',
    '배우자 상속공제',
    '사전증여 합산',
    '상증세법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속세 vs 증여세 2026 | 어느 쪽이 유리한가? | calculatorhost' }],
    title: '상속세 vs 증여세 2026 | 비교 완벽 가이드',
    description: '공제 차이·세율·시점을 한눈에 비교. 재산 상황별 절세 전략까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '보통 상속이 증여보다 세금이 적나요?',
    answer:
      '네, 대부분의 경우 그렇습니다. 이유는 배우자공제(최소 5억)와 일괄공제(5억)가 큰 데다, 한 번에 과세되지만 공제가 많기 때문입니다. 다만 배우자가 없고 자산이 많거나, 수증자(받는 사람)가 여럿이고 장기간에 걸쳐 분산 증여하는 경우엔 증여가 유리할 수 있습니다.',
  },
  {
    question: '배우자가 없으면 증여를 고려해야 하나요?',
    answer:
      '배우자가 없으면 배우자공제를 받지 못해 상속세 부담이 커집니다. 이런 경우 자녀에게 미리 분산 증여하고(증여공제 10년 갱신 활용), 남은 재산만 상속받게 하면 전체 세금을 줄일 수 있습니다.',
  },
  {
    question: '사전증여 합산 기간은 언제부터 언제까지인가요?',
    answer:
      '상속 발생 시점을 기준으로, 상속인에게는 상속개시 10년 전부터 증여를 받은 분은 상속재산에 합산됩니다. 상속인이 아닌 사람(손자, 타인)에게는 5년 전부터 합산됩니다. 구체적 계산은 별도 가이드를 참조하세요.',
  },
  {
    question: '10년마다 증여공제가 초기화된다고 들었는데?',
    answer:
      '네, 정확합니다. 증여재산공제(배우자 6억, 성년 직계비속 5,000만 등)는 10년 단위로 합산되어 초기화됩니다. 예: 2020년에 5,000만 증여하고 2030년에 다시 증여하면, 두 번째는 새로운 10년 구간으로 공제가 초기화됩니다.',
  },
  {
    question: '자산이 크면 어떤 전략이 좋을까요?',
    answer:
      '자산이 30억 이상 극도로 크면, 배우자와 자녀들에게 장기간에 걸쳐 분산 증여하는 것이 유리할 수 있습니다. 각 수증자가 10년마다 공제를 갱신받고, 누진세율의 낮은 구간을 활용할 수 있기 때문입니다. 반드시 세무 전문가와 상담하세요.',
  },
  {
    question: '증여는 정말 모두 신고해야 하나요?',
    answer:
      '네, 증여세는 실제 세금이 나지 않아도 신고 의무가 있습니다. 증여공제 범위 내면 세금을 내지 않지만 신고는 필수입니다. 신고하지 않으면 나중에 적발 시 무신고 가산세가 부과됩니다.',
  },
  {
    question: '배우자 증여는 특별하게 유리한가요?',
    answer:
      '배우자에게는 10년 단위로 6억의 증여공제가 있어 매우 유리합니다. 다만 이것도 사전증여 규정에 따라 상속 시 일부 합산될 수 있으므로, 복합 상황에서는 세무사 상담이 필수입니다.',
  },
];

export default function InheritanceVsGiftTaxComparison2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속세 vs 증여세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속세 vs 증여세 2026 — 어느 쪽이 유리한가?',
    description:
      '공제 차이·세율·시점·사전증여 합산까지 명확하게 비교. 재산 상황별 절세 의사결정 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속세', '증여세', '비교', '절세', '공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속세 vs 증여세 2026',
    description:
      '상속과 증여 어느 것이 절세에 유리할까? 공제·세율·시점 비교와 재산 상황별 전략.',
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
                    { name: '상속세 vs 증여세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자산가·은퇴 준비층 · 13분 읽기 · 2026-06-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속세 vs 증여세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 어느 쪽이 유리한가?</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자녀에게 재산을 넘길 때, "상속을 받을 때까지 기다릴까, 아니면 미리 증여할까?" 이 질문에는 정답이 없습니다. 상속세와 증여세는 같은 5단계 누진세율을 쓰지만, 공제 방식·금액·시점이 완전히 다릅니다. 자산 규모, 가족 구성, 시간에 따라 유리한 쪽이 달라집니다. 이 가이드에서는 두 세금의 차이를 명확하게 비교하고, 상황별 절세 전략을 제시합니다.
                </p>
              </header>

              <AdSlot slot="guide-inheritance-vs-gift-tax-comparison-top" format="horizontal" />

              <section className="space-y-6">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">상속세와 증여세의 핵심 차이 한눈에</h2>
                <p data-speakable>
                  상속세와 증여세는 세율은 같지만(상증세법 §26), 적용되는 공제가 전혀 다릅니다. 이것이 절세 효과를 크게 좌우합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-sm text-text-secondary mb-3 text-left">상속세 vs 증여세 비교표</caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-card">
                        <th scope="col" className="text-left p-3 font-semibold">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold">상속세</th>
                        <th scope="col" className="text-left p-3 font-semibold">증여세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">과세 시점</td>
                        <td className="p-3">피상속인 사망 시 한 번</td>
                        <td className="p-3">증여 시마다 (분산 가능)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">세율</td>
                        <td className="p-3">5단계 누진 (10~50%)</td>
                        <td className="p-3">5단계 누진 (10~50%)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">공제 규모</td>
                        <td className="p-3"><strong>일괄공제 5억 + 배우자공제 최소 5억</strong></td>
                        <td className="p-3">10년마다 기본공제만(배우자 6억, 자녀 5천만 등)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">배우자 공제</td>
                        <td className="p-3">최소 5억~최대 30억 (한 번)</td>
                        <td className="p-3">10년마다 6억 (갱신 가능)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">자녀 공제</td>
                        <td className="p-3">1인당 5,000만 (미성년 연 1,000만)</td>
                        <td className="p-3">1인당 5,000만 (10년마다 갱신)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">신고 기한</td>
                        <td className="p-3">상속개시월 말일부터 6개월</td>
                        <td className="p-3">증여월 말일부터 3개월</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">분산 효과</td>
                        <td className="p-3">불가능 (한 번 과세)</td>
                        <td className="p-3">가능 (수증자·시간 분산으로 저세율 구간 활용)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="text-sm text-text-primary font-semibold mb-2">핵심 포인트</p>
                  <p className="text-sm text-text-secondary">
                    상속세는 공제가 크기 때문에 중소 자산(10~15억)에서는 세금이 거의 나지 않을 수 있습니다. 반면 증여는 공제가 작지만, 10년 단위로 갱신되고 분산할 수 있어 장기간 큰 자산을 이전할 때 유리합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">상속이 유리한 경우</h2>
                <p data-speakable>
                  다음 조건에 해당하면 대부분 상속이 증여보다 세금이 적습니다.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">조건 1: 배우자가 생존해 있는 경우</h3>
                    <p className="text-sm text-text-secondary">
                      배우자공제(최소 5억~최대 30억)가 상속에만 적용되며, 이것이 매우 큽니다. 배우자가 있는 한 상속이 압도적으로 유리합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">조건 2: 자산이 중소 규모(10~30억)인 경우</h3>
                    <p className="text-sm text-text-secondary">
                      일괄공제 5억 + 배우자공제 5억 + 자녀공제로 대부분 과세표준이 0에 가까워집니다. 예: 자산 15억, 배우자+자녀 → 공제 10~15억 → 과세표준 0~5억 → 세금 0~700만원대.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">조건 3: 즉시 자산을 이전할 필요가 없는 경우</h3>
                    <p className="text-sm text-text-secondary">
                      상속은 사망 시점에 한 번만 과세되므로, 자산 운용을 오래 할 수 있는 경우 중복 증여로 인한 세금을 피할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">구체적 예시: 상속이 유리한 경우</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">자산: 12억원</span>
                    <span className="block">가족: 배우자(생존) + 성년 자녀 2명</span>
                    <span className="block font-semibold">상속 시:</span>
                    <span className="block ml-4">과세표준 = 12억 − (일괄공제 5억 + 배우자공제 5억) = 2억</span>
                    <span className="block ml-4">세액 = 2억 × 10% = 2,000만원</span>
                    <span className="block font-semibold">생전 일시 증여 시 (배우자에게 6억, 장남에게 6억):</span>
                    <span className="block ml-4">배우자 수령: 6억 − 6억(공제) = 과세표준 0 → 세금 0</span>
                    <span className="block ml-4">장남 수령: 6억 − 5,000만(공제) = 5.5억 → 5.5억 × 20% − 1,000만 = 1억원</span>
                    <span className="block ml-4 font-semibold">총 증여세: 1억원</span>
                    <span className="block mt-2 font-semibold">결론: 상속 2,000만 &lt; 증여 1억 → 상속이 5배 유리</span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>다만:</strong> 배우자가 없으면 배우자공제를 받지 못하므로 상황이 완전히 달라집니다. 아래 "증여가 유리한 경우"를 참조하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">증여가 유리한 경우</h2>
                <p data-speakable>
                  다음 조건에서는 생전 증여가 상속보다 절세 효과가 더 클 수 있습니다.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">조건 1: 배우자가 없는 경우</h3>
                    <p className="text-sm text-text-secondary">
                      배우자공제를 받을 수 없으므로, 상속세 부담이 큽니다. 이 경우 자녀에게 미리 분산 증여하여 각 수증자가 낮은 세율 구간에 머물게 하면 유리합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">조건 2: 자산이 매우 큰 경우(30억 이상)</h3>
                    <p className="text-sm text-text-secondary">
                      배우자와 자녀에게 장시간에 걸쳐 분산 증여하면, 각각이 낮은 세율 구간(10~20%)에 머물게 되어, 한 번에 고세율(40~50%)을 받는 상속보다 훨씬 저렴합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">조건 3: 수증자가 많거나 시간이 충분한 경우</h3>
                    <p className="text-sm text-text-secondary">
                      자녀, 손자, 딸에게 여러 번, 여러 해에 걸쳐 증여하면, 10년마다 공제가 초기화되어 총 이전 가능한 공제 액수가 늘어납니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">구체적 예시: 증여가 유리한 경우</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">자산: 20억원</span>
                    <span className="block">가족: 배우자 없음, 성년 자녀 2명</span>
                    <span className="block font-semibold">상속 시 (배우자 없음):</span>
                    <span className="block ml-4">과세표준 = 20억 − 일괄공제 5억 = 15억</span>
                    <span className="block ml-4">세액 = 15억 × 30% − 6,000만 = 4억 5,000만 − 6,000만 = 3억 9,000만원</span>
                    <span className="block font-semibold">생전 분산 증여 (각 자녀에게 10억씩, 2년에 걸쳐):</span>
                    <span className="block ml-4">연도 1 (자녀 A에게 10억): 과세표준 = 10억 − 5,000만 = 9.5억</span>
                    <span className="block ml-4">세액 = 9.5억 × 30% − 6,000만 = 2.85억 − 6,000만 = 2.25억</span>
                    <span className="block ml-4">연도 1 (자녀 B에게 10억): 과세표준 = 10억 − 5,000만 = 9.5억</span>
                    <span className="block ml-4">세액 = 2.25억 (동일)</span>
                    <span className="block ml-4">총 증여세: 2.25억 + 2.25억 = 4.5억</span>
                    <span className="block mt-2 font-semibold">결론: 상속 3.9억 &lt; 증여 4.5억 → 상속이 약간 유리</span>
                    <span className="block mt-2 text-xs text-text-tertiary">하지만 10년에 걸쳐 더 나누거나 손자에게도 증여하면 증여가 역전될 수 있습니다.</span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>주의:</strong> 사전증여 합산(상속개시 10년 전 증여) 규정에 의해 상속 시 일부 증여분이 다시 합산되므로, 장기간 증여 전략을 세울 때는 반드시 세무사와 상담하세요.
                </p>
              </section>

              <AdSlot slot="guide-inheritance-vs-gift-tax-comparison-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">사전증여 합산 — 꼭 알아야 할 규칙</h2>
                <p data-speakable>
                  증여로 절세하려는 사람이 가장 놓치기 쉬운 부분입니다. 상속이 발생하면 일정 기간 전의 증여가 다시 합산되어 과세됩니다.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">상속인(자녀)에게 한 증여</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>상속개시 전 10년 이내</strong>에 한 증여는 상속재산에 합산되어 다시 과세됩니다. 예: 2025년 증여 후 2028년 상속 발생 → 2025년 증여분이 합산과세.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">상속인이 아닌 자(손자, 타인)에게 한 증여</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>상속개시 전 5년 이내</strong>에 한 증여만 합산됩니다. 상속인에게 한 것보다 합산 기간이 짧습니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">사전증여 합산 예시</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">2025년: 자녀에게 3억 증여 (증여세 약 5,000만 납부)</span>
                    <span className="block">2028년: 피상속인 사망, 남은 자산 5억</span>
                    <span className="block font-semibold">상속세 계산 시:</span>
                    <span className="block ml-4">상속재산 5억 + 사전증여 3억(합산) = 8억</span>
                    <span className="block ml-4">공제 후 과세표준 2~3억 → 상속세 발생</span>
                    <span className="block font-semibold">총 세금: 증여세 5,000만 + 상속세 약 3,000~4,000만 = 약 8,000~9,000만원</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>결론:</strong> "상속 10년 전에 미리 증여하면 세금을 안 낸다"는 속설은 틀렸습니다. 상속인에게 한 증여는 상속 발생 시 다시 합산되어 과세됩니다. 다만 그 사이에 증여세로 이미 낸 세금이 있으면 이를 공제받을 수 있습니다.
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>주의: 더 자세히:</strong> 사전증여 합산, 세액 공제 방식 등 복잡한 규정에 대해서는 별도 가이드를 참조하거나 세무사와 상담하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">상황별 절세 전략 정리</h2>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">시나리오 1: 배우자 생존, 자산 10~15억</h3>
                    <p className="text-sm text-text-secondary mb-3 font-semibold">추천: 상속 선택</p>
                    <p className="text-sm text-text-secondary">
                      배우자공제와 일괄공제로 대부분의 상속재산이 공제되어 상속세가 거의 나오지 않을 가능성이 높습니다. 굳이 증여로 세금을 내고 복잡하게 할 필요가 없습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">시나리오 2: 배우자 생존, 자산 30억 이상</h3>
                    <p className="text-sm text-text-secondary mb-3 font-semibold">추천: 혼합 전략 + 세무사 상담</p>
                    <p className="text-sm text-text-secondary">
                      배우자에게 증여공제 6억씩 10년마다 나눠주고, 남은 자산을 상속받는 방식으로 다층 구조를 만들면 절세 효과가 있습니다. 반드시 전문가와 함께 세운 계획이어야 합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">시나리오 3: 배우자 없음, 자산 5~10억</h3>
                    <p className="text-sm text-text-secondary mb-3 font-semibold">추천: 자녀 수와 시간에 따라 재판단</p>
                    <p className="text-sm text-text-secondary">
                      배우자공제 없이 상속하면 세율이 올라갑니다. 시간이 충분하면 자녀들에게 분산 증여하는 것이 낫습니다. 예: 자녀 2명, 각각 5,000만씩 매년 증여 → 공제 내에서 절세 가능.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">시나리오 4: 배우자 없음, 자산 50억 이상</h3>
                    <p className="text-sm text-text-secondary mb-3 font-semibold">추천: 장기 증여 계획 수립 필수</p>
                    <p className="text-sm text-text-secondary">
                      한 번에 상속하면 50% 세율이 적용되어 엄청난 세금이 나옵니다. 배우자, 자녀, 손자, 친인척 등 모두에게 장기간에 걸쳐 분산 증여하되, 사전증여 합산 규정을 고려하여 세무사와 함께 전략을 세웁니다.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>최종 조언:</strong> 상속과 증여의 선택은 자산 규모, 가족 구성, 나이 등 여러 요소에 따라 달라집니다. "상속이 무조건 좋다", "증여가 절세다"는 원칙은 없습니다. 정확한 세무 상담 후 결정하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">증여·상속 체크리스트</h2>
                <p data-speakable>
                  의사결정 전 다음을 확인하세요.
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex gap-3">
                    <span className="text-primary-500 font-bold">□</span>
                    <span className="text-sm text-text-secondary">배우자가 생존해 있는가? (배우자공제 5~30억 있음)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-500 font-bold">□</span>
                    <span className="text-sm text-text-secondary">자산 총액이 정확히 얼마인가? (30억 이상이면 분산 증여 검토)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-500 font-bold">□</span>
                    <span className="text-sm text-text-secondary">수증자가 누구인가? (직계비속, 손자, 타인에 따라 공제 다름)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-500 font-bold">□</span>
                    <span className="text-sm text-text-secondary">즉시 재산을 이전해야 하는가? (시간이 있으면 분산 증여 가능)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-500 font-bold">□</span>
                    <span className="text-sm text-text-secondary">과거 증여 이력이 있는가? (10년 합산 규정 확인 필요)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-500 font-bold">□</span>
                    <span className="text-sm text-text-secondary">세무사와 상담했는가? (복합 상황에서는 필수)</span>
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6 border-t border-border-base pt-8 border-l-2 border-primary-500 pl-3">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 & 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산·공제·세율을 직접 입력하고 최종 납부세액 계산</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">수증자별 증여공제 적용해서 증여세 시뮬레이션</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산부터 공제·세율·납부세액까지 5단계 완벽 해설</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">증여공제 종류와 세율 계산 방법</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-10-year-prior-gift-aggregation"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속 10년 전 증여 합산</div>
                    <p className="mt-1 text-sm text-text-secondary">사전증여 합산 규정 상세 설명과 세액 공제</p>
                  </Link>
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금 가이드 전체</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 취득세, 종부세 등 다른 세금도 확인</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 상속 및 증여는 복합적인 가족 상황, 자산 규모, 법적 환경에 따라 크게 달라집니다. 반드시 세무사·회계사와 상담 후 결정하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었습니다.
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>법적 근거:</strong> 상속세 및 증여세법 §26(세율)·§18(기초공제)·§19(배우자공제)·§20(자녀·미성년자공제)·§21(일괄공제)·§68(신고세액공제). 사전증여 합산 규정의 상세는 관련 가이드를 참조하세요.
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>업데이트:</strong> 2026-06-22 작성. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="상속세 vs 증여세 2026"
                url={URL}
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
