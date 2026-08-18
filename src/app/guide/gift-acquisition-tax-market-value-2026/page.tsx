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

const URL = 'https://calculatorhost.com/guide/gift-acquisition-tax-market-value-2026/';
const DATE_PUBLISHED = '2026-08-19';
const DATE_MODIFIED = '2026-08-19';

export const metadata: Metadata = {
  title: '증여 취득세 과세표준 2026, 시가인정액 개정 후 계산',
  description:
    '2023년부터 부동산 증여 취득세 과세표준이 시가표준액에서 시가인정액으로 바뀌어 세부담이 커졌습니다(지방세법 §10의2). 시가인정액 정의, 평가기간, 시가표준액 1억 이하 예외, 아파트 증여 취득세 계산을 정리했습니다.',
  keywords: [
    '증여 취득세',
    '증여 취득세 과세표준',
    '시가인정액',
    '증여 취득세 계산',
    '아파트 증여 취득세',
    '시가표준액',
    '지방세법 10조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '증여 취득세 과세표준 2026, 시가인정액 개정 후 계산' }],
    title: '증여 취득세 과세표준 2026, 시가인정액 개정 후 계산',
    description: '증여 취득세 과표가 시가인정액으로 바뀌며 세금이 늘었습니다. 평가기간, 1억 이하 예외, 계산 사례.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '증여 취득세 과세표준 2026, 시가인정액 계산',
    description: '2023년부터 증여 취득세 과표는 시가인정액. 지방세법 §10의2 계산법과 예외.',
  },
};

const FAQ_ITEMS = [
  {
    question: '증여 취득세 과세표준이 어떻게 바뀌었나요?',
    answer:
      '2023년부터 시가인정액이 과세표준이 됐습니다(지방세법 §10의2). 그 전에는 공시가격 등 시가표준액을 기준으로 증여 취득세를 매겼지만, 2023년 1월 1일 이후 무상취득분부터는 매매사례가액·감정가액 같은 시가인정액을 과세표준으로 합니다. 시가인정액은 대개 공시가격보다 높으므로 증여 취득세 부담이 늘어났습니다.',
  },
  {
    question: '시가인정액이란 정확히 무엇인가요?',
    answer:
      '불특정 다수 사이에 통상적으로 거래되는 가액입니다(지방세법 §10의2). 구체적으로는 매매사례가액, 감정가액, 공매·경매가액 등을 말합니다. 평가기간은 취득일 전 6개월부터 취득일 후 3개월까지이며, 이 기간 내에 확인되는 해당 부동산 또는 유사 부동산의 거래가액을 시가인정액으로 봅니다. 여러 값이 있으면 취득일에 가장 가까운 가액을 적용합니다.',
  },
  {
    question: '시가표준액과 시가인정액은 어떻게 다른가요?',
    answer:
      '시가표준액은 정부가 고시하는 공시가격 기준이고, 시가인정액은 실제 시장 거래가 기준입니다. 아파트처럼 유사 매매사례가 많은 부동산은 시가인정액이 시장가에 가깝게 산정돼 공시가격보다 높은 경우가 많습니다. 반면 거래가 드문 단독주택·토지는 감정평가를 받지 않으면 시가인정액을 특정하기 어려워, 실무상 감정가액을 활용하는 경우가 있습니다.',
  },
  {
    question: '소형 부동산도 무조건 시가인정액을 쓰나요?',
    answer:
      '아닙니다. 시가표준액 1억원 이하 부동산은 예외입니다(지방세법 §10의2). 이 경우 납세자가 시가인정액과 시가표준액 중 하나를 선택할 수 있습니다. 유사 매매사례가 높게 형성된 소형 부동산이라면 시가표준액을 선택해 취득세를 낮출 수 있으므로, 증여 전에 두 값을 비교해보는 것이 유리합니다.',
  },
  {
    question: '증여 취득세율은 얼마인가요?',
    answer:
      '무상취득(증여)은 3.5%가 표준세율입니다(지방세법 §11). 여기에 지방교육세 0.3%가 더해지고, 전용면적 85㎡를 초과하면 농어촌특별세 0.2%가 추가됩니다. 따라서 85㎡ 이하는 합계 약 3.8%, 85㎡ 초과는 약 4.0%가 됩니다. 다만 조정대상지역의 일정 가액 이상 주택을 증여하면 중과세율이 적용될 수 있습니다.',
  },
  {
    question: '조정대상지역 주택을 증여하면 세금이 더 무거운가요?',
    answer:
      '중과될 수 있습니다. 조정대상지역 내 시가표준액 3억원 이상 주택을 증여받으면 증여 취득세가 12%로 중과됩니다(지방세법 §13의2). 다만 1세대 1주택자가 배우자나 직계존비속에게 증여하는 경우 등은 중과에서 제외될 수 있습니다. 조정대상지역 지정과 중과 요건은 변동이 잦으므로, 증여 전 관할 시·군·구청이나 위택스에서 확인하세요.',
  },
  {
    question: '부담부증여도 전부 증여 취득세인가요?',
    answer:
      '아닙니다. 채무를 함께 넘기는 부담부증여는 두 부분으로 나눕니다. 전세보증금·대출 같은 채무 인수분은 유상취득으로 보아 일반 매매 취득세율(1~3% 등)을 적용하고, 나머지 순수 증여분만 무상취득 3.5%가 적용됩니다. 채무 부분은 증여자에게 양도소득세 문제가 생길 수 있으므로, 부담부증여는 취득세와 양도세를 함께 검토해야 합니다.',
  },
];

