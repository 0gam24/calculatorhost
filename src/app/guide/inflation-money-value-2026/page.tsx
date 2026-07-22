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

const URL = 'https://calculatorhost.com/guide/inflation-money-value-2026/';
const DATE_PUBLISHED = '2026-06-16';
const DATE_MODIFIED = '2026-06-16';

export const metadata: Metadata = {
  title: '화폐가치 계산 2026 | 인플레이션 계산 | 10년 전 돈 현재가치 | calculatorhost',
  description:
    '2026년 물가상승률 기준 미래 화폐가치·과거 돈의 현재 가치를 계산합니다. 연 3% 물가 가정 시 10년 후 100만원 현재가치, 복리 계산법, 통계청 CPI 환산, 품목별 물가상승률 차이를 명확히 정리했습니다.',
  keywords: [
    '화폐가치 계산',
    '인플레이션 계산',
    '물가상승률 계산',
    '미래가치 계산',
    '현재가치 계산',
    '10년 전 100만원',
    '물가상승 환산',
    '복리 계산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '화폐가치 인플레이션 계산 2026' }],
    title: '화폐가치 계산 2026',
    description: '물가상승률로 미래·과거 돈의 가치 환산',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '화폐가치 계산 2026',
    description: '10년 후 100만원 현재가치, 물가상승률 환산',
  },
};

const FAQ_ITEMS = [
  {
    question: '화폐가치는 어떻게 계산하나요?',
    answer:
      '화폐가치 계산은 두 가지 방식입니다. 첫째, 물가상승률 가정: 미래가치 = 현재금액 × (1 + 물가상승률)^연수. 예를 들어 연 3% 물가 가정 시 현재 100만원은 10년 후 약 134만원에 해당합니다. 둘째, 실제 CPI(소비자물가지수) 비율 환산: 과거 돈의 현재가치 = 과거금액 × (현재 CPI / 과거 CPI). 통계청 공식 CPI 데이터를 이용합니다.',
  },
  {
    question: '10년 전 100만원은 지금 얼마나 되나요?',
    answer:
      '2016년 대비 2026년 누적 물가상승률은 약 18~20% 수준입니다. 따라서 10년 전 100만원은 현재 약 118~120만원 가치입니다. 정확한 계산은 통계청 소비자물가지수(CPI)를 기간별로 나눠서 역산하는 방식으로, CPI(2026년 6월) / CPI(2016년 6월) × 100만원으로 구합니다.',
  },
  {
    question: '물가상승률 3%는 어떻게 나온 숫자인가요?',
    answer:
      '한국은행이 설정한 물가안정목표가 2% 수준이며, 최근 10년 평균 물가상승률이 1.5~2.5%이므로, 보수적 추정에서는 연 3%를 가정 기준으로 사용합니다. 다만 실제 물가상승률은 품목별·연도별로 크게 달라질 수 있으므로, 본인의 생활비 변화를 반영한 개인 물가상승률을 적용하는 것이 더 정확합니다.',
  },
  {
    question: '복리 계산과 단리 계산의 차이는 뭔가요?',
    answer:
      '단리: 초기 원금에만 이자가 붙습니다. 예: 100만원 × 3% × 10년 = 30만원 이자 (총 130만원). 복리: 매해 이자도 다시 원금이 되어 이자가 붙습니다. 예: 100만원 × (1.03)^10 = 134.39만원. 물가상승률은 복리로 누적되므로, 장기 화폐가치 계산 시 복리 공식을 사용합니다. 기간이 길수록 단리와 복리의 차이가 커집니다.',
  },
  {
    question: '품목별로 물가상승률이 다르다고 하던데?',
    answer:
      '맞습니다. 통계청 소비자물가지수(CPI)는 공식 종합 물가를 나타내지만, 실제로는 식료품·에너지·의류·주택 등 항목별로 상승률이 다릅니다. 예를 들어 에너지는 연 5~10% 상승하기도 하고, 전자제품은 오히려 하락하기도 합니다. 본인의 주요 지출 품목 물가만 고려하면 더 정확한 개인 물가상승률을 계산할 수 있습니다.',
  },
  {
    question: '온라인 화폐가치 계산기는 정확한가요?',
    answer:
      '계산기의 정확성은 입력하는 물가상승률 가정과 기초 데이터에 따라 달라집니다. 일반 물가상승률 3% 가정 계산은 신뢰도가 높지만, 정확한 과거 금액의 현재 가치는 반드시 통계청 CPI 데이터(kosis.kr)로 역산하여 비교 확인해야 합니다. 우리 계산기는 한국은행·통계청 공식 물가상승률 기준으로 제공됩니다.',
  },
];

