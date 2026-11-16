import type { Metadata } from 'next';
import { GuideCalculatorCta } from '@/components/guide/GuideCalculatorCta';
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

const URL = 'https://calculatorhost.com/guide/vehicle-individual-consumption-tax-deadline-2026-june/';
const DATE_PUBLISHED = '2026-06-01';
const DATE_MODIFIED = '2026-10-30';

export const metadata: Metadata = {
  title: '자동차 개별소비세 인하 종료, 7월부터 5% 환원',
  description:
    '2026년 6월 30일 출고분까지 자동차 개별소비세 3.5% 한시 인하가 적용되고, 7월 1일 출고분부터 기본세율 5%로 돌아왔습니다.',
  keywords: [
    '자동차 개별소비세',
    '자동차 개별소비세 인하',
    '개별소비세 인하 종료',
    '개별소비세 5%',
    '개소세 출고 기준',
    '친환경차 개별소비세 감면',
    '전기차 개별소비세',
    '개별소비세법 1조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const FAQ_ITEMS = [
  {
    question: '자동차 개별소비세 인하는 언제 끝났나요?',
    answer:
      '2026년 6월 30일 자정 기준으로 종료됐습니다. 6월 30일까지 출고된 차량에는 한시 인하율 3.5%가, 7월 1일 이후 출고분부터는 기본세율 5%(개별소비세법 §1 ②제3호)가 적용됩니다. 기준은 계약일이 아니라 공장 출고일이기 때문에, 6월 안에 계약했어도 7월에 출고된 차량은 5%로 과세됐습니다.',
  },
  {
    question: '지금 신차를 사면 얼마나 더 비싸졌나요?',
    answer:
      '개별소비세율이 3.5%에서 5%로 1.5%포인트 다시 올랐고, 이에 연동되는 교육세(개소세의 30%)와 부가가치세(10%)도 함께 늘어 공장도 가격의 약 2.14%만큼 세금이 더 붙습니다. 공장도 가격 6,667만원이면 약 143만원, 4,000만원이면 약 86만원, 2,000만원이면 약 43만원이 인하 당시보다 비싸진 셈입니다. 실제 금액은 차량가와 옵션에 따라 다릅니다.',
  },
  {
    question: '7월 이후 다시 인하될 가능성은 없나요?',
    answer:
      '2026년 10월 30일 기준 추가 연장은 발표되지 않았습니다. 정부는 내수가 회복세라는 이유로 추가 연장이 필요하지 않다고 밝혔습니다. 향후 정책이 다시 바뀌면 기획재정부·국세청 공지에서 확인할 수 있습니다.',
  },
  {
    question: '전기차·수소차·하이브리드도 7월부터 세금이 올랐나요?',
    answer:
      '자동차 개별소비세 한시 인하와 친환경차 개별소비세 감면은 서로 다른 제도입니다. 친환경차(전기차·수소차·하이브리드) 개별소비세 감면은 2026년 12월 31일까지 유지되며, 7월 1일 이후 출고된 친환경차에는 그 감면이 그대로 적용됩니다.',
  },
  {
    question: '중고차도 영향이 있나요?',
    answer:
      '자동차 개별소비세는 신차 등록 때만 과세되는 세금이라 중고차 거래에는 처음부터 해당하지 않았습니다. 중고차는 취득세·이전등록세 기준을 따르므로 이번 인하 종료의 직접적 영향도 없습니다.',
  },
  {
    question: '6월 말 계약·7월 초 출고라면 인하 혜택을 받지 못했나요?',
    answer:
      '네, 받지 못했습니다. 개별소비세는 공장 출고일(출고신고일) 기준으로 세율이 결정되므로, 계약이 6월이어도 7월 1일 이후 출고된 차량에는 기본세율 5%가 적용됐습니다. 이 때문에 6월 안에 계약했어도 출고가 7월로 넘어간 경우는 인하 가격이 아닙니다.',
  },
  {
    question: '개별소비세는 언제 어떻게 내나요?',
    answer:
      '신차를 등록할 때 취득세·개별소비세·교육세·부가가치세가 함께 고지됩니다. 보통 딜러가 등록을 대행하면서 일괄 수납하지만, 영수증에 개별소비세율이 3.5%인지 5%인지 꼭 확인하세요. 7월 1일 이후 출고분이라면 5%가 맞습니다.',
  },
  {
    question: '한시 인하의 법적 근거는 무엇이었나요?',
    answer:
      '승용자동차 개별소비세 기본세율은 개별소비세법 §1 ②제3호에 따라 5%입니다. 같은 법 §1 ⑦(탄력세율)이 경기 조절이 필요한 경우 기본세율의 ±30% 범위에서 세율을 조정할 수 있다고 규정하고, 이 권한에 근거해 시행령에서 자동차 개별소비세를 3.5%로 한시 인하해 두었습니다. 2026년 6월 30일 출고분을 끝으로 §1 본칙의 5%로 복귀했습니다.',
  },
] as const;

export default function VehicleIndividualConsumptionTaxDeadlinePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차 개별소비세 인하 종료' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차 개별소비세 인하 종료, 7월부터 기본세율 5% 환원',
    description:
      '2026년 6월 30일 출고분까지 자동차 개별소비세 3.5% 한시 인하가 적용되고, 7월 1일 출고분부터 기본세율 5%로 돌아왔습니다. 친환경차 감면은 12월 31일까지 별도로 유지됩니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차 개별소비세', '개별소비세 인하 종료', '7월 1일 출고', '친환경차 감면'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차 개별소비세 인하 종료, 7월부터 5% 환원',
    description:
      '자동차 개별소비세 한시 인하(3.5%)는 2026년 6월 30일 출고분을 끝으로 종료됐고, 7월 1일 출고분부터는 기본세율 5%가 적용됩니다. 친환경차 감면은 2026년 12월 31일까지 유지됩니다.',
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
                    { name: '자동차 개별소비세 인하 종료' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·자동차 · 6분 읽기 · 2026-10-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차 개별소비세 인하 종료
                  <br />
                  <span className="text-2xl text-text-secondary">· 7월 1일 출고분부터 기본세율 5% 환원</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자동차 개별소비세 한시 인하(3.5%)는 2026년 6월 30일 자정을 기준으로 종료됐습니다.
                  7월 1일 이후 출고된 승용자동차는 개별소비세법 §1 ②제3호의 기본세율 5%가 다시 적용되고,
                  정부는 내수 회복세를 이유로 추가 연장을 하지 않았습니다. 기준은 계약일이 아니라 공장
                  출고일이므로, 6월에 계약했더라도 7월에 출고된 차량에는 5%가 과세됐습니다. 친환경차
                  (전기차·수소차·하이브리드) 개별소비세 감면은 별도 제도이며 2026년 12월 31일까지 유지됩니다.
                </p>
              </header>
              <GuideCalculatorCta slug="vehicle-individual-consumption-tax-deadline-2026-june" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-2 text-sm" data-speakable>
                  <p className="font-semibold text-text-primary">
                    자동차 개별소비세 한시 인하(3.5%)는 2026년 6월 30일 출고분으로 종료됐고, 7월 1일 출고분부터 기본세율 5%가 적용됩니다.
                  </p>
                  <ul className="space-y-1.5 text-text-secondary">
                    <li><strong>6월 30일 출고까지</strong>: 한시 인하율 3.5% 적용</li>
                    <li><strong>7월 1일 출고부터</strong>: 기본세율 5% 환원(개별소비세법 §1 ②제3호)</li>
                    <li><strong>기준</strong>: 계약일이 아니라 공장 출고일</li>
                    <li><strong>세금 증가 폭</strong>: 공장도 가격의 약 2.14%(개소세 1.5%p + 연동되는 교육세·부가가치세)</li>
                    <li><strong>친환경차 감면</strong>: 전기차·수소차·하이브리드는 별도 제도로 2026년 12월 31일까지 유지</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 인하 종료 사실관계</h2>
                <p className="text-text-secondary leading-relaxed">
                  승용자동차에는 개별소비세법 §1 ②제3호에 따라 공장도 가격의 5%가 기본세율로 적용됩니다.
                  같은 법 §1 ⑦(탄력세율)은 경기 조절·가격 안정 등이 필요한 경우 기본세율의 ±30% 범위에서
                  정부가 세율을 조정할 수 있도록 규정하고, 이 권한에 근거해 시행령이 자동차 개별소비세를
                  <strong> 3.5%로 한시 인하</strong>해 두었습니다. 이 한시 인하는 수차례 연장을 거친 뒤 2026년
                  6월 30일을 끝으로 종료됐고, 7월 1일 출고분부터는 §1 본칙의 기본세율 5%가 다시 적용됩니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  정부는 종료 직전 "내수가 회복세인 만큼 추가 연장이 필요하지 않다"는 입장을 밝혔고, 2026년
                  10월 30일 기준 추가 연장은 발표되지 않았습니다. 적용 기준은 계약일이 아니라 공장 출고일이기
                  때문에, 6월에 계약했어도 7월에 출고된 차량에는 5%가 과세됐습니다.
                </p>
                <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4">
                  <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">
                    출고일별 적용 세율
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    2026년 6월 30일까지 출고: 개별소비세 3.5%(한시 인하).<br />
                    2026년 7월 1일 이후 출고: 개별소비세 5%(기본세율).
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 지금 신차를 사면 얼마나 더 비싸졌나?</h2>
                <p className="text-text-secondary leading-relaxed">
                  개별소비세율이 3.5%에서 5%로 1.5%포인트 오르면, 이에 연동되는 교육세(개별소비세법상 세액의 30%,
                  교육세법 §5)와 부가가치세(공급가액의 10%)도 함께 늘어납니다. 세 세목을 합치면 공장도 가격의
                  약 2.14%만큼 세금이 많아지는 구조이므로, 같은 차를 7월 이후에 사면 인하 당시보다 그만큼 비싸진
                  셈입니다. 아래 표는 공장도 가격별로 7월 1일 이후 출고 시 추가로 붙는 세금을 보여줍니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left font-semibold text-text-primary">공장도 가격별 세금 증가 폭(인하 전과 비교)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left" scope="col">공장도 가격</th>
                        <th className="px-3 py-2 text-right" scope="col">개별소비세 증가</th>
                        <th className="px-3 py-2 text-right" scope="col">교육세 증가</th>
                        <th className="px-3 py-2 text-right" scope="col">부가세 증가</th>
                        <th className="px-3 py-2 text-right" scope="col">합계</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">2,000만원</td>
                        <td className="px-3 py-2 text-right tabular-nums">30만원</td>
                        <td className="px-3 py-2 text-right tabular-nums">9만원</td>
                        <td className="px-3 py-2 text-right tabular-nums">3.9만원</td>
                        <td className="px-3 py-2 text-right font-semibold tabular-nums">약 43만원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">4,000만원</td>
                        <td className="px-3 py-2 text-right tabular-nums">60만원</td>
                        <td className="px-3 py-2 text-right tabular-nums">18만원</td>
                        <td className="px-3 py-2 text-right tabular-nums">7.8만원</td>
                        <td className="px-3 py-2 text-right font-semibold tabular-nums">약 86만원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">6,667만원</td>
                        <td className="px-3 py-2 text-right tabular-nums">100만원</td>
                        <td className="px-3 py-2 text-right tabular-nums">30만원</td>
                        <td className="px-3 py-2 text-right tabular-nums">13만원</td>
                        <td className="px-3 py-2 text-right font-semibold tabular-nums">약 143만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-text-tertiary mt-3">
                  계산식: 개별소비세 증가 = 공장도 × 1.5%, 교육세 증가 = 개소세 증가 × 30%, 부가세 증가 = (개소세 증가 + 교육세 증가) × 10%. 실제 세금은 옵션·할인·탁송료 등에 따라 달라지므로 영수증을 기준으로 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 기준은 계약일이 아니라 출고일</h2>
                <p className="text-text-secondary leading-relaxed">
                  개별소비세는 공장 출고일(출고신고일)을 기준으로 세율이 결정됩니다. 그래서 6월에 계약했어도
                  7월에 출고된 차량에는 5%가 적용됐고, 반대로 7월에 계약했다면 애초에 인하 혜택을 받을 수 없었습니다.
                  이 원칙은 한시 인하가 끝난 지금도 변하지 않으므로, 영수증·세금계산서에 적힌 출고일과 개별소비세율을
                  함께 확인하는 것이 좋습니다.
                </p>
                <div className="space-y-3 mt-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">출고일별 과세 결과</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>• 2026년 6월 30일 이전 출고: 개별소비세 3.5% 적용</li>
                      <li>• 2026년 7월 1일 이후 출고: 개별소비세 5% 적용</li>
                      <li>• 계약일·인수일·등록일과는 무관</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">영수증 확인 포인트</h3>
                    <p className="text-sm text-text-secondary">
                      세금계산서·구매 영수증에는 개별소비세율과 세액이 분리되어 표시됩니다. 7월 1일 이후 출고분이라면
                      개별소비세율이 5%로 적혀 있어야 정상이고, 3.5%로 적혔다면 과거 인하 시점에 출고된 차량이라는 의미입니다.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 7월 이후 신차 구매자가 확인할 것</h2>
                <p className="text-text-secondary leading-relaxed">
                  한시 인하가 끝났기 때문에, 지금 신차를 사는 사람은 세금이 인하 당시보다 올라간 상태에서 구매 결정을
                  해야 합니다. 특히 다음 사항을 확인하세요.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">1) 견적서의 개별소비세율</h3>
                    <p className="text-sm text-text-secondary">
                      7월 1일 이후 출고분이라면 개별소비세는 5%, 교육세는 그 30%(공장도 가격의 1.5%), 부가가치세는 공급가액의
                      10%입니다. 견적에 3.5%가 그대로 남아 있지는 않은지 확인하세요.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">2) 재고차 vs 생산 주문차</h3>
                    <p className="text-sm text-text-secondary">
                      이미 6월 30일 이전에 출고된 재고차는 세금 영수증상 개별소비세 3.5%로 처리돼 있습니다. 반면 지금 생산
                      주문해서 받는 차량은 5%가 과세됩니다. 재고 유무와 출고일을 딜러에게 확인하면 세금 측면에서 어느 쪽이
                      유리한지 비교할 수 있습니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">3) 친환경차 감면 적용 여부</h3>
                    <p className="text-sm text-text-secondary">
                      전기차·수소차·하이브리드를 사는 경우에는 자동차 개별소비세 한시 인하와는 별개로, 친환경차 개별소비세
                      감면이 2026년 12월 31일까지 유지됩니다. 세금 항목이 "감면"으로 표시되는지 확인하세요.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 친환경차 개별소비세 감면은 그대로 유지</h2>
                <p className="text-text-secondary leading-relaxed">
                  자동차 개별소비세 한시 인하와 친환경차 개별소비세 감면은 서로 다른 제도입니다. 한시 인하는 전체
                  승용차를 대상으로 세율을 3.5%로 깎아 주던 조치였고, 친환경차 감면은 전기차·수소차·하이브리드를 대상으로
                  일정 한도까지 개별소비세를 공제하는 조치입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  친환경차 감면은 2026년 12월 31일까지 유지되므로, 7월 1일 이후 출고된 전기차·수소차·하이브리드는 기본세율
                  5%에서 감면 한도를 뺀 금액을 개별소비세로 납부합니다. 다만 감면 한도는 차종별·연도별로 다르고 일몰 기한도
                  바뀔 수 있으므로, 구매 전에 기획재정부·국세청 공지 또는 딜러 견적을 통해 최신 한도를 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 자동차세(보유세)와의 혼동 주의</h2>
                <p className="text-text-secondary leading-relaxed">
                  개별소비세와 자동차세(보유세)는 전혀 다른 세금입니다. 개별소비세는 신차를 살 때 한 번만 내고, 자동차세는
                  매년 소유자에게 과세됩니다. 이번 인하 종료는 개별소비세에만 영향을 주고, 자동차세율에는 영향을 주지 않습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <h3 className="font-semibold text-text-primary mb-2">개별소비세 vs 자동차세</h3>
                  <ul className="space-y-2 text-text-secondary">
                    <li><strong>개별소비세</strong>: 신차 등록 시 1회만 납부(기준: 공장 출고일)</li>
                    <li><strong>자동차세(보유세)</strong>: 매년 납부(기준: 1월 1일 소유자, 지방세법 §127)</li>
                    <li><strong>이번 인하 종료의 영향</strong>: 개별소비세만 해당, 자동차세와 무관</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">
                      자동차세 계산기
                    </Link>
                    {' '}· 보유세 연간 납부액 계산(개소세와 별개)
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">
                      취득세 계산기
                    </Link>
                    {' '}· 부동산 거래 시 취득세(자동차와 별개)
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/vehicle-tax-june-payment-annual-discount-2026/" className="text-primary-600 underline dark:text-primary-500">
                      자동차세 제1기 6월 납부 가이드
                    </Link>
                    {' '}· 매년 6월 내는 자동차세와 차령경감 정리
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/january-vehicle-tax-prepayment/" className="text-primary-600 underline dark:text-primary-500">
                      자동차세 연납 할인 가이드 2026
                    </Link>
                    {' '}· 1월 연납 시 연세액 대비 약 4.58% 공제
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/electric-vehicle-tax-2026/" className="text-primary-600 underline dark:text-primary-500">
                      전기차 자동차세 2026
                    </Link>
                    {' '}· 전기차·수소차 연 13만원 정액 과세
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">
                      2026년 세금 달력
                    </Link>
                    {' '}· 월별 신고·납부 일정
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="자동차 개별소비세 인하 종료, 7월부터 5% 환원"
                url={URL}
                description="자동차 개별소비세 한시 인하(3.5%)는 2026년 6월 30일 출고분을 끝으로 종료, 7월 1일 출고분부터 5% 환원. 친환경차 감면은 12월 31일까지 유지."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 개별소비세법 §1 ②제3호(승용자동차 기본세율 5%) ·
                  개별소비세법 §1 ⑦(탄력세율, 기본세율의 ±30% 범위에서 조정) ·
                  교육세법 §5(개별소비세액의 30%). 참고:{' '}
                  <a
                    href="https://www.law.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청
                  </a>
                  ,{' '}
                  <a
                    href="https://www.moef.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    기획재정부
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 10월 30일 기준 정보를 제공합니다. 정부 정책이 다시 바뀌면
                  기획재정부·국세청 공지를 통해 재확인하시기 바랍니다. 개별 거래 상황(사업용 차량, 특수 용도, 법인 구매 등)에
                  따라 세금 계산이 다를 수 있습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}
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
