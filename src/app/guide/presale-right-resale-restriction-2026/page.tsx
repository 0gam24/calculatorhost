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

// [revenue-lever: indexing+traffic]
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 6개(분양권 양도세·분양권 취득세·청약 재당첨제한·청약가점·부동산허브·세금허브).
// traffic: "분양권 전매제한 기간"·"전매제한 위반 처벌"·"당첨 포기 재당첨 제한" 롱테일 흡수(주택법 §64·§101).

const URL = 'https://calculatorhost.com/guide/presale-right-resale-restriction-2026/';
const DATE_PUBLISHED = '2026-08-16';
const DATE_MODIFIED = '2026-08-16';

export const metadata: Metadata = {
  title: '분양권 전매제한 2026, 기간·위반 처벌·재당첨 제한 정리',
  description:
    '분양권 전매제한은 당첨된 아파트 분양권을 일정 기간 팔지 못하게 하는 규제입니다(주택법 §64). 지역과 주택 유형에 따라 기간이 다르고, 위반하면 3년 이하 징역 또는 3천만원 이하 벌금과 청약 제한이 따릅니다. 기간 확인법과 유의점을 정리했습니다.',
  keywords: [
    '분양권 전매제한',
    '전매제한 기간',
    '전매제한 위반 처벌',
    '재당첨 제한',
    '분양권 전매',
    '주택법 64조',
    '투기과열지구 전매',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '분양권 전매제한 2026 기간과 처벌' }],
    title: '분양권 전매제한 2026, 기간·위반 처벌·재당첨 제한',
    description: '분양권을 일정 기간 못 파는 규제(주택법 §64). 위반 시 3년 이하 징역 또는 3천만원 벌금(§101).',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '분양권 전매제한 2026, 기간·위반 처벌·재당첨 제한',
    description: '주택법 §64 전매제한, §101 벌칙, 재당첨 제한까지 한 번에 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '분양권 전매제한이 무엇인가요?',
    answer:
      '당첨된 분양권을 일정 기간 다른 사람에게 팔지 못하게 하는 규제입니다(주택법 §64). 투기 목적의 단기 전매를 막고 실수요자에게 기회를 주기 위한 제도입니다. 전매란 입주자로 선정된 지위(분양권)를 사고파는 것을 말하며, 제한기간이 지나기 전에는 전매도, 전매를 알선하는 것도 금지됩니다.',
  },
  {
    question: '전매제한 기간은 얼마나 되나요?',
    answer:
      '지역과 주택 유형에 따라 다릅니다. 주택법 §64는 10년 이내 범위에서 대통령령으로 지역별로 기간을 정하도록 하고 있습니다. 일반적으로 규제가 강한 지역(투기과열지구 등)과 수도권 공공택지, 분양가상한제 적용주택일수록 제한기간이 길고, 비규제·비수도권일수록 짧거나 없습니다. 정확한 기간은 해당 단지 입주자모집공고와 청약홈에서 확인해야 합니다.',
  },
  {
    question: '전매제한을 어기면 어떻게 되나요?',
    answer:
      '형사처벌을 받습니다. 주택법 §64를 위반해 분양권을 불법 전매하거나 알선하면 주택법 §101에 따라 3년 이하의 징역 또는 3천만원 이하의 벌금에 처해질 수 있습니다. 또한 이미 낸 청약이 취소되거나 향후 청약이 제한될 수 있고, 사업주체가 분양가에 따라 되사가는 환매가 이뤄질 수 있습니다.',
  },
  {
    question: '전매제한 기간에 예외로 팔 수 있는 경우도 있나요?',
    answer:
      '있습니다. 근무·생업·질병 치료·취학·결혼으로 다른 지역으로 이전하거나, 상속으로 취득한 주택으로 이전하는 등 대통령령이 정한 부득이한 사유가 있으면 한국토지주택공사 등의 동의를 받아 전매가 허용될 수 있습니다. 다만 요건이 엄격하고 증빙이 필요하므로 사전에 확인해야 합니다.',
  },
  {
    question: '재당첨 제한은 전매제한과 다른 건가요?',
    answer:
      '다른 제도입니다. 전매제한은 분양권을 파는 것을 막는 규제이고, 재당첨 제한은 한 번 당첨된 사람이 일정 기간 다시 당첨되지 못하게 하는 규제입니다. 투기과열지구나 분양가상한제 주택에 당첨되면 향후 일정 기간(최대 10년) 재당첨 제한 대상 주택에 청약할 수 없습니다. 당첨 후 계약을 포기해도 이 제한이 적용될 수 있습니다.',
  },
  {
    question: '전매제한 기간은 언제부터 계산하나요?',
    answer:
      '보통 당첨자 발표일이 기준입니다. 다만 투기과열지구처럼 강한 규제 지역은 소유권 이전등기일까지 전매가 금지되는 식으로 기산 방식이 달라집니다. 단지마다 기산일과 기간이 공고에 명시되므로, 입주자모집공고의 전매제한 항목을 반드시 읽어야 합니다.',
  },
  {
    question: '전매제한이 풀리면 세금은 없나요?',
    answer:
      '양도소득세가 있습니다. 전매제한이 풀려 분양권을 팔면 시세차익에 양도소득세가 부과됩니다. 분양권은 보유기간이 짧을수록 세율이 높아, 1년 미만은 70%, 1년 이상은 60%의 높은 단일세율이 적용됩니다(소득세법 §104). 전매 시점의 세금까지 함께 계산해야 실제 손익을 알 수 있습니다.',
  },
  {
    question: '전매제한 기간은 어디서 확인하나요?',
    answer:
      '청약홈과 입주자모집공고에서 확인합니다. 청약홈은 분양권 정보와 전매제한 안내를 제공하고, 각 단지의 입주자모집공고에 해당 단지의 정확한 제한기간과 기산일이 적혀 있습니다. 규제는 시기별로 바뀌므로, 과거 정보가 아니라 청약 시점의 공고를 기준으로 판단해야 합니다.',
  },
];

