// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/multi-house-acquisition-tax-heavy-8-12-percent-2026/';
const DATE_PUBLISHED = '2026-08-01';
const DATE_MODIFIED = '2026-08-01';

export const metadata: Metadata = {
  title: '다주택자 취득세 중과 2026, 조정 2주택 8%·3주택 12% 정리',
  description:
    '조정대상지역 2주택은 8%, 3주택 이상은 12% 중과 취득세가 적용됩니다. 비조정지역 기준, 일시적 2주택 제외, 지방 공시가 2억 이하 배제까지 지방세법 §13의2 기준으로 정리했습니다.',
  keywords: [
    '다주택자 취득세 중과',
    '취득세 8% 12%',
    '조정대상지역 2주택 취득세',
    '3주택 취득세',
    '일시적 2주택 취득세',
    '지방세법 13조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '다주택자 취득세 중과 2026, 조정 2주택 8%·3주택 12% 정리' }],
    title: '다주택자 취득세 중과 2026, 8%·12% 세율 정리',
    description: '조정대상지역 2주택 8%, 3주택 이상 12%. 비조정지역 기준과 중과 배제 요건까지 지방세법 §13의2로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '다주택자 취득세 중과 2026',
    description: '조정 2주택 8%, 3주택 이상 12% 중과 취득세. 지방세법 §13의2 기준 완전 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '다주택자 취득세 중과세율은 몇 %인가요?',
    answer:
      '조정대상지역에서 2주택은 8%, 3주택 이상은 12%입니다(지방세법 §13의2). 비조정지역은 한 단계 완화되어 3주택이 8%, 4주택 이상이 12%로 적용됩니다. 1주택자는 중과가 아닌 일반세율(가격별 1~3%)이 적용됩니다.',
  },
  {
    question: '조정대상지역과 비조정지역 기준이 왜 다른가요?',
    answer:
      '조정대상지역은 투기 우려가 큰 지역이라 한 채 더 살 때부터 중과가 시작됩니다. 조정지역은 2주택부터 8%, 비조정지역은 3주택부터 8%로 완화됩니다. 지역 지정은 국토교통부가 수시로 변경하므로 취득 시점의 지정 여부가 세율을 좌우합니다.',
  },
  {
    question: '일시적 2주택도 8% 중과가 되나요?',
    answer:
      '아닙니다. 기존 집을 정해진 기간 안에 처분하는 일시적 2주택은 중과에서 제외되어 일반세율(1~3%)이 적용됩니다(지방세법 §13의2). 다만 종전 주택을 기한 내 팔지 못하면 중과세율로 추징될 수 있으므로 처분 기한 관리가 중요합니다.',
  },
  {
    question: '공시가격 낮은 지방 주택도 중과되나요?',
    answer:
      '지방(수도권·광역시·특별자치시 외)의 공시가격 2억원 이하 주택은 주택 수 계산과 중과 대상에서 제외됩니다. 2025년 1월 2일 이후 취득분부터 기준이 1억원에서 2억원으로 완화되어, 소액 지방 주택은 추가 취득해도 중과를 피할 수 있습니다.',
  },
  {
    question: '취득세 외에 추가로 붙는 세금이 있나요?',
    answer:
      '네, 지방교육세와 농어촌특별세가 별도로 부과됩니다. 전용면적 85㎡를 초과하면 농어촌특별세가 추가되며, 지방교육세도 함께 붙습니다. 정확한 부가세목 합계는 위택스(wetax.go.kr)에서 조건을 넣어 확인하는 것이 정확합니다.',
  },
  {
    question: '증여로 받은 주택도 중과 대상인가요?',
    answer:
      '조정대상지역 내 공시가격 3억원 이상 주택을 증여받으면 증여 취득세가 최대 12%까지 중과될 수 있습니다. 유상 매매 중과와는 별도 규정이므로, 증여 취득은 증여 취득세 규정을 따로 확인해야 합니다.',
  },
  {
    question: '주택 수는 세대 단위로 계산하나요?',
    answer:
      '네, 취득세 중과의 주택 수는 개인이 아니라 1세대를 기준으로 합산합니다. 배우자와 미혼 자녀 등 동일 세대원이 보유한 주택을 모두 더해 2주택·3주택 여부를 판단하므로, 세대 분리 여부가 중과 적용에 큰 영향을 줍니다.',
  },
  {
    question: '분양권·입주권도 주택 수에 포함되나요?',
    answer:
      '2020년 8월 12일 이후 취득한 분양권과 조합원입주권은 주택 수에 포함됩니다. 따라서 분양권을 보유한 상태에서 주택을 추가로 사면 중과 판정 시 주택 수가 늘어나므로, 취득 순서와 시점을 함께 따져야 합니다.',
  },
];

