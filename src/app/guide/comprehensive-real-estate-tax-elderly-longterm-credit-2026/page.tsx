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

const URL = 'https://calculatorhost.com/guide/comprehensive-real-estate-tax-elderly-longterm-credit-2026/';
const DATE_PUBLISHED = '2026-07-17';
const DATE_MODIFIED = '2026-07-17';

export const metadata: Metadata = {
  title: '종부세 고령자·장기보유 세액공제 2026, 최대 80% 감면',
  description:
    '1세대1주택자는 고령자 세액공제(최대 40%)와 장기보유 세액공제(최대 50%)를 합쳐 종합부동산세를 최대 80%까지 줄일 수 있습니다. 종합부동산세법 §9 기준 공제율과 계산법을 은퇴·주택자 사례로 정리합니다.',
  keywords: [
    '종부세 고령자 세액공제',
    '종부세 장기보유 세액공제',
    '1세대1주택 종부세',
    '종부세 80% 감면',
    '종합부동산세 세액공제',
    '은퇴 주택 종부세',
    '종합부동산세법 9조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종부세 고령자·장기보유 세액공제 2026, 최대 80% 감면' }],
    title: '종부세 고령자·장기보유 세액공제 2026, 합산 최대 80%',
    description: '1세대1주택자의 고령자(최대 40%)+장기보유(최대 50%) 세액공제로 종부세를 최대 80% 감면. 종합부동산세법 §9 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종부세 고령자·장기보유 세액공제 2026',
    description: '1세대1주택 고령자+장기보유 합산 최대 80% 감면. 종합부동산세법 §9.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종부세 세액공제로 얼마까지 줄일 수 있나요?',
    answer:
      '1세대1주택자는 고령자 세액공제와 장기보유 세액공제를 합쳐 종합부동산세를 최대 80%까지 줄일 수 있습니다(종합부동산세법 §9). 고령자 공제는 최대 40%, 장기보유 공제는 최대 50%이며, 두 공제를 중복 적용하되 합계는 80%를 한도로 합니다. 나이와 보유 기간이 길수록 감면 폭이 커집니다.',
  },
  {
    question: '고령자 세액공제율은 나이별로 얼마인가요?',
    answer:
      '만 60세 이상 20%, 65세 이상 30%, 70세 이상 40%입니다(종합부동산세법 §9). 과세기준일(6월 1일) 현재 나이를 기준으로 판정하며, 나이가 많을수록 공제율이 높아집니다. 1세대1주택 단독명의 소유자여야 적용됩니다.',
  },
  {
    question: '장기보유 세액공제율은 얼마인가요?',
    answer:
      '보유 기간 5년 이상 20%, 10년 이상 40%, 15년 이상 50%입니다(종합부동산세법 §9). 주택을 오래 보유할수록 공제율이 올라갑니다. 장기보유 공제만으로도 최대 50%까지 종부세를 줄일 수 있어, 고령자 공제와 합치면 감면 효과가 큽니다.',
  },
  {
    question: '두 공제를 모두 받으면 합산이 되나요?',
    answer:
      '네, 두 공제는 중복 적용됩니다. 다만 합계 공제율은 80%가 한도입니다(종합부동산세법 §9). 예를 들어 70세 이상(40%)이면서 15년 이상 보유(50%)라면 단순 합은 90%지만, 한도 80%까지만 적용됩니다. 그래도 종부세의 5분의 4가 줄어드는 큰 혜택입니다.',
  },
  {
    question: '세액공제는 누구에게 적용되나요?',
    answer:
      '1세대1주택자에게 적용됩니다. 세대 구성원 전체가 1주택만 보유하고, 그 주택을 단독명의로 소유한 거주자가 대상입니다. 다주택자나 법인은 이 공제를 받을 수 없습니다. 부부 공동명의는 별도의 과세 방식(1주택 특례 신청 여부)에 따라 적용이 달라지므로 확인이 필요합니다.',
  },
  {
    question: '보유 기간은 어떻게 계산하나요?',
    answer:
      '취득일부터 과세기준일(6월 1일)까지의 기간으로 계산합니다. 상속받은 주택은 피상속인의 보유 기간을 승계하는 등 특례가 있을 수 있으므로, 정확한 기간 산정은 국세청 또는 세무 전문가에게 확인하세요. 5년, 10년, 15년의 경계에 가까우면 공제율 차이가 커서 특히 중요합니다.',
  },
  {
    question: '부부 공동명의도 세액공제를 받을 수 있나요?',
    answer:
      '공동명의는 신청 방식에 따라 달라집니다. 부부 공동명의 1주택자는 각자 지분에 대해 기본공제를 받는 방식과, 1세대1주택 특례를 신청해 단독명의처럼 고령자·장기보유 공제를 받는 방식 중 유리한 쪽을 선택할 수 있습니다. 자산 규모와 나이·보유 기간에 따라 유불리가 달라지므로 비교가 필요합니다.',
  },
  {
    question: '세액공제를 받으려면 따로 신청해야 하나요?',
    answer:
      '1세대1주택 단독명의는 대체로 자동 반영되지만, 공동명의 특례나 합산배제 등은 신청이 필요합니다. 종부세는 국세청이 고지하는 세목이라 기본 공제는 반영되어 나오지만, 특례 적용을 원하면 정해진 기간에 신청해야 하므로 고지서를 확인하고 필요 시 홈택스에서 신청하세요.',
  },
];

