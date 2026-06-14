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

const URL = 'https://calculatorhost.com/guide/retirement-income-tax-2026/';
const DATE_PUBLISHED = '2026-06-15';
const DATE_MODIFIED = '2026-06-15';

export const metadata: Metadata = {
  title: '퇴직소득세 계산 2026 | 연분연승법·근속연수공제 | calculatorhost',
  description:
    '2026년 퇴직소득세는 연분연승법으로 계산해 근속연수가 길수록 부담이 줄어듭니다. 근속연수공제, 환산급여공제, 기본세율 적용과 실제 시뮬레이션까지 소득세법 기준으로 정리했습니다.',
  keywords: [
    '퇴직소득세 계산',
    '퇴직금 세금',
    '퇴직소득세 2026',
    '연분연승법',
    '근속연수공제',
    '소득세법 48조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '퇴직소득세 2026 계산법' }],
    title: '퇴직소득세 계산 2026 | 연분연승법·근속연수공제',
    description: '근속연수가 길수록 세 부담이 줄어드는 연분연승법 완전 해석',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '근속 10년 퇴직금 5,000만 원이면 세금은 얼마?',
    answer:
      '근속 10년 퇴직금 5,000만 원 기준: 근속연수공제 500만 원, 환산급여 5,400만 원, 환산급여공제 약 3,552만 원, 과세표준 약 1,848만 원, 기본세율 6% 적용 후 연분연승법으로 월 환산 × 10년 = 약 95만 원의 퇴직소득세 발생. 지방소득세 10% 추가되어 세금은 약 104만 원.',
  },
  {
    question: '연분연승법이란 무엇인가요?',
    answer:
      '퇴직금에 대해 1년 소득으로 환산한 후 기본세율을 적용해 월 환산 세액을 구하고, 실제 근속연수를 곱해 최종 세액을 계산하는 방식입니다(소득세법 §55②). 근속연수가 길수록 월 환산 단계에서 세액이 줄어들어 전체 세부담이 감소합니다.',
  },
  {
    question: '근속 20년 이상일 때 근속연수공제는 더 많이 받나요?',
    answer:
      '네. 근속 5년 이하는 연 100만 원씩, 5~10년은 연 200만 원씩, 10~20년은 연 250만 원씩, 20년 초과는 연 300만 원씩 누적됩니다. 근속 20년이면 기본 4,000만 원 + (20-20) × 300만 = 4,000만 원의 근속연수공제를 받습니다.',
  },
  {
    question: '환산급여공제 8,000만 원과 3억 원일 때 차이가 나나요?',
    answer:
      '환산급여 8,000만 원이면 800만 원 공제, 3억 원이면 약 6,170만 원 공제로 차이가 약 5,370만 원입니다(소득세법 §48 공제 구간별). 환산급여가 높을수록 공제 비율이 낮아져 세부담이 증가합니다.',
  },
  {
    question: '퇴직금과 퇴직연금 세금 차이가 있나요?',
    answer:
      '법정 퇴직금과 DC형(확정기여)·DB형(확정급여) 퇴직연금 모두 동일한 연분연승법으로 퇴직소득세 계산. 다만 DC·DB는 입사 시기와 회사 선택에 따라 적립금 규모가 다르므로 세액도 달라집니다. 55세 이후 연금으로 선택하면 연금소득세(3.3~5.5%)가 적용되어 일시금보다 유리할 수 있습니다.',
  },
  {
    question: '퇴직 후 1년 이내에 세금을 내나요?',
    answer:
      '퇴직금은 퇴사 당해 연도에 세금이 결정되어, 회사가 퇴직금 지급 시 원천징수(소득세법 §146)합니다. 일반적으로 퇴직금 지급 시점에 세금이 공제되므로 별도 신고 불필요(원천징수로 과세 완료).',
  },
];