export default function GiftAcquisitionTaxMarketValue2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '증여 취득세 과세표준 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '증여 취득세 과세표준 2026, 시가인정액 개정 후 계산',
    description:
      '2023년 시가인정액 개정으로 달라진 부동산 증여 취득세 과세표준. 시가인정액 정의와 평가기간, 시가표준액 1억 이하 예외, 세율, 아파트 증여 취득세 계산 사례를 지방세법 §10의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['증여 취득세', '시가인정액', '과세표준', '지방세법 10조의2', '아파트 증여'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '증여 취득세 과세표준 2026',
    description:
      '2023년 시가인정액 개정 후 증여 취득세 과세표준 산정과 계산법을 정리한 가이드.',
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
                    { name: '증여 취득세 과세표준 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 증여자·수증자 · 8분 읽기 · 2026-08-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  증여 취득세 과세표준 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 시가인정액 개정 후 계산</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모가 자녀에게 아파트를 증여할 때 내는 취득세는 2023년을 기점으로 크게 달라졌습니다. 과세표준이 공시가격(시가표준액)에서 실제 시장가에 가까운 시가인정액으로 바뀌었기 때문입니다. 이 가이드는 시가인정액이 무엇이고 어떻게 산정되는지, 시가표준액과 무엇이 다른지, 소형 부동산의 예외는 무엇인지, 그리고 실제 증여 취득세가 얼마나 늘어나는지를 사례로 정리했습니다. 부동산 증여를 계획 중인 분을 위한 글입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여 취득세 과세표준이 어떻게 바뀌었나요</h2>
                <p>
                  2023년부터 시가인정액이 과세표준입니다(지방세법 §10의2). 2022년까지는 부동산을 무상으로 취득할 때 공시가격 등 시가표준액을 기준으로 취득세를 계산했지만, 2023년 1월 1일 이후 증여분부터는 매매사례가액·감정가액 같은 시가인정액을 과세표준으로 삼습니다. 시가인정액은 시장 실거래가에 가까워 대체로 공시가격보다 높으므로, 같은 부동산이라도 증여 취득세가 늘었습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-3 text-sm">
                  정의: 시가인정액은 매매사례가·감정가·공매가 등 시장에서 통상 성립되는 가액입니다. 핵심: 2023년부터 증여 취득세 과세표준이 시가표준액에서 시가인정액으로 바뀌었습니다 (지방세법 §10의2).
                </div>
                <p className="mt-4">
                  다만 상속으로 취득하는 경우에는 여전히 시가표준액을 과세표준으로 할 수 있는 등 무상취득 유형에 따라 규정이 다르므로, 증여와 상속을 구분해 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시가인정액은 어떻게 산정하나요</h2>
                <p>
                  평가기간 내 거래가액으로 정합니다. 시가인정액은 취득일 전 6개월부터 취득일 후 3개월까지의 기간에 확인되는 해당 부동산 또는 유사 부동산의 매매사례가액, 감정가액, 공매·경매가액을 말합니다(지방세법 §10의2). 여러 값이 있으면 취득일에 가장 가까운 날의 가액을 우선합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>매매사례가액:</strong> 같은 단지·같은 면적 등 유사 부동산의 최근 실거래가.
                  </li>
                  <li>
                    <strong>감정가액:</strong> 감정평가법인이 평가한 금액. 유사 매매사례가 없을 때 활용.
                  </li>
                  <li>
                    <strong>공매·경매가액:</strong> 해당 부동산의 공매·경매 낙찰가.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 아파트는 유사 매매사례가 풍부해 시가인정액 산정이 쉬운 반면, 단독주택·토지는 유사 거래가 드물어 감정평가를 받지 않으면 시가인정액을 특정하기 어렵습니다. 이때 어떤 가액을 쓸지에 따라 세액이 달라지므로 사전 검토가 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시가표준액 1억 이하 예외는 무엇인가요</h2>
                <p>
                  소형 부동산은 선택할 수 있습니다. 시가표준액이 1억원 이하인 부동산은 시가인정액 대신 시가표준액을 과세표준으로 선택할 수 있습니다(지방세법 §10의2). 유사 매매사례가 높게 형성된 소형 부동산이라면, 낮은 시가표준액을 선택해 취득세를 줄일 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 시가표준액 기준 vs 시가인정액 기준 비교 (지방세법 §10의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시가표준액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시가인정액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기준</td>
                        <td className="p-3">정부 고시 공시가격</td>
                        <td className="p-3">시장 실거래가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">일반 증여</td>
                        <td className="p-3">적용 불가(원칙)</td>
                        <td className="p-3">적용(2023~)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">시가표준액 1억 이하</td>
                        <td className="p-3">선택 가능</td>
                        <td className="p-3">선택 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 1억 이하 예외는 시가표준액 기준이므로, 시가표준액이 1억을 조금이라도 넘으면 예외가 적용되지 않고 시가인정액이 강제됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여 취득세는 실제로 얼마인가요</h2>
                <p>
                  과세표준(시가인정액)에 세율을 곱합니다. 무상취득 표준세율 3.5%에 지방교육세 0.3%, 전용 85㎡ 초과 시 농어촌특별세 0.2%가 더해집니다. 아래 사례로 확인하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 아파트(85㎡ 이하), 시가인정액 6억원, 비조정지역</p>
                  <p className="text-sm text-text-secondary">
                    · 취득세: 6억 × 3.5% = 2,100만원
                    <br />
                    · 지방교육세: 6억 × 0.3% = 180만원
                    <br />
                    · 농어촌특별세: 0원(85㎡ 이하)
                    <br />
                    · 합계: <strong>2,280만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 85㎡ 이하 주택은 취득세율 합계 약 3.8%가 적용됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 아파트(85㎡ 초과), 시가인정액 8억원, 비조정지역</p>
                  <p className="text-sm text-text-secondary">
                    · 취득세: 8억 × 3.5% = 2,800만원
                    <br />
                    · 지방교육세: 8억 × 0.3% = 240만원
                    <br />
                    · 농어촌특별세: 8억 × 0.2% = 160만원(85㎡ 초과)
                    <br />
                    · 합계: <strong>3,200만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 85㎡ 초과는 농특세가 붙어 합계 약 4.0%가 됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 개정 전후 비교, 시가표준액 4억 vs 시가인정액 6억 아파트</p>
                  <p className="text-sm text-text-secondary">
                    · 2022년(개정 전, 시가표준액 4억 기준): 4억 × 3.5% = 1,400만원
                    <br />
                    · 2023년 이후(시가인정액 6억 기준): 6억 × 3.5% = 2,100만원
                    <br />
                    · 차이: <strong>약 700만원 증가</strong>(취득세 본세 기준)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 아파트라도 과세표준이 바뀌어 증여 취득세가 크게 늘었습니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">놓치기 쉬운 함정</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>공시가격만 보고 계산:</strong> 개정 후에는 공시가격이 아니라 시가인정액이 과표이므로, 유사 매매사례를 확인하지 않으면 세액을 과소 예상하게 됩니다.
                  </li>
                  <li>
                    <strong>조정지역 중과 간과:</strong> 조정대상지역 시가표준액 3억원 이상 주택 증여는 12% 중과 대상일 수 있습니다(지방세법 §13의2, 요건·예외 확인 필요).
                  </li>
                  <li>
                    <strong>부담부증여 혼동:</strong> 채무 인수분은 유상취득 세율, 순수 증여분만 3.5%가 적용되며 채무분은 증여자에게 양도세가 발생할 수 있습니다.
                  </li>
                  <li>
                    <strong>신고기한:</strong> 증여 취득세는 취득일이 속하는 달의 말일부터 3개월 이내에 신고·납부해야 하며, 늦으면 가산세가 붙습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  실질과세 원칙상 형식이 아니라 실제 거래 실질로 판단하므로(국세기본법 §14), 저가 양수도나 우회 증여로 과표를 낮추려 하면 증여세·취득세 추징 위험이 있습니다. 절세는 반드시 합법적 범위에서 세무 전문가와 설계하세요.
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
                    <p className="mt-1 text-sm text-text-secondary">과세표준과 세율을 넣어 취득세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여 취득세 세율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">무상취득 3.5%와 중과세율 구조를 정리.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">취득세와 함께 부담하는 증여세도 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/burden-gift-debt-assumption-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부담부증여 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">채무 인수 시 유상·무상으로 나뉘는 세금 구조.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">10년 단위 배우자·자녀 공제 한도.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">취득세·양도세·재산세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 시가인정액 산정, 증여 취득세율, 중과 여부는 부동산 종류·지역·가액·세대 상황에 따라 달라지므로 관할 시·군·구청, 위택스, 세무 전문가에게 반드시 확인하세요. 조정대상지역 지정과 중과 요건은 변동될 수 있습니다. 본 콘텐츠는 2026-08-19 기준이며 지방세법 개정 시 업데이트됩니다. 인용 법조항: <strong>지방세법 §10의2(무상취득의 경우 과세표준), §11(부동산 취득세율), §13의2(주택 중과), 국세기본법 §14(실질과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(지방세법 §10의2)</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(증여)</a>.
                </p>
              </section>

              <ShareButtons
                title="증여 취득세 과세표준 2026 가이드"
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
