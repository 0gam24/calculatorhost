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

const URL = 'https://calculatorhost.com/guide/resident-tax-individual-portion-2026/';
const DATE_PUBLISHED = '2026-07-28';
const DATE_MODIFIED = '2026-07-28';

export const metadata: Metadata = {
  title: '주민세 개인분 2026, 8월 납부기간과 세액 안 왔을 때 확인법',
  description:
    '주민세 개인분 정기분 납부기간은 2026년 8월 16일부터 31일까지입니다. 세액은 지자체 조례로 1만원 이하이며, 고지서가 안 왔을 때 위택스 조회·납부 방법과 면제 대상까지 지방세법 기준으로 정리했습니다.',
  keywords: [
    '주민세 개인분',
    '주민세 납부기간 8월',
    '주민세 고지서 안왔을때',
    '주민세 세액',
    '주민세 위택스 납부',
    '지방세법 74조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '주민세 개인분 2026, 8월 납부기간과 세액 안 왔을 때 확인법',
      },
    ],
    title: '주민세 개인분 2026, 8월 16~31일 납부 총정리',
    description:
      '주민세 개인분은 8월 16일부터 31일까지 납부하며, 지자체 조례로 1만원 이하 정액입니다. 위택스 조회, 고지서 재발급, 면제 대상을 한 번에 확인하세요.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주민세 개인분 2026, 8월 납부기간과 확인법',
    description:
      '납부기간 2026년 8월 16~31일. 세액은 지자체 조례로 1만원 이하. 위택스 조회·면제 대상까지 지방세법 §74·§78 기준 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '주민세 개인분 납부기간은 언제인가요?',
    answer:
      '2026년 8월 16일부터 8월 31일까지입니다. 매년 7월 1일 현재 주소를 둔 지자체에서 부과하며, 8월 초에 고지서가 발송됩니다. 기간 내 미납 시 3% 가산금이 부과되므로 위택스(wetax.go.kr)나 은행 CD·ATM에서 기한 내 납부해야 합니다.',
  },
  {
    question: '주민세 개인분 세액은 얼마인가요?',
    answer:
      '조례에 따라 1만원 이하입니다. 지방세법 §78은 개인분 주민세를 지방자치단체 조례로 정하는 1만원 이하 금액으로 부과하도록 규정하며, 서울·경기·부산 등 지역마다 실제 세액이 다릅니다. 정확한 금액은 위택스 또는 관할 시·군·구청 세무과에서 확인할 수 있습니다.',
  },
  {
    question: '주민세 고지서가 안 왔는데 어떻게 확인하나요?',
    answer:
      '위택스에서 조회할 수 있습니다. wetax.go.kr에 접속해 공동인증서로 로그인한 뒤 지방세 조회납부 메뉴에서 고지 내역을 확인하고 바로 납부할 수 있습니다. 카카오페이·네이버페이 앱의 내 세금 조회 기능이나 관할 시·군·구청 세무과 전화 문의로도 재발급이 가능합니다.',
  },
  {
    question: '주민세 개인분 면제 대상은 누구인가요?',
    answer:
      '기초생활수급자 등이 면제 대상입니다. 지방세법과 지자체 조례에 따라 국민기초생활보장법상 수급자, 미성년자, 외국인등록일 1년 미만 등이 면제될 수 있습니다. 다만 구체적 대상과 절차는 관할 지자체 조례로 정해지므로 시·군·구청 세무과에 반드시 확인해야 합니다.',
  },
  {
    question: '이사했는데 주민세는 어디에 내야 하나요?',
    answer:
      '7월 1일 기준 주소지에 냅니다. 지방세법 §75는 매년 7월 1일 현재 주소가 등록된 지자체에서 부과한다고 규정합니다. 7월 2일 이후 이사해도 그해 주민세 개인분은 이전 주소지 지자체에 납부하며, 다음 해부터 새 주소지 지자체에서 부과됩니다.',
  },
  {
    question: '주민세 개인분에 지방교육세도 붙나요?',
    answer:
      '네, 함께 부과될 수 있습니다. 지방세법 §150은 주민세 개인분을 지방교육세 과세대상으로 규정하며, 고지서에 본세와 부가세목이 합산 표기됩니다. 구체적 부가세율은 지자체별로 다를 수 있으므로 위택스 고지서의 최종 합산액을 확인하세요.',
  },
  {
    question: '개인분과 사업소분의 차이가 뭔가요?',
    answer:
      '개인분은 세대주, 사업소분은 사업주 대상입니다. 개인분은 7월 1일 주소지의 세대주 개인에게 부과되고, 사업소분은 사업장을 둔 법인·개인사업자에게 부과됩니다. 사업소분은 8월 1일부터 8월 31일까지 신고납부 방식이며, 개인분과는 별개 세목으로 취급됩니다.',
  },
  {
    question: '주민세 개인분을 안 내면 어떻게 되나요?',
    answer:
      '3% 가산금이 부과됩니다. 지방세기본법에 따라 납부기한 내 미납 시 즉시 3% 가산금이 붙고, 이후 매월 중가산금이 최대 60개월까지 추가될 수 있습니다. 장기 체납 시 재산 압류 등 강제징수 대상이 될 수 있으므로 8월 말 이전에 반드시 납부하세요.',
  },
];

