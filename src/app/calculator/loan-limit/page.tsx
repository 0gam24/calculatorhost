import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import { QuickTable } from '@/components/calculator/QuickTable';
import { loanLimitQuickTable } from '@/lib/quick-tables/loan-limit';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { EmbedCodeBox } from '@/components/calculator/EmbedCodeBox';
import { RateBarChart } from '@/components/charts/RateBarChart';
import { MathFormula } from '@/components/seo/MathFormula';
import { DataFreshness } from '@/components/ui/DataFreshness';

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
import bokRates from '@/data/bok-rates.json';
import { LoanLimitCalculator } from './LoanLimitCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';
import { PublicDataCitation } from '@/components/seo/PublicDataCitation';
import { getEcosBaseRateCitation } from '@/lib/publicapi/public-citations';
import { calculateLoanLimit, type LoanLimitInput } from '@/lib/finance/loan-limit';
import { manWon } from '@/lib/quick-tables/format';

const ECOS_BASE_RATE = getEcosBaseRateCitation(bokRates);

const URL = 'https://calculatorhost.com/calculator/loan-limit/';

/** 만 원 아래 버림 표기 */
const man = (n: number): string => manWon(Math.floor(n / 10_000) * 10_000);

// 스트레스 DSR 예시: 그 밖의 수도권 10억 원 집, 연소득 1억, 약정 4.5%, 30년 (2026-10-14, 계산 함수로 생성)
const STRESS_BASE: LoanLimitInput = {
  annualIncome: 100_000_000,
  existingDebtAnnualPayment: 0,
  existingDebtAnnualInterest: 0,
  collateralValue: 1_000_000_000,
  region: 'capitalArea',
  housingStatus: 'general',
  lender: 'bank',
  newLoanAnnualRate: 4.5,
  newLoanTermYears: 30,
  applyStressDsr: true,
  repaymentType: 'amortization',
};
const STRESS_FIXED = calculateLoanLimit({ ...STRESS_BASE, rateType: 'fixed' });
const STRESS_PERIODIC = calculateLoanLimit({ ...STRESS_BASE, rateType: 'periodic' });
const STRESS_VARIABLE = calculateLoanLimit({ ...STRESS_BASE, rateType: 'variable' });

// 사례 3가지 (2026년 10월 규제, 계산 함수로 생성)
const BINDING_LABEL: Record<string, string> = {
  DSR: 'DSR',
  LTV: 'LTV',
  DTI: 'DTI',
  CAP: '주담대 최대한도',
  collateral: '담보가치',
};
const CASES: Array<{ title: string; facts: string[]; input: LoanLimitInput }> = [
  {
    title: '사례 1. 서울(규제지역) 12억 원 아파트, 무주택, 변동형',
    facts: ['연소득 1억 2,000만 원, 기존 대출 없음', '약정금리 연 4.5%, 30년 원리금균등'],
    input: {
      ...STRESS_BASE,
      annualIncome: 120_000_000,
      collateralValue: 1_200_000_000,
      region: 'regulated',
      rateType: 'variable',
    },
  },
  {
    title: '사례 2. 그 밖의 수도권 7억 원, 생애최초, 주기형',
    facts: ['연소득 7,000만 원, 기존 대출 없음', '약정금리 연 4.5%, 30년 원리금균등'],
    input: {
      ...STRESS_BASE,
      annualIncome: 70_000_000,
      collateralValue: 700_000_000,
      region: 'capitalArea',
      housingStatus: 'firstHome',
      rateType: 'periodic',
    },
  },
  {
    title: '사례 3. 지방 4억 원, 무주택, 고정형, 신용대출 있음',
    facts: ['연소득 5,000만 원, 기존 신용대출 1년 원리금 600만 원', '약정금리 연 4.5%, 30년 원리금균등'],
    input: {
      ...STRESS_BASE,
      annualIncome: 50_000_000,
      existingDebtAnnualPayment: 6_000_000,
      existingDebtAnnualInterest: 2_000_000,
      collateralValue: 400_000_000,
      region: 'local',
      rateType: 'fixed',
    },
  },
];

