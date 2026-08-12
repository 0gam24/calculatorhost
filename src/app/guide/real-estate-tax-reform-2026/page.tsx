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

const URL = 'https://calculatorhost.com/guide/real-estate-tax-reform-2026/';
const DATE_PUBLISHED = '2026-08-05';
const DATE_MODIFIED = '2026-08-05';

export const metadata: Metadata = {
  title: '2026 세제개편안 부동산 세금, 장특공제 거주 중심 개편 정리',
  description:
    '2026년 8월 3일 발표된 세제개편안은 장기보유특별공제를 거주 중심으로 바꾸고 공제한도를 신설합니다. 실거주자와 비거주 보유자, 초고가주택 소유자에게 무엇이 달라지는지 정부안 기준으로 정리했습니다.',
  keywords: [
    '2026 세제개편안',
    '장기보유특별공제 개편',
    '장특공제 폐지',
    '양도세 거주요건',
    '종합부동산세 인상',
    '세제개편안 부동산',
    '소득세법 95조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '2026 세제개편안 부동산 세금, 장특공제 거주 중심 개편 정리' }],
    title: '2026 세제개편안 부동산 세금, 장특공제 거주 중심 개편',
    description: '장기보유특별공제를 거주 중심으로 재편하고 공제한도(2028년 20억, 2029년 10억)를 신설하는 정부안. 실거주자와 다주택자에게 달라지는 점.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 세제개편안 부동산 세금 정리',
    description: '장특공제 거주 중심 개편·공제한도 신설·종부세 인상. 국회 심의 전 정부안 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '2026 세제개편안은 확정된 법인가요?',
    answer:
      '아직 확정된 법이 아닙니다. 2026년 8월 3일 기획재정부가 발표한 정부안이며, 국회 심의와 의결을 거쳐야 최종 확정됩니다. 심의 과정에서 세율, 시행 시기, 공제한도 등이 바뀔 수 있으므로 실제 거래 전에는 확정된 개정 법령과 국세청 안내를 반드시 확인해야 합니다.',
  },
  {
    question: '장기보유특별공제가 없어지는 건가요?',
    answer:
      '전면 폐지는 아니고 거주 중심으로 재편됩니다. 정부안은 현행 보유기간 공제와 거주기간 공제로 나뉜 구조에서 보유기간 공제를 단계적으로 줄이고 거주기간 공제 비중을 높이는 방향입니다. 실제로 오래 거주한 1세대1주택자는 기존과 비슷한 공제를 받지만, 거주하지 않고 보유만 한 경우 공제가 줄어들 수 있습니다.',
  },
  {
    question: '실거주자에게는 어떤 영향이 있나요?',
    answer:
      '오래 실거주한 1세대1주택자는 큰 불이익이 없을 가능성이 높습니다. 개편 방향 자체가 거주 기간에 혜택을 몰아주는 것이기 때문입니다. 다만 양도차익이 매우 큰 초고가주택은 새로 도입되는 공제금액 한도(정부안 기준 2028년 20억원, 2029년 이후 10억원)의 적용을 받을 수 있습니다.',
  },
  {
    question: '공제한도 10억원이 무슨 뜻인가요?',
    answer:
      '장기보유특별공제로 빼주는 금액 자체에 상한을 두는 것입니다. 현행은 공제율만 있고 공제금액 한도는 없어, 양도차익이 클수록 공제액도 무한정 커졌습니다. 정부안은 이 공제금액을 2028년 20억원, 2029년 이후 10억원으로 제한합니다. 양도차익이 이 한도를 크게 넘는 초고가주택일수록 세부담이 늘어나는 구조입니다.',
  },
  {
    question: '종합부동산세는 어떻게 달라지나요?',
    answer:
      '고가·다주택 중심으로 부담이 커지는 방향입니다. 정부안은 초고가주택, 비거주 1주택자, 다주택자의 종합부동산세를 단계적으로 인상하는 내용을 담고 있습니다. 반대로 실거주 1주택 중저가 구간은 상대적으로 부담이 크게 늘지 않도록 설계된 것으로 발표됐습니다. 구체적 세율과 기준금액은 확정 법령에서 확인해야 합니다.',
  },
  {
    question: '언제부터 적용되나요?',
    answer:
      '개편안의 핵심 조항은 즉시 시행이 아니라 단계 시행으로 예고됐습니다. 공제한도는 2028년, 거주 중심 공제 구조는 2029년부터 적용하는 방식으로 발표됐습니다. 단계 시행은 시장 충격을 줄이려는 장치이지만, 국회 논의 과정에서 시기가 조정될 수 있습니다.',
  },
  {
    question: '지금 집을 팔지 말지 판단하려면 무엇을 봐야 하나요?',
    answer:
      '거주 기간, 양도차익 규모, 시행 시기 세 가지를 함께 봐야 합니다. 실거주 기간이 길고 양도차익이 공제한도 이내라면 개편의 영향이 작습니다. 반대로 거주하지 않은 고가주택이거나 양도차익이 공제한도를 크게 넘는다면 시행 전후 세액 차이가 커질 수 있습니다. 개인별 유불리는 세무 전문가 상담으로 확인하는 것이 안전합니다.',
  },
];

