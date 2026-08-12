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

const URL = 'https://calculatorhost.com/guide/startup-fund-gift-tax-special-2026/';
const DATE_PUBLISHED = '2026-08-04';
const DATE_MODIFIED = '2026-08-04';

export const metadata: Metadata = {
  title: '창업자금 증여세 과세특례 2026, 5억 공제·10% 세율 조건',
  description:
    '부모 도움으로 창업하는 자녀에게 증여세 부담을 줄여주는 제도가 창업자금 증여세 과세특례입니다. 60세 이상 부모가 18세 이상 자녀에게 창업자금을 주면 5억원을 공제하고 10% 세율로 과세합니다. 한도, 창업 기한, 사후관리를 조세특례제한법 §30의5 기준으로 정리했습니다.',
  keywords: [
    '창업자금 증여세 과세특례',
    '창업자금 5억 공제',
    '자녀 창업 증여세',
    '창업 증여 10% 세율',
    '증여세 창업 특례 조건',
    '창업자금 사후관리',
    '조세특례제한법 30조의5',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '창업자금 증여세 과세특례 2026' }],
    title: '창업자금 증여세 과세특례 2026, 5억 공제·10% 세율 조건',
    description: '60세 이상 부모가 18세 이상 자녀 창업자금을 증여하면 5억 공제 후 10% 세율. 한도·창업기한·사후관리를 조특법 §30의5 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '창업자금 증여세 과세특례 2026, 5억 공제·10% 세율',
    description: '창업하는 자녀에게 최대 5억 공제 후 10% 저율 과세. 2년 내 창업·사후관리 필수. 조세특례제한법 §30의5.',
  },
};

const FAQ_ITEMS = [
  {
    question: '창업자금 증여세 과세특례가 무엇인가요?',
    answer:
      '창업하는 자녀에게 부모가 준 창업자금에 대해 증여세를 크게 낮춰주는 제도입니다(조세특례제한법 §30의5). 60세 이상 부모가 18세 이상 자녀에게 창업자금을 증여하면, 증여세 과세가액에서 5억원을 공제한 뒤 남은 금액에 10% 단일세율로 과세합니다. 일반 증여세율이 최고 50%까지 올라가는 것과 비교하면 세 부담이 크게 줄어듭니다.',
  },
  {
    question: '공제 한도와 세율은 어떻게 되나요?',
    answer:
      '5억원을 공제하고 초과분에 10% 세율을 적용합니다. 창업자금은 50억원까지 이 특례를 받을 수 있고, 창업으로 10명 이상을 신규 고용하면 한도가 100억원으로 늘어납니다. 예를 들어 10억원을 증여받으면 (10억 - 5억) × 10% = 5천만원의 증여세만 부담합니다.',
  },
  {
    question: '누가 증여해야 하고 누가 받을 수 있나요?',
    answer:
      '증여자는 60세 이상 부모(부모가 사망한 경우 조부모)이고, 수증자는 18세 이상 거주자인 자녀입니다. 자녀는 증여받은 창업자금으로 실제 사업을 창업해야 하며, 단순히 돈을 받아 보유만 해서는 특례를 적용받을 수 없습니다.',
  },
  {
    question: '어떤 업종이어야 특례 대상인가요?',
    answer:
      '조세특례제한법이 정한 중소기업 업종이어야 합니다. 제조업, 건설업, 음식점업, 정보통신업, 물류산업 등이 포함됩니다. 반대로 부동산임대업, 변호사·세무사 같은 전문 자격사업, 오락장 등 사행성 업종은 대상에서 제외됩니다. 대상 업종은 세부 목록이 있으므로 창업 전 국세청 안내로 확인해야 합니다.',
  },
  {
    question: '언제까지 창업해야 하나요?',
    answer:
      '증여받은 날부터 2년 이내에 창업해야 합니다. 또한 증여받은 창업자금은 4년 이내에 해당 목적(사업용 자산 취득, 사업장 임차 등)에 사용해야 합니다. 이 기한을 지키지 못하면 특례가 취소되고 일반 증여세와 이자 상당액이 추징될 수 있습니다.',
  },
  {
    question: '신청은 어떻게 하나요?',
    answer:
      '증여세 신고기한까지 과세표준신고서와 함께 창업자금 특례신청서 및 사용내역서를 관할 세무서에 제출해야 합니다. 신고기한까지 신청하지 않으면 특례를 적용받을 수 없습니다. 즉 이 특례는 자동 적용이 아니라 반드시 기한 내 신청해야 하는 제도입니다.',
  },
  {
    question: '나중에 상속이 생기면 어떻게 되나요?',
    answer:
      '증여자가 사망하면 창업자금은 증여 시기와 관계없이 상속세 과세가액에 합산됩니다. 일반 사전증여는 10년(상속인 기준) 안의 것만 합산되지만, 이 특례를 받은 창업자금은 기간 제한 없이 합산되는 점이 다릅니다. 따라서 상속까지 내다본 종합적인 판단이 필요합니다.',
  },
  {
    question: '가업승계 증여특례와 함께 받을 수 있나요?',
    answer:
      '동일한 재산에 대해 창업자금 특례와 가업승계 주식 특례를 중복 적용할 수는 없습니다. 두 제도는 목적과 요건이 다르므로, 자녀가 새로 사업을 시작하는지(창업자금) 부모 사업을 물려받는지(가업승계)에 따라 유리한 쪽을 선택해야 합니다. 선택 전 세무 전문가 상담을 권합니다.',
  },
  {
    question: '특례를 받으면 무조건 유리한가요?',
    answer:
      '항상 그렇지는 않습니다. 창업에 실패하거나 사후관리 요건을 어기면 추징 위험이 있고, 상속 시 전액 합산되는 부담도 있습니다. 증여 규모가 작아 일반 증여재산공제(성년 자녀 5천만원)로 충분하거나 창업 계획이 불확실하다면 특례가 오히려 불리할 수 있으므로, 규모와 사업 계획을 함께 따져야 합니다.',
  },
];

