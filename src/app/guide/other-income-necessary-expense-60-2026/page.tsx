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

const URL = 'https://calculatorhost.com/guide/other-income-necessary-expense-60-2026/';
const DATE_PUBLISHED = '2026-07-13';
const DATE_MODIFIED = '2026-07-13';

export const metadata: Metadata = {
  title: '기타소득 필요경비 60% 2026, 강연료·원고료 세금과 8.8% 원천징수',
  description:
    '강연료·원고료·자문료 같은 기타소득은 증빙 없이 60% 필요경비가 인정돼 8.8%만 원천징수됩니다. 기타소득금액 300만원 이하 분리과세 선택 기준과 절세 계산을 소득세법 §21로 정리합니다.',
  keywords: [
    '기타소득 필요경비',
    '기타소득 60%',
    '강연료 세금',
    '원고료 원천징수',
    '기타소득 300만원 분리과세',
    '8.8% 원천징수',
    '소득세법 21조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '기타소득 필요경비 60% 2026 강연료 원고료 세금' }],
    title: '기타소득 필요경비 60% 2026, 강연료·원고료 세금 완전정리',
    description: '강연료·원고료 등 기타소득은 60% 필요경비 인정으로 실효 8.8% 원천징수. 300만원 이하 분리과세 선택으로 절세.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '기타소득 필요경비 60% 2026, 강연료·원고료 세금',
    description: '강연료·원고료 기타소득 60% 경비 인정, 8.8% 원천징수. 기타소득금액 300만원 이하 분리과세. 소득세법 §21.',
  },
};

const FAQ_ITEMS = [
  {
    question: '기타소득 필요경비 60%는 어떤 소득에 적용되나요?',
    answer:
      '강연료, 원고료, 인세, 자문료, 방송출연료, 창작물 사용료 등 일시적·우발적 인적용역 기타소득에 60% 필요경비가 인정됩니다(소득세법 시행령 §87). 실제 지출 증빙이 없어도 수입의 60%를 경비로 빼주므로, 세금이 부과되는 기타소득금액은 수입의 40%뿐입니다.',
  },
  {
    question: '기타소득 원천징수 세율이 왜 8.8%인가요?',
    answer:
      '기타소득 원천징수 세율은 소득금액 기준 20%지만(소득세법 §129), 필요경비 60%를 뺀 40%에만 과세되기 때문입니다. 결국 수입 대비 실효세율은 20% × 40% = 8%이고, 여기에 지방소득세 0.8%를 더해 8.8%가 원천징수됩니다.',
  },
  {
    question: '기타소득 300만원 기준은 무엇인가요?',
    answer:
      '연간 기타소득금액(수입에서 필요경비를 뺀 금액) 합계가 300만원 이하면 분리과세와 종합과세 중 유리한 쪽을 선택할 수 있습니다(소득세법 §14 ③ 8호). 이미 8.8%가 원천징수됐다면 그것으로 납세가 끝나므로 종합소득세 신고를 안 해도 됩니다.',
  },
  {
    question: '기타소득금액 300만원은 수입 얼마에 해당하나요?',
    answer:
      '필요경비 60%가 인정되는 기타소득이라면 수입 750만원입니다. 수입 750만원 × 40% = 기타소득금액 300만원이기 때문입니다. 즉 강연·원고 부수입이 연 750만원 이하라면 분리과세를 선택해 종합과세 합산을 피할 수 있습니다.',
  },
  {
    question: '분리과세와 종합과세 중 뭐가 유리한가요?',
    answer:
      '본업 소득이 많아 세율이 높으면 분리과세(8.8%)가 유리합니다. 반대로 다른 소득이 적어 종합소득세 최저 세율(6.6%) 구간이라면 종합과세로 신고해 원천징수분을 일부 환급받을 수 있습니다. 300만원 이하일 때만 선택권이 있고, 초과하면 무조건 종합과세됩니다.',
  },
  {
    question: '기타소득도 종합소득세 신고를 해야 하나요?',
    answer:
      '기타소득금액이 연 300만원을 초과하면 다음해 5월 종합소득세 신고 시 반드시 합산해야 합니다. 300만원 이하라도 종합과세가 유리하면 신고해 환급받을 수 있습니다. 신고 대상인데 누락하면 무신고·과소신고 가산세가 붙으니 주의하세요.',
  },
  {
    question: '경조사비나 사례금도 기타소득인가요?',
    answer:
      '상금·현상금·복권당첨금, 사례금, 위약금, 서화·골동품 양도소득 등이 기타소득에 해당합니다(소득세법 §21). 다만 항목마다 필요경비율이 달라, 강연료처럼 60%가 인정되는 것도 있고 실제 경비만 인정되는 것도 있으니 항목을 정확히 구분해야 합니다.',
  },
  {
    question: '사업적으로 반복되는 강연도 기타소득인가요?',
    answer:
      '아닙니다. 강연이 계속적·반복적이면 사업소득으로 봅니다(소득세법 §19). 기타소득은 일시적·우발적 소득에 한합니다. 실질과세 원칙(국세기본법 §14)에 따라 소득 구분은 실제 반복성으로 판단하므로, 전업 강사라면 사업소득으로 신고해야 합니다.',
  },
];

