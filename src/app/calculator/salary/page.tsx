import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import { calculateTakeHome } from '@/lib/tax/income';
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

export const metadata: Metadata = {
  title: '연봉 실수령액 계산기 2026, 4대보험·소득세 자동',
  description:
    '2026년 연봉 실수령액 계산기. 세전 연봉을 입력하면 2026년 4대보험과 소득세 근사치를 계산해 월 실수령액·연간 세후액을 확인. 무료. 회원가입 불필요. 모바일·데스크톱 최적. 2026년 최신 세율 반영.',
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
    title: '연봉 실수령액 계산기 2026',
    description: '2026년 최신 세율로 연봉 실수령액 즉시 계산',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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
      '입니다. 2026년 7월 이후, 퇴직금 별도·부양가족 본인 1명·공제대상 자녀 0명·월 비과세 20만 원 가정입니다. 소득세는 연간 누진세를 월 환산한 근사치로, 실제 국세청 간이세액표 조회 결과와 다릅니다.',
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
    question: '부양가족·자녀 공제 기준은 무엇인가요?',
    answer:
      '부양가족은 본인을 포함하며 기본공제 요건을 충족하는 인원입니다. 기본공제는 1인당 연 150만 원을 소득에서 차감합니다. 공제대상 자녀·손자녀 세액공제는 1명 연 25만 원, 2명 합계 55만 원, 3명째부터 각 40만 원 추가입니다(소득세법 제59조의2). 자녀의 연령·소득 요건을 확인하고 입력하세요.',
  },
  {
    question: '연봉에 퇴직금이 포함되면 어떻게 다른가요?',
    answer:
      '퇴직금 포함을 선택하면 입력 연봉을 13으로 나눈 금액을 월급으로 가정합니다. 이는 비교용 가정이며 실제 급여와 법정 퇴직급여는 근로계약과 평균임금 기준을 별도로 확인해야 합니다.',
  },
  {
    question: '실제 급여명세서와 다른 이유는 무엇인가요?',
    answer:
      '본 도구는 국세청 간이세액표를 직접 조회하지 않습니다. 사회보험료 소득공제, 근로소득세액공제·특별공제 및 회사의 원천징수 비율을 반영하지 않은 연간 누진세의 월 환산 추정입니다. 보험료 신고기준, 정산, 자녀 공제조건도 달라질 수 있어 회사 급여명세서의 확정액과 차이가 납니다.',
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
    description: '2026년 최신 소득세율과 4대보험 요율 반영',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연봉 실수령액 계산기 2026',
    description: '2026년 최신 세율로 연봉 실수령액 즉시 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-09-30',
    isPartOf: getCategoryUrlForCalculator('salary'),
  });
  const howToLd = buildHowToJsonLd({
    name: '연봉 실수령액 계산기 사용 방법',
    description: '연봉을 입력하여 월 실수령액, 4대보험, 소득세를 계산하는 단계별 가이드',
    steps: [
      { name: '연봉 입력', text: '세전 연봉(또는 월급) 금액을 입력합니다.' },
      {
        name: '부양가족 설정',
        text: '본인을 포함한 부양가족 수와 공제대상 자녀·손자녀 수를 입력합니다.',
      },
      { name: '비과세 입력', text: '월 식대 등 비과세 근로소득이 있으면 입력합니다(선택).' },
      {
        name: '세금·보험료 자동계산',
        text: '2026년 기준 4대보험과 소득세·지방소득세가 자동 계산됩니다.',
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
          '소득세 과세 대상에서 제외되는 근로소득. 월 식대 20만 원 이하, 자가운전보조금 월 20만 원, 숙직비, 시간외근무수당 중 일부가 해당(소득세법 §12). 4대보험 기준 소득에서도 제외되어 실수령액 증가.',
      },
      {
        name: '근로소득세',
        description:
          '직장인 연봉에 부과되는 국세. 2026년 소득세법 §55 누진세율(6%~45%) 적용 후 자녀세액공제를 차감하고 12로 나눠 월 소득세 근사치(간이세액표 직접 조회 아님). 지방소득세 10%가 별도 부과.',
      },
      {
        name: '자녀세액공제',
        description:
          '공제대상 자녀·손자녀 1명 연 25만 원, 2명 합계 55만 원, 3명째부터 각 40만 원을 근로소득세에서 직접 차감. 연말정산 시 정산. 근거: 소득세법 §59의2.',
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
                  <AuthorByline datePublished="2026-04-24" dateModified="2026-09-30" />
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
                    2026년 7월 이후·퇴직금 별도·본인 1명·공제대상 자녀 0명·비과세 월 20만 원 가정.
                    아래 표는 위 계산기와 같은 산식의 추정값이며, 실제 원천징수와 차이가 있습니다.
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
                    소득세 근사치 − 지방소득세.
                  </p>
                  <p>
                    연봉은 12개월로 나누고, 퇴직금 포함 선택 시 13등분한 월급을 가정합니다. 월
                    비과세액은 월급 범위까지만 반영합니다. 무급여 0원 입력은 공제액과 실수령액을
                    0원으로 추정하며 실제 가입·납부예외 여부를 판정하지 않습니다.
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
                    소득세: 국세청 간이세액표 직접 조회 아님
                  </h3>
                  <p>
                    연 급여에서 비과세액을 제외한 총급여를 기준으로 근로소득공제(소득세법 제47조)와
                    기본공제(1인당 150만 원)를 빼고, 누진세율(제55조)을 적용합니다. 공제대상
                    자녀·손자녀 세액공제(1명 25만 원, 2명 합계 55만 원, 3명째부터 40만 원 추가)를
                    차감한 뒤 12개월로 나눕니다. 지방소득세는 월 소득세의 10%이며 두 세액 모두 10원
                    미만을 버립니다.
                  </p>
                  <p>
                    사회보험료 소득공제, 근로소득세액공제·특별공제 및 회사의 80%·100%·120% 원천징수
                    선택을 반영하지 않은 근사치입니다. 실제 월 원천징수액 및 연말정산 결정세액과
                    차이가 날 수 있습니다. 기본공제대상 가족과 자녀 세액공제의 연령·소득 요건은 실제
                    조건을 확인한 인원만 입력하세요.
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
                      href="https://www.law.go.kr/법령/소득세법/제55조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 소득세법 §55 (종합소득세 누진세율 8단계)
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
                      href="https://www.law.go.kr/법령/소득세법/제59조의2"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 소득세법 §59의2 (자녀세액공제)
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
                      href="https://www.hometax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국세청 홈택스, 근로소득 간이세액표 조회 (월 원천징수 기준)
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
                  <strong>법적 근거</strong>: 소득세법 §55, §59의2, 국민건강보험법, 국민연금법,
                  국세청 근로소득 간이세액표는 실제 원천징수 확인용이며 본 도구에 직접 연동되어 있지
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
