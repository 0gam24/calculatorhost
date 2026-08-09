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

const URL = 'https://calculatorhost.com/guide/business-loss-carryforward-15-years-2026/';
const DATE_PUBLISHED = '2026-08-10';
const DATE_MODIFIED = '2026-08-10';

export const metadata: Metadata = {
  title: '사업 결손금 이월공제 2026, 15년 적용과 공제 순서',
  description:
    '사업이 적자를 내면 그 결손금을 이후 소득에서 빼주는 이월결손금 제도가 있습니다. 2020년 이후 발생분은 15년간 공제되며, 사업·근로·연금·기타·이자·배당 순으로 차감됩니다. 부동산임대업의 특례와 장부·신고 요건을 소득세법 §45로 정리했습니다.',
  keywords: [
    '결손금 이월공제',
    '이월결손금 15년',
    '사업 적자 세금',
    '결손금 공제 순서',
    '부동산임대업 결손금',
    '종합소득세 결손금',
    '소득세법 45조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '사업 결손금 이월공제 2026, 15년 적용과 공제 순서' }],
    title: '사업 결손금 이월공제 2026, 15년과 공제 순서',
    description: '적자를 다음 소득에서 빼주는 이월결손금. 15년 기한과 공제 순서, 임대업 특례까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '사업 결손금 이월공제 2026',
    description: '소득세법 §45. 이월결손금 15년, 공제 순서, 부동산임대업 특례.',
  },
};

const FAQ_ITEMS = [
  {
    question: '결손금과 이월결손금은 무엇이 다른가요?',
    answer:
      '결손금은 해당 과세기간에 사업 등에서 필요경비가 총수입금액을 초과해 생긴 손실입니다. 이 결손금을 그해 다른 소득에서 공제하고도 남으면, 남은 금액을 다음 과세기간으로 넘겨 공제하는데 이것을 이월결손금이라고 합니다(소득세법 §45). 즉 결손금은 당해 손실, 이월결손금은 다음 해로 넘긴 손실입니다.',
  },
  {
    question: '이월결손금은 몇 년까지 공제되나요?',
    answer:
      '2020년 1월 1일 이후 개시한 과세기간에 발생한 이월결손금은 발생 과세기간 종료일부터 15년 이내에 끝나는 과세기간의 소득에서 공제합니다(소득세법 §45③). 그 이전에 발생한 결손금은 발생 시기에 따라 10년 등 종전 기한이 적용되므로, 오래된 결손금은 발생 연도의 공제 기한을 별도로 확인해야 합니다.',
  },
  {
    question: '결손금은 어떤 소득에서 순서대로 공제되나요?',
    answer:
      '사업소득 결손금은 그해 사업소득에서 먼저 공제하고, 남으면 근로소득, 연금소득, 기타소득, 이자소득, 배당소득 순으로 공제합니다(소득세법 §45①). 이월된 결손금도 같은 순서로 다음 과세기간 소득에서 공제됩니다. 다만 부동산임대업 결손금은 이 순서에서 예외가 있어 별도로 처리됩니다.',
  },
  {
    question: '부동산임대업 결손금은 왜 다르게 처리되나요?',
    answer:
      '부동산임대업(주거용 건물 임대업 제외)에서 생긴 결손금은 다른 종합소득과 통산하지 않고, 그 부동산임대업의 소득에서만 이월해 공제합니다(소득세법 §45②). 즉 상가 임대에서 난 손실을 근로소득 등에서 빼주지 않고, 이후의 부동산임대 소득에서만 공제한다는 뜻입니다. 다만 주거용 건물 임대업은 일반 사업소득처럼 통산이 가능합니다.',
  },
  {
    question: '결손금 공제를 받으려면 무엇을 해야 하나요?',
    answer:
      '장부를 갖추고 종합소득세를 신고해야 합니다. 결손금은 복식부기 또는 간편장부로 소득금액을 계산해 신고할 때 인정됩니다. 특히 추계(경비율)로 신고하면 원칙적으로 이월결손금 공제가 배제될 수 있으므로(소득세법 §45④ 등), 손실이 났다면 장부를 근거로 결손 신고를 해두는 것이 이후 공제를 받는 열쇠입니다.',
  },
  {
    question: '추계신고를 하면 이월결손금을 못 쓰나요?',
    answer:
      '원칙적으로 그렇습니다. 소득세법은 소득금액을 추계로 결정·경정하는 과세기간에는 이월결손금 공제 규정을 적용하지 않도록 정하고 있습니다. 따라서 결손금을 이후에 활용하려면 손실이 난 해에 장부에 근거해 결손금을 신고해 두어야 하며, 공제받는 해에도 장부 신고를 하는 것이 안전합니다. 구체적 적용은 국세청·세무 전문가에게 확인하세요.',
  },
  {
    question: '결손금이 나면 그해 세금은 어떻게 되나요?',
    answer:
      '그 사업의 소득금액이 마이너스이므로 해당 소득에 대한 세금은 없고, 결손금을 같은 해 다른 소득에서 공제해 종합소득 전체의 과세표준을 낮춥니다. 공제하고도 남은 결손금은 이월해 다음 해 이후 소득에서 공제합니다. 다만 이미 원천징수된 세금이 있다면 신고를 통해 환급으로 이어질 수 있습니다.',
  },
  {
    question: '법인이 아닌 개인사업자도 이월결손금을 쓸 수 있나요?',
    answer:
      '네, 소득세법 §45는 개인의 종합소득세에 적용되는 규정입니다. 개인사업자·프리랜서가 사업에서 결손이 나면 이월결손금 제도를 활용할 수 있습니다. 법인의 이월결손금은 법인세법에 별도로 규정되어 있어 공제 한도 등이 다를 수 있으므로, 사업 형태에 맞는 규정을 확인해야 합니다.',
  },
];

