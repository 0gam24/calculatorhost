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

const URL = 'https://calculatorhost.com/guide/tenant-lease-registration-injunction-2026/';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 임차권등기명령 검색 의도 흡수)

export const metadata: Metadata = {
  title: '임차권등기명령 2026, 보증금 못 받을 때 신청 방법',
  description:
    '계약이 끝났는데 임대인이 보증금을 안 돌려주면 임차권등기명령으로 대항력과 우선변제권을 지킨 채 이사할 수 있습니다. 신청 자격·절차·비용·기간과 이사 후 효력을 주택임대차보호법 §3의3 기준으로 정리했습니다.',
  keywords: [
    '임차권등기명령',
    '보증금 반환',
    '전세보증금 못받을때',
    '임차권등기 신청방법',
    '대항력 우선변제권 유지',
    '이사 후 보증금',
    '주택임대차보호법 3조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '임차권등기명령 2026, 보증금 못 받을 때 신청 방법' }],
    title: '임차권등기명령 2026, 이사 가도 보증금 우선변제권 지키기',
    description: '계약 종료 후 보증금 미반환 시 임차권등기명령으로 대항력·우선변제권을 유지한 채 이사. 신청 절차와 효력 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '임차권등기명령 2026',
    description: '보증금 못 받을 때 대항력·우선변제권을 지키는 법. 주택임대차보호법 §3의3.',
  },
};

const FAQ_ITEMS = [
  {
    question: '임차권등기명령이 무엇인가요?',
    answer:
      '임대차가 끝났는데도 보증금을 돌려받지 못한 임차인이 법원에 신청해 임차주택에 임차권을 등기하는 제도입니다(주택임대차보호법 §3의3). 등기가 되면 임차인이 그 집에서 이사를 나가더라도 이미 취득한 대항력과 우선변제권이 그대로 유지됩니다. 즉 짐을 빼고 전입신고를 옮겨도 보증금을 우선 변제받을 권리를 잃지 않습니다.',
  },
  {
    question: '누가 임차권등기명령을 신청할 수 있나요?',
    answer:
      '임대차가 끝난 후 보증금을 반환받지 못한 임차인이 신청할 수 있습니다. 계약기간이 만료되었거나 적법하게 해지되어 임대차가 종료된 상태여야 하며, 임대인이 보증금을 돌려주지 않아야 합니다. 대항력이나 우선변제권을 갖춘 임차인이 신청하면 그 권리를 유지한 채 이사할 수 있습니다.',
  },
  {
    question: '이사를 가면 대항력이 사라지는 것 아닌가요?',
    answer:
      '원래는 그렇습니다. 대항력과 우선변제권은 점유(거주)와 전입신고를 유지해야 지켜집니다. 그런데 임차권등기명령으로 등기를 마치면, 이후 이사를 나가 대항요건을 상실하더라도 이미 취득한 대항력과 우선변제권을 잃지 않습니다(주택임대차보호법 §3의3제5항 단서). 이것이 임차권등기의 핵심 효과입니다.',
  },
  {
    question: '어디에 어떻게 신청하나요?',
    answer:
      '임차주택 소재지를 관할하는 지방법원, 지방법원지원 또는 시·군 법원에 임차권등기명령 신청서를 제출합니다. 신청서에 임대차 종료 사실과 보증금 미반환 사실 등을 기재하고, 임대차계약서, 주민등록등본, 계약 종료를 증명하는 자료 등을 첨부합니다. 임대인 동의는 필요 없습니다.',
  },
  {
    question: '신청하면 바로 이사해도 되나요?',
    answer:
      '아닙니다. 임차권등기명령을 신청했다고 곧바로 효력이 생기는 것이 아니라, 법원의 결정과 등기가 실제로 완료된 것을 확인한 뒤에 이사해야 안전합니다. 등기가 되기 전에 먼저 이사하고 전입신고를 옮기면 대항력이 사라질 수 있으므로, 반드시 등기 완료를 확인하고 이사하세요.',
  },
  {
    question: '임차권등기명령에 드는 비용과 기간은?',
    answer:
      '신청 시 인지대, 등록면허세, 등기 관련 수수료 등이 들며 통상 수만 원 수준입니다. 여기에 든 비용은 임대인에게 청구할 수 있습니다. 기간은 법원 사정에 따라 다르지만 신청부터 등기 완료까지 통상 2주에서 1개월 안팎이 걸립니다. 정확한 비용과 기간은 관할 법원에 확인하세요.',
  },
  {
    question: '임차권등기를 하면 보증금을 바로 받나요?',
    answer:
      '아닙니다. 임차권등기는 보증금을 즉시 받아주는 제도가 아니라, 이사를 나가도 우선변제권을 유지시켜 주는 보전 조치입니다. 실제 보증금을 돌려받으려면 별도로 보증금반환청구 소송, 지급명령, 강제경매 등의 절차를 밟아야 합니다. 임차권등기는 그 과정에서 권리를 지키는 안전장치 역할을 합니다.',
  },
  {
    question: '전세보증금 반환보증(HUG)과는 어떻게 다른가요?',
    answer:
      '둘은 목적이 다릅니다. 반환보증은 미리 가입해 두면 보증기관이 보증금을 대신 돌려주는 보험 성격이고, 임차권등기명령은 이미 보증금을 못 받은 상황에서 임차인의 권리를 지키는 법적 조치입니다. 반환보증에 가입하지 않았거나 절차가 진행 중일 때 임차권등기로 우선변제권을 확보해 둘 수 있습니다.',
  },
];

