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
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';
import { VatCalculator } from './VatCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/vat/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '부가가치세 계산기 2026 | 매출 1억 부가세 얼마·간이과세 비교',
  description:
    '매출 1억 일반과세 부가세 얼마? 매출세액-매입세액·간이과세 (1.5~4%)·환산 청구 자동 + 1월/7월 신고 일정. 사업자 1기/2기 시뮬. 2026 최신.',
  keywords: [
    '부가세 계산기',
    'VAT 계산기',
    '부가가치세 계산',
    '일반과세자 부가세',
    '간이과세자 부가세',
    '부가세 환산',
    '공급가액 계산',
    'VAT 분리',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '부가가치세 계산기 2026 — 일반·간이·환산',
    description: '매출세액 − 매입세액 / 간이과세 부가가치율 / VAT 포함↔공급가액 환산.',
    url: URL,
    type: 'website',

    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '부가세 계산기 (VAT) 2026',
    description: '일반·간이과세 + VAT 환산. 사업자·프리랜서 필수.',

  },
};

const FAQ_ITEMS = [
  {
    question: '한국 부가세율은 얼마인가요?',
    answer:
      '한국 표준 부가가치세율은 10%입니다 (부가가치세법 §14). 수출·국제운송 등은 영세율(0%) 적용, 의료·교육·금융보험 등은 면세 처리됩니다. 본 계산기는 표준 10% 기준입니다.',
  },
  {
    question: '일반과세자와 간이과세자의 차이는 무엇인가요?',
    answer:
      '일반과세자는 매출세액(매출×10%)에서 매입세액(매입×10%)을 빼서 납부합니다. 간이과세자는 매출에 업종별 부가가치율(5~40%)과 10%를 곱하는 단순 방식이며, 매입세액공제도 부분 제한됩니다. 연 매출 8,000만 원 미만 사업자가 간이과세 가능 (2025년 기준 / 일부 업종 제외).',
  },
  {
    question: '간이과세자 부가가치율은 어떻게 결정되나요?',
    answer:
      '업종별로 부가가치세법 시행령 §111에 명시되어 있습니다. 전기·가스·수도 5%, 소매·음식점 15%, 제조·운수·금융 20%, 건설·임대·서비스 30%, 부동산매매·기타 40%. 본 계산기는 업종 선택 시 자동 적용합니다.',
  },
  {
    question: '간이과세자 면세 조건은?',
    answer:
      '간이과세자 중 연 매출 4,800만 원 미만이면 부가세 납부 의무가 면제됩니다 (신고는 필요). 단, 면세 사업자 등록과는 별개이며, 영수증 발행·신고는 정상 진행해야 합니다.',
  },
  {
    question: 'VAT 포함 가격에서 공급가액은 어떻게 계산하나요?',
    answer:
      'VAT 포함 가격을 1.1로 나누면 공급가액이 됩니다. 예: 110,000원 (VAT 포함) ÷ 1.1 = 100,000원 (공급가액), VAT = 10,000원. 본 계산기의 "VAT 포함 → 공급가액 환산" 모드를 사용하세요. 부동소수점 오차를 보정해 정확한 정수 결과를 제공합니다.',
  },
  {
    question: '매입이 매출보다 많으면 어떻게 되나요?',
    answer:
      '일반과세자는 환급 받습니다. 매출세액보다 매입세액이 많으면 차액을 국세청에서 환급. 단, 간이과세자는 환급이 없으며 납부세액이 0으로 처리됩니다. 본 계산기는 환급 발생 시 자동으로 표시합니다.',
  },
  {
    question: '부가세 신고는 언제 하나요?',
    answer:
      '일반과세자는 1년에 4회 (예정신고 4월·10월, 확정신고 7월·1월). 간이과세자는 1년에 1회 (1월 25일까지). 모든 신고는 홈택스(hometax.go.kr)에서 가능하며, 신고 누락 시 가산세가 부과됩니다.',
  },
] as const;

const RELATED = [
  {
    href: '/calculator/freelancer-tax',
    title: '프리랜서 종합소득세',
    description: '3.3% 원천징수·단순경비율',
  },
  {
    href: '/calculator/n-jobber-insurance',
    title: 'N잡러 건강보험',
    description: '피부양자·부가소득',
  },
  {
    href: '/calculator/salary',
    title: '연봉 실수령액',
    description: '4대보험·소득세 반영',
  },
];