export default function RealEstateTaxReform2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '2026 세제개편안 부동산 세금' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2026 세제개편안 부동산 세금, 장기보유특별공제 거주 중심 개편 정리',
    description:
      '2026년 8월 3일 발표된 세제개편안의 부동산 세금 변화. 장기보유특별공제 거주 중심 재편, 공제금액 한도 신설(2028년 20억·2029년 10억), 종합부동산세 인상 방향을 정부안 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['2026 세제개편안', '장기보유특별공제', '양도소득세', '종합부동산세', '거주요건'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '2026 세제개편안 부동산 세금',
    description:
      '장기보유특별공제 거주 중심 개편과 공제한도 신설, 종합부동산세 인상 방향을 담은 2026 세제개편안 정부안 정리.',
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
                    { name: '2026 세제개편안 부동산 세금' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 소유자 · 9분 읽기 · 2026-08-05</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026 세제개편안 부동산 세금
                  <br />
                  <span className="text-2xl text-text-secondary">장기보유특별공제 거주 중심 개편</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 집을 가진 사람, 팔지 말지 고민하는 1주택자, 오래 보유만 하고 거주하지 않은 소유자를 위해 2026년 8월 3일 발표된 세제개편안의 부동산 세금 변화를 쉽게 정리한 글입니다. 아직 확정된 법이 아니라 국회 심의를 앞둔 정부안이라는 점을 전제로, 장기보유특별공제가 어떻게 바뀌는지, 공제한도가 왜 생기는지, 실거주자와 비거주자에게 각각 어떤 영향이 있는지를 순서대로 설명합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 2026 세제개편안, 부동산 세금 핵심은 무엇인가요?</h2>
                <p>
                  핵심은 &quot;보유&quot;에서 &quot;거주&quot;로 혜택의 무게중심을 옮기는 것입니다. 정부는 2026년 8월 3일 세제개편안을 발표하면서, 오래 보유한 사람보다 실제로 오래 거주한 사람에게 양도소득세 혜택을 더 주는 방향을 제시했습니다. 동시에 초고가주택과 다주택자의 종합부동산세는 단계적으로 올리겠다는 방침을 함께 담았습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>장기보유특별공제를 거주 기간 중심으로 재편(보유공제 축소, 거주공제 강화)</li>
                    <li>공제금액 한도 신설: 정부안 기준 2028년 20억원, 2029년 이후 10억원</li>
                    <li>종합부동산세는 초고가·비거주 1주택·다주택 중심으로 단계 인상</li>
                    <li>즉시 시행이 아니라 2028년, 2029년 단계 시행 예고</li>
                    <li>국회 심의 전 정부안이므로 세율·시기·한도는 확정 전(소득세법 §95 개정 대상)</li>
                  </ul>
                </div>
                <p>
                  다만 이 글의 모든 수치는 정부가 발표한 개편안(안)을 기준으로 하며, 국회를 통과해야 실제 법이 됩니다. 확정 전까지는 참고용으로만 활용하시기 바랍니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 장기보유특별공제는 지금 어떻게 계산되나요?</h2>
                <p>
                  현행 장기보유특별공제는 소득세법 §95에 따라 두 갈래로 나뉩니다. 일반 부동산은 보유 기간에 따라 연 2%씩 최대 30%를 공제하고, 1세대1주택 중 2년 이상 거주한 고가주택은 보유 기간 연 4%(최대 40%)에 거주 기간 연 4%(최대 40%)를 더해 최대 80%까지 공제합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 현행 장기보유특별공제 구조 (소득세법 §95②, 2026 현재)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최대</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반(3년 이상 보유)</td>
                        <td className="p-3">보유 연 2%</td>
                        <td className="p-3">30% (15년)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1세대1주택 보유분(2년 이상 거주)</td>
                        <td className="p-3">보유 연 4%</td>
                        <td className="p-3">40% (10년)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1세대1주택 거주분(2년 이상 거주)</td>
                        <td className="p-3">거주 연 4%</td>
                        <td className="p-3">40% (10년)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  즉 10년 보유·10년 거주한 1세대1주택자는 보유 40%와 거주 40%를 합쳐 최대 80%를 공제받습니다. 반대로 거주 요건(2년)을 채우지 못하면 이 80% 표를 적용받지 못하고 일반 표(최대 30%)만 적용됩니다.
                </p>
                <p>
                  다만 현행 제도에는 공제 &quot;금액&quot; 자체의 상한이 없습니다. 그래서 양도차익이 수십억 원인 초고가주택도 공제율(최대 80%)만 맞으면 공제금액이 무한정 커졌고, 이 부분이 이번 개편의 표적이 됐습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 개편안은 무엇을 어떻게 바꾸나요?</h2>
                <p>
                  개편안은 보유 공제를 줄이고 거주 공제를 키우며, 공제금액 자체에 한도를 새로 붙입니다. 정부 발표에 따르면 명칭도 &quot;장기거주&quot;를 강조하는 방향으로 바뀌고, 거주 기간에 따른 공제 비중이 커집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 현행 vs 개편안 방향 (2026 세제개편안 정부안, 국회 심의 전)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">현행</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개편안(안)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제 무게중심</td>
                        <td className="p-3">보유 + 거주 병렬</td>
                        <td className="p-3">거주 중심(보유공제 축소)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">최대 공제율</td>
                        <td className="p-3">80%</td>
                        <td className="p-3">80% 유지(거주 기준으로 충족)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제금액 한도</td>
                        <td className="p-3">없음(무제한)</td>
                        <td className="p-3">2028년 20억원, 2029년 이후 10억원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">시행 시기</td>
                        <td className="p-3">현행 적용</td>
                        <td className="p-3">단계 시행(2028·2029)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  정리하면 실거주 기간을 길게 채운 사람은 여전히 높은 공제를 받되, 거주 없이 보유만 한 경우와 양도차익이 매우 큰 초고가주택은 공제가 줄어드는 구조입니다.
                </p>
                <p>
                  예외: 위 시기와 금액은 정부안 기준입니다. 국회 논의에서 한도 금액이나 시행 연도가 조정될 수 있으므로, 확정 전에는 소관 부처 고시와 개정 법령을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개편안 적용 시 유형별 시뮬레이션</h2>
                <p>
                  아래는 개편안이 그대로 시행된다고 가정한 이해용 예시입니다. 실제 세액은 취득가액, 필요경비, 기본공제 250만원, 세율 구간에 따라 달라지므로 방향성만 참고하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 10년 실거주 1세대1주택 (양도차익 5억원)</p>
                  <p className="text-sm text-text-secondary">
                    · 거주 기간: 10년(거주 요건 충분)
                    <br />
                    · 현행: 보유 40% + 거주 40% = 80% 공제
                    <br />
                    · 개편안: 거주 중심으로 재편돼도 10년 거주면 최대 공제율 도달
                    <br />
                    · 공제한도: 공제액이 10억원 한도 이내(5억×80% = 4억)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 오래 실거주한 1주택자는 변화가 거의 없음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 12년 보유·미거주 주택 (양도차익 5억원)</p>
                  <p className="text-sm text-text-secondary">
                    · 거주 기간: 0년(거주 요건 미충족)
                    <br />
                    · 현행: 1세대1주택 80% 표 적용 불가, 일반 표 최대 30%
                    <br />
                    · 개편안: 거주 공제 중심이라 미거주자는 공제가 더 줄어들 수 있음
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 거주하지 않고 보유만 한 경우 개편의 불이익이 큼.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 초고가주택 (양도차익 40억원, 장기 실거주)</p>
                  <p className="text-sm text-text-secondary">
                    · 현행: 공제율 80% 적용 시 공제액 32억원(한도 없음)
                    <br />
                    · 개편안(2029년 이후 가정): 공제금액 한도 10억원 적용
                    <br />
                    · 공제 차이: 32억원 → 10억원으로 축소, 과세표준 22억원 증가
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 양도차익이 한도를 크게 넘는 초고가주택일수록 세부담 증가폭이 큼.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 사례의 숫자는 개편안 가정치이며 확정 세액이 아닙니다. 경계선(양도차익이 공제한도 부근)에 있는 주택은 시행 연도에 따라 유불리가 갈리므로 개별 시뮬레이션이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 종합부동산세는 어떻게 달라지나요?</h2>
                <p>
                  고가·다주택 쪽 부담이 커지는 방향입니다. 정부안은 초고가주택, 실제 거주하지 않는 1주택자, 다주택자의 종합부동산세를 단계적으로 인상하는 내용을 담았습니다. 과세 기준을 &quot;주택 수&quot; 위주에서 &quot;보유한 부동산의 총 가액&quot; 중심으로 옮겨, 총 가액이 큰 상위 구간에 누진 부담을 강화하는 것이 특징입니다.
                </p>
                <p>
                  반대로 실거주 1주택의 중저가 구간은 부담이 급격히 늘지 않도록 설계했다고 발표됐습니다. 이는 앞서 본 양도세 개편의 &quot;거주 우대&quot; 기조와 방향이 같습니다.
                </p>
                <p>
                  예외: 구체적인 세율표, 기준금액, 공정시장가액비율 등은 발표 자료의 방향 제시 수준이며 확정 수치가 아닙니다. 실제 고지서 금액은 개정 종합부동산세법과 시행령이 확정된 뒤 계산됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 지금 무엇을 준비해야 하나요?</h2>
                <p>
                  거주 기간부터 점검하세요. 개편의 핵심 열쇠가 &quot;실제 거주&quot;로 옮겨가는 만큼, 본인 주택의 거주 기간을 정확히 확인하고 향후 매도 시점과 함께 따져봐야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>거주 기간 확인:</strong> 전입세대 열람, 주민등록초본으로 실제 거주 기간을 확인합니다. 거주 요건 충족 여부가 공제율을 좌우합니다.
                  </li>
                  <li>
                    <strong>양도차익 규모 점검:</strong> 예상 양도차익이 공제한도(정부안 10억원 또는 20억원)를 넘는지 확인합니다. 한도 이내면 개편 영향이 작습니다.
                  </li>
                  <li>
                    <strong>시행 시기 확인:</strong> 단계 시행이므로 매도 시점이 2028년, 2029년 전후 어디인지에 따라 적용 규정이 달라집니다.
                  </li>
                  <li>
                    <strong>확정 법령 확인:</strong> 국회 통과 전까지는 정부안일 뿐이므로, 최종 개정 법령과 국세청 안내가 나온 뒤 매도 의사결정을 확정하는 것이 안전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 개인별 유불리는 취득 시점, 보유·거주 기간, 다른 주택 보유 여부에 따라 크게 달라집니다. 금액이 큰 거래일수록 세무사 상담으로 사전 검토하는 것을 권합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">현행 세율과 장기보유특별공제로 예상 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 80% 요건</div>
                    <p className="mt-1 text-sm text-text-secondary">현행 보유·거주 공제 계산 구조를 먼저 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/one-house-2-year-residence-requirement-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 거주요건 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">거주요건이 왜 중요한지, 어떻게 충족하는지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/comprehensive-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가격과 보유 주택으로 종부세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">고가주택 양도세 비과세 한도의 기본 원리.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·종부세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 본문에 소개한 2026 세제개편안 내용은 2026년 8월 3일 기획재정부가 발표한 정부안으로, 국회 심의·의결을 거쳐야 확정됩니다. 세율, 공제한도, 시행 시기 등은 확정 전까지 변경될 수 있으므로 실제 거래 전에는 개정 법령과 국세청 안내를 반드시 확인하세요. 현행 장기보유특별공제의 근거는 <strong>소득세법 §95(양도소득금액)</strong>, 종합부동산세는 <strong>종합부동산세법</strong>을 따릅니다. 본 콘텐츠는 2026-08-05 기준이며 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부(세제개편안 발표)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(소득세법)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="2026 세제개편안 부동산 세금 정리"
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
