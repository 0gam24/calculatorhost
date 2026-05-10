import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { FaqSection } from '@/components/calculator/FaqSection';
import { MainBackrefBox } from '@/components/network/MainBackrefBox';
import { getMainCategoryUrl } from '@/lib/network/main-backref';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = "https://calculatorhost.com/guide/july-vat-and-tax-withholding/";
const DATE_PUBLISHED = "2026-05-10";
const DATE_MODIFIED = "2026-05-10";

export const metadata: Metadata = {
  title: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
  description:
    "7월은 1기 부가가치세 확정신고 마감과 연말정산 사전점검을 동시에 챙겨야 하는 달입니다. 신고 기한·준비 서류·절세 포인트를 한눈에 정리했습니다.",
  keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","원천징수","세금 신고 일정","부가세 환급"],
  alternates: { canonical: URL },
  openGraph: {
    title: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 1기 부가가치세 확정신고 마감과 연말정산 사전점검을 동시에 챙겨야 하는 달입니다. 신고 기한·준비 서류·절세 포인트를 한눈에 정리했습니다.",
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: { card: 'summary_large_image' },
};

const FAQ_ITEMS = [
  {
    question: "7월 부가세 확정신고 기한이 언제인가요?",
    answer: "1기 부가가치세 확정신고 기한은 7월 25일입니다. 기한 내에 신고와 납부를 모두 완료해야 가산세를 피할 수 있습니다. 공휴일과 겹칠 경우 다음 영업일로 연장될 수 있으므로 국세청 홈택스에서 해당 연도 기한을 재확인하십시오.",
  },
  {
    question: "간이과세자도 7월에 부가세를 신고해야 하나요?",
    answer: "간이과세자는 원칙적으로 연 1회(다음 해 1월 25일까지) 신고합니다. 다만 세금계산서를 발급하는 간이과세자나 특정 요건에 해당하는 경우 예외가 적용될 수 있습니다. 본인의 사업자 유형과 해당 연도 규정을 국세청 홈택스에서 반드시 확인하시기 바랍니다.",
  },
  {
    question: "부가세 환급은 언제 받을 수 있나요?",
    answer: "일반 환급의 경우 확정신고 기한 후 30일 이내 처리가 원칙이나, 국세청 심사 일정 및 환급 신청 규모에 따라 달라질 수 있습니다. 조기 환급 요건을 충족하면 더 빠른 환급이 가능하므로 국세청 홈택스에서 조기 환급 가능 여부를 확인하십시오.",
  },
  {
    question: "7월에 연말정산을 미리 준비해야 하는 이유는 무엇인가요?",
    answer: "연말정산 공제 항목은 1월부터 12월까지 전체 지출을 기준으로 산정됩니다. 7월 중간 점검을 통해 상반기 지출 현황을 파악하면 하반기 소비 방식(신용카드·체크카드 비율, 의료비 집행 시기 등)을 조정하여 공제 혜택을 최적화할 수 있습니다.",
  },
  {
    question: "원천징수 반기 납부 사업장은 7월에 무엇을 해야 하나요?",
    answer: "반기별 납부 승인을 받은 소규모 사업장은 1월~6월분 원천세를 7월 10일까지 일괄 신고·납부해야 합니다. 누락 시 가산세가 부과되므로 납부 기한을 반드시 달력에 표시해 두십시오.",
  },
  {
    question: "부양가족 공제를 7월에 점검해야 하는 이유가 있나요?",
    answer: "부양가족의 연간 소득이 일정 기준을 초과하면 해당 연도 연말정산에서 공제가 불가능합니다. 상반기 동안 가족의 소득 발생 여부를 확인하고, 기준 초과 가능성이 있다면 미리 파악해 두어야 연말에 착오 공제로 인한 추징을 방지할 수 있습니다.",
  },
  {
    question: "매입세액 공제를 받지 못하는 경우는 어떤 경우인가요?",
    answer: "사업과 직접 관련 없는 지출, 접대비 관련 매입세액, 비영업용 소형 승용차 관련 매입세액 등은 공제 대상에서 제외됩니다. 또한 적격 증빙(세금계산서, 신용카드 매출전표, 현금영수증)을 갖추지 못한 경우에도 공제가 제한될 수 있습니다. 상세 기준은 국세청 공식 자료를 참조하십시오.",
  },
  {
    question: "calculatorhost에서 부가세 관련 계산을 어떻게 활용할 수 있나요?",
    answer: "calculatorhost의 부가세 계산기를 이용하면 매출세액·매입세액·납부(환급) 세액을 간편하게 시뮬레이션할 수 있습니다. 회원가입 없이 무료로 이용 가능하며, 모바일에서도 최적화된 화면으로 제공됩니다. 다만 계산 결과는 참고용이며 실제 신고 시에는 공인된 세무 전문가의 검토를 받으시기 바랍니다.",
  },
];

export default function GuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost" },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 1기 부가가치세 확정신고 마감과 연말정산 사전점검을 동시에 챙겨야 하는 달입니다. 신고 기한·준비 서류·절세 포인트를 한눈에 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","원천징수","세금 신고 일정","부가세 환급"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 1기 부가가치세 확정신고 마감과 연말정산 사전점검을 동시에 챙겨야 하는 달입니다. 신고 기한·준비 서류·절세 포인트를 한눈에 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
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
                    { name: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost" },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가이드 · 2026-05-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  7월은 개인사업자와 법인 모두 1기 부가가치세 확정신고를 마감해야 하며, 동시에 하반기 연말정산을 대비한 사전점검을 시작하기에 적합한 시점입니다. 놓치기 쉬운 신고 항목과 준비 서류를 미리 파악해 두면 가산세 부담을 줄일 수 있습니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 부가가치세 확정신고란 무엇인가</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세는 1년을 두 기간으로 나누어 신고·납부하는 구조입니다. 1월 1일부터 6월 30일까지의 과세기간에 대한 확정신고 기한이 7월 25일로, 이 시점까지 매출세액과 매입세액을 정확히 정산해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">일반과세자는 매 기간 확정신고 의무가 있으며, 간이과세자는 연 1회 신고가 원칙이지만 세금계산서를 발급하는 간이과세자의 경우 별도 규정이 적용될 수 있으므로 본인의 사업자 유형을 먼저 확인하는 것이 중요합니다. 최신 기준은 국세청 공식 자료를 통해 확인하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">신고 준비 체크리스트: 꼭 챙겨야 할 서류</h2>
                <p className="leading-relaxed text-text-secondary">매출 관련 서류로는 세금계산서 합계표, 신용카드 매출전표 발행분, 현금영수증 내역이 필요합니다. 전자세금계산서를 발급했다면 국세청 전자세금계산서 시스템에서 합계를 자동으로 확인할 수 있어 편리합니다.</p>
                <p className="leading-relaxed text-text-secondary">매입 공제 항목 역시 꼼꼼하게 검토해야 합니다. 사업 관련 지출에 대한 세금계산서, 신용카드 매출전표, 현금영수증을 빠짐없이 수집해야 공제 혜택을 최대한 활용할 수 있습니다. 사업과 무관한 지출은 공제 대상이 되지 않으므로 주의가 필요합니다.</p>
                <p className="leading-relaxed text-text-secondary">수출 사업자나 영세율 적용 대상 거래가 있는 경우, 해당 근거 서류(수출신고필증, 외화 입금 증빙 등)를 별도로 구분하여 보관하십시오. 영세율 적용 시 매입세액 환급이 가능하므로 누락 없이 신청하는 것이 중요합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">부가세 환급 신청과 주의사항</h2>
                <p className="leading-relaxed text-text-secondary">매입세액이 매출세액을 초과하는 경우 부가세 환급이 발생합니다. 환급 신청은 확정신고 시 함께 이루어지며, 일반 환급의 경우 신고 기한 후 30일 이내에 처리되는 것이 일반적입니다. 다만 처리 기간은 국세청 심사 일정에 따라 달라질 수 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">조기 환급 제도를 활용하면 특정 요건을 충족할 경우 더 빠른 환급이 가능합니다. 수출 비중이 높거나 대규모 설비 투자가 있는 사업장이라면 조기 환급 신청 가능 여부를 국세청 홈택스에서 미리 확인해 두는 것이 좋습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월에 시작하는 연말정산 사전점검</h2>
                <p className="leading-relaxed text-text-secondary">연말정산은 매년 1~2월에 진행되지만, 공제 항목 대부분은 1월부터 12월까지의 지출 내역을 기반으로 합니다. 7월은 상반기 지출 현황을 중간 점검하여 하반기 전략을 세우기에 가장 적합한 시점입니다.</p>
                <p className="leading-relaxed text-text-secondary">주요 사전점검 항목으로는 의료비·교육비·기부금 지출 현황, 주택 관련 공제 요건 충족 여부, 신용카드·체크카드·현금영수증 사용 비율 등이 있습니다. 특히 신용카드와 체크카드는 공제율이 다르게 적용되므로, 하반기 지출 방식을 조정하는 것이 유리할 수 있습니다. 공제율 상세 내용은 calculatorhost의 연말정산 계산기에서 확인하실 수 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">부양가족 공제 요건도 중간에 점검이 필요합니다. 부양가족의 소득이 일정 기준을 초과하면 공제가 불가능해지므로, 가족의 근로·사업·금융 소득 발생 여부를 미리 파악해 두십시오. 최신 소득 기준은 국세청 공식 자료를 참조하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">원천징수 이행상황신고서 점검</h2>
                <p className="leading-relaxed text-text-secondary">사업장에서 직원에게 급여를 지급하는 경우, 매월 원천징수한 세액을 다음 달 10일까지 신고·납부해야 합니다. 7월에는 반기별 납부 사업장의 경우 1월~6월분을 일괄 정산하는 시점이기도 합니다.</p>
                <p className="leading-relaxed text-text-secondary">원천징수 신고 누락이나 과소 신고는 가산세 부과로 이어질 수 있습니다. 국세청 홈택스의 원천징수 이행상황신고서 작성 화면을 통해 월별 신고 현황을 재확인하고, 오류가 있다면 수정신고를 통해 정정하는 것이 바람직합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">가산세 예방을 위한 마감일 관리</h2>
                <p className="leading-relaxed text-text-secondary">7월의 주요 세금 일정을 달력에 미리 표시해 두는 것이 가산세 예방의 첫걸음입니다. 부가세 확정신고 기한인 7월 25일을 비롯해, 원천세 신고 기한(7월 10일), 지방소득세 신고 기한 등을 함께 관리하십시오.</p>
                <p className="leading-relaxed text-text-secondary">기한 내 신고를 마쳤더라도 납부를 하지 않으면 납부 지연 가산세가 발생합니다. 납부 여력이 부족할 경우 분납 제도나 납기 연장 신청 가능 여부를 국세청 홈택스 또는 세무서를 통해 미리 문의하는 것이 현명한 대처 방법입니다.</p>
                <p className="leading-relaxed text-text-secondary">calculatorhost의 부가세 계산기와 원천세 계산기를 활용하면 납부 예상 세액을 미리 시뮬레이션할 수 있어 자금 계획 수립에 도움이 됩니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">7월은 부가세 확정신고 마감과 연말정산 사전점검이 겹치는 세금 관리의 핵심 달입니다. 신고 기한과 준비 서류를 미리 점검하고, 원천징수 현황까지 함께 확인한다면 가산세 부담 없이 안정적으로 납세 의무를 이행할 수 있습니다. calculatorhost의 부가세 계산기와 연말정산 계산기를 참고용으로 활용하되, 개인별 세무 상황에 따라 세무 전문가와 상담하는 것을 권장합니다.</p>
              </section>

              <section aria-label="공식 출처" className="card">
                <h2 className="mb-3 text-lg font-semibold">공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/pp/index_pp.xml"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 홈택스 - 부가가치세 신고
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2227&amp;cntntsId=7708"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 - 부가가치세 안내
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title={"7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost"} url={URL} />

              <MainBackrefBox mainCategoryUrl={getMainCategoryUrl('tax')} />

              <section
                aria-label="작성 방식 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>작성 방식</strong>: 본 가이드는 Anthropic Claude AI 의 보조로 자동 초안이 생성되었으며,
                  운영자(김준혁, 스마트데이터샵)가 발행 전 법조항·세율·중복 콘텐츠를 검수하여 발행했습니다.
                  최종 검증일: 2026-05-10.
                </p>
                <p>
                  본 가이드는 참고용이며 법적 효력이 없습니다. 실제 세무·금융 처리는 세무사·국세청 등
                  공식 채널 안내를 받으시기 바랍니다. 세율·법조항 정확값은 calculatorhost 의 계산기 페이지
                  또는 국세청 공식 자료에서 최신값을 확인하세요.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
