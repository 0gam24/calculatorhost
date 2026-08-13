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

const URL = 'https://calculatorhost.com/guide/pension-account-transfer-2026/';
const DATE_PUBLISHED = '2026-08-14';
const DATE_MODIFIED = '2026-08-14';

export const metadata: Metadata = {
  title: '연금저축·IRP 계좌 이전 2026, 세금 없이 갈아타는 법',
  description:
    '수수료가 비싸거나 상품이 마음에 안 들면 연금저축·IRP 계좌를 다른 금융사로 옮길 수 있습니다. 계좌 이체는 인출이 아니라 세금이 없고 세액공제 혜택도 유지됩니다. 이전 절차, 55세·5년 요건, 해지공제액 주의점을 소득세법 기준으로 정리했습니다.',
  keywords: [
    '연금저축 이전',
    'IRP 계좌 이전',
    '연금계좌 이체',
    '연금저축 갈아타기',
    '연금저축 수수료',
    '연금계좌 이관',
    '소득세법 20조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연금저축·IRP 계좌 이전 2026, 세금 없이 갈아타는 법' }],
    title: '연금저축·IRP 계좌 이전 2026, 세금 없이 갈아타는 법',
    description: '계좌 이체는 인출이 아니라 세금 0원, 세액공제 유지. 이전 절차와 55세·5년 요건, 해지공제액 주의점 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연금저축·IRP 계좌 이전 2026, 세금 없이 갈아타는 법',
    description: '연금계좌를 옮겨도 세금이 없는 이유와 이전 절차, 주의점을 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '연금계좌를 옮기면 세금을 내나요?',
    answer:
      '아니요. 연금저축이나 IRP를 같은 종류의 다른 연금계좌로 옮기는 계좌 이체는 인출이 아니라 이동으로 보아 세금이 없습니다. 그동안 받은 세액공제도 반환하지 않으며 과세이연 혜택도 그대로 유지됩니다. 이전은 계좌를 해지해 현금을 찾는 것과 전혀 다릅니다.',
  },
  {
    question: '어떻게 이전하나요?',
    answer:
      '옮겨받을 금융사(받는 쪽)에서 신청합니다. 먼저 받는 금융사에서 연금저축계좌 또는 IRP를 개설한 뒤, 기존 계좌의 정보를 알려주고 이전을 신청하면 금융사끼리 자산이 이동합니다. 대부분 비대면으로 처리되며, 기존 계좌를 직접 해지할 필요가 없습니다.',
  },
  {
    question: '연금저축과 IRP끼리도 옮길 수 있나요?',
    answer:
      '가능하지만 요건이 있습니다. 같은 종류끼리(연금저축에서 연금저축, IRP에서 IRP)는 자유롭게 이체할 수 있으나, 연금저축과 IRP 상호 간 이체는 가입자가 55세 이상이고 연금계좌 가입기간이 5년이 지나야 합니다. 이 요건을 못 채우면 이종 간 이체가 제한됩니다.',
  },
  {
    question: '이전할 때 손해 보는 건 없나요?',
    answer:
      '상품에 따라 있습니다. 연금저축보험은 가입 후 7년 이내에 이체하면 해지공제액이 발생해 이체 금액이 낸 돈보다 적을 수 있습니다. 펀드형은 환매수수료가 있을 수 있습니다. 세금 불이익은 없지만 상품별 비용은 확인해야 합니다.',
  },
  {
    question: '왜 계좌를 옮기나요?',
    answer:
      '주로 수수료와 상품 라인업 때문입니다. 연금저축펀드·IRP는 운용 상품과 수수료가 금융사마다 다릅니다. 수수료가 낮고 원하는 ETF·펀드를 담을 수 있는 곳으로 옮기면 장기 수익률에 유리할 수 있습니다. 다만 이는 상품 선택의 문제이지 이전 자체가 수익을 보장하지는 않습니다.',
  },
  {
    question: 'IRP 이전 시 특별히 주의할 점은?',
    answer:
      'IRP에 퇴직급여가 들어 있으면 이전 규칙이 더 복잡할 수 있고, 계좌를 통째로 옮기는 것이 원칙이라 일부만 부분 이체가 제한되는 경우가 있습니다. 또 IRP는 계좌 관리 수수료가 있는 반면 연금저축펀드는 관리 수수료가 없는 경우가 많으니 비용을 비교하세요.',
  },
  {
    question: '이전하면 세액공제 한도가 초기화되나요?',
    answer:
      '아니요. 세액공제 한도는 연 단위로 납입액에 대해 적용되며, 계좌 이전과 무관하게 그해 납입액 기준으로 계산됩니다. 이전은 이미 쌓인 적립금을 옮기는 것이라 과거 세액공제 이력이나 그해 한도에 영향을 주지 않습니다.',
  },
  {
    question: '이전에 걸리는 기간은 얼마나 되나요?',
    answer:
      '상품 유형에 따라 다르지만 통상 수일 이내에 처리됩니다. 펀드형은 매도·이체 절차가 있어 며칠이 걸릴 수 있고, 보험형은 해지공제액 정산 절차가 있습니다. 정확한 소요 기간은 받는 금융사에 문의하세요.',
  },
];

