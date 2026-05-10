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

const URL = "https://calculatorhost.com/guide/november-year-end-tax-prep/";
const DATE_PUBLISHED = "2026-05-10";
const DATE_MODIFIED = "2026-05-10";

export const metadata: Metadata = {
  title: "2026년 연말정산 완벽 준비 11월 가이드 | calculatorhost",
  description:
    "11월부터 연말정산을 준비하면 누락 공제를 미리 점검하고 환급액을 극대화할 수 있습니다. 소득공제·세액공제 항목별 체크리스트와 절세 전략을 정리했습니다.",
  keywords: ["연말정산 2026","11월 연말정산 준비","소득공제","세액공제","연말정산 공제 항목","연말정산 환급"],
  alternates: { canonical: URL },
  openGraph: {
    title: "2026년 연말정산 완벽 준비 11월 가이드 | calculatorhost",
    description: "11월부터 연말정산을 준비하면 누락 공제를 미리 점검하고 환급액을 극대화할 수 있습니다. 소득공제·세액공제 항목별 체크리스트와 절세 전략을 정리했습니다.",
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
    question: "11월에 연말정산 준비를 시작하면 실제로 어떤 점이 달라지나요?",
    answer: "1~10월 누적 공제 현황을 파악한 후, 남은 두 달간 지출 방향을 조정할 수 있습니다. 예를 들어 신용카드 공제 한도가 이미 채워졌다면 체크카드나 현금으로 전환해 공제율이 높은 수단을 활용할 수 있습니다.",
  },
  {
    question: "연말정산 미리보기 서비스는 언제부터 이용할 수 있나요?",
    answer: "국세청 홈택스의 연말정산 미리보기 서비스는 통상 매년 11월 중순부터 오픈됩니다. 정확한 일정은 국세청 공지사항(https://www.nts.go.kr)을 확인하시기 바랍니다.",
  },
  {
    question: "연금저축과 IRP 중 어느 쪽에 먼저 납입해야 유리한가요?",
    answer: "두 상품 모두 세액공제 대상이지만 납입 한도와 공제 대상 금액이 상이하게 적용됩니다. 최신 한도 기준은 calculatorhost의 연금저축 세액공제 계산기 또는 국세청 공식 자료를 참조하여 본인 소득 수준에 맞게 판단하세요.",
  },
  {
    question: "의료비가 기준 금액에 미달하면 공제를 받지 못하나요?",
    answer: "의료비 세액공제는 총급여의 일정 비율을 초과한 금액에 대해서만 공제가 적용됩니다. 연말까지 기준 금액 미달이 예상된다면 추가 의료 지출 계획을 검토해 볼 수 있습니다. 다만 불필요한 의료 지출을 억지로 늘릴 필요는 없습니다.",
  },
  {
    question: "부양가족 공제는 반드시 가족 관계를 증명해야 하나요?",
    answer: "회사 연말정산 제출 시 주민등록등본 등으로 가족 관계를 확인하는 경우가 있습니다. 또한 홈택스 연말정산 간소화 서비스에서 부양가족 자료 제공 동의를 받아야 해당 가족의 의료비·교육비 등 자료를 조회할 수 있습니다.",
  },
  {
    question: "중도 입사자나 이직자는 연말정산을 어떻게 준비해야 하나요?",
    answer: "연도 중 이직한 경우 전 직장의 근로소득 원천징수영수증을 반드시 현 직장에 제출해야 합니다. 제출하지 않으면 공제 누락이 발생할 수 있습니다. 원천징수영수증은 전 직장 또는 홈택스에서 발급받을 수 있습니다.",
  },
  {
    question: "월세를 납부하는 무주택자는 어떤 공제를 받을 수 있나요?",
    answer: "일정 요건(총급여 기준, 주택 규모, 무주택 세대주 여부 등)을 충족하는 경우 월세액 세액공제를 신청할 수 있습니다. 임대차계약서와 실제 이체 내역을 보관해 두어야 하며, 자세한 요건은 국세청 홈택스(https://www.hometax.go.kr)에서 확인하세요.",
  },
  {
    question: "연말정산 공제 항목을 놓쳤다면 이후에도 정정할 수 있나요?",
    answer: "연말정산 이후 공제 누락을 발견한 경우, 매년 5월 종합소득세 신고 기간에 경정청구를 통해 환급 신청을 할 수 있습니다. 경정청구 가능 기간이 있으므로 신속히 처리하는 것이 좋습니다.",
  },
];

