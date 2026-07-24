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

const URL = 'https://calculatorhost.com/guide/jeonse-right-vs-fixed-date-2026/';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 임차인 보증금 보호 검색 의도 흡수)

export const metadata: Metadata = {
  title: '전세권 설정 vs 확정일자 2026, 뭐가 유리할까 | calculatorhost',
  description:
    '전세권 설정등기와 확정일자+전입신고는 보증금을 지키는 두 방법입니다. 대항력·우선변제권 차이, 비용, 임대인 동의 여부, 상황별 유리한 선택을 민법 §303·주택임대차보호법 §3의2 기준으로 정리했습니다.',
  keywords: [
    '전세권 설정',
    '확정일자 차이',
    '전세권 vs 확정일자',
    '우선변제권',
    '전입신고 대항력',
    '보증금 지키는 법',
    '주택임대차보호법 3조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전세권 설정 vs 확정일자 2026, 뭐가 유리할까' }],
    title: '전세권 설정 vs 확정일자, 보증금 지키는 두 방법',
    description: '대항력·우선변제권 차이, 비용, 임대인 동의, 상황별 유리한 선택까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전세권 설정 vs 확정일자 2026, 유리한 선택 정리',
    description: '대항력·우선변제권 차이, 비용, 동의 여부. 민법 §303·주택임대차보호법 §3의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전세권 설정과 확정일자는 뭐가 다른가요?',
    answer:
      '확정일자는 임대차계약서에 공적 날짜 도장을 받는 것이고, 전세권 설정은 등기부에 전세권을 직접 등록하는 것입니다. 확정일자는 전입신고·점유와 합쳐져야 우선변제권이 생기지만(주택임대차보호법 §3의2), 전세권 등기는 그 자체로 물권이 되어 점유나 전입 없이도 효력이 있습니다(민법 §303). 대신 전세권은 임대인 동의와 등기 비용이 필요합니다.',
  },
  {
    question: '확정일자와 전입신고만으로 보증금을 지킬 수 있나요?',
    answer:
      '대부분의 경우 충분합니다. 주택을 인도받아 점유하고 전입신고를 하면 대항력이 생기고(§3), 여기에 확정일자를 받으면 우선변제권까지 확보됩니다(§3의2). 즉 집이 경매로 넘어가도 후순위 채권자보다 먼저 보증금을 배당받을 수 있습니다. 비용이 거의 들지 않아 일반적인 전월세 세입자가 가장 많이 쓰는 방법입니다.',
  },
  {
    question: '전세권 설정등기는 어떤 점이 더 강력한가요?',
    answer:
      '점유나 전입신고 없이도 물권으로 보호받는다는 점입니다. 전세권은 등기부에 기재되므로 사실상 소유권에 준하는 권리로 인정되고, 임대인이 보증금을 안 주면 전세권에 기해 직접 경매를 신청할 수 있습니다(민법 §318). 회사 사택처럼 실거주·전입이 어려운 경우나 확실한 등기부 공시를 원할 때 유리합니다.',
  },
  {
    question: '나에게는 어느 쪽이 유리한가요?',
    answer:
      '실거주하며 전입신고가 가능한 일반 세입자는 확정일자+전입신고가 비용 대비 효율적입니다. 반면 전입이 곤란하거나(사택·법인 임차), 임대인이 협조적이고 강력한 공시를 원한다면 전세권 설정을 고려하세요. 두 방법을 함께 활용해 이중으로 보호받는 경우도 있습니다.',
  },
  {
    question: '전세권 설정은 임대인 동의가 꼭 필요한가요?',
    answer:
      '네, 전세권 설정등기는 임대인(등기의무자)의 협조가 있어야 합니다. 등기소에 함께 신청해야 하고 임대인의 인감·등기필정보가 필요하기 때문입니다. 반면 확정일자와 전입신고는 임대인 동의 없이 세입자 혼자 처리할 수 있어 실무에서 훨씬 간편합니다.',
  },
  {
    question: '전세권 설정 비용은 얼마나 드나요?',
    answer:
      '전세권 설정등기는 등록면허세, 지방교육세, 등기 수수료, 법무사 대행료 등이 듭니다. 보증금 규모에 따라 수십만원 이상이 될 수 있습니다. 반면 확정일자는 주민센터나 인터넷등기소에서 수수료가 거의 없이 받을 수 있어 비용 차이가 큽니다.',
  },
  {
    question: '전입신고 후 근저당이 잡히면 순위는 어떻게 되나요?',
    answer:
      '먼저 확정일자와 전입신고(점유)를 모두 갖췄다면 그 다음 날 0시부터 대항력이 생기고, 확정일자 순으로 우선변제 순위가 정해집니다. 세입자가 근저당보다 먼저 대항력·확정일자를 갖췄다면 근저당보다 앞선 순위로 배당받습니다. 반대로 근저당이 먼저면 세입자가 후순위가 되므로, 계약 전 등기부의 선순위 권리를 반드시 확인해야 합니다.',
  },
  {
    question: '전세보증금 반환보증과는 어떻게 다른가요?',
    answer:
      '확정일자·전세권이 경매 시 배당 순위를 정하는 장치라면, 전세보증금 반환보증(HUG 등)은 보증기관이 보증금 반환을 책임지는 보험 성격입니다. 순위 확보와 보증 가입은 별개이므로, 확정일자를 받았더라도 안전을 위해 반환보증 가입을 함께 검토하는 것이 좋습니다.',
  },
  {
    question: '이사와 전입신고, 확정일자는 언제 해야 하나요?',
    answer:
      '이사 당일에 전입신고와 확정일자를 함께 처리하는 것이 가장 안전합니다. 대항력은 전입신고 다음 날 0시부터 발생하므로, 그 사이 임대인이 근저당을 설정하면 세입자가 후순위로 밀릴 수 있습니다. 잔금·이사·전입신고·확정일자를 같은 날 마치는 것이 원칙입니다.',
  },
];

