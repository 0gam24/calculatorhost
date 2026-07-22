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

const URL = 'https://calculatorhost.com/guide/generation-skipping-gift-surcharge-2026/';
const DATE_PUBLISHED = '2026-07-21';
const DATE_MODIFIED = '2026-07-21';

export const metadata: Metadata = {
  title: '세대생략 증여 할증과세 2026, 손주 증여 30% 할증과 절세',
  description:
    '조부모가 손주에게 바로 증여하면 증여세 산출세액에 30%가 할증됩니다(미성년+20억 초과 시 40%). 세대생략 할증 계산법, 증여재산공제, 절세 효과와 예외를 상속세및증여세법 §57 기준으로 정리했습니다.',
  keywords: [
    '세대생략 증여',
    '손주 증여 할증',
    '세대생략 할증과세 30%',
    '조부모 손자 증여',
    '세대생략 증여 절세',
    '손주 증여재산공제',
    '상속세및증여세법 57조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '세대생략 증여 할증과세 2026' }],
    title: '세대생략 증여 할증과세 2026, 손주 증여 30% 할증',
    description:
      '조부모가 손주에게 바로 증여하면 30% 할증(미성년+20억 초과 40%). 그래도 유리한 이유와 계산법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '세대생략 증여 할증과세 2026',
    description: '손주 증여 30% 할증(미성년 20억 초과 40%). 그래도 절세되는 이유. 상증세법 §57.',
  },
};

const FAQ_ITEMS = [
  {
    question: '세대생략 증여가 무엇인가요?',
    answer:
      '세대생략 증여는 조부모가 중간의 자녀(부모) 세대를 건너뛰고 손주에게 바로 재산을 증여하는 것을 말합니다. 원래 재산은 조부모→자녀→손주로 두 번 이동하며 두 번 과세되지만, 조부모→손주로 바로 넘기면 한 번만 과세됩니다. 이 차이를 조정하기 위해 세대를 건너뛴 증여에는 할증과세가 붙습니다(상속세및증여세법 §57).',
  },
  {
    question: '세대생략 증여는 왜 30% 할증되나요?',
    answer:
      '중간 세대를 생략해 과세 횟수가 한 번 줄어드는 만큼을 보정하기 위해서입니다(상증세법 §57①). 조부모가 자녀에게 증여하고 자녀가 다시 손주에게 증여하면 증여세를 두 번 내지만, 곧바로 손주에게 주면 한 번만 냅니다. 이 형평을 맞추기 위해 산출세액의 30%를 가산합니다.',
  },
  {
    question: '할증률이 40%가 되는 경우는 언제인가요?',
    answer:
      '증여받는 손주가 미성년자이면서 증여재산가액이 20억원을 초과하는 경우 할증률이 40%로 올라갑니다(상증세법 §57①). 어린 손주에게 거액을 한 번에 몰아주는 경우를 더 무겁게 과세하려는 취지입니다. 성년 손주이거나 20억원 이하이면 할증률은 30%입니다.',
  },
  {
    question: '30% 할증을 하고도 손주 증여가 유리한 이유는?',
    answer:
      '한 세대를 건너뛰면 향후 상속·증여 단계가 한 번 줄기 때문입니다. 조부모→자녀→손주로 두 번 넘길 때 내는 총 증여세보다, 30% 할증을 감수하고 한 번에 넘기는 편이 총 세부담이 적은 경우가 많습니다. 다만 자녀의 재산 상황, 상속 계획에 따라 결과가 달라지므로 사례별 비교가 필요합니다.',
  },
  {
    question: '손주에게 증여할 때 공제는 얼마인가요?',
    answer:
      '직계존속이 직계비속에게 증여할 때의 증여재산공제가 적용됩니다(상증세법 §53). 성년 손주는 10년간 5,000만원, 미성년 손주는 10년간 2,000만원까지 공제됩니다. 다만 이 한도는 부모·조부모 등 직계존속 전체를 합산한 금액이므로, 이미 부모에게 증여받았다면 남은 한도만 사용할 수 있습니다.',
  },
  {
    question: '세대생략 할증이 적용되지 않는 예외가 있나요?',
    answer:
      '있습니다. 증여자의 자녀(즉 손주의 부모)가 이미 사망하여 손주가 대습(代襲) 지위로 증여받는 경우에는 할증과세를 하지 않습니다(상증세법 §57① 단서). 부모가 없어 부득이하게 조부모가 손주를 부양·증여하는 상황까지 할증하는 것은 형평에 맞지 않기 때문입니다.',
  },
  {
    question: '손주 증여도 상속세 합산 대상인가요?',
    answer:
      '조부모가 사망하면 상속개시일 전 5년 이내에 상속인이 아닌 자(손주 등)에게 증여한 재산은 상속재산에 합산됩니다(상증세법 §13). 상속인(자녀)에게 증여한 재산은 10년, 손주 등 비상속인은 5년으로 합산 기간이 짧다는 점이 세대생략 증여의 또 다른 장점입니다.',
  },
  {
    question: '증여세 신고는 언제까지 하나요?',
    answer:
      '증여받은 날이 속하는 달의 말일부터 3개월 이내에 신고·납부해야 합니다(상증세법 §68). 기한 내에 신고하면 별도 세액공제는 폐지되었지만, 무신고 시 무신고가산세(20%)와 납부지연가산세가 붙으므로 기한을 지키는 것이 중요합니다.',
  },
];

