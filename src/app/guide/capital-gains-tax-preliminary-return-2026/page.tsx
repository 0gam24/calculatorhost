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

const URL = 'https://calculatorhost.com/guide/capital-gains-tax-preliminary-return-2026/';
const DATE_PUBLISHED = '2026-07-01';
const DATE_MODIFIED = '2026-07-01';

export const metadata: Metadata = {
  title: '양도소득세 예정신고 2026 | 2개월 기한·무신고 가산세',
  description:
    '부동산 양도 시 예정신고·납부 기한(2개월), 무신고 가산세(20%), 확정신고 합산 방법 완전 해설. 소득세법 §105·§106·국세기본법 §47의2.',
  keywords: [
    '양도소득세 예정신고',
    '예정신고 기한',
    '양도소득세 2개월',
    '무신고 가산세',
    '소득세법 105조',
    '확정신고 합산',
    '양도세 납부',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '양도소득세 예정신고 2026 | 2개월 기한·무신고 가산세' }],
    title: '양도소득세 예정신고 2026 — 부동산 양도 후 2개월 내 신고·납부 필수',
    description: '부동산 양도일이 속한 달 말일부터 2개월 이내 양도소득세 예정신고·납부 의무. 무신고 시 20% 가산세. 2회 이상 양도 시 확정신고로 합산.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '양도소득세 예정신고 2026 — 부동산 양도 후 2개월 신고 기한',
    description: '양도일 속한 달 말일부터 2개월 이내 예정신고. 무신고 시 20% 가산세 + 납부지연세.',
  },
};

const FAQ_ITEMS = [
  {
    question: '양도소득세 예정신고가 정확히 무엇인가요?',
    answer:
      '양도소득세 예정신고는 부동산을 양도한 후, 양도일이 속하는 달의 말일부터 2개월 이내에 예상되는 양도소득세를 신고하고 납부하는 의무(소득세법 §105, §106)입니다. 이는 다음해 5월 확정신고와는 별개로, 양도 후 즉시 해야 하는 신고입니다.',
  },
  {
    question: '양도소득세 예정신고 기한은 정확히 언제인가요?',
    answer:
      '부동산의 양도일이 속하는 달의 말일부터 2개월 이내입니다(소득세법 §106). 예를 들어 3월 15일에 잔금을 받았다면, 3월 말일(3월 31일)부터 2개월 = 5월 31일까지 신고하면 됩니다. 주식이나 펀드는 반기 단위(상반기 양도면 8월 말)로 달라집니다.',
  },
  {
    question: '예정신고를 하지 않으면 어떻게 되나요?',
    answer:
      '무신고 가산세 20%를 부과받습니다(국세기본법 §47의2). 산출세액이 1,000만원이면 가산세는 200만원입니다. 추가로 미납세액에 대한 납부지연세(일 0.022%, 연 약 8%)도 붙습니다. 따라서 신고하지 않으면 세액보다 더 큰 페널티를 받을 수 있습니다.',
  },
  {
    question: '부담부증여는 예정신고 기한이 다른가요?',
    answer:
      '네, 부담부증여(증여세 양도분 포함)는 증여일이 속하는 달 말일부터 3개월 이내에 신고·납부합니다(소득세법 §106의2). 일반 양도(2개월)보다 1개월 더 여유가 있습니다. 혼동하지 않도록 주의하세요.',
  },
  {
    question: '한 해에 2번 이상 부동산을 팔면 어떻게 되나요?',
    answer:
      '각 양도마다 예정신고를 해야 합니다. 예를 들어 2월에 주택 A를 팔고 9월에 주택 B를 팔았다면, 2월 신고와 9월 신고를 따로 하고, 다음해 5월 확정신고에서 두 양도차익을 합산하여 누진세율을 다시 계산합니다. 이때 합산으로 인해 세율이 올라가 추가 세액이 발생할 수 있습니다.',
  },
  {
    question: '예정신고 세액공제가 있나요?',
    answer:
      '아니요, 현재는 예정신고 세액공제 제도가 폐지되었습니다(2024년 폐지). 따라서 예정신고를 해도 세액공제를 받지 못하고, 확정신고에서 최종 세액을 재계산합니다. 다만 예정신고 의무는 여전히 존재하며, 하지 않으면 가산세를 받습니다.',
  },
  {
    question: '예정신고는 어디서 하나요?',
    answer:
      '홈택스(hometax.go.kr)에 로그인하여 "신고>소득신고>양도소득세 신고"에서 온라인으로 신고합니다. 또는 관할 세무서 방문 또는 세무사 위임도 가능합니다. 온라인이 가장 간편하고 빠릅니다.',
  },
  {
    question: '예정신고 후 실제 세액이 달라지면?',
    answer:
      '다음해 5월 확정신고에서 최종 세액을 재계산합니다. 예정신고 시 세액이 1,000만원이었는데 확정신고에서 최종 세액이 1,200만원이면, 200만원을 추가로 납부합니다. 반대로 더 작으면 환급받습니다.',
  },
];

