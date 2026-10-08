import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import { calculateTakeHome } from '@/lib/tax/income';
import { WITHHOLDING_TABLE_2026_SOURCE } from '@/lib/constants/withholding-table-2026';
import { formatKRW as formatExactCurrency } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { EmbedCodeBox } from '@/components/calculator/EmbedCodeBox';
import { RateBarChart } from '@/components/charts/RateBarChart';

// Dynamic import — AdSense 슬롯 로딩 지연 (First Load JS 최적화)

import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
  buildDefinedTermSetJsonLd,
  getCategoryUrlForCalculator,
} from '@/lib/seo/jsonld';
import { SalaryCalculator } from './SalaryCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';
import { MainBackrefBox } from '@/components/network/MainBackrefBox';
import { getMainCategoryUrlForCalculatorSlug } from '@/lib/network/main-backref';

const URL = 'https://calculatorhost.com/calculator/salary/';
const TITLE = '연봉 실수령액 계산기 2026 | 4대보험·소득세 추정';
const DESCRIPTION =
  '연봉으로 4대보험과 소득세를 뺀 월 실수령액을 계산합니다. 2026년 간이세액표와 비과세·부양가족을 반영합니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    '연봉 실수령액 계산기',
    '연봉 계산기 2026',
    '세후 월급',
    '4대보험 계산',
    '연봉 5000 실수령액',
    '월급 실수령액 계산기',
    '소득세 계산기',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const formatCurrency = (value: number) => formatExactCurrency(value, { truncateTen: false });

