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

const URL = 'https://calculatorhost.com/guide/land-transaction-permit-zone-2026/';
const DATE_PUBLISHED = '2026-08-09';
const DATE_MODIFIED = '2026-08-09';

export const metadata: Metadata = {
  title: '토지거래허가구역 2026, 실거주 의무와 이행강제금',
  description:
    '토지거래허가구역에서 기준면적을 넘는 주택·토지를 사려면 관할 허가가 필요하고 주거용은 2년 실거주 의무가 붙어 갭투자가 막힙니다. 이용의무 위반 시 취득가액 10% 이행강제금까지 부동산거래신고법으로 정리했습니다.',
  keywords: [
    '토지거래허가구역',
    '토지거래허가구역 실거주',
    '토허구역 갭투자',
    '토지거래허가 이용의무',
    '이행강제금',
    '토지거래허가구역 지정',
    '부동산거래신고법 11조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '토지거래허가구역 2026 실거주 의무' }],
    title: '토지거래허가구역 2026, 실거주 의무와 이행강제금',
    description: '허가 대상·2년 실거주 의무·갭투자 제한·취득가액 10% 이행강제금·무허가 계약 무효를 부동산거래신고법으로 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '토지거래허가구역 2026 실거주 의무와 이행강제금',
    description: '허가 대상·실거주 2년·갭투자 제한·이행강제금·무허가 계약 무효. 부동산거래신고법 §11·§17·§18.',
  },
};

const FAQ_ITEMS = [
  {
    question: '토지거래허가구역이 무엇인가요?',
    answer:
      '투기적 거래를 막기 위해 토지 거래에 관청 허가를 받도록 지정한 구역입니다. 부동산 거래신고 등에 관한 법률 §10에 따라 지가가 급등하거나 투기가 우려되는 지역을 허가구역으로 지정하며, 이 구역에서 기준면적을 넘는 토지의 유상 거래는 관할 시장·군수·구청장의 허가를 받아야 합니다.',
  },
  {
    question: '아파트를 사도 허가를 받아야 하나요?',
    answer:
      '기준면적을 넘는 대지지분이면 허가 대상입니다. 아파트도 대지지분이 용도지역별 기준면적을 초과하면 허가 대상이 됩니다. 구역과 면적 기준은 지자체 공고로 정해지므로, 매수 전 해당 시·군·구청이나 부동산정보 포털에서 대상 여부를 반드시 확인해야 합니다.',
  },
  {
    question: '허가를 받으면 반드시 실거주해야 하나요?',
    answer:
      '주거용은 원칙적으로 2년간 실거주해야 합니다. 부동산 거래신고 등에 관한 법률 §17은 허가받은 목적대로 토지를 이용할 의무를 정하며, 주거용 토지는 대통령령이 정한 기간 동안 실제 거주하며 이용해야 합니다. 실수요 목적이라는 전제로 허가가 나오기 때문입니다.',
  },
  {
    question: '전세를 끼고 갭투자로 살 수 있나요?',
    answer:
      '원칙적으로 불가능합니다. 주거용 허가는 매수인이 직접 거주하는 것을 전제로 하므로, 세입자를 두고 본인은 거주하지 않는 갭투자는 이용의무 위반이 됩니다. 기존 임대차가 있으면 그 종료 후 입주해 실거주 의무를 이행해야 합니다.',
  },
  {
    question: '이용의무를 어기면 어떤 불이익이 있나요?',
    answer:
      '이행강제금이 부과됩니다. 부동산 거래신고 등에 관한 법률 §18에 따라 관청은 상당한 기간을 정해 이행명령을 내리고, 이를 따르지 않으면 취득가액의 10% 범위에서 매년 이용의무기간이 끝날 때까지 이행강제금을 물릴 수 있습니다.',
  },
  {
    question: '허가 없이 계약하면 어떻게 되나요?',
    answer:
      '그 계약은 무효이며 벌칙 대상이 됩니다. 허가구역에서 허가를 받지 않고 체결한 토지거래계약은 효력이 없습니다. 나아가 허가를 받지 않거나 부정한 방법으로 허가받은 경우에는 형사처벌과 벌금 대상이 될 수 있으므로, 반드시 허가 절차를 거쳐야 합니다.',
  },
  {
    question: '허가는 어디서 어떻게 신청하나요?',
    answer:
      '토지 소재지 관할 시·군·구청에 신청합니다. 매도인과 매수인이 공동으로 토지이용계획서 등을 갖춰 신청하며, 관청이 실수요와 이용목적을 심사해 허가 여부를 결정합니다. 허가가 나야 계약이 유효해지므로, 통상 계약서에 허가를 조건으로 하는 특약을 둡니다.',
  },
];

