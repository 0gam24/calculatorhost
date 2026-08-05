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

const URL = 'https://calculatorhost.com/guide/dividend-separate-taxation-value-up-2026/';
const DATE_PUBLISHED = '2026-08-06';
const DATE_MODIFIED = '2026-08-06';

export const metadata: Metadata = {
  title: '고배당기업 배당소득 분리과세 2026, 신청·유불리 총정리',
  description:
    '2026년 지급 배당부터 고배당기업 배당소득 분리과세(14~30% 저율)가 도입됐습니다. 종합과세와의 차이, 누구에게 유리한지, 신청서 제출 방법과 밸류업 고배당기업 확인법을 정리했습니다.',
  keywords: [
    '배당소득 분리과세',
    '고배당기업 분리과세',
    '밸류업 배당',
    '배당 분리과세 신청',
    '금융소득 종합과세',
    '배당소득세 절세',
    '조세특례제한법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '고배당기업 배당소득 분리과세 2026' }],
    title: '고배당기업 배당소득 분리과세 2026, 신청·유불리 총정리',
    description: '2026년 지급 배당부터 14~30% 저율 분리과세 도입. 종합과세와 비교, 유불리 판단, 신청 절차까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '고배당기업 배당소득 분리과세 2026',
    description: '14~30% 저율 분리과세 신청주의. 고소득 배당 투자자의 종합과세 부담을 낮추는 제도.',
  },
};

const FAQ_ITEMS = [
  {
    question: '고배당기업 배당소득 분리과세가 무엇인가요?',
    answer:
      '정부 밸류업 정책에 따라 주주환원을 적극 실천하는 고배당기업의 배당소득을 다른 소득과 합산하지 않고 낮은 단일세율(14~30%)로 따로 과세하는 제도입니다. 2026년 1월 1일 이후 지급받은 배당소득부터 적용되며, 종합과세(6~45%)보다 세부담을 낮출 수 있습니다.',
  },
  {
    question: '세율은 얼마인가요?',
    answer:
      '배당금액 구간에 따라 14%에서 30% 사이의 저율이 적용됩니다(지방소득세 별도). 낮은 구간은 일반 배당 원천징수율과 같은 14%부터 시작하고, 금액이 커질수록 세율이 올라갑니다. 다만 종합과세 최고세율(45%)보다는 낮습니다. 구체적 구간과 세율은 정부안이므로 확정 법률과 국세청 안내로 확인하세요.',
  },
  {
    question: '기존 배당 과세와 무엇이 다른가요?',
    answer:
      '일반 배당은 14%(지방세 포함 15.4%)로 원천징수되고, 연간 금융소득(이자+배당)이 2,000만원을 넘으면 초과분이 다른 소득과 합산돼 종합과세됩니다. 고배당기업 분리과세를 신청하면 이 종합과세 합산에서 빠져 저율로 과세가 종결됩니다.',
  },
  {
    question: '누구에게 유리한가요?',
    answer:
      '근로·사업소득 등 다른 소득이 많아 이미 높은 세율 구간에 있는 고소득 배당 투자자에게 유리합니다. 반대로 배당 외 소득이 적어 종합과세해도 낮은 세율이 적용되는 사람은 종합과세가 더 유리할 수 있습니다. 분리과세는 자동이 아니라 신청 방식이므로 본인에게 유리한 쪽을 선택하면 됩니다.',
  },
  {
    question: '어떻게 신청하나요?',
    answer:
      '자동 적용이 아닙니다. 종합소득세 신고(다음 해 5월) 때 분리과세 신청서를 함께 제출해야 합니다. 신청하지 않으면 일반 규정대로 종합과세 대상이 될 수 있으므로, 유리 여부를 계산한 뒤 신고 기한 내에 신청하세요.',
  },
  {
    question: '어떤 기업이 고배당기업인가요?',
    answer:
      '기업이 정기주주총회에서 이익배당을 결의한 뒤 공시하며, 한국거래소 상장공시시스템(KIND)의 기업 밸류업 정보 내 고배당기업 공시 항목에서 확인할 수 있습니다. 내가 보유한 종목이 분리과세 대상인지 배당 전에 미리 확인하는 것이 좋습니다.',
  },
  {
    question: '언제까지 적용되는 제도인가요?',
    answer:
      '한시적 제도입니다. 2026년 지급 배당부터 적용되며, 2030년 5월 종합소득세 신고까지 운영되는 것으로 발표됐습니다. 이후 연장 여부는 향후 세법 개정에 따라 달라질 수 있습니다.',
  },
  {
    question: 'ISA나 연금계좌 배당에도 적용되나요?',
    answer:
      'ISA·연금저축·IRP 등 세제혜택 계좌 안에서 발생한 배당은 계좌별 고유의 과세 방식(분리과세·과세이연 등)이 우선 적용됩니다. 고배당기업 분리과세는 일반 위탁계좌에서 받은 배당을 전제로 하므로, 계좌 성격에 따라 적용 방식이 다릅니다. 정확한 처리는 증권사·국세청에 확인하세요.',
  },
];

