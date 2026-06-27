import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
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

const URL = 'https://calculatorhost.com/guide/rent-increase-5-percent-cap-2026/';
const DATE_PUBLISHED = '2026-06-28';
const DATE_MODIFIED = '2026-06-28';

export const metadata: Metadata = {
  title: '전월세 인상 5% 상한 계산 2026 — 계약갱신 임대료 한도',
  description:
    '2026년 주택임대차보호법 §7에 따른 전월세(월세·보증금) 인상 5% 상한선. 계약갱신 시 임대인이 임차인 동의 없이 인상 불가. 5% 초과 시 위반 처벌·소송 근거.',
  keywords: [
    '전월세 인상 5% 상한',
    '임대료 인상률 한도',
    '계약갱신 전세 인상',
    '월세 인상 5퍼센트',
    '주택임대차보호법 7조',
    '차임 등의 증감청구권',
    '2026 임대료 인상',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전월세 인상 5% 상한 계산 2026 — 계약갱신 임대료 한도' }],
    title: '전월세 인상 5% 상한 계산 2026',
    description: '계약갱신 임대료·보증금 인상 법정 한도 + 계산 사례 + 소송·분쟁 가능성.',
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
    question: '전월세 인상 5% 상한이란 무엇인가요?',
    answer:
      '주택임대차보호법 §7 "차임 등의 증감청구권"에 따라 임대인이 계약갱신 시 요구할 수 있는 임대료(월세) 또는 보증금 인상은 약정한 금액의 20분의 1(5%)을 초과하지 못합니다. 임차인 동의 없이 5% 초과 인상을 요구할 수 없으며, 초과분은 무효입니다.',
  },
  {
    question: '5% 상한 계산은 어떻게 하나요?',
    answer:
      '인상액 = 현재 임대료(또는 보증금) × 5%. 예: 월세 50만 원 → 최대 2.5만 원 인상 가능 = 52.5만 원. 보증금 3억 원 → 최대 1,500만 원 인상 = 3억 1,500만 원. 인상 후 1년 이내 재증액은 불가능하며, 1년 경과 후에만 5% 재인상 가능합니다.',
  },
  {
    question: '신규 계약(새 임차인)에도 5% 한도가 적용되나요?',
    answer:
      '아니요. 5% 상한은 "계약갱신"(기존 임차인의 계약 연장) 시에만 적용됩니다. 새로운 임차인과의 신규 계약은 임대인이 시장가를 자유롭게 책정할 수 있으며, 법 한도가 없습니다. 이는 차별화의 예외로, 본문에서 주의하세요.',
  },
  {
    question: '5% 초과 인상을 거부하면 어떻게 되나요?',
    answer:
      '법정 한도를 초과하는 인상요구는 무효입니다. 임차인은 이를 거부할 수 있으며, 임대인이 강제로 징수했다면 부당이득 반환을 청구할 수 있습니다. 분쟁 발생 시 주택임대차분쟁조정위원회(LH) 또는 민사소송을 통해 해결합니다.',
  },
  {
    question: '1년 이내 재증액 불가 규칙은 왜 있나요?',
    answer:
      '주택임대차보호법 §7 2항에 따라 "증액 청구 후 1년 이내 재증액 청구 불가"라고 규정합니다. 목적은 임차인 보호로, 인상 후 곧바로 다시 인상하는 것을 차단하여 주거의 안정성을 보장합니다. 1년 경과 후에는 다시 5%까지 인상 가능합니다.',
  },
  {
    question: '월세와 보증금 중 하나만 인상할 수 있나요?',
    answer:
      '네, 가능합니다. 임대인이 월세만 인상하거나 보증금만 인상할 수 있습니다. 예: 보증금 5천만 + 월세 50만 계약에서 월세만 52.5만으로 인상(5% 적용) 또는 보증금만 5,250만으로 인상. 다만 통상 보증금은 인상폭이 작아 월세 인상이 더 일반적입니다.',
  },
  {
    question: '지자체 조례로 5% 한도를 더 강화할 수 있나요?',
    answer:
      '이론적으로 가능하지만, 현행 대부분의 지자체는 주택임대차보호법 §7의 5% 한도를 그대로 따릅니다. 일부 지자체가 전월세상한제 확대·강화를 추진하기도 하지만, 현재 법정 한도는 5%입니다. 거주 지역의 조례 변동 가능성은 지자체·LH에 문의하세요.',
  },
];

