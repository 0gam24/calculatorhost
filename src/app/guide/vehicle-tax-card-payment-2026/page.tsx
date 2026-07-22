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

const URL = 'https://calculatorhost.com/guide/vehicle-tax-card-payment-2026/';
const DATE_PUBLISHED = '2026-06-28';
const DATE_MODIFIED = '2026-06-28';

export const metadata: Metadata = {
  title: '자동차세 카드납부·연납 할인 2026 — 무이자·할인 받는 법',
  description:
    '자동차세는 신용카드 납부 수수료 무료, 무이자 할부 가능. 1월 연납 시 5% 공제율(신청월별 실효율 4.81% ~ 1.67%). 위택스·지역 앱에서 신청. 카드사별 캐시백 혜택 확인 필수.',
  keywords: [
    '자동차세 카드납부',
    '자동차세 연납 할인',
    '1월 자동차세 연납',
    '자동차세 무이자 할부',
    '위택스 납부',
    '자동차세 할인받기',
    '지방세법 125조',
    '자동차세 6월 납부',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '자동차세 카드납부·연납 할인 2026' }],
    title: '자동차세 카드납부·연납 할인 2026 — 무이자·할인 받는 법',
    description: '신용카드 수수료 무료 납부 + 1월 연납 5% 할인. 신청 기간·방법·카드 혜택 완전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차세 카드납부·연납 할인 2026',
    description: '신용카드 수수료 없음 + 1월 연납 5% 할인받기. 위택스 신청 방법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자동차세를 신용카드로 내면 수수료가 있나요?',
    answer:
      '지방세(자동차세 포함)는 신용카드 납부 수수료가 무료입니다. 위택스, 지역 앱, 세무서에서 신용카드 결제 가능합니다. 다만 카드사별로 무이자 할부·캐시백 혜택이 있는지는 카드사에 문의하세요.',
  },
  {
    question: '자동차세 연납 신청 기간은 언제인가요?',
    answer:
      '연납은 매년 1월 1일~31일에만 신청 가능합니다(지방세법 시행령 §125). 1월을 놓치면 6월·12월 정기 납부가 기본입니다. 이후 신청은 연납 할인을 받을 수 없습니다.',
  },
  {
    question: '1월 연납 할인이 정확히 얼마나 되나요?',
    answer:
      '공제율 5%에서 신청월별 선납 일수에 비례합니다. 1월 신청 시 실효율 약 4.81%, 3월 약 3.74%, 6월 약 2.93%. 예: 연세액 40만원 × 4.81% ≈ 1.9만원 할인.',
  },
  {
    question: '자동차세 무이자 할부는 어떻게 신청하나요?',
    answer:
      '신용카드 결제 시 카드사의 무이자 할부 이벤트(보통 2~6개월)를 선택하면 됩니다. 기간·조건은 카드사별로 다르므로 본인 카드의 2026년 이벤트를 확인하세요. 무이자 이벤트가 아니면 카드사·개월수별 할부 수수료가 부과될 수 있습니다.',
  },
  {
    question: '연납 후 차량을 팔면 어떻게 되나요?',
    answer:
      '연납 후 차량을 양도하면 미경과 기간에 해당하는 세액을 일할계산하여 환급받습니다. 예: 1월에 연납한 뒤 6월 중 양도하면 양도일 다음 날부터 12월 31일까지의 미경과분이 환급 대상이며, 정확한 금액은 위택스·관할 지자체에서 확인할 수 있습니다.',
  },
  {
    question: '위택스에서 연납 신청은 어떻게 하나요?',
    answer:
      '위택스(wetax.go.kr)에 로그인 후 "자동차세" → "연납" 메뉴에서 차량번호와 납부 계좌를 입력한 후 신청합니다. 24시간 온라인으로 가능합니다. 스마트 위택스 앱에서도 가능합니다.',
  },
  {
    question: '6월 정기 납부와 1월 연납 중 뭐가 나을까요?',
    answer:
      '1월 연납이 약 4.81% 절감되므로 대부분의 경우 유리합니다. 단, 차량 양도 예정이 있으면 미리 계산해 비교하세요. 또한 카드사 무이자 할부 이벤트가 6월에만 있다면 그것도 고려 대상입니다.',
  },
];