export default function LandTransactionPermitZone2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '토지거래허가구역 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '토지거래허가구역 2026, 실거주 의무와 이행강제금',
    description:
      '토지거래허가구역의 지정(§10)과 허가(§11), 주거용 2년 실거주 이용의무(§17), 위반 시 취득가액 10% 이행강제금(§18), 무허가 계약 무효, 갭투자 제한, 허가 신청 절차까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['토지거래허가구역', '실거주 의무', '이행강제금', '갭투자 제한', '부동산거래신고법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '토지거래허가구역 2026',
    description:
      '토지거래허가구역의 허가 대상, 2년 실거주 이용의무, 이행강제금, 무허가 계약 효력을 부동산거래신고법 조문으로 정리한 가이드.',
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
                    { name: '토지거래허가구역 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 매수자·투자자 · 8분 읽기 · 2026-08-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  토지거래허가구역 2026
                  <br />
                  <span className="text-2xl text-text-secondary">실거주 의무와 이행강제금</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 들어 서울을 비롯한 수도권 상당 지역이 토지거래허가구역으로 묶이면서, 집을 사려는 실수요자와 투자자 모두 허가와 실거주 규제를 먼저 확인해야 하는 상황입니다. 이 가이드는 토지거래허가구역이 무엇인지, 어떤 거래가 허가 대상인지, 허가를 받으면 왜 실거주를 해야 하고 갭투자가 막히는지, 그리고 이용의무를 어기면 어떤 이행강제금이 따르는지를 부동산 거래신고 등에 관한 법률 조문으로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">토지거래허가구역이란 무엇인가요?</h2>
                <p>
                  토지거래허가구역은 투기적 거래를 막기 위해 토지 거래에 관청의 허가를 받도록 지정한 구역입니다. 부동산 거래신고 등에 관한 법률 §10은 지가가 급격히 오르거나 투기적 거래가 성행할 우려가 있는 지역을 국토교통부장관 또는 시·도지사가 허가구역으로 지정할 수 있게 합니다. 지정 기간은 5년 이내이며, 필요하면 재지정됩니다.
                </p>
                <p>
                  이렇게 지정된 구역에서 기준면적을 넘는 토지를 사고팔 때는 §11에 따라 관할 시장·군수·구청장의 허가를 받아야 합니다. 허가는 실수요 여부와 이용목적을 심사해 내주므로, 사실상 실거주나 실사용 목적이 아니면 매수 자체가 어려워집니다.
                </p>
                <p>
                  다만 상속이나 증여처럼 대가 없이 소유권이 넘어가는 경우, 경매 등 일부 취득은 허가 대상에서 제외될 수 있으므로 개별 상황을 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일반 구역과 무엇이 다른가요?</h2>
                <p>
                  같은 집을 사더라도 허가구역인지에 따라 절차와 의무가 크게 달라집니다. 아래 표로 비교했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 일반 구역과 토지거래허가구역 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 구역</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">토지거래허가구역</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">거래 전 허가</td>
                        <td className="p-3">불필요</td>
                        <td className="p-3"><strong>관청 허가 필요</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">실거주 의무</td>
                        <td className="p-3">없음</td>
                        <td className="p-3"><strong>주거용 2년 실거주</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">갭투자(전세 끼고 매수)</td>
                        <td className="p-3">가능</td>
                        <td className="p-3">원칙적으로 불가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">위반 제재</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">취득가액 10% 이행강제금</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 허가 대상 기준면적은 용도지역과 지자체 공고에 따라 달라지므로, 매수 대상 물건이 대상인지 여부는 관할 관청에 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">허가받으면 반드시 실거주해야 하나요?</h2>
                <p>
                  주거용 주택은 원칙적으로 2년간 실거주해야 합니다. 부동산 거래신고 등에 관한 법률 §17은 허가를 받은 자가 대통령령으로 정하는 기간 동안 허가받은 목적대로 토지를 이용할 의무를 지도록 합니다. 주거용은 매수인이 직접 거주하는 것을 목적으로 허가가 나오기 때문에, 취득 후 정해진 기간 동안 실제로 살아야 합니다.
                </p>
                <p>
                  절차 측면에서 보면 거래 순서가 일반 매매와 다릅니다. 통상 다음 흐름을 따릅니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>1단계:</strong> 매수 대상이 허가구역·허가 대상 면적인지 확인</li>
                  <li><strong>2단계:</strong> 허가를 조건으로 하는 특약을 넣어 매매계약 체결</li>
                  <li><strong>3단계:</strong> 토지이용계획서 등을 갖춰 관할 시·군·구청에 허가 신청</li>
                  <li><strong>4단계:</strong> 허가 후 잔금·소유권 이전, 정해진 기간 내 입주해 실거주</li>
                </ul>
                <p className="mt-4">
                  예외: 기존 임대차가 남아 있으면 임대차 종료 후 입주해 실거주 의무를 이행하는 방식이 인정될 수 있습니다. 다만 처음부터 세입자를 새로 들이는 갭투자는 목적 위반이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이용의무를 어기면 얼마를 무나요?</h2>
                <p>
                  이행강제금은 취득가액의 10% 범위에서 매년 부과됩니다. 부동산 거래신고 등에 관한 법률 §18은 이용의무를 지키지 않으면 관청이 상당한 기간을 정해 이행을 명령하고, 그래도 이행하지 않으면 취득가액(신고된 실거래가)의 10% 범위에서 이용의무기간이 끝날 때까지 매년 이행강제금을 부과하도록 정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 10억 원에 취득한 주거용 주택을 실거주하지 않은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 취득가액: 10억 원
                    <br />
                    · 이행강제금(연): 10억 원 × 10% = 최대 <strong>연 1억 원 범위</strong>
                    <br />
                    · 이용의무기간이 끝날 때까지 매년 반복 부과 가능
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 실거주를 하지 않으면 해마다 상당한 금액이 부과될 수 있어, 사실상 실수요가 아니면 매수를 재고해야 합니다. 실제 부과율은 위반 유형별로 달라질 수 있습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 구체적 부과율과 산정 방식은 위반 유형과 시행령 규정에 따라 달라질 수 있으므로, 정확한 금액은 관할 관청에서 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">허가 없이 계약하면 어떻게 되나요?</h2>
                <p>
                  허가 없이 체결한 토지거래계약은 효력이 없습니다. 허가구역에서 허가를 받지 않고 맺은 계약은 무효이며, 허가를 조건으로 잠정적으로 효력이 유보되어 있다가 허가가 확정되어야 비로소 유효해집니다. 그래서 실무에서는 계약서에 허가를 정지조건으로 하는 특약을 넣습니다.
                </p>
                <p>
                  나아가 허가를 받지 않고 계약을 체결하거나 부정한 방법으로 허가를 받은 경우에는 형사처벌과 벌금 대상이 될 수 있습니다. 벌금은 계약 당시 토지가격을 기준으로 산정되므로 금액이 작지 않습니다.
                </p>
                <p>
                  주의: 허가를 회피하려고 실거래가를 낮춰 신고하거나 거래를 나누는 방식은 별도의 거래신고 위반으로도 제재될 수 있으므로 시도해서는 안 됩니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매수 시 부담할 취득세를 미리 계산해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/dsr-regulation-zones/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">규제지역과 대출 규제</div>
                    <p className="mt-1 text-sm text-text-secondary">규제지역에서 달라지는 대출 한도를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/mortgage-loan-limit-6-billion-cap-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주담대 한도와 6억 규제</div>
                    <p className="mt-1 text-sm text-text-secondary">실거주 매수 시 대출 한도를 함께 점검하세요.</p>
                  </Link>
                  <Link
                    href="/guide/real-estate-tax-reform-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 부동산 세제 변화</div>
                    <p className="mt-1 text-sm text-text-secondary">보유·거래 관련 세제 흐름을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-vs-monthly-rent-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세 vs 월세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">실거주 의무 기간 동안의 주거 선택을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax-real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">재산세·종부세·거래 규제 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 법률 조언이 아닙니다. 허가 대상 기준면적, 실거주 이용의무 기간, 이행강제금 부과율, 예외 대상은 용도지역·지자체 공고·시행령에 따라 달라질 수 있으므로, 구체적 사안은 관할 시·군·구청과 전문가에게 확인하시기 바랍니다. 본 콘텐츠는 2026-08-09를 기준으로 작성되었으며 법령·지정 현황 변경 시 업데이트됩니다. 인용 조문은 <strong>부동산 거래신고 등에 관한 법률 §10(허가구역의 지정), §11(허가), §17(토지 이용에 관한 의무), §18(이행강제금)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://rt.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부 실거래가 공개시스템</a>.
                </p>
              </section>

              <ShareButtons
                title="토지거래허가구역 2026 가이드"
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