import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
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
const TITLE = '물가상승률 계산기 2026 | 미래 필요 금액·구매력';
const DESCRIPTION =
  '금액·기간·연 물가상승률로 미래에 필요한 금액과 돈의 구매력 변화를 계산합니다. 실제 CPI는 자동 조회하지 않습니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    '화폐가치 계산기',
    '인플레이션 계산기',
    '물가상승률 계산',
    '실질 구매력 계산',
    '현재가치 계산기',
    '미래가치 계산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQ_ITEMS = [
  {
    question: '미래 필요 금액은 무엇인가요?',
    answer:
      '지금 사는 같은 물건을 미래에 사는 데 필요한 명목 금액입니다. 현재 비용에 물가계수를 곱합니다. 예를 들어 1,000만 원인 물건에 연 2% 물가 상승을 10년 적용하면 약 1,219만 원이 필요합니다. 보유한 돈 자체가 이만큼 늘어난다는 뜻은 아닙니다.',
  },
  {
    question: '미래 필요 금액과 현재 구매력은 어떻게 다른가요?',
    answer:
      '미래 필요 금액은 현재 비용에 물가계수를 곱하고, 미래 금액의 현재 구매력은 미래 금액을 물가계수로 나눕니다. 연 2%·10년이면 현재 1,000만 원인 물건의 미래 비용은 약 1,219만 원이고, 미래에 받을 1,000만 원의 오늘 기준 구매력은 약 820만 원입니다.',
  },
  {
    question: '실질 구매력(Purchasing Power)은 무엇인가요?',
    answer:
      '같은 잔액으로 살 수 있는 물건의 양을 뜻합니다. 현재 금액을 물가계수로 나눠 미래 구매력을 오늘의 금액으로 표시합니다. 연 2%·10년이면 잔액 1,000만 원의 구매력은 약 820만 원이며, 지금 100개 살 수 있는 물건은 약 82개 살 수 있습니다. 이자 없이 보유한 잔액 자체는 변하지 않습니다.',
  },
  {
    question: '한국은행의 물가안정목표 2%를 전망으로 써도 되나요?',
    answer:
      '한국은행은 2019년 이후 소비자물가 상승률 기준 물가안정목표를 2%로 설정하고 있습니다. 이는 정책 목표이며 특정 연도의 전망이나 개인 생활비 상승률을 뜻하지 않습니다. 계산기에 2%를 넣으면 매년 같은 비율로 오른다는 가정의 결과이며, 실제 물가와 차이가 날 수 있습니다.',
  },
  {
    question: '은퇴 계획할 때 인플레이션을 어떻게 고려해야 하나요?',
    answer:
      '현재 생활비에 물가계수를 곱해 은퇴 시점의 명목 생활비를 구합니다. 현재 연 4,000만 원 지출, 30년, 연 2.5% 가정이면 약 8,390만 원입니다. 미래 금액을 물가계수로 나눈 값은 오늘 기준 구매력이지 오늘 저축해야 할 금액이 아닙니다. 필요 저축액에는 투자 수익·인출 기간 등을 별도로 반영해야 합니다.',
  },
  {
    question: '과거 물가 상승률을 알 수 있나요?',
    answer:
      '2024년 연간 소비자물가지수는 전년보다 2.3% 상승했습니다(2024년 12월 31일 발표). 다른 연도와 월별 수치는 KOSIS 또는 한국은행 ECOS에서 기간과 지표를 확인하세요. 과거 상승률은 미래 예측이 아니며, 이 계산기는 실제 지수를 자동 조회하지 않고 입력한 연간 상승률이 일정하다고 가정합니다.',
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
    name: '물가상승률 계산기 2026',
    description: DESCRIPTION,
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '물가상승률 계산기 2026',
    description: DESCRIPTION,
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-10-01',
    isPartOf: getCategoryUrlForCalculator('inflation'),
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance/' },
    { name: '화폐가치' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '물가상승률로 미래 필요 금액·구매력 계산하기',
    description: DESCRIPTION,
    steps: [
      {
        name: '계산 방식 선택',
        text: '"미래 필요 금액" / "현재 구매력" / "보유 금액의 구매력" 중 선택합니다.',
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
        text: '선택한 방식의 금액과 누적 물가 상승을 확인합니다. 미래 필요 금액과 구매력은 서로 다른 의미입니다.',
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
          <main
            id="main-content"
            className="calculator-page min-w-0 flex-1 px-4 py-5 md:px-8 md:py-8"
          >
            <CalculatorPageContent
              intro={
                <header>
                  <Breadcrumb
                    items={[
                      { name: '홈', href: '/' },
                      { name: '금융', href: '/category/finance/' },
                      { name: '화폐가치' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">물가상승률 계산기 2026</h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    금액·기간·예상 연간 물가상승률을 입력해 같은 물건의 미래 필요 금액과 돈의
                    구매력 변화를 구분해 확인하세요.
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    입력한 상승률이 매년 일정하다고 가정합니다. 실제 소비자물가지수(CPI)는 자동
                    조회하지 않으며, 이자·투자 수익·세금은 제외합니다.
                  </p>
                  <AuthorByline dateModified="2026-10-01" />
                </header>
              }
              calculator={<InflationCalculator />}
              related={
                <>
                  <RelatedCalculators items={RELATED} />
                </>
              }
              faq={
                <>
                  <FaqSection items={[...FAQ_ITEMS]} />
                </>
              }
            >
              <StructuredSummary
                definition="물가가 오르면 같은 물건을 사는 데 필요한 명목 금액은 늘고, 같은 잔액의 구매력은 줄어듭니다. 미래 필요 금액은 현재 비용에 물가계수를 곱합니다. 구매력은 금액을 물가계수로 나누어 오늘의 금액으로 환산합니다. 입력한 상승률을 매년 일정하게 가정하며 실제 CPI를 자동 조회하지 않습니다."
                table={{
                  caption: '화폐가치 계산 핵심 공식',
                  headers: ['항목', '공식/설명'],
                  rows: [
                    ['인플레이션 계수', '(1 + 연 인플레이션율)^년수'],
                    ['미래 필요 금액', '현재 비용 × 인플레이션계수'],
                    ['미래 금액의 현재 구매력', '미래금액 ÷ 인플레이션계수'],
                    [
                      '보유 금액의 미래 구매력',
                      '현재 보유 금액 ÷ 인플레이션계수 (오늘의 금액으로 환산)',
                    ],
                    ['누적 인플레이션', '(인플레이션계수 - 1) × 100%'],
                  ],
                }}
                tldr={[
                  '화폐가치 = 시간과 인플레이션에 따른 돈의 가치 변화',
                  '미래 필요 금액: 현재 1,000만 원인 물건은 10년 후 약 1,219만 원(연 2% 가정)',
                  '구매력: 1,000만 원 잔액을 유지하면 10년 후 오늘 기준 약 820만 원(연 2% 가정)',
                  '이자·투자 수익·세금 제외, 결과 금액의 원 미만 버림',
                ]}
              />
              <section aria-label="물가상승률" className="card">
                <h2 className="mb-4 text-2xl font-semibold">공식 물가 통계와 계산 가정은 구분하세요</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  통계청이 2024년 12월 31일 발표한{' '}
                  <a
                    className="underline"
                    href="https://www.kostat.go.kr/board.es?act=view&amp;bid=213&amp;list_no=434615&amp;mid=a10301040200"
                  >
                    2024년 연간 소비자물가동향
                  </a>
                  에 따르면 소비자물가지수는 전년보다 2.3% 상승했습니다. 이는 2024년의 연간
                  통계이며 현재 상승률이나 앞으로의 전망을 뜻하지 않습니다.
                </p>
                <p className="mt-3 text-sm text-text-secondary">
                  다른 연도나 월별 수치는{' '}
                  <a className="underline" href="https://kosis.kr/">KOSIS</a>
                  {' '}또는{' '}
                  <a className="underline" href="https://ecos.bok.or.kr/">한국은행 ECOS</a>
                  에서 기간과 지표를 확인하세요. 과거 값을 입력해도 미래 물가가 그 비율로 계속
                  오른다는 보장은 없습니다. 본 계산기는 입력한 비율을 매년 일정하게 적용합니다.
                </p>
              </section>
              <section aria-label="화폐가치란" className="card">
                <h2 className="mb-4 text-2xl font-semibold">화폐가치와 인플레이션</h2>
                <p className="mb-4 text-text-secondary">
                  화폐가치는 "돈이 사물을 사는 능력"을 의미합니다. 인플레이션(물가 상승)이 발생하면,
                  같은 액수의 돈으로 살 수 있는 물건이 줄어듭니다. 예를 들어, 현재 1,000만 원으로
                  자동차를 살 수 있지만, 10년 후 같은 자동차는 1,200만 원일 수 있습니다. 따라서
                  화폐의 구매력은 시간에 따라 감소합니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  화폐가치의 변화는 금융 계획에 중요합니다. 장기 저축(은퇴자금, 자녀 교육비), 대출
                  상환, 투자 수익률 평가 시에는 반드시 인플레이션을 고려해야 합니다. 예를 들어, 연
                  3% 수익률이라도 연 2% 인플레이션이 있으면 실질 수익률은 약 1%입니다. 이를 "실질
                  수익률(실수익률)"이라 합니다.
                </p>
                <p className="text-text-secondary">
                  <a
                    className="underline"
                    href="https://www.bok.or.kr/portal/main/contents.do?menuNo=200291"
                  >
                    한국은행의 물가안정목표
                  </a>
                  는 2019년 이후 소비자물가 상승률 기준 2%입니다. 정책 목표와 실제 물가, 미래
                  전망은 서로 다르며, 개인이 구매하는 품목에 따라 체감 상승률도 달라질 수 있습니다.
                </p>
              </section>
              <section aria-label="미래 필요 금액과 구매력" className="card">
                <h2 className="mb-4 text-2xl font-semibold">미래 필요 금액과 구매력</h2>
                <p className="mb-4 text-text-secondary">
                  같은 물건의 미래 비용과 같은 잔액의 구매력은 구분해야 합니다. 물가가 오르면 미래
                  비용은 증가하지만, 같은 잔액으로 살 수 있는 양은 감소합니다.
                </p>
                <div className="mb-4 rounded-lg border border-border-base bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">예시</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>시나리오: 오늘 1,000만 원, 10년, 연 2% 인플레이션</strong>
                    </div>
                    <div className="flex justify-between border-b border-border-subtle pb-2">
                      <span>같은 물건의 미래 필요 금액</span>
                      <span className="font-mono font-semibold">약 1,219만 원</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span>해석</span>
                      <span className="text-xs text-text-secondary">
                        현재 1,000만 원인 물건을 사려면 10년 후 약 219만 원 더 필요
                      </span>
                    </div>

                    <div className="mt-3 border-t border-border-subtle pt-3">
                      <strong>보유 잔액을 1,000만 원으로 유지한다면?</strong>
                    </div>
                    <div className="flex justify-between border-b border-border-subtle pb-2">
                      <span>10년 후 구매력 (오늘의 금액)</span>
                      <span className="font-mono font-semibold">약 820만 원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>해석</span>
                      <span className="text-xs text-text-secondary">
                        잔액은 그대로지만 구매력은 오늘 기준 약 820만 원으로 감소
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary">
                  미래 필요 금액의 곱셈과 구매력 환산의 나눗셈은 반대 방향의 계산입니다. 같은 입력
                  금액에 적용하면 결과가 다릅니다. 현재가치 모드는 미래에 받을 금액의 오늘 기준
                  구매력을 표시하며, 필요한 저축 원금은 계산하지 않습니다.
                </p>
              </section>
              <section aria-label="실질 구매력" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실질 구매력의 의미</h2>
                <p className="mb-4 text-text-secondary">
                  실질 구매력(Purchasing Power)은 "돈으로 실제 몇 개의 물건을 살 수 있을까"를
                  의미합니다. 현재가치와 동일한 개념이며, 금액이 아닌 "상품의 개수" 관점으로
                  생각하면 됩니다. 예를 들어 라면이 현재 3,000원이고 10년 후 3,600원이 되었다면,
                  현재 300만 원으로 라면 1,000개를 사지만 10년 후에는 833개만 살 수 있습니다.
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
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>인플레이션 계수 (Inflation Factor)</strong>
                    <p className="mt-1 rounded bg-bg-raised p-3 font-mono text-xs text-text-secondary">
                      인플레이션계수 = (1 + 연인플레이션율 / 100)^년수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      예: 연 2% 인플레이션, 10년 → (1.02)^10 ≈ 1.219
                    </p>
                  </li>
                  <li>
                    <strong>같은 물건의 미래 필요 금액</strong>
                    <p className="mt-1 rounded bg-bg-raised p-3 font-mono text-xs text-text-secondary">
                      미래 필요 금액 = 현재 비용 × 인플레이션계수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      같은 물건을 사는 데 필요한 미래 비용입니다. 예: 1,000만 원 × 1.219 ≈ 1,219만
                      원. 보유한 돈의 구매력이나 투자 수익이 아닙니다.
                    </p>
                  </li>
                  <li>
                    <strong>현재가치·보유 금액의 구매력</strong>
                    <p className="mt-1 rounded bg-bg-raised p-3 font-mono text-xs text-text-secondary">
                      현재 구매력 = 미래금액 ÷ 인플레이션계수 / 보유 금액의 미래 구매력 = 현재금액 ÷
                      인플레이션계수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      미래의 돈이 오늘 기준 얼마나 가치인지 계산합니다. 예: 10년 후 1,000만 원 ÷
                      1.219 ≈ 820만 원.
                    </p>
                  </li>
                  <li>
                    <strong>누적 인플레이션 (Cumulative Inflation)</strong>
                    <p className="mt-1 rounded bg-bg-raised p-3 font-mono text-xs text-text-secondary">
                      누적인플레이션(%) = (인플레이션계수 - 1) × 100
                    </p>
                    <p className="mt-2 text-text-secondary">
                      10년간 총 물가 상승률을 단일 백분율로 표시합니다. 예: (1.219 - 1) × 100 =
                      21.9%.
                    </p>
                  </li>
                  <li>
                    <strong>연평균 금액 변화</strong>
                    <p className="mt-1 rounded bg-bg-raised p-3 font-mono text-xs text-text-secondary">
                      연평균 금액 변화(원/년) = |결과 금액 − 입력 금액| ÷ 년수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      금액 변화의 절댓값을 기간으로 나눈 값이며 원 미만을 버립니다. 연간
                      물가상승률이 아닙니다. 기간이 0년이면 0원/년입니다.
                    </p>
                  </li>
                </ol>
              </section>
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항 및 한계</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기는 균일한 인플레이션을 가정합니다. 실제로는 상품별, 시기별 인플레이션이
                    크게 다릅니다. 개인의 소비 품목과 전체 소비자물가지수의 구성이 다르면
                    생활비 변화도 계산 결과와 다를 수 있습니다.
                  </li>
                  <li>
                    입력한 인플레이션률은 추정치입니다. 실제 인플레이션은 경제 상황에 따라 크게
                    변동합니다. 하나의 비율을 정답이나 안전한 기준으로 해석하지 말고, 자신이
                    정한 여러 가정에서 결과가 얼마나 달라지는지 비교하세요.
                  </li>
                  <li>
                    본 계산기는 기본 명목-실질 변환만 계산하며, 세금, 이자, 투자 수익은 포함하지
                    않습니다. 대출 상환, 투자 평가 시에는 별도 계산이 필요합니다.
                  </li>
                  <li>
                    해외 화폐(달러, 유로 등)의 화폐가치는 "환율 변동"도 함께 고려해야 하므로 본
                    계산기로는 부정확합니다.
                  </li>
                  <li>
                    본 계산기는 교육·참고용입니다. 개인의 금융 계획(은퇴, 대출, 투자)은 반드시
                    전문가 상담을 통해 개인 상황을 반영하세요.
                  </li>
                </ul>
              </section>
              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>은퇴 계획</strong>: 현재 생활비를 입력해 은퇴 시점의 필요 자금을
                    계산하세요. 필요한 저축액은 투자 수익·은퇴 후 지출 기간 등을 별도로 반영해야
                    합니다.
                  </li>
                  <li>
                    <strong>대출 상환 검토</strong>: 10년 장기 대출 시 미래 상환 금액의 현재
                    구매력을 계산해 "실질 상환액"을 파악할 수 있습니다. (대출금은 고정이지만
                    인플레이션으로 인해 상대적 부담이 줄어듦)
                  </li>
                  <li>
                    <strong>역사적 인플레이션 비교</strong>: 한국은행 통계에서 과거 5년, 10년 평균
                    인플레이션을 조회해 입력하면 "실제 구매력 변화"를 추정할 수 있습니다.
                  </li>
                  <li>
                    <strong>시나리오 비교</strong>: 예를 들어 1%, 2%, 3%를 사용자가 정한 가정으로
                    각각 계산해 결과를 비교할 수 있습니다. 이 비율은 전망이나 최악·최선의 범위를
                    뜻하지 않습니다.
                  </li>
                  <li>
                    <strong>투자 수익과 구분</strong>: 연 수익률 4%·물가상승률 2%를 가정하면 단순
                    차감 근사는 약 2%이고, 정확한 실질 수익률은 (1.04 ÷ 1.02 − 1) × 100으로
                    약 1.96%입니다. 세금·수수료는 제외한 예시이며 본 계산기는 투자 수익률을
                    계산하지 않습니다.
                  </li>
                </ul>
              </section>
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>
                    2026-10-01: 미래 필요 금액·구매력 의미와 공식 일치, 추가 필요 금액·연평균 금액
                    변화 표시 교정
                  </li>
                  <li>2026-04-24: 초판 공개 (미래가치·현재가치·실질 구매력 계산)</li>
                </ul>
              </section>
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 자료</strong>: 한국은행(ecos.bok.or.kr) 물가 통계 및{' '}
                  <a
                    className="underline"
                    href="https://www.bankofengland.co.uk/monetary-policy/inflation/inflation-calculator"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    영란은행의 물가·구매력 계산 설명
                  </a>
                  . 본 계산기는 입력한 상승률을 일정하게 가정하는 교육·참고 도구이며 실제 CPI를 자동
                  조회하지 않습니다.
                </p>
                <p>
                  본 계산기의 결과는 교육용이며 법적 효력이 없습니다. 실제 금융 계획(은퇴, 대출,
                  투자)은 복합적인 요소를 고려해야 합니다. 반드시 금융전문가(재무설계사, 세무사)
                  상담을 통해 개인 맞춤형 계획을 수립하시기 바랍니다.
                </p>
              </section>
            </CalculatorPageContent>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
