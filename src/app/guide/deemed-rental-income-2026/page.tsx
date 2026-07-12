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

const URL = 'https://calculatorhost.com/guide/deemed-rental-income-2026/';
const DATE_PUBLISHED = '2026-07-13';
const DATE_MODIFIED = '2026-07-13';

export const metadata: Metadata = {
  title: '간주임대료 2026, 3주택·보증금 3억 초과 전세보증금 과세',
  description:
    '전세보증금도 3주택 이상이면서 합계 3억원을 초과하면 간주임대료로 과세됩니다. 계산식(보증금 초과분 × 60% × 정기예금이자율), 소형주택 제외, 신고 방법을 소득세법 §25로 정리합니다.',
  keywords: [
    '간주임대료',
    '전세보증금 과세',
    '3주택 간주임대료',
    '보증금 3억 초과',
    '주택임대소득 신고',
    '소형주택 제외',
    '소득세법 25조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '간주임대료 2026 3주택 보증금 3억 초과 전세보증금 과세' }],
    title: '간주임대료 2026, 전세보증금에 붙는 세금 완전정리',
    description: '3주택 이상·보증금 합계 3억 초과 시 전세보증금도 간주임대료로 과세. 계산식과 소형주택 제외 규정을 정확히.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '간주임대료 2026, 전세보증금에 붙는 세금',
    description: '3주택 이상·보증금 3억 초과 전세보증금 간주임대료 과세. (보증금-3억)×60%×정기예금이자율. 소득세법 §25.',
  },
};

const FAQ_ITEMS = [
  {
    question: '간주임대료가 정확히 무엇인가요?',
    answer:
      '간주임대료는 전세·보증금을 받은 임대인에게 월세를 받은 것으로 간주해 매기는 세금 대상 수입입니다(소득세법 §25). 월세는 실제 임대료로 과세되지만, 전세보증금은 그 자체가 소득이 아니므로 이자 상당액을 임대료로 환산해 총수입금액에 포함시키는 것입니다.',
  },
  {
    question: '전세보증금은 모두 간주임대료로 과세되나요?',
    answer:
      '아닙니다. 주택은 부부 합산 3주택 이상이면서 보증금 합계가 3억원을 초과할 때만 과세됩니다(소득세법 §25). 1주택(고가주택 제외)이나 2주택 보유자의 전세보증금은 간주임대료 대상이 아닙니다. 상가 등 비주거용은 별도 기준이 적용됩니다.',
  },
  {
    question: '간주임대료는 어떻게 계산하나요?',
    answer:
      '간주임대료 = (보증금 합계 - 3억원) × 60% × 정기예금이자율입니다(소득세법 시행령 §53). 여기서 3억원은 보증금 적수가 큰 주택부터 차감합니다. 정기예금이자율은 매년 기획재정부가 고시하며, 2025년 귀속은 3.5%, 2026년 귀속은 3.1%로 고시됐습니다.',
  },
  {
    question: '소형주택은 왜 제외되나요?',
    answer:
      '주거 전용면적 40㎡ 이하이면서 기준시가 2억원 이하인 소형주택은 주택 수와 보증금 계산에서 제외됩니다(소득세법 시행령 §53). 서민 주거용 소형 임대를 위축시키지 않기 위한 특례로, 2026년 12월 31일까지 적용됩니다. 소형주택이 여러 채여도 이 요건을 충족하면 3주택 판정에서 빠집니다.',
  },
  {
    question: '3억원은 주택마다 각각 빼주나요?',
    answer:
      '아닙니다. 3억원은 전체 보증금 합계에서 딱 한 번만 공제합니다. 보증금 적수(보증금 × 임대일수)가 가장 큰 주택 순서대로 3억원을 차감하므로, 보증금이 큰 주택부터 우선 공제돼 세부담을 낮춥니다. 주택별로 3억씩 빼주는 것이 아니라는 점을 주의하세요.',
  },
  {
    question: '월세와 전세를 함께 받으면 어떻게 되나요?',
    answer:
      '월세는 실제 받은 임대료로, 전세보증금은 간주임대료로 각각 계산해 합산합니다. 예를 들어 한 채는 월세, 두 채는 전세라면 월세 수입 + 전세 3채 기준(3주택 이상)의 간주임대료를 더해 주택임대소득을 산정합니다. 연 2,000만원 이하면 분리과세(14%)를 선택할 수 있습니다.',
  },
  {
    question: '간주임대료는 언제 신고하나요?',
    answer:
      '주택임대소득은 다음해 5월 종합소득세 신고 때 함께 신고합니다. 임대수입(월세 + 간주임대료) 합계가 연 2,000만원 이하면 14% 분리과세와 종합과세 중 선택할 수 있고, 초과하면 종합과세됩니다. 홈택스 주택임대소득 간편신고 또는 모의계산으로 세액을 미리 확인할 수 있습니다.',
  },
  {
    question: '간주임대료 이자율은 매년 바뀌나요?',
    answer:
      '네, 정기예금이자율은 기획재정부가 매년 고시하므로 변동합니다. 최근에는 2025년 귀속 3.5%, 2026년 귀속 3.1%로 고시됐습니다. 신고 대상 과세연도에 맞는 고시 이자율을 적용해야 하므로, 신고 전 국세청·홈택스에서 해당 연도 이자율을 반드시 확인하세요.',
  },
];

