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
import { RetirementCalculator } from './RetirementCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/retirement/';

export const metadata: Metadata = {
  title: '은퇴자금 계산기 2026 | FIRE 4% 룰·필요 자산 자동 계산',
  description:
    '월 200만 생활비면 은퇴 자산 얼마? FIRE 4% 룰 자동 + 월 저축 시뮬·인플레 반영 복리 계산. 조기 은퇴 가능 시점·국민연금 보강 시나리오. 2026 최신.',
  keywords: [
    '은퇴자금 계산기',
    'FIRE 계산기',
    '4% 룰',
    '조기 은퇴 자금',
    '노후자금',
    '국민연금 보강',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '은퇴자금 계산기 2026 — FIRE·4% 룰',
    description:
      '현재 자산·월 저축액·기대수익률로 은퇴 예상자산 및 필요자금을 계산.',
    url: URL,
    type: 'website',

  },
  twitter: {
    card: 'summary_large_image',
    title: '은퇴자금 계산기 2026',
    description: 'FIRE·조기은퇴 계획: 예상자산·필요자금·4% 룰 즉시 계산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '은퇴 목표 자산은 얼마나 필요한가요?',
    answer:
      '은퇴 자금의 필요액은 개인의 생활비와 은퇴 기간에 따라 다릅니다. 본 계산기는 연간 생활비 × 은퇴 기간 × 0.85(근사)로 추정합니다. 더 정확한 계산을 위해서는 현재 월 생활비, 은퇴 후 예상 생활비, 의료비, 특별 지출 등을 고려해야 합니다. 일반적으로 연간 지출의 25배~30배 자산을 목표로 합니다(4% 룰 기준).',
  },
  {
    question: '4% 룰이란 무엇인가요?',
    answer:
      '4% 룰은 1998년 Trinity Study 연구 결과에 기반합니다. 은퇴자산의 4%를 매년 인출하면 30년 이상 자금이 고갈되지 않는다는 가설입니다. 예를 들어 1억 원을 보유했다면 매년 400만 원을 생활비로 사용해도 안전하다는 의미입니다. 다만 이는 평균 수익률 6~7%를 가정한 것이며, 개인의 상황(투자 포트폴리오·세금·인플레이션)에 따라 조정이 필요합니다.',
  },
  {
    question: 'FIRE 운동이란 무엇인가요?',
    answer:
      'FIRE는 "Financial Independence, Retire Early"의 약자로, 재정 독립을 통해 조기 은퇴를 목표하는 라이프스타일입니다. 높은 저축률(월 소득의 50~70%)로 짧은 기간(10~20년)에 은퇴 자산을 모아 조기 은퇴하는 것이 목표입니다. 한국에서는 "FIRE족", "경제적 자유", "조기 은퇴"라는 용어로도 불립니다(금융감독원 금융상식).',
  },
  {
    question: '기대 수익률은 어떻게 설정해야 하나요?',
    answer:
      '기대 수익률은 투자 포트폴리오에 따라 다릅니다. 일반적 가이드: 주식 100% (적극) 5~8%, 주식 70% + 채권 30% (중도) 4~6%, 채권 80% 이상 (보수) 2~3%. 다만 과거 수익률이 미래를 보장하지 않으므로, 낮은 수익률로 보수적 계산을 권장합니다. 또한 수수료·세금 등을 감안해 1~2%를 더 낮춘 수익률을 사용하세요.',
  },
  {
    question: '은퇴 후 인플레이션은 어떻게 반영되나요?',
    answer:
      '본 계산기는 은퇴 시점 기준 연간 생활비 계산 시 인플레이션을 반영합니다. 예를 들어 현재 기준 연 4000만 원 지출이고 인플레이션이 2.5%라면, 30년 후 은퇴 시점의 명목 생활비는 약 8500만 원으로 상향됩니다. 이는 현금흐름 계획 시 중요한 요소입니다. 장기 인플레이션은 보통 2~3%로 가정합니다.',
  },
  {
    question: '세금과 의료비는 고려되나요?',
    answer:
      '본 계산기는 기본 은퇴자금 필요액만 계산하며, 세금(양도세·이자세)과 의료비·요양비는 별도로 고려해야 합니다. 실제 은퇴 계획 시에는 (1) 투자 수익에 부과되는 세금 (2) 은퇴 후 예상 의료비 (3) 상속·증여 계획 등을 종합적으로 검토하세요. 재무설계 전문가(CFP) 상담을 권장합니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/savings', title: '적금 이자', description: '월복리·세후 수령액' },
  { href: '/calculator/deposit', title: '예금 이자', description: '정기예금 세후 이자' },
  { href: '/calculator/salary', title: '연봉 실수령액', description: '세후 월급' },
  { href: '/calculator/severance', title: '퇴직금', description: '퇴직금 세후 수령액' },
];

