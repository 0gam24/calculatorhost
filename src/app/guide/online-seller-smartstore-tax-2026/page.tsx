// [revenue-lever: traffic+indexing] 스마트스토어·온라인셀러 세금 롱테일 검색 흡수, 자영업자 트래픽 + 색인 표면 확대.
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/online-seller-smartstore-tax-2026/';
const DATE_PUBLISHED = '2026-08-23';
const DATE_MODIFIED = '2026-08-23';

export const metadata: Metadata = {
  title: '스마트스토어 세금 2026, 사업자등록·간이과세·부가세 정리',
  description:
    '스마트스토어·쿠팡 온라인 판매를 시작하면 사업자등록과 통신판매업 신고, 부가가치세, 5월 종합소득세가 따라옵니다. 간이과세와 일반과세 차이, 4,800만원 납부면제, 매출별 세금 구조를 2026 기준으로 정리합니다.',
  keywords: [
    '스마트스토어 세금',
    '온라인 셀러 세금',
    '통신판매업 신고',
    '간이과세자 부가세',
    '일반과세자 전환',
    '스마트스토어 사업자등록',
    '부가가치세법 69조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '스마트스토어 세금 2026 사업자등록 간이과세 부가세' }],
    title: '스마트스토어 세금 2026, 사업자등록부터 부가세·종소세까지',
    description: '온라인 판매 시작 시 사업자등록, 통신판매업, 간이·일반과세 부가세, 종합소득세를 한 번에 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '스마트스토어 세금 2026, 사업자등록·간이과세·부가세',
    description: '온라인 셀러의 사업자등록, 통신판매업, 부가세, 종합소득세 구조 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '취미로 몇 개만 파는데도 사업자등록을 해야 하나요?',
    answer:
      '온라인에서 계속·반복적으로 물건을 팔아 수익을 낸다면 사업자등록이 원칙입니다(소득세법 §19의 사업소득). 스마트스토어는 판매를 이어가려면 사실상 사업자등록이 필요합니다. 일회성 중고 처분과 달리 정기 판매는 사업 활동으로 보므로, 초기에 등록해 두는 것이 가산세 위험을 줄입니다.',
  },
  {
    question: '통신판매업 신고는 사업자등록과 다른 건가요?',
    answer:
      '네, 별개입니다. 사업자등록은 세무서(홈택스)에, 통신판매업 신고는 관할 구청에 하는 절차입니다(전자상거래 등에서의 소비자보호에 관한 법률 §12). 통신판매업은 매년 등록면허세(연 4만~6만원 수준)가 부과됩니다. 간이과세자 등 일정 요건이면 통신판매업 신고가 면제되기도 하므로 구청에 확인하세요.',
  },
  {
    question: '간이과세자와 일반과세자는 무엇이 다른가요?',
    answer:
      '연간 공급대가(매출)가 1억 400만원 미만이면 간이과세자로 시작할 수 있습니다(부가가치세법 §61). 간이과세자는 매출에 업종별 부가가치율을 곱한 뒤 10%를 적용해 실질 부가세율이 낮고 신고도 간편합니다. 매출이 기준을 넘으면 다음 해 7월 1일부터 일반과세자로 전환됩니다.',
  },
  {
    question: '매출이 얼마 이하면 부가세를 안 내나요?',
    answer:
      '간이과세자의 해당 과세기간 공급대가 합계가 4,800만원 미만이면 부가가치세 납부의무가 면제됩니다(부가가치세법 §69). 다만 납부가 면제되더라도 신고 자체는 해야 합니다. 신고를 빠뜨리면 무신고 불이익이 생길 수 있으니, 낼 세금이 없어도 기한 내 신고하세요.',
  },
  {
    question: '부가세는 1년에 몇 번 신고하나요?',
    answer:
      '일반과세자는 1년에 2회(1월, 7월), 간이과세자는 1년에 1회(1월) 부가가치세를 신고합니다. 여기에 더해 사업소득에 대한 종합소득세는 사업자 유형과 관계없이 매년 5월에 신고합니다. 즉 온라인 셀러는 부가세와 종소세라는 두 축의 세금 일정을 관리해야 합니다.',
  },
  {
    question: '종합소득세는 매출 전체에 매기나요?',
    answer:
      '아닙니다. 매출(수입금액)에서 매입원가, 택배비, 광고비, 포장비, 수수료 등 필요경비를 뺀 소득에 누진세율(소득세법 §55)을 적용합니다. 실제 지출 증빙을 잘 모으면 소득이 줄어 세금이 낮아집니다. 사업용 계좌·카드를 분리해 관리하면 경비 인정과 신고가 수월합니다.',
  },
  {
    question: '장부는 꼭 써야 하나요?',
    answer:
      '수입금액이 작은 신규 사업자는 단순경비율 추계신고가 가능하지만, 매출이 커지면 복식부기의무자로 전환되어 정식 장부를 써야 합니다(소득세법 §160). 복식부기 전환 기준 매출은 업종별로 다릅니다. 장부를 쓰면 실제 경비를 온전히 반영할 수 있어 대체로 세금이 줄어듭니다.',
  },
  {
    question: '오픈마켓 여러 곳에서 팔면 매출을 어떻게 합치나요?',
    answer:
      '스마트스토어, 쿠팡, 11번가 등 여러 플랫폼 매출은 하나의 사업자 기준으로 합산해 신고합니다. 플랫폼별 정산내역과 판매수수료 자료를 모아 총매출과 총경비를 계산해야 합니다. 플랫폼이 국세청에 제출하는 자료와 신고 내용이 어긋나면 소명 요청을 받을 수 있으니 정확히 반영하세요.',
  },
];

export default function OnlineSellerSmartstoreTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '스마트스토어 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '스마트스토어 세금 2026, 사업자등록·간이과세·부가세 정리',
    description:
      '온라인 셀러의 사업자등록과 통신판매업 신고, 간이·일반과세 부가세, 4,800만원 납부면제, 종합소득세 구조와 계산 사례를 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['스마트스토어 세금', '온라인 셀러', '간이과세', '통신판매업', '부가가치세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '스마트스토어 세금 2026',
    description: '온라인 셀러의 사업자등록, 부가세, 종합소득세 구조를 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
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
                    { name: '스마트스토어 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">온라인 셀러·자영업자 · 8분 읽기 · 2026-08-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  스마트스토어 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 사업자등록부터 부가세·종소세까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  스마트스토어나 쿠팡에서 첫 판매가 일어나는 순간부터 세금이 따라붙습니다. 사업자등록은 언제 하는지, 통신판매업 신고는 또 뭔지, 간이과세와 일반과세는 어떻게 다른지, 부가세와 종합소득세를 각각 언제 내는지 막막한 초보 셀러를 위해, 매출 단계별 세금 구조를 2026년 기준으로 한 번에 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">온라인 판매도 세금을 내야 하나요?</h2>
                <p>
                  네, 계속 판매하면 세금 대상입니다. 온라인에서 물건을 반복적으로 팔아 수익을 내면 소득세법 §19의 사업소득에 해당해, 부가가치세와 종합소득세 신고 의무가 생깁니다. 스마트스토어는 판매를 이어가려면 사업자등록이 사실상 필요하므로, 시작 단계에서 등록하는 것이 안전합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">온라인 셀러의 세금 3단계</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1단계 등록: 사업자등록(세무서) + 통신판매업 신고(구청)
                    <br />
                    2단계 부가세: 간이(연 1회) 또는 일반(연 2회) 신고
                    <br />
                    3단계 종소세: 매년 5월, 매출에서 경비를 뺀 소득에 과세
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세와 일반과세, 어떻게 다른가요?</h2>
                <p>
                  가장 큰 차이는 부가세 계산 방식과 신고 부담입니다. 연 공급대가(매출)가 1억 400만원 미만이면 간이과세자로 시작할 수 있습니다(부가가치세법 §61).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 간이과세자와 일반과세자 비교 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">간이과세자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반과세자</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">적용 매출</td>
                        <td className="p-3">연 공급대가 1억 400만원 미만</td>
                        <td className="p-3">1억 400만원 이상 또는 선택</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부가세 계산</td>
                        <td className="p-3">매출 × 업종별 부가율 × 10%</td>
                        <td className="p-3">매출세액 10% − 매입세액</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부가세 신고</td>
                        <td className="p-3">연 1회(1월)</td>
                        <td className="p-3">연 2회(1월·7월)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">납부면제</td>
                        <td className="p-3">공급대가 4,800만원 미만 시 면제</td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 초기 장비·재고 매입이 커서 매입세액 환급이 크다면, 오히려 일반과세자가 유리할 수 있습니다. 매입세액을 돌려받을 수 있기 때문입니다. 본인 매출·매입 구조를 보고 선택하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부가세는 얼마나 나오나요?</h2>
                <p>
                  간이과세자의 부가세는 매출에 업종별 부가가치율(대략 15~40%)을 곱한 뒤 10%를 적용합니다. 아래는 소매업(부가율 15% 가정) 기준의 계산 사례입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 간이과세자, 연 공급대가 4,000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 공급대가: 4,000만원(4,800만원 미만)
                    <br />
                    · 부가세: 납부의무 면제(부가가치세법 §69)
                    <br />
                    · 결과: 납부액 <strong>0원</strong>, 단 신고는 필수
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 간이과세자, 연 공급대가 8,000만원(소매 부가율 15%)</p>
                  <p className="text-sm text-text-secondary">
                    · 공급대가: 8,000만원(4,800만원 초과라 납부 대상)
                    <br />
                    · 매출세액: 8,000만 × 15% × 10% = <strong>120만원</strong>
                    <br />
                    · 세금계산서 매입세액공제 등은 별도 차감
                    <br />
                    <span className="text-xs text-text-tertiary">업종별 부가율에 따라 달라지는 단순 예시. 실제 신고는 홈택스 기준 확인.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종합소득세와 장부, 무엇을 준비하나요?</h2>
                <p>
                  종합소득세는 매출 전체가 아니라, 매출에서 필요경비를 뺀 소득에 매깁니다. 매입원가, 택배비, 광고비, 포장비, 플랫폼 수수료 등이 경비로 인정됩니다. 실제 지출 증빙을 잘 모을수록 소득이 줄어 세금이 낮아집니다.
                </p>
                <p>
                  매출이 커지면 단순경비율 추계신고에서 복식부기의무자로 전환됩니다(소득세법 §160). 복식부기 전환 기준 매출은 업종별로 다르므로, 본인 업종 기준을 홈택스에서 확인하세요. 다만 장부를 쓰면 실제 경비를 온전히 반영해 대체로 세금이 줄어드는 이점이 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 부가세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세자의 부가세 계산과 신고 규칙 정리.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">업종·과세유형 선택과 신청 절차 안내.</p>
                  </Link>
                  <Link
                    href="/guide/youtuber-creator-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">유튜버 세금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">크리에이터 수익의 사업자등록과 영세율 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">수입과 경비로 예상 종합소득세를 계산하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 과세유형, 부가율, 복식부기 전환 기준, 통신판매업 신고 의무는 관할 세무서·구청 또는 홈택스에서 반드시 확인하세요. 인용 조항은 소득세법 §19(사업소득), 소득세법 §160(장부의 비치·기록), 부가가치세법 §61(간이과세), 부가가치세법 §69(간이과세자 납부의무 면제), 전자상거래법 §12(통신판매업 신고)입니다. 본 콘텐츠는 2026-08-23 기준이며 세법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons title="스마트스토어 세금 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
