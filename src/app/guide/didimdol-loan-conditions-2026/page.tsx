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

const URL = 'https://calculatorhost.com/guide/didimdol-loan-conditions-2026/';
const DATE_PUBLISHED = '2026-07-31';
const DATE_MODIFIED = '2026-07-31';

export const metadata: Metadata = {
  title: '디딤돌대출 2026, 소득·한도·금리 조건 총정리',
  description:
    '디딤돌대출은 부부합산 연소득 6천만원 이하 무주택 세대주를 위한 정부 지원 주택담보대출입니다. 소득 요건, 대출 한도, 금리 수준, 대상 주택과 신청 방법을 주택도시기금 기준으로 정리했습니다.',
  keywords: [
    '디딤돌대출',
    '디딤돌대출 조건',
    '디딤돌대출 한도',
    '디딤돌대출 금리',
    '무주택 세대주 대출',
    '기금e든든',
    '주택도시기금법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '디딤돌대출 2026, 소득·한도·금리 조건 총정리' }],
    title: '디딤돌대출 2026, 내 조건이면 얼마까지 받을까',
    description: '부부합산 연소득 6천만원 이하 무주택 세대주 대상. 소득·한도·금리·대상 주택 총정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '디딤돌대출 2026, 소득·한도·금리 조건 총정리',
    description: '무주택 실수요자 정부 지원 주담대. 소득 요건·한도·금리 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '디딤돌대출은 어떤 대출인가요?',
    answer:
      '디딤돌대출은 무주택 실수요자의 내 집 마련을 돕기 위해 정부가 주택도시기금 재원으로 지원하는 주택담보대출입니다(주택도시기금법). 시중은행 주택담보대출보다 금리가 낮고 장기 고정 또는 저리 조건으로 운용됩니다. 소득과 주택가격에 상한이 있어 실수요자 중심으로 공급됩니다.',
  },
  {
    question: '소득 조건은 얼마까지인가요?',
    answer:
      '일반적으로 부부합산 연소득 6천만원 이하 무주택 세대주가 대상입니다. 생애최초 구입자나 2자녀 이상 가구는 7천만원 이하, 신혼부부는 8천5백만원 이하까지 완화됩니다. 세대주 본인과 세대원 전원이 무주택이어야 하며, 소득 기준은 정책에 따라 조정될 수 있으니 신청 전 기금e든든에서 확인하세요.',
  },
  {
    question: '얼마까지 빌릴 수 있나요?',
    answer:
      '일반 구입은 최대 2억 5천만원 수준이며, 생애최초는 3억원, 신혼부부나 2자녀 이상 가구는 4억원까지 확대됩니다. 다만 실제 대출액은 주택담보인정비율(LTV)과 총부채상환비율 등 규제 한도, 담보 주택가격에 따라 제한됩니다. 한도는 정책 변경으로 달라질 수 있습니다.',
  },
  {
    question: '금리는 어느 정도인가요?',
    answer:
      '디딤돌대출 금리는 소득 구간과 대출 만기에 따라 차등 적용되며, 대체로 시중 주택담보대출보다 낮은 연 2%대에서 4%대 사이에서 결정됩니다. 생애최초, 신혼, 다자녀 등에는 우대금리가 추가로 적용될 수 있습니다. 금리는 시장 상황에 따라 수시로 조정되므로 신청 시점 기준을 반드시 확인하세요.',
  },
  {
    question: '어떤 집이 대상 주택인가요?',
    answer:
      '주거 전용면적 85㎡ 이하(수도권 외 읍·면은 100㎡ 이하)이면서 주택가격이 일정 금액 이하인 주택이 대상입니다. 일반적으로 주택가격 5억원 이하, 신혼·2자녀 이상은 6억원 이하 기준이 적용됩니다. 대상 주택 기준도 정책에 따라 조정되므로 최신 기준을 확인해야 합니다.',
  },
  {
    question: '어떻게 신청하나요?',
    answer:
      '주택도시기금 포털인 기금e든든(enhuf.molit.go.kr)에서 온라인으로 신청하거나, 기금 수탁은행(국민·농협·신한·우리·하나)의 영업점에서 신청할 수 있습니다. 매매계약 후 잔금 지급일 등 정해진 기한 내에 신청해야 하므로, 계약 전에 자격과 한도를 미리 조회하는 것이 안전합니다.',
  },
  {
    question: '보금자리론이나 일반 주담대와 무엇이 다른가요?',
    answer:
      '디딤돌대출은 소득·주택가격 상한이 있는 무주택 실수요자 전용이라 대상이 좁지만 금리가 낮습니다. 보금자리론은 소득 기준이 상대적으로 넓고 주택가격 한도가 높아 대상이 더 넓습니다. 일반 시중은행 주담대는 자격 제한이 적은 대신 금리가 높은 편입니다. 자격이 되면 디딤돌대출이 이자 부담 측면에서 유리한 경우가 많습니다.',
  },
];

