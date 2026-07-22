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

const URL = 'https://calculatorhost.com/guide/property-tax-july-payment-schedule-2026/';
const DATE_PUBLISHED = '2026-06-24';
const DATE_MODIFIED = '2026-06-24';

export const metadata: Metadata = {
  title: '재산세 7월 납부 일정·분납 2026 | 주택 건축물 토지 납기 | calculatorhost',
  description:
    '2026년 재산세 7월·9월 납부 일정 완벽 정리. 주택 1기분·건축물·토지 납기 차이, 250만원 초과 분할납부 방법, 가산세 피하기까지. 지방세법 §115·§118 기준.',
  keywords: [
    '재산세 7월 납부',
    '재산세 납부 일정',
    '재산세 분납',
    '재산세 납기',
    '재산세 2026',
    '지방세법 115조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '재산세 7월 납부 일정·분납 2026 | 주택 건축물 토지 납기 | calculatorhost' }],
    title: '재산세 7월 납부 일정·분납 2026',
    description: '주택 재산세는 7월, 건축물도 7월, 토지는 9월. 납기별 정확한 마감일과 분납 조건, 지연 시 가산세까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산세 7월 납부 일정·분납 2026',
    description: '주택 7월·토지 9월 납기, 250만원 초과 분할납부, 가산금까지. 지방세법 §114·§115·§118 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '재산세는 왜 7월과 9월 두 번 내는 건가요?',
    answer:
      '지방세법 §115에 따라 주택분 재산세는 1기분(1~6월)을 7월 16~31일, 2기분(7~12월)을 9월 16~30일에 납부합니다. 1년 세액을 두 번에 나눠 내는 분납 제도이므로 월급처럼 두 차례 부과됩니다.',
  },
  {
    question: '건축물과 토지는 납기가 다르다는데, 언제 내나요?',
    answer:
      '건축물은 7월 16~31일, 토지는 9월 16~30일에 납부합니다(지방세법 §115). 같은 부동산이지만 세목별로 납기가 다르므로 납세 통지서에서 반드시 확인하세요.',
  },
  {
    question: '250만원 초과면 분할납부 가능하다는데, 어떻게 하나요?',
    answer:
      '지방세법 §118에 따라 납부할 세액이 250만원을 초과하면 세액의 일부를 분할납부할 수 있습니다. 신청 방법과 분납 기한은 납세 통지서 또는 위택스(wetax.go.kr)·관할 시·군·구청 안내를 확인하세요.',
  },
  {
    question: '연세액이 20만원 이하면 달라지나요?',
    answer:
      '연세액 20만원 이하는 분납 대상이 아니며, 7월 16~31일에 전액을 일괄 납부합니다. 분납 대상이 되려면 최소 연세액이 20만원을 초과해야 합니다.',
  },
  {
    question: '납기를 넘기면 가산세가 몇 %인가요?',
    answer:
      '기한을 지나면 가산금이 부과됩니다. 재산세는 지방세이므로 정확한 가산금 규모와 산정 기준은 관할 시·군·구청 또는 위택스(wetax.go.kr) 안내에서 확인하시고, 반드시 기한 내 납부하세요.',
  },
  {
    question: '온라인으로 납부할 수 있나요?',
    answer:
      '네, 대부분의 시군구에서 온라인 납부(전자 결제, 신용카드 등)를 지원합니다. 위택스(wetax.go.kr, 전국)나 서울은 이택스(etax.seoul.go.kr)에서 납세 통지서 조회 후 온라인 결제가 가능합니다.',
  },
  {
    question: '6월에 주택을 샀는데 올해 재산세를 내야 하나요?',
    answer:
      '과세기준일은 매년 6월 1일입니다(지방세법 §114). 6월 1일 이전 구매한 주택은 올해 재산세 대상이지만, 6월 2일 이후 구매했다면 내년 6월부터 첫 재산세가 부과됩니다.',
  },
];

