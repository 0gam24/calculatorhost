import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/rent-conversion-calculation-2026/';
const DATE_PUBLISHED = '2026-06-29';
const DATE_MODIFIED = '2026-06-29';

export const metadata: Metadata = {
  title: '전월세 전환율 계산법 2026 | 보증금↔월세 환산 공식·사례',
  description:
    '전월세 전환율 계산법을 쉽게 정리합니다. 보증금을 월세로 환산하는 공식, 역방향 계산, 기준금리 변동 영향, 실제 계산 사례를 명확히 설명합니다. 2026년 기준.',
  keywords: [
    '전월세 전환율',
    '보증금 월세 환산',
    '월세 계산',
    '전환율 공식',
    '기준금리 2%',
    '전세 월세 환산',
    '주택임대차보호법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '전월세 전환율 계산법 2026 | 보증금↔월세 환산 공식·사례',
      },
    ],
    title: '전월세 전환율 계산법 2026',
    description: '보증금과 월세를 양방향으로 환산하는 계산 방법과 실제 사례를 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전월세 전환율 계산법 2026',
    description: '보증금 → 월세, 월세 → 보증금 양방향 환산 공식과 사례',
  },
};

const FAQ_ITEMS = [
  {
    question: '보증금을 월세로 환산하는 공식은 뭔가요?',
    answer:
      '월세 = (보증금 차액 × 전환율) ÷ 12 입니다. 예를 들어 전세 3억 원을 보증금 1억 + 월세로 전환할 때, 차액 2억 원에 전환율 5.5%를 적용하면 월세 = (2억 × 0.055) ÷ 12 ≈ 91.7만 원이 됩니다.',
  },
  {
    question: '역으로 월세를 보증금으로 환산할 수 있나요?',
    answer:
      '네, 가능합니다. 공식은 보증금 = (월세 × 12) ÷ 전환율 입니다. 예를 들어 월세 50만 원을 보증금으로 환산할 때 전환율 5.5%를 적용하면 보증금 = (50만 × 12) ÷ 0.055 = 약 1억 909만 원이 됩니다.',
  },
  {
    question: '기준금리가 올라가면 전환율도 올라가나요?',
    answer:
      '네, 맞습니다. 법정 전환율 한도는 "기준금리 + 2%"이므로, 기준금리가 0.5%p 올라가면 전환율 한도도 0.5%p 올라갑니다. 예를 들어 기준금리 3.0% 시절 한도가 5.0%였다면, 기준금리가 3.5%로 오르면 한도는 5.5%로 상승합니다.',
  },
  {
    question: '전환율은 고정인가요, 아니면 매월 변동하나요?',
    answer:
      '기준금리가 변할 때마다 법정 한도가 변동됩니다. 하지만 임대차 계약 체결 시점의 기준금리를 기준으로 정하는 것이 관례이며, 일반적으로 계약 기간 중에는 고정입니다. 갱신 시 새로운 기준금리가 적용되는 방식입니다.',
  },
  {
    question: '법정 한도를 초과한 전환율로 합의하면 유효한가요?',
    answer:
      '아니요, 무효입니다. 주택임대차보호법 §7의2에 따라 법정 한도를 초과하는 부분은 효력이 없으며, 이미 낸 금액이 있다면 임차인이 부당이득 반환을 청구할 수 있습니다. 분쟁 시 주택임대차분쟁조정위원회나 법원에 확인하세요.',
  },
  {
    question: '전환율 5.0%와 기준금리 3.0%의 관계가 뭔가요?',
    answer:
      '기준금리 3.0% + 추가 프리미엄 2.0% = 전환율 한도 5.0%입니다. 법은 임대인의 보증금 운용 수익(기준금리)에 추가 보상(2%)을 더한 것을 합리적 수익으로 정했습니다. 이것이 법정 한도의 근거입니다.',
  },
  {
    question: '3년 임대차 중간에 기준금리가 올라가면 어떻게 되나요?',
    answer:
      '계약 기간 중에는 기준금리 변동이 반영되지 않습니다. 계약서에 정한 전환율이 그대로 유지됩니다. 갱신 계약 시에만 새로운 기준금리가 적용되어 전환율 한도가 재조정됩니다.',
  },
  {
    question: '전환 계산기는 어디서 찾나요?',
    answer:
      '이 페이지 하단 "관련 계산기" 섹션의 전월세 전환 계산기에서 보증금·월세·전환율을 입력하면 양방향 환산 결과를 즉시 확인할 수 있습니다. 현재 기준금리도 자동 반영됩니다.',
  },
];

