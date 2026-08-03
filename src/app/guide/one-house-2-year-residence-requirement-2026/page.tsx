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

const URL = 'https://calculatorhost.com/guide/one-house-2-year-residence-requirement-2026/';
const DATE_PUBLISHED = '2026-08-04';
const DATE_MODIFIED = '2026-08-04';

export const metadata: Metadata = {
  title: '1세대1주택 양도세 거주요건 2026, 조정지역 2년·상생임대인 면제',
  description:
    '내 집 팔 때 2년 거주를 꼭 채워야 비과세인지 헷갈린다면, 취득 당시 조정대상지역 여부가 갈림길입니다. 강남3구·용산 취득만 2년 거주가 필요하고, 상생임대인·부득이한 사유는 거주 없이도 비과세를 받습니다. 소득세법 시행령 §154 기준으로 정리했습니다.',
  keywords: [
    '1세대1주택 거주요건',
    '2년 거주 비과세',
    '조정대상지역 거주요건',
    '상생임대인 거주요건 면제',
    '거주요건 예외',
    '양도세 비과세 2년',
    '소득세법 시행령 154조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '1세대1주택 양도세 거주요건 2026' }],
    title: '1세대1주택 거주요건 2026, 조정지역 2년 거주와 상생임대인 면제',
    description: '취득 당시 조정대상지역 주택만 2년 거주요건. 상생임대인·부득이한 사유 예외까지 소득세법 시행령 §154 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '1세대1주택 거주요건 2026, 조정지역 2년·상생임대인 면제',
    description: '취득 당시 조정지역이면 2년 보유 + 2년 거주. 그 외 지역은 거주 없이 2년 보유만. 소득세법 시행령 §154.',
  },
};

const FAQ_ITEMS = [
  {
    question: '1세대1주택 비과세에 2년 거주는 항상 필요한가요?',
    answer:
      '아닙니다. 거주요건은 취득 당시 조정대상지역에 있던 주택에만 적용됩니다(소득세법 시행령 §154①). 취득 당시 조정대상지역이 아니었다면 2년 이상 보유만 채우면 비과세이고 거주는 필요 없습니다. 2026년 현재 조정대상지역은 서울 서초·강남·송파·용산구뿐이므로, 그 외 지역에서 산 집은 대부분 보유 2년만으로 비과세 판단이 가능합니다.',
  },
  {
    question: '취득 후에 조정지역에서 해제되면 거주요건이 사라지나요?',
    answer:
      '아닙니다. 거주요건은 취득 당시를 기준으로 판단합니다. 취득할 때 조정대상지역이었다면, 이후 그 지역이 조정대상지역에서 해제되어도 2년 거주요건은 그대로 유지됩니다. 반대로 취득 당시 비조정지역이었다가 나중에 조정지역으로 지정되어도 거주요건은 생기지 않습니다.',
  },
  {
    question: '2017년 8월 3일 이전에 산 집도 거주요건이 있나요?',
    answer:
      '없습니다. 거주요건은 2017년 8월 3일 대책 이후 조정대상지역에서 취득한 주택부터 적용됩니다. 그 이전에 취득했거나, 조정대상지역 지정 전에 취득한 주택은 거주기간과 무관하게 2년 보유만으로 비과세 요건을 판단합니다.',
  },
  {
    question: '상생임대인이 되면 2년 거주를 안 해도 되나요?',
    answer:
      '맞습니다. 직전계약 대비 임대료를 5% 이내로 올리고 2년 이상 임대한 상생임대주택은 1세대1주택 비과세의 2년 거주요건을 면제받습니다. 이 특례는 2021년 12월 20일부터 2026년 12월 31일 사이에 체결한 상생임대차계약에 적용됩니다. 직전계약은 신규주택 취득 후 임차인과 직접 맺어 1년 6개월 이상 임대한 계약을 의미합니다.',
  },
  {
    question: '전근·질병 때문에 못 살았는데 비과세가 되나요?',
    answer:
      '가능합니다. 세대원 일부가 근무상 형편, 취학, 질병 요양 등 부득이한 사유로 일시 퇴거해 거주하지 못해도, 나머지 세대원이 실제 거주했다면 거주요건을 갖춘 것으로 봅니다. 다만 부득이한 사유는 증빙(재직증명, 재학증명, 진단서 등)으로 소명해야 하므로 관련 서류를 미리 보관하세요.',
  },
  {
    question: '거주요건을 못 채우면 세금이 얼마나 늘어나나요?',
    answer:
      '비과세가 통째로 사라지고 양도차익 전체가 과세 대상이 됩니다. 예를 들어 취득 5억, 양도 9억으로 차익 4억이면, 거주요건을 채웠으면 비과세지만 못 채우면 4억에 대한 양도소득세를 내야 합니다. 다만 장기보유특별공제 등 일반 공제는 적용되므로, 개별 세액은 홈택스 모의계산으로 확인하세요.',
  },
  {
    question: '양도가액이 12억을 넘으면 거주요건과 어떻게 얽히나요?',
    answer:
      '거주요건은 비과세 자격 자체를 판단하는 관문이고, 12억 한도는 자격을 갖춘 뒤 과세 범위를 나누는 기준입니다. 거주요건을 충족해 비과세 대상이 되어도, 양도가액 12억 초과분은 비례해서 과세됩니다. 즉 거주요건은 통과, 12억 초과분은 과세라는 2단계로 이해하면 됩니다.',
  },
  {
    question: '거주기간은 어떻게 증명하나요?',
    answer:
      '주민등록 전입 기간이 기본 증빙이지만, 실제 거주 사실이 함께 인정되어야 합니다. 위장전입은 인정되지 않으며, 관리비·공과금 납부 내역, 자녀 학교 배정, 우편물 수령지 등 생활 근거로 실거주를 소명할 수 있습니다. 다툼이 있으면 관할 세무서 또는 세무 전문가와 상담하세요.',
  },
];