export default function GuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: "2026년 연말정산 완벽 준비 11월 가이드 | calculatorhost" },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: "2026년 연말정산 완벽 준비 11월 가이드 | calculatorhost",
    description: "11월부터 연말정산을 준비하면 누락 공제를 미리 점검하고 환급액을 극대화할 수 있습니다. 소득공제·세액공제 항목별 체크리스트와 절세 전략을 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["연말정산 2026","11월 연말정산 준비","소득공제","세액공제","연말정산 공제 항목","연말정산 환급"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "2026년 연말정산 완벽 준비 11월 가이드 | calculatorhost",
    description: "11월부터 연말정산을 준비하면 누락 공제를 미리 점검하고 환급액을 극대화할 수 있습니다. 소득공제·세액공제 항목별 체크리스트와 절세 전략을 정리했습니다.",
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
                    { name: "2026년 연말정산 완벽 준비 11월 가이드 | calculatorhost" },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가이드 · 2026-05-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">2026년 연말정산 완벽 준비 11월 가이드 | calculatorhost</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연말정산은 1월에 결과를 확인하지만, 실질적인 준비는 11월이 핵심입니다. 신용카드·의료비·보험료 등 주요 공제 항목의 연간 한도를 지금 점검하면 남은 두 달을 전략적으로 활용할 수 있습니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">왜 11월이 연말정산 준비의 골든타임인가</h2>
                <p className="leading-relaxed text-text-secondary">연말정산은 매년 1~2월 회사를 통해 진행되지만, 공제 항목 대부분은 해당 연도 1월 1일부터 12월 31일까지의 지출을 기준으로 합니다. 즉, 12월이 지나면 지출 내역을 소급해 변경할 수 없습니다.</p>
                <p className="leading-relaxed text-text-secondary">11월은 1~10월 누적 지출 현황을 파악하고 남은 11~12월에 어떤 항목에서 추가 공제를 받을 수 있는지 조정할 수 있는 마지막 실질적 기회입니다. 특히 신용카드 사용액 공제, 의료비 공제, 교육비 공제는 연간 한도 기준 미달·초과 여부를 미리 확인해야 전략적으로 대응할 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">소득공제 핵심 항목 체크리스트</h2>
                <p className="leading-relaxed text-text-secondary">신용카드·체크카드·현금영수증 공제는 총급여의 일정 비율을 초과한 사용분에 대해 공제가 적용됩니다. 공제율은 카드 종류별로 다르며, 체크카드와 현금영수증이 신용카드보다 공제율이 높습니다. 총급여 대비 사용액 비율을 calculatorhost의 신용카드 공제 계산기에서 미리 시뮬레이션해 보세요.</p>
                <p className="leading-relaxed text-text-secondary">주택자금 공제(주택청약저축·주택담보대출 이자 상환액)도 요건과 한도가 있으므로, 본인이 무주택자·1주택자 여부, 대출 실행 시점, 주택 기준시가 요건을 국세청 홈택스(https://www.hometax.go.kr)의 연말정산 미리보기 서비스로 확인하는 것이 정확합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">세액공제 핵심 항목 체크리스트</h2>
                <p className="leading-relaxed text-text-secondary">의료비 세액공제는 총급여의 일정 비율을 초과한 의료비에 대해 적용됩니다. 연 초부터 누적된 의료비가 기준 금액에 미달한다면 연말 건강검진·치과 치료·안경 구입 등을 계획적으로 집행하는 것도 고려할 수 있습니다. 단, 미용·성형 목적의 시술은 공제 대상에서 제외됩니다.</p>
                <p className="leading-relaxed text-text-secondary">교육비 세액공제는 본인 및 부양가족의 취학 전 아동·초중고·대학 교육비에 적용되며, 항목별 한도가 다릅니다. 보장성 보험료 세액공제도 연간 한도가 정해져 있으므로, 현재까지 납입한 보험료 합계를 확인해 두세요.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">연금저축·IRP 추가 납입 전략</h2>
                <p className="leading-relaxed text-text-secondary">연금저축과 개인형 퇴직연금(IRP)은 연간 납입 한도 내에서 세액공제 혜택이 주어집니다. 총급여 수준에 따라 공제 한도와 공제율이 달라지므로, 본인의 소득 구간에 해당하는 한도를 calculatorhost의 연금저축 세액공제 계산기에서 확인하세요.</p>
                <p className="leading-relaxed text-text-secondary">11월 중 추가 납입이 가능한 금액을 산정하고 12월 31일 이전에 입금을 완료해야 해당 연도 공제 대상이 됩니다. 납입 기한을 놓치지 않도록 은행·증권사 앱에서 자동이체를 설정해 두는 것이 편리합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">국세청 연말정산 미리보기 서비스 활용법</h2>
                <p className="leading-relaxed text-text-secondary">국세청 홈택스(https://www.hometax.go.kr)는 매년 11월 중순부터 '연말정산 미리보기' 서비스를 제공합니다. 전년도 공제 내역을 토대로 올해 예상 세액을 미리 계산해 볼 수 있으며, 항목별 공제 한도 대비 현재 사용 현황을 시각적으로 확인할 수 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">미리보기 서비스 접속 후 '공제항목 최적화' 메뉴에서 신용카드 사용 현황을 확인하고, 남은 두 달 동안 체크카드 또는 현금 결제로 전환할지 판단하는 데 활용하세요. 서비스 이용에는 공동인증서(구 공인인증서) 또는 간편 인증이 필요합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">부양가족 공제 요건 사전 점검</h2>
                <p className="leading-relaxed text-text-secondary">배우자·직계존비속·형제자매 등 부양가족 기본공제를 받으려면 연간 소득금액 합계 요건, 나이 요건, 생계를 같이하는 요건을 모두 충족해야 합니다. 부양가족이 올해 소득이 발생했거나 취업한 경우 공제 대상에서 제외될 수 있으므로 11월에 미리 확인하세요.</p>
                <p className="leading-relaxed text-text-secondary">또한 인적공제는 동일인에 대해 두 명이 중복 공제 신청할 수 없습니다. 맞벌이 부부의 경우 자녀·부모님 공제를 누구 명의로 신청하는 것이 유리한지 calculatorhost의 연말정산 계산기로 비교 시뮬레이션해 보시기 바랍니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">11월은 연말정산 준비를 실질적으로 마무리할 수 있는 마지막 기회입니다. 소득공제·세액공제 항목별 한도 대비 현황을 점검하고, 연금저축·IRP 추가 납입 여부와 부양가족 요건을 사전에 확인해 두면 1~2월 연말정산 시즌을 훨씬 여유 있게 대비할 수 있습니다. calculatorhost의 연말정산 관련 계산기를 활용해 본인의 예상 환급액을 시뮬레이션해 보시고, 구체적인 공제 요건과 최신 세율은 국세청 공식 자료를 반드시 확인하시기 바랍니다.</p>
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
                      국세청 홈택스 — 연말정산 미리보기 서비스
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 — 연말정산 공지 및 최신 세율 자료
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title={"2026년 연말정산 완벽 준비 11월 가이드 | calculatorhost"} url={URL} />

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
