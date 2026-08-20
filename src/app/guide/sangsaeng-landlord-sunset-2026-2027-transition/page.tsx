// [revenue-lever: indexing+traffic]
// 2026-08-03 세제개편안 상생임대주택 특례 일몰과 유예 조항 신설
// 색인 표면 확장 + 시즈널 트래픽 흡수 (임대인 매도 시나리오 검색 폭증 예상)
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

const URL = 'https://calculatorhost.com/guide/sangsaeng-landlord-sunset-2026-2027-transition/';
const DATE_PUBLISHED = '2026-08-21';
const DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: '상생임대주택 특례 2026 일몰, 유예 양도기한 2027~2029',
  description:
    '상생임대주택 특례가 2026-12-31 일몰되고 2026-08-03 세제개편안에서 양도기한 유예가 신설됩니다. 2026 종료 계약은 2027-12-31, 2027 이후 종료 계약은 종료 후 1년 또는 2029-12-31 중 빠른 날까지 양도.',
  keywords: [
    '상생임대주택 특례 일몰',
    '상생임대인 2026 종료',
    '상생 양도기한 2027',
    '2026 세제개편 임대인',
    '1세대1주택 거주요건 면제',
    '소득세법 시행령 155조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상생임대주택 특례 2026 일몰과 2027~2029 양도기한 유예' }],
    title: '상생임대주택 특례 2026 일몰, 유예 양도기한 2027~2029',
    description: '상생임대차 계약의 2년 거주요건 면제 혜택을 유지하려면 유예 양도기한 내 매도가 필수. 계약 종료 시점별 정확한 기한 계산.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상생임대주택 특례 2026 일몰과 유예 양도기한 2027~2029',
    description: '2026-08-03 세제개편안 유예 조항 신설. 계약 종료 시점별 양도기한과 사례 3개, 세금 시뮬 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상생임대차 계약을 2027년에 새로 체결해도 특례 적용받을 수 있나요?',
    answer:
      '적용받을 수 없습니다. 상생임대주택 특례의 계약 체결 기한 자체가 2026년 12월 31일까지로, 2027년 이후 새로 체결한 임대차 계약은 인상률이 5% 이내여도 특례 대상이 아닙니다. 2026-08-03 세제개편안의 유예 조항은 신규 계약 기한을 연장하는 것이 아니라, 이미 체결된 상생 계약의 임대 종료 후 매도 시간을 확보해 주는 성격입니다. 특례를 활용하려면 반드시 2026년 안에 계약금 지급까지 완료해야 합니다.',
  },
  {
    question: '유예 기한을 하루라도 넘겨 양도하면 어떻게 되나요?',
    answer:
      '유예 기한을 넘기면 상생임대인 특례가 적용되지 않아, 2년 거주요건을 별도로 충족하지 못한 임대인은 1세대1주택 양도세 비과세 자체를 받지 못합니다. 즉, 양도차익 전액이 과세 대상이 되고 장기보유특별공제도 표1(최대 30%)만 적용됩니다. 계약 종료 시점부터 매수인 물색, 잔금 일정 등 실무 절차를 감안하면 기한 6개월 전에는 매도 준비를 시작하는 편이 안전합니다.',
  },
  {
    question: '계약 종료일은 계약서상 만료일과 실제 명도일 중 무엇이 기준인가요?',
    answer:
      '실무상 국세청은 계약이 실제로 종료돼 임차인 명도가 완료된 시점을 기준으로 보는 사례가 많습니다. 계약서상 만료일 이후에도 임차인이 실거주 중이라면 임대차 관계가 존속하는 것으로 판단될 여지가 있어, 유예 기산일이 실제 명도일까지 밀릴 수 있습니다. 반대로 조기 명도 합의로 임차인이 조기 퇴거한 경우에는 그 시점이 종료일이 됩니다. 개별 사안은 관할 세무서 유권해석으로 확정하는 것이 안전합니다.',
  },
  {
    question: '계약 종료 후 1년보다 2029-12-31이 더 빠른 케이스는 언제 발생하나요?',
    answer:
      '계약 종료일이 2028년 12월 31일 이후라면 종료 후 1년 시점이 2029-12-31을 넘어가므로 절대 상한인 2029-12-31이 우선 적용됩니다. 예컨대 2029년 3월에 종료된 계약은 종료 후 1년이 2030년 3월이지만, 유예 상한이 2029-12-31이므로 실제 양도기한은 2029-12-31로 짧아집니다. 특례 일몰 직전 체결분은 이 상한선을 반드시 염두에 두어야 합니다.',
  },
  {
    question: '유예 기한 내 양도하지 못했지만 그 사이 실거주 2년을 채웠다면 비과세가 가능한가요?',
    answer:
      '가능합니다. 상생임대인 특례가 아니더라도 1세대1주택 비과세의 원칙적 요건인 보유 2년(조정대상지역은 거주 2년)을 스스로 충족했다면, 그 자체로 소득세법 §89의 비과세 요건을 충족한 것입니다. 즉, 유예 기한 초과는 상생 특례 트랙이 종료된 것일 뿐, 실거주 트랙으로 갈아탈 수 있으면 여전히 비과세 대상입니다. 다만 이 경우 장기보유특별공제 표2의 거주기간은 실제 거주한 기간으로 재계산됩니다.',
  },
  {
    question: '임대사업자로 등록해야 상생임대인 특례를 받을 수 있나요?',
    answer:
      '임대사업자 등록 여부와 무관합니다. 상생임대주택 특례는 소득세법 시행령 §155의3에 따른 요건(직전 대비 5% 이내 인상, 2021-12-20~2026-12-31 기간 내 계약, 2년 이상 임대)만 충족하면 적용되며, 세무서·지자체 임대사업자 등록을 요구하지 않습니다. 반대로 임대사업자로 등록해도 위 요건을 충족하지 못하면 상생 특례가 아닌 별도의 임대주택 세제 혜택 트랙을 검토해야 합니다.',
  },
  {
    question: '상속이나 증여로 취득한 주택도 유예 조항 대상이 되나요?',
    answer:
      '취득 원인 자체가 특례 배제 사유는 아닙니다. 상생임대차 계약을 승계하거나 새로 체결해 요건을 충족하면 원칙적으로 특례 적용이 가능하며, 유예 조항 역시 마찬가지입니다. 다만 상속 개시 시점, 상속인의 1세대1주택 요건 충족 여부, 승계된 계약의 실질 등이 복잡하게 얽히므로 개별 사안은 국세청 상담센터(126)나 세무사 검토가 필수입니다.',
  },
];

export default function SangsaengLandlordSunsetPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상생임대주택 특례 2026 일몰과 유예 양도기한' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상생임대주택 특례 2026 일몰, 유예 양도기한 2027~2029',
    description:
      '2026년 12월 31일 일몰되는 상생임대주택 특례. 2026-08-03 세제개편안이 신설한 유예 양도기한(2026 종료 계약은 2027-12-31, 2027 이후 종료 계약은 종료 후 1년 또는 2029-12-31 중 빠른 날)의 정확한 계산과 사례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '상생임대주택 특례 일몰',
      '상생임대인 2026 종료',
      '상생 양도기한 2027',
      '2026 세제개편 임대인',
      '1세대1주택 거주요건 면제',
      '소득세법 시행령 155조의3',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상생임대주택 특례 2026 일몰과 유예 양도기한',
    description:
      '상생임대주택 특례 2026-12-31 일몰과 2026-08-03 세제개편안 유예 조항 신설. 계약 종료 시점별 양도기한 계산과 실무 사례.',
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
                    { name: '상생임대주택 특례 2026 일몰과 유예 양도기한' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">1주택 임대인 · 9분 읽기 · 2026-08-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상생임대주택 특례 2026 일몰,
                  <br />
                  <span className="text-2xl text-text-secondary">· 유예 양도기한 2027~2029 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 8월 3일 발표된 세제개편안은 상생임대주택 특례를 2026년 12월 31일부로 일몰 종료하되, 이미 상생임대차 계약을 맺은 임대인의 신뢰이익 보호를 위해 양도기한 유예를 신설했습니다. 이 가이드는 계약 종료 시점별 유예 기한, 요건 변화, 세금 차이, 실제 매도 사례 3개까지 정리해 지금 상생 계약 중인 임대인이 언제까지 매도해야 혜택을 유지할 수 있는지를 한 번에 답합니다.
                </p>
              </header>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-4" data-speakable>
                <p className="font-semibold text-text-primary">30초 요약</p>
                <ul className="space-y-2 text-sm text-text-secondary list-disc ml-5">
                  <li>상생임대주택 특례는 2026-12-31 일몰 종료. 2027년 이후 신규 계약은 특례 대상 아님.</li>
                  <li>기존 상생 계약자에게 유예 양도기한 신설: 계약이 2026년 안에 끝났으면 2027-12-31까지, 2027년 이후 끝났으면 종료 후 1년 또는 2029-12-31 중 빠른 날까지.</li>
                  <li>혜택은 양도세 전액 감면이 아니라 1세대1주택 비과세와 장특공제 표2의 2년 거주요건 면제.</li>
                  <li>유예 조항은 세제개편안 국회 통과와 시행령 개정 후 최종 확정.</li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">특례가 언제 끝나고 유예는 무엇인가</h2>
                <p>
                  결론부터 말하면, 상생임대주택 특례는 2026년 12월 31일 일몰됩니다. 2026-08-03 세제개편안은 특례를 연장하지 않고 종료하는 대신, 이미 상생임대차 계약을 맺고 임대 중인 임대인의 신뢰이익 보호를 위해 양도기한 요건이라는 유예 조항을 신설했습니다.
                </p>
                <p>
                  기존 상생임대차 계약을 체결한 임대인은 이 유예 기한 내에 주택을 양도해야만 1세대1주택 양도세 비과세와 장기보유특별공제 표2에 필요한 2년 거주요건 면제 혜택을 유지할 수 있습니다. 기한을 넘기면 실거주 2년을 충족하지 않은 상태에서 비과세 요건 자체를 잃게 되므로, 계약 종료 시점부터 역산해 매도 시나리오를 짜는 것이 이번 개편의 핵심 과제입니다.
                </p>
                <p>
                  법적 근거는 소득세법 §89(양도소득세 비과세)와 시행령 §155의3(상생임대주택 특례)이며, 유예 조항은 세제개편안이 국회를 통과해 시행령 개정이 완료되어야 최종 확정됩니다. 다만 정부 확정 발표 기준이므로 시장에서는 이 프레임에 맞춰 매도 시점을 조율하는 것이 현실적입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유예 기한 정확히: 2026 종료 vs 2027 이후 종료</h2>
                <p>
                  2026-08-03 세제개편안의 유예 조항은 상생임대차 계약이 언제 종료되느냐에 따라 두 갈래로 나뉩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상생임대주택 특례 유예 양도기한 (2026-08-03 세제개편안 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상생 계약 종료 시점</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">양도기한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특징</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2026-12-31 이전 종료</td>
                        <td className="p-3"><strong>2027-12-31까지</strong></td>
                        <td className="p-3">임대 완주 후 매도 유예 1년</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2027-01-01 이후 종료</td>
                        <td className="p-3"><strong>계약 종료 후 1년 또는 2029-12-31 중 빠른 날</strong></td>
                        <td className="p-3">절대 상한 2029-12-31 존재</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  첫 번째 갈래는 특례 자체가 유효한 기간 안에 계약이 이미 완주한 케이스입니다. 임대 종료 시점이 특례 일몰과 겹치므로 시장에 매물을 내놓을 시간을 1년 더 부여했다고 보면 됩니다.
                </p>
                <p>
                  두 번째 갈래는 특례 일몰 이후에 임대가 끝나는 케이스입니다. 계약 종료 시점을 기준으로 1년의 처분 유예를 주되, 2029-12-31이라는 절대 상한을 두어 유예가 무기한 늘어나지 않도록 막았습니다. 예컨대 2028-06 종료 계약은 2029-06까지, 2028-12 종료 계약은 2029-12까지 양도해야 하지만, 2029-03 종료 계약은 종료 후 1년(2030-03)이 상한을 넘으므로 실제로는 2029-12-31이 최종 기한이 됩니다.
                </p>
                <p>
                  다만, 유예 기산일이 계약서상 만료일인지 실제 임차인 명도일인지는 국세청 유권해석과 시행령 문언에 따라 조정될 수 있으므로, 종료 시점이 임박한 임대인은 반드시 관할 세무서에 사전 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상생임대차 계약의 3가지 기본 요건 (변경 없음)</h2>
                <p>
                  유예 조항이 신설되어도 상생임대차 계약 자체의 요건은 변하지 않습니다. 소득세법 시행령 §155의3에 명시된 3가지 요건을 모두 충족해야 유예 기한 안에서 혜택을 이어받을 수 있습니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>임대료 인상률 5% 이내</strong>: 직전 임대차 계약 대비 임대료 인상률이 5%를 넘지 않아야 합니다. 보증금과 월세를 함께 조정한 경우 주택임대차보호법상 전월세전환율을 준용해 환산 임대료를 산정한 뒤 5% 이내인지 판정합니다.
                  </li>
                  <li>
                    <strong>계약 기간</strong>: 상생임대차 계약은 2021년 12월 20일부터 2026년 12월 31일 사이에 체결하고 계약금을 지급해야 합니다. 이 기간을 벗어난 계약은 아무리 인상률이 5% 이하여도 특례 대상이 아닙니다.
                  </li>
                  <li>
                    <strong>실질 2년 임대</strong>: 해당 상생 계약으로 실제 2년 이상 임대해야 합니다. 임차인이 중도 퇴거해도 다른 임차인과 조건을 이어받아 총 2년을 채우면 인정될 수 있으나, 계약 중단과 재체결 사이의 공실 기간이 길어지면 국세청 판단이 엇갈릴 수 있어 주의가 필요합니다.
                  </li>
                </ol>
                <p className="mt-4">
                  다만, 위 3가지는 특례 진입 요건이고, 이번 유예 조항은 이 요건을 갖춘 계약에 한해 매도 시간을 추가로 부여하는 성격이라는 점을 잊지 말아야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">혜택의 정확한 범위: 무엇이 면제되나</h2>
                <p>
                  상생임대주택 특례는 양도세를 전액 감면하는 제도가 아닙니다. 이 부분을 오해하면 세금 계획 전체가 틀어질 수 있으므로 정확히 짚고 넘어가야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">특례가 실제로 없애 주는 것 2가지</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>1세대1주택 양도세 비과세를 받기 위한 <strong>2년 거주요건</strong> (조정대상지역 지정 후 취득분에 요구)</li>
                    <li>장기보유특별공제 표2(1세대1주택)를 적용받기 위한 <strong>2년 거주기간</strong> 요건</li>
                  </ul>
                </div>
                <p className="mt-4">
                  즉, 실거주하지 않고 임대만 놓았어도 위 두 혜택을 그대로 받을 수 있게 해 주는 것이 특례의 본질입니다. 반대로 1세대1주택 12억 비과세 한도(소득세법 §89 제1항 제3호), 다주택자 중과세, 조정대상지역 규제 등은 상생임대인 여부와 무관하게 동일하게 적용됩니다.
                </p>
                <p>
                  다만, 양도가액이 12억을 초과하면 초과분에 대한 양도세는 여전히 부과됩니다. 이때 장기보유특별공제 표2의 최대 80%(보유 40% + 거주 40%) 공제가 실질 절세 통로가 되는데, 상생임대인은 거주기간 2년을 인정받아 거주 40% 트랙의 진입 문턱을 넘게 됩니다. 이 점이 상생임대인 특례의 실질 가치이자, 유예 기한 안에 반드시 매도해야 하는 이유입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">지금 계약 중이라면 언제까지 양도해야 하나 (사례 3개)</h2>
                <p>
                  실제 매도 시나리오를 사례별로 계산해 봅니다. 계약 종료 시점만 파악하면 유예 양도기한이 자동으로 결정됩니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 2024년 3월 체결, 2026년 3월 종료 (2년 임대 완주)</p>
                  <p className="text-sm text-text-secondary">
                    · 계약 종료 시점: 2026-12-31 이전 종료
                    <br />
                    · 적용 조항: 유예 트랙 1
                    <br />
                    · 양도기한: <strong>2027-12-31까지</strong>
                    <br />
                    · 실무 판단: 임대가 이미 끝났으므로 2027년 안에 매도 완료. 매수 관망세가 짙다면 2027년 상반기까지 매수인 조율을 끝내는 편이 안전합니다.
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 2025년 6월 체결, 2027년 6월 종료</p>
                  <p className="text-sm text-text-secondary">
                    · 계약 종료 시점: 2027-01-01 이후 종료
                    <br />
                    · 계산: 계약 종료 후 1년 = 2028-06, 절대 상한 = 2029-12-31
                    <br />
                    · 적용 조항: 유예 트랙 2, 둘 중 빠른 날 적용
                    <br />
                    · 양도기한: <strong>2028-06-30까지</strong>
                    <br />
                    · 실무 판단: 임대 종료 즉시 매도 준비 착수 필수. 세입자 명도와 잔금 일정을 감안하면 2028년 초부터 매물을 접수해야 마감을 지킬 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 2026년 11월 체결, 2028년 11월 종료 (특례 일몰 직전 체결)</p>
                  <p className="text-sm text-text-secondary">
                    · 계약 종료 시점: 2027-01-01 이후 종료
                    <br />
                    · 계산: 계약 종료 후 1년 = 2029-11, 절대 상한 = 2029-12-31
                    <br />
                    · 적용 조항: 유예 트랙 2, 둘 중 빠른 날 적용
                    <br />
                    · 양도기한: <strong>2029-11-30까지</strong>
                    <br />
                    · 실무 판단: 특례 일몰 직전 체결분이지만 유예 덕에 2029년 말까지 처분 시간이 확보됩니다. 다만 2029년 매매 시장 상황을 예측하기 어려우므로 종료 6개월 전 매물 등록 권장.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상생 특례를 못 쓰면 세금은 얼마나 늘어나나</h2>
                <p>
                  상생임대인 특례를 활용해 실거주 없이 1세대1주택 비과세를 받는 경우와, 유예 기한을 놓쳐 비과세 자체가 무산되는 경우의 세금 차이를 시뮬레이션으로 확인해 봅니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  전제: 양도가 15억, 취득가 10억, 보유 10년, 임대 4년, 실거주 0년, 조정대상지역 취득분 (누진공제는 소득세법 §55 기본세율).
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">경우 A. 상생임대인 특례 적용 (2년 거주요건 면제)</p>
                  <p className="text-sm text-text-secondary">
                    · 12억 이하 부분은 1세대1주택 비과세
                    <br />
                    · 12억 초과분 3억에 대해서만 과세 대상 (양도차익 비율 = 3억/15억 = 20%)
                    <br />
                    · 초과분 양도차익 = 5억 x 20% = 1억
                    <br />
                    · 장기보유특별공제 표2: 보유 10년 40% + 거주 0년(상생 인정 2년으로 8%)
                    <br />
                    · 실제 계산은 시행령 부칙과 표2 세부 산식에 따라 달라지지만 초과분 산출세액 대략 1천만 원 안팎
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">경우 B. 유예 기한 초과 (실거주 없어 비과세 자체 불가)</p>
                  <p className="text-sm text-text-secondary">
                    · 양도차익 5억 전액 과세
                    <br />
                    · 장기보유특별공제 표1(일반) 보유 10년 20% 적용
                    <br />
                    · 과세표준 약 4억 원, 종합소득세 기본세율 40% 구간 (누진공제 2,594만 원)
                    <br />
                    · 산출세액 대략 1억 3천만 원대 (지방소득세 10% 별도)
                  </p>
                </div>

                <p className="mt-4">
                  두 시나리오의 세액 차이는 대략 1억 원 이상으로, 상생임대인 특례를 유예 기한 안에 활용할 수 있느냐 없느냐가 임대인의 매도 시점 선택에 결정적입니다. 다만 실제 세액은 지방소득세, 개별 취득가액, 필요경비 등에 따라 달라지므로 국세청 홈택스 모의계산과 세무사 상담을 반드시 병행하십시오.
                </p>
                <p>
                  구체적 세액 시뮬은 우리 사이트의 양도소득세 계산기에서 조건을 바꿔가며 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">다만, 개편안 통과 대기와 실무 주의</h2>
                <p>
                  주의해야 할 점이 있습니다. 2026-08-03 세제개편안의 유예 조항은 아직 국회 통과 전이며, 최종 확정은 시행령 개정 고시 이후입니다. 그 사이 세부 요건이나 기한 문구가 조정될 여지가 남아 있으므로, 매도 시점이 임박한 임대인은 국세청 유권해석과 시행령 개정안 공포 시점을 반드시 확인하세요.
                </p>
                <p>
                  또한 계약 종료 시점 판단은 계약서상 만료일이 아니라 실제 임차인 명도가 완료된 날을 기준으로 하는 사례가 있으므로, 계약 종료 근접 시점에는 국세청 상담센터(126) 또는 관할 세무서에 개별 사안을 확인해 두는 것이 안전합니다.
                </p>
                <p>
                  세제개편안의 국회 통과와 시행령 개정 진행 상황은 기획재정부 보도자료와 국가법령정보센터에서 상시 확인할 수 있으며, 개정 문언 확정 시 본 가이드도 즉시 갱신됩니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/cooperative-landlord-capital-gains-exemption-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상생임대인 특례 기본 요건 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">5% 인상 요건, 계약 판정 방법, 4가지 진입 조건 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">고가주택 초과분 계산법과 실제 세액 산출 순서.</p>
                  </Link>
                  <Link
                    href="/guide/one-house-2-year-residence-requirement-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1주택 2년 거주요건 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">조정대상지역 거주요건의 원칙과 예외 케이스.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-general-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 표1 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반 트랙 최대 30% 공제 산정과 표2와의 차이.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">조건 입력만으로 상생 적용 여부별 세액을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세를 한자리에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 2026-08-03 세제개편안의 유예 조항은 국회 통과와 시행령 개정 후 최종 확정되며, 개정 진행 상황에 따라 세부 문언이 조정될 수 있습니다. 실제 계약 종료일 판정, 양도기한 계산, 최종 세액은 반드시 국세청 상담센터(126) 또는 관할 세무서·세무사와 확인하세요. 본 콘텐츠는 2026-08-21을 기준으로 작성되었으며, 관련 법령은 <strong>소득세법 §89(양도소득세 비과세)</strong>와 <strong>동법 시행령 §155의3(상생임대주택 특례)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(소득세법·동법 시행령)</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부 세제개편안 보도자료</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(상생임대주택 특례 안내)</a>.
                </p>
              </section>

              <ShareButtons
                title="상생임대주택 특례 2026 일몰과 유예 양도기한 가이드"
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
