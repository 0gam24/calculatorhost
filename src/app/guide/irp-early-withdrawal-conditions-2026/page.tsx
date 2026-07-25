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

const URL = 'https://calculatorhost.com/guide/irp-early-withdrawal-conditions-2026/';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + IRP 중도인출 검색 의도 흡수)

export const metadata: Metadata = {
  title: 'IRP 중도인출 조건 2026, 주택구입·요양 법정 사유 정리',
  description:
    'IRP는 원칙적으로 만 55세 전 중도인출이 안 되지만, 무주택자 주택구입·6개월 이상 요양·파산 등 법정 사유면 가능합니다. 사유별 요건과 세금, DB형과의 차이를 근로자퇴직급여보장법 §7 기준으로 정리했습니다.',
  keywords: [
    'IRP 중도인출',
    '퇴직연금 중도인출 사유',
    'IRP 해지 세금',
    '무주택 주택구입 중도인출',
    'DC형 중도인출',
    'IRP 중도인출 조건',
    '근로자퇴직급여보장법 7조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'IRP 중도인출 조건 2026, 주택구입·요양 법정 사유 정리' }],
    title: 'IRP 중도인출 조건 2026, 언제 꺼낼 수 있고 세금은',
    description: '무주택자 주택구입, 6개월 이상 요양, 파산·개인회생 등 법정 사유일 때만 가능. 사유별 요건과 세금까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IRP 중도인출 조건 2026',
    description: '법정 사유일 때만 가능한 IRP 중도인출. 근로자퇴직급여보장법 §7 기준 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'IRP는 아무 때나 돈을 뺄 수 있나요?',
    answer:
      '아닙니다. IRP(개인형 퇴직연금)는 노후 자금이라는 성격 때문에 원칙적으로 중도인출이 제한됩니다. 법에서 정한 특정 사유(무주택자 주택구입, 6개월 이상 요양, 파산 등)에 해당할 때만 일부 인출이 가능합니다. 그 외에는 계좌 전체를 해지해야 자금을 찾을 수 있고, 이때 세금 불이익이 큽니다.',
  },
  {
    question: '중도인출이 가능한 법정 사유는 무엇인가요?',
    answer:
      '대표적으로 무주택자인 가입자의 본인 명의 주택 구입, 무주택자의 주거 목적 전세·임차보증금 마련, 가입자 또는 배우자·부양가족의 6개월 이상 요양, 최근 5년 이내 개인회생 개시결정 또는 파산선고, 천재지변 등입니다(근로자퇴직급여보장법 §7 및 시행령). 사유마다 증빙 서류와 인출 한도가 다릅니다.',
  },
  {
    question: '무주택자 주택구입으로 인출하려면 어떻게 하나요?',
    answer:
      '가입자가 무주택 세대주이고 본인 명의로 주택을 구입하는 경우 중도인출이 가능합니다. 통상 주택 매매계약 체결일부터 소유권 이전 등기 후 1개월 이내에 신청해야 하며, 매매계약서와 무주택 확인 서류 등을 제출합니다. 정확한 서류와 기한은 가입한 금융기관에 확인하세요.',
  },
  {
    question: '요양 사유는 어떤 경우인가요?',
    answer:
      '가입자 본인, 배우자, 또는 부양가족이 질병·부상으로 6개월 이상 요양이 필요한 경우입니다. 요양에는 입원뿐 아니라 통원, 약물 치료도 포함될 수 있습니다. 다만 의료비가 연간 임금총액의 일정 비율을 초과해야 하는 등 세부 요건이 있어, 자세한 기준은 금융기관과 확인해야 합니다.',
  },
  {
    question: 'DB형 퇴직연금도 중도인출이 되나요?',
    answer:
      '아닙니다. 중도인출은 DC형(확정기여형), 기업형 IRP, 개인형 IRP에서만 법정 사유에 따라 가능합니다. DB형(확정급여형)은 급여가 근속연수로 확정되는 구조여서 중도인출이 되지 않습니다. DB형 자금이 필요하면 퇴직하거나 DC형으로 전환하는 등의 방법을 검토해야 합니다.',
  },
  {
    question: '중도인출하면 세금이 어떻게 되나요?',
    answer:
      '법정 사유에 따른 중도인출은 인출액에 대해 퇴직소득세 또는 연금소득세 등이 부과됩니다. 특히 세액공제를 받았던 납입원금과 운용수익을 인출하면 기타소득세(통상 16.5%)가 매겨질 수 있습니다. 사유와 재원 종류에 따라 세율이 달라지므로, 인출 전 세금을 반드시 확인하는 것이 좋습니다.',
  },
  {
    question: '급하게 목돈이 필요한데 사유에 해당하지 않으면요?',
    answer:
      '법정 사유에 해당하지 않으면 중도인출은 불가능하고, 계좌 전체를 해지해야 합니다. 계좌를 해지하면 그동안 세액공제받은 원금과 운용수익 전체에 기타소득세가 부과되어 손실이 큽니다. 담보대출 등 다른 방법을 먼저 검토하고, 해지는 최후의 수단으로 고려하는 것이 바람직합니다.',
  },
  {
    question: '중도인출 신청은 어디서 하나요?',
    answer:
      'IRP 계좌를 개설한 은행·증권사·보험사 등 금융기관에 신청합니다. 사유별 증빙 서류(매매계약서, 진단서, 파산·회생 결정문 등)를 갖춰 제출하면 금융기관이 요건을 확인한 뒤 인출을 처리합니다. 신청 기한이 정해진 사유(주택구입 등)는 기한을 넘기면 인출이 거절될 수 있습니다.',
  },
];

