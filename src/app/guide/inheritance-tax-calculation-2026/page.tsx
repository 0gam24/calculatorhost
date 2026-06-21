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

const URL = 'https://calculatorhost.com/guide/inheritance-tax-calculation-2026/';
const DATE_PUBLISHED = '2026-06-21';
const DATE_MODIFIED = '2026-06-21';

export const metadata: Metadata = {
  title: '상속세 계산법 2026 | 과세표준·공제·납부세액 완벽 가이드 | calculatorhost',
  description:
    '상속세를 정확히 계산하는 방법. 5단계 누진세율·일괄공제 5억·배우자공제·신고세액공제까지 완벽 정리. 상증세법 §26 기준.',
  keywords: [
    '상속세 계산',
    '상속세율 2026',
    '상속공제',
    '일괄공제 5억',
    '배우자 상속공제',
    '상증세법 26조',
    '상속재산가액',
    '과세표준',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속세 계산법 2026 | 과세표준·공제·납부세액 완벽 가이드 | calculatorhost' }],
    title: '상속세 계산법 2026',
    description: '상속재산부터 최종 납부세액까지. 5단계 누진세율과 각종 공제 정확히 계산하는 법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '상속세와 증여세의 세율이 같나요?',
    answer:
      '네, 같습니다. 상증세법 §26에서 규정하는 5단계 누진세율(10%~50%)이 상속세와 증여세 모두에 적용됩니다. 다만 상속공제와 증여공제의 종류·금액이 다르므로, 과세표준 계산 단계부터 차이가 발생합니다.',
  },
  {
    question: '일괄공제 5억과 기초공제 2억은 어떻게 다른가요?',
    answer:
      '기초공제 2억은 모든 상속에 기본 적용되는 공제이고, 일괄공제 5억은 기초공제·배우자공제·미성년자공제·장애인공제의 합계와 비교하여 큰 금액을 선택하는 방식입니다. 실무에서는 통상 5억이 더 유리하므로 대부분 일괄공제 5억이 적용됩니다.',
  },
  {
    question: '배우자가 없으면 배우자공제를 못 받나요?',
    answer:
      '네, 배우자공제(최소 5억~최대 30억)는 배우자가 있을 때만 적용됩니다. 배우자가 없는 경우 기초공제 2억 또는 일괄공제 5억만 적용되고, 자녀공제(1인당 5,000만)를 추가로 받을 수 있습니다.',
  },
  {
    question: '미성년 자녀가 있으면 세액이 줄어드나요?',
    answer:
      '네. 미성년자공제 1인당 연 1,000만원이 적용됩니다. 예를 들어 만 15세 자녀면 상속 시점부터 20세까지 5년간 인정되므로 1,000만×5년=5,000만원의 공제. 다만 이는 누진공제 계산에 포함되는 금액이므로, 실제 세액 감소는 더 클 수 있습니다.',
  },
  {
    question: '상속재산이 정확히 얼마인지 모르면?',
    answer:
      '국세청이 정한 평가기준(주택은 공시가격, 예금은 잔액, 부채는 실제 채무액)에 따라 국세청에 조회하여 상속재산가액을 확정할 수 있습니다. 부동산은 감정평가를 받거나, 공시가격 기준으로 하되, 실제 거래 근거가 있으면 다시 조정될 수 있습니다.',
  },
  {
    question: '신고세액공제는 어떻게 적용되나요?',
    answer:
      '상증세법 §68에 따라 기한 내 자진신고 시 신고세액공제가 적용됩니다. 정확한 공제율은 신고 시점과 납부 상황에 따라 달라지므로, 반드시 세무사·국세청과 상담 후 신고하시기 바랍니다.',
  },
  {
    question: '상속세를 내지 않는 경우가 있나요?',
    answer:
      '네. 상속재산가액이 과세표준 미달선 이하면 상속세가 발생하지 않습니다. 예를 들어 배우자와 자녀만 있고, 상속재산이 10억원 미만이면 각종 공제 후 과세표준이 0이 되어 상속세 납부 불필요. 다만 신고는 여전히 필요합니다.',
  },
];

