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

const URL = 'https://calculatorhost.com/guide/property-tax-calculation-2026/';
const DATE_PUBLISHED = '2026-06-21';
const DATE_MODIFIED = '2026-06-21';

export const metadata: Metadata = {
  title: '재산세 계산법 2026 | 주택 재산세율·과세표준 가이드 | calculatorhost',
  description:
    '2026년 주택 재산세 정확한 계산법. 과세표준·세율 4구간·누진공제·1세대1주택 특례까지 완전 정리. 지방세법 §111 기준 필수 정보.',
  keywords: [
    '재산세',
    '재산세 계산',
    '재산세 계산법',
    '주택 재산세',
    '재산세율',
    '1세대1주택 특례',
    '과세표준',
    '누진공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '재산세 계산법 2026 | 주택 재산세율·과세표준 가이드 | calculatorhost' }],
    title: '재산세 계산법 2026 — 정확한 세율 & 누진공제',
    description: '주택 재산세의 과세표준부터 최종 납부액까지. 1세대1주택 특례와 지방교육세 포함.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '과세표준이 정확히 무엇인가요?',
    answer:
      '과세표준은 재산세를 계산하는 기준이 되는 가격으로, 주택의 공시가격에 공정시장가액비율을 곱한 값입니다. 예를 들어 공시가격 3억원인 주택의 과세표준은 행정안전부 고시 비율(연도별 상이)을 적용하여 산정됩니다. 시세와 공시가격은 다르며, 과세표준은 공시가격 기반이므로 부동산 시세와 일치하지 않습니다.',
  },
  {
    question: '1세대1주택이면 재산세가 얼마나 줄어드나요?',
    answer:
      '1세대1주택(공시가격 9억원 이하)은 일반세율보다 낮은 특례세율(지방세법 §111의2)을 적용받습니다. 정확한 세율은 지자체와 재산세 계산기로 확인하세요. 특례세율의 구체적 %는 연도·지자체별로 다르므로, "절반 수준"이라는 대략적 안내만 드립니다.',
  },
  {
    question: '공정시장가액비율은 몇 %인가요?',
    answer:
      '공정시장가액비율은 행정안전부가 매년 고시하며, 연도·지역별로 상이합니다. "보통 60% 수준"이라고 하지만, 정확한 값은 행정안전부 고시 또는 해당 시군구 세무서에 문의하세요. 개별 주택의 비율 적용은 감정평가사 평가 결과로도 달라질 수 있습니다.',
  },
  {
    question: '과세기준일이 6월 1일인데, 6월에 주택을 샀으면?',
    answer:
      '과세기준일은 매년 6월 1일입니다. 6월 2일 이후 구매한 주택은 그해 재산세 부과 대상이 아니며, 다음해(내년) 6월 1일 기준으로 처음 과세됩니다. 반대로 5월에 구매한 주택은 올해 6월 1일 기준으로 과세 대상에 포함됩니다.',
  },
  {
    question: '납부 기한이 7월과 9월 분납이라는데, 안 내면?',
    answer:
      '재산세는 지방세이며, 납부 기한은 주택분의 경우 7월, 9월입니다. 납기를 지나면 가산세(1개월 이내 3%, 이후 매월 0.5%+)가 부과되므로, 반드시 기한 내 납부하세요. 개별주택은 납세 통지서가 6월 중순경 우편으로 발송되므로 확인 후 납부하세요.',
  },
  {
    question: '도시지역분이 따로 부과된다는데?',
    answer:
      '주택이 도시지역(지방세법 §112)에 위치하면 일반 재산세 외 추가로 도시지역분이 부과될 수 있습니다. 도시지역분의 세율과 공제는 일반세율과 다르므로, 세무서나 재산세 계산기에서 정확한 금액을 확인하세요. 농촌·산림 지역은 도시지역분 부과 대상이 아닙니다.',
  },
  {
    question: '지방교육세는 별도로 내야 하는 건가요?',
    answer:
      '지방교육세는 재산세 납부액의 20%로 별도 계산되어 추가로 부과됩니다. 예를 들어 재산세가 100만원이면 지방교육세는 20만원 추가이므로, 총 납부액은 120만원입니다. 지자체 납세 통지서에 재산세와 교육세가 각각 표기되니 참고하세요.',
  },
];

