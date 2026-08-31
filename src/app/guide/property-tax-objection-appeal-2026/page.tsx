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

const URL = 'https://calculatorhost.com/guide/property-tax-objection-appeal-2026/';
const DATE_PUBLISHED = '2026-09-01';
const DATE_MODIFIED = '2026-09-01';

export const metadata: Metadata = {
  title: '재산세 이의신청 기간·절차 2026, 90일 안에 하는 법',
  description:
    '재산세 고지서가 잘못됐다고 생각되면 처분을 안 날부터 90일 이내 시장·군수·구청장에게 이의신청할 수 있습니다. 신청 방법, 결정 기간, 결과에 불복할 때의 심사청구·심판청구·행정소송까지 지방세기본법 §90·§96 기준으로 정리했습니다.',
  keywords: [
    '재산세 이의신청',
    '재산세 이의신청 기간',
    '재산세 불복',
    '지방세 이의신청',
    '재산세 심판청구',
    '재산세 과오납',
    '지방세기본법 90조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '재산세 이의신청 기간·절차 2026, 90일 안에 하는 법' }],
    title: '재산세 이의신청 기간·절차 2026',
    description: '처분을 안 날부터 90일 이내 시장·군수·구청장에게 이의신청. 결정 기간과 심사청구·심판청구 절차까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산세 이의신청 기간·절차 2026',
    description: '90일 이내 시장·군수·구청장 이의신청, 결정 90일, 불복 시 심사·심판청구. 지방세기본법 §90·§96.',
  },
};

const FAQ_ITEMS = [
  {
    question: '재산세 이의신청은 언제까지 해야 하나요?',
    answer:
      '처분이 있었음을 안 날부터 90일 이내입니다. 납세고지서를 우편으로 받았다면 그 통지를 받은 날부터 90일을 계산합니다(지방세기본법 §90). 90일을 넘기면 원칙적으로 이의신청 자체가 각하되므로 고지서를 받으면 날짜부터 확인해야 합니다.',
  },
  {
    question: '재산세 이의신청은 어디에 하나요?',
    answer:
      '재산세는 시·군·구세이므로 부동산 소재지를 관할하는 시장·군수·구청장에게 이의신청서를 제출합니다(지방세기본법 §90). 관할 구청 세무과 방문 접수뿐 아니라 위택스(wetax.go.kr)를 통한 온라인 접수도 가능합니다.',
  },
  {
    question: '이의신청을 하지 않고 바로 심판청구를 할 수 있나요?',
    answer:
      '가능합니다. 이의신청은 필수 절차가 아니라 선택 절차이므로, 처분을 안 날부터 90일 이내라면 이의신청 없이 곧바로 조세심판원에 심판청구를 하거나 시·도지사에게 심사청구를 할 수 있습니다. 다만 두 절차를 동시에 진행할 수는 없고 하나를 선택해야 합니다.',
  },
  {
    question: '이의신청 결과는 얼마 만에 나오나요?',
    answer:
      '지방자치단체는 이의신청을 받은 날부터 90일 이내에 지방세심의위원회 의결을 거쳐 결정하고 이유를 적은 결정서를 보내야 합니다(지방세기본법 §96). 처리가 곤란한 경우 1회에 한해 30일 범위에서 연장될 수 있습니다.',
  },
  {
    question: '이의신청 결과에도 불복하면 어떻게 하나요?',
    answer:
      '이의신청 결정의 통지를 받은 날부터 90일 이내에 조세심판원에 심판청구를 하거나 시·도지사에게 심사청구를 할 수 있습니다. 결정 기간(90일)이 지나도 통지가 없으면 그 기간이 지난 날부터 바로 심사청구·심판청구·행정소송을 제기할 수 있습니다.',
  },
  {
    question: '이의신청 없이 바로 행정소송을 낼 수 있나요?',
    answer:
      '원칙적으로 불가능합니다. 2021년 1월 1일 이후 처분분부터는 지방세기본법 §98 및 부칙 §11에 따라 필요적 전치주의가 적용되어, 행정소송을 내려면 먼저 이의신청·심사청구·심판청구 중 하나를 거쳐야 합니다. 절차를 건너뛰고 소송부터 제기하면 각하될 수 있습니다.',
  },
  {
    question: '이의신청을 하면 재산세 납부가 미뤄지나요?',
    answer:
      '아닙니다. 이의신청을 제기해도 원칙적으로 재산세 납부기한과 납부의무는 그대로 유지됩니다. 납기 안에 납부하지 않으면 가산금이 붙을 수 있으므로, 이의신청 진행과 별개로 고지된 납기는 지키는 것이 안전합니다. 이후 이의신청이 받아들여지면 과오납금은 환급됩니다.',
  },
];

