// [revenue-lever: traffic+indexing] 2026 세제개편안 양도세 장특공 거주요건 재편 급상승 검색 흡수, 롱테일 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/long-term-holding-special-deduction-residence-requirement-2026-reform/';
const DATE_PUBLISHED = '2026-08-22';
const DATE_MODIFIED = '2026-08-22';

export const metadata: Metadata = {
  title: '장기보유특별공제 거주요건 재편 2026, 10년 살아야 80%',
  description:
    '2026 세제개편안이 1세대1주택 장기보유특별공제를 단순 보유보다 실거주 중심으로 재편하는 방향을 담았습니다. 현행 보유·거주 각 연 4%로 최대 80% 구조, 거주 없이 보유만 하면 얼마 줄어드는지, 언제 양도분부터인지 정리합니다(소득세법 §95).',
  keywords: [
    '장기보유특별공제 거주요건',
    '장특공 80% 조건',
    '10년 살아야 장특공 80%',
    '1세대1주택 장기보유특별공제',
    '장특공 거주 보유',
    '2026 세제개편안 양도세',
    '소득세법 95조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '장기보유특별공제 거주요건 재편 2026, 10년 살아야 80%' }],
    title: '장기보유특별공제 거주요건 재편 2026, 10년 살아야 80%',
    description: '보유만으로 받던 장특공이 거주 중심으로. 현행 보유·거주 각 40% 구조와 개편 방향을 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '장기보유특별공제 거주요건 재편 2026',
    description: '1세대1주택 장특공 최대 80%, 거주 중심으로 재편 방향. 현행 구조와 계산 예시 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '장기보유특별공제가 무엇인가요?',
    answer:
      '오래 보유한 부동산을 팔 때 양도차익의 일정 비율을 공제해 세금을 줄여주는 제도입니다(소득세법 §95). 3년 이상 보유하면 적용되며, 1세대1주택은 보유기간과 거주기간에 각각 연 4%씩, 합쳐서 최대 80%까지 공제됩니다. 공제는 양도차익에서 직접 빠지므로 세부담을 크게 낮춥니다.',
  },
  {
    question: '1세대1주택은 최대 얼마까지 공제되나요?',
    answer:
      '최대 80%입니다. 1세대1주택이 2년 이상 거주 요건을 갖추면 소득세법 §95②의 표2가 적용되어, 보유기간 연 4%(최대 40%)와 거주기간 연 4%(최대 40%)를 합쳐 최대 80%까지 공제됩니다. 즉 10년 보유하고 10년 거주하면 80% 상한에 도달합니다.',
  },
  {
    question: '거주하지 않고 보유만 하면 공제가 얼마인가요?',
    answer:
      '크게 줄어듭니다. 1세대1주택이라도 거주기간이 2년 미만이면 유리한 표2가 아니라 일반 표1(연 2%, 최대 30%)이 적용됩니다. 따라서 10년을 보유해도 거주가 2년 미만이면 20%만 공제됩니다. 거주는 장특공에서 매우 큰 비중을 차지합니다.',
  },
  {
    question: '개편안은 무엇이 바뀌나요?',
    answer:
      '단순 보유보다 실제 거주를 더 중시하는 방향입니다. 2026 세제개편안은 양도세 장기보유특별공제를 거주 기준으로 재편해, 거주 없이 보유만으로 높은 공제를 받기 어렵게 하는 흐름입니다. 구체적인 보유·거주 비중과 상한은 국회 심의로 확정되므로, 발표된 방향으로 이해하고 확정 법률을 확인해야 합니다.',
  },
  {
    question: '언제 양도분부터 적용되나요?',
    answer:
      '아직 정해지지 않았습니다. 2026년 8월 3일 발표된 개편안 방향으로, 국회를 통과해야 시행됩니다. 통상 이런 공제 개편은 부칙으로 시행일 이후 양도분에 적용하는 경우가 많으나, 정확한 적용 시점은 최종 법률의 부칙으로 확인해야 합니다. 현재 양도하면 현행 규정이 적용됩니다.',
  },
  {
    question: '실거주가 어려우면 방법이 없나요?',
    answer:
      '거주 요건을 채우기 어렵다면 보유·거주 기간을 함께 관리하는 계획이 필요합니다. 예를 들어 양도 전 일정 기간 실제 거주해 거주기간을 확보하거나, 양도 시점을 조정하는 방법이 있습니다. 다만 위장전입 등은 실질과세 원칙(국세기본법 §14)에 따라 부인될 수 있으므로, 실제 거주가 전제되어야 합니다.',
  },
  {
    question: '다주택자도 장기보유특별공제를 받나요?',
    answer:
      '일반 공제(표1)는 받을 수 있습니다. 다주택자나 거주 요건을 못 갖춘 주택은 표2가 아니라 표1(3년 이상 보유, 연 2%, 최대 30%)이 적용됩니다. 다만 조정대상지역 중과 대상이면 장기보유특별공제 자체가 배제될 수 있으므로, 보유 형태와 지역 규제를 함께 확인해야 합니다.',
  },
];

