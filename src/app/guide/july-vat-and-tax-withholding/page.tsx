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
    "7월은 개인사업자 부가가치세 확정신고와 연말정산 준비를 동시에 챙겨야 하는 핵심 시기입니다. 신고 일정·공제 항목·유의사항을 한눈에 정리했습니다.",
  keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","개인사업자 세금","세금 신고 일정","공제 항목 정리"],
  alternates: { canonical: URL },
  openGraph: {
    title: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 개인사업자 부가가치세 확정신고와 연말정산 준비를 동시에 챙겨야 하는 핵심 시기입니다. 신고 일정·공제 항목·유의사항을 한눈에 정리했습니다.",
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
    question: "7월 부가세 신고 기한을 넘기면 어떻게 되나요?",
    answer: "신고 기한(7월 25일)을 초과하면 무신고 가산세와 납부 지연 가산세가 부과됩니다. 가산세율은 신고 유형(일반·부정 등)과 지연 일수에 따라 다르므로, 기한 내 신고를 최우선으로 권장합니다. 구체적인 가산세 기준은 국세청 공식 안내를 참조하시기 바랍니다.",
  },
  {
    question: "간이과세자도 7월에 신고해야 하나요?",
    answer: "간이과세자는 원칙적으로 연 1회(1월) 확정신고를 합니다. 단, 세금계산서를 발행하는 간이과세자는 납부 의무가 별도로 발생할 수 있습니다. 자신의 과세 유형 및 의무 여부는 홈택스(hometax.go.kr) 또는 담당 세무서에서 확인하시기 바랍니다.",
  },
  {
    question: "매입세액 공제를 받으려면 어떤 서류가 필요한가요?",
    answer: "세금계산서(전자 또는 종이), 신용카드 매출전표, 현금영수증이 주요 증빙 서류입니다. 홈택스를 통해 전자 수집된 자료를 자동으로 불러올 수 있으며, 종이 서류는 별도 보관 및 입력이 필요합니다.",
  },
  {
    question: "연말정산 사전점검을 7월에 하는 이유가 있나요?",
    answer: "상반기 지출이 확정된 시점이므로 남은 하반기 지출 계획을 조정하기에 적합합니다. 예를 들어 연금저축 납입액을 추가하거나 체크카드 비중을 높이는 등의 전략을 실행할 시간적 여유가 충분합니다.",
  },
  {
    question: "전자신고와 방문 신고 중 어느 것이 유리한가요?",
    answer: "전자신고는 홈택스를 통해 신고서 자동 채움, 오류 검증, 접수 즉시 확인 등의 편의 기능을 제공하며 시간·장소 제약이 없습니다. 세무 처리가 복잡한 경우에는 세무 대리인을 통한 신고를 검토하시기 바랍니다.",
  },
  {
    question: "부가세 환급은 언제 받을 수 있나요?",
    answer: "조기환급 요건에 해당하지 않는 일반 환급의 경우, 신고 기한 종료 후 30일 이내에 환급받는 것이 원칙입니다. 정확한 환급 일정은 신고 처리 상황에 따라 달라질 수 있으며, 홈택스에서 환급 진행 상황을 조회할 수 있습니다.",
  },
  {
    question: "개인사업자도 연말정산을 받나요?",
    answer: "개인사업자는 근로소득자의 연말정산 대신 종합소득세 신고(5월)를 통해 소득과 공제를 정산합니다. 다만 사업소득 외 근로소득이 함께 있는 경우에는 연말정산과 종합소득세 신고를 모두 처리해야 할 수 있습니다.",
  },
  {
    question: "calculatorhost에서 어떤 계산기를 활용할 수 있나요?",
    answer: "부가세 계산기, 연말정산 환급 시뮬레이터, 종합소득세 계산기 등을 무료로 제공합니다. 회원가입 없이 모바일에서도 바로 사용할 수 있어 신고 전 예상 세액을 간편하게 확인하실 수 있습니다.",
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
    description: "7월은 개인사업자 부가가치세 확정신고와 연말정산 준비를 동시에 챙겨야 하는 핵심 시기입니다. 신고 일정·공제 항목·유의사항을 한눈에 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["7월 부가세 신고","부가가치세 확정신고","연말정산 사전점검","개인사업자 세금","세금 신고 일정","공제 항목 정리"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "7월 부가세 확정신고·연말정산 사전점검 2026 | calculatorhost",
    description: "7월은 개인사업자 부가가치세 확정신고와 연말정산 준비를 동시에 챙겨야 하는 핵심 시기입니다. 신고 일정·공제 항목·유의사항을 한눈에 정리했습니다.",
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
                  7월은 상반기 매출·매입을 기준으로 부가가치세 확정신고를 마감하는 달이면서, 하반기 연말정산 준비를 시작하기에 가장 적합한 시점입니다. 두 가지 세무 이슈를 놓치지 않도록 일정과 체크리스트를 미리 확인하시기 바랍니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월 부가가치세 확정신고란?</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세는 과세 기간을 기준으로 1년에 두 차례 확정신고를 실시합니다. 1기(1월~6월) 과세 기간에 해당하는 확정신고는 매년 7월 1일부터 7월 25일 사이에 이루어집니다. 일반과세자는 이 기간 안에 상반기 매출세액과 매입세액을 정산하여 납부 또는 환급 여부를 확정해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">간이과세자는 납부 의무 면제 기준 및 신고 방식이 일반과세자와 다르므로, 자신의 과세 유형을 먼저 확인하는 것이 중요합니다. 최신 기준 금액 및 세율은 국세청 공식 안내를 참조하시거나, calculatorhost의 부가세 계산기에서 간편하게 확인하실 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">신고 대상·기간·방법 한눈에 보기</h2>
                <p className="leading-relaxed text-text-secondary">7월 부가세 확정신고 대상은 일반과세자로 등록된 개인사업자 및 법인사업자(1기 확정 기준)입니다. 신고 기간은 7월 1일부터 7월 25일까지이며, 기한을 초과하면 무신고 가산세와 납부 지연 가산세가 부과될 수 있으니 반드시 기간 내에 처리하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">신고는 국세청 홈택스(hometax.go.kr) 전자신고, 세무서 방문 신고, 세무 대리인을 통한 신고 등 세 가지 방법으로 가능합니다. 전자신고를 이용하면 신고서 자동 채움 기능과 오류 검증 기능을 활용할 수 있어 편리합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">매입세액 공제 항목 꼼꼼히 챙기기</h2>
                <p className="leading-relaxed text-text-secondary">부가세 신고 시 빠뜨리기 쉬운 항목 중 하나가 매입세액 공제입니다. 사업 관련 지출에 대한 세금계산서·신용카드 매출전표·현금영수증 등을 빠짐없이 수집하고, 사업용 계좌와 개인 지출을 명확히 분리해 두는 것이 중요합니다.</p>
                <p className="leading-relaxed text-text-secondary">공제가 허용되지 않는 항목(비영업용 소형승용차 관련 비용, 접대비 관련 매입세액 등)을 사전에 파악하면 신고 오류를 줄일 수 있습니다. 구체적인 공제 제한 항목 및 최신 기준은 국세청 공식 안내(https://www.nts.go.kr) 또는 wetax(https://www.wetax.go.kr)에서 확인하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">7월부터 시작하는 연말정산 사전점검</h2>
                <p className="leading-relaxed text-text-secondary">연말정산은 매년 1~2월에 진행되지만, 공제 항목 대부분은 해당 연도 1월부터 12월까지의 지출 내역을 기준으로 합니다. 따라서 7월은 상반기 지출을 돌아보고 하반기 공제 전략을 조정하기에 적절한 시점입니다.</p>
                <p className="leading-relaxed text-text-secondary">주요 사전점검 항목으로는 ① 연간 의료비·교육비 지출 규모 파악, ② 주택청약저축·개인연금저축 납입 현황 확인, ③ 신용카드·체크카드 사용 비율 조정, ④ 부양가족 공제 요건 재검토 등이 있습니다. calculatorhost의 연말정산 계산기를 활용하면 현재까지의 공제 예상액을 간편하게 시뮬레이션할 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">절세 항목별 하반기 활용 전략</h2>
                <p className="leading-relaxed text-text-secondary">신용카드보다 체크카드·현금영수증의 소득공제율이 높게 설정되어 있으므로, 연간 사용액 구성을 조정하면 공제 효과가 달라질 수 있습니다. 단, 공제 한도가 정해져 있으므로 한도 초과 여부를 먼저 확인한 후 계획을 세우는 것이 바람직합니다.</p>
                <p className="leading-relaxed text-text-secondary">개인연금저축(연금저축펀드·IRP 등)은 납입 시점에 따라 연간 세액공제 한도를 채울 수 있습니다. 남은 하반기 납입 여력을 7월에 미리 점검하면 연말에 급하게 납입하는 상황을 피할 수 있습니다. 최신 납입 한도 및 공제율은 금융감독원(https://www.fss.or.kr) 공시 자료를 참고하시기 바랍니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">신고·납부 시 자주 하는 실수와 유의사항</h2>
                <p className="leading-relaxed text-text-secondary">부가세 신고에서 가장 자주 발생하는 실수는 전자세금계산서 합계 누락, 카드 단말기 매출 이중 집계, 면세·영세율 거래 구분 오류입니다. 신고 전 홈택스 '부가가치세 신고도움 서비스'를 통해 자동 수집된 자료와 장부를 반드시 대조하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">수정신고 및 경정청구 제도를 활용하면 신고 후 오류를 일정 기한 내에 정정할 수 있습니다. 다만 수정신고 시점에 따라 가산세 감면 비율이 달라지므로, 오류 발견 즉시 처리하는 것이 유리합니다. 자세한 절차는 국세청 홈택스(https://www.hometax.go.kr)에서 확인하실 수 있습니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">7월은 부가세 확정신고라는 즉각적인 세무 의무와 연말정산 사전점검이라는 중장기 준비가 겹치는 중요한 시기입니다. 신고 기한과 필요 서류를 미리 파악하고, 매입세액 공제 항목을 꼼꼼히 점검하면 불필요한 가산세와 공제 누락을 줄일 수 있습니다. calculatorhost의 부가세·연말정산 계산기를 활용해 예상 세액을 미리 확인하시고, 정확한 세율과 법령 기준은 국세청 공식 자료 또는 전문 세무사와 상담하시기 바랍니다.</p>
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
                      국세청 홈택스 — 부가가치세 전자신고
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청 — 부가가치세 신고 안내
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.fss.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      금융감독원 — 연금저축·IRP 공시 자료
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
