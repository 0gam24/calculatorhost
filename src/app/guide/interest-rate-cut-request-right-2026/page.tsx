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

const URL = 'https://calculatorhost.com/guide/interest-rate-cut-request-right-2026/';
const DATE_PUBLISHED = '2026-08-08';
const DATE_MODIFIED = '2026-08-08';

export const metadata: Metadata = {
  title: '금리인하요구권 2026, 승진·소득증가 시 신청 방법',
  description:
    '금리인하요구권은 취업·승진·소득 증가나 신용점수 개선 등 신용 상태가 좋아졌을 때 대출금리 인하를 요구할 수 있는 법적 권리입니다(은행법 §30의2). 신청 요건, 필요 서류, 심사 기간 10영업일, 거절 사유와 재신청 전략까지 정리했습니다.',
  keywords: [
    '금리인하요구권',
    '금리인하요구권 신청방법',
    '승진 소득증가 금리인하',
    '대출금리 인하 요구',
    '금리인하요구 거절',
    '신용점수 개선 대출',
    '은행법 30조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '금리인하요구권 2026 신청 방법' }],
    title: '금리인하요구권 2026, 승진·소득증가 시 신청 방법',
    description: '신용 상태가 개선됐을 때 대출금리 인하를 요구하는 법적 권리. 요건·서류·심사·거절 사유 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '금리인하요구권 2026, 승진·소득증가 시 신청 방법',
    description: '취업·승진·소득증가·신용개선 시 대출금리를 낮춰달라 요구할 수 있는 권리. 신청법과 거절 대응 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '금리인하요구권은 누가 신청할 수 있나요?',
    answer:
      '대출을 받은 개인·개인사업자·기업이 신용 상태가 개선됐을 때 신청할 수 있습니다(은행법 §30의2). 취업·이직·승진에 따른 소득 증가, 재산 증가, 신용점수 상승 등이 대표 사유입니다. 대출 실행 이후 상황이 좋아졌다면 대출 기간 중 여러 번 신청할 수 있습니다.',
  },
  {
    question: '어떤 서류가 필요한가요?',
    answer:
      '신용 개선을 입증하는 서류가 필요합니다. 소득 증가라면 재직증명서·근로소득 원천징수영수증·건강보험 자격득실확인서 등을, 재산 증가라면 관련 증빙을 제출합니다. 금융회사 앱이나 영업점에서 신청 화면 안내에 따라 서류를 올리면 됩니다.',
  },
  {
    question: '신청하면 결과는 언제 나오나요?',
    answer:
      '금융회사는 신청 접수 후 영업일 기준 10일 이내에 수용 여부와 사유를 알려줍니다. 문자·이메일·전화 등으로 결과가 통지되며, 거절되면 표준 서식에 따라 불수용 사유를 안내받습니다. 수용되면 인하된 금리가 적용됩니다.',
  },
  {
    question: '신청하면 무조건 금리가 내려가나요?',
    answer:
      '아닙니다. 신용 상태 개선이 실제 금리 산정에 반영될 정도인지 심사를 거칩니다. 이미 최저 수준 금리를 적용받고 있거나, 금리에 신용도가 반영되지 않는 상품(일부 정책·고정형 상품 등)이라면 거절될 수 있습니다. 거절이 곧 부당한 것은 아니며 사유를 확인해 대비하면 됩니다.',
  },
  {
    question: '얼마나 낮아지나요?',
    answer:
      '인하 폭은 개선된 신용 상태와 상품별 금리 체계에 따라 달라지므로 일률적으로 정해져 있지 않습니다. 소득이 크게 늘거나 신용점수가 크게 올랐다면 인하 여지가 커집니다. 인하 폭은 신청 전에 확정되지 않으므로 심사 결과로 확인해야 합니다.',
  },
  {
    question: '거절당하면 어떻게 하나요?',
    answer:
      '불수용 사유를 확인한 뒤 그 부분을 보완해 재신청할 수 있습니다. 예를 들어 소득 증빙이 부족했다면 최신 소득 자료를 갖춰 다시 신청하면 됩니다. 사유 안내가 부실하거나 절차에 문제가 있다고 판단되면 금융감독원에 민원을 제기할 수 있습니다.',
  },
  {
    question: '어떤 대출에 신청할 수 있나요?',
    answer:
      '은행 대출뿐 아니라 저축은행·카드·캐피탈·보험약관대출 등 여러 금융권 대출에 신청할 수 있습니다. 은행법 외에도 상호저축은행법·여신전문금융업법 등에 같은 취지의 규정이 있습니다. 다만 상품에 따라 대상 여부가 다르므로 해당 금융회사에 확인하세요.',
  },
];

