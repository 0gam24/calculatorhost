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

const URL = "https://calculatorhost.com/guide/october-vat-q3-preliminary/";
const DATE_PUBLISHED = "2026-05-10";
const DATE_MODIFIED = "2026-05-10";

export const metadata: Metadata = {
  title: "부가세 3차 예정신고 2026 | calculatorhost",
  description:
    "10월은 부가세 3차 예정신고 기간입니다. 신고 대상·기간·납부 방법을 단계별로 정리하고, calculatorhost 부가세 계산기로 예상 세액을 미리 확인하세요.",
  keywords: ["부가세 예정신고","3차 예정신고","10월 부가세","부가가치세 신고","개인사업자 부가세","부가세 납부"],
  alternates: { canonical: URL },
  openGraph: {
    title: "부가세 3차 예정신고 2026 | calculatorhost",
    description: "10월은 부가세 3차 예정신고 기간입니다. 신고 대상·기간·납부 방법을 단계별로 정리하고, calculatorhost 부가세 계산기로 예상 세액을 미리 확인하세요.",
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
    question: "개인 일반과세자도 10월에 예정신고를 해야 하나요?",
    answer: "개인 일반과세자는 원칙적으로 예정고지 대상입니다. 그러나 조기환급 사유가 있거나 직전 과세기간 납부세액이 없는 경우 등 일정 요건에 해당하면 직접 예정신고를 선택할 수 있습니다. 자신의 해당 여부는 홈택스 또는 세무서에서 확인하시기 바랍니다.",
  },
  {
    question: "신고 기한인 10월 25일이 주말이면 어떻게 되나요?",
    answer: "신고·납부 기한이 토요일·공휴일인 경우 다음 영업일이 기한으로 연장됩니다. 해당 연도의 정확한 기한은 국세청 홈택스 공지사항 또는 세무 달력에서 확인하시기 바랍니다.",
  },
  {
    question: "예정고지세액이 너무 크다고 느껴지면 어떻게 하나요?",
    answer: "직전 과세기간 대비 매출이 크게 감소한 경우 예정고지 대신 직접 예정신고를 선택하여 실제 세액 기준으로 납부할 수 있습니다. 다만 이 경우 매출·매입 자료를 정확히 집계해 신고해야 하며, 과소 신고 시 가산세 부과 대상이 될 수 있습니다.",
  },
  {
    question: "부가세 예정신고 시 환급이 발생할 수 있나요?",
    answer: "매입세액이 매출세액을 초과하는 경우 환급이 발생할 수 있습니다. 환급을 받으려면 조기환급 신고 요건에 해당하거나 확정신고 시 환급을 신청해야 하며, 예정신고 단계에서의 환급 처리 절차는 국세청 안내 자료를 통해 확인하시기 바랍니다.",
  },
  {
    question: "세금계산서를 전혀 발행하지 않는 소규모 사업자도 신고해야 하나요?",
    answer: "일반과세자라면 세금계산서 발행 여부와 관계없이 부가세 신고 의무가 있습니다. 현금매출 등 세금계산서 없는 매출도 신고 대상에 포함됩니다. 간이과세자는 예정신고 의무가 없는 것이 일반적이나, 부가세 납부 의무 자체가 면제되는 것은 아닙니다.",
  },
  {
    question: "신고 후 오류를 발견했다면 어떻게 수정하나요?",
    answer: "신고 후 오류를 발견한 경우 수정신고(증액) 또는 경정청구(감액)를 통해 정정할 수 있습니다. 수정신고는 세액을 자진 증액 납부할 때, 경정청구는 과다 납부한 세액을 돌려받고자 할 때 활용합니다. 기한은 각각 다르므로 홈택스 또는 세무사를 통해 빠르게 처리하시기 바랍니다.",
  },
  {
    question: "법인사업자와 개인사업자의 예정신고 방식이 다른가요?",
    answer: "법인사업자는 원칙적으로 실제 매출·매입 자료를 기준으로 예정신고를 직접 진행해야 합니다. 개인 일반과세자는 원칙적으로 예정고지 방식으로 납부하지만, 일정 요건 충족 시 직접 신고 방식을 선택할 수 있습니다. 두 방식의 세부 차이는 국세청 홈택스 안내 자료에서 확인하시기 바랍니다.",
  },
  {
    question: "calculatorhost 부가세 계산기는 무료로 이용할 수 있나요?",
    answer: "네, calculatorhost의 모든 계산기는 무료이며 회원가입 없이 이용 가능합니다. PC와 모바일 환경 모두에서 최적화된 화면으로 제공됩니다.",
  },
];