export default function IrpEarlyWithdrawalConditions2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'IRP 중도인출 조건 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'IRP 중도인출 조건 2026, 주택구입·요양 법정 사유 정리',
    description:
      'IRP 중도인출이 가능한 법정 사유와 요건, 사유별 세금, DB형과의 차이를 근로자퇴직급여보장법 §7 기준으로 정리한 실전 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['IRP 중도인출', '퇴직연금', '주택구입', '요양', 'DC형'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'IRP 중도인출 조건 2026',
    description: 'IRP 중도인출 법정 사유와 요건, 세금을 정리한 가이드.',
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
                    { name: 'IRP 중도인출 조건 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·퇴직연금 가입자 · 8분 읽기 · 2026-07-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  IRP 중도인출 조건 2026
                  <br />
                  <span className="text-2xl text-text-secondary">주택구입·요양 법정 사유 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  IRP는 노후를 위해 쌓는 계좌라 아무 때나 돈을 꺼낼 수 없습니다. 그러나 무주택자의 주택 구입, 6개월 이상 요양, 파산 같은 법에서 정한 사유에 해당하면 만 55세 전이라도 일부를 중도인출할 수 있습니다. 이 가이드는 어떤 사유일 때 인출이 가능한지, 사유마다 어떤 서류와 요건이 필요한지, 그리고 인출 시 세금은 어떻게 되는지를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-irp-early-withdrawal-conditions-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">IRP는 아무 때나 인출이 되나요?</h2>
                <p>
                  아닙니다. IRP(개인형 퇴직연금)는 노후 자금이라는 성격 때문에 중도인출이 원칙적으로 제한됩니다. 근로자퇴직급여보장법이 정한 특정 사유에 해당할 때만 계좌를 유지하면서 일부를 꺼낼 수 있습니다. 사유에 해당하지 않으면 계좌 전체를 해지해야 하고, 이때 세금 부담이 커집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">중도인출 vs 해지, 무엇이 다른가</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 중도인출: 법정 사유가 있을 때 계좌를 유지하며 일부 인출
                    <br />
                    · 해지: 사유 불문 계좌 전체 종료, 세액공제분·수익에 기타소득세 부과
                    <br />
                    · DB형: 중도인출 불가 (DC형·IRP만 가능)
                  </p>
                </div>
                <p className="mt-4">
                  다만 어떤 사유든 인출액에는 세금이 따르므로, 인출 전에 세후 실수령액을 반드시 계산해봐야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중도인출이 가능한 법정 사유는?</h2>
                <p>
                  중도인출은 근로자퇴직급여보장법 §7과 시행령이 정한 사유에 한해 허용됩니다. 대표적인 사유는 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. IRP·DC형 중도인출 주요 법정 사유 (근로자퇴직급여보장법 §7 및 시행령)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사유</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">핵심 요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">무주택자 주택 구입</td>
                        <td className="p-3">무주택 세대주가 본인 명의로 주택 구입</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주거 목적 전세·보증금</td>
                        <td className="p-3">무주택자가 주거용 전세·임차보증금 부담 (가입 중 1회)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">6개월 이상 요양</td>
                        <td className="p-3">본인·배우자·부양가족의 6개월 이상 요양, 의료비 요건</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">파산·개인회생</td>
                        <td className="p-3">최근 5년 이내 파산선고 또는 개인회생 개시결정</td>
                      </tr>
                      <tr>
                        <td className="p-3">천재지변 등</td>
                        <td className="p-3">자연재난·사회재난으로 인한 피해</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 위 표는 대표 사유를 요약한 것이며, 세부 요건과 인출 한도는 사유마다 다릅니다. 정확한 인정 여부는 가입한 금융기관과 고용노동부 안내를 기준으로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무주택자 주택구입으로 인출하려면?</h2>
                <p>
                  가입자가 무주택 세대주이고 본인 명의로 주택을 구입하는 경우 중도인출이 가능합니다. 실무에서는 주택 매매계약 체결일부터 소유권 이전 등기 후 1개월 이내에 신청해야 하는 것이 일반적입니다.
                </p>
                <p className="mt-4">
                  전세·임차보증금 마련도 인출 사유가 됩니다. 이 경우 전월세 계약 체결일부터 잔금 지급일 이후 1개월 이내에 신청하는 것이 보통이며, 주거 목적 보증금은 가입 기간 중 1회로 제한되는 등 별도 조건이 있습니다.
                </p>
                <p className="mt-4">
                  다만 필요 서류(매매계약서, 임대차계약서, 무주택 확인 서류 등)와 정확한 신청 기한은 금융기관마다 안내가 다를 수 있으므로, 계약 전에 미리 가입 금융기관에 문의해 준비하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중도인출하면 세금은 얼마나 떼나요?</h2>
                <p>
                  법정 사유로 중도인출하더라도 인출액에는 세금이 부과됩니다. 재원의 종류에 따라 세율이 달라지는데, 특히 세액공제를 받았던 납입원금과 운용수익을 인출하면 기타소득세(통상 16.5%)가 매겨질 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 세액공제 재원 1,000만원을 중도인출</p>
                  <p className="text-sm text-text-secondary">
                    · 인출액: 1,000만원 (세액공제받은 원금·운용수익)
                    <br />
                    · 기타소득세: 1,000만 × 16.5% = 165만원
                    <br />
                    · 세후 실수령: 약 835만원
                    <br />
                    <span className="text-xs text-text-tertiary">과거 세액공제로 돌려받은 세금을 사실상 반납하는 셈이라, 실익이 크지 않을 수 있습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 퇴직급여로 이체된 재원(퇴직소득)이나 법정 사유의 종류에 따라 퇴직소득세율이 적용되기도 합니다. 세율 구조가 복잡하므로 인출 전 금융기관이나 홈택스로 세후 금액을 확인하는 것이 좋습니다.
                </p>
              </section>

              <AdSlot slot="guide-irp-early-withdrawal-conditions-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중도인출과 해지, 어느 쪽이 유리한가요?</h2>
                <p>
                  법정 사유에 해당한다면 계좌를 유지하는 중도인출이 해지보다 유리합니다. 중도인출은 필요한 만큼만 꺼내고 나머지는 계속 노후 자금으로 운용할 수 있지만, 해지는 계좌 전체가 종료되어 세제 혜택이 사라지기 때문입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 중도인출과 계좌 해지 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">중도인출</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">해지</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">계좌 유지</td>
                        <td className="p-3">유지(일부만 인출)</td>
                        <td className="p-3">종료</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">조건</td>
                        <td className="p-3">법정 사유 필요</td>
                        <td className="p-3">사유 불문</td>
                      </tr>
                      <tr>
                        <td className="p-3">세금</td>
                        <td className="p-3">인출액에만 과세</td>
                        <td className="p-3">전체 세액공제분·수익 과세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 법정 사유가 없는데 목돈이 급하다면, 계좌를 해지하기보다 IRP 담보대출 등 다른 방법을 먼저 검토하는 것이 세금 손실을 줄이는 길입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/pension-savings-irp-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">연 900만원 한도 세액공제와 환급 효과를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-income-tax-deferral-irp-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 IRP 과세이연</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직금을 IRP로 받으면 세금을 미루는 효과.</p>
                  </Link>
                  <Link
                    href="/guide/pension-savings-early-termination-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축 중도해지 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">해지 시 기타소득세 16.5%가 매겨지는 구조.</p>
                  </Link>
                  <Link
                    href="/guide/severance-vs-pension-dc-db/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">DC형 vs DB형 퇴직연금</div>
                    <p className="mt-1 text-sm text-text-secondary">두 제도의 구조와 유불리를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직소득세 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연분연승법으로 퇴직소득세를 계산하는 법.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융·연금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연금·대출·예적금 전략 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 재무·세무 조언이 아닙니다. 중도인출 인정 사유, 필요 서류, 신청 기한, 적용 세율은 재원 종류와 개별 상황에 따라 달라지므로 가입한 금융기관 및 고용노동부·국세청 안내로 반드시 확인하세요. 본 콘텐츠는 2026-07-26을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>근로자퇴직급여보장법 §7(급여의 지급 등) 및 동법 시행령</strong>. 세부 요건은 소관 부처 고시를 참조하세요. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원</a>.
                </p>
              </section>

              <ShareButtons
                title="IRP 중도인출 조건 2026 가이드"
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
