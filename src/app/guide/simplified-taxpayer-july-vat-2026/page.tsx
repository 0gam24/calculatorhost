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

const URL = 'https://calculatorhost.com/guide/simplified-taxpayer-july-vat-2026/';
const DATE_PUBLISHED = '2026-07-22';
const DATE_MODIFIED = '2026-07-22';

export const metadata: Metadata = {
  title: '간이과세자 7월 부가세 신고하나요 2026, 예정부과·예정신고',
  description:
    '간이과세자도 7월에 부가세를 낼 수 있습니다. 예정부과 고지서와 예정신고를 구분하고, 2026년 7월 27일 납부 기한, 직전기 납부세액 50% 계산, 세금계산서 발급자 예외까지 정리했습니다.',
  keywords: [
    '간이과세자 부가세 신고',
    '간이과세자 7월 부가세',
    '부가세 예정부과',
    '간이과세자 예정신고',
    '세금계산서 발급 간이과세자',
    '부가가치세법 66조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '간이과세자 7월 부가세 신고 2026, 예정부과와 예정신고' }],
    title: '간이과세자 7월 부가세 신고하나요 2026, 예정부과와 예정신고 완전 정리',
    description: '고지서만 받은 간이과세자와 세금계산서 발급 간이과세자의 처리가 다릅니다. 2026년 7월 27일 기한 기준으로 계산·신고 절차를 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '간이과세자 7월 부가세 신고 2026, 예정부과·예정신고 구분',
    description: '직전기 납부세액 50%가 예정부과세액. 50만원 미만이면 소액부징수. 부가가치세법 §66.',
  },
};