export default function InterestRateCutRequestPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '금리인하요구권 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '금리인하요구권 2026, 승진·소득증가 시 신청 방법과 거절 대응',
    description:
      '금리인하요구권의 신청 요건, 필요 서류, 심사 기간 10영업일, 인하 폭, 거절 사유와 재신청 전략을 정리한 대출자 실무 가이드. 은행법 §30의2 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['금리인하요구권', '신청방법', '소득증가', '대출금리 인하', '거절 사유'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '금리인하요구권 2026',
    description:
      '신용 상태 개선 시 대출금리 인하를 요구하는 금리인하요구권의 요건·서류·심사·거절 대응.',
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
                    { name: '금리인하요구권 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">대출 보유자·직장인 · 8분 읽기 · 2026-08-08</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  금리인하요구권 2026
                  <br />
                  <span className="text-2xl text-text-secondary">승진·소득증가 시 신청 방법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  대출을 받은 뒤 취업에 성공했거나 승진해서 연봉이 올랐다면, 대출금리를 낮춰달라고 요구할 수 있는 권리가 있습니다. 이 가이드는 대출을 갚고 있는 직장인과 자영업자를 위해, 금리인하요구권을 누가 언제 신청할 수 있는지, 어떤 서류가 필요한지, 거절되면 어떻게 대응하는지 실전 순서로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-interest-rate-cut-request-right-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금리인하요구권이란 무엇인가</h2>
                <p>
                  금리인하요구권은 대출을 받은 사람이 신용 상태가 개선됐을 때 금융회사에 대출금리 인하를 요구할 수 있는 법적 권리입니다(은행법 §30의2). 과거에는 관행적으로만 존재했으나 법에 명시되면서 금융회사가 안내·심사·통지할 의무를 지게 됐습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 ml-5 list-disc text-sm text-text-secondary space-y-1">
                    <li>대상: 대출 실행 후 신용 상태가 좋아진 차주</li>
                    <li>사유: 취업·승진·소득 증가, 재산 증가, 신용점수 상승</li>
                    <li>심사: 신청 후 영업일 기준 10일 이내 결과 통지</li>
                    <li>거절 시: 사유 확인 후 보완해 재신청 가능</li>
                  </ul>
                </div>
                <p>
                  요컨대 "돈을 빌릴 때보다 지금 내 상환 능력이 좋아졌다"는 점을 증빙으로 보여주면 금리를 다시 협상할 수 있는 제도입니다. 신청은 무료이고 신용점수에 불이익을 주지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 신청할 수 있나</h2>
                <p>
                  대출 실행 이후 신용 상태가 개선된 차주라면 신청할 수 있습니다. 대표적인 개선 사유는 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 대표적인 신용 개선 사유와 증빙</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개선 사유</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대표 증빙</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">취업·이직·승진(소득 증가)</td>
                        <td className="p-3">재직증명서, 원천징수영수증, 급여명세서</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">재산 증가</td>
                        <td className="p-3">부동산·금융자산 관련 증빙</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신용점수 상승</td>
                        <td className="p-3">개인신용평점 자료(자동 조회되기도 함)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 개선 사유가 있어도 그 변화가 금리 산정에 반영될 정도인지는 금융회사가 심사합니다. 최근 6개월 내 취업·승진 등 뚜렷한 변화가 있을 때 신청 성공률이 높습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 신청하나</h2>
                <p>
                  대부분 금융회사 앱이나 인터넷뱅킹에서 비대면으로 신청할 수 있습니다. 영업점 방문도 가능합니다. 절차는 아래와 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신청 절차</p>
                  <ol className="ml-5 list-decimal text-sm text-text-secondary space-y-1">
                    <li>금융회사 앱·인터넷뱅킹에서 금리인하요구 메뉴 선택</li>
                    <li>개선 사유 선택(소득 증가·재산 증가·신용 개선 등)</li>
                    <li>증빙 서류 업로드(재직증명서·원천징수영수증 등)</li>
                    <li>신청 접수 후 영업일 기준 10일 이내 결과 대기</li>
                    <li>수용 시 인하 금리 적용, 거절 시 사유 확인</li>
                  </ol>
                </div>
                <p className="mt-4">
                  주의: 대출별로 각각 신청해야 하며, 여러 금융회사에 대출이 있다면 각 회사에 따로 신청합니다. 신청 자체는 비용이 없으므로 조건이 좋아졌다면 부담 없이 시도해 볼 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마나 낮아지고, 왜 거절되나</h2>
                <p>
                  인하 폭은 개선된 신용 상태와 상품 금리 체계에 따라 달라져 미리 확정되지 않습니다. 소득·신용의 변화 폭이 클수록 인하 여지도 커집니다. 반대로 다음과 같은 경우에는 거절될 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>이미 최저 금리 적용:</strong> 더 낮출 여지가 없는 경우</li>
                  <li><strong>신용도 미반영 상품:</strong> 금리에 개인 신용도가 반영되지 않는 일부 정책·고정형 상품</li>
                  <li><strong>개선 폭 미미:</strong> 소득·신용 변화가 금리 산정에 영향을 줄 정도가 아닌 경우</li>
                </ul>
                <p className="mt-4">
                  예외: 거절되더라도 신용점수에 불이익은 없습니다. 불수용 사유를 확인해 부족했던 증빙을 보완하면 재신청할 수 있고, 다음 소득 상승 시점에 다시 시도하는 전략도 유효합니다.
                </p>
              </section>

              <AdSlot slot="guide-interest-rate-cut-request-right-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자주 하는 실수와 활용 전략</h2>
                <p>
                  제도를 몰라서 못 쓰는 경우가 가장 흔합니다. 신청은 무료이고 대출 기간 중 반복 신청이 가능하므로, 신용 상태가 좋아지는 시점마다 챙기는 것이 이득입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>승진·이직 직후 신청:</strong> 소득 증가가 뚜렷할 때 성공률이 높습니다.</li>
                  <li><strong>증빙 최신화:</strong> 최근 소득 자료를 갖춰야 심사에 유리합니다.</li>
                  <li><strong>거절 후 방치 금지:</strong> 사유를 보고 보완해 재신청하세요.</li>
                  <li><strong>대환과 비교:</strong> 인하 폭이 작으면 대출 갈아타기(대환)와 비교해 유리한 쪽을 선택합니다.</li>
                </ul>
                <p className="mt-4">
                  다만 금리인하요구권과 대환대출은 상황에 따라 유불리가 다릅니다. 중도상환수수료·한도 변화까지 함께 따져 판단하는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/credit-score-loan-interest-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용점수와 대출금리</div>
                    <p className="mt-1 text-sm text-text-secondary">신용점수가 금리에 어떻게 반영되는지 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/mortgage-refinance-savings-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주담대 갈아타기 절감액</div>
                    <p className="mt-1 text-sm text-text-secondary">대환으로 줄일 수 있는 이자를 비교해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/prepayment-penalty-fee-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중도상환수수료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">갈아타기 판단 시 반드시 확인할 비용.</p>
                  </Link>
                  <Link
                    href="/guide/dsr-dti-ltv-difference-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">DSR·DTI·LTV 차이</div>
                    <p className="mt-1 text-sm text-text-secondary">대출 한도 규제 지표를 한눈에 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">금리 인하 시 월 상환액 변화를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예금·적금·환율 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 특정 금융상품의 투자·가입을 권유하지 않습니다. 금리 인하 폭·수용 여부는 금융회사의 심사와 상품별 금리 체계에 따라 달라지며, 신청 요건·서류는 회사마다 다를 수 있습니다. 실제 신청은 거래 금융회사 안내와 최신 규정을 확인하세요. 본 콘텐츠는 2026-08-08 기준이며, 인용 법조항은 <strong>은행법 §30의2(금리인하 요구), 상호저축은행법·여신전문금융업법의 동일 취지 규정</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원</a>.
                </p>
              </section>

              <ShareButtons
                title="금리인하요구권 2026 신청 방법 가이드"
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
