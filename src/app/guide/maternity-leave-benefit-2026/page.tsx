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

// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 검색 의도 흡수)

const URL = 'https://calculatorhost.com/guide/maternity-leave-benefit-2026/';
const DATE_PUBLISHED = '2026-07-24';
const DATE_MODIFIED = '2026-07-24';

export const metadata: Metadata = {
  title: '출산전후휴가 급여 2026, 90일 상한·신청·기간 정리 | calculatorhost',
  description:
    '출산전후휴가는 근로기준법 §74에 따라 90일(다태아 120일) 보장되고 통상임금 100%를 받습니다. 2026년 고용보험 급여 상한, 회사 규모별 지급 주체, 신청 기한과 계산법을 정리했습니다.',
  keywords: [
    '출산전후휴가 급여',
    '출산휴가 급여 2026',
    '출산휴가 90일',
    '출산휴가 상한액',
    '출산휴가 신청방법',
    '다태아 출산휴가',
    '근로기준법 74조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '출산전후휴가 급여 2026, 90일 상한·신청·기간 정리' }],
    title: '출산전후휴가 급여 2026, 90일 통상임금 100% 받는 법',
    description: '90일(다태아 120일) 보장, 통상임금 100%, 고용보험 상한과 회사 규모별 지급 주체까지. 신청 기한을 놓치지 않게 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '출산전후휴가 급여 2026, 90일 상한·신청·기간',
    description: '90일(다태아 120일) 통상임금 100%. 회사 규모별 지급 주체와 신청 기한. 근로기준법 §74.',
  },
};

const FAQ_ITEMS = [
  {
    question: '출산전후휴가는 며칠인가요?',
    answer:
      '총 90일입니다. 한 번에 둘 이상을 임신한 다태아라면 120일이 보장됩니다(근로기준법 §74). 중요한 것은 출산 후에 반드시 45일(다태아는 60일) 이상이 남도록 배치해야 한다는 점입니다. 출산 예정일보다 일찍 낳아 출산 전 기간을 다 못 써도, 출산 후 45일은 보장됩니다.',
  },
  {
    question: '급여는 얼마를 받나요?',
    answer:
      '통상임금의 100%를 받습니다. 다만 고용보험이 지급하는 부분에는 상한이 있어, 2026년 기준 30일당 상한액은 월 220만원입니다. 통상임금이 상한보다 높으면 상한까지만 고용보험에서 나오고, 대규모기업이라면 최초 60일은 회사가 통상임금과의 차액을 채워 지급합니다. 하한은 최저임금 수준입니다.',
  },
  {
    question: '회사가 주나요, 고용보험이 주나요?',
    answer:
      '회사 규모에 따라 다릅니다. 우선지원대상기업(중소기업 등)은 90일 전체를 고용보험에서 지급합니다. 대규모기업은 최초 60일(다태아 75일)은 회사가 통상임금 100%를 지급하고, 마지막 30일(다태아 45일)은 고용보험에서 상한 내로 지급합니다.',
  },
  {
    question: '급여 신청은 언제까지 해야 하나요?',
    answer:
      '휴가를 시작한 뒤 1개월부터 신청할 수 있고, 늦어도 휴가가 끝난 날부터 12개월 이내에 신청해야 합니다. 이 기한을 넘기면 급여를 받지 못할 수 있으니 반드시 기간 안에 신청하세요. 대규모기업 근로자는 최초 60일이 지난 뒤부터 고용보험 급여를 신청합니다.',
  },
  {
    question: '어디에 어떻게 신청하나요?',
    answer:
      '고용보험 홈페이지(고용24) 온라인 신청 또는 거주지·사업장 관할 고용센터 방문·우편으로 신청합니다. 출산전후휴가 확인서(사업주 발급), 통상임금 확인 자료, 신청서를 제출합니다. 매월 단위로 신청하거나 휴가 종료 후 한꺼번에 신청할 수 있습니다.',
  },
  {
    question: '계약직·기간제도 받을 수 있나요?',
    answer:
      '고용보험 피보험 단위기간(휴가 시작일 이전 180일 이상)을 충족하면 받을 수 있습니다. 다만 휴가 도중 계약기간이 끝나면 그 시점까지의 급여만 지급되는 등 상황에 따라 달라지므로, 관할 고용센터에 본인 계약 조건으로 확인하는 것이 정확합니다.',
  },
  {
    question: '유산·사산한 경우에도 휴가와 급여가 있나요?',
    answer:
      '있습니다. 임신 기간에 따라 유산·사산 휴가가 5일에서 90일까지 차등 부여되며, 요건을 갖추면 고용보험에서 급여가 지급됩니다. 임신 주수별로 일수가 다르므로 구체적인 기간은 근로기준법 시행령과 고용노동부 안내를 확인하세요.',
  },
  {
    question: '출산전후휴가와 육아휴직은 같이 쓰나요?',
    answer:
      '순서대로 이어서 씁니다. 보통 출산전후휴가(90일)를 먼저 사용하고, 이어서 육아휴직을 사용합니다. 두 제도는 급여 지급 근거와 상한이 서로 달라 별도로 신청해야 합니다. 배우자 출산휴가는 배우자(주로 아빠)가 별도로 쓰는 제도로, 본인의 출산전후휴가와는 다른 제도입니다.',
  },
];

