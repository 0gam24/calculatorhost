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

const URL = 'https://calculatorhost.com/guide/earned-income-tax-credit-payment-amount-2026/';
const DATE_PUBLISHED = '2026-07-29';
const DATE_MODIFIED = '2026-07-29';

export const metadata: Metadata = {
  title: '근로장려금 얼마 받나 2026, 단독 165·홑벌이 285·맞벌이 330만',
  description:
    '근로장려금 최대 지급액은 단독가구 165만원, 홑벌이 285만원, 맞벌이 330만원입니다. 소득이 늘수록 지급액이 올랐다 줄어드는 점증·평탄·점감 구조와 가구유형 판정 기준을 조세특례제한법 기준으로 정리했습니다.',
  keywords: [
    '근로장려금 지급액',
    '근로장려금 얼마',
    '단독가구 근로장려금',
    '맞벌이 근로장려금 330만',
    '근로장려금 산정',
    '근로장려금 소득기준',
    '조세특례제한법 100조의5',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '근로장려금 얼마 받나 2026, 단독 165·홑벌이 285·맞벌이 330만' }],
    title: '근로장려금 얼마 받나 2026, 가구유형별 최대 지급액과 산정 구조',
    description: '단독 165만·홑벌이 285만·맞벌이 330만. 소득 구간별 점증·평탄·점감 구조와 예상액 계산법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '근로장려금 얼마 받나 2026, 가구유형별 최대 지급액',
    description: '단독 165만·홑벌이 285만·맞벌이 330만. 조세특례제한법 §100의5 산정 구조 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '근로장려금 최대 지급액은 얼마인가요?',
    answer:
      '가구유형에 따라 다릅니다. 단독가구는 최대 165만원, 홑벌이가구는 최대 285만원, 맞벌이가구는 최대 330만원입니다(조세특례제한법 §100의5). 다만 이 금액은 소득이 평탄구간에 들어왔을 때의 최대치이며, 소득이 너무 적거나 많으면 점증·점감 구조에 따라 줄어듭니다.',
  },
  {
    question: '단독·홑벌이·맞벌이는 어떻게 구분하나요?',
    answer:
      '배우자와 부양가족 유무로 나뉩니다. 단독가구는 배우자, 부양자녀, 70세 이상 직계존속이 모두 없는 가구입니다. 홑벌이가구는 배우자의 총급여가 300만원 미만이거나 부양자녀 또는 직계존속이 있는 가구, 맞벌이가구는 배우자의 총급여가 300만원 이상인 가구입니다.',
  },
  {
    question: '소득이 많아지면 왜 오히려 지급액이 줄어드나요?',
    answer:
      '근로장려금은 저소득 근로를 유인하기 위한 제도라 소득 구간별로 지급액이 달라지기 때문입니다. 소득이 늘수록 지급액이 커지는 점증구간, 최대치를 유지하는 평탄구간, 다시 서서히 줄어드는 점감구간으로 설계되어 있습니다. 그래서 소득이 상한에 가까우면 지급액이 적어집니다.',
  },
  {
    question: '소득이 얼마 이하여야 신청할 수 있나요?',
    answer:
      '지난해 부부합산 총소득 기준으로 단독가구 2,200만원 미만, 홑벌이가구 3,200만원 미만, 맞벌이가구 3,800만원 미만이어야 합니다. 또한 2025년 6월 1일 기준 가구원 재산 합계가 2억 4천만원 미만이어야 합니다.',
  },
  {
    question: '재산이 많으면 지급액이 깎이나요?',
    answer:
      '네. 가구원 재산 합계가 1억 7천만원 이상 2억 4천만원 미만이면 산정된 장려금의 50%만 지급됩니다. 재산이 2억 4천만원 이상이면 아예 지급되지 않습니다. 재산에는 주택, 토지, 전세보증금, 자동차, 예금 등이 포함됩니다.',
  },
  {
    question: '반기신청을 하면 지급액이 달라지나요?',
    answer:
      '총액은 같지만 나눠 받습니다. 근로소득만 있는 가구는 반기신청이 가능하며, 상반기 소득분으로 산정한 금액의 35%를 먼저 받고, 나머지는 다음 해 정기 정산 때 받습니다. 정기신청은 5월에 한 번 신청해 8월 말에 한꺼번에 받습니다.',
  },
  {
    question: '정확한 내 예상 지급액은 어디서 확인하나요?',
    answer:
      '홈택스 또는 손택스의 근로·자녀장려금 모의계산에서 확인할 수 있습니다. 본 가이드의 표와 사례는 구조 이해를 돕기 위한 것이며, 실제 지급액은 소득·재산·부양가족 등 개별 요건에 따라 달라지므로 반드시 모의계산으로 확정하세요.',
  },
  {
    question: '최소 지급액도 있나요?',
    answer:
      '네. 산정 결과가 일정 금액에 미달해도 최소 지급 기준이 적용되어 소액이라도 지급됩니다. 다만 신청 요건(소득·재산·가구)을 하나라도 충족하지 못하면 지급 대상에서 제외됩니다.',
  },
];

