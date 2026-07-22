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

const URL = 'https://calculatorhost.com/guide/property-tax-credit-card-payment-2026/';
const DATE_PUBLISHED = '2026-07-22';
const DATE_MODIFIED = '2026-07-22';

export const metadata: Metadata = {
  title: '재산세 신용카드 납부 2026, 수수료 0원·무이자 할부 챙기는 법',
  description:
    '재산세를 신용카드로 내면 수수료 없이 무이자 할부와 체크카드 캐시백까지 챙길 수 있습니다. 위택스·지자체앱 결제 절차, 카드사별 혜택 확인법, 7월·9월 납기까지 정리.',
  keywords: [
    '재산세 카드납부',
    '재산세 신용카드 무이자',
    '재산세 카드 수수료',
    '재산세 위택스 납부',
    '지방세 카드납부',
    '재산세 납기 2026',
    '지방세징수법 23조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '재산세 신용카드 납부 2026, 수수료 0원·무이자 할부 챙기는 법',
      },
    ],
    title: '재산세 신용카드 납부 2026, 수수료 0원·무이자 할부 챙기는 법',
    description:
      '지방세인 재산세는 카드 납부 수수료가 0원. 위택스·지자체앱·ARS 결제 절차와 카드사별 무이자·캐시백 이벤트 확인법까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산세 신용카드 납부 2026, 수수료 0원·무이자 할부',
    description:
      '지방세 재산세는 카드 수수료 없음. 무이자 할부·캐시백은 카드사·시즌마다 다르므로 반드시 확인하세요.',
  },
};

const FAQ_ITEMS = [
  {
    question: '재산세를 신용카드로 내면 수수료가 붙나요?',
    answer:
      '아니요, 지방세인 재산세는 신용카드 납부 수수료가 0원입니다(지방세징수법 §23 신용카드등에 의한 지방세 납부). 국세(소득세·법인세·부가세)는 납세자가 카드 수수료를 부담하지만, 지방세는 카드사가 부담하는 구조라 납세자에게는 청구되지 않습니다. 위택스, 서울시 이택스, 각 지자체 앱, ARS 모두 동일합니다.',
  },
  {
    question: '재산세 카드 납부는 어디서 하나요?',
    answer:
      '전국 지방세는 위택스(wetax.go.kr)에서 결제할 수 있고, 서울시는 이택스(etax.seoul.go.kr) 또는 서울시 STAX 앱을 사용합니다. 그 외 지자체는 "스마트 위택스" 앱, ARS(지역번호 없이 지자체 세정과), 시중은행 인터넷뱅킹의 지방세 메뉴에서도 카드 결제가 가능합니다. 고지서에 인쇄된 전자납부번호만 있으면 어디서든 납부됩니다.',
  },
  {
    question: '재산세 카드 무이자 할부는 몇 개월까지 되나요?',
    answer:
      '카드사와 이벤트 기간에 따라 다릅니다. 통상 재산세 납기(7월·9월)에는 주요 카드사들이 2~7개월 무이자 또는 6~12개월 부분무이자 이벤트를 진행하지만, 매년 조건이 달라지고 카드 종류·사전응모 여부에 따라 실제 적용되는 개월수가 다릅니다. 결제 전에 반드시 카드사 앱의 이벤트 페이지에서 재산세·지방세 항목을 확인하세요.',
  },
  {
    question: '체크카드로 재산세를 내면 캐시백이 있나요?',
    answer:
      '일부 카드사에서 체크카드로 지방세를 납부할 때 소액 캐시백(예: 결제 금액의 일정 %) 이벤트를 진행합니다. 다만 캐시백 비율, 최대 한도, 사전응모 여부는 카드사와 시즌마다 다르므로 특정 수치를 기대하지 말고 결제 직전에 각 카드사 홈페이지·앱에서 확인해야 합니다. 사전응모를 놓치면 혜택이 적용되지 않는 경우가 많습니다.',
  },
  {
    question: '재산세 납기는 언제인가요?',
    answer:
      '주택분 재산세는 1기 7월 16일~7월 31일, 2기 9월 16일~9월 30일에 절반씩 나눠 부과됩니다(지방세법 §114). 다만 주택 세액이 20만원 이하이면 7월에 전액 일괄 부과될 수 있습니다. 토지분은 9월 16일~9월 30일, 건축물분은 7월 16일~7월 31일에 납부합니다.',
  },
  {
    question: '카드 무이자 할부로 나눠 내면 이자가 정말 0원인가요?',
    answer:
      '완전 무이자 개월수 안에서 납부하면 이자가 붙지 않습니다. 다만 "부분무이자"는 앞의 몇 회차 수수료를 카드사가 대신 내주고, 이후 회차는 고객이 부담하는 방식이므로 실제로 이자·수수료가 발생합니다. 결제 창에서 "완전무이자"인지 "부분무이자"인지 표기를 반드시 확인하세요.',
  },
  {
    question: '재산세를 카드 할부로 냈다가 중도해지·환불되면 어떻게 되나요?',
    answer:
      '이미 결제한 재산세 자체가 취소되지 않는 한 카드 할부는 유지됩니다. 만약 이의신청·환급 등으로 세액이 조정되면 위택스에서 환급 절차를 진행하고, 카드 결제분은 카드사를 통해 개별 취소·재승인이 이뤄집니다. 절차가 복잡할 수 있으므로 큰 금액을 할부로 낼 때는 세액 확정 여부를 먼저 확인하는 것이 안전합니다.',
  },
  {
    question: '재산세 250만원 넘으면 카드 할부 대신 분납이 나은가요?',
    answer:
      '재산세 본세가 250만원을 초과하면 분할납부(분납)를 신청할 수 있으며, 기한(2개월) 내 납부 시 가산금이 붙지 않습니다(지방세법 §118). 카드 할부는 카드사 이벤트 조건에 따라 이자가 발생할 수도 있는 반면, 분납은 무이자입니다. 다만 카드 무이자 할부 이벤트가 있고 개월수가 충분하다면 두 방법을 병행할 수도 있습니다. 상세는 관련 분납 가이드에서 비교하세요.',
  },
];

export default function PropertyTaxCreditCardPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 신용카드 납부 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 신용카드 납부 2026, 수수료 0원·무이자 할부 챙기는 법',
    description:
      '지방세 재산세는 카드 수수료가 없습니다. 위택스·지자체앱·ARS 결제 절차, 카드사별 무이자 할부와 체크카드 캐시백 이벤트 확인법, 7월·9월 납기와 함정까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세', '카드납부', '무이자 할부', '지방세', '위택스', '체크카드 캐시백'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 신용카드 납부 2026, 수수료 0원·무이자 할부 챙기는 법',
    description:
      '재산세 카드 납부의 수수료·무이자 할부·캐시백을 정확히 이해하고, 위택스·지자체앱 절차와 카드사별 이벤트 확인법을 정리한 2026년 가이드.',
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
                    { name: '재산세 신용카드 납부 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 소유자 · 8분 읽기 · 2026-07-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 신용카드 납부 2026
                  <br />
                  <span className="text-2xl text-text-secondary">수수료 0원·무이자 할부 챙기는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  재산세 고지서가 도착하면 가장 먼저 궁금한 것이 “카드로 내면 수수료가 붙나?”, “무이자 할부는 되나?”, “어느 카드가 이득이지?” 세 가지입니다. 결론부터 말하면 지방세인 재산세는 카드 납부 수수료가 0원이고, 무이자 할부·캐시백은 카드사·시즌마다 달라 반드시 결제 직전에 확인해야 합니다. 이 가이드는 위택스·지자체앱 결제 절차, 카드사별 혜택 비교 방법, 7월·9월 납기까지 한 번에 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-credit-card-payment-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 재산세를 카드로 내면 수수료가 붙나요?</h2>
                <p>
                  붙지 않습니다. 지방세인 재산세는 신용카드 납부 수수료가 0원입니다(지방세징수법 §23 신용카드등에 의한 지방세 납부). 카드사가 결제 수수료를 부담하는 구조라 납세자에게는 별도 청구가 없습니다.
                </p>
                <p>
                  반면 국세(소득세·법인세·부가가치세·양도소득세·종합부동산세 등)는 카드 납부 시 납세자가 수수료를 직접 부담합니다. 두 세목의 수수료 정책이 정반대이므로 혼동하지 않도록 아래 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 국세 vs 지방세 카드 납부 수수료 비교 (2026 기준)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세목 구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">카드 수수료</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대표 세목</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>지방세</strong></td>
                        <td className="p-3"><strong>0원 (납세자 부담 없음)</strong></td>
                        <td className="p-3">재산세, 자동차세, 취득세, 지방소득세, 주민세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">국세</td>
                        <td className="p-3">있음 (신용카드 약 0.8%, 체크카드 약 0.5%)</td>
                        <td className="p-3">종합소득세, 법인세, 부가가치세, 양도소득세, 종부세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 카드사가 자체적으로 “카드 결제 수수료 이벤트”, “포인트 차감” 같은 별도 조건을 걸 수는 있으므로 결제 화면에서 최종 청구 금액이 고지서 금액과 정확히 일치하는지 한 번 더 확인하세요. 국세인 종부세를 카드로 낼 때는 반대로 수수료 0.8%가 붙으니 착각하지 않도록 주의합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 재산세 카드 납부, 어디서 어떻게 하나요?</h2>
                <p>
                  전국 어느 지자체의 지방세든 위택스에서 결제할 수 있습니다. 서울시는 별도의 이택스를 사용하며, 지역 앱과 은행 인터넷뱅킹으로도 결제가 가능합니다. 각 경로별 절차는 아래와 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">경로 1. 위택스(wetax.go.kr) 웹·앱</p>
                  <p className="text-sm text-text-secondary">
                    1) 위택스 로그인(공동인증서·간편인증·카카오)
                    <br />
                    2) “납부하기” → “지방세” 선택
                    <br />
                    3) 전자납부번호 또는 주민등록번호로 조회
                    <br />
                    4) 재산세 항목 확인 후 카드 정보 입력, 할부 개월수 선택
                    <br />
                    5) 결제 완료 후 영수증 저장
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">경로 2. 서울시 이택스(etax.seoul.go.kr) 또는 STAX 앱</p>
                  <p className="text-sm text-text-secondary">
                    서울 소재 주택 재산세는 이택스에서 결제하는 것이 안내가 명확합니다. 로그인 후 “조회·납부” → “재산세” → 카드 선택, 이후 절차는 위택스와 동일합니다. 모바일은 STAX 앱을 사용하면 지문·안면 인증으로 빠르게 결제할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">경로 3. ARS·은행 인터넷뱅킹·편의점</p>
                  <p className="text-sm text-text-secondary">
                    ARS는 지자체 세정과에 전화 후 안내에 따라 전자납부번호를 입력합니다. 시중은행 인터넷뱅킹의 “지방세 납부” 메뉴에서도 카드 결제가 가능하며, 편의점은 현금·체크카드 중심이라 신용카드 할부는 제한될 수 있으니 카드 결제는 온라인이 권장됩니다.
                  </p>
                </div>
                <p className="mt-4">
                  다만 예외로 일부 지자체는 위택스 대신 자체 앱(예: 경기 “한꺼번이”, 인천 “인천 지방세” 등)을 우선 안내하기도 합니다. 고지서 하단의 결제 안내 문구를 확인해 지정된 경로가 있으면 그쪽을 사용하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 재산세 무이자 할부가 되나요?</h2>
                <p>
                  됩니다. 다만 몇 개월 무이자인지, 어느 카드가 가능한지는 매년·매월 카드사 이벤트마다 달라집니다. 통상 7월·9월 재산세 시즌에는 주요 카드사들이 지방세 프로모션을 진행하지만, 특정 개월수를 확정 사실로 제시할 수 없으니 결제 직전 카드사 앱·홈페이지에서 반드시 확인해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 2. 카드사별 재산세 무이자·부분무이자 이벤트 확인 방법 (수시 변동)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">카드사(예시)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">확인 경로</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주의</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신한·KB국민·삼성·현대·롯데·하나·우리·NH·비씨 등</td>
                        <td className="p-3">각 카드사 앱 “이벤트/혜택” → “세금·공과금” 또는 “지방세” 검색</td>
                        <td className="p-3">개월수·조건은 매년 변동. 사전응모 필수인 경우 있음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">체크카드(각 카드사)</td>
                        <td className="p-3">동일 앱의 “체크카드 캐시백” 카테고리 확인</td>
                        <td className="p-3">캐시백 비율·최대 한도는 수시 변동</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 표에 나열된 카드사명은 예시이며, 특정 카드사가 특정 시즌에 무조건 무이자를 제공한다는 뜻이 아닙니다. 카드사 혜택은 시즌·상품·회원 등급마다 다르므로 결제 화면에 표시된 실제 개월수와 조건을 최종 기준으로 삼으세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 카드사별 혜택은 어떻게 비교하나요?</h2>
                <p>
                  가장 정확한 비교 순서는 “카드사 앱 이벤트 확인 → 무이자 개월수·부분무이자 여부·사전응모 필요 여부 확인 → 세액 대비 월 부담액 계산”입니다. 3단계를 지키면 대체로 손해가 없습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>완전무이자 개월수 확인:</strong> 예를 들어 재산세 60만원을 3개월 완전무이자로 결제하면 월 20만원씩 부담해 이자 없이 분납 효과를 얻습니다. 다만 이 개월수가 시즌마다 다르므로 카드사 앱에서 확인이 우선입니다.
                  </li>
                  <li>
                    <strong>부분무이자 함정:</strong> “6개월 부분무이자, 1~2회 카드사 부담, 3~6회 고객 부담” 같은 형태이면 실제 이자가 발생합니다. 완전무이자와 반드시 구분하세요.
                  </li>
                  <li>
                    <strong>사전응모 여부:</strong> 응모하지 않으면 캐시백이나 무이자가 적용되지 않는 경우가 흔합니다. 결제 3~5일 전 카드사 앱에서 “세금 이벤트 응모”를 먼저 완료해야 안전합니다.
                  </li>
                  <li>
                    <strong>세액 대비 월 부담액 계산:</strong> 큰 금액을 12개월로 나누면 월 부담은 줄지만 카드 한도 관리가 필요합니다. 세액과 카드 한도를 함께 고려하세요.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 카드사별 혜택 정보를 모아둔 “카드고릴라”, “카드슈퍼마켓” 같은 비교 사이트는 참고용으로만 활용하고, 최종 개월수와 조건은 반드시 카드사 공식 앱에서 재확인하세요. 광고성 링크와 실제 이벤트 조건이 다를 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-property-tax-credit-card-payment-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 체크카드 캐시백은 얼마인가요?</h2>
                <p>
                  카드사와 시즌마다 다르며, 통상 결제 금액의 소액 비율(예: 0.1~0.2% 수준) 캐시백이 시즌별로 진행됩니다. 특정 비율을 확정 사실로 기대하기보다는, 결제 직전 카드사 앱에서 정확한 조건과 최대 한도, 사전응모 여부를 확인하는 것이 안전합니다.
                </p>
                <p>
                  체크카드 캐시백은 신용카드 무이자 할부와 겹치지 않을 때가 많습니다. 즉, “현금 흐름을 나누는 것이 우선이면 신용카드 무이자, 소액 리워드가 목적이면 체크카드 캐시백”으로 성격을 나눠 선택하는 것이 합리적입니다.
                </p>
                <p className="mt-4">
                  다만 캐시백은 결제 후 익월·익익월에 지급되는 경우가 대부분이며, 응모 조건 미충족·최소 결제액 미달 시 지급이 취소될 수 있습니다. 캐시백 지급 조건을 결제 전에 캡처해두면 이후 문의할 때 유용합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 재산세 납기는 언제인가요?</h2>
                <p>
                  주택분 재산세는 세액을 절반씩 나눠 7월과 9월 두 차례 납부합니다(지방세법 §114). 카드 이벤트를 활용하려면 이 일정에 맞춰 사전응모·결제 계획을 세우는 것이 좋습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 3. 재산세 납기 (지방세법 §114, 2026 기준)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주택 1기</td>
                        <td className="p-3"><strong>7월 16일 ~ 7월 31일</strong></td>
                        <td className="p-3">주택 세액의 1/2</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주택 2기</td>
                        <td className="p-3"><strong>9월 16일 ~ 9월 30일</strong></td>
                        <td className="p-3">주택 세액의 나머지 1/2</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">건축물</td>
                        <td className="p-3">7월 16일 ~ 7월 31일</td>
                        <td className="p-3">일괄 납부</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">토지</td>
                        <td className="p-3">9월 16일 ~ 9월 30일</td>
                        <td className="p-3">일괄 납부</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주택 세액 20만원 이하</td>
                        <td className="p-3">7월 16일 ~ 7월 31일</td>
                        <td className="p-3">7월 전액 일괄 부과 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 납기 마지막 날이 주말·공휴일이면 익영업일까지 자동 연장됩니다(국세기본법 §5 준용). 위택스·이택스는 자정까지 결제가 가능하지만 은행 이체 계좌를 카드사와 연결한 경우 이체 영업일에 유의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">카드 납부 시 함정과 주의사항</h2>
                <p>
                  수수료가 0원이라고 해서 무조건 카드가 정답은 아닙니다. 아래 함정을 알고 있어야 실제 이자·수수료로 새는 돈이 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">함정 1. 부분무이자를 완전무이자로 착각</p>
                  <p className="text-sm text-text-secondary">
                    결제 화면에서 “6개월(부분)”, “12개월(부분)” 표기를 놓치면 뒤 회차 수수료가 붙습니다. 반드시 “완전무이자” 표기만 선택하세요. 개월수가 짧더라도 완전무이자가 유리한 경우가 많습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">함정 2. 사전응모 미완료</p>
                  <p className="text-sm text-text-secondary">
                    상당수 카드사는 “세금 이벤트 응모”를 마쳐야 무이자·캐시백을 적용합니다. 응모하지 않고 결제하면 혜택이 없어지므로, 결제 3~5일 전 응모부터 완료하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">함정 3. 카드 한도 초과로 결제 실패</p>
                  <p className="text-sm text-text-secondary">
                    재산세가 수백만원이면 개별 카드 한도를 초과할 수 있습니다. 결제 실패로 납부 지연이 생기면 가산금이 붙을 수 있으니, 큰 세액은 카드 한도를 미리 확인하거나 2장 이상의 카드로 분할하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">함정 4. 250만원 초과 시 분납과 비교 없이 카드 할부 선택</p>
                  <p className="text-sm text-text-secondary">
                    재산세 본세가 250만원을 초과하면 지방세법 §118에 따라 분할납부(2개월 내, 무이자)가 가능합니다. 카드 무이자 할부가 짧다면 분납이 더 유리할 수 있으니 두 방법을 비교한 뒤 결정하세요.
                    상세 비교는 아래 <Link href="/guide/property-tax-installment-payment-2026/" className="text-primary-500 underline">재산세 분할납부 가이드</Link>를 참고하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">함정 5. 국세와 지방세 혼동</p>
                  <p className="text-sm text-text-secondary">
                    같은 카드로 종합부동산세(국세)를 낼 때는 수수료 0.8%가 붙습니다. 재산세(지방세)와 종부세(국세)는 세목이 다르므로 카드 결제 비용이 다릅니다. 결제 전 세목 구분을 반드시 확인하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간단 시뮬레이션 세 가지</h2>
                <p>
                  실제 금액으로 카드 납부의 효과를 상상해보면 판단이 쉬워집니다. 아래 사례는 카드사 조건이 성립한다는 가정 하의 예시이며, 실제 개월수·이자·캐시백은 결제 직전 확인이 필요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 재산세 60만원, 3개월 완전무이자</p>
                  <p className="text-sm text-text-secondary">
                    · 카드 결제 금액: 60만원(수수료 0원)
                    <br />
                    · 월 부담액: 60만원 ÷ 3 = <strong>20만원</strong>
                    <br />
                    · 총 이자: 0원
                    <br />
                    · 효과: 한 번에 60만원을 내지 않고 3개월에 걸쳐 나눠 낼 수 있어 현금 흐름 관리에 유리
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 재산세 120만원, 체크카드 결제</p>
                  <p className="text-sm text-text-secondary">
                    · 카드 결제 금액: 120만원(수수료 0원)
                    <br />
                    · 캐시백(예시 가정 0.1%): 약 1,200원
                    <br />
                    · 총 이자: 0원(체크카드는 할부 불가)
                    <br />
                    · 효과: 소액 리워드 확보. 다만 캐시백 비율·한도는 카드사 조건에 따라 다름
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 3. 재산세 300만원, 카드 할부 vs 분납 비교</p>
                  <p className="text-sm text-text-secondary">
                    · 카드 6개월 완전무이자 가정 → 월 50만원, 총 이자 0원
                    <br />
                    · 카드 12개월 부분무이자(3~12회 유이자) 가정 → 뒤 회차 이자 발생
                    <br />
                    · 분납(지방세법 §118, 2개월 내) → 무이자 분할 가능(250만원 초과 시)
                    <br />
                    · 판단: 카드 6개월 완전무이자와 분납 2회는 각각 장단점이 있으므로, 카드 한도·현금 흐름·이자 여부를 함께 고려
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 사례의 “완전무이자 3개월/6개월”, “캐시백 0.1%”는 특정 시점의 예시 가정입니다. 실제 결제 시점의 카드사 앱 조건을 최종 기준으로 삼으세요.
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
                    <p className="mt-1 text-sm text-text-secondary">공시가·주택 유형별로 예상 세액을 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-july-payment-schedule-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 7월 납부 일정</div>
                    <p className="mt-1 text-sm text-text-secondary">1기 납기와 사전 준비, 위택스 조회 절차를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-installment-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 분할납부(분납)</div>
                    <p className="mt-1 text-sm text-text-secondary">250만원 초과 시 무이자 분납 조건과 신청 방법.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율·과세표준·누진공제의 기본을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-tax-card-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차세 카드 납부·연납 할인</div>
                    <p className="mt-1 text-sm text-text-secondary">지방세 카드 납부의 또 다른 활용, 1월 연납 5% 공제.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세·상속세 한눈에.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무·재무 조언이 아닙니다. 카드사별 무이자 할부 개월수, 부분무이자 조건, 체크카드 캐시백 비율·한도, 사전응모 여부는 매년·매월 카드사 이벤트마다 변동되므로, 반드시 결제 직전에 각 카드사 앱·홈페이지와 위택스(또는 지자체 이택스)에서 최신 조건을 확인하세요. 본 콘텐츠는 2026-07-22 기준이며, 관련 법령·이벤트 정책 변경 시 업데이트됩니다. 재산세 카드 납부 근거는 <strong>지방세징수법 §23(신용카드등에 의한 지방세 납부)</strong>, 납기 근거는 <strong>지방세법 §114(재산세 납기)</strong>, 분할납부 근거는 <strong>지방세법 §118</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://etax.seoul.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">서울시 이택스</a>.
                </p>
              </section>

              <ShareButtons title="재산세 신용카드 납부 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
