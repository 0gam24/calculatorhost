// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/vat-preliminary-notice-individual-2026/';
const DATE_PUBLISHED = '2026-08-07';
const DATE_MODIFIED = '2026-08-07';

export const metadata: Metadata = {
  title: '부가가치세 예정고지 2026, 개인사업자 4월·10월 납부',
  description:
    '개인 일반과세 사업자는 4월·10월에 부가세 예정고지를 받습니다. 직전 확정 납부세액의 50%가 자동 산정되며, 예정고지 세액이 50만원 미만이면 고지가 생략됩니다. 부가가치세법 48조 기준 정리.',
  keywords: [
    '부가가치세 예정고지',
    '부가세 예정고지 대상자',
    '4월 부가세 고지서',
    '10월 부가세 고지서',
    '개인사업자 부가세 예정고지',
    '예정고지 예정신고 차이',
    '직전 납부세액 50%',
    '부가가치세법 48조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부가가치세 예정고지 2026, 개인사업자 4월·10월 납부' }],
    title: '부가가치세 예정고지 2026, 개인사업자 4월·10월 납부',
    description: '개인 일반과세 사업자는 신고 대신 4월·10월에 예정고지를 받습니다. 직전기 납부세액의 50%가 자동 산정되며, 50만원 미만은 생략.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부가가치세 예정고지 2026, 4월·10월 개인사업자 납부',
    description: '직전 확정 납부세액의 50%를 예정고지. 50만원 미만은 생략, 매출 급감 시 예정신고 선택 가능. 부가가치세법 48조.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부가가치세 예정고지가 정확히 무엇인가요?',
    answer:
      '예정고지는 예정신고를 대신해 세무서가 납부세액을 산정해 통지하는 방식입니다(부가가치세법 §48③). 개인 일반과세자와 직전기 공급가액이 일정 기준 이하인 소규모 법인은 예정기간(1~3월, 7~9월)에 신고할 필요 없이 세무서가 고지한 금액을 납부기한(4월 25일, 10월 25일)까지 내면 됩니다. 별도 신고서 작성은 필요하지 않습니다.',
  },
  {
    question: '예정고지 금액은 어떻게 정해지나요?',
    answer:
      '직전 과세기간 확정신고 때 납부한 세액의 50%(2분의 1)가 자동 산정됩니다. 예를 들어 직전 2기 확정(1월 25일) 때 300만원을 납부했다면, 그해 4월 25일 예정고지는 150만원입니다. 산출 근거는 부가가치세법 §48③이며, 매출·매입 실적을 반영하지 않고 직전기 실적만 기준으로 하기 때문에 실제 이번 분기 매출과 다를 수 있습니다.',
  },
  {
    question: '예정고지와 예정신고는 뭐가 다른가요?',
    answer:
      '예정고지는 세무서가 금액을 계산해 통지하고 납부만 하면 되는 방식이고, 예정신고는 사업자가 직접 이번 분기 매출·매입을 집계해 신고서를 제출하는 방식입니다. 개인 일반과세자는 원칙적으로 예정고지 대상이지만, 매출 감소 등 사유가 있으면 예정신고를 선택해 실제 실적 기준으로 낼 수 있습니다(부가가치세법 §48).',
  },
  {
    question: '예정고지 세액이 적으면 고지서가 안 오나요?',
    answer:
      '예정고지 세액이 50만원 미만이면 고지가 생략됩니다(부가가치세법 §48③ 단서). 이 경우 4월·10월에는 아무것도 납부하지 않고, 이후 확정신고(7월 25일 또는 다음해 1월 25일) 때 반기 전체 실적을 신고·납부하면 됩니다. 세금이 면제되는 것이 아니라 납부 시점만 확정신고로 미뤄지는 것입니다.',
  },
  {
    question: '예정고지를 안 내면 어떻게 되나요?',
    answer:
      '납부기한(4월 25일, 10월 25일)까지 내지 않으면 국세징수법에 따라 납부지연가산세와 체납처분 대상이 됩니다. 예정고지분도 확정 세액과 동일한 국세이므로 무시하면 안 됩니다. 자금 사정으로 어렵다면 홈택스에서 납부기한 연장 또는 분할납부를 신청할 수 있으니 기한 전에 관할 세무서에 문의하세요.',
  },
  {
    question: '매출이 급감했는데 그대로 예정고지분을 내야 하나요?',
    answer:
      '휴업이나 사업 부진으로 이번 예정기간의 공급가액·납부세액이 직전 과세기간의 1/3에 미치지 못하는 등 부가가치세법이 정한 사유에 해당하면 예정신고를 직접 선택할 수 있습니다. 예정신고를 하면 예정고지는 취소되며, 실제 실적 기준으로 계산한 세액만 납부합니다. 정확한 요건은 부가가치세법 §48④와 홈택스 안내에서 확인하세요.',
  },
  {
    question: '예정고지로 낸 세금은 나중에 어떻게 처리되나요?',
    answer:
      '예정고지로 납부한 세액은 다음 확정신고 때 기납부세액으로 공제됩니다(부가가치세법 §49). 예를 들어 4월에 150만원을 예정고지로 냈다면, 7월 25일 제1기 확정신고 때 상반기 전체 세액에서 이 150만원을 빼고 차액만 납부합니다. 이중과세가 아니라 미리 낸 세금을 정산하는 구조입니다.',
  },
  {
    question: '간이과세자도 4월에 예정고지를 받나요?',
    answer:
      '간이과세자는 예정고지 체계가 다릅니다. 간이과세자는 연 1회(다음해 1월 25일) 확정신고를 하고, 7월에 별도의 예정부과 방식이 적용됩니다. 4월 예정고지는 개인 일반과세자와 일부 소규모 법인 대상이므로, 간이과세자라면 별도 규정을 확인하세요. 자세한 내용은 간이과세 가이드와 국세청 안내를 참고하시기 바랍니다.',
  },
];

