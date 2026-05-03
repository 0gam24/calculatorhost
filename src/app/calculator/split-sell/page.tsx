import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildHowToJsonLd,
  buildWebPageJsonLd,
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';
import { SplitSellCalculator } from './SplitSellCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/split-sell/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '분할매도 계산기 2026 (주식·코인) | 실현손익·세후·BEP | calculatorhost',
  description:
    '주식·코인 분할매도 계산기 2026. 평단·보유 수량과 차수별 매도가·수량으로 차수별 실현손익(수수료·거래세 차감)과 누적 손익을 즉시 계산. 평단 대비 +5/10/20% 빠른 설정. 회원가입 불필요, 무료.',
  keywords: [
    '분할매도 계산기',
    '분할매도',
    '분할매도 손익',
    '코인 분할매도',
    '주식 분할매도',
    '익절 계산기',
    '실현손익 계산기',
    '증권거래세 계산기',
    '수익률 계산기',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '분할매도 계산기 2026 — 주식·코인 실현손익',
    description:
      '평단·보유 + 차수별 매도가/수량으로 차수별 실현손익(세후)과 누적 손익까지 즉시 계산.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '분할매도 계산기 2026 (주식·코인)',
    description: '차수별 실현손익·세후 수령액·누적 수익률을 즉시 계산.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '분할매도란 무엇인가요?',
    answer:
      '분할매도는 보유 종목을 한 번에 전량 매도하지 않고 여러 차례에 나눠 매도하는 방식입니다. 가격대별로 비중을 분산해 일부는 익절, 일부는 더 보유하는 식의 위험·심리 관리에 효과적입니다. 영문으로는 Profit Taking 또는 Tranche Selling이라고도 합니다.',
  },
  {
    question: '실현손익은 어떻게 계산되나요?',
    answer:
      '차수별 실현손익 = (매도단가 − 평균 매입단가) × 매도 수량 − 매도 수수료 − 거래세. 누적 실현손익은 모든 차수의 합입니다. 본 계산기는 자산 유형(주식/코인)에 따라 수수료·거래세 프리셋을 자동 적용해 세후 기준으로 계산합니다.',
  },
  {
    question: '분할매도 후에도 평단은 변하지 않나요?',
    answer:
      '네, 변하지 않습니다. 평균 매입단가는 매수 이력으로만 결정되며, 매도(분할매도 포함)는 평단에 영향을 주지 않습니다. 일부 사용자가 "분할매도 후 잔여분 평단이 올라간다"고 오해하는데, 이는 사실과 다릅니다. 단, 일부 증권사 앱은 화면상 표기를 다르게 보여줄 수 있으므로 주의하세요.',
  },
  {
    question: '주식 매도 시 증권거래세는 얼마인가요?',
    answer:
      '한국 주식은 매도 시 증권거래세가 부과됩니다. 2026년 기준 코스피·코스닥 모두 0.18%(농어촌특별세 0.15% + 거래세 0.03%, 코스닥은 별도)입니다. 정확한 세율은 매년 시행령 변경에 따라 달라질 수 있으므로 최신 한국거래소 공지를 확인하세요. 코인은 거래세가 없습니다.',
  },
  {
    question: '평단 대비 +10%·+20% 같은 목표 수익률은 어떻게 입력하나요?',
    answer:
      '본 계산기의 차수별 매도가 옆 "+5%·+10%·+20%·+30%·+50%" 버튼을 누르면 평균 매입단가에 해당 수익률을 적용한 매도가가 자동 입력됩니다. 예: 평단 10,000원 + 20% → 12,000원. 단, 이 환산은 수수료·거래세를 반영하지 않은 단순 환산이므로, 실제 세후 수익률은 결과 카드에서 확인하세요.',
  },
  {
    question: '분할매도 비중은 어떻게 정해야 하나요?',
    answer:
      '대표적인 방식은 (1) 균등 비중(예: 1/3씩 매도), (2) 피라미드형(가격이 오를수록 매도 비중 축소 — 추세 추종), (3) 역피라미드형(가격이 오를수록 비중 확대 — 익절 강화)입니다. 본 계산기는 차수별 매도 수량을 자유롭게 입력할 수 있으므로 모든 전략을 시뮬레이션할 수 있습니다. 보유 수량을 초과하는 매도는 자동으로 잔여만큼 조정됩니다.',
  },
  {
    question: '코인 분할매도는 주식과 무엇이 다른가요?',
    answer:
      '계산 공식은 동일하지만 비용 구조가 다릅니다. 코인은 거래세가 없는 대신 거래소별 매도 수수료가 0.04~0.25%로 주식보다 큽니다(자산 유형 "코인" 선택 시 평균 0.05% 프리셋 적용). 또한 24시간 거래·변동성이 크기 때문에 차수 간격을 더 짧게 잡는 경우가 많습니다.',
  },
] as const;

