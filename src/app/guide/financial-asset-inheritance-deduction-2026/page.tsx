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

const URL = 'https://calculatorhost.com/guide/financial-asset-inheritance-deduction-2026/';
const DATE_PUBLISHED = '2026-08-18';
const DATE_MODIFIED = '2026-08-18';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '금융재산 상속공제 2026, 예금 주식 최대 2억 공제',
  description:
    '상속재산 중 예금·주식 같은 순금융재산이 있으면 상속세에서 최대 2억원까지 공제합니다(상증법 §22). 2천만원 이하 전액, 1억 초과 시 20%, 10억 초과 시 2억 한도 등 구간별 계산과 제외 대상을 사례로 정리했습니다.',
  keywords: [
    '금융재산 상속공제',
    '순금융재산',
    '상속세 공제',
    '금융재산 상속공제 한도',
    '예금 상속세',
    '상속세 절세',
    '상증법 22조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '금융재산 상속공제 2026, 예금 주식 최대 2억 공제' }],
    title: '금융재산 상속공제 2026, 순금융재산 최대 2억 공제',
    description: '예금·주식 등 순금융재산에 대해 구간별로 상속세를 공제. 2천만~2억원 구간표와 제외 대상 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '금융재산 상속공제 2026, 최대 2억',
    description: '순금융재산 구간별 상속세 공제(2천만~2억). 최대주주 주식·차명계좌 제외. 상증법 §22.',
  },
};

const FAQ_ITEMS = [
  {
    question: '금융재산 상속공제가 무엇인가요?',
    answer:
      '상속재산에 예금·주식 같은 금융재산이 있으면 그 순금융재산 가액의 일정 부분을 상속세 과세가액에서 빼주는 공제입니다(상증법 §22). 부동산과 달리 금융재산은 가치가 그대로 드러나 상대적으로 무겁게 과세되는 점을 완화하려는 취지입니다.',
  },
  {
    question: '금융재산 상속공제는 얼마까지 받나요?',
    answer:
      '순금융재산이 2천만원 이하면 전액, 2천만원 초과 1억원 이하면 2천만원, 1억원 초과 10억원 이하면 순금융재산의 20%, 10억원을 초과하면 2억원을 공제합니다. 즉 공제 한도는 2억원입니다.',
  },
  {
    question: '어떤 재산이 금융재산에 포함되나요?',
    answer:
      '예금, 적금, 부금, 출자금, 금전신탁, 보험금, 공제금, 주식, 채권, 수익증권, 어음 등 금융회사가 취급하는 금전과 유가증권이 포함됩니다. 여기서 금융채무(피상속인의 대출 등)를 빼면 순금융재산이 됩니다.',
  },
  {
    question: '순금융재산은 어떻게 계산하나요?',
    answer:
      '순금융재산은 금융재산 가액에서 금융채무를 뺀 금액입니다. 예로 예금·주식이 6억원, 피상속인의 대출이 1억원이면 순금융재산은 5억원이 되고, 이 5억원의 20%인 1억원을 공제받습니다.',
  },
  {
    question: '주식도 금융재산 상속공제를 받나요?',
    answer:
      '일반적인 상장주식·펀드 등은 금융재산으로 인정되어 공제 대상입니다. 다만 최대주주 또는 최대출자자가 보유한 주식은 제외됩니다. 경영권과 결부된 지분은 별도 평가·과세 체계를 적용하기 때문입니다.',
  },
  {
    question: '차명 계좌나 신고 안 한 금융재산도 공제되나요?',
    answer:
      '상속세 신고기한까지 신고하지 않은 타인 명의(차명)의 금융재산은 공제 대상에서 제외됩니다. 숨긴 재산에 혜택을 주지 않겠다는 취지이므로, 정확히 신고한 금융재산에 대해서만 공제가 적용됩니다.',
  },
  {
    question: '부동산에는 왜 금융재산 상속공제가 없나요?',
    answer:
      '부동산은 공시가격 등으로 시가보다 낮게 평가되는 경우가 많아 이미 과세상 유리한 면이 있는 반면, 예금은 액면 그대로 평가되어 상대적으로 불리합니다. 금융재산 상속공제는 이 불균형을 완화하기 위한 장치라 부동산에는 적용되지 않습니다.',
  },
  {
    question: '금융재산 상속공제는 다른 상속공제와 함께 받나요?',
    answer:
      '네, 기초공제·배우자공제·일괄공제 등과 별개로 추가 적용됩니다. 다만 전체 상속세는 여러 공제와 재산 구성이 얽혀 결정되므로, 정확한 세액은 홈택스 모의계산이나 세무 전문가를 통해 확인하는 것이 안전합니다.',
  },
];

export default function FinancialAssetInheritanceDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '금융재산 상속공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '금융재산 상속공제 2026, 예금 주식 최대 2억 공제',
    description:
      '순금융재산에 대해 구간별로 상속세를 공제(상증법 §22). 2천만원 이하 전액, 1억 초과 20%, 10억 초과 2억 한도. 순금융재산 계산과 제외 대상을 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['금융재산 상속공제', '순금융재산', '상속세', '공제 한도', '상증법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '금융재산 상속공제 2026',
    description: '순금융재산 구간별 상속세 공제 계산법과 제외 대상, 부동산과의 차이 정리.',
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
                    { name: '금융재산 상속공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인·자산 보유자 · 8분 읽기 · 2026-08-18</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  금융재산 상속공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 예금 주식 최대 2억 공제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 예금·주식 등 금융재산을 상속받는 상속인을 위해 금융재산 상속공제를 정리한 가이드입니다. 순금융재산이 얼마일 때 얼마를 공제받는지, 어떤 재산이 포함되고 무엇이 제외되는지, 부동산과는 왜 다른지까지 실제 금액으로 확인하실 수 있습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융재산 상속공제가 무엇인가요?</h2>
                <p>
                  금융재산 상속공제는 상속재산 중 예금·주식 같은 순금융재산이 있을 때 그 일부를 상속세 과세가액에서 빼주는 제도입니다(상증법 §22). 예금은 액면 그대로 평가되어 부동산보다 무겁게 과세되기 쉬운데, 이 불균형을 완화하려는 장치입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">순금융재산의 정의</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    순금융재산 = 금융재산(예금·주식·채권·보험금 등) − 금융채무(피상속인의 대출 등)
                    <br />
                    이 순금융재산을 기준으로 구간별 공제율을 적용합니다.
                    <br />
                    근거: 상속세 및 증여세법 §22(금융재산 상속공제)
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융재산 상속공제는 얼마까지 받나요?</h2>
                <p>
                  순금융재산 규모에 따라 구간별로 공제액이 정해지며, 최대 한도는 2억원입니다. 아래 표가 공제 구조입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 순금융재산별 상속공제액 (상증법 §22)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">순금융재산</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2천만원 이하</td>
                        <td className="p-3"><strong>전액</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2천만원 초과 ~ 1억원 이하</td>
                        <td className="p-3"><strong>2천만원</strong> (정액)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억원 초과 ~ 10억원 이하</td>
                        <td className="p-3">순금융재산 × <strong>20%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10억원 초과</td>
                        <td className="p-3"><strong>2억원</strong> (한도)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  2천만원 초과 1억원 이하 구간에서 공제액을 2천만원으로 정액 고정한 이유는, 20%로 계산하면 오히려 2천만원보다 적어지는 구간이 생기기 때문입니다. 소액 금융재산 상속인을 보호하려는 설계입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 순금융재산별 공제 계산 사례</h2>
                <p>
                  구간별로 어떻게 적용되는지 네 가지 사례로 확인해보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 순금융재산 1,500만원 (2천만원 이하)</p>
                  <p className="text-sm text-text-secondary">
                    · 공제액: 전액 <strong>1,500만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 순금융재산 8,000만원 (2천만~1억 구간)</p>
                  <p className="text-sm text-text-secondary">
                    · 정액 공제 <strong>2,000만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">20%로 계산하면 1,600만원이지만, 정액 2,000만원이 더 크므로 2,000만원 적용.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 순금융재산 5억원 (1억~10억 구간)</p>
                  <p className="text-sm text-text-secondary">
                    · 공제액: 5억원 × 20% = <strong>1억원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 4. 순금융재산 12억원 (10억 초과, 한도)</p>
                  <p className="text-sm text-text-secondary">
                    · 계산액: 12억원 × 20% = 2억 4천만원
                    <br />
                    · 한도 2억원 적용 → <strong>2억원 공제</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">계산액이 한도를 넘어도 실제 공제는 2억원까지입니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 재산이 금융재산에 포함되나요?</h2>
                <p>
                  금융회사가 취급하는 금전과 유가증권이 폭넓게 포함됩니다. 다만 일부는 제외되므로 구분이 필요합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 금융재산 상속공제 포함과 제외</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">포함</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">제외</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">예금·적금·부금·출자금</td>
                        <td className="p-3">최대주주·최대출자자 보유 주식</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">금전신탁·보험금·공제금</td>
                        <td className="p-3">신고기한까지 미신고한 차명 금융재산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상장주식·채권·수익증권·어음</td>
                        <td className="p-3">부동산·현금(장롱 현금) 등 비금융재산</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 경영권과 결부된 최대주주 지분과 숨긴 차명 재산은 제외되므로, 정확히 신고한 일반 금융재산에 대해서만 공제가 적용된다는 점을 기억하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">부동산에는 왜 금융재산 상속공제가 없나요?</h2>
                <p>
                  부동산은 공시가격 등으로 시가보다 낮게 평가되는 경우가 많아 이미 과세상 유리한 면이 있습니다. 반면 예금은 액면 그대로 평가되어 상대적으로 불리합니다. 금융재산 상속공제는 이 평가 불균형을 완화하기 위한 장치라 부동산에는 적용되지 않습니다.
                </p>
                <p className="mt-4">
                  따라서 상속재산의 구성에 따라 실효 세부담이 달라집니다. 다만 재산 구성을 인위적으로 바꾸는 것은 신중해야 하며, 개별 상황의 유불리는 전문가 상담을 통해 판단하는 것이 안전합니다. 본 가이드는 특정 절세 방법을 권유하지 않습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/guide/inheritance-tax-calculation-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·세율·누진공제로 상속세를 계산하는 법.</p>
                  </Link>
                  <Link href="/guide/inheritance-tax-deduction-limit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상속공제 종류와 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">기초·일괄·배우자공제 등 전체 공제 지도.</p>
                  </Link>
                  <Link href="/guide/spouse-inheritance-deduction-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">배우자 상속공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">최소 5억, 최대 30억까지 공제되는 구조.</p>
                  </Link>
                  <Link href="/guide/inheritance-vs-gift-tax-comparison-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상속세 vs 증여세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">언제 상속이, 언제 증여가 유리한지.</p>
                  </Link>
                  <Link href="/guide/inheritance-tax-filing-payment-installment-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상속세 신고·분납·연부연납</div>
                    <p className="mt-1 text-sm text-text-secondary">6개월 신고기한과 나눠 내는 방법.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속세·증여세·양도세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 금융재산의 범위, 순금융재산 산정, 최대주주 주식·차명재산 제외 여부는 개별 상속 상황에 따라 달라지므로 홈택스 모의계산이나 세무 전문가에게 확인하세요. 본 콘텐츠는 2026-08-18 기준으로 작성되었으며, 인용 법조항은 <strong>상속세 및 증여세법 §22(금융재산 상속공제)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="금융재산 상속공제 2026 가이드"
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
