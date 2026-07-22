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

// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 검색 의도 흡수)

const URL = 'https://calculatorhost.com/guide/stress-dsr-stage3-2026/';
const DATE_PUBLISHED = '2026-07-23';
const DATE_MODIFIED = '2026-07-23';

export const metadata: Metadata = {
  title: '스트레스 DSR 3단계 2026, 내 대출한도 얼마나 줄까 | calculatorhost',
  description:
    '스트레스 DSR 3단계는 실제 금리에 스트레스 금리 1.5%p를 더해 대출한도를 계산합니다. 2026년 전국 확대 적용으로 줄어드는 한도, 계산 방식, 예외 대출을 사례로 정리했습니다.',
  keywords: [
    '스트레스 DSR 3단계',
    '스트레스 DSR 2026',
    '스트레스 금리 1.5%',
    'DSR 대출한도',
    '주담대 한도 축소',
    '스트레스 DSR 계산',
    '가계부채 관리방안',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '스트레스 DSR 3단계 2026, 내 대출한도 얼마나 줄까' }],
    title: '스트레스 DSR 3단계 2026, 대출한도가 줄어드는 이유와 계산법',
    description: '실제 금리에 1.5%p를 더해 한도를 산정하는 스트레스 DSR 3단계. 전국 확대 적용과 줄어드는 한도를 사례로 이해하세요.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '스트레스 DSR 3단계 2026, 대출한도 계산법',
    description: '실제 금리 + 스트레스 금리 1.5%p로 한도 산정. 2026년 전국 확대 적용.',
  },
};

const FAQ_ITEMS = [
  {
    question: '스트레스 DSR 3단계란 무엇인가요?',
    answer:
      '스트레스 DSR은 앞으로 금리가 오를 위험을 미리 반영해 대출한도를 보수적으로 계산하는 제도입니다. 실제 대출금리에 일정한 스트레스 금리를 더해 원리금 상환 부담을 산정하므로, 같은 소득이라도 한도가 줄어듭니다. 3단계는 이 제도의 마지막 단계로, 2025년 7월 1일부터 시행되어 2026년 현재 전 금융권 가계대출에 적용되고 있습니다.',
  },
  {
    question: '스트레스 금리 1.5%p는 어떻게 적용되나요?',
    answer:
      '3단계에서는 기본 스트레스 금리(하한 1.5%p)의 100%가 한도 계산에 반영됩니다. 예를 들어 실제 대출금리가 연 4.5%라면 여기에 1.5%p를 더한 6.0%를 기준으로 원리금 상환액을 계산해 DSR을 산정합니다. 스트레스 금리는 이자를 더 내는 것이 아니라 한도를 계산할 때만 쓰이는 가상의 가산금리입니다.',
  },
  {
    question: '스트레스 DSR 3단계로 내 대출한도는 얼마나 줄어드나요?',
    answer:
      '대출 유형과 만기에 따라 다르지만 수천만 원 단위로 줄어들 수 있습니다. 변동금리 대출일수록 스트레스 금리 반영률이 커서 한도 축소폭이 크고, 고정(주기형) 금리는 상대적으로 축소폭이 작습니다. 정확한 감소액은 소득, 기존 대출, 만기, 금리 유형에 따라 달라지므로 은행 창구나 금융감독원 금융소비자 정보포털에서 개별 확인이 필요합니다.',
  },
  {
    question: '비수도권도 이제 스트레스 금리 1.5%p가 적용되나요?',
    answer:
      '네, 2026년 하반기부터 비수도권 주택담보대출에도 3단계 기준이 적용됩니다. 비수도권 주담대는 한시적으로 2단계 스트레스 금리가 유예 적용되어 왔으나 유예가 종료되면서, 지역과 무관하게 스트레스 금리 1.5%p 체계로 통일되는 방향입니다. 신용대출 등 기타 대출은 이전부터 지역과 무관하게 적용되어 왔습니다. 유예 종료 시점은 금융위원회 발표를 확인하세요.',
  },
  {
    question: 'DSR 40% 규제와 스트레스 DSR은 어떻게 함께 계산되나요?',
    answer:
      'DSR 40%는 연소득 대비 연간 원리금 상환액 비율의 상한이고, 스트레스 DSR은 그 원리금을 계산할 때 쓰는 금리를 높이는 장치입니다. 즉 스트레스 금리로 부풀린 원리금이 연소득의 40%(은행권 기준)를 넘지 않도록 한도가 정해집니다. 두 규제가 곱해지는 것이 아니라, 스트레스 금리로 계산한 원리금에 DSR 상한을 적용하는 순서로 작동합니다.',
  },
  {
    question: '스트레스 DSR이 적용되지 않는 대출도 있나요?',
    answer:
      '네, 전세자금대출, 중도금·이주비 대출, 서민·정책금융상품 등 일부 대출은 스트레스 DSR 적용에서 제외되거나 완화됩니다. 또한 대출 총액이 소액이거나 DSR 규제 대상이 아닌 상품도 있습니다. 다만 제외 범위는 정책에 따라 바뀔 수 있으므로, 본인 대출이 대상인지 여부는 취급 은행에 확인하는 것이 정확합니다.',
  },
  {
    question: '대출한도를 덜 줄이려면 어떻게 해야 하나요?',
    answer:
      '금리 유형과 만기 구조를 조정하면 스트레스 금리 반영률이 달라집니다. 순수 변동금리보다 고정(주기형)이나 혼합형 금리를 선택하면 스트레스 금리 반영 비율이 낮아 한도 축소폭이 작아지는 경향이 있습니다. 다만 이는 한도 계산상의 차이이며 실제 이자 부담과 금리 전망은 별개이므로, 상품 선택은 본인 상환계획과 금리 상황을 함께 고려해야 합니다.',
  },
  {
    question: '스트레스 DSR은 앞으로 더 강해지나요?',
    answer:
      '3단계가 스트레스 DSR의 마지막 단계입니다. 1단계(2024년), 2단계를 거쳐 3단계에서 스트레스 금리 100% 반영으로 완성되었으므로 단계 자체가 추가되지는 않습니다. 다만 스트레스 금리의 하한(1.5%p)이나 적용 범위는 가계부채 상황에 따라 조정될 수 있으므로, 금융위원회의 가계부채 관리방안 발표를 주기적으로 확인하는 것이 좋습니다.',
  },
];

