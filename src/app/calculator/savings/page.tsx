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
} from '@/lib/seo/jsonld';
import { SavingsCalculator } from './SavingsCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/savings/';

export const metadata: Metadata = {
  title: '적금 이자 계산기 2026 | 세후 수령액 비교 | calculatorhost',
  description:
    '2026년 이자소득세 15.4% 반영 적금 계산기. 월 납입금과 기간, 이자 방식을 입력해 단리·복리별 세후 이자와 만기 수령액을 즉시 확인. 세금우대·비과세까지 반영.',
  alternates: { canonical: URL },
  openGraph: {
    title: '적금 이자 계산기 2026 — 세후 수령액 비교',
    description: '월 납입금과 기간, 이자 방식을 입력해 단리·복리별 세후 이자와 만기 수령액을 즉시 비교.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '적금 이자 계산기 2026',
    description: '단리·월복리·세후 수령액을 즉시 비교 계산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '적금 단리와 복리 중 어떤 게 유리한가요?',
    answer:
      '복리는 "이자에 붙는 이자"를 계산하므로 단리보다 이자가 더 많습니다. 기간과 이자율이 높을수록 그 차이가 커집니다. 예를 들어 월 100만원, 연 3.5%, 2년 적금의 경우 단리는 약 41만원, 월복리는 약 42만원의 이자를 받으므로 약 1만원의 차이가 발생합니다. 장기 적금일수록 복리가 유리합니다.',
  },
  {
    question: '적금 이자소득세 15.4%는 어떻게 구성되나요?',
    answer:
      '일반 적금의 이자소득세는 이자소득세 14% + 지방소득세(이자세의 10%) 1.4% = 합계 15.4%입니다. 이는 소득세법 §129에 따른 표준 세율입니다(2026년 기준). 예를 들어 세전 이자가 100만원이면 세금은 약 15만 4천원이므로 세후 이자는 약 84만 6천원입니다.',
  },
  {
    question: '세금우대 종합저축 조건은?',
    answer:
      '세금우대 종합저축(소득세율 9.5%)은 조세특례제한법 §89의2에 따른 상품입니다. 일정 소득 이하·가입 한도·최소 저축 기간 등 조건이 있으며, 은행별로 상이합니다. 세금우대 상품 이용 시 반드시 은행에 가입 조건을 확인하세요. 조건을 충족하지 않으면 일반과세(15.4%)가 적용됩니다.',
  },
  {
    question: '청년도약계좌·ISA는 비과세인가요?',
    answer:
      '네, 청년도약계좌와 ISA(개인종합자산관리계좌) 등 특정 상품은 조세특례제한법 §91 등에 따라 이자소득이 비과세됩니다. 다만 각 상품별로 가입 조건(나이·소득·투자기간)과 한도가 다르므로, 가입 전 금융기관에 자격 여부를 확인해야 합니다.',
  },
  {
    question: '월복리와 일복리는 차이가 큰가요?',
    answer:
      '본 계산기는 월복리(월 1회 복리 적용)를 기준으로 합니다. 일복리(연 1회 또는 만기일시 복리)와의 차이는 상품·은행마다 다르지만, 일반적으로 월복리가 약간 더 유리합니다. 실제 적금 상품은 은행별로 적용 방식이 다르므로 정확한 이자는 가입 전 은행에 확인하세요.',
  },
  {
    question: '중도해지하면 이자는 어떻게 되나요?',
    answer:
      '중도해지 시 이자는 약정 이자율이 아닌 대폭 낮은 "중도해지 이율"이 적용됩니다(보통 약정 이율의 50~70%). 또한 위약금이 발생할 수 있습니다. 예를 들어 12개월 적금을 6개월 만에 해지하면, 예정 이자 대신 훨씬 낮은 이자만 받게 됩니다. 중도해지를 계획하신다면 반드시 은행에 중도해지 조건을 확인하세요.',
  },
] as const;

const RELATED = [
  { href: '/calculator/deposit', title: '예금 이자', description: '정기예금 이자' },
  { href: '/calculator/loan', title: '대출이자', description: '상환방식별 월상환액' },
  { href: '/calculator/salary', title: '연봉 실수령액', description: '세후 월급' },
];

