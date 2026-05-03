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
} from '@/lib/seo/jsonld';
import { SplitBuyCalculator } from './SplitBuyCalculator';

const URL = 'https://calculatorhost.com/calculator/split-buy/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '분할매수 계산기 2026 (주식·코인) | 평균단가·BEP·균등분할 | calculatorhost',
  description:
    '주식·코인 분할매수 계산기 2026. 차수별 단가·수량으로 가중평균 평단가, 수수료 포함 실효 평단가, 손익분기점(BEP)을 한 번에 계산. 균등분할 자동채움 지원. 회원가입 불필요, 무료.',
  keywords: [
    '분할매수 계산기',
    '분할매수',
    '평균단가 계산기',
    '코인 분할매수',
    '주식 분할매수',
    'DCA 계산기',
    '추매계산기',
    '무한매수법',
    '손익분기점',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '분할매수 계산기 2026 — 주식·코인 평단·BEP',
    description:
      '차수별 매수로 가중평균 평단가·실효 평단가·손익분기점을 즉시 계산. 균등분할 자동채움 지원.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '분할매수 계산기 2026 (주식·코인)',
    description: '차수별 평단·실효 평단·BEP까지 한 번에. 균등분할 자동채움 지원.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '분할매수란 무엇이고 왜 사용하나요?',
    answer:
      '분할매수는 한 종목을 한 번에 사지 않고 여러 차례에 나눠 사는 매수 방식입니다. 시장 타이밍을 정확히 맞히지 않아도 평균단가를 안정적으로 형성할 수 있고, 단기 변동성에 따른 심리적 부담을 줄여 줍니다. 영문으로는 DCA(Dollar Cost Averaging)라고도 부릅니다. 본 계산기는 차수별 단가·수량을 입력해 가중평균 평단가와 손익분기점을 즉시 계산합니다.',
  },
  {
    question: '평균단가는 어떻게 계산되나요?',
    answer:
      '가중평균 공식이 적용됩니다. 평균단가 = (1차 단가 × 1차 수량 + 2차 단가 × 2차 수량 + …) ÷ 총 수량. 예: 10,000원 × 100주 + 8,000원 × 100주 + 6,000원 × 100주 = 240만원 ÷ 300주 = 8,000원. 본 계산기는 차수별 누적 평단 추이까지 표로 보여줍니다.',
  },
  {
    question: '수수료 포함 실효 평단가는 무엇인가요?',
    answer:
      '실제로 매수에 들어간 자금은 "단가 × 수량 + 매수 수수료"입니다. 실효 평단가 = (총 매수금액 + 총 매수수수료) ÷ 총 수량. 매수 수수료는 국내 주식 평균 0.015%, 코인 거래소 평균 0.04~0.25%입니다. 본 계산기는 자산 유형(주식/코인)을 선택하면 프리셋이 자동 적용됩니다.',
  },
  {
    question: '손익분기점(BEP)은 어떻게 계산되나요?',
    answer:
      'BEP는 매도 시 수수료와 거래세를 차감하고도 본전이 되는 가격입니다. 공식: BEP = 평단 × (1 + 매수 수수료율) ÷ (1 − 매도 수수료율 − 거래세율). 한국 주식은 매도 시 증권거래세 0.18%(코스피·코스닥 동일, 농특세 포함)가 부과되고, 코인은 거래세가 없습니다. 본 계산기는 자산 유형에 따라 자동으로 BEP를 산출합니다.',
  },
  {
    question: '균등분할(DCA)과 가중분할의 차이는?',
    answer:
      '균등분할은 매 회차 같은 금액을 투입하는 방식입니다(예: 매월 100만원). 가중분할은 차수가 진행될수록 비중을 늘리거나 줄이는 방식으로, 피라미드형(상승 시 감액), 역피라미드형(하락 시 증액 — 물타기 성격), 무한매수법(라오어식: 시드÷40 정액 분할) 등이 있습니다. 본 계산기는 차수별 단가·수량을 자유롭게 입력할 수 있어 모든 전략을 시뮬레이션할 수 있습니다.',
  },
  {
    question: '분할매수와 물타기는 같은 건가요?',
    answer:
      '겹치는 부분이 있지만 다릅니다. 분할매수는 매수 자체를 여러 차례로 나누는 매수 방법이고, 물타기는 그중 "주가가 하락했을 때" 추가 매수해 평균단가를 낮추는 전략입니다. 분할매수는 상승장·하락장 모두에서 사용되지만, 물타기는 손실 회복이 1차 목적입니다. 평단 하향과 손실 회복 시뮬레이션은 별도 페이지(/calculator/averaging-down/)에서 더 직접적으로 다룹니다.',
  },
  {
    question: '코인은 소수점 수량 입력이 가능한가요?',
    answer:
      '본 계산기의 수량 필드는 정수 단위로 입력합니다. 코인은 일반적으로 KRW 금액으로 매수하기 때문에, 매수 시점의 KRW 금액을 단가로 나눈 정수 수량을 입력하면 충분히 정확한 평단이 계산됩니다. 더 정밀한 코인 소수점 평단가가 필요한 경우, 단가를 100원/1원 단위로, 수량은 100배/1만배 환산해 입력해도 평균단가 결과는 동일합니다(가중평균의 비례 불변성).',
  },
] as const;

