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

const URL = 'https://calculatorhost.com/guide/housing-subscription-monthly-25-recognition-2026/';
const DATE_PUBLISHED = '2026-07-27';
const DATE_MODIFIED = '2026-07-27';

export const metadata: Metadata = {
  title: '청약통장 월 25만원, 인정한도 상향과 소득공제 300만원 정리',
  description:
    '청약통장 월 납입 인정한도가 10만원에서 25만원으로 올랐습니다. 공공분양에 유리해진 이유, 소득공제 연 300만원의 40% 한도, 얼마 넣어야 유리한지 실전 기준으로 정리했습니다.',
  keywords: [
    '청약통장 25만원',
    '청약 월납입 인정한도',
    '청약저축 소득공제',
    '주택청약 얼마 넣어야',
    '청약 인정금액',
    '공공분양 청약',
    '조세특례제한법 87조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '청약통장 월 25만원, 인정한도 상향과 소득공제 300만원 정리' }],
    title: '청약통장 월 25만원, 인정한도 상향과 소득공제 300만원 정리',
    description: '월 인정한도 10만원에서 25만원 상향. 공공분양 유리, 소득공제 300만원의 40% 한도까지 실전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '청약통장 월 25만원, 인정한도와 소득공제 정리',
    description: '월 인정한도 25만원 상향과 소득공제 연 300만원의 40% 한도를 실전 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청약통장 월 납입 인정한도가 왜 25만원으로 올랐나요?',
    answer:
      '2024년 11월부터 주택청약종합저축의 월 납입 인정한도가 기존 10만원에서 25만원으로 상향됐습니다. 공공분양(국민주택)은 매달 인정되는 납입액을 쌓아 순위를 정하는데, 오랫동안 월 10만원으로 묶여 있어 목돈이 있어도 빨리 인정액을 늘릴 수 없었습니다. 한도를 25만원으로 올려 성실 납입자가 더 빨리 인정액을 쌓을 수 있게 한 것입니다.',
  },
  {
    question: '매달 25만원을 꼭 넣어야 하나요?',
    answer:
      '의무는 아닙니다. 다만 공공분양(국민주택) 당첨을 노린다면 인정한도 상한인 25만원을 채워 넣는 것이 순위 경쟁에서 유리합니다. 반대로 민영주택만 노린다면 매달 얼마를 넣었는지가 아니라 지역·면적별 예치금 기준만 채우면 되므로, 25만원을 매달 넣을 실익은 크지 않습니다. 본인이 노리는 주택 유형에 맞춰 결정하세요.',
  },
  {
    question: '공공분양과 민영주택은 무엇이 다른가요?',
    answer:
      '공공분양(국민주택)은 매달 인정되는 납입 횟수와 인정 납입액 총액으로 순위를 가립니다. 그래서 월 인정한도 25만원이 중요합니다. 반면 민영주택은 청약통장에 지역·전용면적별로 정해진 예치금(예: 서울 85제곱미터 이하 300만원 등)을 넣어두기만 하면 되고, 매달 납입 여부는 순위에 직접 영향을 주지 않습니다.',
  },
  {
    question: '청약저축 소득공제는 얼마까지 받나요?',
    answer:
      '무주택 세대주이면서 총급여 7,000만원 이하인 근로자는 연 납입액 300만원 한도에서 40%를 소득공제받습니다. 즉 최대 120만원까지 소득공제됩니다(조세특례제한법 §87). 인정한도가 25만원으로 오르면서 월 25만원 곱하기 12개월 = 300만원이 소득공제 한도와 정확히 맞아떨어집니다.',
  },
  {
    question: '소득공제를 최대한 받으려면 얼마를 넣어야 하나요?',
    answer:
      '소득공제만 목적이라면 연 300만원, 즉 월 25만원을 넣으면 한도를 꽉 채웁니다. 300만원의 40%인 120만원이 소득공제되며, 그 이상 납입해도 소득공제 한도는 늘어나지 않습니다. 다만 무주택 세대주 요건과 총급여 7,000만원 이하 요건을 충족해야 소득공제가 적용됩니다.',
  },
  {
    question: '이미 월 10만원씩 넣고 있었는데 손해인가요?',
    answer:
      '과거에 넣은 금액이 사라지는 것은 아닙니다. 다만 앞으로는 월 25만원까지 인정되므로, 공공분양을 노린다면 납입액을 늘려 인정액을 더 빨리 쌓는 것이 유리합니다. 소득공제 측면에서도 기존 240만원 한도가 300만원으로 확대됐으니, 여력이 되면 납입액을 조정해 소득공제 한도를 채우는 것을 고려해보세요.',
  },
  {
    question: '미성년자 납입도 인정되나요?',
    answer:
      '미성년자일 때 납입한 것도 일부 인정됩니다. 과거에는 인정 기간이 2년이었으나 5년으로 확대돼, 미성년 시기 납입 이력을 더 길게 인정받을 수 있습니다. 자녀 명의로 일찍 청약통장을 만들어 두면 성년 이후 청약에서 유리하게 작용할 수 있습니다.',
  },
  {
    question: '배우자 청약통장도 소득공제·비과세 혜택을 받나요?',
    answer:
      '소득공제와 이자소득 비과세 혜택 대상이 무주택 세대주뿐 아니라 배우자까지 확대 적용되는 방향으로 제도가 정비됐습니다. 다만 세부 적용 요건과 시행 시점은 개별 상품·연도에 따라 다를 수 있으므로, 청약홈과 가입 은행에서 본인·배우자의 적용 여부를 확인하는 것이 정확합니다.',
  },
];

