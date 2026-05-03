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
} from '@/lib/seo/jsonld';
import { RentalYieldCalculator } from './RentalYieldCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/rental-yield';

export const metadata: Metadata = {
  title: '임대수익률 계산기 2026 | 공실률·Cap Rate | calculatorhost',
  description:
    '2026년 임대수익률 계산기. 구매가·받은 보증금·월세·월 관리비·공실률을 입력하면 연 수익률, Cap Rate, 실투자금을 즉시 계산. 임대차 투자 수익성 분석 필수.',
  alternates: { canonical: URL },
  openGraph: {
    title: '임대수익률 계산기 2026 — 공실률·Cap Rate',
    description: '구매가·보증금·월세·관리비로 연 수익률과 Cap Rate를 계산.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '임대수익률 계산기 2026',
    description: '임대차 투자 수익성 분석: 연 수익률·Cap Rate·월 순수입 즉시 계산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '임대수익률과 Cap Rate의 차이는 무엇인가요?',
    answer:
      '임대수익률(ROI)은 실제 투자금(구매가 - 받은 보증금)을 기준으로 계산한 순수익 비율입니다. Cap Rate(자본수익률)는 구매가 전체를 기준으로 계산합니다. 예: 3억 구매, 1억 보증금, 월 100만 원 순수입이면 ROI는 (1,200만 / 2억) × 100 = 6%, Cap Rate는 (1,200만 / 3억) × 100 = 4%입니다. ROI가 실제 투자자의 수익성을 더 잘 반영합니다.',
  },
  {
    question: '공실률을 어떻게 설정해야 하나요?',
    answer:
      '공실률은 월세가 들어오지 않는 기간의 비율입니다. 0% = 항상 임차인 있음, 5% = 연간 약 18일 공실, 10% = 연간 약 36일 공실입니다. 일반적으로 주거지는 3~5%, 상업지는 5~15%를 기준으로 합니다. 지역 수요, 물건 상태, 관리 품질에 따라 조정하세요. 보수적 계획은 5~10% 사이를 권장합니다.',
  },
  {
    question: '실투자금이 음수가 나올 수 있나요?',
    answer:
      '받은 보증금이 구매가 + 취득부대비를 초과하는 경우 실투자금이 음수(역마진)가 될 수 있습니다. 이는 처음부터 현금이 들어오는 구조로, 수익률이 매우 높게 나타납니다. 하지만 이는 보증금 반환 의무(임차 종료 시 전액 반환)를 감안해야 합니다. 따라서 실투자금 음수 물건은 장기 보유 시 위험도가 높으므로 주의가 필요합니다.',
  },
  {
    question: '월 관리비는 어디까지 포함해야 하나요?',
    answer:
      '월 관리비는 건물 유지·보수·세금·보험료·공실 손실 등을 포함합니다. 아파트/오피스텔: 관리사무소 공시 금액, 주택: 재산세·보험료·수리비 등 직접 추정, 주택임차: 이자·감가상각·공실 손실까지 포함. 처음 계산할 때는 월 수입의 20~30%를 목안으로 설정한 후 실제 자료로 조정하세요.',
  },
  {
    question: '레버리지(대출)는 어떻게 반영하나요?',
    answer:
      '본 계산기는 기본 수익률만 계산하며 대출금리는 포함하지 않습니다. 대출이 있으면: (1) 실투자금을 대출 제외 자기자본으로 수정, (2) 월 관리비에 월 이자(원금 제외) 추가하세요. 예: 3억 구매, 2억 대출, 1% 금리면 월 이자 약 167만 원. 자신의 현금 ROI를 정확히 계산할 수 있습니다.',
  },
  {
    question: '세금과 수익은 어떤 관계가 있나요?',
    answer:
      '월 순수입은 세전 금액입니다. 실제 수취액은 종합소득세(임대료 수입) 납부 후입니다. 연 수익이 2,000만 원 이상이면 종합소득세 대상입니다. 임대료 수입 10%를 근사 세금으로 보면 세후 수익률은 약 0.9배입니다. 정확한 세금은 국세청에 신고할 때 결정되므로, 본 계산은 참고용입니다.',
  },
] as const;