export default function VatPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '부가가치세(VAT) 계산기',
    description:
      '한국 부가가치세 10% 계산기. 일반과세자/간이과세자/VAT 환산 모두 지원.',
    url: URL,
  });
  const webpageLd = buildWebPageJsonLd({
    name: '부가가치세 계산기 2026',
    description: '일반·간이과세 부가세 + VAT 포함↔공급가액 환산',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    isPartOf: getCategoryUrlForCalculator('vat'),
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    { name: '부가가치세 계산기' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '부가가치세 계산하기',
    description: '일반/간이과세자 부가세 산출 또는 VAT 포함·공급가액 환산 방법',
    steps: [
      {
        name: '계산 모드 선택',
        text: '"사업자 부가세 계산" / "VAT → 공급가액 환산" / "공급가액 → VAT 포함" 중 선택합니다.',
      },
      {
        name: '사업자 유형 선택 (사업자 모드)',
        text: '일반과세자 또는 간이과세자를 선택합니다. 간이과세자는 업종(부가가치율 5~40%)을 추가 선택합니다.',
      },
      {
        name: '매출·매입 입력',
        text: '연 매출액과 매입액을 공급가액(VAT 미포함) 기준으로 입력합니다.',
      },
      {
        name: '결과 확인',
        text: '매출세액, 매입세액공제, 납부할 부가세(또는 환급세액)가 즉시 계산되며, 면세 조건 자동 판정됩니다.',
      },
    ],
  });
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '부가가치세 핵심 용어',
    description: '한국 부가세 산정 관련 용어집',
    url: `${URL}#glossary`,
    terms: [
      {
        name: '부가가치세 (VAT)',
        alternateName: 'VAT',
        description:
          'Value Added Tax. 사업자가 재화·용역을 공급할 때 거래 단계마다 부가된 가치에 부과되는 간접세. 한국 표준세율 10%. 근거: 부가가치세법.',
        url: 'https://www.nts.go.kr',
      },
      {
        name: '매출세액',
        description:
          '사업자가 재화·용역을 공급하고 받은 부가세. 산식: 공급가액 × 10%. 부가가치세법 §13.',
      },
      {
        name: '매입세액공제',
        description:
          '사업자가 사업 관련 재화·용역을 매입할 때 부담한 부가세를 매출세액에서 차감하는 제도. 일반과세자는 100%, 간이과세자는 부가가치율만큼만 공제. 부가가치세법 §38.',
      },
      {
        name: '간이과세자',
        description:
          '연 매출 8,000만 원 미만 소규모 사업자에게 부여되는 간소화된 과세 방식. 매출 × 업종별 부가가치율 × 10% 산식 적용. 연 매출 4,800만 원 미만이면 납부 면제.',
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }} />

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
                    { name: '세금', href: '/category/tax/' },
                    { name: '부가가치세 계산기' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부가가치세(VAT) 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  한국 부가세 10% 기준 계산기. 일반과세자(매출세액 − 매입세액) /
                  간이과세자(업종별 부가가치율) / VAT 포함↔공급가액 환산 모두 지원합니다.
                  사업자·프리랜서·소상공인의 분기·반기 신고 시뮬레이션에 사용하세요.
                </p>
                <AuthorByline datePublished={DATE_PUBLISHED} dateModified={DATE_MODIFIED} />
              </header>

              <StructuredSummary
                definition="부가가치세(VAT)는 사업자가 재화·용역 공급 시 거래 단계마다 부가된 가치에 부과되는 간접세로, 한국은 표준 10%를 적용합니다. 일반과세자는 매출세액에서 매입세액을 빼고, 간이과세자는 매출에 업종별 부가가치율(5~40%)과 10%를 곱하는 방식입니다."
                table={{
                  caption: '2026년 부가세 산정 정리',
                  headers: ['구분', '산정 방식'],
                  rows: [
                    ['일반과세 매출세액', '공급가액 × 10%'],
                    ['일반과세 매입세액공제', '매입가 × 10% (전액 공제)'],
                    ['일반과세 납부세액', '매출세액 − 매입세액 (음수 시 환급)'],
                    ['간이과세 매출세액', '매출 × 업종 부가가치율(5~40%) × 10%'],
                    ['간이과세 면세', '연 매출 4,800만 원 미만'],
                  ],
                }}
                tldr={[
                  '한국 부가세율 10% (영세·면세 항목 제외)',
                  '일반과세자: 매출세액 − 매입세액 = 납부세액',
                  '간이과세자: 매출 × 부가가치율 × 10%, 환급 없음',
                  'VAT 포함 가격 ÷ 1.1 = 공급가액 (VAT 분리)',
                  '신고: 일반 4회/년, 간이 1회/년 (홈택스)',
                ]}
              />

              <AdSlot slot="vat-top" format="horizontal" />

              <VatCalculator />

              <FaqSection items={[...FAQ_ITEMS]} />

              <section aria-label="부가세란" className="card">
                <h2 className="mb-4 text-2xl font-semibold">부가가치세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  부가가치세(Value Added Tax, VAT)는 재화나 용역의 공급 단계마다 부가되는
                  가치에 부과되는 간접세입니다. 한국은 1977년 도입 이후 표준세율 10%를
                  유지하고 있으며, 사업자가 소비자로부터 받아 국세청에 납부하는 구조입니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  핵심 원리는 <strong>"부가가치 부분만 과세"</strong>입니다. 사업자가 매출 시
                  10%를 받고(매출세액), 매입 시 부담한 10%를 차감(매입세액공제)해 차액만
                  납부합니다. 결과적으로 사업자는 자기가 부가한 가치(매출 − 매입)에 대해서만
                  세금을 부담하는 셈입니다.
                </p>
                <p className="text-text-secondary">
                  최종 부담자는 소비자입니다. 영수증·세금계산서의 합계 금액에는 이미
                  부가세 10%가 포함되어 있으며, 이를 사업자가 모아서 국세청에 신고·납부합니다.
                </p>
              </section>

              <section aria-label="일반 vs 간이과세자" className="card">
                <h2 className="mb-4 text-2xl font-semibold">일반과세자 vs 간이과세자</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-2 font-semibold">일반과세자</h3>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• 연 매출 8,000만 원 이상 또는 간이과세 배제 업종</li>
                      <li>• 산정: 매출세액(매출×10%) − 매입세액(매입×10%) = 납부세액</li>
                      <li>• 매입세액공제 100% 가능</li>
                      <li>• 환급 가능 (매입 &gt; 매출 시)</li>
                      <li>• 신고: 1년 4회 (예정 4·10월, 확정 7·1월)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
                    <h3 className="mb-2 font-semibold">간이과세자</h3>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• 연 매출 8,000만 원 미만 (일부 업종 제외)</li>
                      <li>• 산정: 매출 × 업종별 부가가치율(5~40%) × 10%</li>
                      <li>• 매입세액공제 부분 제한 (부가가치율만큼만)</li>
                      <li>• 환급 없음 (납부세액 0이 최저)</li>
                      <li>• 연 매출 4,800만 원 미만 → 납부 면제</li>
                      <li>• 신고: 1년 1회 (1월 25일까지)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">2026년 부가가치세(VAT)는 어떻게 계산하나요?</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>일반과세자 납부세액</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      납부세액 = (매출 × 10%) − (매입 × 10%)
                    </p>
                  </li>
                  <li>
                    <strong>간이과세자 납부세액</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      납부세액 = 매출 × 부가가치율 × 10%
                    </p>
                    <p className="mt-2 text-text-secondary">
                      부가가치율: 전기·가스 5%, 소매·음식점 15%, 제조·운수·금융 20%,
                      건설·임대·서비스 30%, 부동산매매·기타 40%
                    </p>
                  </li>
                  <li>
                    <strong>VAT 포함 가격 → 공급가액 분리</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      공급가액 = VAT 포함 가격 ÷ 1.1<br />
                      VAT = VAT 포함 가격 − 공급가액
                    </p>
                  </li>
                  <li>
                    <strong>공급가액 → VAT 포함 가격 추가</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      VAT = 공급가액 × 10%<br />
                      VAT 포함 가격 = 공급가액 + VAT
                    </p>
                  </li>
                </ol>
              </section>

              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항 및 면책</h2>
                <div className="mb-4 rounded-lg border-l-4 border-danger-500 bg-danger-50 p-4 dark:border-danger-400 dark:bg-red-950 dark:bg-opacity-20">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>본 계산기는 교육·참고 목적입니다.</strong> 실제 부가세 신고는
                    홈택스(hometax.go.kr)에서 정식 신고하거나 세무사 상담을 권장합니다.
                  </p>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>본 계산기는 표준세율 10% 기준입니다. 영세율(0%) 또는 면세 항목은 별도 처리됩니다.</li>
                  <li>간이과세 부가가치율은 2026년 시행령 기준이며, 정부 개정에 따라 달라질 수 있습니다.</li>
                  <li>의제매입세액공제, 신용카드매출 세액공제 등 특수 공제는 미반영입니다 (홈택스 자동 계산).</li>
                  <li>전자세금계산서 미발급 가산세, 신고 누락 가산세 등은 별도 산정해야 합니다.</li>
                </ul>
              </section>

              <RelatedCalculators items={RELATED} />

              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-05-03: 초판 공개 (일반·간이·환산 3가지 모드)</li>
                </ul>
              </section>

              <section aria-label="법적 근거" className="card">
                <h2 className="mb-3 text-lg font-semibold">법적 근거 및 공식 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary mb-4">
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/부가가치세법"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터 — 부가가치세법
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.hometax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국세청 홈택스 — 부가세 전자신고
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국세청 — 부가가치세 안내
                    </a>
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 부가가치세법 §3·§13·§14·§38·§61·§63, 부가가치세법 시행령 §111.
                </p>
                <p>
                  <strong>면책</strong>: 본 계산기는 일반적 산식 기반의 추정치이며,
                  실제 신고·납부 금액은 홈택스 또는 세무사 산정 결과를 따릅니다.
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
