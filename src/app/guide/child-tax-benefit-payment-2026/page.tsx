// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/child-tax-benefit-payment-2026/';
const DATE_PUBLISHED = '2026-07-27';
const DATE_MODIFIED = '2026-07-27';

export const metadata: Metadata = {
  title: '자녀장려금 2026, 자녀 1명당 최대 100만원 지급액 계산법',
  description:
    '자녀장려금은 18세 미만 자녀 1명당 최소 50만원에서 최대 100만원을 지급합니다. 소득 7천만원 미만·재산 2.4억 미만 요건과 산정 공식을 조세특례제한법 기준으로 정리했습니다.',
  keywords: [
    '자녀장려금',
    '자녀장려금 지급액',
    '자녀장려금 소득기준',
    '자녀장려금 얼마',
    '자녀장려금 근로장려금 동시',
    '자녀장려금 신청',
    '조세특례제한법 100조의28',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '자녀장려금 2026, 자녀 1명당 최대 100만원 지급액 계산법' }],
    title: '자녀장려금 2026, 자녀 1명당 최대 100만원 지급액 계산법',
    description: '18세 미만 자녀 1명당 50만~100만원. 소득 7천만원 미만·재산 2.4억 미만 요건과 산정 공식 총정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자녀장려금 2026, 자녀 1명당 최대 100만원',
    description: '자녀 1명당 50만~100만원 지급액 계산법과 소득·재산 요건을 조세특례제한법 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자녀장려금은 자녀 1명당 얼마를 받나요?',
    answer:
      '18세 미만 부양자녀 1명당 최소 50만원에서 최대 100만원을 받습니다. 부부합산 총소득이 2,100만원 미만이면 자녀 수 곱하기 100만원을 전액 받고, 2,100만원 이상 7,000만원 미만이면 소득이 늘수록 점점 줄어드는 구조입니다. 자녀가 2명이면 최대 200만원까지 가능합니다.',
  },
  {
    question: '자녀장려금 소득 기준은 얼마인가요?',
    answer:
      '부부합산 연간 총소득이 7,000만원 미만이어야 합니다. 근로장려금(단독가구 기준 총소득 요건이 더 낮음)보다 소득 기준이 높아, 근로장려금은 못 받아도 자녀장려금은 받을 수 있는 경우가 있습니다. 단, 자녀장려금은 18세 미만 부양자녀가 반드시 있어야 합니다.',
  },
  {
    question: '자녀장려금 지급액은 어떻게 계산하나요?',
    answer:
      '부부합산 총소득이 2,100만원 미만이면 자녀 수 곱하기 100만원입니다. 2,100만원 이상 7,000만원 미만이면 자녀 1명당 [100만원 빼기 (총소득 빼기 2,100만원) 곱하기 50/4,900]으로 계산하고, 여기에 자녀 수를 곱합니다. 소득이 높을수록 100만원에서 50만원까지 점감합니다.',
  },
  {
    question: '재산이 많으면 자녀장려금도 깎이나요?',
    answer:
      '네. 가구원 재산 합계가 2억 4천만원 이상이면 지급되지 않고, 1억 7천만원 이상 2억 4천만원 미만이면 산정액의 50%만 지급됩니다. 재산에는 주택·전세보증금·자동차·예적금이 모두 포함되며 부채는 차감하지 않습니다. 이 재산 요건은 근로장려금과 동일합니다.',
  },
  {
    question: '근로장려금과 자녀장려금을 동시에 받을 수 있나요?',
    answer:
      '네, 요건을 모두 충족하면 두 제도를 동시에 받을 수 있습니다. 5월 종합소득세 신고 기간에 홈택스에서 두 항목을 함께 신청하면 됩니다. 근로장려금은 소득·재산 요건을 보고, 자녀장려금은 여기에 18세 미만 자녀 요건이 추가됩니다. 두 장려금 모두 정기 지급일은 8월 27일입니다.',
  },
  {
    question: '자녀장려금은 언제 신청하고 언제 지급되나요?',
    answer:
      '정기신청은 매년 5월 1일부터 5월 31일까지이고, 정기분 지급일은 8월 27일입니다. 정기신청을 놓치면 기한후신청(11월 30일까지)이 가능하지만 산정액의 5%가 감액되어 95%만 지급됩니다. 근로소득만 있는 가구는 반기신청도 선택할 수 있습니다.',
  },
  {
    question: '자녀세액공제와 자녀장려금은 같은 건가요?',
    answer:
      '다릅니다. 자녀세액공제는 종합소득세를 낼 때 세금을 깎아주는 공제이고, 자녀장려금은 저소득 가구에 현금을 지급하는 제도입니다. 자녀장려금을 받으면 같은 자녀에 대한 자녀세액공제는 중복 적용되지 않고 조정됩니다. 소득이 낮아 낼 세금이 적은 가구에는 현금 지급인 자녀장려금이 실익이 큽니다.',
  },
  {
    question: '18세 이상 대학생 자녀도 자녀장려금 대상인가요?',
    answer:
      '아닙니다. 자녀장려금은 지급 기준일 현재 18세 미만(해당 과세연도 중 출생·입양 포함) 부양자녀만 대상입니다. 대학생이라도 18세 이상이면 자녀장려금 산정 대상에서 제외됩니다. 다만 중증장애인은 연령 제한을 적용하지 않는 예외가 있으므로 홈택스 안내를 확인하세요.',
  },
];

