import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/jeonse-vs-monthly-rent-comparison-2026/';
const DATE_PUBLISHED = '2026-06-26';
const DATE_MODIFIED = '2026-06-26';

export const metadata: Metadata = {
  title: '전세 vs 월세 유불리 계산 2026 — 전월세 전환율로 손익 따지기',
  description:
    '전세와 월세 중 무엇이 유리한지 보증금의 기회비용과 전월세 전환율로 비교하는 법을 설명합니다. 전세대출 이자·예금이자와 월세를 등가로 환산해 판단하는 공식과 예시를 정리.',
  keywords: [
    '전세 vs 월세',
    '전월세 비교',
    '전월세 전환율',
    '보증금 기회비용',
    '전세 유리',
    '월세 유리',
    '주택 임차',
    '전세 손익',
    '월세 손익',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '전세 vs 월세 유불리 계산 2026',
      },
    ],
    title: '전세 vs 월세 유불리 계산 2026',
    description: '보증금 기회비용과 전월세 전환율로 임차 선택지를 비교하는 완벽 가이드.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전세 vs 월세 유불리 계산 2026',
    description: '기회비용 계산으로 전세와 월세의 실제 부담을 비교하고 선택하는 법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전세 vs 월세, 어떤 게 더 저렴한가요?',
    answer:
      '단순히 월 부담만 비교하면 안 됩니다. 전세는 보증금의 기회비용(대출 이자 또는 포기한 예금이자)을 고려해야 합니다. 월세는 매달 나가는 비용이 직접적입니다. 같은 집이라도 기회비용 계산 방식에 따라 유불리가 바뀝니다.',
  },
  {
    question: '전월세 전환율은 뭔가요?',
    answer:
      '보증금 차이를 월세로 환산하는 지표입니다. 주택임대차보호법 §7의2에 따라 전환율 상한은 한국은행 기준금리 + 2%입니다(기준금리에 따라 변동). 예를 들어 기준금리 3.5%이면 전환율 상한 5.5%를 기준으로, 보증금 1억 원의 연 부담액은 550만 원이 됩니다.',
  },
  {
    question: '전세대출 금리 4%, 예금 이자 2%일 때는 뭘 선택해야 하나요?',
    answer:
      '전월세 전환율이 4~5.5% 범위라면 전세는 대출 이자 4% 부담, 월세는 보증금 차액의 기회비용(예금 이자 2% 또는 더 높은 투자 수익) 부담입니다. 대출 금리가 기회비용보다 낮으면 전세가 유리하고, 높으면 월세가 유리합니다.',
  },
  {
    question: '보증금이 크면 월세가 유리한가요?',
    answer:
      '꼭 그렇지는 않습니다. 보증금이 크더라도 전세대출 금리가 낮으면 전세가 유리할 수 있습니다. 반대로 보증금이 작아도 기대 투자 수익(예금 이자)보다 전월세 전환율이 높으면 월세가 유리합니다.',
  },
  {
    question: '전세사기 위험이 있으면 월세를 선택해야 하나요?',
    answer:
      '금융적으로는 선택지가 바뀌지 않지만, 리스크 관점에서는 월세가 보증금 손실 위험이 덜합니다. 전세 선택 시 전세보증보험(HUG 등)으로 보증금을 보호하면 리스크를 낮출 수 있습니다.',
  },
  {
    question: '갭 투자를 하려면 월세가 항상 유리한가요?',
    answer:
      '월세와 관계없이 전월세 전환율, 대출 금리, 예상 임금 상승률을 모두 함께 봐야 합니다. 갭투자는 임차차익(전세-월세 차이의 월세 상승 기대)에 베팅하는 것이므로, 순수 금융적 유불리와는 다른 전략입니다.',
  },
];

