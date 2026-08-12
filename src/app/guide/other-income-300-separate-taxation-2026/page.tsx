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

const URL = 'https://calculatorhost.com/guide/other-income-300-separate-taxation-2026/';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 기타소득 분리과세 검색 의도 흡수)

export const metadata: Metadata = {
  title: '기타소득 300만원 분리과세 2026, 종합과세 뭐가 유리',
  description:
    '강연료·원고료 같은 기타소득은 연 기타소득금액 300만원 이하면 분리과세와 종합과세 중 유리한 쪽을 고를 수 있습니다. 300만원 기준의 의미, 필요경비 60% 의제, 세율 비교를 소득세법 §14 기준으로 정리했습니다.',
  keywords: [
    '기타소득 300만원',
    '기타소득 분리과세',
    '기타소득 종합과세',
    '강연료 원고료 세금',
    '기타소득 필요경비 60',
    '기타소득 22%',
    '소득세법 14조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '기타소득 300만원 분리과세 2026, 종합과세 뭐가 유리' }],
    title: '기타소득 300만원 분리과세 2026, 종합과세와 비교',
    description: '기타소득금액 300만원 이하는 분리과세와 종합과세 선택 가능. 필요경비 60% 의제와 세율 비교로 유리한 쪽 고르기.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '기타소득 300만원 분리과세 2026',
    description: '기타소득금액 300만원 이하면 분리과세와 종합과세 중 선택. 소득세법 §14 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '기타소득이 300만원을 넘으면 어떻게 되나요?',
    answer:
      '기타소득금액이 연 300만원을 초과하면 다른 종합소득과 반드시 합산해 종합과세됩니다(소득세법 §14). 300만원 이하일 때만 분리과세와 종합과세 중 유리한 쪽을 선택할 수 있습니다. 여기서 300만원은 총수입금액이 아니라 필요경비를 뺀 기타소득금액 기준입니다.',
  },
  {
    question: '300만원은 받은 돈 기준인가요, 경비를 뺀 금액인가요?',
    answer:
      '필요경비를 뺀 기타소득금액 기준입니다. 예를 들어 강연료·원고료는 필요경비 60%가 의제로 인정되므로, 실제 받은 총수입금액이 750만원이면 필요경비 450만원을 뺀 기타소득금액은 300만원입니다. 따라서 750만원까지는 분리과세 선택이 가능한 셈입니다.',
  },
  {
    question: '필요경비 60% 의제란 무엇인가요?',
    answer:
      '일부 기타소득은 실제 쓴 경비를 증빙하지 않아도 총수입금액의 60%를 필요경비로 자동 인정해줍니다. 강연료, 원고료, 인세, 자문료 등이 대표적입니다. 즉 100만원을 받으면 60만원을 경비로 빼고 40만원만 기타소득금액이 됩니다. 실제 경비가 60%보다 크면 증빙해서 더 뺄 수도 있습니다.',
  },
  {
    question: '분리과세와 종합과세 중 무엇이 유리한가요?',
    answer:
      '본인의 종합소득 세율 구간에 달려 있습니다. 기타소득 분리과세 세율은 22%(원천징수세율 20% + 지방소득세 2%)입니다. 다른 소득과 합산했을 때 적용 세율이 6%나 15%로 낮다면 종합과세가 유리하고, 24% 이상으로 높다면 분리과세가 유리합니다.',
  },
  {
    question: '분리과세를 선택하면 신고를 안 해도 되나요?',
    answer:
      '네, 분리과세를 선택하면 이미 원천징수된 세금으로 납세가 종결되므로 별도의 종합소득세 신고가 필요 없습니다. 반대로 종합과세가 유리하다고 판단되면 5월 종합소득세 신고 때 다른 소득과 합산해 신고하고, 원천징수된 세액을 정산받으면 됩니다.',
  },
  {
    question: '무조건 분리과세되는 기타소득도 있나요?',
    answer:
      '네, 복권 당첨금, 승마·경륜 환급금 등은 금액과 무관하게 무조건 분리과세됩니다. 반대로 뇌물·알선수재 등은 무조건 종합과세됩니다. 선택이 가능한 것은 이런 무조건 분리·종합과세 대상을 제외한 일반 기타소득 중 기타소득금액 300만원 이하인 경우입니다.',
  },
  {
    question: '기타소득에는 어떤 것들이 있나요?',
    answer:
      '상금·포상금, 복권 당첨금, 강연료·원고료·인세, 자문료, 영업권 등 무형자산 양도대가, 위약금·배상금, 사례금 등이 대표적입니다. 일시적·우발적으로 발생하는 소득이 기타소득이며, 반복적·계속적으로 발생하면 사업소득으로 분류될 수 있어 구분이 중요합니다.',
  },
  {
    question: '기타소득 원천징수는 어떻게 되나요?',
    answer:
      '기타소득을 지급하는 쪽이 기타소득금액의 20%(지방소득세 포함 22%)를 원천징수해 세무서에 납부합니다. 예를 들어 강연료 100만원(필요경비 60% 의제 후 기타소득금액 40만원)이면 40만원의 22%인 8만8천원이 원천징수되고 91만2천원을 받습니다.',
  },
];

