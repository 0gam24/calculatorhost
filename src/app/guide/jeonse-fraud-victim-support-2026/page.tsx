// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/jeonse-fraud-victim-support-2026/';
const DATE_PUBLISHED = '2026-08-11';
const DATE_MODIFIED = '2026-08-11';

export const metadata: Metadata = {
  title: '전세사기 피해자 지원 신청 2026 | 요건·절차·유효기간 총정리',
  description:
    '전세사기 피해자로 인정받는 4가지 요건과 결정 신청 절차를 정리했습니다. 보증금 5억원 이하 기준, 우선매수권·LH 공공임대 지원, 유효기간 2027년 5월 31일까지. 전세사기특별법 기준.',
  keywords: [
    '전세사기 피해자',
    '전세사기 피해자 신청',
    '전세사기 특별법',
    '전세사기 피해자 요건',
    '전세사기 우선매수권',
    '전세사기 지원',
    '전세사기피해자 지원 및 주거안정에 관한 특별법 3조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전세사기 피해자 지원 신청 2026 요건과 절차' }],
    title: '전세사기 피해자 지원 신청 2026 | 요건·절차·유효기간',
    description: '전세사기 피해자 4가지 요건, 결정 신청 절차, 우선매수권과 LH 공공임대 지원까지 실전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전세사기 피해자 지원 신청 2026 요건·절차',
    description: '보증금 5억 이하 기준, 4가지 요건, 우선매수권·LH 지원, 유효기간 2027년 5월 31일.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전세사기 피해자로 인정받는 요건은 무엇인가요?',
    answer:
      '네 가지 요건을 모두 갖춰야 합니다(전세사기피해자 지원 및 주거안정에 관한 특별법 §3). 첫째 주택 인도와 전입신고를 마치고 확정일자를 갖췄을 것, 둘째 임대차보증금이 5억원 이하일 것(피해지원위원회 심의로 최대 7억원까지 상향 가능), 셋째 다수의 임차인에게 보증금을 돌려주지 못하는 피해가 발생했거나 예상될 것, 넷째 임대인의 기망이나 반환능력 없는 자에게 소유권 양도, 경매·공매 개시 등 전세사기 의도가 있다고 볼 상당한 이유가 있을 것입니다.',
  },
  {
    question: '보증금이 5억원을 넘으면 피해자로 인정받을 수 없나요?',
    answer:
      '원칙 기준은 5억원 이하지만, 전세사기피해지원위원회 심의를 거쳐 최대 7억원까지 상향해 인정받을 수 있습니다. 지역별 여건과 피해 규모를 고려한 개별 심의 사항이므로, 보증금이 5억원을 초과하더라도 포기하지 말고 관할 시·도에 신청해 심의를 받아보는 것이 좋습니다. 정확한 적용은 국토교통부와 위원회 판단에 따릅니다.',
  },
  {
    question: '피해자 결정 신청은 어디에 하나요?',
    answer:
      '주택 소재지 관할 시·도에 신청하며, 접수된 사건은 국토교통부 전세사기피해지원위원회 심의를 거쳐 결정됩니다. 온라인은 전세사기피해자 지원관리시스템(jeonse.kgeop.go.kr)에서 신청할 수 있고, 방문 신청도 가능합니다. 결정 통보를 받은 뒤 각 지원 제도에 별도로 신청하는 구조입니다.',
  },
  {
    question: '피해자로 결정되면 어떤 지원을 받을 수 있나요?',
    answer:
      '경매·공매 유예, 우선매수권 부여, LH가 우선매수권을 넘겨받아 공공임대로 제공하는 방식, 조세채권 안분, 저리 대환·전세자금 대출, 긴급복지 지원, 법률·소송 지원 등이 있습니다. 피해자 유형과 상황에 따라 받을 수 있는 지원이 다르므로, 결정 후 상담을 통해 본인에게 맞는 제도를 선택하는 것이 중요합니다.',
  },
  {
    question: '우선매수권과 LH 공공임대 지원은 무엇이 다른가요?',
    answer:
      '우선매수권은 피해자가 살던 집이 경매에 넘어갔을 때 감정가가 아닌 최고 낙찰가와 같은 금액으로 다른 사람보다 먼저 매수할 수 있는 권리입니다. 집을 계속 소유하고 싶을 때 유리합니다. 반면 매수 여력이 없으면 우선매수권을 LH에 양도하고, LH가 그 집을 낙찰받아 피해자에게 공공임대로 최장 20년까지 시세보다 저렴하게 재임대하는 방식을 택할 수 있습니다.',
  },
  {
    question: '전세사기 피해자 신청 기한은 언제까지인가요?',
    answer:
      '특별법 개정으로 피해자 결정 신청과 지원의 유효기간이 2027년 5월 31일까지 연장됐습니다. 다만 개별 지원 제도(경매 유예, 대출 등)는 각각의 신청 시한이 따로 있으므로, 피해 사실을 인지했다면 유효기간에 기대지 말고 최대한 빨리 신청하는 것이 안전합니다. 연장 여부와 시한은 국토교통부 공고로 확인하세요.',
  },
  {
    question: '전세보증금반환보증(HUG)에 가입했어도 피해자 신청이 필요한가요?',
    answer:
      '보증에 가입했고 정상적으로 보증금을 전액 돌려받을 수 있다면 별도 피해자 신청 실익이 크지 않을 수 있습니다. 그러나 보증 이행이 지연되거나 일부만 회수되는 경우, 또는 대항력 유지가 필요한 경우에는 피해자 결정을 함께 신청해 두는 것이 유리할 수 있습니다. 개별 상황은 주택도시보증공사와 관할 지원기관에 확인하세요.',
  },
  {
    question: '집주인이 세금을 체납했는데 제 보증금은 어떻게 되나요?',
    answer:
      '임대인의 국세·지방세 체납이 있어도, 특별법에 따라 임차인의 확정일자보다 법정기일이 늦은 조세채권은 보증금에서 분리(안분)해 임차인의 우선변제를 보호합니다. 다만 적용 요건이 있으므로, 체납 사실이 확인되면 관할 세무서와 지원기관에 안분 적용 여부를 문의해야 합니다.',
  },
];