export default function PresaleRightResaleRestriction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '분양권 전매제한 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '분양권 전매제한 2026, 기간·위반 처벌·재당첨 제한 정리',
    description:
      '분양권 전매제한의 개념과 지역별 기간 틀, 위반 시 처벌(주택법 §101), 재당첨 제한과 양도세까지 청약 당첨자·투자자 관점에서 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['분양권 전매제한', '전매제한 기간', '재당첨 제한', '주택법 64조', '분양권 양도세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '분양권 전매제한 2026',
    description:
      '분양권 전매제한 기간의 틀과 위반 처벌, 재당첨 제한, 양도세까지 정리.',
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
                    { name: '분양권 전매제한 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청약 당첨자·투자자 · 8분 읽기 · 2026-08-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  분양권 전매제한 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 기간·위반 처벌·재당첨 제한</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  아파트에 당첨되면 그 분양권을 언제 팔 수 있는지가 중요한 문제가 됩니다. 전매제한은 당첨된 분양권을 일정 기간 못 팔게 하는 규제이고, 어기면 형사처벌과 청약 제한이 따릅니다. 이 가이드는 청약 당첨자와 분양권 투자를 고민하는 사람을 위해 전매제한의 개념, 기간이 정해지는 틀, 위반 처벌, 재당첨 제한, 그리고 팔 때 붙는 세금까지 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분양권 전매제한이 무엇인가요?</h2>
                <p>
                  당첨된 분양권을 일정 기간 팔지 못하게 하는 규제입니다. 주택법 §64는 사업주체가 공급하는 주택이나 입주자로 선정된 지위(분양권)를 전매제한기간이 지나기 전에는 전매하거나 전매를 알선하지 못하도록 정합니다. 투기 목적의 단기 전매를 막고 실수요자에게 기회를 주기 위한 장치입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    전매제한 = 분양권을 일정 기간 못 파는 규제(주택법 §64). 기간은 지역·주택 유형별로 다르며(최대 10년 범위), 위반하면 3년 이하 징역 또는 3천만원 이하 벌금(§101)과 청약 제한이 따릅니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전매제한 기간은 얼마나 되나요?</h2>
                <p>
                  지역과 주택 유형에 따라 다릅니다. 주택법 §64는 10년 이내 범위에서 대통령령으로 지역별 기간을 정하도록 위임합니다. 즉 법이 고정 숫자를 정한 것이 아니라, 시장 상황에 따라 시행령으로 조정됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 전매제한이 정해지는 일반적 틀(구체 기간은 공고 확인)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">제한 강도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">투기과열지구 등 강한 규제 지역</td>
                        <td className="p-3">가장 김(소유권 이전등기일까지 등)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">수도권 공공택지·분양가상한제 주택</td>
                        <td className="p-3">상대적으로 김(수년 단위)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비규제·비수도권 일반 지역</td>
                        <td className="p-3">짧거나 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 구체적 개월 수는 시기별로 완화·강화가 반복돼 왔습니다. 위 표는 방향을 잡기 위한 틀이며, 실제 기간은 해당 단지 입주자모집공고와 청약홈의 전매제한 안내로 확인해야 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전매제한을 어기면 처벌은?</h2>
                <p>
                  형사처벌 대상입니다. 주택법 §64를 위반해 분양권을 불법 전매하거나 알선하면 주택법 §101에 따라 3년 이하의 징역 또는 3천만원 이하의 벌금에 처해질 수 있습니다. 이는 단순 과태료가 아니라 형벌입니다.
                </p>
                <p>
                  여기에 더해 청약이 취소되고 일정 기간 청약 자격이 제한될 수 있으며, 사업주체가 정해진 가격으로 되사가는 환매가 이뤄질 수 있습니다. 이른바 불법 전매 알선(떴다방 등)에 응하는 것도 처벌 대상이므로, 제한기간 중 매매 제안은 응하지 않는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부득이한 사유면 팔 수 있나요?</h2>
                <p>
                  일부 예외가 있습니다. 대통령령이 정한 부득이한 사유가 있으면 전매제한기간 중에도 전매가 허용될 수 있습니다. 대표적 예외 사유는 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>근무·생업·질병 치료·취학·결혼으로 세대원 전원이 다른 지역(수도권 제외 등)으로 이전</li>
                  <li>상속으로 취득한 주택으로 세대원 전원 이전</li>
                  <li>해외 이주 또는 2년 이상 해외 체류</li>
                  <li>이혼으로 배우자에게 분양권을 이전하는 경우 등</li>
                </ul>
                <p className="mt-4">
                  다만 예외는 요건이 엄격하고 증빙이 필요하며, 한국토지주택공사 등의 동의를 받아야 하는 경우가 많습니다. 예외 해당 여부는 반드시 사전에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재당첨 제한은 무엇이 다른가요?</h2>
                <p>
                  전매제한과 별개의 규제입니다. 전매제한이 분양권을 파는 것을 막는다면, 재당첨 제한은 이미 당첨된 사람이 다시 당첨되는 것을 막습니다.
                </p>
                <p>
                  투기과열지구나 분양가상한제 적용주택에 당첨되면, 향후 일정 기간(최대 10년) 재당첨 제한 대상 주택에 청약할 수 없습니다. 주의할 점은 당첨 후 계약을 포기하거나 취소해도 이 제한이 적용될 수 있다는 것입니다. 즉 "일단 넣고 아니면 포기"가 공짜가 아닐 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전매가 풀리면 세금은 얼마나 되나요?</h2>
                <p>
                  양도소득세가 크게 붙습니다. 전매제한이 풀려 분양권을 팔면 시세차익에 양도소득세가 부과되는데, 분양권은 보유기간이 짧을수록 세율이 높습니다(소득세법 §104).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 분양권 양도세(개략)</p>
                  <p className="text-sm text-text-secondary">
                    · 분양권 양도차익(프리미엄): 5천만원
                    <br />
                    · 보유 1년 미만 세율 70% 적용 시: 5천만원 × 70% = <strong>3,500만원</strong>
                    <br />
                    · 보유 1년 이상 세율 60% 적용 시: 5천만원 × 60% = <strong>3,000만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">여기에 지방소득세(양도세의 10%)가 더해지고, 기본공제 250만원 등 실제 계산은 별도입니다. 정확한 금액은 분양권 양도세 가이드와 국세청 확인이 필요합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  즉 전매제한이 풀렸다고 바로 팔면 차익의 상당 부분이 세금으로 나갈 수 있습니다. 파는 시점과 세금까지 함께 따져야 실제 손에 쥐는 돈을 알 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/presale-right-capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">분양권 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">1년 미만 70%, 1년 이상 60% 세율 구조를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/presale-right-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">분양권 취득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">분양권 취득 시 세금과 주택 수 포함 여부.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-rewin-restriction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재당첨 제한 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">당첨 후 재청약이 막히는 기간과 대상.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익에 붙는 세금을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/housing-subscription/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">청약 가점을 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 부동산·세무·법률 조언이 아닙니다. 전매제한기간과 예외 사유, 재당첨 제한 기간은 지역·주택 유형·시기에 따라 다르고 규제 완화·강화가 반복되므로, 반드시 해당 단지 입주자모집공고와 청약홈에서 확인하세요. 분양권 양도세 실제 세액은 보유기간·차익·공제에 따라 달라지므로 국세청 또는 세무 전문가와 확인이 필요합니다. 본 콘텐츠는 2026-08-16 기준으로 작성됐으며, 관련 법령 개정 시 즉시 업데이트됩니다. 인용 근거: <strong>주택법 §64(주택의 전매행위 제한)·§101(벌칙), 소득세법 §104(양도소득세율)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.applyhome.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">청약홈(한국부동산원)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="분양권 전매제한 2026, 기간·위반 처벌·재당첨 제한 가이드"
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
