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

const URL = 'https://calculatorhost.com/guide/demolished-house-land-capital-gains-2026/';
const DATE_PUBLISHED = '2026-09-28';
const DATE_MODIFIED = '2026-09-28';

export const metadata: Metadata = {
  title: '멸실주택 부수토지 양도세 2026, 나대지인가 주택인가',
  description:
    '집을 헐고 나서 팔면 원칙적으로 양도일 현재 나대지로 보아 1세대1주택 비과세를 받지 못합니다. 다만 매매특약에 따라 잔금 전 철거한 경우는 계약일 현재로 판정합니다. 부수토지 배율과 비사업용 토지 중과까지 소득세법 §89·§104·§104의3·시행령 §154 기준으로 정리했습니다.',
  keywords: [
    '멸실주택 양도세',
    '나대지 양도소득세',
    '주택 부수토지',
    '1세대1주택 비과세 판정',
    '비사업용 토지 중과',
    '매매특약 철거',
    '소득세법 154조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '멸실주택 부수토지 양도세 2026, 나대지인가 주택인가' }],
    title: '멸실주택 부수토지 양도세 2026, 나대지인가 주택인가',
    description: '원칙은 양도일 현재 나대지 판정, 매매특약 철거는 계약일 현재 판정. 부수토지 배율과 비사업용 중과까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '멸실주택 부수토지 양도세 2026, 나대지인가 주택인가',
    description: '양도일 현재 원칙, 매매특약 철거는 계약일 현재 판정. 소득세법 §89·§104의3·시행령 §154.',
  },
};

const FAQ_ITEMS = [
  {
    question: '집을 헐고 팔면 무조건 세금이 더 나오나요?',
    answer:
      '단정할 수는 없지만 대체로 불리해집니다. 주택을 철거하고 나대지 상태로 팔면 양도일 현재 기준으로 이미 주택이 아니므로 1세대1주택 비과세(소득세법 §89①3호)를 적용받지 못합니다. 다만 매수인의 요구로 잔금 전에 철거했다는 특약이 계약서에 명시돼 있다면, 계약일 현재를 기준으로 주택 여부를 판정하는 예외가 있어 비과세가 유지될 수 있습니다.',
  },
  {
    question: '어떤 경우에 계약일 기준으로 봐주나요?',
    answer:
      '국세청 예규(재일46014-1238, 1995.05.20)와 이후 여러 조세심판원 결정례는 매매계약 성립 후 잔금청산 전에 매매특약에 따라 주택을 멸실한 경우, 매매계약일 현재를 기준으로 1세대1주택 비과세 여부를 판정한다고 밝히고 있습니다. 핵심은 매도인이 임의로 철거한 것이 아니라 매수인의 요구·특약에 의한 철거라는 점을 계약서와 철거비용 부담 내역으로 입증할 수 있어야 한다는 것입니다.',
  },
  {
    question: '매도인이 스스로 철거하면 어떻게 되나요?',
    answer:
      '매수인의 요구나 계약상 특약 없이 매도인 스스로 판단해 철거했다면 원칙으로 돌아가 양도일 현재 나대지로 판정됩니다. 이 경우 1세대1주택 비과세를 받지 못하고, 토지로서 일반 양도소득세율(소득세법 §55·§104)이 적용되며 나아가 비사업용 토지 중과 여부까지 추가로 검토해야 합니다.',
  },
  {
    question: '나대지가 되면 비사업용 토지로 중과되나요?',
    answer:
      '가능성이 있습니다. 나대지는 소득세법 §104의3이 정한 비사업용 토지의 대표적 유형이며, 비사업용 토지로 확정되면 기본세율(§55, 최고 45%)에 10퍼센트포인트가 가산됩니다(§104①8호). 다만 보유기간 중 일정 기간만 비사업용으로 사용됐는지를 따지는 기간 기준과 재해·수용 등 예외 사유가 있으므로, 실제 적용 여부는 보유·이용 이력을 두고 세무서나 세무 전문가와 개별 확인이 필요합니다.',
  },
  {
    question: '주택 부수토지의 면적 한도는 어떻게 되나요?',
    answer:
      '주택이 살아 있는 상태에서 비과세를 받을 때, 부수토지로 인정되는 면적은 건물 정착면적을 기준으로 배율이 정해집니다(소득세법 시행령 §154⑦). 2022년 1월 1일 이후 양도분부터 수도권 내 주거·상업·공업지역은 3배, 수도권 내 녹지지역과 수도권 밖 도시지역은 5배, 도시지역 밖은 10배까지 인정됩니다. 이 배율을 넘는 토지는 애초에 부수토지가 아니라 별도의 토지 양도로 봅니다.',
  },
  {
    question: '재건축·재개발 때문에 철거하는 경우도 같은 기준인가요?',
    answer:
      '관리처분계획인가 이후 조합원 입주권으로 전환된 주택은 이 글이 다루는 일반 매매 멸실과는 별개의 규정(도시정비법상 입주권 관련 특례)이 적용됩니다. 재건축·재개발 조합원 입주권의 비과세·과세 판단은 별도로 확인해야 하며, 이 글은 일반 매매계약에서 발생하는 철거·멸실 사안을 다룹니다.',
  },
  {
    question: '철거 전에 세무서에 미리 확인할 수 있나요?',
    answer:
      '국세청 홈택스 상담이나 관할 세무서 방문 상담, 세무 전문가 자문을 통해 사전에 특약 문구와 철거비용 부담 방식이 계약일 기준 판정의 요건을 충족하는지 확인받는 것이 안전합니다. 사후에 다투는 것보다 계약서 작성 단계에서 특약 문구를 명확히 넣어 두는 편이 분쟁 소지를 줄입니다.',
  },
];

