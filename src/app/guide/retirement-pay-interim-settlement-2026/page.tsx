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

// 수익 레버 [revenue-lever: indexing+traffic]: 신규 색인 페이지 추가, 롱테일 트래픽 유입
const URL = 'https://calculatorhost.com/guide/retirement-pay-interim-settlement-2026/';
const DATE_PUBLISHED = '2026-07-16';
const DATE_MODIFIED = '2026-07-16';

export const metadata: Metadata = {
  title: '퇴직금 중간정산 2026, 법정 사유 7가지와 세금 함정',
  description:
    '퇴직금 중간정산은 아무 때나 못 하고 법이 정한 사유만 가능합니다. 근로자퇴직급여보장법 §8과 시행령 §3의 주택구입·요양·파산 등 사유와, 근속연수 리셋으로 커지는 퇴직소득세 함정을 정리합니다.',
  keywords: [
    '퇴직금 중간정산',
    '퇴직금 중간정산 사유',
    '퇴직연금 중도인출',
    '무주택 주택구입 중간정산',
    '퇴직소득세 근속연수',
    '근로자퇴직급여보장법 8조',
    'DC형 중도인출',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '퇴직금 중간정산 2026, 법정 사유 7가지와 세금 함정' }],
    title: '퇴직금 중간정산 2026, 되는 사유와 안 되는 사유',
    description: '주택구입·요양·파산 등 법정 사유만 가능. 근속연수 리셋으로 커지는 퇴직소득세 함정까지. 근퇴법 §8.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '퇴직금 중간정산 2026, 법정 사유 7가지와 세금 함정',
    description: '퇴직금 중간정산은 법이 정한 사유만 가능합니다. 사유·증빙과 근속연수 리셋 세금 함정을 정리. 근퇴법 §8.',
  },
};

const FAQ_ITEMS = [
  {
    question: '퇴직금은 원할 때 중간정산 받을 수 있나요?',
    answer:
      '받을 수 없습니다. 2012년 이후 퇴직금 중간정산은 원칙적으로 금지되고, 근로자퇴직급여보장법 §8과 시행령 §3이 정한 법정 사유에 해당할 때만 가능합니다. 단순히 목돈이 필요하다는 이유로는 중간정산을 받을 수 없습니다.',
  },
  {
    question: '중간정산이 가능한 사유는 무엇인가요?',
    answer:
      '무주택자의 주택 구입, 무주택자의 주거 목적 보증금 부담, 본인·부양가족의 6개월 이상 요양, 최근 5년 내 파산·개인회생, 임금피크제 시행, 근로시간 단축, 천재지변 등이 법정 사유입니다(근퇴법 시행령 §3). 각 사유마다 증빙 서류가 필요하며, 회사가 임의로 사유를 넓힐 수는 없습니다.',
  },
  {
    question: '무주택자면 집을 사면 무조건 되나요?',
    answer:
      '본인 명의로 주택을 구입하는 무주택자여야 합니다. 배우자 명의로 사거나 이미 주택이 있으면 이 사유에 해당하지 않습니다. 주택매매계약서, 무주택 확인 서류 등으로 요건을 증빙해야 하며, 회사는 서류로 사실관계를 확인한 뒤 지급합니다.',
  },
  {
    question: '전세금·보증금 마련도 사유가 되나요?',
    answer:
      '무주택자가 주거 목적으로 전세금·보증금을 부담하는 경우 사유가 됩니다. 다만 이 사유는 하나의 사업장에 근무하는 동안 1회로 제한됩니다. 임대차계약서 등으로 주거 목적임을 증빙해야 하며, 투자 목적 부동산에는 적용되지 않습니다.',
  },
  {
    question: '중간정산하면 세금은 어떻게 되나요?',
    answer:
      '중간정산 시점에 퇴직소득세가 원천징수되고, 이후 근속연수가 새로 시작됩니다. 근속연수가 리셋되면 나중에 최종 퇴직할 때 근속연수공제(소득세법 §48)가 줄어들어 전체 퇴직소득세가 오히려 늘 수 있습니다. 목돈이 급하지 않다면 중간정산은 신중히 판단해야 합니다.',
  },
  {
    question: 'DC형과 DB형은 중간정산 방식이 다른가요?',
    answer:
      'DC형(확정기여형)은 같은 법정 사유로 적립금을 중도인출할 수 있지만, DB형(확정급여형)은 중간정산이 사실상 어렵습니다. DB형은 퇴직 시점의 임금으로 급여가 확정되는 구조라 중도 지급에 제약이 많습니다. 본인의 퇴직연금 유형을 먼저 확인하세요.',
  },
  {
    question: '회사가 중간정산을 거부할 수 있나요?',
    answer:
      '법정 사유와 증빙이 갖춰지면 회사는 지급하는 것이 원칙이나, 요건 미충족 시 거부할 수 있습니다. 사유에 해당하는지, 서류가 충분한지에 따라 결과가 달라지므로, 신청 전 회사 인사·급여 담당 부서와 요건을 확인하는 것이 좋습니다.',
  },
  {
    question: '중간정산 대신 다른 방법은 없나요?',
    answer:
      '퇴직연금 담보대출이나 회사의 대여 제도를 먼저 검토하세요. 일부 퇴직연금은 법정 사유 범위에서 적립금을 담보로 대출받을 수 있어, 중간정산으로 근속연수를 리셋하지 않고도 자금을 마련할 수 있습니다. 세금과 노후 재원을 지키려면 대안을 함께 비교하는 것이 유리합니다.',
  },
];

