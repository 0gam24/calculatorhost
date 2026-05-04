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
  buildWebPageJsonLd,
  buildHowToJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';
import { ChildTaxCreditCalculator } from './ChildTaxCreditCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/child-tax-credit/';

export const metadata: Metadata = {
  title: '자녀장려금 계산기 2026 | 자녀 1인당 100만 | calculatorhost',
  description:
    '2026년 자녀장려금 계산기. 가구 유형(홑벌이·맞벌이)·연소득(4,300만원 이하)·자녀 수를 입력하면 월 지급액과 연간 자녀장려금(CTC)을 즉시 계산합니다. 저소득 가구 정부 지원금 확인 필수.',
  alternates: { canonical: URL },
  openGraph: {
    title: '자녀장려금 계산기 2026 — 자녀 1인당 100만원',
    description:
      '가구 유형, 연소득, 자녀 수로 자녀장려금(CTC)을 즉시 계산합니다.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '자녀장려금 계산기 2026',
    description:
      '자녀장려금 즉시 계산: 가구 유형, 연소득, 자녀 수로 지급액 확인.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자녀장려금이 무엇인가요?',
    answer:
      '자녀장려금(CTC, Child Tax Benefit)은 저소득 가구의 18세 미만 자녀가 있을 때 정부에서 지급하는 지원금입니다. 조세특례제한법 §100의3에 따라 운영되며, 자녀 1인당 연 100만원을 기준으로 가구 소득에 따라 지급액이 결정됩니다. 근로장려금과 달리, 자녀가 있는 가구를 직접 지원하는 제도입니다.',
  },
  {
    question: '누가 자녀장려금 대상인가요?',
    answer:
      '자녀장려금은 홑벌이 또는 맞벌이 가구 중 (1) 연 총소득이 4,300만원 이하, (2) 재산이 2.4억원 미만, (3) 18세 미만 자녀가 있는 경우 대상입니다. 단, 소득이 3,600만원 이하면 자녀당 100만원을 전액 받고, 3,600~4,300만원 구간에서는 소득에 따라 감액 지급됩니다. 단독가구(부양가족 없는 1인)는 대상이 아니며, 대신 근로장려금 대상으로 별도 확인이 필요합니다.',
  },
  {
    question: '자녀에는 누가 포함되나요?',
    answer:
      '자녀장려금의 자녀는 "청약신청일 기준 18세 미만"인 직계비속을 의미합니다. 생년월일로 판단하며, 입양아도 포함됩니다. 미성년자여도 혼인했거나 근로소득이 있으면 제외될 수 있으니 국세청에 문의하세요. 또한 배우자 명의 자녀도 인정되는 경우가 많으므로, 정확한 기준은 종합소득세 신고 시 국세청에 확인하는 것이 안전합니다.',
  },
  {
    question: '재산 기준은 어떻게 되나요?',
    answer:
      '자녀장려금 수급을 위한 재산 기준은 2.4억원입니다. 이는 과세표준(실제 신고 재산액)을 기준으로 판단되며, 주택, 토지, 금융자산 등 모든 재산이 포함됩니다. 재산이 정확히 얼마인지 불명확하면, 국세청 홈택스에서 "재산세과세명세서"를 확인하거나 세무서에 문의하세요. 재산 2.4억원 초과 시 자녀장려금을 받을 수 없습니다.',
  },
  {
    question: '소득이 3,600~4,300만원 구간이면 얼마를 받나요?',
    answer:
      '3,600~4,300만원 구간에서는 선형 감액 방식이 적용됩니다. 감액률 = (소득 - 3,600만) / 700만. 예를 들어, 4,000만원 소득에 자녀 1명이면: 감액률 = (4,000만 - 3,600만) / 700만 ≈ 0.571 (57.1%), 지급액 = 100만 × (1 - 0.571) = 약 42.9만원입니다. 정확한 계산은 이 계산기를 이용하거나 국세청에 확인하세요.',
  },
  {
    question: '배우자 소득도 포함되나요?',
    answer:
      '자녀장려금 계산 시 "연 총소득"은 부부(배우자)가 함께 벌어들인 모든 소득을 합산합니다. 따라서 배우자가 있으면 배우자의 근로소득, 사업소득, 기타소득까지 모두 포함되어 총소득이 높아질 수 있습니다. 맞벌이 가구라면 두 사람의 소득을 모두 합쳐서 4,300만원 기준을 적용하세요.',
  },
  {
    question: '자녀장려금을 신청하려면 어떻게 해야 하나요?',
    answer:
      '자녀장려금은 매년 5월의 종합소득세 신고 기간에 함께 신청합니다. 국세청 홈택스(hometax.go.kr)에 로그인해 "신고 > 종합소득세" 메뉴에서 신청하거나, 세무서에 직접 방문해 신청할 수 있습니다. 모바일 택스(Mobile Tax) 앱을 통해서도 신청 가능합니다. 신고 후 약 2-3개월 뒤 국세청에서 계좌로 지급됩니다.',
  },
  {
    question: '근로장려금과 자녀장려금의 차이는 뭔가요?',
    answer:
      '근로장려금(EITC)은 저소득 근로자·자영업자에게 근로 장려를 위해 지급하고, 자녀장려금은 저소득 가구의 자녀 양육을 지원하기 위해 지급합니다. 소득 기준, 자녀 여부, 신청 방식 등이 다르므로, 본인이 두 제도 모두 수급 가능한지 국세청에 문의해 더 유리한 제도를 선택하세요.',
  },
];

