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

const URL = 'https://calculatorhost.com/guide/interest-rate-hike-dsr-loan-limit-july-2026/';
const DATE_PUBLISHED = '2026-06-02';
const DATE_MODIFIED = '2026-06-02';

export const metadata: Metadata = {
  title: '기준금리 오르면 대출한도 줄어들까? DSR·스트레스금리 영향 2026',
  description:
    '2026년 6월 현재 기준금리는 2.50%(8연속 동결)입니다. 만약 금리가 오르면 DSR·스트레스금리를 통해 주담대·전세대출 한도가 어떻게 변하는지 구조와 가정 사례로 설명합니다. 7월 16일 금통위 앞 점검.',
  keywords: [
    '기준금리 대출한도',
    '기준금리 2026',
    'DSR 대출한도',
    '스트레스금리 DSR',
    '주담대 한도 금리',
    '전세자금대출 DSR',
    '금리 변동 대출한도',
    '금통위 7월',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '기준금리 오르면 대출한도 줄어들까? DSR·스트레스금리 영향 2026',
    description: '현재 기준금리 2.50% 동결. 금리 변동 시 DSR·스트레스금리로 주담대·전세대출 한도가 어떻게 달라지는지 구조와 가정 사례로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '기준금리와 대출한도 — 금리 오르면 한도는?',
    description: '현재 2.50% 동결. DSR·스트레스금리로 본 금리 변동 시 한도 영향(가정 사례).',
  },
};

const FAQ_ITEMS = [
  {
    question: '기준금리가 올라도 이미 빌린 대출의 금리가 올라가나요?',
    answer:
      '변동금리 대출은 기준금리가 오르면 몇 주 뒤 금리가 올라갑니다. 다만 대출 상품에 따라 다릅니다. 주담대는 기준금리 연동이 강하고, 전세자금대출도 변동금리를 선택했으면 영향을 받습니다. 고정금리로 빌렸다면 당장의 변화는 없습니다. 자신의 대출 계약서를 확인해서 변동인지 고정인지 확인하세요.',
  },
  {
    question: '7월에 기준금리가 반드시 인상되나요?',
    answer:
      '현재(2026년 6월 2일) 기준금리는 2.50%로 8연속 동결 상태입니다. 다음 금융통화위원회는 7월 16일(목요일)에 개최될 예정이지만, 공식 인상 결정은 아직 미도래입니다. 인상 여부는 경제 상황, 인플레이션, 환율 등 여러 요소를 고려해 결정됩니다. 따라서 이 글은 "만약 인상되면"이라는 가정 하에 메커니즘을 설명합니다.',
  },
  {
    question: 'DSR이 40%인데 금리가 올라면 내 한도는 정확히 얼마나 줄어드나요?',
    answer:
      '한도 감소액은 대출 상품, 신용도, 가산금리, 금리 인상폭에 따라 달라집니다. 예를 들어 대출액 5억·30년·변동금리에서 금리가 0.25%p 오르면 월 상환액은 약 7~8만원 늘어납니다. 이렇게 월 상환액이 커지면 DSR(연 상환액÷연소득)이 악화되어 신규 대출 한도도 줄어듭니다. 감소폭은 소득·기존 대출·상품별로 크게 다르므로, 정확한 수치는 은행 상담이나 대출한도 계산기에 실제 값을 입력해 확인하세요.',
  },
  {
    question: '전세자금대출은 주담대와 다르게 기준금리 인상의 영향이 덜한가요?',
    answer:
      '전세자금대출은 1주택자 + 수도권·규제지역 조건에서만 DSR 포함 대상입니다. 무주택자 전세대출은 DSR 규제를 받지 않으므로, 기준금리 인상으로 인한 한도 감소 직접 영향이 덜합니다. 다만 가산금리가 올라 실제 금리 부담은 증가합니다.',
  },
  {
    question: '스트레스금리란 무엇인가요?',
    answer:
      '스트레스금리는 금융감독원이 정한 미래 금리 상승 시나리오를 반영한 가산금리입니다. 현재 약 1.5~3.0%p 범위에서 은행별·지역별로 다르게 적용됩니다. 예를 들어 현재 금리 4.5%, 스트레스금리 3%를 적용하면 DSR 계산 시 7.5% 금리로 역산됩니다. 따라서 기준금리가 실제로 인상되지 않아도, 대출 심사 시 스트레스금리가 높아지면 대출 한도가 감소할 수 있습니다.',
  },
  {
    question: '기준금리 0.25% 인상이 내 월 상환액을 얼마나 늘릴까요?',
    answer:
      '변동금리 5억·30년 대출 기준으로, 금리가 0.25%p 오르고 가산금리가 그대로라면 월 상환액은 약 7~8만원 증가합니다. 0.5%p 오르면 약 15만원 안팎으로 커집니다. 은행이 가산금리도 함께 올리면 증가액은 더 클 수 있고, 정확한 수치는 대출 상품·잔액·남은 기간에 따라 다릅니다.',
  },
  {
    question: '지금 대출을 받으면 나중에 금리가 떨어질 때 재계약할 수 있나요?',
    answer:
      '가능합니다. 변동금리 대출은 기준금리 변화에 따라 월별로 금리가 조정됩니다. 금리가 떨어지면 자동으로 월 상환액도 감소합니다. 고정금리로 계약했다면 계약 기간 중 금리 변화의 영향을 받지 않습니다. 일부 은행은 고정·변동 전환 옵션을 제공하기도 합니다.',
  },
  {
    question: '내가 대출받을 수 있는 최대 한도를 미리 알 수 있나요?',
    answer:
      '우리 사이트의 대출한도 계산기(DSR, LTV 기반)를 이용해 대략적인 한도를 예측할 수 있습니다. 다만 은행마다 신용도, 취업 기간, 담보 종류 등을 추가로 심사하므로, 정확한 한도는 은행 방문 상담이나 온라인 사전심사가 필요합니다.',
  },
] as const;

