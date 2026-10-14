import type { Metadata } from 'next';
import { GuideCalculatorCta } from '@/components/guide/GuideCalculatorCta';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/salary-take-home-2026-july-insurance-increase/';
const DATE_PUBLISHED = '2026-06-29';
const DATE_MODIFIED = '2026-10-14';

export const metadata: Metadata = {
  title: '2026년 7월 국민연금 상한액 인상, 실수령액 변화',
  description:
    '2026년 7월 국민연금 기준소득월액 상한이 637만원에서 659만원으로 인상. 월 659만원 이상이면 공제액이 1만 450원 늘어납니다.',
  keywords: [
    '국민연금 상한액 2026',
    '기준소득월액 상한',
    '7월 국민연금',
    '실수령액 변화',
    '국민연금법 88조',
    '국민연금법 시행령 5조',
    '659만원 상한',
    '637만원 상한',
    '월급 공제액',
    '세후 월급',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '2026년 7월 국민연금 상한액 인상, 실수령액 변화' }],
    title: '2026년 7월 국민연금 상한액 인상, 실수령액 변화',
    description: '2026년 7월 국민연금 기준소득월액 상한이 637만원에서 659만원으로 올라, 월급 659만원 이상이면 공제액이 월 1만 450원 늘어납니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026년 7월 국민연금 상한액 인상, 실수령액 변화',
    description: '2026년 7월 국민연금 기준소득월액 상한이 637만원에서 659만원으로 인상. 월 659만원 이상이면 공제액이 월 1만 450원 늘어납니다.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 7월에 국민연금 요율이 올랐나요?',
    answer:
      '요율은 7월이 아니라 1월에 이미 올랐습니다. 2025년 9.0%(근로자 4.5%)에서 2026년 1월 1일부터 9.5%(근로자 4.75%)로 인상됐습니다(국민연금법 §88). 7월에 바뀐 것은 요율이 아니라 기준소득월액 상한과 하한입니다.',
  },
  {
    question: '그러면 2026년 7월에 뭐가 바뀌었나요?',
    answer:
      '기준소득월액 상한이 637만원에서 659만원으로, 하한이 40만원에서 41만원으로 올랐습니다(국민연금법 시행령 §5, 보건복지부 고시). 월급 659만원 이상 고소득자와 월 보수 41만원 미만 단시간 근로자만 공제액이 바뀝니다.',
  },
  {
    question: '월급 300만원인데 7월에 공제액이 바뀌나요?',
    answer:
      '7월에 변화가 없습니다. 월급 300만원은 상한선 659만원보다 훨씬 낮고 하한선 41만원보다는 높아서 상한·하한 영향을 받지 않습니다. 요율도 1월부터 이미 4.75%가 적용 중이어서 7월에 추가로 바뀌는 금액이 없습니다.',
  },
  {
    question: '월급 700만원이면 7월에 얼마나 더 공제되나요?',
    answer:
      '월 1만 450원 추가 공제됩니다. 상한선 때문에 700만원 전체가 아닌 상한액에만 요율이 적용되는데, 상한이 637만원에서 659만원으로 오르면서 637만×4.75%=302,575원에서 659만×4.75%=313,025원으로 월 1만 450원 늘어납니다.',
  },
  {
    question: '월급 650만원이면 7월에 얼마나 바뀌나요?',
    answer:
      '월 6,175원 추가 공제됩니다. 1~6월에는 상한 637만원이 적용되어 302,575원이었지만, 7월부터 상한이 659만원으로 올라 월급 전액 650만원이 기준이 되므로 650만×4.75%=308,750원이 공제됩니다. 차액은 월 6,175원입니다.',
  },
  {
    question: '2026년 1월 요율 인상으로 월급 300만원은 얼마가 늘었나요?',
    answer:
      '월 7,500원 더 공제됐습니다. 2025년에는 300만×4.5%=135,000원, 2026년 1월부터는 300만×4.75%=142,500원이므로 차액이 월 7,500원입니다. 이 변화는 7월이 아니라 1월 급여명세서부터 이미 반영됐습니다.',
  },
  {
    question: '하한 40만원에서 41만원 인상은 누구에게 영향을 주나요?',
    answer:
      '월 보수가 41만원 미만인 단시간 근로자가 영향을 받습니다. 월 보수 40만원이면 1~6월 40만×4.75%=19,000원에서 7~12월 41만×4.75%=19,475원으로 월 475원 늘어납니다. 월 보수가 41만원 이상인 사람은 하한 영향이 없습니다.',
  },
  {
    question: '요율이 앞으로 더 오르나요?',
    answer:
      '2025년 3월 국민연금법 개정으로 2033년까지 매년 0.5%p씩 단계적으로 인상됩니다. 2027년 10.0%(근로자 5.0%), 2028년 10.5%(근로자 5.25%) 식으로 올라가며, 상한·하한도 매년 조정됩니다. 2027년 이후 7월에 상한·하한이 또 바뀔 수 있습니다.',
  },
];

