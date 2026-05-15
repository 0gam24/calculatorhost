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
    "7월은 부가가치세 확정신고와 연말정산 사전점검을 동시에 챙겨야 하는 핵심 세무 시즌입니다. 신고 기한·준비 서류·절세 포인트를 단계별로 정리했습니다.",
  keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","원천징수","세무 일정","간이과세자"],
  alternates: { canonical: URL },
  openGraph: {
    title: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 부가가치세 확정신고와 연말정산 사전점검을 동시에 챙겨야 하는 핵심 세무 시즌입니다. 신고 기한·준비 서류·절세 포인트를 단계별로 정리했습니다.",
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
    question: "7월 부가세 신고 기한은 언제인가요?",
    answer: "일반적으로 7월 25일이 신고·납부 기한입니다. 해당 날짜가 공휴일이면 다음 영업일로 연장될 수 있으니 국세청 홈택스에서 연도별 기한을 반드시 확인하세요.",
  },
  {
    question: "간이과세자도 7월에 부가세를 신고해야 하나요?",
    answer: "간이과세자는 원칙적으로 1월에 연 1회 신고합니다. 단, 과세 유형 변경이나 사업 폐업 등 특수 상황에 따라 7월에 신고 의무가 발생할 수 있으므로 국세청 공지를 확인하시기 바랍니다.",
  },
  {
    question: "전자세금계산서를 발급하지 않으면 어떤 불이익이 있나요?",
    answer: "전자세금계산서 발급 의무자가 미발급하거나 지연 발급하면 공급가액의 일정 비율에 해당하는 가산세가 부과됩니다. 정확한 가산세율은 국세청 공식 자료(nts.go.kr)를 참조하세요.",
  },
  {
    question: "연말정산 사전점검을 7월에 해야 하는 이유가 있나요?",
    answer: "대부분의 공제 항목은 연간 한도가 설정되어 있습니다. 상반기 지출을 파악하면 하반기에 공제 한도를 초과하는 지출을 피하거나, 반대로 공제를 충분히 활용하지 못한 항목을 보완하는 계획을 세울 수 있습니다.",
  },
  {
    question: "사업용 신용카드를 등록하지 않으면 매입세액 공제가 안 되나요?",
    answer: "홈택스에 사업용 신용카드를 등록하면 사용 내역이 자동으로 집계되어 공제 누락을 방지할 수 있습니다. 미등록 카드도 수동 입력으로 공제가 가능하지만, 증빙 관리 오류 위험이 높아지므로 사전 등록을 권장합니다.",
  },
  {
    question: "원천세 반기납은 누구나 신청할 수 있나요?",
    answer: "반기납은 직전 과세 연도 상시 고용 인원이 일정 기준 이하인 소규모 사업자가 신청할 수 있습니다. 1월과 7월에 각각 반기 동안의 원천세를 납부하는 방식으로, 자세한 신청 요건은 홈택스(hometax.go.kr)에서 확인하시기 바랍니다.",
  },
  {
    question: "부가세 환급은 언제 받을 수 있나요?",
    answer: "일반환급은 신고 기한 후 약 30일 이내, 조기환급(영세율·시설투자 등)은 신고일로부터 약 15일 이내 처리되는 것이 일반적입니다. 다만 세무서 검토 일정에 따라 기간이 달라질 수 있습니다.",
  },
  {
    question: "법인사업자의 7월 부가세 신고 방식은 개인사업자와 다른가요?",
    answer: "법인사업자도 7월 25일까지 상반기(1~6월) 부가세를 확정 신고해야 합니다. 과세 기간 구분은 동일하나, 법인은 별도의 법인세 신고 일정도 관리해야 하므로 세무 캘린더를 이중으로 확인하는 것이 중요합니다.",
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
    description: "7월은 부가가치세 확정신고와 연말정산 사전점검을 동시에 챙겨야 하는 핵심 세무 시즌입니다. 신고 기한·준비 서류·절세 포인트를 단계별로 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","원천징수","세무 일정","간이과세자"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 부가가치세 확정신고와 연말정산 사전점검을 동시에 챙겨야 하는 핵심 세무 시즌입니다. 신고 기한·준비 서류·절세 포인트를 단계별로 정리했습니다.",
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
                  매년 7월은 개인사업자와 법인 모두 부가가치세 확정신고를 마감해야 하는 시기입니다. 동시에 근로소득자는 연말정산 누락 항목을 미리 점검해 두면 이듬해 1월 정산 부담을 줄일 수 있습니다. 이 가이드는 7월 세무 일정 전반을 체계적으로 안내합니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 부가가치세 확정신고란 무엇인가</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세(부가세)는 재화와 서비스의 공급에 대해 부과되는 세금으로, 일반과세자는 1년에 두 번(1월·7월), 간이과세자는 원칙적으로 1월에 연 1회 신고합니다. 7월 확정신고는 1월 1일부터 6월 30일까지의 과세 기간에 발생한 매출·매입 세액을 정산하는 절차입니다.</p>
                <p className="leading-relaxed text-text-secondary">신고 기한은 통상 7월 25일이며, 기한을 초과하면 가산세가 부과될 수 있습니다. 홈택스(hometax.go.kr)에서 전자 신고를 이용하면 서류 제출 없이 온라인으로 완료할 수 있으며, 신고 후 납부 세액이 발생한 경우 같은 날까지 납부를 마쳐야 합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">신고 대상자별 준비 사항</h2>
                <p className="leading-relaxed text-text-secondary">일반과세자는 매출세액과 매입세액을 각각 집계한 뒤 차액을 납부하거나 환급받습니다. 세금계산서·신용카드매출전표·현금영수증 등 증빙을 빠짐없이 수집해야 하며, 전자세금계산서 발급 의무 대상자는 발급 여부를 재확인해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">간이과세자는 세액 계산 방식이 일반과세자와 다르며, 업종별 부가가치율이 적용됩니다. 과세 유형 변경이 예정된 경우 국세청 공지를 확인하고 미리 신고 방식을 파악해 두는 것이 중요합니다. 최신 세율 및 업종별 부가가치율은 국세청 공식 자료(nts.go.kr) 또는 calculatorhost의 부가세 계산기를 통해 확인하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">매입세액 공제 항목 점검</h2>
                <p className="leading-relaxed text-text-secondary">매입세액 공제는 사업 관련 지출에서 발생한 부가세를 납부세액에서 차감하는 제도입니다. 공제 가능 항목은 적격 증빙(세금계산서, 신용카드 매출전표 등)이 갖춰진 사업 목적 지출에 한하며, 접대비·비업무용 차량 관련 지출 등은 공제에서 제외될 수 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">간과하기 쉬운 항목으로는 사업용 신용카드 미등록 지출, 전자세금계산서 수취 오류, 과세·면세 겸업 시 안분 계산 누락 등이 있습니다. 신고 전 매입 내역을 꼼꼼히 검토하면 불필요한 납부세액을 줄이는 데 도움이 됩니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월에 미리 하는 연말정산 사전점검</h2>
                <p className="leading-relaxed text-text-secondary">연말정산은 매년 1~2월에 진행되지만, 공제 항목 대부분은 해당 연도 1월부터 12월까지의 지출에 근거합니다. 7월 시점에 상반기 지출 내역을 점검하면 하반기 소비·저축 계획을 조정할 여지가 생깁니다.</p>
                <p className="leading-relaxed text-text-secondary">주요 사전점검 항목은 ▲의료비 지출 현황 ▲교육비(취학 전 아동·중고대학생 포함) ▲주택청약저축 납입 ▲개인연금·IRP 납입액 ▲기부금 영수증 누락 여부 등입니다. 국세청 연말정산 미리보기 서비스는 매년 10~11월 제공되지만, 7월 중 가계부나 카드 명세서를 통해 자체 중간 점검을 해두면 실수를 줄일 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">원천징수 이행상황신고서 제출 확인</h2>
                <p className="leading-relaxed text-text-secondary">사업자(원천징수의무자)는 직원 급여, 프리랜서 용역비, 이자·배당 등을 지급할 때 원천세를 공제하고 다음 달 10일까지 신고·납부해야 합니다. 7월분 원천세(6월 귀속)는 8월 10일까지 납부가 원칙이며, 반기납 신청 사업자는 별도 일정이 적용됩니다.</p>
                <p className="leading-relaxed text-text-secondary">원천징수이행상황신고서는 홈택스에서 전자 제출이 가능합니다. 직원 수 변동, 비과세 항목(식대·교통비 등) 적용 여부, 외국인 근로자 세율 적용 특례 등을 매월 점검하면 연말 정산 시 오류를 예방할 수 있습니다. 관련 세율은 calculatorhost의 원천세 계산기 또는 국세청 공식 자료를 참조하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">calculatorhost 7월 추천 계산기</h2>
                <p className="leading-relaxed text-text-secondary">calculatorhost는 회원가입 없이 무료로 이용할 수 있는 세금·재무 계산기를 제공합니다. 7월에 특히 유용한 계산기로는 ▲부가세 계산기(매출·매입세액 자동 산출) ▲원천세 계산기(급여·용역 지급액 기준 원천세 계산) ▲연말정산 환급 예상 계산기(상반기 공제 항목 입력 기반) 등이 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">모바일에 최적화된 UI로 언제 어디서나 간편하게 계산 결과를 확인할 수 있습니다. 단, 계산기 결과는 참고용이며 실제 세액은 개인 상황과 최신 법령에 따라 달라질 수 있으므로, 신고 전 세무사 또는 국세청 상담을 병행하시기 바랍니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">7월은 부가세 확정신고와 원천세 이행, 그리고 연말정산 사전점검이 겹치는 세무 집중 시기입니다. 신고 기한과 제출 서류를 미리 파악하고, calculatorhost의 무료 계산기를 활용해 예상 세액을 사전에 확인해 두면 실수와 가산세 위험을 낮출 수 있습니다. 개별 세무 상황은 세무사 또는 국세청 상담을 통해 정확한 확인을 권장합니다.</p>
              </section>

              <section aria-label="공식 출처" className="card">
                <h2 className="mb-3 text-lg font-semibold">공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index.xml"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 홈택스 — 부가세·원천세 전자신고
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2272&amp;cntntsId=7710"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 — 부가가치세 신고·납부 안내
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