const RELATED = [
  {
    href: '/calculator/split-sell',
    title: '분할매도 계산기',
    description: '차수별 실현손익·세후·누적',
  },
  {
    href: '/calculator/averaging-down',
    title: '물타기 계산기',
    description: '주식·코인 평단 하향·목표단가 역산',
  },
  {
    href: '/calculator/savings',
    title: '적금 이자',
    description: '월복리·세후 수령액',
  },
  {
    href: '/calculator/inflation',
    title: '화폐가치',
    description: '인플레이션·실질 구매력',
  },
];

export default function SplitBuyPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '분할매수 계산기 (주식·코인)',
    description:
      '차수별 단가·수량으로 가중평균 평단가, 수수료 포함 실효 평단가, 손익분기점을 즉시 계산하는 분할매수(DCA) 계산기.',
    url: URL,
  });
  const webpageLd = buildWebPageJsonLd({
    name: '분할매수 계산기 2026 (주식·코인)',
    description:
      '주식·코인 분할매수 가중평균 평단가·실효 평단가·손익분기점 계산. 균등분할 자동채움 지원.',
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
    { name: '분할매수 계산기' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '분할매수 평균단가 계산하기',
    description:
      '차수별 단가·수량을 입력해 가중평균 평단가, 실효 평단가, 손익분기점을 산출하는 방법',
    steps: [
      {
        name: '자산 유형 선택',
        text: '주식 또는 코인을 선택합니다. 매수·매도 수수료와 거래세 프리셋이 자동 적용됩니다.',
      },
      {
        name: '차수별 매수 입력',
        text: '1차, 2차, 3차…처럼 매수 차수마다 단가와 수량을 입력합니다. "차수 추가" 버튼으로 최대 10회까지 늘릴 수 있습니다.',
      },
      {
        name: '균등분할 자동채움 (선택)',
        text: '총 투자금을 입력하고 "균등분할 적용"을 누르면, 입력한 단가들에 맞춰 차수별 수량이 균등 분배됩니다.',
      },
      {
        name: '결과 확인',
        text: '가중평균 평단가, 차수별 누적 평단 추이 표, 수수료 포함 실효 평단가, 손익분기점(BEP)이 즉시 계산됩니다.',
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

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '금융', href: '/category/finance/' },
                    { name: '분할매수 계산기' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  분할매수 계산기 2026 <span className="text-text-tertiary text-2xl font-semibold">(주식·코인)</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주식·코인을 여러 차례 나눠 매수했을 때의 가중평균 평단가, 수수료
                  포함 실효 평단가, 매도 시 본전이 되는 손익분기점(BEP)을 즉시 계산합니다.
                  차수별 단가·수량을 자유롭게 입력하거나, 총 투자금에서 균등분할로
                  자동 채울 수 있습니다.
                </p>
              </header>

              <StructuredSummary
                definition="분할매수(DCA, Dollar Cost Averaging)는 한 종목을 한 번에 매수하지 않고 여러 차례 나눠 사는 방법입니다. 시점 분산으로 평균단가를 안정시키고 단기 변동성의 심리적 부담을 줄입니다."
                table={{
                  caption: '분할매수 계산 핵심 공식',
                  headers: ['항목', '공식/설명'],
                  rows: [
                    ['총 투자금', 'Σ(차수별 단가 × 수량)'],
                    ['총 수량', 'Σ(차수별 수량)'],
                    ['가중평균 평단가', '총 투자금 ÷ 총 수량'],
                    ['실효 평단가', '(총 투자금 + 총 매수수수료) ÷ 총 수량'],
                    ['손익분기점(BEP)', '평단 × (1 + 매수수수료율) ÷ (1 − 매도수수료율 − 거래세율)'],
                  ],
                }}
                tldr={[
                  '분할매수 = 차수별 매수의 가중평균으로 평단 형성',
                  '매수·매도 수수료와 거래세까지 반영한 BEP를 확인하면 실제 본전 시점이 보임',
                  '주식: 매도 시 거래세 0.18% 부과 / 코인: 거래세 없음, 거래소별 수수료',
                  '균등분할은 시점 리스크 분산, 가중분할(피라미드/역피라미드)은 전략적 비중 조절',
                ]}
              />

              <AdSlot slot="split-buy-top" format="horizontal" />

              <SplitBuyCalculator />

              <FaqSection items={[...FAQ_ITEMS]} />

              <section aria-label="분할매수란" className="card">
                <h2 className="mb-4 text-2xl font-semibold">분할매수란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  분할매수(DCA, Dollar Cost Averaging)는 한 종목에 투입할 자금을 여러
                  차례에 나눠 매수하는 방식입니다. 한 시점에 모든 자금을 투입하는 일시
                  매수와 달리, 여러 시점에 분산해 평균단가를 안정적으로 형성하고 단기
                  변동성에 따른 심리적 부담을 줄일 수 있습니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  분할매수의 가장 큰 장점은 <strong>시점 리스크 분산</strong>입니다.
                  시장 타이밍을 정확히 맞히기는 매우 어렵기 때문에, 매수 시점을 분산해
                  "고점에 몰빵"하는 위험을 줄입니다. 또한 정기 매수 규칙을 미리 정해두면
                  변동성에 휘둘려 충동 매수하는 것을 막을 수 있습니다.
                </p>
                <p className="text-text-secondary">
                  반면 분명한 한계도 있습니다. 시장이 강한 상승 추세에 있을 때는
                  일시 매수가 분할매수보다 결과가 더 좋습니다. 또한 분할매수가 자동으로
                  손실을 보호해 주지는 않습니다. 분할매수는 "시장 타이밍을 포기하는
                  대신 평균치를 사겠다"는 전략입니다.
                </p>
              </section>

              <section aria-label="분할매수 전략" className="card">
                <h2 className="mb-4 text-2xl font-semibold">분할매수 전략 4가지</h2>
                <div className="space-y-4 text-sm">
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-2 font-semibold text-text-primary">① 균등분할 (Equal DCA)</h3>
                    <p className="text-text-secondary">
                      매 회차 같은 금액(또는 같은 수량)을 매수합니다. 예: 매월 100만 원.
                      가장 단순하고 규율 있는 방식. 본 계산기의 "균등분할 자동채움"이
                      이 방식을 빠르게 시뮬레이션합니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-2 font-semibold text-text-primary">② 피라미드형 (Pyramid)</h3>
                    <p className="text-text-secondary">
                      차수가 올라갈수록(상승 추세 확인 후) 비중을 줄여 매수합니다.
                      추세 추종 + 리스크 관리. 신뢰할 만한 상승 시그널 확인 시 활용.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-2 font-semibold text-text-primary">③ 역피라미드형 (Reverse Pyramid)</h3>
                    <p className="text-text-secondary">
                      가격이 내려갈수록 비중을 늘려 매수합니다. 평단 하향 효과가 크지만
                      추가 하락 시 손실도 커집니다. 물타기 성격이 강한 전략.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-2 font-semibold text-text-primary">④ 정액 분할 (라오어식 무한매수법 호환)</h3>
                    <p className="text-text-secondary">
                      시드를 N등분(예: 40등분)해 매 회차 동일한 금액으로 매수.
                      평단 LOC 분할 주문과 결합하면 라오어식 "무한매수법" 의도와
                      유사한 결과. 본 계산기는 차수 수량을 자유롭게 입력해 모든 정액
                      전략을 시뮬레이션할 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>총 투자금</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      총투자금 = Σ(차수별 단가 × 차수별 수량)
                    </p>
                  </li>
                  <li>
                    <strong>가중평균 평단가</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      평단 = 총투자금 ÷ 총수량
                    </p>
                    <p className="mt-2 text-text-secondary">
                      모든 차수의 단가를 수량으로 가중 평균한 값. 단순 산술평균이 아닌
                      가중평균을 사용해야 정확합니다.
                    </p>
                  </li>
                  <li>
                    <strong>실효 평단가 (수수료 포함)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      실효평단 = (총투자금 + 총 매수수수료) ÷ 총수량
                    </p>
                  </li>
                  <li>
                    <strong>손익분기점 (BEP)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      BEP = 평단 × (1 + 매수수수료율) ÷ (1 − 매도수수료율 − 거래세율)
                    </p>
                    <p className="mt-2 text-text-secondary">
                      매도 시 수수료와 거래세까지 차감하고도 본전이 되는 가격.
                      한국 주식은 거래세 0.18%(코스피·코스닥 동일), 코인은 거래세 없음.
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
                    <strong>본 계산기는 투자 권유가 아닙니다.</strong> 분할매수 자체가
                    수익을 보장하지 않으며, 시장 추세에 따라 일시 매수보다 결과가 나쁠
                    수도 있습니다. 모든 투자 결정은 본인의 책임입니다.
                  </p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    수수료·거래세 프리셋은 한국 시장의 평균값을 사용합니다. 실제 거래
                    수수료는 증권사·거래소·고객 등급에 따라 다르므로, 정확한 BEP
                    계산을 위해서는 본인의 실효 수수료를 확인하세요.
                  </li>
                  <li>
                    한국 주식 매도 시 증권거래세는 2026년 시행령 기준이며, 정부의
                    세제 개편에 따라 달라질 수 있습니다. 최신 정보는 한국거래소 또는
                    국세청 공지를 확인하세요.
                  </li>
                  <li>
                    본 계산기는 동일 종목의 분할매수만 다룹니다. 환율 변동(해외주식),
                    배당 재투자, 이체 수수료 등은 별도로 고려해야 합니다.
                  </li>
                </ul>
              </section>

              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>차수 간격 정하기</strong>: 시간 기준(매월/매주) 또는 가격
                    기준(−5% 하락 시마다)으로 미리 규칙을 정해두세요. 충동 매수를
                    방지합니다.
                  </li>
                  <li>
                    <strong>BEP를 손절 기준 옆에 두기</strong>: BEP가 너무 높게
                    나오면(과도한 평단), 손절 기준과 비교해 추가 진입 여부를
                    판단하세요.
                  </li>
                  <li>
                    <strong>실효 평단으로 의사결정</strong>: 단순 평단보다 수수료
                    포함 실효 평단을 기준으로 매도 가격·수익률을 판단하면 실제
                    수령액에 가까운 시뮬레이션이 가능합니다.
                  </li>
                  <li>
                    <strong>코인은 변동성에 맞춰 차수를 늘리기</strong>: 변동성이 큰
                    종목일수록 더 많은 차수로 나누는 것이 평균치 형성에 유리합니다.
                  </li>
                  <li>
                    <strong>분할매도와 짝맞추기</strong>: 분할매수로 평단을 만들고,
                    분할매도로 차수별로 익절하는 전략은 심리적 부담을 줄여줍니다.
                  </li>
                </ul>
              </section>

              <RelatedCalculators items={RELATED} />

              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-05-03: 초판 공개 (가중평균 평단·실효 평단·BEP·균등분할 지원)</li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거 및 참고 자료</strong>:
                  {' '}<a href="https://www.krx.co.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 hover:underline dark:text-primary-500">한국거래소(KRX)</a> 거래 정보,
                  {' '}<a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 hover:underline dark:text-primary-500">금융감독원</a> 투자자 보호,
                  {' '}<a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 hover:underline dark:text-primary-500">국세청</a> 증권거래세 안내.
                </p>
                <p>
                  <strong>면책 조항</strong>: 본 계산기는 교육·참고 목적이며 투자 권유가
                  아닙니다. 계산 결과는 수학적 추정일 뿐 실제 손익을 보장하지 않습니다.
                  수수료·거래세는 정책 변경 시 차이가 있을 수 있으며, 모든 투자 결정은
                  투자자 본인의 책임입니다.
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
