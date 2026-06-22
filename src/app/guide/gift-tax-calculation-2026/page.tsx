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

const URL = 'https://calculatorhost.com/guide/gift-tax-calculation-2026/';
const DATE_PUBLISHED = '2026-06-22';
const DATE_MODIFIED = '2026-06-22';

export const metadata: Metadata = {
  title: '증여세 계산법 2026 | 과세표준·공제·납부세액 완벽 가이드 | calculatorhost',
  description:
    '증여세를 정확히 계산하는 방법. 5단계 누진세율·증여재산공제(배우자 6억·자녀 5천만)·신고세액공제까지 완벽 정리. 상증세법 §26 기준.',
  keywords: [
    '증여세 계산',
    '증여세율 2026',
    '증여재산공제',
    '배우자 증여공제',
    '신고세액공제',
    '상증세법 26조',
    '증여세 10년 합산',
    '과세표준',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '증여세 계산법 2026 | 과세표준·공제·납부세액 완벽 가이드 | calculatorhost' }],
    title: '증여세 계산법 2026',
    description: '증여재산부터 최종 납부세액까지. 5단계 누진세율과 각종 공제 정확히 계산하는 법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '증여세는 언제 내나요?',
    answer:
      '증여세는 증여받은 날부터 3개월 이내에 신고하고 납부해야 합니다. 다만 신고세액공제를 받으려면 기한 내 신고가 필수입니다. 늦은 신고는 가산세 부과 대상이 됩니다.',
  },
  {
    question: '배우자에게 증여하면 증여세를 안 내도 되나요?',
    answer:
      '아닙니다. 배우자도 증여세 대상입니다. 다만 증여재산공제로 배우자 6억원까지 공제되므로, 6억원 이하의 증여는 증여세가 0원입니다. 6억원을 초과하는 부분만 과세표준이 됩니다.',
  },
  {
    question: '10년 전 증여도 포함되나요?',
    answer:
      '네. 현재 증여 시점으로부터 10년 이내에 같은 증여자로부터 받은 증여는 모두 합산됩니다. 예를 들어 5년 전에 2억원을 받았고, 이번에 3억원을 받으면 과세표준은 5억원으로 계산됩니다.',
  },
  {
    question: '미성년 자녀에게 증여하면 공제가 더 크나요?',
    answer:
      '네. 성년 자녀는 5천만원 공제인 반면, 미성년 자녀는 2천만원만 공제됩니다. 다만 미성년자공제(상속세에서 연 1천만원)는 증여세에는 적용되지 않습니다. 증여재산공제는 별개입니다.',
  },
  {
    question: '증여세 계산기로 얼마나 절약할 수 있나요?',
    answer:
      '절약 가능성은 증여 금액과 구성에 따라 달라집니다. 배우자공제 6억, 자녀공제 5천만씩을 효율적으로 배분하면 상당한 세액을 줄일 수 있습니다. 시뮬레이션은 계산기에서 직접 확인하세요.',
  },
  {
    question: '부모에게 증여를 받으면 직계존속공제도 되나요?',
    answer:
      '네. 자녀 입장에서 부모로부터 증여를 받으면 직계존속 공제 5천만원이 적용됩니다. 다만 배우자 6억, 자녀 5천만 공제와는 별개의 관계군이므로, 어느 것이 유리한지는 개인 상황에 따라 다릅니다.',
  },
  {
    question: '신고하지 않으면 어떻게 되나요?',
    answer:
      '미신고 시 무신고 가산세와 납부지연 가산세가 함께 부과되어 세 부담이 크게 늘어납니다. 또한 세무조사 대상이 될 수 있으므로 반드시 기한 내에 신고하세요.',
  },
];

