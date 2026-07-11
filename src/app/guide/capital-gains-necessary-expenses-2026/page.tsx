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

const URL = 'https://calculatorhost.com/guide/capital-gains-necessary-expenses-2026/';
const DATE_PUBLISHED = '2026-07-12';
const DATE_MODIFIED = '2026-07-12';

export const metadata: Metadata = {
  title: '양도소득세 필요경비 2026, 취득가·자본적지출·양도비 공제',
  description:
    '양도소득세를 줄이는 필요경비는 취득가액, 자본적지출, 양도비 3가지입니다. 새시·발코니 확장은 인정되고 도배·장판은 제외됩니다. 증빙 요건과 계산 사례를 소득세법 §97 기준으로 정리합니다.',
  keywords: [
    '양도소득세 필요경비',
    '자본적지출 수익적지출',
    '양도비 공제',
    '새시 필요경비',
    '양도세 취득가액',
    '소득세법 97조',
    '필요경비 증빙',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '양도소득세 필요경비 2026, 취득가·자본적지출·양도비 공제' }],
    title: '양도소득세 필요경비 2026, 무엇을 빼면 세금이 줄어드나',
    description: '취득가액·자본적지출·양도비를 정확히 반영하면 양도세가 수백만원 줄어듭니다. 인정·불인정 항목과 증빙을 소득세법 §97로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '양도소득세 필요경비 2026, 취득가·자본적지출·양도비',
    description: '새시 교체는 인정, 도배·장판은 제외. 필요경비 3가지와 증빙 요건. 소득세법 §97.',
  },
};

const FAQ_ITEMS = [
  {
    question: '양도소득세 필요경비란 무엇인가요?',
    answer:
      '필요경비는 양도차익을 계산할 때 양도가액에서 빼주는 비용입니다(소득세법 §97). 크게 취득가액, 자본적지출액, 양도비 3가지로 구성됩니다. 양도차익 = 양도가액 − 취득가액 − 자본적지출 − 양도비이므로, 필요경비를 빠뜨리면 그만큼 과세표준이 커져 세금을 더 내게 됩니다.',
  },
  {
    question: '새시(샷시) 교체 비용도 필요경비로 인정되나요?',
    answer:
      '네, 새시 설치·교체는 자본적지출로 인정됩니다. 발코니 확장, 방 확장, 난방시설(보일러) 교체, 배관 전면 교체처럼 주택의 가치를 높이거나 내용연수를 늘리는 공사는 자본적지출입니다(소득세법 시행령 §67). 다만 지출 사실을 증빙으로 입증해야 합니다.',
  },
  {
    question: '도배·장판·싱크대 교체는 왜 필요경비가 안 되나요?',
    answer:
      '도배, 장판, 싱크대·주방기구 교체, 외벽 도색, 방수·누수 단순 수리는 수익적지출로 보아 필요경비에서 제외됩니다. 이런 지출은 자산의 가치를 높이기보다 원상을 유지·회복하는 비용으로 분류되기 때문입니다. 같은 인테리어라도 확장·구조변경이면 인정, 단순 교체·보수면 불인정이라고 기억하면 쉽습니다.',
  },
  {
    question: '중개수수료와 법무사 비용도 필요경비인가요?',
    answer:
      '네, 양도 과정에서 든 중개보수, 법무사 보수, 인지대, 양도소득세 신고서 작성 비용 등은 양도비로 인정됩니다. 취득 당시의 중개보수와 취득세·법무사 비용은 취득가액에 포함되는 부대비용으로 반영됩니다.',
  },
  {
    question: '필요경비 증빙은 어떻게 준비하나요?',
    answer:
      '세금계산서, 현금영수증, 신용카드 매출전표 같은 적격증빙이 원칙입니다. 적격증빙이 없더라도 실제 지출한 사실이 계좌이체 내역, 공사계약서, 견적서 등으로 객관적으로 확인되면 인정될 수 있습니다. 공사대금은 가급적 계좌이체로 지급하고 계약서를 보관하세요.',
  },
  {
    question: '취득가액을 모르면 필요경비를 어떻게 계산하나요?',
    answer:
      '실제 취득가액을 확인할 수 없으면 환산취득가액을 사용할 수 있습니다. 이 경우 자본적지출·양도비 대신 필요경비 개산공제(취득 당시 기준시가의 일정 비율)만 인정되는 등 계산 방식이 달라지므로, 실제 취득 계약서·영수증을 최대한 확보하는 편이 유리합니다.',
  },
  {
    question: '필요경비를 반영하면 세금이 얼마나 줄어드나요?',
    answer:
      '필요경비 1,000만원을 추가로 인정받으면, 과세표준 구간이 38%라면 대략 380만원(지방소득세 포함 약 418만원)의 세금이 줄어듭니다. 금액이 클수록 절감 효과가 커지므로, 보유 기간에 지출한 공사·수수료 증빙을 꼼꼼히 모으는 것이 실질적인 절세입니다.',
  },
  {
    question: '취득세와 재산세도 필요경비에 넣을 수 있나요?',
    answer:
      '취득 시 낸 취득세와 부대비용은 취득가액에 포함되어 필요경비 역할을 합니다. 다만 보유 기간에 매년 낸 재산세, 종합부동산세, 대출 이자는 보유·관리 비용으로 보아 양도세 필요경비로 인정되지 않습니다.',
  },
];