export default function OtherIncome300SeparateTaxation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '기타소득 300만원 분리과세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '기타소득 300만원 분리과세 2026, 종합과세 뭐가 유리',
    description:
      '기타소득금액 300만원 이하면 분리과세와 종합과세 중 선택 가능. 300만원 기준의 의미, 필요경비 60% 의제, 세율 비교와 계산 사례를 소득세법 §14 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['기타소득', '분리과세', '종합과세', '필요경비 60%', '강연료'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '기타소득 300만원 분리과세 2026',
    description: '기타소득 300만원 기준의 분리과세·종합과세 선택을 정리한 가이드.',
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
                    { name: '기타소득 300만원 분리과세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">프리랜서·N잡러·강연자 · 8분 읽기 · 2026-07-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  기타소득 300만원 분리과세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">종합과세와 비교해 유리한 쪽 고르기</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  강연을 하거나 글을 기고하고 받은 강연료·원고료는 기타소득입니다. 이 기타소득은 연간 금액이 일정 기준 이하이면 세금을 낼 때 분리과세와 종합과세 중 유리한 쪽을 스스로 고를 수 있습니다. 이 가이드는 그 기준선인 300만원이 무엇을 의미하는지, 필요경비 60% 의제는 어떻게 적용되는지, 그리고 나에게는 분리과세와 종합과세 중 어느 쪽이 유리한지를 계산 사례로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기타소득 300만원 기준이란 무엇인가요?</h2>
                <p>
                  기타소득금액이 연 300만원 이하이면 분리과세와 종합과세 중 유리한 쪽을 선택할 수 있다는 뜻입니다(소득세법 §14). 300만원을 초과하면 선택권이 사라지고 다른 종합소득과 반드시 합산해 신고해야 합니다. 여기서 중요한 것은 300만원이 받은 돈 전체가 아니라 필요경비를 뺀 기타소득금액이라는 점입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">300만원 기준 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 기준: 기타소득금액 = 총수입금액 − 필요경비
                    <br />
                    · 300만원 이하: 분리과세와 종합과세 중 선택 가능
                    <br />
                    · 300만원 초과: 종합과세 강제 (다른 소득과 합산)
                    <br />
                    · 분리과세 세율: 22% (원천징수 20% + 지방소득세 2%)
                  </p>
                </div>
                <p className="mt-4">
                  다만 복권 당첨금처럼 무조건 분리과세되는 소득과 뇌물처럼 무조건 종합과세되는 소득은 이 선택 규칙에서 제외됩니다. 선택이 가능한 것은 일반적인 기타소득 중 기타소득금액이 300만원 이하인 경우입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">필요경비 60% 의제는 어떻게 계산하나요?</h2>
                <p>
                  강연료·원고료 같은 일부 기타소득은 실제 경비를 증빙하지 않아도 총수입금액의 60%를 필요경비로 자동 인정합니다. 따라서 기타소득금액은 받은 돈의 40%가 됩니다. 이 60% 의제 덕분에 300만원 기준선이 실제로는 총수입 750만원까지 확장됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 총수입금액별 기타소득금액 (필요경비 60% 의제)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">받은 총수입</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">필요경비(60%)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기타소득금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">선택 가능</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">500만원</td>
                        <td className="p-3">300만원</td>
                        <td className="p-3">200만원</td>
                        <td className="p-3">가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">750만원</td>
                        <td className="p-3">450만원</td>
                        <td className="p-3"><strong>300만원</strong></td>
                        <td className="p-3">가능(경계)</td>
                      </tr>
                      <tr>
                        <td className="p-3">800만원</td>
                        <td className="p-3">480만원</td>
                        <td className="p-3">320만원</td>
                        <td className="p-3">종합과세 강제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 필요경비 60% 의제가 적용되는 소득 종류는 정해져 있습니다. 모든 기타소득에 60%가 적용되는 것은 아니며, 위약금·배상금 등은 다른 경비 규칙을 따르므로 국세청 안내로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분리과세와 종합과세, 계산으로 비교하면?</h2>
                <p>
                  결론부터 말하면 본인의 종합소득 세율 구간이 낮을수록 종합과세가 유리합니다. 분리과세는 22% 단일 세율이지만, 종합과세는 다른 소득과 합쳐 6~45% 누진세율이 적용되기 때문입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 소득이 적은 프리랜서 (기타소득금액 200만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 강연료 총수입 500만원, 필요경비 60%(300만원)를 빼면 기타소득금액 200만원
                    <br />
                    · 분리과세: 200만 × 22% = 44만원
                    <br />
                    · 종합과세: 다른 소득이 적어 6% 구간이면 200만 × 6.6% = 약 13만원
                    <br />
                    · 결론: <strong>종합과세가 유리</strong> (원천징수된 44만원 중 일부 환급)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 고소득 직장인의 부수입 (기타소득금액 300만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 원고료 총수입 750만원, 필요경비 60%(450만원)를 빼면 기타소득금액 300만원
                    <br />
                    · 분리과세: 300만 × 22% = 66만원
                    <br />
                    · 종합과세: 이미 연봉으로 35% 구간이면 300만 × 38.5% = 약 115만원
                    <br />
                    · 결론: <strong>분리과세가 유리</strong> (신고 없이 원천징수로 종결)
                  </p>
                </div>
                <p className="mt-4">
                  경계 비교: 같은 기타소득금액이라도 사례 1은 종합과세, 사례 2는 분리과세가 유리합니다. 갈림길은 다른 소득까지 합산한 한계세율이 22%보다 낮은지 높은지입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 선택하고 신고하나요?</h2>
                <p>
                  분리과세를 선택하면 별도 신고 없이 원천징수로 납세가 끝납니다. 반면 종합과세가 유리하다고 판단되면 5월 종합소득세 신고 때 기타소득을 다른 소득과 합산해 신고하고, 이미 원천징수된 세액을 정산해 환급받습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>1단계 계산:</strong> 기타소득금액이 300만원 이하인지 필요경비를 뺀 뒤 확인합니다.
                  </li>
                  <li>
                    <strong>2단계 비교:</strong> 다른 소득과 합산한 한계세율이 22%보다 낮으면 종합과세, 높으면 분리과세가 유리합니다.
                  </li>
                  <li>
                    <strong>3단계 신고:</strong> 종합과세가 유리하면 5월 신고 때 합산 신고, 분리과세가 유리하면 신고를 생략합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 종합과세를 선택해 신고하면 기타소득이 건강보험료 등 다른 부과 기준에 영향을 줄 수 있으므로, 세금만이 아니라 전체 부담을 함께 고려하는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">3.3% 원천징수와 종합소득세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/other-income-necessary-expense-60-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기타소득 필요경비 60%</div>
                    <p className="mt-1 text-sm text-text-secondary">필요경비 의제가 적용되는 소득과 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/business-income-vs-other-income-classification-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업소득 vs 기타소득 구분</div>
                    <p className="mt-1 text-sm text-text-secondary">반복성 여부로 갈리는 소득 분류 기준.</p>
                  </Link>
                  <Link
                    href="/guide/n-jobber-comprehensive-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">N잡러 종합소득세</div>
                    <p className="mt-1 text-sm text-text-secondary">본업 외 부수입이 있을 때 신고 방법.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세율 구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">6~45% 누진세율과 누진공제를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·부가세·양도세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 분리·종합과세 선택의 유불리는 본인의 전체 소득과 세율 구간, 건강보험료 등 부수적 영향에 따라 달라지므로 국세청 홈택스 또는 세무 전문가로 확인하세요. 본 콘텐츠는 2026-07-26을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>소득세법 §14(과세표준의 계산), §21(기타소득), §84(기타소득의 과세최저한)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(종합·분리과세)</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="기타소득 300만원 분리과세 2026 가이드"
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
