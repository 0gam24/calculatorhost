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

const URL = 'https://calculatorhost.com/guide/vehicle-tax-prepayment-refund-2026/';
const DATE_PUBLISHED = '2026-06-24';
const DATE_MODIFIED = '2026-06-24';

export const metadata: Metadata = {
  title: '자동차세 연납 환급 2026 | 중고차 매각·폐차 시 일할 환급 방법 | calculatorhost',
  description:
    '1월 연납했는데 연중에 중고차를 팔거나 폐차했다면 일할계산 환급 대상. 자동차세 연납 환급의 절차, 계산, 대상 조건을 지방세법 §128에 기반해 설명합니다.',
  keywords: [
    '자동차세 환급',
    '자동차세 연납 환급',
    '중고차 환급',
    '폐차 환급',
    '자동차 소유권 이전 환급',
    '자동차세 일할계산',
    '지방세법 128조',
    '자동차세 취득세 환급',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '자동차세 연납 환급 2026 | 중고차 매각·폐차 환급' }],
    title: '자동차세 연납 환급 2026 — 연중 매각·폐차 시 환급받기',
    description: '1월에 연납한 자동차세, 연중 매각·폐차·이전 시 소유하지 않은 기간 환급받는 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차세 연납 환급 2026 — 연중 매각·폐차 시 환급받기',
    description: '1월 연납한 자동차세, 연중 매각·폐차·이전 시 소유하지 않은 기간만큼 일할계산으로 환급받는 방법. 지방세법 §127·§128 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '1월에 연납했는데 6월에 중고차를 팔면 환급받을 수 있나요?',
    answer:
      '네, 가능합니다. 자동차세는 소유 기간에 비례하는 세금이므로, 연중에 차량을 매각하면 매각 후 소유하지 않게 된 잔여 기간만큼 일할계산하여 환급됩니다. 예를 들어 1월에 520,000원을 연납했다가 7월 1일에 소유권을 이전하면, 7월~12월(184일) 분만큼 환급받습니다.',
  },
  {
    question: '폐차했을 때도 자동차세 환급받을 수 있나요?',
    answer:
      '네, 폐차(등록말소)도 환급 대상입니다. 폐차 처리하여 차량 등록이 말소되는 날을 기준으로 그 이후 기간에 대한 세금이 환급됩니다. 폐차 시 자동차세 환급을 신청하려면 폐차 증명서와 함께 차량 등록지 시청·구청에 문의하세요.',
  },
  {
    question: '환급받는 절차가 복잡한가요?',
    answer:
      '소유권 이전이나 말소(폐차)가 전산 시스템에 반영되면, 지자체에서 환급 대상을 자동으로 파악합니다. 대부분의 경우 자동으로 환급이 처리되며, 환급계좌가 없으면 수령 통지서가 발송됩니다. 다만 이월된 세금이나 특수한 경우라면 차량 등록지 지자체(위택스/이택스)에 별도 신청할 수 있습니다.',
  },
  {
    question: '1월 연납 할인(5%)을 받았는데, 환급할 때 할인도 환급되나요?',
    answer:
      '네, 할인액도 함께 환급됩니다. 예를 들어 연 520,000원에서 24,980원을 할인받아 495,020원을 1월에 납부했다면, 소유하지 않은 기간 비례분을 계산할 때 할인이 포함된 기준액으로 환급됩니다.',
  },
  {
    question: '자동차세 환급은 언제 들어오나요?',
    answer:
      '소유권 이전·말소가 전산 반영된 후 약 2~4주 내 환급 처리가 됩니다. 자동으로 환급계좌가 있으면 그곳으로 송금되고, 없으면 우편으로 수령 통지서가 발송되어 지자체에 방문 수령할 수 있습니다. 정확한 시일은 해당 지자체(시청·구청)에 문의하세요.',
  },
  {
    question: '소유권을 다른 사람에게 이전할 때와 폐차할 때 환급이 다른가요?',
    answer:
      '환급의 기준은 동일합니다. 소유권 이전이든 폐차(등록말소)든 그 이후 기간에 대해 일할계산으로 환급됩니다. 다만 절차는 약간 다를 수 있으니 해당 지자체에 확인하는 것이 정확합니다.',
  },
];

