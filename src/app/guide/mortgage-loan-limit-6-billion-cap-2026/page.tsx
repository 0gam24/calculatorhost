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

const URL = 'https://calculatorhost.com/guide/mortgage-loan-limit-6-billion-cap-2026/';
const DATE_PUBLISHED = '2026-08-01';
const DATE_MODIFIED = '2026-08-01';

export const metadata: Metadata = {
  title: '주택담보대출 6억 한도 규제 2026, 시가 15억·25억 구간별 정리',
  description:
    '수도권·규제지역 주택담보대출이 시가 구간별로 제한됩니다. 15억 이하 6억, 15억 초과 25억 이하 4억, 25억 초과 2억 한도와 LTV·스트레스 DSR을 함께 정리했습니다. 금융위 가계부채 관리방안 기준.',
  keywords: [
    '주택담보대출 6억 한도',
    '주담대 한도 규제',
    '15억 초과 주담대',
    '25억 주택 대출',
    '수도권 규제지역 대출',
    '스트레스 DSR',
    '은행법 34조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주택담보대출 6억 한도 규제 2026, 시가 15억·25억 구간별 정리' }],
    title: '주택담보대출 6억 한도 규제 2026, 시가 구간별 대출한도',
    description: '수도권·규제지역 주담대는 시가 15억 이하 6억, 15억 초과 25억 이하 4억, 25억 초과 2억으로 제한됩니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주택담보대출 6억 한도 규제 2026',
    description: '수도권·규제지역 주담대 시가 구간별 한도(6억·4억·2억)와 LTV·스트레스 DSR 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '주택담보대출이 왜 6억까지만 되나요?',
    answer:
      '수도권·규제지역 고가주택에 대출이 과도하게 쏠리는 것을 막기 위한 금융위원회 가계부채 관리방안 때문입니다. 시가 15억원 이하 주택은 주택담보대출을 최대 6억원까지만 받을 수 있도록 절대 한도를 둔 것으로, 2025년 하반기부터 수도권·규제지역에 적용되고 있습니다.',
  },
  {
    question: '시가 15억 초과 주택은 대출한도가 얼마인가요?',
    answer:
      '시가 15억원 초과 25억원 이하는 4억원, 25억원 초과는 2억원까지입니다. 주택 가격이 높을수록 절대 한도가 더 줄어드는 구조로, 고가주택일수록 자기자본 비중을 크게 두도록 설계되어 있습니다.',
  },
  {
    question: '모든 지역에 적용되나요?',
    answer:
      '아닙니다. 수도권과 규제지역(투기과열지구·조정대상지역)에 적용됩니다. 규제지역이 아닌 지방 주택은 이 구간별 절대 한도가 적용되지 않으며, LTV와 DSR 범위 안에서 대출이 결정됩니다. 지역 지정은 수시로 바뀌므로 계약 전 최신 지정 현황을 확인해야 합니다.',
  },
  {
    question: 'LTV·DSR 한도와는 어떻게 겹치나요?',
    answer:
      '실제 대출액은 세 가지 중 가장 작은 금액으로 정해집니다. 구간별 절대 한도(6억·4억·2억), LTV(담보가치 대비 비율), DSR(소득 대비 원리금 비율)을 각각 계산한 뒤 그중 최솟값이 한도가 됩니다. 절대 한도가 여유 있어도 소득이 낮으면 DSR에서 먼저 막힐 수 있습니다.',
  },
  {
    question: '스트레스 DSR이 무엇인가요?',
    answer:
      '금리가 오를 상황을 미리 반영해 원리금 상환 부담을 더 크게 계산하는 제도입니다. 실제 금리에 일정 가산금리(스트레스 금리)를 더해 DSR을 산정하므로, 같은 소득이라도 대출 가능액이 줄어듭니다. 2025년 시행된 3단계 스트레스 DSR로 수도권 주택담보대출 한도가 추가로 축소되었습니다.',
  },
  {
    question: '생애최초·신혼부부는 예외가 있나요?',
    answer:
      '정책대출(디딤돌·버팀목 등)과 실수요자 요건은 별도의 기준이 적용될 수 있습니다. 다만 정책대출도 순차적으로 DSR 산정에 포함되는 추세이므로, 본인의 소득·주택 가격·무주택 여부에 따라 은행과 주택도시기금 창구에서 개별 확인하는 것이 정확합니다.',
  },
  {
    question: '대출 규제는 계속 유지되나요?',
    answer:
      '가계부채 관리방안은 법률이 아니라 금융당국의 행정 조치이므로 시장 상황에 따라 강화되거나 완화될 수 있습니다. 구간 금액과 적용 지역, LTV 비율은 수시로 조정될 수 있으니, 대출 실행 시점의 금융위원회·은행 공지를 반드시 확인하세요.',
  },
];