export default function InheritanceTaxCalculation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속세 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속세 계산법 2026 — 과세표준·공제·납부세액',
    description:
      '상속재산부터 최종 납부세액까지. 5단계 누진세율과 각종 공제를 정확히 적용하는 방법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속세', '상속공제', '누진세율', '계산', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속세 계산법 2026',
    description:
      '상속세를 명확히 이해하고 정확하게 계산하는 방법. 상속공제부터 최종 납부세액까지.',
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
                    { name: '상속세 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인·유산관리자 · 12분 읽기 · 2026-06-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속세 계산법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 과세표준부터 최종 납부세액까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  상속이 발생하면 상속세를 정확히 계산하는 것은 복잡한 과정입니다. 상속재산 파악부터 각종 공제 적용, 5단계 누진세율까지 한 단계도 놓칠 수 없습니다. 이 가이드는 상속세를 처음부터 끝까지 정확하게 계산하는 방법을 체계적으로 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-inheritance-tax-top" format="horizontal" />

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">상속세 5단계 세율표와 누진공제</h2>
                <p data-speakable>
                  상속세는 <strong>상증세법 §26</strong>에서 정한 5단계 누진세율이 적용됩니다. 과세표준이 높을수록 세율이 올라가며, 누진공제를 차감하여 최종 세액을 계산합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-sm text-text-secondary mb-3 text-left">상증세법 §26에 따른 상속세·증여세 공통 5단계 누진세율</caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-card">
                        <th scope="col" className="text-left p-3 font-semibold">과세표준 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold">누진공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억 이하</td>
                        <td className="p-3">10%</td>
                        <td className="p-3">0</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1억 초과 ~ 5억 이하</td>
                        <td className="p-3">20%</td>
                        <td className="p-3">1,000만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5억 초과 ~ 10억 이하</td>
                        <td className="p-3">30%</td>
                        <td className="p-3">6,000만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10억 초과 ~ 30억 이하</td>
                        <td className="p-3">40%</td>
                        <td className="p-3">1억 6,000만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30억 초과</td>
                        <td className="p-3">50%</td>
                        <td className="p-3">4억 6,000만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>누진공제란?</strong> 세율 구간이 높아질수록 중복 과세를 피하기 위해 차감하는 금액입니다. 예를 들어 과세표준 5억원이면 5억×20%−1,000만=9,000만원이 됩니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">1단계: 상속재산가액 파악</h2>
                <p data-speakable>
                  상속세 계산의 첫 단계는 <strong>상속재산이 정확히 얼마인지 파악</strong>하는 것입니다. 상속재산은 피상속인(돌아가신 분)이 남긴 모든 재산입니다. 여기에는 부동산, 예금, 주식, 자동차, 보험금 등이 포함됩니다. 각 재산은 피상속인 사망 당시를 기준으로 평가합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-2">상속재산 평가 기준</p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>부동산 → 공시가격 또는 감정평가가</li>
                    <li>예금 → 잔액 + 이자</li>
                    <li>주식 → 사망일의 종가</li>
                    <li>보험금 → 지급액</li>
                    <li>부채 → 실제 채무액(공제 대상)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">2단계: 상속공제 적용 — 5가지 공제 이해하기</h2>
                <p data-speakable>
                  상속세 계산에서 가장 중요한 단계입니다. 상속공제는 <strong>상증세법 §18~§21</strong>에서 규정하며, 5가지 종류가 있습니다. 이들 중 가장 유리한 방식을 선택하여 적용합니다.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">기초공제 2억원</h3>
                    <p className="text-sm text-text-secondary">
                      상속세법 §18. 모든 상속에 기본 적용되는 공제입니다. 상속재산가액에서 항상 2억을 먼저 차감합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">일괄공제 5억원</h3>
                    <p className="text-sm text-text-secondary">
                      상속세법 §21. 기초공제(2억)·배우자공제·미성년자공제·장애인공제의 합계와 비교하여 <strong>큰 금액</strong>을 선택합니다. 실무에서는 대부분 일괄공제 5억이 유리합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">배우자 상속공제</h3>
                    <p className="text-sm text-text-secondary">
                      상속세법 §19. 배우자가 있을 때만 적용됩니다. <strong>최소 5억원 ~ 최대 30억원</strong>. 배우자가 받는 상속재산액에 따라 달라집니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">자녀공제 1인당 5,000만원</h3>
                    <p className="text-sm text-text-secondary">
                      상속세법 §20. 성년 자녀 1명당 5,000만원씩 공제됩니다. 자녀 수에 따라 누적됩니다. 예: 자녀 2명 = 1억원 공제.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">미성년자공제 1인당 연 1,000만원</h3>
                    <p className="text-sm text-text-secondary">
                      상속세법 §20. 미성년 자녀(만 20세 미만)는 20세까지의 남은 해마다 1,000만원씩 공제됩니다. 예: 만 15세 자녀 = 5년×1,000만=5,000만원.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>실무 팁:</strong> 일괄공제 5억이 기초공제+기타인적공제보다 크면 일괄공제를 선택합니다. 배우자가 있는 경우, 배우자공제(최소 5억)가 일괄공제 5억과 기타공제보다 크면 배우자공제를 선택하는 것이 유리합니다.
                </p>
              </section>

              <AdSlot slot="guide-inheritance-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">3단계: 과세표준 계산</h2>
                <p data-speakable>
                  <strong>과세표준 = 상속재산가액 − 상속공제</strong>
                </p>
                <p>
                  각종 공제를 결정한 후, 상속재산가액에서 차감하면 과세표준이 계산됩니다. 이 과세표준에 위 5단계 세율을 적용합니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">구체적 예시 1: 배우자와 자녀가 있는 경우</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">상속재산: 15억원</span>
                    <span className="block">상속인: 배우자 + 자녀 2명</span>
                    <span className="block">공제 선택: 일괄공제 5억 + 배우자공제 5억(최소) = 10억원</span>
                    <span className="block font-semibold">→ 과세표준 = 15억 − 10억 = 5억원</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">구체적 예시 2: 배우자 없이 자녀만 있는 경우</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">상속재산: 8억원</span>
                    <span className="block">상속인: 자녀 1명만</span>
                    <span className="block">공제 선택: 일괄공제 5억원</span>
                    <span className="block font-semibold">→ 과세표준 = 8억 − 5억 = 3억원</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">4단계: 산출세액 계산 — 누진세율 적용</h2>
                <p data-speakable>
                  <strong>산출세액 = 과세표준 × 세율 − 누진공제</strong>
                </p>
                <p>
                  과세표준을 구한 후, 위의 5단계 세율표에서 해당 구간을 찾아 세율을 적용합니다. 반드시 누진공제를 차감해야 정확한 세액이 계산됩니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">예시 1 계산: 과세표준 5억원</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">과세표준: 5억원 (위 예시 1에서 계산)</span>
                    <span className="block">세율 구간: 1억 초과 ~ 5억 이하 → 20% 적용</span>
                    <span className="block">누진공제: 1,000만</span>
                    <span className="block font-semibold">→ 산출세액 = 5억 × 20% − 1,000만 = 1억 − 1,000만 = 9,000만원</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">예시 2 계산: 과세표준 3억원</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">과세표준: 3억원 (위 예시 2에서 계산)</span>
                    <span className="block">세율 구간: 1억 초과 ~ 5억 이하 → 20% 적용</span>
                    <span className="block">누진공제: 1,000만</span>
                    <span className="block font-semibold">→ 산출세액 = 3억 × 20% − 1,000만 = 6,000만 − 1,000만 = 5,000만원</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">5단계: 신고세액공제 및 최종 납부세액</h2>
                <p data-speakable>
                  산출세액에서 신고세액공제를 적용하면 <strong>최종 납부세액</strong>이 됩니다.
                </p>
                <p>
                  상증세법 §68에 따라 기한 내 자진신고 시 신고세액공제가 적용됩니다. 정확한 공제 내용과 방법은 신고 시점, 납부 상황 등에 따라 달라지므로 반드시 세무사나 국세청과 상담하여 신고하시기 바랍니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">최종 납부 계산</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">산출세액: (위 단계에서 계산)</span>
                    <span className="block">− 신고세액공제: (기한 내 자진신고 시 적용 — 정확 % 신고 시점 협의)</span>
                    <span className="block font-semibold">= 최종 납부세액</span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>중요:</strong> 신고 기한은 피상속인 사망일부터 6개월입니다. 기한 내 신고하지 않으면 가산세가 부과될 수 있으므로, 가급적 세무사와 협력하여 정확하게 신고하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">상속세 절감 팁 3가지</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 공제 최적화:</strong> 일괄공제 5억과 기초공제+배우자공제·자녀공제를 비교하여 가장 큰 금액을 선택합니다. 배우자가 있는 경우 배우자공제(최소 5억~최대 30억) 계산이 매우 중요.
                  </li>
                  <li>
                    <strong>2. 부채 적절히 활용:</strong> 상속재산에서 피상속인의 채무, 장례비용, 상속세 납부 예상액 등을 빼서 실제 과세표준을 낮출 수 있습니다.
                  </li>
                  <li>
                    <strong>3. 기한 내 자진신고:</strong> 신고세액공제를 받기 위해 반드시 기한 내(6개월)에 신고하세요. 늦은 신고는 가산세 부과 대상입니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6 border-t border-border-base pt-8">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">이 가이드에서 배운 공제와 세율을 직접 적용해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">같은 5단계 세율이 적용되는 증여세도 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-10-year-prior-gift-aggregation"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">10년 전 증여 합산</div>
                    <p className="mt-1 text-sm text-text-secondary">상속 발생 10년 내 증여는 합산 과세됩니다. 자세히 알아보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금 카테고리</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 취득세 등 다른 세금 가이드도 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 대출 vs 증여</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀에게 돈을 줄 때 대출로 구조화하면 증여세를 피할 수 있습니다.</p>
                  </Link>
                  <Link
                    href="/guide/carry-over-basis-spouse-gift-5-10-year"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 증여 전략</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자에게 증여할 때 세금을 최소화하는 방법.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 상속세 신고는 세무사·회계사와 상담 후 진행하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었습니다.
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>법적 근거:</strong> 상속세 및 증여세법 §26(세율)·§18(기초공제)·§19(배우자공제)·§20(자녀·미성년자공제)·§21(일괄공제)·§68(신고세액공제)
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>업데이트:</strong> 2026-06-21 작성. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="상속세 계산법 2026"
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
