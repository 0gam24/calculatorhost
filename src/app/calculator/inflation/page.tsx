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
  getCategoryUrlForCalculator,
} from '@/lib/seo/jsonld';
import { InflationCalculator } from './InflationCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/inflation/';

export const metadata: Metadata = {
  title: '화폐가치 계산기 2026 | 인플레이션·실질 구매력 | calculatorhost',
  description:
    '2026년 화폐가치 계산기. 금액과 기간, 연간 인플레이션을 입력하면 미래 화폐가치, 현재가치, 실질 구매력을 즉시 계산. CPI 기반 인플레이션 반영.',
  alternates: { canonical: URL },
  openGraph: {
    title: '화폐가치 계산기 2026 — 인플레이션·실질 구매력',
    description:
      '금액의 미래 화폐가치, 현재가치, 실질 구매력을 계산하세요. CPI 기반 인플레이션 반영.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '화폐가치 계산기 2026',
    description: '미래 화폐가치·현재가치·실질 구매력: 인플레이션 반영 즉시 계산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '미래 화폐가치(Future Value)는 무엇인가요?',
    answer:
      '미래 화폐가치는 현재의 금액이 인플레이션으로 인해 미래에 얼마나 가치가 떨어질지를 계산하는 것입니다. 예: 현재 1,000만 원이 연 2% 인플레이션으로 10년 후 얼마나 가치가 떨어질지. 실제로는 돈의 액수는 같지만 (1,000만 원은 여전히 1,000만 원), 그 돈으로 살 수 있는 상품의 양이 줄어듭니다.',
  },
  {
    question: '현재가치(Present Value)와 미래가치(Future Value)의 차이는?',
    answer:
      '미래가치는 "10년 후 인플레이션 고려 시 1,000만 원의 가치가 얼마나 떨어질까?"입니다. 현재가치는 "10년 후 1,000만 원을 받는 것이 오늘의 몇 원 가치일까?"입니다. 역함수 관계입니다. 예: 미래 1,000만 원의 현재가치 = 1,000만 원 ÷ (1.02)^10 ≈ 820만 원.',
  },
  {
    question: '실질 구매력(Purchasing Power)은 무엇인가요?',
    answer:
      '실질 구매력은 "실제로 물건을 몇 개 살 수 있을까?"를 의미합니다. 현재가치와 동일한 계산입니다. 예: 현재 1,000만 원으로 상품 100개를 살 수 있다면, 10년 후 인플레이션 후 1,000만 원으로는 약 80개만 살 수 있습니다(연 2% 인플레이션 기준). 이를 "구매력이 80%로 떨어졌다"고 합니다(한국은행 자료).',
  },
  {
    question: '한국은행의 기대 인플레이션은 몇 %인가요?',
    answer:
      '한국은행의 중기 물가 안정목표(2020-2024)는 연 2%입니다. 2026년 전망도 유사합니다. 하지만 실제 인플레이션은 물가지수(CPI), 시기, 상품에 따라 다릅니다. 최근 5년 평균(2019-2024)은 약 1.8~2.5% 범위입니다. 의료비·교육비는 평균보다 높고(3~5%), 전자기기·에너지는 변동성이 큽니다.',
  },
  {
    question: '은퇴 계획할 때 인플레이션을 어떻게 고려해야 하나요?',
    answer:
      '은퇴 후 필요한 자금을 계산할 때, 현재 기준 생활비에 인플레이션을 곱해서 은퇴 시점의 명목 생활비를 구합니다. 예: 현재 연 4,000만 원 지출, 은퇴까지 30년, 인플레이션 2.5%면 은퇴 시점의 필요액은 약 8,500만 원입니다. 이를 역으로 계산(현재가치)하면 오늘 기준 필요 자산액을 알 수 있습니다.',
  },
  {
    question: '과거 물가 상승률을 알 수 있나요?',
    answer:
      '한국은행 통계(ecos.bok.or.kr)에서 연도별, 월별 물가상승률을 조회할 수 있습니다. 예: 2024년 평균 약 2.4%, 2023년 약 3.6%. 10년, 20년, 50년 평균을 역산해 "실제 인플레이션"을 추정할 수 있습니다. 본 계산기는 향후 일정 인플레이션을 가정한 추정 도구이며, 과거 데이터는 한국은행 공식 자료를 참고하세요.',
  },
] as const;

const RELATED = [
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
    href: '/calculator/retirement',
    title: '은퇴자금',
    description: 'FIRE·4% 룰 계획',
  },
];

