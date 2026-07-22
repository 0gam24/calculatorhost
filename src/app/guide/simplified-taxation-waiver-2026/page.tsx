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

const URL = 'https://calculatorhost.com/guide/simplified-taxation-waiver-2026/';
const DATE_PUBLISHED = '2026-07-23';
const DATE_MODIFIED = '2026-07-23';

export const metadata: Metadata = {
  title: '간이과세 포기 신고 2026, 매입세액공제·3년 제한 정리 | calculatorhost',
  description:
    '간이과세 포기는 스스로 일반과세자가 되는 절차입니다. 매입세액 전액 공제와 세금계산서 발급이 목적이며, 신고한 달의 다음 달부터 적용되고 3년간 재적용이 제한됩니다. 부가가치세법 §70 기준으로 정리했습니다.',
  keywords: [
    '간이과세 포기',
    '간이과세 포기 신고',
    '간이과세 일반과세 전환',
    '매입세액공제',
    '간이과세 3년 제한',
    '부가가치세법 70조',
    '자영업자 부가세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '간이과세 포기 신고 2026, 매입세액공제·3년 제한 정리' }],
    title: '간이과세 포기 신고 2026, 일반과세 전환이 유리한 경우',
    description: '매입세액 전액 공제와 세금계산서 발급을 위한 간이과세 포기. 적용 시점, 3년 재적용 제한, 손익 비교를 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '간이과세 포기 신고 2026, 매입세액공제·3년 제한',
    description: '스스로 일반과세자가 되는 절차. 부가가치세법 §70, 3년 재적용 제한.',
  },
};

const FAQ_ITEMS = [
  {
    question: '간이과세 포기란 무엇인가요?',
    answer:
      '간이과세 포기는 간이과세자가 스스로 일반과세자가 되기로 신고하는 절차입니다(부가가치세법 §70). 매출 규모가 작아 간이과세 대상이더라도, 매입세액을 전액 공제받거나 거래처에 세금계산서를 발급하기 위해 일반과세를 선택하는 것입니다. 세무서 신고 또는 홈택스로 간이과세 포기신고서를 제출하면 됩니다.',
  },
  {
    question: '왜 간이과세를 포기하나요?',
    answer:
      '가장 큰 이유는 매입세액 공제와 세금계산서 발급입니다. 일반과세자는 매입 시 부담한 부가가치세를 전액 공제받고, 매입이 매출보다 많으면 환급도 받을 수 있습니다. 반면 간이과세자는 매입세액 공제가 제한적입니다. 또한 거래처가 세금계산서를 요구하는 경우 일반과세자여야 발급이 원활하므로, 사업 초기 투자가 크거나 B2B 거래가 많은 사업자가 주로 포기를 선택합니다.',
  },
  {
    question: '언제 신고하고 언제부터 일반과세자가 되나요?',
    answer:
      '간이과세 포기신고는 원하는 때에 할 수 있으며, 신고한 달의 다음 달 1일부터 일반과세자로 전환됩니다. 예를 들어 7월 중에 포기신고를 하면 8월 1일부터 일반과세자가 됩니다. 전환 이후에는 일반과세자로서 세금계산서 발급, 부가가치세 신고 의무가 발생합니다.',
  },
  {
    question: '한 번 포기하면 얼마나 유지해야 하나요?',
    answer:
      '간이과세를 포기하면 일반과세자로 전환된 날부터 3년이 되는 날이 속하는 과세기간까지 다시 간이과세를 적용받을 수 없습니다(부가가치세법 §70). 즉 최소 3년간은 일반과세자로 유지해야 하므로, 매입세액 공제 이득이 3년간의 일반과세 부담을 넘어서는지 미리 따져봐야 합니다.',
  },
  {
    question: '간이과세와 일반과세 중 어느 쪽이 유리한가요?',
    answer:
      '매입 비중이 크고 세금계산서 거래가 많으면 일반과세가 유리하고, 마진이 높고 최종 소비자 대상 현금거래가 많으면 간이과세가 유리한 경향이 있습니다. 간이과세자는 업종별 낮은 부가가치율로 세액을 계산해 세부담이 작지만 매입세액 공제와 환급이 제한됩니다. 사업 형태에 따라 유불리가 갈리므로 연간 매입·매출 구조를 기준으로 판단해야 합니다.',
  },
  {
    question: '간이과세를 포기하면 세금계산서를 꼭 발급해야 하나요?',
    answer:
      '네, 일반과세자로 전환되면 재화·용역 공급 시 세금계산서 발급 의무가 생깁니다. 이는 거래처가 매입세액 공제를 받기 위해 필요로 하는 것이므로, B2B 거래가 많은 사업자에게는 오히려 장점입니다. 다만 발급·신고 의무가 늘어나므로 장부 관리와 신고 일정에 유의해야 합니다.',
  },
  {
    question: '3년이 지나면 다시 간이과세로 돌아갈 수 있나요?',
    answer:
      '재적용 제한 기간이 지나고 직전 연도 공급대가가 간이과세 기준 금액 미만이면 다시 간이과세를 적용받을 수 있습니다. 이때는 간이과세 적용신고를 하면 됩니다. 최근에는 일정 요건을 충족하면 3년 이내라도 재적용 여지가 논의되는 등 제도가 바뀔 수 있으므로, 전환 시점의 정확한 규정은 국세청과 홈택스에서 확인하세요.',
  },
  {
    question: '간이과세 포기는 어디서 신고하나요?',
    answer:
      '관할 세무서에 간이과세 포기신고서를 제출하거나 홈택스에서 전자 신고할 수 있습니다. 사업자등록 정정과 함께 처리되는 경우가 많으며, 전환 예정일 전에 미리 신고해야 원하는 시점부터 일반과세가 적용됩니다. 신고 후에는 일반과세자용 세금계산서 발급 준비를 갖추는 것이 좋습니다.',
  },
];

