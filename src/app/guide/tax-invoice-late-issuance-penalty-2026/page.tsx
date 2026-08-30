// [revenue-lever: traffic+indexing] 자동 발행 가이드는 트래픽·색인 표면 동시 증가 (북극성 룰).
import type { Metadata } from 'next';
import Link from 'next/link';
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

const URL = "https://calculatorhost.com/guide/tax-invoice-late-issuance-penalty-2026/";
const DATE_PUBLISHED = "2026-08-30";
const DATE_MODIFIED = "2026-08-30";

export const metadata: Metadata = {
  title: "세금계산서 지연발급 가산세, 언제 얼마나 붙나 2026 | calculatorhost",
  description:
    "세금계산서를 공급일 다음 달 10일까지 발급하지 않으면 가산세가 부과됩니다. 지연발급·미발급 유형별 가산세 기준과 절차를 정리했습니다.",
  keywords: ["세금계산서 가산세","지연발급 가산세","세금계산서 미발급","전자세금계산서","부가가치세 가산세","가산세 계산"],
  alternates: { canonical: URL },
  openGraph: {
    title: "세금계산서 지연발급 가산세, 언제 얼마나 붙나 2026 | calculatorhost",
    description: "세금계산서를 공급일 다음 달 10일까지 발급하지 않으면 가산세가 부과됩니다. 지연발급·미발급 유형별 가산세 기준과 절차를 정리했습니다.",
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    // alt 누락 시 네이버 "Alt 속성 누락" 경고 (품질 게이트 yellow 항목)
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: "세금계산서 지연발급 가산세, 언제 얼마나 붙나 2026 | calculatorhost",
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
};

const FAQ_ITEMS = [
  {
    question: "세금계산서 발급 기한은 언제까지인가요?",
    answer: "공급일이 속한 달의 다음 달 10일까지 발급하면 적법 발급으로 인정됩니다. 이 기한을 초과하면 지연발급 가산세 대상이 됩니다.",
  },
  {
    question: "지연발급과 미발급의 차이는 무엇인가요?",
    answer: "지연발급은 발급 기한이 지났지만 해당 과세기간 확정신고 기한 내에 발급한 경우이고, 미발급은 확정신고 기한까지도 발급하지 않은 경우입니다. 미발급 가산세율이 지연발급보다 높습니다.",
  },
  {
    question: "전자세금계산서를 발급했는데 전송을 빠뜨렸습니다. 가산세가 붙나요?",
    answer: "네, 발급과 전송은 별개입니다. 발급 다음 날까지 국세청에 전송하지 않으면 전송 지연 가산세가 부과됩니다.",
  },
  {
    question: "세금계산서를 잘못 발급했을 때는 어떻게 하나요?",
    answer: "수정세금계산서를 발급하여 오류를 정정할 수 있습니다. 수정 사유를 정확히 기재하고, 오류 발견 즉시 처리하는 것이 추가 불이익을 줄이는 방법입니다.",
  },
  {
    question: "공급받는 자(매입자)도 가산세를 내야 하나요?",
    answer: "공급받는 자도 세금계산서를 적법하게 수취하지 못한 경우 매입세액 공제 불인정 외에 별도 가산세가 적용될 수 있습니다. 공급자에게 기한 내 발급을 요청하는 것이 중요합니다.",
  },
  {
    question: "가산세를 줄일 수 있는 방법이 있나요?",
    answer: "과세관청의 경정 또는 세무조사 통지 전에 자진 수정 신고를 하면 국세기본법에 따라 가산세 일부를 감면받을 수 있습니다. 경과 기간이 짧을수록 감면율이 높으므로 오류를 발견하면 빠르게 조치하는 것이 유리합니다.",
  },
  {
    question: "가산세는 어떤 금액을 기준으로 계산하나요?",
    answer: "가산세는 부가세 포함 금액이 아닌 공급가액(세전 금액)을 기준으로 산정합니다. calculatorhost의 세금계산서 가산세 계산기에서 공급가액을 입력해 예상 가산세를 확인해보실 수 있습니다.",
  },
  {
    question: "종이 세금계산서를 발급해도 되는 사업자는 누구인가요?",
    answer: "전자세금계산서 의무 발급 대상이 아닌 사업자는 종이 세금계산서 발급이 가능합니다. 의무 발급 대상 여부는 매출 규모와 사업자 유형에 따라 결정되며, 국세청 홈택스에서 본인 해당 여부를 조회할 수 있습니다.",
  },
];

export default function GuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: "세금계산서 지연발급 가산세, 언제 얼마나 붙나 2026 | calculatorhost" },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: "세금계산서 지연발급 가산세, 언제 얼마나 붙나 2026 | calculatorhost",
    description: "세금계산서를 공급일 다음 달 10일까지 발급하지 않으면 가산세가 부과됩니다. 지연발급·미발급 유형별 가산세 기준과 절차를 정리했습니다.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["세금계산서 가산세","지연발급 가산세","세금계산서 미발급","전자세금계산서","부가가치세 가산세","가산세 계산"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "세금계산서 지연발급 가산세, 언제 얼마나 붙나 2026 | calculatorhost",
    description: "세금계산서를 공급일 다음 달 10일까지 발급하지 않으면 가산세가 부과됩니다. 지연발급·미발급 유형별 가산세 기준과 절차를 정리했습니다.",
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
                    { name: "세금계산서 지연발급 가산세, 언제 얼마나 붙나 2026 | calculatorhost" },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가이드 · 2026-08-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">세금계산서 지연발급 가산세, 언제 얼마나 붙나 2026 | calculatorhost</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  세금계산서를 제때 발급하지 않으면 공급가액을 기준으로 가산세가 붙습니다. 지연발급과 미발급은 요율이 다르며, 전자세금계산서 의무 발급 사업자라면 종이 발급 자체도 별도 제재 대상이 됩니다. 이 가이드는 가산세가 발생하는 시점, 유형별 산정 방식, 그리고 실수를 줄이기 위한 실무 확인 사항을 안내합니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">세금계산서 발급 기한, 어디서 시작하나</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세법상 세금계산서는 원칙적으로 재화·용역의 공급 시기에 발급해야 합니다. 다만 실무상 월별 정산 편의를 위해 공급일이 속한 달의 다음 달 10일까지 발급하는 것도 적법 발급으로 인정됩니다. 이 기한을 넘기면 지연발급, 아예 발급하지 않으면 미발급으로 분류됩니다.</p>
                <p className="leading-relaxed text-text-secondary">전자세금계산서 의무 발급 사업자(일정 규모 이상 법인 및 개인사업자)는 발급일 다음 날까지 국세청 전송까지 완료해야 합니다. 전송 지연도 별도 가산세 대상이므로, 발급과 전송을 구분해서 관리하는 것이 중요합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">가산세 유형 세 가지, 공급자와 공급받는 자 모두 해당</h2>
                <p className="leading-relaxed text-text-secondary">가산세는 크게 지연발급, 미발급, 전송 지연으로 나뉩니다. 공급자는 발급 의무를 이행하지 않을 때 가산세를 부담하고, 공급받는 자는 매입세액 공제를 받지 못하는 불이익에 더해 별도 가산세가 적용될 수 있습니다. 같은 거래 하나로 양측 모두 제재를 받을 수 있기 때문에 발급 기한 관리는 양 당사자 모두의 실무 과제입니다.</p>
                <p className="leading-relaxed text-text-secondary">지연발급은 발급 기한을 넘겼지만 해당 과세기간의 확정신고 기한 내에 발급한 경우, 미발급은 확정신고 기한까지도 발급하지 않은 경우로 구분됩니다. 미발급 가산세율은 지연발급보다 훨씬 높으므로, 늦더라도 가능한 한 빨리 발급하는 것이 불이익을 줄이는 방법입니다. 구체적인 가산세율은 calculatorhost의 세금계산서 가산세 계산기에서 확인하실 수 있습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">전자세금계산서 전송 지연, 별도 가산세가 붙는 이유</h2>
                <p className="leading-relaxed text-text-secondary">전자세금계산서는 발급과 동시에 국세청 시스템으로 전송해야 합니다. 발급 다음 날 자정 이전에 전송하지 않으면 전송 지연 가산세가 별도로 부과됩니다. 발급은 제때 했더라도 전송을 빠뜨리면 가산세가 함께 누적될 수 있으므로, ERP·회계 시스템의 자동 전송 설정을 정기적으로 점검해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">공급가액 합계가 같은 거래라도 발급·전송 지연이 겹치면 가산세 부담이 배로 늘어납니다. 월말 마감이 몰리는 시기에 대량 발급을 처리할 때 특히 주의가 필요합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">실무에서 자주 생기는 발급 오류와 대처 방법</h2>
                <p className="leading-relaxed text-text-secondary">공급 시기 착오, 거래처 사업자등록번호 오기, 품목 누락 등 세금계산서 기재 오류는 수정세금계산서로 정정할 수 있습니다. 수정세금계산서는 오류 발견 즉시 발급하는 것이 원칙이며, 수정 사유를 정확히 기재해야 합니다. 단순 기재 오류를 이유로 세금계산서를 취소하고 재발급하면 발급일 기준이 달라질 수 있으니 주의해야 합니다.</p>
                <p className="leading-relaxed text-text-secondary">거래 당사자 간 대금 지급 시기와 공급 시기가 다를 때 발급 기한 산정 오류가 자주 발생합니다. 계약서상 대금 수령일이 아니라 재화나 용역의 공급 완료 시점을 기준으로 삼아야 하며, 용역 거래는 역무 완료일이 언제인지 계약 내용을 꼼꼼히 확인하는 것이 중요합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">가산세 감면, 자진 수정 신고 시 혜택</h2>
                <p className="leading-relaxed text-text-secondary">세금계산서 가산세도 국세기본법상 자진 수정 신고 절차를 통해 일부 감면받을 수 있는 경우가 있습니다. 세무조사 통지 전 또는 과세관청의 경정 전에 스스로 수정 신고를 하면 감면 혜택이 적용될 수 있으며, 경과 기간에 따라 감면율이 달라집니다.</p>
                <p className="leading-relaxed text-text-secondary">감면 혜택의 구체적인 요건과 비율은 세목과 상황에 따라 다르므로, 세무사 또는 국세청 상담 서비스(국세상담센터 126)를 통해 개별 상황에 맞는 안내를 받는 것이 바람직합니다. 최신 감면 요건은 국세청 공식 자료를 참조하세요.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">가산세 계산 전 반드시 확인해야 할 사항</h2>
                <p className="leading-relaxed text-text-secondary">가산세 산정의 기준은 공급가액입니다. 부가세 포함 금액이 아닌 공급가액(세전 금액)을 기준으로 가산세율을 적용한다는 점을 주의해야 합니다. 예를 들어 공급가액이 1억 원인 거래(시나리오 기준)에서 미발급 가산세가 적용되면 부담이 상당하므로, 발급 기한 내 처리하는 것이 가장 확실한 방법입니다.</p>
                <p className="leading-relaxed text-text-secondary">calculatorhost의 세금계산서 가산세 계산기에 공급가액과 발급 유형을 입력하면 예상 가산세를 간편하게 산출해볼 수 있습니다. 계산 결과는 참고용이며, 실제 신고·납부 전에는 세무 전문가 확인을 권장합니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">세금계산서 가산세는 발급 기한을 조금만 놓쳐도 공급가액 기준으로 적지 않은 금액이 추가됩니다. 월별 발급 현황을 주기적으로 점검하고, 전자세금계산서 전송 상태까지 함께 확인하는 습관이 실질적인 예방책입니다. 발급 오류를 발견했다면 수정세금계산서를 즉시 처리하고, 자진 수정 신고 요건에 해당하는지 세무 전문가와 검토해보시기 바랍니다. calculatorhost의 세금계산서 가산세 계산기를 활용하면 상황별 예상 가산세를 빠르게 확인할 수 있습니다.</p>
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
                      국세청 홈택스, 전자세금계산서 발급·조회
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2352&amp;cntntsId=7714"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국세청, 부가가치세 가산세 안내
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title={"세금계산서 지연발급 가산세, 언제 얼마나 붙나 2026 | calculatorhost"} url={URL} />

              {/* 관련 자원: 내부 링크 mesh (북극성 룰, 고립 페이지 차단·토픽 클러스터 형성) */}
              <section aria-label="관련 자원" className="card space-y-2">
                <h2 className="text-lg font-semibold">함께 보면 좋은 계산기</h2>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link href="/category/tax/" className="text-primary-600 hover:underline dark:text-primary-500">
                      세금 계산기 모음
                    </Link>
                    <span className="text-text-tertiary"> 종합소득세·양도세·증여세를 한 곳에서 계산</span>
                  </li>
                  <li>
                    <Link href="/calculator/capital-gains-tax/" className="text-primary-600 hover:underline dark:text-primary-500">
                      양도소득세 계산기
                    </Link>
                    <span className="text-text-tertiary"> 보유·거주 기간을 넣어 예상 세액 확인</span>
                  </li>
                  <li>
                    <Link href="/calculator/freelancer-tax/" className="text-primary-600 hover:underline dark:text-primary-500">
                      프리랜서 종합소득세 계산기
                    </Link>
                    <span className="text-text-tertiary"> 3.3% 원천징수분 환급 여부 확인</span>
                  </li>
                  <li>
                    <Link href="/guide/" className="text-primary-600 hover:underline dark:text-primary-500">
                      가이드 전체 보기
                    </Link>
                    <span className="text-text-tertiary"> 세금·금융·부동산·근로 실전 가이드 모음</span>
                  </li>
                </ul>
              </section>

              <MainBackrefBox mainCategoryUrl={getMainCategoryUrl('tax')} />

              <section
                aria-label="작성 방식 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>작성 방식</strong>: 본 가이드는 Anthropic Claude AI 가 자동 생성한 초안으로,
                  금지 표현·출처·분량 자동 품질 게이트를 통과해 2026-08-30 자동 발행되었습니다.
                  발행 시점에 사람의 사전 검수는 거치지 않았으며, 운영자(김준혁, 스마트데이터샵)가
                  발행 후 법조항·세율·중복 여부를 점검해 필요 시 수정합니다.
                  구체적 세율·법조항 수치는 이 글이 아니라 아래 공식 출처와 calculatorhost 계산기에서 확인하세요.
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