export default function ChildTaxBenefit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자녀장려금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자녀장려금 2026, 자녀 1명당 최대 100만원 지급액 계산법',
    description:
      '18세 미만 자녀 1명당 50만~100만원을 지급하는 자녀장려금의 소득·재산 요건과 산정 공식, 근로장려금 동시 수령까지 조세특례제한법 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자녀장려금', '지급액', '소득기준', '재산요건', '조세특례제한법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자녀장려금 2026',
    description: '자녀 1명당 50만~100만원 자녀장려금 지급액 계산법과 요건을 정리한 가이드.',
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
                    { name: '자녀장려금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자녀 둔 부모 · 8분 읽기 · 2026-07-27</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자녀장려금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">자녀 1명당 최대 100만원 지급액 계산법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자녀를 키우는 저소득·중간소득 가구라면 자녀장려금으로 자녀 1명당 최대 100만원을 받을 수 있습니다. 문제는 내 소득이면 얼마를 받는지, 근로장려금과 함께 받을 수 있는지 헷갈린다는 점입니다. 이 가이드는 자녀장려금 지급액 산정 공식과 소득·재산 요건, 8월 27일 지급 일정을 조세특례제한법 기준으로 쉽게 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-child-tax-benefit-payment-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자녀장려금은 자녀 1명당 얼마를 받나요?</h2>
                <p>
                  자녀장려금은 18세 미만 부양자녀 1명당 최소 50만원에서 최대 100만원을 지급합니다(조세특례제한법 §100의28부터 §100의31까지). 부부합산 총소득이 낮을수록 100만원에 가깝고, 소득이 높아질수록 50만원 쪽으로 줄어드는 구조입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 18세 미만 부양자녀가 있는 가구
                    <br />
                    · 지급액: 자녀 1명당 50만~100만원
                    <br />
                    · 소득 요건: 부부합산 총소득 7,000만원 미만
                    <br />
                    · 재산 요건: 가구원 재산 합계 2억 4천만원 미만
                  </p>
                </div>
                <p className="mt-4">
                  다만 자녀장려금은 근로장려금과 달리 18세 미만 자녀가 반드시 있어야 합니다. 자녀가 없는 단독·홑벌이 가구는 자녀장려금 대상이 아니며, 근로장려금만 신청할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자녀장려금 지급액은 어떻게 계산하나요?</h2>
                <p>
                  지급액은 부부합산 총소득 구간에 따라 두 단계로 계산합니다. 소득이 2,100만원 미만이면 자녀 수에 100만원을 그대로 곱하고, 2,100만원 이상 7,000만원 미만이면 점감 공식을 적용합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 부부합산 총소득 구간별 자녀장려금 (자녀 1명 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총소득 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">자녀 1명당 산정액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2,100만원 미만</td>
                        <td className="p-3"><strong>100만원 (정액)</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2,100만원 이상 7,000만원 미만</td>
                        <td className="p-3">100만원 빼기 (총소득 빼기 2,100만원) 곱하기 50/4,900</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">7,000만원 이상</td>
                        <td className="p-3"><strong>지급 없음</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  최종 지급액은 위에서 구한 자녀 1명당 산정액에 부양자녀 수를 곱한 값입니다. 소득이 높아질수록 산정액은 100만원에서 최저 50만원까지 완만하게 줄어듭니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득별 실제 계산 사례</h2>
                <p>
                  아래 세 가지 사례로 소득 구간에 따라 자녀장려금이 어떻게 달라지는지 확인해보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 총소득 1,800만원, 자녀 2명</p>
                  <p className="text-sm text-text-secondary">
                    · 2,100만원 미만 구간 → 정액 100만원 적용
                    <br />
                    · 지급액 = 100만원 곱하기 2명 = <strong>200만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 총소득 4,000만원, 자녀 1명</p>
                  <p className="text-sm text-text-secondary">
                    · (4,000만 빼기 2,100만) = 1,900만원
                    <br />
                    · 자녀 1명당 = 100만 빼기 (1,900만 곱하기 50/4,900) ≈ 100만 빼기 19.4만 = 약 80.6만원
                    <br />
                    · 지급액 ≈ <strong>약 80만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 3. 총소득 6,500만원, 자녀 2명 (경계 근처)</p>
                  <p className="text-sm text-text-secondary">
                    · (6,500만 빼기 2,100만) = 4,400만원
                    <br />
                    · 자녀 1명당 = 100만 빼기 (4,400만 곱하기 50/4,900) ≈ 100만 빼기 44.9만 = 약 55.1만원
                    <br />
                    · 지급액 ≈ 55.1만 곱하기 2명 = <strong>약 110만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">소득이 7,000만원에 가까워질수록 자녀 1명당 산정액은 50만원 하한에 근접합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 위 계산은 재산이 1억 7천만원 미만이라고 가정한 것입니다. 재산이 1억 7천만원 이상 2억 4천만원 미만이면 위 지급액의 50%만 지급되고, 2억 4천만원 이상이면 지급되지 않습니다.
                </p>
              </section>

              <AdSlot slot="guide-child-tax-benefit-payment-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로장려금과 자녀장려금, 함께 받을 수 있나요?</h2>
                <p>
                  네, 요건을 모두 충족하면 두 제도를 동시에 받을 수 있습니다. 5월 종합소득세 신고 기간에 홈택스에서 두 항목을 함께 신청하면 됩니다. 두 장려금은 목적과 대상이 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 근로장려금 vs 자녀장려금 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근로장려금</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">자녀장려금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">자녀 요건</td>
                        <td className="p-3">불필요</td>
                        <td className="p-3">18세 미만 자녀 필수</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">소득 상한</td>
                        <td className="p-3">가구유형별(더 낮음)</td>
                        <td className="p-3">부부합산 7,000만원 미만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">재산 요건</td>
                        <td className="p-3">2.4억 미만</td>
                        <td className="p-3">2.4억 미만(동일)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">정기 지급일</td>
                        <td className="p-3">8월 27일</td>
                        <td className="p-3">8월 27일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 같은 자녀에 대한 자녀세액공제는 자녀장려금과 중복 적용되지 않고 조정됩니다. 소득이 낮아 낼 세금이 적은 가구라면 세금 공제보다 현금 지급인 자녀장려금의 실익이 큽니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">신청 시기와 기한후신청 감액</h2>
                <p>
                  자녀장려금 정기신청은 매년 5월 1일부터 5월 31일까지이고, 정기분 지급일은 8월 27일입니다. 정기신청을 놓쳤다면 6월 1일부터 11월 30일까지 기한후신청을 할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 기한후신청은 산정액의 5%가 감액되어 95%만 지급되고, 8월 27일 조기 지급 대상에서도 제외됩니다. 자녀가 있는 가구라면 5월 정기신청 기간을 지키는 것이 금액과 시기 모두 유리합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/earned-income-tax-credit-payment-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 지급일·감액</div>
                    <p className="mt-1 text-sm text-text-secondary">8월 27일 지급과 재산·체납에 따른 감액 구조.</p>
                  </Link>
                  <Link
                    href="/guide/earned-income-tax-credit-vs-child/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 vs 자녀장려금</div>
                    <p className="mt-1 text-sm text-text-secondary">두 제도의 요건 차이와 중복 수령 조건 비교.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산에서 자녀 세액공제를 받는 방법.</p>
                  </Link>
                  <Link
                    href="/calculator/child-tax-credit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀세액공제 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀 수에 따른 세액공제액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부부 소득 합산 전 세후 월급을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·양도세·취득세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 자녀장려금 지급액은 부부합산 총소득·재산·부양자녀 수에 따라 달라지고, 소득·재산 기준 금액은 국세청 고시로 매년 조정될 수 있으므로 홈택스 또는 국세청 상담(126)에서 반드시 확인하세요. 본 콘텐츠는 2026-07-27 기준으로 작성되었으며 법령 개정 시 업데이트됩니다. 근거 법령은 조세특례제한법 §100의28부터 §100의31까지(자녀장려세제)입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="자녀장려금 2026, 자녀 1명당 최대 100만원 지급액 계산법"
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
