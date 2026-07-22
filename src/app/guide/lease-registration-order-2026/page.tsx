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

const URL = 'https://calculatorhost.com/guide/lease-registration-order-2026/';
const DATE_PUBLISHED = '2026-07-11';
const DATE_MODIFIED = '2026-07-11';

export const metadata: Metadata = {
  title: '임차권등기명령 2026 | 임대차 종료 후 보증금 못 받았을 때 대항력 유지법',
  description:
    '보증금 미반환 시 임차인 단독 신청 가능한 임차권등기명령. 신청 요건, 절차, 효과(대항력·우선변제권 유지) 및 2023년 개정(전 송달 집행) 정리. 주택임대차보호법 3조의3.',
  keywords: [
    '임차권등기명령',
    '임대차 종료',
    '보증금 미반환',
    '주택임대차보호법 3조의3',
    '대항력 유지',
    '우선변제권',
    '전세사기 대응',
    '전월세 보호',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '임차권등기명령 2026 | 임대차 종료 후 보증금 못 받았을 때 대항력 유지법' }],
    title: '임차권등기명령 2026, 보증금 못 받고 이사할 때 대항력 유지 법',
    description: '임대차 끝나고 보증금을 반환받지 못했다면 법원 임차권등기명령 신청으로 대항력과 우선변제권 유지. 절차와 효과를 완벽 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '임차권등기명령 2026, 보증금 못 받으면 대항력 유지하는 법',
    description: '임대차 끝난 후 보증금을 못 받았다면 임차권등기명령으로 이사 후에도 대항력 유지 가능. 주택임대차보호법 3조의3.',
  },
};

const FAQ_ITEMS = [
  {
    question: '임차권등기명령이 정확히 무엇인가요?',
    answer:
      '임차권등기명령은 임대차가 끝났는데도 보증금을 받지 못한 임차인이 법원에 신청하여 등기부에 임차권을 기록하는 제도입니다(주택임대차보호법 §3의3). 등기가 완료되면 임차인이 이사를 하더라도 이미 취득한 대항력과 우선변제권이 유지되어, 나중에 보증금을 돌려받을 때 다른 채권자보다 우선적으로 변제받을 수 있습니다.',
  },
  {
    question: '임차권등기명령을 받기 위한 요건은 무엇인가요?',
    answer:
      '주요 요건은 다음과 같습니다(주택임대차보호법 §3의3). 첫째, 임대차가 종료되었어야 하고, 둘째, 보증금(전세금 또는 월세 보증금)을 받지 못했으며, 셋째, 임차인이 관할 법원에 신청해야 합니다. 신청할 때는 임대차계약서와 보증금 미반환을 증명하는 자료(송금 기록 등)를 준비해야 하며, 일반적으로 분쟁이 있는 경우 임대인이 반박할 기회도 주어집니다.',
  },
  {
    question: '임차권등기명령 신청 후 얼마나 오래 걸리나요?',
    answer:
      '법원 사건의 종류와 복잡도에 따라 다르지만, 보통 신청 후 1개월에서 3개월 사이에 결정이 나옵니다. 임대인이 이의를 제기하거나 분쟁이 크면 더 오래 걸릴 수 있습니다. 중요한 것은 임차권등기명령 결정을 받은 후 바로 관할 시·군·구청 부동산등기소에 등기를 마쳐야 대항력과 우선변제권이 발생한다는 점입니다.',
  },
  {
    question: '임차권등기명령이 나면 정말 이사 후에도 우선변제권이 유지되나요?',
    answer:
      '네, 그것이 임차권등기명령의 핵심 효과입니다(주택임대차보호법 §3의3⑤). 등기가 완료된 후에는 임차인이 주민등록을 이전하고 이사를 가더라도 이미 취득한 대항력과 우선변제권이 사라지지 않습니다. 만약 임차인이 등기 완료 전에 이사하면 대항력을 상실할 수 있으므로, 반드시 등기 완료 후에 이사해야 합니다.',
  },
  {
    question: '임차권등기명령과 확정일자는 어떻게 다른가요?',
    answer:
      '확정일자는 임대차 기간 중 임차인이 계약서를 들고 시·군·구청에 신청하여 대항력을 얻는 제도이고, 임차권등기명령은 임대차가 끝난 후 보증금 미반환 시 법원 판단으로 대항력을 유지하는 제도입니다. 확정일자는 선제적 대비, 임차권등기명령은 사후 구제라고 생각하면 됩니다. 둘 다 중요하므로, 입주 직후 확정일자를 받고, 퇴거 후 보증금 분쟁 시 임차권등기명령을 신청하는 것이 최적의 보호 전략입니다.',
  },
  {
    question: '2023년 개정이 무엇인가요?',
    answer:
      '2023년 7월 19일 개정으로, 임차권등기명령 결정을 임대인에게 고지(송달)하기 전에도 집행할 수 있게 되었습니다(주택임대차보호법 §3의3④ 개정). 이는 임대인이 의도적으로 송달을 피하거나 등기 말소를 시도하는 것을 방지하여 임차인 보호를 크게 강화했습니다. 전세사기 사건이 늘어나자 정부가 신속한 보호 장치로 도입한 것입니다.',
  },
  {
    question: '임차권등기명령 신청 비용이 얼마나 드나요?',
    answer:
      '법원 신청 비용(인지)은 보증금 규모에 따라 다르지만 보통 수만원에서 수십만원 수준입니다. 또한 등기소에서 임차권등기 등록 수수료도 내야 합니다. 다만 임차권등기명령 결정이 났을 때 관할 법원은 신청 비용을 임대인에게 부담하도록 명령할 수 있으므로, 최종적으로 임차인이 비용을 모두 지출하지 않을 수도 있습니다. 자세한 비용은 관할 법원에 문의하세요.',
  },
  {
    question: '월세 보증금도 임차권등기명령 대상인가요?',
    answer:
      '네, 월세 임대차의 보증금(계약금 또는 보증금)도 임차권등기명령의 대상입니다(주택임대차보호법 §3의3). 전세금뿐 아니라 월세 형태의 임대차에서도 임대인이 보증금을 반환하지 않았다면 임차인은 임차권등기명령을 신청할 수 있습니다. 다만 월세의 경우 전세금보다 보증금 규모가 작아 실제 분쟁이 적은 편입니다.',
  },
];

