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

const URL = 'https://calculatorhost.com/guide/vat-penalty-underreporting-2026/';
const DATE_PUBLISHED = '2026-07-22';
const DATE_MODIFIED = '2026-07-22';

export const metadata: Metadata = {
  title: '부가세 가산세 2026, 무신고·과소신고·납부지연 계산법',
  description:
    '부가세 무신고 시 미신고세액의 20%(부정 40%), 과소신고 10%, 납부지연 일 0.022%가 가산됩니다. 국세기본법 §47의2·3·4 기준 계산 사례와 수정신고 감면 구간까지 정리.',
  keywords: [
    '부가세 가산세',
    '부가세 무신고 가산세',
    '부가세 과소신고 가산세',
    '납부지연가산세',
    '국세기본법 47조의2',
    '부가세 신고 안하면',
    '부가세 수정신고 감면',
    '세금계산서 미발급 가산세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부가세 가산세 2026, 무신고·과소신고·납부지연 계산법' }],
    title: '부가세 가산세 2026: 무신고 20%, 과소신고 10%, 납부지연 일 0.022%',
    description: '7월 부가세 확정신고 전 확인해야 할 가산세 전 유형과 실제 계산 사례, 수정신고 감면율 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부가세 가산세 2026: 무신고 20%, 과소신고 10%, 납부지연 일 0.022%',
    description: '국세기본법 §47의2·3·4 및 §48 수정신고 감면, 부가가치세법 §60까지 계산 사례로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부가세 신고를 하루만 늦어도 가산세가 나오나요?',
    answer:
      '네, 하루라도 늦으면 납부지연가산세가 부과됩니다. 미납세액에 대해 1일당 10만분의 22(약 0.022%)가 계산되므로, 500만원을 1일 지연하면 약 1,100원이 발생합니다. 신고 자체가 없다면 무신고가산세 20%까지 별도로 추가되므로, 마감일을 넘겼다면 최대한 빨리 기한후신고를 진행해 감면 구간에 들어가는 것이 유리합니다.',
  },
  {
    question: '무신고 가산세는 신고서 자체를 안 낸 경우에만 나오나요?',
    answer:
      '네, 법정신고기한까지 신고서를 제출하지 않은 경우 무신고가산세가 부과됩니다(국세기본법 §47의2). 일반 무신고는 무신고납부세액의 20%, 부정행위에 의한 무신고는 40%가 적용됩니다. 신고서는 제출했으나 세액을 적게 신고한 경우는 과소신고가산세(§47의3) 대상입니다.',
  },
  {
    question: '부정행위란 정확히 어떤 경우를 말하나요?',
    answer:
      '이중장부 작성, 거짓 세금계산서 수취, 소득·매출 은닉, 재산의 은닉이나 소득·수익·행위·거래의 조작 등이 부정행위에 해당합니다. 부정행위로 판정되면 가산세율이 20%에서 40%(과소는 10%에서 40%)로 두 배 이상 올라가고, 국세부과 제척기간도 5년에서 10년으로 늘어나므로 판단 기준이 매우 엄격합니다.',
  },
  {
    question: '수정신고를 하면 가산세를 얼마나 감면받을 수 있나요?',
    answer:
      '법정신고기한 경과 후 2년 이내에 자진하여 수정신고하면 과소신고가산세가 기간별로 감면됩니다(국세기본법 §48). 1개월 이내 90%, 1개월 초과 3개월 이내 75%, 3개월 초과 6개월 이내 50%, 그 이후에도 구간별로 감면율이 낮아지며 적용됩니다. 다만 세무조사 통지 이후 신고분은 감면 대상에서 제외됩니다.',
  },
  {
    question: '홈택스에서 무신고 상태를 확인하는 방법이 있나요?',
    answer:
      '홈택스(hometax.go.kr)에 로그인 후 "신고·납부 → 부가가치세" 메뉴에서 과거 신고 이력을 조회할 수 있습니다. 신고 이력이 없거나 기한이 지난 상태로 표시되면 무신고 상태로 볼 수 있고, 이 경우 즉시 기한후신고(§45의3)를 진행해 감면 구간을 노리는 것이 좋습니다.',
  },
  {
    question: '세금계산서를 발급하지 않았을 때도 가산세가 있나요?',
    answer:
      '네, 부가가치세법 §60에 따라 세금계산서 관련 별도 가산세가 부과됩니다. 발급 의무자가 세금계산서를 발급하지 않으면 공급가액의 2%, 지연발급은 1%, 부실기재(필요적 기재사항 누락)는 1%가 부과됩니다. 사업자 미등록 상태로 공급한 경우에도 공급가액의 1% 가산세가 있으므로, 매출이 있으면 즉시 사업자등록을 완료해야 합니다.',
  },
  {
    question: '가산세도 부가세처럼 매입세액공제가 되나요?',
    answer:
      '아니요, 가산세는 매입세액공제 대상이 아닙니다. 순수하게 추가로 납부해야 하는 금액이며, 소득세·법인세 계산 시에도 필요경비 또는 손금으로 인정되지 않습니다(소득세법·법인세법상 손금불산입). 즉 가산세가 100만원 발생하면 그 100만원이 그대로 순손실로 남는 구조이므로, 마감일 준수가 가장 확실한 절세 전략입니다.',
  },
  {
    question: '가산세 부과에 이의가 있으면 어떻게 하나요?',
    answer:
      '가산세 부과 통지를 받은 날로부터 90일 이내에 이의신청, 심사청구, 심판청구 중 하나를 선택해 불복 절차를 진행할 수 있습니다(국세기본법 §55 이하). 특히 "가산세 감면 신청서"를 제출해 정당한 사유(천재지변, 도난, 화재 등)를 소명하면 가산세가 감면될 수 있으므로, 통지서 수령 즉시 세무대리인과 상의하시기 바랍니다.',
  },
];

