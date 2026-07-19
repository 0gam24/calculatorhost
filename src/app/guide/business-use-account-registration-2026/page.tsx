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

const URL = 'https://calculatorhost.com/guide/business-use-account-registration-2026/';
const DATE_PUBLISHED = '2026-07-20';
const DATE_MODIFIED = '2026-07-20';

export const metadata: Metadata = {
  title: '사업용계좌 신고 2026, 복식부기의무자 대상과 미신고 가산세',
  description:
    '복식부기의무자가 된 개인사업자는 과세기간 개시일부터 6개월 안에 사업용계좌를 신고해야 합니다. 신고 대상 업종별 기준, 6월 30일 기한, 미신고·미사용 가산세 0.2%를 소득세법 §160의5 기준으로 정리했습니다.',
  keywords: [
    '사업용계좌 신고',
    '복식부기의무자',
    '사업용계좌 미신고 가산세',
    '사업용계좌 홈택스 신고',
    '개인사업자 사업용계좌',
    '소득세법 160조의5',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '사업용계좌 신고 2026, 복식부기의무자 대상과 미신고 가산세' }],
    title: '사업용계좌 신고 2026, 6개월 기한과 미신고 가산세 0.2%',
    description: '복식부기의무자 개인사업자의 사업용계좌 신고 기한, 대상 업종, 미신고·미사용 가산세를 소득세법 §160의5 기준으로 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '사업용계좌 신고 2026, 6개월 기한 놓치면 가산세 0.2%',
    description: '복식부기의무자의 사업용계좌 신고 대상·기한·가산세를 소득세법 §160의5 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '사업용계좌 신고가 반드시 필요한가요?',
    answer:
      '네, 복식부기의무자에 해당하는 개인사업자는 반드시 신고해야 합니다. 소득세법 §160의5는 복식부기의무가 적용되는 과세기간 개시일부터 6개월 이내에 관할 세무서장에게 사업용계좌를 신고하도록 규정합니다. 신규 개업하거나 수입금액이 늘어 새로 복식부기의무자가 된 경우에도 동일하게 적용되며, 법인사업자와 간편장부대상자는 대상이 아닙니다.',
  },
  {
    question: '복식부기의무자 판단 기준은 무엇인가요?',
    answer:
      '직전 과세기간 수입금액이 업종별 기준금액 이상이면 당해 과세기간의 복식부기의무자가 됩니다. 소득세법 시행령 §208 기준으로 도소매·부동산매매업 등은 3억원 이상, 제조·숙박음식·건설·전기가스 등은 1억 5천만원 이상, 부동산임대·개인서비스·교육 등은 7천 5백만원 이상입니다. 기준 미만이면 간편장부대상자로 분류되어 사업용계좌 신고 의무가 없습니다.',
  },
  {
    question: '신고 기한을 놓치면 어떻게 되나요?',
    answer:
      '미신고 기간의 수입금액에 0.2%를 곱한 금액이 가산세로 부과됩니다. 소득세법상 사업용계좌 관련 가산세는 미신고 시 미신고 기간 수입금액과 사용대상금액 합계 중 큰 금액에 0.2%를 적용하고, 미사용 시에는 미사용 금액에 0.2%를 적용합니다. 세무조사 대상 선정 참고자료로도 활용되고, 조세특례제한법상 일부 세액감면도 배제될 수 있습니다.',
  },
  {
    question: '사업용계좌는 개인 통장과 완전히 분리해야 하나요?',
    answer:
      '사업 전용 통장일 필요는 없지만, 국세청에 사업용으로 등록한 계좌를 사용해야 합니다. 소득세법 §160의5는 계좌의 명의를 강제하지 않고 사업용으로 신고된 계좌를 통해 거래대금, 인건비, 임차료를 결제·수취하도록 요구합니다. 다만 개인 지출과 섞이면 장부 정리와 세무조사 대응이 복잡해지므로 실무적으로는 분리 운용을 권장합니다.',
  },
  {
    question: '카드 결제분도 사업용계좌로 관리해야 하나요?',
    answer:
      '네, 카드 매출 정산금이 입금되는 계좌는 사업용계좌로 신고된 것이어야 합니다. 소득세법 §160의5는 거래대금을 금융회사를 통해 결제·결제받는 경우 사업용계좌 사용을 원칙으로 규정하기 때문에, 카드 대금이 개인 통장으로 들어오면 미사용 가산세 대상이 될 수 있습니다. 카드사 매출 정산 계좌 변경으로 간단히 정리할 수 있습니다.',
  },
  {
    question: '신고 후 계좌를 변경하거나 추가할 수 있나요?',
    answer:
      '네, 홈택스에서 언제든지 계좌를 추가·변경할 수 있습니다. 사업용계좌는 하나로 한정되지 않고 여러 개를 등록할 수 있으며, 은행·상품 변경 시에도 홈택스 사업용·공익법인 계좌 개설관리 메뉴에서 즉시 반영됩니다. 다만 변경 시점 이전의 거래는 변경 전 계좌를 사용한 것으로 처리되므로, 실제 자금 흐름과 신고 내역이 일치하도록 관리하는 것이 중요합니다.',
  },
  {
    question: '법인사업자도 사업용계좌 신고 의무가 있나요?',
    answer:
      '아니오, 사업용계좌 신고 의무는 개인 복식부기의무자에게만 적용됩니다. 법인은 법인세법과 상법에 따라 별도의 회계 처리와 계좌 관리 규정을 따르므로 소득세법 §160의5의 적용 대상이 아닙니다. 개인사업자에서 법인으로 전환한 경우에는 신설 법인은 신고 의무가 사라지지만, 폐업하기 전 개인사업 기간의 신고 의무는 유효합니다.',
  },
  {
    question: '신규 개업자는 언제부터 신고해야 하나요?',
    answer:
      '개업 첫 해에는 복식부기의무자가 아니므로 신고 의무가 없습니다. 다만 첫 해 수입금액이 업종별 기준 이상이면 다음 과세기간의 개시일인 1월 1일부터 6개월 이내, 즉 6월 30일까지 신고해야 합니다. 예를 들어 2025년 개업자의 수입금액이 2억원(제조업)이면 2026년이 복식부기의무자 첫 해가 되어 2026년 6월 30일까지 신고해야 합니다.',
  },
];