export const metadata: Metadata = {
  title: '대출한도 계산기 2026 | DSR·LTV·DTI 통합',
  description:
    '연소득·집값·지역으로 DSR·LTV와 스트레스 DSR, 수도권 주담대 6억 한도까지 반영해 최대 대출액을 계산합니다.',
  keywords: [
    '대출 한도 계산기',
    'DSR 계산기',
    'DSR계산기',
    '스트레스 DSR 계산기',
    'DSR 대출한도 계산',
    'LTV DTI DSR 계산',
    '주택담보대출 DSR 계산기',
    '2026 DSR',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'DSR 계산기 · 대출한도 2026, 최대 대출액 확인',
    description: '연소득·기존 대출·담보가치로 DSR·LTV·DTI 기준 최대 대출액을 즉시 계산',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSR 계산기 · 대출한도 2026',
    description: '주택담보대출 한도를 DSR·LTV·DTI로 즉시 계산.',
  },
};

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'DSR과 DTI는 어떻게 다른가요?',
    answer:
      'DSR은 모든 대출의 1년 원리금을, DTI는 새 주담대 원리금에 기존 대출 이자만 더해 연소득으로 나눕니다. 은행 DSR 한도는 40%(2금융권 50%)이고 DTI는 규제지역 40%, 그 밖의 지역 60%라서 대부분은 DSR이 먼저 한도를 정합니다.',
  },
  {
    question: '스트레스 DSR이란 무엇인가요?',
    answer:
      '앞으로 금리가 오를 수 있다고 보고, 한도를 계산할 때만 약정금리에 가상의 금리를 더하는 제도입니다. 2026년 10월 현재 수도권·규제지역 주담대는 변동형 3.0%p, 혼합형 2.4%p, 주기형 1.2%p를 더하고(2025년 10월 16일부터 3.0% 기준), 지방 주담대는 변동형 0.75%p를 더합니다(2026년 12월 31일까지). 고정형은 더하지 않으며 실제로 내는 이자는 약정금리 그대로입니다.',
  },
  {
    question: 'LTV는 규제지역별로 얼마인가요?',
    answer:
      '무주택자나 처분조건부 1주택자 기준으로 규제지역(서울 전역 등)은 40%, 그 밖의 수도권과 지방은 70%입니다. 생애최초 구입자는 수도권·규제지역 70%, 지방 80%입니다. 수도권·규제지역에서 집을 살 때는 시가 15억 원 이하 6억 원, 15억 원 초과 25억 원 이하 4억 원, 25억 원 초과 2억 원이라는 최대한도가 따로 있습니다(2025년 10월 16일부터).',
  },
  {
    question: '생애최초 구입자의 LTV·DSR 우대는?',
    answer:
      '생애최초 구입자는 LTV를 수도권·규제지역 70%, 지방 80%까지 받을 수 있고 대출액은 최대 6억 원입니다. DSR 우대는 따로 없어 은행 40% 한도와 스트레스 금리가 똑같이 적용됩니다. 수도권·규제지역에서 집을 사며 주담대를 받으면 6개월 안에 전입해야 합니다.',
  },
  {
    question: '기존 신용대출도 DSR에 포함되나요?',
    answer:
      '네, 포함됩니다. 은행·저축은행·카드사 등 모든 금융권의 신용대출, 카드론, 자동차 할부 같은 가계대출 원리금이 DSR에 들어갑니다. 전세자금대출, 분양 중도금대출처럼 빠지는 대출도 있지만, 수도권·규제지역 1주택자의 전세대출 이자는 2025년 10월 29일부터 DSR에 들어갑니다. 내 대출이 들어가는지는 대출 전 은행에 확인하세요.',
  },
  {
    question: '대출한도를 늘리는 현실적 방법은?',
    answer:
      '① 기존 신용대출·카드론 갚기, ② 고정형이나 주기형 금리 고르기(스트레스 가산이 작아짐), ③ 대출 기간 늘리기(수도권·규제지역은 최장 30년), ④ 소득 증빙 보완, ⑤ 부부 소득을 함께 인정받을 수 있는지 은행에 확인하기 등입니다. 다만 수도권·규제지역에서는 6억 원 같은 최대한도와 LTV를 넘을 수 없습니다.',
  },
  {
    question: '배우자 소득 합산하면 DSR 한도가 얼마나 늘어나나요?',
    answer:
      'DSR 한도는 소득에 비례하므로 인정 소득이 본인 6,000만 원에서 부부 1억 원으로 늘면 DSR 기준 한도도 약 67% 늘어납니다. 다만 배우자의 기존 대출도 함께 계산되고, LTV와 수도권 6억 원 같은 최대한도는 그대로라서 실제 한도가 그만큼 늘지 않을 수 있습니다. 부부 공동 채무는 배우자 신용평점에도 영향을 주니 미리 상의하세요.',
  },
  {
    question: '마이너스 통장은 DSR 계산에서 제외되나요?',
    answer:
      '아니요. 마이너스 통장은 실제로 쓴 금액이 아니라 약정 한도 전체를 대출로 보고 계산하는 것이 원칙입니다. 그래서 쓰지 않는 마이너스 통장이라도 한도를 줄이거나 해지하면 주담대 한도가 늘어날 수 있습니다. 정확한 산입 방식은 대출을 신청할 금융기관에 확인하세요.',
  },
];

