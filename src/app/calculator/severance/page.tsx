import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  getCategoryUrlForCalculator,
  buildHowToJsonLd,
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';
import { SeveranceCalculator } from './SeveranceCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/severance/';
const DESCRIPTION =
  '입사일과 마지막 근무 다음 날인 퇴직일, 3개월 산입 임금과 1일 통상임금을 입력해 예상 퇴직금·퇴직소득세·세후 참고액을 확인합니다. 평균임금과 통상임금 중 큰 금액을 적용하며, DC 실제 적립금·휴직·중간정산은 별도 확인이 필요합니다.';
const AVERAGE_WAGE_DESCRIPTION =
  '평균임금은 퇴직일 이전 3개월의 산입 임금 총액을 그 기간의 실제 달력 일수로 나눈 1일 금액입니다. 상여금·연차수당은 산입 대상 여부를 먼저 확인합니다. 평균임금이 1일 통상임금보다 적으면 통상임금을 기준으로 합니다(근로기준법 §2).';
const ORDINARY_WAGE_DESCRIPTION =
  '통상임금은 소정근로의 대가로 정기적·일률적으로 지급하기로 정한 임금입니다. 상여금이라는 명칭만으로 일괄 제외하지 않으며, 지급 조건과 소정근로시간을 확인해 1일 통상임금을 별도로 입력해야 합니다.';
const BONUS_DESCRIPTION =
  '상여금과 연차수당은 평균임금 산입 대상인 연간 금액의 3/12을 3개월 임금에 더합니다. 연간 상여금 1,200만 원이 산입 대상이면 300만 원을 더합니다. 연차수당은 발생·지급 사유와 대상 연도를 확인하며, 퇴직으로 새로 발생하는 미사용 연차수당을 자동 포함하지 않습니다.';
const PLAN_DESCRIPTION =
  'DB형은 규약에 따른 급여를 지급하고, DC형은 사용자가 연간 임금총액의 1/12 이상을 부담금으로 납입합니다. DC 실제 수령액은 적립금과 운용 결과에 따라 달라지므로 이 계산기의 법정 기준 참고액과 같다고 볼 수 없습니다.';

export const metadata: Metadata = {
  title: '퇴직금 계산기 2026 | 세후 실수령액·퇴직소득세 자동 계산',
  description: DESCRIPTION,
  keywords: [
    '퇴직금 계산기',
    '퇴직소득세 계산기',
    '퇴직금 소득세 계산기',
    '근속연수 공제',
    'DC DB 퇴직금',
    '2026 퇴직금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '퇴직금 계산기 2026',
    description: DESCRIPTION,
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '퇴직금 계산기 2026',
    description: DESCRIPTION,
  },
};

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: '퇴직금 지급 조건은 무엇인가요?',
    answer:
      '근로자퇴직급여 보장법의 적용 대상은 계속근로기간 1년 이상이며, 4주간 평균 1주 소정근로시간이 15시간 이상인 근로자입니다. 퇴직 사유나 고용형태만으로 제외하지 않습니다. 근로시간 변동이나 계속근로기간에서 제외되는 기간이 있으면 별도 확인이 필요합니다.',
  },
  {
    question: '평균임금과 통상임금은 어떻게 다른가요?',
    answer: AVERAGE_WAGE_DESCRIPTION + ' ' + ORDINARY_WAGE_DESCRIPTION,
  },
  {
    question: 'DB형과 DC형은 무엇인가요?',
    answer: PLAN_DESCRIPTION,
  },
  {
    question: '상여금과 연차수당은 퇴직금에 포함되나요?',
    answer: BONUS_DESCRIPTION,
  },
  {
    question: '퇴직소득세는 어떻게 계산되나요?',
    answer:
      '소득세법 §48의 근속연수공제와 환산급여공제를 적용해 과세표준을 구한 뒤, §55의 세율과 누진공제를 반영하고 근속연수를 적용합니다. 환산급여는 세금 계산을 위한 값이며 실제 월급이 아닙니다. 지방소득세를 포함한 세후 금액은 일반적인 일시금 수령 참고값입니다.',
  },
  {
    question: '중간정산이나 퇴직연금 전환 시 세금은?',
    answer:
      '중간정산 이력, 과세 이연, 연금 수령은 금액과 과세 시점에 영향을 줍니다. 본 계산기는 이를 자동 반영하지 않습니다. 사업장 퇴직연금 담당자와 국세청 안내를 통해 적용 요건을 확인하세요.',
  },
];