export default function MortgageLoanLimit6BillionCap2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택담보대출 6억 한도 규제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주택담보대출 6억 한도 규제 2026, 시가 15억·25억 구간별 대출한도',
    description:
      '수도권·규제지역 주택담보대출 시가 구간별 절대 한도(6억·4억·2억), LTV·스트레스 DSR과의 관계, 실제 대출 가능액 계산 사례까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주택담보대출', '대출한도', '6억 규제', '스트레스 DSR', 'LTV'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주택담보대출 6억 한도 규제 2026',
    description:
      '수도권·규제지역 주담대 시가 구간별 절대 한도와 LTV·DSR 관계를 정리한 실전 가이드.',
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
                    { name: '주택담보대출 6억 한도 규제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">대출 실행 예정자 · 8분 읽기 · 2026-08-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택담보대출 6억 한도 규제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">시가 15억·25억 구간별 대출한도</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 사기 전 가장 먼저 궁금한 것은 대출이 얼마나 나오느냐입니다. 그런데 2025년 하반기부터 수도권·규제지역에서는 주택 시가 구간에 따라 주택담보대출에 절대 한도가 걸려, 소득이 아무리 높아도 일정 금액 이상은 받을 수 없게 되었습니다. 이 가이드는 시가 15억·25억을 기준으로 한 6억·4억·2억 한도가 정확히 어떻게 적용되는지, LTV·DSR과 어떻게 겹쳐 최종 한도가 정해지는지 실수요자 관점에서 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택담보대출이 6억까지만 되는 이유는?</h2>
                <p>
                  고가주택에 과도한 대출이 쏠리는 것을 막기 위한 규제입니다. 금융위원회는 가계부채 관리방안을 통해 수도권·규제지역 주택에 대해 담보가치나 소득과 무관하게 적용되는 대출 절대 한도를 도입했습니다. 시가 15억원 이하 주택은 주택담보대출을 최대 6억원까지만 받을 수 있습니다.
                </p>
                <p>
                  이 조치는 은행의 건전경영을 규율하는 은행법 §34(경영지도기준)와 금융당국의 행정지도에 근거한 관리방안으로, 국회가 정한 세법 같은 법률 조항이 아니라 시장 상황에 따라 조정되는 행정 규제라는 점이 특징입니다. 따라서 금액과 적용 범위는 언제든 바뀔 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    최종 대출 가능액 = min(구간별 절대 한도, LTV 한도, DSR 한도)
                    <br />
                    세 가지 중 가장 작은 금액이 실제 한도가 됩니다. 절대 한도가 남아 있어도 소득이 낮으면 DSR에서 먼저 막힙니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시가 구간별 대출한도는 얼마인가요?</h2>
                <p>
                  시가가 높을수록 절대 한도가 줄어듭니다. 수도권·규제지역 기준 세 구간으로 나뉩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 수도권·규제지역 주택담보대출 구간별 절대 한도 (금융위 가계부채 관리방안 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주택 시가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주담대 절대 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">15억원 이하</td>
                        <td className="p-3"><strong>6억원</strong></td>
                        <td className="p-3">현행 유지, LTV·DSR 범위 내</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">15억원 초과 25억원 이하</td>
                        <td className="p-3"><strong>4억원</strong></td>
                        <td className="p-3">자기자본 비중 확대</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">25억원 초과</td>
                        <td className="p-3"><strong>2억원</strong></td>
                        <td className="p-3">고가주택 대출 최소화</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 한도는 상한선일 뿐, 실제로는 LTV(담보가치 대비 대출 비율)와 DSR(소득 대비 원리금 비율)을 함께 계산해 더 작은 금액으로 정해집니다. 시가 15억원 이하라고 해서 무조건 6억원이 나오는 것은 아닙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">LTV·스트레스 DSR과 어떻게 겹치나요?</h2>
                <p>
                  절대 한도, LTV, DSR 세 가지가 동시에 걸립니다. 규제지역에서는 통상 LTV 40% 수준이 적용되고, 여기에 상환 능력을 보는 DSR과, 금리 상승을 미리 반영하는 스트레스 DSR이 더해집니다.
                </p>
                <p>
                  스트레스 DSR은 실제 금리에 가산금리(스트레스 금리)를 더해 원리금 부담을 크게 계산하는 방식입니다. 2025년 시행된 3단계 스트레스 DSR로 수도권 주택담보대출의 한도가 추가로 줄었습니다. 결국 같은 집이라도 소득이 낮으면 절대 한도가 아니라 DSR에서 먼저 한도가 결정됩니다.
                </p>
                <p>
                  예외: 정확한 LTV 비율과 스트레스 금리 수준은 주택 소재지, 무주택 여부, 대출 종류에 따라 달라지므로, 구체적 수치는 실행 시점의 은행 창구와 금융위원회 공지를 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">내 대출 가능액 계산 사례</h2>
                <p>
                  구간별 한도와 LTV가 어떻게 최종 한도를 만드는지 세 가지 사례로 살펴보겠습니다. LTV는 규제지역 40%를 가정한 예시입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 시가 14억원 주택</p>
                  <p className="text-sm text-text-secondary">
                    · 구간별 절대 한도: 15억 이하이므로 6억원
                    <br />
                    · LTV 40%: 14억 × 40% = 5.6억원
                    <br />
                    · 최종 한도: min(6억, 5.6억) = <strong>5.6억원</strong> (LTV가 먼저 제약)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 절대 한도 6억이 남아 있어도 LTV 때문에 5.6억이 상한. DSR이 더 낮으면 그만큼 더 줄어듭니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 시가 20억원 주택</p>
                  <p className="text-sm text-text-secondary">
                    · 구간별 절대 한도: 15억 초과 25억 이하이므로 4억원
                    <br />
                    · LTV 40%: 20억 × 40% = 8억원
                    <br />
                    · 최종 한도: min(4억, 8억) = <strong>4억원</strong> (구간 절대 한도가 제약)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: LTV로는 8억이 가능하지만 구간 한도 4억이 상한. 나머지 16억은 자기자본이 필요합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 시가 30억원 주택</p>
                  <p className="text-sm text-text-secondary">
                    · 구간별 절대 한도: 25억 초과이므로 2억원
                    <br />
                    · LTV 40%: 30억 × 40% = 12억원
                    <br />
                    · 최종 한도: min(2억, 12억) = <strong>2억원</strong> (구간 절대 한도가 제약)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 30억 주택도 주담대는 2억이 최대. 사실상 현금 매수에 가까운 자금 계획이 필요합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">규제 전후로 달라진 점 비교</h2>
                <p>
                  구간별 절대 한도가 도입되기 전에는 LTV·DSR 범위 안에서라면 고가주택도 큰 금액을 대출받을 수 있었습니다. 지금은 시가가 15억을 넘는 순간 한도가 크게 꺾입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 규제 전후 대출 가능액 비교 (LTV 40% 가정, 예시)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">LTV만 적용 시</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구간 한도 적용 시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">14억</td>
                        <td className="p-3">5.6억</td>
                        <td className="p-3">5.6억 (변화 없음)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">20억</td>
                        <td className="p-3">8억</td>
                        <td className="p-3">4억 (4억 축소)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30억</td>
                        <td className="p-3">12억</td>
                        <td className="p-3">2억 (10억 축소)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 위 수치는 LTV 40%를 단순 가정한 예시이며, DSR 제약과 지역별 LTV 차이에 따라 실제 한도는 더 낮아질 수 있습니다.
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
                    <div className="font-semibold text-primary-500">대출한도 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득과 담보가치를 입력해 DSR·LTV 한도를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/stress-dsr-stage3-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">3단계 스트레스 DSR</div>
                    <p className="mt-1 text-sm text-text-secondary">가산금리로 한도가 줄어드는 구조를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/dsr-dti-ltv-difference-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">DSR·DTI·LTV 차이</div>
                    <p className="mt-1 text-sm text-text-secondary">세 지표가 각각 무엇을 제약하는지 비교합니다.</p>
                  </Link>
                  <Link
                    href="/guide/didimdol-loan-conditions-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">디딤돌대출 조건 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">실수요자 정책대출의 소득·주택 요건을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/mortgage-fixed-vs-variable-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">고정금리 vs 변동금리</div>
                    <p className="mt-1 text-sm text-text-secondary">금리 유형 선택이 총이자에 미치는 영향.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예금·적금·환율 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 금융 조언이 아닙니다. 주택담보대출 구간별 한도, LTV 비율, 스트레스 DSR 가산금리, 적용 지역은 금융위원회 가계부채 관리방안과 각 은행의 내부 기준에 따라 수시로 바뀝니다. 이 규제는 법률 조항이 아니라 은행법 <strong>은행법 §34(경영지도기준)</strong>에 근거한 금융당국의 행정 조치이므로, 실제 대출 실행 전 반드시 은행 창구와 금융위원회 공지에서 최신 기준을 확인하세요. 본 콘텐츠는 2026-08-01 기준으로 작성되었습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(은행법)</a>,{' '}
                  <a href="https://www.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원</a>,{' '}
                  <a href="https://www.fsc.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융위원회</a>.
                </p>
              </section>

              <ShareButtons
                title="주택담보대출 6억 한도 규제 2026 가이드"
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
