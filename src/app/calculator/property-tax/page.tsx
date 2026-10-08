import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RateBarChart } from '@/components/charts/RateBarChart';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { EmbedCodeBox } from '@/components/calculator/EmbedCodeBox';
import Icon from '@/components/ui/Icon';
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
import { AuthorByline } from '@/components/calculator/AuthorByline';
import { PropertyTaxCalculator } from './PropertyTaxCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { calculatePropertyTaxTotal } from '@/lib/tax/property';
import { formatKRW } from '@/lib/utils';

const URL = 'https://calculatorhost.com/calculator/property-tax/';
const ASSESSMENT_DESCRIPTION =
  '2026년 주택 과세표준은 공시가격에 공정시장가액비율을 곱합니다. 일반 주택은 60%, 1세대1주택으로 인정되는 주택은 공시가격 3억 원 이하 43%, 3억 원 초과 6억 원 이하 44%, 6억 원 초과 45%입니다. 9억 원을 넘는 1세대1주택도 비율은 45%이며, 9억 원 상한은 특례세율에 적용됩니다(지방세법 §110, 시행령 §109).';
const SPECIAL_RATE_DESCRIPTION =
  '지방세법 §111의2의 특례세율은 공시가격 9억 원 이하의 1세대1주택에 적용됩니다. 일반 주택 세율에서 각 구간별 0.05%p를 낮춘 0.05%·0.1%·0.2%·0.35%이며, 세액이 일률적으로 절반이 되는 것은 아닙니다. 공정시장가액비율 특례와 세율 특례는 별도로 판단합니다.';
const PROPERTY_PRICE_EXAMPLES = [
  300_000_000, 600_000_000, 900_000_000, 1_200_000_000, 1_500_000_000,
].map((publishedPrice) => ({
  publishedPrice,
  result: calculatePropertyTaxTotal({
    publishedPrice,
    oneHouseholdOneHouse: true,
    urbanArea: true,
  }),
}));
const PROPERTY_GENERAL_EXAMPLES = [300_000_000, 600_000_000, 1_000_000_000, 1_500_000_000].map(
  (publishedPrice): [string, string] => [
    `${publishedPrice / 100_000_000}억 원`,
    formatKRW(
      calculatePropertyTaxTotal({ publishedPrice, oneHouseholdOneHouse: false, urbanArea: false })
        .totalTax,
    ),
  ],
);
const TITLE = '재산세 계산기 2026 | 공시가격·1세대1주택·도시지역분';
const DESCRIPTION =
  '공시가격과 1세대1주택 여부로 재산세·지방교육세·도시지역분을 계산합니다. 세부담 상한은 반영하지 않습니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    '재산세 계산기',
    '주택 재산세 계산',
    '공시가격 재산세',
    '1세대1주택 재산세 특례',
    '재산세 7월 9월 납부',
    '2026 재산세',
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