export default function RetirementIncomeTaxPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '퇴직소득세 계산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '퇴직소득세 계산 2026 — 연분연승법·근속연수공제',
    description:
      '2026년 퇴직소득세 계산 완전 가이드. 근속연수공제, 환산급여공제, 기본세율 적용부터 실전 시뮬레이션까지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['퇴직소득세', '연분연승법', '근속연수공제', '소득세법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '퇴직소득세 계산 2026',
    description: '연분연승법 단계별 계산과 공제 구간 정리',
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
                    { name: '퇴직소득세 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 8분 읽기 · 2026-06-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026 퇴직소득세 계산법
                  <br />
                  <span className="text-2xl text-text-secondary">— 연분연승법·근속연수공제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  퇴직소득세는 근속연수가 길수록 세 부담이 줄도록 설계된 제도입니다. 퇴직소득금액에서 근속연수공제와 환산급여공제를 차감한 과세표준에 기본세율을 적용하고, 연분연승법으로 월 환산해 최종 세액을 계산합니다(소득세법 §48·§55).
                </p>
              </header>

              <AdSlot slot="guide-retirement-tax-top" format="horizontal" />

              <section className="space-y-6">
                <div className="rounded-lg bg-bg-card p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">핵심 정의</h3>
                  <p className="text-sm text-text-secondary mb-3">
                    퇴직소득세는 직원이 퇴직할 때 받는 퇴직금에 대해 부과되는 세금으로, 근속연수가 길수록 세액이 감소하는 근속연수공제와 월 소득으로 환산한 후 적용되는 환산급여공제를 통해 세 부담을 경감합니다.
                  </p>
                  <table className="w-full text-sm">
                    <caption className="text-xs text-text-secondary mb-2">퇴직소득세 계산 주요 수치 (2026년 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left py-2 px-2">항목</th>
                        <th scope="col" className="text-right py-2 px-2">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">기본세율</td>
                        <td className="text-right py-2 px-2">소득세법 §55 (6~45% 누진)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">근속 5년 이하 공제</td>
                        <td className="text-right py-2 px-2">연 100만 원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">근속 5~10년 공제</td>
                        <td className="text-right py-2 px-2">500만 + (연수-5) × 200만</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">지방소득세</td>
                        <td className="text-right py-2 px-2">퇴직소득세의 10%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  퇴직금에 세금은 얼마나 붙을까?
                </h2>
                <p className="text-text-secondary" data-speakable>
                  퇴직금 전액이 세금 대상은 아닙니다. 먼저 근속연수공제와 환산급여공제라는 두 가지 공제를 받은 후 과세표준이 결정되므로, 같은 규모의 퇴직금이라도 근속연수에 따라 세액이 크게 달라집니다(소득세법 §48).
                </p>
                <p className="text-text-secondary">
                  예를 들어 퇴직금 5,000만 원을 받을 때 근속 5년이면 총 세금이 약 350만 원 수준이지만, 근속 20년이면 약 95만 원으로 줄어듭니다. 이는 연분연승법 때문에 근속연수가 길수록 월 환산 세액이 낮아지기 때문입니다.
                </p>
                <div className="bg-bg-card rounded p-3 text-sm text-text-secondary border-l-2 border-primary-500">
                  <strong>⚠️ 다만:</strong> 임금피크제를 적용하거나 퇴직 당해 연도에 다른 소득(양도세·사업소득 등)이 있으면 분리과세(퇴직소득) 또는 종합과세(다른 소득) 선택 시 세액이 달라질 수 있습니다. 개별 상황 검토 필수.
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  연분연승법이란 무엇인가?
                </h2>
                <p className="text-text-secondary" data-speakable>
                  연분연승법은 퇴직금을 1년치 소득으로 환산한 후 기본세율을 적용하고, 그 결과에 실제 근속연수를 곱해 최종 세액을 계산하는 방식입니다(소득세법 §55②). 이렇게 하면 근속연수가 길수록 월 환산 단계에서 세액이 낮아져 장기근속자의 세 부담을 경감합니다.
                </p>
                <p className="text-text-secondary mb-4">
                  계산 순서는 다음과 같습니다:
                </p>
                <ol className="space-y-3 text-text-secondary">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-500">①</span>
                    <span><strong>근속연수공제 계산:</strong> 근속연수 구간에 따라 적용되는 공제액을 퇴직금에서 차감합니다. 근속 7년이면 5년 초과 구간(500만 + (7-5) × 200만) = 900만 원 공제.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-500">②</span>
                    <span><strong>환산급여 계산:</strong> (퇴직금 - 근속연수공제) × 12 ÷ 근속연수로 월 소득으로 환산합니다. 퇴직금 5,000만, 공제 900만, 근속 7년이면 (5,000-900) × 12 ÷ 7 ≈ 8,829만 원.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-500">③</span>
                    <span><strong>환산급여공제 계산:</strong> 환산급여 금액에 따라 구간별로 공제를 받습니다. 8,829만 원이면 800만~7,000만 구간(800만 + (8,829만-800만) × 60%) ≈ 5,616만 원 공제.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-500">④</span>
                    <span><strong>과세표준 결정:</strong> 환산급여 - 환산급여공제 = 과세표준. 8,829만 - 5,616만 ≈ 3,213만 원.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-500">⑤</span>
                    <span><strong>기본세율 적용:</strong> 과세표준에 소득세법 §55의 기본세율(6~45% 누진)을 적용. 3,213만 원은 15% 구간이므로 약 481만 원의 세액.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 font-bold text-primary-500">⑥</span>
                    <span><strong>월 환산 및 근속연수 곱:</strong> 481만 ÷ 12 × 7 ≈ 280만 원 (최종 퇴직소득세). 지방소득세 10% 추가로 약 308만 원.</span>
                  </li>
                </ol>
                <div className="bg-bg-card rounded p-3 text-sm text-text-secondary border-l-2 border-primary-500">
                  <strong>⚠️ 주의:</strong> 근속연수 1년 미만은 올림, 1년 이상은 소수점 버림으로 계산됩니다. 또한 모든 중간 계산값은 원 단위에서 10원 이하 절사하는 것이 국세청 기준입니다.
                </div>
              </section>

              <AdSlot slot="guide-retirement-tax-mid" format="rectangle" />

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  근속연수공제는 얼마일까?
                </h2>
                <p className="text-text-secondary" data-speakable>
                  근속연수공제는 근속기간이 길수록 누적되는 공제로, 소득세법 §48에서 정한 구간별 기본액과 연당 추가액을 더해 계산합니다. 예를 들어 근속 15년이면 5년 초과(500만) + (10-5) × 200만 + (15-10) × 250만 = 500만 + 1,000만 + 1,250만 = 2,750만 원 공제입니다.
                </p>
                <table className="w-full text-sm">
                  <caption className="text-xs text-text-secondary mb-2">2026년 근속연수공제 구간별 계산 (소득세법 §48)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="text-left py-2 px-2">근속연수 구간</th>
                      <th scope="col" className="text-right py-2 px-2">기본공제</th>
                      <th scope="col" className="text-right py-2 px-2">연당 추가</th>
                      <th scope="col" className="text-right py-2 px-2">계산 예시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">5년 이하</td>
                      <td className="text-right py-2 px-2">0원</td>
                      <td className="text-right py-2 px-2">100만</td>
                      <td className="text-right py-2 px-2">3년: 300만</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">5년 초과~10년</td>
                      <td className="text-right py-2 px-2">500만</td>
                      <td className="text-right py-2 px-2">200만</td>
                      <td className="text-right py-2 px-2">7년: 900만</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">10년 초과~20년</td>
                      <td className="text-right py-2 px-2">1,500만</td>
                      <td className="text-right py-2 px-2">250만</td>
                      <td className="text-right py-2 px-2">15년: 2,750만</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2">20년 초과</td>
                      <td className="text-right py-2 px-2">4,000만</td>
                      <td className="text-right py-2 px-2">300만</td>
                      <td className="text-right py-2 px-2">25년: 6,500만</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-text-secondary mt-4">
                  근속 20년은 기본액 4,000만 + (20-20) × 300만 = 4,000만 원, 근속 25년은 4,000만 + (25-20) × 300만 = 5,500만 원입니다.
                </p>
                <div className="bg-bg-card rounded p-3 text-sm text-text-secondary border-l-2 border-primary-500">
                  <strong>⚠️ 예외:</strong> 근속 5년 미만은 법정 퇴직금 지급 의무가 없습니다. 다만 퇴직연금(DC/DB)이나 임금피크제 등으로 조기 퇴직하는 경우 근속연수공제 대상이 될 수 있으니 회사 정책 확인 필수.
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  환산급여공제와 기본세율은 어떻게?
                </h2>
                <p className="text-text-secondary" data-speakable>
                  환산급여공제는 근속연수공제 후 월 소득으로 환산한 금액에 대해 적용되는 두 번째 공제입니다(소득세법 §48). 환산급여가 높을수록 공제 비율이 낮아져 과세표준이 높아집니다. 또한 과세표준이 결정되면 소득세법 §55의 기본세율(6~45% 누진)을 적용하므로 누진공제도 함께 적용됩니다.
                </p>
                <table className="w-full text-sm">
                  <caption className="text-xs text-text-secondary mb-2">2026년 환산급여공제 구간별 계산 (소득세법 §48)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="text-left py-2 px-2">환산급여 구간</th>
                      <th scope="col" className="text-right py-2 px-2">기본공제</th>
                      <th scope="col" className="text-right py-2 px-2">공제율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">800만 이하</td>
                      <td className="text-right py-2 px-2">0원</td>
                      <td className="text-right py-2 px-2">100%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">800만~7,000만</td>
                      <td className="text-right py-2 px-2">800만</td>
                      <td className="text-right py-2 px-2">60%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">7,000만~1억</td>
                      <td className="text-right py-2 px-2">4,520만</td>
                      <td className="text-right py-2 px-2">55%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">1억~3억</td>
                      <td className="text-right py-2 px-2">6,170만</td>
                      <td className="text-right py-2 px-2">45%</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2">3억 초과</td>
                      <td className="text-right py-2 px-2">1억 5,170만</td>
                      <td className="text-right py-2 px-2">35%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-text-secondary mt-4">
                  예를 들어 환산급여가 1억 원이면 6,170만 + (1억 - 7,000만) × 45% = 6,170만 + 1,350만 = 7,520만 원 공제입니다. 기본세율은 과세표준 3,100만 원 기준 15% 구간에 해당하면 누진공제 126만 원을 적용해 최종 산출세액을 계산합니다(소득세법 §55).
                </p>
                <div className="bg-bg-card rounded p-3 text-sm text-text-secondary border-l-2 border-primary-500">
                  <strong>⚠️ 핵심:</strong> 환산급여 금액에 따라 공제 비율이 다르므로, 같은 규모의 퇴직금이라도 환산급여(근속연수공제 후 12개월 환산)가 높으면 공제가 적어져 세액이 증가합니다.
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  실전 시뮬레이션
                </h2>
                <p className="text-text-secondary" data-speakable>
                  아래는 두 가지 실제 시나리오로 퇴직소득세를 계산한 예입니다.
                </p>

                <div className="space-y-4">
                  <div className="bg-bg-card rounded-lg p-4 border border-border-base">
                    <h4 className="font-semibold text-text-primary mb-3">케이스 1: 근속 10년, 퇴직금 5,000만 원</h4>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>① 근속연수공제: 500만 + (10-5) × 200만 = 1,500만 원</li>
                      <li>② 환산급여: (5,000만 - 1,500만) × 12 ÷ 10 = 4,200만 원</li>
                      <li>③ 환산급여공제: 800만 + (4,200만 - 800만) × 60% = 2,840만 원</li>
                      <li>④ 과세표준: 4,200만 - 2,840만 = 1,360만 원</li>
                      <li>⑤ 기본세율: 1,360만 × 6% = 816만 원</li>
                      <li>⑥ 퇴직소득세: 816만 ÷ 12 × 10 = 680만 원</li>
                      <li>⑦ 지방소득세: 680만 × 10% = 68만 원</li>
                      <li className="font-bold text-primary-500">⑧ 세금 합계: 748만 원 → 세후 수령액: 4,252만 원</li>
                    </ol>
                  </div>

                  <div className="bg-bg-card rounded-lg p-4 border border-border-base">
                    <h4 className="font-semibold text-text-primary mb-3">케이스 2: 근속 20년, 퇴직금 1억 원</h4>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>① 근속연수공제: 1,500만 + (20-10) × 250만 = 4,000만 원</li>
                      <li>② 환산급여: (1억 - 4,000만) × 12 ÷ 20 = 3,600만 원</li>
                      <li>③ 환산급여공제: 800만 + (3,600만 - 800만) × 60% = 2,480만 원</li>
                      <li>④ 과세표준: 3,600만 - 2,480만 = 1,120만 원</li>
                      <li>⑤ 기본세율: 1,120만 × 6% = 672만 원</li>
                      <li>⑥ 퇴직소득세: 672만 ÷ 12 × 20 = 1,120만 원</li>
                      <li>⑦ 지방소득세: 1,120만 × 10% = 112만 원</li>
                      <li className="font-bold text-primary-500">⑧ 세금 합계: 1,232만 원 → 세후 수령액: 8,768만 원</li>
                    </ol>
                  </div>
                </div>

                <p className="text-text-secondary mt-4">
                  두 케이스를 비교하면, 근속 10년에 퇴직금 5,000만 원은 세율 약 15%, 근속 20년에 1억 원은 세율 약 12%로 계산됩니다. 근속연수가 길수록 월 환산 단계에서 세액이 낮아져 실질 세율이 감소함을 알 수 있습니다.
                </p>

                <div className="bg-bg-card rounded p-3 text-sm text-text-secondary border-l-2 border-primary-500">
                  <strong>⚠️ 주의:</strong> 이 계산은 퇴직금만 있고 다른 소득이 없으며, 회사가 정시에 원천징수한다는 가정 하에 산출한 것입니다. 실제 세액은 소수점 처리, 임금피크제 적용 여부, 당해 연도 다른 소득 유무 등에 따라 달라질 수 있습니다.
                </div>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-text-primary">관련 계산기</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link
                    href="/calculator/severance/"
                    className="flex items-center gap-2 rounded-lg bg-bg-card p-3 hover:bg-primary-500/10 transition"
                  >
                    <span className="text-lg">🧮</span>
                    <div>
                      <p className="font-semibold text-text-primary">퇴직금 계산기</p>
                      <p className="text-xs text-text-secondary">평균임금·퇴직소득세 즉시 계산</p>
                    </div>
                  </Link>
                  <Link
                    href="/guide/severance-vs-pension-dc-db/"
                    className="flex items-center gap-2 rounded-lg bg-bg-card p-3 hover:bg-primary-500/10 transition"
                  >
                    <span className="text-lg">⚖️</span>
                    <div>
                      <p className="font-semibold text-text-primary">DC vs DB 비교</p>
                      <p className="text-xs text-text-secondary">퇴직연금 제도 선택 가이드</p>
                    </div>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="flex items-center gap-2 rounded-lg bg-bg-card p-3 hover:bg-primary-500/10 transition"
                  >
                    <span className="text-lg">💰</span>
                    <div>
                      <p className="font-semibold text-text-primary">연봉 실수령액</p>
                      <p className="text-xs text-text-secondary">4대보험·세금 공제 계산</p>
                    </div>
                  </Link>
                  <Link
                    href="/calculator/retirement/"
                    className="flex items-center gap-2 rounded-lg bg-bg-card p-3 hover:bg-primary-500/10 transition"
                  >
                    <span className="text-lg">🎯</span>
                    <div>
                      <p className="font-semibold text-text-primary">은퇴자금 계산기</p>
                      <p className="text-xs text-text-secondary">필요 자금 규모 판단</p>
                    </div>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 pt-6 border-t border-border-base">
                <h3 className="font-semibold text-text-primary">법적 근거 및 참고자료</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <a href="https://www.law.go.kr/법령/소득세법/제48조" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">소득세법 제48조</a> (퇴직소득공제 — 근속연수공제·환산급여공제)
                  </li>
                  <li>
                    • <a href="https://www.law.go.kr/법령/소득세법/제55조" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">소득세법 제55조</a> (기본세율)
                  </li>
                  <li>
                    • <a href="https://www.nts.go.kr/citizen/benefits/benefit00201" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">국세청 퇴직소득세 가이드</a>
                  </li>
                </ul>
              </section>

              <section className="space-y-4 pt-6 border-t border-border-base text-xs text-text-tertiary">
                <p>
                  <strong>업데이트:</strong> 본 가이드는 2026년 6월 15일 작성되었으며, 소득세법 및 국세청 고시를 기준으로 합니다. 세법은 매년 개정되므로 최신 정보는 국세청 또는 세무전문가 상담을 권장합니다.
                </p>
                <p>
                  <strong>AI 보조 작성:</strong> 본 콘텐츠는 인공지능의 보조를 받아 작성되었으며, 운영자의 법조항 검증을 거쳤습니다. 그러나 세금 계산은 개인의 구체적 사정에 따라 달라질 수 있으므로, 정확한 신고를 위해서는 세무사 또는 국세청 상담을 통해 최종 확인하시기 바랍니다.
                </p>
              </section>

              <ShareButtons
                title="퇴직소득세 계산 2026 | 연분연승법·근속연수공제"
                url={URL}
                description="근속연수가 길수록 세 부담이 줄어드는 연분연승법 완전 해석"
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
