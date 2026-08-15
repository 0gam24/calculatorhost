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
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 6개(적격증빙 가산세·복식부기·간편장부·사업용카드·종합소득세 허브·세금허브).
// traffic: "접대비 한도 계산"·"기업업무추진비 건당 3만원"·"경조사비 증빙 20만원" 자영업 롱테일 흡수(법인세법 §25, 소득세법 §35).

const URL = 'https://calculatorhost.com/guide/business-entertainment-expense-limit-2026/';
const DATE_PUBLISHED = '2026-08-16';
const DATE_MODIFIED = '2026-08-16';

export const metadata: Metadata = {
  title: '기업업무추진비(접대비) 한도 2026, 계산과 증빙 정리',
  description:
    '접대비의 정식 이름은 기업업무추진비입니다(법인세법 §25, 소득세법 §35). 비용으로 인정받는 한도는 기본한도(중소기업 3,600만·일반 1,200만)에 수입금액별 한도를 더해 계산하고, 건당 3만원을 넘으면 적격증빙이 필요합니다. 한도 계산과 증빙 규칙을 정리했습니다.',
  keywords: [
    '기업업무추진비 한도',
    '접대비 한도',
    '접대비 건당 3만원',
    '경조사비 증빙 20만원',
    '접대비 계산',
    '법인세법 25조',
    '소득세법 35조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '기업업무추진비 접대비 한도 2026' }],
    title: '기업업무추진비(접대비) 한도 2026, 계산과 증빙',
    description: '기본한도(중소 3,600만·일반 1,200만) + 수입금액별 한도. 건당 3만원 초과 적격증빙 필수. 법인세법 §25.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '기업업무추진비(접대비) 한도 2026, 계산과 증빙',
    description: '접대비 한도 계산과 건당 3만원·경조사 20만원 증빙 규칙. 법인세법 §25, 소득세법 §35.',
  },
};

const FAQ_ITEMS = [
  {
    question: '접대비와 기업업무추진비는 다른 건가요?',
    answer:
      '같은 것입니다. 2024년 귀속부터 세법상 정식 명칭이 접대비에서 기업업무추진비로 바뀌었습니다(법인세법 §25, 소득세법 §35). 실무에서는 여전히 접대비라고 부르지만, 거래처 접대·선물·경조사 등 사업 관계로 지출한 비용을 뜻하는 같은 개념입니다.',
  },
  {
    question: '접대비 한도는 어떻게 계산하나요?',
    answer:
      '기본한도에 수입금액별 한도를 더합니다. 기본한도는 중소기업 3,600만원, 일반기업 1,200만원이며 사업연도가 1년이 아니면 월수로 안분합니다. 여기에 매출(수입금액)에 정해진 적용률을 곱한 금액을 더해 총 한도를 구합니다. 한도를 넘는 지출은 비용(손금)으로 인정되지 않습니다.',
  },
  {
    question: '수입금액별 한도는 어떤 비율인가요?',
    answer:
      '매출 구간이 커질수록 적용률이 낮아집니다. 일반적으로 수입금액 100억원 이하는 0.3%, 100억원 초과 500억원 이하 구간은 0.2%, 500억원 초과 구간은 0.03%가 적용됩니다. 각 구간을 누적해 계산하므로, 매출이 클수록 매출 대비 인정 비율은 줄어듭니다. 구체 계산은 국세청 기준을 확인하세요.',
  },
  {
    question: '건당 3만원 규정은 무엇인가요?',
    answer:
      '한 건에 3만원을 넘게 쓰면 적격증빙이 있어야 비용으로 인정됩니다. 적격증빙은 세금계산서, 계산서, 신용카드 매출전표, 현금영수증을 말합니다. 3만원 초과인데 간이영수증만 있으면 한도 안이라도 그 지출은 비용으로 인정되지 않으니 반드시 카드나 세금계산서로 결제하세요.',
  },
  {
    question: '경조사비도 증빙이 필요한가요?',
    answer:
      '20만원까지는 청첩장 등으로 인정됩니다. 거래처 경조사비는 건당 20만원 이하이면 청첩장, 부고장 같은 증빙으로 비용 처리가 가능합니다. 다만 20만원을 넘으면 초과분이 아니라 전액이 비용으로 인정되지 않을 수 있으므로, 경조사비는 20만원 한도를 넘지 않도록 관리하는 것이 안전합니다.',
  },
  {
    question: '개인사업자도 접대비 한도가 적용되나요?',
    answer:
      '적용됩니다. 개인사업자는 소득세법 §35에 따라 기업업무추진비 한도가 계산되며, 중소기업 요건을 갖추면 기본한도 3,600만원이 적용됩니다. 법인과 계산 구조가 유사합니다. 다만 업종과 규모에 따라 세부 적용이 다를 수 있으니 세무 대리인과 확인하세요.',
  },
  {
    question: '한도를 넘으면 어떻게 되나요?',
    answer:
      '초과분은 비용으로 빠집니다. 한도를 초과한 기업업무추진비는 손금불산입되어 과세소득에 다시 더해지고, 그만큼 세금이 늘어납니다. 또 적격증빙이 없는 3만원 초과 지출은 한도와 별개로 아예 인정되지 않습니다. 즉 한도 관리와 증빙 관리는 다른 문제이며 둘 다 챙겨야 합니다.',
  },
  {
    question: '접대비와 광고선전비는 어떻게 구분하나요?',
    answer:
      '대상이 특정되는지로 갈립니다. 특정 거래처를 접대·향응하면 기업업무추진비, 불특정 다수에게 홍보하면 광고선전비입니다. 광고선전비는 접대비 같은 한도 제한이 없어 전액 비용 처리가 가능한 경우가 많습니다. 지출 성격을 정확히 구분해 계정을 잡는 것이 절세의 출발점입니다.',
  },
];

