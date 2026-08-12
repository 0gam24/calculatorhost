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

const URL = 'https://calculatorhost.com/guide/lease-renewal-refusal-grounds-2026/';
const DATE_PUBLISHED = '2026-07-31';
const DATE_MODIFIED = '2026-07-31';

export const metadata: Metadata = {
  title: '계약갱신청구권 거절 사유 2026, 집주인 실거주 9가지',
  description:
    '임대인은 주택임대차보호법 §6의3이 정한 9가지 사유가 있을 때만 임차인의 계약갱신 요구를 거절할 수 있습니다. 실거주 거절의 진위 판단, 거짓 거절 시 손해배상, 갱신 요구 기간을 정리했습니다.',
  keywords: [
    '계약갱신청구권 거절 사유',
    '갱신 거절 9가지',
    '집주인 실거주 갱신거절',
    '갱신거절 손해배상',
    '주택임대차보호법 6조의3',
    '계약갱신요구권',
    '전세 갱신 거절',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '계약갱신청구권 거절 사유 2026, 집주인 실거주 9가지' }],
    title: '계약갱신청구권 거절 사유 2026, 9가지 외에는 못 거절한다',
    description: '임대인이 갱신을 거절할 수 있는 9가지 법정 사유와, 실거주를 이유로 한 거짓 거절 시 손해배상.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '계약갱신청구권 거절 사유 2026, 집주인 실거주 9가지',
    description: '9가지 법정 사유 외에는 거절 불가. 주택임대차보호법 §6의3.',
  },
};

const FAQ_ITEMS = [
  {
    question: '집주인이 아무 이유나 대며 갱신을 거절할 수 있나요?',
    answer:
      '아니요. 임대인은 주택임대차보호법 §6의3 제1항이 열거한 9가지 사유가 있을 때만 임차인의 계약갱신 요구를 거절할 수 있습니다. 이 9가지에 해당하지 않으면 어떤 이유로도 거절할 수 없고, 임차인은 1회에 한해 2년 계약을 갱신할 수 있습니다.',
  },
  {
    question: '거절 사유 9가지는 무엇인가요?',
    answer:
      '2기 차임 연체, 거짓·부정한 임차, 상당한 보상을 조건으로 한 합의, 무단 전대, 고의·중과실 파손, 주택 멸실, 철거·재건축, 임대인이나 직계존비속의 실거주, 그 밖에 임차인의 중대한 의무 위반입니다(§6의3①1~9호). 대부분은 임차인의 잘못이거나 주택 사정이며, 실거주만이 임대인 사정에 의한 거절입니다.',
  },
  {
    question: '집주인이 실거주한다며 거절하는데 진짜일까요?',
    answer:
      '실거주를 이유로 한 거절은 임대인이나 그 직계존비속이 실제로 들어와 살아야 유효합니다(§6의3①8호). 임차인은 임대인의 실거주 의사가 진정한지 다툴 수 있고, 법원은 실거주 의사를 엄격하게 판단합니다. 거절 후 실제로 거주하지 않고 다른 사람에게 세를 놓으면 손해배상 책임이 생길 수 있습니다.',
  },
  {
    question: '실거주 거절 후 다른 사람에게 세를 놓으면 어떻게 되나요?',
    answer:
      '임대인이 실거주를 이유로 갱신을 거절해 임차인을 내보낸 뒤, 정당한 사유 없이 제3자에게 임대하면 임차인은 손해배상을 청구할 수 있습니다(§6의3⑤). 갱신되었더라면 유지됐을 기간이 지나기 전에 다른 사람에게 임대한 경우가 대상이며, 배상액은 법이 정한 방식으로 산정합니다.',
  },
  {
    question: '손해배상은 얼마나 되나요?',
    answer:
      '주택임대차보호법 §6의3 제6항은 세 가지 금액 중 큰 금액을 배상액으로 정합니다. ① 거절 당시 환산월차임의 3개월분, ② 임대인이 새 임차인에게 받은 환산월차임과 기존 차액의 2년분, ③ 임차인이 실제로 입은 손해액입니다. 전세는 월차임으로 환산해 계산합니다.',
  },
  {
    question: '언제까지 갱신을 요구해야 하나요?',
    answer:
      '임차인은 계약 만료 6개월 전부터 2개월 전까지 사이에 임대인에게 갱신을 요구해야 합니다(§6의3①). 이 기간을 놓치면 갱신요구권을 행사하지 못할 수 있습니다. 요구는 문자·내용증명 등 증거가 남는 방법으로 하는 것이 안전합니다.',
  },
  {
    question: '2기 차임 연체는 정확히 무슨 뜻인가요?',
    answer:
      '연속이 아니어도 연체된 차임의 합계가 2개월분에 이르면 거절 사유가 됩니다(§6의3①1호). 예를 들어 한 달을 걸러 두 번 연체해 합계가 두 달치가 되면 해당합니다. 연체를 이유로 한 거절을 피하려면 차임 납부를 밀리지 않는 것이 중요합니다.',
  },
];

