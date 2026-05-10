import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
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
  getCategoryUrlForCalculator,
} from '@/lib/seo/jsonld';
import { InheritanceTaxCalculator } from './InheritanceTaxCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/inheritance-tax/';

export const metadata: Metadata = {
  title: '상속세 계산기 2026 | 10억 상속 배우자공제·일괄공제 5억',
  description:
    '10억 상속세 얼마? 일괄공제 5억·배우자공제 30억·자녀공제 자동 + 누진세율 10~50%·신고 6개월. 생전증여 vs 상속 절세 비교. 2026 최신.',
  keywords: [
    '상속세 계산기',
    '상속세 일괄공제',
    '배우자 상속공제',
    '상속세 세율',
    '상속세 신고',
    '생전증여 vs 상속',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '상속세 계산기 2026 — 기초공제 2억·일괄공제 5억',
    description: '상속 시 세금을 미리 계산하고 공제 방식을 비교·선택하세요.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속세 계산기 2026 — 기초공제 2억·일괄공제 5억',
    description: '상속 시 세금을 미리 계산하고 공제 방식을 비교·선택하세요.',
  },
  other: {
    'dateModified': '2026-04-24',
  },
};

const FAQ_ITEMS = [
  {
    question: '일괄공제와 기초+인적공제 중 어느 것이 유리한가요?',
    answer:
      '상속세법 §21에 따라 일괄공제 5억과 기초공제 2억 + 자녀공제 + 미성년자공제 중 큰 금액이 자동으로 적용됩니다. 예: 자녀 2명(공제 1억) + 미성년자 공제가 있어도 총합이 5억 미만이면 일괄공제 5억이 적용되어 더 유리합니다. 본 계산기는 두 방식을 자동으로 비교하여 세금이 적은 방식을 선택합니다.',
  },
  {
    question: '배우자공제는 최대 30억인가요?',
    answer:
      '상증세법 §19에 따라 배우자가 받는 상속재산에 대해 최소 5억~최대 30억의 공제를 적용합니다. 법정상속분(1/2) 내에서 실제 상속액이 결정됩니다. 예: 배우자가 5억을 상속받으면 최소 공제 5억이 적용되어 세금 0, 배우자가 30억을 상속받으면 최대 공제 30억이 적용됩니다.',
  },
  {
    question: '자녀공제는 몇 명까지인가요?',
    answer:
      '상증세법 §20에 따라 자녀 수에 제한이 없습니다. 자녀 1명당 5천만 원의 공제를 받습니다. 예: 자녀 3명이면 1.5억(5천만 × 3)의 공제. 미성년 자녀는 추가로 미성년자공제(1천만 원 × (19-현재나이) × 미성년자수)를 받습니다.',
  },
  {
    question: '장례비·공과금은 어떻게 계산되나요?',
    answer:
      '상증세법 §14에 따라 상속재산 총액에서 장례비, 피상속인 채무, 세금·공과금을 차감합니다. 예: 총재산 10억, 대출금 1억, 장례비 5천만이면 상속재산은 10억 - 1억 - 5천만 = 8.5억이 됩니다. 다만 세무사와의 정확한 검증이 필요합니다.',
  },
  {
    question: '상속세 신고 기한은?',
    answer:
      '상증세법 §48에 따라 피상족인이 사망한 날(상속개시일)부터 6개월 이내에 신고해야 합니다. 예: 2026년 3월 15일 사망 → 2026년 9월 15일까지 신고. 기한 내 신고 시 신고세액공제 3%를 받고, 기한을 초과하면 가산세 20% + 납부 지연 이자(연 6-12%)가 부과됩니다.',
  },
  {
    question: '상속재산을 분할하지 않으면 어떻게 되나요?',
    answer:
      '상속은 법적으로 피상속인이 사망한 순간 자동으로 상속인에게 이전됩니다. 재산 분할 여부와 관계없이 상속세는 부과됩니다. 다만 상속인 간의 실제 분할 비율에 따라 각자 납부할 세액이 결정됩니다. 상속포기나 한정승인 등 특수한 경우는 법률 전문가 상담이 필수입니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/gift-tax', title: '증여세', description: '배우자·자녀 증여' },
  { href: '/calculator/capital-gains-tax', title: '양도소득세', description: '상속 후 판매' },
  { href: '/calculator/acquisition-tax', title: '취득세', description: '상속 재산 이전' },
];

