// [revenue-lever: indexing+traffic] 연말정산 추가공제 4종(경로우대·장애인·부녀자·한부모) (직장인 연말정산 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/year-end-additional-deduction-elderly-disabled-single-parent-2026/';
const DATE_PUBLISHED = '2026-08-25';
const DATE_MODIFIED = '2026-08-25';

export const metadata: Metadata = {
  title: '연말정산 추가공제 2026, 경로우대·장애인·부녀자·한부모',
  description:
    '기본공제 대상에 더해지는 추가공제 4종을 정리합니다. 경로우대 100만원, 장애인 200만원, 부녀자 50만원, 한부모 100만원의 공제액과 중복 적용 규칙, 필요 서류까지 소득세법 §51 기준으로 설명합니다.',
  keywords: [
    '연말정산 추가공제',
    '경로우대 공제',
    '장애인 공제',
    '부녀자 공제',
    '한부모 공제',
    '인적공제',
    '소득세법 51조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연말정산 추가공제 2026, 경로우대·장애인·부녀자·한부모' }],
    title: '연말정산 추가공제 2026, 경로우대·장애인·부녀자·한부모 공제 총정리',
    description: '기본공제에 더해지는 추가공제 4종. 공제액, 소득·나이 요건, 부녀자와 한부모 중복 규칙까지 소득세법 §51 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연말정산 추가공제 2026, 경로우대·장애인·부녀자·한부모',
    description: '경로우대 100만·장애인 200만·부녀자 50만·한부모 100만원. 소득세법 §51 추가공제 완전 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '추가공제는 기본공제와 별도로 또 받는 건가요?',
    answer:
      '네, 별도로 더 받습니다. 추가공제는 기본공제(1명당 150만원)를 받는 대상자가 특정 요건(70세 이상, 장애인 등)을 함께 충족할 때 그 위에 얹어 주는 공제입니다(소득세법 §51). 예를 들어 72세 부모님을 부양하면 기본공제 150만원에 경로우대 100만원을 더해 총 250만원을 소득에서 뺍니다.',
  },
  {
    question: '경로우대 공제는 몇 세부터 받나요?',
    answer:
      '과세기간 종료일(12월 31일) 기준 만 70세 이상이면 1명당 연 100만원을 추가공제합니다(소득세법 §51). 부모님, 조부모님 등 기본공제 대상 직계존속이면 함께 살지 않아도, 생계를 같이 하고 소득요건(연간 소득금액 100만원 이하 등)을 충족하면 공제가 가능합니다.',
  },
  {
    question: '장애인 공제는 소득이나 나이 제한이 있나요?',
    answer:
      '장애인은 나이 제한 없이 기본공제 대상이 될 수 있고, 그 위에 장애인 추가공제 연 200만원을 받습니다(소득세법 §51). 다만 소득요건(연간 소득금액 100만원 이하, 근로소득만 있으면 총급여 500만원 이하)은 충족해야 합니다. 세법상 장애인에는 장애인복지법 등록 장애인 외에 항시 치료가 필요한 중증환자도 포함됩니다.',
  },
  {
    question: '부녀자 공제는 맞벌이 여성도 받을 수 있나요?',
    answer:
      '받을 수 있지만 소득 상한이 있습니다. 부녀자 공제(연 50만원)는 종합소득금액 3천만원 이하(근로소득만 있으면 총급여 약 4,147만원 이하)인 여성 근로자가 대상입니다(소득세법 §51). 배우자가 있는 여성이거나, 배우자가 없어도 기본공제 대상 부양가족이 있는 세대주면 됩니다.',
  },
  {
    question: '부녀자 공제와 한부모 공제를 둘 다 받을 수 있나요?',
    answer:
      '동시에 받을 수는 없고 한부모 공제가 우선 적용됩니다(소득세법 §51). 두 요건에 모두 해당하면 금액이 큰 한부모 공제(연 100만원)만 적용되고 부녀자 공제(50만원)는 배제됩니다. 한부모 공제가 더 유리하므로 결과적으로 손해는 없습니다.',
  },
  {
    question: '한부모 공제는 소득 제한이 없나요?',
    answer:
      '한부모 공제(연 100만원)는 부녀자 공제와 달리 본인 소득 상한이 없습니다(소득세법 §51). 배우자가 없는 사람으로서 기본공제 대상인 직계비속 또는 입양자가 있으면 성별과 관계없이 적용됩니다. 아버지가 자녀를 부양하는 경우에도 받을 수 있습니다.',
  },
  {
    question: '따로 사는 부모님도 경로우대 공제가 되나요?',
    answer:
      '가능합니다. 직계존속은 주거 형편상 따로 살아도 실제로 생계를 같이 하는 것으로 보아 기본공제와 경로우대 공제를 받을 수 있습니다. 다만 부모님의 연간 소득금액이 100만원(근로소득만 있으면 총급여 500만원)을 넘거나, 형제자매가 이미 공제받고 있으면 중복 공제는 불가능합니다.',
  },
  {
    question: '추가공제 대상인데 회사에 자료를 못 냈어요. 나중에 받을 수 있나요?',
    answer:
      '네, 놓친 공제는 경정청구로 5년 안에 돌려받을 수 있습니다. 연말정산 때 반영하지 못했다면 다음 해 5월 종합소득세 확정신고나 경정청구로 추가공제를 신청하면 됩니다. 장애인증명서, 가족관계증명서 등 증빙을 갖춰 홈택스에서 신청하세요.',
  },
];

export default function YearEndAdditionalDeductionPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연말정산 추가공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연말정산 추가공제 2026, 경로우대·장애인·부녀자·한부모 공제 총정리',
    description:
      '기본공제 대상에 더해지는 추가공제 4종. 경로우대 100만원, 장애인 200만원, 부녀자 50만원, 한부모 100만원의 공제액과 소득·나이 요건, 중복 적용 규칙을 소득세법 §51 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연말정산', '추가공제', '경로우대', '장애인공제', '부녀자공제', '한부모공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연말정산 추가공제 2026',
    description:
      '경로우대·장애인·부녀자·한부모 추가공제의 공제액, 요건, 중복 규칙을 소득세법 §51 기준으로 정리한 가이드.',
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
                    { name: '연말정산 추가공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 연말정산 · 8분 읽기 · 2026-08-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연말정산 추가공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 경로우대·장애인·부녀자·한부모</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연말정산에서 부양가족을 등록하면 기본공제 150만원만 받고 끝내는 분이 많습니다. 그런데 그 부양가족이 70세를 넘겼거나 장애가 있다면, 또는 내가 홀로 아이를 키우는 세대주라면 기본공제 위에 얹어 주는 추가공제가 따로 있습니다. 이 가이드는 근로소득자를 위해 경로우대·장애인·부녀자·한부모 4종 추가공제의 금액, 요건, 그리고 헷갈리는 중복 규칙을 소득세법 §51 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추가공제란 무엇이고 기본공제와 어떻게 다른가요?</h2>
                <p>
                  추가공제는 기본공제를 받는 사람에게 특정 요건을 더 충족할 때 얹어 주는 소득공제입니다(소득세법 §51). 기본공제가 부양가족 1명당 150만원을 무조건 빼 주는 것이라면, 추가공제는 그 대상자가 고령이거나 장애가 있는 등 추가 부양 부담이 있을 때 세금을 더 덜어 주는 장치입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정의: 추가공제 4종과 금액 (소득세법 §51)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    경로우대 100만원, 장애인 200만원, 부녀자 50만원, 한부모 100만원. 모두 기본공제 대상자일 때 소득에서 추가로 빼는 금액입니다.
                  </p>
                </div>
                <p>
                  중요한 전제는 <strong>기본공제 대상이어야 추가공제도 가능</strong>하다는 점입니다. 즉 부양가족의 소득요건(연간 소득금액 100만원 이하, 근로소득만 있으면 총급여 500만원 이하)을 먼저 통과해야 하고, 그 위에 나이나 장애 요건을 보고 추가공제를 판단합니다. 단, 장애인은 기본공제의 나이요건이 면제됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 추가공제 4종 요약 (소득세법 §51, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제액(연)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">핵심 요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">경로우대</td>
                        <td className="p-3"><strong>100만원</strong></td>
                        <td className="p-3">기본공제 대상 중 만 70세 이상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">장애인</td>
                        <td className="p-3"><strong>200만원</strong></td>
                        <td className="p-3">세법상 장애인(나이 제한 없음)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부녀자</td>
                        <td className="p-3"><strong>50만원</strong></td>
                        <td className="p-3">종합소득금액 3천만원 이하 여성 세대주 등</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">한부모</td>
                        <td className="p-3"><strong>100만원</strong></td>
                        <td className="p-3">배우자 없이 기본공제 대상 자녀 부양</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만, 위 금액은 소득에서 빼는 <strong>소득공제액</strong>이지 돌려받는 세금이 아닙니다. 실제 절세액은 본인의 세율 구간에 따라 달라지므로 아래 계산 사례에서 다시 살펴봅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">경로우대 공제는 누가 얼마 받나요?</h2>
                <p>
                  과세기간 종료일(12월 31일) 기준 만 70세 이상인 기본공제 대상자 1명당 연 100만원을 공제합니다(소득세법 §51). 부모님, 조부모님 같은 직계존속이 흔한 대상이고, 배우자나 형제자매도 요건을 갖추면 가능합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>나이:</strong> 해당 연도 말 기준 만 70세 이상. 구체적 출생연도 기준은 국세청 연말정산 안내를 확인하세요.</li>
                  <li><strong>소득요건:</strong> 부양가족의 연간 소득금액 100만원 이하(근로소득만 있으면 총급여 500만원 이하).</li>
                  <li><strong>따로 사는 부모님:</strong> 직계존속은 주거 형편상 별거해도 실제 생계를 같이 하면 공제 가능.</li>
                </ul>
                <p>
                  예외: 부모님을 형제자매 중 한 명이 이미 공제받고 있다면 중복으로 받을 수 없습니다. 형제간에 누가 공제받을지 미리 정해 한 명에게 몰아주는 것이 절세에 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">장애인 공제 200만원, 대상과 서류는 무엇인가요?</h2>
                <p>
                  장애인 추가공제는 4종 중 금액이 가장 큰 연 200만원입니다(소득세법 §51). 세법상 장애인은 장애인복지법 등록 장애인보다 범위가 넓습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>장애인복지법에 따라 등록된 장애인</li>
                  <li>국가유공자 등 예우 및 지원에 관한 법률에 따른 상이자</li>
                  <li>항시 치료가 필요한 중증환자(암, 중풍, 난치성 질환 등으로 취업이나 학업이 곤란한 사람)</li>
                </ul>
                <p>
                  장애인은 <strong>나이 제한이 면제</strong>되어 20세를 넘긴 자녀나 60세 미만 부모라도 소득요건만 맞으면 기본공제와 장애인 추가공제를 함께 받을 수 있습니다. 증빙은 장애인증명서 또는 장애인등록증(복지카드) 사본이며, 중증환자는 병원에서 세법상 서식의 장애인증명서를 발급받아야 합니다.
                </p>
                <p>
                  다만, 항시 치료가 필요한 중증환자 증명서는 발급 기준이 병원마다 다르게 적용될 수 있으므로, 애매하면 국세청 상담(126) 또는 관할 세무서에 미리 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부녀자 공제 50만원, 맞벌이도 되나요?</h2>
                <p>
                  받을 수 있지만 소득 상한이 핵심입니다. 부녀자 공제(연 50만원)는 <strong>종합소득금액 3천만원 이하</strong>인 여성 근로자에게 적용됩니다(소득세법 §51). 근로소득만 있다면 총급여 약 4,147만원 이하가 기준선입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">부녀자 공제 대상(소득세법 §51)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    종합소득금액 3천만원 이하이면서 다음 중 하나에 해당하는 여성.
                    <br />
                    1) 배우자가 있는 여성 근로자
                    <br />
                    2) 배우자가 없어도 기본공제 대상 부양가족이 있는 세대주인 여성 근로자
                  </p>
                </div>
                <p>
                  다만, 소득금액 3천만원 기준을 단 1원이라도 넘으면 공제 자체가 사라집니다. 연봉이 경계선에 가까운 맞벌이 여성이라면 비과세 소득을 제외한 실제 소득금액을 정확히 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한부모 공제 100만원, 부녀자와 중복되나요?</h2>
                <p>
                  중복되지 않고 한부모 공제가 우선합니다. 한부모 공제(연 100만원)는 배우자가 없는 사람으로서 기본공제 대상인 직계비속 또는 입양자가 있으면 성별과 소득에 관계없이 적용됩니다(소득세법 §51).
                </p>
                <p>
                  만약 어떤 여성이 부녀자 요건(50만원)과 한부모 요건(100만원)에 모두 해당한다면, 두 공제를 합산하지 않고 <strong>금액이 큰 한부모 공제 100만원만</strong> 적용합니다. 이는 이중 혜택을 막기 위한 규정이지만, 더 유리한 쪽을 자동으로 주므로 납세자에게 손해는 없습니다.
                </p>
                <p>
                  다만, 한부모 공제는 자녀가 기본공제 대상이어야 하므로 자녀의 나이(만 20세 이하)와 소득요건을 먼저 확인해야 합니다. 자녀가 성년이 되어 기본공제에서 빠지면 한부모 공제도 함께 사라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추가공제로 세금이 실제 얼마나 줄어드나요?</h2>
                <p>
                  추가공제는 소득공제이므로 절세액은 본인의 한계세율에 따라 달라집니다. 아래 사례로 살펴봅니다(지방소득세 10% 별도 포함).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 72세 부모님 부양 (세율 15% 구간 직장인)</p>
                  <p className="text-sm text-text-secondary">
                    · 기본공제 150만원 + 경로우대 100만원 = 소득공제 250만원
                    <br />
                    · 절세액(소득세): 250만원 × 15% = 37.5만원
                    <br />
                    · 지방소득세 10% 포함: 37.5만원 × 1.1 = <strong>약 41.25만원 절감</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 장애가 있는 자녀 부양 (세율 24% 구간)</p>
                  <p className="text-sm text-text-secondary">
                    · 기본공제 150만원 + 장애인 200만원 = 소득공제 350만원
                    <br />
                    · 절세액(소득세): 350만원 × 24% = 84만원
                    <br />
                    · 지방소득세 10% 포함: 84만원 × 1.1 = <strong>약 92.4만원 절감</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 홀로 자녀를 키우는 세대주 (세율 15% 구간)</p>
                  <p className="text-sm text-text-secondary">
                    · 부녀자(50만원)와 한부모(100만원) 요건 모두 해당 → 한부모 100만원만 적용
                    <br />
                    · 절세액(소득세): 100만원 × 15% = 15만원
                    <br />
                    · 지방소득세 10% 포함: 15만원 × 1.1 = <strong>약 16.5만원 절감</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">부녀자 50만원을 따로 더하지 않는 점에 주의.</span>
                  </p>
                </div>
                <p className="mt-4">
                  위 절세액은 이해를 돕기 위한 예시이며, 실제 결과는 다른 공제 항목과 세율 구간에 따라 달라집니다. 정확한 금액은 홈택스 연말정산 미리보기로 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">놓친 추가공제, 다시 받는 절차</h2>
                <p>
                  연말정산 때 증빙을 못 내 추가공제를 빠뜨렸어도 방법이 있습니다. 다음 절차로 5년 안에 되찾을 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>장애인증명서, 가족관계증명서 등 요건을 입증할 서류를 준비합니다.</li>
                  <li>다음 해 5월 종합소득세 확정신고 때 추가공제를 반영하거나, 이미 지난 연도분은 홈택스에서 경정청구를 합니다.</li>
                  <li>경정청구는 법정신고기한이 지난 후 5년 이내에 가능하므로 과거 5개 연도까지 소급해 받을 수 있습니다.</li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/salary/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 반영 전후 세후 급여를 시뮬레이션해 보세요.</p>
                  </Link>
                  <Link href="/guide/personal-deduction-dependent-150-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">인적공제 기본공제 150만원</div>
                    <p className="mt-1 text-sm text-text-secondary">추가공제의 전제인 기본공제 요건을 먼저 확인하세요.</p>
                  </Link>
                  <Link href="/guide/dependent-income-requirement-300-2026-reform/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">부양가족 소득요건 100만·500만</div>
                    <p className="mt-1 text-sm text-text-secondary">소득요건을 넘기면 추가공제까지 함께 사라집니다.</p>
                  </Link>
                  <Link href="/guide/child-tax-credit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">자녀 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀 관련 세액공제와 함께 챙기면 절세가 커집니다.</p>
                  </Link>
                  <Link href="/guide/income-tax-correction-claim-5-year-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">경정청구 5년 소급</div>
                    <p className="mt-1 text-sm text-text-secondary">놓친 공제를 되찾는 경정청구 절차를 확인하세요.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산·소득세·양도세 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 추가공제 대상 여부, 소득·나이 요건, 증빙 서류는 개인 상황에 따라 달라지므로 홈택스 연말정산 서비스와 국세청 안내를 반드시 확인하세요. 본 콘텐츠는 2026-08-25 기준이며 소득세법 개정 시 업데이트됩니다. 추가공제의 근거는 <strong>소득세법 §51(추가공제)</strong>이고, 기본공제 소득·나이 요건은 소득세법 §50을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 연말정산</a>.
                </p>
              </section>

              <ShareButtons
                title="연말정산 추가공제 2026 가이드"
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
