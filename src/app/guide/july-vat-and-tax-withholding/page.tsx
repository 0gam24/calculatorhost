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
const DATE_PUBLISHED = "2026-05-15";
const DATE_MODIFIED = "2026-05-15";

export const metadata: Metadata = {
  title: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
  description:
    "7월은 부가세 확정신고와 연말정산 사전점검이 겹치는 세금 집중 시기입니다. 신고 기한·준비 서류·절차를 정리하여 가산세 없이 마감을 마칠 수 있도록 안내합니다.",
  keywords: ["7월 부가세신고","부가가치세 확정신고","연말정산 사전점검","세금 신고 기한","홈택스 부가세","원천징수"],
  alternates: { canonical: URL },
  openGraph: {
    title: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 부가세 확정신고와 연말정산 사전점검이 겹치는 세금 집중 시기입니다. 신고 기한·준비 서류·절차를 정리하여 가산세 없이 마감을 마칠 수 있도록 안내합니다.",
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
    question: "7월 부가세 확정신고 기한은 언제인가요?",
    answer: "일반과세자는 매년 7월 25일까지 상반기 부가가치세 확정신고를 마쳐야 합니다. 정확한 기한은 연도별로 소폭 변동될 수 있으므로 국세청 홈택스(hometax.go.kr)에서 최신 공지를 확인하세요.",
  },
  {
    question: "간이과세자도 7월에 부가세 신고를 해야 하나요?",
    answer: "간이과세자는 일반과세자와 신고 횟수·방식이 다를 수 있습니다. 연 1회 신고가 원칙이며, 납부 의무 면제 대상 여부도 달라질 수 있으므로 본인의 과세유형을 홈택스 또는 세무서에서 먼저 확인하는 것이 좋습니다.",
  },
  {
    question: "부가세 신고 시 매입세액 공제를 받을 수 없는 항목은 무엇인가요?",
    answer: "개인적 소비 지출, 비영업용 소형승용차 관련 비용, 접대비 관련 매입세액 등은 원칙적으로 공제 대상에서 제외됩니다. 공제 가능 여부는 지출 항목별로 다르므로, 세무사 상담이나 국세청 자료를 참조하시기 바랍니다.",
  },
  {
    question: "연말정산 공제 항목을 7월에 점검해야 하는 이유가 있나요?",
    answer: "의료비·교육비·기부금 등 주요 공제 항목은 연간 누적 금액 기준으로 적용됩니다. 7월에 상반기 지출을 중간 집계하면 하반기 지출 계획을 조율하여 공제 항목을 효율적으로 활용할 수 있는 가능성이 높아집니다.",
  },
  {
    question: "반기별 원천세 납부란 무엇인가요?",
    answer: "상시 고용 직원이 일정 수 미만인 소규모 사업자는 세무서 승인을 받아 원천세를 반기(6개월)별로 신고·납부할 수 있습니다. 상반기분은 7월 10일까지 납부하는 것이 원칙이며, 기한은 국세청 공지를 통해 확인하세요.",
  },
  {
    question: "홈택스에서 부가세 신고를 처음 하는 경우 어떻게 시작하나요?",
    answer: "홈택스(hometax.go.kr)에 공동인증서 또는 간편인증으로 로그인한 뒤, '신고/납부 > 부가가치세' 메뉴에서 신고 유형을 선택합니다. 전자세금계산서 발행 내역은 자동으로 불러올 수 있어 입력 오류를 줄일 수 있습니다.",
  },
  {
    question: "부가세 신고를 기한 내에 못 하면 어떻게 되나요?",
    answer: "기한 후 신고를 하거나 신고 자체를 하지 않으면 무신고 가산세와 납부지연 가산세가 부과될 수 있습니다. 가산세 규모는 납부세액 및 지연 기간에 따라 달라지므로, 기한 초과 시 최대한 빠르게 자진 신고하는 것이 유리합니다.",
  },
  {
    question: "calculatorhost 부가세 계산기는 어떤 경우에 유용한가요?",
    answer: "홈택스에 신고하기 전 예상 납부세액을 미리 파악하고 싶을 때, 또는 매출·매입 변화에 따른 세액 시뮬레이션이 필요할 때 활용하면 편리합니다. 회원가입 없이 모바일에서 바로 사용 가능합니다.",
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
    description: "7월은 부가세 확정신고와 연말정산 사전점검이 겹치는 세금 집중 시기입니다. 신고 기한·준비 서류·절차를 정리하여 가산세 없이 마감을 마칠 수 있도록 안내합니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["7월 부가세신고","부가가치세 확정신고","연말정산 사전점검","세금 신고 기한","홈택스 부가세","원천징수"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 부가세 확정신고와 연말정산 사전점검이 겹치는 세금 집중 시기입니다. 신고 기한·준비 서류·절차를 정리하여 가산세 없이 마감을 마칠 수 있도록 안내합니다.",
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
                <p className="mb-2 text-caption text-text-tertiary">가이드 · 2026-05-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  매년 7월은 상반기 부가가치세 확정신고 기한이 집중되고, 동시에 연말정산을 위한 공제 항목 중간 점검을 시작하기에 적합한 시기입니다. 신고 누락이나 서류 미비로 인한 가산세를 피하려면 주요 일정과 준비 사항을 미리 파악해 두는 것이 중요합니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 부가가치세 확정신고 개요</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세는 사업자가 재화나 용역을 공급하면서 거래 상대방으로부터 징수한 세금을 국가에 납부하는 구조입니다. 과세기간은 크게 두 차례로 나뉘며, 상반기(1월 1일~6월 30일)에 해당하는 확정신고 기한이 7월에 집중됩니다.</p>
                <p className="leading-relaxed text-text-secondary">일반과세자는 매년 7월 25일까지 상반기 확정신고를 마쳐야 합니다. 신고 기한을 넘기면 무신고 가산세 또는 납부지연 가산세가 부과될 수 있으므로 일정 관리가 중요합니다. 정확한 신고 기한 및 납부 방법은 국세청 홈택스(hometax.go.kr)에서 확인하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">과세유형별 신고 방식 차이</h2>
                <p className="leading-relaxed text-text-secondary">사업자는 크게 일반과세자와 간이과세자로 나뉩니다. 일반과세자는 매출세액에서 매입세액을 차감하여 납부세액을 계산하며, 세금계산서 발행 의무가 있습니다. 간이과세자는 업종별로 다른 부가가치율을 적용하여 세액을 산출하므로 계산 방식이 다릅니다.</p>
                <p className="leading-relaxed text-text-secondary">간이과세자 중 일정 기준 이하의 사업자는 납부 의무 면제 대상이 될 수 있습니다. 본인의 과세유형과 해당 기준은 홈택스 또는 세무서를 통해 반드시 확인해야 하며, calculatorhost의 부가세 계산기를 활용하면 예상 납부세액을 미리 파악하는 데 도움이 됩니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 부가세 신고 시 필수 준비 서류</h2>
                <p className="leading-relaxed text-text-secondary">신고에 앞서 상반기 매출·매입 내역을 정리하고 세금계산서, 신용카드 매출전표, 현금영수증 발행 내역을 빠짐없이 수집해야 합니다. 전자세금계산서는 홈택스에 자동 집계되지만, 수기로 발행한 세금계산서나 외부 거래분은 별도로 확인이 필요합니다.</p>
                <p className="leading-relaxed text-text-secondary">공제 가능한 매입세액에는 사업과 관련된 원재료 구매, 시설 투자, 임차료 등이 포함됩니다. 단, 개인적 소비나 비사업용 지출에서 발생한 세액은 공제 대상이 되지 않으므로 항목별로 구분하여 정리하는 것이 좋습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">연말정산 사전점검: 7월부터 시작해야 하는 이유</h2>
                <p className="leading-relaxed text-text-secondary">연말정산은 1~2월에 진행되지만, 공제 항목 대부분은 연간 누적 금액을 기준으로 판단합니다. 7월은 상반기가 마무리된 시점으로, 의료비·교육비·기부금 등 주요 공제 항목의 중간 집계를 통해 하반기 지출 계획을 세우기에 적절한 시점입니다.</p>
                <p className="leading-relaxed text-text-secondary">예를 들어(시나리오), 연간 의료비 공제 한도를 고려할 때 상반기 지출이 적었다면 하반기에 계획된 의료 지출을 특정 연도로 조율하는 전략을 검토할 수 있습니다. 다만 개인 상황에 따라 결과가 다르므로, 세무사 또는 국세청 상담센터를 통해 구체적 검토를 받는 것을 권장합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">원천징수 이행상황 중간 점검</h2>
                <p className="leading-relaxed text-text-secondary">사업주는 임직원 급여 지급 시 원천징수한 세액을 매월 또는 반기별로 신고·납부해야 합니다. 반기납 사업자의 경우 7월은 상반기분 원천세를 납부하는 시기이기도 합니다. 납부 기한과 신고 방식은 사업장 규모 및 신청 유형에 따라 달라집니다.</p>
                <p className="leading-relaxed text-text-secondary">원천징수 신고·납부 기한을 준수하지 않으면 가산세가 부과될 수 있습니다. 정확한 기한 및 신고 절차는 국세청 홈택스(hometax.go.kr) 또는 위택스(wetax.go.kr)에서 확인하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">calculatorhost 계산기 활용 방법</h2>
                <p className="leading-relaxed text-text-secondary">calculatorhost는 부가세 계산기, 원천세 계산기, 연말정산 환급 예상 계산기 등을 무료로 제공합니다. 회원가입 없이 모바일에서 바로 사용할 수 있으며, 예상 세액을 미리 파악하면 신고 전 오류를 줄이는 데 도움이 됩니다.</p>
                <p className="leading-relaxed text-text-secondary">계산기 결과는 참고용 예상값이며, 실제 세액은 개인·사업자 상황에 따라 달라질 수 있습니다. 최종 신고 전에는 반드시 공식 신고 시스템 또는 세무 전문가를 통해 검증하시기 바랍니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">7월은 부가가치세 확정신고와 원천세 반기 납부, 연말정산 중간 점검이 동시에 맞물리는 세금 집중 시기입니다. 신고 기한과 필요 서류를 미리 정리하고, calculatorhost 계산기를 통해 예상 세액을 파악한 뒤 홈택스에서 정확하게 신고하는 절차를 권장합니다. 세법은 매년 개정될 수 있으므로, 최신 정보는 국세청 공식 채널을 통해 반드시 확인하시기 바랍니다.</p>
              </section>

              <section aria-label="공식 출처" className="card">
                <h2 className="mb-3 text-lg font-semibold">공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 홈택스 - 부가가치세 신고·납부
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2352&amp;cntntsId=7742"
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
                  최종 검증일: 2026-05-15.
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
