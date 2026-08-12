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

const URL = 'https://calculatorhost.com/guide/marriage-tax-credit-2026/';
const DATE_PUBLISHED = '2026-08-12';
const DATE_MODIFIED = '2026-08-12';

export const metadata: Metadata = {
  title: '결혼세액공제 2026, 혼인신고만 해도 부부 100만원',
  description:
    '2024년부터 2026년 사이에 혼인신고를 하면 부부가 각각 50만원씩 최대 100만원의 세금을 돌려받습니다. 나이와 소득 제한 없이 생애 1회 적용되는 결혼세액공제의 조건과 신청 방법을 조세특례제한법 §92 기준으로 정리했습니다.',
  keywords: [
    '결혼세액공제',
    '혼인세액공제',
    '결혼 세액공제 100만원',
    '혼인신고 세액공제',
    '결혼세액공제 조건',
    '신혼부부 세금 혜택',
    '조세특례제한법 92조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '결혼세액공제 2026, 혼인신고만 해도 부부 100만원' }],
    title: '결혼세액공제 2026, 혼인신고만 해도 부부 100만원 환급',
    description: '2024~2026년 혼인신고 시 부부 각 50만원, 합계 100만원 세액공제. 나이·소득 제한 없음. 조특법 §92.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '결혼세액공제 2026, 부부 100만원',
    description: '혼인신고만 해도 부부 각 50만원 세액공제. 2026년까지 한시 적용. 조특법 §92.',
  },
};

const FAQ_ITEMS = [
  {
    question: '결혼세액공제는 얼마를 받나요?',
    answer:
      '부부가 각각 50만원씩, 합쳐서 최대 100만원의 세액공제를 받습니다(조세특례제한법 §92). 소득공제가 아니라 산출세액에서 직접 빼주는 세액공제라, 낼 세금이 있는 경우 1인당 최대 50만원의 세금이 그대로 줄어듭니다.',
  },
  {
    question: '결혼세액공제를 받을 수 있는 혼인 시기는 언제인가요?',
    answer:
      '혼인신고 접수일 기준으로 2024년 1월 1일부터 2026년 12월 31일 사이에 혼인신고를 한 경우가 대상입니다. 3년간 한시적으로 적용되는 제도이므로, 2026년 12월 31일까지 혼인신고를 마쳐야 공제를 받을 수 있습니다. 결혼식 날짜가 아니라 법적 혼인신고일이 기준입니다.',
  },
  {
    question: '나이나 소득 제한이 있나요?',
    answer:
      '없습니다. 결혼세액공제는 나이 제한과 소득 제한이 모두 없습니다. 초혼과 재혼도 구분하지 않습니다. 다만 세액공제는 낼 세금이 있어야 효과가 있으므로, 소득이 없어 산출세액이 0원인 경우에는 공제받을 세금 자체가 없어 혜택을 보기 어렵습니다.',
  },
  {
    question: '몇 번까지 받을 수 있나요?',
    answer:
      '생애 1회만 적용됩니다. 같은 사람이 여러 번 혼인하더라도 결혼세액공제는 평생 한 번만 받을 수 있습니다. 따라서 재혼이라도 과거에 이 공제를 받은 적이 없다면 요건을 갖춘 혼인에 대해 받을 수 있습니다.',
  },
  {
    question: '언제, 어떻게 신청하나요?',
    answer:
      '혼인신고를 한 과세연도의 소득에 대해 공제받습니다. 근로자는 다음 해 연말정산 때, 개인사업자·프리랜서는 다음 해 5월 종합소득세 신고 때 신청합니다. 예를 들어 2026년에 혼인신고를 하면 2027년 초 연말정산 또는 2027년 5월 종소세 신고에서 공제합니다. 신청을 놓쳤다면 경정청구로도 받을 수 있습니다.',
  },
  {
    question: '맞벌이 부부는 각자 받나요?',
    answer:
      '네, 부부가 각자 본인의 세액에서 50만원씩 공제받습니다. 두 사람 모두 낼 세금이 있으면 부부 합산 100만원 효과를 온전히 봅니다. 반면 한쪽이 소득이 없어 세금이 없으면 그쪽은 공제 효과가 없어 실제 혜택이 50만원에 그칠 수 있습니다.',
  },
  {
    question: '혼인 증여재산공제와 함께 받을 수 있나요?',
    answer:
      '네, 별개 제도라 함께 활용할 수 있습니다. 결혼세액공제는 소득세에서 세금을 깎아주는 제도이고, 혼인 증여재산공제(상속세및증여세법 §53의2)는 혼인신고 전후 부모에게서 재산을 증여받을 때 최대 1억원을 증여세 과세가액에서 빼주는 제도입니다. 성격이 다르므로 요건을 각각 갖추면 둘 다 적용됩니다.',
  },
  {
    question: '혼인신고를 2025년에 했는데 아직 안 받았어요. 지금 받을 수 있나요?',
    answer:
      '네, 경정청구로 받을 수 있습니다. 2025년에 혼인신고를 했다면 2025년 귀속 연말정산 또는 종합소득세 신고에서 공제 대상이었으므로, 누락했다면 관할 세무서나 홈택스를 통해 경정청구를 하면 됩니다. 경정청구는 법정신고기한이 지난 후 5년 이내에 할 수 있습니다.',
  },
];