const RELATED = [
  {
    href: '/calculator/salary',
    title: '연봉 실수령액',
    description: '세금·보험료 공제 후 실제 수령액',
  },
  {
    href: '/calculator/n-jobber-insurance',
    title: 'N잡러 건강보험',
    description: '부업 시 추가 건보료 계산',
  },
  {
    href: '/calculator/freelancer-tax',
    title: '프리랜서 종합소득세',
    description: '프리랜서 세금 계산',
  },
];

export default function ChildTaxCreditPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '자녀장려금 계산기',
    description:
      '가구 유형(홑벌이·맞벌이), 연소득(4,300만원 이하), 자녀 수를 입력해 월 지급액과 연간 자녀장려금(CTC)을 즉시 계산합니다.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자녀장려금 계산기 2026',
    description: '자녀장려금 즉시 계산: 가구 유형, 연소득, 자녀 수로 지급액 확인',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: '자녀장려금 계산기 사용 방법',
    description: '가구 유형, 연소득, 자녀 수를 입력하여 자녀장려금(CTC)을 계산하는 단계별 가이드',
    steps: [
      { name: '가구 유형 선택', text: '홑벌이 가구 또는 맞벌이 가구 중 해당하는 유형을 선택합니다.' },
      { name: '가구 연 총소득 입력', text: '지난해 종합소득세 신고액 또는 예상 연소득을 입력합니다(4,300만원 이하).' },
      { name: '자녀 수 입력', text: '18세 미만 자녀 수를 입력합니다.' },
      { name: '자녀장려금 자동 계산', text: '입력한 정보로 월 지급액과 연간 자녀장려금이 자동 계산됩니다.' },
      { name: '지급액 및 신청 안내 확인', text: '예상 지급액과 신청 방법을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '근로', url: 'https://calculatorhost.com/category/work/' },
    { name: '자녀장려금' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <div className="flex min-h-screen flex-col bg-bg-base text-text-primary">
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
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-4xl">
            {/* 헤더 */}
            <Breadcrumb
              items={[
                { name: '홈', href: '/' },
                { name: '세금', href: '/category/tax/' },
                { name: '자녀장려금' },
              ]}
            />
            <h1 className="text-4xl font-bold tracking-tight">
              자녀장려금 계산기 2026
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              가구 유형, 연 총소득, 18세 미만 자녀 수로 자녀장려금을 즉시 계산하세요.
              저소득 가구의 자녀 양육을 지원하는 국가 지원금을 확인할 수 있습니다.
            </p>
            <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />

            {/* Structured Summary */}
            <StructuredSummary
              definition="자녀장려금은 18세 미만 자녀가 있는 저소득 가구에 지급하는 정부 지원금입니다. 조세특례제한법 §100의3에 따라 자녀 1인당 연 100만원을 기준으로, 가구 소득과 재산 기준에 따라 지급액이 결정됩니다."
              table={{
                caption: '자녀장려금 소득 구간별 지급',
                headers: ['소득 구간', '지급액'],
                rows: [
                  ['3,600만원 이하', '자녀당 100만원 (전액)'],
                  ['3,600~4,300만원', '감액 (소득에 따라)'],
                  ['4,300만원 초과', '0원 (지급 불가)'],
                ],
              }}
              tldr={[
                '자녀 1인당 기본 100만원입니다.',
                '소득과 자녀 수에 따라 지급액이 결정됩니다.',
                '재산 2.4억원 기준을 충족해야 합니다.',
              ]}
            />

            {/* AD-1 헤더 광고 */}
            <div className="my-8">
              <AdSlot slot="child-tax-credit-top" format="horizontal" />
            </div>

            {/* 계산기 폼 */}
            <ChildTaxCreditCalculator />

            {/* AD-2 중간 광고 */}
            <div className="my-8">
            </div>

            {/* FAQ */}
            <FaqSection items={FAQ_ITEMS} />

            {/* 자녀장려금이란 섹션 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">자녀장려금이란 무엇인가요?</h2>
              <p>
                자녀장려금(CTC, Child Tax Benefit)은 18세 미만의 자녀가 있는
                저소득 가구를 지원하는 정부 지원금입니다. 조세특례제한법 §100의3에
                따라 운영되며, 근로소득이나 사업소득이 있으면서 자녀를 양육하는
                가구의 세금 부담을 덜어주기 위해 설계되었습니다. 자녀장려금은
                종합소득세 신고 시에 신청하며, 심사를 거쳐 지급됩니다.
              </p>
              <p>
                2026년 기준으로 자녀 1인당 연 100만원을 기본으로 지급하지만,
                가구의 소득이 높아질수록 감액되거나 지급되지 않을 수 있습니다.
                또한 재산 기준도 있어, 재산이 2.4억원을 초과하면 수급 대상에서
                제외됩니다.
              </p>
            </section>

            {/* 지급 조건 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">자녀장려금 지급 조건</h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-primary-500 mb-3">
                    1. 가구 유형
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>✓ 홑벌이 가구 (1인 근로)</li>
                    <li>✓ 맞벌이 가구 (2인 이상 소득)</li>
                    <li>✗ 단독가구 (자녀장려금 대상 아님)</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-secondary-500 mb-3">
                    2. 소득 기준
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>3,600만원 이하: 자녀당 100만원 전액 지급</li>
                    <li>3,600~4,300만원: 소득에 따라 선형 감액</li>
                    <li>4,300만원 초과: 지급 불가</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-secondary">
                    ⚠️ 배우자 소득도 포함됨
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-highlight-500 mb-3">
                    3. 자녀 기준
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>청약신청일 기준 18세 미만</li>
                    <li>입양아 포함</li>
                    <li>배우자 명의 자녀도 포함될 수 있음</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-secondary">
                    ⚠️ 혼인 또는 근로소득이 있으면 제외 가능
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-danger-500 mb-3">
                    4. 재산 기준
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>재산(과세표준) 2.4억원 미만</li>
                    <li>주택, 토지, 금융자산 등 모두 포함</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-secondary">
                    ⚠️ 재산세 과세명세서로 확인 가능
                  </p>
                </div>
              </div>
            </section>

            {/* AD-4 인피드 광고 */}
            <div className="my-8">
            </div>

            {/* 신청 및 지급 절차 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">신청 및 지급 절차</h2>
              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold mb-2">1단계: 신청 (5월)</h3>
                  <p className="text-sm text-text-secondary">
                    매년 5월 종합소득세 신고 기간에 국세청 홈택스(hometax.go.kr)
                    또는 세무서에서 신청합니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-secondary-500 bg-bg-card p-4">
                  <h3 className="font-semibold mb-2">2단계: 심사 (5~6월)</h3>
                  <p className="text-sm text-text-secondary">
                    국세청에서 소득, 자녀, 재산 기준을 확인하여 수급 자격을
                    심사합니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-highlight-500 bg-bg-card p-4">
                  <h3 className="font-semibold mb-2">3단계: 지급 (7~8월)</h3>
                  <p className="text-sm text-text-secondary">
                    심사 완료 후 지정된 계좌로 지급됩니다 (약 2-3개월 소요).
                  </p>
                </div>
              </div>
            </section>

            {/* 필요 서류 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">신청 시 필요 서류</h2>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  ✓ 소득증명서 (근로소득, 기타소득 모두 포함)
                </li>
                <li>
                  ✓ 가족관계증명서 또는 건강보험료 청구서 (자녀 확인)
                </li>
                <li>
                  ✓ 재산세 과세명세서 (재산 확인)
                </li>
                <li>
                  ✓ 배우자가 있으면 배우자 소득증명서
                </li>
              </ul>
              <p className="text-xs text-text-secondary mt-4">
                ⚠️ 정확한 서류는 세무서에 문의하세요.
              </p>
            </section>

            {/* 관련 계산기 */}
            <RelatedCalculators items={RELATED} />

            {/* 업데이트 로그 */}
            <section className="mt-12 border-t border-border-base pt-6">
              <h2 className="text-lg font-semibold">업데이트 로그</h2>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>2026-04-24: 초판 발행 (2026 조세특례제한법 기준)</li>
              </ul>
            </section>

            {/* 면책조항 */}
            <section className="mt-6 border-t border-border-base pt-6">
              <p className="text-xs text-text-secondary">
                본 계산기는 참고용입니다. 실제 자녀장려금 지급액은 국세청의 심사 결과에
                따라 달라질 수 있습니다. 자녀 기준, 소득 범위, 재산 범위 등 복잡한
                규칙이 있으므로, 정확한 수급 여부는 국세청(hometax.go.kr) 또는
                세무서에 문의하세요. 본 서비스는 법률·세무 조언이 아닙니다.
              </p>
            </section>
          </article>
        </main>

        {/* AD-3 우측 스티키 광고 (lg+ 이상) */}
        <aside className="hidden w-80 bg-bg-base p-4 lg:block">
          <div className="sticky top-[5rem]">
          </div>
        </aside>
      </div>
      <Footer />

      {/* JSON-LD 스크립트 */}
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
    </div>
  );
}