export default function SimplifiedTaxationWaiver2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '간이과세 포기 신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '간이과세 포기 신고 2026, 일반과세 전환이 유리한 경우',
    description:
      '간이과세 포기는 스스로 일반과세자가 되는 절차. 매입세액 전액 공제와 세금계산서 발급이 목적이며, 신고 다음 달부터 적용되고 3년간 재적용이 제한됩니다. 부가가치세법 §70 기준 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['간이과세 포기', '일반과세 전환', '매입세액공제', '3년 제한', '세금계산서'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '간이과세 포기 신고 2026',
    description:
      '간이과세 포기의 이유, 적용 시점, 3년 재적용 제한, 간이 대 일반과세 손익 비교를 정리한 자영업자 가이드.',
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
                    { name: '간이과세 포기 신고 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자 · 7분 읽기 · 2026-07-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  간이과세 포기 신고 2026
                  <br />
                  <span className="text-2xl text-text-secondary">매입세액공제와 3년 제한 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  간이과세자인데 매입세액을 공제받고 싶거나 거래처가 세금계산서를 요구해 일반과세로 바꿔야 하나 고민하는 사장님이라면, 간이과세 포기가 무엇이고 언제부터 적용되며 손해는 아닌지 궁금할 것입니다. 이 가이드는 부가가치세법 §70을 근거로 간이과세 포기의 이유, 신고 시점, 3년 재적용 제한, 간이 대 일반과세 손익 비교를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-simplified-taxation-waiver-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세 포기란 무엇인가요?</h2>
                <p>
                  간이과세 포기는 간이과세자가 스스로 일반과세자가 되기로 신고하는 절차입니다. 부가가치세법 §70에 규정되어 있으며, 매출이 작아 간이과세 대상이더라도 본인 판단으로 일반과세를 선택할 수 있게 한 제도입니다.
                </p>
                <p>
                  간이과세자는 세부담이 낮은 대신 매입세액 공제와 세금계산서 발급에 제약이 있습니다. 이 제약을 벗어나기 위해 일반과세를 택하는 것이 간이과세 포기의 핵심입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">간이과세 포기의 핵심</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 근거: 부가가치세법 §70(간이과세의 포기)
                    <br />
                    · 목적: 매입세액 전액 공제, 세금계산서 발급
                    <br />
                    · 적용 시점: 포기신고한 달의 다음 달 1일부터 일반과세
                    <br />
                    · 제한: 전환 후 3년간 간이과세 재적용 불가
                  </p>
                </div>
                <p>
                  다만 한번 포기하면 최소 3년은 일반과세자로 유지해야 하므로, 즉흥적으로 결정하기보다 매입·매출 구조를 계산해 보고 판단하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">왜 간이과세를 포기하나요?</h2>
                <p>
                  가장 큰 이유는 매입세액 공제와 세금계산서 발급입니다. 사업 초기 인테리어·설비 투자가 크거나 거래처가 세금계산서를 요구할 때 일반과세가 유리해집니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>매입세액 전액 공제:</strong> 일반과세자는 매입 시 부담한 부가가치세를 전액 공제받습니다. 매입이 매출보다 많으면 그 차액을 환급받을 수 있습니다.
                  </li>
                  <li>
                    <strong>세금계산서 발급:</strong> 거래처(사업자)가 매입세액 공제를 받으려면 세금계산서가 필요합니다. 일반과세자로 발급이 원활해지면 B2B 거래가 수월해집니다.
                  </li>
                  <li>
                    <strong>초기 투자 회수:</strong> 개업 첫해 설비 투자가 큰 업종은 매입세액 공제로 초기 부가세 부담을 크게 줄일 수 있습니다.
                  </li>
                </ul>
                <p>
                  다만 매입이 적고 최종 소비자를 상대로 현금거래가 많은 업종은 간이과세의 낮은 세부담이 더 유리할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제 신고하고 언제부터 일반과세자가 되나요?</h2>
                <p>
                  간이과세 포기신고는 원하는 때에 할 수 있고, 신고한 달의 다음 달 1일부터 일반과세자로 전환됩니다. 시점 계산이 중요하므로 아래 예시로 확인해 보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 7월 중 포기신고를 하는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 7월 15일 간이과세 포기신고서 제출
                    <br />
                    · 8월 1일부터 일반과세자로 전환
                    <br />
                    · 8월 1일 이후 공급분부터 세금계산서 발급, 매입세액 전액 공제 대상
                    <br />
                    <span className="text-xs text-text-tertiary">전환 시점 이전의 매입은 일반과세 방식 공제 대상이 아닐 수 있으므로 시점 관리가 중요합니다.</span>
                  </p>
                </div>
                <p>
                  주의: 큰 설비 투자를 앞두고 있다면, 그 매입이 일반과세 전환 이후 시점에 이뤄지도록 신고 타이밍을 맞춰야 매입세액 공제를 온전히 받을 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-simplified-taxation-waiver-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세와 일반과세 중 어느 쪽이 유리한가요?</h2>
                <p>
                  매입 비중과 거래 상대에 따라 유불리가 갈립니다. 매입이 많고 세금계산서 거래가 많으면 일반과세, 마진이 높고 소비자 현금거래가 많으면 간이과세가 유리한 경향입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 간이과세와 일반과세 비교(개념 정리)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">간이과세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반과세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">세액 계산</td>
                        <td className="p-3">업종별 낮은 부가가치율 적용</td>
                        <td className="p-3">매출세액에서 매입세액 차감</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">매입세액 공제</td>
                        <td className="p-3">제한적</td>
                        <td className="p-3">전액 공제</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">환급</td>
                        <td className="p-3">원칙적으로 불가</td>
                        <td className="p-3">가능(매입 초과 시)</td>
                      </tr>
                      <tr>
                        <td className="p-3">세금계산서 발급</td>
                        <td className="p-3">제약 있음</td>
                        <td className="p-3">발급 의무</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 위 비교는 일반적 경향이며, 실제 유불리는 업종별 부가가치율과 연간 매입·매출 금액에 따라 달라집니다. 애매하면 세무대리인 또는 국세청 상담을 통해 본인 사업 기준으로 계산해 보는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">3년 재적용 제한과 되돌리기</h2>
                <p>
                  간이과세를 포기하면 최소 3년간은 일반과세자로 유지해야 합니다. 부가가치세법 §70에 따라 일반과세 전환일부터 3년이 되는 날이 속하는 과세기간까지 간이과세 재적용이 제한됩니다.
                </p>
                <p>
                  제한 기간이 지난 뒤 직전 연도 공급대가가 간이과세 기준 금액 미만이면, 간이과세 적용신고를 통해 다시 간이과세로 돌아갈 수 있습니다. 다만 요건에 따라 3년 이내라도 재적용 여지가 논의되는 등 규정이 바뀔 수 있습니다.
                </p>
                <p>
                  주의: 포기는 되돌리기까지 시간이 걸리는 결정입니다. 3년간의 일반과세 부담과 매입세액 공제 이득을 비교해, 순이득이 확실할 때 신고하는 것이 바람직합니다. 정확한 기준 금액과 재적용 조건은 국세청과 홈택스에서 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 부가세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세자의 부가세 계산 방식과 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/vat-non-deductible-input-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 매입세액 불공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">공제되지 않는 매입세액 유형을 미리 파악하세요.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">설비 투자 시 매입세액을 빨리 돌려받는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이·일반 과세유형 선택부터 등록 절차까지.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세 경비 처리 방식도 함께 이해하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세·종합소득세·양도세 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 간이과세 기준 금액, 업종별 부가가치율, 재적용 조건은 세법 개정에 따라 달라질 수 있으므로, 실제 신고 전에는 국세청 홈택스 또는 세무대리인을 통해 본인 사업 기준으로 확인하세요. 본 콘텐츠는 2026-07-23을 기준으로 작성되었으며, 세법 개정 시 업데이트됩니다. 근거 법조항은 <strong>부가가치세법 §70(간이과세의 포기)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="간이과세 포기 신고 2026, 매입세액공제·3년 제한 정리"
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