const RELATED = [
  {
    href: '/calculator/loan-limit',
    title: '대출한도(DSR)',
    description: 'DSR·LTV 기반 최대 대출액',
  },
  {
    href: '/calculator/broker-fee',
    title: '중개수수료',
    description: '구매/판매 중개수수료 계산',
  },
  {
    href: '/calculator/rent-conversion',
    title: '전월세 전환율',
    description: '보증금과 월세 환산',
  },
];

export default function RentalYieldPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '임대수익률 계산기',
    description:
      '구매가, 받은 보증금, 취득부대비, 월세, 월 관리비, 공실률을 입력해 연 수익률, Cap Rate, 실투자금을 즉시 계산합니다.',
    url: URL,
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '부동산', url: 'https://calculatorhost.com/category/real-estate' },
    { name: '임대수익률' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '임대수익률 계산하기',
    description:
      '구매가, 받은 보증금, 취득부대비, 월세, 월 관리비, 공실률을 입력해 임대 수익률을 계산하는 방법',
    steps: [
      {
        name: '구매가 입력',
        text: '물건을 구매한 실제 가격을 입력합니다.',
      },
      {
        name: '받은 보증금 입력',
        text: '임차인으로부터 받은 보증금 총액을 입력합니다.',
      },
      {
        name: '취득부대비 입력',
        text: '세금, 수수료, 리모델링 등 구매 시 소요된 부대비용을 입력합니다.',
      },
      {
        name: '월세 입력',
        text: '매달 받는 월세(월 임차료)를 입력합니다.',
      },
      {
        name: '월 관리비 입력',
        text: '아파트 관리비, 재산세, 보험료 등 월간 유지비를 입력합니다.',
      },
      {
        name: '공실률 입력',
        text: '연간 평균 공실률(%)을 입력합니다. 0~100 사이.',
      },
      {
        name: '결과 확인',
        text: '연 수익률, Cap Rate, 월 순수입, 실투자금이 즉시 계산됩니다.',
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
                    { name: '부동산', href: '/category/real-estate/' },
                    { name: '임대수익률' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  임대수익률 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  구매가, 받은 보증금, 취득부대비, 월세, 월 관리비, 공실률을 입력하면
                  연 수익률(ROI)과 Cap Rate, 월 순수입을 즉시 계산합니다. 임대차 투자의
                  수익성을 정확히 판단하기 위한 필수 분석 도구입니다.
                </p>
                <AuthorByline dateModified="2026-04-24" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="임대수익률은 임대차 투자에서 투자한 자본(구매가 - 보증금 + 부대비)을 기준으로 매년 얻는 순이익의 비율(ROI)을 나타냅니다. Cap Rate는 구매가 전체를 기준으로 한 수익률입니다. 공실률, 관리비, 보증금 변동을 고려하여 정확한 수익성을 평가할 수 있습니다."
                table={{
                  caption: '임대 수익률 계산 핵심 공식',
                  headers: ['항목', '공식/설명'],
                  rows: [
                    ['연 총 임차료', '월세 × 12'],
                    ['공실 손실', '연 총 임차료 × 공실률'],
                    ['연 실질 임차료', '연 총 임차료 × (1 - 공실률)'],
                    ['연 순수입', '연 실질 임차료 - (월 관리비 × 12)'],
                    ['실투자금', '구매가 - 받은 보증금 + 취득부대비'],
                    ['연 수익률(ROI)', '(연 순수입 / 실투자금) × 100%'],
                    ['Cap Rate', '(연 순수입 / 구매가) × 100%'],
                  ],
                }}
                tldr={[
                  '임대수익률 = 실제 투자금 대비 순이익 비율',
                  'Cap Rate = 구매가 기준 수익률 (더 보수적)',
                  '공실률은 지역·물건·수요에 따라 3~10% 범위',
                  '실투자금이 음수면 초기 현금유입 구조지만 보증금 반환 의무 주의',
                ]}
              />

              <AdSlot slot="rental-yield-top" format="horizontal" />

              {/* 계산기 */}
              <RentalYieldCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 임대수익률 개념 */}
              <section aria-label="임대수익률이란" className="card">
                <h2 className="mb-4 text-2xl font-semibold">임대수익률이란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  임대수익률(Rental Yield)은 임대차 투자에서 얼마나 효율적으로 수익을 내고
                  있는지를 보여주는 지표입니다. 투자한 자본 대비 매년 얻는 순이익의 비율을
                  나타냅니다. 예를 들어 3억 원을 투자해서 연 1,200만 원의 순수입을 얻으면
                  수익률은 4%입니다. 부동산 투자자가 물건의 투자 가치를 판단하는 핵심 지표입니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  임대수익률을 높이려면 (1) 더 저렴한 가격으로 구매하거나 (2) 월세를
                  올리거나 (3) 관리비를 줄여야 합니다. 또한 보증금을 크게 받으면 실투자금이
                  줄어들어 수익률이 올라갑니다. 하지만 보증금은 임차 종료 시 반환해야 하므로,
                  이자 부담과 함께 장기 재무 계획에 반영해야 합니다(한국 부동산 학회 자료).
                </p>
                <p className="text-text-secondary">
                  건전한 임대차 투자는 높은 수익률을 추구하되, 공실 위험, 세금(임대소득세),
                  시장 변동을 동시에 고려해야 합니다. 일반적으로 주거지 임대 수익률은
                  3~6%, 상업지는 5~10% 범위가 기준입니다. 목표 수익률이 시장 평균보다
                  훨씬 높으면 숨은 위험이 있을 가능성이 높으므로 주의해야 합니다.
                </p>
              </section>

              {/* Cap Rate와 ROI */}
              <section aria-label="Cap Rate" className="card">
                <h2 className="mb-4 text-2xl font-semibold">Cap Rate와 ROI의 차이</h2>
                <p className="mb-4 text-text-secondary">
                  Cap Rate(자본 수익률, Capitalization Rate)는 구매가 전체를 기준으로 한
                  수익률입니다. ROI(자본 이익률)는 실제 투자한 자본(자기자본)을 기준으로
                  합니다. 보증금이 클수록 두 지표의 차이가 커집니다.
                </p>
                <div className="mb-4 rounded-lg border border-border-base p-4 bg-bg-raised">
                  <h3 className="mb-3 font-semibold text-text-primary">예시 비교</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>구매가</span>
                      <span className="font-mono font-semibold">3억 원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>받은 보증금</span>
                      <span className="font-mono font-semibold">1억 원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>연 순수입</span>
                      <span className="font-mono font-semibold">1,200만 원</span>
                    </div>
                    <div className="border-t border-border-subtle pt-2 mt-2">
                      <div className="flex justify-between">
                        <span>Cap Rate</span>
                        <span className="font-mono font-semibold">4% (1,200만/3억)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI</span>
                        <span className="font-mono font-semibold">6% (1,200만/2억)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary">
                  Cap Rate는 상품을 비교할 때 객관적 기준이며, ROI는 투자자의 실제 수익성을
                  반영합니다. 대출(레버리지)을 활용하는 투자자는 ROI가 더 높아지지만,
                  원리금 상환 부담을 추가로 고려해야 합니다.
                </p>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>연 총 임차료</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      연총임차료 = 월세 × 12
                    </p>
                    <p className="mt-2 text-text-secondary">
                      공실이 없다고 가정한 연간 임차료 총액입니다.
                    </p>
                  </li>
                  <li>
                    <strong>공실 손실</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      공실손실 = 연총임차료 × (공실률 / 100)
                    </p>
                    <p className="mt-2 text-text-secondary">
                      연간 평균 공실로 인한 임차료 손실입니다. 공실률 5% = 연간 약 18일 공실.
                    </p>
                  </li>
                  <li>
                    <strong>연 실질 임차료</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      연실질임차료 = 연총임차료 - 공실손실
                    </p>
                    <p className="mt-2 text-text-secondary">
                      공실을 반영한 실제 수취 임차료입니다.
                    </p>
                  </li>
                  <li>
                    <strong>연 순수입</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      연순수입 = 연실질임차료 - (월관리비 × 12)
                    </p>
                    <p className="mt-2 text-text-secondary">
                      모든 비용을 제외한 순이익입니다. 세전 금액이며, 실제 수취액은
                      종합소득세 납부 후입니다.
                    </p>
                  </li>
                  <li>
                    <strong>실투자금</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      실투자금 = 구매가 - 받은보증금 + 취득부대비<br />
                      (자기자본 = 구매가 기준 자신이 내야 할 현금)
                    </p>
                    <p className="mt-2 text-text-secondary">
                      실제로 투자자가 부담하는 자본금입니다. 보증금이 클수록 실투자금이 줄어듭니다.
                    </p>
                  </li>
                  <li>
                    <strong>연 수익률 (ROI)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      ROI = (연순수입 / 실투자금) × 100%<br />
                      Cap Rate = (연순수입 / 구매가) × 100%
                    </p>
                    <p className="mt-2 text-text-secondary">
                      ROI는 실투자금 대비 수익률이며, Cap Rate는 구매가 대비 수익률입니다.
                      투자자의 실제 효율성은 ROI로 평가합니다.
                    </p>
                  </li>
                </ol>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항 및 한계</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기는 기본 수익률만 계산하며, 종합소득세(임대소득 10% 선), 보증금
                    반환 의무, 대출금리, 시세 변동을 포함하지 않습니다. 실제 수익성은 이들
                    요소를 모두 고려해야 합니다.
                  </li>
                  <li>
                    공실률은 추정값이며, 실제 공실은 시장 상황, 물건 상태, 임차인 관리에
                    따라 크게 달라질 수 있습니다. 처음 투자 지역이면 지역 평균 공실률을
                    충분히 높게(5~10%) 가정하세요.
                  </li>
                  <li>
                    받은 보증금은 장기 부채이며, 임차 종료 시 전액 반환해야 합니다. 따라서
                    보증금을 운영자금으로 사용하면 나중에 현금 부족 위기를 맞을 수 있습니다.
                  </li>
                  <li>
                    월 관리비에는 실제 지출만 포함하세요. 리모델링 비용, 대출이자 등은
                    별도로 계산하면 정확한 현금흐름을 분석할 수 있습니다.
                  </li>
                  <li>
                    본 계산기는 교육·참고용 도구입니다. 실제 임대차 투자는 세무사·부동산
                    컨설턴트와 상담하여 개인 상황을 반영하세요.
                  </li>
                </ul>
              </section>

              {/* 활용 팁 */}
              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>물건 비교</strong>: 여러 물건의 수익률을 계산해 비교하세요. 같은
                    가격이면 높은 수익률 물건이 더 낫고, 같은 수익률이면 낮은 가격 물건이 더
                    유리합니다.
                  </li>
                  <li>
                    <strong>공실률 시나리오</strong>: 공실률을 0%, 5%, 10%로 각각 계산해
                    최악의 경우를 대비하세요.
                  </li>
                  <li>
                    <strong>월 관리비 재검토</strong>: 아파트는 공시 금액 확인, 주택은 예상
                    세금·보험료·수리비를 정확히 추산하세요. 처음 예상과 다를 수 있습니다.
                  </li>
                  <li>
                    <strong>보증금 전략</strong>: 보증금을 크게 받으면 ROI는 올라가지만,
                    반환 부담이 커집니다. 20년 평균 보유 기간을 가정하고 계산하세요.
                  </li>
                  <li>
                    <strong>세금 추가 계산</strong>: 연 수익이 2,000만 원 이상이면
                    종합소득세 대상입니다. 순수입의 약 10%를 세금으로 추가 제외하세요.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 초판 공개 (ROI·Cap Rate·공실률 반영)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거 및 참고 자료</strong>: <a href="https://rt.molit.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국토교통부 실거래가</a> 시세 정보, <a href="https://www.reb.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">한국부동산원</a> 부동산 통계, 국세청 종합소득세 안내.
                </p>
                <p>
                  본 계산기의 결과는 교육·참고용이며 법적 효력이 없습니다. 실제 임대차 투자는
                  개인의 자금 상황, 세금 부담, 시장 리스크를 종합 검토해야 합니다. 세무사,
                  공인중개사, 부동산 컨설턴트 상담을 통해 개인 맞춤형 계획을 수립하시기
                  바랍니다.
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