export default function OtherIncomeNecessaryExpense602026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '기타소득 필요경비 60% 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '기타소득 필요경비 60% 2026, 강연료·원고료 세금 완전정리',
    description:
      '강연료·원고료·자문료 등 기타소득의 60% 필요경비, 실효 8.8% 원천징수, 기타소득금액 300만원 이하 분리과세 선택, 종합과세 유불리까지 소득세법 §21 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['기타소득', '필요경비 60%', '강연료', '원고료', '분리과세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '기타소득 필요경비 60% 2026',
    description:
      '강연료·원고료 기타소득 60% 필요경비, 8.8% 원천징수, 300만원 분리과세 선택 기준 정리.',
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
                    { name: '기타소득 필요경비 60% 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부업·프리랜서 · 8분 읽기 · 2026-07-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  기타소득 필요경비 60% 2026
                  <br />
                  <span className="text-2xl text-text-secondary">강연료·원고료 세금과 8.8% 원천징수</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  강연을 한 번 하거나, 원고를 기고하거나, 자문에 응하고 받는 돈은 기타소득으로 잡힙니다. 이때 세금이 생각보다 적은데, 그 이유가 바로 필요경비 60%를 증빙 없이 빼주기 때문입니다. 이 가이드는 어떤 부수입이 60% 경비를 인정받는지, 실효세율이 왜 8.8%인지, 그리고 연 750만원(기타소득금액 300만원)이라는 절세 분기점을 소득세법 조문으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-other-income-necessary-expense-60-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기타소득이란 무엇인가</h2>
                <p>
                  기타소득은 이자·배당·사업·근로·연금·퇴직·양도 소득에 속하지 않는 일시적·우발적 소득입니다(소득세법 §21). 강연료, 원고료, 인세, 자문료, 방송출연료, 상금, 사례금, 위약금 등이 여기에 해당합니다. 핵심은 이 소득이 계속·반복적이지 않다는 점입니다. 반복되면 사업소득이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">필요경비 60% 자동 인정</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    강연료·원고료·자문료 등 인적용역 기타소득은 실제 지출 증빙이 없어도 수입의 60%를 필요경비로 인정합니다(소득세법 시행령 §87).
                    <br />
                    → 과세 대상 기타소득금액 = 수입 × 40%
                    <br />
                    예: 강연료 100만원 → 기타소득금액 40만원만 과세
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 모든 기타소득에 60%가 적용되는 것은 아닙니다. 상금·복권당첨금 등은 항목별로 경비율이 다르고, 서화·골동품 양도는 별도 규정을 따릅니다. 60%는 강연·원고·자문 같은 인적용역과 일부 무형자산 대여·양도에 한정된다는 점을 기억하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">원천징수는 왜 8.8%인가</h2>
                <p>
                  기타소득 지급자는 소득금액의 20%를 원천징수합니다(소득세법 §129). 그런데 필요경비 60%를 빼고 남은 40%만 소득금액이므로, 수입 기준 실효세율은 20% × 40% = 8%입니다. 여기에 지방소득세 10%(즉 0.8%)를 더해 실제로는 8.8%가 떼입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 기타소득 원천징수 구조 (소득세법 §129, 시행령 §87)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계산</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">결과(수입 100만원)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">필요경비</td>
                        <td className="p-3">수입 × 60%</td>
                        <td className="p-3">60만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기타소득금액</td>
                        <td className="p-3">수입 × 40%</td>
                        <td className="p-3">40만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소득세(20%)</td>
                        <td className="p-3">기타소득금액 × 20%</td>
                        <td className="p-3">8만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지방소득세(10%)</td>
                        <td className="p-3">소득세 × 10%</td>
                        <td className="p-3">0.8만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">실수령</td>
                        <td className="p-3">수입 - 8.8%</td>
                        <td className="p-3"><strong>91.2만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 8.8%는 원천징수 단계의 세율일 뿐, 최종 세금이 아닐 수 있습니다. 기타소득금액이 300만원을 넘으면 종합과세로 정산되므로 세율이 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">300만원 분기점과 절세 사례</h2>
                <p>
                  연간 기타소득금액이 300만원 이하면 분리과세(원천징수로 종결)와 종합과세 중 선택할 수 있습니다(소득세법 §14 ③ 8호). 60% 경비가 인정되는 소득 기준으로 수입 750만원이 분기점입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 강연료 연 500만원 (고소득 직장인)</p>
                  <p className="text-sm text-text-secondary">
                    · 기타소득금액: 500만원 × 40% = 200만원 (300만원 이하)
                    <br />
                    · 원천징수액: 500만원 × 8.8% = 44만원
                    <br />
                    · 본업 세율 35% 구간 → 분리과세(8.8%) 선택이 유리
                    <br />
                    · 최종: 44만원으로 납세 종결, 종합소득세 신고 불필요
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 본업 세율이 높을수록 분리과세로 끝내는 게 이득.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 원고료 연 400만원 (다른 소득 적은 프리랜서)</p>
                  <p className="text-sm text-text-secondary">
                    · 기타소득금액: 400만원 × 40% = 160만원 (300만원 이하)
                    <br />
                    · 원천징수액: 400만원 × 8.8% = 35.2만원
                    <br />
                    · 다른 소득 합쳐도 종합소득 6% 구간 → 종합과세 선택 시 환급 가능
                    <br />
                    · 5월 종합소득세 신고로 일부 환급
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 저소득이면 종합과세로 신고해 원천징수분을 돌려받자.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 자문료 연 1,000만원 (300만원 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 기타소득금액: 1,000만원 × 40% = 400만원 (300만원 초과)
                    <br />
                    · 선택권 없음 → 무조건 종합과세 합산
                    <br />
                    · 5월 종합소득세 신고 시 본업 소득과 합산해 누진세율 적용
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 기타소득금액 300만원 초과는 반드시 종합과세 신고 대상.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-other-income-necessary-expense-60-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업소득과 어떻게 구분하나</h2>
                <p>
                  같은 강연이라도 반복성에 따라 세목이 달라집니다. 일시적이면 기타소득, 계속·반복적이면 사업소득입니다(소득세법 §19·§21). 전업 강사·전업 작가는 사업소득으로 봐야 하며, 이 경우 60% 정률경비가 아니라 실제 경비 또는 경비율 방식으로 신고합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>기타소득:</strong> 본업이 따로 있는 직장인이 어쩌다 한 강연, 우연히 기고한 원고. 필요경비 60% 인정.
                  </li>
                  <li>
                    <strong>사업소득:</strong> 강연·집필을 직업으로 반복하는 경우. 3.3% 원천징수 후 종합소득세로 정산.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 지급처가 3.3%(사업소득)로 뗐는지 8.8%(기타소득)로 뗐는지 원천징수영수증을 꼭 확인하세요. 세목이 잘못 처리되면 5월 신고에서 정정해야 하며, 실질과세 원칙(국세기본법 §14)상 실제 반복성으로 최종 판단됩니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">부수입 세금에서 놓치기 쉬운 함정</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>합산 누락:</strong> 여러 곳에서 받은 기타소득금액을 합쳐 300만원을 넘는데 각각 소액이라 방심하면 무신고가 됩니다. 연간 합계로 판단하세요.
                  </li>
                  <li>
                    <strong>건강보험료 영향:</strong> 종합과세로 합산되면 지역가입자 건강보험료 산정 소득에 반영될 수 있습니다. 피부양자라면 자격 탈락 여부도 확인하세요.
                  </li>
                  <li>
                    <strong>경비율 착오:</strong> 상금·복권 등은 60%가 아니라 다른 규정을 적용합니다. 강연·원고·자문이 아닌 항목은 개별 확인이 필요합니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/business-income-vs-other-income-classification-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업소득 vs 기타소득 구분</div>
                    <p className="mt-1 text-sm text-text-secondary">3.3%와 8.8%, 어느 세목으로 처리해야 하나.</p>
                  </Link>
                  <Link
                    href="/guide/n-jobber-comprehensive-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">N잡러 종합소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">부업 소득 합산 신고와 5월 정산 요령.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 실수령</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소득 원천징수와 환급 구조.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 세율 구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">6~45% 누진세율과 누진공제 계산.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세자 부가가치세</div>
                    <p className="mt-1 text-sm text-text-secondary">부수입이 사업 규모가 되면 알아야 할 부가세.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">원천징수 후 환급·추가납부 예측.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 소득 구분(기타소득 vs 사업소득), 필요경비율, 분리·종합과세 선택은 개인 상황에 따라 달라지므로 홈택스 또는 세무 전문가와 확인하세요. 본 콘텐츠는 2026-07-13 기준으로 작성되었으며, 소득세법 개정 시 업데이트됩니다. 인용 조문: <strong>소득세법 §19(사업소득), §21(기타소득), §37(기타소득 필요경비), §14 ③ 8호(분리과세), §129(원천징수세율), 시행령 §87(필요경비율), 국세기본법 §14(실질과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="기타소득 필요경비 60% 2026 가이드"
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