export default function StressDsrStage3_2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '스트레스 DSR 3단계 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '스트레스 DSR 3단계 2026, 대출한도가 줄어드는 이유와 계산법',
    description:
      '실제 금리에 스트레스 금리 1.5%p를 더해 대출한도를 계산하는 스트레스 DSR 3단계. 2026년 전국 확대 적용, 줄어드는 한도, 예외 대출, 한도 관리 방법을 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['스트레스 DSR', '3단계', '스트레스 금리', '대출한도', 'DSR'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '스트레스 DSR 3단계 2026',
    description:
      '스트레스 DSR 3단계의 계산 방식, 2026년 전국 확대 적용, 대출한도 축소폭을 사례로 정리한 가이드.',
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
                    { name: '스트레스 DSR 3단계 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 구입·대출 예정자 · 8분 읽기 · 2026-07-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  스트레스 DSR 3단계 2026
                  <br />
                  <span className="text-2xl text-text-secondary">내 대출한도는 얼마나 줄어들까</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 사려고 대출을 알아보다 보면 "스트레스 DSR 3단계 때문에 한도가 줄었다"는 말을 자주 듣습니다. 이 가이드는 대출을 앞둔 실수요자를 위해 스트레스 DSR이 무엇인지, 스트레스 금리 1.5%p가 어떻게 한도를 낮추는지, 2026년 전국 확대 적용으로 실제 한도가 얼마나 줄어드는지를 계산 사례와 함께 쉽게 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-stress-dsr-stage3-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">스트레스 DSR 3단계란 무엇인가요?</h2>
                <p>
                  스트레스 DSR은 미래 금리 상승 위험을 미리 반영해 대출한도를 보수적으로 계산하는 제도입니다. 실제 금리가 오르면 상환 부담이 커지므로, 한도를 정할 때 가상의 가산금리(스트레스 금리)를 더해 상환 능력을 엄격하게 봅니다.
                </p>
                <p>
                  3단계는 이 제도의 마지막 단계입니다. 2024년 1단계, 이후 2단계를 거쳐 2025년 7월 1일 3단계가 시행되었고, 2026년 현재 전 금융권 가계대출에 적용되고 있습니다. 스트레스 금리 반영률이 단계마다 올라가 3단계에서 100%가 반영됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">스트레스 DSR의 핵심</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    한도 계산 금리 = 실제 대출금리 + 스트레스 금리(하한 1.5%p, 3단계 100% 반영)
                    <br />
                    이 금리로 계산한 연간 원리금이 연소득의 DSR 상한(은행권 40%)을 넘지 않도록 한도가 정해집니다.
                  </p>
                </div>
                <p>
                  다만 스트레스 금리는 실제로 더 내는 이자가 아니라 한도를 계산할 때만 쓰이는 값입니다. 대출 실행 후 실제 이자는 계약한 금리로 부과됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">스트레스 금리 1.5%p는 어떻게 적용되나요?</h2>
                <p>
                  3단계에서는 스트레스 금리 하한 1.5%p가 온전히 반영됩니다. 실제 대출금리가 연 4.5%라면 한도 계산에는 6.0%를 적용해 원리금을 산정합니다.
                </p>
                <p>
                  같은 스트레스 금리라도 대출의 금리 유형에 따라 반영 비율이 달라집니다. 순수 변동금리는 금리 변동 위험이 크므로 스트레스 금리를 가장 많이 반영하고, 혼합형이나 주기형(고정)은 반영 비율이 낮습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 금리 유형별 스트레스 금리 반영 경향(개념 설명)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">금리 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">스트레스 금리 반영</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">한도 영향</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">변동금리</td>
                        <td className="p-3">가장 많이 반영</td>
                        <td className="p-3">한도 축소 큼</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">혼합형</td>
                        <td className="p-3">중간</td>
                        <td className="p-3">한도 축소 중간</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주기형(고정)</td>
                        <td className="p-3">가장 적게 반영</td>
                        <td className="p-3">한도 축소 작음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  주의: 위 표는 반영 경향을 설명한 것으로, 정확한 반영률과 산식은 은행업감독규정과 각 금융회사 내규를 따릅니다. 실제 적용 금리는 취급 은행에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3단계로 내 대출한도는 얼마나 줄어드나요?</h2>
                <p>
                  대출 유형과 만기에 따라 수천만 원 단위로 줄어들 수 있습니다. 아래는 이해를 돕기 위한 가정 사례로, 실제 한도는 소득·기존대출·만기에 따라 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 연소득 1억 원, 30년 만기, 실제 금리 4.2% 가정</p>
                  <p className="text-sm text-text-secondary">
                    · 변동금리: 2단계 약 5억 9,000만 원에서 3단계 약 5억 7,000만 원으로 약 2,000만 원 감소
                    <br />
                    · 혼합형: 2단계 약 6억 3,000만 원에서 3단계 약 5억 9,000만 원으로 약 4,000만 원 감소
                    <br />
                    <span className="text-xs text-text-tertiary">위 수치는 언론·금융권 시뮬레이션을 인용한 가정치이며, 실제 승인 한도와 다를 수 있습니다.</span>
                  </p>
                </div>
                <p>
                  이처럼 스트레스 DSR은 금리 유형에 따라 한도 차이를 만듭니다. 정확한 본인 한도는 은행 창구, 또는 금융감독원 금융소비자 정보포털(파인)에서 개별 조회하는 것이 정확합니다.
                </p>
                <p>
                  다만 한도가 줄었다고 해서 반드시 최대한 빌려야 하는 것은 아닙니다. 스트레스 DSR은 금리 상승기에 상환 능력을 보수적으로 보려는 안전장치라는 취지도 함께 이해하는 것이 좋습니다.
                </p>
              </section>

              <AdSlot slot="guide-stress-dsr-stage3-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비수도권도 이제 1.5%p가 적용되나요?</h2>
                <p>
                  2026년 하반기부터 비수도권 주택담보대출에도 3단계 기준이 확대 적용됩니다. 그동안 비수도권 주담대는 한시적으로 2단계 스트레스 금리가 유예 적용되어 한도 축소가 상대적으로 작았습니다.
                </p>
                <p>
                  이 유예가 종료되면서 지역과 무관하게 스트레스 금리 1.5%p 체계로 통일되는 방향입니다. 신용대출을 비롯한 기타 가계대출은 이전부터 지역 구분 없이 적용되어 왔습니다.
                </p>
                <p>
                  예외: 유예 종료의 정확한 시점과 지역별 적용 방식은 금융위원회 발표에 따라 달라질 수 있으므로, 비수도권 주택 구입을 계획 중이라면 대출 실행 직전에 최신 기준을 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">스트레스 DSR이 적용되지 않는 대출</h2>
                <p>
                  모든 대출에 스트레스 DSR이 적용되는 것은 아닙니다. 실수요·서민 지원 성격의 일부 대출은 제외되거나 완화됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>전세자금대출:</strong> 원칙적으로 DSR 산정에서 제외되는 경우가 많습니다. 다만 정책 변화에 따라 일부 반영될 수 있습니다.
                  </li>
                  <li>
                    <strong>중도금·이주비 대출:</strong> 분양 관련 집단대출은 스트레스 DSR 적용 방식이 일반 주담대와 다릅니다.
                  </li>
                  <li>
                    <strong>서민·정책금융상품:</strong> 디딤돌·버팀목 등 기금 대출과 서민금융상품은 별도 기준이 적용됩니다.
                  </li>
                  <li>
                    <strong>소액·단기 대출:</strong> DSR 규제 대상이 아닌 소액 대출은 스트레스 금리가 적용되지 않을 수 있습니다.
                  </li>
                </ul>
                <p>
                  주의: 제외 범위는 가계부채 정책에 따라 수시로 조정됩니다. 본인 대출이 대상인지 여부는 취급 금융회사에 반드시 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/loan-limit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">DSR 대출한도 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득·기존대출을 입력해 대출 가능액을 시뮬레이션하세요.</p>
                  </Link>
                  <Link
                    href="/guide/dsr-dti-ltv-difference-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">DSR·DTI·LTV 차이 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세 가지 대출 규제 지표의 개념을 한 번에 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/interest-rate-hike-dsr-loan-limit-july-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금리 인상과 DSR 한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">금리가 오르면 한도가 어떻게 변하는지 살펴보세요.</p>
                  </Link>
                  <Link
                    href="/guide/mortgage-fixed-vs-variable-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">고정금리 vs 변동금리 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">금리 유형 선택이 한도와 이자에 주는 영향을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/newborn-special-mortgage-loan-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신생아 특례 디딤돌대출 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">스트레스 DSR과 별개인 정책 기금 대출을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">원리금 상환액을 만기·금리별로 계산해보세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 특정 대출상품 추천이나 금융 자문이 아닙니다. 본문의 한도 수치는 언론·금융권 시뮬레이션을 인용한 가정치로 실제 승인 한도와 다를 수 있습니다. 스트레스 금리 반영률, 지역별 적용, 예외 대출 범위는 금융위원회 가계부채 관리방안과 은행업감독규정, 각 금융회사 내규에 따라 달라지므로, 실제 대출은 취급 은행과 금융감독원 금융소비자 정보포털(파인)에서 확인하세요. 본 콘텐츠는 2026-07-23을 기준으로 작성되었으며, 정책 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.fsc.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융위원회</a>,{' '}
                  <a href="https://www.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원</a>,{' '}
                  <a href="https://fine.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융소비자 정보포털 파인</a>.
                </p>
              </section>

              <ShareButtons
                title="스트레스 DSR 3단계 2026, 내 대출한도 얼마나 줄까"
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