export default function EarnedIncomeTaxCreditPaymentAmount2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '근로장려금 지급액 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '근로장려금 얼마 받나 2026, 가구유형별 최대 지급액과 산정 구조',
    description:
      '근로장려금 가구유형별 최대 지급액(단독 165만·홑벌이 285만·맞벌이 330만)과 점증·평탄·점감 산정 구조, 소득·재산 요건, 예상액 계산 사례를 조세특례제한법 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['근로장려금', '지급액', '단독가구', '홑벌이', '맞벌이', '조세특례제한법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '근로장려금 지급액 2026',
    description:
      '가구유형별 최대 지급액과 점증·평탄·점감 산정 구조, 소득·재산 요건을 정리한 근로장려금 지급액 가이드.',
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
                    { name: '근로장려금 지급액 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">저소득 근로가구 · 8분 읽기 · 2026-07-29</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  근로장려금 얼마 받나 2026
                  <br />
                  <span className="text-2xl text-text-secondary">가구유형별 최대 지급액과 산정 구조</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 근로장려금 신청을 마치고 8월 지급을 앞둔 저소득 근로가구를 위한 것입니다. 많은 분이 궁금해하는 질문은 하나로 모입니다. 우리 가구는 대체 얼마를 받을까. 근로장려금은 가구유형과 소득 구간에 따라 지급액이 정해지는데, 그 계산 원리를 알면 예상액을 대략 가늠할 수 있습니다. 가구유형별 최대 금액부터 소득이 늘수록 지급액이 오르다 줄어드는 구조까지 차례로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로장려금, 우리 가구는 얼마 받나요?</h2>
                <p>
                  최대 지급액은 가구유형에 따라 단독가구 165만원, 홑벌이가구 285만원, 맞벌이가구 330만원입니다(조세특례제한법 §100의5). 부양가족과 배우자 소득이 많은 가구일수록 최대치가 높게 설계되어 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 가구유형별 근로장려금 최대 지급액과 총소득 상한 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가구유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최대 지급액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총소득 상한</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">단독가구</td>
                        <td className="p-3"><strong>165만원</strong></td>
                        <td className="p-3">2,200만원 미만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">홑벌이가구</td>
                        <td className="p-3"><strong>285만원</strong></td>
                        <td className="p-3">3,200만원 미만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">맞벌이가구</td>
                        <td className="p-3"><strong>330만원</strong></td>
                        <td className="p-3">3,800만원 미만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 표의 최대 지급액은 소득이 이른바 평탄구간에 들어왔을 때만 받는 금액입니다. 소득이 그보다 적거나 많으면 뒤에서 설명하는 점증·점감 구조에 따라 지급액이 줄어듭니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">단독·홑벌이·맞벌이 가구는 어떻게 구분하나요?</h2>
                <p>
                  배우자와 부양가족의 유무, 그리고 배우자의 소득으로 구분합니다. 같은 소득이라도 가구유형이 달라지면 지급액이 크게 바뀌므로 먼저 내 가구가 어디에 속하는지 확인해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 근로장려금 가구유형 판정 기준</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가구유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">판정 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">단독가구</td>
                        <td className="p-3">배우자·부양자녀·70세 이상 직계존속이 모두 없는 가구</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">홑벌이가구</td>
                        <td className="p-3">배우자 총급여 300만원 미만이거나, 부양자녀 또는 직계존속이 있는 가구</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">맞벌이가구</td>
                        <td className="p-3">배우자 총급여가 300만원 이상인 가구</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 배우자가 있어도 배우자의 총급여가 300만원 미만이면 맞벌이가 아니라 홑벌이로 봅니다. 부양자녀는 18세 미만이면서 연간 소득금액 100만원 이하인 경우를 말합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">지급액은 왜 소득이 늘어도 줄어드나요?</h2>
                <p>
                  근로장려금은 세 개의 구간으로 나뉜 그래프 모양으로 지급액이 정해지기 때문입니다. 저소득 근로를 돕되, 어느 수준을 넘으면 자립했다고 보고 서서히 지원을 줄이는 구조입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>점증구간:</strong> 소득이 적을 때는 소득이 늘수록 지급액도 함께 올라갑니다. 일을 더 할수록 이득이 커지도록 설계된 구간입니다.
                  </li>
                  <li>
                    <strong>평탄구간:</strong> 소득이 일정 범위에 들어오면 지급액이 최대치(단독 165만·홑벌이 285만·맞벌이 330만)로 유지됩니다.
                  </li>
                  <li>
                    <strong>점감구간:</strong> 소득이 평탄구간을 넘어서면 지급액이 서서히 줄어들다가 상한에 이르면 0이 됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 이 그래프의 구체적 꺾이는 지점은 가구유형마다 다릅니다. 그래서 소득이 상한에 가까운 가구는 최대 지급액이 아니라 그보다 훨씬 적은 금액을 받게 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득·재산 요건은 얼마인가요?</h2>
                <p>
                  근로장려금은 소득과 재산 두 요건을 모두 충족해야 받을 수 있습니다. 소득은 지난해 부부합산 총소득, 재산은 신청 전년도 6월 1일 기준으로 판단합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">재산 요건과 감액</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 가구원 재산 합계 1억 7천만원 미만: 산정액 전액 지급
                    <br />
                    · 1억 7천만원 이상 2억 4천만원 미만: 산정액의 50%만 지급
                    <br />
                    · 2억 4천만원 이상: 지급 대상 제외
                  </p>
                </div>
                <p className="mt-4">
                  재산에는 주택, 토지, 건물, 전세보증금, 자동차, 예금 등이 모두 합산됩니다. 예외: 부채는 재산에서 차감되지 않으므로, 대출을 끼고 산 집이라도 공시가격 등 평가액 전체가 재산으로 잡힙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">내 예상 지급액, 사례로 확인하기</h2>
                <p>
                  다음 사례로 가구유형과 소득 구간에 따라 지급액이 어떻게 달라지는지 살펴보겠습니다. 실제 산정은 홈택스 모의계산 결과를 따릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 단독가구, 총소득 900만원 (점증구간)</p>
                  <p className="text-sm text-text-secondary">
                    · 가구유형: 단독가구 (배우자·부양가족 없음)
                    <br />
                    · 총소득: 900만원 → 평탄구간에 못 미쳐 점증구간에 위치
                    <br />
                    · 결과: 최대 165만원이 아니라 소득에 비례한 중간 금액 지급
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 소득이 너무 적으면 최대치가 아니라 점증 비례액을 받습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 홑벌이가구, 총소득 1,200만원 (평탄구간)</p>
                  <p className="text-sm text-text-secondary">
                    · 가구유형: 홑벌이 (배우자 소득 없음, 자녀 1명)
                    <br />
                    · 총소득: 1,200만원 → 평탄구간에 위치
                    <br />
                    · 결과: 홑벌이 최대치인 <strong>285만원</strong>에 근접한 금액 지급
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 평탄구간에 들어와야 최대 지급액을 받을 수 있습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 맞벌이가구, 총소득 3,600만원 (점감구간)</p>
                  <p className="text-sm text-text-secondary">
                    · 가구유형: 맞벌이 (부부 각 소득 있음)
                    <br />
                    · 총소득: 3,600만원 → 상한 3,800만원에 근접, 점감구간에 위치
                    <br />
                    · 결과: 최대 330만원이 아니라 크게 줄어든 소액 지급
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 소득이 상한 근처면 최대치가 아니라 점감으로 깎인 금액을 받습니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">정기신청과 반기신청, 지급 시기 비교</h2>
                <p>
                  같은 근로장려금이라도 신청 방식에 따라 받는 시기가 다릅니다. 근로소득만 있는 가구는 반기신청을 선택할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 정기신청 vs 반기신청 지급 방식 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">정기신청</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">반기신청</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대상</td>
                        <td className="p-3">모든 신청자</td>
                        <td className="p-3">근로소득만 있는 가구</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지급 시기</td>
                        <td className="p-3">8월 말 일괄</td>
                        <td className="p-3">상반기분 선지급 + 정산분 분할</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">선지급 비율</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">상반기 산정액의 35%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 반기신청은 상반기 소득으로 추정해 먼저 지급하므로, 하반기 소득이 늘면 다음 해 정산에서 일부를 되돌려줘야 할 수 있습니다. 소득이 들쭉날쭉한 가구라면 정기신청이 정산 부담이 적습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/earned-income-tax-credit-payment-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 지급일·감액</div>
                    <p className="mt-1 text-sm text-text-secondary">8월 27일 지급일과 감액·환수 사유를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/earned-income-tax-credit-semiannual-application-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 반기신청</div>
                    <p className="mt-1 text-sm text-text-secondary">9월 반기신청 기간과 정기신청의 차이.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-benefit-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀장려금 지급액</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀 1명당 최대 100만원, 근로장려금과 중복 수급.</p>
                  </Link>
                  <Link
                    href="/guide/earned-income-tax-credit-late-application-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 기한 후 신청</div>
                    <p className="mt-1 text-sm text-text-secondary">기한을 놓쳤을 때 신청 방법과 5% 감액.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세후 월급과 4대보험 공제를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로·급여 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·4대보험 관련 가이드.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 본문의 표와 사례는 산정 구조 이해를 돕기 위한 것으로, 실제 지급액은 소득·재산·부양가족 등 개별 요건에 따라 달라집니다. 정확한 예상액은 홈택스 또는 손택스의 근로·자녀장려금 모의계산에서 반드시 확인하세요. 본 콘텐츠는 2026-07-29 기준이며, 관련 법령은 조세특례제한법 <strong>§100의3(신청자격)</strong>, <strong>§100의5(근로장려금의 산정)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스(근로·자녀장려금 모의계산)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="근로장려금 얼마 받나 2026 가이드"
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