export default function CapitalGainsTaxPreliminaryReturn2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '양도소득세 예정신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '양도소득세 예정신고 2026 — 부동산 양도 후 2개월 내 신고·납부 완벽 가이드',
    description:
      '부동산 양도일이 속한 달 말일부터 2개월 이내 예정신고·납부 의무, 무신고 가산세 20%, 2회 이상 양도 시 확정신고 합산 방법, 예정신고세액공제 폐지 등을 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['양도소득세', '예정신고', '기한', '가산세', '확정신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '양도소득세 예정신고 2026',
    description:
      '부동산 양도 후 2개월 내 신고·납부 의무와 무신고 가산세, 확정신고 합산의 정확한 메커니즘.',
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
                    { name: '양도소득세 예정신고 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 양도자 · 9분 읽기 · 2026-07-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  양도소득세 예정신고 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 2개월 기한·무신고 가산세 20%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부동산을 팔고 나면 그 이익에 대해 양도소득세를 내야 합니다. 그런데 많은 사람들이 놓치는 것이 바로 "예정신고"입니다. 양도일부터 2개월 이내에 신고하지 않으면 20%의 무신고 가산세가 붙습니다. 이 가이드는 예정신고의 기한, 계산법, 무신고 시 페널티, 그리고 2회 이상 양도 시 확정신고 합산 방법까지 완벽하게 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-capital-gains-tax-preliminary-return-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">양도소득세 예정신고란 무엇인가</h2>
                <p>
                  소득세법 §105에 따른 양도소득세 예정신고는 부동산을 양도한 후 그 소득에 대해 미리 신고하고 세금을 납부하는 의무입니다. 예정신고는 양도 직후 즉시 이루어져야 하며, 다음해 5월의 확정신고와는 별개의 신고입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">예정신고의 핵심 개념</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    양도일이 속하는 달의 말일부터 2개월 이내에 양도 이익에 대한 예상 세액을 신고하고 납부하는 것입니다. 예를 들어 3월 15일에 부동산 잔금을 받았다면, 3월 31일부터 2개월 = 5월 31일까지 신고하면 됩니다.
                  </p>
                </div>
                <p className="mt-4">
                  예정신고는 납세 의무자가 스스로 세액을 추정하여 신고합니다. 나중에 확정신고에서 최종 세액이 정해지므로, 예정신고 시 과다 납부되었으면 환급받고, 과소 납부했으면 추가 납부합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정신고 기한 (소득세법 §106)</h2>
                <p>
                  양도소득세 예정신고 기한은 자산의 종류에 따라 다릅니다. 가장 흔한 부동산 양도부터 설명하겠습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 자산별 양도소득세 예정신고 기한 (소득세법 §106, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">양도 자산</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>부동산</strong><br />(주택·토지·건물)</td>
                        <td className="p-3"><strong>양도일 속한 달 말일부터 2개월 이내</strong></td>
                        <td className="p-3">3/15 양도 → 5/31까지 신고</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>부담부증여</strong><br />(증여세 양도분)</td>
                        <td className="p-3"><strong>증여일 속한 달 말일부터 3개월 이내</strong></td>
                        <td className="p-3">3/15 증여 → 6/30까지 신고</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>유가증권·펀드·파생상품</strong></td>
                        <td className="p-3"><strong>반기 말일부터 2개월 이내</strong></td>
                        <td className="p-3">상반기 양도 → 8/31까지 신고</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  부동산이 가장 흔한 경우이므로, "2개월 이내"를 기억하면 됩니다. 다만 부담부증여는 3개월이므로 혼동하지 않도록 주의하세요.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 기한 말일이 휴일이면 그 다음 영업일까지 연장됩니다(국세기본법 §51). 정확한 기한은 홈택스(hometax.go.kr)의 "신고기한 확인" 메뉴에서 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무신고 가산세 (국세기본법 §47의2)</h2>
                <p>
                  양도소득세 예정신고를 기한 내에 하지 않으면 무신고 가산세를 부과받습니다. 이는 매우 큰 페널티이므로 반드시 피해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">무신고 가산세 계산</p>
                  <p className="text-sm text-text-secondary">
                    <strong>무신고 가산세 = 산출세액 × 20%</strong> (국세기본법 §47의2)
                    <br />
                    부정행위(증거 인멸 등)가 있으면 40% 적용
                    <br />
                    <br />
                    예시: 양도차익 1억원, 과세표준 9,750만원(기본공제 250만)
                    <br />
                    → 과세표준 9,750만원 × 38% - 1,994만 = <strong>산출세액 약 718만원</strong>
                    <br />
                    → 무신고 시 가산세 = 718만원 × 20% = <strong>143.6만원(약 144만원)</strong>
                    <br />
                    → 추가로 납부지연세(일 0.022% × 미납일수) 발생
                    <br />
                    → 총 페널티는 세액보다 클 수 있음!
                  </p>
                </div>
                <p className="mt-4">
                  예정신고를 하지 않는 것은 세금을 피하는 것이 아니라, 세금에 추가 페널티를 더하는 행동입니다. 따라서 모든 부동산 양도 후 반드시 예정신고를 해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정신고 세액의 계산</h2>
                <p>
                  예정신고 시 신고할 세액은 어떻게 계산할까요? 기본적으로 양도소득세의 과세표준과 세율을 이용합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">예정신고 세액 계산 단계</p>
                  <p className="text-sm text-text-secondary">
                    1단계: 양도차익 = 양도가 - 취득가 - 양도 비용
                    <br />
                    2단계: 과세표준 = 양도차익 - 기본공제 250만원
                    <br />
                    3단계: 산출세액 = 과세표준 × 세율 - 누진공제
                    <br />
                    (세율·누진공제는 소득세법 §55의 종합소득세 누진세율 적용)
                    <br />
                    4단계: 지방소득세 = 산출세액 × 10%
                    <br />
                    5단계: 예정신고 납부액 = 산출세액 + 지방소득세
                  </p>
                </div>
                <p className="mt-4">
                  예정신고는 "예상" 세액을 신고하는 것이므로, 양도 비용이나 감면 조건이 불명확하면 보수적으로 높게 신고했다가 확정신고에서 정정할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 예정신고 사례</h2>
                <p>
                  다음 3가지 사례를 통해 예정신고가 실제로 어떻게 이루어지는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 잔금 3/15 받음 → 5/31까지 신고</p>
                  <p className="text-sm text-text-secondary">
                    · 양도 일자: 2026년 3월 15일 (잔금 수령 기준)
                    <br />
                    · 양도차익: 1억원 (양도가 15억 - 취득가 13억 - 양도비용 2,000만)
                    <br />
                    · 과세표준: 1억원 - 250만 = 9,750만원
                    <br />
                    · 세율: 38% (누진세율, 소득세법 §55)
                    <br />
                    · 누진공제: 1,994만원
                    <br />
                    · 산출세액: 9,750만 × 38% - 1,994만 = <strong>약 718만원</strong>
                    <br />
                    · 지방소득세: 718만 × 10% = <strong>약 72만원</strong>
                    <br />
                    · 예정신고 납부액: 718만 + 72만 = <strong>약 790만원</strong>
                    <br />
                    · 기한: 3월 31일(양도일 속한 달 말일) + 2개월 = <strong>5월 31일</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 5월 31일까지 790만원을 홈택스에서 신고·납부해야 함.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 무신고 발생 시 페널티</p>
                  <p className="text-sm text-text-secondary">
                    · 위 사례 1에서 예정신고를 하지 않음
                    <br />
                    · 산출세액: 718만원
                    <br />
                    · 무신고 가산세: 718만 × 20% = <strong>약 144만원</strong>
                    <br />
                    · 납부지연세(180일 기준): 718만 × (180/365) × 0.022% ≈ <strong>약 7만원</strong>
                    <br />
                    · 최종 납부액: 718만 + 144만 + 7만 = <strong>약 869만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 신고하지 않아 페널티만 151만원 추가. 반드시 신고하세요!</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 같은 해 2번 양도 후 확정신고 합산</p>
                  <p className="text-sm text-text-secondary">
                    · 2월 양도(공동주택): 양도차익 5,000만, 예정신고 세액 약 200만
                    <br />
                    · 9월 양도(오피스텔): 양도차익 8,000만, 예정신고 세액 약 320만
                    <br />
                    · 예정신고 총 납부: 520만원
                    <br />
                    <br />
                    ↓ 다음해 5월 확정신고에서
                    <br />
                    <br />
                    · 합산 양도차익: 5,000만 + 8,000만 = 1.3억
                    <br />
                    · 합산 과세표준: 1.3억 - 250만 = 1.275억
                    <br />
                    · 세율: 38% (합산으로 누진세 상승)
                    <br />
                    · 누진공제: 1,994만
                    <br />
                    · 합산 산출세액: 1.275억 × 38% - 1,994만 = <strong>약 981만원</strong>
                    <br />
                    · 이미 납부한 예정신고세: 520만 → 추가 납부 461만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 개별 신고(520만)보다 합산 신고(981만)의 세액이 461만원 더 높음. 합산으로 인한 누진세 상승 효과.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">확정신고와의 관계</h2>
                <p>
                  양도소득세 예정신고와 확정신고는 별개이지만 밀접한 관계가 있습니다. 이를 정확히 이해해야 세부담을 예측할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>예정신고는 양도 후 2개월 이내:</strong> 부동산 양도일이 속한 달 말일부터 2개월 이내에 "예상" 세액을 신고합니다.
                  </li>
                  <li>
                    <strong>확정신고는 다음해 5월:</strong> 다음 연도 5월 1~31일에 해당 연도 전체 소득(양도소득 포함)을 신고하고 최종 세액을 확정합니다.
                  </li>
                  <li>
                    <strong>합산 신고:</strong> 같은 과세연도에 2회 이상 양도가 있으면, 확정신고 시 모든 양도차익을 합산하여 누진세율을 다시 적용합니다. 이 과정에서 세액이 올라갈 수 있습니다.
                  </li>
                  <li>
                    <strong>예정신고 세액공제 폐지:</strong> 과거에는 예정신고한 세액을 확정신고에서 공제했지만, 2024년부터 이 제도가 폐지되었습니다. 따라서 예정신고를 해도 확정신고에서 추가 납부하거나 환급받을 가능성은 여전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 "예정신고 세액공제 폐지"는 2024년 세법 개정이므로, 본인의 양도 연도에 따라 적용 여부가 달라질 수 있습니다. 정확한 확인은 홈택스 또는 세무사에 문의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정신고 방법 및 신고처</h2>
                <p>
                  양도소득세 예정신고는 어디에서 어떻게 해야 할까요? 다양한 방법이 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 홈택스 온라인 신고 (가장 편함)</p>
                  <p className="text-sm text-text-secondary">
                    홈택스(hometax.go.kr)에 로그인 후 "신고 › 소득신고 › 양도소득세 신고"에서 온라인으로 신고합니다. 증빙 서류는 스캔 후 첨부하면 되므로 가장 간편합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 관할 세무서 방문 신고</p>
                  <p className="text-sm text-text-secondary">
                    거주지 관할 세무서에 방문하여 양도계약서, 잔금영수증, 매매차 계산서 등을 제출하고 신고합니다. 담당자가 직접 도움을 주므로 불안한 경우 추천합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 3. 세무사·전문가 위임</p>
                  <p className="text-sm text-text-secondary">
                    세무사나 회계사에 위임하여 대리 신고할 수 있습니다. 위임료가 들지만(보통 30~50만원), 복잡한 경우(합산 양도, 감면 조건 등)에는 추천됩니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-capital-gains-tax-preliminary-return-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">예정신고 시 준비할 서류</h2>
                <p>
                  예정신고를 할 때 필요한 서류를 미리 준비해두면 신고가 훨씬 수월합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>매매계약서:</strong> 양수인과 양도인이 서명한 계약서 사본 (취득가·양도가 확인)
                  </li>
                  <li>
                    <strong>잔금영수증 또는 통장 사본:</strong> 양도대금 수령 증거 (양도일 확인)
                  </li>
                  <li>
                    <strong>취득 당시 영수증:</strong> 과거 매매계약서·잔금영수증 (취득가 입증)
                  </li>
                  <li>
                    <strong>양도 비용 영수증:</strong> 중개수수료, 측량비, 법무사 비용, 수리비 등 (양도 시 소요된 비용 영수증)
                  </li>
                  <li>
                    <strong>납세자 증명 서류:</strong> 주민등록등본, 신분증 사본
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자주 묻는 실수와 주의사항</h2>
                <p>
                  양도소득세 예정신고 시 자주 하는 실수를 정리했습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>기한 착각:</strong> "2개월"을 "달력 2개월"이 아닌 "말일 기준 2개월"로 이해해야 합니다. 3월 15일 양도면 3월 31일부터 2개월 = 5월 31일이지, 5월 15일이 아닙니다.
                  </li>
                  <li>
                    <strong>양도 비용 누락:</strong> 중개수수료, 측량비, 법무사 비용 등을 모두 공제 가능합니다. 누락하면 세액이 과다 계산됩니다.
                  </li>
                  <li>
                    <strong>기본공제 미적용:</strong> 양도차익에서 250만원의 기본공제를 해야 합니다. 빠뜨리면 세액 과다 납부.
                  </li>
                  <li>
                    <strong>세율 오류:</strong> 보유 기간과 지역 조건(조정지역 여부 등)에 따라 세율이 달라질 수 있습니다. 정확한 세율 적용이 중요합니다.
                  </li>
                  <li>
                    <strong>1세대1주택 비과세 확인:</strong> 조건을 충족하면 전액 비과세이므로 예정신고 자체가 불필요합니다. 선택 신고 가능한지 확인하세요.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 위 사항들은 개인의 상황에 따라 적용이 달라질 수 있으므로, 불확실한 경우 반드시 홈택스 상담 또는 세무사 문의를 권장합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">양도차익과 세율을 입력하여 실제 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 5단계 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익·기본공제·누진세율까지 기본 개념을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-tips/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 절세 팁 7가지</div>
                    <p className="mt-1 text-sm text-text-secondary">보유 기간·공제 항목·세율 우대 조건을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">조건과 한도, 12억 초과분 과세 방법을 설명합니다.</p>
                  </Link>
                  <Link
                    href="/guide/presale-right-capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">분양권 양도세 60% vs 40%</div>
                    <p className="mt-1 text-sm text-text-secondary">보유 기간별 차등 세율을 알아봅니다.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·재산세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 예정신고 기한, 세액 계산, 감면 적용 여부는 홈택스(hometax.go.kr) 또는 관할 세무서에서 반드시 확인하세요. 특히 복수 양도, 일시적 2주택, 조정지역 거주 등의 경우 세율이 크게 달라질 수 있으므로 전문가 상담을 권합니다. 본 콘텐츠는 2026-07-01을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 양도소득세 예정신고의 정확한 기준은 법조항 <strong>소득세법 §105(양도소득과세표준 예정신고), §106(예정신고납부), 국세기본법 §47의2(무신고가산세)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스(국세청)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식 사이트</a>.
                </p>
              </section>

              <ShareButtons
                title="양도소득세 예정신고 2026 가이드"
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
