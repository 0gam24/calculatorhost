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

const URL = "https://calculatorhost.com/guide/august-capital-gains-tax-review/";
const DATE_PUBLISHED = "2026-05-10";
const DATE_MODIFIED = "2026-05-10";

export const metadata: Metadata = {
  title: "양도세 절세 5가지 체크리스트 2026 | calculatorhost",
  description:
    "8월 양도 계획 전 반드시 살펴야 할 양도소득세 절세 체크리스트 5가지를 정리했습니다. 비과세 요건·장기보유특별공제·필요경비 누락 방지 등 핵심 항목을 단계별로 안내합니다.",
  keywords: ["양도소득세","양도세 절세","장기보유특별공제","1세대1주택 비과세","양도세 체크리스트","필요경비","8월 부동산 양도"],
  alternates: { canonical: URL },
  openGraph: {
    title: "양도세 절세 5가지 체크리스트 2026 | calculatorhost",
    description: "8월 양도 계획 전 반드시 살펴야 할 양도소득세 절세 체크리스트 5가지를 정리했습니다. 비과세 요건·장기보유특별공제·필요경비 누락 방지 등 핵심 항목을 단계별로 안내합니다.",
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
    question: "8월에 잔금을 받으면 양도일은 언제로 보나요?",
    answer: "원칙적으로 양도일은 잔금 청산일과 소유권 이전 등기 접수일 중 빠른 날로 봅니다. 계약서상 잔금일과 실제 입금일이 다를 경우 실제 청산일 기준으로 판단됩니다. 정확한 기준은 국세청 홈택스 안내를 참조하시기 바랍니다.",
  },
  {
    question: "부부 공동명의 주택을 양도할 때 절세 효과가 있나요?",
    answer: "공동명의는 각 지분 소유자별로 양도차익을 나누어 계산하므로 누진세율 구조에서 전체 세 부담이 줄어드는 경우가 있습니다. 다만 1세대 1주택 비과세 요건 충족 여부, 취득 당시 명의 구성 등 복합적 요소를 함께 검토해야 합니다.",
  },
  {
    question: "이사 후 일시적 2주택 기간 안에 양도하면 비과세 혜택을 받을 수 있나요?",
    answer: "일시적 2주택 비과세 특례는 신규 주택 취득일로부터 정해진 기간 내에 종전 주택을 양도해야 적용됩니다. 해당 기간 및 세부 요건은 취득 시기에 따라 다를 수 있으므로 국세청 홈택스 또는 세무사를 통해 확인하시기 바랍니다.",
  },
  {
    question: "리모델링 비용 전액을 필요경비로 인정받을 수 있나요?",
    answer: "자본적 지출(주택 가치를 실질적으로 높이는 공사)은 필요경비로 인정되지만, 단순 수리·유지 성격의 수익적 지출은 인정되지 않습니다. 공사 내역서와 세금계산서를 구분 보관하고 세무사 확인을 받는 것이 안전합니다.",
  },
  {
    question: "증여받은 주택을 양도할 때 취득가액은 어떻게 산정하나요?",
    answer: "증여받은 주택의 취득가액은 증여 당시 증여세 과세표준으로 신고된 가액을 기준으로 합니다. 이월과세 규정이 적용되는 경우 증여자의 실제 취득가액이 적용될 수 있으므로, 양도 전 이월과세 요건을 반드시 확인해야 합니다.",
  },
  {
    question: "양도소득세 예정신고를 하지 않으면 어떻게 되나요?",
    answer: "예정신고를 하지 않으면 무신고가산세(산출세액의 일정 비율)와 납부지연가산세가 추가로 부과됩니다. 다음 해 5월 종합소득세 신고 기간에 양도소득을 합산 신고할 수 있지만, 예정신고 불이행에 따른 가산세는 피하기 어렵습니다.",
  },
  {
    question: "분양권을 양도할 때도 동일한 체크리스트가 적용되나요?",
    answer: "분양권은 주택과 별도의 세율 체계가 적용될 수 있으며, 취득 시기에 따라 비과세 요건 적용 여부도 달라집니다. 분양권 양도 시에는 계산기 활용과 함께 세무 전문가 상담을 권장합니다.",
  },
  {
    question: "calculatorhost 양도소득세 계산기는 어떻게 활용하나요?",
    answer: "취득가액, 양도가액, 보유 기간, 거주 기간, 주택 수 등을 입력하면 예상 양도차익과 산출세액을 즉시 확인할 수 있습니다. 회원가입 없이 모바일에서도 무료로 이용 가능하며, 결과는 참고용으로 활용하시고 최종 신고는 세무사 또는 홈택스를 통해 진행하시기 바랍니다.",
  },
];

