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

const URL = 'https://calculatorhost.com/guide/vehicle-tax-calculation-2026/';
const DATE_PUBLISHED = '2026-06-22';
const DATE_MODIFIED = '2026-06-22';

export const metadata: Metadata = {
  title: '자동차세 계산법 2026 | 배기량·차령경감·지방교육세 완벽 가이드 | calculatorhost',
  description:
    '2026년 자동차세 정확한 계산법. 배기량별 세율, 차령경감(3년차부터), 전기차 정액세, 지방교육세, 연납할인까지. 지방세법 §127·§151 기준 필수 정보.',
  keywords: [
    '자동차세',
    '자동차세 계산',
    '자동차세 계산법',
    '배기량 자동차세',
    '차령경감',
    '자동차세 세율',
    '전기차 자동차세',
    '지방세법 127조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '자동차세 계산법 2026 | 배기량·차령경감·지방교육세' }],
    title: '자동차세 계산법 2026 — 정확한 세율 & 차령경감',
    description: '자동차세의 배기량별 세율부터 차령경감, 전기차 정액세, 연납할인까지 모두 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '2,000cc 자동차세가 얼마나 되나요?',
    answer:
      '2,000cc 자동차의 자동차세는 200원 × 2,000cc = 400,000원입니다. 지방교육세(30%) 120,000원을 더하면 연 총 520,000원입니다. 단, 차령이 3년 이상이면 차령경감((차령−2)×5%)으로 줄어듭니다. 예를 들어 5년차(15% 경감)이면 자동차세 340,000원 + 교육세 102,000원 = 442,000원입니다.',
  },
  {
    question: '차령경감은 몇 년 차부터 적용되나요?',
    answer:
      '차령경감은 지방세법 §127①제2호에 따라 3년차부터 적용됩니다. 공식은 (차령 − 2) × 5%이며, 최대 50%(12년차 이상)까지 감면됩니다. 예를 들어 5년차이면 15% 감면, 12년차 이상이면 50% 감면입니다.',
  },
  {
    question: '전기차 자동차세가 정말 정액이라고 하던데?',
    answer:
      '맞습니다. 전기차·수소전기차는 배기량이 없어 지방세법 §127①제3호에 따라 정액 과세됩니다. 비영업용 100,000원 + 지방교육세 30,000원 = 연 130,000원입니다. 배기량 과세차처럼 차령경감이 적용되지 않으므로, 차령이 오래되도 매년 동일합니다.',
  },
  {
    question: '1월에 일시납하면 할인이 있다고 하던데?',
    answer:
      '네, 지방세법 시행령 §125에 따라 1월 1~31일 신청 시 공제율 5%의 연납할인을 받습니다. 예를 들어 연 520,000원이면 약 25,000원이 할인되어 495,000원입니다. 할인액은 (연간 총액 × 선납일수 ÷ 365 × 5%)로 계산됩니다.',
  },
  {
    question: '지방교육세는 별도로 내야 하는 건가요?',
    answer:
      '지방교육세는 지방세법 §151에 따라 자동차세의 30%로 별도 계산되어 추가로 부과됩니다. 자동차세 400,000원이면 교육세는 120,000원 추가이므로, 총 520,000원을 납부해야 합니다. 통지서에 자동차세와 교육세가 각각 표기되니 참고하세요.',
  },
  {
    question: '납부 기한은 언제인가요?',
    answer:
      '자동차세는 지방세법 §128에 따라 1기분(6월 16~30일)과 2기분(12월 16~31일) 두 번에 나뉘어 납부합니다. 6월 1기분이 자동차세 시즌이며, 12월에 2기분을 납부합니다. 기한을 지나면 가산금이 부과되므로 기한 내 납부가 중요합니다.',
  },
];