export default function PropertyTaxJulyPaymentSchedule2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 7월 납부 일정·분납 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 7월 납부 일정·분납 2026 — 주택 건축물 토지 납기와 분할납부 완벽 정리',
    description:
      '2026년 재산세 7월 1기분, 9월 2기분 정확한 납부 기한. 건축물과 토지의 다른 납기, 250만원 초과 분할납부 신청 방법, 가산세 피하기까지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세', '납부 일정', '분납', '7월', '9월'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 7월 납부 일정·분납 2026',
    description:
      '주택·건축물·토지별 납부 기한, 분할납부 조건, 지연 시 가산세를 정확히 이해하는 가이드.',
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
                    { name: '재산세 7월 납부 일정·분납 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 소유자 · 7분 읽기 · 2026-06-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 7월 납부 일정·분납 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 주택 건축물 토지 납기와 분할납부 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  6월이 되면 도착하는 재산세 납세 통지서. 그런데 7월에 낸다고 했는데 9월에도 또 내야 한다는 통지서가 오고, 건축물과 토지의 납기가 다르다니 복잡하기만 합니다. 이 가이드는 2026년 재산세 납부 일정을 정확히 정리해드립니다. 주택분 1기분과 2기분의 차이, 건축물과 토지의 다른 납기, 250만원 초과 분할납부 신청 방법까지 모두 담았습니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-july-payment-schedule-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산세 납부 기한 — 7월과 9월</h2>
                <p>
                  지방세법 §115에 따라 주택분 재산세는 연 2회로 나뉘어 납부됩니다. 1년 세액을 두 번에 나눠서 내므로, 각각의 납기를 정확히 알아야 기한을 넘기지 않습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">주택분 재산세 (지방세법 §115)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 1기분 (1~6월분): <strong>7월 16일~31일</strong> 납부
                    <br />
                    · 2기분 (7~12월분): <strong>9월 16일~30일</strong> 납부
                  </p>
                </div>
                <p className="mt-4">
                  단, <strong>연세액이 20만원 이하</strong>인 경우는 분납 대상이 아니므로 7월 16~31일에 전액을 일괄 납부합니다. 이 경우 9월에 납부할 것이 없습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">물건별 납기 차이 — 건축물과 토지</h2>
                <p>
                  같은 부동산이지만 건축물과 토지는 지방세법 §115에서 별도로 납기를 정합니다. 특히 전원주택이나 토지 소유가 있는 경우 두 세목을 나누어 납부해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 재산세 물건별 납기 (지방세법 §115)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주택분 (주거 목적)</td>
                        <td className="p-3"><strong>7월 16~31일 / 9월 16~30일</strong></td>
                        <td className="p-3">분납 (연세액 20만 이하는 7월 일괄)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">건축물분 (건물 일반)</td>
                        <td className="p-3"><strong>7월 16~31일</strong></td>
                        <td className="p-3">일괄 납부 (9월 없음)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">토지분</td>
                        <td className="p-3"><strong>9월 16~30일</strong></td>
                        <td className="p-3">별도 납부 (7월 없음)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 건축물과 토지의 구분은 지자체 등록 기준에 따르므로, 납세 통지서에 명시된 세목별 금액을 꼭 확인하세요. 집합건물(아파트)의 경우 건물 몫과 토지 몫이 나뉘어 통지될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분할납부 — 250만원 초과 시 가능</h2>
                <p>
                  지방세법 §118에 따르면, 납부할 세액이 250만원을 초과하면 세액의 일부를 분할납부할 수 있습니다. 신청 방법과 분납 기한은 납세 통지서 또는 관할 시·군·구청(위택스) 안내에 따릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">분할납부 조건</p>
                  <p className="text-sm text-text-secondary">
                    · 대상: 납부 세액이 250만원을 초과하는 경우만
                    <br />
                    · 신청처: 관할 시·군·구청 (위택스 등 온라인 포함)
                    <br />
                    · 신청·분납 기한: 납세 통지서 및 지자체 안내 확인
                    <br />
                    · 분납 방식: 세액의 일부를 나누어 납부
                  </p>
                </div>
                <p className="mt-4">
                  예를 들어 1기분 세액이 600만원이라면 250만원을 초과하므로, 관할 시·군·구청에 분할납부를 신청해 세액의 일부를 나누어 낼 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 분할납부 신청 후에도 납부 기한이 정해지므로 그 기한은 반드시 지켜야 합니다. 또한 250만원 초과라는 조건을 만족해야만 가능하니 금액을 먼저 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">과세기준일과 실제 부과</h2>
                <p>
                  재산세의 과세기준일은 매년 <strong>6월 1일</strong>입니다(지방세법 §114). 6월 1일 현재 소유 중인 주택에 대해 그해 재산세가 부과됩니다.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>6월 1일 이전 구입한 주택: 그해 7월·9월 재산세 대상</li>
                  <li>6월 2일 이후 구입한 주택: 다음해 6월 1일부터 과세 대상</li>
                  <li>6월 1일 이전 매도한 주택: 그해 재산세 부과 없음</li>
                </ul>
                <p className="mt-4">
                  납세 통지서는 보통 6월 중순경 우편으로 발송됩니다. 통지서에는 1기분(7월), 2기분(9월) 각각의 납부액과 납기가 명시되어 있으니 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기한을 지났을 때 — 가산세</h2>
                <p>
                  재산세는 지방세이며, 지정된 납기를 넘기면 가산금이 부과됩니다. 가산금의 정확한 규모와 산정 방법은 관할 시·군·구청(위택스) 기준에 따르므로, 반드시 기한 내 납부하는 것이 중요합니다.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>기한 내 납부가 원칙: 7월 16~31일, 9월 16~30일</li>
                  <li>기한 경과 후 가산금 부과: 구체 기준은 관할 지자체 안내 참조</li>
                  <li>분할납부: 납부세액 250만원 초과 시 일부 분할 가능</li>
                </ul>
                <p className="mt-4">
                  온라인 납부나 세무서 방문으로 언제든지 납부할 수 있으니, 통지서를 받은 후 가능한 한 빨리 납부하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">납부 방법 — 온라인·현금·계좌이체</h2>
                <p>
                  재산세는 여러 방법으로 납부할 수 있습니다. 대부분의 시군구에서 온라인 결제 시스템을 제공하고 있으므로, 가장 편리한 방법을 선택하면 됩니다.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li><strong>위택스(wetax.go.kr)</strong> — 전국 지방세 온라인 조회·납부 (신용카드·계좌이체)</li>
                  <li><strong>이택스(etax.seoul.go.kr)</strong> — 서울시 지방세 온라인 납부</li>
                  <li><strong>은행 자동이체</strong> — 관할 시·군·구청 또는 금융기관 신청 시 자동 납부</li>
                  <li><strong>현금 직접 납부</strong> — 관할 시·군·구청, ARS·은행 창구</li>
                </ul>
                <p className="mt-4">
                  온라인 납부가 가장 빠르고 안전하므로, 납세 통지서를 받으면 위택스(서울은 이택스)에서 납세 통지서를 조회한 뒤 즉시 결제하시기를 권장합니다.
                </p>
              </section>

              <AdSlot slot="guide-property-tax-july-payment-schedule-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">2026년 재산세 일정 체크리스트</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary">6월 (과세기준일: 6월 1일)</p>
                    <ul className="mt-2 text-sm text-text-secondary space-y-1 ml-4 list-disc">
                      <li>6월 1일 현재 주택 소유 여부 확인</li>
                      <li>6월 중순경 납세 통지서 우편 수령</li>
                      <li>1기분·2기분 납부액 및 납기 확인</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary">7월 (1기분 납기: 7월 16~31일)</p>
                    <ul className="mt-2 text-sm text-text-secondary space-y-1 ml-4 list-disc">
                      <li>주택분 1기분 및 건축물분 납부</li>
                      <li>온라인 또는 세무서 직접 납부</li>
                      <li>250만원 초과는 분할납부 신청 고려</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary">9월 (2기분·토지분 납기: 9월 16~30일)</p>
                    <ul className="mt-2 text-sm text-text-secondary space-y-1 ml-4 list-disc">
                      <li>주택분 2기분 및 토지분 납부</li>
                      <li>250만원 초과 시 분할납부 신청 (관할 시·군·구청)</li>
                      <li>연세액 20만원 이하면 7월 일괄 납부로 9월 없음</li>
                    </ul>
                  </div>
                </div>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/property-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준을 입력하여 납부할 재산세액을 미리 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-calculation-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·세율·누진공제를 알고 싶다면 먼저 읽으세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-base-date-june-1-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 과세기준일 6월 1일</div>
                    <p className="mt-1 text-sm text-text-secondary">6월 1일에 주택을 사고팔면 재산세가 어떻게 부과되는지 정리.</p>
                  </Link>
                  <Link
                    href="/guide/june-property-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">6월 재산세 완벽 준비</div>
                    <p className="mt-1 text-sm text-text-secondary">재산세 고지부터 납부까지 6월 한달 필수 체크리스트.</p>
                  </Link>
                  <Link
                    href="/guide/september-property-tax-second"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">9월 재산세 2기분 납부</div>
                    <p className="mt-1 text-sm text-text-secondary">9월 16~30일 2기분 납부 일정과 주의사항.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-calculation-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">다주택 보유 시 종부세와 재산세의 차이를 이해하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 재산세 납부 기한, 분할납부 조건, 가산금은 관할 시·군·구청 또는 위택스에 직접 확인 후 진행하세요. 본 콘텐츠는 2026-06-24을 기준으로 작성되었으며, 지방세법 개정 시 즉시 업데이트됩니다. 납부 납기, 분할납부, 과세기준일 등 정확한 기준은 법조항 <strong>지방세법 §114(과세기준일)·§115(납기)·§118(분할납부)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스</a>,{' '}
                  <a href="https://etax.seoul.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">서울시 이택스</a>.
                </p>
              </section>

              <ShareButtons
                title="재산세 7월 납부 일정·분납 2026 가이드"
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