export default function InflationMoneyValuePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '화폐가치 인플레이션 계산 2026' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: '화폐가치 계산 2026 — 인플레이션 계산법·10년 전 돈의 현재가치',
    description:
      '물가상승률로 미래·과거 화폐가치를 환산하는 방법. 복리 공식, CPI 환산, 품목별 물가상승률 차이를 명확히 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '화폐가치 계산',
      '인플레이션 계산',
      '물가상승률',
      '복리 계산',
      '미래가치',
    ],
  });

  const webPageLd = buildWebPageJsonLd({
    name: '화폐가치 계산 2026 — 인플레이션·물가상승률·미래가치 환산',
    description:
      '복리 공식으로 미래 화폐가치를 계산하고, 통계청 CPI로 과거 돈의 현재 가치를 환산합니다. 물가상승 시뮬레이션·품목별 차이·계산법을 정리했습니다.',
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
                    { name: '화폐가치 인플레이션 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융·투자 · 6분 읽기 · 2026-06-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  화폐가치 계산 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 인플레이션·물가상승률·미래가치 환산</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  화폐가치는 물가상승률에 따라 시간이 지날수록 떨어집니다. 현재 100만원이 10년 후에는 약 134만원의 가치가 필요해질 수 있다는 뜻입니다. 복리 공식으로 미래 화폐가치를 계산하고, 통계청 소비자물가지수(CPI)로 과거 돈의 현재 가치를 환산하는 두 가지 방법을 명확히 정리했습니다. 은퇴 자금 계획, 투자 수익 분석, 실질 구매력 비교가 필요할 때 바로 활용하세요.
                </p>
              </header>

              <AdSlot slot="guide-inflation-money-value-top" format="horizontal" />

              {/* Structured Summary */}
              <div className="space-y-4 rounded-lg border border-border-base bg-bg-card p-4">
                <div>
                  <h3 className="font-bold text-text-primary">정의</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    화폐가치란 일정한 금액(예: 100만원)으로 구매할 수 있는 실제 상품·서비스의 양을 의미합니다. 물가가 올라갈수록 같은 금액의 구매력이 떨어지므로, 시간 경과에 따른 화폐가치 변화를 계산하는 것이 중요합니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">핵심 수치</h3>
                  <table className="w-full text-sm">
                    <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">
                      물가상승률 기준 화폐가치 시뮬레이션 (현재 100만원 기준)
                    </caption>
                    <thead>
                      <tr className="bg-bg-base">
                        <th scope="col" className="py-2 text-left text-text-secondary">기간</th>
                        <th scope="col" className="py-2 text-left text-text-secondary">연 2% 물가</th>
                        <th scope="col" className="py-2 text-left text-text-secondary">연 3% 물가</th>
                        <th scope="col" className="py-2 text-left text-text-secondary">연 4% 물가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border-base">
                        <td className="py-2 font-semibold text-text-primary">5년 후</td>
                        <td className="py-2 text-text-secondary">110.4만원</td>
                        <td className="py-2 text-text-secondary">115.9만원</td>
                        <td className="py-2 text-text-secondary">121.7만원</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 font-semibold text-text-primary">10년 후</td>
                        <td className="py-2 text-text-secondary">121.9만원</td>
                        <td className="py-2 text-text-secondary">134.4만원</td>
                        <td className="py-2 text-text-secondary">148.0만원</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 font-semibold text-text-primary">20년 후</td>
                        <td className="py-2 text-text-secondary">148.6만원</td>
                        <td className="py-2 text-text-secondary">180.6만원</td>
                        <td className="py-2 text-text-secondary">219.1만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">TL;DR</h3>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                    <li>• 미래가치 = 현재금액 × (1 + 물가상승률)^연수</li>
                    <li>• 과거 돈의 현재가치 = 과거금액 × (현재 CPI / 과거 CPI)</li>
                    <li>• 10년간 연 3% 물가 가정 시: 현재 100만원 → 약 134만원 필요</li>
                    <li>• 통계청 소비자물가지수(kosis.kr)로 실제 물가상승률 확인 가능</li>
                  </ul>
                </div>
              </div>

              {/* Section 1: 화폐가치 계산 기본 개념 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  화폐가치는 왜 떨어지나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  물가가 올라가면 같은 금액으로 살 수 있는 물건이 줄어듭니다. 이를 <strong>화폐의 실질 구매력 감소</strong>라고 합니다. 예를 들어 오늘 100만원으로 노트북을 살 수 있다면, 10년 뒤에 같은 노트북이 120만원이 되어 있을 수 있다는 뜻입니다.
                </p>

                <p className="text-text-secondary">
                  이러한 변화는 일반적인 현상이며, 중앙은행(한국은행)도 연 2% 정도의 물가상승을 목표로 설정합니다. 이를 고려하지 않으면 은퇴 자금 계획, 투자 수익 분석, 장기 재정 관리에서 실수할 수 있습니다.
                </p>

                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">복리 공식으로 미래 화폐가치 계산</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                      미래가치 = 현재금액 × (1 + 물가상승률)^연수
                    </code>
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    예: 현재 100만원, 연 3% 물가상승, 10년 후<br />
                    미래가치 = 100 × (1.03)^10 = 100 × 1.3439 = <strong>134.39만원</strong>
                  </p>
                </div>

                <p className="text-text-secondary">
                  즉, 물가상승이 연 3%라면, 10년 뒤에 오늘과 같은 생활 수준을 유지하려면 현재보다 34.4% 더 많은 돈이 필요하다는 의미입니다.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    물가상승률은 <strong>실제 경제 상황에 따라 매년 달라집니다</strong>. 과거 평균값(약 2%)이나 한국은행 목표(2%)를 참고하되, 자신의 주요 지출 품목(주택, 교육, 의료 등)의 실제 상승률과 다를 수 있습니다. 본 계산은 추정치일 뿐, 개인 상황에 맞게 조정이 필요합니다.
                  </p>
                </div>
              </section>

              {/* Section 2: 미래 화폐가치 계산 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  내가 준비한 돈이 10년 후 얼마나 가치가 있을까?
                </h2>
                <p data-speakable className="text-text-secondary">
                  은퇴 자금, 자녀 교육비, 투자 목표액을 정할 때는 <strong>현재 금액이 아닌 미래의 필요 금액</strong>으로 역산해야 합니다. 현재 준비한 금액이 미래에 얼마만큼의 구매력을 유지할지를 계산하는 작업입니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">예시 1: 은퇴 자금 계획</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <strong>현재 기준:</strong> 월 300만원 생활비가 필요하다고 가정.<br />
                      <strong>20년 후(65세) 필요 월급:</strong> 300만 × (1.03)^20 = 300 × 1.806 = <strong>약 541만원</strong><br />
                      즉, 현재 방식으로 월 300만원을 벌 수 있는 자산/연금이 필요하지 않고, 20년 뒤에 월 541만원을 만드는 자산·연금이 필요합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">예시 2: 투자 수익 분석</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <strong>현재 투자액:</strong> 1,000만원<br />
                      <strong>연 5% 수익 목표, 10년 후:</strong> 1,000 × (1.05)^10 = 1,629만원<br />
                      <strong>하지만 물가상승(연 3%)을 고려한 실질 수익:</strong> 1,629 ÷ (1.03)^10 = 1,629 ÷ 1.344 = 약 1,212만원<br />
                      <strong>실질 수익률:</strong> (1,212 - 1,000) / 1,000 = 21.2% (명목 수익 62.9% &gt; 실질 수익 21.2%)
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    이 계산은 <strong>일정한 물가상승률을 가정한 추정치</strong>입니다. 실제로는 경기 순환, 정책 변화, 국제 유가 등에 따라 물가상승률이 크게 달라질 수 있습니다. 따라서 여러 시나리오(낙관·보수·비관)를 동시에 검토하는 것이 안전합니다.
                  </p>
                </div>
              </section>

              {/* Section 3: 과거 돈의 현재가치 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  10년 전 100만원은 지금 얼마나 되나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  과거 받은 임금, 저축액, 투자 수익이 현재 가치로는 얼마인지 확인하려면 <strong>통계청 소비자물가지수(CPI)</strong>를 이용해 역산합니다. 이는 실제 물가상승률을 기반으로 한 정확한 계산 방법입니다.
                </p>

                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">CPI 역산 공식</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                      과거 돈의 현재가치 = 과거금액 × (현재 CPI / 과거 CPI)
                    </code>
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    예: 2016년 6월 100만원이 2026년 6월 기준 현재가치는?<br />
                    (통계청 CPI 2016.06 = 106.2, 2026.06 = 125.8이라 가정)<br />
                    현재가치 = 100 × (125.8 / 106.2) = 100 × 1.1842 = <strong>약 118.4만원</strong>
                  </p>
                </div>

                <p className="text-text-secondary">
                  즉, 10년 전 100만원은 현재 약 118만원의 구매력에 해당한다는 뜻입니다. 이는 실제 물가상승률을 반영하므로, 투자 수익률 비교나 과거 급여 인상률 검증에 자주 사용됩니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h4 className="font-semibold text-text-primary">통계청 CPI 데이터 활용법</h4>
                  <p className="mt-2 text-sm text-text-secondary">
                    <Link
                      href="https://kosis.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 underline"
                    >
                      통계청 KOSIS (kosis.kr)
                    </Link>
                    에서 "소비자물가지수"를 검색하면, 월별 CPI를 조회할 수 있습니다. 특정 월의 CPI를 나누고 곱해서 정확한 기간별 물가상승률을 계산하세요. 경제신문에서 발표하는 "10년 전 물가 대비 현재 물가"도 참고할 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    CPI는 <strong>전국 평균 물가</strong>이므로, 지역·소비 패턴에 따라 개인의 실제 물가상승률과 다를 수 있습니다. 특히 주택, 자동차, 의료비는 평균보다 훨씬 빨리 상승하는 경향이 있으므로, 본인의 지출 구조에 맞는 가중치 조정이 필요합니다.
                  </p>
                </div>
              </section>

              {/* Section 4: 복리 vs 단리 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  물가상승 계산은 왜 복리일까요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  물가상승은 매년 누적되기 때문에 <strong>복리</strong>로 계산합니다. 1년차 물가상승분이 2년차의 기반이 되고, 2년차 상승분이 3년차의 기반이 되는 식입니다.
                </p>

                <table className="w-full border-collapse border border-border-base text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">
                    현재 100만원이 필요한 금액 비교 (연 3% 물가상승)
                  </caption>
                  <thead>
                    <tr className="bg-bg-card">
                      <th scope="col" className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">연도</th>
                      <th scope="col" className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">단리 방식</th>
                      <th scope="col" className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">복리 방식</th>
                      <th scope="col" className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">차이</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">1년</td>
                      <td className="border border-border-base px-3 py-2">103만</td>
                      <td className="border border-border-base px-3 py-2">103만</td>
                      <td className="border border-border-base px-3 py-2">0</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">5년</td>
                      <td className="border border-border-base px-3 py-2">115만</td>
                      <td className="border border-border-base px-3 py-2">115.9만</td>
                      <td className="border border-border-base px-3 py-2">0.9만</td>
                    </tr>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">10년</td>
                      <td className="border border-border-base px-3 py-2">130만</td>
                      <td className="border border-border-base px-3 py-2">134.4만</td>
                      <td className="border border-border-base px-3 py-2">4.4만</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">20년</td>
                      <td className="border border-border-base px-3 py-2">160만</td>
                      <td className="border border-border-base px-3 py-2">180.6만</td>
                      <td className="border border-border-base px-3 py-2">20.6만</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary">
                  5년 정도는 차이가 작지만, 20년 이상 장기 계획에서는 복리로 계산한 값이 훨씬 커집니다. 은퇴 자금 계획이나 장기 수익 분석 시 단리로 계산하면 필요 자금을 과소 추정하게 되어 위험합니다.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    금융 상품 이자 계산에서도 복리 개념이 중요합니다. 저축·적금·예금 등에서 받는 이자도 복리로 계산되므로, 장기 투자에서는 단리 금리보다 실제 복리 수익이 훨씬 더 크다는 점을 항상 기억하세요.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-inflation-money-value-mid" format="rectangle" />

              {/* Section 5: 품목별 물가상승률 차이 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  모든 물가가 똑같이 올라가나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  아닙니다. 통계청 소비자물가지수(CPI)는 평균값일 뿐, <strong>실제로는 품목별로 상승률이 크게 다릅니다</strong>. 자신의 주요 지출 항목이 어느 카테고리인지에 따라 실제 체감 물가상승률이 달라집니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h4 className="font-semibold text-text-primary">최근 10년(2016~2026) 품목별 물가상승률 추정</h4>
                  <p className="mt-3 text-sm text-text-secondary">
                    <strong>높은 상승 (~4~8%):</strong> 에너지(휘발유, 전기), 의료비, 교육비, 주택(전월세)<br />
                    <strong>중간 상승 (~2~3%):</strong> 식료품, 의류, 교통비<br />
                    <strong>낮은 상승 or 하락:</strong> 전자제품, 통신료(규제), 일부 기술 서비스<br />
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    ※ 정확한 수치는 통계청 KOSIS 세부 품목 CPI 조회로 확인하세요.
                  </p>
                </div>

                <p className="text-text-secondary">
                  예를 들어, 주택비 지출이 많은 가구는 전국 평균(약 2%)보다 훨씬 높은 3~4% 물가상승을 체감합니다. 반대로 전자제품을 자주 구매하는 가구는 평균보다 낮을 수 있습니다.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    본인의 정확한 물가상승률을 계산하려면, 지난 1~2년간의 주요 지출(주택, 자녀 교육, 의료 등)을 묶음으로 관리하고, 그 범주의 CPI 추이를 추적하는 것이 이상적입니다. 전국 평균 CPI와 개인 상황을 동시에 고려해야 더 정확한 장기 재정 계획이 가능합니다.
                  </p>
                </div>
              </section>

              {/* FAQ Section (중간 배치) */}
              <FaqSection items={FAQ_ITEMS} />

              {/* Related Guides */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">관련 가이드 & 계산기</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/calculator/inflation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">화폐가치 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      미래·과거 돈의 가치를 바로 계산해보세요
                    </p>
                  </Link>

                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">은퇴자금 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      물가상승을 반영한 은퇴 필요 자금 추정
                    </p>
                  </Link>

                  <Link
                    href="/calculator/savings/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">적금 이자 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      물가상승을 고려한 실질 수익 확인
                    </p>
                  </Link>

                  <Link
                    href="/calculator/deposit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">정기예금 이자 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      세후 이자와 실질 수익률
                    </p>
                  </Link>

                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">대출이자 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      원리금균등 상환액 계산
                    </p>
                  </Link>

                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">금융 카테고리</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      대출·예금·적금·환율 전체 가이드
                    </p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 & AI 표기 */}
              <footer className="border-t border-border-base pt-8 text-xs text-text-tertiary">
                <p className="mb-3">
                  이 가이드는 <strong>2026년 6월 16일</strong> 기준으로 작성되었습니다. 통계청 소비자물가지수(CPI) 및 한국은행 물가안정목표를 참고하여 정확성을 기했으나, 실제 물가상승률은 매년 달라질 수 있습니다.
                </p>
                <p className="mb-3">
                  본 가이드의 계산은 <strong>일정한 물가상승률을 가정한 추정값</strong>입니다. 정확한 개인 물가상승률은 <Link href="https://kosis.kr" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">
                    통계청 KOSIS
                  </Link>
                  에서 직접 CPI 데이터를 조회하여 계산하시기 바랍니다.
                </p>
                <p className="mb-3">
                  본 가이드는 <strong>Claude(Anthropic)의 지원을 받아 작성된 후 운영자가 통계청 CPI, 한국은행 물가안정목표, 금융 문헌으로 검수</strong>했습니다.
                </p>
                <p>
                  © 2026 <Link href="/" className="text-primary-500 underline">
                    calculatorhost.com
                  </Link>
                  . 모든 권리 보유.
                </p>
              </footer>

              <ShareButtons
                title="화폐가치 계산 2026"
                url={URL}
                description="10년 후 100만원 필요액, 물가상승률 계산법"
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