const EXAMPLE_OPTIONS = {
  wageType: 'yearly' as const,
  severance: 'separate' as const,
  nontaxableMonthly: 200_000,
  dependents: 1,
  children: 0,
  calculationMonth: 7,
  withholdingRate: 100 as const,
};
const ANNUAL_EXAMPLES = [
  30_000_000, 40_000_000, 50_000_000, 60_000_000, 70_000_000, 80_000_000, 100_000_000,
].map((wageAmount) => ({ wageAmount, ...calculateTakeHome({ ...EXAMPLE_OPTIONS, wageAmount }) }));
const FAQ_ITEMS = [
  ...[30_000_000, 50_000_000, 70_000_000].map((wageAmount) => ({
    question:
      '연봉 ' + (wageAmount / 10_000).toLocaleString('ko-KR') + '만 원의 월 실수령액은 얼마인가요?',
    answer:
      '본 계산기의 월 실수령 추정액은 ' +
      formatCurrency(calculateTakeHome({ ...EXAMPLE_OPTIONS, wageAmount }).monthlyNetIncome) +
      '입니다. 2026년 7월 지급·원천징수, 퇴직금 별도·공제대상 가족 본인 1명·8~20세 해당 자녀 0명·월 비과세 20만 원·원천징수 100% 가정입니다. 소득세는 공식 근로소득 간이세액표를 적용하며, 실제 보험료 신고기준과 연말정산에 따라 수령액은 달라질 수 있습니다.',
  })),
  {
    question: '2026년 4대보험은 어떻게 계산되나요?',
    answer:
      '근로자 부담률은 국민연금 4.75%, 건강보험 3.595%, 장기요양보험은 건강보험료의 13.14%, 고용보험 0.9%입니다. 국민연금 기준소득월액은 1~6월 40만~637만 원, 7~12월 41만~659만 원 범위이며 천 원 미만을 버립니다. 실제 보험료는 공단에 신고된 기준소득·보수월액, 가입조건과 정산에 따라 달라집니다.',
  },
  {
    question: '비과세 식대 20만 원은 어떻게 적용되나요?',
    answer:
      '비과세 요건을 충족하는 식대는 월 20만 원 한도로 소득세 대상 급여에서 제외됩니다. 계산기에는 월급에 포함된 비과세액을 입력합니다. 이 도구는 같은 금액을 보험료 산정 소득에서도 제외하는 가정이며, 실제 보험료 제외 여부는 각 비과세 항목과 공단 신고내역을 확인하세요.',
  },
  {
    question: '공제대상 가족·자녀 입력 기준은 무엇인가요?',
    answer:
      '공제대상 가족은 본인을 포함해 기본공제 요건을 충족하는 인원입니다. 자녀 입력은 그 가족에 포함된 8세 이상 20세 이하 자녀 수입니다. 2026년 1~2월 원천징수는 자녀 1명 월 12,500원, 2명 29,160원, 2명 초과 시 1명당 25,000원을 추가 공제합니다. 3월 1일 이후 원천징수는 각각 20,830원, 45,830원, 추가 33,330원을 적용합니다. 이 월 원천징수 기준과 연말정산 자녀세액공제 요건은 구분해 확인하세요.',
  },
  {
    question: '연봉에 퇴직금이 포함되면 어떻게 다른가요?',
    answer:
      '퇴직금 포함을 선택하면 입력 연봉을 13으로 나눈 금액을 월급으로 가정합니다. 이는 비교용 가정이며 실제 급여와 법정 퇴직급여는 근로계약과 평균임금 기준을 별도로 확인해야 합니다.',
  },
  {
    question: '실제 급여명세서와 다른 이유는 무엇인가요?',
    answer:
      '일반 월급여의 소득세는 공식 간이세액표와 선택한 원천징수 비율로 계산합니다. 실제 급여명세서는 보험료 신고기준, 비과세 항목, 상여·복수 근무지 등 개별 조건과 다를 수 있습니다. 이 도구는 연말정산의 최종 결정세액을 계산하지 않으며, 일용근로·해외소득·별도 보험료 기준도 반영하지 않습니다.',
  },
  {
    question: '원천징수 80%·100%·120%는 무엇인가요?',
    answer:
      '간이세액표 세액을 기준으로 미리 낼 소득세의 비율이며 소득세율을 선택하는 기능은 아닙니다. 기본은 100%입니다. 80%는 월 원천징수액이 적고 120%는 많지만, 연말정산 결정세액 자체를 바꾸지는 않습니다. 환급이나 추가 납부는 실제 연말정산 결과에 따라 달라집니다.',
  },
  {
    question: '실수령액 역산은 목표 금액과 항상 같나요?',
    answer:
      '연봉 10억 원 이내에서 같은 가족·자녀·비과세·지급월·원천징수 비율로 필요한 연봉을 찾습니다. 세액표 구간과 원 단위 처리 때문에 목표와 정확히 일치하지 않을 수 있어 계산상 달성 월 실수령액과 차이를 함께 표시합니다. 탐색 상한에 도달하면 그 사실을 안내하며 실제 급여를 보장하지 않습니다.',
  },
];

const RELATED = [
  { href: '/calculator/severance', title: '퇴직금', description: 'DB·DC 퇴직금 예상' },
  {
    href: '/calculator/loan-limit',
    title: '대출한도 (DSR)',
    description: '연소득 기반 대출 가능액',
  },
  { href: '/calculator/freelancer-tax', title: '프리랜서 종합소득세', description: '경비율 반영' },
  { href: '/calculator/savings', title: '적금 이자', description: '월급 저축 계획' },
];

