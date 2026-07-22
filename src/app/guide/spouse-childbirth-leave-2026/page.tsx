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

const URL = 'https://calculatorhost.com/guide/spouse-childbirth-leave-2026/';
const DATE_PUBLISHED = '2026-07-23';
const DATE_MODIFIED = '2026-07-23';

export const metadata: Metadata = {
  title: '배우자 출산휴가 2026, 20일 유급·급여·신청기한 정리 | calculatorhost',
  description:
    '배우자 출산휴가는 2026년 기준 20일 전부 유급입니다. 근무일 기준 계산, 통상임금 100% 급여와 상한, 최대 3회 분할, 신청 기한과 방법을 남녀고용평등법 §18의2 기준으로 정리했습니다.',
  keywords: [
    '배우자 출산휴가',
    '배우자 출산휴가 20일',
    '배우자 출산휴가 급여',
    '아빠 출산휴가',
    '배우자 출산휴가 분할',
    '배우자 출산휴가 신청',
    '남녀고용평등법 18조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '배우자 출산휴가 2026, 20일 유급·급여·신청기한 정리' }],
    title: '배우자 출산휴가 2026, 20일 유급으로 늘어난 아빠 휴가 총정리',
    description: '20일 전부 유급, 근무일 기준 계산, 통상임금 100% 급여, 최대 3회 분할. 신청 기한과 방법까지 한 번에 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '배우자 출산휴가 2026, 20일 유급·급여·분할 정리',
    description: '근무일 기준 20일 유급, 통상임금 100%, 최대 3회 분할. 남녀고용평등법 §18의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '배우자 출산휴가는 며칠인가요?',
    answer:
      '배우자 출산휴가는 20일입니다(남녀고용평등법 §18의2). 과거 10일에서 2025년 20일로 확대되었으며, 20일 전부가 유급입니다. 20일은 달력상 연속 일수가 아니라 근무일(소정근로일) 기준으로 계산되므로 토요일·일요일·공휴일은 일수에 포함되지 않습니다. 따라서 실제로는 약 4주에 걸쳐 사용하게 됩니다.',
  },
  {
    question: '배우자 출산휴가 급여는 얼마이고 누가 주나요?',
    answer:
      '배우자 출산휴가 급여는 통상임금의 100%가 원칙입니다. 우선지원대상기업(중소기업) 소속 근로자는 20일분에 대해 고용보험에서 급여를 지원하며, 상한액이 있어 통상임금이 높으면 상한까지만 지급됩니다. 대규모기업은 사업주가 유급으로 부담합니다. 구체적인 상한액과 지원 범위는 고용노동부 고시와 고용24(고용보험)에서 반드시 확인하세요.',
  },
  {
    question: '배우자 출산휴가는 언제까지 신청해야 하나요?',
    answer:
      '배우자 출산휴가는 배우자가 출산한 날부터 120일 이내에 사용해야 합니다. 이 기간을 넘기면 사용 권리가 사라지므로 출산일을 기준으로 일정을 잡아야 합니다. 2026년 9월 18일부터는 출산 예정일 50일 전부터 미리 사용할 수 있도록 제도가 확대될 예정이므로, 시행 시점의 최신 기준을 고용노동부에서 확인하세요.',
  },
  {
    question: '배우자 출산휴가를 나눠 쓸 수 있나요?',
    answer:
      '네, 최대 3회까지 분할하여 사용할 수 있습니다. 3회 분할은 한 번에 이어 쓰지 않고 총 4개 구간으로 나눠 쓸 수 있다는 의미입니다. 다만 분할 사용 시 각 구간이 끝날 때마다 별도로 급여를 신청해야 하므로, 세 차례로 나눠 썼다면 급여 신청도 여러 번 해야 합니다.',
  },
  {
    question: '배우자 출산휴가 급여는 어떻게 신청하나요?',
    answer:
      '급여는 휴가가 끝난 날 이전에 고용보험 피보험 단위기간이 합산 180일 이상이어야 신청할 수 있습니다. 신청 기간은 휴가를 시작한 날 이후 1개월부터 휴가가 끝난 날 이후 12개월 이내입니다. 고용24(고용보험) 홈페이지 또는 관할 고용센터를 통해 신청하며, 회사가 발급한 확인서 등 서류가 필요합니다.',
  },
  {
    question: '회사가 배우자 출산휴가를 거부할 수 있나요?',
    answer:
      '거부할 수 없습니다. 배우자 출산휴가는 법으로 보장된 근로자의 권리로, 사업주가 정당한 사유 없이 부여하지 않으면 남녀고용평등법에 따라 과태료 대상이 됩니다. 청구했는데 부여받지 못했다면 관할 고용노동청에 진정을 제기할 수 있습니다.',
  },
  {
    question: '배우자 출산휴가와 육아휴직은 어떻게 다른가요?',
    answer:
      '배우자 출산휴가는 출산 직후 20일간 쓰는 짧은 유급휴가이고, 육아휴직은 자녀 양육을 위해 최대 1년 6개월까지 쓸 수 있는 별개의 제도입니다. 두 제도는 중복이 아니라 순차적으로 활용할 수 있으므로, 배우자 출산휴가로 출산 직후를 지원하고 이후 육아휴직으로 이어 쓰는 것이 일반적입니다.',
  },
  {
    question: '비정규직이나 계약직도 배우자 출산휴가를 쓸 수 있나요?',
    answer:
      '네, 고용형태와 무관하게 사용할 수 있습니다. 배우자 출산휴가는 정규직뿐 아니라 기간제·단시간 근로자에게도 적용됩니다. 다만 고용보험 급여를 받으려면 피보험 단위기간 180일 이상 요건을 충족해야 하므로, 근속이 짧으면 휴가는 쓰되 급여 요건은 별도로 확인해야 합니다.',
  },
];

