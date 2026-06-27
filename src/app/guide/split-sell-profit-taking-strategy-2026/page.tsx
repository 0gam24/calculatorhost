import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/split-sell-profit-taking-strategy-2026/';
const DATE_PUBLISHED = '2026-06-28';
const DATE_MODIFIED = '2026-06-28';

export const metadata: Metadata = {
  title: '분할매도 익절 전략 2026 | 평균 매도단가로 수익 지키기',
  description:
    '목표가 달성 후 보유분을 나눠 익절하는 분할매도 전략. 일괄매도 대비 고점 선택 리스크 분산, 추세 지속 시 추가 수익. 계산 공식·실전 사례·FAQ·관련 계산기 링크. 2026 업데이트.',
  keywords: ['분할매도', '익절', '평균 매도단가', '수익실현', '투자 전략', '주식 익절', '수익 취하기'],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '분할매도 익절 전략 2026 | calculatorhost' }],
    title: '분할매도 익절 전략 — 평균 매도단가로 수익을 지키는 방법',
    description: '목표가 도달 후 단계적으로 익절하는 분할매도 전략의 의사결정 기준과 시뮬레이션.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '분할매도 익절 전략',
    description: '목표가 도달 후 단계적 익절의 의사결정 기준과 시뮬.',
  },
};

const FAQ_ITEMS = [
  {
    question: '분할매도와 일괄매도 중 어느 것이 더 나은가요?',
    answer:
      '정답은 상황에 따라 다릅니다. 분할매도는 고점 예측 불가 시 리스크를 분산해 심리적 안정을 주지만, 급등장에서는 초기 대량 매도로 수익 기회를 잃을 수 있습니다. 일괄매도는 타이밍에 따라 수익이 크게 달라지지만 의사결정이 간단합니다. 둘 다 "정할 때의 원칙을 지키느냐"가 더 중요합니다.',
  },
  {
    question: '평균 매도단가는 어떻게 계산하나요?',
    answer:
      '평균 매도단가 = Σ(매도수량 × 매도가) ÷ 총매도수량 입니다. 예: 1차 1.1만원에 30주, 2차 1.2만원에 30주, 3차 1.3만원에 40주 매도하면 평균 = (30×1.1만+30×1.2만+40×1.3만) ÷ 100 = 12,100원이 됩니다.',
  },
  {
    question: '분할매도를 할 때 몇 차수까지 나누는 게 좋을까요?',
    answer:
      '일반적으로 2~4차 정도를 권장합니다. 너무 많은 차수(5차+)는 거래비용(수수료·세금)이 누적되고 관리 부담이 커집니다. 종목 특성과 심리 상태에 따라 결정하되, 미리 정하고 감정적으로 조정하지 않는 것이 핵심입니다.',
  },
  {
    question: '매도 후 주가가 계속 올라가면 후회하지 않을까요?',
    answer:
      '후회는 필연입니다. 다만 "기대수익률을 달성했는가"가 기준이어야 합니다. 목표가 1.2만원이었는데 1차에서 달성했다면, 그 이후 상승은 "계획 외 추가 수익"으로 보세요. "모든 수익을 취하지 않은 후회"보다 "정한 원칙을 지킨 만족감"이 장기 투자 성공의 핵심입니다.',
  },
  {
    question: '분할매도에서 수수료·세금을 고려해야 하나요?',
    answer:
      '반드시 고려해야 합니다. 거래당 수수료(증권사별 0.015~0.03%)와 양도소득세(보유 기간·개인 여부에 따라 다름 — 구체 세율은 국세청 또는 증권사 확인 필수)가 누적되므로, 계산기에서 수수료율을 입력해 실제 실현손익을 확인하세요.',
  },
  {
    question: '손절과 익절을 함께 전략으로 세울 수 있나요?',
    answer:
      '가능합니다. 예: "목표가 +30%일 때 50% 익절, 손실률 -10%에 전량 손절"처럼 매수 시점에 미리 정해두는 것을 추천합니다. 이렇게 하면 감정에 흔들리지 않고 일관된 의사결정이 가능해집니다.',
  },
  {
    question: '분할매도 계산기를 활용할 때 팁이 있나요?',
    answer:
      'calculatorhost 분할매도 계산기에 평단·보유 수량을 입력하고, "차수별 목표 수익률" 빠른 설정(+10%, +20%, +30% 등)을 이용하면 각 차수 매도가가 자동으로 환산됩니다. 또한 수수료율·세율을 입력하면 순수익이 실시간 계산되므로 여러 시나리오를 빠르게 비교할 수 있습니다.',
  },
];