export default function SalaryTakeHome2026JulyInsuranceIncreasePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '2026년 7월 국민연금 상한액 인상' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2026년 7월 국민연금 상한액 인상, 실수령액 변화',
    description:
      '2026년 7월 국민연금 기준소득월액 상한이 637만원에서 659만원으로 올라 월급 659만원 이상 소득자의 공제액이 늘어납니다. 요율 9.5% 인상은 2026년 1월에 이미 반영됐습니다(국민연금법 §88, 시행령 §5).',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금 상한', '기준소득월액', '659만원', '637만원', '7월 인상', '실수령액'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '2026년 7월 국민연금 상한액 인상, 실수령액 변화',
    description:
      '2026년 7월 국민연금 기준소득월액 상한 637만원에서 659만원 인상(국민연금법 시행령 §5). 월급 659만원 이상이면 공제액이 월 1만 450원 늘어납니다. 요율 9.5% 인상은 2026년 1월에 이미 적용됐습니다.',
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
                    { name: '2026년 7월 국민연금 상한액 인상' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 8분 읽기 · 2026-10-14 갱신</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026년 7월 국민연금 상한액 인상, 실수령액 변화
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 7월 1일부터 국민연금 기준소득월액 상한이 637만원에서 659만원으로, 하한이 40만원에서 41만원으로 올랐습니다(국민연금법 시행령 §5).
                  요율 자체는 7월이 아니라 2026년 1월 1일에 이미 9.0%에서 9.5%로(근로자 부담 4.5%에서 4.75%로) 인상된 상태입니다(국민연금법 §88).
                  7월에 공제액이 바뀌는 사람은 월급 659만원 이상 고소득자와 월 보수 41만원 미만 단시간 근로자뿐입니다.
                </p>
              </header>
              <GuideCalculatorCta slug="salary-take-home-2026-july-insurance-increase" />

              {/* 정정 안내 */}
              <section aria-label="정정 안내" className="card bg-card border-l-4 border-l-danger-500 p-4 text-sm">
                <p className="font-semibold mb-1">정정 안내 (2026-10-14)</p>
                <p className="text-text-secondary">
                  이 글의 이전 버전은 2026년 7월에 국민연금 요율이 9.0%에서 9.5%로 올랐다고 썼지만, 요율 인상은 2026년 1월 1일에 이미 적용된 사실과 다릅니다.
                  7월 변경은 기준소득월액 상한(637만원에서 659만원)과 하한(40만원에서 41만원)뿐이어서 2026-10-14에 전체 내용을 사실에 맞게 수정했습니다.
                </p>
              </section>

              {/* Structured Summary */}
              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">2026년 7월 국민연금 변경 요약</h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">7월에 실제로 바뀐 것 (국민연금법 시행령 §5)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">항목</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">1~6월</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">7~12월</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">변화</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">기준소득월액 상한</td>
                      <td className="px-3 py-2 text-center"><strong>637만원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>659만원</strong></td>
                      <td className="px-3 py-2 text-center text-highlight-500">+22만원</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">기준소득월액 하한</td>
                      <td className="px-3 py-2 text-center"><strong>40만원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>41만원</strong></td>
                      <td className="px-3 py-2 text-center text-highlight-500">+1만원</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">국민연금 요율(총)</td>
                      <td className="px-3 py-2 text-center"><strong>9.5%</strong></td>
                      <td className="px-3 py-2 text-center"><strong>9.5%</strong></td>
                      <td className="px-3 py-2 text-center">변화 없음</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">근로자 부담</td>
                      <td className="px-3 py-2 text-center"><strong>4.75%</strong></td>
                      <td className="px-3 py-2 text-center"><strong>4.75%</strong></td>
                      <td className="px-3 py-2 text-center">변화 없음</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-text-tertiary mt-2">요율 9.5% 인상은 2026년 1월 1일부터 이미 적용 중이며, 7월 변경 사항이 아닙니다(국민연금법 §88).</p>
              </section>

              {/* TL;DR */}
              <section className="card bg-card p-3">
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">한눈에 보기</h2>
                <ul className="space-y-1 text-sm" data-speakable>
                  <li>7월에 바뀐 것은 요율이 아니라 기준소득월액 상한(637만원에서 659만원)과 하한(40만원에서 41만원)</li>
                  <li>요율 4.5%에서 4.75% 인상은 2026년 1월 1일부터 이미 적용 중</li>
                  <li>월급 659만원 이상 소득자: 공제액이 월 1만 450원 증가</li>
                  <li>월급 650만원처럼 637만과 659만 사이: 공제액이 월 6,175원 증가</li>
                  <li>월급 637만원 이하: 7월 공제액 변화 없음</li>
                  <li>월 보수 40만원대 단시간 근로자: 하한 인상으로 소폭 증가(예: 40만원이면 월 475원)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Q. 2026년 7월에 국민연금 요율이 올랐나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  요율은 7월이 아니라 1월에 이미 올랐습니다. 2025년 9.0%(근로자 4.5%)에서 2026년 1월 1일부터 9.5%(근로자 4.75%)로 인상됐습니다(국민연금법 §88).
                  2025년 3월 국민연금법 개정으로 2033년까지 매년 0.5%p씩 단계적으로 올라가는 첫 해입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  7월에 바뀐 것은 요율이 아니라 <strong>기준소득월액 상한선과 하한선</strong>입니다.
                  상한은 637만원에서 659만원으로, 하한은 40만원에서 41만원으로 조정됐습니다(국민연금법 시행령 §5, 보건복지부 고시).
                  이 변화는 상한·하한 구간에 걸친 사람에게만 공제액 변화를 가져옵니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">주의: 흔한 오해</p>
                  <p className="text-text-secondary">
                    "7월에 국민연금이 9.5%로 오른다"는 뉴스·블로그 글이 많지만, 요율은 1월에 이미 올랐습니다.
                    7월 급여명세서에서 공제액이 바뀌었다면 상한선 인상(월급 659만원 이상인 경우) 때문이지 요율 때문이 아닙니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Q. 월급 637만원 이하라면 7월에 뭐가 바뀌나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월급 637만원 이하라면 7월에 바뀌는 공제액이 없습니다. 상한선 아래라 상한 영향을 받지 않고, 요율은 1월부터 이미 4.75%가 적용 중이기 때문입니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">월급 300만원 기준 국민연금 공제액 추이 (단순 계산 예시)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">시점</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">계산</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">월 공제액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">2025년</td>
                      <td className="px-3 py-2 text-center text-xs">300만 × 4.5%</td>
                      <td className="px-3 py-2 text-center"><strong>13만 5,000원</strong></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">2026년 1월부터</td>
                      <td className="px-3 py-2 text-center text-xs">300만 × 4.75%</td>
                      <td className="px-3 py-2 text-center"><strong>14만 2,500원</strong></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">2026년 7월부터</td>
                      <td className="px-3 py-2 text-center text-xs">300만 × 4.75%</td>
                      <td className="px-3 py-2 text-center"><strong>14만 2,500원 (변화 없음)</strong></td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-text-secondary mt-3">
                  2026년 1월 요율 인상으로 월 7,500원 더 공제됐지만, 7월 상한 인상은 이 월급대에 영향이 없습니다.
                  연말정산이나 전년 대비 월급 비교를 할 때는 2025년과 2026년 요율 차이를 반드시 반영해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Q. 월급 659만원 이상이면 7월에 얼마가 늘어나나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월 1만 450원 추가 공제됩니다. 상한선 때문에 월급 전체가 아닌 상한액에만 요율이 적용되는데, 상한이 22만원 오르면서 공제액도 함께 늘어납니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">단순 계산 예시 (월급 659만원 이상, 예: 700만원)</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li><strong>1~6월:</strong> 637만원(상한) × 4.75% = 302,575원</li>
                    <li><strong>7~12월:</strong> 659만원(상한) × 4.75% = 313,025원</li>
                    <li><strong>월 차이:</strong> 313,025원에서 302,575원을 뺀 값, 1만 450원</li>
                    <li><strong>하반기 6개월 추가 부담:</strong> 1만 450원 × 6개월, 6만 2,700원</li>
                  </ul>
                </div>
                <p className="text-sm text-text-tertiary mt-3">
                  주의: 월급이 659만원을 초과해도 공제 기준은 659만원 상한까지입니다. 즉, 월급이 1,000만원이든 659만원이든 7월 이후 공제액은 모두 313,025원으로 같습니다.
                  단순 계산 예시이며, 실제 공제액은 원 단위 미만 절사 등 세부 규정에 따라 수원 단위 차이가 날 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Q. 월급 650만원이면 7월에 어떻게 되나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월 6,175원 추가 공제됩니다. 1~6월에는 상한 637만원이 적용되어 302,575원이 공제됐지만, 7월부터 상한이 659만원으로 올라 월급 전액 650만원이 기준이 됩니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">월급 637만~659만원 구간 7월 변화 (단순 계산 예시)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">월급</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">1~6월 공제액</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">7~12월 공제액</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">월 차이</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">640만원</td>
                      <td className="px-3 py-2 text-center">637만 × 4.75% = 302,575원</td>
                      <td className="px-3 py-2 text-center">640만 × 4.75% = 304,000원</td>
                      <td className="px-3 py-2 text-center"><strong>+1,425원</strong></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">650만원</td>
                      <td className="px-3 py-2 text-center">637만 × 4.75% = 302,575원</td>
                      <td className="px-3 py-2 text-center">650만 × 4.75% = 308,750원</td>
                      <td className="px-3 py-2 text-center"><strong>+6,175원</strong></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">659만원</td>
                      <td className="px-3 py-2 text-center">637만 × 4.75% = 302,575원</td>
                      <td className="px-3 py-2 text-center">659만 × 4.75% = 313,025원</td>
                      <td className="px-3 py-2 text-center"><strong>+1만 450원</strong></td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-text-secondary mt-3">
                  이 구간은 7월에 "상한에 걸리던 사람이 상한이 올라가 전액 기준으로 바뀌는" 영역입니다. 월급이 상한에 가까울수록 증가폭이 커집니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Q. 하한 40만원에서 41만원 인상, 누가 영향 받나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월 보수가 41만원 미만인 단시간 근로자가 영향을 받습니다. 월 보수가 아무리 적어도 기준소득월액은 하한 이상으로 책정되기 때문에, 하한이 오르면 그 구간의 공제액이 함께 오릅니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">단순 계산 예시 (월 보수 40만원 단시간 근로자)</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li><strong>1~6월:</strong> 40만원(하한) × 4.75% = 19,000원</li>
                    <li><strong>7~12월:</strong> 41만원(하한) × 4.75% = 19,475원</li>
                    <li><strong>월 차이:</strong> 19,475원에서 19,000원을 뺀 값, 475원</li>
                  </ul>
                </div>
                <p className="text-sm text-text-tertiary mt-3">
                  주의: 월 보수가 41만원 이상인 사람은 하한 영향이 없습니다. 하한은 "실제 월 보수가 하한보다 낮아도 하한만큼 보험료를 낸다"는 뜻이지, "모든 사람이 하한 금액을 낸다"는 뜻이 아닙니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Q. 1월 요율 인상, 월급 300만원 기준 얼마였나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월 7,500원 더 공제됐습니다. 2026년 1월에 요율이 4.5%에서 4.75%로 오르면서 월급 300만원 기준으로 135,000원에서 142,500원으로 바뀐 결과입니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">2026년 1월 요율 인상 영향 (근로자 부담 기준, 단순 계산 예시)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">월급</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">2025년(4.5%)</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">2026년(4.75%)</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">월 증가</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">200만원</td>
                      <td className="px-3 py-2 text-center">9만원</td>
                      <td className="px-3 py-2 text-center">9만 5,000원</td>
                      <td className="px-3 py-2 text-center"><strong>+5,000원</strong></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">300만원</td>
                      <td className="px-3 py-2 text-center">13만 5,000원</td>
                      <td className="px-3 py-2 text-center">14만 2,500원</td>
                      <td className="px-3 py-2 text-center"><strong>+7,500원</strong></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">400만원</td>
                      <td className="px-3 py-2 text-center">18만원</td>
                      <td className="px-3 py-2 text-center">19만원</td>
                      <td className="px-3 py-2 text-center"><strong>+1만원</strong></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">500만원</td>
                      <td className="px-3 py-2 text-center">22만 5,000원</td>
                      <td className="px-3 py-2 text-center">23만 7,500원</td>
                      <td className="px-3 py-2 text-center"><strong>+1만 2,500원</strong></td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-text-secondary mt-3">
                  이 인상분은 2026년 1월 급여명세서부터 이미 반영됐습니다. 7월에 "요율이 올라서 월급이 줄었다"는 느낌이 든다면, 사실은 1월부터 쭉 이어진 공제 수준을 뒤늦게 인식한 것일 가능성이 큽니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 하는 실수 4가지</h2>
                <ol className="space-y-2 text-sm">
                  <li>
                    <strong>7월에 요율이 올랐다고 믿기</strong>
                    <br />
                    <span className="text-text-tertiary">요율 인상(9.0%에서 9.5%, 근로자 4.5%에서 4.75%)은 2026년 1월 1일부터 이미 적용 중입니다. 7월에 바뀐 것은 기준소득월액 상한과 하한뿐입니다.</span>
                  </li>
                  <li>
                    <strong>월급 300만원인데 7월에 공제액이 더 늘 거라고 걱정하기</strong>
                    <br />
                    <span className="text-text-tertiary">월급이 637만원 이하라면 7월 공제액 변화가 없습니다. 상한선 아래라 상한 영향을 받지 않고, 요율은 1월부터 그대로이기 때문입니다.</span>
                  </li>
                  <li>
                    <strong>고소득자가 월급 전체에 요율을 곱해 계산하기</strong>
                    <br />
                    <span className="text-text-tertiary">월급이 659만원을 초과해도 국민연금 공제 기준은 상한 659만원까지입니다. 월급 1,000만원이어도 7월 이후 공제액은 659만×4.75%=313,025원으로 동일합니다.</span>
                  </li>
                  <li>
                    <strong>건강보험·고용보험이 7월에 바뀐다고 혼동하기</strong>
                    <br />
                    <span className="text-text-tertiary">7월 변경은 국민연금 상한·하한뿐입니다. 건강보험(근로자 3.595%), 장기요양(건강보험료의 13.14%), 고용보험(근로자 0.9%)은 2026년 7월 변동이 없습니다.</span>
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 법령과 공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    국민연금법 §88 (보험료율): <a href="https://law.go.kr" rel="nofollow" className="text-primary-500 underline">law.go.kr</a>
                  </li>
                  <li>
                    국민연금법 시행령 §5 (기준소득월액 상한·하한): <a href="https://law.go.kr" rel="nofollow" className="text-primary-500 underline">law.go.kr</a>
                  </li>
                  <li>
                    국민연금공단 공식 요율 안내: <a href="https://www.nps.or.kr" rel="nofollow" className="text-primary-500 underline">www.nps.or.kr</a>
                  </li>
                  <li>
                    보건복지부 기준소득월액 고시 (2026): <a href="https://www.mohw.go.kr" rel="nofollow" className="text-primary-500 underline">www.mohw.go.kr</a>
                  </li>
                  <li>
                    국민건강보험공단: <a href="https://www.nhis.or.kr" rel="nofollow" className="text-primary-500 underline">www.nhis.or.kr</a>
                  </li>
                </ul>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 가이드와 계산기</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/calculator/salary/" className="font-semibold text-primary-500 hover:underline">
                      연봉 실수령액 계산기
                    </Link>
                    {' 4대보험료와 소득세를 자동 반영해 2026년 세후 월급을 계산합니다.'}
                  </li>
                  <li>
                    <Link href="/guide/four-major-insurance-rates-2026/" className="font-semibold text-primary-500 hover:underline">
                      2026년 4대보험 요율 종합 가이드
                    </Link>
                    {' 국민연금, 건강보험, 고용보험, 산재보험 요율을 한 번에 정리.'}
                  </li>
                  <li>
                    <Link href="/guide/national-pension-premium-2026/" className="font-semibold text-primary-500 hover:underline">
                      2026년 국민연금 보험료 가이드
                    </Link>
                    {' 요율 9.5% 인상 배경과 2033년까지 단계적 인상 일정.'}
                  </li>
                  <li>
                    <Link href="/category/work/" className="font-semibold text-primary-500 hover:underline">
                      근로 계산기 모음
                    </Link>
                    {' 연봉, 퇴직금, 4대보험 전체 계산기.'}
                  </li>
                </ul>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 참고용이며 법적 효력이 없습니다.
                  본문의 금액은 단순 계산 예시이며, 실제 공제액은 원 단위 미만 절사 등 세부 규정에 따라 수원 단위 차이가 날 수 있습니다. 정확한 국민연금 공제액이나 복잡한 급여 문제는 국민연금공단, 회사 인사·급여팀, 세무사·노무사의 상담을 받으시기 바랍니다.
                </p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  최초 작성: 2026-06-29 | 마지막 갱신: 2026-10-14 | 국민연금법 §88과 시행령 §5 사실관계 전면 정정, 요율 9.5% 인상은 1월 적용·7월 변경은 기준소득월액 상한·하한으로 수정
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
