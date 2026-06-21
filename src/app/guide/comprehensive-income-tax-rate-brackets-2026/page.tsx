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

const URL = 'https://calculatorhost.com/guide/comprehensive-income-tax-rate-brackets-2026/';
const DATE_PUBLISHED = '2026-06-21';
const DATE_MODIFIED = '2026-06-21';

export const metadata: Metadata = {
  title: '종합소득세율 2026 누진세 8단계 완벽 가이드 | 과세표준·산출세액 계산 | calculatorhost',
  description:
    '2026년 종합소득세 8단계 누진세율표와 정확한 계산법. 1,400만원부터 10억 초과까지 세율·누진공제·지방소득세. 직장인·프리랜서 필수 가이드. 소득세법 §55 기준.',
  keywords: [
    '종합소득세율',
    '종합소득세',
    '누진세율',
    '과세표준',
    '누진공제',
    '산출세액',
    '2026 소득세',
    '소득세법 55조',
    '프리랜서 종합소득세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종합소득세율 2026 누진세 8단계 가이드 | calculatorhost' }],
    title: '종합소득세율 2026 누진세 8단계 가이드',
    description: '2026년 소득세 누진세율표와 정확한 세액 계산법. 직장인·프리랜서 필수.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '종합소득세 과세표준 1,400만원이 정확히 뭔가요?',
    answer:
      '과세표준은 종합소득금액에서 소득공제를 뺀 금액입니다. 예를 들어 연봉 3,000만원 직장인이면 근로소득공제(약 290만 원)를 차감해서 과세표준이 결정됩니다. 프리랜서는 총수입에서 경비율·필요경비를 차감합니다. 결론: 과세표준 1,400만원 이하면 세율 6% 구간 적용.',
  },
  {
    question: '누진공제는 왜 필요한가요?',
    answer:
      '누진공제가 없으면 세율이 구간마다 급격히 올라가는 "계단식 세금"이 됩니다. 누진공제를 차감하면 모든 소득에 대해 평균 세율이 부드럽게 증가합니다. 예: 과표 5,000만 → 5,000×15% = 750만이 아니라 750만 − 126만 = 624만. 누진공제 덕분에 세금이 가파르게 올라가지 않습니다.',
  },
  {
    question: '과세표준 8,000만원이면 세율이 여러 개 적용되나요?',
    answer:
      '아니요. 과세표준 전체에 해당 구간의 세율을 적용합니다(누진세 구조). 과표 8,000만원이면 5,000만~8,800만 구간에 속하므로 전체 8,000만×24% − 누진공제 576만 = 약 1,344만원. 각 구간별로 쪼개서 계산하지 않습니다.',
  },
  {
    question: '과세표준 1억 5천만원이면 세율이 35% 아닌가요?',
    answer:
      '맞습니다. 과표 1.5억은 8,800만~1.5억 구간의 경계입니다. 정확히는 1.5억이 포함되므로 세율 35% 적용. 계산: 1.5억×35% − 1,544만 = 약 3,706만원. 1.5억을 초과하면 38% 구간입니다.',
  },
  {
    question: '지방소득세는 따로 내야 하나요?',
    answer:
      '네. 종합소득세를 낸 후 지방소득세는 종합소득세의 10%를 추가로 납부합니다. 예: 산출세액 624만원 → 지방소득세 62.4만원. 최종 납부액은 산출세액 + 지방소득세 + 농어촌특별세입니다.',
  },
  {
    question: '자녀공제나 기부금 공제를 받으면 과세표준이 줄어드나요?',
    answer:
      '자녀공제와 기부금은 세액공제로서, 과세표준을 줄이지 않습니다. 대신 산출세액(세율×과표−누진공제)에서 직접 차감됩니다. 예: 산출세액 500만원에서 자녀공제 100만원 → 최종 400만원 납부. 소득공제와 세액공제는 다릅니다.',
  },
  {
    question: '회계연도와 세금신고 시기가 다른가요?',
    answer:
      '네. 회계연도(귀속연도)는 1월~12월이고, 신고 기한은 다음해 5월 31일입니다. 2025년 소득은 2026년 5월 31일까지 신고하면 됩니다. 단, 연말정산(직장인)은 2월중에 자동 징수됩니다.',
  },
];