export default function JeonseRightVsFixedDate2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전세권 설정 vs 확정일자 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전세권 설정 vs 확정일자 2026, 보증금 지키는 두 방법 완벽 비교',
    description:
      '전세권 설정등기와 확정일자+전입신고의 차이, 비용, 임대인 동의 여부, 상황별 유리한 선택을 민법 §303·주택임대차보호법 §3의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전세권 설정', '확정일자', '우선변제권', '주택임대차보호법', '보증금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전세권 설정 vs 확정일자 2026',
    description: '전세권 설정과 확정일자+전입신고의 차이·비용·상황별 유리한 선택 비교.',
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
                    { name: '전세권 설정 vs 확정일자 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">전월세 임차인 · 8분 읽기 · 2026-07-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전세권 설정 vs 확정일자 2026
                  <br />
                  <span className="text-2xl text-text-secondary">보증금 지키는 두 방법, 뭐가 유리할까</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세·월세 계약을 앞둔 임차인이라면 보증금을 지키는 방법으로 확정일자와 전세권 설정을 두고 고민하게 됩니다. 이 글은 두 방법이 법적으로 어떻게 다른지, 각각 무엇을 준비해야 하는지, 비용과 임대인 동의는 어떻게 다른지, 그리고 내 상황에서 어느 쪽이 유리한지 사례와 함께 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-jeonse-right-vs-fixed-date-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전세권 설정과 확정일자, 뭐가 다른가요?</h2>
                <p>
                  가장 큰 차이는 권리의 성격입니다. 확정일자는 임대차계약서에 공신력 있는 날짜를 남기는 것이고, 전세권 설정은 등기부에 전세권이라는 물권을 직접 등록하는 것입니다.
                </p>
                <p>
                  확정일자는 주택을 점유하고 전입신고를 한 뒤 확정일자를 받아야 비로소 우선변제권이 생깁니다(주택임대차보호법 §3, §3의2). 반면 전세권 등기는 점유나 전입 없이도 그 자체로 효력이 있는 물권입니다(민법 §303). 대신 전세권은 임대인 동의와 등기 비용이 든다는 점이 다릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 확정일자: 전입신고+점유+확정일자 = 대항력+우선변제권, 비용 거의 없음, 임대인 동의 불필요
                    <br />
                    · 전세권 설정: 등기부 등재 물권, 점유·전입 불필요, 임대인 동의·등기 비용 필요
                    <br />
                    · 일반 실거주 세입자는 확정일자, 전입이 어렵거나 강한 공시가 필요하면 전세권
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">확정일자와 전입신고만으로 보증금을 지킬 수 있나요?</h2>
                <p>
                  대부분의 경우 충분합니다. 세 가지가 갖춰지면 경매가 진행돼도 후순위 채권자보다 먼저 보증금을 배당받습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>주택 인도(점유):</strong> 실제로 이사해 거주</li>
                  <li><strong>전입신고:</strong> 다음 날 0시부터 대항력 발생(§3)</li>
                  <li><strong>확정일자:</strong> 우선변제권 확보(§3의2)</li>
                </ul>
                <p className="mt-4">
                  다만 대항력은 전입신고 다음 날 0시부터 생긴다는 점이 함정입니다. 이사·전입신고 당일 임대인이 근저당을 설정하면, 그 근저당이 세입자보다 앞선 순위가 될 수 있습니다. 그래서 잔금·전입·확정일자를 같은 날 마치는 것이 원칙입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전세권 설정등기는 어떤 점이 더 강력한가요?</h2>
                <p>
                  전세권은 물권이라 점유·전입과 무관하게 등기 순위로 보호받습니다. 임대인이 보증금을 돌려주지 않으면 전세권에 기해 직접 경매를 신청할 수 있습니다(민법 §318).
                </p>
                <p>
                  확정일자 방식은 경매에서 배당은 받지만, 경매 자체는 별도의 집행권원(판결 등)이 필요할 수 있습니다. 전세권은 이 절차가 상대적으로 간명합니다. 다만 전세권 설정은 임대인 협조가 필수이고 비용이 들어 실무에서는 확정일자보다 덜 쓰입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="text-sm text-text-secondary">
                    예외: 전세권은 원칙적으로 건물 부분에만 설정되는 경우가 많아, 토지까지 포함한 배당에서 확정일자 방식과 결과가 달라질 수 있습니다. 고액 보증금이라면 전문가 상담이 안전합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">날짜 순서로 보는 우선순위 사례</h2>
                <p>
                  보증금 안전은 결국 날짜 싸움입니다. 아래 사례로 순위가 어떻게 갈리는지 확인해보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 세입자가 먼저인 경우 (안전)</p>
                  <p className="text-sm text-text-secondary">
                    · 3월 2일: 이사+전입신고+확정일자 (보증금 3억)
                    <br />
                    · 3월 3일 0시: 대항력 발생, 확정일자로 우선변제권 확보
                    <br />
                    · 3월 5일: 은행 근저당 설정
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세입자가 근저당보다 앞선 순위. 경매 시 3억을 근저당보다 먼저 배당받습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 근저당이 먼저인 경우 (위험)</p>
                  <p className="text-sm text-text-secondary">
                    · 3월 2일: 은행 근저당 설정 (2억)
                    <br />
                    · 3월 5일: 세입자 이사+전입신고+확정일자 (보증금 3억)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 근저당이 선순위. 경매가 5억이면 은행 2억 먼저, 남은 3억 범위에서 세입자 배당. 낙찰가가 낮으면 보증금 일부를 못 받을 수 있습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 전세권 설정등기</p>
                  <p className="text-sm text-text-secondary">
                    · 3월 2일: 전세권 설정등기 접수 (보증금 3억)
                    <br />
                    · 3월 5일: 은행 근저당 설정
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 전세권 등기 접수일이 근저당보다 빠르므로 선순위. 전입·점유 여부와 무관하게 등기 순위로 보호됩니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-jeonse-right-vs-fixed-date-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비용과 절차는 어떻게 다른가요?</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 확정일자 vs 전세권 설정 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">확정일자+전입신고</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">전세권 설정등기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">권리 성격</td>
                        <td className="p-3">우선변제권(채권적 보호)</td>
                        <td className="p-3">전세권(물권)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">임대인 동의</td>
                        <td className="p-3">불필요</td>
                        <td className="p-3">필요</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">점유·전입 필요</td>
                        <td className="p-3">필요</td>
                        <td className="p-3">불필요</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비용</td>
                        <td className="p-3">거의 없음</td>
                        <td className="p-3">등록면허세·등기·법무사 비용</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">경매 신청</td>
                        <td className="p-3">집행권원 필요할 수 있음</td>
                        <td className="p-3">전세권에 기해 직접 신청 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 확정일자는 반드시 전입신고·점유와 함께여야 효력이 있습니다. 확정일자만 받고 전입신고를 안 하면 우선변제권이 생기지 않으니 주의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">흔한 실수와 주의점</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>계약 전 등기부 미확인:</strong> 선순위 근저당·가압류가 있으면 확정일자를 받아도 후순위입니다. 계약 전 등기부등본을 반드시 확인하세요.
                  </li>
                  <li>
                    <strong>전입신고 지연:</strong> 대항력은 전입신고 다음 날 0시부터입니다. 이사와 전입신고를 미루면 그 틈에 권리가 밀릴 수 있습니다.
                  </li>
                  <li>
                    <strong>확정일자만 받고 전입 누락:</strong> 전입신고·점유 없이 확정일자만으로는 우선변제권이 성립하지 않습니다.
                  </li>
                  <li>
                    <strong>전세권만 믿기:</strong> 전세권은 건물 위주로 설정되는 경우가 있어, 토지 포함 배당에서 불리할 수 있습니다. 상황에 따라 확정일자와 병행을 검토하세요.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대항력·확정일자 우선변제</div>
                    <p className="mt-1 text-sm text-text-secondary">확정일자 우선변제권의 원리를 더 깊이 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-guarantee-insurance-hug-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 반환보증 HUG</div>
                    <p className="mt-1 text-sm text-text-secondary">순위 확보와 별개인 보증 가입을 검토하세요.</p>
                  </Link>
                  <Link
                    href="/guide/small-tenant-priority-repayment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소액임차인 최우선변제</div>
                    <p className="mt-1 text-sm text-text-secondary">소액 보증금의 최우선변제 한도를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 안전 지키기</div>
                    <p className="mt-1 text-sm text-text-secondary">계약부터 반환까지 보증금 지키는 체크리스트.</p>
                  </Link>
                  <Link
                    href="/guide/lease-registration-order-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임차권등기명령</div>
                    <p className="mt-1 text-sm text-text-secondary">이사 나갈 때 대항력 유지하는 방법.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세 전환을 계산해보세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 사건에 대한 법률 자문이 아닙니다. 실제 권리 순위와 배당은 등기부 상태, 선순위 권리, 경매 진행에 따라 달라지므로, 고액 보증금이나 분쟁 우려가 있으면 변호사·법무사 등 전문가와 상담하세요. 본 콘텐츠는 2026-07-25 기준이며, 인용한 법조항은 <strong>민법 §303(전세권의 내용), §318(전세권자의 경매청구권), 주택임대차보호법 §3(대항력), §3의2(보증금의 회수·우선변제권)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(주택임대차보호법)</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>,{' '}
                  <a href="https://www.iros.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">인터넷등기소</a>.
                </p>
              </section>

              <ShareButtons
                title="전세권 설정 vs 확정일자 2026 가이드"
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
