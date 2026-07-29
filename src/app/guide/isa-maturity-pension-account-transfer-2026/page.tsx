// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/isa-maturity-pension-account-transfer-2026/';
const DATE_PUBLISHED = '2026-07-30';
const DATE_MODIFIED = '2026-07-30';

export const metadata: Metadata = {
  title: 'ISA 만기 연금계좌 전환 2026, 300만원 추가 세액공제',
  description:
    'ISA 만기자금을 60일 안에 연금저축·IRP로 옮기면 이전액의 10%, 최대 300만원을 추가로 세액공제받습니다. 60일 기한과 한도 없는 이체, 연 최대 1,200만원 공제 구조를 소득세법 §59의3 기준으로 정리했습니다.',
  keywords: [
    'ISA 만기 연금전환',
    'ISA 연금저축 이전',
    'ISA 300만원 세액공제',
    'ISA IRP 전환',
    '연금계좌 세액공제',
    '소득세법 59조의3',
    'ISA 만기자금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'ISA 만기 연금계좌 전환 2026, 300만원 추가 세액공제' }],
    title: 'ISA 만기 연금계좌 전환 2026, 300만원 추가 세액공제',
    description: 'ISA 만기자금을 60일 안에 연금계좌로 옮기면 이전액의 10%, 최대 300만원 추가 세액공제. 연 최대 1,200만원 공제 구조 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISA 만기 연금계좌 전환 2026, 300만원 추가 세액공제',
    description: 'ISA 만기자금을 놀리지 말고 60일 안에 연금계좌로. 이전액 10%, 최대 300만원을 더 돌려받습니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'ISA 만기자금을 연금계좌로 옮기면 무슨 혜택이 있나요?',
    answer:
      'ISA 만기 해지금을 연금저축이나 IRP로 이전하면 이전 금액의 10%, 최대 300만원을 추가로 세액공제받습니다(소득세법 §59의3). 원래 연금계좌 세액공제 한도인 연 900만원에 이 300만원이 더해져, 그 해에 최대 1,200만원까지 세액공제 대상이 될 수 있습니다.',
  },
  {
    question: '언제까지 옮겨야 하나요?',
    answer:
      'ISA 만기(계약기간 만료) 해지일로부터 60일 이내에 연금저축이나 IRP로 입금해야 합니다. 60일을 하루라도 넘기면 ISA 전환에 따른 추가 세액공제 혜택은 사라지고, 일반 납입으로 처리되어 연 900만원 한도 안에서만 공제됩니다. 만기가 다가오면 미리 연금계좌를 준비해 두세요.',
  },
  {
    question: '300만원 추가 공제를 다 받으려면 얼마를 옮겨야 하나요?',
    answer:
      '이전액의 10%가 공제 대상이므로, 300만원 전액을 받으려면 3,000만원을 이전해야 합니다. 예를 들어 1,000만원을 옮기면 그 10%인 100만원이 추가 공제 대상이 됩니다. 이전 금액이 많을수록 추가 공제도 커지지만, 상한은 300만원입니다.',
  },
  {
    question: '연금계좌 연간 납입한도를 넘겨서 옮겨도 되나요?',
    answer:
      '됩니다. ISA 만기 전환금은 연금저축·IRP의 연간 납입한도(연 1,800만원)와 별도로 취급되어 한도에 관계없이 전액 이체할 수 있습니다. 즉 그해 이미 납입한도를 채웠더라도 ISA 만기자금은 추가로 옮길 수 있습니다. 다만 추가 세액공제는 이전액의 10%, 최대 300만원까지만 적용됩니다.',
  },
  {
    question: '세액공제율은 얼마인가요?',
    answer:
      '소득에 따라 다릅니다. 총급여 5,500만원(종합소득금액 4,500만원) 이하면 16.5%, 그보다 많으면 13.2%가 적용됩니다(지방소득세 포함). 예를 들어 총급여 5,000만원인 사람이 300만원 추가 공제를 받으면 300만원 × 16.5% = 49만5천원을 세금에서 돌려받습니다.',
  },
  {
    question: 'ISA를 반드시 만기까지 유지해야 하나요?',
    answer:
      '추가 세액공제는 만기 해지금을 옮길 때 적용되므로, 의무가입기간(3년)을 채우고 만기 해지한 자금이어야 안전합니다. 중도해지하면 ISA 자체의 세제 혜택(비과세·분리과세)을 잃을 수 있고, 연금전환 추가공제도 취지에 맞지 않을 수 있습니다. 만기까지 유지한 뒤 전환하는 것이 정석입니다.',
  },
  {
    question: '옮긴 돈을 나중에 찾으면 세금은 어떻게 되나요?',
    answer:
      '연금계좌로 옮긴 자금은 연금 목적의 돈이 되므로, 만 55세 이후 연금으로 받으면 낮은 연금소득세(3.3~5.5%)가 적용됩니다. 반대로 연금이 아니라 중도에 일시금으로 찾으면 기타소득세(16.5%)가 부과되고, 추가 세액공제받은 부분도 추징될 수 있습니다. 노후 연금 재원으로 쓸 자금만 옮기는 것이 바람직합니다.',
  },
  {
    question: '연금저축과 IRP 중 어디로 옮기는 게 좋나요?',
    answer:
      '둘 다 ISA 전환 추가 세액공제 대상입니다. 연금저축은 중도인출이 상대적으로 자유롭고, IRP는 인출이 더 엄격한 대신 위험자산 투자 한도 등에서 차이가 있습니다. 이미 운용 중인 연금계좌가 있다면 그쪽으로 합치는 것이 관리가 편하고, 없다면 인출 유연성과 상품 구성을 비교해 선택하세요.',
  },
];