export default function RentIncrease5PercentCapGuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전월세 인상 5% 상한 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전월세 인상 5% 상한 계산 2026 — 계약갱신 임대료 한도',
    description:
      '주택임대차보호법 §7 차임 등의 증감청구권 — 계약갱신 시 임대료·보증금 인상 5% 상한선 법정 한도와 실제 계산 사례 + 예외 상황.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '임대료 인상',
      '계약갱신',
      '5% 상한',
      '주택임대차보호법',
      '2026',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전월세 인상 5% 상한 2026 가이드',
    description: '계약갱신 시 임대료·보증금 인상 법정 한도와 계산.',
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
                    { name: '전월세 인상 5% 상한 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · {DATE_PUBLISHED}</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전월세 인상 5% 상한 계산 2026 — 계약갱신 임대료 한도
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 주택임대차보호법 §7 "차임 등의 증감청구권"에 따라 임대인이 계약갱신 시 청구할 수
                  있는 월세·보증금 인상의 법정 한도는 현재 금액의 <strong>5%(20분의 1)</strong>입니다. 이를 초과하는 인상
                  요구는 무효이며, 임차인은 초과분 반환을 청구할 수 있습니다. 신규 계약은 이 한도가 적용되지 않는 점을
                  주의하세요.
                </p>
              </header>

              <AdSlot slot="guide-rent-increase-5-percent-cap-2026-top" format="horizontal" />

              <section className="card border-l-2 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-2 text-xl font-semibold">📌 핵심 요약</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>법조항</strong>: 주택임대차보호법 §7 차임 등의 증감청구권
                  </li>
                  <li>
                    <strong>인상 상한</strong>: 현재 월세 또는 보증금의 5% (20분의 1)
                  </li>
                  <li>
                    <strong>적용 범위</strong>: 계약갱신(기존 임차인) 한정 — 신규 계약 제외
                  </li>
                  <li>
                    <strong>재인상 금지</strong>: 인상 후 1년 이내 재증액 불가
                  </li>
                  <li>
                    <strong>초과분 효력</strong>: 5% 초과 부분은 무효, 부당이득 반환 가능
                  </li>
                </ul>
              </section>

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">전월세 5% 인상 공식</h2>
                <pre className="overflow-x-auto rounded-md bg-bg-card p-4 text-sm">
                  <code>{`인상액 = 현재 임대료(또는 보증금) × 5%
인상 후 금액 = 현재 금액 + 인상액

예 1) 월세: 50만 원 × 5% = 2.5만 원 → 52.5만 원
예 2) 보증금: 3억 원 × 5% = 1,500만 원 → 3억 1,500만 원
예 3) 전월세: 보증금 1억 + 월세 40만 → 각각 5% 적용`}</code>
                </pre>
                <p className="text-sm text-text-secondary">
                  5% 상한은 계약갱신(기존 임차인과의 재계약) 시에만 적용됩니다. 신규 임차인의 신규 계약은
                  임대인이 시장가를 자유롭게 책정할 수 있으므로, 이 한도가 없습니다. 매우 중요한 차이이므로
                  주의해야 합니다.
                </p>
              </section>

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">실제 계산 사례</h2>
                <div className="space-y-3 text-sm">
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-1 font-semibold text-primary-500">사례 ① 월세만 있는 계약</p>
                    <p>
                      • 현재 월세: 50만 원/월<br />
                      • 인상액(5%): 2.5만 원<br />
                      • <strong>갱신 후 월세: 52.5만 원/월</strong><br />
                      • 법정 최대 인상액: 2.5만 원 (이보다 많이 요구 불가)
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-1 font-semibold text-primary-500">사례 ② 전월세(보증금 + 월세)</p>
                    <p>
                      • 현재 계약: 보증금 5,000만 + 월세 40만 원<br />
                      • 보증금 인상: 5,000만 × 5% = 250만 원<br />
                      • 월세 인상: 40만 × 5% = 2만 원<br />
                      • <strong>갱신 후: 보증금 5,250만 + 월세 42만 원</strong>
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-1 font-semibold text-primary-500">사례 ③ 보증금만 인상하는 경우</p>
                    <p>
                      • 현재: 전세 보증금 3억 원<br />
                      • 인상액: 3억 × 5% = 1,500만 원<br />
                      • <strong>갱신 후: 3억 1,500만 원</strong><br />
                      • 다음 인상은 1년 후 가능 (2026년 인상 → 2027년 이후 재인상)
                    </p>
                  </div>
                </div>
              </section>

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">주의: 신규 계약은 5% 한도 없음</h2>
                <p data-speakable>
                  <strong>⚠️ 다만</strong>, 이 5% 상한은 기존 임차인이 계약을 갱신할 때만 적용됩니다. 기존 임차인이 나가고 새로운 임차인이
                  들어오는 신규 계약의 경우, 임대인이 시장 상황에 따라 임대료를 자유롭게 책정할 수 있습니다. 예를 들어, 3억
                  보증금 계약이 끝나고 새 임차인을 받을 때 3억 5천만 원 이상으로 임대료를 올릴 수 있다는 의미입니다. 이는
                  계약갱신(기존 임차인)과 신규 계약의 근본적 차이이므로, 자신의 계약 상황을 정확히 파악해야 합니다.
                </p>
              </section>

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">1년 이내 재인상 금지 규칙</h2>
                <p>
                  주택임대차보호법 §7 2항에 따라, 임대인이 월세(또는 보증금)를 인상한 후
                  <strong>1년 이내에는 다시 인상을 청구할 수 없습니다</strong>. 목적은 임차인 보호로, 연속적 인상으로 인한
                  불안정을 방지하기 위함입니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm">
                  <p className="mb-1 font-semibold text-primary-500">예시</p>
                  <p>
                    2026년 6월 계약갱신 시 월세 50만 → 52.5만 원으로 인상<br />
                    → 2027년 6월 이전에는 재인상 불가<br />
                    → 2027년 6월 이후 재계약 시에만 다시 5% 인상 가능(52.5만 × 5% ≈ 55.125만)
                  </p>
                </div>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">초과 인상액 분쟁 시 대응</h2>
                <p>
                  임대인이 5% 상한을 초과하는 임대료를 요구하거나 이미 징수했다면, 임차인은 다음 조치를 취할 수 있습니다:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm">
                  <li>
                    <strong>협상</strong>: 법정 한도를 명시하며 임대인과 협상. 많은 경우 법을 모르는 임대인이 요청한 것이므로,
                    법조항 안내 후 합의 가능.
                  </li>
                  <li>
                    <strong>분쟁조정</strong>: 주택임대차분쟁조정위원회(LH 또는 지역 센터)에 조정 신청. 무료 또는 저비용으로
                    조정 시도. 조정이 성립하면 합의서 작성으로 법적 효력 발생.
                  </li>
                  <li>
                    <strong>민사소송</strong>: 초과분 부당이득 반환청구소송. 이미 낸 초과분을 돌려받을 수 있습니다(이자 포함).
                  </li>
                  <li>
                    <strong>계약갱신거절</strong>: 임대인의 부당한 인상 요구에 맞서 계약갱신을 거절할 수 있습니다(단, 임차인의
                    계약갱신요구권 2회 한정—주택임대차보호법 §6의3).
                  </li>
                </ul>
              </section>

              <AdSlot slot="guide-rent-increase-5-percent-cap-2026-mid" format="rectangle" />

              <section className="card border-l-2 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-2 text-xl font-semibold">🔗 관련 계산기</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/rent-conversion/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      전월세 전환 계산기
                    </Link>{' '}
                    — 보증금↔월세 양방향 환산 및 전환율 한도 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/rental-yield/"
                      className="font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      임대수익률 계산기
                    </Link>{' '}
                    — 임대료 인상 후 예상 수익률 시뮬레이션
                  </li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-2 text-xl font-semibold">📖 관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/guide/rent-conversion-rate-2026-housing-lease-act/"
                      className="font-medium text-primary-600 underline dark:text-primary-500"
                    >
                      주택임대차보호법 전월세전환율 2026
                    </Link>{' '}
                    — 월차임 전환율(기준금리 + 2%) 공식 및 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/housing-rental-income-separate-taxation/"
                      className="font-medium text-primary-600 underline dark:text-primary-500"
                    >
                      주택임대소득 분리과세 2,000만 원
                    </Link>{' '}
                    — 월세 수입 과세 기준 및 절세 전략
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/real-estate/"
                      className="font-medium text-primary-600 underline dark:text-primary-500"
                    >
                      부동산 계산기 전체보기
                    </Link>
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="전월세 인상 5% 상한 계산 2026 — 계약갱신 임대료 한도"
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
                    href="https://www.lh.or.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-500 underline"
                  >
                    LH — 임대차분쟁조정위원회
                  </a>
                </p>
                <p className="mb-2">
                  <strong>AI 보조 작성</strong> 후 운영자 검수 | 마지막 갱신: {DATE_MODIFIED}
                </p>
                <p>
                  본 가이드는 참고용이며, 실제 임대차 분쟁은 임대차분쟁조정위원회(LH) 또는 변호사 상담을 받으시기 바랍니다.
                  지자체 조례나 특수 상황에 따라 상이할 수 있으므로, 거주 지역의 현행 규정을 확인하세요.
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
