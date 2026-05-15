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
    "7월은 부가가치세 확정신고와 하반기 연말정산 사전점검이 동시에 필요한 시기입니다. 신고 기한·공제 항목·준비 서류를 미리 파악해 놓치는 항목 없이 관리하세요.",
  keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","원천징수","세금 신고 일정","홈택스 신고"],
  alternates: { canonical: URL },
  openGraph: {
    title: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 부가가치세 확정신고와 하반기 연말정산 사전점검이 동시에 필요한 시기입니다. 신고 기한·공제 항목·준비 서류를 미리 파악해 놓치는 항목 없이 관리하세요.",
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
    answer: "신고 기한을 넘기면 무신고 가산세와 납부 지연에 따른 납부 지연 가산세가 부과될 수 있습니다. 기한 후 신고(기한후신고)를 통해 제출하면 가산세가 일부 경감되므로, 기한을 놓쳤더라도 가능한 빨리 신고하는 것이 유리합니다.",
  },
  {
    question: "간이과세자도 7월에 부가세를 신고해야 하나요?",
    answer: "간이과세자는 원칙적으로 1년에 1회(1월) 신고·납부하지만, 예정부과 제도 또는 특정 조건에 따라 7월에 예정고지 납부 의무가 생길 수 있습니다. 본인의 과세 유형과 고지 여부를 홈택스 또는 세무서에서 확인하시기 바랍니다.",
  },
  {
    question: "원천징수 반기납부 특례란 무엇인가요?",
    answer: "직전 과세기간 원천징수세액 합계가 일정 기준 이하인 소규모 사업장은 세무서 승인을 받아 6개월에 1회(1월, 7월) 납부하는 반기납부 특례를 적용받을 수 있습니다. 반기납부 적용 사업장은 7월 10일까지 상반기(1월~6월) 원천징수세액을 일괄 납부합니다.",
  },
  {
    question: "연말정산 사전점검 시 가장 많이 놓치는 항목은 무엇인가요?",
    answer: "실무에서 자주 누락되는 항목으로는 ① 부양가족 소득 요건 변동(취업·소득 발생 등), ② 월세액 세액공제 적용 가능 여부, ③ 의료비 중 실손보험으로 수령한 금액 차감 처리, ④ 연금저축·IRP 납입 한도 잔여 여부 등이 있습니다. 7월에 점검해 두면 하반기에 보완할 시간이 충분합니다.",
  },
  {
    question: "매입세액 공제가 불가능한 항목에는 어떤 것이 있나요?",
    answer: "접대비 관련 매입세액, 면세 사업에 사용된 재화·용역, 비영업용 소형 승용차 관련 매입세액, 사업과 직접 관련 없는 지출 등은 원칙적으로 공제가 불가합니다. 정확한 범위는 국세청 공식 안내(www.nts.go.kr)를 참고하거나 세무 전문가에게 확인하시기 바랍니다.",
  },
  {
    question: "전자세금계산서 미발급 시 불이익이 있나요?",
    answer: "의무 발급 대상 사업자가 전자세금계산서를 미발급하거나 지연 발급하면 가산세가 부과됩니다. 발급 기한과 전송 기한(발급일 다음 날)을 모두 준수해야 하며, 홈택스에서 발급 및 전송 상태를 실시간으로 확인할 수 있습니다.",
  },
  {
    question: "7월에 연금저축 추가 납입을 하면 연말정산에 바로 반영되나요?",
    answer: "연금저축·IRP 납입액은 해당 연도 1월 1일부터 12월 31일까지 실제 납입한 금액을 기준으로 공제됩니다. 7월에 납입한 금액은 당해 연도 연말정산에 반영되므로, 상반기 납입 현황을 확인하고 연간 공제 한도 범위 내에서 하반기 납입 계획을 조정하는 것이 좋습니다.",
  },
  {
    question: "홈택스에서 부가세 신고를 직접 할 수 있나요?",
    answer: "네, 홈택스(www.hometax.go.kr) 에서 전자신고가 가능합니다. 공동인증서(구 공인인증서) 또는 간편인증을 통해 로그인 후 '세금신고 > 부가가치세 신고' 메뉴에서 신고서를 작성하고 제출할 수 있습니다. 전자세금계산서 발급 내역은 자동으로 불러와지므로 대사 작업이 편리합니다.",
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
    description: "7월은 부가가치세 확정신고와 하반기 연말정산 사전점검이 동시에 필요한 시기입니다. 신고 기한·공제 항목·준비 서류를 미리 파악해 놓치는 항목 없이 관리하세요.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","원천징수","세금 신고 일정","홈택스 신고"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 부가가치세 확정신고와 하반기 연말정산 사전점검이 동시에 필요한 시기입니다. 신고 기한·공제 항목·준비 서류를 미리 파악해 놓치는 항목 없이 관리하세요.",
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
                  매년 7월은 개인사업자와 법인 모두에게 바쁜 세무 시즌입니다. 부가가치세 확정신고 기한이 돌아오는 동시에, 하반기 연말정산을 위한 공제 항목 사전점검도 병행해야 합니다. 지금부터 핵심 일정과 준비 사항을 체계적으로 정리합니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 부가가치세 확정신고란 무엇인가</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세는 사업자가 재화나 용역을 공급할 때 소비자로부터 징수하여 국가에 납부하는 세금입니다. 과세기간은 상반기(1월~6월)와 하반기(7월~12월)로 나뉘며, 상반기 과세기간에 대한 확정신고는 원칙적으로 7월 25일까지 완료해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">일반과세자는 6개월 단위로 신고·납부 의무가 있으며, 예정신고(또는 예정고지)를 통해 이미 납부한 세액이 있다면 확정신고 시 이를 차감하여 최종 납부세액을 산출합니다. 간이과세자는 신고 주기와 납부 방식이 달라지므로, 본인의 과세 유형을 먼저 확인하는 것이 중요합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 신고 핵심 일정 및 기한 정리</h2>
                <p className="leading-relaxed text-text-secondary">상반기 부가가치세 확정신고는 통상 7월 25일이 마감 기한입니다. 다만 해당 일이 공휴일이나 토·일요일에 해당하면 다음 첫 번째 평일로 연장됩니다. 정확한 기한은 국세청 홈택스(www.hometax.go.kr) 공지 사항에서 확인하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">7월에는 원천징수세액 납부 기한도 존재합니다. 6월에 지급한 급여·사업소득·기타소득 등에 대한 원천징수세액은 7월 10일까지 납부해야 하며, 반기납부 특례를 적용받는 소규모 사업장은 기한이 다르게 적용됩니다. 반기납부 적용 여부는 세무서 승인 여부로 결정되므로 사전에 확인이 필요합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">부가세 신고 전 반드시 점검할 서류 목록</h2>
                <p className="leading-relaxed text-text-secondary">신고 오류를 최소화하려면 아래 서류를 사전에 준비하는 것이 좋습니다. ① 세금계산서 합계표(매출·매입), ② 신용카드 및 현금영수증 매출 자료, ③ 매입 세금계산서·계산서 합계표, ④ 수출·영세율 관련 증빙 서류, ⑤ 공제 불가 항목(접대비, 면세 사업 관련 매입 등) 구분 자료. 홈택스 전자세금계산서 조회 화면에서 자동 집계된 내역과 직접 발행·수취 내역이 일치하는지 반드시 대사합니다.</p>
                <p className="leading-relaxed text-text-secondary">매입세액 공제가 불가한 항목을 잘못 공제하면 과소 납부로 이어져 가산세가 부과될 수 있습니다. 반대로 공제 가능한 항목을 누락하면 불필요하게 세액을 과다 납부하게 됩니다. 분류가 불명확한 항목은 세무사 등 전문가에게 확인하는 것이 안전합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">하반기 연말정산 사전점검: 지금 해야 하는 이유</h2>
                <p className="leading-relaxed text-text-secondary">연말정산은 1월에 진행되지만, 공제 항목 대부분은 1월 1일부터 12월 31일까지의 실적을 기준으로 합니다. 7월은 상반기가 마무리되는 시점인 만큼, 지금까지 누적된 공제 항목을 점검하고 하반기 전략을 세우기에 적합한 때입니다.</p>
                <p className="leading-relaxed text-text-secondary">사전점검 항목으로는 ① 연금저축·IRP 납입 현황, ② 주택청약종합저축 납입액, ③ 의료비·교육비 지출 현황, ④ 신용카드·체크카드·현금영수증 사용금액 비율, ⑤ 부양가족 공제 요건 변동(출생·사망·소득 변화) 등이 있습니다. 이 시점에 점검해 두면 하반기 남은 기간 동안 공제 요건에 맞게 지출 계획을 조정할 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">원천징수 이행상황신고서 작성 및 제출 주의사항</h2>
                <p className="leading-relaxed text-text-secondary">사업장에서 근로자에게 급여를 지급하는 경우, 매월 원천징수세액을 신고·납부해야 합니다. 원천징수 이행상황신고서는 홈택스 또는 위택스(wetax.go.kr)를 통해 전자 제출이 가능하며, 종이 제출은 관할 세무서 방문이 필요합니다.</p>
                <p className="leading-relaxed text-text-secondary">소득 유형별로 원천징수 방식이 다르기 때문에 근로소득·사업소득·기타소득·퇴직소득·이자·배당소득 등을 항목별로 정확히 구분하여 신고해야 합니다. 오류 신고 시 수정 신고를 통해 정정할 수 있지만, 기한 내 정정하지 않으면 가산세가 발생합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">calculatorhost 계산기 활용법</h2>
                <p className="leading-relaxed text-text-secondary">calculatorhost 에서는 부가가치세 납부세액 추정, 원천징수 세액 계산, 연말정산 예상 환급액 시뮬레이션 등을 무료로 이용할 수 있습니다. 회원가입 없이 모바일에서도 바로 사용 가능하며, 각 계산기에는 현행 세율 기준이 반영되어 있습니다. 단, 최종 신고세액은 반드시 홈택스 공식 신고 화면 또는 세무 전문가를 통해 확인하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">세율 및 공제 한도 등 상세 수치는 calculatorhost 의 부가세 계산기 및 연말정산 계산기 내 안내 사항과 국세청 공식 자료(www.nts.go.kr)를 함께 참고하시면 보다 정확한 정보를 얻을 수 있습니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">7월은 부가가치세 확정신고와 원천징수 납부, 그리고 하반기 연말정산 사전점검이 겹치는 세무 집중 시즌입니다. 각 기한을 달력에 미리 표시하고, 필요한 서류를 사전에 준비해 두면 가산세나 누락 없이 신고를 마칠 수 있습니다. calculatorhost 의 관련 계산기를 활용하여 예상 납부세액이나 공제 현황을 미리 시뮬레이션해 보시고, 구체적인 세무 판단이 필요한 경우에는 세무사 등 전문가와 반드시 상담하시기 바랍니다.</p>
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
                      국세청 홈택스 - 부가가치세 전자신고
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2270&amp;cntntsId=7708"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 - 부가가치세 신고·납부 안내
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.wetax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      위택스 - 지방세 신고·납부
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
