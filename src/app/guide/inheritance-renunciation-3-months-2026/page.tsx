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

const URL = 'https://calculatorhost.com/guide/inheritance-renunciation-3-months-2026/';
const DATE_PUBLISHED = '2026-08-10';
const DATE_MODIFIED = '2026-08-10';

export const metadata: Metadata = {
  title: '상속포기 2026, 기한 3개월과 빚 상속 막는 법',
  description:
    '부모가 빚만 남기고 돌아가셨다면 상속개시를 안 날부터 3개월 안에 가정법원에 상속포기를 신고해야 합니다. 기한, 한정승인과의 차이, 후순위로 빚이 넘어가는 함정, 3개월이 지났을 때 쓰는 특별한정승인까지 민법 조문으로 정리했습니다.',
  keywords: [
    '상속포기',
    '상속포기 기한',
    '상속포기 한정승인 차이',
    '상속포기 방법',
    '빚 상속 포기',
    '특별한정승인',
    '민법 1019조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속포기 2026, 기한 3개월과 빚 상속 막는 법' }],
    title: '상속포기 2026, 기한 3개월과 채무 상속 차단',
    description: '상속개시를 안 날부터 3개월. 상속포기 기한과 한정승인 차이, 후순위 승계 함정까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속포기 2026, 기한 3개월과 빚 상속 차단',
    description: '민법 §1019 3개월 기한, 한정승인과의 차이, 특별한정승인까지.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상속포기는 언제까지 해야 하나요?',
    answer:
      '상속개시가 있음을 안 날부터 3개월 이내입니다(민법 §1019①). 여기서 "안 날"은 단순히 사망한 날이 아니라, 사망 사실과 그로 인해 자신이 상속인이 되었다는 사실을 모두 안 날을 말합니다. 이 3개월을 숙려기간이라 하며, 기간을 넘기면 원칙적으로 단순승인한 것으로 보아 빚까지 그대로 물려받게 됩니다.',
  },
  {
    question: '상속포기와 한정승인은 무엇이 다른가요?',
    answer:
      '상속포기는 상속인 지위 자체를 버려 재산과 빚을 모두 받지 않는 것이고, 한정승인은 상속받은 재산 범위 안에서만 빚을 갚는 것입니다. 빚이 재산보다 확실히 많으면 상속포기가 간단하지만, 재산과 빚 규모가 불확실하면 한정승인이 안전합니다. 다만 상속포기는 다음 순위 상속인에게 빚이 넘어가므로 가족 전체를 고려해야 합니다.',
  },
  {
    question: '상속포기하면 부모님 빚을 안 갚아도 되나요?',
    answer:
      '네, 상속포기가 수리되면 처음부터 상속인이 아니었던 것으로 소급 적용됩니다(민법 §1042). 따라서 피상속인의 채무를 갚을 의무가 사라집니다. 다만 포기 전에 상속재산을 처분하거나 소비하면 단순승인으로 간주되어 포기가 무효가 될 수 있으니 주의해야 합니다.',
  },
  {
    question: '제가 상속포기하면 자녀나 형제에게 빚이 넘어가나요?',
    answer:
      '넘어갈 수 있습니다. 선순위 상속인이 포기하면 상속권이 다음 순위로 이동합니다. 예를 들어 자녀 전원이 포기하면 손자녀에게, 그다음 피상속인의 부모, 형제자매 순으로 채무가 승계됩니다. 빚만 있는 상속이라면 배우자와 직계비속, 그 아래 순위까지 함께 포기하거나, 상속인 중 한 명이 한정승인을 하는 방식으로 채무 승계를 끊어야 합니다.',
  },
  {
    question: '상속포기 신청 방법과 필요한 서류는 무엇인가요?',
    answer:
      '피상속인의 마지막 주소지를 관할하는 가정법원에 상속포기 심판청구서를 제출합니다(민법 §1041). 보통 청구서, 청구인의 가족관계증명서와 주민등록등본, 피상속인의 기본증명서와 가족관계증명서, 말소자 주민등록초본이 필요합니다. 법원별로 요구 서류가 다를 수 있으니 관할 가정법원이나 대법원 전자소송에서 확인하세요.',
  },
  {
    question: '3개월이 이미 지났는데 뒤늦게 빚을 알았습니다. 방법이 없나요?',
    answer:
      '특별한정승인 제도가 있습니다(민법 §1019③). 상속채무가 상속재산을 초과한다는 사실을 중대한 과실 없이 3개월 안에 알지 못했다면, 그 사실을 안 날부터 3개월 이내에 한정승인을 신고할 수 있습니다. 다만 "중대한 과실이 없었다"는 점을 소명해야 하므로, 채무를 알게 된 경위와 시점을 입증할 자료를 준비하는 것이 좋습니다.',
  },
  {
    question: '미성년 자녀도 상속포기를 해야 하나요?',
    answer:
      '자녀가 상속인이라면 미성년자도 포기 대상입니다. 다만 미성년자는 스스로 신고할 수 없어 친권자 등 법정대리인이 대신 신고합니다. 부모가 포기하면 미성년 자녀가 다음 순위로 상속인이 되는 경우가 많으므로, 자녀 몫까지 함께 포기 절차를 밟는지 반드시 확인해야 뒤늦게 자녀에게 빚이 남는 일을 막을 수 있습니다.',
  },
  {
    question: '상속포기 비용은 얼마나 드나요?',
    answer:
      '법원에 내는 인지대와 송달료는 상속인 1인당 소액 수준입니다. 다만 상속인이 여러 명이면 각자 신고해야 하고, 서류 발급 비용과 법무사·변호사 대리를 맡길 경우 대리 비용이 추가됩니다. 정확한 비용과 절차는 관할 가정법원 또는 대법원 전자소송 안내를 참고하세요.',
  },
];

