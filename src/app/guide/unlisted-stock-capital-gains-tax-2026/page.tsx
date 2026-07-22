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

const URL = 'https://calculatorhost.com/guide/unlisted-stock-capital-gains-tax-2026/';
const DATE_PUBLISHED = '2026-07-21';
const DATE_MODIFIED = '2026-07-21';

export const metadata: Metadata = {
  title: '비상장주식 양도소득세 2026, 중소기업 10%·대주주 세율',
  description:
    '비상장주식은 대주주가 아니어도 양도하면 양도소득세 신고 대상입니다. 중소기업 소액주주 10%, 대주주·비중소 20%(과표 3억 초과분 25%) 세율과 대주주 요건(지분 4%·시총 50억)을 소득세법 §94·§104 기준으로 정리했습니다.',
  keywords: [
    '비상장주식 양도소득세',
    '비상장주식 양도세',
    '중소기업 주식 10%',
    '비상장 대주주 요건',
    '비상장주식 양도세 신고',
    '증권거래세 비상장',
    '소득세법 104조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '비상장주식 양도소득세 2026' }],
    title: '비상장주식 양도소득세 2026, 중소기업 10%·대주주 세율',
    description:
      '비상장주식은 소액주주도 양도세 신고 대상. 중소기업 10%, 대주주 20%(과표 3억 초과 25%). 소득세법 §104.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '비상장주식 양도소득세 2026',
    description: '중소기업 소액주주 10%, 대주주·비중소 20%(3억 초과 25%). 대주주 요건 4%·50억. 소득세법 §104.',
  },
};

const FAQ_ITEMS = [
  {
    question: '비상장주식을 팔면 세금을 내야 하나요?',
    answer:
      '네, 비상장주식은 상장주식과 달리 대주주가 아니어도 양도하면 양도소득세 신고·납부 대상입니다(소득세법 §94① 제3호). 스타트업 스톡옵션 행사 주식, 가족회사 지분, 장외 거래 주식 모두 포함됩니다. 소액주주라는 이유로 신고를 빠뜨리면 무신고가산세가 붙으니 주의해야 합니다.',
  },
  {
    question: '비상장주식 양도세율은 몇 %인가요?',
    answer:
      '보유 주체와 회사 규모에 따라 다릅니다(소득세법 §104). 중소기업 주식을 대주주가 아닌 사람이 팔면 10%, 중소기업 외 주식이면 20%입니다. 대주주가 팔면 중소기업 여부와 무관하게 과세표준 3억원 이하 20%, 3억원 초과분 25%가 적용됩니다. 여기에 지방소득세 10%가 별도로 더해집니다.',
  },
  {
    question: '대주주는 어떻게 판정하나요?',
    answer:
      '비상장법인 대주주는 지분율 요건 또는 시가총액 요건 중 하나만 충족해도 해당합니다. 지분율은 발행주식총수의 4% 이상, 시가총액은 보유 주식 평가액 합계 50억원 이상입니다(소득세법 시행령 §157). 본인 지분뿐 아니라 배우자·직계존비속 등 특수관계인의 지분을 합산해 판단하므로 가족 보유분도 함께 확인해야 합니다.',
  },
  {
    question: '1년 미만 보유하면 세율이 더 높나요?',
    answer:
      '중소기업 외 법인의 대주주가 1년 미만 보유한 주식을 양도하면 30%의 세율이 적용됩니다(소득세법 §104①). 단기 보유에 대한 중과입니다. 반면 중소기업 주식이나 대주주가 아닌 경우에는 보유 기간에 따른 30% 중과가 적용되지 않습니다.',
  },
  {
    question: '양도세 신고는 언제 하나요?',
    answer:
      '주식 양도소득은 예정신고 대상으로, 양도일이 속하는 반기(1~6월 또는 7~12월)의 말일부터 2개월 이내에 신고·납부해야 합니다(소득세법 §105). 예를 들어 3월에 양도했다면 8월 말까지 예정신고합니다. 연간 여러 건을 양도해 세율이 달라지면 다음 해 5월 확정신고로 정산합니다.',
  },
  {
    question: '증권거래세도 따로 내나요?',
    answer:
      '네, 양도소득세와 별개로 증권거래세가 부과됩니다. 장외에서 거래되는 비상장주식의 증권거래세율은 양도가액의 0.35% 수준입니다(증권거래세법). 양도소득세는 "이익"에, 증권거래세는 "양도가액 전체"에 매겨지므로 손실이 나도 증권거래세는 납부해야 합니다.',
  },
  {
    question: '양도차손이 나면 세금이 없나요?',
    answer:
      '양도차익이 없으면 양도소득세는 발생하지 않지만, 신고 의무 자체는 남습니다. 또한 같은 해에 다른 주식에서 이익이 있으면 같은 소득 구분 내에서 손익을 통산할 수 있습니다. 다만 증권거래세는 이익·손실과 무관하게 양도가액 기준으로 부과된다는 점을 기억하세요.',
  },
  {
    question: '기본공제는 얼마나 되나요?',
    answer:
      '주식 양도소득에도 연 250만원의 기본공제가 적용됩니다(소득세법 §103). 여러 종목을 양도했다면 합산한 양도소득금액에서 연 250만원을 한 번 공제합니다. 부동산 양도소득과는 소득 구분이 달라 각각 별도로 250만원씩 공제된다는 점도 알아두면 좋습니다.',
  },
];

export default function UnlistedStockCapitalGainsTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '비상장주식 양도소득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '비상장주식 양도소득세 2026, 중소기업 10%·대주주 세율',
    description:
      '비상장주식은 소액주주도 양도세 신고 대상. 중소기업 10%, 대주주·비중소 20%(과표 3억 초과 25%), 대주주 요건(4%·50억), 신고 기한과 증권거래세까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['비상장주식', '양도소득세', '대주주', '중소기업 주식', '소득세법 104조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '비상장주식 양도소득세 2026',
    description: '비상장주식 양도세율(10/20/25/30%), 대주주 요건, 신고 기한, 증권거래세를 정리.',
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
                    { name: '비상장주식 양도소득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">투자자·주주 · 8분 읽기 · 2026-07-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  비상장주식 양도소득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">중소기업 10%부터 대주주 25%까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 스타트업 스톡옵션 주식, 가족회사 지분, 장외 비상장주식을 팔려는 투자자와 주주를 위한 것입니다. 비상장주식은 상장주식과 달리 소액주주도 팔면 양도소득세를 신고해야 합니다. 회사 규모와 대주주 여부에 따라 10%에서 30%까지 갈리는 세율 구조와 실제 계산, 신고 기한을 예시와 함께 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-unlisted-stock-capital-gains-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비상장주식을 팔면 세금을 내나요?</h2>
                <p>
                  네, 냅니다. 상장주식은 대주주가 아니면 장내 양도 시 과세되지 않지만, 비상장주식은 대주주 여부와 상관없이 양도하면 누구나 양도소득세 신고 대상입니다(소득세법 §94① 제3호). 이 점을 몰라 신고를 놓치는 경우가 가장 흔한 실수입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">비상장주식 양도세 핵심 (소득세법 §94·§104)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 과세대상: 비상장주식 양도(소액주주 포함)
                    <br />
                    · 세율: 중소기업 소액주주 10% / 대주주·비중소 20%(과표 3억 초과분 25%) / 비중소 대주주 1년 미만 30%
                    <br />
                    · 기본공제: 연 250만원
                    <br />
                    · 별도 부담: 증권거래세 0.35% + 지방소득세(양도세의 10%)
                  </p>
                </div>
                <p className="mt-4">
                  다만 K-OTC 등 일부 시장을 통한 중소·중견기업 소액주주 거래는 비과세 특례가 적용될 수 있습니다. 거래한 시장과 회사 규모에 따라 과세 여부가 달라지므로, 매도 전에 반드시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비상장주식 양도세율은 어떻게 정해지나요?</h2>
                <p>
                  세율은 대주주 여부, 회사가 중소기업인지, 보유 기간에 따라 결정됩니다. 아래 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 비상장주식 양도소득세율 (소득세법 §104①, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">중소기업, 대주주 아님</td>
                        <td className="p-3"><strong>10%</strong></td>
                        <td className="p-3">가장 낮은 세율</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">중소기업 외, 대주주 아님</td>
                        <td className="p-3"><strong>20%</strong></td>
                        <td className="p-3">일반 세율</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대주주(중소·비중소 공통)</td>
                        <td className="p-3"><strong>20% / 25%</strong></td>
                        <td className="p-3">과표 3억 이하 20%, 초과분 25%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">중소기업 외 대주주, 1년 미만 보유</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">단기 보유 중과</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 위 세율에는 지방소득세가 포함되지 않았습니다. 실제 부담은 양도소득세에 그 10%인 지방소득세를 더한 값입니다. 예를 들어 세율 20%라면 지방소득세 2%를 합쳐 실질 22%가 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비상장주식 양도세 실제 계산 사례</h2>
                <p>
                  소액주주와 대주주의 세액이 어떻게 달라지는지 두 사례로 계산해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 중소기업 소액주주 (세율 10%)</p>
                  <p className="text-sm text-text-secondary">
                    · 취득가액 1억원, 양도가액 3억원 → 양도차익 2억원
                    <br />
                    · 기본공제 250만원 차감 → 과세표준 1억 9,750만원
                    <br />
                    · 양도소득세 = 1억 9,750만 × 10% = 1,975만원
                    <br />
                    · 지방소득세 = 1,975만 × 10% = 197.5만원
                    <br />
                    · 총 세부담 = <strong>약 2,172.5만원</strong>(증권거래세 별도)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 중소기업 소액주주는 10%로 상대적으로 가볍습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 대주주, 과세표준 5억원 (세율 20%/25%)</p>
                  <p className="text-sm text-text-secondary">
                    · 과세표준 5억원(기본공제 반영 후 가정)
                    <br />
                    · 3억원 이하분 = 3억 × 20% = 6,000만원
                    <br />
                    · 3억 초과분 = 2억 × 25% = 5,000만원
                    <br />
                    · 양도소득세 = 6,000만 + 5,000만 = 1억 1,000만원
                    <br />
                    · 지방소득세 = 1억 1,000만 × 10% = 1,100만원
                    <br />
                    · 총 세부담 = <strong>약 1억 2,100만원</strong>(증권거래세 별도)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 대주주는 과표 3억 초과분에 25%가 적용돼 세부담이 크게 늘어납니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-unlisted-stock-capital-gains-tax-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대주주 요건, 어디까지 합산하나요?</h2>
                <p>
                  대주주는 지분율 4% 이상 또는 시가총액 50억원 이상 중 하나만 충족해도 해당하며, 특수관계인 지분을 합산해 판단합니다(소득세법 시행령 §157). 소액주주 세율(10%)을 기대했다가 가족 보유분 때문에 대주주로 분류되는 사례가 적지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 비상장법인 대주주 판정 기준 (소득세법 시행령 §157)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">합산 범위</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">지분율</td>
                        <td className="p-3"><strong>4% 이상</strong></td>
                        <td className="p-3">본인 + 특수관계인</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">시가총액</td>
                        <td className="p-3"><strong>50억원 이상</strong></td>
                        <td className="p-3">본인 + 특수관계인</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 세부 요건과 특수관계인 범위는 개정이 잦고 사안마다 판단이 달라집니다. 지분·시총이 경계선에 가깝다면 매도 전에 세무 전문가에게 대주주 해당 여부를 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">신고 기한과 증권거래세 함께 챙기기</h2>
                <p>
                  비상장주식을 양도하면 양도소득세 예정신고와 증권거래세 신고를 모두 해야 합니다. 예정신고는 양도일이 속한 반기 말일부터 2개월 이내입니다(소득세법 §105).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>양도소득세 예정신고:</strong> 1~6월 양도분은 8월 말까지, 7~12월 양도분은 다음 해 2월 말까지 신고·납부합니다.</li>
                  <li><strong>증권거래세:</strong> 양도가액의 0.35%를 예정신고 기한에 맞춰 납부합니다. 손실이 나도 부과됩니다.</li>
                  <li><strong>확정신고:</strong> 연중 여러 건을 양도해 누진·통산이 필요하면 다음 해 5월에 확정신고로 정산합니다.</li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/domestic-stock-major-shareholder-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국내 상장주식 대주주 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">상장주식 대주주 판정과 양도세 비교.</p>
                  </Link>
                  <Link
                    href="/guide/overseas-stock-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외주식 양도소득세</div>
                    <p className="mt-1 text-sm text-text-secondary">해외주식 22% 세율과 250만원 공제.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세</div>
                    <p className="mt-1 text-sm text-text-secondary">배당소득 15.4%와 금융소득 종합과세.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-preliminary-return-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 예정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">예정신고 기한과 신고 방법 정리.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2,000만원 기준 분리·종합과세 판단.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·증여세·종소세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 대주주 판정, 중소기업 해당 여부, 세율·증권거래세율 적용은 회사·거래 상황과 개정 세법에 따라 달라지므로 세무대리인·관할 세무서 또는 홈택스에서 반드시 확인하세요. 본 콘텐츠는 2026-07-21 기준이며 세법 개정 시 업데이트됩니다. 근거 법조항은 <strong>소득세법 §94(양도소득의 범위)·§103(양도소득 기본공제)·§104(양도소득세 세율)·§105(예정신고)</strong> 및 시행령 §157(대주주 범위), 증권거래세법입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="비상장주식 양도소득세 2026 가이드"
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
