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

const URL = 'https://calculatorhost.com/guide/resident-tax-employee-portion-2026/';
const DATE_PUBLISHED = '2026-08-05';
const DATE_MODIFIED = '2026-08-05';

export const metadata: Metadata = {
  title: '주민세 종업원분 2026, 세율 0.5%·면세점·신고 방법 정리',
  description:
    '주민세 종업원분은 사업소 종업원 급여총액의 0.5%를 매월 신고납부하는 지방세입니다. 최근 1년 월평균 급여총액 1억5천만원 이하면 면세점 적용. 세율·면세점·신고 기한·계산법을 지방세법 기준으로 정리했습니다.',
  keywords: [
    '주민세 종업원분',
    '종업원분 주민세',
    '주민세 종업원분 세율',
    '주민세 종업원분 면세점',
    '주민세 종업원분 신고',
    '급여총액 0.5%',
    '지방세법 84조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주민세 종업원분 2026, 세율 0.5%·면세점·신고 방법 정리' }],
    title: '주민세 종업원분 2026, 세율·면세점·신고 방법',
    description: '사업소 종업원 급여총액 0.5% 과세, 월평균 1억5천만원 이하 면세점. 다음 달 10일까지 신고납부.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주민세 종업원분 2026 정리',
    description: '급여총액 0.5%, 월평균 1.5억원 면세점, 다음 달 10일 신고납부. 지방세법 §84의2~§84의4.',
  },
};

const FAQ_ITEMS = [
  {
    question: '주민세 종업원분은 누가 내나요?',
    answer:
      '사업소에서 종업원에게 급여를 주는 사업주가 냅니다. 개인이 내는 주민세 개인분과 달리, 종업원분은 사업소를 둔 사업주가 종업원 급여총액을 기준으로 부담하는 지방세입니다. 다만 최근 1년 월평균 급여총액이 면세점(1억5천만원) 이하이면 내지 않아도 됩니다.',
  },
  {
    question: '세율은 얼마인가요?',
    answer:
      '종업원 급여총액의 0.5%입니다(지방세법 §84의3). 그 달에 종업원에게 지급한 급여총액에 1천분의 5, 즉 0.5%를 곱해 세액을 계산합니다. 지방자치단체는 조례로 이 표준세율을 50% 범위에서 올리거나 내릴 수 있으므로, 관할 지자체 조례를 확인해야 정확합니다.',
  },
  {
    question: '면세점이 무엇이고 기준은 얼마인가요?',
    answer:
      '일정 규모 이하 사업소는 종업원분을 면제하는 제도입니다. 납세의무 성립일이 속한 달부터 최근 1년간 해당 사업소 종업원 급여총액의 월평균 금액이 1억5천만원 이하이면 종업원분을 부과하지 않습니다(지방세법 §84의4). 이 기준을 넘는 달부터 과세 대상이 됩니다.',
  },
  {
    question: '급여총액에는 무엇이 포함되나요?',
    answer:
      '소득세법상 근로소득이 포함되며 비과세 급여는 제외됩니다. 종업원분 과세표준은 그 달에 지급한 급여 총액인데(지방세법 §84의2), 여기에는 소득세법 제20조의 근로소득이 들어가고 식대 등 비과세 근로소득은 빠집니다. 일용근로자 급여 포함 여부 등 세부 사항은 지자체 안내를 확인하세요.',
  },
  {
    question: '언제까지 신고·납부하나요?',
    answer:
      '급여를 지급한 달의 다음 달 10일까지입니다. 예를 들어 7월에 지급한 급여분은 8월 10일까지 사업소 소재지를 관할하는 지방자치단체에 신고납부합니다. 위택스(wetax.go.kr)에서 전자신고·납부가 가능하며, 기한을 넘기면 가산세가 붙습니다.',
  },
  {
    question: '2026년에 달라지는 점이 있나요?',
    answer:
      '장기근속수당과 육아휴직 대체인력 관련 공제가 새로 도입된 것으로 안내되고 있습니다. 장기근속수당은 1인당 월 급여액의 10% 한도(최대 36만원)에서 과세표준에서 빼주고, 육아휴직자 대체인력으로 채용된 근로자의 급여도 과세표준에서 공제하는 방향입니다. 다만 적용 시기와 요건은 개정 지방세법과 소관 부처 고시로 확정되므로 반드시 확인하세요.',
  },
  {
    question: '신고를 놓치면 어떻게 되나요?',
    answer:
      '무신고·납부지연 가산세가 부과됩니다. 신고를 하지 않으면 무신고가산세, 납부를 늦추면 납부지연가산세가 더해져 원래 세액보다 부담이 커집니다. 면세점 이하라 낼 세액이 없더라도, 과세 대상 여부가 애매하면 관할 지자체나 위택스에서 확인해 두는 것이 안전합니다.',
  },
  {
    question: '사업소가 여러 곳이면 어떻게 하나요?',
    answer:
      '사업소별로 각각 신고·납부합니다. 종업원분은 사업소 소재지 관할 지방자치단체에 신고하는 세금이므로, 지점이나 사업장이 여러 곳이면 각 사업소의 급여총액을 기준으로 해당 지자체에 따로 신고해야 합니다. 면세점 판정도 사업소 단위로 이뤄집니다.',
  },
];

