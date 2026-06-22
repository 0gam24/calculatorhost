import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/comprehensive-real-estate-tax-calculation-2026/';
const DATE_PUBLISHED = '2026-06-22';
const DATE_MODIFIED = '2026-06-22';

export const metadata: Metadata = {
  title: '종합부동산세 계산법 2026 | 과세표준·세율·공제 완벽 정리 | calculatorhost',
  description:
    '2026년 종합부동산세 정확한 계산법. 공시가격에서 공제·과세표준·세율·누진공제까지 단계별 가이드. 종부세법 §7-§9 기준 완전 정리.',
  keywords: [
    '종합부동산세',
    '종부세 계산',
    '과세표준',
    '공제금액',
    '세율',
    '누진공제',
    '1세대1주택',
    '다주택 중과',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종합부동산세 계산법 2026 | calculatorhost' }],
    title: '종합부동산세 계산법 2026 — 공시가격에서 세액까지 모두 정리',
    description: '종부세 과세표준 산정부터 세액 계산·세액공제까지 단계별 완벽 안내.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '종합부동산세 과세표준은 어떻게 구하나요?',
    answer:
      '과세표준은 보유 중인 전국 주택의 공시가격 합계에서 공제금액(1세대1주택 12억, 다주택 9억)을 차감한 후 공정시장가액비율 60%를 곱합니다. 예: 공시가격 20억 × 60% − (9억 × 60%) = 6.6억원.',
  },
  {
    question: '공제금액 12억과 9억의 차이는?',
    answer:
      '1세대1주택자는 공제금액 12억원을 먼저 차감하고, 다주택자(2주택 이상)는 9억원만 차감합니다. 같은 가격의 주택이어도 주택 개수에 따라 과세표준이 크게 달라집니다.',
  },
  {
    question: '공정시장가액비율 60%는 고정인가요?',
    answer:
      '공정시장가액비율은 종부세법 시행령에 따라 정하며, 일반적으로 60%입니다. 다만 이 비율은 법 개정 시 변경될 수 있으므로, 과세 시기에 국세청 고시를 확인하세요.',
  },
  {
    question: '1세대1주택 세액공제가 80% 한도라고 하는데?',
    answer:
      '고령자 또는 장기보유자(15년 이상)는 특정 비율로 세액공제를 받습니다. 예를 들어 70세 이상은 40%, 15년 이상 보유하면 50% 공제인데, 합산하면 90%이지만 법에서 최대 80% 한도로 제한합니다.',
  },
  {
    question: '농어촌특별세 20%는 항상 부가되나요?',
    answer:
      '농어촌특별세는 종합부동산세액에 대해 20%를 추가로 부과합니다. 과세표준에 직접 적용되는 것이 아니라, 산출된 종부세액에 20%를 곱한 별도 세액입니다.',
  },
  {
    question: '납부 기한은 언제인가요?',
    answer:
      '종합부동산세 납부 기한은 매년 12월 1일부터 15일입니다. 납기를 지나면 가산세가 부과되며, 세무서의 납세 통지서를 통해 정확한 금액과 납부처를 확인하세요.',
  },
];

