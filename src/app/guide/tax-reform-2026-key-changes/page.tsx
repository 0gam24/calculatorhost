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

// [revenue-lever: indexing+traffic]
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 6개(근로장려금·월세세액공제·상속세·자동차세·연봉실수령·세금허브).
// traffic: 2026-08-03 발표 직후 "2026 세제개편안"·"세법개정안 뭐가 바뀌나" 브레이크아웃 키워드 흡수(조특법·상증법 §52의2·개별소비세법).

const URL = 'https://calculatorhost.com/guide/tax-reform-2026-key-changes/';
const DATE_PUBLISHED = '2026-08-16';
const DATE_MODIFIED = '2026-08-16';

export const metadata: Metadata = {
  title: '2026 세제개편안 핵심 정리, 뭐가 바뀌나 (직장인·자산)',
  description:
    '정부가 2026년 8월 3일 발표한 2026년 세제개편안의 방향을 직장인, 자산가, 자영업자, 자동차 구매자로 나눠 정리했습니다. 근로장려금과 월세 세액공제 확대, 하이브리드 감면 종료 등 큰 흐름과 국회 입법 일정, 시행 시기를 담았습니다.',
  keywords: [
    '2026 세제개편안',
    '세법개정안 2026',
    '근로장려금 확대',
    '월세 세액공제',
    '하이브리드 개소세',
    '상속세 개정',
    '조세특례제한법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '2026 세제개편안 핵심 정리' }],
    title: '2026 세제개편안 핵심 정리, 뭐가 바뀌나',
    description: '2026-08-03 발표. 근로장려금·월세 세액공제 확대, 하이브리드 감면 종료 등 큰 흐름과 국회 일정 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 세제개편안 핵심 정리, 뭐가 바뀌나',
    description: '직장인·자산가·자영업자별로 나눈 2026 세제개편안 방향과 국회 입법 일정.',
  },
};

const FAQ_ITEMS = [
  {
    question: '2026 세제개편안은 언제 발표됐나요?',
    answer:
      '2026년 8월 3일 발표됐습니다. 정부는 세제발전심의위원회를 열어 2026년 세제개편안을 확정해 공개했습니다. 다만 이는 정부안이며, 이후 입법예고와 차관회의, 국무회의를 거쳐 정기국회에 제출되고 국회 심의로 확정됩니다. 발표 내용이 그대로 법이 되는 것은 아닙니다.',
  },
  {
    question: '개편안 내용은 언제부터 적용되나요?',
    answer:
      '대부분 국회 통과 뒤 시행됩니다. 개편안은 2026년 하반기 국회 심의를 거쳐 통상 이듬해부터 적용되는 항목이 많습니다. 항목별로 시행 시기가 다르고, 일부는 소급이나 유예가 붙기도 합니다. 정확한 시행일과 요건은 법 확정과 시행령 개정 후 국세청 안내로 확인해야 합니다.',
  },
  {
    question: '직장인에게 도움이 되는 변화는 무엇인가요?',
    answer:
      '근로장려금과 월세 세액공제 확대 방향이 담겼습니다. 저소득 근로가구를 지원하는 근로장려금과 무주택 임차인의 월세 세액공제를 넓히는 흐름입니다. 구체적 금액과 소득 기준은 국회 확정 후 정해지므로, 확정 전까지는 방향으로만 이해하는 것이 안전합니다.',
  },
  {
    question: '자동차 살 때 세금이 늘어나나요?',
    answer:
      '하이브리드차 감면 축소·종료가 논의됐습니다. 그동안 하이브리드차에 적용되던 개별소비세 등 일부 비과세·감면을 정리하는 방향이 포함됐습니다. 감면이 끝나면 그만큼 취득 시 부담이 늘 수 있으므로, 구매 시점을 고민한다면 시행 시기를 확인하는 것이 좋습니다.',
  },
  {
    question: '상속·증여 관련 변화도 있나요?',
    answer:
      '있습니다. 장애인이 증여받은 재산의 과세가액 불산입 한도 확대(상증세법 §52의2 관련), 상속·증여세 금융재산 일괄조회 대상에 가상자산사업자 추가, 특정 요건의 상장주식 평가방법 신설 등이 포함됐습니다. 대부분 시행 시기와 요건이 별도로 정해지므로 소관 부처 고시를 확인하세요.',
  },
  {
    question: '세제개편안 원문은 어디서 보나요?',
    answer:
      '기획재정부와 국세청에서 확인할 수 있습니다. 기획재정부 보도자료로 개편안 전문과 상세본이 공개되고, 국세청 홈택스에서도 관련 안내가 올라옵니다. 언론 요약보다 원문과 상세본을 확인하는 것이 정확합니다.',
  },
  {
    question: '지금 당장 무엇을 해야 하나요?',
    answer:
      '급하게 결정할 필요는 없습니다. 아직 국회 심의 단계이므로 확정 전입니다. 다만 감면 종료가 예고된 항목(예: 특정 차량 감면)이나 확대가 예상되는 공제(월세 등)는 시행 시기에 맞춰 의사결정 타이밍을 잡으면 유리할 수 있습니다. 확정 내용은 연말정산 시즌 전 다시 점검하세요.',
  },
  {
    question: '개편안이 국회에서 바뀔 수도 있나요?',
    answer:
      '바뀔 수 있습니다. 정부안은 국회 심의 과정에서 수정, 보완, 일부 철회될 수 있습니다. 실제로 매년 정부 발표와 최종 확정안 사이에 차이가 생깁니다. 그래서 발표 시점의 금액이나 요건을 확정된 것으로 받아들이지 말고, 연말 법 통과 후 최종본을 기준으로 판단해야 합니다.',
  },
];

