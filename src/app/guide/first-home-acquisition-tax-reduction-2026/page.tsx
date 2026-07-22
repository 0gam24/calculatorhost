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

const URL = 'https://calculatorhost.com/guide/first-home-acquisition-tax-reduction-2026/';
const DATE_PUBLISHED = '2026-07-03';
const DATE_MODIFIED = '2026-07-03';

export const metadata: Metadata = {
  title: '생애최초 취득세 감면 2026 | 200만원 한도·요건·신청',
  description:
    '첫 주택 구입 시 취득세에서 최대 200만원 감면되는 생애최초 감면 제도. 지방세특례제한법 §36의3 기준, 요건, 일몰 기한까지 완전 정리.',
  keywords: [
    '생애최초 취득세 감면',
    '첫 주택 취득세',
    '12억원 한도',
    '200만원 감면',
    '지방세특례제한법 36조의3',
    '생애최초 주택',
    '무주택 감면',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '생애최초 취득세 감면 2026 | 200만원 한도·요건·신청' }],
    title: '생애최초 취득세 감면 2026 — 첫 주택 200만원 세금 감면',
    description: '본인과 배우자가 처음 주택을 구입할 때 취득세에서 최대 200만원 감면. 요건, 계산, 거주요건까지 완벽 가이드.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '생애최초 취득세 감면 2026 — 첫 주택 구입 시 200만원 감면 받는 방법',
    description: '무주택자의 첫 주택 구입 취득세를 최대 200만원 감면. 자격, 한도, 거주요건 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '생애최초 취득세 감면이란 무엇인가요?',
    answer:
      '생애최초 취득세 감면은 본인과 배우자가 주택을 소유한 적이 없을 때, 처음 주택을 구입하면 취득세에서 최대 200만원을 감면해주는 제도입니다(지방세특례제한법 §36의3). 예를 들어 취득세가 600만원이 나오면 200만원을 빼서 400만원만 내면 됩니다.',
  },
  {
    question: '취득가액이 12억원을 초과하면 감면을 못 받나요?',
    answer:
      '네, 생애최초 감면은 취득하는 주택의 가액이 12억원 이하일 때만 가능합니다(지방세특례제한법 §36의3). 12억원을 초과하는 주택을 구입하면 감면 대상이 되지 않으므로 일반 취득세율을 적용받습니다.',
  },
  {
    question: '배우자가 이전에 주택을 소유했으면 감면을 못 받나요?',
    answer:
      '네, 본인뿐 아니라 배우자도 주택 소유 이력이 전혀 없어야 합니다(지방세특례제한법 §36의3). 배우자가 과거에 주택을 소유했던 적이 있으면 감면 대상이 아닙니다. 다만 상시거주하던 주택을 처분한 후 거주한 지 3년이 지났으면 가능한 경우도 있으므로 위택스에서 확인하세요.',
  },
  {
    question: '감면을 받은 후 그 주택을 팔면 어떻게 되나요?',
    answer:
      '감면 후 그 주택을 팔 때 특별한 추가 세금이 없습니다. 다만 감면을 받은 주택이 일정기간 내에 상시거주 요건을 충족하지 못하면 감면액을 추징당할 수 있으므로 주의해야 합니다(지방세특례제한법 §36의3 부칙).',
  },
  {
    question: '생애최초 감면의 일몰(종료)은 언제인가요?',
    answer:
      '지방세특례제한법 부칙에 따르면 생애최초 감면의 적용기한은 2026년 12월 31일입니다. 따라서 2026년 12월 31일까지 등기된 취득건에만 감면이 적용됩니다. 2027년 1월 이후 취득분은 법이 개정되지 않는 한 감면받을 수 없습니다.',
  },
  {
    question: '오피스텔이나 분양권도 감면이 가능한가요?',
    answer:
      '생애최초 감면의 적용 대상은 "주택"으로 명시되어 있습니다(지방세특례제한법 §36의3). 따라서 오피스텔, 상가, 분양권 등은 일반적으로 감면 대상이 아닙니다. 다만 분양권이 주택으로 등기될 때 감면 조건을 충족하면 가능한 경우도 있으므로 정확히는 위택스 또는 관할 세무서에 문의하세요.',
  },
  {
    question: '감면액이 200만원을 초과하면 남은 금액은 어떻게 되나요?',
    answer:
      '감면액 한도는 200만원입니다. 따라서 취득세가 500만원이 나서 200만원을 감면하면 300만원을 내는 것이 맞습니다. 감면하고도 남은 세액은 당연히 납부해야 합니다. 예를 들어 취득세 900만원 중 200만원 감면 후 700만원 납부.',
  },
  {
    question: '감면을 받으려면 언제까지 신청해야 하나요?',
    answer:
      '생애최초 감면은 취득세 신고 시 자동으로 적용되는 것이 일반적입니다. 별도 신청 절차가 필요 없으며, 계약 당시 부동산 중개인이나 취득세 신고 담당자에게 "본인과 배우자가 무주택자"임을 명시해야 합니다. 신고 후 감면 여부를 확인하려면 위택스에서 조회하세요.',
  },
];

export default function FirstHomeAcquisitionTaxReduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '생애최초 취득세 감면 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '생애최초 취득세 감면 2026 — 첫 주택 200만원 세금 감면 완벽 가이드',
    description:
      '본인과 배우자가 처음 주택을 구입할 때 취득세에서 최대 200만원 감면되는 제도. 자격요건, 계산 사례, 거주요건, 일몰기한까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['생애최초', '취득세 감면', '첫 주택', '무주택', '200만원', '지방세특례제한법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '생애최초 취득세 감면 2026',
    description:
      '첫 주택 구입 시 취득세 200만원 감면. 요건, 계산, 거주요건, 일몰기한 정리.',
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
                    { name: '생애최초 취득세 감면 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">무주택자 · 8분 읽기 · 2026-07-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  생애최초 취득세 감면 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 첫 주택 200만원 세금 감면</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  무주택자가 처음 주택을 구입할 때 취득세에서 최대 200만원까지 감면받을 수 있습니다. 하지만 이 감면은 까다로운 자격요건이 있고, 감면을 받은 후 거주요건을 지키지 않으면 추징당할 수 있습니다. 이 가이드에서는 생애최초 취득세 감면의 정확한 요건, 계산 방법, 거주요건, 그리고 2026년 말 일몰까지 모든 것을 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-first-home-acquisition-tax-reduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">생애최초 취득세 감면이란 무엇인가</h2>
                <p>
                  생애최초 취득세 감면은 본인과 배우자가 주택을 소유한 적이 없을 때, 처음 주택을 구입하면 취득세를 최대 200만원까지 깎아주는 제도입니다(지방세특례제한법 §36의3). 이는 청년이나 신혼부부가 내 집 마련을 할 때 세부담을 덜어주기 위한 정책입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">생애최초 감면의 기본 개념</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    일반 취득세 산출액에서 최대 200만원을 감면하는 제도입니다. 200만원을 초과하는 감면액은 없습니다.
                    <br />
                    예: 취득가 6억원 주택의 취득세 = 600만원(1% 기준)
                    <br />
                    → 감면 전: 600만원, 감면 후: 600만원 − 200만원 = <strong>400만원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  이 감면은 2026년 12월 31일까지만 유효합니다(지방세특례제한법 부칙). 따라서 2026년 말까지 등기를 완료해야 감면을 받을 수 있으므로 시간이 촉박한 경우 주의가 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">생애최초 감면의 자격 요건</h2>
                <p>
                  생애최초 감면을 받으려면 다음 세 가지 요건을 모두 충족해야 합니다(지방세특례제한법 §36의3). 하나라도 빠지면 감면을 받을 수 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 생애최초 취득세 감면 자격요건 (지방세특례제한법 §36의3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세부 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>본인·배우자 무주택</strong></td>
                        <td className="p-3">본인과 배우자가 취득 당시까지 주택을 소유한 적 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>취득가액</strong></td>
                        <td className="p-3">취득하는 주택 가액이 12억원 이하</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>상시거주 요건</strong></td>
                        <td className="p-3">취득 후 일정기간 내 전입·거주(위반 시 감면액 추징)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 본인이 무주택이라도 배우자가 과거에 주택을 소유했던 적이 있으면 감면을 받을 수 없습니다. 또한 배우자의 주택 소유 이력은 법정 결혼(혼인신고)을 기준으로 판단되며, 혼인 전 배우자가 소유했던 주택은 영향을 미칠 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득가액 12억원 한도의 정확한 의미</h2>
                <p>
                  생애최초 감면은 "취득가액 12억원 이하"라는 한도 조건이 있습니다. 이 12억원은 세 가지 기준이 있어 정확히 이해해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">12억원 기준의 3가지 경우</p>
                  <p className="text-sm text-text-secondary">
                    <strong>① 매매 계약서 가격이 12억원 이하</strong>
                    <br />
                    일반적인 경우. 계약서에 적힌 가격으로 판단합니다.
                    <br />
                    <br />
                    <strong>② 신축 분양권의 공급 가격이 12억원 이하</strong>
                    <br />
                    분양권 취득 시 분양 계약서의 공급가격으로 판단합니다.
                    <br />
                    <br />
                    <strong>③ 실제 거래 가격이 12억원을 초과하면 제외</strong>
                    <br />
                    예를 들어 분양권이 10억원인데 실제 매매가 12.5억원이면 감면 불가.
                  </p>
                </div>
                <p className="mt-4">
                  따라서 12억원 한도 직근처에서 계약하는 경우, 정확한 거래 가격을 확인 후 감면 여부를 판단하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">생애최초 감면의 계산 사례</h2>
                <p>
                  다음 3가지 사례를 통해 생애최초 취득세 감면이 실제로 어떻게 작동하는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 취득가 6억원, 서울 1주택 (상한율 1%)</p>
                  <p className="text-sm text-text-secondary">
                    · 취득가격: 6억원
                    <br />
                    · 취득세율: 1%(서울 기본, 지방세법 §11)
                    <br />
                    · 산출 취득세: 6억 × 1% = 600만원
                    <br />
                    · 생애최초 감면액: 200만원(한도)
                    <br />
                    · <strong>실제 납부액: 600만 − 200만 = 400만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 감면으로 200만원 절약. 지방교육세는 별도 계산.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 취득가 3억원, 지방 1주택 (상한율 1%)</p>
                  <p className="text-sm text-text-secondary">
                    · 취득가격: 3억원
                    <br />
                    · 취득세율: 1%(지방 기본)
                    <br />
                    · 산출 취득세: 3억 × 1% = 300만원
                    <br />
                    · 생애최초 감면액: 200만원(한도)
                    <br />
                    · <strong>실제 납부액: 300만 − 200만 = 100만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 산출액이 200만원 미만이면 감면액이 한도보다 작을 수 있음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 취득가 12.5억원 주택 (감면 불가)</p>
                  <p className="text-sm text-text-secondary">
                    · 취득가격: 12.5억원
                    <br />
                    · 취득세율: 1.5%(초과 기준)
                    <br />
                    · 산출 취득세: 12.5억 × 1.5% = 1,875만원
                    <br />
                    · 생애최초 감면액: <strong>0원(12억 한도 초과)</strong>
                    <br />
                    · 실제 납부액: 1,875만원(감면 없음)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 취득가가 12억을 초과하면 감면 대상 아님.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">생애최초 감면 후 반드시 지켜야 할 거주요건</h2>
                <p>
                  생애최초 감면은 "조건부" 감면입니다. 감면을 받은 후 일정기간 그 주택에 거주하지 않으면 감면액을 다시 내야(추징) 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>거주요건 기간:</strong> 취득 후 정해진 기간(일반적으로 1~3년) 동안 상시 거주해야 합니다. 정확한 기간은 법개정에 따라 달라질 수 있으므로 위택스에서 확인하세요.
                  </li>
                  <li>
                    <strong>전입신고 필수:</strong> 주택을 취득한 후 일정 기간 내에 그 주택으로 전입신고를 해야 거주 의무가 시작됩니다.
                  </li>
                  <li>
                    <strong>거주 기간 중 양도 불가:</strong> 거주요건 기간 동안 그 주택을 팔면 거주요건을 위반하게 되어 감면액이 추징될 수 있습니다.
                  </li>
                  <li>
                    <strong>추징액 계산:</strong> 거주요건을 위반하면 받은 감면액 전부(200만원)를 세금으로 내야 합니다. 단, 추징 시점의 금리가 적용되어 추가 이자가 발생할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 거주요건 위반 판정은 복잡할 수 있습니다. 예를 들어 직장 이전, 질병, 출장 등 불가피한 사유가 있으면 기간 연장이나 감면 유지가 가능한 경우도 있으므로, 거주하지 못할 상황이 생기면 반드시 관할 세무서에 먼저 문의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득요건이 없다는 것의 의미 (2022년 폐지)</h2>
                <p>
                  생애최초 취득세 감면은 원래 소득요건이 있었습니다(기존: 연소득 기준). 하지만 2022년 6월 21일 이후 취득분부터 소득요건이 폐지되었습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">소득요건 폐지의 의미</p>
                  <p className="text-sm text-text-secondary">
                    <strong>· 2022년 6월 21일 이전 취득:</strong> 소득요건이 있었음(연소득 일정 금액 이하만 가능)
                    <br />
                    <strong>· 2022년 6월 21일 이후 취득:</strong> 소득요건 없음. 무주택이면 소득 상관없이 감면 가능
                    <br />
                    <br />
                    결론: 2026년 현재는 소득이 높아도 무주택이면 감면 가능합니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-first-home-acquisition-tax-reduction-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">생애최초 감면이 끝나는 시점 (일몰)</h2>
                <p>
                  생애최초 취득세 감면은 영구 제도가 아닙니다. 지방세특례제한법 부칙에 따르면 감면 대상은 2026년 12월 31일까지만입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>일몰 기한: 2026년 12월 31일</strong> — 지방세특례제한법 부칙에 명시된 적용 기한입니다.
                  </li>
                  <li>
                    <strong>등기 기준:</strong> 감면 적용 기준은 일반적으로 등기일입니다. 2026년 12월 31일 이전에 등기를 마쳐야 감면을 받을 수 있습니다. 계약일이 아닌 등기일이므로 주의하세요.
                  </li>
                  <li>
                    <strong>2027년 1월 이후:</strong> 법이 개정되지 않는 한 2027년 1월 1일 이후 등기분은 생애최초 감면을 받을 수 없습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 국회에서 감면 기한을 연장하거나 변경할 수 있으므로, 2026년 중반 이후 법 개정 뉴스를 꼭 확인하세요. 특히 2027년 이후 취득 예정인 경우, 매년 세법 개정 소식을 관심 있게 봐야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기타 주의사항 및 예외</h2>
                <p>
                  생애최초 감면은 매우 까다로운 제도입니다. 다음과 같은 경우는 특히 주의가 필요합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>상시거주 주택만 해당:</strong> 취득세 감면은 "상시거주 목적"의 주택에만 적용됩니다. 투자 목적이나 임대용 주택은 감면이 불가능합니다. 단, 취득 시점에는 상시거주 목적이라도 향후 임대로 전환하면 거주요건 위반이 될 수 있습니다.
                  </li>
                  <li>
                    <strong>오피스텔·분양권:</strong> 원칙적으로 "주택"이 아니므로 감면이 불가능합니다. 다만 분양권이 주택으로 등기될 때 특수한 경우가 있을 수 있으므로, 정확히는 관할 세무서에 확인하세요.
                  </li>
                  <li>
                    <strong>중복 감면 불가:</strong> 생애최초 감면을 한 번 받으면, 그 이후로 같은 사유로 다시 받을 수 없습니다. 즉, 한 사람이 생애에 한 번만 받을 수 있는 감면입니다.
                  </li>
                  <li>
                    <strong>배우자 소급 규정:</strong> 혼인 후 배우자가 과거에 주택을 소유했던 것을 나중에 발견해도, 이미 받은 감면을 취소할 수 없는 경우도 있습니다. 정확한 상황은 세무서에 문의하세요.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">생애최초 감면 신청 및 확인 방법</h2>
                <p>
                  생애최초 감면은 특별한 신청서가 필요 없는 경우가 많습니다. 하지만 확실하게 하려면 다음 방법으로 확인하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 취득세 신고 시 의사 표시</p>
                  <p className="text-sm text-text-secondary">
                    부동산 등기소나 세무서에서 취득세를 신고할 때, "본인과 배우자가 무주택자"임을 명확히 해야 합니다. 신청서나 신고 양식에 "생애최초 감면 신청" 항목이 있는지 확인하고, 있으면 체크하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 위택스에서 감면 적용 확인</p>
                  <p className="text-sm text-text-secondary">
                    위택스(wetax.go.kr)에 개인 계정으로 로그인 후 "취득세 조회" 메뉴에서 감면 여부를 확인할 수 있습니다. "생애최초 주택 취득 감면액" 항목을 찾아 200만원이 표시되는지 확인하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 3. 관할 세무서 직접 문의</p>
                  <p className="text-sm text-text-secondary">
                    감면이 적용되었는지 확실하지 않으면, 해당 부동산이 있는 지역의 세무서에 직접 전화하거나 방문하여 확인하세요. 신고 데이터를 기반으로 정확한 감면 여부를 알려줄 것입니다.
                  </p>
                </div>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 취득가로 취득세를 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">취득세율, 세율 구간, 누진공제의 기본.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억원 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세 비과세 조건과 계산.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-score-84-points-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 계산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">84점 만점에 가점 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-loan-limit-interest-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세자금대출 한도·금리 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택 전세 자금 지원 한도.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·재산세·상속세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 생애최초 감면 적용 여부, 정확한 감면액, 거주요건, 추징 판정은 관할 시·군·구청 세무서 또는 위택스에서 반드시 확인하세요. 특히 배우자의 주택 소유 이력, 거주요건 판정, 거주 중 양도 시 감면 추징 등은 상황이 개별적으로 다를 수 있으므로 직접 문의하는 것이 안전합니다. 본 콘텐츠는 2026-07-03을 기준으로 작성되었으며, 지방세특례제한법 개정 시 즉시 업데이트됩니다. 생애최초 주택 취득 감면의 정확한 기준은 법조항 <strong>지방세특례제한법 §36의3(생애최초 주택 취득 감면)</strong>을 따릅니다. 2026년 12월 31일 일몰 기한이 있으므로 신청 시 서두르시기 바랍니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="생애최초 취득세 감면 2026 가이드"
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
