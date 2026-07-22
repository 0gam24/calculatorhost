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

const URL = 'https://calculatorhost.com/guide/commercial-building-lease-2026/';
const DATE_PUBLISHED = '2026-07-11';
const DATE_MODIFIED = '2026-07-11';

export const metadata: Metadata = {
  title: '상가건물 임대차보호법 2026, 계약갱신 10년·권리금·차임인상 5% 완벽 가이드',
  description:
    '자영업자를 위한 상가 임대차보호법. 계약갱신요구권 10년, 권리금 회수기회 보호, 차임 증액 상한 5% 기준. 대항력·정당한 사유·환산보증금까지 정확하게 정리.',
  keywords: [
    '상가건물 임대차보호법',
    '계약갱신요구권',
    '권리금 회수',
    '차임 증액 5%',
    '대항력',
    '자영업자 임대차',
    '상가 보증금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상가건물 임대차보호법 2026, 계약갱신 10년·권리금·차임인상 5% 완벽 가이드' }],
    title: '상가건물 임대차보호법 2026, 계약갱신 10년·권리금·차임인상 5% 완벽 가이드',
    description: '자영업자를 위한 상가 임대차보호법. 계약갱신요구권 10년, 권리금 회수기회 보호, 차임 증액 상한 5% 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상가건물 임대차보호법 2026, 계약갱신 10년·권리금·차임인상 5% 완벽 가이드',
    description: '자영업자를 위한 상가 임대차보호법. 계약갱신요구권 10년, 권리금 회수기회 보호, 차임 증액 상한 5%.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상가건물 임대차보호법이 어떤 임차인을 보호하는가?',
    answer:
      '상가건물 임대차보호법은 상가건물(점포, 사무실 등) 임차인을 보호하기 위한 법입니다. 이 법의 보호 대상은 사업용 임차인으로, 주거용이 아닌 영업 목적으로 상가를 빌리는 자영업자, 소상공인입니다. 주택임차보호법과는 별개이므로 주택과 상가의 규칙을 혼동하면 안 됩니다.',
  },
  {
    question: '계약갱신요구권의 "10년"은 정확히 무엇을 의미하나?',
    answer:
      '상가건물 임대차보호법 제10조에 따르면, 임차인은 최초 임대차 계약을 포함하여 총 10년까지 계약갱신을 요구할 수 있습니다. 예를 들어 3년 계약을 체결했다면 갱신 횟수는 최대 3회까지 가능하고, 이를 통해 총 임차 기간이 10년에 도달합니다. 다만 임대인이 "정당한 사유"(3기 차임 연체 등)가 있으면 갱신을 거절할 수 있습니다.',
  },
  {
    question: '차임 증액 5% 상한은 어떻게 적용되나?',
    answer:
      '상가건물 임대차보호법 제11조 및 대통령령에 따르면, 임대인이 계약갱신 시 제시할 수 있는 차임(또는 보증금) 증액은 전년도 차임의 5% 이내입니다. 예를 들어 월차임 200만 원이면 다음 계약에서 최대 210만 원(5% 인상)까지만 요구할 수 있습니다. 5% 이상 인상을 원한다면 임차인이 동의하지 않는 한 불가능합니다.',
  },
  {
    question: '권리금 회수기회 보호란 무엇인가?',
    answer:
      '상가건물 임대차보호법 제10조의4는 임차인의 권리금 회수 기회를 보호합니다. 임대인이 신규 임차인으로부터 보증금을 높게 받으려는 목적 등으로 기존 임차인의 권리금 수수를 부당하게 방해하면 손해배상 책임을 집니다. 즉, 임차인은 퇴출 시 새 임차인으로부터 권리금을 받을 기회를 법으로 보장받습니다.',
  },
  {
    question: '대항력이란 무엇이고 언제 발생하나?',
    answer:
      '상가건물 임대차보호법 제3조의 "대항력"은, 임차인이 건물 인도를 받고 사업자등록을 신청하면 그 다음날부터 발생합니다. 대항력이 생기면 임대인 변동(건물 매매 등)의 영향을 받지 않으며, 압류·경매 절차에서도 보호를 받습니다. 따라서 계약 체결 후 즉시 사업자등록을 마치는 것이 중요합니다.',
  },
  {
    question: '환산보증금이 기준을 넘으면 임대차보호법 보호를 못 받나?',
    answer:
      '아닙니다. 환산보증금은 기준을 넘어도 계약갱신요구권, 권리금 회수기회 보호, 대항력 같은 핵심 보호는 적용됩니다. 다만 서울(9억), 부산(6억) 등 지역별 환산보증금 기준을 초과하면 일부 조항의 적용이 제한될 수 있으므로, 자신의 임대차가 정확히 어느 범주인지 확인하는 것이 좋습니다.',
  },
  {
    question: '묵시적 갱신은 자동으로 계약이 연장되나?',
    answer:
      '상가건물 임대차보호법 제10조 제4항에 따르면, 계약갱신 기간에 임대인·임차인 중 누구도 거절 의사를 표시하지 않으면 같은 조건으로 계약이 자동 연장(묵시적 갱신)됩니다. 다만 이것이 무한정 계속되는 것은 아니고, 처음부터 최대 10년 기한까지만 적용됩니다. 갱신 거절을 원한다면 반드시 정해진 기간 내에 의사 표시를 해야 합니다.',
  },
  {
    question: '임대인이 "정당한 사유"로 갱신을 거절할 수 있는 경우는?',
    answer:
      '상가건물 임대차보호법 제10조 제2항에서 말하는 "정당한 사유"는 주로 3기 이상 차임 연체, 임차인의 주요 채무 위반 등입니다. 또한 건물주가 정당하게 필요한 경우(예: 직영 점포 운영, 건물 리모델링)도 해당될 수 있지만, 이는 구체적 상황에 따라 판단되므로 법원 판단이 필요할 수 있습니다.',
  },
];

