// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/sickness-benefit-2026/';
const DATE_PUBLISHED = '2026-08-12';
const DATE_MODIFIED = '2026-08-12';

export const metadata: Metadata = {
  title: '상병수당 2026, 아파서 쉬어도 받는 지원금 신청 조건',
  description:
    '업무 외 질병·부상으로 일하지 못할 때 소득을 보전해 주는 상병수당 시범사업. 하루 지원금액, 신청 자격, 시범 지역, 대기기간과 신청 방법을 국민건강보험법 §50 부가급여 기준으로 정리했습니다.',
  keywords: [
    '상병수당',
    '상병수당 신청',
    '상병수당 금액',
    '상병수당 시범사업',
    '아파서 쉬면 지원금',
    '상병수당 지역',
    '국민건강보험법 50조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상병수당 2026, 아파서 쉬어도 받는 지원금 신청 조건' }],
    title: '상병수당 2026, 아파서 쉬어도 하루 최대 6만원대 받는 법',
    description: '업무 외 질병으로 일 못할 때 소득 보전. 시범지역 취업자 대상, 평균임금 60% 지급. 국민건강보험법 §50.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상병수당 2026 신청 조건과 금액',
    description: '아파서 일 못 쉴 때 소득 보전하는 상병수당 시범사업. 지역·금액·신청 방법 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상병수당은 하루에 얼마를 받나요?',
    answer:
      '시범사업 3단계 지역은 직전 3개월 평균임금의 60%를 지급하되, 하루 하한 48,150원(2025년 최저임금의 60%)에서 상한 66,000원 사이에서 지급됩니다. 2단계 지역은 하루 48,150원 정액입니다. 금액은 시범사업 단계와 연도별 공고에 따라 달라질 수 있으므로 신청 전 국민건강보험공단 공고를 확인하세요.',
  },
  {
    question: '상병수당은 누가 신청할 수 있나요?',
    answer:
      '시범사업 지역에 거주하는 취업자이거나 시범사업 지역 소재 사업장에 근무하는 근로자(거주지 무관)여야 합니다. 만 15세 이상 65세 미만 대한민국 국적자가 대상이며, 건강보험 직장가입자, 고용보험 또는 산재보험 가입자, 일정 매출 기준을 충족하는 자영업자가 취업 요건을 인정받습니다.',
  },
  {
    question: '어느 지역에서 상병수당을 신청할 수 있나요?',
    answer:
      '상병수당은 아직 전국 제도가 아니라 시범사업 지역에서만 운영됩니다. 단계별로 시범 지역이 확대되어 왔으며, 3단계 지역과 이전 단계 지역을 합쳐 여러 지역에서 시행 중입니다. 본인 거주지나 사업장이 시범 지역인지 여부는 국민건강보험공단 또는 정부24에서 확인해야 합니다.',
  },
  {
    question: '상병수당에도 대기기간이 있나요?',
    answer:
      '네, 일정 기간의 대기기간이 지난 뒤부터 지급됩니다. 시범사업은 여러 모형으로 운영되어 대기기간(예: 근로활동 불가 기간 기준 일부 일수)과 최대 지급일수가 모형마다 다릅니다. 정확한 대기기간과 최대 지급일수는 본인이 해당하는 시범 지역의 적용 모형 공고를 확인해야 합니다.',
  },
  {
    question: '산재보험이나 실업급여와 함께 받을 수 있나요?',
    answer:
      '상병수당은 업무 외 질병·부상으로 인한 소득 손실을 보전하는 제도라, 업무상 재해를 다루는 산재보험 요양급여·휴업급여를 받는 기간에는 원칙적으로 중복 지급되지 않습니다. 실업급여, 생계급여 등 다른 공적 급여와의 중복 조정 기준도 있으므로, 이미 다른 급여를 받고 있다면 신청 전 공단에 중복 여부를 문의하세요.',
  },
  {
    question: '상병수당은 어떻게 신청하나요?',
    answer:
      '의료기관에서 근로활동 불가 진단을 받아 상병수당 신청용 진단서를 발급받은 뒤, 국민건강보험공단에 신청서와 함께 제출합니다. 신청은 공단 지사 방문, 우편, 팩스 등으로 접수할 수 있으며, 심사를 거쳐 지급 여부가 결정됩니다. 진단서 발급 비용과 서류 요건은 사전에 확인하는 것이 좋습니다.',
  },
  {
    question: '자영업자도 상병수당을 받을 수 있나요?',
    answer:
      '네, 일정 기준을 충족하는 자영업자도 대상입니다. 시범사업 기준으로 직전 3개월 동안 사업자등록을 유지하고 직전 3개월 월평균 매출액이 일정 금액 이상(예: 206만원 이상)인 경우 취업자로 인정됩니다. 구체적 매출 기준과 증빙은 공고에 따라 다를 수 있으므로 공단 확인이 필요합니다.',
  },
  {
    question: '상병수당은 언제 전국으로 확대되나요?',
    answer:
      '상병수당은 본사업 도입을 목표로 여러 단계의 시범사업을 통해 적정 지급 수준과 재정 소요를 검증하는 단계입니다. 전국 확대 시점과 최종 제도 설계는 정부 발표에 따라 달라지므로, 소관 부처인 보건복지부와 국민건강보험공단의 공식 안내를 참고하세요.',
  },
];

