import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
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
  buildWebPageJsonLd,
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';
import { AveragingDownCalculator } from './AveragingDownCalculator';

const URL = 'https://calculatorhost.com/calculator/averaging-down/';
const DATE_PUBLISHED = '2026-04-24';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '물타기 계산기 2026 (주식·코인 추매) | 평균단가·목표단가 | calculatorhost',
  description:
    '주식·코인 물타기 계산기 2026. 보유분과 추가 매수(추매)로 새 평균단가를 즉시 계산하고, 목표 평균단가 달성에 필요한 분할매수 수량을 역산. 손실 회복 상승률·손익분기점까지 한 번에 분석. 회원가입 불필요, 무료.',
  keywords: [
    '물타기 계산기',
    '주식 물타기 계산기',
    '코인 물타기 계산기',
    '추매계산기',
    '평균단가 계산기',
    '분할매수 계산기',
    '물타기',
    '주식 물타기',
    '코인 물타기',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '물타기 계산기 2026 — 주식·코인 평균단가·추매',
    description:
      '보유분 + 추가 매수(추매)로 새 평균단가 계산, 목표 단가 역산으로 필요 분할매수 수량까지 즉시 분석.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '물타기 계산기 2026 (주식·코인)',
    description: '평균단가·추매·목표단가 즉시 계산. 손익분기 회복 상승률까지.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '물타기(Averaging Down)란 무엇인가요?',
    answer:
      '물타기는 보유한 주식의 가격이 하락했을 때, 더 낮은 가격에 추가로 매수해 평균 단가를 내리는 전략입니다. 예: 10,000원에 100주 매수 후 5,000원까지 하락하면, 5,000원에 100주를 더 사서 평균단가를 7,500원으로 낮추는 것입니다. 이렇게 하면 주가가 7,500원을 넘기면 손익분기를 넘어갑니다.',
  },
  {
    question: '물타기의 리스크는 무엇인가요?',
    answer:
      '물타기의 최대 위험은 주가가 계속 하락할 수 있다는 것입니다. 이 경우 투자 자본이 계속 증가하고 손실도 커집니다. 또한 하락장에서 물을 타다가 자본이 모두 소진될 수 있습니다. 추가로 평균단가를 낮췄더라도 원래 수익 기준점은 높아져 원금 회복까지 더 큰 상승률이 필요합니다(손실 회복 필요 상승률이 비선형적으로 증가). 따라서 물타기는 "장기 성장주"나 "일시적 약세"로 판단되는 경우에만 사용해야 합니다.',
  },
  {
    question: '물타기 후 회복까지 필요한 상승률은?',
    answer:
      '물타기로 평균단가를 낮췄더라도, 원금 회복까지 필요한 상승률은 여전히 비선형입니다. 예: 초기 10,000원 투자 → 50% 하락 후 물타기 → 평균 7,500원 → 회복 필요 상승률은 약 33%(7,500→10,000)입니다. 손실 회복 필요 상승률 = (목표가 - 현재가) / 현재가 × 100%. 따라서 물타기는 "충분한 투자 자본"과 "강한 신념"이 필요합니다.',
  },
  {
    question: '분할 매수와 물타기는 다른가요?',
    answer:
      '분할 매수(Dollar Cost Averaging)는 일정 금액을 정기적으로 나눠 사는 전략으로, 주가와 상관없이 실행합니다. 물타기는 주가 하락에 반응해 더 사는 전략입니다. 분할 매수는 위험 분산 목적이고, 물타기는 손실 회복 목적입니다. 둘 다 장기 투자에 유리하지만, 물타기는 "하락"이라는 명확한 트리거가 있습니다.',
  },
  {
    question: '물타기 계산기로 할 수 있는 분석은?',
    answer:
      '본 계산기는 두 가지 시나리오를 제공합니다. (1) "현재+추가 매수 → 평균단가": 새로운 평균단가와 손실 회복 필요 상승률을 계산합니다. (2) "목표 평균단가 → 필요 수량": 목표 평균단가를 설정하고 그것을 달성하기 위해 추가로 사야 할 수량을 계산합니다. 두 가지 모두 손익분기 분석에 유용합니다.',
  },
  {
    question: '물타기는 투자 권유인가요?',
    answer:
      '아니요. 물타기는 투자 기법일 뿐, 이를 실행할지는 순전히 투자자의 판단입니다. 본 계산기는 수학적 계산만 제공하며, 해당 주식이 "회복할 것"인지 "더 떨어질 것"인지는 기업 분석, 시장 상황, 기술 분석을 통해 스스로 판단해야 합니다. 물타기로 손실을 회복할 수도 있지만, 손실을 더 키울 수도 있습니다. 투자 판단은 항상 신중해야 합니다.',
  },
] as const;

