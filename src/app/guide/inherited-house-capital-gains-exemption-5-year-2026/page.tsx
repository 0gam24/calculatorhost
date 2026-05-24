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

const URL = 'https://calculatorhost.com/guide/inherited-house-capital-gains-exemption-5-year-2026/';
const DATE_PUBLISHED = '2026-05-24';
const DATE_MODIFIED = '2026-05-24';

export const metadata: Metadata = {
  title: '상속주택 양도세 1세대1주택 합가 5년 특례 2026 | 소득세법 §89·§155',
  description:
    '상속 후 기존주택 5년 내 양도 시 1세대1주택 비과세 특례(소득세법 §89·시행령 §155②). 양도 순서 핵심·5년 기한 계산(사망일 기준)·상속주택은 비과세 제외·공동상속 처리·세금 사례 3개.',
  keywords: [
    '상속주택 양도세',
    '상속주택 1세대1주택',
    '상속 후 주택 양도',
    '상속주택 5년 특례',
    '상속개시일 기준',
    '상속주택 비과세',
    '기존주택 먼저 양도',
    '상속세와 양도세',
    '상속 2주택 양도',
    '소득세법 89',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '상속주택 양도세 1세대1주택 합가 5년 특례 2026',
    description: '5년 기한·양도 순서·12억 한도·공동상속 처리·실제 사례.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속주택 양도세 1세대1주택 합가 5년 특례 2026',
    description: '상속 후 5년 내 기존주택 양도 시 1세대1주택 비과세 조건.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상속받은 집과 기존 집, 어느 것을 먼저 팔아야 하나요?',
    answer:
      '반드시 기존 주택을 먼저 양도해야 1세대1주택 비과세를 받습니다(소득세법 시행령 §155②). 상속주택을 먼저 양도하면 일반 양도세를 내야 하고, 그 이후 기존주택을 양도할 때 비과세를 받지 못합니다. 5년 이내 기존주택을 양도하는 것이 절세의 핵심 조건입니다.',
  },
  {
    question: '5년은 언제부터 계산되나요? 사망일인가 상속등기일인가요?',
    answer:
      '5년의 기한은 피상속인 사망일부터 계산됩니다(상속세 및 증여세법 §3). 상속등기일이나 지분 분할일이 아닙니다. 예를 들어 부친이 2021년 1월 1일에 사망했다면, 2026년 1월 1일이 5년 만료일입니다. 상속등기는 나중에 해도 상관없으나, 양도는 반드시 5년 이내에 이루어져야 합니다.',
  },
  {
    question: '상속주택은 양도세 비과세 대상이 아니라는데, 어떤 의미인가요?',
    answer:
      '상속주택 자체는 1세대1주택 비과세를 받을 수 없습니다. 이 특례는 기존 주택(상속 전에 이미 소유하던 주택)에만 적용됩니다(소득세법 시행령 §155②). 상속주택을 5년 내에 양도해도 기존주택이 없으면 비과세 불가능. 기존주택과 상속주택을 합쳐서 "1세대1주택" 비과세 혜택을 기존주택에 전달하는 개념입니다.',
  },
  {
    question: '기존주택의 보유·거주 기간은 어떻게 계산되나요?',
    answer:
      '기존주택은 상속과 무관하게 원래 1세대1주택 비과세 조건을 만족해야 합니다. 즉, 기존주택 보유 2년 이상(조정대상지역 취득 시 거주 2년 추가)이 필수입니다. 5년은 상속 후 기존주택 양도까지의 유예 기간일 뿐, 보유 기간 조건은 별개입니다. 기존주택을 상속 직후 5년 내에 양도하더라도 보유 2년을 미달하면 비과세 불가능.',
  },
  {
    question: '부모가 상속한 주택 2채가 있으면 어떻게 되나요?',
    answer:
      '공동상속인 경우, 각자의 지분에 대해 비과세를 적용합니다(소득세법 시행령 §155②의2). 예: 형과 동생이 부모 유산(주택 2채)을 1/2씩 상속받고, 기존주택 1채가 있으면 비과세 혜택을 받을 수 있습니다. 다만 기존주택이 여러 필지면 1세대1주택 비과세 한 건만 가능(추가 주택은 일반 양도세).',
  },
  {
    question: '배우자와 함께 상속받으면 배우자의 비과세도 가능한가요?',
    answer:
      '네, 가능합니다. 배우자가 1세대1주택 조건을 만족하면서 상속 후 5년 내 기존주택을 양도하면 비과세를 받을 수 있습니다. 다만 1세대는 배우자와 통합되므로(소득세법 시행령 §154의4), 배우자가 따로 주택을 소유하면 부부 합산 2주택 상태가 되어 비과세 불가능. 부부 중 한 명만 비과세를 받을 수 있습니다.',
  },
  {
    question: '상속주택을 5년 후에 양도하면 일반 양도세를 내나요?',
    answer:
      '네. 상속 후 5년을 초과하여 기존주택을 양도하거나 상속주택만 양도하면, 일반 2주택(이상) 양도세 규정이 적용됩니다. 조정지역에서 2주택이면 기본세율 + 20%p 중과, 3주택이면 + 30%p 중과됩니다. 5년 기한 내 기존주택을 반드시 양도해야 절세 효과를 보실 수 있습니다.',
  },
];