export default function SicknessBenefit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상병수당 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상병수당 2026, 아파서 쉬어도 받는 지원금 신청 조건',
    description:
      '업무 외 질병·부상으로 일하지 못할 때 소득을 보전하는 상병수당 시범사업의 지급액, 신청 자격, 시범 지역, 대기기간과 신청 방법을 국민건강보험법 §50 부가급여 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상병수당', '시범사업', '소득 보전', '국민건강보험공단', '국민건강보험법 50조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상병수당 2026',
    description:
      '상병수당 시범사업의 지급액·신청 자격·시범 지역·신청 방법을 정리한 가이드.',
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
                    { name: '상병수당 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로자·자영업자 · 7분 읽기 · 2026-08-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상병수당 2026
                  <br />
                  <span className="text-2xl text-text-secondary">아파서 쉬어도 받는 소득 보전 지원금</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  독감이나 골절로 몇 주 동안 일을 못 하면 당장 생활비가 걱정됩니다. 상병수당은 바로 이런 상황, 즉 업무와 관계없는 질병이나 부상으로 일하지 못할 때 소득의 일부를 보전해 주는 제도입니다. 아직 전국이 아니라 시범 지역에서만 운영되므로, 이 가이드는 내가 받을 수 있는지, 하루에 얼마를 받는지, 어떻게 신청하는지를 국민건강보험법 §50 부가급여를 근거로 하나씩 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-sickness-benefit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상병수당이란 무엇인가요?</h2>
                <p>
                  상병수당은 업무 외 질병이나 부상으로 일을 하지 못하는 기간에 소득을 보전해 주는 사회보장 제도입니다. 근거는 국민건강보험법 §50의 부가급여 규정이며, 현재 보건복지부와 국민건강보험공단이 본사업 도입 전 단계로 시범사업을 운영하고 있습니다.
                </p>
                <p>
                  산업재해보상보험이 업무상 재해를 다룬다면, 상병수당은 업무와 무관한 질병(감기, 골절, 수술 회복 등)으로 인한 소득 공백을 메우는 데 초점이 있습니다. 아파도 쉬면 소득이 끊기니 참고 일하는 문제를 줄이려는 취지입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 줄 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    상병수당 = 업무 외 질병·부상으로 일 못 할 때, 시범 지역 취업자에게 평균임금의 60% 수준을 지급하는 소득 보전 제도.
                  </p>
                </div>
                <p>
                  다만 상병수당은 전 국민 대상 제도가 아직 아닙니다. 시범사업 지역에 거주하거나 그 지역 사업장에서 일하는 사람만 신청할 수 있다는 점을 먼저 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">하루에 얼마를 받나요?</h2>
                <p>
                  지급액은 시범사업 단계에 따라 정액형과 정률형으로 나뉩니다. 아래 표는 시범사업 공고 기준을 정리한 것으로, 실제 금액은 연도별 최저임금과 공고에 따라 조정될 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상병수당 시범사업 단계별 지급 방식 (공고 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급 방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">하루 금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2단계 지역</td>
                        <td className="p-3">정액</td>
                        <td className="p-3">48,150원 (2025년 최저임금의 60%)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3단계 지역</td>
                        <td className="p-3">직전 3개월 평균임금의 60%</td>
                        <td className="p-3">하한 48,150원, 상한 66,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  즉 3단계 지역에서는 평균임금이 높을수록 더 많이 받되 하루 상한 66,000원까지, 낮으면 하한 48,150원까지 보장되는 구조입니다.
                </p>
                <p>
                  예외: 위 금액은 시범사업 기준이며, 최저임금 인상이나 본사업 전환에 따라 하한·상한이 바뀔 수 있습니다. 신청 시점의 정확한 금액은 국민건강보험공단 공고로 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 신청할 수 있나요?</h2>
                <p>
                  신청 자격은 크게 지역 요건, 연령 요건, 취업 요건 세 가지를 모두 충족해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>지역 요건:</strong> 시범사업 지역에 거주하는 취업자이거나, 시범사업 지역 소재 사업장에 근무하는 근로자(거주지 무관).
                  </li>
                  <li>
                    <strong>연령 요건:</strong> 만 15세 이상 65세 미만 대한민국 국적자.
                  </li>
                  <li>
                    <strong>취업 요건:</strong> 건강보험 직장가입자, 고용보험 또는 산재보험 가입자, 또는 매출 기준을 충족하는 자영업자. 일용근로자는 별도 인정 기준이 적용됩니다.
                  </li>
                </ul>
                <p>
                  다만 공무원, 국민건강보험 직장가입자가 아닌 특정 직역, 이미 다른 공적 소득보전 급여를 받는 경우 등은 대상에서 제외되거나 조정될 수 있으므로, 본인 상황을 공단에 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청 방법과 필요한 서류</h2>
                <p>
                  상병수당 신청은 진단서 발급부터 시작합니다. 단계별로 정리하면 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신청 절차</p>
                  <p className="text-sm text-text-secondary">
                    1단계: 의료기관에서 진료를 받고 근로활동 불가 기간이 기재된 상병수당 신청용 진단서를 발급받습니다.
                    <br />
                    2단계: 상병수당 신청서와 진단서, 취업 사실 증빙 서류를 준비합니다.
                    <br />
                    3단계: 국민건강보험공단에 방문, 우편, 팩스 등으로 접수합니다.
                    <br />
                    4단계: 공단 심사 후 지급 여부와 지급일수가 결정되고, 요건 충족 기간에 대해 상병수당이 지급됩니다.
                  </p>
                </div>
                <p>
                  다만 진단서 발급 비용은 본인이 부담해야 하고, 근로활동 불가에 대한 의학적 판단이 지급의 핵심 기준이므로 진단 내용이 충실해야 심사가 원활합니다.
                </p>
              </section>

              <AdSlot slot="guide-sickness-benefit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">산재보험과 무엇이 다른가요?</h2>
                <p>
                  이름이 비슷해 헷갈리기 쉽지만 상병수당과 산재보험 급여는 적용 상황이 다릅니다. 아래 비교로 정리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 상병수당과 산재보험 휴업급여 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상병수당</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">산재보험 휴업급여</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대상 사유</td>
                        <td className="p-3">업무 외 질병·부상</td>
                        <td className="p-3">업무상 재해</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">운영 범위</td>
                        <td className="p-3">시범 지역 한정</td>
                        <td className="p-3">전국</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">지급 수준</td>
                        <td className="p-3">평균임금의 60% 수준</td>
                        <td className="p-3">평균임금의 70%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  즉 넘어져 다친 것이 출퇴근·업무 중 사고라면 산재보험을, 개인적인 질병이라면 상병수당을 검토하는 것이 기본 방향입니다. 두 급여를 동시에 받을 수는 없으므로 상황에 맞는 제도를 선택해야 합니다.
                </p>
                <p>
                  예외: 산재 승인 여부가 다투어지는 경우 등에서는 어느 제도가 유리한지 판단이 어려울 수 있으므로, 근로복지공단과 국민건강보험공단 양쪽에 문의해 확인하는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 후 소득 공백을 메우는 구직급여 조건을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/unpaid-wage-substitute-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임금체불 대지급금</div>
                    <p className="mt-1 text-sm text-text-secondary">사업장 사정으로 임금을 못 받을 때의 국가 지원.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">직장가입자·지역가입자 보험료 계산 기준.</p>
                  </Link>
                  <Link
                    href="/guide/family-care-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족돌봄휴가 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가족 간병으로 쉴 때 쓸 수 있는 휴가 제도.</p>
                  </Link>
                  <Link
                    href="/guide/maternity-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">출산전후휴가 급여</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 전후 휴가 기간의 소득 보전 급여.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·수당·휴가·4대보험 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 조언이 아닙니다. 상병수당은 시범사업으로 운영되어 지급액, 시범 지역, 대기기간, 최대 지급일수, 자영업자 매출 기준 등이 단계·연도별 공고에 따라 달라집니다. 본문의 금액과 기준은 시범사업 공고 기준으로, 신청 전 반드시 소관 부처 고시와 국민건강보험공단 공식 안내를 확인하세요. 본 콘텐츠는 2026-08-12 기준으로 작성되었습니다. 근거: <strong>국민건강보험법 §50(부가급여)</strong> 및 보건복지부 상병수당 시범사업 공고. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">보건복지부</a>,{' '}
                  <a href="https://www.nhis.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민건강보험공단</a>.
                </p>
              </section>

              <ShareButtons
                title="상병수당 2026 가이드"
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
