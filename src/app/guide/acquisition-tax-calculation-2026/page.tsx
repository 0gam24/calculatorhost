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

const URL = 'https://calculatorhost.com/guide/acquisition-tax-calculation-2026/';
const DATE_PUBLISHED = '2026-06-21';
const DATE_MODIFIED = '2026-06-21';

export const metadata: Metadata = {
  title: '취득세 계산법 2026 | 주택 구입 세율·중과·농특세 완벽 정리 | calculatorhost',
  description:
    '주택 구입 시 내야 할 취득세를 정확히 계산하는 방법. 구입가별 세율(1.0~3.0%), 2주택·3주택 중과세(8~12%), 85㎡ 초과 농특세, 지방교육세 완벽 가이드. 지방세법 §13·§13의2.',
  keywords: [
    '취득세 계산',
    '취득세율 2026',
    '주택 취득세',
    '취득세 중과',
    '지방세법 13조',
    '취득세 농특세',
    '지방교육세',
    '생애최초 감면',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '취득세 계산법 2026 | 주택 구입 세율·중과·농특세 완벽 정리 | calculatorhost' }],
    title: '취득세 계산법 2026',
    description: '주택 구입 시 필요한 취득세를 단계별로 계산하는 완벽 가이드.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '취득세 6억 이상 9억 이하는 정확히 몇 퍼센트인가요?',
    answer:
      '6억~9억 구간은 구입가에 따라 1~3% 사이에서 누진 적용됩니다. 정확한 세율 계산은 지방자치단체별로 조례에 따라 달라질 수 있으므로, 정확한 세율은 취득세 계산기에서 확인하거나 지자체 세무과에 문의하세요.',
  },
  {
    question: '조정지역에서 2주택 구입 시 취득세가 얼마나 늘어나나요?',
    answer:
      '조정지역에서 2주택 이상 소유 시 취득세는 기본 세율에서 8%로 적용됩니다(지방세법 §13의2). 예를 들어 일반지역 1주택 5억 구입 시 기본 1% = 500만원이지만, 조정지역 2주택이면 8% = 4,000만원으로 대폭 증가합니다.',
  },
  {
    question: '85㎡를 초과하면 농어촌특별세가 추가되나요?',
    answer:
      '네. 85㎡를 초과하는 주택은 취득세 위에 농어촌특별세(농특세) 0.2%가 추가됩니다(농어촌특별세법). 예를 들어 5억 구입 시 취득세 500만원 + 농특세 100만원 = 총 600만원이 됩니다.',
  },
  {
    question: '지방교육세는 별도 계산인가요?',
    answer:
      '지방교육세는 취득세액의 10%입니다(지방세법 §265). 취득세 500만원이면 지방교육세 50만원을 추가로 내게 됩니다. 총 납부액 = 취득세 + 지방교육세(+ 농특세)이므로 모두 합산하여 계산하세요.',
  },
  {
    question: '생애최초 주택 구입 감면을 받을 수 있나요?',
    answer:
      '생애최초 무주택자 감면이 있습니다(지방세특례제한법 §36의3). 다만 주택가액 한도·요건(혼인 여부, 소득 기준 폐지 등)이 있으며, 지자체마다 적용 기준이 다르므로 해당 지역 세무과에 직접 문의하세요.',
  },
  {
    question: '전세금·보증금도 취득세 계산에 포함되나요?',
    answer:
      '취득세는 매매가에만 적용됩니다. 전세나 보증금 계약(임차)은 취득세 대상이 아닙니다. 다만 전세금을 월세로 환산하여 임대료로 보자는 계획이면 별도 세무 상담이 필요합니다.',
  },
  {
    question: '공급가액과 실제 거래가가 다르면 어느 것을 기준으로 하나요?',
    answer:
      '취득세는 실제 거래가를 기준으로 계산합니다. 부동산 거래계약서의 실제 매매금액이 취득세의 과세표준입니다. 공시가격과 다르더라도 계약서 금액으로 신고하며, 국세청이 저가 거래 의심 시 재평가할 수 있습니다.',
  },
];

