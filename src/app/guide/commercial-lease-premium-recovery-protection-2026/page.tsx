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

const URL = 'https://calculatorhost.com/guide/commercial-lease-premium-recovery-protection-2026/';
const DATE_PUBLISHED = '2026-07-15';
const DATE_MODIFIED = '2026-07-15';
// 수익 레버 [revenue-lever: indexing+traffic]: 신규 색인 페이지 추가, 롱테일 트래픽 유입

export const metadata: Metadata = {
  title: '상가 권리금 회수기회 보호 2026, 임대인 방해 시 손해배상',
  description:
    '임대인이 정당한 사유 없이 신규임차인과의 계약을 막으면 권리금 손해를 배상해야 합니다. 상가건물임대차보호법 §10의4 권리금 회수기회 보호의 방해금지 행위, 손해배상 한도, 3년 소멸시효를 정리합니다.',
  keywords: [
    '상가 권리금 회수기회 보호',
    '권리금 손해배상',
    '임대인 방해행위',
    '상가임대차보호법 10조의4',
    '신규임차인 주선',
    '권리금 소멸시효',
    '환산보증금 초과 권리금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상가 권리금 회수기회 보호 2026, 임대인 방해 시 손해배상' }],
    title: '상가 권리금 회수기회 보호 2026, 방해하면 손해배상',
    description: '임대차 종료 6개월 전부터 임대인의 권리금 회수 방해 금지. 위반 시 손해배상, 종료일부터 3년 내 청구. 상가임대차보호법 §10의4.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상가 권리금 회수기회 보호 2026',
    description: '임대인이 신규임차인 계약을 막으면 권리금 손해배상. 상가임대차보호법 §10의4, 3년 소멸시효.',
  },
};

const FAQ_ITEMS = [
  {
    question: '권리금 회수기회 보호가 무엇인가요?',
    answer:
      '임차인이 다음 임차인에게 권리금을 받고 나갈 기회를 임대인이 부당하게 막지 못하도록 하는 제도입니다(상가건물임대차보호법 §10의4). 임대차가 끝나기 6개월 전부터 종료 시까지, 임대인은 임차인이 주선한 신규임차인으로부터 임차인이 권리금을 받는 것을 방해해서는 안 됩니다. 위반해 손해가 생기면 임대인이 배상해야 합니다.',
  },
  {
    question: '임대인의 어떤 행동이 방해행위인가요?',
    answer:
      '법은 네 가지 방해행위를 규정합니다(§10의4①). 첫째 임차인이 주선한 신규임차인에게 권리금을 요구하거나 받는 행위, 둘째 신규임차인이 임차인에게 권리금을 지급하지 못하게 하는 행위, 셋째 신규임차인에게 주변 시세에 비추어 현저히 고액의 차임·보증금을 요구하는 행위, 넷째 정당한 사유 없이 임차인이 주선한 신규임차인과의 임대차계약 체결을 거절하는 행위입니다.',
  },
  {
    question: '임대인이 거절해도 되는 정당한 사유가 있나요?',
    answer:
      '있습니다. 신규임차인이 보증금·차임을 지급할 자력이 없거나, 임차인으로서 의무를 위반할 우려가 있거나, 임대인이 임대차 목적물을 1년 6개월 이상 영리 목적이 아닌 용도로 사용하려는 경우 등은 정당한 사유로 인정됩니다(§10의4②). 또한 임차인이 3기분 차임을 연체하는 등 임대인이 계약 갱신을 거절할 수 있는 사유가 있으면 회수기회 보호 자체가 적용되지 않습니다.',
  },
  {
    question: '손해배상은 얼마까지 받을 수 있나요?',
    answer:
      '손해배상액은 신규임차인이 임차인에게 지급하기로 한 권리금과 임대차 종료 당시의 권리금 중 낮은 금액을 넘지 못합니다(§10의4③). 예를 들어 신규임차인과의 권리금 계약액이 5천만원이고 종료 당시 감정 권리금이 4천만원이면, 배상 한도는 낮은 쪽인 4천만원입니다. 실제 인정액은 법원이 구체적 사정을 따져 정합니다.',
  },
  {
    question: '손해배상은 언제까지 청구해야 하나요?',
    answer:
      '임대인에게 손해배상을 청구할 권리는 임대차가 종료한 날부터 3년 이내에 행사하지 않으면 소멸시효로 사라집니다(§10의4④). 따라서 방해행위로 권리금을 회수하지 못했다면, 종료일 기준 3년을 넘기기 전에 반드시 소송 등으로 권리를 행사해야 합니다.',
  },
  {
    question: '보증금이 커서 환산보증금을 초과하는 상가도 보호받나요?',
    answer:
      '네, 권리금 회수기회 보호 규정은 환산보증금이 기준을 초과하는 고액 상가 임대차에도 적용됩니다. 상가건물임대차보호법의 여러 조항은 환산보증금 기준 이하에만 적용되지만, 권리금 회수기회 보호(§10의4)는 환산보증금 초과 임대차에도 준용되므로, 임대료가 높은 상권의 임차인도 보호 대상입니다.',
  },
  {
    question: '10년 계약갱신요구 기간이 끝나도 권리금 보호를 받나요?',
    answer:
      '받을 수 있습니다. 계약갱신요구권(최대 10년)과 권리금 회수기회 보호는 별개의 제도입니다. 대법원 판례는 갱신요구 기간 10년이 지나 더 이상 갱신을 요구할 수 없게 된 임차인에게도 권리금 회수기회 보호가 적용된다고 보았습니다. 다만 개별 사안은 사실관계에 따라 달라질 수 있습니다.',
  },
  {
    question: '권리금 계약과 신규임차인 주선은 어떻게 준비하나요?',
    answer:
      '임차인은 임대차 종료 6개월 전부터 신규임차인을 물색해 권리금 계약을 체결하고, 그 신규임차인을 임대인에게 정식으로 주선해야 보호를 받습니다. 권리금 계약서, 주선 사실을 입증할 문자·내용증명 등 증빙을 남기는 것이 중요합니다. 주선 없이 임대인의 태도만 문제 삼으면 배상 청구가 어려울 수 있습니다.',
  },
];

