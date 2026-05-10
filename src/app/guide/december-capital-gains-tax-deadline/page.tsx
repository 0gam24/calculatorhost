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

const URL = "https://calculatorhost.com/guide/december-capital-gains-tax-deadline/";
const DATE_PUBLISHED = "2026-05-10";
const DATE_MODIFIED = "2026-05-10";

export const metadata: Metadata = {
  title: "12월 말 양도세 비과세 조건 최종 확인 2026 | calculatorhost",
  description:
    "12월 31일 이전 잔금·등기를 완료해야 해당 연도 양도로 인정됩니다. 1세대 1주택 비과세 요건과 보유·거주 기간 계산법을 한눈에 정리했습니다.",
  keywords: ["양도소득세","비과세 조건","1세대 1주택","12월 양도세","보유기간","거주기간","양도세 신고"],
  alternates: { canonical: URL },
  openGraph: {
    title: "12월 말 양도세 비과세 조건 최종 확인 2026 | calculatorhost",
    description: "12월 31일 이전 잔금·등기를 완료해야 해당 연도 양도로 인정됩니다. 1세대 1주택 비과세 요건과 보유·거주 기간 계산법을 한눈에 정리했습니다.",
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
    question: "잔금을 12월 31일에 받으면 해당 연도 양도로 인정되나요?",
    answer: "네, 잔금 수령일과 소유권 이전 등기일 중 빠른 날이 양도일이므로 12월 31일에 잔금을 받으면 원칙적으로 해당 연도 양도로 인정됩니다. 다만 등기일이 1월로 넘어갔더라도 잔금일이 12월이라면 12월 양도로 처리됩니다.",
  },
  {
    question: "1세대 1주택 비과세를 받으려면 거주 기간이 얼마나 필요한가요?",
    answer: "조정대상지역 내 주택의 경우 보유 기간 외에 별도의 거주 기간 요건이 적용됩니다. 비조정대상지역은 거주 요건이 없는 경우도 있습니다. 정확한 요건은 취득 시기와 지역 지정 여부에 따라 달라지므로 국세청 홈택스 또는 세무 전문가를 통해 확인하시기 바랍니다.",
  },
  {
    question: "일시적 2주택 처분 기한이 12월 31일인데 등기가 1월로 넘어가면 어떻게 되나요?",
    answer: "잔금 청산이 12월 31일 이전에 완료되었다면 양도일 기준으로 처분 기한 내 처분으로 인정될 수 있습니다. 그러나 상황에 따라 해석이 달라질 수 있으므로 사전에 세무사와 정확한 날짜를 확인하는 것이 안전합니다.",
  },
  {
    question: "12월에 양도하면 예정신고는 언제까지 해야 하나요?",
    answer: "12월 양도 시 예정신고 기한은 다음 연도 2월 말일입니다. 기한 내 신고를 하지 않으면 무신고 가산세 및 납부지연 가산세가 부과될 수 있습니다.",
  },
  {
    question: "상속받은 주택도 비과세 보유 기간에 합산되나요?",
    answer: "상속받은 주택은 일반적으로 상속 개시일(피상속인 사망일)을 취득일로 보아 보유 기간을 계산합니다. 다만, 동거봉양 합가 등 특례 규정에 해당하는 경우 피상속인의 보유 기간을 합산할 수 있는 경우도 있으므로 개별 사안별로 확인이 필요합니다.",
  },
  {
    question: "고가 주택의 경우 비과세가 전액 적용되지 않나요?",
    answer: "실지 거래가액이 일정 기준을 초과하는 고가 주택은 비과세 요건을 충족하더라도 기준금액 초과분에 대해서는 과세가 됩니다. 고가 주택 기준금액은 최신 세율 자료 및 국세청 공식 자료를 통해 확인하시기 바랍니다.",
  },
  {
    question: "양도세 계산이 복잡한데 직접 계산할 수 있는 방법이 있나요?",
    answer: "calculatorhost의 양도소득세 계산기를 이용하면 취득가액, 필요경비, 보유 기간, 공제 항목을 입력하여 예상 세액을 무료로 확인할 수 있습니다. 회원가입 없이 모바일에서도 이용 가능합니다. 최종 신고 전에는 세무 전문가의 검토를 권장합니다.",
  },
  {
    question: "이사 후 전입신고를 늦게 했으면 거주 기간은 언제부터 인정되나요?",
    answer: "거주 기간은 원칙적으로 주민등록 전입일 기준으로 산정합니다. 실제로 거주했더라도 전입신고가 늦으면 거주 기간이 단축될 수 있으니, 이사 후 즉시 전입신고를 완료하는 것이 중요합니다.",
  },
];