export default function HousingSubscriptionMonthly25Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청약통장 월 25만원 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청약통장 월 25만원, 인정한도 상향과 소득공제 300만원 정리',
    description:
      '청약통장 월 납입 인정한도가 10만원에서 25만원으로 오른 배경과 공공분양 유리 이유, 소득공제 연 300만원의 40% 한도를 실전 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['청약통장', '월 25만원', '인정한도', '소득공제', '공공분양'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청약통장 월 25만원 2026',
    description: '청약통장 월 납입 인정한도 25만원 상향과 소득공제 한도를 정리한 가이드.',
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
                    { name: '청약통장 월 25만원 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청약 준비 무주택자 · 8분 읽기 · 2026-07-27</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청약통장 월 25만원
                  <br />
                  <span className="text-2xl text-text-secondary">인정한도 상향과 소득공제 300만원 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  청약통장에 매달 얼마를 넣어야 할지 헷갈리는 무주택자가 많습니다. 2024년 11월부터 월 납입 인정한도가 10만원에서 25만원으로 오르면서 특히 공공분양을 노리는 사람이라면 전략을 다시 짜야 합니다. 이 가이드는 인정한도 상향의 의미, 공공분양과 민영주택의 차이, 소득공제 연 300만원의 40% 한도를 실전 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">월 납입 인정한도가 왜 25만원으로 올랐나요?</h2>
                <p>
                  2024년 11월부터 주택청약종합저축의 월 납입 인정한도가 기존 10만원에서 25만원으로 상향됐습니다. 공공분양(국민주택)은 매달 인정되는 납입액을 쌓아 순위를 정하는데, 오랫동안 월 10만원으로 묶여 있어 목돈이 있어도 인정액을 빨리 늘릴 수 없었습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2024년 11월 주요 변화</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 월 납입 인정한도: 10만원에서 25만원으로 상향
                    <br />
                    · 소득공제 한도: 연 240만원에서 300만원으로 확대
                    <br />
                    · 미성년 납입 인정 기간: 2년에서 5년으로 확대
                  </p>
                </div>
                <p className="mt-4">
                  다만 인정한도가 올랐다고 모두가 25만원을 넣어야 하는 것은 아닙니다. 노리는 주택 유형(공공분양 vs 민영주택)에 따라 유리한 납입 전략이 다릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공공분양과 민영주택, 무엇이 다른가요?</h2>
                <p>
                  청약통장 하나로 공공분양과 민영주택 모두에 청약할 수 있지만, 순위를 정하는 방식이 완전히 다릅니다. 이 차이를 알아야 매달 얼마를 넣을지 결정할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 공공분양 vs 민영주택 청약 방식 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공공분양(국민주택)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">민영주택</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">순위 기준</td>
                        <td className="p-3">납입 인정액·횟수</td>
                        <td className="p-3">예치금·가점</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">월 25만원 실익</td>
                        <td className="p-3">큼(인정액 빨리 축적)</td>
                        <td className="p-3">작음(예치금만 채우면 됨)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">핵심 전략</td>
                        <td className="p-3">매달 인정한도까지 성실 납입</td>
                        <td className="p-3">지역·면적별 예치금 충족</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 민영주택은 매달 납입 여부가 순위에 직접 영향을 주지 않으므로, 민영주택만 노린다면 25만원을 매달 넣을 실익은 크지 않습니다. 다만 소득공제 목적이라면 이야기가 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득공제, 얼마 넣어야 최대로 받나요?</h2>
                <p>
                  무주택 세대주이면서 총급여 7,000만원 이하인 근로자는 청약저축 납입액에 대해 소득공제를 받습니다(조세특례제한법 §87). 연 납입액 300만원 한도에서 40%를 공제하므로 최대 120만원까지 소득공제됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 월 25만원씩 1년 납입</p>
                  <p className="text-sm text-text-secondary">
                    · 연 납입액: 25만원 곱하기 12개월 = 300만원
                    <br />
                    · 소득공제 대상: 300만원 (한도와 일치)
                    <br />
                    · 소득공제액: 300만원 곱하기 40% = <strong>120만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">300만원을 넘겨 납입해도 소득공제 한도는 늘지 않습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 소득공제는 무주택 세대주 요건과 총급여 7,000만원 이하 요건을 충족해야 적용됩니다. 세대주가 아니거나 급여가 기준을 넘으면 소득공제를 받을 수 없으니, 본인 요건을 먼저 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">그래서 나는 얼마를 넣어야 하나요?</h2>
                <p>
                  목적에 따라 답이 달라집니다. 아래 기준으로 본인 상황을 판단해보세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>공공분양이 목표라면:</strong> 인정한도 상한인 월 25만원을 채워 인정액을 빠르게 쌓는 것이 순위 경쟁에 유리합니다.
                  </li>
                  <li>
                    <strong>소득공제가 목표라면:</strong> 무주택 세대주·총급여 7,000만원 이하라면 월 25만원(연 300만원)을 넣어 소득공제 120만원을 꽉 채우세요.
                  </li>
                  <li>
                    <strong>민영주택만 목표라면:</strong> 지역·면적별 예치금 기준만 맞추면 되므로, 여유가 없다면 소액 납입을 유지하고 예치금 시점을 관리하세요.
                  </li>
                  <li>
                    <strong>자녀 명의라면:</strong> 미성년 인정 기간이 5년으로 늘었으니 일찍 가입해 납입 이력을 쌓아두는 것이 유리합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 무리하게 25만원을 넣다가 중간에 납입을 멈추면 오히려 성실 납입 실적이 끊길 수 있습니다. 매달 꾸준히 유지할 수 있는 금액으로 설정하는 것이 장기적으로 유리합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">이자소득 비과세와 배우자 확대</h2>
                <p>
                  청년 등 요건을 충족하는 가입자는 청약저축 이자소득에 대한 비과세 혜택을 받을 수 있습니다. 또 소득공제·비과세 혜택 대상이 무주택 세대주뿐 아니라 배우자까지 확대 적용되는 방향으로 제도가 정비되고 있습니다.
                </p>
                <p className="mt-4">
                  다만 이자소득 비과세와 배우자 확대의 세부 요건·시행 시점은 개별 상품과 연도에 따라 다를 수 있습니다. 정확한 적용 여부는 청약홈과 가입 은행에서 본인·배우자 기준으로 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/housing-subscription-savings-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약저축 소득공제</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택 세대주 소득공제 요건과 한도를 자세히.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-first-priority-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택청약 1순위 조건</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간·납입횟수·예치금 1순위 요건 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-score-84-points-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 84점 만점</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택기간·부양가족·통장기간 가점 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/national-housing-bond-purchase-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민주택채권 매입</div>
                    <p className="mt-1 text-sm text-text-secondary">부동산 등기 시 채권 매입과 즉시 매도 방법.</p>
                  </Link>
                  <Link
                    href="/calculator/housing-subscription/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">내 청약가점을 항목별로 바로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예적금·청약 관련 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 재무·세무 조언이 아닙니다. 청약 순위 요건과 소득공제·비과세 적용 기준은 주택 유형·지역·소득에 따라 달라지고 제도가 개정될 수 있으므로, 청약홈과 가입 은행, 홈택스에서 본인 기준으로 반드시 확인하세요. 본 콘텐츠는 2026-07-27 기준으로 작성되었으며 제도 변경 시 업데이트됩니다. 소득공제 근거 법령은 조세특례제한법 §87(주택청약종합저축 등에 대한 소득공제)입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.applyhome.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">청약홈</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="청약통장 월 25만원, 인정한도 상향과 소득공제 300만원 정리"
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
