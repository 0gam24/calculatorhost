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

const URL = 'https://calculatorhost.com/guide/overseas-real-estate-acquisition-report-2026/';
const DATE_PUBLISHED = '2026-09-07';
const DATE_MODIFIED = '2026-09-07';

export const metadata: Metadata = {
  title: '해외부동산 취득·보유 신고 의무 2026, 미신고 과태료',
  description:
    '해외부동산을 사면 외국환거래법에 따른 사전신고와 취득·수시·처분보고, 소득세법 §165의2에 따른 국세청 명세서 제출까지 이중으로 이행해야 합니다. 신고를 놓치면 외국환거래법상 최대 1억원, 명세서 미제출은 취득가액의 10%가 과태료로 부과되므로 절차와 기한을 정리했습니다.',
  keywords: [
    '해외부동산 신고',
    '해외부동산 취득신고',
    '해외부동산 보유신고',
    '외국환거래법 부동산',
    '해외부동산 명세서',
    '소득세법 165조의2',
    '해외부동산 과태료',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '해외부동산 취득·보유 신고 의무 2026, 미신고 과태료' }],
    title: '해외부동산 취득·보유 신고 의무 2026, 이중 신고 절차 정리',
    description: '외국환거래법 사전신고·3종 보고와 소득세법 §165의2 명세서 제출을 기한별로 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '해외부동산 취득·보유 신고 의무 2026, 미신고 과태료',
    description: '외국환거래법 사전신고·3종 보고 + 소득세법 §165의2 명세서 제출까지 이중 신고 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '해외부동산 취득 신고는 금액이 얼마 이상부터 해야 하나요?',
    answer:
      '금액 기준 없이 원칙적으로 해외부동산을 취득하는 거주자는 신고 대상입니다(외국환거래규정 §9-39). 취득자금이 해외에서 형성한 재산이면 지정거래외국환은행 신고, 국내에서 조달한 자금이 섞이면 한국은행 신고로 창구가 나뉩니다. 다만 국세청 명세서 제출의무는 이와 별개로 물건별 취득가액 2억원 이상부터 발생합니다(소득세법 §165의2).',
  },
  {
    question: '신고 없이 송금하면 바로 형사처벌을 받나요?',
    answer:
      '금액과 고의성에 따라 다릅니다. 외국환거래법 §18①에 따른 자본거래 신고를 하지 않고 송금하면 §32①에 따라 1억원 이하의 과태료 대상이 되며, 금액이 크거나 상습적인 경우에는 §29 벌칙에 따라 형사처벌 대상이 될 수 있습니다. 과태료와 벌칙은 중복 부과되지 않고 사안의 경중에 따라 하나만 적용됩니다.',
  },
  {
    question: '사전신고를 마쳤는데 또 제출할 서류가 있나요?',
    answer:
      '있습니다. 사전신고 수리 후에도 송금(취득) 후 3개월 이내 취득보고서, 보유 중 2년마다 수시보고서, 처분하거나 명의를 바꾸면 그 후 3개월 이내 처분(변경)보고서를 지정거래외국환은행에 각각 제출해야 합니다. 사전신고 한 번으로 끝나는 절차가 아닙니다.',
  },
  {
    question: '외국환 신고와 국세청 명세서 중 하나만 해도 되나요?',
    answer:
      '안 됩니다. 두 제도는 근거 법령과 목적이 다릅니다. 외국환 신고·보고는 외국환거래법·외국환거래규정에 따른 자본거래 관리이고, 명세서 제출은 소득세법 §165의2에 따른 과세자료 확보입니다. 하나를 이행했다고 다른 하나가 자동으로 면제되지 않으므로 둘 다 챙겨야 합니다.',
  },
  {
    question: '상속·증여로 해외부동산을 받은 경우도 신고 대상인가요?',
    answer:
      '그럴 수 있습니다. 소득세법상 명세서 제출의무는 취득 원인을 매매로 한정하지 않으므로 상속·증여로 취득한 경우도 대상이 될 수 있습니다. 다만 신고·보고 창구와 필요 서류가 매매와 다를 수 있어 개별 사안은 지정거래외국환은행과 관할 세무서에 확인하는 것이 안전합니다.',
  },
  {
    question: '해외금융계좌 신고와는 무엇이 다른가요?',
    answer:
      '대상 자산이 다릅니다. 이 글이 다루는 해외부동산 신고·명세서는 부동산과 그에 관한 권리가 대상이고, 해외금융계좌 신고는 예금·주식·펀드 등 금융계좌 잔액 합계가 매월 말일 중 하루라도 5억원을 넘을 때 국제조세조정에 관한 법률에 따라 이행하는 별도 제도입니다. 두 요건에 모두 해당하면 각각 신고해야 합니다.',
  },
  {
    question: '신고 서식은 어디서 구할 수 있나요?',
    answer:
      '외국환거래규정에 따른 신고서·취득보고서·수시보고서·처분보고서 서식은 거래를 지정한 지정거래외국환은행 영업점에서 받을 수 있습니다. 소득세법상 해외부동산 취득·보유·투자운용(임대) 및 처분 명세서 서식은 국세청 홈택스와 관할 세무서에서 확인할 수 있습니다.',
  },
];