export default function IsaMaturityPensionAccountTransfer2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'ISA 만기 연금계좌 전환 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'ISA 만기 연금계좌 전환 2026, 300만원 추가 세액공제',
    description:
      'ISA 만기자금을 60일 내 연금저축·IRP로 이전할 때의 추가 세액공제(이전액 10%, 최대 300만원), 한도 없는 이체, 연 최대 1,200만원 공제 구조를 소득세법 §59의3 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['ISA', '연금저축', 'IRP', '세액공제', '만기 전환'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'ISA 만기 연금계좌 전환 2026',
    description: 'ISA 만기자금 연금계좌 전환 시 추가 세액공제와 60일 기한, 공제 구조 정리.',
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
                    { name: 'ISA 만기 연금계좌 전환 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">투자자·직장인 · 8분 읽기 · 2026-07-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  ISA 만기 연금계좌 전환 2026
                  <br />
                  <span className="text-2xl text-text-secondary">300만원 추가 세액공제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 ISA 계좌의 만기가 다가오는 투자자와 절세를 챙기려는 직장인을 위한 것입니다. ISA 만기자금을 그냥 찾아 쓰면 그걸로 끝이지만, 60일 안에 연금저축이나 IRP로 옮기면 이전액의 10%, 최대 300만원을 추가로 세액공제받습니다. 놓치기 쉬운 60일 기한과 한도, 연 최대 1,200만원까지 공제받는 구조를 소득세법 조항과 함께 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-isa-maturity-pension-account-transfer-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">ISA 만기 연금전환이란 무엇인가요?</h2>
                <p>
                  ISA(개인종합자산관리계좌)는 만기가 되면 그 안의 자금을 연금저축이나 IRP로 옮길 수 있고, 이때 특별한 추가 세액공제가 주어집니다(소득세법 §59의3, 조세특례제한법 §91의8). 만기자금을 노후 연금 재원으로 유도하기 위해 만든 혜택으로, 옮긴 금액의 10%를 최대 300만원까지 그해 세금에서 공제해 줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>추가 공제: 이전액의 10%, 최대 300만원</li>
                    <li>기한: ISA 만기 해지일부터 60일 이내 이체</li>
                    <li>한도: 연금계좌 연 납입한도(1,800만원)와 별도, 전액 이체 가능</li>
                    <li>합산 공제: 기본 900만원 + ISA 300만원 = 최대 1,200만원</li>
                    <li>근거: 소득세법 §59의3, 조세특례제한법 §91의8</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추가 세액공제는 얼마나 받나요?</h2>
                <p>
                  핵심은 이전액의 10%, 최대 300만원입니다. 300만원을 다 받으려면 3,000만원을 옮겨야 하고, 그보다 적게 옮기면 그 10%만큼만 공제 대상이 됩니다. 여기에 원래 연금계좌 기본 공제 한도 900만원을 더하면, 그해 최대 1,200만원까지 세액공제 대상이 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 연금계좌 세액공제 한도 구조 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 대상 한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연금저축</td>
                        <td className="p-3">연 600만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">연금저축 + IRP 합산</td>
                        <td className="p-3">연 900만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">ISA 만기 전환 추가</td>
                        <td className="p-3"><strong>이전액 10%, 최대 300만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">그해 최대 합계</td>
                        <td className="p-3"><strong>1,200만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  세액공제율은 소득에 따라 총급여 5,500만원 이하 16.5%, 초과 시 13.2%가 적용됩니다(지방소득세 포함). 다만, 위 한도는 각각의 계좌·소득 요건에 따라 달라질 수 있으니 신고 전 국세청 안내를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 공제액 계산 사례</h2>
                <p>
                  얼마를 옮기느냐, 소득이 얼마냐에 따라 돌려받는 금액이 달라집니다. 두 가지 사례로 확인해 보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 3,000만원 이전 (총급여 5,000만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 이전 금액: 30,000,000원
                    <br />
                    · 추가 공제 대상: 30,000,000 × 10% = 3,000,000원 (상한 도달)
                    <br />
                    · 공제율: 16.5% (총급여 5,500만원 이하)
                    <br />
                    · 환급액: 3,000,000 × 16.5% = <strong>495,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">기본 900만원 공제와 별개로 약 49.5만원을 추가로 돌려받음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 1,000만원 이전 (총급여 7,000만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 이전 금액: 10,000,000원
                    <br />
                    · 추가 공제 대상: 10,000,000 × 10% = 1,000,000원
                    <br />
                    · 공제율: 13.2% (총급여 5,500만원 초과)
                    <br />
                    · 환급액: 1,000,000 × 13.2% = <strong>132,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">이전액이 적으면 추가 공제도 그만큼 줄어듦(10% 비례).</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 두 사례 모두 낼 세금(결정세액)이 공제액보다 많다는 전제입니다. 원래 낼 세금이 적으면 그 한도까지만 돌려받으며, 연금저축 세액공제는 환급 성격이라 결정세액이 없으면 효과가 줄어듭니다.
                </p>
              </section>

              <AdSlot slot="guide-isa-maturity-pension-account-transfer-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">60일 기한을 놓치면 어떻게 되나요?</h2>
                <p>
                  ISA 만기 해지일부터 60일이 지나면 추가 세액공제 혜택이 사라집니다. 이 경우 옮긴 돈은 일반 연금 납입으로 취급되어, 연 900만원 한도 안에서만 공제됩니다. ISA 전환의 가장 큰 매력인 300만원 추가 공제를 통째로 날리는 셈입니다.
                </p>
                <p>
                  따라서 ISA 만기가 다가오면 미리 연금저축이나 IRP 계좌를 개설해 두고, 만기 해지 직후 지체 없이 이체하는 것이 안전합니다. 금융기관에 따라 ISA 만기자금을 같은 회사 연금계좌로 옮기는 전용 절차를 제공하기도 하니, 만기 전에 거래 증권사·은행에 문의해 두세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">그냥 인출 vs 연금계좌 전환, 무엇이 유리한가요?</h2>
                <p>
                  만기자금을 어떻게 처리하느냐에 따라 세제 혜택이 갈립니다. 당장 돈이 필요하지 않다면 전환이 대체로 유리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. ISA 만기자금 처리 방식 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">그냥 인출</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연금계좌 전환</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">추가 세액공제</td>
                        <td className="p-3">없음</td>
                        <td className="p-3"><strong>최대 300만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">자금 성격</td>
                        <td className="p-3">자유 사용</td>
                        <td className="p-3">노후 연금 재원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">인출 유연성</td>
                        <td className="p-3">즉시 사용</td>
                        <td className="p-3">중도인출 시 기타소득세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  정리하자면, 만기자금을 당장 쓸 계획이 없다면 60일 안에 연금계좌로 옮겨 300만원 추가 공제를 챙기는 것이 합리적입니다. 반대로 곧 큰 지출이 예정돼 있다면, 연금계좌에 묶여 중도인출 시 세금 불이익을 볼 수 있으므로 필요한 만큼만 남기고 옮기는 편이 낫습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 세제 혜택 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">비과세·분리과세 등 ISA 기본 혜택을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/pension-savings-irp-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">연 900만원 기본 공제 한도와 공제율을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/pension-income-tax-withholding-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금소득세 3.3~5.5%</div>
                    <p className="mt-1 text-sm text-text-secondary">연금으로 받을 때 적용되는 낮은 세율 구조.</p>
                  </Link>
                  <Link
                    href="/guide/irp-early-withdrawal-conditions-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">IRP 중도인출 조건</div>
                    <p className="mt-1 text-sm text-text-secondary">중도에 찾을 때의 세금과 예외 사유를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/etf-tax-domestic-overseas-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국내·해외 ETF 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">ISA로 담기 좋은 ETF의 과세 방식을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융·투자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">예금·적금·투자 세금 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 특정 금융상품의 가입을 권하거나 개인 맞춤형 세무 조언을 제공하지 않습니다. 연금계좌 세액공제 한도, ISA 전환 추가공제율, 납입한도는 개정될 수 있으므로 이체·신고 전 국세청과 거래 금융기관에서 최신 내용을 반드시 확인하세요. 실제 환급액은 개인의 소득과 결정세액에 따라 달라지며, 중도인출 시 세금 불이익이 있습니다. 본 콘텐츠는 2026-07-30을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 근거 법령: <strong>소득세법 §59의3(연금계좌세액공제), 조세특례제한법 §91의8(개인종합자산관리계좌)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="ISA 만기 연금계좌 전환 2026 가이드"
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