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

const URL = 'https://calculatorhost.com/guide/housing-subscription-savings-deduction-2026/';
const DATE_PUBLISHED = '2026-07-03';
const DATE_MODIFIED = '2026-07-03';

export const metadata: Metadata = {
  title: '주택청약저축 소득공제 2026 | 무주택 연 300만 40% 공제',
  description:
    '주택청약종합저축 납입액의 40% 소득공제 제도. 무주택·연 7천만원 이하 조건, 연 300만원 한도, 최대 120만원 절세. 조세특례제한법 §87 기준, 2028년까지 시행.',
  keywords: [
    '주택청약저축 소득공제',
    '주택청약종합저축',
    '무주택 세대주',
    '소득공제 40%',
    '연 300만원 한도',
    '조세특례제한법 87조',
    '청약통장 절세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주택청약저축 소득공제 2026 | 무주택·연 300만 40% 공제' }],
    title: '주택청약저축 소득공제 2026 — 연 300만원 40% 공제로 최대 120만원 절세',
    description: '무주택 세대주·총급여 7천만원 이하면 주택청약종합저축 납입액의 40%를 소득공제. 계산법과 적용 조건 완전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주택청약저축 소득공제 2026 — 무주택 연 300만 40% 공제로 절세',
    description: '무주택·연소득 7천만 이하면 청약저축 납입액 300만원 한도로 40% 공제. 최대 절세 약 18~45만원.',
  },
};

const FAQ_ITEMS = [
  {
    question: '주택청약저축 소득공제가 정확히 무엇인가요?',
    answer:
      '주택청약종합저축 소득공제는 무주택 세대주가 청약저축에 낸 돈의 40%를 소득에서 차감해주는 제도입니다(조세특례제한법 §87). 예를 들어 연 300만원을 납입하면 120만원(300만원×40%)을 소득공제받아, 실제 세금을 아낄 수 있습니다. 이 혜택은 2028년 12월 31일까지 시행됩니다.',
  },
  {
    question: '누가 주택청약저축 소득공제를 받을 수 있나요?',
    answer:
      '①근로소득이 있고 ②총급여액이 연 7천만원 이하며 ③과세기간 중 주택을 소유하지 않은 세대주(또는 세대주의 배우자)여야 합니다(조세특례제한법 §87). 즉, 무주택이어야 하고, 월급 또는 임금으로 소득을 얻는 직장인이어야 합니다. 사업소득자는 별도 기준이 적용될 수 있습니다.',
  },
  {
    question: '연 300만원 한도는 왜 정해졌나요?',
    answer:
      '청약저축은 무주택자의 주택마련을 지원하는 정책 저축이므로, 일정 한도 내에서만 세제 혜택을 제공합니다. 연 300만원은 월 약 25만원씩 저축하는 수준이며(2024년 240만원에서 상향), 이는 근로자의 합리적 저축 규모로 정책입안자가 판단한 것입니다.',
  },
  {
    question: '소득공제 vs 세액공제, 어떻게 다르나요?',
    answer:
      '소득공제는 세금을 계산하기 전 소득에서 빼주는 것이고, 세액공제는 계산된 세금에서 직접 빼줍니다. 주택청약저축은 소득공제이므로, 절세액은 공제액×한계세율입니다. 예: 소득공제 120만원×15% 한계세율 = 절세 약 18만원입니다.',
  },
  {
    question: '무주택확인서를 꼭 제출해야 하나요?',
    answer:
      '네, 반드시 제출해야 합니다(조세특례제한법 §87). 청약저축 가입은행에 무주택확인서를 제출하지 않으면 소득공제를 받을 수 없습니다. 소득공제를 받으려는 해의 다음연도 2월 말까지 제출하면 그 해의 납입액이 공제됩니다.',
  },
  {
    question: '청약에 당첨되어 집을 샀다면 공제가 계속 되나요?',
    answer:
      '아니요, 주택 당첨·전용 또는 국민주택규모(85㎡) 초과 주택 당첨 시 추징됩니다. 또한 해당 해부터 무주택이 아니므로 그 이후 납입액은 소득공제 대상이 되지 않습니다(조세특례제한법 §87 부칙). 5년 이내 해지 시에도 감면세액이 추징될 수 있습니다.',
  },
  {
    question: '총급여 7천만원을 초과하면 공제를 못 받나요?',
    answer:
      '네, 총급여액이 7천만원을 초과하는 과세기간에는 소득공제 대상이 되지 않습니다(조세특례제한법 §87). 예를 들어 중도입사로 인해 해당 연도 총급여가 7천만원을 넘으면 그 해는 공제를 받지 못합니다. 다음 해에 다시 7천만원 이하가 되면 공제를 받을 수 있습니다.',
  },
  {
    question: '세대주가 아닌 배우자가 청약저축을 하면 공제받을 수 있나요?',
    answer:
      '배우자도 소득공제를 받을 수 있습니다(조세특례제한법 §87). 다만 배우자의 총급여액이 7천만원 이하이고 무주택확인서를 제출해야 합니다. 부부가 각각 최대 연 300만원씩 공제받을 수 있으므로, 가구 전체로는 연 600만원까지 소득공제가 가능합니다.',
  },
];

export default function HousingSubscriptionSavingsDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택청약저축 소득공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주택청약저축 소득공제 2026 — 무주택 세대주 연 300만원 40% 공제로 최대 120만원 절세',
    description:
      '주택청약종합저축 납입액의 40% 소득공제 제도. 무주택·연 7천만원 이하 직장인 대상, 연 300만원 한도, 최대 120만원 소득공제, 최대 약 45만원 절세 가능. 계산법, 적용 조건, 추징 위험까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주택청약저축', '소득공제', '무주택', '40%', '300만원'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주택청약저축 소득공제 2026',
    description:
      '주택청약종합저축 납입액의 40% 소득공제 제도의 대상, 한도, 계산법, 추징 규칙 완전 정리.',
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
                    { name: '주택청약저축 소득공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">무주택 세대주 · 7분 읽기 · 2026-07-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택청약저축 소득공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 무주택 연 300만 40% 공제로 최대 120만원 절세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  무주택 직장인이라면 주택청약종합저축에 돈을 넣을 때마다 일정 금액을 세금에서 깎아주는 제도가 있습니다. 바로 조세특례제한법 §87의 주택청약저축 소득공제입니다. 연 300만원까지 납입액의 40%를 소득에서 공제받아, 최대 120만원의 세금 감면 효과를 누릴 수 있습니다. 이 가이드는 공제 대상, 한도, 실제 절세액 계산법, 그리고 주의할 함정까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-housing-subscription-savings-deduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택청약저축 소득공제의 기본</h2>
                <p>
                  조세특례제한법 §87에 따르면, 무주택 세대주가 주택청약종합저축에 낸 돈의 40%를 근로소득에서 공제해줍니다. 이것은 소득공제이므로, 실제 절세액은 공제액에 개인의 한계세율을 곱한 값입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">주택청약저축 소득공제의 기본 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    소득공제액 = 연 납입액 × 40% (최대 연 300만원 한도)
                    <br />
                    절세액 = 소득공제액 × 한계세율
                    <br />
                    예: 연 300만원 납입 → 120만원 공제 → 15% 세율 적용 시 약 18만원 절세
                  </p>
                </div>
                <p className="mt-4">
                  공제 대상은 매우 구체적으로 정의됩니다. 근로소득이 있고, 총급여가 7천만원 이하이며, 그 해에 주택을 소유하지 않은 세대의 세대주 또는 배우자만 해당합니다. 개인사업자, 프리랜서, 또는 사업소득 위주인 경우는 다른 규칙이 적용될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 대상과 조건 (조세특례제한법 §87)</h2>
                <p>
                  누구나 주택청약저축 소득공제를 받을 수 있는 것은 아닙니다. 다음 모든 조건을 만족해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택청약저축 소득공제 적용 조건 (조세특례제한법 §87, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">미충족 시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>소득원천</strong></td>
                        <td className="p-3">근로소득 있음</td>
                        <td className="p-3">사업소득자는 별도 기준</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>총급여액</strong></td>
                        <td className="p-3">연 7,000만원 이하</td>
                        <td className="p-3">공제 불가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>주택소유</strong></td>
                        <td className="p-3">무주택(세대 전체)</td>
                        <td className="p-3">공제 불가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>신분</strong></td>
                        <td className="p-3">세대주 또는 배우자</td>
                        <td className="p-3">공제 불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 총급여액은 비과세 소득(월 20만원 식대 등)을 제외한 과세 대상 급여액입니다. 또한 연도 중간에 퇴직하거나 입사한 경우 그 해의 총급여액을 기준으로 판단합니다. 불명확하면 세무서에 문의하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연 300만원 한도와 실제 절세액 계산</h2>
                <p>
                  공제는 연 300만원 한도로 납입액의 40%입니다(조세특례제한법 §87). 즉, 최대 소득공제액은 120만원(300만×40%)이며, 실제 절세액은 개인의 한계세율에 따라 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 연 300만원 납입, 한계세율 15%</p>
                  <p className="text-sm text-text-secondary">
                    · 연 납입액: 300만원
                    <br />
                    · 소득공제액: 300만 × 40% = <strong>120만원</strong>
                    <br />
                    · 절세액: 120만 × 15% = <strong>약 18만원</strong>
                    <br />
                    · 지방소득세 추가: 18만 × 10% ≈ 1.8만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 총 절세 약 19.8만원(소득세+지방세)</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 연 240만원 납입, 한계세율 24%</p>
                  <p className="text-sm text-text-secondary">
                    · 연 납입액: 240만원
                    <br />
                    · 소득공제액: 240만 × 40% = <strong>96만원</strong>
                    <br />
                    · 절세액: 96만 × 24% = <strong>약 23만원</strong>
                    <br />
                    · 지방소득세 추가: 23만 × 10% ≈ 2.3만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 총 절세 약 25.3만원</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 연 120만원 납입, 한계세율 35%</p>
                  <p className="text-sm text-text-secondary">
                    · 연 납입액: 120만원
                    <br />
                    · 소득공제액: 120만 × 40% = <strong>48만원</strong>
                    <br />
                    · 절세액: 48만 × 35% = <strong>약 16.8만원</strong>
                    <br />
                    · 지방소득세 추가: 16.8만 × 10% ≈ 1.68만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 총 절세 약 18.5만원</span>
                  </p>
                </div>
                <p className="mt-4">
                  한계세율이 높을수록 절세 효과가 큽니다. 한계세율은 총급여액에 따라 결정되므로, 자신의 연봉이 높을수록 주택청약저축 공제의 절세 혜택이 더 큽니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득공제 vs 세액공제의 차이</h2>
                <p>
                  주택청약저축 공제는 소득공제이지, 세액공제가 아닙니다. 이 두 가지는 세금 감면 방식이 완전히 다릅니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>소득공제:</strong> 세금을 계산하기 전에 소득에서 일정 금액을 빼줍니다. 따라서 절세액은 공제액에 개인 한계세율을 곱한 값입니다. 주택청약저축·보험료·국민연금 등이 소득공제입니다.
                  </li>
                  <li>
                    <strong>세액공제:</strong> 계산된 세금에서 직접 일정 금액을 깎아줍니다. 절세액이 공제액과 같습니다. 자녀세액공제·근로장려금·장애인세액공제 등이 세액공제입니다.
                  </li>
                  <li>
                    <strong>절세 효과 비교:</strong> 소득공제 120만원 × 15% 한계세율 = 약 18만원 절세 vs 세액공제 120만원 = 120만원 절세. 세액공제가 훨씬 큽니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 주택청약저축은 주택마련 저축을 지원하는 정책이므로, 소득공제 형태로 설계되어 있습니다. 절세액이 크지는 않지만, 매년 꾸준히 쌓인다면 누적 효과는 상당합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무주택확인서 제출과 절차</h2>
                <p>
                  소득공제를 받으려면 반드시 무주택확인서를 청약저축 가입 은행에 제출해야 합니다(조세특례제한법 §87). 이것이 없으면 아무리 납입해도 공제를 받지 못합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">무주택확인서 제출 절차</p>
                  <p className="text-sm text-text-secondary">
                    1단계: 지방세청(위택스) 또는 시·군·구청에서 무주택확인서 발급 신청
                    <br />
                    2단계: 발급 완료 (보통 즉시 또는 1-2일)
                    <br />
                    3단계: 청약저축 가입 은행에 무주택확인서 제출
                    <br />
                    4단계: 은행이 소득공제 적용 절차 진행
                    <br />
                    5단계: 연말정산 시 자동 반영 또는 세무서 신고 시 공제액 입력
                  </p>
                </div>
                <p className="mt-4">
                  중요한 점은 무주택확인서를 소득공제를 받으려는 해의 다음연도 2월 말까지 제출해야 한다는 것입니다(조세특례제한법 시행령). 예를 들어 2026년에 납입한 금액에 대해 공제받으려면, 2027년 2월 말까지 제출해야 2026년도 연말정산에 반영됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추징 위험: 주택 당첨·해지 시 꼭 알아야 할 것</h2>
                <p>
                  주택청약저축은 주택 구입을 지원하는 상품이지만, 공제를 받은 후 일정 조건에서 집을 사면 감면세액을 추징당할 수 있습니다. 이것이 가장 큰 함정입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>주택 당첨 시 추징:</strong> 당첨을 통해 주택을 취득하거나, 국민주택규모(85㎡) 초과 주택에 당첨되면 공제받은 세금을 돌려줘야 합니다(조세특례제한법 §87 부칙). 청약이 당첨되는 순간 그 해의 공제는 소급해서 취소됩니다.
                  </li>
                  <li>
                    <strong>중도해지 시 추징:</strong> 당첨 외 사유(예: 경제 형편 악화, 다른 자산 필요)로 5년 이내에 해지하면 감면세액을 추징당합니다(조세특례제한법 시행령). 5년을 넘어 해지하면 추징 대상이 아닙니다.
                  </li>
                  <li>
                    <strong>공제 적용을 받은 해부터 일어나는 변화:</strong> 주택을 구입하거나 당첨되는 순간 "무주택"이 아니게 되므로, 그 이후 납입액은 소득공제 대상이 아닙니다. 추가 공제는 받을 수 없습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 추징은 당첨 후 일정 기간 내에 당첨자 본인이 신고해야 적용됩니다. 신고하지 않으면 나중에 세무조사 때 적발될 수 있으므로, 당첨 후에는 반드시 은행이나 세무서에 알리세요.
                </p>
              </section>

              <AdSlot slot="guide-housing-subscription-savings-deduction-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">부부가 함께 가입하면 공제를 두 배로 받을 수 있나요?</h2>
                <p>
                  네, 가능합니다. 세대주와 배우자 모두 총급여 7천만원 이하이고 무주택확인서를 각각 제출하면, 부부가 각각 연 300만원씩, 총 600만원까지 납입액의 40%를 공제받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">부부 공동 공제 사례</p>
                  <p className="text-sm text-text-secondary">
                    · 남편 연 납입: 300만원 → 소득공제 120만원
                    <br />
                    · 아내 연 납입: 300만원 → 소득공제 120만원
                    <br />
                    · 가구 총 소득공제: 240만원
                    <br />
                    · 절세액 (각각 15% 한계세율): 약 40만원 (소득세+지방세)
                  </p>
                </div>
                <p className="mt-4">
                  이 경우 각각 별도의 청약저축 계좌를 개설해야 하며, 각자 무주택확인서를 제출해야 합니다. 한 사람이 다른 사람의 계좌에 대신 납입하는 것은 공제 대상이 아니므로 주의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시행 기한과 미래 제도 변화</h2>
                <p>
                  현재 주택청약저축 소득공제는 2028년 12월 31일까지만 시행됩니다(조세특례제한법 §87 부칙). 그 이후에는 어떻게 될지 불명확하므로, 이 혜택을 받으려면 서둘러야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>시행 기한:</strong> 2028년 12월 31일 (조세특례제한법 §87 부칙 참조)
                  </li>
                  <li>
                    <strong>기한 경과 후:</strong> 공제 여부는 국회 재정정책 결정에 달렸습니다. 아직 확정되지 않았습니다.
                  </li>
                  <li>
                    <strong>납입한 돈의 보장:</strong> 공제가 끝나도 청약저축으로 납입한 돈은 당신의 자산입니다. 주택 구입 시 청약에 참여할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 2028년 기한 종료 후 새로 시작하는 납입액은 소득공제 대상이 되지 않을 가능성이 높습니다. 혜택을 받으려면 2028년 12월 31일 이전에 공제 대상 납입이 완료되어야 합니다.
                </p>
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
                    <p className="mt-1 text-sm text-text-secondary">세후 월급을 정확히 계산하세요. 4대보험·세금 포함.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">소득공제·세액공제 항목과 절세 전략.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-score-84-points-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 완벽 가이드 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택 기간·연령·청약통장 점수 계산.</p>
                  </Link>
                  <Link
                    href="/guide/monthly-rent-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">월세 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택자 월세 15% 세액공제 계산.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-loan-limit-interest-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세자금대출 한도·이자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세자금대출 최대 한도와 금리 비교.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세·소득세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 소득공제 적용 여부, 공제액, 추징 규칙은 관할 세무서 또는 은행에서 반드시 확인하세요. 특히 주택 당첨, 중도해지, 무주택확인서 제출 시기 등은 개인 상황에 따라 복잡할 수 있으므로 전문가와 상담하는 것이 안전합니다. 본 콘텐츠는 2026-07-03을 기준으로 작성되었으며, 조세특례제한법 개정 시 즉시 업데이트됩니다. 주택청약저축 소득공제의 정확한 기준은 법조항 <strong>조세특례제한법 §87(주택청약종합저축 등에 대한 소득공제 등)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/LSW/lsLawLinkInfo.do?lsJoLnkSeq=1000819880&lsId=001584&chrClsCd=010202&print=print" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 조세특례제한법 §87</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(무주택확인서 발급)</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부(청약제도 안내)</a>.
                </p>
              </section>

              <ShareButtons
                title="주택청약저축 소득공제 2026 가이드"
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