const RELATED = [
  { href: '/calculator/salary', title: '연봉 실수령액', description: '월 세후 급여' },
  { href: '/calculator/loan-limit', title: '대출한도 (DSR)', description: '주택담보대출 한도' },
  { href: '/calculator/retirement', title: '은퇴자금 계산기', description: '노후 필요자금·연금' },
];

export default function SeverancePage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '퇴직금 계산기',
    description: DESCRIPTION,
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '퇴직금 계산기 2026',
    description: DESCRIPTION,
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-10-01',
    isPartOf: getCategoryUrlForCalculator('severance'),
  });
  const howToLd = buildHowToJsonLd({
    name: '퇴직금 계산기 사용 방법',
    description:
      '입사일·퇴직일, 평균임금 산입 재료와 1일 통상임금을 입력해 퇴직금과 세후 참고액을 확인하는 단계별 안내',
    steps: [
      {
        name: '입사·퇴직 날짜 입력',
        text: '입사일과 마지막 근무일의 다음 날을 퇴직일로 입력합니다. 퇴직일 자체는 재직일수에 포함하지 않습니다.',
      },
      { name: '근속연수 자동 계산', text: '입력한 날짜로 근속연수가 자동 계산됩니다.' },
      {
        name: '월 임금 및 상여 입력',
        text: '3개월 월평균 기초임금, 3개월 추가 임금과 산입 대상 연간 상여금·연차수당을 입력합니다. 1일 통상임금은 별도로 입력합니다.',
      },
      {
        name: '퇴직금·세금 자동 계산',
        text: '중간 절사하지 않은 1일 평균임금과 1일 통상임금 중 큰 금액으로 퇴직금 참고액을 계산합니다.',
      },
      {
        name: '세후 실수령액 확인',
        text: '일반적인 일시금 수령을 가정한 세후 참고액과 지원 범위를 확인합니다. DC 실제 계좌 잔액이나 특수 과세는 별도 확인합니다.',
      },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '근로', url: 'https://calculatorhost.com/category/work/' },
    { name: '퇴직금' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '퇴직금 핵심 용어',
    description: '퇴직금 계산 및 퇴직소득세 이해에 필요한 용어 정의',
    url: 'https://calculatorhost.com/calculator/severance/#glossary',
    terms: [
      {
        name: '평균임금',
        description: AVERAGE_WAGE_DESCRIPTION,
      },
      {
        name: '통상임금',
        description: ORDINARY_WAGE_DESCRIPTION,
      },
      {
        name: '근속연수공제',
        description:
          '퇴직소득세 계산 시 근속연수에 따라 공제하는 금액. 5년 이하는 연 100만 원, 5년 초과 10년 이하는 500만 원 + 5년 초과분당 200만 원, 10년 초과 20년 이하는 1,500만 원 + 10년 초과분당 250만 원, 20년 초과는 4,000만 원 + 20년 초과분당 300만 원입니다. 근거: 소득세법 §48.',
      },
      {
        name: 'DC형/DB형',
        description: PLAN_DESCRIPTION,
      },
    ],
  });

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <main
            id="main-content"
            className="calculator-page min-w-0 flex-1 px-4 py-5 md:px-8 md:py-8"
          >
            <CalculatorPageContent
              intro={
                <header>
                  <Breadcrumb
                    items={[
                      { name: '홈', href: '/' },
                      { name: '근로', href: '/category/work/' },
                      { name: '퇴직금' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">
                    퇴직금·퇴직소득세 계산기 2026
                  </h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    마지막 근무 다음 날을 퇴직일로 입력하고 평균임금과 통상임금을 비교하세요.
                  </p>
                  <AuthorByline datePublished="2026-04-24" dateModified="2026-10-01" />
                </header>
              }
              calculator={<SeveranceCalculator />}
              related={
                <>
                  <RelatedCalculators items={RELATED} />
                </>
              }
              faq={
                <>
                  <FaqSection items={FAQ_ITEMS} />
                </>
              }
            >
              <StructuredSummary
                definition="퇴직금은 계속근로기간 1년 이상, 4주 평균 1주 소정근로시간 15시간 이상인 근로자의 퇴직급여입니다. 1일 평균임금과 통상임금 중 큰 금액 × 30 × 재직일수 ÷ 365로 일반 참고액을 계산합니다. 휴직 등 제외기간이나 중간정산은 별도 확인해야 합니다."
                table={{
                  caption: '퇴직금 계산의 주요 구성요소',
                  headers: ['항목', '계산 방식'],
                  rows: [
                    ['1일 평균임금', '3개월 산입 임금총액 ÷ 실제 달력 일수(일반적으로 89~92일)'],
                    ['세전 퇴직금 참고액', '평균임금·통상임금 중 큰 1일 금액 × 30 × 재직일수÷365'],
                    ['근속연수공제', '근속연수별 공제액 (5년이하 100만/년)'],
                    ['환산급여공제', '환산급여 구간별 누진공제'],
                    ['퇴직소득세', '(과세표준 × 구간세율 − 누진공제) ÷ 12 × 근속연수'],
                  ],
                }}
                tldr={[
                  '퇴직금 참고액 = 평균임금·통상임금 중 큰 1일 금액 × 30 × 재직일수 ÷ 365',
                  '계속근로 1년 이상·4주 평균 주 15시간 이상 조건 확인',
                  '퇴직소득세는 근속연수공제·환산급여공제·구간별 누진공제를 반영',
                  'DC 실제 적립금·운용 결과는 이 계산기로 산출하지 않음',
                ]}
              />
              <section
                aria-label="근속연수공제 해설"
                className="card border-l-4 border-l-primary-500"
              >
                <h2 className="mb-3 text-xl font-semibold">왜 근속연수공제가 큰 혜택인가?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  퇴직소득세에서 가장 큰 혜택은 근속연수공제(소득세법 §48)입니다. 공제액은
                  근속연수별로 5년 이하 연 100만 원, 5~10년은 기본 500만 원 + 초과분당 200만 원,
                  10~20년은 기본 1,500만 원 + 초과분당 250만 원, 20년 초과는 기본 4,000만 원 +
                  초과분당 300만 원이 누적됩니다. 예를 들어 근속 7년이면 500만 + 200만 × 2 = 900만
                  원이 공제됩니다.
                </p>
                <p className="text-text-secondary" data-speakable>
                  환산급여공제와 구간별 세율·누진공제를 함께 반영합니다. 같은 퇴직금이라도
                  근속연수와 과세 대상 금액에 따라 세금이 달라지므로, 특정 실효세율이나 절감 배수를
                  일률적으로 적용할 수 없습니다.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">퇴직금이란 무엇이고 언제 받을 수 있나요?</h2>
                <p className="text-text-secondary">
                  퇴직금은 근로자가 회사를 떠날 때 사업주가 지급하는 금액입니다. 근로기준법과
                  근로자퇴직급여 보장법에 따라 계속근로기간 1년 이상이고 4주 평균 1주 소정근로시간이
                  15시간 이상인 근로자가 적용 대상입니다.
                </p>
                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="text-sm">
                    <span className="font-semibold">지급 대상:</span>
                    계속근로 1년 이상·4주 평균 주 소정근로시간 15시간 이상인 근로자
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
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">퇴직일과 임금 입력 기준</h2>
                <p className="text-text-secondary">
                  퇴직일은 마지막 근무일의 다음 날입니다. 입사일은 재직기간에 포함하고 퇴직일은
                  포함하지 않습니다. 퇴직 직전 3개월의 달력 일수는 퇴직일에 따라 달라집니다.
                </p>
                <p className="text-text-secondary">
                  3개월 월평균 기초임금은 평균임금을 계산하기 위한 재료이며 통상임금이 아닙니다. 이
                  값의 3배와 별도 추가 임금에 산입 대상 연간 상여금·연차수당의 3/12을 더합니다. 임금
                  변동이 있다면 실제 3개월 총액과 일치하도록 월평균 재료를 확인해야 합니다.
                </p>
                <p className="text-text-secondary">{BONUS_DESCRIPTION}</p>
                <p className="text-sm text-text-secondary">
                  1일 통상임금은 임금 항목과 소정근로시간을 확인해 별도로 산정합니다. 휴직 등
                  제외기간, 계속근로기간 중 단절, 주 15시간 미만 구간, 중간정산이 있는 경우에는 이
                  일반 계산의 결과를 확정 지급액으로 사용하지 마세요.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">평균임금과 통상임금은 어떻게 다른가요?</h2>
                <p className="text-text-secondary">
                  {AVERAGE_WAGE_DESCRIPTION} {ORDINARY_WAGE_DESCRIPTION}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base bg-bg-card">
                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                          항목
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                          평균임금
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                          통상임금
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-base">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">정의</td>
                        <td className="px-4 py-3 text-text-secondary">
                          퇴직 이전 3개월 임금 총액 ÷ 일수
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          소정근로의 대가로 정기적·일률적으로 지급하기로 정한 임금
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">포함 항목</td>
                        <td className="px-4 py-3 text-text-secondary">
                          3개월 산입 임금 + 산입 대상 연간 상여금·연차수당의 3/12
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          임금 명칭보다 지급 조건과 소정근로의 대가 여부로 판단
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">쓰임</td>
                        <td className="px-4 py-3 text-text-secondary">
                          퇴직금 기준(통상임금보다 작으면 통상임금 적용)
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          연장근로수당·해고예고수당 등, 퇴직금 평균임금의 하한
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">예시</td>
                        <td className="px-4 py-3 text-text-secondary">
                          3개월 기초임금 900만 + 산입 상여금 100만 + 산입 연차수당 50만 = 1,050만 ÷
                          91일 ≈ 115,384.62원/일
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          월 통상임금 300만 ÷ 209시간 × 8시간 ≈ 114,832.54원/일 (주 40시간·1일
                          8시간·월 209시간 가정, 모든 근로자에 공통인 기준은 아님)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">DB형과 DC형 퇴직연금은 무엇이 다른가요?</h2>
                <p className="text-text-secondary">
                  {PLAN_DESCRIPTION} 사업장의 퇴직급여 제도와 규약을 확인하세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base bg-bg-card">
                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                          항목
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                          DB형 (확정급여)
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                          DC형 (확정기여)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-base">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">의미</td>
                        <td className="px-4 py-3 text-text-secondary">사업주가 법정 수준 보장</td>
                        <td className="px-4 py-3 text-text-secondary">
                          사용자가 연간 임금총액의 1/12 이상 부담금 납입
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">근로자 위험</td>
                        <td className="px-4 py-3 text-text-secondary">
                          규약에 따른 급여·지급 보장 요건 확인
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          높음 (운용수익에 따라 변동)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">예상 수령액</td>
                        <td className="px-4 py-3 text-text-secondary">
                          법정 기준 참고액이며 규약·개별 조건 확인 필요
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          실제 계좌 적립금과 운용 결과(본 계산기에서 계산하지 않음)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text-primary">이직 시</td>
                        <td className="px-4 py-3 text-text-secondary">
                          일시금 수령 또는 연금 선택
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          개인계정 이전 가능 (중도인출 제한)
                        </td>
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
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">퇴직소득세는 어떻게 계산하나요?</h2>
                <p className="text-text-secondary">
                  퇴직소득세는 여러 단계의 공제를 거쳐 계산되므로, 단순 비례세율이 아닙니다. 큰
                  금액도 공제로 인해 실제 세 부담이 낮아집니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="text-sm">
                    <span className="font-semibold">Step 1: 근속연수공제</span>
                    <br />
                    근속연수에 따라 법정 공제액이 정해집니다.
                  </p>
                  <div className="ml-4 space-y-1 text-sm text-text-secondary">
                    <p>• 5년 이하: 근속연수 × 100만 원</p>
                    <p>• 5년 초과 ~10년: 500만 + (근속연수 − 5) × 200만 원</p>
                    <p>• 10년 초과 ~20년: 1,500만 + (근속연수 − 10) × 250만 원</p>
                    <p>• 20년 초과: 4,000만 + (근속연수 − 20) × 300만 원</p>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="text-sm">
                    <span className="font-semibold">Step 2: 환산급여 계산</span>
                    <br />
                    (퇴직금 − 근속연수공제) × 12 ÷ 근속연수
                  </p>
                  <p className="text-caption text-text-tertiary">
                    세금 계산을 위한 환산 값이며 실제 월급을 뜻하지 않습니다.
                  </p>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="text-sm">
                    <span className="font-semibold">Step 3: 환산급여공제</span>
                    <br />
                    환산급여 구간에 따라 누진공제 (매우 크므로 실효세율을 낮춤)
                  </p>
                  <div className="ml-4 space-y-1 text-sm text-text-secondary">
                    <p>• ~800만 원: 전액 공제</p>
                    <p>• 800만~7,000만: 800만 + (초과분) × 60%</p>
                    <p>• 7,000만~1억: 4,520만 + (초과분) × 55%</p>
                    <p>• 1억~3억: 6,170만 + (초과분) × 45%</p>
                    <p>• 3억 초과: 1억 5,170만 + (초과분) × 35%</p>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="text-sm">
                    <span className="font-semibold">Step 4: 과세표준 및 세금 계산</span>
                    <br />
                    과세표준 = 환산급여 − 환산급여공제
                    <br />
                    산출세액 = (과세표준 × 구간세율 − 누진공제) ÷ 12 × 근속연수
                  </p>
                  <p className="text-caption text-text-tertiary">
                    누진세율은 소득세법 §55 종합소득세 세율표 적용
                  </p>
                </div>

                <p className="text-sm text-text-secondary">
                  <span className="font-semibold">국세청 일반 계산 예시:</span> 근속 20년, 퇴직소득
                  1억 원
                  <br />
                  근속공제 4,000만 → 환산급여 3,600만 → 환산급여공제 2,480만 → 과세표준 1,120만 →
                  환산산출세액 67만 2,000원 → 퇴직소득세 112만 원. 지방소득세와 과세 이연은 이 예시
                  금액에 포함하지 않습니다.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주의사항</h2>
                <div className="space-y-2 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
                  <p className="text-sm font-medium text-text-primary">
                    본 계산기는 표준 시나리오 기반이며, 실제 퇴직금은 다음 요인에 따라 달라질 수
                    있습니다:
                  </p>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• DC형의 경우 실제 운용수익이 반영되므로 계산기 결과와 상이할 수 있음</li>
                    <li>• 중간정산 이력이 있으면 남은 퇴직금 기준으로 재계산</li>
                    <li>• 연금 전환, 일시금 수령 선택 시 세제 혜택이 달라질 수 있음</li>
                    <li>• 휴직 등 평균임금 제외기간·불규칙 임금·근로시간 변동은 별도 검토 필요</li>
                    <li>
                      • 법정 참고액은 최종 원 단위 반올림 표시이며 실제 지급·과세 처리와 다를 수
                      있음
                    </li>
                  </ul>
                  <p className="mt-2 text-sm font-medium text-text-primary">
                    실제 지급액은 퇴직 시점에 사업장의 퇴직연금 담당자 또는 세무사와 확인하세요.
                  </p>
                </div>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">절세 및 활용 팁</h2>
                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="font-semibold text-text-primary">1. 퇴직연금 선택 검토</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      DC형은 실제 적립금과 운용 결과를 확인하세요. 상품별 위험·수수료·보장 조건과
                      은퇴 시점을 비교하고, 예상 수익률을 확정 수령액으로 해석하지 마세요.
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="font-semibold text-text-primary">2. 연금 수령 vs 일시금</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      일시금과 연금은 과세 시점과 적용 요건이 다릅니다. 단순 분할 횟수만으로 세금이
                      줄어든다고 가정하지 말고 국세청과 연금기관의 안내를 확인하세요.
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="font-semibold text-text-primary">3. 이직 시 중도이전</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      이직 시 계좌 이전과 중도인출 가능 여부는 제도와 법정 요건에 따라 다릅니다.
                      사업장 퇴직연금 담당자와 금융기관에 자신의 계좌 처리 절차를 확인하세요.
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="font-semibold text-text-primary">4. 확인해야 할 서류</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      • 근로계약서 (DB/DC형 확인)
                      <br />
                      • 임금대장 (3개월 산입 임금과 1일 통상임금의 별도 산정 근거 확인)
                      <br />• 퇴직금 지급 안내서 (사업주 산정 방식)
                    </p>
                  </div>
                </div>
              </section>
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
                      국가법령정보센터, 근로기준법 §34 (퇴직급여)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로자퇴직급여보장법"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 근로자퇴직급여 보장법
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.moel.go.kr/retirementpayCal.do"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      고용노동부, 퇴직금 계산 예시·퇴직일·평균임금 안내
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.comwel.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      근로복지공단, 퇴직연금 가입정보 조회
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6444&amp;cntntsId=7880"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국세청, 퇴직소득세 계산 구조·공제·계산 예시
                    </a>
                  </li>
                </ul>
              </section>
              <section className="space-y-4 border-t border-border-base pt-6">
                <h2 className="text-lg font-semibold">업데이트</h2>
                <p className="text-sm text-text-secondary">
                  본 계산기는 2026년 세율과 퇴직금 제도를 기준으로 작성되었습니다.
                  <br />
                  최종 업데이트: 2026-04-24
                </p>
              </section>
              <section className="rounded-lg border border-border-base bg-bg-card p-4 text-sm text-text-tertiary">
                <p className="mb-2 font-medium text-text-secondary">면책조항</p>
                <p>
                  본 계산기는 일반적인 퇴직금 계산 기준을 따른 참고용이며, 실제 지급액은 사업장의
                  퇴직연금 규약, 개별 계약 내용, 세무 처리 방식, 중간정산 이력 등에 따라 달라질 수
                  있습니다. 세금 및 법적 조언이 필요한 경우 세무사·노무사·고용노동부에 상담하세요.
                </p>
              </section>
            </CalculatorPageContent>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
