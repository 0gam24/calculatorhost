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

// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 검색 의도 흡수)

const URL = 'https://calculatorhost.com/guide/newborn-special-mortgage-loan-2026/';
const DATE_PUBLISHED = '2026-07-23';
const DATE_MODIFIED = '2026-07-23';

export const metadata: Metadata = {
  title: '신생아 특례 디딤돌대출 2026, 소득요건·금리·한도 정리 | calculatorhost',
  description:
    '2년 내 출산한 무주택 가구를 위한 신생아 특례 디딤돌대출. 부부합산 소득요건, 특례금리 1.8~4.5%, 최대 4억 한도, 대상 주택과 신청 방법을 2026년 기준으로 정리했습니다.',
  keywords: [
    '신생아 특례대출',
    '신생아 특례 디딤돌대출',
    '신생아 대출 소득요건',
    '신생아 특례대출 금리',
    '출산 가구 주택자금',
    '디딤돌대출 2026',
    '주택도시기금 대출',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '신생아 특례 디딤돌대출 2026, 소득요건·금리·한도 정리' }],
    title: '신생아 특례 디딤돌대출 2026, 출산 가구 저금리 구입자금',
    description: '2년 내 출산 무주택 가구 대상. 부부합산 소득요건, 특례금리, 최대 4억 한도, 대상 주택과 신청 방법을 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '신생아 특례 디딤돌대출 2026, 소득요건·금리·한도',
    description: '2년 내 출산 무주택 가구 저금리 구입자금. 부부합산 소득요건과 특례금리 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '신생아 특례 디딤돌대출이란 무엇인가요?',
    answer:
      '신생아 특례 디딤돌대출은 최근 2년 내에 출산한 무주택 가구가 집을 살 때 저금리로 자금을 빌려주는 주택도시기금 대출입니다. 출산 가구의 주거 부담을 낮추기 위한 정책 상품으로, 일반 디딤돌대출보다 소득요건이 완화되고 금리가 낮은 것이 특징입니다. 구입자금은 디딤돌, 전세자금은 버팀목 형태로 운영됩니다.',
  },
  {
    question: '소득 요건은 얼마까지인가요?',
    answer:
      '부부합산 연소득 2억 원 이하가 기준입니다. 여기에 더해 순자산가액 요건(약 4.88억 원 이하)도 함께 충족해야 합니다. 소득요건은 정책에 따라 조정될 수 있으므로, 신청 직전에는 주택도시기금 기금e든든 또는 취급 은행에서 그 시점의 정확한 기준을 확인해야 합니다.',
  },
  {
    question: '금리와 대출 한도는 어떻게 되나요?',
    answer:
      '특례금리는 대략 연 1.8%에서 4.5% 수준으로, 대출 후 처음 5년간 적용되는 것이 기본입니다. 구입자금(디딤돌)은 최대 4억 원까지 가능하며, 소득과 자녀 수, 대상 주택 가격에 따라 실제 금리와 한도가 달라집니다. 금리와 한도는 소관 부처 고시로 정해지므로 정확한 값은 국토교통부와 주택도시기금에서 확인하세요.',
  },
  {
    question: '누가 신청할 수 있나요?',
    answer:
      '대출 신청일 기준 2년 내에 출산한 무주택 세대주가 대상입니다. 통상 2023년 1월 1일 이후 출생한 자녀가 있는 가구부터 적용되며, 기존 대출을 갈아타는 대환의 경우 1주택 세대주도 대상이 될 수 있습니다. 혼인신고 여부와 무관하게 출산 사실이 요건이므로, 세부 자격은 신청 전에 확인이 필요합니다.',
  },
  {
    question: '어떤 주택을 사야 대출이 되나요?',
    answer:
      '주거 전용면적 85제곱미터 이하이면서 주택 시세(평가액)가 9억 원을 넘지 않는 주택이 대상입니다. 면적과 가격 요건을 모두 충족해야 하므로, 관심 있는 매물이 대상인지 미리 확인하는 것이 좋습니다. 대상 주택 기준도 정책에 따라 바뀔 수 있으므로 최신 기준을 확인하세요.',
  },
  {
    question: '어떻게 신청하나요?',
    answer:
      '주택도시기금 기금e든든 홈페이지나 기금 수탁은행(국민·신한·우리·농협·기업 등) 창구에서 신청합니다. 보통 매매계약을 체결하고 잔금 지급 전에 대출을 신청하며, 소득·재직·무주택·출산 증빙 서류가 필요합니다. 잔금일에 맞춰 자금이 집행되므로 일정 여유를 두고 진행하는 것이 안전합니다.',
  },
  {
    question: '특례금리 5년이 지나면 금리가 오르나요?',
    answer:
      '특례금리는 기본적으로 처음 5년간 적용되며 이후에는 일반 디딤돌대출 금리 체계로 전환됩니다. 다만 특례기간 중 추가로 출산하면 우대금리나 특례기간 연장 혜택을 받을 수 있는 경우가 있습니다. 추가 출산 우대의 구체적 조건은 신청 시점의 기금 안내를 확인하세요.',
  },
  {
    question: '신생아 특례 디딤돌대출은 스트레스 DSR의 적용을 받나요?',
    answer:
      '정책 기금 대출은 일반 시중 주택담보대출과 규제 적용 방식이 다릅니다. 서민·정책금융 성격의 기금 대출은 스트레스 DSR 적용이 완화되거나 별도 기준이 적용되는 경우가 있습니다. 다만 개인별 총부채 상황에 따라 다르므로, 정확한 적용 여부는 취급 은행에서 확인하는 것이 좋습니다.',
  },
];

