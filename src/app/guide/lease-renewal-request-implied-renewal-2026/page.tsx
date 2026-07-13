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

const URL = 'https://calculatorhost.com/guide/lease-renewal-request-implied-renewal-2026/';
const DATE_PUBLISHED = '2026-07-14';
const DATE_MODIFIED = '2026-07-14';

export const metadata: Metadata = {
  title: '계약갱신청구권·묵시적 갱신 2026, 5% 상한과 2+2년',
  description:
    '주택임대차보호법 §6의3 계약갱신요구권과 §6 묵시적 갱신의 차이, 만기 6개월~2개월 전 통지 규칙, 5% 인상 상한, 2+2년 최대 거주까지 임차인이 꼭 알아야 할 내용 정리.',
  keywords: [
    '계약갱신요구권',
    '묵시적 갱신',
    '5% 상한',
    '2+2년',
    '주택임대차보호법 6조의3',
    '주택임대차보호법 6조',
    '임대차 갱신 통지',
    '전세 갱신 5%',
    '묵시적 갱신 해지',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '계약갱신청구권·묵시적 갱신 2026, 5% 상한과 2+2년' }],
    title: '계약갱신청구권·묵시적 갱신 2026: 5% 상한과 2+2년 정리',
    description: '주택임대차보호법 §6, §6의2, §6의3, §7 기준. 통지 시기·갱신 횟수·5% 인상 상한·해지 3개월 규칙을 사례와 함께 설명합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '계약갱신청구권·묵시적 갱신 2026, 5% 상한과 2+2년',
    description: '주택임대차보호법 §6의3 계약갱신요구권, §6 묵시적 갱신, §7 5% 인상 상한, §6의2 해지 통지 3개월 규칙을 사례로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '계약갱신요구권은 몇 번까지 행사할 수 있나요?',
    answer:
      '계약갱신요구권은 임차인이 1회에 한해 행사할 수 있습니다(주택임대차보호법 §6의3①). 최초 2년 임대차가 끝나기 전 갱신을 요구해 2년을 더 살면, 이후 임대차에 대해서는 갱신요구권을 다시 행사하지 못합니다. 따라서 이 권리 하나로 최대 2+2년, 총 4년까지 같은 조건에 준하여 거주를 보장받는 구조입니다.',
  },
  {
    question: '언제까지 갱신을 요구해야 하나요?',
    answer:
      '임대차기간 만료 6개월 전부터 2개월 전까지 사이에 요구해야 합니다(주택임대차보호법 §6의3①). 예를 들어 계약 만료일이 12월 31일이면, 6월 30일부터 10월 31일 사이에 임대인에게 갱신 의사를 알려야 합니다. 이 기간을 놓치면 갱신요구권 자체는 소멸하나, 별도로 묵시적 갱신(§6)이 성립할 수는 있습니다.',
  },
  {
    question: '갱신 시 임대료는 얼마까지 올릴 수 있나요?',
    answer:
      '종전 차임이나 보증금의 5%를 초과할 수 없습니다(주택임대차보호법 §7). 예컨대 전세 3억원이면 5% 상한인 3억 1,500만원 이내에서만 인상이 가능하고, 월세 80만원이면 84만원 이내가 상한입니다. 보증금과 월세를 동시에 올릴 때에도 두 인상분을 합산해 5%를 넘길 수 없습니다. 지자체 조례로 더 낮은 상한이 정해질 수도 있습니다.',
  },
  {
    question: '묵시적 갱신은 정확히 무엇인가요?',
    answer:
      '임대인이 만료 6개월 전부터 2개월 전까지 갱신거절이나 조건변경을 통지하지 않고, 임차인도 만료 2개월 전까지 별다른 통지를 하지 않은 경우, 종전과 동일한 조건으로 계약이 다시 체결된 것으로 보는 제도입니다(주택임대차보호법 §6). 이렇게 갱신되면 임대차의 존속기간은 2년으로 봅니다. 임대료도 그대로 유지되므로 임차인에게 유리합니다.',
  },
  {
    question: '묵시적 갱신 후 언제든지 해지할 수 있나요?',
    answer:
      '네, 임차인은 언제든지 계약해지를 통지할 수 있습니다(주택임대차보호법 §6의2). 임대인이 통지를 수령한 날부터 3개월이 지나면 해지 효력이 발생해 계약이 종료되고, 이때 보증금 반환의무가 발생합니다. 예를 들어 3월 1일에 임대인에게 해지통지가 도달했다면, 6월 1일경 계약이 종료됩니다. 다만 임대인은 이 규정을 활용해 먼저 해지할 수 없습니다.',
  },
  {
    question: '임대인이 실거주하겠다며 갱신을 거절하면 어떻게 하나요?',
    answer:
      '임대인(또는 그 직계존비속)이 실제 목적물에 거주하려는 경우, 갱신요구를 거절할 수 있습니다(주택임대차보호법 §6의3①제8호). 다만 임대인이 실거주 사유로 갱신을 거절한 뒤 정당한 사유 없이 제3자에게 임대하면, 종전 임차인에게 손해배상 책임을 집니다. 이사비, 이주에 따른 비용 등이 배상 범위에 포함될 수 있으니 관련 증빙을 보관해두면 좋습니다.',
  },
  {
    question: '차임 연체가 있으면 무조건 갱신 거절되나요?',
    answer:
      '무조건은 아닙니다. 임차인이 2기(2회분)의 차임액에 해당하는 금액을 연체한 사실이 있는 경우 갱신요구를 거절할 수 있도록 되어 있습니다(주택임대차보호법 §6의3①제1호). 즉 월세 80만원 계약에서 통산 160만원 이상 연체한 이력이 있으면 거절 사유가 됩니다. 다만 이미 완납했더라도 과거 연체 이력이 있으면 거절 대상이 될 수 있으므로 관리를 철저히 해야 합니다.',
  },
  {
    question: '묵시적 갱신 후에 계약갱신요구권을 또 쓸 수 있나요?',
    answer:
      '가능하다는 해석이 일반적입니다. 묵시적 갱신(§6)과 계약갱신요구권(§6의3)은 서로 다른 근거의 별개 제도이므로, 묵시적 갱신으로 계약이 연장되어도 임차인의 갱신요구권 1회는 소진되지 않는다고 봅니다. 다만 개별 사안에서 다투는 경우가 있어, 안전을 위해서는 만기 전 명시적으로 갱신요구권을 행사한다는 내용증명을 보내두는 편이 확실합니다.',
  },
];

