// [revenue-lever: traffic+indexing] 2026 세제개편안 상속세 유산취득세 전환 급상승 검색 흡수, 롱테일 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/inheritance-acquisition-tax-conversion-2026-reform/';
const DATE_PUBLISHED = '2026-08-22';
const DATE_MODIFIED = '2026-08-22';

export const metadata: Metadata = {
  title: '유산취득세 전환 2026 개편안, 자녀공제 5억 언제부터',
  description:
    '2026 세제개편안이 상속세를 유산세에서 유산취득세로 바꾸는 방향을 담았습니다. 유산세와 유산취득세 차이, 자녀공제 5천만원에서 5억원 상향, 지금 상속하면 적용되는지, 시행 목표 2028년까지 정리합니다(상속세 및 증여세법 §13·§20 개정안).',
  keywords: [
    '유산취득세',
    '유산취득세 뜻',
    '상속세 유산취득세 전환',
    '자녀공제 5억',
    '자녀공제 언제부터',
    '2026 세제개편안 상속세',
    '유산세 유산취득세 차이',
    '상속세 및 증여세법 20조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '유산취득세 전환 2026 개편안, 자녀공제 5억 상향 방향' }],
    title: '유산취득세 전환 2026 개편안, 자녀공제 5억 언제부터',
    description: '상속세를 각자 받은 재산 기준으로 바꾸는 유산취득세. 자녀공제 5천만원에서 5억원 상향안과 2028년 시행 목표를 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '유산취득세 전환 2026 개편안, 자녀공제 5억 방향',
    description: '유산세에서 유산취득세로. 각자 취득분 기준 과세와 자녀공제 5억 상향안, 시행 목표 2028년.',
  },
};

const FAQ_ITEMS = [
  {
    question: '유산취득세가 정확히 무슨 뜻인가요?',
    answer:
      '유산취득세는 상속인 각자가 실제로 물려받은 재산을 기준으로 세금을 매기는 방식입니다. 현재 우리나라는 돌아가신 분(피상속인)의 전체 상속재산에 먼저 세금을 매기는 유산세 방식입니다(상속세 및 증여세법 §13). 유산취득세로 바뀌면 상속인별 취득 재산에 각각 과세하므로, 여러 명이 나눠 받을수록 낮은 세율 구간이 적용되어 세부담이 줄어드는 구조가 됩니다.',
  },
  {
    question: '자녀공제 5억원은 언제부터 적용되나요?',
    answer:
      '아직 확정되지 않았습니다. 자녀공제를 1인당 5천만원에서 5억원으로 올리는 내용은 유산취득세 전환 개편안에 포함되어 있으며, 국회를 통과해야 시행됩니다. 정부 목표 시행 시점은 2028년으로 알려져 있으나, 2026년 8월 현재 발표된 안(案) 단계입니다. 지금 상속이 개시되는 경우에는 현행 자녀공제 1인당 5천만원(상속세 및 증여세법 §20)이 적용됩니다.',
  },
  {
    question: '지금 부모님이 돌아가시면 유산취득세로 계산하나요?',
    answer:
      '아니요, 현행 유산세 방식으로 계산합니다. 개편안은 국회 통과와 시행일 이후 개시되는 상속분에만 적용됩니다. 2026년 8월 현재 상속이 개시되면 기존 유산세 방식과 현행 공제(일괄공제 5억 또는 기초공제 2억+인적공제, 배우자공제 등)를 그대로 적용합니다.',
  },
  {
    question: '유산세와 유산취득세 중 어느 쪽이 세금이 적나요?',
    answer:
      '일반적으로 상속인이 여러 명일수록 유산취득세가 유리합니다. 유산세는 전체 재산을 하나의 과세표준으로 보아 높은 누진세율 구간이 적용되기 쉽지만, 유산취득세는 각자 받은 몫으로 나뉘어 낮은 구간이 적용되기 때문입니다. 다만 상속인이 1명이거나 특정인에게 집중 상속되는 경우에는 차이가 작을 수 있습니다.',
  },
  {
    question: '자녀공제가 5억으로 오르면 상속세가 0원이 되나요?',
    answer:
      '경우에 따라 그렇습니다. 자녀공제가 1인당 5억으로 오르면 자녀 수가 많을수록 공제 합계가 커져 과세표준이 크게 줄어듭니다. 예를 들어 자녀가 2명이면 공제만 10억 상당이 되어, 상속재산이 이 범위 안이면 세액이 0원이 될 수 있습니다. 다만 이는 개편안이 그대로 통과됐을 때의 가정이며, 배우자 유무와 재산 구성에 따라 결과가 달라집니다.',
  },
  {
    question: '유산취득세로 바뀌면 신고도 각자 따로 하나요?',
    answer:
      '개편안이 시행되면 상속인별 신고 체계로 바뀔 가능성이 큽니다. 유산취득세는 각자 취득한 재산이 과세 단위이므로 상속인마다 취득분과 공제를 적용해 신고하는 방식이 논의되고 있습니다. 다만 구체적 신고 절차는 법 개정과 시행령으로 정해지므로, 확정 전까지는 국세청 안내와 세무 전문가 상담으로 확인하는 것이 안전합니다.',
  },
  {
    question: '배우자공제는 유산취득세로 바뀌어도 그대로인가요?',
    answer:
      '배우자 상속공제(상속세 및 증여세법 §19)의 존치와 조정 여부는 개편안 논의 대상입니다. 현행은 배우자가 실제 상속받은 금액을 기준으로 최소 5억에서 최대 30억까지 공제합니다. 유산취득세 체계에서는 배우자 취득분에 대한 공제 방식이 재설계될 수 있으므로, 확정 내용은 최종 통과된 법률로 확인해야 합니다.',
  },
];

