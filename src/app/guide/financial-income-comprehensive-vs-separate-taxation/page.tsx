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

const URL = 'https://calculatorhost.com/guide/financial-income-comprehensive-vs-separate-taxation/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '금융소득 종합과세 vs 분리과세 2026 | 2000만원 기준 5월 신고',
  description:
    '금융소득 2000만원 기준·종합과세 vs 분리과세 비교·세금 계산·배당세액공제 Gross-up·5월 31일 신고·함정 5가지·사례 시뮬.',
  keywords: [
    '금융소득',
    '종합과세',
    '분리과세',
    '2000만원 기준',
    '배당소득',
    '이자소득',
    '금융소득세',
    '배당세액공제',
    '5월 신고',
    '종합소득세 신고',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '금융소득 종합과세 vs 분리과세 2026 | 2000만원 기준',
    description: '금융소득 2000만원 기준·종합 vs 분리 비교 과세·세금 계산·배당세액공제·함정 5가지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '금융소득 종합과세 vs 분리과세 2026',
    description: '금융소득 3000만원 + 근로 1억 → 종합과세 1.5억 vs 분리과세 1.3억. 2000만 기준 비교 과세.',
  },
};

const FAQ_ITEMS = [
  {
    question: '금융소득 2000만원 기준이 무엇인가요?',
    answer:
      '연간 이자소득과 배당소득의 합계가 2000만원을 기준으로 과세 방식이 나뉜다는 의미입니다(소득세법 §14 ⑦). 2000만원 이하면 자동으로 분리과세(14% + 지방소득세 1.4% = 15.4%)되고, 2000만원을 초과하면 종합과세와 분리과세 중 더 큰 금액으로 과세됩니다. 이 기준은 2013년부터 변동되지 않았으나 정부가 인상을 검토 중입니다.',
  },
  {
    question: '배당세액공제(Gross-up)가 뭐예요?',
    answer:
      '배당소득에는 "이미 회사에서 법인세를 낸 후 배당했다"는 이중과세를 방지하기 위해 세액공제가 적용됩니다(소득세법 §56). 배당소득을 종합과세할 때만 적용되는데, 배당금의 11%를 더해서 과세표준을 높였다가(Gross-up) 다시 11%의 세액공제를 합니다. 결과적으로 배당소득이 더 유리하게 과세될 수 있습니다.',
  },
  {
    question: '금융소득 1500만원일 때와 2500만원일 때 세금이 얼마나 다른가요?',
    answer:
      '1500만원은 2000만원 이하이므로 자동 분리과세: 세금 약 231만원(1500만 × 15.4%). 2500만원은 초과분 500만원 때문에 종합과세 의무가 발생합니다. 다른 소득이 없다면 (2500만 × 15.4%) 약 385만원이지만, 배당세액공제가 적용되면 더 복잡해집니다. 다른 근로소득이 있다면 종합과세 시 누진세율이 적용되어 세금 부담이 크게 증가할 수 있습니다.',
  },
  {
    question: '종합과세를 피하고 분리과세만 하는 방법이 있나요?',
    answer:
      '금융소득이 2000만원을 초과하면 종합과세 의무는 피할 수 없습니다(소득세법 §14 ⑦). 분리과세만 하면 무신고 가산세를 받습니다. 다만 배당세액공제를 활용하면 종합과세 시 오히려 세금이 더 나을 수 있으므로, 꼭 "피한다"는 관점보다 "더 유리한 방식을 선택한다"는 관점이 맞습니다.',
  },
  {
    question: '5월 31일까지 신고하지 않으면 어떻게 되나요?',
    answer:
      '종합소득세 신고 기한은 매년 5월 31일입니다(소득세법 §70). 기한을 넘기면 무신고 가산세 10%와 함께 추가 자진신고 가산세까지 부과됩니다. 금융소득이 2000만원을 초과했는데 신고하지 않으면 국세청이 통장 기록으로 추적하여 세무조사 대상이 될 수 있습니다. 미리 홈택스에서 확정신고를 완료하시기 바랍니다.',
  },
];

