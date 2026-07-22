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

const URL = 'https://calculatorhost.com/guide/comprehensive-real-estate-tax-single-house-credit-2026/';
const DATE_PUBLISHED = '2026-07-01';
const DATE_MODIFIED = '2026-07-01';

export const metadata: Metadata = {
  title: '종합부동산세 1세대1주택 세액공제 2026 | 고령자·장기보유 최대 80%',
  description:
    '종합부동산세 1세대1주택 세액공제 — 고령자 공제(20~40%) + 장기보유 공제(20~50%) 중복 적용, 합산 한도 80%. 세액공제 계산 공식·사례·부부공동명의 특례.',
  keywords: [
    '종합부동산세 세액공제',
    '1세대1주택 세액공제',
    '고령자 세액공제',
    '장기보유 세액공제',
    '종합부동산세법 9조',
    '종부세 세액공제',
    '부부공동명의 종부세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종합부동산세 1세대1주택 세액공제 2026' }],
    title: '종합부동산세 1세대1주택 세액공제 2026 — 고령자·장기보유 세액공제 완전 정리',
    description: '고령자와 장기보유 세액공제를 중복 적용받아 최대 80%까지 세액을 줄일 수 있습니다. 정확한 계산법과 사례를 모두 담았습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합부동산세 1세대1주택 세액공제 2026',
    description: '고령자·장기보유 중복 공제, 최대 80% 한도 적용 완벽 가이드.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종합부동산세에서 1세대1주택 세액공제를 받을 수 있나요?',
    answer:
      '네, 1세대1주택 단독명의자(또는 부부공동명의 특례 신청자)는 고령자 세액공제와 장기보유 세액공제를 받을 수 있습니다(종합부동산세법 §9). 다만 다주택자나 법인은 대상에서 제외됩니다.',
  },
  {
    question: '고령자 세액공제와 장기보유 세액공제를 동시에 받을 수 있나요?',
    answer:
      '네, 두 공제를 중복 적용받을 수 있습니다. 예를 들어 70세 이상이면서 15년 이상 보유하면 40%+50%=90%이지만, 법에서 정한 한도인 80%까지만 적용됩니다.',
  },
  {
    question: '70세 이상이면 고령자 세액공제가 40% 맞나요?',
    answer:
      '맞습니다. 고령자 세액공제는 만 60세 이상 65세 미만 20%, 65세 이상 70세 미만 30%, 70세 이상 40%입니다(종합부동산세법 §9 시행령). 생년월일 기준이 아니라 종부세 부과 기준년도의 1월 1일 현재 연령입니다.',
  },
  {
    question: '장기보유 세액공제는 보유 기간이 5년부터인가요?',
    answer:
      '네, 5년 이상 10년 미만 보유 시 20%, 10년 이상 15년 미만 시 40%, 15년 이상 시 50% 공제받습니다(종합부동산세법 §9). 5년 미만은 공제 대상이 아닙니다.',
  },
  {
    question: '부부 공동명의로 등기된 주택도 1세대1주택 공제를 받나요?',
    answer:
      '부부공동명의는 법령상 2주택자로 봐 기본 1세대1주택 공제 대상이 아닙니다. 하지만 종부세법 §10의2 "부부 공동명의 주택 특례"를 신청하면 1세대1주택으로 간주되어 공제를 받을 수 있습니다. 신청 기간은 9월 중입니다.',
  },
  {
    question: '세액공제 한도가 80%라면 최대 절감액이 정해지나요?',
    answer:
      '세액공제가 산출세액의 80%로 한정되므로, 결국 실제 납부할 종부세는 산출세액의 20% 이상은 되어야 합니다. 예를 들어 산출 종부세가 1,000만원이면 최대 공제 800만원, 최소 납부 200만원입니다.',
  },
  {
    question: '공정시장가액비율 60% 적용 후에 세액공제를 하나요?',
    answer:
      '네, 순서는 공시가격 → 공정시장가액비율(60%) → 공제기준금액(12억) 차감 → 과세표준 → 세율 적용 → 산출세액 산정 → 세액공제 순입니다. 세액공제는 산출세액에 대해 적용되므로, 공제기준금액보다 뒤에 계산됩니다.',
  },
  {
    question: '1세대1주택을 처분했는데 그 다음해에는 어떻게 되나요?',
    answer:
      '주택 처분 후 신규 주택을 매입하면 신규 주택이 1세대1주택으로 재인정됩니다. 처분한 주택의 세액공제는 마지막 부과 연도까지만 적용되며, 그 다음 연도부터는 신규 주택 기준으로 새로 계산됩니다.',
  },
];

