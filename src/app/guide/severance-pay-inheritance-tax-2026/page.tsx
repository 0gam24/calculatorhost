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

const URL = 'https://calculatorhost.com/guide/severance-pay-inheritance-tax-2026/';
const DATE_PUBLISHED = '2026-09-18';
const DATE_MODIFIED = '2026-09-18';

export const metadata: Metadata = {
  title: '사망 퇴직금 상속재산 포함 여부 2026, 상속세 과세 기준',
  description:
    '재직 중 사망하면 퇴직금은 원칙적으로 간주상속재산에 해당해 상속세 과세 대상입니다. 다만 단체협약·취업규칙에서 근로기준법상 유족에게 지급하도록 정한 경우 유족 고유재산으로 상속세가 붙지 않는 예외를 상증법 §10과 2023년 대법원 판례 기준으로 정리했습니다.',
  keywords: [
    '사망퇴직금 상속세',
    '사망퇴직금 상속재산',
    '간주상속재산',
    '상속세 및 증여세법 10조',
    '사망퇴직금 유족 고유재산',
    '퇴직금 상속세 공제',
    '유족연금 상속재산 제외',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '사망 퇴직금 상속재산 포함 여부 2026, 상속세 과세 기준' }],
    title: '사망 퇴직금, 상속재산에 포함될까? 유족 고유재산 예외까지',
    description: '재직 중 사망 시 퇴직금은 원칙적으로 간주상속재산. 단체협약상 유족 지급 예외와 상속공제 적용까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '사망 퇴직금 상속재산 포함 여부 2026',
    description: '간주상속재산 원칙과 유족 고유재산 예외, 상속공제 적용까지 상증법 §10 기준 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '재직 중 사망하면 퇴직금은 상속재산인가요?',
    answer:
      '원칙적으로 그렇습니다. 상속세 및 증여세법 §10에 따라 피상속인의 사망으로 인해 지급되는 퇴직금·퇴직수당·공로금은 간주상속재산으로 보아 상속세 과세 대상에 포함됩니다. 본래부터 있던 재산은 아니지만 사망을 계기로 유족에게 경제적 이익이 생긴다는 점에서 상속재산과 똑같이 취급합니다.',
  },
  {
    question: '퇴직 후 아직 못 받은 퇴직금을 두고 사망하면 어떻게 되나요?',
    answer:
      '이 경우는 애초에 피상속인 본인이 생전에 받을 권리가 확정된 돈이므로 간주상속재산이 아니라 본래의 상속재산으로 봅니다. 미지급 퇴직금 채권 자체가 상속재산목록에 들어가며, 상속인이 그 채권을 상속받아 상속세 과세가액에 합산합니다.',
  },
  {
    question: '유족연금도 상속재산에 포함되나요?',
    answer:
      '포함되지 않습니다. 상증법 §10 단서는 국민연금법에 따라 지급되는 유족연금·사망으로 인한 반환일시금, 공무원연금법·공무원 재해보상법·사립학교교직원 연금법에 따라 지급되는 퇴직유족연금·장해유족연금·순직유족연금 등을 상속재산으로 보지 않는다고 명시합니다. 사회보장적 성격의 급여이기 때문입니다.',
  },
  {
    question: '단체협약에 유족에게 지급한다고 정해두면 상속세를 안 내도 되나요?',
    answer:
      '가능합니다. 2023년 11월 대법원 판결(2018다283049)은 단체협약이나 취업규칙에서 사망퇴직금을 근로기준법 §82②·시행령 §48이 정한 유족(민법상 상속인과 범위·순위가 다를 수 있음)에게 지급하도록 정한 경우, 유족이 상속인 자격이 아니라 규정에 따라 직접 그 돈을 취득하는 것이므로 상속재산이 아닌 유족의 고유재산이라고 판단했습니다. 다만 회사 규정에 지급 대상이 단순히 상속인으로 되어 있다면 원칙(상증법 §10)대로 상속재산에 해당합니다.',
  },
  {
    question: '유족 고유재산으로 인정되면 세금을 전혀 안 내나요?',
    answer:
      '상속세·증여세는 부과되지 않지만 퇴직소득세는 그대로 부과됩니다. 대법원은 사망퇴직금이 유족의 고유재산이라 해도 근로자퇴직급여 보장법상 퇴직금으로서의 성질을 잃지 않는다고 보았으므로, 회사가 지급 시 퇴직소득세를 원천징수해야 합니다. 즉 세목이 상속세에서 소득세로 바뀌는 것이지 비과세가 되는 것은 아닙니다.',
  },
  {
    question: '사망퇴직금도 상속공제를 받을 수 있나요?',
    answer:
      '상속재산으로 인정되는 일반적인 사망퇴직금이라면 다른 상속재산과 합산되어 기초공제(§18, 2억 원)와 그 밖의 인적공제 합계액, 또는 일괄공제(§21, 5억 원) 중 큰 금액을 공제받고, 배우자가 있으면 배우자상속공제(§19, 최소 5억~최대 30억 원)도 추가로 받을 수 있습니다. 공제는 사망퇴직금만 따로 적용되는 것이 아니라 상속재산 전체를 합산한 과세가액에서 차감됩니다.',
  },
  {
    question: '회사가 퇴직금 규정에 지급 대상을 어떻게 적어야 하는지 미리 알 수 있나요?',
    answer:
      '취업규칙이나 단체협약의 사망퇴직금 조항을 확인하면 됩니다. "근로기준법에 따른 유족에게 지급한다"처럼 근로기준법상 유족 범위를 명시했다면 유족 고유재산 판단의 근거가 될 수 있고, "상속인에게 지급한다"거나 별도 규정이 없다면 원칙대로 상속재산으로 처리될 가능성이 높습니다. 실제 과세 여부는 사안별로 다르므로 세무 전문가 확인이 필요합니다.',
  },
];