export default function GuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: "부가세 3차 예정신고 2026 | calculatorhost" },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: "부가세 3차 예정신고 2026 | calculatorhost",
    description: "10월은 부가세 3차 예정신고 기간입니다. 신고 대상·기간·납부 방법을 단계별로 정리하고, calculatorhost 부가세 계산기로 예상 세액을 미리 확인하세요.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["부가세 예정신고","3차 예정신고","10월 부가세","부가가치세 신고","개인사업자 부가세","부가세 납부"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "부가세 3차 예정신고 2026 | calculatorhost",
    description: "10월은 부가세 3차 예정신고 기간입니다. 신고 대상·기간·납부 방법을 단계별로 정리하고, calculatorhost 부가세 계산기로 예상 세액을 미리 확인하세요.",
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
                    { name: "부가세 3차 예정신고 2026 | calculatorhost" },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가이드 · 2026-05-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">부가세 3차 예정신고 2026 | calculatorhost</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  매년 10월은 법인사업자 및 일부 개인사업자가 부가가치세 3차 예정신고를 수행해야 하는 시기입니다. 신고 기한을 놓치면 가산세가 부과될 수 있으므로, 대상 여부와 신고 절차를 미리 파악해 두는 것이 중요합니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">부가세 예정신고란 무엇인가</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세는 1년을 두 개의 과세기간(1월~6월, 7월~12월)으로 나누어 확정신고를 진행합니다. 각 과세기간 중간에는 예정신고 또는 예정고지 제도를 통해 세액 일부를 미리 납부하도록 하고 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">예정신고는 직전 과세기간 납부세액을 기준으로 일정 금액을 미리 납부하거나, 해당 기간 실제 매출·매입 자료를 바탕으로 직접 신고하는 방식 중 하나를 선택합니다. 어느 방식이 유리한지는 사업자의 매출 변동 추이에 따라 달라집니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">10월 3차 예정신고 대상 및 기간</h2>
                <p className="leading-relaxed text-text-secondary">부가세 3차 예정신고는 7월~9월(3개월)을 과세기간으로 하며, 신고·납부 기한은 일반적으로 10월 25일입니다. 해당 날짜가 공휴일이나 주말에 해당하면 다음 영업일로 연장될 수 있으므로, 국세청 공식 채널에서 해당 연도 확정 기한을 반드시 확인하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">법인사업자는 원칙적으로 예정신고 의무가 있습니다. 개인 일반과세자는 원칙적으로 예정고지 대상이지만, 직전 과세기간 납부세액이 없거나 조기환급 사유가 있는 경우 등에는 직접 예정신고를 선택할 수 있습니다. 간이과세자는 예정신고 대상에서 제외되는 것이 일반적입니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">신고 전 준비해야 할 서류</h2>
                <p className="leading-relaxed text-text-secondary">예정신고를 정확하게 완료하려면 7월~9월 기간의 세금계산서 합계표(매출·매입), 신용카드 매출전표 합계, 현금영수증 발행 내역, 수출 관련 서류(해당 시), 대손세액 관련 서류(해당 시) 등을 사전에 정리해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">홈택스 전자세금계산서 조회 기능을 활용하면 발행·수취 내역을 손쉽게 확인할 수 있습니다. 수기 세금계산서를 사용한 경우에는 별도로 집계하여 신고 시 정확히 반영해야 합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">신고·납부 절차 단계별 안내</h2>
                <p className="leading-relaxed text-text-secondary">신고는 국세청 홈택스(hometax.go.kr) 전자신고를 이용하거나, 세무서를 직접 방문하여 서면 신고하는 방법으로 진행합니다. 전자신고를 이용하면 세금 신고서 작성 도우미, 미리채움 서비스 등을 활용할 수 있어 오류를 줄일 수 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">납부는 홈택스 전자납부, 위택스(wetax.go.kr) 연계납부, 인터넷뱅킹 납부, 금융기관 창구 납부 등 다양한 방법으로 가능합니다. 납부세액이 일정 금액을 초과하는 경우 분납 제도를 활용할 수도 있으니 해당 요건을 사전에 확인하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">신고 완료 후에는 홈택스 신고 내역 조회 메뉴에서 접수 여부를 반드시 확인하고, 납부 영수증은 일정 기간 보관하는 것을 권장합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">가산세 유형과 예방 요령</h2>
                <p className="leading-relaxed text-text-secondary">신고 기한 내 신고하지 않으면 무신고 가산세가, 납부 기한을 초과하면 납부 지연 가산세가 각각 부과될 수 있습니다. 또한 세금계산서 합계표를 부실하게 제출하면 별도 가산세 적용 대상이 될 수 있습니다. 구체적인 가산세율 및 산정 방식은 국세청 공식 자료를 참조하거나, calculatorhost의 부가세 계산기를 통해 예상 세액을 미리 점검하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">가산세를 예방하는 가장 효과적인 방법은 신고 기한보다 최소 3~5일 앞서 작업을 시작하는 것입니다. 홈택스 신고 시스템 접속이 마감일 직전에 집중되어 지연될 수 있으므로, 여유 있는 일정으로 신고를 완료하는 것이 안전합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">calculatorhost 부가세 계산기 활용법</h2>
                <p className="leading-relaxed text-text-secondary">calculatorhost의 부가세 계산기를 이용하면 7월~9월 과세기간의 매출액과 매입액을 입력해 예상 납부(또는 환급) 세액을 빠르게 추산할 수 있습니다. 회원가입 없이 모바일에서도 이용 가능하며, 간이과세자·일반과세자 구분에 따른 계산도 지원합니다.</p>
                <p className="leading-relaxed text-text-secondary">계산기 결과는 참고용 예측치입니다. 실제 신고 세액은 세금계산서 수수 내역, 공제 항목, 적용 세율 등에 따라 달라질 수 있으므로, 최종 신고 전에 담당 세무사 또는 국세청 세금 상담 서비스를 통해 검토하시기 바랍니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">10월 부가세 3차 예정신고는 법인사업자를 포함한 상당수 사업자에게 중요한 세무 일정입니다. 7월~9월 과세기간 자료를 미리 정리하고, 신고 기한(일반적으로 10월 25일) 이전에 여유를 두고 신고·납부를 완료하는 것이 가산세를 예방하는 핵심입니다. calculatorhost 부가세 계산기를 통해 예상 세액을 미리 파악하고, 상세한 세율 및 공제 기준은 국세청 홈택스 공식 자료를 반드시 참조하시기 바랍니다.</p>
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
                      국세청 홈택스 – 부가세 전자신고
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.wetax.go.kr/main/"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      위택스 – 지방세 전자납부
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2274&amp;cntntsId=7710"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 – 부가가치세 신고 안내
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title={"부가세 3차 예정신고 2026 | calculatorhost"} url={URL} />

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
