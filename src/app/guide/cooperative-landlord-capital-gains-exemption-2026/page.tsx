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

const URL = 'https://calculatorhost.com/guide/cooperative-landlord-capital-gains-exemption-2026/';
const DATE_PUBLISHED = '2026-07-14';
const DATE_MODIFIED = '2026-07-14';

export const metadata: Metadata = {
  title: '상생임대인 2026 | 5% 이내 인상으로 양도세 거주요건 면제',
  description:
    '임대료를 직전 대비 5% 이내로 인상한 1주택 임대인에게 양도세 비과세 2년 거주요건을 면제하는 상생임대인 특례. 소득세법 시행령 §155의3, 2026-12-31 일몰기한, 요건 4가지 정리.',
  keywords: [
    '상생임대인',
    '상생임대주택 특례',
    '임대료 5% 인상',
    '양도세 거주요건 면제',
    '1세대1주택 비과세',
    '소득세법 시행령 155조의3',
    '상생임대차계약',
    '2026 상생임대인 일몰',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상생임대인 2026, 5% 이내 인상으로 양도세 거주요건 면제' }],
    title: '상생임대인 2026, 5% 이내 인상으로 양도세 거주요건 면제',
    description: '직전 대비 임대료 5% 이내 인상 시 1세대1주택 양도세 2년 거주요건이 면제됩니다. 요건 4가지, 계산 사례, 2026-12-31 일몰기한 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상생임대인 2026, 5% 이내 인상으로 양도세 2년 거주요건 면제',
    description: '소득세법 시행령 §155의3 상생임대주택 특례. 요건 4가지와 5% 상한 계산 사례, 일몰기한 2026-12-31.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상생임대인 요건에서 임차인이 바뀌어도 되나요?',
    answer:
      '네, 임차인이 달라져도 상생임대인 요건을 충족할 수 있습니다. 소득세법 시행령 §155의3은 직전 임대차계약과 상생임대차계약을 체결한 임차인이 동일해야 한다는 규정을 두고 있지 않습니다. 즉, 직전 세입자가 나간 뒤 새 세입자와 5% 이내 인상 조건으로 계약을 새로 맺어도 특례 적용이 가능합니다. 다만 직전계약 자체가 1년 6개월 이상 유지되었어야 한다는 요건은 그대로 지켜야 합니다.',
  },
  {
    question: '전세를 월세로 바꿔도 5% 상한 계산이 가능한가요?',
    answer:
      '가능합니다. 다만 보증금과 월세가 함께 바뀌면 주택임대차보호법이 정한 전월세전환율을 준용해 환산 임대료를 산정한 뒤 5% 이내인지 판단합니다. 예를 들어 직전이 순수 전세였고 상생계약이 반전세이면, 상생계약의 보증금과 월세를 전세로 환산해 직전 전세보증금과 비교합니다. 환산 결과가 5%를 초과하면 요건 미달이 되므로 사전 시뮬레이션이 필요합니다.',
  },
  {
    question: '임대개시 시점에 다주택자였다면 적용받을 수 없나요?',
    answer:
      '원칙적으로 상생임대차계약의 임대개시일에 1세대1주택자여야 특례가 적용됩니다. 다만 세법은 향후 1주택자가 된 상태에서 양도할 때 특례를 인정하는 여지를 두고 있으므로, 임대개시 이후 다른 주택을 처분해 1주택 상태에서 상생임대주택을 양도하면 요건 검토가 가능합니다. 개별 사안은 조합이 복잡하므로 국세청 또는 세무사 상담을 권장합니다.',
  },
  {
    question: '직전 임대차계약이 없었던 신축 주택도 특례 대상인가요?',
    answer:
      '아닙니다. 상생임대인 특례는 직전 임대차계약이 1년 6개월 이상 존재했던 주택을 전제로 합니다. 신축 후 처음 임대하는 주택은 비교 대상인 직전계약이 없어 5% 인상 여부를 판정할 수 없으므로 특례 대상에서 제외됩니다. 다만 이전 소유자 시절 임대차계약을 승계한 경우에는 그 계약을 직전계약으로 인정받을 수 있는 사례가 있어 개별 확인이 필요합니다.',
  },
  {
    question: '상생임대차계약 체결기한은 언제까지인가요?',
    answer:
      '2026년 12월 31일까지 체결한 계약이 대상입니다. 상생임대인 제도는 원래 2024년 말 일몰 예정이었으나 2024년 세법개정으로 2년 연장되었습니다. 따라서 2026-12-31 이내에 상생임대차계약을 체결하고 그 계약을 2년 이상 유지해야 합니다. 이 기한을 놓치면 이후 임대료를 5% 이내로 올리더라도 특례를 적용받을 수 없으니 계약 시점 관리가 중요합니다.',
  },
  {
    question: '상생임대인 요건을 갖추면 12억 비과세 한도도 없어지나요?',
    answer:
      '아닙니다. 상생임대인 특례는 1세대1주택 비과세와 장기보유특별공제 표2 적용 시 요구되는 2년 거주요건만 면제해 줍니다. 소득세법 §89의 12억원 고가주택 기준은 그대로 유지되므로, 양도가액이 12억을 초과하면 초과분에 대해서는 여전히 양도세가 과세됩니다. 즉, 상생임대인은 거주요건이라는 진입 문턱을 없애 주는 특례이지 비과세 한도를 확장해 주는 제도가 아닙니다.',
  },
  {
    question: '조정대상지역이 아닌 지역에서도 상생임대인 특례가 유의미한가요?',
    answer:
      '비조정지역에서는 원칙적으로 1세대1주택 비과세에 거주요건이 붙지 않지만, 장기보유특별공제 표2의 최대 80% 공제를 받으려면 보유기간뿐 아니라 거주기간도 필요합니다. 상생임대인 요건을 충족하면 이 표2의 거주기간 2년을 인정받아 실거주 없이도 장특공제를 극대화할 수 있습니다. 따라서 비조정지역 임대인에게도 장특공제 관점의 실익이 남습니다.',
  },
];

