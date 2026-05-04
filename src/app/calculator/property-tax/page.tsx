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
  buildWebPageJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { AuthorByline } from '@/components/calculator/AuthorByline';
import { PropertyTaxCalculator } from './PropertyTaxCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const URL = 'https://calculatorhost.com/calculator/property-tax/';

export const metadata: Metadata = {
  title: '재산세 계산기 2026 | 공시가·특례·도시지역 | calculatorhost',
  description:
    '2026년 지방세법 기준 재산세 계산기. 공시가격과 1세대1주택 특례, 도시지역분, 지방교육세까지 모두 반영해 연간 총 납부액과 7·9월 분납액을 즉시 확인.',
  alternates: { canonical: URL },
  openGraph: {
    title: '재산세 계산기 2026 | 공시가·특례·도시지역분',
    description: '2026년 지방세법 기준 재산세 계산기. 공시가격 입력으로 연간 총 납부액 확인.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산세 계산기 2026 | 공시가·특례·도시지역분',
    description: '공시가격 입력으로 연간 납부액, 7·9월 분납액 즉시 확인',
  },
};

const FAQ_ITEMS = [
  {
    question: '재산세 과세표준은 어떻게 산정하나요?',
    answer:
      '재산세 과세표준은 공시가격에 공정시장가액비율(주택 60%)을 곱하여 산정합니다(지방세법 §110). 예를 들어 공시가격 6억 원이면 과세표준은 3.6억 원(6억 × 60%)입니다.',
  },
  {
    question: '1세대1주택 특례 조건은?',
    answer:
      '1세대1주택 특례는 공시가격이 9억 원 이하일 때 적용됩니다(지방세법 §111의2). 조건을 충족하면 일반세율의 약 절반 수준의 세율이 적용되어 세 부담을 크게 줄일 수 있습니다.',
  },
  {
    question: '도시지역분은 무엇인가요?',
    answer:
      '도시지역분은 도시계획구역 내 주택에 추가로 부과되는 세금으로, 과세표준의 0.14%입니다(지방세법 §112). 도시계획구역 외(비도시)라면 도시지역분은 부과되지 않습니다.',
  },
  {
    question: '지방교육세는 언제 같이 부과되나요?',
    answer:
      '지방교육세는 재산세 본세의 20%로 계산되어 항상 함께 부과됩니다(지방세법 §150). 본 계산기는 이 지방교육세를 총 납부액에 포함합니다.',
  },
  {
    question: '재산세 납부 시기는?',
    answer:
      '재산세는 7월과 9월 두 차례에 걸쳐 분납됩니다. 총 납부액이 20만 원 이하면 7월에 일괄 납부하고, 초과하면 7월(1/2 올림)과 9월(잔액)에 나누어 납부합니다.',
  },
  {
    question: '세부담 상한은 어떻게 적용되나요?',
    answer:
      '재산세는 「지방세법」에서 정한 세부담 상한 제도가 있습니다. 전년도 세액의 일정 비율 이상 인상될 수 없도록 제한됩니다. 본 계산기는 이 상한을 고려하지 않으므로 실제 고지액과 다를 수 있습니다.',
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
    description: '2026년 지방세법 기준 재산세 계산기',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 계산기 2026',
    description: '공시가격 입력으로 연간 납부액, 7·9월 분납액 즉시 확인',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: '재산세 계산기 사용 방법',
    description: '공시가격과 주택 정보를 입력하여 연간 재산세를 계산하는 단계별 가이드',
    steps: [
      { name: '공시가격 입력', text: '부동산의 공시가격을 입력합니다(주택은 국토부 발표 공시가).' },
      { name: '주택 수 및 면적 입력', text: '현재 보유한 주택 수와 주택의 주택 면적(㎡)을 입력합니다.' },
      { name: '지역 정보 설정', text: '도시지역 여부, 조정지역 여부를 확인합니다.' },
      { name: '1세대1주택 특례 확인', text: '해당하면 1세대1주택 특례(9억 원 이하)가 자동 적용됩니다.' },
      { name: '결과 확인', text: '연간 총 납부액과 7월·9월 분납액을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    { name: '재산세' },
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
                    { name: '세금', href: '/category/tax/' },
                    { name: '재산세' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">재산세 계산기 2026</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 지방세법을 기준으로 한 무료 재산세 계산기입니다. 공시가격과
                  1세대1주택 특례 여부, 도시지역 여부를 입력하면 재산세 본세, 지방교육세,
                  도시지역분을 포함한 연간 총 납부액과 7·9월 분납액을 즉시 확인할 수 있습니다.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="재산세는 일정 금액 이상의 주택을 소유할 때 매년 부과되는 지방세입니다. 과세표준(공시가격 × 60%)에 세율을 곱하고 누진공제를 차감한 후, 지방교육세(20%)를 더하여 계산됩니다(지방세법 §110-§150)."
                table={{
                  caption: '공시가격별 재산세 예상액 (1세대1주택 특례 미적용)',
                  headers: ['공시가격', '예상 재산세'],
                  rows: [
                    ['3억 원', '약 45만 원'],
                    ['6억 원', '약 90만 원'],
                    ['10억 원', '약 150만 원'],
                    ['15억 원', '약 247만 원'],
                  ],
                }}
                tldr={[
                  '재산세 = 과세표준(공시가 × 60%) × 세율 − 누진공제',
                  '1세대1주택 특례: 공시 9억 이하일 때 세율 약 절반',
                  '도시지역분 0.14% + 지방교육세 20% 추가',
                  '7월·9월 분납 (총액 20만 원 이하면 7월 일괄)',
                  '세부담 상한 제도 있음 (본 계산기 미반영)',
                ]}
              />

              <AdSlot slot="property-tax-top" format="horizontal" />

              {/* 계산기 */}
              <PropertyTaxCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 재산세란 무엇인가 */}
              <section aria-label="재산세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">재산세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  재산세는 주택, 토지, 건물 등 일정 금액 이상의 재산을 소유할 때 매년 부과되는
                  지방세입니다(지방세법 §110). 부동산의 공시가격을 기준으로 공정시장가액비율(주택
                  60%)을 적용하여 과세표준을 산정합니다. 1세대1주택자는 특례 세율이 적용되어
                  세 부담이 낮아집니다.
                </p>
                <p className="text-text-secondary">
                  재산세는 6월 말 기준으로 소유한 부동산에 대해 7월과 9월 두 차례에 걸쳐 분납됩니다.
                  도시계획구역 내 주택이면 도시지역분(0.14%)이 추가되고, 재산세의 20%에 해당하는
                  지방교육세가 함께 부과됩니다.
                </p>
              </section>

              {/* 세율표: 일반 vs 1세대1주택 특례 */}
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
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">6,000만 원 이하</td>
                        <td className="px-3 py-2 text-right text-text-primary">0.1%</td>
                        <td className="px-3 py-2 text-right text-text-secondary">0원</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">6,000만~1.5억 원</td>
                        <td className="px-3 py-2 text-right text-text-primary">0.15%</td>
                        <td className="px-3 py-2 text-right text-text-secondary">3만 원</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
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
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">6,000만 원 이하</td>
                        <td className="px-3 py-2 text-right text-primary-500 font-semibold">
                          0.05%
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary">0원</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">6,000만~1.5억 원</td>
                        <td className="px-3 py-2 text-right text-primary-500 font-semibold">
                          0.1%
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary">3만 원</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">1.5억~3억 원</td>
                        <td className="px-3 py-2 text-right text-primary-500 font-semibold">
                          0.2%
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary">18만 원</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">3억 원 초과</td>
                        <td className="px-3 py-2 text-right text-primary-500 font-semibold">
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

              {/* 공시가격과 과세표준 */}
              <section aria-label="공시가격과 과세표준" className="card">
                <h2 className="mb-4 text-2xl font-semibold">공시가격과 과세표준</h2>
                <p className="mb-4 text-text-secondary">
                  재산세의 계산 기준이 되는 과세표준은 공시가격에 공정시장가액비율을 곱하여 산정합니다.
                  주택의 경우 공정시장가액비율이 60%로 정해져 있으므로, 공시가격의 60%가
                  과세표준이 됩니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  <strong>예시</strong>: 공시가격 6억 원 → 과세표준 3.6억 원(6억 × 60%) → 세율 0.25%
                  적용 → 재산세 90만 원(3.6억 × 0.25% − 18만 원 누진공제)
                </p>
                <p className="text-text-secondary">
                  공시가격은 매년 6월 말에 발표되며, 부동산 시장의 변동을 반영하여 조정됩니다.
                  공시가격 상승 폭에 따라 재산세도 함께 증가합니다.
                </p>
              </section>

              {/* 1세대1주택 특례 */}
              <section aria-label="1세대1주택 특례" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1세대1주택 특례는 언제 적용되나요?</h2>
                <p className="mb-4 text-text-secondary">
                  1세대1주택 특례는 공시가격이 9억 원 이하인 주택을 1주택만 소유하는 1세대 이상의
                  가구주가 받을 수 있는 제도입니다(지방세법 §111의2). 조건을 충족하면 일반세율의
                  약 절반 수준의 세율을 적용받아 세 부담을 크게 줄일 수 있습니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  <strong>중요</strong>: 공시가격이 9억 원을 초과하면 1세대1주택이라도 특례가
                  적용되지 않고 일반세율(높은 세율)을 적용받게 됩니다. 따라서 공시가격이 9억 원에
                  가까운 경우 주의가 필요합니다.
                </p>
                <p className="text-text-secondary">
                  조정지역(집값이 급상승했거나 정부 규제 지역)에서 다주택을 소유하거나, 1세대가 여러
                  주택을 소유한 경우에는 1세대1주택 특례가 적용되지 않습니다.
                </p>
              </section>

              {/* 도시지역분과 지방교육세 */}
              <section aria-label="도시지역분 및 지방교육세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">도시지역분과 지방교육세</h2>
                <h3 className="mb-3 text-lg font-medium text-text-primary">도시지역분</h3>
                <p className="mb-4 text-text-secondary">
                  도시지역분은 도시계획구역에 포함된 주택에 대해 추가로 부과되는 세금입니다(지방세법
                  §112). 과세표준의 0.14%로 계산되어 재산세 본세에 더해집니다. 도시계획구역 외
                  농촌 지역이면 도시지역분은 부과되지 않습니다.
                </p>
                <h3 className="mb-3 text-lg font-medium text-text-primary">지방교육세</h3>
                <p className="text-text-secondary">
                  지방교육세는 재산세 본세의 20%로 계산되어 항상 함께 부과됩니다(지방세법 §150).
                  예를 들어 재산세가 100만 원이면 지방교육세는 20만 원입니다. 지방교육세의 목적은
                  학교 건설·시설 개선 등 교육 인프라 구축입니다.
                </p>
              </section>

              {/* 재산세 납부 일정 */}
              <section aria-label="납부 일정" className="card">
                <h2 className="mb-4 text-2xl font-semibold">재산세 납부 일정 및 방법</h2>
                <p className="mb-4 text-text-secondary">
                  재산세는 6월 말 기준으로 소유한 부동산에 대해 매년 7월과 9월 두 차례에 걸쳐
                  분납됩니다. 단, 총 납부액이 20만 원 이하면 7월에 일괄 납부합니다.
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-5 text-text-secondary">
                  <li>
                    <strong>7월</strong>: 총 납부액의 1/2(올림 처리)를 납부합니다.
                  </li>
                  <li>
                    <strong>9월</strong>: 남은 잔액을 납부합니다(합계가 정확히 총액).
                  </li>
                  <li>
                    <strong>20만 원 이하</strong>: 7월에 전액 일괄 납부합니다.
                  </li>
                </ul>
                <p className="text-text-secondary">
                  납부 방법은 은행 납부, 온라인 납부(세정 웹사이트), 편의점 납부 등이 있습니다.
                  납부 기한을 놓치면 가산세와 이자가 부과됩니다.
                </p>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">재산세 계산 공식</h2>
                <ol className="space-y-3 text-sm leading-relaxed">
                  <li>
                    <strong>1. 과세표준 산정</strong>: 공시가격 × 60%(공정시장가액비율).
                  </li>
                  <li>
                    <strong>2. 적용 세율 결정</strong>: 1세대1주택(공시 9억 이하) 또는 일반 세율 선택.
                  </li>
                  <li>
                    <strong>3. 재산세 본세 계산</strong>: 과세표준 × 세율 − 누진공제(10원 단위 절사).
                  </li>
                  <li>
                    <strong>4. 도시지역분 계산</strong>: 과세표준 × 0.14% (도시지역만).
                  </li>
                  <li>
                    <strong>5. 지방교육세 계산</strong>: 재산세 본세 × 20%.
                  </li>
                  <li>
                    <strong>6. 총 납부액</strong>: 재산세 본세 + 도시지역분 + 지방교육세.
                  </li>
                  <li>
                    <strong>7. 분납액 계산</strong>: 20만 원 이하면 7월 일괄, 초과하면 7월(1/2 올림)
                    + 9월(잔액).
                  </li>
                </ol>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>세부담 상한</strong>: 재산세는 전년도 기준 세부담 상한 제도가 있어, 인상률이
                    제한됩니다. 본 계산기는 이를 반영하지 않으므로 실제 고지액과 차이가 날 수 있습니다.
                  </li>
                  <li>
                    <strong>지역자원시설세</strong>: 일부 도시 및 광역시에서는 재산세에 지역자원시설세가
                    추가로 부과됩니다. 본 계산기는 이를 미반영했으므로 추후 업데이트 예정입니다.
                  </li>
                  <li>
                    <strong>공시가격 변동</strong>: 공시가격은 매년 6월 말에 발표되며, 부동산 시장 변동을
                    반영하여 조정됩니다. 공시가격이 급상승하면 재산세도 함께 증가할 수 있습니다.
                  </li>
                  <li>
                    <strong>조정지역 지정</strong>: 조정지역으로 지정되면 다주택 소유 시 세율이 높아집니다.
                    조정지역 여부는 지역과 시간에 따라 변할 수 있습니다.
                  </li>
                  <li>
                    <strong>1세대1주택 특례 신청</strong>: 특례 대상이어도 신청하지 않으면 일반세율을
                    적용받습니다. 관할청에 신청서를 제출해야 합니다.
                  </li>
                  <li>
                    본 계산기는 참고용이며, 실제 고지액과는 차이가 있을 수 있습니다. 정확한 계산은
                    관할 시청의 세무과에 문의하세요.
                  </li>
                </ul>
              </section>

              {/* 절세 팁 */}
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">재산세 절세 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>1세대1주택 특례 적극 활용</strong>: 공시가격 9억 원 이하의 1세대1주택이면
                    반드시 특례를 신청하세요. 세 부담이 약 절반 수준으로 줄어듭니다.
                  </li>
                  <li>
                    <strong>공시가격 이의 신청</strong>: 공시가격이 과하다고 판단되면 이의 신청(4월)을
                    할 수 있습니다. 이의 신청 수용 시 과세표준이 낮아져 재산세가 감소합니다.
                  </li>
                  <li>
                    <strong>세부담 상한 제도 확인</strong>: 공시가격 인상에 따른 세부담 상한이 자동
                    적용되는지 확인하세요. 상한 범위 내에서만 세액이 인상됩니다.
                  </li>
                  <li>
                    <strong>분할 소유 검토</strong>: 소규모 다주택을 분할하여 1세대1주택 특례를 받을 수
                    있는지 세무사와 상담하세요(법적 가능성 검토 필수).
                  </li>
                  <li>
                    <strong>생활용·보유목적 명확화</strong>: 실제 거주(생활용)인 경우와 투자 보유인
                    경우 세 부담이 다를 수 있으니, 실제 사용 목적을 명확히 하세요.
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
                      🏠 재산세 완벽 가이드 (6월 부과·7월 납부) — 7월 시즌 직전 필독
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title="재산세 계산기 (2026)" url="https://calculatorhost.com/calculator/property-tax/" />

              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 2026년 지방세법 기준 초판 공개</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>출처</strong>: 지방세법 §110(과세표준), §111(일반 세율), §111의2(1세대1주택
                  특례), §112(도시지역분), §150(지방교육세) · 공정시장가액비율 고시. 참고: <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">위택스</a>, <a href="https://www.reb.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">한국부동산원</a>.
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 세부담 상한, 지역자원시설세
                  등 변수는 실제 고지액에 영향을 미칠 수 있습니다. 정확한 재산세 계산 및 신청은
                  관할 시청의 세무과 또는 세무사의 안내를 받으시기 바랍니다.
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