export default function VatPenaltyUnderreporting2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부가세 가산세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부가세 가산세 2026: 무신고·과소신고·납부지연 완전 계산법',
    description:
      '7월 부가세 확정신고 시즌에 반드시 알아야 할 가산세 전 유형. 무신고 20%(부정 40%), 과소신고 10%, 납부지연 일 0.022%, 세금계산서 미발급 2%, 수정신고 감면 구간까지 계산 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부가세 가산세', '무신고 가산세', '과소신고 가산세', '납부지연가산세', '수정신고 감면', '국세기본법 47조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부가세 가산세 2026',
    description:
      '부가세 무신고·과소신고·납부지연 시 부과되는 가산세 종류와 계산법, 수정신고 감면율 정리.',
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
                    { name: '부가세 가산세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·법인 · 9분 읽기 · 2026-07-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부가세 가산세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">: 무신고·과소신고·납부지연 계산법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  7월 25일 부가가치세 확정신고 마감일(주말인 경우 다음 영업일)이 다가오면 사업자들의 가장 큰 걱정은 가산세입니다. 신고를 놓쳤을 때 얼마가 붙는지, 이미 신고했는데 세액을 잘못 계산했다면 어떻게 되는지, 자진해서 수정신고하면 감면받을 수 있는지 모두 국세기본법 §47의2·3·4와 §48, 그리고 부가가치세법 §60에 규정돼 있습니다. 이 가이드는 가산세 유형별 세율과 실제 계산 사례, 감면 구간까지 한 번에 정리해 드립니다.
                </p>
              </header>

              <AdSlot slot="guide-vat-penalty-underreporting-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 부가세를 늦게 신고하면 가산세가 얼마인가요?</h2>
                <p>
                  결론부터 말하면 크게 세 가지가 동시에 붙습니다. 신고 자체를 하지 않으면 무신고가산세(미신고세액의 20%, 부정행위 40%), 세액을 적게 신고했으면 과소신고가산세(10%, 부정 40%), 그리고 어떤 경우든 납부기한을 넘긴 세액에는 납부지연가산세(1일 0.022%)가 별도로 부과됩니다. 세금계산서 관련 위반이 있으면 부가가치세법 §60의 개별 가산세까지 중첩됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 부가세 가산세 종류 요약(2026년 기준, 국세기본법·부가가치세법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가산세 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">부정행위</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거 법조항</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">무신고</td>
                        <td className="p-3"><strong>20%</strong></td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">국세기본법 §47의2</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">과소신고·초과환급</td>
                        <td className="p-3"><strong>10%</strong></td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">국세기본법 §47의3</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">납부지연</td>
                        <td className="p-3" colSpan={2}><strong>1일 10만분의 22(약 0.022%)</strong></td>
                        <td className="p-3">국세기본법 §47의4</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">세금계산서 미발급</td>
                        <td className="p-3" colSpan={2}><strong>공급가액의 2%</strong></td>
                        <td className="p-3">부가가치세법 §60</td>
                      </tr>
                      <tr>
                        <td className="p-3">사업자 미등록</td>
                        <td className="p-3" colSpan={2}><strong>공급가액의 1%</strong></td>
                        <td className="p-3">부가가치세법 §60</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 위 세율은 기본 부과율이고, 자진 수정신고나 기한후신고를 하면 국세기본법 §48에 따라 기간별로 감면됩니다. 세무조사 통지를 받기 전에 스스로 신고하는 것이 감면의 절대 조건입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 무신고 가산세는 얼마인가요? (§47의2)</h2>
                <p>
                  국세기본법 §47의2에 따라 법정신고기한까지 부가세 신고서를 내지 않으면 무신고납부세액의 20%가 가산세로 부과됩니다. 부정행위가 개입된 무신고는 40%로 두 배가 되고, 국제거래에서 부정 무신고는 60%까지 올라갑니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">무신고가산세 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    가산세 = 무신고납부세액 × 20% (부정행위는 40%)
                    <br />
                    예: 부가세 500만원 무신고 → 5,000,000 × 0.20 = <strong>1,000,000원</strong>
                    <br />
                    부정행위(거짓 세금계산서 등) → 5,000,000 × 0.40 = <strong>2,000,000원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  다만 예정신고를 놓친 개인사업자가 확정신고 기간에 함께 신고하는 경우, 무신고가산세가 아니라 예정분에 대한 별도 처리 절차가 적용될 수 있습니다. 예정·확정 구분이 애매하면 홈택스 상담 또는 세무대리인 확인을 권장합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 과소신고 가산세는 얼마인가요? (§47의3)</h2>
                <p>
                  신고서는 제출했지만 세액을 실제보다 적게 신고했다면 과소신고가산세가 부과됩니다. 국세기본법 §47의3에 따라 일반 과소신고는 과소신고납부세액의 10%, 부정행위에 의한 과소신고는 40%(국제거래는 60%)입니다. 초과환급받은 경우에도 동일한 세율이 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">과소신고가산세 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    가산세 = 과소신고납부세액 × 10% (부정행위는 40%)
                    <br />
                    예: 정확한 부가세 500만원인데 300만원으로 신고 → 과소분 200만원 × 0.10 = <strong>200,000원</strong>
                    <br />
                    부정행위(이중장부·거짓 계산서) 개입 시 → 2,000,000 × 0.40 = <strong>800,000원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  다만 세법 해석의 차이나 일반적인 오류(예: 매입세액 안분 계산 오류)로 인한 과소신고는 부정행위로 보지 않습니다. 부정행위 판정은 매출 은닉, 이중장부, 거짓 증빙 등 적극적 은닉 행위가 있어야 인정됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 납부지연 가산세는 어떻게 계산하나요? (§47의4)</h2>
                <p>
                  납부지연가산세는 납부기한 다음 날부터 실제 납부일까지의 일수를 기준으로 계산됩니다. 국세기본법 §47의4에 따른 세율은 1일 10만분의 22(0.00022, 약 0.022%)이며, 연환산 시 약 8.03%에 해당합니다. 이 세율은 국세기본법 시행령이 정하는 이자율로 개정될 수 있으므로 신고 시점의 최신 값을 홈택스에서 확인하는 것이 좋습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">납부지연가산세 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    가산세 = 미납세액 × 미납일수 × 10만분의 22
                    <br />
                    예 1: 500만원, 30일 지연 → 5,000,000 × 30 × 0.00022 = <strong>33,000원</strong>
                    <br />
                    예 2: 500만원, 90일 지연 → 5,000,000 × 90 × 0.00022 = <strong>99,000원</strong>
                    <br />
                    예 3: 1,000만원, 180일 지연 → 10,000,000 × 180 × 0.00022 = <strong>396,000원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  다만 세무공무원이 납부고지서를 발부한 이후에는 별도의 가산금·중가산금 체계가 적용될 수 있으며, 국세징수법상의 강제징수 절차로 이어질 수 있습니다. 자진 납부는 지연일수를 줄여 가산세를 최소화하는 유일한 방법입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금계산서 관련 가산세 (부가가치세법 §60)</h2>
                <p>
                  부가세는 신고·납부 가산세 외에도 세금계산서 발급·수취 위반에 대한 별도 가산세가 있습니다. 부가가치세법 §60에 규정된 이 가산세는 매출·매입 흐름을 투명하게 하기 위한 제재로, 사업자 등록부터 발급, 지연, 부실기재까지 광범위하게 적용됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>사업자 미등록 가산세:</strong> 사업 개시일부터 20일 이내에 사업자등록을 하지 않고 공급하면 공급가액의 1%가 부과됩니다.
                  </li>
                  <li>
                    <strong>세금계산서 미발급:</strong> 발급 의무자가 세금계산서를 발급하지 않으면 공급가액의 2%가 부과됩니다.
                  </li>
                  <li>
                    <strong>세금계산서 지연발급:</strong> 공급시기가 속한 과세기간의 확정신고 기한까지 발급하되 정상 시기(공급시기 다음 달 10일)를 넘긴 경우 공급가액의 1%가 부과됩니다.
                  </li>
                  <li>
                    <strong>세금계산서 부실기재:</strong> 필요적 기재사항(공급자·공급받는 자의 등록번호, 공급가액, 부가세액, 작성연월일)을 잘못 기재하면 공급가액의 1%가 부과됩니다.
                  </li>
                  <li>
                    <strong>매입세금계산서 지연수취:</strong> 확정신고 기한 이내에 수취했지만 지연된 경우 공급가액의 0.5% 수준의 가산세가 있을 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 세금계산서 관련 가산세는 유형별로 부과율과 조건이 세밀하게 다르므로, 실제 위반이 확인되면 부가가치세법 §60 원문과 국세청 예규를 세무대리인과 함께 확인하시기 바랍니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가산세 계산 종합 사례 (단계별 3건)</h2>
                <p>
                  실제 상황에서 가산세가 어떻게 중첩되는지 대표 사례로 살펴보겠습니다. 모든 계산은 국세기본법 §47의2·3·4를 기준으로 하며, 세금계산서 관련 별도 가산세는 포함하지 않은 순수 신고·납부 관련 가산세입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 부가세 500만원 무신고, 90일 경과(일반 무신고)</p>
                  <p className="text-sm text-text-secondary">
                    · 무신고납부세액: 5,000,000원
                    <br />
                    · 무신고가산세(§47의2): 5,000,000 × 20% = <strong>1,000,000원</strong>
                    <br />
                    · 납부지연가산세(§47의4): 5,000,000 × 90일 × 0.00022 = <strong>99,000원</strong>
                    <br />
                    · 가산세 합계: <strong>1,099,000원</strong>
                    <br />
                    · 총 납부금액(본세 포함): 5,000,000 + 1,099,000 = <strong>6,099,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">가산세율: 원본 세액 대비 약 22%. 90일만 늦어도 5분의 1 이상 늘어난다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 과소신고 200만원 발견, 45일 후 자진 수정신고(§48 감면 75% 가정)</p>
                  <p className="text-sm text-text-secondary">
                    · 정확한 부가세: 5,000,000원 / 최초 신고 세액: 3,000,000원
                    <br />
                    · 과소신고납부세액: 2,000,000원
                    <br />
                    · 과소신고가산세(§47의3) 기본: 2,000,000 × 10% = 200,000원
                    <br />
                    · §48 수정신고 감면(1개월 초과 3개월 이내 75%): 200,000 × (1 − 0.75) = <strong>50,000원</strong>
                    <br />
                    · 납부지연가산세(§47의4): 2,000,000 × 45일 × 0.00022 = <strong>19,800원</strong>
                    <br />
                    · 가산세 합계: 50,000 + 19,800 = <strong>69,800원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">감면 없었다면 200,000 + 19,800 = 219,800원. 자진 수정신고로 약 15만원 절감.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 부정행위 무신고 1,000만원, 180일 경과</p>
                  <p className="text-sm text-text-secondary">
                    · 무신고납부세액: 10,000,000원(거짓 세금계산서 등 부정행위 개입)
                    <br />
                    · 무신고가산세(§47의2, 부정): 10,000,000 × 40% = <strong>4,000,000원</strong>
                    <br />
                    · 납부지연가산세(§47의4): 10,000,000 × 180일 × 0.00022 = <strong>396,000원</strong>
                    <br />
                    · 가산세 합계: <strong>4,396,000원</strong>
                    <br />
                    · 총 납부금액(본세 포함): 10,000,000 + 4,396,000 = <strong>14,396,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">부정행위 판정 시 본세의 약 44% 추가. 국세부과 제척기간도 5년에서 10년으로 늘어남(§26의2).</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 사례는 신고·납부 가산세만 계산한 값입니다. 실제로는 세금계산서 미발급(2%), 사업자 미등록(1%) 등이 함께 적용될 수 있어 최종 부담은 더 커질 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-vat-penalty-underreporting-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">Q. 가산세 감면받을 수 있나요? (수정신고 §48)</h2>
                <p>
                  국세기본법 §48은 납세자가 스스로 오류를 인정하고 자진 신고하는 경우 과소신고가산세를 대폭 감면합니다. 감면율은 법정신고기한 경과 후 얼마나 빨리 수정신고하느냐에 따라 구간별로 달라지며, 세무조사 통지를 받기 전에 신고해야 감면 대상이 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 수정신고 시 과소신고가산세 감면율(국세기본법 §48 및 시행령, 대표 구간)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">법정신고기한 경과 후 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">감면율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예시(과소가산세 100만원 시 실부담)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1개월 이내</td>
                        <td className="p-3"><strong>90%</strong></td>
                        <td className="p-3">10만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1개월 초과 ~ 3개월 이내</td>
                        <td className="p-3"><strong>75%</strong></td>
                        <td className="p-3">25만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3개월 초과 ~ 6개월 이내</td>
                        <td className="p-3"><strong>50%</strong></td>
                        <td className="p-3">50만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6개월 초과 ~ 1년 이내</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">70만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1년 초과 ~ 1년 6개월 이내</td>
                        <td className="p-3"><strong>20%</strong></td>
                        <td className="p-3">80만원</td>
                      </tr>
                      <tr>
                        <td className="p-3">1년 6개월 초과 ~ 2년 이내</td>
                        <td className="p-3"><strong>10%</strong></td>
                        <td className="p-3">90만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  기한후신고(신고서 자체를 놓친 경우)에도 §48이 적용됩니다. 다만 무신고가산세 감면율은 과소신고보다 다소 낮게 설계돼 있으며, 대표적으로 1개월 이내 50%, 3개월 이내 30%, 6개월 이내 20% 수준입니다. 정확한 구간별 감면율은 시행령 개정으로 변동될 수 있으므로 국세청 홈택스 또는 세무대리인 확인을 권장합니다.
                </p>
                <p className="mt-4">
                  다만 감면의 절대 조건은 세무조사 통지 이전 자진 신고입니다. 조사 착수 후 수정신고분은 감면 대상에서 제외되며, 부정행위에 의한 가산세는 감면 폭이 제한되거나 배제될 수 있습니다. 또한 납부지연가산세(§47의4)는 §48 감면 대상이 아니므로 납부일까지 계속 누적됩니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/july-vat-final-1st-half/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">7월 부가세 확정신고 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">7월 25일 마감 대비 신고 준비 체크리스트.</p>
                  </Link>
                  <Link
                    href="/guide/income-tax-late-filing-penalty-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 지연 신고 가산세</div>
                    <p className="mt-1 text-sm text-text-secondary">종소세 무신고·과소신고 시 가산세 비교.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 부가세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세자의 가산세 적용 특례와 신고 방식.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급 신청법</div>
                    <p className="mt-1 text-sm text-text-secondary">환급 지연 방지와 조기환급 요건 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">필요경비율 반영 종소세 예상액 산출.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세·종소세·양도세·취득세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 가산세 부과 여부, 감면율, 최종 납부액은 개별 사업자의 상황과 세법 개정에 따라 달라지므로 국세청·홈택스(hometax.go.kr) 또는 세무대리인에게 반드시 확인하시기 바랍니다. 특히 부정행위 판정 여부, 예정신고와 확정신고의 중복 처리, 수정신고 감면 구간의 정확한 세부 조건은 국세기본법 시행령 개정에 따라 변동될 수 있습니다. 본 콘텐츠는 2026-07-22를 기준으로 작성되었으며, 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>국세기본법 §47의2(무신고가산세), §47의3(과소신고가산세), §47의4(납부지연가산세), §48(가산세 감면), 부가가치세법 §60(세금계산서 관련 가산세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="부가세 가산세 2026 계산법 가이드"
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
