// [revenue-lever: traffic+indexing] 2026 세제개편안 종부세 주택가액 기준 전환 급상승 검색 흡수, 롱테일 트래픽 + 색인 표면 확대.
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/comprehensive-real-estate-tax-value-based-reform-2026/';
const DATE_PUBLISHED = '2026-08-22';
const DATE_MODIFIED = '2026-08-22';

export const metadata: Metadata = {
  title: '종부세 주택가액 기준 전환 2026 개편안, 1주택 공제 14억',
  description:
    '2026 세제개편안이 종합부동산세를 주택 수에서 주택가액 기준으로 바꾸는 방향을 담았습니다. 1세대1주택 기본공제 실거주 14억, 비거주 9억으로 차등, 시가 약 20억 이하 과세 제외, 고가주택 과세 강화까지 정리합니다(종합부동산세법 §8·§9 개정안).',
  keywords: [
    '종부세 주택가액 기준',
    '종부세 14억',
    '실거주 1주택 종부세',
    '종부세 개편안 2026',
    '비거주 1주택 9억',
    '주택수 대신 가액',
    '종합부동산세법 8조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종부세 주택가액 기준 전환 2026 개편안, 1주택 공제 14억' }],
    title: '종부세 주택가액 기준 전환 2026 개편안, 1주택 공제 14억',
    description: '주택 수가 아니라 가액과 실거주 중심으로. 실거주 1주택 14억, 비거주 9억 차등 공제 방향을 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종부세 주택가액 기준 전환 2026 개편안',
    description: '주택수 대신 가액 기준. 실거주 1주택 공제 14억, 비거주 9억 차등안을 정리합니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종부세가 주택 수 기준에서 어떻게 바뀌나요?',
    answer:
      '보유 주택 수 대신 합산 주택가액을 중심으로 세율을 매기는 방향입니다. 현행은 1주택과 2주택 이하, 3주택 이상을 나눠 다른 세율을 적용하지만(종합부동산세법 §9), 개편안은 몇 채인지보다 전체 가액이 얼마인지와 실제 거주 여부를 기준으로 삼습니다. 다만 세부 세율 구간은 국회 심의로 확정됩니다.',
  },
  {
    question: '1세대1주택 기본공제가 14억으로 오르나요?',
    answer:
      '실거주 1주택은 14억으로 오르는 방향입니다. 현행 1세대1주택 기본공제는 공시가격 12억원인데, 개편안은 실거주 1주택자에게 14억원을 적용합니다(종합부동산세법 §8). 공시가격 14억은 시세로 대략 20억원 안팎이므로, 실거주 중저가 1주택은 상당수가 과세 대상에서 빠질 수 있습니다.',
  },
  {
    question: '집에 안 살면 공제가 9억으로 줄어드나요?',
    answer:
      '비거주 1주택은 9억으로 축소되는 방향입니다. 개편안은 실거주 여부를 핵심 기준으로 삼아, 실제 살지 않는 1주택은 기본공제를 현행 12억보다 낮은 9억으로 줄이는 안을 담았습니다. 거주하지 않는 고가 1주택의 세부담이 늘어날 수 있습니다.',
  },
  {
    question: '다주택자는 이제 유리해지나요?',
    answer:
      '반드시 그렇지는 않습니다. 주택 수 중과가 사라지는 대신 합산 가액이 크면 높은 구간 세율이 적용되므로, 저가 주택 여러 채는 유리해질 수 있어도 고가 주택을 합산한 다주택자는 세부담이 늘 수 있습니다. 최종 유불리는 확정된 세율 구간에 따라 달라집니다.',
  },
  {
    question: '언제부터 적용되나요?',
    answer:
      '아직 확정되지 않았습니다. 2026년 8월 3일 발표된 세제개편안에 담긴 방향으로, 입법예고와 국회 심의, 의결을 거쳐야 시행됩니다. 2026년 8월 현재는 발표된 안(案) 단계이므로, 올해 종부세는 현행 기준(1세대1주택 12억 공제 등)으로 부과됩니다.',
  },
  {
    question: '시가 20억 주택이면 종부세를 안 내나요?',
    answer:
      '실거주 1주택이면 안 낼 가능성이 큽니다. 공시가격 14억 공제는 시세로 약 20억 안팎에 해당하므로, 실거주 1주택이고 공시가격이 14억 이하이면 종부세 과세표준이 0이 되어 부과되지 않습니다. 다만 공시가격이 14억을 넘으면 초과분에 대해 과세되고, 재산세는 별도로 부과됩니다.',
  },
  {
    question: '고령자와 장기보유 세액공제는 그대로인가요?',
    answer:
      '존치 방향이나 실거주 기준으로 재편될 수 있습니다. 현행은 1세대1주택자에게 고령자 세액공제와 장기보유 세액공제를 합산 최대 80%까지 적용합니다. 개편안은 단순 보유보다 실제 거주를 중시하는 흐름이므로, 세액공제 요건도 거주 기준으로 조정될 수 있습니다. 확정 내용은 통과된 법률로 확인하세요.',
  },
];

