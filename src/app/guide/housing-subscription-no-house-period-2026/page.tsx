// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/housing-subscription-no-house-period-2026/';
const DATE_PUBLISHED = '2026-08-12';
const DATE_MODIFIED = '2026-08-12';

export const metadata: Metadata = {
  title: '청약 무주택기간 산정 2026, 만30세·혼인신고일 기준',
  description:
    '청약 가점의 핵심인 무주택기간은 만 30세부터, 30세 이전에 결혼했다면 혼인신고일부터 계산합니다. 과거 주택 처분 이력이 있을 때의 기산일과 32점 만점 가점표를 주택공급에 관한 규칙 기준으로 정리했습니다.',
  keywords: [
    '무주택기간 산정',
    '청약 무주택기간',
    '무주택기간 만30세',
    '무주택기간 혼인신고일',
    '청약가점 무주택',
    '무주택기간 32점',
    '주택공급에 관한 규칙',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '청약 무주택기간 산정 2026, 만30세·혼인신고일 기준' }],
    title: '청약 무주택기간 산정 2026, 언제부터 계산할까',
    description: '만 30세부터, 30세 이전 결혼 시 혼인신고일부터. 과거 주택 처분 이력과 32점 만점 가점표까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '청약 무주택기간 산정 2026',
    description: '무주택기간은 만 30세 또는 혼인신고일부터. 32점 만점 가점 산정 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '무주택기간은 언제부터 계산하나요?',
    answer:
      '원칙적으로 만 30세가 되는 날부터 계산합니다. 다만 만 30세 이전에 혼인한 경우에는 혼인신고일부터 무주택기간을 산정합니다(주택공급에 관한 규칙). 즉 30세 이전에 결혼했다면 혼인신고일과 30세 중 빠른 날인 혼인신고일이 기산일이 됩니다.',
  },
  {
    question: '만 30세 미만 미혼이면 무주택기간이 0인가요?',
    answer:
      '네, 만 30세 미만이면서 혼인하지 않았다면 무주택기간 가점은 0점입니다. 무주택기간 산정은 만 30세 또는 혼인신고일부터 시작하기 때문에, 그 이전 기간은 무주택이더라도 가점에 반영되지 않습니다. 이 경우 청약통장 가입기간과 부양가족 수 가점으로만 점수가 쌓입니다.',
  },
  {
    question: '과거에 집을 가진 적이 있으면 무주택기간이 사라지나요?',
    answer:
      '완전히 사라지지는 않고 기산일이 조정됩니다. 과거 주택을 소유했다가 처분한 경우, 무주택자가 된 날(주택 처분일)과 기산일(만 30세 또는 혼인신고일) 중 늦은 날부터 무주택기간을 다시 계산합니다. 따라서 집을 판 시점 이후부터 무주택기간이 새로 쌓입니다.',
  },
  {
    question: '배우자가 집을 가지고 있으면 무주택으로 인정되나요?',
    answer:
      '인정되지 않습니다. 무주택 여부는 청약 신청자 본인뿐 아니라 배우자, 그리고 같은 세대를 구성하는 세대원의 주택 소유까지 함께 봅니다. 배우자가 주택을 소유하고 있으면 세대가 유주택으로 판정되어 무주택기간이 인정되지 않습니다. 배우자가 세대 분리되어 있어도 배우자 주택은 함께 따집니다.',
  },
  {
    question: '무주택기간 가점은 최대 몇 점인가요?',
    answer:
      '무주택기간 가점은 최대 32점입니다. 1년 미만이 2점이고 1년마다 2점씩 올라가 15년 이상이면 32점 만점을 받습니다. 민영주택 청약가점제는 무주택기간 32점, 부양가족 수 35점, 청약통장 가입기간 17점을 합해 총 84점 만점으로 구성됩니다.',
  },
  {
    question: '소형·저가주택을 한 채 가지고 있어도 무주택으로 볼 수 있나요?',
    answer:
      '조건을 충족하면 무주택으로 간주될 수 있습니다. 전용면적 60제곱미터 이하이면서 공시가격이 일정 기준 이하인 소형·저가주택을 한 채만 보유한 경우, 민영주택 일반공급 가점제에서는 무주택으로 간주하는 특례가 있습니다. 다만 적용 범위와 공시가격 기준은 공급 유형과 시점에 따라 다르므로 청약홈에서 확인해야 합니다.',
  },
  {
    question: '분양권이나 입주권도 주택으로 보나요?',
    answer:
      '일정 시점 이후 취득한 분양권과 입주권은 주택 소유로 보아 무주택 여부 판정에 포함될 수 있습니다. 취득 시기에 따라 주택 수 산정 여부가 달라지므로, 분양권·입주권을 보유 중이라면 무주택으로 신청하기 전에 반드시 청약홈에서 주택 소유 여부를 확인해야 합니다.',
  },
  {
    question: '무주택기간을 잘못 계산해 청약하면 어떻게 되나요?',
    answer:
      '가점을 잘못 입력해 당첨되면 부적격 당첨으로 처리되어 당첨이 취소되고, 일정 기간 다른 청약이 제한될 수 있습니다. 무주택기간은 부적격의 흔한 원인 중 하나이므로, 청약홈의 청약가점 계산기를 활용해 정확히 확인한 뒤 신청하는 것이 안전합니다.',
  },
];