export default function LeaseRenewalRequest2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '계약갱신청구권·묵시적 갱신 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '계약갱신청구권·묵시적 갱신 2026: 5% 상한과 2+2년',
    description:
      '주택임대차보호법 §6, §6의2, §6의3, §7 기준. 계약갱신요구권과 묵시적 갱신의 차이, 통지 시기·거절 사유·5% 인상 상한·해지 3개월 규칙까지 임차인 관점에서 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['계약갱신요구권', '묵시적 갱신', '5% 상한', '2+2년', '주택임대차보호법 6조의3'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '계약갱신청구권·묵시적 갱신 2026',
    description:
      '주택 임대차의 계약갱신요구권과 묵시적 갱신 차이, 5% 인상 상한과 통지 규칙을 정리한 가이드.',
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
                    { name: '계약갱신청구권·묵시적 갱신 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임차인·임대인 · 9분 읽기 · 2026-07-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  계약갱신청구권·묵시적 갱신 2026
                  <br />
                  <span className="text-2xl text-text-secondary">5% 상한과 2+2년, 무엇이 다른가</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세·월세 계약 만기가 다가올 때 임차인이 활용할 수 있는 제도는 크게 두 가지입니다. 하나는 주택임대차보호법 §6의3에 규정된 계약갱신요구권이고, 다른 하나는 §6의 묵시적 갱신입니다. 이름은 비슷해도 통지 시기, 갱신 횟수, 임대료 인상 규칙, 중도 해지 방법이 각기 다릅니다. 이 가이드에서는 두 제도의 차이와 5% 상한, 그리고 실제 인상액 계산 사례를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-lease-renewal-request-implied-renewal-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약갱신요구권이란 무엇인가요?</h2>
                <p>
                  계약갱신요구권은 임차인이 1회에 한해 임대차 갱신을 요구할 수 있는 권리입니다(주택임대차보호법 §6의3). 임대차기간 만료 6개월 전부터 2개월 전까지 사이에 임대인에게 갱신을 요구하면, 임대인은 정당한 사유가 없는 한 이를 거절하지 못합니다. 갱신된 임대차의 존속기간은 2년으로 보므로, 최초 2년 계약에 갱신요구권 2년을 더해 총 4년(2+2년) 거주가 보장되는 구조가 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2+2년 구조의 핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 최초 임대차: 2년(§4 최단 존속기간)
                    <br />
                    · 계약갱신요구권 행사: +2년 연장(§6의3③)
                    <br />
                    · 갱신 요구 시기: 만기 6개월 전 ~ 2개월 전
                    <br />
                    · 임대료 인상 상한: 종전 임대료의 5% 이내(§7)
                    <br />
                    · 행사 횟수: 임차인 1회 한정
                  </p>
                </div>
                <p className="mt-4">
                  다만 갱신요구권은 통지 기간을 지나면 그 자체로는 소멸합니다. 만기 2개월 전이 지나 갱신을 요구하면, 임대인은 이를 갱신요구권으로 받아들일 의무가 없습니다. 따라서 임차인은 만기 최소 2개월 전까지 내용증명 등 증거가 남는 방법으로 갱신 의사를 명확히 표시해두는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">묵시적 갱신은 어떻게 발생하나요?</h2>
                <p>
                  묵시적 갱신은 별도의 의사표시 없이 계약이 자동 연장되는 제도입니다(주택임대차보호법 §6). 임대인이 임대차기간 만료 6개월 전부터 2개월 전까지 갱신거절이나 조건변경 통지를 하지 않고, 임차인도 만료 2개월 전까지 아무 통지를 하지 않으면 종전과 동일한 조건으로 다시 임대차한 것으로 봅니다. 이때 존속기간은 2년으로 보므로, 임차인은 실질적으로 같은 임대료에 2년을 더 살 수 있게 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">묵시적 갱신 성립 조건</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 임대인이 만기 6개월 전 ~ 2개월 전까지 갱신거절·조건변경 통지 없음
                    <br />
                    2. 임차인도 만기 2개월 전까지 계약 종료·변경 통지 없음
                    <br />
                    3. 위 조건이 모두 갖춰지면 종전 조건 그대로 자동 갱신
                    <br />
                    4. 갱신된 임대차의 존속기간: 2년(§6②)
                  </p>
                </div>
                <p className="mt-4">
                  예외적으로 임차인에게 §6의3①의 갱신거절 사유(2기 이상 차임 연체, 부정한 방법의 임차 등)가 있으면 묵시적 갱신이 성립하지 않을 수 있습니다. 임대인이 명시적으로 갱신을 거절하지 않았더라도 이러한 사유가 있으면 자동 갱신을 다투는 경우가 실무상 발생하므로, 임차인은 차임을 정기적으로 완납하고 계약 조건을 성실히 지키는 편이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약갱신요구권과 묵시적 갱신, 무엇이 다른가요?</h2>
                <p>
                  두 제도는 최대 4년 거주 가능하다는 점에서 결과적으로 비슷해 보이지만, 통지 방식과 임대료 인상, 해지 방법에서 결정적으로 다릅니다. 다음 표로 정리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 계약갱신요구권과 묵시적 갱신 비교 (주택임대차보호법 §6·§6의2·§6의3·§7)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계약갱신요구권 (§6의3)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">묵시적 갱신 (§6)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">통지 방식</td>
                        <td className="p-3">임차인의 명시적 갱신 요구 필요</td>
                        <td className="p-3">양측 모두 통지 없음이 요건</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">통지 시기</td>
                        <td className="p-3">만기 6개월 전 ~ 2개월 전</td>
                        <td className="p-3">임대인: 만기 6~2개월 전 미통지, 임차인: 만기 2개월 전까지 미통지</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">갱신 횟수</td>
                        <td className="p-3">임차인 생애 1회 한정</td>
                        <td className="p-3">횟수 제한 조항 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">임대료 5% 상한</td>
                        <td className="p-3">적용(§7, 5% 이내)</td>
                        <td className="p-3">종전 조건 유지(사실상 동결)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">존속기간</td>
                        <td className="p-3">2년(§6의3③)</td>
                        <td className="p-3">2년(§6②)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">임차인 중도 해지</td>
                        <td className="p-3">일반 원칙 적용(합의 또는 특별사유)</td>
                        <td className="p-3">언제든 가능, 통지 후 3개월 경과 시 효력(§6의2)</td>
                      </tr>
                      <tr>
                        <td className="p-3">거절 사유</td>
                        <td className="p-3">§6의3① 각 호(실거주·연체 등)</td>
                        <td className="p-3">임차인 §6의3① 각 호 사유 있으면 성립 배제 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 실무에서는 두 제도가 함께 문제가 되기도 합니다. 예를 들어 통지 기간을 놓쳐 갱신요구권을 못 쓴 경우에도 묵시적 갱신이 성립할 수 있고, 반대로 묵시적 갱신 후에도 임차인이 갱신요구권 1회를 별도로 행사할 수 있다는 해석이 유력합니다. 각자 상황에 맞게 어떤 제도를 활용할지 판단해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">5% 상한은 어떻게 계산하나요?</h2>
                <p>
                  계약갱신요구권을 행사하는 경우 임대인은 종전 차임이나 보증금의 5% 이내에서만 인상할 수 있습니다(주택임대차보호법 §7 및 시행령). 다음 사례로 확인해봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 전세 3억원 갱신</p>
                  <p className="text-sm text-text-secondary">
                    · 기존 전세보증금: 3억원
                    <br />
                    · 5% 상한: 3억원 × 1.05 = <strong>3억 1,500만원</strong>
                    <br />
                    · 임대인은 3억 1,500만원 이내에서만 인상 가능
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 시세가 급등해 4억원으로 오르더라도 갱신요구권 행사 시에는 3억 1,500만원이 상한.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 보증금 5,000만원·월세 80만원 반전세 갱신</p>
                  <p className="text-sm text-text-secondary">
                    · 기존 조건: 보증금 5,000만원 + 월세 80만원
                    <br />
                    · 월세만 인상 시: 80만원 × 1.05 = <strong>84만원</strong> 이내
                    <br />
                    · 보증금만 인상 시: 5,000만원 × 1.05 = <strong>5,250만원</strong> 이내
                    <br />
                    · 동시 인상 시: 두 인상분의 합산 효과가 5% 이내가 되도록 조정(전월세 전환율 등 활용)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 보증금과 월세를 함께 올리려면 서로의 인상 여력을 합산해 5%를 넘기지 않도록 설계해야 함.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 묵시적 갱신 후 임차인 해지 통지</p>
                  <p className="text-sm text-text-secondary">
                    · 묵시적 갱신으로 계약이 연장된 상태
                    <br />
                    · 임차인이 3월 1일 임대인에게 해지 통지 도달
                    <br />
                    · 3개월 경과 시점: 6월 1일경 계약 종료(§6의2)
                    <br />
                    · 임대인은 6월 1일 무렵 보증금 반환의무 발생
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 묵시적 갱신은 임차인에게 유리하게 설계되어, 통지 후 3개월이면 언제든 계약 종료 가능.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 5% 상한은 국가 차원의 최대치이고, 지방자치단체 조례로 더 낮은 상한을 정하고 있는 경우도 있습니다. 계약 갱신 협상에 들어가기 전에 관할 지자체의 조례를 한번 확인해두면 협상 근거로 삼기 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임대인이 갱신요구를 거절할 수 있나요?</h2>
                <p>
                  임대인은 원칙적으로 정당한 사유 없이 갱신요구를 거절할 수 없지만, 주택임대차보호법 §6의3① 각 호에 해당하는 정당한 사유가 있으면 거절이 가능합니다. 실무에서 가장 자주 문제가 되는 사유들을 표로 정리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 주요 갱신 거절 사유 (주택임대차보호법 §6의3① 각 호)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주요 쟁점</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">차임 연체</td>
                        <td className="p-3">2기의 차임액에 해당하는 금액을 연체한 사실이 있는 경우</td>
                        <td className="p-3">현재가 아닌 과거 이력도 포함</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">거짓·부정 임차</td>
                        <td className="p-3">거짓이나 그 밖의 부정한 방법으로 임차한 경우</td>
                        <td className="p-3">주민등록·근무처 위조 등</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">무단 전대</td>
                        <td className="p-3">임대인 동의 없이 목적물을 전부·일부 전대한 경우</td>
                        <td className="p-3">동거인·룸메이트 관계와 구분</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">멸실·철거·재건축</td>
                        <td className="p-3">주택의 전부·일부가 멸실되거나, 철거·재건축 계획이 있는 경우</td>
                        <td className="p-3">계약 체결 당시 사전 고지 여부</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임대인 실거주</td>
                        <td className="p-3">임대인(또는 직계존비속)이 실제 목적물에 거주하려는 경우</td>
                        <td className="p-3">실거주 미이행 시 손해배상 책임</td>
                      </tr>
                      <tr>
                        <td className="p-3">그 밖의 중대 사유</td>
                        <td className="p-3">임차인의 의무 위반이 있어 임대차 존속이 어려운 중대한 사유</td>
                        <td className="p-3">사안별 개별 판단</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 임대인이 실거주 사유로 갱신을 거절해놓고 정당한 사유 없이 제3자에게 그 주택을 임대한 경우, 종전 임차인에게 손해배상 책임을 집니다. 이사비, 중개보수, 새 주거지 임대료 차액 등이 배상 대상이 될 수 있으므로 임차인은 관련 지출 증빙과 새로 들어온 임차인의 임대차 계약 사실을 확인할 수 있는 자료(등기부, 확정일자 등)를 보관해두는 편이 좋습니다.
                </p>
              </section>

              <AdSlot slot="guide-lease-renewal-request-implied-renewal-2026-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">묵시적 갱신 후에도 계약해지가 가능한가요?</h2>
                <p>
                  네, 묵시적 갱신 후에는 임차인이 언제든 계약해지를 통지할 수 있습니다(주택임대차보호법 §6의2). 임대인이 통지를 받은 날부터 3개월이 지나면 해지 효력이 발생해 계약이 종료됩니다. 이 규정은 임차인에게만 인정되는 편면적 권리로, 임대인이 이 조항을 근거로 임차인을 내보낼 수는 없습니다.
                </p>
                <p className="mt-4">
                  실무적으로는 임차인이 이사 시점을 정확히 예측하기 어렵기 때문에, 새 집을 계약하기 전에 미리 해지 통지를 보내둘 것을 권합니다. 이렇게 하면 이사 시점에 맞춰 보증금 반환이 원활히 이루어질 가능성이 높습니다. 통지는 내용증명이나 문자·이메일 등 도달 사실이 남는 방법을 선택하고, 임대인이 통지를 수령한 날짜를 반드시 기록해두어야 합니다.
                </p>
                <p className="mt-4">
                  다만 이 3개월 규정은 묵시적 갱신 상태에서만 적용됩니다. 계약갱신요구권을 행사해 갱신된 임대차에는 별도의 명문 규정이 없어, 임차인이 중도 해지하려면 임대인과의 합의나 특별한 사유가 필요합니다. 두 제도 중 어떤 상태에 있는지에 따라 해지 방법이 달라진다는 점을 유의해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임차인이 미리 챙겨야 할 실무 체크리스트</h2>
                <p>
                  두 제도를 실제로 활용할 때, 임차인이 미리 준비해두면 좋은 항목을 정리합니다. 시기 관리와 증거 확보가 핵심입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>만기 관리:</strong> 계약 만기일을 캘린더에 등록하고, 6개월 전과 2개월 전 두 시점에 알림을 설정하세요. 갱신요구권 행사는 이 사이 4개월 창에서만 가능합니다.
                  </li>
                  <li>
                    <strong>내용증명 발송:</strong> 갱신 의사를 확실히 남기려면 우체국 내용증명으로 갱신요구권 행사 통지를 보내는 것이 안전합니다. 문자·이메일도 유효하나 도달 시점 입증이 관건입니다.
                  </li>
                  <li>
                    <strong>차임 완납 관리:</strong> 통산 2기 이상의 차임 연체 이력이 있으면 갱신 거절 사유가 됩니다. 자동이체 실패, 이체 지연 등도 연체로 잡히므로 이체 내역을 정기적으로 점검하세요.
                  </li>
                  <li>
                    <strong>주변 시세 파악:</strong> 5% 상한 협상에서 유리한 위치를 잡으려면 최근 시세와 인근 갱신 사례를 파악해두면 도움이 됩니다. 국토교통부 실거래가 공개시스템과 지자체 조례를 함께 확인하세요.
                  </li>
                  <li>
                    <strong>실거주 거절 대응:</strong> 임대인이 실거주 사유로 갱신을 거절하면 이사비·중개보수 등 관련 지출을 모두 증빙으로 남겨두세요. 이후 제3자 임대 사실이 확인되면 손해배상 청구가 가능합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 이 체크리스트는 일반적 가이드이고, 개별 사안에서는 계약서 특약, 지역 조례, 임대인의 사업자 유형(개인·법인) 등에 따라 실무 대응이 달라질 수 있습니다. 분쟁 조짐이 보이면 대한법률구조공단(klac.or.kr) 무료 법률상담이나 관할 지방자치단체 주택임대차분쟁조정위원회를 활용하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/rent-increase-5-percent-cap-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임대료 5% 인상 상한 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주택임대차보호법 §7의 5% 상한을 실제 협상 사례로 정리.</p>
                  </Link>
                  <Link
                    href="/guide/rent-conversion-rate-2026-housing-lease-act/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금·월세 전환 시 적용되는 법정 전환율 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">확정일자·우선변제권 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">확정일자로 보증금을 지키는 방법과 우선변제 순위 정리.</p>
                  </Link>
                  <Link
                    href="/guide/lease-registration-order-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임차권등기명령 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 못 받을 때 임차권등기명령으로 대항력 유지하기.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-vs-monthly-rent-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세 vs 월세 비교 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세와 월세의 실질 부담 비교, 금리 조건별 손익 분기.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세 전환 시나리오를 즉시 시뮬레이션.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 사안에 대한 법률 자문이 아닙니다. 갱신요구·묵시적 갱신·해지 통지의 효력, 거절 사유 성부, 5% 상한 적용 등은 계약서 특약, 지자체 조례, 사실관계에 따라 달라질 수 있으므로 실제 결정 전 대한법률구조공단(klac.or.kr) 상담이나 관할 주택임대차분쟁조정위원회 문의를 권합니다. 본 콘텐츠는 2026-07-14 기준으로 작성되었으며, 근거 조항은 <strong>주택임대차보호법 §6(묵시적 갱신), §6의2(묵시적 갱신 후 해지), §6의3(계약갱신요구), §7(차임 등의 증감청구권)</strong> 입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.klac.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한법률구조공단</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부</a>.
                </p>
              </section>

              <ShareButtons
                title="계약갱신청구권·묵시적 갱신 2026 가이드"
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
