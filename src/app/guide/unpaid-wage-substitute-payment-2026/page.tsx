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

const URL = 'https://calculatorhost.com/guide/unpaid-wage-substitute-payment-2026/';
const DATE_PUBLISHED = '2026-08-01';
const DATE_MODIFIED = '2026-08-01';

export const metadata: Metadata = {
  title: '임금체불 대지급금 2026, 간이대지급금 최대 1,000만원 신청',
  description:
    '임금을 못 받으면 국가가 대신 지급하는 대지급금 제도가 있습니다. 간이대지급금 상한 1,000만원, 재직자·퇴직자 요건, 신청 절차를 임금채권보장법 §7·§7의2 기준으로 정리했습니다.',
  keywords: [
    '임금체불 대지급금',
    '간이대지급금',
    '소액체당금',
    '대지급금 신청',
    '임금채권보장법',
    '체불임금 1000만원',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '임금체불 대지급금 2026, 간이대지급금 최대 1,000만원 신청' }],
    title: '임금체불 대지급금 2026, 최대 1,000만원',
    description: '임금을 못 받으면 국가가 대신 지급. 간이대지급금 상한 1,000만원, 요건과 신청 절차를 임금채권보장법으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '임금체불 대지급금 2026',
    description: '간이대지급금 최대 1,000만원. 재직자·퇴직자 요건과 신청 절차 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '대지급금이 무엇인가요?',
    answer:
      '임금이나 퇴직금을 못 받은 근로자에게 국가가 사업주 대신 먼저 지급하는 제도입니다(임금채권보장법). 국가가 지급한 뒤 사업주에게 구상권을 행사합니다. 사업주 도산 시 지급하는 도산대지급금과, 도산과 무관하게 판결·확인만으로 지급하는 간이대지급금으로 나뉩니다.',
  },
  {
    question: '간이대지급금은 최대 얼마까지 받나요?',
    answer:
      '최대 1,000만원입니다(임금채권보장법 §7의2). 임금(휴업수당·출산전후휴가급여 포함) 항목이 최대 700만원, 퇴직급여 항목이 최대 700만원이며, 두 항목을 합쳐 총 1,000만원 한도로 지급됩니다. 재직 중인 근로자는 퇴직급여 항목이 제외됩니다.',
  },
  {
    question: '퇴직해야만 신청할 수 있나요?',
    answer:
      '아닙니다. 퇴직자뿐 아니라 재직 중인 근로자도 신청할 수 있습니다. 다만 재직자는 마지막 임금 체불 당시 시간당 통상임금이 최저임금의 110% 미만이어야 하고, 퇴직급여 항목은 받을 수 없습니다. 퇴직자는 소득 요건 없이 임금과 퇴직급여를 모두 청구할 수 있습니다.',
  },
  {
    question: '어떤 임금까지 받을 수 있나요?',
    answer:
      '최종 3개월분의 임금·휴업수당·출산전후휴가급여와 최종 3년분의 퇴직급여가 대상입니다. 이 범위 안에서 간이대지급금은 임금 700만원, 퇴직급여 700만원, 합계 1,000만원 한도로 지급됩니다. 체불액이 한도를 넘으면 초과분은 별도로 사업주에게 청구해야 합니다.',
  },
  {
    question: '신청하려면 무엇이 필요한가요?',
    answer:
      '지방고용노동관서에서 발급하는 체불 임금등·사업주 확인서 또는 법원의 확정판결 등 집행권원이 필요합니다. 먼저 고용노동부에 진정을 제기해 체불을 확인받거나 소송으로 판결을 받은 뒤, 근로복지공단에 간이대지급금을 신청하는 순서로 진행됩니다.',
  },
  {
    question: '신청 기한이 있나요?',
    answer:
      '있습니다. 퇴직자는 퇴직일 다음 날부터 2년 이내에 판결 등 집행권원을 신청하거나 1년 이내에 진정 등을 제기해야 합니다. 재직자도 마지막 체불일 다음 날부터 동일한 기한이 적용됩니다. 기한을 넘기면 대지급금을 받지 못할 수 있으므로 체불이 확인되면 빨리 절차를 시작해야 합니다.',
  },
  {
    question: '사업주 요건도 있나요?',
    answer:
      '네, 사업주가 산업재해보상보험법 적용 대상으로서 해당 근로자의 퇴직일(재직자는 마지막 체불일)까지 6개월 이상 사업을 운영했어야 합니다. 사업 기간이 짧거나 적용 대상이 아니면 간이대지급금 요건을 충족하지 못할 수 있습니다.',
  },
  {
    question: '대지급금을 받으면 나머지는 못 받나요?',
    answer:
      '아닙니다. 대지급금은 체불액 중 한도까지만 먼저 지급하는 것이므로, 한도를 넘는 나머지 체불액은 여전히 사업주에게 청구할 권리가 남습니다. 민사소송이나 강제집행으로 초과분을 회수할 수 있습니다.',
  },
];

export default function UnpaidWageSubstitutePayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '임금체불 대지급금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '임금체불 대지급금 2026, 간이대지급금 최대 1,000만원 신청',
    description:
      '임금체불 시 국가가 대신 지급하는 대지급금 제도. 간이대지급금 상한 1,000만원(임금 700+퇴직 700), 재직자·퇴직자 요건, 신청 절차를 임금채권보장법 §7·§7의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['임금체불', '대지급금', '간이대지급금', '임금채권보장법', '근로복지공단'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '임금체불 대지급금 2026',
    description:
      '임금을 못 받았을 때 국가가 대신 지급하는 간이대지급금 상한·요건·절차를 정리한 실전 가이드.',
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
                    { name: '임금체불 대지급금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임금을 못 받은 근로자 · 7분 읽기 · 2026-08-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  임금체불 대지급금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">간이대지급금 최대 1,000만원</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  회사가 월급이나 퇴직금을 주지 않고 버틸 때, 사업주에게 소송을 걸어 받아내기까지는 오래 걸립니다. 이때 국가가 사업주를 대신해 일정 금액을 먼저 지급하는 제도가 대지급금입니다. 이 가이드는 임금을 못 받은 근로자가 간이대지급금으로 최대 얼마까지, 어떤 요건과 절차로 받을 수 있는지, 재직자와 퇴직자가 어떻게 다른지를 실무 관점에서 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대지급금은 어떤 제도인가요?</h2>
                <p>
                  임금을 못 받은 근로자에게 국가가 사업주 대신 먼저 지급하는 제도입니다. 임금채권보장법에 근거하며, 국가(근로복지공단)가 체불 임금 일부를 지급한 뒤 사업주에게 구상합니다. 근로자는 사업주의 자금 사정과 무관하게 최소한의 생계 자금을 빠르게 확보할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">두 가지 유형</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    도산대지급금(§7): 사업주가 도산(파산·회생·사실상 도산)한 경우 지급
                    <br />
                    간이대지급금(§7의2): 도산과 무관하게 체불 확인서나 확정판결만으로 지급, 최대 1,000만원
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이대지급금은 최대 얼마인가요?</h2>
                <p>
                  최대 1,000만원입니다. 임금채권보장법 §7의2에 따른 간이대지급금은 임금 항목과 퇴직급여 항목으로 나뉘며, 두 항목을 합쳐 총 1,000만원 한도로 지급됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 간이대지급금 항목별 상한 (임금채권보장법 §7의2 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상 범위</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임금·휴업수당·출산전후휴가급여</td>
                        <td className="p-3"><strong>700만원</strong></td>
                        <td className="p-3">최종 3개월분</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">퇴직급여</td>
                        <td className="p-3"><strong>700만원</strong></td>
                        <td className="p-3">최종 3년분 (재직자 제외)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">합계 상한</td>
                        <td className="p-3"><strong>1,000만원</strong></td>
                        <td className="p-3">두 항목 합산 한도</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 각 항목 상한(700만원)을 모두 채워도 합계는 1,000만원을 넘을 수 없습니다. 예컨대 임금 700만원과 퇴직급여 700만원이 모두 체불돼도 실제 지급은 1,000만원까지입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재직자와 퇴직자는 무엇이 다른가요?</h2>
                <p>
                  퇴직 여부에 따라 대상 항목과 요건이 다릅니다. 퇴직자는 임금과 퇴직급여를 모두 청구할 수 있지만, 재직자는 임금 항목만 받을 수 있고 소득 요건이 붙습니다.
                </p>
                <p>
                  재직자는 마지막 임금 체불이 발생한 당시 시간당 통상임금이 최저임금의 110% 미만이어야 신청할 수 있습니다. 저임금 근로자를 우선 보호하려는 취지입니다. 퇴직자는 이런 소득 요건 없이 신청할 수 있습니다.
                </p>
                <p>
                  예외: 사업주 요건도 있습니다. 사업주가 산업재해보상보험법 적용 대상으로서 근로자의 퇴직일(재직자는 마지막 체불일)까지 6개월 이상 사업을 운영했어야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청 절차와 실제 지급 사례</h2>
                <p>
                  간이대지급금은 체불 확인이 먼저이고 신청이 나중입니다. 절차를 순서대로 정리하면 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신청 절차 (단계별)</p>
                  <p className="text-sm text-text-secondary">
                    1단계: 고용노동부에 임금체불 진정 제기 또는 민사소송 진행
                    <br />
                    2단계: 지방고용노동관서의 체불 임금등·사업주 확인서 발급 또는 법원 확정판결 확보
                    <br />
                    3단계: 근로복지공단에 간이대지급금 지급 청구
                    <br />
                    4단계: 심사 후 지급 (계좌 입금)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 퇴직자, 임금 900만원 체불</p>
                  <p className="text-sm text-text-secondary">
                    · 최종 3개월 임금 체불 900만원
                    <br />
                    · 임금 항목 상한 700만원 적용 → 간이대지급금 <strong>700만원</strong>
                    <br />
                    · 나머지 200만원: 사업주에게 별도 청구
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 한도 초과분은 대지급금으로 못 받지만 청구권은 남습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 퇴직자, 임금 500만원 + 퇴직금 800만원 체불</p>
                  <p className="text-sm text-text-secondary">
                    · 임금 항목: 500만원 (상한 700만원 이내 전액)
                    <br />
                    · 퇴직급여 항목: 800만원 중 상한 700만원까지
                    <br />
                    · 단순 합산은 1,200만원이지만 합계 상한 1,000만원 적용 → 실제 지급 <strong>1,000만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 각 항목 상한을 채워도 합계 1,000만원이 최종 한도입니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">신청 기한과 놓치기 쉬운 점</h2>
                <p>
                  기한을 넘기면 받지 못하므로 시점 관리가 중요합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>집행권원 신청 기한:</strong> 퇴직일(재직자는 마지막 체불일) 다음 날부터 2년 이내에 판결 등 집행권원을 신청해야 합니다.
                  </li>
                  <li>
                    <strong>진정 제기 기한:</strong> 같은 기산일부터 1년 이내에 고용노동부에 진정 등을 제기해야 합니다.
                  </li>
                  <li>
                    <strong>퇴직금은 재직자 제외:</strong> 재직 중에는 퇴직급여 항목을 받을 수 없고 임금 항목만 대상입니다.
                  </li>
                  <li>
                    <strong>초과분 회수:</strong> 대지급금 한도를 넘는 체불액은 사업주를 상대로 민사 절차로 회수해야 합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 도산대지급금(§7)은 상한과 요건이 간이대지급금과 다르므로, 사업주가 도산한 경우에는 도산대지급금 절차를 별도로 확인해야 합니다. 정확한 요건과 서식은 근로복지공단과 고용노동부에서 안내받으세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/severance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">평균임금과 근속연수로 퇴직금을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/severance-pay-deadline-14-days-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 지급기한 14일</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 후 14일 지급 원칙과 지연이자.</p>
                  </Link>
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 후 구직급여 수급 요건과 금액.</p>
                  </Link>
                  <Link
                    href="/guide/minimum-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">최저임금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">재직자 대지급금 요건의 기준이 되는 최저임금.</p>
                  </Link>
                  <Link
                    href="/guide/ordinary-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">통상임금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">재직자 요건에 쓰이는 통상임금의 개념.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직·수당·4대보험 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률 조언이 아닙니다. 대지급금 상한, 재직자 소득 요건, 사업주 요건, 신청 기한과 서식은 개별 사정에 따라 달라지므로, 반드시 근로복지공단·고용노동부에서 확인하고 필요하면 공인노무사 등 전문가 상담을 받으세요. 본 콘텐츠의 기준은 <strong>임금채권보장법 §7(도산대지급금)</strong>과 <strong>임금채권보장법 §7의2(간이대지급금)</strong>를 따르며, 2026-08-01 기준으로 작성되었습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(임금채권보장법)</a>,{' '}
                  <a href="https://www.comwel.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">근로복지공단</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="임금체불 대지급금 2026 가이드"
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
