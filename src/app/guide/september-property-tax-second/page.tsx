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

const URL = "https://calculatorhost.com/guide/september-property-tax-second/";
const DATE_PUBLISHED = "2026-05-10";
const DATE_MODIFIED = "2026-05-10";

export const metadata: Metadata = {
  title: "재산세 2차 납부 및 세대 합산 확인 2026 | calculatorhost",
  description:
    "9월은 재산세 2차 납부의 달입니다. 주택·토지 재산세 납부 기한, 세대 합산 확인 방법, 납부 방법까지 핵심 사항을 한눈에 정리했습니다.",
  keywords: ["재산세 2차","9월 재산세","재산세 납부","세대 합산","재산세 조회","재산세 계산기"],
  alternates: { canonical: URL },
  openGraph: {
    title: "재산세 2차 납부 및 세대 합산 확인 2026 | calculatorhost",
    description: "9월은 재산세 2차 납부의 달입니다. 주택·토지 재산세 납부 기한, 세대 합산 확인 방법, 납부 방법까지 핵심 사항을 한눈에 정리했습니다.",
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
    question: "재산세 2차 납부 기한은 언제인가요?",
    answer: "통상적으로 매년 9월 16일부터 9월 30일까지입니다. 정확한 기한은 고지서에 명시된 날짜를 기준으로 확인하시기 바랍니다.",
  },
  {
    question: "7월에 재산세를 냈는데 9월에도 고지서가 오나요?",
    answer: "주택분 재산세의 경우 과세표준 금액에 따라 7월·9월 두 차례로 나뉘어 부과됩니다. 소액인 경우 7월에 전액이 부과되어 9월 고지서가 없을 수 있습니다. 토지분은 9월에 일괄 고지됩니다.",
  },
  {
    question: "세대 합산이 재산세에 직접 영향을 주나요?",
    answer: "재산세 자체는 개인 명의별로 부과되므로 세대 합산이 재산세액에 직접 영향을 주지는 않습니다. 다만 종합부동산세는 세대 단위로 합산 과세되므로, 9월에 세대 보유 현황을 점검해 두면 향후 종부세 대비에 도움이 됩니다.",
  },
  {
    question: "재산세를 기한 내에 납부하지 못하면 어떻게 되나요?",
    answer: "납부 기한을 초과하면 가산세가 부과됩니다. 불가피한 사정이 있을 경우 관할 지방자치단체에 납부 유예 또는 분할납부를 사전에 신청하면 가산세 부담을 줄일 수 있습니다.",
  },
  {
    question: "위택스에서 재산세를 조회하는 방법이 궁금합니다.",
    answer: "위택스(wetax.go.kr) 접속 후 공동인증서 또는 간편인증으로 로그인하면 '지방세 조회/납부' 메뉴에서 본인 명의 재산세 고지 내역을 확인하고 바로 납부할 수 있습니다.",
  },
  {
    question: "재산세 분할납부는 누구나 신청할 수 있나요?",
    answer: "납부할 세액이 일정 기준 이상인 경우에 신청 자격이 주어집니다. 분할납부 가능 금액 기준은 연도별로 변경될 수 있으므로, 위택스 또는 관할 세무부서에서 해당 연도 기준을 확인하시기 바랍니다.",
  },
  {
    question: "공시가격은 어디서 확인하나요?",
    answer: "주택 공시가격은 국토교통부 부동산 공시가격 알리미(realtyprice.kr)에서 확인할 수 있습니다. 토지 공시지가도 동일 사이트에서 조회 가능합니다.",
  },
  {
    question: "전자고지로 신청하면 혜택이 있나요?",
    answer: "일부 지방자치단체에서는 전자고지 및 자동이체 신청 시 세액 공제 혜택을 제공하는 경우가 있습니다. 혜택 여부와 공제 금액은 거주지 관할 지방자치단체 고지서 또는 위택스에서 확인하시기 바랍니다.",
  },
];

