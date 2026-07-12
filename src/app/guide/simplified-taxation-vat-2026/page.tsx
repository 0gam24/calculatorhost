import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/simplified-taxation-vat-2026/';
const DATE_PUBLISHED = '2026-07-13';
const DATE_MODIFIED = '2026-07-13';

export const metadata: Metadata = {
  title: '간이과세자 부가가치세 2026, 기준 1억400만원·세금계산서 발급',
  description:
    '간이과세자는 직전연도 공급대가 1억400만원 미만인 소규모 사업자입니다. 일반과세자와의 세액 차이, 세금계산서 발급 의무 기준 4,800만원, 납부면제 조건을 부가가치세법 §61로 정리합니다.',
  keywords: [
    '간이과세자',
    '간이과세 기준',
    '간이과세자 부가가치세',
    '세금계산서 발급 의무',
    '납부면제 4800만원',
    '일반과세 전환',
    '부가가치세법 61조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '간이과세자 부가가치세 2026 기준과 세금계산서 발급' }],
    title: '간이과세자 부가가치세 2026, 기준·세액·세금계산서 발급 완전정리',
    description: '직전연도 매출 1억400만원 미만 간이과세, 부가율로 낮은 세액. 세금계산서 의무 4,800만원, 납부면제 4,800만원 기준을 정확히.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '간이과세자 부가가치세 2026, 기준·세액·세금계산서',
    description: '매출 1억400만원 미만 간이과세. 부가율 적용 세액, 세금계산서 발급 4,800만원 기준. 부가가치세법 §61.',
  },
};

const FAQ_ITEMS = [
  {
    question: '간이과세자 기준이 정확히 얼마인가요?',
    answer:
      '직전연도 공급대가(부가세 포함 매출) 합계가 1억400만원 미만이면 간이과세자입니다(부가가치세법 §61). 2024년 7월 1일부터 종전 8,000만원에서 1억400만원으로 상향됐습니다. 다만 부동산임대업과 과세유흥장소는 종전대로 4,800만원 미만 기준이 유지됩니다.',
  },
  {
    question: '간이과세자는 세금계산서를 발급할 수 있나요?',
    answer:
      '직전연도 공급대가가 4,800만원 이상인 간이과세자는 세금계산서를 발급해야 합니다(부가가치세법 §36). 4,800만원 미만이면 세금계산서를 발급할 수 없고 영수증만 발급합니다. 거래처가 사업자라 세금계산서를 요구한다면 이 기준을 먼저 확인하세요.',
  },
  {
    question: '간이과세자도 부가세를 안 낼 수 있나요?',
    answer:
      '네, 해당 과세기간 공급대가가 4,800만원 미만이면 납부의무가 면제됩니다(부가가치세법 §69). 신고는 해야 하지만 납부할 세액은 0원입니다. 다만 신규 개업 첫해 등 예외가 있으니 홈택스 신고 화면에서 면제 여부를 확인하는 것이 안전합니다.',
  },
  {
    question: '간이과세와 일반과세 중 어느 쪽이 유리한가요?',
    answer:
      '매출이 적고 최종소비자 대상이면 간이과세가 유리합니다. 간이과세는 업종별 부가율(15~40%)만큼만 과세돼 세액이 낮기 때문입니다. 반대로 초기 시설투자로 매입세액이 크거나 거래처가 세금계산서를 요구하는 B2B라면 일반과세가 유리할 수 있습니다.',
  },
  {
    question: '간이과세자는 부가세 신고를 언제 하나요?',
    answer:
      '간이과세자는 1년에 한 번, 다음해 1월 1일부터 25일까지 확정신고합니다. 과세기간이 1월 1일부터 12월 31일까지 1년 단위이기 때문입니다. 다만 7월에 직전 과세기간 납부세액의 절반을 예정부과(고지)받을 수 있으며, 세액이 소액이면 예정부과가 생략됩니다.',
  },
  {
    question: '매출이 1억400만원을 넘으면 어떻게 되나요?',
    answer:
      '직전연도 공급대가가 1억400만원 이상이 되면 그다음해 7월 1일부터 일반과세자로 전환됩니다. 국세청이 전환을 통지하며, 별도 신청은 필요 없습니다. 전환 시점 재고품과 감가상각자산에 대한 매입세액을 공제받는 재고매입세액공제 신고를 챙기면 손해를 줄일 수 있습니다.',
  },
  {
    question: '간이과세자도 매입세액을 공제받나요?',
    answer:
      '네, 다만 방식이 다릅니다. 간이과세자는 세금계산서 등을 받은 매입액(부가세 포함)의 0.5%를 세액에서 공제합니다(부가가치세법 §63). 일반과세자처럼 매입세액 전액을 공제하는 것이 아니므로, 매입이 많은 사업이라면 일반과세가 더 나을 수 있습니다.',
  },
  {
    question: '간이과세를 포기하고 일반과세를 선택할 수 있나요?',
    answer:
      '네, 간이과세 포기신고를 하면 일반과세자가 될 수 있습니다(부가가치세법 §70). 다만 포기하면 그 적용받으려는 달의 1일부터 3년간은 다시 간이과세로 돌아갈 수 없으니 신중해야 합니다. 매입세액 환급이 필요한 창업 초기에 주로 활용합니다.',
  },
];