const RELATED = [
  {
    href: '/calculator/split-buy',
    title: '분할매수 계산기',
    description: '차수별 평단·실효평단·BEP',
  },
  {
    href: '/calculator/averaging-down',
    title: '물타기 계산기',
    description: '평단 하향·목표단가 역산',
  },
  {
    href: '/calculator/capital-gains-tax',
    title: '양도소득세',
    description: '주식·부동산 양도세 (대상 종목)',
  },
];

export default function SplitSellPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '분할매도 계산기 (주식·코인)',
    description:
      '평균 매입단가·보유 수량과 차수별 매도가·수량으로 차수별 실현손익(수수료·거래세 차감)과 누적 손익을 즉시 산출하는 분할매도 계산기.',
    url: URL,
  });
  const webpageLd = buildWebPageJsonLd({
    name: '분할매도 계산기 2026 (주식·코인)',
    description:
      '주식·코인 분할매도 차수별 실현손익·세후 수령액·누적 수익률 계산. 평단 대비 목표 수익률 빠른 설정.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance/' },
    { name: '분할매도 계산기' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '분할매도 실현손익 계산하기',
    description:
      '평단·보유 수량과 차수별 매도가·수량을 입력해 차수별 실현손익과 누적 손익을 산출하는 방법',
    steps: [
      {
        name: '자산 유형 선택',
        text: '주식 또는 코인을 선택합니다. 매도 수수료와 거래세 프리셋이 자동 적용됩니다.',
      },
      {
        name: '보유 포지션 입력',
        text: '평균 매입단가와 현재 보유 수량을 입력합니다.',
      },
      {
        name: '차수별 매도 입력',
        text: '1차, 2차, 3차…처럼 매도 차수마다 매도 단가와 수량을 입력합니다. "+5%·+10%·+20%" 버튼으로 평단 대비 목표 수익률에서 매도가를 자동 환산할 수 있습니다.',
      },
      {
        name: '결과 확인',
        text: '차수별 실현손익(수수료·거래세 차감), 세후 수령액, 누적 실현손익과 잔여 보유 수량이 즉시 계산됩니다.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }}
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildDefinedTermSetJsonLd({
              name: '분할매도·실현손익 핵심 용어',
              description: '주식·코인 분할매도와 실현손익·세후 수령액 용어집',
              url: `${URL}#glossary`,
              terms: [
                {
                  name: '분할매도 (Profit Taking)',
                  description: '보유 종목을 한 번에 전량 매도하지 않고 여러 차수로 나눠 매도하는 전략. 일부 익절·일부 보유로 위험·심리 분산.',
                },
                {
                  name: '실현손익',
                  description: '매도 체결로 확정된 손익. 산식: (매도가 − 평단) × 수량 − 매도수수료 − 거래세. 평가손익(미실현)과 구분.',
                },
                {
                  name: '증권거래세',
                  description: '한국 주식 매도 시 부과되는 세금. 2026년 코스피·코스닥 모두 0.18% (농어촌특별세 0.15% + 거래세 0.03%). 코인은 거래세 없음.',
                  url: 'https://www.nts.go.kr',
                },
                {
                  name: '잔여 평단 불변 원칙',
                  description: '분할매도 후 잔여 보유 수량의 평균단가는 변하지 않음. 평단은 매수 이력으로만 결정되며 매도는 영향 X. 일부 증권사 화면 표기는 다를 수 있음.',
                },
              ],
            })
          ),
        }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '금융', href: '/category/finance/' },
                    { name: '분할매도 계산기' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  분할매도 계산기 2026 <span className="text-text-tertiary text-2xl font-semibold">(주식·코인)</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주식·코인을 여러 차례 나눠 매도했을 때의 차수별 실현손익(수수료·거래세
                  차감)과 누적 손익, 세후 수령액을 즉시 계산합니다. 평단 대비 +5%·+10%·+20%
                  버튼으로 목표 수익률에서 매도가를 자동 환산할 수 있습니다.
                </p>
                <AuthorByline datePublished={DATE_PUBLISHED} dateModified={DATE_MODIFIED} />
              </header>

              <StructuredSummary
                definition="분할매도(Profit Taking)는 보유 종목을 한 번에 전량 매도하지 않고 여러 차례에 나눠 매도하는 방식입니다. 가격대별로 비중을 분산해 일부 익절·일부 보유로 위험·심리를 관리합니다."
                table={{
                  caption: '분할매도 계산 핵심 공식',
                  headers: ['항목', '공식/설명'],
                  rows: [
                    ['차수별 매도금액(세전)', '매도가 × 매도수량'],
                    ['차수별 수수료', '매도금액 × 매도수수료율'],
                    ['차수별 거래세', '매도금액 × 거래세율 (코인 X)'],
                    ['차수별 실현손익', '(매도가 − 평단) × 수량 − 수수료 − 거래세'],
                    ['누적 실현손익', 'Σ 차수별 실현손익'],
                  ],
                }}
                tldr={[
                  '분할매도는 평단에 영향을 주지 않음. 잔여분 평단도 동일',
                  '주식: 매도 수수료 + 증권거래세 0.18% / 코인: 수수료만, 거래세 없음',
                  '평단 대비 목표 수익률에서 매도가를 빠르게 환산 가능',
                  '보유 수량 초과 매도는 자동으로 잔여만큼만 처리',
                ]}
              />

              <AdSlot slot="split-sell-top" format="horizontal" />

              <SplitSellCalculator />

              <FaqSection items={[...FAQ_ITEMS]} />

              <section aria-label="분할매도란" className="card">
                <h2 className="mb-4 text-2xl font-semibold">분할매도란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  분할매도는 보유 종목을 한 번에 전량 매도하지 않고 여러 차례 나눠 매도하는
                  방식입니다. 한 시점에 모든 수량을 매도하는 일시 매도와 달리, 가격대별로
                  비중을 분산해 일부는 익절하고 일부는 더 보유하는 식의 전략적 의사결정이
                  가능합니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  분할매도의 핵심 가치는 <strong>심리적 부담의 분산</strong>과
                  <strong> 추가 상승 여지의 확보</strong>입니다. 한 번에 다 팔면 이후
                  추가 상승 시 후회가 크지만, 분할매도는 일부 익절로 수익을 확정하면서도
                  잔여분으로 추가 상승의 가능성을 남겨둡니다. 반대로 가격이 다시 떨어지면
                  먼저 매도한 차수의 수익은 이미 확보되어 있다는 안도감이 있습니다.
                </p>
                <p className="text-text-secondary">
                  중요한 점은 <strong>분할매도가 평단을 변경하지 않는다</strong>는 것입니다.
                  평균 매입단가는 매수 이력에 의해서만 결정되며, 매도(분할매도 포함)는
                  평단에 영향을 주지 않습니다. 분할매도 후 잔여분의 평단도 그대로입니다.
                </p>
              </section>

              <section aria-label="분할매도 전략" className="card">
                <h2 className="mb-4 text-2xl font-semibold">분할매도 전략 3가지</h2>
                <div className="space-y-4 text-sm">
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-2 font-semibold text-text-primary">① 균등 분할매도</h3>
                    <p className="text-text-secondary">
                      매 차수 같은 수량(또는 같은 비중)을 매도. 예: 보유 300주를
                      100주씩 3회 매도. 가장 단순하고 규율 있는 방식.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-2 font-semibold text-text-primary">② 피라미드형 분할매도</h3>
                    <p className="text-text-secondary">
                      가격이 오를수록 차수별 매도 비중을 줄임. 예: 1차 50%, 2차 30%,
                      3차 20%. 추세 추종 — 강한 상승 신호 시 잔여분으로 더 큰 수익을
                      노릴 수 있음.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-2 font-semibold text-text-primary">③ 역피라미드형 분할매도</h3>
                    <p className="text-text-secondary">
                      가격이 오를수록 차수별 매도 비중을 늘림. 예: 1차 20%, 2차 30%,
                      3차 50%. 익절 강화 — 고점에서 더 많이 팔아 평균 매도가를 높임.
                    </p>
                  </div>
                </div>
              </section>

              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>차수별 매도금액 (세전)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      매도금액 = 매도단가 × 매도수량
                    </p>
                  </li>
                  <li>
                    <strong>차수별 매도 수수료</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      수수료 = 매도금액 × 매도수수료율
                    </p>
                    <p className="mt-2 text-text-secondary">
                      한국 주식 평균 0.015%, 코인 거래소 평균 0.04~0.25%.
                    </p>
                  </li>
                  <li>
                    <strong>차수별 거래세 (주식만)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      거래세 = 매도금액 × 거래세율 (코스피·코스닥 0.18%)
                    </p>
                    <p className="mt-2 text-text-secondary">코인은 거래세 없음.</p>
                  </li>
                  <li>
                    <strong>차수별 실현손익 (세후)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      실현손익 = (매도단가 − 평단) × 수량 − 수수료 − 거래세
                    </p>
                  </li>
                  <li>
                    <strong>누적 실현손익 / 누적 수익률</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      누적손익 = Σ 차수별 실현손익<br />
                      누적수익률 = 누적손익 ÷ (평단 × 매도된 총수량) × 100%
                    </p>
                  </li>
                </ol>
              </section>

              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항 및 면책</h2>
                <div className="mb-4 rounded-lg border-l-4 border-danger-500 bg-danger-50 p-4 dark:border-danger-400 dark:bg-red-950 dark:bg-opacity-20">
                  <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-200">
                    ⚠️ 중요 안내
                  </h3>
                  <p className="text-sm text-danger-600 dark:text-danger-300">
                    <strong>본 계산기는 투자 권유가 아닙니다.</strong> 분할매도 시점·비중은
                    종목 분석과 시장 판단에 따라 본인이 결정해야 합니다. 계산 결과는
                    수학적 추정이며 실제 체결가·수령액은 호가 상황에 따라 달라질 수
                    있습니다.
                  </p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>평단은 매도로 변하지 않음</strong>. 분할매도 후 잔여분
                    평단도 동일합니다. 일부 증권사 앱 화면 표기와 혼동하지 마세요.
                  </li>
                  <li>
                    수수료·거래세 프리셋은 한국 시장의 평균값입니다. 실제 거래
                    수수료는 증권사·거래소·고객 등급에 따라 다릅니다.
                  </li>
                  <li>
                    한국 주식 증권거래세는 2026년 시행령 기준이며, 정부 세제 개편에
                    따라 달라질 수 있습니다.
                  </li>
                  <li>
                    상장주식 양도소득세(대주주·해외주식 등)는 본 계산기에 포함되지
                    않습니다. 별도{' '}
                    <a href="/calculator/capital-gains-tax" className="text-primary-500 hover:underline">
                      양도소득세 계산기
                    </a>
                    를 이용하세요.
                  </li>
                  <li>
                    코인 양도소득세(2027년 시행 예정 등 정책 동향)는 별도 확인이
                    필요합니다.
                  </li>
                </ul>
              </section>

              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>목표가·손절가를 함께 설정</strong>: 분할매도 차수의 목표가
                    옆에 손절가를 함께 정하면 의사결정이 쉬워집니다.
                  </li>
                  <li>
                    <strong>"+5%·+10%·+20%" 빠른 설정 활용</strong>: 평단 대비 목표
                    수익률에서 매도가를 한 번에 환산할 수 있습니다(수수료 미반영
                    단순 환산이므로 결과 카드의 세후 수익률을 최종 확인).
                  </li>
                  <li>
                    <strong>코인은 변동성에 맞춰 차수를 늘리기</strong>: 변동성이 큰
                    코인은 익절을 더 잘게 쪼개면 평균 매도가를 안정시킬 수 있습니다.
                  </li>
                  <li>
                    <strong>분할매수와 짝맞추기</strong>: 분할매수로 평단을 안정적으로
                    형성하고, 분할매도로 차수별 익절하는 전략은 심리적 부담을 줄여줍니다.
                  </li>
                </ul>
              </section>

              <RelatedCalculators items={RELATED} />

              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-05-03: 초판 공개 (차수별 실현손익·세후 수령액·평단 환산 빠른 설정)</li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거 및 참고 자료</strong>:
                  {' '}<a href="https://www.krx.co.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">한국거래소(KRX)</a> 거래 정보,
                  {' '}<a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a> 증권거래세 안내,
                  {' '}<a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">금융감독원</a> 투자자 보호.
                </p>
                <p>
                  <strong>면책 조항</strong>: 본 계산기는 교육·참고 목적이며 투자 권유가
                  아닙니다. 계산 결과는 수학적 추정일 뿐 실제 체결가·수령액·세후 수익을
                  보장하지 않습니다. 모든 투자 결정은 투자자 본인의 책임입니다.
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
