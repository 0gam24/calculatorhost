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

const URL = 'https://calculatorhost.com/guide/redevelopment-membership-right-capital-gains-tax-2026/';
const DATE_PUBLISHED = '2026-07-31';
const DATE_MODIFIED = '2026-07-31';

export const metadata: Metadata = {
  title: '조합원입주권 양도소득세 2026, 1주택 비과세 3년 특례',
  description:
    '재개발·재건축 조합원입주권을 팔거나 종전주택을 팔 때 1세대1주택 비과세를 받을 수 있는지, 원조합원과 승계조합원의 차이, 3년 내 종전주택 양도 특례를 소득세법 §89·시행령 §156의2 기준으로 정리했습니다.',
  keywords: [
    '조합원입주권 양도소득세',
    '입주권 비과세',
    '재개발 양도세',
    '종전주택 3년 특례',
    '원조합원 승계조합원',
    '관리처분계획인가',
    '소득세법 89조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '조합원입주권 양도소득세 2026, 1주택 비과세 3년 특례' }],
    title: '조합원입주권 양도소득세 2026, 비과세 요건 총정리',
    description: '입주권 양도 비과세, 주택+입주권 종전주택 3년 특례, 원조합원과 승계조합원 차이까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '조합원입주권 양도소득세 2026, 1주택 비과세 3년 특례',
    description: '입주권 비과세와 종전주택 3년 특례. 소득세법 §89·시행령 §156의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '조합원입주권이 정확히 무엇인가요?',
    answer:
      '재개발·재건축 사업에서 관리처분계획인가가 나면 기존 주택이 새 아파트에 입주할 수 있는 권리로 바뀌는데, 이 권리를 조합원입주권이라고 합니다. 세법상 입주권은 주택이 아니라 부동산을 취득할 수 있는 권리이지만, 1세대1주택 비과세 판정 등에서는 주택 수에 포함해 계산합니다.',
  },
  {
    question: '입주권을 팔 때도 비과세가 되나요?',
    answer:
      '될 수 있습니다. 관리처분계획인가일 당시 1세대1주택 비과세 요건(2년 이상 보유 등)을 갖춘 주택이 입주권으로 전환된 경우, 그 입주권을 양도할 때 다른 주택이 없으면 1세대1주택으로 보아 비과세합니다(소득세법 §89①4호). 다만 양도가액 12억원까지만 비과세되고 초과분은 과세됩니다.',
  },
  {
    question: '주택도 있고 입주권도 있으면 어떻게 되나요?',
    answer:
      '1주택자가 조합원입주권을 취득하고, 그 입주권을 취득한 날부터 3년 이내에 종전주택을 양도하면 1세대1주택 비과세를 적용받을 수 있습니다(소득세법 시행령 §156의2). 3년이 지나 양도해도 완공된 신축주택에 일정 기간 내 전입해 실거주하는 등 요건을 갖추면 비과세가 가능합니다.',
  },
  {
    question: '원조합원과 승계조합원은 무엇이 다른가요?',
    answer:
      '원조합원은 관리처분계획인가 전부터 주택을 보유한 사람이고, 승계조합원은 인가 후 입주권을 사서 조합원 지위를 넘겨받은 사람입니다. 원조합원은 종전주택 보유기간을 인정받아 비과세와 장기보유특별공제에서 유리하지만, 승계조합원은 입주권 취득 후 기간만 인정되어 혜택이 제한됩니다.',
  },
  {
    question: '입주권 양도세율은 어떻게 되나요?',
    answer:
      '조합원입주권은 보유기간에 따라 세율이 다릅니다(소득세법 §104). 1년 미만 보유는 70%, 1년 이상 2년 미만은 60%, 2년 이상은 기본 누진세율이 적용됩니다. 입주권은 주택이 아니어서 다주택자 중과세율은 적용되지 않지만, 비과세 요건을 못 갖추면 단기 세율 부담이 큽니다.',
  },
  {
    question: '장기보유특별공제는 받을 수 있나요?',
    answer:
      '입주권의 장기보유특별공제는 기존 건물과 토지분에 대해 관리처분계획인가 전 보유기간을 기준으로 적용됩니다. 인가 이후 발생한 청산금이나 프리미엄 부분에는 제한이 있고, 승계조합원은 종전주택 보유기간이 없어 공제가 크게 제한됩니다. 정확한 공제는 국세청 또는 세무 전문가에게 확인하세요.',
  },
  {
    question: '비과세를 받으려면 언제까지 팔아야 하나요?',
    answer:
      '주택과 입주권을 함께 보유한 경우, 원칙적으로 입주권 취득일부터 3년 이내에 종전주택을 양도해야 종전주택이 비과세됩니다. 이 3년은 일시적 2주택 특례와 비슷한 완충 기간입니다. 3년을 넘겼다면 신축주택 완공 후 전입·실거주 요건을 충족하는 별도 특례를 검토해야 합니다.',
  },
];

