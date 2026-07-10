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

const URL = 'https://calculatorhost.com/guide/daily-worker-income-tax-2026/';
const DATE_PUBLISHED = '2026-07-11';
const DATE_MODIFIED = '2026-07-11';

export const metadata: Metadata = {
  title: '일용직 근로소득세 2026, 일당 세금 원천징수·공제·분리과세',
  description:
    '건설·단기 알바 일용근로자 원천징수 세금. 일급 15만원 공제, 세율 6%, 분리과세로 종합소득세 비포함. 소득세법 §14③·§134 기준.',
  keywords: [
    '일용근로소득세',
    '일급 원천징수',
    '일용근로자 세금',
    '근로소득공제',
    '분리과세',
    '소득세법 14조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '일용직 근로소득세 2026, 일당 세금 원천징수·공제·분리과세' }],
    title: '일용직 근로소득세 2026, 일당 세금 원천징수·공제·분리과세',
    description: '일급 15만원 공제 후 6% 세율 적용, 실효 약 2.7%. 건설일용·단기 알바 원천징수 완벽 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '일용직 근로소득세 2026, 일당 세금 원천징수·공제·분리과세',
    description: '일급 15만원 공제, 세율 6%, 실효 약 2.7%. 분리과세로 종합소득세 비포함.',
  },
};

const FAQ_ITEMS = [
  {
    question: '일용근로자와 일반근로자의 차이가 뭔가요?',
    answer:
      '일용근로자는 동일 고용주에게 계속 고용되지 않고 일급, 시급으로 임금을 받는 근로자입니다(소득세법 §14③). 건설일용은 1년 미만, 그 외는 3개월 미만 계속 고용되면 일용근로자입니다. 3개월(건설은 1년) 이상 계속 근무하면 일반근로자로 전환되어 간이세액표·연말정산 적용 대상이 됩니다.',
  },
  {
    question: '일용근로소득세 원천징수를 안 하고 가져갈 수 있나요?',
    answer:
      '아닙니다. 일용근로소득 원천징수는 고용주가 반드시 해야 하는 법적 의무입니다(소득세법 §134). 고용주가 임금 지급 시 법정 공제액을 차감해서 근로자에게 지급해야 합니다. 고용주가 원천징수를 하지 않으면 가산세 대상이 됩니다.',
  },
  {
    question: '일급 15만원 이하면 정말 세금이 0인가요?',
    answer:
      '네, 일급이 15만원 이하면 근로소득공제 내에서 처리되어 원천징수 세금은 0입니다. 하지만 4대보험(고용보험·산재보험) 가입 대상이면 그 보험료는 별도로 공제됩니다. 15만원을 초과하는 부분에만 세금이 부과됩니다.',
  },
  {
    question: '일용근로소득도 연말정산·종합소득세 신고 대상인가요?',
    answer:
      '아닙니다. 일용근로소득은 소득세법 §14③에 따라 분리과세 대상이므로 종합소득에 합산하지 않습니다(§59 적용 비대상). 따라서 연말정산 신고와 종합소득세 신고 대상이 아닙니다. 다만 일용근로소득 외 다른 소득(사업소득·양도소득)이 있으면 그것은 신고 대상입니다.',
  },
  {
    question: '지방소득세는 얼마나 더 내야 하나요?',
    answer:
      '지방소득세는 근로소득세(국세)의 10%입니다. 예를 들어 근로소득세가 2,000원이면 지방소득세는 200원입니다. 총 납부액은 근로소득세 + 지방소득세입니다. 원천징수 시 합산 금액이 공제됩니다.',
  },
  {
    question: '여러 회사에서 일용직으로 일하면 세금이 중복되나요?',
    answer:
      '각 회사가 일용근로자의 임금 지급 시 각각 원천징수합니다. 세금이 중복 공제되는 것처럼 보일 수 있지만, 이는 분리과세 제도의 특성입니다. 환급 신청은 별도로는 불가능하므로, 소득이 크다면 세무서에 상담을 받는 것이 좋습니다.',
  },
  {
    question: '일용근로자도 4대보험 가입 대상인가요?',
    answer:
      '네, 일용근로자도 1개월 소정근로시간이 60시간 이상이면 고용보험·산재보험 가입 대상입니다. 보험료는 임금의 약 3~4%이며, 고용주와 근로자가 공담합니다. 건강보험·국민연금은 일반근로자와 달리 피부양자 제도 자격이 엄격합니다.',
  },
  {
    question: '원천징수 영수증을 받아야 하나요?',
    answer:
      '네, 고용주는 일용근로자에게 근로소득 원천징수 영수증을 발급해야 합니다. 영수증에는 지급액, 공제액, 원천징수액이 명시됩니다. 여러 회사에서 일한다면 각 영수증을 모아두세요. 필요 시 세무서에 제출할 수 있습니다.',
  },
];