export default function InheritedHouseCapitalGainsExemptionGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속주택 양도세 1세대1주택 합가 5년 특례' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속주택 양도세 1세대1주택 합가 5년 특례 2026',
    description:
      '상속주택과 기존주택 합가 시 5년 내 기존주택 양도 조건·양도 순서·12억 한도·공동상속 처리·실전 세금 사례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['상속주택', '양도세', '5년 특례', '1세대1주택', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속주택 양도세 1세대1주택 합가 5년 특례 2026',
    description:
      '상속 후 기존주택 5년 내 양도 시 1세대1주택 비과세·양도 순서·12억 한도·공동상속.',
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
                    { name: '상속주택 양도세 1세대1주택 합가 5년 특례' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  상속주택 양도세 1세대1주택 합가 5년 특례 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  부모가 남긴 주택을 상속받았는데, 기존에 살던 집까지 함께 보유하게 될 때 적용되는 특례를 정확히
                  정리합니다. 상속 후 5년 이내에 기존 주택을 양도하면 1세대1주택 비과세 혜택을 받을 수 있습니다
                  (소득세법 §89, 시행령 §155②). 단, 양도 순서와 5년 계산 기준이 핵심이며, 상속주택 자체는
                  비과세 대상이 아닌 점에 주의해야 합니다.
                </p>
              </header>

              <AdSlot slot="guide-inherited-house-exemption-top" format="horizontal" />

              {/* 1. 정의 및 Structured Summary */}
              <section aria-label="특례 정의 및 핵심 요약" className="card">
                <h2 className="mb-4 text-2xl font-semibold">상속주택 양도세 특례란?</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  상속주택 양도세 특례는 피상속인 사망 후 기존 주택과 함께 상속주택을 보유하게 되는 경우, 기존 주택에
                  한해서 1세대1주택 비과세를 적용하는 제도입니다(소득세법 §89 ① 3호, 시행령 §155②). 상속 후
                  5년 이내에 기존 주택을 양도하면 양도가 12억 원 이하일 때 비과세됩니다. 이는 집을 바꾸는 과정에서
                  2주택 상태에 빠지는 것을 보호하기 위한 조세특례입니다.
                </p>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">상속주택 양도세 특례 핵심 정보</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">항목</th>
                        <th className="py-2 font-semibold">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">대상</td>
                        <td className="py-2">기존주택 (상속주택 제외)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">5년 기준</td>
                        <td className="py-2">피상속인 사망일(상속개시일)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">비과세 한도</td>
                        <td className="py-2">양도가 12억 원 이하</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">보유 기간 조건</td>
                        <td className="py-2">기존주택 2년 이상 (조정지역은 거주 2년 추가)</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold">법적 근거</td>
                        <td className="py-2">소득세법 §89·§94, 시행령 §154·§155</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 2. 핵심 3가지 조건 */}
              <section aria-label="비과세 필수 조건" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">상속주택 양도세 비과세 3가지 필수 조건</h2>
                <ol className="list-inside list-decimal space-y-4 text-text-secondary" data-speakable>
                  <li>
                    <strong>① 5년 이내 기존주택 양도</strong> — 피상속인 사망일부터 5년 이내에 기존 주택을
                    양도해야 합니다(소득세법 시행령 §155②). 상속주택이 아닌 반드시 기존 주택을 양도해야 합니다.
                    5년은 사망일 기준이며 상속등기일이 아닙니다.
                  </li>
                  <li>
                    <strong>② 기존주택 보유 2년 이상</strong> — 기존 주택은 원래 1세대1주택 비과세 조건을
                    충족해야 합니다. 즉, 취득일부터 양도일까지 만 2년 이상 보유해야 합니다(소득세법 §89, 시행령
                    §154). 조정대상지역에서 취득한 기존주택이면 추가로 거주 2년도 필요합니다.
                  </li>
                  <li>
                    <strong>③ 양도가 12억 원 이하</strong> — 기존 주택의 양도가액이 12억 원 이하여야 비과세됩니다
                    (소득세법 §89 ① 3호). 12억 초과 시 비례 과세 공식이 적용되며, 상속주택은 비과세 대상에서
                    제외됩니다.
                  </li>
                </ol>
              </section>

              {/* 3. 양도 순서의 핵심 */}
              <section aria-label="양도 순서 결정" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도 순서가 절세를 좌우합니다</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  상속 후 2주택을 보유할 때, 어느 주택을 먼저 양도하느냐에 따라 세금이 완전히 달라집니다. 반드시
                  기존 주택(상속 전부터 소유하던 집)을 먼저 양도하고, 나중에 상속주택을 양도해야 1세대1주택
                  비과세 혜택을 받습니다.
                </p>
                <div className="space-y-3 rounded-lg bg-bg-card p-4 text-sm">
                  <div>
                    <p className="mb-1 font-semibold text-text-primary">✅ 올바른 순서: 기존주택 → 상속주택</p>
                    <ul className="list-inside list-disc space-y-0.5 text-text-secondary">
                      <li>기존주택 양도: 1세대1주택 비과세 적용 (12억 이하)</li>
                      <li>상속주택 양도: 2주택 상태로 일반 양도세</li>
                      <li>총 세금: 기존주택 비과세 + 상속주택 일반 양도세</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-text-primary">❌ 잘못된 순서: 상속주택 → 기존주택</p>
                    <ul className="list-inside list-disc space-y-0.5 text-text-secondary">
                      <li>상속주택 양도: 일반 2주택 양도세 (비과세 불가)</li>
                      <li>기존주택 양도: 비과세 특례 적용 불가</li>
                      <li>총 세금: 상속주택 일반 양도세 + 기존주택 일반 양도세 (훨씬 높음)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. 5년 기한 계산 */}
              <section aria-label="5년 기한 계산" className="card">
                <h2 className="mb-4 text-2xl font-semibold">5년 기한은 사망일(상속개시일)부터 계산</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  5년의 유예 기간은 상속등기일이나 지분 분할일이 아닌, 피상속인이 실제로 사망한 날(상속개시일)부터
                  계산됩니다(상속세 및 증여세법 §3). 상속 신고나 등기가 늦어져도 기한에 영향을 주지 않습니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">사례: 부친 사망 2021년 1월 1일</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>5년 기한: 2021년 1월 1일 ~ 2026년 1월 1일 (이날 자정까지)</li>
                    <li>상속등기: 2021년 2월 15일 (사망 후 1개월) → 기한 계산에 영향 없음</li>
                    <li>기존주택 양도일: 2025년 12월 31일 (비과세 O) vs 2026년 1월 2일 (비과세 X)</li>
                  </ul>
                </div>
              </section>

              {/* 5. 실제 사례 시뮬 */}
              <section aria-label="실제 사례 시뮬레이션" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실제 사례 3개 — 양도가 11억 / 15억 / 20억</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  아래 사례들은 모두 기존주택을 먼저 양도하는 경우를 가정합니다. 상속 후 3년 이내, 기존주택 보유
                  2년 이상 충족한 상황입니다.
                </p>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">상속주택 특례 사례별 양도세 계산</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">사례</th>
                        <th className="py-2 pr-4 font-semibold">양도가</th>
                        <th className="py-2 pr-4 font-semibold">취득가</th>
                        <th className="py-2 pr-4 font-semibold">양도차익</th>
                        <th className="py-2 font-semibold">비과세 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">1번</td>
                        <td className="py-2 pr-4">11억</td>
                        <td className="py-2 pr-4">5억</td>
                        <td className="py-2 pr-4">6억</td>
                        <td className="py-2 font-semibold text-primary-600">전액 비과세</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">2번</td>
                        <td className="py-2 pr-4">15억</td>
                        <td className="py-2 pr-4">7억</td>
                        <td className="py-2 pr-4">8억</td>
                        <td className="py-2">초과분 비례 과세</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">3번</td>
                        <td className="py-2 pr-4">20억</td>
                        <td className="py-2 pr-4">6억</td>
                        <td className="py-2 pr-4">14억</td>
                        <td className="py-2">초과분 비례 과세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-4 rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <div>
                    <p className="mb-2 font-semibold text-text-primary">사례 1: 양도가 11억 (12억 이하)</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>조건: 사망 후 3년 내 양도, 기존주택 보유 2년 이상</li>
                      <li>결과: 양도차익 6억 전액 비과세 → 양도세 0원</li>
                      <li>절세 효과: 매우 큼 (비례 과세 대비 약 1,100만 원~)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 font-semibold text-text-primary">사례 2: 양도가 15억 (12억 초과)</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>초과분: 15억 − 12억 = 3억</li>
                      <li>과세 비율: 3억 ÷ 15억 = 20%</li>
                      <li>과세 양도차익: 8억 × 20% = 1.6억</li>
                      <li>누진세 적용: 1.6억 × 38% − 누진공제 1,994만 ≈ 약 4,046만 원 양도세</li>
                      <li>절세 효과: 비과세 미적용 시 대비 약 2,900만 원 절세</li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 font-semibold text-text-primary">사례 3: 양도가 20억 (12억 초과)</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>초과분: 20억 − 12억 = 8억</li>
                      <li>과세 비율: 8억 ÷ 20억 = 40%</li>
                      <li>과세 양도차익: 14억 × 40% = 5.6억</li>
                      <li>누진세 적용: 5.6억 × 38% − 누진공제 1,994만 ≈ 약 1억 8,926만 원 양도세</li>
                      <li>절세 효과: 비과세 미적용 시 대비 약 7,700만 원 절세</li>
                    </ul>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-inherited-house-exemption-mid" format="rectangle" />

              {/* 6. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 7. 공동상속 처리 */}
              <section aria-label="공동상속 처리" className="card">
                <h2 className="mb-4 text-2xl font-semibold">공동상속 — 지분별 비과세 적용</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  여러 상속인이 있는 경우, 각자의 지분에 따라 비과세를 개별적으로 적용합니다. 형과 동생이 부모 유산을
                  1/2씩 상속받으면, 각자가 자신의 지분에 해당하는 양도차익에 대해 비과세 혜택을 받을 수 있습니다
                  (소득세법 시행령 §155②의2).
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">공동상속 사례</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>부친 사망 → 형과 동생 각 1/2 상속</li>
                    <li>기존주택 1채 (취득가 6억, 양도가 12억)</li>
                    <li>형의 지분: 12억 × 1/2 = 6억 (비과세)</li>
                    <li>동생의 지분: 12억 × 1/2 = 6억 (비과세)</li>
                    <li>합계: 양도세 0원</li>
                  </ul>
                </div>
              </section>

              {/* 8. 상속주택 자체는 비과세 대상이 아님 */}
              <section aria-label="상속주택 비과세 불가" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 상속주택 자체는 비과세 대상이 아닙니다</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  이 특례는 기존 주택(상속 전부터 소유하던 주택)에만 적용되며, 상속주택은 비과세 대상이 아닙니다.
                  따라서 상속주택을 양도할 때는 2주택 이상(조정지역)이면 중과세(기본세율 + 20%p)가 적용됩니다.
                </p>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p>
                    <strong className="text-text-primary">상속주택만 양도하는 경우:</strong> 비과세 적용 불가, 일반
                    2주택 양도세
                  </p>
                  <p>
                    <strong className="text-text-primary">기존주택만 양도하는 경우:</strong> 1세대1주택 비과세 적용
                  </p>
                  <p>
                    <strong className="text-text-primary">5년 내 기존주택 양도 후 상속주택 양도:</strong> 기존주택은
                    비과세, 상속주택은 1주택만 남으므로 일반 양도세
                  </p>
                </div>
              </section>

              {/* 9. 거주 요건 */}
              <section aria-label="거주 요건" className="card">
                <h2 className="mb-4 text-2xl font-semibold">거주 요건 — 기존주택 기준</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  기존 주택은 원래 1세대1주택 비과세 조건을 그대로 충족해야 합니다. 비조정대상지역에서 취득한 기존주택은
                  거주 요건이 없고, 조정대상지역에서 취득한 주택(2017년 8월 3일 이후)은 보유 2년 + 거주 2년을
                  모두 만족해야 합니다(소득세법 시행령 §154).
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">거주 입증 자료</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>주민등록등본 (취득 후 이전하여 같은 주소 2년 이상 거주)</li>
                    <li>공과금 명세 (전기·가스·수도 요금 납부)</li>
                    <li>자동차 등록증 (같은 주소 거주)</li>
                    <li>고정자산세 납세증명</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  주의: 기존주택을 이사한 후 상속 후에도 계속 부모와 함께 살아 거주 기간을 유지했다면 비과세 가능.
                  하지만 상속 후 처음으로 이사해 거주하기 시작했다면 거주 기간이 인정 안 될 수 있습니다.
                </p>
              </section>

              {/* 10. 장기보유공제와의 관계 */}
              <section aria-label="장기보유공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">장기보유공제 동시 적용 가능</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  기존주택이 12억 초과하여 비례 과세되거나, 보유 10년 이상이면 장기보유공제 최대 80%를 동시에 적용할
                  수 있습니다(소득세법 §95). 보유 연 4% × 최대 10년 = 40% + 거주 연 4% × 최대 10년 = 40% = 합
                  80%.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">사례: 양도가 15억, 보유 12년 + 거주 10년</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>양도차익 8억 → 비례 과세 → 과세 양도차익 1.6억</li>
                    <li>장기보유공제 80% 적용 → 1.6억 × (1−80%) = 3,200만 원 과세표준</li>
                    <li>누진 6% 구간 → 약 192만 원 양도세 + 지방세</li>
                    <li>장기보유공제 미적용 시 약 4,046만 원과 비교 → 약 3,850만 원 절세</li>
                  </ul>
                </div>
              </section>

              {/* 11. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항 5가지</h2>
                <ul className="list-inside list-disc space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>5년 기한은 사망일 기준</strong> — 상속등기나 지분 분할일이 아님. 상속 신고 기한과도
                    무관.
                  </li>
                  <li>
                    <strong>반드시 기존주택을 먼저 양도</strong> — 상속주택을 먼저 양도하면 비과세 불가능. 순서
                    중요.
                  </li>
                  <li>
                    <strong>상속주택은 비과세 대상 아님</strong> — 상속주택 양도 시 2주택 중과세(조정지역) 적용.
                  </li>
                  <li>
                    <strong>기존주택 보유·거주 기간 재확인</strong> — 5년 유예는 별개이며, 원래 1세대1주택 조건
                    필수.
                  </li>
                  <li>
                    <strong>공동상속인과 지분 확인</strong> — 지분별로 비과세가 개별 적용되므로 지분 비율 정확히 파악
                    필수.
                  </li>
                </ul>
              </section>

              {/* 12. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    →{' '}
                    <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">
                      양도소득세 계산기
                    </Link>{' '}
                    — 상속주택 및 기존주택 양도세 상세 계산
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/one-household-12-billion-exemption/" className="text-primary-600 underline dark:text-primary-500">
                      1세대1주택 12억 한도 완전 정리
                    </Link>{' '}
                    — 비례 과세 공식·거주 요건·장기보유공제
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/temporary-two-houses-capital-gains-exemption/" className="text-primary-600 underline dark:text-primary-500">
                      일시적 2주택 양도세 비과세 3년
                    </Link>{' '}
                    — 신규 주택 취득 후 기존 주택 매도 특례
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/inheritance-tax-10-year-prior-gift-aggregation/" className="text-primary-600 underline dark:text-primary-500">
                      상속세 사전 증여 합산 10년
                    </Link>{' '}
                    — 상속과 증여의 통합 절세 전략
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/long-term-holding-special-deduction-80-percent/" className="text-primary-600 underline dark:text-primary-500">
                      장기보유특별공제 80% 활용법
                    </Link>{' '}
                    — 10년 보유·거주 시 최대 절감
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="상속주택 양도세 1세대1주택 합가 5년 특례 2026"
                url={URL}
                description="상속 후 5년 내 기존주택 양도 시 비과세·양도 순서·12억 한도·공동상속 처리."
              />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §89 (1세대1주택 비과세) · §94 (양도소득) · §95 (장기보유특별공제)
                  · 시행령 §154 (1세대1주택 범위·거주 요건) · §155 (일시적 2주택·상속주택 특례) · §155②
                  (상속주택 양도 특례) · 상속세 및 증여세법 §3 (상속개시일). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>,{' '}
                  <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 상속세
                  신고, 지분 분할, 다중상속인 처리 등 개별 사정에 따라 적용이 달라지므로 반드시 세무사 또는 국세청
                  상담을 통해 확정하시기 바랍니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵). 본 가이드는 AI
                  보조 작성 후 운영자 검수 발행되었습니다.
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