export default function CapitalGainsNecessaryExpenses2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '양도소득세 필요경비 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '양도소득세 필요경비 2026, 취득가·자본적지출·양도비로 세금 줄이기',
    description:
      '양도차익에서 빼주는 필요경비 3가지(취득가액·자본적지출·양도비)의 인정 범위, 수익적지출과의 구분, 증빙 요건, 절세 계산 사례까지 소득세법 §97 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['양도소득세', '필요경비', '자본적지출', '양도비', '취득가액'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '양도소득세 필요경비 2026',
    description:
      '양도소득세 필요경비(취득가액·자본적지출·양도비)의 인정 범위와 증빙, 절세 계산법.',
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
                    { name: '양도소득세 필요경비 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 매도자 · 8분 읽기 · 2026-07-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  양도소득세 필요경비 2026
                  <br />
                  <span className="text-2xl text-text-secondary">취득가·자본적지출·양도비 공제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 팔 때 내는 양도소득세는 양도차익에 매겨집니다. 그런데 이 양도차익을 계산할 때 양도가액에서 빼주는 항목이 바로 필요경비입니다. 필요경비를 정확히 챙기면 세금이 수백만원 단위로 줄어들 수 있지만, 무엇이 인정되고 무엇이 빠지는지 헷갈리는 분이 많습니다. 이 가이드는 소득세법 §97을 기준으로 필요경비 3가지와 인정 기준, 증빙, 절세 계산법을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-capital-gains-necessary-expenses-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">필요경비란 무엇인가요?</h2>
                <p>
                  필요경비는 양도차익을 계산할 때 양도가액에서 차감하는 비용입니다. 소득세법 §97에 따르면 양도차익은 다음 식으로 계산됩니다. 필요경비가 클수록 양도차익이 줄고, 그만큼 과세표준과 세액이 낮아집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">양도차익 계산의 기본 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    양도차익 = 양도가액 − 필요경비
                    <br />
                    필요경비 = 취득가액 + 자본적지출액 + 양도비
                    <br />
                    → 여기서 장기보유특별공제와 기본공제 250만원(소득세법 §103)을 추가로 빼면 과세표준이 됩니다.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 필요경비는 스스로 챙겨야 인정됩니다. 국세청이 알아서 빼주지 않으므로, 취득 당시 계약서와 보유 기간에 지출한 공사·수수료 증빙을 신고 때 함께 제출해야 반영됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">필요경비로 인정되는 3가지는 무엇인가요?</h2>
                <p>
                  필요경비는 취득가액, 자본적지출, 양도비 세 가지로 나뉩니다(소득세법 §97). 각각 어떤 비용이 들어가는지 아래 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 양도소득세 필요경비 3분류 (소득세법 §97)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">포함되는 비용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>취득가액</strong></td>
                        <td className="p-3">실제 매입가격 + 취득세·등록면허세 + 취득 당시 중개보수·법무사 비용 + 취득 관련 소송비용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>자본적지출</strong></td>
                        <td className="p-3">새시 설치, 발코니·방 확장, 난방(보일러) 교체, 배관 전면교체 등 가치를 높이거나 내용연수를 늘리는 공사</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>양도비</strong></td>
                        <td className="p-3">양도 시 중개보수, 법무사 보수, 인지대, 양도세 신고서 작성비용, 매매계약 광고비</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 보유 기간에 매년 낸 재산세·종합부동산세, 대출 이자, 관리비는 보유·관리 비용으로 보아 필요경비에서 제외됩니다. 취득·양도 시점의 세금·수수료만 반영된다는 점을 구분하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자본적지출과 수익적지출은 어떻게 구분하나요?</h2>
                <p>
                  가치를 높이면 자본적지출로 인정되고, 원상을 유지·회복하는 수준이면 수익적지출로 보아 제외됩니다(소득세법 시행령 §67). 같은 인테리어라도 성격에 따라 갈리므로 아래 예시로 판단하세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 자본적지출(인정) vs 수익적지출(불인정) 예시</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">자본적지출 (필요경비 인정)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">수익적지출 (필요경비 제외)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">새시(샷시) 설치·교체</td>
                        <td className="p-3">도배·장판 교체</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">발코니·방 확장</td>
                        <td className="p-3">싱크대·주방기구 교체</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">난방(보일러) 교체, 배관 전면교체</td>
                        <td className="p-3">외벽 도색, 문·조명 교체</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">방범창·시스템에어컨 설치</td>
                        <td className="p-3">단순 누수·타일 보수</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 개별 사례는 공사 범위와 목적에 따라 국세청 판단이 달라질 수 있습니다. 애매한 지출은 관할 세무서나 세무대리인에게 확인하고, 공사계약서에 시공 내용을 구체적으로 남겨두세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">필요경비 절세 계산 사례</h2>
                <p>
                  필요경비를 반영했을 때와 빠뜨렸을 때 세금이 얼마나 달라지는지 사례로 비교해보겠습니다. 조정대상지역이 아닌 일반 세율(소득세법 §104) 적용을 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 자본적지출·양도비를 모두 반영한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 양도가액 8억원, 취득가액 5억원, 보유 5년
                    <br />
                    · 자본적지출(새시+확장) 3,000만원, 양도비(중개보수) 600만원
                    <br />
                    · 양도차익 = 8억 − 5억 − 3,000만 − 600만 = 2억 6,400만원
                    <br />
                    · 장기보유특별공제(5년, 연 2% × 5 = 10%) = 2,640만원
                    <br />
                    · 양도소득금액 = 2억 6,400만 − 2,640만 = 2억 3,760만원
                    <br />
                    · 과세표준 = 2억 3,760만 − 기본공제 250만 = 2억 3,510만원
                    <br />
                    · 산출세액 = 2억 3,510만 × 38% − 누진공제 1,994만 = <strong>약 6,940만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 필요경비 증빙을 빠뜨린 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 자본적지출·양도비 3,600만원을 반영하지 못함
                    <br />
                    · 양도차익 = 8억 − 5억 = 3억원
                    <br />
                    · 장기보유특별공제 10% = 3,000만원 → 양도소득금액 2억 7,000만원
                    <br />
                    · 과세표준 = 2억 7,000만 − 250만 = 2억 6,750만원
                    <br />
                    · 산출세액 = 2억 6,750만 × 38% − 1,994만 = <strong>약 8,171만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 필요경비 3,600만원을 챙기지 못하면 세금이 약 1,231만원 더 나옵니다. 지방소득세 10%까지 더하면 차이는 약 1,354만원으로 커집니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  두 사례의 유일한 차이는 필요경비 반영 여부입니다. 공사 영수증과 중개보수 증빙을 챙기는 것만으로 1,000만원 넘는 세금이 갈렸습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증빙은 어떻게 준비하나요?</h2>
                <p>
                  적격증빙을 갖추면 인정이 확실합니다. 세금계산서, 현금영수증, 신용카드 매출전표가 원칙적인 증빙입니다. 적격증빙이 없어도 실제 지출을 객관적으로 입증하면 인정될 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>계좌이체 우선:</strong> 공사대금은 현금보다 계좌이체로 지급해 이체 내역을 남기세요.</li>
                  <li><strong>계약서·견적서 보관:</strong> 시공 범위가 적힌 공사계약서와 견적서를 함께 보관합니다.</li>
                  <li><strong>사진 기록:</strong> 확장·교체 전후 사진은 자본적지출을 뒷받침하는 보조 자료가 됩니다.</li>
                  <li><strong>장기 보관:</strong> 취득 시점부터 양도 신고 후까지 증빙을 최소 5년 이상 보관하세요.</li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 적격증빙 없이 계좌이체만 있는 경우, 지출의 성격(자본적지출인지)까지 소명해야 하므로 계약서가 함께 있어야 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-capital-gains-necessary-expenses-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">필요경비에서 자주 하는 실수</h2>
                <p>
                  필요경비를 잘못 반영하면 세금을 더 내거나, 반대로 과다 공제로 가산세를 물 수 있습니다. 실무에서 흔한 실수를 정리했습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>수익적지출을 필요경비로 넣기:</strong> 도배·장판·싱크대 교체를 자본적지출로 신고하면 부인될 수 있습니다.
                  </li>
                  <li>
                    <strong>보유세·이자를 경비로 착각:</strong> 재산세·종부세·대출이자는 필요경비가 아닙니다.
                  </li>
                  <li>
                    <strong>증빙 미보관:</strong> 실제로 공사했어도 증빙이 없으면 인정받기 어렵습니다.
                  </li>
                  <li>
                    <strong>환산취득가액과 실지거래가액 혼용:</strong> 환산취득가액을 쓰면 자본적지출 인정 방식이 달라지므로 유불리를 따져야 합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  실질과세 원칙(국세기본법 §14)상 형식보다 실제 지출의 성격이 중요합니다. 애매하면 과다 신고보다 관할 세무서 상담을 먼저 받는 편이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">취득가·양도가·필요경비를 넣어 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 최대 80%</div>
                    <p className="mt-1 text-sm text-text-secondary">보유·거주 기간별 공제율로 양도세를 더 줄이는 법.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 5단계 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익부터 세액까지 계산 순서를 익히세요.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">고가주택 초과분 과세 구조와 비과세 요건.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-preliminary-return-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 예정신고 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">양도일 이후 2개월 내 예정신고 절차와 기한.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 필요경비 인정 여부는 지출의 실제 성격과 증빙에 따라 달라지며, 실제 신고·계산은 관할 세무서 또는 세무대리인의 확인을 받으시기 바랍니다. 본 콘텐츠는 2026-07-12 기준으로 작성되었고 세법 개정 시 업데이트됩니다. 인용 법조항: <strong>소득세법 §97(양도소득의 필요경비 계산), 시행령 §67(자본적지출 등), §103(양도소득 기본공제), §104(세율), 국세기본법 §14(실질과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="양도소득세 필요경비 2026 가이드"
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