export default function TaxReform2026KeyChangesPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '2026 세제개편안 핵심 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2026 세제개편안 핵심 정리, 뭐가 바뀌나',
    description:
      '2026년 8월 3일 발표된 정부의 2026년 세제개편안 방향을 직장인, 자산가, 자영업자, 자동차 구매자별로 정리하고 국회 입법 일정과 시행 시기, 확정 전 유의점을 담은 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['2026 세제개편안', '근로장려금', '월세 세액공제', '하이브리드 개소세', '상속세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '2026 세제개편안 핵심 정리',
    description:
      '2026 세제개편안의 큰 흐름을 대상별로 정리하고 국회 입법 일정과 시행 시기를 안내.',
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
                    { name: '2026 세제개편안 핵심 정리' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·자산가·자영업자 · 8분 읽기 · 2026-08-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026 세제개편안 핵심 정리
                  <br />
                  <span className="text-2xl text-text-secondary">· 뭐가 바뀌나, 언제부터</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  정부가 2026년 8월 3일 2026년 세제개편안을 발표했습니다. 이 가이드는 복잡한 개편안을 직장인, 자산가, 자영업자, 자동차 구매자 등 대상별로 나눠 큰 흐름만 쉽게 정리합니다. 대상 독자는 내 세금이 어떻게 달라질지 궁금한 일반 납세자입니다. 중요한 전제부터 말하면, 아직 정부안이라 국회를 거쳐 바뀔 수 있고 대부분 내년부터 적용됩니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026 세제개편안이란?</h2>
                <p>
                  정부가 한 해 세법을 어떻게 고칠지 정리해 발표하는 개정 방향입니다. 2026년 8월 3일 세제발전심의위원회를 거쳐 확정된 정부안으로, 잠재성장률 반등, 민생·지방 지원, 공정과세, 세제 합리화를 큰 방향으로 제시했습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">먼저 알아둘 점: 아직 확정이 아닙니다</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    발표된 것은 정부안이며, 입법예고와 차관회의, 국무회의를 거쳐 정기국회에 제출됩니다. 국회 심의에서 수정될 수 있고, 대부분 통과 후 이듬해부터 시행됩니다. 그래서 지금은 방향으로만 이해하는 것이 안전합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개편안은 언제 국회에 가고 언제 적용되나?</h2>
                <p>
                  발표 뒤 입법 절차가 이어집니다. 통상 8월 발표, 입법예고, 차관회의와 국무회의를 거쳐 9월 초 정기국회에 제출되고, 연말 국회 심의로 확정됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 세제개편안 입법 절차(일반적 흐름)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">정부안 발표</td>
                        <td className="p-3">세제발전심의위 확정, 2026-08-03</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">입법예고</td>
                        <td className="p-3">개정안 조문 공개, 의견 수렴</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">차관·국무회의</td>
                        <td className="p-3">정부 내부 의결</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">국회 제출·심의</td>
                        <td className="p-3">9월 초 제출, 연말 확정</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 단계별 날짜는 해마다 조금씩 다르고, 항목별 시행일도 제각각입니다. 정확한 일정과 시행일은 기획재정부 보도자료에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">직장인·서민에게 무엇이 바뀌나?</h2>
                <p>
                  지원 공제를 넓히는 방향입니다. 저소득 근로가구를 돕는 근로장려금과 무주택 임차인의 월세 세액공제를 확대하는 흐름이 담겼습니다. 근로장려금은 조세특례제한법, 월세 세액공제는 조세특례제한법 §95의2가 근거 규정입니다.
                </p>
                <p>
                  또한 신용카드 소득공제에서 대중교통 사용분을 기본공제로 정리하는 등 공제 구조를 손보는 내용, 일부 지원을 세금 감면이 아니라 예산 사업으로 옮기는 내용도 포함됐습니다.
                </p>
                <p>
                  다만 확대 폭(금액, 소득 기준)은 국회 확정 후 정해집니다. 지금 발표된 숫자를 확정된 것으로 받아들이지 말고, 연말정산 시즌 전에 최종본을 다시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자동차 살 때 세금이 늘어나나?</h2>
                <p>
                  하이브리드차 감면 정리가 논의됐습니다. 그동안 하이브리드차에 적용되던 개별소비세 등 일부 감면을 축소·종료하는 방향입니다(개별소비세법 관련). 감면이 끝나면 그만큼 취득 부담이 늘 수 있습니다.
                </p>
                <p>
                  예외: 전기차·수소차 등 무공해차 지원은 별도 정책 흐름을 타므로 하이브리드와 구분해서 봐야 합니다. 차량 구매를 앞두고 있다면 어떤 차종에 어떤 감면이 언제까지 유지되는지 시행 시기를 확인하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자산·상속·투자 쪽 변화는?</h2>
                <p>
                  과세 사각지대를 좁히고 일부 공제를 넓히는 방향이 섞여 있습니다. 발표된 자산과세 분야의 주요 흐름은 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>장애인 증여 지원 확대:</strong> 장애인이 증여받은 재산의 과세가액 불산입 한도 확대(상증세법 §52의2 관련)</li>
                  <li><strong>가상자산 파악 강화:</strong> 상속·증여세 결정을 위한 금융재산 일괄조회 대상에 가상자산사업자 추가</li>
                  <li><strong>상장주식 평가 보완:</strong> 특정 요건을 충족하는 경우 상장주식 평가방법 신설(적용 시기 별도)</li>
                </ul>
                <p className="mt-4">
                  다만 각 항목의 구체적 한도와 요건, 적용 시기는 법 확정과 시행령으로 정해지므로 소관 부처 고시를 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">지금 무엇을 해야 하나?</h2>
                <p>
                  서두를 필요는 없지만 타이밍은 챙기면 좋습니다. 아직 확정 전이라 대부분 급하게 결정할 일은 아닙니다. 다만 다음 정도는 미리 점검해 두면 유리합니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>감면 종료가 예고된 항목(특정 차량 감면 등)은 시행 시기 확인 후 구매 타이밍 조정</li>
                  <li>확대가 예상되는 공제(월세, 근로장려금 등)는 요건을 미리 갖춰 두기</li>
                  <li>상속·증여 계획이 있다면 확정본 나온 뒤 세무 상담으로 재점검</li>
                  <li>연말 국회 통과 후 최종본을 연말정산 시즌 전에 다시 확인</li>
                </ol>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/earned-income-tax-credit-payment-amount-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 지급액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">얼마 받는지, 조건은 무엇인지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/monthly-rent-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">월세 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택 임차인 월세 공제 요건과 한도.</p>
                  </Link>
                  <Link
                    href="/guide/hybrid-vehicle-consumption-tax-sunset-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">하이브리드 개소세 감면 일몰</div>
                    <p className="mt-1 text-sm text-text-secondary">친환경차 감면 종료 흐름을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">상속세 세율·공제 기본기를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세후 월급과 공제를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·양도세·상속세·부가세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 2026년 8월 3일 발표된 정부 세제개편안의 방향을 교육 목적으로 요약한 것으로, 확정된 법령이 아닙니다. 개편안은 국회 심의에서 수정될 수 있고 항목별 시행 시기와 구체적 금액·요건은 법 확정과 시행령 개정 후 달라집니다. 개별 세무 판단은 확정본을 근거로 국세청 또는 세무 전문가와 상담해 확인하세요. 본 콘텐츠는 2026-08-16 기준으로 작성됐으며, 국회 확정 시 즉시 업데이트됩니다. 인용 근거: <strong>조세특례제한법(근로장려금·월세 세액공제 §95의2), 상속세 및 증여세법 §52의2(장애인 증여 과세가액 불산입), 개별소비세법(자동차 감면)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="2026 세제개편안 핵심 정리 가이드"
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
