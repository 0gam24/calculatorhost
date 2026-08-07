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

const URL = 'https://calculatorhost.com/guide/income-certificate-issuance-2026/';
const DATE_PUBLISHED = '2026-08-08';
const DATE_MODIFIED = '2026-08-08';

export const metadata: Metadata = {
  title: '소득금액증명원 발급 2026, 프리랜서 안 될 때 대안',
  description:
    '소득금액증명원은 종합소득세 신고가 끝난 직전연도분을 대개 7월 이후부터 발급받을 수 있습니다. 프리랜서가 신고 전이거나 무신고면 발급이 막힙니다. 홈택스·정부24 발급 방법과 부가세 과세표준증명원, 발급이 안 될 때 대안까지 정리했습니다.',
  keywords: [
    '소득금액증명원',
    '소득금액증명원 발급방법',
    '프리랜서 소득금액증명',
    '소득금액증명원 발급 안됨',
    '부가가치세 과세표준증명원',
    '대출 소득증빙 서류',
    '소득세법 70조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '소득금액증명원 발급 2026' }],
    title: '소득금액증명원 발급 2026, 프리랜서 안 될 때 대안',
    description: '소득금액증명원 발급 시기와 홈택스·정부24 방법, 프리랜서 발급 불가 시 대안까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '소득금액증명원 발급 2026, 프리랜서 안 될 때 대안',
    description: '대출·전세 제출용 소득금액증명원 발급 시기·방법과 발급이 막혔을 때 대안 서류 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '소득금액증명원은 언제부터 발급받을 수 있나요?',
    answer:
      '종합소득세 신고가 끝난 직전연도 소득은 대체로 그해 7월 이후부터 발급됩니다. 5월에 종합소득세 신고를 마치면 자료 처리를 거쳐 7월경 발급이 가능해지기 때문입니다. 그전에 직전연도를 선택하면 아직 확정 자료가 없어 발급이 안 될 수 있습니다.',
  },
  {
    question: '프리랜서인데 소득금액증명원이 발급되지 않아요. 왜 그런가요?',
    answer:
      '종합소득세 신고를 하지 않았거나 아직 신고 자료가 처리되지 않아서일 가능성이 큽니다. 소득금액증명원은 신고된 소득을 근거로 발급되므로(소득세법 §70), 무신고 상태면 발급 대상 자료 자체가 없습니다. 이 경우 종합소득세를 신고하거나 사실증명 서류로 대체해야 합니다.',
  },
  {
    question: '소득금액증명원은 어디에서 발급하나요?',
    answer:
      '홈택스(hometax.go.kr), 정부24(gov.kr), 무인민원발급기, 세무서 방문으로 발급할 수 있습니다. 온라인은 공동인증서 등으로 본인인증 후 즉시 발급·출력이 가능합니다. 은행 제출용은 대부분 온라인 발급본을 그대로 인정합니다.',
  },
  {
    question: '소득금액증명원과 부가가치세 과세표준증명원은 무엇이 다른가요?',
    answer:
      '소득금액증명원은 개인의 종합소득(근로·사업 등) 금액을 증명하고, 부가가치세 과세표준증명원은 사업자의 부가세 신고 매출 규모를 증명합니다(부가가치세법 §48·§49). 은행이 사업자 대출을 심사할 때 매출 확인용으로 과세표준증명원을 요구하는 경우가 있습니다.',
  },
  {
    question: '올해 소득으로는 증명원을 뗄 수 없나요?',
    answer:
      '아직 신고가 끝나지 않은 당해연도 소득은 소득금액증명원으로 발급되지 않습니다. 종합소득세 신고 후 확정된 직전연도 자료만 발급됩니다. 최근 소득을 증빙해야 한다면 급여명세서, 건강보험 자격득실확인서, 위촉계약서 같은 보조 자료를 활용해야 합니다.',
  },
  {
    question: '발급이 안 될 때 대안 서류는 무엇인가요?',
    answer:
      '사실증명(신고사실 없음) 서류로 무신고 사실을 증명하거나, 건강보험 납부확인서·재직증명서·급여명세서 등으로 소득을 보조 입증할 수 있습니다. 금융기관마다 인정 서류가 다르므로, 대출·전세 심사 전에 어떤 서류가 필요한지 먼저 확인하는 것이 좋습니다.',
  },
  {
    question: '지난 몇 년치를 한꺼번에 뗄 수 있나요?',
    answer:
      '네, 홈택스나 정부24에서 연도를 선택해 과거 여러 연도의 소득금액증명원을 각각 발급할 수 있습니다. 다만 신고가 이루어진 연도만 발급되며, 신고하지 않은 연도는 발급되지 않습니다. 필요한 연도를 미리 확인해 두면 편합니다.',
  },
];

export default function IncomeCertificateIssuancePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '소득금액증명원 발급 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '소득금액증명원 발급 2026, 발급 시기·방법과 프리랜서 대안',
    description:
      '소득금액증명원 발급 시기(직전연도, 7월 이후), 홈택스·정부24 발급 방법, 프리랜서 발급 불가 사유, 부가가치세 과세표준증명원, 발급 대안 서류까지 정리한 실무 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['소득금액증명원', '발급방법', '프리랜서', '과세표준증명원', '소득증빙'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '소득금액증명원 발급 2026',
    description:
      '소득금액증명원 발급 시기와 홈택스·정부24 발급 방법, 프리랜서 발급 불가 사유와 대안 서류.',
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
                    { name: '소득금액증명원 발급 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">프리랜서·직장인·사업자 · 8분 읽기 · 2026-08-08</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  소득금액증명원 발급 2026
                  <br />
                  <span className="text-2xl text-text-secondary">프리랜서가 안 될 때 대안까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  대출이나 전세 계약, 각종 신청 때문에 소득금액증명원을 떼려는데 발급이 안 되거나 작년치가 조회되지 않아 당황한 적이 있나요. 이 가이드는 대출·전세를 준비하는 직장인과 프리랜서, 사업자를 위해 언제부터 발급되는지, 왜 발급이 막히는지, 어디서 어떻게 떼는지, 그리고 발급이 안 될 때 어떤 서류로 대체하는지 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-income-certificate-issuance-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득금액증명원이란 무엇인가</h2>
                <p>
                  소득금액증명원은 개인이 신고한 소득 금액을 국세청이 공식적으로 증명해 주는 서류입니다. 근로소득, 사업소득 등 종합소득세 신고 내용을 근거로 발급되며, 은행 대출 심사나 전세자금대출, 각종 지원 신청 시 소득 증빙으로 널리 쓰입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 ml-5 list-disc text-sm text-text-secondary space-y-1">
                    <li>발급 시기: 신고 끝난 직전연도분은 대개 7월 이후</li>
                    <li>발급 근거: 종합소득세 신고 내용(소득세법 §70)</li>
                    <li>발급처: 홈택스·정부24·무인민원발급기·세무서</li>
                    <li>무신고 시: 발급 불가, 사실증명 등으로 대체</li>
                  </ul>
                </div>
                <p>
                  즉 이 서류는 "국세청에 신고된 내 소득이 이만큼"이라는 것을 증명합니다. 그래서 신고를 하지 않았거나 신고 자료가 아직 처리되지 않으면 발급 자체가 되지 않는 것이 핵심입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제부터 발급되나</h2>
                <p>
                  신고가 끝난 직전연도 소득은 대체로 그해 7월 이후에 발급됩니다. 5월에 종합소득세 신고를 마치면 국세청이 자료를 처리하는 기간을 거쳐 7월경부터 그 연도분 증명원이 나옵니다(소득세법 §70).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 소득 귀속연도별 발급 가능 시점(일반적 예시)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">소득 귀속연도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신고 시기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">발급 가능 시점</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2024년 소득</td>
                        <td className="p-3">2025년 5월 신고</td>
                        <td className="p-3">2025년 7월 이후</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2025년 소득</td>
                        <td className="p-3">2026년 5월 신고</td>
                        <td className="p-3">2026년 7월 이후</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2026년 소득</td>
                        <td className="p-3">2027년 5월 신고 예정</td>
                        <td className="p-3">2027년 7월 이후</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 발급 개시 시점은 처리 상황에 따라 다소 달라질 수 있습니다. 급하게 직전연도 증명원이 필요하면 홈택스에서 발급 가능 여부를 먼저 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">왜 발급이 안 되나</h2>
                <p>
                  발급이 막히는 가장 흔한 이유는 신고 자료가 없기 때문입니다. 프리랜서·사업자에게 자주 생기는 상황을 사례로 정리했습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 신고 전 직전연도 선택</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 2026년 6월에 2025년 소득 증명원을 신청
                    <br />
                    · 원인: 5월 신고분 자료 처리 전이라 확정 자료 미존재
                    <br />
                    · 해결: 7월 이후 재신청 또는 2024년분으로 대체
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 무신고 프리랜서</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 3.3% 떼고 일했지만 종합소득세를 신고하지 않음
                    <br />
                    · 원인: 신고된 소득 자료 자체가 없어 발급 불가
                    <br />
                    · 해결: 종합소득세(기한후) 신고 후 발급 또는 사실증명 활용
                  </p>
                </div>
                <p className="mt-4">
                  예외: 은행이 프리랜서에게 소득금액증명원 대신 종합소득세 과세표준 확정신고 계산서를 요청하는 경우도 있습니다. 어떤 서류가 필요한지 금융기관에 먼저 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-income-certificate-issuance-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어디서 어떻게 발급하나</h2>
                <p>
                  온라인 발급이 가장 빠릅니다. 홈택스나 정부24에서 본인인증 후 즉시 출력할 수 있고, 무인민원발급기나 세무서 방문도 가능합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">홈택스 발급 절차</p>
                  <ol className="ml-5 list-decimal text-sm text-text-secondary space-y-1">
                    <li>홈택스(hometax.go.kr) 로그인(공동·간편인증)</li>
                    <li>증명·등록·신청 메뉴에서 소득금액증명 선택</li>
                    <li>귀속연도 선택 후 발급 신청</li>
                    <li>화면 출력 또는 PDF 저장</li>
                  </ol>
                </div>
                <p className="mt-4">
                  주의: 사업자라면 부가가치세 과세표준증명원이 별도로 필요할 수 있습니다. 이는 부가세 신고 매출을 증명하는 서류로(부가가치세법 §48·§49), 소득금액증명원과 용도가 다르므로 요청 서류를 정확히 확인해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 원천징수</div>
                    <p className="mt-1 text-sm text-text-secondary">신고와 소득 증빙의 기초를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-refund-timing-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 환급 시기</div>
                    <p className="mt-1 text-sm text-text-secondary">5월 신고 후 자료 처리와 환급 일정.</p>
                  </Link>
                  <Link
                    href="/guide/may-31-deadline-day-income-tax-filing-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">5월 종합소득세 신고</div>
                    <p className="mt-1 text-sm text-text-secondary">신고를 해야 증명원 발급이 가능합니다.</p>
                  </Link>
                  <Link
                    href="/guide/credit-score-loan-interest-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용점수와 대출금리</div>
                    <p className="mt-1 text-sm text-text-secondary">소득 증빙과 함께 대출 심사에 영향을 줍니다.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">신고 세액을 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세 관련 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 소득금액증명원 발급 가능 시점은 신고·자료 처리 상황에 따라 달라질 수 있고, 금융기관이 인정하는 소득 증빙 서류는 기관마다 다릅니다. 실제 발급 여부와 필요 서류는 홈택스·정부24 안내와 제출처(은행 등)에 미리 확인하세요. 본 콘텐츠는 2026-08-08 기준이며, 인용 법조항은 <strong>소득세법 §70(종합소득 과세표준 확정신고), 부가가치세법 §48·§49(예정·확정신고)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.gov.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">정부24</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="소득금액증명원 발급 2026 가이드"
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
