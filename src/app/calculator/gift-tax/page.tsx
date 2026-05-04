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
  getCategoryUrlForCalculator,
} from '@/lib/seo/jsonld';
import { GiftTaxCalculator } from './GiftTaxCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/gift-tax/';

export const metadata: Metadata = {
  title: '증여세 계산기 2026 | 10년 공제·배우자·자녀 | calculatorhost',
  description:
    '2026년 상증세법 기준 증여세 계산기. 배우자·자녀·기타 친족별 10년 합산 공제와 5단계 누진 세율, 신고세액공제 3%까지 반영해 최종 납부세액 즉시 확인.',
  alternates: { canonical: URL },
  openGraph: {
    title: '증여세 계산기 2026 — 배우자 6억·자녀 5천만',
    description: '재산 증여 시 세금을 미리 계산하고 10년 합산 공제 전략을 확인하세요.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '증여세 계산기 2026 — 배우자 6억·자녀 5천만',
    description: '재산 증여 시 세금을 미리 계산하고 10년 합산 공제 전략을 확인하세요.',
  },
  other: {
    'dateModified': '2026-04-24',
  },
};

const FAQ_ITEMS = [
  {
    question: '증여세 공제는 10년 내 합산하는 이유는?',
    answer:
      '상증세법 §53에 따라 같은 증여자로부터 10년 이내에 받은 증여는 공제를 합산하여 적용합니다. 예를 들어 배우자로부터 연 2억씩 3년에 걸쳐 6억을 받으면, 공제 6억을 한 번에 적용하는 것이 아니라 3년 동안 점진적으로 공제 한도를 소진하게 됩니다. 따라서 증여 계획을 세울 때 10년 기간을 고려해야 합니다.',
  },
  {
    question: '배우자 증여 6억은 언제 적용되나요?',
    answer:
      '배우자에게 증여하는 경우 상증세법 §53에 따라 10년 기간 동안 최대 6억 원까지 공제됩니다. 예: 배우자에게 7억 원을 증여하면 6억은 공제되고 1억에만 세금이 부과됩니다(과표 1억 → 세금 1,000만 원). 단, 10년 이내 추가 증여가 있으면 공제 한도가 감소합니다.',
  },
  {
    question: '자녀에게 주택을 증여하면 세금이?',
    answer:
      '성년 자녀(20세 이상)에게 주택을 증여하면 상증세법 §53의 공제 5천만 원을 적용합니다. 예: 주택 가격 3억 원 증여 → 공제 5천만 → 과표 2.5억 → 누진세 30% - 6천만 = 1.2억 원 세금(신고공제 후 약 1.16억). 미성년 자녀는 공제가 2천만 원으로 낮으므로 훨씬 많은 세금이 부과됩니다.',
  },
  {
    question: '부담부증여는 무엇인가요?',
    answer:
      '부담부증여는 증여자가 진 채무(예: 대출금, 임차보증금)를 수증자(받는 사람)가 대신 갚기로 약정하는 경우를 말합니다. 상증세법 §47에 따라 증여가액에서 채무액을 차감합니다. 예: 부동산 가격 5억 원이지만 대출금 1억 원이 있으면, 과세 대상은 4억 원입니다(채무는 차감).',
  },
  {
    question: '신고 기한이 지나면 어떻게 되나요?',
    answer:
      '증여세는 증여일 속하는 달 말일부터 3개월 이내에 신고·납부해야 합니다(상증세법 §48). 기한을 초과하면 가산세(20%)와 납부 지연 이자(연 6~12%)가 부과됩니다. 또한 기한 내 신고 시 적용되는 신고세액공제 3%를 받을 수 없습니다. 따라서 증여 후 가능한 한 빨리 신고하는 것이 중요합니다.',
  },
  {
    question: '증여세와 상속세 중 유리한 건?',
    answer:
      '일반적으로 배우자 증여(공제 6억)가 상속(공제 5억)보다 유리합니다. 자녀의 경우 증여(공제 5천만)와 상속(공제 5천만)이 같지만, 10년 분할 증여로 세금을 분산할 수 있어 절세 효과가 있습니다. 단, 상황에 따라 달라지므로 세무사와 상담하여 최적 방안을 결정하세요.',
  },
] as const;

