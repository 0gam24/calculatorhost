import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/inheritance-tax-deduction-limit-2026/';
const DATE_PUBLISHED = '2026-06-30';
const DATE_MODIFIED = '2026-06-30';

export const metadata: Metadata = {
  title: '상속세 공제 한도 2026 | 얼마까지 면제되나? 배우자·자녀공제 완벽 정리 | calculatorhost',
  description:
    '상속세를 안 내는 한도는? 일괄공제 5억·배우자공제 최소 5억·자녀공제 종합 정리. 배우자 있으면 10억까지 면제 가능. 상증세법 §18~§21.',
  keywords: [
    '상속세 공제',
    '상속공제 한도',
    '배우자 상속공제',
    '일괄공제 5억',
    '자녀공제',
    '상속세 면제',
    '상증세법 18조',
    '2026 상속공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속세 공제 한도 2026 | 배우자·자녀공제 완벽 가이드' }],
    title: '상속세 공제 한도 2026',
    description: '배우자 있으면 최소 10억까지 상속세 면제 가능. 공제 종류별 한도 총정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '배우자가 있으면 상속세를 안 내나요?',
    answer:
      '배우자공제(최소 5억)와 일괄공제(5억)를 합치면 최소 10억원까지 공제됩니다. 상속재산이 10억 이하면 공제 후 과세표준이 0이 되어 상속세가 없을 가능성이 높습니다. 다만 신고는 여전히 필수입니다.',
  },
  {
    question: '기초공제 2억과 일괄공제 5억은 뭐가 다른가요?',
    answer:
      '기초공제는 모든 상속에 자동 적용되는 2억원이고, 일괄공제는 기초공제·배우자·미성년자·장애인공제를 합산하여 그 중 큰 금액(최소 5억)을 선택하는 방식입니다. 실무에서는 대부분 일괄공제 5억이 선택됩니다.',
  },
  {
    question: '미성년 자녀가 있으면 몇 살까지 공제되나요?',
    answer:
      '미성년자공제는 만 20세까지입니다. 상속 시점부터 20세까지 남은 해마다 1,000만원씩 공제됩니다. 예: 만 15세 자녀 → 5년 × 1,000만 = 5,000만원 공제.',
  },
  {
    question: '배우자공제가 최소 5억, 최대 30억이라는데 어떻게 결정되나요?',
    answer:
      '배우자가 받는 상속재산액과 배우자의 법정상속분을 고려하여 결정됩니다. 대부분의 경우 법정상속분(배우자 약 50%) 한도 내에서 실제 상속액에 따라 5억~30억 사이에서 결정됩니다.',
  },
  {
    question: '자녀가 없으면 자녀공제를 못 받는다고 들었는데, 손자는?',
    answer:
      '상속인이 아닌 손자가 상속을 받는 경우는 복잡합니다. 손자의 기여도, 법정상속분 등에 따라 달라지므로, 반드시 세무사와 상담해야 합니다.',
  },
  {
    question: '연로자공제 65세 이상도 공제되나요?',
    answer:
      '네, 피상속인이 65세 이상이면 연로자공제(1인당 5,000만원)를 받을 수 있습니다. 다만 기초공제와 일괄공제 중 더 큰 것을 선택하는 방식이므로, 일괄공제 5억 이상이면 연로자공제는 실질적으로 적용되지 않을 수 있습니다.',
  },
  {
    question: '금융재산 상속공제는 뭔가요?',
    answer:
      '금융재산상속공제(상증세법 §22)는 순금융재산의 20%를 공제하는 제도로, 최대 2억원까지입니다. 순금융재산(금융자산 − 금융부채)이 2,000만원 이하면 전액 공제됩니다. 은행 예금, 주식, 펀드 등이 해당합니다.',
  },
];