export default function SplitSellProfitTakingPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '분할매도 익절 전략 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '분할매도 익절 전략 — 평균 매도단가로 수익을 지키는 방법 (2026)',
    description: '목표가 도달 후 단계적으로 익절하는 분할매도 전략의 의사결정 기준, 계산 공식, 실전 사례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['분할매도', '익절', '평균 매도단가', '수익실현', '투자 전략', '주식'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '분할매도 익절 전략 — 평균 매도단가로 수익을 지키는 방법 (2026)',
    description: '목표가 도달 후 보유분을 나눠 익절하는 분할매도 전략. 고점 선택 리스크 분산, 추세 지속 시 추가 수익. 계산 공식, 실전 사례, 의사결정 플로우.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const definedTermsLd = buildDefinedTermSetJsonLd({
    name: '분할매도·익절 투자 용어집',
    description: '분할매도, 익절, 평균 매도단가, 수익실현 등 단계적 익절 전략의 핵심 용어 정의.',
    url: URL,
    terms: [
      {
        name: '분할매도 (Split Sell)',
        description: '보유한 주식을 한 번에 다 파는 것이 아니라 여러 차수에 나누어 매도하는 전략. 각 차수별 매도가의 가중평균을 평균 매도단가라고 부르며, 실현손익 계산의 기초가 됨.',
        alternateName: 'Split Sell, 단계적 익절',
      },
      {
        name: '익절 (Profit Taking)',
        description: '매수가보다 높은 가격에서 주식을 팔아 수익을 실현하는 행동. "차익실현"이라고도 부르며, 수익을 확정하는 의사결정의 핵심.',
        alternateName: 'Profit Taking, 차익실현',
      },
      {
        name: '평균 매도단가 (Average Selling Price)',
        description: '분할매도 시 전체 매도 차수의 가중평균 가격. 계산식: Σ(매도수량 × 매도가) ÷ 총매도수량. 실제 수익률을 판단하는 핵심 지표.',
        alternateName: 'Average Selling Price, 평단',
      },
      {
        name: '실현손익 (Realized Profit & Loss)',
        description: '주식을 매도해서 실제로 벌거나 잃은 금액. 평균 매도단가에서 평균 매수단가를 뺀 차이에 매도 수량을 곱하고 거래비용을 차감.',
        alternateName: 'Realized P&L',
      },
      {
        name: '고점 (Peak/Resistance Level)',
        description: '일정 기간 동안 주가가 도달한 가장 높은 수준. 분할매도 전략에서는 고점을 정확히 예측할 수 없으므로, 목표가에 도달했을 때 단계적으로 익절하는 방식을 채택.',
        alternateName: 'Peak, 저항선',
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermsLd) }}
      />

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
                    { name: '분할매도 익절 전략' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  투자 · 8분 읽기 · 2026-06-28
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  분할매도 익절 전략 — 평균 매도단가로 수익을 지키는 방법
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주식·코인 투자에서 가장 어려운 순간은 "언제 팔 것인가"입니다.
                  목표가 도달 후 "더 오를 수도"라는 욕심에 계속 보유하다 급락하는 경험을 누구나 합니다.
                  분할매도는 이 답답함을 풀어주는 전략입니다. 나눠 파는 만큼 고점 예측 실수를 보호받고,
                  추세가 계속 이어져도 추가 수익을 챙길 수 있습니다. 실전 계산과 의사결정 기준을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-split-sell-profit-taking-strategy-2026-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  분할매도 한눈에 보기
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="sr-only">분할매도 전략 개요</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th scope="col" className="py-2 pr-4 font-semibold">특징</th>
                        <th scope="col" className="py-2 font-semibold">설명</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-medium text-text-primary">목적</td>
                        <td className="py-2">고점 예측 불가 리스크를 분산, 심리적 안정 확보</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-medium text-text-primary">방식</td>
                        <td className="py-2">목표가 도달 후 보유분을 2~4차로 나누어 단계적 매도</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-medium text-text-primary">장점</td>
                        <td className="py-2">리스크 분산, 일괄 매도 대비 심리적 부담 감소, 추세 지속 시 추가 수익</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium text-text-primary">단점</td>
                        <td className="py-2">급등 시 초기 익절로 전체 수익 감소, 거래비용·세금 누적</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">분할매도의 핵심: 평균 매도단가 계산</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  분할매도에서 수익을 계산하는 기초는 <strong>평균 매도단가</strong>입니다.
                  여러 차수에 나눠 판 가격들의 가중평균을 구하는 것이지요.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">계산 공식</strong>
                  <p className="mt-2 font-mono text-text-secondary">
                    평균 매도단가 = Σ(매도수량 × 매도가) ÷ 총매도수량
                  </p>
                  <p className="mt-3 text-text-secondary">
                    <strong>예시:</strong> 1만원에 100주 매수 후,
                    <br />
                    • 1차: 1.1만원에 30주 매도 → 33만원
                    <br />
                    • 2차: 1.2만원에 30주 매도 → 36만원
                    <br />
                    • 3차: 1.3만원에 40주 매도 → 52만원
                    <br />
                    <br />
                    평균 매도단가 = (33만 + 36만 + 52만) ÷ 100주 = <strong>12,100원</strong>
                    <br />
                    실현수익 = (12,100 − 10,000) × 100 = <strong>21만원</strong>
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  평균 매도단가가 높을수록 실현수익이 큽니다. 분할매도를 할 때는 각 차수의 매도가와 수량을 신중히 정해서
                  평균을 최대한 높이되, 감정적으로 조정하지 않는 것이 핵심입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">분할매도 vs 일괄매도: 언제 어느 것을 선택할까</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  분할매도와 일괄매도는 각각 장단점이 있습니다. 상황에 맞춰 선택하세요.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">분할매도를 선택하는 경우</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-text-secondary">
                      <li>고점을 정확히 예측하기 어렵다고 느낄 때</li>
                      <li>주가가 계속 상승할 가능성이 있다고 판단할 때</li>
                      <li>추가 자금으로 분할 매도 차수를 소화할 여유가 충분할 때</li>
                      <li>심리적으로 "모두 팔고 후회하는 경험"을 피하고 싶을 때</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">일괄매도를 선택하는 경우</h3>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-text-secondary">
                      <li>기업 실적 악화 신호가 명확할 때</li>
                      <li>목표 수익률을 충분히 달성했을 때</li>
                      <li>다른 기회 종목을 신속히 포착했을 때</li>
                      <li>거래비용(수수료·세금)이 많은 비중을 차지할 때</li>
                    </ul>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 선택한 방식의 원칙을 지키는 것이 더욱 중요합니다.
                  "이번만 예외로" 하면서 감정적 판단으로 바꾸면, 어느 방식이든 손실로 이어집니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">실전 사례로 보는 분할매도</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">케이스 A: 성공한 분할매도</h3>
                    <p className="text-sm text-text-secondary">
                      반도체 관련주를 5만원에 200주 매수. 반년 후 6.5만원까지 상승.
                      목표 수익률은 20%(목표가 6만원)로 설정.
                      <br />
                      <strong>전략:</strong> 6만원 도달 후 분할매도 실시.
                      <br />
                      • 1차 6만원에 50주 매도 → 실현손익 50만원 (+20%)
                      <br />
                      • 2차 6.3만원에 50주 매도 → 실현손익 65만원 (+26%)
                      <br />
                      • 3차 6.5만원에 100주 매도 → 실현손익 150만원 (+30%)
                      <br />
                      <strong>평균 매도단가:</strong> (50×6 + 50×6.3 + 100×6.5) ÷ 200 = 6.325만원
                      <br />
                      <strong>실현손익(수수료·세금 차감 전):</strong> (6.325 − 5) × 200 = 265만원
                    </p>
                  </div>
                  <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">케이스 B: 분할매도 vs 일괄 — 상황별 비교</h3>
                    <p className="text-sm text-text-secondary">
                      신약 기업을 3만원에 100주 매수. 임상 결과 발표 후 4만원까지 상승.
                      <br />
                      <strong>상황 1 (분할매도):</strong> 4만원에서 1차 50주 익절, 3.8만원에서 2차 50주 익절
                      <br />
                      • 평균 매도단가 3.9만원 → 실현손익 (3.9−3) × 100 = 90만원
                      <br />
                      <br />
                      <strong>상황 2 (일괄매도):</strong> 4만원에서 전량 100주 매도
                      <br />
                      • 실현손익 (4−3) × 100 = 100만원 (분할보다 10만원 많음)
                      <br />
                      <br />
                      <strong>상황 3 (분할매도 후 추세 지속):</strong> 4만원에서 1차 50주만 익절, 나머지 50주는 보유 → 5만원까지 상승 후 2차 매도
                      <br />
                      • 1차 (4−3)×50 = 50만원, 2차 (5−3)×50 = 100만원 → 총 실현손익 150만원
                      <br />
                      <br />
                      <strong>결론:</strong> 고점을 모를 때 분할매도는 하락 리스크를 줄이고, 추세가 이어지면 추가 수익(상황 3)을 챙길 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">분할매도 계획 세우기: 의사결정 플로우</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm text-text-secondary leading-loose">
                  <p>
                    <strong className="text-text-primary">Step 1. 목표 수익률 정하기</strong>
                    <br />
                    → "이 종목에서 몇 % 수익을 목표로 할 것인가?" (예: 15%, 20%, 30%)
                  </p>
                  <p className="mt-3">
                    <strong className="text-text-primary">Step 2. 목표가 계산하기</strong>
                    <br />
                    → 매수가 × (1 + 목표 수익률) = 목표가
                    <br />
                    → 예: 5만원 × 1.2 = 6만원
                  </p>
                  <p className="mt-3">
                    <strong className="text-text-primary">Step 3. 분할 차수 결정하기</strong>
                    <br />
                    → 보통 2~4차. 너무 많으면 거래비용 증가 (5차 이상 권하지 않음)
                  </p>
                  <p className="mt-3">
                    <strong className="text-text-primary">Step 4. 차수별 매도가·수량 미리 정하기</strong>
                    <br />
                    → 감정 개입 금지. 목표가 도달 후 "혹시 더 오를까봐" 하면서 변경 금지
                  </p>
                  <p className="mt-3">
                    <strong className="text-text-primary">Step 5. 매도 실행 및 기록</strong>
                    <br />
                    → calculatorhost 분할매도 계산기로 평균 매도단가·실현손익 확인
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">분할매도 시 고려할 비용</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  분할매도를 할 때는 거래비용이 누적됨을 명심하세요.
                  차수가 많을수록 수수료와 세금이 늘어나 실제 수익이 감소합니다.
                </p>
                <ul className="ml-5 list-disc space-y-2 text-text-secondary">
                  <li>
                    <strong>거래 수수료:</strong> 증권사마다 다르지만 보통 0.015~0.03% 선
                    (분할매도는 차수별로 수수료 발생)
                  </li>
                  <li>
                    <strong>양도소득세:</strong> 국내 상장주식은 보유 기간·개별 상황에 따라 달라지므로
                    증권사 또는 국세청에 사전 확인 권장 (여기서는 구체 세율을 명시하지 않음)
                  </li>
                  <li>
                    <strong>실제 수익 계산:</strong> calculatorhost의 분할매도 계산기에 수수료율을 입력하면
                    순수익(세전)이 자동 계산됩니다.
                  </li>
                </ul>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 수수료는 낮으므로 세금이 더 중요합니다.
                  수익이 크면 양도소득세 신고 대상이 될 수 있으니 국세청 기준을 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">분할매도 계산기 활용하기</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  수동 계산은 오류가 많으므로, calculatorhost의 분할매도 계산기를 추천합니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">계산기 활용 팁</strong>
                  <ul className="mt-3 ml-5 list-disc space-y-2 text-text-secondary">
                    <li><strong>1단계:</strong> 평균 매수단가 + 보유 수량 입력</li>
                    <li><strong>2단계:</strong> 각 차수별 목표 수익률(+10%, +20%, +30% 등) 빠른 설정 사용</li>
                    <li><strong>3단계:</strong> 매도가가 자동 환산됨 → 각 차수 수량 조정</li>
                    <li><strong>4단계:</strong> 수수료율(증권사별) 입력 → 실현손익(수수료 차감) 확인</li>
                    <li><strong>5단계:</strong> 여러 시나리오 비교 (예: 3차 vs 4차, +20% vs +30% 목표)</li>
                  </ul>
                  <p className="mt-3 text-text-secondary">
                    📊{' '}
                    <Link
                      href="/calculator/split-sell/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      분할매도 계산기 열기
                    </Link>
                  </p>
                </div>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항 및 면책
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 투자 권유가 아니며, 모든 투자 판단과 책임은 본인에게 있습니다.
                  </li>
                  <li>
                    • 분할매도를 실행할 때 수익을 보장하지 않으며, 판단 실수나 시장 변동에 따라 손실이 발생할 수 있습니다.
                  </li>
                  <li>
                    • 양도소득세 등 세금 관련 구체 금액은 국세청 또는 증권사에 사전 확인하시기 바랍니다.
                  </li>
                  <li>
                    • 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/split-sell/" className="text-primary-600 underline dark:text-primary-500">
                      분할매도 계산기
                    </Link>{' '}
                    — 평균 매도단가, 차수별 실현손익(수수료 차감)
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/split-buy/" className="text-primary-600 underline dark:text-primary-500">
                      분할매수 계산기
                    </Link>{' '}
                    — 평균 매수단가, 회복 필요 상승률
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/averaging-down/" className="text-primary-600 underline dark:text-primary-500">
                      물타기 계산기
                    </Link>{' '}
                    — 추가 매수 후 평단 변화
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/averaging-down-vs-loss-cut/" className="text-primary-600 underline dark:text-primary-500">
                      물타기 vs 손절 vs 비중조절 가이드
                    </Link>{' '}
                    — 하락 상황의 세 가지 대응 전략
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/finance/" className="text-primary-600 underline dark:text-primary-500">
                      금융 카테고리
                    </Link>{' '}
                    — 다른 투자 계산기 및 가이드
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 자료</strong>:{' '}
                  <a
                    href="https://www.fss.or.kr/fss/ko/edu/pds/educationMaterialList.do"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원 투자자 교육
                  </a>
                  ,{' '}
                  <a
                    href="https://www.krx.co.kr/investor/investguide/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국거래소 투자정보
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
