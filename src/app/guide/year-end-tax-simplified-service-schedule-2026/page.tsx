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

const URL = 'https://calculatorhost.com/guide/year-end-tax-simplified-service-schedule-2026/';
const DATE_PUBLISHED = '2026-09-03';
const DATE_MODIFIED = '2026-09-03';

export const metadata: Metadata = {
  title: '연말정산 간소화서비스 일정, 자료 확인 순서 총정리',
  description:
    '연말정산 간소화서비스는 매년 1월 중순 개통되고 확정자료는 그보다 며칠 뒤 제공됩니다. 개통일과 확정자료일이 왜 다른지, 회사 일괄제공 서비스 신청 시기, 자료를 확인하는 순서를 소득세법 §165·시행령 §216의3 기준으로 정리했습니다.',
  keywords: [
    '연말정산 간소화서비스',
    '연말정산 간소화서비스 일정',
    '연말정산 확정자료',
    '간소화자료 일괄제공 서비스',
    '연말정산 자료 확인 순서',
    '편리한 연말정산',
    '소득세법 165조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연말정산 간소화서비스 일정, 자료 확인 순서 총정리' }],
    title: '연말정산 간소화서비스 일정, 자료 확인 순서 총정리',
    description: '개통일과 확정자료일이 다른 이유, 일괄제공 서비스 신청 시기, 자료 확인 순서 단계별 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연말정산 간소화서비스 일정, 자료 확인 순서 총정리',
    description: '개통일과 확정자료일이 다른 이유, 일괄제공 서비스 신청 시기, 자료 확인 순서 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '연말정산 간소화서비스는 매년 며칠에 열리나요?',
    answer:
      '최근 몇 년간은 매년 1월 15일에 개통되는 패턴이 반복되고 있습니다. 다만 이는 국세청이 그해 상황에 맞춰 정하는 일정이라 매년 정확한 날짜가 공식 공지를 통해 별도로 확정됩니다. 정확한 개통일은 연말에 국세청 홈택스 공지사항에서 확인하는 것이 가장 확실합니다.',
  },
  {
    question: '개통일에 바로 자료를 받아도 되나요?',
    answer:
      '가능은 하지만 권장하지 않습니다. 개통 직후 며칠간은 병원·보험사 등 자료 제출기관이 데이터를 계속 보완하는 기간이라 자료가 바뀔 수 있습니다. 국세청은 확정자료가 제공되는 시점 이후, 접속자가 몰리는 개통 초반을 피해 이용할 것을 권장합니다.',
  },
  {
    question: '간소화서비스에 자료가 아예 없는 항목은 왜 그런가요?',
    answer:
      '월세 세액공제, 기부금 일부, 안경·콘택트렌즈 구입비 등은 제출기관이 국세청에 자료를 보내지 않거나 늦게 보내는 경우가 있습니다. 이런 항목은 간소화서비스에서 조회되지 않으므로 영수증이나 증빙서류를 직접 모아 회사에 제출해야 공제를 받을 수 있습니다.',
  },
  {
    question: '회사가 일괄제공 서비스를 신청하면 근로자는 아무것도 안 해도 되나요?',
    answer:
      '아닙니다. 회사가 명단을 등록해도 근로자 본인이 홈택스나 손택스에서 본인인증을 거쳐 제공에 동의해야 자료가 회사로 넘어갑니다. 동의하지 않으면 근로자가 직접 간소화서비스에서 자료를 내려받아 회사에 내야 합니다.',
  },
  {
    question: '같은 회사에 계속 다니면 일괄제공 동의를 매년 다시 해야 하나요?',
    answer:
      '아닙니다. 동일한 회사에 계속 근무하는 경우 최초 1회만 동의하면 이후 연도에는 별도 절차 없이 자료가 계속 제공됩니다. 다만 회사를 옮기면 새 회사 기준으로 다시 동의해야 합니다.',
  },
  {
    question: '연중에 퇴사했다면 간소화서비스를 이용할 수 있나요?',
    answer:
      '간소화서비스 자체는 조회할 수 있지만, 연말정산 대상은 원칙적으로 그해 12월 31일까지 근무 중인 근로자입니다. 중도 퇴사자는 퇴사한 회사에서 퇴직 시점까지의 급여로 약식 정산을 받고, 놓친 공제는 다음 해 5월 종합소득세 신고 기간에 직접 정산해야 환급을 챙길 수 있습니다.',
  },
  {
    question: '편리한 연말정산 서비스는 간소화서비스와 다른 건가요?',
    answer:
      '간소화서비스가 공제 증빙자료 원본을 모아 보여주는 창구라면, 편리한 연말정산은 그 자료를 바탕으로 소득·세액공제신고서 작성과 예상세액 계산까지 도와주는 다음 단계 서비스입니다. 두 서비스 모두 홈택스·손택스에서 이용할 수 있습니다.',
  },
];