const FAQ_ITEMS = [
  {
    question: '재산세 과세표준은 어떻게 산정하나요?',
    answer: ASSESSMENT_DESCRIPTION,
  },
  {
    question: '1세대1주택 특례 조건은?',
    answer: SPECIAL_RATE_DESCRIPTION,
  },
  {
    question: '도시지역분은 무엇인가요?',
    answer:
      '도시지역분은 도시계획구역 내 주택에 추가로 부과되는 세금으로, 과세표준의 0.14%입니다(지방세법 §112). 도시계획구역 외(비도시)라면 도시지역분은 부과되지 않습니다.',
  },
  {
    question: '지방교육세는 언제 같이 부과되나요?',
    answer:
      '본 계산기는 도시지역분을 제외한 재산세 본세의 20%를 지방교육세로 합산합니다(지방세법 §151). 별도 감면·비과세는 반영하지 않으며 실제 고지서는 담당 지자체에 확인하세요.',
  },
  {
    question: '재산세 납부 시기는?',
    answer:
      '주택 재산세는 원칙적으로 7월과 9월에 나누어 납부하며, 소액 세액의 일괄 부과 여부와 실제 납부액은 고지서에서 확인해야 합니다. 이 계산기의 7월·9월 금액은 산출한 합계를 기준으로 나눈 참고값입니다.',
  },
  {
    question: '세부담 상한은 어떻게 적용되나요?',
    answer:
      '재산세는 「지방세법」에서 정한 세부담 상한 제도가 있습니다. 전년도 세액의 일정 비율 이상 인상될 수 없도록 제한됩니다. 본 계산기는 이 상한을 고려하지 않으므로 실제 고지액과 다를 수 있습니다.',
  },
  {
    question: '6월 1일에 집을 사면 재산세는 누가 내나요?',
    answer:
      '재산세의 과세기준일은 6월 1일입니다(지방세법 §114). 거래 중이라면 잔금일·등기일 등 취득 시기와 그날의 소유관계를 확인해야 합니다. 단순히 등기일을 앞당기면 새 소유자가 절세한다는 뜻은 아닙니다. 구체적인 납세의무자는 관할 지방자치단체에 확인하세요.',
  },
  {
    question: '재산세를 신용카드로 납부하거나 분할 납부할 수 있나요?',
    answer:
      '재산세는 위택스(wetax.go.kr)에서 신용카드, 직계좌이체 등으로 납부 가능합니다. 세액 250만 원 초과 시 지방세징수법에 따라 분할납부 신청이 가능하므로, 납부 기한 전에 관할 지자체 세무과에 문의하시기 바랍니다.',
  },
  {
    question: '재산세 납부 기한을 놓치면 어떻게 되나요?',
    answer:
      '납부 기한(7월 16~31일, 9월 16~30일)을 초과하면 지방세징수법에 따라 납부지연가산세가 부과됩니다. 가산세는 미납액의 일정 비율이므로, 지연 기간이 길어질수록 납부액이 증가합니다. 가능한 빨리 납부하시길 권장합니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/acquisition-tax', title: '취득세', description: '주택 구매 시' },
  { href: '/calculator/capital-gains-tax', title: '양도소득세', description: '주택 판매 시' },
  { href: '/calculator/broker-fee', title: '중개수수료', description: '거래수수료' },
];

