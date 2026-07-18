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

const URL = 'https://calculatorhost.com/guide/commercial-lease-conversion-deposit-2026/';
const DATE_PUBLISHED = '2026-07-19';
const DATE_MODIFIED = '2026-07-19';

export const metadata: Metadata = {
  title: '상가임대차 환산보증금 2026, 지역별 기준·계산법',
  description:
    '환산보증금은 보증금에 월차임의 100배를 더해 산출한 금액으로, 상가건물임대차보호법의 전면 적용 여부를 가르는 기준입니다. 서울 9억, 과밀억제권역 6억9천만, 광역시 5억4천만, 기타 3억7천만원 등 지역별 기준과 계산 사례, 초과해도 유지되는 임차인 보호를 정리했습니다.',
  keywords: [
    '환산보증금 계산법',
    '상가 환산보증금 2026',
    '상가건물임대차보호법 2조',
    '상가 보증금 월세 환산',
    '환산보증금 초과 상가',
    '지역별 환산보증금 기준',
    '상가임대차 적용범위',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상가임대차 환산보증금 2026, 지역별 기준·계산법' }],
    title: '상가임대차 환산보증금 2026, 지역별 기준과 계산법',
    description: '보증금과 월세만으로 환산보증금을 계산하고, 우리 상가가 어느 지역 기준에 해당하는지 확인하는 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상가임대차 환산보증금 2026, 지역별 기준과 계산법',
    description: '환산보증금 = 보증금 + 월차임 × 100. 서울 9억, 광역시 5억4천만원 등 지역별 기준을 정리했습니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '환산보증금이 정확히 무엇인가요?',
    answer:
      '환산보증금은 보증금에 월차임의 100배를 더해 산출한 금액입니다(상가건물임대차보호법 §2, 시행령 §2). 예를 들어 보증금 1억원에 월세 300만원이면 환산보증금은 1억원 + (300만원 × 100) = 4억원입니다. 이 금액이 지역별 기준 이하인지에 따라 법의 적용 범위가 달라집니다.',
  },
  {
    question: '환산보증금은 왜 중요한가요?',
    answer:
      '환산보증금이 지역별 기준 이하이면 상가건물임대차보호법이 전면 적용되고, 기준을 넘으면 일부 규정만 적용되기 때문입니다. 특히 차임·보증금 증액 5% 상한과 우선변제권 여부가 환산보증금 기준에 따라 갈리므로, 계약 전 반드시 확인해야 하는 수치입니다.',
  },
  {
    question: '서울 상가의 환산보증금 기준은 얼마인가요?',
    answer:
      '서울특별시는 9억원입니다(상가건물임대차보호법 시행령 §2 제1호). 환산보증금이 9억원 이하이면 법의 모든 규정이 적용되고, 9억원을 초과하면 계약갱신요구권·권리금 보호·대항력 등 핵심 규정은 유지되지만 증액 상한 5%와 우선변제권 등 일부 규정은 적용되지 않습니다.',
  },
  {
    question: '환산보증금을 초과해도 계약갱신요구권을 쓸 수 있나요?',
    answer:
      '네, 쓸 수 있습니다. 계약갱신요구권(최초 임대차를 포함해 10년, §10)은 환산보증금 기준 초과 여부와 무관하게 모든 상가 임차인에게 적용됩니다. 권리금 회수기회 보호(§10의4)와 대항력(§3), 3기 차임연체 시 해지(§10의8) 규정도 마찬가지로 초과 여부와 관계없이 적용됩니다.',
  },
  {
    question: '환산보증금을 초과하면 구체적으로 어떤 보호를 못 받나요?',
    answer:
      '우선변제권·최우선변제와 차임·보증금 증액 5% 상한을 적용받지 못합니다. 즉 환산보증금 초과 상가는 임대인이 갱신 시 5%를 넘는 인상을 요구해도 법적 상한이 없어 협상력이 약해질 수 있고, 건물이 경매에 넘어가도 우선변제 순위에서 보호받지 못할 수 있습니다.',
  },
  {
    question: '월세에 부가가치세가 별도인 경우 환산보증금은 어떻게 계산하나요?',
    answer:
      '부가가치세를 제외한 순수 차임 금액만으로 환산보증금을 계산합니다. 예를 들어 계약서상 월세가 부가세 별도 330만원(공급가액 300만원 + 부가세 30만원)이라면, 환산보증금 계산에는 300만원만 반영합니다. 계약서에 부가세 포함 여부가 불명확하면 임대인에게 반드시 확인하세요.',
  },
  {
    question: '지역별 환산보증금 기준 금액이 앞으로 바뀔 수도 있나요?',
    answer:
      '네, 바뀔 수 있습니다. 지역별 기준은 상가건물임대차보호법 시행령 §2 개정을 통해 조정되어 왔으므로, 계약 시점의 최신 기준을 법제처 국가법령정보센터에서 다시 확인하는 것이 안전합니다.',
  },
];

