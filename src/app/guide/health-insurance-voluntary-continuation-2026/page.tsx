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

const URL = 'https://calculatorhost.com/guide/health-insurance-voluntary-continuation-2026/';
const DATE_PUBLISHED = '2026-07-15';
const DATE_MODIFIED = '2026-07-15';
// 수익 레버 [revenue-lever: indexing+traffic]: 신규 색인 페이지 추가, 롱테일 트래픽 유입

export const metadata: Metadata = {
  title: '건강보험 임의계속가입 2026, 퇴직 후 36개월 보험료 폭탄 막기',
  description:
    '퇴직하면 지역가입자로 바뀌며 재산·자동차까지 보험료에 반영돼 폭탄을 맞기 쉽습니다. 국민건강보험법 §110 임의계속가입으로 최대 36개월간 직장가입자 수준 보험료를 유지하는 요건과 신청기한을 정리합니다.',
  keywords: [
    '건강보험 임의계속가입',
    '퇴직 후 건강보험료',
    '지역가입자 보험료 폭탄',
    '임의계속가입 신청기한',
    '국민건강보험법 110조',
    '퇴직 건강보험',
    '임의계속 36개월',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '건강보험 임의계속가입 2026, 퇴직 후 36개월 보험료 폭탄 막기' }],
    title: '건강보험 임의계속가입 2026, 퇴직 후 보험료 폭탄 막는 법',
    description: '퇴직 전 18개월 중 직장가입 1년 이상이면 최대 36개월 직장 수준 보험료 유지. 국민건강보험법 §110.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '건강보험 임의계속가입 2026, 퇴직 후 보험료 절감',
    description: '퇴직 후 지역보험료 폭탄을 막는 임의계속가입. 최대 36개월, 국민건강보험법 §110. 신청기한 유의.',
  },
};

const FAQ_ITEMS = [
  {
    question: '임의계속가입이 정확히 무엇인가요?',
    answer:
      '임의계속가입은 퇴직 후 지역가입자로 전환되면서 보험료가 급증하는 것을 막기 위해, 최대 36개월간 직장가입자 수준의 보험료를 유지할 수 있게 해주는 제도입니다(국민건강보험법 §110). 퇴직 전 다니던 회사에서 본인이 부담하던 보험료와 비슷한 수준으로 낼 수 있어, 재산·자동차·소득이 종합 반영되는 지역보험료보다 유리한 경우가 많습니다.',
  },
  {
    question: '누가 신청할 수 있나요?',
    answer:
      '퇴직(사용관계 종료) 전 18개월 동안 직장가입자 자격을 통산 1년 이상 유지한 사람이 신청할 수 있습니다. 여러 직장을 옮겨 다녔더라도 그 기간을 합산해 1년 이상이면 됩니다. 반대로 직장 재직 기간이 1년에 못 미치면 임의계속가입 대상이 아닙니다.',
  },
  {
    question: '신청 기한은 언제까지인가요?',
    answer:
      '퇴직 후 지역가입자가 되어 처음으로 지역보험료 고지서를 받은 날의 납부기한에서 2개월이 지나기 전까지 신청해야 합니다. 이 기한을 넘기면 임의계속가입을 신청할 수 없으므로, 퇴직 직후 첫 지역보험료 고지서를 받으면 곧바로 유불리를 따져 신청 여부를 결정하는 것이 중요합니다.',
  },
  {
    question: '얼마 동안 유지할 수 있나요?',
    answer:
      '퇴직한 날의 다음 날부터 기산해 최대 36개월까지 유지할 수 있습니다. 이 기간이 끝나면 자동으로 지역가입자로 전환됩니다. 36개월은 재취업이나 피부양자 등재 등 다른 방법을 준비할 시간을 벌어주는 완충 기간으로 이해하면 됩니다.',
  },
  {
    question: '보험료는 어떻게 계산되나요?',
    answer:
      '임의계속 보험료는 퇴직 이전 12개월간의 보수월액을 평균한 금액을 기준으로 산정합니다. 재산과 자동차를 반영하는 지역보험료와 달리 근로소득 기준이므로, 자가·자동차 등 재산이 많은 사람일수록 임의계속가입이 유리합니다. 정확한 금액은 국민건강보험공단에서 산정해 안내하므로 신청 전에 두 금액을 비교하세요.',
  },
  {
    question: '피부양자로 등재되는 것과 비교하면 무엇이 나은가요?',
    answer:
      '가족의 피부양자로 등재될 수 있다면 보험료가 0원이므로 그것이 가장 유리합니다. 다만 피부양자는 소득·재산 요건이 엄격해 탈락하는 경우가 많습니다. 피부양자 등재가 불가능하고 지역보험료가 부담스럽다면 임의계속가입이 현실적인 차선책입니다.',
  },
  {
    question: '신청 후 보험료를 내지 않으면 어떻게 되나요?',
    answer:
      '임의계속가입 신청 후 최초로 내야 할 보험료를 납부기한부터 2개월이 지날 때까지 내지 않으면 임의계속가입 자격이 상실됩니다. 자격이 상실되면 다시 지역가입자로 전환되므로, 첫 보험료 납부 기한을 반드시 지켜야 합니다.',
  },
  {
    question: '재취업하면 임의계속가입은 어떻게 되나요?',
    answer:
      '재취업해 새 직장의 직장가입자가 되면 임의계속가입 자격은 종료되고 새 회사의 직장가입자로 처리됩니다. 임의계속가입은 어디까지나 직장을 잃은 기간의 보험료 부담을 완화하는 제도이므로, 취업 상태가 회복되면 일반 직장가입 체계로 돌아갑니다.',
  },
];