export default function PropertyTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '재산세 계산기',
    description: DESCRIPTION,
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 계산기 2026',
    description: DESCRIPTION,
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-10-01',
    isPartOf: getCategoryUrlForCalculator('property-tax'),
  });
  const howToLd = buildHowToJsonLd({
    name: '재산세 계산기 사용 방법',
    description: DESCRIPTION,
    steps: [
      { name: '공시가격 입력', text: '주택의 공시가격을 원 단위로 입력합니다.' },
      {
        name: '1세대1주택 조건 선택',
        text: '1세대1주택 해당 여부를 선택합니다. 2026년 공정시장가액비율 43%·44%·45%를 적용하고, 공시가격 9억 원 이하이면 특례세율도 적용합니다.',
      },
      { name: '도시지역 조건 선택', text: '도시지역분을 포함할 경우 도시지역 항목을 선택합니다.' },
      {
        name: '추정 결과 확인',
        text: '재산세 본세·지방교육세·선택한 도시지역분을 확인합니다. 지역자원시설세와 세부담 상한은 제외되므로 실제 고지액과 다를 수 있습니다.',
      },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    { name: '재산세' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  // 과세표준 비율과 특례세율은 별도 조건으로 설명한다.
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '재산세 핵심 용어',
    description:
      '주택 재산세 산정에 필요한 과세표준·공정시장가액비율·1세대1주택 특례·도시지역분·과세기준일 정의',
    url: `${URL}#glossary`,
    terms: [
      {
        name: '과세표준',
        description:
          '재산세 세율을 곱하기 전 기준 금액. 산식: 시가표준액(공시가격) × 공정시장가액비율. 근거: 지방세법 §110.',
      },
      {
        name: '공정시장가액비율',
        description: ASSESSMENT_DESCRIPTION,
      },
      {
        name: '1세대1주택 특례세율',
        description: SPECIAL_RATE_DESCRIPTION,
        url: 'https://www.wetax.go.kr',
      },
      {
        name: '도시지역분',
        description:
          '도시계획구역 내 부동산에 재산세와 함께 부과되는 과세. 과세표준 × 0.14%. 근거: 지방세법 §112.',
      },
      {
        name: '과세기준일',
        description:
          '재산세 납세의무자를 판정하는 기준일(매년 6월 1일). 이 날의 소유자가 그 해 재산세 전액을 부담. 근거: 지방세법 §114.',
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
                      { name: '세금', href: '/category/tax/' },
                      { name: '재산세' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">재산세 계산기 2026</h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    주택 공시가격과 1세대1주택·도시지역 조건으로 재산세를 추정하세요.
                  </p>
                  <AuthorByline datePublished="2026-04-24" dateModified="2026-10-01" />
                </header>
              }
              calculator={<PropertyTaxCalculator />}
              related={
                <>
                  <Link
                    data-search-guide-link
                    href="/guide/category/tax-real-estate/"
                    className="inline-flex min-h-12 items-center text-sm font-medium text-primary-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300"
                  >
                    보유세·납부 조건 안내 찾기
                  </Link>
                  <RelatedCalculators items={RELATED} />
                </>
              }
              faq={
                <>
                  <FaqSection items={[...FAQ_ITEMS]} />
                </>
              }
              tools={
                <>
                  <ShareButtons
                    title="재산세 계산기 (2026)"
                    url="https://calculatorhost.com/calculator/property-tax/"
                  />
                  <EmbedCodeBox
                    embedPath="/embed/property-tax/"
                    canonicalPath="/calculator/property-tax/"
                    title="재산세 계산기"
                  />
                </>
              }
            >
              <StructuredSummary
                definition="재산세는 주택 등 재산에 매년 부과되는 지방세입니다. 2026년 주택 과세표준은 공시가격에 일반 60% 또는 1세대1주택 43%·44%·45%를 곱합니다. 재산세 본세와 지방교육세, 선택한 도시지역분을 합산한 참고값을 계산합니다."
                table={{
                  caption:
                    '일반 주택 참고 합계: 공정시장가액비율 60%, 도시지역분 제외, 본세·교육세 합계',
                  headers: ['공시가격', '예상 재산세'],
                  rows: PROPERTY_GENERAL_EXAMPLES,
                }}
                tldr={[
                  '과세표준 = 공시가격 × 적용 비율(일반 60%, 1세대1주택 43%·44%·45%)',
                  '1세대1주택 특례세율: 공시가격 9억 원 이하에 별도 적용',
                  '도시지역분 0.14% + 지방교육세 20% 추가',
                  '7월·9월 표시액은 참고 분할이며 실제 납부는 고지서 확인',
                  '세부담 상한 제도 있음 (본 계산기 미반영)',
                ]}
              />
              <section aria-label="공시가격별 연 재산세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  공시가격별 재산세는 1년에 얼마인가요?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  2026년 1세대1주택으로 인정되는 공시가격 6억 원 주택은 공정시장가액비율 44%와
                  특례세율을 적용합니다. 본세 348,000원과 지방교육세 69,600원을 합하면 도시지역분
                  제외 417,600원입니다. 도시지역분 369,600원을 포함하면 787,200원이며, 세부담
                  상한·지역자원시설세·별도 감면은 제외한 참고 합계입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-xs text-text-tertiary">
                      표. 2026년 1세대1주택 참고 합계 (본세·교육세·도시지역분, 공시가격별 비율 적용)
                    </caption>
                    <thead>
                      <tr className="border border-border-base bg-primary-500/10">
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-bold text-text-primary"
                        >
                          공시가격
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-bold text-text-primary"
                        >
                          연 참고 합계
                        </th>
                        <th scope="col" className="px-4 py-3 text-left font-bold text-text-primary">
                          비고
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {PROPERTY_PRICE_EXAMPLES.map(({ publishedPrice, result }) => (
                        <tr
                          key={publishedPrice}
                          className="hover:bg-bg-card/50 border border-border-base"
                        >
                          <td className="px-4 py-2 text-right tabular-nums">
                            {publishedPrice / 100_000_000}억 원
                          </td>
                          <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                            {formatKRW(result.totalTax)}
                          </td>
                          <td className="px-4 py-2">
                            비율 {Math.round(result.assessmentRatio * 100)}% ·{' '}
                            {result.appliedBracket === 'oneHouseSpecial' ? '특례세율' : '일반세율'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  * 1세대1주택·도시지역 조건의 단독 전체 주택 예시입니다. 공시가격 9억 원을 넘으면
                  특례세율은 제외되지만 공정시장가액비율 45%는 유지됩니다. 공동소유 지분별 계산,
                  별도 특례·감면, 세부담 상한·지역자원시설세는 제외합니다. 고지액을 확정하는 표가
                  아닙니다.
                </p>
              </section>
              <RateBarChart
                title="재산세 일반 세율, 과세표준 구간별 (지방세법 §111)"
                caption="아래는 일반 주택 세율 0.1%~0.4%입니다. 1세대1주택은 공정시장가액비율 43%·44%·45%와 공시가격 9억 원 이하의 특례세율을 별도로 적용합니다. 지방교육세는 도시지역분을 제외한 본세의 20%입니다."
                unit="%"
                max={0.45}
                bars={[
                  { label: '6천만 이하', value: 0.1, display: '0.1%' },
                  { label: '6천만~1.5억', value: 0.15, display: '0.15%' },
                  { label: '1.5억~3억', value: 0.25, display: '0.25%' },
                  { label: '3억 초과', value: 0.4, display: '0.4%', highlight: true },
                ]}
              />
              <section aria-label="재산세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">재산세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  재산세는 주택, 토지, 건물 등 일정 금액 이상의 재산을 소유할 때 매년 부과되는
                  지방세입니다. 주택 공시가격에 일반 60% 또는 인정되는 1세대1주택의 43%·44%·45%를
                  곱해 과세표준을 산정합니다(지방세법 §110, 시행령 §109). 공시가격 9억 원 이하의
                  1세대1주택에는 특례세율도 별도로 적용됩니다.
                </p>
                <p className="text-text-secondary">
                  재산세의 과세기준일은 6월 1일입니다. 일반적인 주택 납기는 7월·9월이며, 실제 납기와
                  일괄 고지 여부는 고지서를 확인하세요. 도시지역분 적용 대상이면 과세표준의 0.14%가
                  추가되고, 도시지역분을 제외한 본세의 20%를 지방교육세로 계산합니다.
                </p>
              </section>
              <section aria-label="재산세 세율" className="card">
                <h2 className="mb-4 text-2xl font-semibold">재산세 세율표</h2>
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left font-medium text-text-primary">
                      일반 세율 (다주택, 공시 9억 초과)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          과세표준
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          세율
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          누진공제
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">6,000만 원 이하</td>
                        <td className="px-3 py-2 text-right text-text-primary">0.1%</td>
                        <td className="px-3 py-2 text-right text-text-secondary">0원</td>
                      </tr>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">6,000만~1.5억 원</td>
                        <td className="px-3 py-2 text-right text-text-primary">0.15%</td>
                        <td className="px-3 py-2 text-right text-text-secondary">3만 원</td>
                      </tr>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">1.5억~3억 원</td>
                        <td className="px-3 py-2 text-right text-text-primary">0.25%</td>
                        <td className="px-3 py-2 text-right text-text-secondary">18만 원</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">3억 원 초과</td>
                        <td className="px-3 py-2 text-right text-text-primary">0.4%</td>
                        <td className="px-3 py-2 text-right text-text-secondary">63만 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left font-medium text-text-primary">
                      1세대1주택 특례 세율 (공시가격 9억 원 이하)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          과세표준
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          세율
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          누진공제
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">6,000만 원 이하</td>
                        <td className="px-3 py-2 text-right font-semibold text-primary-500">
                          0.05%
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary">0원</td>
                      </tr>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">6,000만~1.5억 원</td>
                        <td className="px-3 py-2 text-right font-semibold text-primary-500">
                          0.1%
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary">3만 원</td>
                      </tr>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">1.5억~3억 원</td>
                        <td className="px-3 py-2 text-right font-semibold text-primary-500">
                          0.2%
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary">18만 원</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">3억 원 초과</td>
                        <td className="px-3 py-2 text-right font-semibold text-primary-500">
                          0.35%
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary">63만 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-text-tertiary">
                  <strong>출처</strong>: 지방세법 §111(일반 세율), §111의2(1세대1주택 특례)
                </p>
              </section>
              <section
                aria-label="재산세 구간별 해설"
                className="card border-l-4 border-l-primary-500"
              >
                <h2 className="mb-3 text-xl font-semibold">왜 4구간 누진세인가?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  재산세가 4구간 누진세인 이유는 지방세법 §111①의 누진세 원칙 때문입니다. 과세표준이
                  높을수록 더 높은 비율로 부담하되, 누진공제로 구간 경계의 급격한 변동을 완화합니다.
                  과세표준 6,000만 원이면 0.1% = 6만 원이지만, 1.5억 원이면 0.15% − 3만 공제 =
                  19.5만 원으로 약 3배 이상 늘어납니다.
                </p>
                <p className="text-text-secondary" data-speakable>
                  {SPECIAL_RATE_DESCRIPTION} 도시지역분은 선택한 경우 과세표준의 0.14%로 계산하고,
                  지방교육세는 도시지역분을 제외한 본세의 20%로 계산합니다. 총액이 일률적으로 절반
                  또는 일정 비율 줄어드는 것은 아닙니다.
                </p>
              </section>
              <section aria-label="공시가격과 과세표준" className="card">
                <h2 className="mb-4 text-2xl font-semibold">공시가격과 과세표준</h2>
                <p className="mb-4 text-text-secondary">{ASSESSMENT_DESCRIPTION}</p>
                <p className="text-text-secondary">
                  <strong>예시</strong>: 1세대1주택 공시가격 6억 원 × 44% = 과세표준 2억 6,400만 원.
                  본세는 2억 6,400만 원 × 0.2% − 18만 원 = 348,000원입니다. 일반 주택으로 계산하면
                  같은 공시가격에도 비율 60%와 일반세율이 적용되므로 조건을 구분해야 합니다.
                </p>
              </section>
              <section aria-label="1세대1주택 특례" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1세대1주택 특례는 언제 적용되나요?</h2>
                <p className="mb-4 text-text-secondary">{SPECIAL_RATE_DESCRIPTION}</p>
                <p className="text-text-secondary">
                  공시가격 9억 원 초과 1세대1주택은 특례세율 대상이 아니어도 2026년 공정시장가액비율
                  45%는 적용합니다. 세대별 주택 수 인정, 공동소유, 일시적 2주택 등 특례 판단은 관할
                  지자체에 확인하세요. 이 계산기는 사용자가 선택한 일반적인 주택 조건의 참고액을
                  산출합니다.
                </p>
              </section>
              <section aria-label="도시지역분 및 지방교육세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">도시지역분과 지방교육세</h2>
                <h3 className="mb-3 text-lg font-medium text-text-primary">도시지역분</h3>
                <p className="mb-4 text-text-secondary">
                  도시지역분은 도시계획구역에 포함된 주택에 대해 추가로 부과되는 세금입니다(지방세법
                  §112). 과세표준의 0.14%로 계산되어 재산세 본세에 더해집니다. 도시계획구역 외 농촌
                  지역이면 도시지역분은 부과되지 않습니다.
                </p>
                <h3 className="mb-3 text-lg font-medium text-text-primary">지방교육세</h3>
                <p className="text-text-secondary">
                  본 계산기는 도시지역분을 제외한 재산세 본세의 20%를 지방교육세로
                  합산합니다(지방세법 §151). 예를 들어 재산세가 100만 원이면 지방교육세는 20만
                  원입니다. 지방교육세의 목적은 학교 건설·시설 개선 등 교육 인프라 구축입니다.
                </p>
              </section>
              <section aria-label="납부 일정" className="card">
                <h2 className="mb-4 text-2xl font-semibold">재산세 납부 일정 및 방법</h2>
                <p className="mb-4 text-text-secondary">
                  주택 재산세는 6월 1일 현재 소유 현황을 기준으로 하며, 원칙적인 납기는 7월과
                  9월입니다. 실제 분할 또는 소액 일괄 부과와 납부 기한은 지자체 고지서에서
                  확인하세요.
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-5 text-text-secondary">
                  <li>
                    <strong>7월 참고액</strong>: 계산기에서 합계의 절반을 올림해 표시합니다.
                  </li>
                  <li>
                    <strong>9월 참고액</strong>: 계산기에서 나머지 금액을 표시합니다.
                  </li>
                  <li>
                    <strong>납부 일정</strong>: 일괄 고지 여부와 실제 금액은 관할 지자체 고지서를
                    확인하세요.
                  </li>
                </ul>
                <p className="text-text-secondary">
                  납부 방법은 은행 납부, 온라인 납부(세정 웹사이트), 편의점 납부 등이 있습니다. 납부
                  기한을 놓치면 가산세와 이자가 부과됩니다.
                </p>
              </section>
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">재산세 계산 공식</h2>
                <ol className="space-y-3 text-sm leading-relaxed">
                  <li>
                    <strong>1. 과세표준 산정</strong>: 공시가격 × 적용 비율(일반 60%, 2026년
                    1세대1주택 43%·44%·45%).
                  </li>
                  <li>
                    <strong>2. 적용 세율 결정</strong>: 1세대1주택(공시 9억 이하) 또는 일반 세율
                    선택.
                  </li>
                  <li>
                    <strong>3. 재산세 본세 계산</strong>: 과세표준 × 세율 − 누진공제(10원 단위
                    절사).
                  </li>
                  <li>
                    <strong>4. 도시지역분 계산</strong>: 과세표준 × 0.14% (도시지역만).
                  </li>
                  <li>
                    <strong>5. 지방교육세 계산</strong>: 재산세 본세 × 20%.
                  </li>
                  <li>
                    <strong>6. 연 참고 합계</strong>: 재산세 본세 + 도시지역분 + 지방교육세.
                  </li>
                  <li>
                    <strong>7. 참고 분할 표시</strong>: 화면의 7월·9월 금액은 단순 분할 참고값이며
                    실제 납부 일정과 고지액을 대체하지 않습니다.
                  </li>
                </ol>
              </section>
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>세부담 상한</strong>: 재산세는 전년도 기준 세부담 상한 제도가 있어,
                    인상률이 제한됩니다. 본 계산기는 이를 반영하지 않으므로 실제 고지액과 차이가 날
                    수 있습니다.
                  </li>
                  <li>
                    <strong>지역자원시설세</strong>: 일부 도시 및 광역시에서는 재산세에
                    지역자원시설세가 추가로 부과됩니다. 본 계산기는 이를 미반영했으므로 추후
                    업데이트 예정입니다.
                  </li>
                  <li>
                    <strong>공시가격 변동</strong>: 공시가격은 매년 6월 말에 발표되며, 부동산 시장
                    변동을 반영하여 조정됩니다. 공시가격이 급상승하면 재산세도 함께 증가할 수
                    있습니다.
                  </li>
                  <li>
                    <strong>조정지역 지정</strong>: 조정지역으로 지정되면 다주택 소유 시 세율이
                    높아집니다. 조정지역 여부는 지역과 시간에 따라 변할 수 있습니다.
                  </li>
                  <li>
                    <strong>1세대1주택 특례 신청</strong>: 특례 대상이어도 신청하지 않으면
                    일반세율을 적용받습니다. 관할청에 신청서를 제출해야 합니다.
                  </li>
                  <li>
                    본 계산기는 참고용이며, 실제 고지액과는 차이가 있을 수 있습니다. 정확한 계산은
                    관할 시청의 세무과에 문의하세요.
                  </li>
                </ul>
              </section>
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">재산세 절세 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>1세대1주택 특례 적극 활용</strong>: 공정시장가액비율과 세율 특례는 적용
                    조건이 다릅니다. 공시가격·세대별 주택 수와 별도 예외를 관할 지자체에 확인하세요.
                  </li>
                  <li>
                    <strong>공시가격 이의 신청</strong>: 공시가격이 과하다고 판단되면 이의
                    신청(4월)을 할 수 있습니다. 이의 신청 수용 시 과세표준이 낮아져 재산세가
                    감소합니다.
                  </li>
                  <li>
                    <strong>세부담 상한 제도 확인</strong>: 공시가격 인상에 따른 세부담 상한이 자동
                    적용되는지 확인하세요. 상한 범위 내에서만 세액이 인상됩니다.
                  </li>
                  <li>
                    <strong>공동소유 확인</strong>: 이 계산기의 전체 주택 참고값을 소유자별
                    고지액으로 나누어 해석하지 마세요. 지분별 과세와 특례 인정 여부는 별도 확인이
                    필요합니다.
                  </li>
                  <li>
                    <strong>생활용·보유목적 명확화</strong>: 실제 거주(생활용)인 경우와 투자 보유인
                    경우 세 부담이 다를 수 있으니, 실제 사용 목적을 명확히 하세요.
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
                    <a
                      href="/guide/june-property-tax/"
                      className="inline-flex items-center gap-1 font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      <Icon name="chevron-right" size={14} />
                      <span>재산세 완벽 가이드 (6월 부과·7월 납부), 7월 시즌 직전 필독</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/guide/property-tax-base-date-june-1-2026/"
                      className="inline-flex items-center gap-1 font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      <Icon name="chevron-right" size={14} />
                      <span>재산세 과세기준일 6월 1일, 매매 잔금 타이밍과 부담자 판정</span>
                    </a>
                  </li>
                </ul>
              </section>
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>
                    2026-05-31: FAQ 3개 추가 (6월 소유자 판정, 카드 납부·분할 납부, 납부 지연
                    가산세)
                  </li>
                  <li>2026-04-24: 2026년 지방세법 기준 초판 공개</li>
                </ul>
              </section>
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>출처</strong>: 지방세법 §110(과세표준), §111(일반 세율),
                  §111의2(1세대1주택 특례), §112(도시지역분), §151(지방교육세) · 시행령 §109(2026년
                  공정시장가액비율). 참고:{' '}
                  <a
                    href="https://www.wetax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    위택스
                  </a>
                  ,{' '}
                  <a
                    href="https://www.reb.or.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국부동산원
                  </a>
                  ,{' '}
                  <a
                    href="https://www.law.go.kr/LSW//lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0109&lsiSeq=290815&urlMode=lsScJoRltInfoR"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    지방세법 시행령 제109조
                  </a>
                  .
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 세부담 상한, 지역자원시설세 등
                  변수는 실제 고지액에 영향을 미칠 수 있습니다. 정확한 재산세 계산 및 신청은 관할
                  시청의 세무과 또는 세무사의 안내를 받으시기 바랍니다.
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
