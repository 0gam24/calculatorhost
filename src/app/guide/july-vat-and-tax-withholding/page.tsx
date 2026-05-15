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
    "7월은 1기 부가가치세 확정신고 마감과 연말정산 사전점검을 동시에 챙겨야 하는 달입니다. 신고 기한·준비 서류·자주 틀리는 항목을 한눈에 정리했습니다.",
  keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","세금 신고 일정","원천징수","사업자 세금","부가세 환급"],
  alternates: { canonical: URL },
  openGraph: {
    title: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 1기 부가가치세 확정신고 마감과 연말정산 사전점검을 동시에 챙겨야 하는 달입니다. 신고 기한·준비 서류·자주 틀리는 항목을 한눈에 정리했습니다.",
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
    question: "7월 부가세 확정신고 기한을 놓치면 어떻게 되나요?",
    answer: "신고 기한을 초과하면 무신고 가산세 및 납부 지연 가산세가 부과됩니다. 가산세는 납부 지연 일수에 따라 증가하므로 기한 경과 즉시 기한 후 신고를 진행하는 것이 유리합니다. 자세한 가산세율은 국세청 홈택스(hometax.go.kr)에서 확인할 수 있습니다.",
  },
  {
    question: "간이과세자도 7월에 부가세를 신고해야 하나요?",
    answer: "간이과세자는 원칙적으로 연 1회(1월) 신고합니다. 다만 연 공급대가가 일정 기준을 초과하거나 일반과세자로 전환된 경우에는 7월 신고 의무가 생길 수 있습니다. 본인의 과세 유형을 홈택스에서 확인하시기 바랍니다.",
  },
  {
    question: "전자세금계산서를 발행하지 않은 거래는 어떻게 처리하나요?",
    answer: "종이 세금계산서나 간이영수증 등 수기 발행 거래는 홈택스에 자동 집계되지 않습니다. 해당 건은 직접 신고 화면에 입력하거나, 세금계산서 합계표에 별도 기재해야 공제 누락을 방지할 수 있습니다.",
  },
  {
    question: "부가세 환급금은 언제 받을 수 있나요?",
    answer: "일반 환급은 신고 기한 후 30일 이내, 조기 환급은 신고일로부터 15일 이내 지급됩니다. 등록된 환급 계좌가 정확한지 신고 전 반드시 확인하십시오.",
  },
  {
    question: "연말정산 사전점검은 언제부터 시작하는 것이 좋나요?",
    answer: "7월은 상반기 지출 실적이 확정되는 시점이므로 공제 항목별 현황을 파악하기 좋습니다. 의료비·교육비·기부금은 영수증이 발급되는 즉시 보관하고, 신용카드·직불카드 사용 비중도 이 시점에 점검하면 하반기 지출 계획을 조정하는 데 도움이 됩니다.",
  },
  {
    question: "7월 원천징수 신고·납부 기한은 언제인가요?",
    answer: "6월분 급여·용역에 대한 원천징수 이행상황 신고 및 납부 기한은 7월 10일입니다. 반기 납부 승인 사업자는 1~6월분을 7월 10일까지 일괄 납부해야 합니다.",
  },
  {
    question: "사업용 카드와 개인 카드를 혼용했을 때 매입세액 공제가 가능한가요?",
    answer: "사업용으로 사용한 지출이라면 개인 카드로 결제하더라도 매입세액 공제 대상이 될 수 있습니다. 단, 해당 지출이 사업과 직접 관련됨을 증명할 수 있어야 하며, 비영업용 승용차 관련 지출 등 법정 제한 항목은 공제가 불가합니다.",
  },
  {
    question: "부가세 신고는 직접 해도 되나요, 세무사에게 맡겨야 하나요?",
    answer: "간단한 구조의 사업자라면 홈택스를 통해 직접 신고할 수 있습니다. 수출·면세·부동산 임대 등 복잡한 항목이 포함되거나 환급 금액이 큰 경우에는 세무사 검토를 권장합니다. calculatorhost의 부가세 계산기로 예상 세액을 먼저 확인한 후 신고에 참고하실 수 있습니다.",
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
    description: "7월은 1기 부가가치세 확정신고 마감과 연말정산 사전점검을 동시에 챙겨야 하는 달입니다. 신고 기한·준비 서류·자주 틀리는 항목을 한눈에 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","세금 신고 일정","원천징수","사업자 세금","부가세 환급"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 1기 부가가치세 확정신고 마감과 연말정산 사전점검을 동시에 챙겨야 하는 달입니다. 신고 기한·준비 서류·자주 틀리는 항목을 한눈에 정리했습니다.",
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
                  7월은 개인사업자·법인 모두 1기 부가가치세 확정신고를 마무리하고, 하반기 연말정산을 미리 대비해야 하는 세금 관리의 중요한 전환점입니다. 신고 기한을 놓치면 가산세가 부과될 수 있으므로 일정과 준비 사항을 사전에 꼼꼼히 확인하는 것이 중요합니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 부가가치세 1기 확정신고란?</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세(부가세)는 일반과세자 기준으로 1월~6월(1기)과 7월~12월(2기)로 나뉘어 각각 신고·납부합니다. 1기 확정신고는 매년 7월 25일까지 제출해야 하며, 해당 기간 동안 발생한 매출세액과 매입세액을 정산합니다.</p>
                <p className="leading-relaxed text-text-secondary">4월에 진행한 1기 예정신고(1~3월분)와 달리, 확정신고는 1월부터 6월까지 6개월 전체 실적을 반영합니다. 예정신고 때 납부한 세액은 확정신고 시 차감되므로 이중 납부 걱정 없이 차액만 정산됩니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">신고 대상 및 기한 체크리스트</h2>
                <p className="leading-relaxed text-text-secondary">일반과세자는 7월 25일까지 확정신고 및 납부를 완료해야 합니다. 간이과세자 중 연 환산 공급대가가 일정 기준 이상인 경우에도 신고 의무가 발생할 수 있으므로, 본인의 과세 유형을 국세청 홈택스(hometax.go.kr)에서 사전 확인하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">신고에 필요한 주요 서류로는 세금계산서 합계표, 신용카드 매출전표 합계, 현금영수증 내역, 수출입 증빙(해당자), 매입 세금계산서 등이 있습니다. 전자세금계산서는 홈택스에서 자동 집계되므로 수기 발행분 누락 여부를 별도 점검해야 합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">매입세액 공제 시 자주 놓치는 항목</h2>
                <p className="leading-relaxed text-text-secondary">업무 관련 지출임에도 공제를 누락하는 사례가 많습니다. 사업용 차량 유류비, 거래처 접대비 중 신용카드 결제분, 사무용 소모품 구입 영수증 등은 반드시 매입세액 공제 가능 여부를 확인하십시오. 단, 비영업용 승용차 관련 매입세액은 원칙적으로 공제가 제한됩니다.</p>
                <p className="leading-relaxed text-text-secondary">간혹 면세 품목에 대한 세금계산서를 매입세액으로 잘못 공제하는 오류도 발생합니다. 면세 매입분은 공제 대상이 아니므로 매입 내역 분류를 사전에 검토하시기 바랍니다. 오류 발견 시 수정신고 또는 경정청구를 통해 정정할 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">환급 신청과 조기 환급 제도</h2>
                <p className="leading-relaxed text-text-secondary">매입세액이 매출세액을 초과하면 환급이 발생합니다. 일반적인 환급은 신고 후 30일 이내 지급되나, 사업 초기·시설 투자·수출 등 일정 요건을 충족하면 조기 환급 신청이 가능합니다. 조기 환급은 신고일로부터 15일 이내 지급됩니다.</p>
                <p className="leading-relaxed text-text-secondary">환급 계좌는 홈택스 등록 계좌로 입금되므로, 신고 전 '환급금 이체 계좌'가 최신 정보로 등록되어 있는지 확인하십시오. 계좌 미등록 시 환급이 지연될 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월부터 시작하는 연말정산 사전점검</h2>
                <p className="leading-relaxed text-text-secondary">연말정산은 12월~1월에 집중적으로 진행되지만, 공제 항목의 대부분은 연간 누적 실적에 따라 결정됩니다. 7월은 상반기 실적을 점검하고 하반기 지출 계획을 조정하기 가장 적합한 시점입니다.</p>
                <p className="leading-relaxed text-text-secondary">국민연금·건강보험 납부 이력, 의료비·교육비·기부금 영수증, 신용카드 및 직불카드 사용 내역, 주택 관련 공제 서류(청약·대출이자 등) 등을 지금부터 관리 파일로 정리해 두면 내년 1월 연말정산 시 시간과 오류를 크게 줄일 수 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">특히 중도 입사·퇴사자, 육아휴직 복귀자, 부양가족 변동이 있는 근로자는 변경 사항을 회사 담당자에게 미리 알려 공제 누락을 방지하는 것이 좋습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">원천징수 이행상황 신고와 7월 마감 일정</h2>
                <p className="leading-relaxed text-text-secondary">사업자가 근로자·프리랜서에게 급여·용역비를 지급할 때 원천징수한 세액은 매월 10일까지 신고·납부해야 합니다. 7월 10일은 6월분 원천징수 이행상황 신고 마감일입니다. 반기 납부 승인 사업자는 7월 10일이 상반기(1~6월분) 일괄 납부 기한이기도 합니다.</p>
                <p className="leading-relaxed text-text-secondary">원천징수세액 계산이 복잡하게 느껴진다면, calculatorhost의 원천세 계산기를 활용해 간편하게 산출할 수 있습니다. 최신 세율은 국세청 공식 자료(nts.go.kr)를 참조하시고, 정확한 신고·납부는 반드시 세무사 등 전문가와 검토하십시오.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">7월은 부가가치세 1기 확정신고, 원천징수 이행상황 신고, 연말정산 사전점검이 겹치는 세금 집중 관리 시기입니다. 각 신고의 기한과 준비 서류를 미리 정리하고, 가산세 없이 기한 내 신고를 완료하는 것이 가장 중요합니다. calculatorhost의 부가세·원천세 계산기를 활용해 예상 세액을 사전에 파악하고, 세부 사항은 국세청 홈택스 또는 세무 전문가를 통해 최종 확인하시기 바랍니다.</p>
              </section>

              <section aria-label="공식 출처" className="card">
                <h2 className="mb-3 text-lg font-semibold">공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.hometax.go.kr/websquare/websquare.wss?w2xPath=/ui/pp/index_pp.xml"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 홈택스 - 부가가치세 신고
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2227&amp;cntntsId=7692"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 - 부가가치세 신고·납부 안내
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
