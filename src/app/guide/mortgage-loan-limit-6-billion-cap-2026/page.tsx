// [revenue-lever: guard] Protect loan-search readers from overstated borrowing limits.
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
const DATE_MODIFIED = '2026-10-02';
const DESCRIPTION = '수도권 또는 규제지역의 주택구입목적 주담대 한도는 시가 15억 이하 6억, 15억 초과 25억 이하 4억, 25억 초과 2억입니다. 2025년 10월 16일 전후 비교와 중도금·이주비 예외, LTV·DSR 조건을 정리합니다.';

export const metadata: Metadata = {
  title: '주택담보대출 6억 한도 규제 2026, 시가 15억·25억 구간별 정리',
  description: DESCRIPTION,
  keywords: [
    '주택담보대출 6억 한도',
    '주담대 한도 규제',
    '15억 초과 주담대',
    '25억 주택 대출',
    '수도권 규제지역 대출',
    '스트레스 DSR',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주택담보대출 6억 한도 규제 2026, 시가 15억·25억 구간별 정리' }],
    title: '주택담보대출 6억 한도 규제 2026, 시가 구간별 대출한도',
    description: DESCRIPTION,
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주택담보대출 6억 한도 규제 2026',
    description: DESCRIPTION,
  },
};

const FAQ_ITEMS = [
  {
    question: '주택담보대출이 왜 6억까지만 되나요?',
    answer:
      '수도권 또는 규제지역의 주택구입목적 주담대에는 2025년 6월 28일부터 최대 6억원 한도가 적용됐습니다. 2025년 10월 16일부터는 주택 시가에 따라 6억·4억·2억원으로 차등화됐습니다. 이 금액은 승인 보장이 아니라 상한이며 LTV·DSR 등 다른 조건도 충족해야 합니다.',
  },
  {
    question: '시가 15억 초과 주택은 대출한도가 얼마인가요?',
    answer:
      '수도권 또는 규제지역의 주택구입목적 주담대는 시가 15억원 초과 25억원 이하이면 최대 4억원, 25억원 초과이면 최대 2억원입니다. 시가 15억원 이하의 상한은 6억원이며, LTV·DSR 및 금융회사 심사에 따라 실제 대출액은 더 작거나 대출이 거절될 수 있습니다.',
  },
  {
    question: '모든 지역에 적용되나요?',
    answer:
      '아닙니다. 수도권과 규제지역(투기과열지구·조정대상지역)에 적용됩니다. 규제지역이 아닌 지방 주택은 이 구간별 절대 한도가 적용되지 않으며, LTV와 DSR 범위 안에서 대출이 결정됩니다. 지역 지정은 수시로 바뀌므로 계약 전 최신 지정 현황을 확인해야 합니다.',
  },
  {
    question: 'LTV·DSR 한도와는 어떻게 겹치나요?',
    answer:
      '구간별 절대 한도, LTV 한도, DSR 한도 중 가장 작은 금액을 비교 상한으로 볼 수 있습니다. 이 계산이 승인을 보장하지는 않습니다. 보유주택·대출 목적·상품 자격·DTI·신용 심사 등 추가 조건에 따라 더 줄거나 대출이 거절될 수 있습니다.',
  },
  {
    question: '스트레스 DSR이 무엇인가요?',
    answer:
      '금리가 오를 상황을 미리 반영해 원리금 상환 부담을 더 크게 계산하는 제도입니다. 실제 금리에 일정 가산금리(스트레스 금리)를 더해 DSR을 산정하므로, 같은 소득이라도 대출 가능액이 줄어듭니다. 2025년 시행된 3단계 스트레스 DSR로 수도권 주택담보대출 한도가 추가로 축소되었습니다.',
  },
  {
    question: '생애최초·신혼부부는 예외가 있나요?',
    answer:
      '생애최초 등 차주 요건과 정책대출은 상품별 LTV·소득·주택가격·한도 기준을 따로 확인해야 합니다. 생애최초나 신혼부부라는 이유만으로 모든 한도와 DSR이 면제되는 것은 아닙니다. 은행·주택도시기금·한국주택금융공사의 해당 상품 공지를 확인하세요.',
  },
  {
    question: '대출 규제는 계속 유지되나요?',
    answer:
      '2026년 8월 13일 금융위원회 후속 대책에서도 6억·4억·2억원 한도 유지를 확인했습니다. 이후 지역 지정과 상품별 조건은 달라질 수 있으므로 신청 시점의 공식 공지와 금융회사 기준을 확인해야 합니다. 이 글이 모든 지역·상품의 최신 예외를 자동 판정하지는 않습니다.',
  },
  {
    question: '20억·30억 주택의 차등화 직전 한도는 얼마였나요?',
    answer:
      '동일한 수도권·규제지역 주택구입목적 대출과 LTV 40%를 가정하면, 직전에도 최대 6억원 상한이 있었습니다. 따라서 20억원 주택은 6억에서 4억원으로, 30억원 주택은 6억에서 2억원으로 줄었습니다. 8억·12억원은 LTV만 곱한 값이며 직전 승인 한도가 아닙니다. DSR 등은 이 비교에서 제외했습니다.',
  },
  {
    question: '중도금·이주비와 생활안정자금에도 같은 한도가 적용되나요?',
    answer:
      '중도금대출은 가격별 절대 한도 적용에서 제외되지만 잔금대출 전환 시에는 적용됩니다. 이주비대출은 가격별 축소 대신 기존 최대 6억원 한도를 유지합니다. 생활안정자금은 이번 가격별 차등화 대상이 아닙니다. 이는 LTV·DSR 등 다른 규제가 모두 면제된다는 뜻이 아닙니다.',
  },
  {
    question: '2025년 10월 16일 전에 계약했다면 종전 기준인가요?',
    answer:
      '공식 FAQ는 10월 15일까지 금융회사 전산 신청 접수 완료 또는 정식 매매계약 체결과 계약금 납부 입증 등 경과조치를 안내합니다. 집단대출·토지거래허가·분양권 전매에는 별도 요건과 예외가 있어 계약일만으로 확정할 수 없습니다. 증빙과 신청 경위를 금융회사에 확인하세요.',
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
    description: DESCRIPTION,
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
    description: DESCRIPTION,
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
          <main id="main-content" className="min-w-0 flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '주택담보대출 6억 한도 규제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">대출 실행 예정자 · 8분 읽기 · 자료 확인 2026-10-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택담보대출 6억 한도 규제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">시가 15억·25억 구간별 대출한도</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  수도권 또는 규제지역에서 집을 살 때는 LTV·DSR뿐 아니라 주택구입목적 주담대의 절대 한도도 확인해야 합니다. 2025년 6월 28일 최대 6억원 상한이 도입됐고, 10월 16일부터 시가에 따라 6억·4억·2억원으로 차등화됐습니다. 2026년 8월 후속 대책에서도 한도 유지를 확인했습니다. 아래에서는 직전 제도와의 차이, 대출 목적별 예외와 경과조치를 구분합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택담보대출이 6억까지만 되는 이유는?</h2>
                <p>
                  금융위원회 가계부채 관리방안에 따라 수도권 또는 규제지역의 주택구입목적 주담대에는 절대 한도가 적용됩니다. 시가 15억원 이하의 상한은 6억원입니다. 해당 금액을 전부 빌릴 수 있다는 뜻은 아니며 담보가치·소득·보유주택과 상품별 요건도 충족해야 합니다.
                </p>
                <p>
                  2025년 10월 15일 발표는 당시 최대 6억원 상한을 주택 가격별로 낮추는 조치였습니다. 2026년 4월 1일 발표는 같은 구간을 재확인하면서 온라인투자연계금융업자에게 관련 규제를 의무화한 내용도 포함합니다. 그 업권의 적용일인 4월 2일을 일반 주담대 차등화의 최초 시행일로 혼동하면 안 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    단순 비교 상한 = min(구간별 절대 한도, LTV 한도, DSR 한도)
                    <br />
                    다른 대출 요건을 충족한다는 가정의 비교입니다. DTI·신용 심사·보유주택·상품 자격 등 추가 조건에 따라 더 줄거나 대출이 거절될 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시가 구간별 대출한도는 얼마인가요?</h2>
                <p>
                  2025년 10월 16일부터 신규 신청하는 수도권 또는 규제지역의 주택구입목적 주담대 기준입니다. 시가는 대출 신청일의 KB 일반평균가·한국부동산원 시세 등 금융회사 인정 기준으로 확인하며, 경과조치 대상은 별도 검토해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 수도권 또는 규제지역 주택구입목적 주담대 상한 (2025-10-16 시행)</caption>
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

              <section className="space-y-4 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">중도금·이주비와 경과조치는 따로 확인하세요</h2>
                <p>
                  중도금대출은 가격별 절대 한도 적용에서 제외되지만 잔금대출로 전환할 때는 적용됩니다. 이주비대출은 가격별 4억·2억원 축소 대상에서 제외되고 기존 최대 6억원을 유지합니다. 생활안정자금대출은 이번 가격별 차등화 대상이 아니며 다른 목적별 제한은 별도로 적용됩니다. 어느 경우도 LTV·DSR 등 다른 규제가 모두 면제된다는 뜻은 아닙니다.
                </p>
                <p>
                  2025년 10월 15일까지 금융회사 전산 신청 접수를 완료했거나 정식 매매계약과 계약금 납부를 입증하는 경우 등에는 종전 기준을 적용하는 경과조치가 있습니다. 집단대출·토지거래허가·분양권 전매의 별도 조건을 확인해야 하므로 계약일 하나만으로 종전 한도를 확정하지 마세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">LTV·스트레스 DSR과 어떻게 겹치나요?</h2>
                <p>
                  절대 한도 외에 담보가치에 대한 LTV와 상환 능력을 보는 DSR, 금리 상승 위험을 반영하는 스트레스 DSR을 함께 확인합니다. 아래 예시의 LTV 40%는 해당 비율이 적용되는 차주를 가정한 값입니다. 수도권 전체나 생애최초 등 모든 차주에게 같은 LTV가 적용된다는 뜻은 아닙니다.
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
                  수도권 또는 규제지역의 주택구입목적 대출에서 LTV 40%가 적용되는 동일한 차주를 가정합니다. 아래는 절대 한도와 LTV만 비교하며 DSR·DTI·상품 자격·신용 심사는 제외합니다. 승인 금액을 확정하는 계산이 아닙니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 시가 14억원 주택</p>
                  <p className="text-sm text-text-secondary">
                    · 구간별 절대 한도: 15억 이하이므로 6억원
                    <br />
                    · LTV 40%: 14억 × 40% = 5.6억원
                    <br />
                    · 비교 상한: min(6억, 5.6억) = <strong>5.6억원</strong> (LTV가 먼저 제약)
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
                    · 비교 상한: min(4억, 8억) = <strong>4억원</strong> (구간 절대 한도가 제약)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 8억원은 LTV만 곱한 값입니다. 절대 상한은 4억원이며 주택가격과의 차이는 최소 16억원입니다. DSR 등으로 대출이 줄거나 취득 부대비용이 발생하면 필요한 자금은 더 커집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 시가 30억원 주택</p>
                  <p className="text-sm text-text-secondary">
                    · 구간별 절대 한도: 25억 초과이므로 2억원
                    <br />
                    · LTV 40%: 30억 × 40% = 12억원
                    <br />
                    · 비교 상한: min(2억, 12억) = <strong>2억원</strong> (구간 절대 한도가 제약)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 12억원은 LTV만 곱한 값이고 절대 상한은 2억원입니다. 주택가격과의 차이는 최소 28억원이며 추가 심사와 취득 부대비용을 따로 고려해야 합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">2025년 10월 16일 차등화 직전·이후 비교</h2>
                <p>
                  차등화 직전에도 2025년 6월 28일 도입된 최대 6억원 상한이 있었습니다. 따라서 20억원 주택은 6억에서 4억원으로, 30억원 주택은 6억에서 2억원으로 줄어든 비교가 맞습니다. LTV만 곱한 8억·12억원을 직전 대출 한도로 비교하면 감소 폭을 과장하게 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 동일 지역·차주의 LTV 40% 가정 비교 (직전 6억원 상한 반영, DSR 등 제외)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">차등화 직전 (최대 6억·LTV)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">차등화 이후 (구간 한도·LTV)</th>
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
                        <td className="p-3">6억</td>
                        <td className="p-3">4억 (2억 감소)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30억</td>
                        <td className="p-3">6억</td>
                        <td className="p-3">2억 (4억 감소)</td>
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
                    <p className="mt-1 text-sm text-text-secondary">소득과 담보가치로 DSR·LTV를 비교하세요. 가격별 절대 한도와 경과조치는 별도 확인이 필요합니다.</p>
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
                  <strong>확인 범위:</strong> 2026-10-02에 아래 공식 자료를 대조해 가격별 한도와 예시를 교정했습니다. 2026-08-13 후속 대책에서도 6억·4억·2억원 한도 유지를 확인했습니다. 지역 지정·담보 평가·정책상품·집단대출의 모든 예외를 판정하는 글은 아니며 대출 신청 전에는 해당 금융회사와 최신 공식 공지를 확인해야 합니다. 정보 제공용으로 금융 상담이나 승인 보장이 아닙니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.fsc.go.kr/no010101/84824" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">2025-06-27 최대 6억원 발표</a>,{' '}
                  <a href="https://www.fsc.go.kr/no010101/85432" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">2025-10-15 가격별 차등화 발표</a>,{' '}
                  <a href="https://www.fsc.go.kr/po020201/85518?curPage=1" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">적용 목적·시가·경과조치 FAQ</a>,{' '}
                  <a href="https://www.fsc.go.kr/no010101/86606" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">2026-04-01 가계부채 관리방안</a>,{' '}
                  <a href="https://www.fsc.go.kr/comm/getFile?fileNo=3&fileTy=ATTACH&srvcId=BBSTY1&upperNo=87542" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">2026-08-13 후속 대책 (PDF 11쪽)</a>.
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
