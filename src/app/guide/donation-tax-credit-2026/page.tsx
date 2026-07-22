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

const URL = 'https://calculatorhost.com/guide/donation-tax-credit-2026/';
const DATE_PUBLISHED = '2026-07-03';
const DATE_MODIFIED = '2026-07-03';

export const metadata: Metadata = {
  title: '기부금 세액공제 2026 | 15%·30% 공제율·한도·고향사랑기부금',
  description:
    '기부금 세액공제의 공제율(1천만 이하 15%, 초과분 30%), 한도, 대상기부금 완벽 정리. 정치자금·고향사랑 기부금 특별공제까지. 소득세법 §59의4.',
  keywords: [
    '기부금 세액공제',
    '기부금 15% 30%',
    '기부금 한도',
    '정치자금 기부금',
    '고향사랑기부금',
    '세액공제 vs 필요경비',
    '소득세법 59조의4',
    '기부금 이월공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '기부금 세액공제 2026 | 15%·30% 공제율·한도·고향사랑기부금' }],
    title: '기부금 세액공제 2026 — 기부액의 15~30%를 세금에서 직접 공제',
    description: '기부금 공제율 1천만원 이하 15%, 초과분 30%. 정치자금·고향사랑·법정기부금별 공제 차이와 한도 정확 계산법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '기부금 세액공제 2026 — 15%·30% 공제율과 정치자금·고향사랑 기부금',
    description: '기부금 1천만원 이하 15% 공제, 초과분 30%. 한도와 대상기부금 확인하고 절세하세요.',
  },
};

const FAQ_ITEMS = [
  {
    question: '기부금 세액공제가 정확히 무엇인가요?',
    answer:
      '기부금 세액공제는 소득세법 §59의4에 따른 특별세액공제 제도입니다. 기부금을 낸 금액의 일정 비율(15%~30%)을 종합소득세에서 직접 뺄 수 있습니다. 예를 들어 1000만원을 기부하면 150만원(15%)을 세금에서 공제받는 것입니다. 세액공제는 세금 계산 후 마지막에 차감되므로 절세 효과가 큽니다.',
  },
  {
    question: '기부금 공제율이 단계적이라는데, 정확히 얼마인가요?',
    answer:
      '기부금 세액공제율은 기부 규모에 따라 다릅니다(소득세법 §59의4). 1천만원 이하는 15%, 1천만원을 초과하는 부분은 30%입니다. 예: 기부금 2천만원이면 1천만원×15% + 1천만원×30% = 150만원 + 300만원 = 450만원 공제입니다.',
  },
  {
    question: '기부금 공제 대상이 모두 같나요?',
    answer:
      '아닙니다. 정치자금 기부금과 고향사랑기부금은 특별한 공제율을 가집니다. 정치자금 기부금은 10만원까지는 거의 전액 공제(약 109%), 10만원 초과분은 15%입니다. 고향사랑기부금은 10만원까지 100% 공제, 초과분은 15%입니다. 일반 기부금과 구분되므로 신고 시 명시해야 합니다.',
  },
  {
    question: '기부금을 많이 했을 때 한도가 있나요?',
    answer:
      '네, 공제 대상 한도가 있습니다. 정치자금과 법정(특례)기부금은 소득금액의 100%까지, 일반기부금은 소득금액의 30%까지 공제받을 수 있습니다. 예: 연 소득 5000만원이면 일반기부금 최대 1500만원까지만 공제 가능합니다.',
  },
  {
    question: '사업자도 기부금 세액공제를 받을 수 있나요?',
    answer:
      '개인사업자는 원칙적으로 세액공제(직접 공제)가 아닌 필요경비 산입(간접 공제)입니다. 다만 성실사업자는 일부 기부금에 대해 세액공제 대상이 될 수 있습니다. 상황이 복잡하므로 세무사 또는 관할 세무서에 확인하는 것이 안전합니다.',
  },
  {
    question: '올해 기부금 한도를 초과하면 어떻게 되나요?',
    answer:
      '초과 부분은 다음 연도(10년 이내)로 이월공제할 수 있습니다. 예: 소득 5000만원인데 기부금 2000만원이면, 올해는 1500만원만 공제하고 나머지 500만원은 내년 이후에 공제받을 수 있습니다.',
  },
  {
    question: '고향사랑기부금 세액공제와 답례품을 둘 다 받나요?',
    answer:
      '네, 세액공제와 답례품을 모두 받습니다. 고향사랑기부금법에 따르면 기부금에 대한 세액공제(10만원까지 100%)와 별개로 지자체가 답례품(시가 50% 이내)을 제공합니다. 따라서 세금 감면 + 지자체 선물 두 가지 혜택을 동시에 누릴 수 있습니다.',
  },
  {
    question: '기부금 영수증이 없으면 공제를 못 받나요?',
    answer:
      '네, 기부금 공제를 받으려면 기부 단체로부터 기부금 영수증을 반드시 받아야 합니다. 영수증에는 기부 단체명, 기부액, 기부 일자, 기부 목적이 명시되어야 합니다. 영수증 없이는 종합소득세 신고 시 공제를 받을 수 없습니다.',
  },
];