export default function FinancialIncomeComprehensiveVsSeparateTaxationGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '금융소득 종합과세 vs 분리과세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '금융소득 종합과세 vs 분리과세 2026 — 2000만원 기준 완벽 정리',
    description:
      '금융소득 2000만원 기준·종합과세 vs 분리과세 비교 과세·세금 계산·배당세액공제·5월 신고 절차·함정 5가지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['금융소득', '종합과세', '분리과세', '2000만원', '배당세액공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '금융소득 종합과세 vs 분리과세 2026',
    description: '금융소득 2000만원 기준·종합 vs 분리 과세 선택·세금 시뮬·신고 방법.',
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
                    { name: '금융소득 종합과세 vs 분리과세 2026' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  금융소득 종합과세 vs 분리과세 2026 — 2000만원 기준
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  은행 이자, 주식 배당금, ETF 수익 등 금융소득의 세금이 언제 종합과세되고 언제 분리과세되는지 정확히 알아야
                  5월 신고에서 손해를 보지 않습니다. <strong>연간 이자+배당소득이 2000만원</strong>을 넘으면 규칙이 완전히
                  달라집니다(소득세법 §14 ⑦). 이 기준선을 넘나드는 투자자라면 반드시 읽어야 할 가이드입니다.
                </p>
              </header>

              <AdSlot slot="guide-financial-top" format="horizontal" />

              {/* 1. 핵심 정의 */}
              <section aria-label="금융소득 정의" className="card">
                <h2 className="mb-4 text-2xl font-semibold">금융소득이란?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  금융소득은 <strong>이자소득</strong>과 <strong>배당소득</strong>의 합계를 의미합니다(소득세법 §14 ⑦). 은행
                  통장 이자, 적금·예금 이자, 주식배당금, ETF 수익배분, 펀드 수익분배 등이 모두 포함됩니다. 주식 매매차익(양도소득)은
                  금융소득에 포함되지 않으므로 혼동하지 않아야 합니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">금융소득 범위</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>이자소득: 은행 이자, 적금 이자, 예금 이자, 채권 이자</li>
                    <li>배당소득: 주식배당금, ETF 수익배분, 펀드 수익분배</li>
                    <li>포함 안 됨: 주식 매매차익, 부동산 임대료</li>
                  </ul>
                </div>
              </section>

              {/* 2. 2000만원 기준 설명 */}
              <section aria-label="2000만원 기준" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">2000만원 기준의 의미</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  연간 <strong>이자소득 + 배당소득의 합계</strong>가 2000만원을 기준으로 세금 계산 방식이 완전히 바뀝니다. 이것은
                  2013년부터 유지되어 온 기준이며, 현재까지 변동되지 않았습니다(소득세법 §14 ⑦).
                </p>

                <div className="mb-6 rounded-lg bg-primary-500/10 p-4">
                  <p className="mb-3 font-semibold text-text-primary">2000만원 이하 (분리과세 자동)</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">
                      이자소득 + 배당소득이 <strong>2000만원 이하</strong>면 자동으로 분리과세 대상입니다.
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>세율: 14% + 지방소득세 1.4% = 총 15.4% (고정)</li>
                      <li>계산이 단순함</li>
                      <li>다른 소득과 합산되지 않음</li>
                      <li>신고 의무: 원천징수로 자동 완료 (별도 신고 불필요)</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-danger-500/10 p-4">
                  <p className="mb-3 font-semibold text-text-primary">2000만원 초과 (종합과세 의무)</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">
                      이자소득 + 배당소득이 <strong>2000만원을 초과</strong>하면 반드시 종합과세 신고해야 합니다.
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>초과분만 다른 소득(근로소득 등)과 합산</li>
                      <li>누진세율 6~45% 적용 (소득세법 §55)</li>
                      <li>배당세액공제 가능 (배당소득만)</li>
                      <li>신고 의무: 5월 31일까지 확정신고 필수</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. 종합 vs 분리 과세 메커니즘 */}
              <section aria-label="과세 메커니즘" className="card">
                <h2 className="mb-4 text-2xl font-semibold">종합과세 vs 분리과세 비교</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  2000만원을 초과하면 "더 높은 세금"을 내야 하는 것이 아니라, <strong>두 가지 방식을 모두 계산한 후 큰 금액을
                  선택</strong>합니다. 때로는 종합과세가 유리할 수 있습니다.
                </p>

                <div className="overflow-x-auto mb-6" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">종합과세 vs 분리과세 비교표</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">구분</th>
                        <th className="py-2 pr-4 font-semibold">분리과세</th>
                        <th className="py-2 font-semibold">종합과세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">적용 대상</td>
                        <td className="py-2 pr-4">2000만원 이하</td>
                        <td className="py-2">2000만원 초과</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">세율</td>
                        <td className="py-2 pr-4">14% + 지방세 1.4% = 15.4% (고정)</td>
                        <td className="py-2">6~45% (누진) + 배당세액공제(배당만)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">합산 대상</td>
                        <td className="py-2 pr-4">독립 계산 (근로소득과 분리)</td>
                        <td className="py-2">다른 종합소득(근로·사업)과 합산</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">배당세액공제</td>
                        <td className="py-2 pr-4">미적용</td>
                        <td className="py-2">적용 가능 (Gross-up)</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">신고 의무</td>
                        <td className="py-2 pr-4">없음 (원천징수 완료)</td>
                        <td className="py-2">5월 31일 확정신고 필수</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">2000만원 초과 시 실제 과세 방식</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <p>
                      소득세법 §62에 따라 다음 둘 중 <strong>더 큰 금액으로 과세</strong>됩니다:
                    </p>
                    <ol className="list-inside list-decimal space-y-2 ml-2">
                      <li>
                        <strong>분리과세 방식</strong>: 2000만원에 15.4% 적용 + (초과분만 종합소득과 합산하여 누진세 적용)
                      </li>
                      <li>
                        <strong>종합과세 방식</strong>: 전체 금융소득 + 다른 종합소득(근로, 사업)을 모두 합산하여 누진세 적용 +
                        배당세액공제
                      </li>
                    </ol>
                    <p className="mt-3 text-xs text-text-tertiary">
                      예: 금융소득 3000만 + 근로소득 1억의 경우, 분리과세로 2.2억 세금이 나오고 종합과세로 1.8억이 나오면 1.8억을
                      내게 됩니다(배당세액공제 포함).
                    </p>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-financial-mid" format="rectangle" />

              {/* 4. 실제 시뮬레이션 사례 */}
              <section aria-label="시뮬레이션 사례" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실제 사례 — 3가지 시나리오</h2>

                {/* 사례 A */}
                <div className="mb-8 rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 A: 금융소득 1500만원만 있는 경우</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <p>
                      <strong>상황</strong>: 은행 이자 + 배당금 합계 1500만원, 근로소득 없음
                    </p>
                    <p>
                      <strong>분석</strong>: 2000만원 이하이므로 자동 분리과세
                    </p>
                    <p className="font-semibold text-primary-600">
                      세금 = 1500만 × 15.4% = <span className="text-lg">231만원</span>
                    </p>
                    <p className="text-xs text-text-tertiary">
                      신고 의무 없음. 원천징수로 자동 완료.
                    </p>
                  </div>
                </div>

                {/* 사례 B */}
                <div className="mb-8 rounded-lg bg-primary-500/10 p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 B: 금융소득 3,000만 + 근로 종합과세표준 1억 (비교 과세 의무)</p>
                  <div className="text-sm text-text-secondary space-y-3">
                    <p>
                      <strong>상황</strong>: 이자 + 배당 3,000만 + 다른 종합소득 과세표준 약 1억. 2,000만 초과분 1,000만은
                      반드시 종합과세 합산되며, 소득세법 §62 비교과세에 따라 두 방식 중 큰 금액을 적용.
                    </p>

                    <div className="ml-4 border-l-2 border-primary-500 pl-3">
                      <p className="mb-2">
                        <strong className="text-text-primary">방식 1: 분리과세 기준</strong>
                      </p>
                      <p className="text-xs text-text-tertiary">
                        2,000만 × 15.4% + (다른 종합소득 1억 + 초과분 1,000만 = 1.1억) × 누진세율 35% − 누진공제 1,544만 ≈
                        2,856만 + 308만 ≈ <strong>약 3,164만</strong>
                      </p>
                    </div>

                    <div className="ml-4 border-l-2 border-primary-600 pl-3">
                      <p className="mb-2">
                        <strong className="text-text-primary">방식 2: 전액 종합과세 (배당세액공제 포함)</strong>
                      </p>
                      <p className="text-xs text-text-tertiary">
                        전체 1.3억(근로 1억 + 금융 3,000만) Gross-up 후 누진세 35% − 누진공제 1,544만 ≈ 약 3,000만 + 배당분
                        Gross-up 가산세, 다시 배당세액공제 차감 → 배당 비중·소득 구조에 따라 분리과세 방식보다 낮을 수 있음.
                      </p>
                    </div>

                    <p className="mt-3 text-sm text-text-tertiary">
                      → 둘 중 큰 금액 적용. 배당 비중이 클수록 종합과세 방식이 유리해질 수 있으므로 홈택스 모의계산으로 양쪽
                      모두 산출 후 판단해야 합니다(누진공제·인적공제 등 미반영 단순화 예시).
                    </p>
                  </div>
                </div>

                {/* 사례 C */}
                <div className="mb-8 rounded-lg bg-danger-500/10 p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 C: 금융소득 2,500만 + 다른 종합소득 과세표준 3,000만</p>
                  <div className="text-sm text-text-secondary space-y-3">
                    <p>
                      <strong>상황</strong>: 이자 + 배당 2,500만 + 근로(종합과세표준) 3,000만. 초과분 500만이 누진 합산되며
                      비교과세 적용.
                    </p>

                    <div className="ml-4 border-l-2 border-danger-500 pl-3">
                      <p className="mb-2">
                        <strong className="text-text-primary">방식 1: 분리과세 기준 단순화</strong>
                      </p>
                      <p className="text-xs text-text-tertiary">
                        2,000만 × 15.4% = 308만 + (3,000만 + 500만 = 3,500만) × 15% − 누진공제 126만 ≈ 399만 + 308만 ≈
                        <strong> 약 707만</strong>
                      </p>
                    </div>

                    <div className="ml-4 border-l-2 border-danger-600 pl-3">
                      <p className="mb-2">
                        <strong className="text-text-primary">방식 2: 전액 종합과세 (배당세액공제 포함)</strong>
                      </p>
                      <p className="text-xs text-text-tertiary">
                        과세표준 5,500만 × 24% − 누진공제 576만 ≈ 744만. 배당분에 대해 11% Gross-up 가산 후 동일 비율 세액공제
                        차감. 배당 비중 따라 700만 전후로 수렴.
                      </p>
                    </div>

                    <p className="mt-3 text-sm text-text-tertiary">
                      → 두 방식이 700만 전후로 비슷하며 비교과세에 따라 큰 금액으로 과세. 인적공제·표준세액공제 적용 시 실제
                      결정세액은 더 낮음. 홈택스 모의계산 필수.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. 배당세액공제 (Gross-up) */}
              <section aria-label="배당세액공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">배당세액공제 (Gross-up) — 왜 배당소득이 유리한가</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  배당소득이 종합과세될 때만 적용되는 <strong>배당세액공제</strong>가 핵심입니다. 이것이 때로는 종합과세를 더
                  유리하게 만들어줍니다(소득세법 §56).
                </p>

                <div className="mb-6 rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">배당세액공제 메커니즘</p>
                  <div className="text-sm text-text-secondary space-y-3">
                    <p>
                      주식 배당금은 회사가 이미 법인세를 납부하고 남은 이익 중에서 배당합니다. 따라서 투자자가 다시 세금을 내면
                      이중 과세가 됩니다. 이를 방지하기 위해 배당소득에 한해 <strong>11% Gross-up</strong>과 <strong>11% 세액공제</strong>를
                      적용합니다(소득세법 §56).
                    </p>
                    <div className="ml-4 border-l-2 border-primary-500 pl-3">
                      <p className="font-semibold text-text-primary">계산 과정</p>
                      <ol className="list-inside list-decimal space-y-1 text-xs mt-2">
                        <li>배당금 1000만원 → Gross-up (1000만 × 111% = 1110만)</li>
                        <li>전체 종합소득과 합산하여 누진세 계산</li>
                        <li>산출세액에서 배당세액공제(1110만 × 11% ≈ 122만) 차감</li>
                        <li>결과: 배당금이 높은 누진세율을 피할 수 있음</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">이자소득과의 차이</p>
                  <ul className="list-inside list-disc space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>배당소득</strong>: 종합과세 시 Gross-up + 세액공제 적용 → 유리
                    </li>
                    <li>
                      <strong>이자소득</strong>: 특별한 공제 없음 → 누진세율 적용
                    </li>
                    <li>
                      따라서 배당금이 많을수록 종합과세가 유리할 가능성 높음
                    </li>
                  </ul>
                </div>
              </section>

              {/* 6. 5월 31일 신고 절차 */}
              <section aria-label="신고 절차" className="card">
                <h2 className="mb-4 text-2xl font-semibold">5월 신고 절차 — 언제 어디서 신고하나</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  금융소득이 2000만원을 초과하면 <strong>5월 31일까지</strong> 종합소득세를 확정신고해야 합니다(소득세법 §70).
                </p>

                <ol className="list-inside list-decimal space-y-4 text-sm text-text-secondary">
                  <li>
                    <strong>신고 대상 확인</strong>
                    <ul className="list-inside list-disc ml-4 mt-1 space-y-1">
                      <li>이자소득 + 배당소득 합계가 2000만원 초과?</li>
                      <li>다른 종합소득(근로, 사업)이 있나?</li>
                      <li>원천징수되지 않은 소득이 있나?</li>
                    </ul>
                  </li>
                  <li>
                    <strong>
                      <a
                        href="https://www.hometax.go.kr"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        홈택스
                      </a>
                      에서 확정신고
                    </strong>
                    <ul className="list-inside list-disc ml-4 mt-1 space-y-1">
                      <li>종합소득세 신고 → 이자·배당 소득 입력</li>
                      <li>근로소득도 있으면 함께 입력</li>
                      <li>배당세액공제 여부 확인</li>
                      <li>분리과세 vs 종합과세 계산 비교</li>
                    </ul>
                  </li>
                  <li>
                    <strong>납부 또는 환급</strong>
                    <ul className="list-inside list-disc ml-4 mt-1 space-y-1">
                      <li>계산된 세금이 원천징수액보다 많으면 추가 납부</li>
                      <li>적으면 환급 신청</li>
                      <li>신고서 제출과 동시에 자동 반영</li>
                    </ul>
                  </li>
                </ol>

                <p className="mt-4 text-sm text-text-tertiary">
                  <strong>주의</strong>: 신고 기한을 넘기면 무신고 가산세 10% + 가산세가 부과되니 반드시 5월 31일 전에 신고하세요.
                </p>
              </section>

              {/* 7. 함정 5가지 */}
              <section aria-label="함정 5가지" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 금융소득 종합과세 함정 5가지</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 1: "분리과세만 하면 되겠지" 무신고</strong>
                    </p>
                    <p className="text-sm">
                      금융소득이 2000만원을 초과해도 신고하지 않으면 "원래는 분리과세 대상이 아니었다"고 주장할 수 없습니다.
                      국세청이 통장 기록으로 추적하여 무신고 가산세 10%를 부과합니다(국세기본법 §47의2).
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 2: 이자소득과 배당소득을 따로 센다</strong>
                    </p>
                    <p className="text-sm">
                      2000만원 기준은 "이자 2000만 + 배당 2000만 = 4000만"이 아니라 "이자 + 배당 합계 2000만"입니다. 구분해서
                      생각하면 신고 실수가 생깁니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 3: 배당세액공제를 받지 않는다</strong>
                    </p>
                    <p className="text-sm">
                      배당소득이 많은 투자자라면 종합과세 시 배당세액공제(Gross-up 11%)를 반드시 신청해야 합니다. 신청하지 않으면
                      누린할 수 있는 절세 효과를 놓칩니다. 홈택스에서 "배당세액공제" 체크박스를 확인하세요.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 4: 원천징수액과 신고액이 다른 이유를 몰라서 혼동</strong>
                    </p>
                    <p className="text-sm">
                      은행이나 증권사에서 이미 14%를 원천징수했어도, 신고할 때 추가 납부나 환금이 발생할 수 있습니다. 종합과세로
                      누진세가 적용되거나 배당세액공제가 적용되면 원천징수액과 달라집니다. 이것은 정상이며, 신고서대로 따라가면 됩니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 5: 2000만원 바로 아래에서 소액 추가 회피</strong>
                    </p>
                    <p className="text-sm">
                      "배당금을 2000만원 이하로 조정하면 신고 안 해도 되겠지"라고 생각하면 곤란합니다. 이미 발생한 소득을 숨길 수
                      없으며, 은행과 증권사 기록으로 국세청이 추적합니다. 반드시 정확한 소득액으로 신고해야 합니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. 절세 팁 */}
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-4 text-2xl font-semibold">절세 팁 5가지</h2>
                <div className="space-y-4 text-sm text-text-secondary">
                  <div className="rounded-lg bg-bg-card p-3">
                    <p className="mb-1">
                      <strong className="text-text-primary">팁 1: 배당금과 이자금을 분리 고려</strong>
                    </p>
                    <p>
                      배당세액공제는 배당소득에만 적용되므로, 금융소득이 2000만원 근처라면 배당금을 우선 확보하고 이자는 분리과세
                      한도 안에서 운용하는 것이 유리할 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-3">
                    <p className="mb-1">
                      <strong className="text-text-primary">팁 2: 다른 종합소득이 있으면 반드시 비교 과세</strong>
                    </p>
                    <p>
                      근로소득이나 사업소득이 있다면, 분리과세 vs 종합과세를 반드시 둘 다 계산한 후 낮은 쪽을 선택하세요. 배당세액공제가
                      생각보다 크게 효과를 보일 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-3">
                    <p className="mb-1">
                      <strong className="text-text-primary">팁 3: 손실 납세자는 손실 신고</strong>
                    </p>
                    <p>
                      배당금을 받았지만 주식 매매손실이 있다면, 종합소득세 신고 시 손실을 함께 신고하여 소득을 낮춰야 합니다. 단순히
                      배당금만 보고하면 손실을 활용할 수 없습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-3">
                    <p className="mb-1">
                      <strong className="text-text-primary">팁 4: 세무사 상담 — 2000만원 근처라면 필수</strong>
                    </p>
                    <p>
                      금융소득이 2000만원에 근접하거나 배당금과 이자금이 혼합되어 있다면, 개인 계산보다 세무사 상담이 저렴할 수
                      있습니다. 절세 효과가 크기 때문입니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-3">
                    <p className="mb-1">
                      <strong className="text-text-primary">팁 5: 배우자와의 소득 분산</strong>
                    </p>
                    <p>
                      부부가 각각 은행 계좌를 운용한다면, 한쪽이 2000만원을 초과하지 않도록 분산하면 둘 다 분리과세(15.4%)의
                      이점을 누릴 수 있습니다. 다만 세법상 명확한 근거가 필요합니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 10. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    → <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">연봉 실수령액 계산기</Link> — 근로소득세와 4대보험 자동 계산
                  </li>
                  <li>
                    → <Link href="/calculator/savings/" className="text-primary-600 underline dark:text-primary-500">적금 이자 계산기</Link> — 이자소득 세후 계산
                  </li>
                  <li>
                    → <Link href="/calculator/deposit/" className="text-primary-600 underline dark:text-primary-500">정기예금 이자 계산기</Link> — 예금 이자와 세금
                  </li>
                  <li>
                    → <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">5월 종합소득세 신고 완벽 정리</Link> — 전체 절차 및 기한
                  </li>
                  <li>
                    → <Link href="/guide/february-tax-refund-tracking/" className="text-primary-600 underline dark:text-primary-500">2월 환급금 조회 방법</Link> — 신고 후 환급 받기
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="금융소득 종합과세 vs 분리과세 2026 — 2000만원 기준"
                url={URL}
                description="금융소득 2000만원 기준·종합 vs 분리 과세·세금 계산·배당세액공제·함정 5가지."
              />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §14 ⑦ (금융소득의 종합소득 합산 기준) · §16 (이자소득) · §17 (배당소득)
                  · §55 (종합소득세율) · §56 (배당세액공제) · §62 (비교과세) · §70 ① (종합소득세 확정신고 — 5월 31일) ·
                  지방세법 §103의2 (지방소득세 10% 부가) · 국세기본법 §47의2 (무신고 가산세). 참고:{' '}
                  <a
                    href="https://www.law.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    법령정보센터
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
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 금융소득 2000만원 기준은
                  2026년 현재 기준이며 정부 정책 변경에 따라 달라질 수 있습니다. 배당세액공제, 비교과세 계산은 개별 상황에 따라
                  복잡할 수 있으므로 반드시 홈택스 또는 세무사 상담을 통해 확정하시기 바랍니다. 신고 기한을 넘기면 가산세가
                  부과되므로 주의하시기 바랍니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost). 본 가이드는 AI 보조 작성 후 운영자
                  검수 발행되었습니다.
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