export default function ResidentTaxIndividualPortion2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주민세 개인분 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주민세 개인분 2026, 8월 납부기간과 세액 안 왔을 때 확인법',
    description:
      '주민세 개인분 정기분 납부기간(8월 16~31일), 지자체 조례별 세액(1만원 이하), 고지서 미수령 시 위택스 조회·납부, 면제 대상, 사업소분과의 차이를 지방세법 §74·§75·§78 기준으로 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주민세 개인분', '납부기간', '위택스', '고지서 재발급', '지방세법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주민세 개인분 2026, 8월 납부기간과 확인법',
    description:
      '2026년 주민세 개인분 납부기간과 세액, 고지서 미수령 시 위택스 조회 방법을 지방세법 기준으로 정리한 가이드.',
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
                    { name: '주민세 개인분 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">납세자 · 7분 읽기 · 2026-07-28</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주민세 개인분 2026
                  <br />
                  <span className="text-2xl text-text-secondary">, 8월 납부기간과 확인법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  8월이 되면 우편함이나 위택스 알림으로 주민세 개인분 고지서가 도착합니다. 매년 7월 1일 기준 주소지 지자체가 세대주 개인에게 부과하는 정액 세금인데, 세액은 지자체 조례에 따라 1만원 이하로 다르고, 납부기간은 8월 16일부터 31일까지로 짧습니다. 이 가이드는 고지서가 안 왔을 때 확인하는 절차, 위택스 납부 방법, 면제 대상, 사업소분과의 차이까지 지방세법 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주민세 개인분이란 무엇인가</h2>
                <p>
                  주민세 개인분은 매년 7월 1일 현재 지방자치단체에 주소를 둔 세대주 개인에게 부과되는 지방세입니다. 지방세법 §74에 정의된 주민세는 개인분, 사업소분, 종업원분 세 가지 세목으로 나뉘며, 이 중 개인분은 소득·재산과 무관하게 균등한 정액으로 부과된다는 점이 특징입니다. 납세의무자는 지방세법 §75에 따라 7월 1일 기준 주소지의 세대주로 확정됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">주민세 개인분 핵심 요약</p>
                  <div className="mt-2 text-sm text-text-secondary space-y-1">
                    <p>· 과세기준일: 매년 7월 1일 (지방세법 §75)</p>
                    <p>· 납세의무자: 지자체에 주소를 둔 세대주</p>
                    <p>· 세율: 지자체 조례로 정하는 1만원 이하 정액 (지방세법 §78)</p>
                    <p>· 납부기간: 2026년 8월 16일부터 8월 31일까지</p>
                    <p>· 납부처: 위택스(wetax.go.kr) 또는 은행 CD·ATM, 지자체 세무과</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 지자체별 주민세 개인분 세액 수준 예시 (2026 기준, 조례에 따라 상이)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지역 예시</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세액 수준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">확인 방법</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">서울시 각 자치구</td>
                        <td className="p-3">약 6,000원 안팎</td>
                        <td className="p-3">위택스 또는 이택스</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부산·대구 등 광역시</td>
                        <td className="p-3">약 4,500~8,000원 수준</td>
                        <td className="p-3">위택스</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">경기·강원 등 도 단위</td>
                        <td className="p-3">시·군 조례에 따라 상이</td>
                        <td className="p-3">위택스 또는 시·군청</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 위 세액은 지자체 조례 개정 시 변경될 수 있는 참고값이며, 정확한 금액은 반드시 위택스 조회로 확인해야 합니다. 지방세법 §78이 정한 상한(1만원)과 지방교육세 등 부가세목이 합산되어 최종 고지되므로, 고지서 총액이 본세와 다를 수 있다는 점도 유념하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주민세 개인분 납부기간은 언제인가요?</h2>
                <p>
                  2026년 주민세 개인분 정기분 납부기간은 8월 16일부터 8월 31일까지 16일간입니다. 행정안전부는 매년 8월을 주민세 신고·납부의 달로 지정하여 개인분 정기분과 사업소분 신고를 동시에 안내합니다. 개인분 고지서는 통상 8월 초·중순에 우편으로 발송되며, 위택스 알림톡·SMS로도 통지됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2026년 8월 주민세 일정</p>
                  <p className="text-sm text-text-secondary">
                    · 8월 초·중순: 개인분 고지서 발송, 위택스에 조회 등록
                    <br />
                    · 8월 16일: 개인분 정기분 납부 시작
                    <br />
                    · 8월 31일: 개인분 정기분 납부기한, 사업소분 신고납부 기한
                    <br />
                    · 9월 1일 이후: 미납 시 즉시 3% 가산금 부과
                  </p>
                </div>
                <p className="mt-4">
                  개인분은 신고 절차가 필요 없는 부과 세목이므로, 고지서를 받은 뒤 기한 내 납부만 하면 끝납니다. 위택스에서 자동납부를 등록하면 매년 8월에 지정 계좌에서 자동 출금되어 미납 걱정을 덜 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 8월 31일이 토요일이나 일요일이면 다음 평일까지 기한이 자동 연장됩니다. 2026년 8월 31일은 월요일이므로 이 특례 없이 당일 자정까지 납부를 완료해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주민세 개인분 세액은 얼마인가요?</h2>
                <p>
                  주민세 개인분 세액은 지방세법 §78에 따라 지자체 조례로 정하는 1만원 이하 금액입니다. 소득이나 재산 규모와 무관하게 세대주 1인당 동일하게 부과되는 균등 정액이라는 점이 재산세·소득세와의 큰 차이입니다. 실제 세액은 지역마다 다르며, 통상 4,500원에서 1만원 사이에서 조례로 결정됩니다.
                </p>
                <p className="mt-4">
                  본세에 지방교육세가 별도로 부과될 수 있습니다. 지방세법 §150에 따라 주민세 개인분은 지방교육세 과세대상으로 규정되어 있으며, 고지서에 본세와 지방교육세가 합산 표기됩니다. 정확한 부가세율과 최종 합산액은 위택스 고지서에서 확인하세요.
                </p>
                <p className="mt-4">
                  다만 지자체 조례가 개정되면 세액이 조정될 수 있습니다. 특정 지역의 세액을 단정하기보다 위택스에서 자신의 주소지 세액을 직접 조회하는 것이 가장 정확한 방법입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">고지서가 안 왔을 때 확인·납부 방법</h2>
                <p>
                  주민세 개인분 고지서가 8월 중순까지 도착하지 않았다면 우편 분실이거나 주소지 변경 미반영일 가능성이 큽니다. 위택스에서는 실시간으로 부과 내역을 조회할 수 있으므로 고지서 없이도 정상 납부가 가능합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 위택스 온라인 조회·납부 (5분)</p>
                  <p className="text-sm text-text-secondary">
                    1단계: wetax.go.kr 접속 후 공동인증서·간편인증으로 로그인
                    <br />
                    2단계: 상단 지방세 메뉴에서 조회납부 선택
                    <br />
                    3단계: 세목을 주민세 개인분으로 지정하고 조회
                    <br />
                    4단계: 부과된 세액 확인 후 계좌이체·카드·간편결제로 납부
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 카카오페이·네이버페이 앱 QR 조회</p>
                  <p className="text-sm text-text-secondary">
                    카카오페이의 내 세금 조회, 네이버페이의 세금·과태료 메뉴에서 본인인증 후 부과 내역이 자동으로 표시됩니다. 별도 인증서 없이 지문·PIN으로 열람할 수 있어 가장 빠릅니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 3. 관할 시·군·구청 세무과 문의·재발급</p>
                  <p className="text-sm text-text-secondary">
                    전화로 관할 지자체 세무과에 신원 확인 후 팩스·이메일·우편으로 고지서를 재발급 받거나, 방문 시 즉시 발급받아 창구에서 바로 납부할 수 있습니다.
                  </p>
                </div>
                <p className="mt-4">
                  다만 위택스에서도 부과 내역이 조회되지 않는다면 주소지 변경 미반영이거나 7월 1일 기준 세대주 등록에 문제가 있을 수 있습니다. 이 경우 즉시 관할 지자체 세무과에 확인하여 8월 31일 기한 내 정상 납부할 수 있도록 조치해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주민세 개인분 면제·감면 대상</h2>
                <p>
                  주민세 개인분은 소득·재산에 무관한 균등 정액 세금이지만, 지방세법과 지자체 조례에 따라 일부 대상에 대해서는 면제·감면이 이루어집니다. 대표적 면제 사유는 아래와 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>국민기초생활보장법상 수급자:</strong> 생계·의료·주거·교육 급여 수급자로 확인되면 지자체 조례에 따라 면제될 수 있습니다.
                  </li>
                  <li>
                    <strong>미성년자:</strong> 과세기준일(7월 1일) 현재 만 19세 미만인 세대주는 원칙적으로 부과 대상에서 제외됩니다.
                  </li>
                  <li>
                    <strong>외국인등록 1년 미만자:</strong> 지방세법 시행령에 따라 국내 체류가 짧은 외국인 세대주는 부과되지 않을 수 있습니다.
                  </li>
                  <li>
                    <strong>주한 외교관·주둔군 등:</strong> 국제 조약과 지방세법 특례에 따라 과세 대상에서 제외됩니다.
                  </li>
                  <li>
                    <strong>지자체 특별 감면 대상:</strong> 지자체 조례로 정하는 다자녀 가정, 국가유공자 등에 대해 감면이 있을 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 구체적 면제 대상과 신청 절차는 지자체 조례로 정해지므로 지역마다 차이가 있습니다. 자신이 면제 대상에 해당하는지 확인하려면 관할 시·군·구청 세무과에 문의하거나, 위택스에서 감면 신청 메뉴를 이용해 서류를 제출해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개인분·사업소분·종업원분 비교</h2>
                <p>
                  주민세는 지방세법 §74에 따라 개인분, 사업소분, 종업원분 세 가지 세목으로 나뉘며 납세의무자와 계산 방식이 각각 다릅니다. 이름이 비슷해 혼동하기 쉬우므로 아래 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 주민세 3개 세목 비교 (지방세법 §74·§75·§78)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개인분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사업소분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">종업원분</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">납세의무자</td>
                        <td className="p-3">세대주 개인</td>
                        <td className="p-3">사업장을 둔 법인·개인사업자</td>
                        <td className="p-3">종업원 급여 지급 사업주</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">과세기준일</td>
                        <td className="p-3">7월 1일</td>
                        <td className="p-3">7월 1일</td>
                        <td className="p-3">매월 말</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">세액 산정</td>
                        <td className="p-3">1만원 이하 정액 (조례)</td>
                        <td className="p-3">기본세액 + 사업장 연면적 세액</td>
                        <td className="p-3">종업원 급여총액의 0.5% 수준</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">납부 방식</td>
                        <td className="p-3">부과 (고지서)</td>
                        <td className="p-3">신고납부</td>
                        <td className="p-3">신고납부</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">납부 기간</td>
                        <td className="p-3">8월 16~31일</td>
                        <td className="p-3">8월 1~31일</td>
                        <td className="p-3">매월 다음 달 10일까지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  개인분은 별도 신고 없이 고지서에 따라 납부하지만, 사업소분·종업원분은 사업주가 직접 신고납부해야 하는 세목입니다. 소규모 사업장이라도 사업소분 신고 의무가 있으므로, 개인사업자·프리랜서가 사무공간을 임차하고 있다면 8월 말 신고 기한을 놓치지 않도록 유의해야 합니다.
                </p>
                <p className="mt-4">
                  다만 사업소분 기본세액에는 면세 기준(직전 연도 부가가치세 과세표준 8천만원 미만 등)이 있고, 종업원분에도 급여총액 면세점(월평균 1억 5천만원)이 있어 소규모 사업장은 실제 부과 대상에서 제외될 수 있습니다. 정확한 신고 대상 여부는 위택스나 관할 지자체에 문의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">미납 시 가산금과 불이익</h2>
                <p>
                  주민세 개인분을 8월 31일까지 납부하지 않으면 다음 날부터 즉시 지방세기본법에 따른 가산금이 부과됩니다. 세액이 크지 않다고 방치하면 예상치 못한 압류로 이어질 수 있으므로 반드시 기한 내 납부해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">미납 단계별 불이익</p>
                  <p className="text-sm text-text-secondary">
                    · 9월 1일부터: 본세의 3% 가산금 즉시 부과
                    <br />
                    · 이후 매월: 중가산금이 최대 60개월까지 누적 (일정 세액 이상만 적용)
                    <br />
                    · 장기 체납: 예금·차량·부동산 등 재산 압류 절차 진행
                    <br />
                    · 관허사업 제한: 지방세 체납 30만원 이상이면 인허가 제한 대상
                  </p>
                </div>
                <p className="mt-4">
                  세액이 소액이라도 다른 지방세와 합산되어 관허사업 제한 기준을 넘길 수 있으므로 방치는 금물입니다. 위택스 자동납부를 등록해두면 매년 8월 자동 출금되어 실수로 놓치는 일을 예방할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 사망·질병·재난 등 부득이한 사유로 기한 내 납부가 어려우면 관할 지자체 세무과에 징수유예를 신청할 수 있습니다. 신청은 위택스 또는 지자체 방문으로 가능하며, 사유서와 증빙 서류가 필요합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/resident-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주민세 종합 가이드 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">개인분·사업소분·종업원분 3개 세목을 한 번에 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/resident-tax-business-establishment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주민세 사업소분 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">사업장 연면적 기준 신고와 8월 납부 절차 상세.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-july-payment-schedule-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 7월 납부 일정</div>
                    <p className="mt-1 text-sm text-text-secondary">7월과 9월로 나뉜 재산세 납기와 분납 방법.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배기량별 세율과 연납 할인, 차령경감을 한눈에.</p>
                  </Link>
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가격을 입력해 재산세를 즉시 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 모음 페이지.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 주민세 개인분 세액과 부가세목, 면제 여부는 관할 시·군·구청 세무과 또는 위택스(wetax.go.kr)에서 반드시 확인하세요. 특히 지자체 조례로 세액이 정해지므로 지역별 차이가 있으며, 이사·세대 구성 변경 등이 있는 경우 부과 관계가 달라질 수 있습니다. 본 콘텐츠는 2026-07-28을 기준으로 작성되었으며, 지방세법·조례 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>지방세법 §74(정의), §75(납세의무자), §78(개인분 세율), §150(지방교육세 과세대상)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터 (지방세법)</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스 지방세 종합정보</a>,{' '}
                  <a href="https://www.mois.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">행정안전부 (8월 주민세 납부의 달 안내)</a>.
                </p>
              </section>

              <ShareButtons
                title="주민세 개인분 2026, 8월 납부기간과 확인법"
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