export default function InheritanceTaxDeductionLimit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속세 공제 한도 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속세 공제 한도 2026 — 얼마까지 면제될까?',
    description:
      '상속공제 5가지 종류와 한도를 한눈에 파악. 배우자 있으면 최소 10억까지 면제 가능. 상증세법 §18~§21 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속공제', '상속세', '면제 한도', '공제액', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속세 공제 한도 2026',
    description:
      '상속공제 5가지와 각 한도를 명확히 정리. 배우자, 자녀, 미성년자, 장애인, 금융재산 공제 완전 해설.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '상속세 공제 한도 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자산가·은퇴 준비층 · 9분 읽기 · 2026-06-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속세 공제 한도 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 얼마까지 상속세가 안 나올까?</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  상속이 발생하면 가장 먼저 알아야 할 것은 "상속세를 얼마나 내야 하는가"가 아니라, "이 공제로 얼마까지 면제될까"입니다. 상속공제는 상증세법 §18~§21에서 규정하며, 배우자가 있고 가족 구성이 적절하면 10억원 이상을 공제받아 상속세를 완전히 면할 수도 있습니다. 이 가이드는 5가지 상속공제의 한도를 명확하게 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-inheritance-tax-deduction-limit-top" format="horizontal" />

              <section className="space-y-6">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">상속공제 5가지 한도 한눈에</h2>
                <p data-speakable>
                  상속공제는 <strong>상증세법 §18~§21</strong>에서 규정하는 5가지 공제를 의미합니다. 이 중에서 <strong>가장 유리한 방식을 선택</strong>하여 적용합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-sm text-text-secondary mb-3 text-left">상증세법 §18~§21에 따른 5가지 상속공제 한도</caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-card">
                        <th scope="col" className="text-left p-3 font-semibold">공제 이름</th>
                        <th scope="col" className="text-left p-3 font-semibold">한도</th>
                        <th scope="col" className="text-left p-3 font-semibold">대상·조건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">기초공제 (§18)</td>
                        <td className="p-3">2억원</td>
                        <td className="p-3">모든 상속 자동 적용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">배우자공제 (§19)</td>
                        <td className="p-3">최소 5억~최대 30억</td>
                        <td className="p-3">배우자만 (배우자 법정상속분 한도 내)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">자녀·미성년자·연로자·장애인공제 (§20)</td>
                        <td className="p-3">자녀 5천만/미성년 연 1천만/65세 이상 5천만/장애인 기대여명연수×1천만</td>
                        <td className="p-3">각 직계비속 및 조건별</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">일괄공제 (§21)</td>
                        <td className="p-3">기초공제+기타공제 vs <strong>5억원 중 큼</strong></td>
                        <td className="p-3">기초공제, 배우자공제, 자녀공제 합산 후 선택</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">금융재산상속공제 (§22)</td>
                        <td className="p-3">순금융재산의 20%, 최대 2억</td>
                        <td className="p-3">금융재산 2천만 이하면 전액</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="text-sm text-text-primary font-semibold mb-2">핵심 통념</p>
                  <p className="text-sm text-text-secondary">
                    배우자와 자녀가 있으면 <strong>일괄공제 5억 + 배우자공제 최소 5억 = 최소 10억원</strong>까지 공제됩니다. 상속재산이 10억 이하면 대부분 상속세가 발생하지 않습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">공제 1: 기초공제 2억원 (§18)</h2>
                <p data-speakable>
                  모든 상속에 기본 적용되는 공제입니다. 피상속인이 누구든, 상속인이 누구든 항상 2억원이 공제됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">공제 한도</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">상속공제액: <strong>2억원</strong>(고정)</span>
                    <span className="block">법적 근거: 상증세법 §18</span>
                  </p>
                </div>
                <p className="mt-4">
                  기초공제는 상속재산이 클수록 상대적으로 의미가 작아집니다. 예를 들어 상속재산이 100억이면 2억은 2% 정도의 공제효과이지만, 상속재산이 5억이면 40% 정도의 공제효과가 됩니다.
                </p>
                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 다만:</strong> 기초공제는 대부분 일괄공제(5억) 선택에 의해 실무적으로 생략됩니다. 즉, 기초공제 2억 vs 기타공제 합산액이 5억을 넘으면 5억이 공제되기 때문입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">공제 2: 배우자공제 (§19) — 상속의 핵심</h2>
                <p data-speakable>
                  배우자만 받을 수 있는 공제입니다. <strong>최소 5억원부터 최대 30억원</strong>까지이며, 배우자의 법정상속분과 실제 상속액에 따라 결정됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">공제 한도 결정 방식</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">기본: 배우자가 받는 상속재산액 전액 공제</span>
                    <span className="block">최소: 5억원 (배우자가 받는 금액이 5억 미만이어도 최소 5억 공제)</span>
                    <span className="block">최대: 30억원 (배우자의 법정상속분 한도)</span>
                    <span className="block">대부분의 경우: 배우자 법정상속분 약 50% × 상속재산 ≈ 최종 공제액</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">배우자공제 단계별 예시</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block"><strong>경우 1: 배우자가 3억을 받는 경우</strong></span>
                    <span className="block ml-4">→ 배우자공제 = max(3억, 최소 5억) = <strong>5억원</strong> 적용</span>
                    <span className="block mt-2"><strong>경우 2: 배우자가 15억을 받는 경우</strong></span>
                    <span className="block ml-4">→ 배우자공제 = <strong>15억원</strong> 적용 (법정상속분 한도 내)</span>
                    <span className="block mt-2"><strong>경우 3: 상속재산 30억, 배우자 법정상속분 약 15억</strong></span>
                    <span className="block ml-4">→ 배우자공제 = <strong>15억원</strong> (법정상속분 30억 × 50% = 15억이 한도)</span>
                  </p>
                </div>
                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 복잡한 부분:</strong> 배우자공제는 배우자의 법정상속분, 실제 상속액, 다른 상속인(자녀)의 구성에 따라 달라집니다. 정확한 계산은 세무사와 협의하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">공제 3: 자녀·미성년자·연로자·장애인공제 (§20)</h2>
                <p data-speakable>
                  배우자를 제외한 직계비속(자녀, 손자 등) 상황에 따른 공제들입니다. 각각이 <strong>개별적으로 적용</strong>되며, 일괄공제 선택 시 반영됩니다.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">자녀공제 (1인당 5,000만원)</h3>
                    <p className="text-sm text-text-secondary">
                      직계비속 자녀 1명마다 5,000만원씩 공제됩니다. 성년·미성년 관계없이 기본 5,000만원이 적용되며, 미성년이면 추가로 미성년자공제가 중복 적용됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">미성년자공제 (1인당 연 1,000만원, 20세까지)</h3>
                    <p className="text-sm text-text-secondary">
                      만 20세 미만 자녀는 상속 시점부터 20세까지 남은 해마다 1,000만원씩 추가 공제됩니다. 예: 만 15세 → 20세까지 5년 × 1,000만 = 5,000만원 추가.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">연로자공제 (65세 이상 1인당 5,000만원)</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>피상속인이</strong> 65세 이상이면 1인당 5,000만원 공제됩니다. 이는 자녀공제와 중복될 수 있지만, 일괄공제 5억이 대부분 선택되므로 실무에서는 큰 영향이 적습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">장애인공제 (1인당 기대여명연수 × 1,000만원)</h3>
                    <p className="text-sm text-text-secondary">
                      상속인(자녀 등)이 장애인이면 <strong>기대여명</strong>(국세청이 정한 평균 수명 − 현재 나이)년수 × 1,000만원씩 공제됩니다. 예: 40세 장애인 기대여명 40년 → 4,000만원 공제.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">§20 공제 계산 예시</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block"><strong>배우자(60세) + 자녀 2명(성년), 자녀 1명(16세)</strong></span>
                    <span className="block ml-4">성년 자녀 2명: 5,000만 × 2 = 1억</span>
                    <span className="block ml-4">16세 자녀: 5,000만 + (20−16) × 1,000만 = 9,000만</span>
                    <span className="block ml-4"><strong>총 §20 공제: 1.9억</strong></span>
                    <span className="block mt-2">→ 일괄공제 선택: max(기초공제 2억 + §20 공제 1.9억, <strong>5억</strong>) = <strong>5억 선택</strong></span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 주의:</strong> 이들 공제는 <strong>일괄공제 5억과 비교하여 큰 것을 선택</strong>하므로, 대부분 일괄공제가 선택됩니다. 자녀가 많거나 미성년자가 여럿이어야 일괄공제를 초과합니다.
                </p>
              </section>

              <AdSlot slot="guide-inheritance-tax-deduction-limit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">공제 4: 일괄공제 5억원 (§21) — 실무 주요 공제</h2>
                <p data-speakable>
                  <strong>기초공제(2억) + §20 인적공제 합계 vs 5억원 중 큰 금액</strong>을 선택하는 공제입니다. 실무에서는 대부분 일괄공제 5억이 선택됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">일괄공제 선택 로직</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block"><strong>Step 1:</strong> 기초공제(2억) + 자녀공제 + 미성년자공제 + 연로자공제 + 장애인공제 합계</span>
                    <span className="block"><strong>Step 2:</strong> Step 1과 5억원 중 큰 금액 선택</span>
                    <span className="block mt-2 font-semibold">결과: 대부분 5억원 선택 (배우자공제는 별도)</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">일괄공제 vs 기타공제 비교</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block"><strong>경우 1: 배우자 + 자녀 2명 (성년)</strong></span>
                    <span className="block ml-4">기초공제 2억 + 자녀 1억 = 3억</span>
                    <span className="block ml-4">vs 일괄공제 5억 → <strong>일괄공제 5억 선택</strong></span>
                    <span className="block mt-2"><strong>경우 2: 자녀 5명 (모두 성년)</strong></span>
                    <span className="block ml-4">기초공제 2억 + 자녀 2.5억 = 4.5억</span>
                    <span className="block ml-4">vs 일괄공제 5억 → <strong>일괄공제 5억 선택</strong></span>
                    <span className="block mt-2"><strong>경우 3: 자녀 6명 + 미성년자 여럿</strong></span>
                    <span className="block ml-4">기초공제 2억 + 자녀 3억 + 미성년 1.5억 = 6.5억</span>
                    <span className="block ml-4">vs 일괄공제 5억 → <strong>기타공제 6.5억 선택</strong> (드문 사례)</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">공제 5: 금융재산상속공제 (§22) — 정기예금·주식</h2>
                <p data-speakable>
                  금융재산(은행 예금, 주식, 펀드 등)이 있으면 순금융재산의 20%를 공제하는 제도입니다. 최대 2억원까지이며, 금융재산이 많을수록 유리합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">금융재산상속공제 한도</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block"><strong>공제액</strong> = min(순금융재산 × 20%, 2억원)</span>
                    <span className="block"><strong>순금융재산</strong> = 금융자산 − 금융부채</span>
                    <span className="block"><strong>금융자산:</strong> 은행 예금, 적금, 정기예금, 주식, 펀드, 채권 등</span>
                    <span className="block"><strong>금융부채:</strong> 카드론, 신용대출 등</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">금융재산상속공제 계산 예시</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block"><strong>경우 1: 금융자산 2,000만원</strong></span>
                    <span className="block ml-4">순금융재산 2,000만 × 20% = 400만 (min 400만, 2억)</span>
                    <span className="block ml-4">→ 금융재산상속공제 = <strong>400만원</strong></span>
                    <span className="block mt-2"><strong>경우 2: 금융자산 5억원</strong></span>
                    <span className="block ml-4">순금융재산 5억 × 20% = 1억 (min 1억, 2억)</span>
                    <span className="block ml-4">→ 금융재산상속공제 = <strong>1억원</strong></span>
                    <span className="block mt-2"><strong>경우 3: 금융자산 15억원</strong></span>
                    <span className="block ml-4">순금융재산 15억 × 20% = 3억 (min 3억, 2억 최대)</span>
                    <span className="block ml-4">→ 금융재산상속공제 = <strong>2억원</strong> (한도 도달)</span>
                  </p>
                </div>
                <p className="mt-4">
                  금융재산상속공제는 다른 상속공제와 <strong>중복 적용</strong>됩니다. 즉, 일괄공제 5억과 금융재산상속공제 1억을 함께 받을 수 있습니다.
                </p>
                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 다만:</strong> 금융재산이 2,000만원 이하면 전액 공제되므로, 정기예금이나 단기 금융상품이 많으면 활용해볼 가치가 있습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">최종 공제액 합산 — 실제 사례</h2>
                <p data-speakable>
                  모든 공제를 합산하면 실제로 얼마를 공제받을 수 있는지 확인해봅시다.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary text-sm mb-3">사례 1: 배우자 생존, 자녀 2명, 상속재산 12억</p>
                    <p className="text-sm text-text-secondary space-y-2">
                      <span className="block"><strong>상속인:</strong> 배우자(60세) + 자녀 2명(성년)</span>
                      <span className="block"><strong>상속재산:</strong> 12억 (금융 1억 포함)</span>
                      <span className="block mt-2"><strong>공제 계산:</strong></span>
                      <span className="block ml-4">배우자공제 = 배우자 법정상속분 약 6억</span>
                      <span className="block ml-4">일괄공제 = max(기초 2억 + 자녀 1억, 5억) = 5억</span>
                      <span className="block ml-4">금융재산상속공제 = 1억 × 20% = 2,000만</span>
                      <span className="block mt-2"><strong>총 공제액 = 6억 + 5억 + 2,000만 = 11.2억</strong></span>
                      <span className="block"><strong>과세표준 = 12억 − 11.2억 = 8,000만</strong></span>
                      <span className="block"><strong>상속세 ≈ 8,000만 × 10% = 800만원</strong></span>
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                    <p className="font-semibold text-text-primary text-sm mb-3">사례 2: 배우자 없음, 자녀 3명, 상속재산 15억</p>
                    <p className="text-sm text-text-secondary space-y-2">
                      <span className="block"><strong>상속인:</strong> 자녀 3명(모두 성년)</span>
                      <span className="block"><strong>상속재산:</strong> 15억 (금융 2억 포함)</span>
                      <span className="block mt-2"><strong>공제 계산:</strong></span>
                      <span className="block ml-4">배우자공제 = 없음</span>
                      <span className="block ml-4">일괄공제 = max(기초 2억 + 자녀 1.5억, 5억) = 5억</span>
                      <span className="block ml-4">금융재산상속공제 = 2억 × 20% = 4,000만</span>
                      <span className="block mt-2"><strong>총 공제액 = 5억 + 4,000만 = 5.4억</strong></span>
                      <span className="block"><strong>과세표준 = 15억 − 5.4억 = 9.6억</strong></span>
                      <span className="block"><strong>상속세 = 9.6억 × 30% − 6,000만 = 2.88억 − 6,000만 = 2.28억원</strong></span>
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                    <p className="font-semibold text-text-primary text-sm mb-3">사례 3: 배우자 생존, 미성년 자녀 포함, 상속재산 9억</p>
                    <p className="text-sm text-text-secondary space-y-2">
                      <span className="block"><strong>상속인:</strong> 배우자 + 자녀 2명(15세, 18세)</span>
                      <span className="block"><strong>상속재산:</strong> 9억</span>
                      <span className="block mt-2"><strong>공제 계산:</strong></span>
                      <span className="block ml-4">배우자공제 = 배우자 법정상속분 약 4.5억 (min 5억) = 5억</span>
                      <span className="block ml-4">일괄공제 = max(기초 2억 + 자녀 1억 + 미성년 3,000만, 5억) = 5억</span>
                      <span className="block ml-4">금융재산상속공제 = 없음 (금융자산 없음)</span>
                      <span className="block mt-2"><strong>총 공제액 = 5억 + 5억 = 10억</strong></span>
                      <span className="block"><strong>과세표준 = 9억 − 10억 = 0 (음수는 0)</strong></span>
                      <span className="block"><strong>상속세 = 0원 (세금 없음)</strong></span>
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>핵심 통념:</strong> 배우자가 있고 상속재산이 10억 이하면 대부분 상속세가 발생하지 않습니다. 배우자 없이 자산이 크면 세금이 급증하므로 사전 계획이 필수입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">동거주택 상속공제·가업상속공제</h2>
                <p data-speakable>
                  특수한 경우에 적용되는 상속공제입니다. 요건이 까다로우므로 해당되면 반드시 세무사와 상담하세요.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">동거주택 상속공제 (§23의2)</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      피상속인과 <strong>동거</strong>하던 주택을 상속받을 때 일정 금액을 공제하는 제도입니다.
                    </p>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 공제액: 주택 평가액의 80%(최대 6억원)</li>
                      <li>• 요건: 피상속인과 동거, 주택 상속인이 10년 보유</li>
                      <li>• 한계: 공제가 크지만 요건(동거, 장기 보유)이 매우 까다로움</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">가업상속공제</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      피상속인이 영위하던 사업을 상속인이 <strong>계속 운영</strong>할 때 공제하는 제도입니다.
                    </p>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 공제액: 가업 가액의 일정 비율(최대 수십억)</li>
                      <li>• 요건: 상속인이 영업 계속, 일정 기간 보유</li>
                      <li>• 한계: 사업 규모, 업종, 상속인 경험에 따라 복잡함</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 주의:</strong> 동거주택·가업상속공제는 정책 변경이 빈번합니다. 해당되면 반드시 최신 세무사 상담을 받으세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6 border-t border-border-base pt-8 border-l-2 border-primary-500 pl-3">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 & 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산·공제·세율을 직접 입력해서 최종 납부세액 계산</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산부터 과세표준·세율 적용까지 5단계 완벽 해설</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 vs 증여세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자 있을 땐 상속이 유리. 배우자 없을 땐? 비교 분석</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자·자녀 증여공제 적용해서 증여세 시뮬레이션</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 면제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자 6억, 자녀 5,000만원씩 10년마다 공제</p>
                  </Link>
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금 가이드 전체</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·종부세 등 다른 세금도 확인</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 상속공제는 가족 구성, 자산 규모, 배우자 여부에 따라 크게 달라집니다. 실제 상속이 발생하면 반드시 세무사·회계사와 상담 후 신고하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었습니다.
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>법적 근거:</strong> 상속세 및 증여세법 §18(기초공제)·§19(배우자공제)·§20(자녀·미성년자·연로자·장애인공제)·§21(일괄공제)·§22(금융재산상속공제)·§23의2(동거주택상속공제)
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>업데이트:</strong> 2026-06-30 작성. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="상속세 공제 한도 2026"
                url={URL}
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
