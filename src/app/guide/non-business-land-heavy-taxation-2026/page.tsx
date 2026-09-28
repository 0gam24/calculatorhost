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

const URL = 'https://calculatorhost.com/guide/non-business-land-heavy-taxation-2026/';
const DATE_PUBLISHED = '2026-09-29';
const DATE_MODIFIED = '2026-09-29';

export const metadata: Metadata = {
  title: '비사업용 토지 양도세 중과 2026, 사업용 인정받는 법',
  description:
    '비사업용 토지로 판정되면 양도소득세가 기본세율보다 10%포인트 높게 부과됩니다. 농지를 사업용으로 인정받는 재촌·자경 3가지 기준과 상속·공익제한 예외를 소득세법 §104의3·시행령 §168의8 기준으로 정리했습니다.',
  keywords: [
    '비사업용 토지',
    '비사업용 토지 중과',
    '재촌자경',
    '농지 양도소득세',
    '비사업용 토지 예외',
    '소득세법 104조의3',
    '토지 양도세 중과세율',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '비사업용 토지 양도세 중과 2026, 사업용 인정받는 법' }],
    title: '비사업용 토지 양도세 중과 2026, 사업용으로 인정받는 법',
    description: '기본세율 + 10%포인트 중과. 재촌·자경 3가지 기준 중 하나만 충족하면 사업용 인정. 소득세법 §104의3.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '비사업용 토지 양도세 중과 2026, 사업용 인정받는 법',
    description: '기본세율 + 10%포인트 중과. 재촌·자경 3가지 기준 중 하나 충족 시 사업용. 소득세법 §104의3·시행령 §168의8.',
  },
};

const FAQ_ITEMS = [
  {
    question: '비사업용 토지는 왜 세금이 더 많이 나오나요?',
    answer:
      '투기 목적의 토지 보유를 억제하려고 일반 세율보다 10%포인트를 더 부과하기 때문입니다(소득세법 §104①8호). 농지·임야·대지 등을 직접 사용하지 않고 방치하거나 시세차익만 노렸다고 보는 토지에 적용됩니다. 실제 사용 실태에 따라 판정되므로 등기부상 지목만으로 결정되지 않습니다.',
  },
  {
    question: '재촌·자경 조건 3가지 중 하나만 충족하면 사업용으로 인정되나요?',
    answer:
      '네, 그렇습니다. 보유기간의 60% 이상, 양도일 직전 5년 중 3년 이상, 양도일 직전 3년 중 2년 이상 중 어느 하나만 충족해도 사업용 농지로 인정됩니다(소득세법 시행령 §168의8). 세 조건을 모두 채울 필요는 없으며, 본인에게 가장 유리한 기준 하나를 골라 입증하면 됩니다.',
  },
  {
    question: '도시계획으로 농사를 못 짓게 된 토지도 중과되나요?',
    answer:
      '원칙적으로 중과되지 않습니다. 취득 이후 도시계획이나 개발제한구역 지정 등 법령에 의해 사용이 금지·제한된 기간은 비사업용 판정 기간 계산에서 제외됩니다(소득세법 시행령 §168의14). 본인의 의사와 무관하게 토지를 사용하지 못한 기간까지 불리하게 판정하지 않으려는 취지입니다.',
  },
  {
    question: '상속받은 농지는 언제까지 팔아야 비사업용을 피할 수 있나요?',
    answer:
      '상속개시일로부터 5년 이내에 양도하면 재촌·자경 여부와 무관하게 비사업용 토지 판정에서 제외됩니다(소득세법 시행령 §168의14). 갑자기 농지를 상속받아 재촌·자경을 준비할 시간이 없는 상속인을 배려한 규정입니다. 5년이 지나면 일반 판정 기준이 그대로 적용됩니다.',
  },
  {
    question: '질병이나 고령으로 직접 경작을 못 해도 예외가 있나요?',
    answer:
      '있습니다. 5년 이상 재촌·자경하다가 질병, 고령, 징집, 취학 등 부득이한 사유로 더 이상 경작할 수 없게 된 경우에는 그 사유가 발생한 기간을 비사업용 판정에서 제외해 줍니다(소득세법 시행령 §168의14). 사유를 증명할 진단서·재직증명 등 서류를 갖춰 두는 것이 안전합니다.',
  },
  {
    question: '비사업용 토지 여부는 어떻게 확인하나요?',
    answer:
      '재촌·자경 실태와 보유 기간을 정확히 알아야 판정할 수 있어 자가 진단만으로는 한계가 있습니다. 홈택스 양도소득세 종합안내 또는 관할 세무서, 세무사 상담을 통해 본인의 거주지·경작 이력을 근거로 확인하는 것이 안전합니다. 판정을 잘못하면 세액 차이가 10%포인트에 달할 수 있습니다.',
  },
];

