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

const URL = 'https://calculatorhost.com/guide/small-tenant-priority-repayment-2026/';
const DATE_PUBLISHED = '2026-07-17';
const DATE_MODIFIED = '2026-07-17';

export const metadata: Metadata = {
  title: '소액임차인 최우선변제금 2026, 서울 5500만원 보호 기준',
  description:
    '소액임차인은 경매·공매 시 다른 담보권자보다 먼저 보증금 일부를 돌려받습니다. 주택임대차보호법 §8 기준 지역별 보증금 범위와 최우선변제금(서울 5,500만원 등)을 임차인 사례로 정리합니다.',
  keywords: [
    '소액임차인 최우선변제',
    '최우선변제금 2026',
    '전세보증금 보호',
    '경매 보증금 변제',
    '소액보증금 범위',
    '주택임대차보호법 8조',
    '임차인 보호',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '소액임차인 최우선변제금 2026, 서울 5500만원 보호 기준' }],
    title: '소액임차인 최우선변제금 2026, 지역별 보증금 범위와 변제금액',
    description: '경매 시 소액임차인이 먼저 돌려받는 최우선변제금. 서울 5,500만원 등 지역별 기준을 주택임대차보호법 §8로 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '소액임차인 최우선변제금 2026',
    description: '경매 시 먼저 돌려받는 보증금. 서울 5,500만원 등. 주택임대차보호법 §8.',
  },
};

const FAQ_ITEMS = [
  {
    question: '최우선변제금이 무엇인가요?',
    answer:
      '최우선변제금은 소액임차인이 경매·공매 시 다른 담보권자보다 우선해 돌려받는 보증금의 일정액입니다(주택임대차보호법 §8). 집이 경매로 넘어가도 소액임차인은 근저당 등 선순위 권리보다 먼저 정해진 금액을 배당받을 수 있어, 보증금 전액 손실을 막는 최소 안전장치 역할을 합니다.',
  },
  {
    question: '어느 정도 보증금이어야 소액임차인인가요?',
    answer:
      '지역별로 보증금 범위가 정해져 있습니다(시행령). 2023년 2월 개정 이후 서울은 보증금 1억6,500만원 이하, 과밀억제권역과 세종·용인·화성·김포는 1억4,500만원 이하, 광역시 등은 8,500만원 이하, 그 밖의 지역은 7,500만원 이하일 때 소액임차인에 해당합니다. 이 범위를 넘으면 최우선변제 대상이 아닙니다.',
  },
  {
    question: '서울에서는 얼마까지 최우선변제받나요?',
    answer:
      '서울은 최우선변제금이 5,500만원입니다. 보증금이 1억6,500만원 이하인 소액임차인이면 경매 시 5,500만원까지 다른 담보권자보다 먼저 배당받습니다. 다만 이는 상한이며, 실제 배당은 주택가액(대지가액 포함)의 2분의 1 범위 안에서 이뤄집니다.',
  },
  {
    question: '최우선변제를 받으려면 무엇이 필요한가요?',
    answer:
      '경매개시결정 등기 전까지 대항요건(주택 인도와 전입신고)을 갖춰야 합니다. 즉 실제 이사와 전입신고를 마쳐 점유하고 있어야 하며, 배당요구 종기까지 배당요구도 해야 합니다. 확정일자는 최우선변제 자체에는 필수가 아니지만, 우선변제권을 위해 함께 갖추는 것이 안전합니다.',
  },
  {
    question: '최우선변제금은 보증금 전액을 보장하나요?',
    answer:
      '아닙니다. 최우선변제금은 보증금 중 일정액만 보호합니다. 예를 들어 서울에서 보증금 1억원인 소액임차인은 5,500만원만 최우선변제 대상이고, 나머지 4,500만원은 순위에 따라 배당받거나 회수하지 못할 수 있습니다. 따라서 최우선변제금은 전액 보장이 아닌 최소 방어선으로 이해해야 합니다.',
  },
  {
    question: '기준 시점은 언제인가요?',
    answer:
      '담보물권(근저당 등) 설정일을 기준으로 그 당시 시행령의 금액이 적용됩니다. 즉 지금 계약해도 해당 주택에 앞서 설정된 근저당이 오래된 것이라면, 그 시점의 낮은 기준이 적용될 수 있습니다. 그래서 계약 전 등기부등본으로 선순위 근저당 설정일과 금액을 확인하는 것이 중요합니다.',
  },
  {
    question: '주택가액 2분의 1 한도는 무슨 뜻인가요?',
    answer:
      '최우선변제금 총액이 배당할 주택가액의 2분의 1을 넘지 못한다는 제한입니다. 소액임차인이 여러 명이면 각자의 변제금 합계가 주택가액의 절반 안에서 안분됩니다. 따라서 다가구주택처럼 소액임차인이 많은 경우, 개인이 받는 금액이 상한보다 줄어들 수 있습니다.',
  },
  {
    question: '전세보증금 반환보증과 무엇이 다른가요?',
    answer:
      '최우선변제는 법정 제도이고, 반환보증은 별도 가입 상품입니다. 최우선변제금은 소액임차인에게 법이 보장하는 최소 배당이고, 전세보증금 반환보증(보증기관 가입)은 보증금 전액을 대상으로 하는 보험성 상품입니다. 보증금이 최우선변제 범위를 넘는다면 반환보증 가입을 함께 고려하는 것이 안전합니다.',
  },
];

export default function SmallTenantPriorityRepayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '소액임차인 최우선변제금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '소액임차인 최우선변제금 2026, 지역별 보증금 범위와 변제금액 완전 정리',
    description:
      '경매·공매 시 소액임차인이 우선 배당받는 최우선변제금(주택임대차보호법 §8). 서울 5,500만원 등 지역별 보증금 범위와 변제금액, 요건, 주택가액 2분의 1 한도까지 임차인 관점에서 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['소액임차인', '최우선변제금', '전세보증금 보호', '주택임대차보호법 8조', '경매'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '소액임차인 최우선변제금 2026',
    description:
      '경매 시 소액임차인이 우선 배당받는 최우선변제금의 지역별 기준과 요건 정리.',
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
                    { name: '소액임차인 최우선변제금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임차인 · 전월세 계약 전 · 8분 읽기 · 2026-07-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  소액임차인 최우선변제금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">경매에서 먼저 돌려받는 보증금</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세나 월세로 살던 집이 경매로 넘어가면 보증금을 떼일까 걱정하게 됩니다. 이런 상황에서 소액임차인을 보호하기 위한 제도가 최우선변제금입니다. 보증금이 일정 범위 안이면 다른 담보권자보다 먼저 정해진 금액을 돌려받을 수 있습니다. 이 가이드는 지역별 보증금 범위와 최우선변제금, 요건, 한도를 주택임대차보호법 §8을 기준으로 임차인 관점에서 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-small-tenant-priority-repayment-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">최우선변제금은 어떤 제도인가요?</h2>
                <p>
                  최우선변제금은 소액임차인이 경매·공매에서 선순위 권리보다 먼저 보증금 일부를 배당받는 제도입니다(주택임대차보호법 §8). 집주인이 대출을 갚지 못해 집이 경매로 넘어가면, 보통은 근저당 같은 담보권이 먼저 배당받고 임차인은 후순위로 밀립니다. 하지만 소액임차인은 이 순위와 무관하게 정해진 금액을 최우선으로 받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">최우선변제의 핵심 개념</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 지역별 보증금 범위 이하의 소액임차인
                    <br />
                    · 순위: 선순위 근저당보다 먼저 배당(최우선)
                    <br />
                    · 한도: 지역별 정해진 금액 + 주택가액의 2분의 1 이내
                  </p>
                </div>
                <p className="mt-4">
                  다만 최우선변제는 보증금 전액이 아니라 일정액만 보호합니다. 큰 보증금이라면 이 제도만으로는 부족하므로, 뒤에 설명할 대항력·확정일자·반환보증을 함께 갖춰야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">내가 소액임차인에 해당하나요?</h2>
                <p>
                  지역별로 정해진 보증금 범위 이하이면 소액임차인입니다. 2023년 2월 개정 이후 현행 기준은 다음과 같습니다. 지역 구분과 금액을 자신의 계약과 대조해 보세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 지역별 소액임차인 보증금 범위와 최우선변제금 (주택임대차보호법 시행령, 2023-02 개정 현행)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지역</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보증금 범위(이하)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최우선변제금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">서울특별시</td>
                        <td className="p-3">1억 6,500만원</td>
                        <td className="p-3"><strong>5,500만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">과밀억제권역, 세종·용인·화성·김포</td>
                        <td className="p-3">1억 4,500만원</td>
                        <td className="p-3"><strong>4,800만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">광역시, 안산·광주·파주·이천·평택</td>
                        <td className="p-3">8,500만원</td>
                        <td className="p-3"><strong>2,800만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">그 밖의 지역</td>
                        <td className="p-3">7,500만원</td>
                        <td className="p-3"><strong>2,500만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 적용 기준은 계약일이 아니라 그 주택에 설정된 담보물권(근저당 등)의 설정일입니다. 오래된 근저당이 있으면 개정 전의 낮은 기준이 적용될 수 있으므로, 계약 전 등기부등본으로 선순위 근저당 설정일을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제로 얼마를 돌려받나요?</h2>
                <p>
                  보증금 규모와 지역에 따라 최우선변제금이 결정됩니다. 다음 사례로 확인해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 서울 보증금 1억원 (소액임차인 해당)</p>
                  <p className="text-sm text-text-secondary">
                    · 보증금: 1억원 (서울 범위 1억6,500만원 이하 → 소액임차인)
                    <br />
                    · 최우선변제금: <strong>5,500만원</strong> 우선 배당
                    <br />
                    · 나머지 4,500만원: 순위에 따라 배당(확정일자 우선변제권 등)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 최소 5,500만원은 선순위 근저당보다 먼저 확보.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 서울 보증금 1억 8천만원 (범위 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 보증금: 1억 8,000만원 (서울 범위 1억6,500만원 초과)
                    <br />
                    · 소액임차인 해당 여부: <strong>비해당</strong>
                    <br />
                    · 최우선변제: 없음 → 확정일자·순위에 따라서만 배당
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 범위를 조금이라도 넘으면 최우선변제 자체가 적용되지 않음.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 최우선변제금 총액은 배당할 주택가액(대지가액 포함)의 2분의 1을 넘지 못합니다. 소액임차인이 여러 명이면 이 한도 안에서 안분되므로, 다가구주택에서는 개인이 받는 금액이 표의 상한보다 줄어들 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-small-tenant-priority-repayment-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">최우선변제를 받으려면 무엇을 해야 하나요?</h2>
                <p>
                  경매개시결정 등기 전까지 대항요건을 갖추는 것이 핵심입니다. 절차를 놓치면 소액임차인이라도 배당에서 제외될 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">최우선변제 요건 체크리스트</p>
                  <p className="text-sm text-text-secondary">
                    1. 주택 인도(실제 이사·점유) + 전입신고 → 대항요건 확보
                    <br />
                    2. 경매개시결정 등기 전에 대항요건 갖출 것
                    <br />
                    3. 배당요구 종기까지 법원에 배당요구
                    <br />
                    4. 등기부로 선순위 권리·설정일 사전 확인
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 확정일자는 최우선변제 요건 자체는 아니지만, 범위를 넘는 보증금의 나머지 부분을 순위대로 돌려받는 우선변제권을 위해 반드시 함께 받아 두는 것이 안전합니다. 대항요건과 확정일자는 이사 당일 함께 처리하는 것이 원칙입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">보증금 전액을 지키려면</h2>
                <p>
                  최우선변제금은 최소 방어선일 뿐, 큰 보증금은 다층 방어가 필요합니다. 다음을 함께 갖추세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>대항력 + 확정일자:</strong> 전입신고와 확정일자로 우선변제권을 확보해 순위 배당을 받습니다.
                  </li>
                  <li>
                    <strong>등기부 확인:</strong> 계약 전 선순위 근저당·가압류 여부와 금액을 확인해 위험한 물건을 피합니다.
                  </li>
                  <li>
                    <strong>전세보증금 반환보증:</strong> 보증기관 상품에 가입해 보증금 전액을 별도로 보호합니다.
                  </li>
                  <li>
                    <strong>임차권등기명령:</strong> 이사를 나가야 할 때 대항력·우선변제권을 유지하기 위해 활용합니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 안전 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 지키는 전체 방어 전략을 정리합니다.</p>
                  </Link>
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대항력·확정일자·우선변제권</div>
                    <p className="mt-1 text-sm text-text-secondary">최우선변제와 함께 갖춰야 할 권리들.</p>
                  </Link>
                  <Link
                    href="/guide/lease-registration-order-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임차권등기명령</div>
                    <p className="mt-1 text-sm text-text-secondary">이사 후에도 대항력을 유지하는 방법.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세 조정 금액을 계산해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/lease-report-system-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 신고제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">계약 신고 의무와 확정일자 자동 부여.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세·중개수수료·임대수익률 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률 조언이 아닙니다. 소액임차인 해당 여부, 최우선변제금, 적용 기준일은 개별 물건의 담보물권 설정일과 등기 상황에 따라 달라지므로, 실제 경매·배당 사안은 대한법률구조공단 또는 법률 전문가와 반드시 확인하세요. 본 콘텐츠는 2026-07-17을 기준으로 작성되었으며, 관련 법령은 <strong>주택임대차보호법 §8(보증금 중 일정액의 보호), 시행령(우선변제 대상 보증금 범위·최우선변제금액)</strong>을 따릅니다. 지역별 금액은 2023년 2월 개정 현행 기준입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기 쉬운 생활법령정보</a>,{' '}
                  <a href="https://www.klac.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한법률구조공단</a>.
                </p>
              </section>

              <ShareButtons
                title="소액임차인 최우선변제금 2026 가이드"
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