export default function NewbornSpecialMortgageLoan2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '신생아 특례 디딤돌대출 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '신생아 특례 디딤돌대출 2026, 출산 가구 저금리 구입자금',
    description:
      '2년 내 출산한 무주택 가구를 위한 신생아 특례 디딤돌대출. 부부합산 소득요건, 특례금리 1.8~4.5%, 최대 4억 한도, 대상 주택과 신청 방법을 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['신생아 특례대출', '디딤돌대출', '소득요건', '특례금리', '출산 가구'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '신생아 특례 디딤돌대출 2026',
    description:
      '신생아 특례 디딤돌대출의 소득요건, 금리, 한도, 대상 주택, 신청 방법을 2026년 기준으로 정리한 가이드.',
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
                    { name: '신생아 특례 디딤돌대출 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">출산 무주택 가구 · 8분 읽기 · 2026-07-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  신생아 특례 디딤돌대출 2026
                  <br />
                  <span className="text-2xl text-text-secondary">소득요건·금리·한도 한눈에</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  아이를 낳고 내 집 마련을 고민하는 무주택 부부라면 신생아 특례 디딤돌대출로 저금리 구입자금을 받을 수 있는지 가장 궁금할 것입니다. 이 가이드는 출산 가구를 대상으로 부부합산 소득요건, 특례금리와 한도, 대상 주택 조건, 신청 절차를 2026년 기준으로 단계별로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-newborn-special-mortgage-loan-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신생아 특례 디딤돌대출이란?</h2>
                <p>
                  신생아 특례 디딤돌대출은 최근 2년 내 출산한 무주택 가구가 집을 살 때 저금리로 지원하는 주택도시기금 대출입니다. 일반 디딤돌대출보다 소득요건이 완화되고 금리가 낮아, 출산 직후 주거 마련 부담을 크게 줄여 줍니다.
                </p>
                <p>
                  구입자금은 디딤돌, 전세자금은 버팀목 형태로 나뉩니다. 이 가이드는 집을 사는 데 쓰는 구입자금(디딤돌)을 중심으로 설명합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈에 보기(2026 기준)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 신청일 기준 2년 내 출산한 무주택 세대주
                    <br />
                    · 소득: 부부합산 2억 원 이하(순자산 요건 별도)
                    <br />
                    · 금리: 특례금리 약 1.8~4.5%(초기 5년)
                    <br />
                    · 한도: 구입자금 최대 4억 원
                    <br />
                    · 주택: 전용 85제곱미터 이하, 시세 9억 원 이하
                  </p>
                </div>
                <p>
                  다만 위 수치는 정책에 따라 조정될 수 있는 항목이 많습니다. 신청 직전에는 국토교통부와 주택도시기금 기금e든든에서 최신 기준을 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득 요건은 얼마까지인가요?</h2>
                <p>
                  부부합산 연소득 2억 원 이하가 기준입니다. 출산 가구 지원을 위해 일반 디딤돌대출보다 소득 상한이 높게 설정되어 있습니다.
                </p>
                <p>
                  소득뿐 아니라 순자산가액 요건(약 4.88억 원 이하)도 함께 충족해야 합니다. 순자산에는 부동산, 금융자산 등에서 부채를 뺀 값이 반영되므로 소득만 보고 판단하면 안 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 신생아 특례 디딤돌대출 핵심 요건(2026 기준, 변동 가능)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부부합산 소득</td>
                        <td className="p-3">연 2억 원 이하</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">순자산</td>
                        <td className="p-3">약 4.88억 원 이하</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주택 요건</td>
                        <td className="p-3">전용 85제곱미터 이하, 시세 9억 원 이하</td>
                      </tr>
                      <tr>
                        <td className="p-3">출산 요건</td>
                        <td className="p-3">신청일 기준 2년 내 출산</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 소득·순자산 요건은 매년 기금운용계획에 따라 바뀔 수 있습니다. 위 값은 2026년 시점의 일반적 기준이며, 확정 여부는 소관 부처 고시를 참조하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금리와 한도는 어떻게 되나요?</h2>
                <p>
                  특례금리는 대략 연 1.8~4.5% 수준으로, 대출 후 처음 5년간 적용되는 것이 기본입니다. 소득이 낮을수록, 대출 기간이 짧을수록 낮은 구간의 금리가 적용되는 경향이 있습니다.
                </p>
                <p>
                  구입자금 한도는 최대 4억 원입니다. 다만 실제 한도는 담보 주택의 가격과 담보인정비율(LTV), 소득 대비 상환 부담에 따라 낮아질 수 있으므로, 최대 한도가 곧 내 한도는 아닙니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">예시. 시세 5억 원 주택을 구입하는 출산 가구</p>
                  <p className="text-sm text-text-secondary">
                    · 담보 주택 시세: 5억 원(전용 84제곱미터, 요건 충족)
                    <br />
                    · 부부합산 소득: 1억 2,000만 원(요건 이내)
                    <br />
                    · 신청 대출: 구입자금 3억 5,000만 원
                    <br />
                    <span className="text-xs text-text-tertiary">실제 승인 한도는 LTV, 상환능력 심사에 따라 조정됩니다. 예시는 이해를 돕기 위한 가정입니다.</span>
                  </p>
                </div>
                <p>
                  주의: 특례금리와 한도의 구체적 값은 소관 부처 고시로 정해지고 수시로 바뀝니다. 반드시 국토교통부와 주택도시기금에서 확정 값을 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-newborn-special-mortgage-loan-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 신청하나요?</h2>
                <p>
                  주택도시기금 기금e든든 홈페이지나 기금 수탁은행 창구에서 신청합니다. 보통 매매계약 체결 후 잔금 지급 전에 신청하며, 잔금일에 맞춰 대출금이 집행됩니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>매매계약 체결 후 대상 주택이 면적·가격 요건을 충족하는지 확인합니다.</li>
                  <li>기금e든든에서 자격(소득·순자산·무주택·출산)을 사전 조회합니다.</li>
                  <li>수탁은행에 소득·재직·무주택·출산 증빙 서류를 제출합니다.</li>
                  <li>심사를 거쳐 잔금일에 대출금이 집행됩니다.</li>
                </ol>
                <p>
                  예외: 대환(기존 대출 갈아타기)이나 1주택 세대주의 경우 절차와 필요 서류가 다를 수 있으므로, 사전에 수탁은행과 상담하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">디딤돌(구입)과 버팀목(전세)의 차이</h2>
                <p>
                  신생아 특례대출은 자금 용도에 따라 구입자금(디딤돌)과 전세자금(버팀목)으로 나뉩니다. 집을 사는지, 전세로 들어가는지에 따라 선택이 달라집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 신생아 특례 구입자금과 전세자금 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">디딤돌(구입)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">버팀목(전세)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">용도</td>
                        <td className="p-3">주택 매입 자금</td>
                        <td className="p-3">전세보증금 마련</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">담보</td>
                        <td className="p-3">매입 주택</td>
                        <td className="p-3">임차보증금 반환채권</td>
                      </tr>
                      <tr>
                        <td className="p-3">특징</td>
                        <td className="p-3">내 집 마련</td>
                        <td className="p-3">전세 거주</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 두 상품은 소득·자산 요건은 비슷해도 한도와 금리 구간이 다릅니다. 매입과 전세 중 어느 쪽이 유리한지는 자금 여력과 주거 계획에 따라 달라지므로, 두 조건을 함께 비교해 결정하는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">특례금리 구간별 월 상환액을 시뮬레이션하세요.</p>
                  </Link>
                  <Link
                    href="/guide/ltv-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">LTV 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">담보인정비율이 한도에 주는 영향을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/stress-dsr-stage3-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">스트레스 DSR 3단계 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">시중 대출과 정책 기금 대출의 규제 차이를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-loan-limit-interest-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세자금대출 한도·이자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세 거주를 고려한다면 버팀목과 함께 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/spouse-childbirth-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 출산휴가 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 전후 함께 챙기는 아빠 휴가 제도를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/loan-limit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출한도 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득 대비 대출 가능액을 미리 가늠해보세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 특정 대출상품 권유가 아닙니다. 소득·순자산 요건, 특례금리, 한도, 대상 주택 기준은 매년 기금운용계획과 소관 부처 고시에 따라 달라집니다. 본문 수치는 2026년 시점의 일반적 기준이며 실제 자격·한도·금리는 국토교통부, 주택도시기금 기금e든든, 수탁은행에서 반드시 확인하세요. 본 콘텐츠는 2026-07-23을 기준으로 작성되었으며, 정책 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(주택도시기금법)</a>,{' '}
                  <a href="https://www.lh.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국토지주택공사(LH)</a>,{' '}
                  <a href="https://enhuf.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">주택도시기금 기금e든든</a>.
                </p>
              </section>

              <ShareButtons
                title="신생아 특례 디딤돌대출 2026, 소득요건·금리·한도 정리"
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
