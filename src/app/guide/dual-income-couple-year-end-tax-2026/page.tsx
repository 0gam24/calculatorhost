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

const URL = 'https://calculatorhost.com/guide/dual-income-couple-year-end-tax-2026/';
const DATE_PUBLISHED = '2026-07-07';
const DATE_MODIFIED = '2026-07-07';

export const metadata: Metadata = {
  title: '맞벌이 부부 연말정산 공제 배분 전략 2026 | 누가 받으면 절세할까',
  description:
    '맞벌이 부부는 부양가족·의료비·신용카드 공제를 전략적으로 배분하면 절세 가능. 소득세법 §50 인적공제, §59의2 자녀세액공제 등 배분 기준과 구체 계산법 정리.',
  keywords: [
    '맞벌이 연말정산',
    '부양가족 공제 배분',
    '의료비 세액공제',
    '자녀세액공제',
    '신용카드 소득공제',
    '소득세법 50조',
    '연말정산 절세',
    '부부 공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '맞벌이 부부 연말정산 공제 배분 전략 2026' }],
    title: '맞벌이 부부 연말정산 공제 배분 전략 — 누가 어떤 공제를 받아야 절세할까',
    description: '부양가족 인적공제·의료비·자녀세액공제를 부부 중 누가 받느냐에 따라 절세액이 크게 달라집니다. 전략적 배분법을 배우세요.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '맞벌이 부부 연말정산 공제 배분 전략 2026',
    description: '부양가족·의료비·자녀세액공제 배분으로 수백만원 절세 가능. 전략 A vs B 비교.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부양가족 공제를 반드시 한 명이 독점해야 하나요?',
    answer:
      '네, 부양가족 1명에 대한 인적공제(소득세법 §50)는 배우자 둘 중 한 명만 받을 수 있습니다(중복공제 금지). 따라서 부부 중 한계세율이 높은 사람이 받는 것이 절세 효과가 큽니다. 예를 들어 남편이 과세표준 5,000만원 구간(세율 15%, 누진공제 126만)이고 아내가 2,000만원 구간(세율 6%)이면, 남편이 부모 인적공제 150만원을 받으면 22.5만원 절세(150만×15%), 아내가 받으면 9만원 절세(150만×6%)로 차이가 큽니다.',
  },
  {
    question: '의료비 세액공제 기준인 3%를 누가 기준으로 잡아야 하나요?',
    answer:
      '의료비 세액공제(소득세법 §59의4)는 각자 본인의 총급여를 기준으로 3% 초과분을 공제받습니다. 같은 의료비 300만원이라도, 남편 총급여 6,000만원(3% = 180만)보다 아내 총급여 3,000만원(3% = 90만)인 경우 아내가 공제받으면 초과분이 더 커집니다. 즉 소득이 낮은 배우자 명의로 의료비 영수증을 받는 것이 유리할 수 있습니다.',
  },
  {
    question: '자녀세액공제는 누가 받나요?',
    answer:
      '자녀세액공제(소득세법 §59의2)는 부양가족 기본공제를 받는 배우자만 신청할 수 있습니다. 즉 부양가족 인적공제를 남편이 받기로 했다면, 자녀세액공제도 남편이 받아야 합니다. 따라서 인적공제 배분을 정할 때 자녀세액공제 신청권도 함께 고려해야 합니다.',
  },
  {
    question: '신용카드 소득공제도 배분이 가능한가요?',
    answer:
      '신용카드 소득공제(조특법 §126의2)는 실제 카드 사용 명의자만 공제받을 수 있습니다(조특법 §126의2). 각자의 신용카드 사용액이 총급여 25% 초과분에 대해서만 공제되므로, 예를 들어 남편 총급여 6,000만원(25% = 1,500만) 기준과 아내 총급여 3,000만원(25% = 750만) 기준이 다릅니다. 소득이 낮은 배우자가 카드를 더 많이 쓰면 25% 기준이 낮아져 공제액이 커질 수 있습니다.',
  },
  {
    question: '연금계좌 납입액(IRP·연금보험료)도 배분해야 하나요?',
    answer:
      '아니요. 연금계좌 납입액은 각자 본인 명의 계좌에 납입한 금액만 본인이 공제받을 수 있습니다(소득세법 §50의2). 배우자에게 이전할 수 없으므로 배분 전략이 불필요합니다. 각자가 독립적으로 연금계좌를 관리하고 공제받으면 됩니다.',
  },
  {
    question: '맞벌이 부부가 실제로 절세를 하려면 어떻게 해야 하나요?',
    answer:
      '국세청 홈택스(hometax.go.kr)에서 "간편한 연말정산" 또는 "환급액 모의계산" 기능을 사용해 배분 시나리오 A(남편이 인적공제)와 B(아내가 인적공제)를 직접 입력해보세요. 그 결과 환급액(또는 납부액)이 더 많은 배분을 선택하면 됩니다. 또는 관할 세무서에 문의하면 상담원이 최적 배분을 제시해주기도 합니다.',
  },
  {
    question: '지난해 배분과 올해 배분을 달리할 수 있나요?',
    answer:
      '네, 가능합니다. 매년 연말정산 때마다 새로운 배분을 할 수 있습니다. 다만 공제 신청 후 나중에 번복하려면 수정세무신고를 해야 하므로 신중하게 결정하는 것이 좋습니다.',
  },
  {
    question: '부양가족 중복공제를 실수로 했으면 어떻게 하나요?',
    answer:
      '중복공제 적용 시 가산세가 부과될 수 있습니다(국세기본법 §47). 실수를 발견했다면 즉시 수정세무신고(원천징수영수증 수정 또는 당초신고 변경)를 하는 것이 좋습니다. 관할 세무서에 먼저 전화로 상황을 설명하고 절차를 안내받으세요.',
  },
];

export default function DualIncomeCoupleYearEndTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '맞벌이 부부 연말정산 공제 배분 전략 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '맞벌이 부부 연말정산 공제 배분 전략 2026 — 누가 어떤 공제를 받아야 절세할까',
    description:
      '부양가족 인적공제, 의료비 세액공제, 자녀세액공제를 전략적으로 배분하면 맞벌이 부부는 수백만원대 절세 가능. 소득세법 §50·§59의2 배분 기준과 실제 계산 사례 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['맞벌이 연말정산', '공제 배분', '절세 전략', '의료비 공제', '자녀세액공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '맞벌이 부부 연말정산 공제 배분 전략 2026',
    description: '부양가족, 의료비, 자녀세액공제의 전략적 배분으로 절세하는 방법.',
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
                    { name: '맞벌이 부부 연말정산 공제 배분 전략 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 부부 · 11분 읽기 · 2026-07-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  맞벌이 부부 연말정산
                  <br />
                  <span className="text-2xl text-text-secondary">— 공제 배분으로 수백만원 절세하는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  맞벌이 부부는 연말정산 때 부양가족 공제, 의료비 세액공제, 자녀세액공제를 누가 받을지 선택할 수 있습니다. 이 결정이 실수하면 같은 지출을 했는데도 세금을 수백만원 더 낼 수도 있고, 반대로 똑같이 절세할 수도 있다는 뜻입니다. 이 가이드는 어떤 공제를 누가 받으면 유리한지, 실제 계산법은 무엇인지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-dual-income-couple-year-end-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">맞벌이 부부 연말정산, 왜 배분이 중요한가</h2>
                <p>
                  일반적으로 연말정산은 한 가구의 가장이 모든 가족 공제를 받는 구조였습니다. 하지만 맞벌이 부부는 두 명 모두 근로소득이 있으므로, 각자의 소득세를 독립적으로 계산합니다. 문제는 부양가족 인적공제(소득세법 §50)나 자녀세액공제(소득세법 §59의2) 같은 일부 공제는 배우자 둘 중 한 명만 받을 수 있다는 점입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">공제 배분의 핵심 원칙</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    세금을 줄이는 효과 = 공제액 × 한계세율 (개인이 적용받는 세율)
                    <br />
                    같은 공제 150만원이라도, 한계세율이 6%인 사람이 받으면 9만원 절세, 24% 사람이 받으면 36만원 절세됩니다.
                    <br />
                    → <strong>한계세율이 높은 배우자가 공제를 받을수록 절세액이 커집니다.</strong>
                  </p>
                </div>
                <p className="mt-4">
                  따라서 맞벌이 부부는 간단한 시뮬레이션으로 배분 A와 배분 B의 최종 환급액(또는 납부액)을 비교해, 더 유리한 배분을 선택하는 것이 정답입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주요 공제별 배분 기준</h2>
                <p>
                  맞벌이 부부가 배분을 고려해야 할 공제들을 정리했습니다. 각각의 특성을 이해하고 전략을 세우세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 맞벌이 부부 주요 공제 배분 기준 (소득세법 기준, 2026)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배분 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배분 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">부양가족 인적공제<br />(§50)</td>
                        <td className="p-3"><strong>중복 불가</strong></td>
                        <td className="p-3">부부 중 한 명만. 한계세율 높은 쪽이 유리</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">자녀세액공제<br />(§59의2)</td>
                        <td className="p-3"><strong>중복 불가</strong></td>
                        <td className="p-3">인적공제 받는 배우자만 신청 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">의료비 세액공제<br />(§59의4)</td>
                        <td className="p-3"><strong>각자</strong></td>
                        <td className="p-3">본인 총급여의 3% 기준. 소득 낮은 쪽이 유리한 경우 多</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">신용카드 소득공제<br />(조특법 §126의2)</td>
                        <td className="p-3"><strong>각자</strong></td>
                        <td className="p-3">카드 명의자만. 총급여 25% 기준. 소득 낮은 쪽이 유리한 경우 多</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">연금계좌 납입액<br />(§50의2)</td>
                        <td className="p-3"><strong>각자</strong></td>
                        <td className="p-3">본인 명의 계좌만. 배분 불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 모든 배분이 항상 정해진 답은 아닙니다. 부부의 구체적인 소득, 공제 지출액, 총급여 구간이 다르므로, 반드시 홈택스 시뮬레이션으로 비교해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실전 공제 배분 사례</h2>
                <p>
                  다음 3가지 가상 시나리오를 통해 배분에 따른 절세 차이를 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 부모 부양 (인적공제 150만원)</p>
                  <p className="text-sm text-text-secondary">
                    상황: 부부가 함께 부모를 부양하고 있음
                    <br />
                    남편 조건: 과세표준 5,000만원 (세율 15%, 누진공제 126만)
                    <br />
                    아내 조건: 과세표준 2,500만원 (세율 6%)
                    <br />
                    <br />
                    배분 A — 남편이 인적공제 150만원 받음
                    <br />
                    절세액 = 150만원 × 15% = <strong>22.5만원</strong>
                    <br />
                    <br />
                    배분 B — 아내가 인적공제 150만원 받음
                    <br />
                    절세액 = 150만원 × 6% = <strong>9만원</strong>
                    <br />
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 배분 A가 B보다 <strong>13.5만원 더 절세</strong>. 한계세율이 높은 남편이 받는 것이 유리.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 의료비 지출 (세액공제 3% 기준)</p>
                  <p className="text-sm text-text-secondary">
                    상황: 부부가 함께 의료비 300만원 지출. 누가 영수증을 받을지 선택 가능
                    <br />
                    남편 조건: 총급여 6,000만원 (3% = 180만원)
                    <br />
                    아내 조건: 총급여 3,000만원 (3% = 90만원)
                    <br />
                    <br />
                    배분 A — 남편 명의 의료비 300만원
                    <br />
                    공제 대상액 = 300만원 - 180만원 = 120만원
                    <br />
                    세액공제 = 120만원 × 15% = 18만원 (예상)
                    <br />
                    <br />
                    배분 B — 아내 명의 의료비 300만원
                    <br />
                    공제 대상액 = 300만원 - 90만원 = 210만원
                    <br />
                    세액공제 = 210만원 × 15% = 31.5만원 (예상)
                    <br />
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 배분 B가 A보다 <strong>13.5만원 더 공제</strong>. 3% 기준이 낮은 아내가 받는 것이 유리.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 신용카드 소득공제 (25% 기준)</p>
                  <p className="text-sm text-text-secondary">
                    상황: 부부가 함께 신용카드 1,500만원 사용. 누가 카드를 더 쓸지 선택 가능
                    <br />
                    남편: 총급여 6,000만원 (25% = 1,500만원)
                    <br />
                    아내: 총급여 3,000만원 (25% = 750만원)
                    <br />
                    <br />
                    배분 A — 남편 카드 1,500만원
                    <br />
                    공제 대상액 = 1,500만원 - 1,500만원 = 0원 (기준 딱 맞음)
                    <br />
                    소득공제 = 0원
                    <br />
                    <br />
                    배분 B — 아내 카드 1,500만원
                    <br />
                    공제 대상액 = 1,500만원 - 750만원 = 750만원
                    <br />
                    절세효과 ≈ 소득공제 750만원 × 한계세율 15% = 약 112.5만원 (15% 구간 가정)
                    <br />
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 배분 B가 배분 A보다 <strong>112.5만원 더 공제</strong>. 25% 기준이 낮은 아내가 카드를 더 많이 쓰는 것이 유리.</span>
                  </p>
                </div>
                <p className="mt-4">
                  이 3가지 사례는 개념을 설명하기 위한 가상 케이스입니다. 실제로는 부부의 모든 소득, 공제, 특별공제를 함께 고려해야 최종 환급액이 결정됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한계세율이 다를 때 배분의 유불리</h2>
                <p>
                  맞벌이 부부의 절세 효과는 **부부 간 소득 격차가 크면 클수록** 커집니다. 왜냐하면 한계세율 차이가 크기 때문입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>한계세율 차이 작은 경우 (예: 둘 다 15%)</strong>: 배분 효과 미미. 공제를 누가 받든 절세액이 비슷합니다.
                  </li>
                  <li>
                    <strong>한계세율 차이 큰 경우 (예: 남편 24%, 아내 6%)</strong>: 배분 효과 극대화. 한계세율이 높은 사람이 공제를 받을수록 절세액이 크게 늘어납니다.
                  </li>
                  <li>
                    <strong>소득의 "벼랑" 근처 (예: 과세표준 1,400만원 경계)</strong>: 배분에 따라 한계세율 구간이 한 단계 올라 떨어질 수 있으므로, 배분 효과가 더욱 커질 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 한계세율만 보고 배분을 정하면 안 됩니다. 의료비 공제처럼 3% 또는 25% "기준"이 있는 경우, 기준이 낮은 배우자가 받는 것이 더 유리할 수 있기 때문입니다. 반드시 전체 공제를 함께 고려해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배분 시뮬레이션 하는 방법 (홈택스)</h2>
                <p>
                  국세청 홈택스(hometax.go.kr)에서 직접 배분을 시뮬해보면, 가장 정확한 결과를 얻을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">Step 1. 홈택스 접속 후 "간편한 연말정산" 또는 "환급액 미리보기"</p>
                  <p className="text-sm text-text-secondary">
                    홈택스의 연말정산 섹션에서 "간편한 연말정산"이라는 코너를 찾습니다. 혹은 "환급액 미리보기"에서 직접 입력할 수도 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">Step 2. 본인 정보 및 공제 입력</p>
                  <p className="text-sm text-text-secondary">
                    · 총급여, 4대보험료 입력
                    <br />
                    · 부양가족: "배우자"를 선택하고, 부양가족 공제를 **남편이 받는다고 가정**
                    <br />
                    · 의료비, 신용카드 사용액 등 입력
                    <br />
                    · 환급액(또는 납부액) 확인
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">Step 3. 배분 B 시뮬: "배우자가 부양가족 공제를 받는다"로 변경 후 재계산</p>
                  <p className="text-sm text-text-secondary">
                    · 같은 방식으로 **아내가 부양가족 공제를 받는다고 가정**하고 입력
                    <br />
                    · 환급액(또는 납부액) 재확인
                    <br />
                    · 결과 비교: 환급액이 더 많은(또는 납부액이 더 적은) 배분 선택
                  </p>
                </div>
                <p className="mt-4">
                  홈택스 시뮬은 가장 정확하므로, 이 결과를 기준으로 최종 배분을 결정하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배분 후 연말정산 신고 방법</h2>
                <p>
                  배분을 정했다면, 실제 연말정산 신고 때 이를 반영해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>직장 연말정산 (근로소득세):</strong> 직장에서 제공하는 연말정산 간편신청 서비스에 배분을 입력합니다. "부양가족 공제를 배우자(또는 본인)가 받음" 옵션을 선택하거나, 직접 기입합니다.
                  </li>
                  <li>
                    <strong>배우자 동의:</strong> 배우자도 자신의 직장 연말정산을 할 때 같은 배분을 입력해야 합니다. 부부가 다르게 입력하면 중복공제 적발 대상이 됩니다.
                  </li>
                  <li>
                    <strong>의료비·신용카드 등 각자 공제:</strong> 의료비 영수증은 공제받는 본인 명의로, 신용카드 사용액은 카드 명의자가 신고합니다.
                  </li>
                  <li>
                    <strong>특별공제 신청서:</strong> 직장에서 배우자 공제 신청 시 별도의 동의서나 확인서를 요구할 수 있으니 준비하세요.
                  </li>
                </ul>
              </section>

              <AdSlot slot="guide-dual-income-couple-year-end-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">자주 하는 실수와 주의사항</h2>
                <p>
                  맞벌이 부부 연말정산에서 흔히 저지르는 오류들입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>중복공제 함정:</strong> 배우자가 같은 부양가족을 중복으로 공제하는 경우입니다. 적발 시 가산세가 부과됩니다(국세기본법 §47). 배부터 시작해 "한 명만"이라는 원칙을 명확히 하세요.
                  </li>
                  <li>
                    <strong>의료비 고지서 혼동:</strong> 부인이 의료비를 냈는데 남편 명의로 공제 신청하는 실수. 의료비 세액공제는 실제 건강보험료를 낸 사람(또는 그 배우자)이 신청해야 합니다.
                  </li>
                  <li>
                    <strong>신용카드 영수증 분산 후 혼동:</strong> 부부가 카드를 반반씩 썼는데, 한 사람이 모두 신고하는 실수. 카드 명의자가 자신의 사용액만 공제해야 합니다.
                  </li>
                  <li>
                    <strong>매년 배분 일관성 부족:</strong> 지난해 남편이 부양가족 공제를 받았는데, 올해 갑자기 아내가 받으면서 설명 없이 신고하는 경우. 세무서에서 적발 가능성이 높습니다. 변경 이유를 명확히 할 수 있도록 기록해두세요.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">맞벌이 부부 절세 팁 종합</h2>
                <p>
                  배분 외에 맞벌이 부부가 추가로 활용할 수 있는 절세 방법들입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1. 연금계좌 활용 (각자독립)</p>
                  <p className="text-sm text-text-secondary">
                    개인retirement계좌(IRP) 또는 퇴직연금 가입자라면, 각자 **한 해 600만원까지** 추가 납입으로 세액공제를 받을 수 있습니다(소득세법 §50의2). 배분이 필요 없으므로, 소득이 낮은 배우자도 독립적으로 절세할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2. 기부금 공제 (각자독립)</p>
                  <p className="text-sm text-text-secondary">
                    법정기부금(적십자, 종교단체 등), 지정기부금에 대해 각자 기부 금액의 일부를 세액공제 받을 수 있습니다(소득세법 §34 등). 소득이 낮은 배우자가 기부하면 기부액에 대한 세액공제율은 동일하지만, 최종 환급액 계산에서 이득이 될 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3. 보험료 공제 (각자독립)</p>
                  <p className="text-sm text-text-secondary">
                    주택담보대출이자, 보험료(건강보험, 고용보험 등)는 각자 납입 금액에 대해 공제받습니다. 배분 대상이 아니므로, 최대한 많이 납입한 배우자가 모두 공제받으면 됩니다.
                  </p>
                </div>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험 및 세금 공제를 반영한 월급 확인.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산의 기본 개념부터 공제 신청까지.</p>
                  </Link>
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부양가족 인적공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">누가 공제를 받을 수 있는가, 금액은 얼마인가.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀세액공제 완전정복</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀 나이별 공제액과 신청 방법.</p>
                  </Link>
                  <Link
                    href="/guide/medical-expense-tax-credit-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">의료비 3% 기준 이해하기</div>
                    <p className="mt-1 text-sm text-text-secondary">의료비 공제 대상 및 세액공제 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 소득공제</div>
                    <p className="mt-1 text-sm text-text-secondary">25% 기준과 한도, 체크카드·현금영수증 차이.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 배분 결정, 최종 환급액, 세무 신고 방법은 직장 담당자, 관할 세무서, 또는 공인회계사와 상담하세요. 특히 중복공제, 소득 재분류, 특례 적용 등의 경우 전문가 상담이 필수입니다. 본 콘텐츠는 2026-07-07을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 맞벌이 부부 공제 배분의 정확한 기준은 <strong>소득세법 §50(기본공제), §59의2(자녀세액공제), §59의4(특별세액공제)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식 안내</a>.
                </p>
              </section>

              <ShareButtons
                title="맞벌이 부부 연말정산 공제 배분 전략 2026 가이드"
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