export default function CommercialLeaseConversionDeposit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상가임대차 환산보증금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상가임대차 환산보증금 2026, 지역별 기준과 계산법',
    description:
      '보증금과 월세로 환산보증금을 계산하는 방법, 서울·광역시 등 지역별 기준 금액, 기준 초과 시에도 유지되는 임차인 보호 규정까지 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['환산보증금', '상가건물임대차보호법', '지역별 기준', '보증금 월세 환산', '상가 임차인'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상가임대차 환산보증금 2026',
    description:
      '보증금과 월세로 환산보증금을 계산하는 방법과 지역별 적용 기준을 정리한 가이드.',
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
                    { name: '상가임대차 환산보증금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상가 임차인·자영업자 · 9분 읽기 · 2026-07-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상가임대차 환산보증금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">지역별 기준과 계산법, 초과해도 유지되는 임차인 보호</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  환산보증금은 보증금에 월차임의 100배를 더해 산출하는 금액으로, 상가건물임대차보호법이 내 계약에 얼마나 폭넓게 적용되는지를 가르는 기준입니다. 상가를 임차하려는 자영업자라면 계약 전에 이 수치부터 계산해봐야 합니다. 이 가이드는 계산 공식, 서울·광역시 등 지역별 기준 금액, 기준을 넘어도 유지되는 보호까지 순서대로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-commercial-lease-conversion-deposit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환산보증금이란 무엇인가요?</h2>
                <p>
                  환산보증금은 보증금과 월차임을 하나의 금액으로 합산해, 상가 임대차가 법의 전면 적용 대상인지 판단하는 기준 수치입니다(상가건물임대차보호법 §2, 시행령 §2). 순수 전세처럼 월세 없이 보증금만 있는 계약이라면 보증금 자체가 환산보증금이 되고, 월세가 있는 계약이라면 월세를 100배로 환산해 보증금에 더합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">환산보증금을 두는 이유</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    상가건물임대차보호법은 영세 자영업자 보호를 목적으로 하지만, 모든 상가에 모든 조항을 동일하게 적용하면 대형 프랜차이즈·기업형 임차인에게도 과도한 보호가 돌아갑니다. 그래서 임대차 규모를 환산보증금이라는 하나의 잣대로 환산해, 일정 규모 이하 상가에만 증액 상한·우선변제권 등을 전면 적용합니다.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 환산보증금 기준을 넘는다고 해서 임차인이 법의 보호에서 완전히 벗어나는 것은 아닙니다. 계약갱신요구권, 권리금 회수기회 보호, 대항력 등 핵심 조항은 기준과 무관하게 모든 상가 임차인에게 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환산보증금은 어떻게 계산하나요?</h2>
                <p>
                  환산보증금은 보증금에 월차임의 100배를 더하는 단순한 공식으로 계산합니다. 부가가치세가 별도인 계약이라면 부가세를 제외한 순수 차임만 반영해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">환산보증금 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    환산보증금 = 보증금 + (월차임 × 100)
                    <br />
                    <br />
                    예시: 보증금 1억원 + 월세 300만원
                    <br />
                    환산보증금 = 1억원 + (300만원 × 100) = 1억원 + 3억원 = <strong>4억원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  월세가 없는 순수 전세형 상가 계약이라면 보증금 금액이 곧 환산보증금입니다. 반대로 보증금이 적고 월세가 높은 계약일수록 환산보증금이 크게 늘어나므로, 계약 구조에 따라 적용 범위가 크게 달라질 수 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 부가가치세가 별도로 표시된 계약서라면, 부가세 포함 금액을 그대로 반영하면 환산보증금이 실제보다 부풀려집니다. 반드시 공급가액(부가세 제외)만 월차임으로 산정하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">지역별 환산보증금 기준은 얼마인가요?</h2>
                <p>
                  환산보증금 기준 금액은 지역에 따라 서울 9억원부터 그 밖의 지역 3억 7천만원까지 4단계로 나뉩니다(상가건물임대차보호법 시행령 §2). 상가 소재지가 어느 구간에 속하는지에 따라 법의 전면 적용 여부가 갈립니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 지역별 환산보증금 기준(상가건물임대차보호법 시행령 §2, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지역</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">환산보증금 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">서울특별시</td>
                        <td className="p-3"><strong>9억원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">수도권정비계획법상 과밀억제권역(서울 제외), 부산광역시</td>
                        <td className="p-3"><strong>6억 9천만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">광역시(과밀억제권역·군 제외), 세종, 파주, 화성, 안산, 용인, 김포, 경기 광주시</td>
                        <td className="p-3"><strong>5억 4천만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">그 밖의 지역</td>
                        <td className="p-3"><strong>3억 7천만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  환산보증금이 이 기준 이하이면 상가건물임대차보호법의 모든 규정이 적용되고, 기준을 초과하면 일부 규정의 적용이 제한됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 이 기준 금액은 시행령 개정으로 바뀔 수 있습니다. 계약 시점의 최신 기준은 반드시 법제처 국가법령정보센터에서 다시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환산보증금을 초과해도 임차인 보호를 받을 수 있나요?</h2>
                <p>
                  네, 받을 수 있습니다. 환산보증금이 지역별 기준을 초과해도 계약갱신요구권, 권리금 회수기회 보호, 대항력, 3기 차임연체 시 해지 규정은 그대로 적용됩니다. 다만 우선변제권·최우선변제와 차임·보증금 증액 5% 상한은 초과 시 적용되지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 환산보증금 이내 상가 vs 초과 상가 적용 규정 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">규정</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준 이내</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준 초과</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">계약갱신요구권(§10, 10년)</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">권리금 회수기회 보호(§10의4)</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대항력(§3, 건물 인도+사업자등록)</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3기 차임연체 시 해지(§10의8)</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">차임·보증금 증액 5% 상한</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">미적용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">우선변제권·최우선변제</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">미적용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 증액 상한과 우선변제권을 못 받는다고 해서 임차인이 완전히 무방비 상태가 되는 것은 아닙니다. 계약갱신요구권과 권리금 보호만으로도 실무상 가장 중요한 보호는 대부분 유지됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계산 사례로 보는 환산보증금 판정</h2>
                <p>
                  실제 숫자로 환산보증금을 계산해보고, 지역별 기준과 비교해 적용 범위를 판단해보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 서울, 보증금 1억원 + 월세 300만원</p>
                  <p className="text-sm text-text-secondary">
                    · 환산보증금 = 1억원 + (300만원 × 100) = <strong>4억원</strong>
                    <br />
                    · 서울 기준: 9억원
                    <br />
                    · 4억원 이하이므로 상가건물임대차보호법 전면 적용
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 증액 5% 상한, 우선변제권 등 모든 규정이 적용됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 서울, 보증금 2억원 + 월세 800만원</p>
                  <p className="text-sm text-text-secondary">
                    · 환산보증금 = 2억원 + (800만원 × 100) = <strong>10억원</strong>
                    <br />
                    · 서울 기준: 9억원
                    <br />
                    · 10억원으로 9억원을 초과하므로 일부 규정만 적용
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 계약갱신요구권·권리금 보호·대항력은 유지되지만, 증액 5% 상한과 우선변제권은 적용되지 않습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 서울, 보증금 1억원 + 월세 800만원 (경계값)</p>
                  <p className="text-sm text-text-secondary">
                    · 환산보증금 = 1억원 + (800만원 × 100) = <strong>9억원</strong>
                    <br />
                    · 서울 기준: 9억원 이하
                    <br />
                    · 기준과 정확히 일치하며 "이하"에 해당하므로 전면 적용
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 경계선에 걸리는 계약은 소수점 이하 금액 조정만으로도 적용 범위가 바뀔 수 있어 계약 전 정밀 계산이 중요합니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-commercial-lease-conversion-deposit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">환산보증금, 어떻게 확인하나요?</h2>
                <p>
                  계약 전 환산보증금을 스스로 계산해보고, 계약서에 부가가치세 포함 여부가 명확히 기재되어 있는지 확인하는 것이 실무상 가장 중요한 절차입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>계약서 조건 확인:</strong> 보증금·월세 금액, 부가세 포함 여부를 계약서에서 정확히 확인하세요.
                  </li>
                  <li>
                    <strong>환산보증금 직접 계산:</strong> 보증금 + (월차임 × 100) 공식으로 계산하고, 상가 소재지의 지역별 기준과 비교하세요.
                  </li>
                  <li>
                    <strong>경계값 근처라면 재확인:</strong> 계산 결과가 기준 금액과 근접하면, 월세를 소폭 조정해 협상할 여지가 있는지 임대인과 논의해볼 수 있습니다.
                  </li>
                  <li>
                    <strong>최신 기준 재확인:</strong> 지역별 기준은 시행령 개정으로 바뀔 수 있으므로, 계약 시점에 법제처 국가법령정보센터에서 최신 수치를 다시 확인하세요.
                  </li>
                  <li>
                    <strong>분쟁 소지가 있다면 전문가 상담:</strong> 환산보증금 판정이 애매하거나 임대인과 이견이 있으면 변호사·법무사 상담을 받는 것이 안전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 환산보증금 계산은 단순해 보여도, 부가세 포함 여부나 관리비의 차임 산입 여부 등 세부 쟁점에서 다툼이 생길 수 있습니다. 계약 전 임대인과 서면으로 조건을 명확히 정리해두는 것이 가장 확실한 예방책입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/commercial-building-lease-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상가건물 임대차보호법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">계약갱신요구권·권리금·대항력까지 상가임대차의 전체 구조를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/commercial-lease-premium-recovery-protection-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상가 권리금 회수기회 보호 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">환산보증금 초과 여부와 무관하게 적용되는 권리금 보호를 자세히 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/rent-conversion-rate-2026-housing-lease-act/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택 전월세 전환율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 임대차의 전월세 전환율과 상가 환산보증금의 차이를 비교해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/lease-renewal-request-implied-renewal-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">계약갱신요구권과 묵시적 갱신 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">환산보증금 초과 여부와 관계없이 적용되는 갱신 규정을 상세히 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세 전환, 중개수수료, 양도세 등 부동산 계산기를 확인하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개별 상가임대차 계약에 대한 법률 조언이 아닙니다. 환산보증금 계산, 부가세 포함 여부, 지역별 기준 적용은 실제 계약 조건에 따라 달라질 수 있으므로, 계약 전 반드시 법제처 국가법령정보센터에서 최신 시행령을 확인하고 필요하면 변호사·법무사와 상담하세요. 본 콘텐츠는 2026-07-19를 기준으로 작성되었으며, 상가건물임대차보호법 개정 시 즉시 업데이트됩니다. 환산보증금 및 임차인 보호의 정확한 기준은 법조항 <strong>상가건물임대차보호법 §2(적용범위)·§3(대항력)·§10(계약갱신요구권)·§10의4(권리금 회수기회)·§10의8(차임연체와 해지), 같은 법 시행령 §2(환산보증금 기준)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>,{' '}
                  <a href="https://www.moj.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한민국 법무부</a>.
                </p>
              </section>

              <ShareButtons
                title="상가임대차 환산보증금 2026 가이드"
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