export default function RetirementPayInterimSettlement2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '퇴직금 중간정산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '퇴직금 중간정산 2026, 되는 사유와 안 되는 사유',
    description:
      '퇴직금 중간정산이 가능한 법정 사유(근로자퇴직급여보장법 §8·시행령 §3)와 증빙, 그리고 근속연수 리셋으로 커지는 퇴직소득세 함정을 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['퇴직금 중간정산', '퇴직연금 중도인출', '근속연수', '퇴직소득세', '법정 사유'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '퇴직금 중간정산 2026',
    description:
      '퇴직금 중간정산 법정 사유와 증빙, 근속연수 리셋 퇴직소득세 함정 정리.',
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
                    { name: '퇴직금 중간정산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 8분 읽기 · 2026-07-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  퇴직금 중간정산 2026
                  <br />
                  <span className="text-2xl text-text-secondary">법정 사유 7가지와 세금 함정</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 사거나 급한 목돈이 필요할 때 쌓인 퇴직금을 미리 받을 수 없을까 고민하는 직장인이 많습니다. 그런데 퇴직금 중간정산은 아무 때나 되는 것이 아니라, 법이 정한 사유에 해당할 때만 가능합니다. 이 가이드는 어떤 사유가 인정되는지, 어떤 증빙이 필요한지, 그리고 중간정산이 나중의 퇴직소득세를 어떻게 늘릴 수 있는지를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-retirement-pay-interim-settlement-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">퇴직금 중간정산은 원칙적으로 금지된다</h2>
                <p>
                  퇴직금 중간정산은 2012년 이후 원칙적으로 금지되고, 법정 사유가 있을 때만 예외적으로 허용됩니다(근로자퇴직급여보장법 §8). 과거에는 자유롭게 중간정산이 가능했지만, 노후 재원인 퇴직금이 생활비로 소진되는 것을 막기 위해 요건이 엄격해졌습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-2 text-text-secondary">
                    퇴직금 중간정산이란, 근로 중 특정 시점까지의 퇴직금을 미리 정산해 받는 것으로, 근퇴법 시행령 §3이 정한 법정 사유에 해당할 때만 가능합니다.
                    <br />
                    핵심: 단순 자금 필요는 사유가 아니며, 사유마다 증빙이 필요합니다.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 법정 사유 없이 이루어진 중간정산은 무효로 볼 수 있습니다. 이 경우 퇴직 시 종전 근속기간까지 합산해 퇴직금을 다시 산정해야 할 수 있으므로, 회사와 근로자 모두 요건을 정확히 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중간정산이 되는 법정 사유는</h2>
                <p>
                  근퇴법 시행령 §3은 다음과 같은 사유를 정하고 있습니다. 각 사유는 증빙으로 사실관계를 확인해야 인정됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 퇴직금 중간정산·중도인출 법정 사유 (근퇴법 시행령 §3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사유</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">핵심 요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주택 구입</td>
                        <td className="p-3">무주택자가 본인 명의로 주택 구입</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주거 보증금</td>
                        <td className="p-3">무주택자의 전세금·보증금 부담(한 사업장 재직 중 1회)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">요양</td>
                        <td className="p-3">본인·부양가족의 6개월 이상 요양으로 일정 기준 이상 의료비 부담</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">파산·회생</td>
                        <td className="p-3">최근 5년 이내 파산선고 또는 개인회생 결정</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임금피크제</td>
                        <td className="p-3">임금피크제 시행으로 임금이 줄어드는 경우</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근로시간 단축</td>
                        <td className="p-3">소정근로시간이 일정 기준 이상(예: 하루 1시간·주 5시간) 3개월 넘게 단축</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">천재지변</td>
                        <td className="p-3">천재지변 등 고용노동부장관이 정하는 사유</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 요양 사유는 6개월 이상 요양과 함께 의료비 부담 정도 등 세부 요건이 붙습니다. 근로시간 단축 사유도 단축 폭·기간 기준이 있으므로, 정확한 요건은 고용노동부 또는 회사 담당 부서에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">되는 경우와 안 되는 경우</h2>
                <p>
                  같은 목돈이 필요해도 사유가 법정 요건에 맞는지에 따라 결과가 갈립니다. 아래 사례로 비교해보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 무주택 직장인이 본인 명의로 아파트 구입 (가능)</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 무주택 근로자가 본인 명의로 주택 매매계약 체결
                    <br />
                    · 판단: 법정 사유 해당 → 매매계약서·무주택 증빙 제출 시 중간정산 가능
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 자녀 대학 등록금 마련 목적 (불가)</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 유주택 근로자가 자녀 학자금을 위해 신청
                    <br />
                    · 판단: 학자금은 법정 사유가 아님 → <strong>중간정산 불가</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 목적이 절실해도 법정 사유가 아니면 지급되지 않습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 근로시간이 주 20시간에서 15시간으로 단축 (가능)</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 사업장 사정으로 소정근로시간이 3개월 넘게 크게 단축
                    <br />
                    · 판단: 근로시간 단축 사유 해당 가능 → 회사·고용노동부 확인 후 처리
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-retirement-pay-interim-settlement-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중간정산의 진짜 함정, 근속연수 리셋</h2>
                <p>
                  중간정산의 가장 큰 함정은 근속연수가 새로 시작된다는 점입니다. 퇴직소득세는 근속연수가 길수록 공제(소득세법 §48)가 커져 세부담이 낮아지는데, 중간정산으로 근속연수가 리셋되면 이 효과가 줄어듭니다.
                </p>
                <p className="mt-4">
                  예를 들어 20년 근속 후 한 번에 퇴직하면 근속연수공제와 환산급여공제가 크게 적용돼 퇴직소득세가 낮습니다. 그런데 10년 시점에 중간정산을 받으면, 그때 한 번 세금을 내고 이후 근속연수가 0부터 다시 쌓입니다. 최종 퇴직 시 근속연수가 짧아져 공제가 작아지고, 두 번에 나눠 낸 세금 합계가 한 번에 낸 것보다 커질 수 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 개인별 세부담 차이는 급여 수준·근속기간·중간정산 시점에 따라 달라집니다. 중간정산 전 회사나 세무 전문가에게 예상 퇴직소득세(소득세법 §55) 변화를 확인하는 것이 안전합니다.
                </p>
                <p className="mt-4">
                  급전이 필요하다면 중간정산 대신 퇴직연금 담보대출을 먼저 검토하세요. 근속연수를 리셋하지 않고 자금을 마련할 수 있어 장기적으로 유리한 경우가 많습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/severance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">평균임금과 근속연수로 퇴직금을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직소득세 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">연분연승법과 근속연수공제의 구조를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-income-tax-deferral-irp-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직소득세 IRP 이연</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직금을 IRP로 받아 세금을 미루는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/severance-vs-pension-dc-db/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">DC형 vs DB형 퇴직연금</div>
                    <p className="mt-1 text-sm text-text-secondary">두 퇴직연금 유형의 차이와 선택 기준.</p>
                  </Link>
                  <Link
                    href="/guide/pension-savings-early-termination-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축 중도해지 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">노후 계좌를 깰 때의 세금 부담을 함께 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·수당 계산기를 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무·세무 조언이 아닙니다. 중간정산 가능 여부, 사유별 세부 요건, 예상 퇴직소득세는 회사 담당 부서와 고용노동부(1350), 세무 전문가에게 반드시 확인하세요. 본 콘텐츠는 2026-07-16 기준이며 관련 법령 개정 시 업데이트됩니다. 근거 조항은 <strong>근로자퇴직급여보장법 §8(퇴직금의 중간정산)·시행령 §3(중간정산 사유), 소득세법 §48(퇴직소득공제)·§55(세율)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="퇴직금 중간정산 2026 가이드"
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