export default function VehicleTaxCardPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차세 카드납부·연납 할인 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차세 카드납부·연납 할인 2026 — 무이자·할인 받는 법',
    description: '자동차세 신용카드 납부(수수료 무료) + 1월 연납 5% 할인(신청월별 실효율 4.81% ~ 1.67%) + 무이자 할부 전략. 위택스·지역 앱 신청 방법 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차세 카드납부', '연납 할인', '무이자 할부', '위택스'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차세 카드납부·연납 할인 2026',
    description: '자동차세 신용카드 수수료 무료 납부 + 1월 연납 5% 할인받는 방법. 신청 기간·과정·카드 혜택 정리.',
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
                    { name: '자동차세 카드납부·연납 할인 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·자동차 · 6분 읽기 · 2026-06-28</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차세 카드납부·연납 할인
                  <br />
                  <span className="text-2xl text-text-secondary">— 무이자·할인 받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자동차세는 지방세로서 신용카드 납부 수수료가 무료입니다(국세와 달리 지방세는 카드 납부 수수료가 없음). 더욱이 1월에 연간 자동차세 전액을 미리 내면 <strong>5% 공제율(지방세법 시행령 §125)</strong>을 받을 수 있으며, 신청 시기에 따라 실제 할인율은 약 4.81%~1.67% 범위입니다. 또한 카드사의 무이자 할부 이벤트를 활용하면 현금 흐름도 개선할 수 있습니다.
                </p>
              </header>

              <AdSlot slot="guide-vehicle-tax-card-payment-2026-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li><strong>신용카드 수수료:</strong> 무료 (지방세는 수수료 정책 다름)</li>
                  <li><strong>1월 연납 할인:</strong> 5% 공제율 (선납 일수 비례) (지방세법 시행령 §125)</li>
                  <li><strong>신청월별 실효율:</strong> 1월 약 4.81% / 3월 약 3.74% / 6월 약 2.93% / 9월 약 1.67%</li>
                  <li><strong>무이자 할부:</strong> 카드사별 이벤트(보통 2~6개월) — 본인 카드 혜택 확인</li>
                  <li><strong>신청처:</strong> 위택스(wetax.go.kr) / 스마트 위택스 앱 / 시·군청 세무서 / 지역 앱</li>
                  <li>⏰ <strong>신청 기간:</strong> 1월 1~31일만 가능 (이후 6월·12월 정기 납부만 가능)</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">신용카드 납부 — 수수료 무료</h2>
                <p className="mb-3 text-sm text-text-secondary">지방세인 자동차세는 국세(소득세·법인세)와 달리 신용카드 수수료가 없습니다.</p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mb-4 text-sm">
                  <p className="text-text-primary font-semibold mb-2">자동차세 카드납부 방식</p>
                  <ul className="text-text-secondary space-y-2 list-disc list-inside">
                    <li><strong>납부 수수료:</strong> 0원 (무료)</li>
                    <li><strong>할부:</strong> 카드사별 무이자 할부 가능 (보통 2~6개월)</li>
                    <li><strong>할부 수수료:</strong> 무이자 이벤트 시 0원, 아니면 카드사·개월수별 할부 수수료 발생</li>
                    <li><strong>캐시백:</strong> 카드사별 캐시백 이벤트 확인 (기간·규모 상이)</li>
                  </ul>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="caption-top mb-2 text-text-secondary">지방세 vs 국세 카드납부 수수료 비교</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">세목</th>
                        <th className="px-3 py-2 text-left">납부 수수료</th>
                        <th className="px-3 py-2 text-left">무이자 할부</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-bold">지방세 (자동차세·취득세·재산세 등)</td>
                        <td className="px-3 py-2"><strong className="text-highlight-700 dark:text-highlight-300">무료</strong></td>
                        <td className="px-3 py-2">카드사 무이자 할부 이벤트 활용 가능</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">국세 (소득세·부가세 등)</td>
                        <td className="px-3 py-2">약 0.8% (신용카드 납부대행 수수료, 본인 부담)</td>
                        <td className="px-3 py-2">카드사 이벤트에 따라 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4 text-sm">
                  <strong className="text-highlight-700 dark:text-highlight-300">주의: 카드사 혜택은 시기별로 다름</strong>
                  <p className="text-text-secondary mt-2">
                    신용카드 무이자 할부·캐시백은 카드사와 시점에 따라 다릅니다. 1월(연납 신청), 6월(정기 납부) 전에 본인 카드 앱을 확인하고 어떤 혜택이 있는지 미리 알아보세요.
                  </p>
                </div>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">1월 연납 할인 — 5% 공제율</h2>
                <p className="mb-3 text-sm text-text-secondary">지방세법 시행령 §125 — 1월에 연간 자동차세를 모두 미리 내면 공제율을 받습니다.</p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mb-4 text-sm">
                  <p className="text-text-primary font-semibold mb-2">연납 공제 방식</p>
                  <p className="text-text-secondary font-mono bg-bg-base p-2 rounded mb-2">공제액 = 연간 총액 × (선납일수 / 365일) × 5% 공제율</p>
                  <p className="text-text-secondary">신청이 늦을수록 선납 일수가 줄어들어 공제액도 함께 감소합니다. 따라서 가장 이른 1월 1일 신청이 최대 절감입니다.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="caption-top mb-2 text-text-secondary">신청월별 실효 할인율 (지방세법 시행령 §125)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">신청 시기</th>
                        <th className="px-3 py-2 text-right">선납 일수</th>
                        <th className="px-3 py-2 text-right">실효 할인율</th>
                        <th className="px-3 py-2 text-left">예시 (40만원)</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-bold">1월 신청 ⭐</td>
                        <td className="px-3 py-2 text-right">351일</td>
                        <td className="px-3 py-2 text-right font-bold text-primary-700 dark:text-primary-300">약 4.81%</td>
                        <td className="px-3 py-2 tabular-nums">약 1.92만원 할인</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">3월 신청</td>
                        <td className="px-3 py-2 text-right">273일</td>
                        <td className="px-3 py-2 text-right">약 3.74%</td>
                        <td className="px-3 py-2 tabular-nums">약 1.50만원 할인</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">6월 신청</td>
                        <td className="px-3 py-2 text-right">214일</td>
                        <td className="px-3 py-2 text-right">약 2.93%</td>
                        <td className="px-3 py-2 tabular-nums">약 1.17만원 할인</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">9월 신청</td>
                        <td className="px-3 py-2 text-right">122일</td>
                        <td className="px-3 py-2 text-right">약 1.67%</td>
                        <td className="px-3 py-2 tabular-nums">약 0.67만원 할인</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4 text-sm">
                  <strong className="text-highlight-700 dark:text-highlight-300">예시: 연세액 52만원인 경우</strong>
                  <ul className="text-text-secondary mt-2 space-y-1 list-disc list-inside">
                    <li><strong>1월 신청:</strong> 52만 × 4.81% = 약 2.5만원 할인 → 약 49.5만원 납부</li>
                    <li><strong>3월 신청:</strong> 52만 × 3.74% = 약 1.9만원 할인 → 약 50.1만원 납부</li>
                    <li><strong>6월 신청:</strong> 52만 × 2.93% = 약 1.5만원 할인 → 약 50.5만원 납부</li>
                  </ul>
                </div>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">카드 무이자 할부 + 연납 할인 조합</h2>
                <p className="mb-3 text-sm text-text-secondary">신용카드 무이자 할부와 연납 할인을 함께 활용할 수 있습니다.</p>
                <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4 mb-4 text-sm">
                  <p className="text-text-primary font-semibold mb-3">절감 전략 예시</p>
                  <p className="text-text-secondary mb-3">연세액: 52만원</p>
                  <div className="space-y-2">
                    <div className="bg-bg-card p-3 rounded">
                      <p className="text-text-primary font-semibold">방법 1: 1월 연납 + 신용카드 무이자 6개월 할부</p>
                      <ul className="text-text-secondary text-xs mt-2 space-y-1 list-disc list-inside">
                        <li>연납 할인: 52만 × 4.81% = 약 2.5만원 절감</li>
                        <li>결제액: 약 49.5만원을 6개월 무이자 할부로 월 약 8.2만원</li>
                        <li><strong>총 절감: 약 2.5만원</strong> (수수료 0% 가정)</li>
                      </ul>
                    </div>
                    <div className="bg-bg-card p-3 rounded">
                      <p className="text-text-primary font-semibold">방법 2: 6월 정기 납부 + 신용카드 할부</p>
                      <ul className="text-text-secondary text-xs mt-2 space-y-1 list-disc list-inside">
                        <li>연납 없음: 52만원 그대로</li>
                        <li>카드 할부: 52만원을 2~6개월 무이자 할부 (수수료 0% 이벤트 가정)</li>
                        <li><strong>절감: 0원</strong> (현금과 동일)</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-text-secondary text-xs mt-3 border-t border-border-base pt-2">
                    주의: 무이자 할부는 카드사 이벤트일 때만 가능합니다. 무이자 이벤트가 아니면 카드사·개월수별 할부 수수료가 붙어 실제 부담이 달라집니다.
                  </p>
                </div>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">1월 연납 신청 방법</h2>
                <p className="mb-3 text-sm text-text-secondary">지방세법 시행령 §125 — 1월 1~31일 신청만 가능합니다.</p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <p className="text-text-primary font-semibold mb-2">1⃣ 위택스(wetax.go.kr) — 가장 추천</p>
                    <ol className="text-text-secondary space-y-1 list-decimal list-inside">
                      <li>위택스(wetax.go.kr)에 공인인증서·금융인증서·간편인증으로 로그인</li>
                      <li>"세금 신청·신고" → "지방세" → "자동차세"</li>
                      <li>"자동차세 연납" 메뉴 선택</li>
                      <li>차량번호(또는 등록번호) 입력</li>
                      <li>납부 계좌 확인 후 신청</li>
                      <li>24시간 온라인으로 가능 (은행 영업시간 무관)</li>
                    </ol>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <p className="text-text-primary font-semibold mb-2">2⃣ 스마트 위택스 앱</p>
                    <p className="text-text-secondary">Google Play / App Store에서 "스마트 위택스" 검색 → 앱 실행 → 로그인 → "자동차세 연납" 신청. 모바일에서도 24시간 가능.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <p className="text-text-primary font-semibold mb-2">3⃣ 관할 시·군청 세무서 (직접 방문)</p>
                    <p className="text-text-secondary">주민등록지 또는 차량 등록지 관할 세무서 방문 → 차량 등록증 지참 → 신청서 작성 → 제출.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <p className="text-text-primary font-semibold mb-2">4⃣ 지역별 앱 (서울·경기·인천 등)</p>
                    <ul className="text-text-secondary mt-2 space-y-1 list-disc list-inside">
                      <li>서울: STAX (스택) 앱</li>
                      <li>경기·인천: 지역 지방세 앱 (경기는 "한꺼번이", 인천은 "인천 지방세")</li>
                      <li>기타: 해당 지역청 홈페이지 확인</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4 text-sm">
                  <strong className="text-highlight-700 dark:text-highlight-300">⏰ 중요: 신청 기간은 1월 1~31일만</strong>
                  <p className="text-text-secondary mt-2">
                    1월을 놓치면 해당 연도는 연납 신청이 불가능합니다. 6월·12월 정기 납부로 돌아갑니다. 따라서 가능한 1월 초 신청을 권장합니다.
                  </p>
                </div>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">신용카드 결제 방법</h2>
                <p className="mb-3 text-sm text-text-secondary">위택스, 지역 앱, 세무서에서 연납 신청 후 대납액 확인 → 신용카드로 결제합니다.</p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <p className="text-text-primary font-semibold mb-2">신용카드 결제 가능한 납부 채널</p>
                  <ul className="text-text-secondary space-y-1 list-disc list-inside">
                    <li>위택스(wetax.go.kr) — "결제" 메뉴에서 신용카드 선택</li>
                    <li>스마트 위택스 앱 — 결제 단계에서 카드 입력</li>
                    <li>세무서 방문 — 현장에서 카드 결제 또는 지로 영수증 받아 은행·편의점에서 선결제 후 제출</li>
                    <li>지로 — 은행 창구·ATM·편의점에서 현금 또는 카드 결제(기관마다 상이, 확인 필요)</li>
                  </ul>
                </div>
              </section>

              <AdSlot slot="guide-vehicle-tax-card-payment-2026-mid" format="rectangle" />

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">주의사항 및 예외 상황</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4 text-sm">
                    <p className="text-highlight-700 dark:text-highlight-300 font-semibold">차량 양도 시 환급</p>
                    <p className="text-text-secondary mt-2">
                      연납 후 차량을 양도하면 미경과 기간에 해당하는 세액을 일할계산하여 환급받습니다. 예: 1월에 연세액을 연납한 뒤 6월 중 차량을 양도하면, 양도일 다음 날부터 12월 31일까지의 미경과분이 환급 대상입니다. 정확한 환급액은 양도일·관할 지자체 기준에 따라 달라지므로 위택스 또는 관할 시·군청에서 확인하세요.
                    </p>
                  </div>
                  <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4 text-sm">
                    <p className="text-highlight-700 dark:text-highlight-300 font-semibold">차량 등록 취소</p>
                    <p className="text-text-secondary mt-2">
                      연납 후 차량을 폐차하면 잔여기간분을 환급받습니다. 마찬가지로 양도일 기준으로 계산됩니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4 text-sm">
                    <p className="text-highlight-700 dark:text-highlight-300 font-semibold">신용카드 무이자 할부 수수료</p>
                    <p className="text-text-secondary mt-2">
                      카드사 무이자 이벤트 중이면 0원이지만, 무이자가 아니면 카드사·개월수별 할부 수수료가 본인 부담으로 부과됩니다. 따라서 1월 초 신청 시 카드사의 무이자 할부 이벤트가 있는지 반드시 확인하세요.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 묻는 질문</h2>
                <FaqSection items={FAQ_ITEMS} />
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 계산기·가이드</h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Link
                    href="/calculator/vehicle-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">자동차세 계산기</h3>
                    <p className="text-sm text-text-secondary mt-1">배기량 입력 → 연 납부액 즉시 계산. 차령경감·연납 할인 반영.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">자동차세 완전 정리 2026</h3>
                    <p className="text-sm text-text-secondary mt-1">배기량 세율·차령경감·연납 할인·납부 시기 종합 가이드.</p>
                  </Link>
                  <Link
                    href="/guide/january-vehicle-tax-prepayment/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">1월 자동차세 연납 신청 가이드</h3>
                    <p className="text-sm text-text-secondary mt-1">위택스·앱 신청 방법, 할인 계산, 신청 기간.</p>
                  </Link>
                  <Link
                    href="/guide/electric-vehicle-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">전기차 자동차세 2026</h3>
                    <p className="text-sm text-text-secondary mt-1">전기차·수소차 정액 과세(13만원), 차령경감 미적용.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">세금 계산기·가이드</h3>
                    <p className="text-sm text-text-secondary mt-1">양도세·취득세·재산세·종부세 전체 보기.</p>
                  </Link>
                </div>
              </section>

              <section className="rounded-lg border border-border-base bg-bg-raised p-6 text-sm">
                <p className="text-text-secondary mb-3">
                  <strong>면책조항</strong>: 본 페이지의 자동차세 카드납부·연납 할인 정보는 2026년 현행 지방세법(§128, §151, 시행령 §125) 기준으로 작성되었습니다. 카드사의 무이자 할부·캐시백은 상시 변동되므로 결제 전 본인 카드사 앱에서 최신 이벤트를 확인하세요. 실제 할인액 계산, 신청 절차, 환급 대상 여부는 관할 시·군청 세무서(전화 120) 또는 위택스(wetax.go.kr) 고객센터에 문의하시기 바랍니다. 법조항 인용: 지방세법 시행령 §125(연납 공제).
                </p>
                <p className="text-text-tertiary text-xs">
                  업데이트: 2026-06-28 · AI 보조 작성 후 검수 · 출처: 위택스 공식 가이드·지방세법·국세청 FAQ
                </p>
              </section>

              <ShareButtons
                title="자동차세 카드납부·연납 할인 2026 — 무이자·할인 받는 법"
                url={URL}
                description="신용카드 수수료 무료 + 1월 연납 5% 할인(실효율 4.81%). 무이자 할부 조합 전략. 위택스·앱 신청 방법 정리."
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
