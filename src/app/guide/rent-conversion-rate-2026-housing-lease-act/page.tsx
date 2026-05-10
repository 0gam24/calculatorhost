import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { MainBackrefBox } from '@/components/network/MainBackrefBox';
import { getMainCategoryUrl } from '@/lib/network/main-backref';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/rent-conversion-rate-2026-housing-lease-act/';
const DATE_PUBLISHED = '2026-05-11';
const DATE_MODIFIED = '2026-05-11';

export const metadata: Metadata = {
  title: '주택임대차보호법 전월세전환율 2026 | 기준금리+2% 완벽 가이드',
  description:
    '2026년 주택임대차보호법 §7의2 월차임 전환율 = 한국은행 기준금리 + 2%. 보증금↔월세 환산 공식·법 한도·실제 계산 사례까지 명확히 정리. 임대인·세입자 필수.',
  keywords: [
    '주택임대차보호법 월차임 전환율',
    '주택임대차보호법 전월세전환율',
    '전월세 전환율 2026',
    '기준금리 2% 전환율',
    '월차임 전환 한도',
    '전세 월세 전환 계산',
    '보증금 월세 환산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '주택임대차보호법 전월세전환율 2026 | 기준금리+2%',
    description: '월차임 전환율 법정 한도 + 보증금·월세 환산 공식.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: { card: 'summary_large_image' },
};

const FAQ_ITEMS = [
  {
    question: '2026년 주택임대차보호법 전월세 전환율은 몇 %인가요?',
    answer:
      '주택임대차보호법 §7의2 ②항에 따라 전월세 전환율의 법정 한도는 "한국은행 기준금리 + 2%" 입니다. 2026년 5월 기준 한국은행 기준금리가 3.0%라면 법정 한도는 5.0% 가 됩니다. 임대인은 이 한도를 초과해 월차임을 요구할 수 없습니다.',
  },
  {
    question: '전월세 전환율 공식은 어떻게 계산하나요?',
    answer:
      '월세 환산액 = (보증금 차액 × 전환율) ÷ 12. 예: 전세 보증금 3억 원을 보증금 1억 + 월세로 전환할 때, 차액 2억 원 × 전환율 5% ÷ 12 = 월 약 83.3만 원이 법정 한도 최대 월세입니다. 합의로 더 낮게 정할 수 있지만 한도 초과 요구는 무효입니다.',
  },
  {
    question: '월차임 전환율과 전월세 전환율은 같은 말인가요?',
    answer:
      '네, 동일한 개념의 다른 표현입니다. 주택임대차보호법 §7의2 는 "전세 보증금을 월차임으로 전환할 때의 산정률" 을 규정하며, 이를 일반적으로 전월세 전환율 또는 월차임 전환율로 부릅니다. 두 용어 모두 같은 법조항을 지칭합니다.',
  },
  {
    question: '왜 기준금리 + 2% 가 한도인가요?',
    answer:
      '주택임대차보호법 시행령 §9 는 전환율을 "한국은행이 공시하는 기준금리에 대통령령으로 정하는 이율(현행 2%)을 더한 비율" 로 규정합니다. 임대인의 보증금 운용 수익(기준금리)에 + 추가 프리미엄(2%) 을 인정한 합리적 설계로, 임차인 보호와 임대인 수익 균형이 목적입니다.',
  },
  {
    question: '실제 시장의 전월세 전환율은 법정 한도보다 높은가요?',
    answer:
      '서울·수도권 일부 지역에서는 시장 거래 관행으로 5~6% 이상의 전환율을 요구하기도 합니다. 그러나 법정 한도(기준금리 + 2%) 를 초과하는 부분은 임차인이 부당이득 반환을 청구할 수 있어, 임대인은 법 한도 안에서 협상하는 것이 안전합니다. 분쟁 시 주택임대차분쟁조정위원회 활용 가능.',
  },
  {
    question: '계약 갱신 시에도 같은 한도가 적용되나요?',
    answer:
      '네. 주택임대차보호법 §7의2 는 신규·갱신·재계약 모두 동일하게 적용됩니다. 갱신 시 전세에서 월세로 일부 전환하는 경우에도 법정 한도(기준금리 + 2%) 이내로만 인상 가능하며, 이를 초과하는 월세 요구는 무효입니다.',
  },
  {
    question: '보증금·월세 환산 계산기는 어디에 있나요?',
    answer:
      '본 사이트의 [전월세 전환 계산기](/calculator/rent-conversion/)에서 보증금·월세·전환율을 입력하면 양방향 환산 결과를 즉시 확인할 수 있습니다. 기준금리 + 2% 법정 한도 자동 표시도 지원됩니다.',
  },
];

export default function RentConversionRateGuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택임대차보호법 전월세전환율 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주택임대차보호법 전월세전환율 2026 | 기준금리+2% 완벽 가이드',
    description:
      '주택임대차보호법 §7의2 월차임 전환율 = 한국은행 기준금리 + 2% 법정 한도와 보증금·월세 환산 공식 + 실 계산 사례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '주택임대차보호법',
      '전월세 전환율',
      '월차임 전환율',
      '기준금리 2%',
      '2026',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주택임대차보호법 전월세전환율 2026 가이드',
    description: '월차임 전환율 법정 한도와 환산 공식.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
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
                    { name: '주택임대차보호법 전월세전환율 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산·임대차 · {DATE_PUBLISHED}</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택임대차보호법 전월세전환율 2026 — 기준금리 + 2% 완벽 가이드
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 주택임대차보호법 §7의2 와 시행령 §9 에 따라 월차임 전환율의 법정 한도는
                  "한국은행 기준금리 + 2%" 입니다. 보증금·월세 환산 시 임대인이 이 한도를
                  초과해 요구하는 월차임은 무효이며, 임차인은 부당이득 반환을 청구할 수 있습니다.
                </p>
              </header>

              <section className="card border-l-4 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-2 text-xl font-semibold">📌 핵심 요약</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>법조항</strong>: 주택임대차보호법 §7의2 ② + 시행령 §9
                  </li>
                  <li>
                    <strong>법정 한도</strong>: 한국은행 기준금리 + 2% (=)
                  </li>
                  <li>
                    <strong>적용 대상</strong>: 신규·갱신·재계약 모두 동일
                  </li>
                  <li>
                    <strong>2026-05 기준</strong>: 기준금리 3.0% 가정 시 한도 5.0%
                  </li>
                  <li>
                    <strong>위반 시</strong>: 초과분 부당이득 반환 청구 가능
                  </li>
                </ul>
              </section>

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">전월세 전환율 공식</h2>
                <pre className="overflow-x-auto rounded-md bg-bg-card p-4 text-sm">
                  <code>{`월세 환산액 = (보증금 차액 × 전환율) ÷ 12

전환율 법정 한도(2026) = 한국은행 기준금리 + 2%

예 1: 기준금리 3.0% → 한도 5.0%
예 2: 기준금리 3.5% → 한도 5.5%`}</code>
                </pre>
                <p className="text-sm text-text-secondary">
                  여기서 "보증금 차액"은 전세 보증금에서 월세 전환 후 남은 보증금을 뺀 금액입니다.
                  예를 들어 전세 3억 원을 보증금 1억 + 월세로 전환하면 차액은 2억 원이 됩니다.
                </p>
              </section>

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">실제 계산 사례</h2>
                <div className="space-y-3 text-sm">
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-1 font-semibold text-primary-500">사례 ① 전세 3억 → 보증금 1억 + 월세</p>
                    <p>
                      • 보증금 차액: 2억 원<br />
                      • 전환율(법정 한도 5.0%): 1,000만 원/년<br />
                      • <strong>월세 환산: 약 83.3만 원/월</strong> (법 한도 최대)
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-1 font-semibold text-primary-500">사례 ② 전세 5억 → 보증금 2억 + 월세</p>
                    <p>
                      • 보증금 차액: 3억 원<br />
                      • 전환율 5.0%: 1,500만 원/년<br />
                      • <strong>월세 환산: 125만 원/월</strong> (법 한도 최대)
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-1 font-semibold text-primary-500">사례 ③ 기준금리 변동 영향</p>
                    <p>
                      기준금리 0.5%p 상승 시 (3.0 → 3.5%), 한도 전환율도 0.5%p 상승.
                      사례 ① 의 한도 월세는 약 83.3만 → 91.7만 원으로 증가.
                    </p>
                  </div>
                </div>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">자주 묻는 시나리오</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm">
                  <li>
                    <strong>계약 만료 후 전세→월세 부분 전환</strong>: 법정 한도 안에서 합의 가능.
                    한도 초과 요구는 임차인이 거부할 수 있고, 분쟁 시 분쟁조정위원회 활용.
                  </li>
                  <li>
                    <strong>월세 인상</strong>: 임대료 인상률 한도 (5%) 와 전환율 한도(기준금리+2%) 는
                    별개입니다. 갱신 시에는 임대료 인상률 5% 한도(주택임대차보호법 §7) 도 동시 준수.
                  </li>
                  <li>
                    <strong>전환율 분쟁</strong>: 임차인은 한도 초과분 무효 + 이미 낸 금액 부당이득
                    반환 청구 가능. 임대차분쟁조정위원회(LH) 또는 민사소송.
                  </li>
                </ul>
              </section>

              <section className="card border-l-4 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-2 text-xl font-semibold">🧮 관련 계산기</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/rent-conversion/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      전월세 전환 계산기
                    </Link>{' '}
                    — 보증금·월세 양방향 환산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/rental-yield/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      임대수익률 계산기
                    </Link>{' '}
                    — 임대인 관점
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="주택임대차보호법 전월세전환율 2026 | 기준금리+2% 완벽 가이드"
                url={URL}
              />

              <MainBackrefBox mainCategoryUrl={getMainCategoryUrl('real-estate')} />

              <section
                aria-label="공식 출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>공식 출처</strong>:{' '}
                  <a
                    href="https://www.law.go.kr/법령/주택임대차보호법"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-500 underline"
                  >
                    국가법령정보센터 — 주택임대차보호법
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.bok.or.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-500 underline"
                  >
                    한국은행 — 기준금리
                  </a>
                </p>
                <p>
                  본 가이드는 참고용이며, 실제 임대차 분쟁은 임대차분쟁조정위원회 또는 변호사
                  상담을 받으시기 바랍니다. 기준금리 변동에 따라 한도는 자동 변경됩니다.
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