export default function DonationTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '기부금 세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '기부금 세액공제 2026 — 15%·30% 공제율과 한도·정치자금·고향사랑기부금',
    description:
      '기부금 세액공제의 정확한 공제율(1천만 이하 15%, 초과분 30%), 한도(소득의 30%), 대상기부금(정치자금·고향사랑·법정기부금), 계산 사례, 개인사업자 다루기까지 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['기부금', '세액공제', '공제율', '한도', '정치자금', '고향사랑기부금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '기부금 세액공제 2026',
    description:
      '기부금 공제율, 한도, 정치자금·고향사랑 기부금 공제와 계산 방법.',
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
                    { name: '기부금 세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">기부자 · 9분 읽기 · 2026-07-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  기부금 세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 15%·30% 공제율·한도·정치자금·고향사랑기부금</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  종합소득세 계산 때 기부금을 낸 금액의 일정 비율을 직접 세금에서 뺄 수 있는 제도가 바로 기부금 세액공제입니다. 소득세법 §59의4에 따라 기부액 규모별로 15%와 30%의 두 단계 공제율이 적용되며, 대상기부금도 일반기부금·정치자금·고향사랑기부금별로 다릅니다. 이 가이드는 기부금 세액공제의 정확한 공제율, 한도, 대상기부금을 정리하고, 실제 계산 방법과 함정까지 완전히 설명해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-donation-tax-credit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기부금 세액공제란 무엇인가</h2>
                <p>
                  기부금 세액공제는 소득세법 §59의4에 따른 특별세액공제 제도로, 기부금을 낸 금액의 일정 비율을 종합소득세에서 직접 차감하는 혜택입니다. 세액공제는 소득공제와 다르게 세금 계산의 마지막 단계에서 적용되므로 절세 효과가 더 큽니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기부금 세액공제의 기본 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    기부금(대상 기부금) × 공제율(15% 또는 30%) = 세액공제 금액
                    <br />
                    예: 기부금 1000만원 × 15% = 150만원을 종합소득세에서 공제
                    <br />
                    <span className="text-xs text-text-tertiary">세액공제는 이미 계산된 세금에서 직접 빼므로 임금공제보다 절세 효과가 큽니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  기부금 세액공제의 핵심은 기부 금액의 규모에 따라 공제율이 달라진다는 점입니다. 작은 기부는 15%만 공제되지만, 큰 기부는 추가 부분에 대해 30%를 공제받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기부금 공제율 — 15%와 30%의 두 단계</h2>
                <p>
                  기부금 세액공제율은 기부 규모에 따라 누진적으로 적용됩니다(소득세법 §59의4). 1천만원 이하의 기부는 15%, 이를 초과하는 부분은 30%의 공제율이 적용됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 일반기부금 공제율 (소득세법 §59의4, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기부금 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1천만원 이하</td>
                        <td className="p-3"><strong>15%</strong></td>
                        <td className="p-3">500만원 기부 → 75만원 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1천만원 초과분</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">2천만원 기부 → 1천×15% + 1천×30% = 450만원 공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  이러한 누진 공제율 구조는 소수를 위한 정책이 아니라, 기부 규모가 클수록 더 큰 세액공제 혜택을 주는 방식입니다. 기부를 더 많이 할수록 공제 효과가 커진다는 의미입니다.
                </p>
                <p className="mt-4">
                  다만 기부금 공제 대상은 법정기부금(대한적십자사, 자선단체 등)으로 한정되므로, 모든 단체에 낸 돈이 공제 대상이 되는 것은 아닙니다. 기부할 때 기부 단체가 "세액공제 대상"인지 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기부금 공제율의 실제 계산 사례</h2>
                <p>
                  다음 3가지 사례를 통해 기부금 세액공제가 실제로 어떻게 계산되는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 작은 기부 (500만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 기부금(대상기부금): 500만원
                    <br />
                    · 공제 대상 금액: 500만원 (1천만원 이하 구간)
                    <br />
                    · 공제율: 15%
                    <br />
                    · 세액공제: 500만원 × 15% = <strong>75만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 종합소득세에서 75만원을 직접 뺍니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 중간 규모 기부 (2천만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 기부금: 2천만원
                    <br />
                    · 1단계 (1천만원 이하): 1000만원 × 15% = 150만원
                    <br />
                    · 2단계 (1천만원 초과분): 1000만원 × 30% = 300만원
                    <br />
                    · 세액공제: 150만원 + 300만원 = <strong>450만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 기부액의 22.5% 수준(평균)이 세액공제됩니다. 기부액의 비율이 클수록 절세 효과 ↑</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 큰 기부 (5천만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 기부금: 5천만원
                    <br />
                    · 1단계: 1000만원 × 15% = 150만원
                    <br />
                    · 2단계: 4000만원 × 30% = 1200만원
                    <br />
                    · 세액공제: 150만원 + 1200만원 = <strong>1350만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 기부액의 27% 수준이 세액공제됩니다. 기부액이 크면 공제율도 높아집니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">정치자금 기부금 — 별도의 높은 공제율</h2>
                <p>
                  정치자금 기부금은 일반기부금과 다른 공제율이 적용됩니다. 민주주의 정치 활동을 장려하기 위해 의도적으로 공제율이 더 높게 설정되었습니다(소득세법 §59의4 1항 2호).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 정치자금 기부금 공제율</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기부금 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">효율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10만원까지</td>
                        <td className="p-3"><strong>100/110 공제</strong></td>
                        <td className="p-3">약 109% = 거의 전액</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10만원 초과분</td>
                        <td className="p-3"><strong>15% 공제</strong> (단, 3천만 초과 25%)</td>
                        <td className="p-3">일반기부와 동일 또는 그 이상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예를 들어 정치자금 50만원을 기부하면 (10만원 × 100/110) + (40만원 × 15%) = 약 9.1만원 + 6만원 = 약 15만원을 세액공제받습니다. 일반기부금보다 훨씬 효율적입니다.
                </p>
                <p className="mt-4">
                  다만 정치자금 기부금도 소득금액의 100%를 한도로 하므로, 과도한 기부는 한도를 초과할 수 있습니다. 대형 기부자는 이월공제 대상이 될 수 있으므로 세무사와 상담하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">고향사랑기부금 — 10만원까지 100% 공제</h2>
                <p>
                  고향사랑기부금은 2022년 신설된 제도로, 지자체에 기부한 금액에 대해 특별한 공제 혜택을 제공합니다. 기부자는 세액공제뿐만 아니라 지자체 답례품도 함께 받을 수 있습니다(고향사랑기부금법).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 고향사랑기부금 공제율 및 답례품</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기부금 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세액공제</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">답례품</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10만원까지</td>
                        <td className="p-3"><strong>100% 공제</strong></td>
                        <td className="p-3">시가 50% 이내</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10만원 초과분</td>
                        <td className="p-3"><strong>15% 공제</strong></td>
                        <td className="p-3">시가 30% 이내 (추가 답례품 미제공)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예: 고향사랑기부금 20만원을 기부하면 (10만원 × 100%) + (10만원 × 15%) = 10만원 + 1.5만원 = 11.5만원을 세액공제받습니다. 동시에 지자체로부터 답례품(시가 5만원대)을 선택해서 받을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 고향사랑기부금은 연간 기부 한도가 있을 수 있으므로, 기부 전 해당 지자체의 규칙을 확인하세요. 또한 답례품 선택 시 배송 시간이 소요되므로 계획적으로 기부하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기부금 공제 한도 — 소득의 30% 제한</h2>
                <p>
                  기부금 세액공제를 받으려면 기부 금액이 한도 이내여야 합니다. 한도는 기부금의 종류에 따라 다릅니다(소득세법 §59의4).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기부금 공제 한도</p>
                  <p className="text-sm text-text-secondary mt-2">
                    · 정치자금·법정특례기부금: 소득금액의 100%
                    <br />
                    · 일반기부금: <strong>소득금액의 30%</strong> (종교단체는 10%)
                    <br />
                    · 초과분은 10년까지 이월공제 가능
                  </p>
                </div>
                <p className="mt-4">
                  예: 연 소득이 5000만원이면 일반기부금은 최대 1500만원(5000만×30%)까지만 공제받을 수 있습니다. 1500만원을 초과하는 기부금은 내년 이후에 공제받을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 한도 초과분을 이월공제할 때는 종합소득세 신고 시 명시해야 합니다. 자동으로 이월되는 것이 아니므로, 신고 시 이전 연도의 초과분이 있는지 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-donation-tax-credit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">개인사업자의 기부금 처리 — 세액공제가 아닌 필요경비</h2>
                <p>
                  개인사업자가 사업과 관련하여 기부금을 낸 경우, 일반인처럼 세액공제를 받을 수 없습니다. 대신 필요경비로 산입됩니다(소득세법 §25).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>일반 개인사업자:</strong> 기부금 → 필요경비 산입. 세액공제 불가. 다만 기부금이 비즈니스 관련성이 있어야 합니다.
                  </li>
                  <li>
                    <strong>성실사업자 (연소득 3억 초과):</strong> 일부 기부금에 한해 세액공제 대상이 될 수 있습니다. 국세청 기준을 확인하세요.
                  </li>
                  <li>
                    <strong>종합소득 분류:</strong> 사업소득 + 기타소득(예: 강의료) 혼합 시 어느 소득에서 기부금을 차감할지에 따라 절세액이 달라질 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  주의: 개인사업자 기부금 처리는 매우 복잡하므로, 세무사 또는 관할 세무서에 상담받는 것이 안전합니다. 잘못 신고하면 가산세 대상이 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기부금 공제를 받기 위한 준비물 및 신고 방법</h2>
                <p>
                  기부금 세액공제를 받으려면 기부 단체로부터 기부금 영수증을 받아야 합니다. 영수증 없이는 공제를 받을 수 없으므로 매우 중요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">필수 서류: 기부금 영수증</p>
                  <p className="text-sm text-text-secondary">
                    · 기부 단체명 및 세액공제 대상 기부금 여부
                    <br />
                    · 기부액 및 기부 일자
                    <br />
                    · 기부 목적 (일반기부·정치자금·고향사랑 등)
                    <br />
                    · 기부자 성명 및 주민등록번호 (또는 사업자번호)
                    <br />
                    · 기부 단체 대표자 서명 또는 인감
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">종합소득세 신고 시 기부금 신고</p>
                  <p className="text-sm text-text-secondary">
                    · 종합소득세 신고 시 "기부금" 항목에 기부액 및 종류 기재
                    <br />
                    · 영수증은 제출하지 않지만 소급 5년 보관 필수
                    <br />
                    · 사업용 통장으로 기부한 경우 통장 기록도 증거 자료
                    <br />
                    · 이월공제가 있으면 "이월공제 기부금" 항목에 별도 기재
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자주 실수하는 기부금 공제 사례</h2>
                <p>
                  기부금 공제 신고 시 자주 발생하는 오류들을 미리 알아둔다면 세무조사 위험을 줄일 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>비대상 기부금 신고:</strong> 개인이 운영하는 종교단체, 미등록 NGO 등에 낸 기부금은 세액공제 대상이 아닙니다. 반드시 "세액공제 대상 기부금"인지 확인하세요.
                  </li>
                  <li>
                    <strong>영수증 없이 신고:</strong> 기부금 영수증 없이 신고하면 검증 불가능하여 공제가 취소될 수 있습니다. 기부 직후 영수증을 반드시 받으세요.
                  </li>
                  <li>
                    <strong>한도 초과 무시:</strong> 한도를 초과하는 기부금을 모두 신고했다가 세무조사로 적발되면 공제가 취소되고 가산세를 냅니다.
                  </li>
                  <li>
                    <strong>이월공제 누락:</strong> 작년에 한도 초과된 기부금이 있었다면 올해 신고 시 "이월공제" 항목에 기재해야 합니다. 누락하면 절세 기회를 놓칩니다.
                  </li>
                </ul>
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
                    <p className="mt-1 text-sm text-text-secondary">세액공제를 반영한 실제 월급을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">기부금, 의료비, 보험료 공제항목 전체 정리.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">둘의 차이와 절세 효과를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/medical-expense-tax-credit-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">의료비 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">기부금과 함께 신고할 수 있는 다른 세액공제.</p>
                  </Link>
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부양가족 기본공제 150만원</div>
                    <p className="mt-1 text-sm text-text-secondary">부양가족 공제와 조합하여 종합소득세 절세.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 취득세, 상속세, 종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 기부금 세액공제 신고는 각자의 소득 구조, 기부금 종류, 이월공제 여부에 따라 달라질 수 있습니다. 특히 개인사업자, 대형 기부자, 이월공제가 있는 경우에는 반드시 세무사 또는 관할 세무서와 상담한 후 신고하세요. 본 콘텐츠는 2026-07-03을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 기부금 세액공제의 정확한 기준은 법조항 <strong>소득세법 §59의4(기부금에 대한 특별세액공제)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nta.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 소득세 정보</a>,{' '}
                  <a href="https://www.kcm.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">중앙선거관리위원회 정치자금 기부금</a>.
                </p>
              </section>

              <ShareButtons
                title="기부금 세액공제 2026 가이드"
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