export default function DailyWorkerIncomeTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '일용직 근로소득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '일용직 근로소득세 2026, 일당 세금 원천징수·공제·분리과세',
    description:
      '건설·단기 알바 일용근로자 원천징수 세금 완벽 정리. 일급 15만원 공제, 세율 6%, 실효 약 2.7%, 분리과세로 종합소득세 비포함.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['일용근로소득세', '원천징수', '일급 공제', '근로소득공제', '분리과세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '일용직 근로소득세 2026',
    description:
      '일용근로자 원천징수 세금의 정확한 계산법·공제·분리과세 원칙.',
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
                    { name: '일용직 근로소득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">일용직·아르바이트 · 7분 읽기 · 2026-07-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  일용직 근로소득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">일당 세금 원천징수·공제·분리과세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  건설일용, 단기 아르바이트 같은 일용직 일자리는 일반 정규직과 세금 방식이 완전히 다릅니다. 고용주가 매 급여일마다 원천징수를 해야 하고, 정해진 공제액이 있으며, 특히 중요한 점은 종합소득세 신고 대상이 아니라는 것입니다. 이 가이드에서는 일용근로자가 납부해야 할 세금의 정확한 금액, 공제 원칙, 그리고 법적 기준까지 완전히 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-daily-worker-income-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일용근로자 정의, 정확히 누가 일용인가</h2>
                <p>
                  소득세법 §14③에 따르면 일용근로소득이란 "동일 고용주에게 계속 고용되지 아니하고 3개월 미만 기간 동안 일시적으로 제공하는 근로로부터의 소득"입니다. 단, 건설 근로자는 1년 미만입니다. 즉, 고용 기간이 짧고 일급·시급으로 받는 것이 특징입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">일용근로자로 분류되는 기준</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 건설일용: 동일 고용주에게 1년 미만 근무
                    <br />
                    · 그 외 일용직: 동일 고용주에게 3개월 미만 근무 (보험설계사, 아르바이트 등)
                    <br />
                    · 임금 형태: 일급, 시급, 주급 등으로 지급
                    <br />
                    · 세금 처리: 분리과세 대상 (종합소득세 합산 금지)
                  </p>
                </div>
                <p className="mt-4">
                  만약 고용 기간이 3개월(건설은 1년)을 초과하거나, 같은 회사에서 계속 고용되면 일반근로자로 전환됩니다. 전환되면 원천징수 방식이 바뀌고 연말정산·종합소득세 신고 대상이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일용근로소득 원천징수 공식, 정확히 얼마나 떼가는가</h2>
                <p>
                  일용근로자의 세금은 고용주가 매 급여일마다 원천징수합니다. 공식은 소득세법 §134, 근로소득공제는 §47에 따릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 일용근로소득 원천징수 계산식 (소득세법 §14③·§47·§134, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제액·세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>근로소득공제</strong></td>
                        <td className="p-3"><strong>1일 15만원</strong></td>
                        <td className="p-3">일급에서 우선 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>과세대상소득</strong></td>
                        <td className="p-3">일급 - 15만원</td>
                        <td className="p-3">음수면 0, 15만원 이하는 0</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>세율</strong></td>
                        <td className="p-3"><strong>6%</strong></td>
                        <td className="p-3">일용근로 원천징수 정액세율, 기본세율 최저구간 6% (소득세법 §134③)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>근로소득세액공제</strong></td>
                        <td className="p-3"><strong>55%</strong></td>
                        <td className="p-3">산출세액의 55% 공제 (소득세법 §59③)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>근로소득세</strong></td>
                        <td className="p-3">(과세대상×6%)×45%</td>
                        <td className="p-3">실제 납부 국세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>지방소득세</strong></td>
                        <td className="p-3">근로소득세의 10%</td>
                        <td className="p-3">지방세 (별도 공제)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>4대보험료</strong></td>
                        <td className="p-3">시간당 임금 기준</td>
                        <td className="p-3">고용보험·산재 등 (별도)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  결국 일용근로자의 실제 세금은 (일급 - 15만원) × 6% × 45% = 약 2.7% 실효세율입니다. 지방소득세까지 포함하면 약 3%입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 4대보험(고용보험·산재보험)은 별도로 공제됩니다. 월 60시간 이상 근무하면 가입 대상이므로 보험료도 함께 차감됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일당 금액별 세금 계산 사례</h2>
                <p>
                  다음 3가지 일급 수준별로 실제 세금이 얼마나 공제되는지 단계별로 계산했습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 일급 15만원 (공제선 기준)</p>
                  <p className="text-sm text-text-secondary">
                    · 일급(지급액): 15만원
                    <br />
                    · 근로소득공제: 15만원
                    <br />
                    · 과세대상소득: 15만원 - 15만원 = 0
                    <br />
                    · 근로소득세: 0 × 6% × 45% = <strong>0원</strong>
                    <br />
                    · 지방소득세: 0원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세금 0원. 일급 15만원 이하면 세금 없음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 일급 20만원</p>
                  <p className="text-sm text-text-secondary">
                    · 일급(지급액): 20만원
                    <br />
                    · 근로소득공제: 15만원
                    <br />
                    · 과세대상소득: 20만원 - 15만원 = 5만원
                    <br />
                    · 근로소득세: 5만원 × 6% × 45% = <strong>1,350원</strong>
                    <br />
                    · 지방소득세: 1,350원 × 10% = 135원
                    <br />
                    · 총 세금: 1,350원 + 135원 = 1,485원
                    <br />
                    · 실수령액: 20만원 - 1,485원 = <strong>198,515원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 일급이 15만원을 초과하는 5만원 부분에만 세금 부과 (실효 약 0.74%).</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 일급 30만원</p>
                  <p className="text-sm text-text-secondary">
                    · 일급(지급액): 30만원
                    <br />
                    · 근로소득공제: 15만원
                    <br />
                    · 과세대상소득: 30만원 - 15만원 = 15만원
                    <br />
                    · 근로소득세: 15만원 × 6% × 45% = <strong>4,050원</strong>
                    <br />
                    · 지방소득세: 4,050원 × 10% = 405원
                    <br />
                    · 총 세금: 4,050원 + 405원 = 4,455원
                    <br />
                    · 실수령액: 30만원 - 4,455원 = <strong>295,545원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 공제액 초과분 15만원의 약 3% 세금 부과.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분리과세, 왜 일용근로소득은 종합소득세 신고 대상이 아닌가</h2>
                <p>
                  가장 중요한 특징이 바로 분리과세입니다. 소득세법 §14③에 따라 일용근로소득은 종합소득세에 합산하지 않습니다. 다시 말해 연말정산이나 종합소득세 신고를 할 필요가 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">분리과세의 의미</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 고용주가 매 급여일 원천징수한 세금으로 세 납부 종료
                    <br />
                    · 연말정산 대상 아님
                    <br />
                    · 종합소득세 신고 시 합산 금지
                    <br />
                    · 따라서 5월 종합소득세 신고 대상 아님
                    <br />
                    · 다만 다른 소득(사업소득·양도소득)이 있으면 그것은 신고 대상
                  </p>
                </div>
                <p className="mt-4">
                  일용근로소득만 여러 회사에서 받아도 세금 환급이나 추가 신고는 일반적으로 없습니다. 고용주가 정확히 원천징수했다면 세 정산이 끝나는 것입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 일용근로소득 외에 다른 종류의 소득이 있다면(예: 프리랜서 용역비, 주식 양도차익), 그 소득은 별도로 신고해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">4대보험, 일용직도 가입해야 하나</h2>
                <p>
                  일용근로자도 4대보험 가입 대상입니다. 특히 고용보험과 산재보험은 거의 모든 일용직이 가입 대상입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>고용보험:</strong> 1개월 소정근로시간 60시간 이상이면 의무 가입. 보험료는 일급의 약 1.0~1.2% 정도. 실직 후 구직급여(실업보험)를 받을 수 있습니다.
                  </li>
                  <li>
                    <strong>산재보험:</strong> 근로자를 1명 이상 사용하는 모든 사업장의 필수 보험. 보험료는 사업주 전액 부담(근로자 공제 안 함). 일하다 다치면 치료비·상병급여를 받습니다.
                  </li>
                  <li>
                    <strong>건강보험:</strong> 일용근로자는 피부양자 자격이 매우 제한적. 배우자 건강보험에 피부양자로 자동 등재되려면 월 소득 한계가 있습니다. 보통 자신이 가입자가 되어야 합니다.
                  </li>
                  <li>
                    <strong>국민연금:</strong> 일용근로자 중 18세 이상 60세 미만이고 소득이 있으면 본인이 직접 가입해야 합니다. 고용주가 가입해주는 것이 아닙니다.
                  </li>
                </ul>
                <p className="mt-4">
                  고용보험과 산재보험은 급여 지급 시 고용주가 자동으로 공제합니다. 건강보험과 국민연금은 본인이 별도로 관리해야 하는 경우가 많습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">여러 회사에서 일한다면</h2>
                <p>
                  일용근로자는 여러 회사에서 동시에 일하거나 차례로 일하는 경우가 많습니다. 이 경우 세금은 어떻게 될까요?
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>각 회사가 각각 원천징수:</strong> A사에서 일급 20만원을 받으면 A사가 세금을 공제하고, B사에서 일급 30만원을 받으면 B사가 별도로 세금을 공제합니다.
                  </li>
                  <li>
                    <strong>분리과세로 환급 불가:</strong> 분리과세 대상이므로 원칙적으로 중복 공제분을 환급받을 수 없습니다. 다만 고용주가 원천징수를 잘못했으면 세무서 상담을 통해 확인할 수 있습니다.
                  </li>
                  <li>
                    <strong>영수증 관리 필수:</strong> 여러 회사에서 일한다면 각 회사로부터 근로소득 원천징수 영수증을 모두 받으세요. 필요 시 세무서에 제출할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 일용근로소득 외에 사업소득이나 기타 소득이 있으면 이야기가 달라집니다. 그 경우 종합소득세 신고 대상이 되므로 세무서에 반드시 상담받으세요.
                </p>
              </section>

              <AdSlot slot="guide-daily-worker-income-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">원천징수 영수증 받는 방법</h2>
                <p>
                  고용주는 반드시 근로소득 원천징수 영수증을 발급해야 합니다. 이 영수증에는 지급액, 공제액, 세금 등 모든 내역이 담깁니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">영수증에 포함되는 항목</p>
                  <p className="text-sm text-text-secondary">
                    · 지급 기간 (예: 2026-07-01~07-07)
                    <br />
                    · 지급액 (일급)
                    <br />
                    · 근로소득공제 (15만원)
                    <br />
                    · 근로소득세 (원천징수 국세)
                    <br />
                    · 지방소득세 (원천징수 지방세)
                    <br />
                    · 4대보험료 (해당 시)
                    <br />
                    · 실수령액
                  </p>
                </div>
                <p className="mt-4">
                  영수증은 급여를 받을 때 함께 받는 것이 원칙입니다. 만약 받지 못했다면 고용주에게 요청하세요. 고용주가 발급하지 않으면 국세청에 신고할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일용근로소득세 신고·환급 관련 주의사항</h2>
                <p>
                  분리과세 대상이지만, 특정 상황에서는 세무서에 상담이 필요할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>고용주가 원천징수를 안 한 경우:</strong> 법적 문제입니다. 국세청에 신고하거나 직접 세무서에 상담을 받으세요. 미처리 세금과 가산세를 고용주가 부담해야 합니다.
                  </li>
                  <li>
                    <strong>잘못 원천징수된 경우:</strong> 공제액 계산 오류 등이 있으면 세무서에 확인을 요청할 수 있습니다.
                  </li>
                  <li>
                    <strong>다른 소득과 함께 있는 경우:</strong> 프리랜서 용역비, 사업소득이 있으면 종합소득세 신고 대상이 됩니다. 이 경우 일용근로소득은 제외하고 다른 소득만 신고합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  의심 사항이 있으면 국세청 홈택스나 관할 세무서에 문의하세요. 일용근로소득은 분리과세이므로 조기에 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">정규직 연봉의 월 세후 수령액을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/minimum-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026년 최저임금</div>
                    <p className="mt-1 text-sm text-text-secondary">최저임금 인상율과 일당 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/four-major-insurance-rates-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026년 4대보험 요율</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·건강보험·고용보험·산재보험 보험료.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 3.3%</div>
                    <p className="mt-1 text-sm text-text-secondary">용역비·강의비 등의 분리과세 세율과 공제.</p>
                  </Link>
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">휴일근로수당 계산·세금</div>
                    <p className="mt-1 text-sm text-text-secondary">주휴수당과 야근 수당의 세무 처리.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 직장인 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·보험료 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 일용근로소득세 계산, 고용주의 원천징수 오류 여부, 보험 가입 대상 판정은 관할 세무서 또는 국세청 홈택스에서 반드시 확인하세요. 특히 여러 회사에서 일한 경우, 다른 소득이 있는 경우, 고용주가 원천징수를 하지 않은 경우는 반드시 세무서에 문의하세요. 본 콘텐츠는 2026-07-11을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 일용근로소득의 정확한 기준은 법조항 <strong>소득세법 §14③(분리과세), §47(근로소득공제), §134(원천징수)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.kcomwel.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">근로복지공단</a>.
                </p>
              </section>

              <ShareButtons
                title="일용직 근로소득세 2026 가이드"
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
