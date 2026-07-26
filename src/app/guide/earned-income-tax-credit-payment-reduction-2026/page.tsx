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

const URL = 'https://calculatorhost.com/guide/earned-income-tax-credit-payment-reduction-2026/';
const DATE_PUBLISHED = '2026-07-27';
const DATE_MODIFIED = '2026-07-27';

export const metadata: Metadata = {
  title: '근로장려금 지급일 2026, 8월 27일 지급과 감액·환수 정리',
  description:
    '2026년 근로장려금 정기 지급일은 8월 27일입니다. 재산 1.7억 이상 시 50% 감액, 2.4억 이상 지급 제외, 체납 충당·기한후신청 감액까지 조세특례제한법 기준으로 정리했습니다.',
  keywords: [
    '근로장려금 지급일',
    '근로장려금 8월 27일',
    '근로장려금 감액',
    '근로장려금 안 들어옴',
    '근로장려금 조회',
    '근로장려금 환수',
    '조세특례제한법 100조의8',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '근로장려금 지급일 2026, 8월 27일 지급과 감액·환수 정리' }],
    title: '근로장려금 지급일 2026, 8월 27일 지급과 감액 사유 총정리',
    description: '정기 지급 8월 27일. 재산 1.7억 이상 50% 감액, 2.4억 이상 제외, 체납 충당과 기한후신청 감액까지 한 번에 확인.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '근로장려금 지급일 2026, 8월 27일과 감액 사유',
    description: '정기 지급 8월 27일. 재산·체납·기한후신청에 따른 감액 구조를 조세특례제한법 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 근로장려금 정기분은 언제 지급되나요?',
    answer:
      '2026년 정기신청분 근로장려금은 8월 27일 지급됩니다. 법정 지급기한은 9월 말이지만 국세청이 심사를 앞당겨 8월 27일에 조기 지급합니다. 다만 6월 이후 기한후신청을 한 경우에는 이 조기 지급 대상에서 빠지고, 심사가 끝나는 대로 순차 지급됩니다. 반기신청자는 지급 일정이 별도로 안내됩니다.',
  },
  {
    question: '신청했는데 근로장려금이 안 들어왔어요. 왜 그런가요?',
    answer:
      '가장 흔한 이유는 감액 또는 지급 제외입니다. 재산이 2억 4천만원 이상이면 아예 지급되지 않고, 1억 7천만원 이상 2억 4천만원 미만이면 산정액의 50%만 지급됩니다. 또 국세·지방세 체납액이 있으면 지급액의 최대 30%까지 충당된 뒤 나머지만 입금됩니다. 심사 결과 소득·재산 요건에 미달하면 지급 대상에서 제외될 수 있으니 홈택스에서 심사 결과를 먼저 확인하세요.',
  },
  {
    question: '근로장려금 지급액과 심사 결과는 어디서 조회하나요?',
    answer:
      '홈택스 또는 손택스에서 조회합니다. 경로는 장려금·연말정산·기부금 메뉴에서 근로·자녀장려금, 심사진행상황 조회 순입니다. 지급액·감액 여부·입금 계좌가 표시되며, 국세상담센터(126)로도 확인할 수 있습니다. 신청 시 등록한 계좌가 정지·해지되면 지급이 지연되므로 계좌 상태를 미리 점검하는 것이 좋습니다.',
  },
  {
    question: '재산이 얼마면 근로장려금이 깎이나요?',
    answer:
      '가구원 전체 재산 합계가 1억 7천만원 이상이면 산정액의 50%가 감액되고, 2억 4천만원 이상이면 지급되지 않습니다. 재산에는 주택·토지·전세보증금·자동차·예적금·유가증권이 모두 포함되며, 대출 같은 부채는 빼주지 않는다는 점이 핵심입니다. 전세보증금이 커서 재산 기준을 넘기는 경우가 자주 있습니다.',
  },
  {
    question: '기한후신청을 하면 얼마나 감액되나요?',
    answer:
      '정기신청 기간(5월 1일~5월 31일)을 놓치고 6월 1일부터 11월 30일 사이에 기한후신청을 하면 산정액의 5%가 감액되어 95%만 지급됩니다. 또 조기 지급(8월 27일) 대상에서 제외되어 심사 후 늦게 지급됩니다. 가능하면 정기신청 기간에 신청하는 것이 금액과 시기 모두 유리합니다.',
  },
  {
    question: '체납이 있으면 근로장려금을 못 받나요?',
    answer:
      '전액 못 받는 것은 아닙니다. 국세·지방세 체납액이 있으면 근로장려금의 최대 30%를 체납액에 충당하고 나머지를 지급합니다. 즉 산정액이 100만원이고 체납이 있으면 최대 30만원이 충당되고 70만원이 입금될 수 있습니다. 정확한 충당 금액은 체납 규모에 따라 달라지므로 홈택스 심사 결과에서 확인하세요.',
  },
  {
    question: '가구 유형별 근로장려금 최대 지급액은 얼마인가요?',
    answer:
      '국세청 고시 기준 최대 지급액은 단독가구 약 165만원, 홑벌이가구 약 285만원, 맞벌이가구 약 330만원 수준입니다. 다만 실제 지급액은 총소득 구간에 따라 점증·평탄·점감 구조로 달라지므로 최대액을 그대로 받는 것은 아닙니다. 본인 예상액은 홈택스 근로장려금 계산 안내에서 확인하는 것이 정확합니다.',
  },
  {
    question: '지급받은 근로장려금을 나중에 다시 토해내는 경우도 있나요?',
    answer:
      '있습니다. 신청 내용과 실제 소득·재산·부양가족이 다른 것으로 사후 확인되면, 과다 지급된 금액을 환수합니다(조세특례제한법 §100의10). 고의로 사실과 다르게 신청하면 일정 기간 신청이 제한되고 가산금이 붙을 수 있습니다. 신청 시 소득·재산·가구원을 정확히 기재하는 것이 안전합니다.',
  },
];