export default function VehicleTaxPrepaymentRefund2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차세 연납 환급 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차세 연납 환급 2026 — 중고차 매각·폐차 시 일할 환급 받는 법',
    description:
      '1월에 연납한 자동차세, 연중 중고차 매각·폐차·소유권 이전 시 소유하지 않은 기간만큼 일할계산으로 환급받는 방법을 지방세법 §128에 기반해 설명합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차세', '환급', '연납', '중고차', '폐차', '일할계산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차세 연납 환급 2026',
    description:
      '1월 연납한 자동차세를 연중 중고차 매각·폐차·소유권 이전 시 일할계산으로 환급받는 방법과 절차.',
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
                    { name: '자동차세 연납 환급 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">중고차 판매자·폐차 예정자 · 9분 읽기 · 2026-06-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차세 연납 환급 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 중고차 매각·폐차 시 일할 환급받기</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  1월에 자동차세를 연납하면 5% 할인을 받는다는 것을 알고 계신가요? 그런데 혹시 연중에 자동차를 팔거나 폐차해야 한다면 어떻게 될까요? 손해만 보는 걸까요? 아닙니다. 자동차세는 차량을 소유한 기간에만 부과되므로, 연중에 소유권을 이전하거나 폐차하면 소유하지 않게 된 잔여 기간만큼 세금을 돌려받을 수 있습니다. 이 가이드는 자동차세 연납 환급의 원리, 대상, 절차를 상세히 설명하고, 실제 환급 계산 사례까지 제시합니다.
                </p>
              </header>

              <AdSlot slot="guide-vehicle-tax-prepayment-refund-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자동차세 연납 환급은 왜 가능한가?</h2>
                <p>
                  자동차세는 <strong>소유 기간에 비례하는 세금</strong>입니다. 따라서 1월에 1년치(1월~12월)를 미리 납부했다가 연중에 차량을 팔거나 폐차하면, 이미 납부한 세금 중 소유하지 않게 된 기간에 대한 부분을 돌려받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">자동차세 환급 = 납부액 × (잔여 소유 일수 ÷ 365)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    지방세법 §128을 기준으로, 소유권이 이전되거나 차량이 등록말소되는 날을 기준으로 그 이후 기간에 대해 일할계산합니다.
                  </p>
                </div>
                <p className="mt-4">
                  자동차세는 소유권자 기준이므로, 소유권 이전 또는 폐차 등록말소 날짜가 환급액을 결정합니다. 따라서 <strong>정확한 이전·말소 일자 확인</strong>이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자동차세 연납 환급 대상은?</h2>
                <p>
                  자동차세 연납 환급 대상은 다음과 같습니다:
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">1. 중고차 매각 (소유권 이전)</p>
                  <p className="text-sm text-text-secondary">
                    차량을 개인 또는 법인에게 팔아 소유권을 이전했을 때, 이전 후 기간에 대해 환급받습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-3">
                  <p className="font-semibold text-text-primary">2. 폐차 (등록말소)</p>
                  <p className="text-sm text-text-secondary">
                    차량을 폐차하여 등록을 말소했을 때, 말소 이후 기간에 대해 환급받습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-3">
                  <p className="font-semibold text-text-primary">3. 다른 소유자로 이전 (상속·증여·압류 등)</p>
                  <p className="text-sm text-text-secondary">
                    상속, 증여, 법원 경매 등으로 소유권이 변경되었을 때도 환급 대상입니다.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 임시 등록번호로 판매 전 시운전을 한 경우나, 사실상 소유권 이전이 아닌 경우는 환급 대상이 아닐 수 있습니다. 정확한 판단은 차량 등록지 시청·구청(이택스 또는 위택스)에 문의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연납 환급 계산 사례 3가지</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 2,000cc 차량 연납 후 7월 매각</p>
                  <p className="text-sm text-text-secondary">
                    · 1월 연납 납부액: 520,000원 (자동차세 400,000 + 지방교육세 120,000)
                    <br />
                    · 소유권 이전 날짜: 7월 1일
                    <br />
                    · 잔여 기간: 7월 1일 ~ 12월 31일 = 184일
                    <br />
                    · 일할 환급액 = 520,000 × (184 ÷ 365) = <strong>약 262,000원</strong>
                    <br />
                    · 결론: 7월에 소유권을 이전하면 약 26만 2천원이 돌아옵니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 전기차(130,000원 정액) 폐차 (9월)</p>
                  <p className="text-sm text-text-secondary">
                    · 1월 연납 납부액: 130,000원 (정액 과세, 차령경감 미적용)
                    <br />
                    · 등록말소 날짜: 9월 15일
                    <br />
                    · 잔여 기간: 9월 15일 ~ 12월 31일 = 108일
                    <br />
                    · 일할 환급액 = 130,000 × (108 ÷ 365) = <strong>약 38,400원</strong>
                    <br />
                    · 결론: 9월 중순에 폐차하면 약 3만 8천원이 환급됩니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 1,500cc 5년차 차량 (연납 할인 포함) 12월 매각</p>
                  <p className="text-sm text-text-secondary">
                    · 기본 자동차세 = 1,500 × 140 = 210,000원
                    <br />
                    · 차령경감(15%) 적용 = 210,000 × 0.85 = 178,500원
                    <br />
                    · 지방교육세(30%) = 178,500 × 0.30 = 53,550원
                    <br />
                    · 1월 연납액(할인 전) = 232,050원
                    <br />
                    · 1월 연납 할인(5%) = 232,050 × 0.05 × (351 ÷ 365) ≈ 11,100원
                    <br />
                    · 실제 1월 납부액 = 232,050 − 11,100 = 220,950원
                    <br />
                    · 소유권 이전 날짜: 12월 10일
                    <br />
                    · 잔여 기간: 12월 10일 ~ 12월 31일 = 21일
                    <br />
                    · 일할 환급액 = 220,950 × (21 ÷ 365) = <strong>약 12,750원</strong>
                    <br />
                    · 결론: 12월 중순 매각하면 약 1만 2천원 환급. 연납 할인의 대부분은 이미 자신이 소유한 기간에 사용했으므로 환급액도 적습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자동차세 연납 환급 받는 절차</h2>
                <p>
                  대부분의 경우 자동으로 처리되지만, 절차를 알아두면 도움이 됩니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 자동차세 환급 절차</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">소요 시간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1. 소유권 이전 또는 폐차 처리</td>
                        <td className="p-3">시·군·구청 차량등록과(또는 자동차등록사업소)에서 소유권 이전(이전등록) 또는 등록말소</td>
                        <td className="p-3">당일~3일</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2. 전산 반영</td>
                        <td className="p-3">차량 등록지 시청·구청 전산에 변경 사항 자동 반영</td>
                        <td className="p-3">2~5일</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3. 환급 처리</td>
                        <td className="p-3">지자체에서 환급 대상 확인 후 세금 환급</td>
                        <td className="p-3">1~2주</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4. 환급금 수령</td>
                        <td className="p-3">등록된 계좌로 자동 송금 또는 수령 통지서 발송</td>
                        <td className="p-3">2~4주</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  <strong>핵심 포인트:</strong> 소유권 이전·폐차 등록이 되면, 차량 등록지 지자체에서 자동으로 환급 대상을 파악합니다. 따라서 별도 신청 없이도 환급이 진행됩니다. 다만 환급 계좌가 없으면 수령 통지서가 우편으로 발송되니, 지자체에 문의하여 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자동차세 환급 신청 (특수한 경우)</h2>
                <p>
                  대부분 자동으로 처리되지만, 다음의 경우라면 차량 등록지 지자체에 별도 신청이 필요할 수 있습니다:
                </p>
                <ul className="space-y-3 mt-4">
                  <li>
                    <strong>이월된 자동차세가 있을 때:</strong> 이전 연도 자동차세를 내지 않은 상태라면, 환급액에서 이월액을 먼저 충당한 후 나머지를 돌려받습니다.
                  </li>
                  <li>
                    <strong>법원 경매 또는 압류로 소유권이 변경되었을 때:</strong> 법원 판결문 등 추가 서류가 필요할 수 있습니다.
                  </li>
                  <li>
                    <strong>환급 계좌가 없을 때:</strong> 수령 통지서가 발송되면, 지자체 방문 또는 우편으로 환급금을 수령할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 환급을 신청하려면 반드시 정확한 정보(소유권 이전일, 폐차일)가 전산에 반영되어야 합니다. 차량 등록지 시·군·구청 또는 위택스(wetax.go.kr) / 이택스(etax.seoul.go.kr) 사이트에서 본인 정보로 조회하여 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환급 때 놓치기 쉬운 주의사항</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 1월 연납 할인을 받았다면:</strong> 환급액 계산에도 할인이 반영됩니다. 손해 보는 것이 아니라, 할인을 포함한 금액을 기준으로 일할계산합니다.
                  </li>
                  <li>
                    <strong>2. 정확한 소유권 이전 또는 말소 날짜 확인:</strong> 단순 매매계약일이 아니라 자동차등록원부상 이전등록일 또는 말소일을 기준으로 환급액이 결정됩니다.
                  </li>
                  <li>
                    <strong>3. 명의 이전을 하지 않은 경우:</strong> 만약 차를 팔았지만 이전등록(명의이전)을 하지 않았다면, 지자체 전산에 여전히 구 소유자로 기록되어 환급이 진행되지 않을 수 있습니다. 반드시 이전등록을 완료하세요.
                  </li>
                  <li>
                    <strong>4. 환급 기간 모니터링:</strong> 소유권 이전 후 2~4주가 지나도 환급이 없다면, 차량 등록지 시청·구청에 문의하여 전산 반영 상태를 확인하세요.
                  </li>
                </ul>
              </section>

              <AdSlot slot="guide-vehicle-tax-prepayment-refund-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">중고차 판매자가 알아야 할 자동차세 환급 팁</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 연납 환급은 자동 처리:</strong> 별도 신청 없이도 전산에 반영되면 환급이 진행됩니다. 다만 2~4주 소요되니 인내심 갖고 기다리세요.
                  </li>
                  <li>
                    <strong>2. 소유권 이전 일자 확인:</strong> 매매계약서와 실제 자동차등록원부상 이전등록일이 다를 수 있습니다. 자동차등록원부를 직접 확인하세요.
                  </li>
                  <li>
                    <strong>3. 환급 계좌 미리 등록:</strong> 이택스·위택스에서 환급 계좌를 미리 등록하면, 환급금이 빠르게 입금됩니다.
                  </li>
                  <li>
                    <strong>4. 폐차 시 서류 챙기기:</strong> 폐차 시 받은 폐차 증명서를 보관하면, 환급 처리 시 필요할 수 있습니다.
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
                    <p className="mt-1 text-sm text-text-secondary">배기량과 차령을 입력하면 자동차세가 바로 계산됩니다.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-tax-calculation-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배기량별 세율, 차령경감, 전기차 정액세 완벽 가이드.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-tax-june-payment-annual-discount-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">6월 자동차세 · 연납할인 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">6월 납부 시즌과 1월 연납할인 5% 완전 정리.</p>
                  </Link>
                  <Link
                    href="/guide/electric-vehicle-tax-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전기차 자동차세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전기차·수소차 정액 과세와 하이브리드 차이점.</p>
                  </Link>
                  <Link
                    href="/category/lifestyle"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생활 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">자동차, 부동산, 환율 등 생활 속 계산기 모음.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-july-payment-schedule-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 7월 납부 일정 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">재산세 기납 일정과 함께 자동차세도 정리.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 자동차세 환급은 차량 등록지 시·군·구청 또는 관할 지방자치단체와 상담 후 진행하세요. 본 콘텐츠는 2026-06-24을 기준으로 작성되었으며, 세율 변경 시 즉시 업데이트됩니다. 자동차세 환급 절차, 금액, 기한 등은 지방세법 <strong>§127·§128, 지방세법 시행령 §125</strong>를 참고하세요. 환급 절차·금액의 정확한 판단은 차량 등록지 시·군·구청(위택스/이택스) 확인 필수입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스</a>,{' '}
                  <a href="https://etax.seoul.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">서울시 이택스</a>.
                </p>
              </section>

              <ShareButtons
                title="자동차세 연납 환급 2026 가이드"
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