export default function ComprehensiveRealEstateTaxValueBasedReform2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종부세 주택가액 기준 전환 2026 개편안' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종부세 주택가액 기준 전환 2026 개편안, 실거주 1주택 14억 비거주 9억',
    description:
      '주택 수에서 주택가액과 실거주 중심으로 바뀌는 종합부동산세 개편안. 1세대1주택 기본공제 14억/9억 차등, 과세 제외 범위, 고가주택 과세 강화 방향을 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합부동산세', '주택가액 기준', '1세대1주택 공제', '실거주', '2026 세제개편안'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종부세 주택가액 기준 전환 2026 개편안',
    description:
      '종합부동산세를 주택가액과 실거주 중심으로 재편하는 개편안의 핵심과 1주택 공제 14억/9억 차등 정리.',
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
                    { name: '종부세 주택가액 기준 전환 2026 개편안' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 보유자 · 8분 읽기 · 2026-08-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종부세 주택가액 기준 전환 2026 개편안
                  <br />
                  <span className="text-2xl text-text-secondary">· 실거주 1주택 14억, 비거주 9억</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 8월 3일 발표된 세제개편안은 종합부동산세를 주택 수가 아니라 주택가액과 실거주 여부 중심으로 바꾸는 방향을 담았습니다. 이 글은 주택을 보유한 분을 위해, 무엇이 바뀌는지, 실거주 1주택 공제 14억과 비거주 9억이 어떤 의미인지, 그리고 언제부터 적용되는지를 현행 기준과 함께 정리합니다.
                </p>
              </header>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-5" data-speakable>
                <p className="font-semibold text-text-primary">30초 요약</p>
                <ul className="ml-5 list-disc space-y-1 text-sm text-text-secondary">
                  <li>과세 기준이 주택 수에서 합산 주택가액과 실거주 여부로 이동합니다.</li>
                  <li>1세대1주택 기본공제가 실거주 14억, 비거주 9억으로 차등됩니다(현행 12억).</li>
                  <li>공시가격 14억은 시세로 약 20억 안팎이라 실거주 중저가 1주택은 상당수 제외됩니다.</li>
                  <li>2026년 8월 현재 발표된 안이며, 올해 종부세는 현행 기준으로 부과됩니다.</li>
                </ul>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 1세대1주택 기본공제 현행과 개편안 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">현행</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">개편안</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과세 기준</td>
                        <td className="p-3">주택 수 구분</td>
                        <td className="p-3">합산 가액 + 실거주</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">실거주 1주택 공제</td>
                        <td className="p-3">12억원</td>
                        <td className="p-3">14억원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비거주 1주택 공제</td>
                        <td className="p-3">12억원</td>
                        <td className="p-3">9억원</td>
                      </tr>
                      <tr>
                        <td className="p-3">그 외(다주택 등)</td>
                        <td className="p-3">9억원</td>
                        <td className="p-3">가액 기준 재설계</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">무엇이 바뀌나: 주택 수에서 가액으로</h2>
                <p>
                  과세의 축이 주택 수에서 합산 가액으로 옮겨갑니다. 현행 종합부동산세는 1주택자와 2주택 이하, 3주택 이상 다주택자를 나눠 서로 다른 세율을 적용합니다(종합부동산세법 §9). 그래서 같은 자산이라도 몇 채로 나눠 가지고 있느냐에 따라 세부담이 크게 달라졌습니다.
                </p>
                <p>
                  개편안은 몇 채인지보다 보유한 주택의 전체 가액이 얼마인지, 그리고 실제 거주하는지를 기준으로 삼습니다. 즉 저가 주택을 여러 채 가진 경우보다, 고가 주택을 합산한 경우에 세율이 높아지는 방향입니다. 과세표준과 세율의 뼈대는 종합부동산세법 §8(과세표준)과 §9(세율 및 세액)에 있으며, 이번 개편은 이 조문의 구조를 재설계하는 것입니다.
                </p>
                <p>
                  다만 구체적인 가액 구간과 세율표는 2026년 8월 현재 확정되지 않았습니다. 발표된 방향을 기준으로 이해하되, 정확한 세율 구간은 국회를 통과한 법률로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">실거주 1주택 공제 14억은 무슨 의미인가</h2>
                <p>
                  실거주 1주택자의 기본공제가 12억에서 14억으로 오르는 방향입니다. 종합부동산세는 공시가격 합계에서 기본공제를 뺀 금액을 기준으로 계산하므로(종합부동산세법 §8), 공제가 커지면 과세표준이 줄고 세금이 낮아집니다.
                </p>
                <p>
                  공시가격 14억은 시세로 대략 20억원 안팎입니다. 따라서 실거주 1주택이고 공시가격이 14억 이하이면 종부세 과세표준이 0이 되어 부과되지 않습니다. 실거주 중저가 1주택 상당수가 과세 대상에서 빠지는 효과가 기대됩니다.
                </p>
                <p>
                  예외: 공시가격이 14억을 넘으면 초과분에 대해서만 종부세가 계산됩니다. 또 종부세와 별개로 재산세(지방세)는 별도로 부과되므로, 종부세가 없더라도 재산세는 매년 내야 합니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">집에 안 살면 공제 9억, 왜 줄이나</h2>
                <p>
                  실거주를 하지 않는 1주택은 기본공제가 9억으로 줄어드는 방향입니다. 개편안의 핵심 철학이 실제 거주를 중시하는 데 있기 때문입니다. 거주 목적이 아닌 고가 1주택 보유의 세부담을 높여, 실거주 실수요와 형평을 맞추려는 취지입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">비교 예시. 공시가격 13억 1주택</p>
                  <p className="text-sm text-text-secondary">
                    실거주(공제 14억): 13억 - 14억 &lt; 0 이므로 과세표준 0, 종부세 없음.
                    <br />
                    비거주(공제 9억): 13억 - 9억 = 4억이 공제 후 금액이 되어, 공정시장가액비율(현행 60%)을 곱한 과세표준에 세율이 적용됩니다.
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 13억 주택도 거주 여부에 따라 종부세가 있고 없고가 갈립니다.</span>
                  </p>
                </div>
                <p>
                  다만 위 예시의 세액 산출에는 공정시장가액비율과 세율표가 필요하며, 개편안 세율은 미확정입니다. 실거주 판정 기준(전입, 실제 거주기간 등)도 시행령으로 구체화되므로 확정 규정을 확인하세요.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">다주택자는 유리해질까 불리해질까</h2>
                <p>
                  일률적으로 유리하다고 보기 어렵습니다. 주택 수 중과가 사라지는 점은 다주택자에게 유리하지만, 합산 가액이 크면 높은 구간 세율이 적용되므로 고가 주택을 여러 채 합산한 경우는 오히려 세부담이 늘 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 보유 형태별 개편안 방향(정성 비교)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">보유 형태</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">개편안 방향</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">실거주 중저가 1주택</td>
                        <td className="p-3">공제 14억으로 부담 감소</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비거주 고가 1주택</td>
                        <td className="p-3">공제 9억으로 부담 증가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">저가 주택 다주택</td>
                        <td className="p-3">수 중과 폐지로 유리 가능</td>
                      </tr>
                      <tr>
                        <td className="p-3">고가 주택 합산 다주택</td>
                        <td className="p-3">가액 구간 상향으로 부담 증가 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 위 방향은 발표된 개편안의 취지를 정리한 것이며, 실제 유불리는 확정 세율 구간과 공정시장가액비율에 따라 달라집니다. 보유 재산이 크면 세무 전문가와 시나리오별로 검토하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/property-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보유세의 기본인 재산세부터 계산해보세요.</p>
                  </Link>
                  <Link href="/guide/comprehensive-real-estate-tax-calculation-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">종합부동산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">공제, 공정시장가액비율, 세율 적용을 정리합니다.</p>
                  </Link>
                  <Link href="/guide/comprehensive-real-estate-tax-single-house-credit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">1세대1주택 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">고령자, 장기보유 세액공제 최대 80%를 확인하세요.</p>
                  </Link>
                  <Link href="/guide/property-tax-vs-comprehensive-real-estate-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">재산세 vs 종합부동산세</div>
                    <p className="mt-1 text-sm text-text-secondary">두 보유세의 관계와 차이를 이해하세요.</p>
                  </Link>
                  <Link href="/guide/comprehensive-real-estate-tax-who-pays-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">종부세 납세의무자</div>
                    <p className="mt-1 text-sm text-text-secondary">누가 종부세 대상이 되는지 기준을 확인하세요.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 취득세, 재산세, 종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적이며 개인 맞춤형 세무 조언이 아닙니다. 종합부동산세 주택가액 기준 전환과 1세대1주택 공제 14억/9억 차등은 2026년 8월 3일 발표된 세제개편안(案)으로, 국회 통과 전까지 확정된 제도가 아닙니다. 세율 구간, 공정시장가액비율, 실거주 판정 기준은 최종 통과된 법률과 시행령으로 달라질 수 있습니다. 올해 종부세는 현행 기준(1세대1주택 12억 공제 등)으로 부과됩니다. 인용 조항: 종합부동산세법 §7(납세의무자), §8(과세표준), §9(세율 및 세액), §10의2(세부담상한). 본 콘텐츠는 2026-08-22 기준이며 법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부(세제개편안)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons title="종부세 주택가액 기준 전환 2026 개편안" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