export default function HousingSubscriptionNoHousePeriod2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청약 무주택기간 산정 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청약 무주택기간 산정 2026, 만30세·혼인신고일 기준',
    description:
      '청약 가점의 무주택기간을 만 30세와 혼인신고일 기준으로 계산하는 법, 과거 주택 처분 이력이 있을 때의 기산일, 배우자·소형저가주택 특례, 32점 만점 가점표를 주택공급에 관한 규칙 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['무주택기간', '청약가점', '만30세', '혼인신고일', '주택공급에 관한 규칙'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청약 무주택기간 산정 2026',
    description:
      '청약 가점의 무주택기간 기산일과 32점 만점 산정 기준, 배우자·소형저가주택 특례를 정리한 가이드.',
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
                    { name: '청약 무주택기간 산정 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청약 대기자 · 8분 읽기 · 2026-08-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청약 무주택기간 산정 2026
                  <br />
                  <span className="text-2xl text-text-secondary">만 30세와 혼인신고일이 기준</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  청약 가점에서 가장 헷갈리는 항목이 무주택기간입니다. 태어나서 지금까지 집이 없었으니 무주택기간이 30년이라고 생각하기 쉽지만, 실제로는 만 30세 또는 혼인신고일부터만 계산합니다. 이 가이드는 무주택기간을 언제부터 세는지, 과거에 집이 있었다면 어떻게 되는지, 그리고 32점 만점을 어떻게 채우는지를 주택공급에 관한 규칙을 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무주택기간은 언제부터 계산하나요?</h2>
                <p>
                  무주택기간의 기산일은 만 30세가 되는 날입니다. 다만 만 30세 이전에 혼인한 경우에는 혼인신고일부터 계산합니다(주택공급에 관한 규칙). 두 조건을 함께 적용하면 기산일은 만 30세와 혼인신고일 중 빠른 날이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 줄 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    무주택기간 기산일 = 만 30세가 된 날. 단, 만 30세 이전에 혼인신고를 했다면 혼인신고일부터.
                  </p>
                </div>
                <p>
                  예를 들어 27세에 혼인신고를 한 사람은 27세부터, 미혼으로 32세인 사람은 만 30세부터 무주택기간이 쌓입니다.
                </p>
                <p>
                  다만 이 기산일은 그 기간 내내 무주택이었다는 전제에서만 그대로 인정됩니다. 중간에 집을 소유한 적이 있으면 기산일이 뒤로 밀립니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">과거에 집이 있었다면 어떻게 되나요?</h2>
                <p>
                  과거에 주택을 소유했다가 처분한 이력이 있으면 무주택기간을 처음부터 다시 세야 합니다. 이때 기준은 무주택자가 된 날, 즉 주택을 처분한 날입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">기산일 판단 원칙</p>
                  <p className="text-sm text-text-secondary">
                    무주택기간 기산일 = 다음 두 날짜 중 늦은 날
                    <br />
                    · 만 30세가 된 날(또는 30세 이전 혼인 시 혼인신고일)
                    <br />
                    · 주택을 처분해 무주택자가 된 날
                  </p>
                </div>
                <p>
                  즉 만 30세가 지난 뒤에 집을 소유했다가 팔았다면, 판 날부터 무주택기간이 새로 시작됩니다. 반대로 만 30세 이전에 집을 팔았다면 만 30세(또는 혼인신고일)부터 계산합니다.
                </p>
                <p>
                  예외: 주택 소유 여부는 등기부상 소유권 이전을 기준으로 판단하는 것이 일반적이므로, 처분 시점을 애매하게 기억하고 있다면 등기 기록으로 확인해야 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무주택기간 가점은 어떻게 되나요?</h2>
                <p>
                  무주택기간 가점은 최대 32점으로, 청약 가점 세 항목 중 부양가족 수 다음으로 배점이 큽니다. 1년 미만이 2점이고 1년마다 2점씩 올라갑니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 무주택기간 가점표 (주택공급에 관한 규칙 별표)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">무주택기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가점</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1년 미만</td>
                        <td className="p-3">2점</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">5년 이상 6년 미만</td>
                        <td className="p-3">12점</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10년 이상 11년 미만</td>
                        <td className="p-3">22점</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">15년 이상</td>
                        <td className="p-3"><strong>32점 (만점)</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  참고로 민영주택 가점제 총점은 무주택기간 32점, 부양가족 수 35점, 청약통장 가입기간 17점을 더한 84점 만점입니다.
                </p>
                <p>
                  다만 무주택기간은 청약 신청일(입주자 모집 공고일)까지를 기준으로 계산하므로, 공고 시점에 따라 1년 단위로 점수가 바뀔 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무주택기간 계산 사례</h2>
                <p>
                  실제 사례로 기산일과 가점을 계산해 봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 미혼, 현재 만 45세, 집 소유 이력 없음</p>
                  <p className="text-sm text-text-secondary">
                    · 기산일: 만 30세가 된 날
                    <br />
                    · 무주택기간: 약 15년 → <strong>32점 만점</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 30세부터 15년이 지나면 무주택기간 만점.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 만 28세에 혼인신고, 현재 만 38세, 무주택 유지</p>
                  <p className="text-sm text-text-secondary">
                    · 기산일: 혼인신고일(만 28세)
                    <br />
                    · 무주택기간: 약 10년 → <strong>22점</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 30세 이전 결혼으로 기산일이 앞당겨져 점수가 더 쌓임.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 만 35세에 주택 처분, 현재 만 40세</p>
                  <p className="text-sm text-text-secondary">
                    · 기산일: 주택 처분일(만 35세)과 만 30세 중 늦은 날 → 만 35세
                    <br />
                    · 무주택기간: 약 5년 → <strong>12점</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 집을 판 시점부터 무주택기간을 새로 계산.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">배우자와 세대원 주택은 어떻게 보나요?</h2>
                <p>
                  무주택 여부는 신청자 개인만이 아니라 세대 단위로 판단합니다. 본인, 배우자, 그리고 같은 세대를 구성하는 직계존비속의 주택 소유를 함께 봅니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>배우자 주택:</strong> 배우자가 주택을 소유하면 세대가 유주택으로 판정됩니다. 배우자가 세대 분리되어 있어도 함께 따집니다.
                  </li>
                  <li>
                    <strong>세대원 주택:</strong> 같은 세대의 부모, 자녀 등이 주택을 소유하면 원칙적으로 유주택 세대가 됩니다. 다만 만 60세 이상 직계존속이 소유한 주택은 일부 공급 유형에서 주택 수에서 제외되는 특례가 있습니다.
                  </li>
                  <li>
                    <strong>소형·저가주택 특례:</strong> 전용 60제곱미터 이하이면서 공시가격이 기준 이하인 소형·저가주택 한 채는 민영주택 일반공급 가점제에서 무주택으로 간주될 수 있습니다.
                  </li>
                </ul>
                <p>
                  다만 이 특례들은 공급 유형(일반공급·특별공급)과 시점에 따라 적용 범위가 다릅니다. 특별공급은 일반공급보다 무주택 요건이 엄격할 수 있으므로, 신청 전 청약홈에서 본인 세대의 주택 소유 판정을 반드시 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/housing-subscription/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택기간·부양가족·통장 가입기간으로 총점을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-score-84-points-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 84점 만점 구조</div>
                    <p className="mt-1 text-sm text-text-secondary">세 항목의 배점과 만점 조건을 한눈에 봅니다.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-first-priority-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약 1순위 조건</div>
                    <p className="mt-1 text-sm text-text-secondary">1순위가 되기 위한 통장·거주 요건을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-monthly-25-recognition-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">월납입금 25만원 인정</div>
                    <p className="mt-1 text-sm text-text-secondary">공공주택 청약통장 인정액 상향 내용.</p>
                  </Link>
                  <Link
                    href="/guide/private-housing-subscription-deposit-amount-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">민영주택 예치금 기준</div>
                    <p className="mt-1 text-sm text-text-secondary">지역·면적별 청약 예치금 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">청약·전월세·중개수수료 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 조언이 아닙니다. 무주택기간 산정, 소형·저가주택 특례, 분양권·입주권 주택 수 산정, 특별공급 요건 등은 공급 유형과 시점에 따라 달라집니다. 청약 신청 전에는 청약홈(applyhome.co.kr)의 청약가점 계산기와 안내를 반드시 확인하세요. 가점을 잘못 입력하면 부적격 당첨으로 처리될 수 있습니다. 본 콘텐츠는 2026-08-12 기준으로 작성되었습니다. 근거: <strong>주택공급에 관한 규칙(청약가점제 무주택기간 산정 기준)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.applyhome.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">청약홈</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부</a>.
                </p>
              </section>

              <ShareButtons
                title="청약 무주택기간 산정 2026 가이드"
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