export default function AcquisitionTaxCalculation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '취득세 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '취득세 계산법 2026 (주택 구입 세율·중과·농특세)',
    description:
      '주택 구입 시 내야 할 취득세를 정확히 계산하는 방법. 세율 구간, 중과세, 농특세, 지방교육세 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['취득세', '주택', '세율', '중과세', '계산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '취득세 계산법 2026',
    description:
      '주택 구입 시 필요한 취득세를 정확하게 계산하는 완벽 가이드. 세율, 중과세, 농특세, 교육세.',
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
                    { name: '취득세 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 거래자 · 12분 읽기 · 2026-06-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  취득세 계산법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 주택 구입 시 내야 할 세금 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택을 구입할 때 내야 할 취득세는 구입가, 주택 개수, 지역에 따라 크게 달라집니다. 기본 세율은 1.0~3.0%지만,
                  조정지역에서 2주택 이상 구매 시에는 8~12%까지 올라갑니다. 이 가이드는 당신이 내야 할 정확한 취득세를
                  단계별로 계산하는 방법을 체계적으로 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-acq-tax-top" format="horizontal" />

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">취득세란?</h2>
                <p data-speakable>
                  <strong>취득세는 부동산(주택, 건물, 토지)을 구입할 때 구매자가 내는 세금입니다.</strong> 지방세법 §13·§13의2에 따라
                  구입가의 일정 비율로 계산되며, 주택의 개수, 위치(조정지역 여부), 크기(85㎡ 초과 여부)에 따라 세율이 달라집니다.
                  취득세 = 구입가 × 세율 + 지방교육세 + (85㎡ 초과 시 농특세)
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-xs text-text-secondary text-left">2026년 주택 취득세 기본 세율표 (지방세법 §13)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="text-left p-2 font-semibold" scope="col">상황</th>
                        <th className="text-left p-2 font-semibold" scope="col">세율</th>
                        <th className="text-left p-2 font-semibold" scope="col">법적 근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-2">6억원 이하 (1주택)</td>
                        <td className="p-2"><strong>1.0%</strong></td>
                        <td className="p-2">지방세법 §13</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-2">6억~9억원 (1주택)</td>
                        <td className="p-2">1~3% 누진</td>
                        <td className="p-2">지방세법 §11</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-2">9억원 초과 (1주택)</td>
                        <td className="p-2"><strong>3.0%</strong></td>
                        <td className="p-2">지방세법 §11</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-2">조정지역 2주택</td>
                        <td className="p-2"><strong>8%</strong></td>
                        <td className="p-2">지방세법 §13의2</td>
                      </tr>
                      <tr>
                        <td className="p-2">조정지역 3주택 이상</td>
                        <td className="p-2"><strong>12%</strong></td>
                        <td className="p-2">지방세법 §13의2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-bg-card p-3 rounded text-sm">
                  <p className="font-semibold text-text-primary">TL;DR</p>
                  <p className="mt-1 text-text-secondary">
                    주택 구입 1채 6억원 이하 = 취득세 1.0% 기본. 조정지역 2주택 = 8% 중과. 추가로 지방교육세(취득세의 10%) 및 85㎡ 초과 시 농특세(0.2%) 필수 계산.
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">1단계: 기본 세율 확인 — 구입가로 세율 결정</h2>
                <p data-speakable>
                  취득세는 <strong>구입가(실제 거래계약서 금액)</strong>를 기준으로 계산합니다. 공시가격이나 감정가가 아닌, 당신이 실제로
                  지불한 금액입니다. 구입가에 따라 다음과 같이 세율이 결정됩니다(지방세법 §13, §11):
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>6억원 이하</strong>: 1.0% 고정세율
                  </li>
                  <li>
                    <strong>6억~9억원</strong>: 1~3% 사이 누진 적용 (정확 세율은 취득세 계산기 또는 지자체 세무과 문의)
                  </li>
                  <li>
                    <strong>9억원 초과</strong>: 3.0% 고정세율
                  </li>
                </ul>
                <p className="mt-4">
                  <strong>다만,</strong> 위 세율은 일반지역에서 1주택 구입 시입니다. 조정지역이거나 2주택 이상 소유 중이면 세율이 대폭
                  높아집니다(다음 단계 참조).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary">예시 1: 5억원 구입</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    구입가: 5억원 (6억 이하 구간)
                    <br />
                    기본 세율: 1.0%
                    <br />
                    <strong>취득세 = 5억 × 1.0% = 500만원</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">2단계: 중과세 여부 판정 — 조정지역 + 다주택</h2>
                <p data-speakable>
                  같은 구입가라도 <strong>조정지역 여부</strong>와 <strong>현재 보유 주택 개수</strong>에 따라 세율이 급격히 오른다는 점을 주의해야
                  합니다(지방세법 §13의2). 조정지역에서 2주택 이상을 소유하면 중과세가 적용됩니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-xs text-text-secondary text-left">조정지역 중과세 세율 (지방세법 §13의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="text-left p-2 font-semibold" scope="col">보유 주택 개수</th>
                        <th className="text-left p-2 font-semibold" scope="col">일반지역</th>
                        <th className="text-left p-2 font-semibold" scope="col">조정지역</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-2">1주택</td>
                        <td className="p-2">기본 세율 (1.0~3.0%)</td>
                        <td className="p-2">기본 세율</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-2">2주택</td>
                        <td className="p-2">기본 세율</td>
                        <td className="p-2"><strong>8% 중과세</strong></td>
                      </tr>
                      <tr>
                        <td className="p-2">3주택 이상</td>
                        <td className="p-2">기본 세율</td>
                        <td className="p-2"><strong>12% 중과세</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  <strong>"조정지역"</strong>은 서울, 경기 일부, 부산, 대구 등 부동산 투기 우려 지역으로 지정된 곳입니다. 지역에 따라
                  조정지역 지정·해제가 변하므로, 구입 전 관할 지자체 또는 국토부 웹사이트에서 반드시 확인하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary">예시 2: 조정지역 2주택 6억원 구입</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    구입가: 6억원 / 조정지역 지정 / 현재 보유 주택 1채
                    <br />
                    세율: 8% (중과세 적용)
                    <br />
                    <strong>취득세 = 6억 × 8% = 4,800만원</strong>
                    <br />
                    (일반지역이면 기본 1.0% = 600만원이므로, 무려 4,200만원 차이!)
                  </p>
                </div>
                <p className="mt-4">
                  <strong>다만,</strong> 위 예시에는 지방교육세와 농특세가 아직 미포함입니다. 다음 단계에서 이들을 추가 계산해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-acq-tax-mid" format="rectangle" />

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">3단계: 추가세 계산 — 지방교육세 + 농특세</h2>
                <p data-speakable>
                  취득세 외에 두 가지 추가 세금이 더 있습니다(지방교육세는 지방세법 §265, 농특세는 농어촌특별세법):
                </p>
                <h3 className="text-lg font-semibold mt-4">①  지방교육세 (항상 계산)</h3>
                <p>
                  <strong>지방교육세 = 취득세 × 10%</strong> (지방세법 §265). 취득세를 계산한 후 그 금액의 10%를 추가로 내게 됩니다.
                </p>
                <h3 className="text-lg font-semibold mt-4">② 농어촌특별세 (85㎡ 초과 시만)</h3>
                <p>
                  주택의 건물 면적(등기부 기준)이 <strong>85㎡를 초과</strong>하면 추가로 농어촌특별세(농특세)
                  <strong>0.2%</strong>를 냅니다(농어촌특별세법). 이는 취득세와 별도로 계산됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary">예시 3: 10억원 구입 (85㎡ 초과, 지방교육세 포함)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    구입가: 10억원 / 건물 면적: 110㎡ (85 초과)
                    <br />
                    ① 취득세 = 10억 × 3.0% = 3,000만원
                    <br />
                    ② 지방교육세 = 3,000만 × 10% = 300만원
                    <br />
                    ③ 농특세 = 10억 × 0.2% = 200만원
                    <br />
                    <strong>총 납부액 = 3,000만 + 300만 + 200만 = 3,500만원</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">4단계: 특례 및 감면 검토</h2>
                <p data-speakable>
                  특정 조건을 충족하면 취득세를 감면받을 수 있습니다. 가장 대표적인 경우는 다음과 같습니다(지방세특례제한법 §36의3):
                </p>
                <h3 className="text-lg font-semibold mt-4">생애최초 주택 감면</h3>
                <p>
                  무주택 세대주가 <strong>처음 주택을 구입</strong>할 때는 취득세 감면을 받을 수 있습니다. 다만 주택가액 한도와 소득·결혼 등
                  요건이 있으며, <strong>지자체마다 적용 기준이 다르므로 관할 세무과에 직접 문의</strong>해야 합니다. 일반적으로 감면액은 수천만원대이므로,
                  구입 전 반드시 확인하세요.
                </p>
                <p className="mt-4">
                  <strong>다만,</strong> 2022년 6월 이후 취득세 감면의 소득요건이 폐지되어, 무주택이면 소득 제한 없이 감면 대상이 될 수
                  있습니다. 정확한 자격은 지자체에 문의하세요.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">5단계: 납부 — 언제, 어디서, 얼마를?</h2>
                <p data-speakable>
                  취득세는 <strong>주택 취득일로부터 60일 이내</strong>에 관할 지자체에 신고·납부해야 합니다. 기한 내에 신고·납부하지
                  않으면 가산세가 부과되므로 반드시 기한을 지키세요. 정확한 가산세율·납부 절차는 관할 지자체 세무과에 확인하면 됩니다. 대부분
                  부동산 중개인이나 법무사가 대행하므로, 계약 체결 후 전문가와 상의하면 됩니다.
                </p>
                <p className="mt-4">
                  <strong>납부 방법:</strong>
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>인터넷: 위택스(wetax.go.kr) 또는 관할 지자체 홈페이지</li>
                  <li>현장: 관할 세무과 방문</li>
                  <li>은행: 특정 은행(국민, 신한, 우리 등)에서도 취득세 납부 가능</li>
                </ul>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">실전 팁 3가지</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 조정지역 확인 필수:</strong> 같은 구입가라도 조정지역이면 중과세(8~12%)로 세금이 7배 이상 뛸 수 있습니다. 계약 전
                    반드시 확인하세요.
                  </li>
                  <li>
                    <strong>2. 면적 확인:</strong> 85㎡ 근처 주택이면 농특세(0.2%)가 추가되는지 꼭 확인하세요. 층별 면적이 다를 수 있습니다.
                  </li>
                  <li>
                    <strong>3. 생애최초 감면 조회:</strong> 첫 주택이면 감면받을 수 있는지 구입 전 세무과에 문의해 수천만원을 절약할 수 있습니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">이 가이드의 내용을 직접 계산해보세요. 구입가·지역·면적 입력 후 즉시 취득세 확인.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">앞으로 이 집을 팔 때 내야 할 양도세를 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 5단계 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">나중에 집을 팔 때 정확히 얼마를 내게 될지 배우세요.</p>
                  </Link>
                  <Link
                    href="/calculator/property-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매해 납부할 재산세도 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/real-estate"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세·평수·중개수수료 등 부동산 관련 계산기 전체.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">주택을 팔 때 양도세를 완전히 면제받는 조건 정리.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 취득세 신고는 세무사·회계사와 상담 후 진행하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었으며, 세율 변경 시 즉시 업데이트됩니다.
                  <br />
                  <br />
                  <strong>법적 근거:</strong> 지방세법 §10~§17 (취득세 기본), §13·§13의2(세율·중과세), §265(지방교육세), 농어촌특별세법(농어촌특별세), 지방세특례제한법 §36의3(생애최초 감면). 정확한 적용 기준은 관할 지자체 세무과에 문의하세요.
                  <br />
                  <br />
                  <strong>AI 보조 작성 후 운영자 검수 완료.</strong>
                </p>
              </section>

              <ShareButtons
                title="취득세 계산법 2026"
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
