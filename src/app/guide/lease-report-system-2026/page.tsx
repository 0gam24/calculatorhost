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

const URL = 'https://calculatorhost.com/guide/lease-report-system-2026/';
const DATE_PUBLISHED = '2026-07-12';
const DATE_MODIFIED = '2026-07-12';

export const metadata: Metadata = {
  title: '전월세 신고제 2026, 대상·30일 기한·과태료·신고방법',
  description:
    '보증금 6천만원 초과 또는 월세 30만원 초과 주택 임대차는 계약일부터 30일 안에 신고해야 합니다. 2025년 6월부터 계도기간이 끝나 미신고 시 과태료가 부과됩니다. 대상, 방법, 과태료를 정리합니다.',
  keywords: [
    '전월세 신고제',
    '임대차 신고제',
    '전월세 신고 과태료',
    '전월세 신고 방법',
    '보증금 6천만원 월세 30만원',
    '부동산거래신고법 6조의2',
    '확정일자 자동부여',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전월세 신고제 2026, 대상·30일 기한·과태료·신고방법' }],
    title: '전월세 신고제 2026, 계도기간 끝났다',
    description: '보증금 6천만원 초과 또는 월세 30만원 초과 계약은 30일 내 신고. 미신고 과태료와 온라인 신고 방법 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전월세 신고제 2026, 대상·기한·과태료',
    description: '보증금 6천만원 초과 or 월세 30만원 초과 → 30일 내 신고. 계도기간 2025.5.31 종료.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전월세 신고제가 정확히 무엇인가요?',
    answer:
      '전월세 신고제(주택 임대차 계약 신고제)는 일정 규모 이상의 주택 임대차 계약을 체결하면 계약 내용을 30일 안에 지자체에 신고하도록 의무화한 제도입니다(부동산 거래신고 등에 관한 법률 §6의2). 임대차 시장을 투명하게 하고 임차인 권리를 보호하기 위해 2021년 도입됐습니다.',
  },
  {
    question: '어떤 계약이 신고 대상인가요?',
    answer:
      '보증금이 6천만원을 초과하거나 월 차임이 30만원을 초과하는 주택 임대차 계약이 신고 대상입니다. 둘 중 하나만 넘어도 신고해야 합니다. 예를 들어 보증금 5천만원에 월세 40만원이면 월세 기준을 넘어 신고 대상입니다. 신규 계약뿐 아니라 보증금·월세가 바뀐 갱신 계약도 대상입니다.',
  },
  {
    question: '신고 기한은 언제까지인가요?',
    answer:
      '계약 체결일부터 30일 이내에 신고해야 합니다. 신규 계약, 그리고 금액이 변동된 갱신 계약이 모두 30일 규정을 적용받습니다. 다만 보증금·월세 변동 없이 기간만 연장하는 묵시적 갱신 등은 신고 대상이 아닐 수 있으므로 계약 유형을 확인하세요.',
  },
  {
    question: '신고는 어떻게 하나요?',
    answer:
      '온라인은 부동산거래관리시스템(rtms.molit.go.kr)에서 임대차 계약서를 첨부해 신고할 수 있고, 오프라인은 주택 소재지 주민센터를 방문해 신고합니다. 임대인·임차인 공동 신고가 원칙이지만, 한쪽이 계약서를 첨부해 신고하면 공동 신고로 인정됩니다.',
  },
  {
    question: '신고하면 확정일자도 받게 되나요?',
    answer:
      '네, 임대차 신고를 하면서 계약서를 제출하면 확정일자가 자동으로 부여됩니다. 별도로 주민센터에서 확정일자를 받는 절차를 생략할 수 있어, 신고와 동시에 보증금 우선변제 순위를 확보할 수 있습니다. 다만 대항력을 위해서는 전입신고와 실제 거주가 함께 필요합니다.',
  },
  {
    question: '신고를 안 하면 과태료가 얼마인가요?',
    answer:
      '지연 신고나 미신고 시 과태료가 부과됩니다. 계도기간이 2025년 5월 31일 종료되어, 그 이후 계약부터는 기한을 넘기면 과태료 대상입니다. 지연·미신고 과태료 상한은 종전 100만원에서 30만원으로 낮아졌고, 거짓 신고는 최대 100만원입니다. 지연 기간과 계약 금액에 따라 금액이 달라집니다.',
  },
  {
    question: '전입신고나 확정일자를 이미 받았으면 신고를 안 해도 되나요?',
    answer:
      '전입신고·확정일자와 임대차 신고는 제도가 다릅니다. 다만 임대차 신고를 하면 확정일자가 자동 부여되므로 중복 절차가 줄어듭니다. 전입신고만 했다고 임대차 신고 의무가 사라지는 것은 아니므로, 신고 대상이라면 30일 내 임대차 신고를 별도로 완료해야 합니다.',
  },
  {
    question: '집주인이 신고를 거부하면 어떻게 하나요?',
    answer:
      '임차인 혼자서도 임대차 계약서를 첨부해 신고할 수 있습니다. 공동 신고가 원칙이지만 한쪽이 계약서로 신고하면 공동 신고로 처리되므로, 집주인이 협조하지 않아도 임차인이 단독으로 신고해 과태료를 피하고 확정일자를 확보할 수 있습니다.',
  },
];