export default function SpouseChildbirthLeave2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '배우자 출산휴가 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '배우자 출산휴가 2026, 20일 유급으로 늘어난 아빠 휴가 총정리',
    description:
      '2026년 배우자 출산휴가 20일 전부 유급. 근무일 기준 계산, 통상임금 100% 급여와 상한, 최대 3회 분할, 신청 기한과 방법을 남녀고용평등법 §18의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['배우자 출산휴가', '20일', '유급', '급여', '분할'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '배우자 출산휴가 2026',
    description:
      '2026년 배우자 출산휴가 20일 유급의 일수 계산, 급여, 분할, 신청 기한과 방법을 정리한 실전 가이드.',
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
                    { name: '배우자 출산휴가 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 아빠 · 7분 읽기 · 2026-07-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  배우자 출산휴가 2026
                  <br />
                  <span className="text-2xl text-text-secondary">20일 유급, 급여·분할·신청기한 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  아내의 출산을 앞둔 직장인 아빠라면 배우자 출산휴가가 며칠인지, 급여는 나오는지, 언제까지 신청해야 하는지 궁금할 것입니다. 이 가이드는 2026년 기준 20일로 늘어난 배우자 출산휴가의 일수 계산 방식, 통상임금 100% 급여와 상한, 최대 3회 분할 사용, 신청 기한과 방법을 남녀고용평등법 §18의2를 근거로 한 번에 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-spouse-childbirth-leave-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자 출산휴가는 며칠인가요?</h2>
                <p>
                  배우자 출산휴가는 20일이며 전부 유급입니다. 남녀고용평등법 §18의2에 따라 과거 10일에서 2025년 20일로 확대되었고, 사업주는 근로자가 청구하면 20일의 휴가를 유급으로 부여해야 합니다.
                </p>
                <p>
                  여기서 핵심은 20일이 달력상 연속 일수가 아니라 근무일(소정근로일) 기준이라는 점입니다. 토요일·일요일과 공휴일은 20일에 포함되지 않으므로, 실제로는 약 4주에 걸쳐 나눠 쓰게 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈에 보기</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 휴가 일수: 20일(근무일 기준, 전부 유급)
                    <br />
                    · 급여: 통상임금 100%(상한 있음, 고용노동부 고시)
                    <br />
                    · 분할: 최대 3회(총 4개 구간)
                    <br />
                    · 사용 기한: 배우자 출산일부터 120일 이내
                  </p>
                </div>
                <p>
                  다만 근로기준법·남녀고용평등법 개정으로 세부 기준이 순차 시행되는 항목이 있으므로, 사용 직전에는 고용노동부와 고용24에서 최신 내용을 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자 출산휴가 급여는 얼마이고 누가 주나요?</h2>
                <p>
                  급여는 통상임금의 100%가 원칙입니다. 다만 지급 주체와 상한은 회사 규모에 따라 나뉩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 배우자 출산휴가 급여 지급 구조(2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급 수준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급 주체</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">우선지원대상기업(중소기업)</td>
                        <td className="p-3">통상임금 100%(상한 적용)</td>
                        <td className="p-3">고용보험(정부 지원)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대규모기업</td>
                        <td className="p-3">통상임금 100%</td>
                        <td className="p-3">사업주 부담</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  통상임금이 상한액보다 높으면 상한까지만 지급되고 나머지 차액은 사업주가 보전하는 방식이 적용될 수 있습니다. 상한액은 매년 고용노동부 고시로 정해지므로, 정확한 금액과 지원 범위는 고용노동부 고시와 고용24에서 반드시 확인하세요.
                </p>
                <p>
                  예외: 고용보험 급여를 받으려면 피보험 단위기간이 합산 180일 이상이어야 합니다. 근속이 짧으면 휴가 자체는 쓸 수 있어도 급여 요건은 별도로 충족해야 하므로 유의해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 신청해야 하나요?</h2>
                <p>
                  배우자 출산휴가는 출산일부터 120일 이내에 사용해야 합니다. 이 기간을 넘기면 사용 권리가 사라지므로 출산 예정일이 잡히면 미리 일정을 계획하는 것이 좋습니다.
                </p>
                <p>
                  급여 신청은 휴가와 시점이 다릅니다. 휴가를 시작한 날 이후 1개월부터 휴가가 끝난 날 이후 12개월 이내에 급여를 신청해야 하며, 분할 사용 시에는 각 구간이 끝날 때마다 신청합니다.
                </p>
                <p>
                  다만 2026년 9월 18일부터는 출산 예정일 50일 전부터 미리 사용할 수 있도록 제도가 확대될 예정입니다. 이 가이드 작성일(2026년 7월 23일) 기준으로는 출산 후 120일 이내 사용이 원칙이므로, 시행 시점의 최신 기준을 고용노동부에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자 출산휴가를 나눠 쓸 수 있나요?</h2>
                <p>
                  네, 최대 3회까지 분할하여 사용할 수 있습니다. 출산 직후 며칠, 산후조리 시기, 아내 복귀 전후처럼 필요한 시점에 나눠 쓰는 것이 가능합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">분할 사용 예시</p>
                  <p className="text-sm text-text-secondary">
                    · 1차: 출산 직후 5일(입원·퇴원 지원)
                    <br />
                    · 2차: 산후조리원 퇴소 시기 10일
                    <br />
                    · 3차: 아내 복직 준비 시기 5일
                    <br />
                    <span className="text-xs text-text-tertiary">합계 20일. 각 구간 종료 후 급여를 별도로 신청해야 합니다.</span>
                  </p>
                </div>
                <p>
                  다만 분할 횟수가 늘어나면 급여 신청 절차도 그만큼 반복됩니다. 서류 준비와 회사 결재 부담을 고려해 필요한 만큼만 나누는 것이 실무상 편리합니다.
                </p>
              </section>

              <AdSlot slot="guide-spouse-childbirth-leave-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자 출산휴가와 육아휴직은 어떻게 다른가요?</h2>
                <p>
                  배우자 출산휴가는 출산 직후 20일, 육아휴직은 양육을 위한 최대 1년 6개월 제도로 목적과 기간이 다릅니다. 두 제도는 서로 배타적이지 않아 순차적으로 이어 쓸 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 배우자 출산휴가와 육아휴직 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배우자 출산휴가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">육아휴직</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">목적</td>
                        <td className="p-3">출산 직후 배우자 지원</td>
                        <td className="p-3">자녀 양육</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기간</td>
                        <td className="p-3">20일(근무일)</td>
                        <td className="p-3">최대 1년 6개월</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">급여</td>
                        <td className="p-3">통상임금 100%(상한)</td>
                        <td className="p-3">통상임금 일정 비율(상한)</td>
                      </tr>
                      <tr>
                        <td className="p-3">사용 시점</td>
                        <td className="p-3">출산일부터 120일 이내</td>
                        <td className="p-3">자녀 나이 요건 내</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 육아휴직은 급여 지급 비율과 상한이 배우자 출산휴가와 다르므로, 소득 공백을 줄이려면 두 제도의 순서와 시기를 미리 설계하는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">회사가 거부하면 어떻게 하나요?</h2>
                <p>
                  사업주는 배우자 출산휴가를 거부할 수 없습니다. 정당한 사유 없이 부여하지 않으면 남녀고용평등법에 따른 과태료 대상이 되며, 휴가를 이유로 불이익을 주는 것도 금지됩니다.
                </p>
                <p>
                  청구했는데 부여받지 못했거나 유급 처리가 되지 않았다면, 관할 지방고용노동청에 진정을 제기할 수 있습니다. 진정 전에는 청구 기록(메일·메신저 등)을 남겨 두는 것이 도움이 됩니다.
                </p>
                <p>
                  예외: 사업장 규모가 매우 작거나 특수한 고용형태인 경우 적용 방식이 다를 수 있으므로, 애매할 때는 고용노동부 고객상담센터(국번 없이 1350)로 문의하는 것이 정확합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/parental-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아휴직 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">출산휴가 이후 이어 쓰는 육아휴직 급여와 조건.</p>
                  </Link>
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차수당 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">휴가와 함께 챙기는 연차·수당의 계산 기준.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">휴가 기간 통상임금 기준을 파악할 때 함께 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/ordinary-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">통상임금이란 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">급여 산정 기준이 되는 통상임금의 범위를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/marriage-childbirth-gift-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">혼인·출산 증여공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 전후 부모 지원금의 증여세 공제를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/newborn-special-mortgage-loan-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신생아 특례 디딤돌대출 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 가구 저금리 구입자금 대출의 조건과 한도.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 상담이 아닙니다. 배우자 출산휴가 일수·급여 상한·신청 요건은 사업장 규모와 고용보험 가입 이력에 따라 달라질 수 있으므로, 실제 적용은 고용노동부·고용24(고용보험) 또는 관할 고용센터에서 반드시 확인하세요. 본 콘텐츠는 2026-07-23을 기준으로 작성되었으며, 법령·고시 개정 시 업데이트됩니다. 근거 법조항은 <strong>남녀고용평등법 §18의2(배우자 출산휴가)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.work24.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용24(고용보험)</a>.
                </p>
              </section>

              <ShareButtons
                title="배우자 출산휴가 2026, 20일 유급·급여·신청기한 정리"
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
