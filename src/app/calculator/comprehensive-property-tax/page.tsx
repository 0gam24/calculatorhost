import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
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
} from '@/lib/seo/jsonld';
import { AuthorByline } from '@/components/calculator/AuthorByline';
import { ComprehensivePropertyTaxCalculator } from './ComprehensivePropertyTaxCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const URL = 'https://calculatorhost.com/calculator/comprehensive-property-tax/';

export const metadata: Metadata = {
  title: '종합부동산세 계산기 2026 | 1세대1주택·공정비율 | calculatorhost',
  description:
    '2026년 종부세법 기준 종합부동산세 계산기. 주택수·공시가·1세대1주택 공제 12억·고령자·장기보유 공제 반영해 공정시장가액비율 60% 적용 예상 납부세액 확인.',
  alternates: { canonical: URL },
  openGraph: {
    title: '종합부동산세 계산기 2026 | 1세대1주택·공정비율',
    description: '주택 공시가 합산으로 종부세 과세 여부와 예상 납부액을 즉시 확인하세요.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합부동산세 계산기 2026 | 1세대1주택·공정비율',
    description: '주택 공시가 합산으로 종부세 과세 여부와 예상 납부액을 즉시 확인하세요.',
  },
  other: {
    dateModified: '2026-04-24',
  },
};