const RELATED = [
  { href: '/calculator/loan', title: '대출이자 계산기', description: '상환액·스케줄' },
  { href: '/calculator/salary', title: '연봉 실수령액', description: '세후 급여' },
  { href: '/calculator/acquisition-tax', title: '취득세 계산기', description: '주택 구입 세금' },
  { href: '/calculator/broker-fee', title: '중개수수료 계산기', description: '중개 비용' },
];

export default function LoanLimitPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: 'DSR·대출한도 계산기',
    description:
      '2026년 10월 규제(규제지역 LTV 40%, 수도권·규제지역 주담대 6억·4억·2억 한도, 지역별 스트레스 DSR)를 반영한 주택담보대출 한도 계산기.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'DSR 계산기 · 대출한도 2026',
    description: '주택담보대출 한도를 DSR·LTV·DTI로 즉시 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-10-14',
    isPartOf: getCategoryUrlForCalculator('loan-limit'),
  });
  const howToLd = buildHowToJsonLd({
    name: 'DSR 계산기 사용 방법',
    description: '연소득, 기존 대출, 담보가치를 입력하여 최대 대출액을 계산하는 단계별 가이드',
    steps: [
      { name: '연 소득 입력', text: '본인(또는 부부)의 연간 세전 소득을 입력합니다.' },
      {
        name: '기존 대출 입력',
        text: '기존 주담대, 신용대출, 학자금 등 모든 빌린 금액과 월상환액을 입력합니다.',
      },
      {
        name: '담보가치 입력',
        text: '구매 예정 주택의 예상 가격과 지역을 고릅니다. 지역에 따라 LTV 40~80%와 수도권·규제지역 최대한도(6억·4억·2억 원)가 적용됩니다.',
      },
      {
        name: 'DSR·LTV·DTI 자동 계산',
        text: '입력한 정보로 DSR(은행 40%), LTV, DTI 기준 한도와 지역·금리 유형별 스트레스 금리가 자동 반영됩니다.',
      },
      {
        name: '최대 대출액 확인',
        text: 'DSR·LTV·DTI와 최대한도 중 가장 낮은 금액이 실제 가능 대출액입니다.',
      },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance/' },
    { name: '대출한도' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  // GEO/AEO: 본문 핵심 용어를 LLM이 정확히 인용하도록 DefinedTermSet 마크업
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '대출한도 계산 핵심 용어',
    description: '주택담보대출 한도를 결정하는 3대 규제(DSR·LTV·DTI)와 스트레스 DSR 정의',
    url: `${URL}#glossary`,
    terms: [
      {
        name: 'DSR (총부채원리금상환비율)',
        alternateName: 'DSR',
        description:
          'Debt Service Ratio. 모든 금융권 대출의 1년 원리금 상환액을 연소득으로 나눈 비율. 은행 40%, 2금융권 50% 이하. 산식: (신규+기존 모든 대출 연원리금) ÷ 연소득 × 100. 근거: 금융위원회 가계부채 관리방안.',
        url: 'https://www.fsc.go.kr',
      },
      {
        name: 'LTV (담보인정비율)',
        alternateName: 'LTV',
        description:
          'Loan To Value. 대출액을 집값으로 나눈 비율. 2026년 10월 무주택·처분조건부 1주택 기준 규제지역 40%, 그 밖의 지역 70%, 생애최초 수도권·규제지역 70%·지방 80%. 수도권·규제지역은 시가별 최대한도(6억·4억·2억 원)도 적용.',
        url: 'https://www.fsc.go.kr',
      },
      {
        name: 'DTI (총부채상환비율)',
        alternateName: 'DTI',
        description:
          'Debt To Income ratio. 신규 대출 원리금과 기존 대출 이자를 합산해 연소득으로 나눈 비율. 규제지역 40%, 그 밖의 지역 60%. DSR과 달리 기존 대출은 이자만 포함해 대부분 DSR이 먼저 한도를 정함.',
      },
      {
        name: '스트레스 DSR',
        description:
          '한도를 계산할 때만 약정금리에 가상의 금리를 더해 보수적으로 평가하는 제도. 2026년 10월 수도권·규제지역 주담대 변동형 3.0%p(혼합형 2.4%p, 주기형 1.2%p), 지방 주담대 변동형 0.75%p(2026년 12월 31일까지), 고정형 0.',
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
            <CalculatorPageContent guidesFor="loan-limit"
              quickTable={<QuickTable data={loanLimitQuickTable()} />}
              intro={
                <header>
                  <Breadcrumb
                    items={[
                      { name: '홈', href: '/' },
                      { name: '금융', href: '/category/finance/' },
                      { name: '대출한도(DSR/LTV)' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">
                    DSR 계산기 · 대출한도 2026
                  </h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    소득·주택·부채 조건으로 대출한도 예상치를 확인하세요.
                  </p>
                  <AuthorByline datePublished="2026-04-24" dateModified="2026-10-14" />
                </header>
              }
              calculator={<LoanLimitCalculator />}
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
              tools={
                <>
                  <ShareButtons
                    title="DSR 대출한도 계산기 (2026)"
                    url="https://calculatorhost.com/calculator/loan-limit/"
                  />
                  <EmbedCodeBox
                    embedPath="/embed/loan-limit/"
                    canonicalPath="/calculator/loan-limit/"
                    title="DSR 대출한도 계산기"
                  />
                </>
              }
            >
              <StructuredSummary
                definition="DSR(총부채원리금상환비율)은 모든 대출의 1년 원리금을 연소득으로 나눈 비율로 은행 40%, 2금융권 50% 이하로 묶입니다. LTV(담보인정비율)는 대출액을 집값으로 나눈 비율로 2026년 10월 규제지역 40%, 그 밖의 지역 70%(생애최초 70~80%)이고, 수도권·규제지역은 시가별 주담대 최대한도(6억·4억·2억 원)가 따로 있습니다."
                table={{
                  caption: '2026년 10월 주택담보대출 한도 규제 정리',
                  headers: ['규제', '한도'],
                  rows: [
                    ['DSR (모든 대출)', '은행 40%, 2금융권 50%'],
                    ['LTV (무주택·처분조건부 1주택)', '규제지역 40%, 그 밖의 지역 70%'],
                    ['LTV (생애최초)', '수도권·규제지역 70%, 지방 80%'],
                    ['주담대 최대한도 (수도권·규제지역)', '시가 15억 이하 6억, 25억 이하 4억, 초과 2억'],
                    ['스트레스 금리 (변동형)', '수도권·규제지역 3.0%p, 지방 0.75%p'],
                  ],
                }}
                tldr={[
                  'DSR = (모든 대출 연원리금) / 연소득 × 100 ≤ 40% (2금융권 50%)',
                  'LTV = 대출액 / 집값 × 100 ≤ 40% (규제지역) 또는 70%',
                  '수도권·규제지역은 집값이 아무리 높아도 최대 6억 원 (15억 원 초과 4억, 25억 원 초과 2억)',
                  'DSR·LTV·DTI·최대한도 중 가장 낮은 금액이 최종 대출액입니다.',
                ]}
              />
              <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                <p className="text-sm text-text-secondary">
                  <strong className="text-primary-700 dark:text-primary-300">
                    2026년 10월 기준 규제:
                  </strong>{' '}
                  이 계산기는 10·15 대책(2025년 10월)의 규제지역 LTV 40%·수도권 주담대 최대한도·스트레스
                  금리 3%, 2026년 7월 규제지역 추가 지정(화성 동탄구·용인 기흥구·구리시), 8·13 대책(2026년
                  8월)의 유지 방침을 반영했습니다. 2027년 1월부터는 DSR 소득 계산 방식 등이 바뀔 예정이니
                  대출 직전에는{' '}
                  <a
                    href="https://www.fsc.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold underline"
                  >
                    금융위원회
                  </a>{' '}
                  발표와 은행 안내를 확인하세요.
                </p>
              </div>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">DSR(부채원리금상환비율)이란?</h2>
                <p className="text-text-secondary">
                  DSR은 모든 금융권 대출의 연간 원리금 합계를 연소득으로 나눈 비율입니다. 은행은
                  40%, 2금융권은 50% 이하로 규제합니다.
                </p>
                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="text-sm">
                    <span className="font-semibold">계산식:</span>
                    <br />
                    DSR = (신규 대출 연원리금 + 기존 모든 대출 연원리금) / 연소득 × 100
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">포함 대출:</span>
                    주담대, 신용대출, 학자금, 전세자금, 자동차 등 모든 금융권
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">스트레스 DSR:</span>
                    수도권·규제지역 주담대는 변동형 3.0%p·혼합형 2.4%p·주기형 1.2%p, 지방 주담대는 변동형
                    0.75%p를 약정금리에 더해 DSR을 계산합니다(2026년 10월 기준, 고정형 0).
                  </p>
                </div>
                <p className="text-sm text-text-tertiary">
                  * 금융기관별로 부분 제외 대상(예: 마이너스 통장) 및 우대 방식(예: 자녀수 공제)이
                  다를 수 있으니 대출 전 확인하세요.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">LTV(담보인정비율)이란?</h2>
                <p className="text-text-secondary">
                  LTV는 대출액을 담보 가치(주택가격)로 나눈 비율입니다. 2026년 10월 현재 지역과 주택
                  보유 상태에 따라 40%~80% 범위에서 정해집니다.
                </p>
                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="text-sm">
                    <span className="font-semibold">계산식:</span>
                    <br />
                    LTV = 신규 대출액 / 담보가치 × 100
                  </p>
                  <div className="space-y-2 text-sm">
                    <span className="font-semibold">지역·상태별 한도:</span>
                    <ul className="space-y-1 text-text-secondary">
                      <li>• 규제지역(서울 전역 등), 무주택·처분조건부 1주택: 40%</li>
                      <li>• 그 밖의 수도권·지방, 무주택·처분조건부 1주택: 70%</li>
                      <li>• 생애최초 구입: 수도권·규제지역 70%, 지방 80% (대출 최대 6억 원)</li>
                      <li>• 수도권·규제지역 2주택 이상: 집 구입 주담대 불가</li>
                      <li>
                        • 수도권·규제지역 최대한도: 시가 15억 원 이하 6억 원, 15억 원 초과 25억 원 이하
                        4억 원, 25억 원 초과 2억 원
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">DTI(부채상환비율)이란?</h2>
                <p className="text-text-secondary">
                  DTI는 신규 대출 원리금과 기존 대출 이자를 합산하여 연소득으로 나눈 비율입니다. DSR
                  전면 시행으로 보조 규제 성격이 되었으나 여전히 적용됩니다.
                </p>
                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="text-sm">
                    <span className="font-semibold">계산식:</span>
                    <br />
                    DTI = (신규 대출 연원리금 + 기존 대출 연이자) / 연소득 × 100
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">규제 한도:</span>
                    규제지역 40%, 그 밖의 지역 60%
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">DSR과의 차이:</span>
                    DSR은 모든 대출의 원리금을, DTI는 신규는 원리금, 기존은 이자만 포함합니다.
                  </p>
                </div>
              </section>
              <RateBarChart
                title="대출한도를 정하는 DSR·DTI 규제 비율 (2026)"
                caption="연소득 대비 연간 원리금 비율(DSR)은 은행 40%, 제2금융권 50% 이하로 제한됩니다. DTI는 규제지역 40%, 그 밖의 지역 60%가 한도입니다. 여기에 집값 대비 대출 비율(LTV), 수도권·규제지역 최대한도, 지역·금리 유형별 스트레스 금리가 함께 적용되어 실제 대출한도가 결정됩니다."
                max={70}
                bars={[
                  { label: 'DSR (은행)', value: 40, highlight: true },
                  { label: 'DSR (2금융권)', value: 50 },
                  { label: 'DTI (규제지역)', value: 40 },
                  { label: 'DTI (그 밖의 지역)', value: 60 },
                ]}
              />
              <section className="card space-y-3">
                <h2 className="text-2xl font-bold">
                  2026년 스트레스 DSR이 적용된 주담대 한도는 어떻게 계산하나요?
                </h2>
                <p className="text-sm leading-relaxed text-text-secondary" data-speakable>
                  2026년 10월 현재 수도권·규제지역 주택담보대출은 변동형 기준{' '}
                  <strong>스트레스 금리 3.0%p</strong>, 지방은 <strong>0.75%p</strong>를 약정금리에
                  더해 DSR을 계산합니다. 혼합형·주기형은 이보다 적게, 고정형은 더하지 않습니다. 대출
                  한도는 다음 공식으로 산출합니다.
                </p>
                <MathFormula
                  display
                  className="rounded-lg border border-border-base bg-bg-card p-4 text-base"
                  latex={String.raw`DSR(\%) = \dfrac{\text{신규 월 원리금} \times 12 + \text{기존 모든 대출 연 원리금}}{\text{연소득}} \times 100 \le 40`}
                />
                <div className="rounded-lg border border-border-base bg-bg-card p-4 font-mono text-sm">
                  DSR = (신규 월 원리금 × 12 + 기존 모든 대출 연 원리금) ÷ 연소득 × 100 ≤ 40%
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  여기서 <strong>스트레스 DSR을 적용</strong>하면 신규 월 원리금을 계산할 때 실제
                  약정금리가 아니라 <strong>&quot;약정금리 + 스트레스 금리&quot;</strong>로 원리금을 계산해
                  한도를 정합니다. 실제로 내는 이자는 약정금리 그대로입니다. 참고로 현재 한국은행
                  기준금리는 <PublicDataCitation citation={ECOS_BASE_RATE} />
                  이며, 시중은행 주담대 약정금리는 여기에 가산금리가 더해진 수준입니다.
                </p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  <strong>
                    예시 (그 밖의 수도권 10억 원 집, 연소득 1억 원, 약정금리 연 4.5%, 30년 원리금균등, 기존
                    대출 없음)
                  </strong>
                  : 고정형은 4.5% 그대로 계산해 DSR 한도가 {man(STRESS_FIXED.dsrLimit)}이지만 수도권
                  최대한도 때문에 {man(STRESS_FIXED.finalLimit)}까지입니다. 주기형은{' '}
                  {4.5 + (STRESS_PERIODIC.appliedStressRate ?? 0)}%로 계산해{' '}
                  {man(STRESS_PERIODIC.finalLimit)}, 변동형은 {4.5 + (STRESS_VARIABLE.appliedStressRate ?? 0)}
                  %로 계산해 <strong>{man(STRESS_VARIABLE.finalLimit)}</strong>으로 줄어듭니다. 같은 소득이라도
                  금리 유형에 따라 한도가 1억 원 넘게 달라집니다.
                </p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  <strong>LTV와 최대한도 동시 적용</strong>: DSR을 통과해도 LTV나 최대한도가 더 낮으면
                  그 금액이 최종 한도입니다. 예: 서울(규제지역) 8억 원 집은 LTV 40%로 3억 2,000만 원이
                  한도이고, 그 밖의 수도권 10억 원 집은 LTV 70%(7억 원)보다 최대한도 6억 원이 먼저
                  걸립니다.
                </p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  <strong>기존 대출이 있을 때</strong>: 신용대출·카드론의 1년 원리금이 DSR 분자에 더해져
                  새 주담대 한도가 그만큼 줄어듭니다. 마이너스 통장은 쓴 금액이 아니라 약정 한도 전체를
                  대출로 보는 것이 원칙이라, 쓰지 않는 한도를 줄이면 주담대 한도가 늘 수 있습니다.
                </p>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주의사항</h2>
                <div className="space-y-2 rounded-lg border border-danger-500/20 bg-danger-500/5 p-4">
                  {/* WCAG AA: bg-danger-500/5 위에 text-danger-500(#fc354d) = 3.2:1 (fail).
                      text-danger-700 (#b91c1c) ≈ 6.5:1 (pass) */}
                  <p className="text-danger-700 dark:text-danger-300 text-sm font-medium">
                    이 계산기는 일반적인 규제 기준을 따른 참고용이며, 실제 대출 한도는 다음 요인에
                    따라 달라질 수 있습니다:
                  </p>
                  <ul className="text-danger-700 dark:text-danger-300 space-y-1 text-sm">
                    <li>• 금융기관의 자체 심사 기준 및 우대 정책</li>
                    <li>• 소득 증빙 방식 및 인정도 (급여·사업·임차료·연금 등)</li>
                    <li>• 신용등급, 신용거래 이력</li>
                    <li>• 담보 재감정 결과</li>
                    <li>• 상품별 세부 규정 (예: DSR 산정에 부분 제외 대상)</li>
                    <li>• 금융기관 유동성 및 여신 한도</li>
                  </ul>
                  <p className="text-danger-700 dark:text-danger-300 mt-2 text-sm font-medium">
                    실제 대출 실행은 반드시 금융기관의 여신심사 결과를 따릅니다.
                  </p>
                </div>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">실제 케이스 시뮬레이션 (2026년 10월 규제)</h2>
                <p className="text-sm text-text-secondary">
                  아래 숫자는 위 계산기와 같은 함수로 계산했습니다. 은행 기준, 스트레스 DSR 적용,
                  만 원 아래는 버렸습니다.
                </p>
                <div className="space-y-4">
                  {CASES.map((c) => {
                    const r = calculateLoanLimit(c.input);
                    return (
                      <div key={c.title} className="rounded-lg border border-border-base bg-bg-card p-4">
                        <h3 className="mb-3 font-semibold text-primary-500">{c.title}</h3>
                        <ul className="space-y-1 text-sm text-text-secondary">
                          {c.facts.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                        <div className="mt-3 space-y-1 border-t border-border-base pt-3 text-sm text-text-secondary">
                          <p>
                            <strong>LTV 한도:</strong> {man(r.ltvLimit)} · <strong>DSR 한도:</strong>{' '}
                            {man(r.dsrLimit)}
                            {r.mortgageCap !== null ? (
                              <>
                                {' '}
                                · <strong>최대한도:</strong> {man(r.mortgageCap)}
                              </>
                            ) : null}
                          </p>
                          <p>
                            <strong>결론:</strong> 최대 {man(r.finalLimit)} (한도를 정한 기준:{' '}
                            {BINDING_LABEL[r.bindingConstraint]}), 월 상환액 약{' '}
                            {man(r.monthlyPaymentAtLimit)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">대출한도를 늘리려면?</h2>
                <ul className="space-y-3 text-text-secondary">
                  <li>
                    <span className="font-semibold text-text-primary">1. 연소득 증가</span>
                    <br />
                    자영업자는 사업소득 증명, 재직자는 승진·이직으로 소득 인상. 배우자 소득 추가
                    시뮬레이션도 고려하세요.
                  </li>
                  <li>
                    <span className="font-semibold text-text-primary">2. 기존 대출 상환</span>
                    <br />
                    신용대출·카드론·자동차 할부 같은 기존 대출을 갚으면 그만큼 DSR 여유가 생깁니다.
                    쓰지 않는 마이너스 통장 한도를 줄이는 것도 도움이 됩니다.
                  </li>
                  <li>
                    <span className="font-semibold text-text-primary">3. 대출 기간 늘리기</span>
                    <br />
                    기간이 길수록 월 원리금이 줄어 DSR 한도가 늘어납니다. 수도권·규제지역은 최장
                    30년입니다.
                  </li>
                  <li>
                    <span className="font-semibold text-text-primary">4. 소득 인정 범위 확인</span>
                    <br />
                    부부 소득을 함께 인정받을 수 있는지, 상여금·사업소득 증빙이 빠지지 않았는지 은행에
                    확인하세요.
                  </li>
                  <li>
                    <span className="font-semibold text-text-primary">5. 금리 유형·지역 확인</span>
                    <br />
                    고정형·주기형은 스트레스 가산이 작아 한도가 늘어납니다. 생애최초 자격도 확인하세요.
                    다만 수도권·규제지역 최대한도(6억·4억·2억 원)는 넘을 수 없습니다.
                  </li>
                </ul>
              </section>
              <section
                aria-label="관련 가이드"
                className="card border-l-4 border-l-primary-500 bg-primary-500/5"
              >
                <h2 className="mb-2 text-xl font-semibold">함께 보면 좋은 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <a
                      href="/guide/dsr-loan-limit-tips/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      DSR 대출한도를 늘리는 5가지 실전 방법
                    </a>{' '}
                    , 신용대출 상환·맞벌이 합산·고정금리 활용 등 실전 팁
                  </li>
                  <li>
                    →{' '}
                    <a
                      href="/guide/dsr-regulation-zones/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      비규제·조정·투기과열 DSR·LTV 규제 완전 정리
                    </a>{' '}
                    , 지역별 한도 차이 시뮬레이션
                  </li>
                  <li>
                    →{' '}
                    <a
                      href="https://www.fss.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      금융감독원 금융상품통합비교공시 (finlife)
                    </a>{' '}
                    , 실제 은행별·상품별 DSR 적용 기준 및 우대 정책 확인
                  </li>
                </ul>
              </section>
              <section className="space-y-4 text-sm text-text-tertiary">
                <div className="border-t border-border-base pt-4">
                  <p>
                    <span className="font-semibold text-text-secondary">마지막 업데이트:</span>{' '}
                    2026-10-14
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-text-secondary">
                      근거 및 공식 출처:
                    </span>
                  </p>
                  <ul className="mt-1 space-y-1">
                    <li>
                      <a
                        href="https://www.fsc.go.kr/po010101/85432"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        금융위원회, 주택시장 안정화를 위한 대출수요 관리 방안 (2025.10.15)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.fsc.go.kr/no010101/86606"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        금융위원회, 2026년도 가계부채 관리방안 (2026.4.1)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.fsc.go.kr/no010101/87222"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        금융위원회, 규제지역 추가 지정 관련 긴급 가계부채 점검회의 (2026.6.30)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.korea.kr/news/policyNewsView.do?newsId=148945077"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        정책브리핑, 수도권·규제지역 주담대 최대 6억 원 (2025.6.27)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.bok.or.kr"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        한국은행, 기준금리 결정사항
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.fss.or.kr"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        금융감독원, 가계대출 규제·동향
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://finlife.fss.or.kr"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        금감원 금융상품통합비교공시 (finlife)
                      </a>
                    </li>
                  </ul>
                </div>

                {/* 공공데이터 출처 */}
                <DataFreshness
                  source="한국은행 ECOS"
                  fetchedAt={bokRates.fetchedAt}
                  status={bokRates.source === 'live' || bokRates.source === 'manual' ? bokRates.source : 'fallback'}
                />

                <div className="border-t border-border-base pt-4">
                  <p className="mb-2 font-semibold text-text-secondary">면책조항</p>
                  <p>
                    본 계산기는 참고용일 뿐, 법적 조언이 아닙니다. 실제 대출 한도는 금융기관의
                    여신심사 결과에 따라 달라질 수 있습니다. 정확한 한도 확인은 이용할 금융기관에
                    문의하시기 바랍니다. 본 사이트는 이 계산기 사용으로 인한 손실이나 손해에 대해
                    책임을 지지 않습니다.
                  </p>
                </div>
              </section>
            </CalculatorPageContent>
          </main>

          {/* 우측 AdSense 사이드바 (lg+) */}
          {/* AD-3 우측 Skyscraper (lg+) */}
        </div>
        <Footer />
      </div>
    </>
  );
}
