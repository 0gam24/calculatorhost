import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { DataFreshness } from '@/components/ui/DataFreshness';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import bokRates from '@/data/bok-rates.json';
import { LoanLimitCalculator } from './LoanLimitCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const URL = 'https://calculatorhost.com/calculator/loan-limit';

export const metadata: Metadata = {
  title: '대출한도 DSR 계산기 2026 | 스트레스 DSR·LTV | calculatorhost',
  description:
    '2026년 DSR·LTV·DTI 최신 규제와 스트레스 DSR을 반영한 주택담보대출 한도 계산기. 연소득·기존 대출·담보가치로 실행 가능한 최대 한도를 즉시 확인. 회원가입 불필요, 완전 무료.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'DSR 계산기 · 대출한도 2026 — 최대 대출액 확인',
    description:
      '연소득·기존 대출·담보가치로 DSR·LTV·DTI 기준 최대 대출액을 즉시 계산',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSR 계산기 · 대출한도 2026',
    description: '주택담보대출 한도를 DSR·LTV·DTI로 즉시 계산.',
  },
};

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'DSR과 DTI는 어떻게 다른가요?',
    answer:
      'DSR(부채원리금상환비율)은 모든 대출의 원리금 합계를 기준으로, DTI(부채상환비율)는 신규 대출 원리금과 기존 대출 이자 합계를 기준으로 계산합니다. 은행은 DSR(40%)을 주력 규제로, DTI(40-50%)는 보조 규제로 적용합니다.',
  },
  {
    question: '스트레스 DSR이란 무엇인가요?',
    answer:
      '변동금리 대출 시 금리가 인상될 것을 대비하여, 현재 금리에 1.5%p를 더해 DSR을 계산하는 제도입니다. 2026년부터 변동금리·혼합형·주기형 대출에 전면 적용되므로, 장기 고정금리가 아닌 이상 스트레스 DSR을 고려해야 합니다.',
  },
  {
    question: 'LTV는 규제지역별로 얼마인가요?',
    answer:
      '비규제지역 70%, 조정대상·투기·투기과열지역 50%, 생애최초·서민실수요자는 최대 80%입니다. LTV가 높을수록 적은 자금으로 많은 금액을 빌릴 수 있지만, 시장 하락 시 담보 부족 위험이 커집니다.',
  },
  {
    question: '생애최초 구입자의 LTV·DSR 우대는?',
    answer:
      '생애최초 또는 서민실수요자(부부 연소득 기준)는 LTV 최대 80% 우대를 받습니다. DSR 우대는 없으며, 대신 기존 신용대출 이자를 부분 제외하거나 공제하는 방식으로 실질 완화를 제공하는 금융기관도 있으니 확인하세요.',
  },
  {
    question: '기존 신용대출·학자금도 DSR에 포함되나요?',
    answer:
      '네, 모든 금융권(은행·캐피탈·여신전문·저축은행 등)의 신용대출, 학자금 대출, 전세자금 대출 등이 모두 포함됩니다. 그러나 금융기관별로 일부 예외(예: 마이너스 통장 미포함)가 있을 수 있으니 대출 전 은행에 확인하세요.',
  },
  {
    question: '대출한도를 늘리는 현실적 방법은?',
    answer:
      '① 연소득 증가 (소득 인정 절차 필요), ② 기존 대출 상환 (신용·학자금·자동차 포함), ③ 담보 가치 증가 (재감정), ④ 보증인 추가 (금융기관별 인정도 상이), ⑤ 배우자 소득 합산 (부부 공동 차입) 등입니다.',
  },
];

const RELATED = [
  { href: '/calculator/loan', title: '대출이자 계산기', description: '상환액·스케줄' },
  { href: '/calculator/salary', title: '연봉 실수령액', description: '세후 급여' },
  { href: '/calculator/acquisition-tax', title: '취득세 계산기', description: '주택 구입 세금' },
  { href: '/calculator/broker-fee', title: '중개수수료 계산기', description: '중개 비용' },
];

