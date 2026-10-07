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
const DATE_MODIFIED = '2026-10-07';

export const metadata: Metadata = {
  title: '종부세 주택가액 기준 전환 2026 개편안, 1주택 공제 14억',
  description:
    '2026 세제개편안 정부안이 9월 1일 확정, 9월 3일 국회에 제출됐습니다. 실거주 1세대1주택 기본공제는 14억으로 상향, 비거주 1주택 9억 축소안과 세부담상한 200% 상향안은 정부안에서 철회되어 현행이 유지됩니다(종합부동산세법 §8·§9·§10 개정안, 2027년부터 단계 시행).',
  keywords: [
    '종부세 주택가액 기준',
    '종부세 14억',
    '실거주 1주택 종부세',
    '종부세 개편안 2026',
    '2026 세제개편안 정부안',
    '비거주 1주택 12억 유지',
    '종부세 세부담상한 150%',
    '종합부동산세법 8조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종부세 주택가액 기준 전환 2026 개편안, 1주택 공제 14억' }],
    title: '종부세 주택가액 기준 전환 2026 개편안, 1주택 공제 14억',
    description: '9월 1일 정부안 확정, 9월 3일 국회 제출. 실거주 1주택 공제 14억 상향, 비거주 1주택 9억 축소안은 철회되어 12억 유지. 2027년부터 단계 시행.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종부세 주택가액 기준 전환 2026 개편안',
    description: '9월 1일 정부안 확정. 실거주 1주택 14억 상향, 비거주 1주택 9억 축소안은 철회(12억 유지). 2027년부터 단계 시행.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종부세가 주택 수 기준에서 어떻게 바뀌나요?',
    answer:
      '보유 주택 수 대신 합산 주택가액을 중심으로 세율을 매기는 방향입니다. 현행은 1주택과 2주택 이하, 3주택 이상을 나눠 다른 세율을 적용하지만(종합부동산세법 §9), 9월 1일 확정된 정부안은 1·2주택과 3주택 이상 세율을 2028년까지 단계적으로 맞춰 가액 중심 구조로 통합합니다. 세부 세율 구간은 국회 심의로 최종 확정됩니다.',
  },
  {
    question: '1세대1주택 기본공제가 14억으로 오르나요?',
    answer:
      '실거주 1주택은 14억으로 오르는 방향이 정부안에 그대로 담겼습니다. 현행 1세대1주택 기본공제는 공시가격 12억원인데, 정부안은 실거주 1주택자에게 14억원을 적용합니다(종합부동산세법 §8 개정안). 공시가격 14억은 시세로 대략 20억원 안팎이므로, 실거주 중저가 1주택은 상당수가 과세 대상에서 빠질 수 있습니다.',
  },
  {
    question: '비거주 1주택도 공제가 9억으로 줄어드나요?',
    answer:
      '아닙니다, 9억 축소안은 철회됐습니다. 8월 3일 발표안은 비거주 1주택 기본공제를 12억에서 9억으로 낮추려 했지만, 9월 1일 국무회의가 확정한 정부안에서 이 축소는 제외됐고 현행 12억이 그대로 유지됩니다. 다만 공정시장가액비율이 2027년부터 1주택자 70%로 오르므로, 공제액이 유지되더라도 과세표준은 커지는 영향을 받습니다.',
  },
  {
    question: '세부담 상한 200% 인상은 어떻게 됐나요?',
    answer:
      '현행 150%가 유지됩니다. 8월 발표안은 전년 보유세 대비 올해 세부담의 상한을 150%에서 200%로 올리려 했지만, 9월 1일 정부안에서 이 상향은 철회됐습니다. 종합부동산세법 §10의 세부담 상한은 현행 150% 그대로 적용됩니다.',
  },
  {
    question: '다주택자는 이제 유리해지나요?',
    answer:
      '일률적으로 유리하다고 보기 어렵습니다. 주택 수 중과가 사라지는 점은 다주택자에게 유리하지만, 1·2주택과 3주택 이상 세율이 2028년까지 통합되고 과세표준 6~12억 구간이 1.0%에서 1.3%로, 12~25억 구간이 1.3%에서 2.0%로 올라갑니다. 공정시장가액비율도 3주택 이상은 2028년 80%까지 오르므로, 고가 주택을 합산한 경우 세부담이 늘 수 있습니다.',
  },
  {
    question: '언제부터 적용되나요?',
    answer:
      '2027년부터 단계적으로 시행되는 안입니다. 9월 1일 국무회의가 정부안을 확정하고 9월 3일까지 11개 세법 개정법률안이 국회에 제출돼 정기국회에서 심사 중입니다. 공정시장가액비율 인상은 2027년부터, 가액 중심 세율 통합과 공제 조정은 2028년부터 본격 적용되는 안이며, 2026년 종부세(12월 고지·납부)는 현행법으로 부과됩니다.',
  },
  {
    question: '시가 20억 주택이면 종부세를 안 내나요?',
    answer:
      '정부안이 통과되고 실거주 1주택 요건을 충족하면 안 낼 가능성이 큽니다. 공시가격 14억 공제는 시세로 약 20억 안팎에 해당하므로, 실거주 1주택이고 공시가격이 14억 이하이면 과세표준이 0이 되어 종부세가 부과되지 않습니다. 다만 공시가격이 14억을 넘으면 초과분에 대해 과세되고, 재산세(지방세)는 별도로 부과됩니다. 2026년분은 현행 12억 공제가 적용됩니다.',
  },
  {
    question: '고령자와 장기보유 세액공제는 그대로인가요?',
    answer:
      '존치되지만 한도가 단계적으로 줄어드는 방향입니다. 현행은 1세대1주택자에게 고령자 세액공제와 장기보유 세액공제를 합산 최대 80%까지 적용하되 세액공제 한도가 있는데, 정부안은 2027년 800만원, 2028년 600만원으로 한도를 단계적으로 낮춥니다. 세액공제 요건도 실거주 중심으로 재편될 수 있으므로 확정 내용은 통과된 법률로 확인하세요.',
  },
];