export default function RetirementPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '은퇴자금 계산기',
    description:
      '현재 나이·자산·월 저축액·기대 수익률을 입력해 은퇴 시점 예상자산, 필요자금, 4% 룰 기반 안전 인출액을 즉시 계산합니다.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '은퇴자금 계산기 2026',
    description: '현재 나이, 자산, 월 저축액, 수익률을 입력해 은퇴 시점 예상자산과 필요자금을 즉시 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('retirement'),
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance/' },
    { name: '은퇴자금' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '은퇴자금 계산하기',
    description:
      '현재 나이, 은퇴 희망 나이, 현재 자산, 월 저축액, 기대 수익률을 입력해 은퇴 예상자산을 계산하는 방법',
    steps: [
      {
        name: '현재 나이 입력',
        text: '현재 본인의 나이를 입력합니다.',
      },
      {
        name: '은퇴 희망 나이 입력',
        text: '은퇴하고 싶은 목표 나이를 입력합니다.',
      },
      {
        name: '현재 자산 입력',
        text: '현재 보유한 총 자산(저축, 투자, 보험 등)을 입력합니다.',
      },
      {
        name: '월 저축액 입력',
        text: '매달 저축 또는 투자할 예정 금액을 입력합니다.',
      },
      {
        name: '기대 수익률 입력',
        text: '투자 포트폴리오의 기대 연간 수익률(%)을 입력합니다.',
      },
      {
        name: '은퇴 후 연 지출 입력',
        text: '은퇴 후 예상 연간 생활비를 현재 기준으로 입력합니다.',
      },
      {
        name: '결과 확인',
        text: '은퇴 시점 예상자산, 필요자금, 부족액, 4% 안전 인출액이 즉시 계산됩니다.',
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
                    { name: '은퇴자금' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  은퇴자금 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  현재 나이, 목표 은퇴 나이, 현재 자산, 월 저축액, 기대 수익률을 입력하면
                  은퇴 시점 예상자산, 필요자금, 4% 룰 기반 안전 인출액을 즉시 계산합니다.
                  FIRE(조기은퇴) 계획 및 경제적 자유 목표 달성을 위한 필수 도구입니다.
                </p>
                <AuthorByline dateModified="2026-04-24" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="은퇴자금 계산은 현재의 자산과 월 저축액이 목표 은퇴 시점까지 복리로 증가할 때 얼마나 모일 수 있는지, 그리고 은퇴 후 생활비를 충당하기에 충분한지를 판단하는 재무계획 과정입니다. 4% 룰(Trinity Study 1998)은 은퇴자산의 4%를 매년 인출해도 30년 이상 자금이 지속되는 안전한 인출 전략입니다(금융감독원 연금 가이드북 기준)."
                table={{
                  caption: '은퇴 자금 계산 핵심 공식',
                  headers: ['항목', '공식/설명'],
                  rows: [
                    ['은퇴까지 기간', '은퇴 나이 - 현재 나이 (년)'],
                    ['현재자산 복리', '현재자산 × (1 + 수익률)^년수'],
                    ['월저축 연금미래가', '월저축 × [((1+r)^월수 - 1) / r]'],
                    ['필요자산', '연지출 × 은퇴기간 × 0.85'],
                    ['부족액', '필요자산 - 예상자산'],
                    ['4% 안전인출액', '예상자산 × 4%'],
                  ],
                }}
                tldr={[
                  '은퇴 자금 계산의 목표: 은퇴 시점까지 충분한 자산을 모을 수 있는지 판단',
                  '4% 룰: 은퇴자산의 4%를 매년 사용해도 자금이 30년 이상 지속 가능',
                  '조정 요소: 인플레이션, 세금, 의료비, 기대 수익률 등을 종합 검토',
                  '보수적 계획 권장: 수익률은 낮게, 생활비는 높게 가정하여 계산',
                ]}
              />

              <AdSlot slot="retirement-top" format="horizontal" />

              {/* 계산기 */}
              <RetirementCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 은퇴자금 개념 */}
              <section aria-label="은퇴자금이란" className="card">
                <h2 className="mb-4 text-2xl font-semibold">은퇴자금이란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  은퇴자금은 일하지 않고도 생활할 수 있도록 미리 모아두는 자산을 말합니다.
                  은퇴 후 월급이 나오지 않으므로, 은퇴 이전에 충분한 자산을 확보하는 것이
                  필수입니다. 은퇴자금의 규모는 개인의 생활 수준, 은퇴 기간, 기대 수익률에 따라
                  크게 달라집니다(금융감독원 연금 가이드북).
                </p>
                <p className="mb-4 text-text-secondary">
                  은퇴자금을 계산하는 방법은 두 가지가 있습니다. 첫째, 필요액 기준: 은퇴 후 연간
                  생활비 × 은퇴 기간으로 필요한 총액을 추정합니다. 둘째, 수익률 기준: 현재
                  자산과 월 저축액이 은퇴까지 얼마나 증가할 수 있는지를 복리로 계산합니다. 두
                  수치를 비교해 부족한지, 충분한지를 판단합니다.
                </p>
                <p className="text-text-secondary">
                  특히 중요한 것은 시간의 가치입니다. 복리의 힘(compound interest)으로 인해, 은퇴까지
                  시간이 길수록 더 적은 월 저축액으로도 목표 자산에 도달할 수 있습니다. 따라서 조기에
                  계획을 세우고 실행하는 것이 성공의 핵심입니다.
                </p>
              </section>

              {/* FIRE와 경제적 자유 */}
              <section aria-label="FIRE 운동" className="card">
                <h2 className="mb-4 text-2xl font-semibold">FIRE와 경제적 자유</h2>
                <p className="mb-4 text-text-secondary">
                  FIRE(Financial Independence, Retire Early)는 높은 저축률을 통해 조기에
                  경제적 독립을 이루고 일에서 벗어나는 라이프스타일입니다. 한국에서는
                  "FIRE족", "경제적 자유", "조기은퇴"라는 용어로도 불리며, 20~40대 직장인
                  사이에서 인기를 얻고 있습니다(금융감독원 통계).
                </p>
                <p className="mb-4 text-text-secondary">
                  FIRE의 핵심 전략은 다음과 같습니다. 첫째, 높은 저축률 유지(월 소득의
                  50~70%): 일반적인 저축률이 월 10~20%인 반면, FIRE 실천자는 50% 이상을 저축합니다.
                  둘째, 낮은 생활비: 불필요한 소비를 줄이고 필수 생활비만 유지합니다. 셋째, 투자 수익:
                  저축한 자금을 적절히 투자해 평균 5~7% 수익률을 목표로 합니다.
                </p>
                <p className="text-text-secondary">
                  결과적으로 FIRE 실천자는 일반인보다 10~20년 빨리 은퇴 자금을 모을 수 있습니다. 예를 들어,
                  높은 저축률(60%)과 적정 수익률(6%)로 계산하면, 20~30대에 시작했을 때 40~50대에
                  경제적 자유를 달성할 수 있습니다. 본 계산기는 이러한 목표 달성 여부를 판단하는 도구입니다.
                </p>
              </section>

              {/* 4% 룰 상세 */}
              <section aria-label="4% 룰" className="card">
                <h2 className="mb-4 text-2xl font-semibold">4% 룰(Safe Withdrawal Rate)</h2>
                <p className="mb-4 text-text-secondary">
                  4% 룰은 1998년 Trinity Study 연구 결과에 기반합니다. 미국의 은퇴자 4천여 명의
                  데이터를 분석한 결과, 은퇴자산의 4%를 매년 인출하면 30년 이상 자금이 고갈되지 않는다는
                  것을 발견했습니다. 이는 평균 6~7% 수익률의 투자 포트폴리오(주식 60~70% + 채권 30~40%)를
                  가정한 것입니다(Trinity Study, 1998).
                </p>
                <div className="mb-4 rounded-lg border border-border-base p-4 bg-bg-raised">
                  <h3 className="mb-3 font-semibold text-text-primary">4% 룰 적용 예시</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>보유 자산</span>
                      <span className="font-mono font-semibold">1억 원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4% 인출액 (연간)</span>
                      <span className="font-mono font-semibold">400만 원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>월간 인출액</span>
                      <span className="font-mono font-semibold">약 33.3만 원</span>
                    </div>
                    <div className="border-t border-border-subtle pt-2 mt-2">
                      <p className="text-text-secondary">
                        → 연 400만 원을 생활비로 사용하고 나머지는 투자하면, 30년 이상
                        자금이 지속됩니다.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mb-4 text-text-secondary">
                  다만 4% 룰은 평균적 가정에 기반하므로, 다음 요소를 고려해야 합니다. 첫째, 개인 포트폴리오:
                  주식 비중이 높으면 변동성이 크고, 채권 비중이 높으면 수익률이 낮습니다. 둘째, 시장 상황:
                  은퇴 초기 시장 하락(sequence of returns risk)이 있으면 자금 고갈 위험이 증가합니다. 셋째,
                  생활 변화: 의료비·장기요양비 등 예상치 못한 지출이 발생할 수 있습니다.
                </p>
                <p className="text-text-secondary">
                  따라서 보수적 계산을 권장합니다. 인출률을 3~3.5%로 낮추거나, 필요 자산을 실제보다 높게
                  설정하여 여유를 확보하세요. 또한 정기적으로 포트폴리오를 점검하고, 큰 변화가 생기면
                  인출액을 조정하는 "동적 인출 전략"을 고려하세요.
                </p>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>은퇴까지 기간</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      yearsToRetirement = 은퇴 나이 - 현재 나이
                    </p>
                    <p className="mt-2 text-text-secondary">
                      은퇴까지 남은 연수입니다. 음수인 경우(이미 은퇴 나이 이상) 0으로 처리되고 경고가 발생합니다.
                    </p>
                  </li>
                  <li>
                    <strong>현재 자산의 미래가 (복리)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      FV = PV × (1 + r)^n<br />
                      r = 기대 수익률 (%) / 100<br />
                      n = 은퇴까지 년수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      현재 자산이 은퇴 시점까지 복리로 증가할 금액입니다. 예: 1억 원이 6% 수익률로 30년 증가하면
                      약 5.7억 원.
                    </p>
                  </li>
                  <li>
                    <strong>월 저축액의 미래가 (연금미래가)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      FV = PMT × [((1+r)^n - 1) / r]<br />
                      PMT = 월 저축액<br />
                      r = 월 이자율 (연이자율 / 12 / 100)<br />
                      n = 은퇴까지 개월수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      매달 정기적으로 저축한 금액의 미래가입니다. 예: 월 100만 원이 6% 수익률로 30년 저축되면
                      약 8,600만 원.
                    </p>
                  </li>
                  <li>
                    <strong>은퇴 시점 명목 생활비</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      명목지출 = 현재기준지출 × (1 + 인플레이션)^n<br />
                      n = 은퇴까지 년수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      현재 기준의 생활비가 인플레이션으로 인해 얼마나 증가할지 계산합니다. 예: 현재 4,000만 원 생활비가
                      2.5% 인플레이션으로 30년 후에는 약 8,500만 원.
                    </p>
                  </li>
                  <li>
                    <strong>필요 자산 (근사)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      필요자산 = 명목지출 × 은퇴기간 × 0.85<br />
                      0.85 = 현금흐름 안정 가정 (근사값)
                    </p>
                    <p className="mt-2 text-text-secondary">
                      은퇴 후 생활을 영위하기 위해 필요한 총 자산입니다. 본 계산기는 단순화한 공식을 사용하며,
                      더 정확한 계산(현금흐름 할인, 세금 고려)은 재무설계 상담이 필요합니다.
                    </p>
                  </li>
                  <li>
                    <strong>부족액 & 4% 안전 인출액</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      부족액 = 필요자산 - 예상자산<br />
                      4% 안전 인출액 = 예상자산 × 4% (Trinity Study 기준)
                    </p>
                    <p className="mt-2 text-text-secondary">
                      부족액이 양수면 추가 저축이 필요합니다. 4% 안전 인출액은 매년 지속 가능한 생활비 규모를 나타냅니다.
                    </p>
                  </li>
                </ol>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항 및 한계</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기는 기본 은퇴자금 필요액만 계산하며, 세금(양도세·이자세·배당세), 의료비, 요양비 등
                    특수 지출은 포함하지 않습니다. 실제 은퇴 계획 시에는 이들 요소를 추가로 고려해야 합니다.
                  </li>
                  <li>
                    기대 수익률은 과거 평균에 기반한 추정값이며, 미래 수익률을 보장하지 않습니다. 시장 변동성,
                    경제 상황 변화로 인해 실제 수익률은 크게 달라질 수 있습니다.
                  </li>
                  <li>
                    4% 룰은 30년 은퇴를 가정한 것입니다. 더 긴 은퇴 기간(40년 이상)이 예상되면 3.5% 이하의
                    보수적 인출률을 권장합니다.
                  </li>
                  <li>
                    인플레이션은 고정 비율로 가정했으나, 실제 물가 변화는 상품별로 다릅니다. 의료비·교육비 등
                    특정 항목은 평균 인플레이션보다 높을 수 있습니다.
                  </li>
                  <li>
                    본 계산기는 교육·참고용 도구입니다. 개인의 최종 은퇴 계획은 반드시 인증된 재무설계사(CFP)와
                    상담하여 세부 상황을 반영하세요.
                  </li>
                </ul>
              </section>

              {/* 활용 팁 */}
              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>시나리오 비교</strong>: 은퇴 나이를 55세, 60세, 65세로 각각 계산하여 각 시나리오의
                    실행 가능성을 비교하세요.
                  </li>
                  <li>
                    <strong>월 저축액 조정</strong>: 현재 계획의 부족액이 있다면, "권장 월 저축액"을 참고해 저축액을
                    늘릴 수 있는지 검토하세요.
                  </li>
                  <li>
                    <strong>수익률 감수성 분석</strong>: 기대 수익률을 4%, 6%, 8%로 변경해가며 수익률 변화에 따른
                    영향을 파악하세요.
                  </li>
                  <li>
                    <strong>정기적 리뷰</strong>: 매년 또는 분기마다 계산을 다시 실행해 실적(실제 저축액·실제 수익률)을
                    반영하고 계획을 조정하세요.
                  </li>
                  <li>
                    <strong>보수적 계획</strong>: 생활비는 높게, 수익률은 낮게 가정하여 "안전 마진"을 확보하는 것이
                    현명합니다.
                  </li>
                  <li>
                    <strong>다중 소득원 고려</strong>: 은퇴 후 연금(국민연금·퇴직연금), 임대료, 배당금 등 정기 수입을
                    따로 계획하면 인출액을 낮출 수 있습니다.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 초판 공개 (FIRE·4% 룰·인플레이션 반영)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거 및 참고 자료</strong>: <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국민연금공단</a> 연금 정보, <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">고용노동부</a> 퇴직연금 가이드, Trinity Study (1998).
                </p>
                <p>
                  본 계산기의 결과는 교육·참고용이며 법적 효력이 없습니다. 실제 은퇴 계획은 개인의 소득·자산·지출·세금·의료비
                  등 다양한 요소를 종합 검토해야 합니다. 반드시 인증된 재무설계사(CFP·RFC) 상담을 통해 개인 맞춤형 계획을
                  수립하시기 바랍니다.
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