export default function BusinessEntertainmentExpenseLimit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '기업업무추진비(접대비) 한도 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '기업업무추진비(접대비) 한도 2026, 계산과 증빙 정리',
    description:
      '기업업무추진비(옛 접대비)의 손금 인정 한도 계산법(기본한도 + 수입금액별 한도), 건당 3만원 적격증빙, 경조사비 20만원 규칙을 자영업자·법인 관점에서 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['기업업무추진비', '접대비 한도', '건당 3만원', '경조사비 증빙', '법인세법 25조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '기업업무추진비(접대비) 한도 2026',
    description:
      '접대비(기업업무추진비) 한도 계산과 건당 3만원·경조사 20만원 증빙 규칙 정리.',
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
                    { name: '기업업무추진비(접대비) 한도 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자영업자·법인 · 8분 읽기 · 2026-08-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  기업업무추진비(접대비) 한도 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 계산법과 증빙 규칙</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  거래처와 밥을 먹거나 선물을 보내면 비용 처리를 할 수 있지만, 무한정 되는 것은 아닙니다. 접대비, 즉 기업업무추진비에는 인정 한도와 까다로운 증빙 규칙이 있습니다. 이 가이드는 자영업자와 법인 담당자를 위해 한도를 어떻게 계산하는지, 건당 3만원과 경조사비 20만원 규칙은 무엇인지, 한도를 넘으면 어떻게 되는지 단계별로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기업업무추진비가 무엇인가요?</h2>
                <p>
                  사업 관계로 거래처 등에 접대·향응·선물·경조사비로 지출한 비용입니다. 2024년 귀속부터 세법상 명칭이 접대비에서 기업업무추진비로 바뀌었습니다(법인세법 §25, 소득세법 §35). 이름만 바뀌었을 뿐 개념은 같아, 실무에서는 여전히 접대비라고 부릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">두 개의 관문</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    접대비가 비용으로 인정되려면 두 관문을 통과해야 합니다. 첫째 한도(기본한도 + 수입금액별 한도) 이내일 것, 둘째 건당 3만원 초과 시 적격증빙을 갖출 것. 둘 중 하나만 어겨도 그 부분은 비용에서 빠집니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">접대비 한도는 어떻게 계산하나요?</h2>
                <p>
                  기본한도에 매출에 비례한 한도를 더합니다. 계산 구조는 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한도 계산식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    총 한도 = 기본한도(월수 안분) + 수입금액별 한도
                    <br />
                    · 기본한도: 중소기업 3,600만원, 일반기업 1,200만원 (사업연도 월수 ÷ 12 곱함)
                    <br />
                    · 수입금액별 한도: 매출액 × 구간별 적용률(누적)
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 수입금액별 적용률(일반적 기준, 누적 계산)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">수입금액 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적용률</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">100억원 이하</td>
                        <td className="p-3">0.3%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">100억원 초과 ~ 500억원 이하</td>
                        <td className="p-3">0.2%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">500억원 초과</td>
                        <td className="p-3">0.03%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 문화 관련 지출에 대한 별도 추가 한도 등 세부 규정이 더 있고, 적용률은 개정될 수 있습니다. 정확한 계산은 국세청 기준과 세무 대리인 확인이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한도 계산 사례</h2>
                <p>
                  숫자로 보면 이해가 빠릅니다. 두 가지 사례를 계산해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 중소기업, 연 매출 10억원</p>
                  <p className="text-sm text-text-secondary">
                    · 기본한도(중소): 3,600만원 (사업연도 1년 가정)
                    <br />
                    · 수입금액별: 10억원 × 0.3% = 300만원
                    <br />
                    · 총 한도: 3,600만원 + 300만원 = <strong>3,900만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">이 금액을 넘게 쓴 접대비는 비용으로 인정되지 않습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 일반기업, 연 매출 50억원</p>
                  <p className="text-sm text-text-secondary">
                    · 기본한도(일반): 1,200만원
                    <br />
                    · 수입금액별: 50억원 × 0.3% = 1,500만원 (50억은 100억 이하라 전액 0.3%)
                    <br />
                    · 총 한도: 1,200만원 + 1,500만원 = <strong>2,700만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">중소기업이 아니면 기본한도가 낮아 총 한도도 줄어듭니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 이는 개략 계산이며, 사업연도가 1년 미만이면 기본한도를 월수로 안분하고 특례가 더해질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">건당 3만원 규정이 무엇인가요?</h2>
                <p>
                  한 건에 3만원을 넘으면 적격증빙이 반드시 있어야 합니다. 적격증빙은 세금계산서, 계산서, 신용카드 매출전표, 현금영수증을 말합니다. 3만원을 초과했는데 간이영수증이나 거래명세서만 있으면, 한도 안이라도 그 지출은 비용으로 인정되지 않습니다.
                </p>
                <p>
                  예외: 거래처 경조사비는 건당 20만원까지 청첩장, 부고장 같은 증빙으로 인정됩니다. 다만 20만원을 넘으면 초과분만이 아니라 전액이 부인될 수 있으므로, 경조사비는 20만원 한도를 넘지 않도록 관리하는 것이 안전합니다.
                </p>
                <p>
                  실무 팁: 거래처 지출은 되도록 법인카드나 사업용 신용카드로 결제하면 적격증빙 요건과 기록 관리가 동시에 해결됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한도를 넘으면 어떻게 되나요?</h2>
                <p>
                  초과한 만큼 세금이 늘어납니다. 한도를 초과한 기업업무추진비는 손금불산입되어 과세소득에 다시 더해집니다. 즉 실제로는 돈을 썼지만 세금 계산에서는 비용으로 빼주지 않는 것입니다.
                </p>
                <p>
                  여기서 주의할 점은 한도와 증빙이 별개의 관문이라는 것입니다. 적격증빙이 없는 3만원 초과 지출은 한도가 남아 있어도 아예 인정되지 않습니다. 반대로 증빙이 완벽해도 총액이 한도를 넘으면 초과분은 부인됩니다. 두 가지를 모두 챙겨야 온전히 비용 처리가 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">접대비와 다른 비용은 어떻게 구분하나요?</h2>
                <p>
                  대상이 특정되는지가 기준입니다. 특정 거래처를 접대·향응하면 기업업무추진비이고, 불특정 다수에게 홍보하면 광고선전비입니다. 회사 임직원을 위한 지출은 복리후생비로 잡힙니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>기업업무추진비:</strong> 특정 거래처 접대·선물·경조사 (한도·증빙 제한 있음)</li>
                  <li><strong>광고선전비:</strong> 불특정 다수 홍보 (한도 제한 없는 경우 많음)</li>
                  <li><strong>복리후생비:</strong> 임직원 대상 지출 (별도 기준)</li>
                </ul>
                <p className="mt-4">
                  다만 판촉물, 회의비, 판매장려금 등 성격이 애매한 지출은 실제 목적과 대상에 따라 계정이 달라집니다. 계정을 잘못 잡으면 한도 초과나 증빙 부인으로 이어질 수 있으니, 지출 성격을 정확히 기록하는 것이 절세의 시작입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/qualified-receipt-evidence-penalty-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">적격증빙 가산세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">증빙 없이 지출하면 붙는 가산세를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">복식부기·간편장부 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">장부 의무와 비용 처리의 기본을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/business-credit-card-hometax-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업용 신용카드 등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">홈택스 사업용 카드 등록으로 증빙을 자동화하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소득 세금을 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순·기준경비율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">경비 인정 방식과 장부의 차이를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·사업자 세금 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 기업업무추진비 한도, 수입금액별 적용률, 증빙 요건은 개정될 수 있고 업종·규모에 따라 적용이 달라지므로, 실제 신고 시에는 국세청 기준과 세무 대리인 확인이 필요합니다. 본 콘텐츠는 2026-08-16 기준으로 작성됐으며, 세법 개정 시 즉시 업데이트됩니다. 인용 근거: <strong>법인세법 §25(기업업무추진비의 손금불산입), 소득세법 §35(기업업무추진비의 필요경비 불산입)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="기업업무추진비(접대비) 한도 2026, 계산과 증빙 가이드"
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