export default function SimplifiedTaxationVat2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '간이과세자 부가가치세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '간이과세자 부가가치세 2026, 기준·세액·세금계산서 발급 완전정리',
    description:
      '직전연도 공급대가 1억400만원 미만 간이과세자의 기준, 부가율 적용 세액 계산, 세금계산서 발급 의무 4,800만원, 납부면제 조건, 일반과세 전환까지 부가가치세법 §61 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['간이과세자', '부가가치세', '세금계산서 발급', '납부면제', '일반과세 전환'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '간이과세자 부가가치세 2026',
    description:
      '간이과세자 기준 1억400만원, 부가율 세액, 세금계산서 발급 의무 4,800만원, 납부면제 조건 정리.',
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
                    { name: '간이과세자 부가가치세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">프리랜서·1인사업자 · 8분 읽기 · 2026-07-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  간이과세자 부가가치세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">기준 1억400만원, 세금계산서, 납부면제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  카페, 온라인 판매, 1인 스튜디오처럼 매출 규모가 작은 사업자라면 간이과세가 세금을 크게 줄여줍니다. 그런데 2024년 7월 기준금액이 오르고 세금계산서 발급 규칙이 바뀌면서 헷갈리는 분이 많습니다. 이 가이드는 간이과세자의 기준, 세액이 왜 낮은지, 세금계산서를 언제 발급해야 하는지, 그리고 부가세를 아예 안 내도 되는 조건까지 부가가치세법 조문으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-simplified-taxation-vat-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세자란 누구인가</h2>
                <p>
                  간이과세자는 직전연도 공급대가 합계가 1억400만원 미만인 개인 소규모 사업자입니다(부가가치세법 §61). 공급대가란 부가세가 포함된 매출 총액을 말합니다. 일반과세자가 매출세액에서 매입세액을 빼는 방식으로 부가세를 계산하는 것과 달리, 간이과세자는 매출에 업종별 부가율만 곱해 훨씬 낮은 세액을 냅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2024년 7월 기준금액 상향</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    종전 연 매출 8,000만원 미만이던 간이과세 기준이 2024년 7월 1일부터 1억400만원 미만으로 올랐습니다. 그만큼 더 많은 소규모 사업자가 간이과세 혜택을 받게 됐습니다.
                    <br />
                    단, 부동산임대업과 과세유흥장소는 예외로 4,800만원 미만 기준이 유지됩니다.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 업종 자체가 간이과세 배제 대상이면 매출이 작아도 간이과세를 적용받을 수 없습니다. 광업, 제조업(일부 소매 제외), 도매업, 부동산매매업, 변호사·세무사 등 전문직 사업서비스업이 대표적입니다(부가가치세법 §61 ① 각 호).
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세 세액은 어떻게 계산하나</h2>
                <p>
                  간이과세 납부세액은 공급대가에 업종별 부가율과 10%를 곱해 산출합니다(부가가치세법 §63). 부가율이 낮은 업종일수록 세부담이 작습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 업종별 부가가치율 (부가가치세법 시행령 §111, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">업종</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">부가율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소매업·재생용재료수집·음식점업</td>
                        <td className="p-3"><strong>15%</strong></td>
                        <td className="p-3">편의점, 식당, 카페</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">제조업·농임어업·소화물전문운송업</td>
                        <td className="p-3"><strong>20%</strong></td>
                        <td className="p-3">소규모 공방, 배달대행</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">숙박업</td>
                        <td className="p-3"><strong>25%</strong></td>
                        <td className="p-3">게스트하우스, 펜션</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">건설업·운수창고업·정보통신업</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">인테리어, 소프트웨어</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">금융·부동산임대·전문과학기술·기타서비스업</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">컨설팅, 임대, 미용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 부가율은 시행령 개정으로 바뀔 수 있고 업종 분류가 애매한 경우도 많습니다. 자신의 업종코드에 맞는 정확한 부가율은 홈택스 신고 화면 또는 세무서를 통해 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 세액 계산 사례</h2>
                <p>
                  다음 사례로 간이과세 세액이 일반과세보다 얼마나 낮은지 비교해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 연 매출 6,000만원 음식점 (부가율 15%)</p>
                  <p className="text-sm text-text-secondary">
                    · 공급대가(매출): 6,000만원
                    <br />
                    · 간이과세 납부세액: 6,000만원 × 15% × 10% = <strong>90만원</strong>
                    <br />
                    · 매입 세금계산서 2,000만원 수취 시 공제: 2,000만원 × 0.5% = 10만원
                    <br />
                    · 최종 납부세액: 90만원 - 10만원 = <strong>80만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">참고: 동일 매출 일반과세라면 매출세액만 약 545만원(6,000만원÷1.1×10%)이라 매입세액이 적을수록 간이과세가 유리.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 연 매출 4,000만원 온라인 소매 (납부면제)</p>
                  <p className="text-sm text-text-secondary">
                    · 공급대가(매출): 4,000만원
                    <br />
                    · 산출세액: 4,000만원 × 15% × 10% = 60만원
                    <br />
                    · 공급대가 4,800만원 미만 → 납부의무 면제(부가가치세법 §69)
                    <br />
                    · 최종 납부세액: <strong>0원</strong> (신고는 필수)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 매출 4,800만원 미만이면 세액이 나와도 실제 납부는 면제.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 연 매출 9,000만원 인테리어 (부가율 30%)</p>
                  <p className="text-sm text-text-secondary">
                    · 공급대가(매출): 9,000만원
                    <br />
                    · 간이과세 납부세액: 9,000만원 × 30% × 10% = <strong>270만원</strong>
                    <br />
                    · 매출 4,800만원 이상 → 세금계산서 발급 의무 발생
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 4,800만원 이상 간이과세자는 세금계산서를 발급해야 하며, B2B 거래가 많으면 관리 부담이 커짐.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금계산서는 언제 발급하나</h2>
                <p>
                  직전연도 공급대가 4,800만원 이상 간이과세자는 세금계산서를 발급해야 합니다(부가가치세법 §36). 4,800만원 미만이면 세금계산서를 발급할 수 없고 영수증만 냅니다. 즉 같은 간이과세자라도 매출 규모에 따라 발급 의무가 갈립니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 간이과세자 공급대가별 의무 (부가가치세법 §36·§69)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">직전연도 공급대가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세금계산서</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납부의무</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">4,800만원 미만</td>
                        <td className="p-3">발급 불가(영수증)</td>
                        <td className="p-3"><strong>면제</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4,800만원 이상~1억400만원 미만</td>
                        <td className="p-3"><strong>발급 의무</strong></td>
                        <td className="p-3">있음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억400만원 이상</td>
                        <td className="p-3">일반과세 전환</td>
                        <td className="p-3">일반과세 규칙</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 신규 개업자는 직전연도 매출이 없으므로 개업 첫해에는 세금계산서 발급 의무가 없습니다. 다음해에 직전연도(개업연도) 실적을 기준으로 판정하니, 첫해 매출이 4,800만원을 넘었다면 이듬해부터 발급을 준비하세요.
                </p>
              </section>

              <AdSlot slot="guide-simplified-taxation-vat-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세 vs 일반과세, 무엇을 고를까</h2>
                <p>
                  선택 기준은 매입세액 규모와 거래처 유형입니다. 최종소비자를 대상으로 매입이 적으면 간이과세가, 시설투자가 크거나 B2B 거래가 많으면 일반과세가 유리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 간이과세와 일반과세 비교 (부가가치세법 §61·§63)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">간이과세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반과세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">세액 계산</td>
                        <td className="p-3">공급대가 × 부가율 × 10%</td>
                        <td className="p-3">매출세액 - 매입세액</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">매입세액 공제</td>
                        <td className="p-3">매입액의 0.5%</td>
                        <td className="p-3">전액 공제</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">환급</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신고 횟수</td>
                        <td className="p-3">연 1회(1월)</td>
                        <td className="p-3">연 2회(1월·7월)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 창업 초기 인테리어·장비 매입세액이 수백만원이면, 간이과세는 그 세액을 환급받지 못합니다. 이럴 때는 간이과세를 포기하고 일반과세로 환급받는 편이 유리할 수 있습니다(부가가치세법 §70). 단, 포기하면 3년간 간이과세로 복귀할 수 없습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">간이과세자가 놓치기 쉬운 함정</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>신고 누락:</strong> 납부세액이 0원이라도 신고 자체는 의무입니다. 무신고 시 가산세가 부과되므로 매년 1월 확정신고를 반드시 하세요(부가가치세법 §67).
                  </li>
                  <li>
                    <strong>실질과세 원칙:</strong> 매출을 인위적으로 쪼개 여러 명의로 분산하면 국세기본법 §14 실질과세 원칙에 따라 실사업자 단위로 합산 과세될 수 있습니다.
                  </li>
                  <li>
                    <strong>업종 판정 오류:</strong> 부가율이 낮은 소매업으로 신고했지만 실제는 서비스업이면 추징될 수 있습니다. 업종코드는 실제 사업 내용대로 등록하세요.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">개인사업자 등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이·일반 선택부터 업종코드까지 개업 절차 정리.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반과세 전환 시 매입세액 환급받는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 경비율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">단순경비율·기준경비율 종합소득세 절세.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">3.3% 원천징수 후 환급·추가납부 예측.</p>
                  </Link>
                  <Link
                    href="/guide/other-income-necessary-expense-60-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기타소득 필요경비 60%</div>
                    <p className="mt-1 text-sm text-text-secondary">강연료·원고료 부수입의 세금 처리.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세·종합소득세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 간이과세 적용 여부, 정확한 부가율, 세금계산서 발급 의무, 납부면제 여부는 사업 형태와 업종에 따라 달라지므로 홈택스 또는 관할 세무서에서 반드시 확인하세요. 본 콘텐츠는 2026-07-13 기준으로 작성되었으며, 부가가치세법 개정 시 업데이트됩니다. 인용 조문: <strong>부가가치세법 §36(세금계산서), §61(간이과세), §63(간이과세 과세표준·세액), §69(납부의무 면제), §70(간이과세 포기), 국세기본법 §14(실질과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="간이과세자 부가가치세 2026 가이드"
                url={URL}
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
