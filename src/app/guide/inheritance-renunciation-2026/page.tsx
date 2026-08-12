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

const URL = 'https://calculatorhost.com/guide/inheritance-renunciation-2026/';
const DATE_PUBLISHED = '2026-08-13';
const DATE_MODIFIED = '2026-08-13';

export const metadata: Metadata = {
  title: '상속포기 신고 방법·기한 2026, 빚 상속 안 받는 법',
  description:
    '부모님 빚이 재산보다 많을 때 상속포기로 채무를 넘겨받지 않을 수 있습니다. 사망을 안 날부터 3개월 이내 가정법원 신고, 후순위 상속인까지 포기해야 하는 이유, 한정승인과의 차이를 민법 §1019·§1041 기준으로 정리했습니다.',
  keywords: [
    '상속포기',
    '상속포기 방법',
    '상속포기 기한',
    '빚 상속 포기',
    '상속포기 후순위',
    '한정승인 차이',
    '민법 1019조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속포기 신고 방법·기한 2026, 빚 상속 안 받는 법' }],
    title: '상속포기 신고 방법·기한 2026, 빚 상속을 피하는 정확한 절차',
    description: '사망을 안 날부터 3개월 이내 가정법원 신고. 후순위 상속인까지 포기해야 하는 이유와 한정승인 비교.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속포기 신고 방법·기한 2026, 빚 상속 피하는 절차',
    description: '사망 안 날부터 3개월 이내 가정법원 신고. 후순위 상속인·한정승인 비교. 민법 §1019.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상속포기는 언제까지 해야 하나요?',
    answer:
      '상속개시가 있음을 안 날, 즉 피상속인의 사망 사실과 자신이 상속인이 된 것을 안 날부터 3개월 이내에 해야 합니다(민법 §1019①). 이 기간을 넘기면 단순승인한 것으로 보아 빚까지 그대로 상속되므로 주의해야 합니다. 사정이 있으면 이 기간 안에 가정법원에 기간 연장을 청구할 수 있습니다.',
  },
  {
    question: '상속포기는 어디에 신고하나요?',
    answer:
      '피상속인의 마지막 주소지를 관할하는 가정법원에 상속포기 신고서를 제출해야 합니다(민법 §1041). 가족에게 말로 포기하겠다고 하거나 각서를 쓰는 것만으로는 법적 효력이 전혀 없습니다. 법원이 신고를 수리해야 비로소 효력이 생깁니다.',
  },
  {
    question: '상속포기와 한정승인 중 무엇이 나은가요?',
    answer:
      '빚이 재산보다 확실히 많으면 상속포기가 간단합니다. 다만 재산과 빚의 규모가 불확실하면 물려받은 재산 한도에서만 빚을 갚는 한정승인이 안전할 수 있습니다. 상속포기는 후순위 상속인에게 빚이 넘어가므로, 온 가족이 얽히는 것을 막으려면 상속인 1명이 한정승인하고 나머지가 포기하는 방식을 쓰기도 합니다.',
  },
  {
    question: '자녀가 상속포기하면 손자녀도 해야 하나요?',
    answer:
      '그럴 수 있습니다. 1순위 상속인인 자녀가 모두 포기하면 상속권이 후순위인 손자녀에게 넘어갑니다. 따라서 빚을 완전히 끊으려면 손자녀 등 후순위 상속인도 포기해야 합니다. 후순위 상속인은 앞순위가 모두 포기한 사실을 안 날부터 다시 3개월 이내에 포기하면 됩니다.',
  },
  {
    question: '배우자만 남기고 자녀가 모두 포기하면 어떻게 되나요?',
    answer:
      '2023년 대법원 판례에 따라 자녀 전원이 상속을 포기하면 손자녀에게 내려가지 않고 배우자가 단독으로 상속합니다. 따라서 배우자도 빚을 피하려면 함께 포기하거나 한정승인을 해야 합니다. 과거와 해석이 달라진 부분이므로 실제 사안은 반드시 전문가와 확인하세요.',
  },
  {
    question: '사망보험금도 상속포기하면 못 받나요?',
    answer:
      '보험 수익자가 상속인 본인으로 지정된 사망보험금은 상속재산이 아니라 수익자의 고유재산으로 봅니다. 따라서 상속을 포기해도 사망보험금은 받을 수 있는 것이 원칙입니다. 다만 수익자가 피상속인 본인이나 상속인 일반으로 지정된 경우 등은 해석이 달라질 수 있으므로 개별 확인이 필요합니다.',
  },
  {
    question: '상속포기 후 몰랐던 재산이 나타나면 어떻게 하나요?',
    answer:
      '상속을 포기하면 소급하여 처음부터 상속인이 아니었던 것으로 보므로(민법 §1042) 새로 발견된 재산도 받을 수 없는 것이 원칙입니다. 반대로 빚이 재산보다 많은 줄 모르고 단순승인한 뒤 뒤늦게 큰 빚을 알게 된 경우에는 특별한정승인 제도를 활용할 수 있으니 법원·전문가와 상담하세요.',
  },
  {
    question: '상속포기에 비용이 드나요?',
    answer:
      '가정법원에 낼 인지대와 송달료 등 소액의 실비가 듭니다. 상속인 1인당 인지대는 크지 않으며, 송달료는 상대방 수에 따라 달라집니다. 법무사나 변호사에게 맡기면 대리 수수료가 별도로 발생하지만, 서류가 단순한 사안은 본인이 직접 신고할 수도 있습니다.',
  },
];