export default function GenerationSkippingGiftSurcharge2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '세대생략 증여 할증과세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '세대생략 증여 할증과세 2026, 손주 증여 30% 할증과 절세',
    description:
      '조부모가 손주에게 바로 증여하면 30% 할증(미성년+20억 초과 40%). 세대생략 할증 계산, 증여재산공제, 절세 효과와 예외까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['세대생략 증여', '할증과세', '손주 증여', '증여재산공제', '상속세및증여세법 57조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '세대생략 증여 할증과세 2026',
    description: '손주 증여 30% 할증(미성년 20억 초과 40%) 계산법과 절세 효과, 예외를 정리.',
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
                    { name: '세대생략 증여 할증과세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자산 이전 계획 · 8분 읽기 · 2026-07-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  세대생략 증여 할증과세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">손주에게 바로 증여, 30% 할증의 진실</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 자녀를 건너뛰고 손주에게 재산을 물려주려는 조부모와 그 가족을 위한 것입니다. 세대를 건너뛴 증여에는 증여세 산출세액의 30%(경우에 따라 40%)가 할증됩니다. 그런데도 왜 많은 자산가가 손주 증여를 택하는지, 할증을 감수하고도 절세가 되는 구조와 정확한 계산을 예시와 함께 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-generation-skipping-gift-surcharge-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세대생략 증여란 무엇인가</h2>
                <p>
                  세대생략 증여는 조부모가 중간의 자녀 세대를 생략하고 손주에게 직접 증여하는 것입니다. 재산이 조부모→자녀→손주로 두 단계로 넘어가면 증여세가 두 번 부과되지만, 조부모→손주로 한 번에 넘기면 한 번만 과세됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">할증과세의 기본 원리 (상증세법 §57)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    세대를 건너뛰어 과세 횟수가 한 번 줄어드는 만큼을 보정합니다.
                    <br />
                    · 일반: 산출세액 × 30% 가산
                    <br />
                    · 손주가 미성년 + 증여재산 20억 초과: 산출세액 × 40% 가산
                    <br />
                    → 최종 증여세 = 산출세액 + 할증액
                  </p>
                </div>
                <p className="mt-4">
                  즉 할증은 세율 자체를 올리는 것이 아니라, 정상적으로 계산한 증여세(산출세액)에 30% 또는 40%를 얹는 방식입니다. 증여재산공제와 누진세율은 일반 증여와 동일하게 먼저 적용한 뒤, 마지막에 할증을 더합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">할증률 30%와 40%, 어떻게 구분하나요?</h2>
                <p>
                  기본 할증률은 30%이며, 특정 요건을 모두 충족할 때만 40%로 올라갑니다. 아래 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 세대생략 증여 할증률 (상속세및증여세법 §57①)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">수증자 조건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">증여재산가액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">할증률</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">성년 손주</td>
                        <td className="p-3">금액 무관</td>
                        <td className="p-3"><strong>30%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">미성년 손주</td>
                        <td className="p-3">20억원 이하</td>
                        <td className="p-3"><strong>30%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">미성년 손주</td>
                        <td className="p-3">20억원 초과</td>
                        <td className="p-3"><strong>40%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부모 사망 후 대습 손주</td>
                        <td className="p-3">금액 무관</td>
                        <td className="p-3"><strong>할증 없음</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 여기서 "직계비속"에는 손주뿐 아니라 증손주도 포함되며, 세대를 두 단계 이상 건너뛰어도 할증률은 동일하게 적용됩니다. 20억원 판정은 해당 증여 건의 증여재산가액을 기준으로 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세대생략 증여 실제 계산 사례</h2>
                <p>
                  성년 손주에게 현금 3억원을 증여하는 경우와, 자녀를 거쳐 두 번 증여하는 경우를 비교해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 성년 손주에게 3억원 직접 증여</p>
                  <p className="text-sm text-text-secondary">
                    · 증여재산: 3억원 / 증여재산공제(성년 직계비속): 5,000만원
                    <br />
                    · 과세표준 = 3억 − 5,000만 = 2억 5,000만원
                    <br />
                    · 산출세액 = 2억 5,000만 × 20% − 누진공제 1,000만 = 4,000만원
                    <br />
                    · 할증액 = 4,000만 × 30% = 1,200만원
                    <br />
                    · 최종 증여세 = 4,000만 + 1,200만 = <strong>5,200만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">누진세율(상증세법 §56): 1억 이하 10%, 5억 이하 20%(누진공제 1,000만).</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 자녀를 거쳐 두 번 증여 (비교용)</p>
                  <p className="text-sm text-text-secondary">
                    · ① 조부모→성년 자녀 3억 증여: (3억 − 5,000만) × 20% − 1,000만 = 4,000만원
                    <br />
                    · ② 자녀→성년 손주 남은 금액 증여: 다시 공제·누진세율 적용해 추가 증여세 발생
                    <br />
                    · 두 단계 합계는 사례 1의 5,200만원보다 커지는 경우가 일반적
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 30% 할증을 내도 한 번에 손주에게 넘기는 편이 총 세부담이 낮을 수 있습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 이는 단순 비교이며, 자녀가 이미 보유한 재산 규모, 향후 상속 계획, 증여 시점에 따라 결과가 달라집니다. 거액 증여는 반드시 세무 전문가와 시뮬레이션한 뒤 결정하세요.
                </p>
              </section>

              <AdSlot slot="guide-generation-skipping-gift-surcharge-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">손주 증여의 또 다른 장점, 상속 합산 기간</h2>
                <p>
                  세대생략 증여는 할증을 감수하는 대신 상속세 합산 기간이 짧다는 이점이 있습니다. 상속개시일(사망) 이전 증여재산을 상속세에 합산할 때, 상속인에게 준 재산은 10년, 손주 등 상속인이 아닌 자에게 준 재산은 5년 이내분만 합산합니다(상증세법 §13).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 사전증여재산 상속세 합산 기간 (상증세법 §13)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">수증자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">합산 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상속인(자녀·배우자)</td>
                        <td className="p-3"><strong>10년</strong></td>
                        <td className="p-3">10년 내 증여분 상속재산에 합산</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비상속인(손주 등)</td>
                        <td className="p-3"><strong>5년</strong></td>
                        <td className="p-3">5년만 지나면 합산 제외</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  즉 조부모가 건강할 때 손주에게 미리 증여하고 5년이 지나면, 그 재산은 상속세 계산에서 빠집니다. 다만 이 전략은 건강·수명이라는 불확실성을 전제로 하므로, 증여 시기와 규모를 신중히 정해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">세대생략 증여 시 주의할 점</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>증여재산공제 합산:</strong> 손주가 이미 부모에게 증여받아 공제 한도를 썼다면, 조부모 증여에서 남은 한도만 공제됩니다. 직계존속 전체를 합산해 성년 5,000만원·미성년 2,000만원입니다.</li>
                  <li><strong>취득세·자금출처:</strong> 부동산을 손주에게 증여하면 증여취득세가 별도로 발생하고, 미성년 손주 명의 취득은 자금출처 조사 대상이 될 수 있습니다.</li>
                  <li><strong>대습 요건 확인:</strong> 할증 제외(대습)는 부모가 실제로 사망한 경우에 한합니다. 부모가 생존해 있으면 이혼·별거 등과 무관하게 할증이 적용됩니다.</li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여액·관계를 입력해 증여세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자·직계존비속별 10년 공제 한도.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-10-year-prior-gift-aggregation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 사전증여 합산</div>
                    <p className="mt-1 text-sm text-text-secondary">10년·5년 합산 기간의 원리를 자세히.</p>
                  </Link>
                  <Link
                    href="/guide/marriage-childbirth-gift-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">혼인·출산 증여공제</div>
                    <p className="mt-1 text-sm text-text-secondary">1억원 추가 공제로 자녀 증여 절세.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속 vs 증여 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">어느 쪽이 유리한지 상황별로 판단.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여세·상속세·양도세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 세대생략 증여의 할증 여부, 증여재산공제 잔여 한도, 상속 합산 여부는 가족 관계와 증여 이력에 따라 달라지므로 세무대리인·관할 세무서 또는 홈택스에서 반드시 확인하세요. 본 콘텐츠는 2026-07-21 기준이며 세법 개정 시 업데이트됩니다. 근거 법조항은 <strong>상속세및증여세법 §57(직계비속에 대한 증여의 할증과세)·§53(증여재산공제)·§56(증여세율)·§13(상속세 과세가액)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="세대생략 증여 할증과세 2026 가이드"
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
