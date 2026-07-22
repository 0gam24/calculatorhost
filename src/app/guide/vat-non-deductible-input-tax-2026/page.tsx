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

const URL = 'https://calculatorhost.com/guide/vat-non-deductible-input-tax-2026/';
const DATE_PUBLISHED = '2026-07-22';
const DATE_MODIFIED = '2026-07-22';

export const metadata: Metadata = {
  title: '부가세 매입세액 불공제 항목 2026, 공제 안 되는 7가지',
  description:
    '부가가치세법 §39 기준 매입세액 불공제 7가지 항목 총정리. 접대비, 비영업용 승용차, 세금계산서 미수취, 사업자등록 전 매입세액 등 공제 안 되는 이유와 계산 사례까지.',
  keywords: [
    '부가세 매입세액 불공제',
    '매입세액 공제 안되는 항목',
    '접대비 부가세',
    '비영업용 승용차 부가세',
    '부가가치세법 39조',
    '부가세 공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부가세 매입세액 불공제 항목 2026, 공제 안 되는 7가지' }],
    title: '부가세 매입세액 불공제 2026, 접대비·비영업용 승용차·세금계산서 미수취 완전 정리',
    description: '부가가치세법 §39에 따른 매입세액 불공제 7가지 항목과 계산 사례. 7월 부가세 확정신고 전 필독.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부가세 매입세액 불공제 2026, 공제 안 되는 7가지 항목',
    description: '접대비, 비영업용 승용차, 사업자등록 전 매입세액 등 부가가치세법 §39 불공제 항목 총정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부가세 매입세액 불공제란 정확히 무엇인가요?',
    answer:
      '부가세 매입세액 불공제는 사업자가 매입 시 부담한 부가가치세를 매출세액에서 차감하지 못하는 것을 말합니다. 부가가치세법 §39는 접대비, 비영업용 승용차, 세금계산서 미수취분 등 특정 항목의 매입세액을 공제 대상에서 제외합니다. 세금계산서를 받았더라도 이 항목에 해당하면 공제가 불가능하므로, 실질적으로 부가세 10%를 사업자가 최종 부담하게 됩니다.',
  },
  {
    question: '접대비로 110만원 결제하면 부가세 얼마를 손해 보나요?',
    answer:
      '공급가액 100만원, 부가세 10만원의 접대비 결제 시 매입세액 10만원 전액이 불공제됩니다(부가가치세법 §39). 즉, 부가세 확정신고에서 이 10만원을 매출세액에서 차감하지 못하므로 사실상 10만원의 추가 부담이 발생합니다. 접대비는 사업 관련성이 있어도 조세정책상 불공제 대상이라는 점이 실무자들이 가장 자주 혼동하는 지점입니다.',
  },
  {
    question: '경차를 구입하면 부가세 공제를 받을 수 있나요?',
    answer:
      '네, 배기량 1,000cc 이하 경차는 비영업용이라도 매입세액 공제가 가능합니다. 부가가치세법 §39는 비영업용 소형승용차의 매입세액을 불공제로 규정하지만, 경차·9인승 이상 승합차·화물차(트럭)·영업용(택시·렌터카) 등은 예외로 공제가 허용됩니다. 반면 배기량 1,001cc 이상 개별소비세 과세대상 승용차는 원칙적으로 매입·임차·유지비 모두 불공제입니다.',
  },
  {
    question: '사업자등록 전 매입세액은 언제까지 공제받을 수 있나요?',
    answer:
      '공급시기가 속하는 과세기간이 끝난 후 20일 이내에 사업자등록을 신청하면 매입세액 공제가 가능합니다(부가가치세법 §39). 예를 들어 6월 매입분은 상반기 과세기간 종료일(6월 30일)로부터 20일 이내인 7월 20일까지 등록 신청해야 공제받을 수 있습니다. 이 기한을 하루라도 넘기면 매입세액은 영구히 불공제되므로 개업 준비 단계에서 반드시 체크해야 합니다.',
  },
  {
    question: '세금계산서 대신 신용카드매출전표만 받아도 공제되나요?',
    answer:
      '네, 일반과세자에게 사업 관련 지출을 하고 사업용 신용카드나 현금영수증으로 결제했다면 매입세액 공제가 가능합니다. 다만 세금계산서를 받지 않고 일반 간이영수증만 받았다면 부가가치세법 §39에 따라 공제되지 않습니다. 부가세 신고 시 신용카드매출전표 등 수령명세서를 함께 제출해야 하며, 지출증빙 관리는 홈택스 사업용 카드 등록으로 자동화하는 것이 안전합니다.',
  },
  {
    question: '면세사업자도 매입세액 공제를 받을 수 있나요?',
    answer:
      '아니요, 면세사업자는 매입세액 공제를 받을 수 없습니다(부가가치세법 §39). 면세사업(예: 학원·병원·미가공 농수산물 판매)은 부가세를 매출에 부과하지 않으므로, 매입 시 부담한 부가세도 공제 대상이 아닙니다. 과세사업과 면세사업을 겸업하는 사업자는 과세사업 관련 매입분만 안분계산하여 공제받을 수 있으며, 안분 기준은 매출액 비율입니다.',
  },
  {
    question: '토지 관련 매입세액이 왜 불공제인가요?',
    answer:
      '토지의 취득·조성 등 자본적 지출과 관련된 매입세액은 부가가치세법 §39에 따라 불공제됩니다. 토지 자체가 부가가치세 면세 대상이므로 관련 매입세액도 공제되지 않는 것입니다. 다만 토지 위에 신축하는 건물의 매입세액은 별도 판단이 필요하고, 조경·상하수도 등 부수 공사비도 목적에 따라 판정이 달라지므로 대규모 건설 프로젝트는 세무사 상담이 필수입니다.',
  },
  {
    question: '불공제 항목인 걸 모르고 공제받았다가 적발되면 어떻게 되나요?',
    answer:
      '부당공제분은 세무조사 시 과소신고가산세와 납부지연가산세가 추가로 부과됩니다(국세기본법 §47의3, §47의4). 과소신고가산세는 일반과소는 10%, 부정과소는 40%까지 부과되고, 납부지연가산세는 미납액에 일할 이자 성격으로 상당한 부담이 될 수 있습니다. 확신이 없는 매입 건은 부가세 신고 전 홈택스(hometax.go.kr) 상담이나 세무사 검토를 반드시 거치세요.',
  },
];

