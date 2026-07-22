import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/prepayment-penalty-fee-2026/';
const DATE_PUBLISHED = '2026-06-21';
const DATE_MODIFIED = '2026-06-21';

export const metadata: Metadata = {
  title: '중도상환수수료 계산·면제 조건 2026 | 대출 빠른 상환 가이드',
  description:
    '중도상환수수료란 대출을 약정 만기보다 일찍 갚을 때 은행이 부과하는 수수료입니다. 표준 계산 공식, 예시 시뮬레이션, 면제·감면 조건, 갈아타기 시 절감액 비교를 정리합니다. 2026년 기준.',
  keywords: [
    '중도상환수수료',
    '조기상환수수료',
    '대출 빨리 갚기',
    '중도상환',
    '대출수수료',
    '대출 갈아타기',
    '전세대출',
    '주담대',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '중도상환수수료 계산·면제 조건 2026 | 대출 빠른 상환 가이드' }],
    title: '중도상환수수료 계산·면제 조건 2026',
    description: '중도상환수수료 표준 산식, 면제 타이밍, 갈아타기 절감액 비교. 금융소비자보호법 기준 수수료 한계.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '중도상환수수료 계산·면제 조건',
    description: '대출을 빨리 갚을 때 수수료 계산 방법, 언제 면제되는지 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '중도상환수수료는 언제 부과되나요?',
    answer:
      '대출을 약정 만기 전에 일부 또는 전부 갚을 때 부과됩니다. 보통 실행 후 3년 이내에 상환하면 수수료가 발생하며, 3년을 경과하면 면제되는 경우가 일반적입니다. 다만 은행·상품마다 다르므로 약관을 확인하세요.',
  },
  {
    question: '중도상환수수료율을 1.2%로 가정하면, 1억 원을 2년 만에 갚을 때 수수료는 얼마나 되나요?',
    answer:
      '표준 산식을 사용합니다: 중도상환수수료 = 중도상환원금 × 수수료율 × (잔존기간 ÷ 면제기간). 1억 원, 1.2% 수수료율, 잔존 2년(730일), 면제기간 3년(1,095일)이면 = 1억 × 1.2% × (730÷1,095) ≈ 약 80만 원입니다. 분모 기준(대출약정기간 vs 면제기간)은 은행별로 다를 수 있습니다.',
  },
  {
    question: '대출을 3년 이후에 갚으면 정말 수수료가 없나요?',
    answer:
      '다수 은행이 대출 실행 후 3년 경과 시 중도상환수수료를 면제하는 것이 일반적 관행입니다. 단 일부 상품은 5년 이상 면제 없음, 또는 정해진 비율로 계속 감액하는 형태도 있으므로 반드시 약관과 계약서를 확인하세요.',
  },
  {
    question: '부분 상환할 때도 수수료가 나오나요?',
    answer:
      '네, 한 번에 전액을 갚지 않아도 일부만 상환하면 그 금액에 대해 수수료가 발생합니다. 일부 은행은 월 일정 한도 내 부분상환을 수수료 없이 허용하기도 하므로(예: 월 상환액의 10% 범위), 약관 확인이 필수입니다.',
  },
  {
    question: '갈아타기(대환)를 할 때 중도상환수수료가 차감되나요?',
    answer:
      '기존 대출을 새 대출로 갈아탈 때 기존 대출을 완전 상환하면 그 금액에 대한 중도상환수수료가 발생합니다. 새 대출 승인액에서 기존 대출 잔액 + 수수료를 차감한 금액이 실제 받는 돈이 됩니다. 따라서 금리 인상 효과 vs 수수료 비용을 비교해야 합니다.',
  },
  {
    question: '중도상환수수료가 나오는 이유가 뭘까요?',
    answer:
      '은행 입장에서 대출을 일찍 상환받으면 예정했던 이자 수익을 받지 못합니다. 중도상환수수료는 이 손실을 보전하기 위한 것입니다. 금융소비자보호법은 수수료가 실제 발생 비용을 초과할 수 없다는 소비자보호 취지를 담고 있습니다.',
  },
  {
    question: '수수료가 없는 대출도 있나요?',
    answer:
      '일부 대출 상품(예: 일부 정책자금, 저축은행 단기상품)은 중도상환수수료를 부과하지 않는 경우도 있습니다. 또한 다수 은행의 전세자금대출은 1주택자 조건에서 수수료가 저감되거나 면제될 수 있으므로 해당 상품 약관을 확인하세요.',
  },
  {
    question: '금리가 오른 상황에서 갈아타기가 유리한가요?',
    answer:
      '금리 인상으로 새로운 고정금리가 기존 금리보다 훨씬 높다면, 중도상환수수료를 내고도 갈아타기가 손해일 수 있습니다. 예를 들어 기존 4% 대출의 수수료가 150만 원이고, 새 대출이 5%라면 잔존 기간 동안의 이자 증가액이 150만 원보다 크지 않는 한 갈아타기는 비효율적입니다. 정확한 비교는 대출이자 계산기에서 월 상환액을 대비해 확인하세요.',
  },
];

