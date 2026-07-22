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

const URL = 'https://calculatorhost.com/guide/severance-pay-deadline-14-days-2026/';
const DATE_PUBLISHED = '2026-07-21';
const DATE_MODIFIED = '2026-07-21';

export const metadata: Metadata = {
  title: '퇴직금 지급기한 14일 2026, 안 주면 지연이자·신고방법',
  description:
    '퇴직금은 퇴직일부터 14일 이내에 지급해야 합니다. 기한을 넘기면 연 20% 지연이자가 붙고, 미지급 시 사업주는 형사처벌 대상입니다. 지급기한, 지연이자, 노동청 신고 절차를 근로자퇴직급여보장법 §9 기준으로 정리했습니다.',
  keywords: [
    '퇴직금 지급기한',
    '퇴직금 14일',
    '퇴직금 안주면',
    '퇴직금 지연이자',
    '퇴직금 미지급 신고',
    '퇴직금 소멸시효',
    '근로자퇴직급여보장법 9조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '퇴직금 지급기한 14일 2026' }],
    title: '퇴직금 지급기한 14일 2026, 안 주면 지연이자·신고',
    description:
      '퇴직금은 퇴직일부터 14일 이내 지급. 넘기면 연 20% 지연이자, 미지급 시 형사처벌. 근로자퇴직급여보장법 §9.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '퇴직금 지급기한 14일 2026',
    description: '퇴직일부터 14일 이내 지급, 지연 시 연 20% 이자. 안 주면 노동청 신고. 근퇴법 §9.',
  },
};

const FAQ_ITEMS = [
  {
    question: '퇴직금은 언제까지 받아야 하나요?',
    answer:
      '퇴직한 날부터 14일 이내에 지급받아야 합니다(근로자퇴직급여보장법 §9①). 이 기한은 급여일이나 4대보험 정산일과 무관하며, 마지막 근무일 다음 날부터 14일을 셉니다. 다만 근로자와 사용자가 특별한 사정으로 합의하면 지급 기일을 연장할 수 있습니다.',
  },
  {
    question: '14일이 지나도 안 주면 어떻게 되나요?',
    answer:
      '지급 기한(14일) 다음 날부터 실제 지급일까지 연 20%의 지연이자가 붙습니다(근로기준법 §37①, 시행령 §17). 예를 들어 퇴직금 1,000만원을 30일 늦게 주면 약 16만원의 지연이자가 추가됩니다. 이 지연이자는 퇴직으로 근로관계가 끝난 뒤의 미지급분에 적용됩니다.',
  },
  {
    question: '퇴직금을 안 주면 어디에 신고하나요?',
    answer:
      '사업장 관할 고용노동청(지방고용노동관서)에 임금체불 진정을 제기하면 됩니다. 고용노동부 홈페이지나 "노동포털"에서 온라인으로도 신청할 수 있습니다. 근로감독관이 사실관계를 조사해 사업주에게 지급을 지시하며, 그래도 지급하지 않으면 형사 입건됩니다.',
  },
  {
    question: '사업주가 퇴직금을 안 주면 처벌받나요?',
    answer:
      '네, 퇴직금을 지급하지 않은 사용자는 3년 이하의 징역 또는 3천만원 이하의 벌금에 처해집니다(근로자퇴직급여보장법 §44 제1호). 다만 이 죄는 반의사불벌죄로, 근로자가 처벌을 원하지 않는다는 의사를 명시하면 공소를 제기할 수 없습니다. 그래서 실무에서는 체불액을 지급하고 합의하는 경우가 많습니다.',
  },
  {
    question: '지급 기한을 연장할 수 있나요?',
    answer:
      '가능합니다. 근로자퇴직급여보장법 §9①은 "특별한 사정이 있는 경우 당사자 간 합의에 따라 지급기일을 연장할 수 있다"고 규정합니다. 다만 이는 근로자의 동의를 전제로 하며, 사용자가 일방적으로 미룰 수는 없습니다. 합의 없이 14일을 넘기면 그 자체로 지연이자와 체불 책임이 발생합니다.',
  },
  {
    question: '퇴직금 청구는 언제까지 할 수 있나요?',
    answer:
      '퇴직금 청구권의 소멸시효는 3년입니다(근로자퇴직급여보장법 §10). 퇴직한 날부터 3년이 지나면 청구권이 소멸하므로, 체불이 발생하면 미루지 말고 조속히 진정·청구를 진행하는 것이 안전합니다. 소멸시효는 진정 제기 등으로 중단될 수 있습니다.',
  },
  {
    question: '1년 미만 근무해도 퇴직금을 받나요?',
    answer:
      '아니요, 퇴직금은 계속근로기간이 1년 이상이고 4주 평균 주 15시간 이상 근로한 경우에 발생합니다(근로자퇴직급여보장법 §4). 1년 미만이면 원칙적으로 법정 퇴직금 지급 대상이 아닙니다. 다만 회사 취업규칙이나 근로계약에서 더 유리하게 정했다면 그에 따릅니다.',
  },
  {
    question: '퇴직연금(DC·DB)도 14일 규정이 적용되나요?',
    answer:
      '퇴직연금은 근로자 계정으로 부담금을 납입하는 구조여서 일시금 지급 절차가 다릅니다. 다만 확정급여형(DB)에서 퇴직 시 부족분을 지급하거나, 사용자가 부담금을 미납한 경우에도 미지급·지연에 대한 책임이 발생합니다(근퇴법 §44 제2호). 구체적 절차는 가입한 퇴직연금 규약과 운용사에 확인하세요.',
  },
];