export default function LeaseRegistrationOrder2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '임차권등기명령 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '임차권등기명령 2026, 임대차 종료 후 보증금 못 받았을 때 대항력 유지 방법',
    description:
      '보증금 미반환 시 임차인 단독 신청 가능한 임차권등기명령. 신청 요건, 절차, 효과와 2023년 개정(전 송달 집행)으로 강화된 보호 장치까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['임차권등기명령', '보증금', '대항력', '우선변제권', '전세사기'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '임차권등기명령 2026',
    description:
      '임대차 종료 후 보증금 미반환 시 임차인이 법원 신청으로 대항력과 우선변제권을 유지하는 임차권등기명령 제도의 완벽 가이드.',
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
                <p className="mb-2 text-caption text-text-tertiary">임차인 보호 · 10분 읽기 · 2026-07-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  임차권등기명령 2026
                  <br />
                  <span className="text-2xl text-text-secondary">: 보증금 못 받고 이사할 때 대항력 유지하는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  임대차가 끝나고 집에서 나가야 하는데 임대인이 보증금을 돌려주지 않는 경우가 있습니다. 더 위험한 것은 그대로 이사를 가면 기존에 얻었던 대항력을 잃을 수 있다는 것입니다. 다행히 법원의 임차권등기명령 제도를 통해 이사 후에도 대항력과 우선변제권을 유지하고 보증금을 우선적으로 돌려받을 수 있습니다. 이 가이드에서는 임차권등기명령의 요건, 신청 절차, 효과, 그리고 2023년 개정으로 강화된 보호 방식까지 완벽하게 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-lease-registration-order-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임차권등기명령이란</h2>
                <p>
                  임차권등기명령은 임대차가 종료된 후 보증금(전세금 또는 월세 보증금)을 받지 못한 임차인이 법원에 신청하여 등기부에 임차권을 기록하는 제도입니다(주택임대차보호법 §3의3). 이 등기를 통해 임차인은 이미 취득했던 대항력과 우선변제권을 이사 후에도 유지할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">임차권등기명령의 핵심 효과</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    임차인이 이사를 가서 주민등록을 이전해도 보증금 채권에 대한 <strong>대항력(임대인의 새 채권자에 대한 우위)</strong>과 <strong>우선변제권(파산·경매 시 우선 배분)</strong>이 등기를 통해 보호됩니다.
                    <br />
                    따라서 나중에 임대인이 파산하거나 주택이 경매되더라도 보증금을 우선적으로 돌려받을 가능성이 높아집니다.
                  </p>
                </div>
                <p className="mt-4">
                  전세사기가 늘어나면서 임차인들의 보증금 손실이 커지자, 정부는 이 제도를 통해 임차인을 적극 보호하고 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임차권등기명령의 요건과 신청 절차</h2>
                <p>
                  임차권등기명령을 신청하려면 특정 요건을 충족해야 하며, 절차를 단계별로 따라야 합니다(주택임대차보호법 §3의3).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1단계. 요건 확인</p>
                  <p className="text-sm text-text-secondary">
                    · 임대차계약이 종료되었는가 (기한 만료 또는 합의 해지)
                    <br />
                    · 보증금을 받지 못했는가 (전세금 또는 월세 보증금 전부 또는 일부)
                    <br />
                    · 임차인이 단독으로 신청하는가 (법률 대리인 또는 직접 모두 가능)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2단계. 관할 법원 확인 및 신청</p>
                  <p className="text-sm text-text-secondary">
                    · 관할 법원: 임차주택이 소재한 지역의 지방법원 또는 시·군 단위 법원
                    <br />
                    · 신청 서류: 임대차계약서 사본, 신청서, 보증금 미반환 증명 자료(송금 기록, 부동산 중개 기록, 임대인 연락 기록 등)
                    <br />
                    · 신청 수수료: 보증금 규모에 따라 수만원~수십만원대 (법원마다 상이, 사전 문의 권장)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3단계. 법원 심사 및 결정</p>
                  <p className="text-sm text-text-secondary">
                    · 법원이 제출한 서류와 증거를 검토
                    <br />
                    · 필요시 임대인에게 이의 제기 기회 부여 (일반적으로 분쟁 과정)
                    <br />
                    · 법원이 임차권등기명령 결정을 내림 (보통 1개월~3개월 소요)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">4단계. 등기소에 임차권 등기</p>
                  <p className="text-sm text-text-secondary">
                    · 법원 결정을 받은 후 임차인이 직접 관할 시·군·구청 부동산등기소에 신청
                    <br />
                    · 등기 수수료 납부 (보통 수만원)
                    <br />
                    · 등기부에 "임차권등기" 기록 → <strong>이 시점부터 대항력과 우선변제권 발생</strong>
                  </p>
                </div>
                <p className="mt-4">
                  다만 등기 완료 전에 주민등록을 이전하고 이사하면 대항력을 상실하므로, 반드시 임차권등기가 완료된 후에 이사해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2023년 개정으로 강화된 보호 조치</h2>
                <p>
                  2023년 7월 19일 주택임대차보호법 개정으로 임차권등기명령의 효력이 더욱 강해졌습니다. 특히 임대인의 의도적 회피 행위를 차단하는 조치가 추가되었습니다(주택임대차보호법 §3의3④).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">개정 내용: 송달 전 집행 가능</p>
                  <p className="text-sm text-text-secondary">
                    개정 전: 법원이 임차권등기명령 결정을 임대인에게 송달(고지)한 후에야 집행 가능
                    <br />
                    개정 후: 법원 결정이 나면 임대인에게 고지하기 전에도 바로 등기 집행 가능
                    <br />
                    효과: 임대인이 의도적으로 연락을 피하거나 등기 말소를 시도하는 것을 원천 차단
                  </p>
                </div>
                <p className="mt-4">
                  이 개정은 전세사기 피해가 늘어나자 정부가 임차인을 신속하게 보호하기 위해 도입한 것입니다. 덕분에 임차인이 법원 결정만 받으면 임대인의 반발에 관계없이 등기를 마칠 수 있게 되었습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대항력과 우선변제권의 의미</h2>
                <p>
                  임차권등기명령으로 보호되는 대항력과 우선변제권은 구체적으로 어떤 의미일까요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">대항력 (對抗力)</p>
                  <p className="text-sm text-text-secondary">
                    이사 후에도 주택이 제3자에게 매매되거나 새로운 임차인이 들어오는 경우, 임차인이 이전의 임대차 관계에 기반한 권리를 주장할 수 있는 능력입니다.
                    <br />
                    쉽게 말해, 집주인이 바뀌어도 "나는 이 집에서 이 기간 동안 살았고 보증금을 못 받았다"는 권리를 유지하는 것입니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">우선변제권 (優先辨濟權)</p>
                  <p className="text-sm text-text-secondary">
                    임대인이 파산하거나 주택이 경매에 넘어가는 경우, 보증금 채권이 다른 채권자들(은행, 신용카드사 등)보다 먼저 배분받을 수 있는 권리입니다.
                    <br />
                    예를 들어 1억 원 보증금을 못 받았는데 임대인이 파산했다면, 우선변제권으로 경매 대금에서 우선적으로 돌려받을 수 있습니다.
                  </p>
                </div>
                <p className="mt-4">
                  이 두 권리가 등기를 통해 확보되면, 보증금을 돌려받을 가능성이 크게 높아집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임차권등기명령 vs 확정일자 vs 전세권</h2>
                <p>
                  임차인 보호 제도가 여러 가지인데, 각각 어떻게 다른지 구분이 필요합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 임차인 보호 제도 비교 (주택임대차보호법 §3, §3의2, §3의3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신청 시점</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신청 대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">효과</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>확정일자</strong> (§3)</td>
                        <td className="p-3">임대차 기간 중</td>
                        <td className="p-3">시·군·구청</td>
                        <td className="p-3">대항력 취득 (이사 후 상실)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>임차권등기명령</strong> (§3의3)</td>
                        <td className="p-3">임대차 종료 후</td>
                        <td className="p-3">법원 + 등기소</td>
                        <td className="p-3">대항력·우선변제권 유지 (이사 후에도 유지)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>전세권설정</strong> (§3의2)</td>
                        <td className="p-3">계약 시 합의</td>
                        <td className="p-3">등기소</td>
                        <td className="p-3">우선변제권 (부동산 경매 시 우선 배분)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  정리하면, 확정일자는 입주 직후 선제적으로 받는 것이 좋고, 임차권등기명령은 퇴거 후 보증금 분쟁 시 법원을 통한 사후 구제이며, 전세권설정은 원래 계약 단계에서 합의해야 하는 제도입니다.
                </p>
              </section>

              <AdSlot slot="guide-lease-registration-order-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">실제 사례와 주의사항</h2>
                <p>
                  임차권등기명령이 얼마나 도움이 되는지 사례를 통해 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 등기 완료 전 이사 가는 경우 (위험)</p>
                  <p className="text-sm text-text-secondary">
                    · 임차인이 임차권등기명령 신청 후 결정을 받음
                    <br />
                    · 그런데 등기소 등록을 아직 안 했거나 한 지 얼마 안 돼 주민등록 이전
                    <br />
                    · 결과: 대항력 상실, 보증금 우선변제권만 남음 (우선변제권은 경매 시에만 효력)
                    <br />
                    <span className="text-xs text-text-tertiary">교훈: 반드시 임차권등기가 완료된 후에 이사하세요.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 등기 완료 후 이사 하는 경우 (정상)</p>
                  <p className="text-sm text-text-secondary">
                    · 임차권등기명령을 받고 등기소에 등기 완료
                    <br />
                    · 등기부에 "임차권등기" 기록됨 → 대항력·우선변제권 발생
                    <br />
                    · 임차인이 안심하고 주민등록 이전 및 이사
                    <br />
                    · 나중에 집주인이 바뀌거나 파산해도 보증금 권리 유지
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 보증금 돌려받을 가능성 크게 높음.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 아무리 임차권등기명령이 있어도 임대인이 정말로 돈이 없으면 돌려받지 못할 수 있습니다. 임차권등기명령은 우선순위를 보장하는 것이지, 없는 돈을 만들어주는 것은 아닙니다. 따라서 가능하면 계약 단계에서 임차인이 확정일자나 전세권설정을 받고, 지속적으로 임대인의 재정 상태를 모니터링하는 것이 가장 좋은 예방책입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임차권등기명령 신청 시 체크리스트</h2>
                <p>
                  임차권등기명령을 신청하기 전에 다음 항목을 확인하세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>임대차가 종료되었는가:</strong> 계약 기간이 끝났거나 양쪽이 해지에 합의했는가.
                  </li>
                  <li>
                    <strong>보증금을 못 받았는가:</strong> 전세금, 월세 보증금, 또는 그 일부를 받지 못했는가.
                  </li>
                  <li>
                    <strong>증거를 준비했는가:</strong> 임대차계약서 사본, 송금 기록, 카톡·메일 등 미반환 요청 기록.
                  </li>
                  <li>
                    <strong>관할 법원을 확인했는가:</strong> 임차주택이 있는 지역의 지방법원 또는 시·군 단위 법원.
                  </li>
                  <li>
                    <strong>신청 비용을 준비했는가:</strong> 법원 수수료 + 등기소 수수료 (사전 문의 권장).
                  </li>
                  <li>
                    <strong>등기 완료까지 이사를 안 했는가:</strong> 임차권등기가 완료될 때까지 주민등록 이전을 미루세요.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전세금 반환 채무자 확인 및 소송 검토</h2>
                <p>
                  임차권등기명령 외에도 보증금을 돌려받기 위한 추가 수단이 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1. 전세금반환보증보험 확인</p>
                  <p className="text-sm text-text-secondary">
                    일부 전세 계약에는 임대인 파산 시를 대비한 보증보험이 들어있을 수 있습니다. 계약서를 확인하고 보험사에 청구할 수 있는지 문의하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2. 부동산 중개사무소 책임 추궁</p>
                  <p className="text-sm text-text-secondary">
                    임대인의 보증금 반환 능력이 확실하지 않았다면 부동산 중개사무소에 책임을 물을 수 있습니다(부동산거래관련 법률).
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3. 민사소송 제기</p>
                  <p className="text-sm text-text-secondary">
                    임차권등기명령이 나도 임대인이 반응하지 않으면 직접 민사소송을 제기하여 보증금 반환 판결을 받고 강제집행할 수 있습니다.
                  </p>
                </div>
                <p className="mt-4">
                  임차권등기명령은 보증금 반환을 강제하는 직접적 수단은 아니지만, 우선순위를 확보하는 방패막이 역할을 합니다. 추가 조치가 필요하면 법률 전문가와 상담하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세 보증금 안전 수칙</div>
                    <p className="mt-1 text-sm text-text-secondary">임대차 시작부터 종료까지 보증금 보호 전략 완벽 가이드.</p>
                  </Link>
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">확정일자 대항력과 우선변제권</div>
                    <p className="mt-1 text-sm text-text-secondary">입주 직후 시·군·구청 확정일자 신청의 중요성.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-loan-limit-interest-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세자금대출 한도와 이자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세 보증금이 모자랄 때 주거래금융기관 대출 활용법.</p>
                  </Link>
                  <Link
                    href="/guide/rent-conversion-rate-2026-housing-lease-act/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환율 상한 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주택임대차보호법 월세 전환 시 정부 상한율 규정.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환율 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세를 서로 변환 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">임대료·양도세·취득세·중개수수료 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률 조언이 아닙니다. 임차권등기명령의 정확한 신청 요건, 절차, 비용, 효과는 관할 법원에 문의하거나 변호사·법무사와 상담하세요. 특히 복잡한 전세사기 사건이나 다중 채무 상황에서는 법률 전문가 도움이 필수입니다. 본 콘텐츠는 2026-07-11을 기준으로 작성되었으며, 주택임대차보호법 개정 시 즉시 업데이트됩니다. 임차권등기명령 제도의 정확한 기준은 <strong>주택임대차보호법 §3의3(임차권등기명령), 2023년 7월 19일 개정</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.scourt.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대법원 전자민원</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령</a>.
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