const FAQ_ITEMS = [
  {
    question: '예정부과세액이 50만원 미만이면 어떻게 되나요?',
    answer:
      '50만원 미만이면 관할 세무서장이 예정부과를 하지 않습니다(부가가치세법 §66 소액부징수). 고지서 자체가 발송되지 않으므로 7월에 별도로 납부할 금액이 없습니다. 다만 다음 해 1월 확정신고 의무는 그대로 남아 있으니 1.1~12.31 전체 실적으로 정상 신고·납부해야 합니다. 확정신고를 놓치면 무신고 가산세가 별도로 붙습니다(국세기본법 §47의2).',
  },
  {
    question: '예정부과 고지서를 받지 못했어요. 어떻게 해야 하나요?',
    answer:
      '먼저 홈택스에서 실제 고지 여부를 조회하세요. 홈택스(hometax.go.kr) 로그인 후 "My홈택스, 세금 신고·납부, 국세 납부"에서 예정부과 고지 내역을 확인할 수 있습니다. 조회되지 않는다면 직전기 납부세액이 없거나 예정부과세액이 50만원 미만이라 소액부징수로 처리되었을 가능성이 높습니다. 그래도 불안하면 관할 세무서 부가가치세과에 확인하는 것이 안전합니다.',
  },
  {
    question: '상반기에 세금계산서를 발급했는데 예정신고를 안 하면 어떻게 되나요?',
    answer:
      '무신고 가산세와 납부지연 가산세가 함께 부과될 수 있습니다. 세금계산서 발급 간이과세자는 예정부과 대상이 아니라 예정신고 대상이므로, 상반기(1.1~6.30) 실적으로 직접 신고·납부해야 합니다. 신고를 누락하면 국세기본법 §47의2 무신고 가산세(일반 20%, 부정 40%)와 납부불성실 가산세가 붙습니다. 발급 사실을 잊기 쉬우니 홈택스 세금계산서 조회로 반드시 재확인하세요.',
  },
  {
    question: '예정신고 시 매입세액 공제도 받을 수 있나요?',
    answer:
      '간이과세자는 매입세액 자체를 공제받는 구조가 아니라 세금계산서 등 수취금액에 업종별 부가가치율을 곱한 공제 방식(세액공제)이 적용됩니다. 예정신고를 하는 경우에도 상반기 매입분에 대한 세금계산서 등 수취세액 공제를 반영할 수 있으니, 매입 세금계산서를 미리 정리해두는 것이 유리합니다. 정확한 공제액은 홈택스 부가세 신고 화면이 자동 계산합니다.',
  },
  {
    question: '확정신고는 언제 하나요?',
    answer:
      '간이과세자의 확정신고 기한은 다음 해 1월 25일까지입니다(부가가치세법 §66). 과세기간이 1.1~12.31 1년 단위이므로, 2026년 실적은 2027년 1월 25일까지 신고·납부합니다. 7월에 낸 예정부과세액이나 예정신고 납부세액은 확정신고 시 기납부세액으로 자동 차감되므로 이중 납부는 없습니다. 확정신고 기한이 주말이면 다음 평일로 자동 연장됩니다.',
  },
  {
    question: '신규 개업 간이과세자도 7월에 예정부과가 나오나요?',
    answer:
      '직전 과세기간이 없으므로 첫 해에는 예정부과가 없습니다. 예정부과는 직전 과세기간 납부세액의 50%로 계산되기 때문입니다. 예를 들어 2026년 3월에 개업한 간이과세자는 2026년 7월 예정부과 대상이 아니고, 첫 신고는 2027년 1월 25일 확정신고가 됩니다. 다만 개업 후 세금계산서를 발급했다면 그 즉시 예정신고 대상이 될 수 있으니 발급 여부를 반드시 확인하세요.',
  },
  {
    question: '예정부과 세액이 실제와 다르면 이의신청할 수 있나요?',
    answer:
      '상반기 실적이 직전기의 3분의 1에 미달하면 예정신고 방식으로 전환해 신고할 수 있습니다. 이 경우 관할 세무서가 예정부과를 취소하고 신고한 세액으로 갈음합니다. 매출이 크게 줄어 예정부과 고지액이 부담스럽다면 홈택스 예정신고 화면에서 직접 신고하는 방법을 고려하세요. 고지된 금액을 이미 납부한 뒤라도 확정신고 시 기납부세액으로 정산됩니다.',
  },
  {
    question: '홈택스에서 어떤 메뉴로 신고하나요?',
    answer:
      '홈택스(hometax.go.kr) 로그인 후 "세금 신고, 부가가치세 신고, 간이과세자"에서 정기신고 또는 예정신고 항목을 선택합니다. 예정부과 대상은 별도 신고 없이 "국세 납부" 메뉴에서 고지된 금액을 확인·납부하면 됩니다. 세금계산서 발급 이력이 있는 사업자는 예정신고 화면이 자동 열리며, 상반기 매출·매입 자료가 자동 채워지므로 검토 후 제출합니다.',
  },
];