export default function YearEndTaxSimplifiedServiceSchedule2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연말정산 간소화서비스 일정, 자료 확인 순서 총정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연말정산 간소화서비스 일정, 자료 확인 순서 총정리',
    description:
      '개통일과 확정자료일이 다른 이유, 간소화자료 일괄제공 서비스 신청 시기, 자료를 확인하는 순서, 자료가 없는 항목 대처법을 소득세법 §165·시행령 §216의3 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연말정산 간소화서비스', '간소화자료 일괄제공', '편리한 연말정산', '소득세법 165조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연말정산 간소화서비스 일정, 자료 확인 순서 총정리',
    description:
      '연말정산 간소화서비스 개통일·확정자료일 패턴, 일괄제공 서비스 신청 시기, 자료 확인 순서 단계별 정리.',
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
                    { name: '연말정산 간소화서비스 일정, 자료 확인 순서 총정리' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로소득자 · 7분 읽기 · 2026-09-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연말정산 간소화서비스 일정
                  <br />
                  <span className="text-2xl text-text-secondary">· 자료 확인 순서 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연말정산 간소화서비스는 매년 1월 중순 개통되지만, 개통일에 바로 나오는 자료와 며칠 뒤 확정되는 자료가 다릅니다. 이 가이드는 개통일과 확정자료일이 왜 갈리는지, 회사가 이용하는 일괄제공 서비스는 언제 신청해야 하는지, 근로자가 자료를 확인하는 순서는 어떻게 되는지를 정리합니다. 대상 독자는 매년 이맘때 연말정산을 준비하는 직장인과 인사·급여 담당자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연말정산 간소화서비스란 무엇인가요?</h2>
                <p>
                  연말정산 간소화서비스는 병원·보험사·은행·학교 등 영수증 발급기관이 전산으로 국세청에 제출한 소득·세액공제 증빙자료를 근로자가 홈택스에서 한 번에 조회·출력할 수 있게 해주는 서비스입니다. 의료비·보험료·교육비·신용카드 사용액·연금저축 등 항목별로 각 기관을 일일이 찾아다니지 않아도 되는 것이 핵심입니다.
                </p>
                <p>
                  법적 근거는 소득세법 §165(소득공제 등을 위한 증명서류의 제출)와 같은 법 시행령 §216의3입니다. 이 규정에 따라 의료기관·보험사·학교 등 자료 제출기관은 근로자의 공제 관련 지출 내역을 국세청에 전산으로 제출할 의무를 지고, 국세청은 이를 데이터베이스로 구축해 근로자에게 제공합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 공제 증빙자료를 국세청이 모아 보여주는 조회 서비스.
                    <br />
                    근거: 소득세법 §165·시행령 §216의3.
                    <br />
                    최근 패턴: 매년 1월 15일 개통, 그로부터 며칠 뒤 확정자료 제공.
                    <br />
                    주의: 개통일 자료와 확정자료는 다를 수 있어 시점 확인이 중요합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간소화서비스는 언제 열리고, 언제 확정되나요?</h2>
                <p>
                  최근 몇 년간 국세청은 매년 1월 15일에 간소화서비스를 개통하고, 1월 20일 전후로 확정자료를 다시 제공하는 방식을 반복해 왔습니다. 개통 직후에는 일부 기관의 자료가 아직 반영되지 않았거나 수정될 수 있어, 국세청도 확정자료가 나온 뒤 이용할 것을 안내하고 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 최근 연도 기준 연말정산 간소화서비스 통상 일정 패턴</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시점</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1월 15일</td>
                        <td className="p-3">간소화서비스 개통</td>
                        <td className="p-3">접속자 폭주로 속도 저하 가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1월 20일 전후</td>
                        <td className="p-3">확정자료 제공</td>
                        <td className="p-3">이후 이용 시 자료 변경 가능성 낮음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1월 21일 이후</td>
                        <td className="p-3">이용 권장 시점</td>
                        <td className="p-3">국세청 안내 기준</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 이 일정은 국세청이 해마다 별도로 공지하는 값입니다. 이 가이드는 최근 연도의 반복된 패턴을 정리한 것이며, 해당 정산 연도의 정확한 개통일·확정자료일은 매년 12월경 국세청 홈택스 공지사항에서 다시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간소화자료 일괄제공 서비스는 언제 신청하나요?</h2>
                <p>
                  일괄제공 서비스는 근로자가 각자 자료를 내려받아 회사에 제출하는 대신, 근로자 동의를 거쳐 국세청이 회사에 직접 자료를 전달하는 방식입니다. 회사와 근로자가 각각 신청·동의 절차를 거쳐야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>회사 명단 등록:</strong> 이용하려는 회사는 당해연도 9월 말경부터 다음 해 1월 10일까지 일괄제공 대상 근로자 명단을 홈택스에 등록합니다.
                  </li>
                  <li>
                    <strong>근로자 동의:</strong> 근로자는 당해연도 12월 1일부터 다음 해 1월 15일까지 홈택스나 손택스에서 본인인증 후 제공에 동의합니다.
                  </li>
                  <li>
                    <strong>계속 근무 시 재동의 불필요:</strong> 같은 회사에 계속 다니면 최초 1회 동의로 이후 연도에도 계속 적용됩니다.
                  </li>
                  <li>
                    <strong>회사 일괄 다운로드:</strong> 동의가 완료되면 회사가 근로자(동의한 부양가족 포함)의 간소화 자료를 홈택스에서 일괄로 내려받습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 회사가 명단을 등록했더라도 근로자 본인이 동의하지 않으면 자료는 넘어가지 않습니다. 동의를 놓쳤다면 근로자가 직접 간소화서비스에서 자료를 내려받아 회사에 제출하는 방식으로 대체할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로자는 자료를 어떤 순서로 확인해야 하나요?</h2>
                <p>
                  회사가 일괄제공을 이용하지 않거나, 부양가족 자료까지 직접 챙겨야 하는 근로자라면 다음 순서로 확인하는 것이 효율적입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">확인 순서 4단계</p>
                  <p className="text-sm text-text-secondary">
                    1단계: 홈택스·손택스에 로그인해 간소화서비스 메뉴로 이동합니다.
                    <br />
                    2단계: 확정자료 제공 시점 이후인지 확인하고, 부양가족 자료를 함께 조회하려면 사전에 자료 제공 동의를 받아 둡니다.
                    <br />
                    3단계: 신용카드·의료비·보험료·교육비·연금저축 등 항목별로 누락된 것이 없는지 지난해 자료와 비교합니다.
                    <br />
                    4단계: 편리한 연말정산 서비스에서 소득·세액공제신고서를 작성하고 예상세액을 확인한 뒤 회사에 제출합니다.
                  </p>
                </div>
                <p className="mt-4">
                  다만, 부양가족의 자료를 함께 조회하려면 부양가족이 별도로 자료 제공에 동의해야 합니다. 미성년 자녀는 예외적으로 자동 조회되는 경우가 있지만, 성년 자녀나 부모님 자료는 매년 각자 동의 절차를 거쳐야 하는 경우가 많으므로 미리 안내해 두는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간소화서비스에 안 뜨는 항목은 어떻게 하나요?</h2>
                <p>
                  월세 세액공제, 일부 종교단체·지정기부금, 안경·콘택트렌즈 구입비, 교복 구입비, 취학 전 아동 학원비 등은 제출기관이 국세청에 자료를 보내지 않거나 개별 사정으로 누락되는 경우가 흔합니다. 이런 항목은 간소화서비스만 믿으면 공제를 놓치게 됩니다.
                </p>
                <p>
                  예를 들어 월세 세액공제는 임대차계약서 사본과 월세 이체 내역(계좌이체 확인서 또는 무통장입금증)을 직접 준비해 회사에 제출해야 합니다. 안경 구입비도 안경원에서 발급한 시력보정용 사실 확인서와 영수증을 별도로 챙겨야 하는 대표적인 누락 항목입니다.
                </p>
                <p className="mt-4">
                  다만, 연말정산에서 놓친 공제라도 완전히 끝난 것은 아닙니다. 다음 해 5월 종합소득세 신고 기간이나 경정청구를 통해 최대 5년 이내에는 추가로 환급을 신청할 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">신용카드·의료비·기부금 등 공제 항목 전체 정리.</p>
                  </Link>
                  <Link
                    href="/guide/november-year-end-tax-prep/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">11월 연말정산 준비 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">12월 31일 마감 전 마지막 절세 기회 8가지.</p>
                  </Link>
                  <Link
                    href="/guide/february-tax-refund-tracking/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2월 연말정산 환급 추적</div>
                    <p className="mt-1 text-sm text-text-secondary">환급 결과 확인과 누락 공제 정정 방법.</p>
                  </Link>
                  <Link
                    href="/guide/mid-year-resignation-year-end-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중도퇴사 연말정산</div>
                    <p className="mt-1 text-sm text-text-secondary">재취업·5월 종소세로 환급받는 방법.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험·소득세 반영한 세후 월급을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·연차수당 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 간소화서비스의 정확한 개통일·확정자료일은 매년 국세청이 별도로 공지하므로, 실제 정산 시점에는 반드시 국세청 홈택스 공지사항에서 해당 연도 일정을 다시 확인하세요. 본 콘텐츠는 2026-09-03을 기준으로 작성되었습니다. 인용 법조항: 소득세법 §165(소득공제 등을 위한 증명서류의 제출), 같은 법 시행령 §216의3(연말정산간소화 자료의 제출 등).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="연말정산 간소화서비스 일정, 자료 확인 순서 총정리"
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