export default function JeonseVsMonthlyRentComparison2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전세 vs 월세 유불리 계산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전세 vs 월세 유불리 계산 2026',
    description:
      '전세와 월세의 금융적 손익을 보증금 기회비용과 전월세 전환율로 비교하는 완벽 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전세', '월세', '전환율', '보증금', '기회비용'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전세 vs 월세 유불리 계산 2026 | calculatorhost',
    description:
      '기회비용 계산으로 전세와 월세의 실제 부담을 비교하고 선택하는 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

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
                    { name: '전세 vs 월세 유불리 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  임차인 · 8분 읽기 · 2026-06-26
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전세 vs 월세 유불리 계산 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 빌려 살 때 전세를 선택할지 월세를 선택할지는 금전적으로 매우 중요한 결정입니다. 많은
                  사람이 단순히 월 부담액으로만 비교하지만, 실제로는 보증금의 기회비용을 고려해야 합니다.
                  이 가이드에서는 기회비용 개념, 전월세 전환율, 대출 이자, 예금 이자를 함께 고려해 전세와
                  월세의 실제 부담을 비교하고 의사결정하는 방법을 명확히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-jeonse-vs-monthly-rent-comparison-2026-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    전세 vs 월세 비교 (2026 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        전세
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        월세
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">초기 자본</td>
                      <td className="py-2 pr-3 text-xs">보증금 전액</td>
                      <td className="py-2">보증금 + 월세</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">월 부담</td>
                      <td className="py-2 pr-3 text-xs">대출 이자 (또는 0)</td>
                      <td className="py-2">고정 월세</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">보증금 회수</td>
                      <td className="py-2 pr-3 text-xs">계약 종료 시</td>
                      <td className="py-2">계약 종료 시</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">기회비용</td>
                      <td className="py-2 pr-3 text-xs">포기한 투자 수익</td>
                      <td className="py-2">보증금 차액의 이자</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  왜 기회비용을 고려해야 하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  같은 집을 전세로 빌리든 월세로 빌리든 생활 조건은 같지만, 금융적 부담은 완전히 다릅니다.
                  전세 보증금은 집주인에게 주지만 계약 종료 시 되돌려받는 돈입니다. 이 돈을 은행 대출로
                  준비하거나 자기 자본을 사용한다면, 그 자본의 가치(=기회비용)를 함께 계산해야 의사결정을
                  제대로 할 수 있습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>예시:</strong> 전세 보증금 3억 원을 4% 대출로 준비하면 연 1,200만 원의 이자
                    부담이 발생합니다. 이것이 전세의 실제 연 비용입니다. 만약 월세로 보증금 1억 원만 내고
                    월세 90만 원을 낸다면, 보증금 차액 2억 원의 연 이자(예: 3% 예금 이자 600만 원)가 기회비용이
                    됩니다. 그러면 월세 1,080만 원(월 90만 원) + 기회비용 600만 원 = 연 1,680만 원이 월세의
                    실제 비용입니다. 이 경우 전세(1,200만 원)가 더 저렴합니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만 대출 금리와 기대 투자 수익은 시시각각 변하므로, 정기적으로 재계산하고 상황 변화에
                  대응해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  전세의 실제 연 비용은 어떻게 계산하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  전세의 비용은 보증금을 준비하는 방식에 따라 달라집니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    시나리오 1: 전세대출로 준비하는 경우
                  </h3>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    전세 연 비용 = 보증금 × 전세대출 금리(연율)
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    예: 보증금 3억 원 × 4% 금리 = 연 1,200만 원
                  </p>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    시나리오 2: 자기 자본(저축)으로 준비하는 경우
                  </h3>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    전세 연 비용 = 보증금 × 포기한 투자 수익률(연율)
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    예: 보증금 3억 원 × 2.5% 예금 이자 = 연 750만 원<br />
                    (만약 주식 투자로 5% 수익을 기대한다면 연 1,500만 원)
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  핵심은 보증금을 준비하기 위해 포기한 자본 비용(대출 이자든 투자 수익이든)을 반드시 계산해야
                  한다는 점입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 전세는 월 고정 비용 외에 계약 갱신료(보증금의 5~10%)가 발생할 수 있으므로, 계약 갱신
                  시기에 대비해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  월세의 실제 연 비용은 어떻게 계산하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월세의 비용은 더 직관적입니다. 하지만 보증금 차액의 기회비용을 함께 고려해야 전세와 공정하게
                  비교할 수 있습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    월세 연 비용 = (월세 × 12) + (보증금 차액 × 기회비용 이율)
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    예: 월세 90만 원 + 보증금 차액 2억 원 × 3% 예금 이자<br />
                    = 1,080만 원 + 600만 원 = 연 1,680만 원
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  보증금 차액이란 전세 보증금과 월세 보증금의 차이입니다. 전세 3억, 월세 1억 보증금이면 차액은
                  2억입니다. 이 2억을 은행에 예금하거나 투자한다면 발생하는 연간 이자·수익을 월세 부담에
                  더해야 합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 월세는 해마다 올라갈 가능성이 높으므로, 예상 인상률을 미리 반영해 장기 비용을
                  추정해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  전월세 전환율이란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  전월세 전환율은 보증금 차이를 월세로 환산하는 지표입니다. 이를 통해 보증금과 월세를 동일한
                  기준으로 비교할 수 있습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    월세 등가액 = 보증금 차액 × 전월세 전환율(연율)
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    예: 보증금 차액 2억 원 × 5.5% 전환율 = 연 1,100만 원 = 월 약 91.7만 원
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  주택임대차보호법 §7의2에 따르면, 전월세 전환율의 상한은 한국은행 기준금리 + 2%입니다(기준금리에
                  따라 변동). 예를 들어 기준금리가 3.5%이면 전환율 상한은 5.5%가 됩니다. 이 상한은 계절과
                  정책에 따라 수시로 변하므로, 계약 시점의 최신 기준금리를 확인해야 합니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    기준금리에 따른 전환율 상한 예시
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>· 기준금리 2.5% → 전환율 상한 4.5%</li>
                    <li>· 기준금리 3.5% → 전환율 상한 5.5%</li>
                    <li>· 기준금리 4.5% → 전환율 상한 6.5%</li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 실제 계약 시 전환율은 법정 상한 내에서 집주인과 임차인의 협상으로 결정되므로, 상한보다
                  낮을 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  전세와 월세는 실제로 어떻게 비교하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  세 가지 핵심 요소를 함께 고려해야 합니다: 대출 금리, 기대 투자 수익률(기회비용), 전월세 전환율.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    판단 원칙
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>1. 대출 금리 {'<'} 기회비용 이율:</strong>
                      <br />
                      전세가 유리합니다. 보증금을 대출로 준비할 때 내는 이자가, 월세를 내고 차액 보증금을
                      굴려 얻는 수익보다 작기 때문입니다.
                    </li>
                    <li>
                      <strong>2. 대출 금리 = 기회비용 이율:</strong>
                      <br />
                      중립입니다. 다른 요소(계약 갱신료, 월세 인상률 등)가 결정 요인이 됩니다.
                    </li>
                    <li>
                      <strong>3. 대출 금리 {'>'} 기회비용 이율:</strong>
                      <br />
                      월세가 유리합니다. 대출 이자가 높아서 전세 비용이 올라가기 때문입니다.
                    </li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mt-4">
                  실제 계산 사례
                </h3>
                <div className="rounded-lg bg-bg-raised p-4">
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>상황:</strong>
                      <br />
                      · 전세 보증금: 3억 원 (전세대출 금리 4%)
                      <br />
                      · 월세 보증금: 1억 원, 월세: 90만 원
                      <br />
                      · 포기한 투자 수익률(예금): 2.5%
                      <br />
                      · 전월세 전환율 상한: 5.5%
                    </li>
                    <li>
                      <strong>전세 연 비용:</strong>
                      <br />
                      3억 원 × 4% (대출 금리) = 1,200만 원
                    </li>
                    <li>
                      <strong>월세 연 비용:</strong>
                      <br />
                      (90만 원 × 12) + (2억 원 × 2.5% 예금 이자)
                      <br />
                      = 1,080만 원 + 500만 원 = 1,580만 원
                    </li>
                    <li>
                      <strong>결론:</strong> 전세(1,200만 원)가 월세(1,580만 원)보다 연 380만 원
                      저렴합니다.
                    </li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mt-4">
                  역 사례: 대출 금리가 높을 때
                </h3>
                <div className="rounded-lg bg-bg-raised p-4">
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>만약 전세대출 금리가 5.5%라면:</strong>
                      <br />
                      전세 연 비용 = 3억 × 5.5% = 1,650만 원
                      <br />
                      월세 연 비용 = 1,580만 원
                      <br />
                      → 월세가 연 70만 원 저렴합니다.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 실제 계산 시 계약 갱신료(전세), 월세 인상률, 중개수수료, 관리비 변동 등 추가 요소가
                  영향을 미치므로, 완벽한 비교는 어렵습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  전세사기 위험은 어떻게 대비하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  전세는 금융적으로 유리할 수 있지만, 전세사기(보증금 미반환) 리스크가 있습니다. 월세는 이
                  리스크가 상대적으로 낮습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    전세 리스크 완화 방법
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1. 전세보증보험 가입:</strong> 주택도시보증공사(HUG), 한국주택금융공사(JHF) 등의 전세보증보험으로 보증금
                      손실 시 보상받을 수 있습니다.
                    </li>
                    <li>
                      <strong>2. 집주인 신용 조회:</strong> 집주인의 빚, 선순위 보증금 등을 미리 확인합니다.
                    </li>
                    <li>
                      <strong>3. 법정 우선순위 확보:</strong> 보증금 규모 내에서 우선 변제권을 갖는지 확인합니다.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 조치들을 하면 전세 리스크를 크게 낮출 수 있으므로, 금융적 이점까지 모두 누릴 수 있습니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 전세보증보험의 보상 한도와 조건을 미리 확인해야 하며, 가입 대상 여부는 집주인의
                  부채 상황에 따라 결정됩니다.
                </p>
              </section>

              <AdSlot slot="guide-jeonse-vs-monthly-rent-comparison-2026-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  선택 시 체크리스트
                </h2>
                <div className="rounded-lg bg-bg-raised p-4">
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      □ 현재 전세대출 금리와 예금 이자율(또는 기대 투자 수익률)을 확인했는가?
                    </li>
                    <li>
                      □ 해당 시점의 한국은행 기준금리와 전월세 전환율 상한을 확인했는가?
                    </li>
                    <li>
                      □ 월세라면 향후 인상률(예: 연 3~5%)을 추정해 5년 이상 비용을 계산했는가?
                    </li>
                    <li>
                      □ 전세라면 계약 갱신료(보통 보증금의 5~10%)와 갱신 시기를 파악했는가?
                    </li>
                    <li>
                      □ 전세 선택 시 전세보증보험 가입 대상인지 확인했는가?
                    </li>
                    <li>
                      □ 집주인의 신용과 부채 상황을 미리 조회했는가?
                    </li>
                    <li>
                      □ 향후 5~10년 생활 계획(이직, 결혼, 자산 변화)을 고려했는가?
                    </li>
                  </ul>
                </div>
              </section>

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 금융 정보 제공 목적이며, 특정 개인의 재무 상담을 하지 않습니다.
                  </li>
                  <li>
                    • 전월세 전환율의 법정 상한은 주택임대차보호법 §7의2에 따라 한국은행 기준금리 + 2%이며,
                    기준금리 변동에 따라 수시로 변합니다.
                  </li>
                  <li>
                    • 대출 금리, 기대 투자 수익률, 월세 인상률은 시점과 개인 상황에 따라 다르므로, 계약 시점에
                    최신 정보를 직접 확인해야 합니다.
                  </li>
                  <li>
                    • 실제 전세 계약 시 집주인의 신용, 보증금 보호 현황, 법정 우선순위 등을 반드시 사전에 확인하세요.
                  </li>
                  <li>
                    • 본 사이트는 임차 상품 판매를 하지 않으며, 모든 임차 결정은 본인 책임과 판단입니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/rent-conversion/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전월세 전환 계산기
                    </Link>{' '}
                    — 보증금 차이를 월세로 실시간 환산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/rent-conversion-rate-2026-housing-lease-act/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전월세 전환율 상한 2026 — 주택임대차보호법 해설
                    </Link>{' '}
                    — 기준금리와 상한의 관계, 법정 기준
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/jeonse-deposit-safety/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전세보증금 보호 및 보증보험 가이드
                    </Link>{' '}
                    — HUG, JHF 전세보증보험 신청·대상 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 전세대출 월 이자 및 총 상환액
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/savings/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      적금 이자 계산기
                    </Link>{' '}
                    — 보증금 차액의 기대 수익 시뮬레이션
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/real-estate/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      부동산 카테고리
                    </Link>{' '}
                    — 전세, 월세, 중개수수료, 임대수익률 관련 모든 계산기
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 자료</strong>:{' '}
                  <a
                    href="https://www.law.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터 (주택임대차보호법)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.bok.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국은행 (기준금리)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.khug.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    주택도시보증공사 (HUG 전세보증보험)
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
