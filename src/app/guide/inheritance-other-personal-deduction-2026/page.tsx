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

const URL = 'https://calculatorhost.com/guide/inheritance-other-personal-deduction-2026/';
const DATE_PUBLISHED = '2026-08-19';
const DATE_MODIFIED = '2026-08-19';

export const metadata: Metadata = {
  title: '상속세 인적공제 2026, 자녀 5천만 미성년 장애인 계산',
  description:
    '상속세 인적공제는 자녀 1인 5천만, 연로자 5천만, 미성년자·장애인은 1천만에 연수를 곱해 계산합니다(상증법 §20). 기초공제 2억을 더한 합계와 일괄공제 5억 중 큰 금액을 적용하는 선택 원리를 사례로 정리했습니다.',
  keywords: [
    '상속세 인적공제',
    '상속세 자녀공제',
    '상속세 일괄공제',
    '미성년자공제',
    '장애인공제',
    '상속세 기초공제',
    '상증법 20조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속세 인적공제 2026, 자녀 5천만 미성년 장애인 계산' }],
    title: '상속세 인적공제 2026, 자녀·미성년·장애인·연로자 공제 계산',
    description: '자녀 5천만·연로자 5천만·미성년/장애인 연수 곱하기. 기초공제 2억 합계와 일괄공제 5억 중 유리한 쪽을 고르는 법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속세 인적공제 2026, 자녀 5천만 미성년 장애인 계산',
    description: '상속세 기초공제·인적공제 vs 일괄공제 5억, 어느 쪽이 유리할까. 상증법 §20 계산법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상속세 인적공제에는 어떤 종류가 있나요?',
    answer:
      '자녀공제, 미성년자공제, 연로자공제, 장애인공제 네 가지입니다(상증법 §20). 자녀는 1인당 5천만원, 65세 이상 연로자는 1인당 5천만원을 공제합니다. 미성년자는 1천만원에 19세가 될 때까지의 연수를 곱하고, 장애인은 1천만원에 기대여명 연수를 곱해 계산합니다. 여기에 기초공제 2억원(상증법 §18)이 별도로 더해집니다.',
  },
  {
    question: '자녀공제는 1명당 얼마인가요?',
    answer:
      '1명당 5천만원입니다(상증법 §20①). 태아도 자녀에 포함됩니다. 2024년에 자녀공제를 대폭 올리는 개정안이 논의됐으나, 2026년 현재 시행 중인 금액은 1인당 5천만원입니다. 자녀가 여러 명이면 인원수만큼 곱해 합산하며, 미성년 자녀는 자녀공제와 미성년자공제를 중복으로 받을 수 있습니다.',
  },
  {
    question: '일괄공제 5억은 인적공제와 어떻게 다른가요?',
    answer:
      '일괄공제는 기초공제와 인적공제 합계 대신 선택할 수 있는 정액 공제입니다(상증법 §21). 기초공제 2억과 인적공제 합계를 더한 금액과 일괄공제 5억원 중 큰 금액을 적용합니다. 자녀가 적어 인적공제 합계가 작으면 일괄공제 5억이 유리하고, 자녀가 많거나 장애인공제가 크면 기초공제와 인적공제 합계가 더 유리할 수 있습니다.',
  },
  {
    question: '미성년자공제는 어떻게 계산하나요?',
    answer:
      '1천만원에 19세가 될 때까지의 남은 연수를 곱합니다(상증법 §20①). 예를 들어 15세 자녀라면 19세까지 4년이 남았으므로 1천만 × 4 = 4천만원을 미성년자공제로 받습니다. 이 미성년자공제는 자녀공제 5천만원과 별개로 중복 적용되므로, 15세 자녀 한 명은 자녀공제 5천만 + 미성년자공제 4천만 = 9천만원이 됩니다.',
  },
  {
    question: '장애인공제는 나이 제한이 있나요?',
    answer:
      '나이 제한 없이 기대여명 연수로 계산합니다. 장애인공제는 1천만원에 통계청 기대여명 연수를 곱하므로, 젊은 장애인일수록 공제액이 큽니다(상증법 §20①). 또한 장애인공제는 자녀공제·미성년자공제·연로자공제·배우자공제와 모두 중복 적용됩니다. 공제를 받으려면 장애인증명서를 상속세 신고 시 제출해야 합니다.',
  },
  {
    question: '배우자상속공제도 인적공제에 포함되나요?',
    answer:
      '별개의 공제입니다. 배우자상속공제는 상증법 §19에 따라 최소 5억원에서 최대 30억원까지 별도로 적용되며, 기초공제·인적공제(또는 일괄공제)에 더해집니다. 즉 배우자가 있으면 일괄공제 5억(또는 기초+인적)에 배우자상속공제를 추가로 받으므로, 실제 과세 미달 구간이 상당히 넓어집니다.',
  },
  {
    question: '상속인이 아닌 손자녀도 인적공제를 받나요?',
    answer:
      '동거가족이면 일부 인적공제가 가능하지만 제한이 있습니다. 인적공제는 원칙적으로 상속인과 피상속인이 사망 당시 부양하던 직계존비속 등 동거가족을 대상으로 합니다. 다만 상속을 포기했거나 대상 요건을 충족하지 못하면 공제되지 않을 수 있으므로, 손자녀 등 특수 관계는 세무 전문가에게 개별 확인하는 것이 안전합니다.',
  },
];

export default function InheritanceOtherPersonalDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속세 인적공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속세 인적공제 2026, 자녀 5천만 미성년 장애인 계산',
    description:
      '상속세 인적공제(자녀·미성년자·연로자·장애인)의 금액과 계산법, 기초공제 2억 합계와 일괄공제 5억 중 유리한 쪽을 고르는 원리, 배우자공제와의 관계를 상증법 §20·§21 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속세 인적공제', '자녀공제', '일괄공제', '장애인공제', '상증법 20조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속세 인적공제 2026',
    description:
      '상속세 인적공제 종류와 금액, 일괄공제 5억과의 비교 선택 원리를 정리한 가이드.',
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
                    { name: '상속세 인적공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인 · 8분 읽기 · 2026-08-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속세 인적공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 자녀 5천만 미성년 장애인 계산</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  상속세는 상속재산 전부에 곧바로 세금을 매기지 않습니다. 기초공제와 인적공제, 또는 일괄공제를 먼저 빼주기 때문입니다. 이 가이드는 가족 구성에 따라 달라지는 상속세 인적공제가 자녀·미성년자·연로자·장애인별로 각각 얼마인지, 기초공제 2억을 더한 합계와 일괄공제 5억 중 어느 쪽을 고르는 것이 유리한지를 사례로 정리했습니다. 상속을 앞두고 세부담을 미리 가늠하려는 분을 위한 글입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속세 인적공제란 무엇인가요</h2>
                <p>
                  상속세 인적공제는 남은 가족의 생활 보장을 위해 상속재산에서 가족 구성에 따라 빼주는 공제입니다(상증법 §20). 여기에 모든 상속에 기본으로 적용되는 기초공제 2억원(상증법 §18)이 더해집니다. 상속인은 기초공제와 인적공제를 합산한 금액과 일괄공제 5억원 중 큰 쪽을 선택해 적용할 수 있습니다(상증법 §21).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">공제 구조 한눈에 보기</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    상속재산 − (기초공제 2억 + 인적공제 합계) 또는 일괄공제 5억 중 큰 금액
                    <br />
                    − 배우자상속공제(별도, 최소 5억)
                    <br />
                    − 금융재산 상속공제 등 기타 공제
                    <br />
                    = 과세표준 → 세율 적용
                  </p>
                </div>
                <p className="mt-4">
                  다만 인적공제는 대상 가족이 실제로 존재해야 적용됩니다. 자녀가 없고 배우자만 있는 등 구성에 따라 유리한 선택이 달라지므로, 두 방식을 모두 계산해 비교하는 것이 핵심입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">인적공제 종류와 금액은 얼마인가요</h2>
                <p>
                  네 가지 공제가 있으며, 자녀·연로자는 정액, 미성년자·장애인은 연수를 곱해 계산합니다. 아래 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상속세 인적공제 종류와 금액 (상증법 §20, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">자녀공제</td>
                        <td className="p-3">1인당 <strong>5천만원</strong></td>
                        <td className="p-3">자녀(태아 포함)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">미성년자공제</td>
                        <td className="p-3">1천만 × (19세까지 연수)</td>
                        <td className="p-3">상속인·동거가족 중 미성년자</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연로자공제</td>
                        <td className="p-3">1인당 <strong>5천만원</strong></td>
                        <td className="p-3">65세 이상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">장애인공제</td>
                        <td className="p-3">1천만 × 기대여명 연수</td>
                        <td className="p-3">장애인(나이 제한 없음)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기초공제(별도)</td>
                        <td className="p-3"><strong>2억원</strong></td>
                        <td className="p-3">모든 상속(상증법 §18)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 자녀공제와 미성년자공제는 중복 적용되고, 장애인공제는 다른 모든 인적공제 및 배우자공제와 중복됩니다. 예외: 연로자공제는 자녀공제 대상(자녀)과는 대상이 겹치지 않도록 운영되므로, 실제 적용 대상을 구분해 계산해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기초·인적공제 합계 vs 일괄공제 5억, 무엇이 유리한가요</h2>
                <p>
                  둘 중 큰 금액을 고르면 됩니다(상증법 §21). 가족이 적으면 대개 일괄공제 5억이 유리하고, 자녀가 많거나 장애인공제가 크면 기초공제와 인적공제 합계가 5억을 넘어 그쪽이 유리해집니다. 아래 비교 표로 원리를 확인하세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 공제 방식 선택 비교 (상증법 §21)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가족 구성</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기초+인적 합계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적용액(큰 쪽)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">성년 자녀 2명</td>
                        <td className="p-3">2억 + 1억 = 3억</td>
                        <td className="p-3"><strong>일괄공제 5억</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">자녀 5명 + 장애인 1명(기대여명 40년)</td>
                        <td className="p-3">2억 + 2.5억 + 4억 = 8.5억</td>
                        <td className="p-3"><strong>기초+인적 8.5억</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 배우자가 단독으로 상속받는 경우에는 일괄공제를 적용할 수 없고 기초공제와 인적공제 합계만 쓸 수 있으므로, 이 예외를 반드시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산 사례</h2>
                <p>
                  가족 구성별로 인적공제와 최종 적용 공제액을 계산해봤습니다. 배우자상속공제는 별도이므로 아래 합계에 추가로 더해집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 성년 자녀 2명, 배우자 없음</p>
                  <p className="text-sm text-text-secondary">
                    · 기초공제: 2억
                    <br />
                    · 자녀공제: 5천만 × 2 = 1억
                    <br />
                    · 기초+인적 합계: 3억
                    <br />
                    · 일괄공제: 5억 → min이 아닌 max 적용 → <strong>5억 적용</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 인적공제 합계가 작아 일괄공제 5억이 유리합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 배우자 + 자녀 2명(1명은 15세)</p>
                  <p className="text-sm text-text-secondary">
                    · 기초공제: 2억
                    <br />
                    · 자녀공제: 5천만 × 2 = 1억
                    <br />
                    · 미성년자공제(15세, 19세까지 4년): 1천만 × 4 = 4천만
                    <br />
                    · 기초+인적 합계: 2억 + 1억 + 4천만 = 3.4억
                    <br />
                    · 일괄공제 5억과 비교 → <strong>5억 적용</strong> + 배우자상속공제(최소 5억) 별도
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 일괄공제 5억에 배우자공제 최소 5억을 더하면 10억까지 공제됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 자녀 5명 + 장애인 자녀 1명(기대여명 40년)</p>
                  <p className="text-sm text-text-secondary">
                    · 기초공제: 2억
                    <br />
                    · 자녀공제: 5천만 × 5 = 2.5억
                    <br />
                    · 장애인공제: 1천만 × 40 = 4억 (자녀공제와 중복)
                    <br />
                    · 기초+인적 합계: 2억 + 2.5억 + 4억 = 8.5억
                    <br />
                    · 일괄공제 5억과 비교 → <strong>기초+인적 8.5억 적용</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 인적공제 합계가 5억을 넘어, 이번엔 일괄공제보다 합산 방식이 유리합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">놓치기 쉬운 함정</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>일괄공제만 챙기고 끝내기:</strong> 자녀가 많거나 장애인공제가 큰 경우 기초+인적 합계가 5억을 넘을 수 있으니 반드시 두 방식을 모두 계산하세요.
                  </li>
                  <li>
                    <strong>장애인증명서 미제출:</strong> 장애인공제는 증명서를 상속세 신고 시 제출해야 인정됩니다.
                  </li>
                  <li>
                    <strong>배우자 단독상속:</strong> 배우자가 단독 상속하면 일괄공제를 쓸 수 없고 기초+인적만 적용됩니다.
                  </li>
                  <li>
                    <strong>사전증여 합산:</strong> 상속개시 전 10년 이내 상속인에게 증여한 재산은 상속재산에 합산되므로, 공제만 보고 안심하면 과세표준이 예상보다 커질 수 있습니다(상증법 §13).
                  </li>
                </ul>
                <p className="mt-4">
                  실질과세 원칙상 형식이 아니라 실제 상속 관계와 부양 사실을 기준으로 판단하므로(국세기본법 §14), 서류만으로 공제 대상 여부를 단정하지 말고 세무 전문가의 검토를 거치는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·세율·누진공제 전체 흐름을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/spouse-inheritance-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자상속공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">최소 5억~최대 30억, 별도로 더해지는 공제.</p>
                  </Link>
                  <Link
                    href="/guide/financial-asset-inheritance-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융재산 상속공제</div>
                    <p className="mt-1 text-sm text-text-secondary">예금·주식이 있으면 최대 2억 추가 공제.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-deduction-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 총한도와 사전증여 합산의 영향.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-10-year-prior-gift-aggregation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">10년 사전증여 합산</div>
                    <p className="mt-1 text-sm text-text-secondary">상속 전 증여가 과세표준에 미치는 영향.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">상속세·증여세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 상속세 인적공제 적용 여부·금액·최종 세액은 가족 구성, 사전증여, 상속 형태에 따라 달라지므로 국세청 또는 세무 전문가에게 반드시 확인하세요. 자녀공제 등 공제액은 세법 개정 동향에 따라 달라질 수 있으니 최신 규정을 확인하시기 바랍니다. 본 콘텐츠는 2026-08-19 기준입니다. 인용 법조항: <strong>상속세 및 증여세법 §18(기초공제), §19(배우자상속공제), §20(그 밖의 인적공제), §21(일괄공제), §13(사전증여 합산), 국세기본법 §14</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(상증법 §20)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(상속세 인적공제)</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 상속세 자동계산</a>.
                </p>
              </section>

              <ShareButtons
                title="상속세 인적공제 2026 가이드"
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