export default function CommercialBuildingLease2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상가건물 임대차보호법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상가건물 임대차보호법 2026, 계약갱신 10년·권리금·차임인상 5% 완벽 가이드',
    description:
      '자영업자를 위한 상가 임대차보호법. 계약갱신요구권 10년, 권리금 회수기회 보호, 차임 증액 상한 5% 기준. 대항력·정당한 사유·환산보증금까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상가건물 임대차보호법', '계약갱신요구권', '권리금 회수', '차임 증액', '대항력'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상가건물 임대차보호법 2026',
    description:
      '자영업자를 위한 상가 임대차보호법. 계약갱신요구권 10년, 권리금 회수기회 보호, 차임 증액 상한 5%.',
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
                    { name: '상가건물 임대차보호법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자영업자·건물주 · 10분 읽기 · 2026-07-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상가건물 임대차보호법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">계약갱신 10년·권리금 보호·차임 인상 5% 완벽 가이드</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전국 수백만의 자영업자가 남의 건물에서 사업을 합니다. 그런데 임대차 계약이 끝나면 어떻게 될까요? 임대인이 일방적으로 퇴출할 수 있을까요? 다행히 상가건물 임대차보호법이 임차인의 기본 권리를 지켜줍니다. 이 가이드는 계약갱신요구권, 권리금 회수, 차임 인상 상한, 대항력까지 자영업자가 꼭 알아야 할 법의 핵심을 명확하게 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-commercial-building-lease-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상가건물 임대차보호법이란 무엇인가</h2>
                <p>
                  상가건물 임대차보호법은 주거용이 아닌 상가건물(점포, 사무실, 음식점 등) 임차인을 보호하기 위한 법입니다. 주택임차인보호법과 별개로, 사업용 임차인인 자영업자·소상공인이 임대인의 일방적 퇴출, 과도한 차임 인상 등으로부터 기본 권리를 지켜줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">상가건물 임대차보호법의 핵심 목적</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    임차인이 상당한 투자를 들여 꾸민 점포를 갑작스럽게 잃지 않도록, 계약갱신·권리금 회수·차임 인상 제한 등의 기본 권리를 법적으로 보장합니다.
                    <br />
                    근거: 상가건물 임대차보호법 제1조(목적)·§3(대항력)·§10(계약갱신요구권)·§10의4(권리금 회수기회)·§11(차임 증액 상한)
                  </p>
                </div>
                <p className="mt-4">
                  이 법은 1994년 제정되어 지금까지 자영업자를 보호해온 기본법입니다. 매장을 꾸민 임차인이 영업 착수 후 일정 기간 동안은 계약을 갱신받을 수 있고, 퇴실 시 권리금을 회수할 수 있으며, 차임 인상도 5% 이내로 제한되도록 만든 법입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약갱신요구권, 최대 10년까지 보호받다</h2>
                <p>
                  상가건물 임대차보호법 제10조는 임차인에게 "계약갱신요구권"을 줍니다. 이것은 임차인이 계약 종료 전에 같은 조건으로 다시 계약을 맺어달라고 요구할 수 있는 권리입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 계약갱신요구권의 핵심 기준(상가건물 임대차보호법 §10)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">총 임대차 기간</td>
                        <td className="p-3"><strong>최대 10년</strong> (첫 계약부터 모든 갱신 누적)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">갱신 요구 기간</td>
                        <td className="p-3">계약 종료 3개월 전 ~ 1개월 전</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">갱신 기간</td>
                        <td className="p-3">통상 2년 (당사자 합의 시 다를 수 있음)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">임대인 거절 이유</td>
                        <td className="p-3">"정당한 사유" 필요 (§10 ②항, 예: 3기 차임 연체)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">묵시적 갱신</td>
                        <td className="p-3">갱신 거절 없으면 자동 연장 (§10 ④항)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예를 들어보겠습니다. 처음 3년 계약을 체결했다면, 임차인은 3년 후 첫 갱신을 요구할 수 있고, 그 다음 3년 후 또 갱신을 요구할 수 있으며, 이렇게 해서 최대 10년(= 3년 + 3년 + 3년 + 1년)까지 계속 사업을 할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 10년에 도달하면 더 이상의 갱신은 불가능합니다. 임대인이 "더 이상 갱신할 수 없습니다"라고 하면 법적으로 거절할 사유가 없으므로, 이때부터는 새로운 임차인을 모집하거나 상점을 양도해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임대인이 갱신을 거절하는 "정당한 사유"란</h2>
                <p>
                  임대인도 모든 계약갱신 요구에 응할 의무는 없습니다. 하지만 거절하려면 법이 인정하는 "정당한 사유"가 있어야 합니다(상가건물 임대차보호법 §10 ②).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">정당한 사유의 주요 예시</p>
                  <ul className="text-sm text-text-secondary ml-5 list-disc space-y-2">
                    <li>임차인의 3기 이상 차임 또는 보증금 연체</li>
                    <li>임차인이 임차건물의 사용 목적을 위반하거나 건물을 손상시킨 경우</li>
                    <li>임대인이 직접 그 건물을 사용할 정당한 필요성 (예: 직영 점포 운영, 건물 리모델링)</li>
                    <li>건물주의 생계를 위해 필수적인 사유로 인정되는 경우</li>
                  </ul>
                </div>
                <p className="mt-4">
                  다만 "정당한 사유"는 법원이 개별 사건마다 판단하므로, 상황에 따라 인정 여부가 달라질 수 있습니다. 예를 들어 "건물을 팔아야 한다"는 이유만으로는 인정되지 않지만, "내가 직접 이 자리에서 사업을 해야 한다"는 구체적 필요성이 있다면 인정될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">권리금 회수기회, 법이 보장하다</h2>
                <p>
                  임차인이 상가를 꾸미고 사업을 하면서 축적한 "권리금"은 중요한 자산입니다. 권리금은 점포의 위치, 인지도, 단골 등 무형자산의 가치를 돈으로 환산한 것입니다. 상가건물 임대차보호법 제10조의4는 이 권리금을 회수할 기회를 법적으로 보장합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">권리금 회수기회 보호의 의미(상가건물 임대차보호법 §10의4)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    임대인이 신규 임차인으로부터 과도한 보증금을 받으려는 등의 이유로, 기존 임차인이 권리금을 수수받는 것을 부당하게 방해하면 손해배상 책임을 집니다. 즉, 자영업자는 퇴출할 때 새 임차인으로부터 권리금을 받을 수 있도록 법이 보호합니다.
                  </p>
                </div>
                <p className="mt-4">
                  실제로 이런 분쟁이 생기는 경우는 드물지만, 임대인이 신규 임차인에게 "기존 임차인과는 거래하지 말고 나와만 거래하라" 같은 부당한 조건을 강요하면 이는 권리금 회수 기회를 방해하는 것으로 봅니다. 이 경우 법원에 손해배상을 청구할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차임 증액 상한, 5% 이내</h2>
                <p>
                  계약을 갱신할 때 임대인이 차임(월세)을 무한정 올릴 수는 없습니다. 상가건물 임대차보호법 제11조는 차임 증액의 상한을 정해놓았습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 차임·보증금 증액 상한(상가건물 임대차보호법 §11)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상한율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">월세(차임)</td>
                        <td className="p-3"><strong>5%</strong></td>
                        <td className="p-3">전년도 월세의 5% 이내 인상 가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">보증금</td>
                        <td className="p-3"><strong>5%</strong></td>
                        <td className="p-3">전년도 보증금의 5% 이내 인상 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">재계약 시 재협상</td>
                        <td className="p-3">증액 후 1년 이내 재협상 불가</td>
                        <td className="p-3">5% 인상 후 1년 동안은 다시 올릴 수 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  실제 사례를 보겠습니다. 현재 월세가 200만 원이라면, 갱신 시 최대 210만 원(200 × 1.05 = 210)까지만 올릴 수 있습니다. 만약 임대인이 "다음 계약은 250만 원"이라고 요구한다면, 임차인은 이를 거절하고 법원에 소송을 제기할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 5% 상한은 계약갱신 시 적용됩니다. 만약 임차인과 임대인이 합의로 5% 초과 인상에 동의한다면, 이는 법 위반이 아닙니다. 중요한 것은 "임대인이 일방적으로" 5% 초과 금액을 강요할 수 없다는 점입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대항력, 임대인이 바뀌어도 보호받다</h2>
                <p>
                  상가를 빌린 자영업자가 가장 두려워하는 것 중 하나는 건물주가 바뀌는 것입니다. 새 건물주가 "계약을 인수하지 않겠다"고 하면 어떻게 될까요? 이를 방지하기 위해 상가건물 임대차보호법 제3조는 "대항력"이라는 권리를 줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">대항력의 정의 및 발생 요건(상가건물 임대차보호법 §3)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    임차인이 건물의 인도를 받고 사업자등록을 신청하면, 그 다음날부터 대항력이 발생합니다.
                    <br />
                    <br />
                    발생 요건:
                    <br />
                    1. 건물의 점유(건물 인도받음)
                    <br />
                    2. 사업자등록 신청(통상 2~3일 이내)
                    <br />
                    <br />
                    대항력의 효력:
                    <br />
                    · 건물이 매도되거나 경매되어 임대인이 바뀌어도, 임차인은 새 건물주에게 기존 조건으로 계속 사업할 수 있음
                    <br />
                    · 건물이 압류·경매 대상이 되어도 임차인의 권리를 우선 보호받음
                  </p>
                </div>
                <p className="mt-4">
                  다시 말해, 대항력은 "건물이 누구 소유가 되든 나의 임차권은 유효하다"는 증거입니다. 따라서 계약 체결 후 반드시 건물 인도받은 다음날에 관할 세무서에 사업자등록을 신청해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환산보증금, 기준을 초과해도 기본 보호는 유효</h2>
                <p>
                  상가건물 임대차보호법은 지역별로 "환산보증금 기준"을 정해놓고 있습니다. 환산보증금은 보증금에 월세를 합산해서 계산한 수치입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">환산보증금의 계산(상가건물 임대차보호법 시행령)</p>
                  <p className="text-sm text-text-secondary">
                    환산보증금 = 보증금 + (월세 × 100)
                    <br />
                    <br />
                    예시:
                    <br />
                    · 보증금 5,000만원 + 월세 200만원
                    <br />
                    · 환산보증금 = 5,000만원 + (200 × 100) = 5,000만원 + 2억원 = 2억 5,000만원
                  </p>
                </div>
                <p className="mt-4">
                  지역별 환산보증금 기준:
                </p>
                <ul className="space-y-2 ml-5 list-disc text-sm text-text-secondary">
                  <li>서울: 9억원</li>
                  <li>부산: 6억원</li>
                  <li>대구·인천·광주·대전·울산: 3억원</li>
                  <li>기타 지역: 2억원</li>
                </ul>
                <p className="mt-4">
                  중요한 점은, 환산보증금이 기준을 초과해도 계약갱신요구권, 권리금 회수기회 보호, 대항력 같은 핵심 권리는 여전히 적용된다는 것입니다. 다만 일부 세부 조항의 적용이 제한될 수 있으므로, 자신의 임대차가 정확히 어느 범주인지 확인하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산 사례로 이해하기</h2>
                <p>
                  지금까지 배운 내용을 실제 사례로 정리해보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 환산보증금 계산</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 서울 강남의 피자집, 보증금 8천만원, 월세 180만원
                    <br />
                    · 환산보증금 = 8,000만 + (180 × 100) = 8,000만 + 1.8억 = 2.6억원
                    <br />
                    · 서울 기준(9억) 미만이므로 법의 모든 보호 적용
                    <br />
                    · 결론: 계약갱신요구권 10년, 권리금 회수 보호, 차임 5% 상한 모두 적용
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 차임 인상 상한 적용</p>
                  <p className="text-sm text-text-secondary">
                    · 현재 월세: 300만원
                    <br />
                    · 임대인이 제시한 갱신 차임: 320만원
                    <br />
                    · 법의 상한: 300만 × 1.05 = 315만원
                    <br />
                    · 합법적 협상 범위: 300만 ~ 315만원
                    <br />
                    · 320만원은 법적으로 불가능 (5% 초과)
                    <br />
                    · 결론: 임차인이 315만원까지만 인정 가능, 합의 안 되면 법원 소송 가능
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 갱신 요구 기간과 10년 제한</p>
                  <p className="text-sm text-text-secondary">
                    · 2014년 3월 계약 체결(첫 계약 3년)
                    <br />
                    · 2017년 3월 첫 갱신(제1갱신 3년) → 총 6년 경과
                    <br />
                    · 2020년 3월 두 번째 갱신(제2갱신 3년) → 총 9년 경과
                    <br />
                    · 2023년 3월 세 번째 갱신 요청 가능하나, 총 12년이 되므로 불가능
                    <br />
                    · 2023년은 10년 도과 후 1년이므로, 임대인이 갱신 거절 가능
                    <br />
                    · 결론: 최대 2023년 3월까지만 사업 가능 (10년 도과)
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-commercial-building-lease-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">자영업자가 꼭 챙겨야 할 실무 체크리스트</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>계약서 필수 기재 사항 확인:</strong> 보증금, 월세, 사업 목적, 계약 기간, 갱신 조건 등이 명확히 기록되어 있는지 확인하세요.
                  </li>
                  <li>
                    <strong>사업자등록 즉시 신청:</strong> 건물 인수 다음날 세무서에 사업자등록을 신청하세요. 이것이 대항력 발생의 필수 조건입니다.
                  </li>
                  <li>
                    <strong>계약갱신 기간 메모:</strong> 계약 종료 3개월 전부터 1개월 전 사이에 임대인에게 갱신 의사를 명확히 전달하세요. 서면(카톡, 문자, 이메일)으로 증거를 남기는 것이 좋습니다.
                  </li>
                  <li>
                    <strong>권리금 협상 기록:</strong> 차임 인상과 별도로 권리금을 수수받기로 했다면 그 내용을 문서로 남기세요.
                  </li>
                  <li>
                    <strong>분쟁 시 변호사 상담:</strong> 임대인과의 갱신 거절, 권리금 회수 분쟁이 생기면 가능한 빨리 변호사에게 상담받으세요. 상가 소송은 법률 전문성이 매우 중요합니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 가이드 및 정보</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/rent-conversion-rate-2026-housing-lease-act/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택 전월세 전환율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 임대차와 차별되는 상가만의 규칙을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/rent-increase-5-percent-cap-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 인상 5% 상한제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주택과 상가 모두 적용되는 인상 상한을 비교해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임차권 우선순위 및 계약 갱신 기한</div>
                    <p className="mt-1 text-sm text-text-secondary">대항력과 임차권 우선순위의 차이를 명확히 하세요.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 2026, 타이밍과 서류</div>
                    <p className="mt-1 text-sm text-text-secondary">대항력 발생의 필수 단계, 사업자등록을 정확히 하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">환산보증금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세로 환산보증금을 빠르게 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">임대료, 양도세, 취득세 등 부동산 정보 전체를 확인하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개별 상황에 대한 법률 조언이 아닙니다. 상가 임대차 관련 실제 분쟁은 복잡하고 다양한 법리가 얽혀 있으므로, 반드시 변호사 또는 법무사와 상담하세요. 본 콘텐츠는 2026-07-11을 기준으로 작성되었으며, 상가건물 임대차보호법 개정 시 즉시 업데이트됩니다. 계약갱신요구권·권리금 보호·차임 상한의 정확한 기준은 법조항 <strong>상가건물 임대차보호법 §3(대항력)·§10(계약갱신요구권)·§10의4(권리금 회수기회)·§11(차임 증액 상한)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.smaeb.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">소상공인마당(소상공인벤처부)</a>,{' '}
                  <a href="https://www.moj.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한민국 법무부</a>.
                </p>
              </section>

              <ShareButtons
                title="상가건물 임대차보호법 2026 완벽 가이드"
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
