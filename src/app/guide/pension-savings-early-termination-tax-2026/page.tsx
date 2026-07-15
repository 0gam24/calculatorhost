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

// 수익 레버 [revenue-lever: indexing+traffic]: 신규 색인 페이지 추가, 롱테일 트래픽 유입
const URL = 'https://calculatorhost.com/guide/pension-savings-early-termination-tax-2026/';
const DATE_PUBLISHED = '2026-07-16';
const DATE_MODIFIED = '2026-07-16';

export const metadata: Metadata = {
  title: '연금저축 중도해지 세금 2026, 기타소득세 16.5% 폭탄 피하기',
  description:
    '연금저축·IRP를 중도해지하면 세액공제 받은 원금과 운용수익에 기타소득세 16.5%가 붙습니다. 소득세법 §59의3 기준 과세 구조와 부득이한 사유 저율과세(3.3~5.5%)를 사례로 정리합니다.',
  keywords: [
    '연금저축 중도해지 세금',
    'IRP 해지 기타소득세',
    '연금저축 해지 16.5%',
    '연금외수령 세금',
    '부득이한 사유 연금',
    '소득세법 59조의3',
    '연금계좌 세액공제 추징',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연금저축 중도해지 세금 2026, 기타소득세 16.5% 폭탄 피하기' }],
    title: '연금저축 중도해지 세금 2026, 기타소득세 16.5%의 진실',
    description: '세액공제 받은 원금과 수익에 16.5% 기타소득세. 부득이한 사유면 3.3~5.5% 저율과세. 소득세법 §59의3.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연금저축 중도해지 세금 2026, 기타소득세 16.5% 폭탄 피하기',
    description: '세액공제 받은 원금·수익에 16.5%. 부득이한 사유면 연금소득세율 3.3~5.5%로 낮아집니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '연금저축을 중도해지하면 세금이 얼마나 나오나요?',
    answer:
      '세액공제를 받은 납입원금과 운용수익에 기타소득세 16.5%가 부과됩니다. 이는 소득세 15%에 지방소득세 1.5%(소득세의 10%)를 더한 세율로, 다른 소득과 합산하지 않고 분리과세됩니다. 예를 들어 과세대상 금액이 2,300만원이면 세금은 약 379만원입니다.',
  },
  {
    question: '왜 세액공제를 받은 만큼 세금을 다시 내야 하나요?',
    answer:
      '연금으로 받는 것을 전제로 세제 혜택을 줬기 때문입니다. 연금계좌는 납입할 때 세액공제(소득세법 §59의3)를 해주는 대신, 55세 이후 연금 형태로 수령하도록 설계돼 있습니다. 중도에 목돈으로 찾으면 이 전제가 깨지므로, 앞서 받은 혜택을 기타소득세로 정산하는 구조입니다.',
  },
  {
    question: '세액공제를 안 받은 돈도 세금이 붙나요?',
    answer:
      '세액공제를 받지 않은 납입원금은 과세 대상이 아닙니다. 한도를 넘겨 납입했거나 세액공제를 신청하지 않은 원금은 이미 세금을 낸 돈이므로 중도해지해도 기타소득세가 붙지 않습니다. 다만 그 원금에서 발생한 운용수익은 과세 대상입니다.',
  },
  {
    question: '부득이한 사유면 세금이 줄어드나요?',
    answer:
      '연금소득세율 3.3~5.5%로 크게 낮아집니다. 가입자의 사망·해외이주, 3개월 이상의 요양, 파산·개인회생, 천재지변 등 소득세법 시행령이 정한 부득이한 사유로 인출하면, 16.5% 대신 연령별 연금소득세율이 적용됩니다. 이 경우 증빙을 갖춰 금융회사에 신청해야 합니다.',
  },
  {
    question: '해지 대신 다른 방법은 없나요?',
    answer:
      '납입중지, 납입유예, 담보대출을 먼저 검토하세요. 목돈이 급하게 필요할 때 계좌를 아예 해지하면 세제 혜택과 노후 재원을 한 번에 잃습니다. 대부분의 연금저축·IRP는 납입을 잠시 멈추거나 계좌를 담보로 대출받는 기능이 있어, 해지 없이 위기를 넘길 수 있습니다.',
  },
  {
    question: '일부만 인출할 수도 있나요?',
    answer:
      '연금저축은 부분 인출이 가능하지만 과세 순서에 주의해야 합니다. 인출 시에는 세액공제를 받지 않은 원금이 먼저 빠져나가고, 그다음 세액공제 받은 원금과 운용수익 순으로 인출된 것으로 봅니다. 따라서 소액을 인출하면 비과세 재원부터 소진되어 당장 세금이 없을 수 있으나, 노후 재원이 줄어드는 점은 같습니다.',
  },
  {
    question: 'IRP도 연금저축과 세금이 같나요?',
    answer:
      'IRP도 연금계좌라 중도해지 시 기타소득세 16.5%가 동일하게 적용됩니다. 다만 IRP는 법정 사유가 아니면 일부 인출이 제한되어, 사실상 전액 해지만 가능한 경우가 많습니다. 회사가 적립한 퇴직급여가 섞여 있으면 과세 방식이 더 복잡하므로 금융회사에 정확히 확인하세요.',
  },
  {
    question: '중도해지한 뒤 다시 가입하면 세금을 돌려받나요?',
    answer:
      '돌려받지 못합니다. 한 번 해지해 기타소득세를 내면 그 세금은 환급되지 않으며, 재가입해도 과거 가입기간과 세제 혜택은 복원되지 않습니다. 실질과세 원칙(국세기본법 §14)상 이미 완료된 인출 거래는 되돌릴 수 없으므로, 해지는 대안을 모두 검토한 뒤 최후에 결정해야 합니다.',
  },
];

export default function PensionSavingsEarlyTerminationTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연금저축 중도해지 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연금저축 중도해지 세금 2026, 기타소득세 16.5%의 진실',
    description:
      '연금저축·IRP 중도해지 시 세액공제 받은 원금과 운용수익에 붙는 기타소득세 16.5%의 과세 구조와, 부득이한 사유 저율과세(3.3~5.5%)를 사례로 정리. 소득세법 §59의3 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연금저축', '중도해지', '기타소득세', 'IRP', '연금외수령'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연금저축 중도해지 세금 2026',
    description:
      '연금저축·IRP 중도해지 시 기타소득세 16.5% 과세 구조와 부득이한 사유 저율과세 정리.',
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
                    { name: '연금저축 중도해지 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·투자자 · 8분 읽기 · 2026-07-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연금저축 중도해지 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">기타소득세 16.5% 폭탄 피하기</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연말정산 때 세액공제를 받으려고 연금저축이나 IRP에 가입했다가, 목돈이 필요해 중도해지를 고민하는 분이 많습니다. 그런데 중도해지에는 그동안 돌려받은 세금을 다시 토해내는 기타소득세 16.5%가 따라옵니다. 이 가이드는 무엇에 세금이 붙는지, 세금을 낮추는 부득이한 사유는 무엇인지, 해지 대신 어떤 대안이 있는지를 실제 계산과 함께 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-pension-savings-early-termination-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중도해지 세금은 무엇에 붙나</h2>
                <p>
                  중도해지 세금은 세액공제를 받은 납입원금과 운용수익에 붙습니다. 연금계좌는 납입할 때 세액공제(소득세법 §59의3)를 해주는 대신, 55세 이후 연금으로 받는 것을 전제로 합니다. 중도에 목돈으로 찾는 것을 연금외수령이라 하며, 이때 앞서 받은 혜택을 기타소득세로 정산합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-2 text-text-secondary">
                    연금외수령이란, 연금계좌의 적립금을 55세 이전이거나 연금 형태가 아닌 방식으로 인출하는 것으로, 세액공제 받은 원금과 운용수익에 기타소득세 16.5%가 분리과세됩니다.
                    <br />
                    핵심: 세율 16.5% = 소득세 15% + 지방소득세 1.5%(지방세법 §103).
                  </p>
                </div>
                <p className="mt-4">
                  반대로 세액공제를 받지 않은 원금은 이미 세금을 낸 돈이라 과세 대상이 아닙니다. 한도를 넘겨 낸 금액이나 세액공제를 신청하지 않은 원금이 여기에 해당합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 세액공제를 안 받은 원금이라도 그 돈에서 불어난 운용수익은 과세 대상입니다. "내가 낸 원금이니 세금이 없겠지"라고 단정하지 말고, 금융회사에 과세대상 금액을 정확히 조회하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일반 해지와 부득이한 사유, 세금 차이는</h2>
                <p>
                  같은 금액을 찾아도 사유에 따라 세율이 크게 달라집니다. 단순 자금 필요로 해지하면 기타소득세 16.5%지만, 법이 정한 부득이한 사유면 연금소득세율 3.3~5.5%로 낮아집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 연금계좌 인출 사유별 세율 (소득세법 §59의3 관련)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적용 세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반 중도해지(연금외수령)</td>
                        <td className="p-3"><strong>기타소득세 16.5%</strong></td>
                        <td className="p-3">단순 자금 필요, 이직, 목돈 마련</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부득이한 사유 인출</td>
                        <td className="p-3"><strong>연금소득세 3.3~5.5%</strong></td>
                        <td className="p-3">사망·해외이주, 3개월 이상 요양, 파산·개인회생, 천재지변</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">55세 이후 연금수령</td>
                        <td className="p-3">연금소득세 3.3~5.5% 등</td>
                        <td className="p-3">정상적인 연금 개시</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  부득이한 사유의 연금소득세율은 수령 연령에 따라 만 55~69세 5.5%, 70~79세 4.4%, 80세 이상 3.3%로 낮아집니다(지방소득세 포함).
                </p>
                <p className="mt-4">
                  ⚠️ 다만 부득이한 사유는 스스로 판단해 적용받는 것이 아니라, 사유 발생일로부터 일정 기간 내에 증빙을 갖춰 금융회사에 신청해야 인정됩니다. 신청을 놓치면 같은 사정이어도 16.5%가 적용될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제로 세금이 얼마나 나오나</h2>
                <p>
                  아래 두 사례로 일반 해지와 부득이한 사유의 세금 차이를 비교해보겠습니다. 과세대상 금액(세액공제 받은 원금 + 운용수익)은 동일하게 2,300만원으로 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 단순 자금 필요로 일반 중도해지</p>
                  <p className="text-sm text-text-secondary">
                    · 과세대상: 세액공제 받은 원금 2,000만원 + 운용수익 300만원 = 2,300만원
                    <br />
                    · 세율: 기타소득세 16.5%
                    <br />
                    · 세금 = 2,300만원 × 16.5% = <strong>379만 5천원</strong>
                    <br />
                    · 실수령 = 2,300만원 − 379.5만원 = <strong>1,920만 5천원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 3개월 이상 요양(부득이한 사유), 60세 인출</p>
                  <p className="text-sm text-text-secondary">
                    · 과세대상: 2,300만원 (동일)
                    <br />
                    · 세율: 연금소득세 5.5% (만 55~69세)
                    <br />
                    · 세금 = 2,300만원 × 5.5% = <strong>126만 5천원</strong>
                    <br />
                    · 실수령 = 2,300만원 − 126.5만원 = <strong>2,173만 5천원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 2,300만원을 찾아도 사유 인정 여부로 세금이 379.5만원과 126.5만원, 약 253만원 차이가 납니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 금액은 과세대상 산정을 단순화한 예시입니다. 세액공제받지 않은 원금 비중, 퇴직급여 재원 포함 여부에 따라 실제 세액은 달라지므로, 해지 전 금융회사에서 예상 세금을 반드시 조회하세요.
                </p>
              </section>

              <AdSlot slot="guide-pension-savings-early-termination-tax-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">해지 전에 검토할 대안은</h2>
                <p>
                  목돈이 필요하다고 바로 해지하기 전에, 세금과 노후 재원을 지키는 대안을 먼저 확인하세요. 대부분의 연금계좌는 계좌를 유지하면서 위기를 넘길 장치를 갖추고 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>납입중지·납입유예:</strong> 매달 넣던 돈이 부담이면 납입만 잠시 멈추면 됩니다. 계좌는 유지되고 세제 혜택도 사라지지 않습니다.
                  </li>
                  <li>
                    <strong>연금계좌 담보대출:</strong> 계좌를 담보로 대출받으면 해지 없이 급전을 마련할 수 있습니다. 대출 이자와 해지 세금을 비교해 유리한 쪽을 택하세요.
                  </li>
                  <li>
                    <strong>부분 인출(연금저축):</strong> 연금저축은 세액공제 안 받은 원금부터 인출되므로, 소액이면 당장 세금 없이 찾을 수 있습니다. 다만 노후 재원이 줄어드는 점은 같습니다.
                  </li>
                  <li>
                    <strong>계좌 이전:</strong> 수익률이나 수수료가 불만이면 해지 대신 다른 금융회사 연금계좌로 이전하면 과세 없이 옮길 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 담보대출을 받고도 상환하지 못하면 결국 계좌가 해지되어 기타소득세가 발생할 수 있습니다. 대안도 상환 계획이 있을 때 유효하다는 점을 기억하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/pension-savings-irp-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">납입할 때 돌려받는 세액공제 한도부터 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/pension-income-tax-withholding-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금소득세 원천징수</div>
                    <p className="mt-1 text-sm text-text-secondary">정상 연금수령 시 붙는 3.3~5.5% 세율을 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/private-pension-1500-million-separate-taxation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사적연금 1,500만원 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">연금수령액이 커질 때의 과세 기준을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 절세 혜택</div>
                    <p className="mt-1 text-sm text-text-secondary">연금계좌와 함께 쓰는 절세 계좌를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-income-tax-deferral-irp-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직소득세 IRP 이연</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직금을 IRP로 받아 세금을 미루는 방법.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">예적금·대출·환율 계산기를 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·투자 조언이 아닙니다. 실제 과세대상 금액과 세액, 부득이한 사유 인정 여부는 가입한 금융회사와 국세청(126)에서 반드시 확인하세요. 본 콘텐츠는 2026-07-16 기준이며 관련 법령 개정 시 업데이트됩니다. 근거 조항은 <strong>소득세법 §59의3(연금계좌세액공제), 소득세법 §129(원천징수세율), 지방세법 §103(개인지방소득세), 국세기본법 §14(실질과세)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원</a>.
                </p>
              </section>

              <ShareButtons
                title="연금저축 중도해지 세금 2026 가이드"
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
