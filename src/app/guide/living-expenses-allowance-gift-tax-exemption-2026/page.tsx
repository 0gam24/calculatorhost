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
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 6개(증여공제 한도·증여세 계산·차용증·혼인출산공제·부양가족 인적공제·세금허브).
// traffic: 추석 시즌 "부모님 용돈 증여세"·"자녀 세뱃돈 증여세"·"생활비 증여세" 롱테일 흡수(상증법 §46 비과세·§35 직접지출·§53 공제한도).

const URL = 'https://calculatorhost.com/guide/living-expenses-allowance-gift-tax-exemption-2026/';
const DATE_PUBLISHED = '2026-08-15';
const DATE_MODIFIED = '2026-08-15';

export const metadata: Metadata = {
  title: '생활비 용돈 증여세 2026, 비과세 한도와 과세 기준 | calculatorhost',
  description:
    '부모 자녀 간 생활비와 용돈은 사회통념 범위에서 쓰면 증여세가 없습니다(상증법 §46). 직접 지출해야 비과세되고, 모아서 예금·주식·부동산을 사면 과세됩니다. 공제 한도와 계산 사례까지 정리했습니다.',
  keywords: [
    '생활비 증여세',
    '용돈 증여세',
    '부모님 생활비 세금',
    '자녀 용돈 증여세',
    '증여세 비과세 한도',
    '상증법 46조',
    '명절 용돈 증여세',
    '세뱃돈 증여세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '생활비 용돈 증여세 2026, 비과세 한도와 과세 기준' }],
    title: '생활비 용돈 증여세 2026, 비과세 한도와 과세 기준',
    description: '사회통념 범위의 생활비와 용돈은 비과세(상증법 §46). 다만 모아서 재산을 형성하면 증여세 과세 대상.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '생활비 용돈 증여세 2026, 비과세 한도와 과세 기준',
    description: '사회통념 범위의 생활비·용돈은 비과세. 모아서 예금·주식·집을 사면 과세. 상증법 §46 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부모님께 매달 100만원씩 생활비를 드리는데 증여세를 내야 하나요?',
    answer:
      '피부양 관계에 있는 부모님께 실제 생활비로 드리는 돈은 비과세입니다(상증법 §46 제5호). 소득이 없거나 부족한 부모님을 자녀가 부양하는 경우가 여기 해당합니다. 다만 부모님이 이 돈을 쓰지 않고 예금·주식 등에 넣어 재산을 만들면 그 부분은 비과세에서 제외되어 증여세 과세 대상이 됩니다(시행령 §35).',
  },
  {
    question: '명절 세뱃돈이나 용돈은 얼마까지 괜찮나요?',
    answer:
      '사회통념상 인정되는 소액 명절 용돈과 세뱃돈은 비과세입니다(상증법 §46). 금액에 딱 정해진 한도는 없지만, 통상적인 범위를 벗어난 큰 금액을 반복적으로 이체하면 실질과세 원칙에 따라 증여로 볼 수 있습니다(국세기본법 §14). 예외: 세뱃돈을 모아 자녀 명의 예금에 넣거나 주식을 사면 그 시점부터 증여로 보고 10년 합산 공제(§53) 한도를 넘으면 과세됩니다.',
  },
  {
    question: '자녀에게 준 용돈을 예금에 넣어두면 문제가 되나요?',
    answer:
      '네, 문제가 됩니다. 시행령 §35는 생활비·교육비를 필요할 때마다 해당 용도에 직접 지출하는 경우에만 비과세로 인정합니다. 받은 돈을 소비하지 않고 예금·적금·주식·부동산 취득 등 재산 형성에 사용하면 그 금액은 비과세에서 제외됩니다. 이 경우 10년 합산 증여재산공제(성년 5,000만, 미성년 2,000만) 한도 안에서만 세금이 없고, 초과분은 증여세 과세 대상입니다.',
  },
  {
    question: '증여재산공제 5,000만원은 매년 새로 계산되나요, 아니면 10년 합산인가요?',
    answer:
      '10년 합산입니다(상증법 §53). 성년 자녀는 부모로부터 최근 10년간 받은 증여재산을 모두 더해 5,000만원까지 공제됩니다. 미성년 자녀는 2,000만원, 배우자는 6억원, 기타 친족은 1,000만원입니다. 다만 사회통념상 인정되는 생활비·교육비는 이 공제와 별개로 애초에 증여로 보지 않습니다(§46). 공제 한도를 소진하지 않으려면 직접 지출 요건을 지키는 것이 유리합니다.',
  },
  {
    question: '형이나 오빠가 준 생활비도 비과세인가요?',
    answer:
      '원칙적으로 비과세는 피부양 관계, 즉 부양 의무가 있고 실제 부양이 필요한 사이에서 인정됩니다(상증법 §46, 시행령 §35). 형제자매 간에도 실제 부양이 이루어지는 특수한 사정이 있다면 비과세로 볼 여지가 있지만, 일반적으로 성인 형제 간 생활비 지원은 증여로 판단될 수 있습니다. 이때는 기타 친족 공제 1,000만원 한도(§53) 안에서만 세금이 없습니다.',
  },
  {
    question: '유학 중인 자녀에게 보내는 학비와 생활비는 어떻게 되나요?',
    answer:
      '피부양 자녀에게 실제 교육비·생활비 용도로 보내는 돈은 비과세입니다(상증법 §46). 대학 등록금, 기숙사비, 필수 생활비 등이 여기 해당합니다. 다만 자녀가 이 돈을 학비·생활비로 실제 지출해야 하며, 남는 돈을 모아 자녀 명의 예금이나 투자에 활용하면 그 부분은 비과세에서 제외됩니다(시행령 §35). 송금 내역과 지출 증빙을 남겨두는 것이 안전합니다.',
  },
  {
    question: '부모님께 드린 병원비도 비과세인가요?',
    answer:
      '네, 피부양 관계 부모님의 치료비는 사회통념상 인정되는 이재구호금품·치료비 범주로 비과세입니다(상증법 §46 제5호). 병원 청구서, 카드 결제 내역 등 실제 치료비로 사용된 증빙을 남기는 것이 좋습니다. 예외: 부모님이 이미 치료비를 낼 능력이 충분한데 자녀가 대신 부담하고 그 돈이 부모님 재산에 그대로 남는 구조라면 증여로 재분류될 수 있습니다.',
  },
  {
    question: '증여세 신고를 안 하면 어떻게 되나요?',
    answer:
      '증여받은 날이 속한 달의 말일부터 3개월 이내에 신고해야 하며(상증법 §68), 무신고 시 가산세가 부과됩니다. 일반 무신고 가산세는 산출세액의 20%, 부정 무신고는 40%까지 올라갑니다. 사회통념 범위의 생활비·용돈은 애초에 증여로 보지 않으니 신고 대상이 아니지만, 사용처가 불분명하거나 재산 형성에 쓰인 자금은 반드시 신고 여부를 검토하세요. 확실치 않으면 관할 세무서나 홈택스에서 확인하는 것이 안전합니다.',
  },
];