const RELATED = [
  {
    href: '/calculator/split-buy',
    title: '분할매수 계산기',
    description: '차수별 평단·실효평단·BEP',
  },
  {
    href: '/calculator/savings',
    title: '적금 이자',
    description: '월복리·세후 수령액',
  },
  {
    href: '/calculator/deposit',
    title: '예금 이자',
    description: '정기예금 세후 이자',
  },
  {
    href: '/calculator/inflation',
    title: '화폐가치',
    description: '인플레이션·실질 구매력',
  },
];

export default function AveragingDownPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '물타기 계산기 (주식·코인)',
    description:
      '주식·코인 보유분과 추가 매수(추매) 정보로 새 평균단가를 계산하거나, 목표 평균단가 달성에 필요한 분할매수 수량을 역산합니다.',
    url: URL,
  });
  const webpageLd = buildWebPageJsonLd({
    name: '물타기 계산기 2026 (주식·코인 추매)',
    description:
      '보유 + 추가 매수로 새 평균단가 계산, 목표 단가 역산으로 필요 수량 산출. 손실 회복 상승률·손익분기점 분석.',
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
    { name: '물타기 계산기' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '물타기 계산하기 (주식·코인)',
    description:
      '주식·코인 보유 정보와 추가 매수(추매) 정보를 입력해 평균단가를 계산하거나, 목표 단가 달성에 필요한 분할매수 수량을 역산하는 방법',
    steps: [
      {
        name: '계산 모드 선택',
        text: '"평균단가 계산" 또는 "필요 수량 계산" 중 선택합니다. 주식·코인·해외주식 모두 동일한 가중평균 공식이 적용됩니다.',
      },
      {
        name: '현재 보유 정보 입력',
        text: '현재 보유한 종목의 매입 단가(원/달러/USDT)와 수량(주·코인 수량)을 입력합니다. 코인은 소수점 입력이 가능합니다.',
      },
      {
        name: '추가 매수(추매) 정보 입력',
        text: '(평균단가 모드) 추매 단가와 추매 수량을 입력합니다. (필요수량 모드) 추매 단가와 목표 평균단가를 입력해 필요한 추매 수량을 역산합니다.',
      },
      {
        name: '결과 확인',
        text: '새 평균단가, 총 투자금, 평균단가 하락률, 손실 회복 필요 상승률이 즉시 계산됩니다.',
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
              name: '물타기·평단 핵심 용어',
              description: '주식·코인 물타기와 평균단가 산정 관련 용어집',
              url: `${URL}#glossary`,
              terms: [
                {
                  name: '물타기 (Averaging Down)',
                  alternateName: '평단 낮추기',
                  description: '보유 종목 가격이 하락했을 때 추가 매수해 평균단가를 낮추는 전략. 손익분기점이 낮아져 회복에 필요한 상승률이 감소하지만, 추가 하락 시 손실이 가중됨.',
                },
                {
                  name: '평균단가 (가중평균)',
                  alternateName: '평단',
                  description: '보유 종목의 매입 단가를 가중평균한 값. 산식: Σ(매입가 × 매입수량) ÷ 총 보유수량. 분할매도는 평단을 변경하지 않음.',
                },
                {
                  name: '추매 (추가 매수)',
                  description: '이미 보유 중인 종목을 더 사는 모든 거래의 총칭. 하락 시 추매는 물타기, 상승 시 추매는 불타기(피라미딩)로 구분.',
                },
                {
                  name: '손익분기점 (BEP)',
                  alternateName: 'BEP',
                  description: 'Break-Even Point. 매수·매도 수수료, 거래세를 모두 차감하고도 본전이 되는 매도 단가. 한국 주식은 매도 시 거래세 0.18% 추가 부담.',
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
          <main className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              {/* H1 + 리드 */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '금융', href: '/category/finance/' },
                    { name: '물타기 계산기' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  물타기 계산기 2026 <span className="text-text-tertiary text-2xl font-semibold">(주식·코인 추매)</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주식·코인 가격이 하락했을 때 추가 매수(추매)로 평균단가를 낮추는
                  물타기 전략을 분석합니다. 보유분과 추매 정보로 새 평균단가를 즉시
                  계산하거나, 목표 평균단가 달성에 필요한 분할매수 수량을 역산합니다.
                  손실 회복 필요 상승률·손익분기점까지 한 번에 확인하세요.
                </p>
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="물타기(Averaging Down)는 보유한 주식이 하락했을 때, 더 낮은 가격에 추가로 매수해 평균 단가를 내리는 투자 기법입니다. 평균단가를 낮추면 손익분기점이 낮아져 회복에 필요한 상승률이 감소합니다. 하지만 주가가 계속 하락하면 손실이 더 커질 수 있으므로 신중해야 합니다."
                table={{
                  caption: '물타기 계산 핵심 공식',
                  headers: ['항목', '공식/설명'],
                  rows: [
                    ['총 투자금', '(기존단가 × 기존수량) + (신규단가 × 신규수량)'],
                    ['총 수량', '기존수량 + 신규수량'],
                    ['새 평균단가', '총 투자금 ÷ 총 수량'],
                    ['손실 회복 상승률', '(목표가 - 평균단가) ÷ 평균단가 × 100%'],
                    ['필요 수량 (목표달성)', '(목표단가 × 기존수량 - 기존투자금) ÷ (신규단가 - 목표단가)'],
                  ],
                }}
                tldr={[
                  '물타기 = 하락한 주가에 추가 매수로 평균단가 하향 조정',
                  '평균단가가 낮을수록 손익분기 회복이 쉬워지지만 추가 자본 필요',
                  '주가 추가 하락 시 손실이 가중되므로 신중한 판단 필수',
                  '투자 권유 아님. 기업 분석·시장 판단 후 자체 결정',
                ]}
              />

              <AdSlot slot="averaging-down-top" format="horizontal" />

              {/* 계산기 */}
              <AveragingDownCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 물타기 개념 */}
              <section aria-label="물타기란" className="card">
                <h2 className="mb-4 text-2xl font-semibold">물타기란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  물타기(Averaging Down)는 보유한 주식의 가격이 하락했을 때, 더 낮은 가격에
                  추가로 매수하는 투자 전략입니다. 이렇게 하면 전체 투자금을 기준으로 한
                  평균 매수가가 낮아집니다. 예를 들어 10,000원에 100주를 매수한 후 5,000원까지
                  하락하면, 5,000원에 100주를 추가 매수해 평균단가를 7,500원으로 낮출 수 있습니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  물타기의 이점은 손익분기점이 낮아진다는 것입니다. 위 예시에서 원금 회복을 위해서는
                  주가가 10,000원까지 올라야 하지만, 물타기 후에는 7,500원까지만 올라가도 손익분기를
                  넘습니다. 따라서 회복에 필요한 상승률이 감소합니다(요구수익률 개념, 투자론 기초).
                </p>
                <p className="text-text-secondary">
                  그러나 물타기는 위험한 전략이기도 합니다. 주가가 계속 하락하면 추가 투자금이 계속
                  필요하고, 손실이 더 커질 수 있습니다. 또한 물타기로 평균단가를 낮춘 후에도 원금을
                  회복하려면 여전히 상당한 상승이 필요합니다. 따라서 물타기는 "장기 성장주"이거나
                  "시장이 과도하게 약한 것 같다"고 판단할 때만 신중하게 사용해야 합니다.
                </p>
              </section>

              {/* 물타기 vs 분할 매수 */}
              <section aria-label="물타기 vs 분할매수" className="card">
                <h2 className="mb-4 text-2xl font-semibold">물타기 vs 분할 매수</h2>
                <p className="mb-4 text-text-secondary">
                  두 전략 모두 장기 투자에 유리하지만, 목적과 방식이 다릅니다.
                </p>
                <div className="mb-4 rounded-lg border border-border-base p-4 bg-bg-raised">
                  <h3 className="mb-3 font-semibold text-text-primary">분할 매수 (Dollar Cost Averaging)</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>목적</strong>: 시장 변동성에 상관없이 일정 금액을 정기적으로 사기
                    </li>
                    <li>
                      <strong>방식</strong>: 매월 일정 금액(예: 100만 원)씩 매수
                    </li>
                    <li>
                      <strong>특징</strong>: 감정이 덜 개입되고 리스크가 분산됨
                    </li>
                    <li>
                      <strong>장점</strong>: 장기 평균 비용 절감, 시장 타이밍 불필요
                    </li>
                    <li>
                      <strong>단점</strong>: 반데드캣(Dead Cat Bounce) 같은 함정에 걸릴 수 있음
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                  <h3 className="mb-3 font-semibold text-text-primary">물타기 (Averaging Down)</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>목적</strong>: 손실 회복을 위해 의도적으로 더 사기
                    </li>
                    <li>
                      <strong>방식</strong>: 주가 하락 시 추가 매수하기
                    </li>
                    <li>
                      <strong>특징</strong>: 강한 신념과 자본력이 필요함
                    </li>
                    <li>
                      <strong>장점</strong>: 빠른 손익분기 달성 가능
                    </li>
                    <li>
                      <strong>단점</strong>: 추가 손실 가능성, 자본 소진 위험
                    </li>
                  </ul>
                </div>
              </section>

              {/* 손실 회복 필요 상승률 */}
              <section aria-label="필요 상승률" className="card">
                <h2 className="mb-4 text-2xl font-semibold">손실 회복 필요 상승률</h2>
                <p className="mb-4 text-text-secondary">
                  물타기의 핵심 메트릭은 "원금 회복까지 주가가 얼마나 올라야 하는가"입니다.
                  평균단가를 낮춰도 여전히 상당한 상승이 필요합니다.
                </p>
                <div className="mb-4 rounded-lg border border-border-base p-4 bg-bg-raised">
                  <h3 className="mb-3 font-semibold text-text-primary">예시 시뮬레이션</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <strong className="block mb-2">상황 1: 물타기 없음</strong>
                      <div className="flex justify-between">
                        <span>최초 매수</span>
                        <span className="font-mono">10,000원 × 100주 = 1,000만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>현재 주가</span>
                        <span className="font-mono">5,000원 (50% 손실)</span>
                      </div>
                      <div className="border-t border-border-subtle pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>필요 상승률</span>
                          <span className="font-mono">100% (5,000 → 10,000)</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border-subtle pt-4">
                      <strong className="block mb-2">상황 2: 물타기 실행</strong>
                      <div className="flex justify-between">
                        <span>기존 투자</span>
                        <span className="font-mono">1,000만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>추가 매수</span>
                        <span className="font-mono">5,000원 × 100주 = 500만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>총 투자금</span>
                        <span className="font-mono">1,500만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>평균단가</span>
                        <span className="font-mono">7,500원 (100주 → 200주)</span>
                      </div>
                      <div className="border-t border-border-subtle pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>필요 상승률</span>
                          <span className="font-mono">33% (5,000 → 7,500)</span>
                        </div>
                        <p className="text-xs text-text-secondary mt-2">
                          물타기로 100%에서 33%로 낮았지만, 자본이 1,500만 원으로 증가
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary">
                  물타기는 단기적으로 회복에 필요한 상승률을 낮출 수 있지만, 총 투자금이 증가하므로
                  손실액도 그대로 증가합니다. 또한 회복 후에도 손익분기를 넘었을 뿐, 원점입니다.
                  따라서 물타기는 "정말 이 회사가 장기 성장할 것"이라는 강한 신념이 있을 때만
                  신중하게 사용해야 합니다.
                </p>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>총 투자금</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      총투자금 = (기존단가 × 기존수량) + (추가단가 × 추가수량)
                    </p>
                    <p className="mt-2 text-text-secondary">
                      모든 매수에 소요된 자본의 합계입니다.
                    </p>
                  </li>
                  <li>
                    <strong>총 수량</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      총수량 = 기존수량 + 추가수량
                    </p>
                    <p className="mt-2 text-text-secondary">
                      현재 보유한 전체 주식 수입니다.
                    </p>
                  </li>
                  <li>
                    <strong>새 평균단가</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      평균단가 = 총투자금 ÷ 총수량
                    </p>
                    <p className="mt-2 text-text-secondary">
                      물타기 후 주당 평균 매입가입니다. 이것이 손익분기점입니다.
                    </p>
                  </li>
                  <li>
                    <strong>손실 회복 필요 상승률</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      필요상승률(%) = (원래목표가 - 평균단가) ÷ 평균단가 × 100
                    </p>
                    <p className="mt-2 text-text-secondary">
                      원금 회복 또는 목표 달성까지 주가가 얼마나 올라야 하는지를 퍼센트로 표시합니다.
                    </p>
                  </li>
                  <li>
                    <strong>필요 수량 (목표 달성 역산)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      필요수량 = (목표단가 × 기존수량 - 기존투자금)<br /> / (추가단가 - 목표단가)
                    </p>
                    <p className="mt-2 text-text-secondary">
                      목표 평균단가를 달성하기 위해 추가로 매수해야 할 주식 수를 계산합니다.
                    </p>
                  </li>
                </ol>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항 및 면책</h2>
                <div className="mb-4 rounded-lg border-l-4 border-danger-500 bg-danger-50 p-4 dark:border-danger-400 dark:bg-red-950 dark:bg-opacity-20">
                  <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-200">
                    ⚠️ 중요 경고
                  </h3>
                  <p className="text-sm text-danger-600 dark:text-danger-300 mb-2">
                    <strong>본 계산기는 투자 권유가 아닙니다.</strong> 물타기는 고위험 전략이며,
                    주가가 계속 하락할 경우 손실이 가중될 수 있습니다. 모든 투자 결정은 본인의
                    책임이며, 충분한 분석과 위험 관리 후 신중하게 진행하세요.
                  </p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    물타기로 평균단가를 낮춘 후에도 원금 회복까지 여전히 상당한 상승이 필요합니다.
                    회복률은 수학적으로 낮아지지만, 투자금과 손실액은 증가합니다.
                  </li>
                  <li>
                    주가 하락의 원인을 반드시 분석하세요. 기업의 구조적 문제(배당 삭감, 경영 실적
                    악화, 산업 쇠퇴)라면 물타기는 손실을 키울 뿐입니다.
                  </li>
                  <li>
                    물타기는 충분한 여유 자본이 있을 때만 고려하세요. 투자금이 고갈되면 추가 매수가
                    불가능하고, 상승장에서도 회복하지 못합니다.
                  </li>
                  <li>
                    본 계산기는 기본 수학만 제공하며, 기업 가치, 시장 상황, 심리적 요소는 포함하지
                    않습니다. 실제 투자 판단은 스스로 해야 합니다.
                  </li>
                  <li>
                    손실 회복은 절대 보장되지 않습니다. 주식은 0원까지 손실될 수 있습니다. 항상
                    손실을 상정하고 계획하세요(손실관리, 포지션 사이징).
                  </li>
                </ul>
              </section>

              {/* 코인 물타기 vs 주식 물타기 */}
              <section aria-label="코인 물타기와 주식 물타기" className="card">
                <h2 className="mb-4 text-2xl font-semibold">코인 물타기와 주식 물타기, 무엇이 다른가요?</h2>
                <p className="mb-4 text-text-secondary">
                  본 계산기는 주식·코인 모두에서 동일한 가중평균 공식
                  <code className="mx-1 rounded bg-bg-raised px-1.5 py-0.5 text-xs">평균단가 = Σ(단가 × 수량) ÷ Σ수량</code>
                  으로 평균단가를 계산합니다. 다만 두 자산은 시장 구조와 거래 조건이
                  다르므로 입력·해석 시 다음 차이를 알아두면 도움이 됩니다.
                </p>
                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-3 font-semibold text-text-primary">📈 주식 물타기</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li><strong>수량 단위</strong>: 정수(주). 소수점 매수 불가(일부 미국주식 소수점 거래 예외)</li>
                      <li><strong>거래 시간</strong>: 정규장(09:00–15:30). 시간외 단일가 보조</li>
                      <li><strong>거래 비용</strong>: 매수 수수료 0.015%대 + <strong>매도 시 증권거래세 0.18%</strong></li>
                      <li><strong>일일 변동폭</strong>: 상·하한 ±30% 제한</li>
                      <li><strong>회복 주기</strong>: 비교적 길고 펀더멘털 재평가까지 시간 필요</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-3 font-semibold text-text-primary">🪙 코인 물타기</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li><strong>수량 단위</strong>: 소수점(BTC 8자리, 알트 4~8자리). 본 계산기는 소수점 입력 지원</li>
                      <li><strong>거래 시간</strong>: 24시간 365일</li>
                      <li><strong>거래 비용</strong>: 거래소별 매수·매도 수수료 0.04~0.25%, 거래세 없음</li>
                      <li><strong>일일 변동폭</strong>: 제한 없음(±30% 이상 흔함)</li>
                      <li><strong>회복 주기</strong>: 변동성이 커서 단기 반등·급락 모두 빈번</li>
                    </ul>
                  </div>
                </div>
                <p className="text-text-secondary">
                  <strong>실무 팁</strong>: 코인 물타기는 변동성이 커 한 번에 추매하기보다
                  <strong>분할매수(단계적 추매)</strong> 가 권장됩니다. 본 계산기의
                  "필요 수량 계산" 모드를 활용하면 목표 평균단가에서 역산해 적정 추매 수량을
                  단계별로 산정할 수 있습니다.
                </p>
              </section>

              {/* 추매(추가 매수) 용어 정리 */}
              <section aria-label="추매란" className="card">
                <h2 className="mb-4 text-2xl font-semibold">추매(추가 매수) 계산기 — 용어 정리</h2>
                <p className="mb-4 text-text-secondary">
                  <strong>추매</strong>는 "추가 매수"의 줄임말로, 보유 중인 종목을 더 사는
                  모든 거래를 통칭합니다. 검색에서 "추매계산기"는 일반적으로 다음 두 가지
                  의도를 포함합니다.
                </p>
                <ol className="mb-4 list-decimal space-y-3 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>평균단가 추매</strong>: 추매 단가·수량을 입력해 새 평균단가를 확인
                    → 본 계산기의 <strong>"평균단가 계산" 모드</strong> 사용
                  </li>
                  <li>
                    <strong>목표 평단 역산 추매</strong>: 목표 평균단가에서 역산해 필요한 추매
                    수량 계산 → 본 계산기의 <strong>"필요 수량 계산" 모드</strong> 사용
                  </li>
                </ol>
                <p className="text-text-secondary">
                  추매가 곧 물타기는 아닙니다. 상승 중 추매(피라미딩, 불타기)는 평균단가가
                  올라가지만, 하락 중 추매(물타기)는 평균단가가 내려갑니다. 본 계산기는 두
                  방향 모두 동일한 가중평균으로 정확하게 계산합니다.
                </p>
              </section>

              {/* 활용 팁 */}
              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>기업 분석 우선</strong>: 물타기 전에 반드시 하락 원인을 분석하세요.
                    "시장 과반응"인지 "기업의 실적 악화"인지 판단하는 것이 가장 중요합니다.
                  </li>
                  <li>
                    <strong>손절 기준 정하기</strong>: 물타기를 시작하기 전에 "여기까지만 손실을
                    감내하겠다"는 기준을 미리 정하세요. 그 기준을 넘으면 손절합니다.
                  </li>
                  <li>
                    <strong>분할 매수 활용</strong>: 물타기는 한 번에 다 사지 말고, 여러 번에 나눠
                    사세요. 5,000원 → 4,000원 → 3,000원 같이 단계적으로.
                  </li>
                  <li>
                    <strong>목표가 설정</strong>: "이 주가까지 올라가면 판다"는 목표가를 미리 정하고,
                    그곳에서 반드시 일부라도 익절하세요.
                  </li>
                  <li>
                    <strong>포지션 사이징</strong>: 전체 투자 자산의 5~10% 이상을 한 주식에 투자하지
                    마세요. 물타기할 때는 더욱 신중해야 합니다.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <ShareButtons title="물타기 계산기 (주식·코인) 2026" url="https://calculatorhost.com/calculator/averaging-down/" />

              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>2026-05-03: 코인 물타기 가이드 추가, 추매·분할매수 키워드 보강, WebPage 구조화 데이터 추가</li>
                  <li>2026-04-24: 초판 공개 (평균단가·목표단가 계산)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거 및 참고 자료</strong>: <a href="https://www.krx.co.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">한국거래소</a> 주식 정보, <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">금감원</a> 투자자 보호 정보.
                </p>
                <p>
                  <strong>면책 조항</strong>: 본 계산기는 교육·참고 목적이며 투자 권유가 아닙니다.
                  계산 결과는 수학적 추정일 뿐, 실제 손익을 보장하지 않습니다. 모든 투자 결정은
                  투자자 본인의 책임이며, 반드시 신중한 분석과 기업 실사(due diligence) 후에
                  진행하세요. 손실은 언제든 발생할 수 있습니다.
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
