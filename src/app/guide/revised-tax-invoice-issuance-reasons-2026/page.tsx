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

const URL = "https://calculatorhost.com/guide/revised-tax-invoice-issuance-reasons-2026/";
const DATE_PUBLISHED = "2026-08-30";
const DATE_MODIFIED = "2026-08-30";

export const metadata: Metadata = {
  title: "수정세금계산서 발급 사유와 작성일자 정하는 법 2026 | calculatorhost",
  description:
    "수정세금계산서는 발급 사유별로 작성일자 기준이 다릅니다. 사유 7가지와 작성일자 결정 방법을 정리해 가산세 위험을 줄이세요.",
  keywords: ["수정세금계산서","수정세금계산서 발급 사유","작성일자","세금계산서 수정","부가가치세","전자세금계산서"],
  alternates: { canonical: URL },
  openGraph: {
    title: "수정세금계산서 발급 사유와 작성일자 정하는 법 2026 | calculatorhost",
    description: "수정세금계산서는 발급 사유별로 작성일자 기준이 다릅니다. 사유 7가지와 작성일자 결정 방법을 정리해 가산세 위험을 줄이세요.",
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
        alt: "수정세금계산서 발급 사유와 작성일자 정하는 법 2026 | calculatorhost",
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
};

const FAQ_ITEMS = [
  {
    question: "수정세금계산서와 취소세금계산서는 다른 건가요?",
    answer: "별도의 명칭이 아니라, 계약 해제·취소 사유로 발급하는 수정세금계산서를 실무에서 취소세금계산서라고 부르는 경우가 많습니다. 법령상 명칭은 모두 '수정세금계산서'이며, 사유 코드만 다르게 선택합니다.",
  },
  {
    question: "반품이 발생했을 때 작성일자는 언제로 해야 하나요?",
    answer: "환입(반품)이 실제로 이루어진 날을 작성일자로 기재합니다. 원본 세금계산서 발급일이 아니라 반품 확정일 기준이므로, 반품 일자를 증빙 서류로 남겨두는 것이 중요합니다.",
  },
  {
    question: "착오로 공급가액을 잘못 기재한 경우 어떻게 처리하나요?",
    answer: "당초 세금계산서 작성일을 그대로 사용하여, 잘못된 금액을 음수로 취소하는 수정세금계산서와 올바른 금액으로 새로 발급하는 세금계산서를 한 쌍으로 발급합니다. 홈택스에서 사유 코드를 '기재 사항 착오'로 선택하면 됩니다.",
  },
  {
    question: "내국신용장이 사후 개설된 경우 영세율을 소급 적용할 수 있나요?",
    answer: "내국신용장이 개설된 날을 작성일로 하여 수정세금계산서를 발급하면 영세율 적용이 가능합니다. 단, 개설 시점과 과세 기간에 따라 처리 방법이 달라질 수 있으므로 국세청 홈택스 안내 또는 세무 전문가에게 확인하는 것이 좋습니다.",
  },
  {
    question: "전자세금계산서 발급 의무 사업자가 아닌 경우에도 동일한 규정이 적용되나요?",
    answer: "네, 종이세금계산서 사용 사업자도 발급 사유와 작성일자 기준은 동일하게 적용됩니다. 다만 전자 전송 의무가 없으므로 관련 가산세 적용 범위는 다를 수 있습니다.",
  },
  {
    question: "수정세금계산서를 발급하지 않고 매출·매입을 그냥 조정하면 안 되나요?",
    answer: "수정세금계산서 발급 사유가 발생했음에도 발급하지 않고 임의로 신고서에만 반영하면, 세금계산서 합계표와 신고 내용이 불일치하여 가산세 대상이 될 수 있습니다. 반드시 수정세금계산서를 발급한 후 신고에 반영해야 합니다.",
  },
  {
    question: "수정세금계산서 발급 기한을 놓쳤을 때 어떻게 해야 하나요?",
    answer: "기한 경과 후에도 발급은 가능하나 지연 발급 가산세가 부과될 수 있습니다. 부가가치세 수정신고나 경정청구와 함께 처리해야 하는 경우도 있으므로, 구체적인 가산세 금액은 calculatorhost의 가산세 계산기 또는 국세청 공식 안내를 통해 확인하시기 바랍니다.",
  },
  {
    question: "공급가액 변동 시 수정세금계산서 금액은 어떻게 기재하나요?",
    answer: "변동된 금액, 즉 차이 금액만 기재하는 방식을 사용합니다. 가액이 증가했으면 양수로, 감소했으면 음수(마이너스)로 표시합니다. 당초 전체 금액을 다시 기재하는 것이 아니라 변동분만 반영하는 것이 원칙입니다.",
  },
];

export default function GuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: "수정세금계산서 발급 사유와 작성일자 정하는 법 2026 | calculatorhost" },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: "수정세금계산서 발급 사유와 작성일자 정하는 법 2026 | calculatorhost",
    description: "수정세금계산서는 발급 사유별로 작성일자 기준이 다릅니다. 사유 7가지와 작성일자 결정 방법을 정리해 가산세 위험을 줄이세요.",
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ["수정세금계산서","수정세금계산서 발급 사유","작성일자","세금계산서 수정","부가가치세","전자세금계산서"],
  });
  const webPageLd = buildWebPageJsonLd({
    name: "수정세금계산서 발급 사유와 작성일자 정하는 법 2026 | calculatorhost",
    description: "수정세금계산서는 발급 사유별로 작성일자 기준이 다릅니다. 사유 7가지와 작성일자 결정 방법을 정리해 가산세 위험을 줄이세요.",
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
                    { name: "수정세금계산서 발급 사유와 작성일자 정하는 법 2026 | calculatorhost" },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가이드 · 2026-08-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">수정세금계산서 발급 사유와 작성일자 정하는 법 2026 | calculatorhost</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  공급가액이 바뀌거나 거래가 취소될 때 원래 세금계산서를 그냥 두면 부가가치세 신고에 오류가 생깁니다. 수정세금계산서는 발급 사유에 따라 작성일자 기준이 달라지므로, 사유를 먼저 확인한 뒤 날짜를 정해야 가산세 부담을 줄일 수 있습니다.
                </p>
              </header>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">수정세금계산서란 무엇인가</h2>
                <p className="leading-relaxed text-text-secondary">수정세금계산서는 이미 발급한 세금계산서의 기재 사항에 변경이 생겼을 때 당초 세금계산서를 수정하기 위해 새로 발급하는 세금계산서입니다. 원본을 삭제하거나 덮어쓰는 것이 아니라, 당초 거래와 연결된 별도의 문서를 추가로 발급하는 방식입니다.</p>
                <p className="leading-relaxed text-text-secondary">전자세금계산서 의무 발급 대상 사업자는 국세청 홈택스(hometax.go.kr) 또는 연계 ERP를 통해 수정 발급 절차를 진행하며, 전자 발급분은 국세청에 자동 전송됩니다. 종이세금계산서를 사용하는 사업자도 동일한 사유와 작성일자 규정을 적용받습니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">발급 사유 7가지 한눈에 보기</h2>
                <p className="leading-relaxed text-text-secondary">부가가치세법령이 인정하는 수정세금계산서 발급 사유는 크게 7가지입니다. ① 기재 사항을 착오로 잘못 적은 경우, ② 공급가액이 변동된 경우(단가 조정·에누리 등), ③ 계약이 해제·취소된 경우, ④ 환입(반품)이 발생한 경우, ⑤ 내국신용장 또는 구매확인서가 사후에 개설된 경우, ⑥ 면세 등 잘못 적용하여 세율 오류가 발생한 경우, ⑦ 착오로 이중 발급된 경우입니다.</p>
                <p className="leading-relaxed text-text-secondary">각 사유는 별도의 작성일자 기준을 갖습니다. 같은 '수정'이라도 단순 착오 수정과 계약 해제는 날짜 산정 방식이 다르므로, 사유를 정확히 구분하는 것이 첫 번째 단계입니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">사유별 작성일자 결정 기준</h2>
                <p className="leading-relaxed text-text-secondary">기재 착오·이중 발급 사유는 당초 세금계산서 작성일을 수정세금계산서의 작성일로 그대로 사용합니다. 즉, 오늘 오류를 발견했더라도 날짜는 원본 발급일로 소급 기재합니다. 이 경우 음수(마이너스) 세금계산서와 올바른 내용의 세금계산서를 한 쌍으로 발급하는 방식이 일반적입니다.</p>
                <p className="leading-relaxed text-text-secondary">공급가액 변동(단가 변경·에누리·장려금 등)은 그 변동 사유가 발생한 날, 즉 실제로 가액이 달라지기로 확정된 날을 작성일로 기재합니다. 계약 해제·취소·환입의 경우에도 해제 또는 반품이 실제로 이루어진 날이 작성일 기준입니다.</p>
                <p className="leading-relaxed text-text-secondary">내국신용장·구매확인서가 사후 개설된 경우에는 해당 서류가 개설된 날을 작성일로 기재합니다. 세율 오류(과세·면세 혼동 등)는 당초 거래 작성일을 기준으로 하되, 관할 세무서 확인이 필요한 경우가 있으므로 주의가 필요합니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">발급 기한과 가산세 주의사항</h2>
                <p className="leading-relaxed text-text-secondary">수정세금계산서 발급에는 원칙적으로 확정된 과세 기간의 부가가치세 신고 기한까지 발급을 완료해야 불이익을 피할 수 있습니다. 기한을 넘긴 경우에도 발급 자체는 가능하지만, 지연 발급에 따른 가산세가 부과될 수 있습니다. 관련 가산세율은 calculatorhost의 부가가치세 계산기에서 확인하거나, 최신 기준은 국세청 공식 자료를 참조하시기 바랍니다.</p>
                <p className="leading-relaxed text-text-secondary">전자세금계산서 발급 의무 사업자가 수정 내역을 종이로만 보관하고 전송을 누락하면 별도의 미전송 가산세가 부과됩니다. 수정 발급 후 홈택스 전송 이력을 반드시 확인하세요.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">홈택스에서 수정세금계산서 발급하는 절차</h2>
                <p className="leading-relaxed text-text-secondary">홈택스(hometax.go.kr) 로그인 후 '전자세금계산서' 메뉴에서 '수정 발급'을 선택합니다. 당초 세금계산서 승인번호를 조회하여 불러온 뒤, 발급 사유 코드를 선택하면 시스템이 작성일자 입력 방식을 안내합니다. 사유 코드는 국세청이 지정한 번호 체계(1번~7번)를 따르며, 잘못된 코드를 선택하면 신고 데이터와 불일치가 생길 수 있습니다.</p>
                <p className="leading-relaxed text-text-secondary">수정 발급이 완료되면 공급자와 공급받는 자 양쪽 모두 수정된 내역이 반영된 세금계산서 합계표를 기준으로 부가가치세 신고를 진행합니다. 수정 발급 건이 많은 경우 신고 전 매입·매출 합계표와 수정 건수를 교차 점검하는 것이 권장됩니다.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">자주 혼동되는 상황별 체크포인트</h2>
                <p className="leading-relaxed text-text-secondary">거래처가 폐업한 이후에 수정 사유가 발생한 경우, 수정세금계산서 발급 자체는 가능하지만 상대방이 수취 확인을 할 수 없는 상황이 됩니다. 이 경우 세무 대리인과 상의하여 처리 방법을 결정하는 것이 안전합니다.</p>
                <p className="leading-relaxed text-text-secondary">부가가치세 신고 후 경정청구를 통해 사후적으로 매입세액을 조정하려는 경우, 수정세금계산서와 경정청구를 혼용하면 중복 공제 위험이 있습니다. 수정세금계산서 발급으로 해결할 수 있는 사안인지 먼저 판단한 후 진행해야 합니다. 구체적인 처리 방법은 국세청 세법 상담(국번 없이 126)을 이용하거나 국세법령정보시스템(law.go.kr)을 참고하시기 바랍니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">수정세금계산서는 발급 사유를 정확히 파악하는 것이 출발점입니다. 사유마다 작성일자 기준이 다르고, 홈택스에서 선택하는 사유 코드도 달라지므로 실수가 생기기 쉽습니다. 발급 기한과 가산세 규정까지 함께 확인하여 신고 데이터의 정합성을 유지하시기 바랍니다. 부가가치세 관련 계산이 필요하다면 calculatorhost의 부가가치세 계산기를 무료로 이용하실 수 있으며, 최신 세법 기준은 국세청 홈택스와 국세법령정보시스템에서 확인하실 것을 권장합니다.</p>
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
                      국세청 홈택스 전자세금계산서 발급
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/부가가치세법"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국가법령정보센터 부가가치세법
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title={"수정세금계산서 발급 사유와 작성일자 정하는 법 2026 | calculatorhost"} url={URL} />

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