export default function PropertyTaxObjectionAppeal2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 이의신청 기간·절차 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 이의신청 기간·절차 2026, 90일 안에 하는 법',
    description:
      '처분을 안 날부터 90일 이내 시장·군수·구청장 이의신청 방법, 결정 기간(90일), 심사청구·심판청구·행정소송까지 지방세기본법 §90·§96·§98 기준 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세 이의신청', '지방세 불복', '심판청구', '지방세기본법 90조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 이의신청 기간·절차 2026',
    description: '재산세 고지에 불복할 때 90일 이내 이의신청 방법과 심사청구·심판청구·행정소송 단계별 절차.',
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
                    { name: '재산세 이의신청 기간·절차 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 소유자 · 8분 읽기 · 2026-09-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 이의신청 기간·절차 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 90일 안에 하는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  7월·9월에 날아온 재산세 고지서 금액이 잘못됐다고 생각되면 그냥 넘기지 말고 이의신청 제도를 활용할 수 있습니다. 이 가이드는 재산세 이의신청의 기한과 신청처, 결정까지 걸리는 기간, 결과에 다시 불복할 때 밟는 심사청구·심판청구·행정소송 절차를 실제 처리 흐름 순서로 정리합니다. 대상 독자는 재산세 고지 내용에 이의가 있는 주택·건축물·토지 소유자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산세 이의신청이란 무엇인가요?</h2>
                <p>
                  재산세 이의신청은 시장·군수·구청장이 부과한 재산세 고지 내용에 오류나 부당함이 있다고 판단될 때, 정식 소송에 앞서 처분청 스스로 다시 검토하도록 요청하는 행정 구제 절차입니다. 공시가격 적용 오류, 감면 대상 누락, 과세대상 물건 착오 같은 사유가 대표적입니다.
                </p>
                <p>
                  이의신청은 지방세기본법 제8장이 정한 지방세 불복 절차의 첫 단계입니다. 다만 반드시 거쳐야 하는 필수 절차는 아니며, 요건만 맞으면 이의신청을 건너뛰고 바로 심사청구나 심판청구로 갈 수도 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 재산세 부과 처분에 불복해 처분청에 재검토를 요청하는 절차.
                    <br />
                    기한: 처분을 안 날(고지서 수령일)부터 90일 이내(지방세기본법 §90).
                    <br />
                    신청처: 부동산 소재지 관할 시장·군수·구청장.
                    <br />
                    다만: 이의신청은 선택 절차, 바로 심사청구·심판청구도 가능.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이의신청 기한은 언제까지인가요?</h2>
                <p>
                  처분이 있었음을 안 날부터 90일 이내입니다. 재산세 고지서를 우편으로 받았다면 실제로 그 통지를 받은 날이 기산일이 됩니다(지방세기본법 §90). 90일이라는 기한은 재산세뿐 아니라 취득세·자동차세 등 다른 지방세 불복에도 동일하게 적용됩니다.
                </p>
                <p>
                  다만, 재산세는 매년 6월 1일이 과세기준일이고 고지·납부는 7월과 9월에 이뤄지는 세목이라(지방세법 §114·§115) 이의신청 90일 기한도 그해 고지서를 받은 시점부터 별도로 계산됩니다. 작년 재산세 고지분을 지금 다시 문제 삼을 수는 없다는 뜻입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 재산세 불복 절차별 기한 (지방세기본법 §90·§91·§96)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">청구 기한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">처리 기한</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">이의신청</td>
                        <td className="p-3">처분을 안 날부터 90일</td>
                        <td className="p-3">접수일부터 90일(+30일 연장 가능)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">심사청구·심판청구</td>
                        <td className="p-3">이의신청 결정 통지일부터 90일</td>
                        <td className="p-3">기관별 처리 절차에 따름</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">행정소송</td>
                        <td className="p-3">심판·심사 결정 통지일부터 90일</td>
                        <td className="p-3">법원 심리 절차</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 이의신청 결정 기간(90일) 안에 처분청이 결정을 통지하지 않으면 신청인은 그 기간이 지난 날부터 결정을 기다리지 않고 바로 심사청구·심판청구·행정소송을 제기할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이의신청은 어디에, 어떻게 하나요?</h2>
                <p>
                  재산세는 시·군·구세이므로 부동산 소재지를 관할하는 시장·군수·구청장에게 이의신청을 합니다(지방세기본법 §90). 광역시·도세에 대한 이의신청은 시·도지사가 대상이지만, 재산세는 기초자치단체 세목이라는 점이 취득세·재산세를 헷갈리지 않는 기준입니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>불복 사유 정리:</strong> 공시가격 오류, 과세대상 착오, 감면·비과세 누락 등 구체적 사유와 근거자료를 준비합니다.
                  </li>
                  <li>
                    <strong>이의신청서 작성:</strong> 지방세기본법 시행규칙 별지 서식에 따라 처분 내용, 불복 이유, 증빙자료를 기재합니다.
                  </li>
                  <li>
                    <strong>접수:</strong> 관할 구청·군청 세무과 방문 접수 또는 위택스(wetax.go.kr) 온라인 접수가 가능합니다.
                  </li>
                  <li>
                    <strong>심의·결정:</strong> 지방세심의위원회 의결을 거쳐 접수일부터 90일 이내에 결정서가 송달됩니다(지방세기본법 §96).
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 이의신청을 제기했다고 해서 재산세 납부의무 자체가 미뤄지지는 않습니다. 고지된 납기(통상 7월·9월)를 넘기면 가산금이 붙으므로, 이의신청과 별개로 납부는 기한 내 하고 추후 결과에 따라 환급받는 방식이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">결과에 다시 불복하려면 어떻게 하나요?</h2>
                <p>
                  이의신청 결정에도 승복할 수 없다면 결정 통지를 받은 날부터 90일 이내에 조세심판원에 심판청구를 하거나 시·도지사에게 심사청구를 할 수 있습니다. 두 절차 중 하나만 선택할 수 있으며, 심판청구는 국무총리 소속 조세심판원이 독립적으로 심리합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 공시가격 착오로 재산세가 과다 부과된 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 고지서 수령: 7월 20일
                    <br />
                    · 이의신청 접수: 8월 중(90일 이내), 관할 구청 세무과
                    <br />
                    · 결정 통지: 접수일부터 90일 이내(지방세심의위원회 의결)
                    <br />
                    · 결정에 불복 시: 통지일부터 90일 이내 심판청구 또는 심사청구
                    <br />
                    <span className="text-xs text-text-tertiary">
                      결론: 각 단계마다 90일이라는 별도 기한이 새로 시작되므로 통지서를 받을 때마다 날짜를 다시 확인해야 합니다.
                    </span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 2021년 1월 1일 이후 처분분부터는 지방세기본법 §98 및 부칙 §11에 따라 필요적 전치주의가 적용됩니다. 즉 행정소송을 제기하려면 그 전에 이의신청·심사청구·심판청구 중 하나를 반드시 거쳐야 하며, 이를 건너뛰고 곧바로 소송을 내면 각하될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이의신청과 심사청구·심판청구, 무엇이 다른가요?</h2>
                <p>
                  이의신청은 처분청(시장·군수·구청장) 스스로 재검토하는 절차이고, 심사청구·심판청구는 상급 기관이나 독립된 조세심판원이 판단하는 절차입니다. 이의신청 없이 바로 심사청구·심판청구로 가도 되지만, 두 단계를 모두 거치면 시간은 더 걸려도 처분청과 상급 기관 판단을 각각 받아볼 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 2. 이의신청 vs 심사청구·심판청구 (지방세기본법 §90·§91)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">이의신청</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">심사청구·심판청구</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">심리 주체</td>
                        <td className="p-3">시장·군수·구청장</td>
                        <td className="p-3">시·도지사 또는 조세심판원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">필수 여부</td>
                        <td className="p-3">선택(생략 가능)</td>
                        <td className="p-3">이의신청 생략 시 직접 청구 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">청구 기한</td>
                        <td className="p-3">처분을 안 날부터 90일</td>
                        <td className="p-3">처분 또는 이의신청 결정 통지일부터 90일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 재산세 금액이 크지 않고 사유가 명확한 단순 착오라면 절차가 비교적 간단한 이의신청부터 시작하는 경우가 많습니다. 반대로 법리 다툼 소지가 크다면 처음부터 조세심판원 심판청구를 선택하기도 합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">공시가격을 입력해 예상 재산세를 미리 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-july-payment-schedule-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 7월 납부 일정·분납</div>
                    <p className="mt-1 text-sm text-text-secondary">주택·건축물 7월, 토지 9월 납기와 분할납부 조건.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과표·세율·누진공제로 재산세가 산출되는 구조.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-installment-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 분할납부</div>
                    <p className="mt-1 text-sm text-text-secondary">250만원 초과 시 나눠 내는 분납 신청 방법.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부동산 취득 시 함께 확인할 취득세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률·세무 조언이 아닙니다. 실제 이의신청 가능 여부와 처리 절차는 개별 처분 내용과 사실관계에 따라 달라지므로, 반드시 관할 시·군·구청 세무과 또는 세무사·변호사 등 전문가와 확인하세요. 본 콘텐츠는 2026-09-01을 기준으로 작성되었으며, 관련 법령 변경 시 업데이트됩니다. 인용 법조항: 지방세기본법 §90(이의신청), §91(청구 절차), §96(결정), §98(불복방법의 통지, 부칙 §11 전치주의), 지방세법 §114(과세기준일), §115(납기). 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스</a>,{' '}
                  <a href="https://www.olta.re.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국지방세연구원 지방세 법령정보시스템</a>.
                </p>
              </section>

              <ShareButtons
                title="재산세 이의신청 기간·절차 2026 가이드"
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