export default function ComprehensiveRealEstateTaxElderlyLongtermCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종부세 고령자·장기보유 세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종부세 고령자·장기보유 세액공제 2026, 1세대1주택 최대 80% 감면',
    description:
      '1세대1주택자의 고령자 세액공제(최대 40%)와 장기보유 세액공제(최대 50%)를 합쳐 종합부동산세를 최대 80%까지 줄이는 방법을 종합부동산세법 §9 기준으로 은퇴·주택자 관점에서 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종부세', '고령자 세액공제', '장기보유 세액공제', '1세대1주택', '종합부동산세법 9조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종부세 고령자·장기보유 세액공제 2026',
    description:
      '1세대1주택자의 고령자·장기보유 세액공제로 종합부동산세를 최대 80% 줄이는 방법 정리.',
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
                    { name: '종부세 고령자·장기보유 세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 소유자 · 은퇴 준비층 · 8분 읽기 · 2026-07-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종부세 고령자·장기보유 세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">1세대1주택 최대 80% 감면</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  오래 살던 집 한 채를 가진 은퇴자에게 종합부동산세는 소득 없이 내야 하는 부담스러운 세금입니다. 그런데 1세대1주택자라면 나이와 보유 기간에 따라 종부세를 크게 줄일 수 있는 세액공제가 있습니다. 이 가이드는 고령자 세액공제와 장기보유 세액공제를 합쳐 최대 80%까지 감면받는 방법을 종합부동산세법 §9를 기준으로 주택 소유자와 은퇴 준비층 관점에서 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-comprehensive-real-estate-tax-elderly-longterm-credit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 세액공제가 있나요?</h2>
                <p>
                  1세대1주택자에게는 두 가지 세액공제가 있습니다. 하나는 나이에 따른 고령자 세액공제, 다른 하나는 보유 기간에 따른 장기보유 세액공제입니다(종합부동산세법 §9). 세액공제는 산출된 종부세액에서 일정 비율을 직접 빼주는 방식이라 감면 효과가 즉각적입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">1세대1주택 종부세 세액공제 2종</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 고령자 세액공제: 나이에 따라 20~40% (§9)
                    <br />
                    2. 장기보유 세액공제: 보유 기간에 따라 20~50% (§9)
                    <br />
                    → 두 공제 중복 적용, 합계 한도 80%
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 공제는 1세대1주택 단독명의 소유자에게만 적용됩니다. 다주택자는 세액공제 대상이 아니며, 공동명의는 특례 신청 여부에 따라 적용 방식이 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">나이별·기간별 공제율은 얼마인가요?</h2>
                <p>
                  고령자 공제는 나이가, 장기보유 공제는 보유 기간이 길수록 높아집니다. 두 공제율을 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 1세대1주택 고령자·장기보유 세액공제율 (종합부동산세법 §9, 2026)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">고령자 공제(나이)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">장기보유 공제(기간)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">60세 이상 65세 미만</td>
                        <td className="p-3"><strong>20%</strong></td>
                        <td className="p-3">5년 이상 10년 미만</td>
                        <td className="p-3"><strong>20%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">65세 이상 70세 미만</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">10년 이상 15년 미만</td>
                        <td className="p-3"><strong>40%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">70세 이상</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">15년 이상</td>
                        <td className="p-3"><strong>50%</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 나이는 과세기준일인 6월 1일 현재를 기준으로 판정하고, 보유 기간도 6월 1일까지로 계산합니다. 생일이나 취득일이 경계에 가까우면 1년 차이로 공제율이 크게 달라질 수 있으니 정확한 기준일을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">합산하면 얼마나 감면되나요?</h2>
                <p>
                  두 공제는 중복 적용되며 합계 80%가 한도입니다(종합부동산세법 §9). 실제 종부세액에 적용한 사례로 확인해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 67세, 12년 보유 (산출 종부세 200만원 가정)</p>
                  <p className="text-sm text-text-secondary">
                    · 고령자 공제: 65세 이상 → 30%
                    <br />
                    · 장기보유 공제: 10년 이상 → 40%
                    <br />
                    · 합산 공제율: 30% + 40% = 70% (한도 80% 이내)
                    <br />
                    · 공제액: 200만원 × 70% = 140만원
                    <br />
                    · 납부액: 200만원 − 140만원 = <strong>60만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세액공제로 종부세가 200만원에서 60만원으로 감소.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 72세, 16년 보유 (산출 종부세 300만원 가정)</p>
                  <p className="text-sm text-text-secondary">
                    · 고령자 공제: 70세 이상 → 40%
                    <br />
                    · 장기보유 공제: 15년 이상 → 50%
                    <br />
                    · 단순 합: 40% + 50% = 90% → <strong>한도 80% 적용</strong>
                    <br />
                    · 공제액: 300만원 × 80% = 240만원
                    <br />
                    · 납부액: 300만원 − 240만원 = <strong>60만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 단순 합 90%여도 한도 80%까지만 적용. 그래도 5분의 4 감면.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 종부세액은 이해를 돕기 위한 가정치입니다. 실제 산출세액은 공시가격, 공제금액(1세대1주택 12억), 공정시장가액비율(60%), 세율을 거쳐 계산되므로, 정확한 금액은 종부세 계산기나 홈택스로 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-comprehensive-real-estate-tax-elderly-longterm-credit-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공동명의는 어떻게 하는 게 유리한가요?</h2>
                <p>
                  부부 공동명의 1주택자는 두 가지 과세 방식 중 유리한 쪽을 고를 수 있습니다. 나이·보유 기간에 따라 유불리가 갈립니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 공동명의 1주택 과세 방식 비교 (2026)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유리한 경우</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">지분별 각자 과세</td>
                        <td className="p-3">각자 기본공제 적용</td>
                        <td className="p-3">나이·보유 기간이 짧은 경우</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1주택 특례 신청</td>
                        <td className="p-3">고령자·장기보유 세액공제</td>
                        <td className="p-3">고령·장기보유로 공제율 높은 경우</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 어느 방식이 유리한지는 공시가격, 두 사람의 나이, 보유 기간에 따라 매년 달라질 수 있습니다. 특례 신청은 정해진 기간에만 가능하므로, 매년 고지 전 두 방식을 비교해 선택하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">공제를 놓치지 않으려면</h2>
                <p>
                  세액공제를 최대한 활용하려면 다음을 챙기세요. 특히 경계 나이·기간과 신청 기한이 중요합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>기준일 확인:</strong> 나이와 보유 기간 모두 과세기준일(6월 1일)로 판정합니다. 경계에 가까우면 1년 차이가 큽니다.
                  </li>
                  <li>
                    <strong>1세대1주택 유지:</strong> 세대 내 다른 주택이 생기면 공제 대상에서 벗어나므로 세대 구성과 주택 수를 관리합니다.
                  </li>
                  <li>
                    <strong>공동명의 비교:</strong> 매년 지분별 과세와 특례 신청 방식을 비교해 유리한 쪽을 선택합니다.
                  </li>
                  <li>
                    <strong>고지서 점검:</strong> 종부세 고지서에 공제가 제대로 반영됐는지 확인하고, 누락 시 홈택스에서 정정·신청합니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/comprehensive-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가격을 입력해 종부세와 공제 효과를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-single-house-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 종부세 공제</div>
                    <p className="mt-1 text-sm text-text-secondary">12억 기본공제와 세액공제의 기본 구조.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-joint-ownership-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">공동명의 종부세</div>
                    <p className="mt-1 text-sm text-text-secondary">부부 공동명의의 과세 방식 선택을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-vs-comprehensive-real-estate-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 vs 종합부동산세</div>
                    <p className="mt-1 text-sm text-text-secondary">두 보유세의 차이와 이중 부담 여부.</p>
                  </Link>
                  <Link
                    href="/guide/housing-pension-reverse-mortgage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택연금(역모기지)</div>
                    <p className="mt-1 text-sm text-text-secondary">1주택으로 노후 현금흐름을 만드는 방법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종부세·재산세·양도세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 세액공제 적용 여부, 공제율, 보유 기간 산정, 공동명의 특례는 개인의 나이·보유 기간·세대 구성에 따라 달라지므로, 실제 세액은 국세청 홈택스 또는 세무 전문가와 반드시 확인하세요. 본 콘텐츠는 2026-07-17을 기준으로 작성되었으며, 관련 법령은 <strong>종합부동산세법 §9(세액공제, 고령자·장기보유), §8(과세표준)</strong>을 따릅니다. 공제율(고령자 20·30·40%, 장기보유 20·40·50%, 합산한도 80%)은 현행 기준입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="종부세 고령자·장기보유 세액공제 2026 가이드"
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