export default function PropertyTaxCalculation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 계산법 2026 — 주택 과세표준·세율·누진공제 완벽 정리',
    description:
      '주택 재산세를 정확히 이해하고 계산하는 방법. 과세표준부터 누진공제, 1세대1주택 특례, 지방교육세까지 모두 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세', '계산법', '주택', '세율', '과세표준'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 계산법 2026',
    description:
      '주택 재산세의 과세표준 산정부터 최종 납부액 계산까지. 1세대1주택 특례 및 지방교육세 포함.',
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
                    { name: '재산세 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 소유자 · 9분 읽기 · 2026-06-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 계산법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 과세표준·세율·누진공제 완전 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  매년 6월이면 도착하는 재산세 납세 통지서. 그런데 그 금액이 정확히 어떻게 계산되는지 아는 사람은 많지 않습니다. 과세표준에서 세율을 곱하고, 누진공제를 차감하고, 지방교육세까지 더하는 복잡한 과정이 있거든요. 이 가이드는 주택 재산세의 계산 원리를 단계별로 풀어 설명하고, 1세대1주택 특례와 지방교육세까지 모두 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산세 계산의 기본 공식</h2>
                <p>
                  재산세는 다음과 같은 순서로 계산됩니다:
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">재산세 = 과세표준 × 세율 − 누진공제 + 지방교육세</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    지방교육세 = (재산세액) × 20%
                  </p>
                </div>
                <p>
                  가장 중요한 것은 <strong>과세표준</strong>입니다. 이는 주택의 공시가격에 공정시장가액비율을 곱한 값으로, 세율을 적용하는 기준이 됩니다. 부동산 시세와는 다르므로 주의해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산세 세율 4구간 (지방세법 §111)</h2>
                <p>
                  주택의 과세표준에 따라 누진적으로 세율이 올라갑니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택 일반세율 (지방세법 §111)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">누진공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">6,000만원 이하</td>
                        <td className="p-3">0.1%</td>
                        <td className="p-3">0</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6,000만원 초과 ~ 1.5억원</td>
                        <td className="p-3">0.15%</td>
                        <td className="p-3">3만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1.5억원 초과 ~ 3억원</td>
                        <td className="p-3">0.25%</td>
                        <td className="p-3">18만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3억원 초과</td>
                        <td className="p-3">0.4%</td>
                        <td className="p-3">63만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  누진공제는 계단식 세율 때문에 발생하는 불연속을 없애기 위한 조정값입니다. 예를 들어 과세표준이 6,000만원인 주택과 6,000만원 초과(예: 6,100만원)인 주택의 세액이 급격히 올라가지 않도록 조정해줍니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1세대1주택 특례 (지방세법 §111의2)</h2>
                <p>
                  <strong>공시가격이 9억원 이하</strong>인 1세대1주택이라면 일반세율보다 낮은 특례세율이 적용됩니다. 정확한 특례세율의 비율은 지자체·연도별로 다르며, 일반적으로 일반세율의 절반 수준입니다.
                </p>
                <p className="mt-4">
                  다만 특례세율의 정확한 %는 행정안전부 고시와 지자체 조례에 따라 달라지므로, <strong>재산세 계산기 또는 해당 시군구 세무서</strong>에 직접 확인하시기 바랍니다. 또한 공시가격이 9억원을 초과하면 특례가 적용되지 않으며, 일반세율을 적용받습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">구체적 계산 사례 3가지</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 과세표준 5,000만원 (1세대1주택 아님)</p>
                  <p className="text-sm text-text-secondary">
                    · 세율: 0.1% (6,000만원 이하 구간)
                    <br />
                    · 재산세 = 5,000만 × 0.1% − 0 = <strong>5만원</strong>
                    <br />
                    · 지방교육세 = 5만 × 20% = 1만원
                    <br />
                    · 총 납부액: <strong>6만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 과세표준 1억원 (1세대1주택 아님)</p>
                  <p className="text-sm text-text-secondary">
                    · 세율: 0.15% (6,000만~1.5억 구간)
                    <br />
                    · 재산세 = 1억 × 0.15% − 3만 = <strong>12만원</strong>
                    <br />
                    · 지방교육세 = 12만 × 20% = 2.4만원
                    <br />
                    · 총 납부액: <strong>14.4만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 과세표준 4억원 (1세대1주택 아님)</p>
                  <p className="text-sm text-text-secondary">
                    · 세율: 0.4% (3억 초과 구간)
                    <br />
                    · 재산세 = 4억 × 0.4% − 63만 = <strong>97만원</strong>
                    <br />
                    · 지방교육세 = 97만 × 20% = 19.4만원
                    <br />
                    · 총 납부액: <strong>116.4만원</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">과세기준일 및 납부 시기</h2>
                <p>
                  재산세의 과세기준일은 <strong>매년 6월 1일</strong>입니다. 6월 1일 현재 소유 중인 주택에 대해 그해 재산세가 부과됩니다.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>6월 1일 이전 구입한 주택: 그해 6월 기준 과세 대상</li>
                  <li>6월 2일 이후 구입한 주택: 다음해 6월부터 과세 대상</li>
                </ul>
                <p className="mt-4">
                  주택분 재산세의 <strong>납부 기한</strong>은 7월과 9월입니다(분납). 납세 통지서는 보통 6월 중순경 우편으로 발송되며, 기한을 지나면 가산세(1개월 이내 3%, 이후 매월 0.5%)가 부과되므로 반드시 지정된 기한 내에 납부해야 합니다.
                </p>
                <p className="mt-4">
                  다만 도시지역(지방세법 §112)에 위치한 주택은 추가로 도시지역분이 부과될 수 있으므로, 정확한 납부액은 세무서의 납세 통지서를 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-property-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">재산세 절감 팁</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 1세대1주택 조건 확인:</strong> 공시가격 9억원 이하 1세대1주택이면 특례세율 적용으로 큰 절감 가능. 부부 협의 또는 증여로 명의 정리 검토.
                  </li>
                  <li>
                    <strong>2. 공시가격 이의신청:</strong> 공시가격이 실제 시세보다 높다고 생각되면, 고시가격 공시 후 60일 내에 이의신청 가능. 공정가격을 받아 과세표준 낮춤.
                  </li>
                  <li>
                    <strong>3. 납기 내 납부:</strong> 기한 내 납부로 가산세 방지. 또한 조기 납부 할인이 있을 수 있으니 세무서 문의.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/property-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">이 가이드에서 배운 내용을 직접 입력하여 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/comprehensive-property-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">다주택 보유자를 위한 종합부동산세 계산.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 판매 시 내야 할 양도세를 미리 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/june-property-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">6월 재산세 완벽 준비</div>
                    <p className="mt-1 text-sm text-text-secondary">재산세 고지 직전 필수 체크리스트.</p>
                  </Link>
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 한곳에서.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 5단계 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 판매 시 세율·공제까지 한번에 이해하기.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 재산세 계산은 해당 시군구 세무서 또는 세무사와 상담 후 진행하세요. 본 콘텐츠는 2026-06-21을 기준으로 작성되었으며, 세율 변경 시 즉시 업데이트됩니다. 공정시장가액비율, 도시지역분, 특례세율 등 연도별·지역별 변동사항은 행정안전부 고시, 법조항 <strong>지방세법 §111(주택 세율)·§111의2(1세대1주택 특례)·§112(도시지역분)</strong>, 해당 지자체 조례를 참고하세요. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="재산세 계산법 2026 가이드"
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
