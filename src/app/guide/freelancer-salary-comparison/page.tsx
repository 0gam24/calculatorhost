import type { Metadata } from 'next';
import Link from 'next/link';
import { calculateTakeHome } from '@/lib/tax/income';
import { formatKRW } from '@/lib/utils';
const SALARY_EXAMPLES = [30_000_000, 50_000_000, 100_000_000].map((wageAmount) =>
  calculateTakeHome({
    wageType: 'yearly',
    wageAmount,
    severance: 'separate',
    nontaxableMonthly: 0,
    dependents: 1,
    children: 0,
    calculationMonth: 7,
  }),
);
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { GuideCalculatorLink } from '@/components/guide/GuideCalculatorLink';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/freelancer-salary-comparison/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-10-01';
const TITLE = '프리랜서 vs 직장인 실수령액 비교 2026';
const DESCRIPTION =
  '프리랜서 매출과 직장인 연봉을 비교하기 전에 실제 사업 비용·최종 세금·보험료 조건을 확인하세요. 직장인 급여 예시와 비교 순서를 정리하고, 연봉 실수령액·프리랜서 세금 계산기에 각각 본인 조건을 입력해 추정할 수 있습니다.';

export const metadata: Metadata = {
  title: `${TITLE} | calculatorhost`,
  description: DESCRIPTION,
  keywords: [
    '프리랜서 실수령액',
    '프리랜서 vs 직장인',
    '프리랜서 4대보험',
    '프리랜서 종합소득세',
    '사업소득 vs 근로소득',
    '3.3% 원천징수',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '프리랜서의 3.3% 원천징수는 무엇인가요?',
    answer:
      '용역대가 지급 시 사업소득세 3% + 지방소득세 0.3% = 3.3%를 원천징수. 이는 연말 종합소득세 산정 시 기납부세액으로 차감됩니다. 즉 미리 낸 세금일 뿐 최종 세액은 종합소득세 신고로 확정.',
  },
  {
    question: '프리랜서가 단순경비율과 기준경비율 중 어떤 것을 선택해야 하나요?',
    answer:
      '장부를 작성하면 실제 필요경비로 신고합니다. 추계신고 시 단순·기준경비율은 업종코드, 직전연도 수입금액, 당해연도 수입금액과 신규사업자 여부에 따라 적용이 달라집니다. 모든 프리랜서에게 하나의 매출 기준이나 IT 경비율이 자동 적용되는 것은 아닙니다.',
  },
  {
    question: '프리랜서는 4대보험을 어떻게 가입하나요?',
    answer:
      '국민연금 지역가입 대상자는 2026년 기준소득월액의 9.5%를 본인이 부담합니다. 가입대상·납부예외는 개인별로 확인합니다. 지역 건강보험은 소득과 재산 등을 반영하므로 매출에 3.595%를 곱하는 직장가입자 방식과 다릅니다. 직장인은 국민연금 4.75%, 건강보험 3.595%, 건강보험료의 13.14%인 장기요양보험료와 고용보험 근로자 부담분을 공제합니다. 예술인·노무제공자 등의 고용·산재보험은 별도 가입조건을 확인하세요.',
  },
  {
    question: '프리랜서가 직장인보다 실수령액이 적을 수도 있나요?',
    answer:
      '같은 금액의 사업 매출과 근로 연봉은 직접 비교할 수 없습니다. 프리랜서는 실제 사업 비용, 최종 세금, 공단에서 확인한 보험료를 모두 차감해야 사용할 수 있는 돈을 알 수 있습니다. 경비율로 세금 계산에 인정된 금액이 실제 현금 지출액과 같다고 가정하면 안 됩니다.',
  },
  {
    question: 'N잡러(직장 + 프리랜서)는 어떻게 신고하나요?',
    answer:
      '근로소득(직장) + 사업소득(프리랜서) 모두 포함해 종합소득세 신고. 직장에서 연말정산 끝나도 5월 종합소득세 신고 의무. 합산 소득이 높아져 누진세율 상위 적용 가능. 또한 건강보험은 부가소득 합산 시 추가 부담.',
  },
  {
    question: '프리랜서 절세 핵심 3가지는?',
    answer:
      '① 영수증 보관, 업무 관련 비용 모두 영수증·세금계산서로 입증. ② 노란우산공제·연금저축, 소득공제·세액공제 활용. ③ 부가세 신고, 일반과세자라면 매입세액공제 누락 없이.',
  },
];

export default function FreelancerSalaryComparisonPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '프리랜서 vs 직장인 비교' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: TITLE,
    description: DESCRIPTION,
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['프리랜서', '실수령액', '4대보험', '종합소득세', '사업소득'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="min-w-0 flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '프리랜서 vs 직장인 비교' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 7분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  {TITLE}
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  같은 금액의 매출과 연봉은 바로 비교할 수 없습니다. 같은 기간으로 맞춘 뒤 실제
                  사업 비용·최종 세금·보험료를 반영해 비교하세요.
                </p>
              </header>

              <section aria-labelledby="compare-with-your-conditions" className="card space-y-3">
                <h2 id="compare-with-your-conditions" className="text-xl font-semibold">
                  내 조건으로 각각 계산하기
                </h2>
                <p className="text-sm text-text-secondary">
                  각 계산기에서 연봉이나 매출·경비 등 본인 조건을 직접 입력하세요. 입력값은 자동으로
                  전달되지 않습니다.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <GuideCalculatorLink source="freelancer-salary-comparison" target="salary">
                    직장인 월 실수령액 추정
                  </GuideCalculatorLink>
                  <GuideCalculatorLink source="freelancer-salary-comparison" target="freelancer-tax">
                    프리랜서 소득세·정산액 추정
                  </GuideCalculatorLink>
                </div>
                <p className="text-sm text-text-secondary">
                  프리랜서 세금·정산액 추정은 실제로 쓸 수 있는 돈이나 보험료를 계산한 값이
                  아닙니다. 실제 사업 비용과 공단에서 확인한 보험료는 별도로 비교하세요.
                </p>
              </section>

              <section aria-label="요약 비교" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-3 text-xl font-bold">한눈에 보기, 핵심 차이</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm" data-speakable>
                    <caption className="sr-only">프리랜서와 직장인 핵심 차이 비교</caption>
                    <thead>
                      <tr className="border border-border-base bg-primary-500/10">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2">프리랜서 (사업소득)</th>
                        <th className="px-3 py-2">직장인 (근로소득)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">소득 분류</td>
                        <td className="px-3 py-2">사업소득</td>
                        <td className="px-3 py-2">근로소득</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">원천징수</td>
                        <td className="px-3 py-2">3.3% (사업소득세 3 + 지방세 0.3)</td>
                        <td className="px-3 py-2">간이세액표 기준</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">4대보험 본인부담</td>
                        <td className="text-danger-700 dark:text-danger-300 px-3 py-2">
                          국민연금·지역 건강보험 본인 부담
                        </td>
                        <td className="px-3 py-2 text-primary-700 dark:text-primary-300">
                          연금·건강보험 절반, 고용·산재는 별도
                        </td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">경비 인정</td>
                        <td className="px-3 py-2 text-primary-700 dark:text-primary-300">
                          실제 필요경비 또는 적용 가능한 추계 경비율
                        </td>
                        <td className="px-3 py-2">총급여 구간별 근로소득공제</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신고</td>
                        <td className="px-3 py-2">5월 종합소득세 (본인 신고)</td>
                        <td className="px-3 py-2">2월 연말정산 (회사 처리)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">퇴직금</td>
                        <td className="text-danger-700 dark:text-danger-300 px-3 py-2">없음</td>
                        <td className="px-3 py-2">법정 (1년 이상)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">고용 안정</td>
                        <td className="px-3 py-2">계약 유연 (불안정)</td>
                        <td className="px-3 py-2">정규직 보호</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">직장인 예시: 연 3천만·5천만·1억원</h2>
                <p>
                  퇴직금 별도, 비과세 급여 없음, 본인만 기본공제, 자녀세액공제 없음, 2026년 7월
                  보험료 기준입니다. 급여 계산기와 같은 함수로 산출하며, 실제 국세청 간이세액표
                  조회가 아닌 소득세 근사치입니다. 사회보험료 공제·근로소득세액공제·특별공제와 실제
                  연말정산은 반영하지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left">월급·보험료·세금 참고 예시</caption>
                    <thead>
                      <tr>
                        <th scope="col">연봉</th>
                        <th scope="col">월 보험료</th>
                        <th scope="col">월 소득세·지방세</th>
                        <th scope="col">월 실수령 추정</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SALARY_EXAMPLES.map((row) => (
                        <tr key={row.annualGrossIncome} className="border-b border-border-base">
                          <td className="p-3">{formatKRW(row.annualGrossIncome)}</td>
                          <td className="p-3">{formatKRW(row.totalInsuranceDeductions)}</td>
                          <td className="p-3">
                            소득세 {formatKRW(row.incomeTax)} / 지방세{' '}
                            {formatKRW(row.localIncomeTax)}
                          </td>
                          <td className="p-3">{formatKRW(row.monthlyNetIncome)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  하반기 기준을 매월 같게 적용한 예시이며, 국민연금 상하한에 해당하는 경우 1~6월
                  값은 달라질 수 있습니다.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">프리랜서 매출과 비교하는 순서</h2>
                <ol className="ml-5 list-decimal space-y-2">
                  <li>
                    총매출에서 실제 사업에 쓴 비용을 확인합니다. 세금 산정용 경비율과 현금 지출은
                    구분합니다.
                  </li>
                  <li>
                    사업소득·인적공제·실제 보험료 납부액 등을 입력해 최종 종합소득세와 지방소득세를
                    추정합니다. 3.3% 원천징수는 기납부세액이므로 최종 세금에 다시 더해 빼지
                    않습니다.
                  </li>
                  <li>
                    공단에서 확인한 지역 건강보험료와 국민연금 납부액을 반영합니다. 매출을 국민연금
                    기준소득으로 단정하거나 지역 건강보험료를 임의로 정하지 않습니다.
                  </li>
                  <li>
                    실제로 쓸 수 있는 금액과 별개로 퇴직금, 유급휴가, 장비·사무실 비용, 계약 공백을
                    비교합니다.
                  </li>
                </ol>
                <p>
                  개인별 실제 비용과 보험료가 없으므로 프리랜서의 확정 실수령액이나 직장인 대비
                  우위를 일률적인 금액으로 제시하지 않습니다.
                </p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="text-danger-700 dark:text-danger-300 mb-2 text-lg font-semibold">
                  주의사항
                </h2>
                <ul className="text-danger-700 dark:text-danger-300 space-y-2 text-sm">
                  <li>
                    • 급여 예시는 근사 세금 계산이며 실제 급여명세서·연말정산과 차이가 납니다.
                    프리랜서 매출과 직접 비교하지 마세요.
                  </li>
                  <li>
                    • 지역 건강보험료는 소득·재산 등, 국민연금은 신고한 기준소득월액과 가입조건을
                    확인해야 합니다. 자동차에 대한 지역 건강보험료 부과는 2024년 폐지되었습니다.
                  </li>
                  <li>• 프리랜서 종합소득세 신고는 5월. 무신고 시 가산세 20%, 반드시 신고.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 도구</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/freelancer-tax/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      프리랜서 종합소득세 계산기
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/salary/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      연봉 실수령액 계산기 (직장인)
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/n-jobber-insurance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      N잡러 건강보험 계산기
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/vat/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      부가가치세 계산기 (프리랜서 사업자)
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/salary-negotiation-take-home/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      연봉 협상 실수령액 가이드
                    </Link>
                    , 세전 인상액이 세후로 얼마나 남는지 협상 전 확인
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §19·§20 · 국민건강보험법 §69 · 국민연금법 §88
                  · 소득세법 §55. 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0206000000.jsp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 홈택스 종합소득세 신고
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nhis.or.kr/nhis/together/wbhkup02400m01.do"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국민건강보험공단 지역가입자 보험료 계산
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0038M0.do?menuId=MN24001113"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국민연금공단 보험료 기준
                  </a>
                  ,{' '}
                  <a
                    href="https://www.mohw.go.kr/menu.es?mid=a10705010500"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline"
                  >
                    2026년 건강보험 요율
                  </a>
                  ,{' '}
                  <a
                    href="https://www.mohw.go.kr/menu.es?mid=a10712030100"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline"
                  >
                    2026년 장기요양보험 요율
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}
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