export default function VatNonDeductibleInputTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부가세 매입세액 불공제 항목 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부가세 매입세액 불공제 항목 2026, 공제 안 되는 매입세액 7가지 완전 정리',
    description:
      '부가가치세법 §39에 따른 매입세액 불공제 7가지 항목 총정리. 접대비, 비영업용 승용차(경차·화물차 예외), 세금계산서 미수취, 사업자등록 전 매입, 면세사업, 토지 관련 매입까지 계산 사례와 함께.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '부가세 매입세액 불공제',
      '매입세액 공제 안되는 항목',
      '접대비 부가세',
      '비영업용 승용차 부가세',
      '부가가치세법 39조',
      '부가세 공제',
      '사업자등록 전 매입세액',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부가세 매입세액 불공제 항목 2026',
    description:
      '부가가치세법 §39에 따른 공제 안 되는 매입세액 7가지 항목과 실제 계산 사례.',
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
                    { name: '부가세 매입세액 불공제 항목 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·법인 · 8분 읽기 · 2026-07-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부가세 매입세액 불공제 항목 2026
                  <br />
                  <span className="text-2xl text-text-secondary">: 공제 안 되는 매입세액 7가지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  카드로 결제하고 세금계산서까지 받았는데 왜 부가세가 공제되지 않는지, 접대비·차량·식비가 헷갈리는 사업자를 위한 가이드입니다. 부가가치세법 §39에 따라 공제받지 못하는 매입세액 7가지를 계산 사례와 함께 정리했습니다. 2026년 7월 부가세 확정신고 시즌 전에 반드시 확인하세요.
                </p>
              </header>

              <AdSlot slot="guide-vat-non-deductible-input-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매입세액 불공제란 무엇인가요?</h2>
                <p>
                  매입세액 불공제는 사업자가 매입 시 부담한 부가가치세를 매출세액에서 차감하지 못하는 것을 말합니다. 부가가치세법 §39는 "공제하지 아니하는 매입세액"이라는 표제로 특정 매입에 대해 세금계산서를 받았더라도 공제 대상에서 제외하도록 정하고 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">불공제의 실질적 의미</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    부가세 신고 공식: 납부세액 = 매출세액 − 매입세액(공제분)
                    <br />
                    · 매입세액 100만원이 공제되면: 부가세 100만원만큼 절감
                    <br />
                    · 매입세액 100만원이 불공제되면: 부가세 100만원을 사업자가 최종 부담
                    <br />
                    즉, 불공제 항목은 부가세 10%가 사업자에게 그대로 전가되는 구조입니다.
                  </p>
                </div>
                <p className="mt-4">
                  다만 불공제 매입세액은 소득세·법인세 신고 시 필요경비(또는 손금)로 인정되는 경우가 많습니다. 즉, 부가세 공제는 못 받아도 종합소득세·법인세에서는 비용 처리가 가능하다는 점을 함께 기억하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 안 되는 항목 7가지는 무엇인가요?</h2>
                <p>
                  부가가치세법 §39에 따라 매입세액 공제가 제한되는 대표 항목은 다음과 같습니다. 이 표 하나만 프린트해서 지출 결의 전 체크리스트로 활용해도 대부분의 실수를 예방할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 매입세액 불공제 7가지 항목 (부가가치세법 §39)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">불공제 항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예외·공제 가능</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1</td>
                        <td className="p-3">세금계산서 미수취·부실기재분</td>
                        <td className="p-3">신용카드매출전표 수령분은 별도 요건 충족 시 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2</td>
                        <td className="p-3">사업과 직접 관련 없는 지출</td>
                        <td className="p-3">개인적 지출·업무무관 지출은 원칙 불공제</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3</td>
                        <td className="p-3">비영업용 소형승용차 구입·임차·유지</td>
                        <td className="p-3">경차·9인승 이상 승합차·화물차·영업용은 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4</td>
                        <td className="p-3">접대비 및 이와 유사한 비용</td>
                        <td className="p-3">일반 회의비·복리후생비는 공제 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5</td>
                        <td className="p-3">면세사업 관련 매입세액</td>
                        <td className="p-3">과세·면세 겸업 시 안분 계산하여 과세분만 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6</td>
                        <td className="p-3">토지 관련 매입세액</td>
                        <td className="p-3">토지 위 건물 신축 매입세액은 별도 판단</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">7</td>
                        <td className="p-3">사업자등록 전 매입세액</td>
                        <td className="p-3">과세기간 종료 후 20일 이내 등록 신청 시 공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외 조항이 많으므로 개별 지출마다 성격을 정확히 판정해야 합니다. 특히 3번 승용차, 4번 접대비, 7번 사업자등록 전 매입은 실무자들이 가장 자주 실수하는 3대 함정이므로 아래 개별 섹션에서 자세히 다룹니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">접대비는 왜 공제가 안 되나요?</h2>
                <p>
                  접대비 매입세액은 사업 관련성이 명백하더라도 부가가치세법 §39에 따라 원천적으로 불공제됩니다. 이는 접대비가 소득 재분배 관점에서 조세정책상 억제 대상으로 분류되기 때문입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례. 접대비 110만원 결제</p>
                  <p className="text-sm text-text-secondary">
                    · 거래처 접대를 위해 식당에서 110만원 카드 결제
                    <br />
                    · 공급가액: 100만원, 부가세: 10만원
                    <br />
                    · 세금계산서를 정상 수취하고 사업용 카드로 결제
                    <br />
                    · 그럼에도 매입세액 10만원은 §39에 따라 <strong>전액 불공제</strong>
                    <br />
                    · 결과: 부가세 확정신고에서 10만원을 차감할 수 없어 <strong>10만원 그대로 사업자가 부담</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">단, 소득세·법인세 신고 시에는 접대비 한도 내에서 필요경비로 인정.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외로 회의비, 복리후생비, 광고선전비는 접대비와 성격이 다르므로 매입세액 공제가 가능합니다. 다만 명목만 회의비이고 실질이 접대라면 세무조사 시 재분류되어 부당공제 문제가 발생할 수 있으니 증빙 관리가 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비영업용 승용차는 전부 불공제인가요?</h2>
                <p>
                  아니요, 예외가 있습니다. 부가가치세법 §39는 비영업용 소형승용차의 구입·임차·유지에 관한 매입세액을 불공제로 규정하지만, 차종에 따라 공제 여부가 명확히 나뉩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 승용차 부가세 매입세액 공제 여부 (부가가치세법 §39)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">차종</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">경차 (1,000cc 이하)</td>
                        <td className="p-3"><strong>공제 가능</strong></td>
                        <td className="p-3">비영업용이라도 공제 허용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">9인승 이상 승합차</td>
                        <td className="p-3"><strong>공제 가능</strong></td>
                        <td className="p-3">차량 크기 기준 예외</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">화물차 (트럭·밴)</td>
                        <td className="p-3"><strong>공제 가능</strong></td>
                        <td className="p-3">사업 수행 목적 차량</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">영업용 (택시·렌터카 등)</td>
                        <td className="p-3"><strong>공제 가능</strong></td>
                        <td className="p-3">운수업 등 영업 목적</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비영업용 승용차 (1,001cc 이상)</td>
                        <td className="p-3">불공제</td>
                        <td className="p-3">구입·임차·유지비 모두 불공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례. 비영업용 승용차 4,400만원 구입</p>
                  <p className="text-sm text-text-secondary">
                    · 사업자가 업무용 명목으로 승용차 구입 (배기량 2,000cc, 비영업용)
                    <br />
                    · 공급가액: 4,000만원, 부가세: 400만원
                    <br />
                    · 매입세액 400만원은 §39에 따라 <strong>전액 불공제</strong>
                    <br />
                    · 이후 주유·수리·보험료 등 유지비의 부가세도 <strong>모두 불공제</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">참고: 같은 4,400만원을 화물밴(적재공간 확보)으로 구입하면 400만원 매입세액 전액 공제 가능.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 공제 가능 차종이라도 실제 사업용으로 사용해야 하며, 개인용 겸용 시 안분 계산이 필요합니다. 차량운행일지 등 증빙을 미리 갖춰두지 않으면 세무조사에서 소명하기 어려우므로 유의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금계산서를 못 받으면 공제 못 받나요?</h2>
                <p>
                  원칙적으로 세금계산서(또는 이에 준하는 적격증빙)를 받지 못한 매입세액은 부가가치세법 §39에 따라 공제되지 않습니다. 다만 신용카드매출전표, 현금영수증(지출증빙용)이 세금계산서를 대체할 수 있는 경우가 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>공제 가능:</strong> 일반과세자로부터 사업 관련 재화·용역을 공급받고 사업용 신용카드로 결제한 뒤 매출전표를 수취한 경우. 부가세 신고 시 "신용카드매출전표 등 수령명세서" 제출 필수.
                  </li>
                  <li>
                    <strong>공제 가능:</strong> 지출증빙용 현금영수증을 발급받은 경우. 소득공제용 현금영수증은 공제 대상 아니므로 반드시 사업자번호로 지출증빙용을 받아야 합니다.
                  </li>
                  <li>
                    <strong>공제 불가:</strong> 일반 간이영수증만 받은 경우, 세금계산서를 발급하지 않는 간이과세자·면세사업자로부터 매입한 경우, 개인간 거래에서 증빙 없이 결제한 경우.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 세금계산서 발급 시기가 지연되어 지연발급된 경우에는 발급 시점의 과세기간 매입세액으로 공제받을 수 있으나, 가산세가 부과됩니다. 매입 즉시 세금계산서를 수취하고 국세청 e세로에서 실시간으로 확인하는 습관이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업자등록 전 매입세액도 공제되나요?</h2>
                <p>
                  네, 조건부로 공제 가능합니다. 부가가치세법 §39는 사업자등록 전 매입세액을 원칙적으로 불공제로 하되, "공급시기가 속하는 과세기간이 끝난 후 20일 이내에 사업자등록을 신청한 경우"에는 예외적으로 공제를 허용합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례. 상반기 매입, 하반기 사업자등록</p>
                  <p className="text-sm text-text-secondary">
                    · 6월 15일: 창업 준비를 위한 기자재 매입 (공급가액 500만원, 부가세 50만원)
                    <br />
                    · 상반기 과세기간: 1월 1일부터 6월 30일까지
                    <br />
                    · 20일 이내 등록 신청 마감일: <strong>7월 20일</strong>
                    <br />
                    <br />
                    <strong>사례 A.</strong> 7월 15일 등록 신청 → 매입세액 50만원 <strong>공제 가능</strong>
                    <br />
                    <strong>사례 B.</strong> 7월 25일 등록 신청 → 매입세액 50만원 <strong>영구 불공제</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">단 5일 차이로 50만원 차이 발생. 창업 준비 단계에서 반드시 캘린더 알람 설정 권장.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외로 사업자등록 신청일이 등록 전 매입세액의 공제 기한을 지났다 하더라도, 등록 후 정상적으로 발생하는 매입세액은 당연히 공제됩니다. 즉, 이 규정은 "등록 이전 지출한 부가세"의 소급 공제 기한에 대한 것임을 정확히 이해해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-vat-non-deductible-input-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">불공제 실수로 인한 가산세, 어떻게 피하나요?</h2>
                <p>
                  불공제 항목을 모르고 매입세액에 포함시켜 부가세를 신고했다가 세무조사에서 적발되면 과소신고가산세와 납부지연가산세가 추가로 부과됩니다(국세기본법 §47의3, §47의4). 부가가치세법 §39는 조항 자체보다 그 해석·판정이 어렵기 때문에 실무 사고가 잦은 영역입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>과소신고가산세:</strong> 일반과소는 부당공제세액의 10%, 부정과소(허위·거짓)는 40%까지 부과.
                  </li>
                  <li>
                    <strong>납부지연가산세:</strong> 미납 부가세에 대해 납부기한 다음 날부터 일할 계산되는 이자 성격의 가산세.
                  </li>
                  <li>
                    <strong>사전 예방책:</strong> 애매한 매입 건은 부가세 신고 전 홈택스(hometax.go.kr) 세법상담이나 관할 세무서 문의로 사전 확인.
                  </li>
                  <li>
                    <strong>사후 구제:</strong> 자체 발견 시 수정신고를 하면 신고불성실가산세가 최대 90%까지 감면되므로 조속히 정정 신고 권장.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 자진 수정신고 시 감면 폭은 신고 시점에 따라 달라지며(6개월 이내 90%, 1년 이내 75% 등), 세무조사 개시 통지 이후에는 감면이 적용되지 않으므로 이상 발견 즉시 조치가 중요합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세자 부가세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반과세 vs 간이과세, 어느 쪽이 유리한지 판단해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-sales-vat-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 매출 부가세 공제</div>
                    <p className="mt-1 text-sm text-text-secondary">신용카드매출전표로 공제받는 방법과 한도를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/july-vat-final-1st-half/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">7월 부가세 확정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">상반기 부가세 확정신고 일정과 준비 서류 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급 신청</div>
                    <p className="mt-1 text-sm text-text-secondary">시설투자·수출로 매입세액이 큰 사업자를 위한 환급 절차.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세와 부가세를 함께 시뮬레이션 해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세·부가세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 매입세액 공제 여부, 불공제 판정, 가산세 산정은 개별 거래의 성격·증빙·사업자 유형에 따라 달라지므로 관할 세무서 또는 세무 전문가에게 반드시 확인하세요. 특히 접대비와 회의비의 경계, 승용차의 사업 사용 안분, 사업자등록 전 매입 등은 판정이 까다로우므로 홈택스(hometax.go.kr) 세법 상담을 권장합니다. 본 콘텐츠는 2026-07-22를 기준으로 작성되었으며, 부가가치세법 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>부가가치세법 §39(공제하지 아니하는 매입세액)</strong>, 국세기본법 §47의3(과소신고가산세)·§47의4(납부지연가산세)입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈페이지</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스(전자신고·상담)</a>.
                </p>
              </section>

              <ShareButtons
                title="부가세 매입세액 불공제 항목 2026 가이드"
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
