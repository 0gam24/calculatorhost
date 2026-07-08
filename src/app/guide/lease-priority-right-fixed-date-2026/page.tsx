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

const URL = 'https://calculatorhost.com/guide/lease-priority-right-fixed-date-2026/';
const DATE_PUBLISHED = '2026-07-09';
const DATE_MODIFIED = '2026-07-09';

export const metadata: Metadata = {
  title: '확정일자·전입신고 우선변제권 2026 | 전세보증금 지키는 법',
  description:
    '대항력·우선변제권·최우선변제 차이점 완벽 정리. 전입신고 + 확정일자로 보증금을 보호하는 방법. 주택임대차보호법 §3·§3의2·§8 기준 및 지역별 최우선변제 금액.',
  keywords: [
    '확정일자',
    '전입신고',
    '우선변제권',
    '대항력',
    '최우선변제',
    '전세보증금',
    '주택임대차보호법',
    '전세사기',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '확정일자·전입신고 우선변제권 2026 | 전세보증금 지키는 법' }],
    title: '확정일자·전입신고 우선변제권 2026 — 전세보증금을 보호하는 법',
    description: '대항력·우선변제권·최우선변제의 정확한 개념 및 신청 방법. 보증금 손실을 방지하는 세입자 필수 가이드.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '확정일자·전입신고 우선변제권 2026 — 전세보증금 보호 가이드',
    description: '전입신고 + 확정일자 → 우선변제권 획득. 건물주 채무 시에도 보증금 우선 배당받는 법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '대항력과 우선변제권의 차이가 뭔가요?',
    answer:
      '대항력은 임차인이 집주인이 바뀌어도 임차권을 주장할 수 있는 힘입니다. 전입신고만으로도 그 다음날부터 생깁니다(주택임대차보호법 §3). 반면 우선변제권은 경매·공매 시 후순위 담보권자보다 앞서 보증금을 받을 권리로, 대항력 + 확정일자가 필요합니다(§3의2). 최우선변제는 더 강해서, 보증금이 지역별 기준 이하면 선순위 근저당보다 우선 배당됩니다(§8).',
  },
  {
    question: '확정일자만 받으면 우선변제권이 생기나요?',
    answer:
      '아닙니다. 우선변제권은 두 가지가 모두 필요합니다(§3의2): ① 대항력(전입신고 + 주택 인도·점유) ② 확정일자. 만약 근저당이 2024년 1월 1일에 설정됐는데 확정일자는 2024년 2월 1일에 받았다면, 근저당이 우선순위입니다. 따라서 집에 들어가자마자 바로 주민센터에서 전입신고를 하고, 동시에 확정일자를 받는 것이 중요합니다.',
  },
  {
    question: '최우선변제는 얼마까지 보호되나요?',
    answer:
      '최우선변제 금액은 지역별로 다릅니다(시행령 §10·§11). 서울 5,500만원, 과밀억제권역 4,800만원, 광역시 2,800만원, 기타 2,500만원입니다. 그러나 보증금 전액이 보호되는 것은 아니고, 이 금액 범위 또는 주택가액의 1/2 중 작은 금액만 최우선변제를 받습니다. 예: 서울에서 보증금 6,000만원이면 5,500만원까지만 최우선변제, 500만원은 보증금 보장보험으로 별도 확보해야 합니다.',
  },
  {
    question: '전입신고를 안 하면 우선변제권을 못 받나요?',
    answer:
      '네, 우선변제권을 받으려면 반드시 전입신고를 해야 합니다. 확정일자만 받고 전입신고를 안 하면 대항력이 없어서 우선변제권이 발생하지 않습니다. 또한 전입신고가 확정일자보다 먼저 되어야 합니다. 정확히는 전입신고로 대항력이 먼저 생긴 후, 그 상태에서 확정일자를 받아야 우선변제권이 성립됩니다.',
  },
  {
    question: '확정일자를 받는 곳은 어디인가요?',
    answer:
      '확정일자는 주민센터(동사무소)·등기소·인터넷등기소(대법원)에서 받을 수 있습니다. 가장 편한 곳은 거주 지역 주민센터입니다. 준비물은 신분증, 임차인 인감도장(또는 서명), 임대차계약서(사본 가능)입니다. 등기소는 공증처럼 엄격해서 원본 확인을 요구할 수 있지만, 주민센터는 덜 까다롭습니다.',
  },
  {
    question: '전입신고는 언제까지 해야 하나요?',
    answer:
      '전입신고는 이사 후 14일 이내에 완료해야 합니다(주민등록법). 다만 우선변제권의 발생 시점은 전입신고 완료 그 다음날 0시부터입니다. 따라서 집에 들어가자마자 바로 전입신고를 하는 것이 가장 안전합니다. 특히 건물주가 이미 다른 대출을 받았거나, 경제 상황이 불안한 시기에는 하루라도 빨리 전입신고를 하세요.',
  },
  {
    question: '전세 계약 전에 확인해야 할 서류는 뭔가요?',
    answer:
      '임차인은 등기부등본에서 ① 근저당권의 순서와 금액 ② 가압류·압류 여부 ③ 임의경매 신청 여부를 반드시 확인해야 합니다. 특히 근저당권이 여러 개 있으면, 자신의 보증금이 그 어디쯤에 위치할지 판단할 수 있습니다. 시세보다 너무 낮은 전세는 위험 신호입니다. 또한 임대인의 신용 상태·과거 연체 이력 등을 알아보는 것도 도움이 됩니다.',
  },
  {
    question: '이미 전세사기 피해를 입었으면 어떻게 하나요?',
    answer:
      '우선변제권이 없었다면 전세보증금 반환 청구 소송을 제기할 수 있습니다. 또한 전세 계약 시 미리 보증금 보장보험에 가입했다면 보험금을 청구할 수 있습니다. 최근 정부는 "깡통전세" 피해자를 위해 특별대출 프로그램·세제 지원·임시 주거지원 등을 시행 중입니다. 한국주택금융공사(www.hf.go.kr)에서 지원 대상 확인이 가능합니다.',
  },
];