export default function LongTermHoldingSpecialDeductionResidenceRequirement2026ReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '장기보유특별공제 거주요건 재편 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '장기보유특별공제 거주요건 재편 2026, 10년 살아야 80%',
    description:
      '1세대1주택 장기보유특별공제를 실거주 중심으로 재편하는 2026 세제개편안. 현행 보유·거주 각 40% 구조, 거주 미충족 시 공제 축소, 적용 시점을 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['장기보유특별공제', '거주요건', '1세대1주택', '양도소득세', '2026 세제개편안'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '장기보유특별공제 거주요건 재편 2026',
    description:
      '장기보유특별공제 거주요건 강화 개편안과 현행 보유·거주 각 40% 최대 80% 구조 정리.',
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
                    { name: '장기보유특별공제 거주요건 재편 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">1주택 양도 예정자 · 8분 읽기 · 2026-08-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  장기보유특별공제 거주요건 재편 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 10년 살아야 80%, 무엇이 달라지나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 8월 3일 발표된 세제개편안은 1세대1주택 양도세 장기보유특별공제를 단순 보유보다 실제 거주 중심으로 재편하는 방향을 담았습니다. 이 글은 집을 팔 계획이 있는 1주택자를 위해, 현행 장특공이 어떻게 최대 80%가 되는지, 거주하지 않으면 공제가 얼마나 줄어드는지, 개편 방향과 적용 시점을 계산 예시와 함께 정리합니다.
                </p>
              </header>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-5" data-speakable>
                <p className="font-semibold text-text-primary">30초 요약</p>
                <ul className="ml-5 list-disc space-y-1 text-sm text-text-secondary">
                  <li>1세대1주택 장특공은 보유·거주 각 연 4%, 합쳐 최대 80%입니다(소득세법 §95②).</li>
                  <li>거주 2년 미만이면 유리한 표2가 아니라 일반 표1(연 2%, 최대 30%)이 적용됩니다.</li>
                  <li>개편안은 거주 없이 보유만으로 높은 공제를 받기 어렵게 하는 방향입니다.</li>
                  <li>2026년 8월 현재 발표된 안이며, 현재 양도하면 현행 규정이 적용됩니다.</li>
                </ul>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 현행 장기보유특별공제 구조(소득세법 §95②)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">상한</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1세대1주택 보유기간</td>
                        <td className="p-3">연 4%</td>
                        <td className="p-3">40%(10년)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1세대1주택 거주기간</td>
                        <td className="p-3">연 4%</td>
                        <td className="p-3">40%(10년)</td>
                      </tr>
                      <tr>
                        <td className="p-3">일반(표1)</td>
                        <td className="p-3">연 2%</td>
                        <td className="p-3">30%(15년)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">1세대1주택은 어떻게 80%가 되나</h2>
                <p>
                  보유와 거주를 각각 채워야 80%가 됩니다. 1세대1주택이 2년 이상 거주 요건을 갖추면 소득세법 §95②의 표2가 적용됩니다. 이 표는 보유기간에 연 4%(최대 40%), 거주기간에 연 4%(최대 40%)를 부여해, 두 항목을 합쳐 최대 80%까지 공제합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">계산 예시. 과세대상 양도차익 5억(12억 초과분 반영 후)</p>
                  <p className="text-sm text-text-secondary">
                    10년 보유 + 10년 거주: 40% + 40% = 80% → 공제 5억 × 80% = 4억, 남는 양도소득금액 1억
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 보유와 거주를 모두 채우면 양도차익의 80%가 공제됩니다.</span>
                  </p>
                </div>
                <p>
                  다만 1세대1주택이라도 양도가액 12억 이하는 비과세이고, 장특공은 12억을 초과하는 부분의 양도차익에만 의미가 있습니다(소득세법 §89, §95). 즉 12억 이하 주택은 애초에 세금이 없어 장특공을 따질 필요가 없습니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">거주 안 하면 공제가 얼마나 줄어드나</h2>
                <p>
                  거주 2년을 못 채우면 공제가 급감합니다. 1세대1주택이라도 거주기간이 2년 미만이면 유리한 표2를 쓸 수 없고, 일반 표1(연 2%, 최대 30%)이 적용되기 때문입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 보유·거주 조합별 공제율(과세대상 양도차익 5억 가정)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">보유 / 거주</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">공제액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10년 / 10년</td>
                        <td className="p-3">80%(표2)</td>
                        <td className="p-3">4억</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10년 / 2년</td>
                        <td className="p-3">48%(표2, 40%+8%)</td>
                        <td className="p-3">2.4억</td>
                      </tr>
                      <tr>
                        <td className="p-3">10년 / 2년 미만</td>
                        <td className="p-3">20%(표1)</td>
                        <td className="p-3">1억</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 거주 2년(공제 8%)과 거주 2년 미만(표1 적용)의 경계에서 공제율이 48%에서 20%로 크게 벌어집니다. 이 경계 근처라면 거주기간을 정확히 확인하고 양도 시점을 신중히 정해야 합니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">개편안은 무엇을 바꾸나</h2>
                <p>
                  거주 비중을 더 키우는 방향입니다. 2026 세제개편안은 장기보유특별공제를 단순 보유보다 실제 거주 중심으로 재편해, 거주 없이 보유만으로 높은 공제를 받기 어렵게 하는 흐름을 담았습니다. 언론에서는 이를 두고 사실상 오래 거주해야 80% 상한에 도달하는 구조로 설명합니다.
                </p>
                <p>
                  이 방향은 앞서 본 종합부동산세 개편(실거주 1주택 공제 확대)과 같은 철학, 즉 실거주 실수요를 우대하고 비거주 보유의 혜택을 줄이는 흐름과 맞닿아 있습니다.
                </p>
                <p>
                  다만 구체적인 보유·거주 공제율 배분과 상한, 적용 시점은 2026년 8월 현재 확정되지 않았습니다. 발표된 방향으로 이해하되, 실제 수치는 국회를 통과한 법률과 부칙으로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">지금 무엇을 준비해야 하나</h2>
                <p>
                  보유기간과 거주기간을 정확히 정리하고, 양도 시점을 함께 계획하는 것이 핵심입니다. 절차는 다음과 같습니다.
                </p>
                <ol className="ml-5 list-decimal space-y-2 text-text-secondary">
                  <li>등기부와 전입 기록으로 보유기간, 실제 거주기간을 각각 확인합니다.</li>
                  <li>양도가액이 12억을 넘는지 확인합니다(12억 이하는 비과세).</li>
                  <li>현행 표2 기준으로 예상 공제율과 세액을 계산합니다.</li>
                  <li>거주 2년 경계에 걸리면 거주기간 확보 여부를 검토합니다.</li>
                  <li>개편안 통과 시나리오를 함께 비교해 양도 시점을 정합니다.</li>
                </ol>
                <p>
                  예외: 실제 거주 없이 전입만 하는 방식은 실질과세 원칙(국세기본법 §14)에 따라 인정되지 않습니다. 거주기간은 실제 거주를 전제로 산정해야 하며, 큰 금액이면 세무 전문가와 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/capital-gains-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익, 장특공, 세율을 반영해 계산해보세요.</p>
                  </Link>
                  <Link href="/guide/long-term-holding-special-deduction-80-percent/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">장특공 80% 완전 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">1세대1주택 표2의 보유·거주 공제를 자세히 봅니다.</p>
                  </Link>
                  <Link href="/guide/long-term-holding-special-deduction-general-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">일반 장특공(표1)</div>
                    <p className="mt-1 text-sm text-text-secondary">다주택·비거주 주택의 연 2% 공제를 확인하세요.</p>
                  </Link>
                  <Link href="/guide/one-household-12-billion-exemption/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">12억 초과분 과세와 비과세 한도를 이해하세요.</p>
                  </Link>
                  <Link href="/guide/comprehensive-real-estate-tax-value-based-reform-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">종부세 가액 기준 전환</div>
                    <p className="mt-1 text-sm text-text-secondary">실거주 중심 재편의 다른 축인 종부세 개편도 보세요.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 취득세, 재산세, 종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적이며 개인 맞춤형 세무 조언이 아닙니다. 장기보유특별공제 거주요건 재편은 2026년 8월 3일 발표된 세제개편안(案)으로, 국회 통과 전까지 확정된 제도가 아닙니다. 개편 후 보유·거주 공제율 배분, 상한, 적용 시점은 최종 통과된 법률과 부칙으로 달라질 수 있습니다. 현재 양도 시에는 현행 규정(1세대1주택 표2 보유·거주 각 최대 40%, 합계 80%)이 적용됩니다. 인용 조항: 소득세법 §89(비과세 양도소득), §95(장기보유특별공제), §104(세율), 국세기본법 §14(실질과세). 본 콘텐츠는 2026-08-22 기준이며 법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(양도소득세)</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부(세제개편안)</a>.
                </p>
              </section>

              <ShareButtons title="장기보유특별공제 거주요건 재편 2026" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