export default function SimplifiedTaxpayerJulyVat2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '간이과세자 7월 부가세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '간이과세자 7월 부가세 신고하나요 2026, 예정부과와 예정신고 완전 정리',
    description:
      '간이과세자의 7월 부가세 처리는 예정부과(고지서) 또는 예정신고(세금계산서 발급자)로 나뉩니다. 2026년 7월 27일 기한, 직전기 납부세액 50% 계산, 소액부징수 50만원 기준, 홈택스 절차까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['간이과세자', '부가세 예정부과', '예정신고', '7월 부가세', '부가가치세법 66조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '간이과세자 7월 부가세 신고하나요 2026',
    description:
      '간이과세자의 7월 부가세 예정부과와 예정신고를 구분하고, 2026년 7월 27일 기한 기준 절차·계산·주의사항을 정리합니다.',
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
                    { name: '간이과세자 7월 부가세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">간이과세자 · 소상공인 · 8분 읽기 · 2026-07-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  간이과세자 7월 부가세 신고하나요 2026
                  <br />
                  <span className="text-2xl text-text-secondary">예정부과와 예정신고 완전 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  간이과세자는 1년에 한 번, 다음 해 1월에만 부가세를 신고한다고 알고 있는 분이 많습니다. 그런데 매년 7월이 되면 세무서 고지서를 받거나 "예정신고 하라"는 안내를 받고 당황하는 경우가 적지 않습니다. 결론부터 말하면, 대부분의 간이과세자는 별도 신고 없이 예정부과 고지서를 받아 납부만 하면 되고, 상반기에 세금계산서를 발급한 간이과세자만 예정신고를 직접 해야 합니다. 2026년 7월 부가세 1기 확정신고 마감 시즌에 맞춰 헷갈리기 쉬운 규칙을 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-simplified-taxpayer-july-vat-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세자도 7월에 부가세 신고하나요?</h2>
                <p>
                  대부분의 간이과세자는 7월에 별도 신고 없이 예정부과 고지서만 받아 납부하면 됩니다. 간이과세자의 과세기간은 1월 1일부터 12월 31일까지 1년 단위이고, 확정신고는 다음 해 1월 25일까지가 원칙입니다(부가가치세법 §66). 다만 관할 세무서장이 직전 과세기간 납부세액의 절반을 7월에 미리 고지해 걷는 예정부과 제도가 함께 운영되기 때문에, 7월에도 납부가 발생할 수 있는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2026년 7월 간이과세자 부가세 흐름</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 일반 간이과세자: 세무서 예정부과 고지서 수령 후 <strong>2026년 7월 27일(월)</strong>까지 납부
                    <br />
                    · 세금계산서 발급 간이과세자: 상반기 실적으로 <strong>예정신고 직접 제출</strong> 후 7월 27일까지 납부
                    <br />
                    · 예정부과세액 50만원 미만: 부가가치세법 §66 소액부징수로 <strong>고지 자체가 없음</strong>
                  </p>
                </div>
                <p className="mt-4">
                  참고로 2026년 부가세 1기 확정신고 법정기한은 7월 25일이지만 25일이 토요일이라 다음 평일인 7월 27일 월요일로 자동 연장됩니다. 간이과세자의 예정부과·예정신고 납부기한도 동일하게 7월 27일까지 적용됩니다.
                </p>
                <p className="mt-4">
                  다만 신규 개업 간이과세자는 직전 과세기간이 존재하지 않으므로 예정부과 대상이 아닙니다. 이 경우 7월에 납부할 금액이 없고, 첫 신고는 다음 해 1월 확정신고가 됩니다. 예외적으로 개업 즉시 세금계산서를 발급한 경우에는 예정신고 대상이 될 수 있으니 발급 이력을 반드시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정부과와 예정신고는 뭐가 다른가요?</h2>
                <p>
                  예정부과는 세무서가 계산해 고지하는 방식이고, 예정신고는 사업자가 상반기 실적을 직접 신고·납부하는 방식입니다. 두 제도 모두 부가가치세법 §66에서 규정하고 있으나, 대상과 절차가 완전히 다릅니다. 자신이 어느 쪽인지 헷갈리는 것이 7월 부가세 관련 가장 흔한 실수입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 간이과세자 7월 부가세 예정부과 vs 예정신고 비교 (부가가치세법 §66, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예정부과</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예정신고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대상</td>
                        <td className="p-3">일반 간이과세자 (세금계산서 미발급)</td>
                        <td className="p-3">상반기에 세금계산서를 발급한 간이과세자</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">세액 산정 주체</td>
                        <td className="p-3">관할 세무서장이 계산</td>
                        <td className="p-3">사업자가 상반기 실적으로 직접 계산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">계산 기준</td>
                        <td className="p-3">직전 과세기간 납부세액의 50%</td>
                        <td className="p-3">1.1~6.30 실적 기준 실제 산출세액</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">고지서</td>
                        <td className="p-3">있음 (세무서 발송)</td>
                        <td className="p-3">없음 (직접 신고서 제출)</td>
                      </tr>
                      <tr>
                        <td className="p-3">2026년 납부기한</td>
                        <td className="p-3">2026년 7월 27일 월요일</td>
                        <td className="p-3">2026년 7월 27일 월요일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  즉, "고지서를 받았다"면 예정부과이고, "고지서 없이 세금계산서를 발급한 이력이 있다"면 예정신고 대상입니다. 두 경우가 모두 해당하는 상황도 있는데, 예를 들어 상반기 초에 세금계산서를 발급하고 이후 발급을 중단한 경우에도 예정신고가 우선 적용됩니다.
                </p>
                <p className="mt-4">
                  다만 예외로, 상반기 실적이 직전 과세기간의 3분의 1에 미달하면 예정부과 대상자도 예정신고 방식으로 전환해 신고할 수 있습니다. 매출이 급감한 상황에서 고지된 세액이 부담스러울 때 활용할 수 있는 선택지입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금계산서를 발급했으면 어떻게 하나요?</h2>
                <p>
                  상반기(1.1~6.30) 중 한 번이라도 세금계산서를 발급했다면 7월에 예정신고를 직접 해야 합니다. 이는 2021년 세법 개정으로 연간 공급대가 4,800만원 이상 간이과세자에게 세금계산서 발급 의무가 부여되면서 도입된 구조입니다. 세무서 고지서를 기다리지 말고 홈택스로 능동적으로 신고해야 하며, 이를 누락하면 국세기본법 §47의2 무신고 가산세가 부과됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">예정신고 대상 판별 기준</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 상반기 세금계산서 1건이라도 발급 여부 (홈택스 세금계산서 조회로 확인)
                    <br />
                    · 발급했다면: 예정신고 필수, 예정부과 고지 대상 아님
                    <br />
                    · 발급 안 했다면: 일반적으로 예정부과 대상 (세무서 고지 대기)
                  </p>
                </div>
                <p className="mt-4">
                  예정신고 시에도 매입 세금계산서 등 수취세액 공제는 반영할 수 있습니다. 간이과세자는 일반과세자와 달리 매입세액 전액을 공제받지 못하고 업종별 부가가치율에 따라 산정된 공제가 적용되지만, 어쨌든 매입 자료가 있는 편이 세부담을 낮춥니다. 홈택스 신고 화면에서 자동 조회되므로 별도 자료 제출은 필요 없는 경우가 많습니다.
                </p>
                <p className="mt-4">
                  다만 매우 드문 경우로, 세금계산서를 발급했지만 상반기 실적이 미미하거나 없다면 신고서 상 납부세액이 0원이 될 수 있습니다. 이때도 신고 의무는 남아 있으므로 "0원 신고"로 제출해야 무신고 가산세를 피할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정부과세액은 어떻게 계산되나요?</h2>
                <p>
                  예정부과세액은 직전 과세기간 납부세액의 정확히 50%로 자동 산정됩니다. 관할 세무서장이 별도 검토 없이 기계적으로 계산해 고지하는 구조라, 사업자가 직접 산출할 필요는 없지만 대략적인 예상액을 미리 파악해두면 자금 계획에 유리합니다. 아래 3가지 사례로 계산 흐름을 정리합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 직전기 납부세액 40만원 (소액부징수)</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 과세기간(2025년) 납부세액: 40만원
                    <br />
                    · 예정부과세액: 40만원 × 50% = <strong>20만원</strong>
                    <br />
                    · 소액부징수 판정: 20만원은 50만원 미만이라 부징수 대상
                    <br />
                    · 결과: <strong>고지서 발송 없음, 7월 납부 없음</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 2027년 1월 25일 확정신고 의무는 그대로 유지됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 직전기 납부세액 90만원 (여전히 소액부징수)</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 과세기간 납부세액: 90만원
                    <br />
                    · 예정부과세액: 90만원 × 50% = <strong>45만원</strong>
                    <br />
                    · 소액부징수 판정: 45만원 역시 50만원 미만이라 부징수
                    <br />
                    · 결과: <strong>고지서 없음, 7월 납부 없음</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">착각 포인트: 직전기 100만원 근처까지는 예정부과가 발생하지 않는 경우가 많습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 직전기 납부세액 120만원 (예정부과 발생)</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 과세기간 납부세액: 120만원
                    <br />
                    · 예정부과세액: 120만원 × 50% = <strong>60만원</strong>
                    <br />
                    · 소액부징수 판정: 60만원은 50만원 이상이라 정상 부과
                    <br />
                    · 결과: <strong>7월 초 세무서 고지서 발송, 7월 27일까지 60만원 납부</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">기납부 처리: 여기서 낸 60만원은 다음 해 확정신고 시 자동 차감됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 계산은 예정부과 대상자에게만 적용됩니다. 상반기에 세금계산서를 발급한 간이과세자는 위 공식이 아니라 실제 상반기 실적에 업종별 부가가치율을 곱해 산정한 금액을 예정신고로 납부합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정부과 세금은 언제까지 내나요?</h2>
                <p>
                  2026년 1기 예정부과분은 7월 27일 월요일까지 납부해야 합니다. 원래 법정기한은 매년 7월 25일이지만, 2026년은 25일이 토요일이라 국세기본법 기한 자동 연장 규정에 따라 다음 평일인 7월 27일로 밀립니다. 예정신고 대상자도 동일한 날짜까지 신고와 납부를 모두 마쳐야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2026년 7월 부가세 주요 일정</p>
                  <p className="text-sm text-text-secondary">
                    · 예정부과 고지서 도착: 2026년 7월 초 (통상 7월 첫째~둘째 주)
                    <br />
                    · 홈택스 조회 개시: 고지서 발송 직후
                    <br />
                    · 법정기한: 2026년 7월 25일 토요일
                    <br />
                    · 실제 납부기한: <strong>2026년 7월 27일 월요일 자정까지</strong>
                    <br />
                    · 지연 시: 납부지연 가산세(하루당 0.022%) 및 무신고 가산세 발생
                  </p>
                </div>
                <p className="mt-4">
                  납부 방법은 홈택스 계좌이체, 신용카드(수수료 0.8%~), 가상계좌, 은행 창구, ARS 전화 납부 등 다양합니다. 소상공인은 홈택스 계좌이체가 가장 수수료 없이 편리합니다. 금액이 부담스러우면 분납 신청도 가능하나 예정부과는 원칙적으로 일시 납부가 원칙이므로 사전 상담이 필요합니다.
                </p>
                <p className="mt-4">
                  다만 신용카드 납부 시 카드사 무이자 할부 이벤트가 진행되는 경우가 있으니 홈택스 결제 화면에서 카드사별 조건을 확인하는 것이 좋습니다. 어느 방식이든 납부 완료 후에는 납부확인서를 저장·출력해 두는 것을 권장합니다.
                </p>
              </section>

              <AdSlot slot="guide-simplified-taxpayer-july-vat-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세자 부가세 신고 절차는 어떻게 되나요?</h2>
                <p>
                  홈택스에서 간이과세자 부가세 신고는 5단계면 끝납니다. 예정부과 대상은 신고 없이 납부만 하면 되고, 예정신고 대상만 신고서 작성이 필요합니다. 홈택스는 상반기 세금계산서 자료를 자동으로 불러오므로 실제 소요 시간은 20~30분 정도입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 홈택스 간이과세자 예정신고 5단계</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">메뉴</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">할 일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1</td>
                        <td className="p-3">홈택스 로그인</td>
                        <td className="p-3">공동·금융·간편인증 중 선택 후 사업자 계정 접속</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2</td>
                        <td className="p-3">세금 신고, 부가가치세 신고</td>
                        <td className="p-3">간이과세자 예정신고 항목 선택</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3</td>
                        <td className="p-3">신고서 자동 채움 확인</td>
                        <td className="p-3">상반기 세금계산서 발급·수취 내역 자동 조회, 누락분 수기 추가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4</td>
                        <td className="p-3">신고서 제출</td>
                        <td className="p-3">최종 세액 확인 후 제출 버튼 클릭, 접수증 저장</td>
                      </tr>
                      <tr>
                        <td className="p-3">5</td>
                        <td className="p-3">납부</td>
                        <td className="p-3">계좌이체·신용카드·가상계좌 중 선택, 납부확인서 저장</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예정부과 대상자는 3~4단계를 건너뛰고 "국세 납부" 메뉴에서 고지된 세액을 바로 납부하면 됩니다. 홈택스 로그인 후 좌측 메뉴 "My홈택스, 세금 신고·납부, 국세 납부"에서 확인할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 홈택스 트래픽은 납부 마감일이 다가올수록 급증합니다. 특히 마감 당일 오후에는 접속 지연이 심해 결제 오류가 발생하는 경우가 있으므로, 최소 3~5일 전에 여유 있게 처리하는 것을 권장합니다. 모바일 손택스 앱도 동일한 기능을 제공하므로 PC 접속이 어려울 때 활용할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">자주 하는 실수와 가산세 주의</h2>
                <p>
                  간이과세자 7월 부가세에서 가장 자주 발생하는 실수는 크게 세 가지입니다. 각각 무신고 가산세 또는 납부지연 가산세로 이어질 수 있어 사전에 확인해두는 것이 좋습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>세금계산서 발급 사실을 잊음:</strong> 상반기 어느 시점에 한 번 발급한 세금계산서 이력을 잊어버리고 예정부과 고지서만 기다리다 예정신고를 놓치는 경우가 많습니다. 홈택스 "조회·발급, 전자세금계산서, 목록조회"에서 반드시 재확인하세요.
                  </li>
                  <li>
                    <strong>고지서를 안 받아 신고 의무 자체를 무시:</strong> 예정부과세액이 50만원 미만이라 고지서가 오지 않은 경우, "신고 안 해도 되는구나" 오해할 수 있습니다. 다음 해 1월 확정신고 의무는 그대로 남아 있으므로 놓치면 국세기본법 §47의2 무신고 가산세(20%)가 붙습니다.
                  </li>
                  <li>
                    <strong>마감일 당일 처리:</strong> 7월 27일 저녁에 홈택스 접속을 시도했다가 지연·오류로 자정을 넘기는 사례가 매년 반복됩니다. 하루만 지나도 납부지연 가산세가 발생하니 최소 마감 3일 전 처리 원칙을 지키는 것이 안전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 부득이한 사정으로 기한을 놓쳤다면 늦어도 6개월 내에 기한후신고를 하면 가산세가 일부 감면됩니다(국세기본법 §48). 무신고 상태를 오래 방치하는 것보다는 최대한 빨리 자진 신고하는 것이 세부담 측면에서 유리합니다.
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
                    <div className="font-semibold text-primary-500">간이과세 부가세 완전 정리 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세 요건, 세율, 확정신고까지 기본기 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/july-vat-final-1st-half/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">7월 부가세 1기 확정신고 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">일반과세자 1기 확정신고 마감일과 홈택스 절차.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">매입세액이 크게 발생한 경우 15일 내 환급 절차.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 실수령액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소득 원천징수 3.3%와 종합소득세 정산 원리.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율과 세액공제 반영해 예상 세액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세, 종합소득세, 양도세, 취득세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 예정부과 여부, 세액, 최종 납부기한, 예정신고 의무 여부는 반드시 홈택스(hometax.go.kr) 개인 계정에서 확인하거나 관할 세무서 부가가치세과에 문의하세요. 세금계산서 발급 이력, 상반기 실적, 소액부징수 판정은 사업자별 상황에 따라 다를 수 있으며, 이 문서로 인한 신고 누락·오납의 책임은 지지 않습니다. 본 콘텐츠는 2026-07-22 기준으로 작성되었고, 인용한 법조항은 <strong>부가가치세법 §66(간이과세자의 예정부과·예정신고 및 소액부징수) 및 국세기본법 §47의2(무신고 가산세)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="간이과세자 7월 부가세 신고 2026, 예정부과와 예정신고 가이드"
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