export default function ComprehensiveRealEstateTaxSingleHouseCreditPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종합부동산세 1세대1주택 세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합부동산세 1세대1주택 세액공제 2026 — 고령자·장기보유 공제 완전 정리',
    description:
      '1세대1주택 단독명의자가 받을 수 있는 고령자 세액공제와 장기보유 세액공제. 두 공제의 중복 적용, 합산 한도 80%, 정확한 계산 공식과 사례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합부동산세', '세액공제', '1세대1주택', '고령자', '장기보유', '종부세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합부동산세 1세대1주택 세액공제 2026',
    description: '1세대1주택 고령자·장기보유 세액공제의 정확한 계산 방법과 사례.',
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
                    { name: '종합부동산세 1세대1주택 세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">1주택 소유자 · 11분 읽기 · 2026-07-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종합부동산세 1세대1주택 세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 고령자·장기보유 최대 80% 세액공제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  종합부동산세를 낼 때 1세대1주택이면 고령자 세액공제와 장기보유 세액공제를 받을 수 있습니다. 특히 두 공제를 중복으로 받으면 최대 80%까지 세액을 줄일 수 있어, 최종 납부액이 크게 달라집니다. 이 가이드에서는 두 공제의 정확한 기준·계산 공식·중복 적용 방법과 함께, 부부공동명의 특례까지 완벽하게 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-comprehensive-real-estate-tax-single-house-credit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1세대1주택 세액공제란</h2>
                <p>
                  종합부동산세법 §9에 따른 1세대1주택 세액공제는 1세대가 보유한 1주택의 소유자에게 부여하는 조세 우대 제도입니다. 다주택자에 비해 1주택만 보유한 국민의 세 부담을 덜어주기 위한 정책입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">1세대1주택 세액공제 핵심</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 1세대1주택 단독명의자 (또는 부부공동명의 특례 신청자)
                    <br />
                    · 고령자 공제: 연령별로 20~40% 차감
                    <br />
                    · 장기보유 공제: 보유 기간에 따라 20~50% 차감
                    <br />
                    · 중복 적용: 두 공제 합산, 단 최대 한도는 80%
                    <br />
                    · 근거법: 종합부동산세법 §9, 시행령 등
                  </p>
                </div>
                <p className="mt-4">
                  즉, 고령자이면서 오래 보유한 1세대1주택의 경우, 산출된 종부세의 80%까지 세액을 깎을 수 있다는 의미입니다. 이는 종부세 정책의 핵심 감면 수단이므로 정확히 이해하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">고령자 세액공제 기준 및 공제율</h2>
                <p>
                  고령자 세액공제는 1세대1주택 소유자의 연령에 따라 공제율이 달라집니다(종합부동산세법 §9, 시행령 제6조). 기준이 되는 연령은 종부세 부과 기준년도의 1월 1일 현재입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 고령자 세액공제율 (종합부동산세법 §9, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연령 (기준년도 1월 1일 현재)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세액공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">60세 이상 65세 미만</td>
                        <td className="p-3"><strong>20%</strong></td>
                        <td className="p-3">산출세액의 20% 감면</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">65세 이상 70세 미만</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">산출세액의 30% 감면</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">70세 이상</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">산출세액의 40% 감면</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  연령이 높을수록 공제율이 높다는 점에 주목하세요. 70세 이상이면 기본 40% 공제를 받으므로, 추가로 장기보유 공제를 받으면 두 공제가 합산됩니다.
                </p>
                <p className="mt-4">
                  다만 연령 확인 기준은 부과 기준년도의 1월 1일입니다. 예를 들어 2026년 종부세 부과 기준년도는 2025년이므로, 2025년 1월 1일 현재 연령을 적용합니다. 따라서 생일이 1월 2일 이후라면 신년을 기준으로 공제율이 바뀐다는 점도 유의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">장기보유 세액공제 기준 및 공제율</h2>
                <p>
                  장기보유 세액공제는 1세대1주택을 오래 보유한 소유자에게 주어지는 공제입니다(종합부동산세법 §9). 주택의 취득 시점부터 공제 기준년도까지의 보유 기간에 따라 공제율이 결정됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 장기보유 세액공제율 (종합부동산세법 §9, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보유 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세액공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5년 이상 10년 미만</td>
                        <td className="p-3"><strong>20%</strong></td>
                        <td className="p-3">산출세액의 20% 감면</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10년 이상 15년 미만</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">산출세액의 40% 감면</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">15년 이상</td>
                        <td className="p-3"><strong>50%</strong></td>
                        <td className="p-3">산출세액의 50% 감면</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  보유 기간은 주택 취득일부터 공제 기준년도 말까지를 기준으로 계산합니다. 예를 들어 2016년 5월에 취득한 주택이라면, 2026년 종부세 부과 시점(기준년도 2025년)에는 약 9년 8개월의 보유 기간이 되어 20% 공제를 받습니다.
                </p>
                <p className="mt-4">
                  다만 보유 기간이 5년 미만이면 장기보유 세액공제를 받을 수 없습니다. 또한 주택을 처분했다가 다시 취득한 경우, 처분 전 보유 기간과 재취득 후 보유 기간을 구분하여 계산하므로 주의가 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">두 공제의 중복 적용 및 80% 한도</h2>
                <p>
                  1세대1주택 세액공제의 가장 중요한 특징은 고령자 공제와 장기보유 공제를 동시에 적용받을 수 있다는 점입니다(종합부동산세법 §9). 다만 합산 공제율의 상한이 80%로 제한됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">중복 적용의 원칙</p>
                  <p className="text-sm text-text-secondary">
                    실제 세액공제율 = min(고령자 공제율 + 장기보유 공제율, 80%)
                    <br />
                    <br />
                    예시:
                    <br />
                    • 70세 + 15년 보유 = min(40% + 50%, 80%) = <strong>80%</strong> (한도 적용)
                    <br />
                    • 70세 + 10년 보유 = min(40% + 40%, 80%) = <strong>80%</strong> (한도 적용)
                    <br />
                    • 65세 + 5년 보유 = min(30% + 20%, 80%) = <strong>50%</strong> (한도 미만)
                  </p>
                </div>
                <p className="mt-4">
                  80% 한도의 의미는 최소한 산출 종부세의 20% 이상은 납부해야 한다는 뜻입니다. 아무리 고령자이고 오래 보유했더라도 세액의 80%까지만 공제받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세액공제 계산의 정확한 순서</h2>
                <p>
                  1세대1주택 세액공제를 정확히 계산하려면 다음 순서를 따라야 합니다. 각 단계에서의 계산 오류는 최종 납부액 오류로 이어집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 순서 (종합부동산세법 §8~§9)</p>
                  <ol className="text-sm text-text-secondary space-y-2 ml-4 list-decimal">
                    <li>공시가격 확정 (시도지사 고시)</li>
                    <li>공정시장가액비율 60% 적용 → 공시가격 × 60%</li>
                    <li>공제기준금액(12억) 차감 → (공시가격 × 60%) − 12억원</li>
                    <li>과세표준 산정 (음수면 0, 양수면 그 금액)</li>
                    <li>세율 적용 → 과세표준 × 세율(0.5~2.7%)</li>
                    <li>산출세액 산정</li>
                    <li><strong>세액공제 적용 → 산출세액 × (1 − 공제율)</strong></li>
                    <li>최종 납부 종부세액 산정</li>
                  </ol>
                </div>
                <p className="mt-4">
                  핵심은 세액공제가 "과세표준"이 아니라 "산출세액"에 대해 적용된다는 점입니다. 따라서 공제기준금액으로 과세표준을 줄인 후 세율을 적용한 뒤에야 공제를 계산합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세액공제 계산 사례 (3가지)</h2>
                <p>
                  다음 3가지 사례를 통해 1세대1주택 세액공제의 실제 계산을 알아봅시다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 62세, 8년 보유 (고령자 20% + 장기보유 20% = 40%)</p>
                  <p className="text-sm text-text-secondary">
                    · 공시가격: 15억 원
                    <br />
                    · 공정시장가액비율(60%) 적용: 15억 × 60% = 9억 원
                    <br />
                    · 공제기준금액(12억) 차감: 9억 − 12억 = −3억 (음수이므로 과세표준 = 0)
                    <br />
                    · 산출세액: 0원 (과세표준이 0이므로 세액도 0)
                    <br />
                    · 세액공제 적용: 0 × 40% = 0원 감면
                    <br />
                    · <strong>최종 납부 종부세: 0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 공시가 15억인 1주택이면 공제기준금액(12억)과 공정시장가액비율로 인해 과세 대상 자체가 없어 공제 적용 여지가 없습니다. 1세대1주택의 가장 강력한 감면입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 72세, 12년 보유 (고령자 40% + 장기보유 40% = 80% 한도)</p>
                  <p className="text-sm text-text-secondary">
                    · 공시가격: 25억 원
                    <br />
                    · 공정시장가액비율(60%) 적용: 25억 × 60% = 15억 원
                    <br />
                    · 공제기준금액(12억) 차감: 15억 − 12억 = 3억 원 (과세표준)
                    <br />
                    · 세율 적용(1.0%, 2주택 이하): 3억 × 1.0% = 3,000만 원 (산출세액)
                    <br />
                    · 세액공제율: min(40% + 40%, 80%) = 80%
                    <br />
                    · 세액공제액: 3,000만 × 80% = 2,400만 원 감면
                    <br />
                    · <strong>최종 납부 종부세: 3,000만 − 2,400만 = 600만 원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 산출세액 3,000만원 중 80% 한도로 2,400만원을 공제받아 600만원만 납부합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 68세, 20년 보유 (고령자 30% + 장기보유 50% = 80% 한도)</p>
                  <p className="text-sm text-text-secondary">
                    · 공시가격: 30억 원
                    <br />
                    · 공정시장가액비율(60%) 적용: 30억 × 60% = 18억 원
                    <br />
                    · 공제기준금액(12억) 차감: 18억 − 12억 = 6억 원 (과세표준)
                    <br />
                    · 세율 적용(1.0%, 2주택 이하): 6억 × 1.0% = 6,000만 원 (산출세액)
                    <br />
                    · 세액공제율: min(30% + 50%, 80%) = 80%
                    <br />
                    · 세액공제액: 6,000만 × 80% = 4,800만 원 감면
                    <br />
                    · <strong>최종 납부 종부세: 6,000만 − 4,800만 = 1,200만 원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 30% + 50% = 80%로 정확히 한도에 도달하며, 공시 30억원 1주택의 최종 납부액은 1,200만원입니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부부공동명의 주택의 특례 (§10의2)</h2>
                <p>
                  부부가 공동으로 주택을 등기한 경우, 법령상 2주택자로 취급되어 기본적으로는 1세대1주택 세액공제 대상이 아닙니다. 하지만 종합부동산세법 §10의2 특례를 신청하면 1세대1주택으로 간주받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">부부공동명의 특례 신청 조건</p>
                  <p className="text-sm text-text-secondary">
                    · 부부가 1주택을 공동으로 소유 (합의분할, 균등분할 등)
                    <br />
                    · 부부 외에 다른 주택이 없음
                    <br />
                    · 신청 기간: 통상 9월 중 (매년 기한 고지)
                    <br />
                    · 신청처: 관할 시·군·구 세무서
                  </p>
                </div>
                <p className="mt-4">
                  특례를 신청하면 부부공동명의 주택도 1세대1주택으로 인정되어, 고령자 공제와 장기보유 공제를 받을 수 있습니다. 다만 신청하지 않으면 다주택자로 분류되어 감면이 크게 줄어듭니다.
                </p>
                <p className="mt-4">
                  다만 특례 신청은 매년 해야 하며, 신청 기한을 놓치면 그 연도에는 특례를 받을 수 없습니다. 또한 부부 중 한 명이 사망하면 특례 적용이 변경될 수 있으므로, 변화가 있을 때마다 세무서에 신고하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세액공제가 적용되지 않는 경우들</h2>
                <p>
                  다음과 같은 경우에는 1세대1주택 세액공제를 받을 수 없거나 제한될 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>다주택자:</strong> 1세대가 2주택 이상을 보유하면 공제 대상이 아닙니다. 각 주택별로 다주택 세율이 적용됩니다.
                  </li>
                  <li>
                    <strong>법인 소유:</strong> 법인이 주택을 소유하면 공제를 받을 수 없습니다. 종부세는 개인 단위로 부과됩니다.
                  </li>
                  <li>
                    <strong>주택 처분 후 신규 취득 대기 중:</strong> 주택을 처분했는데 아직 새 주택을 취득하지 않았다면, 처분된 주택의 마지막 부과 연도까지만 공제가 적용됩니다.
                  </li>
                  <li>
                    <strong>별도로 취득한 부동산이 있는 경우:</strong> 주택 외에 상가, 토지 등 다른 종부세 대상 부동산을 따로 소유하면, 1세대 범위의 판단이 복잡해질 수 있습니다.
                  </li>
                  <li>
                    <strong>부부공동명의인데 특례 미신청:</strong> 부부공동명의 주택은 특례를 신청해야만 1주택으로 인정됩니다. 미신청 시 2주택으로 취급됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 1세대1주택 판단은 개별 상황에 따라 복잡할 수 있으므로, 특수한 경우라면 반드시 관할 세무서에 직접 문의하여 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세액공제 적용 확인 및 이의신청</h2>
                <p>
                  자신의 주택에 정확한 세액공제가 적용되는지, 그리고 최종 종부세액이 올바르게 계산되었는지 확인하는 방법을 알아봅시다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 종부세 고지서 확인</p>
                  <p className="text-sm text-text-secondary">
                    매년 11월경 받는 종부세 고지서에는 산출세액, 세액공제 내역, 최종 납부액 등이 명시되어 있습니다. "1세대1주택 세액공제" 또는 "고령자 공제 40%" 같은 표기를 찾아 실제 공제가 제대로 적용되었는지 확인하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 위택스(wetax.go.kr) 조회</p>
                  <p className="text-sm text-text-secondary">
                    위택스에 개인 계정으로 로그인 후 "종합부동산세 조회"에 들어가면, 공시가격, 과세표준, 산출세액, 세액공제액, 최종 납부액이 모두 표시됩니다. 특히 산출세액과 공제율, 공제액을 세세하게 확인할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 3. 관할 세무서 문의</p>
                  <p className="text-sm text-text-secondary">
                    종부세 고지서의 세액공제가 잘못되었다고 생각되면, 관할 시·도세무서에 직접 문의하거나 방문하여 상세히 설명받을 수 있습니다. 연령·보유 기간·공시가 등을 다시 확인해주며, 계산 오류가 있다면 경정청구를 도와줍니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 4. 경정청구 및 이의신청</p>
                  <p className="text-sm text-text-secondary">
                    고지 후 1년 이내에 세액이 잘못 계산되었다면 경정청구를 할 수 있습니다. 또한 고지 후 90일 이내에 세무서장에게 이의신청할 수 있으며, 그 후에도 행정소송으로 진행할 수 있습니다. 세액공제 계산 오류는 통상 경정청구 대상이므로, 증거 자료를 준비하여 신청하세요.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-comprehensive-real-estate-tax-single-house-credit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">세액공제와 다른 종부세 감면 제도의 관계</h2>
                <p>
                  1세대1주택 세액공제 외에도 종부세를 줄일 수 있는 다양한 제도가 있습니다. 이들의 관계를 이해하면 세무 계획을 더 잘 세울 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>공제기준금액(12억):</strong> 모든 1세대1주택이 받는 기본 감면입니다. 세액공제와는 별개로, 과세표준 산정 단계에서 공시가격에서 차감됩니다.
                  </li>
                  <li>
                    <strong>공시가격 이의신청:</strong> 공시가격이 실제 시세보다 높다고 생각되면 고시 후 60일 내에 이의신청할 수 있습니다. 이를 통해 공시가 자체를 낮추면 과세표준과 산출세액이 모두 감소하므로, 세액공제보다 근본적인 절세 수단입니다.
                  </li>
                  <li>
                    <strong>주택마련저축 관련 과세 특례:</strong> 특정 저축액이 있다면 별도의 과세 우대가 있을 수 있습니다(소득세 영역).
                  </li>
                </ul>
                <p className="mt-4">
                  가장 효과적인 종부세 절감은 공시가 이의신청 → 공제기준금액 차감 → 세액공제 순서로 여러 제도를 조합하는 것입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 세액공제 적용의 주의점</h2>
                <p>
                  2026년 종부세 부과 시(기준년도 2025년) 세액공제를 올바르게 받기 위해 주의할 점들을 정리했습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>연령 기준 재확인:</strong> 2026년 종부세 부과 기준년도는 2025년입니다. 따라서 고령자 공제율은 2025년 1월 1일 현재 연령을 기준으로 합니다. 생일이 1월 2일 이후라면 신년을 기점으로 공제율이 바뀐다는 점을 기억하세요.
                  </li>
                  <li>
                    <strong>부부공동명의 특례 재신청:</strong> 매년 9월경 부부공동명의 특례를 신청할 기한이 고지됩니다. 지난해 신청했더라도 올해도 다시 신청해야 합니다.
                  </li>
                  <li>
                    <strong>보유 기간 재계산:</strong> 취득일부터 기준년도 말까지의 보유 기간을 정확히 계산하세요. 1년 단위로만 공제율이 결정되므로, 9년 11개월 보유는 20% 공제만 받습니다.
                  </li>
                  <li>
                    <strong>공시가 변동 점검:</strong> 공시가격이 크게 인상된 경우, 이의신청을 함께 고려해보세요. 세액공제보다 공시가 인하가 더 큰 절세 효과를 가져올 수 있습니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/comprehensive-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가격을 입력하여 최종 납부액까지 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가·공제기준금액·세율·누진공제 기본 정리.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-joint-ownership-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종부세 부부공동명의 특례 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">부부공동명의 1세대1주택 인정 신청 절차 및 효과.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-who-pays-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 납세의무자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">1세대 구분·다주택 판정·납세의무 기준.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-vs-comprehensive-real-estate-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 vs 종합부동산세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">두 세목의 차이·중복 과세·납부 시기 완벽 정리.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기 및 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 세액공제율 적용, 공제 대상 판정, 최종 종부세액은 관할 시·도세무서 또는 위택스에서 반드시 확인하세요. 특히 부부공동명의, 특례 신청, 연령 기준 등이 복잡한 경우 직접 문의하는 것이 안전합니다. 본 콘텐츠는 2026-07-01을 기준으로 작성되었으며, 종합부동산세법 개정 시 즉시 업데이트됩니다. 세액공제의 정확한 기준은 <strong>종합부동산세법 §9(세액공제)</strong>, <strong>§10의2(부부공동명의 특례)</strong>, <strong>§8(공제기준금액)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 종합부동산세</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스 종부세 안내</a>.
                </p>
              </section>

              <ShareButtons
                title="종합부동산세 1세대1주택 세액공제 2026 가이드"
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
