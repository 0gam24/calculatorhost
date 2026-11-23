import type { Metadata } from 'next';
import Link from 'next/link';
import { QuickTable } from '@/components/calculator/QuickTable';
import { yearEndTaxQuickTable } from '@/lib/quick-tables/year-end-tax';
import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { AuthorByline } from '@/components/calculator/AuthorByline';
import { HowToSteps } from '@/components/calculator/HowToSteps';
import {
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';
import { YearEndTaxCalculator } from './YearEndTaxCalculator';
import { calculateYearEndTax } from '@/lib/tax/year-end-tax';
import { INCOME_TAX_BRACKETS } from '@/lib/constants/tax-rates-2026';

const URL = 'https://calculatorhost.com/calculator/year-end-tax/';
const DATE_PUBLISHED = '2026-11-23';
const DATE_MODIFIED = '2026-11-23';
const TITLE = '연말정산 계산기 2026 | 환급액·결정세액 조회';
const DESCRIPTION =
  '총급여와 신용카드·연금·월세·의료비 공제를 넣어 2026년 귀속 연말정산 결정세액과 예상 환급액을 계산합니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    '연말정산 계산기',
    '연말정산 환급액 계산기',
    '2026 연말정산 계산기',
    '연말정산 결정세액',
    '신용카드 소득공제 한도',
    '연금저축 세액공제',
    '월세 세액공제',
    '소득세법 59조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const formatWon = (value: number) => `${Math.round(value).toLocaleString('ko-KR')}원`;

// 본문 사례는 모두 순수 함수로 빌드 타임 산출 (수기 하드코딩 금지)
const EXAMPLE_50M_BASE = calculateYearEndTax({
  annualGrossSalary: 50_000_000,
  dependents: 1,
  children: 0,
  creditCardSpend: 10_000_000,
  debitAndCashSpend: 10_000_000,
  prePaidTaxMode: 'auto',
});

const EXAMPLE_50M_OPTIMIZED = calculateYearEndTax({
  annualGrossSalary: 50_000_000,
  dependents: 1,
  children: 0,
  creditCardSpend: 10_000_000,
  debitAndCashSpend: 10_000_000,
  pensionSavings: 6_000_000,
  annualRent: 6_000_000,
  prePaidTaxMode: 'auto',
});

const EXAMPLE_70M_FAMILY = calculateYearEndTax({
  annualGrossSalary: 70_000_000,
  dependents: 4,
  children: 2,
  creditCardSpend: 18_000_000,
  debitAndCashSpend: 14_000_000,
  pensionSavings: 6_000_000,
  irpContribution: 3_000_000,
  prePaidTaxMode: 'auto',
});

const FAQ_ITEMS = [
  {
    question: '연말정산 환급액은 어떤 공식으로 정해지나요?',
    answer:
      '연말정산 정산액은 "총 결정세액(소득세+지방소득세 10%) − 연간 기납부세액"으로 구합니다. 1년간 월급에서 미리 뗀 세금(기납부세액)이 최종 결정세액보다 많으면 차액을 돌려받고(환급), 적으면 부족분을 추가로 냅니다(추가납부). 공제를 아무리 많이 받아도 환급액은 본인이 이미 낸 기납부세액을 넘을 수 없습니다.',
  },
  {
    question: '2026년 귀속 연말정산에서 신용카드 소득공제 한도가 어떻게 바뀌었나요?',
    answer:
      '조세특례제한법 §126의2 개정에 따라 2026년 사용분부터 기본공제 대상 자녀 수에 따라 신용카드 기본한도가 늘어납니다. 총급여 7,000만 원 이하는 자녀 없음 300만 원, 자녀 1명 350만 원, 2명 이상 400만 원이며, 총급여 7,000만 원 초과는 자녀 없음 250만 원, 자녀 1명 275만 원, 2명 이상 300만 원입니다. 전통시장·대중교통·문화비 추가한도(7,000만 이하 300만·초과 200만)는 별도로 합산됩니다.',
  },
  {
    question: '신용카드와 체크카드를 어떤 순서로 써야 공제에 유리한가요?',
    answer:
      '카드 소득공제는 총급여의 25%를 초과한 금액부터 적용됩니다. 법정 공제 순서는 공제율이 낮은 신용카드(15%)부터 25% 문턱을 채우고, 그 초과분에 체크카드·현금영수증(30%)과 전통시장·대중교통(40%)을 적용합니다. 따라서 총급여 25%까지는 혜택이 좋은 신용카드를 쓰고, 초과분부터 체크카드·현금영수증을 쓰는 방식이 유리합니다.',
  },
  {
    question: '연금저축과 IRP는 1년에 얼마까지 세액공제를 받나요?',
    answer:
      '소득세법 §59의3에 따라 연금저축은 연 600만 원, 개인형퇴직연금(IRP)을 합치면 연 최대 900만 원까지 세액공제 대상이 됩니다. 총급여 5,500만 원 이하는 15%(지방소득세 포함 16.5%, 최대 148만 5천 원), 5,500만 원 초과는 12%(지방소득세 포함 13.2%, 최대 118만 8천 원)를 산출세액에서 바로 빼줍니다.',
  },
  {
    question: '월세 세액공제 조건과 공제 한도는 어떻게 되나요?',
    answer:
      '조세특례제한법 §95의2에 따라 총급여 8,000만 원 이하(종합소득금액 7,000만 원 이하) 무주택 세대주가 국민주택규모(85㎡) 이하 또는 기준시가 4억 원 이하 주택에 낸 월세가 대상입니다. 연간 월세 1,000만 원 한도로 총급여 5,500만 원 이하는 17%(최대 170만 원), 5,500만 원 초과~8,000만 원 이하는 15%(최대 150만 원)를 세액공제받습니다.',
  },
  {
    question: '의료비 공제가 0원으로 나오는 이유는 무엇인가요?',
    answer:
      '소득세법 §59의4②에 따라 의료비 세액공제는 연간 총급여의 3%를 초과해 지출한 금액부터 15%가 적용됩니다. 예를 들어 총급여가 5,000만 원이면 150만 원을 넘겨 쓴 의료비만 공제 대상이 되므로, 150만 원 이하로 지출했다면 의료비 세액공제는 0원입니다.',
  },
  {
    question: '2026년 귀속 자녀세액공제 금액은 얼마인가요?',
    answer:
      '소득세법 §59의2에 따라 기본공제 대상 8세 이상 20세 이하 자녀 1명은 연 25만 원, 2명은 연 55만 원(첫째 25만+둘째 30만), 3명부터는 1명당 연 40만 원이 더해져 3명 95만 원, 4명 135만 원을 세액공제받습니다.',
  },
  {
    question: '실제 회사 연말정산 결과와 계산기 값이 다를 수 있나요?',
    answer:
      '네. 본 계산기는 2026년 귀속 기본 공식과 주요 공제를 반영한 추정 도구입니다. 실제로는 회사의 원천징수 비율(80%/100%/120%), 비과세 수당, 추가인적공제(경로우대·장애인·한부모), 주택청약·전세대출·주담대 이자 공제, 중소기업 취업자 감면 여부에 따라 차이가 생기므로 1월 중순 국세청 홈택스 간소화 자료로 최종 확인하세요.',
  },
];

const RELATED = [
  {
    title: '연봉 실수령액 계산기',
    href: '/calculator/salary/',
    description: '2026년 4대보험·간이세액표 기준 월 실수령액과 기납부세액 확인',
  },
  {
    title: '프리랜서 종합소득세 계산기',
    href: '/calculator/freelancer-tax/',
    description: '근로소득 외 3.3% 사업소득이 있을 때 5월 종합소득세 환급 계산',
  },
  {
    title: '퇴직금 계산기',
    href: '/calculator/severance/',
    description: '중도 퇴사 시 퇴직금과 퇴직소득세·IRP 과세이연 확인',
  },
  {
    title: '자녀장려금 계산기',
    href: '/calculator/child-tax-credit/',
    description: '총소득 7,000만 원 미만 가구의 자녀 1인당 최대 100만 원 지급액 조회',
  },
];

export default function YearEndTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '연말정산 계산기 2026',
    description: DESCRIPTION,
    url: URL,
    applicationCategory: 'FinanceApplication',
  });

  const webPageLd = buildWebPageJsonLd({
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    isPartOf: 'https://calculatorhost.com/category/tax/',
  });

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: 'calculatorhost', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    { name: '연말정산 계산기' },
  ]);

  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);

  const howToData = {
    name: '2026년 귀속 연말정산 예상 환급액 계산 방법',
    description: DESCRIPTION,
    steps: [
      {
        name: '연간 총급여와 부양가족 수 입력',
        text: '식대 등 비과세 수당을 뺀 1년 총급여와 기본공제 대상 부양가족·자녀 수를 입력합니다.',
      },
      {
        name: '기납부세액 선택',
        text: '원천징수영수증에 적힌 기납부세액을 알고 있으면 직접 입력하고, 모르면 2026년 간이세액표 자동 추정을 사용합니다.',
      },
      {
        name: '신용카드·체크카드 사용액 입력',
        text: '신용카드(15%), 체크카드·현금영수증(30%), 전통시장·대중교통(40%) 연간 사용액을 각각 입력합니다.',
      },
      {
        name: '연금·월세·의료비 등 세액공제 입력 후 확인',
        text: '연금저축·IRP, 월세, 보장성보험료, 의료비, 교육비, 기부금을 넣으면 총 결정세액과 예상 환급액(또는 추가납부액)이 바로 계산됩니다.',
      },
    ],
  };

  const howtoLd = buildHowToJsonLd(howToData);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <main
            id="main-content"
            className="calculator-page min-w-0 flex-1 px-4 py-5 md:px-8 md:py-8"
          >
            <CalculatorPageContent
              guidesFor="year-end-tax"
              quickTable={<QuickTable data={yearEndTaxQuickTable()} />}
              intro={
                <header>
                  <Breadcrumb
                    items={[
                      { name: 'calculatorhost', href: '/' },
                      { name: '세금', href: '/category/tax/' },
                      { name: '연말정산 계산기' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">연말정산 계산기 2026</h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    연간 총급여와 신용카드·연금저축·월세·의료비 공제를 넣으면 2026년 귀속(2027년
                    1~2월 정산) 결정세액과 예상 환급액을 바로 계산합니다. 2026년 자녀 수별 신용카드
                    한도 확대와 자녀세액공제 상향 기준을 반영했습니다.
                  </p>
                  <AuthorByline datePublished={DATE_PUBLISHED} dateModified={DATE_MODIFIED} />
                </header>
              }
              calculator={<YearEndTaxCalculator />}
              related={<RelatedCalculators items={RELATED} />}
              faq={<FaqSection items={FAQ_ITEMS} />}
              tools={
                <ShareButtons
                  title="연말정산 계산기 2026"
                  url={URL}
                  description="총급여와 공제 항목으로 2026년 귀속 연말정산 결정세액·환급액 바로 계산"
                />
              }
            >
              <HowToSteps name={howToData.name} steps={howToData.steps} />

              <StructuredSummary
                definition="연말정산은 1년간 월급에서 원천징수한 소득세·지방소득세(기납부세액)와 소득세법 §47~§59의4 및 조세특례제한법에 따라 계산한 실제 결정세액을 비교해 차액을 돌려받거나 추가로 내는 정산 절차입니다."
                table={{
                  caption: '2026년 귀속 연말정산 핵심 공제 기준',
                  headers: ['항목', '공제율 · 한도 (법령 근거)'],
                  rows: [
                    ['기본 인적공제', '본인·부양가족 1인당 연 150만 원 (소득세법 §50)'],
                    [
                      '신용카드 등 소득공제',
                      '총급여 25% 초과분 · 신용 15%, 체크·현금 30%, 전통시장·대중교통 40% (조특법 §126의2)',
                    ],
                    [
                      '2026 카드 기본한도',
                      '7,000만 이하 300/350/400만(자녀 0/1/2명+), 초과 250/275/300만',
                    ],
                    ['근로소득세액공제', '산출세액 130만 이하 55%, 초과 30% · 한도 20~74만 원 (§59)'],
                    ['자녀세액공제', '1명 25만, 2명 55만, 3명째부터 각 40만 원 (§59의2)'],
                    [
                      '연금저축·IRP 세액공제',
                      '합산 900만 한도(연금저축 600만) · 5,500만 이하 15%, 초과 12% (§59의3)',
                    ],
                    [
                      '월세 세액공제',
                      '총급여 8,000만 이하, 연 1,000만 한도 · 5,500만 이하 17%, 초과 15% (조특법 §95의2)',
                    ],
                  ],
                }}
                tldr={[
                  '환급 여부는 "총 결정세액(소득세+지방소득세 10%) − 기납부세액"으로 결정됩니다.',
                  '소득공제는 과세표준을 낮춰 한계세율(6~45%)만큼 줄이고, 세액공제는 산출세액에서 직접 뺍니다.',
                  '2026년 귀속부터 20세 이하 자녀 수에 따라 신용카드 기본공제 한도가 최대 100만 원 늘어납니다.',
                  '연금저축·IRP 900만 원 납입 시 총급여 5,500만 원 이하는 지방세 포함 최대 148만 5천 원을 절세합니다.',
                  '공제액이 아무리 커도 환급액은 1년간 이미 낸 기납부세액을 초과할 수 없습니다.',
                ]}
              />

              <section aria-label="연말정산 계산 구조와 세율표" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  연말정산 결정세액은 어떤 순서로 계산되나요?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  연말정산은 ① 총급여에서 근로소득공제(소득세법 §47)를 빼 근로소득금액을 구하고,
                  ② 인적공제(§50)·4대보험료(§51의3·§52)·신용카드 소득공제(조특법 §126의2)를 빼
                  과세표준을 만든 뒤, ③ 8단계 누진세율(소득세법 §55)을 곱해 산출세액을 구합니다.
                  마지막으로 ④ 근로소득·자녀·연금계좌·특별·월세 세액공제를 차감하면 최종 결정세액이
                  나옵니다.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-text-tertiary">
                      2026년 종합소득세 기본세율표 (소득세법 §55①, 지방소득세 10% 별도)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-raised text-left">
                        <th scope="col" className="px-3 py-2 font-semibold">
                          과세표준 구간
                        </th>
                        <th scope="col" className="px-3 py-2 font-semibold">
                          세율
                        </th>
                        <th scope="col" className="px-3 py-2 font-semibold">
                          누진공제액
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {INCOME_TAX_BRACKETS.map((b, idx) => {
                        const prev = idx === 0 ? 0 : (INCOME_TAX_BRACKETS[idx - 1]?.upperBound ?? 0);
                        const rangeLabel =
                          b.upperBound === null
                            ? `${(prev / 100_000_000).toLocaleString('ko-KR')}억 원 초과`
                            : idx === 0
                              ? `${(b.upperBound / 10_000).toLocaleString('ko-KR')}만 원 이하`
                              : `${(prev / 10_000).toLocaleString('ko-KR')}만 원 초과 ~ ${(b.upperBound / 10_000).toLocaleString('ko-KR')}만 원 이하`;
                        return (
                          <tr key={rangeLabel} className="border-b border-border-base">
                            <td className="px-3 py-2">{rangeLabel}</td>
                            <td className="px-3 py-2 tabular-nums">
                              {Math.round(b.rate * 100)}%
                            </td>
                            <td className="px-3 py-2 tabular-nums">
                              {formatWon(b.cumulativeDeduction)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              <section aria-label="실제 계산 사례 비교" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  연봉 5,000만·7,000만 원 실제 계산 사례
                </h2>
                <p className="mb-4 text-text-secondary">
                  같은 연봉이라도 연금저축·월세·부양가족 공제에 따라 결정세액이 수백만 원씩
                  달라집니다. 아래 수치는 모두 위 계산기 함수로 직접 산출한 2026년 귀속 기준
                  사례입니다.
                </p>

                <div className="space-y-4 text-sm text-text-secondary">
                  <div className="rounded-xl border border-border-base bg-bg-raised p-4">
                    <h3 className="mb-1 text-base font-semibold text-text-primary">
                      사례 1. 연봉 5,000만 원 1인 가구 (카드 2,000만 원 사용)
                    </h3>
                    <p>
                      신용카드 1,000만 원 + 체크카드 1,000만 원을 쓰면 최저사용금액(1,250만 원)을
                      넘은 체크카드분에서 {formatWon(EXAMPLE_50M_BASE.cardDeduction)}이 소득공제되고,
                      지방세 포함 총 결정세액은{' '}
                      <strong className="text-text-primary">
                        {formatWon(EXAMPLE_50M_BASE.determinedTotalTax)}
                      </strong>
                      입니다. 간이세액표 추정 기납부세액({formatWon(EXAMPLE_50M_BASE.prePaidTotalTax)}
                      )과 비교하면 약{' '}
                      <strong className="text-text-primary">
                        {EXAMPLE_50M_BASE.refundAmount > 0
                          ? `${formatWon(EXAMPLE_50M_BASE.refundAmount)} 환급`
                          : `${formatWon(EXAMPLE_50M_BASE.additionalTaxAmount)} 추가납부`}
                      </strong>
                      됩니다.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border-base bg-bg-raised p-4">
                    <h3 className="mb-1 text-base font-semibold text-text-primary">
                      사례 2. 위 조건에 연금저축 600만 원 + 월세 600만 원 추가 시
                    </h3>
                    <p>
                      연금계좌 세액공제({formatWon(EXAMPLE_50M_OPTIMIZED.pensionAccountTaxCredit)})와
                      월세 세액공제({formatWon(EXAMPLE_50M_OPTIMIZED.monthlyRentTaxCredit)})가
                      더해져 총 결정세액이{' '}
                      <strong className="text-text-primary">
                        {formatWon(EXAMPLE_50M_OPTIMIZED.determinedTotalTax)}
                      </strong>
                      까지 줄어듭니다. 사례 1과 비교해{' '}
                      <strong className="text-text-primary">
                        {formatWon(
                          EXAMPLE_50M_BASE.determinedTotalTax -
                            EXAMPLE_50M_OPTIMIZED.determinedTotalTax,
                        )}
                      </strong>
                      의 세금을 아낄 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border-base bg-bg-raised p-4">
                    <h3 className="mb-1 text-base font-semibold text-text-primary">
                      사례 3. 연봉 7,000만 원 외벌이 4인 가구 (자녀 2명 + 연금·IRP 900만 원)
                    </h3>
                    <p>
                      인적공제 {formatWon(EXAMPLE_70M_FAMILY.personalDeduction)}, 2026년 자녀 2명
                      신용카드 기본한도 확대({formatWon(EXAMPLE_70M_FAMILY.cardBasicLimit)}),
                      자녀세액공제 {formatWon(EXAMPLE_70M_FAMILY.childTaxCredit)}, 연금계좌
                      세액공제 {formatWon(EXAMPLE_70M_FAMILY.pensionAccountTaxCredit)}가 모두
                      반영되어 총 결정세액은{' '}
                      <strong className="text-text-primary">
                        {formatWon(EXAMPLE_70M_FAMILY.determinedTotalTax)}
                      </strong>
                      (실효세율 {(EXAMPLE_70M_FAMILY.effectiveTaxRate * 100).toFixed(1)}%)이 됩니다.
                    </p>
                  </div>
                </div>
              </section>

              <section aria-label="12월 말까지 챙길 절세 체크리스트" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  12월 31일 전 마지막으로 확인해야 할 절세 포인트
                </h2>
                <ul className="list-disc space-y-2 pl-5 text-text-secondary">
                  <li>
                    <strong className="text-text-primary">연금저축·IRP 납입 마감</strong>: 12월
                    31일 입금분까지만 해당 연도 세액공제(소득세법 §59의3)가 적용됩니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">체크카드·현금영수증 전환</strong>: 이미
                    연간 카드 사용액이 총급여의 25%를 넘겼다면 남은 기간은 공제율 30%인
                    체크카드·현금영수증이 유리합니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">월세 전입신고·송금 증빙</strong>:
                    주민등록상 주소지가 임대차계약서와 일치해야 월세 세액공제(조특법 §95의2)를
                    받을 수 있습니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">기납부세액 확인</strong>: 자세한
                    간소화 일정은{' '}
                    <Link
                      href="/guide/year-end-tax-simplified-service-schedule-2026/"
                      className="text-primary-600 underline dark:text-primary-400"
                    >
                      연말정산 간소화서비스 일정 가이드
                    </Link>
                    에서, 월별 원천징수 확인은{' '}
                    <Link
                      href="/calculator/salary/"
                      className="text-primary-600 underline dark:text-primary-400"
                    >
                      연봉 실수령액 계산기
                    </Link>
                    에서 바로 확인해 보세요.
                  </li>
                </ul>
              </section>

              <section aria-label="참고 법령 및 면책" className="card text-xs text-text-secondary">
                <p className="mb-2">
                  <strong className="text-text-primary">참고 법령 및 공식 출처</strong>:{' '}
                  <a
                    href="https://www.law.go.kr/법령/소득세법"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    국가법령정보센터 소득세법
                  </a>{' '}
                  (§47·§50·§51의3·§52·§55·§59·§59의2·§59의3·§59의4),{' '}
                  <a
                    href="https://www.law.go.kr/법령/조세특례제한법"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    조세특례제한법
                  </a>{' '}
                  (§95의2·§126의2),{' '}
                  <a
                    href="https://www.nts.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    국세청 (nts.go.kr)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.hometax.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    홈택스 (hometax.go.kr)
                  </a>
                  .
                </p>
                <p>
                  <strong className="text-text-primary">면책조항</strong>: 본 계산기는 2026년 귀속
                  현행 세법을 바탕으로 결정세액과 예상 환급액을 추정하는 참고 도구이며, 개별 세무
                  자문이 아닙니다. 실제 세액은 비과세 소득, 추가인적공제, 주택자금공제, 세액감면
                  등에 따라 달라질 수 있으므로 국세청 홈택스(국세상담센터 126) 또는 세무사 확인을
                  권장합니다.
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
