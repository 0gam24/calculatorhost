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

const URL = 'https://calculatorhost.com/guide/domestic-stock-major-shareholder-tax-2026/';
const DATE_PUBLISHED = '2026-07-15';
const DATE_MODIFIED = '2026-07-15';
// 수익 레버 [revenue-lever: indexing+traffic]: 신규 색인 페이지 추가, 롱테일 트래픽 유입

export const metadata: Metadata = {
  title: '국내주식 대주주 양도소득세 2026, 종목당 50억 기준과 세율',
  description:
    '국내 상장주식은 소액주주면 양도세가 없지만, 종목당 50억원 이상 보유한 대주주는 양도차익에 세금을 냅니다. 소득세법 §94와 시행령 §157 기준, 20~25% 세율, 반기별 신고를 사례로 정리합니다.',
  keywords: [
    '국내주식 대주주 양도소득세',
    '대주주 요건 50억',
    '상장주식 양도세',
    '주식 양도소득세 세율',
    '대주주 판정 기준',
    '소득세법 94조',
    '주식 양도세 250만원 공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국내주식 대주주 양도소득세 2026, 종목당 50억 기준과 세율' }],
    title: '국내주식 대주주 양도소득세 2026, 50억 기준과 20~25% 세율',
    description: '소액주주는 비과세, 종목당 50억 이상 대주주는 양도차익 과세. 3억 이하 20%, 초과 25%. 소득세법 §94.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국내주식 대주주 양도소득세 2026',
    description: '종목당 50억 이상 대주주만 국내 상장주식 양도세 과세. 3억 이하 20%, 초과 25%. 소득세법 §94.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국내 상장주식을 팔면 무조건 양도세를 내나요?',
    answer:
      '아니요. 국내 상장주식은 대주주가 아닌 소액주주가 증권시장에서 매도하면 양도소득세가 없습니다. 세금을 내는 사람은 특정 종목을 대량 보유한 대주주로 한정됩니다(소득세법 §94①3호). 대부분의 개인 투자자는 소액주주여서 양도차익에 세금이 붙지 않고, 매도 시 증권거래세만 부담합니다.',
  },
  {
    question: '대주주 기준은 어떻게 되나요?',
    answer:
      '상장주식 대주주는 특정 종목을 종목당 시가총액 50억원 이상 보유하거나, 지분율이 코스피 1%, 코스닥 2%, 코넥스 4% 이상인 경우입니다(소득세법 시행령 §157). 여러 종목에 분산투자해도 50억원 기준은 각 종목별로 따로 판정합니다. 즉 한 종목에 50억원 이상 몰아 보유하지 않으면 시가총액 기준으로는 대주주가 아닙니다.',
  },
  {
    question: '대주주 여부는 언제 판정하나요?',
    answer:
      '대주주 판정은 직전 사업연도 종료일, 통상 매년 12월 말 보유 현황을 기준으로 합니다. 그해 말 기준으로 대주주에 해당하면 다음 해에 그 종목을 팔 때 양도세 납부 대상이 됩니다. 그래서 연말에 보유 규모를 조절해 대주주 판정을 피하려는 매도가 나타나기도 합니다.',
  },
  {
    question: '대주주 양도세 세율은 얼마인가요?',
    answer:
      '대주주의 상장주식 양도차익은 과세표준 3억원 이하는 20%, 3억원 초과분은 25%의 세율이 적용됩니다(소득세법 §104). 여기에 양도소득세의 10%에 해당하는 지방소득세가 별도로 붙습니다. 또한 연간 양도소득 기본공제 250만원을 차감한 뒤 세율을 적용합니다.',
  },
  {
    question: '기본공제 250만원은 어떻게 적용되나요?',
    answer:
      '주식 양도소득에도 연 250만원의 기본공제가 적용됩니다(소득세법 §103). 예를 들어 대주주의 양도차익이 2억원이면 250만원을 뺀 1억 9,750만원이 과세표준이 되고, 여기에 세율을 적용합니다. 기본공제는 1년에 한 번, 양도소득 그룹별로 적용되므로 여러 번 매도해도 연간 250만원까지만 공제됩니다.',
  },
  {
    question: '해외주식이나 비상장주식은 어떻게 다른가요?',
    answer:
      '해외주식은 대주주 여부와 무관하게 양도차익에 과세되며, 연 250만원 공제 후 22%(지방소득세 포함) 세율이 적용됩니다. 비상장주식도 소액주주 여부와 관계없이 양도세 대상입니다. 즉 소액주주 비과세 혜택은 국내 상장주식을 증권시장에서 매도하는 경우에 한정된 것입니다.',
  },
  {
    question: '대주주 양도세는 언제 신고하나요?',
    answer:
      '대주주의 상장주식 양도소득은 양도일이 속하는 반기의 말일부터 2개월 이내에 예정신고·납부해야 합니다. 상반기(1월부터 6월) 양도분은 8월 말까지, 하반기(7월부터 12월) 양도분은 다음 해 2월 말까지가 기한입니다. 이후 다음 해 5월 확정신고로 연간 손익을 정산합니다.',
  },
  {
    question: '금융투자소득세는 어떻게 됐나요?',
    answer:
      '금융투자소득세(금투세)는 시행이 예정됐다가 폐지되어, 2026년 현재 국내 상장주식은 종전과 같이 대주주만 양도세를 내는 체계가 유지됩니다. 소액주주의 국내 상장주식 양도차익은 계속 비과세입니다. 다만 세제는 개정 가능성이 있으므로 매매 전에 최신 기준을 확인하는 것이 좋습니다.',
  },
];

export default function DomesticStockMajorShareholderTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국내주식 대주주 양도소득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국내주식 대주주 양도소득세 2026, 종목당 50억 기준과 세율',
    description:
      '국내 상장주식 대주주의 양도소득세. 소득세법 §94·시행령 §157 대주주 요건(종목당 50억), 20~25% 세율, 기본공제, 반기별 신고를 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국내주식 대주주', '주식 양도소득세', '대주주 요건 50억', '소득세법 94조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국내주식 대주주 양도소득세 2026',
    description:
      '국내 상장주식 대주주의 양도소득세 요건, 세율, 신고 방법을 정리한 가이드.',
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
                    { name: '국내주식 대주주 양도소득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주식 투자자 · 8분 읽기 · 2026-07-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국내주식 대주주 양도소득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">종목당 50억 기준과 20~25% 세율</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  국내 주식으로 큰 수익을 냈을 때 세금이 걱정된다면, 먼저 자신이 대주주인지부터 확인해야 합니다. 국내 상장주식은 소액주주라면 아무리 많이 벌어도 양도세가 없고, 특정 종목을 대량 보유한 대주주만 세금을 냅니다. 이 가이드는 소득세법 §94와 시행령 §157에 따른 대주주 요건, 세율, 신고 방법을 사례로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-domestic-stock-major-shareholder-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국내 상장주식 양도세, 누가 내나요?</h2>
                <p>
                  국내 상장주식의 양도소득세는 대주주만 냅니다. 증권시장에서 주식을 파는 소액주주는 양도차익이 아무리 커도 비과세입니다(소득세법 §94①3호). 세금 부담자는 특정 종목을 대량 보유한 대주주로 좁혀져 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 소액주주(국내 상장, 장내매도): 양도세 비과세
                    <br />
                    · 대주주: 종목당 시가총액 50억원 이상 또는 지분율 기준 초과
                    <br />
                    · 세율: 과세표준 3억원 이하 20%, 초과 25%
                    <br />
                    · 근거: 소득세법 §94, §104, 시행령 §157
                  </p>
                </div>
                <p className="mt-4">
                  즉 일반 개인 투자자 대부분은 소액주주여서 국내 상장주식 매매 차익에 세금이 붙지 않고, 매도 시 증권거래세만 부담합니다.
                </p>
                <p className="mt-4">
                  다만 이 비과세는 국내 상장주식을 증권시장에서 매도할 때에 한합니다. 해외주식, 비상장주식, 장외거래는 소액주주라도 양도세 대상이 되니 구분이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대주주 요건은 정확히 무엇인가요?</h2>
                <p>
                  대주주는 시가총액 기준 또는 지분율 기준 중 하나라도 충족하면 해당합니다. 시장별 기준을 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상장주식 대주주 요건 (소득세법 시행령 §157, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시장</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지분율 기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시가총액 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">코스피</td>
                        <td className="p-3">1% 이상</td>
                        <td className="p-3" rowSpan={3}>종목당 50억원 이상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">코스닥</td>
                        <td className="p-3">2% 이상</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">코넥스</td>
                        <td className="p-3">4% 이상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  시가총액 50억원 기준은 각 종목별로 따로 판정합니다. 여러 종목에 나눠 담아 한 종목이 50억원에 이르지 않으면 시가총액 기준으로는 대주주가 아닙니다.
                </p>
                <p className="mt-4">
                  다만 지분율 판정에서는 본인 외에 특수관계인의 보유분이 합산될 수 있고, 판정 세부 기준은 상황에 따라 달라질 수 있습니다. 보유 규모가 기준에 가깝다면 국세청 또는 증권사·세무 전문가에게 정확한 판정을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금은 얼마나 되나요?</h2>
                <p>
                  대주주로 판정되면 양도차익에서 기본공제 250만원을 뺀 과세표준에 세율을 적용합니다. 세 가지 사례로 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 소액주주, 국내 상장주식 차익 1억원</p>
                  <p className="text-sm text-text-secondary">
                    · 대주주 기준 미달(종목당 50억 미만, 지분율 미달)
                    <br />
                    · 국내 상장주식 장내매도 → 양도세 <strong>0원</strong>
                    <br />
                    · 매도 시 증권거래세만 부담
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 대부분의 개인 투자자가 여기에 해당합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 대주주, 양도차익 2억원</p>
                  <p className="text-sm text-text-secondary">
                    · 과세표준: 2억 빼기 기본공제 250만 = 1억 9,750만원
                    <br />
                    · 산출세액: 1억 9,750만 곱하기 20% = 3,950만원 (3억원 이하 구간)
                    <br />
                    · 지방소득세: 3,950만 곱하기 10% = 395만원
                    <br />
                    · 총 부담: 약 <strong>4,345만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 과세표준 3억원 이하는 20% 단일세율입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 대주주, 양도차익 5억원</p>
                  <p className="text-sm text-text-secondary">
                    · 과세표준: 5억 빼기 250만 = 4억 9,750만원
                    <br />
                    · 3억원 이하분: 3억 곱하기 20% = 6,000만원
                    <br />
                    · 3억원 초과분: 1억 9,750만 곱하기 25% = 4,937.5만원
                    <br />
                    · 산출세액 합계: 약 1억 937.5만원, 지방소득세 10% 별도
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 3억원을 넘는 부분은 25%가 적용됩니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-domestic-stock-major-shareholder-tax-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고와 절세는 어떻게 하나요?</h2>
                <p>
                  대주주 양도세는 신고 기한과 절세 포인트를 함께 챙겨야 가산세와 과세를 줄일 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>예정신고:</strong> 양도일이 속하는 반기 말일부터 2개월 이내에 예정신고·납부(상반기 양도는 8월 말, 하반기 양도는 다음 해 2월 말).
                  </li>
                  <li>
                    <strong>확정신고:</strong> 다음 해 5월에 연간 손익을 합산해 확정신고로 정산.
                  </li>
                  <li>
                    <strong>기본공제 활용:</strong> 연 250만원 공제가 있으므로 이익 실현 시점을 분산하면 공제를 여러 해에 나눠 쓸 수 있습니다.
                  </li>
                  <li>
                    <strong>대주주 회피:</strong> 연말 기준일 전 보유 규모를 조절하면 다음 해 대주주 판정을 피할 수 있으나, 급매에 따른 손실 위험을 함께 고려해야 합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 세제는 개정될 수 있고 대주주 판정은 특수관계인 합산 등 변수가 많습니다. 보유액이 기준에 근접하면 매매 전에 반드시 최신 기준과 개별 판정을 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/overseas-stock-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외주식 양도소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">250만원 공제 후 22% 세율과 신고 방법을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/etf-tax-domestic-overseas-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국내·해외 ETF 세금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">ETF 유형별 배당소득세와 양도세 차이를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배당 15.4%와 금융소득종합과세 기준을 살펴보세요.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2천만원 기준 종합과세 전환을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 절세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">비과세·분리과세 혜택으로 투자 세금을 줄이는 법.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융·투자 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">예적금·복리·환율 계산기.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 투자·세무 조언이 아닙니다. 대주주 판정은 특수관계인 합산 등 변수가 있고 세제는 개정될 수 있으므로, 매매 전 홈택스·증권사·세무 전문가를 통해 최신 기준과 개별 판정을 반드시 확인하세요. 본 콘텐츠는 2026-07-15 기준으로 작성되었으며, 세법 개정 시 업데이트됩니다. 인용 법조항은 <strong>소득세법 §94(양도소득의 범위), §103(양도소득 기본공제), §104(양도소득세의 세율), 시행령 §157(주권상장법인 대주주의 범위)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="국내주식 대주주 양도소득세 2026 가이드"
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
