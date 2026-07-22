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

const URL = 'https://calculatorhost.com/guide/noran-umbrella-mutual-aid-deduction-2026/';
const DATE_PUBLISHED = '2026-07-17';
const DATE_MODIFIED = '2026-07-17';

export const metadata: Metadata = {
  title: '노란우산공제 소득공제 2026, 사업자 최대 600만원 절세',
  description:
    '노란우산공제(소기업·소상공인 공제부금)는 사업소득금액에 따라 연 200~600만원을 소득공제합니다. 조세특례제한법 §86의3 기준 공제한도·해지 시 과세·가입 조건을 사업자·프리랜서 사례로 정리합니다.',
  keywords: [
    '노란우산공제',
    '소기업소상공인공제',
    '노란우산 소득공제',
    '사업자 절세',
    '프리랜서 소득공제',
    '노란우산 한도 600만원',
    '조세특례제한법 86조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '노란우산공제 소득공제 2026, 사업자 최대 600만원 절세' }],
    title: '노란우산공제 소득공제 2026, 사업소득별 200~600만원 공제한도',
    description: '사업소득금액 4천만원 이하면 최대 600만원까지 소득공제. 조세특례제한법 §86의3 기준 공제한도와 해지 과세를 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '노란우산공제 소득공제 2026, 사업자 최대 600만원',
    description: '사업소득금액 구간별 200~600만원 소득공제. 조세특례제한법 §86의3.',
  },
};

const FAQ_ITEMS = [
  {
    question: '노란우산공제 소득공제 한도는 얼마인가요?',
    answer:
      '2026년 기준 사업소득금액에 따라 연 200만원에서 600만원까지 공제됩니다(조세특례제한법 §86의3). 사업소득금액 4천만원 이하는 600만원, 4천만원 초과 1억원 이하는 400만원, 1억원 초과는 200만원 한도입니다. 2025년 세법 개정으로 종전 500/300/200만원에서 600/400/200만원으로 상향된 값입니다.',
  },
  {
    question: '노란우산공제는 누가 가입할 수 있나요?',
    answer:
      '소기업·소상공인 요건을 갖춘 개인사업자와 법인 대표가 가입 대상입니다. 업종별 매출액 기준을 충족하는 소상공인이면 프리랜서(인적용역 사업소득자)도 가입할 수 있습니다. 다만 비영리 목적 단체나 일부 업종은 제외되므로, 정확한 자격은 중소기업중앙회 노란우산 홈페이지에서 확인하는 것이 안전합니다.',
  },
  {
    question: '노란우산공제와 연금저축을 둘 다 공제받을 수 있나요?',
    answer:
      '네, 별개 제도이므로 각각 공제받을 수 있습니다. 노란우산공제는 소득공제(과세표준을 낮춤), 연금저축·IRP는 세액공제(산출세액을 직접 차감)로 성격이 다릅니다. 두 제도를 함께 활용하면 사업자의 절세 폭이 크게 넓어집니다. 다만 각각의 한도를 별도로 적용받는 점에 유의하세요.',
  },
  {
    question: '중간에 해지하면 그동안 받은 공제는 어떻게 되나요?',
    answer:
      '임의로 해지하면 해지환급금 중 공제받은 부담금과 운용수익에 기타소득세(지방소득세 포함 16.5%)가 부과됩니다. 즉 절세 효과가 상당 부분 환수되므로, 노란우산공제는 폐업·노령 등 공제 사유가 발생할 때까지 유지하는 것을 전제로 가입해야 합니다. 단순 여윳돈 저축 용도로는 적합하지 않습니다.',
  },
  {
    question: '폐업하면 공제금은 어떻게 받나요?',
    answer:
      '폐업, 사망, 노령(만 60세 이상 10년 이상 납입) 등 공제 사유가 발생하면 그동안 적립한 부담금에 이자를 더해 공제금으로 지급받습니다. 이때 받는 공제금은 퇴직소득 또는 이자소득으로 분류되어 상대적으로 낮은 세율이 적용되므로, 중도해지보다 세부담이 훨씬 가볍습니다.',
  },
  {
    question: '납입한 부담금은 압류에서 보호되나요?',
    answer:
      '네, 노란우산공제 부금은 법적으로 압류·양도·담보가 금지되어 있습니다. 사업이 어려워져 채권 압류가 들어와도 노란우산공제 적립금은 보호되므로, 폐업 시 재기 자금으로 활용할 수 있습니다. 이 점이 일반 예적금과 구별되는 노란우산공제의 핵심 장점입니다.',
  },
  {
    question: '소득이 없는 해에도 공제를 받을 수 있나요?',
    answer:
      '소득공제는 공제할 소득이 있어야 효과가 있습니다. 사업소득금액이 0이거나 결손인 해에는 소득공제를 적용할 소득 자체가 없어 절세 효과가 발생하지 않습니다. 다만 납입 자체는 계속할 수 있고, 소득이 회복된 이후 연도부터 다시 공제 효과를 누릴 수 있습니다.',
  },
  {
    question: '월 납입액은 자유롭게 정할 수 있나요?',
    answer:
      '네, 일정 범위 안에서 월 납입액을 선택할 수 있고 형편에 따라 증액·감액도 가능합니다. 다만 소득공제는 실제 납입한 금액을 기준으로 하되 위 구간별 한도까지만 인정되므로, 절세를 극대화하려면 자신의 사업소득금액 구간 한도에 맞춰 연간 납입액을 설계하는 것이 좋습니다.',
  },
];

export default function NoranUmbrellaMutualAidDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '노란우산공제 소득공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '노란우산공제 소득공제 2026, 사업소득별 200~600만원 절세 설계',
    description:
      '노란우산공제(소기업·소상공인 공제부금)의 사업소득금액 구간별 공제한도(200~600만원), 가입 조건, 해지 시 과세, 압류 보호까지 사업자·프리랜서 관점에서 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['노란우산공제', '소득공제', '소기업소상공인공제', '사업자 절세', '조세특례제한법 86조의3'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '노란우산공제 소득공제 2026',
    description:
      '사업소득금액에 따라 연 200~600만원을 공제하는 노란우산공제의 한도·조건·해지 과세 정리.',
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
                    { name: '노란우산공제 소득공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자 · 프리랜서 · 8분 읽기 · 2026-07-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  노란우산공제 소득공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">사업자 최대 600만원 절세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  개인사업자와 프리랜서는 근로자처럼 자동으로 챙겨지는 공제가 많지 않아 종합소득세 부담이 크게 느껴집니다. 노란우산공제는 그런 사업자가 활용할 수 있는 대표적인 소득공제 수단이자 폐업 대비 안전망입니다. 이 가이드는 2025년 개정으로 상향된 공제한도(200~600만원), 가입 조건, 중도해지 시 세금, 압류 보호 혜택까지 조세특례제한법 §86의3을 기준으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-noran-umbrella-mutual-aid-deduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">노란우산공제란 무엇인가요?</h2>
                <p>
                  노란우산공제는 소기업·소상공인이 폐업·노령에 대비해 매월 부금을 적립하는 공제 제도입니다. 정식 명칭은 소기업·소상공인 공제부금이며, 조세특례제한법 §86의3에 소득공제 근거가 규정되어 있습니다. 중소기업중앙회가 운영하며, 납입한 부금은 소득공제 혜택과 함께 폐업 시 재기 자금으로 돌려받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">노란우산공제의 3대 핵심</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 소득공제: 사업소득금액 구간별 연 200~600만원 공제 (§86의3)
                    <br />
                    2. 압류 보호: 부금은 법적으로 압류·양도 금지 (폐업 재기 자금 보호)
                    <br />
                    3. 저율 수령: 폐업·노령 시 공제금은 퇴직소득·이자소득으로 저율 과세
                  </p>
                </div>
                <p className="mt-4">
                  다만 노란우산공제는 세제 혜택이 큰 만큼 중도해지 시 불이익도 있습니다. 단순 저축이 아니라 폐업·노후까지 유지하는 것을 전제로 설계된 제도라는 점을 먼저 이해해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 공제한도는 얼마인가요?</h2>
                <p>
                  사업소득금액에 따라 연 200만원에서 600만원까지 공제됩니다. 소득이 낮을수록 한도가 크게 설계되어 있어 영세 사업자에게 유리합니다. 2025년 세법 개정으로 종전 500/300/200만원에서 600/400/200만원으로 상향되었고, 2025년 1월 1일 이후 납입분부터 적용됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 노란우산공제 소득공제 한도 (조세특례제한법 §86의3, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사업소득금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제한도(연)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">4천만원 이하</td>
                        <td className="p-3"><strong>600만원</strong></td>
                        <td className="p-3">영세 사업자 최대 혜택</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4천만원 초과 1억원 이하</td>
                        <td className="p-3"><strong>400만원</strong></td>
                        <td className="p-3">중간 구간</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억원 초과</td>
                        <td className="p-3"><strong>200만원</strong></td>
                        <td className="p-3">고소득 구간</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 한도는 실제 납입한 부금 범위 안에서만 인정됩니다. 예를 들어 사업소득금액이 3천만원이라도 연 300만원만 납입했다면 공제액은 300만원입니다. 한도까지 공제를 채우려면 소득 구간에 맞춰 납입액을 설계해야 합니다. 법인 대표는 소득 요건이 별도이므로 중소기업중앙회에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 절세액은 얼마나 되나요?</h2>
                <p>
                  소득공제는 과세표준을 낮추므로 절세액은 본인의 한계세율에 비례합니다. 다음 사례로 확인해 보겠습니다. 종합소득세율은 소득세법 §55의 누진세율을 적용합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 사업소득금액 3,500만원 프리랜서 (한도 600만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 노란우산 연 납입: 600만원 (한도 전액 납입)
                    <br />
                    · 과세표준 구간: 1,400만원 초과 5,000만원 이하 → 세율 15% (§55)
                    <br />
                    · 소득세 절감: 600만원 × 15% = <strong>90만원</strong>
                    <br />
                    · 지방소득세 포함(10% 부가): 90만원 × 1.1 = <strong>약 99만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 600만원 납입으로 약 99만원 절세. 납입액은 폐업 시 돌려받음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 사업소득금액 9,000만원 사업자 (한도 400만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 노란우산 연 납입: 400만원 (한도 전액 납입)
                    <br />
                    · 과세표준 구간: 8,800만원 초과 1.5억 이하 → 세율 35% (§55)
                    <br />
                    · 소득세 절감: 400만원 × 35% = <strong>140만원</strong>
                    <br />
                    · 지방소득세 포함: 140만원 × 1.1 = <strong>약 154만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 소득이 높을수록 한계세율이 높아 한도가 작아도 절세액은 큼.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 절세액은 본인의 과세표준 구간(한계세율)에 따라 달라지며, 위 계산은 다른 공제를 고려하지 않은 단순 예시입니다. 실제 세액은 종합소득세 신고 시 전체 공제·세액공제를 함께 반영해 산출됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중도해지하면 세금은 어떻게 되나요?</h2>
                <p>
                  임의 중도해지 시 그동안 받은 절세 혜택 상당액이 환수됩니다. 해지환급금 중 공제받은 부담금과 운용수익은 기타소득으로 과세되며, 지방소득세를 포함해 16.5%의 세율이 적용됩니다(소득세법 §21의 기타소득 과세 구조).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>공제받은 부담금:</strong> 소득공제로 세금을 덜 낸 만큼, 해지 시 기타소득세로 다시 과세됩니다.
                  </li>
                  <li>
                    <strong>운용수익:</strong> 적립 기간 발생한 이자 성격의 수익에도 기타소득세가 부과됩니다.
                  </li>
                  <li>
                    <strong>폐업·노령 수령:</strong> 정상 공제 사유로 받으면 퇴직소득·이자소득으로 분류되어 세부담이 훨씬 낮습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 실질과세 원칙(국세기본법 §14)상 명목이 아닌 실질에 따라 과세되므로, 절세만을 노린 단기 가입 후 해지는 오히려 손해입니다. 노란우산공제는 최소 폐업·노후 시점까지 유지할 수 있는 여력 안에서 가입하는 것이 핵심입니다.
                </p>
              </section>

              <AdSlot slot="guide-noran-umbrella-mutual-aid-deduction-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금저축·IRP와 무엇이 다른가요?</h2>
                <p>
                  노란우산공제는 소득공제, 연금저축·IRP는 세액공제로 성격이 다릅니다. 세 제도를 비교하면 사업자의 절세 설계가 명확해집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 노란우산공제 vs 연금저축·IRP 비교 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">노란우산공제</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연금저축·IRP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제 방식</td>
                        <td className="p-3">소득공제(과세표준 차감)</td>
                        <td className="p-3">세액공제(산출세액 차감)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근거 법령</td>
                        <td className="p-3">조특법 §86의3</td>
                        <td className="p-3">소득세법 §59의3</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주 목적</td>
                        <td className="p-3">폐업·노령 대비, 압류 보호</td>
                        <td className="p-3">노후 연금 마련</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">중복 적용</td>
                        <td className="p-3" colSpan={2}>가능(별개 제도, 각각 한도 적용)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 소득공제(노란우산)는 한계세율이 높은 고소득자에게 유리하고, 세액공제(연금저축)는 세율과 무관하게 정률로 공제되어 상대적으로 중·저소득자에게 유리합니다. 자신의 소득 구간에 따라 우선순위를 정하되, 여력이 되면 두 제도를 병행하는 것이 절세 폭을 넓히는 방법입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">가입 전 확인할 점</h2>
                <p>
                  노란우산공제 가입 전에는 다음 사항을 점검하세요. 특히 유지 가능성과 소득 구간 확인이 중요합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>유지 여력:</strong> 폐업·노령까지 유지할 수 있는 금액으로 납입액을 설정합니다. 무리하게 한도를 채우려다 중도해지하면 오히려 손해입니다.
                  </li>
                  <li>
                    <strong>소득 구간 확인:</strong> 직전 연도 사업소득금액을 확인해 자신의 공제한도(600/400/200만원)를 파악합니다.
                  </li>
                  <li>
                    <strong>지자체 지원금:</strong> 일부 지자체는 노란우산 가입 소상공인에게 희망장려금을 지원합니다. 관할 지자체를 확인하세요.
                  </li>
                  <li>
                    <strong>가입 자격:</strong> 업종·매출 요건에 따라 가입 가능 여부가 달라지므로 중소기업중앙회에서 사전 확인이 필요합니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소득금액과 세액을 입력해 절세 효과를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세율 구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">노란우산 절세액을 좌우하는 한계세율을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/pension-savings-irp-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">노란우산과 병행할 수 있는 또 다른 절세 수단.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소득금액을 결정하는 경비율의 차이를 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">개인사업자 시작 시 알아야 할 기본 절차.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 가입 자격, 공제한도 적용, 해지 시 과세는 개인의 사업소득금액과 상황에 따라 달라지므로 중소기업중앙회 노란우산공제 또는 세무 전문가와 반드시 확인하세요. 본 콘텐츠는 2026-07-17을 기준으로 작성되었으며, 관련 법령은 <strong>조세특례제한법 §86의3(소기업·소상공인 공제부금 소득공제), 소득세법 §55(세율), §21(기타소득), 국세기본법 §14(실질과세)</strong>를 따릅니다. 노란우산공제 한도는 2025년 개정(600/400/200만원)이 반영된 값입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.8899.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">중소기업중앙회 노란우산</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="노란우산공제 소득공제 2026 가이드"
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
