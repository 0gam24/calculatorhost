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

const URL = 'https://calculatorhost.com/guide/financial-income-health-insurance-premium-2026/';
const DATE_PUBLISHED = '2026-07-17';
const DATE_MODIFIED = '2026-07-17';

export const metadata: Metadata = {
  title: '금융소득 2천만원 건강보험료 2026, 피부양자 탈락 기준',
  description:
    '이자·배당 등 금융소득이 연 2천만원을 넘으면 건강보험 피부양자 자격을 잃거나 직장가입자 소득월액보험료가 부과됩니다. 국민건강보험법 §71 기준 부과 구조와 대응을 투자자 사례로 정리합니다.',
  keywords: [
    '금융소득 건강보험료',
    '피부양자 탈락 2천만원',
    '소득월액보험료',
    '이자 배당 건보료',
    '금융소득종합과세 건보',
    '투자자 건강보험',
    '국민건강보험법 71조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '금융소득 2천만원 건강보험료 2026, 피부양자 탈락 기준' }],
    title: '금융소득 2천만원 건강보험료 2026, 피부양자 탈락과 소득월액보험료',
    description: '이자·배당이 연 2천만원을 넘으면 피부양자 상실 또는 소득월액보험료 부과. 국민건강보험법 §71 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '금융소득 2천만원 건강보험료 2026',
    description: '금융소득 연 2천만원 초과 시 피부양자 탈락·소득월액보험료. 국민건강보험법 §71.',
  },
};

const FAQ_ITEMS = [
  {
    question: '금융소득이 얼마를 넘으면 건강보험료가 부과되나요?',
    answer:
      '연간 합산소득이 2천만원을 초과하면 피부양자 자격을 잃습니다(국민건강보험법 시행규칙 별표). 직장가입자라면 급여 외 소득(보수외소득)이 연 2천만원을 초과할 때 그 초과분에 소득월액보험료가 별도로 부과됩니다(국민건강보험법 §71). 이자·배당 등 금융소득은 이 합산소득에 포함됩니다.',
  },
  {
    question: '금융소득종합과세 기준 2천만원과 같은 건가요?',
    answer:
      '수치는 같지만 별개 제도입니다. 금융소득종합과세는 소득세법상 이자·배당이 2천만원을 넘으면 종합과세하는 제도이고, 건강보험료는 국민건강보험법상 부과 기준입니다. 두 기준선이 모두 2천만원이라 함께 움직이는 경우가 많지만, 근거 법령과 목적이 다릅니다.',
  },
  {
    question: '피부양자에서 탈락하면 어떻게 되나요?',
    answer:
      '지역가입자로 전환되어 본인 명의로 건강보험료를 내야 합니다. 지역가입자 보험료는 소득뿐 아니라 재산·자동차 등도 반영해 산정되므로, 피부양자였을 때는 0원이던 보험료가 상당한 금액으로 바뀔 수 있습니다. 특히 소득 없는 은퇴자가 금융소득만으로 탈락하면 체감 부담이 큽니다.',
  },
  {
    question: '직장에 다니면 금융소득이 있어도 괜찮은가요?',
    answer:
      '기본 직장보험료 외에 추가 부담이 생길 수 있습니다. 직장가입자는 근로소득에 대한 보험료를 회사와 반씩 부담하는데, 급여 외 소득(금융소득 포함)이 연 2천만원을 넘으면 그 초과분에 대해 소득월액보험료가 전액 본인 부담으로 별도 부과됩니다(§71). 직장인이라고 무조건 면제되는 것은 아닙니다.',
  },
  {
    question: '비과세·분리과세 금융소득도 합산되나요?',
    answer:
      '원칙적으로 과세 대상 금융소득이 기준입니다. ISA 비과세 한도, 비과세종합저축 등 법정 비과세 소득은 합산소득에서 제외되는 것이 일반적입니다. 다만 분리과세 여부와 건보 반영 범위는 소득 종류마다 다를 수 있으므로, 정확한 반영 여부는 국민건강보험공단에 확인해야 합니다.',
  },
  {
    question: '건강보험료율은 2026년에 얼마인가요?',
    answer:
      '건강보험료율은 매년 건강보험정책심의위원회에서 정해 고시합니다. 연도별로 변동되므로, 2026년 정확한 요율과 장기요양보험료율은 국민건강보험공단 고시를 확인하는 것이 정확합니다. 소득월액보험료는 급여 외 소득 초과분에 이 요율을 적용해 산정됩니다.',
  },
  {
    question: '금융소득을 분산하면 건보료를 피할 수 있나요?',
    answer:
      '부부·가족 명의 분산, 만기 분산 등으로 개인별 연 소득을 2천만원 이하로 관리하면 부담을 낮출 수 있습니다. 다만 명의신탁이나 실질과 다른 분산은 실질과세 원칙(국세기본법 §14)에 따라 인정되지 않으므로, 실제 자금 출처와 귀속이 일치하는 범위에서만 유효합니다.',
  },
  {
    question: '은퇴 후 금융소득으로 사는데 대비책이 있나요?',
    answer:
      '비과세·분리과세 상품 활용과 소득 시기 분산이 핵심입니다. 비과세종합저축, ISA, 연금계좌 등 건보 합산에서 제외되거나 유리한 상품을 활용하고, 만기와 배당 시기를 분산해 특정 연도에 2천만원을 넘지 않도록 설계하면 피부양자 자격 유지에 도움이 됩니다. 구체 설계는 전문가 상담을 권합니다.',
  },
];

