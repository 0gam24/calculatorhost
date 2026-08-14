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

const URL = 'https://calculatorhost.com/guide/real-estate-transaction-report-2026/';
const DATE_PUBLISHED = '2026-08-15';
const DATE_MODIFIED = '2026-08-15';

export const metadata: Metadata = {
  title: '부동산 실거래 신고 2026, 30일 기한과 과태료 정리 | calculatorhost',
  description:
    '부동산 실거래 신고는 계약일부터 30일 이내에 해야 하며, 미신고는 500만원 이하 과태료 대상입니다. 신고 주체, 지연·거짓신고 과태료, 해제신고까지 부동산 거래신고 등에 관한 법률 §3·§28 기준으로 정리합니다.',
  keywords: [
    '부동산 실거래 신고',
    '실거래가 신고 기한',
    '부동산 거래신고 과태료',
    '실거래 신고 30일',
    '다운계약 과태료',
    '부동산거래신고법 3조',
    '실거래 지연신고',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부동산 실거래 신고 2026, 30일 기한과 과태료 정리' }],
    title: '부동산 실거래 신고 2026, 30일 기한과 과태료 정리',
    description: '매매계약 체결일부터 30일 이내 신고 의무. 미신고 500만원 이하, 거짓신고 3천만원 이하 과태료. 부동산 거래신고 등에 관한 법률 §3·§28 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부동산 실거래 신고 2026, 30일 기한과 과태료 정리',
    description: '계약일부터 30일 이내 실거래 신고 의무. 미신고 500만원, 거짓신고 3천만원 이하 과태료. §3·§28.',
  },
};

const FAQ_ITEMS = [
  {
    question: '실거래 신고는 계약일 기준인가요, 잔금일 기준인가요?',
    answer:
      '매매계약 체결일 기준입니다. 부동산 거래신고 등에 관한 법률 §3은 매매계약을 체결한 날부터 30일 이내에 신고하도록 규정하고 있습니다. 잔금일이나 소유권 이전등기일이 아니라 계약서에 도장을 찍은 날이 기산점이므로, 실무에서 가장 자주 착오가 발생하는 지점입니다. 30일이 지나면 지연신고로 분류되어 과태료가 부과될 수 있습니다.',
  },
  {
    question: '개업공인중개사가 중개했다면 저는 신고를 안 해도 되나요?',
    answer:
      '네, 개업공인중개사가 중개한 거래는 해당 중개사가 신고 의무를 집니다. 다만 중개사가 실제로 기한 내에 신고를 마쳤는지 매수·매도자가 신고필증으로 확인하는 것이 안전합니다. 소유권 이전등기 신청 시 신고필증이 필요하므로, 잔금일 전에 반드시 발급 여부를 점검하세요. 중개사가 신고하지 않아 문제가 생길 경우 최종 책임 관계는 관할 지자체와 협의가 필요합니다.',
  },
  {
    question: '30일이 지나 신고하면 얼마의 과태료가 나오나요?',
    answer:
      '지연신고 과태료는 지연 기간과 거래금액에 따라 차등 부과됩니다. 상한은 부동산 거래신고 등에 관한 법률 §28②의 500만원이며, 구체적인 금액 구간은 같은 법 시행령 별표3에서 정합니다. 일반적으로 지연 기간이 길수록, 거래금액이 클수록 과태료가 커지는 구조입니다. 정확한 금액은 관할 시장·군수·구청장에게 통보되는 사전 통지서에서 확인할 수 있습니다.',
  },
  {
    question: '다운계약이나 업계약을 신고하면 어떤 불이익이 있나요?',
    answer:
      '거짓신고는 부동산 거래신고 등에 관한 법률 §28①에 따라 3천만원 이하의 과태료 대상이며, 취득가액 기준으로 별표3에 정한 비율에 따라 산정됩니다. 여기에 더해 양도소득세와 취득세 추징, 국세청·국세조사 등 세무 리스크가 함께 따라옵니다. 매수·매도자 어느 쪽이 요구하더라도 실제 거래가격 그대로 신고하는 것이 안전합니다.',
  },
  {
    question: '계약이 해제되면 어떻게 해야 하나요?',
    answer:
      '해제·무효·취소가 확정된 날부터 30일 이내에 해제 등 신고를 해야 합니다. 이미 실거래 신고를 마쳤다면 해제신고를 별도로 접수해야 시스템상 거래가 정리되고, 이후 취득세·양도세 계산에도 반영됩니다. 신고를 하지 않으면 원래 계약이 유효한 것으로 관리되어 소유권 관계와 세금 처리에 혼선이 생깁니다.',
  },
  {
    question: '신고 내용에 오타가 있으면 다시 해야 하나요?',
    answer:
      '금액, 계약일, 당사자 정보 등에 오류가 있으면 정정신고를 해야 합니다. 부동산거래관리시스템에서 온라인으로 접수하거나 관할 시·군·구청에 방문해 처리할 수 있습니다. 특히 금액 정정은 지연·거짓신고 판단과 직결되므로, 오류를 확인한 즉시 정정하는 것이 과태료 위험을 줄이는 방법입니다.',
  },
  {
    question: '자진 신고하면 과태료가 감경되나요?',
    answer:
      '지자체가 위반 사실을 인지하기 전에 스스로 신고하면 과태료가 감경 또는 면제될 수 있습니다. 이른바 자진 신고 감경 제도로, 지연·거짓신고 모두에 적용될 여지가 있습니다. 다만 감경 폭과 요건이 사안별로 달라지므로, 국토교통부 또는 관할 지자체에 사전 문의해 정확한 절차를 확인한 뒤 접수하는 것이 안전합니다.',
  },
  {
    question: '온라인으로 신고할 수 있나요?',
    answer:
      '부동산거래관리시스템(rtms.molit.go.kr)에서 공동인증서 등으로 로그인하여 온라인 신고가 가능합니다. 계약서 스캔본과 당사자 정보를 첨부하면 관할 시·군·구청 담당자가 검토한 뒤 신고필증을 전자로 발급합니다. 오프라인 방문이 어렵거나 일정이 촉박한 경우에도 30일 기한을 지키기 쉬운 방법입니다.',
  },
];