export default function LeaseRenewalRefusalGrounds2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '계약갱신청구권 거절 사유 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '계약갱신청구권 거절 사유 2026, 집주인 실거주 9가지',
    description:
      '임대인이 임차인의 계약갱신 요구를 거절할 수 있는 9가지 법정 사유. 실거주 거절의 진위 판단, 거짓 거절 시 손해배상, 갱신 요구 기간과 2기 차임 연체 기준까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['계약갱신청구권', '거절 사유', '실거주', '손해배상', '주택임대차보호법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '계약갱신청구권 거절 사유 2026',
    description:
      '임대인이 계약갱신 요구를 거절할 수 있는 9가지 사유와 실거주 거짓 거절 시 손해배상.',
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
                    { name: '계약갱신청구권 거절 사유 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">전월세 임차인 · 8분 읽기 · 2026-07-31</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  계약갱신청구권 거절 사유 2026
                  <br />
                  <span className="text-2xl text-text-secondary">집주인 실거주 포함 9가지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 전세·월세 계약을 연장하려는 임차인을 위한 것입니다. 임대인은 아무 이유로나 갱신을 거절할 수 없고, 법이 정한 9가지 사유가 있을 때만 거절할 수 있습니다. 어떤 사유가 인정되는지, 실거주 거절이 거짓일 때 어떻게 대응하는지, 갱신은 언제까지 요구해야 하는지 순서대로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">집주인이 아무 이유나 대며 거절할 수 있나요?</h2>
                <p>
                  없습니다. 임대인은 주택임대차보호법 §6의3 제1항이 열거한 9가지 사유가 있을 때만 임차인의 계약갱신 요구를 거절할 수 있습니다. 이 9가지에 해당하지 않으면 어떤 이유로도 거절할 수 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">계약갱신요구권 기본 원칙</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 근거: 주택임대차보호법 §6의3
                    <br />
                    · 횟수: 1회에 한해 갱신 요구
                    <br />
                    · 기간: 갱신 시 2년 보장
                    <br />
                    · 거절: 법정 9가지 사유가 있을 때만 가능
                  </p>
                </div>
                <p className="mt-4">
                  다만 임차인이 계약갱신을 요구할 수 있는 것은 1회뿐입니다. 이미 한 번 갱신요구권을 행사해 2년을 연장했다면, 그 다음 만료 시에는 임대인이 별도 사유 없이도 갱신을 거절할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">거절 사유 9가지는 무엇인가요?</h2>
                <p>
                  아래 9가지가 법정 거절 사유입니다(주택임대차보호법 §6의3 제1항 각 호). 대부분 임차인의 잘못이나 주택 사정이고, 임대인 사정에 의한 것은 실거주(8호) 하나입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 계약갱신 거절 법정 사유 (주택임대차보호법 §6의3①)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">호</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">거절 사유</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1호</td>
                        <td className="p-3">차임 연체액이 2기(2개월분)에 이른 경우</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2호</td>
                        <td className="p-3">거짓이나 부정한 방법으로 임차한 경우</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3호</td>
                        <td className="p-3">서로 합의하여 임대인이 상당한 보상을 제공한 경우</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4호</td>
                        <td className="p-3">임대인 동의 없이 주택을 전대(轉貸)한 경우</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5호</td>
                        <td className="p-3">고의나 중대한 과실로 주택을 파손한 경우</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6호</td>
                        <td className="p-3">주택이 멸실되어 임대차 목적을 달성할 수 없는 경우</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">7호</td>
                        <td className="p-3">철거·재건축 계획을 고지하고 이를 실행하는 경우</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">8호</td>
                        <td className="p-3">임대인이나 직계존속·직계비속이 실제 거주하려는 경우</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">9호</td>
                        <td className="p-3">그 밖에 임차인의 의무를 현저히 위반한 중대한 사유</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 7호 철거·재건축은 계획을 구체적으로 고지하고 실제로 실행해야 인정됩니다. 막연히 재건축 예정이라는 주장만으로는 거절 사유가 되지 않으므로, 임차인은 계획의 구체성을 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실거주라며 거절하는데 진짜일까요?</h2>
                <p>
                  실거주를 이유로 한 거절은 임대인이나 그 직계존비속이 실제로 들어와 살아야 유효합니다(§6의3①8호). 법원은 실거주 의사가 진정한지 엄격하게 판단하며, 그 증명 책임은 임대인에게 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>실거주 주체:</strong> 임대인 본인뿐 아니라 직계존속(부모·조부모), 직계비속(자녀·손자녀)도 포함됩니다.
                  </li>
                  <li>
                    <strong>확인 방법:</strong> 임차인은 나간 뒤 2년 이내에 확정일자 부여 현황 등 임대차 정보를 열람해 새 임대차가 있었는지 확인할 수 있습니다.
                  </li>
                  <li>
                    <strong>다툼의 핵심:</strong> 집주인이 정말 들어와 살았는가, 그 의사가 처음부터 진정했는가가 함께 판단됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 임대인이 실거주하다가 예상치 못한 사정으로 짧은 기간만 거주하게 된 경우 등은 개별적으로 판단됩니다. 실거주 거절에 의문이 있으면 나가기 전에 관련 사실을 기록해 두는 것이 대응에 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">거짓 실거주 거절, 손해배상은 얼마인가요?</h2>
                <p>
                  임대인이 실거주를 이유로 갱신을 거절해 임차인을 내보낸 뒤, 정당한 사유 없이 제3자에게 임대하면 임차인은 손해배상을 청구할 수 있습니다(§6의3⑤). 배상액은 다음 세 가지 중 큰 금액입니다(§6의3⑥).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">손해배상액 산정(셋 중 큰 금액)</p>
                  <p className="text-sm text-text-secondary">
                    · ① 거절 당시 환산월차임의 3개월분
                    <br />
                    · ② 새 임차인에게 받은 환산월차임과 기존 차액의 2년분
                    <br />
                    · ③ 임차인이 실제로 입은 손해액
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례. 환산월차임 100만원인 경우</p>
                  <p className="text-sm text-text-secondary">
                    · ① 3개월분 = 100만원 × 3 = <strong>300만원</strong>
                    <br />
                    · ② 새 임차인 환산월차임 150만원이면 차액 50만원 × 24개월 = <strong>1,200만원</strong>
                    <br />
                    · ③ 이사비·중개보수 등 실제 손해 예: 250만원
                    <br />
                    · 배상액 = 셋 중 큰 금액 = <strong>1,200만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">전세는 보증금을 월차임으로 환산해 계산합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  주의: 위 금액은 이해를 돕기 위한 예시입니다. 환산 방식과 실제 손해 인정 범위는 사안마다 다르므로, 분쟁이 생기면 대한법률구조공단이나 주택임대차분쟁조정위원회의 도움을 받으세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/lease-renewal-request-implied-renewal-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">계약갱신요구권과 묵시적 갱신</div>
                    <p className="mt-1 text-sm text-text-secondary">두 갱신의 차이와 중도 해지 통보 규칙.</p>
                  </Link>
                  <Link
                    href="/guide/rent-increase-5-percent-cap-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임대료 5% 상한</div>
                    <p className="mt-1 text-sm text-text-secondary">갱신 시 올릴 수 있는 임대료 한도.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-right-vs-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세권 vs 확정일자</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금 보호 수단의 차이와 선택.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세를 서로 환산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/tenant-lease-registration-injunction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">임차권등기명령</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 못 받을 때 대항력 유지 방법.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세·중개수수료·임대수익률 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 법률 조언이 아닙니다. 계약갱신 거절과 손해배상은 개별 사실관계와 판례에 따라 결론이 달라지므로, 구체적 분쟁은 대한법률구조공단, 주택임대차분쟁조정위원회 또는 변호사와 상담하세요. 본 콘텐츠는 2026-07-31 기준이며 관련 법령은 <strong>주택임대차보호법 §6의3</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.klac.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한법률구조공단</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부</a>.
                </p>
              </section>

              <ShareButtons
                title="계약갱신청구권 거절 사유 2026 가이드"
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