export default function GiftTaxCalculation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '증여세 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '증여세 계산법 2026 — 과세표준·공제·납부세액',
    description:
      '증여재산부터 최종 납부세액까지. 5단계 누진세율과 증여재산공제를 정확히 적용하는 방법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['증여세', '증여재산공제', '누진세율', '계산', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '증여세 계산법 2026',
    description:
      '증여세를 명확히 이해하고 정확하게 계산하는 방법. 증여재산공제부터 최종 납부세액까지.',
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
                    { name: '증여세 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">증여자·수증자 · 11분 읽기 · 2026-06-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  증여세 계산법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 과세표준부터 최종 납부세액까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  재산을 남에게 무상으로 주는 증여는 세금이 따릅니다. 증여받은 재산이 얼마나 될지, 세금은 얼마일지를 정확히 계산하는 것은 필수입니다. 증여재산 평가부터 증여재산공제, 5단계 누진세율까지 한 단계도 놓칠 수 없습니다. 이 가이드는 증여세를 처음부터 끝까지 정확하게 계산하는 방법을 체계적으로 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-gift-tax-calculation-top" format="horizontal" />

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">증여세 5단계 세율표와 누진공제</h2>
                <p data-speakable>
                  증여세는 <strong>상증세법 §26</strong>에서 정한 5단계 누진세율이 적용됩니다. 과세표준이 높을수록 세율이 올라가며, 누진공제를 차감하여 최종 세액을 계산합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-sm text-text-secondary mb-3 text-left">상증세법 §26에 따른 증여세·상속세 공통 5단계 누진세율</caption>
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
                    <strong>누진공제란?</strong> 세율 구간이 높아질수록 중복 과세를 피하기 위해 차감하는 금액입니다. 예를 들어 과세표준 3억원이면 3억×20%−1,000만=5,000만원이 됩니다.
                  </p>
                </div>
                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 다만:</strong> 증여세와 상속세는 같은 세율표를 사용하지만, 적용되는 공제의 종류와 금액이 다르므로 과세표준 계산 단계부터 차이가 발생합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">1단계: 증여재산가액 파악</h2>
                <p data-speakable>
                  증여세 계산의 첫 단계는 <strong>증여받은 재산이 정확히 얼마인지 파악</strong>하는 것입니다. 증여재산은 증여자가 증여받은 사람에게 무상으로 넘기는 모든 재산입니다. 여기에는 부동산, 예금, 주식, 자동차, 보험금, 채권 등이 포함됩니다. 각 재산은 증여일을 기준으로 평가합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-2">증여재산 평가 기준</p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>부동산 → 공시가격 또는 감정평가가</li>
                    <li>예금 → 잔액 + 이자</li>
                    <li>주식 → 증여일의 종가</li>
                    <li>보험금 → 지급액</li>
                    <li>채권 → 액면가 또는 공정시장가액</li>
                    <li>자동차 → 국세청 고시 기준가</li>
                  </ul>
                </div>
                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 주의:</strong> 부동산은 감정평가를 받거나 공시가격을 기준으로 하되, 실제 거래 근거가 있으면 다시 조정될 수 있습니다. 국세청의 공정시장가액 평가가 최종 기준입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">2단계: 증여재산공제 적용 — 관계별 공제액 이해하기</h2>
                <p data-speakable>
                  증여세 계산에서 가장 중요한 단계입니다. 증여재산공제는 <strong>관계별로 차등 적용</strong>되며, 10년 동안 누적됩니다. 같은 증여자로부터 10년 이내에 여러 번 증여를 받았다면, 모든 증여액을 합산하여 공제를 적용합니다.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">배우자에게 증여: 6억원 공제</h3>
                    <p className="text-sm text-text-secondary">
                      부부 간의 증여는 증여재산공제로 6억원이 인정됩니다. 배우자에게 6억원 이하를 증여하면 증여세가 0원입니다. 이는 혼인관계가 지속되는 한 계속 적용됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">성년 자녀에게 증여: 5,000만원 공제</h3>
                    <p className="text-sm text-text-secondary">
                      자녀가 20세 이상일 때 받은 증여는 자녀 1명당 5,000만원 공제됩니다. 자녀가 여럿이면 각각 5,000만원씩 공제되므로, 자녀 2명이면 1억원입니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">미성년 자녀에게 증여: 2,000만원 공제</h3>
                    <p className="text-sm text-text-secondary">
                      자녀가 20세 미만일 때 받은 증여는 자녀 1명당 2,000만원 공제입니다. 성년이 되면 이후 증여부터는 5,000만원이 됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">부모로부터 증여: 5,000만원 공제</h3>
                    <p className="text-sm text-text-secondary">
                      자녀가 부모로부터 받는 증여는 직계존속 관계로 분류되어 1명당 5,000만원 공제됩니다. 부모 양쪽에서 받으면 각각 5,000만원씩 적용됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">기타 친족에게 증여: 1,000만원 공제</h3>
                    <p className="text-sm text-text-secondary">
                      형제자매, 조부모, 손자손녀 등 다른 친족으로부터의 증여는 1명당 1,000만원만 공제됩니다. 친족이 아닌 타인으로부터의 증여는 공제가 없습니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-6">
                  <p className="font-semibold text-text-primary text-sm mb-3">10년 합산 원칙</p>
                  <p className="text-sm text-text-secondary">
                    현재 증여일부터 10년 이내에 같은 증여자로부터 받은 증여는 모두 합산됩니다. 예: 5년 전 부모에게 2억원, 올해 3억원을 받으면, 과세표준은 5억원−5,000만(공제)=4.5억원입니다.
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 주의:</strong> 공제는 관계별로 따로 계산합니다. 배우자 6억, 자녀 5,000만은 별개이므로, 부부가 함께 증여받는 경우 각각 자신의 공제를 받을 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-gift-tax-calculation-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">3단계: 과세표준 계산</h2>
                <p data-speakable>
                  <strong>과세표준 = 증여재산가액 − 증여재산공제</strong>
                </p>
                <p>
                  증여받은 재산에서 해당 관계별 공제를 차감하면 과세표준이 계산됩니다. 이 과세표준에 위 5단계 세율을 적용합니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">구체적 예시 1: 성년 자녀에게 3억원 증여</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">증여재산: 3억원</span>
                    <span className="block">수증자: 성년 자녀</span>
                    <span className="block">공제: 성년 직계비속 5,000만원</span>
                    <span className="block font-semibold">→ 과세표준 = 3억 − 5,000만 = 2.5억원</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">구체적 예시 2: 배우자에게 5억원 증여</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">증여재산: 5억원</span>
                    <span className="block">수증자: 배우자</span>
                    <span className="block">공제: 배우자 6억원 (공제 한도 내)</span>
                    <span className="block font-semibold">→ 과세표준 = 5억 − 6억 = 0원 (증여세 0원)</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">구체적 예시 3: 5년 전 자녀에게 2억원, 올해 3억원 증여 (10년 합산)</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">이전 증여: 2억원 (5년 전)</span>
                    <span className="block">현재 증여: 3억원</span>
                    <span className="block">합계 증여액: 5억원</span>
                    <span className="block">공제: 성년 직계비속 5,000만원 (1회만 적용)</span>
                    <span className="block font-semibold">→ 과세표준 = 5억 − 5,000만 = 4.5억원</span>
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
                  <p className="font-semibold text-text-primary text-sm mb-3">예시 1 계산: 과세표준 2.5억원</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">과세표준: 2.5억원 (위 예시 1에서 계산)</span>
                    <span className="block">세율 구간: 1억 초과 ~ 5억 이하 → 20% 적용</span>
                    <span className="block">누진공제: 1,000만</span>
                    <span className="block font-semibold">→ 산출세액 = 2.5억 × 20% − 1,000만 = 5,000만 − 1,000만 = 4,000만원</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">예시 2 계산: 과세표준 4.5억원 (10년 합산)</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">과세표준: 4.5억원 (위 예시 3에서 계산)</span>
                    <span className="block">세율 구간: 1억 초과 ~ 5억 이하 → 20% 적용</span>
                    <span className="block">누진공제: 1,000만</span>
                    <span className="block font-semibold">→ 산출세액 = 4.5억 × 20% − 1,000만 = 9,000만 − 1,000만 = 8,000만원</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">예시 3 계산: 과세표준 1억원 (미성년 자녀)</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">증여재산: 1.2억원</span>
                    <span className="block">수증자: 미성년 자녀</span>
                    <span className="block">공제: 미성년 직계비속 2,000만원</span>
                    <span className="block">과세표준 = 1.2억 − 2,000만 = 1억원</span>
                    <span className="block">세율 구간: 1억 이하 → 10% 적용 (누진공제 0)</span>
                    <span className="block font-semibold">→ 산출세액 = 1억 × 10% − 0 = 1,000만원</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">5단계: 신고세액공제 및 최종 납부세액</h2>
                <p data-speakable>
                  산출세액에서 신고세액공제를 적용하면 <strong>최종 납부세액</strong>이 됩니다.
                </p>
                <p>
                  상증세법 §68에 따라 기한 내 자진신고 시 신고세액공제가 적용됩니다. 공제율은 산출세액의 3%입니다. 기한 내 신고란 증여일부터 3개월 이내를 뜻합니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">신고세액공제 계산</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">산출세액: (위 단계에서 계산)</span>
                    <span className="block">신고세액공제율: 3% (기한 내 자진신고 시)</span>
                    <span className="block font-semibold">= 최종 납부세액</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">예시: 산출세액 4,000만원</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">산출세액: 4,000만원</span>
                    <span className="block">신고세액공제: 4,000만 × 3% = 120만원</span>
                    <span className="block font-semibold">→ 최종 납부세액 = 4,000만 − 120만 = 3,880만원</span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 중요:</strong> 신고 기한은 증여일이 속한 달의 말일부터 3개월입니다. 기한 내 신고하지 않으면 신고세액공제를 받을 수 없고, 무신고·납부지연 가산세가 부과될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">증여세 절감 팁 4가지</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 공제 한도 활용:</strong> 배우자 6억, 자녀 5,000만(또는 미성년 2,000만) 공제를 각각 최대한 활용합니다. 배우자가 있으면 배우자 6억 공제가 매우 강력합니다.
                  </li>
                  <li>
                    <strong>2. 10년 분산 전략:</strong> 한 번에 많이 증여하는 것보다 10년에 걸쳐 나누어 증여하면 각각 공제를 받을 수 있습니다. 예: 1년에 자녀에게 5,000만씩 10년 증여 = 공제 5억원 (세금 0원).
                  </li>
                  <li>
                    <strong>3. 관계별 최적화:</strong> 부부가 함께 증여하면 배우자 6억(전담)·자녀에게는 각각의 공제가 적용되므로 훨씬 유리합니다.
                  </li>
                  <li>
                    <strong>4. 기한 내 자진신고:</strong> 신고세액공제 3%를 받기 위해 반드시 기한 내(3개월)에 신고하세요. 늦은 신고는 공제 손실 + 가산세 부과입니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6 border-t border-border-base pt-8">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/gift-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">이 가이드에서 배운 공제와 세율을 직접 적용해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">같은 5단계 세율이지만 공제가 다른 상속세 계산법을 배워보세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-10-year-prior-gift-aggregation"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">10년 사전증여 합산</div>
                    <p className="mt-1 text-sm text-text-secondary">상속 10년 내 증여는 자동 합산됩니다. 증여세와의 관계를 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/child-house-gift-vs-sale-comparison"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀 주택 증여 vs 매매</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀에게 주택을 줄 때 증여세 vs 매매·중도금 전략 비교.</p>
                  </Link>
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금 카테고리</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 취득세, 상속세 등 다른 세금 가이드도 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 대출로 증여세 회피</div>
                    <p className="mt-1 text-sm text-text-secondary">증여세 대신 가족 차용증으로 구조화하는 방법.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 증여세 신고는 세무사·회계사와 상담 후 진행하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었습니다.
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>법적 근거:</strong> 상속세 및 증여세법 §26(세율)·§68(신고세액공제)
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>업데이트:</strong> 2026-06-22 작성. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="증여세 계산법 2026"
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