export default function MaternityLeaveBenefit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '출산전후휴가 급여 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '출산전후휴가 급여 2026, 90일 통상임금 100% 받는 법',
    description:
      '출산전후휴가 90일(다태아 120일)의 기간·급여·상한·회사 규모별 지급 주체·신청 기한을 근로기준법 §74와 고용보험법 §75 기준으로 정리한 실무 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['출산전후휴가', '출산휴가 급여', '90일', '고용보험 상한', '근로기준법 74조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '출산전후휴가 급여 2026',
    description:
      '90일(다태아 120일) 출산전후휴가의 급여 계산·상한·회사 규모별 지급·신청 기한 정리.',
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
                    { name: '출산전후휴가 급여 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임신·출산 근로자 · 8분 읽기 · 2026-07-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  출산전후휴가 급여 2026
                  <br />
                  <span className="text-2xl text-text-secondary">90일 통상임금 100% 받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  출산을 앞둔 근로자가 가장 궁금해하는 것은 휴가가 며칠이고 급여를 얼마나, 누가 주느냐입니다. 회사가 주는 건지 고용보험이 주는 건지, 상한은 얼마인지, 신청은 언제까지 하는지가 헷갈립니다. 이 가이드는 출산전후휴가의 기간·급여·상한·신청 기한을 근로기준법과 고용보험법 조문 기준으로 한 번에 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-maternity-leave-benefit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">출산전후휴가란 무엇인가요?</h2>
                <p>
                  출산전후휴가는 임신 중인 근로자에게 출산 전후로 90일(다태아 120일)을 보장하는 법정 휴가입니다(근로기준법 §74). 출산 후에 반드시 45일(다태아 60일) 이상이 남도록 배치해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    기간: 90일 (다태아 120일), 출산 후 45일(다태아 60일) 이상 확보.
                    <br />
                    급여: 통상임금 100% (고용보험 지급분 30일당 상한 220만원, 2026).
                    <br />
                    최초 유급: 60일(다태아 75일)은 유급 보장 (근로기준법 §74).
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 단태아·다태아 출산전후휴가 (근로기준법 §74)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단태아</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">다태아</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">총 휴가일수</td>
                        <td className="p-3">90일</td>
                        <td className="p-3">120일</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">출산 후 최소 확보</td>
                        <td className="p-3">45일</td>
                        <td className="p-3">60일</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">유급 보장</td>
                        <td className="p-3">최초 60일</td>
                        <td className="p-3">최초 75일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 미숙아를 출산해 신생아 집중치료실에 입원하는 등의 경우 휴가가 100일로 연장될 수 있습니다. 개별 사정은 사업장과 관할 고용센터에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">급여는 얼마를 받나요?</h2>
                <p>
                  통상임금의 100%를 받는 것이 원칙입니다. 다만 고용보험에서 지급하는 부분은 상한이 있어, 2026년 기준 30일당 상한액은 월 220만원입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>기준:</strong> 통상임금 100% (기본급 + 고정수당 등).</li>
                  <li><strong>상한:</strong> 고용보험 지급분 30일당 220만원(2026년 기준).</li>
                  <li><strong>하한:</strong> 최저임금 수준 이상.</li>
                </ul>
                <p>
                  다만 상한액은 매년 고용노동부 고시로 조정되므로, 신청 시점의 정확한 상한은 고용보험 홈페이지에서 확인하세요. 통상임금이 상한보다 낮으면 통상임금 전액이 지급됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">회사가 주나요, 고용보험이 주나요?</h2>
                <p>
                  누가 급여를 주는지는 회사 규모에 따라 갈립니다(고용보험법 §75). 핵심은 우선지원대상기업(중소기업 등)이냐, 대규모기업이냐입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 회사 규모별 출산전후휴가 급여 지급 주체</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최초 60일(다태아 75일)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">마지막 30일(다태아 45일)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">우선지원대상기업</td>
                        <td className="p-3">고용보험 (상한 내)</td>
                        <td className="p-3">고용보험 (상한 내)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대규모기업</td>
                        <td className="p-3">회사 (통상임금 100%)</td>
                        <td className="p-3">고용보험 (상한 내)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 우선지원대상기업이라도 통상임금이 상한을 넘으면 상한까지만 지급되므로, 실수령이 통상임금보다 적을 수 있습니다. 대규모기업 근로자는 최초 60일 동안 회사가 통상임금 전액을 채워주므로 이 구간의 차액 손실이 없습니다.
                </p>
              </section>

              <AdSlot slot="guide-maternity-leave-benefit-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">급여는 어떻게 신청하나요?</h2>
                <p>
                  급여 신청은 온라인(고용24) 또는 관할 고용센터 방문·우편으로 합니다. 신청 기한을 놓치면 급여를 받지 못할 수 있으니 기간을 꼭 지켜야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>신청 시작:</strong> 휴가 시작 1개월 후부터 (대규모기업은 최초 60일 경과 후).</li>
                  <li><strong>신청 기한:</strong> 휴가가 끝난 날부터 12개월 이내.</li>
                  <li><strong>서류:</strong> 출산전후휴가 급여 신청서, 사업주 발급 확인서, 통상임금 확인 자료.</li>
                </ul>
                <p>
                  다만 매월 단위 신청과 종료 후 일괄 신청 중 선택할 수 있습니다. 급여가 생활비로 필요하면 매월 신청이 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">출산전후휴가 급여 계산 사례</h2>
                <p>
                  통상임금과 회사 규모에 따라 실수령이 어떻게 달라지는지 살펴보겠습니다. 아래는 90일(약 3개월)을 30일 단위 상한 220만원으로 계산한 예시입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 우선지원대상기업, 통상임금 월 180만원</p>
                  <p className="text-sm text-text-secondary">
                    · 통상임금 180만원은 상한 220만원 미만 → 전액 지급
                    <br />
                    · 고용보험 급여: 180만원 × 3개월 = <strong>540만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">통상임금이 상한보다 낮아 손실 없이 100% 수령.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 우선지원대상기업, 통상임금 월 300만원</p>
                  <p className="text-sm text-text-secondary">
                    · 통상임금 300만원은 상한 220만원 초과 → 상한까지만 지급
                    <br />
                    · 고용보험 급여: 220만원 × 3개월 = <strong>660만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">통상임금 900만원(3개월) 중 660만원 수령, 상한으로 240만원 차이 발생.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 대규모기업, 통상임금 월 300만원</p>
                  <p className="text-sm text-text-secondary">
                    · 최초 60일: 회사가 통상임금 100% → 300만원 × 2개월 = 600만원
                    <br />
                    · 마지막 30일: 고용보험 상한 220만원
                    <br />
                    · 근로자 총 수령: 600만원 + 220만원 = <strong>820만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">최초 60일은 회사가 차액을 채워 손실이 없음.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">배우자 출산휴가·육아휴직과 어떻게 다른가요?</h2>
                <p>
                  세 제도는 목적과 대상이 다릅니다. 헷갈리면 신청을 놓치기 쉬우니 구분해 두는 것이 좋습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>출산전후휴가:</strong> 출산 당사자(임신한 근로자)가 쓰는 90일 휴가. 근로기준법 §74.</li>
                  <li><strong>배우자 출산휴가:</strong> 배우자(주로 아빠)가 쓰는 20일 유급휴가(2026 기준). 별도 제도.</li>
                  <li><strong>육아휴직:</strong> 출산전후휴가 이후 이어서 자녀 양육을 위해 쓰는 휴직. 급여 근거·상한 별도.</li>
                </ul>
                <p>
                  다만 세 제도는 급여 지급 근거와 상한이 각각 달라 따로 신청해야 합니다. 순서는 보통 출산전후휴가 다음에 육아휴직으로 이어집니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/spouse-childbirth-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 출산휴가 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">20일 유급으로 늘어난 아빠 휴가를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/parental-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아휴직 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">출산휴가 이후 이어지는 육아휴직 급여 기준.</p>
                  </Link>
                  <Link
                    href="/guide/childcare-reduced-hours-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아기 근로시간 단축 급여</div>
                    <p className="mt-1 text-sm text-text-secondary">복직 후 근로시간을 줄이며 받는 급여를 알아보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">통상임금과 실수령액을 함께 가늠해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/marriage-childbirth-gift-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">혼인·출산 증여공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 시 활용 가능한 증여세 공제를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">휴가·수당·4대보험 등 직장인 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 급여 상한액은 매년 고용노동부 고시로 조정되고, 피보험 단위기간·통상임금 산정·계약 형태에 따라 실제 지급액이 달라집니다. 신청 전 고용보험 홈페이지(고용24) 또는 관할 고용센터에서 반드시 확인하세요. 본 콘텐츠는 2026-07-24 기준이며 법령·고시 개정 시 업데이트됩니다. 근거 법조항은 <strong>근로기준법 §74(임산부의 보호), 고용보험법 §75(출산전후휴가 급여), §76(지급기간)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="출산전후휴가 급여 2026 가이드"
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
