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

const URL = 'https://calculatorhost.com/guide/reemployed-worker-year-end-tax-2026/';
const DATE_PUBLISHED = '2026-08-10';
const DATE_MODIFIED = '2026-08-10';

export const metadata: Metadata = {
  title: '이직 연말정산 2026, 전 직장 소득 합산 안 하면 생기는 일',
  description:
    '같은 해에 회사를 옮겼다면 전 직장과 현 직장 급여를 합쳐 연말정산해야 합니다. 전 직장 원천징수영수증 받는 법, 합산을 빠뜨렸을 때 5월 종합소득세로 정산하는 방법, 전 직장 폐업·두 번 이직 사례까지 소득세법 §138로 정리했습니다.',
  keywords: [
    '이직 연말정산',
    '전 직장 소득 합산',
    '재취업 연말정산',
    '원천징수영수증',
    '이직 종합소득세',
    '중도입사 연말정산',
    '소득세법 138조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '이직 연말정산 2026, 전 직장 소득 합산 안 하면 생기는 일' }],
    title: '이직 연말정산 2026, 전 직장 원천징수영수증 합산법',
    description: '전 직장과 현 직장 급여를 합쳐 정산. 합산을 빠뜨리면 5월 종소세로 가는 이유까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '이직 연말정산 2026, 전 직장 소득 합산',
    description: '소득세법 §138 재취직자 연말정산. 원천징수영수증 합산과 5월 종소세 정산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '이직하면 연말정산은 어떻게 하나요?',
    answer:
      '같은 해에 옮긴 경우, 현 직장에 전 직장의 근로소득 원천징수영수증을 제출해 두 곳 급여를 합산한 뒤 다음 해 2월 현 직장에서 한 번에 연말정산합니다(소득세법 §138). 전 직장 급여를 합치지 않고 현 직장 급여만으로 정산하면 세금이 과소·과다 계산되므로, 합산이 원칙입니다.',
  },
  {
    question: '전 직장 원천징수영수증은 어디서 받나요?',
    answer:
      '먼저 전 직장에 요청하는 것이 원칙입니다. 전 직장은 중도 퇴사 시점에 약식 연말정산을 하고 근로소득 원천징수영수증을 발급합니다. 다음 해 3월 이후에는 홈택스(hometax.go.kr) "지급명세서 등 제출내역"에서도 조회·출력이 가능하지만, 2월 연말정산 시점에는 아직 반영 전일 수 있으니 전 직장에 직접 받는 것이 빠릅니다.',
  },
  {
    question: '전 직장 소득을 합산하지 않으면 어떻게 되나요?',
    answer:
      '현 직장 연말정산에서 전 직장 급여를 빠뜨렸다면, 두 소득이 합산되지 않아 세금이 정확히 계산되지 않습니다. 이 경우 다음 해 5월 종합소득세 확정신고 때 두 근로소득을 합산해 스스로 신고·정산해야 합니다. 신고하지 않으면 무신고·과소신고 가산세가 붙을 수 있으므로 반드시 정정해야 합니다.',
  },
  {
    question: '전 직장이 폐업해서 원천징수영수증을 못 받으면요?',
    answer:
      '전 직장이 폐업했더라도 원천징수 의무자가 지급명세서를 제출했다면 홈택스에서 조회할 수 있습니다. 조회가 안 되면 관할 세무서에 근로소득 지급 사실 확인을 문의하거나, 급여 이체 내역·근로계약서 등으로 소득을 확인해 5월 종합소득세 신고에 반영합니다. 처리 방법은 관할 세무서에 확인하는 것이 정확합니다.',
  },
  {
    question: '같은 해에 두 번 이직했으면 어떻게 합산하나요?',
    answer:
      '거쳐 온 모든 직장의 근로소득을 마지막(현재) 직장에서 합산합니다. 즉 첫 번째와 두 번째 전 직장의 원천징수영수증을 모두 현 직장에 제출해 세 곳 급여를 합쳐 연말정산합니다. 하나라도 빠지면 5월 종합소득세로 정산해야 하므로, 옮길 때마다 원천징수영수증을 챙겨두는 것이 좋습니다.',
  },
  {
    question: '퇴사 후 재취업하지 않았으면 연말정산은 누가 하나요?',
    answer:
      '연말까지 재취업하지 않았다면 현 직장이 없어 회사 연말정산을 받을 수 없습니다. 이 경우 다음 해 5월 종합소득세 확정신고를 통해 본인이 직접 정산합니다. 중도 퇴사 때 회사가 기본공제만 반영해 약식 정산을 했다면, 5월 신고에서 의료비·교육비·기부금 등 놓친 공제를 추가하면 환급을 받을 수 있습니다.',
  },
  {
    question: '전 직장에서 이미 연말정산을 했는데 또 해야 하나요?',
    answer:
      '전 직장이 한 것은 퇴사 시점의 약식 정산일 뿐, 그해 전체 소득에 대한 최종 정산이 아닙니다. 최종 정산은 연말까지의 모든 근로소득을 합산해 현 직장에서 이뤄집니다. 따라서 전 직장 정산 여부와 관계없이 전 직장 급여를 현 직장에 합산해 다시 정산하는 것이 맞습니다.',
  },
  {
    question: '합산하면 세금을 더 내나요, 돌려받나요?',
    answer:
      '합산 결과는 사람마다 다릅니다. 두 직장 급여를 합치면 과세표준이 올라 세율 구간이 높아질 수 있어 추가 납부가 나올 수도, 반대로 공제가 커져 환급이 나올 수도 있습니다. 중요한 것은 합산해야 정확한 세액이 나온다는 점이며, 유불리와 무관하게 합산이 법적 원칙입니다.',
  },
];

export default function ReemployedWorkerYearEndTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '이직 연말정산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '이직 연말정산 2026, 전 직장 소득 합산 안 하면 생기는 일',
    description:
      '같은 해 회사를 옮겼을 때 전 직장과 현 직장 급여를 합산해 연말정산하는 방법. 원천징수영수증 받는 법, 합산 누락 시 5월 종합소득세 정산, 폐업·두 번 이직 사례까지 소득세법 §138로 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['이직 연말정산', '재취업', '원천징수영수증', '소득 합산', '소득세법 138조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '이직 연말정산 2026',
    description:
      '전 직장과 현 직장 급여 합산 연말정산 방법과 합산 누락 시 5월 종합소득세 정산까지 정리한 실전 가이드.',
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
                    { name: '이직 연말정산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 7분 읽기 · 2026-08-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  이직 연말정산 2026
                  <br />
                  <span className="text-2xl text-text-secondary">전 직장 소득 합산 안 하면 생기는 일</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  올해 회사를 옮긴 직장인이라면 연말정산을 전 직장 급여까지 합쳐서 해야 하는지 헷갈리기 쉽습니다. 결론부터 말하면 같은 해 근로소득은 마지막 직장에서 모두 합산해 정산하는 것이 원칙입니다. 이 가이드는 재취업자 연말정산의 절차, 전 직장 원천징수영수증을 받는 법, 합산을 빠뜨렸을 때 5월 종합소득세로 바로잡는 방법을 소득세법 조문에 근거해 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-reemployed-worker-year-end-tax-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이직하면 연말정산은 어떻게 하나요?</h2>
                <p>
                  같은 해에 옮긴 경우 마지막 직장에서 합산 정산합니다. 소득세법 §138(재취직자에 대한 근로소득세액의 연말정산)은, 그해 중도에 퇴직하고 새 직장에 취직한 근로자가 종전 근무지 소득을 포함해 소득·세액공제 신고서를 제출하면, 현 직장의 원천징수의무자가 두 곳 급여를 더한 금액으로 연말정산하도록 규정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">합산 연말정산의 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    근로소득은 1년 단위로 세금을 매깁니다. 한 사람이 그해 벌어들인 근로소득 전체에 세율을 적용해야 정확한 세액이 나오므로, 직장이 둘 이상이었다면 이를 마지막 직장에서 합쳐 정산합니다. 매달 떼인 원천징수세액의 합과 실제 연간 세액의 차이를 정산해 환급 또는 추가 납부가 결정됩니다.
                  </p>
                </div>
                <p>
                  다만 현 직장은 전 직장 급여를 자동으로 알 수 없습니다. 그래서 근로자가 전 직장 원천징수영수증을 제출해야 비로소 합산이 이뤄집니다. 이 제출을 놓치는 것이 가장 흔한 실수입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전 직장 원천징수영수증은 어디서 받나요?</h2>
                <p>
                  전 직장에 직접 요청하는 것이 가장 빠릅니다. 회사는 근로자가 중도 퇴사하면 그 달까지의 급여로 약식 연말정산을 하고 근로소득 원천징수영수증을 발급할 의무가 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>1순위, 전 직장 요청:</strong> 인사·급여 담당에게 근로소득 원천징수영수증 발급을 요청합니다.
                  </li>
                  <li>
                    <strong>2순위, 홈택스 조회:</strong> 전 직장이 지급명세서를 제출한 뒤라면 홈택스 "지급명세서 등 제출내역"에서 조회·출력할 수 있습니다. 다만 반영에 시간이 걸려 2월 연말정산 시점에는 없을 수 있습니다.
                  </li>
                  <li>
                    <strong>제출:</strong> 받은 영수증을 현 직장 연말정산 담당에게 제출하면 두 곳 급여가 합산됩니다.
                  </li>
                </ul>
                <p>
                  예외: 전 직장이 폐업했거나 담당자와 연락이 닿지 않으면 발급이 늦어질 수 있습니다. 이때는 홈택스 조회를 시도하고, 그래도 확인이 어려우면 5월 종합소득세 신고로 합산하는 경로가 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">합산을 빠뜨리면? 5월 종합소득세로 정산</h2>
                <p>
                  현 직장 연말정산에서 전 직장 급여를 합치지 못했다면, 다음 해 5월 종합소득세 확정신고로 바로잡습니다. 두 근로소득을 합산해 신고하면 정확한 세액이 계산되고, 이미 낸 세금과의 차액을 정산합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상황별 연말정산·종합소득세 처리 (소득세법 §137, §138, §70)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상황</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">처리 방법</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">전 직장 영수증 현 직장에 제출</td>
                        <td className="p-3">현 직장에서 합산 연말정산</td>
                        <td className="p-3">다음 해 2월</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">합산 못 하고 정산 끝남</td>
                        <td className="p-3">본인이 두 소득 합산 신고</td>
                        <td className="p-3">다음 해 5월</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연말까지 재취업 안 함</td>
                        <td className="p-3">본인이 종합소득세 신고</td>
                        <td className="p-3">다음 해 5월</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 5월 신고를 아예 하지 않으면 무신고 또는 과소신고 가산세와 납부지연 가산세가 붙을 수 있습니다. 합산을 놓쳤다는 사실을 알았다면 5월 신고로 반드시 정정하는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-reemployed-worker-year-end-tax-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사례로 보는 이직 연말정산</h2>
                <p>
                  실제 상황을 단계별로 따라가 보면 합산의 흐름이 분명해집니다. 아래는 이해를 돕기 위한 가상의 사례입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 3월에 이직한 직장인</p>
                  <p className="text-sm text-text-secondary">
                    · 1~2월: A사 근무, 급여 700만원, 원천징수 세액 있음
                    <br />
                    · 3~12월: B사 근무, 급여 3,500만원
                    <br />
                    · 처리: A사에서 받은 원천징수영수증을 B사에 제출
                    <br />
                    · 결과: B사가 4,200만원 전체로 다음 해 2월 합산 연말정산
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 영수증 제출을 깜빡한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: B사에 A사 영수증을 내지 못해 B사 급여만으로 정산 완료
                    <br />
                    · 문제: A사 급여가 빠져 세액이 정확하지 않음
                    <br />
                    · 해결: 다음 해 5월 종합소득세 신고에서 A사·B사 급여를 합산 신고
                    <br />
                    · 효과: 정확한 세액으로 정산되어 가산세 위험 해소
                  </p>
                </div>
                <p>
                  다만 위 숫자는 예시일 뿐이며, 실제 세액은 부양가족, 공제 항목, 세율 구간에 따라 달라집니다. 정확한 계산은 홈택스 연말정산 미리보기나 아래 관련 계산기를 활용하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">이직자가 놓치기 쉬운 공제 포인트</h2>
                <p>
                  합산 자체만큼 중요한 것이 공제 누락 방지입니다. 이직 과정에서 아래 항목을 특히 확인하세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>공백기 지출:</strong> 퇴사와 입사 사이 공백기에 낸 국민연금·건강보험 지역가입료, 의료비, 기부금 등은 회사 연말정산에서 빠지기 쉬워 5월 신고에서 챙기면 됩니다.
                  </li>
                  <li>
                    <strong>중복 공제 주의:</strong> 전 직장에서 이미 반영한 공제를 현 직장에서 또 넣으면 과다공제로 추징될 수 있으니, 영수증에 반영된 항목을 확인합니다.
                  </li>
                  <li>
                    <strong>월세·주택자금:</strong> 이사로 주소가 바뀌었다면 월세 세액공제, 주택자금 공제 요건 충족 여부를 다시 확인합니다.
                  </li>
                  <li>
                    <strong>퇴직소득은 별도:</strong> 전 직장에서 받은 퇴직금은 근로소득이 아니라 퇴직소득으로 분류과세되므로 연말정산 합산 대상이 아닙니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">합산 급여로 세후 실수령액을 가늠해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/mid-year-resignation-year-end-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중도퇴사자 연말정산</div>
                    <p className="mt-1 text-sm text-text-secondary">재취업 없이 퇴사한 경우의 5월 정산법.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 기본 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">소득공제와 세액공제의 전체 구조 정리.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 두 종류의 차이와 절세 효과 비교.</p>
                  </Link>
                  <Link
                    href="/guide/income-certificate-issuance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득금액증명원 발급</div>
                    <p className="mt-1 text-sm text-text-secondary">이직·대출 시 필요한 소득 증빙 서류 떼는 법.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">직장인 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·4대보험 계산기 한곳에.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 세무 자문이 아닙니다. 합산 대상 소득의 범위, 공제 항목 적용, 폐업 직장 소득 확인 방법은 개인 상황에 따라 달라질 수 있으므로, 실제 신고 전 홈택스 또는 관할 세무서·세무 전문가에게 확인하세요. 본 콘텐츠는 2026-08-10 기준이며 관련 법령·서식 개정 시 업데이트됩니다. 인용 조문: 소득세법 §70(종합소득 확정신고), §137(근로소득세액 연말정산), §138(재취직자 연말정산). AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="이직 연말정산 2026 가이드"
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