export default function SalaryPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '연봉 실수령액 계산기',
    description: DESCRIPTION,
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연봉 실수령액 계산기 2026',
    description: DESCRIPTION,
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-10-02',
    isPartOf: getCategoryUrlForCalculator('salary'),
  });
  const howToLd = buildHowToJsonLd({
    name: '연봉 실수령액 계산기 사용 방법',
    description: DESCRIPTION,
    steps: [
      { name: '연봉 입력', text: '세전 연봉(또는 월급) 금액을 입력합니다.' },
      {
        name: '부양가족 설정',
        text: '본인을 포함한 공제대상 가족 수와 그 가족에 포함된 8~20세 자녀 수를 입력합니다.',
      },
      { name: '비과세 입력', text: '월 식대 등 비과세 근로소득이 있으면 입력합니다(선택).' },
      {
        name: '원천징수 조건 확인',
        text: '2026년 급여 지급·원천징수월과 80%·100%·120% 비율을 선택합니다. 보험료도 같은 지급월 기준으로 추정합니다.',
      },
      {
        name: '세금·보험료 자동계산',
        text: '비과세 제외 월급여로 공식 간이세액표를 적용하고, 보험료와 지방소득세를 계산합니다.',
      },
      { name: '결과 확인', text: '월 실수령액, 시급, 세금 상세내역을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '근로', url: 'https://calculatorhost.com/category/work/' },
    { name: '연봉 실수령액' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '연봉 실수령액 핵심 용어',
    description: '직장인의 급여·세금·보험료 계산에 필요한 용어 정의',
    url: 'https://calculatorhost.com/calculator/salary/#glossary',
    terms: [
      {
        name: '4대보험',
        description:
          '직장인이 고용주와 함께 부담하는 4가지 사회보험. 국민연금(근로자 4.75%), 건강보험(3.595%), 장기요양보험(건보료의 13.14%), 고용보험(0.9%). 실수령액에서 직접 공제됨. 근거: 국민연금법·국민건강보험법·고용보험법.',
        url: 'https://www.4insure.or.kr',
      },
      {
        name: '비과세 근로소득',
        alternateName: '비과세',
        description:
          '소득세 과세 대상에서 제외되는 근로소득. 실제 급여 항목의 비과세 요건을 확인해야 함. 이 도구는 입력한 비과세액을 보험료 산정 소득에서도 제외하는 가정이며 실제 공단 신고내역과 다를 수 있음.',
      },
      {
        name: '근로소득세',
        description:
          '일반 월급여에서 비과세를 제외한 금액과 공제대상 가족 수로 공식 근로소득 간이세액표를 적용해 구한 소득세. 해당 자녀 공제와 선택한 원천징수 비율을 반영하며 연말정산 결정세액과는 다름.',
      },
      {
        name: '간이세액표의 자녀 공제',
        description:
          '공제대상 가족에 포함된 8~20세 자녀 수에 따른 월 원천징수 공제. 2026년 3월 1일 이후 원천징수분부터 개정 공제액을 적용하며, 연말정산 자녀세액공제와 구분함. 근거: 소득세법 시행령 별표 2.',
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
                      { name: '연봉 실수령액' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">
                    연봉 실수령액 계산기 2026
                  </h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    세전 급여와 적용월로 월 실수령액을 예상해 보세요.
                  </p>
                  <AuthorByline datePublished="2026-04-24" dateModified="2026-10-02" />
                </header>
              }
              calculator={<SalaryCalculator />}
              related={
                <>
                  <RelatedCalculators items={RELATED} />
                </>
              }
              tools={
                <>
                  <ShareButtons
                    title="연봉 실수령액 계산기 (2026)"
                    url="https://calculatorhost.com/calculator/salary/"
                  />
                  <EmbedCodeBox
                    embedPath="/embed/salary/"
                    canonicalPath="/calculator/salary/"
                    title="연봉 실수령액 계산기"
                  />
                </>
              }
            >
              <details className="card">
                <summary className="cursor-pointer font-semibold">급여별 실수령액 예시</summary>
                <section aria-label="연봉별 월 실수령액" className="mt-4">
                  <h2 className="mb-3 text-xl font-semibold">연봉별 월 실수령액은 얼마인가요?</h2>
                  <p className="mb-4 text-sm text-text-secondary">
                    2026년 7월 지급·원천징수·퇴직금 별도·공제대상 가족 본인 1명·8~20세 해당 자녀
                    0명·비과세 월 20만 원·원천징수 100% 가정입니다. 아래 표는 위 계산기와 같은
                    공식 간이세액표 및 보험료 가정으로 산출하며 실제 급여명세서와 차이가 있습니다.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <caption className="sr-only">연봉별 월 실수령액 추정</caption>
                      <thead>
                        <tr>
                          <th scope="col" className="p-3 text-left">
                            세전 연봉
                          </th>
                          <th scope="col" className="p-3 text-right">
                            월 실수령 추정
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ANNUAL_EXAMPLES.map((example) => (
                          <tr key={example.wageAmount} className="border-t border-border-base">
                            <td className="p-3">{formatCurrency(example.wageAmount)}</td>
                            <td className="p-3 text-right font-semibold tabular-nums">
                              {formatCurrency(example.monthlyNetIncome)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </details>
              <details className="card">
                <summary className="cursor-pointer font-semibold">자주 묻는 질문</summary>
                <div className="mt-4">
                  <FaqSection items={FAQ_ITEMS} />
                </div>
              </details>
              <details className="card">
                <summary className="cursor-pointer font-semibold">계산 기준·가정·공식</summary>
                <section
                  aria-label="계산 공식"
                  className="mt-4 space-y-4 text-sm leading-relaxed text-text-secondary"
                >
                  <h2 className="text-xl font-semibold text-text-primary">
                    2026년 연봉 실수령액 산출 공식
                  </h2>
                  <p>
                    월 실수령 추정액 = 세전 월급 − 국민연금 − 건강보험 − 장기요양 − 고용보험 −
                    간이세액표 소득세 − 지방소득세.
                  </p>
                  <p>
                    연봉은 12개월로 나누고, 퇴직금 포함 선택 시 13등분한 월급을 가정합니다. 월
                    비과세액은 월급 범위까지만 반영합니다. 실제 보험 가입·납부예외 여부는 이
                    화면에서 판정하지 않습니다.
                  </p>
                  <h3 className="font-semibold text-text-primary">
                    보험료: 2026년 1월 1일부터 적용
                  </h3>
                  <p>
                    근로자 부담 국민연금 4.75%, 건강보험 3.595%, 장기요양보험은 건강보험료의 13.14%,
                    고용보험 0.9%입니다. 국민연금 기준소득월액은 천 원 미만을 버린 뒤 1~6월
                    40만~637만 원, 7~12월 41만~659만 원으로 제한합니다. 보험료 금액은 원 미만을
                    버리는 추정이며 실제 고지액의 절사·정산 방식과 차이가 날 수 있습니다.
                  </p>
                  <RateBarChart
                    title="2026년 근로자 부담 보험료율"
                    caption="국민연금 상하한 적용 전, 일반 급여 기준. 장기요양은 건강보험료 대비 13.14%."
                    max={5}
                    bars={[
                      { label: '국민연금', value: 4.75, highlight: true },
                      { label: '건강보험', value: 3.595, display: '3.595%' },
                      { label: '장기요양', value: 0.4724, display: '약 0.4724%' },
                      { label: '고용보험', value: 0.9 },
                    ]}
                  />
                  <p>
                    보험료 산정 소득은 세전 월급에서 입력 비과세를 뺀 금액으로 가정합니다. 공단에
                    신고한 기준소득·보수월액, 비과세 종류, 가입조건·정산을 반영하지 않습니다.
                    건강보험 상하한과 다중사업장 합산도 반영하지 않으므로 고액 급여·특수한
                    고용조건은 공단 고지액을 확인하세요.
                  </p>
                  <h3 className="font-semibold text-text-primary">
                    소득세: 공식 근로소득 간이세액표 적용
                  </h3>
                  <p>
                    세전 월급에서 입력 비과세액을 제외한 월급여로 공식 표의 급여 구간과
                    공제대상 가족 수를 조회합니다. 가족은 본인을 포함하며, 그 가족에 포함된
                    8~20세 자녀의 월 공제액을 반영합니다. 고액 월급여와 가족 11명 초과는 공식
                    별표의 별도 계산 규칙을 적용합니다.
                  </p>
                  <p>
                    자녀 공제액은 2026년 1~2월 원천징수분과 3월 1일 이후 원천징수분을 구분합니다.
                    1~2월은 자녀 1명 12,500원, 2명 29,160원, 초과 1명당 25,000원이고,
                    3월 이후는 1명 20,830원, 2명 45,830원, 초과 1명당 33,330원입니다.
                    기준은 급여 귀속월이 아닌 지급·원천징수 시점입니다.
                  </p>
                  <p>
                    간이세액표 기준액에 선택한 80%·100%·120% 원천징수 비율을 적용합니다.
                    소득세는 최종 10원 미만을 버리며, 징수세액이 1천 원 미만이면 징수하지
                    않습니다. 지방소득세는 징수 소득세의 10%로 계산해 10원 미만을 버립니다.
                    원천징수 비율은 세율 선택이 아니라 선납 금액의 선택입니다. 연말정산
                    결정세액이나 개인별 환급·추가 납부는 계산하지 않습니다.
                  </p>
                  <p>
                    일반적인 단일 근무지 급여만 계산합니다. 상여, 복수 근무지, 일용근로,
                    해외소득, 별도 보험료 신고기준은 반영하지 않습니다. 지급·원천징수월과
                    보험료 적용월이 같다는 가정이므로 실제 원천징수영수증과 급여명세서를
                    확인하세요.
                  </p>
                </section>
              </details>
              <section
                aria-label="관련 가이드"
                className="card border-l-4 border-l-primary-500 bg-primary-500/5"
              >
                <h2 className="mb-2 text-xl font-semibold">함께 보면 좋은 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <a
                      href="/guide/freelancer-salary-comparison/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      프리랜서 vs 일반직 실수령액 비교
                    </a>{' '}
                    , 같은 연봉이라도 다른 실수령. 4대보험·세금·경비 차이
                  </li>
                </ul>
              </section>
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>
                    2026-10-02: 공식 근로소득 간이세액표·지급월별 자녀 공제·원천징수 비율 적용,
                    역산 달성액과 목표 차이 표시
                  </li>
                  <li>
                    2026-09-30: 2026년 보험료율·국민연금 적용월 상하한 수정, 소득세 근사 방식과 예시
                    기준 명시
                  </li>
                </ul>
              </section>
              <section aria-label="참고 자료" className="card">
                <h2 className="mb-3 text-lg font-semibold">법적 근거 및 공식 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0189&lsiSeq=290841&urlMode=lsScJoRltInfoR"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 소득세법 시행령 제189조 (근로소득 간이세액표)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/소득세법/제12조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 소득세법 §12 (비과세 근로소득, 식대 월 20만 원)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0194&lsiSeq=290841&urlMode=lsScJoRltInfoR"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 소득세법 시행령 제194조 (원천징수 비율)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0097M0.do"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국민연금공단, 2026년 보험료율 9.5%·근로자 4.75%·기준소득월액
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.mohw.go.kr/menu.es?mid=a10705010500"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      보건복지부, 건강보험료율 7.19% / 근로자 3.595%
                    </a>
                  </li>
                  <li>
                    <a
                      href={WITHHOLDING_TABLE_2026_SOURCE.tableUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 현행 근로소득 간이세액표 (시행령 별표 2)
                    </a>
                  </li>
                  <li>
                    <a
                      href={WITHHOLDING_TABLE_2026_SOURCE.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      근로소득 간이세액표 공식 PDF 원문
                    </a>
                  </li>
                  <li>
                    <a
                      href={WITHHOLDING_TABLE_2026_SOURCE.amendmentUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대통령령 제36129호 개정·부칙 (2026년 3월 1일 적용 근거)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.4insure.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      4대사회보험정보연계센터, 4대보험 요율·납부액 조회
                    </a>
                  </li>
                </ul>
              </section>
              <MainBackrefBox mainCategoryUrl={getMainCategoryUrlForCalculatorSlug('salary')} />
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>계산 기준</strong>: 소득세법 시행령 제189조·제194조·별표 2의 공식
                  근로소득 간이세액표를 일반 월급여에 적용합니다. 보험료는 입력 조건에 따른
                  추정이며 실제 공단 신고기준과 다를 수 있습니다. 연말정산 결정세액은 계산하지
                  않습니다.
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 실제 세무 처리는 세무사의
                  안내를 받으시기 바랍니다.
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
