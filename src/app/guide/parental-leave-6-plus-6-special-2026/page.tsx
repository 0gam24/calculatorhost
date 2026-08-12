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

const URL = 'https://calculatorhost.com/guide/parental-leave-6-plus-6-special-2026/';
const DATE_PUBLISHED = '2026-07-31';
const DATE_MODIFIED = '2026-07-31';

export const metadata: Metadata = {
  title: '6+6 부모육아휴직제 2026, 부부 첫 6개월 통상임금 100%',
  description:
    '부부가 모두 육아휴직을 쓰면 첫 6개월 급여를 통상임금 100%로 받고 사후지급금도 공제하지 않습니다. 월별 상한액과 부부 합산 실수령, 신청 방법을 고용보험법 시행령 §95의3 기준으로 정리했습니다.',
  keywords: [
    '6+6 부모육아휴직제',
    '부모 육아휴직 100%',
    '육아휴직 급여 상한액',
    '아빠 육아휴직',
    '육아휴직 사후지급금',
    '6+6 신청 방법',
    '고용보험법 시행령 95조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '6+6 부모육아휴직제 2026, 부부 첫 6개월 통상임금 100%' }],
    title: '6+6 부모육아휴직제 2026, 부부가 함께 쓰면 급여가 오른다',
    description: '생후 18개월 이내 자녀를 부부가 함께 돌보면 첫 6개월 급여를 통상임금 100%(월 최대 450만원)로 지급.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '6+6 부모육아휴직제 2026, 부부 첫 6개월 통상임금 100%',
    description: '월별 상한 200~450만원, 사후지급금 공제 없음. 고용보험법 시행령 §95의3.',
  },
};

const FAQ_ITEMS = [
  {
    question: '6+6 부모육아휴직제는 정확히 무엇인가요?',
    answer:
      '부부가 같은 자녀에 대해 모두 육아휴직을 쓰면 각자의 첫 6개월 급여를 통상임금의 100%로 올려주는 특례입니다(고용보험법 시행령 §95의3). 대상은 생후 18개월 이내 자녀이며, 상한액은 1개월 200만원에서 6개월 450만원까지 매달 단계적으로 올라갑니다. 일반 육아휴직과 달리 사후지급금 방식이 적용되지 않아 휴직 중 전액을 받습니다.',
  },
  {
    question: '부부가 동시에 휴직해야 하나요, 순차로 써도 되나요?',
    answer:
      '동시든 순차든 모두 인정됩니다. 두 사람이 같은 기간에 겹쳐 쉬어도 되고, 한 사람이 먼저 쓴 뒤 다른 사람이 이어서 써도 됩니다. 다만 특례가 적용되는 것은 각자 육아휴직 기간 중 처음 6개월에 한하며, 두 번째 사용자의 통상임금 100% 특례도 그 사람 기준 첫 6개월에 적용됩니다.',
  },
  {
    question: '상한액이 매달 다르다는데 얼마인가요?',
    answer:
      '통상임금 100%를 지급하되 월 상한이 1개월 200만원, 2개월 250만원, 3개월 300만원, 4개월 350만원, 5개월 400만원, 6개월 450만원으로 단계적으로 올라갑니다. 통상임금이 상한보다 낮으면 통상임금 전액을, 상한보다 높으면 상한액을 받습니다. 정확한 최신 상한액은 고용노동부 고시로 조정될 수 있으므로 고용24에서 확인하세요.',
  },
  {
    question: '사후지급금이 공제되나요?',
    answer:
      '아니요. 6+6 특례 구간의 급여는 사후지급금 방식이 적용되지 않아 휴직 기간 중 전액을 받습니다. 일반 육아휴직은 급여의 일부를 복직 6개월 뒤에 몰아 주는 사후지급 방식이 있었으나, 부모 함께 육아휴직 특례 6개월분은 이 공제 없이 매달 전액 지급됩니다.',
  },
  {
    question: '7개월 차부터는 급여가 어떻게 되나요?',
    answer:
      '특례가 끝나는 7개월 차부터는 일반 육아휴직 급여 기준으로 전환됩니다. 즉 통상임금 100% 특례가 종료되고 일반 육아휴직 급여의 지급률과 상한이 적용됩니다. 따라서 6+6 특례의 혜택을 최대한 활용하려면 첫 6개월 구간을 부부가 모두 채우는 것이 유리합니다.',
  },
  {
    question: '어떻게 신청하나요?',
    answer:
      '먼저 회사에 육아휴직을 신청해 사용한 뒤, 고용24(work24.go.kr) 온라인 또는 관할 고용센터에서 육아휴직 급여를 신청합니다. 육아휴직을 시작한 날 이후 1개월부터 끝난 날 이후 12개월 이내에 신청해야 하며, 이 기한을 넘기면 지급받지 못할 수 있습니다.',
  },
  {
    question: '한부모나 외벌이도 받을 수 있나요?',
    answer:
      '6+6 특례는 부모가 모두 육아휴직을 사용하는 것을 전제로 하므로, 한 사람만 사용하는 경우에는 일반 육아휴직 급여가 적용됩니다. 다만 한부모 근로자 등에 대한 별도의 급여 특례가 있을 수 있으므로, 개별 상황은 고용센터에 문의하세요.',
  },
];

