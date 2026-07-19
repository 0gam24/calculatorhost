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

const URL = 'https://calculatorhost.com/guide/jeonse-guarantee-insurance-hug-2026/';
const DATE_PUBLISHED = '2026-07-20';
const DATE_MODIFIED = '2026-07-20';

export const metadata: Metadata = {
  title: '전세보증금 반환보증 2026, HUG 가입조건과 보증료 신청방법',
  description:
    '전세보증금을 떼일까 걱정된다면 HUG 전세보증금 반환보증으로 대비할 수 있습니다. 가입 조건(보증금 한도·부채비율 90%), 보증료, 신청 기한, HUG·HF·SGI 차이를 임차인 눈높이로 정리했습니다.',
  keywords: [
    '전세보증금 반환보증',
    'HUG 전세보증보험',
    '전세보증 가입조건',
    '전세보증금 반환보증 보증료',
    '안심전세 앱',
    '주택임대차보호법 3조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전세보증금 반환보증 2026, HUG 가입조건과 보증료 신청방법' }],
    title: '전세보증금 반환보증 2026: HUG 가입조건, 보증료, 안심전세 앱 신청 총정리',
    description: '임대인이 보증금을 돌려주지 못할 때 HUG가 대신 지급하는 전세보증금 반환보증. 가입 조건, 보증료, HUG·HF·SGI 비교, 신청 절차까지 임차인 관점에서 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전세보증금 반환보증 2026: HUG 가입조건과 보증료 신청방법',
    description: 'HUG 전세보증금 반환보증의 가입 조건, 보증료, 신청 절차와 HUG·HF·SGI 비교. 임차인 필독.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전세보증금 반환보증이 정확히 무엇인가요?',
    answer:
      '임대인이 계약 만료 후에도 전세보증금을 돌려주지 못할 때 보증기관이 임차인에게 대신 지급하는 상품입니다. HUG(주택도시보증공사) 같은 공적 보증기관이 임차인에게 우선 지급하고, 이후 임대인에게 구상권을 행사합니다. 주택도시기금법에 근거한 상품이며, 주택임대차보호법 §3(대항력)·§3의2(우선변제권)에 따른 임차인 보호 장치와 함께 이중 안전망을 만들어 줍니다.',
  },
  {
    question: 'HUG 가입 조건은 어떻게 되나요?',
    answer:
      '보증금이 수도권 7억원 이하, 비수도권 5억원 이하일 때 신청할 수 있습니다(HUG 공고 기준, 시기별 변동). 또한 선순위채권과 전세보증금 합계가 주택가격의 90% 이내여야 하며, 전입신고·확정일자·실제 거주가 완료되어 있어야 합니다. 세부 요건은 신청 시점의 HUG 최신 공고를 반드시 확인하세요.',
  },
  {
    question: '어떤 주택은 가입할 수 없나요?',
    answer:
      '근린생활시설 등 비주거용으로 등록된 건물은 원칙적으로 가입이 어렵습니다. 아파트·연립다세대·단독다가구·주거용 오피스텔·노인복지주택은 가입 가능하지만, 등기부등본이나 건축물대장상 용도가 근생·상가로 되어 있으면 실제로 주거하고 있어도 대상에서 제외될 수 있습니다.',
  },
  {
    question: '신규 계약이면 언제까지 신청해야 하나요?',
    answer:
      '전세계약 기간의 1/2이 경과하기 전에 신청해야 합니다. 예를 들어 2년 계약이라면 계약 시작일부터 1년이 되기 전까지 접수를 마쳐야 하며, 이 기한을 넘기면 신규 가입이 어렵습니다. 갱신계약은 별도 기한 규정이 적용되므로 HUG 안내 문서를 확인하는 것이 안전합니다.',
  },
  {
    question: '보증료는 대략 얼마 정도인가요?',
    answer:
      '보증료는 "보증금 × 보증료율 × 보증기간(연 단위)"로 계산되며, 대체로 연 0.1%대에서 결정됩니다. 정확한 요율은 주택유형과 부채비율에 따라 달라지므로 HUG 최신 공고를 확인해야 하며, 청년·신혼부부·저소득층 대상 보증료 할인과 모바일(안심전세 앱) 신청 3% 할인이 함께 적용되는 경우가 많습니다.',
  },
  {
    question: 'HUG와 HF, SGI서울보증은 무엇이 다른가요?',
    answer:
      'HUG는 국토교통부 산하 주택도시보증공사, HF는 한국주택금융공사, SGI서울보증은 민간 보증사입니다. 대상 주택 유형, 보증금 한도, 요율, 심사 기준이 각각 다르기 때문에 자신의 주택과 계약 조건에 맞는 기관을 비교해 선택해야 합니다. 특정 조건에서는 한 기관만 가입 가능한 경우도 있습니다.',
  },
  {
    question: '안심전세 앱은 어떻게 사용하나요?',
    answer:
      'HUG가 운영하는 안심전세 모바일 앱에서 회원가입 후 전세보증 신청 메뉴를 통해 접수할 수 있습니다. 계약서·신분증·주민등록등본 등 서류를 사진으로 업로드하고 보증료를 결제하면 접수가 완료되며, 모바일 신청 시 보증료 3% 할인이 적용되는 이벤트가 상시 운영되고 있습니다.',
  },
  {
    question: '보증사고가 나면 바로 돈을 돌려받나요?',
    answer:
      '바로는 아니고 이행청구 절차와 서류 심사를 거쳐야 합니다. 임대인이 계약 종료 후에도 보증금을 돌려주지 않으면 내용증명 발송, 이행청구서 제출, 거주 확인 등을 완료한 뒤 HUG가 임차인에게 대위변제합니다. 심사에 통상 1~2개월이 소요될 수 있으니 계약 종료 예정일 전부터 서류를 준비해 두는 것이 좋습니다.',
  },
];