export default function DeemedRentalIncome2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '간주임대료 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '간주임대료 2026, 전세보증금에 붙는 세금 완전정리',
    description:
      '3주택 이상·보증금 합계 3억 초과 시 전세보증금에 매기는 간주임대료. 계산식(초과분 × 60% × 정기예금이자율), 소형주택 제외, 적수 차감, 5월 신고까지 소득세법 §25 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['간주임대료', '전세보증금 과세', '3주택', '주택임대소득', '소형주택 제외'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '간주임대료 2026',
    description:
      '3주택·보증금 3억 초과 전세보증금 간주임대료 계산식과 소형주택 제외, 신고 방법 정리.',
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
                    { name: '간주임대료 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임대인 · 8분 읽기 · 2026-07-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  간주임대료 2026
                  <br />
                  <span className="text-2xl text-text-secondary">전세보증금에도 붙는 임대소득세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  월세는 소득이니 세금을 낸다지만, 전세보증금은 돌려줄 돈인데 왜 세금이 붙을까요. 바로 간주임대료 때문입니다. 보증금을 굴려 얻는 이자 상당액을 임대료로 간주해 과세하는 제도인데, 3주택 이상이면서 보증금이 3억원을 넘는 임대인이 대상입니다. 이 가이드는 간주임대료의 대상, 계산식, 소형주택 제외, 그리고 5월 신고 방법을 소득세법 조문으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-deemed-rental-income-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간주임대료란 무엇인가</h2>
                <p>
                  간주임대료는 전세·보증금을 받은 임대인이 그 돈을 운용해 얻는 이자 상당액을 임대료로 간주해 총수입금액에 넣는 제도입니다(소득세법 §25). 월세를 받으면 실제 임대료로 과세되는데, 전세만 받으면 과세할 임대료가 없어집니다. 이 형평을 맞추기 위해 보증금을 임대료로 환산하는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">과세 대상 요건 (주택)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 부부 합산 3주택 이상 보유
                    <br />
                    · 보증금 합계가 3억원을 초과
                    <br />
                    → 두 요건을 모두 충족할 때만 전세보증금이 간주임대료로 과세
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 1주택(고가주택 제외)이나 2주택 보유자의 전세보증금은 과세 대상이 아닙니다. 즉 대부분의 일반 임대인은 간주임대료와 무관하며, 다주택 전세 임대인에게 적용되는 규정입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계산식은 어떻게 되나</h2>
                <p>
                  간주임대료는 보증금 합계에서 3억원을 뺀 금액의 60%에 정기예금이자율을 곱해 구합니다(소득세법 시행령 §53). 3억원 공제와 60%만 반영하는 구조라 실제 세부담은 생각보다 완만합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기본 산식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    간주임대료 = (보증금 합계 - 3억원) × 60% × 정기예금이자율
                    <br />
                    · 3억원은 보증금 적수가 큰 주택부터 차감
                    <br />
                    · 정기예금이자율: 기획재정부 매년 고시 (2025년 귀속 3.5%, 2026년 귀속 3.1%)
                    <br />
                    · 실무에서는 일수(적수)로 안분 계산
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 정기예금이자율은 매년 바뀌므로, 신고하는 과세연도에 맞는 고시 이자율을 적용해야 합니다. 아래 사례는 2025년 귀속 3.5%를 기준으로 하며, 실제 신고 시에는 해당 연도 고시 이자율을 국세청에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간주임대료 계산 사례</h2>
                <p>
                  다음 사례로 보증금 규모에 따라 간주임대료가 어떻게 달라지는지 살펴보겠습니다. (2025년 귀속 이자율 3.5%, 1년 임대 기준)
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 3주택, 보증금 합계 5억원</p>
                  <p className="text-sm text-text-secondary">
                    · 보증금 초과분: 5억원 - 3억원 = 2억원
                    <br />
                    · 간주임대료: 2억원 × 60% × 3.5% = <strong>420만원</strong>
                    <br />
                    · 이 420만원이 주택임대소득 총수입금액에 포함
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 5억 전세 3채여도 실제 과세 수입은 420만원 수준.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 3주택, 보증금 합계 3억원 (경계값)</p>
                  <p className="text-sm text-text-secondary">
                    · 보증금 초과분: 3억원 - 3억원 = 0원
                    <br />
                    · 간주임대료: 0원 × 60% × 3.5% = <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 3주택이어도 보증금이 딱 3억이면 초과분이 없어 과세되지 않는다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 4주택, 보증금 합계 8억원</p>
                  <p className="text-sm text-text-secondary">
                    · 보증금 초과분: 8억원 - 3억원 = 5억원
                    <br />
                    · 간주임대료: 5억원 × 60% × 3.5% = <strong>1,050만원</strong>
                    <br />
                    · 다른 월세 수입과 합쳐 연 2,000만원 이하면 14% 분리과세 선택 가능
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 보증금이 클수록 간주임대료도 비례해 늘지만, 60%·이자율 반영으로 완만.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-deemed-rental-income-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소형주택은 왜 빠지나</h2>
                <p>
                  주거 전용면적 40㎡ 이하이면서 기준시가 2억원 이하인 소형주택은 주택 수와 보증금 계산에서 제외됩니다(소득세법 시행령 §53). 서민 주거용 소형 임대를 위축시키지 않으려는 특례로, 2026년 12월 31일까지 적용됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 소형주택 제외 요건 (소득세법 시행령 §53)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주거전용면적</td>
                        <td className="p-3"><strong>40㎡ 이하</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기준시가</td>
                        <td className="p-3"><strong>2억원 이하</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">두 요건</td>
                        <td className="p-3">모두 충족 시 주택 수·보증금에서 제외</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">적용 기한</td>
                        <td className="p-3">2026년 12월 31일까지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 면적과 기준시가 두 요건을 모두 충족해야 제외됩니다. 40㎡ 이하라도 기준시가가 2억원을 넘으면 소형주택으로 인정되지 않아 주택 수에 포함됩니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">간주임대료에서 놓치기 쉬운 함정</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>부부 합산:</strong> 주택 수는 부부 합산으로 판정합니다. 배우자 명의 주택을 빼고 계산하면 실질과세 원칙(국세기본법 §14)에 따라 추징될 수 있습니다.
                  </li>
                  <li>
                    <strong>3억 공제 오해:</strong> 3억원은 주택마다가 아니라 전체 보증금 합계에서 한 번만 뺍니다. 주택별로 각각 3억을 빼면 세액이 과소 계산됩니다.
                  </li>
                  <li>
                    <strong>이자율 착오:</strong> 과세연도별 고시 이자율이 다릅니다. 옛 이자율로 계산하면 신고가 틀어지니 해당 연도 고시율을 확인하세요.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/housing-rental-income-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택임대소득 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">연 2,000만원 이하 14% 분리과세 요건.</p>
                  </Link>
                  <Link
                    href="/calculator/rental-yield/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임대수익률 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세 실투자금 대비 연수익률 계산.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세를 서로 환산해 비교.</p>
                  </Link>
                  <Link
                    href="/guide/lease-report-system-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 신고제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금·월세 기준 30일 내 신고 의무.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-who-pays-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 누가 내나</div>
                    <p className="mt-1 text-sm text-text-secondary">다주택 보유 시 종부세 대상과 세율.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세·중개수수료·임대수익률 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 간주임대료 과세 여부, 정기예금이자율(과세연도별 기획재정부 고시), 소형주택 제외, 적수 계산은 개인 상황에 따라 달라지므로 홈택스 모의계산 또는 세무 전문가와 반드시 확인하세요. 본 콘텐츠는 2026-07-13 기준으로 작성되었으며, 소득세법 개정 및 이자율 고시 변경 시 업데이트됩니다. 인용 조문: <strong>소득세법 §25(총수입금액 계산의 특례), 시행령 §53(간주임대료), 국세기본법 §14(실질과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="간주임대료 2026 가이드"
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
