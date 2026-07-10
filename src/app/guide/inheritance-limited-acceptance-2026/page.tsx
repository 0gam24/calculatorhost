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

const URL = 'https://calculatorhost.com/guide/inheritance-limited-acceptance-2026/';
const DATE_PUBLISHED = '2026-07-10';
const DATE_MODIFIED = '2026-07-10';

export const metadata: Metadata = {
  title: '상속 한정승인·상속포기 2026 | 빚 초과 시 3개월 내 신고',
  description:
    '상속채무가 재산을 초과할 때 선택하는 한정승인·상속포기. 민법 §1019 기한(3개월), 차이점, 신고 절차, 함정 사례까지 완전 정리.',
  keywords: [
    '상속 한정승인',
    '상속포기',
    '상속채무',
    '민법 1019조',
    '상속 3개월',
    '상속 절차',
    '빚 초과 상속',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속 한정승인·상속포기 2026 | 빚 초과 시 3개월 내 신고' }],
    title: '상속 한정승인·상속포기 2026 — 채무 초과 시 선택 기준과 3개월 기한',
    description: '피상속인 채무가 상속재산을 초과할 때 한정승인으로 빚 한도를 제한하거나 상속포기로 상속 자체를 포기할 수 있습니다. 민법 정확한 절차와 판단 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속 한정승인·상속포기 2026 — 채무 초과 상황의 정확한 선택',
    description: '상속채무가 상속재산보다 클 때 한정승인 또는 상속포기로 대응. 민법 §1019 3개월 기한과 신고 절차.',
  },
};

const FAQ_ITEMS = [
  {
    question: '한정승인과 상속포기의 근본적인 차이가 무엇인가요?',
    answer:
      '한정승인(민법 §1028)은 상속받은 재산 한도 내에서만 피상속인의 채무를 변제하겠다는 의사 표시입니다. 즉, 빚이 재산을 초과해도 받은 재산 범위 내에서만 갚으면 됩니다. 반면 상속포기(민법 §1041)는 상속 자체를 거부하는 것으로, 재산도 받지 않고 빚도 지지 않습니다. 한정승인은 "빚을 제한적으로 진다", 상속포기는 "상속을 완전히 거부한다"는 차이입니다.',
  },
  {
    question: '상속 사실을 안 날부터 3개월은 어떻게 계산하나요?',
    answer:
      '민법 §1019에 따라 "상속개시(피상속인의 사망) 있음을 안 날부터 3개월" 이내에 단순승인·한정승인·상속포기 중 선택해야 합니다(민법 §1026). 사망 통지를 받은 날을 기준으로 계산되며, 3개월 만료 직전에 가정법원에 신고하면 됩니다. 예를 들어 1월 15일 사망 통지를 받으면 4월 15일이 기한입니다.',
  },
  {
    question: '한정승인을 하려면 어떤 절차를 거쳐야 하나요?',
    answer:
      '한정승인은 민법 §1030에 따라 가정법원에 신고(신청 아님)해야 합니다. 신고 시 피상속인의 재산목록을 첨부해야 하는데, 만약 재산 규모가 확실하지 않다면 "재산목록 작성 전에 한정승인 신고"를 먼저 하고 나중에 재산목록을 제출할 수 있습니다(§1030 단서). 신고는 관할 가정법원(피상속인 주소지)에 하면 됩니다.',
  },
  {
    question: '상속포기를 선택하면 후순위 상속인에게 어떤 영향이 생기나요?',
    answer:
      '상속포기는 그 상속분이 자동으로 후순위 상속인(손자녀 등)에게 넘어갑니다. 예를 들어 자녀가 모두 포기하면 손자녀가 상속을 받아야 하는데, 그들도 채무를 부담하게 됩니다. 따라서 피상속인의 빚이 전체 상속재산을 초과한다면, 후순위까지 함께 포기해야 상속 사슬을 끝낼 수 있습니다.',
  },
  {
    question: '상속재산을 처분하면 어떻게 되나요?',
    answer:
      '민법 §1026에 따라 상속받은 재산을 처분·은닉·소비하면 단순승인한 것으로 간주됩니다. 이 경우 한정승인이나 상속포기를 할 수 없게 되어, 채무가 재산을 초과해도 전부 책임져야 합니다. 따라서 상속포기나 한정승인을 고려 중이라면 상속재산에 손을 대지 않는 것이 중요합니다.',
  },
  {
    question: '3개월이 지나 채무 초과를 발견했다면?',
    answer:
      '민법 §1019③ "특별한정승인" 규정에 따라, 3개월 이내에 단순승인했더라도 상속채무가 상속재산을 초과하는 사실을 중대한 과실 없이 그 후에 발견한 경우, 그 사실을 안 날부터 3개월 내에 한정승인을 신고할 수 있습니다. 따라서 나중에 큰 빚이 발견되었다면 법원에 상황을 설명하고 특별한정승인 신청을 검토해볼 수 있습니다.',
  },
  {
    question: '상속포기는 누가 신고해야 하나요?',
    answer:
      '상속포기는 상속인 본인이 직접 또는 변호사·법무사를 통해 관할 가정법원에 신고(신청)해야 합니다(민법 §1041). 상속인 미성년자는 법정대리인(부모)이 신고합니다. 신고 시 상속 관계를 증명하는 서류(가족관계증명서, 피상속인 사망기록 등)가 필요합니다.',
  },
  {
    question: '배우자가 한정승인했는데 자녀들이 포기해도 괜찮을까요?',
    answer:
      '네, 배우자와 자녀의 상속 처리는 독립적입니다. 배우자가 한정승인을 하면 자신의 상속분에 대해서만 빚을 제한적으로 지고, 자녀들이 포기하면 그들의 상속분은 상속 사슬에서 빠집니다. 다만 전체 상속재산 규모를 고려해서 누가 어떤 선택을 할지 가족이 함께 상의하는 것이 좋습니다.',
  },
];