export default function RedevelopmentMembershipRightCgt2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '조합원입주권 양도소득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '조합원입주권 양도소득세 2026, 1주택 비과세 3년 특례',
    description:
      '재개발·재건축 조합원입주권의 양도소득세. 입주권 양도 비과세, 주택과 입주권을 함께 보유할 때 종전주택 3년 특례, 원조합원과 승계조합원의 차이, 세율과 장기보유특별공제까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['조합원입주권', '양도소득세', '재개발', '비과세', '종전주택 특례'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '조합원입주권 양도소득세 2026',
    description:
      '조합원입주권을 양도하거나 종전주택을 양도할 때의 1세대1주택 비과세 요건과 세율.',
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
                    { name: '조합원입주권 양도소득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">재개발 구역 주택 보유자 · 9분 읽기 · 2026-07-31</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  조합원입주권 양도소득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">1주택 비과세와 종전주택 3년 특례</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 재개발·재건축 구역에 주택이나 입주권을 가진 분을 위한 것입니다. 관리처분계획인가로 주택이 입주권으로 바뀌면 세금 규칙이 복잡해집니다. 입주권을 팔 때 비과세되는지, 주택과 입주권을 함께 가진 경우 종전주택을 언제까지 팔아야 하는지, 원조합원과 승계조합원이 어떻게 다른지 순서대로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-redevelopment-membership-right-capital-gains-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조합원입주권이란 무엇인가요?</h2>
                <p>
                  재개발·재건축 사업에서 관리처분계획인가가 나면, 기존 주택이 헐리고 새 아파트에 입주할 수 있는 권리로 전환됩니다. 이 권리가 조합원입주권입니다. 세법상 입주권은 주택 자체가 아니라 부동산을 취득할 권리이지만, 1세대1주택 비과세를 판정할 때는 주택 수에 포함해 계산합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 정리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 전환 시점: 관리처분계획인가일
                    <br />
                    · 성격: 주택이 아닌 부동산 취득 권리(단, 주택 수에는 포함)
                    <br />
                    · 비과세 근거: 소득세법 §89①4호
                    <br />
                    · 종전주택 특례: 소득세법 시행령 §156의2
                  </p>
                </div>
                <p className="mt-4">
                  다만 관리처분인가 시점이 언제냐에 따라 원조합원인지 승계조합원인지가 갈리고, 그에 따라 비과세와 공제 혜택이 크게 달라집니다. 그래서 입주권 세금은 인가일 기준을 먼저 확인하는 것이 출발점입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">입주권을 팔 때 비과세가 되나요?</h2>
                <p>
                  될 수 있습니다. 관리처분계획인가일 당시 1세대1주택 비과세 요건을 갖춘 주택이 입주권으로 전환됐고, 입주권 양도일에 다른 주택이 없다면 1세대1주택으로 보아 비과세합니다(소득세법 §89①4호).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>보유요건:</strong> 관리처분인가일 기준으로 종전주택을 2년 이상 보유(조정대상지역은 2년 거주)했어야 합니다.
                  </li>
                  <li>
                    <strong>다른 주택 없음:</strong> 입주권 양도일 현재 다른 주택이 없어야 1세대1주택으로 봅니다.
                  </li>
                  <li>
                    <strong>12억 한도:</strong> 1세대1주택 비과세와 같이 양도가액 12억원까지만 비과세되고, 초과분은 과세됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 승계조합원처럼 인가 후 입주권을 사들인 경우에는 종전주택 보유·거주 이력이 없어 이 비과세를 적용받기 어렵습니다. 비과세는 대체로 원조합원에게 열려 있는 길입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택과 입주권을 함께 가지면 언제 팔아야 하나요?</h2>
                <p>
                  1주택자가 조합원입주권을 취득한 뒤 그 입주권 취득일부터 3년 이내에 종전주택을 양도하면, 종전주택을 1세대1주택으로 보아 비과세합니다(소득세법 시행령 §156의2). 일시적 2주택 특례와 비슷한 완충 규정입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 A. 3년 이내 양도(비과세)</p>
                  <p className="text-sm text-text-secondary">
                    · 1주택 보유 중 조합원입주권 취득
                    <br />
                    · 입주권 취득 2년 11개월 후 종전주택 양도(12억 이하)
                    <br />
                    · 3년 이내 요건 충족 → 종전주택 <strong>비과세</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 B. 3년 초과 양도(원칙 과세)</p>
                  <p className="text-sm text-text-secondary">
                    · 입주권 취득 3년 1개월 후 종전주택 양도
                    <br />
                    · 3년 요건 초과 → 원칙적으로 과세
                    <br />
                    · 단, 신축주택 완공 후 전입·실거주 등 별도 특례 요건을 갖추면 비과세 가능
                  </p>
                </div>
                <p className="mt-4">
                  다만 3년을 넘겼다고 무조건 과세되는 것은 아닙니다. 완공된 신축주택으로 일정 기간 내 세대 전원이 이사해 실거주하는 등 시행령이 정한 요건을 갖추면 비과세가 유지됩니다. 이 요건은 세부 조건이 많으므로 반드시 국세청에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">원조합원과 승계조합원은 뭐가 다른가요?</h2>
                <p>
                  같은 입주권이라도 언제 조합원이 됐느냐에 따라 세금이 크게 갈립니다. 아래 표로 비교했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 원조합원 vs 승계조합원 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">원조합원</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">승계조합원</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">조합원 지위 취득</td>
                        <td className="p-3">관리처분인가 전부터 주택 보유</td>
                        <td className="p-3">인가 후 입주권 매수</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">종전주택 보유기간</td>
                        <td className="p-3">인정됨</td>
                        <td className="p-3">인정 안 됨</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">입주권 양도 비과세</td>
                        <td className="p-3">요건 충족 시 가능</td>
                        <td className="p-3">사실상 어려움</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">장기보유특별공제</td>
                        <td className="p-3">기존 건물·토지분 인정</td>
                        <td className="p-3">크게 제한</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 승계조합원도 신축주택이 완공되어 실제 주택으로 보유·거주한 뒤 양도하면 그때부터의 보유기간에 대해 일반 주택 비과세를 검토할 수 있습니다. 입주권 상태와 완공 후 주택 상태를 구분해 판단하는 것이 중요합니다.
                </p>
              </section>

              <AdSlot slot="guide-redevelopment-membership-right-capital-gains-tax-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">과세될 때 세금은 얼마인가요?</h2>
                <p>
                  비과세 요건을 못 갖춰 과세되는 경우, 보유기간에 따라 세율이 달라집니다(소득세법 §104). 2년 이상 보유해 기본세율이 적용되는 사례로 계산해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례. 승계조합원 입주권 양도(2년 이상 보유)</p>
                  <p className="text-sm text-text-secondary">
                    · 양도차익: 3억원(장기보유특별공제 미적용 가정)
                    <br />
                    · 기본공제: 250만원
                    <br />
                    · 과세표준 = 3억 − 250만 = <strong>2억 9,750만원</strong>
                    <br />
                    · 세율(§55, 1.5억~3억 구간): 38%, 누진공제 1,994만원
                    <br />
                    · 산출세액 = 2억 9,750만 × 38% − 1,994만 = <strong>9,311만원</strong>
                    <br />
                    · 지방소득세(10%) 약 931만원 별도 → 합계 약 <strong>1억 242만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">누진공제를 빼지 않으면 세액이 약 1,994만원 과다 계산되므로 반드시 차감합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  주의: 위 계산은 이해를 돕기 위한 예시입니다. 1년 미만 70%, 2년 미만 60%의 단기세율이 적용되면 세액이 크게 늘고, 장기보유특별공제 적용 여부에 따라서도 달라집니다. 실제 세액은 국세청 홈택스 모의계산이나 세무 전문가로 확인하세요.
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
                    <p className="mt-1 text-sm text-text-secondary">양도차익과 보유기간으로 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/presale-right-capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">분양권 양도소득세</div>
                    <p className="mt-1 text-sm text-text-secondary">입주권과 다른 분양권의 세율과 과세 방식.</p>
                  </Link>
                  <Link
                    href="/guide/temporary-two-houses-capital-gains-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일시적 2주택 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">종전주택 처분 기한과 비과세 요건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">12억 초과분 과세와 장기보유특별공제.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 80%</div>
                    <p className="mt-1 text-sm text-text-secondary">보유·거주 기간별 공제율 계산법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·종부세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 조합원입주권 비과세와 종전주택 특례는 관리처분인가일, 보유·거주 요건, 신축주택 전입 요건 등 세부 조건이 많고 개별 사안마다 결론이 달라집니다. 실제 양도 전 국세청 또는 세무 전문가에게 반드시 확인하세요. 본 콘텐츠는 2026-07-31 기준이며 관련 법령은 <strong>소득세법 §89·§104, 소득세법 시행령 §156의2</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 양도소득세 모의계산</a>.
                </p>
              </section>

              <ShareButtons
                title="조합원입주권 양도소득세 2026 가이드"
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
