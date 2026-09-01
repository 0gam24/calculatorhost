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

const URL = 'https://calculatorhost.com/guide/withholding-tax-semiannual-payment-2026/';
const DATE_PUBLISHED = '2026-09-02';
const DATE_MODIFIED = '2026-09-02';

export const metadata: Metadata = {
  title: '원천세 반기납부 신청 조건·기간 2026, 20인 이하 사업자',
  description:
    '직전 연도 상시고용인원 평균 20명 이하 사업장(금융·보험업 제외)은 매달 내는 원천세를 반기(6개월)에 한 번만 납부할 수 있습니다. 상반기 적용은 전년도 12월, 하반기 적용은 6월에 신청해야 하며 인정상여 등 일부 세액은 승인 후에도 매달 냅니다. 소득세법 §128②·시행령 §186 기준 조건과 신청 기간을 정리했습니다.',
  keywords: [
    '원천세 반기납부',
    '원천세 반기별납부 신청기간',
    '원천징수세액 반기별납부 승인신청',
    '상시고용인원 20명',
    '원천세 신고 기간',
    '소득세법 128조',
    '반기별납부 포기신청',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '원천세 반기납부 신청 조건·기간 2026, 20인 이하 사업자' }],
    title: '원천세 반기납부 신청 조건·기간 2026, 놓치면 다음 반기까지 대기',
    description: '20인 이하 사업장 대상 원천세 반기별납부. 상반기 적용은 12월, 하반기 적용은 6월 신청 기한과 승인 절차 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '원천세 반기납부 신청 조건·기간 2026',
    description: '20인 이하 사업장, 상반기 적용 12월 신청·하반기 적용 6월 신청. 소득세법 §128②·시행령 §186.',
  },
};

const FAQ_ITEMS = [
  {
    question: '신규 사업자도 원천세 반기납부를 신청할 수 있나요?',
    answer:
      '가능합니다. 직전 연도 실적이 없는 신규 사업자는 신청일이 속한 반기의 상시고용인원을 기준으로 20명 이하 여부를 판단합니다. 예를 들어 5월에 신청한다면 그해 1월부터 6월까지의 상시고용인원 평균으로 요건을 확인합니다.',
  },
  {
    question: '상시고용인원 20명은 정확히 어떻게 계산하나요?',
    answer:
      '매월 급여를 원천징수한 임직원 수를 바탕으로 국세청이 정한 방식에 따라 반기 또는 직전 연도 평균을 계산합니다. 정확한 산정 기준과 경계선 사례는 신청 전 홈택스 상담 또는 관할 세무서에 확인하는 것이 안전합니다.',
  },
  {
    question: '승인 후 상시고용인원이 20명을 넘으면 어떻게 되나요?',
    answer:
      '요건을 벗어나므로 반기납부를 계속 유지할 수 없는 상태가 됩니다. 이 경우 홈택스 또는 관할 세무서에 반기별 납부포기신청을 해 월납부로 전환해야 하며, 처리 절차는 세무서 확인이 필요합니다.',
  },
  {
    question: '신청 기한을 놓치면 어떻게 되나요?',
    answer:
      '해당 반기는 신청 자체가 불가능해 계속 매월 신고·납부해야 합니다. 다음 반기부터 적용받으려면 그 반기의 직전월 1일부터 말일까지 다시 신청하면 됩니다. 기한을 넘긴 신청은 접수되지 않으므로 미리 일정을 챙겨야 합니다.',
  },
  {
    question: '세무서 승인 통지를 못 받으면 반기납부를 못 하나요?',
    answer:
      '그렇지 않습니다. 세무서장은 신청일이 속한 반기의 다음 달 말일까지 승인 여부를 통지해야 하며, 이 기한까지 통지가 없으면 승인을 받은 것으로 간주합니다. 다만 실제 통지 여부는 홈택스에서 다시 확인하는 것이 좋습니다.',
  },
  {
    question: '반기납부 승인 후에도 매달 신고해야 하는 세액이 있나요?',
    answer:
      '있습니다. 법인세법에 따라 처분된 인정상여·인정배당 등에 대한 원천징수세액과 비거주자 연예인·운동가로부터 원천징수한 세액(소득세법 §156의5) 등은 반기납부 대상에서 제외되어 종전대로 매월 신고·납부해야 합니다.',
  },
  {
    question: '반기납부에서 다시 월납부로 되돌릴 수 있나요?',
    answer:
      '가능합니다. 홈택스의 원천징수세액 반기별 납부포기신청 메뉴 또는 서면으로 관할 세무서에 신청하면 월납부로 전환됩니다. 직원 수가 늘어 요건을 벗어났거나 자금 관리상 매월 납부가 더 편한 경우 활용할 수 있습니다.',
  },
];

export default function WithholdingTaxSemiannualPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '원천세 반기납부 신청 조건·기간 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '원천세 반기납부 신청 조건·기간 2026, 놓치면 다음 반기까지 대기',
    description:
      '20인 이하 사업장의 원천세 반기별납부 대상 요건, 상반기·하반기 신청 기간, 승인 절차와 간주승인, 반기납부에서 제외되는 세액을 소득세법 §128②·시행령 §186 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['원천세 반기납부', '반기별납부 신청기간', '상시고용인원 20명', '소득세법 128조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '원천세 반기납부 신청 조건·기간 2026',
    description:
      '직전 연도 상시고용인원 20명 이하 사업장의 원천세 반기별납부 신청 조건, 신청 기간, 승인 절차 정리.',
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
                    { name: '원천세 반기납부 신청 조건·기간 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">소규모 사업자 · 8분 읽기 · 2026-09-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  원천세 반기납부 신청 조건·기간 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 20인 이하 사업자 확인 순서</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  직원이 적은 사업장은 매달 원천세를 신고·납부하는 대신 반기(6개월)에 한 번만 처리할 수 있습니다. 이 가이드는 원천세 반기별납부의 대상 요건, 상반기·하반기 신청 기간, 세무서 승인 절차, 그리고 승인 후에도 매달 내야 하는 예외 세액을 실제 절차 순서대로 정리합니다. 대상 독자는 상시고용인원 20명 이하 소규모 사업장의 사업주와 담당자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">원천세 반기납부란 무엇인가요?</h2>
                <p>
                  원천세 반기납부는 원칙적으로 매월 내야 하는 원천징수세액을, 일정 요건을 충족한 사업장에 한해 반기(1~6월, 7~12월)마다 한 번만 신고·납부하도록 허용하는 특례입니다. 직원 급여에서 뗀 소득세는 원래 징수일이 속한 달의 다음 달 10일까지 매달 납부해야 하지만(소득세법 §128①), 상시고용인원이 적은 사업장은 이 부담을 줄여주는 취지입니다.
                </p>
                <p>
                  이 제도는 세액을 깎아주는 절세 수단이 아니라 신고 횟수와 납부 시점을 조정하는 행정 편의 제도입니다. 실제로 내야 할 원천세 총액은 매월납부와 동일하며, 다만 자금을 반기 단위로 모아 한 번에 정산할 수 있다는 점이 다릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 매월 원천세를 반기 1회로 모아 신고·납부하는 특례.
                    <br />
                    대상: 직전 연도 상시고용인원 평균 20명 이하 사업장(금융·보험업 제외).
                    <br />
                    근거: 소득세법 §128②, 소득세법 시행령 §186.
                    <br />
                    주의: 세액 감면이 아니라 납부 시점을 조정하는 제도.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 원천세 반기납부를 신청할 수 있나요?</h2>
                <p>
                  직전 과세기간의 상시고용인원 평균이 20명 이하인 원천징수의무자가 대상입니다. 금융업·보험업을 경영하는 사업자는 제외되며, 종교단체도 신청 대상에 포함됩니다(소득세법 시행령 §186). 새로 사업을 시작해 직전 연도 실적이 없는 신규 사업자는 신청일이 속한 반기의 상시고용인원을 기준으로 요건을 판단합니다.
                </p>
                <p>
                  다만, 상시고용인원이 20명 이하라는 사실만으로 자동 적용되지 않습니다. 반드시 관할 세무서장의 승인을 받거나 국세청장이 정하는 절차에 따라 지정을 받아야 매월납부 의무에서 벗어날 수 있습니다.
                </p>
                <p className="mt-4">
                  다만, 승인을 받은 이후 사업이 커져 상시고용인원이 20명을 넘으면 요건을 벗어나므로 계속 반기납부를 유지할 수 없게 됩니다. 이 경우 별도로 월납부 전환 절차를 밟아야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청 기간은 정확히 언제인가요?</h2>
                <p>
                  반기별 납부 승인을 받으려면 적용받고자 하는 반기의 직전월 1일부터 말일까지 관할 세무서에 신청해야 합니다(소득세법 시행령 §186). 상반기(1~6월)부터 적용받으려면 전년도 12월 1일부터 12월 31일까지, 하반기(7~12월)부터 적용받으려면 그해 6월 1일부터 6월 30일까지 신청해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 원천세 반기납부 신청·적용·납부 기한 (소득세법 §128②·시행령 §186)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적용 반기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신청 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신고·납부 기한</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상반기</td>
                        <td className="p-3">전년도 12월 1일~31일</td>
                        <td className="p-3">1월~6월분</td>
                        <td className="p-3">7월 10일까지</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">하반기</td>
                        <td className="p-3">6월 1일~30일</td>
                        <td className="p-3">7월~12월분</td>
                        <td className="p-3">다음 해 1월 10일까지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 이 신청 기간은 새로 승인을 받거나 갱신하려는 경우에 적용됩니다. 신청 기한을 놓치면 그 반기는 신청 자체가 불가능해 매월 신고·납부를 계속해야 하며, 다음 반기 신청 기간에 다시 신청할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청은 어떻게 하나요?</h2>
                <p>
                  홈택스 온라인 신청 또는 서면 신청서 제출, 두 가지 방법으로 진행할 수 있습니다. 절차는 다음 순서로 이루어집니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>홈택스 접속:</strong> 홈택스의 &apos;증명·등록·신청 &gt; 원천세 관련 신청·신고 &gt; 원천징수세액 반기별 납부 승인 신청&apos; 메뉴로 들어갑니다.
                  </li>
                  <li>
                    <strong>서면 신청 시:</strong> 원천징수세액 반기별납부 승인신청서를 작성해 원천징수 관할 세무서에 직접 제출할 수도 있습니다.
                  </li>
                  <li>
                    <strong>기본 정보 입력:</strong> 사업자등록번호, 상시고용인원 현황, 적용받으려는 반기를 정확히 기재합니다.
                  </li>
                  <li>
                    <strong>제출 및 대기:</strong> 신청서 제출 후 세무서의 승인 여부 통지를 기다립니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 신청 기간 안에 접수하지 못하면 접수 자체가 되지 않으므로, 매년 6월과 12월 일정을 미리 캘린더에 표시해두는 것이 실무상 도움이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청하면 무조건 승인되나요?</h2>
                <p>
                  아닙니다. 요건을 충족했다고 자동으로 승인되는 것이 아니라, 세무서장이 원천징수세액의 신고·납부 성실도 등을 고려해 승인 여부를 심사합니다. 승인 여부는 신청일이 속한 반기의 다음 달 말일까지 신청인에게 통지됩니다.
                </p>
                <p>
                  다만, 이 기한까지 세무서로부터 별도 통지를 받지 못한 경우에는 승인을 받은 것으로 간주합니다. 이른바 간주승인 규정으로, 신청인이 무기한 대기하지 않도록 하는 안전장치입니다. 그럼에도 실무상으로는 홈택스에서 승인 결과를 다시 확인해두는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반기납부 승인 후에도 매달 내야 하는 세액이 있나요?</h2>
                <p>
                  있습니다. 법인세법에 따라 처분된 인정상여·인정배당 등에 대한 원천징수세액은 반기납부 대상에서 제외되어 종전대로 매월 신고·납부해야 합니다. 세무조사나 결산 조정 과정에서 소득처분이 확정되는 항목이므로, 발생 시점을 놓치지 않도록 유의해야 합니다.
                </p>
                <p>
                  또한 비거주자 연예인이나 운동가로부터 원천징수한 세액(소득세법 §156의5)도 반기납부 대상에서 빠집니다. 즉, 반기납부 승인을 받았더라도 이런 항목이 발생한 달에는 별도로 매월 신고·납부를 병행해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">원천세 반기납부, 실제로 유리한가요?</h2>
                <p>
                  신고 횟수가 연 12회에서 2회로 줄어 행정 부담이 크게 준다는 점이 가장 큰 장점입니다. 급여 담당자가 매달 원천세 신고서를 작성·제출하는 수고를 덜 수 있고, 세무대리인 수수료가 신고 건수 기준이라면 비용도 함께 줄어들 수 있습니다.
                </p>
                <p>
                  다만, 6개월 치 원천세를 한 번에 납부하다 보니 목돈이 한꺼번에 빠져나가는 부담이 있습니다. 자금 흐름이 일정하지 않은 사업장이라면 반기 말 납부 시점에 대비해 미리 자금을 적립해두는 계획이 필요합니다. 직원 수가 유동적이어서 20명 안팎을 오가는 사업장은 요건 유지 여부도 함께 점검해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/simplified-withholding-tax-table-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로소득 간이세액표 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">매달 얼마씩 원천징수되는지 80·100·120% 선택 기준.</p>
                  </Link>
                  <Link
                    href="/guide/july-vat-and-tax-withholding/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">7월 부가세·원천세 점검</div>
                    <p className="mt-1 text-sm text-text-secondary">하반기 시작 전 원천세·부가세 일정을 함께 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-withholding-3-3-to-2-2-2026-reform/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 원천징수 3.3%→2.2%</div>
                    <p className="mt-1 text-sm text-text-secondary">프리랜서를 고용한 사업장이라면 함께 확인할 개편안.</p>
                  </Link>
                  <Link
                    href="/guide/pension-income-tax-withholding-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금소득세 원천징수 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">사적연금 지급 사업장의 원천징수 세율 구조.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">직원 급여에서 매달 얼마가 원천징수되는지 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">3.3% 원천징수 후 실제 부담할 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·연말정산 등 세금 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 상시고용인원 산정 방법, 승인 심사 기준, 개별 사업장의 반기납부 전환 여부는 관할 세무서 또는 세무 전문가와 반드시 확인하세요. 본 콘텐츠는 2026-09-02를 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 소득세법 §128(원천징수세액의 납부), 소득세법 §156의5(비거주자 연예인·운동가 원천징수 특례), 소득세법 시행령 §186(원천징수세액의 반기별 납부).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="원천세 반기납부 신청 조건·기간 2026 가이드"
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
