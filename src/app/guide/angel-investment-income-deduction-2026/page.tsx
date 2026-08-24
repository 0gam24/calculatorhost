// [revenue-lever: indexing+traffic] 엔젤투자(벤처투자조합 출자) 소득공제 조특법 §16 (투자자 절세 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/angel-investment-income-deduction-2026/';
const DATE_PUBLISHED = '2026-08-25';
const DATE_MODIFIED = '2026-08-25';

export const metadata: Metadata = {
  title: '엔젤투자 소득공제 2026, 3천만원까지 100% 공제',
  description:
    '벤처기업·개인투자조합에 투자하면 종합소득금액에서 공제받는 엔젤투자 소득공제. 3천만원 이하 100%, 5천만원 이하 70%, 초과분 30% 공제율과 종합소득금액 50% 한도, 3년 유지 요건까지 조세특례제한법 §16 기준으로 정리합니다.',
  keywords: [
    '엔젤투자 소득공제',
    '벤처투자조합 소득공제',
    '개인투자조합',
    '벤처기업 투자',
    '엔젤투자 절세',
    '소득공제 한도',
    '조세특례제한법 16조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '엔젤투자 소득공제 2026, 3천만원까지 100% 공제' }],
    title: '엔젤투자 소득공제 2026, 공제율과 한도 총정리',
    description: '3천만원 이하 100%, 5천만원 이하 70%, 초과 30%. 종합소득금액 50% 한도와 3년 유지 요건을 조세특례제한법 §16 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '엔젤투자 소득공제 2026, 공제율·한도 정리',
    description: '3천만원 100%, 5천만원 70%, 초과 30%. 종합소득금액 50% 한도. 조특법 §16.',
  },
};

const FAQ_ITEMS = [
  {
    question: '엔젤투자 소득공제가 정확히 무엇인가요?',
    answer:
      '개인이 벤처기업이나 개인투자조합 등에 투자한 금액을 종합소득금액에서 빼 주는 소득공제 제도입니다(조세특례제한법 §16, 정식 명칭은 벤처투자조합 출자 등에 대한 소득공제). 세액공제가 아니라 소득공제이므로, 투자금이 클수록 과세표준이 크게 줄어 고소득자에게 절세 효과가 큽니다.',
  },
  {
    question: '공제율은 어떻게 되나요?',
    answer:
      '투자금액 구간별로 다릅니다(조세특례제한법 §16). 3,000만원 이하는 100%, 3,000만원 초과 5,000만원 이하는 70%, 5,000만원 초과분은 30%를 소득공제합니다. 예를 들어 4,000만원을 투자하면 3,000만원의 100%와 1,000만원의 70%를 더해 3,700만원을 공제합니다.',
  },
  {
    question: '공제에 한도가 있나요?',
    answer:
      '네, 해당 과세연도 종합소득금액의 50%가 한도입니다(조세특례제한법 §16). 예를 들어 종합소득금액이 6,000만원이면 공제 한도는 3,000만원입니다. 투자 산식으로 계산한 공제액이 이보다 크면 한도까지만 공제되고, 남는 부분은 그해 공제받지 못합니다.',
  },
  {
    question: '투자 후 바로 팔아도 공제가 유지되나요?',
    answer:
      '아닙니다. 공제를 받은 뒤 일정 기간(원칙적으로 3년) 안에 출자 지분이나 주식을 양도·회수하면 이미 받은 공제가 추징될 수 있습니다. 절세를 목적으로 한다면 최소 3년 이상 보유를 전제로 투자 계획을 세워야 하며, 정확한 사후관리 기간은 투자 유형별로 다를 수 있으니 확인이 필요합니다.',
  },
  {
    question: '어떤 곳에 투자해야 공제 대상이 되나요?',
    answer:
      '벤처기업 직접투자, 개인투자조합·벤처투자조합 출자, 창업 후 일정 기간 이내의 벤처투자 대상 기업 등이 대상입니다(조세특례제한법 §16). 다만 대상 기업 요건(벤처기업 확인, 창업 경과기간 등)과 투자 방식 요건이 세부적으로 정해져 있으므로, 투자 전에 해당 투자가 공제 대상인지 반드시 확인해야 합니다.',
  },
  {
    question: '근로소득자도 받을 수 있나요?',
    answer:
      '받을 수 있습니다. 근로소득자는 연말정산 때 벤처기업 투자 관련 서류를 제출해 공제받고, 종합소득이 있는 사람은 5월 종합소득세 신고 때 반영합니다. 다만 본인이 근무하는 회사에 대한 투자 등 일부는 제외될 수 있으므로 대상 여부를 먼저 확인하세요.',
  },
  {
    question: '엔젤투자 소득공제는 위험이 없는 절세인가요?',
    answer:
      '절세 효과와 투자 위험은 별개입니다. 벤처기업·초기기업 투자는 원금 손실 가능성이 있는 고위험 영역이며, 소득공제는 세금을 줄여 줄 뿐 투자 손실을 보전해 주지 않습니다. 공제만 보고 투자하기보다 기업의 사업성과 회수 가능성을 먼저 검토해야 합니다.',
  },
  {
    question: '공제 한도를 넘긴 투자금은 어떻게 되나요?',
    answer:
      '종합소득금액 50% 한도를 초과한 공제액은 그해에는 공제받지 못합니다. 투자금을 한 해에 몰아넣기보다 소득 규모와 한도를 고려해 투자 시점을 배분하면 공제를 더 온전히 활용할 수 있습니다. 구체적 이월 가능 여부는 관련 규정과 국세청 안내로 확인하세요.',
  },
];

export default function AngelInvestmentIncomeDeductionPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '엔젤투자 소득공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '엔젤투자 소득공제 2026, 공제율과 한도 총정리',
    description:
      '벤처기업·개인투자조합 투자에 대한 엔젤투자 소득공제. 3천만원 100%, 5천만원 70%, 초과 30% 공제율과 종합소득금액 50% 한도, 3년 유지 요건을 조세특례제한법 §16 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['엔젤투자', '소득공제', '벤처투자조합', '개인투자조합', '벤처기업'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '엔젤투자 소득공제 2026',
    description:
      '벤처기업·개인투자조합 투자에 대한 소득공제의 공제율, 한도, 유지 요건을 조세특례제한법 §16 기준으로 정리한 가이드.',
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
                    { name: '엔젤투자 소득공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">투자자 · 절세 · 8분 읽기 · 2026-08-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  엔젤투자 소득공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 3천만원까지 100% 공제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  고소득자가 세금을 줄이는 방법을 찾다 보면 엔젤투자 소득공제라는 제도를 만나게 됩니다. 벤처기업이나 개인투자조합에 투자한 금액을 소득에서 통째로 빼 주는데, 3천만원까지는 100% 공제라 절세 효과가 상당합니다. 이 가이드는 투자자를 위해 공제율 구조, 종합소득금액 50% 한도, 그리고 서둘러 팔면 공제가 추징되는 3년 유지 요건을 조세특례제한법 §16 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">엔젤투자 소득공제란 무엇인가요?</h2>
                <p>
                  엔젤투자 소득공제는 개인이 벤처기업 등에 투자한 금액을 종합소득금액에서 공제해 주는 제도입니다(조세특례제한법 §16, 정식 명칭은 벤처투자조합 출자 등에 대한 소득공제). 세액에서 직접 빼는 세액공제가 아니라 과세표준을 낮추는 소득공제라는 점이 핵심입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정의: 엔젤투자 소득공제 (조세특례제한법 §16)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    벤처기업·개인투자조합 등에 투자한 금액을 종합소득금액에서 공제. 핵심 수치: 3천만원 이하 100% 공제, 종합소득금액 50% 한도.
                  </p>
                </div>
                <p>
                  소득공제이므로 절세액은 본인의 한계세율에 비례합니다. 같은 3천만원을 공제받아도 세율 15% 구간과 42% 구간의 절세액은 크게 차이가 납니다. 그래서 소득이 높은 사람일수록 활용도가 높은 제도입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제율은 얼마이고 한도는 어떻게 되나요?</h2>
                <p>
                  공제율은 투자금액 구간에 따라 100%, 70%, 30%로 나뉘고, 전체 공제액은 종합소득금액의 50%를 넘을 수 없습니다(조세특례제한법 §16).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 엔젤투자 소득공제 공제율 (조세특례제한법 §16)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">투자금액 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3,000만원 이하</td>
                        <td className="p-3"><strong>100%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3,000만원 초과 5,000만원 이하</td>
                        <td className="p-3"><strong>70%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5,000만원 초과분</td>
                        <td className="p-3"><strong>30%</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만, 산식으로 계산한 공제액이 종합소득금액의 50%를 초과하면 그 한도까지만 공제됩니다. 즉 공제율만큼 늘 다 받는 것이 아니라 본인 소득 크기가 또 하나의 상한이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제로 얼마나 공제되나요?</h2>
                <p>
                  두 가지 사례로 공제 산식과 한도가 어떻게 작동하는지 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 종합소득금액 8,000만원, 4,000만원 투자</p>
                  <p className="text-sm text-text-secondary">
                    · 공제액 = 3,000만 × 100% + 1,000만 × 70% = 3,000만 + 700만 = <strong>3,700만원</strong>
                    <br />
                    · 한도 = 8,000만 × 50% = 4,000만원 (한도 이내)
                    <br />
                    · 최종 공제액 = <strong>3,700만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">한계세율 24% 가정 시 절세액은 3,700만 × 24% × 1.1 = 약 977만원(지방소득세 포함, 예시).</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 종합소득금액 3,000만원, 6,000만원 투자 (한도가 막는 경우)</p>
                  <p className="text-sm text-text-secondary">
                    · 산식 공제액 = 3,000만 × 100% + 2,000만 × 70% + 1,000만 × 30% = 3,000 + 1,400 + 300 = 4,700만원
                    <br />
                    · 한도 = 3,000만 × 50% = 1,500만원
                    <br />
                    · 최종 공제액 = <strong>1,500만원</strong> (한도로 제한)
                    <br />
                    <span className="text-xs text-text-tertiary">소득 대비 과도하게 큰 투자는 한도에 걸려 공제를 다 못 받을 수 있습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  위 절세액은 이해를 돕기 위한 예시이며, 실제 세액은 다른 공제와 세율 구간에 따라 달라집니다. 정확한 계산은 홈택스 또는 세무 전문가의 도움을 받으세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">투자 후 3년 안에 팔면 어떻게 되나요?</h2>
                <p>
                  공제를 받은 뒤 원칙적으로 3년 이내에 지분이나 주식을 양도·회수하면 이미 받은 소득공제가 추징될 수 있습니다(조세특례제한법 §16). 절세만 노리고 단기 회수를 계획하면 공제가 사후에 취소되어 오히려 가산세까지 낼 수 있습니다.
                </p>
                <p>
                  따라서 이 제도는 최소 3년 이상 자금을 묶어 둘 수 있는 여윳돈으로 접근해야 합니다. 벤처투자는 회수까지 수년이 걸리는 것이 보통이므로, 유동성이 필요한 자금으로는 적합하지 않습니다.
                </p>
                <p>
                  다만, 사후관리 기간과 추징 요건은 투자 유형(직접투자, 조합 출자 등)에 따라 세부 규정이 다를 수 있으므로, 투자 전 대상 상품의 약관과 조세특례제한법 규정을 함께 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">공제만 보고 투자해도 될까요?</h2>
                <p>
                  절세와 투자 위험은 분리해서 봐야 합니다. 벤처기업·초기기업 투자는 원금 손실 가능성이 큰 고위험 영역입니다. 소득공제는 세금을 줄여 줄 뿐 손실을 보전하지 않습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>공제 효과보다 투자 원금 손실 위험이 더 클 수 있습니다.</li>
                  <li>3년 이상 회수가 어려운 자금 성격을 고려해야 합니다.</li>
                  <li>대상 기업의 사업성·회수 구조를 먼저 검토하는 것이 순서입니다.</li>
                </ul>
                <p>
                  예외: 소액을 분산해 여러 대상에 투자하면 개별 위험을 낮출 수 있으나, 그렇다고 손실 가능성이 사라지는 것은 아닙니다. 본 가이드는 특정 상품의 투자를 권하지 않으며, 투자 판단과 책임은 본인에게 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/guide/venture-stock-option-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">벤처기업 스톡옵션 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">벤처 투자·보상의 또 다른 세제 혜택을 확인하세요.</p>
                  </Link>
                  <Link href="/guide/startup-fund-gift-tax-special-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">창업자금 증여세 특례</div>
                    <p className="mt-1 text-sm text-text-secondary">창업 지원을 위한 증여세 과세특례 제도.</p>
                  </Link>
                  <Link href="/guide/isa-account-tax-benefit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">ISA 계좌 절세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">투자자를 위한 대표 절세 계좌를 함께 활용하세요.</p>
                  </Link>
                  <Link href="/guide/domestic-stock-major-shareholder-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">국내주식 대주주 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">주식 투자 시 양도세 과세 기준을 확인하세요.</p>
                  </Link>
                  <Link href="/guide/pension-savings-irp-tax-credit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">위험이 낮은 대표 절세 수단과 비교해 보세요.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">투자·소득 관련 절세 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·투자 조언이 아닙니다. 공제 대상 여부, 공제율, 한도, 사후관리(3년) 요건은 투자 유형과 대상 기업 요건에 따라 달라지므로 투자 전 조세특례제한법 규정과 국세청·중소벤처기업부 안내로 확인하세요. 벤처투자는 원금 손실 가능성이 있는 고위험 투자이며 본 콘텐츠는 특정 투자를 권유하지 않습니다. 본 콘텐츠는 2026-08-25 기준이며 관련 법령 개정 시 업데이트됩니다. 근거 법조항은 <strong>조세특례제한법 §16(벤처투자조합 출자 등에 대한 소득공제)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="엔젤투자 소득공제 2026 가이드"
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