export default function DidimdolLoanConditions2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '디딤돌대출 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '디딤돌대출 2026, 소득·한도·금리 조건 총정리',
    description:
      '무주택 실수요자를 위한 정부 지원 주택담보대출 디딤돌대출. 소득 요건, 대출 한도, 금리 수준, 대상 주택, 신청 방법과 보금자리론 비교까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['디딤돌대출', '소득 요건', '대출 한도', '금리', '무주택 세대주'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '디딤돌대출 2026',
    description:
      '무주택 실수요자를 위한 디딤돌대출의 소득 요건, 대출 한도, 금리, 대상 주택과 신청 방법.',
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
                    { name: '디딤돌대출 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">무주택 실수요자 · 8분 읽기 · 2026-07-31</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  디딤돌대출 2026
                  <br />
                  <span className="text-2xl text-text-secondary">소득·한도·금리 조건 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 처음 내 집을 마련하려는 무주택 실수요자를 위한 것입니다. 디딤돌대출은 정부가 주택도시기금으로 지원하는 저리 주택담보대출로, 소득과 주택가격에 상한이 있습니다. 내가 자격이 되는지, 얼마까지 어떤 금리로 받을 수 있는지, 어떻게 신청하는지 순서대로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-didimdol-loan-conditions-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">디딤돌대출이란 무엇인가요?</h2>
                <p>
                  디딤돌대출은 무주택 실수요자의 내 집 마련을 돕기 위해 정부가 주택도시기금 재원으로 공급하는 주택담보대출입니다(주택도시기금법). 시중은행 주택담보대출보다 금리가 낮고, 소득과 주택가격 상한을 두어 실수요자 중심으로 운용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">디딤돌대출 한눈에 보기</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 무주택 세대주(세대원 전원 무주택)
                    <br />
                    · 소득: 부부합산 연 6천만원 이하(우대 시 완화)
                    <br />
                    · 한도: 일반 최대 2.5억원(유형별 확대)
                    <br />
                    · 신청: 기금e든든 또는 수탁은행
                  </p>
                </div>
                <p className="mt-4">
                  다만 소득·한도·금리·대상 주택 기준은 부동산 정책 방향에 따라 자주 조정됩니다. 아래 수치는 이해를 돕기 위한 기준 예시이며, 실제 신청 전에는 반드시 기금e든든에서 그 시점의 정확한 조건을 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득 조건은 얼마까지인가요?</h2>
                <p>
                  기본은 부부합산 연소득 6천만원 이하이며, 가구 유형에 따라 한도가 완화됩니다. 세대주 본인과 세대원 전원이 무주택이어야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 디딤돌대출 소득 요건 (기준 예시, 부부합산)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가구 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연소득 상한(예시)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반 무주택 세대주</td>
                        <td className="p-3"><strong>6천만원 이하</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">생애최초 구입, 2자녀 이상</td>
                        <td className="p-3"><strong>7천만원 이하</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신혼부부</td>
                        <td className="p-3"><strong>8천5백만원 이하</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 소득 상한은 정책에 따라 바뀌고, 신혼부부·다자녀 완화 폭도 조정될 수 있습니다. 경계선 소득이라면 신청 직전 기금e든든의 최신 기준으로 다시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마까지 빌릴 수 있나요?</h2>
                <p>
                  대출 한도는 가구 유형에 따라 다르며, 담보 주택가격과 LTV 규제 한도 안에서 결정됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 디딤돌대출 한도 (기준 예시)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최대 한도(예시)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반</td>
                        <td className="p-3"><strong>2억 5천만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">생애최초</td>
                        <td className="p-3"><strong>3억원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신혼부부, 2자녀 이상</td>
                        <td className="p-3"><strong>4억원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 표의 한도는 상한일 뿐, 실제 대출액은 주택가격에 LTV를 곱한 금액과 상환능력 심사로 더 낮아질 수 있습니다. 표시 한도만 보고 자금 계획을 세우면 잔금이 부족해질 수 있으니 유의하세요.
                </p>
              </section>

              <AdSlot slot="guide-didimdol-loan-conditions-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">월 상환액은 얼마나 되나요?</h2>
                <p>
                  원리금균등 상환 방식에서는 매달 같은 금액을 갚습니다. 월 상환액은 대출 원금, 금리, 만기로 정해집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례. 2억원, 연 3.0%, 30년 만기</p>
                  <p className="text-sm text-text-secondary">
                    · 원금 2억원, 월이자율 3.0% ÷ 12 = 0.25%, 개월 수 360
                    <br />
                    · 원리금균등 공식 적용 시 월 상환액 약 <strong>84만원</strong>
                    <br />
                    · 총 상환액 약 3억 350만원(이자 약 1억 350만원)
                    <br />
                    <span className="text-xs text-text-tertiary">금리가 1%p 오르면 월 상환액과 총 이자가 크게 늘어납니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  주의: 위 금액은 이해를 돕기 위한 예시입니다. 실제 금리는 소득·만기·우대 조건으로 달라지므로, 대출이자 계산기로 본인 조건을 넣어 월 상환액을 직접 확인하는 것이 정확합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">원리금균등 월 상환액을 바로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/loan-limit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출한도(DSR) 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득 대비 가능한 대출 한도를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/newborn-special-mortgage-loan-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신생아 특례 대출</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 가구 대상 저리 주택담보대출.</p>
                  </Link>
                  <Link
                    href="/guide/ltv-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">LTV 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">담보인정비율로 가능 대출액을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/mortgage-fixed-vs-variable-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">고정금리 vs 변동금리</div>
                    <p className="mt-1 text-sm text-text-secondary">주택담보대출 금리 유형 선택 기준.</p>
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
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 금융 조언이 아닙니다. 디딤돌대출의 소득 요건, 대출 한도, 금리, 대상 주택 기준은 부동산 정책과 시장 상황에 따라 수시로 변경됩니다. 본문의 수치는 기준 예시이며, 실제 신청 전 기금e든든과 수탁은행에서 그 시점의 정확한 조건을 반드시 확인하세요. 본 콘텐츠는 2026-07-31 기준이며 근거는 <strong>주택도시기금법 및 국토교통부·주택도시기금 고시</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://enhuf.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기금e든든(주택도시기금)</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="디딤돌대출 2026 가이드"
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