export default function RealEstateTransactionReport2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부동산 실거래 신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부동산 실거래 신고 2026, 30일 기한과 지연·미신고 과태료 정리',
    description:
      '매매계약 체결일부터 30일 이내에 이뤄져야 하는 부동산 실거래 신고. 신고 의무자, 지연·미신고 500만원 이하, 거짓신고 3천만원 이하 과태료, 해제신고까지 부동산 거래신고 등에 관한 법률 §3·§28 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부동산 실거래 신고', '실거래가 신고 기한', '거래신고 과태료', '다운계약', '해제신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부동산 실거래 신고 2026',
    description:
      '부동산 매매 계약 후 30일 이내 실거래 신고 의무, 지연·미신고·거짓신고 과태료를 부동산 거래신고 등에 관한 법률 §3·§28 기준으로 정리한 가이드.',
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
                    { name: '부동산 실거래 신고 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 매수·매도자 · 8분 읽기 · 2026-08-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부동산 실거래 신고 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 30일 기한과 지연·미신고 과태료</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 사거나 팔았을 때 가장 자주 놓치는 절차가 실거래 신고입니다. 부동산 거래신고 등에 관한 법률 §3은 매매계약 체결일부터 30일 이내 신고를 요구하고, 이를 어기면 최대 3천만원까지 과태료가 부과될 수 있습니다. 이 가이드는 누가, 언제까지, 어떻게 신고해야 하는지와 지연·미신고·거짓신고 각각의 과태료 구조를 실무 중심으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부동산 실거래 신고란 무엇인가요?</h2>
                <p>
                  부동산 실거래 신고는 매매계약을 체결한 뒤 실제 거래가격과 계약 내용을 관할 지자체에 알리는 법정 절차입니다. 부동산 거래신고 등에 관한 법률 §3은 주택, 오피스텔, 토지, 상가 등 대부분의 부동산 매매를 신고 대상으로 정하고 있으며, 정부는 이 정보를 실거래가 공개시스템에 반영해 시장 투명성을 높이는 데 활용합니다.
                </p>
                <p>
                  신고를 마치면 부동산거래계약 신고필증이 발급되는데, 이 서류는 나중에 소유권 이전등기 신청 시 등기소가 요구하는 필수 첨부물입니다. 즉 실거래 신고를 하지 않으면 형식상 등기 이전 자체가 진행되지 않으므로, 매매 절차 전체가 늦어지는 결과로 이어집니다.
                </p>
                <p>
                  다만 증여, 상속, 경매를 통한 취득처럼 매매가 아닌 방식으로 소유권이 이전되는 경우에는 실거래 신고 대상에서 제외되거나 다른 신고 체계를 따릅니다. 본인이 어느 유형에 해당하는지 애매하다면 관할 시·군·구청에 사전 문의하는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 신고해야 하나요?</h2>
                <p>
                  신고 의무자는 크게 두 가지 경우로 나뉩니다. 개업공인중개사가 중개한 거래라면 중개사가 신고 의무를 지고, 직거래처럼 중개사 없이 이루어진 거래라면 매수·매도 거래당사자가 공동으로 신고해야 합니다. 부동산 거래신고 등에 관한 법률 §3은 이 두 가지 유형을 명확히 구분해 규정하고 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">신고 주체 요약</p>
                  <p className="text-sm text-text-secondary">
                    · 중개 거래: 개업공인중개사가 단독 신고
                    <br />
                    · 직거래: 매수자·매도자 공동 신고 (한쪽이 거부하면 다른 쪽이 단독 신고 가능)
                    <br />
                    · 다물건 계약: 물건별로 각각 신고 접수
                  </p>
                </div>
                <p>
                  다만 중개사가 신고를 진행했더라도, 매수·매도자 각자가 신고필증 발급 여부를 확인해 두는 것이 좋습니다. 신고필증은 등기, 세무 신고, 대출 심사에서 반복적으로 요구되기 때문입니다. 공동신고를 거부한 상대방이 있을 때는 단독으로도 신고할 수 있는데, 이 경우 상대방에게 부동산 거래신고 등에 관한 법률 §28②에 따른 500만원 이하 과태료가 부과될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 신고해야 하나요?</h2>
                <p>
                  기한은 매매계약 체결일부터 30일입니다. 여기서 계약 체결일은 잔금일이나 소유권 이전등기일이 아니라, 매매계약서에 실제로 서명·날인한 날을 뜻합니다. 실무에서 잔금일 기준으로 오해해 신고를 늦추는 사례가 가장 많은 지점입니다.
                </p>
                <p>
                  30일 계산은 계약 체결일 다음날부터 세어 30일째가 되는 날까지입니다. 마지막 날이 토요일, 일요일, 공휴일이면 다음 근무일까지 접수하면 됩니다. 계약 후 잔금일 사이에 시간이 많이 남아 있더라도, 계약서 도장이 찍힌 이상 이 기한은 계속 흐른다는 점을 기억해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기한 시뮬레이션</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 계약 체결일: 2026-08-15
                    <br />
                    · 신고 마감일: 2026-09-14 (30일째 되는 날)
                    <br />
                    · 이 날을 넘기면 지연신고로 분류되어 §28②의 과태료 대상이 됩니다.
                  </p>
                </div>
                <p>
                  다만 계약 이후 잔금까지 6개월 이상 기간을 두는 특약, 조건부 계약 등의 경우에도 신고 기한은 원칙적으로 계약 체결일 기준입니다. 실거래 신고와 잔금 지급은 별개의 절차이므로 혼동하지 마세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고를 안 하면 과태료가 얼마인가요?</h2>
                <p>
                  부동산 거래신고 등에 관한 법률 §28은 위반 유형별로 과태료 상한을 정하고 있습니다. 미신고와 공동신고 거부는 §28②에 따라 500만원 이하, 실제 거래가격을 거짓으로 신고한 경우에는 §28①에 따라 3천만원 이하로 규정되어 있습니다. 각 상한 범위 안에서 지연 기간, 거래금액, 위반 정도에 따라 실제 금액이 결정됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 위반 유형별 과태료 상한 (부동산 거래신고 등에 관한 법률 §28, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">위반 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과태료 상한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거 조항</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30일 기한 초과 지연신고</td>
                        <td className="p-3"><strong>500만원 이하</strong></td>
                        <td className="p-3">§28② (기간·금액 차등)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">아예 신고하지 않음(미신고)</td>
                        <td className="p-3"><strong>500만원 이하</strong></td>
                        <td className="p-3">§28②</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공동신고 거부(직거래)</td>
                        <td className="p-3"><strong>500만원 이하</strong></td>
                        <td className="p-3">§28②</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">거짓신고(다운·업계약)</td>
                        <td className="p-3"><strong>3천만원 이하</strong></td>
                        <td className="p-3">§28① (취득가액 비율)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  구체적인 지연·거짓신고 과태료의 세부 금액표는 같은 법 시행령 별표3에서 지연 기간과 거래금액별로 차등해 정하고 있습니다. 이 별표는 개정이 잦은 편이므로, 최종 부과 금액은 사전 통지서 또는 관할 지자체 안내를 통해 확인하는 것이 가장 정확합니다.
                </p>
                <p>
                  다만 상한선이 500만원이라 해도 소액 지연은 그보다 훨씬 낮은 금액으로 부과되는 경우가 많고, 반대로 고액 거래일수록 상한에 근접하는 경향이 있습니다. 스스로 판단하기보다는 근거 조항과 시행령 별표3을 함께 확인해야 오차가 줄어듭니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">지연신고 과태료는 어떻게 정해지나요?</h2>
                <p>
                  지연신고 과태료는 두 가지 축, 지연 기간과 거래금액을 조합해 산정됩니다. 부동산 거래신고 등에 관한 법률 시행령 별표3은 지연 기간을 여러 구간으로 나누고, 각 구간마다 거래금액에 따른 정액 또는 정률 기준을 정하고 있습니다. 일반적으로 지연 기간이 짧고 거래금액이 작을수록 과태료는 낮아지는 구조입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 5억원 매매를 계약일 45일 후 신고한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 계약 체결일: 2026-08-01
                    <br />
                    · 실제 신고일: 2026-09-15 (45일째)
                    <br />
                    · 지연 일수: 30일 기한을 15일 초과
                    <br />
                    · 처리: 시행령 별표3의 해당 구간(단기 지연 · 중간 규모 거래)에 따라 과태료 산정
                    <br />
                    · 결론: 상한 500만원 범위 안에서 지자체가 사전 통지서로 실제 금액을 안내
                  </p>
                </div>
                <p>
                  중요한 점은 지연 사실을 지자체가 인지하기 전에 스스로 접수하면 자진 신고 감경 대상이 될 수 있다는 것입니다. 감경 폭은 사안별로 다르지만, 조사 개시 이후에 접수하는 것보다 유리한 경우가 일반적입니다.
                </p>
                <p>
                  다만 자진 신고라 해도 이미 거짓신고가 함께 이루어진 상태라면 감경 요건이 달라질 수 있습니다. 정확한 감경 여부와 폭은 국토교통부와 관할 지자체 담당 부서에 사전 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">거짓(다운·업)계약 신고하면 어떻게 되나요?</h2>
                <p>
                  실제 거래가격과 다르게 신고하면 부동산 거래신고 등에 관한 법률 §28①에 따라 3천만원 이하의 과태료가 부과됩니다. 시행령 별표3은 취득가액을 기준으로 과태료를 정률로 산정하는 구조를 갖고 있으며, 위반 정도가 클수록 상한에 가까워집니다.
                </p>
                <p>
                  과태료뿐 아니라 세무 리스크도 함께 따라옵니다. 다운계약(실제보다 낮게 신고)은 매도자의 양도소득세를 줄이려는 목적으로 이용되는 사례가 많은데, 국세청이 이를 적발하면 양도세와 가산세를 추징하고 매수자의 향후 양도 시 취득가액 인정에도 문제가 생길 수 있습니다. 업계약(실제보다 높게 신고)은 매수자의 대출 한도를 늘리려는 목적으로 쓰이지만, 은행 대출 사기와 결합될 경우 형사 처벌로 이어질 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 다운계약 자진 신고로 감경받은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 실제 거래가격: 7억원
                    <br />
                    · 초기 신고금액: 6억원 (1억원 다운)
                    <br />
                    · 매도자가 지자체 조사 개시 전에 정정신고 접수
                    <br />
                    · 처리: 자진 신고 감경 요건 검토 후 §28① 상한 이내에서 감경된 금액으로 부과
                    <br />
                    · 결론: 조사 이후 적발 대비 과태료 부담을 줄인 사례. 다만 양도세 추징은 별도 진행
                  </p>
                </div>
                <p>
                  다만 자진 신고 감경은 요건이 엄격하므로, 매수·매도자가 임의로 판단하기보다는 세무사, 국토교통부, 관할 지자체 안내를 함께 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약이 깨지면 어떻게 신고하나요?</h2>
                <p>
                  이미 실거래 신고를 마쳤는데 계약이 해제, 무효, 취소되면 확정된 날부터 30일 이내에 해제 등 신고를 접수해야 합니다. 부동산 거래신고 등에 관한 법률은 원래 신고 의무와 마찬가지로 해제신고에도 30일 기한을 두고 있으며, 이를 어기면 별도의 과태료 대상이 될 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">해제신고 실무 체크</p>
                  <p className="text-sm text-text-secondary">
                    · 언제부터 30일? 해제·무효·취소가 확정된 날 다음날부터
                    <br />
                    · 어디서? 부동산거래관리시스템(rtms.molit.go.kr) 또는 관할 시·군·구청 방문
                    <br />
                    · 무엇을? 해제 사유 증빙, 계약 해제 합의서 등
                    <br />
                    · 왜 필요? 신고 이력이 남아 있으면 취득세·양도세 계산과 소유권 관리에 혼선
                  </p>
                </div>
                <p>
                  해제신고를 하지 않으면 시스템상 계약이 여전히 유효한 것으로 관리됩니다. 결과적으로 실거래가 공개시스템의 통계에 잘못된 값이 반영되고, 이후 매수·매도자의 세무 처리에도 부정확한 정보가 남게 됩니다.
                </p>
                <p>
                  다만 계약 해제 사유가 매수·매도 어느 쪽의 귀책인지, 위약금 정산은 어떻게 되는지는 실거래 신고와 별개의 사안입니다. 손해배상, 계약금 반환 등은 민사상 다툼으로 정리하고, 실거래 시스템 정리는 해제신고로 별도 처리해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/real-estate-sales-contract-stamp-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 매매계약 인지세</div>
                    <p className="mt-1 text-sm text-text-secondary">계약서에 붙이는 인지세 금액과 납부 방법을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">신고필증이 필요한 취득세, 세율과 계산법을 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/real-estate-broker-fee-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중개보수 요율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">중개사가 신고를 대행할 때 함께 확인하는 보수 요율표.</p>
                  </Link>
                  <Link
                    href="/guide/lease-report-system-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 신고제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">매매가 아닌 임대차 계약에도 별도의 신고 의무가 있습니다.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-preliminary-return-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 예정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">실거래 신고 뒤 이어지는 매도자의 양도소득세 신고 절차.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금·부동산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">취득세, 양도세, 재산세, 종부세 가이드를 한자리에.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률·세무 조언이 아닙니다. 신고 의무자, 신고 기한, 과태료 금액은 개별 거래 상황과 법령 개정 시점에 따라 달라질 수 있으므로, 실제 신고와 이의 대응은 국토교통부, 관할 시·군·구청, 세무사 등 전문가 확인을 병행하시기 바랍니다. 본 콘텐츠는 2026-08-15을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>부동산 거래신고 등에 관한 법률 §3(부동산 거래의 신고), §28(과태료)</strong>이며, 지연·거짓신고 과태료 세부 금액은 <strong>같은 법 시행령 별표3</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://rt.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부 실거래가 공개시스템</a>,{' '}
                  <a href="https://rtms.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">부동산거래관리시스템</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="부동산 실거래 신고 2026, 30일 기한과 과태료 정리"
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