export default function ComprehensiveRealEstateTaxValueBasedReform2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종부세 주택가액 기준 전환 2026 개편안' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종부세 주택가액 기준 전환 2026 개편안, 실거주 1주택 14억 상향 비거주 12억 유지',
    description:
      '2026 세제개편안 정부안 기준 종합부동산세 개편 정리. 실거주 1세대1주택 공제 14억 상향, 비거주 1주택 9억 축소안과 세부담상한 200% 안은 철회되어 현행 유지, 가액 중심 세율 통합은 2028년부터 본격 시행.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합부동산세', '주택가액 기준', '1세대1주택 공제 14억', '2026 세제개편안 정부안', '비거주 1주택 12억 유지', '세부담 상한 150%'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종부세 주택가액 기준 전환 2026 개편안',
    description:
      '2026 세제개편안 정부안의 종합부동산세 개편 정리. 실거주 1주택 공제 14억 상향, 비거주 1주택 9억 축소와 세부담상한 200% 상향은 철회(현행 유지), 가액 중심 세율은 2028년부터 단계 시행.',
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
                <p className="mb-2 text-caption text-text-tertiary">주택 보유자 · 9분 읽기 · 2026-10-07 업데이트</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종부세 주택가액 기준 전환 2026 개편안
                  <br />
                  <span className="text-2xl text-text-secondary">· 실거주 1주택 14억, 비거주 1주택 12억 유지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 8월 3일 발표된 세제개편안은 종합부동산세를 주택 수가 아니라 주택가액과 실거주 여부 중심으로 바꾸는 방향을 담았습니다. 이후 9월 1일 국무회의가 정부안을 확정하면서, 비거주 1주택 기본공제를 9억으로 낮추려던 안과 세부담 상한을 200%로 올리려던 안은 철회되어 현행이 유지됐습니다. 이 글은 주택을 보유한 분을 위해, 실거주 1주택 공제 14억 상향을 중심으로 무엇이 바뀌고 무엇이 그대로 유지되는지, 그리고 언제부터 적용되는지를 현행 기준과 함께 정리합니다.
                </p>
              </header>

              <section className="rounded-lg border border-border-base bg-bg-card p-5 text-sm" data-speakable>
                <p className="font-semibold text-text-primary">2026-10-07 기준 진행 상황</p>
                <ul className="mt-2 ml-5 list-disc space-y-1 text-text-secondary">
                  <li>9월 1일 국무회의가 2026년 세제개편안 정부안을 확정했고, 11개 세법 개정법률안이 9월 3일까지 국회에 제출돼 정기국회에서 심사 중입니다.</li>
                  <li>8월 발표안에서 비거주 1주택 기본공제 9억 축소안과 세부담 상한 200% 상향안은 정부안에서 철회됐습니다. 두 항목 모두 현행이 유지됩니다.</li>
                  <li>실거주 1세대1주택 공제 14억 상향은 정부안에 그대로 담겼고, 가액 중심 세율 통합은 2027년부터 단계적으로 시행되는 안입니다.</li>
                  <li>2026년분 종부세(12월 고지·납부)는 현행법(1세대1주택 12억, 그 외 9억, 세부담 상한 150%)으로 부과됩니다.</li>
                </ul>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-5" data-speakable>
                <p className="font-semibold text-text-primary">30초 요약</p>
                <ul className="ml-5 list-disc space-y-1 text-sm text-text-secondary">
                  <li>과세 기준이 주택 수에서 합산 주택가액과 실거주 여부로 이동합니다(2028년부터 세율 통합 본격).</li>
                  <li>실거주 1세대1주택 기본공제는 12억에서 14억으로 상향, 비거주 1주택은 현행 12억이 그대로 유지됩니다(원안 9억 축소는 정부안에서 철회).</li>
                  <li>세부담 상한도 현행 150%가 유지됩니다(원안 200% 상향은 철회).</li>
                  <li>공정시장가액비율은 2027년부터 1주택자 70%, 3주택 이상은 2028년 80%로 단계 인상되는 안입니다.</li>
                  <li>2026년분 종부세(12월 납부)는 현행법으로 부과됩니다.</li>
                </ul>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 1세대1주택 기본공제·세부담 상한, 현행과 8월 발표안, 9월 정부안 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">현행</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">8월 발표안</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">9월 정부안</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과세 기준</td>
                        <td className="p-3">주택 수 구분</td>
                        <td className="p-3">가액 + 실거주</td>
                        <td className="p-3">가액 중심(2028 통합)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">실거주 1주택 공제</td>
                        <td className="p-3">12억원</td>
                        <td className="p-3">14억원 상향</td>
                        <td className="p-3">14억원 유지</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비거주 1주택 공제</td>
                        <td className="p-3">12억원</td>
                        <td className="p-3">9억원 축소</td>
                        <td className="p-3">12억원(축소 철회)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">그 외(다주택 등)</td>
                        <td className="p-3">9억원</td>
                        <td className="p-3">가액 기준 재설계</td>
                        <td className="p-3">가액 기준 재설계</td>
                      </tr>
                      <tr>
                        <td className="p-3">세부담 상한</td>
                        <td className="p-3">150%</td>
                        <td className="p-3">200% 상향</td>
                        <td className="p-3">150%(상향 철회)</td>
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
                  개편안은 몇 채인지보다 보유한 주택의 전체 가액이 얼마인지, 그리고 실제 거주하는지를 기준으로 삼습니다. 즉 저가 주택을 여러 채 가진 경우보다, 고가 주택을 합산한 경우에 세율이 높아지는 방향입니다. 과세표준과 세율의 뼈대는 종합부동산세법 §8(과세표준)과 §9(세율 및 세액), 세부담 상한은 §10에 있으며, 이번 개편은 이 조문의 구조를 재설계하는 것입니다.
                </p>
                <p>
                  9월 1일 확정된 정부안은 1·2주택자의 과세표준 12억~25억 구간 세율을 2027년 1.5%, 2028년 2.0%로 올려 3주택 이상 세율과 맞추고, 과세표준 6억~12억 구간도 1.0%에서 1.3%로 올립니다. 공정시장가액비율도 2027년부터 1주택자·지방 1·2주택자는 70%, 3주택 이상·조정대상지역은 2028년 80%로 단계적으로 인상됩니다. 가액 중심 세율 통합은 2028년부터 본격 적용되는 안이며, 2026년분 종부세는 현행법으로 부과됩니다. 정확한 세율표와 시행 시기는 국회 통과 법률로 확인해야 합니다.
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
                <h2 className="text-2xl font-bold">비거주 1주택 공제, 결국 어떻게 됐나</h2>
                <p>
                  비거주 1주택 기본공제를 9억으로 낮추려던 안은 9월 1일 정부안에서 철회됐습니다. 8월 3일 발표안은 실제 거주 여부를 핵심 기준으로 삼아 거주 목적이 아닌 1주택의 세부담을 높이려 했지만, 비거주 축소안은 현실적 반발과 입법 부담을 반영해 수정됐습니다. 그 결과 비거주 1주택도 현행과 같은 12억 기본공제가 유지됩니다. 거주 1주택 14억 상향은 그대로 담겼으므로, 거주와 비거주 사이에 2억의 공제 차이가 생기는 구조입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">비교 예시, 공시가격 13억 1주택</p>
                  <p className="text-sm text-text-secondary">
                    실거주(공제 14억): 13억 - 14억 &lt; 0 이므로 과세표준 0, 종부세 없음.
                    <br />
                    비거주(공제 12억 유지): 13억 - 12억 = 1억이 공제 후 금액이 되어, 공정시장가액비율(현행 60%, 2027년 70%)을 곱한 과세표준에 세율이 적용됩니다.
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 13억 주택도 거주 여부에 따라 과세표준 폭이 달라집니다. 다만 비거주의 세부담 증가 폭은 당초 안(9억 축소)보다 완만합니다.</span>
                  </p>
                </div>
                <p>
                  다만 여당은 거주 여부로 공제액을 나누지 말고 양쪽 모두 14억으로 통일하자는 입장이고, 비거주 공제를 두고 국회 심사 과정에서 추가 조정 가능성이 있습니다. 공정시장가액비율도 2027년부터 1주택자 70%로 올라 과세표준이 커지므로, 공제가 유지되더라도 체감 세부담은 달라질 수 있습니다. 실거주 판정 기준(전입, 실제 거주기간 등)은 시행령으로 구체화되므로 확정 규정을 확인하세요.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">다주택자는 유리해질까 불리해질까</h2>
                <p>
                  일률적으로 유리하다고 보기 어렵습니다. 주택 수 중과가 사라지는 점은 다주택자에게 유리하지만, 정부안은 1·2주택과 3주택 이상 세율을 2028년까지 통합하면서 과표 6억~12억 구간을 1.0%에서 1.3%로, 12억~25억 구간을 1.3%에서 2.0%로 올립니다. 공정시장가액비율도 3주택 이상은 2028년 80%까지 상향되므로, 고가 주택을 합산한 경우 오히려 세부담이 늘 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 보유 형태별 정부안 방향(정성 비교, 2027~2028 단계 시행 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">보유 형태</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">정부안 방향</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">실거주 중저가 1주택</td>
                        <td className="p-3">공제 14억으로 부담 감소</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비거주 고가 1주택</td>
                        <td className="p-3">공제 12억 유지, 공정시장가액비율 70% 영향</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">저가 주택 다주택</td>
                        <td className="p-3">세율 통합으로 격차 축소, 상대적 유리 가능</td>
                      </tr>
                      <tr>
                        <td className="p-3">고가 주택 합산 다주택</td>
                        <td className="p-3">세율 통합·공정시장가액비율 80% 등으로 부담 증가 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 위 방향은 정부안의 취지를 정리한 것이며, 실제 유불리는 확정 세율 구간과 공정시장가액비율, 그리고 국회 심사 결과에 따라 달라집니다. 보유 재산이 크면 세무 전문가와 시나리오별로 검토하세요.
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
                  <strong>면책조항:</strong> 본 가이드는 교육 목적이며 개인 맞춤형 세무 조언이 아닙니다. 2026년 세제개편안은 8월 3일 발표 후 9월 1일 국무회의에서 정부안으로 확정됐고, 11개 세법 개정법률안이 9월 3일까지 국회에 제출돼 정기국회에서 심사 중인 안(案)입니다. 비거주 1주택 공제 9억 축소안과 세부담 상한 200% 상향안은 정부안에서 철회되어 현행이 유지되며, 거주 1주택 공제 14억 상향과 가액 중심 세율 통합·공정시장가액비율 인상은 2027년부터 단계적으로 시행되는 안입니다. 세율 구간, 공정시장가액비율, 실거주 판정 기준은 국회를 통과한 법률과 시행령으로 달라질 수 있습니다. 2026년분 종부세(12월 고지·납부)는 현행 기준(1세대1주택 12억 공제, 그 외 9억, 세부담 상한 150% 등)으로 부과됩니다. 인용 조항: 종합부동산세법 §7(납세의무자), §8(과세표준), §9(세율 및 세액), §10(세부담의 상한). 본 콘텐츠는 2026-10-07 기준이며 법 개정 시 업데이트됩니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">재정경제부(세제개편안)</a>,{' '}
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