export default function CommercialLeasePremiumRecoveryProtection2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상가 권리금 회수기회 보호 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상가 권리금 회수기회 보호 2026, 임대인 방해 시 손해배상',
    description:
      '상가건물임대차보호법 §10의4 권리금 회수기회 보호. 임대인의 방해금지 행위, 정당한 사유, 손해배상 한도, 3년 소멸시효를 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상가 권리금', '권리금 회수기회 보호', '손해배상', '상가임대차보호법 10조의4'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상가 권리금 회수기회 보호 2026',
    description:
      '상가 임차인의 권리금 회수기회를 보호하는 상가건물임대차보호법 §10의4의 방해금지, 손해배상, 소멸시효 정리.',
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
                    { name: '상가 권리금 회수기회 보호 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상가 임차인·자영업자 · 8분 읽기 · 2026-07-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상가 권리금 회수기회 보호 2026
                  <br />
                  <span className="text-2xl text-text-secondary">임대인 방해 시 손해배상 청구</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  장사를 접거나 옮길 때 임차인이 다음 사람에게 권리금을 받고 나가는 것은 자영업자의 중요한 자산 회수 수단입니다. 그런데 임대인이 신규임차인과의 계약을 막아 권리금을 못 받게 만드는 일이 종종 벌어집니다. 이 가이드는 상가건물임대차보호법 §10의4에 따라 임대인의 어떤 행동이 금지되는지, 손해배상은 얼마까지 받는지, 언제까지 청구해야 하는지를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-commercial-lease-premium-recovery-protection-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">권리금 회수기회 보호란 무엇인가요?</h2>
                <p>
                  권리금 회수기회 보호는 임차인이 신규임차인에게 권리금을 받고 나갈 기회를 임대인이 부당하게 방해하지 못하게 하는 제도입니다(상가건물임대차보호법 §10의4). 임대차가 끝나기 6개월 전부터 종료 시까지가 보호 기간입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 보호 기간: 임대차 종료 6개월 전부터 종료 시까지
                    <br />
                    · 보호 대상: 임차인이 주선한 신규임차인으로부터 받는 권리금
                    <br />
                    · 위반 효과: 임대인의 손해배상 책임
                    <br />
                    · 근거: 상가건물임대차보호법 §10의4
                  </p>
                </div>
                <p className="mt-4">
                  즉 임차인이 스스로 다음 임차인을 구해 권리금 계약을 맺고 이를 임대인에게 주선하면, 임대인은 정당한 사유 없이 이를 막을 수 없습니다.
                </p>
                <p className="mt-4">
                  다만 이 보호는 임차인이 신규임차인을 실제로 주선했을 때 작동합니다. 아무도 주선하지 않은 채 임대인의 태도만 문제 삼으면 방해행위를 입증하기 어렵습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임대인의 어떤 행동이 금지되나요?</h2>
                <p>
                  법이 정한 네 가지 방해행위는 다음과 같습니다(§10의4①). 하나라도 해당하면 방해행위가 될 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 임대인의 권리금 방해행위 4유형 (상가임대차보호법 §10의4①)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1호</td>
                        <td className="p-3">신규임차인에게 권리금을 요구하거나 받는 행위</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2호</td>
                        <td className="p-3">신규임차인이 임차인에게 권리금 지급을 못하게 막는 행위</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3호</td>
                        <td className="p-3">신규임차인에게 현저히 고액의 차임·보증금 요구</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4호</td>
                        <td className="p-3">정당한 사유 없이 신규임차인과의 계약 체결 거절</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 임대인에게 정당한 사유가 있으면 거절이 허용됩니다. 신규임차인의 지급 능력이 없거나, 임대인이 목적물을 1년 6개월 이상 비영리로 사용하려는 경우 등이 그 예입니다(§10의4②).
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 사례로 보면 어떻게 되나요?</h2>
                <p>
                  방해행위가 인정되는 경우와 그렇지 않은 경우를 사례로 비교합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 임대인이 신규임차인 계약을 거절 (방해 인정)</p>
                  <p className="text-sm text-text-secondary">
                    · 임차인이 신규임차인과 권리금 5천만원 계약 후 임대인에게 주선
                    <br />
                    · 임대인이 정당한 사유 없이 계약 체결 거절
                    <br />
                    · 종료 당시 감정 권리금: 4천만원
                    <br />
                    · 손해배상 한도: min(5천만원, 4천만원) = <strong>4천만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 신규 계약액과 종료 당시 권리금 중 낮은 금액이 배상 한도입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 임대인이 현저히 고액 차임 요구 (방해 인정)</p>
                  <p className="text-sm text-text-secondary">
                    · 주변 시세 월 300만원인데 임대인이 신규임차인에게 월 600만원 요구
                    <br />
                    · 신규임차인이 부담을 못 이겨 계약 포기
                    <br />
                    · 임차인이 권리금 회수 실패 → 3호 방해행위로 손해배상 대상
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 시세 대비 현저히 높은 차임 요구도 방해행위가 됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 임차인이 차임 3기분 연체 (보호 배제)</p>
                  <p className="text-sm text-text-secondary">
                    · 임차인이 3기에 해당하는 차임을 연체한 상태
                    <br />
                    · 임대인은 계약 갱신을 거절할 수 있는 사유 보유
                    <br />
                    · 이 경우 권리금 회수기회 보호가 적용되지 않음
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 임차인에게 갱신거절 사유가 있으면 보호를 받지 못합니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-commercial-lease-premium-recovery-protection-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임차인은 어떻게 대응해야 하나요?</h2>
                <p>
                  권리금 회수기회 보호를 실제로 활용하려면 임차인이 절차와 증빙을 갖추는 것이 핵심입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>기간 확인:</strong> 임대차 종료 6개월 전부터 신규임차인을 물색하고 권리금 계약을 준비합니다.
                  </li>
                  <li>
                    <strong>정식 주선:</strong> 신규임차인을 임대인에게 정식으로 주선하고, 그 사실을 문자·내용증명 등으로 남깁니다.
                  </li>
                  <li>
                    <strong>증빙 확보:</strong> 권리금 계약서, 감정평가, 임대인의 거절·고액 요구 정황을 기록합니다.
                  </li>
                  <li>
                    <strong>기한 내 청구:</strong> 방해로 손해가 생기면 임대차 종료일부터 3년 이내에 손해배상을 청구합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 권리금 분쟁은 사실관계와 입증이 복잡해 법률 전문가의 조력이 필요한 경우가 많습니다. 대한법률구조공단이나 상가건물임대차분쟁조정위원회의 도움을 받는 것도 방법입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/commercial-building-lease-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상가임대차 환산보증금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">환산보증금 기준과 어떤 보호를 받는지 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/lease-renewal-request-implied-renewal-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">계약갱신요구권·묵시적 갱신</div>
                    <p className="mt-1 text-sm text-text-secondary">임대차 갱신과 거절 사유의 기본을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세 전환율을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">개인사업자 등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">창업 시 사업자 등록과 업종 선택을 안내합니다.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 부가세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">소규모 자영업자의 부가가치세 부담을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">중개수수료·전월세·임대수익률 계산기.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개별 사건에 대한 법률 자문이 아닙니다. 권리금 분쟁은 구체적 사실관계와 입증에 따라 결과가 달라지므로, 실제 대응은 변호사·대한법률구조공단·상가건물임대차분쟁조정위원회 등 전문 기관의 도움을 받으세요. 본 콘텐츠는 2026-07-15 기준으로 작성되었으며, 법령·판례 변경 시 업데이트됩니다. 인용 법조항은 <strong>상가건물 임대차보호법 §10의4(권리금 회수기회 보호 등), §10(계약갱신 요구 등)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>,{' '}
                  <a href="https://www.klac.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한법률구조공단</a>.
                </p>
              </section>

              <ShareButtons
                title="상가 권리금 회수기회 보호 2026 가이드"
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