export default function NonBusinessLandHeavyTaxation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '비사업용 토지 양도세 중과 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '비사업용 토지 양도세 중과 2026, 사업용으로 인정받는 법',
    description:
      '비사업용 토지 중과세율(기본세율+10%포인트)의 근거, 재촌·자경 3가지 판정 기준, 상속·공익제한·질병 예외를 소득세법 §104의3·시행령 §168의8·§168의14 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['비사업용 토지', '재촌자경', '농지 양도세', '소득세법 104조의3'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '비사업용 토지 양도세 중과 2026',
    description:
      '비사업용 토지 중과세율과 재촌·자경 판정 3가지 기준, 상속·공익제한 예외 정리.',
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
                    { name: '비사업용 토지 양도세 중과 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 8분 읽기 · 2026-09-29</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  비사업용 토지 양도세 중과 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 사업용으로 인정받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  농지·임야·대지를 팔았는데 갑자기 세금이 크게 늘었다면 비사업용 토지로 판정됐을 가능성이 큽니다. 이 가이드는 비사업용 토지가 무엇이고 왜 세금이 더 붙는지, 재촌·자경으로 사업용을 인정받는 3가지 기준, 상속받은 농지나 공익 목적 제한처럼 억울하게 중과되지 않도록 막아 주는 예외를 정리합니다. 대상 독자는 농지·임야 등 토지를 보유하고 있거나 상속받아 처분을 앞둔 사람입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비사업용 토지란 무엇인가요?</h2>
                <p>
                  비사업용 토지는 소유자가 실제로 농사·임업 등에 사용하지 않고 투기 목적으로 보유했다고 보는 토지를 말합니다. 농지인데 재촌·자경 요건을 채우지 못했거나, 임야·대지를 목적에 맞게 사용하지 않은 경우가 대표적입니다. 법적 정의는 소득세법 §104의3에 있으며, 지목별로 구체적인 판정 기준이 다릅니다.
                </p>
                <p>
                  이 판정은 등기부상 지목만으로 정해지지 않습니다. 서류상 농지라도 실제로 재촌·자경하지 않았다면 비사업용으로 분류될 수 있고, 반대로 법령상 부득이한 사유가 있었다면 사업용으로 구제받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 실제 사용하지 않고 보유만 한 것으로 보는 토지(소득세법 §104의3).
                    <br />
                    세금: 양도소득세 기본세율에 10%포인트를 더해 부과(§104①8호).
                    <br />
                    구제: 재촌·자경 3가지 기준 중 하나 충족, 또는 상속·공익제한·질병 등 예외 사유.
                    <br />
                    근거: 소득세법 시행령 §168의8(판정 기준)·§168의14(예외).
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비사업용 토지 중과세율은 얼마인가요?</h2>
                <p>
                  기본세율에 10%포인트를 더한 세율이 적용됩니다. 소득세법 §104①8호는 비사업용 토지의 양도소득에 대해 §55①의 기본세율(6~45% 누진세율)에 10%포인트를 가산하도록 정하고 있습니다. 예를 들어 과세표준 구간이 38%라면 비사업용 토지는 48%가 적용되는 식입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 사업용 vs 비사업용 토지 세율 비교 (소득세법 §55·§104①8호)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준 구간 세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사업용 토지</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비사업용 토지</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">15% 구간</td>
                        <td className="p-3">15%</td>
                        <td className="p-3">25%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">24% 구간</td>
                        <td className="p-3">24%</td>
                        <td className="p-3">34%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">38% 구간</td>
                        <td className="p-3">38%</td>
                        <td className="p-3">48%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">42% 구간</td>
                        <td className="p-3">42%</td>
                        <td className="p-3">52%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 다주택자에게 한시적으로 적용됐던 조정대상지역 중과 유예와 비사업용 토지 중과는 서로 다른 제도입니다. 토지에 붙는 이 10%포인트 가산은 별도의 유예 조치 없이 2026년 현재도 그대로 적용되고 있으므로 혼동하지 않아야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">농지가 사업용으로 인정받으려면 어떻게 해야 하나요?</h2>
                <p>
                  재촌과 자경, 두 조건을 함께 충족하면 사업용 농지로 인정받습니다. 재촌은 농지 소재지나 인접 지역에 거주하는 것이고, 자경은 자기 노동력으로 상시 농작업에 종사하거나 농작업의 절반 이상을 직접 담당하는 것을 뜻합니다. 위탁경영이나 대리경작만으로는 자경으로 인정되지 않습니다.
                </p>
                <p>
                  기간 요건은 다음 3가지 중 하나만 충족하면 됩니다(소득세법 시행령 §168의8). 셋을 모두 채울 필요는 없고, 본인 상황에 맞는 기준 하나를 골라 증빙하면 사업용으로 인정받을 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>기준 1:</strong> 전체 보유기간의 60% 이상 재촌·자경
                  </li>
                  <li>
                    <strong>기준 2:</strong> 양도일 직전 5년 중 3년 이상 재촌·자경
                  </li>
                  <li>
                    <strong>기준 3:</strong> 양도일 직전 3년 중 2년 이상 재촌·자경
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 재촌·자경 여부는 서류만으로 간단히 증명되지 않는 경우가 많습니다. 주민등록초본상 거주 이력, 농지원부·농지대장 등록 내역, 비료·농약 구입 영수증, 농협 조합원 가입 이력 등을 함께 준비해 두는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속받은 농지도 비사업용으로 보나요?</h2>
                <p>
                  상속개시일로부터 5년 이내에 양도하면 재촌·자경 여부와 무관하게 비사업용 판정에서 제외됩니다. 부모님이 갑자기 돌아가시면서 농지를 상속받은 자녀는 당장 재촌·자경 요건을 채울 수 없는 경우가 많아, 소득세법 시행령 §168의14가 5년의 유예 기간을 별도로 인정해 줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 도시에 사는 자녀가 농지를 상속받은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 부친 사망으로 농지 상속, 자녀는 도시 거주로 재촌·자경 불가
                    <br />
                    · 판단: 상속개시일로부터 5년 이내 양도하면 비사업용 판정 제외
                    <br />
                    · 5년 경과 후: 일반 재촌·자경 기준(기준 1~3)으로 다시 판정
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 상속 농지는 5년 안에 처분 여부를 정리하는 것이 세금 측면에서 유리합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 5년이 지난 뒤에는 상속인 본인이 재촌·자경 기준 3가지 중 하나를 충족했는지로 다시 판정합니다. 상속 유예 기간을 놓쳤다고 해서 곧바로 비사업용이 확정되는 것은 아니며, 그 시점부터 일반 기준이 적용된다는 의미입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공익 목적으로 사용이 제한된 토지는 어떻게 되나요?</h2>
                <p>
                  취득 이후 법령에 의해 사용이 금지되거나 제한된 기간은 비사업용 판정 기간 계산에서 빼 줍니다. 도시계획시설 지정, 개발제한구역(그린벨트) 지정처럼 소유자의 의사와 무관하게 토지 사용이 막힌 경우가 대표적이며, 근거는 소득세법 시행령 §168의14입니다.
                </p>
                <p>
                  질병, 고령, 징집, 취학 등 부득이한 사유로 더 이상 직접 경작할 수 없게 된 경우도 같은 조항에서 구제합니다. 다만 이때는 이전에 5년 이상 재촌·자경한 이력이 전제되어야 하며, 사유 발생 사실을 증빙할 진단서·재직증명 등 서류를 갖춰 두어야 합니다.
                </p>
                <p className="mt-4">
                  다만, 이런 제한 사유가 있다고 해서 신고 없이 자동으로 사업용 처리되는 것은 아닙니다. 양도소득세 신고 시 관련 증빙을 제출해 사유를 소명해야 하므로, 사전에 세무사와 함께 어떤 서류가 필요한지 확인해 두는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">토지 양도차익을 입력해 세율별 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">토지 보유 중 매년 내는 재산세도 함께 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/self-farming-land-100-percent-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자경농지 8년 100% 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">사업용 농지를 8년 이상 자경하면 받는 별도 감면 제도.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-general-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 표1</div>
                    <p className="mt-1 text-sm text-text-secondary">비사업용 토지를 오래 보유했을 때 적용되는 별도 공제율.</p>
                  </Link>
                  <Link
                    href="/guide/demolished-house-land-capital-gains-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">멸실주택 부수토지 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">건물이 없어진 토지가 주택인지 나대지인지 판단하는 법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 비사업용 토지 판정은 재촌·자경 이력, 지목, 취득 경위 등 개별 사정에 따라 달라지므로 실제 신고 전 반드시 관할 세무서 또는 세무사와 확인하세요. 본 콘텐츠는 2026-09-29을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 소득세법 §55(기본세율), §104①8호(중과세율), §104의3(비사업용 토지 정의), 소득세법 시행령 §168의8(재촌·자경 판정 기준), §168의14(비사업용 판정 제외 사유).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="비사업용 토지 양도세 중과 2026 가이드"
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
