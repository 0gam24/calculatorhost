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

const URL = 'https://calculatorhost.com/guide/earned-income-tax-credit-late-application-2026/';
const DATE_PUBLISHED = '2026-06-02';
const DATE_MODIFIED = '2026-06-02';

export const metadata: Metadata = {
  title: '근로·자녀장려금 기한 후 신청 2026 — 5월 놓쳤다면 95% 지급 (6월~11월)',
  description:
    '5월 정기신청을 놓쳤어도 11월 30일까지 기한 후 신청하면 95%를 받을 수 있습니다. 2026 근로장려금·자녀장려금 신청 기한, 지급액, 신청 방법, 소득·재산 요건을 완벽 정리했습니다.',
  keywords: [
    '근로장려금 기한 후 신청',
    '자녀장려금 기한 후 신청',
    '근로장려금 놓쳤을 때',
    '근로장려금 95% 지급',
    '기한 후 신청 2026',
    '근로장려금 지급일',
    '자녀장려금 신청',
    '5월 정기신청 놓친',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '근로·자녀장려금 기한 후 신청 2026 — 5월 놓쳤다면 95% 지급 (6월~11월)' }],
    title: '근로·자녀장려금 기한 후 신청 2026 — 5월 놓쳤다면 95% 지급',
    description: '정기신청(5월 1~31일) 놓쳤어도 6월~11월 기한 후 신청으로 95% 수령. 신청 방법·지급일·소득 요건 가이드.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '근로·자녀장려금 기한 후 신청 2026 — 95% 지급',
    description: '5월 놓쳤어도 11월까지 기한 후 신청 가능. 95% 지급 받는 방법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '기한 후 신청하면 정말 95%를 받나요?',
    answer:
      '네, 기한 후 신청(6월~11월)하면 산정액의 95%를 지급합니다. 정기신청(5월)을 놓친 것에 대한 페널티로 5%만 감액되므로, 신청하지 않는 것보다는 기한 후 신청이 훨씬 낫습니다. 홈택스에서 모의계산을 해보면 자신이 받을 금액을 미리 확인할 수 있습니다.',
  },
  {
    question: '근로장려금과 자녀장려금을 동시에 받을 수 있나요?',
    answer:
      '네, 조건을 충족하면 둘 다 받을 수 있습니다. 근로장려금은 근로소득이 있고 소득요건을 충족하면 받고, 자녀장려금은 18세 미만 부양자녀가 있고 부부합산 소득 7,000만원 미만이면 추가 지급됩니다. 신청할 때 자녀 수를 정확히 입력해야 합니다.',
  },
  {
    question: '기한 후 신청은 어디서 하나요?',
    answer:
      '홈택스(hometax.go.kr) 또는 관할 세무서에서 신청합니다. 홈택스는 24시간 언제든 신청 가능하고, 세무서는 평일 업무시간에만 방문 신청이 가능합니다. 필요한 서류는 소득 증명(근로소득원천징수영수증 등)과 신분증이며, 대부분 서류를 갖춰서 가면 현장에서 작성·제출할 수 있습니다.',
  },
  {
    question: '지급일은 언제인가요?',
    answer:
      '정기신청분은 9월 말에 일괄 지급됩니다. 기한 후 신청분은 신청일로부터 약 4개월 이내에 지급되므로, 6월에 신청하면 약 10월, 11월에 신청하면 다음해 3월경 지급될 수 있습니다. 정확한 지급일은 신청 후 홈택스에서 상황을 주기적으로 확인하면 알 수 있습니다.',
  },
  {
    question: '미리 계산해볼 수 있나요?',
    answer:
      '네, 홈택스 모의계산 기능을 사용하면 신청 전에 자신이 받을 예상 금액을 확인할 수 있습니다. 2025년 소득과 재산 현황을 입력하면 근로장려금·자녀장려금 각각의 산정액을 보여줍니다. 다만, 최종 결정액은 국세청 심사 후 달라질 수 있으므로 참고만 하세요.',
  },
  {
    question: '기한 후 신청할 때 필요한 서류는?',
    answer:
      '기본적으로 신분증, 2025년 소득 증명(근로소득원천징수영수증 또는 소득금액증명), 통장 사본(지급 계좌용)이 필요합니다. 부양자녀가 있으면 가족관계증명서, 주민등록등본이 필요하고, 예술인·프리랜서 같은 특수직 종사자는 추가 증명 서류를 요청받을 수 있습니다. 신청처(홈택스·세무서)에 미리 전화로 필요 서류를 확인하는 것이 정확합니다.',
  },
  {
    question: '재산이 많으면 못 받나요?',
    answer:
      '네, 재산요건이 있습니다. 2025년 6월 1일 기준 가구 재산 합계(부채 미차감)가 2억 4,000만원 미만이어야 합니다. 1억 7,000만~2억 4,000만 구간에 있으면 산정액의 50%만 지급됩니다. 가구 재산은 부동산(시가 평가액), 금융자산(예금·주식 등), 자동차 등을 합산합니다.',
  },
  {
    question: '혼인이나 자녀 수 변화가 있었으면?',
    answer:
      '2025년 말 기준(신청할 연도의 12월 31일)의 가구 상황으로 신청합니다. 따라서 2026년 기한 후 신청은 2025년 기준 배우자·부양자녀 수를 기준으로 단독/홑벌이/맞벌이를 판정합니다. 신청 후 개인 사정 변화(이혼·재혼·자녀 취업)는 신청 결과에 영향을 주지 않으므로, 신청 당시 상황을 정확히 입력하시면 됩니다.',
  },
] as const;

