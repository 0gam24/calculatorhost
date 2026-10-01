import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
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
const DATE_MODIFIED = '2026-10-01';

export const metadata: Metadata = {
  title: '취득세 계산법 2026 | 주택 구입 세율·중과·농특세 기본 세율과 예외 | calculatorhost',
  description:
    '주택 구입 시 내야 할 취득세를 정확히 계산하는 방법. 구입가별 세율(1.0~3.0%), 2주택·3주택 중과세(8~12%), 국민주택규모 초과 농특세, 지방교육세 일반 개인 매매 안내. 지방세법 §11·§13의2.',
  keywords: [
    '취득세 계산',
    '취득세율 2026',
    '주택 취득세',
    '취득세 중과',
    '지방세법 11조',
    '취득세 농특세',
    '지방교육세',
    '생애최초 감면',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '취득세 계산법 2026 | 주택 구입 세율·중과·농특세 기본 세율과 예외 | calculatorhost' }],
    title: '취득세 계산법 2026',
    description: '주택 구입 시 필요한 취득세를 단계별로 계산하는 일반 개인 매매 안내.',
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
      '감면·중과 없는 일반 매매에서 6억원 초과 9억원 이하는 (주택가액 × 2 ÷ 3억원 − 3) ÷ 100으로 세율을 구하고, 소수 세율의 다섯째 자리에서 반올림해 넷째 자리까지 계산합니다(지방세법 §11). 7억원은 1.67%, 8억원은 2.33%입니다. 지분 취득은 전체 주택가액으로 세율을 판단하며, 특례·조례 적용 여부는 별도 확인하세요.',
  },
  {
    question: '조정지역에서 2주택 구입 시 취득세가 얼마나 늘어나나요?',
    answer:
      '일시적 2주택 등 중과 제외가 없다면 취득 후 조정대상지역 2주택은 8%, 3주택 이상은 12%가 적용됩니다(지방세법 §13의2). 예를 들어 일반지역 1주택 5억 구입 시 기본 1% = 500만원이지만, 조정지역 2주택이면 8% = 4,000만원으로 대폭 증가합니다.',
  },
  {
    question: '85㎡를 초과하면 농어촌특별세가 추가되나요?',
    answer:
      '감면·중과 없는 일반 매매에서 국민주택규모를 초과하면 과세표준의 0.2%가 농어촌특별세입니다. 일반적인 면적 기준은 전용 85㎡이고, 수도권 밖 도시지역이 아닌 읍·면은 100㎡입니다. 5억원 일반 매매에서 농특세가 적용되면 취득세 500만원 + 지방교육세 50만원 + 농특세 100만원 = 총 650만원입니다. 중과·감면은 부가세목도 별도 계산합니다.',
  },
  {
    question: '지방교육세는 별도 계산인가요?',
    answer:
      '감면·중과 없는 일반 주택 매매의 지방교육세는 취득세율의 10%를 과세표준에 적용합니다. 지방세법 §13의2 중과 시에는 과세표준의 0.4%입니다(지방세법 §151). 취득세 500만원이면 지방교육세 50만원을 추가로 내게 됩니다. 총 납부액 = 취득세 + 지방교육세(+ 농특세)이므로 모두 합산하여 계산하세요.',
  },
  {
    question: '생애최초 주택 구입 감면을 받을 수 있나요?',
    answer:
      '생애최초 무주택자 감면이 있습니다(지방세특례제한법 §36의3). 다만 주택가액 한도·요건(혼인 여부, 소득 기준 폐지 등)이 있으며, 법령의 주택가액·주택 유형·과거 소유·취득 후 사용 및 추징 요건을 관할 세무과에 확인하세요. 이 글의 일반 세액 예시에는 감면을 적용하지 않았습니다.',
  },
  {
    question: '전세금·보증금도 취득세 계산에 포함되나요?',
    answer:
      '주택을 임차하는 전세·보증금 계약 자체는 소유권 취득이 아니므로 취득세 대상이 아닙니다. 매매·증여·상속 등 소유권 취득은 각각 별도의 과세 기준을 적용합니다.',
  },
  {
    question: '공급가액과 실제 거래가가 다르면 어느 것을 기준으로 하나요?',
    answer:
      '취득세는 실제 거래가를 기준으로 계산합니다. 부동산 거래계약서의 실제 매매금액이 취득세의 과세표준입니다. 공시가격과 다르더라도 계약서 금액으로 신고하며, 특수관계인 저가 거래 등 별도 과세표준 규정은 관할 지방자치단체에 확인해야 합니다.',
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
      '주택 구입 시 내야 할 취득세를 정확히 계산하는 방법. 세율 구간, 중과세, 농특세, 지방교육세 기본 세율과 예외.',
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
      '주택 구입 시 필요한 취득세를 정확하게 계산하는 일반 개인 매매 안내. 세율, 중과세, 농특세, 교육세.',
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
                  <span className="text-2xl text-text-secondary">· 주택 구입 시 내야 할 세금 기본 세율과 예외</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택을 구입할 때 내야 할 취득세는 구입가, 주택 개수, 지역에 따라 크게 달라집니다. 기본 세율은 1.0~3.0%지만,
                  조정지역에서 2주택 이상 구매 시에는 8~12%까지 올라갑니다. 이 가이드는 당신이 내야 할 정확한 취득세를
                  단계별로 계산하는 방법을 체계적으로 설명합니다.
                </p>
              </header>

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">취득세란?</h2>
                <p data-speakable>
                  <strong>취득세는 부동산(주택, 건물, 토지)을 구입할 때 구매자가 내는 세금입니다.</strong> 지방세법 §11·§13의2에 따라
                  구입가의 일정 비율로 계산되며, 주택의 개수, 위치(조정지역 여부), 전용면적과 국민주택규모 해당 여부에 따라 세율이 달라집니다.
                  총 납부액 = 취득세 본세 + 지방교육세 + 적용되는 농어촌특별세. 이 글은 개인의 일반 주택 매매를 설명하며 감면·고급주택·특수 조례는 별도 확인합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-xs text-text-secondary text-left">2026년 주택 취득세 기본 세율표 (지방세법 §11)</caption>
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
                        <td className="p-2">지방세법 §11</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-2">6억~9억원 (1주택)</td>
                        <td className="p-2">법정 산식 1~3%</td>
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
                    일반 1주택 6억원 이하의 본세는 1%. 중과 제외가 없는 조정지역 2주택은 8%. 교육세는 일반 매매와 중과가 다르고, 농특세는 국민주택규모 초과 여부와 중과·감면 조건을 함께 확인합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">1단계: 기본 세율 확인, 구입가로 세율 결정</h2>
                <p data-speakable>
                  취득세는 <strong>구입가(실제 거래계약서 금액)</strong>를 기준으로 계산합니다. 공시가격이나 감정가가 아닌, 당신이 실제로
                  지불한 금액입니다. 구입가에 따라 다음과 같이 세율이 결정됩니다(지방세법 §11):
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>6억원 이하</strong>: 1.0% 고정세율
                  </li>
                  <li>
                    <strong>6억~9억원</strong>: 법정 산식을 반올림해 1~3% 적용 (7억원 1.67%, 8억원 2.33%)
                  </li>
                  <li>
                    <strong>9억원 초과</strong>: 3.0% 고정세율
                  </li>
                </ul>
                <p className="mt-4">
                  <strong>다만,</strong> 위 세율은 감면·중과 없는 일반 매매입니다. 조정지역의 1주택과 비조정지역의 2주택도 원칙적으로 기본 세율이며,
                  주택 수와 중과 제외 여부를 함께 판단합니다(다음 단계 참조).
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
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">2단계: 중과세 여부 판정, 조정지역 + 다주택</h2>
                <p data-speakable>
                  같은 구입가라도 <strong>조정지역 여부</strong>와 <strong>현재 보유 주택 개수</strong>에 따라 세율이 급격히 오른다는 점을 주의해야
                  합니다(지방세법 §13의2). 취득 후 세대 주택 수로 판단하며 일시적 2주택·중과 제외 주택 등은 별도 확인합니다. 아래 표는 중과 제외가 없는 개인 매매 기준입니다:
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
                        <td className="p-2">3주택</td>
                        <td className="p-2"><strong>8%</strong></td>
                        <td className="p-2"><strong>12% 중과세</strong></td>
                      </tr>
                      <tr><td className="p-2">4주택 이상</td><td className="p-2"><strong>12%</strong></td><td className="p-2"><strong>12%</strong></td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  <strong>"조정지역"</strong>은 국토교통부가 지정·고시하는 지역입니다. 이 글은 현재 지정 지역 목록을 제공하지 않습니다. 지역에 따라
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

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">3단계: 추가세 계산, 지방교육세 + 농특세</h2>
                <p data-speakable>
                  취득세 외에 두 가지 추가 세금이 더 있습니다(지방교육세는 지방세법 §151, 농특세는 농어촌특별세법):
                </p>
                <h3 className="text-lg font-semibold mt-4">① 지방교육세 (매매 유형별 계산)</h3>
                <p>
                  <strong>일반 매매: 과세표준 × 취득세율 × 10%</strong>. 지방세법 §13의2 중과는 <strong>과세표준 × 0.4%</strong>입니다(지방세법 §151). 예를 들어 6억원·8% 중과의 교육세는 240만원이며, 본세 4,800만원의 10%인 480만원이 아닙니다. 각 세목 최종 세액은 10원 미만을 버립니다.
                </p>
                <h3 className="text-lg font-semibold mt-4">② 농어촌특별세 (국민주택규모 초과 여부 확인)</h3>
                <p>
                  감면 없는 일반 매매는 국민주택규모 초과 시 과세표준의 <strong>0.2%</strong>입니다. 8% 중과는 0.6%, 12% 중과는 1.0%로 부가세목도 달라집니다(농어촌특별세법 §5). 국민주택규모는 일반적으로 전용 85㎡, 수도권 밖 도시지역이 아닌 읍·면은 100㎡입니다. 감면에 따른 농특세 등 특례는 별도 확인하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary">예시 3: 10억원 구입 (85㎡ 초과, 지방교육세 포함)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    일반 개인 1주택 매매, 감면·중과 없음 / 구입가: 10억원 / 전용면적: 110㎡
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
                  생애최초 구입이라도 모든 주택과 취득자가 자동 감면 대상이 되는 것은 아닙니다. 지방세특례제한법 §36의3의 요건과 감면 한도, 취득 후 사용·추징 요건을 관할 세무과에서 확인하세요. 이 글은 감면액을 확정하거나 일반 세액 예시에 감면을 반영하지 않습니다.
                </p>
                <p className="mt-4">
                  다른 세제의 소득 기준을 그대로 적용하거나 생애최초라는 이유만으로 감면을 확정하지 마세요. 적용 시점의 법령과 개별 조건 확인이 필요합니다.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="border-l-3 border-primary-500 pl-3 text-2xl font-bold">5단계: 납부, 언제, 어디서, 얼마를?</h2>
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
                    <strong>3. 생애최초 감면 조회:</strong> 첫 주택이면 감면받을 수 있는지 구입 전 세무과에 문의해 적용 요건과 실제 감면 한도를 확인하세요.
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
                  <strong>법적 근거:</strong> 지방세법 §10~§17 (취득세 기본), §13·§13의2(세율·중과세), §151(지방교육세), 농어촌특별세법(농어촌특별세), 지방세특례제한법 §36의3(생애최초 감면). 정확한 적용 기준은 관할 지자체 세무과에 문의하세요.
                  <br />
                  <br />

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
