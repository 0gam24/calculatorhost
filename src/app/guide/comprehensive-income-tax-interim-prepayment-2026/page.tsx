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

const URL = 'https://calculatorhost.com/guide/comprehensive-income-tax-interim-prepayment-2026/';
const DATE_PUBLISHED = '2026-07-15';
const DATE_MODIFIED = '2026-07-15';
// 수익 레버 [revenue-lever: indexing+traffic]: 신규 색인 페이지 추가, 롱테일 트래픽 유입

export const metadata: Metadata = {
  title: '종합소득세 중간예납 2026, 11월 고지·추계신고·분납 총정리',
  description:
    '개인사업자·프리랜서는 11월에 전년 종합소득세의 절반을 미리 냅니다. 소득세법 §65 중간예납의 고지 방식, 50만원 미만 제외, 사업 부진 시 추계신고, 분납 요건을 사례로 정리합니다.',
  keywords: [
    '종합소득세 중간예납',
    '중간예납 11월',
    '중간예납 추계신고',
    '사업자 중간예납',
    '중간예납 분납',
    '소득세법 65조',
    '프리랜서 중간예납',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종합소득세 중간예납 2026, 11월 고지·추계신고·분납 총정리' }],
    title: '종합소득세 중간예납 2026, 11월 고지와 추계신고',
    description: '전년 종합소득세의 1/2을 11월 30일까지 납부. 50만원 미만은 제외, 사업 부진 시 추계신고로 감액. 소득세법 §65.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합소득세 중간예납 2026, 11월 총정리',
    description: '개인사업자·프리랜서 11월 중간예납. 전년 세액 1/2 고지, 추계신고·분납. 소득세법 §65.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종합소득세 중간예납이 무엇인가요?',
    answer:
      '중간예납은 개인사업자·프리랜서가 다음 해 5월 종합소득세 확정신고에 앞서, 11월에 세금의 일부를 미리 내는 제도입니다(소득세법 §65). 원칙적으로 직전 과세기간에 낸 종합소득세의 2분의 1을 중간예납세액으로 하여 11월 30일까지 납부합니다. 미리 낸 금액은 다음 해 확정신고 때 기납부세액으로 차감됩니다.',
  },
  {
    question: '누가 중간예납을 내나요?',
    answer:
      '사업소득이 있는 거주자가 주 대상입니다. 근로소득만 있어 매달 원천징수되는 직장인, 이자·배당 등 분리과세로 끝나는 소득만 있는 사람 등은 중간예납 대상이 아닙니다. 또한 해당 과세기간에 새로 사업을 시작한 신규사업자는 직전 실적이 없어 중간예납 고지 대상에서 제외됩니다.',
  },
  {
    question: '중간예납세액은 어떻게 정해지나요?',
    answer:
      '원칙적으로 직전 과세기간의 종합소득세로 납부했거나 납부해야 할 세액의 2분의 1이 중간예납세액입니다. 세무서장이 11월 1일부터 15일 사이에 납부고지서를 보내주므로, 사업자가 따로 계산하거나 신고할 필요 없이 고지된 금액을 11월 30일까지 납부하면 됩니다.',
  },
  {
    question: '중간예납세액이 적으면 안 내도 되나요?',
    answer:
      '중간예납세액이 50만원 미만이면 고지되지 않으므로 납부하지 않아도 됩니다(소액부징수). 예를 들어 직전 종합소득세가 80만원이면 절반인 40만원이 되어 50만원에 미치지 못하므로 고지 자체가 나오지 않습니다. 이 경우 다음 해 5월 확정신고 때 전액을 정산합니다.',
  },
  {
    question: '올해 사업이 어려운데 그대로 절반을 내야 하나요?',
    answer:
      '아니요. 올해 상반기 실적이 나빠 중간예납추계액이 중간예납기준액의 30%에 미달할 것으로 예상되면, 11월 1일부터 30일 사이에 추계신고를 해서 실제 예상 세액으로 낮춰 낼 수 있습니다. 사업 부진으로 자금이 어려운 사업자에게 유용한 제도이므로, 상반기 손익을 정리해 추계신고 여부를 검토하세요.',
  },
  {
    question: '중간예납세액도 분납이 되나요?',
    answer:
      '됩니다. 납부할 중간예납세액이 1천만원을 초과하면 일부를 나누어 낼 수 있습니다. 일반적으로 1천만원 초과 2천만원 이하이면 1천만원을 초과하는 금액을, 2천만원을 초과하면 세액의 50% 이하 금액을 납부기한이 지난 후 2개월 이내에 분납할 수 있습니다. 구체적 분납 가능액은 고지서에 안내됩니다.',
  },
  {
    question: '중간예납을 안 내면 어떻게 되나요?',
    answer:
      '납부기한(11월 30일)까지 내지 않으면 납부지연가산세가 부과되고, 체납으로 이어지면 가산금과 독촉·징수 절차가 진행될 수 있습니다. 자금 사정이 어렵다면 추계신고나 분납, 또는 관할 세무서에 납부기한 연장을 신청하는 방법을 먼저 검토하는 것이 바람직합니다.',
  },
  {
    question: '중간예납한 세금은 나중에 돌려받나요?',
    answer:
      '중간예납은 다음 해 5월 확정신고 때 기납부세액으로 차감됩니다. 확정신고로 계산한 연간 세액보다 중간예납액이 많으면 그 차액을 환급받고, 적으면 부족분을 추가로 냅니다. 즉 중간예납은 세금을 더 내는 것이 아니라 낼 세금을 나누어 미리 내는 것에 가깝습니다.',
  },
];