export default function MultiHouseAcquisitionTaxHeavy2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '다주택자 취득세 중과 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '다주택자 취득세 중과 2026, 조정 2주택 8%·3주택 12% 세율 정리',
    description:
      '조정대상지역·비조정지역별 다주택 취득세 중과세율(8%·12%), 일시적 2주택 제외, 지방 공시가 2억 이하 배제, 세대 기준 주택 수 계산까지 지방세법 §13의2로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['취득세', '다주택 중과', '8% 12%', '조정대상지역', '지방세법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '다주택자 취득세 중과 2026',
    description:
      '조정·비조정지역별 다주택 취득세 중과세율과 배제 요건을 정리한 실전 가이드.',
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
                    { name: '다주택자 취득세 중과 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 거래 예정자 · 8분 읽기 · 2026-08-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  다주택자 취득세 중과 2026
                  <br />
                  <span className="text-2xl text-text-secondary">조정 2주택 8%, 3주택 이상 12%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 한 채 더 살 때 가장 먼저 확인해야 할 것이 취득세 중과입니다. 1주택일 때는 가격에 따라 1~3%지만, 다주택이 되면 세율이 8%나 12%로 뛰어 수천만원이 더 나올 수 있기 때문입니다. 이 가이드는 조정대상지역과 비조정지역별 중과세율, 일시적 2주택 제외, 지방 저가주택 배제, 세대 기준 주택 수 계산까지 지방세법 §13의2를 기준으로 실거래 관점에서 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">다주택자 취득세 중과세율은 몇 %인가요?</h2>
                <p>
                  조정대상지역 2주택은 8%, 3주택 이상은 12%입니다. 지방세법 §13의2는 투기 목적의 주택 거래를 억제하기 위해 다주택자와 법인이 주택을 유상취득할 때 표준세율에 중과기준세율을 가산하도록 규정합니다. 비조정지역은 한 단계 완화되어 3주택이 8%, 4주택 이상이 12%입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈에 보는 기준</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    조정대상지역: 2주택 8%, 3주택 이상 12%
                    <br />
                    비조정지역: 2주택까지 일반세율(1~3%), 3주택 8%, 4주택 이상 12%
                    <br />
                    법인: 주택 수와 무관하게 12%
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택 수·지역별 세율표 (지방세법 §13의2)</h2>
                <p>
                  같은 다주택이라도 조정대상지역 여부에 따라 시작 시점이 다릅니다. 아래 표는 유상 매매 취득 기준입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택 유상취득 세율 (지방세법 §11·§13의2, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보유 주택 수</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조정대상지역</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비조정지역</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1주택</td>
                        <td className="p-3">1~3% (가격별)</td>
                        <td className="p-3">1~3% (가격별)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2주택</td>
                        <td className="p-3"><strong>8%</strong> (일시적 2주택 제외)</td>
                        <td className="p-3">1~3%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3주택</td>
                        <td className="p-3"><strong>12%</strong></td>
                        <td className="p-3"><strong>8%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4주택 이상·법인</td>
                        <td className="p-3"><strong>12%</strong></td>
                        <td className="p-3"><strong>12%</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  위 세율은 취득세 본세이며, 여기에 지방교육세와 전용면적 85㎡ 초과 시 농어촌특별세가 별도로 더해집니다.
                </p>
                <p className="mt-4">
                  다만 1주택 일반세율은 6억원 이하 1%, 6억 초과 9억 이하 1~3% 구간 비례, 9억 초과 3%로 가격에 따라 달라집니다. 다주택 중과가 적용되면 이 가격별 차등 없이 8% 또는 12% 단일세율이 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일시적 2주택은 중과에서 빠지나요?</h2>
                <p>
                  빠집니다. 이사 등으로 일시적으로 2주택이 된 경우, 종전 주택을 정해진 기한 안에 처분하면 신규 주택에 일반세율(1~3%)이 적용됩니다(지방세법 §13의2). 처음부터 중과 없이 취득하되, 기한 내 처분하지 못하면 중과세율과의 차액이 추징됩니다.
                </p>
                <p>
                  예외: 처분 기한은 조정대상지역 여부와 취득 시점에 따라 달라지며, 기한을 넘기면 가산세까지 붙을 수 있습니다. 종전 주택 매도 계획이 불확실하다면 취득 전 세무 상담으로 기한을 명확히 해두는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중과 취득세 실제 계산 사례</h2>
                <p>
                  같은 6억원 주택이라도 몇 번째 주택이고 어느 지역인지에 따라 취득세 본세가 크게 달라집니다. 전용면적 85㎡ 이하로 농어촌특별세가 없는 경우를 가정한 예시입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 조정지역 첫 주택 6억원 (1주택)</p>
                  <p className="text-sm text-text-secondary">
                    · 세율: 일반세율 (6억원이면 1% 적용 구간)
                    <br />
                    · 취득세 본세: 6억 × 1% = <strong>600만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 여기에 지방교육세가 별도로 붙습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 조정지역 두 번째 주택 6억원 (2주택 중과)</p>
                  <p className="text-sm text-text-secondary">
                    · 세율: 8% 중과
                    <br />
                    · 취득세 본세: 6억 × 8% = <strong>4,800만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 1주택 대비 본세만 4,200만원 더 부담. 지방교육세도 함께 늘어납니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 조정지역 세 번째 주택 6억원 (3주택 중과)</p>
                  <p className="text-sm text-text-secondary">
                    · 세율: 12% 중과
                    <br />
                    · 취득세 본세: 6억 × 12% = <strong>7,200만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 집값이라도 3주택이면 본세만 7,200만원. 취득 순서가 세액을 좌우합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">중과에서 빠지는 경우와 배제 요건</h2>
                <p>
                  모든 추가 주택이 중과되는 것은 아닙니다. 지방세법 §13의2와 시행령은 여러 배제 요건을 두고 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>지방 공시가격 2억원 이하 주택:</strong> 지방의 공시가격 2억원 이하 주택은 주택 수 계산과 중과 대상에서 제외됩니다. 2025년 1월 2일 이후 취득분부터 기준이 1억원에서 2억원으로 완화됐습니다.
                  </li>
                  <li>
                    <strong>일시적 2주택:</strong> 종전 주택을 기한 내 처분하는 조건으로 신규 주택에 일반세율이 적용됩니다.
                  </li>
                  <li>
                    <strong>상속 주택:</strong> 상속으로 취득한 주택은 일정 기간 주택 수 산정에서 제외되는 특례가 있습니다.
                  </li>
                  <li>
                    <strong>비조정지역 2주택:</strong> 조정대상지역이 아니라면 2주택까지는 일반세율이 유지됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 배제 요건은 취득 시점, 지역 지정, 세대 구성에 따라 세부 조건이 복잡하므로, 실질과세 원칙(국세기본법 §14의 취지가 지방세에도 준용)에 따라 형식이 아닌 실제 보유 관계로 판정됩니다. 정확한 적용은 위택스와 관할 시·군·구청에서 확인하세요.
                </p>
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
                    <p className="mt-1 text-sm text-text-secondary">주택 수와 지역을 넣어 취득세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가격별 일반세율과 부가세목의 기본을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택 실수요자의 취득세 감면 요건.</p>
                  </Link>
                  <Link
                    href="/guide/temporary-two-houses-capital-gains-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일시적 2주택 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세 관점의 일시적 2주택 처분 기한.</p>
                  </Link>
                  <Link
                    href="/guide/gift-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여 취득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">증여로 받은 주택의 취득세 중과 기준.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 취득세 중과 여부, 주택 수 산정, 일시적 2주택 처분 기한, 부가세목(지방교육세·농어촌특별세) 합계는 취득 시점의 조정대상지역 지정과 세대 구성에 따라 달라집니다. 반드시 위택스 또는 관할 시·군·구청 세무서에서 확인하세요. 본 콘텐츠의 세율 기준은 <strong>지방세법 §11(취득세 표준세율)</strong>과 <strong>지방세법 §13의2(법인·다주택 주택 취득 중과)</strong>를 따르며, 2026-08-01 기준으로 작성되었습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(지방세법)</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="다주택자 취득세 중과 2026 가이드"
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