export default function DividendSeparateTaxationValueUp2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '고배당기업 배당소득 분리과세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '고배당기업 배당소득 분리과세 2026, 신청·유불리 총정리',
    description:
      '2026년 지급 배당부터 도입된 고배당기업 배당소득 분리과세(14~30% 저율). 종합과세 비교, 유불리 판단, 신청 절차, KIND 밸류업 확인법까지 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['배당소득', '분리과세', '밸류업', '고배당기업', '금융소득종합과세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '고배당기업 배당소득 분리과세 2026',
    description: '고배당기업 배당소득 분리과세 제도의 세율·유불리·신청 방법 정리.',
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
                    { name: '고배당기업 배당소득 분리과세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">배당 투자자 · 8분 읽기 · 2026-08-06</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  고배당기업 배당소득 분리과세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">신청·유불리 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 배당주에 투자하며 금융소득 종합과세가 부담스러운 투자자를 위한 글입니다. 2026년 지급 배당부터 시행된 고배당기업 배당소득 분리과세가 무엇인지, 종합과세와 어떻게 다른지, 나에게 유리한지, 그리고 어떻게 신청하는지를 순서대로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-dividend-separate-taxation-value-up-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">고배당기업 배당소득 분리과세란</h2>
                <p>
                  주주환원을 적극 실천하는 고배당기업의 배당소득을 다른 소득과 합산하지 않고 낮은 단일세율로 따로 과세하는 제도입니다. 정부의 기업 밸류업 정책과 연결돼 도입됐으며, 2026년 1월 1일 이후 지급받은 배당소득부터 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    종합과세: 배당을 근로·사업소득과 합산 → 누진세율 6~45% 적용
                    <br />
                    분리과세(신청): 배당만 따로 14~30% 저율로 과세 종결 → 종합과세 합산에서 제외
                  </p>
                </div>
                <p className="mt-4">
                  즉 배당이 많아 종합과세로 높은 세율을 물던 투자자가, 신청을 통해 배당 부분만 낮은 세율로 분리해 부담을 낮출 수 있는 것이 이 제도의 핵심입니다.
                </p>
                <p className="mt-4">
                  다만 모든 배당이 대상은 아닙니다. 정부가 정한 요건을 충족한 고배당기업의 배당이어야 하며, 그 여부는 공시로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세율은 얼마이고 종합과세와 뭐가 다른가</h2>
                <p>
                  분리과세 세율은 배당금액 구간에 따라 14%에서 30% 사이로 차등 적용됩니다(지방소득세 별도). 종합과세 최고세율 45%보다 낮은 것이 핵심 이점입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 배당 과세 방식 비교 (정부 발표 기준, 지방소득세 별도)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 배당</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">고배당기업 분리과세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">원천징수</td>
                        <td className="p-3">14% (지방세 포함 15.4%)</td>
                        <td className="p-3">저율 분리과세 신청</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2천만원 초과분</td>
                        <td className="p-3">종합과세 합산 (6~45%)</td>
                        <td className="p-3">종합과세 제외</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">적용 세율</td>
                        <td className="p-3">종합 누진 최대 45%</td>
                        <td className="p-3"><strong>14~30% 저율</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">적용 방식</td>
                        <td className="p-3">기본 규정</td>
                        <td className="p-3">신청주의(선택)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  일반 배당은 연간 금융소득(이자+배당)이 2,000만원을 넘으면 초과분이 종합과세됩니다. 분리과세를 신청하면 이 합산에서 빠져 저율로 과세가 마무리됩니다.
                </p>
                <p className="mt-4">
                  다만 위 14~30% 구간과 세부 경계는 정부안 기준입니다. 확정 세율과 구간은 국회 통과 후 개정 법률과 국세청 안내로 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누구에게 유리한가 (계산 사례)</h2>
                <p>
                  분리과세가 항상 유리한 것은 아닙니다. 본인의 다른 소득 규모에 따라 유불리가 갈리므로, 두 가지 사례로 비교합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 다른 소득이 많은 고소득자 (분리과세 유리)</p>
                  <p className="text-sm text-text-secondary">
                    · 근로·사업소득으로 이미 과세표준 최고 구간(예: 38~45%) 도달
                    <br />
                    · 고배당기업 배당 5,000만원 수령
                    <br />
                    · 종합과세 시: 배당 5,000만원이 38~45% 한계세율로 과세
                    <br />
                    · 분리과세 시: 14~30% 저율로 종결
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 한계세율이 분리과세율보다 높으면 분리과세가 유리합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 배당 외 소득이 적은 은퇴자 (종합과세가 유리할 수 있음)</p>
                  <p className="text-sm text-text-secondary">
                    · 다른 소득이 거의 없고 배당만 2,500만원 수령
                    <br />
                    · 종합과세 시: 낮은 누진 구간(6~15%)에서 과세될 수 있음
                    <br />
                    · 분리과세 시: 구간에 따라 14% 이상 적용
                    <br />
                    <span className="text-xs text-text-tertiary">경계값: 내 종합과세 실효세율이 분리과세율보다 낮으면 굳이 신청하지 않는 편이 유리합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 실제 유불리는 배당 규모, 다른 소득, 각종 공제까지 종합해 계산해야 정확합니다. 신고 전 홈택스 모의계산이나 세무 전문가 상담으로 두 방식을 비교하는 것을 권합니다.
                </p>
              </section>

              <AdSlot slot="guide-dividend-separate-taxation-value-up-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 신청하고 고배당기업은 어떻게 확인하나</h2>
                <p>
                  분리과세는 자동으로 적용되지 않습니다. 신청 절차와 대상 기업 확인 방법을 단계별로 정리합니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>보유 종목 확인:</strong> 한국거래소 상장공시시스템(KIND)의 기업 밸류업 정보에서 고배당기업 공시 항목을 확인합니다. 내가 받은 배당이 분리과세 대상인지 먼저 파악합니다.
                  </li>
                  <li>
                    <strong>유불리 계산:</strong> 종합과세와 분리과세 중 어느 쪽이 유리한지 배당 규모와 다른 소득을 기준으로 비교합니다.
                  </li>
                  <li>
                    <strong>신청서 제출:</strong> 다음 해 5월 종합소득세 신고 때 분리과세 신청서를 함께 제출합니다. 신청하지 않으면 일반 규정(종합과세 가능성)이 적용됩니다.
                  </li>
                </ol>
                <p className="mt-4">
                  예외: 배당을 지급한 시점에 이미 15.4%로 원천징수됐더라도, 최종 과세 방식은 신고 때 신청 여부로 정리됩니다. 원천징수만으로 끝났다고 오해하지 마세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">신청 전 챙겨야 할 주의점</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>한시적 제도:</strong> 2026년 지급 배당부터 2030년 5월 신고까지 운영되는 것으로 발표됐습니다. 매년 요건과 대상 기업이 달라질 수 있으니 배당 시즌마다 확인하세요.
                  </li>
                  <li>
                    <strong>건강보험료 영향:</strong> 배당소득은 건강보험료 산정에 영향을 줄 수 있습니다. 분리과세 여부와 별개로 지역가입자·피부양자 자격에 미치는 영향을 함께 살펴야 합니다.
                  </li>
                  <li>
                    <strong>정부안 단계:</strong> 세부 세율·구간·요건은 국회 심의 과정에서 조정될 수 있습니다. 최종 확정 전까지는 국세청·소관부처 안내를 기준으로 판단하세요.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 기본 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배당 원천징수 15.4%와 과세 구조.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2천만원 기준 종합과세 판정 원리.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-health-insurance-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득과 건강보험료</div>
                    <p className="mt-1 text-sm text-text-secondary">배당·이자가 건보료에 미치는 영향.</p>
                  </Link>
                  <Link
                    href="/guide/reits-dividend-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">리츠 배당소득세</div>
                    <p className="mt-1 text-sm text-text-secondary">리츠 배당의 과세 방식과 분리과세 특례.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 절세 혜택</div>
                    <p className="mt-1 text-sm text-text-secondary">배당·이자 비과세·분리과세 한도 활용.</p>
                  </Link>
                  <Link
                    href="/category/investment/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">투자 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">주식·배당·ETF 세금 전략 전체.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 특정 종목 투자를 권유하거나 수익을 보장하지 않습니다. 고배당기업 배당소득 분리과세의 세율·구간·요건·적용기한은 2026년 세제개편 발표 및 정부안을 기준으로 정리한 것으로, 국회 심의 과정에서 변경될 수 있습니다. 개인별 유불리는 소득 구조에 따라 다르므로, 신고 전 홈택스 모의계산 또는 세무 전문가 상담으로 확인하세요. 본 콘텐츠는 2026-08-06 기준으로 작성됐으며, 근거는 조세특례제한법상 고배당기업 배당소득 과세특례 및 소득세법 금융소득 종합과세 규정입니다. 정확한 조문·세율은 소관부처 고시를 참조하세요. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://kind.krx.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국거래소 KIND(기업 밸류업 정보)</a>.
                </p>
              </section>

              <ShareButtons
                title="고배당기업 배당소득 분리과세 2026 가이드"
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