export default function TenantLeaseRegistrationInjunction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '임차권등기명령 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '임차권등기명령 2026, 보증금 못 받을 때 신청 방법',
    description:
      '계약 종료 후 보증금을 못 받았을 때 대항력·우선변제권을 유지한 채 이사하게 해주는 임차권등기명령. 신청 자격·절차·비용·효력을 주택임대차보호법 §3의3 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['임차권등기명령', '보증금 반환', '대항력', '우선변제권', '전세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '임차권등기명령 2026',
    description: '보증금 미반환 시 임차인의 권리를 지키는 임차권등기명령 절차를 정리한 가이드.',
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
                    { name: '임차권등기명령 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임차인·전세 세입자 · 8분 읽기 · 2026-07-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  임차권등기명령 2026
                  <br />
                  <span className="text-2xl text-text-secondary">보증금 못 받을 때 신청 방법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세·월세 계약이 끝났는데 임대인이 보증금을 돌려주지 않으면, 이사도 못 가고 발이 묶이기 쉽습니다. 이럴 때 임차권등기명령을 이용하면 대항력과 우선변제권을 지킨 채 다른 집으로 이사할 수 있습니다. 이 가이드는 임차권등기명령이 무엇인지, 누가 어떻게 신청하는지, 비용과 기간은 얼마인지, 그리고 신청 후 이사 시점은 언제로 잡아야 하는지를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-tenant-lease-registration-injunction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임차권등기명령이란 무엇인가요?</h2>
                <p>
                  임차권등기명령은 계약이 끝났는데도 보증금을 못 받은 임차인이 법원에 신청해 임차주택에 임차권을 등기하는 제도입니다. 등기가 되면 임차인이 이사를 나가더라도 이미 확보한 대항력과 우선변제권이 그대로 유지됩니다. 보증금을 돌려받기 전에 다른 곳으로 이사해야 하는 임차인을 보호하기 위한 장치입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈에 보는 임차권등기명령</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 근거: 주택임대차보호법 §3의3
                    <br />
                    · 신청인: 계약 종료 후 보증금 미반환 임차인
                    <br />
                    · 효과: 이사 나가도 대항력·우선변제권 유지
                    <br />
                    · 신청처: 임차주택 관할 지방법원·지원·시군법원
                    <br />
                    · 임대인 동의: 불필요
                  </p>
                </div>
                <p className="mt-4">
                  다만 임차권등기는 보증금을 바로 받아주는 제도가 아니라 권리를 지켜주는 보전 조치입니다. 실제 반환은 별도의 소송이나 경매 절차로 진행됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 신청할 수 있나요?</h2>
                <p>
                  임대차가 끝난 후 보증금을 반환받지 못한 임차인이 신청할 수 있습니다. 두 가지 전제가 필요합니다. 첫째 임대차가 종료되었을 것, 둘째 임대인이 보증금을 돌려주지 않았을 것입니다. 계약기간 만료뿐 아니라 적법한 해지로 임대차가 끝난 경우도 포함됩니다.
                </p>
                <p className="mt-4">
                  대항력은 전입신고와 실제 점유(거주)로 발생하고, 우선변제권은 여기에 확정일자를 더하면 인정됩니다. 임차권등기명령 이전에 이미 이런 권리를 갖춘 임차인이라면, 등기 후 그 권리를 유지한 채 이사할 수 있습니다.
                </p>
                <p className="mt-4">
                  예외: 아직 계약기간이 남아 있거나, 임대인과 보증금 반환에 관해 다툼 없이 정상적으로 진행 중인 경우에는 신청 요건을 갖추지 못할 수 있습니다. 종료·미반환 사실을 명확히 한 뒤 신청해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청 절차는 어떻게 되나요?</h2>
                <p>
                  임차주택 소재지를 관할하는 법원에 임차권등기명령 신청서를 제출하는 것이 시작입니다. 절차를 단계별로 정리하면 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 임차권등기명령 신청 절차</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1. 서류 준비</td>
                        <td className="p-3">임대차계약서, 주민등록등본, 계약 종료 증명 자료</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2. 신청서 제출</td>
                        <td className="p-3">관할 지방법원·지원·시군법원에 접수(임대인 동의 불요)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3. 법원 결정</td>
                        <td className="p-3">요건 심사 후 임차권등기명령 결정</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4. 등기 완료</td>
                        <td className="p-3">등기부에 임차권 등기 기재</td>
                      </tr>
                      <tr>
                        <td className="p-3">5. 이사</td>
                        <td className="p-3">등기 완료 확인 후 이사(권리 유지)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 각 단계의 소요 기간은 법원과 사안에 따라 다릅니다. 특히 신청만 하고 등기가 되기 전에 이사하면 권리를 잃을 수 있으므로, 반드시 4단계 등기 완료를 확인한 뒤 5단계 이사로 넘어가야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이사 시점은 언제로 잡아야 하나요?</h2>
                <p>
                  등기가 실제로 완료된 것을 확인한 다음에 이사해야 안전합니다. 임차권등기명령을 신청했다는 사실만으로는 권리가 보전되지 않고, 등기부에 임차권이 기재되어야 효력이 생기기 때문입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 전세 만기 후 보증금 미반환 상황</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 전세 2년 만기, 임대인이 보증금 3억원을 미반환
                    <br />
                    · 조치: 계약 종료 확인 후 임차권등기명령 신청
                    <br />
                    · 확인: 등기부에 임차권 등기 완료 확인
                    <br />
                    · 이사: 등기 완료 후 새 집으로 이사, 전입신고 이전
                    <br />
                    · 결과: 이사·전입 이전에도 종전 주택의 대항력·우선변제권 유지, 이후 반환청구 절차 진행
                    <br />
                    <span className="text-xs text-text-tertiary">등기 완료 전에 이사·전입을 옮겼다면 대항력이 사라져 위험합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 실제 절차와 필요 서류는 개별 사안마다 다르므로, 금액이 크거나 다툼이 복잡한 경우에는 대한법률구조공단 등 전문기관의 도움을 받는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-tenant-lease-registration-injunction-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임차권등기 후에는 무엇을 해야 하나요?</h2>
                <p>
                  임차권등기는 권리를 지키는 안전장치일 뿐, 그 자체로 보증금을 받아주지는 않습니다. 등기를 마친 뒤에는 실제 보증금을 회수하기 위한 절차를 이어가야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>보증금반환청구 소송·지급명령:</strong> 임대인을 상대로 보증금을 돌려달라는 청구를 진행합니다. 지급명령은 상대적으로 간이한 절차입니다.
                  </li>
                  <li>
                    <strong>강제경매 신청:</strong> 판결이나 집행권원을 확보하면 임차주택을 경매에 부쳐 우선변제권 순위에 따라 배당받을 수 있습니다.
                  </li>
                  <li>
                    <strong>비용 청구:</strong> 임차권등기에 든 비용은 임대인에게 청구할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 임차주택에 선순위 근저당 등 다른 권리가 많으면 경매에서도 보증금 전액을 회수하지 못할 수 있습니다. 계약 전 등기부 확인과 반환보증 가입이 근본적인 예방책입니다.
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
                    <p className="mt-1 text-sm text-text-secondary">보증금을 대신 돌려받는 반환보증 가입 조건.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-right-vs-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세권 설정 vs 확정일자</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 지키는 두 방법의 차이를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">확정일자와 우선변제권</div>
                    <p className="mt-1 text-sm text-text-secondary">전입신고·확정일자로 얻는 우선변제권 원리.</p>
                  </Link>
                  <Link
                    href="/guide/small-tenant-priority-repayment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소액임차인 최우선변제</div>
                    <p className="mt-1 text-sm text-text-secondary">경매 시 소액보증금 우선변제 한도를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 안전 점검</div>
                    <p className="mt-1 text-sm text-text-secondary">계약 전 등기부·시세로 위험을 확인하는 법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금·부동산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">임대차·재산세·양도세 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률 조언이 아닙니다. 실제 신청 요건, 필요 서류, 절차 기간, 비용, 이사 시점 판단은 개별 사안과 관할 법원에 따라 달라지므로 관할 법원, 대한법률구조공단 또는 변호사와 반드시 상담하세요. 본 콘텐츠는 2026-07-26을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>주택임대차보호법 §3의3(임차권등기명령)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.klac.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한법률구조공단</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons
                title="임차권등기명령 2026 가이드"
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