export default function GuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: "재산세 2차 납부 및 세대 합산 확인 2026 | calculatorhost" },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: "재산세 2차 납부 및 세대 합산 확인 2026 | calculatorhost",
    description: "9월은 재산세 2차 납부의 달입니다. 주택·토지 재산세 납부 기한, 세대 합산 확인 방법, 납부 방법까지 핵심 사항을 한눈에 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["재산세 2차","9월 재산세","재산세 납부","세대 합산","재산세 조회","재산세 계산기"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "재산세 2차 납부 및 세대 합산 확인 2026 | calculatorhost",
    description: "9월은 재산세 2차 납부의 달입니다. 주택·토지 재산세 납부 기한, 세대 합산 확인 방법, 납부 방법까지 핵심 사항을 한눈에 정리했습니다.",
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
                    { name: "재산세 2차 납부 및 세대 합산 확인 2026 | calculatorhost" },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가이드 · 2026-05-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">재산세 2차 납부 및 세대 합산 확인 2026 | calculatorhost</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  매년 9월은 재산세 2차 납부 기한이 돌아오는 시기입니다. 7월에 납부한 1차분과 함께 연간 재산세 부담이 확정되는 달인 만큼, 납부 기한과 세대 합산 여부를 미리 확인해 두는 것이 중요합니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">재산세 2차 납부, 왜 9월인가?</h2>
                <p className="leading-relaxed text-text-secondary">재산세는 매년 6월 1일 기준으로 부동산을 보유한 사람에게 부과됩니다. 주택분 재산세는 과세액에 따라 두 차례로 나뉘어 부과되는데, 1차는 7월, 2차는 9월에 납부하게 됩니다. 토지분 재산세는 9월 한 번에 일괄 부과된다는 점도 함께 기억해 두어야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">9월 납부 기한은 통상 9월 16일부터 9월 30일까지이며, 기한을 넘기면 가산세가 부과될 수 있습니다. 납부 기한은 지방자치단체별로 고지서에 명시되므로, 수령한 고지서를 반드시 확인하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">주택·토지별 재산세 부과 구조 이해하기</h2>
                <p className="leading-relaxed text-text-secondary">주택분 재산세는 과세표준 금액 기준으로 1차(7월)와 2차(9월)로 분할 부과됩니다. 과세표준이 일정 기준 이하인 소액의 경우에는 7월에 전액이 부과되고 9월에는 별도 고지가 없을 수 있습니다. 구체적인 분할 기준 금액은 관련 세율과 함께 calculatorhost의 재산세 계산기에서 확인하시거나, 최신 기준은 국세청 및 행정안전부 공식 자료를 참조하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">토지분 재산세는 종합합산·별도합산·분리과세 세 가지 유형으로 나뉩니다. 용도와 면적, 지목에 따라 적용 유형이 달라지므로, 본인 소유 토지의 과세 유형을 위택스(wetax.go.kr) 또는 지방자치단체 고지서를 통해 미리 파악해 두는 것이 도움이 됩니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">세대 합산이란? 확인해야 하는 이유</h2>
                <p className="leading-relaxed text-text-secondary">재산세 자체는 개인 명의 부동산별로 부과되지만, 종합부동산세(이하 종부세)는 세대 단위로 주택 수와 공시가격 합산액을 기준으로 부과됩니다. 따라서 9월 재산세 고지서를 확인하면서 동시에 세대 전체의 보유 부동산 현황을 점검하면 11~12월 종부세 고지에 대비할 수 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">같은 세대 내 배우자·자녀 명의 주택까지 합산되어 종부세 과세 여부가 결정되므로, 세대 구성원 전체의 주택 보유 현황을 9월 이전에 파악해 두는 것이 바람직합니다. 세대 합산 기준 및 1세대 1주택 특례 요건은 국세청 공식 홈페이지(nts.go.kr)에서 상세히 확인할 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">재산세 납부 방법 및 절차</h2>
                <p className="leading-relaxed text-text-secondary">재산세는 지방세로서 위택스(wetax.go.kr)를 통해 온라인으로 간편하게 납부할 수 있습니다. 공인인증서(공동인증서) 또는 간편인증으로 로그인 후, 납부할 세목을 조회하여 신용카드·계좌이체·간편결제 등 다양한 방법으로 납부 가능합니다.</p>
                <p className="leading-relaxed text-text-secondary">은행 창구, ATM, 고지서 바코드 스캔을 통한 납부도 가능합니다. 모바일 환경에서는 스마트위택스 앱을 통해 고지서 확인과 납부를 동시에 처리할 수 있어 편리합니다. calculatorhost의 재산세 계산기는 예상 세액을 미리 확인하는 데 활용할 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">납부 유예·분할납부 제도 알아보기</h2>
                <p className="leading-relaxed text-text-secondary">일정 기준 이상의 재산세가 부과된 경우 분할납부 신청이 가능합니다. 납부 기한 내에 관할 지방자치단체 세무과에 신청하면 나머지 금액을 기한 이후 일정 기간 내에 분할하여 납부할 수 있습니다. 분할납부 가능 금액 기준 및 신청 기한은 고지서 또는 위택스에서 확인하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">재난·재해 등 특수한 사정이 있는 경우 납부 유예 신청도 가능합니다. 해당 제도의 요건과 절차는 거주지 관할 시·군·구청 세무 담당 부서에 문의하거나, 행정안전부 지방세 포털을 통해 확인할 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">재산세 계산기 활용법 및 사전 확인 체크리스트</h2>
                <p className="leading-relaxed text-text-secondary">calculatorhost의 재산세 계산기를 이용하면 공시가격을 입력하여 예상 재산세를 손쉽게 확인할 수 있습니다. 회원가입이나 별도 앱 설치 없이 모바일에서도 바로 이용 가능합니다. 계산 결과는 참고용이며, 실제 고지 세액과 차이가 있을 수 있으므로 최종 납부액은 고지서를 기준으로 확인하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">9월 납부 전 확인 체크리스트: ① 고지서 수령 여부(우편·전자고지) → ② 과세 대상 부동산 및 과세 유형 확인 → ③ 세대 합산 현황 점검 → ④ 납부 기한 확인 → ⑤ 분할납부 필요 여부 검토 → ⑥ 납부 완료 후 영수증 저장. 이 순서대로 확인하면 누락 없이 재산세를 처리할 수 있습니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">9월 재산세 2차 납부는 연간 보유세 부담을 마무리하는 중요한 절차입니다. 고지서 수령 여부와 납부 기한을 먼저 확인하고, 세대 합산 현황까지 점검해 두면 향후 종합부동산세 고지에도 여유 있게 대비할 수 있습니다. calculatorhost의 재산세 계산기로 예상 세액을 미리 확인하고, 위택스를 통해 간편하게 납부하시기 바랍니다.</p>
              </section>

              <section aria-label="공식 출처" className="card">
                <h2 className="mb-3 text-lg font-semibold">공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.wetax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      위택스 - 지방세 납부 포털
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 - 종합부동산세 안내
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.hometax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 홈택스 - 세금 신고·납부
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title={"재산세 2차 납부 및 세대 합산 확인 2026 | calculatorhost"} url={URL} />

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
