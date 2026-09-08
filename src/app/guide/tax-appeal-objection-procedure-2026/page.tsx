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

const URL = 'https://calculatorhost.com/guide/tax-appeal-objection-procedure-2026/';
const DATE_PUBLISHED = '2026-09-09';
const DATE_MODIFIED = '2026-09-09';

export const metadata: Metadata = {
  title: '조세불복 절차 2026, 이의신청·심사청구·심판청구 차이',
  description:
    '과세처분에 불복할 때는 이의신청·심사청구·심판청구 중 하나를 선택해 처분을 안 날부터 90일 이내 제기해야 합니다. 국세기본법 §55·§61·§68 기준 청구기한과 관할기관, 필요적 전치주의, 국선대리인 무료지원 요건을 정리했습니다.',
  keywords: [
    '조세불복',
    '이의신청 심사청구 심판청구 차이',
    '조세불복 기한',
    '국세기본법 61조',
    '과세전적부심사',
    '국선대리인',
    '조세심판원',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '조세불복 절차 2026, 이의신청·심사청구·심판청구 차이' }],
    title: '조세불복 절차 2026, 이의신청·심사청구·심판청구 차이',
    description: '처분을 안 날부터 90일 이내 이의신청·심사청구·심판청구 중 선택. 국세기본법 §55·§61·§68 기준 청구기한과 관할기관 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '조세불복 절차 2026, 이의신청·심사청구·심판청구 차이',
    description: '처분을 안 날부터 90일 이내 이의신청·심사청구·심판청구 중 선택. 국세기본법 §55·§61·§68 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '이의신청을 반드시 거쳐야 심사청구를 할 수 있나요?',
    answer:
      '아닙니다. 이의신청은 임의절차입니다(국세기본법 §55). 이의신청 없이 처분을 안 날부터 90일 이내에 곧바로 심사청구나 심판청구를 제기할 수 있고, 이의신청을 거친 뒤 그 결정에 불복하려면 결정 통지를 받은 날부터 다시 90일 이내에 심사청구나 심판청구로 나아가면 됩니다.',
  },
  {
    question: '심사청구와 심판청구를 동시에 낼 수 있나요?',
    answer:
      '아니요. 심사청구는 국세청장에게, 심판청구는 조세심판원에 내는 절차인데, 같은 처분에 대해 두 가지를 중복해서 제기할 수 없습니다. 둘 중 하나만 선택해야 하며, 실무에서는 조세 전문성이 높은 조세심판원에 심판청구를 내는 경우가 많습니다.',
  },
  {
    question: '조세불복 중에도 세금을 내야 하나요?',
    answer:
      '원칙적으로는 그렇습니다. 이의신청·심사청구·심판청구는 해당 처분의 집행에 영향을 주지 않는 것이 원칙입니다(국세기본법 §57 집행부정지). 다만 재결청이 필요하다고 인정하면 집행을 중지시킬 수 있고, 결정이 확정되기 전에는 압류재산을 공매할 수 없다는 보호 장치가 국세징수법에 별도로 있습니다.',
  },
  {
    question: '불복 결정이 늦어지면 언제까지 기다려야 하나요?',
    answer:
      '결정기간(심사청구·심판청구 90일, 이의신청 30일)이 지났는데도 결정 통지를 받지 못했다면, 통지를 기다리지 않고 그 결정기간이 지난 날부터 바로 행정소송을 제기할 수 있습니다(국세기본법 §56③ 단서). 무한정 기다려야 하는 것은 아닙니다.',
  },
  {
    question: '조세불복 대신 감사원에 낼 수도 있나요?',
    answer:
      '가능합니다. 감사원법에 따라 감사원에 심사청구를 낼 수도 있는데, 이 경우 국세기본법상 심사청구를 거친 것과 동일하게 인정됩니다(국세기본법 §56⑤). 감사원 심사청구 결정에 불복하려면 결정 통지를 받은 날부터 90일 이내에 행정소송을 제기하면 됩니다.',
  },
  {
    question: '국선대리인은 누구나 무료로 지원받을 수 있나요?',
    answer:
      '아닙니다. 개인은 종합소득금액 5천만원 이하이면서 소유 재산가액이 3천만원 이하인 경우, 법인은 수입금액과 자산가액이 일정 기준 이하인 경우에만 국선대리인을 신청할 수 있습니다(국세기본법 §59의2). 이의신청인·심사청구인·심판청구인·과세전적부심사 청구인이 대상이며, 관할 세무서나 국세청에 신청서를 제출하면 됩니다.',
  },
  {
    question: '세금을 냈는데도 나중에 잘못됐다는 걸 알면 불복할 수 있나요?',
    answer:
      '이미 낸 세금이라도 처분 자체에 불복하려면 이의신청·심사청구·심판청구를 이용할 수 있습니다. 다만 스스로 신고 오류를 바로잡고 싶을 뿐 별도 처분에 불복하는 것이 아니라면, 법정신고기한이 지난 후 5년 이내에 경정청구 제도를 이용하는 것이 더 간단한 경우가 많습니다.',
  },
];

