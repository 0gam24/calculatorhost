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

const URL = 'https://calculatorhost.com/guide/broker-fee-negotiation-savings-2026/';
const DATE_PUBLISHED = '2026-06-28';
const DATE_MODIFIED = '2026-06-28';

export const metadata: Metadata = {
  title: '중개수수료 협의로 아끼는 법 2026 — 상한요율 절약 완전정리',
  description:
    '중개수수료 상한요율은 법적 한도일 뿐, 협의로 깎을 수 있습니다. 거래금액 6억 기준 240만원을 200만으로 낮추는 협상 팁, 부가세 확인, 계약서 작성 전 확정 방법까지 2026 최신 정보.',
  keywords: [
    '중개수수료 협의',
    '중개비 깎기',
    '중개비 절약',
    '중개수수료 인하',
    '상한요율',
    '중개보수 협상',
    '부동산 중개비',
    '계약서 중개비',
    '공인중개사법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '중개수수료 협의로 아끼는 법 2026' }],
    title: '중개수수료 협의로 아끼는 법 2026',
    description: '상한요율은 협의 가능 — 거래 전 필수 확인 사항',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '중개수수료 협의로 아끼는 법 2026',
    description: '상한요율 협의·절약 완전정리',
  },
};

const FAQ_ITEMS = [
  {
    question: '중개수수료 상한요율을 반드시 내야 하나요?',
    answer:
      '아니요. 공인중개사법 §32에서 정한 상한요율은 법적 한도일 뿐 강제사항이 아닙니다. 매도자·매수자와 중개사 간 협의로 상한액 이하로 인하받을 수 있습니다. 다만 합의는 계약서 작성 전에 명시적으로 이루어져야 합니다.',
  },
  {
    question: '거래금액 6억원에 중개수수료를 협의할 수 있나요?',
    answer:
      '네. 6억원은 상한요율 0.4%(240만원)가 적용되는 구간입니다. 경기 상황, 거래 난도, 경쟁 정도에 따라 200만원, 180만원까지 협의 가능한 사례가 많습니다. 여러 중개사에 비교 견적을 받아 최저가를 확인하세요.',
  },
  {
    question: '어느 경우에 중개비 협상이 가능한가요?',
    answer:
      '거래액이 클수록, 경기가 침체할수록, 매도·매수 양쪽이 같은 중개사를 이용할 때 협상 여지가 큽니다. 또한 복잡한 거래(상속, 경매, 중개인 여럿)는 업무량이 적어 인하 여지가 적지만, 단순 거래는 협상 가능성이 높습니다.',
  },
  {
    question: '계약 후에 중개수수료를 깎을 수 있나요?',
    answer:
      '어렵습니다. 계약서에 서명한 후에는 약정 변경이 분쟁으로 이어질 가능성이 높습니다. 반드시 계약서 작성 전, 최종 중개비(부가세 포함)를 명시적으로 합의하고 계약서에 기록하세요. 합의 없이 서명하면 상한요율을 기준으로 청구될 수 있습니다.',
  },
  {
    question: '부가세를 빼달라고 할 수 있나요?',
    answer:
      '중개사가 부가가치세 과세사업자인 경우 부가세는 법적 의무이므로 면제를 요청할 수 없습니다. 다만 간이과세·면세 사업자인 경우 부가세가 없습니다. 계약 전에 중개사의 과세 형태를 명확히 확인하고, 최종 납부액(중개비+부가세)을 합의하세요.',
  },
  {
    question: '매도자와 매수자가 따로 중개사를 쓰면 어떻게 되나요?',
    answer:
      '각자 다른 중개사를 이용하면 중개비가 두 배가 될 수 있습니다. 예: 6억 거래에서 매도자 쪽 중개비 240만+매수자 쪽 중개비 240만=480만원. 반면 한 중개사가 양쪽을 모두 중개하면 중개비를 합의로 줄일 여지가 있습니다. 거래 시작 단계에 양쪽이 같은 중개사를 선택하는 것이 비용 절감에 유리합니다.',
  },
  {
    question: '반값 중개나 프롭테크 플랫폼은 안전한가요?',
    answer:
      '반값 중개사(0.2~0.3%)와 온라인 부동산 플랫폼이 늘어나고 있습니다. 낮은 중개비가 매력이지만, 중개사 경험, 거래 난도 대응, 사후 관리 수준을 함께 평가해야 합니다. 명확한 서비스 범위와 최종 납부액을 확인하고, 시뮬레이션으로 협회 표준 중개사와 비교하세요.',
  },
];

export default function BrokerFeeNegotiationSavingsPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '중개수수료 협의로 아끼는 법 2026' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: '중개수수료 협의로 아끼는 법 2026 — 상한요율 협의·절약 완전정리',
    description:
      '공인중개사법 §32 상한요율은 협의 가능한 한도일 뿐. 거래 전 협상 팁, 부가세 확인, 계약서 작성 전 최종 확정 방법, 반값 중개 비교까지 2026 최신 정보.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '중개수수료 협의',
      '중개비 깎기',
      '중개비 절약',
      '상한요율',
      '공인중개사법',
    ],
  });

  const webPageLd = buildWebPageJsonLd({
    name: '중개수수료 협의로 아끼는 법 2026 — 상한요율 협의·절약 완전정리',
    description:
      '중개수수료 상한요율은 법적 한도일 뿐 강제사항 아님. 협상 노하우, 부가세 확인, 계약서 작성 전 최종 합의 방법, 거래 유형별 협상 가능성을 정확히 정리합니다.',
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
                    { name: '중개수수료 협의로 아끼는 법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 · 8분 읽기 · 2026-06-28</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  중개수수료 협의로 아끼는 법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 상한요율 절약 완전정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택 매매·전세 거래 시 중개수수료는 공인중개사법 제32조로 상한요율이 정해집니다. 그러나 이 상한요율은 강제사항이 아니며, 중개사와 협의로 인하받을 수 있습니다. 거래금액 6억원일 때 240만원의 상한요율을 200만원, 180만원까지 깎는 것이 현실적으로 가능한 사례들입니다. 이 가이드에서는 중개비 협상의 기본 원칙, 협상 가능성을 높이는 상황, 부가세 확인 방법, 계약서 작성 전 반드시 해야 할 확인 사항을 정확히 정리합니다. 거래 전 이 정보를 숙지하면 수십만원에서 수백만원까지 절약할 수 있습니다.
                </p>
              </header>

              <AdSlot slot="guide-broker-fee-negotiation-savings-2026-top" format="horizontal" />

              {/* Structured Summary */}
              <div className="space-y-4 rounded-lg border border-border-base bg-bg-card p-4">
                <div>
                  <h3 className="font-bold text-text-primary">핵심 원칙</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    중개수수료 상한요율은 공인중개사법 제32조로 정해진 법적 한도일 뿐, 강제사항이 아닙니다. 중개사와의 협의로 상한액 이하의 금액으로 인하받을 수 있으며, 협상은 계약서 작성 전에 명시적으로 이루어져야 효력이 있습니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">핵심 수치</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">6억원 매매 상한요율</td>
                        <td className="py-2 font-semibold text-text-primary">0.4% = 240만원</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">협상으로 가능한 수준</td>
                        <td className="py-2 font-semibold text-text-primary">180~200만원 (10~25% 인하)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">법적 근거</td>
                        <td className="py-2 font-semibold text-text-primary">공인중개사법 §32</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">부가세 추가</td>
                        <td className="py-2 font-semibold text-text-primary">중개사 과세 형태에 따라 10%</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">합의 시점</td>
                        <td className="py-2 font-semibold text-text-primary">계약서 작성 전 필수</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">TL;DR</h3>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                    <li>• 상한요율은 협의 가능한 한도일 뿐 의무가 아님</li>
                    <li>• 거래액이 크거나 경기가 침체할수록 협상 여지가 큼</li>
                    <li>• 매도·매수가 같은 중개사를 쓸 때 협상 가능성 높음</li>
                    <li>• 부가세 포함 여부를 계약 전에 명시적으로 확인 필수</li>
                    <li>• 최종 중개비를 계약서에 명확히 기록해야 분쟁 예방</li>
                  </ul>
                </div>
              </div>

              {/* Section 1: 상한요율은 협의 가능한 한도 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  상한요율은 왜 협의 가능한가?
                </h2>
                <p data-speakable className="text-text-secondary">
                  공인중개사법 제32조에서 정한 중개수수료 요율은 <strong>'상한요율'</strong>입니다. 이는 중개사가 청구할 수 있는 최고 한도를 정한 것이며, 그 이하의 금액으로 합의하는 것은 법적으로 전혀 문제가 없습니다.
                </p>

                <p className="text-text-secondary">
                  법 조문을 보면 "중개수수료는 ~를 초과할 수 없다"라고 규정하고 있는데, 이는 상한을 정하는 것이지 정해진 가격을 강제하는 것이 아닙니다. 따라서 거래당사자와 중개사가 합의로 그 이하의 금액을 정하는 것은 전적으로 가능합니다.
                </p>

                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">공인중개사법 제32조</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    "중개수수료는 시행규칙 [별표]로 정한 상한액을 초과할 수 없다."
                  </p>
                  <p className="mt-3 text-xs text-text-secondary">
                    즉, 상한액 범위 내에서는 협의로 자유롭게 결정 가능합니다.
                  </p>
                </div>

                <p className="text-text-secondary">
                  다만 <strong>협의는 계약서 작성 전에 명시적으로 이루어져야</strong> 합니다. 계약 후 "중개비를 깎아달라"는 요청은 이미 합의된 계약 조건을 변경하는 것이므로 분쟁으로 이어질 수 있습니다.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    협의 결과는 <strong>반드시 표준 거래계약서에 명시</strong>되어야 효력이 있습니다. 구두 합의만으로는 나중에 분쟁이 생길 수 있으므로, "중개수수료 240만원(부가세 별도 또는 포함)"이라고 정확히 기록하세요.
                  </p>
                </div>
              </section>

              {/* Section 2: 어느 상황에 협상 여지가 있나 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  중개비 협상이 가능한 상황은?
                </h2>
                <p data-speakable className="text-text-secondary">
                  모든 거래에서 중개비 협상이 가능하지만, 실제로 협상 성공률과 할인 폭은 거래의 상황과 난도에 따라 크게 달라집니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">📊 거래금액이 클 때</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      6억원 이상의 대형 거래는 협상 여지가 큽니다. 상한요율 기준 240만원의 1~2%를 할인하는 것이 현실적으로 가능합니다. 예를 들어 6억원을 200만원(0.33%)에 합의하면 40만원(17% 할인)을 절약할 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">📉 경기가 침체할 때</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      거래량이 줄어드는 시기(금리 인상기, 경제 불황 등)에는 중개사도 거래를 유지하기 위해 협상에 응하기 쉽습니다. 이런 시기에는 상한요율에서 15~25% 할인을 받을 가능성이 높습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">🤝 매도·매수가 같은 중개사를 쓸 때</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      매도자의 중개사와 매수자의 중개사가 다르면 중개비가 두 배 청구됩니다. 그래서 많은 중개사들이 양쪽 거래를 직접 담당하려고 합니다. 이 경우 중개비를 협상으로 줄일 여지가 많습니다. 예를 들어 상한 240만원을 180만원으로 협의하고 양쪽에서 합의하면 중개사도 거래 효율성을 얻고 당사자도 비용을 절약합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">🏢 거래가 단순할 때</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      일반적인 아파트 매매처럼 복잡한 법적 문제가 없고, 번거로운 서류가 적을 때 협상 가능성이 높습니다. 반대로 상속, 경매, 임차권 관계 복잡한 거래는 업무량이 많아 협상 여지가 적습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">💰 당신이 좋은 거래선을 제공할 때</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      이미 다른 거래선으로 부동산을 중개해본 경험 있는 주인이라면, 신속하고 깔끔한 거래가 가능하다는 신호를 보내세요. 중개사는 대금 지급 불이행, 채무 문제, 기한 지연 등의 리스크를 줄이려고 하므로, 당신이 "신뢰할 수 있는 거래선"이라는 인상을 주면 중개비 협상이 수월합니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    반대로 거래가 복잡하거나, 당신이 새로운 거래선이거나, 경기가 좋아서 거래가 많은 시기에는 협상 여지가 거의 없을 수 있습니다. 이 경우 상한요율을 기준으로 청구될 가능성이 높으므로, 미리 여러 중개사의 견적을 받아 비교하는 것이 좋습니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-broker-fee-negotiation-savings-2026-mid" format="rectangle" />

              {/* Section 3: 중개비 협상 실전 팁 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  중개비 협상을 성공시키는 실전 팁
                </h2>
                <p data-speakable className="text-text-secondary">
                  단순히 "중개비를 깎아달라"고 요청하는 것보다 전략적으로 접근하면 협상 성공률이 높아집니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">1️⃣ 계약서 작성 전에 미리 협상하기</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      부동산 거래는 계약 직전이 중개비 협상의 최적 시점입니다. 당사자가 이미 그 부동산으로 결정했고, 중개사 입장에서는 거래가 확정되는 단계이기 때문입니다. "이 조건이면 계약을 진행하겠습니다"라는 신호를 보내면 중개사도 협상에 응하기 쉽습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">2️⃣ 여러 중개사에 견적 비교하기</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      같은 부동산이라도 중개사마다 제시하는 중개비가 다를 수 있습니다. A 중개사는 240만원(상한요율), B 중개사는 210만원, C 중개사는 190만원을 제시할 수 있습니다. 최소 3~5개 중개사에 비교 견적을 받으면 시장 가격을 파악할 수 있고, 그 정보를 바탕으로 협상을 유리하게 이끌 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">3️⃣ 부가세 포함 여부를 명확히 하기</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      중개사가 240만원을 제시했을 때 "부가세는 별도인가?"를 반드시 확인하세요. 일반과세사업자라면 240만+24만(부가세)=264만원을 내야 합니다. 반면 중개사가 간이과세거나 면세사업자라면 부가세가 없습니다. 이를 명확히 하면, 상한요율 기준 총액(240만+부가세)에서 일부를 깎는 협상이 가능합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">4️⃣ 매도·매수 모두에게 같은 중개사 추천하기</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      매도자와 매수자가 서로 다른 중개사를 쓰면 중개비가 두 배 청구됩니다. 거래 초기 단계에서 "한 중개사가 양쪽을 중개하면 중개비를 협상할 수 있다"고 상대방을 설득하세요. 일반적으로 양쪽이 같은 중개사를 쓰면 중개비를 10~15% 정도 깎을 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">5️⃣ 최종 금액을 계약서에 명시하기</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      협상 후 합의한 중개비(예: 200만원, 부가세 포함)를 <strong>반드시 표준 거래계약서의 "중개수수료" 칸에 기록</strong>하세요. 구두 약속만으로는 나중에 상한요율을 기준으로 청구될 수 있습니다. 계약서에 명시되어야만 법적 효력이 있습니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    무리한 협상 요청(예: 상한요율의 50% 이상 할인)은 중개사를 무시하는 것으로 느껴질 수 있고, 결과적으로 거래 진행을 방해할 수 있습니다. 상한요율에서 10~25% 정도 인하하는 것이 현실적이고 양쪽 모두 만족할 수 있는 범위입니다.
                  </p>
                </div>
              </section>

              {/* Section 4: 부가세 확인 사항 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  부가세 확인은 왜 중요한가?
                </h2>
                <p data-speakable className="text-text-secondary">
                  중개수수료의 실제 부담액은 중개비 자체뿐만 아니라 부가세 여부에 따라 크게 달라집니다. 240만원의 중개비라도 부가세에 따라 264만원이 될 수도, 240만원으로 끝날 수도 있습니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">일반과세사업자</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      중개사가 <strong>일반과세사업자</strong>인 경우, 중개수수료는 부가가치세 과세 대상입니다. 즉, 중개비 + 10% 부가세를 내야 합니다.
                      <br />
                      예: 240만원 × 110% = 264만원
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">간이과세사업자</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <strong>간이과세사업자</strong>인 중개사는 부가세를 내지 않거나 매우 낮은 수준의 세금만 냅니다. 중개수수료만 지급하면 되므로, 일반과세 사업자보다 총액이 낮습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">면세사업자</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      부동산 중개사 중 일부는 <strong>면세사업자</strong> 등록되어 있습니다. 이 경우 부가세를 청구할 수 없으므로 중개수수료만 지급하면 됩니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary">
                  <strong>중개비 협상 시 부가세 여부를 반드시 확인하세요.</strong> 중개사에게 "당신은 일반과세인가, 간이과세인가?" 또는 "부가세는 별도 청구인가, 포함인가?"를 명확히 물어야 합니다. 중개비만 합의하고 부가세 여부를 모호하게 두면, 나중에 생각보다 많은 금액을 내게 될 수 있습니다.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    부가세 포함 여부는 중개사의 과세 형태에 따라 결정되므로 "부가세를 깎아달라"는 요청은 불가능합니다. 다만 부가세가 발생하는 일반과세 사업자라면, 중개비 자체(예: 240만원)를 협상으로 200만원으로 낮추고, 부가세는 별도로 계산하도록 명확히 하는 방식으로 협상할 수 있습니다.
                  </p>
                </div>
              </section>

              {/* FAQ Section (중간 배치) */}
              <FaqSection items={FAQ_ITEMS} />

              {/* Section 5: 반값 중개 & 프롭테크 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  반값 중개나 온라인 플랫폼은 어떨까?
                </h2>
                <p data-speakable className="text-text-secondary">
                  최근 몇 년간 전통 중개사보다 훨씬 낮은 중개비(0.2~0.3%)를 제시하는 반값 중개나 온라인 부동산 플랫폼이 늘어나고 있습니다. 이들은 직원 수를 줄이거나 온라인 자동화를 통해 비용을 절감함으로써 저가 중개비를 제공합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">✅ 반값 중개의 장점</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      • 중개비가 전통 중개사의 50~60% 수준으로 매우 저렴
                      <br />
                      • 온라인으로 진행되는 거래는 신속하고 깔끔한 경향
                      <br />
                      • 젊은 세대가 사용하기 편한 UI·UX
                      <br />
                      • 예약제로 번거로운 중개사 방문이 적음
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">⚠️ 반값 중개의 단점</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      • 중개사 경험과 신뢰도가 확인되지 않을 수 있음
                      <br />
                      • 거래 중 예상치 못한 문제 발생 시 대응 속도 느림
                      <br />
                      • 24시간 전문 상담이 어려울 수 있음
                      <br />
                      • 사기나 소비자 피해 발생 시 구제 절차가 불명확할 수 있음
                      <br />
                      • 서비스 범위가 제한적 (예: 인근 시세 자료 제공 없음)
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary">
                  반값 중개를 이용할 때는 다음을 반드시 확인하세요:
                </p>

                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• 회사 등록 정보 및 공인중개사 자격증 확인</li>
                  <li>• 서비스 범위 명시 (예약, 계약서 작성, 잔금 확인 등)</li>
                  <li>• 문제 발생 시 연락처와 대응 절차</li>
                  <li>• 부가세 포함 여부</li>
                  <li>• 거래 후 사후 관리 또는 하자 담보 여부</li>
                </ul>

                <p className="text-text-secondary">
                  결론적으로, <strong>중개비가 저렴한 것도 중요하지만 서비스 수준과 신뢰도도 함께 평가</strong>해야 합니다. 협회 표준 중개사 240만원과 반값 중개 120만원을 단순 비교하기보다, 각 중개사가 제공하는 서비스 범위, 부가세, 사후 관리 등을 모두 고려하여 선택하세요.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    중개수수료는 중개사의 서비스 원가입니다. 지나치게 저가 중개사는 서비스 품질 저하나 거래 위험 증가로 이어질 수 있습니다. 특히 첫 거래라면 경험 많은 중개사를 선택하고 중개비를 협상하는 것이 더 안전할 수 있습니다.
                  </p>
                </div>
              </section>

              {/* Related Guides */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">관련 계산기 & 가이드</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/calculator/broker-fee/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">👉 중개수수료 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      거래금액 입력하면 상한요율·부가세 자동 계산
                    </p>
                  </Link>

                  <Link
                    href="/guide/real-estate-broker-fee-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">중개수수료 요율표</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      매매·전세·월세 구간별 상한요율 정확 정리
                    </p>
                  </Link>

                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">취득세 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      주택 구매 시 취득세+지방교육세 자동 계산
                    </p>
                  </Link>

                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">양도소득세 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      주택 판매 시 세금 계산 (1주택 비과세 포함)
                    </p>
                  </Link>

                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">전월세 전환율 계산</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      보증금 ↔ 월세 환산, 중개비 연동 계산
                    </p>
                  </Link>

                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">부동산 카테고리</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      모든 부동산 거래 계산기 & 가이드
                    </p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 & AI 표기 */}
              <footer className="border-t border-border-base pt-8 text-xs text-text-tertiary">
                <p className="mb-3">
                  이 가이드는 <strong>2026년 6월 28일</strong> 기준으로 작성되었습니다. 공인중개사법 제32조, 동 시행규칙 제20조를 참고하여 정확성을 기했으나, 정책 개정 또는 지자체 조례 변경 시 달라질 수 있습니다.
                </p>
                <p className="mb-3">
                  중개수수료 상한요율은 협의 가능한 한도일 뿐이며, 실제 중개비는 거래 상황, 거래액, 경기, 중개사 형태 등에 따라 결정됩니다. 모든 협의는 계약서 작성 전에 명시적으로 이루어져야 하며, 계약서에 최종 금액(부가세 포함 여부)이 명확히 기록되어야 분쟁을 예방할 수 있습니다.
                </p>
                <p className="mb-3">
                  본 가이드는 <strong>Claude(Anthropic)의 지원을 받아 작성된 후 운영자가 공인중개사법, 한국공인중개사협회 기준으로 검수</strong>했습니다.
                </p>
                <p>
                  최신 법령, 요율, 지자체 규제는 <Link href="https://www.kar.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    한국공인중개사협회
                  </Link>, <Link href="https://law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    국가법령정보센터(law.go.kr)
                  </Link>, <Link href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    국토교통부
                  </Link>에서 확인하세요.
                </p>
                <p className="mt-3">
                  © 2026 <Link href="/" className="text-primary-500 underline">
                    calculatorhost.com
                  </Link>
                  . 모든 권리 보유.
                </p>
              </footer>

              <ShareButtons
                title="중개수수료 협의로 아끼는 법 2026"
                url={URL}
                description="상한요율 협의·절약 완전정리. 거래 전 반드시 확인하세요."
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
