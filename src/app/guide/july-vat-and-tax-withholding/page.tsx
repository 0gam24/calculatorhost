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
    "7월은 개인사업자 부가가치세 확정신고 마감과 연말정산 사전점검이 동시에 시작되는 달입니다. 신고 일정·준비 서류·절차를 한눈에 정리했습니다.",
  keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","개인사업자 세금","원천징수","세금 신고 일정"],
  alternates: { canonical: URL },
  openGraph: {
    title: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 개인사업자 부가가치세 확정신고 마감과 연말정산 사전점검이 동시에 시작되는 달입니다. 신고 일정·준비 서류·절차를 한눈에 정리했습니다.",
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
    question: "7월 부가세 신고 대상자는 누구인가요?",
    answer: "상반기(1~6월) 과세 실적이 있는 일반과세자가 주된 대상입니다. 간이과세자는 연 1회 신고가 원칙이나, 납부세액 기준 초과 시 7월에 예정부과 고지를 받거나 자진신고 대상이 될 수 있습니다. 자신의 과세 유형은 국세청 홈택스에서 확인할 수 있습니다.",
  },
  {
    question: "부가세 신고를 홈택스로 직접 할 수 있나요?",
    answer: "네, 국세청 홈택스(hometax.go.kr) 또는 손택스(모바일 앱)에서 전자신고가 가능합니다. 전자세금계산서 발급 실적이 있다면 데이터를 자동으로 불러올 수 있어 편리합니다.",
  },
  {
    question: "7월 10일 원천세 신고를 놓치면 어떻게 되나요?",
    answer: "신고·납부 기한을 초과하면 납부지연가산세와 무신고가산세가 부과될 수 있습니다. 가능한 한 빨리 수정 신고 또는 기한 후 신고를 진행하면 가산세를 일부 경감받을 수 있습니다. 정확한 경감 요건은 국세청 공식 안내를 참고하세요.",
  },
  {
    question: "연말정산 사전점검을 7월에 해야 하는 이유가 있나요?",
    answer: "공제 항목 대부분이 1~12월 누적 실적을 기준으로 합니다. 7월에 상반기 지출 현황을 파악하면, 하반기 체크카드 사용 비율 조정, 연금저축 추가 납입 등 실질적인 하반기 계획 수립이 가능합니다.",
  },
  {
    question: "전자세금계산서를 발급하지 않았을 때 불이익은 무엇인가요?",
    answer: "전자세금계산서 의무 발급 사업자가 미발급하거나 기한 내 전송하지 않으면 별도 가산세가 부과됩니다. 가산세 기준은 세법 개정에 따라 변동될 수 있으므로 최신 내용은 국세청 홈택스 공지사항을 확인하세요.",
  },
  {
    question: "부가세 신고 후 세금이 예상보다 많이 나왔을 때 분납이 가능한가요?",
    answer: "납부 세액이 일정 기준을 초과하는 경우 분납 신청이 가능합니다. 분납 요건과 절차는 국세청 홈택스 또는 관할 세무서를 통해 확인해야 하며, 분납 기간에도 일부 이자 상당 금액이 발생할 수 있습니다.",
  },
  {
    question: "간이과세자도 7월에 신고·납부 의무가 있나요?",
    answer: "간이과세자는 연 1회(다음 해 1월) 신고가 원칙이지만, 전년도 공급대가가 일정 기준을 초과하면 7월에 예정부과 고지서를 받게 됩니다. 이 경우 고지된 세액을 7월 25일까지 납부해야 합니다. 자세한 기준은 국세청 공식 안내를 참조하세요.",
  },
  {
    question: "연말정산 의료비 공제는 하반기 지출도 반영되나요?",
    answer: "연말정산 의료비 공제는 해당 연도 1월 1일부터 12월 31일까지 지출한 금액 전체를 기준으로 합니다. 상반기 지출이 기준 금액에 미치지 못하더라도 하반기 지출이 더해져 공제 요건을 충족할 수 있으므로, 영수증·간소화 자료를 꼼꼼히 보관해 두는 것이 중요합니다.",
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
    description: "7월은 개인사업자 부가가치세 확정신고 마감과 연말정산 사전점검이 동시에 시작되는 달입니다. 신고 일정·준비 서류·절차를 한눈에 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","개인사업자 세금","원천징수","세금 신고 일정"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 개인사업자 부가가치세 확정신고 마감과 연말정산 사전점검이 동시에 시작되는 달입니다. 신고 일정·준비 서류·절차를 한눈에 정리했습니다.",
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
                  7월은 상반기를 마감하는 동시에 부가가치세 확정신고와 하반기 연말정산 준비가 맞물리는 중요한 세금 일정 집중 구간입니다. 신고 기한·필요 서류·사전 점검 항목을 미리 파악해 두면 가산세 등 불필요한 불이익을 줄일 수 있습니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 부가가치세 확정신고란 무엇인가</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세(부가세)는 사업자가 재화나 용역을 공급하면서 소비자로부터 거래징수한 세금을 국가에 납부하는 구조입니다. 과세기간은 원칙적으로 상반기(1~6월)와 하반기(7~12월) 두 기간으로 나뉘며, 상반기 과세기간에 대한 확정신고·납부가 7월에 이루어집니다.</p>
                <p className="leading-relaxed text-text-secondary">일반과세자는 매년 1월(하반기분)과 7월(상반기분) 두 차례 확정신고를 합니다. 간이과세자는 연 1회 신고가 원칙이지만, 납부세액이 일정 기준을 초과하면 7월에 예정부과 고지 또는 자진신고를 해야 할 수 있으므로 자신의 과세 유형을 반드시 확인해야 합니다. 구체적인 신고 대상 여부와 납부 기준은 국세청 홈택스(hometax.go.kr)에서 개인 사업자등록 정보를 조회하여 확인할 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 부가세 신고 일정과 준비 서류</h2>
                <p className="leading-relaxed text-text-secondary">상반기(1~6월) 부가가치세 확정신고·납부 기한은 일반적으로 7월 25일입니다. 다만 해당 연도 세법 개정이나 공휴일 등에 따라 기한이 조정될 수 있으므로, 국세청 공식 세금 달력을 사전에 확인하는 것이 중요합니다.</p>
                <p className="leading-relaxed text-text-secondary">신고 시 필요한 주요 서류로는 매출·매입 세금계산서 합계표, 신용카드 매출전표 발행 집계표, 현금영수증 수취 내역, 수출실적명세서(해당자), 의제매입세액공제 신청서(해당자) 등이 있습니다. 전자세금계산서를 성실히 발급하고 홈택스에 연동해 두면 신고 시 데이터 자동 불러오기가 가능해 실수를 줄일 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">원천징수 이행상황 신고 놓치지 않기</h2>
                <p className="leading-relaxed text-text-secondary">사업자가 직원 급여, 프리랜서 용역비, 임대료 등을 지급할 때는 원천징수 의무가 발생합니다. 원천징수한 세액은 지급일이 속하는 달의 다음 달 10일까지 납부하고, 원천징수 이행상황 신고서를 제출해야 합니다. 7월 10일은 6월 귀속 원천세 신고·납부 마감일이므로 급여 지급 사업자는 일정을 혼동하지 않도록 주의해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">반기 납부 특례를 적용받는 소규모 사업장은 6개월치 원천세를 7월 10일 일괄 신고·납부합니다. 반기 납부 특례 신청 여부와 적용 기준은 홈택스에서 확인할 수 있으며, calculatorhost의 원천세 계산기를 활용하면 납부 세액을 사전에 추정할 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">연말정산 사전점검 — 하반기부터 준비하는 이유</h2>
                <p className="leading-relaxed text-text-secondary">연말정산은 매년 1~2월에 진행되지만, 실제 공제 항목의 상당수는 1월 1일부터 12월 31일 사이의 지출 실적이 기준이 됩니다. 7월은 상반기 지출을 중간 점검하고 하반기 절세 계획을 세울 수 있는 적기입니다.</p>
                <p className="leading-relaxed text-text-secondary">주요 사전점검 항목으로는 ▲의료비·교육비 지출 현황 ▲신용카드·체크카드·현금영수증 사용 비율 및 누적 금액 ▲주택청약종합저축 납입 내역 ▲개인형 퇴직연금(IRP)·연금저축 납입 현황 등이 있습니다. 이러한 항목들은 하반기 지출 방식을 조정함으로써 공제 혜택을 최적화할 여지가 있습니다. 단, 개인별 소득 수준과 가족 구성에 따라 적용 가능한 공제 범위가 달라지므로, 국세청 연말정산 미리 보기 서비스(hometax.go.kr)를 병행 활용하는 것을 권장합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">calculatorhost 계산기 활용 안내</h2>
                <p className="leading-relaxed text-text-secondary">calculatorhost는 부가세 계산기, 원천세 계산기, 연말정산 환급 예상 계산기 등을 무료로 제공합니다. 별도 회원가입 없이 모바일에서도 바로 사용할 수 있으며, 신고 전 자체 검토용으로 활용하기에 적합합니다.</p>
                <p className="leading-relaxed text-text-secondary">계산기 결과는 세법 일반 원칙을 기반으로 한 참고용 수치이며, 개인별 특수 상황이나 세법 개정 사항이 반영되지 않을 수 있습니다. 정확한 신고 금액과 최신 세율은 국세청 공식 자료 또는 세무 전문가 상담을 통해 최종 확인하시기 바랍니다. 구체 세율 수치는 국세청 홈택스 및 calculatorhost의 부가세 계산기 내 안내를 참조해 주세요.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">가산세 예방을 위한 체크리스트</h2>
                <p className="leading-relaxed text-text-secondary">신고·납부 기한을 놓치거나 신고 내용에 오류가 있으면 무신고가산세, 납부지연가산세 등이 부과될 수 있습니다. 특히 전자세금계산서 미발급·지연발급에 대한 가산세는 별도 기준이 적용되므로 발급 기한을 엄수해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">신고 전 반드시 확인해야 할 체크리스트는 다음과 같습니다. ① 전자세금계산서 발급·수취 내역 전수 확인 ② 매입세액 불공제 항목(접대비 관련 매입세액 등) 분리 ③ 신용카드 매출 누락 여부 점검 ④ 수정신고·경정청구 필요 여부 검토 ⑤ 납부 계좌 및 납부 수단 사전 확인. 이 항목들을 마감일 최소 1주일 전에 점검하면 막판 오류를 상당 부분 예방할 수 있습니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">7월은 부가가치세 확정신고, 원천세 신고·납부, 그리고 연말정산 중간 점검이 한꺼번에 집중되는 달입니다. 각 항목의 마감 기한과 준비 서류를 미리 파악해 두면 가산세 등 불필요한 비용을 예방할 수 있습니다. calculatorhost의 무료 계산기를 참고용으로 활용하고, 최종 신고 금액은 반드시 국세청 홈택스 공식 서비스나 세무 전문가를 통해 검증하시기 바랍니다. 세법은 매년 개정될 수 있으므로, 신고 전 국세청 최신 공지사항을 한 번 더 확인하는 습관이 중요합니다.</p>
              </section>

              <section aria-label="공식 출처" className="card">
                <h2 className="mb-3 text-lg font-semibold">공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.hometax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 홈택스 — 부가세·원천세 전자신고
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 공식 누리집 — 세금 달력·신고 안내
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
