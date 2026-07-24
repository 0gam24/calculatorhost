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

const URL = 'https://calculatorhost.com/guide/corporate-tax-interim-prepayment-2026/';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 8월 법인세 시즌 검색 의도 흡수)

export const metadata: Metadata = {
  title: '법인세 중간예납 2026, 8월 신고·계산·면제 기준 | calculatorhost',
  description:
    '12월 결산 법인은 8월 31일까지 법인세 중간예납을 신고·납부합니다. 직전연도 기준과 가결산 두 방식의 계산법, 면제 대상, 분납·가산세를 법인세법 §63 기준으로 정리했습니다.',
  keywords: [
    '법인세 중간예납',
    '법인세 중간예납 8월',
    '법인세 중간예납 계산',
    '중간예납 면제',
    '가결산 중간예납',
    '12월 결산 법인 세금',
    '법인세법 63조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '법인세 중간예납 2026, 8월 신고·계산·면제 기준' }],
    title: '법인세 중간예납 2026, 8월에 내는 상반기 법인세',
    description: '12월 결산 법인 기준 8월 31일 신고. 직전연도 기준·가결산 계산법과 면제 조건, 분납 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '법인세 중간예납 2026, 8월 신고 완벽 정리',
    description: '직전연도 기준과 가결산 두 방식, 면제 대상, 분납·가산세까지. 법인세법 §63.',
  },
};

const FAQ_ITEMS = [
  {
    question: '법인세 중간예납은 언제까지 신고하나요?',
    answer:
      '12월 결산 법인은 8월 31일까지 신고·납부합니다. 중간예납기간(사업연도 개시일부터 6개월)이 지난 날부터 2개월 이내가 기한이기 때문입니다(법인세법 §63). 2026년 8월 31일은 월요일이므로 그날까지 홈택스 또는 관할 세무서에 신고하면 됩니다.',
  },
  {
    question: '중간예납세액은 어떻게 계산하나요?',
    answer:
      '두 가지 방식 중 선택할 수 있습니다. 직전 사업연도 산출세액을 기준으로 절반을 내는 방식과, 상반기 실적으로 가결산해 계산하는 방식입니다. 대부분의 법인은 계산이 간단한 직전연도 기준 방식을 씁니다. 다만 직전연도에 산출세액이 없던 법인은 반드시 가결산 방식으로 계산해야 합니다.',
  },
  {
    question: '적자가 나면 중간예납을 안 내도 되나요?',
    answer:
      '상반기 실적을 가결산해 계산한 세액이 없으면 납부할 세액도 없습니다. 직전연도 기준 방식으로 계산한 금액이 나오더라도, 상반기가 적자라면 가결산 방식을 선택해 납부액을 줄이거나 0으로 만들 수 있습니다. 이때는 대차대조표·손익계산서·세무조정계산서를 함께 제출해야 합니다.',
  },
  {
    question: '중간예납 의무가 아예 없는 법인도 있나요?',
    answer:
      '있습니다. 사업연도가 6개월 이하인 법인, 합병·분할이 아닌 신설법인의 최초 사업연도, 중간예납기간에 휴업 등으로 수입금액이 없는 법인은 중간예납 의무가 없습니다. 또한 중소기업으로서 직전연도 기준 중간예납세액이 소액(50만원 미만)이면 납부하지 않아도 됩니다(법인세법 §63의2). 정확한 면제 여부는 관할 세무서에서 확인하세요.',
  },
  {
    question: '중간예납세액도 나눠 낼 수 있나요?',
    answer:
      '납부할 세액이 1천만원을 초과하면 분납할 수 있습니다. 1천만원 초과 2천만원 이하는 1천만원을 초과한 금액을, 2천만원 초과는 세액의 50% 이하를 납부기한 다음 날부터 1개월(중소기업은 2개월) 이내에 나눠 낼 수 있습니다. 자세한 분납 한도는 홈택스 신고 화면에서 자동 안내됩니다.',
  },
  {
    question: '중간예납을 놓치면 어떻게 되나요?',
    answer:
      '납부하지 않으면 납부지연가산세가 붙습니다. 하루 단위로 미납세액에 이자 성격의 가산세가 가산되므로, 기한을 넘겼더라도 최대한 빨리 납부하는 것이 손해를 줄이는 길입니다. 신고 자체를 놓쳤다면 관할 세무서에 문의해 기한 후 신고 절차를 밟으세요.',
  },
  {
    question: '중간예납한 세금은 나중에 어떻게 되나요?',
    answer:
      '이듬해 3월 법인세 확정신고 때 기납부세액으로 공제됩니다. 즉 중간예납은 1년치 세금을 미리 반씩 나눠 내는 개념이며, 확정신고 때 정산해 더 냈으면 환급, 덜 냈으면 추가 납부합니다. 세금을 새로 더 내는 것이 아니라 납부 시점을 앞당기는 제도입니다.',
  },
  {
    question: '중간예납도 지방소득세를 함께 내나요?',
    answer:
      '법인세 중간예납에는 지방소득세가 함께 부과되지 않습니다. 법인지방소득세는 이듬해 확정신고(4월) 때 별도로 신고·납부합니다. 따라서 8월 중간예납 시에는 법인세(국세)만 납부하면 됩니다.',
  },
];

export default function CorporateTaxInterimPrepayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '법인세 중간예납 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '법인세 중간예납 2026, 8월에 내는 상반기 법인세 완벽 정리',
    description:
      '12월 결산 법인의 8월 31일 법인세 중간예납. 직전연도 기준과 가결산 두 방식의 계산법, 면제 대상, 분납·가산세를 법인세법 §63 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['법인세', '중간예납', '가결산', '법인세법 63조', '8월 신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '법인세 중간예납 2026',
    description: '12월 결산 법인의 8월 법인세 중간예납 신고·계산·면제 기준.',
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
                    { name: '법인세 중간예납 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">법인 대표·경리 담당 · 8분 읽기 · 2026-07-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  법인세 중간예납 2026
                  <br />
                  <span className="text-2xl text-text-secondary">8월에 내는 상반기 법인세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  12월 결산 법인이라면 8월 31일까지 법인세 중간예납을 신고·납부해야 합니다. 이 글은 처음 중간예납을 맞는 대표님과 경리 담당자를 위해, 신고 기한이 언제인지, 세액을 어떤 방식으로 계산하는지, 어떤 법인이 면제되는지, 그리고 세금이 부담될 때 나눠 내는 방법까지 순서대로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-corporate-tax-interim-prepayment-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">법인세 중간예납이란 무엇인가요?</h2>
                <p>
                  법인세 중간예납은 1년치 법인세를 절반씩 나눠 미리 내는 제도입니다. 사업연도의 기간이 6개월을 초과하는 내국법인은 사업연도 개시일부터 6개월이 되는 날까지를 중간예납기간으로 보고, 그 기간에 대한 법인세를 미리 납부할 의무가 있습니다(법인세법 §63).
                </p>
                <p>
                  세금을 새로 더 내는 것이 아니라, 이듬해 확정신고 때 낼 세금 일부를 앞당겨 내는 개념입니다. 중간예납으로 낸 금액은 확정신고 때 기납부세액으로 공제되므로, 결과적으로 자금 흐름의 시점만 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 사업연도 6개월 초과 내국법인 (12월 결산 법인이 대표적)
                    <br />
                    · 기한: 12월 결산 법인은 2026년 8월 31일(월)까지
                    <br />
                    · 계산: 직전연도 기준 방식 또는 가결산 방식 중 선택
                    <br />
                    · 정산: 이듬해 3월 확정신고 때 기납부세액으로 공제
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중간예납 신고·납부 기한은 언제인가요?</h2>
                <p>
                  12월 결산 법인은 8월 31일까지입니다. 법인세법 §63은 중간예납기간이 지난 날부터 2개월 이내에 신고·납부하도록 정하고 있습니다. 사업연도 개시일이 1월 1일이면 중간예납기간은 6월 30일에 끝나고, 그로부터 2개월 뒤인 8월 31일이 기한이 됩니다.
                </p>
                <p>
                  결산월이 12월이 아닌 법인은 기한이 다릅니다. 예를 들어 3월 결산 법인은 상반기가 9월 30일에 끝나므로 11월 30일이 기한입니다. 자기 회사의 사업연도 개시일을 기준으로 계산하면 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="text-sm text-text-secondary">
                    예외: 기한 마지막 날이 토요일이나 공휴일이면 그다음 영업일까지 연장됩니다. 2026년 8월 31일은 월요일이므로 연장 없이 그날까지 신고하면 됩니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중간예납세액은 어떻게 계산하나요?</h2>
                <p>
                  두 가지 방식이 있고, 원칙적으로 법인이 선택할 수 있습니다. 계산이 간단해 대부분 쓰는 것은 직전연도 기준 방식입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 중간예납 두 가지 계산 방식 비교 (법인세법 §63의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">직전연도 기준 방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가결산 방식</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">계산 기준</td>
                        <td className="p-3">직전 사업연도 확정 산출세액의 절반</td>
                        <td className="p-3">상반기 실제 실적으로 가결산</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">서류</td>
                        <td className="p-3">간단(별도 결산 불필요)</td>
                        <td className="p-3">대차대조표·손익계산서·세무조정계산서 제출</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">유리한 경우</td>
                        <td className="p-3">상반기 실적이 나쁘지 않을 때</td>
                        <td className="p-3">상반기 적자·실적 급감 시 세액 절감</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">필수 적용</td>
                        <td className="p-3">일반 법인</td>
                        <td className="p-3">직전연도 산출세액이 없던 법인</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  직전연도 기준 방식의 공식은 다음과 같습니다. 직전 사업연도가 12개월인 12월 결산 법인은 사실상 직전연도 세액의 절반이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">직전연도 기준 중간예납세액 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    중간예납세액 = (직전연도 확정 산출세액 · 공제감면세액 · 원천납부세액 등을 차감) × (6 ÷ 직전 사업연도 월수)
                    <br />
                    12개월 사업연도라면 6 ÷ 12 = 절반
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="text-sm text-text-secondary">
                    다만, 상반기 적자가 크다면 직전연도 기준이 오히려 불리할 수 있습니다. 이때 가결산 방식을 선택하면 실제 상반기 실적에 맞춰 세액을 줄일 수 있습니다. 대신 결산 서류 작성 부담이 생깁니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">직접 계산해보는 3가지 사례</h2>
                <p>
                  아래 사례로 세액이 실제로 어떻게 나오는지 확인해보세요. 모두 12월 결산 법인(직전연도 12개월)을 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 직전연도 기준 (일반 법인)</p>
                  <p className="text-sm text-text-secondary">
                    · 직전연도 확정 산출세액: 2,400만원
                    <br />
                    · 공제감면·원천세: 없음
                    <br />
                    · 중간예납세액 = 2,400만원 × (6 ÷ 12) = <strong>1,200만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 8월 31일까지 1,200만원 납부. 1천만원 초과분 200만원은 분납 신청 가능.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 소액 면제 경계 (중소기업)</p>
                  <p className="text-sm text-text-secondary">
                    · 직전연도 확정 산출세액: 90만원
                    <br />
                    · 중간예납세액 = 90만원 × (6 ÷ 12) = 45만원
                    <br />
                    · 45만원은 소액 기준(50만원 미만)에 해당
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 중소기업으로서 중간예납세액이 50만원 미만이면 납부의무가 없습니다(§63의2). 반대로 산출세액이 100만원이면 중간예납 50만원으로 면제 대상이 아닙니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 가결산 방식 (상반기 실적 기준)</p>
                  <p className="text-sm text-text-secondary">
                    · 상반기(6개월) 가결산 과세표준: 1억원
                    <br />
                    · 세율 적용을 위해 1년치로 환산: 1억원 × (12 ÷ 6) = 2억원
                    <br />
                    · 연환산 산출세액: 2억원 × 9%(과세표준 2억 이하 세율, §55) = 1,800만원
                    <br />
                    · 다시 6개월분으로: 1,800만원 × (6 ÷ 12) = <strong>900만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 가결산 방식은 6개월 과세표준을 1년으로 환산해 세율을 적용한 뒤 다시 절반으로 나눕니다. 상반기 적자면 이 값이 0이 되어 납부액이 없습니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-corporate-tax-interim-prepayment-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중간예납이 면제되는 법인은?</h2>
                <p>
                  모든 법인이 중간예납을 하는 것은 아닙니다. 다음에 해당하면 의무가 없거나 납부하지 않아도 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>사업연도 6개월 이하 법인:</strong> 중간예납기간 자체가 성립하지 않아 의무가 없습니다.
                  </li>
                  <li>
                    <strong>신설법인의 최초 사업연도:</strong> 합병·분할로 설립된 법인은 제외되지만, 그 밖의 신설법인은 설립 첫 사업연도에는 중간예납 의무가 없습니다.
                  </li>
                  <li>
                    <strong>수입금액이 없는 휴업 법인:</strong> 중간예납기간에 휴업 등으로 사업수입금액이 없으면 의무가 없습니다.
                  </li>
                  <li>
                    <strong>중소기업 소액 부징수:</strong> 직전연도 기준으로 계산한 중간예납세액이 50만원 미만인 중소기업은 납부하지 않아도 됩니다(§63의2).
                  </li>
                </ul>
                <p className="mt-4">
                  다만 직전연도에 산출세액이 없던 법인(결손 등)은 면제가 아니라, 반드시 가결산 방식으로 세액을 계산해 신고해야 합니다. 면제와 혼동하지 않도록 주의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금이 부담되면 나눠 낼 수 있나요?</h2>
                <p>
                  납부할 세액이 1천만원을 초과하면 분납할 수 있습니다. 확정신고와 동일한 분납 규정이 적용됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>1천만원 초과 2천만원 이하: 1천만원을 초과하는 금액을 분납</li>
                  <li>2천만원 초과: 세액의 50% 이하 금액을 분납</li>
                  <li>분납 기한: 납부기한 다음 날부터 1개월 이내(중소기업은 2개월 이내)</li>
                </ul>
                <p className="mt-4">
                  예외: 기한 내에 신고·납부하지 않으면 납부지연가산세가 하루 단위로 붙습니다. 자금이 부족하더라도 분납 제도를 활용해 기한 내 일부라도 납부하는 편이 가산세를 줄이는 방법입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/march-corporate-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">3월 법인세 확정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">중간예납을 정산하는 이듬해 확정신고 흐름을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-interim-prepayment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 중간예납 (11월)</div>
                    <p className="mt-1 text-sm text-text-secondary">개인사업자의 중간예납은 어떻게 다른지 비교해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">법인·개인사업자 등록 절차와 세무 첫걸음.</p>
                  </Link>
                  <Link
                    href="/guide/business-closure-vat-final-return-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">폐업 부가세 확정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">사업 정리 시 챙겨야 할 세무 마무리.</p>
                  </Link>
                  <Link
                    href="/guide/tax-calendar-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 세무 캘린더</div>
                    <p className="mt-1 text-sm text-text-secondary">월별 신고·납부 일정을 한눈에 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인·법인 맞춤 세무 조언이 아닙니다. 실제 중간예납세액, 면제 여부, 분납 한도는 법인의 결산 상황에 따라 달라지므로 관할 세무서 또는 세무대리인, 홈택스(hometax.go.kr)에서 반드시 확인하세요. 본 콘텐츠는 2026-07-25 기준이며, 인용한 법조항은 <strong>법인세법 §63(중간예납 의무), §63의2(중간예납세액의 계산), §55(세율)</strong>입니다. 세율·소액 기준 등 세부 수치는 개정될 수 있으니 국세청 고시를 우선하세요. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(법인세법)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="법인세 중간예납 2026 가이드"
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