export default function StartupFundGiftTaxSpecial2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '창업자금 증여세 과세특례 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '창업자금 증여세 과세특례 2026, 5억 공제와 10% 세율 조건',
    description:
      '60세 이상 부모가 18세 이상 자녀에게 창업자금을 증여할 때 5억 공제 후 10% 세율로 과세하는 특례. 한도, 대상 업종, 창업 기한, 신청, 사후관리와 상속 합산까지 조세특례제한법 §30의5 기준 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['창업자금', '증여세', '과세특례', '5억 공제', '조세특례제한법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '창업자금 증여세 과세특례 2026',
    description: '창업 자녀에게 증여하는 창업자금의 5억 공제·10% 세율 특례 요건과 사후관리를 정리한 가이드.',
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
                    { name: '창업자금 증여세 과세특례 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">창업 자녀·증여 부모 · 8분 읽기 · 2026-08-04</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  창업자금 증여세 과세특례 2026
                  <br />
                  <span className="text-2xl text-text-secondary">5억 공제와 10% 세율 조건</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 부모 도움으로 사업을 시작하려는 창업 자녀와, 자녀의 창업을 돕고 싶은 부모를 위해 씁니다. 큰돈을 그냥 증여하면 증여세율이 최고 50%까지 올라가지만, 창업자금 증여세 과세특례를 쓰면 5억원을 공제하고 남은 금액에 10% 저율로만 과세합니다. 대신 창업 기한과 사후관리, 상속 시 합산이라는 조건이 따라붙습니다. 혜택과 조건을 함께 짚어보겠습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">창업자금 증여세 과세특례란</h2>
                <p>
                  창업하는 자녀에게 준 증여자금의 세금을 크게 낮춰주는 제도입니다. 조세특례제한법 §30의5에 따라, 60세 이상 부모가 18세 이상 자녀에게 창업자금을 증여하면 증여세 과세가액에서 5억원을 공제하고 남은 금액에 10% 세율을 적용합니다. 창업으로 일자리를 만드는 청년 창업을 지원하려는 취지입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>증여자: 60세 이상 부모(사망 시 조부모)</li>
                    <li>수증자: 18세 이상 거주자 자녀</li>
                    <li>공제 5억원 후 10% 단일세율</li>
                    <li>한도 50억원(10명 이상 신규고용 시 100억원)</li>
                    <li>2년 내 창업, 신고기한 내 신청 필수</li>
                    <li>근거: 조세특례제한법 §30의5</li>
                  </ul>
                </div>
                <p>
                  다만 이 특례는 자동으로 적용되지 않습니다. 증여세 신고기한까지 특례신청서를 내야 하고, 이후 창업과 사용, 사후관리 요건을 모두 지켜야 유지됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금이 얼마나 줄어드나요?</h2>
                <p>
                  일반 증여세와 비교하면 차이가 큽니다. 성년 자녀 증여재산공제(5천만원)만 적용하는 일반 증여와, 창업자금 특례를 적용하는 경우를 같은 금액으로 비교해 보겠습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 10억 증여 시 일반 증여 vs 창업자금 특례 (개요 비교)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 증여</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">창업자금 특례</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제</td>
                        <td className="p-3">5천만원(성년 자녀)</td>
                        <td className="p-3">5억원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">세율</td>
                        <td className="p-3">누진 10~50%</td>
                        <td className="p-3">10% 단일</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과세표준</td>
                        <td className="p-3">9.5억</td>
                        <td className="p-3">5억</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">개략 세액</td>
                        <td className="p-3">2억원대(누진 적용)</td>
                        <td className="p-3">5천만원(5억 × 10%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 일반 증여의 개략 세액은 증여세 누진세율(1억 이하 10%, 5억 이하 20%, 10억 이하 30% 등)과 누진공제를 반영한 근사치이며, 실제 세액은 신고세액공제 등에 따라 달라집니다. 정확한 금액은 홈택스 증여세 모의계산으로 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 받을 수 있고 어떤 업종이어야 하나요?</h2>
                <p>
                  60세 이상 부모에서 18세 이상 자녀로, 중소기업 업종 창업이 조건입니다. 증여자와 수증자의 나이 요건을 먼저 갖춰야 하고, 자녀가 증여받은 돈으로 조세특례제한법이 정한 중소기업을 실제로 창업해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>대상 업종:</strong> 제조업, 건설업, 음식점업, 정보통신업, 물류산업 등 중소기업 업종.</li>
                  <li><strong>제외 업종:</strong> 부동산임대업, 변호사·세무사 등 전문 자격사업, 오락장 등 사행성 업종.</li>
                  <li><strong>실제 창업:</strong> 기존 사업 인수·법인전환 등 창업으로 보지 않는 경우는 제외.</li>
                </ul>
                <p>
                  예외: 업종 판단은 세부 분류에 따라 갈리고, 같은 사업이라도 형태에 따라 창업 인정 여부가 달라집니다. 창업 계획 단계에서 국세청 안내나 세무 전문가로 대상 여부를 먼저 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">창업 기한과 사후관리는 어떻게 되나요?</h2>
                <p>
                  2년 내 창업, 4년 내 사용, 이후 유지가 핵심입니다. 특례는 받는 순간 끝이 아니라 정해진 기한과 사후관리를 지켜야 유지됩니다. 요건을 어기면 감면받은 세액과 이자 상당액이 추징됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 창업자금 특례 사후관리 요건 (개요)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기한·내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">위반 시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">창업</td>
                        <td className="p-3">증여일부터 2년 이내</td>
                        <td className="p-3">특례 취소·추징</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">자금 사용</td>
                        <td className="p-3">4년 이내 목적 사용</td>
                        <td className="p-3">미사용분 추징</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신청</td>
                        <td className="p-3">증여세 신고기한 내</td>
                        <td className="p-3">특례 적용 불가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">상속 합산</td>
                        <td className="p-3">기간 무관 상속가액 합산</td>
                        <td className="p-3">상속세 재정산</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 위 요건은 개요이며 폐업·업종 변경 등 세부 사후관리 사유가 더 있습니다. 창업 후에도 사용내역서 관리와 요건 유지가 필요하므로 장부와 증빙을 꼼꼼히 남기세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">창업자금 특례가 항상 유리한가요?</h2>
                <p>
                  규모와 계획에 따라 다릅니다. 큰 자금을 창업에 확실히 투입할 계획이면 세 부담이 크게 줄어 유리하지만, 다음 경우에는 다시 따져봐야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>소액 증여:</strong> 증여액이 작으면 일반 증여재산공제(성년 5천만원)로 충분해 특례 이점이 작습니다.</li>
                  <li><strong>창업 불확실:</strong> 계획이 불투명하면 2년 창업·4년 사용 요건을 못 지켜 추징될 위험이 있습니다.</li>
                  <li><strong>상속 예정:</strong> 상속 시 전액 합산되므로 상속세까지 함께 계산해야 합니다.</li>
                </ul>
                <p>
                  다만 이런 판단은 가족의 자산 구조와 사업 계획에 따라 정반대가 될 수 있으므로, 세무 전문가와 상담 후 결정하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/gift-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여액을 넣어 증여세를 시뮬레이션하세요.</p>
                  </Link>
                  <Link href="/guide/gift-tax-exemption-limit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">증여재산공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자·자녀별 10년 합산 공제 한도.</p>
                  </Link>
                  <Link href="/guide/marriage-childbirth-gift-deduction-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">혼인·출산 증여공제 1억</div>
                    <p className="mt-1 text-sm text-text-secondary">결혼·출산 시 추가 1억 공제 활용법.</p>
                  </Link>
                  <Link href="/guide/family-business-inheritance-deduction-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">가업상속공제</div>
                    <p className="mt-1 text-sm text-text-secondary">부모 사업 승계 시 상속세 공제 제도.</p>
                  </Link>
                  <Link href="/guide/inheritance-tax-10-year-prior-gift-aggregation/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">사전증여 10년 합산</div>
                    <p className="mt-1 text-sm text-text-secondary">상속 전 증여가 상속세에 합산되는 원리.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여세·상속세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 대상 업종, 창업 인정 여부, 사후관리 위반 판단은 개별 사실관계에 따라 달라지고, 상속 합산까지 함께 고려해야 합니다. 실제 적용과 세액은 반드시 관할 세무서, 국세청 상담(126), 홈택스 증여세 모의계산으로 확인하세요. 본 콘텐츠는 2026-08-04 기준이며 관련 법령은 <strong>조세특례제한법 §30의5</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 창업자금 과세특례 안내</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 증여세 모의계산</a>.
                </p>
              </section>

              <ShareButtons title="창업자금 증여세 과세특례 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