export default function CooperativeLandlord2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상생임대인 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상생임대인 2026, 5% 이내 인상으로 양도세 거주요건 면제',
    description:
      '직전 임대차계약 대비 5% 이내로 임대료를 조정한 1주택 임대인에게 1세대1주택 양도세 비과세와 장기보유특별공제 표2 적용 시 요구되는 2년 거주요건을 면제해 주는 소득세법 시행령 §155의3 특례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상생임대인', '상생임대주택 특례', '양도세 거주요건 면제', '1세대1주택 비과세', '소득세법 시행령 155조의3'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상생임대인 2026',
    description:
      '5% 이내 인상으로 1세대1주택 양도세 2년 거주요건이 면제되는 상생임대인 특례의 요건, 계산 사례, 일몰기한.',
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
                    { name: '상생임대인 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임대인 겸 1주택자 · 9분 읽기 · 2026-07-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상생임대인 2026
                  <br />
                  <span className="text-2xl text-text-secondary">5% 이내 인상으로 양도세 거주요건 면제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  1주택을 임대 중인 집주인이 세입자와 상생하기 위해 임대료 인상을 5% 이내로 자제하면, 정부는 그 대가로 1세대1주택 양도세 비과세에 요구되던 2년 거주요건을 면제해 줍니다. 이 가이드는 상생임대인 제도의 요건 4가지, 5% 상한을 계산하는 방법, 2026년 말까지 연장된 일몰기한, 그리고 임대인이 실무에서 반드시 확인해야 할 함정을 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-cooperative-landlord-capital-gains-exemption-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상생임대인 제도란 무엇인가요?</h2>
                <p>
                  상생임대인 제도는 임대료를 직전 대비 5% 이내로 인상(또는 동결·인하)한 1주택 임대인에게 양도세 비과세 거주요건을 면제해 주는 특례입니다. 소득세법 시행령 §155의3에 근거하며, 조정대상지역 소재 1세대1주택 비과세 판정 시 필요한 2년 거주요건을 채우지 않아도, 상생임대차계약을 통해 임대료 안정에 기여했다면 거주한 것으로 간주해 줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    직전 임대차계약 대비 임대료 5% 이내 인상 + 상생계약 2년 이상 유지
                    <br />
                    → 1세대1주택 비과세 및 장기보유특별공제 표2의 2년 거주요건 면제(거주한 것으로 인정)
                    <br />
                    → 근거: 소득세법 시행령 §155의3, 시행기한 2026년 12월 31일
                  </p>
                </div>
                <p className="mt-4">
                  다만 상생임대인 특례가 면제해 주는 것은 2년 거주요건 하나뿐입니다. 보유기간 2년 요건, 12억 고가주택 기준, 다주택 중과 배제 여부 등은 그대로 유지되므로 상생임대인이라는 이유만으로 모든 세금이 사라지는 것은 아니라는 점을 반드시 유의해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">요건 4가지, 어떻게 충족하나요?</h2>
                <p>
                  상생임대인 특례는 요건 4가지를 모두 갖춰야 인정됩니다. 하나라도 놓치면 특례가 통째로 무너지므로 계약 체결 전에 반드시 체크리스트로 정리해 두는 것이 안전합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상생임대인 요건 4가지 (소득세법 시행령 §155의3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">번호</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">확인 포인트</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1</td>
                        <td className="p-3">임대개시 시점 1주택자</td>
                        <td className="p-3">상생임대차계약 개시일 기준, 또는 향후 1주택 상태에서 양도</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2</td>
                        <td className="p-3">직전 임대차계약 1년 6개월 이상 유지</td>
                        <td className="p-3">종전 세입자와의 계약이 실제로 18개월 이상 지속되어야 함</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3</td>
                        <td className="p-3">상생계약 임대료 5% 이내 인상</td>
                        <td className="p-3">보증금·월세 각각 또는 전월세전환율로 환산 후 5% 이내</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4</td>
                        <td className="p-3">상생계약 2년 이상 유지</td>
                        <td className="p-3">2026-12-31 이내 체결 후 최소 24개월 유지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 위 요건 중 하나라도 형식적으로만 충족한 경우, 예컨대 임차인 요청 없이 서류상만 계약을 갱신했다거나 실제 거주 없이 명목상 임대를 유지한 경우에는 국세청이 실질과세 원칙에 따라 특례를 부인할 수 있습니다. 계약서·보증금 이체 내역·확정일자 등 객관적 증빙을 함께 보관해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임대료 5% 상한은 어떻게 계산하나요?</h2>
                <p>
                  결론부터 말하면 직전 임대료에 1.05를 곱한 금액이 상한입니다. 다만 전세와 월세가 섞이면 환산이 필요합니다. 다음 사례로 실제 상한선을 확인해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 순수 전세, 보증금 인상</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 전세보증금: 5억원
                    <br />
                    · 상생계약 인상 상한: 5억원 × 1.05 = <strong>5억 2,500만원</strong>
                    <br />
                    · 5억 2,500만원 이내로 갱신하면 5% 요건 충족
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 5억 2,501만원부터는 요건 미달로 특례 배제.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 순수 월세, 월 임대료 인상</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 월세: 100만원
                    <br />
                    · 상생계약 인상 상한: 100만원 × 1.05 = <strong>105만원</strong>
                    <br />
                    · 월세 105만원 이내로 갱신하면 요건 충족
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 관리비를 임대료로 환산해 편법 인상하면 실질과세로 부인될 수 있음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 조정지역 1주택, 거주 0년 임대인</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 조정대상지역 소재 1세대1주택, 실거주 이력 0년, 상생임대인 요건 4가지 충족
                    <br />
                    · 결과: 소득세법 시행령 §155의3에 따라 2년 거주요건 면제로 간주
                    <br />
                    · 양도가액 12억원 이하로 매도 시 <strong>1세대1주택 비과세 적용 가능</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">참고: 양도가액 12억 초과분은 별도 계산식으로 과세되며 상생임대인 특례와 무관.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 임대료 상한을 아슬아슬하게 맞추면 이후 관리비 인상, 부대비용 요구 등으로 실질 임대료가 5%를 넘긴 것으로 해석될 여지가 있습니다. 안전 마진을 두고 4% 이내 인상 정도로 관리하는 것이 실무적으로는 권장됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상생임대인 특례로 어떤 혜택을 받나요?</h2>
                <p>
                  상생임대인 요건을 충족하면 두 가지 지점에서 세제 혜택이 발생합니다. 각 혜택은 서로 독립적으로 작동하므로 하나만 받을 수도 있고 둘 다 받을 수도 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 직전 임대차계약 vs 상생임대차계약 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">직전 임대차계약</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상생임대차계약</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임대료 인상률</td>
                        <td className="p-3">제한 없음</td>
                        <td className="p-3">직전 대비 5% 이내</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">최소 유지 기간</td>
                        <td className="p-3">1년 6개월 이상</td>
                        <td className="p-3">2년 이상</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임차인 동일 여부</td>
                        <td className="p-3">요건 아님</td>
                        <td className="p-3">동일 임차인일 필요 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">체결기한</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">2026년 12월 31일까지</td>
                      </tr>
                      <tr>
                        <td className="p-3">혜택</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">2년 거주요건 면제 + 장특공제 표2 거주기간 인정</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  첫째, 조정대상지역 1세대1주택 비과세 판정 시 요구되던 2년 거주요건을 채운 것으로 간주합니다. 둘째, 장기보유특별공제 표2(1세대1주택 최대 80%) 적용에서 요구되는 거주기간 요건도 2년 인정됩니다. 이 두 가지가 결합하면 실거주 없이 임대만 해 온 1주택자도 12억 이하 매도 시 완전 비과세가 가능해집니다.
                </p>
                <p className="mt-4">
                  다만 상생임대인 특례는 어디까지나 거주요건을 대체할 뿐, 보유요건 2년이나 양도가액 12억 한도 자체를 없애 주지는 않습니다. 12억을 초과하는 금액에 대해서는 소득세법 §89의 고가주택 과세 방식이 그대로 적용되므로, 매도 시 예상 세액을 별도로 계산해 봐야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-cooperative-landlord-capital-gains-exemption-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">적용기한은 언제까지인가요?</h2>
                <p>
                  결론부터 말하면 2026년 12월 31일까지 상생임대차계약을 체결해야 합니다. 상생임대인 제도는 원래 2024년 12월 31일까지가 시한이었으나, 2024년 세법개정을 통해 시행기한이 2년 연장되어 2026-12-31이 새로운 최종 일몰기한이 되었습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">일몰기한 관련 핵심 사실</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 기존 일몰: 2024년 12월 31일 (2024 세법개정 전)
                    <br />
                    · 현재 일몰: <strong>2026년 12월 31일</strong> (2024 세법개정으로 2년 연장)
                    <br />
                    · 판정 기준: 상생임대차계약 체결일이 2026-12-31 이내여야 함
                    <br />
                    · 계약 후 최소 24개월 유지 필요, 즉 실제 특례 완성은 2028년 이후에도 계속 발생 가능
                  </p>
                </div>
                <p className="mt-4">
                  다만 일몰기한은 세법개정으로 언제든 다시 조정될 수 있는 항목입니다. 과거에도 한 차례 연장된 전례가 있듯, 임대차 시장 안정 정책 기조에 따라 재연장될 가능성도 배제할 수 없습니다. 다만 2026-07 현재 확정된 조문상 종료일은 2026-12-31이므로, 이 기한을 기준으로 계약 계획을 세우는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상생임대인 특례는 어떻게 신청·확인하나요?</h2>
                <p>
                  상생임대인 특례는 별도의 사전 신청이 없습니다. 양도소득세 신고 시 스스로 요건 충족 사실을 증명하고 특례를 적용해 신고하면 됩니다. 다만 사후 세무조사 대비를 위해 다음 서류를 미리 갖춰 두는 것이 실무 표준입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>직전 임대차계약서:</strong> 임대 개시일, 임대료, 확정일자가 명확히 표시된 원본. 1년 6개월 이상 유지되었음을 확인할 수 있는 계약 기간 조항 포함.
                  </li>
                  <li>
                    <strong>상생임대차계약서:</strong> 체결일이 2026-12-31 이내여야 하고, 5% 이내 인상 여부가 계산 가능하도록 임대료가 구체적으로 기재되어 있어야 합니다.
                  </li>
                  <li>
                    <strong>보증금·월세 이체 내역:</strong> 계약서 금액과 실제 지급 금액이 일치함을 증빙하는 계좌 이체 기록. 현금 수령은 부인 위험이 큽니다.
                  </li>
                  <li>
                    <strong>주민등록·건축물대장 등:</strong> 임대개시 시점에 1세대1주택이었음을 확인할 수 있는 세대 구성 및 소유 현황 자료.
                  </li>
                  <li>
                    <strong>양도소득세 예정신고서:</strong> 양도일이 속한 달의 말일부터 2개월 이내에 관할 세무서에 신고. 상생임대인 요건 충족 사실을 신고서에 명시하고 첨부 서류로 뒷받침합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 요건 충족 여부가 애매한 사례, 예컨대 임대개시 시점 일시적 2주택 상태였거나 임대차 갱신 도중 임대인이 바뀐 경우 등은 사전에 국세청 또는 세무사 상담을 받는 것이 실무적으로 안전합니다. 잘못된 자기 판단으로 특례를 적용해 신고하면 사후 가산세까지 부담할 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">양도가액 12억 이하 비과세 판정과 초과분 계산법을 함께 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 표2 최대 80%</div>
                    <p className="mt-1 text-sm text-text-secondary">상생임대인이 거주기간 2년을 인정받아 표2를 극대화하는 구조.</p>
                  </Link>
                  <Link
                    href="/guide/rent-increase-5-percent-cap-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임대료 5% 상한 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주택임대차보호법의 5% 상한과 상생임대인 5% 상한의 관계.</p>
                  </Link>
                  <Link
                    href="/guide/temporary-two-houses-capital-gains-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일시적 2주택 양도세 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">임대개시 시점 1주택 요건과 겹치는 일시적 2주택 판정 원리.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">12억 초과분과 장기보유공제를 반영한 예상 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 상생임대인 요건 충족 여부, 5% 상한 판정, 양도세 비과세 최종 적용은 개별 계약 조건과 세무 사실관계에 따라 달라질 수 있으므로 국세청 또는 세무사에게 반드시 확인하세요. 본 콘텐츠는 2026-07-14 기준이며, 상생임대인 특례의 시행기한 일몰은 2026년 12월 31일입니다. 인용 조항: <strong>소득세법 시행령 §155의3(상생임대주택에 대한 1세대1주택의 특례)</strong>, <strong>소득세법 §89(비과세 양도소득)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부</a>.
                </p>
              </section>

              <ShareButtons
                title="상생임대인 2026 가이드"
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