export default function GuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: "12월 말 양도세 비과세 조건 최종 확인 2026 | calculatorhost" },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: "12월 말 양도세 비과세 조건 최종 확인 2026 | calculatorhost",
    description: "12월 31일 이전 잔금·등기를 완료해야 해당 연도 양도로 인정됩니다. 1세대 1주택 비과세 요건과 보유·거주 기간 계산법을 한눈에 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["양도소득세","비과세 조건","1세대 1주택","12월 양도세","보유기간","거주기간","양도세 신고"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "12월 말 양도세 비과세 조건 최종 확인 2026 | calculatorhost",
    description: "12월 31일 이전 잔금·등기를 완료해야 해당 연도 양도로 인정됩니다. 1세대 1주택 비과세 요건과 보유·거주 기간 계산법을 한눈에 정리했습니다.",
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
                    { name: "12월 말 양도세 비과세 조건 최종 확인 2026 | calculatorhost" },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가이드 · 2026-05-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">12월 말 양도세 비과세 조건 최종 확인 2026 | calculatorhost</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  12월은 한 해의 양도 시점을 확정 짓는 마지막 달입니다. 잔금 수령일 또는 소유권 이전 등기일 중 빠른 날이 양도일로 결정되므로, 연말 부동산 거래 시에는 날짜 관리가 특히 중요합니다. 비과세 요건 충족 여부를 미리 확인하여 불필요한 세 부담을 줄이시기 바랍니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">양도 시점이 왜 12월 말에 중요한가</h2>
                <p className="leading-relaxed text-text-secondary">양도소득세는 양도일이 속하는 연도를 기준으로 과세 연도가 결정됩니다. 잔금 청산일과 소유권 이전 등기일 중 더 빠른 날이 양도일로 인정되므로, 12월 31일까지 잔금을 받지 못하면 이듬해 양도로 분류됩니다.</p>
                <p className="leading-relaxed text-text-secondary">연도가 달라지면 합산 과세 대상 자산 수, 기본공제 적용 기준, 장기보유특별공제 계산 기산점 등이 모두 달라질 수 있습니다. 특히 동일 연도에 여러 건을 양도했다면 세액 차이가 크게 발생할 수 있으니 계약 체결 전 일정을 꼼꼼히 검토하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">1세대 1주택 비과세 핵심 요건 정리</h2>
                <p className="leading-relaxed text-text-secondary">1세대 1주택 비과세를 적용받으려면 양도일 현재 세대원 전체가 1주택만 보유하고 있어야 합니다. 보유 기간과 거주 기간 요건은 주택 취득 시기·조정대상지역 지정 여부에 따라 달라지므로, 반드시 취득 당시 규정과 현행 규정을 함께 확인해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">조정대상지역 내 주택은 보유 기간 외에 실거주 기간 요건도 추가로 적용됩니다. 거주 기간은 주민등록 전입일부터 전출일까지를 기준으로 산정하며, 단순 보유 기간과 구별하여 계산해야 합니다. 구체적인 요건 충족 여부는 국세청 홈택스에서 제공하는 양도세 자동계산 서비스를 통해 확인하실 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">보유·거주 기간 계산 시 자주 발생하는 오류</h2>
                <p className="leading-relaxed text-text-secondary">보유 기간은 취득일부터 양도일까지 일수를 기준으로 계산합니다. 상속·증여로 취득한 경우에는 피상속인의 보유 기간을 합산할 수 있는지 여부가 사안마다 다르므로 주의가 필요합니다.</p>
                <p className="leading-relaxed text-text-secondary">거주 기간 계산 시 일시 퇴거(직장 이전, 학업 등) 기간을 포함할 수 있는지는 개별 사실관계에 따라 달라집니다. 임차인 퇴거 지연으로 실거주를 시작하지 못한 경우 등도 예외 인정 여부를 사전에 확인하는 것이 안전합니다. 관련 세율과 기간 요건은 calculatorhost의 양도소득세 계산기에서 자동 산정해 볼 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">일시적 2주택 비과세 특례와 12월 처분 기한</h2>
                <p className="leading-relaxed text-text-secondary">신규 주택 취득 후 종전 주택을 처분할 때 적용되는 일시적 2주택 비과세 특례는 종전 주택의 처분 기한이 있습니다. 처분 기한이 12월 31일에 걸쳐 있다면, 해당 연도 내 잔금 완납 및 등기 이전 여부가 특례 적용을 결정짓는 핵심 변수가 됩니다.</p>
                <p className="leading-relaxed text-text-secondary">처분 기한은 신규 주택의 취득 시기와 조정대상지역 여부에 따라 다르게 설정되어 있습니다. 기한을 하루라도 초과하면 특례 적용이 배제될 수 있으므로, 계약 체결 시 잔금일을 충분히 여유 있게 설정하고 등기 일정도 미리 예약하는 것이 좋습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">12월 양도세 신고·납부 일정 및 주의사항</h2>
                <p className="leading-relaxed text-text-secondary">양도소득세 예정신고는 양도일이 속하는 달의 말일로부터 2개월 이내에 해야 합니다. 12월 중 양도가 이루어졌다면 다음 연도 2월 말일이 예정신고 기한이 됩니다. 예정신고를 하지 않으면 가산세가 부과될 수 있으니 일정을 미리 관리하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">예정신고 후에도 오류가 발견된 경우 확정신고 기간(다음 연도 5월)에 수정 신고를 할 수 있습니다. 신고 전 calculatorhost의 양도소득세 계산기로 예상 세액을 사전 점검하면 신고 과정에서의 실수를 줄이는 데 도움이 됩니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">비과세 미적용 시 절세 전략 검토 포인트</h2>
                <p className="leading-relaxed text-text-secondary">비과세 요건을 충족하지 못하는 경우에도 장기보유특별공제를 통해 과세 대상 소득을 줄일 수 있습니다. 보유 기간이 길수록 공제율이 높아지는 구조이므로, 양도 시점을 단 1년이라도 늦출 수 있는지 검토하는 것이 의미 있을 수 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">부부 공동명의, 분할 양도 등의 방법도 검토 대상이 될 수 있으나 이는 개인의 재산·세무 상황에 따라 효과가 크게 달라집니다. 구체적인 절세 방안은 공인 세무사와 상담하시고, 최신 세율 및 공제율은 국세청 공식 자료를 참조하시기 바랍니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">12월은 양도 시점 확정, 비과세 요건 최종 점검, 일시적 2주택 처분 기한 마감이 동시에 몰리는 시기입니다. 잔금일과 등기일 일정을 여유 있게 설정하고, 보유·거주 기간 요건을 사전에 꼼꼼히 검토하면 불필요한 세 부담을 줄일 수 있습니다. calculatorhost의 양도소득세 계산기로 예상 세액을 먼저 확인하시고, 최종 신고는 공인 세무사와 함께 진행하시기를 권장합니다.</p>
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
                      국세청 홈택스 – 양도소득세 신고·계산 서비스
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2352&amp;cntntsId=7726"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 – 양도소득세 안내
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title={"12월 말 양도세 비과세 조건 최종 확인 2026 | calculatorhost"} url={URL} />

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