export default function InterestRateHikeDsrLoanLimitJuly2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '기준금리와 대출한도 — 금리 변동 영향' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '기준금리 오르면 대출한도 줄어들까? DSR·스트레스금리 영향 2026',
    description:
      '현재 기준금리 2.50%(8연속 동결). 금리가 오르면 가산금리 상승 → 월 상환액 증가 → DSR 악화 → 한도 감소로 이어지는 구조를 가정 사례로 설명합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['기준금리 대출한도', '기준금리 2026', 'DSR 대출한도', '스트레스금리 DSR'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '기준금리 오르면 대출한도 줄어들까? DSR·스트레스금리 영향 2026',
    description:
      '현재 기준금리 2.50% 동결. 금리 변동 시 DSR·스트레스금리로 대출한도가 어떻게 달라지는지 구조와 가정 사례로 정리했습니다.',
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
                    { name: '기준금리와 대출한도 — 금리 변동 영향' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융·대출 · 9분 읽기 · 2026-06-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  기준금리 오르면 대출한도 줄어들까?
                  <br />
                  <span className="text-2xl text-text-secondary">— DSR·스트레스금리로 본 영향</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 6월 현재 기준금리는 2.50%로 8연속 동결 상태이며, 다음 금융통화위원회는 7월 16일(목)에 열립니다.
                  만약 금리가 오르면 &lsquo;가산금리 상승 → 월 상환액 증가 → DSR 악화 → 신규 대출 한도 감소&rsquo;라는 연쇄 구조가 작동합니다.
                  이 글은 현재 금리를 기준으로 그 구조와 영향을 가정 사례로 미리 점검합니다(특정 시점 인상을 단정하지 않습니다).
                </p>
              </header>

              <AdSlot slot="guide-interest-rate-hike-dsr-loan-limit-july-2026-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">기준금리가 오르면 대출에 미치는 영향 (가정 시나리오)</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">단계</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">변화 방향</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">1단계: 금통위 결정</td>
                        <td className="border border-border-base px-2 py-1">기준금리 인상 (가정 예: +0.25%p)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">2단계: 은행 가산금리</td>
                        <td className="border border-border-base px-2 py-1">대출금리도 따라 오를 수 있음 (은행·상품별 상이)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">3단계: 월 상환액 증가</td>
                        <td className="border border-border-base px-2 py-1">5억·30년·변동, +0.25%p 시 약 7~8만원 증가</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">4단계: DSR 악화</td>
                        <td className="border border-border-base px-2 py-1">월 상환액↑ → DSR(연상환액÷연소득) 상승 → 40% 한계 근접</td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">5단계: 신규 한도 감소</td>
                        <td className="border border-border-base px-2 py-1">DSR 여유 축소 → 신규 대출 한도 감소 (감소폭은 소득·기존대출별 상이)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-lg border border-border-base bg-primary-500/5 p-3 text-sm text-text-secondary">
                  <strong>💡 요점:</strong> 현재 빌린 돈의 금리가 오르는 것(기존 부채)과 새로 빌릴 수 있는 한도가 줄어드는 것(신규 심사)은 다른 문제입니다. 이 가이드는 후자를 중점 설명합니다.
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 기준금리란 무엇인가? — 금통위가 결정하는 기초 금리</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  기준금리는 한국은행 금융통화위원회(금통위)가 <strong>한국은행법 §28</strong>에 따라 의결하는 <strong>정책금리</strong>입니다.
                  같은 조는 통화신용정책에 관한 사항을 금통위 의결사항으로 명시하고 있으며, 기준금리 결정·변경이 여기에 포함됩니다.
                  이 금리를 기준으로 은행들이 고객 대출의 가산금리를 책정합니다.
                  2026년 6월 현재 기준금리는 <strong>2.50%</strong>이며, 8연속 동결 상태입니다.
                  다음 금융통화위원회 정기회의는 <strong>7월 16일(목요일)</strong>에 개최될 예정입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 한국은행 기준금리 현황</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">항목</th>
                        <th scope="col" className="px-3 py-2 text-left">현황</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">현재 기준금리</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">2.50% (2026년 5월 28일 결정)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">동결 기간</td>
                        <td className="px-3 py-2">8연속 동결 (2025년 10월~2026년 5월)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">다음 회의</td>
                        <td className="px-3 py-2">2026년 7월 16일(목요일)</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">시장 전망</td>
                        <td className="px-3 py-2">인상 가능성 논의 중 (확정 아님)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>⚠️ 주의:</strong> 이 글은 "만약 7월에 기준금리가 인상된다면"이라는 가정 하에 작성됐습니다.
                    실제 금통위 결정 여부는 경제 상황, 인플레이션, 환율 등에 따라 결정되므로, 인상이 확정되지 않았습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 기준금리 인상이 바로 내 대출금리가 되는가? — 가산금리의 역할</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  아닙니다. 은행이 고객에게 제시하는 <strong>실제 대출금리 = 기준금리 + 가산금리</strong>입니다.
                  기준금리가 오르면, 은행은 가산금리를 조정합니다.
                  예를 들어 기준금리 2.50%에 가산금리 2.0%p면 고객 금리는 4.50%입니다.
                  기준금리가 2.75%로 오르면, 은행이 가산금리를 1.9%p로 인하하지 않는 한, 고객 금리는 4.65% 이상이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">실제 대출금리 구성 예시</h3>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <p>
                      <strong>현재 (기준금리 2.50%):</strong>
                      <br />
                      기준금리 2.50% + 가산금리 2.0%p = 고객 금리 4.50%
                    </p>
                    <p>
                      <strong>기준금리 인상 후 (기준금리 2.75%, 가산금리 유지):</strong>
                      <br />
                      기준금리 2.75% + 가산금리 2.0%p = 고객 금리 4.75%
                      <br />
                      → 월 상환액 증가 (5억 30년 기준: 약 7~8만원)
                    </p>
                    <p>
                      <strong>은행이 가산금리도 올린 경우 (기준금리 2.75%, 가산금리 2.1%p):</strong>
                      <br />
                      기준금리 2.75% + 가산금리 2.1%p = 고객 금리 4.85%
                      <br />
                      → 월 상환액 증가 (약 11만원)
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 팁:</strong> 가산금리는 신용도, 담보 종류, 지역, 대출 상품에 따라 다릅니다.
                    신용점수가 높을수록 가산금리가 낮고, 저신용자는 높을 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. DSR이란? — 월 상환액으로 대출 한도를 제한하는 규제</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  DSR(Debt Service Ratio)은 <strong>연 소득 대비 연 원리금 상환액의 비율</strong>입니다.
                  은행권에서는 DSR 40% 한도를 적용합니다(특정 대출은 50%).
                  법적 근거 측면에서 DSR은 단일 법률 조항이 아니라 <strong>은행법 §34</strong>(건전경영의 지도)를 모법으로
                  하여 금융위원회가 정하는 「은행업감독규정」 및 행정지도로 운용되는 건전성 규제입니다.
                  즉, 월 소득 500만원인 사람의 연 소득은 6,000만원이고, 모든 대출의 연 상환액이 2,400만원(연 소득의 40%)을 초과하면 신규 대출을 못 받습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">DSR 40% 기준의 정확한 계산</h3>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <p>
                      <strong>예시 1: 연소득 5,000만원, 기존 대출 월 상환액 150만원</strong>
                      <br />
                      기존 연 상환액 = 150만원 × 12 = 1,800만원
                      <br />
                      현재 DSR = 1,800만원 ÷ 5,000만원 = 36%
                      <br />
                      → 신규 대출 여유: (40% - 36%) × 5,000만원 = 200만원 (월 상환액)
                    </p>
                    <p>
                      <strong>예시 2: 기준금리 인상으로 월 상환액이 150만원 → 165만원으로 증가</strong>
                      <br />
                      새로운 연 상환액 = 165만원 × 12 = 1,980만원
                      <br />
                      새로운 DSR = 1,980만원 ÷ 5,000만원 = 39.6%
                      <br />
                      → 신규 대출 여유: (40% - 39.6%) × 5,000만원 = 20만원 (월 상환액)
                      <br />
                      → 기존: 200만원 여유 → 새로운: 20만원 여유 (180만원 감소!)
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>⚠️ 다만:</strong> 위 계산은 "새 대출의 금리"를 가정한 것입니다.
                    은행은 신규 대출 심사 시 "스트레스금리"(현재보다 높은 미래 금리)를 기준으로 하므로,
                    실제 한도는 더 보수적으로 책정됩니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-interest-rate-hike-dsr-loan-limit-july-2026-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 스트레스금리란? — "혹시 금리가 더 오르면" 대비하는 금리</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  은행은 신규 대출 심사 시 현재 금리가 아닌 <strong>&ldquo;미래 금리가 이 정도 올라도 버틸 수 있는가&rdquo;</strong>를 미리 시뮬레이션합니다.
                  이를 스트레스금리라고 부릅니다.
                  금융감독원이 정한 스트레스금리는 현재 약 <strong>1.5~3.0%p 범위</strong>입니다(지역·상품별로 다름).
                  따라서 현재 금리 4.5%인데 스트레스금리 3.0%p를 적용하면, DSR 계산 시 <strong>7.5%</strong> 금리로 역산합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">스트레스금리 적용의 영향</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">시나리오</th>
                        <th scope="col" className="px-3 py-2 text-left">실제 금리</th>
                        <th scope="col" className="px-3 py-2 text-left">스트레스금리</th>
                        <th scope="col" className="px-3 py-2 text-left">DSR 계산용 금리</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">현재 (기준금리 2.50%)</td>
                        <td className="px-3 py-2">4.50%</td>
                        <td className="px-3 py-2">2.0%p</td>
                        <td className="px-3 py-2">6.50%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">기준금리 인상 후 (기준금리 2.75%)</td>
                        <td className="px-3 py-2">4.75%</td>
                        <td className="px-3 py-2">2.5~3.0%p</td>
                        <td className="px-3 py-2">7.25~7.75%</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">결과</td>
                        <td className="px-3 py-2 text-primary-600" colSpan={3}>
                          DSR 계산용 금리 상승 → 월 상환액(추정) 증가 → 신규 한도 감소
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 요점:</strong> 스트레스금리는 은행별·상품별로 다르므로, 정확한 신규 대출 한도는 직접 은행에 문의해야 합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 기준금리 인상 시 주담대·전세대출 한도는 얼마나 감소할까?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  정확한 수치를 예측하기는 어렵습니다. 왜냐하면 (1) 은행별 가산금리 인상폭 (2) 개인의 신용도 (3) 스트레스금리 적용 수준이 모두 다르기 때문입니다.
                  다만 <strong>일반적인 가정 시나리오</strong>로 방향을 보면 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">가정 조건</h3>
                  <ul className="space-y-1.5 text-sm text-text-secondary">
                    <li>연소득: 5,000만원</li>
                    <li>기존 대출: 없음 (순수 신규 대출 한도만 계산)</li>
                    <li>현재 금리: 4.50% (기준금리 2.50% + 가산금리 2.0%p)</li>
                    <li>스트레스금리: 2.5%p (중간값)</li>
                    <li>대출 기간: 30년 (원리금균등)</li>
                    <li>LTV (담보가치 대비 대출 비율): 70% 적용</li>
                  </ul>
                </div>
                <div className="overflow-x-auto my-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">금리가 오르면 신규 대출 한도는? (가정 시나리오)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">항목</th>
                        <th scope="col" className="px-3 py-2 text-left">현재 (기준금리 2.50%)</th>
                        <th scope="col" className="px-3 py-2 text-left">+0.25%p 가정 (2.75%)</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">고객 금리</td>
                        <td className="px-3 py-2">4.50%</td>
                        <td className="px-3 py-2">4.75% (가산금리 2.0%p 유지 가정)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">DSR 심사용 금리 (+스트레스 2.5%p)</td>
                        <td className="px-3 py-2">7.00%</td>
                        <td className="px-3 py-2">7.25%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">DSR 40% 월 상환 한계</td>
                        <td className="px-3 py-2" colSpan={2}>약 166.7만원 (연소득 5,000만 × 40% ÷ 12 — 소득 기반이라 금리와 무관)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신규 대출 한도 (30년·기존대출 없음)</td>
                        <td className="px-3 py-2 font-bold text-primary-600">약 2.50억원</td>
                        <td className="px-3 py-2 font-bold text-danger-600">약 2.44억원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">한도 변화</td>
                        <td className="px-3 py-2 text-primary-600" colSpan={2}>약 -600만원 (소득·기존대출·LTV에 따라 달라짐)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>⚠️ 중요:</strong> 이 수치는 가정에 기반한 개략 추정입니다.
                    실제 한도는 은행별 신용도 심사, LTV 규제, 추가 가산금리 인상, 기타 부채 여부에 따라 크게 달라질 수 있습니다.
                    정확한 한도는 우리 사이트의 <Link href="/calculator/loan-limit/" className="text-primary-600 underline dark:text-primary-500">대출한도 계산기</Link>를 이용하거나 은행에 직접 문의하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 전세자금대출은 주담대와 다르게 취급되나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 다릅니다. 전세자금대출의 DSR 적용 여부는 <strong>차주 속성에 따라</strong> 달라집니다.
                  <strong>1주택자 + 수도권·규제지역 조건</strong>에서만 DSR이 적용됩니다.
                  <strong>무주택자 전세대출은 &lsquo;서민 생활&rsquo; 근거로 DSR 규제를 받지 않습니다.</strong>
                  따라서 금리가 올라도 한도 감소가 주담대보다 직접적이지 않을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">주담대 vs 전세대출 DSR 적용 비교</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-primary-500/10">
                          <th scope="col" className="border border-border-base px-2 py-2 text-left">대출 유형</th>
                          <th scope="col" className="border border-border-base px-2 py-2 text-left">DSR 적용</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border border-border-base">
                          <td className="px-2 py-1 font-semibold">주택담보대출 (주담대)</td>
                          <td className="px-2 py-1">모든 차주에게 DSR 40% 적용</td>
                        </tr>
                        <tr className="border border-border-base">
                          <td className="px-2 py-1 font-semibold">전세자금대출 (1주택자, 수도권·규제지역)</td>
                          <td className="px-2 py-1">DSR 적용 (일부 예외 검토 중)</td>
                        </tr>
                        <tr className="border border-border-base bg-primary-500/5">
                          <td className="px-2 py-1 font-semibold">전세자금대출 (무주택자)</td>
                          <td className="px-2 py-1">DSR 제외 (규제 비적용)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 의미:</strong> 무주택자 전세대출은 기준금리 인상 후에도 직접적인 한도 감소가 적습니다.
                    다만 은행이 가산금리를 올리면 실제 금리 부담은 증가합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 지금 변동금리로 빌렸을 때 내 금리는 올라가나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  <strong>네, 변동금리면 올라갑니다.</strong> 기준금리가 오르고 은행이 가산금리를 조정하면, 다음 달 이자부터 새로운 금리가 적용됩니다.
                  다만 <strong>고정금리로 계약했다면</strong> 계약 기간 중 금리 변화의 영향을 받지 않습니다.
                  「금융소비자 보호에 관한 법률」 <strong>§19</strong>(설명의무)에 따라 은행은 대출 계약 시 금리·변동 여부·상환방법·중도상환수수료 등 중요한 사항을 설명하도록 의무화돼 있으므로,
                  계약서에 명시된 &lsquo;변동금리&rsquo; 또는 &lsquo;고정금리&rsquo; 표기와 금리 변동 조건을 반드시 확인하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">변동금리 vs 고정금리</h3>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <p>
                      <strong>변동금리 (대부분의 주담대):</strong>
                      <br />
                      기준금리 변화 → 가산금리 조정 → 월 금리 변동 → 월 상환액 증가/감소
                    </p>
                    <p>
                      <strong>고정금리 (계약 기간 동안 금리 고정):</strong>
                      <br />
                      기준금리 변화 → 금리 변동 없음 → 월 상환액 유지 (계약 기간 내)
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>⚠️ 다만:</strong> 일부 은행은 고정금리 기간 종료 후 변동금리로 전환하거나,
                    고정·변동 전환 옵션을 제공합니다. 계약서에 명시된 조건을 확인하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. 기준금리 인상이 확정되기 전에 할 수 있는 준비</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  아직 7월 기준금리 인상이 확정되지 않았습니다. 하지만 금리 인상 가능성에 대비해 할 수 있는 준비가 있습니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">1) 고정금리 전환 검토</h3>
                    <p className="text-sm text-text-secondary">
                      현재 변동금리 대출이 있다면, 금리가 오르기 전에 고정금리로 전환할 수 있는지 은행에 문의하세요.
                      고정금리 기간 동안은 기준금리 변화의 영향을 받지 않습니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">2) 신규 대출 계획 단기 집행</h3>
                    <p className="text-sm text-text-secondary">
                      차입을 계획 중이라면, 금리가 오르기 전에 사전심사나 실행을 마무리하는 것이 유리할 수 있습니다.
                      다만 충동적인 결정은 피하고, 정말 필요한 대출인지 검토하세요.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">3) 현재 한도 확인</h3>
                    <p className="text-sm text-text-secondary">
                      우리 사이트의 <Link href="/calculator/loan-limit/" className="text-primary-600 underline dark:text-primary-500">대출한도 계산기</Link>를 이용해
                      현재 본인의 예상 한도를 확인해두세요.
                      인상 후와 비교해 얼마나 감소했는지 판단할 수 있습니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">4) 소득 확대 또는 기존 부채 감축</h3>
                    <p className="text-sm text-text-secondary">
                      DSR은 소득에 따라 좌우됩니다. 추가 소득원을 찾거나 기존 부채를 줄이면 신규 대출 여유가 생깁니다.
                      예를 들어 월 부채 상환액을 10만원 감축하면 대출 여유는 약 3,000만원 증가합니다.
                    </p>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 · 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/loan-limit/" className="text-primary-600 underline dark:text-primary-500">
                      DSR·LTV 대출한도 계산기
                    </Link>
                    {' — 현재 신규 대출 한도를 정확히 계산'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/loan/" className="text-primary-600 underline dark:text-primary-500">
                      대출이자 계산기
                    </Link>
                    {' — 월별 상환액, 총 이자 시뮬레이션'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/dsr-loan-limit-tips/" className="text-primary-600 underline dark:text-primary-500">
                      DSR 40% 규제를 피하는 5가지 팁
                    </Link>
                    {' — 신규 대출 한도를 늘리는 전략'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/dsr-regulation-zones/" className="text-primary-600 underline dark:text-primary-500">
                      DSR·규제지역 완벽 해석
                    </Link>
                    {' — 지역별, 세대별 다른 규제 적용'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/deposit/" className="text-primary-600 underline dark:text-primary-500">
                      정기예금 이자 계산기
                    </Link>
                    {' — 금리 인상 시 예금 수익 변화'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="7월 기준금리 인상 시뮬레이션 — DSR·주담대 한도 변화 가이드"
                url={URL}
                description="금통위 기준금리 인상 → 월 상환액 증가 → DSR 악화 → 대출한도 감소. 메커니즘을 실제 계산으로 설명합니다."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 한국은행법 §28(금융통화위원회 의결사항 — 기준금리 결정),
                  은행법 §34(건전경영의 지도 — DSR 등 은행업감독규정의 모법),
                  금융소비자 보호에 관한 법률 §19(설명의무 — 대출 금리·변동 여부·상환방법 설명) · {' '}
                  <a
                    href="https://www.bok.or.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국은행 기준금리 및 금융통화위원회
                  </a>{' '}
                  · {' '}
                  <a
                    href="https://www.fsc.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독위원회 DSR 규제 정책
                  </a>{' '}
                  · {' '}
                  <a
                    href="https://portal.kfb.or.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    전국은행연합회 대출금리 현황
                  </a>{' '}
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 2일 기준 한국은행 기준금리(2.50%) 및 공식 DSR 규제 정책을 바탕으로 작성됐습니다.
                  7월 기준금리 인상은 아직 공식 결정되지 않았으며, 실제 기준금리 인상폭, 은행별 가산금리 조정, 개인의 신용도 및 기타 부채에 따라
                  신규 대출 한도는 크게 달라질 수 있습니다.
                  정확한 대출 한도 및 금리는 은행에 직접 문의하시거나 우리 사이트의 <Link href="/calculator/loan-limit/" className="text-primary-600 underline dark:text-primary-500">대출한도 계산기</Link>를 이용하세요.
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