export default function InheritanceAcquisitionTaxConversion2026ReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '유산취득세 전환 2026 개편안' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '유산취득세 전환 2026 개편안, 자녀공제 5억 상향과 시행 목표 2028년',
    description:
      '상속세를 유산세에서 유산취득세로 전환하는 2026 세제개편안. 유산세와의 차이, 자녀공제 1인당 5천만원에서 5억원 상향, 적용 시점과 현행 공제 비교를 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['유산취득세', '상속세 개편안', '자녀공제 5억', '유산세', '2026 세제개편안'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '유산취득세 전환 2026 개편안',
    description:
      '유산세에서 유산취득세로 전환하는 상속세 개편안의 핵심과 자녀공제 5억 상향 방향 정리.',
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
                    { name: '유산취득세 전환 2026 개편안' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속 준비층 · 8분 읽기 · 2026-08-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  유산취득세 전환 2026 개편안
                  <br />
                  <span className="text-2xl text-text-secondary">· 자녀공제 5억, 언제부터 적용되나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 8월 3일 발표된 세제개편안은 상속세를 유산세에서 유산취득세로 바꾸는 방향을 담았습니다. 이 글은 상속을 준비하는 분을 위해, 두 방식이 어떻게 다른지, 자녀공제 5억원 상향안이 누구에게 언제 적용되는지, 그리고 지금 상속이 개시되면 어떤 기준이 쓰이는지를 현행 공제와 함께 정리합니다.
                </p>
              </header>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-5" data-speakable>
                <p className="font-semibold text-text-primary">30초 요약</p>
                <ul className="ml-5 list-disc space-y-1 text-sm text-text-secondary">
                  <li>유산취득세는 상속인 각자가 받은 재산을 기준으로 과세하는 방식입니다.</li>
                  <li>자녀공제를 1인당 5천만원에서 5억원으로 올리는 안이 함께 담겼습니다.</li>
                  <li>2026년 8월 현재 발표된 안(案)이며, 국회 통과 후 2028년 시행이 목표입니다.</li>
                  <li>지금 상속이 개시되면 현행 유산세 방식과 현행 공제가 적용됩니다.</li>
                </ul>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 유산세와 유산취득세 핵심 비교 (2026 개편안 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">현행 유산세</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">개편안 유산취득세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과세 단위</td>
                        <td className="p-3">피상속인 전체 재산</td>
                        <td className="p-3">상속인이 각자 받은 재산</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">세율 적용</td>
                        <td className="p-3">전체 합산 과표에 누진</td>
                        <td className="p-3">각자 취득분에 누진</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">자녀공제</td>
                        <td className="p-3">1인당 5,000만원</td>
                        <td className="p-3">1인당 5억원(상향안)</td>
                      </tr>
                      <tr>
                        <td className="p-3">시행</td>
                        <td className="p-3">현재 적용 중</td>
                        <td className="p-3">국회 통과 후 2028년 목표</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">유산취득세란 무엇인가</h2>
                <p>
                  유산취득세는 상속인 각자가 실제 취득한 재산에 세금을 매기는 방식입니다. 현재 우리나라는 유산세 방식을 씁니다. 즉 돌아가신 분의 전체 상속재산을 하나로 묶어 과세가액을 정하고(상속세 및 증여세법 §13), 여기에 누진세율(§26, 10%~50% 5단계)을 적용한 뒤 상속인들이 받은 비율대로 세금을 나눠 부담합니다.
                </p>
                <p>
                  유산취득세로 바뀌면 과세의 출발점이 달라집니다. 전체 재산이 아니라 상속인이 각자 물려받은 몫이 과세표준이 되므로, 여러 명이 나눠 받을수록 낮은 세율 구간이 적용되어 전체 세부담이 줄어드는 구조가 됩니다. OECD 다수 국가가 이 방식을 사용하며, 부의 분산 상속을 유도한다는 점이 도입 논거로 제시됩니다.
                </p>
                <p>
                  다만 유산취득세는 2026년 8월 현재 발표된 개편안 단계입니다. 실제 과세 단위 정의, 상속인별 신고 방식, 공제 재설계는 국회 심의와 시행령으로 확정되므로 세부 규정은 통과된 법률로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">자녀공제 5억, 언제부터 적용되나</h2>
                <p>
                  아직 적용되지 않습니다. 자녀공제를 1인당 5천만원에서 5억원으로 올리는 안은 유산취득세 전환 개편안에 함께 담겼고, 국회를 통과해야 시행됩니다. 정부의 목표 시행 시점은 2028년으로 알려져 있으나, 2026년 8월 현재는 발표된 안입니다.
                </p>
                <p>
                  현행 자녀공제는 상속세 및 증여세법 §20의 그 밖의 인적공제에 규정되어 있으며 1인당 5천만원입니다. 실무에서는 기초공제 2억(§18)과 인적공제 합계, 또는 일괄공제 5억(§21) 중 큰 금액을 적용합니다. 그래서 현재는 자녀공제를 개별로 크게 활용하기보다 일괄공제 5억을 택하는 경우가 많습니다.
                </p>
                <p>
                  예외: 개편안이 통과되어 자녀공제가 1인당 5억이 되면, 자녀 수가 많은 가구는 일괄공제보다 인적공제 합계가 더 커져 공제 방식 선택 자체가 달라질 수 있습니다. 즉 자녀 2명이면 자녀공제만 10억 상당이 되어 일괄공제 5억을 넘어섭니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">지금 상속하면 어떤 기준이 적용되나</h2>
                <p>
                  지금은 현행 유산세 방식과 현행 공제가 적용됩니다. 개편안은 국회 통과와 시행일 이후 개시되는 상속분에만 적용되기 때문입니다. 2026년 8월 현재 상속이 개시되면 다음 현행 공제를 그대로 씁니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 현행 상속공제 주요 항목 (상속세 및 증여세법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">공제</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">금액</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기초공제</td>
                        <td className="p-3">2억원</td>
                        <td className="p-3">§18</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">배우자 상속공제</td>
                        <td className="p-3">최소 5억 ~ 최대 30억</td>
                        <td className="p-3">§19</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">자녀공제(현행)</td>
                        <td className="p-3">1인당 5,000만원</td>
                        <td className="p-3">§20</td>
                      </tr>
                      <tr>
                        <td className="p-3">일괄공제</td>
                        <td className="p-3">5억원</td>
                        <td className="p-3">§21</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 배우자가 있으면 실무상 일괄공제 5억과 배우자공제 최소 5억을 합쳐 최소 10억까지 공제되는 경우가 많습니다. 개별 재산 구성과 상속인 구성에 따라 결과가 달라지므로, 큰 재산은 반드시 세무 전문가와 확인하세요.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">유산세와 유산취득세, 세금 차이는 얼마나</h2>
                <p>
                  상속인이 여러 명일수록 유산취득세가 유리한 방향입니다. 아래는 방식의 차이를 보여주기 위한 설명용 예시이며, 개편안이 확정되지 않았으므로 실제 세액과 다를 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">예시. 상속재산 20억, 자녀 2명이 10억씩 취득</p>
                  <p className="text-sm text-text-secondary">
                    현행 유산세: 20억 전체를 하나의 과세표준으로 보아 공제 후 남은 금액에 누진세율(§26)을 적용합니다. 20억 구간은 40% 세율대가 걸립니다.
                    <br />
                    개편안 유산취득세: 자녀 각자 10억씩을 과세 단위로 봅니다. 10억 구간은 30% 세율대이고, 자녀공제 5억(상향안)을 각자 적용하면 과세표준이 더 낮아집니다.
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 20억이라도 나눠 받는 구조에서 유산취득세가 낮은 세율 구간과 넓어진 공제로 세부담이 줄어드는 방향입니다.</span>
                  </p>
                </div>
                <p>
                  예외: 상속인이 1명이거나 한 사람에게 재산이 집중되면 나누는 효과가 없어 두 방식의 차이가 작아집니다. 또 세율 구간 경계(예: 취득분이 10억을 조금 넘는지)에 따라 결과가 달라지므로, 경계 근처 금액은 특히 정밀 계산이 필요합니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">상속을 앞둔 지금, 무엇을 준비해야 하나</h2>
                <p>
                  개편안이 확정되지 않은 지금은 현행 제도를 기준으로 대비하되, 통과 여부를 함께 지켜보는 것이 현실적입니다. 절차상 준비는 다음 순서로 접근하면 됩니다.
                </p>
                <ol className="ml-5 list-decimal space-y-2 text-text-secondary">
                  <li>상속재산 목록과 평가액을 정리합니다(부동산 공시가격, 예금, 주식 등).</li>
                  <li>상속인 구성과 각자 받을 예상 비율을 확인합니다(유산취득세는 취득분이 핵심).</li>
                  <li>현행 공제(일괄공제 5억, 배우자공제 등)로 예상 세액을 먼저 계산합니다.</li>
                  <li>개편안 통과 시 자녀공제 5억이 유리한지 시나리오로 비교합니다.</li>
                  <li>신고기한(상속개시일이 속한 달의 말일부터 6개월 이내)을 확인합니다.</li>
                </ol>
                <p>
                  다만 이 준비는 절세를 확정하는 절차가 아니라 의사결정을 돕는 점검입니다. 재산 규모가 크거나 사전증여가 얽혀 있으면, 10년 내 증여 합산 등 변수가 많아 반드시 전문가 검토가 필요합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/inheritance-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산과 공제를 입력해 예상 세액을 계산해보세요.</p>
                  </Link>
                  <Link href="/guide/inheritance-tax-calculation-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세가액, 공제, 세율 적용의 기본을 정리합니다.</p>
                  </Link>
                  <Link href="/guide/inheritance-tax-deduction-limit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상속세 공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">일괄공제, 배우자공제, 인적공제의 한도를 확인하세요.</p>
                  </Link>
                  <Link href="/guide/inheritance-other-personal-deduction-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">그 밖의 인적공제</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀, 미성년자, 연로자, 장애인 공제를 알아보세요.</p>
                  </Link>
                  <Link href="/guide/inheritance-vs-gift-tax-comparison-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상속세 vs 증여세</div>
                    <p className="mt-1 text-sm text-text-secondary">미리 증여할지 상속할지 판단 기준을 비교합니다.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 취득세, 상속세, 증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적이며 개인 맞춤형 세무 조언이 아닙니다. 유산취득세 전환과 자녀공제 5억 상향은 2026년 8월 3일 발표된 세제개편안(案)으로, 국회 통과 전까지 확정된 제도가 아닙니다. 시행 시점(2028년 목표), 세부 과세 단위, 공제 재설계는 최종 통과된 법률과 시행령으로 달라질 수 있습니다. 현재 상속이 개시되면 현행 유산세 방식과 현행 공제가 적용됩니다. 인용 조항: 상속세 및 증여세법 §13(과세가액), §18(기초공제), §19(배우자공제), §20(그 밖의 인적공제), §21(일괄공제), §26(세율). 본 콘텐츠는 2026-08-22 기준이며 법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부(세제개편안)</a>.
                </p>
              </section>

              <ShareButtons title="유산취득세 전환 2026 개편안, 자녀공제 5억" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