export default function ComprehensiveIncomeTaxRateBrackets2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종합소득세율 2026 8단계 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합소득세율 2026 누진세 8단계 가이드',
    description:
      '2026년 종합소득세 8단계 누진세율표와 정확한 산출세액 계산법. 1,400만원부터 10억 초과까지 세율·누진공제·지방소득세 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합소득세', '누진세율', '소득세법 55조', '과세표준', '누진공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합소득세율 2026 8단계 누진세 가이드',
    description:
      '종합소득세의 8단계 누진세율표 및 정확한 계산 방법. 직장인과 프리랜서를 위한 필수 가이드.',
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
                    { name: '종합소득세율 2026 가이드' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·프리랜서·자영업자 · 12분 읽기 · 2026-06-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종합소득세율 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 8단계 누진세 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  한국의 종합소득세는 8단계 누진 구조입니다. 같은 수입도 과세표준이 달라지면 세율이 확 달라지고, 누진공제를 빼먹으면
                  세금을 크게 오계산할 수 있습니다. 이 가이드는 1,400만원부터 10억 초과까지 모든 구간의 정확한 세율과 계산법을
                  체계적으로 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-income-tax-rate-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종합소득세 8단계 누진세율표 (2026)</h2>
                <p>
                  소득세법 <strong>§55</strong>에 따른 2026년 종합소득세 누진세율입니다. 과세표준 구간별로 세율과 누진공제가 정해져 있으며,
                  모든 과세표준은 과세표준 × 세율 − 누진공제로 산출세액을 계산합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-sm text-text-secondary mb-2">소득세법 §55 기준 2026년 종합소득세 누진세율</caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-card">
                        <th className="text-left p-3 font-semibold" scope="col">
                          과세표준 구간
                        </th>
                        <th className="text-center p-3 font-semibold" scope="col">
                          세율
                        </th>
                        <th className="text-center p-3 font-semibold" scope="col">
                          누진공제
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1,400만원 이하</td>
                        <td className="text-center p-3">6%</td>
                        <td className="text-center p-3">0원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/30">
                        <td className="p-3">1,400만 초과 ~ 5,000만원</td>
                        <td className="text-center p-3">15%</td>
                        <td className="text-center p-3">126만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5,000만 초과 ~ 8,800만원</td>
                        <td className="text-center p-3">24%</td>
                        <td className="text-center p-3">576만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/30">
                        <td className="p-3">8,800만 초과 ~ 1.5억원</td>
                        <td className="text-center p-3">35%</td>
                        <td className="text-center p-3">1,544만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1.5억 초과 ~ 3억원</td>
                        <td className="text-center p-3">38%</td>
                        <td className="text-center p-3">1,994만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/30">
                        <td className="p-3">3억 초과 ~ 5억원</td>
                        <td className="text-center p-3">40%</td>
                        <td className="text-center p-3">2,594만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5억 초과 ~ 10억원</td>
                        <td className="text-center p-3">42%</td>
                        <td className="text-center p-3">3,594만원</td>
                      </tr>
                      <tr className="bg-bg-card/30">
                        <td className="p-3">10억원 초과</td>
                        <td className="text-center p-3">45%</td>
                        <td className="text-center p-3">6,594만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm">핵심 요점</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary ml-4 list-disc">
                    <li>과세표준 전체에 해당 구간의 세율을 적용합니다 (구간별 쪼개기 아님)</li>
                    <li>누진공제를 반드시 차감해야 정확한 세액을 계산합니다</li>
                    <li>지방소득세는 종합소득세의 10%를 추가로 납부합니다</li>
                    <li>소득세법 §55의 이 세율은 매년 동일하게 적용됩니다</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">종합소득세액 정확한 계산법</h2>
                <p>
                  종합소득세를 계산하는 순서는 다음과 같습니다:
                </p>
                <ol className="ml-6 space-y-3 list-decimal text-text-secondary">
                  <li>
                    <strong>종합소득금액 산정:</strong> 근로소득, 사업소득, 이자소득, 배당소득, 부동산임차소득, 기타소득 등의 합
                  </li>
                  <li>
                    <strong>소득공제:</strong> 기본공제, 배우자공제, 부양가족공제, 경로우대공제, 장애인공제, 주택자금공제 등을 차감
                  </li>
                  <li>
                    <strong>과세표준 결정:</strong> 종합소득금액 − 소득공제 = 과세표준
                  </li>
                  <li>
                    <strong>산출세액 계산:</strong> 과세표준 × 세율 − 누진공제 (소득세법 §55)
                  </li>
                  <li>
                    <strong>세액공제 적용:</strong> 자녀장려금, 기부금 세액공제, 외국납부세액공제 등 차감
                  </li>
                  <li>
                    <strong>결정세액 확정:</strong> 산출세액 − 세액공제 = 최종 납부 세액
                  </li>
                </ol>
                <p className="mt-4">
                  이 과정에서 가장 중요한 것은 <strong>과세표준을 정확히 구하는 것</strong>과 <strong>누진공제를 빼먹지 않는 것</strong>입니다.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">3가지 구체적 계산 사례</h2>
                <p>
                  다음 사례들을 통해 누진세율이 어떻게 적용되는지 확인하세요. 모든 계산은 소득세법 §55 기준입니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary">사례 1: 과세표준 3,000만원 (프리랜서)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    총수입 4,000만 − 경비(필요경비 1,000만) = 사업소득 3,000만 = 과세표준 3,000만
                    <br />
                    <strong>세율: 1,400만~5,000만 구간 → 15% 적용</strong>
                    <br />
                    산출세액 = 3,000만 × 15% − 126만 = <strong>324만원</strong>
                    <br />
                    지방소득세 = 324만 × 10% = 32.4만원
                    <br />
                    <strong>총 납부액 ≈ 356만원</strong>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary">사례 2: 과세표준 6,000만원 (직장인)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    연봉 7,500만 − 근로소득공제(약 900만) − 기본공제(150만) − 배우자공제(150만) = 과세표준 6,000만
                    <br />
                    <strong>세율: 5,000만~8,800만 구간 → 24% 적용</strong>
                    <br />
                    산출세액 = 6,000만 × 24% − 576만 = <strong>864만원</strong>
                    <br />
                    지방소득세 = 864만 × 10% = 86.4만원
                    <br />
                    <strong>총 납부액 ≈ 950만원</strong>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary">사례 3: 과세표준 1.2억원 (고소득자)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    연 사업소득 1.5억 − 필요경비 3,000만 = 사업소득 1.2억 = 과세표준 1.2억
                    <br />
                    <strong>세율: 8,800만~1.5억 구간 → 35% 적용</strong>
                    <br />
                    산출세액 = 1.2억 × 35% − 1,544만 = <strong>2,656만원</strong>
                    <br />
                    지방소득세 = 2,656만 × 10% = 265.6만원
                    <br />
                    <strong>총 납부액 ≈ 2,922만원</strong>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-tertiary">
                  ⚠️ <strong>주의:</strong> 위 사례는 기본공제만 적용한 단순화된 예시입니다. 실제 신고 시 배우자공제, 부양가족공제, 자녀공제,
                  기부금 공제 등이 추가로 적용되므로 세액이 달라질 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-income-tax-rate-mid" format="rectangle" />

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">누진공제가 정말 필요한 이유</h2>
                <p>
                  누진공제가 없다면 세율이 구간마다 급격하게 올라갑니다. 예를 들어 과세표준이 5,000만에서 5,001만으로 1원 증가하면
                  세율이 15%에서 24%로 갑자기 올라가 세금이 크게 증가합니다. 이를 방지하기 위해 누진공제를 도입한 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary text-sm">누진공제 없을 때 vs 있을 때</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    과표 5,000만원:
                    <br />
                    - 누진공제 없음: 5,000만 × 15% = <strong>750만</strong>
                    <br />
                    - 누진공제 적용: 5,000만 × 15% − 126만 = <strong>624만</strong>
                    <br />
                    <br />
                    과표 5,001만원:
                    <br />
                    - 누진공제 없음: 5,001만 × 24% = <strong>1,200만</strong> (급격한 증가!)
                    <br />
                    - 누진공제 적용: 5,001만 × 24% − 576만 = <strong>624만 원대</strong> (부드러운 증가)
                  </p>
                </div>
                <p className="mt-4">
                  소득세법 §55의 누진공제는 이 급격한 단계를 완화하여, 소득이 1원 증가할 때 세금이 부드럽게 증가하도록 설계되었습니다.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">지방소득세와 농어촌특별세</h2>
                <p>
                  종합소득세만으로 끝나지 않습니다. 다음을 추가로 납부해야 합니다:
                </p>
                <ul className="ml-6 space-y-3 list-disc text-text-secondary">
                  <li>
                    <strong>지방소득세:</strong> 종합소득세의 10%. 예: 종소세 600만원이면 지방소득세 60만원 추가 납부
                  </li>
                  <li>
                    <strong>농어촌특별세:</strong> 종합소득세가 1,000만원 이상일 때만 적용. 초과분의 20% (지표: 매년 다름, 2026년에는
                    검토 필요)
                  </li>
                </ul>
                <p className="mt-4">
                  따라서 총 납부액 = 종합소득세 산출세액 + 지방소득세 + 농어촌특별세입니다.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">세액공제와 소득공제의 차이</h2>
                <p>
                  세금을 줄이는 방법은 <strong>소득공제</strong>와 <strong>세액공제</strong> 두 가지입니다. 둘의 효과가 다르므로 정확히
                  이해해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border-base bg-bg-card">
                        <th className="text-left p-3 font-semibold" scope="col">
                          구분
                        </th>
                        <th className="text-left p-3 font-semibold" scope="col">
                          소득공제
                        </th>
                        <th className="text-left p-3 font-semibold" scope="col">
                          세액공제
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">효과 대상</td>
                        <td className="p-3">과세표준을 줄임</td>
                        <td className="p-3">산출세액을 직접 줄임</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/30">
                        <td className="p-3 font-semibold">공제액 기준</td>
                        <td className="p-3">공제 대상 금액</td>
                        <td className="p-3">공제율 또는 정액 (일정 비율 또는 금액)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">예시</td>
                        <td className="p-3">기본공제 150만, 배우자공제 150만</td>
                        <td className="p-3">자녀장려금, 근로소득세액공제</td>
                      </tr>
                      <tr className="bg-bg-card/30">
                        <td className="p-3 font-semibold">효율</td>
                        <td className="p-3">고소득일수록 효율 높음 (세율이 높으므로)</td>
                        <td className="p-3">모든 소득자에게 동일한 효율</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예: 연봉 5,000만 기본공제 150만 차감 vs 자녀장려금 100만 차감. 기본공제는 과표를 150만 줄이므로 약 22.5만원 절세(150만×15%), 자녀장려금은 100만 직접 차감하므로 100만원 절세. 세액공제가 더 효율적입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">연봉 vs 프리랜서 세계산 차이</h2>
                <p>
                  같은 연 수입이라도 직장인(근로소득)과 프리랜서(사업소득)는 공제액이 다릅니다.
                </p>
                <ul className="ml-6 space-y-3 list-disc text-text-secondary">
                  <li>
                    <strong>직장인:</strong> 근로소득공제 (약 3~10%) 자동 적용. 추가로 연말정산 시 특별소득공제(기부금, 교육비 등) 적용 가능
                  </li>
                  <li>
                    <strong>프리랜서:</strong> 경비율(기준 20%) 또는 필요경비 선택. 필요경비를 증명할 수 있으면 기준율보다 유리할 수 있음
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 주의: 프리랜서가 필요경비를 과다 계상하면 세무조사 대상이 될 수 있습니다. 영수증·거래명세서 등 증빙 자료를 철저히
                  관리하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세와 4대보험을 함께 계산하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">프리랜서 수입에 따른 종소세를 계산합니다.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 종류별 절세 효과를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/n-jobber-comprehensive-income-tax-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">N잡러 종합소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">여러 소득원이 있을 때의 합산 신고 가이드.</p>
                  </Link>
                  <Link
                    href="/calculator/severance"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직소득세를 별도로 계산하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금 계산기 전체</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 취득세 등 모든 계산기를 확인하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인별 맞춤형 세무 조언이 아닙니다. 실제 종합소득세
                  신고는 세무사·회계사와 상담 후 진행하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었으며, 세율 변경 시 즉시
                  업데이트됩니다. 자세한 법조항은 소득세법 §55(종합소득세 세율) 및{' '}
                  <a href="https://nts.go.kr" rel="nofollow" className="text-primary-500 hover:underline">
                    국세청 공식 사이트
                  </a>
                  를 참고하세요. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="종합소득세율 2026 8단계 누진세 가이드"
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