export default function EarnedIncomeTaxCreditLateApplication2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '근로·자녀장려금 기한 후 신청 2026 — 95% 지급' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '근로·자녀장려금 기한 후 신청 2026 — 5월 놓쳤다면 95% 지급 (6월~11월)',
    description:
      '정기신청을 놓친 직장인·자영업자를 위한 기한 후 신청 완벽 가이드. 95% 지급, 신청 기한 6월~11월 30일, 소득·재산 요건, 지급일.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['근로장려금 기한 후 신청', '자녀장려금 신청', '95% 지급', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '근로·자녀장려금 기한 후 신청 2026 — 95% 지급, 신청 기한 6월~11월',
    description:
      '5월 정기신청 놓쳤어도 11월 30일까지 기한 후 신청하면 95% 수령. 신청 절차·지급액·소득 요건 완벽 정리.',
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
                    { name: '근로·자녀장려금 기한 후 신청 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·복지 · 8분 읽기 · 2026-06-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  근로·자녀장려금 기한 후 신청
                  <br />
                  <span className="text-2xl text-text-secondary">— 5월을 놓쳤다면? 95% 지급 (6월~11월)</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  근로장려금과 자녀장려금의 정기신청 기한은 5월 1일부터 5월 31일까지입니다.
                  혹시 이 기간을 놓쳤다면 <strong>6월 1일부터 11월 30일까지 기한 후 신청</strong>이 가능합니다.
                  기한 후 신청하면 산정액의 95%를 받을 수 있으므로, 신청하지 않는 것보다는 훨씬 낫습니다.
                  신청 방법, 지급액, 소득·재산 요건을 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-eitc-late-application-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">2026년 근로·자녀장려금 기한 후 신청</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">정기신청 기한</td>
                        <td className="border border-border-base px-2 py-1">5월 1일~5월 31일</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">기한 후 신청 기한</td>
                        <td className="border border-border-base px-2 py-1">6월 1일~11월 30일</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">지급 비율</td>
                        <td className="border border-border-base px-2 py-1">산정액의 95% (5% 감액)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">근로장려금 최대 지급액</td>
                        <td className="border border-border-base px-2 py-1">단독 165만원 / 홑벌이 285만원 / 맞벌이 330만원</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">자녀장려금</td>
                        <td className="border border-border-base px-2 py-1">18세 미만 부양자녀 있고 부부합산 소득 7,000만원 미만</td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">정기신청분 지급일</td>
                        <td className="border border-border-base px-2 py-1">9월 말 일괄 지급</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">기한 후 신청분 지급일</td>
                        <td className="border border-border-base px-2 py-1">신청일로부터 약 4개월 이내</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 기한 후 신청이란? 정기신청과의 차이</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로장려금과 자녀장려금은 조세특례제한법 §100의2(근로장려세제)에 근거한 저소득 가구 지원 제도로,
                  매년 종합소득과세표준 확정신고 기간(5월 1일~5월 31일)에 정기신청을 받습니다.
                  이 기간 내에 신청하면 산정액의 100%를 받지만, 같은 법 §100의6에 따른 기한 후 신청을 6월 1일부터 11월 30일 사이에 하면
                  산정액의 95%만 지급됩니다. 5%는 기한을 놓친 것에 대한 페널티이지만, 아예 신청하지 않는 것(0%)보다는 훨씬 낫습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">정기신청 vs 기한 후 신청</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">구분</th>
                        <th scope="col" className="px-3 py-2 text-left">정기신청</th>
                        <th scope="col" className="px-3 py-2 text-left">기한 후 신청</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신청 기간</td>
                        <td className="px-3 py-2">5월 1일~31일 (31일)</td>
                        <td className="px-3 py-2">6월 1일~11월 30일 (184일)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">지급 비율</td>
                        <td className="px-3 py-2">100%</td>
                        <td className="px-3 py-2">95% (5% 감액)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">지급 시기</td>
                        <td className="px-3 py-2">9월 말 일괄</td>
                        <td className="px-3 py-2">신청일로부터 약 4개월 이내</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신청처</td>
                        <td className="px-3 py-2">홈택스·세무서 (동일)</td>
                        <td className="px-3 py-2">홈택스·세무서 (동일)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">소득·재산 요건</td>
                        <td className="px-3 py-2">동일</td>
                        <td className="px-3 py-2">동일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>⚠️ 주의:</strong> 기한 후 신청은 5% 감액되지만, 신청하지 않으면 0원입니다.
                    예를 들어 근로장려금 예상액이 165만원이라면 정기신청 165만원, 기한 후 신청 157만원(95%)을 받을 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 기한 후 신청 가능 기간 — 6월 1일부터 11월 30일까지</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  정기신청 기한을 놓쳤다면, 6월 1일부터 11월 30일까지 기한 후 신청할 수 있습니다.
                  총 184일 동안 신청 기회가 있으므로, 충분한 시간을 가지고 서류를 준비해서 신청하면 됩니다.
                  일찍 신청할수록 지급이 빨라지는 경향이 있으므로, 가능하면 6월~7월 중에 신청하는 것이 유리합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">신청 기간별 지급 시기</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>6월 신청:</strong> 신청일로부터 약 4개월, 즉 10월경 지급 가능
                    </p>
                    <p>
                      <strong>7월~9월 신청:</strong> 10월~1월경 지급 가능
                    </p>
                    <p>
                      <strong>10월~11월 신청:</strong> 이듬해 1월~3월경 지급 가능
                    </p>
                    <p className="text-text-tertiary text-xs mt-2">
                      ※ 정확한 지급일은 국세청 심사 진도에 따라 달라질 수 있습니다. 신청 후 홈택스 '장려금 조회' 메뉴에서 진행상황을 주기적으로 확인하세요.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 근로장려금 — 소득요건·지급액·가구 분류</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로장려금은 저소득 근로자를 지원하는 제도로, 조세특례제한법 §100의3에 신청자격이 규정되어 있습니다.
                  과세기간 중 사업소득·근로소득·종교인소득이 있는 거주자 중 같은 법 시행령이 정한 요건을 갖춘 사람이 신청할 수 있으며,
                  직장인뿐 아니라 자영업자·프리랜서도 대상이 됩니다. 가구 구성에 따라 단독·홑벌이·맞벌이로 분류되어 최대 지급액이 다릅니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 근로장려금 최대 지급액 및 소득요건</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">가구 분류</th>
                        <th scope="col" className="px-3 py-2 text-left">최대 지급액</th>
                        <th scope="col" className="px-3 py-2 text-left">소득요건 (2025년 연간)</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">단독가구</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">165만원</td>
                        <td className="px-3 py-2">총소득 2,200만원 미만</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">홑벌이</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">285만원</td>
                        <td className="px-3 py-2">부부 합산 총소득 3,200만원 미만</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">맞벌이</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">330만원</td>
                        <td className="px-3 py-2">부부 합산 총소득 4,400만원 미만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-3">가구 분류 기준</h3>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <p>
                      <strong>단독가구:</strong> 배우자가 없고, 18세 미만 부양자녀가 없고, 70세 이상 직계존속이 없음
                    </p>
                    <p>
                      <strong>홑벌이:</strong> 배우자의 총급여가 300만원 미만 또는 부양자녀·70세 이상 직계존속이 있는 경우
                    </p>
                    <p>
                      <strong>맞벌이:</strong> 부부 각각 총급여 300만원 이상인 경우 (부양자녀 없음)
                    </p>
                    <p className="text-text-tertiary text-xs mt-2">
                      ※ 가구 분류는 2025년 말(신청 대상 연도의 12월 31일) 기준입니다.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 재산요건 — 2억 4,000만원 미만 (1억 7,000만 초과 시 50% 지급)</h2>
                <p className="text-text-secondary leading-relaxed">
                  근로장려금을 받으려면 소득요건뿐 아니라 재산요건도 충족해야 합니다.
                  2025년 6월 1일 기준 가구 재산 합계(부채 미차감)가 2억 4,000만원 미만이어야 하며,
                  1억 7,000만~2억 4,000만 구간에 있으면 산정액의 50%만 지급됩니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 근로장려금 재산요건</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">가구 재산 합계</th>
                        <th scope="col" className="px-3 py-2 text-left">장려금 지급</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">1억 7,000만원 미만</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">100% 지급</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2">1억 7,000만~2억 4,000만원</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">50% 지급</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">2억 4,000만원 초과</td>
                        <td className="px-3 py-2 font-bold text-danger-600 dark:text-danger-400">지급 불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 mt-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 중요:</strong> 가구 재산은 부동산(공시가 평가액), 금융자산(예금·주식·펀드·채권), 자동차(시가 평가액) 등을 합산합니다.
                    부채는 차감하지 않으므로, 전세금이나 대출금이 많아도 차감되지 않습니다.
                    자신의 재산 규모가 불명확하면 홈택스 모의계산에서 확인 후 신청하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 자녀장려금 — 18세 미만 부양자녀가 있을 때</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로장려금 외에, 18세 미만 부양자녀가 있으면 추가로 자녀장려금을 받을 수 있습니다.
                  조세특례제한법 §100의28(자녀장려금의 신청자격)에 따라 거주자(배우자 포함)의 연간 총소득 합계가 7,000만원 미만이어야 하며,
                  자녀가 여러 명이면 그에 따라 지급액이 커집니다. 자녀장려금은 근로장려금과 함께 신청하면 두 장려금을 모두 받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">자녀장려금 요건</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>자격 조건:</strong> 신청자가 근로장려금 기본 요건을 충족하고, 18세 미만 부양자녀가 있음
                    </p>
                    <p>
                      <strong>소득요건:</strong> 부부합산 총소득 7,000만원 미만
                    </p>
                    <p>
                      <strong>재산요건:</strong> 근로장려금과 동일 (2억 4,000만원 미만, 1억 7,000만 초과 시 50%)
                    </p>
                    <p className="text-text-tertiary text-xs mt-2">
                      ※ 자녀장려금의 정확한 지급액은 자녀 수·소득 구간에 따라 다르므로, 홈택스 모의계산에서 확인하세요.
                    </p>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-eitc-late-application-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 기한 후 신청하는 방법</h2>
                <p className="text-text-secondary leading-relaxed">
                  기한 후 신청은 정기신청과 거의 동일하며, 홈택스(온라인) 또는 세무서(방문)에서 할 수 있습니다.
                  온라인이 훨씬 편하고 빠르므로, 서류를 갖추면 홈택스에서 먼저 신청을 시도해보세요.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">1) 홈택스에서 신청 (온라인)</h3>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>홈택스(hometax.go.kr) 접속</strong> → 공인인증서 또는 간편로그인
                      </li>
                      <li>
                        <strong>'장려금' 메뉴 선택</strong> → '장려금 신청' 또는 '모의계산' 진입
                      </li>
                      <li>
                        <strong>소득·가족 정보 입력</strong> → 2025년 연간 총소득, 배우자 정보, 부양자녀 정보 입력
                      </li>
                      <li>
                        <strong>모의계산 결과 확인</strong> → 예상 지급액 확인 후 신청 진행
                      </li>
                      <li>
                        <strong>필요 서류 첨부</strong> → 근로소득원천징수영수증, 소득금액증명 등 PDF/이미지 업로드
                      </li>
                      <li>
                        <strong>지급 계좌 등록</strong> → 통장 사본 제출 또는 계좌번호 입력
                      </li>
                      <li>
                        <strong>신청 완료</strong> → 신청 번호 발급 후 진행상황 조회 가능
                      </li>
                    </ol>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">2) 세무서에서 신청 (방문)</h3>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>관할 세무서 방문</strong> → 평일 09:00~18:00 (점심 12:00~13:00 제외)
                      </li>
                      <li>
                        <strong>신청 양식 작성</strong> → 세무서에서 제공하는 양식 작성 (직원이 안내)
                      </li>
                      <li>
                        <strong>서류 제출</strong> → 신분증, 소득 증명, 가족관계증명서 등 제시
                      </li>
                      <li>
                        <strong>접수 완료</strong> → 접수증 발급, 이후 진행은 홈택스에서 조회 가능
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 팁:</strong> 홈택스가 불편하다면 세무서 방문을 권장합니다.
                    직원이 함께 입력을 도와주므로 실수할 가능성이 적고, 현장에서 서류 부족 여부를 바로 확인할 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 필요한 서류 준비하기</h2>
                <p className="text-text-secondary leading-relaxed">
                  기한 후 신청 시 준비할 기본 서류는 다음과 같습니다. 자신의 소득 형태(직장인, 자영업자, 프리랜서)에 따라 추가 서류가 요청될 수 있으므로,
                  신청 전에 관할 세무서에 전화로 확인하는 것이 정확합니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">공통 필수 서류</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>신분증 (주민등록증, 운전면허증)</li>
                      <li>2025년 소득 증명 (근로소득원천징수영수증 또는 소득금액증명원)</li>
                      <li>통장 사본 (지급받을 계좌용, 2025년 6월 이후 거래내역 1개월분)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">부양자녀가 있을 때</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>가족관계증명서 (자녀 관계 확인)</li>
                      <li>주민등록등본 (가구 구성원 확인)</li>
                      <li>자녀 주민등록등본 (만 18세 미만 확인)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">자영업자·프리랜서 추가 서류</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>소득금액증명원 (국세청에서 발급)</li>
                      <li>통장 사본 (사업용 통장, 최근 3개월)</li>
                      <li>사업자등록증 사본 또는 확정신고서</li>
                      <li>특수직 증명 (예술인·프리랜서인 경우 추가 서류)</li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>📋 서류 확인 팁:</strong> 신청 전에 홈택스에서 모의계산을 해보면,
                    필요한 서류 목록이 자동으로 표시됩니다. 이를 참고해서 서류를 준비하면 누락 위험이 줄어듭니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. 지급일과 진행상황 확인</h2>
                <p className="text-text-secondary leading-relaxed">
                  정기신청분은 9월 말에 일괄 지급되지만, 기한 후 신청분은 신청 시점에 따라 지급 시기가 달라집니다.
                  신청 후 진행상황을 홈택스에서 주기적으로 확인하면, 최종 승인 및 지급 예정일을 알 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">진행상황 확인 방법</h3>
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>홈택스 접속</strong> → 공인인증서 또는 간편로그인
                    </li>
                    <li>
                      <strong>'장려금' 메뉴</strong> → '조회' 또는 '신청현황 조회'
                    </li>
                    <li>
                      <strong>신청 건 선택</strong> → '진행상황 상세조회'
                    </li>
                    <li>
                      <strong>상태 확인</strong> → '신청접수 → 서류심사 → 최종승인 → 지급'의 각 단계 확인
                    </li>
                  </ol>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-2">기한 후 신청 기간별 예상 지급일</h3>
                  <div className="space-y-1.5 text-sm text-text-secondary">
                    <p>6월 신청 → 약 10월 지급</p>
                    <p>7월~8월 신청 → 11월~12월 지급</p>
                    <p>9월 신청 → 이듬해 1월경 지급</p>
                    <p>10월~11월 신청 → 이듬해 2월~3월경 지급</p>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/child-tax-credit/" className="text-primary-600 underline dark:text-primary-500">
                      자녀장려금 계산기
                    </Link>
                    {' — 부양자녀 수, 부부 소득 입력 후 예상 지급액 확인'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/child-earned-income-tax-credit-application-2026/" className="text-primary-600 underline dark:text-primary-500">
                      자녀장려금 신청 가이드
                    </Link>
                    {' — 자녀장려금 요건·신청 방법·지급일 상세 설명'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/earned-income-tax-credit-vs-child/" className="text-primary-600 underline dark:text-primary-500">
                      근로장려금 vs 자녀장려금
                    </Link>
                    {' — 두 장려금의 차이, 중복 수급 방법'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">
                      2026년 세금 달력
                    </Link>
                    {' — 근로·자녀장려금 신청 기한, 지급일 전체 일정'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="근로·자녀장려금 기한 후 신청 2026 — 5월 놓쳤다면 95% 지급"
                url={URL}
                description="정기신청 놓친 경우 6월~11월 기한 후 신청으로 95% 수령 가능. 신청 방법·지급액·소득요건 완벽 정리."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 조세특례제한법 §100의2(근로장려세제) · §100의3(근로장려금 신청자격) · §100의6(근로장려금의 신청 및 기한 후 신청) · §100의28(자녀장려금의 신청자격) · {' '}
                  <a
                    href="https://www.law.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터
                  </a>{' '}
                  · {' '}
                  <a
                    href="https://hometax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    홈택스(근로·자녀장려금 신청·조회)
                  </a>{' '}
                  · {' '}
                  <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청(장려금 정책)
                  </a>{' '}
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 2일 기준 정보를 제공합니다.
                  근로장려금·자녀장려금 제도는 정부 정책 및 세법 개정에 따라 변경될 수 있으므로,
                  정확한 지급액 계산이 필요하면 홈택스 모의계산 기능을 사용하거나 관할 세무서·국세청에 상담하시기 바랍니다.
                  소득·재산 판정 기준 및 자녀 인정 요건은 신청 시점에 따라 달라질 수 있습니다.
                  본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost)
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