export default function LivingExpensesAllowanceGiftTaxExemption2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '생활비 용돈 증여세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '생활비 용돈 증여세 2026, 비과세 한도와 과세 기준',
    description:
      '부모 자녀 간 생활비·용돈은 사회통념 범위에서 직접 지출하면 비과세(상증법 §46, 시행령 §35). 모아서 재산을 형성하면 과세. 공제 한도(§53)와 세율(§56) 계산 사례까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['생활비 증여세', '용돈 증여세', '증여세 비과세', '세뱃돈 증여세', '상증법 46조', '증여재산공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '생활비 용돈 증여세 2026, 비과세 한도와 과세 기준',
    description:
      '부모 자녀 간 생활비·용돈에 붙는 증여세와 비과세 요건, 공제 한도, 계산 사례를 상증법 §46·시행령 §35·§53·§56 기준으로 정리한 가이드.',
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
                    { name: '생활비 용돈 증여세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부모·자녀 · 8분 읽기 · 2026-08-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  생활비 용돈 증여세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 비과세 한도와 과세 기준</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  추석이 다가오면 부모님께 드리는 용돈, 자녀에게 주는 세뱃돈·명절 용돈에 세금이 붙는지 궁금해집니다. 결론부터 말하면, 사회통념상 인정되는 생활비와 용돈은 증여세가 없습니다(상속세 및 증여세법 §46). 다만 받은 돈을 소비하지 않고 모아서 예금·주식·부동산을 사면 그 부분은 비과세에서 제외되어 세금이 나옵니다(시행령 §35). 이 가이드는 어디까지 비과세이고 어디부터 과세인지, 공제 한도와 실제 계산 사례까지 상증법 §46·시행령 §35·§53·§56을 근거로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 부모·자녀 용돈에도 증여세가 붙나요?</h2>
                <p>
                  원칙적으로 붙지 않습니다. 상속세 및 증여세법 §46은 사회통념상 인정되는 이재구호금품, 치료비, 피부양자의 생활비, 교육비 등을 비과세 증여재산으로 규정합니다. 즉 부모가 자녀에게, 또는 자녀가 부모에게 실제 생활에 쓰라고 주는 돈은 증여세 계산에서 아예 빠집니다.
                </p>
                <p>
                  여기서 중요한 전제는 두 가지입니다. 첫째, 주는 사람과 받는 사람 사이에 부양 의무가 있고 실제 부양이 필요해야 합니다. 둘째, 그 금액이 사회통념상 합리적인 수준이어야 합니다. 소득 없는 대학생 자녀에게 주는 월 100만원 용돈, 연금만으로 생활이 빠듯한 부모님께 자녀가 드리는 매달 생활비가 대표적입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">비과세로 인정되는 대표 항목 (상증법 §46)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 피부양자의 생활비, 교육비
                    <br />
                    · 치료비, 병원비
                    <br />
                    · 사회통념상 인정되는 축하금, 부의금, 혼수용품
                    <br />
                    · 이재구호금품
                  </p>
                </div>
                <p>
                  다만, 소득이 충분한 성인 자녀에게 부모가 매달 큰 금액을 이체하는 경우는 상황이 다릅니다. 이때는 부양의 필요성이 없다고 볼 여지가 있어 증여로 재분류될 수 있고, 이후 10년 합산 공제 한도를 따져야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 어떤 조건이어야 비과세인가요?</h2>
                <p>
                  가장 중요한 조건은 직접 지출입니다. 상증법 시행령 §35는 생활비·교육비가 비과세되려면 필요할 때마다 해당 용도에 직접 지출되어야 한다고 명시합니다. 다시 말해 받은 돈을 실제 생활비, 학비, 병원비 등으로 소비해야 비과세가 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">비과세 판별 기준 (시행령 §35)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 피부양 관계인가 (부양 의무와 실제 부양 필요성)
                    <br />
                    2. 사회통념상 인정되는 금액인가
                    <br />
                    3. 받은 돈을 해당 용도에 직접 소비하는가
                    <br />
                    이 세 가지가 모두 충족될 때만 §46 비과세 대상입니다.
                  </p>
                </div>
                <p>
                  판단이 애매할 때는 사용 증빙을 남기는 것이 안전합니다. 학비는 등록금 납부 영수증, 병원비는 진료비 계산서, 생활비는 월세·공과금·식비 카드 결제 내역을 함께 관리하면 실질과세 판단 시 근거가 됩니다(국세기본법 §14).
                </p>
                <p>
                  예외: 부양 의무가 없는 성인 형제·조카 사이의 금전 지원, 또는 부양의 필요성이 없는 고소득 자녀에게 부모가 보내는 큰 금액은 비과세 요건을 갖추기 어렵습니다. 이런 경우는 애초부터 증여로 보고 §53 공제 한도로 관리해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 용돈을 모아 예금·주식·집을 사면 어떻게 되나요?</h2>
                <p>
                  그 순간 비과세에서 제외되어 증여세 과세 대상이 됩니다. 시행령 §35는 생활비·교육비 명목으로 받은 돈이라도 실제로 그 용도에 쓰이지 않고 예금·적금·주식·부동산 취득 등 재산 형성에 사용된 부분은 비과세하지 않는다고 못 박고 있습니다.
                </p>
                <p>
                  예를 들어 자녀에게 매달 50만원씩 5년간 생활비 명목으로 3,000만원을 이체했는데, 자녀가 이 돈의 절반을 쓰지 않고 예금 통장에 쌓아두고 있다면 그 쌓인 1,500만원은 증여로 재분류됩니다. 부모 명의로 사둔 부동산 지분을 자녀에게 넘긴 뒤 자녀가 임대료를 받는 경우도 비슷한 논리로 판단됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">과세로 전환되는 대표 상황</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 자녀 명의 예금·적금 통장에 용돈이 계속 쌓이는 경우
                    <br />
                    · 세뱃돈·용돈을 모아 주식·펀드·가상자산을 매수한 경우
                    <br />
                    · 자녀 명의로 전세보증금, 부동산 계약금을 낸 경우
                    <br />
                    · 학비 명목으로 받은 돈이 남아 예금으로 이체된 경우
                  </p>
                </div>
                <p>
                  다만, 재산 형성에 쓰인 금액이 §53 증여재산공제 한도 안에 들어가면 세금은 0원입니다. 예: 성년 자녀가 10년간 부모로부터 재산 형성 목적으로 받은 금액이 4,500만원이면 성년 공제 5,000만원 안에 있으므로 세금이 없습니다. 5,500만원이 되면 500만원이 과세표준이 되어 10% 세율(§56)로 50만원의 증여세가 나옵니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 증여재산공제 한도는 얼마인가요?</h2>
                <p>
                  가족 관계별로 10년 합산 공제 한도가 다릅니다(상증법 §53). 이 한도는 10년간 같은 관계에서 받은 증여를 모두 더해 계산합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 증여재산공제 한도 (상증법 §53, 10년 합산, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">관계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자</td>
                        <td className="p-3"><strong>6억원</strong></td>
                        <td className="p-3">법률상 혼인 관계</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">직계존비속 (성년)</td>
                        <td className="p-3"><strong>5,000만원</strong></td>
                        <td className="p-3">부모·자녀·조부모, 만 19세 이상</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">직계존비속 (미성년)</td>
                        <td className="p-3"><strong>2,000만원</strong></td>
                        <td className="p-3">만 19세 미만 자녀·손자녀</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기타 친족 (6촌 이내 혈족, 4촌 이내 인척)</td>
                        <td className="p-3"><strong>1,000만원</strong></td>
                        <td className="p-3">형제·자매·삼촌·조카 등</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  주의할 점은 사회통념 범위의 생활비·용돈은 이 공제와 별개로 §46에 따라 애초에 증여로 보지 않는다는 것입니다. 즉 부모님께 매달 드리는 실제 생활비, 자녀에게 준 명절 용돈으로 실제 지출한 부분은 §53 공제 한도를 소진하지 않습니다. 공제 한도는 재산 형성에 쓰인 금액이나 명백한 증여(부동산 이전, 큰 금액 목돈 이체 등)에만 적용됩니다.
                </p>
                <p>
                  예외: 혼인·출산 증여공제 1억원(§53의2)은 위 공제와 별도로 추가 적용됩니다. 결혼을 앞둔 자녀에게 목돈을 지원할 계획이라면 이 공제 활용을 함께 검토하는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 매달 생활비를 이체하면 증여세 대상인가요?</h2>
                <p>
                  피부양 관계에서 실제 생활에 쓰는 금액이면 대상이 아닙니다. 예를 들어 소득이 없는 부모님께 매달 100만원, 대학생 자녀에게 매달 60만원의 생활비를 이체하는 것은 §46 비과세에 해당합니다. 부모님은 이 돈으로 식비·공과금·의료비를 쓰고, 자녀는 학비·기숙사비·교재비에 사용하는 정상적인 소비 패턴이면 문제가 없습니다.
                </p>
                <p>
                  판단이 갈리는 지점은 소득이 충분한 성인 자녀에게 부모가 매달 큰 금액을 보내는 경우, 또는 반대로 자녀 소득이 없는데도 부모가 오히려 자녀 통장에 돈을 쌓아두게 하는 경우입니다. 이때는 부양 필요성이 약해 실질과세 원칙(국세기본법 §14)이 적용될 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">안전하게 관리하는 팁</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 이체 시 적요에 목적 표시 (생활비, 학비, 의료비 등)
                    <br />
                    · 받는 사람 통장에서 실제 소비 내역이 남도록 카드 결제
                    <br />
                    · 학비·병원비는 원 청구서와 매칭되게 송금
                    <br />
                    · 남는 돈을 예금으로 옮기지 않고 필요할 때마다 이체
                  </p>
                </div>
                <p>
                  다만, 여러 자녀가 함께 부모님께 생활비를 드리는 경우에도 각자 §46 비과세 대상입니다. 총액이 커도 각 자녀가 자기 몫으로 부양 의무를 이행하는 것이므로 별도 문제는 없습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 명절 세뱃돈은 괜찮나요?</h2>
                <p>
                  사회통념상 인정되는 소액 세뱃돈과 명절 용돈은 비과세입니다(상증법 §46). 초등학생에게 5만원, 중고생에게 10만원 정도의 세뱃돈은 일상적으로 오가는 금전이므로 증여세를 신경 쓸 필요가 없습니다. 추석에 조부모가 손주에게 주는 용돈, 삼촌·이모가 조카에게 주는 명절 축하금도 마찬가지입니다.
                </p>
                <p>
                  문제가 되는 순간은 두 가지입니다. 첫째, 명절 용돈이라는 이름으로 수백만원 이상 반복 이체하는 경우. 둘째, 자녀·손주가 받은 세뱃돈을 부모가 대신 관리해 자녀 명의 예금이나 주식으로 쌓아두는 경우입니다. 두 경우 모두 시행령 §35의 직접 지출 요건을 충족하지 못해 비과세에서 벗어납니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">자녀 명의 세뱃돈 통장, 이렇게 하면 안전</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 소액이고 자녀 학용품·간식·용돈으로 실제 소비되면 문제 없음
                    <br />
                    · 예금·펀드·주식으로 쌓이면 §53 미성년 공제 2,000만원 한도 안에서 관리
                    <br />
                    · 10년 합산 2,000만원 초과 시 초과분은 증여세 과세 (§56 세율)
                    <br />
                    · 큰 금액을 계획적으로 이전할 때는 정식 증여로 신고하는 것이 안전
                  </p>
                </div>
                <p>
                  다만, 소액 세뱃돈이 자연스럽게 쌓여 몇 년에 걸쳐 미성년 공제 한도 2,000만원 이내에 머무는 정도라면 실질과세 논쟁까지 가는 경우는 드뭅니다. 국세청이 문제 삼는 것은 명절 용돈이라는 형식으로 실제로는 목돈을 이전하는 구조입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 증여세가 나온다면 얼마인가요?</h2>
                <p>
                  증여세는 과세표준 구간별로 10%부터 50%까지 5단계 누진세율(상증법 §56)로 계산합니다. 과세표준은 증여재산가액에서 §53 공제 한도를 뺀 금액입니다. 누진공제를 반드시 반영해야 정확한 세액이 나옵니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 증여세 세율표 (상증법 §56, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">누진공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억원 이하</td>
                        <td className="p-3">10%</td>
                        <td className="p-3">0</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1억원 초과 ~ 5억원 이하</td>
                        <td className="p-3">20%</td>
                        <td className="p-3">1,000만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5억원 초과 ~ 10억원 이하</td>
                        <td className="p-3">30%</td>
                        <td className="p-3">6,000만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10억원 초과 ~ 30억원 이하</td>
                        <td className="p-3">40%</td>
                        <td className="p-3">1억 6,000만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30억원 초과</td>
                        <td className="p-3">50%</td>
                        <td className="p-3">4억 6,000만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 성년 자녀가 10년간 6,000만원을 받아 예금에 쌓아둔 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 증여재산가액: 6,000만원 (재산 형성에 사용)
                    <br />
                    · 증여재산공제(성년): 5,000만원 (§53)
                    <br />
                    · 과세표준: 6,000만 - 5,000만 = 1,000만원
                    <br />
                    · 세율(§56): 1억 이하 10%, 누진공제 0
                    <br />
                    · 산출세액: 1,000만 × 10% = <strong>100만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 미성년 자녀가 세뱃돈·용돈 3,000만원을 예금으로 쌓은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 증여재산가액: 3,000만원
                    <br />
                    · 증여재산공제(미성년): 2,000만원 (§53)
                    <br />
                    · 과세표준: 3,000만 - 2,000만 = 1,000만원
                    <br />
                    · 세율(§56): 1억 이하 10%
                    <br />
                    · 산출세액: 1,000만 × 10% = <strong>100만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 성년 자녀에게 1억 5,000만원을 계좌이체한 경우 (경계값)</p>
                  <p className="text-sm text-text-secondary">
                    · 증여재산가액: 1억 5,000만원
                    <br />
                    · 증여재산공제(성년): 5,000만원 (§53)
                    <br />
                    · 과세표준: 1억 5,000만 - 5,000만 = 1억원
                    <br />
                    · 세율(§56): 1억 이하 10%, 누진공제 0
                    <br />
                    · 산출세액: 1억 × 10% = <strong>1,000만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">참고: 과세표준이 1억을 조금이라도 넘으면 20% 구간(누진공제 1,000만)으로 이동합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 이 계산은 재산 형성에 쓰인 순수 증여분에만 적용됩니다. 사회통념 범위의 생활비·용돈은 §46에 따라 증여재산가액에서 아예 빠지므로, 위 계산에 포함시키지 않아도 됩니다. 애매한 경우는 홈택스 증여세 자동계산 또는 세무 전문가의 확인을 받는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가족 관계별 10년 합산 공제 한도를 표로 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준, 누진세율, 산출세액까지 단계별로 알려드립니다.</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 간 차용증 활용법</div>
                    <p className="mt-1 text-sm text-text-secondary">증여로 재분류되지 않도록 차용증을 쓰는 실무 요령.</p>
                  </Link>
                  <Link
                    href="/guide/marriage-childbirth-gift-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">혼인·출산 증여공제 1억원</div>
                    <p className="mt-1 text-sm text-text-secondary">결혼과 출산 자녀에게 추가로 활용할 수 있는 공제.</p>
                  </Link>
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부양가족 인적공제 150만원</div>
                    <p className="mt-1 text-sm text-text-secondary">부모님 부양 시 소득세 절세로 이어지는 공제 요건.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 종합 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 비과세 인정 여부, 증여재산가액 산정, 과세표준과 세액은 개별 사실관계에 따라 달라질 수 있으므로 관할 세무서 또는 홈택스에서 반드시 확인하세요. 특히 자녀 명의 예금·주식·부동산 취득, 큰 금액 이체, 반복적 명목 지원 등은 실질과세 원칙에 따라 증여로 재분류될 수 있습니다. 본 콘텐츠는 2026-08-15를 기준으로 작성되었으며, 세법 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>상속세 및 증여세법 §46(비과세되는 증여재산), 시행령 §35(비과세되는 증여재산의 범위), §53(증여재산공제), §56(증여세 세율), 국세기본법 §14(실질과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국가법령정보센터</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="생활비 용돈 증여세 2026 가이드"
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