const FAQ_ITEMS = [
  {
    question: '종합부동산세와 재산세는 무엇이 다른가요?',
    answer:
      '종합부동산세(종부세)는 고가 주택을 다수 보유한 자산가에게 부과되는 국세이고, 재산세는 모든 주택 보유자에게 매년 부과되는 지방세입니다. 재산세는 공시가 9억 원 이하 1세대1주택이면 특례 세율을 받지만, 종부세는 1세대1주택 특례는 없고 대신 고령자·장기보유 세액공제만 적용됩니다(종부세법 §8·§9).',
  },
  {
    question: '1세대1주택자 공제 12억은?',
    answer:
      '종부세법 §7에 따라 1세대1주택자는 공시가 합계에서 12억 원의 공제를 받을 수 있습니다. 예를 들어 공시가 15억 원이면 (15억 − 12억) × 60% = 1.8억이 과세표준이 되는데, 일반인(다주택자)은 9억 원만 공제받아 과세표준이 더 높아집니다. 조건: 2주택 이상이 아니어야 하고, 정부 조정지역도 제약이 있을 수 있습니다.',
  },
  {
    question: '고령자·장기보유 공제는 어떻게 적용되나요?',
    answer:
      '종부세법 §9에 따라 1세대1주택자가 받을 수 있는 세액공제는: 고령자공제(60~64세 20%, 65~69세 30%, 70세 이상 40%) + 장기보유공제(5~10년 20%, 10~15년 40%, 15년 이상 50%). 두 공제의 합계는 80% 한도입니다. 예: 70세이고 20년 보유하면 (40% + 50%) = 80% 공제가 되어 세액이 80% 감소합니다.',
  },
  {
    question: '3주택 이상 중과세율은 언제 적용되나요?',
    answer:
      '종부세법 §8②에 따라 3주택 이상을 보유한 경우, 과세표준 12억 원을 초과하는 부분부터 중과 세율이 적용됩니다. 예: 과세표준 20억인 경우, 12억 이하는 일반세율(최고 2.7%)을, 12억 초과 20억까지는 중과세율(최고 5%)을 받습니다. 2023년 개정으로 조정지역 추가 중과는 폐지되었습니다.',
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
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
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
                    { name: '세금', href: '/category/tax/' },
                    { name: '종합부동산세' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">종합부동산세 계산기 2026</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 종부세법을 기준으로 한 무료 종합부동산세 계산기입니다. 보유 주택 수와 공시가
                  합계, 1세대1주택 특례 여부, 고령자·장기보유 정보를 입력하면 공정시장가액비율 60%
                  적용으로 과세표준과 세액공제를 반영한 최종 납부세액을 즉시 확인할 수 있습니다.
                </p>
                <AuthorByline dateModified="2026-04-24" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="종합부동산세는 주택 공시가 합계에서 공제를 차감한 후 공정시장가액비율 60%를 적용한 과세표준에 누진세를 곱하고, 농어촌특별세 20%를 더하여 계산되는 국세입니다(종부세법 §7·§8·§9, 농특세법 §5)."
                table={{
                  caption: '1세대1주택 기준 공시가별 종부세 예상액',
                  headers: ['보유 공시가', '예상 종부세 (공제 미적용)'],
                  rows: [
                    ['12억 원', '0원'],
                    ['15억 원', '약 90만 원'],
                    ['20억 원', '약 240만 원'],
                    ['30억 원', '약 740만 원'],
                  ],
                }}
                tldr={[
                  '종부세 = (공시가 − 공제) × 60% × 세율',
                  '1세대1주택: 공제 12억 / 다주택: 공제 9억',
                  '1세대1주택자만 고령자·장기보유 세액공제 80% 한도 적용',
                  '3주택 이상은 과세표준 12억 초과 부분 중과세율 적용',
                  '농어촌특별세는 순세액의 20% (종부세에 포함)',
                ]}
              />

              <AdSlot slot="comprehensive-property-tax-top" format="horizontal" />

              {/* 계산기 */}
              <ComprehensivePropertyTaxCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 종합부동산세란 무엇인가 */}
              <section aria-label="종합부동산세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">종합부동산세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  종합부동산세(종부세)는 고가 주택을 다수 보유한 자산가에게 매년 부과되는 국세입니다(종부세법
                  §1). 보유 주택의 공시가 합계에서 공제를 차감한 후, 공정시장가액비율 60%를 적용하여 과세표준을
                  산정하고, 누진세를 적용합니다. 1세대1주택자는 12억 원의 공제를 받을 수 있으며, 고령자·장기보유
                  세액공제도 적용됩니다.
                </p>
                <p className="text-text-secondary">
                  다주택자는 9억 원의 공제만 받고, 세액공제 혜택이 없습니다. 3주택 이상을 보유하면 과세표준
                  12억 원을 초과하는 부분부터 중과세율이 적용되어 세 부담이 크게 증가합니다. 농어촌특별세법에 따라
                  종부세의 20%가 농특세로 추가 부과됩니다.
                </p>
              </section>

              {/* 세율표: 일반 vs 3주택 이상 중과 */}
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
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">3억 원 이하</td>
                          <td className="px-3 py-2 text-right text-text-primary">0.5%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">0원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">3억~6억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">0.7%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">60만 원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">6억~12억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">1.0%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">240만 원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">12억~25억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">1.3%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">600만 원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">25억~50억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">1.5%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">1,100만 원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">50억~94억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">2.0%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">3,600만 원</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 text-text-secondary">94억 원 초과</td>
                          <td className="px-3 py-2 text-right text-text-primary">2.7%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">1억 1,800만 원</td>
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
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">3억 원 이하</td>
                          <td className="px-3 py-2 text-right text-text-primary">0.5%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">0원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">3억~6억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">0.7%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">60만 원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">6억~12억 원</td>
                          <td className="px-3 py-2 text-right text-text-primary">1.0%</td>
                          <td className="px-3 py-2 text-right text-text-secondary">240만 원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">12억~25억 원</td>
                          <td className="px-3 py-2 text-right text-primary-500 font-semibold">
                            2.0%
                          </td>
                          <td className="px-3 py-2 text-right text-text-secondary">1,440만 원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">25억~50억 원</td>
                          <td className="px-3 py-2 text-right text-primary-500 font-semibold">
                            3.0%
                          </td>
                          <td className="px-3 py-2 text-right text-text-secondary">3,940만 원</td>
                        </tr>
                        <tr className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">50억~94억 원</td>
                          <td className="px-3 py-2 text-right text-primary-500 font-semibold">
                            4.0%
                          </td>
                          <td className="px-3 py-2 text-right text-text-secondary">8,940만 원</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 text-text-secondary">94억 원 초과</td>
                          <td className="px-3 py-2 text-right text-primary-500 font-semibold">
                            5.0%
                          </td>
                          <td className="px-3 py-2 text-right text-text-secondary">1억 8,340만 원</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-sm text-text-tertiary">
                    <strong>출처</strong>: 종합부동산세법 §8(세율), §8②(3주택 이상 중과)
                  </p>
                </div>
              </section>

              {/* 공제금액 비교 */}
              <section aria-label="공제금액 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">공제금액 비교</h2>
                <p className="mb-4 text-text-secondary">
                  종합부동산세는 보유 주택 구성에 따라 다른 공제금액을 적용합니다(종부세법 §7).
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
                      <tr className="border-b border-border-base/50">
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

              {/* 세액공제 상세 설명 */}
              <section aria-label="세액공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1세대1주택 세액공제</h2>
                <p className="mb-4 text-text-secondary">
                  1세대1주택자만 고령자공제와 장기보유공제를 받을 수 있으며, 합계는 80% 한도입니다(종부세법
                  §9).
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
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">60세 미만</td>
                        <td className="px-3 py-2 text-right text-text-primary">0%</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">60~64세</td>
                        <td className="px-3 py-2 text-right text-text-primary">20%</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
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
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">5년 미만</td>
                        <td className="px-3 py-2 text-right text-text-primary">0%</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">5~10년 미만</td>
                        <td className="px-3 py-2 text-right text-text-primary">20%</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
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

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">종합부동산세 계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>1. 공제금액 결정</strong>: 1세대1주택이면 12억, 다주택이면 9억 원 공제.
                  </li>
                  <li>
                    <strong>2. 과세표준 산정</strong>: (보유 주택 공시가 합계 − 공제) × 60%(공정시장가액비율).
                    음수면 0원.
                  </li>
                  <li>
                    <strong>3. 세율 구간 선택</strong>: 1-2주택은 일반세율, 3주택 이상은 일반세율(12억
                    이하) + 중과세율(12억 초과).
                  </li>
                  <li>
                    <strong>4. 종부세 산출세액 계산</strong>: 과세표준에 누진세 적용 (10원 단위 절사).
                  </li>
                  <li>
                    <strong>5. 세액공제 계산 (1세대1주택자만)</strong>: 고령자공제 + 장기보유공제, 합계
                    80% 한도.
                  </li>
                  <li>
                    <strong>6. 종부세 순세액</strong>: 산출세액 − 세액공제액 (최소 0원).
                  </li>
                  <li>
                    <strong>7. 농어촌특별세 계산</strong>: 순세액 × 20% (10원 단위 절사).
                  </li>
                  <li>
                    <strong>8. 최종 납부액</strong>: 종부세 순세액 + 농어촌특별세.
                  </li>
                </ol>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>세대 합산</strong>: 종부세는 1세대 단위로 합산되므로, 배우자명의 주택도 모두
                    포함되어야 합니다. 부부의 명의를 분리해도 1세대로 봅니다.
                  </li>
                  <li>
                    <strong>과세 기준일</strong>: 보유 여부는 6월 1일을 기준으로 판단됩니다. 6월 1일 23시
                    59분 현재 소유한 주택만 과세 대상입니다.
                  </li>
                  <li>
                    <strong>공시가격 확정</strong>: 공시가격이 확정되기 전 추정값으로 계산했다면, 확정 후
                    실제 세액이 달라질 수 있습니다.
                  </li>
                  <li>
                    <strong>조정지역 변경</strong>: 조정지역 지정·해제는 수시로 변할 수 있으므로, 최신
                    정보를 확인해야 합니다.
                  </li>
                  <li>
                    <strong>세무사 상담 필수</strong>: 본 계산기는 참고용이며, 정확한 계산과 신고는 세무사의
                    도움을 받으시기 바랍니다. 세대 판정, 공시가격 이의 신청 등 복잡한 사항은 전문가 상담이
                    필수입니다.
                  </li>
                  <li>
                    본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 실제 종부세는 국세청의 확정세액
                    고지를 따릅니다.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <section aria-label="관련 가이드" className="card border-l-4 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-2 text-xl font-semibold">📚 함께 보면 좋은 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <a href="/guide/june-property-tax/" className="text-primary-700 dark:text-primary-300 underline font-medium">
                      재산세 완벽 가이드 (재산세 vs 종부세 차이 정리)
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title="종합부동산세 계산기 (2026)" url="https://calculatorhost.com/calculator/comprehensive-property-tax/" />

              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 2026년 종부세법 기준 초판 공개</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>출처</strong>: 종합부동산세법 §7(과세표준), §8(세율), §9(1세대1주택
                  세액공제) · 농어촌특별세법 §5(농특세) · 공정시장가액비율 고시 · <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>.
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 세대 판정, 조정지역 중과 폐지,
                  세액공제 한도, 공시가격 확정 여부 등 변수는 실제 고지액에 영향을 미칠 수 있습니다. 정확한
                  종부세 계산 및 신고는 관할 세무서 또는 세무사의 안내를 받으시기 바랍니다.
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