export default function InheritanceTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '상속세 계산기',
    description:
      '2026년 상증세법 기준, 기초·자녀·배우자·일괄 공제 자동 비교, 5단계 누진 세율 포함',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속세 계산기 2026',
    description: '상속재산, 상속인 구성, 공제 방식을 입력해 상속세 납부액을 즉시 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('inheritance-tax'),
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    { name: '상속세' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '상속세 계산기 사용 방법',
    description: '상속재산, 상속인 구성, 공제 방식으로 상속세를 계산합니다.',
    steps: [
      { name: '상속재산 총액 입력', text: '부동산, 예금, 주식 등 모든 상속재산의 합계를 입력합니다.' },
      {
        name: '장례비·공과금 입력',
        text: '상증세법 §14에 따라 장례비, 피상속인 채무, 세금 등을 차감할 금액을 입력합니다.',
      },
      {
        name: '상속인 구성 입력',
        text: '배우자 유무, 배우자 상속액, 자녀 수, 미성년 자녀 수와 나이를 입력합니다. 공제액이 자동으로 계산됩니다.',
      },
      {
        name: '공제 방식 선택',
        text: '기초공제 2억 + 자녀공제 vs 일괄공제 5억 중 선택합니다. "자동" 선택 시 세금이 적은 방식이 자동으로 적용됩니다.',
      },
      {
        name: '신고 기한 확인 및 결과 조회',
        text: '신고 기한 내 신고 시 신고세액공제 3%를 받습니다. 상속개시일(사망일) + 6개월이 신고 기한입니다(상증세법 §48).',
      },
    ],
  });
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '상속세 계산기 핵심 용어',
    description: '상속세 계산 및 신고에 필요한 주요 용어 정의',
    url: URL,
    terms: [
      {
        name: '일괄공제 vs 개인공제',
        description: '상속세는 기초공제 2억 + 자녀공제 + 미성년자공제를 합산한 금액과 일괄공제 5억 중 큰 금액이 자동으로 적용되는 방식. 자녀가 많거나 미성년자가 있으면 개인공제 합이 유리, 소수 상속인이면 일괄공제 5억이 유리함(상증세법 §21)',
        alternateName: '공제 자동선택',
        url: 'https://www.hometax.go.kr',
      },
      {
        name: '배우자공제',
        description: '배우자가 받는 상속재산에 대해 적용되는 공제로, 최소 5억 원부터 최대 30억 원까지 법정상속분(1/2) 내에서 결정됨. 배우자 상속액이 크면 공제도 커져 배우자 재산 이전이 상속세 관점에서 유리함(상증세법 §19)',
        alternateName: '배우자 특례',
        url: 'https://law.go.kr',
      },
      {
        name: '상속재산가액',
        description: '피상속인이 사망한 당시의 모든 재산 가액(부동산, 예금, 주식 등)에서 장례비, 피상속인 채무, 세금·공과금을 차감한 금액. 공정시장가액으로 평가됨(상증세법 §14)',
        alternateName: '재산평가',
        url: 'https://www.hometax.go.kr',
      },
      {
        name: '누진공제',
        description: '5단계 누진세율에 따라 세액 계산의 편의를 위해 도입된 제도로, 과세표준에 세율을 곱한 후 누진공제를 차감함. 예: 과세표준 3억 원이면 (3억 × 20%) - 1,000만 원 = 5,000만 원(상증세법 §26)',
        alternateName: '세액공제',
        url: 'https://law.go.kr',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }}
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
                    { name: '세금', href: '/category/tax/' },
                    { name: '상속세' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">상속세 계산기 2026</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 최신 상증세법을 반영한 무료 상속세 계산기입니다. 기초공제 2억, 자녀·미성년자공제,
                  배우자공제, 일괄공제 5억 중 유리한 방식을 자동으로 선택하여 5단계 누진 세율과
                  신고세액공제 3%까지 모두 반영해 상속 시 최종 납부 세액을 거래 전에 정확히 확인할 수
                  있습니다.
                </p>
                <AuthorByline dateModified="2026-04-24" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="상속세는 피상속인(피상족)으로부터 재산을 무상으로 받을 때 부과되는 국세입니다. 상속인의 지위(배우자·자녀·부모 등)에 따라 공제액이 다르고, 기초공제 2억과 일괄공제 5억 중 유리한 것이 자동 적용됩니다(상증세법 §18-§26)."
                table={{
                  caption: '상속인별 주요 공제액',
                  headers: ['공제 유형', '금액/기준'],
                  rows: [
                    ['기초공제', '2억 원'],
                    ['자녀공제', '5천만 원/인'],
                    ['미성년자공제', '1천만 원 × (19세-현재나이) × 미성년자수'],
                    ['일괄공제', '5억 원 (기초+인적 중 큰 것 선택)'],
                    ['배우자공제', '5억~30억 원 (법정상속분 내)'],
                  ],
                }}
                tldr={[
                  '상속세 = (상속재산 - 공과금·채무) - 공제 × 누진세율',
                  '기초공제 2억 vs 일괄공제 5억 중 유리한 것 자동 적용',
                  '배우자공제는 최소 5억, 최대 30억 (법정상속분 내 실제 상속액 기준)',
                  '신고 기한 내 신고 시 신고세액공제 3% 추가',
                  '신고 기한: 상속개시일(사망일) + 6개월',
                ]}
              />

              <AdSlot slot="inheritance-tax-top" format="horizontal" />

              {/* 계산기 */}
              <InheritanceTaxCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 상속세란 무엇인가 */}
              <section aria-label="상속세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">상속세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  상속세는 피상속인(돌아가신 분)이 남긴 재산을 상속인(상속받는 사람)이 받을 때 부과되는
                  국세입니다(상속세 및 증여세법 §1-§26). 부동산, 금전, 주식, 자동차, 예술품 등 모든
                  재산이 과세 대상이며, 배우자, 자녀, 부모, 형제자매 등 누가 상속받든지 상속세가
                  부과됩니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  상속세의 핵심은 <strong>다양한 공제 제도</strong>입니다. 기초공제 2억(모든 상속인 공통),
                  자녀공제 5천만 원/인, 미성년자공제, 배우자공제(5억~30억) 등을 모두 합산하여 과세대상을
                  줄일 수 있습니다. 또한 <strong>일괄공제 5억</strong>이라는 특례가 있어, 기초공제와
                  인적공제를 모두 합한 금액이 5억 미만이면 자동으로 5억의 일괄공제가 적용되어 더
                  유리합니다.
                </p>
                <p className="text-text-secondary">
                  본 계산기는 상속 시 발생하는 모든 공제(기초, 자녀, 미성년자, 배우자, 일괄)와 5단계
                  누진세율, 신고세액공제 3%를 지원합니다. 부부합산, 특수 특례(기업상속공제 등) 등은
                  세무사 상담을 권장합니다.
                </p>
              </section>

              {/* 상속공제 체계 */}
              <section aria-label="상속공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  상속공제 체계 (상증세법 §18-§21)
                </h2>
                <p className="mb-4 text-text-secondary">
                  상속세는 공제를 통해 과세표준을 크게 줄일 수 있습니다. 기초공제, 자녀공제, 미성년자공제,
                  배우자공제, 일괄공제가 있으며, 그 중 <strong>가장 유리한 방식</strong>이 자동으로
                  적용됩니다.
                </p>

                <h3 className="mb-3 text-lg font-semibold text-text-primary">공제 종류별 설명</h3>
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          공제 종류
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">금액</th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">법적근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['기초공제', '2억 원', '§18'],
                        ['자녀공제', '5천만 원/인', '§20'],
                        ['미성년자공제', '1천만원 × (19-나이) × 미성년자수', '§20'],
                        ['배우자공제', '5억~30억 원 (법정상속분 내)', '§19'],
                        ['일괄공제', '5억 원 (자동 선택)', '§21'],
                      ].map(([name, amount, law]) => (
                        <tr key={name} className="border-b border-border-base/50">
                          <td className="px-3 py-2 font-medium text-text-primary">{name}</td>
                          <td className="px-3 py-2 text-text-secondary">{amount}</td>
                          <td className="px-3 py-2 text-caption text-text-tertiary">§{law}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  일괄공제 vs 기초+인적공제 비교
                </h3>
                <p className="mb-3 text-sm text-text-secondary">
                  <strong>핵심:</strong> 두 방식 중 세금이 적게 나오는 방식이 자동으로 적용됩니다.
                </p>
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">상황</th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          기초+인적
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          일괄공제
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">유리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          '배우자, 자녀 2명',
                          '기초 2억 + 자녀 1억 = 3억',
                          '5억',
                          '일괄공제',
                        ],
                        [
                          '자녀 5명 (미성년자 2명)',
                          '기초 2억 + 자녀 2.5억 + 미성년 2억 = 6.5억',
                          '5억',
                          '기초+인적',
                        ],
                        [
                          '배우자만',
                          '기초 2억',
                          '5억',
                          '일괄공제',
                        ],
                      ].map(([situation, personal, lumpsum, better]) => (
                        <tr key={situation} className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">{situation}</td>
                          <td className="px-3 py-2 text-right text-text-secondary">{personal}</td>
                          <td className="px-3 py-2 text-right text-text-secondary">{lumpsum}</td>
                          <td className="px-3 py-2 text-right">
                            <span className="rounded px-2 py-1 text-xs font-medium text-primary-500">
                              {better}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-text-secondary">
                  <strong>예시:</strong> 상속재산 10억, 배우자 + 자녀 2명
                </p>
                <ul className="mb-4 space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>방식 1 (기초+인적):</strong> 기초 2억 + 자녀공제 1억 = 3억 공제 → 과표 7억
                  </li>
                  <li>
                    <strong>방식 2 (일괄):</strong> 일괄공제 5억 → 과표 5억
                  </li>
                  <li>
                    <strong>결과:</strong> 일괄공제 5억이 더 유리하므로 자동 선택됨.
                  </li>
                </ul>
              </section>

              {/* 상속세 세율 */}
              <section aria-label="세율 체계" className="card">
                <h2 className="mb-4 text-2xl font-semibold">상속세 세율 (상증세법 §26)</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  공제 후의 과세표준에 따라 5단계 누진세율이 적용됩니다. 증여세와 동일한 세율입니다.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          과세표준
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">세율</th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          누진공제
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1억 원 이하', '10%', '0'],
                        ['1억~5억', '20%', '1,000만 원'],
                        ['5억~10억', '30%', '6,000만 원'],
                        ['10억~30억', '40%', '1억 6,000만 원'],
                        ['30억 초과', '50%', '4억 6,000만 원'],
                      ].map(([range, rate, deduction]) => (
                        <tr key={range} className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">{range}</td>
                          <td className="px-3 py-2 text-right font-medium text-primary-500">
                            {rate}
                          </td>
                          <td className="px-3 py-2 text-right text-text-secondary">{deduction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-text-secondary">
                  <strong>누진공제란:</strong> 계산의 편의를 위해 도입된 제도입니다. 예: 과세표준 3억
                  원이면 (3억 × 20%) - 1,000만 = 6,000 - 1,000 = 5,000만 원.
                </p>
              </section>

              {/* 신고세액공제 */}
              <section aria-label="신고세액공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">신고세액공제 3% (상증세법 §68)</h2>
                <p className="mb-4 text-text-secondary">
                  상속세는 기한 내에 자진신고하는 경우 산출세액의 <strong>3%를 공제</strong>해줍니다.
                  신고 기한은 <strong>상속개시일(피상속인 사망일)부터 6개월</strong>입니다.
                </p>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">신고 기한 예시</h3>
                <ul className="mb-6 space-y-1 text-sm text-text-secondary">
                  <li>• 사망일 2026년 3월 15일 → 신고 기한: 2026년 9월 15일</li>
                  <li>• 사망일 2026년 12월 25일 → 신고 기한: 2027년 6월 25일</li>
                </ul>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">신고세액공제 계산</h3>
                <p className="mb-3 text-sm text-text-secondary">
                  <strong>예시:</strong> 산출세액이 1억 원이면
                </p>
                <ul className="mb-6 space-y-1 text-sm text-text-secondary">
                  <li>• 신고세액공제 = 1억 × 3% = 300만 원</li>
                  <li>• 최종 납부액 = 1억 - 300만 = 9,700만 원</li>
                </ul>

                <p className="text-sm text-text-secondary">
                  <strong>기한 초과 시:</strong> 신고 기한을 넘기면 신고세액공제를 받을 수 없고,
                  가산세(40%)와 납부 지연 이자(연 6~12%)가 부과됩니다. 따라서 상속 후 가능한 한
                  빨리 신고하는 것이 중요합니다.
                </p>
              </section>

              {/* 상속세 vs 증여세 */}
              <section aria-label="상속세 vs 증여세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">상속세 vs 증여세 비교</h2>
                <p className="mb-4 text-text-secondary">
                  같은 재산 이전이지만 <strong>상속과 증여는 공제액이 크게 다릅니다.</strong> 장기 재산
                  계획 시 두 방식을 모두 계산하여 최적의 방안을 선택하는 것이 중요합니다.
                </p>

                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">항목</th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">상속세</th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">증여세</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['배우자 공제', '5억~30억', '6억 (10년 합산)'],
                        ['자녀 공제', '5천만/인', '5천만/인 (10년 합산)'],
                        ['신고 기한', '6개월', '3개월'],
                        ['세율', '10~50% (5단계)', '10~50% (5단계)'],
                        ['공제 방식', '기초 + 일괄 선택형', '관계별 공제'],
                        ['분할 이전', '자동 이전', '계획 가능'],
                        ['시점', '사망 시 강제', '언제든 선택'],
                      ].map(([item, inheritance, gift]) => (
                        <tr key={item} className="border-b border-border-base/50">
                          <td className="px-3 py-2 font-medium text-text-primary">{item}</td>
                          <td className="px-3 py-2 text-text-secondary">{inheritance}</td>
                          <td className="px-3 py-2 text-text-secondary">{gift}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-text-secondary">
                  <strong>결론:</strong> 배우자 상속공제가 증여보다 유리(5억~30억 vs 6억)하고, 자녀의 경우
                  10년 분할 증여로 세금을 완전히 피할 수 있습니다. 상황에 따라 세무사와 상담하여 최적
                  시점을 결정하세요.
                </p>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>법정상속분 내 배우자공제 원칙:</strong> 배우자공제는 법정상속분(1/2) 내에서만
                    적용됩니다. 배우자가 전체 재산의 50%를 초과하여 상속받으면 초과분은 공제 대상에서
                    제외될 수 있습니다. 정확한 계산은 세무사 상담 필수입니다.
                  </li>
                  <li>
                    <strong>상속재산 평가:</strong> 부동산, 주식, 비상장주식, 미술품 등은 공정시장가액
                    평가가 중요합니다. 낮게 평가하면 세무조사 대상이 될 수 있으므로 전문 평가사 활용을
                    권장합니다.
                  </li>
                  <li>
                    <strong>상속포기·한정승인:</strong> 상속 개시 후 3개월 이내에 포기(채무 회피) 또는
                    한정승인(재산 범위 내 채무 부담)을 선택할 수 있습니다. 절차가 복잡하므로 변호사·세무사
                    상담을 권장합니다.
                  </li>
                  <li>
                    <strong>상속재산 분할:</strong> 상속인 간의 재산 분할 방식(균분, 불균분 등)에 따라 각
                    상속인의 납부 세액이 달라집니다. 분할 시 세무 영향을 고려하세요.
                  </li>
                  <li>
                    <strong>기업상속공제 등 특례:</strong> 상속받은 재산이 기업, 임차공실 등이면 특별한
                    공제와 요건이 있습니다. 본 계산기는 기본 공제만 지원합니다.
                  </li>
                  <li>
                    <strong>2026년 세율 기준:</strong> 본 계산은 2026년 세율로 계산됩니다. 세법 개정 시
                    변경될 수 있으므로 거래 전 최신 정보를 확인하세요.
                  </li>
                </ul>
              </section>

              {/* 절세·활용 팁 */}
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">절세·활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>배우자 활용:</strong> 배우자공제(5억~30억)가 매우 유리하므로, 배우자에게
                    먼저 재산을 상속하는 방안을 검토하세요. 배우자가 안정적으로 재산을 보유할 수 있으면
                    2차 상속 시까지 시간을 벌 수 있습니다.
                  </li>
                  <li>
                    <strong>자녀 증여 병행:</strong> 생전에 자녀에게 10년 분할 증여(공제 5천만/인)를 하면
                    세금 없이 재산을 이전할 수 있습니다. 상속과 증여를 조합하여 전략적으로 계획하세요.
                  </li>
                  <li>
                    <strong>미성년자공제 활용:</strong> 미성년 자녀가 있으면 추가 공제(1천만원 × (19세-
                    나이) × 수)를 받을 수 있습니다. 어린 자녀가 있으면 절세 효과가 큽니다.
                  </li>
                  <li>
                    <strong>신고 기한 준수:</strong> 신고 기한 내 신고 시 3% 공제를 받습니다. 예: 1억
                    세금이면 300만 원을 절약합니다. 기한 초과는 가산세까지 발생하므로 피해야 합니다.
                  </li>
                  <li>
                    <strong>상속재산 분할 전략:</strong> 여러 상속인이 있으면, 분할 방식에 따라 총 납부
                    세액이 달라질 수 있습니다. 누진세 구간을 고려하여 분할하면 절세 효과가 있습니다.
                  </li>
                  <li>
                    <strong>장례비·채무 차감:</strong> 장례비, 피상속인의 빚, 세금 등을 정확히 입증하여
                    차감하면 과세표준을 줄일 수 있습니다. 영수증, 계약서 등 증거를 잘 보관하세요.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 상속세 계산기 초판 공개 (2026 세율 기준)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 상속세 및 증여세법 §21(공제), §26(세율), §68(신고세액공제)
                </p>
                <p className="mb-2">
                  <strong>공식 출처</strong>: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a> 상속세 안내, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a> 세법, <a href="https://www.moef.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">기획재정부</a> 세제 정보.
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 상속세는 재산 평가, 공제 항목, 상속인 구성 등 복잡한 요소를 포함합니다. 정확한 계산과 신고는 반드시 세무사·변호사 상담을 받으시기 바랍니다.
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