export default function VatPreliminaryNoticeIndividual2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부가가치세 예정고지 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부가가치세 예정고지 2026, 개인사업자 4월·10월 납부 완전 정리',
    description:
      '개인 일반과세자와 소규모 법인이 받는 부가세 예정고지의 산정 기준(직전기 50%), 납부기한(4월 25일·10월 25일), 50만원 미만 생략 규정, 예정신고 선택 요건까지 부가가치세법 §48 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부가가치세 예정고지', '개인사업자 부가세', '예정고지 예정신고', '4월 부가세', '10월 부가세', '부가가치세법 48조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부가가치세 예정고지 2026, 개인사업자 4월·10월 납부',
    description:
      '개인 일반과세자가 받는 부가세 예정고지의 산정 기준과 납부·선택 절차를 부가가치세법 §48 기준으로 정리한 가이드.',
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
                    { name: '부가가치세 예정고지 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·프리랜서 · 9분 읽기 · 2026-08-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부가가치세 예정고지 2026
                  <br />
                  <span className="text-2xl text-text-secondary">개인사업자 4월·10월 납부, 신고와의 차이</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  4월 중순쯤 갑자기 세무서에서 부가세 고지서가 날아옵니다. 신고한 적도 없는데 왜 오는지, 얼마를 어떻게 산정한 것인지 당황하는 개인사업자가 매년 반복됩니다. 이 가이드는 개인 일반과세 사업자를 중심으로 부가가치세 예정고지가 어떤 제도인지, 금액은 어떻게 정해지는지, 예정신고와는 무엇이 다른지, 매출이 급감했을 때는 어떻게 대응할 수 있는지를 부가가치세법 §48 기준으로 정리합니다. 간이과세자는 별도 체계이므로 이 글의 대상에서 제외합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부가가치세 예정고지가 무엇인가요</h2>
                <p>
                  예정고지는 예정신고를 대신해 관할 세무서가 납부세액을 산정해 통지하는 방식입니다(부가가치세법 §48③). 개인 일반과세자와 직전 과세기간 공급가액이 일정 기준 이하인 소규모 법인은 매 반기의 예정기간(1~3월, 7~9월)에 매출·매입을 집계해 신고서를 제출할 필요 없이, 세무서가 고지한 금액을 납부기한까지 내기만 하면 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 개인 일반과세자, 직전기 공급가액 기준 소규모 법인
                    <br />
                    · 산정: 직전 확정신고 납부세액의 50%(2분의 1)
                    <br />
                    · 납부기한: 제1기 예정 4월 25일, 제2기 예정 10월 25일
                    <br />
                    · 예외: 예정고지 세액이 50만원 미만이면 고지 생략
                    <br />
                    · 정산: 다음 확정신고(7월 25일, 다음해 1월 25일) 때 기납부세액으로 공제
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 2026년 개인 일반과세자 부가세 예정·확정 일정</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납부기한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">방식</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">제1기 예정</td>
                        <td className="p-3">1월~3월</td>
                        <td className="p-3">4월 25일</td>
                        <td className="p-3">예정고지(직전 2기 확정의 50%)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">제1기 확정</td>
                        <td className="p-3">1월~6월</td>
                        <td className="p-3">7월 25일</td>
                        <td className="p-3">신고, 예정고지분 공제</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">제2기 예정</td>
                        <td className="p-3">7월~9월</td>
                        <td className="p-3">10월 25일</td>
                        <td className="p-3">예정고지(직전 1기 확정의 50%)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">제2기 확정</td>
                        <td className="p-3">7월~12월</td>
                        <td className="p-3">다음해 1월 25일</td>
                        <td className="p-3">신고, 예정고지분 공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 위 일정은 개인 일반과세자와 일부 소규모 법인 기준입니다. 개인 간이과세자는 연 1회 확정신고와 7월 예정부과 체계가 별도로 적용되므로 이 표를 그대로 적용하면 안 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정고지 금액은 어떻게 정해지나요</h2>
                <p>
                  예정고지 세액은 직전 과세기간 확정신고 때 납부한 세액의 50%로 자동 산정됩니다(부가가치세법 §48③). 이번 분기의 실제 매출·매입 실적은 반영되지 않고, 지난 반기 실적만 기준으로 삼습니다. 그래서 실적이 크게 변동한 사업자는 실제 부담해야 할 세금과 예정고지 금액 사이에 차이가 발생합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 일반적인 케이스(4월 예정고지)</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 2기 확정신고 납부세액(다음해 1월 25일 신고분): 300만원
                    <br />
                    · 4월 예정고지 세액: 300만원 × 50% = <strong>150만원</strong>
                    <br />
                    · 납부기한: 4월 25일
                    <br />
                    · 7월 25일 제1기 확정신고 때: 상반기 전체 세액에서 150만원을 기납부세액으로 공제하고 차액만 납부
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 예정고지 150만원은 사라지는 돈이 아니라 확정신고에서 정산되는 선납금.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 예정고지 세액이 50만원 미만인 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 확정신고 납부세액: 80만원
                    <br />
                    · 산정된 예정고지 세액: 80만원 × 50% = 40만원
                    <br />
                    · 40만원은 50만원 미만이므로 <strong>고지 생략</strong>(부가가치세법 §48③ 단서)
                    <br />
                    · 4월·10월에는 별도 납부 없음
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세금이 면제된 것은 아니며, 반기 세액은 7월 25일 또는 다음해 1월 25일 확정신고 때 한꺼번에 납부.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 신규 개업이나 폐업, 직전기 실적이 없는 경우에는 산정할 근거가 없어 예정고지가 발부되지 않을 수 있습니다. 이 경우 확정신고 때 반기 전체 실적을 기준으로 신고·납부하면 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정고지와 예정신고는 뭐가 다른가요</h2>
                <p>
                  두 방식은 이름은 비슷하지만 산정 주체와 계산 기준이 다릅니다. 예정고지는 세무서가 직전기 실적을 기준으로 미리 계산해 통지하는 방식이고, 예정신고는 사업자가 이번 분기 실적을 직접 집계해 신고서를 제출하는 방식입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 예정고지 vs 예정신고 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예정고지</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예정신고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">산정 주체</td>
                        <td className="p-3">관할 세무서</td>
                        <td className="p-3">사업자 본인</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">계산 기준</td>
                        <td className="p-3">직전 확정 납부세액의 50%</td>
                        <td className="p-3">이번 예정기간 실제 매출·매입</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신고서 제출</td>
                        <td className="p-3">필요 없음(고지서만 수령)</td>
                        <td className="p-3">홈택스 등에서 직접 제출</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상</td>
                        <td className="p-3">개인 일반과세자, 소규모 법인</td>
                        <td className="p-3">법인 원칙, 개인은 선택 요건 충족 시</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">유리한 상황</td>
                        <td className="p-3">매출이 직전기와 비슷하거나 늘어난 경우</td>
                        <td className="p-3">매출이 급감해 실제 세액이 훨씬 적은 경우</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 개인 일반과세자는 원칙적으로 예정고지 대상이며 예정신고는 부가가치세법이 정한 사유(직전기 실적의 1/3 미만 등)에 해당할 때만 선택할 수 있습니다. 임의로 아무 때나 방식을 바꿀 수는 없으므로 사유가 애매하면 관할 세무서에 사전 문의하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매출이 급감했는데 그대로 내야 하나요</h2>
                <p>
                  이번 분기 매출이 크게 줄었는데 직전기 실적 기준의 예정고지분을 그대로 내는 것은 실제 부담과 맞지 않습니다. 부가가치세법 §48④는 이런 상황을 대비해 예정신고 선택권을 두고 있습니다.
                </p>
                <p>
                  대표적으로 휴업이나 사업 부진으로 이번 예정기간의 공급가액 또는 납부세액이 직전 과세기간 실적의 3분의 1에 미달하는 경우, 그리고 조기환급 사유가 발생한 경우 예정신고를 직접 선택할 수 있습니다. 예정신고를 하면 그 시점에 예정고지는 취소되며, 실제 실적 기준으로 계산한 세액만 납부하면 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 매출 급감으로 예정신고 선택</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 2기 확정 납부세액: 300만원(=예정고지 150만원 산정)
                    <br />
                    · 이번 1~3월 실제 납부세액 산정: 40만원(직전 2기 확정 실적 대비 1/3 미달)
                    <br />
                    · 예정신고 선택 시 실제 납부: <strong>40만원</strong>
                    <br />
                    · 예정신고 미선택 시: 150만원 납부 후 7월 확정신고에서 초과분 환급 또는 공제
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 자금 흐름 관리 관점에서 예정신고가 유리한 경우가 있으나, 사유 요건 충족 여부는 반드시 홈택스와 세무서에서 확인.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 사유 요건을 잘못 판단해 임의로 예정신고를 제출하면 오히려 가산세나 정정 부담이 생길 수 있습니다. 요건이 애매할 때는 예정고지를 그대로 납부한 뒤 확정신고에서 정산받는 방식이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정고지분은 확정신고에서 어떻게 정산되나요</h2>
                <p>
                  예정고지로 낸 세액은 다음 확정신고 때 기납부세액으로 공제됩니다(부가가치세법 §49). 즉, 예정고지 납부액은 사라지지 않고 반기 세액에서 차감되어 정산됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정산 흐름 예시</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 4월 25일 예정고지 150만원 납부
                    <br />
                    2. 상반기(1~6월) 실제 매출·매입 정리 후 계산된 반기 총 납부세액: 400만원
                    <br />
                    3. 7월 25일 제1기 확정신고 시 실제 추가 납부액: 400만원에서 150만원을 뺀 250만원
                    <br />
                    4. 만약 반기 총 세액이 150만원보다 적다면 초과 납부분은 환급 대상
                  </p>
                </div>
                <p className="mt-4">
                  다만, 홈택스에서 확정신고서를 작성할 때 예정고지 납부액이 자동으로 반영되는지 반드시 확인해야 합니다. 자동 반영이 되지 않으면 이중납부가 될 수 있으므로, 신고 마지막 단계의 세액 계산 화면에서 기납부세액란을 꼼꼼히 점검하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정고지 관련 자주 하는 실수와 확인 방법</h2>
                <p>
                  개인사업자가 예정고지 때 실제로 자주 헷갈리는 지점은 다음과 같습니다. 하나씩 점검해두면 4월·10월에 당황할 일이 줄어듭니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>고지서가 안 왔다고 세금이 없다고 오해:</strong> 50만원 미만은 생략이지만, 반기 세액 자체가 없는 것은 아닙니다. 7월·1월 확정신고 때 반기 전체를 신고·납부해야 합니다.
                  </li>
                  <li>
                    <strong>예정고지를 종합소득세와 혼동:</strong> 부가가치세는 매출에 부과되는 소비세로, 5월 종합소득세와 완전히 별개입니다. 4월·10월 예정고지가 왔다고 5월 종소세가 사라지는 것이 아닙니다.
                  </li>
                  <li>
                    <strong>임의로 다른 금액 납부:</strong> 고지서에 적힌 금액이 실제 세금과 맞지 않다고 판단해 임의로 다른 금액을 내면 미납으로 처리될 수 있습니다. 조정이 필요하면 예정신고 선택 절차를 밟거나 세무서에 문의해야 합니다.
                  </li>
                  <li>
                    <strong>확정신고 때 기납부세액 누락:</strong> 홈택스 자동 반영을 맹신하지 말고, 확정신고서 최종 화면의 기납부세액란을 반드시 확인하세요. 누락되면 이중납부가 발생합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 예정고지가 왔는지 여부와 금액은 홈택스(hometax.go.kr) 로그인 후 신고·납부 메뉴에서 언제든 확인할 수 있습니다. 종이 고지서를 못 받았더라도 온라인에서 반드시 조회해두세요.
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
                    <p className="mt-1 text-sm text-text-secondary">간이과세자는 예정고지 대신 어떤 체계로 신고·납부하는지.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반과세·간이과세 선택과 부가세 부담 차이 정리.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 실수령</div>
                    <p className="mt-1 text-sm text-text-secondary">사업자등록 전 프리랜서 원천징수와 부가세 관계.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">매입세액이 많을 때 예정신고를 통한 환급 절차.</p>
                  </Link>
                  <Link
                    href="/guide/qualified-receipt-evidence-penalty-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">적격증빙 미수취 가산세</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세 매입세액공제와 직결되는 증빙 관리 원칙.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·종합소득세·부가세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 개인 일반과세자 기준의 일반적 설명이며, 간이과세자, 신규 개업 사업자, 폐업 예정자, 조기환급 대상자 등은 별도 규정이 적용됩니다. 예정고지 대상 여부, 산정 금액, 예정신고 선택 요건(직전기 1/3 미달 등)의 구체적 적용은 반드시 홈택스(hometax.go.kr)와 관할 세무서에서 확인하세요. 본 콘텐츠는 2026-08-07을 기준으로 작성되었으며, 세법 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>부가가치세법 §48(예정신고와 납부), §49(확정신고와 납부)</strong>이며, 정확한 원문은 국가법령정보센터에서 확인할 수 있습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(부가가치세법)</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식 안내</a>.
                </p>
              </section>

              <ShareButtons
                title="부가가치세 예정고지 2026 가이드"
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