export default function JeonseFraudVictimSupport2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전세사기 피해자 지원 신청 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전세사기 피해자 지원 신청 2026, 요건·절차·유효기간 총정리',
    description:
      '전세사기 피해자로 인정받는 4가지 요건, 결정 신청 절차, 우선매수권과 LH 공공임대 지원, 조세채권 안분, 유효기간 2027년 5월 31일까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전세사기', '피해자 요건', '우선매수권', 'LH 공공임대', '특별법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전세사기 피해자 지원 신청 2026',
    description:
      '전세사기 피해자 4가지 요건과 결정 신청 절차, 지원 제도, 유효기간을 정리한 실전 가이드.',
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
                    { name: '전세사기 피해자 지원 신청 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임차인 · 8분 읽기 · 2026-08-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전세사기 피해자 지원 신청 2026
                  <br />
                  <span className="text-2xl text-text-secondary">요건·절차·유효기간 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  보증금을 돌려받지 못할 위기에 놓인 임차인이라면, 전세사기 피해자로 결정받는 것이 각종 지원의 출발점입니다. 이 가이드는 피해자로 인정받는 4가지 요건, 관할 시·도에 결정을 신청하는 절차, 우선매수권과 LH 공공임대 같은 실제 지원, 그리고 신청 유효기간까지 전세사기특별법을 근거로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-jeonse-fraud-victim-support-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전세사기 피해자로 인정받는 4가지 요건은?</h2>
                <p>
                  네 가지를 모두 충족해야 피해자로 결정됩니다. 근거 법령은 「전세사기피해자 지원 및 주거안정에 관한 특별법」 §3(전세사기피해자등의 요건)입니다. 요건 중 하나라도 빠지면 피해자로 인정되지 않으므로 사전에 스스로 점검해 두는 것이 좋습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 전세사기 피해자 4가지 요건 (특별법 §3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대항력·우선변제권</td>
                        <td className="p-3">주택 인도 + 전입신고(주민등록) + 확정일자를 갖출 것</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">보증금 기준</td>
                        <td className="p-3">임대차보증금 5억원 이하(위원회 심의로 최대 7억원까지 상향)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">다수 피해</td>
                        <td className="p-3">다수 임차인의 보증금 미반환 피해가 발생했거나 예상될 것</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">사기 의도</td>
                        <td className="p-3">임대인의 기망, 무자력자 소유권 양도, 경매·공매 개시 등 상당한 이유</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만, 임차인이 스스로 보증금을 회수할 수 있는 경우(대항력으로 전액 우선변제가 확실한 경우 등)나 임차 목적물이 임대인의 명백한 사기 의도와 무관한 단순 채무불이행인 경우에는 요건을 충족하지 못할 수 있습니다. 판단이 애매하면 신청 단계에서 위원회 심의를 받아보는 편이 낫습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보증금 5억원 초과면 신청이 안 되나요?</h2>
                <p>
                  원칙 기준은 5억원 이하지만, 5억원을 넘어도 신청 자체는 가능합니다. 전세사기피해지원위원회가 지역 여건과 피해 규모를 심의해 최대 7억원까지 상향 인정할 수 있기 때문입니다. 아래 경계 사례로 감을 잡아보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례로 보는 보증금 기준</p>
                  <p className="text-sm text-text-secondary">
                    · 보증금 4억 8천만원: 5억원 이하이므로 다른 요건 충족 시 인정 가능
                    <br />
                    · 보증금 5억원: 기준선(이하)에 해당하여 인정 대상
                    <br />
                    · 보증금 5억 5천만원: 5억원 초과이나 위원회 심의로 최대 7억원까지 상향 인정 가능
                    <br />
                    · 보증금 7억 2천만원: 상향 한도(7억원) 초과로 원칙적 제외, 개별 심의 결과에 따름
                    <br />
                    <span className="text-xs text-text-tertiary">예외: 상향 인정 여부는 위원회 재량 사항이므로, 초과 구간은 반드시 관할 시·도 심의를 통해 확인해야 합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">피해자 결정 신청은 어떻게 진행되나요?</h2>
                <p>
                  결정 신청은 관할 시·도 접수 후 국토교통부 전세사기피해지원위원회 심의로 이어집니다. 절차는 단계별로 다음과 같습니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li><strong>피해 인지:</strong> 임대인 잠적, 경매·공매 개시 통지, 보증금 미반환 등 사실 확인</li>
                  <li><strong>결정 신청:</strong> 주택 소재지 관할 시·도 또는 전세사기피해자 지원관리시스템(jeonse.kgeop.go.kr) 온라인 접수</li>
                  <li><strong>피해 조사:</strong> 요건 충족 여부에 대한 사실 조사</li>
                  <li><strong>위원회 심의·결정:</strong> 국토교통부 전세사기피해지원위원회 의결</li>
                  <li><strong>결정 통보:</strong> 피해자 결정문 수령</li>
                  <li><strong>지원 신청:</strong> 경매 유예, 대출, 우선매수권 등 개별 제도에 각각 신청</li>
                </ol>
                <p>
                  제출 서류로는 임대차계약서, 주민등록등본(전입 확인), 확정일자 확인 자료, 경매개시결정문 등 피해 증빙, 개인정보 수집·이용 동의서 등이 필요합니다. 예외: 서류가 일부 미비해도 접수 후 보완이 가능한 경우가 있으므로, 마감을 이유로 신청을 미루지 마세요.
                </p>
              </section>

              <AdSlot slot="guide-jeonse-fraud-victim-support-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">피해자로 결정되면 어떤 지원을 받나요?</h2>
                <p>
                  피해자 결정은 지원의 관문입니다. 상황에 따라 선택할 수 있는 대표 제도를 비교하면 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 전세사기 피해자 지원 제도 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지원</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적합한 상황</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">경매·공매 유예</td>
                        <td className="p-3">진행 중인 경매·공매 절차를 일정 기간 미룸</td>
                        <td className="p-3">시간을 확보해 대응책 마련</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">우선매수권</td>
                        <td className="p-3">최고 낙찰가와 같은 금액으로 먼저 매수</td>
                        <td className="p-3">거주 주택을 계속 소유</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">LH 공공임대</td>
                        <td className="p-3">우선매수권을 LH에 넘겨 공공임대로 재임대</td>
                        <td className="p-3">매수 여력이 없어도 계속 거주</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">금융 지원</td>
                        <td className="p-3">저리 대환대출, 전세자금 대출</td>
                        <td className="p-3">이주·재계약 자금 필요</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">조세채권 안분</td>
                        <td className="p-3">임대인 체납세금을 보증금에서 분리</td>
                        <td className="p-3">집주인 세금 체납이 있을 때</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 각 지원은 요건과 신청 시한이 개별적이며, 우선매수권을 행사하면 취득세·자금 부담이 생기므로 LH 공공임대와 비교해 신중히 선택해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청 유효기간은 언제까지인가요?</h2>
                <p>
                  특별법 개정으로 피해자 결정 신청과 지원의 유효기간이 2027년 5월 31일까지 연장됐습니다. 즉 그 이전에 최초 임대차계약을 체결한 임차인이 대상이 됩니다. 그러나 경매 유예나 대출 같은 개별 제도는 별도 시한이 있으므로, 유효기간이 남았다고 미루기보다 피해 인지 즉시 신청하는 것이 안전합니다. 연장·시한 변동은 국토교통부 공고로 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/jeonse-guarantee-insurance-hug-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 반환보증(HUG)</div>
                    <p className="mt-1 text-sm text-text-secondary">가입 조건과 보증 이행 절차로 사전에 대비하세요.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-right-vs-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세권 vs 확정일자</div>
                    <p className="mt-1 text-sm text-text-secondary">대항력과 우선변제권의 차이를 정확히 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">확정일자 우선변제권</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 지키는 대항력 요건을 챙기세요.</p>
                  </Link>
                  <Link
                    href="/guide/small-tenant-priority-repayment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소액임차인 최우선변제</div>
                    <p className="mt-1 text-sm text-text-secondary">경매 시 일정액을 최우선으로 보호받는 기준.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 안전 체크</div>
                    <p className="mt-1 text-sm text-text-secondary">계약 전 등기부·근저당 확인으로 위험 차단.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세·중개수수료·임대수익률 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 법률 자문이 아닙니다. 전세사기 피해자 인정 여부와 지원 적용은 사건별 사실관계에 따라 달라지며, 관할 시·도와 국토교통부 전세사기피해지원위원회의 심의로 최종 결정됩니다. 반드시 전세사기피해자 지원관리시스템 또는 관할 지원기관에서 확인하세요. 인용 법령은 <strong>전세사기피해자 지원 및 주거안정에 관한 특별법 §3</strong> 등입니다. 본 콘텐츠는 2026-08-11 기준이며 법령 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.lh.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국토지주택공사(LH)</a>,{' '}
                  <a href="https://jeonse.kgeop.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">전세사기피해자 지원관리시스템</a>.
                </p>
              </section>

              <ShareButtons
                title="전세사기 피해자 지원 신청 2026 가이드"
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