export default function LeapriorityRightFixedDate2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '확정일자·전입신고 우선변제권 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '확정일자·전입신고 우선변제권 2026 — 대항력·우선변제·최우선변제 완전 정리',
    description:
      '전세 계약 후 반드시 챙겨야 할 대항력·우선변제권·최우선변제의 정확한 개념, 신청 방법, 지역별 최우선변제 금액 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['확정일자', '전입신고', '우선변제권', '전세보증금', '주택임대차보호법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '확정일자·전입신고 우선변제권 2026',
    description:
      '전세보증금을 보호하는 대항력·우선변제권·최우선변제의 정확한 메커니즘과 신청 절차.',
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
                    { name: '확정일자·전입신고 우선변제권 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세입자·임차인 · 11분 읽기 · 2026-07-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  확정일자·전입신고
                  <br />
                  <span className="text-2xl text-text-secondary">— 전세보증금을 지키는 우선변제권</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세사기는 더 이상 남의 일이 아닙니다. 매년 수천 명의 세입자들이 임대인의 채무로 인해 보증금을 돌려받지 못하는 상황에 직면합니다. 하지만 이런 악사를 충분히 예방할 수 있는 법적 방어 수단이 있습니다. 바로 대항력·우선변제권·최우선변제입니다. 이 가이드는 전세 계약 후 반드시 해야 할 '전입신고'와 '확정일자' 신청의 정확한 의미, 단계별 신청 방법, 그리고 지역별 최우선변제 금액까지 완벽하게 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-lease-priority-right-fixed-date-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대항력·우선변제권·최우선변제란</h2>
                <p>
                  세입자의 전세보증금을 지키기 위해 주택임대차보호법에서 규정한 세 가지 개념이 있습니다. 이들은 각각 다른 수준의 보호를 제공하므로, 정확히 구분하는 것이 중요합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 대항력 vs 우선변제권 vs 최우선변제 비교 (주택임대차보호법 §3·§3의2·§8)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">효과</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>대항력</strong></td>
                        <td className="p-3">전입신고 + 주택 인도·점유</td>
                        <td className="p-3">집주인 변경 후에도 임차권 주장 가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>우선변제권</strong></td>
                        <td className="p-3">대항력 + 확정일자</td>
                        <td className="p-3">경매 시 후순위 담보권자보다 보증금 우선 배당</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>최우선변제</strong></td>
                        <td className="p-3">우선변제권 + 보증금이 지역별 기준 이하</td>
                        <td className="p-3">선순위 근저당보다 우선 배당 (강력한 보호)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  대항력은 가장 기본적인 보호로, 전입신고만으로도 그 다음날 0시부터 발생합니다(§3). 집주인이 은행에 담보로 제공한 집을 팔거나 경매에 넘겨도, 임차인의 임차권은 유효하게 유지됩니다.
                </p>
                <p className="mt-4">
                  우선변제권은 경매·공매 시에만 의미가 있습니다(§3의2). 은행의 근저당권 같은 후순위 담보권자들이 집을 경매하려 할 때, 임차인이 선순위가 아니어야 우선변제권으로 보증금을 먼저 배당받을 수 있습니다.
                </p>
                <p className="mt-4">
                  최우선변제는 가장 강력한 보호입니다(§8). 임차인의 보증금이 지역별 기준액 이하면, 경매 시 선순위 근저당권자의 담보채권보다 먼저 배당을 받습니다. 즉 그 금액 한도에서는 건물주의 채무로 인한 손실을 거의 피할 수 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 이 세 가지 권리는 모두 사전 신청이 필수입니다. 자동으로 발생하지 않으므로, 전세 계약 직후 즉시 행동해야 합니다. 특히 우선변제권과 최우선변제는 "언제" 받았는지가 매우 중요합니다. 근저당 등기일보다 나중에 확정일자를 받으면 우선변제권을 못 받거나 보호 범위가 줄어들 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전입신고로 대항력 획득하기</h2>
                <p>
                  대항력은 가장 기본이면서도 가장 중요한 권리입니다. 전입신고 한 번으로 얻을 수 있고, 이것이 이후의 우선변제권·최우선변제의 발판이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">대항력 발생 조건 (§3)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    ① 주택의 인도(실제 이사·점유)
                    <br />
                    ② 주민등록법에 따른 전입신고 완료
                    <br />
                    → 이 두 조건을 모두 만족하면 전입신고 그 다음날 0시부터 대항력 발생
                  </p>
                </div>
                <p className="mt-4">
                  집에 들어간 후 14일 이내에 주민센터에서 전입신고를 합니다(주민등록법). 준비물은 신분증과 기존 주민등록 정보(구 주소)입니다. 신청 수수료는 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">단계별 사례: A씨의 전입신고</p>
                  <p className="text-sm text-text-secondary">
                    · 2026년 7월 1일 서울 신가아파트 전세 계약 체결 (보증금 5,000만원)
                    <br />
                    · 근저당권 등기: 2024년 1월 1일 (은행 대출 5억원)
                    <br />
                    · 7월 2일 집에 인도받고 즉시 주민센터에서 전입신고
                    <br />
                    · 7월 3일 0시부터 대항력 발생
                    <br />
                    <span className="text-xs text-text-tertiary">→ 근저당권이 2024년이고 대항력이 2026년이므로, 이후 확정일자를 받아도 우선변제권은 못 받음 (근저당이 더 먼저). 이 경우 최우선변제에 의존해야 함.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 집주인의 기존 채무(근저당 등기)의 순서는 대항력으로 영향을 받지 않습니다. 대항력은 "이사 후 집주인이 바뀌어도 임차권이 계속 유효하다"는 뜻일 뿐, 기존 담보권자들과의 우선순위를 바꾸지는 못합니다. 그 역할은 다음의 우선변제권이 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">확정일자로 우선변제권 획득하기</h2>
                <p>
                  우선변제권을 얻으려면 대항력에 "확정일자"를 더해야 합니다(§3의2). 확정일자는 임차계약서에 "언제" 공적으로 기록한다는 의미입니다. 경매 시 여러 채권자들의 순서를 정하는 증거 역할을 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">우선변제권 발생 조건 (§3의2)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    ① 대항력 (이미 확보)
                    <br />
                    ② 임차계약서에 확정일자 기입
                    <br />
                    → 우선변제권의 순위는 확정일자 기준
                  </p>
                </div>
                <p className="mt-4">
                  확정일자는 주민센터·등기소·인터넷등기소에서 받을 수 있습니다. 가장 편한 곳은 거주 지역 주민센터입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">확정일자 신청 절차 (주민센터)</p>
                  <p className="text-sm text-text-secondary">
                    1단계: 신분증 + 임대차계약서 사본 + 인감도장 준비
                    <br />
                    2단계: 주민센터 "지역개발" 또는 "민원" 부서 방문
                    <br />
                    3단계: "확정일자" 신청서 작성 (1~2분)
                    <br />
                    4단계: 임대차계약서에 담당자가 직인을 날짜와 함께 찍음
                    <br />
                    5단계: 사본 또는 원본 회수 (수수료 없음, 즉시 발급)
                  </p>
                </div>
                <p className="mt-4">
                  확정일자의 핵심은 순서입니다. 만약 건물주의 근저당이 2024년 1월 1일에 설정되었는데, 세입자의 확정일자가 2026년 7월 3일이라면, 경매 시 근저당이 우선 배당을 받습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">단계별 사례: 우선변제권의 실제 적용</p>
                  <p className="text-sm text-text-secondary">
                    시나리오: 서울 아파트 경매 → 경매대금 5억원
                    <br />
                    <br />
                    · 근저당(은행): 2023년 1월 1일 설정 → 3억원 채무
                    <br />
                    · 세입자 확정일자: 2026년 1월 1일 → 5,000만원 보증금
                    <br />
                    · 임대인 사채(사채업자): 2026년 3월 1일 설정 → 1억원
                    <br />
                    <br />
                    배당 순서 (시간 순):
                    <br />
                    1순위: 근저당(은행) → 3억원 배당 (1순위이므로 다 받음)
                    <br />
                    2순위: 세입자 확정일자 → 5,000만원 배당 (2순위이므로 다 받음)
                    <br />
                    3순위: 사채업자 → 0원 (배당금 부족)
                    <br />
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세입자는 우선변제권으로 5,000만원을 모두 회수.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 만약 세입자의 확정일자가 임대인의 사채보다 나중이었다면, 사채업자가 2순위가 되어 세입자보다 먼저 배당을 받을 수 있습니다. 따라서 전세 계약 직후 최대한 빨리 확정일자를 받는 것이 매우 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">최우선변제로 가장 강하게 보호받기</h2>
                <p>
                  최우선변제는 우선변제권보다 더 강한 보호입니다. 임차인의 보증금이 지역별 기준액 이하라면, 경매 시 선순위 근저당권자의 담보채권보다 앞서 배당을 받습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">최우선변제 발생 조건 (§8, 시행령 §10·§11)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    ① 우선변제권 (대항력 + 확정일자)
                    <br />
                    ② 임차보증금이 지역별 기준액 이하
                    <br />
                    ③ 경매신청 등기 전에 대항력·확정일자 취득
                    <br />
                    → 이 조건들을 만족하면 최우선변제액까지는 담보권자보다 우선 배당
                  </p>
                </div>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 2026년 지역별 소액임차인 최우선변제 금액 (시행령 §10·§11)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지역</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최우선변제 금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">소액임차인 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>서울특별시</strong></td>
                        <td className="p-3"><strong>5,500만원</strong></td>
                        <td className="p-3">보증금 1억 6,500만원 이하</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>과밀억제권역</strong> (인천, 경기 등)</td>
                        <td className="p-3"><strong>4,800만원</strong></td>
                        <td className="p-3">보증금 1억 4,400만원 이하</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>광역시</strong></td>
                        <td className="p-3"><strong>2,800만원</strong></td>
                        <td className="p-3">보증금 8,400만원 이하</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>그 외 지역</strong></td>
                        <td className="p-3"><strong>2,500만원</strong></td>
                        <td className="p-3">보증금 7,500만원 이하</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs text-text-tertiary">
                    * 위 금액은 주택임대차보호법 시행령 §10·§11의 현행 기준이며, 소액임차인 기준·최우선변제액은 시행령 개정으로 바뀔 수 있습니다. 계약 시점의 정확한 기준은 법제처 국가법령정보센터(law.go.kr) 또는 대한법률구조공단에서 반드시 확인하세요.
                  </p>
                </div>
                <p className="mt-4">
                  예를 들어 서울에서 보증금 5,000만원인 전세를 계약했다면, 최우선변제 5,500만원 기준보다 아래이므로 최우선변제 적용 대상입니다. 경매 시 은행의 근저당권보다도 먼저 5,000만원을 배당받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">단계별 사례: 최우선변제의 강력함</p>
                  <p className="text-sm text-text-secondary">
                    시나리오: 서울 아파트 경매 → 경매대금 5억원
                    <br />
                    <br />
                    · 근저당(은행): 2023년 1월 1일 설정 → 4억원 채무
                    <br />
                    · 세입자 보증금 + 확정일자: 2026년 1월 1일 → 5,000만원 (최우선변제 기준 이하)
                    <br />
                    <br />
                    배당 순서:
                    <br />
                    1순위: 세입자 최우선변제 → <strong>5,000만원 배당 (강력한 우선순위!)</strong>
                    <br />
                    2순위: 근저당(은행) → 4억원 배당 (나머지 돈)
                    <br />
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 은행 담보권자도 우선 배당할 수 없음. 세입자는 보증금 전액을 안전하게 회수.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 최우선변제도 제한이 있습니다. ① 최우선변제 금액이 주택가액의 1/2을 초과하면, 주택가액의 1/2까지만 보호됩니다. ② 보증금이 기준액보다 크면 초과분은 우선변제권으로만 보호되고, 그마저도 후순위 담보권자 영향을 받습니다. 따라서 "지역별 기준액 이상의 전세는 위험하다"는 통설이 나옵니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실무 Q&A: 전세계약 체크리스트</h2>
                <p>
                  전세계약을 체결하기 전과 직후 반드시 확인해야 할 항목들입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계약 체결 전 (등기부등본 확인)</p>
                  <p className="text-sm text-text-secondary">
                    ☐ 등기부등본에서 근저당권의 개수·금액·설정일 확인
                    <br />
                    ☐ 가압류·압류·경매신청 여부 확인 (있으면 위험)
                    <br />
                    ☐ 지분소유 또는 공유 여부 확인
                    <br />
                    ☐ 임대인의 신용등급·연체 이력 확인
                    <br />
                    ☐ 시세와의 괴리 정도 파악 (시세 대비 80% 이하면 적신호)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계약 직후 (72시간 안에 완료할 행동)</p>
                  <p className="text-sm text-text-secondary">
                    ☐ 24시간 내: 이사 후 주민센터 전입신고 (대항력 확보)
                    <br />
                    ☐ 24~48시간 이내: 주민센터 또는 등기소에서 확정일자 신청 (우선변제권 확보)
                    <br />
                    ☐ 보증금보장보험 가입 여부 확인 (최우선변제 기준액 초과 시 필수)
                    <br />
                    ☐ 임대차계약서 사본 여러 장 보관 (향후 증명 필요)
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 이 모든 과정은 '세입자의 주의'에만 의존합니다. 부동산 중개업소나 임대인은 이런 법률 조언을 제공할 수 없습니다. 정부는 세입자 보호를 위해 정보 지원·보증금 안전장치 등을 제공하고 있으니, 한국주택금융공사(www.hf.go.kr)나 지역 주택관리사무소에 문의하세요.
                </p>
              </section>

              <AdSlot slot="guide-lease-priority-right-fixed-date-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">전세사기 피해 시 대응 방법</h2>
                <p>
                  불행히 전세사기를 당했거나, 우선변제권 없이 보증금을 손실했다면, 다음 대응이 가능합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>보증금 반환 청구 소송:</strong> 임대인을 상대로 보증금 반환 청구 소송을 제기할 수 있습니다. 다만 임대인이 무자력 상태이면 판결을 받아도 돈을 받기 어렵습니다.
                  </li>
                  <li>
                    <strong>보증금 보장보험 청구:</strong> 전세 계약 시 미리 보증금 보장보험에 가입했다면, 보험사에 보험금을 청구할 수 있습니다. 서울특별시 등 일부 지자체는 피해자 전원에게 보험 가입을 권장하고 있습니다.
                  </li>
                  <li>
                    <strong>특별 대출 및 지원:</strong> 정부는 "깡통전세" 피해자를 위해 특별 대출·세제 지원·임시 주거지원 등을 시행 중입니다. 한국주택금융공사(www.hf.go.kr)에서 대상자 확인 및 신청이 가능합니다.
                  </li>
                  <li>
                    <strong>형사 고소:</strong> 사기·기망으로 의심되면 경찰에 고소할 수 있습니다. 특히 임대인이 애초부터 돌려줄 의도가 없었다면 사기죄로 벌할 수 있습니다.
                  </li>
                </ul>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">선제적 예방: 전세 계약 시 체크 4단계</h2>
                <p>
                  가장 좋은 보호는 처음부터 위험한 계약을 피하는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1단계: 등기부등본 분석</p>
                  <p className="text-sm text-text-secondary">
                    "국가법령정보센터" 또는 "인터넷등기소"에서 해당 건물의 등기부등본을 다운로드해 확인합니다. 근저당의 개수와 금액을 보고, 자신의 보증금이 그 어디에 위치할지 판단해야 합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2단계: 시세 대비 보증금 비율 확인</p>
                  <p className="text-sm text-text-secondary">
                    시세보다 훨씬 낮은 전세는 위험합니다. 시세 대비 80% 이하의 전세는 건물주가 이미 자산을 빼낸 상태일 수 있습니다. 공인중개소 또는 부동산 정보사이트(KB·국민·다방)에서 최근 거래가를 확인하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3단계: 임대인의 신용·재산 상태 파악</p>
                  <p className="text-sm text-text-secondary">
                    가능하면 임대인의 신용평점·연체 이력·소송 여부를 확인합니다. 신용조회회사(NICE·코레일)는 개인에게 정보를 주지 않지만, 부동산 중개업소가 임대인을 통해 확인할 수 있습니다. 너무 많은 전세·월세 물건을 보유한 임대인도 주의해야 합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">4단계: 보증금 보장보험 가입</p>
                  <p className="text-sm text-text-secondary">
                    최우선변제 기준액(서울 5,500만원)을 초과하거나, 위험 신호가 보인다면 반드시 보증금 보장보험에 가입합니다. 월 보험료는 보증금의 0.5~1% 수준으로, 나중에 손실을 입을 위험에 비하면 매우 저렴합니다.
                  </p>
                </div>
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
                    <p className="mt-1 text-sm text-text-secondary">전세사기 예방의 모든 것을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-loan-limit-interest-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세자금대출 한도 & 금리 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세보증금 부족분을 채우는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/rent-increase-5-percent-cap-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">월세 인상 5% 상한 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">갱신 때마다 임대인과의 분쟁 예방.</p>
                  </Link>
                  <Link
                    href="/guide/rent-conversion-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환율 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 월세로 바꿀 때의 공식.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">실시간으로 월세 예상액 계산.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">취득세·양도세·재산세·중개수수료.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률 조언이 아닙니다. 실제 전세 계약 판단, 등기부등본 해석, 보증금 보장 여부 판단은 부동산 전문가(공인중개사·법무사)나 법률 전문가(변호사)와 상담하여 진행하세요. 본 콘텐츠는 2026-07-09를 기준으로 작성되었으며, 주택임대차보호법 개정 시 즉시 업데이트됩니다. 확정일자·전입신고·우선변제권의 정확한 기준은 법조항 <strong>주택임대차보호법 §3(대항력), §3의2(우선변제권), §8(최우선변제)</strong>과 <strong>시행령 §10·§11(지역별 기준액)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료:</strong>{' '}
                  <a href="https://law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hf.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국주택금융공사 (보증금 보장보험·긴급 지원)</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보 (주택임대차)</a>.
                </p>
              </section>

              <ShareButtons
                title="확정일자·전입신고 우선변제권 2026 가이드"
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