const RELATED = [
  { href: '/calculator/inheritance-tax', title: '상속세', description: '배우자·자녀 상속' },
  { href: '/calculator/capital-gains-tax', title: '양도소득세', description: '부동산 판매' },
  { href: '/calculator/acquisition-tax', title: '취득세', description: '증여 시 취득세도 별도 발생' },
  { href: '/calculator/property-tax', title: '재산세', description: '증여 후 연간 부과' },
];

export default function GiftTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '증여세 계산기',
    description: '2026년 상증세법 기준, 배우자·자녀·친족별 10년 합산 공제 포함',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '증여세 계산기 2026',
    description: '증여재산 가액과 관계, 10년 공제를 입력해 증여세 납부액을 즉시 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('gift-tax'),
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    { name: '증여세' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '증여세 계산기 사용 방법',
    description: '재산 증여 시 증여세를 5단계로 계산합니다.',
    steps: [
      { name: '증여재산 가액 입력', text: '증여받는 재산의 공정시장가액을 입력합니다.' },
      { name: '증여자와의 관계 선택', text: '배우자, 자녀, 부모 등 증여자와의 관계를 선택하면 공제액이 자동으로 적용됩니다.' },
      { name: '10년 기증여액 입력 (선택)', text: '같은 증여자로부터 10년 내에 받은 이전 증여액이 있으면 입력합니다. 상증세법 §53에 따라 10년 내 공제를 합산하여 적용합니다.' },
      { name: '부담부증여 입력 (선택)', text: '증여자가 진 채무를 수증자가 갚을 경우 채무액을 입력합니다. 상증세법 §47에 따라 채무는 증여가액에서 차감됩니다.' },
      { name: '신고 기한 확인 및 결과 조회', text: '신고 기한 내 신고 시 신고세액공제 3%를 받습니다. "신고 기한 내 자진신고" 체크박스를 확인하고 최종 납부액을 조회합니다. 신고 기한은 증여일이 속하는 달 말일부터 3개월입니다(상증세법 §48).' },
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
                    { name: '세금', href: '/category/tax/' },
                    { name: '증여세' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">증여세 계산기 2026</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 최신 상증세법을 반영한 무료 증여세 계산기입니다. 배우자·자녀·부모·친족별
                  10년 합산 공제, 5단계 누진 세율, 신고세액공제까지 모두 반영하여 재산 증여 시 최종
                  납부 세액을 거래 전에 정확히 확인할 수 있습니다.
                </p>
                <AuthorByline dateModified="2026-04-24" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="증여세는 타인으로부터 재산을 무상으로 받을 때 부과되는 국세입니다. 증여 대상과의 관계(배우자·자녀·부모·친족)에 따라 공제액이 다르고, 10년 내 동일 증여자로부터의 증여는 공제를 합산하여 적용합니다(상증세법 §26, §53)."
                table={{
                  caption: '관계별 10년 누적 증여재산공제',
                  headers: ['관계', '공제액'],
                  rows: [
                    ['배우자', '6억 원'],
                    ['성년 직계비속(자녀·손자)', '5천만 원'],
                    ['미성년 직계비속', '2천만 원'],
                    ['직계존속(부모·조부모)', '5천만 원'],
                    ['기타 친족(형제·며느리 등)', '1천만 원'],
                  ],
                }}
                tldr={[
                  '증여세 = (증여재산 + 기증여 - 채무) - 공제 × 누진세율',
                  '배우자 증여는 6억, 자녀 5천만 원(성년)·2천만(미성년) 공제',
                  '10년 내 합산 공제 원칙 — 분할 증여로 세금 분산 가능',
                  '신고 기한 내 신고 시 신고세액공제 3% 추가',
                  '신고 기한: 증여일 속하는 달 말일 + 3개월',
                ]}
              />

              <AdSlot slot="gift-tax-top" format="horizontal" />

              {/* 계산기 */}
              <GiftTaxCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 증여세란 무엇인가 */}
              <section aria-label="증여세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">증여세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  증여세는 타인으로부터 재산을 무상으로 받을 때(증여 받을 때) 부과되는 국세입니다
                  (상속세 및 증여세법 §1-§26). 부동산, 금전, 주식, 자동차 등 모든 재산이 대상이며,
                  배우자, 자녀, 부모, 친척 등 누구로부터 받든지 증여세가 부과됩니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  증여세의 특징은 <strong>증여 대상(수증자)와의 관계</strong>에 따라 공제액이 크게
                  다르다는 것입니다. 배우자는 6억 원, 성년 자녀는 5천만 원의 공제를 받지만, 기타
                  친족은 1천만 원만 공제됩니다. 또한 <strong>10년 내 합산 규칙</strong>이 있어 분할
                  증여 시 전략적 절세가 가능합니다.
                </p>
                <p className="text-text-secondary">
                  본 계산기는 기본적인 5가지 관계(배우자, 성년 자녀, 미성년 자녀, 부모, 기타 친족)와
                  신고세액공제 3%를 지원합니다. 부부합산, 구 세법 비교 선택, 특수 특례 등은 세무사
                  상담을 권장합니다.
                </p>
              </section>

              {/* 증여재산공제 및 10년 합산 */}
              <section aria-label="증여재산공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  증여재산공제 (10년 합산, 상증세법 §53)
                </h2>
                <p className="mb-4 text-text-secondary">
                  증여세에서 가장 중요한 개념은 <strong>10년 합산 공제</strong>입니다. 같은 증여자로부터
                  10년 이내에 받은 모든 증여에 대해 공제를 합산하여 적용합니다.
                </p>

                <h3 className="mb-3 text-lg font-semibold text-text-primary">관계별 공제액</h3>
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">관계</th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          공제액
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['배우자', '6억 원'],
                        ['성년 직계비속(자녀·손자·증손)', '5천만 원'],
                        ['미성년 직계비속', '2천만 원'],
                        ['직계존속(부모·조부모·증조부모)', '5천만 원'],
                        ['기타 친족(형제자매·며느리·사위 등)', '1천만 원'],
                      ].map(([relation, deduction]) => (
                        <tr key={relation} className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">{relation}</td>
                          <td className="px-3 py-2 text-right font-medium text-primary-500">
                            {deduction}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">10년 합산 규칙</h3>
                <p className="mb-3 text-sm text-text-secondary">
                  <strong>예시:</strong> 배우자로부터 연 2억씩 4년에 걸쳐 8억을 받은 경우
                </p>
                <ul className="mb-6 space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>1년차:</strong> 2억 받음 → 공제 2억 → 과표 0 → 세금 0
                  </li>
                  <li>
                    <strong>2년차:</strong> 추가 2억 받음 → 누적 4억, 공제 4억 → 과표 0 → 세금 0
                  </li>
                  <li>
                    <strong>3년차:</strong> 추가 2억 받음 → 누적 6억, 공제 6억 → 과표 0 → 세금 0
                  </li>
                  <li>
                    <strong>4년차:</strong> 추가 2억 받음 → 누적 8억, 공제 6억(한도) → 과표 2억 →
                    세금 2천만(10%)
                  </li>
                </ul>
                <p className="text-sm text-text-secondary">
                  이처럼 10년 내에 공제 한도를 초과하면 초과분만 과세되므로, 10년 분할 증여는 매우
                  효과적인 절세 전략입니다(단, 정확한 계산과 신고는 세무사 상담 필수).
                </p>
              </section>

              {/* 증여세 세율 */}
              <section aria-label="세율 체계" className="card">
                <h2 className="mb-4 text-2xl font-semibold">증여세 세율 (상증세법 §26)</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  공제 후의 과세표준에 따라 5단계 누진세율이 적용됩니다.
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

              {/* 부담부증여 */}
              <section aria-label="부담부증여" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  부담부증여 개념 (상증세법 §47, §55)
                </h2>
                <p className="mb-4 text-text-secondary">
                  부담부증여는 증여자가 지닌 채무를 수증자(받는 사람)가 인수(대신 갚기로 약정)하는
                  경우를 말합니다. 이 경우 <strong>증여재산 가액에서 채무액을 차감</strong>하여 과세
                  대상을 줄일 수 있습니다.
                </p>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">부담부증여 예시</h3>
                <ul className="mb-6 space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>상황:</strong> 부모가 자녀에게 아파트를 증여하는데, 아파트의 담보대출이
                    1억 원 남아 있는 경우
                  </li>
                  <li>
                    <strong>아파트 공정시장가액:</strong> 5억 원
                  </li>
                  <li>
                    <strong>남은 대출금:</strong> 1억 원
                  </li>
                  <li>
                    <strong>과세 대상:</strong> 5억 - 1억 = 4억 원
                  </li>
                  <li>
                    <strong>공제 적용:</strong> 성년 자녀 5천만 원
                  </li>
                  <li>
                    <strong>과세표준:</strong> 4억 - 5천만 = 3.5억 원
                  </li>
                  <li>
                    <strong>세액:</strong> (3.5억 × 20%) - 1,000만 = 7,000 - 1,000 = 6,000만 원
                  </li>
                </ul>

                <p className="text-sm text-text-secondary">
                  <strong>주의:</strong> 부담부증여 시 채무의 증거(대출 계약서, 등기부등본 등)를
                  보관해야 하며, 정확한 채무액 계산은 세무사 상담이 필수입니다.
                </p>
              </section>

              {/* 신고세액공제 */}
              <section aria-label="신고세액공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">신고세액공제 3% (상증세법 §68)</h2>
                <p className="mb-4 text-text-secondary">
                  증여세는 기한 내에 자진신고하는 경우 산출세액의 <strong>3%를 공제</strong>해줍니다.
                  신고 기한은 <strong>증여일이 속하는 달 말일부터 3개월</strong>입니다.
                </p>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">신고 기한 예시</h3>
                <ul className="mb-6 space-y-1 text-sm text-text-secondary">
                  <li>• 증여일 2026년 3월 15일 → 신고 기한: 2026년 6월 30일</li>
                  <li>• 증여일 2026년 12월 25일 → 신고 기한: 2027년 3월 31일</li>
                </ul>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">신고세액공제 계산</h3>
                <p className="mb-3 text-sm text-text-secondary">
                  <strong>예시:</strong> 산출세액이 6,000만 원이면
                </p>
                <ul className="mb-6 space-y-1 text-sm text-text-secondary">
                  <li>• 신고세액공제 = 6,000만 × 3% = 180만 원</li>
                  <li>• 최종 납부액 = 6,000만 - 180만 = 5,820만 원</li>
                </ul>

                <p className="text-sm text-text-secondary">
                  <strong>기한 초과 시:</strong> 신고 기한을 넘기면 신고세액공제를 받을 수 없고,
                  가산세(20%)와 납부 지연 이자가 부과됩니다. 따라서 증여 후 가능한 한 빨리 신고하는
                  것이 절세의 기본입니다.
                </p>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>10년 합산 원칙의 복잡성:</strong> 정확한 10년 합산 과세는 기증여 당시의
                    과세표준과 세율까지 반영하여 재계산해야 합니다. 단순 합산이 아니므로 복잡한 케이스
                    (여러 번의 분할 증여, 기증여 세율 변화 등)는 반드시 세무사 상담을 받으세요.
                  </li>
                  <li>
                    <strong>부동산 증여 시 취득세 별도 부과:</strong> 증여세 외에도 취득세(1~3%)가
                    별도로 부과됩니다. 예: 5억 원 부동산 증여 시 취득세만 5천만~1.5억 추가 발생.
                  </li>
                  <li>
                    <strong>관계 판정 신중히:</strong> 배우자와 직계비속의 공제액이 크게 다르므로,
                    관계를 정확히 증명해야 합니다. 법률혼 배우자만 배우자 공제를 받을 수 있습니다.
                  </li>
                  <li>
                    <strong>공정시장가액 평가:</strong> 부동산, 주식, 비상장주식 등의 경우 공정시장가액
                    평가가 중요합니다. 낮게 평가하면 세무조사 대상이 될 수 있으므로 전문가 평가를
                    권장합니다.
                  </li>
                  <li>
                    <strong>2026년 세율 기준:</strong> 본 계산은 2026년 세율로 계산됩니다. 세법 개정
                    시 변경될 수 있으므로 거래 전 최신 정보를 확인하세요.
                  </li>
                </ul>
              </section>

              {/* 절세 팁 */}
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">절세·활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>배우자 활용:</strong> 배우자는 공제가 6억으로 가장 크므로, 배우자 증여를
                    먼저 검토하세요. 부부가 협력하면 자녀 증여보다 훨씬 적은 세금으로 재산 이전이
                    가능합니다.
                  </li>
                  <li>
                    <strong>10년 분할 증여:</strong> 공제 한도 내에서 여러 해에 걸쳐 나누어 증여하면
                    세금을 완전히 피할 수 있습니다. 예: 자녀에게 연 5천만씩 2년에 걸쳐 증여하면 세금
                    0.
                  </li>
                  <li>
                    <strong>미성년 자녀 주의:</strong> 미성년 자녀는 공제가 2천만 원으로 낮으므로, 가능
                    하면 성년 후 증여하는 것이 절세입니다. 예: 자녀 나이 만 20세 도달 후 증여.
                  </li>
                  <li>
                    <strong>신고 기한 준수:</strong> 신고 기한 내 신고 시 3% 공제를 받습니다. 예: 1억
                    세금이면 300만 원을 절약합니다.
                  </li>
                  <li>
                    <strong>상속과의 비교:</strong> 증여세와 상속세 납부 시점과 금액을 모두 계산하여
                    중장기 재산 계획을 세우세요. 전문가 상담으로 최적 시점 결정.
                  </li>
                </ul>
              </section>

              {/* 신고 기한 및 절차 */}
              <section aria-label="신고 기한" className="card">
                <h2 className="mb-3 text-2xl font-semibold">신고 기한 및 절차</h2>
                <p className="mb-3 text-sm text-text-secondary">
                  증여세는 증여일이 속하는 달 말일부터 3개월 이내에 신고·납부해야 합니다(상증세법
                  §48, 상증세 시행령 §41).
                </p>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">신고 기한 계산</h3>
                <p className="mb-4 text-sm text-text-secondary">
                  <strong>예시:</strong> 2026년 3월 15일 증여 → 3월 31일(달 말일) → 4개월 달력
                  <br />
                  4월 30일 → 5월 31일 → 6월 30일(신고 기한)
                </p>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">신고 제출처</h3>
                <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                  <li>• 관할 세무서(증여자 주소지 기준)</li>
                  <li>• 온라인: 홈택스(hometax.go.kr)</li>
                </ul>

                <p className="text-sm text-text-secondary">
                  <strong>기한 초과 시:</strong> 가산세 20% + 납부 지연 이자(연 6~12%) 부과. 자진
                  신고 시에도 초과 기간에 대한 이자는 발생합니다.
                </p>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