export default function JeonseGuaranteeInsuranceHug2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전세보증금 반환보증 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전세보증금 반환보증 2026, HUG 가입조건과 보증료 신청방법',
    description:
      '임대인이 보증금을 돌려주지 못할 때 HUG가 대신 지급하는 전세보증금 반환보증. 가입 조건(보증금 한도·부채비율 90%), 보증료, 신청 기한, HUG·HF·SGI 비교, 신청 절차까지 임차인 눈높이로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전세보증금 반환보증', 'HUG', '안심전세', '부채비율 90%', '주택임대차보호법 3조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전세보증금 반환보증 2026, HUG 가입조건과 보증료 신청방법',
    description:
      'HUG 전세보증금 반환보증의 가입 조건, 보증료, 신청 기한, HUG·HF·SGI 비교, 안심전세 앱 신청 절차를 임차인 관점에서 정리한 가이드.',
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
                    { name: '전세보증금 반환보증 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임차인 · 8분 읽기 · 2026-07-20</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전세보증금 반환보증 2026
                  <br />
                  <span className="text-2xl text-text-secondary">보증금 떼일 걱정 더는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세계약 만료 후에도 보증금을 돌려받지 못하는 사고가 매년 반복됩니다. HUG(주택도시보증공사) 전세보증금 반환보증은 이런 상황을 대비해 임차인이 미리 가입해 두는 보험형 상품으로, 임대인이 반환 의무를 지키지 못하면 보증기관이 대신 지급해 줍니다. 이 가이드는 가입 조건, 보증료, 신청 기한, HUG·HF·SGI 비교, 안심전세 앱 신청 절차까지 임차인 관점에서 하나씩 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-jeonse-guarantee-insurance-hug-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전세보증금 반환보증이란 무엇인가요?</h2>
                <p>
                  전세보증금 반환보증은 임대인이 계약 종료 후 보증금을 돌려주지 못할 때 보증기관이 임차인에게 대신 지급하는 상품입니다. 주택도시기금법에 근거해 HUG(주택도시보증공사)가 대표적으로 운영하며, 지급 후에는 보증기관이 임대인에게 구상권을 행사합니다. 임차인 입장에서는 계약 만료 시 보증금 회수 불확실성을 크게 줄일 수 있는 장치입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기본 구조 한눈에 보기</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 계약 체결 후 임차인이 보증기관에 보증료 납부하고 가입
                    <br />
                    · 임대인이 계약 종료 시점에 보증금 미반환
                    <br />
                    · 임차인이 보증기관에 이행청구 → 심사 후 <strong>대위변제</strong>
                    <br />
                    · 보증기관이 임대인에게 구상권 행사 (임차인은 여기까지 관여 불필요)
                  </p>
                </div>
                <p className="mt-4">
                  임차인의 기본 권리인 대항력(주택임대차보호법 §3)과 우선변제권(§3의2)은 임대인이 파산하거나 경매가 진행될 때 배당 순위를 확보해 주는 장치입니다. 반환보증은 여기에 더해, 임대인이 단순히 자금 사정으로 보증금을 늦게 돌려주는 경우까지 커버해 주는 이중 안전망 역할을 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 반환보증은 만능이 아닙니다. 가입 조건을 충족해야 하고, 보증사고 발생 시에도 서류 심사·현장 확인 등 절차가 필요합니다. 무조건 즉시 지급되는 것은 아니라는 점을 미리 이해해 두는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가입 조건은 어떻게 되나요?</h2>
                <p>
                  HUG 반환보증에 가입하려면 보증금 규모, 부채비율, 임차인의 법적 지위 세 가지 조건을 모두 충족해야 합니다. 결론부터 말하면 수도권 7억원 이하·비수도권 5억원 이하 보증금, 부채비율 90% 이하, 전입신고와 확정일자·실제 거주가 핵심입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. HUG 전세보증금 반환보증 주요 가입 조건 (HUG 공고 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조건 항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">보증금 한도</td>
                        <td className="p-3"><strong>수도권 7억원 이하 / 비수도권 5억원 이하</strong></td>
                        <td className="p-3">월세 있는 경우 환산 금액 기준</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부채비율</td>
                        <td className="p-3"><strong>선순위채권 + 전세보증금 ≒ 주택가격의 90% 이내</strong></td>
                        <td className="p-3">등기부등본 근저당·전세권 확인 필수</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임차인 지위</td>
                        <td className="p-3">전입신고 + 확정일자 + 실제 거주</td>
                        <td className="p-3">주택임대차보호법 §3·§3의2</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">계약 형태</td>
                        <td className="p-3">전세 또는 반전세(월세 포함)</td>
                        <td className="p-3">일반 월세는 대상 아님</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  부채비율은 "선순위채권 + 전세보증금"을 주택가격(공시가격 또는 감정가 등 HUG 산정 기준)으로 나눈 값입니다. 이 값이 90%를 초과하면 가입이 거절될 수 있으므로, 계약 전 등기부등본으로 근저당 규모를 반드시 확인해야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 위 기준은 HUG의 표준 공고에 근거한 요약입니다. 청년·신혼부부 특례, 지방 소도시 우대 등 상품별 세부 조건이 다를 수 있으므로, 실제 가입 전에는 반드시 HUG 홈페이지 또는 안심전세 앱에서 최신 공고를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 집이 가입 가능한가요?</h2>
                <p>
                  가능한 주택 유형은 넓지만, 등기부등본·건축물대장상 용도가 주거용으로 명시되어 있어야 합니다. 실제 사용 목적이 아니라 서류상 용도가 기준이라는 점이 함정입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>가입 가능:</strong> 아파트, 연립다세대주택, 단독·다가구주택, 주거용 오피스텔, 노인복지주택.
                  </li>
                  <li>
                    <strong>가입 불가 또는 제한:</strong> 근린생활시설(근생빌라·상가주택), 무허가·불법 건축물, 등기부상 대지권 미등재 물건, 신탁등기 상태의 특수 물건.
                  </li>
                  <li>
                    <strong>주거용 오피스텔:</strong> 임대차 계약서에 "주거용"이 명시되고 실제 주거해야 하며, 사업자등록이 걸려 있으면 심사에서 제외될 수 있습니다.
                  </li>
                  <li>
                    <strong>단독·다가구 주택:</strong> 다른 세입자의 선순위 보증금까지 합산해 부채비율을 계산하기 때문에, 같은 건물 내 다른 임차인의 계약 내역을 사전에 확인하는 것이 안전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 서류상 근생인데 실거주하는 이른바 "근생빌라"는 최근 몇 년간 사고가 반복되며 특히 심사가 엄격해졌습니다. 시세보다 저렴한 매물은 이런 등기 문제인 경우가 많으니, 계약 전 반드시 건축물대장을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 신청해야 하나요?</h2>
                <p>
                  신규 전세계약이라면 계약기간의 1/2이 경과하기 전까지 신청해야 합니다. 즉, 계약 시작일로부터 절반을 넘기면 신규 가입이 거절될 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기한 계산 예시</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 2년 전세계약, 시작일 2026-03-01
                    <br />
                    · 계약기간의 1/2 경과 시점: 2027-03-01
                    <br />
                    · 신규 가입 신청 마감: <strong>2027-02-28 이전</strong>
                    <br />
                    · 이 시점을 넘기면 신규 신청 불가, 갱신 시점까지 대기해야 하는 경우가 많음
                  </p>
                </div>
                <p className="mt-4">
                  갱신계약은 별도 규정이 적용됩니다. 계약이 묵시적 갱신되었거나 신규 계약서를 다시 쓰지 않은 경우, HUG가 정한 갱신용 접수 기간 내에 신청해야 하므로 만기 몇 개월 전부터 준비하는 것이 안전합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 기한을 지켰다고 반드시 승인되는 것은 아닙니다. 부채비율 초과나 서류 미비 등으로 반려될 수 있으므로, 여유 있게 미리 신청하고 보완 요청에 대응할 시간을 확보하는 것이 현실적입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보증료는 얼마인가요?</h2>
                <p>
                  보증료는 "보증금 × 보증료율 × 보증기간(연 단위)" 공식으로 계산됩니다. 정확한 요율은 주택 유형과 부채비율에 따라 차등 적용되며, 대체로 연 0.1%대에서 결정되는 것으로 알려져 있습니다. 세부 요율은 HUG 최신 공고를 반드시 확인해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 보증금 3억원 아파트, 2년 계약 (요율 가정치)</p>
                  <p className="text-sm text-text-secondary">
                    · 보증금: 3억원
                    <br />
                    · 예시 요율: 연 0.128% (실제 요율은 HUG 공고 기준)
                    <br />
                    · 예시 보증료: 3억원 × 0.128% × 2년 ≒ <strong>76.8만원</strong>
                    <br />
                    · 모바일(안심전세 앱) 신청 시 3% 할인 적용 가능
                    <br />
                    <span className="text-xs text-text-tertiary">※ 실제 청구액은 신청 시점 요율과 주택유형·부채비율별 차등에 따라 다르며, 위 숫자는 계산 방식 이해용 예시입니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다음 대상자는 보증료 할인 혜택을 받을 수 있으니 신청 시 반드시 확인하세요.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>청년 임차인(연령 기준은 공고 확인)</li>
                  <li>신혼부부(혼인신고 기간·소득 기준 존재)</li>
                  <li>저소득층·다자녀 가구 등 정책 대상</li>
                  <li>안심전세 앱 등 모바일 신청자(추가 3% 할인)</li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 요율과 할인율은 정책 변화에 따라 자주 조정됩니다. 계약 시점에 알려진 요율과 실제 접수 시점의 요율이 다를 수 있으니, 예산 계산은 여유 있게 잡아두는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-jeonse-guarantee-insurance-hug-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">HUG·HF·SGI 무엇이 다른가요?</h2>
                <p>
                  전세보증금 반환을 다루는 대표 기관은 세 곳입니다. HUG는 공적 보증기관 중 가장 폭넓은 상품군을, HF는 은행 전세대출과 결합된 지킴보증을, SGI서울보증은 민간 보증사로서 유연한 조건을 제공합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 전세보증금 반환보증 기관 비교(개요, 상세는 각 기관 공고 확인)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">HUG</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">HF</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">SGI서울보증</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소속</td>
                        <td className="p-3">주택도시보증공사(공적)</td>
                        <td className="p-3">한국주택금융공사(공적)</td>
                        <td className="p-3">민간 보증사</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대표 상품</td>
                        <td className="p-3">전세보증금 반환보증</td>
                        <td className="p-3">전세지킴보증(전세대출 연계형 중심)</td>
                        <td className="p-3">전세금 보장 신용보험</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">보증금 한도</td>
                        <td className="p-3">수도권 7억, 비수도권 5억 이하(공고 기준)</td>
                        <td className="p-3">상품별 상이</td>
                        <td className="p-3">상대적으로 유연, 고액 커버 가능성</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신청 채널</td>
                        <td className="p-3">안심전세 앱·페이·지사·위탁은행</td>
                        <td className="p-3">주로 은행 창구(대출 연계)</td>
                        <td className="p-3">SGI 지점·연계 채널</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주요 강점</td>
                        <td className="p-3">공적 신뢰도, 폭넓은 주택유형 지원</td>
                        <td className="p-3">전세대출과 원스톱 처리</td>
                        <td className="p-3">공적 기준 초과 케이스도 검토 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  기관 선택은 단순히 요율만 비교하기보다는 자신의 계약 조건(보증금 규모, 주택유형, 부채비율, 전세대출 여부)에 맞는지 확인하는 것이 우선입니다. 요율은 공고에 따라 자주 변경되고, 특정 조건에서는 특정 기관만 승인해 주기 때문입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 어느 기관이든 부채비율이 지나치게 높거나 근생·불법 건축물인 경우 가입이 어렵습니다. 문제가 있다면 세 기관 어디도 해결책이 되지 못하므로, 계약 전 등기부등본·건축물대장 확인이 가장 근본적인 방어선입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 신청하나요?</h2>
                <p>
                  HUG 반환보증 신청 채널은 크게 네 가지입니다. 대부분의 임차인은 모바일 앱을 이용하며, 서류가 복잡하거나 상담이 필요하면 지사 방문을 선택합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">채널 1. 안심전세 앱(모바일)</p>
                  <p className="text-sm text-text-secondary">
                    HUG가 운영하는 공식 앱으로 회원가입 후 전세보증 메뉴에서 접수합니다. 계약서·신분증·주민등록등본 등을 사진으로 업로드하고, 시세 조회부터 보증료 결제까지 앱 안에서 마무리됩니다. 모바일 신청 시 보증료 3% 할인이 적용되는 이벤트가 상시 운영되고 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">채널 2. 네이버페이·카카오페이·토스</p>
                  <p className="text-sm text-text-secondary">
                    HUG와 제휴한 간편결제·핀테크 앱의 "전세보증" 메뉴에서 신청할 수 있습니다. 사용자에게 익숙한 UI로 서류 촬영과 결제가 이루어지며, 접수 후 심사와 승인은 HUG가 담당합니다. 모바일 할인 혜택은 앱별 이벤트에 따라 달라집니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">채널 3. HUG 지사 방문</p>
                  <p className="text-sm text-text-secondary">
                    다가구·근생 오피스텔 등 심사가 복잡하거나 서류 준비가 까다로운 경우, 지역별 HUG 지사를 방문해 상담과 함께 접수하는 것이 안전합니다. 사전 예약 후 방문하면 대기 시간을 줄일 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">채널 4. 위탁은행 창구</p>
                  <p className="text-sm text-text-secondary">
                    전세자금대출을 실행하는 은행 창구에서 대출과 반환보증을 함께 안내받을 수 있습니다. 대출 실행과 보증 가입 시점이 맞물리는 신혼부부 특례 등에서 특히 유용합니다.
                  </p>
                </div>
                <p className="mt-4">
                  일반적인 접수 절차는 다음 순서로 진행됩니다.
                </p>
                <ul className="space-y-2 ml-6 list-decimal text-text-secondary">
                  <li>계약서 작성 후 전입신고·확정일자 완료</li>
                  <li>등기부등본·건축물대장·주민등록등본·신분증·계약서 준비</li>
                  <li>안심전세 앱·페이·지사 중 선호 채널에서 접수</li>
                  <li>HUG 심사(부채비율·주택유형·서류 검토)</li>
                  <li>승인 후 보증료 결제 → 보증서 발급</li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 승인이 즉시 나는 것은 아닙니다. 서류 보완 요청이 오는 경우 접수부터 보증서 발급까지 2~4주가 걸릴 수 있으므로, 계약기간 1/2 마감일에 임박해 신청하는 것은 피하는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세를 상호 환산해 실질 부담을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 안전하게 지키기</div>
                    <p className="mt-1 text-sm text-text-secondary">계약 전 확인해야 할 등기부·부채비율·안전장치 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">확정일자·전입신고 우선변제권</div>
                    <p className="mt-1 text-sm text-text-secondary">주택임대차보호법 §3·§3의2 기반 임차인 보호 장치 이해.</p>
                  </Link>
                  <Link
                    href="/guide/small-tenant-priority-repayment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소액임차인 최우선변제</div>
                    <p className="mt-1 text-sm text-text-secondary">경매 상황에서도 일정 금액을 최우선으로 회수하는 제도.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-loan-limit-interest-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세자금대출 한도·이자</div>
                    <p className="mt-1 text-sm text-text-secondary">DSR·소득 기준으로 본 실제 대출 가능 금액과 월이자.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">전세·매매·세금·대출 관련 가이드 한 곳에서 보기.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률·금융 자문이 아닙니다. 실제 가입 가능 여부, 보증금 한도, 부채비율 판정, 보증료율, 할인율은 신청 시점의 HUG 최신 공고와 심사 결과에 따라 달라질 수 있으므로 반드시 HUG 홈페이지·안심전세 앱 또는 위탁은행 창구에서 확인하세요. 본 콘텐츠는 2026-07-20 기준이며, 관련 법령·요율 개정 시 즉시 업데이트됩니다. 인용 근거는 <strong>주택도시기금법(HUG 설립·보증 업무), 주택임대차보호법 §3(대항력)·§3의2(우선변제권)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.khug.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">주택도시보증공사(HUG)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons
                title="전세보증금 반환보증 2026, HUG 가입조건과 보증료 신청방법"
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