export default function OverseasRealEstateAcquisitionReport2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '해외부동산 취득·보유 신고 의무 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '해외부동산 취득·보유 신고 의무 2026, 이중 신고 절차 정리',
    description:
      '해외부동산 취득 시 외국환거래법상 사전신고·취득보고·수시보고·처분보고와 소득세법 §165의2에 따른 국세청 명세서 제출 의무를 기한·과태료와 함께 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['해외부동산 신고', '외국환거래법', '소득세법 165조의2', '해외부동산 명세서', '해외부동산 과태료'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '해외부동산 취득·보유 신고 의무 2026',
    description:
      '해외부동산 사전신고·취득보고·수시보고·처분보고(외국환거래법)와 국세청 명세서 제출(소득세법 §165의2) 절차·기한·과태료 정리.',
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
                    { name: '해외부동산 취득·보유 신고 의무 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·해외자산 · 8분 읽기 · 2026-09-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  해외부동산 취득·보유 신고 의무 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 신고 안 하면 얼마나 물나요</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  해외에 집이나 건물을 사면 등기만으로 끝나지 않습니다. 외국환거래법에 따라 송금 전 신고, 취득 후 3개월 이내 보고, 보유 중 2년마다 수시보고, 처분 후 3개월 이내 처분보고까지 챙겨야 하고, 취득가액이 2억원을 넘으면 소득세법 §165의2에 따라 국세청에도 별도 명세서를 내야 합니다. 이 가이드는 두 신고 체계의 절차와 기한, 놓쳤을 때의 과태료를 실제 순서대로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">해외부동산을 사면 왜 신고할 곳이 두 군데인가요?</h2>
                <p>
                  근거 법령과 목적이 서로 다르기 때문입니다. 하나는 외화 자금이 해외로 나가는 것을 관리하는 외국환거래법 체계이고, 다른 하나는 국외 재산 보유 현황을 파악하기 위한 소득세법 체계입니다. 외국환거래법 §18①은 거주자가 자본거래(해외부동산 취득 포함)를 할 때 신고하도록 정하고, 구체적인 절차는 외국환거래규정 §9-39에서 지정거래외국환은행 또는 한국은행 신고로 나누어 규정합니다.
                </p>
                <p>
                  반면 소득세법 §165의2는 이미 자금 송금이 끝난 뒤 국외에 어떤 재산을 얼마나 갖고 있는지를 국세청이 파악하기 위한 별도 자료제출 제도입니다. 즉 하나는 "돈이 나가기 전" 확인 절차이고, 다른 하나는 "얼마짜리 재산을 갖고 있는지" 사후 신고 절차입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 해외부동산 취득 시 외국환거래법상 신고·보고와 소득세법상 명세서 제출을 함께 이행해야 하는 의무.
                    <br />
                    외국환 신고: 지정거래외국환은행 또는 한국은행(외국환거래규정 §9-39).
                    <br />
                    국세청 명세서: 물건별 취득·처분가액 2억원 이상, 다음 해 6월 30일까지(소득세법 §165의2).
                    <br />
                    미신고 불이익: 외국환거래법상 최대 1억원, 명세서 미제출은 취득가액의 10%.
                  </p>
                </div>
                <p className="mt-4">
                  다만, 두 제도 모두 "취득했다"는 사실 하나로 끝나지 않습니다. 아래에서 취득 전 신고, 취득 후 3종 보고, 국세청 명세서 순서로 나누어 각각의 기한을 확인합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득 전에 어떤 신고를 해야 하나요?</h2>
                <p>
                  자금을 송금하기 전에 지정거래외국환은행 또는 한국은행에 해외부동산 취득 신고를 해야 합니다(외국환거래규정 §9-39). 해외에서 이미 형성한 자금(해외 근무 급여, 해외 예금 등)만으로 취득한다면 지정거래외국환은행 신고 대상이 되는 경우가 많고, 국내 대출이나 국내 자금이 함께 들어간다면 한국은행 신고가 필요한 경우가 있어 은행 창구에서 자금 출처별로 확인해야 합니다.
                </p>
                <table className="w-full text-sm border-collapse">
                  <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 해외부동산 신고·보고 핵심 기한 (외국환거래규정 §9-39·소득세법 §165의2)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                      <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기한</th>
                      <th scope="col" className="text-left p-3 font-semibold bg-bg-card">제출처</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="p-3">취득 사전신고</td>
                      <td className="p-3">송금 전</td>
                      <td className="p-3">지정거래외국환은행 또는 한국은행</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card/50">
                      <td className="p-3">취득보고서</td>
                      <td className="p-3">취득(송금) 후 3개월 이내</td>
                      <td className="p-3">지정거래외국환은행</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="p-3">수시보고서</td>
                      <td className="p-3">2년마다</td>
                      <td className="p-3">지정거래외국환은행</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card/50">
                      <td className="p-3">처분(변경)보고서</td>
                      <td className="p-3">처분·명의변경 후 3개월 이내</td>
                      <td className="p-3">지정거래외국환은행</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="p-3">해외부동산 명세서</td>
                      <td className="p-3">취득·처분한 해의 다음 해 6월 30일까지</td>
                      <td className="p-3">납세지 관할 세무서(국세청)</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4">
                  다만, 신고와 송금은 한 은행(지정거래외국환은행)을 통해서만 진행하는 것이 원칙입니다. 여러 은행에서 나눠 신고하면 이후 보고 단계에서 이력 확인이 꼬일 수 있으므로 처음부터 거래 은행을 하나로 정해 두는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득한 뒤에는 어떤 보고 의무가 남아 있나요?</h2>
                <p>
                  사전신고 수리로 끝나지 않고 3단계 사후보고가 이어집니다. 먼저 자금을 송금해 실제로 부동산을 취득한 뒤 3개월 이내에 취득보고서를 지정거래외국환은행에 제출해야 합니다. 이후 부동산을 계속 보유하는 동안에는 2년마다 계속 보유 사실을 입증하는 서류(등기부등본 등 현지 서류)와 함께 수시보고서를 제출해야 합니다.
                </p>
                <p>
                  마지막으로 부동산을 처분하거나 명의를 바꾸면 그 처분·변경일로부터 3개월 이내에 처분(변경)보고서를 제출해야 합니다. 세 단계 보고 중 하나라도 놓치면 사전신고 자체는 유효해도 사후관리 의무 위반으로 지적될 수 있습니다.
                </p>
                <p className="mt-4">
                  다만, 2년마다 돌아오는 수시보고는 스스로 날짜를 챙기지 않으면 놓치기 쉬운 항목입니다. 취득보고서를 제출한 날을 기준으로 다음 수시보고 시점을 달력이나 메모에 미리 표시해 두는 것이 실무적으로 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국세청에도 따로 신고해야 하나요?</h2>
                <p>
                  물건별 취득가액 또는 처분가액이 2억원 이상이면 국세청에도 별도로 신고해야 합니다. 소득세법 §165의2에 따라 거주자가 해외부동산이나 이에 관한 권리를 취득·보유·투자운용(임대)하거나 처분한 경우, 그 물건별 취득가액 또는 처분가액이 2억원 이상이면 "해외부동산등의 취득·보유·투자운용(임대) 및 처분 명세서"를 납세지 관할 세무서에 제출해야 합니다.
                </p>
                <p>
                  제출기한은 과세기간(12월 31일) 종료일이 속하는 달의 말일부터 6개월 이내로, 통상 취득·보유·처분한 해의 다음 해 6월 30일까지입니다. 종합소득세 확정신고 기한(통상 5월 31일)과는 별개의 기한이므로 혼동하지 않아야 합니다.
                </p>
                <p className="mt-4">
                  다만, 취득이나 처분이 없는 해라도 단순히 보유만 하고 있고 임대하지 않았더라도 제출의무가 발생할 수 있습니다. "올해는 거래가 없었으니 안 내도 된다"고 넘기지 말고, 보유 중인 해외부동산이 있다면 매년 제출 대상 여부를 확인하는 습관이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고를 놓치면 어떤 불이익이 있나요?</h2>
                <p>
                  두 제도의 과태료 산정 방식이 다릅니다. 외국환거래법 §18①에 따른 신고를 하지 않거나 거짓으로 신고하고 자본거래를 하면 같은 법 §32①에 따라 1억원 이하의 과태료가 부과됩니다. 소득세법상 해외부동산 명세서를 제출하지 않거나 거짓으로 제출하면 취득가액(또는 처분가액)의 10%가 과태료로 부과됩니다.
                </p>
                <table className="w-full text-sm border-collapse">
                  <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 미신고 시 불이익 비교</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="text-left p-3 font-semibold bg-bg-card">위반 유형</th>
                      <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      <th scope="col" className="text-left p-3 font-semibold bg-bg-card">불이익</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="p-3">외국환 신고 미이행·거짓신고</td>
                      <td className="p-3">외국환거래법 §32①</td>
                      <td className="p-3">1억원 이하 과태료</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card/50">
                      <td className="p-3">금액이 크거나 상습적인 위반</td>
                      <td className="p-3">외국환거래법 §29</td>
                      <td className="p-3">형사처벌 대상 가능</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="p-3">해외부동산 명세서 미제출·거짓제출</td>
                      <td className="p-3">소득세법 §165의2</td>
                      <td className="p-3">취득가액(처분가액)의 10% 과태료</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4">
                  다만, 과태료와 형사처벌은 함께 부과되지 않습니다. 외국환거래법 §32①은 §29 벌칙 대상에 해당하는 경우를 과태료 부과 대상에서 제외하도록 정하고 있어, 위반의 경중에 따라 둘 중 하나만 적용됩니다. 어느 쪽에 해당하는지는 금액·경위·반복 여부에 따라 사안별로 판단됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">해외금융계좌 신고와는 뭐가 다른가요?</h2>
                <p>
                  대상 자산 자체가 다릅니다. 이 글이 다루는 해외부동산 신고·명세서는 부동산과 그에 관한 권리가 대상이고, 해외금융계좌 신고는 예금·주식·펀드·가상자산 등 금융계좌 잔액 합계가 매월 말일 중 하루라도 5억원을 넘을 때 국제조세조정에 관한 법률(§52 이하)에 따라 이행하는 별도 제도입니다.
                </p>
                <p>
                  해외부동산 취득 자금을 해외 계좌에서 인출해 송금했다면, 그 계좌 잔액이 별도로 5억원 기준을 넘는지도 함께 점검해야 합니다. 두 요건에 모두 해당하면 부동산 신고·명세서와 금융계좌 신고를 각각 별도로 이행해야 하며, 자세한 대상·기한·과태료는{' '}
                  <Link href="/guide/overseas-financial-account-reporting-2026/" className="text-primary-500 underline">
                    해외금융계좌 신고 가이드
                  </Link>
                  에서 확인할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만, 해외부동산을 팔아 생긴 양도차익은 신고 의무와 별개로 국내 거주자라면 원칙적으로 양도소득세 과세 대상입니다. 신고·명세서 제출을 마쳤다고 세금 신고까지 끝난 것은 아니므로, 처분 시점에는 양도소득세 신고 여부도 함께 확인해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/overseas-financial-account-reporting-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외금융계좌 신고 대상 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">5억원 초과 해외 금융계좌 신고 기한·과태료 정리.</p>
                  </Link>
                  <Link
                    href="/guide/overseas-stock-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외주식 양도소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국외자산 양도소득세 공제·세율·신고 방법.</p>
                  </Link>
                  <Link
                    href="/guide/currency-exchange-fee-preferential-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">환전 수수료·환율 우대율</div>
                    <p className="mt-1 text-sm text-text-secondary">해외 송금 시 매매기준율·스프레드 계산법.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부동산 처분 시 예상 양도소득세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/exchange/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">환율 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">해외송금·현지 통화 환산 금액을 바로 확인.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률·세무 조언이 아닙니다. 해외부동산 신고·보고의 실제 요건은 자금 출처, 취득 방식, 거주자 판정 등 구체적 사정에 따라 달라지므로 반드시 지정거래외국환은행, 관할 세무서 또는 관세사·세무사 등 전문가와 확인하세요. 본 콘텐츠는 2026-09-07을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 외국환거래법 §18(자본거래의 신고), §29(벌칙), §32(과태료), 외국환거래규정 §9-39(해외부동산 취득), 소득세법 §165의2(국외자산 명세서 제출의무). 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.bok.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국은행 외환거래 안내</a>.
                </p>
              </section>

              <ShareButtons
                title="해외부동산 취득·보유 신고 의무 2026 가이드"
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
