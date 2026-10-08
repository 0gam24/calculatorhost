import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildHowToJsonLd,
  buildWebPageJsonLd,
  buildDefinedTermSetJsonLd,
  getCategoryUrlForCalculator,
} from '@/lib/seo/jsonld';
import { AuthorByline } from '@/components/calculator/AuthorByline';
import { ComprehensivePropertyTaxCalculator } from './ComprehensivePropertyTaxCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { calculateComprehensivePropertyTax } from '@/lib/tax/comprehensive-property';

/** 요약 표: 1세대1주택, 60세 미만·보유 5년 미만(세액공제 0), 농특세 포함. 함수로 계산해 본문과 계산기가 어긋나지 않게 한다. */
function oneHouseTotal(publishedPrice: number): string {
  const { totalTax } = calculateComprehensivePropertyTax({
    houseCount: 'one',
    totalPublishedPrice: publishedPrice,
    isOneHouseholdOneHouse: true,
    seniorAgeYears: 50,
    holdingYears: 0,
  });
  return totalTax === 0 ? '0원' : `약 ${Math.round(totalTax / 10_000).toLocaleString('ko-KR')}만 원`;
}

const URL = 'https://calculatorhost.com/calculator/comprehensive-property-tax/';

export const metadata: Metadata = {
  title: '종부세 계산기 2026 | 종합부동산세 재산세 공제 반영',
  description:
    '공시가격 합계와 주택 수로 종합부동산세를 계산합니다. 12억·9억 공제, 재산세 중복분, 고령자·장기보유 공제를 반영합니다.',
  keywords: [
    '종합부동산세 계산기',
    '종부세 계산기',
    '1세대1주택 종부세',
    '종부세 공제 12억',
    '다주택자 종부세',
    '종부세 세율 2026',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '종합부동산세 계산기 2026 | 1세대1주택·공정비율',
    description: '주택 공시가 합산으로 종부세 과세 여부와 예상 납부액을 즉시 확인하세요.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합부동산세 계산기 2026 | 1세대1주택·공정비율',
    description: '주택 공시가 합산으로 종부세 과세 여부와 예상 납부액을 즉시 확인하세요.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종합부동산세와 재산세는 무엇이 다른가요?',
    answer:
      '종합부동산세(종부세)는 주택 공시가격 합계가 공제금액을 넘는 사람에게 부과되는 국세이고, 재산세는 모든 주택 보유자에게 매년 부과되는 지방세입니다. 재산세는 공시가 9억 원 이하 1세대1주택이면 특례 세율을 받고, 종부세는 1세대1주택자에게 12억 원 공제(종부세법 §8①)와 고령자·장기보유 세액공제(§9)를 줍니다.',
  },
  {
    question: '1세대1주택자 공제 12억은?',
    answer:
      '종부세법 §8①에 따라 1세대1주택자는 공시가 합계에서 12억 원의 공제를 받습니다. 예를 들어 공시가 15억 원이면 (15억 − 12억) × 60% = 1.8억이 과세표준이 되는데, 다주택자는 9억 원만 공제받아 과세표준이 더 높아집니다. 세대원 전체가 주택 1채만 가져야 하며, 일시적 2주택·상속주택·지방 저가주택은 9월 16~30일에 신청하면 1세대1주택으로 볼 수 있습니다.',
  },
  {
    question: '고령자·장기보유 공제는 어떻게 적용되나요?',
    answer:
      '종부세법 §9에 따라 1세대1주택자가 받을 수 있는 세액공제는: 고령자공제(60~64세 20%, 65~69세 30%, 70세 이상 40%) + 장기보유공제(5~10년 20%, 10~15년 40%, 15년 이상 50%). 두 공제의 합계는 80% 한도입니다. 예: 70세이고 20년 보유하면 (40% + 50%) = 80% 공제가 되어 세액이 80% 감소합니다.',
  },
  {
    question: '3주택 이상 중과세율은 언제 적용되나요?',
    answer:
      '3주택 이상이면 종부세법 §9①2호의 중과 세율표가 적용됩니다. 과세표준 12억 원 이하 구간은 일반 세율(0.5~1.0%)과 같고, 12억 원 초과 구간부터 2.0~5.0%로 높아집니다. 예: 과세표준 20억 원이면 일반 세율로는 20억 × 1.3% − 600만 = 2,000만 원, 중과 세율로는 20억 × 2.0% − 1,440만 = 2,560만 원입니다. 2023년 개정으로 조정대상지역 2주택 중과는 폐지되었습니다.',
  },
  {
    question: '농어촌특별세는 별도인가요?',
    answer:
      '농특세법 §5에 따라 농어촌특별세는 종부세 순세액의 20%로 계산되어 함께 부과됩니다. 예: 종부세가 500만 원이면 농특세는 100만 원이므로 총 납부액은 600만 원입니다. 본 계산기는 농특세를 포함한 최종 납부액을 표시합니다.',
  },
  {
    question: '공정시장가액비율 60%는 무엇인가요?',
    answer:
      '종부세법 시행령에 따라 과세표준은 공시가에 공정시장가액비율 60%를 곱하여 산정합니다. 예: 공시가 15억이면 과세표준 = (15억 − 공제) × 60%. 이는 실제 매매가가 공시가보다 낮을 수 있다는 점을 반영한 제도입니다. 공정시장가액비율은 연도마다 변경될 수 있으므로 관련 공시를 확인하세요.',
  },
] as const;