export default function OneHouseResidenceRequirement2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '1세대1주택 거주요건 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '1세대1주택 양도세 거주요건 2026, 조정지역 2년 거주와 상생임대인 면제',
    description:
      '취득 당시 조정대상지역 주택만 2년 거주요건이 붙는 원리, 취득 기준 판단, 상생임대인·부득이한 사유 예외, 12억 한도와의 관계까지 소득세법 시행령 §154 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['1세대1주택', '거주요건', '조정대상지역', '상생임대인', '양도세 비과세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '1세대1주택 거주요건 2026',
    description: '조정대상지역 취득 주택의 2년 거주요건과 상생임대인·부득이한 사유 면제를 정리한 가이드.',
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
                    { name: '1세대1주택 거주요건 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">실거주 1주택자 · 8분 읽기 · 2026-08-04</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  1세대1주택 양도세 거주요건 2026
                  <br />
                  <span className="text-2xl text-text-secondary">조정지역 2년 거주와 상생임대인 면제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 집 한 채를 팔며 비과세를 받으려는 실거주 1주택자를 위해 씁니다. 많은 분이 무조건 2년을 살아야 비과세라고 오해하지만, 실제 갈림길은 취득 당시 그 집이 조정대상지역이었는지 여부입니다. 조정지역 취득 주택만 2년 거주가 필요하고, 그 외에는 2년 보유만으로 판단합니다. 여기에 상생임대인과 부득이한 사유라는 두 가지 면제까지 알아두면 불필요한 세금을 피할 수 있습니다.
                </p>
              </header>

              <AdSlot slot="guide-one-house-2-year-residence-requirement-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">거주요건, 언제 붙고 언제 안 붙나</h2>
                <p>
                  거주요건은 취득 당시 조정대상지역 주택에만 붙습니다. 소득세법 시행령 §154①은 1세대1주택 비과세의 기본 요건을 2년 이상 보유로 두고, 취득 당시 조정대상지역에 있던 주택은 여기에 2년 이상 거주를 더 요구합니다. 즉 같은 2년이라도 조정지역 취득이면 보유 2년 + 거주 2년, 그 외 지역이면 보유 2년만입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>취득 당시 조정지역: 2년 보유 + 2년 거주</li>
                    <li>취득 당시 비조정지역: 2년 보유만 (거주 불필요)</li>
                    <li>판단 기준일은 취득 시점 (이후 해제·지정과 무관)</li>
                    <li>거주요건 근거: 소득세법 시행령 §154①</li>
                  </ul>
                </div>
                <p>
                  2026년 현재 조정대상지역은 서울 서초구, 강남구, 송파구, 용산구뿐입니다. 나머지 전국 대부분 지역은 조정대상지역이 아니므로, 그곳에서 취득한 1주택은 실거주하지 않았어도 2년 보유만 채우면 비과세 자격을 따집니다.
                </p>
                <p>
                  다만 조정대상지역 지정 현황은 정부 정책에 따라 바뀔 수 있으므로, 매도 직전에는 국토교통부 고시와 국세청 안내로 취득 시점의 지정 여부를 반드시 재확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득 당시가 기준인가요, 양도 당시가 기준인가요?</h2>
                <p>
                  취득 당시가 기준입니다. 조정대상지역 여부는 집을 산 시점으로 고정됩니다. 취득할 때 조정지역이었다면 이후 해제되어도 2년 거주요건이 그대로 살아 있고, 취득할 때 비조정지역이었다면 나중에 조정지역으로 지정되어도 거주요건은 생기지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 취득 시점별 거주요건 판단 (소득세법 시행령 §154①)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">취득 당시 상태</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">이후 변화</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">거주요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">조정대상지역</td>
                        <td className="p-3">해제됨</td>
                        <td className="p-3"><strong>2년 거주 필요</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비조정지역</td>
                        <td className="p-3">조정지역 지정됨</td>
                        <td className="p-3">거주 불필요</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2017.8.3 이전 취득</td>
                        <td className="p-3">무관</td>
                        <td className="p-3">거주 불필요</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 2017년 8월 3일 대책 이전에 취득했거나, 조정대상지역으로 지정되기 전에 취득한 주택은 거주요건에서 벗어납니다. 오래 보유한 집일수록 취득 시점을 정확히 따져보는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상생임대인이면 거주 없이도 비과세되나요?</h2>
                <p>
                  됩니다. 상생임대주택 특례는 2년 거주요건을 면제해 줍니다. 직전계약 대비 임대료를 5% 이내로 올리고 2년 이상 임대하면, 조정지역 취득 주택이라도 실거주 없이 1세대1주택 비과세를 받을 수 있습니다. 여기서 직전계약이란 신규주택 취득 이후 임차인과 직접 맺어 1년 6개월 이상 임대한 계약을 뜻합니다.
                </p>
                <p>
                  적용 시기: 2021년 12월 20일부터 2026년 12월 31일 사이에 체결한 상생임대차계약이 대상입니다. 임대료 5% 이내 인상과 실제 계약금 수령 사실을 증빙으로 남겨두어야 합니다.
                </p>
                <p>
                  다만 상생임대인 특례는 계약 요건이 까다롭고 임대료 상한 계산에 실수가 잦으므로, 갱신 계약 전에 직전계약 임대료와 5% 상한을 정확히 확인하고 진행하세요. 상세 판단은 국세청 상담(126)이나 세무 전문가에게 맡기는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전근·질병으로 못 살면 어떻게 되나요?</h2>
                <p>
                  부득이한 사유는 거주로 인정될 수 있습니다. 세대원 일부가 근무상 형편, 취학, 질병 요양 등 부득이한 사유로 일시 퇴거해 거주하지 못했더라도, 나머지 세대원이 그 집에 실제 거주했다면 거주요건을 갖춘 것으로 봅니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>근무상 형편:</strong> 원거리 발령, 파견 등. 재직증명서와 발령 문서로 소명합니다.</li>
                  <li><strong>취학:</strong> 자녀 또는 본인의 학교 배정. 재학증명서로 소명합니다.</li>
                  <li><strong>질병 요양:</strong> 장기 치료·요양 필요. 진단서와 치료 내역으로 소명합니다.</li>
                </ul>
                <p>
                  다만 부득이한 사유는 자동으로 인정되지 않고 납세자가 증빙으로 소명해야 합니다. 사유가 발생하면 그 시점의 서류를 즉시 확보해 두는 것이 나중의 세무 다툼을 막는 길입니다.
                </p>
              </section>

              <AdSlot slot="guide-one-house-2-year-residence-requirement-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사례로 보는 거주요건 판단</h2>
                <p>
                  실제 상황을 단계별로 짚어 보겠습니다. 취득 시점과 지역이 어떻게 결론을 바꾸는지 주목하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 경기 외곽(비조정지역) 취득, 임대만 하다 매도</p>
                  <p className="text-sm text-text-secondary">
                    · 취득 당시: 비조정지역, 보유 3년, 실거주 0년
                    <br />
                    · 판단: 조정지역이 아니므로 거주요건 없음, 2년 보유 충족
                    <br />
                    · 결론: <strong>비과세 자격 충족</strong> (양도가 12억 이하 가정)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 강남구(취득 당시 조정지역) 취득, 거주 1년 6개월</p>
                  <p className="text-sm text-text-secondary">
                    · 취득 당시: 조정대상지역, 보유 4년, 실거주 1년 6개월
                    <br />
                    · 판단: 거주 2년 미달, 상생임대인·부득이한 사유도 없음
                    <br />
                    · 결론: <strong>비과세 불가</strong>, 양도차익 전체 과세
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 용산구 취득, 상생임대차 2년 임대</p>
                  <p className="text-sm text-text-secondary">
                    · 취득 당시: 조정대상지역, 실거주 0년, 상생임대차 요건 충족
                    <br />
                    · 판단: 상생임대인 특례로 2년 거주요건 면제
                    <br />
                    · 결론: <strong>비과세 자격 충족</strong> (거주 없이도 인정)
                  </p>
                </div>
                <p>
                  다만 위 사례는 이해를 돕는 가정입니다. 실제 세액은 양도가액, 보유기간, 12억 초과 여부, 장기보유특별공제에 따라 달라지므로 홈택스 양도소득세 모의계산으로 개별 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">거주요건과 12억 한도는 어떻게 다른가</h2>
                <p>
                  거주요건은 비과세 자격의 관문이고, 12억 한도는 자격을 얻은 뒤 과세 범위를 나누는 기준입니다. 둘은 순서가 다릅니다. 먼저 거주요건을 통과해야 비과세 대상이 되고, 그다음 양도가액 12억 초과분만 비례해서 과세됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 거주요건 vs 12억 한도 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">거주요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">12억 한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">역할</td>
                        <td className="p-3">비과세 자격 판단</td>
                        <td className="p-3">과세 범위 분할</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근거</td>
                        <td className="p-3">시행령 §154①</td>
                        <td className="p-3">소득세법 §89①3호</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">불충족 결과</td>
                        <td className="p-3">비과세 전부 소멸</td>
                        <td className="p-3">초과분만 과세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  즉 거주요건 실패는 비과세 전체를 잃는 큰 사건이고, 12억 초과는 부분 과세에 그칩니다. 매도 전 반드시 거주요건부터 점검하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/capital-gains-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보유·거주·양도가를 넣어 세액을 시뮬레이션하세요.</p>
                  </Link>
                  <Link href="/guide/one-household-12-billion-exemption/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">1세대1주택 12억 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">비과세 자격 후 12억 초과분 비례 과세 공식.</p>
                  </Link>
                  <Link href="/guide/temporary-two-houses-capital-gains-exemption/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">일시적 2주택 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">새 집 사고 종전주택 처분 기한과 요건.</p>
                  </Link>
                  <Link href="/guide/long-term-holding-special-deduction-80-percent/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">장기보유특별공제 80%</div>
                    <p className="mt-1 text-sm text-text-secondary">보유·거주기간별 공제율과 계산법.</p>
                  </Link>
                  <Link href="/guide/joint-ownership-couple-capital-gains-tax-savings/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">부부 공동명의 양도세 절세</div>
                    <p className="mt-1 text-sm text-text-secondary">공동명의로 기본공제를 두 번 활용하는 법.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 조정대상지역 지정 현황, 취득 시점 판단, 상생임대인 요건, 부득이한 사유 인정 여부는 개별 사실관계에 따라 달라집니다. 실제 비과세 판단과 세액은 관할 세무서 또는 국세청 상담(126)과 홈택스 모의계산으로 반드시 확인하세요. 본 콘텐츠는 2026-08-04 기준이며 관련 법령은 <strong>소득세법 §89, 소득세법 시행령 §154</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 양도소득세 모의계산</a>.
                </p>
              </section>

              <ShareButtons title="1세대1주택 양도세 거주요건 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