export default function DemolishedHouseLandCapitalGains2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '멸실주택 부수토지 양도세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '멸실주택 부수토지 양도세 2026, 나대지인가 주택인가',
    description:
      '주택 멸실 후 양도 시 1세대1주택 비과세 판정 기준일 원칙과 매매특약 예외, 부수토지 배율, 비사업용 토지 중과 리스크를 소득세법 §89·§104·§104의3·시행령 §154 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['멸실주택', '나대지 양도세', '주택 부수토지', '비사업용 토지', '소득세법 154조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '멸실주택 부수토지 양도세 2026',
    description:
      '주택을 헐고 판 뒤 1세대1주택 비과세를 받을 수 있는지, 원칙과 매매특약 예외, 부수토지 배율, 비사업용 토지 중과를 정리.',
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
                    { name: '멸실주택 부수토지 양도세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">매도 예정자 · 8분 읽기 · 2026-09-28</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  멸실주택 부수토지 양도세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 나대지인가 주택인가</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  낡은 집을 헐고 새로 짓거나, 매수인이 철거를 조건으로 요구해 집을 없앤 뒤 파는 경우가 있습니다. 이때 남은 땅을 팔면 세법상 여전히 주택으로 보는지, 아니면 그냥 토지로 보는지에 따라 1세대1주택 비과세 여부와 세율이 완전히 달라집니다. 이 가이드는 판정 기준일의 원칙과 예외, 부수토지 면적 배율, 비사업용 토지 중과 리스크를 실제 사례와 함께 정리합니다. 대상 독자는 철거를 앞두거나 이미 멸실된 주택 부지를 파는 매도 예정자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">멸실주택 부수토지, 세법은 무엇을 기준으로 판단하나요?</h2>
                <p>
                  원칙은 양도일 현재입니다. 1세대1주택 비과세 여부를 포함한 주택 판정은 잔금을 치르는 양도일을 기준으로 하므로(소득세법 §89①3호, 시행령 §154), 그 시점에 건물이 이미 철거되어 없다면 세법상 주택이 아니라 나대지, 즉 토지로 취급됩니다. 반대로 양도일 현재 건물이 남아 있다면 면적·보유기간 등 다른 요건만 충족하면 비과세를 받을 수 있습니다.
                </p>
                <p>
                  다만, 매매계약을 체결한 뒤 잔금을 치르기 전에 매매특약에 따라 주택을 철거한 경우는 예외입니다. 국세청 예규(재일46014-1238, 1995.05.20)는 이런 경우 매매계약일 현재를 기준으로 주택 여부를 판정하도록 하고 있고, 이후 조세심판원 결정례(조심2023전0048 등)에서도 같은 취지가 반복 확인되고 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 철거된 주택 부지가 세법상 주택인지 토지인지의 판정 문제.
                    <br />
                    원칙: 양도일 현재 건물이 없으면 나대지로 판정(소득세법 §89, 시행령 §154).
                    <br />
                    예외: 매매특약에 따라 잔금 전 철거하면 계약일 현재로 판정(국세청 예규 1995).
                    <br />
                    주의: 매도인이 임의로 철거하면 예외를 인정받기 어려움.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매매특약 철거와 임의 철거, 어떤 차이가 있나요?</h2>
                <p>
                  누가, 왜 철거를 주도했는지가 핵심입니다. 매수인이 신축·재건축 등을 이유로 철거를 요구하고 그 사실을 계약서에 특약으로 명시한 경우라면, 매도인 입장에서는 주택을 팔았을 뿐 철거는 매수인의 선택이었다고 볼 여지가 커집니다. 이런 사안에서는 계약일 현재 주택이 있었다는 사실이 인정되어 계약일 기준 판정을 받을 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 철거 주체·시점에 따른 판정 기준 비교 (소득세법 §89·시행령 §154, 국세청 예규 재일46014-1238)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">판정 기준일</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비과세 가능성</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">양도일 현재도 건물 존재</td>
                        <td className="p-3">양도일 현재(원칙)</td>
                        <td className="p-3">다른 요건 충족 시 가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">매매특약에 따라 잔금 전 철거</td>
                        <td className="p-3">매매계약일 현재(예외)</td>
                        <td className="p-3">특약·비용부담 입증 시 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">매도인이 임의로 철거</td>
                        <td className="p-3">양도일 현재(원칙 복귀)</td>
                        <td className="p-3">나대지로 과세, 비과세 불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 특약이 있다고 무조건 인정되는 것은 아닙니다. 실무에서는 계약서상 특약 문구의 구체성, 철거비용을 실제로 누가 부담했는지, 철거 시점이 잔금일 전인지 등을 종합해 과세관청과 조세심판원이 개별 사안별로 판단합니다. 특약 문구를 애매하게 적으면 다투게 될 소지가 큽니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 임의로 철거하면 어떤 세금이 붙나요?</h2>
                <p>
                  주택 비과세가 아니라 토지 양도로 과세되고, 나아가 비사업용 토지 중과까지 검토됩니다. 나대지는 직접 사업이나 거주에 사용되지 않는 토지의 대표적 유형이라 소득세법 §104의3이 정한 비사업용 토지에 해당할 가능성이 있습니다. 비사업용 토지로 확정되면 기본세율(소득세법 §55, 최고 45%)에 10퍼센트포인트가 가산됩니다(§104①8호).
                </p>
                <p>
                  예시로 과세표준이 3억원인 토지 양도라면, 일반세율 기준 3억원×38%−1,994만원(누진공제)≈9,406만원이 산출세액입니다. 같은 과세표준이 비사업용 토지로 중과되면 48%(기본세율 38%+10%p)를 적용해 3억원×48%−누진공제 순으로 계산해야 하므로 실제 세액은 더 커집니다. 정확한 누진공제액은 중과 후 구간 기준으로 다시 산정해야 하니 최종 세액은 홈택스 모의계산이나 세무 전문가를 통해 확인하는 것이 안전합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-2">
                  <p className="text-sm text-text-secondary">
                    정의: 비사업용 토지는 직접 사용하지 않는 나대지·부재지주 농지 등을 말합니다. 핵심: 확정 시 기본세율에 10%p 가산(§104①8호).
                  </p>
                </div>
                <p className="mt-4">
                  다만, 보유기간 전체가 아니라 양도일 직전 일정 기간(예: 5년 중 3년 이상 등 기간 기준)만 비사업용으로 쓰였는지를 따지는 규정과 재해·수용 등으로 인한 부득이한 사유는 예외로 인정될 수 있습니다. 이 부분은 보유·이용 이력에 따라 결론이 달라지므로 세무서나 세무 전문가와 개별 확인이 꼭 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 주택 부수토지로 인정되는 면적은 어디까지인가요?</h2>
                <p>
                  건물 정착면적을 기준으로 지역별 배율이 정해져 있습니다. 주택이 살아 있어 비과세를 받는 경우, 부수토지로 함께 비과세되는 토지 면적은 소득세법 시행령 §154⑦이 정한 배율 이내로 제한됩니다. 이 배율을 넘는 토지 부분은 처음부터 부수토지가 아니라 별도의 토지 양도로 취급됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 2. 주택 부수토지 배율 (소득세법 시행령 §154⑦, 2022년 1월 1일 이후 양도분)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지역 구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">수도권 내 주거·상업·공업지역</td>
                        <td className="p-3">건물 정착면적의 3배</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">수도권 내 녹지지역, 수도권 밖 도시지역</td>
                        <td className="p-3">건물 정착면적의 5배</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">도시지역 밖</td>
                        <td className="p-3">건물 정착면적의 10배</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 이 배율 이내의 토지라도 실제로 주거용이 아니라 사업용으로 쓰이고 있었다면 부수토지로 인정되지 않을 수 있습니다(시행령 §154⑦ 단서). 마당처럼 실제 주거생활 공간으로 쓰인 토지인지가 판단의 핵심입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재건축·재개발로 철거되는 경우도 같은 규칙을 적용하나요?</h2>
                <p>
                  아닙니다. 이 글이 다루는 판정 기준은 일반 매매계약에서 건물을 철거하는 상황을 전제로 합니다. 재건축·재개발 정비사업으로 관리처분계획인가를 받아 조합원 입주권으로 전환된 경우는 도시정비법·소득세법상 별도의 입주권 비과세·과세 규정이 적용되며, 이 글의 매매특약 예외와는 다른 판단 체계를 따릅니다.
                </p>
                <p>
                  따라서 재건축·재개발 대상 주택을 보유하고 있다면 일반 멸실 사례와 혼동하지 말고 조합원 입주권 관련 규정을 별도로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">철거 전에 무엇을 준비해야 안전한가요?</h2>
                <p>
                  계약서에 철거 특약 문구를 구체적으로 남기고, 철거비용 부담 주체를 명확히 기록해 두는 것이 가장 중요합니다. 매매특약 예외를 인정받으려면 사후에 구두로 주장하는 것보다, 계약 체결 시점에 문서로 남긴 근거가 훨씬 유리합니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>계약서 특약 명시:</strong> 철거를 요구한 주체(매수인)와 철거 조건, 철거 시점을 계약서에 구체적으로 기재합니다.
                  </li>
                  <li>
                    <strong>철거비용 부담 기록:</strong> 철거비용을 누가 부담했는지 영수증·계좌이체 내역 등으로 남겨 둡니다.
                  </li>
                  <li>
                    <strong>세무서 사전 상담:</strong> 홈택스 상담이나 관할 세무서 방문을 통해 특약 문구가 판정 요건을 충족하는지 미리 확인합니다.
                  </li>
                  <li>
                    <strong>세무 전문가 검토:</strong> 세액이 큰 거래라면 계약 체결 전에 세무사·회계사와 함께 계약서를 검토받는 것이 안전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 이미 철거가 끝난 뒤에 특약 근거를 뒤늦게 마련하려 하면 인정받기 어렵습니다. 특약과 비용부담 근거는 철거 이전, 늦어도 철거와 동시에 확보해 두어야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/one-house-2-year-residence-requirement-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 2년 거주요건</div>
                    <p className="mt-1 text-sm text-text-secondary">비과세를 받기 위한 보유·거주 기본 요건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">고가주택 비과세 한도와 초과분 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/self-farming-land-100-percent-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자경농지 100% 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">비사업용 토지로 보지 않는 자경농지 감면 요건.</p>
                  </Link>
                  <Link
                    href="/guide/rural-house-one-household-exemption-special-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">농어촌주택 양도세 특례</div>
                    <p className="mt-1 text-sm text-text-secondary">시골집이 있어도 일반주택 1주택 비과세 받는 법.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익을 입력해 예상 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">멸실 전후 공시가격 변동에 따른 재산세를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 멸실주택·나대지의 실제 과세 판정은 계약 경위·특약 문구·철거비용 부담·보유 이력에 따라 달라지므로, 개인 맞춤형 세무·법률 조언이 아닙니다. 반드시 관할 세무서 또는 세무사·변호사 등 전문가와 확인하세요. 본 콘텐츠는 2026-09-28을 기준으로 작성되었으며, 관련 법령·예규·판례 변경 시 업데이트됩니다. 인용 법조항: 소득세법 §55(양도소득세 세율), §89(비과세 양도소득), §104(양도소득세의 세율), §104의3(비사업용 토지의 범위), 소득세법 시행령 §154(1세대1주택의 범위).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://taxlaw.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세법령정보시스템</a>.
                </p>
              </section>

              <ShareButtons
                title="멸실주택 부수토지 양도세 2026 가이드"
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