export default function BusinessLossCarryforward2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '사업 결손금 이월공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '사업 결손금 이월공제 2026, 15년 적용과 공제 순서',
    description:
      '사업 적자로 생긴 결손금을 이후 소득에서 빼주는 이월결손금 제도. 2020년 이후 발생분 15년 공제, 사업·근로·연금·기타·이자·배당 공제 순서, 부동산임대업 특례와 장부 요건을 소득세법 §45로 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['결손금', '이월결손금', '15년', '공제 순서', '소득세법 45조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '사업 결손금 이월공제 2026',
    description:
      '사업 결손금과 이월결손금의 15년 공제 기한, 공제 순서, 부동산임대업 특례, 장부·신고 요건을 정리한 개인사업자 가이드.',
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
                    { name: '사업 결손금 이월공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자 · 8분 읽기 · 2026-08-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  사업 결손금 이월공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">15년 적용과 소득 공제 순서</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  사업이 적자를 냈을 때 그 손실을 이후 소득에서 빼주는 제도가 이월결손금 공제입니다. 개인사업자와 프리랜서에게는 세 부담을 크게 줄일 수 있는 장치이지만, 몇 년까지 공제되는지, 어떤 소득에서 빼는지, 장부 없이도 되는지 헷갈리기 쉽습니다. 이 가이드는 결손금과 이월결손금의 차이, 15년 공제 기한, 공제 순서, 부동산임대업 특례, 장부·신고 요건을 소득세법 조문에 근거해 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-business-loss-carryforward-15-years-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">결손금과 이월결손금은 무엇이 다른가요?</h2>
                <p>
                  결손금은 그해 사업의 필요경비가 총수입금액을 넘어 생긴 손실입니다. 이 손실을 같은 해 다른 소득에서 공제하고도 남은 부분을 다음 과세기간으로 넘겨 공제하는 것이 이월결손금입니다(소득세법 §45).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">개념 정리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 결손금: 당해 과세기간에 발생한 손실(필요경비가 수입 초과)
                    <br />
                    · 당해 통산: 결손금을 그해 다른 종합소득에서 순서대로 공제
                    <br />
                    · 이월결손금: 그래도 남은 손실을 다음 해 이후로 넘긴 것
                    <br />
                    · 목적: 흑자와 적자를 여러 해에 걸쳐 고르게 반영해 세 부담 조정
                  </p>
                </div>
                <p>
                  다만 이월결손금을 활용하려면 손실이 난 해에 결손금을 정확히 신고해 두어야 합니다. 신고로 남겨두지 않은 결손금은 이후에 꺼내 쓰기 어렵습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이월결손금은 몇 년까지 공제되나요?</h2>
                <p>
                  2020년 1월 1일 이후 개시한 과세기간에 발생한 이월결손금은 15년간 공제됩니다. 소득세법 §45③은 이월결손금을 발생 과세기간 종료일부터 15년 이내에 끝나는 과세기간의 소득금액에서 공제하도록 정합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 결손금 발생 시기별 이월공제 기한 (소득세법 §45③)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">발생 시기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">이월공제 기한</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2020년 이후 발생</td>
                        <td className="p-3">15년</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2009~2019년 발생</td>
                        <td className="p-3">10년(종전 규정)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">그 이전 발생</td>
                        <td className="p-3">발생 연도 규정 확인 필요</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 위 표의 종전 기한은 발생 연도의 개정 연혁에 따라 세부 적용이 다를 수 있습니다. 오래된 결손금을 활용할 때는 발생 연도 기준 공제 기한을 국세청이나 세무 전문가에게 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">결손금은 어떤 순서로 공제되나요?</h2>
                <p>
                  정해진 순서가 있습니다. 사업소득 결손금은 먼저 그해 사업소득에서 공제하고, 남으면 다른 종합소득으로 넘어갑니다. 소득세법 §45①에 따른 공제 순서는 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">공제 순서 (소득세법 §45①)</p>
                  <p className="text-sm text-text-secondary">
                    사업소득 → 근로소득 → 연금소득 → 기타소득 → 이자소득 → 배당소득
                    <br />
                    앞 소득에서 공제하고 남은 금액만 다음 소득으로 넘어갑니다.
                  </p>
                </div>
                <p>
                  예외: 이 순서는 일반 사업소득 결손금에 적용됩니다. 부동산임대업(주거용 제외) 결손금은 이 통산 순서에서 빠져 별도로 처리되므로 아래에서 따로 설명합니다.
                </p>
              </section>

              <AdSlot slot="guide-business-loss-carryforward-15-years-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부동산임대업 결손금의 특례</h2>
                <p>
                  부동산임대업 결손금은 다른 소득과 통산하지 못합니다. 소득세법 §45②는 부동산임대업(주거용 건물 임대업 제외)에서 발생한 결손금은 종합소득 과세표준을 계산할 때 다른 소득에서 공제하지 않고, 해당 부동산임대업의 소득에서만 이월공제하도록 정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 상가 임대에서 손실이 난 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 상가 임대업에서 결손금 3,000만원 발생, 같은 해 근로소득 5,000만원
                    <br />
                    · 잘못된 기대: 근로소득에서 3,000만원을 빼 과세표준을 낮춘다(불가)
                    <br />
                    · 실제 처리: 상가 임대 결손금은 근로소득에서 빼지 못하고 이월
                    <br />
                    · 공제 시점: 이후 상가 임대에서 소득이 날 때 그 소득에서만 공제
                  </p>
                </div>
                <p>
                  다만 주거용 건물 임대업 결손금은 일반 사업소득처럼 다른 종합소득과 통산할 수 있습니다. 상가와 주택 임대를 함께 한다면 어느 쪽 결손인지에 따라 처리가 달라지므로 구분이 중요합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">공제받으려면? 장부와 신고가 열쇠</h2>
                <p>
                  이월결손금은 장부에 근거한 신고가 있어야 인정됩니다. 손실이 났다고 자동으로 미래 세금이 줄어드는 것이 아니라, 결손금을 신고해 기록으로 남겨야 이후에 꺼내 쓸 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>손실 난 해:</strong> 복식부기 또는 간편장부로 소득금액을 계산해 결손금을 신고합니다.
                  </li>
                  <li>
                    <strong>추계신고 주의:</strong> 경비율로 추계신고하면 원칙적으로 이월결손금 공제가 배제될 수 있습니다. 손실이 났다면 장부 신고가 유리합니다.
                  </li>
                  <li>
                    <strong>공제받는 해:</strong> 이월결손금을 반영해 소득금액을 계산하고 종합소득세를 신고합니다.
                  </li>
                  <li>
                    <strong>증빙 보관:</strong> 결손을 입증할 장부와 증빙을 보관해 두면 이후 확인·경정에 대비할 수 있습니다.
                  </li>
                </ul>
                <p>
                  예외: 장부 작성이 부담스러운 소규모 사업자라도, 손실이 큰 해에는 장부 신고로 결손금을 남겨두는 것이 장기적으로 절세에 도움이 됩니다. 구체적 판단은 세무 전문가와 상의하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">복식부기 vs 간편장부</div>
                    <p className="mt-1 text-sm text-text-secondary">장부 종류와 결손 신고의 기초.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">추계신고의 구조와 장부 신고 비교.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 세율 구간</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준과 누진세율의 기본 구조.</p>
                  </Link>
                  <Link
                    href="/guide/housing-rental-income-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택임대소득 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">임대소득 과세와 결손 처리 이해.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율·세액을 미리 가늠해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 세무 자문이 아닙니다. 이월결손금의 공제 기한, 공제 순서, 부동산임대업 특례, 추계신고 시 공제 배제 여부는 개인의 소득 구성과 발생 연도에 따라 달라질 수 있으므로, 실제 신고 전 홈택스 또는 세무 전문가에게 확인하세요. 본 콘텐츠는 2026-08-10 기준이며 세법 개정 시 업데이트됩니다. 인용 조문: 소득세법 §45(결손금 및 이월결손금의 공제), §160(복식부기), §160의2(경비 증빙). AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="사업 결손금 이월공제 2026 가이드"
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
