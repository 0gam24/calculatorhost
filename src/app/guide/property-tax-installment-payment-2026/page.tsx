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

const URL = 'https://calculatorhost.com/guide/property-tax-installment-payment-2026/';
const DATE_PUBLISHED = '2026-07-01';
const DATE_MODIFIED = '2026-07-01';

export const metadata: Metadata = {
  title: '재산세 분납(분할납부) 2026 | 250만원 초과 시 신청·기한·한도',
  description:
    '재산세 본세 250만원 초과 시 분할납부 가능. 분납 한도(최대 50%), 신청 방법(위택스·세무서), 7월 1기 납기. 지방세법 §118 기준.',
  keywords: [
    '재산세 분납',
    '재산세 분할납부',
    '250만원 기준',
    '분납 한도',
    '위택스 분납 신청',
    '재산세 납부 기한',
    '지방세법 118조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '재산세 분납(분할납부) 2026 | 250만원 초과 시 신청·기한·한도' }],
    title: '재산세 분납(분할납부) 2026 — 250만원 초과 시 분할납부 방법과 한도',
    description: '재산세 본세가 250만원을 초과하면 분할납부 가능. 분납 신청 방법, 한도, 납기별 유의사항을 완벽 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산세 분납 2026 — 250만원 초과 분할납부 신청 방법',
    description: '재산세 본세 250만원 초과 시 분할납부 신청 가능. 위택스·세무서 접수 방법, 한도 계산, 가산금 면제 조건.',
  },
};

const FAQ_ITEMS = [
  {
    question: '재산세 분납이란 정확히 무엇인가요?',
    answer:
      '분납(분할납부)은 높은 재산세를 한 번에 내지 않고 여러 번에 나누어 내는 제도입니다(지방세법 §118). 납부세액이 250만원을 초과하면 신청할 수 있으며, 일정 기한(2개월) 내에 분납금을 납부하면 가산금 없이 처리됩니다. 부담이 큰 세금을 시간차를 두고 납부함으로써 현금 흐름을 관리할 수 있는 제도입니다.',
  },
  {
    question: '정확히 어느 정도부터 분납을 신청할 수 있나요?',
    answer:
      '재산세 본세(부가세목 제외)가 250만원을 초과하면 신청 가능합니다. 250만원 이하면 분납이 불가능하며, 일시에 납부해야 합니다. 단, 지방교육세·도시지역분·지역자원시설세 등은 별도 계산되므로, 위택스에서 본세 기준으로 반드시 확인하세요.',
  },
  {
    question: '분납 한도는 얼마나 되나요?',
    answer:
      '분납할 수 있는 금액의 한도는 납부세액에 따라 다릅니다(지방세법 시행령 §116). 250만원 초과 500만원 이하면 "250만원을 초과하는 금액"까지 분납 가능하고, 500만원을 초과하면 "납부세액의 50% 이하"까지 분납할 수 있습니다. 예를 들어 재산세가 600만원이면 최대 300만원까지 분납 신청이 가능합니다.',
  },
  {
    question: '분납 기한은 얼마나 되나요?',
    answer:
      '분납 신청 후 기한은 납부기한이 지난 날부터 2개월 이내입니다(지방세법 §118). 예를 들어 7월 31일이 1기 납기라면, 분납금 납부 기한은 9월 30일입니다. 기한 내에 모든 분납금을 납부하면 가산금이 붙지 않습니다.',
  },
  {
    question: '분납 신청은 어디서 어떻게 하나요?',
    answer:
      '두 가지 방법이 있습니다. ① 위택스(wetax.go.kr)에 개인 계정으로 로그인 후 분할납부신청 메뉴에서 온라인 신청, ② 관할 시·군·구청 세무서를 방문하거나 전화로 신청서를 제출. 온라인이 편하지만, 특수한 상황(신축·증축·용도변경)이면 세무서 직접 문의를 추천합니다.',
  },
  {
    question: '분납하면 정말 가산금이 없나요?',
    answer:
      '네, 분납 신청 후 정해진 기한 내에 모든 분납금을 납부하면 가산금(이자)이 붙지 않습니다(지방세법 §118). 다만 기한을 넘기면 그 이후부터 가산금이 발생하므로, 신청 시 분납 일정을 정확히 확인하고 기한 내 납부를 반드시 지켜야 합니다.',
  },
  {
    question: '7월·9월 분기마다 따로 분납을 신청해야 하나요?',
    answer:
      '그렇습니다. 재산세는 1기(7월)와 2기(9월)가 별도로 부과되므로, 각 기마다 분납 신청을 해야 합니다. 1기에 분납을 신청했어도 2기는 새롭게 신청해야 하며, 각 기의 분납 기한도 독립적으로 계산됩니다. 위택스에서 각 기별로 따로 신청 가능합니다.',
  },
];

export default function PropertyTaxInstallmentPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 분납 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 분납(분할납부) 2026 — 250만원 초과 시 분할납부 방법과 한도',
    description:
      '재산세 본세가 250만원을 초과하면 분할납부 가능. 신청 방법(위택스·세무서), 분납 한도(최대 50%), 2개월 납기 기한, 가산금 면제 조건, 7월 1기·9월 2기별 유의사항 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세 분납', '분할납부', '250만원', '위택스 신청', '지방세법 118조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 분납 2026',
    description: '재산세 본세 250만원 초과 시 분할납부 신청 방법, 한도, 기한, 유의사항.',
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
                    { name: '재산세 분납 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 소유자 · 7분 읽기 · 2026-07-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 분납(분할납부) 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 250만원 초과 시 분할납부 신청·한도·기한</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  7월이 재산세 1기 납부 시즌입니다. 높은 재산세를 한 번에 내기 어렵다면 분할납부(분납)를 고려해보세요. 재산세 본세가 250만원을 초과하면 최대 2개월에 걸쳐 나누어 낼 수 있으며, 기한 내에 납부하면 가산금 없이 처리됩니다. 이 가이드는 분납의 기준, 한도, 신청 방법, 납기별 주의사항을 완벽하게 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-installment-payment-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산세 분납이란</h2>
                <p>
                  분할납부(분납)는 높은 재산세를 한 번에 내지 않고 정해진 기한 내에 여러 번 나누어 내는 제도입니다(지방세법 §118). 특히 높은 세금 부담으로 인한 현금 흐름 어려움을 완화하기 위해 설계되었습니다. 정부 입장에서도 분납을 통해 더 많은 납세자의 성실한 납부를 유도할 수 있어, 분납 신청 후 기한 내 납부 시 가산금(이자)을 면제해줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">분납의 핵심 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    재산세 본세가 250만원을 초과하면 분납 신청 가능. 신청 후 정해진 기한(2개월) 내에 분납금을 납부하면 가산금 없음. 기한을 넘기면 그 이후부터만 가산금 발생.
                    <br />
                    예: 분납 신청액 300만원 → 1차 150만원 + 2차 150만원 (각각 1개월씩 분산 납부 가능)
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 분납은 재산세 본세(지방세법 §3에 따른 재산세)에만 적용됩니다. 지방교육세, 도시지역분, 지역자원시설세 등 부가세목은 별도이므로, 위택스에서 본세 기준으로 정확히 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납 신청 기준: 250만원 초과</h2>
                <p>
                  분할납부를 신청할 수 있는 기본 조건은 재산세 본세 납부세액이 250만원을 초과하는 것입니다(지방세법 §118, 시행령 §116). 이는 절대 기준으로, 250만원 이하면 분납이 불가능합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 재산세 본세액별 분납 가능 여부 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납부세액(본세)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분납 신청 가능 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">250만원 이하</td>
                        <td className="p-3"><strong>불가능</strong></td>
                        <td className="p-3">일시에 전액 납부</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">250만원 초과~500만원 이하</td>
                        <td className="p-3"><strong>가능</strong></td>
                        <td className="p-3">250만원 초과분까지 분납</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">500만원 초과</td>
                        <td className="p-3"><strong>가능</strong></td>
                        <td className="p-3">납부세액의 50% 이하 분납</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예를 들어, 재산세 본세가 200만원이면 분납 신청 불가능(250만원 미만). 하지만 300만원이면 250만원을 초과하는 50만원은 분납 가능합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납 한도 계산</h2>
                <p>
                  분납할 수 있는 금액의 한도는 납부세액 규모에 따라 다릅니다(지방세법 시행령 §116). 정확히 이해하면 현금 흐름 계획을 세울 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 세액 300만원 (250만원 초과~500만원 이하)</p>
                  <p className="text-sm text-text-secondary">
                    · 납부세액: 300만원
                    <br />
                    · 분납 한도: 300만원 − 250만원 = <strong>50만원</strong>
                    <br />
                    · 분납 방법: 일시 250만원 + 분납 50만원 (최대 2개월 분산)
                    <br />
                    · 총 납부액: 300만원 (변함없음, 단지 납부 시점이 분산될 뿐)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 250만원은 반드시 1차로 납부하고, 초과분 50만원만 분납 가능.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 세액 600만원 (500만원 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 납부세액: 600만원
                    <br />
                    · 분납 한도: 600만원 × 50% = <strong>300만원</strong>
                    <br />
                    · 분납 방법: 일시 300만원 + 분납 300만원 (2개월에 걸쳐 분산)
                    <br />
                    · 예시: 1차 300만원 + 2차 150만원 + 3차 150만원 (기한 내 모두 납부)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 최대 절반까지 분납 신청 가능. 현금 흐름이 유리한 구조.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 세액 1,000만원 (500만원 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 납부세액: 1,000만원
                    <br />
                    · 분납 한도: 1,000만원 × 50% = <strong>500만원</strong>
                    <br />
                    · 분납 방법: 일시 500만원 + 분납 500만원
                    <br />
                    · 실제 납부: 1차 500만원 + 2차 250만원 + 3차 250만원 (예시)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 정확한 분납 스케줄은 위택스에서 신청 시 조정 가능.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 분납 신청 후 기한 내에 모든 분납금을 완납해야만 가산금이 면제됩니다. 분납금 중 하나라도 기한을 넘기면 그 이후부터 가산금이 발생하므로, 신청 시 확실히 납부 가능한 일정을 계획해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납 신청 방법 2가지</h2>
                <p>
                  분납 신청은 온라인과 오프라인 두 가지 방법으로 가능합니다. 각 방법의 장단점을 이해하면 자신에게 맞는 방식을 선택할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 위택스(wetax.go.kr) 온라인 신청 — 빠르고 편함</p>
                  <p className="text-sm text-text-secondary">
                    · 위택스 사이트(wetax.go.kr) 접속
                    <br />
                    · 개인 계정으로 로그인 (공동인증서 또는 간편인증)
                    <br />
                    · "분할납부신청" 또는 "분납신청" 메뉴 선택
                    <br />
                    · 재산세 납부 내역 확인 후 분납 신청서 작성
                    <br />
                    · 분납 금액·분납 회차·납부 일정 입력
                    <br />
                    · 신청 완료 (즉시 처리, 확인서 출력 가능)
                    <br />
                    <span className="text-xs text-text-tertiary">장점: 24시간 신청 가능, 확인서 즉시 발급, 납부 일정도 온라인에서 관리. 추천!</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 관할 시·군·구청 세무서 방문/전화</p>
                  <p className="text-sm text-text-secondary">
                    · 관할 지역 시·군·구청 세무서 찾기 (예: 강남구청 세무과)
                    <br />
                    · 전화로 분납신청서 문의 → 양식 다운로드
                    <br />
                    · 또는 직접 방문하여 담당 공무원과 상담
                    <br />
                    · 필요 서류: 신분증, 인감증명서(또는 서명), 납세통지서
                    <br />
                    · 분납신청서 작성 후 제출
                    <br />
                    · 확인 후 승인 통지 (1-2일 소요)
                    <br />
                    <span className="text-xs text-text-tertiary">장점: 직접 상담 가능, 특수 상황(신축·증축) 안내. 단점: 시간이 걸림, 신청서 준비 필요.</span>
                  </p>
                </div>
                <p className="mt-4">
                  특별한 사정(신축, 증축, 용도변경, 소유권 이전)이 있다면 위택스보다는 세무서 직접 문의를 추천합니다. 공무원이 개별 상황을 판단해 정확한 가이드를 줄 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납 기한: 2개월, 가산금 면제 조건</h2>
                <p>
                  분납을 신청하면 정해진 기한 내에 분납금을 납부해야 합니다. 기한 내 납부가 가산금 면제의 절대 조건입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">분납 기한 계산</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    분납 기한: 납부기한이 지난 날부터 <strong>2개월 이내</strong>(지방세법 §118)
                    <br />
                    <br />
                    <strong>1기(7월) 분납 예시:</strong>
                    <br />
                    · 1기 납부기한: 2026년 7월 31일
                    <br />
                    · 분납 신청 기한: 2026년 7월 31일 이내에 신청
                    <br />
                    · 분납금 최종 납부 기한: 2026년 9월 30일
                    <br />
                    <br />
                    <strong>2기(9월) 분납 예시:</strong>
                    <br />
                    · 2기 납부기한: 2026년 9월 30일
                    <br />
                    · 분납 신청 기한: 2026년 9월 30일 이내
                    <br />
                    · 분납금 최종 납부 기한: 2026년 11월 30일
                  </p>
                </div>
                <p className="mt-4">
                  <strong>가산금 면제의 핵심: 기한 내 완납</strong>
                </p>
                <p className="text-sm text-text-secondary">
                  분납금 일부가 기한을 넘기면 그 이후부터 가산금이 발생합니다(국세기본법 §47). 예를 들어 1차 분납금 150만원이 9월 30일까지 내야 하는데 10월 15일에 내면, 그 사이 기간에 대한 가산금이 계산됩니다. 따라서 분납 신청할 때 확실히 납부 가능한 일정만 선택해야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 천재지변이나 납세자의 정당한 사정(질병·실업·재해)이 있으면 기한 연장을 신청할 수 있습니다. 이 경우 관할 세무서에 서류와 함께 연장 신청을 하면 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">7월·9월 분기별 분납 신청 방법</h2>
                <p>
                  재산세는 1기(7월)와 2기(9월)로 나뉘어 부과됩니다. 각 기마다 분납 신청을 독립적으로 해야 한다는 점이 중요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1기(7월 1일~31일) 분납 절차</p>
                  <p className="text-sm text-text-secondary">
                    · 6월 중순경: 재산세 납세 통지서 수령
                    <br />
                    · 7월 중: 1기 재산세액 확인 (본세 기준)
                    <br />
                    · 250만원 초과 시: 위택스 또는 세무서에서 분납 신청
                    <br />
                    · 7월 31일 전: 신청 완료 필수
                    <br />
                    · 1차 납부: 7월 31일 또는 신청 시 정한 일정에 납부
                    <br />
                    · 2차 납부: 9월 30일 이내에 완납
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2기(9월 1일~30일) 분납 절차</p>
                  <p className="text-sm text-text-secondary">
                    · 2기 납세 통지서 도착 (보통 8월 말)
                    <br />
                    · 2기 재산세액 확인 (1기와는 독립적)
                    <br />
                    · 250만원 초과 시: 별도로 분납 신청 (1기 신청 여부와 무관)
                    <br />
                    · 9월 30일 전: 2기 분납 신청 완료 필수
                    <br />
                    · 1차 납부: 9월 30일 또는 신청 시 정한 일정
                    <br />
                    · 2차 납부: 11월 30일 이내에 완납
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 주의: 1기와 2기는 완전히 별개이므로, 1기에 분납했다고 해서 2기 분납이 자동으로 신청되지 않습니다. 2기도 250만원을 초과하면 다시 신청해야 합니다. 또한 각 기의 분납 한도도 각각 계산됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납 불가능한 경우</h2>
                <p>
                  모든 재산세에 분납이 가능한 것은 아닙니다. 특정 상황에서는 분납 신청이 거절되거나 제한될 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>납부세액 250만원 이하:</strong> 분납 신청 자체가 불가능합니다. 일시에 전액 납부해야 합니다.
                  </li>
                  <li>
                    <strong>납기한 이후 신청:</strong> 1기는 7월 31일, 2기는 9월 30일을 기한으로 신청해야 합니다. 기한을 넘어 신청하면 거절될 수 있습니다.
                  </li>
                  <li>
                    <strong>체납 누적 상태:</strong> 이전 연도 재산세를 내지 않아 체납이 있다면, 분납 신청 대신 체납금 먼저 납부를 강제받을 수 있습니다.
                  </li>
                  <li>
                    <strong>부가세목(지방교육세·도시지역분 등):</strong> 이들은 분납 대상이 아니며, 별도 세율로 계산됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 정확한 분납 가능 여부는 관할 세무서에서 판단하므로, 의심스러우면 직접 문의하는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-property-tax-installment-payment-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">분납 신청 후 현금흐름 관리 팁</h2>
                <p>
                  분납의 진정한 가치는 현금 흐름을 유리하게 조정할 수 있다는 점입니다. 다음은 분납을 현명하게 활용하는 팁입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>위택스에서 납부 일정 추적:</strong> 위택스 앱이나 웹사이트에서 분납 일정을 자동으로 조회할 수 있습니다. 매달 첫째 주에 한 번씩 확인하는 습관이 좋습니다.
                  </li>
                  <li>
                    <strong>자동이체 설정:</strong> 분납금 납부 시점에 자동으로 이체되도록 은행에서 설정하면 납부 기한을 놓칠 염려가 없습니다.
                  </li>
                  <li>
                    <strong>기한 5일 전 납부 권장:</strong> 실수로 기한을 넘길 가능성을 배제하려면, 정해진 기한의 5일 전에 미리 납부하는 것을 추천합니다.
                  </li>
                  <li>
                    <strong>분납과 1세대1주택 특례 병행:</strong> 분납과 1세대1주택 특례세율은 별개 제도로 동시에 적용될 수 있습니다. 자신이 특례 대상인지 위택스에서 확인하세요.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가격과 과세표준으로 재산세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율·과세표준·누진공제의 기본을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-july-payment-schedule-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 7월 납부 일정</div>
                    <p className="mt-1 text-sm text-text-secondary">1기 납기(7월 16~31일)·2기 일정·분납 안내.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-burden-cap-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 세부담상한제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가 폭등 시 인상폭 제한 메커니즘.</p>
                  </Link>
                  <Link
                    href="/guide/june-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">6월 재산세 완벽 준비</div>
                    <p className="mt-1 text-sm text-text-secondary">재산세 고지부터 분납까지 한 달 체크리스트.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 분납 신청 가능 여부, 한도액, 기한, 최종 납부액은 관할 시·군·구청 세무서 또는 위택스(wetax.go.kr)에서 반드시 확인하세요. 특히 신축·증축·용도변경·소유권 이전 등의 경우 상황이 복잡할 수 있으므로 직접 문의하는 것이 안전합니다. 본 콘텐츠는 2026-07-01을 기준으로 작성되었으며, 지방세법 개정 시 즉시 업데이트됩니다. 분납 기준은 법조항 <strong>지방세법 §118(분할납부)</strong>, <strong>지방세법 시행령 §116</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(지방세법 §118)</a>,{' '}
                  <a href="https://etax.seoul.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">서울시 이택스 분납 안내</a>.
                </p>
              </section>

              <ShareButtons
                title="재산세 분납 2026 가이드"
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