export default function ParentalLeave66Special2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '6+6 부모육아휴직제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '6+6 부모육아휴직제 2026, 부부 첫 6개월 통상임금 100%',
    description:
      '부부가 같은 자녀에 대해 모두 육아휴직을 사용하면 각자 첫 6개월 급여를 통상임금 100%로 지급하는 특례. 월별 상한액, 부부 합산 실수령, 사후지급금 미공제, 신청 절차까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['6+6 부모육아휴직제', '육아휴직 급여', '통상임금 100%', '사후지급금', '아빠 육아휴직'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '6+6 부모육아휴직제 2026',
    description:
      '부부가 함께 육아휴직을 쓰면 첫 6개월 급여를 통상임금 100%로 받는 6+6 부모육아휴직제의 상한액과 신청 방법.',
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
                    { name: '6+6 부모육아휴직제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">맞벌이 부모 · 8분 읽기 · 2026-07-31</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  6+6 부모육아휴직제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">부부 첫 6개월 통상임금 100%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 생후 18개월 이내 자녀를 부부가 함께 돌보려는 맞벌이 부모를 위한 것입니다. 부부가 모두 육아휴직을 쓰면 각자 첫 6개월 급여가 통상임금의 100%로 올라가고, 일반 육아휴직에 있던 사후지급금 공제도 없이 매달 전액을 받습니다. 월별 상한액, 부부 합산 실수령, 신청 절차를 순서대로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">6+6 부모육아휴직제란 무엇인가요?</h2>
                <p>
                  부부가 같은 자녀에 대해 모두 육아휴직을 쓰면 각자의 첫 6개월 급여를 통상임금 100%로 올려주는 특례입니다. 근거는 고용보험법 §70(육아휴직 급여)과 시행령 §95의3(출생 후 18개월 이내 자녀에 대한 육아휴직 급여 등의 특례)입니다. 이름의 앞 6은 첫째가 사용하는 6개월, 뒤 6은 둘째가 사용하는 6개월을 뜻합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 생후 18개월 이내 자녀를 부부가 모두 육아휴직으로 돌보는 경우
                    <br />
                    · 급여: 각자 첫 6개월 통상임금 100%
                    <br />
                    · 상한: 1개월 200만원에서 6개월 450만원까지 단계 상향
                    <br />
                    · 사후지급금: 특례 6개월분은 공제 없이 전액 지급
                  </p>
                </div>
                <p className="mt-4">
                  다만 특례가 적용되는 것은 각자 육아휴직 중 처음 6개월뿐입니다. 7개월 차부터는 일반 육아휴직 급여로 전환되므로, 첫 6개월을 부부가 모두 채우는 것이 급여 측면에서 가장 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상한액은 매달 얼마인가요?</h2>
                <p>
                  통상임금 100%를 지급하되 월 상한이 매달 단계적으로 올라갑니다. 통상임금이 상한보다 낮으면 통상임금 전액을, 상한보다 높으면 그달의 상한액을 받습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 6+6 부모육아휴직 월별 상한액 (1인 기준, 통상임금 100%)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">육아휴직 개월</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">월 상한액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급 방식</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1개월</td>
                        <td className="p-3"><strong>200만원</strong></td>
                        <td className="p-3">통상임금 100%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2개월</td>
                        <td className="p-3"><strong>250만원</strong></td>
                        <td className="p-3">통상임금 100%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3개월</td>
                        <td className="p-3"><strong>300만원</strong></td>
                        <td className="p-3">통상임금 100%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4개월</td>
                        <td className="p-3"><strong>350만원</strong></td>
                        <td className="p-3">통상임금 100%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5개월</td>
                        <td className="p-3"><strong>400만원</strong></td>
                        <td className="p-3">통상임금 100%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6개월</td>
                        <td className="p-3"><strong>450만원</strong></td>
                        <td className="p-3">통상임금 100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  주의: 위 상한액은 부모 함께 육아휴직 특례 도입 당시 기준입니다. 상한액은 매년 고용노동부 고시로 조정될 수 있으므로, 실제 신청 전 고용24(work24.go.kr)에서 해당 연도의 최신 금액을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일반 육아휴직과 무엇이 다른가요?</h2>
                <p>
                  가장 큰 차이는 지급률과 사후지급금 여부입니다. 부부가 함께 쓰는 6개월 구간에서만 특례가 적용되고, 나머지는 일반 육아휴직 급여 기준을 따릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 일반 육아휴직 vs 6+6 특례 (첫 6개월 구간)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 육아휴직</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">6+6 특례</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">적용 조건</td>
                        <td className="p-3">한 사람만 사용해도 가능</td>
                        <td className="p-3">부부가 모두 사용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지급률</td>
                        <td className="p-3">통상임금 일부(정률)</td>
                        <td className="p-3">통상임금 100%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">사후지급금 공제</td>
                        <td className="p-3">있을 수 있음</td>
                        <td className="p-3">없음(전액 지급)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상 자녀</td>
                        <td className="p-3">만 8세 또는 초2 이하</td>
                        <td className="p-3">생후 18개월 이내</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 일반 육아휴직 급여의 지급률과 상한도 해마다 개편되고 있으므로, 두 제도를 비교할 때는 신청 시점의 최신 기준을 함께 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제로 얼마를 받나요?</h2>
                <p>
                  급여는 매달 min(통상임금 100%, 그달의 상한액)으로 계산합니다. 두 가지 사례로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 부부 모두 통상임금이 상한 이상인 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 통상임금: 각자 500만원(모든 달 상한액이 적용됨)
                    <br />
                    · 1인 6개월 합계: 200 + 250 + 300 + 350 + 400 + 450 = <strong>1,950만원</strong>
                    <br />
                    · 부부 합산(각자 6개월): 1,950만원 × 2 = <strong>3,900만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 통상임금이 매달 상한보다 높으면 상한액을 그대로 받습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 통상임금이 300만원인 경우(경계값)</p>
                  <p className="text-sm text-text-secondary">
                    · 통상임금: 각자 300만원
                    <br />
                    · 월별 지급액 = min(300만원, 상한): 200 + 250 + 300 + 300 + 300 + 300
                    <br />
                    · 1인 6개월 합계: <strong>1,650만원</strong>
                    <br />
                    · 부부 합산: 1,650만원 × 2 = <strong>3,300만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 3개월 차까지는 상한이, 4개월 차부터는 통상임금 300만원이 적용됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 위 금액은 특례가 적용되는 첫 6개월 기준입니다. 육아휴직을 7개월 이상 이어 쓰면 7개월 차부터는 일반 육아휴직 급여로 계산되므로, 전체 수령액은 사용 기간에 따라 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 신청하나요?</h2>
                <p>
                  급여 신청 전에 회사에 육아휴직을 먼저 사용해야 합니다. 절차는 크게 세 단계입니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>회사에 육아휴직 신청:</strong> 육아휴직 시작 예정일 30일 전까지 사업주에게 신청합니다. 사업주는 요건을 갖춘 신청을 원칙적으로 거부할 수 없습니다.
                  </li>
                  <li>
                    <strong>고용24에서 급여 신청:</strong> 육아휴직 시작 후 1개월이 지난 시점부터 고용24(work24.go.kr) 또는 관할 고용센터에서 육아휴직 급여를 신청합니다. 30일 단위로 매월 신청하거나 휴직 종료 후 일괄 신청도 가능합니다.
                  </li>
                  <li>
                    <strong>기한 준수:</strong> 육아휴직이 끝난 날 이후 12개월 이내에 신청해야 합니다. 이 기한을 넘기면 지급받지 못할 수 있으니 반드시 기간 안에 신청하세요.
                  </li>
                </ol>
                <p className="mt-4">
                  다만 부부가 각각 육아휴직을 사용한 사실이 확인되어야 특례가 적용됩니다. 배우자의 육아휴직 사용 내역이 시스템에 반영되지 않으면 일반 급여로 산정될 수 있으므로, 두 사람 모두의 신청 상태를 확인하는 것이 좋습니다.
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
                    <p className="mt-1 text-sm text-text-secondary">일반 육아휴직 급여 지급률과 상한을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/childcare-reduced-hours-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아기 근로시간 단축 급여</div>
                    <p className="mt-1 text-sm text-text-secondary">휴직 대신 근로시간을 줄일 때의 급여 계산.</p>
                  </Link>
                  <Link
                    href="/guide/maternity-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">출산전후휴가 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">출산휴가 90일 급여와 신청 방법.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">복직 후 월 실수령액을 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/spouse-childbirth-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 출산휴가 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">아빠가 쓸 수 있는 출산휴가 일수와 급여.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·실업급여 등 근로 관련 도구 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 6+6 부모육아휴직제의 월별 상한액과 지급 조건은 매년 고용노동부 고시와 시행령 개정으로 달라질 수 있으므로, 실제 신청 전 고용24 또는 관할 고용센터에서 최신 기준을 반드시 확인하세요. 본 콘텐츠는 2026-07-31 기준이며 관련 법령은 <strong>고용보험법 §70, 고용보험법 시행령 §95·§95의3</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.work24.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용24(고용노동부)</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="6+6 부모육아휴직제 2026 가이드"
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