export default function PensionAccountTransfer2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연금저축·IRP 계좌 이전 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연금저축·IRP 계좌 이전 2026, 세금 없이 갈아타는 법',
    description:
      '연금저축·IRP 계좌 이체가 세금 없이 이뤄지는 원리, 이전 절차, 연금저축과 IRP 상호 이체의 55세·5년 요건, 해지공제액·수수료 주의점을 정리한 투자자 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연금저축 이전', 'IRP 이체', '연금계좌', '세액공제', '수수료'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연금저축·IRP 계좌 이전 2026',
    description:
      '세금 없이 연금저축·IRP를 다른 금융사로 옮기는 절차와 요건, 주의점 정리.',
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
                    { name: '연금저축·IRP 계좌 이전 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">투자자·은퇴 준비 · 8분 읽기 · 2026-08-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연금저축·IRP 계좌 이전 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 세금 없이 갈아타는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  몇 년 전 은행이나 보험사에서 만든 연금저축이 수수료가 높거나 원하는 상품을 담을 수 없어 답답한 경우가 있습니다. 이럴 때 계좌를 해지하면 그동안 받은 세액공제를 토해내고 세금까지 물지만, 계좌를 그대로 다른 금융사로 옮기는 이전은 세금이 전혀 없습니다. 이 글은 연금계좌 이전이 왜 세금이 없는지, 어떻게 옮기는지, 연금저축과 IRP 사이 이체 요건과 주의점은 무엇인지를 은퇴 자산을 관리하는 분의 눈높이에서 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금계좌를 옮기면 세금을 내나요?</h2>
                <p>
                  아니요, 세금이 없습니다. 연금계좌 이전(계좌 이체)은 세법상 인출이 아니라 자산의 이동으로 봅니다. 따라서 그동안 납입액에 대해 받은 세액공제를 반환하지 않고, 운용수익에 붙는 과세이연 혜택도 그대로 유지됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 이전 = 이체(이동)이므로 세금 0원, 세액공제·과세이연 유지
                    <br />
                    · 신청은 <strong>받는(옮겨갈) 금융사</strong>에서, 계좌 통째로 이동
                    <br />
                    · 같은 종류끼리는 자유, 연금저축↔IRP는 <strong>55세 이상 + 5년 경과</strong> 요건
                    <br />
                    · 세금은 없어도 <strong>해지공제액·환매수수료</strong>는 상품별로 확인
                  </p>
                </div>
                <p>
                  다만 계좌를 해지해 현금을 찾는 것은 완전히 다릅니다. 중도해지는 세액공제받은 납입액과 운용수익에 기타소득세(보통 16.5%)가 부과되므로, 옮기고 싶을 때는 반드시 해지가 아닌 이전을 선택해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 이전하나요? (단계별)</h2>
                <p>
                  핵심은 옮겨갈 금융사에서 신청한다는 것입니다. 기존 계좌를 직접 해지하지 않는 것이 중요합니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>옮겨갈 금융사(증권사·은행 등)에서 연금저축계좌 또는 IRP를 개설</li>
                  <li>이전 신청 메뉴에서 기존 계좌(원 금융사·계좌번호)를 지정</li>
                  <li>금융사끼리 자산이 이동, 펀드는 매도 후 현금 이체되거나 현물 이전</li>
                  <li>이전 완료 후 새 계좌에서 원하는 상품으로 운용 시작</li>
                </ol>
                <p>
                  예외: 연금저축보험처럼 상품에 따라 비대면 이전이 제한되거나 원 금융사 방문이 필요한 경우가 있으므로, 신청 전 두 금융사의 안내를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금저축과 IRP끼리 옮길 때 요건</h2>
                <p>
                  같은 종류끼리(연금저축에서 연금저축, IRP에서 IRP)의 이체는 나이·기간 제한 없이 자유롭습니다. 반면 연금저축과 IRP 상호 간 이체에는 요건이 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 연금계좌 이체 유형별 요건</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">이체 방향</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연금저축 → 연금저축</td>
                        <td className="p-3">자유 (나이·기간 제한 없음)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">IRP → IRP</td>
                        <td className="p-3">자유 (나이·기간 제한 없음)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연금저축 ↔ IRP 상호</td>
                        <td className="p-3">55세 이상 + 가입기간 5년 경과</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 이종 간 이체는 퇴직급여 재원 여부 등에 따라 추가 제한이 있을 수 있으므로, 금융사에 본인 계좌 기준으로 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이전할 때 손해 보는 건 없나요? (사례)</h2>
                <p>
                  세금 불이익은 없지만 상품별 비용은 있을 수 있습니다. 세 가지 사례로 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 연금저축펀드 → 저수수료 증권사</p>
                  <p className="text-sm text-text-secondary">
                    · 적립금 3,000만원을 수수료 낮은 증권사로 이전
                    <br />
                    · 세금: 0원 (이체는 인출 아님)
                    <br />
                    · 비용: 보유 펀드 환매수수료가 있으면 소액 발생 가능
                    <br />
                    <span className="text-xs text-text-tertiary">장기적으로 낮은 총보수가 수익률에 유리할 수 있습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 연금저축보험(가입 5년차) → 연금저축펀드</p>
                  <p className="text-sm text-text-secondary">
                    · 7년 이내 이체라 해지공제액 발생
                    <br />
                    · 이체 금액 = 적립금 − 해지공제액
                    <br />
                    <span className="text-xs text-text-tertiary">세금은 없지만 원금보다 적게 이체될 수 있어, 7년 경과 후 이전을 고려하는 것도 방법입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 세액공제 한도는 그대로</p>
                  <p className="text-sm text-text-secondary">
                    · 그해 연금저축 600만원, IRP 포함 900만원 한도는 이전과 무관
                    <br />
                    · 총급여 5,500만원 이하면 공제율 16.5%, 초과면 13.2% 적용
                    <br />
                    · 900만원 납입 × 16.5% = 약 <strong>148.5만원</strong> 세액공제 (이전과 별개)
                    <br />
                    <span className="text-xs text-text-tertiary">한도·공제율은 소득세법 §59의3 기준, 개인 소득에 따라 다릅니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">연금저축 vs IRP, 무엇이 다를까</h2>
                <p>
                  이전을 고민한다면 두 계좌의 차이를 알아야 합니다. 세액공제 한도와 투자 규제, 수수료가 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 연금저축과 IRP 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연금저축</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">IRP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">단독 세액공제 한도</td>
                        <td className="p-3">연 600만원</td>
                        <td className="p-3">연 900만원(연금저축 합산)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">위험자산 한도</td>
                        <td className="p-3">제한 없음</td>
                        <td className="p-3">적립금의 70%까지</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">계좌 관리 수수료</td>
                        <td className="p-3">대체로 없음</td>
                        <td className="p-3">있는 경우 많음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 IRP는 예금·채권 등 안전자산을 30% 이상 담아야 하는 규제가 있어, 주식형 위주로 운용하려면 연금저축이 자유롭습니다. 목적에 맞게 선택하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/pension-savings-irp-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">900만원 한도와 공제율로 환급액을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/pension-savings-early-termination-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축 중도해지 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">해지 시 기타소득세 부담, 이전과 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/irp-early-withdrawal-conditions-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">IRP 중도인출 조건</div>
                    <p className="mt-1 text-sm text-text-secondary">IRP를 중간에 찾을 수 있는 예외 사유.</p>
                  </Link>
                  <Link
                    href="/guide/isa-maturity-pension-account-transfer-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 만기 연금 전환</div>
                    <p className="mt-1 text-sm text-text-secondary">ISA 만기 자금을 연금계좌로 옮기는 절세.</p>
                  </Link>
                  <Link
                    href="/guide/private-pension-1500-million-separate-taxation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사적연금 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">연금 수령 시 세금과 분리과세 기준.</p>
                  </Link>
                  <Link
                    href="/category/investment/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">투자·자산 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연금·ETF·배당 관련 가이드 전체.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육·정보 제공 목적으로 작성되었으며, 특정 금융상품 가입 권유나 투자 자문이 아닙니다. 이전 가능 여부, 해지공제액, 환매수수료, 부분이체 제한, 연금저축과 IRP 상호 이체 요건은 상품과 금융사에 따라 다르므로 해당 금융사와 금융감독원 통합연금포털에서 반드시 확인하세요. 세액공제 한도·공제율은 개인 소득과 연도에 따라 달라집니다. 본 콘텐츠는 2026-08-14 기준으로 작성되었습니다. 인용한 법조항은 <strong>소득세법 §20의3(연금소득), §59의3(연금계좌세액공제)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="연금저축·IRP 계좌 이전 2026 가이드"
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