export default function ResidentTaxEmployeePortion2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주민세 종업원분 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주민세 종업원분 2026, 세율 0.5%·면세점·신고 방법 완전 정리',
    description:
      '사업소 종업원 급여총액의 0.5%를 매월 신고납부하는 주민세 종업원분. 세율(지방세법 §84의3), 면세점 월평균 1억5천만원(§84의4), 과세표준(§84의2), 신고 기한과 계산 사례 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주민세 종업원분', '급여총액', '면세점', '지방세', '신고납부'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주민세 종업원분 2026',
    description:
      '주민세 종업원분의 세율·면세점·과세표준·신고 기한과 계산법을 지방세법 기준으로 정리.',
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
                    { name: '주민세 종업원분 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">사업주·인사담당 · 8분 읽기 · 2026-08-05</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주민세 종업원분 2026
                  <br />
                  <span className="text-2xl text-text-secondary">세율 0.5%·면세점·신고 방법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 종업원에게 급여를 지급하는 사업주와 인사·경리 담당자를 위해 씁니다. 주민세 종업원분은 매월 급여총액에 따라 신고납부해야 하는 지방세인데, 면세점 기준을 몰라 과세 대상인지 헷갈리거나 다음 달 10일 신고 기한을 놓치는 경우가 많습니다. 세율과 면세점, 과세표준, 신고 방법을 지방세법 조문 기준으로 순서대로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-resident-tax-employee-portion-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 주민세 종업원분이란 무엇인가요?</h2>
                <p>
                  사업소 종업원의 급여총액에 부과하는 주민세입니다. 주민세는 개인분, 사업소분, 종업원분으로 나뉘는데, 종업원분은 종업원에게 급여를 지급하는 사업주가 그 급여총액을 기준으로 부담합니다. 지역 사회의 인프라 비용을 사업 활동 규모에 맞춰 분담한다는 취지의 지방세입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>과세표준: 그 달에 지급한 종업원 급여총액(비과세 제외, §84의2)</li>
                    <li>세율: 급여총액의 0.5%(§84의3), 조례로 50% 범위 가감 가능</li>
                    <li>면세점: 최근 1년 월평균 급여총액 1억5천만원 이하(§84의4)</li>
                    <li>신고·납부: 급여 지급한 달의 다음 달 10일까지</li>
                    <li>납부처: 사업소 소재지 관할 지자체(위택스 전자신고 가능)</li>
                  </ul>
                </div>
                <p>
                  즉 종업원이 있다고 무조건 내는 것은 아니고, 급여 규모가 면세점을 넘는 사업소만 대상이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 세율과 면세점은 정확히 얼마인가요?</h2>
                <p>
                  세율은 급여총액의 0.5%, 면세점은 월평균 급여총액 1억5천만원입니다. 아래 표에 근거 조문과 함께 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주민세 종업원분 핵심 수치 (지방세법 §84의2~§84의4)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과세표준</td>
                        <td className="p-3">그 달 종업원 급여총액(비과세 제외)</td>
                        <td className="p-3">§84의2</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">표준세율</td>
                        <td className="p-3">0.5%(1천분의 5)</td>
                        <td className="p-3">§84의3</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">세율 조정</td>
                        <td className="p-3">조례로 표준세율의 50% 범위 가감</td>
                        <td className="p-3">§84의3</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">면세점</td>
                        <td className="p-3">최근 1년 월평균 급여총액 1억5천만원 이하</td>
                        <td className="p-3">§84의4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 지방자치단체가 조례로 세율을 조정하거나 면세점 세부 기준을 운영할 수 있으므로, 최종 세율과 면세점은 사업소 소재지 지자체 조례로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종업원분 계산 사례 (면세점 경계 포함)</h2>
                <p>
                  면세점은 &quot;넘으면 그 달 급여총액 전체에 0.5%&quot;가 붙는 구조입니다. 경계값을 포함해 세 가지 사례로 계산해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 월평균 급여총액 1억4천만원 (면세점 이하)</p>
                  <p className="text-sm text-text-secondary">
                    · 최근 1년 월평균 급여총액: 1억4천만원
                    <br />
                    · 면세점 1억5천만원 이하 → 부과 대상 아님
                    <br />
                    · 납부세액: <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 면세점 이하이면 세액이 없음(신고 여부는 지자체 안내 확인).</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 월평균 급여총액 1억6천만원 (면세점 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 최근 1년 월평균 급여총액: 1억6천만원 → 과세 대상
                    <br />
                    · 그 달 급여총액이 1억6천만원이라면
                    <br />
                    · 세액 = 1억6천만원 × 0.5% = <strong>80만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 면세점을 넘으면 초과분이 아니라 급여총액 전체에 0.5% 과세.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 월평균 급여총액 정확히 1억5천만원 (경계값)</p>
                  <p className="text-sm text-text-secondary">
                    · 최근 1년 월평균 급여총액: 1억5천만원
                    <br />
                    · 면세점은 &quot;1억5천만원 이하&quot;를 비과세로 규정 → 이하에 해당
                    <br />
                    · 납부세액: <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 딱 1억5천만원은 &quot;이하&quot;라 비과세. 이 금액을 넘어서면 과세로 전환.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 급여총액에서 비과세 근로소득을 제외하는 계산과 조례 세율 반영에 따라 실제 세액이 달라질 수 있으니, 위택스 신고 화면의 자동 계산을 함께 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-resident-tax-employee-portion-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고·납부는 어떻게 하나요?</h2>
                <p>
                  급여 지급월의 다음 달 10일까지 위택스로 신고·납부하면 됩니다. 종이 신고서 대신 전자신고를 이용하면 급여총액만 입력해도 세액이 자동 계산됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>기한:</strong> 급여를 지급한 달의 다음 달 10일까지. 7월 지급분은 8월 10일까지입니다.
                  </li>
                  <li>
                    <strong>방법:</strong> 위택스(wetax.go.kr) 접속 후 주민세 종업원분 전자신고, 또는 사업소 관할 지자체 방문 신고.
                  </li>
                  <li>
                    <strong>사업소 단위:</strong> 사업장이 여러 곳이면 각 사업소 소재지 지자체에 따로 신고합니다.
                  </li>
                  <li>
                    <strong>증빙 보관:</strong> 급여대장과 비과세 항목 근거를 보관해 두면 사후 확인에 대비할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 면세점 이하로 낼 세액이 없더라도 지자체에 따라 신고 안내가 다를 수 있으므로, 과세 대상 여부가 애매하면 미리 확인해 가산세 위험을 줄이세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/resident-tax-individual-portion-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주민세 개인분 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">개인이 8월에 내는 주민세 개인분 기준과 금액.</p>
                  </Link>
                  <Link
                    href="/guide/resident-tax-business-establishment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주민세 사업소분 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소 면적 기준 주민세 사업소분 계산법.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">급여에서 빠지는 세금·4대보험을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/non-taxable-salary-allowances-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비과세 급여 항목 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">급여총액에서 빠지는 비과세 근로소득 정리.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-withholding-tax-table-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로소득 간이세액표 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">매월 원천징수하는 근로소득세 계산 기준.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">사업자·직장인 세금 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 종업원분 주민세의 세율은 지방자치단체 조례로 표준세율의 50% 범위에서 가감될 수 있고, 면세점과 급여총액 산정 세부 기준도 지자체·개정에 따라 달라질 수 있으므로, 실제 세액과 신고 방법은 사업소 소재지 관할 지자체 또는 위택스에서 반드시 확인하세요. 근거는 <strong>지방세법 §84의2(과세표준)·§84의3(세율)·§84의4(면세점)</strong>입니다. 2026년 장기근속수당·육아휴직 대체인력 공제 등 개정 사항은 소관 부처 고시로 확정되니 함께 확인하세요. 본 콘텐츠는 2026-08-05 기준입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(지방세법)</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>.
                </p>
              </section>

              <ShareButtons
                title="주민세 종업원분 2026 가이드"
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