export default function SeverancePayInheritanceTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '사망 퇴직금 상속재산 포함 여부 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '사망 퇴직금 상속재산 포함 여부 2026, 상속세 과세 기준',
    description:
      '재직 중 사망 시 퇴직금은 상증법 §10에 따라 간주상속재산으로 상속세 과세 대상이지만, 단체협약상 근로기준법상 유족 지급 예외(2023년 대법원 판례)와 국민연금법 유족연금 등 법정 제외 항목, 상속공제 적용을 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['사망퇴직금', '간주상속재산', '상속세', '상속세및증여세법 10조', '유족 고유재산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '사망 퇴직금 상속재산 포함 여부 2026',
    description:
      '사망퇴직금이 간주상속재산으로 상속세 과세되는 원칙, 유족연금 제외, 단체협약상 유족 고유재산 예외, 상속공제 적용을 정리한 가이드.',
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
                    { name: '사망 퇴직금 상속재산 포함 여부 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인 · 8분 읽기 · 2026-09-18</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  사망 퇴직금, 상속재산에
                  <br />
                  <span className="text-2xl text-text-secondary">· 포함될까? 상속세 과세 기준</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  재직 중이던 가족이 갑자기 세상을 떠나면 회사에서 퇴직금이 지급되는데, 이 돈이 상속재산에 합산되어 상속세를 무는지 헷갈리는 경우가 많습니다. 이 가이드는 사망퇴직금이 간주상속재산으로 과세되는 원칙과 유족연금처럼 제외되는 항목, 그리고 단체협약에 따라 유족 고유재산으로 인정되는 예외까지 실제 사례와 함께 정리합니다. 대상 독자는 가족의 사망으로 퇴직금을 수령하게 된 유족입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사망퇴직금이란 무엇인가요?</h2>
                <p>
                  사망퇴직금은 근로자가 재직 중 사망하여 근로관계가 종료되면서 회사가 지급하는 퇴직금·퇴직수당·공로금을 말합니다. 본인이 살아서 퇴직 신청을 한 것이 아니라 사망이라는 사건 자체가 퇴직의 원인이 되므로, 세법에서는 일반적인 상속재산(부동산·예금 등)과 구분해 별도로 다룹니다.
                </p>
                <p>
                  세법은 이런 돈을 &quot;본래의 상속재산&quot;은 아니지만 사망을 계기로 유족에게 경제적 이익이 발생한다는 점에 주목해 &quot;간주상속재산&quot;이라는 개념으로 상속재산과 똑같이 취급합니다(상속세 및 증여세법 §10). 사망을 원인으로 지급되는 보험금이 간주상속재산으로 과세되는 것과 같은 논리입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    원칙: 재직 중 사망 시 퇴직금은 간주상속재산 → 상속세 과세(상증법 §10).
                    <br />
                    제외: 국민연금법 유족연금 등 법정 유족급여는 상속재산 아님.
                    <br />
                    예외: 단체협약상 근로기준법 유족에게 지급하면 유족 고유재산 → 상속세 대신 퇴직소득세.
                    <br />
                    공제: 일반 상속재산과 합산해 일괄공제·배우자공제 적용 가능.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사망퇴직금은 상속재산에 포함되나요?</h2>
                <p>
                  원칙적으로 포함됩니다. 상속세 및 증여세법 §10은 피상속인에게 지급될 퇴직금, 퇴직수당, 공로금, 연금 또는 이와 유사한 것이 피상속인의 사망으로 인하여 지급되는 경우 그 금액을 상속재산으로 본다고 규정합니다. 재직 중 사망으로 발생하는 일반적인 회사 퇴직금이 여기에 해당합니다.
                </p>
                <p>
                  반면 살아서 이미 퇴직했지만 아직 지급받지 못한 퇴직금을 두고 사망한 경우는 성격이 다릅니다. 이 채권은 사망 시점에 이미 피상속인 본인의 재산이었으므로 간주상속재산이 아니라 &quot;본래의 상속재산&quot;으로 분류되지만, 결국 상속재산가액에 합산된다는 결론은 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 퇴직금 발생 시점별 상속재산 분류 (상증법 §10)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상황</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속세 과세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">재직 중 사망, 사망이 퇴직 원인</td>
                        <td className="p-3">간주상속재산</td>
                        <td className="p-3">과세 대상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">생전 퇴직 후 미지급 상태로 사망</td>
                        <td className="p-3">본래의 상속재산</td>
                        <td className="p-3">과세 대상</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">국민연금법 유족연금·반환일시금</td>
                        <td className="p-3">상속재산 아님(§10 단서)</td>
                        <td className="p-3">과세 제외</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">단체협약상 근로기준법 유족 지급</td>
                        <td className="p-3">유족의 고유재산</td>
                        <td className="p-3">과세 제외(퇴직소득세는 부과)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 실제로 어느 항목에 해당하는지는 회사의 퇴직금 규정과 지급 경위를 확인해야 정확히 판단할 수 있습니다. 아래에서 법정 제외 항목과 판례상 예외를 차례로 살펴봅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속재산에서 제외되는 사망퇴직금은 무엇인가요?</h2>
                <p>
                  법령에 따라 지급되는 사회보장적 성격의 유족급여는 상속재산으로 보지 않습니다. 상증법 §10 단서는 국민연금법에 따라 지급되는 유족연금 또는 사망으로 인하여 지급되는 반환일시금, 공무원연금법·공무원 재해보상법·사립학교교직원 연금법에 따라 지급되는 퇴직유족연금·장해유족연금·순직유족연금 등을 상속재산에서 제외한다고 명시합니다.
                </p>
                <p>
                  이런 급여는 유족의 생계 보장을 목적으로 법령이 직접 수급권자를 정하는 사회보험 급여이기 때문에, 상속인 지위와 무관하게 유족 본인의 고유한 권리로 봅니다. 반면 일반 기업의 사내 퇴직금·퇴직연금은 이런 법정 제외 항목에 해당하지 않으므로 원칙(§10)대로 상속재산에 포함됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">단체협약에 따른 유족 지급은 왜 예외가 되나요?</h2>
                <p>
                  회사 규정이 지급 대상을 &quot;근로기준법상 유족&quot;으로 명시했다면 상속재산이 아닐 수 있습니다. 대법원은 2023년 11월 16일 선고한 2018다283049 판결에서, 단체협약이나 취업규칙이 사망퇴직금을 근로기준법 §82②·시행령 §48이 정한 유족보상의 범위와 순위에 따라 유족에게 지급하도록 정한 경우, 유족은 민법상 상속인 자격이 아니라 그 규정에 따라 직접 사망퇴직금을 취득하는 것이므로 이는 상속재산이 아닌 유족의 고유재산이라고 판단했습니다.
                </p>
                <p>
                  근로기준법령상 유족의 범위·순위는 민법의 법정상속 순위와 다릅니다. 근로자가 부양하던 배우자·자녀·부모·손·조부모가 1순위, 부양하지 않던 같은 관계가 2순위, 부양하던 형제자매가 3순위, 부양하지 않던 형제자매가 4순위 순으로 정해집니다(근로기준법 시행령 §48). 이 순서에 따라 지급받는 사람이 민법상 상속인과 다를 수 있다는 점이 &quot;상속재산이 아니라 고유재산&quot;이라는 결론의 핵심 근거입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 재직 중 사망, 회사 규정에 따른 지급 대상 차이</p>
                  <p className="text-sm text-text-secondary">
                    · A사: 취업규칙에 &quot;퇴직금은 상속인에게 지급한다&quot;로 규정 → 상증법 §10 원칙대로 간주상속재산, 상속세 과세 대상
                    <br />
                    · B사: 단체협약에 &quot;근로기준법상 유족에게 지급한다&quot;로 규정 → 대법원 판례에 따라 유족의 고유재산, 상속세·증여세 과세 제외
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 사망퇴직금이라도 회사 규정 문구에 따라 세목이 상속세와 소득세로 갈릴 수 있습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 유족 고유재산으로 인정된다고 세금이 전혀 없는 것은 아닙니다. 대법원은 이 경우에도 사망퇴직금이 근로자퇴직급여 보장법상 퇴직금으로서의 성질을 잃지 않는다고 보았으므로, 회사는 지급 시 퇴직소득세를 원천징수해야 합니다. 상속세가 소득세로 대체되는 것이지 비과세가 되는 것은 아닙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속재산에 포함되면 공제는 어떻게 받나요?</h2>
                <p>
                  간주상속재산으로 인정되는 사망퇴직금은 별도로 계산하지 않고 다른 상속재산과 합산한 뒤 공통 공제를 적용합니다. 기초공제(상증법 §18)로 2억 원을 공제하거나, 기초공제와 배우자 외 인적공제를 합한 금액과 5억 원 중 큰 금액을 일괄공제(§21)로 공제받을 수 있습니다. 배우자가 있으면 배우자상속공제(§19)로 최소 5억 원에서 최대 30억 원까지 별도로 추가 공제됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 상속재산 8억 원(사망퇴직금 2억 원 포함) 예시 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속인 구성</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적용 공제</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자 + 자녀 1명</td>
                        <td className="p-3">일괄공제 5억 + 배우자공제 최소 5억 = 10억</td>
                        <td className="p-3">0원(비과세)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">자녀만 상속(배우자 없음)</td>
                        <td className="p-3">일괄공제 5억만 적용</td>
                        <td className="p-3">3억 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  자녀만 상속하는 경우 과세표준 3억 원에 상속세 누진세율을 적용하면, 1억 초과 5억 이하 구간 세율 20%에서 누진공제 1천만 원을 차감해 3억 × 20% − 1천만 원 = 5천만 원의 산출세액이 계산됩니다(상증법 §26 세율 구조 기준). 다만, 실제 세액은 신고세액공제·기타 공제 항목에 따라 달라질 수 있으므로 구체적인 사안은 세무 전문가와 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/insurance-payout-inheritance-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">보험금 상속세 증여세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보험금도 사망을 계기로 지급되는 간주상속재산입니다.</p>
                  </Link>
                  <Link
                    href="/guide/spouse-inheritance-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 상속공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">최소 5억에서 최대 30억까지 공제받는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-other-personal-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 인적공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀·미성년·장애인·연로자 공제 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·공제·납부세액 전체 흐름 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">사망퇴직금을 포함한 상속재산으로 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적의 일반 정보이며 개인 맞춤형 세무·법률 조언이 아닙니다. 사망퇴직금의 상속재산 해당 여부는 회사 퇴직금 규정·지급 경위·개별 사안에 따라 달라지므로 반드시 세무서·국세상담센터 또는 세무 전문가와 확인하세요. 본 콘텐츠는 2026-09-18을 기준으로 작성되었으며, 관련 법령·판례 변경 시 업데이트됩니다. 인용 법조항: 상속세 및 증여세법 §10(상속재산으로 보는 퇴직금 등), §18(기초공제), §19(배우자상속공제), §21(일괄공제), 근로기준법 §82(유족보상), 근로기준법 시행령 §48(유족의 범위·순위).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.scourt.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한민국 법원</a>.
                </p>
              </section>

              <ShareButtons
                title="사망 퇴직금 상속재산 포함 여부 2026 가이드"
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