export default function TaxAppealObjectionProcedure2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '조세불복 절차 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '조세불복 절차 2026, 이의신청·심사청구·심판청구 차이',
    description:
      '과세처분에 불복하는 이의신청·심사청구·심판청구의 청구기한·관할기관·결정기간, 과세전적부심사, 필요적 전치주의, 국선대리인 지원 요건을 국세기본법 §55·§56·§61·§66·§68·§59의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['조세불복', '이의신청', '심사청구', '심판청구', '국세기본법 61조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '조세불복 절차 2026',
    description:
      '이의신청·심사청구·심판청구의 청구기한·관할기관 차이와 과세전적부심사, 행정소송 전치주의를 정리한 가이드.',
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
                    { name: '조세불복 절차 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">납세자 · 9분 읽기 · 2026-09-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  조세불복 절차 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 이의신청·심사청구·심판청구 차이</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  세무서로부터 받은 과세처분이 잘못됐다고 생각되면 이의신청·심사청구·심판청구 세 가지 불복 절차 중 하나를 선택해 다툴 수 있습니다. 이 가이드는 각 절차의 청구기한·관할기관·결정기간 차이, 처분 전 단계인 과세전적부심사, 행정소송으로 가기 전 반드시 거쳐야 하는 필요적 전치주의, 그리고 비용 없이 대리인을 지원받는 국선대리인 제도를 국세기본법 §55·§56·§61·§66·§68 기준으로 정리합니다. 대상 독자는 세금 고지서나 과세처분 통지를 받고 불복 여부를 고민하는 납세자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조세불복이란 무엇인가요?</h2>
                <p>
                  조세불복은 세무서·지방국세청 등 과세관청의 위법하거나 부당한 처분으로 권리나 이익을 침해당한 납세자가 그 처분을 취소하거나 바로잡아 달라고 다투는 법적 절차입니다(국세기본법 §55). 세금을 더 내라는 경정·부과처분뿐 아니라, 마땅히 받아야 할 환급이나 처분을 받지 못한 경우에도 조세불복을 이용할 수 있습니다.
                </p>
                <p>
                  국세 불복 절차는 이의신청, 심사청구, 심판청구 세 갈래로 나뉘며, 이 단계를 모두 거치거나 일부만 거친 뒤 최종적으로 행정소송으로 이어질 수 있습니다. 각 단계마다 청구기한과 관할기관이 다르므로, 처분 통지서를 받은 즉시 어떤 절차를 선택할지 정하는 것이 중요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 위법·부당한 과세처분에 불복해 취소·경정을 구하는 절차(국세기본법 §55).
                    <br />
                    3가지 경로: 이의신청(임의)·심사청구(국세청장)·심판청구(조세심판원).
                    <br />
                    공통 기한: 처분을 안 날부터 90일 이내(국세기본법 §61·§68).
                    <br />
                    다음 단계: 심사·심판 결정에도 불복하면 결정 통지 후 90일 이내 행정소송.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이의신청·심사청구·심판청구는 어떻게 다른가요?</h2>
                <p>
                  세 절차 모두 처분의 취소나 변경을 구한다는 목적은 같지만, 청구를 받는 기관과 결정기간이 다릅니다. 이의신청은 처분을 한 세무서장이나 지방국세청장에게 내는 절차이고, 심사청구는 국세청장에게, 심판청구는 국무총리 소속 조세심판원에 내는 절차입니다(국세기본법 §66·§61·§67·§68).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 이의신청·심사청구·심판청구 비교 (국세기본법 §61·§65·§66·§68)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">관할기관</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">청구기한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">결정기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">절차 성격</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">이의신청</td>
                        <td className="p-3">세무서장·지방국세청장</td>
                        <td className="p-3">처분을 안 날부터 90일</td>
                        <td className="p-3">30일(§66⑥, §65② 준용)</td>
                        <td className="p-3">임의절차</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">심사청구</td>
                        <td className="p-3">국세청장</td>
                        <td className="p-3">처분을 안 날부터 90일(§61)</td>
                        <td className="p-3">90일(§65②)</td>
                        <td className="p-3">필수절차 중 택1</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">심판청구</td>
                        <td className="p-3">조세심판원</td>
                        <td className="p-3">처분을 안 날부터 90일(§68)</td>
                        <td className="p-3">90일(§80의2, §65② 준용)</td>
                        <td className="p-3">필수절차 중 택1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 이의신청을 거친 뒤 심사청구나 심판청구로 나아가는 경우에는 처분일이 아니라 이의신청 결정 통지를 받은 날부터 다시 90일이 새로 기산됩니다(국세기본법 §61②·§68②). 이의신청 없이 곧바로 심사청구나 심판청구를 내는 것도 가능합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조세불복 신청 기한은 며칠인가요?</h2>
                <p>
                  기본 원칙은 처분이 있음을 안 날, 즉 처분 통지서를 받은 날부터 90일입니다. 이의신청·심사청구·심판청구 모두 이 90일 원칙을 따르며(국세기본법 §61①·§68①), 90일을 넘기면 요건불비로 각하되어 본안 판단조차 받지 못합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 종합소득세 경정처분 통지를 받은 개인사업자</p>
                  <p className="text-sm text-text-secondary">
                    · 처분 통지 수령일: 3월 10일
                    <br />
                    · 90일 기산: 3월 10일부터 계산해 6월 8일이 신청 기한
                    <br />
                    · 이의신청 선택 시: 6월 8일 이내 세무서에 이의신청 접수
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 기한 계산은 처분을 실제로 안 날(보통 통지 수령일)을 기준으로 하며, 단순 우편 발송일이 아닙니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 우편으로 청구서를 낸 경우 기한 내 발송했다면 실제 도착이 기한을 넘겼더라도 그 기한 만료일에 적법하게 청구한 것으로 인정됩니다(국세기본법 §61③ 준용). 또한 천재지변 등 정당한 사유로 기한을 지키지 못했다면 그 사유가 사라진 날부터 14일 이내에 청구할 수 있는 구제 규정도 있습니다(§61④).
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">과세전적부심사는 언제 활용하나요?</h2>
                <p>
                  과세전적부심사는 정식 과세처분이 나오기 전, 세무조사 결과나 과세 예정 내용을 미리 다투는 절차입니다. 세무서장·지방국세청장은 세무조사 결과 등을 통지(과세예고통지)해야 하고, 통지를 받은 납세자는 받은 날부터 30일 이내에 통지 내용의 적법성을 심사해 달라고 청구할 수 있습니다(국세기본법 §81의15①②).
                </p>
                <p>
                  청구를 받은 세무서장·지방국세청장·국세청장은 국세심사위원회 심사를 거쳐 결정하고, 청구를 받은 날부터 30일 이내에 그 결과를 통지해야 합니다(§81의15④). 정식 처분 이전 단계이므로, 여기서 채택되면 아예 과세처분 자체가 나오지 않을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만, 과세전적부심사는 처분 전 단계일 뿐 이의신청·심사청구·심판청구를 대체하지 않습니다. 이미 정식 처분(고지서)이 나온 뒤라면 과세전적부심사가 아니라 이의신청 이하의 불복 절차를 이용해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">심사청구와 심판청구 중 어느 쪽을 선택해야 하나요?</h2>
                <p>
                  법적 요건은 거의 같지만 실무 성격은 다릅니다. 심사청구는 국세청 내부(국세청장)에서 스스로 처분을 재검토하는 절차이고, 심판청구는 국세청과 독립된 국무총리 소속 조세심판원의 조세심판관이 판단하는 절차입니다(국세기본법 §67).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 심사청구 vs 심판청구 (국세기본법 §61·§67·§68·§69)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">심사청구</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">심판청구</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">판단 주체</td>
                        <td className="p-3">국세청장(국세심사위원회)</td>
                        <td className="p-3">조세심판원(조세심판관회의)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">독립성</td>
                        <td className="p-3">과세관청 내부 재검토</td>
                        <td className="p-3">과세관청과 별도 독립 기구</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">중복 제기</td>
                        <td className="p-3">둘 중 하나만 선택 가능</td>
                        <td className="p-3">둘 중 하나만 선택 가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">서류 제출처</td>
                        <td className="p-3">처분청 경유 국세청장</td>
                        <td className="p-3">처분청 또는 조세심판원장(§69)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 어느 쪽을 선택하든 법적 효력과 이후 행정소송으로 가는 요건은 동일합니다. 실무적으로는 세액이 크거나 법률 쟁점이 복잡한 사건일수록 독립성이 있는 심판청구를 선호하는 경향이 있지만, 이는 절대적인 기준이 아니라 사안별 판단입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">불복 결과에도 불복하려면 행정소송으로 갈 수 있나요?</h2>
                <p>
                  갈 수 있습니다. 다만 국세 처분에 대한 행정소송은 심사청구나 심판청구(또는 감사원 심사청구)를 반드시 먼저 거쳐야 하는 필요적 전치주의가 적용됩니다(국세기본법 §56②). 이의신청만 거치고 곧바로 행정소송으로 갈 수는 없고, 심사청구나 심판청구 단계까지는 반드시 밟아야 합니다.
                </p>
                <p>
                  행정소송은 심사청구·심판청구 결정 통지를 받은 날부터 90일 이내에 제기해야 합니다(§56③). 결정기간 90일이 지났는데도 통지를 받지 못했다면, 통지를 기다리지 않고 그 결정기간이 지난 날부터 바로 행정소송을 낼 수 있습니다(§56③ 단서).
                </p>
                <p className="mt-4">
                  다만, 조세불복이 제기됐다고 해서 처분의 집행(징수·공매 등)이 자동으로 멈추는 것은 아닙니다. 원칙적으로 집행부정지이며(국세기본법 §57), 재결청이 필요하다고 인정할 때만 집행을 중지시킬 수 있습니다. 다만 결정이 확정되기 전에는 압류재산을 공매할 수 없다는 보호 규정이 국세징수법에 있어, 최종 결정 전에 재산이 강제로 처분되는 상황은 제한됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비용 부담 없이 도움받을 수 있나요?</h2>
                <p>
                  가능합니다. 국세기본법 §59의2는 일정 소득·재산 기준 이하인 납세자에게 세무사·변호사 등 국선대리인을 무료로 지원하는 제도를 두고 있습니다. 개인은 종합소득금액 5천만원 이하이면서 소유 재산가액 3천만원 이하일 때, 법인은 수입금액과 자산가액이 대통령령 기준 이하일 때 신청할 수 있습니다.
                </p>
                <p>
                  지원 대상은 이의신청인, 심사청구인, 심판청구인, 과세전적부심사 청구인이며, 관할 세무서나 국세청에 신청서를 내면 국선대리인 지원 여부를 심사받을 수 있습니다. 세무 대리인을 선임할 형편이 안 된다는 이유로 불복 자체를 포기할 필요는 없습니다.
                </p>
                <p className="mt-4">
                  다만, 국선대리인 제도는 신청한다고 자동으로 배정되는 것이 아니라 소득·재산 기준 충족 여부를 심사한 뒤 지원 여부가 결정됩니다. 기준을 초과하면 지원 대상에서 제외되므로, 신청 전에 본인의 종합소득금액과 재산가액을 먼저 확인하는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/tax-audit-selection-criteria-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세무조사 선정 기준 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">불복으로 이어지는 세무조사 대상 선정 방식.</p>
                  </Link>
                  <Link
                    href="/guide/income-tax-correction-claim-5-year-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 경정청구 5년</div>
                    <p className="mt-1 text-sm text-text-secondary">별도 처분 없이 스스로 신고 오류를 바로잡는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/income-tax-late-filing-penalty-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 무신고·과소신고 가산세</div>
                    <p className="mt-1 text-sm text-text-secondary">불복 대상이 되는 가산세 부과 구조 이해하기.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">경정된 세액이 적정한지 직접 계산해 비교해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/vat/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가가치세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세 경정처분의 세액 산출 근거를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·양도세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개별 사안에 대한 세무·법률 자문이 아닙니다. 실제 불복 절차의 요건·서류·기한 계산은 사안별로 달라질 수 있으므로 관할 세무서, 국세청 또는 세무사·변호사와 상담해 확인하세요. 본 콘텐츠는 2026-09-09를 기준으로 작성됐으며, 인용 법조항: 국세기본법 §55(불복), §56(다른 법률과의 관계), §57(불복청구와 집행의 관계), §59의2(국선대리인), §61(청구기간), §65(결정), §66(이의신청), §67(조세심판원), §68(청구기간), §69(청구 절차), §81의15(과세전적부심사).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 누리집(납세자권리구제 제도)</a>.
                </p>
              </section>

              <ShareButtons
                title="조세불복 절차 2026 가이드"
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