export default function SeverancePayDeadline14Days2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '퇴직금 지급기한 14일 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '퇴직금 지급기한 14일 2026, 안 주면 지연이자·신고방법',
    description:
      '퇴직금은 퇴직일부터 14일 이내 지급. 넘기면 연 20% 지연이자, 미지급 시 형사처벌. 노동청 신고 절차와 소멸시효까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['퇴직금', '지급기한', '지연이자', '임금체불', '근로자퇴직급여보장법 9조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '퇴직금 지급기한 14일 2026',
    description: '퇴직일부터 14일 이내 지급, 지연 시 연 20% 이자, 미지급 신고 절차와 소멸시효 정리.',
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
                    { name: '퇴직금 지급기한 14일 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">퇴사 근로자 · 7분 읽기 · 2026-07-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  퇴직금 지급기한 14일 2026
                  <br />
                  <span className="text-2xl text-text-secondary">안 주면 연 20% 지연이자, 대응 방법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 퇴사했는데 퇴직금이 제때 들어오지 않아 불안한 근로자를 위한 것입니다. 퇴직금은 급여일과 관계없이 퇴직한 날부터 14일 이내에 지급해야 하는 법적 의무입니다. 기한이 지났을 때 붙는 지연이자, 노동청 신고 절차, 그리고 사업주가 받는 처벌까지 근거 조항과 함께 실전 위주로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-severance-pay-deadline-14-days-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">퇴직금은 언제까지 줘야 하나요?</h2>
                <p>
                  퇴직한 날부터 14일 이내입니다. 근로자퇴직급여보장법 §9①은 "사용자는 근로자가 퇴직한 경우 그 지급사유가 발생한 날부터 14일 이내에 퇴직금을 지급하여야 한다"고 명시합니다. 회사의 급여 지급일이나 4대보험 상실 신고와는 별개입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">14일 기한 핵심 정리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 기산점: 퇴직일(마지막 근무일) 다음 날
                    <br />
                    · 기한: 14일 이내 지급·정산 완료
                    <br />
                    · 예외: 당사자 합의로 지급기일 연장 가능(§9① 단서)
                    <br />
                    · 위반: 다음 날부터 연 20% 지연이자 + 형사책임
                  </p>
                </div>
                <p className="mt-4">
                  많은 분들이 "다음 급여일에 준다"는 말을 그대로 받아들이는데, 근로자가 동의하지 않았다면 그 자체가 법 위반입니다. 다만 실제로는 정산에 며칠이 걸릴 수 있으므로, 14일이 임박하면 회사에 지급 예정일을 서면으로 확인해 두는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">14일이 지나면 지연이자가 붙나요?</h2>
                <p>
                  네, 지급 기한 다음 날부터 실제 지급일까지 연 20%의 지연이자가 발생합니다(근로기준법 §37①, 시행령 §17). 이 이자는 퇴직으로 근로관계가 종료된 뒤의 미지급 임금·퇴직금에 적용되는 강행 규정입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 퇴직금 1,000만원, 30일 지연</p>
                  <p className="text-sm text-text-secondary">
                    · 지연일수: 14일 기한 이후 30일
                    <br />
                    · 지연이자 = 1,000만 × 20% × (30 ÷ 365) ≈ <strong>16만 4,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 늦어질수록 이자가 누적되므로 사업주도 조기 지급이 유리합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 퇴직금 3,000만원, 60일 지연</p>
                  <p className="text-sm text-text-secondary">
                    · 지연이자 = 3,000만 × 20% × (60 ÷ 365) ≈ <strong>98만 6,000원</strong>
                    <br />
                    · 원금 3,000만 + 이자 약 98.6만 = 약 3,098.6만원 청구 가능
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 금액이 크고 지연이 길수록 지연이자도 커집니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 천재지변, 도산·회생 절차 진행 등 대통령령으로 정한 사유가 있으면 그 기간에는 지연이자 규정 적용이 제외될 수 있습니다(근로기준법 시행령 §18). 이 경우에도 미지급 자체의 책임이 사라지는 것은 아닙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">퇴직금을 안 주면 어떻게 신고하나요?</h2>
                <p>
                  사업장 관할 고용노동청에 임금체불 진정을 제기하는 것이 기본 절차입니다. 아래 단계를 따르면 됩니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li><strong>증거 확보:</strong> 근로계약서, 급여명세서, 통장 입금 내역, 재직·퇴직 확인 자료를 모읍니다.</li>
                  <li><strong>진정 접수:</strong> 고용노동부 노동포털(labor.moel.go.kr) 또는 관할 노동청 방문으로 임금체불 진정을 제기합니다.</li>
                  <li><strong>근로감독관 조사:</strong> 감독관이 사업주를 불러 사실관계를 조사하고 지급을 지시합니다.</li>
                  <li><strong>미지급 시 형사 입건:</strong> 그래도 지급하지 않으면 근퇴법 §44 위반으로 입건·송치됩니다.</li>
                  <li><strong>체당금·소송:</strong> 사업주가 도산했다면 대지급금(체당금) 제도를, 다툼이 크면 민사소송을 병행할 수 있습니다.</li>
                </ol>
                <p className="mt-4">
                  다만 반의사불벌죄이므로, 합의로 체불액을 받으면 처벌 의사를 철회하는 것이 일반적입니다. 처벌만이 목적이 아니라 체불액 회수가 핵심이라면, 진정과 합의를 병행하는 전략이 현실적입니다.
                </p>
              </section>

              <AdSlot slot="guide-severance-pay-deadline-14-days-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재직 중 체불과 퇴직 후 체불, 지연이자가 다른가요?</h2>
                <p>
                  네, 지연이자 규정은 원칙적으로 "퇴직 후" 미지급분에 적용됩니다. 아래 표로 차이를 비교했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 재직 중 vs 퇴직 후 미지급 지연이자 비교 (근로기준법 §37)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지연이자율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">퇴직 후 미지급 임금·퇴직금</td>
                        <td className="p-3"><strong>연 20%</strong></td>
                        <td className="p-3">근로기준법 §37①, 시행령 §17</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">재직 중 임금 지연(민사)</td>
                        <td className="p-3">연 5~6% 수준</td>
                        <td className="p-3">민법·상법 법정이율</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  즉 퇴직 후 미지급에 대해 근로기준법이 연 20%라는 높은 지연이자를 두는 것은, 생계가 걸린 퇴직금·임금의 신속한 지급을 강제하기 위해서입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">퇴직금 소멸시효와 청구 전략</h2>
                <p>
                  퇴직금 청구권의 소멸시효는 3년입니다(근로자퇴직급여보장법 §10). 퇴직일부터 3년이 지나면 청구가 어려워지므로, 체불이 확인되면 최대한 빨리 진정 또는 청구에 나서야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>내용증명 발송:</strong> 진정 전에 지급 기한과 지연이자를 명시한 내용증명을 보내면 압박·증거 확보에 유리합니다.</li>
                  <li><strong>진정으로 시효 관리:</strong> 노동청 진정, 지급명령 신청 등으로 소멸시효 진행을 관리할 수 있습니다.</li>
                  <li><strong>대지급금 제도:</strong> 사업주가 도산·폐업했다면 국가가 일정액을 대신 지급하는 대지급금(간이 대지급금 포함)을 활용하세요.</li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">평균임금·근속으로 퇴직금을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직소득세 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">연분연승법으로 계산하는 퇴직소득세.</p>
                  </Link>
                  <Link
                    href="/guide/severance-vs-pension-dc-db/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">DC vs DB 퇴직연금</div>
                    <p className="mt-1 text-sm text-text-secondary">확정기여형·확정급여형의 차이 비교.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-pay-interim-settlement-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 중간정산</div>
                    <p className="mt-1 text-sm text-text-secondary">중간정산 가능 사유와 절차.</p>
                  </Link>
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여 조건</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴사 후 받는 구직급여 수급 조건.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·실수령액 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개별 노무·법률 자문이 아닙니다. 실제 지급기한 연장 합의 여부, 지연이자 산정, 진정·소송 절차는 사안에 따라 달라지므로 고용노동부(국번없이 1350) 또는 공인노무사·변호사와 상담하세요. 본 콘텐츠는 2026-07-21 기준이며 법령 개정 시 업데이트됩니다. 근거 법조항은 <strong>근로자퇴직급여보장법 §4(퇴직급여제도 설정)·§9(퇴직금의 지급)·§10(소멸시효)·§44(벌칙)</strong> 및 근로기준법 §37(미지급 임금 지연이자)입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://labor.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부 노동포털</a>.
                </p>
              </section>

              <ShareButtons
                title="퇴직금 지급기한 14일 2026 가이드"
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