export default function PrepaymentPenaltyFee2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '중도상환수수료 계산·면제 조건 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '중도상환수수료 계산·면제 조건 2026',
    description:
      '중도상환수수료 표준 계산 공식, 면제 타이밍, 갈아타기 시 절감액 비교. 금융소비자보호법 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['중도상환수수료', '대출', '대환', '전세', '주택담보'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '중도상환수수료 계산·면제 조건 2026 | calculatorhost',
    description:
      '대출을 약정 만기 전에 갚을 때 부과하는 중도상환수수료의 계산 공식, 면제 조건, 갈아타기 시 절감액 비교를 단계별로 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

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
                    { name: '중도상환수수료 계산·면제 조건 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 8분 읽기 · 2026-06-21
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  중도상환수수료 계산·면제 조건 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  중도상환수수료란 대출을 약정 만기보다 일찍 갚을 때 은행이 부과하는
                  수수료입니다. 대출금을 빨리 상환하거나 다른 대출로 갈아타기(대환)할 때
                  발생하는 비용이므로, 사전에 계산하고 면제 조건을 확인하는 것이 중요합니다.
                  표준 산식, 실제 사례, 면제·감면 일반 관행을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-prepayment-penalty-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    중도상환수수료 개념 및 산식
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">개념</th>
                      <th scope="col" className="pb-2 text-left font-semibold">설명</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">정의</td>
                      <td>대출을 약정 만기 전 상환할 때 은행이 부과하는 수수료</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">표준 산식</td>
                      <td>중도상환원금 × 수수료율 × (잔존기간 ÷ 면제기간)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">면제기간</td>
                      <td>보통 3년(1,095일). 대출약정기간과의 비율 계산 기준은 은행/상품마다 상이</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">일반 관행</td>
                      <td>3년 경과 시 면제가 일반적. 부분상환 한도 내 무수수료도 일부 은행 지원</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">중도상환수수료란? 정의와 발생 원인</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  중도상환수수료는 대출 계약 만기 전에 원금을 일부 또는 전부 갚을 때 부과되는
                  수수료입니다. 은행 입장에서 대출을 일찍 회수받으면 예정했던 이자 수익을
                  받지 못하는 손실이 발생하는데, 이를 보전하기 위한 비용으로 이해할 수 있습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  금융소비자보호법은 이러한 수수료가 <strong>실제 발생 비용을 초과할 수 없다</strong>는
                  소비자보호 취지를 담고 있습니다. 따라서 수수료율이나 계산 방식이 법적·계약상
                  한계 이상으로 책정되었다면 이를 문제 삼을 수 있습니다. 다만 정확한 적용 조건과
                  한계 기준은 은행·상품·시점에 따라 다르므로, 약관 검토와 은행 상담이 필수입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 소비자가 중도상환을 원할 때 은행이 수수료를 부과하지 않을 권리를 가진다고
                  단정할 수 없습니다. 계약서와 약관에 명시된 수수료 조건을 사전에 충분히 확인하고,
                  필요하면 은행 상담을 통해 감면 가능성을 문의하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">표준 계산 공식 및 주요 요소</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  중도상환수수료 계산의 표준 산식은 다음과 같습니다:
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm font-mono">
                  <p className="text-text-primary">
                    중도상환수수료 = 중도상환원금 × 수수료율 × (잔존기간 ÷ 면제기간)
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  각 요소의 의미는 다음과 같습니다:
                </p>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    <strong>중도상환원금</strong> — 일부만 갚는 경우 그 금액, 전액 상환 시
                    남은 원금 전체
                  </li>
                  <li>
                    <strong>수수료율</strong> — 대출 상품·신용도·금리 환경에 따라 달라지는 비율 (정확한 값은 약관 확인)
                  </li>
                  <li>
                    <strong>잔존기간</strong> — 상환일 기준 대출 만기까지 남은 기간 (일수 기준)
                  </li>
                  <li>
                    <strong>면제기간</strong> — 대부분 3년(1,095일). <strong>분모 기준(대출약정기간 vs
                    면제기간)은 은행별로 다를 수 있으므로 약관 확인 필수</strong>
                  </li>
                </ul>
                <p className="text-text-secondary leading-relaxed">
                  아래 사례에 쓰인 수수료율은 모두 이해를 돕기 위한 가정값이며, 특정 은행이나
                  상품의 실제 수수료를 의미하지 않습니다. 정확한 수수료율과 계산 기준은 본인의
                  대출 계약서와 약관을 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">실제 사례 시뮬레이션</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  표준 공식을 이용해 실제 상황을 가정해 봅시다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">사례 1: 전세자금대출 2년 상환</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>중도상환원금: 1억 원</li>
                    <li>수수료율: <strong>1.0%로 가정</strong> (실제 수수료율은 상품·은행마다 다름)</li>
                    <li>잔존기간: 2년 (730일)</li>
                    <li>면제기간: 3년 (1,095일)</li>
                  </ul>
                  <p className="mt-3 font-mono text-text-primary">
                    수수료 = 1억 × 1.0% × (730÷1,095) ≈ <strong>약 67만 원</strong>
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    ※ 분모 기준이 대출약정기간이면 다를 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">사례 2: 주담대 부분상환</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>중도상환원금: 5,000만 원 (부분상환)</li>
                    <li>수수료율: <strong>1.2%로 가정</strong></li>
                    <li>잔존기간: 1년 6개월 (547일)</li>
                    <li>면제기간: 3년 (1,095일)</li>
                  </ul>
                  <p className="mt-3 font-mono text-text-primary">
                    수수료 = 5,000만 × 1.2% × (547÷1,095) ≈ <strong>약 30만 원</strong>
                  </p>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">사례 3: 대환 (갈아타기)</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>기존 대출 잔액: 2억 원</li>
                    <li>수수료율: <strong>1.3%로 가정</strong></li>
                    <li>잔존기간: 2년 (730일)</li>
                    <li>면제기간: 3년 (1,095일)</li>
                  </ul>
                  <p className="mt-3 font-mono text-text-primary">
                    수수료 = 2억 × 1.3% × (730÷1,095) ≈ <strong>약 173만 원</strong>
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    새 대출 승인액에서 이 수수료가 차감됩니다.
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 위 사례는 모두 <strong>가정한 수수료율</strong>에 기반합니다. 실제 수수료는 은행,
                  상품, 시점, 고객 신용도 등에 따라 크게 달라질 수 있으므로, 정확한 금액은 해당
                  은행 약관이나 상담을 통해 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">면제·감면 조건 (일반적 관행)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  대부분 은행이 일정 기간 이후 중도상환수수료를 면제하거나 감면하는 것이
                  일반적입니다. 다음은 시중 은행의 통상적 관행입니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">① 기간 경과 시 면제</h3>
                <p className="text-text-secondary leading-relaxed">
                  대출 실행 후 <strong>3년이 경과하면 중도상환수수료를 면제</strong>하는 경우가 일반적입니다.
                  이는 은행이 약 3년의 기간 동안 충분한 이자 수익을 확보했다는 판단에 기반합니다.
                  다만 일부 상품은 5년 이상 면제하지 않는 형태도 있고, 정해진 비율로 계속 감액하는
                  방식도 존재하므로 <strong>반드시 약관을 확인하세요</strong>.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">② 부분상환 한도 내 면제</h3>
                <p className="text-text-secondary leading-relaxed">
                  일부 은행은 월 상환액의 10% 범위 또는 월 정액(예: 월 500만 원)까지를 수수료
                  없이 상환할 수 있도록 허용합니다. 초과분에만 수수료를 적용하는 방식입니다.
                  이 조건도 상품마다 다르므로 약관에서 확인해야 합니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">③ 정책자금·우대상품 면제</h3>
                <p className="text-text-secondary leading-relaxed">
                  일부 정책자금(예: 전월세보증금 대출, 생애 첫 주택 구매 대출)이나 우대 금리
                  상품은 중도상환수수료를 부과하지 않거나 대폭 감면할 수 있습니다. 해당하는
                  대출이 있다면 반드시 확인하세요.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 위는 업계 일반 관행이며, 모든 은행·상품이 동일하게 적용하지는
                  않습니다. 정확한 면제 조건은 본인의 대출 약관과 계약서에 명시되어 있으므로,
                  빠른 상환이나 갈아타기를 계획할 때는 반드시 은행에 문의하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">갈아타기 시 절감액 비교</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  금리가 오른 환경에서 기존 대출을 새로운 저금리 대출로 갈아타는 것을 고려할
                  때, 중도상환수수료는 중요한 비용입니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    의사결정 프로세스
                  </h3>
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1단계:</strong> 기존 대출의 중도상환수수료 정확히 파악
                    </li>
                    <li>
                      <strong>2단계:</strong> 새 대출의 금리 확정 (예: 4% → 3.5%)
                    </li>
                    <li>
                      <strong>3단계:</strong> 남은 기간 동안 금리 차이로 절감할 이자액 계산
                    </li>
                    <li>
                      <strong>4단계:</strong> 절감액이 수수료를 상쇄하는지 비교
                    </li>
                  </ol>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  예를 들어, 기존 대출 5억 원·남은 기간 20년·4.0% 금리에서, 수수료 150만 원을
                  내고 3.5%로 갈아탄다고 합시다. 금리 0.5%p 차이로 20년간 절감할 이자는 약
                  몇천만 원대이므로 갈아타기가 유리합니다. 반대로 금리 차이가 0.1%p라면 절감액이
                  몇백만 원 수준이므로 수수료가 회수되지 않을 수 있습니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 위는 개념 설명이며, 실제 절감액은 대출 상품·잔액·남은 기간·신용도에
                  따라 크게 달라집니다. 정확한 비교는 대출이자 계산기에서 월 상환액을 직접
                  입력해 계산하거나, 금융기관 상담을 통해 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">중도상환수수료 줄이는 실전 팁</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  중도상환수수료를 효과적으로 관리하는 방법을 정리합니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">① 만기 임박 시점까지 기다리기</h3>
                <p className="text-text-secondary leading-relaxed">
                  가장 확실한 방법은 3년 경과 후 상환하는 것입니다. 급하지 않다면 면제 시점까지
                  대기함으로써 수수료를 완전히 피할 수 있습니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">② 부분상환 한도 활용</h3>
                <p className="text-text-secondary leading-relaxed">
                  월 상환액의 10% 또는 정해진 금액 이내로 추가 상환할 때 수수료 없이 상환할 수
                  있는 상품이 있습니다. 이를 적극 활용하면 기간을 단축하면서 수수료를 최소화할 수
                  있습니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">③ 은행 상담으로 감면 신청</h3>
                <p className="text-text-secondary leading-relaxed">
                  고객 신용도가 우수하거나 장기 거래 고객인 경우, 은행이 수수료를 일부 감면해 주기도
                  합니다. 미리 상담해 감면 가능성을 문의하는 것이 좋습니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">④ 금리 차이가 충분할 때만 대환</h3>
                <p className="text-text-secondary leading-relaxed">
                  금리 인하폭이 작으면 수수료가 회수되지 않습니다. 최소 0.3~0.5%p 이상 내려갈
                  때만 대환을 검토하세요.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 위는 일반적 팁이며, 개인의 재무 상황, 현금 흐름, 신용도에 따라 최선의
                  선택이 다릅니다. 중요한 재정 결정이 필요할 때는 반드시 금융기관 상담을 거치세요.
                </p>
              </section>

              <AdSlot slot="guide-prepayment-penalty-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 정보 제공 목적이며, 특정 은행·상품의 수수료율을 보장하지
                    않습니다.
                  </li>
                  <li>
                    • 중도상환수수료의 정확한 금액, 면제 조건, 계산 방식은 <strong>은행·상품·시점마다
                    다릅니다</strong>.
                  </li>
                  <li>
                    • 수수료 시뮬레이션에 사용된 모든 수수료율과 기간은 <strong>가정</strong>이며, 실제
                    적용되는 값이 아닙니다.
                  </li>
                  <li>
                    • 빠른 상환, 대환, 부분상환을 계획할 때는 <strong>반드시 본인의 대출 계약서와
                    약관을 확인</strong>하고 해당 은행에 정확한 수수료를 문의하세요.
                  </li>
                  <li>
                    • 본 사이트는 투자·금융상품 권유를 하지 않으며, 모든 재정 결정은 본인
                    책임입니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 원리금균등·만기일시별 월 상환액 및 총 이자 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan-limit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출한도 계산기 (DSR/LTV/DTI)
                    </Link>{' '}
                    — 주담대·전세자금대출 최대 한도 시뮬레이션
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/dsr-loan-limit-tips/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      DSR 대출한도 늘리는 5가지 방법
                    </Link>{' '}
                    — 신용대출 상환, 소득 합산 등 한도 확보 전략
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/interest-rate-hike-dsr-loan-limit-july-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      기준금리 오르면 대출한도 줄어들까? 2026
                    </Link>{' '}
                    — 금리 인상 시 대출한도 및 월 상환액 변화 분석
                  </li>
                  <li>
                    →{' '}
                    <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">
                      금융 용어사전
                    </Link>{' '}
                    — DSR, LTV, DTI, 원리금균등, 스트레스금리 정의
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 대출, 예금, 적금, 환율 관련 모든 가이드 및 계산기
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 금융소비자보호법 (중도상환수수료 관련 소비자보호 규정) ·
                  개별 은행의 중도상환수수료 약관.
                </p>
                <p className="mb-2">
                  <strong>참고 자료</strong>:{' '}
                  <a
                    href="https://finlife.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원 핀라이프
                  </a>
                  ,{' '}
                  <a
                    href="https://www.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원 공시
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