export default function LeaseReportSystem2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전월세 신고제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전월세 신고제 2026, 대상·기한·과태료·신고방법 완전 정리',
    description:
      '보증금 6천만원 초과 또는 월세 30만원 초과 주택 임대차의 30일 신고 의무, 온라인·주민센터 신고 방법, 확정일자 자동부여, 과태료 기준을 부동산 거래신고법 §6의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전월세 신고제', '임대차 신고', '과태료', '확정일자', '30일 기한'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전월세 신고제 2026',
    description:
      '전월세 신고제(주택 임대차 계약 신고)의 대상·기한·신고 방법·과태료 정리.',
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
                    { name: '전월세 신고제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임차인·임대인 · 8분 읽기 · 2026-07-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전월세 신고제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">대상·30일 기한·과태료·신고방법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전월세 계약을 하면 이제 30일 안에 신고해야 합니다. 2025년 5월 말 계도기간이 끝나면서, 그 이후 계약부터는 기한을 넘기면 과태료가 부과됩니다. 그런데 모든 계약이 대상은 아니고 보증금·월세 기준이 있습니다. 이 가이드는 부동산 거래신고 등에 관한 법률 §6의2를 기준으로 신고 대상, 기한, 방법, 과태료, 확정일자와의 관계까지 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-lease-report-system-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전월세 신고제란 무엇인가요?</h2>
                <p>
                  전월세 신고제는 일정 규모 이상 주택 임대차 계약을 30일 안에 지자체에 신고하도록 의무화한 제도입니다(부동산 거래신고 등에 관한 법률 §6의2). 매매 실거래가 신고처럼, 임대차도 계약 내용을 투명하게 공개해 시장 정보를 정비하고 임차인 권리를 보호하려는 취지입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 보증금 6천만원 초과 <strong>또는</strong> 월세 30만원 초과 주택 임대차
                    <br />
                    · 기한: 계약일부터 <strong>30일 이내</strong>
                    <br />
                    · 방법: 온라인(부동산거래관리시스템) 또는 주민센터
                    <br />
                    · 효과: 신고 시 확정일자 자동 부여
                  </p>
                </div>
                <p className="mt-4">
                  다만 신고제는 세금 부과가 목적이 아닙니다. 신고 자체로 임대소득세가 새로 매겨지는 것은 아니며, 임대소득 과세는 별도의 소득 기준에 따릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 계약이 신고 대상인가요?</h2>
                <p>
                  보증금 6천만원 초과 또는 월 차임 30만원 초과 중 하나만 해당해도 신고 대상입니다. 아래 표로 판단해보세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 전월세 신고 대상 판단 (부동산 거래신고법 §6의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계약 조건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신고 대상 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">보증금 1억원, 월세 0원 (전세)</td>
                        <td className="p-3">대상 (보증금 6천만원 초과)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">보증금 5천만원, 월세 40만원</td>
                        <td className="p-3">대상 (월세 30만원 초과)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">보증금 6천만원, 월세 30만원</td>
                        <td className="p-3">비대상 (둘 다 기준 이하)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">보증금·월세 변동 갱신 계약</td>
                        <td className="p-3">대상 (금액 변동 시)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 대상 지역은 수도권 전역, 광역시, 세종시, 도의 시 지역 등으로 지정되어 있으며 일부 군 지역은 제외됩니다. 본인 주택 소재지가 대상 지역인지는 관할 지자체나 부동산거래관리시스템에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 어떻게 신고하나요?</h2>
                <p>
                  계약일부터 30일 이내가 기한이며, 온라인과 방문 두 가지 방법이 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 온라인 신고</p>
                  <p className="text-sm text-text-secondary">
                    부동산거래관리시스템(rtms.molit.go.kr)에 접속해 임대차 계약서를 첨부하고 계약 내용을 입력하면 됩니다. 공동인증서로 로그인하며, 임대인·임차인 중 한 명이 계약서를 첨부해 신고하면 공동 신고로 처리됩니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 주민센터 방문</p>
                  <p className="text-sm text-text-secondary">
                    주택 소재지 관할 주민센터를 방문해 임대차 계약서를 제출하고 신고서를 작성합니다. 방문 신고 시에도 확정일자가 함께 부여됩니다.
                  </p>
                </div>
                <p className="mt-4">
                  다만 계약서 원본 또는 사본이 반드시 필요합니다. 계약서가 없으면 신고가 지연될 수 있으니, 계약 직후 계약서를 확보해 30일 안에 처리하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고 안 하면 과태료가 얼마인가요?</h2>
                <p>
                  계도기간이 2025년 5월 31일 종료되어, 그 이후 계약부터는 기한을 넘기면 과태료가 부과됩니다. 다만 지연·미신고 과태료 상한은 종전 100만원에서 30만원으로 낮아졌습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>지연·미신고:</strong> 지연 기간과 계약 금액에 따라 최소 2만원부터 최대 30만원.</li>
                  <li><strong>거짓 신고:</strong> 최대 100만원.</li>
                  <li><strong>부과 시점:</strong> 2025년 6월 1일 이후 체결·갱신 계약부터.</li>
                </ul>
                <p className="mt-4">
                  다만 과태료 금액과 부과 세부 기준은 지자체 운영에 따라 달라질 수 있습니다. 기한을 놓쳤더라도 최대한 빨리 신고하면 지연 기간이 짧아져 과태료가 줄어듭니다.
                </p>
              </section>

              <AdSlot slot="guide-lease-report-system-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">전입신고·확정일자와 무엇이 다른가요?</h2>
                <p>
                  세 가지는 목적이 다릅니다. 임대차 신고는 계약 내용 신고, 전입신고는 거주 사실 신고, 확정일자는 보증금 우선변제 순위 확보를 위한 절차입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 임대차 신고 vs 전입신고 vs 확정일자</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">역할</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임대차 신고</td>
                        <td className="p-3">계약 내용 신고, 신고 시 확정일자 자동 부여</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">전입신고</td>
                        <td className="p-3">거주 사실 신고, 실제 거주와 함께 대항력 확보</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">확정일자</td>
                        <td className="p-3">보증금 우선변제 순위 확보</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  임차인 입장에서는 임대차 신고로 확정일자를 확보하고, 전입신고와 실제 거주로 대항력까지 갖추는 것이 보증금을 지키는 기본 조합입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세 전환 금액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">확정일자·우선변제권</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 지키는 대항력·우선변제 원리.</p>
                  </Link>
                  <Link
                    href="/guide/lease-registration-order-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임차권등기명령</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금 못 받고 이사할 때 대항력 유지법.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 안전 지키기</div>
                    <p className="mt-1 text-sm text-text-secondary">전세사기 예방과 보증금 반환 체크리스트.</p>
                  </Link>
                  <Link
                    href="/guide/monthly-rent-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">월세 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산 월세 세액공제 요건과 한도.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세·중개수수료·임대수익률 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 법률 자문이 아닙니다. 신고 대상 지역, 과태료 금액, 세부 절차는 지자체 운영과 개정에 따라 달라질 수 있으므로, 실제 신고 전 부동산거래관리시스템 또는 관할 주민센터에서 확인하시기 바랍니다. 본 콘텐츠는 2026-07-12 기준으로 작성되었고 제도 변경 시 업데이트됩니다. 인용 법조항: <strong>부동산 거래신고 등에 관한 법률 §6의2(주택 임대차 계약의 신고), §6의3(변경·해제 신고), §28(과태료), 주택임대차보호법 §3의6(확정일자 부여)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://rtms.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">부동산거래관리시스템</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부</a>.
                </p>
              </section>

              <ShareButtons
                title="전월세 신고제 2026 가이드"
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