export default function ComprehensiveIncomeTaxInterimPrepayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종합소득세 중간예납 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합소득세 중간예납 2026, 11월 고지·추계신고·분납 총정리',
    description:
      '개인사업자·프리랜서의 11월 종합소득세 중간예납. 소득세법 §65 고지 방식, 50만원 미만 제외, 추계신고, 분납 요건을 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합소득세 중간예납', '중간예납 추계신고', '중간예납 분납', '소득세법 65조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합소득세 중간예납 2026',
    description:
      '개인사업자·프리랜서의 11월 종합소득세 중간예납 제도의 고지, 추계신고, 분납 정리.',
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
                    { name: '종합소득세 중간예납 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·프리랜서 · 8분 읽기 · 2026-07-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종합소득세 중간예납 2026
                  <br />
                  <span className="text-2xl text-text-secondary">11월 고지·추계신고·분납 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  개인사업자와 프리랜서는 5월 종합소득세 확정신고만 챙기면 된다고 생각하기 쉽지만, 11월에도 세금을 미리 내는 중간예납이 기다리고 있습니다. 갑자기 날아온 고지서에 당황하지 않도록, 이 가이드는 소득세법 §65에 따른 중간예납의 계산 방식, 소액 제외 기준, 사업 부진 시 감액 방법, 분납까지 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-comprehensive-income-tax-interim-prepayment-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중간예납은 왜 내는 건가요?</h2>
                <p>
                  중간예납은 1년치 세금을 한 번에 몰아서 내는 부담을 줄이고, 국가 재정을 안정적으로 확보하기 위한 선납 제도입니다(소득세법 §65). 근로자가 매달 원천징수로 세금을 나눠 내는 것과 비슷한 취지로, 사업자에게는 11월 중간예납이 그 역할을 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">중간예납 핵심 일정</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 중간예납기간: 1월 1일부터 6월 30일까지
                    <br />
                    · 고지서 발급: 11월 1일부터 11월 15일
                    <br />
                    · 납부기한: 11월 30일
                    <br />
                    · 원칙: 직전 과세기간 종합소득세의 2분의 1
                  </p>
                </div>
                <p className="mt-4">
                  중요한 점은 중간예납이 세금을 더 걷는 것이 아니라는 것입니다. 11월에 미리 낸 금액은 다음 해 5월 확정신고 때 기납부세액으로 빠짐없이 차감됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 중간예납을 내지 않으면 확정신고 세액이 그대로 남는 데다 납부지연가산세까지 붙으므로, 결과적으로 더 많은 세금을 내게 됩니다. 미루지 말고 기한 내 처리하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마를 언제 내야 하나요?</h2>
                <p>
                  중간예납은 사업자가 직접 계산할 필요 없이 세무서가 고지해 줍니다. 기준 금액과 예외를 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 종합소득세 중간예납 요약 (소득세법 §65)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기본 세액</td>
                        <td className="p-3">직전 과세기간 종합소득세의 1/2</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">납부 방식</td>
                        <td className="p-3">세무서 고지 후 11월 30일까지 납부</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소액 제외</td>
                        <td className="p-3">중간예납세액 50만원 미만이면 고지 안 함</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">감액 신고</td>
                        <td className="p-3">추계액이 기준액의 30% 미달 시 추계신고 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">분납</td>
                        <td className="p-3">1천만원 초과 시 2개월 이내 분납 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 신규사업자는 직전 실적이 없어 중간예납 고지 대상이 아닙니다. 첫 사업연도에는 이듬해 5월 확정신고에서 전액을 정산하게 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 사례로 살펴보면 어떤가요?</h2>
                <p>
                  직전 종합소득세 금액에 따라 중간예납이 어떻게 달라지는지 세 가지 사례로 확인합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 직전 종합소득세 300만원</p>
                  <p className="text-sm text-text-secondary">
                    · 중간예납세액: 300만 곱하기 1/2 = 150만원
                    <br />
                    · 11월 30일까지 150만원 납부
                    <br />
                    · 다음 해 5월 확정신고 때 150만원을 기납부세액으로 차감
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세금이 늘어난 것이 아니라 절반을 미리 낸 것입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 직전 종합소득세 80만원 (소액 제외)</p>
                  <p className="text-sm text-text-secondary">
                    · 중간예납세액: 80만 곱하기 1/2 = 40만원
                    <br />
                    · 40만원은 50만원 미만이므로 고지되지 않음
                    <br />
                    · 11월 납부 없음, 다음 해 5월에 전액 정산
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 직전 세액이 100만원 미만이면 중간예납 고지가 나오지 않습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 올해 상반기 매출 급감 (추계신고)</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 세액 기준 고지액: 150만원
                    <br />
                    · 올해 상반기 실적으로 추계한 예상세액: 30만원 (기준액의 30% 미만)
                    <br />
                    · 11월 1일부터 30일 사이 추계신고로 30만원만 납부
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 사업이 어려워졌다면 추계신고로 부담을 줄일 수 있습니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-comprehensive-income-tax-interim-prepayment-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추계신고와 분납은 어떻게 활용하나요?</h2>
                <p>
                  자금 사정이 어려운 사업자를 위한 두 가지 장치가 추계신고와 분납입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>추계신고:</strong> 올해 상반기 실적으로 계산한 중간예납추계액이 중간예납기준액의 30%에 미달하면, 11월 1일부터 30일 사이에 신고해 실제 예상 세액으로 낮춰 냅니다.
                  </li>
                  <li>
                    <strong>분납:</strong> 납부할 세액이 1천만원을 초과하면 일부를 납부기한 후 2개월 이내에 나누어 낼 수 있습니다.
                  </li>
                  <li>
                    <strong>납부기한 연장:</strong> 재해·사업 부진 등 사유가 있으면 관할 세무서에 납부기한 연장을 신청할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 추계신고는 상반기 장부와 증빙이 정리돼 있어야 정확히 산정할 수 있습니다. 근거 없이 임의로 낮춰 신고하면 이후 확정신고에서 부족분과 가산세가 발생할 수 있으니 주의하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율·세율을 반영해 예상 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준 구간별 세율과 누진공제를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/income-tax-installment-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 분납 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세액이 클 때 나누어 내는 분납 요건과 기한.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">프리랜서 필요경비 계산 방식의 차이를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">복식부기 vs 간편장부</div>
                    <p className="mt-1 text-sm text-text-secondary">사업자의 기장의무와 무기장가산세를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 중간예납세액, 추계신고 가능 여부, 분납 가능액은 개별 사업자의 소득·업종에 따라 달라지므로 홈택스 고지 내용과 관할 세무서, 세무 전문가를 통해 확인하세요. 본 콘텐츠는 2026-07-15 기준으로 작성되었으며, 세법 개정 시 업데이트됩니다. 인용 법조항은 <strong>소득세법 §65(중간예납)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="종합소득세 중간예납 2026 가이드"
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