export default function InflationPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '화폐가치 계산기',
    description:
      '금액과 기간, 연간 인플레이션률을 입력해 미래 화폐가치, 현재가치, 실질 구매력을 즉시 계산합니다.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '화폐가치 계산기 2026',
    description: '금액, 기간, 인플레이션을 입력해 미래 화폐가치, 현재가치, 실질 구매력을 즉시 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('inflation'),
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance/' },
    { name: '화폐가치' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '화폐가치 계산하기',
    description:
      '금액, 기간, 인플레이션 방식을 선택해 화폐가치를 계산하는 방법',
    steps: [
      {
        name: '계산 방식 선택',
        text: '"미래가치" / "현재가치" / "실질 구매력" 중 선택합니다.',
      },
      {
        name: '금액 입력',
        text: '현재 또는 미래의 금액을 입력합니다.',
      },
      {
        name: '기간 입력',
        text: '계산 기간(년)을 입력합니다.',
      },
      {
        name: '인플레이션 입력',
        text: '연간 평균 인플레이션 비율(%)을 입력합니다. 기본값 2.0%.',
      },
      {
        name: '결과 확인',
        text: '미래 화폐가치, 현재가치, 실질 구매력, 누적 인플레이션이 즉시 계산됩니다.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
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
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              {/* H1 + 리드 */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '금융', href: '/category/finance/' },
                    { name: '화폐가치' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  화폐가치 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  금액, 기간, 연간 인플레이션을 입력하면 미래 화폐가치, 현재가치,
                  실질 구매력을 즉시 계산합니다. 인플레이션이 돈의 가치에 미치는 영향을
                  정확히 파악하기 위한 필수 도구입니다.
                </p>
                <AuthorByline dateModified="2026-04-24" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="화폐가치는 인플레이션(물가 상승)에 따라 시간에 따라 변합니다. 미래가치는 오늘의 1원이 미래에 얼마나 가치가 떨어지는지, 현재가치는 미래의 1원이 오늘 기준 얼마나 가치인지를 계산합니다. 실질 구매력은 '앞으로 몇 개 물건을 살 수 있을까'를 의미하며 현재가치와 동일합니다(한국은행 물가정보)."
                table={{
                  caption: '화폐가치 계산 핵심 공식',
                  headers: ['항목', '공식/설명'],
                  rows: [
                    [
                      '인플레이션 계수',
                      '(1 + 연 인플레이션율)^년수',
                    ],
                    [
                      '미래가치',
                      '현재금액 ÷ 인플레이션계수',
                    ],
                    [
                      '현재가치',
                      '미래금액 ÷ 인플레이션계수',
                    ],
                    [
                      '실질 구매력',
                      '현재가치와 동일 (미래 금액의 오늘 기준 가치)',
                    ],
                    [
                      '누적 인플레이션',
                      '(인플레이션계수 - 1) × 100%',
                    ],
                  ],
                }}
                tldr={[
                  '화폐가치 = 시간과 인플레이션에 따른 돈의 가치 변화',
                  '미래가치 감소: 오늘의 1,000만 원이 10년 후 약 820만 원 가치(연 2% 기준)',
                  '현재가치 = 미래 금액의 오늘 기준 가치',
                  '한국은행 물가 목표: 연 2%, 실제는 1.8~3.6% 범위',
                ]}
              />

              <AdSlot slot="inflation-top" format="horizontal" />

              {/* 계산기 */}
              <InflationCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 화폐가치와 인플레이션 */}
              <section aria-label="화폐가치란" className="card">
                <h2 className="mb-4 text-2xl font-semibold">화폐가치와 인플레이션</h2>
                <p className="mb-4 text-text-secondary">
                  화폐가치는 "돈이 사물을 사는 능력"을 의미합니다. 인플레이션(물가 상승)이
                  발생하면, 같은 액수의 돈으로 살 수 있는 물건이 줄어듭니다. 예를 들어,
                  현재 1,000만 원으로 자동차를 살 수 있지만, 10년 후 같은 자동차는
                  1,200만 원일 수 있습니다. 따라서 화폐의 구매력은 시간에 따라 감소합니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  화폐가치의 변화는 금융 계획에 중요합니다. 장기 저축(은퇴자금, 자녀 교육비),
                  대출 상환, 투자 수익률 평가 시에는 반드시 인플레이션을 고려해야 합니다.
                  예를 들어, 연 3% 수익률이라도 연 2% 인플레이션이 있으면 실질 수익률은
                  약 1%입니다. 이를 "실질 수익률(실수익률)"이라 합니다.
                </p>
                <p className="text-text-secondary">
                  한국은행은 중기 물가 안정 목표로 연 2%를 설정하고 있습니다. 이는 "건전한
                  경제 성장의 조건"으로 간주됩니다. 다만 실제 인플레이션은 시기에 따라
                  0~4% 사이에서 변동하며, 상품별로도 차이가 큽니다(한국은행 통계).
                </p>
              </section>

              {/* 미래가치 vs 현재가치 */}
              <section aria-label="미래가치 vs 현재가치" className="card">
                <h2 className="mb-4 text-2xl font-semibold">미래가치 vs 현재가치</h2>
                <p className="mb-4 text-text-secondary">
                  화폐의 시간 가치를 계산하는 두 가지 주요 개념입니다. 미래가치는 "오늘의
                  돈이 미래에 얼마나 가치가 떨어질까"를 계산하고, 현재가치는 "미래의 돈이
                  오늘 기준 얼마나 가치일까"를 계산합니다.
                </p>
                <div className="mb-4 rounded-lg border border-border-base p-4 bg-bg-raised">
                  <h3 className="mb-3 font-semibold text-text-primary">예시</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>시나리오: 오늘 1,000만 원, 10년, 연 2% 인플레이션</strong>
                    </div>
                    <div className="flex justify-between border-b border-border-subtle pb-2">
                      <span>미래가치</span>
                      <span className="font-mono font-semibold">
                        820만 원 (가치 하락)
                      </span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span>해석</span>
                      <span className="text-xs text-text-secondary">
                        오늘 1,000만 원은 10년 후 820만 원 수준의 구매력
                      </span>
                    </div>

                    <div className="mt-3 border-t border-border-subtle pt-3">
                      <strong>역산: 10년 후 1,000만 원을 원한다면?</strong>
                    </div>
                    <div className="flex justify-between border-b border-border-subtle pb-2">
                      <span>현재가치</span>
                      <span className="font-mono font-semibold">
                        820만 원 (필요 저축액)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>해석</span>
                      <span className="text-xs text-text-secondary">
                        10년 후 1,000만 원 가치 확보 위해 오늘 820만 원 필요
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary">
                  두 계산은 수학적으로 역함수 관계이며, 동일한 인플레이션 가정 하에 같은
                  결과를 냅니다. 미래가치는 "저축의 침식 계획", 현재가치는 "필요한 저축액
                  목표 설정"에 유용합니다.
                </p>
              </section>

              {/* 실질 구매력 */}
              <section aria-label="실질 구매력" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실질 구매력의 의미</h2>
                <p className="mb-4 text-text-secondary">
                  실질 구매력(Purchasing Power)은 "돈으로 실제 몇 개의 물건을 살 수 있을까"를
                  의미합니다. 현재가치와 동일한 개념이며, 금액이 아닌 "상품의 개수" 관점으로
                  생각하면 됩니다. 예를 들어 라면이 현재 3,000원이고 10년 후 3,600원이
                  되었다면, 현재 300만 원으로 라면 1,000개를 사지만 10년 후에는 833개만
                  살 수 있습니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  실질 구매력 감소는 장기 저축자들에게 매우 중요한 개념입니다. 은퇴 후 20~30년을
                  생활할 때, 초기 저축액이 충분해도 인플레이션으로 인해 생활비 부족이 발생할 수
                  있습니다. 따라서 은퇴 자금을 계산할 때는 반드시 인플레이션을 반영해야 하며,
                  연금이나 배당 같은 정기 수입원이 인플레이션을 따라가는지 확인해야 합니다.
                </p>
                <p className="text-text-secondary">
                  역으로, 빌려준 돈을 받을 때도 인플레이션을 고려해야 합니다. 10년 전에 1억 원을
                  빌려줬다면, 오늘 1억 원을 받는 것은 손해입니다. 최소한 인플레이션 이상의 이자를
                  받아야 실질 자산이 보존됩니다(기본금융이론).
                </p>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>인플레이션 계수 (Inflation Factor)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      인플레이션계수 = (1 + 연인플레이션율 / 100)^년수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      예: 연 2% 인플레이션, 10년 → (1.02)^10 ≈ 1.219
                    </p>
                  </li>
                  <li>
                    <strong>미래가치 (Future Value)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      FV = 현재금액 ÷ 인플레이션계수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      오늘의 돈이 미래에 얼마나 가치 떨어질지 계산합니다. 예: 1,000만 원 ÷ 1.219 ≈
                      820만 원.
                    </p>
                  </li>
                  <li>
                    <strong>현재가치 (Present Value)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      PV = 미래금액 ÷ 인플레이션계수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      미래의 돈이 오늘 기준 얼마나 가치인지 계산합니다. 예: 10년 후 1,000만 원 ÷ 1.219
                      ≈ 820만 원.
                    </p>
                  </li>
                  <li>
                    <strong>누적 인플레이션 (Cumulative Inflation)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      누적인플레이션(%) = (인플레이션계수 - 1) × 100
                    </p>
                    <p className="mt-2 text-text-secondary">
                      10년간 총 물가 상승률을 단일 백분율로 표시합니다. 예: (1.219 - 1) × 100 = 21.9%.
                    </p>
                  </li>
                  <li>
                    <strong>연간 등가 (Annual Equivalent)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      연간등가(%) = 누적인플레이션 / 년수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      평균 연간 인플레이션을 뜻합니다. 예: 21.9% ÷ 10 ≈ 2.19% (입력 2%와 근사).
                    </p>
                  </li>
                </ol>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항 및 한계</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기는 균일한 인플레이션을 가정합니다. 실제로는 상품별, 시기별
                    인플레이션이 크게 다릅니다. 의료비(3~5%)는 평균보다 높고, 전자기기는 디플레이션할
                    수 있습니다.
                  </li>
                  <li>
                    입력한 인플레이션률은 추정치입니다. 실제 인플레이션은 경제 상황에 따라
                    크게 변동합니다. 보수적 계획은 2~3% 사이를 권장합니다.
                  </li>
                  <li>
                    본 계산기는 기본 명목-실질 변환만 계산하며, 세금, 이자, 투자 수익은
                    포함하지 않습니다. 대출 상환, 투자 평가 시에는 별도 계산이 필요합니다.
                  </li>
                  <li>
                    해외 화폐(달러, 유로 등)의 화폐가치는 "환율 변동"도 함께 고려해야 하므로
                    본 계산기로는 부정확합니다.
                  </li>
                  <li>
                    본 계산기는 교육·참고용입니다. 개인의 금융 계획(은퇴, 대출, 투자)은 반드시
                    전문가 상담을 통해 개인 상황을 반영하세요.
                  </li>
                </ul>
              </section>

              {/* 활용 팁 */}
              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>은퇴 계획</strong>: 현재 생활비를 입력해 은퇴 시점의 필요 자금을
                    계산하세요. 현재가치 역산으로 "오늘 기준 필요 저축액"을 알 수 있습니다.
                  </li>
                  <li>
                    <strong>대출 상환 검토</strong>: 10년 장기 대출 시 원금 1억 원의 미래가치를
                    계산해 "실질 상환액"을 파악할 수 있습니다. (대출금은 고정이지만 인플레이션으로 인해
                    상대적 부담이 줄어듦)
                  </li>
                  <li>
                    <strong>역사적 인플레이션 비교</strong>: 한국은행 통계에서 과거 5년, 10년 평균
                    인플레이션을 조회해 입력하면 "실제 구매력 변화"를 추정할 수 있습니다.
                  </li>
                  <li>
                    <strong>시나리오 비교</strong>: 인플레이션을 1%, 2%, 3%로 각각 계산해 "최악,
                    중간, 낙관 시나리오"를 준비하세요.
                  </li>
                  <li>
                    <strong>투자 수익 평가</strong>: 연 4% 투자 수익은 인플레이션 2%를 제외하면 실질
                    수익 2%입니다. 이렇게 실질 수익률을 계산해 정확한 의사결정을 하세요.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 초판 공개 (미래가치·현재가치·실질 구매력 계산)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거 및 참고 자료</strong>: 한국은행(ecos.bok.or.kr) 물가 통계, 기본금융이론,
                  금융감독원 자료. 본 계산기는 교육·참고 목적이며 CPI 기반 공식 인플레이션만 반영합니다.
                </p>
                <p>
                  본 계산기의 결과는 교육용이며 법적 효력이 없습니다. 실제 금융 계획(은퇴, 대출,
                  투자)은 복합적인 요소를 고려해야 합니다. 반드시 금융전문가(재무설계사, 세무사) 상담을
                  통해 개인 맞춤형 계획을 수립하시기 바랍니다.
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
