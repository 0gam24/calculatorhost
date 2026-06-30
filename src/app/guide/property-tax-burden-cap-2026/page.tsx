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

const URL = 'https://calculatorhost.com/guide/property-tax-burden-cap-2026/';
const DATE_PUBLISHED = '2026-06-30';
const DATE_MODIFIED = '2026-06-30';

export const metadata: Metadata = {
  title: '재산세 세부담상한제 2026 | 공시가 폭등 시 인상폭 제한',
  description:
    '공시가격 급등 시 재산세 인상폭을 제한하는 세부담상한제. 주택별 상한율(105~130%) 및 전년 대비 실제 부과액 계산법. 지방세법 §122 기준.',
  keywords: [
    '재산세 세부담상한제',
    '재산세 상한율',
    '공시가 폭등',
    '재산세 인상폭',
    '전년 대비 재산세',
    '세부담상한',
    '지방세법 122조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '재산세 세부담상한제 2026 | 공시가 폭등 시 인상폭 제한' }],
    title: '재산세 세부담상한제 2026 — 공시가 급등 때 세금 인상폭 제한 메커니즘',
    description: '공시가격이 50% 올라도 재산세는 전년의 105~130% 이내만 부과. 세부담상한제의 정확한 계산법과 적용 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산세 세부담상한제 2026 — 공시가 급등 시 세금 인상폭 제한',
    description: '공시가가 올라 산출세액이 급증해도 실제 부과액은 전년도의 105~130% 이내. 지방세법 §122.',
  },
};

const FAQ_ITEMS = [
  {
    question: '세부담상한제가 정확히 무엇인가요?',
    answer:
      '세부담상한제는 공시가격 급등으로 인한 재산세 폭증을 방지하기 위한 제도입니다(지방세법 §122). 공정시장가액비율이 올라 산출된 재산세액이 전년도 납부액보다 일정 비율(상한율)을 초과하면, 그 상한 내에서만 세금을 부과하도록 제한하는 것입니다. 예를 들어 전년 재산세가 30만원이고 올해 산출액이 50만원이면 상한 105%인 31.5만원만 부과됩니다.',
  },
  {
    question: '상한율이 공시가격별로 다르다는데, 정확히 얼마인가요?',
    answer:
      '주택의 공시가격에 따라 상한율이 다릅니다(지방세법 §122): 공시가격 3억원 이하 주택은 전년의 105%, 3억원 초과 6억원 이하는 110%, 6억원 초과는 130%입니다. 상한율이 높을수록 인상폭이 커지는데, 이는 공시가격이 높을수록 시장 변동성이 크다는 정책 판단입니다.',
  },
  {
    question: '세부담상한이 적용되지 않는 경우도 있나요?',
    answer:
      '네, 신축 또는 증축·용도변경으로 과세대상이 바뀐 경우, 세부담상한이 적용되지 않을 수 있습니다. 이 경우 직전연도 상당액 산정이 달라지므로, 정확한 적용 여부는 관할 시·군·구청 또는 위택스에서 반드시 확인해야 합니다.',
  },
  {
    question: '공시가 50% 올라도 재산세는 정말 30만원대에 머물까요?',
    answer:
      '상한율이 적용되면 그렇습니다. 전년 재산세 30만원인 주택의 공시가가 50% 올라 산출액이 65만원이 되어도, 공시가 3억 이하면 상한 105% = 31.5만원만 부과됩니다. 다만 지방교육세, 도시지역분 등 부가세목은 별도 계산되므로 최종 납부액은 이보다 높을 수 있습니다.',
  },
  {
    question: '지방교육세도 세부담상한의 영향을 받나요?',
    answer:
      '재산세 본세에 세부담상한이 적용되면, 지방교육세(재산세의 20%)도 함께 인상폭이 제한됩니다. 하지만 도시지역분, 지역자원시설세 등 부가세목은 별도 계산되며, 각 세목마다 상한 규칙이 다를 수 있으므로 정확한 정보는 위택스를 통해 확인하세요.',
  },
  {
    question: '세부담상한이 적용되는지 어떻게 알 수 있나요?',
    answer:
      '납세 통지서에 "세부담상한액 적용" 또는 "전년도 대비 인상률 제한" 같은 표기가 있습니다. 확실하지 않으면 위택스(wetax.go.kr)에서 개인 계정으로 로그인 후 납세 내역을 상세 조회하거나, 관할 시·군·구청 세무서에 직접 문의하세요.',
  },
  {
    question: '매년 세부담상한이 새로 계산되나요?',
    answer:
      '네, 세부담상한은 매년 새로운 공시가격을 기준으로 재계산됩니다. 즉, 올해 세부담상한이 적용되어 31.5만원만 내도, 내년에는 전년(30만원 기준이 아닌 올해 31.5만원을 기준)에서 새로 상한율을 적용합니다. 장기간 관찰하면 공시가가 안정될 때까지 인상폭이 완만해집니다.',
  },
  {
    question: '세부담상한제 외에 다른 감면 제도가 있나요?',
    answer:
      '네, 1세대1주택 특례(공시가 9억 이하 시 특례세율 적용), 공시가격 이의신청 등이 있습니다. 또한 지자체별로 경기진흥세제나 특별감면 조례가 있을 수 있으므로, 관할 지자체 웹사이트를 확인하시기 바랍니다.',
  },
];