export default function MarriageTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '결혼세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '결혼세액공제 2026, 혼인신고만 해도 부부 100만원',
    description:
      '2024~2026년 혼인신고 시 부부 각 50만원, 합계 100만원의 세액공제를 받는 결혼세액공제의 조건, 신청 방법, 맞벌이·외벌이 차이, 혼인 증여재산공제와의 관계를 조세특례제한법 §92 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['결혼세액공제', '혼인세액공제', '신혼부부', '연말정산', '조세특례제한법 92조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '결혼세액공제 2026',
    description:
      '혼인신고 시 부부 최대 100만원 결혼세액공제의 조건과 신청 방법을 정리한 가이드.',
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
                    { name: '결혼세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">신혼부부·직장인 · 7분 읽기 · 2026-08-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  결혼세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">혼인신고만 해도 부부 100만원</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  결혼을 하면 챙길 것이 많지만, 혼인신고만 제때 해도 세금 100만원을 돌려받을 수 있다는 사실은 의외로 모르는 분이 많습니다. 결혼세액공제는 2024년부터 2026년까지 3년간 한시적으로 운영되는 제도로, 나이나 소득 제한 없이 부부가 각각 50만원씩 세금을 깎아줍니다. 이 가이드는 누가, 언제, 어떻게 받는지를 조세특례제한법 §92를 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">결혼세액공제란 무엇인가요?</h2>
                <p>
                  결혼세액공제(혼인에 대한 세액공제)는 혼인신고를 한 부부에게 소득세를 깎아주는 제도입니다(조세특례제한법 §92). 저출생 대응과 결혼 장려를 위해 2024년 세법 개정으로 신설됐습니다.
                </p>
                <p>
                  핵심은 세액공제라는 점입니다. 소득에서 일정 금액을 빼주는 소득공제와 달리, 계산이 끝난 세금(산출세액)에서 곧바로 빼주기 때문에 체감 혜택이 큽니다. 1인당 50만원이면, 낼 세금이 있는 경우 세금이 정확히 50만원 줄어듭니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 줄 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    2024~2026년 혼인신고 → 부부 각 50만원, 합계 최대 100만원 세액공제. 생애 1회, 나이·소득 제한 없음.
                  </p>
                </div>
                <p>
                  다만 2026년 12월 31일까지 혼인신고를 마친 경우에만 적용되는 한시 제도라는 점을 기억해야 합니다. 결혼을 앞두고 있다면 혼인신고 시기를 이 기간 안에 맞추는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 요건 한눈에 보기</h2>
                <p>
                  결혼세액공제는 요건이 단순한 편입니다. 표로 정리하면 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 결혼세액공제 요건 (조특법 §92)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제액</td>
                        <td className="p-3">1인당 50만원, 부부 최대 100만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상 기간</td>
                        <td className="p-3">2024.1.1 ~ 2026.12.31 혼인신고분</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">적용 횟수</td>
                        <td className="p-3">생애 1회</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">나이·소득</td>
                        <td className="p-3">제한 없음, 초혼·재혼 무관</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제 시기</td>
                        <td className="p-3">혼인신고한 과세연도 (연말정산 또는 종소세)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 나이와 소득 제한은 없지만 세액공제라는 특성상 낼 세금이 없으면 실익이 없습니다. 소득이 없는 배우자는 그 해에 공제 효과가 없다는 점을 감안해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제, 어떻게 신청하나요?</h2>
                <p>
                  결혼세액공제는 혼인신고를 한 과세연도의 소득에 대해 공제받습니다. 근로자와 개인사업자의 신청 시점이 다릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신청 절차</p>
                  <p className="text-sm text-text-secondary">
                    근로자: 혼인신고한 해의 다음 연도 초 연말정산에서 세액공제 항목에 결혼세액공제를 반영합니다.
                    <br />
                    개인사업자·프리랜서: 다음 연도 5월 종합소득세 신고 때 신청합니다.
                    <br />
                    누락 시: 법정신고기한 후 5년 이내에 경정청구로 돌려받을 수 있습니다.
                    <br />
                    증빙: 혼인신고 사실은 가족관계증명서 등으로 확인되며, 홈택스 연말정산 자료에서 확인되는 경우 별도 제출이 간소화됩니다.
                  </p>
                </div>
                <p>
                  다만 혼인신고 시점에 따라 공제받는 과세연도가 정해지므로, 2026년 말에 혼인신고를 하면 2027년에 신청하게 됩니다. 신고 시기를 착각해 엉뚱한 해에 신청하지 않도록 주의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">맞벌이와 외벌이는 혜택이 다른가요?</h2>
                <p>
                  공제는 각자 본인의 세액에서 이뤄지므로, 두 사람 모두 낼 세금이 있어야 부부 합산 100만원 효과를 온전히 봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 비교</p>
                  <p className="text-sm text-text-secondary">
                    · 맞벌이(둘 다 소득 있음): 각 50만원 공제 → 부부 합계 <strong>100만원</strong>
                    <br />
                    · 외벌이(한쪽만 소득): 소득 있는 배우자만 <strong>50만원</strong> 공제
                    <br />
                    · 둘 다 산출세액이 50만원 미만: 각자 산출세액 한도까지만 공제
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세액공제라 낼 세금의 크기에 따라 실제 혜택이 달라짐.</span>
                  </p>
                </div>
                <p>
                  다만 한쪽 소득이 적더라도 그 사람에게 산출세액이 조금이라도 있으면 그 범위에서 공제되므로, 부부 각자 연말정산을 챙기는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">다른 신혼 혜택과 중복되나요?</h2>
                <p>
                  결혼세액공제는 소득세를 깎아주는 제도라, 성격이 다른 다른 혼인 관련 혜택과 함께 활용할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>혼인 증여재산공제:</strong> 혼인신고일 전후 2년 이내에 부모에게 재산을 증여받으면 최대 1억원을 증여세 과세가액에서 공제합니다(상증법 §53의2). 결혼세액공제와 별개로 적용됩니다.
                  </li>
                  <li>
                    <strong>신혼부부 전세·주택 대출:</strong> 소득·자산 요건을 충족하는 신혼부부 대상 대출 상품과도 무관하게 함께 이용할 수 있습니다.
                  </li>
                  <li>
                    <strong>자녀 관련 공제:</strong> 이후 출산·양육 단계에서 자녀세액공제 등 별도 공제를 추가로 받을 수 있습니다.
                  </li>
                </ul>
                <p>
                  다만 각 제도는 요건과 신청 절차가 다르므로, 증여를 받는다면 증여세 신고, 소득이 있다면 연말정산을 각각 챙겨야 혜택이 누락되지 않습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세액공제 반영 전후의 실수령액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/marriage-childbirth-gift-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">혼인·출산 증여재산공제</div>
                    <p className="mt-1 text-sm text-text-secondary">부모에게 받는 결혼 자금의 증여세 1억 공제.</p>
                  </Link>
                  <Link
                    href="/guide/dual-income-couple-year-end-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">맞벌이 부부 연말정산</div>
                    <p className="mt-1 text-sm text-text-secondary">부부 공제 배분으로 환급을 극대화하는 전략.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 이후 챙길 자녀 관련 세액공제.</p>
                  </Link>
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">인적공제 150만원</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자·부양가족 기본공제 요건을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산·소득세·공제 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 결혼세액공제는 2024년부터 2026년까지 한시 적용되는 제도로, 공제 요건과 신청 방법은 개별 상황에 따라 달라질 수 있습니다. 실제 신청 전에는 국세청 홈택스 또는 세무 전문가를 통해 확인하세요. 본 콘텐츠는 2026-08-12 기준으로 작성되었습니다. 인용 법조항: <strong>조세특례제한법 §92(혼인에 대한 세액공제), 상속세및증여세법 §53의2(혼인 증여재산공제)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="결혼세액공제 2026 가이드"
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