export default function VehicleTaxCalculation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차세 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차세 계산법 2026 — 배기량별 세율·차령경감·지방교육세 완벽 정리',
    description:
      '자동차세를 정확히 이해하고 계산하는 방법. 배기량별 세율부터 차령경감, 전기차 정액세, 지방교육세, 연납할인까지 모두 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차세', '계산법', '배기량', '차령경감', '세율'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차세 계산법 2026',
    description:
      '자동차의 배기량별 세율 산정부터 차령경감, 지방교육세, 연납할인까지. 비영업용 승용차 기준.',
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
                    { name: '자동차세 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자동차 소유자 · 11분 읽기 · 2026-06-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차세 계산법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 배기량·차령경감·지방교육세 완전 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  6월이 되면 자동차 소유자들에게 도착하는 자동차세 통지서. 그 안의 숫자가 어떻게 나왔는지 궁금한 사람들이 많습니다. 배기량에 따라 cc당 세율이 달라지고, 차가 오래될수록 감면이 이루어지며, 전기차는 정액으로 과세되거든요. 이 가이드는 자동차세의 계산 원리를 단계별로 풀어 설명하고, 차령경감, 전기차 정액세, 지방교육세, 연납할인까지 모두 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-vehicle-tax-calculation-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자동차세 계산의 기본 원리</h2>
                <p>
                  자동차세는 다음과 같은 순서로 계산됩니다:
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">자동차세 = 배기량 × 세율(또는 정액) − 차령경감 + 지방교육세</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    지방교육세(지방세법 §151) = 자동차세 × 30%
                  </p>
                </div>
                <p>
                  가장 중요한 것은 <strong>배기량과 차령</strong>입니다. 배기량에 따라 cc당 세율이 달라지며, 차가 3년 이상이면 차령경감이 적용되어 세금이 깎입니다. 다만 전기차·수소차는 배기량이 없어 정액 과세가 되므로 주의가 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배기량별 자동차세 세율 (지방세법 §127①제1호)</h2>
                <p>
                  비영업용 승용자동차(배기량이 있는 차)의 세율은 배기량에 따라 정해집니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 비영업용 승용자동차 배기량 과세 (지방세법 §127①제1호)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배기량</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">cc당 세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예시 (차령 미고려)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1,000cc 이하</td>
                        <td className="p-3">80원/cc</td>
                        <td className="p-3">1,000cc × 80 = 80,000원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1,001cc ~ 1,600cc</td>
                        <td className="p-3">140원/cc</td>
                        <td className="p-3">1,500cc × 140 = 210,000원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1,601cc 이상</td>
                        <td className="p-3">200원/cc</td>
                        <td className="p-3">2,000cc × 200 = 400,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  세율은 cc당 정액이므로 배기량이 클수록 세금이 높아집니다. 예를 들어 2,000cc 자동차는 1,600원대 자동차보다 훨씬 높은 세금을 내게 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전기차·수소차 정액 과세 (지방세법 §127①제3호)</h2>
                <p>
                  전기자동차(BEV)와 수소전기자동차(FCEV)는 배기량이 없으므로 지방세법 §127①제3호에 따라 정액으로 과세됩니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 전기차·수소차 정액 과세 (지방세법 §127①제3호)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">자동차세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지방교육세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연 총액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비영업용 전기·수소차</td>
                        <td className="p-3">100,000원</td>
                        <td className="p-3">30,000원</td>
                        <td className="p-3"><strong>130,000원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">영업용 전기·수소차</td>
                        <td className="p-3">20,000원</td>
                        <td className="p-3">6,000원</td>
                        <td className="p-3">26,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  <strong>중요한 특징:</strong> 전기차는 배기량이 없어 정액 과세되므로, 차량가격이나 배터리 용량 관계없이 모든 비영업용 전기차가 연 130,000원입니다. 또한 배기량 과세차와 달리 <strong>차령경감이 적용되지 않으므로</strong>, 차가 10년 된 전기차도 매년 130,000원을 냅니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 하이브리드 자동차(HEV, PHEV)는 내연기관 배기량이 있으므로 §127①제1호 배기량 과세 대상이며, 차령경감이 적용됩니다. 전기차와는 다르니 주의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차령경감(지방세법 §127①제2호) — 오래된 차의 감면</h2>
                <p>
                  <strong>배기량 과세차만</strong> 차령경감이 적용됩니다(전기차 제외). 차가 오래될수록 세금이 깎여갑니다:
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">차령경감 = (차령 − 2) × 5% (최대 50%, 12년차 이상)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    3년차부터 적용되며, 매년 5%씩 증가하다가 12년차 이상은 50% 고정입니다.
                  </p>
                </div>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 차령에 따른 경감율</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">차령(연식)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">경감율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">산정 근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1~2년차</td>
                        <td className="p-3">경감 없음</td>
                        <td className="p-3">기본 세율 적용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3년차</td>
                        <td className="p-3">5%</td>
                        <td className="p-3">(3 − 2) × 5% = 5%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5년차</td>
                        <td className="p-3">15%</td>
                        <td className="p-3">(5 − 2) × 5% = 15%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10년차</td>
                        <td className="p-3">40%</td>
                        <td className="p-3">(10 − 2) × 5% = 40%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">12년차 이상</td>
                        <td className="p-3">50% (상한)</td>
                        <td className="p-3">(12 − 2) × 5% = 50% 고정</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">구체적 계산 사례 3가지</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 2,000cc 비영업용 승용차, 차령 1년</p>
                  <p className="text-sm text-text-secondary">
                    · 배기량: 2,000cc (1,601cc 이상 구간)
                    <br />
                    · 기본 자동차세 = 2,000 × 200원 = <strong>400,000원</strong>
                    <br />
                    · 차령 1년(경감 없음)
                    <br />
                    · 자동차세 = 400,000원 − 0 = 400,000원
                    <br />
                    · 지방교육세(30%) = 400,000 × 30% = 120,000원
                    <br />
                    · <strong>연 총 납부액: 520,000원</strong>
                    <br />
                    · 1기분(6월): 260,000원 / 2기분(12월): 260,000원
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 1,500cc 비영업용 승용차, 차령 5년</p>
                  <p className="text-sm text-text-secondary">
                    · 배기량: 1,500cc (1,001~1,600cc 구간)
                    <br />
                    · 기본 자동차세 = 1,500 × 140원 = 210,000원
                    <br />
                    · 차령경감 = (5 − 2) × 5% = 15%
                    <br />
                    · 자동차세 = 210,000 × (1 − 0.15) = <strong>178,500원</strong>
                    <br />
                    · 지방교육세(30%) = 178,500 × 30% = 53,550원
                    <br />
                    · <strong>연 총 납부액: 232,050원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 전기차(배기량 없음), 차령 10년</p>
                  <p className="text-sm text-text-secondary">
                    · 배기량: 없음 (정액 과세)
                    <br />
                    · 자동차세 = <strong>100,000원</strong> (차령 무관)
                    <br />
                    · 차령경감: 미적용 (전기차는 정액이므로 경감 없음)
                    <br />
                    · 지방교육세(30%) = 100,000 × 30% = 30,000원
                    <br />
                    · <strong>연 총 납부액: 130,000원 (매년 동일)</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연납할인 — 1월에 일시납할 때 (지방세법 시행령 §125)</h2>
                <p>
                  자동차세를 1월 1~31일에 일시납하면 공제율 5%의 할인을 받습니다:
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">할인액 = 연간 총액 × (선납일수 ÷ 365) × 5%</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1월에 신청하면 351일(1/1~12/31)로 계산되어 실효 할인율은 약 4.81%입니다.
                  </p>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-text-primary mb-2">연납 신청 예시:</p>
                  <p className="text-sm text-text-secondary">
                    · 연 520,000원인 차량을 1월에 일시납
                    <br />
                    · 할인액 = 520,000 × (351 ÷ 365) × 5% ≈ 24,980원
                    <br />
                    · 납부액 = 520,000 − 24,980 = <strong>약 495,000원</strong>
                    <br />
                    · <strong>실제 할인율: 약 4.81%</strong>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 신청 기간은 <strong>매년 1월 1~31일만</strong> 가능합니다. 2월 이후에 신청하면 선납일수가 줄어들어 할인액도 감소합니다. 예를 들어 3월에 신청하면 선납일수가 273일이 되어 실효 할인율은 약 3.74%가 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">납부 기한 및 미납 시 가산세 (지방세법 §128)</h2>
                <p>
                  자동차세는 지방세이며, 지방세법 §128에 따라 정해진 기한이 있습니다:
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 4. 자동차세 납부 기한</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납부 기한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">통상 발송</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1기분(상반기)</td>
                        <td className="p-3">6월 16일 ~ 6월 30일</td>
                        <td className="p-3">6월 초순</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2기분(하반기)</td>
                        <td className="p-3">12월 16일 ~ 12월 31일</td>
                        <td className="p-3">12월 초순</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  납세 통지서는 각 기한 약 2주 전부터 우편으로 발송됩니다. 기한을 넘기면 가산세가 부과되므로, 반드시 지정된 기한 내에 납부해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-vehicle-tax-calculation-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">자동차세 절감 팁</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 연납할인 활용:</strong> 1월에 일시납하면 5% 할인. 매년 자동으로 할인받지 않으니 반드시 1월에 신청하세요.
                  </li>
                  <li>
                    <strong>2. 배기량 확인:</strong> 차 등록증의 배기량을 확인하세요. 1,600cc와 1,601cc는 140원/cc에서 200원/cc로 올라가므로 큰 차이입니다.
                  </li>
                  <li>
                    <strong>3. 전기차 검토:</strong> 같은 급의 가솔린 차 대비 전기차는 연 130,000원 정액이므로 매우 저렴합니다. 특히 고배기량 차량 검토자에게 유리합니다.
                  </li>
                  <li>
                    <strong>4. 이의신청:</strong> 배기량이 잘못 기록된 경우 이의신청하여 정정 가능. 등록증과 상이하면 구청에 문의하세요.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/vehicle-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">배기량과 차령을 입력하면 바로 자동차세가 계산됩니다.</p>
                  </Link>
                  <Link
                    href="/guide/electric-vehicle-tax-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전기차 자동차세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전기차·수소차의 정액 과세와 하이브리드와의 차이점.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-tax-june-payment-annual-discount-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">6월 자동차세 · 연납할인</div>
                    <p className="mt-1 text-sm text-text-secondary">6월 납부 시즌과 1월 연납할인 완벽 가이드.</p>
                  </Link>
                  <Link
                    href="/guide/january-vehicle-tax-prepayment"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1월 자동차세 연납</div>
                    <p className="mt-1 text-sm text-text-secondary">1월에 연납하는 방법과 할인액 계산.</p>
                  </Link>
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·자동차세 한곳에서.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차 취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">자동차 구매 시 내야 할 취득세 미리 계산하기.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 자동차세 납부는 해당 지역 시청·구청 또는 지방세정청과 상담 후 진행하세요. 본 콘텐츠는 2026-06-22를 기준으로 작성되었으며, 세율 변경 시 즉시 업데이트됩니다. 배기량별 세율, 차령경감, 정액 과세 기준 등은 지방세법 <strong>§127①제1호(배기량 과세)·§127①제2호(차령경감)·§127①제3호(정액 과세)·§151(지방교육세)·§128(납부 기한), 지방세법 시행령 §125(연납할인)</strong>을 참고하세요. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="자동차세 계산법 2026 가이드"
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