export default function InheritanceRenunciation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속포기 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속포기 2026, 기한 3개월과 빚 상속 막는 법',
    description:
      '상속개시를 안 날부터 3개월 안에 신고해야 하는 상속포기. 한정승인과의 차이, 후순위 상속인에게 빚이 넘어가는 함정, 3개월 경과 시 특별한정승인까지 민법 조문으로 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속포기', '한정승인', '상속 빚', '특별한정승인', '민법 1019조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속포기 2026',
    description:
      '상속포기 기한 3개월, 한정승인과의 차이, 후순위 승계 함정, 특별한정승인까지 정리한 실전 가이드.',
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
                    { name: '상속포기 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인 · 8분 읽기 · 2026-08-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속포기 2026
                  <br />
                  <span className="text-2xl text-text-secondary">기한 3개월과 채무 상속 차단</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모나 배우자가 재산보다 빚을 더 남기고 돌아가셨을 때, 그 빚을 그대로 떠안지 않으려면 상속포기를 해야 합니다. 이 가이드는 빚만 물려받게 된 상속인을 위해 상속포기의 기한, 한정승인과의 차이, 내가 포기하면 자녀나 형제에게 빚이 넘어가는 함정, 그리고 이미 3개월이 지났을 때 쓰는 특별한정승인까지 민법 조문에 근거해 단계별로 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-inheritance-renunciation-3-months-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속포기는 언제까지 해야 하나요?</h2>
                <p>
                  상속개시가 있음을 안 날부터 3개월 이내입니다(민법 §1019①). 여기서 핵심은 "안 날"의 뜻입니다. 단순히 사망한 날이 아니라, 사망 사실과 그로 인해 자신이 상속인이 되었다는 사실을 모두 안 날을 기준으로 3개월을 셉니다.
                </p>
                <p>
                  이 3개월을 숙려기간이라 부릅니다. 이 기간 동안 상속인은 단순승인, 한정승인, 상속포기 중 하나를 선택합니다. 아무 조치 없이 3개월이 지나면 원칙적으로 단순승인한 것으로 보아 재산은 물론 빚까지 전부 승계됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기간 계산의 기준</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    사망 사실을 몰랐거나, 알았더라도 자신이 상속인이 되었다는 것을 알지 못했다면 3개월은 아직 시작되지 않은 것으로 봅니다. 예를 들어 선순위 상속인이 모두 포기해 뒤늦게 상속인이 된 형제자매는, 자신이 상속인이 되었음을 안 시점부터 3개월을 계산합니다.
                  </p>
                </div>
                <p>
                  다만 개별 사정에 따라 "안 날"의 판단이 달라질 수 있으므로, 시점이 애매하면 관할 가정법원이나 전문가에게 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속포기와 한정승인은 무엇이 다른가요?</h2>
                <p>
                  상속포기는 상속인 지위 자체를 버리는 것이고, 한정승인은 상속받은 재산 한도 안에서만 빚을 갚겠다고 신고하는 것입니다. 둘 다 빚을 떠안지 않으려는 방법이지만 효과와 절차가 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상속포기와 한정승인 비교 (민법 §1019, §1028, §1041)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속포기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">한정승인</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">재산 승계</td>
                        <td className="p-3">받지 않음</td>
                        <td className="p-3">받되 재산 한도 내 변제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">빚 부담</td>
                        <td className="p-3">전혀 없음</td>
                        <td className="p-3">상속재산 범위까지만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">후순위로 빚 이동</td>
                        <td className="p-3">이동함</td>
                        <td className="p-3">이동하지 않음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">추천 상황</td>
                        <td className="p-3">빚이 재산보다 확실히 많을 때</td>
                        <td className="p-3">재산과 빚 규모가 불확실할 때</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 한정승인은 상속재산 목록을 작성하고 채권자에게 공고·최고하는 청산 절차를 거쳐야 해 상속포기보다 복잡합니다. 재산이 거의 없고 빚만 분명하다면 상속포기가, 무엇이 얼마나 있는지 불확실하다면 한정승인이 대체로 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">내가 포기하면 자녀·형제에게 빚이 넘어가나요?</h2>
                <p>
                  넘어갈 수 있습니다. 이것이 상속포기에서 가장 많이 놓치는 함정입니다. 선순위 상속인이 포기하면 상속권이 다음 순위로 이동하기 때문입니다(민법 §1000, §1003, §1043).
                </p>
                <p>
                  상속 순위는 ① 직계비속(자녀·손자녀), ② 직계존속(부모·조부모), ③ 형제자매, ④ 4촌 이내 방계혈족 순이며, 배우자는 1순위 또는 2순위와 함께 공동상속인이 됩니다. 앞 순위가 모두 포기하면 그 빚이 뒤 순위로 그대로 넘어갑니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 아버지가 빚 2억원만 남기고 사망</p>
                  <p className="text-sm text-text-secondary">
                    · 1단계: 배우자와 자녀 2명이 모두 상속포기 신고
                    <br />
                    · 결과: 상속권이 손자녀에게 이동. 손자녀가 포기하지 않으면 2억원 채무 승계
                    <br />
                    · 2단계: 손자녀, 피상속인의 부모, 형제자매까지 순차로 포기 필요
                    <br />
                    · 대안: 상속인 중 1명이 한정승인을 하면 후순위로 빚이 넘어가지 않아 절차가 간단해짐
                  </p>
                </div>
                <p>
                  예외: 빚만 있는 상속이라면 선순위가 상속포기만 하고 끝내면 오히려 친척들이 줄줄이 빚을 떠안게 될 수 있습니다. 그래서 실무에서는 상속인 중 한 명이 한정승인을 하고 나머지가 포기하는 방식으로 채무 승계를 한 번에 끊는 경우가 많습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속포기 신청 방법과 서류는?</h2>
                <p>
                  상속포기는 피상속인의 마지막 주소지를 관할하는 가정법원에 상속포기 심판을 청구하는 방식으로 합니다(민법 §1041). 채권자에게 통보하거나 다른 상속인의 동의를 받는 것이 아니라, 법원에 정식으로 신고해야 효력이 생깁니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>관할:</strong> 피상속인의 마지막 주소지 관할 가정법원(지방법원 가사부).
                  </li>
                  <li>
                    <strong>기본 서류:</strong> 상속포기 심판청구서, 청구인의 가족관계증명서와 주민등록등본, 피상속인의 기본증명서, 가족관계증명서, 말소자 주민등록초본.
                  </li>
                  <li>
                    <strong>제출 방법:</strong> 관할 법원 방문 접수 또는 대법원 전자소송 사이트를 통한 온라인 접수.
                  </li>
                  <li>
                    <strong>수리 통지:</strong> 법원이 심리 후 심판문을 보내며, 이때 상속포기의 효력이 확정됩니다.
                  </li>
                </ul>
                <p>
                  다만 법원과 사안에 따라 추가 서류를 요구할 수 있으므로, 접수 전 관할 가정법원이나 대법원 전자소송 안내로 필요한 서류를 확인하는 것이 좋습니다.
                </p>
              </section>

              <AdSlot slot="guide-inheritance-renunciation-3-months-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3개월이 지났다면? 특별한정승인</h2>
                <p>
                  숙려기간 3개월을 넘겼더라도 방법이 남아 있습니다. 특별한정승인입니다(민법 §1019③). 상속채무가 상속재산을 초과한다는 사실을 중대한 과실 없이 3개월 안에 알지 못했다면, 그 사실을 안 날부터 다시 3개월 이내에 한정승인을 신고할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">특별한정승인 요건 정리</p>
                  <p className="text-sm text-text-secondary">
                    · 요건 1: 상속채무 초과 사실을 3개월 안에 알지 못했을 것
                    <br />
                    · 요건 2: 그 알지 못한 데에 중대한 과실이 없을 것
                    <br />
                    · 기한: 초과 사실을 안 날부터 3개월 이내 신고
                    <br />
                    · 입증: "중대한 과실이 없었다"를 소명할 자료(채무를 알게 된 경위·시점) 필요
                  </p>
                </div>
                <p>
                  예외: 뒤늦게 날아온 카드빚 독촉장이나 대출 상환 통지로 채무를 처음 알게 된 경우가 대표적입니다. 다만 중대한 과실 여부는 사안마다 다르게 판단되므로, 관할 가정법원이나 전문가의 도움을 받아 소명 자료를 준비하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">상속포기 전 반드시 피해야 할 실수</h2>
                <p>
                  상속포기를 준비하는 과정에서 사소해 보이는 행동이 포기를 무효로 만들 수 있습니다. 절차만큼이나 "하지 말아야 할 것"이 중요합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>상속재산 처분·소비 금지:</strong> 예금을 인출해 쓰거나 부동산을 처분하면 단순승인으로 간주되어(민법 §1026) 포기가 인정되지 않을 수 있습니다.
                  </li>
                  <li>
                    <strong>일부만 포기 불가:</strong> 상속포기는 재산 전부에 대한 포기만 가능합니다. 좋은 재산만 받고 빚만 포기하는 선택은 되지 않습니다.
                  </li>
                  <li>
                    <strong>가족 전체 검토:</strong> 나 혼자 포기하면 다음 순위 친족에게 빚이 넘어갈 수 있으니, 누구까지 포기하거나 한정승인할지 함께 계획해야 합니다.
                  </li>
                  <li>
                    <strong>기한 엄수:</strong> 3개월은 생각보다 빠르게 지나갑니다. 서류 준비에 시간이 걸리므로 사망 사실을 안 즉시 절차를 시작하는 것이 좋습니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/inheritance-limited-acceptance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">한정승인 완전정리</div>
                    <p className="mt-1 text-sm text-text-secondary">재산 한도 내 변제, 청산 절차와 상속포기 선택 기준.</p>
                  </Link>
                  <Link
                    href="/guide/legal-inheritance-order-share-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">법정상속 순위와 지분</div>
                    <p className="mt-1 text-sm text-text-secondary">누가 상속인이 되고 지분은 어떻게 나뉘는지 정리.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">재산을 물려받는 경우의 세율·공제 구조.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-legal-reserve-claim-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">유류분 반환청구</div>
                    <p className="mt-1 text-sm text-text-secondary">특정 상속인에게 재산이 쏠렸을 때의 최소 몫.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-house-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속주택 취득세</div>
                    <p className="mt-1 text-sm text-text-secondary">주택을 상속받을 때 내는 취득세 특례 세율.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속세·증여세·양도세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 사건에 대한 법률 자문이 아닙니다. 상속포기·한정승인의 기한 기산점, 필요 서류, 특별한정승인의 중대한 과실 판단은 사안마다 크게 달라질 수 있으므로, 실제 신고 전 관할 가정법원 또는 변호사·법무사 등 전문가에게 반드시 확인하세요. 본 콘텐츠는 2026-08-10 기준이며 관련 법령 개정 시 업데이트됩니다. 인용 조문: 민법 §1000, §1003, §1019, §1026, §1028, §1041, §1042, §1043. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>,{' '}
                  <a href="https://ecfs.scourt.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대법원 전자소송</a>.
                </p>
              </section>

              <ShareButtons
                title="상속포기 2026 가이드"
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