export default function BusinessUseAccountRegistration2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '사업용계좌 신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '사업용계좌 신고 2026, 복식부기의무자 대상과 미신고 가산세',
    description:
      '복식부기의무자가 된 개인사업자의 사업용계좌 신고 대상·기한·방법·가산세를 소득세법 §160의5와 시행령 §208 기준으로 정리한 실무 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['사업용계좌', '복식부기의무자', '개인사업자', '가산세', '홈택스 신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '사업용계좌 신고 2026',
    description:
      '복식부기의무자 개인사업자의 사업용계좌 신고 대상, 6개월 기한, 미신고·미사용 가산세를 소득세법 §160의5 기준으로 정리.',
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
                    { name: '사업용계좌 신고 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·프리랜서 · 8분 읽기 · 2026-07-20</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  사업용계좌 신고 2026
                  <br />
                  <span className="text-2xl text-text-secondary">6개월 기한, 놓치면 가산세 0.2%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  복식부기의무자가 된 개인사업자에게 사업용계좌 신고는 선택이 아닌 법정 의무입니다. 신고 시점을 놓치거나 등록한 계좌를 실제 거래에 사용하지 않으면 수입금액의 0.2%가 가산세로 부과되고, 세무조사 대상 선정 참고자료로도 활용됩니다. 이 가이드는 신고 대상 판단, 6개월 기한 계산, 홈택스 신고 절차, 미신고·미사용 가산세 사례까지 소득세법 §160의5와 시행령 §208 기준으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-business-use-account-registration-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업용계좌 신고란 무엇인가요?</h2>
                <p>
                  사업용계좌 신고란 개인 복식부기의무자가 사업 관련 자금 거래에 사용할 금융계좌를 관할 세무서에 미리 등록하는 절차입니다. 근거 조항은 소득세법 §160의5(사업용계좌의 신고·사용의무 등)이며, 신고된 계좌를 통해 거래대금, 인건비, 임차료를 결제하고 수취하도록 규정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요지</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 개인 복식부기의무자 (법인·간편장부대상자 제외)
                    <br />
                    · 시점: 복식부기의무가 적용되는 과세기간 개시일부터 6개월 이내
                    <br />
                    · 방법: 홈택스 사업용·공익법인 계좌 개설관리 메뉴 또는 관할 세무서 방문
                    <br />
                    · 미이행 시: 미신고·미사용 금액의 <strong>0.2%</strong>가 가산세로 부과
                  </p>
                </div>
                <p className="mt-4">
                  사업용계좌는 자금 흐름 투명화를 통해 종합소득세 신고 정확성을 확보하기 위한 제도입니다. 국세청은 사업용계좌의 거래 내역을 통해 매출 누락과 가공경비를 교차 검증하므로, 신고 이행 자체가 세무 리스크를 줄이는 역할을 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 사업용계좌는 사업 전용일 필요는 없습니다. 소득세법 §160의5는 계좌 명의나 전용 여부가 아니라 국세청에 사업용으로 등록된 계좌를 통해 결제·수취하도록 요구합니다. 실무적으로는 개인 지출과 섞이면 장부 정리가 복잡해지므로 분리 운용을 권장합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 신고해야 하나요?</h2>
                <p>
                  신고 대상은 개인 복식부기의무자입니다. 직전 과세기간 수입금액이 소득세법 시행령 §208에서 정한 업종별 기준금액 이상이면 당해 과세기간의 복식부기의무자가 되고, 그 순간부터 사업용계좌 신고 의무가 발생합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 복식부기의무자 업종별 수입금액 기준 (소득세법 시행령 §208)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">업종 구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">직전 수입금액 기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대표 업종 예시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1군</td>
                        <td className="p-3"><strong>3억원 이상</strong></td>
                        <td className="p-3">도매·소매업, 부동산매매업, 농업·임업·어업</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2군</td>
                        <td className="p-3"><strong>1억 5천만원 이상</strong></td>
                        <td className="p-3">제조업, 숙박음식점업, 건설업, 전기·가스·수도업, 운수업</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3군</td>
                        <td className="p-3"><strong>7천 5백만원 이상</strong></td>
                        <td className="p-3">부동산임대업, 개인서비스업, 교육서비스업, 보건업, 금융·보험 관련 서비스</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  기준 미만이면 간편장부대상자로 분류되어 사업용계좌 신고 의무가 없습니다. 반대로 기준을 넘으면 다음 과세기간부터 자동으로 복식부기의무자가 되므로, 매년 5월 종합소득세 신고 이후 자신의 지위를 재확인하는 습관이 필요합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 전문직 사업자(변호사·회계사·세무사·의사 등)와 성실신고확인대상자는 수입금액과 무관하게 별도 규정에 따라 장부 작성 의무가 있을 수 있으므로, 개별 상황은 관할 세무서 또는 세무대리인에게 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 신고해야 하나요?</h2>
                <p>
                  신고 기한은 복식부기의무가 적용되는 과세기간 개시일부터 6개월 이내입니다. 개인사업자의 과세기간은 통상 1월 1일부터 12월 31일까지이므로, 매년 6월 30일이 실무상 마감일이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 기존 사업자가 새로 복식부기의무자가 된 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 2025년 도소매업 수입금액: 3억 5천만원 (1군 기준 3억원 초과)
                    <br />
                    · 2026년부터 복식부기의무자 지위 발생
                    <br />
                    · 신고 기한: 2026년 1월 1일부터 6개월, 즉 <strong>2026년 6월 30일까지</strong>
                    <br />
                    · 준비 서류: 사업자등록증, 신고할 계좌 정보(은행·계좌번호·명의)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 신규 개업자가 첫 해 매출을 크게 낸 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 2025년 3월 개업, 제조업 수입금액: 2억원 (2군 기준 1억 5천만원 초과)
                    <br />
                    · 개업 첫 해(2025년)에는 간편장부대상자로 시작
                    <br />
                    · 2026년부터 복식부기의무자 전환
                    <br />
                    · 신고 기한: <strong>2026년 6월 30일까지</strong>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 사업 양수, 상속, 폐업 후 재개업 등 특수한 경우 과세기간 개시일이 통상과 다를 수 있습니다. 이때는 개시일을 기준으로 6개월을 계산해야 하므로, 정확한 기한은 관할 세무서에 사전 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고하지 않으면 가산세가 얼마인가요?</h2>
                <p>
                  미신고 시 가산세는 미신고 기간 수입금액의 0.2%입니다. 소득세법상 사업용계좌 관련 가산세 규정은 미신고와 미사용을 나눠 각각 0.2%를 부과하고, 미신고의 경우 미신고 기간 수입금액과 사용대상금액 합계 중 큰 금액을 기준으로 삼습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 연 수입 3억원, 1년 전체 미신고</p>
                  <p className="text-sm text-text-secondary">
                    · 미신고 기간: 1년(365일)
                    <br />
                    · 미신고 기간 수입금액: 3억원
                    <br />
                    · 가산세: 3억원 × 0.2% = <strong>60만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">사용대상금액이 더 크면 그 금액에 0.2%가 적용됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 연 수입 1억 5천만원(제조업), 6개월 미신고 후 7월 뒤늦게 신고</p>
                  <p className="text-sm text-text-secondary">
                    · 미신고 기간: 6개월 상당
                    <br />
                    · 미신고 기간 수입금액: 1억 5천만원 × 6/12 = 7천 5백만원
                    <br />
                    · 가산세: 7천 5백만원 × 0.2% = <strong>15만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">기한을 놓쳐도 빨리 신고할수록 가산세 부담이 줄어듭니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 신고는 했지만 실제 거래를 개인 통장으로 처리한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 미사용 금액(사업용계좌 밖으로 나간 결제·수취액): 5천만원
                    <br />
                    · 미사용 가산세: 5천만원 × 0.2% = <strong>10만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">신고만 하고 사용하지 않으면 미사용 가산세 대상이 됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  가산세 부담 자체는 크지 않아 보일 수 있지만, 사업용계좌 미이행은 세무조사 대상 선정 참고자료로 활용되고 조세특례제한법상 일부 세액감면이 배제될 수 있다는 점이 더 큰 리스크입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 여기서 인용한 0.2% 가산세율은 국세청 안내와 소득세법 사업용계좌 관련 가산세 규정을 요약한 것으로, 정확한 조항 번호와 계산 방식은 개정될 수 있으므로 최신 국세청 자료를 함께 확인하시기 바랍니다.
                </p>
              </section>

              <AdSlot slot="guide-business-use-account-registration-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업용계좌는 어떻게 사용하나요?</h2>
                <p>
                  사업용계좌는 소득세법 §160의5 제1항에 정한 세 가지 거래 유형에서 사용해야 합니다. 결제 방식은 계좌이체, 자동이체, 카드 매출 정산 등 금융회사가 개입하는 모든 경로가 포함됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>거래대금 결제·수취:</strong> 매입처에 대금을 송금하거나 매출 대금을 받는 경우 사업용계좌를 사용합니다. 카드 매출 정산금이 입금되는 계좌도 사업용으로 신고돼야 합니다.
                  </li>
                  <li>
                    <strong>인건비 지급·수취:</strong> 직원 급여, 아르바이트 인건비, 프리랜서 용역비 등 인건비 성격의 자금 이동은 사업용계좌를 통해야 합니다.
                  </li>
                  <li>
                    <strong>임차료 지급·수취:</strong> 사무실, 매장, 창고 등 사업장 임차료는 사업용계좌에서 지급하거나 수취해야 합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  현금 결제, 소액 지출, 신용카드 결제(사업용 카드) 등 금융계좌를 통하지 않는 거래는 사업용계좌 사용 의무 대상에서 제외됩니다. 다만 종합소득세 신고 시 증빙 자료로서의 가치는 여전히 유효하므로 영수증과 카드 명세서를 별도로 보관해야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 임차료·인건비를 개인 통장으로 실수로 이체했다면, 즉시 사업용계좌로 다시 정리하거나 회계 처리 시 사업용 지출임을 명확히 기록해야 향후 세무조사에서 미사용 가산세 소명이 가능합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간편장부대상자도 신고해야 하나요?</h2>
                <p>
                  아니오, 간편장부대상자는 사업용계좌 신고 의무가 없습니다. 소득세법 §160의5는 복식부기의무자에게만 신고 의무를 부과하며, 간편장부대상자는 소득세법 §160 제2항에 따라 간편장부만 작성하면 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 복식부기의무자 vs 간편장부대상자 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">복식부기의무자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">간편장부대상자</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">장부 작성</td>
                        <td className="p-3">복식부기(대차평균)</td>
                        <td className="p-3">간편장부</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사업용계좌 신고</td>
                        <td className="p-3"><strong>의무</strong></td>
                        <td className="p-3">의무 없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기장세액공제</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">복식부기로 신고 시 최대 100만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">무기장가산세</td>
                        <td className="p-3">산출세액 20%</td>
                        <td className="p-3">산출세액 20% (수입 4천 8백만원 이상)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  간편장부대상자라도 자발적으로 복식부기로 신고하면 기장세액공제 최대 100만원을 받을 수 있어, 세무대리인 도움을 받을 수 있는 규모의 사업자는 복식부기 자발 전환을 검토할 만합니다. 다만 자발적으로 복식부기를 선택했다고 해서 사업용계좌 신고 의무까지 생기지는 않습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 수입금액 기준을 초과했음에도 간편장부로 신고하면 무기장가산세와 별도의 신고 불성실 가산세가 부과될 수 있으므로, 매년 5월 신고 전에 자신의 지위를 정확히 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">홈택스로 어떻게 신고하나요?</h2>
                <p>
                  홈택스 신고는 5분이면 끝납니다. 준비물은 사업자등록증과 사업용으로 사용할 계좌의 은행·계좌번호·명의 정보뿐입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1단계. 홈택스 로그인</p>
                  <p className="text-sm text-text-secondary">
                    홈택스(hometax.go.kr)에 공동인증서 또는 간편인증(카카오·통신사·PASS 등)으로 로그인합니다. 개인사업자는 개인 회원으로 접속한 뒤 사업자 인증을 추가해야 사업용 메뉴가 열립니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2단계. 사업용·공익법인 계좌 개설관리 메뉴 진입</p>
                  <p className="text-sm text-text-secondary">
                    상단 메뉴 "국세증명·사업자등록·세금관련 신청/신고" 아래 "사업용·공익법인 계좌 개설관리" 항목을 선택하고, "사업용계좌 신고" 화면으로 이동합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3단계. 계좌 정보 입력</p>
                  <p className="text-sm text-text-secondary">
                    은행명, 계좌번호, 예금주 명의를 입력합니다. 여러 계좌를 등록할 때는 "행 추가"로 반복 입력할 수 있고, 신고 후에도 언제든지 추가·변경할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">4단계. 접수 확인 및 증명 발급</p>
                  <p className="text-sm text-text-secondary">
                    신고 완료 후 접수증을 저장하거나 인쇄해 보관합니다. 이후 "사업용계좌 신고내역 조회" 메뉴에서 언제든지 등록된 계좌 목록을 확인할 수 있습니다.
                  </p>
                </div>
                <p className="mt-4">
                  홈택스 접속이 어려우면 관할 세무서 민원실을 방문해 서면 신고서로도 제출할 수 있습니다. 이 경우 사업자등록증 사본과 계좌 개설 확인서를 함께 지참하면 처리가 빠릅니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 홈택스 화면 구성과 메뉴 이름은 국세청 시스템 개편에 따라 달라질 수 있습니다. 메뉴가 안 보이면 홈택스 상단 검색창에 "사업용계좌"를 입력하면 최신 위치를 안내받을 수 있습니다.
                </p>
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
                    <p className="mt-1 text-sm text-text-secondary">수입금액과 경비율을 반영해 종합소득세를 예상해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">복식부기 vs 간편장부</div>
                    <p className="mt-1 text-sm text-text-secondary">자신의 장부 작성 의무 지위를 정확히 판단하세요.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 절차 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">개업 준비부터 등록증 발급까지 첫 단계를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">추계신고 시 유리한 경비 방식을 선택하는 기준을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 세율 구간</div>
                    <p className="mt-1 text-sm text-text-secondary">2026년 8단계 누진세율과 누진공제액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세까지 세금 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 신고 대상 여부, 기한 계산, 미신고·미사용 가산세 계산은 관할 세무서 또는 세무대리인에게 반드시 확인하세요. 본 콘텐츠는 2026-07-20을 기준으로 작성되었으며, 소득세법 및 시행령 개정 시 즉시 업데이트됩니다. 사업용계좌의 신고·사용 의무는 <strong>소득세법 §160의5</strong>, 복식부기의무자 판단 기준은 <strong>소득세법 시행령 §208</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="사업용계좌 신고 2026 가이드"
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