const RELATED = [
  { href: '/calculator/property-tax', title: '재산세', description: '주택 보유 시 년간' },
  { href: '/calculator/capital-gains-tax', title: '양도소득세', description: '주택 판매 시' },
  { href: '/calculator/acquisition-tax', title: '취득세', description: '주택 구매 시' },
];

export default function ComprehensivePropertyTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '종합부동산세 계산기',
    description: '2026년 종부세법 기준 종합부동산세 계산기',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합부동산세 계산기 2026',
    description:
      '주택 공시가 합계, 주택 수, 공제 조건을 입력해 과세표준과 종부세 납부액을 즉시 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-10-07',
    isPartOf: getCategoryUrlForCalculator('comprehensive-property-tax'),
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    { name: '종합부동산세' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '종합부동산세 계산기 사용 방법',
    description: '보유 주택 수, 공시가, 공제 조건을 입력해 종부세를 계산합니다.',
    steps: [
      {
        name: '보유 주택 수 선택',
        text: '1주택, 2주택, 3주택 이상 중 해당하는 것을 선택합니다.',
      },
      {
        name: '보유 주택 공시가 합계 입력',
        text: '모든 보유 주택의 공시가 합계를 입력합니다. 단위 버튼으로 빠르게 입력할 수 있습니다.',
      },
      {
        name: '1세대1주택 여부 확인 (1주택 선택 시)',
        text: '1주택만 보유한 경우 1세대1주택자 체크박스를 선택하면 12억 원 공제가 적용됩니다.',
      },
      {
        name: '고령자·장기보유 정보 입력 (1세대1주택자 선택 시)',
        text: '만 나이와 보유 연수를 입력하면 고령자·장기보유 세액공제가 자동으로 계산됩니다.',
      },
      {
        name: '결과 확인',
        text: '과세표준, 산출세액, 세액공제, 농특세를 포함한 최종 납부세액이 표시됩니다.',
      },
    ],
  });
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '종합부동산세 계산기 핵심 용어',
    description: '종합부동산세 계산 및 신고에 필요한 주요 용어 정의',
    url: URL,
    terms: [
      {
        name: '공제금액',
        description:
          '종부세 과세표준 산정 시 공시가 합계에서 차감하는 금액. 1세대1주택자는 12억 원, 다주택자는 9억 원의 공제를 받음. 공제를 초과하는 부분만 과세 대상이 됨(종부세법 §8①)',
        alternateName: '기본공제',
        url: 'https://law.go.kr',
      },
      {
        name: '공정시장가액비율',
        description:
          '실제 매매가와 공시가의 차이를 반영하기 위해 공시가에 곱하는 비율로, 일반적으로 60%가 적용됨. 과세표준 = (공시가 합계 - 공제) × 공정시장가액비율(종부세법 시행령)',
        alternateName: '비율 적용',
        url: 'https://www.hometax.go.kr',
      },
      {
        name: '과세표준',
        description:
          '세율을 적용하여 세액을 계산하기 위한 기준이 되는 가액. 종부세는 (보유 주택 공시가 합계 - 공제금액) × 공정시장가액비율 60%로 산정됨. 음수면 0원으로 계산(종부세법 §8)',
        alternateName: '과세 기준액',
        url: 'https://law.go.kr',
      },
      {
        name: '농어촌특별세',
        description:
          '종합부동산세 순세액의 20%로 계산되어 종부세와 함께 부과되는 세금. 예: 종부세 500만 원이면 농특세 100만 원, 총 600만 원 납부(농어촌특별세법 §5)',
        alternateName: '농특세',
        url: 'https://www.realtyprice.kr',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }}
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
                      { name: '종합부동산세' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">
                    종합부동산세 계산기 2026
                  </h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    공시가격과 보유 조건으로 예상 종부세를 확인하세요.
                  </p>
                  <AuthorByline dateModified="2026-10-07" />
                </header>
              }
              calculator={<ComprehensivePropertyTaxCalculator />}
              related={
                <>
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
                    title="종합부동산세 계산기 (2026)"
                    url="https://calculatorhost.com/calculator/comprehensive-property-tax/"
                  />
                </>
              }
            >
              <StructuredSummary
                definition="종합부동산세는 주택 공시가 합계에서 공제를 차감한 후 공정시장가액비율 60%를 적용한 과세표준에 누진세를 곱하고, 농어촌특별세 20%를 더하여 계산되는 국세입니다(종부세법 §8·§9, 농특세법 §5)."
                table={{
                  caption: '1세대1주택 공시가별 종부세 예상액 (농특세 포함, 고령자·장기보유 세액공제 없음)',
                  headers: ['보유 공시가', '예상 종부세'],
                  rows: [
                    ['12억 원', oneHouseTotal(1_200_000_000)],
                    ['15억 원', oneHouseTotal(1_500_000_000)],
                    ['20억 원', oneHouseTotal(2_000_000_000)],
                    ['30억 원', oneHouseTotal(3_000_000_000)],
                  ],
                }}
                tldr={[
                  '종부세 = (공시가 − 공제) × 60% × 세율 − 공제할 재산세액',
                  '1세대1주택: 공제 12억 / 다주택: 공제 9억',
                  '1세대1주택자만 고령자·장기보유 세액공제 80% 한도 적용',
                  '3주택 이상은 과세표준 12억 초과 부분 중과세율 적용',
                  '농어촌특별세는 순세액의 20% (종부세에 포함)',
                ]}
              />
              <section aria-label="종합부동산세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">종합부동산세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  종합부동산세(종부세)는 고가 주택을 다수 보유한 자산가에게 매년 부과되는
                  국세입니다(종부세법 §1). 보유 주택의 공시가 합계에서 공제를 차감한 후,
                  공정시장가액비율 60%를 적용하여 과세표준을 산정하고, 누진세를 적용합니다.
                  1세대1주택자는 12억 원의 공제를 받을 수 있으며, 고령자·장기보유 세액공제도
                  적용됩니다.
                </p>
                <p className="text-text-secondary">
                  다주택자는 9억 원의 공제만 받고, 세액공제 혜택이 없습니다. 3주택 이상을 보유하면
                  과세표준 12억 원을 초과하는 부분부터 중과세율이 적용되어 세 부담이 크게
                  증가합니다. 농어촌특별세법에 따라 종부세의 20%가 농특세로 추가 부과됩니다.
                </p>
              </section>
              <section aria-label="종합부동산세 세율" className="card">
                <h2 className="mb-4 text-2xl font-semibold">종합부동산세 세율표</h2>

                <div className="mb-8">
                  <div className="mb-6 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <caption className="mb-2 text-left font-medium text-text-primary">
                        일반 세율 (1-2주택, 모든 구간)
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
                          <td className="px-3 py-2 text-text-secondary">3억 원 이하</td>
                          <td className="px-3 py-2 text-right text-text-primary">0.5%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">0원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">3억~6억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">0.7%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">60만 원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">6억~12억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">1.0%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">240만 원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">12억~25억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">1.3%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">600만 원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">25억~50억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">1.5%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">1,100만 원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">50억~94억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">2.0%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">3,600만 원</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 text-text-secondary">94억 원 초과</td>
                          <td className="px-3 py-2 text-right text-text-primary">2.7%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">
                            1억 180만 원
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <caption className="mb-2 text-left font-medium text-text-primary">
                        3주택 이상 중과 세율 (과세표준 12억 초과 구간)
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
                          <td className="px-3 py-2 text-text-secondary">3억 원 이하</td>
                          <td className="px-3 py-2 text-right text-text-primary">0.5%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">0원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">3억~6억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">0.7%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">60만 원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">6억~12억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">1.0%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">240만 원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">12억~25억 원</td>
                          <td className="px-3 py-2 text-right font-semibold text-primary-500">
                            2.0%
                          </td>
                          <td className="px-3 py-2 text-right text-text-secondary">1,440만 원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">25억~50억 원</td>
                          <td className="px-3 py-2 text-right font-semibold text-primary-500">
                            3.0%
                          </td>
                          <td className="px-3 py-2 text-right text-text-secondary">3,940만 원</td>
                        </tr>
                        <tr className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">50억~94억 원</td>
                          <td className="px-3 py-2 text-right font-semibold text-primary-500">
                            4.0%
                          </td>
                          <td className="px-3 py-2 text-right text-text-secondary">8,940만 원</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 text-text-secondary">94억 원 초과</td>
                          <td className="px-3 py-2 text-right font-semibold text-primary-500">
                            5.0%
                          </td>
                          <td className="px-3 py-2 text-right text-text-secondary">
                            1억 8,340만 원
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-sm text-text-tertiary">
                    <strong>출처</strong>: 종합부동산세법 §9①1호(2주택 이하), §9①2호(3주택 이상)
                  </p>
                </div>
              </section>
              <section aria-label="공제금액 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">공제금액 비교</h2>
                <p className="mb-4 text-text-secondary">
                  종합부동산세는 보유 주택 구성에 따라 다른 공제금액을 적용합니다(종부세법 §8①).
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          주택 구성
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          공제금액
                        </th>
                        <th className="px-3 py-2 text-text-secondary">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 font-medium text-primary-500">1세대1주택</td>
                        <td className="px-3 py-2 text-right font-semibold text-primary-500">
                          12억 원
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          1주택만 소유, 2주택 이상 아님
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-text-primary">
                          2주택 또는 3주택 이상
                        </td>
                        <td className="px-3 py-2 text-right font-semibold text-text-primary">
                          9억 원
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          다주택 소유자, 세액공제 불가
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-text-secondary">
                  <strong>예시</strong>: 1세대1주택 공시가 15억 원 vs 다주택 공시가 15억 원
                </p>
                <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                  <li>• 1세대1주택: (15억 − 12억) × 60% = 1.8억 과세표준</li>
                  <li>• 다주택: (15억 − 9억) × 60% = 3.6억 과세표준</li>
                  <li>→ 다주택의 과세표준이 2배 높아 종부세 부담이 큼</li>
                </ul>
              </section>
              <section aria-label="세액공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1세대1주택 세액공제</h2>
                <p className="mb-4 text-text-secondary">
                  1세대1주택자만 고령자공제와 장기보유공제를 받을 수 있으며, 합계는 80%
                  한도입니다(종부세법 §9).
                </p>

                <h3 className="mb-3 text-lg font-medium text-text-primary">고령자공제</h3>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          만 나이
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          공제율
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">60세 미만</td>
                        <td className="px-3 py-2 text-right text-text-primary">0%</td>
                      </tr>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">60~64세</td>
                        <td className="px-3 py-2 text-right text-text-primary">20%</td>
                      </tr>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">65~69세</td>
                        <td className="px-3 py-2 text-right text-text-primary">30%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">70세 이상</td>
                        <td className="px-3 py-2 text-right text-text-primary">40%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="mb-3 text-lg font-medium text-text-primary">장기보유공제</h3>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          보유기간
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          공제율
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">5년 미만</td>
                        <td className="px-3 py-2 text-right text-text-primary">0%</td>
                      </tr>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">5~10년 미만</td>
                        <td className="px-3 py-2 text-right text-text-primary">20%</td>
                      </tr>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">10~15년 미만</td>
                        <td className="px-3 py-2 text-right text-text-primary">40%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">15년 이상</td>
                        <td className="px-3 py-2 text-right text-text-primary">50%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-text-secondary">
                  <strong>예시</strong>: 70세 고령자, 20년 보유 = (40% + 50%) = 90%이지만, 80% 한도
                  적용으로 실제는 80% 공제를 받습니다.
                </p>
              </section>
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">종합부동산세 계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>1. 공제금액 결정</strong>: 1세대1주택이면 12억, 다주택이면 9억 원 공제.
                  </li>
                  <li>
                    <strong>2. 과세표준 산정</strong>: (보유 주택 공시가 합계 − 공제) ×
                    60%(공정시장가액비율). 음수면 0원.
                  </li>
                  <li>
                    <strong>3. 세율 구간 선택</strong>: 1-2주택은 일반세율, 3주택 이상은
                    일반세율(12억 이하) + 중과세율(12억 초과).
                  </li>
                  <li>
                    <strong>4. 종부세 산출세액 계산</strong>: 과세표준에 누진세 적용 (10원 단위
                    절사).
                  </li>
                  <li>
                    <strong>5. 공제할 재산세액 차감</strong>: 같은 가액에 이미 낸 재산세 몫을 뺍니다.
                    과세표준 × 재산세 공정시장가액비율(1세대1주택 45%, 그 외 60%) × 0.4% (종부세법
                    §9③, 시행령 §4의3).
                  </li>
                  <li>
                    <strong>6. 세액공제 계산 (1세대1주택자만)</strong>: 재산세를 뺀 금액에 고령자공제 +
                    장기보유공제율을 곱합니다. 합계 80% 한도 (§9⑤).
                  </li>
                  <li>
                    <strong>7. 종부세 순세액</strong>: 산출세액 − 공제할 재산세액 − 세액공제액 (최소 0원).
                  </li>
                  <li>
                    <strong>8. 농어촌특별세 계산</strong>: 순세액 × 20% (10원 단위 절사).
                  </li>
                  <li>
                    <strong>9. 최종 납부액</strong>: 종부세 순세액 + 농어촌특별세.
                  </li>
                </ol>
              </section>
              <section aria-label="계산기에 빠진 항목" className="card">
                <h2 className="mb-3 text-2xl font-semibold">이 계산기 결과와 실제 고지액이 다를 수 있나요?</h2>
                <p className="text-sm leading-relaxed text-text-secondary" data-speakable>
                  재산세 중복분은 빼서 계산하지만, 세부담 상한은 반영하지 않아 고지액이 더 작을 수 있습니다.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>재산세 중복분 공제 (반영)</strong>: 같은 가액에 이미 낸 재산세 몫을 종부세에서
                    뺍니다(종부세법 §9③, 시행령 §4의3). 공시 15억 1세대1주택이면 약 32만 원입니다.
                  </li>
                  <li>
                    <strong>세부담 상한 (미반영)</strong>: 올해 재산세와 종부세 합계가 직전 연도의 150%를 넘으면
                    넘는 부분은 걷지 않습니다(종부세법 §10). 작년 세액이 있어야 계산할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-3 text-sm text-text-secondary">
                  다만, 재산세 세부담 상한이나 지자체 세율 조정을 받은 주택은 공제할 재산세액도 달라질 수
                  있어 최종 금액은 11월 하순 홈택스 고지서로 확인해야 합니다.
                </p>
              </section>
              <section aria-label="고지와 납부 일정" className="card">
                <h2 className="mb-3 text-2xl font-semibold">2026년 종부세는 언제 고지되고 언제 내나요?</h2>
                <p className="text-sm leading-relaxed text-text-secondary" data-speakable>
                  2026년 12월 1일부터 12월 15일(화)까지 냅니다. 고지서는 보통 11월 하순에 나옵니다.
                </p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse text-sm" data-speakable>
                    <caption className="mb-2 text-left text-xs text-text-tertiary">
                      2026년 종합부동산세 일정과 분납 기준 (종부세법 §3·§16·§20)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="px-3 py-2 text-left font-semibold">항목</th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 text-text-secondary">과세기준일</td>
                        <td className="px-3 py-2 text-text-primary">2026년 6월 1일 보유 기준 (§3)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 text-text-secondary">고지서 발송</td>
                        <td className="px-3 py-2 text-text-primary">11월 하순 (우편, 전자고지 신청자는 홈택스·모바일)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 text-text-secondary">납부기한</td>
                        <td className="px-3 py-2 text-text-primary">12월 1일 ~ 12월 15일 (§16①)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 text-text-secondary">신고납부 선택</td>
                        <td className="px-3 py-2 text-text-primary">고지 대신 같은 기간에 직접 신고·납부 가능 (§16③)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 text-text-secondary">분납</td>
                        <td className="px-3 py-2 text-text-primary">
                          세액 250만 원 초과 시 일부를 납부기한 다음 날부터 6개월 안에 (§20)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">분납 가능 금액</td>
                        <td className="px-3 py-2 text-text-primary">
                          500만 원 이하: 250만 원 초과분 / 500만 원 초과: 세액의 50% 이하
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-secondary">
                  예를 들어 고지세액이 400만 원이면 250만 원을 12월 15일까지 내고 150만 원은 2027년 6월
                  15일까지 낼 수 있습니다. 세액이 1,000만 원이면 500만 원까지 미룰 수 있습니다.
                </p>
                <p className="mt-3 text-sm text-text-secondary">
                  다만, 2026년 9월 국회에 제출된 세제개편 정부안(1주택 공제 조정 등)은 아직 심사 중이라 올해
                  12월 납부분에는 적용되지 않습니다. 올해 고지는 현행 기준(1세대1주택 12억 원, 그 외 9억 원)을
                  따릅니다.{' '}
                  <a
                    href="/guide/comprehensive-real-estate-tax-value-based-reform-2026/"
                    className="font-medium text-primary-700 underline dark:text-primary-300"
                  >
                    개편안 진행 상황 보기
                  </a>
                </p>
              </section>
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>세대 합산</strong>: 종부세는 1세대 단위로 합산되므로, 배우자명의 주택도
                    모두 포함되어야 합니다. 부부의 명의를 분리해도 1세대로 봅니다.
                  </li>
                  <li>
                    <strong>과세 기준일</strong>: 보유 여부는 6월 1일을 기준으로 판단됩니다. 6월 1일
                    23시 59분 현재 소유한 주택만 과세 대상입니다.
                  </li>
                  <li>
                    <strong>공시가격 확정</strong>: 공시가격이 확정되기 전 추정값으로 계산했다면,
                    확정 후 실제 세액이 달라질 수 있습니다.
                  </li>
                  <li>
                    <strong>조정지역 변경</strong>: 조정지역 지정·해제는 수시로 변할 수 있으므로,
                    최신 정보를 확인해야 합니다.
                  </li>
                  <li>
                    <strong>세무사 상담 필수</strong>: 본 계산기는 참고용이며, 정확한 계산과 신고는
                    세무사의 도움을 받으시기 바랍니다. 세대 판정, 공시가격 이의 신청 등 복잡한
                    사항은 전문가 상담이 필수입니다.
                  </li>
                  <li>
                    본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 실제 종부세는 국세청의
                    확정세액 고지를 따릅니다.
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
                      href="/guide/june-property-tax/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      재산세 완벽 가이드 (재산세 vs 종부세 차이 정리)
                    </a>
                  </li>
                  <li>
                    →{' '}
                    <a
                      href="/guide/comprehensive-real-estate-tax-calculation-2026/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      종합부동산세 계산법 2026 (공시가격·공제·세율 단계별 예시)
                    </a>
                  </li>
                  <li>
                    →{' '}
                    <a
                      href="/guide/comprehensive-real-estate-tax-single-house-credit-2026/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      1세대1주택 고령자·장기보유 세액공제 (최대 80%)
                    </a>
                  </li>
                  <li>
                    →{' '}
                    <a
                      href="/guide/comprehensive-real-estate-tax-joint-ownership-2026/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      부부 공동명의 종부세 특례 vs 단독명의 비교
                    </a>
                  </li>
                </ul>
              </section>
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-10-07: 고지·납부·분납 일정 추가, 일반세율 94억 원 초과 누진공제 표기 정정(1억 180만 원), 조항 표기 정정, 계산에 공제할 재산세액(§9③) 반영, 세부담 상한 미반영 안내</li>
                  <li>2026-04-24: 2026년 종부세법 기준 초판 공개</li>
                </ul>
              </section>
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>출처</strong>: 종합부동산세법 §8(과세표준·공제), §9(세율·1세대1주택
                  세액공제), §10(세부담 상한), §16(부과·징수), §20(분납) · 농어촌특별세법 §5(농특세) · 공정시장가액비율 고시 ·{' '}
                  <a
                    href="https://www.hometax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 홈택스
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청
                  </a>
                  .
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 세대 판정, 조정지역 중과 폐지,
                  세액공제 한도, 공시가격 확정 여부 등 변수는 실제 고지액에 영향을 미칠 수 있습니다.
                  정확한 종부세 계산 및 신고는 관할 세무서 또는 세무사의 안내를 받으시기 바랍니다.
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