export default function GuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: "양도세 절세 5가지 체크리스트 2026 | calculatorhost" },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: "양도세 절세 5가지 체크리스트 2026 | calculatorhost",
    description: "8월 양도 계획 전 반드시 살펴야 할 양도소득세 절세 체크리스트 5가지를 정리했습니다. 비과세 요건·장기보유특별공제·필요경비 누락 방지 등 핵심 항목을 단계별로 안내합니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["양도소득세","양도세 절세","장기보유특별공제","1세대1주택 비과세","양도세 체크리스트","필요경비","8월 부동산 양도"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "양도세 절세 5가지 체크리스트 2026 | calculatorhost",
    description: "8월 양도 계획 전 반드시 살펴야 할 양도소득세 절세 체크리스트 5가지를 정리했습니다. 비과세 요건·장기보유특별공제·필요경비 누락 방지 등 핵심 항목을 단계별로 안내합니다.",
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
                    { name: "양도세 절세 5가지 체크리스트 2026 | calculatorhost" },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가이드 · 2026-05-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">양도세 절세 5가지 체크리스트 2026 | calculatorhost</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  8월은 여름 휴가철이 마무리되며 하반기 부동산 거래가 본격화되는 시기입니다. 양도 시점을 언제로 잡느냐, 어떤 공제 항목을 챙기느냐에 따라 납부세액이 크게 달라질 수 있습니다. 이 가이드는 양도 계획 전 반드시 점검해야 할 5가지 핵심 항목을 순서대로 안내합니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">체크 1 — 1세대 1주택 비과세 요건 충족 여부 확인</h2>
                <p className="leading-relaxed text-text-secondary">양도소득세에서 가장 큰 혜택 중 하나는 1세대 1주택 비과세입니다. 보유 기간, 거주 기간, 양도가액 기준을 모두 충족해야 비과세가 적용되므로, 잔금 청산일(양도일) 전에 각 요건을 면밀히 확인해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">특히 조정대상지역 내 주택은 단순 보유 기간 외에 실거주 기간 요건이 추가로 적용됩니다. 세대 구성원 전체의 주택 보유 현황도 함께 점검하시기 바랍니다. 요건 충족 여부가 불분명할 경우 양도 전 세무사 상담 또는 국세청 홈택스 세금 모의계산 서비스를 활용하는 것이 바람직합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">체크 2 — 장기보유특별공제 적용 기간 최적화</h2>
                <p className="leading-relaxed text-text-secondary">장기보유특별공제는 보유 기간이 길수록 공제율이 높아지는 구조입니다. 따라서 양도 시점을 보유 기간 기산일과 대조하여 공제율 구간이 상향되는 시점 이후로 조정할 수 있는지 검토할 필요가 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">1세대 1주택 비과세 요건을 갖춘 경우에는 거주 기간 요건을 함께 충족해야 최대 공제율 구간 적용이 가능합니다. 공제율별 예상 세액은 calculatorhost의 양도소득세 계산기에서 보유·거주 기간을 직접 입력해 비교해 볼 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">체크 3 — 필요경비 항목 빠짐없이 수집</h2>
                <p className="leading-relaxed text-text-secondary">양도차익은 '양도가액 − 취득가액 − 필요경비'로 산출됩니다. 필요경비로 인정되는 항목으로는 취득세, 등기비용, 중개보수, 자본적 지출(리모델링·증축 등) 등이 있으며, 이를 누락하면 납부세액이 불필요하게 증가합니다.</p>
                <p className="leading-relaxed text-text-secondary">영수증·계약서·세금계산서 등 증빙 서류를 사전에 체계적으로 정리해 두시기 바랍니다. 자본적 지출과 수익적 지출(단순 유지·보수)을 혼동하면 경비 인정이 거부될 수 있으므로, 항목 구분을 명확히 해두는 것이 중요합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">체크 4 — 다주택자 중과 여부 및 한시 배제 규정 확인</h2>
                <p className="leading-relaxed text-text-secondary">다주택자가 조정대상지역 내 주택을 양도하는 경우 중과세율이 적용될 수 있습니다. 다만 정부는 시장 상황에 따라 한시적으로 중과를 배제하거나 유예하는 조치를 시행하는 경우가 있으므로, 양도 시점의 현행 규정을 반드시 확인해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">최신 중과 적용 여부 및 한시 배제 기간은 국세청 홈택스 공지사항 또는 법제처 국가법령정보센터에서 확인하시기 바랍니다. 규정 변경이 잦은 영역이므로 인터넷 검색보다 공식 채널을 우선 참고하시기를 권장합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">체크 5 — 예정신고 기한 및 가산세 리스크 관리</h2>
                <p className="leading-relaxed text-text-secondary">부동산 양도 후에는 양도일이 속한 달의 말일로부터 2개월 이내에 예정신고·납부를 완료해야 합니다. 8월에 잔금이 완료된 경우 신고 기한은 10월 말이 됩니다. 예정신고를 이행하면 산출세액의 일정 비율을 세액공제로 받을 수 있으므로 기한 내 신고가 유리합니다.</p>
                <p className="leading-relaxed text-text-secondary">예정신고를 누락하면 무신고가산세와 납부지연가산세가 함께 부과될 수 있습니다. 양도 계획이 확정된 직후 신고 일정을 달력에 표시해두고, calculatorhost의 양도소득세 계산기를 활용하여 예상 납부세액을 미리 파악해 두시기 바랍니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">양도소득세는 양도 시점과 공제 항목 챙김 여부에 따라 납부세액 차이가 상당히 발생할 수 있습니다. 8월 양도를 계획 중이라면 비과세 요건, 장기보유특별공제 기간, 필요경비 증빙, 중과 규정, 예정신고 기한의 5가지 항목을 순서대로 점검하는 것이 기본입니다. calculatorhost의 양도소득세 계산기를 통해 시나리오별 예상세액을 미리 비교해보시고, 최종 신고 전에는 반드시 공식 기관 안내나 세무 전문가 확인을 거치시기 바랍니다.</p>
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
                      국세청 홈택스 — 양도소득세 신고·납부
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/lsSc.do?menuId=1&amp;subMenuId=15&amp;tabMenuId=81&amp;query=%EC%86%8C%EB%93%9D%EC%84%B8%EB%B2%95"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      법제처 국가법령정보센터 — 소득세법
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title={"양도세 절세 5가지 체크리스트 2026 | calculatorhost"} url={URL} />

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
