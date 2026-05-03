import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { SeveranceCalculator } from './SeveranceCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/severance';

export const metadata: Metadata = {
  title: '퇴직금 계산기 2026 | 평균임금·퇴직소득세·세후 | calculatorhost',
  description:
    '2026년 최신 퇴직소득세 반영 퇴직금 계산기. 입사·퇴사 날짜와 월 임금으로 법정 퇴직금, 근속연수공제, 환산급여공제, 퇴직소득세, 세후 실수령액 자동 계산. DB·DC형 비교. 회원가입 불필요, 완전 무료.',
  alternates: { canonical: URL },
  openGraph: {
    title: '퇴직금 계산기 2026',
    description: '퇴직 전 세후 실수령액을 정확히 계산',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '퇴직금 계산기 2026',
    description: '법정 퇴직금 + 퇴직소득세 즉시 계산',
  },
};

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: '퇴직금 지급 조건은 무엇인가요?',
    answer:
      '근로기준법에 따라 1년 이상 근무한 근로자에게만 퇴직금 지급 의무가 있습니다. 1년 미만 근무 후 퇴직하면 퇴직금을 받지 못하지만, 미지급 급여는 청구할 수 있습니다. 대신 이직, 정년, 계약 만료, 해고 등 모든 퇴직 사유가 대상입니다.',
  },
  {
    question: '평균임금과 통상임금은 어떻게 다른가요?',
    answer:
      '평균임금은 퇴직 이전 3개월의 임금(상여금·연차수당 포함) 총액을 일수로 나눈 것으로, 퇴직금 계산에 쓰입니다. 통상임금은 소정근로시간에 대해 지급하는 기본급·직책급·고정수당으로, 기본급을 산정할 때 쓰입니다. 상여금·연차는 통상임금에 포함되지 않으나, 평균임금 계산 시에는 포함됩니다.',
  },
  {
    question: 'DB형과 DC형은 무엇인가요?',
    answer:
      'DB형(Defined Benefit, 확정급여)은 사업주가 법정 퇴직금 수준을 보장하는 형태이고, DC형(Defined Contribution, 확정기여)은 사업주가 매월 급여의 8.3% 이상을 기금에 적립하되, 실제 수령액은 운용 수익에 따라 달라집니다. DC형은 적립금 + 운용수익이 적용되므로, 본 계산기의 법정 기준 금액과 다를 수 있습니다.',
  },
  {
    question: '상여금과 연차수당은 퇴직금에 포함되나요?',
    answer:
      '평균임금 계산 시 직전 3개월 상여금의 1/4(월할액), 연차수당의 1/12(월할액)이 포함됩니다. 예를 들어 연간 상여금 1200만 원이면 월 100만 원으로 환산되어 3개월분 300만 원이 평균임금 계산에 더해집니다.',
  },
  {
    question: '퇴직소득세는 어떻게 계산되나요?',
    answer:
      '퇴직소득세는 근속연수공제(근로기준법)를 한 후, 환산급여(월급 환산), 환산급여공제(누진공제)를 거쳐 과세표준을 산정하고, 종합소득세 세율표를 적용해 계산합니다. 계산 과정이 복잡하므로, 본 계산기가 이를 자동으로 처리합니다. 자세한 공식은 "계산 공식" 섹션을 참고하세요.',
  },
  {
    question: '중간정산이나 퇴직연금 전환 시 세금은?',
    answer:
      '중간정산(예: 무주택 구입·의료비) 시에도 퇴직소득세가 적용되며, 퇴직연금 계약자 변경 등 일부 경우는 조건부 비과세가 적용될 수 있습니다. 개별 사항은 사업장의 퇴직연금 담당자 또는 세무사와 상담이 필요합니다.',
  },
];