export default function ComprehensiveRealEstateTaxCalculation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종합부동산세 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합부동산세 계산법 2026 — 공시가격에서 세액까지 단계별 가이드',
    description:
      '공시가격 조회부터 공제·과세표준·세율·누진공제 적용까지 종부세 계산의 모든 단계를 완벽하게 설명.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합부동산세', '계산법', '과세표준', '공제', '세율'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합부동산세 계산법 2026',
    description:
      '다주택 보유자를 위한 종합부동산세 정확한 계산 가이드. 공시가격 기준 과세표준 산정부터 세액 계산까지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '종합부동산세 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">다주택 소유자 · 11분 읽기 · 2026-06-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종합부동산세 계산법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 공시가격에서 세액까지 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  6월 1일은 종합부동산세의 과세기준일입니다. 2주택 이상 보유하고 있다면, 국세청의 공시가격 합계에 기반한 종부세가 부과됩니다. 그런데 공시가격만으로는 세액이 결정되지 않습니다. 공제금액을 차감하고, 공정시장가액비율을 곱하고, 세율 구간을 찾아 누진공제를 적용하는 복잡한 과정이 필요합니다. 이 가이드는 종합부동산세 계산의 각 단계를 명확하게 설명하여 최종 납부액을 정확히 이해할 수 있도록 돕습니다.
                </p>
              </header>

              <AdSlot slot="guide-comprehensive-real-estate-tax-calculation-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종합부동산세 계산 기본 흐름</h2>
                <p>
                  종합부동산세는 매년 6월 1일 현재 보유 중인 전국 주택을 대상으로 부과됩니다. 계산 순서는 다음과 같습니다:
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary mb-2">종부세 계산 5단계</p>
                  <ol className="text-sm text-text-secondary space-y-1 ml-4 list-decimal">
                    <li>전국 주택 공시가격 합계 확인</li>
                    <li>공제금액 차감 (1세대1주택 12억, 다주택 9억)</li>
                    <li>공정시장가액비율 60% 적용</li>
                    <li>세율 구간 확인 후 세액 계산</li>
                    <li>누진공제 적용 및 농특세 20% 추가</li>
                  </ol>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1단계: 공제금액 차감 (종부세법 §8①)</h2>
                <p>
                  종합부동산세는 일정 금액의 공제를 제공합니다. 주택의 개수에 따라 공제금액이 달라집니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 종합부동산세 공제금액 (종부세법 §8①)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적용 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1세대1주택</td>
                        <td className="p-3">12억원</td>
                        <td className="p-3">공시가격 합계</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">다주택 (2주택 이상)</td>
                        <td className="p-3">9억원</td>
                        <td className="p-3">공시가격 합계</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  <strong>1세대1주택자</strong>는 공제금액 12억원을 먼저 차감하므로, 같은 공시가격 합계라도 다주택자보다 훨씬 낮은 과세표준을 가집니다. 예를 들어 공시가격이 15억원이라면:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>1세대1주택자: 15억 − 12억 = 3억원</li>
                  <li>2주택자: 15억 − 9억 = 6억원</li>
                </ul>
                <p className="mt-4">
                  ⚠️ <strong>다만</strong> 공제금액은 공시가격 기준으로 차감되는 것이지, 과세표준에서 직접 차감되는 것이 아닙니다. 공정시장가액비율 60%를 곱한 후의 과세표준이 세율 적용 대상입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2단계: 과세표준 산정 (공정시장가액비율 60%)</h2>
                <p>
                  공제금액을 차감한 후, 종부세법 시행령에 따른 공정시장가액비율 60%를 곱합니다. 이 비율은 종합부동산세의 과세 기준을 공정하게 하기 위해 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary mb-2">과세표준 = (공시가격 합계 − 공제금액) × 60%</p>
                  <p className="text-sm text-text-secondary">
                    공정시장가액비율 60%는 종부세법 시행령에 정해진 값으로, 연도별로 변경될 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3단계: 종부세 세율 적용 (종부세법 §9)</h2>
                <p>
                  과세표준이 정해지면, 그에 해당하는 세율 구간을 찾아 세액을 계산합니다. 1~2주택과 3주택 이상의 세율이 다릅니다.
                </p>

                <h3 className="text-lg font-semibold mt-6">1~2주택 세율 (종부세법 §9①제1호)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 1~2주택 세율 구간 및 누진공제</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준 상한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">누진공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3억원 이하</td>
                        <td className="p-3">0.5%</td>
                        <td className="p-3">0</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6억원 이하</td>
                        <td className="p-3">0.7%</td>
                        <td className="p-3">60만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">12억원 이하</td>
                        <td className="p-3">1.0%</td>
                        <td className="p-3">240만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">25억원 이하</td>
                        <td className="p-3">1.3%</td>
                        <td className="p-3">600만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">50억원 이하</td>
                        <td className="p-3">1.5%</td>
                        <td className="p-3">1,100만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">94억원 이하</td>
                        <td className="p-3">2.0%</td>
                        <td className="p-3">3,600만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">94억원 초과</td>
                        <td className="p-3">2.7%</td>
                        <td className="p-3">1억 180만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold mt-6">3주택 이상 중과세율 (종부세법 §9①제2호)</h3>
                <p>
                  3주택 이상 보유 시 일반 세율보다 높은 중과세율이 적용됩니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 3주택 이상 중과세율 (종부세법 §9①제2호)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준 상한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3억원 이하</td>
                        <td className="p-3">0.5%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6억원 이하</td>
                        <td className="p-3">0.7%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">12억원 이하</td>
                        <td className="p-3">1.0%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">25억원 이하</td>
                        <td className="p-3">2.0%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">50억원 이하</td>
                        <td className="p-3">3.0%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">94억원 이하</td>
                        <td className="p-3">4.0%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">94억원 초과</td>
                        <td className="p-3">5.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4">
                  ⚠️ <strong>다만</strong> 3주택 이상도 과세표준 기준에 따라 최저 0.5%부터 시작하며, 구간이 올라갈수록 세율이 높아집니다. 1~2주택의 누진공제와 달리 3주택 이상은 누진공제 없이 직접 세율만 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">4단계: 구체적 계산 사례</h2>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 1세대1주택, 공시가격 15억원</p>
                  <p className="text-sm text-text-secondary space-y-1">
                    <br />· 공제금액 차감: 15억 − 12억 = 3억원
                    <br />· 과세표준: 3억 × 60% = 1.8억원
                    <br />· 세율: 1.8억원은 3억 이하 구간 → 0.5%
                    <br />· 종부세액: 1.8억 × 0.5% − 0 = <strong>90만원</strong>
                    <br />· 농특세(20%): 90만 × 20% = 18만원
                    <br />· <strong>총 납부액(농특세 포함): 108만원</strong>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 2주택, 공시가격 합계 20억원</p>
                  <p className="text-sm text-text-secondary space-y-1">
                    <br />· 공제금액 차감: 20억 − 9억 = 11억원
                    <br />· 과세표준: 11억 × 60% = 6.6억원
                    <br />· 세율: 6.6억원은 12억 이하 구간 → 1.0%, 누진공제 240만원
                    <br />· 종부세액: 6.6억 × 1.0% − 240만 = 660만 − 240만 = <strong>420만원</strong>
                    <br />· 농특세(20%): 420만 × 20% = 84만원
                    <br />· <strong>총 납부액(농특세 포함): 504만원</strong>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 3주택, 공시가격 합계 30억원</p>
                  <p className="text-sm text-text-secondary space-y-1">
                    <br />· 공제금액 차감: 30억 − 9억 = 21억원
                    <br />· 과세표준: 21억 × 60% = 12.6억원
                    <br />· 세율(3주택 중과): 12.6억원은 25억 이하 구간 → 2.0% (누진공제 없음)
                    <br />· 종부세액: 12.6억 × 2.0% = <strong>2,520만원</strong>
                    <br />· 농특세(20%): 2,520만 × 20% = 504만원
                    <br />· <strong>총 납부액(농특세 포함): 3,024만원</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">5단계: 세액공제 및 농어촌특별세 (종부세법 §9)</h2>
                <p>
                  산출된 종부세액에서 일정 조건의 세액공제를 받을 수 있습니다. 또한 농어촌특별세가 추가로 부과됩니다.
                </p>

                <h3 className="text-lg font-semibold mt-4">1세대1주택 세액공제 (종부세법 §9)</h3>
                <p>
                  고령자나 장기보유자는 세액공제를 받습니다. 공제율은 다음과 같습니다:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>60~64세: 20% 공제</li>
                  <li>65~69세: 30% 공제</li>
                  <li>70세 이상: 40% 공제</li>
                  <li>5년 이상 ~10년 미만: 20% 공제</li>
                  <li>10년 이상 ~15년 미만: 40% 공제</li>
                  <li>15년 이상: 50% 공제</li>
                </ul>
                <p className="mt-4">
                  두 조건을 모두 만족하면 공제율을 합산하되, <strong>최대 80%로 한정</strong>됩니다(종부세법 §9).
                </p>
                <p className="mt-2">
                  예: 70세 이상(40%) + 15년 이상 보유(50%) = 합산 90% → 한도 80% 적용 → 최종 세액공제 80%
                </p>

                <h3 className="text-lg font-semibold mt-6">농어촌특별세 (농특세법 §5)</h3>
                <p>
                  종합부동산세액이 정해진 후, 여기에 20%를 곱하여 농어촌특별세를 추가로 부과합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="text-sm text-text-secondary">
                    농어촌특별세 = 종부세액 × 20%
                  </p>
                </div>

                <p className="mt-4">
                  ⚠️ <strong>다만</strong> 세액공제는 종부세액에 먼저 적용되고, 감액된 세액에 대해 농특세 20%가 계산됩니다. 예를 들어 산출 종부세 1,000만원에서 80% 공제를 받으면 200만원만 납부하고, 농특세는 200만 × 20% = 40만원입니다.
                </p>
              </section>

              <AdSlot slot="guide-comprehensive-real-estate-tax-calculation-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">6월 1일 과세기준일 이해하기</h2>
                <p>
                  종합부동산세는 매년 6월 1일을 기준으로 부과됩니다. 6월 1일 현재 보유 중인 모든 주택이 대상이 됩니다.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>5월에 구입한 주택: 올해 6월 1일부터 종부세 과세 대상</li>
                  <li>6월 2일 이후 구입한 주택: 다음해 6월 1일부터 과세 대상</li>
                  <li>6월 1일 이전에 매도한 주택: 올해 과세 대상에서 제외</li>
                </ul>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">종부세 절감 전략</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 공시가격 이의신청:</strong> 공시가격이 실제 시세보다 높다면 고시 후 60일 내에 이의신청하여 과세표준을 낮출 수 있습니다.
                  </li>
                  <li>
                    <strong>2. 1세대1주택 유지:</strong> 공제금액이 12억으로 높으므로, 가능하면 1세대1주택 지위를 유지하는 것이 절세에 유리합니다.
                  </li>
                  <li>
                    <strong>3. 고령자·장기보유 세액공제 활용:</strong> 70세 이상 또는 15년 이상 보유자라면 최대 80%의 세액공제를 받을 수 있습니다.
                  </li>
                  <li>
                    <strong>4. 납기 내 납부:</strong> 기한 내 납부로 가산세를 피하고, 경우에 따라 조기납부 할인이 있을 수 있습니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/comprehensive-property-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">이 가이드의 내용을 바탕으로 직접 입력하여 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-who-pays-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종부세 누가 내나? 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">종부세 납세의무자와 공제 12억·9억의 의미를 한눈에 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/property-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">6월 1일 기준 주택 재산세 계산. 종부세와 별개입니다.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-calculation-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">종부세와는 다른 지방세 재산세의 계산 원리.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-base-date-june-1-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">6월 1일 과세기준일 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">종부세·재산세 과세기준일의 의미와 실무 팁.</p>
                  </Link>
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 전체 계산기 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 종합부동산세 계산은 해당 지역 세무서 또는 세무사와 상담 후 진행하세요. 본 콘텐츠는 2026-06-22를 기준으로 작성되었으며, 법령 변경 시 즉시 업데이트됩니다. 공정시장가액비율, 세액공제, 세율 변동사항은 국세청 고시, 법조항 <strong>종부세법 §7(납세의무자)·§8①(과세표준·공제금액 12억·9억)·§9①제1호(1~2주택 세율)·§9①제2호(3주택 이상 중과세율)·§9(고령자·장기보유 세액공제 80% 한도)</strong>, <strong>농특세법 §5(농어촌특별세 20%)</strong>를 참고하세요. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="종합부동산세 계산법 2026 가이드"
                url={URL}
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
