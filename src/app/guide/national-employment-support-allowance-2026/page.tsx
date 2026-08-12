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

const URL = 'https://calculatorhost.com/guide/national-employment-support-allowance-2026/';
const DATE_PUBLISHED = '2026-08-13';
const DATE_MODIFIED = '2026-08-13';

export const metadata: Metadata = {
  title: '국민취업지원제도 2026, 구직촉진수당 자격·신청법',
  description:
    '실업급여를 못 받는 구직자도 국민취업지원제도 1유형이면 구직촉진수당을 6개월간 받으며 취업 지원을 받습니다. 소득·재산 자격, 청년 완화 요건, 부양가족 추가, 신청 방법을 구직자취업촉진법 기준으로 정리했습니다.',
  keywords: [
    '국민취업지원제도',
    '구직촉진수당',
    '국민취업지원제도 자격',
    '구직촉진수당 신청',
    '취업지원 수당',
    '고용24 신청',
    '구직자취업촉진법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민취업지원제도 2026, 구직촉진수당 자격·신청법' }],
    title: '국민취업지원제도 2026, 구직촉진수당 자격과 신청 방법',
    description: '실업급여 못 받는 구직자도 6개월 수당 + 취업 지원. 소득·재산 요건, 청년 완화, 부양가족 추가.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민취업지원제도 2026, 구직촉진수당 자격·신청법',
    description: '실업급여 못 받는 구직자도 6개월 수당 + 취업 지원. 소득·재산 요건과 신청 방법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국민취업지원제도가 무엇인가요?',
    answer:
      '국민취업지원제도는 실업급여의 사각지대에 있는 저소득 구직자에게 소득을 지원하면서 취업을 돕는 제도입니다(구직자 취업촉진 및 생활안정지원에 관한 법률). 1유형은 구직촉진수당을 지급하며, 2유형은 취업활동비용을 지원합니다. 고용보험 실업급여를 받지 못하는 사람도 요건을 갖추면 참여할 수 있습니다.',
  },
  {
    question: '1유형과 2유형은 어떻게 다른가요?',
    answer:
      '1유형은 소득·재산 요건을 충족한 사람에게 구직촉진수당(월 단위, 6개월)을 지급하고 취업지원 서비스를 제공합니다. 2유형은 1유형보다 요건이 넓은 대신 수당 대신 취업활동비용과 직업훈련 참여수당 등을 지원합니다. 소득이 낮고 지원이 절실할수록 1유형에 해당할 가능성이 높습니다.',
  },
  {
    question: '구직촉진수당은 얼마를 받나요?',
    answer:
      '1유형 참여자는 구직촉진수당을 6개월간 매월 지급받습니다. 2026년 기준 월 지급액은 고용노동부가 정하는 금액이며, 부양가족이 있으면 1인당 월 10만원씩 일정 한도까지 추가될 수 있습니다. 정확한 금액과 추가 요건은 고용24와 고용노동부 안내를 반드시 확인하세요.',
  },
  {
    question: '신청 자격(소득·재산)은 어떻게 되나요?',
    answer:
      '1유형은 만 15세부터 69세 구직자 중 가구 기준 중위소득 60% 이하, 가구 재산이 일정 기준 이하인 경우가 대상입니다. 최근 일정 기간 취업 경험 요건도 있습니다. 자격 기준선은 매년 조정되므로 신청 전 고용24에서 본인 해당 여부를 확인하는 것이 정확합니다.',
  },
  {
    question: '청년은 요건이 완화된다고 하던데요?',
    answer:
      '네, 청년층(대체로 만 18세부터 34세)은 소득·재산 요건이 완화 적용됩니다. 일반 대상보다 넓은 소득 기준(중위소득 120% 수준)과 재산 기준이 적용되어, 사회에 막 진입하는 청년이 참여하기 쉽도록 설계되어 있습니다. 구체적 연령·기준은 고용노동부 고시로 정해집니다.',
  },
  {
    question: '신청은 어디서 하나요?',
    answer:
      '고용24 웹사이트나 앱에서 온라인으로 신청하거나, 거주지 관할 고용센터를 방문해 신청할 수 있습니다. 신청 후 자격 심사에 통상 3주에서 4주가 걸리며, 선정되면 상담을 거쳐 취업활동계획을 수립합니다. 신분증과 소득·재산 관련 서류를 준비하세요.',
  },
  {
    question: '수당만 받으면 되나요, 다른 의무가 있나요?',
    answer:
      '수당을 받으려면 취업활동계획(IAP)에 따라 구직활동 의무를 이행해야 합니다. 정해진 구직활동이나 직업훈련에 성실히 참여하지 않으면 수당이 중단될 수 있습니다. 단순 현금 지원이 아니라 취업을 전제로 한 지원이라는 점을 기억해야 합니다.',
  },
  {
    question: '취업에 성공하면 별도 혜택이 있나요?',
    answer:
      '조기취업성공수당 등 취업을 유도하는 추가 지원이 있습니다. 남은 수당이 있는 상태에서 조기 취업하고 일정 기간 근속하면 추가 수당을 받을 수 있습니다. 근속 기간에 따라 지급되는 구조이며, 구체적 금액과 조건은 고용24에서 확인하세요.',
  },
  {
    question: '실업급여와 동시에 받을 수 있나요?',
    answer:
      '원칙적으로 실업급여(구직급여)를 받는 기간에는 구직촉진수당을 중복해서 받을 수 없습니다. 국민취업지원제도는 실업급여를 받지 못하는 사각지대 구직자를 위한 제도이기 때문입니다. 실업급여 수급이 끝난 뒤 요건을 갖추면 참여를 검토할 수 있습니다.',
  },
];