export default function InheritanceLimitedAcceptance2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속 한정승인·상속포기 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속 한정승인·상속포기 2026 — 채무 초과 시 선택 기준과 3개월 기한',
    description:
      '피상속인 채무가 상속재산을 초과할 때의 정확한 대응. 민법 §1019 기한, 한정승인 vs 상속포기 차이, 신고 절차, 함정 사례 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속', '한정승인', '상속포기', '상속채무', '민법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속 한정승인·상속포기 2026',
    description:
      '상속채무 초과 시 한정승인·상속포기의 정확한 선택 기준과 민법 절차.',
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
                    { name: '상속 한정승인·상속포기 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인 · 12분 읽기 · 2026-07-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속 한정승인·상속포기 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 채무 초과 시 3개월 내 선택 절차</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모가 남긴 빚이 재산보다 많을 때는 어떻게 할까요? 민법은 상속인을 무조건 보호하지 않지만, 한정승인과 상속포기라는 두 가지 길을 열어두었습니다. 이 가이드는 상속채무 초과 시 피상속인 사망을 안 날부터 3개월 이내에 선택해야 하는 한정승인·상속포기의 정확한 차이점, 신고 절차, 그리고 놓치기 쉬운 함정까지 완벽히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-inheritance-limited-acceptance-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한정승인과 상속포기의 차이</h2>
                <p>
                  상속개시(피상속인 사망) 사실을 안 날부터 3개월 이내에 상속인은 단순승인, 한정승인, 상속포기 중 하나를 선택해야 합니다(민법 §1019). 특히 채무가 재산을 초과할 때는 이 선택이 매우 중요합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 한정승인 vs 상속포기 vs 단순승인 비교 (민법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">한정승인</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속포기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단순승인</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">재산 취득</td>
                        <td className="p-3">O (제한적)</td>
                        <td className="p-3">X</td>
                        <td className="p-3">O (무제한)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">채무 책임</td>
                        <td className="p-3">재산 범위 내</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">무제한</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">근거 조항</td>
                        <td className="p-3">§1028, §1030</td>
                        <td className="p-3">§1041</td>
                        <td className="p-3">§1023</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">신고 필수</td>
                        <td className="p-3">Yes (가정법원)</td>
                        <td className="p-3">Yes (가정법원)</td>
                        <td className="p-3">No (자동 확정)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">기한</td>
                        <td className="p-3">3개월 내</td>
                        <td className="p-3">3개월 내</td>
                        <td className="p-3">기한 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  채무가 재산을 초과하는 상황에서는 한정승인과 상속포기 중 택일해야 합니다. 한정승인은 "일단 상속받되, 받은 재산 범위 내에서만 빚을 진다"는 선택이고, 상속포기는 "상속 자체를 거부한다"는 완전 거부입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 3개월 동안 아무것도 하지 않으면 자동으로 단순승인(민법 §1026 "법정단순승인")이 되어 채무를 무제한 책임져야 합니다. 따라서 채무 상황이 불명확할 때는 반드시 법원에 신고해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한정승인이란? 채무 한도 제한 방법</h2>
                <p>
                  한정승인(民法 §1028)은 상속인이 상속받은 재산의 한도 내에서만 피상속인의 채무와 유증(유언으로 남긴 재산)을 변제하겠다는 의사 표시입니다. 쉽게 말해, 부모 빚이 5억 원이지만 상속재산이 2억 원뿐이면, 2억 원만 빚에 충당하고 나머지 3억 원은 책임지지 않는다는 뜻입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한정승인의 핵심</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    상속받은 재산 금액까지만 채무를 부담하고, 그 이상의 빚은 거부할 수 있습니다. 이는 상속인이 무제한 책임을 지는 단순승인과 달리, 자신의 고정자산을 지키면서도 상속을 받는 방법입니다. (민법 §1028, §1030)
                  </p>
                </div>
                <h3 className="mt-6 text-lg font-semibold">한정승인 신고 절차</h3>
                <p>
                  한정승인은 자동 확정되지 않으며, 반드시 가정법원에 신고해야 합니다(민법 §1030). 신고하지 않으면 3개월 경과 후 자동으로 단순승인(무제한 책임)이 되므로 주의해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>신고 기한:</strong> 상속개시 사실을 안 날부터 3개월 이내 (민법 §1019)
                  </li>
                  <li>
                    <strong>신고처:</strong> 피상속인(부모) 주소지를 관할하는 가정법원
                  </li>
                  <li>
                    <strong>첨부서류:</strong> 피상속인 사망기록, 상속인 신분증, 재산목록(있으면 첨부, §1030 단서로 나중에 제출 가능)
                  </li>
                  <li>
                    <strong>재산 불확실:</strong> 재산 규모가 명확하지 않으면 "재산목록 작성 전에 한정승인 신고"를 먼저 하고, 그 후 시간을 두고 상세히 조사할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 한정승인 신고 후에도 상속재산을 소극적으로 처분(예: 청소비 지출)할 수 없습니다. 상속재산 건축, 수리, 기본 관리만 허용되며, 나머지는 채권자 목록 공시와 재산 공고를 통해 절차적으로 진행되어야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속포기란? 상속 자체를 거부</h2>
                <p>
                  상속포기(民法 §1041)는 상속인이 상속권을 포기하여 상속재산도 받지 않고 채무도 지지 않는 선택입니다. 한정승인과 달리, 상속과의 모든 관계를 끊겠다는 의사 표시입니다. 채무가 재산보다 훨씬 크거나, 상속과 무관하게 지내고 싶을 때 선택할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">상속포기의 핵심</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    상속인이 상속을 거부함으로써 법적으로 상속받지 않은 사람으로 취급됩니다. 따라서 채무도 없지만 재산도 받지 못합니다. 그 상속분은 다음 순위 상속인(손자녀, 형제자매 등)에게 넘어갑니다. (민법 §1041, §1042)
                  </p>
                </div>
                <h3 className="mt-6 text-lg font-semibold">상속포기 신고 절차</h3>
                <p>
                  상속포기도 반드시 가정법원에 신고해야 하며, 기한은 한정승인과 같이 3개월입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>신고 기한:</strong> 상속개시 사실을 안 날부터 3개월 이내 (민법 §1019)
                  </li>
                  <li>
                    <strong>신고처:</strong> 피상속인 주소지를 관할하는 가정법원
                  </li>
                  <li>
                    <strong>신고인:</strong> 상속인 본인 (미성년자는 법정대리인 대리)
                  </li>
                  <li>
                    <strong>방법:</strong> 변호사·법무사 위임 또는 직접 신청 가능
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 상속포기를 하면 채무도 없지만 재산도 받을 수 없으며, 그 상속분은 후순위 상속인에게 넘어갑니다. 예를 들어 자녀 3명이 모두 포기하면, 손자녀나 형제자매(피상속인의 형제)가 상속을 받아야 하고, 그들도 채무를 부담하게 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 사례로 보는 한정승인과 상속포기</h2>
                <p>
                  다음 3가지 사례를 통해 어떤 상황에서 어떤 선택을 해야 하는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 채무 5억, 재산 3억 (한정승인 고려)</p>
                  <p className="text-sm text-text-secondary">
                    부모가 남긴 빚 5억 원, 상속재산(주택, 예금) 3억 원
                    <br />
                    · 단순승인: 자녀가 빚 5억을 모두 책임 (개인자산 2억 손실)
                    <br />
                    · 한정승인: 상속재산 3억으로만 빚을 변제, 나머지 2억 채무는 면책
                    <br />
                    · 상속포기: 재산도 받지 않고 채무도 없음 (대신 형제자매나 손자녀에게 상속분 이양)
                    <br />
                    <span className="text-xs text-text-tertiary">
                      결론: 재산이 어느 정도 있고 채무도 명확하면 한정승인이 상속받으면서 피해를 최소화합니다.
                    </span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 채무만 10억, 재산 0 (상속포기 필수)</p>
                  <p className="text-sm text-text-secondary">
                    부모가 빌린 돈만 10억 원, 상속재산은 거의 없음
                    <br />
                    · 단순승인: 자녀가 10억 채무를 모두 책임 (개인 파산 위험)
                    <br />
                    · 한정승인: 상속재산이 없으므로 채무자 입장에서 의미 없음
                    <br />
                    · 상속포기: 상속을 완전히 거부하므로 채무 책임 없음
                    <br />
                    <span className="text-xs text-text-tertiary">
                      결론: 빚만 많고 재산이 없다면 상속포기로 모든 책임에서 해방됩니다.
                    </span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 배우자 한정승인 + 자녀 포기 (가족 전략)</p>
                  <p className="text-sm text-text-secondary">
                    배우자와 자녀 2명 상속인, 재산 2억, 채무 3억
                    <br />
                    · 배우자 한정승인: 배우자 지분(1/2) 1억으로 빚 일부 변제, 나머지는 면책
                    <br />
                    · 자녀들 포기: 자녀들은 채무 책임 없음 (다만 배우자 지분에서 채무 우선 충당)
                    <br />
                    <span className="text-xs text-text-tertiary">
                      결론: 배우자만 한정승인으로 지분만큼 책임지고, 자녀들이 포기하면 가족 중 누구도 무제한 책임을 지지 않을 수 있습니다.
                    </span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3개월 기한과 법정단순승인</h2>
                <p>
                  민법 §1019는 "상속개시 있음을 안 날부터 3개월 이내에" 한정승인이나 상속포기를 신고하도록 규정합니다. 이 기간이 지나 아무것도 하지 않으면 법정단순승인(민법 §1026)이 자동 확정되어 채무를 무제한 책임져야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">3개월 기한의 기산점</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    "상속개시(피상속인 사망) 있음을 안 날"부터 시작합니다. 보통 사망 통지를 받은 날이지만, 상속인이 사망 사실을 뒤늦게 알게 되면 그 날부터 계산됩니다. 예를 들어 1월 15일 사망 통지 → 4월 15일 기한입니다. 기한 만료 직전에 가정법원에 신고하거나 우편으로 접수하면 유효합니다. (민법 §1019)
                  </p>
                </div>
                <h3 className="mt-6 text-lg font-semibold">법정단순승인의 위험</h3>
                <p>
                  기한 내에 신고하지 않으면:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>자동으로 단순승인으로 간주됨</li>
                  <li>이후 한정승인이나 상속포기 신고 불가</li>
                  <li>채무가 재산보다 많아도 모두 책임져야 함</li>
                  <li>채무자 추심, 소송 당면 가능</li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 민법 §1019③ "특별한정승인" 규정에 따라, 3개월 내 단순승인했더라도 나중에 상속채무가 상속재산을 초과하는 사실을 중대한 과실 없이 발견한 경우, 그 사실을 안 날부터 다시 3개월 내에 한정승인을 신고할 수 있습니다. 이 경우 법원에 정황을 설명하고 특별한정승인 신청을 하면 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속재산 처분 시 주의 — 자동 단순승인</h2>
                <p>
                  민법 §1026 "법정단순승인"에 따르면, 상속인이 상속받은 재산을 처분·은닉·소비하면 단순승인한 것으로 간주됩니다. 이 경우 이미 한정승인이나 상속포기를 신고했더라도 효력이 없어질 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">상속재산 처분에 해당하는 행위</p>
                  <p className="text-sm text-text-secondary">
                    · 주택 팔기, 예금 인출, 자동차 팔기
                    <br />
                    · 부채 감추기 (상속재산 은닉)
                    <br />
                    · 물품 소비 (고가 물품 사용·판매)
                    <br />
                    · 부모님 능력 외 구매나 투자
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">허용되는 행위 (기본 관리)</p>
                  <p className="text-sm text-text-secondary">
                    · 장례비, 납골당 비용 지출
                    <br />
                    · 상속재산 집 청소, 난방비 등 기본 유지비
                    <br />
                    · 빚 채권자 확인, 재산 조사 비용
                  </p>
                </div>
                <p className="mt-4">
                  따라서 한정승인이나 상속포기를 고려 중이라면, 상속재산에 손을 대지 않거나 매우 신중하게 접근해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-inheritance-limited-acceptance-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">후순위 상속인의 책임 — 포기의 연쇄 효과</h2>
                <p>
                  상속포기 시 그 상속분은 자동으로 후순위 상속인(손자녀, 형제자매 등)에게 넘어갑니다. 피상속인의 빚이 전체 상속재산을 크게 초과한다면, 후순위까지 함께 포기해야 상속 사슬을 끝낼 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">상속 순위</p>
                  <p className="text-sm text-text-secondary">
                    1순위: 자녀 (배우자와 함께)
                    <br />
                    2순위: 부모님
                    <br />
                    3순위: 형제자매 (배우자와 함께)
                    <br />
                    <br />
                    예: 자녀 3명이 모두 상속포기 → 손자녀가 상속 (그 손자녀도 빚을 부담 가능)
                  </p>
                </div>
                <p className="mt-4">
                  따라서 상속포기 결정 전에 가족 회의를 통해 누가 어떤 선택을 할지 미리 상의하는 것이 중요합니다. 한 사람이 포기하면 다른 사람이 그 몫을 상속받게 되므로, 전체 상황을 고려해서 대응해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속 재산액에 따른 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">누진세율, 공제액, 신고 기한까지 완전 정리.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-deduction-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 공제 한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자공제, 자녀공제, 기초공제 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 vs 증여세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">상속과 증여의 세액 차이와 전략.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-10-year-prior-gift-aggregation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 10년 기부 합산</div>
                    <p className="mt-1 text-sm text-text-secondary">사망 전 10년간 증여세와 상속세 연동.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·종부세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법적 조언이 아닙니다. 상속 한정승인과 상속포기는 개별 사정에 따라 매우 복잡할 수 있으므로, 결정 전에 반드시 가정법원 또는 변호사·법무사와 상담하세요. 특히 채무 규모가 불명확하거나 후순위 상속인이 있다면 전문가 조언이 필수입니다. 본 콘텐츠는 2026-07-10을 기준으로 작성되었으며, 민법 개정 시 즉시 업데이트됩니다. 한정승인과 상속포기의 정확한 기준은 법조항 <strong>민법 §1019(승인 또는 포기의 기한), §1028(한정승인의 효과), §1030(한정승인의 신고), §1041(상속의 포기), §1026(법정단순승인)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.scourt.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대법원 전자민원</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기 쉬운 생활법령 정보</a>.
                </p>
              </section>

              <ShareButtons
                title="상속 한정승인·상속포기 2026 가이드"
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