export default function HealthInsuranceVoluntaryContinuation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '건강보험 임의계속가입 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '건강보험 임의계속가입 2026, 퇴직 후 36개월 보험료 폭탄 막기',
    description:
      '퇴직 후 지역보험료 급증을 막는 임의계속가입. 국민건강보험법 §110 요건, 신청기한, 36개월 유지, 지역보험료와의 비교를 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['건강보험 임의계속가입', '퇴직 건강보험료', '지역가입자', '국민건강보험법 110조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '건강보험 임의계속가입 2026',
    description:
      '퇴직 후 지역보험료 급증을 막는 임의계속가입 제도의 요건, 신청기한, 유지 기간 정리.',
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
                    { name: '건강보험 임의계속가입 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">퇴직·이직자 · 8분 읽기 · 2026-07-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  건강보험 임의계속가입 2026
                  <br />
                  <span className="text-2xl text-text-secondary">퇴직 후 36개월 보험료 폭탄 막기</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  회사를 그만두면 건강보험이 직장가입자에서 지역가입자로 바뀌면서, 그동안 회사가 절반 내주던 보험료를 온전히 본인이 부담하게 됩니다. 게다가 집·자동차 같은 재산까지 보험료에 반영되어 보험료가 갑자기 몇 배로 뛰기도 합니다. 이 가이드는 국민건강보험법 §110에 따른 임의계속가입으로 최대 36개월간 직장가입자 수준 보험료를 유지하는 방법을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-health-insurance-voluntary-continuation-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">퇴직하면 보험료가 왜 오르나요?</h2>
                <p>
                  퇴직하면 직장가입자 자격을 잃고 지역가입자로 전환됩니다. 지역보험료는 소득뿐 아니라 주택·토지·자동차 등 재산을 종합적으로 반영해 산정하기 때문에, 자가나 차량을 보유한 사람은 보험료가 급증하기 쉽습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">직장가입자와 지역가입자의 차이</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 직장가입자: 근로소득(보수월액) 기준, 회사와 절반씩 부담
                    <br />
                    · 지역가입자: 소득 더하기 재산 더하기 자동차 종합 반영, 전액 본인 부담
                    <br />
                    · 임의계속가입: 퇴직 전 보수월액 기준으로 최대 36개월 유지
                  </p>
                </div>
                <p className="mt-4">
                  임의계속가입은 바로 이 급격한 전환 충격을 완화하는 제도입니다. 퇴직 전 직장에서 내던 보험료 수준으로 일정 기간 유지할 수 있게 해줍니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 임의계속가입 보험료도 회사 부담분 없이 본인이 내야 하므로, 재직 중 실제 급여 공제액보다는 높을 수 있습니다. 그럼에도 재산이 반영된 지역보험료보다는 낮은 경우가 많아 비교가 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청 자격과 기한은 어떻게 되나요?</h2>
                <p>
                  임의계속가입은 자격 요건과 신청 기한이 명확히 정해져 있습니다. 특히 신청 기한을 놓치면 다시는 신청할 수 없으므로 주의해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 임의계속가입 요건 (국민건강보험법 §110)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">자격 요건</td>
                        <td className="p-3">퇴직 전 18개월 중 직장가입자 자격 통산 1년 이상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신청 기한</td>
                        <td className="p-3">최초 지역보험료 고지 납부기한에서 2개월 지나기 전</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">유지 기간</td>
                        <td className="p-3">퇴직 다음 날부터 최대 36개월</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">보험료 기준</td>
                        <td className="p-3">퇴직 이전 12개월 보수월액 평균</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 신청 후 첫 보험료를 납부기한부터 2개월이 지나도록 내지 않으면 임의계속가입 자격이 상실됩니다. 신청만 하고 납부를 미루면 무효가 되니 주의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임의계속가입이 유리한지 어떻게 판단하나요?</h2>
                <p>
                  임의계속가입은 무조건 유리한 것이 아니라, 지역보험료와 비교해 더 낮을 때 신청해야 합니다. 다음 사례로 판단 기준을 살펴봅니다. (아래 금액은 이해를 돕기 위한 가정치이며 실제 금액은 공단 산정에 따릅니다.)
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 자가·자동차 보유 퇴직자 (임의계속 유리)</p>
                  <p className="text-sm text-text-secondary">
                    · 지역보험료(재산·자동차 반영): 월 약 28만원 (가정)
                    <br />
                    · 임의계속 보험료(퇴직 전 보수월액 기준): 월 약 14만원 (가정)
                    <br />
                    · 월 차액 약 14만원 곱하기 36개월 = 약 <strong>500만원 절감</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 재산이 많아 지역보험료가 높은 경우 임의계속가입이 크게 유리합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 무주택·소득 적은 퇴직자 (지역보험료가 더 낮음)</p>
                  <p className="text-sm text-text-secondary">
                    · 지역보험료: 월 약 8만원 (가정)
                    <br />
                    · 임의계속 보험료: 월 약 13만원 (가정)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 재산이 적어 지역보험료가 오히려 낮다면 임의계속가입을 신청하지 않는 편이 유리합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 배우자 피부양자 등재 가능 (보험료 0원 우선)</p>
                  <p className="text-sm text-text-secondary">
                    · 배우자가 직장가입자이고 소득·재산 요건 충족 시 피부양자 등재
                    <br />
                    · 피부양자 보험료: <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 피부양자 등재가 가능하면 그것이 최우선입니다. 요건 미달로 탈락할 때 임의계속가입을 검토하세요.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-health-insurance-voluntary-continuation-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청은 어떻게 하나요?</h2>
                <p>
                  임의계속가입은 국민건강보험공단을 통해 신청합니다. 절차는 간단하지만 기한이 있으므로 미루지 않는 것이 좋습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>신청처:</strong> 국민건강보험공단 지사 방문, 팩스, 우편, 유선(1577-1000) 또는 The건강보험 앱
                  </li>
                  <li>
                    <strong>필요 서류:</strong> 임의계속가입 신청서(공단 서식), 신분증
                  </li>
                  <li>
                    <strong>시기:</strong> 첫 지역보험료 고지서를 받으면 유불리를 비교한 뒤 기한 내 신청
                  </li>
                  <li>
                    <strong>확인:</strong> 신청 전 공단에 임의계속 예상 보험료를 문의해 지역보험료와 비교
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 신청 기한(최초 지역보험료 납부기한에서 2개월)이 지나면 소급 신청이 되지 않습니다. 퇴직 후 첫 고지서를 받으면 즉시 검토하는 습관이 필요합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/n-jobber-insurance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험료 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득·재산 기준 건강보험료를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-dependent-qualification-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험 피부양자 자격 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">소득·재산 요건과 탈락 기준을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-regional-subscriber-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">지역가입자 건강보험료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">재산·자동차·소득이 어떻게 반영되는지 살펴보세요.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험료율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">직장·지역 보험료율과 장기요양보험료를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 후 받을 수 있는 구직급여 조건과 금액.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로·급여 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·4대보험 계산기.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 조언이 아닙니다. 본문의 보험료 금액은 이해를 돕기 위한 가정치이며, 실제 임의계속 보험료와 지역보험료는 개인의 소득·재산에 따라 달라지므로 국민건강보험공단(1577-1000)에서 반드시 확인하세요. 본 콘텐츠는 2026-07-15 기준으로 작성되었으며, 관련 제도 변경 시 업데이트됩니다. 인용 법조항은 <strong>국민건강보험법 §110(실업자에 대한 특례)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nhis.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민건강보험공단</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons
                title="건강보험 임의계속가입 2026 가이드"
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