export default function FinancialIncomeHealthInsurancePremium2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '금융소득 2천만원 건강보험료 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '금융소득 2천만원 건강보험료 2026, 피부양자 탈락과 소득월액보험료',
    description:
      '이자·배당 등 금융소득이 연 2천만원을 넘을 때 발생하는 건강보험 피부양자 자격 상실과 직장가입자 소득월액보험료 부과 구조를 국민건강보험법 §71 기준으로 투자자 관점에서 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['금융소득', '건강보험료', '피부양자', '소득월액보험료', '국민건강보험법 71조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '금융소득 2천만원 건강보험료 2026',
    description:
      '금융소득 연 2천만원 초과 시 피부양자 탈락·소득월액보험료 부과 구조 정리.',
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
                    { name: '금융소득 2천만원 건강보험료 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">투자자 · 은퇴 준비층 · 8분 읽기 · 2026-07-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  금융소득 2천만원 건강보험료 2026
                  <br />
                  <span className="text-2xl text-text-secondary">피부양자 탈락과 소득월액보험료</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주식 배당과 예금 이자로 자산을 굴리는 투자자라면, 세금만큼이나 신경 써야 할 것이 건강보험료입니다. 금융소득이 일정 선을 넘으면 건강보험 피부양자 자격을 잃거나 직장가입자에게 추가 보험료가 붙기 때문입니다. 이 가이드는 금융소득 연 2천만원 기준이 건강보험료에 어떻게 연결되는지, 국민건강보험법 §71을 중심으로 투자자와 은퇴 준비층 관점에서 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-financial-income-health-insurance-premium-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">왜 금융소득에 건강보험료가 붙나요?</h2>
                <p>
                  건강보험료는 소득이 있는 곳에 부과되기 때문입니다. 이자·배당 같은 금융소득도 소득이므로, 일정 기준을 넘으면 건강보험 부과 대상이 됩니다. 구체적으로는 두 가지 경로가 있습니다. 하나는 피부양자 자격 상실이고, 다른 하나는 직장가입자의 소득월액보험료 부과입니다(국민건강보험법 §71).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">금융소득이 건보료로 연결되는 2경로</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 피부양자 → 지역가입자 전환: 합산소득 연 2천만원 초과 시 자격 상실
                    <br />
                    2. 직장가입자 소득월액보험료: 급여 외 소득 연 2천만원 초과분에 별도 부과 (§71)
                    <br />
                    → 두 경로 모두 기준선은 연 2천만원
                  </p>
                </div>
                <p className="mt-4">
                  다만 여기서 말하는 2천만원은 금융소득만이 아니라 사업·기타 소득까지 합산한 기준일 수 있어, 본인의 전체 소득 구성을 함께 확인해야 합니다. 정확한 산정 방식은 국민건강보험공단에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">피부양자에서 언제 탈락하나요?</h2>
                <p>
                  연간 합산소득이 2천만원을 초과하면 피부양자 자격을 잃습니다. 피부양자는 별도 보험료를 내지 않는 자격이므로, 탈락하면 지역가입자로 전환되어 본인 보험료를 부담하게 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 금융소득 수준별 건강보험 영향 (국민건강보험법 기준, 2026)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연 합산소득</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">피부양자 자격</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">직장가입자 영향</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2천만원 이하</td>
                        <td className="p-3">유지</td>
                        <td className="p-3">소득월액보험료 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2천만원 초과</td>
                        <td className="p-3"><strong>상실(지역가입자 전환)</strong></td>
                        <td className="p-3"><strong>초과분에 소득월액보험료</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 피부양자 자격은 소득 요건 외에 재산 요건도 함께 심사합니다. 소득이 2천만원 이하여도 재산 과표가 일정 기준을 넘으면 별도 요건으로 탈락할 수 있으므로, 자격 유지 여부는 소득만으로 단정하지 말고 공단에 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">직장가입자는 얼마를 더 내나요?</h2>
                <p>
                  급여 외 소득이 연 2천만원을 넘는 부분에 대해서만 소득월액보험료가 부과됩니다(§71). 초과분에 건강보험료율을 적용하며, 이 보험료는 회사 부담 없이 전액 본인이 냅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 직장인이 배당소득 연 3천만원을 받은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 급여 외 소득(배당): 연 3,000만원
                    <br />
                    · 부과 기준 초과분: 3,000만원 − 2,000만원 = <strong>1,000만원</strong>
                    <br />
                    · 소득월액: 1,000만원 ÷ 12 = 약 83만원(월)
                    <br />
                    · 소득월액보험료: 월 소득월액 × 건강보험료율(고시) → 별도 부과
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 2천만원 이하 부분은 부과 제외, 초과 1천만원분에만 보험료. 정확 요율은 공단 고시 참조.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 계산에서 건강보험료율은 매년 고시되어 변동되므로 구체 금액은 표기하지 않았습니다. 2026년 정확한 요율과 장기요양보험료는 국민건강보험공단 고시로 확인하세요. 소득월액보험료에는 상한이 있어 초과분이 아무리 커도 무한정 늘지는 않습니다.
                </p>
              </section>

              <AdSlot slot="guide-financial-income-health-insurance-premium-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득종합과세와 무엇이 다른가요?</h2>
                <p>
                  기준 수치는 같지만 근거 법령과 목적이 다른 별개 제도입니다. 두 제도를 혼동하면 세금과 보험료를 잘못 예측할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 금융소득종합과세 vs 건강보험료 부과 (2026)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">금융소득종합과세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">건강보험료</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근거 법령</td>
                        <td className="p-3">소득세법</td>
                        <td className="p-3">국민건강보험법 §71 등</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기준선</td>
                        <td className="p-3">이자·배당 2천만원 초과</td>
                        <td className="p-3">합산소득 2천만원 초과</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">효과</td>
                        <td className="p-3">종합과세(누진세율)</td>
                        <td className="p-3">피부양자 탈락·소득월액보험료</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 금융소득이 2천만원을 넘어 종합과세되면 그 소득이 건보 합산소득에도 반영되어, 세금과 보험료 부담이 동시에 늘어나는 이중 효과가 생깁니다. 큰 배당·이자가 예상되면 두 제도를 함께 고려해 시기를 조절하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">건보료 부담을 줄이는 방법</h2>
                <p>
                  합법적인 범위에서 개인별 연 소득을 관리하는 것이 핵심입니다. 다음 방법을 참고하세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>비과세·분리과세 활용:</strong> 비과세종합저축, ISA 등 건보 합산에서 제외되거나 유리한 상품을 활용합니다.
                  </li>
                  <li>
                    <strong>소득 시기 분산:</strong> 배당·만기 시기를 나눠 특정 연도에 2천만원을 넘지 않도록 설계합니다.
                  </li>
                  <li>
                    <strong>가족 명의 분산:</strong> 실제 자금 출처가 명확한 범위에서 가족 명의로 분산해 개인별 소득을 낮춥니다.
                  </li>
                  <li>
                    <strong>연금계좌 활용:</strong> 연금계좌 내 운용은 인출 전까지 과세이연되어 당해 소득 합산을 늦출 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 실질과 다른 명의 분산은 실질과세 원칙(국세기본법 §14)에 따라 부인될 수 있습니다. 자금 귀속이 실제와 일치하는 범위에서만 유효하며, 무리한 회피는 오히려 위험합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2천만원 기준이 세금에 미치는 영향을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배당 15.4% 과세와 종합과세 전환 기준.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-dependent-qualification-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험 피부양자 자격</div>
                    <p className="mt-1 text-sm text-text-secondary">소득·재산 요건과 탈락 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/tax-free-comprehensive-savings-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비과세종합저축 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">건보 합산에서 유리한 비과세 상품 활용법.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 세제 혜택</div>
                    <p className="mt-1 text-sm text-text-secondary">비과세·분리과세로 소득을 관리하는 계좌.</p>
                  </Link>
                  <Link
                    href="/guide/interest-income-tax-15-4-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">이자소득세 15.4%</div>
                    <p className="mt-1 text-sm text-text-secondary">예금 이자에 붙는 세금과 합산 기준.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무·보험 조언이 아닙니다. 피부양자 자격, 소득월액보험료, 건강보험료율은 개인의 전체 소득·재산과 매년 고시되는 요율에 따라 달라지므로, 정확한 부과 여부와 금액은 국민건강보험공단에서 반드시 확인하세요. 본 콘텐츠는 2026-07-17을 기준으로 작성되었으며, 관련 법령은 <strong>국민건강보험법 §71(소득월액), §69·§72(보험료 부과·징수), 국세기본법 §14(실질과세)</strong>를 따릅니다. 2026년 건강보험료율은 변동 가능성으로 정확 수치 대신 공단 고시 참조로 헤지하였습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nhis.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민건강보험공단</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="금융소득 2천만원 건강보험료 2026 가이드"
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