export default function LoanLimitPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: 'DSR·대출한도 계산기',
    description: '2026년 최신 DSR·LTV·DTI 규제와 스트레스 DSR을 반영한 주택담보대출 한도 계산기.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'DSR 계산기 · 대출한도 2026',
    description: '주택담보대출 한도를 DSR·LTV·DTI로 즉시 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: 'DSR 계산기 사용 방법',
    description: '연소득, 기존 대출, 담보가치를 입력하여 최대 대출액을 계산하는 단계별 가이드',
    steps: [
      { name: '연 소득 입력', text: '본인(또는 부부)의 연간 세전 소득을 입력합니다.' },
      { name: '기존 대출 입력', text: '기존 주담대, 신용대출, 학자금 등 모든 빌린 금액과 월상환액을 입력합니다.' },
      { name: '담보가치 입력', text: '구매 예정 주택의 예상 가격과 LTV 한도(지역별 70~80%)를 입력합니다.' },
      { name: 'DSR·LTV·DTI 자동 계산', text: '입력한 정보로 DSR(40%), LTV, DTI 기준 한도가 자동 계산됩니다.' },
      { name: '최대 대출액 확인', text: '세 가지 기준 중 가장 낮은 한도가 실제 가능 대출액입니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance' },
    { name: '대출한도' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
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
                    { name: '대출한도(DSR/LTV)' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  DSR 계산기 · 대출한도 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연소득, 기존 대출, 담보가치를 입력하여 현재 거주지역 및 주택 상태에 따른
                  3대 규제(DSR·LTV·DTI)를 모두 적용한 실행 가능한 최대 대출액을 즉시 확인하세요.
                  2026년 스트레스 DSR(1.5%p) 풀 적용 기준을 반영합니다.
                </p>
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="DSR(부채원리금상환비율)은 모든 대출의 연간 원리금을 연소득으로 나눈 비율로, 은행 40%, 2금융권 50% 이하로 규제됩니다. LTV(담보인정비율)는 대출액을 담보가치로 나눈 비율(비규제 70%, 규제 50%, 생애최초 80%)이며, DTI(부채상환비율)는 신규 대출 원리금과 기존 이자를 합산한 비율입니다(금융감독원 주택담보대출 규제 고시, 은행법 시행령 §24의4)."
                table={{
                  caption: '2026년 규제별 한도 정리',
                  headers: ['규제', '한도/특징'],
                  rows: [
                    ['DSR (모든대출)', '은행 40%, 2금융권 50% + 스트레스 1.5%p'],
                    ['LTV (담보비율)', '비규제 70%, 규제 50%, 생애최초 80%'],
                    ['DTI (신규+이자)', '비규제 50%, 규제 40%'],
                  ],
                }}
                tldr={[
                  'DSR = (모든 대출 연원리금) / 연소득 × 100 ≤ 40% 또는 50%',
                  'LTV = 신규 대출액 / 담보가치 × 100 ≤ 50%, 70%, 또는 80%',
                  'DTI = (신규 원리금 + 기존 이자) / 연소득 × 100 ≤ 40% 또는 50%',
                  '3개 기준 중 가장 낮은 한도가 최종 대출액을 결정합니다.',
                ]}
              />

              {/* AD-1 리더보드 (상단) */}
              <AdSlot slot="loan-limit-top" format="horizontal" />

              {/* 계산기 폼 */}
              <LoanLimitCalculator />

              {/* FAQ (중간 배치 — GEO 최적화) */}
              <FaqSection items={FAQ_ITEMS} />

              {/* DSR이란? */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">DSR(부채원리금상환비율)이란?</h2>
                <p className="text-text-secondary">
                  DSR은 모든 금융권 대출의 연간 원리금 합계를 연소득으로 나눈 비율입니다.
                  은행은 40%, 2금융권은 50% 이하로 규제합니다.
                </p>
                <div className="bg-bg-card rounded-lg p-4 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">계산식:</span>
                    <br />
                    DSR = (신규 대출 연원리금 + 기존 모든 대출 연원리금) / 연소득 × 100
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">포함 대출:</span>
                    주담대, 신용대출, 학자금, 전세자금, 자동차 등 모든 금융권
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">스트레스 DSR:</span>
                    변동금리·혼합형·주기형은 현재 금리에 1.5%p를 추가하여 DSR을 계산합니다.
                    (2026년 전면 적용)
                  </p>
                </div>
                <p className="text-sm text-text-tertiary">
                  * 금융기관별로 부분 제외 대상(예: 마이너스 통장) 및 우대 방식(예: 자녀수 공제)이 다를 수 있으니 대출 전 확인하세요.
                </p>
              </section>

              {/* LTV란? */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">LTV(담보인정비율)이란?</h2>
                <p className="text-text-secondary">
                  LTV는 대출액을 담보 가치(주택가격)로 나눈 비율입니다.
                  규제지역과 주택 상태에 따라 50%~80% 범위에서 규제됩니다.
                </p>
                <div className="bg-bg-card rounded-lg p-4 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">계산식:</span>
                    <br />
                    LTV = 신규 대출액 / 담보가치 × 100
                  </p>
                  <div className="text-sm space-y-2">
                    <span className="font-semibold">지역·상태별 한도:</span>
                    <ul className="space-y-1 text-text-secondary">
                      <li>• 비규제지역 일반: 70%</li>
                      <li>• 조정대상·투기·투기과열: 50%</li>
                      <li>• 생애최초·서민실수요자: 80% (우대)</li>
                      <li>• 9억 초과 주택: 추가 제한</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* DTI란? */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">DTI(부채상환비율)이란?</h2>
                <p className="text-text-secondary">
                  DTI는 신규 대출 원리금과 기존 대출 이자를 합산하여 연소득으로 나눈 비율입니다.
                  DSR 전면 시행으로 보조 규제 성격이 되었으나 여전히 적용됩니다.
                </p>
                <div className="bg-bg-card rounded-lg p-4 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">계산식:</span>
                    <br />
                    DTI = (신규 대출 연원리금 + 기존 대출 연이자) / 연소득 × 100
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">규제 한도:</span>
                    규제지역 40%, 비규제지역 50%
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">DSR과의 차이:</span>
                    DSR은 모든 대출의 원리금을, DTI는 신규는 원리금, 기존은 이자만 포함합니다.
                  </p>
                </div>
              </section>

              {/* 주의사항 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주의사항</h2>
                <div className="bg-danger-500/5 border border-danger-500/20 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-danger-500 font-medium">
                    이 계산기는 일반적인 규제 기준을 따른 참고용이며, 실제 대출 한도는 다음 요인에 따라 달라질 수 있습니다:
                  </p>
                  <ul className="text-sm text-danger-500/90 space-y-1">
                    <li>• 금융기관의 자체 심사 기준 및 우대 정책</li>
                    <li>• 소득 증빙 방식 및 인정도 (급여·사업·임차료·연금 등)</li>
                    <li>• 신용등급, 신용거래 이력</li>
                    <li>• 담보 재감정 결과</li>
                    <li>• 상품별 세부 규정 (예: DSR 산정에 부분 제외 대상)</li>
                    <li>• 금융기관 유동성 및 여신 한도</li>
                  </ul>
                  <p className="text-sm text-danger-500 font-medium mt-2">
                    실제 대출 실행은 반드시 금융기관의 여신심사 결과를 따릅니다.
                  </p>
                </div>
              </section>

              {/* 대출 상품별 DSR 계산 사례 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">실제 케이스 시뮬레이션</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-primary-500 mb-3">
                      사례 1. 30대 맞벌이, 서울 강남 주택매매
                    </h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>부부 연소득: 1억 원 (각 5,000만 원)</li>
                      <li>신규 대출: 5억 원 (고정금리 3.5%, 30년 원리금균등)</li>
                      <li>기존 대출: 1,000만 원 신용대출</li>
                      <li>담보 가치: 8억 원 (조정지역)</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-border-base text-sm">
                      <p className="text-text-secondary">
                        <strong>DSR 계산:</strong> (신규 월원리금 약 224만 + 기존 이자 약 3만) / 833만 = 27.2% ✓ (40% 이하 통과)<br/>
                        <strong>LTV 계산:</strong> 5억 / 8억 = 62.5% ✓ (조정 50% 규제는 불동산 수 기준, 이 사례는 1주택이므로 통과)<br/>
                        <strong>결론:</strong> DSR·LTV 모두 통과하여 5억 원 대출 가능
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-secondary-500 mb-3">
                      사례 2. 40대 자영업자, 대출 제약 케이스
                    </h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>연소득: 8,000만 원 (사업소득 증명)</li>
                      <li>신규 대출 목표: 4억 원 (3.5% 금리, 20년)</li>
                      <li>기존 대출: 신용카드론 2,000만 원, 자동차 5,000만 원</li>
                      <li>담보 가치: 6억 원</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-border-base text-sm">
                      <p className="text-text-secondary">
                        <strong>DSR 계산:</strong> (신규 월원리금 약 191만 + 기존 전체 약 175만) / 667만 = 54.9% ✗ (40% 초과!)<br/>
                        <strong>문제점:</strong> 기존 대출 상환액이 많아 DSR 규제 위배<br/>
                        <strong>해결책:</strong> 신용카드론 2,000만 원 먼저 상환하면 DSR 약 39%로 개선 가능. 신규 3억 원 정도 가능.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-highlight-500 mb-3">
                      사례 3. 생애최초 구매자, LTV 우대 혜택
                    </h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>연소득: 6,000만 원 (무주택 + 생애최초 자격)</li>
                      <li>구매 주택: 6억 원 (비규제 지역)</li>
                      <li>자기자금: 1.5억 원</li>
                      <li>신규 대출 목표: 4.5억 원</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-border-base text-sm">
                      <p className="text-text-secondary">
                        <strong>LTV 계산:</strong> 4.5억 / 6억 = 75% (생애최초 80% 우대 적용 가능) ✓<br/>
                        <strong>DSR 계산:</strong> 신규 월원리금 약 214만 / 500만 = 42.8% ✗ (40% 초과)<br/>
                        <strong>결론:</strong> LTV는 통과하지만 DSR로 제약. 자기자금 추가 또는 금리 인상 대비 필요. 실제로는 3.8억 원 정도가 현실적.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 대출한도 늘리는 방법 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">대출한도를 늘리려면?</h2>
                <ul className="space-y-3 text-text-secondary">
                  <li>
                    <span className="font-semibold text-text-primary">1. 연소득 증가</span>
                    <br />
                    자영업자는 사업소득 증명, 재직자는 승진·이직으로 소득 인상. 배우자 소득 추가 시뮬레이션도 고려하세요.
                  </li>
                  <li>
                    <span className="font-semibold text-text-primary">2. 기존 대출 상환</span>
                    <br />
                    신용대출, 학자금, 자동차, 캐시백 등 모든 대출이 DSR을 낮춥니다. 상환 순서는 금리가 높은 순입니다.
                  </li>
                  <li>
                    <span className="font-semibold text-text-primary">3. 담보 가치 증가</span>
                    <br />
                    부동산 재감정으로 평가액 상향 (신축, 대규모 리모델링 후)
                  </li>
                  <li>
                    <span className="font-semibold text-text-primary">4. 보증인 추가</span>
                    <br />
                    금융기관별로 배우자, 부모 등 보증인 소득을 일부 합산 (기관별 인정도 상이)
                  </li>
                  <li>
                    <span className="font-semibold text-text-primary">5. 지역·상태 확인</span>
                    <br />
                    규제지역이면 비규제 지역으로 매수처 변경, 생애최초 자격 확인 등
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 및 출처 */}
              <section className="space-y-4 text-sm text-text-tertiary">
                <div className="border-t border-border-base pt-4">
                  <p>
                    <span className="font-semibold text-text-secondary">마지막 업데이트:</span> 2026-04-24
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-text-secondary">법적 근거:</span>
                  </p>
                  <ul className="space-y-1 mt-1">
                    <li>• 은행법 시행령 §24의4 (DSR 기준)</li>
                    <li>• <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 hover:underline dark:text-primary-500">금융위원회</a> 여신심사 선진화 가이드라인</li>
                    <li>• <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 hover:underline dark:text-primary-500">금융감독원</a> 주택담보대출 규제 고시</li>
                    <li>• 은행업감독업무 시행세칙 (LTV·DTI 규제)</li>
                    <li>• 스트레스 DSR 도입 (2024년 2월 ~ 2026년 전면)</li>
                  </ul>
                </div>

                {/* 공공데이터 출처 */}
                <DataFreshness
                  source="한국은행 ECOS"
                  fetchedAt={bokRates.fetchedAt}
                  isLive={bokRates.source === 'live'}
                />

                <div className="border-t border-border-base pt-4">
                  <p className="font-semibold text-text-secondary mb-2">면책조항</p>
                  <p>
                    본 계산기는 참고용일 뿐, 법적 조언이 아닙니다. 실제 대출 한도는 금융기관의 여신심사 결과에 따라
                    달라질 수 있습니다. 정확한 한도 확인은 이용할 금융기관에 문의하시기 바랍니다.
                    본 사이트는 이 계산기 사용으로 인한 손실이나 손해에 대해 책임을 지지 않습니다.
                  </p>
                </div>
              </section>
            </div>
          </main>

          {/* 우측 AdSense 사이드바 (lg+) */}
          <aside className="hidden lg:block w-[300px] fixed right-0 top-0 h-screen overflow-y-auto bg-bg-base border-l border-border-base pt-8">
            <div className="px-4 space-y-4">
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    </>
  );
}
