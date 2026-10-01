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

const URL = 'https://calculatorhost.com/guide/inflation-money-value-2026/';
const DATE_PUBLISHED = '2026-06-16';
const DATE_MODIFIED = '2026-10-01';
// [revenue-lever: traffic] 검색 방문자가 미래 비용·구매력·별도 CPI 조회의 차이를 이해하도록 안내합니다.
const TITLE = '화폐가치 계산 2026 | 미래 필요 금액·구매력·CPI 환산';
const DESCRIPTION =
  '물가상승률을 가정한 미래 필요 금액과 구매력 계산, 과거 비용의 CPI 환산을 구분합니다. 계산기는 실제 CPI를 자동 조회하지 않으며 입력한 연간 비율을 일정하게 적용합니다. 과거 물가 비교는 KOSIS에서 같은 기준의 지수를 별도로 확인하세요.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    '화폐가치 계산',
    '인플레이션 계산',
    '물가상승률 계산',
    '미래가치 계산',
    '현재가치 계산',
    '10년 전 100만원',
    '물가상승 환산',
    '복리 계산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '화폐가치 인플레이션 계산 2026' }],
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQ_ITEMS = [
  {
    question: '화폐가치는 어떻게 계산하나요?',
    answer:
      '같은 물건의 미래 필요 금액은 현재 비용 × (1 + 연간 물가상승률/100)^연수이고, 같은 잔액의 미래 구매력은 잔액을 그 물가계수로 나눈 오늘 기준 금액입니다. 과거 비용을 다른 시점의 동등한 비용으로 환산하려면 별도로 조회한 같은 계열의 CPI 비율을 곱합니다. 본 계산기는 입력한 비율의 가정 계산만 제공합니다.',
  },
  {
    question: '10년 전 100만원은 지금 얼마나 되나요?',
    answer:
      '해당 기간의 CPI를 확인하기 전에는 금액을 확정할 수 없습니다. 같은 지수 계열과 기준연도의 과거·현재 CPI를 비교해 100만 원 × (현재 CPI/과거 CPI)로 동등한 비용을 구합니다. 월별 지수와 연간 평균을 섞지 마세요. 이 계산기는 과거 CPI를 자동 조회하거나 날짜별 환산을 제공하지 않습니다.',
  },
  {
    question: '물가상승률 3%는 어떻게 나온 숫자인가요?',
    answer:
      '이 가이드의 연 3%는 계산 방법을 보여주기 위한 가정이며, 통계나 전망·추천값이 아닙니다. 한국은행의 2019년 이후 물가안정목표 2%도 정책 목표로서 미래 물가를 보장하지 않습니다. 같은 기간에 여러 비율을 입력해 결과가 얼마나 달라지는지 비교하세요.',
  },
  {
    question: '복리 계산과 단리 계산의 차이는 뭔가요?',
    answer:
      '연간 물가가 일정 비율로 오른다는 가정에서는 전년도 가격에 다시 상승률을 곱합니다. 100만 원·연 3%·10년이면 같은 물건의 미래 비용은 약 134.39만 원입니다. 초기 비용에만 상승분을 더하는 비교식은 130만 원이지만 이 가정의 누적 물가를 나타내지 않습니다. 예금·적금 이자 방식은 상품 조건에 따라 다릅니다.',
  },
  {
    question: '품목별로 물가상승률이 다르다고 하던데?',
    answer:
      '소비자물가지수(CPI)는 여러 품목의 가격 변화를 종합한 지표입니다. 품목별 변화와 자신의 지출 비중이 다르면 체감 물가도 다릅니다. 특정 품목이 늘 더 많이 오른다고 가정하지 말고 KOSIS에서 같은 기간의 품목별 지수를 확인하세요. 이 계산기는 개인 지출별 가중치를 자동 계산하지 않습니다.',
  },
  {
    question: '온라인 화폐가치 계산기는 정확한가요?',
    answer:
      '계산 결과는 입력한 연간 상승률이 매년 일정하다는 가정에 따른 참고값입니다. calculatorhost의 계산기는 실제 CPI를 자동 조회하지 않으며 이자·투자 수익·세금도 계산하지 않습니다. 실제 과거 물가 비교는 KOSIS에서 같은 기준의 지수를 별도로 조회하고 기간·품목을 확인해야 합니다.',
  },
];