export default function InheritanceRenunciation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속포기 신고 방법·기한 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속포기 신고 방법·기한 2026, 빚 상속을 피하는 정확한 절차',
    description:
      '사망을 안 날부터 3개월 이내 가정법원 신고, 후순위 상속인까지 포기해야 하는 이유, 한정승인과의 차이, 사망보험금·특별한정승인 예외를 민법 §1019·§1041 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속포기', '한정승인', '빚 상속', '민법 1019조', '후순위 상속인'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속포기 신고 방법·기한 2026',
    description:
      '빚 상속을 피하는 상속포기의 기한(3개월), 신고 방법(가정법원), 후순위 상속인, 한정승인 비교.',
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
                    { name: '상속포기 신고 방법·기한 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인 · 8분 읽기 · 2026-08-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속포기 신고 방법·기한 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 빚 상속 안 받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모님이 남긴 것이 재산보다 빚이 많을 때, 상속인은 상속포기로 그 채무를 넘겨받지 않을 수 있습니다. 이 가이드는 상속포기의 기한과 신고 방법, 후순위 상속인까지 포기해야 하는 이유, 한정승인과의 차이, 그리고 사망보험금처럼 헷갈리기 쉬운 예외를 실제 사례와 함께 정리합니다. 대상 독자는 채무 상속이 걱정되는 상속인입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속포기란 무엇인가요?</h2>
                <p>
                  상속포기는 상속인이 재산도 빚도 일절 물려받지 않겠다고 법적으로 선언하는 절차입니다. 상속이 개시되면 예금·부동산 같은 적극재산뿐 아니라 대출·보증채무 같은 소극재산도 함께 넘어옵니다. 빚이 재산보다 많다면 상속포기로 상속인의 지위 자체를 벗어나는 것이 가장 확실한 방어책입니다.
                </p>
                <p>
                  상속포기를 하면 그 사람은 처음부터 상속인이 아니었던 것으로 봅니다(민법 §1042). 즉 재산도 못 받지만 빚도 갚을 의무가 없습니다. 다만 이 효과는 가정법원에 정식으로 신고하고 법원이 수리해야 생기며, 가족끼리 말로 정하는 것은 효력이 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 재산과 빚을 모두 물려받지 않는 법적 선언.
                    <br />
                    기한: 사망을 안 날부터 3개월 이내(민법 §1019①).
                    <br />
                    장소: 피상속인 마지막 주소지 관할 가정법원(민법 §1041).
                    <br />
                    주의: 자녀가 모두 포기하면 손자녀 등 후순위로 빚이 이동.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속포기 기한은 언제까지인가요?</h2>
                <p>
                  사망을 안 날부터 3개월 이내입니다. 정확히는 상속개시가 있음을 안 날, 즉 피상속인이 사망한 사실과 그로 인해 자신이 상속인이 되었다는 사실을 안 날부터 3개월입니다(민법 §1019①). 단순히 사망일이 아니라 상속인이 그 사실을 인지한 날이 기준입니다.
                </p>
                <p>
                  이 3개월을 넘기면 원칙적으로 단순승인한 것으로 보아 빚까지 그대로 상속됩니다. 상속재산을 마음대로 처분하거나 소비해도 단순승인으로 간주될 수 있으므로, 포기를 고려한다면 상속재산에 손대지 않는 것이 안전합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상속 승인·포기 3가지 선택 비교 (민법 §1019·§1028·§1041)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">언제 유리한가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">단순승인</td>
                        <td className="p-3">재산과 빚을 모두 상속</td>
                        <td className="p-3">재산이 빚보다 많을 때</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">한정승인</td>
                        <td className="p-3">물려받은 재산 한도에서만 빚 변제</td>
                        <td className="p-3">재산·빚 규모가 불확실할 때</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상속포기</td>
                        <td className="p-3">재산·빚 전부 물려받지 않음</td>
                        <td className="p-3">빚이 재산보다 확실히 많을 때</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 부득이한 사정으로 3개월 안에 결정하기 어렵다면, 기간이 지나기 전에 가정법원에 기간 연장을 청구할 수 있습니다. 청구 없이 기간이 지나면 연장이 인정되지 않는 것이 원칙입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속포기 신고는 어디에, 어떻게 하나요?</h2>
                <p>
                  피상속인의 마지막 주소지를 관할하는 가정법원에 신고합니다. 상속포기는 반드시 가정법원에 상속포기 신고서를 제출하고 수리를 받아야 효력이 생깁니다(민법 §1041). 절차는 다음 순서로 진행됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>서류 준비:</strong> 상속포기 심판청구서, 피상속인 기본증명서·가족관계증명서, 상속인의 가족관계증명서·주민등록등본, 인감증명서 등을 준비합니다.
                  </li>
                  <li>
                    <strong>관할 법원 확인:</strong> 피상속인의 마지막 주소지 관할 가정법원(지방법원 가사과)에 접수합니다.
                  </li>
                  <li>
                    <strong>신고서 제출:</strong> 인지대와 송달료를 납부하고 신고서를 제출합니다. 상속인 각자가 신고 주체가 되며, 여러 명이 함께 접수할 수도 있습니다.
                  </li>
                  <li>
                    <strong>법원 수리:</strong> 법원이 심사 후 심판문을 보내면 상속포기의 효력이 확정됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 채권자에게 상속포기를 주장하려면 법원의 수리 심판문을 증빙으로 제시해야 합니다. 접수만 하고 수리 전이라면 아직 확정된 것이 아니므로, 수리 여부를 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자녀가 포기하면 손자녀도 해야 하나요?</h2>
                <p>
                  그럴 수 있습니다. 상속포기를 하면 그 상속분은 같은 순위의 다른 상속인에게, 같은 순위가 모두 포기하면 다음 순위 상속인에게 넘어갑니다(민법 §1043 관련). 즉 1순위인 자녀가 전부 포기하면 상속권이 후순위인 손자녀에게 이동하므로, 빚을 완전히 끊으려면 후순위까지 함께 포기해야 합니다.
                </p>
                <p>
                  후순위 상속인은 앞순위가 모두 포기했다는 사실을 안 날부터 다시 3개월 이내에 포기하면 됩니다. 모두 동시에 포기해야 하는 것은 아니고, 각자 자신이 상속인이 된 것을 안 시점을 기준으로 기간이 계산됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 아버지가 빚 3억원을 남긴 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 1순위: 자녀 2명이 모두 상속포기
                    <br />
                    · 결과: 빚이 손자녀(2순위 직계비속)에게 이동
                    <br />
                    · 필요 조치: 손자녀도 포기, 이후 형제자매 등 후순위까지 정리 필요
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 온 가족의 빚 단절을 위해 상속인 1명이 한정승인하고 나머지가 포기하는 방식이 실무상 자주 쓰입니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 2023년 대법원 판례에 따라, 자녀 전원이 포기하고 배우자가 남아 있으면 손자녀가 아니라 배우자가 단독으로 상속하는 것으로 정리되었습니다. 배우자도 빚을 피하려면 함께 포기하거나 한정승인을 해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속포기와 한정승인, 무엇이 다른가요?</h2>
                <p>
                  상속포기는 상속인 지위를 아예 벗어나는 것이고, 한정승인은 상속은 받되 물려받은 재산 한도 내에서만 빚을 갚는 것입니다. 재산과 빚의 규모가 명확히 빚 초과라면 상속포기가 간단하지만, 규모가 불확실하면 한정승인이 안전할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 상속포기 vs 한정승인 (민법 §1028·§1041)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속포기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">한정승인</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상속인 지위</td>
                        <td className="p-3">벗어남</td>
                        <td className="p-3">유지</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">빚 부담</td>
                        <td className="p-3">전혀 없음</td>
                        <td className="p-3">상속재산 한도 내</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">후순위 영향</td>
                        <td className="p-3">후순위로 이동</td>
                        <td className="p-3">이동 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사후 절차</td>
                        <td className="p-3">비교적 단순</td>
                        <td className="p-3">재산목록·청산 절차 필요</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 한정승인은 상속재산 목록을 작성하고 채권자에게 공고·청산하는 절차가 뒤따라 상대적으로 복잡합니다. 어느 쪽이 유리한지는 재산·빚의 구체적 규모에 따라 다르므로 사안별 판단이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사망보험금·연금은 포기해도 받을 수 있나요?</h2>
                <p>
                  수익자가 상속인 본인으로 지정된 사망보험금은 받을 수 있는 것이 원칙입니다. 이 보험금은 상속재산이 아니라 수익자 고유의 권리로 보기 때문입니다. 따라서 상속을 포기해도 지정 수익자로서 사망보험금을 수령하는 것이 가능합니다.
                </p>
                <p>
                  다만 수익자가 피상속인 본인으로 되어 있거나 막연히 상속인으로만 지정된 경우 등은 해석이 달라질 수 있습니다. 유족연금 역시 법령에 따라 수급권자가 따로 정해지므로 상속포기와 별개로 판단됩니다. 정확한 수령 가능 여부는 보험사·연금공단에 개별 확인하세요.
                </p>
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
                    <div className="font-semibold text-primary-500">한정승인 신고 방법</div>
                    <p className="mt-1 text-sm text-text-secondary">재산 한도에서만 빚을 갚는 한정승인 절차 비교.</p>
                  </Link>
                  <Link
                    href="/guide/legal-inheritance-order-share-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">법정상속 순위·상속분</div>
                    <p className="mt-1 text-sm text-text-secondary">누가 얼마를 상속받는지 순위와 비율 정리.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-legal-reserve-claim-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">유류분 반환청구</div>
                    <p className="mt-1 text-sm text-text-secondary">최소 상속 지분인 유류분을 지키는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">상속받을 때의 세금 구조와 공제.</p>
                  </Link>
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산을 입력해 세액을 계산해보세요.</p>
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
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률 조언이 아닙니다. 상속포기·한정승인의 실제 절차와 효과는 상속재산·채무의 구체적 상황과 가족 구성에 따라 달라지므로, 반드시 가정법원 또는 법무사·변호사 등 전문가와 확인하세요. 본 콘텐츠는 2026-08-13을 기준으로 작성되었으며, 관련 법령·판례 변경 시 업데이트됩니다. 인용 법조항: 민법 §1019(승인·포기의 기간), §1028(한정승인), §1041(포기의 방식), §1042(포기의 소급효), §1043(포기한 상속분의 귀속). AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>,{' '}
                  <a href="https://help.scourt.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한민국 법원 전자민원센터</a>.
                </p>
              </section>

              <ShareButtons
                title="상속포기 신고 방법·기한 2026 가이드"
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