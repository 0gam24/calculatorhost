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

// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 검색 의도 흡수)

const URL = 'https://calculatorhost.com/guide/presale-right-acquisition-tax-2026/';
const DATE_PUBLISHED = '2026-07-23';
const DATE_MODIFIED = '2026-07-23';

export const metadata: Metadata = {
  title: '분양권 취득세 2026, 주택 수 산입과 중과 기준 정리 | calculatorhost',
  description:
    '분양권 자체에는 취득세가 없고 잔금 때 주택 취득세를 냅니다. 다만 2020년 8월 12일 이후 취득한 분양권은 주택 수에 포함되어 다른 집 취득세 중과에 영향을 줍니다. 지방세법 §13의2·§13의3 기준으로 정리했습니다.',
  keywords: [
    '분양권 취득세',
    '분양권 주택 수 산입',
    '분양권 취득세 중과',
    '취득세 주택수',
    '분양권 잔금 취득세',
    '지방세법 13조의3',
    '다주택 취득세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '분양권 취득세 2026, 주택 수 산입과 중과 기준 정리' }],
    title: '분양권 취득세 2026, 주택 수에 들어가면 무엇이 달라지나',
    description: '분양권은 취득 시 취득세가 없지만 주택 수에는 포함됩니다. 판정 기준일, 중과세율, 양도세와의 차이를 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '분양권 취득세 2026, 주택 수 산입과 중과 기준',
    description: '분양권 취득세는 잔금 때, 주택 수는 분양권 취득일 기준. 지방세법 §13의2·§13의3.',
  },
};

const FAQ_ITEMS = [
  {
    question: '분양권을 사면 취득세를 바로 내나요?',
    answer:
      '아닙니다. 분양권 자체를 취득할 때는 취득세를 내지 않습니다. 분양권은 아직 완공되지 않은 주택을 취득할 수 있는 권리이므로, 실제 취득세는 건물이 완공되어 잔금을 치르고 소유권을 취득하는 시점에 주택 취득세로 냅니다. 다만 분양권을 다른 사람에게서 웃돈을 주고 사는 경우 등에는 별도 절차가 있을 수 있으므로 확인이 필요합니다.',
  },
  {
    question: '분양권도 주택 수에 포함되나요?',
    answer:
      '네, 2020년 8월 12일 이후 취득한 분양권은 취득세 주택 수 산정에 포함됩니다(지방세법 §13의3). 즉 분양권을 가지고 있는 상태에서 다른 주택을 사면, 그 분양권이 주택 수로 계산되어 새로 사는 집의 취득세 중과 여부에 영향을 줍니다. 이 규정 시행 전에 취득한 분양권은 주택 수에 포함되지 않습니다.',
  },
  {
    question: '주택 수 판정 기준일은 언제인가요?',
    answer:
      '분양권의 주택 수 판정은 분양권을 취득한 날을 기준으로 합니다. 완공되어 주택이 되는 시점이 아니라, 분양 계약이나 전매로 분양권을 취득한 날에 주택 수에 편입됩니다. 따라서 새 집을 사는 시점에 이미 보유한 분양권이 있으면 그 분양권도 함께 세어 중과 여부를 판단합니다.',
  },
  {
    question: '분양권이 있으면 다른 집 취득세가 중과되나요?',
    answer:
      '경우에 따라 그렇습니다. 분양권이 주택 수에 포함되므로, 조정대상지역에서 분양권을 포함해 2주택 이상이 되면 새로 취득하는 주택에 중과세율이 적용될 수 있습니다(지방세법 §13의2). 다만 취득하는 지역이 조정대상지역인지, 실제 보유 주택 수가 몇 채인지에 따라 세율이 달라지므로 개별 판단이 필요합니다.',
  },
  {
    question: '취득세 중과세율은 얼마인가요?',
    answer:
      '1주택은 주택 가격에 따라 1.0~3.0%가 적용되고, 조정대상지역 2주택은 8%, 조정대상지역 3주택 이상은 12%가 적용되는 것이 기본 틀입니다(지방세법 §13의2). 여기에 지방교육세와 전용면적 85제곱미터 초과 시 농어촌특별세가 더해집니다. 중과 세율과 예외는 정책에 따라 조정되므로 정확한 적용은 위택스와 관할 지자체에서 확인하세요.',
  },
  {
    question: '지방 미분양 주택은 주택 수에서 빠진다는데 분양권도 해당되나요?',
    answer:
      '분양권 상태는 원칙적으로 해당되지 않습니다. 2026년 지방세제 개편으로 지방의 준공 후 미분양 주택(전용 85제곱미터 이하, 취득가액 6억 원 이하 등 요건)을 취득하면 주택 수 산정에서 제외하고 취득세를 감면하는 특례가 있으나, 이는 다 지어졌는데 팔리지 않은 준공 후 미분양 주택이 대상입니다. 분양권 단계는 특례 대상이 아닐 수 있으므로 요건을 꼼꼼히 확인해야 합니다.',
  },
  {
    question: '취득세 주택 수와 양도세 주택 수는 같나요?',
    answer:
      '다릅니다. 취득세(지방세법)와 양도소득세(소득세법)는 주택 수를 세는 규정이 별개입니다. 취득세에서 주택 수에 포함되지 않는 주택이라도 양도세 비과세 판단에서는 주택 수에 포함될 수 있고, 그 반대도 가능합니다. 따라서 취득세 기준으로 유리하다고 해서 양도세도 유리하다고 단정하면 안 됩니다.',
  },
  {
    question: '분양권을 팔 때는 어떤 세금을 내나요?',
    answer:
      '분양권을 완공 전에 전매(양도)하면 양도소득세를 냅니다. 분양권 양도세는 보유 기간에 따라 세율이 높게 적용되며, 1년 미만은 70%, 1년 이상은 60% 수준의 높은 세율이 적용되는 것이 원칙입니다. 이는 취득세와는 별개의 세금이므로, 분양권을 사고팔 때는 취득세 주택 수 영향과 양도세를 함께 따져봐야 합니다.',
  },
];

export default function PresaleRightAcquisitionTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '분양권 취득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '분양권 취득세 2026, 주택 수에 들어가면 무엇이 달라지나',
    description:
      '분양권 자체에는 취득세가 없고 잔금 때 주택 취득세를 낸다. 다만 2020년 8월 12일 이후 취득 분양권은 주택 수에 포함되어 다른 집 취득세 중과에 영향을 준다. 지방세법 §13의2·§13의3 기준 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['분양권 취득세', '주택 수 산입', '취득세 중과', '지방세법', '다주택'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '분양권 취득세 2026',
    description:
      '분양권의 취득세 부과 시점, 주택 수 산입 기준, 중과세율, 양도세와의 차이를 정리한 부동산 가이드.',
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
                    { name: '분양권 취득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 구입자·투자자 · 8분 읽기 · 2026-07-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  분양권 취득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">주택 수 산입과 중과 기준 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  분양권을 가진 상태에서 다른 집을 살 때 취득세가 중과되는지, 분양권 자체 취득세는 언제 내는지 헷갈리는 분이 많습니다. 이 가이드는 주택 구입자와 투자자를 위해 분양권 취득세의 부과 시점, 주택 수 산입 기준일, 중과세율, 그리고 양도세 주택 수와의 차이를 지방세법 §13의2·§13의3을 근거로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-presale-right-acquisition-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분양권에도 취득세가 있나요?</h2>
                <p>
                  분양권을 취득하는 순간에는 취득세를 내지 않습니다. 분양권은 완공될 주택을 취득할 수 있는 권리일 뿐이므로, 실제 취득세는 건물이 완공되어 잔금을 치르고 소유권을 취득하는 시점에 주택 취득세로 냅니다.
                </p>
                <p>
                  즉 분양권 단계와 잔금 단계를 구분해야 합니다. 분양권을 살 때가 아니라 입주 시 잔금을 낼 때 취득세가 발생하며, 그 세율은 잔금 시점의 보유 주택 수와 지역에 따라 결정됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">두 시점을 구분하세요</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 분양권 취득 시점: 취득세 없음(주택 수에는 편입)
                    <br />
                    · 잔금·소유권 취득 시점: 주택 취득세 부과(세율은 주택 수·지역에 따라)
                  </p>
                </div>
                <p>
                  다만 분양권 전매로 웃돈(프리미엄)을 주고 사는 경우 양도인에게 양도세가 발생하는 등 별개의 세금 문제가 있으므로, 거래 구조를 함께 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분양권도 주택 수에 포함되나요?</h2>
                <p>
                  네, 2020년 8월 12일 이후 취득한 분양권은 취득세 주택 수 산정에 포함됩니다. 지방세법 §13의3에 따라 분양권, 조합원입주권, 주거용 오피스텔 등이 주택 수에 편입되도록 규정되어 있습니다.
                </p>
                <p>
                  이 규정의 핵심은 분양권을 보유한 상태에서 다른 주택을 취득하면, 그 분양권이 주택 수로 계산되어 새 주택의 취득세 중과 여부에 영향을 준다는 점입니다. 반대로 규정 시행 전에 취득한 분양권은 주택 수에 포함되지 않습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">주택 수 산입 기준일</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 산입 기준: 분양권을 취득한 날(완공·잔금 시점이 아님)
                    <br />
                    · 적용 대상: 2020년 8월 12일 이후 취득한 분양권
                    <br />
                    · 근거: 지방세법 §13의3(주택 수의 판단 범위)
                  </p>
                </div>
                <p>
                  예외: 분양권 취득일 자체가 오래되었거나 규정 시행 이전이라면 주택 수에 들어가지 않습니다. 취득일이 애매하면 계약서와 등기·전매 시점을 근거로 판단해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분양권이 있으면 다른 집 취득세가 중과되나요?</h2>
                <p>
                  분양권이 주택 수에 포함되므로 중과될 수 있습니다. 조정대상지역에서 분양권을 포함해 2주택 이상이 되면 새로 취득하는 주택에 중과세율이 적용될 수 있습니다(지방세법 §13의2).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택 유상취득 취득세율 기본 틀(지방세법 §13의2, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보유 상황</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">취득세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1주택</td>
                        <td className="p-3">1.0~3.0%</td>
                        <td className="p-3">주택 가격에 따라 차등</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">조정대상지역 2주택</td>
                        <td className="p-3">8%</td>
                        <td className="p-3">분양권 포함 판정</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">조정대상지역 3주택 이상</td>
                        <td className="p-3">12%</td>
                        <td className="p-3">분양권 포함 판정</td>
                      </tr>
                      <tr>
                        <td className="p-3">부가세목</td>
                        <td className="p-3">지방교육세·농어촌특별세</td>
                        <td className="p-3">85제곱미터 초과 시 농특세 추가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  주의: 위 세율은 기본 틀이며, 취득 지역이 조정대상지역인지 여부와 실제 주택 수에 따라 달라집니다. 비조정지역이나 일시적 2주택 등에는 다른 기준이 적용되므로, 정확한 세율은 위택스와 관할 지자체에서 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-presale-right-acquisition-tax-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득세 계산 사례로 이해하기</h2>
                <p>
                  분양권이 주택 수에 포함되는지에 따라 취득세가 크게 달라집니다. 아래 두 사례를 비교해 보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 분양권을 세지 않는 경우(규정 시행 전 취득)</p>
                  <p className="text-sm text-text-secondary">
                    · 보유: 2020년 8월 12일 이전 취득한 분양권 1개
                    <br />
                    · 새로 취득: 조정대상지역 주택 1채(6억 원)
                    <br />
                    · 주택 수: 분양권 제외이므로 1주택으로 판정
                    <br />
                    · 취득세율: 1.0% 적용(6억 원 기준)이면 약 600만 원 + 부가세목
                    <br />
                    <span className="text-xs text-text-tertiary">분양권이 주택 수에서 빠져 일반세율이 적용된 경우입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 분양권을 세는 경우(2020년 8월 12일 이후 취득)</p>
                  <p className="text-sm text-text-secondary">
                    · 보유: 2020년 8월 12일 이후 취득한 분양권 1개
                    <br />
                    · 새로 취득: 조정대상지역 주택 1채(6억 원)
                    <br />
                    · 주택 수: 분양권 포함이므로 2주택으로 판정
                    <br />
                    · 취득세율: 조정대상지역 2주택 8% 적용이면 약 4,800만 원 + 부가세목
                    <br />
                    <span className="text-xs text-text-tertiary">분양권이 주택 수에 포함되어 중과세율이 적용된 경우입니다. 같은 집이라도 세금 차이가 큽니다.</span>
                  </p>
                </div>
                <p>
                  예외: 위 계산은 이해를 돕기 위한 가정으로, 일시적 2주택 특례나 비조정지역 여부에 따라 결과가 달라집니다. 실제 취득 전에는 반드시 위택스 또는 세무 전문가를 통해 본인 상황으로 계산해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">취득세 주택 수와 양도세 주택 수는 다른가요?</h2>
                <p>
                  다릅니다. 취득세(지방세법)와 양도소득세(소득세법)는 주택 수를 세는 규정이 서로 다른 법률에 있어 결과가 어긋날 수 있습니다.
                </p>
                <p>
                  예를 들어 지방 미분양 특례로 취득세 주택 수에서 제외된 주택이라도, 양도세 비과세를 판단할 때는 주택 수에 포함되어 1세대1주택 비과세가 깨질 수 있습니다. 취득 단계에서 유리했다고 해서 나중에 팔 때도 유리하다고 단정하면 안 됩니다.
                </p>
                <p>
                  다만 두 세금은 목적과 시점이 다릅니다. 취득세는 살 때, 양도세는 팔 때 내는 세금이므로, 분양권을 포함한 주택 거래는 취득세 중과와 양도세 비과세 요건을 함께 검토하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 가격과 주택 수를 넣어 취득세를 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율 구간과 부가세목까지 취득세 기본을 익히세요.</p>
                  </Link>
                  <Link
                    href="/guide/presale-right-capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">분양권 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">분양권을 팔 때 내는 양도세 세율을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/temporary-two-houses-capital-gains-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일시적 2주택 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세 주택 수 판단의 대표 예외를 살펴보세요.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">첫 주택 취득 시 받을 수 있는 감면을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">취득세·양도세·전월세 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 취득세 중과세율, 주택 수 산입 예외, 지방 미분양 특례, 조정대상지역 지정은 정책과 세법 개정에 따라 달라질 수 있으므로, 실제 취득 전에는 위택스, 관할 지자체, 세무 전문가를 통해 본인 상황으로 확인하세요. 본 콘텐츠는 2026-07-23을 기준으로 작성되었으며, 세법 개정 시 업데이트됩니다. 근거 법조항은 <strong>지방세법 §13의2(중과세율)·§13의3(주택 수의 판단 범위)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="분양권 취득세 2026, 주택 수 산입과 중과 기준 정리"
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