export default function InflationMoneyValuePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '화폐가치 인플레이션 계산 2026' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: TITLE,
    description: DESCRIPTION,
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '화폐가치 계산',
      '인플레이션 계산',
      '물가상승률',
      '복리 계산',
      '미래가치',
    ],
  });

  const webPageLd = buildWebPageJsonLd({
    name: TITLE,
    description: DESCRIPTION,
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
          <main id="main-content" className="min-w-0 flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '화폐가치 인플레이션 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융·투자 · 작성 2026-06-16 · 수정 2026-10-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  화폐가치 계산 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 미래 필요 금액·구매력·CPI 환산</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  같은 물건을 미래에 사는 데 필요한 돈과 같은 잔액으로 살 수 있는 양은 다릅니다. 연 3%·10년을 가정하면 현재 100만 원인 물건의 미래 비용은 약 134만 원이고, 그대로 보유한 100만 원의 구매력은 오늘 기준 약 74만 원입니다. 입력한 비율의 가정 계산과 공식 CPI를 별도로 조회하는 과거 물가 환산을 구분해 안내합니다.
                </p>
                <Link
                  href="/calculator/inflation/"
                  className="mt-4 block min-h-12 rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                >
                  <span className="font-semibold text-primary-500">물가상승률 계산기에서 가정 비교하기</span>
                  <span className="mt-1 block text-sm text-text-secondary">
                    금액(원)·기간(년)·예상 연간 상승률(%)로 미래 필요 금액과 구매력을 계산합니다.
                    CPI 자동 조회 없이 입력한 비율을 매년 일정하게 적용합니다.
                  </span>
                </Link>
              </header>

              {/* Structured Summary */}
              <div className="space-y-4 rounded-lg border border-border-base bg-bg-card p-4">
                <div>
                  <h3 className="font-bold text-text-primary">정의</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    화폐가치란 일정한 금액(예: 100만원)으로 구매할 수 있는 실제 상품·서비스의 양을 의미합니다. 물가가 올라갈수록 같은 금액의 구매력이 떨어지므로, 시간 경과에 따른 화폐가치 변화를 계산하는 것이 중요합니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">핵심 수치</h3>
                  <div className="overflow-x-auto">
<table className="w-full text-sm">
                    <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">
                      같은 물건의 미래 필요 금액 (현재 비용 100만 원, 매년 2%·3%·4%의 사용자 가정)
                    </caption>
                    <thead>
                      <tr className="bg-bg-base">
                        <th scope="col" className="py-2 text-left text-text-secondary">기간</th>
                        <th scope="col" className="py-2 text-left text-text-secondary">연 2% 물가</th>
                        <th scope="col" className="py-2 text-left text-text-secondary">연 3% 물가</th>
                        <th scope="col" className="py-2 text-left text-text-secondary">연 4% 물가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border-base">
                        <td className="py-2 font-semibold text-text-primary">5년 후</td>
                        <td className="py-2 text-text-secondary">110.4만원</td>
                        <td className="py-2 text-text-secondary">115.9만원</td>
                        <td className="py-2 text-text-secondary">121.7만원</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 font-semibold text-text-primary">10년 후</td>
                        <td className="py-2 text-text-secondary">121.9만원</td>
                        <td className="py-2 text-text-secondary">134.4만원</td>
                        <td className="py-2 text-text-secondary">148.0만원</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 font-semibold text-text-primary">20년 후</td>
                        <td className="py-2 text-text-secondary">148.6만원</td>
                        <td className="py-2 text-text-secondary">180.6만원</td>
                        <td className="py-2 text-text-secondary">219.1만원</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">TL;DR</h3>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                    <li>• 미래 필요 금액 = 현재 비용 × 물가계수, 같은 잔액의 구매력 = 잔액 ÷ 물가계수</li>
                    <li>• 과거 비용의 동등한 현재 비용 = 과거 비용 × (현재 CPI / 과거 CPI), 지수는 별도 조회</li>
                    <li>• 10년간 연 3% 물가 가정 시: 현재 100만원 → 약 134만원 필요</li>
                    <li>• 통계청 소비자물가지수(kosis.kr)로 실제 물가상승률 확인 가능</li>
                  </ul>
                </div>
              </div>

              {/* Section 1: 화폐가치 계산 기본 개념 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  화폐가치는 왜 떨어지나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  물가가 올라가면 같은 금액으로 살 수 있는 물건이 줄어듭니다. 이를 <strong>화폐의 실질 구매력 감소</strong>라고 합니다. 예를 들어 오늘 100만원으로 노트북을 살 수 있다면, 10년 뒤에 같은 노트북이 120만원이 되어 있을 수 있다는 뜻입니다.
                </p>

                <p className="text-text-secondary">
                  한국은행의 <a className="underline" href="https://www.bok.or.kr/portal/main/contents.do?menuNo=200291" rel="nofollow">물가안정목표</a>는 2019년 이후 소비자물가 상승률 기준 2%입니다. 이는 정책 목표이며 미래 전망이나 개인 생활비 상승률을 뜻하지 않습니다.
                </p>

                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">누적 물가 가정으로 같은 물건의 미래 비용 계산</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                      미래 필요 금액 = 현재 비용 × (1 + 연간 상승률/100)^연수
                    </code>
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    예: 현재 100만원, 연 3% 물가상승, 10년 후<br />
                    미래 필요 금액 = 100 × (1.03)^10 = 100 × 1.3439 = <strong>134.39만원</strong>
                  </p>
                </div>

                <p className="text-text-secondary">
                  즉, 물가상승이 연 3%라면, 10년 뒤에 오늘과 같은 생활 수준을 유지하려면 현재보다 34.4% 더 많은 돈이 필요하다는 의미입니다.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    물가상승률은 <strong>실제 경제 상황에 따라 매년 달라집니다</strong>. 이 가이드의 연 2%·3%·4%는 계산 비교를 위한 가정입니다. 과거 통계나 정책 목표를 미래 예측으로 해석하지 말고, 개인 지출 품목의 변화도 별도로 확인하세요.
                  </p>
                </div>
              </section>

              {/* Section 2: 미래 화폐가치 계산 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  미래 필요 금액과 보유한 돈의 구매력은 어떻게 다를까?
                </h2>
                <p data-speakable className="text-text-secondary">
                  미래에 같은 생활비가 얼마 필요한지 보려면 현재 비용에 물가계수를 곱합니다. 반대로 <strong>같은 잔액을 그대로 보유했을 때의 구매력</strong>은 잔액을 물가계수로 나눕니다. 필요한 저축 원금은 이자·투자 수익·지출 기간을 별도로 반영해야 합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">예시 1: 은퇴 자금 계획</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <strong>현재 기준:</strong> 월 300만원 생활비가 필요하다고 가정.<br />
                      <strong>연 3%를 가정한 20년 후 월 생활비:</strong> 300만 × (1.03)^20 ≈ <strong>약 542만 원</strong><br />
                      같은 생활 수준의 비용이 매년 3% 오른다는 가정입니다. 보유한 자산이 자동으로 늘거나 필요한 저축 원금이 이 금액이라는 뜻은 아닙니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">예시 2: 투자 수익 분석</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <strong>현재 투자액:</strong> 1,000만원<br />
                      <strong>연 5% 복리 수익을 가정한 별도 예시, 10년 후:</strong> 1,000 × (1.05)^10 = 1,629만원<br />
                      <strong>물가상승(연 3%)을 고려한 오늘 기준 구매력:</strong> 1,629 ÷ (1.03)^10 ≈ 1,212만원<br />
                      <strong>10년 누적 실질 수익률 참고:</strong> (1,212 - 1,000) / 1,000 ≈ 21.2%<br />
                      수익률과 물가를 모두 일정하게 가정하고 세금·수수료를 제외하며 추가 입출금이 없는 설명용 예시입니다. 표시 금액은 반올림했으며 계산에는 반올림 전 값을 사용합니다. 물가 계산기는 투자 수익이나 이자를 자동 계산하지 않습니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    이 계산은 <strong>일정한 물가상승률을 가정한 추정치</strong>입니다. 실제로는 경기 순환, 정책 변화, 국제 유가 등에 따라 물가상승률이 크게 달라질 수 있습니다. 입력한 비율을 달리해 결과를 비교할 수 있지만, 그 비율이 미래 물가의 상한·하한이나 안전한 범위를 뜻하지는 않습니다.
                  </p>
                </div>
              </section>

              {/* Section 3: 과거 돈의 현재가치 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  10년 전 100만원은 지금 얼마나 되나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  과거에 같은 물건을 사는 데 든 비용을 현재의 동등한 비용으로 환산하려면 <strong>소비자물가지수(CPI)</strong>의 비율을 사용합니다. 이 계산은 같은 지수 계열과 기준연도의 두 시점 값을 별도로 조회해야 하며, 개인의 실제 지출 가격을 확정하지 않습니다.
                </p>

                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">같은 계열 CPI로 동등한 비용 환산</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                      동등한 현재 비용 = 과거 비용 × (현재 CPI / 과거 CPI)
                    </code>
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    <strong>날짜 없는 가상 지수 예시(공식 통계값 아님):</strong><br />
                    같은 계열의 과거 CPI를 100, 비교 시점 CPI를 120으로 가정하면<br />
                    과거 비용 100만 원 × (120 / 100) = <strong>동등한 비용 120만 원</strong>
                  </p>
                </div>

                <p className="text-text-secondary">
                  위 예시는 가정한 지수에서 동일한 비용 수준이 20% 높아졌다는 뜻입니다. 실제 10년 전 100만 원의 동등한 현재 비용은 해당 기간의 공식 지수를 조회하기 전에는 확정할 수 없습니다. 그대로 보유한 잔액의 구매력을 구하는 나눗셈과도 구분해야 합니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h4 className="font-semibold text-text-primary">통계청 CPI 데이터 활용법</h4>
                  <p className="mt-2 text-sm text-text-secondary">
                    <Link
                      href="https://kosis.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 underline"
                    >
                      통계청 KOSIS (kosis.kr)
                    </Link>
                    에서 소비자물가지수를 검색해 직접 조회하세요. 같은 지수 계열·기준연도를 선택하고 비교할 두 시점의 간격을 확인해야 합니다. 월별 지수끼리 또는 연간 평균끼리 비교하며, 월별 값과 연간 평균을 섞지 마세요. 본 사이트 물가 계산기는 날짜별 CPI 조회·환산 기능을 제공하지 않습니다.
                  </p>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    CPI는 여러 소비 품목의 가격 변화를 종합한 지표이므로, 지역·소비 패턴에 따라 개인이 체감하는 변화와 다를 수 있습니다. 특정 품목이 항상 더 빨리 오른다고 가정하지 말고, 같은 기간의 품목별 지수를 확인하세요.
                  </p>
                </div>
              </section>

              {/* Section 4: 복리 vs 단리 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  물가상승 계산은 왜 복리일까요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  연간 물가가 같은 비율로 오른다고 가정하면 <strong>전년도 가격에 다시 상승률을 적용</strong>합니다. 이 누적 구조가 복리 계산과 같습니다. 실제 과거 물가 환산은 일정 비율 대신 조회한 CPI의 비율을 사용합니다.
                </p>

                <div className="overflow-x-auto">
<table className="w-full border-collapse border border-border-base text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">
                    같은 물건의 미래 비용 비교 (현재 100만 원, 연 3% 일정 상승을 사용자 가정)
                  </caption>
                  <thead>
                    <tr className="bg-bg-card">
                      <th scope="col" className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">연도</th>
                      <th scope="col" className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">단리 방식</th>
                      <th scope="col" className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">복리 방식</th>
                      <th scope="col" className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">차이</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">1년</td>
                      <td className="border border-border-base px-3 py-2">103만</td>
                      <td className="border border-border-base px-3 py-2">103만</td>
                      <td className="border border-border-base px-3 py-2">0</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">5년</td>
                      <td className="border border-border-base px-3 py-2">115만</td>
                      <td className="border border-border-base px-3 py-2">115.9만</td>
                      <td className="border border-border-base px-3 py-2">0.9만</td>
                    </tr>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">10년</td>
                      <td className="border border-border-base px-3 py-2">130만</td>
                      <td className="border border-border-base px-3 py-2">134.4만</td>
                      <td className="border border-border-base px-3 py-2">4.4만</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">20년</td>
                      <td className="border border-border-base px-3 py-2">160만</td>
                      <td className="border border-border-base px-3 py-2">180.6만</td>
                      <td className="border border-border-base px-3 py-2">20.6만</td>
                    </tr>
                  </tbody>
                </table>
                  </div>

                <p className="text-text-secondary">
                  5년 정도는 차이가 작지만, 20년 이상 장기 계획에서는 복리로 계산한 값이 훨씬 커집니다. 은퇴 자금 계획이나 장기 수익 분석 시 단리로 계산하면 필요 자금을 과소 추정하게 되어 위험합니다.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    물가의 누적 계산과 금융 상품의 이자 계산은 구분해야 합니다. 예금·적금의 단리·복리 적용, 납입 시점, 세금·수수료는 상품 조건에 따라 다릅니다. 물가 계산기는 이 조건이나 투자 수익을 자동 반영하지 않습니다.
                  </p>
                </div>
              </section>

              {/* Section 5: 품목별 물가상승률 차이 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  모든 물가가 똑같이 올라가나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  아닙니다. 통계청 소비자물가지수(CPI)는 평균값일 뿐, <strong>실제로는 품목별로 상승률이 크게 다릅니다</strong>. 자신의 주요 지출 항목이 어느 카테고리인지에 따라 실제 체감 물가상승률이 달라집니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h4 className="font-semibold text-text-primary">품목별 비교 전에 확인할 것</h4>
                  <p className="mt-3 text-sm text-text-secondary">
                    지출 비중이 큰 품목의 CPI를 KOSIS에서 조회하고, 같은 기간·지수 기준으로 비교하세요.
                    이 가이드는 특정 품목의 상승률이나 앞으로의 순위를 제시하지 않습니다.
                  </p>
                </div>

                <p className="text-text-secondary">
                  같은 종합 CPI라도 가구별 지출 품목과 비중이 다르면 체감 변화가 달라질 수 있습니다. 소비량이나 품질 변화로 지출이 늘어난 경우도 있으므로, 지출 총액의 증가를 모두 가격 상승으로 해석하지 마세요.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    자신의 생활비 변화를 살펴보려면 주요 지출 품목과 비중을 확인하고, 같은 기간의 품목별 CPI와 비교할 수 있습니다. 소비량이나 품질 변화도 지출에 영향을 주므로, 개인 물가상승률이 자동으로 정확하게 산출되는 방법은 아닙니다.
                  </p>
                </div>
              </section>

              {/* FAQ Section (중간 배치) */}
              <FaqSection items={FAQ_ITEMS} />

              {/* Related Guides */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">관련 가이드 & 계산기</h2>
                <div className="grid gap-3 sm:grid-cols-2">


                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">은퇴자금 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      물가상승을 반영한 은퇴 필요 자금 추정
                    </p>
                  </Link>

                  <Link
                    href="/calculator/savings/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">적금 이자 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      납입 조건에 따른 세후 이자·만기 금액 확인
                    </p>
                  </Link>

                  <Link
                    href="/calculator/deposit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">정기예금 이자 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      예치 조건에 따른 세후 이자·만기 금액
                    </p>
                  </Link>

                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">대출이자 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      원리금균등 상환액 계산
                    </p>
                  </Link>

                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">금융 카테고리</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      대출·예금·적금·환율 계산기 살펴보기
                    </p>
                  </Link>
                </div>
              </section>

              {/* 가정과 제공 범위 */}
              <footer className="border-t border-border-base pt-8 text-xs text-text-tertiary">
                <p className="mb-3">
                  작성일: <strong>2026년 6월 16일</strong> · 수정일: <strong>2026년 10월 1일</strong>. 입력 비율의 가정 계산과 별도 CPI 조회를 구분해 안내했습니다. 이 가이드는 2026년 실제 물가 통계나 미래 전망을 제공하지 않습니다.
                </p>
                <p className="mb-3">
                  본 가이드의 계산은 <strong>일정한 물가상승률을 가정한 추정값</strong>입니다. 과거 공식 지수는 <Link href="https://kosis.kr" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">
                    통계청 KOSIS
                  </Link>
                  에서 직접 조회하세요. CPI만으로 개인의 지출별 물가상승률이 자동 산출되지는 않습니다.
                </p>
                <p>
                  © 2026 <Link href="/" className="text-primary-500 underline">
                    calculatorhost.com
                  </Link>
                  . 모든 권리 보유.
                </p>
              </footer>

              <ShareButtons
                title="화폐가치 계산 2026"
                url={URL}
                description="10년 후 100만원 필요액, 물가상승률 계산법"
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