export default function RentConversionCalculationPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전월세 전환율 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전월세 전환율 계산법 2026',
    description:
      '보증금과 월세를 양방향으로 환산하는 전환율 계산 방법, 공식, 실제 사례를 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '전월세 전환율',
      '보증금 월세 환산',
      '전환율 계산',
      '기준금리 2%',
      '2026',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전월세 전환율 계산법 2026 | calculatorhost',
    description:
      '보증금 ↔ 월세 양방향 환산 공식과 계산 사례를 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

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
                    { name: '전월세 전환율 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  부동산 · 8분 읽기 · 2026-06-29
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전월세 전환율 계산법 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세 계약이 끝나갈 때, 임대인이 월세로 일부 전환을 제안합니다.
                  이때 얼마나 많은 보증금을 월세로 환산해야 하는지 계산하는 것이 중요합니다.
                  주택임대차보호법 §7의2에 따라 전환율은 법정 한도(기준금리 + 2%)가 정해져 있으며,
                  이를 초과하는 부분은 무효입니다. 이 가이드에서는 보증금과 월세를 양방향으로
                  환산하는 공식과 실제 계산 사례를 명확히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-rent-conversion-calculation-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    전월세 전환율 기본 정보 (2026 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        설명
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">기본 공식</td>
                      <td>월세 = (보증금 차액 × 전환율) ÷ 12</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">역산 공식</td>
                      <td>보증금 = (월세 × 12) ÷ 전환율</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">법정 한도</td>
                      <td>기준금리 + 2% (주택임대차보호법 §7의2, 시행령 §9)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">2026년 예시</td>
                      <td>기준금리 3.5% → 한도 5.5%</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  보증금을 월세로 환산하는 공식
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  전세 계약을 일부 월세로 전환할 때 가장 많이 사용하는 계산 방법입니다.
                  보증금의 일부를 월세로 바꾸기 위해서는 그 금액에 전환율을 곱하고 12개월로 나누면 됩니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    월세 환산액 = (보증금 차액 × 전환율) ÷ 12
                  </p>
                  <p className="mt-3 text-xs text-text-tertiary">
                    여기서 "보증금 차액"은 전환 대상이 되는 보증금 부분을 의미합니다.
                    예를 들어 전세 3억 원을 보증금 1억 + 월세로 전환한다면, 차액은 2억 원입니다.
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong>계산 단계별:</strong>
                </p>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    전환 대상 보증금(차액) 정하기 — 예: 3억 원 전세 중 2억 원 부분을 월세로 전환
                  </li>
                  <li>
                    현재 기준금리 확인 — 한국은행 공식 기준금리(예: 3.5%)
                  </li>
                  <li>
                    법정 전환율 한도 계산 — 기준금리 + 2% = 3.5% + 2% = 5.5%
                  </li>
                  <li>
                    월세 계산 — (2억 × 5.5%) ÷ 12 = 약 91.7만 원/월
                  </li>
                </ol>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 위는 법정 최대 한도이며, 실제 합의에서는 한도보다 낮은 전환율로 정할 수 있습니다.
                  임차인과 임대인이 합의하면 법정 한도 이하의 전환율을 적용하는 것이 일반적입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  월세를 보증금으로 역산하는 방법
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  반대로 월세로 지불하고 있는 금액을 보증금으로 환산하고 싶을 때도 있습니다.
                  이 경우 월세에 12를 곱한 후 전환율로 나누면 됩니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    보증금 환산액 = (월세 × 12) ÷ 전환율
                  </p>
                  <p className="mt-3 text-xs text-text-tertiary">
                    이 공식은 월세 형태로 지불하는 금액을 "만약 보증금으로 바꾼다면 얼마인가"를
                    계산할 때 사용합니다.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">역산 계산 예시</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>상황</strong>: 월세 50만 원을 보증금으로 환산하고 싶음
                    </li>
                    <li>
                      <strong>기준금리</strong>: 3.5% → 법정 한도 전환율 5.5%
                    </li>
                    <li>
                      <strong>계산</strong>: (50만 × 12) ÷ 0.055 = 600만 ÷ 0.055 = 약 1억 909만 원
                    </li>
                    <li>
                      <strong>의미</strong>: 월 50만 원은 보증금 약 1억 909만 원과 동일 가치
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 역산 공식은 이해도와 비교 목적으로 주로 사용되며,
                  실제 전세 갱신 시 월세 전환 협상에서는 보증금(차액) → 월세 방향 계산이 더 일반적입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  실제 계산 사례
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  여러 상황별로 보증금과 월세를 어떻게 환산하는지 구체적으로 봅시다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">사례 1: 기준금리 3.5%일 때</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>상황</strong>: 전세 3억 원 → 보증금 1억 + 월세로 전환
                    </li>
                    <li>
                      <strong>보증금 차액</strong>: 2억 원
                    </li>
                    <li>
                      <strong>법정 전환율</strong>: 3.5% + 2% = 5.5%
                    </li>
                    <li>
                      <strong>월세 계산</strong>: (2억 × 0.055) ÷ 12 = 1,100만 ÷ 12 ≈ 91.7만 원/월
                    </li>
                    <li>
                      <strong>해석</strong>: 임차인은 월 91.7만 원 이상을 요구받으면 법정 한도 초과
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">사례 2: 더 큰 규모의 전환</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>상황</strong>: 전세 5억 원 → 보증금 2억 + 월세로 전환
                    </li>
                    <li>
                      <strong>보증금 차액</strong>: 3억 원
                    </li>
                    <li>
                      <strong>전환율(가정)</strong>: 5.0% (법정 한도 안)
                    </li>
                    <li>
                      <strong>월세 계산</strong>: (3억 × 0.05) ÷ 12 = 1,500만 ÷ 12 = 125만 원/월
                    </li>
                    <li>
                      <strong>해석</strong>: 월 125만 원이 법정 한도(5.0% 기준) 최대치
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">사례 3: 기준금리 변동의 영향</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>전환 차액</strong>: 2억 원 (고정)
                    </li>
                    <li>
                      <strong>기준금리 3.0% 당시</strong>: 한도 5.0% → 월 83.3만 원/월
                    </li>
                    <li>
                      <strong>기준금리 3.5%로 인상</strong>: 한도 5.5% → 월 91.7만 원/월 (차액 8.4만 원)
                    </li>
                    <li>
                      <strong>기준금리 4.0%로 인상</strong>: 한도 6.0% → 월 100만 원/월 (차액 16.7만 원)
                    </li>
                    <li>
                      <strong>해석</strong>: 기준금리 0.5%p 인상 시 월세 한도는 약 8.3만 원씩 상승
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 계약 기간 중 기준금리가 변동해도 계약서에 명시한 월세는 변하지 않습니다.
                  갱신 또는 재계약 시 기준금리의 최신값이 적용됩니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  법정 한도(기준금리 + 2%)를 초과하면 어떻게 되나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  임대인이 법정 한도를 초과한 전환율을 요구했다면, 초과분은 효력이 없습니다.
                  주택임대차보호법 §7의2 ②항이 명확히 규정하고 있습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">초과 한도 사례</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>기준금리</strong>: 3.5%
                    </li>
                    <li>
                      <strong>법정 한도</strong>: 5.5%
                    </li>
                    <li>
                      <strong>임대인 요구 전환율</strong>: 6.5% (초과분 1.0%p)
                    </li>
                    <li>
                      <strong>계약의 효력</strong>: 5.5% 부분은 유효, 6.5% 중 초과분(1.0%p)은 무효
                    </li>
                    <li>
                      <strong>임차인 권리</strong>: 초과분으로 이미 낸 금액에 대해 부당이득 반환 청구 가능
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong>분쟁 해결 방법:</strong>
                </p>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    주택임대차분쟁조정위원회(LH, 구 전월세분쟁조정위) 조정 신청 (무료)
                  </li>
                  <li>
                    합의 실패 시 민사소송으로 부당이득 반환 청구
                  </li>
                  <li>
                    증거: 계약서, 기준금리 확인(한국은행 공시), 전환율 계산 과정
                  </li>
                </ol>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 계약 당시 기준금리를 명확히 기록해두고, 전환율 계산 근거를 보관하는 것이
                  분쟁 시 임차인의 권리 보호에 중요합니다.
                </p>
              </section>

              <AdSlot slot="guide-rent-conversion-calculation-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  갱신 계약과 새 기준금리 적용
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  임대차 계약 기간이 끝나고 갱신할 때, 그 사이에 기준금리가 변동했다면
                  새로운 전환율 한도가 적용됩니다. 이는 계약 갱신 시 월세 인상의 또 다른 이유가 됩니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">갱신 시나리오</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>초기 계약 (2024년)</strong>
                      <br />
                      기준금리 3.0% → 전환율 한도 5.0% → 월세 83.3만 원/월 고정
                    </li>
                    <li>
                      <strong>계약 갱신 (2026년)</strong>
                      <br />
                      기준금리 3.5%로 인상 → 전환율 한도 5.5%로 상향
                      <br />
                      임대인은 갱신 시 5.5% 기준의 월세 인상을 요청 가능
                    </li>
                    <li>
                      <strong>법정 한도</strong>
                      <br />
                      전환율 한도 인상(5.0% → 5.5%)과 별개로,
                      <br />
                      월세 인상률 자체도 5% 한도(주택임대차보호법 §7)가 적용되므로
                      <br />
                      최종 인상폭은 두 규제 중 더 보수적인 쪽으로 결정됨
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 갱신 시 월세 인상은 전환율 변동뿐 아니라
                  월세 인상률 5% 한도(§7) 규제도 동시에 받으므로,
                  임대인이 원하는 인상폭이 두 규제 중 더 낮은 쪽으로 제한됩니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  보증금 규모별 전환 계산 비교표
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  같은 전환율이라도 보증금 규모에 따라 월세가 크게 달라집니다.
                  아래 표에서 기준금리 3.5%, 전환율 5.5% 기준 계산값을 확인하세요.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    보증금 규모별 월세 환산 (기준금리 3.5%, 전환율 5.5%)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        보증금 차액
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        월 환산액
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        연간 월세
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">5,000만 원</td>
                      <td className="py-2 pr-3">약 22.9만 원</td>
                      <td className="py-2">약 275만 원</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">1억 원</td>
                      <td className="py-2 pr-3">약 45.8만 원</td>
                      <td className="py-2">약 550만 원</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">2억 원</td>
                      <td className="py-2 pr-3">약 91.7만 원</td>
                      <td className="py-2">약 1,100만 원</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">3억 원</td>
                      <td className="py-2 pr-3">약 137.5만 원</td>
                      <td className="py-2">약 1,650만 원</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">5억 원</td>
                      <td className="py-2 pr-3">약 229.2만 원</td>
                      <td className="py-2">약 2,750만 원</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 위 계산은 5.5% 전환율 기준이며,
                  실제 합의에서는 법정 한도 이하의 낮은 전환율로 정할 수 있습니다.
                  또한 기준금리 변동 시 전환율 한도(기준금리 + 2%)도 함께 변동합니다.
                </p>
              </section>

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 정보 제공 목적이며, 특정 임대차 계약의 법적 효력을 판단하지 않습니다.
                  </li>
                  <li>
                    • 전환율 법정 한도는 주택임대차보호법 §7의2(현행), 시행령 §9(현행)에 따릅니다.
                    법 개정 시 한도가 변동될 수 있으므로, 계약 체결 전 최신 법령을 확인하세요.
                  </li>
                  <li>
                    • 기준금리는 한국은행이 공시하는 값을 기준으로 하며, 정책 변동에 따라 변할 수 있습니다.
                  </li>
                  <li>
                    • 실제 전환 계약 시에는 임차인 보호, 분쟁 조정, 법적 조언이 필요하면
                    주택임대차분쟁조정위원회, 법원, 또는 법무사에 상담하세요.
                  </li>
                  <li>
                    • 본 사이트는 임대차 거래 권유를 하지 않으며, 모든 계약 결정은 본인 책임입니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/rent-conversion/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전월세 전환 계산기
                    </Link>{' '}
                    — 보증금과 월세를 양방향으로 실시간 환산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/rent-conversion-rate-2026-housing-lease-act/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      주택임대차보호법 전월세전환율 2026 완벽 가이드
                    </Link>{' '}
                    — 법정 한도와 법조항 상세 설명
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/rent-increase-5-percent-cap-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전월세 인상 5% 상한 2026
                    </Link>{' '}
                    — 월세 인상률 규제와 전환율의 차이
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/jeonse-vs-monthly-rent-comparison-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전세 vs 월세 어느 쪽이 유리한가?
                    </Link>{' '}
                    — 보증금 규모별 거래 형태 분석
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/jeonse-deposit-safety/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전세보증금 안전 점검
                    </Link>{' '}
                    — 전환 전 깡통전세 위험 예방
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/real-estate/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      부동산 카테고리
                    </Link>{' '}
                    — 임대차, 매매, 세금 관련 모든 계산기
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 자료</strong>:{' '}
                  <a
                    href="https://www.law.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터 주택임대차보호법
                  </a>
                  ,{' '}
                  <a
                    href="https://www.bok.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국은행 기준금리
                  </a>
                  ,{' '}
                  <a
                    href="https://www.lh.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    LH 주택임대차분쟁조정위원회
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}. AI 보조 작성 후 운영자 검수 완료.
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