export default function PropertyTaxBurdenCap2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 세부담상한제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 세부담상한제 2026 — 공시가 폭등 시 세금 인상폭 제한 메커니즘',
    description:
      '공시가격 급등으로 인한 재산세 폭증을 방지하는 세부담상한제. 주택 공시가격별 상한율(105~130%), 전년 대비 실제 부과액 계산법, 예외 케이스까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세', '세부담상한제', '공시가', '상한율', '전년 대비'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 세부담상한제 2026',
    description:
      '공시가격 급등 시 재산세 인상폭을 제한하는 세부담상한제의 정확한 메커니즘과 계산법.',
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
                    { name: '재산세 세부담상한제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 소유자 · 8분 읽기 · 2026-06-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 세부담상한제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 공시가 폭등 시 세금 인상폭 제한</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  최근 몇 년간 공시가격이 급등하면서 주택소유자들의 재산세 부담이 크게 늘었습니다. 그런데 정부는 이런 급격한 세부담 증가를 완화하기 위해 세부담상한제라는 제도를 운영 중입니다. 이 가이드는 공시가가 올라도 실제로 납부하는 재산세가 어떻게 제한되는지, 상한율은 무엇인지, 그리고 그 계산법까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-burden-cap-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세부담상한제란 무엇인가</h2>
                <p>
                  지방세법 §122에 따른 세부담상한제는 공시가격 급등으로 인한 재산세 폭증을 방지하기 위한 제도입니다. 간단히 말해, 공시가격이 올라 산출된 재산세액이 전년도 납부액보다 일정 비율을 초과하면, 그 비율 이내에서만 세금을 부과하도록 제한하는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">세부담상한의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    올해 산출된 재산세액이 전년도 납부액의 상한율을 초과하면, 상한율 이내의 금액만 부과됩니다.
                    <br />
                    예: 전년 재산세 30만원, 올해 산출액 50만원, 상한율 105% (공시가 3억 이하)
                    <br />
                    → 실제 부과액 = min(50만원, 30만원 × 105%) = min(50만원, 31.5만원) = <strong>31.5만원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  이 제도는 공시가격이 급등하던 시기에 주택소유자의 세 충격을 완화하기 위해 도입됐습니다. 공시가격 인상률이 높더라도 재산세 인상률은 일정 범위 내로 제한되므로, 예측 가능한 세부담을 유지할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공시가격별 상한율 (지방세법 §122)</h2>
                <p>
                  세부담상한율은 주택의 공시가격 수준에 따라 다릅니다. 공시가격이 높을수록 상한율이 높은 이유는, 고가 주택이 시장 변동성이 크다는 정책 판단에서 비롯됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택 세부담상한율 (지방세법 §122, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공시가격</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상한율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3억원 이하</td>
                        <td className="p-3"><strong>105%</strong></td>
                        <td className="p-3">전년 대비 최대 5% 인상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3억원 초과~6억원 이하</td>
                        <td className="p-3"><strong>110%</strong></td>
                        <td className="p-3">전년 대비 최대 10% 인상</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">6억원 초과</td>
                        <td className="p-3"><strong>130%</strong></td>
                        <td className="p-3">전년 대비 최대 30% 인상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  상한율은 공시가격이 확정되는 시점에 적용되며, 매년 새로운 공시가격을 기준으로 재계산됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 이 상한율은 재산세 본세에만 적용됩니다. 지방교육세, 도시지역분, 지역자원시설세 등 부가세목은 별도의 세율과 계산 기준이 있을 수 있으므로, 정확한 최종 납부액은 위택스(wetax.go.kr)에서 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세부담상한의 실제 계산 사례</h2>
                <p>
                  다음 3가지 사례를 통해 세부담상한이 실제로 어떻게 작동하는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 공시가 3억원 이하 주택 (상한율 105%)</p>
                  <p className="text-sm text-text-secondary">
                    · 전년도 재산세액: 30만원
                    <br />
                    · 올해 공시가격: 2억 5천만원 (전년 대비 20% 인상)
                    <br />
                    · 올해 산출 재산세액: 50만원 (공시가 인상으로 인한 증가)
                    <br />
                    · 세부담상한액: 30만원 × 105% = <strong>31.5만원</strong>
                    <br />
                    · 실제 부과액: min(50만원, 31.5만원) = <strong>31.5만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 산출액 50만원에도 불구하고 31.5만원만 부과. 약 18.5만원 감면 효과.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 공시가 4억원 주택 (상한율 110%)</p>
                  <p className="text-sm text-text-secondary">
                    · 전년도 재산세액: 60만원
                    <br />
                    · 올해 공시가격: 4억원 (전년 대비 30% 인상)
                    <br />
                    · 올해 산출 재산세액: 120만원
                    <br />
                    · 세부담상한액: 60만원 × 110% = <strong>66만원</strong>
                    <br />
                    · 실제 부과액: min(120만원, 66만원) = <strong>66만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 산출액 120만원 중 66만원만 부과. 약 54만원 감면.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 공시가 7억원 주택 (상한율 130%)</p>
                  <p className="text-sm text-text-secondary">
                    · 전년도 재산세액: 100만원
                    <br />
                    · 올해 공시가격: 7억원 (전년 대비 40% 인상)
                    <br />
                    · 올해 산출 재산세액: 200만원
                    <br />
                    · 세부담상한액: 100만원 × 130% = <strong>130만원</strong>
                    <br />
                    · 실제 부과액: min(200만원, 130만원) = <strong>130만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 산출액 200만원 중 130만원만 부과. 약 70만원 감면.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세부담상한이 적용되지 않는 경우</h2>
                <p>
                  모든 재산세에 세부담상한이 적용되는 것은 아닙니다. 특정 상황에서는 세부담상한 제도가 작동하지 않을 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>신축 주택:</strong> 처음 과세되는 주택은 전년도 납부액이 없으므로 세부담상한이 적용되지 않습니다. 산출된 재산세액을 그대로 부과받습니다.
                  </li>
                  <li>
                    <strong>증축·용도변경:</strong> 건물을 증축하거나 용도를 변경하면 과세대상이 바뀌어 직전연도 상당액 산정이 달라질 수 있으며, 이 경우 세부담상한의 정확한 적용이 어려울 수 있습니다.
                  </li>
                  <li>
                    <strong>공시가격 하락:</strong> 공시가격이 내려가서 산출 재산세액이 전년보다 적으면 세부담상한이 필요 없습니다. 낮은 금액을 바로 부과합니다.
                  </li>
                  <li>
                    <strong>특례 적용 대상 변경:</strong> 1세대1주택 특례를 받다가 다주택이 되거나, 특례 대상에서 벗어나면 세부담상한의 기준이 바뀔 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 정확한 적용 여부와 계산은 개별 주택의 상황에 따라 달라지므로, 의심스러울 때는 관할 시·군·구청 세무서 또는 위택스에서 직접 확인하는 것이 가장 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세부담상한 적용 여부 확인 방법</h2>
                <p>
                  자신의 주택에 세부담상한이 적용되는지, 얼마나 감면 혜택을 받는지 확인하는 방법은 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 납세 통지서 확인</p>
                  <p className="text-sm text-text-secondary">
                    6월 중순경 받는 납세 통지서를 자세히 보면 세부담상한이 적용되었는지 표기되어 있습니다. "세부담상한액 적용" 또는 "상한액 이내 부과" 같은 표기를 찾아보세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 위택스 온라인 조회</p>
                  <p className="text-sm text-text-secondary">
                    위택스(wetax.go.kr)에 개인 계정으로 로그인 후 "재산세 조회" 메뉴에서 상세 내역을 볼 수 있습니다. 산출액, 세부담상한액, 실제 부과액이 모두 표시되므로 한눈에 확인할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 3. 관할 시·군·구청 세무서 문의</p>
                  <p className="text-sm text-text-secondary">
                    전화 또는 방문으로 관할 시·군·구청 세무서에 직접 문의하면, 담당자가 상세히 설명해줍니다. 특히 신축, 증축, 용도변경 등 특수한 상황에서는 직접 문의하는 것이 가장 정확합니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-property-tax-burden-cap-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">세부담상한제와 다른 감면 제도의 관계</h2>
                <p>
                  재산세에는 세부담상한제 외에도 여러 감면 제도가 있습니다. 이들이 어떻게 작동하는지 이해하면 자신의 세부담을 더 정확히 예측할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>1세대1주택 특례:</strong> 공시가격 9억원 이하인 1세대1주택이면 일반세율보다 낮은 특례세율이 적용됩니다. 세부담상한과는 별개의 제도로, 두 제도 모두 적용될 수 있습니다.
                  </li>
                  <li>
                    <strong>공시가격 이의신청:</strong> 공시가격이 실제 시세보다 높다고 생각되면 고시 후 60일 내에 이의신청을 할 수 있습니다. 이를 통해 과세표준을 낮추면 산출 재산세액 자체가 줄어들어 세부담상한보다 더 큰 감면 효과를 기대할 수 있습니다.
                  </li>
                  <li>
                    <strong>지자체 특별감면:</strong> 지자체별로 저소득층, 다자녀 가구 등을 위한 특별감면 조례가 있을 수 있습니다. 관할 지자체 웹사이트를 확인하세요.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">장기적 관점에서의 세부담상한</h2>
                <p>
                  세부담상한제는 공시가가 급등하던 시기에 세 충격을 완화하기 위한 제도입니다. 하지만 공시가격이 안정되면 상한율의 효과는 점점 줄어듭니다.
                </p>
                <p className="mt-4">
                  예를 들어 처음 1년은 공시가 30% 인상으로 인한 세액 폭증이 상한율로 제한되지만, 그 다음해부터는 새로운 높은 기준점에서 5~10% 범위의 인상이 일반화됩니다. 장기적으로 보면 공시가격 인상과 함께 세부담도 서서히 증가하는 추세를 보이게 됩니다.
                </p>
                <p className="mt-4">
                  따라서 세부담상한제를 "영구적 감면"으로 생각하기보다는, "급격한 변화의 완충 장치"로 이해하는 것이 정확합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준을 입력하여 재산세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율·과세표준·누진공제의 기본을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-july-payment-schedule-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 7월 납부 일정·분납</div>
                    <p className="mt-1 text-sm text-text-secondary">7월·9월 납기와 250만원 초과 분할납부 방법.</p>
                  </Link>
                  <Link
                    href="/guide/june-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">6월 재산세 완벽 준비</div>
                    <p className="mt-1 text-sm text-text-secondary">재산세 고지부터 대비까지 한 달 체크리스트.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-vs-comprehensive-real-estate-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 vs 종합부동산세</div>
                    <p className="mt-1 text-sm text-text-secondary">다주택 보유 시 두 세목의 차이를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 세부담상한 적용 여부, 상한액, 최종 납부액은 관할 시·군·구청 세무서 또는 위택스에서 반드시 확인하세요. 특히 신축, 증축, 용도변경, 특례 적용 변경 등의 경우 상황이 복잡할 수 있으므로 직접 문의하는 것이 안전합니다. 본 콘텐츠는 2026-06-30을 기준으로 작성되었으며, 지방세법 개정 시 즉시 업데이트됩니다. 세부담상한제의 정확한 기준은 법조항 <strong>지방세법 §122(세부담의 상한)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://etax.seoul.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">서울시 이택스</a>.
                </p>
              </section>

              <ShareButtons
                title="재산세 세부담상한제 2026 가이드"
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