export default function SavingsPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '적금 이자 계산기',
    description: '2026년 이자소득세 15.4% 반영 적금 계산기. 월 납입금과 기간, 이자 방식을 입력해 단리·복리별 세후 이자와 만기 수령액을 즉시 확인.',
    url: URL,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance/' },
    { name: '적금' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '적금 이자 계산하기',
    description: '월 납입금, 연 이자율, 가입 기간을 입력해 세후 만기 수령액을 계산하는 방법',
    steps: [
      { name: '월 납입금 입력', text: '정기적으로 저축할 월 납입금을 입력합니다.' },
      { name: '연 이자율 입력', text: '은행 또는 상품의 연 이자율(%)을 입력합니다.' },
      { name: '가입 기간 선택', text: '적금 가입 기간(개월)을 입력합니다.' },
      { name: '이자 방식 선택', text: '단리 또는 월복리 중 선택합니다.' },
      { name: '과세 방식 선택', text: '일반과세·세금우대·비과세 중 선택하면 즉시 계산됩니다.' },
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
                    { name: '금융', href: '/category/finance/' },
                    { name: '적금 이자' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  적금 이자 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  매월 납입할 금액, 연 이자율, 가입 기간을 입력하면 단리·월복리 방식별 세후
                  이자와 만기 수령액을 즉시 계산합니다. 이자소득세(일반과세 15.4%·세금우대
                  9.5%·비과세)를 실시간으로 반영합니다.
                </p>
                <AuthorByline dateModified="2026-04-24" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="적금은 일정 기간 동안 정기적으로 일정 금액을 저축하여 만기일에 원금과 이자를 받는 금융상품입니다. 이자는 단리(원금에만 붙는 이자) 또는 월복리(매월 이자에 붙는 이자)로 계산되며, 세후 수익률은 이자소득세(일반 15.4%, 세금우대 9.5%, 비과세)에 따라 달라집니다(소득세법 §129, 조세특례제한법 §89의2·§91)."
                table={{
                  caption: '세율 유형별 이자소득세',
                  headers: ['세율 유형', '세율'],
                  rows: [
                    ['일반과세', '15.4%'],
                    ['세금우대', '9.5%'],
                    ['비과세', '0%'],
                    ['단리 기초 (월 100만×12개월×3.5%)', '약 20.5만원'],
                  ],
                }}
                tldr={[
                  '단리: 이자 = 월납입금 × 연이율 × n(n+1)/2 / 12',
                  '월복리: 이자 = 월납입금 × ((1+r)^n - 1) / r × (1+r) - 원금',
                  '이자소득세 = 이자 × 세율 (일반 15.4% / 세금우대 9.5% / 비과세 0%)',
                  '세후 수령액 = 원금 + (이자 - 세금)',
                ]}
              />

              <AdSlot slot="savings-top" format="horizontal" />

              {/* 계산기 */}
              <SavingsCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 적금이란 무엇인가 */}
              <section aria-label="적금 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">적금이란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  적금은 일정 기간 동안 정해진 금액을 매달 저축하고, 만기일에 원금과 이자를 받는
                  금융상품입니다. 은행이나 저축은행에서 제공하며, 안정적인 수익과 규칙적인 저축
                  습관을 동시에 얻을 수 있습니다(금융감독원 금융상식 기준).
                </p>
                <p className="mb-4 text-text-secondary">
                  적금의 이자는 두 가지 방식으로 계산됩니다. 첫째, 단리는 원금에만 이자를 계산하는
                  방식으로 계산이 간단하고 예측 가능합니다. 둘째, 월복리는 매월 붙은 이자에 다시
                  이자가 붙는 방식으로 기간이 길거나 이자율이 높을수록 단리보다 더 많은 이자를
                  얻을 수 있습니다.
                </p>
                <p className="text-text-secondary">
                  적금 이자에는 세금이 부과됩니다. 일반 적금은 이자소득세 14% + 지방소득세 1.4% =
                  15.4%가 적용되며, 세금우대 상품은 9.5%, ISA나 청년도약계좌 등 특정 상품은
                  비과세입니다. 실제 수익률은 세금을 고려하여 계산해야 합니다.
                </p>
              </section>

              {/* 단리 vs 월복리 */}
              <section aria-label="단리 vs 월복리" className="card">
                <h2 className="mb-4 text-2xl font-semibold">단리 vs 월복리</h2>
                <p className="mb-4 text-text-secondary">
                  적금 이자 계산 방식에는 단리와 월복리 두 가지가 있습니다. 각각의 특징과 차이를
                  이해하면 더 유리한 상품을 선택할 수 있습니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <caption className="sr-only">단리와 월복리 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">구분</th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">단리</th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">월복리</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">정의</td>
                        <td className="px-4 py-3 text-text-secondary">원금에만 이자 적용</td>
                        <td className="px-4 py-3 text-text-secondary">매월 이자에 이자 적용</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">이자 계산</td>
                        <td className="px-4 py-3 text-text-secondary">이자 = 원금 × 연율 × 기간</td>
                        <td className="px-4 py-3 text-text-secondary">이자 = 원금 × ((1+r)^n - 1) / r</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">이자 규모</td>
                        <td className="px-4 py-3 text-text-secondary">상대적 낮음</td>
                        <td className="px-4 py-3 text-text-secondary">상대적 높음</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">차이 크기</td>
                        <td colSpan={2} className="px-4 py-3 text-text-secondary">기간과 이율이 클수록 차이 증가</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">예시</td>
                        <td className="px-4 py-3 text-text-secondary">월 100만 × 12개월 × 3.5% = 이자 약 20.5만</td>
                        <td className="px-4 py-3 text-text-secondary">월 100만 × 12개월 × 3.5% = 이자 약 21.3만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary">
                  <strong>결론:</strong> 월복리가 단리보다 항상 유리하지만, 그 차이는 상품과 조건에 따라
                  다릅니다. 대부분의 정기적금은 단리를 기본으로 하며, 일부 상품(ISA, 세금우대저축 등)에서는
                  월복리 또는 선택 가능한 형태로 제공됩니다. 상품 선택 시 은행에 계산 방식을 확인하세요.
                </p>
              </section>

              {/* 이자소득세 방식 */}
              <section aria-label="이자소득세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">이자소득세 3가지 방식</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-subtle p-4">
                    <h3 className="font-semibold text-text-primary mb-2">1) 일반과세 (15.4%)</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      대부분의 일반 적금이 해당합니다. 이자소득세 14% + 지방소득세(이자세의 10%) 1.4% =
                      15.4%가 적용됩니다(소득세법 §129, 지방세법).
                    </p>
                    <p className="text-caption text-text-tertiary">
                      예: 이자 100만원 → 세금 15.4만원 → 세후 84.6만원
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-subtle p-4">
                    <h3 className="font-semibold text-text-primary mb-2">2) 세금우대 (9.5%)</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      세금우대 종합저축, 세금우대저축(조세특례제한법 §89의2) 등 특정 상품입니다. 이자소득세
                      9.0% + 지방소득세 0.9% = 9.5%가 적용됩니다. 단, 일정 소득 이하·가입 한도·최소 기간
                      등 조건이 있습니다.
                    </p>
                    <p className="text-caption text-text-tertiary">
                      예: 이자 100만원 → 세금 9.5만원 → 세후 90.5만원
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-subtle p-4">
                    <h3 className="font-semibold text-text-primary mb-2">3) 비과세 (0%)</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      ISA(개인종합자산관리계좌), 청년도약계좌 등 정부 지원 상품입니다(조세특례제한법 §91 등).
                      이자소득세가 전혀 부과되지 않습니다. 가입 조건과 한도가 제한적입니다.
                    </p>
                    <p className="text-caption text-text-tertiary">
                      예: 이자 100만원 → 세금 0원 → 세후 100만원
                    </p>
                  </div>
                </div>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기는 표준 단리·월복리 공식을 기반으로 하며, 실제 적금 상품은 은행별로
                    우대금리·선택형 상품·특판 상품 등이 다를 수 있습니다. 정확한 이자는 적금 신청
                    전 은행에 확인하세요.
                  </li>
                  <li>
                    중도해지 시 약정 이자율이 아닌 대폭 낮은 중도해지 이율이 적용되며, 위약금이
                    발생할 수 있습니다. 예정 기간까지 유지할 수 있을 때 적금을 신청하세요.
                  </li>
                  <li>
                    세금우대 상품은 가입 조건(연소득 한도, 나이, 거주지, 총 가입액 한도 등)이
                    있습니다. 조건을 충족하지 않으면 일반과세(15.4%)가 소급적용됩니다.
                  </li>
                  <li>
                    ISA나 청년도약계좌의 비과세는 일정 기간 보유 등 조건에 따라 달라질 수 있습니다.
                    가입 전 금융기관에 전체 조건과 제한사항을 확인하세요.
                  </li>
                  <li>
                    본 계산기는 교육·참고용 도구이며, 개인의 최종 투자 결정을 대체하지 않습니다.
                    실제 적금은 금융기관의 정보공시서와 상품설명서를 확인한 후 신청하세요.
                  </li>
                </ul>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>단리 정기적금</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      세전 이자 = 월납입금 × (연이자율 ÷ 100) × n × (n+1) ÷ 2 ÷ 12<br />
                      n = 가입 개월수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      각 월 납입분이 서로 다른 기간 동안 이자를 받습니다. 첫 납입분은 n개월 동안,
                      마지막 납입분은 1개월 동안 이자를 받으므로, 이를 합산하면 n(n+1)/2 공식이
                      도출됩니다(소득세법 §14, §129).
                    </p>
                  </li>
                  <li>
                    <strong>월복리 정기적금</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      월이자율 r = 연이자율 ÷ 12 ÷ 100<br />
                      만기 원리금 = 월납입금 × ((1+r)^n - 1) ÷ r × (1+r)<br />
                      세전 이자 = 만기 원리금 - (월납입금 × n)
                    </p>
                    <p className="mt-2 text-text-secondary">
                      매월 납입분이 복합적으로 이자를 받습니다. (1+r)은 월초 납입을 가정한 조정입니다.
                      r = 0인 경우 이자는 0입니다.
                    </p>
                  </li>
                  <li>
                    <strong>이자소득세 계산</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      세금 = 세전 이자 × 세율 (일반 15.4% / 세금우대 9.5% / 비과세 0%)<br />
                      세후 이자 = 세전 이자 - 세금<br />
                      세후 수령액 = 원금 + 세후 이자
                    </p>
                    <p className="mt-2 text-text-secondary">
                      모든 계산 결과는 10원 단위로 절사합니다(세금 표준 처리).
                    </p>
                  </li>
                </ol>
              </section>

              {/* 활용 팁 */}
              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>단리 vs 월복리 비교</strong>: 본 계산기로 동일 조건에서 두 방식을 비교하여,
                    상품별로 어떤 방식이 적용되는지 파악하고 선택하세요.
                  </li>
                  <li>
                    <strong>이자율 비교</strong>: 여러 은행의 이자율을 입력해 비교하세요. 0.1%~0.5%의
                    차이도 장기·고액 적금에서는 수십만원 차이가 납니다.
                  </li>
                  <li>
                    <strong>기간별 계산</strong>: 6개월, 12개월, 24개월, 36개월 등 다양한 기간으로
                    계산해 유동성과 수익률을 균형있게 계획하세요.
                  </li>
                  <li>
                    <strong>월 납입액 조정</strong>: 월 10만원, 50만원, 100만원 등으로 변경해가며
                    자신의 생활 패턴에 맞는 적금액을 찾으세요.
                  </li>
                  <li>
                    <strong>세금 검토</strong>: 세금우대·비과세 상품 자격이 있다면 세전·세후 이자
                    차이를 비교해 최적의 상품을 선택하세요. 예: 일반 vs 세금우대 = 약 5.9% 수익률 향상.
                  </li>
                  <li>
                    <strong>규칙적 저축</strong>: 적금은 강제적 저축 효과가 있습니다. 중도해지 페널티를
                    감수하지 않으려면 확실한 금액으로 시작하세요.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 초판 공개 (단리·월복리·일반과세·세금우대·비과세 지원)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §14(이자소득), §129(이자소득세), 조세특례제한법
                  §89의2(세금우대종합저축), §91(비과세 저축성 보험료·ISA 등). 참고: <a href="https://www.bok.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">한국은행</a>, <a href="https://finlife.fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">금감원 금융상품 한눈에</a>.
                </p>
                <p>
                  본 계산기의 결과는 교육·참고용이며 법적 효력이 없습니다. 실제 적금은 은행별로
                  우대금리·수수료·계산 방식이 상이하므로 적금 신청 전 금융기관에 정확한 이자를 확인하시기
                  바랍니다. 중도해지 시 이율과 위약금은 계산에 포함되지 않습니다.
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