const RELATED = [
  { href: '/calculator/salary', title: '연봉 실수령액', description: '월 세후 급여' },
  { href: '/calculator/loan-limit', title: '대출한도 (DSR)', description: '주택담보대출 한도' },
  { href: '/calculator/loan', title: '대출이자 계산기', description: '상환액·스케줄' },
];

export default function SeverancePage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '퇴직금 계산기',
    description: '입사·퇴사 날짜와 월 임금으로 법정 퇴직금, 퇴직소득세, 세후 실수령액을 계산',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '퇴직금 계산기 2026',
    description: '퇴직 전 세후 실수령액을 정확히 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: '퇴직금 계산기 사용 방법',
    description: '입사일, 퇴사일, 월 임금을 입력하여 법정 퇴직금과 세후 실수령액을 계산하는 단계별 가이드',
    steps: [
      { name: '입사·퇴사 날짜 입력', text: '회사 입사일과 퇴사(예정)일을 입력합니다.' },
      { name: '근속연수 자동 계산', text: '입력한 날짜로 근속연수가 자동 계산됩니다.' },
      { name: '월 임금 및 상여 입력', text: '기본급, 상여금, 연차수당을 입력하여 평균임금을 산출합니다.' },
      { name: '퇴직금·세금 자동 계산', text: '법정 퇴직금(근속 × 30일 임금), 퇴직소득세가 자동 계산됩니다.' },
      { name: '세후 실수령액 확인', text: '세전 퇴직금에서 퇴직소득세를 뺀 최종 수령액을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '근로', url: 'https://calculatorhost.com/category/work' },
    { name: '퇴직금' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              {/* H1 + 리드 */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '근로', href: '/category/work/' },
                    { name: '퇴직금' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  퇴직금 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  입사일, 퇴사일, 월 통상임금으로 법정 퇴직금과 퇴직소득세를 자동 계산합니다.
                  근속연수공제, 환산급여공제, 지방소득세까지 포함되며, 세후 실수령액을 즉시 확인할 수 있습니다.
                  DB형·DC형 선택 가능.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="퇴직금은 1년 이상 근무한 근로자가 퇴직할 때 사업주가 지급하는 금액으로, 근로기준법 §2에서 정의한 1일 평균임금에 30일을 곱한 후 재직일수를 반영하여 계산합니다(근로자퇴직급여 보장법 §8). 평균임금 = 퇴직 이전 3개월 임금총액 ÷ 일수이며, 상여금·연차수당도 포함됩니다."
                table={{
                  caption: '퇴직금 계산의 주요 구성요소',
                  headers: ['항목', '계산 방식'],
                  rows: [
                    ['1일 평균임금', '3개월 임금총액(상여·연차포함) ÷ 91-92일'],
                    ['법정 퇴직금', '평균임금 × 30 × 재직일수÷365'],
                    ['근속연수공제', '근속연수별 공제액 (5년이하 100만/년)'],
                    ['환산급여공제', '환산급여 구간별 누진공제'],
                    ['퇴직소득세', '(환산급여 − 공제액) × 세율 ÷ 12 × 근속년수'],
                  ],
                }}
                tldr={[
                  '퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)',
                  '1년 이상 근무가 지급 조건',
                  '퇴직소득세는 근속연수공제·환산급여공제로 대폭 인하',
                  'DC형은 적립금 + 운용수익이므로 법정 금액과 상이 가능',
                ]}
              />

              {/* AD-1 리더보드 (상단) */}
              <AdSlot slot="severance-top" format="horizontal" />

              {/* 계산기 폼 */}
              <SeveranceCalculator />

              {/* FAQ (중간 배치 — GEO 최적화) */}
              <FaqSection items={FAQ_ITEMS} />

              {/* 퇴직금이란? */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">퇴직금이란 무엇이고 언제 받을 수 있나요?</h2>
                <p className="text-text-secondary">
                  퇴직금은 근로자가 회사를 떠날 때 사업주가 지급하는 금액입니다. 근로기준법과 근로자퇴직급여 보장법에 따라 규정되며, 1년 이상 근무한 근로자에게 지급 의무가 있습니다.
                </p>
                <div className="bg-bg-card rounded-lg p-4 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">지급 대상:</span>
                    1년 이상 근무한 근로자 (정규직, 계약직, 기간제 등 모두 포함)
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">퇴직 사유:</span>
                    정년, 이직, 해고, 계약 만료 등 모든 사유
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">법적 근거:</span>
                    근로기준법 §2, 근로자퇴직급여 보장법 §8
                  </p>
                </div>
              </section>

              {/* 평균임금 vs 통상임금 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">평균임금 vs 통상임금</h2>
                <p className="text-text-secondary">
                  두 개념은 계산 목적이 다르므로, 햇갈리기 쉬워도 구분이 중요합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-bg-card border-b border-border-base">
                        <th className="px-4 py-3 text-left text-text-primary font-semibold">항목</th>
                        <th className="px-4 py-3 text-left text-text-primary font-semibold">평균임금</th>
                        <th className="px-4 py-3 text-left text-text-primary font-semibold">통상임금</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-base">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">정의</td>
                        <td className="px-4 py-3 text-text-secondary">퇴직 이전 3개월 임금 총액 ÷ 일수</td>
                        <td className="px-4 py-3 text-text-secondary">소정근로시간에 대해 지급하는 기본급·직책급·고정수당</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">포함 항목</td>
                        <td className="px-4 py-3 text-text-secondary">기본급 + 상여금(월할) + 연차(월할) + 기타수당</td>
                        <td className="px-4 py-3 text-text-secondary">기본급 + 직책급 + 고정수당 (상여금·연차 제외)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">쓰임</td>
                        <td className="px-4 py-3 text-text-secondary">퇴직금 계산, 해고예고수당 등</td>
                        <td className="px-4 py-3 text-text-secondary">초과근무수당, 4대보험 기준</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">예시</td>
                        <td className="px-4 py-3 text-text-secondary">월 300만 × 3 + 상여금월할 100만 + 연차월할 50만 = 1050만 ÷ 91일 = 약 115만/일</td>
                        <td className="px-4 py-3 text-text-secondary">월 기본급 250만 + 직책급 50만 = 300만 (상여금·연차 미포함)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* DB형 vs DC형 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">퇴직연금 제도: DB형 vs DC형</h2>
                <p className="text-text-secondary">
                  2005년 퇴직금 제도 개혁 이후, 회사는 DB형 또는 DC형 중 하나를 선택해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-bg-card border-b border-border-base">
                        <th className="px-4 py-3 text-left text-text-primary font-semibold">항목</th>
                        <th className="px-4 py-3 text-left text-text-primary font-semibold">DB형 (확정급여)</th>
                        <th className="px-4 py-3 text-left text-text-primary font-semibold">DC형 (확정기여)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-base">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">의미</td>
                        <td className="px-4 py-3 text-text-secondary">사업주가 법정 수준 보장</td>
                        <td className="px-4 py-3 text-text-secondary">사업주가 매월 8.3% 이상만 적립</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">근로자 위험</td>
                        <td className="px-4 py-3 text-text-secondary">낮음 (보장됨)</td>
                        <td className="px-4 py-3 text-text-secondary">높음 (운용수익에 따라 변동)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">예상 수령액</td>
                        <td className="px-4 py-3 text-text-secondary">본 계산기 결과와 동일 수준</td>
                        <td className="px-4 py-3 text-text-secondary">적립금(월 급여 8.3%) + 운용수익 (본 계산기와 다를 수 있음)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">이직 시</td>
                        <td className="px-4 py-3 text-text-secondary">일시금 수령 또는 연금 선택</td>
                        <td className="px-4 py-3 text-text-secondary">개인계정 이전 가능 (중도인출 제한)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">세금</td>
                        <td className="px-4 py-3 text-text-secondary">퇴직소득세 적용</td>
                        <td className="px-4 py-3 text-text-secondary">퇴직소득세 적용 (동일)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 퇴직소득세 계산 공식 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">퇴직소득세 계산 공식</h2>
                <p className="text-text-secondary">
                  퇴직소득세는 여러 단계의 공제를 거쳐 계산되므로, 단순 비례세율이 아닙니다. 큰 금액도 공제로 인해 실제 세 부담이 낮아집니다.
                </p>

                <div className="bg-bg-card rounded-lg p-4 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">Step 1: 근속연수공제</span>
                    <br />
                    근속연수에 따라 법정 공제액이 정해집니다.
                  </p>
                  <div className="ml-4 text-sm text-text-secondary space-y-1">
                    <p>• 5년 이하: 근속연수 × 100만 원</p>
                    <p>• 5년 초과 ~10년: 500만 + (근속연수 − 5) × 200만 원</p>
                    <p>• 10년 초과 ~20년: 1,500만 + (근속연수 − 10) × 250만 원</p>
                    <p>• 20년 초과: 4,000만 + (근속연수 − 20) × 300만 원</p>
                  </div>
                </div>

                <div className="bg-bg-card rounded-lg p-4 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">Step 2: 환산급여 계산</span>
                    <br />
                    (퇴직금 − 근속연수공제) × 12 ÷ 근속연수
                  </p>
                  <p className="text-caption text-text-tertiary">
                    퇴직금을 월급 기준으로 환산하여 누진세율 적용 준비
                  </p>
                </div>

                <div className="bg-bg-card rounded-lg p-4 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">Step 3: 환산급여공제</span>
                    <br />
                    환산급여 구간에 따라 누진공제 (매우 크므로 실효세율을 낮춤)
                  </p>
                  <div className="ml-4 text-sm text-text-secondary space-y-1">
                    <p>• ~800만 원: 전액 공제</p>
                    <p>• 800만~7,000만: 800만 + (초과분) × 60%</p>
                    <p>• 7,000만~1억: 4,520만 + (초과분) × 55%</p>
                    <p>• 1억~3억: 6,170만 + (초과분) × 45%</p>
                    <p>• 3억 초과: 1억 5,170만 + (초과분) × 35%</p>
                  </div>
                </div>

                <div className="bg-bg-card rounded-lg p-4 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">Step 4: 과세표준 및 세금 계산</span>
                    <br />
                    과세표준 = 환산급여 − 환산급여공제
                    <br />
                    산출세액 = (과세표준 × 누진세율) ÷ 12 × 근속연수
                  </p>
                  <p className="text-caption text-text-tertiary">
                    누진세율은 소득세법 §55 종합소득세 세율표 적용
                  </p>
                </div>

                <p className="text-sm text-text-secondary">
                  <span className="font-semibold">예시:</span> 근속 10년, 퇴직금 3억 원
                  <br />
                  근속공제 1,500만 → 환산급여 2.4억 → 환산급여공제 약 6,170만 →
                  과세표준 1.78억 → 누진세율(24%) → 세금 약 850만 → 월할 및 근속연수 반영 =
                  실제 퇴직소득세 약 710만 원
                </p>
              </section>

              {/* 주의사항 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주의사항</h2>
                <div className="bg-highlight-500/5 border border-highlight-500/30 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-text-primary font-medium">
                    본 계산기는 표준 시나리오 기반이며, 실제 퇴직금은 다음 요인에 따라 달라질 수 있습니다:
                  </p>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• DC형의 경우 실제 운용수익이 반영되므로 계산기 결과와 상이할 수 있음</li>
                    <li>• 중간정산 이력이 있으면 남은 퇴직금 기준으로 재계산</li>
                    <li>• 연금 전환, 일시금 수령 선택 시 세제 혜택이 달라질 수 있음</li>
                    <li>• 사업장 폐업, 임금체불 등 특수 상황은 퇴직급여보장기금 지급</li>
                    <li>• 비과세 퇴직금(공무원 등)은 본 계산 대상 외</li>
                  </ul>
                  <p className="text-sm text-text-primary font-medium mt-2">
                    정확한 수액은 퇴직 시점에 사업장의 퇴직연금 담당자 또는 세무사와 확인하세요.
                  </p>
                </div>
              </section>

              {/* 절세 및 활용 팁 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">절세 및 활용 팁</h2>
                <div className="space-y-3">
                  <div className="bg-bg-card rounded-lg p-4">
                    <p className="font-semibold text-text-primary">1. 퇴직연금 선택 검토</p>
                    <p className="text-sm text-text-secondary mt-1">
                      DC형 가입 시 운용 수익률이 좋은 상품 선택이 중요합니다. 은행 정기예금(1.5-2%)보다 기업형 투자상품(3-5%)을 고려하되, 고령(55세+)이면 안정성 우선.
                    </p>
                  </div>
                  <div className="bg-bg-card rounded-lg p-4">
                    <p className="font-semibold text-text-primary">2. 연금 수령 vs 일시금</p>
                    <p className="text-sm text-text-secondary mt-1">
                      일시금은 분할 수령 시 세 부담이 적을 수 있습니다. 5년 이상 분할하면 연도별 세금이 낮아지므로, 은퇴 연금 설계와 함께 검토하세요.
                    </p>
                  </div>
                  <div className="bg-bg-card rounded-lg p-4">
                    <p className="font-semibold text-text-primary">3. 이직 시 중도이전</p>
                    <p className="text-sm text-text-secondary mt-1">
                      DC형은 적립금을 새 회사 계정으로 이전 가능. DB형도 기업 규모 축소 시 이전 가능한 경우가 있으므로 확인하세요.
                    </p>
                  </div>
                  <div className="bg-bg-card rounded-lg p-4">
                    <p className="font-semibold text-text-primary">4. 확인해야 할 서류</p>
                    <p className="text-sm text-text-secondary mt-1">
                      • 근로계약서 (DB/DC형 확인)
                      <br />
                      • 임금대장 (3개월 통상임금, 상여금 확인)
                      <br />
                      • 퇴직금 지급 안내서 (사업주 산정 방식)
                    </p>
                  </div>
                </div>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 법적 근거 및 공식 출처 */}
              <section aria-label="참고 자료" className="card">
                <h2 className="mb-3 text-lg font-semibold">법적 근거 및 공식 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법/제34조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터 — 근로기준법 §34 (퇴직급여)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로자퇴직급여보장법"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터 — 근로자퇴직급여 보장법
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.moel.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      고용노동부 — 퇴직금·퇴직연금 제도 안내
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.comwel.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      근로복지공단 — 퇴직연금 가입정보 조회
                    </a>
                  </li>
                </ul>
              </section>

              {/* 업데이트 및 출처 */}
              <section className="space-y-4 border-t border-border-base pt-6">
                <h2 className="text-lg font-semibold">업데이트</h2>
                <p className="text-sm text-text-secondary">
                  본 계산기는 2026년 세율과 퇴직금 제도를 기준으로 작성되었습니다.
                  <br />
                  최종 업데이트: 2026-04-24
                </p>
              </section>

              {/* 면책조항 */}
              <section className="bg-bg-card rounded-lg p-4 text-sm text-text-tertiary border border-border-base">
                <p className="font-medium text-text-secondary mb-2">면책조항</p>
                <p>
                  본 계산기는 일반적인 퇴직금 계산 기준을 따른 참고용이며, 실제 지급액은 사업장의 퇴직연금 규약, 개별 계약 내용, 세무 처리 방식, 중간정산 이력 등에 따라 달라질 수 있습니다.
                  세금 및 법적 조언이 필요한 경우 세무사·노무사·고용노동부에 상담하세요.
                </p>
              </section>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