export default function NationalEmploymentSupportAllowance2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민취업지원제도 구직촉진수당 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민취업지원제도 2026, 구직촉진수당 자격과 신청 방법',
    description:
      '실업급여 사각지대 구직자를 위한 국민취업지원제도. 1유형 구직촉진수당의 소득·재산 요건, 청년 완화, 부양가족 추가, 조기취업성공수당, 신청 방법을 구직자취업촉진법 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민취업지원제도', '구직촉진수당', '취업지원', '고용24', '청년'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민취업지원제도 구직촉진수당 2026',
    description:
      '국민취업지원제도 1유형 구직촉진수당의 자격, 지급 구조, 청년 완화, 신청 방법과 구직활동 의무.',
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
                    { name: '국민취업지원제도 구직촉진수당 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">구직자 · 8분 읽기 · 2026-08-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민취업지원제도 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 구직촉진수당 자격과 신청법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  실업급여를 받을 조건이 안 되는 구직자에게도 소득을 보전하며 취업을 돕는 제도가 있습니다. 바로 국민취업지원제도입니다. 이 가이드는 1유형 구직촉진수당의 소득·재산 자격, 청년 완화 요건, 부양가족 추가, 신청 방법과 구직활동 의무까지 실전 순서로 정리합니다. 대상 독자는 실업급여 사각지대에 있는 구직자와 사회 초년 청년입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국민취업지원제도란 무엇인가요?</h2>
                <p>
                  국민취업지원제도는 실업급여를 받지 못하는 저소득 구직자에게 생계를 지원하면서 취업 서비스를 제공하는 제도입니다. 근거 법은 구직자 취업촉진 및 생활안정지원에 관한 법률입니다. 고용보험에 가입하지 못했거나 수급 요건을 채우지 못한 사람도 요건만 맞으면 참여할 수 있어, 이른바 한국형 실업부조로 불립니다.
                </p>
                <p>
                  지원은 크게 두 갈래입니다. 소득·재산 요건을 갖춘 1유형은 구직촉진수당을 받고, 요건이 완화된 2유형은 취업활동비용을 지원받습니다. 두 유형 모두 취업상담과 직업훈련 연계 서비스가 함께 제공됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    대상: 실업급여를 못 받는 저소득 구직자.
                    <br />
                    1유형: 구직촉진수당(월 단위) 6개월 + 취업지원.
                    <br />
                    자격: 15세부터 69세, 중위소득 60% 이하(청년 완화).
                    <br />
                    신청: 고용24 온라인 또는 고용센터 방문.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1유형과 2유형, 무엇이 다른가요?</h2>
                <p>
                  가장 큰 차이는 현금성 수당의 유무입니다. 1유형은 매월 구직촉진수당을 받고, 2유형은 수당 대신 훈련·활동에 드는 비용을 지원받습니다. 소득이 낮고 지원이 절실할수록 1유형에 해당할 가능성이 큽니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 국민취업지원제도 1유형 vs 2유형 (구직자취업촉진법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">1유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2유형</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주요 지원</td>
                        <td className="p-3">구직촉진수당(6개월)</td>
                        <td className="p-3">취업활동비용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">소득 요건</td>
                        <td className="p-3">중위소득 60% 이하</td>
                        <td className="p-3">1유형보다 넓음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공통</td>
                        <td className="p-3" colSpan={2}>취업상담·직업훈련 연계 서비스 제공</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 유형 판정은 소득·재산·취업경험을 종합해 이루어지므로, 스스로 판단하기 어렵다면 고용센터 상담을 통해 정확한 해당 유형을 확인하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">구직촉진수당은 얼마이고 어떻게 받나요?</h2>
                <p>
                  1유형 참여자는 구직촉진수당을 6개월간 매월 받습니다. 부양가족이 있으면 1인당 월 10만원씩 일정 한도까지 더해집니다. 2026년 기준 기본 지급액은 고용노동부가 정하며, 최근 인상 논의가 있으므로 정확한 금액은 반드시 고용24에서 확인해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 부양가족 2명이 있는 1유형 참여자(구조 예시)</p>
                  <p className="text-sm text-text-secondary">
                    · 기본 구직촉진수당: 월 기본액(고용노동부 고시)
                    <br />
                    · 부양가족 추가: 2명 × 월 10만원 = 월 20만원
                    <br />
                    · 지급 기간: 6개월
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 부양가족이 있으면 매월 수당이 늘어납니다. 부양가족은 미성년자·고령자·중증장애인 등으로 한정되며, 정확한 기본액은 고용24에서 확인하세요.</span>
                  </p>
                </div>
                <p className="mt-4">
                  주의: 위 예시는 지급 구조를 보여 주기 위한 것으로, 구체적 금액은 연도별 고시에 따라 달라집니다. 이 가이드는 특정 금액을 확정적으로 안내하지 않으므로, 신청 전 고용24 또는 고용노동부 상담센터(국번 없이 1350)에서 최신 금액을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 신청할 수 있나요? (소득·재산·청년 완화)</h2>
                <p>
                  1유형은 만 15세부터 69세 구직자 중 가구 중위소득 60% 이하, 가구 재산이 일정 기준 이하인 경우가 대상입니다. 최근 일정 기간 취업 경험 요건도 함께 봅니다. 청년은 이 문턱이 낮아집니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>일반 대상:</strong> 15세부터 69세, 중위소득 60% 이하, 재산 기준 이하, 취업경험 요건.
                  </li>
                  <li>
                    <strong>청년 특례:</strong> 대체로 18세부터 34세는 소득 기준이 중위소득 120% 수준까지 완화되고 재산 기준도 넓게 적용됩니다.
                  </li>
                  <li>
                    <strong>2유형:</strong> 1유형 요건을 못 채워도 특정 계층(청년·중장년 등)은 2유형으로 참여 가능.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 소득·재산 기준선과 청년 연령 범위는 매년 고시로 조정됩니다. 본인 해당 여부는 고용24의 자가진단이나 고용센터 상담으로 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청 방법과 구직활동 의무는 무엇인가요?</h2>
                <p>
                  신청은 고용24 온라인 또는 고용센터 방문으로 합니다. 신청 후 자격 심사에 보통 3주에서 4주가 걸리고, 선정되면 상담을 거쳐 취업활동계획을 세웁니다. 이후 계획에 따른 구직활동을 이행해야 수당이 계속 지급됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>신청:</strong> 고용24(work24.go.kr) 로그인 후 신청, 또는 거주지 고용센터 방문.
                  </li>
                  <li>
                    <strong>심사:</strong> 소득·재산·취업경험 확인(약 3~4주 소요).
                  </li>
                  <li>
                    <strong>계획 수립:</strong> 담당자와 취업활동계획(IAP) 작성.
                  </li>
                  <li>
                    <strong>이행:</strong> 구직활동·직업훈련 성실 참여 시 수당 지급, 취업 성공 시 조기취업성공수당.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 정당한 사유 없이 구직활동 의무를 이행하지 않으면 수당이 중단될 수 있습니다. 단순 현금 지원이 아니라 취업을 전제로 한 지원이라는 점을 유념하세요.
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
                    <p className="mt-1 text-sm text-text-secondary">수급 조건·기간·금액과 국민취업지원제도 비교.</p>
                  </Link>
                  <Link
                    href="/guide/early-reemployment-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">조기재취업수당</div>
                    <p className="mt-1 text-sm text-text-secondary">일찍 취업하면 받는 추가 수당 조건.</p>
                  </Link>
                  <Link
                    href="/guide/durunuri-social-insurance-support-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">두루누리 사회보험 지원</div>
                    <p className="mt-1 text-sm text-text-secondary">저임금 근로자 4대보험료 지원 제도.</p>
                  </Link>
                  <Link
                    href="/guide/income-certificate-issuance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득금액증명원 발급</div>
                    <p className="mt-1 text-sm text-text-secondary">신청 시 필요한 소득 증빙 서류 발급법.</p>
                  </Link>
                  <Link
                    href="/guide/sme-youth-income-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중소기업 청년 소득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">취업 후 활용할 수 있는 청년 세제 혜택.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">취업 후 세후 월급을 미리 계산해보세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 상담이 아닙니다. 구직촉진수당의 정확한 지급액, 소득·재산 기준선, 청년 연령 범위 등은 매년 고용노동부 고시로 조정되므로 본 가이드는 특정 금액을 확정 안내하지 않습니다. 반드시 고용24(work24.go.kr) 또는 고용노동부 고객상담센터(1350)에서 최신 기준을 확인하세요. 본 콘텐츠는 2026-08-13을 기준으로 작성되었으며, 제도 변경 시 업데이트됩니다. 근거 법령: 구직자 취업촉진 및 생활안정지원에 관한 법률. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.work24.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용24</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="국민취업지원제도 구직촉진수당 2026 가이드"
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