export default function EitcPaymentReduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '근로장려금 지급일 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '근로장려금 지급일 2026, 8월 27일 지급과 감액·환수 총정리',
    description:
      '2026년 근로장려금 정기 지급일 8월 27일과 재산·체납·기한후신청에 따른 감액 구조, 환수 사유를 조세특례제한법 기준으로 정리한 실전 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['근로장려금', '지급일', '감액', '환수', '조세특례제한법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '근로장려금 지급일 2026',
    description: '근로장려금 정기 지급 8월 27일과 감액·환수 기준을 정리한 가이드.',
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
                    { name: '근로장려금 지급일 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">저소득 근로자 · 8분 읽기 · 2026-07-27</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  근로장려금 지급일 2026
                  <br />
                  <span className="text-2xl text-text-secondary">8월 27일 지급과 감액·환수 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  근로장려금을 신청한 저소득 근로자라면 지금 가장 궁금한 것은 두 가지입니다. 언제 들어오는지, 그리고 왜 예상보다 적게 나오는지입니다. 이 가이드는 2026년 정기 지급일 8월 27일과, 재산·체납·기한후신청에 따라 금액이 깎이는 감액 구조, 그리고 지급 후에도 다시 환수될 수 있는 경우를 조세특례제한법 기준으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-earned-income-tax-credit-payment-reduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로장려금 정기분은 언제 지급되나요?</h2>
                <p>
                  2026년 정기신청분 근로장려금은 8월 27일 지급됩니다. 조세특례제한법 §100의8에 따른 법정 지급기한은 9월 말이지만, 국세청이 심사를 앞당겨 매년 조금씩 조기 지급하고 있고 올해 정기분은 8월 27일로 확정됐습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">지급 시기 한눈에 보기</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 정기신청(5월 신청): 2026년 8월 27일 조기 지급
                    <br />
                    · 기한후신청(6월 1일~11월 30일): 심사 후 순차 지급, 조기 지급 대상 제외
                    <br />
                    · 반기신청(근로소득만 있는 가구): 상·하반기로 나눠 별도 일정 지급
                  </p>
                </div>
                <p className="mt-4">
                  다만, 6월 이후 기한후신청을 했다면 8월 27일 조기 지급에서는 빠집니다. 이 경우 심사가 끝나는 대로 개별 지급되므로, 지급 시기를 앞당기려면 매년 5월 정기신청 기간을 지키는 것이 가장 확실합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청했는데 왜 안 들어오나요? 감액·제외 기준</h2>
                <p>
                  신청은 했는데 입금이 없거나 예상보다 적다면, 대부분 재산 기준에 따른 감액·제외 때문입니다. 근로장려금은 가구원 전체 재산 합계액을 기준으로 지급 여부와 금액이 달라집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 재산 합계액 구간별 근로장려금 지급 (2026년 지급 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가구원 재산 합계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억 7천만원 미만</td>
                        <td className="p-3"><strong>전액 지급</strong></td>
                        <td className="p-3">산정액 100%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1억 7천만원 이상 2억 4천만원 미만</td>
                        <td className="p-3"><strong>50% 감액</strong></td>
                        <td className="p-3">산정액의 절반만 지급</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2억 4천만원 이상</td>
                        <td className="p-3"><strong>지급 제외</strong></td>
                        <td className="p-3">지급 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  재산에는 주택·토지·전세보증금·자동차·예적금·유가증권 등이 모두 포함됩니다. 특히 대출 같은 부채는 재산에서 빼주지 않기 때문에, 전세보증금이 큰 세입자는 실제 순자산이 적어도 재산 기준을 넘겨 감액되는 경우가 많습니다.
                </p>
                <p className="mt-4">
                  예외: 재산 요건을 충족해도 소득 요건에 미달하거나 초과하면 지급 대상에서 빠집니다. 가구 유형별 총소득 기준은 국세청이 매년 고시하며 단독가구가 가장 낮고 맞벌이가구가 가장 높습니다. 본인 해당 여부는 홈택스 심사 결과에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">체납이 있으면 얼마나 충당되나요?</h2>
                <p>
                  체납이 있다고 근로장려금을 전액 못 받는 것은 아닙니다. 국세·지방세 체납액이 있으면 근로장려금 산정액의 최대 30%를 체납액에 충당하고, 남은 금액을 지급합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 산정액 100만원, 체납이 있는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 근로장려금 산정액: 100만원
                    <br />
                    · 체납 충당 한도: 100만원 × 30% = 30만원
                    <br />
                    · 실제 입금액: 100만원 − 30만원 = <strong>70만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">충당된 30만원은 체납 세금에 자동 반영되므로 그만큼 체납이 줄어듭니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 충당 비율과 금액은 체납 규모·종류에 따라 달라질 수 있으므로, 정확한 충당액은 홈택스 심사 결과 또는 관할 세무서에서 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기한후신청과 정기신청, 금액 차이는?</h2>
                <p>
                  근로장려금은 신청 시기에 따라 지급액이 달라집니다. 정기신청 기간(5월 1일~5월 31일)에 신청하면 산정액 100%를 받지만, 정기신청을 놓치고 6월 1일부터 11월 30일 사이에 기한후신청을 하면 5%가 감액되어 95%만 지급됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 산정액 150만원, 기한후신청</p>
                  <p className="text-sm text-text-secondary">
                    · 정기신청 시: 150만원 전액 지급
                    <br />
                    · 기한후신청 시: 150만원 × 95% = <strong>142.5만원</strong> (7.5만원 감액)
                    <br />
                    <span className="text-xs text-text-tertiary">여기에 조기 지급 대상 제외까지 겹쳐 지급 시기도 늦어집니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 기한후신청 마감(11월 30일)까지도 신청하지 않으면 그 해 근로장려금은 받을 수 없습니다. 소득·재산 요건이 된다면 늦더라도 11월 30일 전에 반드시 신청하세요.
                </p>
              </section>

              <AdSlot slot="guide-earned-income-tax-credit-payment-reduction-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">지급액과 심사 결과 조회 방법</h2>
                <p>
                  근로장려금 지급액과 심사 진행 상황은 홈택스 또는 손택스에서 직접 조회할 수 있습니다. 입금이 늦어질 때 원인을 파악하는 가장 빠른 방법입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>홈택스 조회 경로:</strong> 로그인 후 장려금·연말정산·기부금, 근로·자녀장려금, 심사진행상황 조회 순으로 이동하면 지급액·감액 여부·입금 계좌가 표시됩니다.
                  </li>
                  <li>
                    <strong>손택스(모바일):</strong> 홈택스 모바일 앱에서 동일 메뉴로 조회할 수 있어, 안내문에 적힌 개별인증번호로 간편하게 확인됩니다.
                  </li>
                  <li>
                    <strong>전화 상담:</strong> 국세상담센터(126)에 전화하면 지급 여부와 사유를 안내받을 수 있습니다.
                  </li>
                  <li>
                    <strong>계좌 점검:</strong> 신청 시 등록한 계좌가 해지·정지되면 지급이 지연됩니다. 입금 전 계좌 상태를 확인하세요.
                  </li>
                </ul>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">지급 후에도 환수될 수 있나요?</h2>
                <p>
                  지급받은 뒤에도 사후 검증에서 신청 내용과 실제 소득·재산·부양가족이 다른 것으로 확인되면, 과다 지급된 금액을 환수합니다(조세특례제한법 §100의10). 고의로 사실과 다르게 신청한 경우에는 일정 기간 신청 자격이 제한되고 가산금이 부과될 수 있습니다.
                </p>
                <p className="mt-4">
                  따라서 신청 단계에서 소득·재산·가구원 정보를 정확히 기재하는 것이 무엇보다 중요합니다. 특히 부양가족을 잘못 넣거나 배우자 소득을 누락하면 나중에 환수 대상이 될 수 있으니 주의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가구 유형별 최대 지급액은 얼마인가요?</h2>
                <p>
                  국세청 고시 기준 최대 지급액은 단독가구 약 165만원, 홑벌이가구 약 285만원, 맞벌이가구 약 330만원 수준입니다. 다만 이 금액은 상한일 뿐, 실제 지급액은 총소득 구간에 따라 점증·평탄·점감 구조로 계산되므로 최대액을 그대로 받는 경우는 많지 않습니다.
                </p>
                <p className="mt-4">
                  예외: 가구 유형별 총소득 기준과 최대 지급액은 매년 국세청 고시로 조정될 수 있습니다. 본인의 정확한 예상액은 홈택스 근로장려금 계산 안내나 국세청 상담(126)에서 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/earned-income-tax-credit-semiannual-application-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 반기신청</div>
                    <p className="mt-1 text-sm text-text-secondary">근로소득만 있는 가구의 반기신청 요건과 정산 방법.</p>
                  </Link>
                  <Link
                    href="/guide/earned-income-tax-credit-late-application-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 기한후신청</div>
                    <p className="mt-1 text-sm text-text-secondary">5월 정기신청을 놓쳤을 때 11월 30일까지 신청하는 법.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-benefit-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀장려금 지급액 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀 1명당 최대 100만원, 근로장려금과 동시 수령까지.</p>
                  </Link>
                  <Link
                    href="/guide/earned-income-tax-credit-vs-child/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 vs 자녀장려금</div>
                    <p className="mt-1 text-sm text-text-secondary">두 제도의 소득·재산 요건 차이와 중복 수령 여부.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험·세금 반영 세후 월급을 바로 계산해보세요.</p>
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
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 근로장려금의 지급 여부·감액·최종 입금액은 소득·재산·체납 상황에 따라 달라지므로, 홈택스 심사 결과 또는 국세청 상담(126)에서 반드시 확인하세요. 가구 유형별 소득 기준과 최대 지급액은 국세청 고시로 매년 조정될 수 있습니다. 본 콘텐츠는 2026-07-27 기준으로 작성되었으며 법령 개정 시 업데이트됩니다. 근거 법령은 조세특례제한법 §100의3(신청자격), §100의6(신청), §100의8(결정·환급), §100의10(환수)입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="근로장려금 지급일 2026, 8월 27일 지급과 감액·환수 정리"
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
